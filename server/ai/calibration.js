// ============================================================
// BCH 360° Intelligence V.10 — AI Calibration Engine
// ข้อมูลจริงจาก HOSxP XE + Data Warehouse → tune weights
// ============================================================
// แทนที่ค่า hardcode ด้วยการ calibrate จากข้อมูลจริงของ รพ.
// รันอัตโนมัติทุก 24 ชม. + manual trigger ผ่าน API
// ============================================================
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import dw from '../db/dataWarehouse.js';
import logger from '../logger.js';

// ── Calibrated weights storage ──
// ค่าเริ่มต้น (fallback) ใช้เมื่อ calibrate ยังไม่เคยรัน
const CALIBRATED = {
  // ─── Finance ──────────────────────────────────────────────
  finance: {
    expense_ratio:     0.82,   // จะ calibrate จาก GL จริง
    rw_price:          8000,   // Global Budget per RW
    cc_rw_gain:        0.35,
    low_rw_gain:       0.40,
  },

  // ─── Denial Prediction ────────────────────────────────────
  denial: {
    payer_baselines: {
      UCS: 0.15, SSS: 0.10, CSMBS: 0.08,
      Private: 0.12, 'Self-pay': 0.03, Foreigner: 0.20,
    },
    amount_thresholds: { high: 150000, medium: 50000, low: 15000 },
  },

  // ─── Forecast (Holt-Winters) ──────────────────────────────
  forecast: {
    alpha: 0.35,           // level smoothing
    beta:  0.15,           // trend smoothing
    min_data_pct: 0.10,    // filter months below 10% of median
    confidence_decay: 0.05, // -5% per month ahead
  },

  // ─── NCD Risk Scoring ─────────────────────────────────────
  ncd: {
    // Lab (max 30 pts)
    hba1c_very_high:    12,  // HbA1c ≥9%
    hba1c_above_target:  6,  // HbA1c 7-8.9%
    hba1c_missing:       8,  // ไม่มีผล 6 เดือน
    egfr_very_low:      10,  // eGFR <30
    egfr_low:            5,  // eGFR 30-59
    ldl_high:            5,  // LDL ≥160
    // Vitals (max 25 pts)
    bp_very_high:       15,  // avg SBP ≥160
    bp_above_target:     8,  // avg SBP 140-159
    bp_crisis:          10,  // max SBP ≥180
    // Compliance (max 20 pts)
    missed_all:         20,  // 0 visits in 90d
    low_compliance:     12,  // <50% expected
    overdue:             8,  // >45 days
    // Comorbidity (max 15 pts)
    comorbid_4plus:     15,
    comorbid_3:         10,
    comorbid_2:          5,
    // Age (max 10 pts)
    age_80plus:         10,
    age_70_79:           6,
    age_60_69:           3,
    // Thresholds
    critical_threshold: 60,
    high_threshold:     40,
    moderate_threshold: 20,
    // Expected visits per 90 days
    visits_dm_ckd:       6,
    visits_other:        3,
  },

  // ─── OPD Flow Prediction ──────────────────────────────────
  opd: {
    nurse_ratio:            15,   // patients per nurse
    doctor_ratio:            8,   // patients per doctor
    surge_critical:       1.25,   // 125% = critical
    surge_elevated:       1.10,   // 110% = elevated
    underutilized:        0.80,   // 80%  = low volume
    historical_window_days: 30,
  },

  // ─── Wait Time SLA ────────────────────────────────────────
  wait_time: {
    sla_step1_min: 10,  // registration → screen
    sla_step2_min: 20,  // screen → doctor
    sla_step3_min: 15,  // doctor → pharmacy
    sla_step4_min: 10,  // pharmacy → finance
    sla_total_min: 60,
  },

  // ─── Quality (QPI) ────────────────────────────────────────
  quality: {
    readmit_weight:  0.28,
    mortality_weight: 0.28,
    ama_weight:      0.16,
    hai_weight:      0.16,
    dch_plan_weight: 0.12,
  },

  // ─── Metadata ─────────────────────────────────────────────
  _meta: {
    last_calibrated: null,
    calibration_source: 'defaults',
    data_period: null,
    next_calibration: null,
  },
};

// ── Public getters ──
export function getCalibrated()       { return CALIBRATED; }
export function getFinanceCal()       { return CALIBRATED.finance; }
export function getDenialCal()        { return CALIBRATED.denial; }
export function getForecastCal()      { return CALIBRATED.forecast; }
export function getNcdCal()           { return CALIBRATED.ncd; }
export function getOpdCal()           { return CALIBRATED.opd; }
export function getWaitTimeCal()      { return CALIBRATED.wait_time; }
export function getQualityCal()       { return CALIBRATED.quality; }
export function getCalibrationMeta()  { return CALIBRATED._meta; }

// ============================================================
// CALIBRATION FUNCTIONS — ดึงข้อมูลจริงจาก HOSxP XE
// ============================================================

/**
 * 1. Calibrate EXPENSE_RATIO จากรายได้/ค่าใช้จ่ายจริง 12 เดือน
 *    หาจาก income vs paid amount ใน vn_stat
 */
async function calibrateExpenseRatio() {
  try {
    const row = await dbQueryOne(`
      SELECT
        SUM(income) AS total_income,
        SUM(paid_money) AS total_paid,
        SUM(income) - SUM(paid_money) AS total_profit
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        AND vstdate < CURDATE()
        AND income > 0
    `, [], { timeoutMs: 15000 });

    if (row?.total_income > 0 && row?.total_paid > 0) {
      // expense_ratio = 1 - (profit / income)
      const ratio = Math.round((1 - (row.total_profit / row.total_income)) * 100) / 100;
      // Clamp between 0.5 and 0.98 for safety
      CALIBRATED.finance.expense_ratio = Math.min(0.98, Math.max(0.5, ratio));
      return { expense_ratio: CALIBRATED.finance.expense_ratio, income: row.total_income, paid: row.total_paid };
    }
  } catch (e) {
    logger.warn('Calibration: expense_ratio failed', { error: e.message });
  }
  return null;
}

/**
 * 2. Calibrate DENIAL BASELINES จาก claims จริง
 *    นับ claims ที่ถูก reject/deny ต่อสิทธิ์
 */
async function calibrateDenialBaselines() {
  try {
    const rows = await dbQuery(`
      SELECT
        pt.name AS payer_type,
        COUNT(*) AS total_claims,
        SUM(CASE WHEN s.repno IS NOT NULL OR s.s_drug_money < 0 THEN 1 ELSE 0 END) AS denied
      FROM ipt i
      JOIN ipt_pttype ip ON i.an = ip.an
      JOIN pttype pt ON ip.pttype = pt.pttype
      LEFT JOIN an_stat s ON i.an = s.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        AND i.dchdate IS NOT NULL
      GROUP BY pt.name
      HAVING total_claims >= 20
    `, [], { timeoutMs: 15000 });

    if (rows?.length > 0) {
      for (const r of rows) {
        const rate = Math.round((r.denied / r.total_claims) * 100) / 100;
        // Map known payer name patterns
        const key = _mapPayerName(r.payer_type);
        if (key) CALIBRATED.denial.payer_baselines[key] = Math.min(0.5, Math.max(0.01, rate));
      }
      return { payers_calibrated: rows.length, baselines: { ...CALIBRATED.denial.payer_baselines } };
    }
  } catch (e) {
    logger.warn('Calibration: denial baselines failed', { error: e.message });
  }
  return null;
}

function _mapPayerName(name) {
  if (!name) return null;
  const n = name.toLowerCase();
  if (n.includes('สิทธิ์ บัตรทอง') || n.includes('uc') || n.includes('สปสช')) return 'UCS';
  if (n.includes('ประกันสังคม') || n.includes('sss')) return 'SSS';
  if (n.includes('ข้าราชการ') || n.includes('csmbs') || n.includes('กรมบัญชีกลาง')) return 'CSMBS';
  if (n.includes('ชำระเงินเอง') || n.includes('self')) return 'Self-pay';
  if (n.includes('ประกันเอกชน') || n.includes('private')) return 'Private';
  if (n.includes('ต่างชาติ') || n.includes('foreign')) return 'Foreigner';
  return null;
}

/**
 * 3. Calibrate DENIAL amount thresholds จาก percentiles ของ claim value
 */
async function calibrateDenialAmounts() {
  try {
    const rows = await dbQuery(`
      SELECT income
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        AND income > 0
      ORDER BY income
    `, [], { timeoutMs: 15000 });

    if (rows?.length >= 100) {
      const incomes = rows.map(r => Number(r.income));
      const p75 = incomes[Math.floor(incomes.length * 0.75)];
      const p90 = incomes[Math.floor(incomes.length * 0.90)];
      const p95 = incomes[Math.floor(incomes.length * 0.95)];

      CALIBRATED.denial.amount_thresholds = {
        low:    Math.round(p75),     // 75th percentile
        medium: Math.round(p90),     // 90th percentile
        high:   Math.round(p95),     // 95th percentile
      };
      return { ...CALIBRATED.denial.amount_thresholds, sample_size: incomes.length };
    }
  } catch (e) {
    logger.warn('Calibration: denial amounts failed', { error: e.message });
  }
  return null;
}

/**
 * 4. Calibrate Holt-Winters alpha/beta via backtesting
 *    ทดสอบหลาย alpha/beta → เลือกค่าที่ MAPE ต่ำสุด
 */
async function calibrateForecastParams() {
  try {
    const rows = await dbQuery(`
      SELECT YEAR(vstdate) AS yr, MONTH(vstdate) AS mo,
             SUM(income) AS revenue
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 36 MONTH)
        AND vstdate < CURDATE()
        AND income > 0
      GROUP BY YEAR(vstdate), MONTH(vstdate)
      ORDER BY yr, mo
    `, [], { timeoutMs: 20000 });

    if (!rows || rows.length < 12) return null;

    const revenues = rows.map(r => Number(r.revenue));

    // Grid search: alpha 0.1-0.5, beta 0.05-0.3
    let bestAlpha = 0.35, bestBeta = 0.15, bestMAPE = Infinity;

    for (let a = 0.10; a <= 0.50; a += 0.05) {
      for (let b = 0.05; b <= 0.30; b += 0.05) {
        const mape = _backtest(revenues, a, b);
        if (mape < bestMAPE) {
          bestMAPE = mape;
          bestAlpha = Math.round(a * 100) / 100;
          bestBeta = Math.round(b * 100) / 100;
        }
      }
    }

    CALIBRATED.forecast.alpha = bestAlpha;
    CALIBRATED.forecast.beta = bestBeta;
    return { alpha: bestAlpha, beta: bestBeta, mape_pct: Math.round(bestMAPE * 100) / 100, data_months: revenues.length };
  } catch (e) {
    logger.warn('Calibration: forecast params failed', { error: e.message });
  }
  return null;
}

// Simple Holt-Winters backtest: train on first 75%, test on last 25%
function _backtest(data, alpha, beta) {
  const split = Math.floor(data.length * 0.75);
  if (split < 3) return Infinity;

  let level = data[0];
  let trend = data.length > 1 ? data[1] - data[0] : 0;

  // Train
  for (let i = 1; i < split; i++) {
    const prevLevel = level;
    level = alpha * data[i] + (1 - alpha) * (level + trend);
    trend = beta * (level - prevLevel) + (1 - beta) * trend;
  }

  // Test
  let totalError = 0;
  let testCount = 0;
  for (let i = split; i < data.length; i++) {
    const forecast = level + trend * (i - split + 1);
    if (data[i] > 0) {
      totalError += Math.abs((data[i] - forecast) / data[i]);
      testCount++;
    }
  }

  return testCount > 0 ? (totalError / testCount) * 100 : Infinity;
}

/**
 * 5. Calibrate NCD risk weights จาก outcomes จริง
 *    ดูว่า ผู้ป่วยที่ readmit/เสียชีวิต มี risk factor อะไรบ้าง
 *    แล้วปรับ weight ให้ factor ที่ predict ได้ดีมีน้ำหนักมากขึ้น
 */
async function calibrateNCDWeights() {
  try {
    // ดึงอัตรา readmission ของ NCD patients แยกตามกลุ่ม
    const readmitByAge = await dbQuery(`
      SELECT
        CASE
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 80 THEN '80+'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 70 THEN '70-79'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN '60-69'
          ELSE '<60'
        END AS age_group,
        COUNT(DISTINCT o.hn) AS total_patients,
        SUM(CASE WHEN readmit.hn IS NOT NULL THEN 1 ELSE 0 END) AS readmitted
      FROM ovst o
      JOIN patient p ON o.hn = p.hn
      JOIN ovstdiag od ON o.vn = od.vn
      LEFT JOIN (
        SELECT DISTINCT hn
        FROM ipt
        WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      ) readmit ON o.hn = readmit.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        AND (od.icd10 LIKE 'E1%' OR od.icd10 LIKE 'I1%' OR od.icd10 LIKE 'I2%'
             OR od.icd10 LIKE 'N18%' OR od.icd10 LIKE 'J44%' OR od.icd10 LIKE 'I6%')
      GROUP BY age_group
    `, [], { timeoutMs: 20000 });

    if (readmitByAge?.length > 0) {
      // ปรับ age score ตามสัดส่วน readmission จริง
      const ageRates = {};
      for (const r of readmitByAge) {
        ageRates[r.age_group] = r.total_patients > 0 ? r.readmitted / r.total_patients : 0;
      }

      // Normalize: highest readmit rate gets max score (10), others proportional
      const maxRate = Math.max(...Object.values(ageRates), 0.01);
      if (ageRates['80+'] != null)  CALIBRATED.ncd.age_80plus = Math.round((ageRates['80+'] / maxRate) * 10);
      if (ageRates['70-79'] != null) CALIBRATED.ncd.age_70_79 = Math.round((ageRates['70-79'] / maxRate) * 10);
      if (ageRates['60-69'] != null) CALIBRATED.ncd.age_60_69 = Math.round((ageRates['60-69'] / maxRate) * 10);

      return { age_rates: ageRates, calibrated: { age_80plus: CALIBRATED.ncd.age_80plus, age_70_79: CALIBRATED.ncd.age_70_79, age_60_69: CALIBRATED.ncd.age_60_69 } };
    }
  } catch (e) {
    logger.warn('Calibration: NCD weights failed', { error: e.message });
  }
  return null;
}

/**
 * 6. Calibrate OPD staffing ratios จากข้อมูล service time จริง
 */
async function calibrateOPDRatios() {
  try {
    const row = await dbQueryOne(`
      SELECT
        COUNT(DISTINCT vn) AS total_visits,
        COUNT(DISTINCT CASE WHEN doctor != '' AND doctor IS NOT NULL THEN doctor END) AS unique_doctors,
        COUNT(DISTINCT vstdate) AS active_days
      FROM ovst
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND vstdate < CURDATE()
    `, [], { timeoutMs: 10000 });

    if (row?.total_visits > 0 && row?.unique_doctors > 0 && row?.active_days > 0) {
      const avgDailyVisits = Math.round(row.total_visits / row.active_days);
      const avgDoctors = Math.round(row.unique_doctors / row.active_days * 10) / 10;
      const actualDoctorRatio = avgDoctors > 0 ? Math.round(avgDailyVisits / avgDoctors) : 8;

      // Don't go below 5 or above 30
      CALIBRATED.opd.doctor_ratio = Math.min(30, Math.max(5, actualDoctorRatio));

      return { avg_daily_visits: avgDailyVisits, avg_doctors: avgDoctors, doctor_ratio: CALIBRATED.opd.doctor_ratio };
    }
  } catch (e) {
    logger.warn('Calibration: OPD ratios failed', { error: e.message });
  }
  return null;
}

/**
 * 7. Calibrate Wait Time SLAs จาก percentiles ของ service time จริง
 */
async function calibrateWaitTimeSLAs() {
  try {
    const rows = await dbQuery(`
      SELECT
        (TIME_TO_SEC(o.service1) - TIME_TO_SEC(o.vsttime)) / 60 AS wait_to_screen,
        (TIME_TO_SEC(o.service2) - TIME_TO_SEC(o.service1)) / 60 AS screen_to_doctor,
        (TIME_TO_SEC(o.service3) - TIME_TO_SEC(o.service2)) / 60 AS doctor_to_pharmacy,
        (TIME_TO_SEC(o.service4) - TIME_TO_SEC(o.service3)) / 60 AS pharmacy_to_finance
      FROM ovst o
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.vstdate < CURDATE()
        AND o.vsttime IS NOT NULL
        AND o.service1 IS NOT NULL
        AND (TIME_TO_SEC(o.service1) - TIME_TO_SEC(o.vsttime)) BETWEEN 0 AND 7200
      ORDER BY o.vstdate DESC
      LIMIT 5000
    `, [], { timeoutMs: 15000 });

    if (rows?.length >= 100) {
      // Use 75th percentile as SLA target (achievable by 75% of patients)
      const step1 = _safePercentile(rows.map(r => r.wait_to_screen).filter(v => v > 0 && v < 120), 0.75);
      const step2 = _safePercentile(rows.map(r => r.screen_to_doctor).filter(v => v > 0 && v < 120), 0.75);
      const step3 = _safePercentile(rows.map(r => r.doctor_to_pharmacy).filter(v => v > 0 && v < 120), 0.75);
      const step4 = _safePercentile(rows.map(r => r.pharmacy_to_finance).filter(v => v > 0 && v < 120), 0.75);

      if (step1) CALIBRATED.wait_time.sla_step1_min = Math.round(step1);
      if (step2) CALIBRATED.wait_time.sla_step2_min = Math.round(step2);
      if (step3) CALIBRATED.wait_time.sla_step3_min = Math.round(step3);
      if (step4) CALIBRATED.wait_time.sla_step4_min = Math.round(step4);
      CALIBRATED.wait_time.sla_total_min = (CALIBRATED.wait_time.sla_step1_min + CALIBRATED.wait_time.sla_step2_min + CALIBRATED.wait_time.sla_step3_min + CALIBRATED.wait_time.sla_step4_min);

      return { sample_size: rows.length, sla: { ...CALIBRATED.wait_time } };
    }
  } catch (e) {
    logger.warn('Calibration: wait time SLAs failed', { error: e.message });
  }
  return null;
}

function _safePercentile(arr, pct) {
  if (!arr || arr.length < 10) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length * pct)];
}

/**
 * 8. Calibrate Quality (QPI) weights จาก HA Thailand benchmark
 *    ดูว่า indicator ตัวไหน รพ. ทำได้แย่ → ถ่วงน้ำหนักมากขึ้น
 */
async function calibrateQualityWeights() {
  try {
    // ดึง readmit, mortality, AMA rates จริง
    const stats = await dbQueryOne(`
      SELECT
        COUNT(*) AS total_discharges,
        SUM(CASE WHEN dchtype IN ('09','9') THEN 1 ELSE 0 END) AS deaths,
        SUM(CASE WHEN dchtype IN ('04','4') THEN 1 ELSE 0 END) AS ama,
        SUM(CASE
          WHEN EXISTS (
            SELECT 1 FROM ipt i2
            WHERE i2.hn = ipt.hn AND i2.an != ipt.an
              AND i2.regdate BETWEEN ipt.dchdate AND DATE_ADD(ipt.dchdate, INTERVAL 30 DAY)
          ) THEN 1 ELSE 0
        END) AS readmits
      FROM ipt
      WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND dchdate IS NOT NULL
    `, [], { timeoutMs: 20000 });

    if (stats?.total_discharges > 50) {
      const readmitRate = stats.readmits / stats.total_discharges;
      const mortalityRate = stats.deaths / stats.total_discharges;
      const amaRate = stats.ama / stats.total_discharges;

      // HA benchmark: readmit <5%, mortality <2%, AMA <3%
      // ปรับ weight: indicator ที่แย่กว่า benchmark → weight สูงขึ้น
      const readmitDeviation = Math.max(0, readmitRate - 0.05) * 100;
      const mortalityDeviation = Math.max(0, mortalityRate - 0.02) * 100;
      const amaDeviation = Math.max(0, amaRate - 0.03) * 100;

      const totalDeviation = readmitDeviation + mortalityDeviation + amaDeviation + 0.01; // prevent div/0

      // Re-distribute 72% of weight (readmit+mortality share) proportionally to deviation
      // Keep HAI (16%) and DCH plan (12%) fixed as they need separate data sources
      const dynamicPool = 0.72;
      CALIBRATED.quality.readmit_weight = Math.round((dynamicPool * (readmitDeviation / totalDeviation + 0.33) / 1.33) * 100) / 100;
      CALIBRATED.quality.mortality_weight = Math.round((dynamicPool * (mortalityDeviation / totalDeviation + 0.33) / 1.33) * 100) / 100;
      CALIBRATED.quality.ama_weight = Math.max(0.04, Math.round((dynamicPool - CALIBRATED.quality.readmit_weight - CALIBRATED.quality.mortality_weight) * 100) / 100);

      // Ensure all weights are non-negative and normalize
      const totalW = CALIBRATED.quality.readmit_weight + CALIBRATED.quality.mortality_weight + CALIBRATED.quality.ama_weight + CALIBRATED.quality.hai_weight + CALIBRATED.quality.dch_plan_weight;
      if (totalW > 0 && Math.abs(totalW - 1.0) > 0.01) {
        CALIBRATED.quality.readmit_weight = Math.round((CALIBRATED.quality.readmit_weight / totalW) * 100) / 100;
        CALIBRATED.quality.mortality_weight = Math.round((CALIBRATED.quality.mortality_weight / totalW) * 100) / 100;
        CALIBRATED.quality.ama_weight = Math.round((CALIBRATED.quality.ama_weight / totalW) * 100) / 100;
      }

      return {
        rates: {
          readmit: Math.round(readmitRate * 10000) / 100,
          mortality: Math.round(mortalityRate * 10000) / 100,
          ama: Math.round(amaRate * 10000) / 100,
        },
        weights: { ...CALIBRATED.quality },
        total_discharges: stats.total_discharges,
      };
    }
  } catch (e) {
    logger.warn('Calibration: quality weights failed', { error: e.message });
  }
  return null;
}

// ============================================================
// MAIN CALIBRATION RUNNER
// ============================================================

/**
 * Run all calibration jobs — called on startup + every 24 hours
 * Each calibration is independent; failures don't block others
 */
export async function runFullCalibration() {
  const startTime = Date.now();
  logger.info('AI Calibration: Starting full calibration run...');

  const results = {};

  const jobs = [
    { name: 'expense_ratio',    fn: calibrateExpenseRatio },
    { name: 'denial_baselines', fn: calibrateDenialBaselines },
    { name: 'denial_amounts',   fn: calibrateDenialAmounts },
    { name: 'forecast_params',  fn: calibrateForecastParams },
    { name: 'ncd_weights',      fn: calibrateNCDWeights },
    { name: 'opd_ratios',       fn: calibrateOPDRatios },
    { name: 'wait_time_sla',    fn: calibrateWaitTimeSLAs },
    { name: 'quality_weights',  fn: calibrateQualityWeights },
  ];

  for (const job of jobs) {
    try {
      const result = await job.fn();
      results[job.name] = result ? { status: 'calibrated', data: result } : { status: 'skipped', reason: 'insufficient data' };
      if (result) logger.info(`AI Calibration: ${job.name} ✓`, { data: result });
    } catch (err) {
      results[job.name] = { status: 'error', error: err.message };
      logger.error(`AI Calibration: ${job.name} FAILED`, { error: err.message });
    }
  }

  const duration = Date.now() - startTime;

  // Update metadata
  CALIBRATED._meta = {
    last_calibrated: new Date().toISOString(),
    calibration_source: 'HOSxP XE + Data Warehouse',
    data_period: '12 months rolling',
    duration_ms: duration,
    next_calibration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    results,
  };

  const calibrated = Object.values(results).filter(r => r.status === 'calibrated').length;
  const failed = Object.values(results).filter(r => r.status === 'error').length;

  logger.info(`AI Calibration: Complete — ${calibrated} calibrated, ${failed} failed (${duration}ms)`);

  return {
    status: failed === 0 ? 'success' : calibrated > 0 ? 'partial' : 'failed',
    calibrated_count: calibrated,
    failed_count: failed,
    duration_ms: duration,
    results,
    weights: CALIBRATED,
  };
}

// ── Periodic runner ──
let _calibrationInterval = null;

export function startCalibrationEngine(intervalMs = 24 * 60 * 60 * 1000) {
  // Delay first run by 60s to let server stabilize
  setTimeout(() => {
    runFullCalibration().catch(e => logger.error('Initial calibration failed', { error: e.message }));
  }, 60_000);

  _calibrationInterval = setInterval(() => {
    runFullCalibration().catch(e => logger.error('Periodic calibration failed', { error: e.message }));
  }, intervalMs);

  logger.info('AI Calibration Engine started', { interval_hours: Math.round(intervalMs / 3600000) });
}

export function stopCalibrationEngine() {
  if (_calibrationInterval) {
    clearInterval(_calibrationInterval);
    _calibrationInterval = null;
  }
}

export default {
  getCalibrated, getFinanceCal, getDenialCal, getForecastCal,
  getNcdCal, getOpdCal, getWaitTimeCal, getQualityCal, getCalibrationMeta,
  runFullCalibration, startCalibrationEngine, stopCalibrationEngine,
};
