// ============================================================
// BCH 360° Intelligence V.10 - AI Sepsis Early Detection Engine
// qSOFA + SIRS + SOFA Scoring — MariaDB 5.x Compatible
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import logger from '../logger.js';

// ── qSOFA (quick Sequential Organ Failure Assessment) ──
// Bedside tool: RR >= 22, SBP <= 100, altered mental status (GCS < 15)
// Score >= 2 => Sepsis suspected

export function calculateQSOFA(vitals) {
  let score = 0;
  const components = {
    respiratory_rate: { value: vitals.rr || null, met: false, criterion: '>= 22/min' },
    systolic_bp: { value: vitals.sbp || vitals.bps || null, met: false, criterion: '<= 100 mmHg' },
    mental_status: { value: vitals.gcs || null, met: false, criterion: 'GCS < 15' },
  };

  if (vitals.rr && vitals.rr >= 22) {
    score++;
    components.respiratory_rate.met = true;
  }

  const sbp = vitals.sbp || vitals.bps;
  if (sbp && sbp > 0 && sbp <= 100) {
    score++;
    components.systolic_bp.met = true;
  }

  if (vitals.gcs && vitals.gcs < 15) {
    score++;
    components.mental_status.met = true;
  }

  return {
    score,
    max_score: 3,
    suspected: score >= 2,
    components,
    interpretation: score >= 2
      ? 'Sepsis suspected — further organ dysfunction assessment recommended'
      : score === 1
        ? 'One criterion met — monitor closely'
        : 'No qSOFA criteria met',
  };
}

// ── SIRS (Systemic Inflammatory Response Syndrome) ──
// Temp > 38 or < 36, HR > 90, RR > 20, WBC > 12000 or < 4000
// >= 2 criteria + suspected infection => Sepsis (SIRS-based definition)

export function calculateSIRS(vitals, labs) {
  let criteria = 0;
  const components = {
    temperature: {
      value: vitals.temperature || vitals.temp || null,
      met: false,
      criterion: '> 38.0 or < 36.0',
    },
    heart_rate: {
      value: vitals.pulse || vitals.hr || null,
      met: false,
      criterion: '> 90/min',
    },
    respiratory_rate: {
      value: vitals.rr || null,
      met: false,
      criterion: '> 20/min',
    },
    wbc: {
      value: labs?.wbc || null,
      met: false,
      criterion: '> 12,000 or < 4,000',
    },
  };

  const temp = vitals.temperature || vitals.temp;
  if (temp && (temp > 38.0 || temp < 36.0)) {
    criteria++;
    components.temperature.met = true;
  }

  const hr = vitals.pulse || vitals.hr;
  if (hr && hr > 90) {
    criteria++;
    components.heart_rate.met = true;
  }

  if (vitals.rr && vitals.rr > 20) {
    criteria++;
    components.respiratory_rate.met = true;
  }

  if (labs?.wbc && (labs.wbc > 12000 || labs.wbc < 4000)) {
    criteria++;
    components.wbc.met = true;
  }

  return {
    criteria,
    max_criteria: 4,
    met: criteria >= 2,
    components,
    interpretation: criteria >= 2
      ? 'SIRS criteria met — evaluate for infection source'
      : 'SIRS criteria not met',
  };
}

// ── SOFA Score Components ──
// Each component 0-4, Total 0-24
// Increase >= 2 from baseline => organ dysfunction (Sepsis-3 definition)

export function calculateSOFA(vitals, labs) {
  const components = {};
  let total = 0;
  let available = 0;

  // Respiratory: PaO2/FiO2 ratio — often not available, use SpO2 proxy
  const spo2 = vitals.o2sat || vitals.spo2;
  if (spo2 && spo2 > 0) {
    let respScore = 0;
    // SpO2-based proxy (approximate PaO2/FiO2 mapping)
    if (spo2 < 67) respScore = 4;       // ~ PF < 100
    else if (spo2 < 82) respScore = 3;  // ~ PF 100-199
    else if (spo2 < 92) respScore = 2;  // ~ PF 200-299
    else if (spo2 < 96) respScore = 1;  // ~ PF 300-399
    else respScore = 0;                  // ~ PF >= 400
    components.respiratory = { value: spo2, score: respScore, unit: 'SpO2 %', proxy: true };
    total += respScore;
    available++;
  }

  // Coagulation: Platelet count
  if (labs?.platelet != null) {
    let coagScore = 0;
    const plt = Number(labs.platelet);
    if (plt < 20) coagScore = 4;
    else if (plt < 50) coagScore = 3;
    else if (plt < 100) coagScore = 2;
    else if (plt < 150) coagScore = 1;
    else coagScore = 0;
    components.coagulation = { value: plt, score: coagScore, unit: 'x10^3/uL' };
    total += coagScore;
    available++;
  }

  // Liver: Bilirubin
  if (labs?.bilirubin != null) {
    let liverScore = 0;
    const bili = Number(labs.bilirubin);
    if (bili >= 12.0) liverScore = 4;
    else if (bili >= 6.0) liverScore = 3;
    else if (bili >= 2.0) liverScore = 2;
    else if (bili >= 1.2) liverScore = 1;
    else liverScore = 0;
    components.liver = { value: bili, score: liverScore, unit: 'mg/dL' };
    total += liverScore;
    available++;
  }

  // Cardiovascular: MAP
  const sbp = vitals.sbp || vitals.bps;
  const dbp = vitals.dbp || vitals.bpd;
  if (sbp && dbp && sbp > 0 && dbp > 0) {
    const map = Math.round((sbp + 2 * dbp) / 3);
    let cvScore = 0;
    // Without vasopressor data, use MAP only
    if (map < 70) cvScore = 1;
    components.cardiovascular = { value: map, score: cvScore, unit: 'mmHg (MAP)' };
    total += cvScore;
    available++;
  }

  // Neurological: GCS
  if (vitals.gcs != null) {
    let neuroScore = 0;
    const gcs = Number(vitals.gcs);
    if (gcs < 6) neuroScore = 4;
    else if (gcs < 10) neuroScore = 3;
    else if (gcs < 13) neuroScore = 2;
    else if (gcs < 15) neuroScore = 1;
    else neuroScore = 0;
    components.neurological = { value: gcs, score: neuroScore, unit: 'GCS' };
    total += neuroScore;
    available++;
  }

  // Renal: Creatinine
  if (labs?.creatinine != null) {
    let renalScore = 0;
    const cr = Number(labs.creatinine);
    if (cr >= 5.0) renalScore = 4;
    else if (cr >= 3.5) renalScore = 3;
    else if (cr >= 2.0) renalScore = 2;
    else if (cr >= 1.2) renalScore = 1;
    else renalScore = 0;
    components.renal = { value: cr, score: renalScore, unit: 'mg/dL' };
    total += renalScore;
    available++;
  }

  return {
    total,
    max_possible: available * 4,
    components_available: available,
    components_total: 6,
    components,
    organ_dysfunction: total >= 2,
    interpretation: total >= 2
      ? 'Organ dysfunction detected — meets Sepsis-3 criteria if infection suspected'
      : 'No significant organ dysfunction',
  };
}

// ── Composite Sepsis Risk Assessment ──
export function assessRisk(qsofa, sirs, sofa) {
  // Risk level determination
  let level = 'LOW';
  let color = '#46de8c';
  let action = 'Routine monitoring';

  if (qsofa.score >= 2 && sofa.organ_dysfunction) {
    level = 'CRITICAL';
    color = '#f83b3b';
    action = 'Septic shock workup — Lactate, Blood cultures, Antibiotics within 1 hour';
  } else if (qsofa.score >= 2 || (sirs.met && sofa.organ_dysfunction)) {
    level = 'HIGH';
    color = '#ff6b35';
    action = 'Sepsis suspected — obtain cultures, consider antibiotics, reassess frequently';
  } else if (sirs.met || qsofa.score >= 1) {
    level = 'MODERATE';
    color = '#ffbc20';
    action = 'Monitor vital signs closely — reassess q2-4h';
  }

  const score = (qsofa.score * 3) + (sirs.criteria * 2) + (sofa.total || 0);

  return {
    level,
    color,
    action,
    composite_score: score,
    qsofa_positive: qsofa.suspected,
    sirs_positive: sirs.met,
    sofa_dysfunction: sofa.organ_dysfunction,
  };
}

// ── Get latest vitals for a patient (from opdscreen) ──
async function getPatientVitals(hn, hoursBack = 48) {
  const vitals = await dbQuery(`
    SELECT os.bps, os.bpd, os.pulse, os.rr, os.temperature, os.o2sat, os.bw,
           o.vstdate, o.vsttime
    FROM opdscreen os
    INNER JOIN ovst o ON os.vn = o.vn
    WHERE o.hn = ?
      AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      AND os.bps > 0
    ORDER BY o.vstdate DESC, o.vsttime DESC
    LIMIT 5
  `, [hn, Math.ceil(hoursBack / 24)]).catch(() => []);

  return vitals || [];
}

// ── Get sepsis-relevant lab results for a patient ──
async function getPatientSepsisLabs(hn, hoursBack = 48) {
  const labs = await dbQuery(`
    SELECT lo.lab_items_name_ref as test_name,
           lo.lab_order_result as result,
           lo.lab_items_normal_value_ref as normal_range,
           lo.abnormal_result as abnormal,
           lh.order_date, lh.order_time
    FROM lab_head lh
    INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
    WHERE lh.hn = ?
      AND lh.order_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      AND lo.lab_order_result IS NOT NULL
      AND lo.lab_order_result != ''
      AND (
        lo.lab_items_name_ref LIKE '%WBC%'
        OR lo.lab_items_name_ref LIKE '%White%'
        OR lo.lab_items_name_ref LIKE '%Platelet%'
        OR lo.lab_items_name_ref LIKE '%PLT%'
        OR lo.lab_items_name_ref LIKE '%Creatinine%'
        OR lo.lab_items_name_ref LIKE '%Bilirubin%'
        OR lo.lab_items_name_ref LIKE '%Lactate%'
        OR lo.lab_items_name_ref LIKE '%Procalcitonin%'
        OR lo.lab_items_name_ref LIKE '%PCT%'
        OR lo.lab_items_name_ref LIKE '%CRP%'
        OR lo.lab_items_name_ref LIKE '%Hemoculture%'
        OR lo.lab_items_name_ref LIKE '%Blood culture%'
        OR lo.lab_items_name_ref LIKE '%culture%'
      )
    ORDER BY lh.order_date DESC, lh.order_time DESC
  `, [hn, Math.ceil(hoursBack / 24)]).catch(() => []);

  // Parse lab results into structured object
  const parsed = {
    wbc: null,
    platelet: null,
    creatinine: null,
    bilirubin: null,
    lactate: null,
    procalcitonin: null,
    crp: null,
    blood_culture: null,
    raw: labs || [],
  };

  for (const lab of (labs || [])) {
    const name = (lab.test_name || '').toLowerCase();
    const val = parseFloat(lab.result);

    if (isNaN(val) && !name.includes('culture')) continue;

    // Take the first (most recent) value for each test
    if ((name.includes('wbc') || name.includes('white')) && parsed.wbc === null) {
      // WBC can be reported as x10^3/uL or cells/uL
      parsed.wbc = val < 100 ? val * 1000 : val;
    } else if ((name.includes('platelet') || name.includes('plt')) && parsed.platelet === null) {
      parsed.platelet = val < 1000 ? val : val / 1000; // Normalize to x10^3
    } else if (name.includes('creatinine') && parsed.creatinine === null) {
      parsed.creatinine = val;
    } else if (name.includes('bilirubin') && parsed.bilirubin === null) {
      parsed.bilirubin = val;
    } else if (name.includes('lactate') && parsed.lactate === null) {
      parsed.lactate = val;
    } else if ((name.includes('procalcitonin') || name.includes('pct')) && parsed.procalcitonin === null) {
      parsed.procalcitonin = val;
    } else if (name.includes('crp') && parsed.crp === null) {
      parsed.crp = val;
    } else if (name.includes('culture') && parsed.blood_culture === null) {
      parsed.blood_culture = {
        result: lab.result,
        date: lab.order_date,
        positive: lab.result && !lab.result.toLowerCase().includes('no growth'),
      };
    }
  }

  return parsed;
}

// ── Check for infection-related diagnoses ──
async function hasInfectionDiagnosis(hn) {
  const result = await dbQueryOne(`
    SELECT COUNT(*) as cnt
    FROM ipt i
    INNER JOIN iptdiag d ON i.an = d.an
    WHERE i.hn = ? AND i.dchdate IS NULL
      AND (
        d.icd10 LIKE 'A%' OR d.icd10 LIKE 'B%'
        OR d.icd10 BETWEEN 'J09' AND 'J189'
        OR d.icd10 BETWEEN 'N10' AND 'N129'
        OR d.icd10 BETWEEN 'K65' AND 'K659'
        OR d.icd10 BETWEEN 'L00' AND 'L089'
        OR d.icd10 = 'R572'
        OR d.icd10 LIKE 'A41%'
      )
  `, [hn]).catch(() => ({ cnt: 0 }));

  return Number(result?.cnt || 0) > 0;
}

// ── Check sepsis bundle compliance (Hour-1 Bundle) ──
async function checkBundleCompliance(hn, an) {
  // Check if key actions were done within 1 hour of sepsis identification
  const [lactateCheck, cultureCheck, antibioticCheck] = await Promise.all([
    // Lactate ordered?
    dbQueryOne(`
      SELECT lh.order_date, lh.order_time
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.hn = ?
        AND lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 2 DAY)
        AND lo.lab_items_name_ref LIKE '%Lactate%'
      ORDER BY lh.order_date DESC, lh.order_time DESC
      LIMIT 1
    `, [hn]).catch(() => null),

    // Blood culture ordered?
    dbQueryOne(`
      SELECT lh.order_date, lh.order_time
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.hn = ?
        AND lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 2 DAY)
        AND (lo.lab_items_name_ref LIKE '%culture%' OR lo.lab_items_name_ref LIKE '%Hemoculture%')
      ORDER BY lh.order_date DESC, lh.order_time DESC
      LIMIT 1
    `, [hn]).catch(() => null),

    // Antibiotic ordered? (check from opitemrece / drugitems — simplified)
    dbQueryOne(`
      SELECT oe.vstdate as order_date, oe.vsttime as order_time
      FROM opitemrece oe
      INNER JOIN drugitems di ON oe.icode = di.icode
      WHERE oe.hn = ?
        AND oe.vstdate >= DATE_SUB(CURDATE(), INTERVAL 2 DAY)
        AND (di.name LIKE '%cillin%' OR di.name LIKE '%mycin%' OR di.name LIKE '%oxacin%'
             OR di.name LIKE '%penem%' OR di.name LIKE '%cycline%' OR di.name LIKE '%azole%'
             OR di.name LIKE '%Ceftriaxone%' OR di.name LIKE '%Meropenem%'
             OR di.name LIKE '%Vancomycin%' OR di.name LIKE '%Piperacillin%')
      ORDER BY oe.vstdate DESC, oe.vsttime DESC
      LIMIT 1
    `, [hn]).catch(() => null),
  ]);

  return {
    lactate_ordered: !!lactateCheck,
    lactate_time: lactateCheck ? `${lactateCheck.order_date} ${lactateCheck.order_time || ''}`.trim() : null,
    blood_culture_ordered: !!cultureCheck,
    blood_culture_time: cultureCheck ? `${cultureCheck.order_date} ${cultureCheck.order_time || ''}`.trim() : null,
    antibiotic_ordered: !!antibioticCheck,
    antibiotic_time: antibioticCheck ? `${antibioticCheck.order_date} ${antibioticCheck.order_time || ''}`.trim() : null,
    bundle_complete: !!(lactateCheck && cultureCheck && antibioticCheck),
    items_completed: [lactateCheck, cultureCheck, antibioticCheck].filter(Boolean).length,
    items_total: 3,
  };
}

// ── Assess sepsis risk for a single patient ──
export async function assessPatientSepsisRisk(hn) {
  const [vitalsArr, labs, hasInfection] = await Promise.all([
    getPatientVitals(hn, 48),
    getPatientSepsisLabs(hn, 48),
    hasInfectionDiagnosis(hn),
  ]);

  const latestVitals = vitalsArr[0] || {};
  const vitalsInput = {
    rr: latestVitals.rr,
    sbp: latestVitals.bps,
    bps: latestVitals.bps,
    bpd: latestVitals.bpd,
    dbp: latestVitals.bpd,
    pulse: latestVitals.pulse,
    temperature: latestVitals.temperature,
    temp: latestVitals.temperature,
    o2sat: latestVitals.o2sat,
    spo2: latestVitals.o2sat,
    gcs: null, // GCS not typically in opdscreen
  };

  const qsofa = calculateQSOFA(vitalsInput);
  const sirs = calculateSIRS(vitalsInput, labs);
  const sofa = calculateSOFA(vitalsInput, labs);
  const risk = assessRisk(qsofa, sirs, sofa);

  return {
    hn,
    vitals: vitalsInput,
    vitals_recorded: latestVitals.vstdate
      ? `${latestVitals.vstdate} ${latestVitals.vsttime || ''}`.trim()
      : null,
    labs: {
      wbc: labs.wbc,
      platelet: labs.platelet,
      creatinine: labs.creatinine,
      bilirubin: labs.bilirubin,
      lactate: labs.lactate,
      procalcitonin: labs.procalcitonin,
      crp: labs.crp,
      blood_culture: labs.blood_culture,
    },
    has_infection_dx: hasInfection,
    qsofa,
    sirs,
    sofa,
    risk,
  };
}

// ── Screen all current IPD patients for sepsis risk ──
export async function screenAllIPDPatients() {
  // Step 1: Get all active IPD patients
  const patients = await dbQuery(`
    SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
       TIMESTAMPDIFF(YEAR,p.birthday,NOW()) AS age, p.sex,
       w.name AS ward, w.ward AS ward_id,
       i.regdate, DATEDIFF(NOW(),i.regdate) AS stay_days,
       d.name AS doctor
    FROM ipt i
    INNER JOIN patient p ON i.hn = p.hn
    LEFT JOIN ward w ON i.ward = w.ward
    LEFT JOIN doctor d ON i.admdoctor = d.code
    WHERE i.dchdate IS NULL
    ORDER BY i.regdate ASC
  `).catch(() => []);

  if (!patients || patients.length === 0) return { patients: [], summary: {} };

  // Step 2: Batch-fetch vitals for all patients (7-day window)
  const hnList = patients.map(p => p.hn);
  const vitalsMap = {};

  if (hnList.length > 0) {
    const placeholders = hnList.map(() => '?').join(',');
    const vitals = await dbQuery(`
      SELECT o.hn, os.bps, os.bpd, os.pulse, os.rr, os.temperature, os.o2sat, os.bw,
             o.vstdate, o.vsttime
      FROM opdscreen os
      INNER JOIN ovst o ON os.vn = o.vn
      WHERE o.hn IN (${placeholders})
        AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND os.bps > 0
      ORDER BY o.vstdate DESC, o.vsttime DESC
      LIMIT 500
    `, hnList).catch(() => []);

    if (vitals) {
      vitals.forEach(v => {
        if (!vitalsMap[v.hn]) vitalsMap[v.hn] = v;
      });
    }
  }

  // Step 3: Batch-fetch sepsis-relevant labs (7-day window)
  const labsMap = {};
  if (hnList.length > 0) {
    const placeholders = hnList.map(() => '?').join(',');
    const labs = await dbQuery(`
      SELECT lh.hn, lo.lab_items_name_ref as test_name,
             lo.lab_order_result as result,
             lo.abnormal_result as abnormal,
             lh.order_date
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.hn IN (${placeholders})
        AND lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND lo.lab_order_result IS NOT NULL AND lo.lab_order_result != ''
        AND (
          lo.lab_items_name_ref LIKE '%WBC%'
          OR lo.lab_items_name_ref LIKE '%White%'
          OR lo.lab_items_name_ref LIKE '%Platelet%'
          OR lo.lab_items_name_ref LIKE '%PLT%'
          OR lo.lab_items_name_ref LIKE '%Creatinine%'
          OR lo.lab_items_name_ref LIKE '%Bilirubin%'
          OR lo.lab_items_name_ref LIKE '%Lactate%'
        )
      ORDER BY lh.order_date DESC
      LIMIT 1000
    `, hnList).catch(() => []);

    // Parse labs per patient
    if (labs) {
      labs.forEach(lab => {
        if (!labsMap[lab.hn]) labsMap[lab.hn] = { wbc: null, platelet: null, creatinine: null, bilirubin: null };
        const name = (lab.test_name || '').toLowerCase();
        const val = parseFloat(lab.result);
        if (isNaN(val)) return;
        const m = labsMap[lab.hn];
        if ((name.includes('wbc') || name.includes('white')) && m.wbc === null) {
          m.wbc = val < 100 ? val * 1000 : val;
        } else if ((name.includes('platelet') || name.includes('plt')) && m.platelet === null) {
          m.platelet = val < 1000 ? val : val / 1000;
        } else if (name.includes('creatinine') && m.creatinine === null) {
          m.creatinine = val;
        } else if (name.includes('bilirubin') && m.bilirubin === null) {
          m.bilirubin = val;
        }
      });
    }
  }

  // Step 4: Calculate sepsis scores for each patient
  const results = patients.map(pt => {
    const v = vitalsMap[pt.hn] || {};
    const labs = labsMap[pt.hn] || {};

    const vitalsInput = {
      rr: v.rr, sbp: v.bps, bps: v.bps, bpd: v.bpd, dbp: v.bpd,
      pulse: v.pulse, temperature: v.temperature, temp: v.temperature,
      o2sat: v.o2sat, spo2: v.o2sat, gcs: null,
    };

    const qsofa = calculateQSOFA(vitalsInput);
    const sirs = calculateSIRS(vitalsInput, labs);
    const sofa = calculateSOFA(vitalsInput, labs);
    const risk = assessRisk(qsofa, sirs, sofa);

    return {
      an: pt.an, hn: pt.hn, name: pt.name,
      age: pt.age, gender: pt.sex, ward: pt.ward, ward_id: pt.ward_id,
      admission_date: pt.regdate, stay_days: pt.stay_days,
      doctor: pt.doctor,
      vitals: {
        bp: v.bps && v.bpd ? `${v.bps}/${v.bpd}` : null,
        bps: v.bps, bpd: v.bpd, pulse: v.pulse, rr: v.rr,
        temperature: v.temperature, spo2: v.o2sat,
        recorded_date: v.vstdate, recorded_time: v.vsttime,
      },
      labs: {
        wbc: labs.wbc, platelet: labs.platelet,
        creatinine: labs.creatinine, bilirubin: labs.bilirubin,
      },
      qsofa: { score: qsofa.score, suspected: qsofa.suspected },
      sirs: { criteria: sirs.criteria, met: sirs.met },
      sofa: { total: sofa.total, dysfunction: sofa.organ_dysfunction },
      risk,
    };
  });

  // Sort by risk level (CRITICAL > HIGH > MODERATE > LOW)
  const riskOrder = { CRITICAL: 0, HIGH: 1, MODERATE: 2, LOW: 3 };
  results.sort((a, b) => {
    const diff = (riskOrder[a.risk.level] ?? 9) - (riskOrder[b.risk.level] ?? 9);
    if (diff !== 0) return diff;
    return b.risk.composite_score - a.risk.composite_score;
  });

  // Summary
  const summary = {
    total_screened: results.length,
    critical: results.filter(r => r.risk.level === 'CRITICAL').length,
    high: results.filter(r => r.risk.level === 'HIGH').length,
    moderate: results.filter(r => r.risk.level === 'MODERATE').length,
    low: results.filter(r => r.risk.level === 'LOW').length,
    qsofa_positive: results.filter(r => r.qsofa.suspected).length,
    sirs_positive: results.filter(r => r.sirs.met).length,
    sofa_dysfunction: results.filter(r => r.sofa.dysfunction).length,
    no_vitals: results.filter(r => !r.vitals.bps).length,
    no_labs: results.filter(r => r.labs.wbc === null && r.labs.platelet === null).length,
  };

  // Learning capture
  try {
    const { captureLearning } = await import('./learningCapture.js');
    captureLearning('sepsis_screening', summary.critical > 0 ? 'anomaly' : 'pattern',
      `Sepsis Screening: ${summary.critical} critical, ${summary.high} high / ${summary.total_screened} patients`,
      summary, summary.critical + summary.high, 'alerts', summary.critical > 0 ? 'critical' : 'info');
  } catch { }

  return { patients: results, summary };
}

// ── Get sepsis incidence trend ──
export async function getSepsisTrend(days = 30) {
  // Use vitals-based proxy for sepsis trend (SIRS-like criteria from recent data)
  const trend = await dbQuery(`
    SELECT DATE(o.vstdate) as d,
      COUNT(DISTINCT o.hn) as screened,
      SUM(CASE WHEN os.bps <= 100 AND os.pulse > 90 AND os.temperature > 38.0 THEN 1 ELSE 0 END) as sirs_proxy,
      SUM(CASE WHEN os.bps <= 100 AND os.rr >= 22 THEN 1 ELSE 0 END) as qsofa_proxy,
      SUM(CASE WHEN os.temperature > 38.0 THEN 1 ELSE 0 END) as fever_count,
      SUM(CASE WHEN os.bps <= 90 THEN 1 ELSE 0 END) as hypotension_count
    FROM ipt i
    INNER JOIN ovst o ON i.hn = o.hn AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    INNER JOIN opdscreen os ON o.vn = os.vn
    WHERE i.dchdate IS NULL AND os.bps > 0
    GROUP BY DATE(o.vstdate)
    ORDER BY d
  `, [days]).catch(() => []);

  return (trend || []).map(t => ({
    date: t.d,
    screened: Number(t.screened || 0),
    sirs_proxy: Number(t.sirs_proxy || 0),
    qsofa_proxy: Number(t.qsofa_proxy || 0),
    fever: Number(t.fever_count || 0),
    hypotension: Number(t.hypotension_count || 0),
  }));
}

export default {
  calculateQSOFA,
  calculateSIRS,
  calculateSOFA,
  assessRisk,
  assessPatientSepsisRisk,
  screenAllIPDPatients,
  getSepsisTrend,
};
