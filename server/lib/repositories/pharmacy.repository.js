// ============================================================
// BCH 360° Intelligence V.10 — Pharmacy Repository (Data Access Layer)
// Extracts SQL queries from server/routes/pharmacy.js
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../../db/mysql.js';
import logger from '../../logger.js';

/**
 * @typedef {Object} PharmacyOPDSummary
 * @property {number} total_prescriptions
 * @property {number} total_items
 * @property {number} total_qty
 * @property {number} total_value
 */

/**
 * @typedef {Object} PharmacyIPDSummary
 * @property {number} total_an
 * @property {number} total_items
 * @property {number} total_qty
 * @property {number} total_value
 */

/**
 * @typedef {Object} TopDrugEntry
 * @property {string} icode
 * @property {string} name
 * @property {string} units
 * @property {number} total_qty
 * @property {number} total_value
 * @property {number} visit_count
 */

export class PharmacyRepository {

  /**
   * Get today's OPD dispensing summary.
   * @returns {Promise<PharmacyOPDSummary|null>}
   */
  async getTodayOPDDispensing() {
    return dbQueryOne(`
      SELECT
        COUNT(DISTINCT oi.vn) as total_prescriptions,
        COUNT(*) as total_items,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.sum_price, oi.qty * oi.unitprice, 0)), 0) as total_value
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE() AND (oi.an IS NULL OR oi.an = '' OR oi.an = '0')
    `).catch(() => null);
  }

  /**
   * Get today's IPD dispensing summary.
   * @returns {Promise<PharmacyIPDSummary|null>}
   */
  async getTodayIPDDispensing() {
    return dbQueryOne(`
      SELECT
        COUNT(DISTINCT oi.an) as total_an,
        COUNT(*) as total_items,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.sum_price, oi.qty * oi.unitprice, 0)), 0) as total_value
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE() AND oi.an IS NOT NULL AND oi.an != '' AND oi.an != '0'
    `).catch(() => null);
  }

  /**
   * Get today's top dispensed drugs by value.
   * @param {number} [limit=10] - Max drugs to return
   * @returns {Promise<TopDrugEntry[]>}
   */
  async getTopDrugsToday(limit = 10) {
    return dbQuery(`
      SELECT di.icode, di.name, di.units,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.sum_price, oi.qty * oi.unitprice, 0)), 0) as total_value,
        COUNT(DISTINCT oi.vn) as visit_count
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE()
      GROUP BY di.icode, di.name, di.units
      ORDER BY total_value DESC
      LIMIT ${Number(limit)}
    `).catch(() => []);
  }

  /**
   * Get on-duty pharmacy staff today (pharmacists and support).
   * Returns combined list; caller separates by role.
   * @returns {Promise<Array>}
   */
  async getStaffOnDuty() {
    return dbQuery(`
      SELECT oi.staff as username, u.name as staff_name,
        COUNT(DISTINCT oi.vn) as prescriptions_handled,
        COUNT(*) as items_dispensed,
        SUM(CASE WHEN HOUR(oi.rxtime) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(oi.rxtime) >= 12 AND HOUR(oi.rxtime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(oi.rxtime) >= 17 THEN 1 ELSE 0 END) as night_count
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      INNER JOIN opduser u ON oi.staff = u.loginname
      WHERE oi.vstdate = CURDATE()
        AND oi.staff IS NOT NULL AND oi.staff != ''
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'ทพญ.%'
        AND u.loginname != 'kiosk'
      GROUP BY oi.staff, u.name
      ORDER BY items_dispensed DESC
      LIMIT 20
    `).catch(err => { logger.warn('[Pharmacy] getStaffOnDuty failed', { err: err.message }); return []; });
  }

  /**
   * Get generic vs brand ratio (today, from 7-day sample window).
   * @returns {Promise<Object|null>}
   */
  async getGenericRatio() {
    return dbQueryOneHeavy('pharmGenericRatio7d_v1', 30, `
      SELECT
        SUM(CASE WHEN di.generic_name IS NOT NULL AND di.generic_name != '' THEN 1 ELSE 0 END) as generic_qty,
        COUNT(*) as total_qty,
        COUNT(DISTINCT CASE WHEN di.generic_name IS NOT NULL AND di.generic_name != '' THEN oi.icode END) as generic_items,
        COUNT(DISTINCT oi.icode) as total_items
      FROM opitemrece oi
      LEFT JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE()
    `, [], { timeoutMs: 15000 }).catch(err => {
      logger.warn('[Pharmacy] getGenericRatio FAILED', { err: err.message });
      return null;
    });
  }

  /**
   * Get volume summary (30-day) from vn_stat.
   * @returns {Promise<Object|null>}
   */
  async getVolumeSummary() {
    return dbQueryOne(`
      SELECT
        COUNT(*) as total_prescriptions,
        COUNT(DISTINCT vs.vstdate) as active_days,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT vs.vstdate), 0), 1) as avg_daily_rx,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as total_qty
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND vs.inc_drug > 0
    `).catch(err => { logger.warn('[Pharmacy] getVolumeSummary failed', { err: err.message }); return null; });
  }

  /**
   * Get cost and revenue summary (30-day) from vn_stat.
   * @returns {Promise<Object|null>}
   */
  async getCostSummary() {
    return dbQueryOne(`
      SELECT
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as total_drug_revenue,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)) * 0.75, 0) as total_drug_cost,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)) / NULLIF(COUNT(*), 0), 0) as drug_cost_per_rx,
        COUNT(DISTINCT vs.vn) as unique_drugs_dispensed
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND vs.inc_drug > 0
    `).catch(err => { logger.warn('[Pharmacy] getCostSummary failed', { err: err.message }); return null; });
  }

  /**
   * Get OPD vs IPD revenue split (30-day).
   * @returns {Promise<{opd_rx: number, opd_value: number, ipd_rx: number, ipd_value: number}|null>}
   */
  async getOPDvsIPDSplit() {
    try {
      const opd = await dbQueryOne(`
        SELECT COUNT(DISTINCT vn) as rx, ROUND(SUM(COALESCE(vs.inc_drug, 0))) as value
        FROM vn_stat vs WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND vs.inc_drug > 0
      `);
      const ipd = await dbQueryOne(`
        SELECT COUNT(DISTINCT an) as rx, ROUND(SUM(inc12)) as value
        FROM an_stat WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND inc12 > 0
      `);
      return {
        opd_rx: Number(opd?.rx || 0),
        opd_value: Number(opd?.value || 0),
        ipd_rx: Number(ipd?.rx || 0),
        ipd_value: Number(ipd?.value || 0),
      };
    } catch (err) {
      logger.warn('[Pharmacy] getOPDvsIPDSplit failed', { err: err.message });
      return null;
    }
  }

  /**
   * Get monthly dispensing trend (6-month) from vn_stat.
   * @returns {Promise<Array>}
   */
  async getMonthlyTrend() {
    return dbQuery(`
      SELECT DATE_FORMAT(vs.vstdate, '%Y-%m') as month,
        COUNT(*) as prescriptions,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as total_value
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND vs.inc_drug > 0
      GROUP BY DATE_FORMAT(vs.vstdate, '%Y-%m')
      ORDER BY month
    `).catch(err => { logger.warn('[Pharmacy] getMonthlyTrend failed', { err: err.message }); return []; });
  }

  /**
   * Get top drugs (2-step: aggregate opitemrece then lookup drugitems).
   * @param {number} [days=3] - Sample window in days
   * @param {number} [limit=50] - Max items in aggregate step
   * @returns {Promise<{byValue: Array, byVolume: Array}>}
   */
  async getTopDrugs(days = 3, limit = 50) {
    try {
      const agg = await dbQueryHeavy('pharmTopAgg7d', 30, `
        SELECT icode, SUM(qty) as total_qty, COUNT(DISTINCT vn) as visit_count, COUNT(DISTINCT hn) as patient_count
        FROM opitemrece
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND qty > 0
        GROUP BY icode
        ORDER BY SUM(qty) DESC
        LIMIT ?
      `, [days, limit], { timeoutMs: 30000 });
      if (!agg?.length) return { byValue: [], byVolume: [] };

      const icodes = agg.map(r => r.icode);
      const drugs = await dbQuery(
        `SELECT icode, name, generic_name, unitprice, units FROM drugitems WHERE icode IN (${icodes.map(() => '?').join(',')})`,
        icodes
      );
      const dm = {};
      (drugs || []).forEach(d => { dm[d.icode] = d; });

      const enriched = agg.map(r => {
        const d = dm[r.icode] || {};
        return {
          icode: r.icode,
          name: d.name || r.icode,
          generic_name: d.generic_name || '',
          units: d.units || '',
          total_qty: Number(r.total_qty),
          total_value: Math.round(Number(r.total_qty) * Number(d.unitprice || 0)),
          visit_count: Number(r.visit_count),
          patient_count: Number(r.patient_count || 0),
        };
      });

      const byValue = [...enriched].sort((a, b) => b.total_value - a.total_value).slice(0, 20);
      const byVolume = enriched.slice(0, 20);
      return { byValue, byVolume };
    } catch (err) {
      logger.warn('[Pharmacy] getTopDrugs failed', { err: err.message });
      return { byValue: [], byVolume: [] };
    }
  }

  /**
   * Get fiscal year drug revenue data.
   * @param {string} fyStart - Fiscal year start date
   * @param {string} fyEnd - Fiscal year end date
   * @returns {Promise<Array>}
   */
  async getRevenueFiscalData(fyStart, fyEnd) {
    return dbQuery(`
      SELECT DATE_FORMAT(vs.vstdate, '%Y-%m') as ym,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as drug_revenue,
        ROUND(SUM(COALESCE(vs.income, 0)), 0) as total_revenue,
        COUNT(DISTINCT vs.vn) as visits,
        COUNT(DISTINCT vs.hn) as patients
      FROM vn_stat vs
      WHERE vs.vstdate BETWEEN ? AND ?
        AND vs.income > 0
      GROUP BY DATE_FORMAT(vs.vstdate, '%Y-%m')
      ORDER BY ym
    `, [fyStart, fyEnd]).catch(err => {
      logger.warn('[Pharmacy] getRevenueFiscalData failed', { err: err.message });
      return [];
    });
  }

  /**
   * Get unique patient count for a date range.
   * @param {string} start - Start date
   * @param {string} end - End date
   * @returns {Promise<number>}
   */
  async getUniquePatients(start, end) {
    const row = await dbQueryOne(`
      SELECT COUNT(DISTINCT hn) as patients FROM vn_stat
      WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND income > 0
    `, [start, end]).catch(() => null);
    return Number(row?.patients || 0);
  }

  /**
   * Get all drug items (cached 2 hours).
   * @returns {Promise<Array>}
   */
  async getAllDrugItems() {
    return dbQueryHeavy('pharmAllDrugs', 120,
      'SELECT icode, name, generic_name, unitprice, units FROM drugitems',
      [], { timeoutMs: 5000 }
    ).catch(() => []);
  }

  /**
   * Get top drug aggregation for a date range.
   * @param {string} cacheKey - Cache key
   * @param {string} start - Start date
   * @param {string} end - End date
   * @returns {Promise<Array>}
   */
  async getTopDrugAggregation(cacheKey, start, end) {
    return dbQueryHeavy(cacheKey, 30, `
      SELECT icode, SUM(qty) as total_qty, COUNT(DISTINCT vn) as visit_count, COUNT(DISTINCT hn) as patient_count
      FROM opitemrece
      WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND qty > 0
      GROUP BY icode
    `, [start, end], { timeoutMs: 30000 }).catch(() => []);
  }
}

/** Singleton instance */
export const pharmacyRepository = new PharmacyRepository();
