import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import hosxp from '../db/hosxpIntegration.js';
import ai from '../ai/aiModules.js';

const router = Router();

// ============================================================
// 🚑 ER Operations — Live from HOSxP XE
// ============================================================
router.get('/today-patients', cached('erPatients', 30000, async () => {
  const patients = await hosxp.getERTodayPatients();
  const predicted = await ai.getERAdmissionPrediction(patients);
  const forecast = await ai.getERWaitTimeForecast(patients);
  return {
    data_source: 'HOSxP XE + AI Admission & Wait Time Predictor',
    patients: predicted,
    wait_time_forecast: forecast
  };
}));

router.get('/triage-stats', cached('erTriage', 30000, async () => {
  return { data_source: 'HOSxP XE', stats: await hosxp.getERTriageStats() };
}));

router.get('/flow-bottlenecks', cached('erBottlenecks', 60000, async () => {
  const flowData = await hosxp.getERFlowAnalytics();
  const analysis = await ai.getERBottleneckAI(flowData);
  return analysis;
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔬 Professional ER Analytics — Advanced KPIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cached('er_analytics_v12_stable', 300000, async () => {
  const [
    baseAnalytics,
    percentiles,
    revenueData,
    monthlyTrend,
    diagnosisTop,
    ageDistribution,
    dailyPattern,
    disposition,
    triageStayTime,
    todayAcuity,
    todayBaseAnalytics,
    activeDoctorsList,
    activeNursesList,
    activeStaffList,
    returnVisit72h,
  ] = await Promise.all([
    // 1. Combined ER Base Analytics (Summary, LWBS, SLA)
    // LWBS logic:
    //   A) er_dch_type '4' = ปฏิเสธรักษา, '5' = LWBS/หนีกลับ — always LWBS
    //   B) visit < 15 min with no doctor contact — LWBS proxy
    //      Guard: exclude er_dch_type '2' (Admit IPD) and '3' (Refer) to prevent
    //             false-positive when patient is transferred quickly
    dbQueryOneHeavy('erBaseAnalytics30d_v2', 60, `
      SELECT
        COUNT(e.vn) as total_visits,
        COUNT(DISTINCT e.vstdate) as active_days,
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as avg_ttd,
        ROUND(STDDEV(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as sd_ttd,
        SUM(CASE
          WHEN e.er_dch_type IN ('4', '5') THEN 1
          WHEN e.door_to_doctor_second IS NULL
            AND e.doctor_tx_time IS NULL
            AND e.finish_time IS NOT NULL
            AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
            AND (e.er_dch_type IS NULL OR e.er_dch_type NOT IN ('2', '3'))
          THEN 1
          ELSE 0
        END) as lwbs_count,
        SUM(CASE
          WHEN e.er_emergency_type = '1' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 60 THEN 1
          WHEN e.er_emergency_type = '2' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 900 THEN 1
          WHEN e.er_emergency_type = '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 1800 THEN 1
          WHEN e.er_emergency_type > '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 3600 THEN 1
          ELSE 0 END) as sla_pass_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),


    // 2. Median & P90 TTD (MariaDB 10.1 Compatible Percentiles - Refined Sorting)
    // PERF NOTE: This uses session variables (@row := @row + 1) for percentile calculation
    // which is slow on MariaDB due to lack of window function support. If the DB is upgraded
    // to MariaDB 10.2+ or MySQL 8.0+, replace with:
    //   PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY wait_min) as median_ttd,
    //   PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY wait_min) as p90_ttd
    // or use NTILE()/ROW_NUMBER() window functions for better performance.
    // Not changing the SQL now to preserve MariaDB 10.1 compatibility.
    dbQueryOneHeavy('erPercentiles30d', 120, `
      SELECT
        AVG(CASE WHEN row_num = ROUND(cnt * 0.5) THEN wait_min END) as median_ttd,
        AVG(CASE WHEN row_num = ROUND(cnt * 0.9) THEN wait_min END) as p90_ttd
      FROM (
        SELECT
          t_inner.wait_min,
          @row := @row + 1 as row_num,
          t_inner.cnt
        FROM (
          SELECT
            GREATEST(0.1, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))) / 60 as wait_min,
            (SELECT COUNT(*) FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND doctor_tx_time IS NOT NULL) as cnt
          FROM er_regist e
          WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND e.doctor_tx_time IS NOT NULL
          ORDER BY wait_min
        ) t_inner, (SELECT @row := 0) r
      ) t
    `).catch(() => ({ median_ttd: 0, p90_ttd: 0 })),

    // 3. Revenue & Cost
    dbQueryOneHeavy('erRevenue30d', 60, `
      SELECT ROUND(AVG(v.income), 0) as avg_cost, ROUND(SUM(v.income), 0) as total_revenue, COUNT(e.vn) as billable_visits
      FROM er_regist e STRAIGHT_JOIN vn_stat v ON e.vn = v.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND v.income > 0
    `).catch(() => null),

    // 4. Monthly ER Trend (6 เดือน)
    dbQueryHeavy('erMonthlyTrend6mo', 120, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') as month, COUNT(*) as visits,
      SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical,
      ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m') ORDER BY month
    `).catch(() => []),

    // 5. Top Diagnoses (30-day)
    dbQueryHeavy('erTopDiag30d', 60, `
      SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN er_regist e ON od.vn = e.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 6. Age Distribution
    dbQueryHeavy('erAgeDist30d', 60, `
      SELECT CASE WHEN p.birthday > DATE_SUB(CURDATE(), INTERVAL 12 YEAR) THEN 'Children' WHEN p.birthday < DATE_SUB(CURDATE(), INTERVAL 60 YEAR) THEN 'Elderly' ELSE 'Adult' END as age_group, COUNT(e.vn) as cnt
      FROM er_regist e STRAIGHT_JOIN patient p ON e.hn = p.hn WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY age_group
    `).catch(() => []),

    // 7. Hourly Load Pattern (30 วัน)
    dbQueryHeavy('erDailyPattern30d', 60, `
      SELECT HOUR(e.enter_er_time) as hour, COUNT(*) as total, ROUND(COUNT(*) / 30.0, 1) as avg_daily, SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.enter_er_time IS NOT NULL GROUP BY HOUR(e.enter_er_time) ORDER BY hour
    `).catch(() => []),

    // 8. Disposition Analysis
    dbQueryHeavy('erDisposition30d', 60, `
      SELECT e.er_dch_type as dch_type, COUNT(*) as cnt, ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time))), 0) as avg_stay_min
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.er_dch_type IS NOT NULL GROUP BY e.er_dch_type ORDER BY cnt DESC
    `).catch(() => []),

    // 9. Triage-level Stay Time
    dbQueryHeavy('erTriageStayTime30d', 60, `
      SELECT e.er_emergency_type as triage, COUNT(*) as cnt, ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay, ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time))), 0) as avg_wait_doctor
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.enter_er_time IS NOT NULL GROUP BY e.er_emergency_type ORDER BY e.er_emergency_type
    `).catch(() => []),

    // 10. Today Acuity Summary
    dbQueryOne(`
      SELECT SUM(CASE WHEN e.er_emergency_type = '1' THEN 1 ELSE 0 END) as resus, SUM(CASE WHEN e.er_emergency_type = '2' THEN 1 ELSE 0 END) as emerg, SUM(CASE WHEN e.er_emergency_type = '3' THEN 1 ELSE 0 END) as urgent, SUM(CASE WHEN e.er_emergency_type = '4' THEN 1 ELSE 0 END) as semi, SUM(CASE WHEN e.er_emergency_type = '5' THEN 1 ELSE 0 END) as non_urg, COUNT(*) as total, ROUND(100.0 * SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as acuity_pct
      FROM er_regist e WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    // 11. Today Base Analytics (TTD & SLA)
    dbQueryOne(`
      SELECT
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as avg_ttd,
        SUM(CASE 
          WHEN e.er_emergency_type = '1' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 60 THEN 1
          WHEN e.er_emergency_type = '2' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 900 THEN 1
          WHEN e.er_emergency_type = '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 1800 THEN 1
          WHEN e.er_emergency_type > '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 3600 THEN 1
          ELSE 0 END) as sla_pass_count,
        COUNT(*) as total_visits
      FROM er_regist e WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    // 12. Active ER Doctors Today
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name, COUNT(e.vn) as total_count
      FROM er_regist e
      JOIN opduser u ON e.er_doctor = u.doctorcode OR e.er_doctor = u.loginname
      WHERE e.vstdate = CURDATE()
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 13. Active ER Nurses Today (Activity in ER Depcodes)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
             SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
             SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
             SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
             COUNT(*) as total_count
      FROM (
          SELECT staff, screen_time as activity_time FROM opdscreen_bp WHERE screen_date = CURDATE() AND depcode IN ('013','076','128')
          UNION ALL
          SELECT staff, screen_time as activity_time FROM pq_screen WHERE screen_date = CURDATE() AND next_dep IN ('013','076','128')
      ) activity
      JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 14. Active ER Staff Today (Reception/Support in ER Depcodes)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
             SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
             SUM(CASE WHEN HOUR(o.vsttime) >= 12 AND HOUR(o.vsttime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
             SUM(CASE WHEN HOUR(o.vsttime) >= 17 THEN 1 ELSE 0 END) as night_count,
             COUNT(*) as total_count
      FROM ovst o
      JOIN opduser u ON o.staff = u.loginname
      WHERE o.vstdate = CURDATE() AND o.main_dep IN ('013','076','128')
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
        AND u.loginname != 'kiosk'
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 15. 72h Return Visit — ผู้ป่วยที่กลับมา ER ภายใน 72 ชั่วโมง (30 วัน)
    // Window: นับจาก finish_time ของ visit แรก ถึง enter_er_time ของ visit ถัดไป
    dbQueryOneHeavy('erReturn72h30d', 300, `
      SELECT COUNT(DISTINCT e2.vn) as return_72h_count
      FROM er_regist e2
      INNER JOIN er_regist e1
        ON e1.hn = e2.hn
        AND e1.vstdate >= DATE_SUB(e2.vstdate, INTERVAL 3 DAY)
        AND e1.vstdate < e2.vstdate
        AND TIMESTAMPDIFF(HOUR,
            COALESCE(e1.finish_time, CONCAT(e1.vstdate, ' 23:59:00')),
            COALESCE(e2.enter_er_time, CONCAT(e2.vstdate, ' 00:01:00'))
        ) <= 72
      WHERE e2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => ({ return_72h_count: 0 })),
  ]);

  const activeDoctors = activeDoctorsList || [];
  const activeNurses = activeNursesList || [];
  const activeStaff = activeStaffList || [];

  const base = baseAnalytics || {};
  const today = todayBaseAnalytics || {};
  const avgCost = Number(revenueData?.avg_cost || 0);
  const totalVisits30d = Number(base.total_visits || 0);
  const totalVisitsToday = Number(today.total_visits || 0);

  const avgTTD = Number(today.avg_ttd || 0);
  const slaPassRate = totalVisitsToday > 0 ? Math.round((Number(today.sla_pass_count || 0) / totalVisitsToday) * 100 * 10) / 10 : 0;

  const lwbsCount = Number(base.lwbs_count || 0);
  const lwbsRate = totalVisits30d > 0 ? Math.round((lwbsCount / totalVisits30d) * 100 * 10) / 10 : 0;
  // 72h return window — explicit label used throughout EPI and frontend
  const returnCount = Number(returnVisit72h?.return_72h_count || 0);
  const returnRate = totalVisits30d > 0 ? Math.round((returnCount / totalVisits30d) * 100 * 10) / 10 : 0;

  // Triage stay time data (formatted)
  const TRIAGE_NAMES = { 1: 'Resuscitation', 2: 'Emergency', 3: 'Urgent', 4: 'Semi-urgent', 5: 'Non-urgent' };
  const TRIAGE_COLORS = { 1: '#f43f5e', 2: '#f59e0b', 3: '#eab308', 4: '#10b981', 5: '#94a3b8' };
  const triageData = (triageStayTime || []).map(t => ({
    triage: Number(t.triage),
    name: TRIAGE_NAMES[t.triage] || `Level ${t.triage}`,
    color: TRIAGE_COLORS[t.triage] || '#94a3b8',
    count: Number(t.cnt || 0),
    avg_stay: Number(t.avg_stay || 0),
    avg_wait_doctor: Number(t.avg_wait_doctor || 0),
  }));

  // Hourly heatmap (fill all 24 hours)
  const hourlyData = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPattern || []).find(x => Number(x.hour) === h);
    return {
      hour: h,
      label: `${String(h).padStart(2, '0')}:00`,
      total: Number(d?.total || 0),
      avg: Number(d?.avg_daily || 0),
      critical: Number(d?.critical_count || 0),
    };
  });
  const peakHour = hourlyData.reduce((best, h) => h.avg > (best?.avg || 0) ? h : best, hourlyData[0]);

  // Disposition formatting
  const DISPO_NAMES = {
    '1': 'กลับบ้าน', '2': 'Admit IPD', '3': 'ส่งต่อ Refer',
    '4': 'ปฏิเสธรักษา', '5': 'หนีกลับ', '9': 'เสียชีวิต'
  };
  const dispoData = (disposition || []).map(d => ({
    type: d.dch_type,
    name: DISPO_NAMES[d.dch_type] || `Type ${d.dch_type}`,
    count: Number(d.cnt || 0),
    avg_stay: Number(d.avg_stay_min || 0),
  }));
  const admitCount = dispoData.find(d => d.type === '2')?.count || 0;
  const totalDispo = dispoData.reduce((s, d) => s + d.count, 0);
  const admitRate = totalDispo > 0 ? Math.round((admitCount / totalDispo) * 100 * 10) / 10 : 0;

  // Monthly trend
  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
    visits: Number(m.visits || 0),
    critical: Number(m.critical || 0),
    avg_stay: Number(m.avg_stay || 0),
  }));

  // ━━ ER Performance Index (EPI) — Composite 0-100+ ━━
  // Formula: SLA×30% + (100−LWBS%)×20% + TTD_Score×30% + (100−Return%)×20%
  // TTD_Score: 100 = 10min target. <10min = Bonus (e.g., 0min = 113.3 score)
  const ttdScore = Math.max(0, Math.round(100 + (10 - avgTTD) * 1.333));
  const lwbsScore = Math.max(0, 100 - lwbsRate);
  const returnScore = Math.max(0, 100 - returnRate);
  const slaScore = slaPassRate;

  const epi = Math.round(
    (slaScore * 0.30) +
    (lwbsScore * 0.20) +
    (ttdScore * 0.30) +
    (returnScore * 0.20)
  );

  return {
    data_source: 'HOSxP XE · 8 AI Modules',
    epi,
    epi_components: { time_to_doctor: ttdScore, lwbs: lwbsScore, return_visit: returnScore, sla: slaScore },
    total_visits_30d: totalVisits30d,
    avg_daily_visits: totalVisits30d > 0 ? Math.round(totalVisits30d / Math.max(1, Number(base.active_days || 1)) * 10) / 10 : 0,
    return_visit_rate: returnRate,
    return_visit_count: returnCount,
    avg_time_to_doctor: avgTTD,
    median_time_to_doctor: Number(percentiles?.median_ttd || 0),
    p90_time_to_doctor: Number(percentiles?.p90_ttd || 0),
    sd_time_to_doctor: Number(base.sd_ttd || 0),
    lwbs_count: lwbsCount,
    lwbs_rate: lwbsRate,
    admit_rate: admitRate,
    admit_count: admitCount,
    avg_cost_per_visit: avgCost,
    total_er_revenue: Number(revenueData?.total_revenue || 0),
    sla_pass_rate: slaPassRate,
    today_acuity: {
      resus: Number(todayAcuity?.resus || 0),
      emerg: Number(todayAcuity?.emerg || 0),
      urgent: Number(todayAcuity?.urgent || 0),
      semi: Number(todayAcuity?.semi || 0),
      non_urg: Number(todayAcuity?.non_urg || 0),
      total: Number(todayAcuity?.total || 0),
      acuity_pct: Number(todayAcuity?.acuity_pct || 0),
    },
    triage_stay_time: triageData,
    hourly_heatmap: hourlyData,
    peak_hour: { hour: peakHour?.hour, label: peakHour?.label, avg: peakHour?.avg },
    disposition: dispoData,
    monthly_trend: monthData,
    on_duty: {
      doctors: activeDoctors,
      nurses: activeNurses,
      staff: activeStaff
    },
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ ER Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('erRevenueFiscal', 3600000, async (req) => {
  const { getFiscalConfig } = await import('../helpers/fiscal.js');
  const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(req?.query?.start, req?.query?.end);

  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  // Use dbQueryHeavy for the revenue fiscal query with STRAIGHT_JOIN for optimal performance
  const rows = await dbQueryHeavy('erRevFiscalQ_v2', 120, `
    SELECT
      YEAR(e.vstdate) AS yr,
      MONTH(e.vstdate) AS mo,
      COALESCE(SUM(v.income), 0) AS revenue,
      COUNT(DISTINCT e.vn) AS visit_count,
      COUNT(DISTINCT v.hn) AS patient_count
    FROM er_regist e
    STRAIGHT_JOIN vn_stat v ON e.vn = v.vn
    WHERE e.vstdate BETWEEN ? AND LEAST(?, CURDATE())
      AND v.income > 0
    GROUP BY YEAR(e.vstdate), MONTH(e.vstdate)
    ORDER BY yr, mo
  `, [globalStart, globalEnd], { timeoutMs: 25000 });

  const result = fiscalYears.map(fy => {
    const months = [];
    let totalRevenue = 0;
    let totalVisits = 0;
    let totalPatients = 0;

    for (let i = 0; i < 12; i++) {
      const mNum = ((9 + i) % 12) + 1;
      const yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;

      const row = (rows || []).find(r => Number(r.yr) === yNum && Number(r.mo) === mNum);
      const rev = Math.round(Number(row?.revenue || 0));
      const visits = Number(row?.visit_count || 0);
      const patients = Number(row?.patient_count || 0);

      totalRevenue += rev;
      totalVisits += visits;
      totalPatients += patients;

      months.push({
        month: MONTH_TH[mNum], month_num: mNum, year_num: yNum,
        revenue: rev, visits, patients, has_data: visits > 0,
      });
    }

    return {
      fiscal_year_be: fy.fiscalBE,
      fiscal_label: `ปีงบ ${fy.fiscalBE}`,
      start_date: fy.startDate, end_date: fy.endDate,
      total_revenue: totalRevenue,
      total_visits: totalVisits,
      total_patients: totalPatients,
      avg_revenue_per_visit: totalVisits > 0 ? Math.round(totalRevenue / totalVisits) : 0,
      months,
    };
  });

  // ---- Comparable Revenue: fair YoY comparison ----
  const latest = result[result.length - 1];
  const comparableIdx = latest.months.map((m, i) => m.has_data ? i : -1).filter(i => i >= 0);
  const comparableMonthCount = comparableIdx.length;
  for (const fy of result) {
    let compRev = 0, compVis = 0;
    for (const i of comparableIdx) {
      compRev += fy.months[i]?.revenue || 0;
      compVis += fy.months[i]?.visits || 0;
    }
    fy.comparable_revenue = compRev;
    fy.comparable_visits = compVis;
    fy.comparable_months = comparableMonthCount;
  }

  return {
    data_source: 'HOSxP XE · vn_stat + er_regist',
    fiscal_years: result,
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ ER Diversion Status — Auto-computed from Live Load ━━━━━━
// DIVERTED  : รับผู้ป่วยไม่ได้ / ขอให้หน่วยกู้ชีพพิจารณาโรงพยาบาลอื่น
// CAUTION   : รับได้ แต่อาจล่าช้า
// OPEN      : รับผู้ป่วยได้ปกติ
router.get('/diversion-status', cached('erDiversionStatus', 60000, async () => {
  const [currentLoad, criticalToday, longWaiters] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) as waiting_count,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, NOW()))), 0) as avg_wait_min
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
        AND e.er_dch_type IS NULL
        AND e.enter_er_time IS NOT NULL
    `).catch(() => null),

    dbQueryOne(`
      SELECT
        SUM(CASE WHEN e.er_emergency_type = '1' THEN 1 ELSE 0 END) as resus_count,
        SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical_count,
        COUNT(*) as total_today
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    dbQueryOne(`
      SELECT COUNT(*) as long_wait_count
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
        AND e.er_dch_type IS NULL
        AND e.enter_er_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, NOW()) > 120
    `).catch(() => null),
  ]);

  const waiting   = Number(currentLoad?.waiting_count || 0);
  const avgWait   = Number(currentLoad?.avg_wait_min  || 0);
  const resus     = Number(criticalToday?.resus_count   || 0);
  const critical  = Number(criticalToday?.critical_count || 0);
  const total     = Number(criticalToday?.total_today   || 0);
  const longWait  = Number(longWaiters?.long_wait_count || 0);
  const critPct   = total > 0 ? Math.round((critical / total) * 100) : 0;

  // Diversion auto-logic:
  // DIVERTED  : ≥30 กำลังรอ  OR  Resus ≥3 ราย  OR  (≥20 รอ AND เฉลี่ย ≥60 นาที)
  // CAUTION   : ≥15 รอ  OR  เฉลี่ย ≥45 นาที  OR  Critical% ≥20%
  // OPEN      : otherwise
  let status, reason;
  if (waiting >= 30 || resus >= 3 || (waiting >= 20 && avgWait >= 60)) {
    status = 'diverted';
    reason = waiting >= 30 ? `${waiting} รายรอ — เกินขีดความสามารถ`
           : resus >= 3    ? `Resus ${resus} ราย — ทรัพยากรจำกัด`
           :                 `${waiting} ราย รอเฉลี่ย ${avgWait} นาที`;
  } else if (waiting >= 15 || avgWait >= 45 || critPct >= 20) {
    status = 'caution';
    reason = avgWait >= 45 ? `เวลารอเฉลี่ย ${avgWait} นาที`
           :                  `${waiting} รายรอ — หนาแน่นปานกลาง`;
  } else {
    status = 'open';
    reason = `${waiting} รายรอ — รับผู้ป่วยได้ปกติ`;
  }

  return {
    status,           // 'open' | 'caution' | 'diverted'
    reason,
    waiting_count: waiting,
    avg_wait_min:  avgWait,
    resus_count:   resus,
    critical_count: critical,
    critical_pct:  critPct,
    long_wait_count: longWait,
    timestamp: new Date().toISOString(),
  };
}));

export default router;
