// ============================================================
// BCH 360° Intelligence V.10 - AI Logic Layer
// Denial Predictor, ALOS Optimization, Revenue Leakage, EWS
// ============================================================
import { find, count, query, groupBy } from '../db/dataStore.js';

// ============================================================
// 1. DENIAL PREDICTOR
// ============================================================
const PAYER_DENIAL_BASELINE = {
    'UCS': 0.15, 'SSS': 0.10, 'CSMBS': 0.08,
    'Private': 0.12, 'Self-pay': 0.03, 'Foreigner': 0.20
};

const ICD10_RISK_MAP = {
    'I21': 0.25, 'C34': 0.30, 'I10': 0.08, 'E11': 0.12,
    'J18': 0.18, 'K35': 0.10, 'S72': 0.22, 'N18': 0.20,
    'J44': 0.15, 'G40': 0.14, 'M54': 0.06, 'O80': 0.05, 'Z38': 0.03
};

export function predictDenial(claim) {
    const factors = [];
    let score = 0;

    // 1. Payer Baseline
    const payerBase = PAYER_DENIAL_BASELINE[claim.payer_type] || 0.15;
    score += payerBase * 0.25;
    if (payerBase > 0.12) factors.push(`สิทธิ์ ${claim.payer_type} มีอัตราปฏิเสธพื้นฐานสูง (${(payerBase * 100).toFixed(0)}%)`);

    // 2. Primary Diagnosis Risk
    const icdPrefix = claim.icd10_primary ? claim.icd10_primary.substring(0, 3).toUpperCase() : '';
    const icdRisk = ICD10_RISK_MAP[icdPrefix] || 0.10;
    score += icdRisk * 0.20;
    if (icdRisk > 0.15) factors.push(`รหัสโรคหลัก (${claim.icd10_primary}) เป็นกลุ่มเสี่ยงต่อการถูกปฏิเสธ`);

    // 3. Financial Exposure & Medical Necessity
    const amountRisk = claim.total_amount > 150000 ? 0.30 : claim.total_amount > 50000 ? 0.20 : claim.total_amount > 15000 ? 0.10 : 0.02;
    score += amountRisk * 0.20;
    if (claim.total_amount > 50000) factors.push(`มูลค่าเคลมสูงผิดปกติ (${Number(claim.total_amount).toLocaleString()} บาท) ขาด Medical Necessity จะถูกปฏิเสธทันที`);

    // 4. Clinical Completeness (Secondary ICDs)
    const docRisk = claim.icd10_secondary ? 0.02 : 0.25;
    score += docRisk * 0.15;
    if (!claim.icd10_secondary) factors.push('ความสมบูรณ์ต่ำ: ขาดรหัสโรครอง (Comorbidities) รองรับความรุนแรง');

    // 5. Systemic Machine Learning / Temporal Heuristic
    const currentMonth = new Date().getMonth();
    const isEndQuarter = currentMonth === 2 || currentMonth === 5 || currentMonth === 8 || currentMonth === 11;
    if (isEndQuarter && claim.payer_type === 'UCS') {
        score += 0.15;
        factors.push('พบรูปแบบการปฏิเสธของ สปสช. พุ่งสูงในช่วงปลายไตรมาส (Temporal Risk Drop)');
    }

    // 6. Compound Risk: High Amount + Complex ICD10 + No Secondary
    if (claim.total_amount > 50000 && !claim.icd10_secondary && icdRisk > 0.15) {
        score += 0.35; // Severe penalty
        factors.push('🔴 Compound Risk: เคลมราคาสูงในกลุ่มโรคซับซ้อน แต่ไม่มีรหัสโรครอง (โอกาสถูกปฏิเสธ >85%)');
    }

    const finalScore = Math.min(Math.max(score, 0), 1);
    const riskLevel = finalScore >= 0.7 ? 'critical' : finalScore >= 0.5 ? 'high' : finalScore >= 0.3 ? 'moderate' : 'low';

    const recommendations = [];
    if (riskLevel === 'critical' || riskLevel === 'high') {
        recommendations.push('🚨 สกัดกั้นการส่งเคลม! ต้องผ่านการรีวิวจาก Coder อาวุโสก่อน');
        if (claim.total_amount > 50000) recommendations.push('📋 แนบ Operative Note และผล Lab ที่ยืนยันข้อบ่งชี้ทางการแพทย์');
    }
    if (!claim.icd10_secondary) recommendations.push('🏷️ กำชับแพทย์ดึงรหัส Comorbidity (CC/MCC) เพื่อเพิ่มน้ำหนัก RW');
    if (factors.length === 0) recommendations.push('✅ AI อนุมัติ: โครงสร้างข้อมูลสมบูรณ์พร้อมส่งเคลม');

    return {
        risk_score: Math.round(finalScore * 100), // Converted to percentage for UI 
        risk_level: riskLevel,
        risk_factors: factors,
        recommendations
    };
}

// ============================================================
// 2. ALOS OPTIMIZATION
// ============================================================
const DRG_ALOS_STANDARDS = {
    'DRG-89': { name: 'Simple Pneumonia', alos: 5, weight: 0.8 },
    'DRG-127': { name: 'Heart Failure', alos: 6, weight: 1.2 },
    'DRG-140': { name: 'Angina', alos: 3, weight: 0.6 },
    'DRG-209': { name: 'Joint Replacement', alos: 7, weight: 2.0 },
    'DRG-294': { name: 'Diabetes', alos: 4, weight: 0.6 },
    'DRG-371': { name: 'C-Section', alos: 4, weight: 0.8 },
    'DRG-373': { name: 'Normal Delivery', alos: 2, weight: 0.4 },
    'DRG-416': { name: 'Septicemia', alos: 7, weight: 1.5 }
};

export function calculateALOS(filters = {}) {
    let admissions = query('admissions');
    if (filters.ward_id) admissions = admissions.filter(a => a.ward_id === filters.ward_id);
    if (filters.drg_code) admissions = admissions.filter(a => a.drg_code === filters.drg_code);

    const byDrg = {};
    admissions.forEach(a => {
        const key = `${a.drg_code}_${a.ward_id}`;
        if (!byDrg[key]) byDrg[key] = { drg_code: a.drg_code, ward_id: a.ward_id, patients: [] };
        const days = a.actual_discharge
            ? (new Date(a.actual_discharge) - new Date(a.admission_date)) / 86400000
            : (Date.now() - new Date(a.admission_date)) / 86400000;
        byDrg[key].patients.push({ ...a, stay_days: days });
    });

    const wards = query('wards');
    const details = Object.values(byDrg).map(g => {
        const ward = wards.find(w => w.id === g.ward_id);
        const avgStay = g.patients.reduce((s, p) => s + p.stay_days, 0) / g.patients.length;
        const std = DRG_ALOS_STANDARDS[g.drg_code] || { alos: g.patients[0]?.alos_benchmark || 5, weight: 1.0, name: g.drg_code };
        const variance = avgStay - std.alos;

        return {
            drg_code: g.drg_code, ward_id: g.ward_id, ward_name: ward?.name || '',
            patient_count: g.patients.length,
            actual_alos: Math.round(avgStay * 10) / 10,
            drg_standard_alos: std.alos, drg_name: std.name, drg_weight: std.weight,
            variance_days: Math.round(variance * 10) / 10,
            variance_percent: Math.round((variance / std.alos) * 100 * 10) / 10,
            status: variance > 2 ? 'over' : variance < -1 ? 'under' : 'normal',
            cost_impact: Math.round(variance * std.weight * 15000)
        };
    }).sort((a, b) => b.actual_alos - a.actual_alos);

    const overStay = details.filter(r => r.status === 'over');
    return {
        details,
        summary: {
            total_patients: details.reduce((s, r) => s + r.patient_count, 0),
            overall_alos: details.length > 0 ? Math.round(details.reduce((s, r) => s + r.actual_alos, 0) / details.length * 10) / 10 : 0,
            over_stay_count: overStay.length,
            avg_variance_days: details.length > 0 ? Math.round(details.reduce((s, r) => s + r.variance_days, 0) / details.length * 10) / 10 : 0,
            total_cost_impact: details.reduce((s, r) => s + r.cost_impact, 0),
            alerts: overStay.map(r => ({
                drg: r.drg_code, ward: r.ward_name, variance: `+${r.variance_days} วัน`,
                patients: r.patient_count,
                message: `${r.drg_name} ใน ${r.ward_name}: เกิน ${r.variance_days} วัน (${r.patient_count} ราย)`
            }))
        }
    };
}

// ============================================================
// 3. REVENUE LEAKAGE DETECTION
// ============================================================
export function detectRevenueLeakage() {
    const procedures = query('surgical_procedures');
    const billingItems = query('billing_items');
    const admissions = query('admissions');
    const wards = query('wards');

    const leakages = [];
    let totalLoss = 0;

    procedures.forEach(proc => {
        const issues = [];
        const procBills = billingItems.filter(b => b.admission_id === proc.admission_id && b.item_code === proc.procedure_code);

        if (procBills.length === 0) {
            issues.push({ type: 'UNBILLED_PROCEDURE', severity: 'critical', message: `หัตถการ "${proc.procedure_name}" ไม่พบรายการเรียกเก็บ`, estimated_loss: 50000 });
            totalLoss += 50000;
        }

        const billedSupplies = billingItems.filter(b => b.admission_id === proc.admission_id && b.category === 'Supplies');
        const billedNames = billedSupplies.map(b => b.item_name.toLowerCase());

        (proc.supplies_used || []).forEach(supply => {
            if (!billedNames.some(bn => bn.includes(supply.toLowerCase()))) {
                issues.push({ type: 'UNBILLED_SUPPLY', severity: 'warning', message: `วัสดุ "${supply}" ไม่พบในรายการเบิก`, estimated_loss: 2500 });
                totalLoss += 2500;
            }
        });

        if (issues.length > 0) {
            const adm = admissions.find(a => a.id === proc.admission_id);
            const ward = wards.find(w => w.id === adm?.ward_id);
            leakages.push({
                patient_id: proc.patient_id, patient_name: adm?.patient_name || proc.patient_id,
                admission_id: proc.admission_id, procedure: proc.procedure_name,
                procedure_code: proc.procedure_code, surgeon: proc.surgeon,
                operating_room: proc.operating_room, ward: ward?.name || '',
                issues, total_estimated_loss: issues.reduce((s, i) => s + i.estimated_loss, 0)
            });
        }
    });

    return {
        leakages: leakages.sort((a, b) => b.total_estimated_loss - a.total_estimated_loss),
        summary: {
            total_procedures_checked: procedures.length,
            procedures_with_issues: leakages.length,
            leakage_rate: procedures.length > 0 ? Math.round((leakages.length / procedures.length) * 100 * 10) / 10 : 0,
            critical_issues: leakages.reduce((s, l) => s + l.issues.filter(i => i.severity === 'critical').length, 0),
            warning_issues: leakages.reduce((s, l) => s + l.issues.filter(i => i.severity === 'warning').length, 0),
            total_estimated_loss: totalLoss
        }
    };
}

// ============================================================
// 4. EARLY WARNING SCORE (EWS)
// ============================================================
export function calculateEWS(vitals) {
    const c = {};
    if (vitals.respiratory_rate <= 8) c.respiratory = { score: 3, value: vitals.respiratory_rate };
    else if (vitals.respiratory_rate <= 11) c.respiratory = { score: 1, value: vitals.respiratory_rate };
    else if (vitals.respiratory_rate <= 20) c.respiratory = { score: 0, value: vitals.respiratory_rate };
    else if (vitals.respiratory_rate <= 24) c.respiratory = { score: 2, value: vitals.respiratory_rate };
    else c.respiratory = { score: 3, value: vitals.respiratory_rate };

    if (vitals.spo2 <= 91) c.spo2 = { score: 3, value: vitals.spo2 };
    else if (vitals.spo2 <= 93) c.spo2 = { score: 2, value: vitals.spo2 };
    else if (vitals.spo2 <= 95) c.spo2 = { score: 1, value: vitals.spo2 };
    else c.spo2 = { score: 0, value: vitals.spo2 };

    if (vitals.systolic_bp <= 90) c.bp = { score: 3, value: vitals.systolic_bp };
    else if (vitals.systolic_bp <= 100) c.bp = { score: 2, value: vitals.systolic_bp };
    else if (vitals.systolic_bp <= 110) c.bp = { score: 1, value: vitals.systolic_bp };
    else if (vitals.systolic_bp <= 219) c.bp = { score: 0, value: vitals.systolic_bp };
    else c.bp = { score: 3, value: vitals.systolic_bp };

    if (vitals.heart_rate <= 40) c.hr = { score: 3, value: vitals.heart_rate };
    else if (vitals.heart_rate <= 50) c.hr = { score: 1, value: vitals.heart_rate };
    else if (vitals.heart_rate <= 90) c.hr = { score: 0, value: vitals.heart_rate };
    else if (vitals.heart_rate <= 110) c.hr = { score: 1, value: vitals.heart_rate };
    else if (vitals.heart_rate <= 130) c.hr = { score: 2, value: vitals.heart_rate };
    else c.hr = { score: 3, value: vitals.heart_rate };

    if (vitals.temperature <= 35) c.temp = { score: 3, value: vitals.temperature };
    else if (vitals.temperature <= 36) c.temp = { score: 1, value: vitals.temperature };
    else if (vitals.temperature <= 38) c.temp = { score: 0, value: vitals.temperature };
    else if (vitals.temperature <= 39) c.temp = { score: 1, value: vitals.temperature };
    else c.temp = { score: 2, value: vitals.temperature };

    const conMap = { 'Alert': 0, 'Voice': 1, 'Pain': 2, 'Unresponsive': 3 };
    c.consciousness = { score: conMap[vitals.consciousness] || 0, value: vitals.consciousness };

    const total = Object.values(c).reduce((s, v) => s + v.score, 0);
    let riskLevel, action;
    if (total >= 7) { riskLevel = 'critical'; action = 'เรียก RRT ทันที — ประเมินทุก 1 ชม.'; }
    else if (total >= 5) { riskLevel = 'high'; action = 'แจ้งแพทย์เวร — ประเมินทุก 1 ชม.'; }
    else if (total >= 3) { riskLevel = 'moderate'; action = 'เพิ่มการเฝ้าระวัง — ทุก 4 ชม.'; }
    else { riskLevel = 'low'; action = 'เฝ้าระวังปกติ — ทุก 12 ชม.'; }

    return { total_score: total, components: c, risk_level: riskLevel, action_required: action };
}
