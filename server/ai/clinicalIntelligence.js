// ============================================================
// BCH 360° Intelligence V.10 — Clinical Intelligence Engine
// Premium AI: Sepsis · Deterioration · Labs · Fall Risk · Acuity
// สำหรับ: แพทย์ · พยาบาล · ผู้บริหาร
// ============================================================
import { dbQuery, dbQueryOne } from '../db/mysql.js';

const _cache = new Map();
function cached(key, ttlMs, fn) {
    const h = _cache.get(key);
    if (h && Date.now() - h.ts < ttlMs) return Promise.resolve(h.data);
    return fn().then(d => { _cache.set(key, { data: d, ts: Date.now() }); return d; }).catch(() => h?.data ?? []);
}

// ── Constants ──
const SIRS = { temp_hi: 38.0, temp_lo: 36.0, hr: 90, rr: 20, sbp: 90 };

// ============================================================
// 1. DOCTOR — Sepsis Screening (qSOFA + SIRS)
// ============================================================
async function detectSepsisRisk() {
    const rows = await dbQuery('ci_sepsis', 120, `
        SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
               w.name AS ward, TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) AS age,
               v.bps, v.bpd, v.pulse AS hr, v.temperature AS temp, v.rr, v.o2sat,
               v.vsttime AS vtime
        FROM ipt i
        JOIN patient p ON i.hn=p.hn JOIN ward w ON i.ward=w.ward
        LEFT JOIN (
            SELECT hn,bps,bpd,pulse,temperature,rr,o2sat,vsttime,
                   ROW_NUMBER() OVER(PARTITION BY hn ORDER BY vstdate DESC,vsttime DESC) rn
            FROM opdscreen WHERE vstdate>=DATE_SUB(CURDATE(),INTERVAL 2 DAY)
        ) v ON v.hn=i.hn AND v.rn=1
        WHERE i.dchdate IS NULL HAVING temp IS NOT NULL OR hr IS NOT NULL`);

    const alerts = [];
    for (const r of rows) {
        let sirs = 0; const flags = [];
        if (r.temp > SIRS.temp_hi) { sirs++; flags.push(`ไข้ ${r.temp}°C`); }
        if (r.temp > 0 && r.temp < SIRS.temp_lo) { sirs++; flags.push(`อุณหภูมิต่ำ ${r.temp}°C`); }
        if (r.hr > SIRS.hr) { sirs++; flags.push(`HR ${r.hr}`); }
        if (r.rr > SIRS.rr) { sirs++; flags.push(`RR ${r.rr}`); }
        if (r.bps > 0 && r.bps < SIRS.sbp) { sirs++; flags.push(`BP ${r.bps}`); }
        if (r.o2sat > 0 && r.o2sat < 92) { sirs++; flags.push(`SpO₂ ${r.o2sat}%`); }
        const qsofa = (r.bps > 0 && r.bps < 100 ? 1 : 0) + (r.rr > 22 ? 1 : 0);
        if (sirs >= 2 || qsofa >= 2) {
            alerts.push({
                an: r.an, hn: r.hn, name: r.name, ward: r.ward, age: r.age,
                sirs_score: sirs, qsofa_score: qsofa, flags,
                severity: sirs >= 3 || qsofa >= 2 ? 'critical' : 'high',
                recommendation: sirs >= 3
                    ? 'สงสัย Sepsis — Blood culture, Lactate, เริ่ม ATB ภายใน 1 ชม.'
                    : 'เฝ้าระวัง Sepsis — V/S ทุก 1 ชม., พิจารณา CBC + Blood culture'
            });
        }
    }
    return alerts.sort((a, b) => b.sirs_score - a.sirs_score);
}

// ============================================================
// 2. DOCTOR — Patient Deterioration (Vital Trend Analysis)
// ============================================================
async function analyzeDeterioration() {
    const rows = await dbQuery('ci_deteri', 120, `
        SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
               w.name AS ward, TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) AS age,
               v.bps, v.bpd, v.pulse, v.temperature, v.rr, v.o2sat, v.vstdate, v.vsttime
        FROM ipt i JOIN patient p ON i.hn=p.hn JOIN ward w ON i.ward=w.ward
        JOIN opdscreen v ON v.hn=i.hn AND v.vstdate>=DATE_SUB(CURDATE(),INTERVAL 3 DAY)
        WHERE i.dchdate IS NULL ORDER BY i.hn, v.vstdate DESC, v.vsttime DESC`);

    const byPt = {};
    for (const r of rows) {
        if (!byPt[r.hn]) byPt[r.hn] = { ...r, readings: [] };
        byPt[r.hn].readings.push(r);
    }
    const out = [];
    for (const [, pt] of Object.entries(byPt)) {
        if (pt.readings.length < 2) continue;
        const cur = pt.readings[0], prev = pt.readings[Math.min(pt.readings.length - 1, 3)];
        let sc = 0; const fl = [];
        if (cur.bps && prev.bps && cur.bps < prev.bps - 15) { sc += 2; fl.push(`BP ${prev.bps}→${cur.bps}`); }
        if (cur.pulse && prev.pulse && cur.pulse > prev.pulse + 15) { sc += 2; fl.push(`HR ${prev.pulse}→${cur.pulse}`); }
        if (cur.o2sat && prev.o2sat && cur.o2sat < prev.o2sat - 3) { sc += 2; fl.push(`SpO₂ ${prev.o2sat}→${cur.o2sat}%`); }
        if (cur.temperature && prev.temperature && cur.temperature > prev.temperature + 0.8) { sc++; fl.push(`T ${prev.temperature}→${cur.temperature}`); }
        if (cur.rr && prev.rr && cur.rr > prev.rr + 5) { sc++; fl.push(`RR ${prev.rr}→${cur.rr}`); }
        if (sc >= 2) out.push({
            an: pt.an, hn: pt.hn, name: pt.name, ward: pt.ward, age: pt.age,
            score: sc, severity: sc >= 4 ? 'critical' : sc >= 3 ? 'high' : 'medium', flags: fl,
            recommendation: sc >= 4 ? 'Deteriorating เร็ว — แจ้งแพทย์ทันที, พิจารณา ICU' : 'แนวโน้มแย่ — เพิ่ม monitoring, ทบทวนแผนรักษา'
        });
    }
    return out.sort((a, b) => b.score - a.score);
}

// ============================================================
// 3. DOCTOR — Critical Lab Alerts
// ============================================================
const CRIT_LABS = {
    potassium: { lo: 2.5, hi: 6.0, u: 'mEq/L', th: 'โพแทสเซียม' }, k: { lo: 2.5, hi: 6.0, u: 'mEq/L', th: 'K' },
    sodium: { lo: 120, hi: 155, u: 'mEq/L', th: 'โซเดียม' }, na: { lo: 120, hi: 155, u: 'mEq/L', th: 'Na' },
    glucose: { lo: 40, hi: 400, u: 'mg/dL', th: 'น้ำตาล' }, fbs: { lo: 40, hi: 400, u: 'mg/dL', th: 'FBS' },
    creatinine: { lo: 0, hi: 5.0, u: 'mg/dL', th: 'Cr' }, cr: { lo: 0, hi: 5.0, u: 'mg/dL', th: 'Cr' },
    hemoglobin: { lo: 7.0, hi: 99, u: 'g/dL', th: 'Hb' }, hb: { lo: 7.0, hi: 99, u: 'g/dL', th: 'Hb' }, hgb: { lo: 7.0, hi: 99, u: 'g/dL', th: 'Hb' },
    platelet: { lo: 50000, hi: 999999, u: '/uL', th: 'Plt' }, plt: { lo: 50000, hi: 999999, u: '/uL', th: 'Plt' },
    troponin: { lo: -1, hi: 0.04, u: 'ng/mL', th: 'Troponin' },
    lactate: { lo: -1, hi: 4.0, u: 'mmol/L', th: 'Lactate' },
    inr: { lo: 0, hi: 4.0, u: '', th: 'INR' },
};

const LAB_REC = {
    potassium: (v, r) => v > r.hi ? 'Hyperkalemia — EKG, Ca gluconate, Kayexalate' : 'Hypokalemia — IV KCl, monitor EKG',
    k: (v, r) => v > r.hi ? 'Hyperkalemia — EKG, Ca gluconate' : 'Hypokalemia — IV KCl',
    glucose: (v, r) => v > r.hi ? 'DKA/HHS — RI drip, glucose q1h, Ketone' : 'Hypoglycemia — 50% Glucose IV push',
    fbs: (v, r) => v > r.hi ? 'Hyperglycemia — RI drip, q1h' : 'Hypoglycemia — 50%Glucose IV',
    hemoglobin: () => 'Severe anemia — PRC transfusion, หาสาเหตุ', hb: () => 'Anemia — PRC, หาสาเหตุ', hgb: () => 'Anemia — PRC',
    troponin: () => 'Troponin สูง — EKG stat, Cardio consult, สงสัย ACS',
    lactate: () => 'Lactate สูง — Sepsis/Hypoperfusion, IV fluid resus',
    creatinine: () => 'AKI — U/O monitoring, Nephro consult', cr: () => 'AKI — Nephro consult',
    platelet: () => 'Thrombocytopenia — ระวัง bleeding, งด invasive', plt: () => 'Thrombocytopenia',
    inr: () => 'INR สูง — ระวัง bleeding, Vit K / FFP', sodium: () => 'Na ผิดปกติ — ตรวจสอบ', na: () => 'Na ผิดปกติ',
};

async function getCriticalLabs() {
    const rows = await dbQuery('ci_labs', 60, `
        SELECT lh.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
               lo.lab_items_name_ref AS test, lo.lab_order_result AS val,
               lo.lab_items_normal_value_ref AS nrange, lh.order_date,
               CASE WHEN i.an IS NOT NULL THEN w.name ELSE 'OPD' END AS loc
        FROM lab_head lh JOIN lab_order lo ON lh.lab_order_number=lo.lab_order_number
        JOIN patient p ON lh.hn=p.hn
        LEFT JOIN ipt i ON i.hn=lh.hn AND i.dchdate IS NULL LEFT JOIN ward w ON i.ward=w.ward
        WHERE lh.order_date>=DATE_SUB(CURDATE(),INTERVAL 1 DAY) AND lo.abnormal_result='Y' AND lo.confirm='Y'
        ORDER BY lh.order_date DESC LIMIT 100`);

    const alerts = [];
    for (const r of rows) {
        const key = (r.test || '').toLowerCase().trim();
        const num = parseFloat(r.val);
        if (isNaN(num)) continue;
        for (const [pat, range] of Object.entries(CRIT_LABS)) {
            if (key.includes(pat) && (num < range.lo || num > range.hi)) {
                const fn = LAB_REC[pat] || (() => 'แจ้งแพทย์');
                alerts.push({
                    hn: r.hn, name: r.name, location: r.loc,
                    test_name: range.th, result: `${num} ${range.u}`,
                    status: num < range.lo ? 'ต่ำวิกฤต' : 'สูงวิกฤต',
                    severity: 'critical', recommendation: fn(num, range)
                });
                break;
            }
        }
    }
    return alerts;
}

// ============================================================
// 4. NURSE — Ward Acuity & Staffing
// ============================================================
async function getWardAcuity() {
    const rows = await dbQuery('ci_acuity', 180, `
        SELECT w.ward, w.name AS ward_name, w.bedcount,
               COUNT(i.an) AS pts,
               SUM(TIMESTAMPDIFF(YEAR,p.birthday,CURDATE())>=65) AS elderly,
               SUM(TIMESTAMPDIFF(DAY,i.regdate,CURDATE())>7) AS longstay,
               SUM(TIMESTAMPDIFF(DAY,i.regdate,CURDATE())<=1) AS newadmit,
               ROUND(AVG(TIMESTAMPDIFF(DAY,i.regdate,CURDATE())),1) AS avg_los
        FROM ipt i JOIN patient p ON i.hn=p.hn JOIN ward w ON i.ward=w.ward
        WHERE i.dchdate IS NULL GROUP BY w.ward,w.name,w.bedcount HAVING pts>0 ORDER BY pts DESC`);

    return rows.map(w => {
        const occ = w.bedcount > 0 ? Math.round(w.pts / w.bedcount * 100) : 0;
        const eldPct = w.pts > 0 ? Math.round(w.elderly / w.pts * 100) : 0;
        const acuity = Math.min(100, Math.round(occ * 0.3 + eldPct * 0.25 + Math.min(w.newadmit * 10, 25) + Math.min(w.longstay * 5, 20)));
        const ratio = acuity >= 70 ? 5 : acuity >= 50 ? 6 : 8;
        const nurses = Math.ceil(w.pts / ratio);
        return {
            ward: w.ward, ward_name: w.ward_name, patient_count: w.pts,
            total_beds: w.bedcount || 0, occupancy: occ,
            elderly: w.elderly, longstay: w.longstay, new_admit: w.newadmit, avg_los: w.avg_los,
            acuity_score: acuity,
            severity: acuity >= 70 ? 'critical' : acuity >= 50 ? 'high' : acuity >= 30 ? 'medium' : 'low',
            recommended_nurses: nurses,
            recommendation: occ >= 90 && acuity >= 70
                ? `วิกฤต — เตียง ${occ}% + Acuity สูง, ต้องการ ${nurses} คน/เวร`
                : occ >= 85 ? `เตียงใกล้เต็ม ${occ}% — ต้องการ ${nurses} คน/เวร`
                : acuity >= 60 ? `ผู้สูงอายุ ${w.elderly} ราย — ต้องการ ${nurses} คน/เวร`
                : `ปกติ — ${nurses} คน/เวร เพียงพอ`
        };
    });
}

// ============================================================
// 5. NURSE — Fall Risk
// ============================================================
async function identifyFallRisk() {
    const rows = await dbQuery('ci_fall', 180, `
        SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
               w.name AS ward, TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) AS age,
               TIMESTAMPDIFF(DAY,i.regdate,CURDATE()) AS los,
               GROUP_CONCAT(DISTINCT d.icd10 SEPARATOR ',') AS dx
        FROM ipt i JOIN patient p ON i.hn=p.hn JOIN ward w ON i.ward=w.ward
        LEFT JOIN iptdiag d ON i.an=d.an
        WHERE i.dchdate IS NULL AND (TIMESTAMPDIFF(YEAR,p.birthday,CURDATE())>=65 OR TIMESTAMPDIFF(DAY,i.regdate,CURDATE())>=3)
        GROUP BY i.an,i.hn,p.pname,p.fname,p.lname,w.name,p.birthday,i.regdate ORDER BY age DESC LIMIT 80`);

    return rows.map(r => {
        let sc = 0; const fl = [];
        if (r.age >= 80) { sc += 4; fl.push(`อายุ ${r.age}`); } else if (r.age >= 70) { sc += 3; fl.push(`อายุ ${r.age}`); } else if (r.age >= 65) { sc += 2; fl.push(`อายุ ${r.age}`); }
        if (r.los >= 14) { sc += 3; fl.push(`นอน ${r.los} วัน`); } else if (r.los >= 7) { sc += 2; fl.push(`นอน ${r.los} วัน`); }
        const dx = (r.dx || '').toUpperCase();
        if (dx.match(/I6|G45/)) { sc += 3; fl.push('Stroke'); }
        if (dx.includes('S72')) { sc += 3; fl.push('Hip Fx'); }
        if (dx.match(/M80|M81/)) { sc += 2; fl.push('Osteoporosis'); }
        if (dx.includes('G20')) { sc += 2; fl.push("Parkinson's"); }
        return {
            an: r.an, hn: r.hn, name: r.name, ward: r.ward, age: r.age, los: r.los,
            risk_score: sc, severity: sc >= 6 ? 'critical' : sc >= 4 ? 'high' : 'medium', flags: fl,
            recommendation: sc >= 6 ? 'Fall risk สูงมาก — Bed rail, ป้ายเตือน, เฝ้าใกล้ชิด' : sc >= 4 ? 'Fall risk สูง — Morse Scale, Non-slip shoes' : 'Fall risk ปานกลาง — แนะนำป้องกัน'
        };
    });
}

// ============================================================
// 6. NURSE — Monitoring Gaps
// ============================================================
async function getMonitoringGaps() {
    const rows = await dbQuery('ci_gaps', 120, `
        SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) AS name,
               w.name AS ward, TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) AS age,
               MAX(CONCAT(v.vstdate,' ',v.vsttime)) AS last_vital,
               TIMESTAMPDIFF(HOUR, MAX(STR_TO_DATE(CONCAT(v.vstdate,' ',v.vsttime),'%Y-%m-%d %H:%i:%s')), NOW()) AS hrs
        FROM ipt i JOIN patient p ON i.hn=p.hn JOIN ward w ON i.ward=w.ward
        LEFT JOIN opdscreen v ON v.hn=i.hn AND v.vstdate>=DATE_SUB(CURDATE(),INTERVAL 3 DAY)
        WHERE i.dchdate IS NULL GROUP BY i.an,i.hn,p.pname,p.fname,p.lname,w.name,p.birthday
        HAVING hrs>6 OR hrs IS NULL ORDER BY hrs DESC LIMIT 50`);

    return rows.map(r => ({
        ...r, severity: !r.hrs ? 'critical' : r.hrs >= 12 ? 'critical' : r.hrs >= 8 ? 'high' : 'medium',
        recommendation: !r.hrs ? 'ไม่มี V/S เลย — วัดทันที' : `ไม่ได้วัด ${r.hrs} ชม. — วัดด่วน`
    }));
}

// ============================================================
// 7. ADMIN — Operational Efficiency
// ============================================================
async function getOperationalEfficiency() {
    const [opd, er, ipd, rev] = await Promise.allSettled([
        dbQueryOne(`SELECT COUNT(*) AS visits, AVG(TIMESTAMPDIFF(MINUTE,STR_TO_DATE(CONCAT(o.vstdate,' ',o.vsttime),'%Y-%m-%d %H:%i:%s'),STR_TO_DATE(CONCAT(o.vstdate,' ',st.service2),'%Y-%m-%d %H:%i:%s'))) AS wait FROM ovst o LEFT JOIN service_time st ON o.vn=st.vn WHERE o.vstdate=CURDATE()`),
        dbQueryOne(`SELECT COUNT(*) AS total, SUM(er_dch_type='1') AS admits, AVG(TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time)) AS d2d FROM er_regist e WHERE e.vstdate=CURDATE() AND e.enter_er_time IS NOT NULL AND e.doctor_tx_time IS NOT NULL`),
        dbQueryOne(`SELECT (SELECT COUNT(*) FROM ipt WHERE dchdate IS NULL) AS census, (SELECT COUNT(*) FROM ipt WHERE regdate=CURDATE()) AS admits, (SELECT COUNT(*) FROM ipt WHERE dchdate=CURDATE()) AS dc`),
        dbQueryOne(`SELECT COALESCE(SUM(income),0) AS revenue, COUNT(DISTINCT vn) AS visits FROM vn_stat WHERE vstdate=CURDATE()`)
    ]);

    const o = opd.status === 'fulfilled' ? opd.value : {};
    const e = er.status === 'fulfilled' ? er.value : {};
    const i = ipd.status === 'fulfilled' ? ipd.value : {};
    const r = rev.status === 'fulfilled' ? rev.value : {};

    const insights = [];
    const waitMin = Math.round(o.wait || 0);
    if (waitMin > 45) insights.push({ category: 'operational', priority: 'critical', icon: '⏱️', title: `OPD รอแพทย์ ${waitMin} นาที`, analysis: `เกินมาตรฐาน 30 นาที`, recommendation: 'เพิ่มแพทย์คลินิกที่คิวยาว, เปิดคลินิกเสริม', impact: 'ลดเวลารอ → Patient Satisfaction ↑' });
    else if (waitMin > 0) insights.push({ category: 'operational', priority: 'info', icon: '✅', title: `OPD รอเฉลี่ย ${waitMin} นาที`, analysis: waitMin <= 30 ? 'อยู่ในเกณฑ์ดี' : 'ควรติดตาม' });

    const d2d = Math.round(e.d2d || 0);
    if (d2d > 15) insights.push({ category: 'clinical', priority: 'high', icon: '🚑', title: `ER Door-to-Doctor ${d2d} นาที`, analysis: 'เกิน 10 นาที — กระทบ STEMI/Stroke', recommendation: 'ตรวจ Triage bottleneck' });

    const admitRate = e.total > 0 ? Math.round(e.admits / e.total * 100) : 0;
    if (admitRate > 25) insights.push({ category: 'capacity', priority: 'high', icon: '🏥', title: `ER Admit Rate ${admitRate}%`, analysis: `${e.admits}/${e.total} ราย → กระทบเตียง IPD`, recommendation: 'เตรียม bed management ล่วงหน้า' });

    const rpv = r.visits > 0 ? Math.round(r.revenue / r.visits) : 0;
    insights.push({ category: 'financial', priority: 'info', icon: '💰', title: `รายได้วันนี้ ฿${(r.revenue || 0).toLocaleString()}`, analysis: `${r.visits || 0} visits · ฿${rpv.toLocaleString()}/visit` });

    if (i.census) {
        const net = (i.admits || 0) - (i.dc || 0);
        insights.push({ category: 'capacity', priority: net > 5 ? 'high' : 'info', icon: '🛏️', title: `IPD ${i.census} ราย (${net >= 0 ? '+' : ''}${net})`, analysis: `Admit ${i.admits || 0} · DC ${i.dc || 0}`, recommendation: net > 5 ? 'Net สูง — เร่ง DC Planning' : 'Flow ปกติ' });
    }

    return { insights, metrics: { opd: o, er: e, ipd: i, revenue: r } };
}

// ============================================================
// 8. ADMIN — Quality Indicators
// ============================================================
async function getQualityInsights() {
    const [rm, mt, am] = await Promise.allSettled([
        dbQueryOne(`SELECT COUNT(DISTINCT r.an) AS cnt, (SELECT COUNT(*) FROM ipt WHERE dchdate>=DATE_SUB(CURDATE(),INTERVAL 30 DAY) AND dchdate<CURDATE() AND dchtype IN('1','2','3','4','5')) AS total FROM ipt r WHERE r.regdate>=DATE_SUB(CURDATE(),INTERVAL 30 DAY) AND EXISTS(SELECT 1 FROM ipt prev WHERE prev.hn=r.hn AND prev.an!=r.an AND prev.dchdate>=DATE_SUB(r.regdate,INTERVAL 30 DAY) AND prev.dchdate<r.regdate)`),
        dbQueryOne(`SELECT SUM(dchtype='09') AS deaths, COUNT(*) AS total FROM ipt WHERE dchdate>=DATE_SUB(CURDATE(),INTERVAL 30 DAY) AND dchdate<CURDATE()`),
        dbQueryOne(`SELECT SUM(dchtype IN('06','08')) AS cnt, COUNT(*) AS total FROM ipt WHERE dchdate>=DATE_SUB(CURDATE(),INTERVAL 30 DAY) AND dchdate<CURDATE()`)
    ]);
    const r = rm.status === 'fulfilled' ? rm.value : {}, m = mt.status === 'fulfilled' ? mt.value : {}, a = am.status === 'fulfilled' ? am.value : {};
    const readmitRate = r.total > 0 ? ((r.cnt / r.total) * 100).toFixed(1) : 0;
    const mortRate = m.total > 0 ? ((m.deaths / m.total) * 100).toFixed(1) : 0;
    const amaRate = a.total > 0 ? ((a.cnt / a.total) * 100).toFixed(1) : 0;

    return [
        { icon: '🔄', title: `Readmission 30d: ${readmitRate}%`, analysis: `${r.cnt || 0}/${r.total || 0} (เป้า <5%)`, priority: readmitRate > 5 ? 'high' : 'low', recommendation: readmitRate > 5 ? 'ทบทวน Top Readmit DRG, เพิ่ม DC Checklist' : 'อยู่ในเกณฑ์ HA' },
        { icon: '📊', title: `Mortality: ${mortRate}%`, analysis: `${m.deaths || 0}/${m.total || 0} (เป้า <2%)`, priority: mortRate > 2 ? 'critical' : 'low' },
        { icon: '🚪', title: `AMA: ${amaRate}%`, analysis: `${a.cnt || 0}/${a.total || 0} (เป้า <3%)`, priority: amaRate > 3 ? 'high' : 'low', recommendation: amaRate > 3 ? 'วิเคราะห์สาเหตุ: ค่าใช้จ่าย, ระยะเวลา, ความพึงพอใจ' : 'อยู่ในเกณฑ์' }
    ];
}

// ============================================================
// 9. MASTER AGGREGATOR — Role-filtered
// ============================================================
export async function generateInsights(role = 'all') {
    const result = { doctor: [], nurse: [], admin: [], summary: {} };
    const tasks = [];

    if (role === 'all' || role === 'doctor' || role === 'clinical' || role === 'admin') {
        tasks.push(
            cached('ci_sepsis_r', 60000, detectSepsisRisk).then(d => { result.doctor.push({ id: 'sepsis_alert', type: 'clinical', title: `🔴 Sepsis Alert: ${d.length} ราย`, priority: d.some(x => x.severity === 'critical') ? 'critical' : d.length ? 'high' : 'low', count: d.length, patients: d.slice(0, 10), forRole: ['doctor', 'nurse'] }); }).catch(() => {}),
            cached('ci_deteri_r', 60000, analyzeDeterioration).then(d => { result.doctor.push({ id: 'deterioration_alert', type: 'clinical', title: `⚠️ Deteriorating: ${d.length} ราย`, priority: d.some(x => x.severity === 'critical') ? 'critical' : d.length ? 'high' : 'low', count: d.length, patients: d.slice(0, 10), forRole: ['doctor', 'nurse'] }); }).catch(() => {}),
            cached('ci_labs_r', 60000, getCriticalLabs).then(d => { result.doctor.push({ id: 'critical_labs', type: 'lab', title: `🧪 Critical Lab: ${d.length} รายการ`, priority: d.length > 5 ? 'critical' : d.length ? 'high' : 'low', count: d.length, alerts: d.slice(0, 15), forRole: ['doctor'] }); }).catch(() => {})
        );
    }
    if (role === 'all' || role === 'nurse' || role === 'nursing' || role === 'admin') {
        tasks.push(
            cached('ci_acuity_r', 120000, getWardAcuity).then(d => { const crit = d.filter(w => w.severity === 'critical' || w.severity === 'high'); result.nurse.push({ id: 'ward_acuity', type: 'staffing', title: `🏥 Ward Acuity: ${crit.length} ward เฝ้าระวัง`, priority: crit.length > 2 ? 'critical' : crit.length ? 'high' : 'low', count: d.length, wards: d, forRole: ['nurse', 'admin'] }); }).catch(() => {}),
            cached('ci_fall_r', 180000, identifyFallRisk).then(d => { const hi = d.filter(p => p.severity === 'critical' || p.severity === 'high'); result.nurse.push({ id: 'fall_risk', type: 'safety', title: `⚠️ Fall Risk: ${hi.length} ราย เสี่ยงสูง`, priority: hi.length > 5 ? 'high' : hi.length ? 'medium' : 'low', count: hi.length, patients: d.slice(0, 20), forRole: ['nurse'] }); }).catch(() => {}),
            cached('ci_gaps_r', 120000, getMonitoringGaps).then(d => { result.nurse.push({ id: 'monitor_gaps', type: 'workflow', title: `📋 V/S Gap: ${d.length} ราย ≥6 ชม.`, priority: d.some(p => p.severity === 'critical') ? 'critical' : d.length ? 'high' : 'low', count: d.length, patients: d.slice(0, 20), forRole: ['nurse'] }); }).catch(() => {})
        );
    }
    if (role === 'all' || role === 'admin' || role === 'director') {
        tasks.push(
            cached('ci_ops_r', 120000, getOperationalEfficiency).then(d => { d.insights.forEach(i => result.admin.push({ ...i, id: `ops_${i.category}`, type: 'operational', forRole: ['admin'] })); result.summary.metrics = d.metrics; }).catch(() => {}),
            cached('ci_qual_r', 300000, getQualityInsights).then(d => { d.forEach(i => result.admin.push({ ...i, id: `qual_${i.icon}`, type: 'quality', forRole: ['admin'] })); }).catch(() => {})
        );
    }

    await Promise.allSettled(tasks);
    const all = [...result.doctor, ...result.nurse, ...result.admin];
    const critCount = all.filter(i => i.priority === 'critical').length;
    const highCount = all.filter(i => i.priority === 'high').length;
    result.summary = { ...result.summary, total_insights: all.length, critical_count: critCount, high_count: highCount, generated_at: new Date().toISOString() };

    // Learning capture
    try {
        const { captureLearning } = await import('./learningCapture.js');
        const severity = critCount > 0 ? 'critical' : highCount > 0 ? 'warning' : 'info';
        captureLearning('sepsis', critCount > 0 ? 'anomaly' : 'pattern',
            `Clinical insights: ${all.length} total, ${critCount} critical, ${highCount} high`,
            { total: all.length, critical: critCount, high: highCount }, critCount, 'alerts', severity);
    } catch { }

    return result;
}

export { detectSepsisRisk, analyzeDeterioration, getCriticalLabs, getWardAcuity, identifyFallRisk, getMonitoringGaps, getOperationalEfficiency, getQualityInsights };
