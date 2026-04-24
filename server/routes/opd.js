import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';
import { getOPDFlowPrediction } from '../ai/opdFlowPredictor.js';
import { getWaitTimeOptimizer } from '../ai/waitTimeOptimizer.js';
import { getMV } from '../db/materializedViews.js';
import logger from '../logger.js';

const router = Router();

// ============================================================
// Validation Schemas (Phase 2.4)
// ============================================================
const opdDrilldownQuerySchema = z.object({
  type: z.enum(['wait', 'clinic', 'revenue', 'readmit', 'revisit']),
});

router.get('/today', cached('opdToday', 60000, async () => {
  const start = Date.now();

  // Run ALL queries in parallel for maximum speed
  const [summary, breakdown, hourly, patients, _analyticsMerged, yesterdayHourly, avgHourly7d, waitListRaw, revisitData, revenueData, level4Data, yesterdaySummary, activeDoctors, activeNurses, activeStaff] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL OR o.ovstost IN ('01', '02', '03', '04', '05', '54', '61', '89', '99') THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98')) THEN 1 ELSE 0 END) as still_here,
        -- Breakdown: ยังรอจริง vs น่าจะกลับแล้ว (no activity > 2 ชม.)
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98'))
          AND (
            -- มี activity ใน 2 ชม.ล่าสุด = น่าจะยังอยู่
            (st.service2 IS NOT NULL AND TIME_TO_SEC(st.service2) >= TIME_TO_SEC(CURTIME()) - 7200)
            OR (st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) >= TIME_TO_SEC(CURTIME()) - 7200)
            OR TIME_TO_SEC(o.vsttime) >= TIME_TO_SEC(CURTIME()) - 7200
          ) THEN 1 ELSE 0 END) as likely_waiting,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98'))
          AND st.service1 IS NULL AND TIME_TO_SEC(o.vsttime) < TIME_TO_SEC(CURTIME()) - 7200
          THEN 1 ELSE 0 END) as likely_gone,
        -- แยกขั้นตอนที่รอ
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98'))
          AND st.service1 IS NULL THEN 1 ELSE 0 END) as wait_registration,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98'))
          AND st.service1 IS NOT NULL AND st.service2 IS NULL THEN 1 ELSE 0 END) as wait_doctor,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98'))
          AND st.service2 IS NOT NULL AND st.service7 IS NULL THEN 1 ELSE 0 END) as wait_pharmacy,
        -- True end-to-end cycle time: vsttime → last known timestamp (per patient)
        -- Uses the LATEST available timestamp as endpoint (bill_time > service7 > service2 > service1)
        ROUND(AVG(CASE
          WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61','89','54')) AND (r.bill_time IS NOT NULL OR st.service7 IS NOT NULL)
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime),
            CONCAT(o.vstdate,' ', COALESCE(r.bill_time, st.service7)))
          ELSE NULL END), 0) as true_cycle_time,
        -- Median cycle time (approx via percentile)
        ROUND(AVG(CASE
          WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61','89','54')) AND (r.bill_time IS NOT NULL OR st.service7 IS NOT NULL)
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime),
            CONCAT(o.vstdate,' ', COALESCE(r.bill_time, st.service7)))
          ELSE NULL END) * 0.85, 0) as estimated_median_cycle,
        AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), CONCAT(o.vstdate, ' ', st.service1)) END) as avg_wait_to_screen,
        AVG(CASE WHEN st.service2 IS NOT NULL AND st.service2 > st.service1 AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service1), CONCAT(o.vstdate, ' ', st.service2)) END) as avg_screen_to_doctor,
        AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > st.service2 AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service2), CONCAT(o.vstdate, ' ', st.service7)) END) as avg_doctor_to_pharmacy,
        AVG(CASE WHEN r.bill_time IS NOT NULL AND r.bill_time > st.service7 AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service7), CONCAT(o.vstdate, ' ', r.bill_time)) END) as avg_pharmacy_to_finance,
        (SELECT COUNT(*) FROM holiday WHERE holiday_date = CURDATE()) as is_holiday_db,
        ROUND(STDDEV(CASE
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 1) as wait_stddev,
        SUM(CASE WHEN st.vn IS NULL THEN 1 ELSE 0 END) as dropout_count,
        ROUND(
          100.0 * AVG(CASE
            WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
              AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
            THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)
          / NULLIF(AVG(CASE
            WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 END), 0)
        , 1) as doctor_yield_pct,
        ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as completion_rate
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `).catch(err => { logger.warn('OPD Q1 Failed', { err: err.message }); return {}; }),

    // แยก เพศ + ผู้ป่วยใหม่/เก่า + KPI ประสิทธิภาพ
    // ovstost: 1=ผู้ป่วยใหม่ (new), อื่น=เก่า (revisit)
    // p.sex: 1 or 'ช'=ชาย, 2 or 'ญ'=หญิง
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN p.sex IN ('1','ช','ช ','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','ญ ','หญิง') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN o.ovstost IN ('1','2') THEN 1 ELSE 0 END) as new_patient,
        SUM(CASE WHEN o.ovstost NOT IN ('1','2') OR o.ovstost IS NULL THEN 1 ELSE 0 END) as revisit_patient,

        -- SLA: % ที่รอไม่เกิน 60 นาที (เฉพาะที่มีข้อมูล service_time และไม่นับคิวที่ยกเลิก)
        ROUND(
          100.0 * SUM(CASE
            WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) 
                 AND st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime) <= 3600
                 AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime) THEN 1
            WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) 
                 AND r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime) <= 3600
                 AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime) THEN 1
            ELSE 0 END)
          / NULLIF(SUM(CASE WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) 
                            AND (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL) THEN 1 ELSE 0 END), 0)
        , 1) as sla_pct,

        -- รอนานสุด (นาที) วันนี้ (ไม่นับคิวที่ยกเลิก)
        MAX(CASE
          WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) AND r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN ROUND((TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60)
          WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) AND st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN ROUND((TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60)
          ELSE NULL END) as max_wait,

        -- จำนวนที่ยังรอแพทย์ (ไม่นับคิวที่ยกเลิก และต้องยังไม่พบแพทย์)
        SUM(CASE
          WHEN st.service2 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98')) THEN 1
          ELSE 0 END) as waiting_doctor,

        -- Peak hour วันนี้ + count
        (SELECT HOUR(o_inner.vsttime) FROM ovst o_inner FORCE INDEX (ix_vstdate)
          WHERE o_inner.vstdate = CURDATE() GROUP BY HOUR(o_inner.vsttime)
          ORDER BY COUNT(*) DESC LIMIT 1) as peak_hour,
        (SELECT COUNT(*) FROM ovst o_inner FORCE INDEX (ix_vstdate)
          WHERE o_inner.vstdate = CURDATE() GROUP BY HOUR(o_inner.vsttime)
          ORDER BY COUNT(*) DESC LIMIT 1) as peak_hour_count,
        -- Current hour count
        (SELECT COUNT(*) FROM ovst o_inner FORCE INDEX (ix_vstdate)
          WHERE o_inner.vstdate = CURDATE() AND HOUR(o_inner.vsttime) = HOUR(CURTIME())) as current_hour_count

      FROM ovst o FORCE INDEX (ix_vstdate)
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `).catch(err => { logger.warn('OPD Q2 Failed', { err: err.message }); return {}; }),

    dbQuery(`
      SELECT 
        HOUR(o.vsttime) as hr, 
        COUNT(*) as cnt,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed_cnt,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting_cnt
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hr
    `).catch(err => { logger.warn('OPD Q3 Failed', { err: err.message }); return []; }),

    dbQuery(`
      SELECT o.vn, o.hn, CONCAT(p.pname,p.fname,' ',p.lname) as name,
        TIMESTAMPDIFF(YEAR,p.birthday,NOW()) as age, p.sex,
        o.vsttime, o.oqueue, o.cur_dep, o.ovstost,
        c.name as clinic_name,
        st.service1 as cur_dep_time,
        st.service2 as doctor_time,
        st.service7 as outtime,
        r.bill_time as finance_time,
        CASE
          WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 'กลับบ้าน'
          WHEN st.service2 IS NOT NULL THEN 'รอรับยา'
          WHEN st.service1 IS NOT NULL THEN 'กำลังตรวจ'
          ELSE 'รอคัดกรอง'
        END as current_status,
        CASE
          WHEN r.bill_time IS NOT NULL THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',r.bill_time))
          WHEN st.service7 IS NOT NULL THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7))
          WHEN st.service2 IS NOT NULL THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service2))
          ELSE TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), NOW())
        END as total_minutes
      FROM ovst o FORCE INDEX (ix_vstdate)
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN clinic c ON o.cur_dep = c.clinic
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
      ORDER BY o.vsttime DESC LIMIT 200
    `).catch(err => { logger.warn('OPD Q4 Failed', { err: err.message }); return []; }),

    // —— Advanced Analytics: merged into Q1 summary query above ——
    Promise.resolve(null),

    // Yesterday hourly (cache 8 hours)
    dbQueryHeavy('opdYesterdayHourly', 480, `
      SELECT HOUR(vsttime) as hr, COUNT(*) as cnt
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hr
    `).catch(() => []),

    // 7-day average hourly with std-dev (cache 24 hours)
    dbQueryHeavy('opdAvgHourly7d', 1440, `
      SELECT hr,
        ROUND(AVG(cnt_per_day), 0) as avg_cnt,
        ROUND(STD(cnt_per_day), 1) as sd_cnt
      FROM (
        SELECT HOUR(vsttime) as hr, COUNT(*) as cnt_per_day
        FROM ovst FORCE INDEX (ix_vstdate)
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
          AND vstdate < CURDATE()
          AND vsttime IS NOT NULL
        GROUP BY HOUR(vsttime), DATE(vsttime)
      ) sub
      GROUP BY hr ORDER BY hr
    `).catch(err => { logger.warn('AI Hourly prediction query failed', { error: err.message }); return []; }),

    // —— NEW: Advanced Professional KPIs (Level 3) ——
    // P50 Median + P90 Wait + Revisit 7d + Revenue per Visit + First-Contact Resolution
    // P50 Median Wait Today (MariaDB 10.1 Compatible)
    // Simplified Wait Times list for JS-side Median/P90 calculation
    dbQuery(`
      SELECT 
        (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime)) / 60 as wait_min
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
        AND (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
        AND TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) > TIME_TO_SEC(o.vsttime)
      ORDER BY wait_min
    `).catch(() => []),

    // Revisit within 7 days (cache 60 min — JOIN + GROUP BY HAVING replaces slow correlated EXISTS)
    dbQueryOneHeavy('opdRevisit7d', 60, `
      SELECT
        COUNT(*) as revisit_7d_count,
        ROUND(100.0 * COUNT(*) / NULLIF((SELECT COUNT(DISTINCT hn) FROM ovst WHERE vstdate = CURDATE()), 0), 1) as revisit_7d_pct
      FROM (
        SELECT o2.hn
        FROM ovst o2 FORCE INDEX (ix_vstdate)
        INNER JOIN ovst o3 FORCE INDEX (ix_hn)
          ON o3.hn = o2.hn
          AND o3.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
          AND o3.vstdate < CURDATE()
        WHERE o2.vstdate = CURDATE()
        GROUP BY o2.hn
      ) revisits
    `).catch(() => ({ revisit_7d_count: 0, revisit_7d_pct: 0 })),

    // Revenue per visit — use materialized view (instant)
    (async () => {
      const mvRevenue = getMV('mv_opd_revenue_per_visit');
      if (mvRevenue?.length) {
        const todayRow = mvRevenue.find(r => r.vstdate === new Date().toISOString().slice(0, 10));
        const total = mvRevenue.reduce((s, r) => s + Number(r.total_revenue || 0), 0);
        const totalVn = mvRevenue.reduce((s, r) => s + Number(r.total_visits || 0), 0);
        return {
          avg_revenue_per_visit: totalVn > 0 ? Math.round(total / totalVn) : 0,
          total_opd_revenue: todayRow ? Number(todayRow.total_revenue || 0) : 0,
        };
      }
      // Fallback: use vn_stat (faster + more reliable than opitemrece)
      return dbQueryOneHeavy('opdRevPerVisit_v2', 5, `
        SELECT
          ROUND(AVG(v.income), 0) as avg_revenue_per_visit,
          ROUND(SUM(v.income), 0) as total_opd_revenue
        FROM vn_stat v
        WHERE v.vstdate = CURDATE() AND v.income > 0
      `);
    })().catch(() => ({ avg_revenue_per_visit: 0, total_opd_revenue: 0 })),

    // —— Level 4: Operational Intelligence (cache 15 min — patient JOIN is slow) ——
    dbQueryOneHeavy('opdLevel4Today', 15, `
      SELECT
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_count,
        ROUND(100.0 * SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as elderly_pct,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) as child_count,
        ROUND(100.0 * SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as child_pct,
        SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(o.vsttime) >= 12 THEN 1 ELSE 0 END) as afternoon_count,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_time_to_first_service,
        COUNT(DISTINCT o.cur_dep) as active_clinics,
        COUNT(DISTINCT o.doctor) as distinct_doctors,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o FORCE INDEX (ix_vstdate)
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate = CURDATE()
    `).catch(() => ({})),

    // Yesterday summary for comparison (cache 30 mins)
    dbQueryOneHeavy('opdYesterdaySummary', 30, `
      SELECT COUNT(*) as yesterday_total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as yesterday_completed,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as yesterday_avg_wait
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    `).catch(() => ({})),

    // 14. Active Doctors Today (Strictly OPD - No ER) - Filtered for MD Title (3 Shifts)
    dbQuery(`
      SELECT 
        d.code, 
        d.name, 
        SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(o.vsttime) >= 12 AND HOUR(o.vsttime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(o.vsttime) >= 17 THEN 1 ELSE 0 END) as night_count,
        COUNT(o.vn) as total_count
      FROM ovst o FORCE INDEX (ix_vstdate)
      INNER JOIN doctor d ON o.doctor = d.code
      WHERE o.vstdate = CURDATE()
        AND o.vn NOT IN (SELECT vn FROM er_regist WHERE vstdate = CURDATE())
        AND (d.name LIKE 'นพ.%' OR d.name LIKE 'พญ.%')
      GROUP BY d.code, d.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 15. Active Nurses Today (Clinical Activity: BP, PQ, Assessment) - 3 Shifts
    dbQuery(`
      SELECT 
        u.loginname as username, 
        u.name as staff_name, 
        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
        COUNT(*) as screen_count
      FROM (
        SELECT staff, screen_time as activity_time FROM opdscreen_bp WHERE screen_date = CURDATE()
        UNION ALL
        SELECT staff, screen_time as activity_time FROM pq_screen WHERE screen_date = CURDATE()
        UNION ALL
        SELECT assessment_head_staff as staff, assessment_head_datetime as activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE()
      ) as activity
      INNER JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
      GROUP BY u.loginname, u.name
      ORDER BY screen_count DESC
    `).catch(() => []),

    // 16. Active Staff Today (Clinical/Support Activity) - 3 Shifts
    dbQuery(`
      SELECT 
        u.loginname as username, 
        u.name as staff_name, 
        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
        COUNT(*) as screen_count
      FROM (
        SELECT staff, screen_time as activity_time FROM opdscreen_bp WHERE screen_date = CURDATE()
        UNION ALL
        SELECT staff, screen_time as activity_time FROM pq_screen WHERE screen_date = CURDATE()
        UNION ALL
        SELECT o.staff, o.vsttime as activity_time FROM ovst o WHERE o.vstdate = CURDATE()
      ) as activity
      INNER JOIN opduser u ON activity.staff = u.loginname
      WHERE u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
        AND u.loginname != 'kiosk'
      GROUP BY u.loginname, u.name
      ORDER BY screen_count DESC
    `).catch(() => []),
  ]);

  const analytics = summary || {};  // Q5 analytics fields merged into Q1 summary query
  const s = summary || {};
  const b = breakdown || {};

  // Calculate Median and P90 in JS for extreme performance
  const waitList = (waitListRaw || []).map(x => Number(x.wait_min)).sort((a, b) => a - b);
  const median_wait = waitList.length > 0 ? waitList[Math.floor(waitList.length * 0.5)] : 0;
  const p90_wait = waitList.length > 0 ? waitList[Math.floor(waitList.length * 0.9)] : 0;

  // Throughput calculation: visits / hours_open (respecting closing time)
  const currentHour = new Date().getHours();
  const isHoliday = Boolean(s.is_holiday_db || [0, 6].includes(new Date().getDay()));
  const closingHour = isHoliday ? 12 : 20; // 12:00 vs 20:30 (approx 20)
  const hoursOpen = Math.min(closingHour, Math.max(7, currentHour)) - 7 + 1;
  const throughput = Math.round(Number(s.completed || 0) / Math.max(1, hoursOpen));

  logger.debug('OPD today metrics calculated', { duration: Date.now() - start });
  return {
    data_source: 'HOSxP XE',
    today_total: s.total || 0,
    completed: s.completed || 0,
    still_here: s.still_here || 0,
    // Breakdown ของ still_here — แยกว่ารอจริงหรือกลับแล้ว
    still_here_breakdown: {
      likely_waiting: Number(s.likely_waiting || 0),
      likely_gone: Number(s.likely_gone || 0),
      by_stage: {
        wait_registration: Number(s.wait_registration || 0),
        wait_doctor: Number(s.wait_doctor || 0),
        wait_pharmacy: Number(s.wait_pharmacy || 0),
      },
    },
    active_doctors_list: activeDoctors || [],
    active_nurses_list: activeNurses || [],
    active_staff_list: activeStaff || [],
    is_holiday: Boolean(s.is_holiday_db || [0, 6].includes(new Date().getDay())),
    op_hours: Boolean(s.is_holiday_db || [0, 6].includes(new Date().getDay())) ? "07:00 - 12:00" : "07:00 - 20:30",
    // เพศ
    male: Number(b.male || 0),
    female: Number(b.female || 0),
    // ใหม่/เก่า
    new_patient: Number(b.new_patient || 0),
    revisit_patient: Number(b.revisit_patient || 0),
    // —— KPI ประสิทธิภาพ (Level 1) ——
    sla_pct: Number(b.sla_pct || 0),
    max_wait: Number(b.max_wait || 0),
    waiting_doctor: Number(b.waiting_doctor || 0),
    peak_hour: Number(b.peak_hour ?? -1),
    peak_hour_count: Number(b.peak_hour_count || 0),
    current_hour_count: Number(b.current_hour_count || 0),
    throughput,
    // True end-to-end cycle time (vsttime → bill_time/service7 per patient)
    avg_total_minutes: Number(s.true_cycle_time || 0) || Math.round(
      Number(s.avg_wait_to_screen || 0) +
      Number(s.avg_screen_to_doctor || 0) +
      Number(s.avg_doctor_to_pharmacy || 0) +
      Number(s.avg_pharmacy_to_finance || 0)
    ),
    estimated_median_cycle: Number(s.estimated_median_cycle || 0),
    wait_steps: {
      registration_to_screening: Math.round(s.avg_wait_to_screen || 0),
      screening_to_doctor: Math.round(s.avg_screen_to_doctor || 0),
      doctor_to_pharmacy: Math.round(s.avg_doctor_to_pharmacy || 0),
      pharmacy_to_finance: Math.round(s.avg_pharmacy_to_finance || 0),
    },
    // —— Advanced Analytics (Level 2) ——
    wait_stddev: Number(analytics?.wait_stddev || 0),   // σ ความผันผวน
    dropout_count: Number(analytics?.dropout_count || 0),   // ออกก่อนรับบริการ
    dropout_pct: Number(s.total) > 0
      ? Math.round((Number(analytics?.dropout_count || 0) / Number(s.total)) * 100 * 10) / 10
      : 0,
    doctor_yield_pct: Number(analytics?.doctor_yield_pct || 0),  // % เวลาจริงกับแพทย์
    completion_rate: Number(analytics?.completion_rate || 0),  // % ครบทุกขั้นตอน
    // Capacity Utilization: visits / (ทฤษฎี max = throughput × hours_open × 1.5)
    capacity_utilization: Math.min(100, Math.round(
      (Number(s.total || 0) / Math.max(1, throughput * hoursOpen * 1.5)) * 100
    )),
    // —— Professional KPIs (Level 3) ——
    median_wait: Math.round(median_wait || 0),
    p90_wait: Math.round(p90_wait || 0),
    revisit_7d_count: Number(revisitData?.revisit_7d_count || 0),
    revisit_7d_pct: Number(revisitData?.revisit_7d_pct || 0),
    avg_revenue_per_visit: Number(revenueData?.avg_revenue_per_visit || 0),
    total_opd_revenue: Number(revenueData?.total_opd_revenue || 0),
    // Patient Throughput Efficiency (PTE): completed / still_here  ratio
    pte_ratio: Number(s.still_here || 0) > 0 ? Math.round((Number(s.completed || 0) / Number(s.still_here || 1)) * 100) / 100 : Number(s.completed || 0) > 0 ? 99 : 0,
    // —— Level 4: Operational Intelligence ——
    elderly_count: Number(level4Data?.elderly_count || 0),
    elderly_pct: Number(level4Data?.elderly_pct || 0),
    child_count: Number(level4Data?.child_count || 0),
    child_pct: Number(level4Data?.child_pct || 0),
    morning_count: Number(level4Data?.morning_count || 0),
    afternoon_count: Number(level4Data?.afternoon_count || 0),
    morning_afternoon_ratio: Number(level4Data?.afternoon_count || 0) > 0
      ? Math.round((Number(level4Data?.morning_count || 0) / Number(level4Data?.afternoon_count || 1)) * 100) / 100
      : 0,
    avg_time_to_first_service: Number(level4Data?.avg_time_to_first_service || 0),
    active_clinics: Number(level4Data?.active_clinics || 0),
    avg_age: Number(level4Data?.avg_age || 0),
    distinct_doctors: Number(level4Data?.distinct_doctors || 0),
    avg_patients_per_doctor: Number(level4Data?.distinct_doctors || 0) > 0
      ? Math.round(Number(s.completed || 0) / Number(level4Data.distinct_doctors))
      : 0,
    revenue_per_hour: hoursOpen > 0 ? Math.round(Number(revenueData?.total_opd_revenue || 0) / hoursOpen) : 0,
    // —— Level 5: Yesterday Comparison ——
    yesterday_total: Number(yesterdaySummary?.yesterday_total || 0),
    yesterday_completed: Number(yesterdaySummary?.yesterday_completed || 0),
    yesterday_avg_wait: Number(yesterdaySummary?.yesterday_avg_wait || 0),
    today_vs_yesterday_pct: Number(yesterdaySummary?.yesterday_total || 0) > 0
      ? Math.round(((Number(s.total || 0) - Number(yesterdaySummary?.yesterday_total || 0)) / Number(yesterdaySummary?.yesterday_total || 1)) * 100)
      : 0,
    // Service Quality Index (SQI) — Composite 0-100
    // Weight: SLA 40% + Completion 30% + Stability (σ<30=100%) 20% + Yield 10%
    ...(() => {
      const sqiSla = Math.round(Number(b.sla_pct ?? 0));
      const sqiComplete = Math.round(Number(analytics?.completion_rate ?? 0));
      const sqiStability = Math.round(Math.max(0, 100 - Number(analytics?.wait_stddev ?? 30)));
      const sqiYield = Math.round(Math.min(100, Number(analytics?.doctor_yield_pct ?? 0)));
      const sqiScore = Math.round(sqiSla * 0.40 + sqiComplete * 0.30 + sqiStability * 0.20 + sqiYield * 0.10);
      logger.debug('SQI metrics calculated', { sla: sqiSla, completion: sqiComplete, stability: sqiStability, yield: sqiYield, score: sqiScore });
      return {
        sqi: sqiScore,
        sqi_components: {
          sla_compliance: { score: sqiSla, weight: 40, label: 'SLA Compliance', desc: '% visit ที่รอไม่เกินมาตรฐาน' },
          process_completion: { score: sqiComplete, weight: 30, label: 'Process Completion', desc: '% ที่ผ่านครบทุกขั้นตอน' },
          wait_stability: { score: sqiStability, weight: 20, label: 'Wait Stability', desc: 'ความสม่ำเสมอ (σ ต่ำ = ดี)' },
          doctor_yield: { score: sqiYield, weight: 10, label: 'Doctor Yield', desc: '% เวลาจริงกับแพทย์' },
        },
      };
    })(),

    hourly: Array.from({ length: 24 }, (_, h) => {
      const entry = (hourly || []).find(x => x.hr === h);
      return {
        hour: h,
        label: `${String(h).padStart(2, '0')}:00`,
        count: entry?.cnt || 0,
        completed: entry?.completed_cnt || 0,
        waiting: entry?.waiting_cnt || 0
      };
    }),
    hourly_yesterday: Array.from({ length: 24 }, (_, h) => ({
      hour: h, label: `${String(h).padStart(2, '0')}:00`,
      count: (yesterdayHourly || []).find(x => x.hr === h)?.cnt || 0
    })),
    hourly_prediction: Array.from({ length: 24 }, (_, h) => {
      const avg = Number((avgHourly7d || []).find(x => x.hr === h)?.avg_cnt || 0);
      const sd = Number((avgHourly7d || []).find(x => x.hr === h)?.sd_cnt || 0);
      // AI prediction: weighted avg + small trend adjustment (grow 2% if positive trend)
      const todayVal = (hourly || []).find(x => x.hr === h)?.cnt || 0;
      const predicted = avg > 0 ? Math.round(avg * 1.02 + (todayVal > avg ? (todayVal - avg) * 0.1 : 0)) : 0;
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: predicted, confidence: Math.max(0, Math.round(100 - sd * 5)) };
    }),
    patients: (patients || []).map(pt => ({
      ...pt,
      wait_registration: pt.vsttime && pt.cur_dep_time && pt.cur_dep_time > pt.vsttime ? timeDiffMin(pt.vsttime, pt.cur_dep_time) : null,
      wait_screening: pt.cur_dep_time && pt.doctor_time && pt.doctor_time > pt.cur_dep_time ? timeDiffMin(pt.cur_dep_time, pt.doctor_time) : null,
      wait_doctor: pt.doctor_time && pt.outtime && pt.outtime > pt.doctor_time ? timeDiffMin(pt.doctor_time, pt.outtime) : null,
      wait_pharmacy: pt.outtime && pt.finance_time && pt.finance_time > pt.outtime ? timeDiffMin(pt.outtime, pt.finance_time) : null
    }))
  };
}));


// Wait times by clinic
router.get('/by-clinic', cached('opdClinic', 60000, async () => {
  const clinics = await dbQuery(`
    SELECT c.name as clinic, COUNT(*) as visits,
      AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7)) END) as avg_total,
      AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service1)) END) as avg_wait,
      SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as still_waiting
    FROM ovst o 
    LEFT JOIN clinic c ON o.cur_dep = c.clinic
    LEFT JOIN service_time st ON o.vn = st.vn
    LEFT JOIN rcpt_print r ON o.vn = r.vn
    WHERE o.vstdate = CURDATE() AND c.name IS NOT NULL
    GROUP BY c.clinic, c.name HAVING visits >= 2
    ORDER BY visits DESC LIMIT 20
  `);
  return {
    data_source: 'HOSxP XE',
    clinics: (clinics || []).map(c => ({
      ...c,
      avg_total: Math.round(c.avg_total || 0),
      avg_wait: Math.round(c.avg_wait || 0)
    }))
  };
}));

// Wait time trends (past 7 days)
router.get('/wait-trend', cached('opdTrend', 120000, async () => {
  const trend = await dbQueryHeavy('opdWaitTrend7d', 30, `
    SELECT o.vstdate as date, COUNT(*) as visits,
      AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7)) END) as avg_total,
      AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service1)) END) as avg_wait
    FROM ovst o
    LEFT JOIN service_time st ON o.vn = st.vn
    WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY o.vstdate ORDER BY o.vstdate
  `);
  return {
    data_source: 'HOSxP XE',
    trend: (trend || []).map(d => ({ ...d, avg_total: Math.round(d.avg_total || 0), avg_wait: Math.round(d.avg_wait || 0) }))
  };
}));

function timeDiffMin(a, b) {
  if (!a || !b) return null;
  const toMin = t => { const p = String(t).split(':'); return (parseInt(p[0]) || 0) * 60 + (parseInt(p[1]) || 0); };
  const diff = toMin(b) - toMin(a);
  return diff > 0 ? diff : null;
}

// OPD Monthly Trend — ปีงบประมาณ (ต.ค.–ก.ย.)
// ⚡ OPTIMIZED: 2 parallel queries + TIME_TO_SEC + 1hr cache
router.get('/monthly-fiscal', cached('opdMonthlyFiscal', 3600000, async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const fiscalStartYear = currentMonth >= 10 ? currentYear : currentYear - 1;
  const fiscalStart = `${fiscalStartYear}-10-01`;
  const fiscalEnd = `${fiscalStartYear + 1}-09-30`;
  const fiscalBE = fiscalStartYear + 543 + 1;

  // วิ่ง 2 queries พร้อมกัน:
  // Q1: นับรายเดือน — ไม่ JOIN เลย เร็วมาก
  // Q2: คำนวณเวลารอ — JOIN service_time อย่างเดียว + TIME_TO_SEC แทน CONCAT
  const [visitRows, waitRows] = await Promise.all([

    dbQuery(`
      SELECT
        YEAR(vstdate)  AS year_num,
        MONTH(vstdate) AS month_num,
        COUNT(*)       AS total_visits
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate BETWEEN '${fiscalStart}' AND LEAST('${fiscalEnd}', CURDATE())
      GROUP BY YEAR(vstdate), MONTH(vstdate)
    `),

    dbQuery(`
      SELECT
        YEAR(st.vstdate)  AS year_num,
        MONTH(st.vstdate) AS month_num,
        AVG(CASE
          WHEN st.service1 IS NOT NULL
            AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(st.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(st.vsttime)) / 60
        END) AS avg_reg_to_screen,
        AVG(CASE
          WHEN st.service5 IS NOT NULL AND st.service1 IS NOT NULL
            AND TIME_TO_SEC(st.service5) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service5) - TIME_TO_SEC(st.service1)) / 60
        END) AS avg_screen_to_doc,
        AVG(CASE
          WHEN st.service7 IS NOT NULL AND st.service5 IS NOT NULL
            AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service5)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service5)) / 60
        END) AS avg_doc_to_rx,
        -- True Cycle Time: vsttime → COALESCE(bill_time, service7) per patient
        ROUND(AVG(CASE
          WHEN (r.bill_time IS NOT NULL OR st.service7 IS NOT NULL)
          THEN TIMESTAMPDIFF(MINUTE,
            CONCAT(st.vstdate, ' ', st.vsttime),
            CONCAT(st.vstdate, ' ', COALESCE(r.bill_time, st.service7)))
          ELSE NULL END), 0) AS true_cycle_time
      FROM service_time st
      LEFT JOIN rcpt_print r ON st.vn = r.vn
      WHERE st.vstdate BETWEEN '${fiscalStart}' AND LEAST('${fiscalEnd}', CURDATE())
        AND st.service1 IS NOT NULL
      GROUP BY YEAR(st.vstdate), MONTH(st.vstdate)
    `)

  ]);

  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const fiscalMonths = [];

  for (let i = 0; i < 12; i++) {
    const mNum = ((9 + i) % 12) + 1;
    const yNum = mNum >= 10 ? fiscalStartYear : fiscalStartYear + 1;

    const vRow = (visitRows || []).find(r => Number(r.month_num) === mNum && Number(r.year_num) === yNum);
    const wRow = (waitRows || []).find(r => Number(r.month_num) === mNum && Number(r.year_num) === yNum);

    const reg = Math.round(Number(wRow?.avg_reg_to_screen || 0));
    const screen = Math.round(Number(wRow?.avg_screen_to_doc || 0));
    const doc = Math.round(Number(wRow?.avg_doc_to_rx || 0));
    const trueCycle = Number(wRow?.true_cycle_time || 0);
    // Use true cycle time if available, fallback to sum of steps
    const total = trueCycle > 0 ? trueCycle : (reg + screen + doc);

    fiscalMonths.push({
      month: MONTH_TH[mNum],
      month_num: mNum,
      year_num: yNum,
      total_visits: Number(vRow?.total_visits || 0),
      avg_total: total,
      avg_reg: reg,
      avg_screen: screen,
      avg_doc: doc,
      avg_rx: 0,
      has_data: Number(vRow?.total_visits || 0) > 0,
    });
  }

  const withData = fiscalMonths.filter(m => m.has_data && m.avg_total > 0);
  const benchmark = withData.length
    ? Math.round(withData.reduce((s, m) => s + m.avg_total, 0) / withData.length)
    : 0;

  return {
    data_source: 'HOSxP XE',
    fiscal_year_be: fiscalBE,
    fiscal_start: fiscalStart,
    fiscal_end: fiscalEnd,
    benchmark_avg: benchmark,
    months: fiscalMonths,
  };
}));

// —— OPD Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ——
router.get('/revenue-fiscal', cached('opdRevenueFiscal', 3600000, (req) => getRevenueFiscal(null, 'HOSxP XE · vn_stat', req?.query?.start, req?.query?.end)));

// ============================================================
// 🚑 ER Operations — Live from HOSxP XE (moved to er.js)
// ============================================================

// ============================================================
// 🤖 AI #14 — OPD Patient Flow Predictor
// ============================================================
router.get('/ai/flow-prediction', cached('opdFlowPrediction', 60000, async () => {
  return await getOPDFlowPrediction();
}));

// ============================================================
// 🤖 AI #16 — OPD Wait Time Optimizer
// ============================================================
router.get('/ai/wait-optimizer', cached('opdWaitOptimizer', 45000, async () => {
  return await getWaitTimeOptimizer();
}));

// ---- OPD Drill-Down (cached 30s for live data) ----
router.get('/drilldown', validateQuery(opdDrilldownQuerySchema), cached('opdDrillDown', 30000, async (req) => {
  const { type } = req.query;

  if (type === 'wait') {
    const [stats, topWaiters] = await Promise.all([
      dbQueryOne(`
                SELECT 
                    SUM(CASE WHEN (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime))/60 <= 30 THEN 1 ELSE 0 END) as under30,
                    SUM(CASE WHEN (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime))/60 BETWEEN 31 AND 60 THEN 1 ELSE 0 END) as to60,
                    SUM(CASE WHEN (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime))/60 BETWEEN 61 AND 90 THEN 1 ELSE 0 END) as to90,
                    SUM(CASE WHEN (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime))/60 > 90 THEN 1 ELSE 0 END) as over90
                FROM ovst o
                LEFT JOIN service_time st ON o.vn = st.vn
                LEFT JOIN rcpt_print r ON o.vn = r.vn
                WHERE o.vstdate = CURDATE() AND (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
            `),
      dbQuery(`
                SELECT o.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name, c.name as clinic,
                    CASE 
                        WHEN r.bill_time IS NOT NULL THEN 'Finance'
                        WHEN st.service7 IS NOT NULL THEN 'Pharmacy'
                        WHEN st.service2 IS NOT NULL THEN 'Doctor'
                        WHEN st.service1 IS NOT NULL THEN 'Screening'
                        ELSE 'Reception'
                    END as status,
                    TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), NOW()) as minutes
                FROM ovst o
                INNER JOIN patient p ON o.hn = p.hn
                LEFT JOIN clinic c ON o.cur_dep = c.clinic
                LEFT JOIN service_time st ON o.vn = st.vn
                LEFT JOIN rcpt_print r ON o.vn = r.vn
                WHERE o.vstdate = CURDATE() AND (st.service7 IS NULL AND r.bill_time IS NULL)
                ORDER BY minutes DESC LIMIT 15
            `)
    ]);

    return {
      stats: stats || { under30: 0, to60: 0, to90: 0, over90: 0 },
      topWaiters: topWaiters || []
    };
  }

  return { error: 'Unsupported drill-down type' };
}));

export default router;
