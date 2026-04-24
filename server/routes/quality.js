import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';

const router = Router();

// ============================================================
// ⭐ Quality & Patient Safety — HOSxP XE
// ---- HA Thailand Accreditation Indicators -------------------
// Indicator domains:
//   PCT  — Patient Care Team (Readmission, Mortality, LOS, CMI)
//   IC   — Infection Control (HAI estimate from secondary ICD)
//   MED  — Medication Safety (Adverse Drug Reactions)
//   ENV  — Environment/Efficiency (Discharge Planning, AMA)
//   IM   — Information Management (Documentation)
// ---- Key columns -------------------------------------------
// ipt:       dchtype ('09'/'9'=Death, '6'/'06'=AMA), dchdate, regdate, ward
// an_stat:   rw (relative weight), pdx, income
// iptdiag:   an, diagtype, icd10
// ovst:      vstdate, main_dep, hn
// vn_stat:   income, paid_money
// ============================================================

// ── Helper: build QPI score ──────────────────────────────────
function calcQPI({ readmitRate, mortalityRate, amaRate, haiRate, dchPlanPct }) {
  // Calibrated against HA Thailand benchmarks:
  //   Readmit  HA<5%  : ×5  → 0%=100, 5%=75, 10%=50, 20%=0
  //   Mortality HA<2% : ×15 → 0%=100, 2%=70, 5%=25, 6.7%=0
  //   AMA      HA<3%  : ×10 → 0%=100, 3%=70, 10%=0
  //   HAI      HA<1%  : ×35 → 0%=100, 1%=65, 2.9%=0
  //   DchPlan  HA>95% : direct % → 95%=95, 80%=80
  const readmitScore   = Math.max(0, Math.min(100, Math.round(100 - readmitRate * 5)));
  const mortalityScore = Math.max(0, Math.min(100, Math.round(100 - mortalityRate * 15)));
  const amaScore       = Math.max(0, Math.min(100, Math.round(100 - amaRate * 10)));
  const haiScore       = Math.max(0, Math.min(100, Math.round(100 - haiRate * 35)));
  const dchPlanScore   = Math.min(100, Math.round(dchPlanPct));
  const qpi = Math.round(
    readmitScore * 0.28 + mortalityScore * 0.28 + amaScore * 0.16 + haiScore * 0.16 + dchPlanScore * 0.12
  );
  return { qpi, readmitScore, mortalityScore, amaScore, haiScore, dchPlanScore };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /today — Daily Quality Snapshot
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/today', cached('qualityToday_v1', 60000, async () => {
  const [admission, discharge, todayADR, criticalLabs, readmitToday] = await Promise.all([

    // 1. Today admissions & current census
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN DATE(i.regdate) = CURDATE() THEN 1 ELSE 0 END) as admitted_today,
        SUM(CASE WHEN i.dchdate IS NULL THEN 1 ELSE 0 END) as current_census,
        SUM(CASE WHEN i.dchdate IS NULL AND DATEDIFF(CURDATE(), i.regdate) > 14 THEN 1 ELSE 0 END) as overstay_now
      FROM ipt i WHERE i.ward != '06'
        AND (i.dchdate IS NULL OR i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 1 DAY))
    `).catch(() => null),

    // 2. Today discharges + mortality + AMA
    dbQueryOne(`
      SELECT
        COUNT(*) as total_dch,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) as deaths_today,
        SUM(CASE WHEN i.dchtype IN ('06','6','08','8') THEN 1 ELSE 0 END) as ama_today,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as avg_los_today,
        SUM(CASE WHEN HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END) as before_noon
      FROM ipt i
      WHERE i.dchdate = CURDATE() AND i.ward != '06'
    `).catch(() => null),

    // 3. Today Adverse Drug Reactions (ICD T36-T50 as secondary dx in OPD)
    dbQueryOne(`
      SELECT COUNT(DISTINCT o.vn) as adr_count
      FROM ovst o
      INNER JOIN ovstdiag od ON o.vn = od.vn
      WHERE o.vstdate = CURDATE()
        AND od.diagtype != '1'
        AND od.icd10 BETWEEN 'T36' AND 'T509'
    `).catch(() => null),

    // 4. Critical lab values not yet acknowledged (today, abnormal)
    dbQueryOne(`
      SELECT COUNT(*) as critical_count
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date = CURDATE()
        AND lo.abnormal_result = 'Y'
        AND (
          lo.lab_items_name_ref LIKE '%Potassium%' OR lo.lab_items_name_ref LIKE '%Troponin%'
          OR lo.lab_items_name_ref LIKE '%Lactate%' OR lo.lab_items_name_ref LIKE '%pH%'
          OR lo.lab_items_name_ref LIKE '%Glucose%'
        )
    `).catch(() => null),

    // 5. Readmission flags today (patients admitted today who were discharged in last 28D)
    dbQueryOne(`
      SELECT COUNT(DISTINCT i2.an) as readmit_today
      FROM ipt i2
      INNER JOIN ipt i1
        ON i1.hn = i2.hn AND i1.an != i2.an
        AND i1.dchdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 28 DAY) AND DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      WHERE DATE(i2.regdate) = CURDATE()
        AND i2.ward != '06'
    `).catch(() => null),
  ]);

  return {
    data_source: 'HOSxP XE',
    admitted_today:  Number(admission?.admitted_today || 0),
    current_census:  Number(admission?.current_census || 0),
    overstay_now:    Number(admission?.overstay_now || 0),
    discharged_today: Number(discharge?.total_dch || 0),
    deaths_today:    Number(discharge?.deaths_today || 0),
    ama_today:       Number(discharge?.ama_today || 0),
    avg_los_today:   Number(discharge?.avg_los_today || 0),
    before_noon_today: Number(discharge?.before_noon || 0),
    adr_today:       Number(todayADR?.adr_count || 0),
    critical_labs:   Number(criticalLabs?.critical_count || 0),
    readmit_today:   Number(readmitToday?.readmit_today || 0),
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /analytics — 30-Day Quality Analytics (Full HA Indicators)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cached('qualityAnalytics_v2', 300000, async () => {
  const [
    // PCT Domain
    readmitData, mortalityData, alosData, cmiData, dchPlanData, amaData,
    // IC Domain
    haiData, haiByType,
    // MED Domain
    adrData, adrByDrug,
    // IM Domain
    docCompletion,
    // Trends
    monthlyTrend,
    // Ward breakdown
    wardReadmit, wardMortality,
    // Top Diagnoses with high readmission
    topReadmitDx,
  ] = await Promise.all([

    // ── PCT 1: 28-Day Readmission Rate (HA Thailand standard)
    // Observation window: discharges from 28-90 days ago (ensures every case has full 28d to be readmitted)
    dbQueryOneHeavy('qualReadmit28d_v2', 120, `
      SELECT
        COUNT(DISTINCT i1.an) as total_discharges,
        COUNT(DISTINCT i2.an) as readmit_count,
        ROUND(100.0 * COUNT(DISTINCT i2.an) / NULLIF(COUNT(DISTINCT i1.an), 0), 2) as readmit_rate
      FROM ipt i1
      LEFT JOIN ipt i2
        ON i1.hn = i2.hn AND i2.an != i1.an
        AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 28 DAY)
      WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND i1.dchdate <= DATE_SUB(CURDATE(), INTERVAL 28 DAY)
        AND i1.dchdate IS NOT NULL AND i1.ward != '06'
    `).catch(() => null),

    // ── PCT 2: Mortality Rate (30D)
    dbQueryOne(`
      SELECT
        COUNT(*) as total_dch,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) as deaths,
        ROUND(100.0 * SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 2) as mortality_rate,
        SUM(CASE WHEN i.dchtype IN ('09','9') AND DATEDIFF(i.dchdate, i.regdate) < 2 THEN 1 ELSE 0 END) as early_deaths
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
    `).catch(() => null),

    // ── PCT 3: ALOS vs Benchmark
    dbQueryOne(`
      SELECT
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) as actual_alos,
        ROUND(AVG(a.los), 2) as stat_alos,
        SUM(CASE WHEN DATEDIFF(i.dchdate, i.regdate) > 14 THEN 1 ELSE 0 END) as overstay_count,
        COUNT(*) as total
      FROM ipt i
      LEFT JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
    `).catch(() => null),

    // ── PCT 4: CMI (Case Mix Index)
    dbQueryOneHeavy('qualCMI30d', 120, `
      SELECT
        ROUND(AVG(a.rw), 3) as cmi,
        ROUND(STDDEV(a.rw), 3) as cmi_sd,
        SUM(CASE WHEN a.rw >= 2.0 THEN 1 ELSE 0 END) as complex_cases,
        SUM(CASE WHEN a.rw >= 1.0 AND a.rw < 2.0 THEN 1 ELSE 0 END) as moderate_cases,
        SUM(CASE WHEN a.rw < 1.0 THEN 1 ELSE 0 END) as simple_cases,
        COUNT(*) as total_cases
      FROM ipt i
      INNER JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND a.rw > 0
    `).catch(() => null),

    // ── ENV 1: Discharge Planning (% with dchtime recorded = has discharge plan)
    //    + Before-noon efficiency as separate metric
    dbQueryOne(`
      SELECT
        COUNT(*) as total_dch,
        SUM(CASE WHEN i.dchtime IS NOT NULL AND i.dchtime != '' AND i.dchtime != '00:00:00' THEN 1 ELSE 0 END) as has_dch_plan,
        ROUND(100.0 * SUM(CASE WHEN i.dchtime IS NOT NULL AND i.dchtime != '' AND i.dchtime != '00:00:00' THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as dch_plan_pct,
        SUM(CASE WHEN i.dchtime IS NOT NULL AND HOUR(i.dchtime) > 0 AND HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END) as before_noon,
        SUM(CASE WHEN i.dchtime IS NOT NULL AND HOUR(i.dchtime) >= 12 AND HOUR(i.dchtime) < 16 THEN 1 ELSE 0 END) as afternoon,
        SUM(CASE WHEN i.dchtime IS NOT NULL AND HOUR(i.dchtime) >= 16 THEN 1 ELSE 0 END) as evening,
        ROUND(100.0 * SUM(CASE WHEN i.dchtime IS NOT NULL AND HOUR(i.dchtime) > 0 AND HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END)
          / NULLIF(SUM(CASE WHEN i.dchtime IS NOT NULL AND i.dchtime != '' AND i.dchtime != '00:00:00' THEN 1 ELSE 0 END), 0), 1) as before_noon_pct,
        ROUND(AVG(CASE WHEN i.dchtime IS NOT NULL AND i.dchtime != '00:00:00' THEN HOUR(i.dchtime) + MINUTE(i.dchtime)/60.0 END), 1) as avg_dch_hour
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
    `).catch(() => null),

    // ── ENV 2: AMA Rate (Against Medical Advice — dchtype '6','06','8','08')
    dbQueryOne(`
      SELECT
        COUNT(*) as total_dch,
        SUM(CASE WHEN i.dchtype IN ('06','6','08','8') THEN 1 ELSE 0 END) as ama_count,
        ROUND(100.0 * SUM(CASE WHEN i.dchtype IN ('06','6','08','8') THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 2) as ama_rate
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
    `).catch(() => null),

    // ── IC 1: HAI Rate — true infection codes only, LOS > 2 days
    // ICD-10 scoped to actual HAI:
    //   BSI: A40-A41 (sepsis/bacteremia)
    //   SSI: T81.4 (surgical site infection)
    //   VAP: J95.85 (ventilator-associated pneumonia), J15-J18 (hospital pneumonia, LOS>2)
    //   CAUTI: N39.0 (UTI — catheter-associated)
    //   CLABSI: T80.2 (infection from infusion/transfusion/injection)
    //   Pressure Ulcer: L89 (decubitus)
    dbQueryOneHeavy('qualHAI30d_v2', 120, `
      SELECT
        COUNT(DISTINCT base.an) as total_admissions,
        COUNT(DISTINCT hai.an) as hai_cases,
        ROUND(100.0 * COUNT(DISTINCT hai.an) / NULLIF(COUNT(DISTINCT base.an), 0), 2) as hai_rate
      FROM ipt base
      LEFT JOIN (
        SELECT DISTINCT id2.an
        FROM iptdiag id2
        INNER JOIN ipt i2 ON id2.an = i2.an
        WHERE id2.diagtype != '1'
          AND (
            id2.icd10 LIKE 'A40%' OR id2.icd10 LIKE 'A41%'
            OR id2.icd10 LIKE 'T81.4%'
            OR id2.icd10 LIKE 'T80.2%'
            OR id2.icd10 LIKE 'J95.85%'
            OR id2.icd10 BETWEEN 'J15' AND 'J189'
            OR id2.icd10 LIKE 'N39.0%'
            OR id2.icd10 LIKE 'L89%'
          )
          AND DATEDIFF(IFNULL(i2.dchdate, CURDATE()), i2.regdate) > 2
          AND i2.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ) hai ON base.an = hai.an
      WHERE base.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND base.dchdate IS NOT NULL AND base.ward != '06'
    `).catch(() => null),

    // ── IC 2: HAI by Type (mapped to standard HAI categories)
    dbQuery(`
      SELECT
        CASE
          WHEN id2.icd10 LIKE 'A40%' OR id2.icd10 LIKE 'A41%' THEN 'BSI'
          WHEN id2.icd10 LIKE 'T80.2%' THEN 'CLABSI'
          WHEN id2.icd10 LIKE 'T81.4%' THEN 'SSI'
          WHEN id2.icd10 LIKE 'J95.85%' OR id2.icd10 BETWEEN 'J15' AND 'J189' THEN 'VAP'
          WHEN id2.icd10 LIKE 'N39.0%' THEN 'CAUTI'
          WHEN id2.icd10 LIKE 'L89%' THEN 'Pressure Ulcer'
          ELSE 'Other HAI'
        END as hai_type,
        COUNT(DISTINCT id2.an) as case_count
      FROM iptdiag id2
      INNER JOIN ipt i2 ON id2.an = i2.an
      WHERE id2.diagtype != '1'
        AND (
          id2.icd10 LIKE 'A40%' OR id2.icd10 LIKE 'A41%'
          OR id2.icd10 LIKE 'T81.4%'
          OR id2.icd10 LIKE 'T80.2%'
          OR id2.icd10 LIKE 'J95.85%'
          OR id2.icd10 BETWEEN 'J15' AND 'J189'
          OR id2.icd10 LIKE 'N39.0%'
          OR id2.icd10 LIKE 'L89%'
        )
        AND DATEDIFF(IFNULL(i2.dchdate, CURDATE()), i2.regdate) > 2
        AND i2.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY hai_type
      ORDER BY case_count DESC
    `).catch(() => []),

    // ── MED 1: ADR Rate — T36-T50 as secondary dx in OPD (30D)
    // Denominator: total OPD visits (counted separately to avoid JOIN inflation)
    dbQueryOne(`
      SELECT
        total.cnt as total_opd,
        IFNULL(adr.cnt, 0) as adr_count,
        ROUND(100.0 * IFNULL(adr.cnt, 0) / NULLIF(total.cnt, 0), 3) as adr_rate
      FROM (SELECT COUNT(*) as cnt FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) total
      LEFT JOIN (
        SELECT COUNT(DISTINCT o.vn) as cnt
        FROM ovst o
        INNER JOIN ovstdiag od ON o.vn = od.vn
        WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND od.diagtype != '1'
          AND od.icd10 BETWEEN 'T36' AND 'T509'
      ) adr ON 1=1
    `).catch(() => null),

    // ── MED 2: ADR by Drug Category
    dbQuery(`
      SELECT
        CASE
          WHEN od.icd10 BETWEEN 'T36' AND 'T369' THEN 'Antibiotic'
          WHEN od.icd10 BETWEEN 'T39' AND 'T399' THEN 'Analgesic/NSAID'
          WHEN od.icd10 BETWEEN 'T46' AND 'T469' THEN 'Cardiovascular'
          WHEN od.icd10 BETWEEN 'T40' AND 'T409' THEN 'Opioid/Narcotic'
          ELSE 'Other Drug'
        END as drug_category,
        COUNT(DISTINCT o.vn) as case_count
      FROM ovst o
      INNER JOIN ovstdiag od ON o.vn = od.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND od.icd10 BETWEEN 'T36' AND 'T509'
        AND od.diagtype != '1'
      GROUP BY drug_category
      ORDER BY case_count DESC
    `).catch(() => []),

    // ── IM 1: Documentation Completeness (IPD discharge summaries)
    //   pdx_completeness = % with primary diagnosis recorded
    //   diag_coded_rate  = % with ANY diagnosis (primary or secondary) coded
    //   dchtime_completeness = % with discharge time recorded
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT i.an) as total_dch,
        SUM(CASE WHEN EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') THEN 1 ELSE 0 END) as has_pdx,
        SUM(CASE WHEN EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an) THEN 1 ELSE 0 END) as has_any_diag,
        SUM(CASE WHEN i.dchtime IS NOT NULL AND i.dchtime != '' AND i.dchtime != '00:00:00' THEN 1 ELSE 0 END) as has_dchtime,
        ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') THEN 1 ELSE 0 END)
          / NULLIF(COUNT(DISTINCT i.an), 0), 1) as pdx_completeness,
        ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an) THEN 1 ELSE 0 END)
          / NULLIF(COUNT(DISTINCT i.an), 0), 1) as diag_coded_rate,
        ROUND(100.0 * SUM(CASE WHEN i.dchtime IS NOT NULL AND i.dchtime != '' AND i.dchtime != '00:00:00' THEN 1 ELSE 0 END)
          / NULLIF(COUNT(DISTINCT i.an), 0), 1) as dchtime_completeness
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
    `).catch(() => null),

    // ── Trend: Monthly Quality Indicators (6M)
    dbQuery(`
      SELECT DATE_FORMAT(i.dchdate, '%Y-%m') as month,
        COUNT(*) as total_dch,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) as avg_los,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) as deaths,
        SUM(CASE WHEN i.dchtype IN ('06','6','08','8') THEN 1 ELSE 0 END) as ama,
        ROUND(100.0 * SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as mortality_rate,
        ROUND(100.0 * SUM(CASE WHEN i.dchtype IN ('06','6','08','8') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as ama_rate,
        ROUND(100.0 * SUM(CASE WHEN HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as before_noon_pct
      FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
      GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
      ORDER BY month
    `).catch(() => []),

    // ── Ward: Readmission + ALOS by Ward (28-day, with observation window)
    dbQuery(`
      SELECT w.name as ward_name, i1.ward,
        COUNT(DISTINCT i1.an) as total_dch,
        COUNT(DISTINCT i2.an) as readmit_count,
        ROUND(100.0 * COUNT(DISTINCT i2.an) / NULLIF(COUNT(DISTINCT i1.an), 0), 1) as readmit_rate,
        ROUND(AVG(DATEDIFF(i1.dchdate, i1.regdate)), 1) as avg_los
      FROM ipt i1
      LEFT JOIN ipt i2 ON i1.hn = i2.hn AND i2.an != i1.an
        AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 28 DAY)
      LEFT JOIN ward w ON i1.ward = w.ward
      WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND i1.dchdate <= DATE_SUB(CURDATE(), INTERVAL 28 DAY)
        AND i1.dchdate IS NOT NULL AND i1.ward != '06'
      GROUP BY i1.ward, w.name
      HAVING COUNT(DISTINCT i1.an) >= 5
      ORDER BY readmit_rate DESC LIMIT 10
    `).catch(() => []),

    // ── Ward: Mortality + ALOS by Ward
    dbQuery(`
      SELECT w.name as ward_name, i.ward,
        COUNT(*) as total_dch,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) as deaths,
        ROUND(100.0 * SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as mortality_rate,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as avg_los
      FROM ipt i
      LEFT JOIN ward w ON i.ward = w.ward
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND i.dchdate IS NOT NULL AND i.ward != '06'
      GROUP BY i.ward, w.name
      HAVING COUNT(*) >= 5
      ORDER BY mortality_rate DESC LIMIT 10
    `).catch(() => []),

    // ── Top Diagnoses with High Readmission (28D, with observation window)
    dbQuery(`
      SELECT a.pdx, d.name as dx_name,
        COUNT(DISTINCT i1.an) as total_cases,
        COUNT(DISTINCT i2.an) as readmit_cases,
        ROUND(100.0 * COUNT(DISTINCT i2.an) / NULLIF(COUNT(DISTINCT i1.an), 0), 1) as readmit_rate,
        ROUND(AVG(DATEDIFF(i1.dchdate, i1.regdate)), 1) as avg_los
      FROM ipt i1
      INNER JOIN an_stat a ON i1.an = a.an
      LEFT JOIN icd101 d ON a.pdx = d.code
      LEFT JOIN ipt i2 ON i1.hn = i2.hn AND i2.an != i1.an
        AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 28 DAY)
      WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND i1.dchdate <= DATE_SUB(CURDATE(), INTERVAL 28 DAY)
        AND i1.dchdate IS NOT NULL AND i1.ward != '06'
        AND a.pdx IS NOT NULL AND a.pdx != ''
      GROUP BY a.pdx, d.name
      HAVING COUNT(DISTINCT i1.an) >= 5
      ORDER BY readmit_rate DESC LIMIT 10
    `).catch(() => []),
  ]);

  // ── Derived ──────────────────────────────────────────────
  const readmitRate    = Number(readmitData?.readmit_rate || 0);
  const mortalityRate  = Number(mortalityData?.mortality_rate || 0);
  const amaRate        = Number(amaData?.ama_rate || 0);
  const haiRate        = Number(haiData?.hai_rate || 0);
  const dchPlanPct     = Number(dchPlanData?.dch_plan_pct || 0);
  const beforeNoonPct  = Number(dchPlanData?.before_noon_pct || 0);
  const actualALOS     = Number(alosData?.actual_alos || 0);
  const cmi            = Number(cmiData?.cmi || 0);
  const adrRate        = Number(adrData?.adr_rate || 0);
  const pdxComplete    = Number(docCompletion?.pdx_completeness || 0);
  const diagCodedRate  = Number(docCompletion?.diag_coded_rate || 0);
  const dchtimeComplete = Number(docCompletion?.dchtime_completeness || 0);

  // QPI Composite — dchPlanPct = % with discharge plan (dchtime recorded), NOT before-noon
  const { qpi, readmitScore, mortalityScore, amaScore, haiScore, dchPlanScore } = calcQPI({
    readmitRate, mortalityRate, amaRate, haiRate, dchPlanPct
  });

  // Monthly trend
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
    total_dch: Number(m.total_dch || 0),
    avg_los: Number(m.avg_los || 0),
    deaths: Number(m.deaths || 0),
    ama: Number(m.ama || 0),
    mortality_rate: Number(m.mortality_rate || 0),
    ama_rate: Number(m.ama_rate || 0),
    before_noon_pct: Number(m.before_noon_pct || 0),
  }));

  // ── Domain Scores (HA 5 domains) ─────────────────────────────
  const pctScore = Math.round((readmitScore + mortalityScore) / 2);
  const icScore  = haiScore;
  const medScore = Math.max(0, Math.round(100 - adrRate * 20));
  const envScore = Math.round((amaScore + dchPlanScore) / 2);
  const imScore  = Math.round((pdxComplete + dchtimeComplete) / 2);
  const domains  = { pct: pctScore, ic: icScore, med: medScore, env: envScore, im: imScore };

  // ── HAI Types (structured for QualityTab) ────────────────────
  const haiTypesArr = (haiByType || []).map(h => ({ type: h.hai_type, count: Number(h.case_count || 0) }));
  const haiLookup = (key) => haiTypesArr.find(h => h.type === key)?.count ?? 0;
  const haiTypes = {
    bsi:   haiLookup('BSI') + haiLookup('CLABSI'),
    ssi:   haiLookup('SSI'),
    vap:   haiLookup('VAP'),
    cauti: haiLookup('CAUTI'),
    pressure_ulcer: haiLookup('Pressure Ulcer'),
  };

  // ── Ward Breakdown (merged readmit + mortality per ward) ──────
  const wardMap = {};
  for (const w of (wardReadmit || [])) {
    wardMap[w.ward] = { ward: w.ward, ward_name: w.ward_name || w.ward,
      discharges: Number(w.total_dch || 0), readmit: Number(w.readmit_count || 0),
      deaths: 0, alos: Number(w.avg_los || 0) };
  }
  for (const w of (wardMortality || [])) {
    if (!wardMap[w.ward]) wardMap[w.ward] = { ward: w.ward, ward_name: w.ward_name || w.ward, discharges: Number(w.total_dch || 0), readmit: 0, deaths: 0, alos: 0 };
    wardMap[w.ward].deaths = Number(w.deaths || 0);
    // Use mortality query ALOS only if readmit query didn't already set it
    if (!wardMap[w.ward].alos) wardMap[w.ward].alos = Number(w.avg_los || 0);
  }
  const wardBreakdown = Object.values(wardMap).sort((a, b) => b.discharges - a.discharges).slice(0, 15);

  return {
    data_source: 'HOSxP XE',
    // QPI composite
    qpi,
    qpi_score: qpi,  // alias for QualityTab gauge
    qpi_components: { readmit: readmitScore, mortality: mortalityScore, ama: amaScore, hai: haiScore, dch_plan: dchPlanScore },
    // 5 HA domains
    domains,
    // PCT indicators
    readmit_rate: readmitRate,
    readmit_count: Number(readmitData?.readmit_count || 0),
    total_discharges: Number(readmitData?.total_discharges || 0),
    mortality_rate: mortalityRate,
    death_count: Number(mortalityData?.deaths || 0),
    early_deaths: Number(mortalityData?.early_deaths || 0),
    alos: actualALOS,
    actual_alos: actualALOS,
    overstay_count: Number(alosData?.overstay_count || 0),
    cmi,
    cmi_sd: Number(cmiData?.cmi_sd || 0),
    complex_cases: Number(cmiData?.complex_cases || 0),
    moderate_cases: Number(cmiData?.moderate_cases || 0),
    simple_cases: Number(cmiData?.simple_cases || 0),
    // ENV indicators
    ama_rate: amaRate,
    ama_count: Number(amaData?.ama_count || 0),
    dch_plan_rate: dchPlanPct,
    dch_plan_pct: dchPlanPct,
    before_noon_pct: beforeNoonPct,
    avg_dch_hour: Number(dchPlanData?.avg_dch_hour || 0),
    // IC indicators
    hai_rate: haiRate,
    hai_cases: Number(haiData?.hai_cases || 0),
    hai_types: haiTypes,
    hai_by_type: haiTypesArr,
    // MED indicators
    adr_rate: adrRate,
    adr_count: Number(adrData?.adr_count || 0),
    adr_by_drug: (adrByDrug || []).map(d => ({ category: d.drug_category, count: Number(d.case_count || 0) })),
    // IM indicators
    doc_completeness: pdxComplete,
    pdx_completeness: pdxComplete,
    diag_coded_rate: diagCodedRate,
    dchtime_completeness: dchtimeComplete,
    // Trends
    monthly_trend: monthData,
    // Ward analysis
    ward_breakdown: wardBreakdown,
    ward_readmit: wardBreakdown,
    ward_mortality: (wardMortality || []).map(w => ({
      ward: w.ward, name: w.ward_name, total: Number(w.total_dch || 0),
      deaths: Number(w.deaths || 0), rate: Number(w.mortality_rate || 0),
    })),
    // Top readmit diagnoses
    top_readmit_diag: (topReadmitDx || []).map(d => ({
      icd10: d.pdx, diagnosis: d.dx_name, count: Number(d.total_cases || 0),
      readmit: Number(d.readmit_cases || 0), rate: Number(d.readmit_rate || 0), avg_los: Number(d.avg_los || 0),
    })),
    top_readmit_dx: (topReadmitDx || []).map(d => ({
      pdx: d.pdx, name: d.dx_name, total: Number(d.total_cases || 0),
      readmit: Number(d.readmit_cases || 0), rate: Number(d.readmit_rate || 0), avg_los: Number(d.avg_los || 0),
    })),
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /indicators — HA Thailand Indicator Fiscal Trends
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/indicators', cached('qualityIndicators_v1', 3600000, async () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear  = new Date().getFullYear();
  const currentFY    = currentMonth >= 10 ? currentYear + 1 : currentYear;
  const fiscalYears  = [currentFY - 2, currentFY - 1, currentFY];
  const MTH_ORDER    = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

  const fyData = await Promise.all(fiscalYears.map(async (fy) => {
    const fyStart = `${fy - 1}-10-01`;
    const fyEnd   = `${fy}-09-30`;
    const rows = await dbQuery(`
      SELECT DATE_FORMAT(i.dchdate, '%Y-%m') as ym,
        COUNT(*) as total_dch,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) as avg_los,
        SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) as deaths,
        SUM(CASE WHEN i.dchtype IN ('06','6','08','8') THEN 1 ELSE 0 END) as ama,
        ROUND(100.0 * SUM(CASE WHEN i.dchtype IN ('09','9') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as mortality_rate
      FROM ipt i
      WHERE i.dchdate BETWEEN '${fyStart}' AND '${fyEnd}'
        AND i.dchdate IS NOT NULL AND i.ward != '06'
      GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
      ORDER BY ym
    `).catch(() => []);

    const monthMap = {};
    (rows || []).forEach(r => { monthMap[r.ym] = { total: Number(r.total_dch || 0), los: Number(r.avg_los || 0), deaths: Number(r.deaths || 0), ama: Number(r.ama || 0), mortality: Number(r.mortality_rate || 0) }; });

    const months = MTH_ORDER.map((label, i) => {
      const mo  = i < 3 ? (10 + i) : (i - 2);
      const yr  = i < 3 ? (fy - 1) : fy;
      const key = `${yr}-${String(mo).padStart(2, '0')}`;
      const d   = monthMap[key] || {};
      return { month: label, month_num: mo, revenue: d.total || 0, total: d.total || 0, los: d.los || 0, deaths: d.deaths || 0, mortality: d.mortality || 0 };
    });

    const totalDch = months.reduce((s, m) => s + m.total, 0);
    const totalDeaths = months.reduce((s, m) => s + m.deaths, 0);
    const nowKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    const comparable = months.filter((_, i) => {
      const mo = i < 3 ? (10 + i) : (i - 2);
      const yr = i < 3 ? (fy - 1) : fy;
      return `${yr}-${String(mo).padStart(2, '0')}` <= nowKey;
    });
    const comparable_revenue = comparable.reduce((s, m) => s + m.total, 0);

    return {
      fiscal_year: fy, fiscal_label: `FY${fy}`,
      total_revenue: totalDch, total_visits: totalDch, comparable_revenue,
      months, has_data: months.some(m => m.total > 0),
      total_discharges: totalDch, total_deaths: totalDeaths,
      avg_mortality: totalDch > 0 ? Math.round((totalDeaths / totalDch) * 100 * 100) / 100 : 0,
    };
  }));

  // Comparable period: only sum months that have data in latest FY (fair YoY)
  const latestFY = fyData[fyData.length - 1];
  const comparableIdx = (latestFY?.months || []).map((m, i) => m.total > 0 ? i : -1).filter(i => i >= 0);
  for (const fy of fyData) {
    let compRev = 0;
    for (const i of comparableIdx) compRev += fy.months[i]?.total || 0;
    fy.comparable_revenue = compRev;
    fy.total_visits = fy.total_discharges;
    fy.comparable_months = comparableIdx.length;
  }

  return {
    data_source: 'HOSxP XE · ipt (discharge)',
    fiscal_years: fyData,
    value_unit: 'discharges',
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ Quality Revenue Fiscal — IPD discharges + mortality (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('qualRevFiscal', 3600000, async (req) => {
    const { getFiscalConfig, buildFiscalResult } = await import('../helpers/fiscal.js');
    const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(req?.query?.start, req?.query?.end);

    const rows = await dbQueryHeavy('qualFiscalDch', 60, `
        SELECT YEAR(i.dchdate) AS yr, MONTH(i.dchdate) AS mo,
               COUNT(*) AS revenue,
               COUNT(DISTINCT i.an) AS visit_count,
               COUNT(DISTINCT i.hn) AS patient_count
        FROM ipt i
        WHERE i.dchdate BETWEEN ? AND LEAST(?, CURDATE())
          AND i.dchdate IS NOT NULL
        GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
        ORDER BY yr, mo
    `, [globalStart, globalEnd], { timeoutMs: 15000 });

    return buildFiscalResult(rows, fiscalYears, 'HOSxP XE · ipt (จำนวน Discharge)');
}));

export default router;
