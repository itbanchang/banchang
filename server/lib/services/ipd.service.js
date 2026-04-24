// ============================================================
// BCH 360° Intelligence V.10 — IPD Service (Business Logic Layer)
// Orchestrates IPDRepository calls and computes derived metrics
// ============================================================
import { ipdRepository } from '../repositories/ipd.repository.js';
import logger from '../../logger.js';

/**
 * @typedef {Object} WEIComponents
 * @property {number} turnover
 * @property {number} alos
 * @property {number} overstay
 * @property {number} cmi
 * @property {number} disch_plan
 * @property {number} readmit
 */

export class IPDService {

  /**
   * Get comprehensive IPD dashboard data.
   * Combines census, analytics, quality metrics, and staff activity.
   * @returns {Promise<Object>}
   */
  async getDashboard() {
    const [
      census,
      summaryStats,
      admTrend,
      overstay,
      qualityMetrics,
      acuityRevenue,
      doctors,
      nurses,
      staff,
    ] = await Promise.allSettled([
      ipdRepository.getCurrentCensus(),
      ipdRepository.getSummaryStats(),
      ipdRepository.getAdmissionTrend(),
      ipdRepository.getOverstayAnalysis(),
      ipdRepository.getQualityMetrics(),
      ipdRepository.getAcuityRevenue(),
      ipdRepository.getActiveDoctors(),
      ipdRepository.getActiveNurses(),
      ipdRepository.getActiveStaff(),
    ]);

    const val = (r, fallback = null) => r.status === 'fulfilled' ? r.value : fallback;
    const ss = val(summaryStats, {}) || {};
    const qm = val(qualityMetrics, {}) || {};
    const ar = val(acuityRevenue, {}) || {};
    const os = val(overstay, {}) || {};
    const cen = val(census, {}) || {};

    // Derived metrics
    const totalBeds = 120; // Fallback — should come from ward table
    const discharged = Number(ss.discharged_30d || 0);
    const turnoverRate = Math.round((discharged / totalBeds) * 10) / 10;
    const actualALOS = Number(ss.actual_alos || 0);
    const benchmarkALOS = Number(ss.benchmark_alos || 0);
    const alosVariancePct = benchmarkALOS > 0
      ? Math.round(((actualALOS - benchmarkALOS) / benchmarkALOS) * 100 * 10) / 10
      : 0;
    const totalRevenue = Number(ss.total_revenue || 0);
    const totalBedDays = Number(ss.total_bed_days || 0);
    const revPerBedDay = totalBedDays > 0 ? Math.round(totalRevenue / totalBedDays) : 0;

    // Quality
    const readmitCount = Number(qm.readmit_count || 0);
    const totalDischarges = Number(qm.total_discharges || 0);
    const readmitRate = totalDischarges > 0 ? Math.round((readmitCount / totalDischarges) * 100 * 10) / 10 : 0;
    const cmi = Number(qm.cmi || 0);
    const totalDch = Number(qm.total_dch || 0);
    const beforeNoon = Number(qm.before_noon || 0);
    const beforeNoonPct = totalDch > 0 ? Math.round((beforeNoon / totalDch) * 100 * 10) / 10 : 0;
    const deaths = Number(qm.deaths || 0);
    const mortalityRate = totalDch > 0 ? Math.round((deaths / totalDch) * 100 * 10) / 10 : 0;

    // WEI
    const wei = this.calculateWEI({
      turnoverRate,
      alosVariancePct,
      overstayCount: Number(os.overstay_count || 0),
      totalCurrent: Number(os.total_current || 0),
      cmi,
      beforeNoonPct,
      readmitRate,
    });

    // Acuity
    const currentAcuity = Number(ar.current_acuity || 0);
    const highAcuity = Number(ar.high_acuity || 0);
    const totalDchRev = Number(ar.total_dch_rev || 0);
    const totalRevenueRev = Number(ar.total_revenue_rev || 0);
    const revPerDisch = totalDchRev > 0 ? Math.round(totalRevenueRev / totalDchRev) : 0;

    return {
      data_source: 'HOSxP XE',
      // Census
      total_current: Number(cen.total_current || 0),
      male: Number(cen.male || 0),
      female: Number(cen.female || 0),
      avg_age: Number(cen.avg_age || 0),
      elderly: Number(cen.elderly || 0),
      pediatric: Number(cen.pediatric || 0),
      // Performance
      bed_turnover_rate: turnoverRate,
      discharged_30d: discharged,
      actual_alos: actualALOS,
      benchmark_alos: benchmarkALOS,
      alos_variance_pct: alosVariancePct,
      rev_per_bed_day: revPerBedDay,
      // Overstay
      overstay_count: Number(os.overstay_count || 0),
      avg_excess_days: Number(os.avg_excess_days || 0),
      // Quality
      readmit_count: readmitCount,
      readmit_rate: readmitRate,
      cmi,
      cmi_stddev: Number(qm.cmi_stddev || 0),
      cmi_cases: Number(qm.cmi_cases || 0),
      disch_before_noon_pct: beforeNoonPct,
      mortality_rate: mortalityRate,
      deaths_30d: deaths,
      // Acuity
      current_acuity: currentAcuity,
      high_acuity_count: highAcuity,
      rev_per_discharge: revPerDisch,
      // WEI
      wei: wei.score,
      wei_components: wei.components,
      // Trends
      admission_trend: val(admTrend, []) || [],
      // Staff
      staff_activity: {
        doctors: val(doctors, []) || [],
        nurses: val(nurses, []) || [],
        support_staff: val(staff, []) || [],
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Calculate Ward Efficiency Index (WEI) — composite score 0–100.
   * Weights: Turnover 25%, ALOS 20%, Overstay 15%, CMI 20%, Disch Plan 10%, Readmit 10%.
   *
   * @param {Object} components
   * @param {number} components.turnoverRate - Bed turnover rate (target 4.0)
   * @param {number} components.alosVariancePct - ALOS variance % from benchmark
   * @param {number} components.overstayCount - Number of overstay patients
   * @param {number} components.totalCurrent - Total current patients
   * @param {number} components.cmi - Case Mix Index
   * @param {number} components.beforeNoonPct - Discharge before noon %
   * @param {number} components.readmitRate - Readmission rate %
   * @returns {{score: number, components: WEIComponents}}
   */
  calculateWEI({ turnoverRate, alosVariancePct, overstayCount, totalCurrent, cmi, beforeNoonPct, readmitRate }) {
    const turnoverScore = Math.min(100, Math.round((turnoverRate / 4) * 100));
    const alosScore = Math.max(0, Math.round(100 - Math.abs(alosVariancePct)));
    const overstayPct = totalCurrent > 0 ? Math.round((overstayCount / totalCurrent) * 100 * 10) / 10 : 0;
    const overstayScore = Math.max(0, Math.round(100 - overstayPct * 3));
    const cmiScore = Math.min(100, Math.round(cmi * 80));
    const dischPlanScore = Math.min(100, Math.round(beforeNoonPct));
    const readmitScore = Math.max(0, Math.round(100 - readmitRate * 5));

    const score = Math.round(
      (turnoverScore * 0.25) + (alosScore * 0.20) + (overstayScore * 0.15) +
      (cmiScore * 0.20) + (dischPlanScore * 0.10) + (readmitScore * 0.10)
    );

    return {
      score,
      components: {
        turnover: turnoverScore,
        alos: alosScore,
        overstay: overstayScore,
        cmi: cmiScore,
        disch_plan: dischPlanScore,
        readmit: readmitScore,
      },
    };
  }

  /**
   * Calculate LACE readmission risk score.
   *
   * L = Length of stay (days)
   * A = Acuity of admission (emergency vs elective)
   * C = Comorbidities (Charlson index)
   * E = Emergency department visits in prior 6 months
   *
   * @param {Object} params
   * @param {number} params.lengthOfStay - Length of stay in days
   * @param {boolean} params.isEmergency - Whether emergency admission
   * @param {number} params.charlsonIndex - Charlson Comorbidity Index (0–6+)
   * @param {number} params.edVisits6m - ER visits in prior 6 months
   * @returns {{total: number, risk: string, components: Object}}
   */
  calculateReadmissionRisk({ lengthOfStay, isEmergency, charlsonIndex, edVisits6m }) {
    // L score
    let L;
    if (lengthOfStay < 1) L = 0;
    else if (lengthOfStay === 1) L = 1;
    else if (lengthOfStay === 2) L = 2;
    else if (lengthOfStay === 3) L = 3;
    else if (lengthOfStay <= 6) L = 4;
    else if (lengthOfStay <= 13) L = 5;
    else L = 7;

    // A score
    const A = isEmergency ? 3 : 0;

    // C score
    const C = Math.min(5, charlsonIndex);

    // E score
    let E;
    if (edVisits6m === 0) E = 0;
    else if (edVisits6m === 1) E = 1;
    else if (edVisits6m === 2) E = 2;
    else if (edVisits6m === 3) E = 3;
    else E = 4;

    const total = L + A + C + E;
    let risk;
    if (total <= 4) risk = 'low';
    else if (total <= 9) risk = 'moderate';
    else risk = 'high';

    return {
      total,
      risk,
      components: { L, A, C, E },
    };
  }
}

/** Singleton instance */
export const ipdService = new IPDService();
