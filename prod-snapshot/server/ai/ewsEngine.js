// ============================================================
// BCH 360° Intelligence V.10 - AI EWS Engine
// NEWS2 — MariaDB 5.x Compatible, Performance Optimized
// ============================================================
import { dbQuery } from '../db/mysql.js';

function scoreRR(rr) {
    if (!rr || rr <= 0) return { score: 0, flag: false };
    if (rr <= 8) return { score: 3, flag: true };
    if (rr <= 11) return { score: 1, flag: false };
    if (rr <= 20) return { score: 0, flag: false };
    if (rr <= 24) return { score: 2, flag: false };
    return { score: 3, flag: true };
}
function scoreSpO2(spo2) {
    if (!spo2 || spo2 <= 0) return { score: 0, flag: false };
    if (spo2 <= 91) return { score: 3, flag: true };
    if (spo2 <= 93) return { score: 2, flag: true };
    if (spo2 <= 95) return { score: 1, flag: false };
    return { score: 0, flag: false };
}
function scoreSBP(sbp) {
    if (!sbp || sbp <= 0) return { score: 0, flag: false };
    if (sbp <= 90) return { score: 3, flag: true };
    if (sbp <= 100) return { score: 2, flag: true };
    if (sbp <= 110) return { score: 1, flag: false };
    if (sbp <= 219) return { score: 0, flag: false };
    return { score: 3, flag: true };
}
function scorePulse(hr) {
    if (!hr || hr <= 0) return { score: 0, flag: false };
    if (hr <= 40) return { score: 3, flag: true };
    if (hr <= 50) return { score: 1, flag: false };
    if (hr <= 90) return { score: 0, flag: false };
    if (hr <= 110) return { score: 1, flag: false };
    if (hr <= 130) return { score: 2, flag: false };
    return { score: 3, flag: true };
}
function scoreTemp(temp) {
    if (!temp || temp <= 0) return { score: 0, flag: false };
    if (temp <= 35.0) return { score: 3, flag: true };
    if (temp <= 36.0) return { score: 1, flag: false };
    if (temp <= 38.0) return { score: 0, flag: false };
    if (temp <= 39.0) return { score: 1, flag: false };
    return { score: 2, flag: true };
}

export function calculateNEWS2(vitals) {
    const rr = scoreRR(vitals.rr);
    const spo2 = scoreSpO2(vitals.o2sat || vitals.spo2);
    const sbp = scoreSBP(vitals.bps || vitals.systolic_bp);
    const pulse = scorePulse(vitals.pulse || vitals.heart_rate);
    const temp = scoreTemp(vitals.temperature || vitals.temp);
    const totalScore = rr.score + spo2.score + sbp.score + pulse.score + temp.score;
    const hasRedFlag = rr.flag || spo2.flag || sbp.flag || pulse.flag || temp.flag;

    let riskLevel, action, color;
    if (totalScore >= 7) {
        riskLevel = 'critical'; action = '🚨 เรียก RRT ทันที — ส่ง ICU'; color = '#f83b3b';
    } else if (totalScore >= 5 || (totalScore >= 3 && hasRedFlag)) {
        riskLevel = 'high'; action = '⚠️ แจ้งแพทย์เวร — ประเมินทุก 1 ชม.'; color = '#ff6b35';
    } else if (totalScore >= 3) {
        riskLevel = 'medium'; action = '📋 ประเมินทุก 4 ชม.'; color = '#ffbc20';
    } else {
        riskLevel = 'low'; action = '✅ Routine monitoring'; color = '#46de8c';
    }

    return {
        total_score: totalScore, risk_level: riskLevel, action, color,
        has_red_flag: hasRedFlag,
        breakdown: {
            respiratory_rate: { value: vitals.rr, score: rr.score, flag: rr.flag },
            spo2: { value: vitals.o2sat || vitals.spo2, score: spo2.score, flag: spo2.flag },
            systolic_bp: { value: vitals.bps || vitals.systolic_bp, score: sbp.score, flag: sbp.flag },
            pulse: { value: vitals.pulse || vitals.heart_rate, score: pulse.score, flag: pulse.flag },
            temperature: { value: vitals.temperature || vitals.temp, score: temp.score, flag: temp.flag }
        }
    };
}

/**
 * ดึงผู้ป่วย IPD + vital signs ล่าสุด
 * 2-step approach เพื่อประสิทธิภาพ (ไม่ scan 8.7M rows)
 */
export async function getIPDPatientsEWS() {
    // Step 1: ดึง active IPD patients
    const patients = await dbQuery(
        `SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
           TIMESTAMPDIFF(YEAR,p.birthday,NOW()) AS age, p.sex,
           w.name AS ward, w.ward AS ward_id,
           i.regdate, DATEDIFF(NOW(),i.regdate) AS stay_days,
           d.name AS doctor
         FROM ipt i
         INNER JOIN patient p ON i.hn = p.hn
         LEFT JOIN ward w ON i.ward = w.ward
         LEFT JOIN doctor d ON i.admdoctor = d.code
         WHERE i.dchdate IS NULL
         ORDER BY i.regdate ASC`
    );

    if (!patients || patients.length === 0) return [];

    // Step 2: ดึง vitals ล่าสุดของแต่ละ patient (batch — จำกัด 7 วัน เพื่อความเร็ว)
    const hnList = patients.map(p => p.hn);
    const vitalsMap = {};

    // Batch query — ดึง vitals ล่าสุดเฉพาะ HN ที่ต้องการ + จำกัด 7 วัน
    if (hnList.length > 0) {
        const placeholders = hnList.map(() => '?').join(',');
        const vitals = await dbQuery(
            `SELECT o.hn, os.bps, os.bpd, os.pulse, os.rr, os.temperature, os.o2sat, os.bw,
                    o.vstdate, o.vsttime
             FROM opdscreen os
             INNER JOIN ovst o ON os.vn = o.vn
             WHERE o.hn IN (${placeholders})
               AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
               AND os.bps > 0
             ORDER BY o.vstdate DESC, o.vsttime DESC
             LIMIT 500`,
            hnList
        );

        // เก็บเฉพาะ record แรก (ล่าสุด) ต่อ patient
        if (vitals) {
            vitals.forEach(v => {
                if (!vitalsMap[v.hn]) vitalsMap[v.hn] = v;
            });
        }
    }

    // Step 3: คำนวณ EWS
    const results = patients.map(pt => {
        const v = vitalsMap[pt.hn] || {};
        const ews = calculateNEWS2({
            rr: v.rr, o2sat: v.o2sat, bps: v.bps,
            pulse: v.pulse, temperature: v.temperature
        });

        return {
            an: pt.an, hn: pt.hn, name: pt.name,
            age: pt.age, gender: pt.sex, ward: pt.ward, ward_id: pt.ward_id,
            admission_date: pt.regdate, stay_days: pt.stay_days,
            doctor: pt.doctor,
            vitals: {
                bp: v.bps && v.bpd ? `${v.bps}/${v.bpd}` : null,
                bps: v.bps, bpd: v.bpd, pulse: v.pulse, rr: v.rr,
                temperature: v.temperature, spo2: v.o2sat, weight: v.bw,
                recorded_date: v.vstdate, recorded_time: v.vsttime
            },
            ews: {
                score: ews.total_score, risk_level: ews.risk_level,
                action: ews.action, color: ews.color,
                has_red_flag: ews.has_red_flag, breakdown: ews.breakdown
            }
        };
    });

    results.sort((a, b) => b.ews.score - a.ews.score);
    return results;
}

export async function getEWSSummary() {
    const patients = await getIPDPatientsEWS();
    const byRisk = { critical: [], high: [], medium: [], low: [] };
    patients.forEach(p => { if (byRisk[p.ews.risk_level]) byRisk[p.ews.risk_level].push(p); });

    const byWard = {};
    patients.forEach(p => {
        const w = p.ward || 'Unknown';
        if (!byWard[w]) byWard[w] = { ward: w, total: 0, critical: 0, high: 0, medium: 0, low: 0, totalEws: 0 };
        byWard[w].total++; byWard[w][p.ews.risk_level]++; byWard[w].totalEws += p.ews.score;
    });
    Object.values(byWard).forEach(w => {
        w.avg_ews = w.total > 0 ? Math.round(w.totalEws / w.total * 10) / 10 : 0;
        delete w.totalEws;
    });

    const critLen = byRisk.critical.length, highLen = byRisk.high.length;

    // Learning capture
    try {
        const { captureLearning } = await import('./learningCapture.js');
        captureLearning('ews', critLen > 0 ? 'anomaly' : 'pattern',
            `NEWS2 EWS: ${critLen} critical, ${highLen} high / ${patients.length} patients`,
            { critical: critLen, high: highLen, total: patients.length }, critLen, 'alerts', critLen > 0 ? 'critical' : 'info');
    } catch { }

    return {
        total_patients: patients.length,
        critical: critLen, high: highLen,
        medium: byRisk.medium.length, low: byRisk.low.length,
        avg_ews: patients.length > 0 ? Math.round(patients.reduce((s, p) => s + p.ews.score, 0) / patients.length * 10) / 10 : 0,
        alerts: byRisk.critical.concat(byRisk.high).slice(0, 10),
        by_ward: Object.values(byWard).sort((a, b) => b.avg_ews - a.avg_ews),
        patients
    };
}

export default { calculateNEWS2, getIPDPatientsEWS, getEWSSummary };
