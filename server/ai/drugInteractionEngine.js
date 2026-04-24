// ============================================================
// BCH 360° Intelligence V.10 — Drug Interaction & Safety Engine
// Checks: Drug-Drug, Drug-Allergy, Duplicate Therapy, High-Alert
// Data: HOSxP XE (drug_interaction, opd_allergy, drugitems)
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import logger from '../logger.js';

/**
 * Severity levels for drug safety alerts.
 * @enum {string}
 */
export const SEVERITY = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MODERATE: 'MODERATE',
  LOW: 'LOW',
};

/**
 * Known high-alert drug categories (ISMP-based).
 * Drugs with alert_level >= 3 or matching these therapeutic groups
 * are flagged for extra pharmacist review.
 */
const HIGH_ALERT_THERAPEUTIC_GROUPS = [
  'anticoagulant', 'insulin', 'opioid', 'chemotherapy',
  'potassium', 'neuromuscular', 'thrombolytic', 'sedative',
  'concentrated electrolyte', 'adrenergic', 'anesthetic',
];

/**
 * Drug Interaction & Safety Engine
 * Provides multi-layer drug safety checks using HOSxP XE data.
 */
export class DrugInteractionEngine {

  /**
   * Get patient's allergy list from opd_allergy.
   * @param {string} hn - Hospital number
   * @returns {Promise<Array<{agent: string, symptom: string, seriousness_id: number, report_date: string, allergy_type: string, icode: string}>>}
   */
  async getPatientAllergies(hn) {
    try {
      const rows = await dbQuery(`
        SELECT
          oa.agent,
          oa.symptom,
          oa.seriousness_id,
          oa.report_date,
          oa.allergy_type,
          oa.icode,
          oa.no_alert,
          COALESCE(als.seiousness_name, '') AS seriousness_name
        FROM opd_allergy oa
        LEFT JOIN allergy_seriousness als ON oa.seriousness_id = als.seriousness_id
        WHERE oa.hn = ?
        ORDER BY oa.seriousness_id DESC, oa.report_date DESC
      `, [hn]);
      return rows || [];
    } catch (err) {
      logger.warn('[DrugSafety] getPatientAllergies failed', { hn, err: err.message });
      return [];
    }
  }

  /**
   * Check drug-drug interactions from the drug_interaction reference table.
   * @param {string[]} drugNames - Array of drug names to check pairwise
   * @returns {Promise<Array<{drugname1: string, drugname2: string, severity: number, note: string, not_allow: string}>>}
   */
  async checkDrugInteractions(drugNames) {
    if (!drugNames || drugNames.length < 2) return [];
    try {
      // Build pairwise check — drug_interaction uses drugname1/drugname2
      const placeholders = drugNames.map(() => '?').join(',');
      const rows = await dbQuery(`
        SELECT
          di.drug_interaction_id,
          di.drugname1,
          di.drugname2,
          di.drug_interaction_type,
          di.severity,
          di.note,
          di.not_allow,
          di.show_doctor,
          di.check_old_prescription
        FROM drug_interaction di
        WHERE di.drugname1 IN (${placeholders})
           OR di.drugname2 IN (${placeholders})
        ORDER BY di.severity DESC
      `, [...drugNames, ...drugNames]);
      return rows || [];
    } catch (err) {
      logger.warn('[DrugSafety] checkDrugInteractions failed', { err: err.message });
      return [];
    }
  }

  /**
   * Check if a new drug conflicts with patient's known allergies.
   * Cross-references opd_allergy agent names with drug name/generic_name.
   * Also checks opd_allergy_cross_chk for cross-allergy groups.
   * @param {string} hn - Hospital number
   * @param {string} drugName - Drug name to check
   * @returns {Promise<Array<{agent: string, symptom: string, severity: string, type: string}>>}
   */
  async checkAllergyConflict(hn, drugName) {
    if (!hn || !drugName) return [];
    try {
      // Direct allergy match: agent name matches drug name
      const directMatch = await dbQuery(`
        SELECT oa.agent, oa.symptom, oa.seriousness_id,
          COALESCE(als.seiousness_name, 'Unknown') AS seriousness_name
        FROM opd_allergy oa
        LEFT JOIN allergy_seriousness als ON oa.seriousness_id = als.seriousness_id
        WHERE oa.hn = ?
          AND (oa.agent LIKE CONCAT('%', ?, '%') OR ? LIKE CONCAT('%', oa.agent, '%'))
          AND (oa.no_alert IS NULL OR oa.no_alert != 'Y')
      `, [hn, drugName, drugName]);

      // Cross-allergy check from opd_allergy_cross_chk
      const crossMatch = await dbQuery(`
        SELECT oac.agent, oac.cross_agent, oac.allow_order
        FROM opd_allergy_cross_chk oac
        WHERE oac.hn = ?
          AND (oac.cross_agent LIKE CONCAT('%', ?, '%') OR ? LIKE CONCAT('%', oac.cross_agent, '%'))
          AND (oac.allow_order IS NULL OR oac.allow_order != 'Y')
      `, [hn, drugName, drugName]);

      const alerts = [];

      for (const row of (directMatch || [])) {
        alerts.push({
          agent: row.agent,
          symptom: row.symptom || 'Unknown reaction',
          severity: row.seriousness_id >= 3 ? SEVERITY.CRITICAL : row.seriousness_id >= 2 ? SEVERITY.HIGH : SEVERITY.MODERATE,
          type: 'DIRECT_ALLERGY',
          seriousness_name: row.seriousness_name,
        });
      }

      for (const row of (crossMatch || [])) {
        alerts.push({
          agent: row.agent,
          symptom: `Cross-allergy with ${row.cross_agent}`,
          severity: SEVERITY.HIGH,
          type: 'CROSS_ALLERGY',
        });
      }

      return alerts;
    } catch (err) {
      logger.warn('[DrugSafety] checkAllergyConflict failed', { hn, err: err.message });
      return [];
    }
  }

  /**
   * Check for duplicate therapy — drugs in the same pharmacology group.
   * @param {string} hn - Hospital number (for current prescriptions)
   * @returns {Promise<Array<{group_name: string, drugs: Array<{icode: string, name: string}>, severity: string}>>}
   */
  async checkDuplicateTherapy(hn) {
    try {
      // Get today's prescriptions for this patient, grouped by pharmacology group
      const rows = await dbQuery(`
        SELECT di.icode, di.name, di.pharmacology_group1 as pg1,
          di.therapeutic, di.therapeuticgroup,
          pg.pharmacology_group_name
        FROM opitemrece oi
        INNER JOIN drugitems di ON oi.icode = di.icode
        LEFT JOIN pharmacology_group pg ON di.pharmacology_group1 = pg.pharmacology_group_id
        WHERE oi.hn = ? AND oi.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
          AND di.pharmacology_group1 IS NOT NULL AND di.pharmacology_group1 > 0
        ORDER BY di.pharmacology_group1, di.name
      `, [hn]);

      if (!rows?.length) return [];

      // Group by pharmacology group
      const groups = {};
      for (const r of rows) {
        const key = r.pg1 || r.therapeuticgroup || 'unknown';
        if (!groups[key]) {
          groups[key] = {
            group_name: r.pharmacology_group_name || r.therapeuticgroup || 'Unknown Group',
            drugs: [],
          };
        }
        // Avoid duplicate entries for same icode
        if (!groups[key].drugs.find(d => d.icode === r.icode)) {
          groups[key].drugs.push({ icode: r.icode, name: r.name });
        }
      }

      // Flag groups with 2+ drugs as duplicates
      const duplicates = [];
      for (const [, group] of Object.entries(groups)) {
        if (group.drugs.length >= 2) {
          duplicates.push({
            group_name: group.group_name,
            drugs: group.drugs,
            severity: group.drugs.length >= 3 ? SEVERITY.HIGH : SEVERITY.MODERATE,
          });
        }
      }

      return duplicates;
    } catch (err) {
      logger.warn('[DrugSafety] checkDuplicateTherapy failed', { hn, err: err.message });
      return [];
    }
  }

  /**
   * Full safety check for a patient's current medications.
   * Runs allergy, interaction, duplicate therapy, and high-alert checks.
   * @param {string} hn - Hospital number
   * @returns {Promise<Object>} Consolidated safety report
   */
  async fullSafetyCheck(hn) {
    try {
      const [allergies, currentMeds, duplicates] = await Promise.all([
        this.getPatientAllergies(hn),
        this._getCurrentMedications(hn),
        this.checkDuplicateTherapy(hn),
      ]);

      // Check interactions among current medications
      const drugNames = currentMeds.map(m => m.name);
      const interactions = await this.checkDrugInteractions(drugNames);

      // Identify high-alert drugs in current medications
      const highAlertDrugs = currentMeds.filter(m =>
        (m.alert_level && m.alert_level >= 3) ||
        (m.criticalpriority && m.criticalpriority >= 3) ||
        HIGH_ALERT_THERAPEUTIC_GROUPS.some(g =>
          (m.therapeutic || '').toLowerCase().includes(g) ||
          (m.therapeuticgroup || '').toLowerCase().includes(g)
        )
      );

      // Compute overall risk
      const criticalCount = interactions.filter(i => i.severity >= 3 || i.not_allow === 'Y').length;
      const hasAllergyConflict = allergies.length > 0;
      const hasDuplicates = duplicates.length > 0;
      const hasHighAlert = highAlertDrugs.length > 0;

      let overallRisk = SEVERITY.LOW;
      if (criticalCount > 0 || allergies.some(a => a.seriousness_id >= 3)) {
        overallRisk = SEVERITY.CRITICAL;
      } else if (hasAllergyConflict || interactions.length > 0) {
        overallRisk = SEVERITY.HIGH;
      } else if (hasDuplicates || hasHighAlert) {
        overallRisk = SEVERITY.MODERATE;
      }

      return {
        hn,
        overall_risk: overallRisk,
        allergies: allergies.map(a => ({
          agent: a.agent,
          symptom: a.symptom,
          seriousness: a.seriousness_name || '',
          report_date: a.report_date,
        })),
        allergy_count: allergies.length,
        interactions: interactions.map(i => ({
          drug1: i.drugname1,
          drug2: i.drugname2,
          severity: i.severity,
          note: i.note,
          not_allow: i.not_allow === 'Y',
        })),
        interaction_count: interactions.length,
        duplicate_therapy: duplicates,
        duplicate_count: duplicates.length,
        high_alert_drugs: highAlertDrugs.map(d => ({
          icode: d.icode,
          name: d.name,
          therapeutic: d.therapeutic,
          alert_level: d.alert_level,
        })),
        high_alert_count: highAlertDrugs.length,
        current_medications: currentMeds.length,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      logger.error('[DrugSafety] fullSafetyCheck failed', { hn, err: err.message });
      return {
        hn,
        overall_risk: SEVERITY.LOW,
        allergies: [], allergy_count: 0,
        interactions: [], interaction_count: 0,
        duplicate_therapy: [], duplicate_count: 0,
        high_alert_drugs: [], high_alert_count: 0,
        current_medications: 0,
        error: err.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Get a patient's current medications (last 7 days).
   * @param {string} hn - Hospital number
   * @returns {Promise<Array>}
   */
  async _getCurrentMedications(hn) {
    try {
      const rows = await dbQuery(`
        SELECT DISTINCT di.icode, di.name, di.generic_name,
          di.therapeutic, di.therapeuticgroup,
          di.alert_level, di.criticalpriority,
          di.dosageform, di.strength, di.antibiotic,
          di.high_cost, di.habit_forming,
          di.pharmacology_group1
        FROM opitemrece oi
        INNER JOIN drugitems di ON oi.icode = di.icode
        WHERE oi.hn = ? AND oi.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        ORDER BY di.name
      `, [hn]);
      return rows || [];
    } catch (err) {
      logger.warn('[DrugSafety] _getCurrentMedications failed', { hn, err: err.message });
      return [];
    }
  }
}

/** Singleton instance */
export const drugInteractionEngine = new DrugInteractionEngine();
