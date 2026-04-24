// ============================================================
// BCH 360° Intelligence V.10 — Drug Safety Repository (Data Access Layer)
// SQL queries for ADR, allergy, drug interaction data
// Tables: opd_allergy, drug_interaction, drug_interaction_incident,
//         drugitems, patient_adr, opd_allergy_cross_chk, opitemrece
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../../db/mysql.js';
import logger from '../../logger.js';

export class DrugSafetyRepository {

  /**
   * Get all allergies recorded for a patient.
   * @param {string} hn - Hospital number
   * @returns {Promise<Array>}
   */
  async getPatientAllergies(hn) {
    return dbQuery(`
      SELECT
        oa.hn, oa.agent, oa.symptom, oa.report_date,
        oa.seriousness_id, oa.allergy_type, oa.icode,
        oa.no_alert, oa.preventable,
        COALESCE(als.seiousness_name, '') AS seriousness_name,
        COALESCE(ar.result_name, '') AS result_name,
        COALESCE(arel.relation_name, '') AS relation_name,
        COALESCE(ort.opd_allergy_report_type_name, '') AS report_type_name
      FROM opd_allergy oa
      LEFT JOIN allergy_seriousness als ON oa.seriousness_id = als.seriousness_id
      LEFT JOIN allergy_result ar ON oa.allergy_result_id = ar.allergy_result_id
      LEFT JOIN allergy_relation arel ON oa.allergy_relation_id = arel.allergy_relation_id
      LEFT JOIN opd_allergy_report_type ort ON oa.opd_allergy_report_type_id = ort.opd_allergy_report_type_id
      WHERE oa.hn = ?
      ORDER BY oa.seriousness_id DESC, oa.report_date DESC
    `, [hn]).catch(err => {
      logger.warn('[DrugSafety] getPatientAllergies failed', { hn, err: err.message });
      return [];
    });
  }

  /**
   * Get a patient's current medications (today or recent 7 days).
   * @param {string} hn - Hospital number
   * @param {number} [days=7] - Lookback days
   * @returns {Promise<Array>}
   */
  async getPatientCurrentMedications(hn, days = 7) {
    return dbQuery(`
      SELECT DISTINCT di.icode, di.name, di.generic_name,
        di.therapeutic, di.therapeuticgroup,
        di.dosageform, di.strength, di.units,
        di.alert_level, di.criticalpriority,
        di.antibiotic, di.high_cost, di.habit_forming,
        di.pharmacology_group1,
        MAX(oi.vstdate) as last_dispensed
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.hn = ? AND oi.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY di.icode, di.name, di.generic_name, di.therapeutic,
        di.therapeuticgroup, di.dosageform, di.strength, di.units,
        di.alert_level, di.criticalpriority, di.antibiotic,
        di.high_cost, di.habit_forming, di.pharmacology_group1
      ORDER BY last_dispensed DESC, di.name
    `, [hn, days]).catch(err => {
      logger.warn('[DrugSafety] getPatientCurrentMedications failed', { hn, err: err.message });
      return [];
    });
  }

  /**
   * Get drug interaction rules matching given drug names.
   * @param {string} icode1 - Drug name or code 1
   * @param {string} icode2 - Drug name or code 2
   * @returns {Promise<Array>}
   */
  async getDrugInteractions(icode1, icode2) {
    return dbQuery(`
      SELECT di.drug_interaction_id, di.drugname1, di.drugname2,
        di.drug_interaction_type, di.severity, di.note,
        di.not_allow, di.show_doctor, di.check_old_prescription
      FROM drug_interaction di
      WHERE (di.drugname1 = ? AND di.drugname2 = ?)
         OR (di.drugname1 = ? AND di.drugname2 = ?)
      ORDER BY di.severity DESC
    `, [icode1, icode2, icode2, icode1]).catch(err => {
      logger.warn('[DrugSafety] getDrugInteractions failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get all drug interaction reference rules.
   * @returns {Promise<Array>}
   */
  async getAllDrugInteractionRules() {
    return dbQueryHeavy('drugInteractionRules_v1', 60, `
      SELECT di.drug_interaction_id, di.drugname1, di.drugname2,
        di.drug_interaction_type, di.severity, di.note,
        di.not_allow, di.show_doctor
      FROM drug_interaction di
      ORDER BY di.severity DESC
    `, [], { timeoutMs: 10000 }).catch(err => {
      logger.warn('[DrugSafety] getAllDrugInteractionRules failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get cross-allergy groups for a patient.
   * @param {string} hn - Hospital number
   * @returns {Promise<Array>}
   */
  async getDrugAllergyGroups(hn) {
    return dbQuery(`
      SELECT oac.opd_allergy_cross_chk_id, oac.hn,
        oac.agent, oac.cross_agent, oac.allow_order
      FROM opd_allergy_cross_chk oac
      WHERE oac.hn = ?
      ORDER BY oac.agent
    `, [hn]).catch(err => {
      logger.warn('[DrugSafety] getDrugAllergyGroups failed', { hn, err: err.message });
      return [];
    });
  }

  /**
   * Get ADR history for a patient (from patient_adr table).
   * @param {string} hn - Hospital number
   * @returns {Promise<Array>}
   */
  async getADRHistory(hn) {
    return dbQuery(`
      SELECT pa.patient_adr_id, pa.hn, pa.department, pa.an,
        pa.has_adr_history, pa.adverse_effect, pa.adverse_effect_date,
        pa.lab_pe_text, pa.report_date, pa.medication_list,
        COALESCE(ao.adr_outcome_name, '') AS outcome_name,
        COALESCE(ap.adr_possibility_name, '') AS possibility_name,
        COALESCE(asr.adr_seriousness_name, '') AS seriousness_name,
        COALESCE(ac.adr_cause_name, '') AS cause_name
      FROM patient_adr pa
      LEFT JOIN adr_outcome ao ON pa.adr_outcome_id = ao.adr_outcome_id
      LEFT JOIN adr_possibility ap ON pa.adr_possibility_id = ap.adr_possibility_id
      LEFT JOIN adr_seriousness asr ON pa.adr_seriousness_id = asr.adr_seriousness_id
      LEFT JOIN adr_cause ac ON pa.adr_cause_id = ac.adr_cause_id
      WHERE pa.hn = ?
      ORDER BY pa.report_date DESC
    `, [hn]).catch(err => {
      logger.warn('[DrugSafety] getADRHistory failed', { hn, err: err.message });
      return [];
    });
  }

  /**
   * Get high-alert drugs from the formulary.
   * Drugs with alert_level >= 3, criticalpriority >= 3, or high_cost = 'Y'.
   * @returns {Promise<Array>}
   */
  async getHighAlertDrugs() {
    return dbQueryHeavy('highAlertDrugs_v1', 60, `
      SELECT di.icode, di.name, di.generic_name, di.strength,
        di.dosageform, di.therapeutic, di.therapeuticgroup,
        di.alert_level, di.criticalpriority, di.high_cost,
        di.antibiotic, di.habit_forming, di.unitprice
      FROM drugitems di
      WHERE (di.alert_level >= 3 OR di.criticalpriority >= 3 OR di.high_cost = 'Y')
        AND di.istatus = 'Y'
      ORDER BY di.alert_level DESC, di.criticalpriority DESC, di.name
    `, [], { timeoutMs: 10000 }).catch(err => {
      logger.warn('[DrugSafety] getHighAlertDrugs failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get today's prescriptions with potential alerts.
   * Returns today's dispensed drugs that are high-alert, antibiotics, or habit-forming.
   * @returns {Promise<Array>}
   */
  async getTodayPrescriptionsWithAlerts() {
    return dbQueryHeavy('todayRxAlerts_v1', 5, `
      SELECT oi.vn, oi.hn, oi.icode, di.name, di.generic_name,
        di.alert_level, di.criticalpriority, di.high_cost,
        di.antibiotic, di.habit_forming, di.therapeutic,
        oi.qty, oi.unitprice as rx_price, oi.staff
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE()
        AND (di.alert_level >= 3 OR di.criticalpriority >= 3
             OR di.high_cost = 'Y' OR di.antibiotic = 'Y'
             OR di.habit_forming = 'Y')
      ORDER BY di.alert_level DESC, di.criticalpriority DESC
    `, [], { timeoutMs: 15000 }).catch(err => {
      logger.warn('[DrugSafety] getTodayPrescriptionsWithAlerts failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get drug interaction incidents (historical log).
   * @param {number} [days=30] - Lookback period
   * @returns {Promise<Array>}
   */
  async getInteractionIncidents(days = 30) {
    return dbQueryHeavy(`interactionIncidents_${days}d`, 15, `
      SELECT dii.vn, dii.drugname1, dii.drugname2,
        dii.doctor, dii.note, dii.department,
        dii.incident_date, dii.incident_time,
        dii.drug_interaction_id, dii.icode
      FROM drug_interaction_incident dii
      WHERE dii.incident_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
         OR dii.incident_date IS NULL
      ORDER BY dii.incident_date DESC, dii.incident_time DESC
      LIMIT 500
    `, [days], { timeoutMs: 15000 }).catch(err => {
      logger.warn('[DrugSafety] getInteractionIncidents failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get ADR reporting trends by month.
   * @param {number} [days=365] - Lookback period
   * @returns {Promise<Array>}
   */
  async getADRTrend(days = 365) {
    return dbQueryHeavy(`adrTrend_${days}d`, 30, `
      SELECT
        DATE_FORMAT(oa.report_date, '%Y-%m') as month,
        COUNT(*) as total_reports,
        SUM(CASE WHEN oa.seriousness_id >= 3 THEN 1 ELSE 0 END) as serious_reports,
        SUM(CASE WHEN oa.preventable = 'Y' THEN 1 ELSE 0 END) as preventable_reports,
        COUNT(DISTINCT oa.hn) as unique_patients
      FROM opd_allergy oa
      WHERE oa.report_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        AND oa.report_date IS NOT NULL
      GROUP BY DATE_FORMAT(oa.report_date, '%Y-%m')
      ORDER BY month DESC
    `, [days], { timeoutMs: 15000 }).catch(err => {
      logger.warn('[DrugSafety] getADRTrend failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get allergy summary statistics.
   * @returns {Promise<Object|null>}
   */
  async getAllergySummary() {
    return dbQueryOne(`
      SELECT
        COUNT(*) as total_records,
        COUNT(DISTINCT hn) as total_patients,
        SUM(CASE WHEN seriousness_id >= 3 THEN 1 ELSE 0 END) as serious_count,
        SUM(CASE WHEN seriousness_id >= 2 THEN 1 ELSE 0 END) as moderate_and_above,
        SUM(CASE WHEN report_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) as recent_30d
      FROM opd_allergy
    `).catch(err => {
      logger.warn('[DrugSafety] getAllergySummary failed', { err: err.message });
      return null;
    });
  }

  /**
   * Get today's drug interaction incident count.
   * @returns {Promise<Object|null>}
   */
  async getTodayInteractionCount() {
    return dbQueryOne(`
      SELECT
        COUNT(*) as total_incidents,
        COUNT(DISTINCT vn) as unique_visits,
        COUNT(DISTINCT icode) as unique_drugs
      FROM drug_interaction_incident
      WHERE incident_date = CURDATE()
    `).catch(err => {
      logger.warn('[DrugSafety] getTodayInteractionCount failed', { err: err.message });
      return null;
    });
  }

  /**
   * Get top allergy-causing agents (most reported).
   * @param {number} [limit=20]
   * @returns {Promise<Array>}
   */
  async getTopAllergyAgents(limit = 20) {
    return dbQueryHeavy('topAllergyAgents_v1', 30, `
      SELECT agent,
        COUNT(*) as report_count,
        COUNT(DISTINCT hn) as patient_count,
        MAX(seriousness_id) as max_seriousness,
        GROUP_CONCAT(DISTINCT symptom SEPARATOR ', ') as symptoms
      FROM opd_allergy
      WHERE agent IS NOT NULL AND agent != ''
      GROUP BY agent
      ORDER BY report_count DESC
      LIMIT ?
    `, [limit], { timeoutMs: 10000 }).catch(err => {
      logger.warn('[DrugSafety] getTopAllergyAgents failed', { err: err.message });
      return [];
    });
  }
}

/** Singleton instance */
export const drugSafetyRepository = new DrugSafetyRepository();
