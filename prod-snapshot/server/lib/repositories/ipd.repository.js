// ============================================================
// BCH 360° Intelligence V.10 — IPD Repository (Data Access Layer)
// Extracts key SQL queries from server/routes/ipd.js
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../../db/mysql.js';
import logger from '../../logger.js';

/**
 * Ward '06' = Home Ward — patients do not occupy real beds.
 * Must be excluded from Occupancy, Turnover, and Analytics.
 */
const HOME_WARD = '06';

/**
 * @typedef {Object} IPDCensusRow
 * @property {number} total_current - Patients currently admitted (excl Home Ward)
 * @property {number} male
 * @property {number} female
 * @property {number} avg_age
 * @property {number} elderly
 * @property {number} pediatric
 */

/**
 * @typedef {Object} IPDSummaryStats
 * @property {number} discharged_30d
 * @property {number} actual_alos
 * @property {number} benchmark_alos
 * @property {number} alos_cases
 * @property {number} total_revenue
 * @property {number} total_bed_days
 */

/**
 * @typedef {Object} IPDQualityMetrics
 * @property {number} readmit_count
 * @property {number} total_discharges
 * @property {number} cmi
 * @property {number} cmi_stddev
 * @property {number} cmi_cases
 * @property {number} total_dch
 * @property {number} before_noon
 * @property {number} deaths
 */

export class IPDRepository {

  /**
   * Get current IPD census: gender, age distribution (excl Home Ward).
   * @returns {Promise<IPDCensusRow|null>}
   */
  async getCurrentCensus() {
    return dbQueryOne(`
      SELECT
        COUNT(*) as total_current,
        SUM(CASE WHEN p.sex IN ('1','ช') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ') THEN 1 ELSE 0 END) as female,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, NOW())), 1) as avg_age,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 60 THEN 1 ELSE 0 END) as elderly,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) < 15 THEN 1 ELSE 0 END) as pediatric
      FROM ipt i INNER JOIN patient p ON i.hn = p.hn
      WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}'
    `).catch(err => { logger.warn('IPD getCurrentCensus failed', { err: err.message }); return null; });
  }

  /**
   * Get combined summary stats: bed turnover, ALOS variance, revenue per bed-day (cached 60 min).
   * @returns {Promise<IPDSummaryStats|null>}
   */
  async getSummaryStats() {
    return dbQueryOneHeavy('ipdSummaryStats', 60, `
      SELECT
        (SELECT COUNT(*) FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND dchdate IS NOT NULL AND ward != '${HOME_WARD}') as discharged_30d,
        (SELECT ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1)
         FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.rw > 0) as actual_alos,
        (SELECT ROUND(AVG(a.rw * 4), 1)
         FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.rw > 0) as benchmark_alos,
        (SELECT COUNT(*)
         FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.rw > 0) as alos_cases,
        (SELECT SUM(a.income)
         FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.income > 0) as total_revenue,
        (SELECT SUM(DATEDIFF(i.dchdate, i.regdate))
         FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.income > 0) as total_bed_days
    `).catch(err => { logger.warn('IPD getSummaryStats failed', { err: err.message }); return null; });
  }

  /**
   * Get 7-day admission/discharge trend.
   * @returns {Promise<Array<{d: string, admissions: number, discharges: number}>>}
   */
  async getAdmissionTrend() {
    return dbQuery(`
      SELECT DATE(regdate) as d, COUNT(*) as admissions,
        SUM(CASE WHEN dchdate IS NOT NULL THEN 1 ELSE 0 END) as discharges
      FROM ipt
      WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(regdate) ORDER BY d
    `).catch(err => { logger.warn('IPD getAdmissionTrend failed', { err: err.message }); return []; });
  }

  /**
   * Get overstay analysis: count of patients staying > 14 days.
   * @returns {Promise<Object|null>}
   */
  async getOverstayAnalysis() {
    return dbQueryOne(`
      SELECT
        SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14 THEN 1 ELSE 0 END) as overstay_count,
        ROUND(AVG(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14
            THEN DATEDIFF(NOW(), i.regdate) - 14 END), 1) as avg_excess_days,
        COUNT(*) as total_current
      FROM ipt i WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}'
    `).catch(err => { logger.warn('IPD getOverstayAnalysis failed', { err: err.message }); return null; });
  }

  /**
   * Get combined quality metrics: readmission, CMI, discharge planning, mortality (cached 60 min).
   * @returns {Promise<IPDQualityMetrics|null>}
   */
  async getQualityMetrics() {
    return dbQueryOneHeavy('ipdQualityMetrics', 60, `
      SELECT
        (SELECT COUNT(DISTINCT i2.an)
         FROM ipt i1 LEFT JOIN ipt i2 ON i1.hn = i2.hn AND i2.an != i1.an
         AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
         WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
         AND i1.dchdate IS NOT NULL AND i1.ward != '${HOME_WARD}') as readmit_count,
        (SELECT COUNT(DISTINCT i1.an)
         FROM ipt i1 WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
         AND i1.dchdate IS NOT NULL AND i1.ward != '${HOME_WARD}') as total_discharges,
        (SELECT ROUND(AVG(a.rw), 3) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.rw > 0) as cmi,
        (SELECT ROUND(STDDEV(a.rw), 3) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.rw > 0) as cmi_stddev,
        (SELECT COUNT(*) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.rw > 0) as cmi_cases,
        (SELECT COUNT(*) FROM ipt i
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND i.dchtime IS NOT NULL
         AND i.ward != '${HOME_WARD}') as total_dch,
        (SELECT SUM(CASE WHEN HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END)
         FROM ipt i WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND i.dchtime IS NOT NULL
         AND i.ward != '${HOME_WARD}') as before_noon,
        (SELECT SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9' THEN 1 ELSE 0 END)
         FROM ipt i WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND i.ward != '${HOME_WARD}') as deaths
    `).catch(err => { logger.warn('IPD getQualityMetrics failed', { err: err.message }); return null; });
  }

  /**
   * Get current acuity + revenue per discharge (cached 60 min).
   * @returns {Promise<Object|null>}
   */
  async getAcuityRevenue() {
    return dbQueryOneHeavy('ipdAcuityRevenueDow', 60, `
      SELECT
        (SELECT ROUND(AVG(a.rw), 3) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}' AND a.rw > 0) as current_acuity,
        (SELECT SUM(CASE WHEN a.rw >= 2 THEN 1 ELSE 0 END)
         FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}' AND a.rw > 0) as high_acuity,
        (SELECT COUNT(*) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.income > 0) as total_dch_rev,
        (SELECT SUM(a.income) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND i.dchdate IS NOT NULL AND a.income > 0) as total_revenue_rev,
        (SELECT COUNT(*) FROM ipt
         WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
         AND ward != '${HOME_WARD}') as dow_total
    `).catch(err => { logger.warn('IPD getAcuityRevenue failed', { err: err.message }); return null; });
  }

  /**
   * Get active IPD doctors.
   * @returns {Promise<Array>}
   */
  async getActiveDoctors() {
    return dbQuery(`
      SELECT u.loginname, u.name, COUNT(i.an) as total_count
      FROM ipt i JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
      WHERE i.dchdate IS NULL GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 10
    `).catch(() => []);
  }

  /**
   * Get active IPD nurses today.
   * @returns {Promise<Array>}
   */
  async getActiveNurses() {
    return dbQuery(`
      SELECT u.loginname, u.name,
        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
        COUNT(*) as total_count
      FROM (
        SELECT assessment_head_staff as staff, assessment_head_datetime as activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
        UNION ALL
        SELECT staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
      ) as activity
      JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 10
    `).catch(() => []);
  }

  /**
   * Get active IPD support staff today.
   * @returns {Promise<Array>}
   */
  async getActiveStaff() {
    return dbQuery(`
      SELECT u.loginname, u.name,
        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
        COUNT(*) as total_count
      FROM (
        SELECT assessment_head_staff as staff, assessment_head_datetime as activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
        UNION ALL
        SELECT staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
      ) as activity
      JOIN opduser u ON activity.staff = u.loginname
      WHERE u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
        AND u.loginname != 'kiosk'
      GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 10
    `).catch(() => []);
  }

  /**
   * Get ALOS data with overall 30-day stats.
   * @returns {Promise<{alos: number, total_dch: number}>}
   */
  async getALOSSummary() {
    return dbQueryOne(`
      SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as alos,
             COUNT(*) as total_dch
      FROM ipt
      WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND dchdate IS NOT NULL AND ward != '${HOME_WARD}'
        AND DATEDIFF(dchdate, regdate) BETWEEN 0 AND 60
    `).catch(() => ({ alos: 0, total_dch: 0 }));
  }

  /**
   * Get IPD fiscal revenue data for 3-year comparison.
   * @param {string} globalStart - Start date
   * @param {string} globalEnd - End date
   * @returns {Promise<Array>}
   */
  async getRevenueFiscal(globalStart, globalEnd) {
    return dbQuery(`
      SELECT
        YEAR(i.dchdate) AS yr,
        MONTH(i.dchdate) AS mo,
        SUM(a.income) AS revenue,
        COUNT(DISTINCT i.an) AS case_count,
        COUNT(DISTINCT i.hn) AS patient_count,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS avg_los,
        ROUND(AVG(a.rw), 3) AS avg_rw
      FROM ipt i
      INNER JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate BETWEEN ? AND LEAST(?, CURDATE())
        AND i.dchdate IS NOT NULL
        AND a.income > 0
        AND i.ward != '${HOME_WARD}'
      GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
      ORDER BY yr, mo
    `, [globalStart, globalEnd]).catch(err => {
      logger.warn('IPD getRevenueFiscal failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get bed flow: admits vs discharges over N days.
   * @param {number} [days=30] - Number of days to look back
   * @returns {Promise<Array>}
   */
  async getBedFlow(days = 30) {
    return dbQuery(`
      SELECT DATE(regdate) as d,
        COUNT(*) as admissions,
        SUM(CASE WHEN dchdate IS NOT NULL THEN 1 ELSE 0 END) as discharges
      FROM ipt
      WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        AND ward != '${HOME_WARD}'
      GROUP BY DATE(regdate)
      ORDER BY d
    `, [days]).catch(err => { logger.warn('IPD getBedFlow failed', { err: err.message }); return []; });
  }
}

/** Singleton instance */
export const ipdRepository = new IPDRepository();
