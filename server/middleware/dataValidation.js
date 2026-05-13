// ============================================================
// BCH 360° Intelligence V.10 — Data Validation Layer
// Detect anomalous data before showing to dashboard users
// Adds _warnings[] to response JSON when issues detected
// ============================================================
import logger from '../logger.js';

/**
 * Rules: each returns { ok, warning } for a given response body.
 * Rules are matched by route prefix.
 */
const RULES = {
  '/api/finance/monthly-summary': [
    (d) => {
      if (d.summary?.total_revenue === 0 && d.year === new Date().getFullYear()) {
        return { ok: false, warning: 'Revenue = 0 ทั้งปี — อาจยังไม่มีข้อมูลปีนี้ หรือ query ผิด' };
      }
    },
    (d) => {
      const m = d.summary?.profit_margin;
      if (m !== undefined && (m > 40 || m < -10)) {
        return { ok: false, warning: `Profit margin ${m}% ผิดปกติ (ปกติ 5-25%) — ตรวจสอบ expense ratio` };
      }
    },
  ],
  '/api/dashboard/summary': [
    (d) => {
      if (d.beds?.occupancy_rate > 100) {
        return { ok: false, warning: `Bed occupancy ${d.beds.occupancy_rate}% > 100% — ข้อมูลเตียงอาจไม่ตรง` };
      }
    },
    (d) => {
      if (d.staff?.on_duty === 0 && d.opd?.today_visits > 0) {
        return { ok: false, warning: 'แพทย์ on duty = 0 แต่มีผู้ป่วย OPD — staffing query อาจมีปัญหา' };
      }
    },
  ],
  '/api/staffing/today': [
    (d) => {
      const r = d.summary?.nurse_to_patient_ratio;
      if (r && r !== 'N/A') {
        const num = parseInt(r.split(':')[1]);
        if (num > 20) {
          return { ok: false, warning: `Nurse ratio ${r} สูงเกินจริง — ตรวจสอบ nurse query` };
        }
      }
    },
  ],
  '/api/opd/today': [
    (d) => {
      if (d.today_total > 0 && d.median_wait > 300) {
        return { ok: false, warning: `Median wait ${d.median_wait} นาที สูงผิดปกติ (> 5 ชม.)` };
      }
    },
  ],
  '/api/er/today': [
    (d) => {
      if (d.total > 0 && d.avg_ttd_min > 120) {
        return { ok: false, warning: `ER TTD ${d.avg_ttd_min} นาที สูงเกินปกติ (> 2 ชม.)` };
      }
    },
  ],
  '/api/ipd/bed-occupancy': [
    (d) => {
      const crit = (d.wards || []).filter(w => w.occupancy_rate > 100);
      if (crit.length) {
        return { ok: false, warning: `${crit.length} ward(s) occupancy > 100%: ${crit.map(w => w.shortname || w.name).join(', ')}` };
      }
    },
  ],
};

/**
 * Express middleware: intercepts JSON response and appends _warnings if issues detected.
 * Attach to routes after auth but before handlers.
 */
export function dataValidationMiddleware() {
  return (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (body && typeof body === 'object' && !body.error) {
        const warnings = [];
        // Match rules by route prefix
        for (const [prefix, rules] of Object.entries(RULES)) {
          if (req.originalUrl.startsWith(prefix)) {
            for (const rule of rules) {
              try {
                const result = rule(body);
                if (result && !result.ok) {
                  warnings.push(result.warning);
                }
              } catch { /* rule error — skip */ }
            }
          }
        }
        if (warnings.length > 0) {
          body._warnings = warnings;
          logger.warn('[DataValidation] Anomaly detected', { path: req.originalUrl, warnings });
        }
      }
      return originalJson(body);
    };
    next();
  };
}

export default dataValidationMiddleware;
