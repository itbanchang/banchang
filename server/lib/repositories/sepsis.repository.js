// ============================================================
// BCH 360° Intelligence V.10 — Sepsis Repository (Data Access Layer)
// READ-ONLY queries for sepsis early detection module
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../../db/mysql.js';
import logger from '../../logger.js';

export class SepsisRepository {

  /**
   * Get latest vital signs for a patient within a time window.
   * @param {string} hn - Hospital Number
   * @param {number} hours - Lookback window in hours (default 48)
   * @returns {Promise<Array>}
   */
  async getPatientVitals(hn, hours = 48) {
    return dbQuery(`
      SELECT os.bps, os.bpd, os.pulse, os.rr, os.temperature, os.o2sat, os.bw,
             o.vstdate, o.vsttime
      FROM opdscreen os
      INNER JOIN ovst o ON os.vn = o.vn
      WHERE o.hn = ?
        AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        AND os.bps > 0
      ORDER BY o.vstdate DESC, o.vsttime DESC
      LIMIT 10
    `, [hn, Math.ceil(hours / 24)]).catch(err => {
      logger.warn('Sepsis getPatientVitals failed', { err: err.message, hn });
      return [];
    });
  }

  /**
   * Get sepsis-relevant lab results for a patient.
   * Targets: WBC, Platelet, Creatinine, Bilirubin, Lactate, Procalcitonin, CRP
   * @param {string} hn - Hospital Number
   * @param {number} hours - Lookback window in hours (default 48)
   * @returns {Promise<Array>}
   */
  async getPatientLabs(hn, hours = 48) {
    return dbQuery(`
      SELECT lo.lab_items_name_ref as test_name,
             lo.lab_order_result as result,
             lo.lab_items_normal_value_ref as normal_range,
             lo.abnormal_result as abnormal,
             lh.order_date, lh.order_time
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.hn = ?
        AND lh.order_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        AND lo.lab_order_result IS NOT NULL
        AND lo.lab_order_result != ''
        AND (
          lo.lab_items_name_ref LIKE '%WBC%'
          OR lo.lab_items_name_ref LIKE '%White%'
          OR lo.lab_items_name_ref LIKE '%Platelet%'
          OR lo.lab_items_name_ref LIKE '%PLT%'
          OR lo.lab_items_name_ref LIKE '%Creatinine%'
          OR lo.lab_items_name_ref LIKE '%Bilirubin%'
          OR lo.lab_items_name_ref LIKE '%Lactate%'
          OR lo.lab_items_name_ref LIKE '%Procalcitonin%'
          OR lo.lab_items_name_ref LIKE '%PCT%'
          OR lo.lab_items_name_ref LIKE '%CRP%'
          OR lo.lab_items_name_ref LIKE '%culture%'
          OR lo.lab_items_name_ref LIKE '%Hemoculture%'
        )
      ORDER BY lh.order_date DESC, lh.order_time DESC
    `, [hn, Math.ceil(hours / 24)]).catch(err => {
      logger.warn('Sepsis getPatientLabs failed', { err: err.message, hn });
      return [];
    });
  }

  /**
   * Get all current inpatients (not discharged).
   * @returns {Promise<Array>}
   */
  async getCurrentIPDPatients() {
    return dbQuery(`
      SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
         TIMESTAMPDIFF(YEAR,p.birthday,NOW()) AS age, p.sex,
         w.name AS ward, w.ward AS ward_id,
         i.regdate, DATEDIFF(NOW(),i.regdate) AS stay_days,
         d.name AS doctor
      FROM ipt i
      INNER JOIN patient p ON i.hn = p.hn
      LEFT JOIN ward w ON i.ward = w.ward
      LEFT JOIN doctor d ON i.admdoctor = d.code
      WHERE i.dchdate IS NULL
      ORDER BY i.regdate ASC
    `).catch(err => {
      logger.warn('Sepsis getCurrentIPDPatients failed', { err: err.message });
      return [];
    });
  }

  /**
   * Check if patient has infection-related diagnoses (ICD-10 A/B, pneumonia, UTI, etc.)
   * @param {string} hn - Hospital Number
   * @returns {Promise<boolean>}
   */
  async getPatientInfectionHistory(hn) {
    const result = await dbQueryOne(`
      SELECT COUNT(*) as cnt
      FROM ipt i
      INNER JOIN iptdiag d ON i.an = d.an
      WHERE i.hn = ? AND i.dchdate IS NULL
        AND (
          d.icd10 LIKE 'A%' OR d.icd10 LIKE 'B%'
          OR d.icd10 BETWEEN 'J09' AND 'J189'
          OR d.icd10 BETWEEN 'N10' AND 'N129'
          OR d.icd10 BETWEEN 'K65' AND 'K659'
          OR d.icd10 BETWEEN 'L00' AND 'L089'
          OR d.icd10 = 'R572'
          OR d.icd10 LIKE 'A41%'
        )
    `, [hn]).catch(() => ({ cnt: 0 }));

    return Number(result?.cnt || 0) > 0;
  }

  /**
   * Get sepsis screening proxy results from vital signs for a given date range.
   * Uses SIRS-like criteria applied to opdscreen data.
   * @param {number} days - Number of days to look back (default 7)
   * @returns {Promise<Object>}
   */
  async getSepsisScreeningResults(days = 7) {
    return dbQueryOne(`
      SELECT
        COUNT(DISTINCT o.hn) as screened,
        SUM(CASE WHEN os.bps <= 100 AND os.pulse > 90 AND os.temperature > 38.0 THEN 1 ELSE 0 END) as sirs_positive,
        SUM(CASE WHEN os.bps <= 100 AND os.rr >= 22 THEN 1 ELSE 0 END) as qsofa_proxy,
        SUM(CASE WHEN os.bps <= 90 THEN 1 ELSE 0 END) as hypotension,
        SUM(CASE WHEN os.pulse > 100 THEN 1 ELSE 0 END) as tachycardia,
        SUM(CASE WHEN os.temperature > 38.3 THEN 1 ELSE 0 END) as fever,
        SUM(CASE WHEN os.rr >= 22 THEN 1 ELSE 0 END) as tachypnea,
        SUM(CASE WHEN os.o2sat < 94 AND os.o2sat > 0 THEN 1 ELSE 0 END) as hypoxia
      FROM ipt i
      INNER JOIN ovst o ON i.hn = o.hn AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      INNER JOIN opdscreen os ON o.vn = os.vn
      WHERE i.dchdate IS NULL AND os.bps > 0
    `, [days]).catch(err => {
      logger.warn('Sepsis getSepsisScreeningResults failed', { err: err.message });
      return null;
    });
  }

  /**
   * Get antibiotic orders for a patient within a time window.
   * @param {string} hn - Hospital Number
   * @param {number} hours - Lookback window in hours (default 48)
   * @returns {Promise<Array>}
   */
  async getAntibioticOrders(hn, hours = 48) {
    return dbQuery(`
      SELECT di.name as drug_name, oe.qty, oe.vstdate as order_date, oe.vsttime as order_time
      FROM opitemrece oe
      INNER JOIN drugitems di ON oe.icode = di.icode
      WHERE oe.hn = ?
        AND oe.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        AND (di.name LIKE '%cillin%' OR di.name LIKE '%mycin%' OR di.name LIKE '%oxacin%'
             OR di.name LIKE '%penem%' OR di.name LIKE '%cycline%' OR di.name LIKE '%azole%'
             OR di.name LIKE '%Ceftriaxone%' OR di.name LIKE '%Meropenem%'
             OR di.name LIKE '%Vancomycin%' OR di.name LIKE '%Piperacillin%')
      ORDER BY oe.vstdate DESC, oe.vsttime DESC
      LIMIT 20
    `, [hn, Math.ceil(hours / 24)]).catch(err => {
      logger.warn('Sepsis getAntibioticOrders failed', { err: err.message, hn });
      return [];
    });
  }

  /**
   * Get sepsis incidence trend over N days.
   * @param {number} days - Number of days (default 30)
   * @returns {Promise<Array>}
   */
  async getSepsisTrend(days = 30) {
    return dbQuery(`
      SELECT DATE(o.vstdate) as d,
        COUNT(DISTINCT o.hn) as screened,
        SUM(CASE WHEN os.bps <= 100 AND os.pulse > 90 AND os.temperature > 38.0 THEN 1 ELSE 0 END) as sirs_proxy,
        SUM(CASE WHEN os.bps <= 100 AND os.rr >= 22 THEN 1 ELSE 0 END) as qsofa_proxy,
        SUM(CASE WHEN os.temperature > 38.0 THEN 1 ELSE 0 END) as fever_count,
        SUM(CASE WHEN os.bps <= 90 THEN 1 ELSE 0 END) as hypotension_count
      FROM ipt i
      INNER JOIN ovst o ON i.hn = o.hn AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      INNER JOIN opdscreen os ON o.vn = os.vn
      WHERE i.dchdate IS NULL AND os.bps > 0
      GROUP BY DATE(o.vstdate)
      ORDER BY d
    `, [days]).catch(err => {
      logger.warn('Sepsis getSepsisTrend failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get ward-level sepsis screening summary.
   * @returns {Promise<Array>}
   */
  async getWardSepsisSummary() {
    return dbQuery(`
      SELECT w.name as ward, w.ward as ward_id,
        COUNT(DISTINCT i.hn) as total_patients,
        SUM(CASE WHEN os.bps <= 100 AND os.pulse > 90 THEN 1 ELSE 0 END) as at_risk,
        SUM(CASE WHEN os.temperature > 38.0 THEN 1 ELSE 0 END) as febrile,
        ROUND(AVG(os.bps), 0) as avg_sbp,
        ROUND(AVG(os.pulse), 0) as avg_hr,
        ROUND(AVG(os.temperature), 1) as avg_temp
      FROM ipt i
      INNER JOIN patient p ON i.hn = p.hn
      LEFT JOIN ward w ON i.ward = w.ward
      LEFT JOIN ovst o ON i.hn = o.hn AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)
      LEFT JOIN opdscreen os ON o.vn = os.vn AND os.bps > 0
      WHERE i.dchdate IS NULL AND i.ward != '06'
      GROUP BY w.ward, w.name
      ORDER BY at_risk DESC
    `).catch(err => {
      logger.warn('Sepsis getWardSepsisSummary failed', { err: err.message });
      return [];
    });
  }
}

/** Singleton instance */
export const sepsisRepository = new SepsisRepository();
