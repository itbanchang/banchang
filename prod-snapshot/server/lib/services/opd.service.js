// ============================================================
// BCH 360° Intelligence V.10 — OPD Service (Business Logic Layer)
// Orchestrates OPDRepository calls and computes derived metrics
// ============================================================
import { opdRepository } from '../repositories/opd.repository.js';
import logger from '../../logger.js';

/**
 * @typedef {Object} SQIComponents
 * @property {{score: number, weight: number, label: string, desc: string}} sla_compliance
 * @property {{score: number, weight: number, label: string, desc: string}} process_completion
 * @property {{score: number, weight: number, label: string, desc: string}} wait_stability
 * @property {{score: number, weight: number, label: string, desc: string}} doctor_yield
 */

/**
 * @typedef {Object} DPIComponents
 * @property {number} sla
 * @property {number} wait
 * @property {number} throughput
 * @property {number} dropout
 */

export class OPDService {

  /**
   * Get comprehensive OPD dashboard data.
   * Orchestrates all parallel repository calls and computes derived metrics.
   * @returns {Promise<Object>} Full OPD dashboard payload
   */
  async getDashboard() {
    const start = Date.now();

    const [
      summary,
      breakdown,
      hourly,
      patients,
      analytics,
      yesterdayHourly,
      avgHourly7d,
      waitListRaw,
      revisitData,
      revenueData,
      level4Data,
      yesterdaySummary,
      activeDoctors,
      activeNurses,
      activeStaff,
    ] = await Promise.allSettled([
      opdRepository.getTodaySummary(),
      opdRepository.getTodayBreakdown(),
      opdRepository.getTodayHourly(),
      opdRepository.getTodayPatients(),
      opdRepository.getAdvancedAnalytics(),
      opdRepository.getYesterdayHourly(),
      opdRepository.getAvgHourly7d(),
      opdRepository.getWaitTimeList(),
      opdRepository.getRevisitData(),
      opdRepository.getRevenuePerVisit(),
      opdRepository.getLevel4Data(),
      opdRepository.getYesterdaySummary(),
      opdRepository.getActiveDoctors(),
      opdRepository.getActiveNurses(),
      opdRepository.getActiveStaff(),
    ]);

    // Extract values (default to null/empty on rejection)
    const val = (r, fallback = null) => r.status === 'fulfilled' ? r.value : fallback;

    const s = val(summary, {}) || {};
    const b = val(breakdown, {}) || {};
    const h = val(hourly, []) || [];
    const ptList = val(patients, []) || [];
    const a = val(analytics, {}) || {};
    const yh = val(yesterdayHourly, []) || [];
    const ah = val(avgHourly7d, []) || [];
    const wl = val(waitListRaw, []) || [];
    const rv = val(revisitData, {}) || {};
    const rd = val(revenueData, {}) || {};
    const l4 = val(level4Data, {}) || {};
    const ys = val(yesterdaySummary, {}) || {};
    const docs = val(activeDoctors, []) || [];
    const nurses = val(activeNurses, []) || [];
    const staff = val(activeStaff, []) || [];

    // Compute P50/P90 wait times
    const waitList = wl.map(x => Number(x.wait_min)).sort((a, b) => a - b);
    const medianWait = waitList.length > 0 ? waitList[Math.floor(waitList.length * 0.5)] : 0;
    const p90Wait = waitList.length > 0 ? waitList[Math.floor(waitList.length * 0.9)] : 0;

    // Throughput calculation
    const currentHour = new Date().getHours();
    const isHoliday = Boolean(s.is_holiday_db || [0, 6].includes(new Date().getDay()));
    const closingHour = isHoliday ? 12 : 20;
    const hoursOpen = Math.min(closingHour, Math.max(7, currentHour)) - 7 + 1;
    const throughput = Math.round(Number(s.completed || 0) / Math.max(1, hoursOpen));

    // SQI (Service Quality Index)
    const sqi = this.calculateSQI(
      Number(b.sla_pct ?? 0),
      Number(a.completion_rate ?? 0),
      Number(a.wait_stddev ?? 30),
      Number(a.doctor_yield_pct ?? 0)
    );

    logger.debug('OPD dashboard built via service', { duration: Date.now() - start });

    return {
      data_source: 'HOSxP XE',
      today_total: s.total || 0,
      completed: s.completed || 0,
      still_here: s.still_here || 0,
      is_holiday: isHoliday,
      throughput,
      hoursOpen,
      // Demographics
      male: Number(b.male || 0),
      female: Number(b.female || 0),
      new_patient: Number(b.new_patient || 0),
      revisit_patient: Number(b.revisit_patient || 0),
      // KPIs
      sla_pct: Number(b.sla_pct || 0),
      max_wait: Number(b.max_wait || 0),
      waiting_doctor: Number(b.waiting_doctor || 0),
      peak_hour: Number(b.peak_hour ?? -1),
      median_wait: Math.round(medianWait || 0),
      p90_wait: Math.round(p90Wait || 0),
      // Analytics
      wait_stddev: Number(a.wait_stddev || 0),
      dropout_count: Number(a.dropout_count || 0),
      doctor_yield_pct: Number(a.doctor_yield_pct || 0),
      completion_rate: Number(a.completion_rate || 0),
      // Revenue
      avg_revenue_per_visit: Number(rd.avg_revenue_per_visit || 0),
      total_opd_revenue: Number(rd.total_opd_revenue || 0),
      // Revisit
      revisit_7d_count: Number(rv.revisit_7d_count || 0),
      revisit_7d_pct: Number(rv.revisit_7d_pct || 0),
      // Level 4
      elderly_count: Number(l4.elderly_count || 0),
      elderly_pct: Number(l4.elderly_pct || 0),
      child_count: Number(l4.child_count || 0),
      child_pct: Number(l4.child_pct || 0),
      avg_age: Number(l4.avg_age || 0),
      active_clinics: Number(l4.active_clinics || 0),
      distinct_doctors: Number(l4.distinct_doctors || 0),
      // Yesterday comparison
      yesterday_total: Number(ys.yesterday_total || 0),
      yesterday_completed: Number(ys.yesterday_completed || 0),
      yesterday_avg_wait: Number(ys.yesterday_avg_wait || 0),
      // SQI
      sqi: sqi.score,
      sqi_components: sqi.components,
      // Staff
      active_doctors_list: docs,
      active_nurses_list: nurses,
      active_staff_list: staff,
      // Hourly
      hourly: h,
      hourly_yesterday: yh,
      hourly_7d_avg: ah,
      // Patients
      patients: ptList,
    };
  }

  /**
   * Calculate Service Quality Index (SQI) — composite score 0–100.
   * Weights: SLA 40%, Completion 30%, Wait Stability 20%, Doctor Yield 10%.
   *
   * @param {number} slaPct - SLA compliance percentage
   * @param {number} completionRate - Process completion rate
   * @param {number} waitStddev - Wait time standard deviation (lower = better)
   * @param {number} doctorYieldPct - Doctor yield percentage
   * @returns {{score: number, components: SQIComponents}}
   */
  calculateSQI(slaPct, completionRate, waitStddev, doctorYieldPct) {
    const sqiSla = Math.round(slaPct);
    const sqiComplete = Math.round(completionRate);
    const sqiStability = Math.round(Math.max(0, 100 - waitStddev));
    const sqiYield = Math.round(Math.min(100, doctorYieldPct));
    const score = Math.round(sqiSla * 0.40 + sqiComplete * 0.30 + sqiStability * 0.20 + sqiYield * 0.10);

    return {
      score,
      components: {
        sla_compliance: { score: sqiSla, weight: 40, label: 'SLA Compliance', desc: '% visit ที่รอไม่เกินมาตรฐาน' },
        process_completion: { score: sqiComplete, weight: 30, label: 'Process Completion', desc: '% ที่ผ่านครบทุกขั้นตอน' },
        wait_stability: { score: sqiStability, weight: 20, label: 'Wait Stability', desc: 'ความสม่ำเสมอ (σ ต่ำ = ดี)' },
        doctor_yield: { score: sqiYield, weight: 10, label: 'Doctor Yield', desc: '% เวลาจริงกับแพทย์' },
      },
    };
  }

  /**
   * Calculate DPI (Department Performance Index) from raw metrics.
   * Weights: SLA 30%, Wait 25%, Throughput 25%, Dropout 20%.
   *
   * @param {number} sla - SLA compliance score (0–100)
   * @param {number} waitScore - Wait time score (0–100)
   * @param {number} throughput - Throughput score (0–100)
   * @param {number} dropout - Dropout percentage (0–100)
   * @returns {number} DPI score (0–100)
   */
  calculateDPI(sla, waitScore, throughput, dropout) {
    return Math.round(sla * 0.3 + waitScore * 0.25 + throughput * 0.25 + (100 - dropout) * 0.2);
  }

  /**
   * Get wait times grouped by clinic.
   * @returns {Promise<Object>}
   */
  async getByClinic() {
    const clinics = await opdRepository.getByClinic();
    return {
      data_source: 'HOSxP XE',
      clinics: (clinics || []).map(c => ({
        ...c,
        avg_total: Math.round(c.avg_total || 0),
        avg_wait: Math.round(c.avg_wait || 0),
      })),
    };
  }

  /**
   * Get 7-day wait time trend.
   * @returns {Promise<Object>}
   */
  async getWaitTrend() {
    const trend = await opdRepository.getWaitTrend();
    return {
      data_source: 'HOSxP XE',
      trend: (trend || []).map(d => ({
        ...d,
        avg_total: Math.round(d.avg_total || 0),
        avg_wait: Math.round(d.avg_wait || 0),
      })),
    };
  }

  /**
   * Get wait drill-down data.
   * @returns {Promise<Object>}
   */
  async getDrilldownWait() {
    return opdRepository.getDrilldownWait();
  }
}

/** Singleton instance */
export const opdService = new OPDService();
