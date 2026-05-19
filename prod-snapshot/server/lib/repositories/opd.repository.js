// ============================================================
// BCH 360° Intelligence V.10 — OPD Repository (Data Access Layer)
// Extracts all SQL queries from server/routes/opd.js
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../../db/mysql.js';
import { getMV } from '../../db/materializedViews.js';
import logger from '../../logger.js';

/**
 * @typedef {Object} OPDTodaySummary
 * @property {number} total
 * @property {number} completed
 * @property {number} still_here
 * @property {number} avg_wait_to_screen
 * @property {number} avg_screen_to_doctor
 * @property {number} avg_doctor_to_pharmacy
 * @property {number} avg_pharmacy_to_finance
 * @property {number} is_holiday_db
 */

/**
 * @typedef {Object} OPDBreakdown
 * @property {number} male
 * @property {number} female
 * @property {number} new_patient
 * @property {number} revisit_patient
 * @property {number} sla_pct
 * @property {number} max_wait
 * @property {number} waiting_doctor
 * @property {number} peak_hour
 */

/**
 * @typedef {Object} OPDHourlyEntry
 * @property {number} hr
 * @property {number} cnt
 * @property {number} completed_cnt
 * @property {number} waiting_cnt
 */

/**
 * @typedef {Object} OPDClinicSummary
 * @property {string} clinic
 * @property {number} visits
 * @property {number} avg_total
 * @property {number} avg_wait
 * @property {number} still_waiting
 */

export class OPDRepository {

  /**
   * Get today's OPD visit summary with wait time steps.
   * @returns {Promise<OPDTodaySummary|null>}
   */
  async getTodaySummary() {
    return dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL OR o.ovstost IN ('01', '02', '03', '04', '05', '54', '61', '89', '99') THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98')) THEN 1 ELSE 0 END) as still_here,
        AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), CONCAT(o.vstdate, ' ', st.service1)) END) as avg_wait_to_screen,
        AVG(CASE WHEN st.service2 IS NOT NULL AND st.service2 > st.service1 AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service1), CONCAT(o.vstdate, ' ', st.service2)) END) as avg_screen_to_doctor,
        AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > st.service2 AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service2), CONCAT(o.vstdate, ' ', st.service7)) END) as avg_doctor_to_pharmacy,
        AVG(CASE WHEN r.bill_time IS NOT NULL AND r.bill_time > st.service7 AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service7), CONCAT(o.vstdate, ' ', r.bill_time)) END) as avg_pharmacy_to_finance,
        (SELECT COUNT(*) FROM holiday WHERE holiday_date = CURDATE()) as is_holiday_db
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `).catch(err => { logger.warn('OPD getTodaySummary failed', { err: err.message }); return null; });
  }

  /**
   * Get today's OPD gender/new-revisit breakdown + SLA KPIs.
   * @returns {Promise<OPDBreakdown|null>}
   */
  async getTodayBreakdown() {
    return dbQueryOne(`
      SELECT
        SUM(CASE WHEN p.sex IN ('1','ช','ช ','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','ญ ','หญิง') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN o.ovstost IN ('1','2') THEN 1 ELSE 0 END) as new_patient,
        SUM(CASE WHEN o.ovstost NOT IN ('1','2') OR o.ovstost IS NULL THEN 1 ELSE 0 END) as revisit_patient,
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
        MAX(CASE
          WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) AND r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN ROUND((TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60)
          WHEN (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54')) AND st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN ROUND((TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60)
          ELSE NULL END) as max_wait,
        SUM(CASE
          WHEN st.service2 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98')) THEN 1
          ELSE 0 END) as waiting_doctor,
        (SELECT HOUR(o_inner.vsttime) FROM ovst o_inner FORCE INDEX (ix_vstdate)
          WHERE o_inner.vstdate = CURDATE() GROUP BY HOUR(o_inner.vsttime)
          ORDER BY COUNT(*) DESC LIMIT 1) as peak_hour
      FROM ovst o FORCE INDEX (ix_vstdate)
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `).catch(err => { logger.warn('OPD getTodayBreakdown failed', { err: err.message }); return null; });
  }

  /**
   * Get today's hourly visit distribution.
   * @returns {Promise<OPDHourlyEntry[]>}
   */
  async getTodayHourly() {
    return dbQuery(`
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
    `).catch(err => { logger.warn('OPD getTodayHourly failed', { err: err.message }); return []; });
  }

  /**
   * Get today's patient list with status and wait times.
   * @param {number} [limit=200] - Max patients to return
   * @returns {Promise<Array>}
   */
  async getTodayPatients(limit = 200) {
    return dbQuery(`
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
      ORDER BY o.vsttime DESC LIMIT ${Number(limit)}
    `).catch(err => { logger.warn('OPD getTodayPatients failed', { err: err.message }); return []; });
  }

  /**
   * Get advanced analytics: dropout, wait stddev, doctor yield, completion rate.
   * @returns {Promise<Object|null>}
   */
  async getAdvancedAnalytics() {
    return dbQueryOne(`
      SELECT
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
    `).catch(err => { logger.warn('OPD getAdvancedAnalytics failed', { err: err.message }); return null; });
  }

  /**
   * Get yesterday's hourly visit distribution (cached 8 hours).
   * @returns {Promise<Array>}
   */
  async getYesterdayHourly() {
    return dbQueryHeavy('opdYesterdayHourly', 480, `
      SELECT HOUR(vsttime) as hr, COUNT(*) as cnt
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hr
    `).catch(() => []);
  }

  /**
   * Get 7-day average hourly distribution with standard deviation (cached 24 hours).
   * @returns {Promise<Array>}
   */
  async getAvgHourly7d() {
    return dbQueryHeavy('opdAvgHourly7d', 1440, `
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
    `).catch(err => { logger.warn('OPD getAvgHourly7d failed', { error: err.message }); return []; });
  }

  /**
   * Get raw wait-time list for P50/P90 calculation.
   * @returns {Promise<Array<{wait_min: number}>>}
   */
  async getWaitTimeList() {
    return dbQuery(`
      SELECT
        (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime)) / 60 as wait_min
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
        AND (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
        AND TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) > TIME_TO_SEC(o.vsttime)
      ORDER BY wait_min
    `).catch(() => []);
  }

  /**
   * Get 7-day revisit count and percentage (cached 30 min).
   * @returns {Promise<{revisit_7d_count: number, revisit_7d_pct: number}>}
   */
  async getRevisitData() {
    return dbQueryOneHeavy('opdRevisit7d', 30, `
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
    `).catch(() => ({ revisit_7d_count: 0, revisit_7d_pct: 0 }));
  }

  /**
   * Get mean revenue per visit today (tries materialized view first, then direct query).
   * @returns {Promise<{avg_revenue_per_visit: number, total_opd_revenue: number}>}
   */
  async getRevenuePerVisit() {
    const mvRows = getMV('mv_opd_revenue_per_visit');
    const today = new Date().toISOString().split('T')[0];
    const todayRow = mvRows?.find(r => String(r.vstdate).startsWith(today));
    if (todayRow) {
      return {
        avg_revenue_per_visit: Number(todayRow.avg_revenue_per_visit || 0),
        total_opd_revenue: Number(todayRow.total_charge || 0),
      };
    }
    return dbQueryOneHeavy('opdRevPerVisit', 15, `
      SELECT
        ROUND(AVG(t.total_charge), 0) as avg_revenue_per_visit,
        ROUND(SUM(t.total_charge), 0) as total_opd_revenue
      FROM (
        SELECT oi.vn, SUM(oi.qty * oi.unitprice) as total_charge
        FROM opitemrece oi FORCE INDEX (ix_vstdate)
        WHERE oi.vstdate = CURDATE()
        GROUP BY oi.vn
      ) t
    `).catch(() => ({ avg_revenue_per_visit: 0, total_opd_revenue: 0 }));
  }

  /**
   * Get Level 4 operational intelligence: elderly/child counts, morning/afternoon split, etc.
   * @returns {Promise<Object|null>}
   */
  async getLevel4Data() {
    return dbQueryOneHeavy('opdLevel4Today', 15, `
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
    `).catch(() => null);
  }

  /**
   * Get yesterday's summary for comparison (cached 30 min).
   * @returns {Promise<Object|null>}
   */
  async getYesterdaySummary() {
    return dbQueryOneHeavy('opdYesterdaySummary', 30, `
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
    `).catch(() => null);
  }

  /**
   * Get active OPD doctors today (strictly OPD, no ER, 3 shifts).
   * @returns {Promise<Array>}
   */
  async getActiveDoctors() {
    return dbQuery(`
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
    `).catch(() => []);
  }

  /**
   * Get active OPD nurses today (clinical activity: BP, PQ, assessment — 3 shifts).
   * @returns {Promise<Array>}
   */
  async getActiveNurses() {
    return dbQuery(`
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
    `).catch(() => []);
  }

  /**
   * Get active OPD support staff today (non-doctor, non-nurse — 3 shifts).
   * @returns {Promise<Array>}
   */
  async getActiveStaff() {
    return dbQuery(`
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
    `).catch(() => []);
  }

  /**
   * Get wait times by clinic for today.
   * @returns {Promise<OPDClinicSummary[]>}
   */
  async getByClinic() {
    return dbQuery(`
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
    `).catch(() => []);
  }

  /**
   * Get 7-day wait time trend (cached 30 min).
   * @returns {Promise<Array>}
   */
  async getWaitTrend() {
    return dbQueryHeavy('opdWaitTrend7d', 30, `
      SELECT o.vstdate as date, COUNT(*) as visits,
        AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > o.vsttime
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7)) END) as avg_total,
        AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service1)) END) as avg_wait
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY o.vstdate ORDER BY o.vstdate
    `).catch(() => []);
  }

  /**
   * Get drill-down wait distribution (under30, to60, to90, over90) + top waiters.
   * @returns {Promise<{stats: Object, topWaiters: Array}>}
   */
  async getDrilldownWait() {
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
      `),
    ]);
    return { stats: stats || { under30: 0, to60: 0, to90: 0, over90: 0 }, topWaiters: topWaiters || [] };
  }
}

/** Singleton instance */
export const opdRepository = new OPDRepository();
