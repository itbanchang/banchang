// ============================================================
// BCH 360° Intelligence V.10 — Pharmacy Service (Business Logic Layer)
// Orchestrates PharmacyRepository calls and computes derived metrics
// ============================================================
import { pharmacyRepository } from '../repositories/pharmacy.repository.js';
import { MONTH_TH } from '../utils/queryBuilder.js';
import logger from '../../logger.js';

/**
 * Known pharmacist logins (HOSxP loginname-based).
 * @type {Set<string>}
 */
const PHARMACIST_LOGINS = new Set(['methira', 'saranya', 'tank', 'pongbodin', 'witchuphol', '18635', 'warunee', 'pariyapat']);

/**
 * Excluded staff logins (not pharmacy staff).
 * @type {Set<string>}
 */
const EXCLUDE_PHARMACY_LOGINS = new Set(['13309', 'patty', 'occ03', '180911', 'ttm004']);

/**
 * @typedef {Object} PPIComponents
 * @property {number} generic - Generic ratio score (0–100)
 * @property {number} cost_efficiency - Cost efficiency score (0–100)
 * @property {number} volume - Volume score (0–100)
 * @property {number} rev_cost - Revenue/cost ratio score (0–100)
 */

export class PharmacyService {

  /**
   * Get comprehensive pharmacy analytics (30-day).
   * Combines volume, cost, generic ratio, OPD/IPD split, trends, top drugs, and staff.
   * @returns {Promise<Object>}
   */
  async getAnalytics() {
    const [
      volumeSummary,
      costSummary,
      genericRatio,
      opdVsIpd,
      monthlyTrend,
      topDrugsResult,
      activeStaff,
    ] = await Promise.allSettled([
      pharmacyRepository.getVolumeSummary(),
      pharmacyRepository.getCostSummary(),
      pharmacyRepository.getGenericRatio(),
      pharmacyRepository.getOPDvsIPDSplit(),
      pharmacyRepository.getMonthlyTrend(),
      pharmacyRepository.getTopDrugs(),
      pharmacyRepository.getStaffOnDuty(),
    ]);

    const val = (r, fallback = null) => r.status === 'fulfilled' ? r.value : fallback;

    const vs = val(volumeSummary, {}) || {};
    const cs = val(costSummary, {}) || {};
    const gr = val(genericRatio, {}) || {};
    const split = val(opdVsIpd, {}) || {};
    const mt = val(monthlyTrend, []) || [];
    const td = val(topDrugsResult, { byValue: [], byVolume: [] }) || { byValue: [], byVolume: [] };
    const staff = val(activeStaff, []) || [];

    // Derived metrics
    const totalRx = Number(vs.total_prescriptions || 0);
    const avgDailyRx = Number(vs.avg_daily_rx || 0);
    const totalDrugRevenue = Number(cs.total_drug_revenue || 0);
    const totalDrugCost = Number(cs.total_drug_cost || 0);
    const drugCostPerRx = Number(cs.drug_cost_per_rx || 0);
    const genericQty = Number(gr.generic_qty || 0);
    const totalQty = Number(gr.total_qty || 1);
    const genericRatioPct = totalQty > 0 ? Math.round((genericQty / totalQty) * 100 * 10) / 10 : 0;
    const revCostRatio = totalDrugCost > 0 ? totalDrugRevenue / totalDrugCost : 1;

    // PPI
    const ppi = this.calculatePPI(genericRatioPct, drugCostPerRx, avgDailyRx, revCostRatio);

    // Monthly trend with Thai labels
    const monthData = mt.map(m => ({
      month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
      prescriptions: Number(m.prescriptions || 0),
      value: Number(m.total_value || 0),
    }));

    // Staff separation
    const allStaff = staff.map(p => ({
      username: p.username,
      staff_name: p.staff_name,
      prescriptions: Number(p.prescriptions_handled || 0),
      items: Number(p.items_dispensed || 0),
      morning_count: Number(p.morning_count || 0),
      afternoon_count: Number(p.afternoon_count || 0),
      night_count: Number(p.night_count || 0),
      total_count: Number(p.items_dispensed || 0),
    }));

    return {
      data_source: 'HOSxP XE',
      ppi: ppi.score,
      ppi_components: ppi.components,
      total_prescriptions: totalRx,
      avg_daily_rx: avgDailyRx,
      total_drug_revenue: totalDrugRevenue,
      total_drug_cost: totalDrugCost,
      drug_cost_per_rx: drugCostPerRx,
      unique_drugs_dispensed: Number(cs.unique_drugs_dispensed || 0),
      generic_ratio: genericRatioPct,
      rev_cost_ratio: Math.round(revCostRatio * 100) / 100,
      opd_rx: Number(split.opd_rx || 0),
      ipd_rx: Number(split.ipd_rx || 0),
      opd_value: Number(split.opd_value || 0),
      ipd_value: Number(split.ipd_value || 0),
      monthly_trend: monthData,
      top_drugs_by_value: (td.byValue || []).map(d => ({
        icode: d.icode, name: d.name, units: d.units, generic_name: d.generic_name || '',
        qty: d.total_qty, value: d.total_value, visits: d.visit_count,
      })),
      top_drugs_by_volume: (td.byVolume || []).map(d => ({
        icode: d.icode, name: d.name, units: d.units, generic_name: d.generic_name || '',
        qty: d.total_qty, value: d.total_value, visits: d.visit_count,
      })),
      on_duty: {
        pharmacists: allStaff.filter(s => PHARMACIST_LOGINS.has(s.username) && !EXCLUDE_PHARMACY_LOGINS.has(s.username)),
        staff: allStaff.filter(s => !PHARMACIST_LOGINS.has(s.username) && !EXCLUDE_PHARMACY_LOGINS.has(s.username)),
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Calculate Pharmacy Performance Index (PPI) — composite score 0–100.
   * Weights: Generic 30%, Cost Efficiency 25%, Volume 20%, Revenue/Cost 25%.
   *
   * @param {number} genericRatioPct - Generic ratio percentage (0–100)
   * @param {number} costPerRx - Drug cost per prescription (Baht)
   * @param {number} avgDailyRx - Average daily prescriptions
   * @param {number} revCostRatio - Revenue / cost ratio
   * @returns {{score: number, components: PPIComponents}}
   */
  calculatePPI(genericRatioPct, costPerRx, avgDailyRx, revCostRatio) {
    const genericScore = Math.min(100, Math.round(genericRatioPct * 1.25));
    const costScore = costPerRx > 0 ? Math.max(0, Math.round(100 - (costPerRx / 500) * 100)) : 50;
    const volumeScore = Math.min(100, Math.round((avgDailyRx / 100) * 100));
    const revCostScore = Math.min(100, Math.round((revCostRatio / 1.5) * 100));

    const score = Math.round(
      genericScore * 0.30 + costScore * 0.25 + volumeScore * 0.20 + revCostScore * 0.25
    );

    return {
      score,
      components: {
        generic: genericScore,
        cost_efficiency: costScore,
        volume: volumeScore,
        rev_cost: revCostScore,
      },
    };
  }

  /**
   * Detect anomalies in drug movement patterns.
   * Compares current period usage with historical baseline to flag
   * drugs with unusual volume changes.
   *
   * @param {number} [thresholdPct=50] - Minimum % change to flag as anomaly
   * @returns {Promise<Array<{icode: string, name: string, currentQty: number, baselineQty: number, changePct: number, type: string}>>}
   */
  async getAnomalyDetection(thresholdPct = 50) {
    try {
      // Current 7-day usage
      const current = await pharmacyRepository.getTopDrugs(7, 100);
      // Baseline: 30-day daily average (approximate from top drugs)
      const baseline = await pharmacyRepository.getTopDrugs(30, 100);

      if (!current?.byVolume?.length || !baseline?.byVolume?.length) return [];

      const baselineMap = {};
      (baseline.byVolume || []).forEach(d => {
        // Normalize to 7-day equivalent (30 days → scale down)
        baselineMap[d.icode] = Math.round(d.total_qty * (7 / 30));
      });

      const anomalies = [];
      for (const drug of current.byVolume) {
        const baselineQty = baselineMap[drug.icode] || 0;
        if (baselineQty === 0 && drug.total_qty > 0) {
          anomalies.push({
            icode: drug.icode,
            name: drug.name,
            currentQty: drug.total_qty,
            baselineQty: 0,
            changePct: 100,
            type: 'new_usage',
          });
        } else if (baselineQty > 0) {
          const changePct = Math.round(((drug.total_qty - baselineQty) / baselineQty) * 100);
          if (Math.abs(changePct) >= thresholdPct) {
            anomalies.push({
              icode: drug.icode,
              name: drug.name,
              currentQty: drug.total_qty,
              baselineQty,
              changePct,
              type: changePct > 0 ? 'spike' : 'drop',
            });
          }
        }
      }

      return anomalies.sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct)).slice(0, 20);
    } catch (err) {
      logger.warn('[Pharmacy] getAnomalyDetection failed', { err: err.message });
      return [];
    }
  }
}

/** Singleton instance */
export const pharmacyService = new PharmacyService();
