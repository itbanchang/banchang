// ============================================================
// BCH 360° Intelligence V.10 — News Brief Generator
// Baseline brief for every tab — built from /api/dashboard/summary
// + /api/ai/clinical-insights. Tabs can publish richer briefs via
// TabNewsContext.usePublishNews() to override this fallback.
// ============================================================

const TAB_META = {
    report: { icon: '📋', label: 'Report Online' },
    compare: { icon: '📊', label: 'เปรียบเทียบปีงบ' },
    finance: { icon: '💰', label: 'ศูนย์จัดเก็บรายได้' },
    opd: { icon: '⏱️', label: 'OPD ผู้ป่วยนอก' },
    ipd: { icon: '🏥', label: 'IPD ผู้ป่วยใน' },
    er: { icon: '🚑', label: 'ห้องฉุกเฉิน' },
    dental: { icon: '🦷', label: 'ทันตกรรม' },
    xray: { icon: '☢️', label: 'รังสีวิทยา' },
    pharmacy: { icon: '💊', label: 'เภสัชกรรม' },
    lab: { icon: '🔬', label: 'ห้องปฏิบัติการ' },
    thaimed: { icon: '🌿', label: 'แพทย์แผนไทย' },
    phystherapy: { icon: '🏋️', label: 'กายภาพบำบัด' },
    ncd: { icon: '🫀', label: 'NCD' },
    medrec: { icon: '📇', label: 'Medical Record Audit' },
    quality: { icon: '⭐', label: 'คุณภาพ HA' },
    'customer-insight': { icon: '🎯', label: 'Customer Insight' },
    'doctor-activity': { icon: '👨‍⚕️', label: 'ผลผลิตแพทย์' },
};

// Clinical thresholds (tunable — edit here instead of per-tab)
export const THRESHOLDS = {
    collection_good: 90,      // %
    full_denial_warn: 3,      // % — full denial (>80% unpaid) — tighter than any-outstanding
    partial_denial_warn: 8,   // % — partial denial (10-80% unpaid)
    occupancy_warn: 85,       // %
    occupancy_crit: 95,       // %
    alos_warn: 6,             // days
    trend_warn_drop: -5,      // %
};

export function getTabMeta(tab) {
    return TAB_META[tab] || { icon: '📰', label: 'Dashboard' };
}

// ── formatters ────────────────────────────────────────────────
function fmtBaht(v) {
    if (v == null || isNaN(v)) return '—';
    const n = Number(v);
    if (n >= 1e9) return `฿${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `฿${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `฿${(n / 1e3).toFixed(0)}K`;
    return `฿${Math.round(n).toLocaleString()}`;
}
function fmtNum(v) {
    if (v == null || isNaN(v)) return '—';
    return Number(v).toLocaleString('th-TH');
}
function fmtPct(v, digits = 0) {
    if (v == null || isNaN(v)) return '—';
    return `${Number(v).toFixed(digits)}%`;
}
function fmtTrend(v) {
    if (v == null || isNaN(v)) return '';
    const n = Number(v);
    if (n === 0) return ' ■0%';
    const arrow = n > 0 ? '▲' : '▼';
    return ` ${arrow}${Math.abs(n)}%`;
}
function trendTone(v) {
    if (v == null) return 'neutral';
    if (v <= THRESHOLDS.trend_warn_drop) return 'warn';
    return v > 0 ? 'good' : 'neutral';
}

// Clinical helpers ------------------------------------------------
function clinicalFind(clinical, role, id) {
    const arr = clinical?.[role] || [];
    return arr.find(d => d.id === id)?.count || 0;
}
function clinicalAlerts(c) {
    if (!c) return [];
    const out = [];
    const sepsis = clinicalFind(c, 'doctor', 'sepsis_alert');
    const deterioration = clinicalFind(c, 'doctor', 'deterioration_alert');
    const labs = clinicalFind(c, 'doctor', 'critical_labs');
    const fallRisk = clinicalFind(c, 'nurse', 'fall_risk');
    if (sepsis > 0) out.push({ icon: '🔴', label: 'Sepsis Risk', value: `${sepsis} ราย`, tone: 'crit' });
    if (deterioration > 0) out.push({ icon: '⚠️', label: 'Deteriorating', value: `${deterioration} ราย`, tone: 'warn' });
    if (labs > 0) out.push({ icon: '🧪', label: 'Critical Labs', value: `${labs} รายการ`, tone: 'warn' });
    if (fallRisk > 0) out.push({ icon: '🦯', label: 'Fall Risk', value: `${fallRisk} ราย`, tone: 'warn' });
    return out;
}
function cross(icon, label, value, tone = 'neutral') {
    return { icon, label, value, tone };
}

// ── per-tab brief builders ────────────────────────────────────
function briefFinance(s) {
    const f = s?.finance || {};
    // Prefer full_denial_rate (new, accurate) over legacy denial_rate (any-outstanding)
    const denial = f.full_denial_rate != null ? f.full_denial_rate : f.denial_rate;
    // Show projected full-month revenue when we're mid-month (fair vs full prev month)
    const monthValue = f.revenue_month_projected != null && f.revenue_month_projected !== f.revenue_this_month
        ? `${fmtBaht(f.revenue_month_projected)} (projected)`
        : fmtBaht(f.revenue_this_month);
    return {
        bullets: [
            { icon: '💰', label: 'รายได้สะสม (YTD)', value: fmtBaht(f.total_revenue), tone: 'good' },
            { icon: '📈', label: 'เดือนนี้', value: monthValue + fmtTrend(f.trend_revenue), tone: trendTone(f.trend_revenue) },
            { icon: '✅', label: 'Collection Rate', value: fmtPct(f.collection_rate, 1), tone: f.collection_rate >= THRESHOLDS.collection_good ? 'good' : 'warn' },
            { icon: '⚠️', label: 'Full Denial', value: fmtPct(denial, 1), tone: denial > THRESHOLDS.full_denial_warn ? 'warn' : 'good' },
            { icon: '💳', label: 'ยอดค้างชำระ', value: fmtBaht(f.debtors_outstanding), tone: 'warn' },
        ],
    };
}
function briefOPD(s) {
    const o = s?.opd || {};
    const st = s?.staff || {};
    return {
        bullets: [
            { icon: '🧑‍⚕️', label: 'ผู้ป่วย OPD วันนี้', value: `${fmtNum(o.today_visits)} ราย${fmtTrend(o.trend_visits)}`, tone: trendTone(o.trend_visits) },
            { icon: '👨‍⚕️', label: 'แพทย์ออกตรวจ', value: `${fmtNum(st.doctors_today)} คน`, tone: 'neutral' },
        ],
    };
}
function briefIPD(s) {
    const i = s?.ipd || {};
    const b = s?.beds || {};
    const occTone = b.occupancy_rate >= THRESHOLDS.occupancy_crit ? 'crit'
        : b.occupancy_rate >= THRESHOLDS.occupancy_warn ? 'warn' : 'good';
    return {
        bullets: [
            { icon: '🛌', label: 'Admit คงค้าง', value: `${fmtNum(i.active_admissions)} ราย${fmtTrend(i.trend_admissions)}`, tone: trendTone(i.trend_admissions) },
            { icon: '🛏️', label: 'อัตราครองเตียง', value: fmtPct(b.occupancy_rate, 1), tone: occTone },
            { icon: '📊', label: 'เตียงว่าง', value: `${fmtNum(b.available)}/${fmtNum(b.total)}`, tone: 'neutral' },
            { icon: '⏱️', label: 'ALOS 30 วัน', value: i.alos != null ? `${i.alos} วัน` : '—', tone: i.alos > THRESHOLDS.alos_warn ? 'warn' : 'neutral' },
        ],
    };
}
function briefER(s, c) {
    const er = s?.er || {};
    const crit = c?.summary?.critical_count || s?.clinical?.critical_patients || 0;
    const high = s?.clinical?.high_risk_patients || 0;
    return {
        bullets: [
            { icon: '🚑', label: 'ER วันนี้', value: `${fmtNum(er.today_visits)} ราย${fmtTrend(er.trend_visits)}`, tone: trendTone(er.trend_visits) },
            { icon: '🔴', label: 'Critical', value: `${fmtNum(crit)} ราย`, tone: crit > 0 ? 'crit' : 'good' },
            { icon: '🟠', label: 'High-Risk', value: `${fmtNum(high)} ราย`, tone: high > 0 ? 'warn' : 'good' },
        ],
    };
}
function briefReport(s) {
    const o = s?.opd || {}, i = s?.ipd || {}, er = s?.er || {}, f = s?.finance || {};
    return {
        bullets: [
            cross('🧑‍⚕️', 'OPD วันนี้', `${fmtNum(o.today_visits)} ราย`, trendTone(o.trend_visits)),
            cross('🛌', 'IPD คงค้าง', `${fmtNum(i.active_admissions)} ราย`, trendTone(i.trend_admissions)),
            cross('🚑', 'ER วันนี้', `${fmtNum(er.today_visits)} ราย`, trendTone(er.trend_visits)),
            cross('💰', 'รายได้เดือนนี้', fmtBaht(f.revenue_this_month) + fmtTrend(f.trend_revenue), trendTone(f.trend_revenue)),
        ],
    };
}
function briefCompare(s) {
    const f = s?.finance || {};
    return {
        bullets: [
            cross('💰', 'รายได้สะสม YTD', fmtBaht(f.total_revenue), 'good'),
            cross('📈', 'เทรนด์เดือนนี้', fmtBaht(f.revenue_this_month) + fmtTrend(f.trend_revenue), trendTone(f.trend_revenue)),
            cross('📊', 'Compare', 'ดูเปรียบเทียบ 3 ปีงบ', 'neutral'),
        ],
    };
}
// Department tabs that don't have their own analytics in global state —
// show cross-cutting OPD/clinical signals + tab label
function briefDepartment(tab, s, c, extras = []) {
    const meta = getTabMeta(tab);
    const o = s?.opd || {};
    const alerts = clinicalAlerts(c);
    const bullets = [
        cross('🧑‍⚕️', 'OPD วันนี้', `${fmtNum(o.today_visits)} ราย`, trendTone(o.trend_visits)),
        ...extras,
    ];
    if (alerts.length > 0) bullets.push(alerts[0]); // show top alert
    bullets.push(cross(meta.icon, meta.label, 'เปิด Tab เพื่อดูรายละเอียด', 'neutral'));
    return { bullets };
}
function briefNCD(s, c) {
    const alerts = clinicalAlerts(c);
    const i = s?.ipd || {};
    return {
        bullets: [
            cross('🫀', 'NCD Registry', 'DM · HT · CKD', 'neutral'),
            cross('🛌', 'IPD (ผู้ป่วยเรื้อรัง)', `${fmtNum(i.active_admissions)} ราย`, 'neutral'),
            ...(alerts.length > 0 ? [alerts[0]] : [cross('✅', 'Clinical', 'ปกติ', 'good')]),
        ],
    };
}
function briefMedRec(s) {
    const o = s?.opd || {}, i = s?.ipd || {};
    return {
        bullets: [
            cross('📇', 'เวชระเบียน', 'Audit · Coding', 'neutral'),
            cross('🧑‍⚕️', 'OPD วันนี้', `${fmtNum(o.today_visits)} record`, 'neutral'),
            cross('🛌', 'IPD คงค้าง', `${fmtNum(i.active_admissions)} record`, 'neutral'),
        ],
    };
}
function briefQuality(s, c) {
    const crit = c?.summary?.critical_count || s?.clinical?.critical_patients || 0;
    const high = s?.clinical?.high_risk_patients || 0;
    const alerts = clinicalAlerts(c);
    return {
        bullets: [
            cross('⭐', 'HA Thailand', 'QPI · Patient Safety', 'neutral'),
            cross('🔴', 'Critical', `${fmtNum(crit)} ราย`, crit > 0 ? 'crit' : 'good'),
            cross('🟠', 'High-Risk', `${fmtNum(high)} ราย`, high > 0 ? 'warn' : 'good'),
            ...(alerts.length > 0 ? [alerts[0]] : []),
        ],
    };
}
function briefCustomerInsight(s) {
    const f = s?.finance || {};
    const denial = f.full_denial_rate != null ? f.full_denial_rate : f.denial_rate;
    return {
        bullets: [
            cross('🎯', 'คัดกรองผู้รับบริการ', 'สิทธิ · การเบิกจ่าย', 'neutral'),
            cross('✅', 'Collection', fmtPct(f.collection_rate, 1), f.collection_rate >= THRESHOLDS.collection_good ? 'good' : 'warn'),
            cross('⚠️', 'Full Denial', fmtPct(denial, 1), denial > THRESHOLDS.full_denial_warn ? 'warn' : 'good'),
        ],
    };
}
function briefDoctorActivity(s) {
    const d = s?.doctorActivity || {};
    const summary = d.summary || {};
    const opdDocs = summary.opd_doctors || 0;
    const ipdDocs = summary.ipd_doctors || 0;
    const avgVisits = summary.avg_visits_per_doctor || 0;
    return {
        bullets: [
            cross('👨‍⚕️', 'แพทย์ OPD', `${opdDocs} คน`, 'neutral'),
            cross('🏥', 'แพทย์ IPD', `${ipdDocs} คน`, 'neutral'),
            cross('📊', 'เฉลี่ย/คน', `${avgVisits} ครั้ง`, avgVisits > 0 ? 'good' : 'neutral'),
        ],
    };
}

// ── main entry ────────────────────────────────────────────────
export function generateNewsBriefs(activeTab, summary, clinicalInsights) {
    const meta = getTabMeta(activeTab);
    let brief;
    switch (activeTab) {
        case 'finance': brief = briefFinance(summary); break;
        case 'opd': brief = briefOPD(summary); break;
        case 'ipd': brief = briefIPD(summary); break;
        case 'er': brief = briefER(summary, clinicalInsights); break;
        case 'report': brief = briefReport(summary); break;
        case 'compare': brief = briefCompare(summary); break;
        case 'ncd': brief = briefNCD(summary, clinicalInsights); break;
        case 'medrec': brief = briefMedRec(summary); break;
        case 'quality': brief = briefQuality(summary, clinicalInsights); break;
        case 'customer-insight': brief = briefCustomerInsight(summary); break;
        case 'doctor-activity': brief = briefDoctorActivity(summary); break;
        case 'dental':
        case 'xray':
        case 'pharmacy':
        case 'lab':
        case 'thaimed':
        case 'phystherapy':
            brief = briefDepartment(activeTab, summary, clinicalInsights);
            break;
        default: brief = briefDepartment(activeTab, summary, clinicalInsights);
    }
    return { tab: activeTab, meta, ...brief };
}

// Convert brief bullets → short speech-bubble phrases (one headline each)
export function briefsToPhrases(brief) {
    if (!brief || !brief.bullets || brief.bullets.length === 0) return [];
    const head = `${brief.meta?.icon || '📰'} ${brief.meta?.label || 'Dashboard'}`;
    return brief.bullets
        .filter(b => b.value && b.value !== '—')
        .map(b => `${head} · ${b.icon} ${b.label} ${b.value}`);
}
