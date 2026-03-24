// ============================================================
// BCH 360° Intelligence V.10 — Quality Tab
// HA Thailand Accreditation · QPI Analytics
// Color Theme: Rose/Red (#e11d48, #be123c)
// ============================================================
import React, { useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICardV2 from './KPICardV2.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import {
    BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend, Cell, ReferenceLine
} from 'recharts';

// ── Theme ────────────────────────────────────────────────────
const C = {
    primary:  '#e11d48',
    secondary:'#be123c',
    accent:   '#fb7185',
    light:    '#fff1f2',
    muted:    '#fecdd3',
    green:    '#10b981',
    yellow:   '#f59e0b',
    blue:     '#3b82f6',
    purple:   '#8b5cf6',
    gray:     '#6b7280',
};

// ── Helpers ──────────────────────────────────────────────────
const fmt = (n, d = 1) => n == null ? '—' : Number(n).toFixed(d);
const pct = (n, d = 1) => n == null ? '—' : `${Number(n).toFixed(d)}%`;
const badge = (label, color) => (
    <span style={{
        display: 'inline-block', padding: '2px 8px', borderRadius: 99,
        fontSize: 10, fontWeight: 700, background: color + '20', color,
        border: `1px solid ${color}40`, marginLeft: 4
    }}>{label}</span>
);

// ── QPI Gauge ────────────────────────────────────────────────
function QPIGauge({ value }) {
    const score = value ?? 0;
    const color = score >= 85 ? C.green : score >= 70 ? C.yellow : C.primary;
    const label = score >= 85 ? 'ผ่านมาตรฐาน HA' : score >= 70 ? 'ต้องปรับปรุง' : 'ต่ำกว่ามาตรฐาน';
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (score / 100) * circumference;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width={140} height={140} viewBox="0 0 140 140">
                <circle cx={70} cy={70} r={52} fill="none" stroke="#f3f4f6" strokeWidth={12} />
                <circle cx={70} cy={70} r={52} fill="none" stroke={color} strokeWidth={12}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round" transform="rotate(-90 70 70)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }} />
                <text x={70} y={64} textAnchor="middle" fontSize={28} fontWeight={800} fill={color}>{score.toFixed(0)}</text>
                <text x={70} y={82} textAnchor="middle" fontSize={11} fill={C.gray}>QPI Score</text>
            </svg>
            <span style={{
                padding: '4px 14px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                background: color + '18', color, border: `1px solid ${color}40`
            }}>{label}</span>
        </div>
    );
}

// ── Domain Radar Chart ───────────────────────────────────────
function DomainRadar({ domains }) {
    const data = [
        { domain: 'PCT', score: domains?.pct ?? 0 },
        { domain: 'IC', score: domains?.ic ?? 0 },
        { domain: 'MED', domain_full: 'MED', score: domains?.med ?? 0 },
        { domain: 'ENV', score: domains?.env ?? 0 },
        { domain: 'IM', score: domains?.im ?? 0 },
    ];
    return (
        <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={data} cx="50%" cy="50%" outerRadius={80}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11, fontWeight: 700, fill: C.gray }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Score" dataKey="score" stroke={C.primary} fill={C.primary} fillOpacity={0.2} strokeWidth={2} />
                <Tooltip formatter={(v) => [`${v.toFixed(1)}`, 'คะแนน']} />
            </RadarChart>
        </ResponsiveContainer>
    );
}

// ── Domain Card ──────────────────────────────────────────────
function DomainCard({ code, name_th, desc, score, color, indicators = [] }) {
    const c = color || C.primary;
    const status = score >= 85 ? { label: 'ดี', bg: C.green } : score >= 70 ? { label: 'พอใช้', bg: C.yellow } : { label: 'ต้องปรับ', bg: C.primary };
    return (
        <div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: `4px solid ${c}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                    <span style={{ fontWeight: 800, fontSize: 13, color: c }}>{code}</span>
                    <span style={{ fontWeight: 600, fontSize: 12, color: C.gray, marginLeft: 6 }}>{name_th}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: c }}>{score?.toFixed(1) ?? '—'}</span>
                    <span style={{ fontSize: 10, color: C.gray }}>/100</span>
                    {badge(status.label, status.bg)}
                </div>
            </div>
            <p style={{ fontSize: 10, color: C.gray, marginBottom: 8 }}>{desc}</p>
            {indicators.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {indicators.map((ind, i) => (
                        <span key={i} style={{
                            fontSize: 10, padding: '2px 8px', borderRadius: 99,
                            background: ind.alert ? C.primary + '15' : '#f3f4f6',
                            color: ind.alert ? C.primary : C.gray,
                            border: `1px solid ${ind.alert ? C.primary + '40' : '#e5e7eb'}`
                        }}>
                            {ind.label}: <strong>{ind.value}</strong>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── KPI Descriptions (static meta — values injected at render) ─
const QUALITY_KPI_META = [
    {
        label:      'QPI Score',
        thLabel:    'ดัชนีคุณภาพโดยรวม (QPI)',
        icon:       '⭐',
        color:      C.primary,
        meaning:    'ดัชนีชี้วัดคุณภาพโดยรวมของโรงพยาบาล คำนวณจาก 5 มิติ HA Thailand',
        calc:       'Readmit×0.28 + Mortality×0.28 + AMA×0.16 + HAI×0.16 + DchPlan×0.12',
        target:     '≥ 85 คะแนน',
        benchmark:  '≥ 85 = ผ่านมาตรฐาน HA, ≥ 70 = ต้องปรับปรุง',
        dataSource: 'ipt, an_stat, iptdiag, ovst',
        period:     'Real-time',
        _key:       'qpi_score',
        _fmt:       v => `${Number(v).toFixed(0)}`,
        _sub:       v => Number(v) >= 85 ? 'ผ่านมาตรฐาน' : Number(v) >= 70 ? 'ต้องปรับปรุง' : 'ต่ำกว่ามาตรฐาน',
    },
    {
        label:      'Readmission Rate (PCT)',
        thLabel:    'อัตรา Readmission 28 วัน',
        icon:       '🔄',
        color:      C.secondary,
        meaning:    'อัตราผู้ป่วยกลับเข้ารักษาซ้ำภายใน 28 วัน หลังจำหน่าย',
        calc:       '(Readmit ≤28d / จำหน่ายทั้งหมด) × 100',
        target:     '< 5%',
        benchmark:  'HA Standard: < 5%, ดีเลิศ: < 3%',
        dataSource: 'ipt (self-join)',
        period:     '90 วันล่าสุด',
        _key:       'readmit_rate',
        _fmt:       v => `${Number(v).toFixed(2)}%`,
        _sub:       v => Number(v) <= 3 ? 'ดีเลิศ' : Number(v) <= 5 ? 'ผ่านมาตรฐาน' : 'เกินมาตรฐาน',
    },
    {
        label:      'Mortality Rate (PCT)',
        thLabel:    'อัตราผู้เสียชีวิตใน รพ.',
        icon:       '💔',
        color:      '#7c3aed',
        meaning:    'อัตราผู้เสียชีวิตในโรงพยาบาล (dchtype = 09) ต่อผู้จำหน่ายทั้งหมด',
        calc:       '(ผู้เสียชีวิต / ผู้จำหน่าย) × 100',
        target:     '< 2%',
        benchmark:  'HA Standard: < 2%, ICU < 15%',
        dataSource: 'ipt (dchtype)',
        period:     '30 วันล่าสุด',
        _key:       'mortality_rate',
        _fmt:       v => `${Number(v).toFixed(2)}%`,
        _sub:       v => Number(v) <= 2 ? 'ผ่านมาตรฐาน' : 'เกินมาตรฐาน',
    },
    {
        label:      'HAI Rate (IC Domain)',
        thLabel:    'อัตราติดเชื้อในโรงพยาบาล (HAI)',
        icon:       '🦠',
        color:      C.yellow,
        meaning:    'อัตราการติดเชื้อในโรงพยาบาล (Hospital Acquired Infection) ตรวจพบจาก secondary ICD-10',
        calc:       '(HAI cases / LOS > 2d) × 100  [T80–T88, A40–A41, J15–J18, L89, N39.0]',
        target:     '< 1%',
        benchmark:  'HA IC Standard: < 1%, ดีมาก: < 0.5%',
        dataSource: 'iptdiag + ipt (LOS filter)',
        period:     '30 วันล่าสุด',
        _key:       'hai_rate',
        _fmt:       v => `${Number(v).toFixed(2)}%`,
        _sub:       v => Number(v) <= 0.5 ? 'ดีมาก' : Number(v) <= 1 ? 'ผ่านมาตรฐาน' : 'เกินมาตรฐาน',
    },
    {
        label:      'Discharge Planning (ENV)',
        thLabel:    'ความครบถ้วนแผนการจำหน่าย',
        icon:       '📋',
        color:      C.blue,
        meaning:    'ความครบถ้วนของแผนการดูแลต่อเนื่องก่อนจำหน่าย วัดจากการบันทึก dchtime',
        calc:       '(ผู้ป่วยมี dchtime / ผู้จำหน่าย) × 100',
        target:     '> 95%',
        benchmark:  'มาตรฐาน: > 95%, ดีเลิศ: > 98%',
        dataSource: 'ipt (dchtime)',
        period:     '30 วันล่าสุด',
        _key:       'dch_plan_rate',
        _fmt:       v => `${Number(v).toFixed(1)}%`,
        _sub:       v => Number(v) >= 98 ? 'ดีเลิศ' : Number(v) >= 95 ? 'ผ่านมาตรฐาน' : 'ต้องปรับปรุง',
    },
];

// ── Main Component ────────────────────────────────────────────
function QualityTab() {
    const { state, fetchData } = useDashboard();

    // Use dashboard context state (same auth token as all other tabs)
    const qualityToday     = state.qualityToday;
    const qualityAnalytics = state.qualityAnalytics;
    const qualityFiscal    = state.qualityIndicators;
    const loading          = state.loading?.qualityAnalytics !== false && !qualityAnalytics;

    useEffect(() => {
        fetchData('qualityToday',      '/api/quality/today');
        fetchData('qualityAnalytics',  '/api/quality/analytics');
        fetchData('qualityIndicators', '/api/quality/indicators');
    }, [fetchData]);

    // ── AI Problem Detection ─────────────────────────────────
    const aiProblems = useMemo(() => {
        if (!qualityAnalytics) return [];
        const problems = [];
        const a = qualityAnalytics;

        if (a.readmit_rate > 5)
            problems.push({ level: 'critical', icon: '🔄', msg: `Readmission สูง ${pct(a.readmit_rate)} — เกินมาตรฐาน HA (< 5%)` });
        if (a.mortality_rate > 2)
            problems.push({ level: 'critical', icon: '⚠️', msg: `Mortality Rate ${pct(a.mortality_rate)} — ตรวจสอบ case review` });
        if (a.hai_rate > 1)
            problems.push({ level: 'warning', icon: '🦠', msg: `HAI Rate ${pct(a.hai_rate)} — IC Team ควรตรวจสอบ` });
        if (a.ama_rate > 3)
            problems.push({ level: 'warning', icon: '🚪', msg: `AMA Rate ${pct(a.ama_rate)} — ผู้ป่วย DC เองสูง` });
        if (a.doc_completeness < 90)
            problems.push({ level: 'info', icon: '📋', msg: `เอกสารไม่ครบ ${pct(a.doc_completeness)} — กรอกข้อมูลให้ครบถ้วน` });
        if (a.adr_rate > 2)
            problems.push({ level: 'info', icon: '💊', msg: `ADR Rate ${pct(a.adr_rate)} — ทบทวนความปลอดภัยยา` });
        if (problems.length === 0)
            problems.push({ level: 'ok', icon: '✅', msg: `คุณภาพโดยรวมอยู่ในเกณฑ์ดี — QPI ${fmt(a.qpi_score)} คะแนน` });
        return problems;
    }, [qualityAnalytics]);

    const levelColor = { critical: C.primary, warning: C.yellow, info: C.blue, ok: C.green };

    // Define early so useMemo can reference them (hooks must run before early returns)
    const a = qualityAnalytics || {};
    const t = qualityToday || {};
    const f = qualityFiscal || {};

    // Enrich static KPI meta with live values from qualityAnalytics
    const enrichedKPIs = useMemo(() => {
        return QUALITY_KPI_META.map(({ _key, _fmt, _sub, ...rest }) => {
            const raw = a[_key];
            const value = raw != null ? _fmt(raw) : '—';
            const sub   = raw != null ? _sub(raw)  : undefined;
            return { ...rest, value, sub };
        });
    }, [a]);

    // ── MetricsStrip (8 KPIs) ──
    const metricsStripData = useMemo(() => [
        { label: 'QPI Score', value: `${(a.qpi_score ?? 0).toFixed(0)}`, unit: '/100', icon: '⭐', status: (a.qpi_score ?? 0) >= 85 ? 'success' : (a.qpi_score ?? 0) >= 70 ? 'warning' : 'critical', target: 'HA Standard ≥85' },
        { label: 'Readmission', value: `${(a.readmit_rate ?? 0).toFixed(1)}%`, icon: '🔄', status: (a.readmit_rate ?? 0) <= 3 ? 'success' : (a.readmit_rate ?? 0) <= 5 ? 'warning' : 'critical', target: 'HA <5%' },
        { label: 'Mortality', value: `${(a.mortality_rate ?? 0).toFixed(2)}%`, icon: '💔', status: (a.mortality_rate ?? 0) <= 2 ? 'success' : 'critical', target: 'HA <2%', gradient: '#7c3aed' },
        { label: 'HAI Rate', value: `${(a.hai_rate ?? 0).toFixed(2)}%`, icon: '🦠', status: (a.hai_rate ?? 0) <= 0.5 ? 'success' : (a.hai_rate ?? 0) <= 1 ? 'warning' : 'critical', target: 'IC <1%' },
        { label: 'AMA Rate', value: `${(a.ama_rate ?? 0).toFixed(2)}%`, icon: '🚪', status: (a.ama_rate ?? 0) <= 3 ? 'success' : 'warning', target: '<3%' },
        { label: 'Dch Planning', value: `${(a.dch_plan_rate ?? 0).toFixed(1)}%`, icon: '📋', status: (a.dch_plan_rate ?? 0) >= 95 ? 'success' : 'warning', target: '>95%' },
        { label: 'Admitted Today', value: `${t.admitted_today ?? 0}`, unit: 'ราย', icon: '🏥', status: 'normal', target: 'รับใหม่วันนี้' },
        { label: 'Discharged', value: `${t.discharged_today ?? 0}`, unit: 'ราย', icon: '📤', status: 'normal', target: 'จำหน่ายวันนี้' },
    ], [a, t]);

    // ── AI Insight Cards (4 cards) ──
    const aiCards = useMemo(() => {
        const qpi = a.qpi_score ?? 0;
        const readmit = a.readmit_rate ?? 0;
        const mortality = a.mortality_rate ?? 0;
        const hai = a.hai_rate ?? 0;
        const ama = a.ama_rate ?? 0;
        const dchPlan = a.dch_plan_rate ?? 0;

        return [
            {
                title: 'QPI Score Analysis',
                icon: '⭐',
                priority: qpi >= 85 ? 'LOW' : qpi >= 70 ? 'MEDIUM' : 'HIGH',
                summary: `QPI ${qpi.toFixed(0)}/100 -- ${qpi >= 85 ? 'ผ่านมาตรฐาน HA Thailand ครบทุกมิติ' : qpi >= 70 ? 'ต้องปรับปรุงบางมิติ HA' : 'ต่ำกว่ามาตรฐาน HA ต้องเร่งแก้ไข'}`,
                analysis: `QPI คำนวณจาก 5 มิติ: PCT (${a.domains?.pct?.toFixed(0) ?? '—'}), IC (${a.domains?.ic?.toFixed(0) ?? '—'}), MED (${a.domains?.med?.toFixed(0) ?? '—'}), ENV (${a.domains?.env?.toFixed(0) ?? '—'}), IM (${a.domains?.im?.toFixed(0) ?? '—'}) -- Readmit x0.28 + Mortality x0.28 + AMA x0.16 + HAI x0.16 + DchPlan x0.12`,
                recommendation: qpi >= 85 ? 'คงมาตรฐาน เฝ้าระวัง Domain ที่ต่ำสุด ทำ PDCA รายเดือน' : 'เร่ง Domain ต่ำสุด: ตรวจสอบ PCT (Readmit+Mortality) และ IC (HAI) เป็นอันดับแรก',
                gradient: C.primary,
                gradientFrom: `${C.primary}08`,
                gradientTo: `${C.secondary}04`,
                borderColor: `${C.primary}25`,
                confidence: 94,
            },
            {
                title: 'Patient Safety Monitor',
                icon: '🛡️',
                priority: (mortality > 2 || hai > 1) ? 'HIGH' : (mortality > 1 || hai > 0.5) ? 'MEDIUM' : 'LOW',
                summary: `Mortality ${mortality.toFixed(2)}% | HAI ${hai.toFixed(2)}% | ADR ${(a.adr_rate ?? 0).toFixed(2)}% -- ${mortality <= 2 && hai <= 1 ? 'Patient Safety อยู่ในเกณฑ์ดี' : 'มีจุดที่ต้องเฝ้าระวังด้านความปลอดภัย'}`,
                analysis: `Mortality Rate ต้อง <2% (HA Standard), HAI Rate ต้อง <1% (IC Standard) -- แยก HAI: BSI ${a.hai_types?.bsi ?? 0}, SSI ${a.hai_types?.ssi ?? 0}, VAP ${a.hai_types?.pna ?? 0} -- ADR Cases: ${a.adr_count ?? 0} ราย`,
                recommendation: mortality > 2 ? 'Case review ทุกรายที่เสียชีวิต ตรวจสอบ Morbidity Conference' : hai > 1 ? 'IC Team ตรวจสอบ HAI เร่งด่วน Hand hygiene + Bundle compliance' : 'เฝ้าระวังต่อเนื่อง ทำ Sentinel Event Report ทุกเดือน',
                gradient: '#7c3aed',
                gradientFrom: 'rgba(124,58,237,.08)',
                gradientTo: 'rgba(99,102,241,.04)',
                borderColor: 'rgba(124,58,237,.25)',
                confidence: 91,
            },
            {
                title: 'Readmission Prevention',
                icon: '🔄',
                priority: readmit > 5 ? 'HIGH' : readmit > 3 ? 'MEDIUM' : 'LOW',
                summary: `Readmit 28d: ${readmit.toFixed(2)}% -- ${readmit <= 3 ? 'ดีเลิศ ต่ำกว่ามาตรฐานมาก' : readmit <= 5 ? 'ผ่านมาตรฐาน HA (<5%)' : 'เกินมาตรฐาน HA ต้องทบทวน'}`,
                analysis: `Top Readmit Diagnoses: ${(a.top_readmit_diag || []).slice(0, 3).map(d => d.icd10).join(', ') || 'N/A'} -- ALOS: ${(a.alos ?? 0).toFixed(1)} วัน, CMI: ${(a.cmi ?? 0).toFixed(2)} -- Ward breakdown: ${(a.ward_breakdown || []).filter(w => w.readmit > 0).length} wards มี readmit`,
                recommendation: readmit > 5 ? 'เร่ง Case Conference ทุก Readmit case + ปรับ Discharge Planning + Home visit follow-up' : 'คงมาตรฐาน ติดตาม Top diagnosis ที่ readmit สูง ทำ Care map',
                gradient: C.secondary,
                gradientFrom: `${C.secondary}08`,
                gradientTo: `${C.primary}04`,
                borderColor: `${C.secondary}25`,
                confidence: 89,
            },
            {
                title: 'Compliance & Documentation',
                icon: '📋',
                priority: (dchPlan < 95 || (a.doc_completeness ?? 100) < 90) ? 'MEDIUM' : 'LOW',
                summary: `Dch Plan ${dchPlan.toFixed(1)}% | Doc Complete ${(a.doc_completeness ?? 0).toFixed(1)}% | AMA ${ama.toFixed(2)}% -- ${dchPlan >= 95 && ama <= 3 ? 'Compliance ดี' : 'ต้องปรับปรุง'}`,
                analysis: `Discharge Planning ต้อง >95% (HA Standard) -- AMA Rate สะท้อนผู้ป่วยที่กลับก่อน ซึ่งเพิ่ม Readmission risk -- IM Domain: Diag Coded ${(a.diag_coded_rate ?? 0).toFixed(1)}%`,
                recommendation: dchPlan < 95 ? 'เพิ่ม Dch Planning: (1) Checklist ก่อนจำหน่าย (2) อบรมพยาบาล (3) เป้า >98%' : ama > 3 ? 'ลด AMA: สำรวจสาเหตุ ปรับ Communication + Patient Education' : 'คงมาตรฐาน ทำ Self-audit Documentation ทุกเดือน',
                gradient: C.blue,
                gradientFrom: 'rgba(59,130,246,.08)',
                gradientTo: 'rgba(37,99,235,.04)',
                borderColor: 'rgba(59,130,246,.25)',
                confidence: 87,
            },
        ];
    }, [a]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: C.gray }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
                <p style={{ fontWeight: 700 }}>กำลังโหลดข้อมูลคุณภาพ HA Thailand…</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* ── MetricsStrip — 8 KPI Overview ── */}
            <MetricsStrip metrics={metricsStripData} />

            {/* ── AI Analytics Cards — 4 Intelligence Panels ── */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ width: '3px', height: '18px', background: `linear-gradient(180deg, ${C.primary}, ${C.purple})`, borderRadius: '99px' }} />
                    <span style={{ fontWeight: 800, fontSize: 13, color: C.primary, letterSpacing: 1 }}>
                        🧠 AI QUALITY INTELLIGENCE
                    </span>
                    <span style={{ fontSize: 11, color: C.gray, fontWeight: 600, background: `${C.primary}10`, padding: '2px 8px', borderRadius: 99 }}>4 Analytics Modules</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                    {aiCards.map((card, i) => (
                        <AIInsightCard key={i} {...card} />
                    ))}
                </div>
            </div>

            {/* ── AI Problem Feed ── */}
            {aiProblems.length > 0 && (
                <div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: `4px solid ${C.primary}` }}>
                    <div style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 8, letterSpacing: 1 }}>
                        ⭐ AI QUALITY MONITOR — HA THAILAND
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {aiProblems.map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                                <span>{p.icon}</span>
                                <span style={{ color: levelColor[p.level] || C.gray, fontWeight: p.level === 'critical' ? 700 : 500 }}>{p.msg}</span>
                                {badge(p.level.toUpperCase(), levelColor[p.level] || C.gray)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Today Snapshot ── */}
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem', background: `linear-gradient(135deg, ${C.primary}08, ${C.secondary}05)` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                        <h2 style={{ fontWeight: 800, fontSize: 'var(--fs-lg)', color: C.primary, margin: 0 }}>
                            คุณภาพวันนี้
                        </h2>
                        <p style={{ fontSize: 11, color: C.gray, margin: 0 }}>
                            HA Thailand Accreditation Dashboard — Real-time
                        </p>
                    </div>
                    <QPIGauge value={a.qpi_score} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
                    {[
                        { label: 'จำหน่ายวันนี้', value: t.discharged_today ?? '—', unit: 'ราย', color: C.primary },
                        { label: 'รับใหม่วันนี้', value: t.admitted_today ?? '—', unit: 'ราย', color: C.blue },
                        { label: 'เสียชีวิตวันนี้', value: t.deaths_today ?? '—', unit: 'ราย', color: t.deaths_today > 0 ? '#7c3aed' : C.gray },
                        { label: 'AMA วันนี้', value: t.ama_today ?? '—', unit: 'ราย', color: t.ama_today > 0 ? C.yellow : C.gray },
                        { label: 'Readmit Flag', value: t.readmit_today ?? '—', unit: 'ราย', color: t.readmit_today > 0 ? C.primary : C.gray },
                        { label: 'ADR วันนี้', value: t.adr_today ?? '—', unit: 'ราย', color: t.adr_today > 0 ? C.yellow : C.gray },
                    ].map(({ label, value, unit, color }) => (
                        <div key={label} style={{
                            background: '#fff', borderRadius: 12, padding: '0.75rem 1rem',
                            border: `1px solid ${color}30`, textAlign: 'center'
                        }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
                            <div style={{ fontSize: 10, color: C.gray }}>{unit}</div>
                            <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── HA Domain Cards (5 domains) ── */}
            <div>
                <h3 style={{ fontWeight: 800, fontSize: 13, color: C.primary, marginBottom: 12, letterSpacing: 1 }}>
                    ⭐ 5 DOMAINS — HA THAILAND ACCREDITATION
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <DomainCard
                        code="PCT"
                        name_th="Patient Care Process"
                        desc="กระบวนการดูแลผู้ป่วย — Readmission, Mortality, ALOS, CMI"
                        score={a.domains?.pct}
                        color={C.primary}
                        indicators={[
                            { label: 'Readmit 28d', value: pct(a.readmit_rate), alert: a.readmit_rate > 5 },
                            { label: 'Mortality', value: pct(a.mortality_rate), alert: a.mortality_rate > 2 },
                            { label: 'ALOS', value: `${fmt(a.alos)} วัน`, alert: a.alos > 5 },
                            { label: 'CMI', value: fmt(a.cmi, 2) },
                        ]}
                    />
                    <DomainCard
                        code="IC"
                        name_th="Infection Control"
                        desc="การควบคุมการติดเชื้อ — HAI Rate แยกตามประเภท"
                        score={a.domains?.ic}
                        color={C.yellow}
                        indicators={[
                            { label: 'HAI Rate', value: pct(a.hai_rate), alert: a.hai_rate > 1 },
                            { label: 'BSI', value: a.hai_types?.bsi ?? '—', alert: (a.hai_types?.bsi ?? 0) > 0 },
                            { label: 'SSI', value: a.hai_types?.ssi ?? '—', alert: (a.hai_types?.ssi ?? 0) > 0 },
                            { label: 'VAP', value: a.hai_types?.pna ?? '—', alert: (a.hai_types?.pna ?? 0) > 0 },
                        ]}
                    />
                    <DomainCard
                        code="MED"
                        name_th="Medication Safety"
                        desc="ความปลอดภัยด้านยา — ADR, Polypharmacy"
                        score={a.domains?.med}
                        color={C.green}
                        indicators={[
                            { label: 'ADR Rate', value: pct(a.adr_rate), alert: a.adr_rate > 2 },
                            { label: 'ADR Cases', value: a.adr_count ?? '—', alert: (a.adr_count ?? 0) > 5 },
                        ]}
                    />
                    <DomainCard
                        code="ENV"
                        name_th="Environment & Discharge Planning"
                        desc="สิ่งแวดล้อมและแผนการจำหน่าย — AMA Rate, Discharge Planning"
                        score={a.domains?.env}
                        color={C.blue}
                        indicators={[
                            { label: 'AMA Rate', value: pct(a.ama_rate), alert: a.ama_rate > 3 },
                            { label: 'Dch Plan', value: pct(a.dch_plan_rate), alert: a.dch_plan_rate < 95 },
                        ]}
                    />
                    <DomainCard
                        code="IM"
                        name_th="Information Management"
                        desc="การจัดการข้อมูล — ความครบถ้วนของเอกสารทางการแพทย์"
                        score={a.domains?.im}
                        color={C.purple}
                        indicators={[
                            { label: 'Doc Complete', value: pct(a.doc_completeness), alert: a.doc_completeness < 90 },
                            { label: 'Diag Coded', value: pct(a.diag_coded_rate), alert: a.diag_coded_rate < 95 },
                        ]}
                    />
                </div>
            </div>

            {/* ── QPI Radar + Ward Breakdown ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 8, letterSpacing: 1 }}>
                        ⭐ HA DOMAIN RADAR
                    </h3>
                    <DomainRadar domains={a.domains} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginTop: 8 }}>
                        {[
                            { code: 'PCT', score: a.domains?.pct },
                            { code: 'IC', score: a.domains?.ic },
                            { code: 'MED', score: a.domains?.med },
                            { code: 'ENV', score: a.domains?.env },
                            { code: 'IM', score: a.domains?.im },
                        ].map(({ code, score }) => {
                            const s = score ?? 0;
                            const c = s >= 85 ? C.green : s >= 70 ? C.yellow : C.primary;
                            return (
                                <div key={code} style={{ textAlign: 'center', padding: '4px 0' }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: c }}>{s.toFixed(0)}</div>
                                    <div style={{ fontSize: 9, color: C.gray }}>{code}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 8, letterSpacing: 1 }}>
                        🏥 WARD BREAKDOWN
                    </h3>
                    <div style={{ overflowY: 'auto', maxHeight: 280 }}>
                        <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: C.light }}>
                                    {['Ward', 'จำหน่าย', 'Readmit', 'Death', 'ALOS'].map(h => (
                                        <th key={h} style={{ padding: '4px 6px', textAlign: 'center', color: C.gray, fontWeight: 700 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {(a.ward_breakdown || []).map((w, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '4px 6px', fontWeight: 600, color: C.primary, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.ward_name || w.ward}</td>
                                        <td style={{ padding: '4px 6px', textAlign: 'center' }}>{w.discharges}</td>
                                        <td style={{ padding: '4px 6px', textAlign: 'center', color: w.readmit > 0 ? C.primary : 'inherit' }}>{w.readmit ?? 0}</td>
                                        <td style={{ padding: '4px 6px', textAlign: 'center', color: w.deaths > 0 ? '#7c3aed' : 'inherit' }}>{w.deaths ?? 0}</td>
                                        <td style={{ padding: '4px 6px', textAlign: 'center' }}>{fmt(w.alos)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── Top Readmission Diagnoses ── */}
            {(a.top_readmit_diag || []).length > 0 && (
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 12, letterSpacing: 1 }}>
                        🔄 TOP 10 READMISSION DIAGNOSES (30 วัน)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {a.top_readmit_diag.slice(0, 10).map((d, i) => {
                            const maxCount = a.top_readmit_diag[0]?.count || 1;
                            const pctWidth = ((d.count / maxCount) * 100).toFixed(0);
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                                    <span style={{ width: 20, color: C.gray, fontWeight: 700, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
                                    <span style={{ width: 60, fontFamily: 'monospace', fontWeight: 700, color: C.primary, flexShrink: 0 }}>{d.icd10}</span>
                                    <span style={{ flex: 1, color: '#374151', fontSize: 10 }}>{d.diagnosis || d.icd10_name || d.icd10}</span>
                                    <div style={{ width: 100, height: 6, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden', flexShrink: 0 }}>
                                        <div style={{ width: `${pctWidth}%`, height: '100%', background: C.primary, borderRadius: 99 }} />
                                    </div>
                                    <span style={{ width: 28, textAlign: 'right', fontWeight: 700, color: C.primary, flexShrink: 0 }}>{d.count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Monthly Trend ── */}
            {(a.monthly_trend || []).length > 0 && (
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 12, letterSpacing: 1 }}>
                        📈 MONTHLY QUALITY TREND (12 เดือน)
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={a.monthly_trend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip contentStyle={{ fontSize: 11 }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                            <ReferenceLine y={5} stroke={C.primary} strokeDasharray="4 4" label={{ value: 'Readmit 5%', fontSize: 9, fill: C.primary }} />
                            <Line type="monotone" dataKey="readmit_rate" name="Readmit %" stroke={C.primary} strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="mortality_rate" name="Mortality %" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="hai_rate" name="HAI %" stroke={C.yellow} strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="ama_rate" name="AMA %" stroke={C.blue} strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* ── Fiscal Year Discharge Volume ── */}
            {(f.fiscal_trend || []).length > 0 && (
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 12, letterSpacing: 1 }}>
                        📊 DISCHARGE VOLUME BY FISCAL YEAR
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={f.fiscal_trend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month_label" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip contentStyle={{ fontSize: 11 }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                            {(f.fiscal_years || []).map((fy, i) => {
                                const colors = [C.primary, C.blue, C.green];
                                return (
                                    <Bar key={fy} dataKey={fy} name={`FY${fy}`} fill={colors[i % 3]} radius={[3, 3, 0, 0]} />
                                );
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* ── Revenue Fiscal Summary ── */}
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderLeft: `4px solid ${C.primary}` }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: C.primary, marginBottom: 12, letterSpacing: 1 }}>
                    💰 QUALITY & REVENUE FISCAL SUMMARY
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                    {[
                        { label: 'ALOS เฉลี่ย', value: `${(a.alos ?? 0).toFixed(1)} วัน`, color: (a.alos ?? 5) <= 5 ? C.green : C.yellow },
                        { label: 'CMI (Case Mix)', value: (a.cmi ?? 0).toFixed(2), color: C.blue },
                        { label: 'Census Today', value: `${t.census_today ?? t.admitted_today ?? 0}`, color: C.primary },
                        { label: 'Overstay >14d', value: `${t.overstay_today ?? 0}`, color: (t.overstay_today ?? 0) > 0 ? C.yellow : C.green },
                        { label: 'Critical Labs', value: `${t.critical_labs_today ?? 0}`, color: (t.critical_labs_today ?? 0) > 0 ? C.primary : C.green },
                        { label: 'Doc Completeness', value: `${(a.doc_completeness ?? 0).toFixed(1)}%`, color: (a.doc_completeness ?? 100) >= 90 ? C.green : C.yellow },
                    ].map(({ label, value, color }) => (
                        <div key={label} style={{
                            background: '#fff', borderRadius: 12, padding: '0.75rem 1rem',
                            border: `1px solid ${color}30`, textAlign: 'center'
                        }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
                            <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── KPI Description Cards ── */}
            <KPIDescriptionCards kpis={enrichedKPIs} accentColor={C.primary} title="ตัวชี้วัดคุณภาพ HA Thailand" />
        </div>
    );
}

export default React.memo(QualityTab);
