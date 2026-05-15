// ============================================================
// BCH 360° Intelligence V.10 — Extended KPI Routes
// 30+ KPIs: Operations, Supply Chain, Appointments, BSC
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import { getFinanceCal } from '../ai/calibration.js';

const router = Router();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /operations — Operational Efficiency KPIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/operations', cached('kpi_operations_v1', 600000, async () => {
  const [bedTurnover, dischargePlanning, labTAT, xrayTAT, erMetrics, opdThroughput] = await Promise.all([
    // 1. Bed turnover rate (discharges per bed per month)
    dbQueryHeavy('kpi_bed_turnover', 120, `
      SELECT w.name AS ward, w.real_bedcount AS beds,
        COUNT(CASE WHEN i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) AS discharges_30d,
        ROUND(COUNT(CASE WHEN i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END)
              / NULLIF(w.real_bedcount, 0), 1) AS turnover_rate,
        ROUND(AVG(CASE WHEN i.dchdate IS NOT NULL THEN DATEDIFF(i.dchdate, i.regdate) END), 1) AS avg_los
      FROM ipt i
      JOIN ward w ON i.ward = w.ward
      WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND i.ward != '06'
      GROUP BY w.name, w.real_bedcount
      ORDER BY turnover_rate DESC
    `, [], { timeoutMs: 10000 }),

    // 2. Discharge planning (% before noon)
    dbQueryHeavy('kpi_dch_planning', 120, `
      SELECT
        COUNT(*) AS total_discharges,
        SUM(CASE WHEN TIME(i.dchtime) < '12:00:00' AND i.dchtime IS NOT NULL THEN 1 ELSE 0 END) AS before_noon,
        ROUND(SUM(CASE WHEN TIME(i.dchtime) < '12:00:00' AND i.dchtime IS NOT NULL THEN 1 ELSE 0 END)
              / NULLIF(COUNT(*), 0) * 100, 1) AS before_noon_pct,
        ROUND(AVG(CASE WHEN i.dchtime IS NOT NULL THEN HOUR(i.dchtime) + MINUTE(i.dchtime)/60 END), 1) AS avg_dch_hour
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL
    `, [], { timeoutMs: 10000 }),

    // 3. Lab TAT by test category
    dbQueryHeavy('kpi_lab_tat', 60, `
      SELECT
        CASE
          WHEN lo.lab_items_name_ref LIKE '%CBC%' OR lo.lab_items_name_ref LIKE '%Hb%' THEN 'Hematology'
          WHEN lo.lab_items_name_ref LIKE '%Glucose%' OR lo.lab_items_name_ref LIKE '%HbA1c%' OR lo.lab_items_name_ref LIKE '%BUN%' OR lo.lab_items_name_ref LIKE '%Creatinine%' THEN 'Chemistry'
          WHEN lo.lab_items_name_ref LIKE '%Urin%' OR lo.lab_items_name_ref LIKE '%UA%' THEN 'Urinalysis'
          WHEN lo.lab_items_name_ref LIKE '%Troponin%' OR lo.lab_items_name_ref LIKE '%Lactate%' THEN 'Critical/STAT'
          ELSE 'Other'
        END AS category,
        COUNT(*) AS tests,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE,
          CONCAT(lh.order_date, ' ', lh.order_time),
          CONCAT(lh.report_date, ' ', lh.report_time)
        ))) AS avg_tat_min,
        ROUND(AVG(CASE
          WHEN TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date, ' ', lh.order_time), CONCAT(lh.report_date, ' ', lh.report_time)) <= 60
          THEN 1 ELSE 0
        END) * 100, 1) AS within_60min_pct
      FROM lab_order lo
      JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND lh.report_date IS NOT NULL
      GROUP BY category
      HAVING tests >= 10
      ORDER BY avg_tat_min DESC
    `, [], { timeoutMs: 15000 }),

    // 4. X-ray TAT by modality
    dbQueryHeavy('kpi_xray_tat', 60, `
      SELECT
        CASE
          WHEN xi.xray_items_name LIKE '%CT%' THEN 'CT Scan'
          WHEN xi.xray_items_name LIKE '%MRI%' THEN 'MRI'
          WHEN xi.xray_items_name LIKE '%Ultra%' OR xi.xray_items_name LIKE '%US %' THEN 'Ultrasound'
          ELSE 'Plain Film'
        END AS modality,
        COUNT(*) AS exams,
        ROUND(AVG(TIME_TO_SEC(TIMEDIFF(xr.report_time, xr.accept_time)) / 60)) AS avg_tat_min,
        ROUND(SUM(xh.total_price)) AS total_revenue
      FROM xray_head xh
      JOIN xray_report xr ON xh.vn = xr.vn
      LEFT JOIN xray_items xi ON xr.xray_items_code = xi.xray_items_code
      WHERE xh.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND xr.report_time IS NOT NULL AND xr.accept_time IS NOT NULL
      GROUP BY modality
      ORDER BY exams DESC
    `, [], { timeoutMs: 10000 }),

    // 5. ER operational metrics — Phase H.6 outcome-based fixes:
    //    - admitted: ovst+an_stat JOIN (er_dch_type='2' was always 0 at BCH)
    //    - lwbs   : Phase A 5-condition proxy (finish<15m + no doctor + no admit + no refer)
    //    - deaths : patient.deathday during/post-ER (er_dch_type IN ('09','9') always 0)
    //    Cache key bumped: kpi_er_ops -> kpi_er_ops_v2_outcome
    dbQueryHeavy('kpi_er_ops_v2_outcome', 30, `
      SELECT
        COUNT(*) AS total_visits,
        ROUND(AVG(CASE WHEN e.door_to_doctor_second > 0 THEN e.door_to_doctor_second / 60 END), 1) AS avg_ttd_min,
        ROUND(AVG(CASE WHEN e.finish_time IS NOT NULL AND e.enter_er_time IS NOT NULL
          THEN TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) END)) AS avg_los_min,
        SUM(CASE
          WHEN e.door_to_doctor_second IS NULL
            AND e.doctor_tx_time IS NULL
            AND e.finish_time IS NOT NULL
            AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
            AND NOT EXISTS (
              SELECT 1 FROM ovst o2 JOIN an_stat an2 ON an2.hn = o2.hn
              WHERE o2.vn = e.vn AND an2.regdate = e.vstdate
            )
            AND NOT EXISTS (
              SELECT 1 FROM referout ro WHERE ro.vn = e.vn
                AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
            )
          THEN 1 ELSE 0 END) AS lwbs,
        SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) AS admitted,
        SUM(CASE
          WHEN p.deathday IS NOT NULL
           AND p.deathday BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
          THEN 1 ELSE 0 END) AS deaths,
        ROUND(100.0 * SUM(CASE
          WHEN e.door_to_doctor_second IS NULL
            AND e.doctor_tx_time IS NULL
            AND e.finish_time IS NOT NULL
            AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
            AND NOT EXISTS (
              SELECT 1 FROM ovst o2 JOIN an_stat an2 ON an2.hn = o2.hn
              WHERE o2.vn = e.vn AND an2.regdate = e.vstdate
            )
            AND NOT EXISTS (
              SELECT 1 FROM referout ro WHERE ro.vn = e.vn
                AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
            )
          THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) AS lwbs_pct
      FROM er_regist e
      LEFT JOIN ovst o ON o.vn = e.vn
      LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
      LEFT JOIN patient p ON p.hn = o.hn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `, [], { timeoutMs: 15000 }),

    // 6. OPD clinic throughput
    dbQueryHeavy('kpi_opd_throughput', 60, `
      SELECT c.name AS clinic,
        COUNT(DISTINCT o.vn) AS visits,
        COUNT(DISTINCT o.doctor) AS doctors,
        ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT o.vstdate), 0)) AS daily_avg,
        ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT o.doctor), 0)) AS per_doctor
      FROM ovst o
      JOIN clinic c ON o.cur_dep = c.clinic
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.vstdate < CURDATE()
      GROUP BY c.name
      HAVING visits >= 30
      ORDER BY visits DESC
      LIMIT 20
    `, [], { timeoutMs: 10000 }),
  ]);

  return {
    data_source: 'HOSxP XE',
    timestamp: new Date().toISOString(),

    bed_turnover: bedTurnover || [],
    discharge_planning: dischargePlanning,
    lab_tat: labTAT || [],
    xray_tat: xrayTAT || [],
    er_metrics: erMetrics,
    opd_throughput: opdThroughput || [],
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /supply-chain — Drug & Supply KPIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/supply-chain', cached('kpi_supply_v1', 3600000, async () => {
  const [drugSummary, drugCostTrend, drugByDept, highCostDrugs] = await Promise.all([
    // 1. Drug cost summary (from vn_stat — fast pre-aggregated)
    dbQueryHeavy('kpi_drug_summary_7d', 360, `
      SELECT
        COUNT(DISTINCT vn) AS total_prescriptions,
        ROUND(SUM(COALESCE(inc_drug, 0))) AS total_drug_cost,
        ROUND(AVG(COALESCE(inc_drug, 0))) AS avg_drug_per_visit,
        COUNT(DISTINCT hn) AS unique_patients
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND inc_drug > 0
    `, [], { timeoutMs: 10000 }),

    // 2. Monthly drug cost (from vn_stat inc_drug — much faster)
    dbQueryHeavy('kpi_drug_cost_trend', 360, `
      SELECT DATE_FORMAT(vstdate, '%Y-%m') AS month,
        COUNT(DISTINCT vn) AS prescriptions,
        ROUND(SUM(COALESCE(inc_drug, 0))) AS total_drug_cost
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND inc_drug > 0
      GROUP BY DATE_FORMAT(vstdate, '%Y-%m')
      ORDER BY month
    `, [], { timeoutMs: 15000 }),

    // 3. Drug revenue by department (from vn_stat — fast)
    dbQueryHeavy('kpi_drug_by_dept', 360, `
      SELECT k.department,
        COUNT(DISTINCT v.vn) AS visits_with_drugs,
        ROUND(SUM(COALESCE(v.inc_drug, 0))) AS drug_cost
      FROM vn_stat v
      JOIN ovst o ON v.vn = o.vn
      JOIN kskdepartment k ON o.main_dep = k.depcode
      WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND v.inc_drug > 0
      GROUP BY k.department
      ORDER BY drug_cost DESC
      LIMIT 15
    `, [], { timeoutMs: 10000 }),

    // 4. High-cost drugs (from drugitems master — no JOIN to opitemrece)
    dbQueryHeavy('kpi_highcost_drugs_master', 360, `
      SELECT name, units, ROUND(unitprice, 2) AS unit_price
      FROM drugitems
      WHERE unitprice >= 1000
      ORDER BY unitprice DESC
      LIMIT 15
    `, [], { timeoutMs: 5000 }),
  ]);

  return {
    data_source: 'HOSxP XE · vn_stat + drugitems',
    timestamp: new Date().toISOString(),

    kpis: {
      total_drug_cost_7d: Number(drugSummary?.total_drug_cost || 0),
      avg_drug_per_visit: Number(drugSummary?.avg_drug_per_visit || 0),
      total_prescriptions: Number(drugSummary?.total_prescriptions || 0),
      unique_patients: Number(drugSummary?.unique_patients || 0),
      high_cost_drugs: (highCostDrugs || []).length,
    },

    drug_summary: drugSummary,
    drug_cost_trend: drugCostTrend || [],
    drug_by_department: drugByDept || [],
    high_cost_drugs: highCostDrugs || [],
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /financial-deep — Deep Financial KPIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/financial-deep', cached('kpi_finance_deep', 3600000, async () => {
  const [revenuePerBed, collectionByPayer, cmiTrend, revPerVisit, arAging] = await Promise.all([
    // 1. Revenue per bed-day
    dbQueryHeavy('kpi_rev_per_bed', 120, `
      SELECT
        ROUND(SUM(a.income) / NULLIF(SUM(DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate)), 0)) AS revenue_per_bed_day,
        SUM(a.income) AS total_income,
        SUM(DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate)) AS total_bed_days,
        COUNT(DISTINCT i.an) AS admissions
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND i.ward != '06'
    `, [], { timeoutMs: 15000 }),

    // 2. Collection rate by payer type (3 months for speed)
    dbQueryHeavy('kpi_collection_payer_3m', 120, `
      SELECT pt.name AS payer,
        COUNT(DISTINCT v.vn) AS visits,
        ROUND(SUM(v.income)) AS billed,
        ROUND(SUM(v.paid_money)) AS collected,
        ROUND(SUM(v.remain_money)) AS outstanding,
        ROUND(SUM(v.paid_money) / NULLIF(SUM(v.income), 0) * 100, 1) AS collection_rate_pct
      FROM vn_stat v
      JOIN pttype pt ON v.pttype = pt.pttype
      WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        AND v.income > 0
      GROUP BY pt.name
      HAVING billed >= 5000
      ORDER BY billed DESC
      LIMIT 15
    `, [], { timeoutMs: 25000 }),

    // 3. Case Mix Index trend (3 months for speed)
    dbQueryHeavy('kpi_cmi_trend_3m', 120, `
      SELECT DATE_FORMAT(i.dchdate, '%Y-%m') AS month,
        COUNT(*) AS cases,
        ROUND(AVG(a.rw), 3) AS cmi,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS alos,
        ROUND(AVG(a.income)) AS avg_revenue
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND i.dchdate IS NOT NULL AND a.rw > 0
      GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
      ORDER BY month
    `, [], { timeoutMs: 10000 }),

    // 4. Revenue per visit overall (simple — no department JOIN for speed)
    dbQueryHeavy('kpi_rev_per_visit', 120, `
      SELECT
        COUNT(DISTINCT vn) AS visits,
        ROUND(SUM(income)) AS total_revenue,
        ROUND(SUM(income) / NULLIF(COUNT(DISTINCT vn), 0)) AS revenue_per_visit
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND income > 0
    `, [], { timeoutMs: 10000 }),

    // 5. AR aging (receivables — 3 months for speed)
    dbQueryHeavy('kpi_ar_aging_3m', 120, `
      SELECT
        SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) <= 30 THEN v.remain_money ELSE 0 END) AS ar_0_30,
        SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 31 AND 60 THEN v.remain_money ELSE 0 END) AS ar_31_60,
        SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 61 AND 90 THEN v.remain_money ELSE 0 END) AS ar_61_90,
        SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) > 90 THEN v.remain_money ELSE 0 END) AS ar_over_90,
        SUM(v.remain_money) AS total_ar
      FROM vn_stat v
      WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND v.remain_money > 0
    `, [], { timeoutMs: 25000 }),
  ]);

  return {
    data_source: 'HOSxP XE · Financial Deep Analysis',
    timestamp: new Date().toISOString(),

    revenue_per_bed: revenuePerBed,
    collection_by_payer: collectionByPayer || [],
    cmi_trend: cmiTrend || [],
    revenue_per_visit: revPerVisit,
    ar_aging: arAging,
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /bsc — Balanced Scorecard Summary
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/bsc', cached('kpi_bsc_v1', 1800000, async () => {
  const [financial, customer, processData, learning] = await Promise.all([
    // Financial Perspective (30 days for speed)
    dbQueryOne(`
      SELECT
        ROUND(SUM(income)) AS total_revenue_ytd,
        ROUND(SUM(paid_money)) AS collected_ytd,
        ROUND(SUM(paid_money) / NULLIF(SUM(income), 0) * 100, 1) AS collection_rate,
        COUNT(DISTINCT vn) AS total_visits
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND income > 0
    `, [], { timeoutMs: 10000 }),

    // Customer Perspective (7 days for speed)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT hn) AS unique_patients,
        COUNT(DISTINCT vn) AS total_visits,
        ROUND(COUNT(DISTINCT vn) / NULLIF(COUNT(DISTINCT hn), 0), 1) AS visits_per_patient,
        SUM(CASE WHEN ovstost IN ('1','2') THEN 1 ELSE 0 END) AS new_patients
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `, [], { timeoutMs: 10000 }),

    // Internal Process Perspective (simple — no subquery)
    dbQueryOne(`
      SELECT
        (SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) FROM ipt
         WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchdate IS NOT NULL) AS avg_los,
        (SELECT ROUND(COUNT(CASE WHEN dchdate IS NULL THEN 1 END) /
                NULLIF((SELECT SUM(real_bedcount) FROM ward WHERE ward != '06'), 0) * 100, 1)
         FROM ipt WHERE dchdate IS NULL AND ward != '06') AS bed_occupancy_pct
    `, [], { timeoutMs: 10000 }),

    // Learning & Growth (7 days for speed)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT doctor) AS active_doctors,
        COUNT(DISTINCT staff) AS active_staff
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND doctor IS NOT NULL AND doctor != ''
    `, [], { timeoutMs: 10000 }),
  ]);

  return {
    data_source: 'HOSxP XE · Balanced Scorecard',
    timestamp: new Date().toISOString(),

    financial: {
      revenue_ytd: Number(financial?.total_revenue_ytd || 0),
      collection_rate: Number(financial?.collection_rate || 0),
      total_visits: Number(financial?.total_visits || 0),
      score: Math.min(100, Math.round(Number(financial?.collection_rate || 0))),
    },

    customer: {
      unique_patients: Number(customer?.unique_patients || 0),
      visits_per_patient: Number(customer?.visits_per_patient || 0),
      new_patients: Number(customer?.new_patients || 0),
      score: Math.min(100, Math.round((Number(customer?.new_patients || 0) / Math.max(Number(customer?.total_visits || 1), 1)) * 100 * 3)),
    },

    internal_process: {
      avg_los: Number(processData?.avg_los || 0),
      bed_occupancy_pct: Number(processData?.bed_occupancy_pct || 0),
      score: Math.min(100, Math.max(0, Math.round(100 - Number(processData?.avg_los || 4) * 5))),
    },

    learning_growth: {
      active_doctors: Number(learning?.active_doctors || 0),
      active_staff: Number(learning?.active_staff || 0),
      score: 70, // baseline — needs survey integration
    },
  };
}));

export default router;
