// ============================================================
// BCH 360° Intelligence V.10 — Patient Safety KPIs
// 15 KPIs: HAI, ADR, Falls, Pressure Injury, Sentinel Events
// Data: iptdiag ICD-10 T-codes + an_stat + ipt
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';

const router = Router();

// ICD-10 code groups for patient safety events
const SAFETY_ICD = {
  hai_pneumonia: "id.icd10 BETWEEN 'J150' AND 'J189'",
  hai_uti:       "id.icd10 = 'N390'",
  hai_sepsis:    "id.icd10 BETWEEN 'A40' AND 'A419'",
  hai_ssi:       "id.icd10 BETWEEN 'T810' AND 'T819'",
  pressure_ulcer: "id.icd10 LIKE 'L89%'",
  adr:           "id.icd10 BETWEEN 'T36' AND 'T509'",
  fall_injury:   "id.icd10 BETWEEN 'W00' AND 'W199'",
  proc_complication: "id.icd10 BETWEEN 'T80' AND 'T889'",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /today — Daily Safety Events
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/today', cached('safety_today_v1', 300000, async () => {
  const [safetyEvents, criticalLabs, todayMortality, todayReadmit] = await Promise.all([
    // 1. Safety events from secondary diagnosis codes (today discharges + current inpatients)
    dbQuery(`
      SELECT
        CASE
          WHEN ${SAFETY_ICD.hai_pneumonia} THEN 'HAI-Pneumonia'
          WHEN ${SAFETY_ICD.hai_uti} THEN 'HAI-UTI'
          WHEN ${SAFETY_ICD.hai_sepsis} THEN 'HAI-Sepsis'
          WHEN ${SAFETY_ICD.hai_ssi} THEN 'HAI-SSI'
          WHEN ${SAFETY_ICD.pressure_ulcer} THEN 'Pressure Ulcer'
          WHEN ${SAFETY_ICD.adr} THEN 'ADR'
          WHEN ${SAFETY_ICD.fall_injury} THEN 'Fall Injury'
          WHEN ${SAFETY_ICD.proc_complication} THEN 'Procedure Complication'
          ELSE 'Other'
        END AS event_type,
        id.icd10,
        i.an, i.hn, w.name AS ward,
        i.regdate, i.dchdate
      FROM iptdiag id
      JOIN ipt i ON id.an = i.an
      LEFT JOIN ward w ON i.ward = w.ward
      WHERE id.diagtype != 1
        AND (i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) OR i.dchdate IS NULL)
        AND (${Object.values(SAFETY_ICD).join(' OR ')})
      ORDER BY i.dchdate DESC, event_type
      LIMIT 100
    `, [], { timeoutMs: 10000 }),

    // 2. Critical lab values today
    dbQuery(`
      SELECT lo.lab_items_name_ref AS test_name,
        lo.lab_order_result AS result,
        lo.lab_items_normal_value_ref AS normal_range,
        lh.hn, lh.order_date, lh.order_time
      FROM lab_order lo
      JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
      WHERE lh.order_date = CURDATE() AND lo.abnormal_result = 'Y'
        AND (
          lo.lab_items_name_ref LIKE '%Potassium%'
          OR lo.lab_items_name_ref LIKE '%Troponin%'
          OR lo.lab_items_name_ref LIKE '%Lactate%'
          OR lo.lab_items_name_ref LIKE '%Glucose%'
          OR lo.lab_items_name_ref LIKE '%Creatinine%'
        )
      ORDER BY lh.order_time DESC
      LIMIT 50
    `, [], { timeoutMs: 10000 }),

    // 3. Today mortality
    dbQueryOne(`
      SELECT COUNT(*) AS deaths
      FROM ipt WHERE dchdate = CURDATE() AND dchtype IN ('09', '9')
    `, [], { timeoutMs: 5000 }),

    // 4. Today unplanned readmissions (within 30 days)
    dbQueryOne(`
      SELECT COUNT(*) AS readmits
      FROM ipt i
      WHERE i.regdate = CURDATE()
        AND EXISTS (
          SELECT 1 FROM ipt prev
          WHERE prev.hn = i.hn AND prev.an != i.an
            AND prev.dchdate BETWEEN DATE_SUB(i.regdate, INTERVAL 30 DAY) AND i.regdate
        )
    `, [], { timeoutMs: 10000 }),
  ]);

  // Aggregate safety events by type
  const eventCounts = {};
  for (const ev of (safetyEvents || [])) {
    eventCounts[ev.event_type] = (eventCounts[ev.event_type] || 0) + 1;
  }

  const totalEvents = (safetyEvents || []).length;

  return {
    data_source: 'HOSxP XE · ICD-10 Safety Codes',
    timestamp: new Date().toISOString(),

    summary: {
      total_safety_events_7d: totalEvents,
      today_deaths: Number(todayMortality?.deaths || 0),
      today_readmissions: Number(todayReadmit?.readmits || 0),
      critical_labs_today: (criticalLabs || []).length,
      event_breakdown: eventCounts,
    },

    safety_events: (safetyEvents || []).slice(0, 50),
    critical_labs: (criticalLabs || []).slice(0, 20),
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /analytics — 6-Month Safety Trends
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cached('safety_analytics_v1', 7200000, async () => {
  const [monthlyTrend, haiByWard, mortalityByWard, readmitTrend, adrTrend] = await Promise.all([
    // 1. Monthly safety event trend (6 months)
    dbQueryHeavy('safety_monthly_6m', 360, `
      SELECT
        DATE_FORMAT(i.dchdate, '%Y-%m') AS month,
        COUNT(DISTINCT i.an) AS total_discharges,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) AS deaths,
        SUM(CASE WHEN i.dchtype IN ('04','4','06','6') THEN 1 ELSE 0 END) AS ama,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1
            AND (${SAFETY_ICD.hai_pneumonia} OR ${SAFETY_ICD.hai_uti} OR ${SAFETY_ICD.hai_sepsis} OR ${SAFETY_ICD.hai_ssi})
        ) THEN 1 ELSE 0 END) AS hai_cases,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1 AND ${SAFETY_ICD.adr}
        ) THEN 1 ELSE 0 END) AS adr_cases,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1 AND ${SAFETY_ICD.pressure_ulcer}
        ) THEN 1 ELSE 0 END) AS pressure_ulcer_cases,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1 AND ${SAFETY_ICD.fall_injury}
        ) THEN 1 ELSE 0 END) AS fall_cases
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND i.dchdate IS NOT NULL
      GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
      ORDER BY month
    `, [], { timeoutMs: 25000 }),

    // 2. HAI by ward (6 months)
    dbQueryHeavy('safety_hai_ward_6m', 360, `
      SELECT w.name AS ward_name,
        COUNT(DISTINCT i.an) AS total_admissions,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1
            AND (${SAFETY_ICD.hai_pneumonia} OR ${SAFETY_ICD.hai_uti} OR ${SAFETY_ICD.hai_sepsis} OR ${SAFETY_ICD.hai_ssi})
        ) THEN 1 ELSE 0 END) AS hai_cases,
        ROUND(SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1
            AND (${SAFETY_ICD.hai_pneumonia} OR ${SAFETY_ICD.hai_uti} OR ${SAFETY_ICD.hai_sepsis} OR ${SAFETY_ICD.hai_ssi})
        ) THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT i.an), 0) * 100, 2) AS hai_rate_pct
      FROM ipt i
      JOIN ward w ON i.ward = w.ward
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND i.dchdate IS NOT NULL AND i.ward != '06'
      GROUP BY w.name
      HAVING total_admissions >= 10
      ORDER BY hai_rate_pct DESC
    `, [], { timeoutMs: 20000 }),

    // 3. Mortality by ward
    dbQueryHeavy('safety_mortality_ward', 360, `
      SELECT w.name AS ward_name,
        COUNT(*) AS discharges,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) AS deaths,
        ROUND(SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS mortality_pct,
        SUM(CASE WHEN i.dchtype IN ('09','9') AND DATEDIFF(i.dchdate, i.regdate) <= 2 THEN 1 ELSE 0 END) AS early_deaths
      FROM ipt i
      JOIN ward w ON i.ward = w.ward
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND i.dchdate IS NOT NULL AND i.ward != '06'
      GROUP BY w.name
      HAVING discharges >= 10
      ORDER BY mortality_pct DESC
    `, [], { timeoutMs: 15000 }),

    // 4. 30-day readmission trend
    dbQueryHeavy('safety_readmit_trend', 360, `
      SELECT DATE_FORMAT(i.regdate, '%Y-%m') AS month,
        COUNT(*) AS admissions,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM ipt prev WHERE prev.hn = i.hn AND prev.an != i.an
            AND prev.dchdate BETWEEN DATE_SUB(i.regdate, INTERVAL 30 DAY) AND i.regdate
        ) THEN 1 ELSE 0 END) AS readmissions,
        ROUND(SUM(CASE WHEN EXISTS (
          SELECT 1 FROM ipt prev WHERE prev.hn = i.hn AND prev.an != i.an
            AND prev.dchdate BETWEEN DATE_SUB(i.regdate, INTERVAL 30 DAY) AND i.regdate
        ) THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS readmit_rate_pct
      FROM ipt i
      WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND i.dchdate IS NOT NULL
      GROUP BY DATE_FORMAT(i.regdate, '%Y-%m')
      ORDER BY month
    `, [], { timeoutMs: 25000 }),

    // 5. ADR trend (monthly)
    dbQueryHeavy('safety_adr_trend', 360, `
      SELECT DATE_FORMAT(i.dchdate, '%Y-%m') AS month,
        COUNT(DISTINCT i.an) AS total_admissions,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1 AND ${SAFETY_ICD.adr}
        ) THEN 1 ELSE 0 END) AS adr_cases,
        ROUND(SUM(CASE WHEN EXISTS (
          SELECT 1 FROM iptdiag id WHERE id.an = i.an AND id.diagtype != 1 AND ${SAFETY_ICD.adr}
        ) THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT i.an), 0) * 1000, 2) AS adr_per_1000
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND i.dchdate IS NOT NULL
      GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
      ORDER BY month
    `, [], { timeoutMs: 20000 }),
  ]);

  // Compute 6-month KPIs
  const totals = (monthlyTrend || []).reduce((acc, m) => ({
    discharges: acc.discharges + Number(m.total_discharges),
    deaths: acc.deaths + Number(m.deaths),
    ama: acc.ama + Number(m.ama),
    hai: acc.hai + Number(m.hai_cases),
    adr: acc.adr + Number(m.adr_cases),
    pressure: acc.pressure + Number(m.pressure_ulcer_cases),
    falls: acc.falls + Number(m.fall_cases),
  }), { discharges: 0, deaths: 0, ama: 0, hai: 0, adr: 0, pressure: 0, falls: 0 });

  const rate = (n, d) => d > 0 ? Math.round((n / d) * 10000) / 100 : 0;

  return {
    data_source: 'HOSxP XE · 6-month safety analysis',
    timestamp: new Date().toISOString(),

    kpis: {
      mortality_rate_pct: rate(totals.deaths, totals.discharges),
      hai_rate_pct: rate(totals.hai, totals.discharges),
      adr_rate_per_1000: totals.discharges > 0 ? Math.round((totals.adr / totals.discharges) * 10000) / 10 : 0,
      ama_rate_pct: rate(totals.ama, totals.discharges),
      pressure_ulcer_rate_pct: rate(totals.pressure, totals.discharges),
      fall_rate_pct: rate(totals.falls, totals.discharges),
      total_discharges_6m: totals.discharges,

      ha_benchmarks: {
        mortality_target: '<2%',
        hai_target: '<1%',
        readmit_target: '<5%',
        ama_target: '<3%',
      },
    },

    monthly_trend: monthlyTrend || [],
    hai_by_ward: haiByWard || [],
    mortality_by_ward: mortalityByWard || [],
    readmit_trend: readmitTrend || [],
    adr_trend: adrTrend || [],
  };
}));

// Revenue-fiscal endpoint for CompareTab compatibility
router.get('/revenue-fiscal', cached('safety_revenue_fiscal', 3600000, async () => {
  return { data_source: 'N/A', fiscal_years: [] };
}));

export default router;
