// ============================================================
// BCH 360° Intelligence V.10 - AI Module #15
// 🫀 NCD Risk Stratification Engine
// Algorithm: Multi-factor Weighted Scoring (Lab + BP + Compliance)
// Data: ovst + ovstdiag + opdscreen + lab_head/lab_order
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import logger from '../logger.js';
import { getNcdCal } from './calibration.js';

const NCD_ICD_WHERE = `(od.icd10 LIKE 'E1%' OR od.icd10 LIKE 'I1%' OR od.icd10 BETWEEN 'I20' AND 'I259'
  OR od.icd10 BETWEEN 'I60' AND 'I699' OR od.icd10 BETWEEN 'J40' AND 'J479' OR od.icd10 LIKE 'N18%')`;

// Disease classification from ICD-10
function classifyDisease(icd10) {
  if (!icd10) return 'Unknown';
  if (icd10.startsWith('E1')) return 'DM';
  if (icd10.startsWith('I1')) return 'HT';
  if (icd10 >= 'I20' && icd10 <= 'I259') return 'IHD';
  if (icd10 >= 'I60' && icd10 <= 'I699') return 'Stroke';
  if (icd10 >= 'J40' && icd10 <= 'J479') return 'COPD';
  if (icd10.startsWith('N18')) return 'CKD';
  return 'Other NCD';
}

/**
 * #15 AI NCD Risk Stratification Engine
 * จัดกลุ่มผู้ป่วย NCD ตามความเสี่ยงภาวะแทรกซ้อน
 * 
 * Risk Factors & Weights:
 *   - Lab Control (HbA1c, FBS, eGFR, Lipid) — 30%
 *   - Vital Signs (BP trend, BMI proxy) — 25%
 *   - Visit Compliance (regularity) — 20%
 *   - Comorbidity Load — 15%
 *   - Age & History — 10%
 */
export async function getNCDRiskStratification() {
  const start = Date.now();

  // 1. Get active NCD patients (visited in last 90 days)
  const [ncdPatients, labResults, vitalHistory, visitPattern, diseaseDistribution, controlRates] = await Promise.all([
    // Active NCD patients with demographics
    dbQueryHeavy('aiNcdPatients90d', 15, `
      SELECT DISTINCT o.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
        TIMESTAMPDIFF(YEAR, p.birthday, NOW()) as age, p.sex,
        GROUP_CONCAT(DISTINCT CASE 
          WHEN od.icd10 LIKE 'E1%' THEN 'DM'
          WHEN od.icd10 LIKE 'I1%' THEN 'HT'
          WHEN od.icd10 BETWEEN 'I20' AND 'I259' THEN 'IHD'
          WHEN od.icd10 BETWEEN 'I60' AND 'I699' THEN 'Stroke'
          WHEN od.icd10 BETWEEN 'J40' AND 'J479' THEN 'COPD'
          WHEN od.icd10 LIKE 'N18%' THEN 'CKD'
        END) as diseases,
        COUNT(DISTINCT o.vstdate) as visit_count_90d,
        MAX(o.vstdate) as last_visit,
        DATEDIFF(CURDATE(), MAX(o.vstdate)) as days_since_last,
        COUNT(DISTINCT od.icd10) as dx_count
      FROM ovst o
      INNER JOIN ovstdiag od ON o.vn = od.vn
      INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '024'
        AND ${NCD_ICD_WHERE}
      GROUP BY o.hn, p.pname, p.fname, p.lname, p.birthday, p.sex
      ORDER BY visit_count_90d ASC
      LIMIT 200
    `).catch(() => []),

    // Lab results (HbA1c, FBS, Cr, eGFR, Cholesterol) — latest per patient
    dbQueryHeavy('aiNcdLabs', 15, `
      SELECT h.hn, i.lab_items_name_ref as lab_name, i.lab_order_result as result, h.order_date
      FROM lab_head h
      JOIN lab_order i ON h.lab_order_number = i.lab_order_number
      WHERE h.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND (
          i.lab_items_name_ref LIKE '%HbA1c%'
          OR i.lab_items_name_ref LIKE '%FBS%'
          OR i.lab_items_name_ref LIKE '%Fasting%'
          OR i.lab_items_name_ref LIKE '%Cr%'
          OR i.lab_items_name_ref LIKE '%eGFR%'
          OR i.lab_items_name_ref LIKE '%Cholesterol%'
          OR i.lab_items_name_ref LIKE '%LDL%'
          OR i.lab_items_name_ref LIKE '%HDL%'
          OR i.lab_items_name_ref LIKE '%Trigly%'
        )
      ORDER BY h.order_date DESC
      LIMIT 2000
    `).catch(() => []),

    // Latest vitals (BP, etc.)
    dbQueryHeavy('aiNcdVitals', 15, `
      SELECT o.hn,
        AVG(op.bps) as avg_sbp, AVG(op.bpd) as avg_dbp,
        MAX(op.bps) as max_sbp,
        COUNT(*) as vital_readings
      FROM ovst o
      INNER JOIN opdscreen op ON o.vn = op.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '024'
        AND op.bps > 0 AND op.bps < 300
      GROUP BY o.hn
    `).catch(() => []),

    // Visit regularity pattern
    dbQueryHeavy('aiNcdVisitPattern', 15, `
      SELECT o.hn,
        COUNT(DISTINCT o.vstdate) as total_visits,
        MIN(o.vstdate) as first_visit,
        MAX(o.vstdate) as last_visit,
        DATEDIFF(MAX(o.vstdate), MIN(o.vstdate)) as span_days
      FROM ovst o
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND o.main_dep = '024'
      GROUP BY o.hn
    `).catch(() => []),

    // Disease distribution summary
    dbQueryHeavy('aiNcdDiseaseDist', 30, `
      SELECT 
        CASE 
          WHEN od.icd10 LIKE 'E1%' THEN 'DM'
          WHEN od.icd10 LIKE 'I1%' THEN 'HT'
          WHEN od.icd10 BETWEEN 'I20' AND 'I259' THEN 'IHD'
          WHEN od.icd10 BETWEEN 'I60' AND 'I699' THEN 'Stroke'
          WHEN od.icd10 BETWEEN 'J40' AND 'J479' THEN 'COPD'
          WHEN od.icd10 LIKE 'N18%' THEN 'CKD'
        END as disease,
        COUNT(DISTINCT o.hn) as patient_count,
        COUNT(DISTINCT o.vn) as visit_count
      FROM ovst o
      INNER JOIN ovstdiag od ON o.vn = od.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '024'
        AND ${NCD_ICD_WHERE}
      GROUP BY disease
      HAVING disease IS NOT NULL
      ORDER BY patient_count DESC
    `).catch(() => []),

    // Control rates (DM: HbA1c<7, HT: BP<140/90)
    dbQueryOneHeavy('aiNcdControlRate', 30, `
      SELECT
        COUNT(DISTINCT o.hn) as total_ncd_patients,
        SUM(CASE WHEN op.bps < 140 AND op.bpd < 90 AND op.bps > 0 THEN 1 ELSE 0 END) as bp_controlled,
        COUNT(CASE WHEN op.bps > 0 THEN 1 END) as bp_measured
      FROM ovst o
      INNER JOIN opdscreen op ON o.vn = op.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
        AND o.main_dep = '024'
        AND op.bps > 0
    `).catch(() => ({ total_ncd_patients: 0, bp_controlled: 0, bp_measured: 0 }))
  ]);

  // -------- Build lookup maps --------
  const labMap = {};
  (labResults || []).forEach(l => {
    if (!labMap[l.hn]) labMap[l.hn] = {};
    const key = l.lab_name?.toLowerCase() || '';
    const val = parseFloat(l.result);
    if (isNaN(val)) return;

    if (key.includes('hba1c') && !labMap[l.hn].hba1c) labMap[l.hn].hba1c = val;
    if ((key.includes('fbs') || key.includes('fasting')) && !labMap[l.hn].fbs) labMap[l.hn].fbs = val;
    if (key.includes('egfr') && !labMap[l.hn].egfr) labMap[l.hn].egfr = val;
    if (key.includes('cr') && !key.includes('crp') && !labMap[l.hn].cr) labMap[l.hn].cr = val;
    if (key.includes('ldl') && !labMap[l.hn].ldl) labMap[l.hn].ldl = val;
    if (key.includes('cholesterol') && !key.includes('hdl') && !labMap[l.hn].totalChol) labMap[l.hn].totalChol = val;
  });

  const vitalMap = {};
  (vitalHistory || []).forEach(v => { vitalMap[v.hn] = v; });

  const visitMap = {};
  (visitPattern || []).forEach(v => { visitMap[v.hn] = v; });

  // -------- Score each patient --------
  const scoredPatients = (ncdPatients || []).map(pt => {
    const labs = labMap[pt.hn] || {};
    const vitals = vitalMap[pt.hn] || {};
    const visits = visitMap[pt.hn] || {};

    let riskScore = 0;
    const riskFactors = [];
    const W = getNcdCal(); // calibrated weights from real outcome data

    // === Lab Control Score (0-30) ===
    let labScore = 0;
    if (labs.hba1c != null && pt.diseases?.includes('DM')) {
      if (labs.hba1c >= 9) { labScore += W.hba1c_very_high; riskFactors.push(`🔴 HbA1c สูงมาก (${labs.hba1c}%)`); }
      else if (labs.hba1c >= 7) { labScore += W.hba1c_above_target; riskFactors.push(`🟡 HbA1c ไม่ถึงเป้า (${labs.hba1c}%)`); }
    } else if (pt.diseases?.includes('DM')) {
      labScore += W.hba1c_missing; riskFactors.push('⚠️ ไม่มีผล HbA1c ใน 6 เดือน');
    }

    if (labs.egfr != null) {
      if (labs.egfr < 30) { labScore += W.egfr_very_low; riskFactors.push(`🔴 eGFR ต่ำมาก (${labs.egfr})`); }
      else if (labs.egfr < 60) { labScore += W.egfr_low; riskFactors.push(`🟡 eGFR ลดลง (${labs.egfr})`); }
    }
    if (labs.ldl != null && labs.ldl >= 160) {
      labScore += W.ldl_high; riskFactors.push(`🟡 LDL สูง (${labs.ldl})`);
    }
    riskScore += Math.min(labScore, 30);

    // === Vital Signs Score (0-25) ===
    let vitalScore = 0;
    const avgSBP = Number(vitals.avg_sbp || 0);
    const maxSBP = Number(vitals.max_sbp || 0);
    if (avgSBP >= 160) { vitalScore += W.bp_very_high; riskFactors.push(`🔴 BP เฉลี่ยสูงมาก (${Math.round(avgSBP)}/${Math.round(Number(vitals.avg_dbp || 0))})`) }
    else if (avgSBP >= 140) { vitalScore += W.bp_above_target; riskFactors.push(`🟡 BP เฉลี่ยไม่ถึงเป้า (${Math.round(avgSBP)}/${Math.round(Number(vitals.avg_dbp || 0))})`) }
    if (maxSBP >= 180) { vitalScore += W.bp_crisis; riskFactors.push(`🔴 พบ BP สูงวิกฤต (max ${maxSBP})`); }
    riskScore += Math.min(vitalScore, 25);

    // === Visit Compliance Score (0-20) ===
    let complianceScore = 0;
    const expectedVisits = pt.diseases?.includes('DM') || pt.diseases?.includes('CKD') ? W.visits_dm_ckd : W.visits_other;
    const actualVisits = Number(pt.visit_count_90d || 0);
    const compliancePct = Math.round((actualVisits / expectedVisits) * 100);

    if (actualVisits === 0) { complianceScore += W.missed_all; riskFactors.push('🔴 ขาดนัด — ไม่มาตรวจ 90 วัน'); }
    else if (compliancePct < 50) { complianceScore += W.low_compliance; riskFactors.push(`🟡 มาตรวจน้อย (${actualVisits}/${expectedVisits} ครั้ง)`); }
    else if (pt.days_since_last > 45) { complianceScore += W.overdue; riskFactors.push(`⚠️ ห่างจากนัดล่าสุด ${pt.days_since_last} วัน`); }
    riskScore += Math.min(complianceScore, 20);

    // === Comorbidity Load (0-15) ===
    const diseaseCount = (pt.diseases?.split(',') || []).length;
    let comorbidScore = 0;
    if (diseaseCount >= 4) { comorbidScore = W.comorbid_4plus; riskFactors.push(`🔴 โรคร่วมสูง (${diseaseCount} โรค)`); }
    else if (diseaseCount >= 3) { comorbidScore = W.comorbid_3; riskFactors.push(`🟡 หลายโรคร่วม (${diseaseCount} โรค)`); }
    else if (diseaseCount >= 2) { comorbidScore = W.comorbid_2; }
    riskScore += comorbidScore;

    // === Age & History (0-10) — calibrated from readmission outcomes ===
    let ageScore = 0;
    if (pt.age >= 80) { ageScore = W.age_80plus; riskFactors.push('🔴 อายุ ≥80 ปี — เสี่ยงภาวะแทรกซ้อนสูง'); }
    else if (pt.age >= 70) { ageScore = W.age_70_79; }
    else if (pt.age >= 60) { ageScore = W.age_60_69; }
    riskScore += ageScore;

    // === Classify Risk Level — calibrated thresholds ===
    const riskLevel = riskScore >= W.critical_threshold ? 'critical' : riskScore >= W.high_threshold ? 'high' : riskScore >= W.moderate_threshold ? 'moderate' : 'low';

    // === Generate Intervention Recommendations ===
    let intervention = '';
    if (riskLevel === 'critical') {
      intervention = '🚨 ส่งต่อแพทย์เฉพาะทาง + นัดติดตามภายใน 2 สัปดาห์ + Home Visit ถ้าขาดนัด';
    } else if (riskLevel === 'high') {
      intervention = '⚠️ ปรับยา/แผนการรักษา + เพิ่มความถี่นัดตรวจ + ให้ความรู้เชิงรุก';
    } else if (riskLevel === 'moderate') {
      intervention = '💡 ติดตาม Lab ซ้ำ + สอนสุขศึกษา + ตรวจ Compliance';
    } else {
      intervention = '✅ ดูแลตามมาตรฐาน NCD Clinic + นัดตรวจรอบถัดไป';
    }

    return {
      hn: pt.hn,
      name: pt.name,
      age: pt.age,
      sex: pt.sex,
      diseases: pt.diseases,
      disease_count: diseaseCount,
      risk_score: Math.min(riskScore, 100),
      risk_level: riskLevel,
      risk_factors: riskFactors.slice(0, 5),
      intervention,
      compliance: {
        visits_90d: actualVisits,
        expected_visits: expectedVisits,
        compliance_pct: Math.min(compliancePct, 100),
        days_since_last: pt.days_since_last
      },
      labs: {
        hba1c: labs.hba1c ?? null,
        fbs: labs.fbs ?? null,
        egfr: labs.egfr ?? null,
        cr: labs.cr ?? null,
        ldl: labs.ldl ?? null,
      },
      vitals: {
        avg_sbp: Math.round(avgSBP) || null,
        avg_dbp: Math.round(Number(vitals.avg_dbp || 0)) || null,
        max_sbp: maxSBP || null,
      }
    };
  }).sort((a, b) => b.risk_score - a.risk_score);

  // -------- Summary Statistics --------
  const riskGroups = { critical: 0, high: 0, moderate: 0, low: 0 };
  scoredPatients.forEach(p => riskGroups[p.risk_level]++);

  const bpControlled = Number(controlRates?.bp_controlled || 0);
  const bpMeasured = Number(controlRates?.bp_measured || 0);
  const bpControlRate = bpMeasured > 0 ? Math.round((bpControlled / bpMeasured) * 100) : 0;

  // AI Insights
  const insights = [];
  if (riskGroups.critical > 0) {
    insights.push({
      icon: '🚨', color: '#e11d48', priority: 'CRITICAL',
      text: `${riskGroups.critical} ราย ความเสี่ยงวิกฤต — ต้องได้รับการดูแลเร่งด่วน ทบทวนแผนการรักษาทั้งหมด`
    });
  }

  const lostFollowUp = scoredPatients.filter(p => p.compliance.days_since_last > 60);
  if (lostFollowUp.length > 0) {
    insights.push({
      icon: '📱', color: '#f59e0b', priority: 'OUTREACH',
      text: `${lostFollowUp.length} ราย ขาดนัดเกิน 60 วัน — แนะนำโทรติดตาม/Home Visit`
    });
  }

  if (bpControlRate < 60) {
    insights.push({
      icon: '💊', color: '#7c3aed', priority: 'QUALITY',
      text: `อัตราควบคุม BP ได้เป้า ${bpControlRate}% — ต่ำกว่าเกณฑ์ HA 60% ควรทบทวนแนวทางยาลดความดัน`
    });
  }

  const dmNoHba1c = scoredPatients.filter(p => p.diseases?.includes('DM') && p.labs.hba1c == null);
  if (dmNoHba1c.length > 5) {
    insights.push({
      icon: '🔬', color: '#0ea5e9', priority: 'LAB',
      text: `DM ${dmNoHba1c.length} ราย ยังไม่มี HbA1c 6 เดือน — แนะนำสั่ง Lab ติดตาม`
    });
  }

  logger.debug('NCD Risk Engine AI computed', { duration: Date.now() - start, patientsScored: scoredPatients.length });

  return {
    ai_module: 'NCD Risk Stratification',
    ai_version: '1.0',
    computed_at: new Date().toISOString(),
    computation_ms: Date.now() - start,

    // Summary
    summary: {
      total_patients: scoredPatients.length,
      risk_distribution: riskGroups,
      bp_control_rate: bpControlRate,
      avg_risk_score: scoredPatients.length > 0
        ? Math.round(scoredPatients.reduce((s, p) => s + p.risk_score, 0) / scoredPatients.length)
        : 0,
    },

    // Disease Distribution
    disease_distribution: (diseaseDistribution || []).map(d => ({
      disease: d.disease,
      patients: Number(d.patient_count),
      visits: Number(d.visit_count),
      color: {
        'DM': '#f59e0b', 'HT': '#e11d48', 'IHD': '#7c3aed',
        'Stroke': '#ef4444', 'COPD': '#0ea5e9', 'CKD': '#6366f1'
      }[d.disease] || '#6b7280'
    })),

    // AI Insights
    insights,

    // Top Risk Patients (first 50)
    patients: scoredPatients.slice(0, 50),
  };
}

export default { getNCDRiskStratification };
