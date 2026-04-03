// ============================================================
// BCH 360° Intelligence V.10 — Medical Record Audit Tab
// ออกแบบใหม่: แบ่งส่วน OPD / IPD / Coder Performance ชัดเจน
// ============================================================
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
    LineChart, Line, Legend, CartesianGrid, ReferenceLine,
    PieChart, Pie, Cell
} from 'recharts';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';

// ─── Color tokens ────────────────────────────────────────────
const C = {
    opd:    '#0284c7',   // blue
    ipd:    '#059669',   // emerald
    coder:  '#7c3aed',   // violet
    warn:   '#f59e0b',
    danger: '#e11d48',
    ok:     '#10b981',
    text:   'var(--md-text-primary)',
    sub:    'var(--md-text-secondary)',
    muted:  'var(--md-text-tertiary)',
    surface:'var(--md-surface)',
    border: 'var(--md-border)',
    bg:     'var(--md-bg)',
};

const CODER_PALETTE = ['#e11d48','#0284c7','#059669','#f59e0b','#7c3aed','#0ea5e9','#ec4899'];

// ─── Helpers ─────────────────────────────────────────────────
function scoreColor(v) {
    if (v >= 90) return C.ok;
    if (v >= 70) return C.warn;
    return C.danger;
}

function fmt(n, decimals = 0) {
    if (n == null || n === '') return '—';
    const num = Number(n);
    if (isNaN(num)) return '—';
    return num.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// ─── Section wrapper ─────────────────────────────────────────
function Section({ color, icon, title, sub, badge, children }) {
    return (
        <div style={{
            borderRadius: '20px',
            border: `1px solid ${color}30`,
            overflow: 'hidden',
            background: C.surface,
            boxShadow: `0 4px 24px ${color}12`,
        }}>
            {/* Header bar */}
            <div style={{
                padding: '1.25rem 1.75rem',
                background: `linear-gradient(135deg, ${color}14 0%, ${color}06 100%)`,
                borderBottom: `2px solid ${color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '8px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '20px', boxShadow: `0 4px 12px ${color}40`,
                    }}>{icon}</div>
                    <div>
                        <div style={{ fontSize: '17px', fontWeight: 900, color: C.text, letterSpacing: '-0.01em' }}>{title}</div>
                        {sub && <div style={{ fontSize: '12px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{sub}</div>}
                    </div>
                </div>
                {badge && (
                    <span style={{
                        fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                        color, background: `${color}18`, border: `1px solid ${color}30`,
                        padding: '4px 12px', borderRadius: '99px',
                    }}>{badge}</span>
                )}
            </div>
            {/* Body */}
            <div style={{ padding: '1.5rem 1.75rem' }}>{children}</div>
        </div>
    );
}

// ─── KPI card ────────────────────────────────────────────────
function KPICard({ icon, label, value, sub, color, size = 'md', progress, target }) {
    const valSize = size === 'lg' ? '36px' : '28px';
    return (
        <div style={{
            borderRadius: '16px', padding: '1.25rem',
            background: C.bg,
            border: `1px solid ${C.border}`,
            display: 'flex', flexDirection: 'column', gap: '6px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted }}>{label}</span>
                <span style={{ fontSize: '20px' }}>{icon}</span>
            </div>
            <div style={{ fontSize: valSize, fontWeight: 900, color: color || C.text, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
            {sub && <div style={{ fontSize: '12px', color: C.sub, fontWeight: 600 }}>{sub}</div>}
            {progress != null && (
                <div>
                    <div style={{ height: '4px', background: `${color}20`, borderRadius: '4px', overflow: 'hidden', marginTop: '6px' }}>
                        <div style={{ height: '100%', width: `${Math.min(progress, 100)}%`, background: color, borderRadius: '4px', transition: 'width 0.6s ease' }} />
                    </div>
                    {target && <div style={{ fontSize: '10px', color: C.muted, fontWeight: 600, marginTop: '4px' }}>{target}</div>}
                </div>
            )}
        </div>
    );
}

// ─── Score ring ──────────────────────────────────────────────
function ScoreRing({ score, label, color }) {
    const pct = Math.min(score ?? 0, 100);
    const circ = 2 * Math.PI * 16;
    const dash = (pct / 100) * circ;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="80" height="80" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="16" fill="none" stroke={`${color}20`} strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke={color} strokeWidth="3"
                    strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.8s ease' }} />
            </svg>
            <div style={{ marginTop: '-68px', textAlign: 'center', zIndex: 1, position: 'relative' }}>
                <div style={{ fontSize: '18px', fontWeight: 900, color, lineHeight: 1, paddingTop: '24px' }}>{score ?? '—'}%</div>
            </div>
            <div style={{ marginTop: '4px', fontSize: '11px', fontWeight: 700, color: C.muted, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
        </div>
    );
}

// ─── Status badge ────────────────────────────────────────────
function Badge({ label, color }) {
    return (
        <span style={{
            fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
            color, background: `${color}18`, border: `1px solid ${color}30`,
            padding: '2px 8px', borderRadius: '99px',
        }}>{label}</span>
    );
}

// ─── Coder row ───────────────────────────────────────────────
function CoderRow({ rank, name, count, total, color, extra }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
            <div style={{
                width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                background: rank <= 3 ? color : `${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 900, color: rank <= 3 ? '#fff' : color,
            }}>{rank}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                <div style={{ height: '4px', background: `${color}20`, borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px' }} />
                </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color, lineHeight: 1 }}>{count.toLocaleString()}</div>
                {extra && <div style={{ fontSize: '10px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{extra}</div>}
            </div>
        </div>
    );
}

// ─── Mini divider ─────────────────────────────────────────────
function Divider() {
    return <div style={{ height: '1px', background: C.border, margin: '1.25rem 0' }} />;
}

// ─── Main Component ───────────────────────────────────────────
function MedRecTab() {
    const state = useShallowDashboardSelector(s => ({ medRecToday: s.medRecToday, medRecAnalytics: s.medRecAnalytics, medRecDrgOpt: s.medRecDrgOpt, medRecFiscal: s.medRecFiscal, medRecHeatmap: s.medRecHeatmap, medRecTATrend: s.medRecTATrend, medRecRecovery: s.medRecRecovery }));
    const { fetchData } = useDashboardActions();
    const today    = state.medRecToday    || {};
    const analytics = state.medRecAnalytics || {};

    const medRecDrgOpt = state.medRecDrgOpt || {};
    const drgOpt = medRecDrgOpt;
    const medRecFiscal = state.medRecFiscal || {};

    useEffect(() => {
        fetchData('medRecToday',    '/api/medrec/today');
        fetchData('medRecAnalytics','/api/medrec/analytics');
        fetchData('medRecDrgOpt',   '/api/medrec/drg-optimization');
        fetchData('medRecFiscal',   '/api/medrec/revenue-fiscal');
        fetchData('medRecHeatmap', '/api/medrec/coding-heatmap');
        fetchData('medRecTATrend', '/api/medrec/turnaround-trend');
        fetchData('medRecRecovery', '/api/medrec/revenue-recovery');
    }, [fetchData]);

    // ── Hourly chart data ──
    const hourlyData = useMemo(() => (today.hourly || []).filter(h => h.hour >= 6 && h.hour <= 20), [today.hourly]);

    // ── IPD coder fiscal trend (monthly) ──
    const { trendData, trendCoders, fiscalLabel } = useMemo(() => {
        if (!today.ipd_coders_trend_fy?.length) return { trendData: [], trendCoders: [], fiscalLabel: '' };
        const TH = ['','ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
        const monthMap = {};
        const codersSet = new Set();
        today.ipd_coders_trend_fy.forEach(r => {
            const [, m] = r.month.split('-');
            const key = r.month;
            if (!monthMap[key]) monthMap[key] = { month: key, label: TH[parseInt(m)] || r.month };
            monthMap[key][r.name] = r.count;
            codersSet.add(r.name);
        });
        const data = Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
        const coderTotals = Array.from(codersSet).map(name => ({
            name,
            total: today.ipd_coders_trend_fy.filter(r => r.name === name).reduce((s, r) => s + r.count, 0),
        })).sort((a, b) => b.total - a.total).slice(0, 5);
        const now = new Date();
        const fyStart = now.getMonth() >= 9 ? now.getFullYear() : now.getFullYear() - 1;
        return { trendData: data, trendCoders: coderTotals.map(c => c.name), fiscalLabel: `ปีงบ ${fyStart + 1 + 543}` };
    }, [today.ipd_coders_trend_fy]);

    const opdTotal      = today.audit_total ?? 0;
    const opdCoded      = today.audit_coded ?? 0;
    const opdPending    = today.pending_codes ?? 0;
    const opdScore      = today.quality_score ?? 0;

    const ipdTotal      = today.ipd_audit_total ?? 0;
    const ipdCoded      = today.ipd_audit_coded ?? 0;
    const ipdPending    = today.ipd_pending_codes ?? 0;
    const ipdScore      = today.ipd_quality_score ?? 0;
    const ipdDrgScore   = today.ipd_drg_score ?? 0;
    const ipdTotalRW    = today.ipd_total_rw ?? 0;
    const ipdAvgRW      = today.ipd_avg_rw ?? 0;
    const ipdCMI        = today.ipd_cmi ?? 0;
    const ipdAdjCMI     = today.ipd_adj_cmi ?? 0;
    const ipdBaseRW     = today.ipd_total_base_rw ?? 0;
    const ipdRWLoss     = today.ipd_rw_loss ?? 0;
    const ipdRWReduced  = today.ipd_rw_reduced_cases ?? 0;
    const ipdAvgDays    = today.ipd_avg_coding_days ?? 0;

    const opdCoders     = today.coders        || [];
    const ipdCoders     = today.ipd_coders_fiscal || today.ipd_coders || [];
    const pendingWards  = today.pending_wards  || [];

    // ── MetricsStrip (8 KPIs) ──
    const metricsStripData = useMemo(() => [
        { label: 'OPD Coded', value: `${opdScore}%`, icon: '✅', status: opdScore >= 90 ? 'success' : opdScore >= 70 ? 'warning' : 'critical', target: 'เป้า ≥95%' },
        { label: 'IPD Coding', value: `${ipdScore}%`, icon: '📊', status: ipdScore >= 90 ? 'success' : ipdScore >= 70 ? 'warning' : 'critical', target: 'เป้า ≥95%' },
        { label: 'DRG Rate', value: `${ipdDrgScore}%`, icon: '🧮', status: ipdDrgScore >= 90 ? 'success' : ipdDrgScore >= 70 ? 'warning' : 'critical', target: 'เป้า 100%' },
        { label: 'CMI', value: ipdCMI ? ipdCMI.toFixed(3) : '—', icon: '🎯', status: ipdCMI >= 1.0 ? 'success' : ipdCMI >= 0.8 ? 'normal' : 'warning', target: 'Benchmark ≥0.8' },
        { label: 'AdjCMI', value: ipdAdjCMI ? ipdAdjCMI.toFixed(3) : '—', icon: '📐', status: ipdAdjCMI >= ipdCMI ? 'success' : 'warning', target: ipdAdjCMI >= ipdCMI ? 'ไม่ถูกปรับลด' : 'ถูกปรับลด' },
        { label: 'Total RW', value: fmt(ipdTotalRW, 2), icon: '⚖️', gradient: '#059669', status: 'normal', target: '30 วัน' },
        { label: 'RW Loss', value: ipdRWLoss > 0 ? `-${fmt(ipdRWLoss, 2)}` : '0', unit: `(${ipdRWReduced} cases)`, icon: '📉', status: ipdRWLoss > 5 ? 'critical' : ipdRWLoss > 0 ? 'warning' : 'success', target: 'ถูกปรับลดจาก LOS' },
        { label: 'Coding Days', value: ipdAvgDays ? `${fmt(ipdAvgDays, 1)}` : '—', unit: 'วัน', icon: '⏱️', status: (ipdAvgDays ?? 0) <= 3 ? 'success' : 'warning', target: 'เป้า ≤3 วัน' },
    ], [today, opdScore, ipdScore, ipdDrgScore, ipdCMI, ipdAdjCMI, ipdTotalRW, ipdRWLoss, ipdRWReduced, ipdAvgDays]);

    // ── AI Insight Cards (4 cards) ──
    const aiCards = useMemo(() => {
        const mriScore = Math.round((opdScore + ipdScore + ipdDrgScore) / 3);
        const drgOpt = medRecDrgOpt;

        return [
            {
                title: 'MRI Score (Medical Record Index)',
                icon: '⭐',
                priority: mriScore >= 90 ? 'LOW' : mriScore >= 70 ? 'MEDIUM' : 'HIGH',
                summary: `MRI ${mriScore}/100 -- คำนวณจาก OPD Coding (${opdScore}%) + IPD Coding (${ipdScore}%) + DRG Rate (${ipdDrgScore}%) -- ${mriScore >= 90 ? 'ดีเยี่ยม ครบถ้วนทุกมิติ' : mriScore >= 70 ? 'มาตรฐาน ต้องปรับปรุงบางจุด' : 'ต่ำกว่าเกณฑ์ ต้องเร่งแก้ไข'}`,
                analysis: `OPD Audit: ${fmt(opdCoded)}/${fmt(opdTotal)} coded (${opdScore}%) | IPD Audit: ${fmt(ipdCoded)}/${fmt(ipdTotal)} coded (${ipdScore}%) | DRG Calculated: ${ipdDrgScore}% | Avg Coding Time: ${ipdAvgDays ? fmt(ipdAvgDays, 1) : '—'} วัน`,
                recommendation: mriScore >= 90 ? 'คงมาตรฐาน ทำ Internal audit ทุกเดือน ลดเวลาสรุปรหัสให้ <2 วัน' : 'เร่งสรุปรหัสค้าง: (1) Assign pending cases (2) อบรม Coder ใหม่ (3) AI-assisted coding',
                gradient: '#059669',
                gradientFrom: 'rgba(5,150,105,.08)',
                gradientTo: 'rgba(2,132,199,.04)',
                borderColor: 'rgba(5,150,105,.25)',
                confidence: 93,
            },
            {
                title: 'Coding Accuracy & Completeness',
                icon: '🎯',
                priority: opdPending > 20 || ipdPending > 10 ? 'HIGH' : opdPending > 5 || ipdPending > 3 ? 'MEDIUM' : 'LOW',
                summary: `OPD Pending: ${fmt(opdPending)} ราย | IPD Pending: ${fmt(ipdPending)} ราย -- ${opdPending === 0 && ipdPending === 0 ? 'ไม่มีค้างสรุปรหัส' : 'มีรหัสค้างที่ต้องดำเนินการ'}`,
                analysis: `OPD: ${opdPending > 0 ? `${fmt(opdPending)} ราย pending revenue ≈ ฿${today.pending_revenue ? Number(today.pending_revenue).toLocaleString() : '—'}` : 'ไม่มีค้าง'} | IPD: ${ipdPending > 0 ? `${fmt(ipdPending)} ราย pending — wards: ${pendingWards.slice(0, 3).map(w => w.ward).join(', ') || 'N/A'}` : 'ไม่มีค้าง'}`,
                recommendation: opdPending > 0 || ipdPending > 0 ? 'เร่ง Clear pending: (1) กระจาย workload ให้ Coders (2) Priority: IPD cases ก่อน (impact DRG) (3) Timeline: ภายในวันนี้' : 'คงมาตรฐาน สรุปรหัสภายใน SLA ทุกวัน',
                gradient: '#0284c7',
                gradientFrom: 'rgba(2,132,199,.08)',
                gradientTo: 'rgba(14,165,233,.04)',
                borderColor: 'rgba(2,132,199,.25)',
                confidence: 90,
            },
            {
                title: 'CMI & DRG Intelligence',
                icon: '🎯',
                priority: ipdCMI < 0.7 ? 'HIGH' : ipdCMI < 0.8 ? 'MEDIUM' : 'LOW',
                summary: `CMI ${ipdCMI.toFixed(3)} (Benchmark ≥0.80) | AdjCMI ${ipdAdjCMI.toFixed(3)} | RW Loss: ${ipdRWLoss > 0 ? '-' + fmt(ipdRWLoss, 2) + ' (' + ipdRWReduced + ' cases)' : 'ไม่มี'} -- ${ipdCMI >= 0.8 ? 'CMI ≥ Benchmark ดี' : 'CMI ต่ำกว่า Benchmark ตรวจสอบ CC/MCC'}`,
                analysis: `CMI (Base RW): ${ipdCMI.toFixed(3)} | AdjCMI (หลังปรับ LOS): ${ipdAdjCMI.toFixed(3)} | Base RW รวม: ${fmt(ipdBaseRW, 2)} | AdjRW รวม: ${fmt(ipdTotalRW, 2)} | ${ipdRWLoss > 0 ? `ถูกปรับลด ${fmt(ipdRWLoss, 2)} RW (${ipdRWReduced} cases) ≈ ฿${fmt(Math.round(ipdRWLoss * 8350))}` : 'ไม่ถูกปรับลด RW'} | DRG Rate: ${ipdDrgScore}%`,
                recommendation: ipdCMI < 0.8 ? 'เพิ่ม CMI: (1) ตรวจสอบ CC/MCC ทุก case income >20K (2) Review Unspecified PDx (3) เป้า CMI ≥0.80' : ipdRWLoss > 5 ? `RW ถูกปรับลด ${fmt(ipdRWLoss, 2)} — ตรวจสอบ LOS trimpoint และ AdjRW criteria` : 'CMI & DRG อยู่ในเกณฑ์ดี — Focus: CC/MCC completeness + DRG grouper alignment',
                gradient: '#7c3aed',
                gradientFrom: 'rgba(124,58,237,.08)',
                gradientTo: 'rgba(99,102,241,.04)',
                borderColor: 'rgba(124,58,237,.25)',
                confidence: 88,
            },
            {
                title: 'Staff Productivity Analysis',
                icon: '👩‍💻',
                priority: (ipdAvgDays ?? 0) > 5 ? 'HIGH' : (ipdAvgDays ?? 0) > 3 ? 'MEDIUM' : 'LOW',
                summary: `Avg Coding Time: ${ipdAvgDays ? fmt(ipdAvgDays, 1) : '—'} วัน | OPD Coders: ${opdCoders.length} | IPD Coders: ${ipdCoders.length} -- ${(ipdAvgDays ?? 0) <= 3 ? 'Turnaround ดี ภายใน SLA' : 'Turnaround ช้า เกิน SLA'}`,
                analysis: `OPD Top Coder: ${opdCoders[0]?.name ?? 'N/A'} (${opdCoders[0]?.count ?? 0} cases) | IPD Top Coder: ${ipdCoders[0]?.name ?? 'N/A'} (${ipdCoders[0]?.current_month_total ?? ipdCoders[0]?.count ?? 0} cases) | Workload distribution: ${opdCoders.length + ipdCoders.length} active coders`,
                recommendation: (ipdAvgDays ?? 0) > 3 ? 'ลด Turnaround: (1) Assign deadline per case (2) เพิ่ม Coder / AI-assist (3) Priority queue for IPD (4) เป้า ≤2 วัน' : 'คงมาตรฐาน ทำ Performance Dashboard รายสัปดาห์ แจกรางวัล Top Coder',
                gradient: '#f59e0b',
                gradientFrom: 'rgba(245,158,11,.08)',
                gradientTo: 'rgba(234,179,8,.04)',
                borderColor: 'rgba(245,158,11,.25)',
                confidence: 86,
            },
        ];
    }, [today, opdScore, opdTotal, opdCoded, opdPending, ipdTotal, ipdCoded, ipdPending, ipdScore, ipdDrgScore, ipdTotalRW, ipdAvgRW, ipdCMI, ipdAdjCMI, ipdBaseRW, ipdRWLoss, ipdRWReduced, ipdAvgDays, opdCoders, ipdCoders, pendingWards, medRecDrgOpt]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>

            {/* ══════════════════════════════════════════
                MetricsStrip — 8 KPI Overview
            ══════════════════════════════════════════ */}
            <MetricsStrip metrics={metricsStripData} />

            {/* ══════════════════════════════════════════
                AI Analytics Cards — 4 Intelligence Panels
            ══════════════════════════════════════════ */}
            <SubErrorBoundary name="AI Medical Record Intelligence">
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                        width: '4px', height: '20px', borderRadius: '4px',
                        background: 'linear-gradient(180deg, #059669, #7c3aed)',
                    }} />
                    <span style={{ fontSize: '14px', fontWeight: 900, color: C.text, letterSpacing: '-0.01em' }}>
                        🧠 AI Medical Record Intelligence
                    </span>
                    <Badge label="4 Analytics Modules" color={C.ipd} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                    {aiCards.map((card, i) => (
                        <AIInsightCard key={i} {...card} />
                    ))}
                </div>
            </div>
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════
                TOP BAR — Live status
            ══════════════════════════════════════════ */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '12px',
                padding: '1rem 1.5rem', borderRadius: '16px',
                background: C.surface, border: `1px solid ${C.border}`,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px', height: '44px', borderRadius: '14px',
                        background: 'linear-gradient(135deg, #059669, #0284c7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '22px', boxShadow: '0 4px 16px rgba(5,150,105,.3)',
                    }}>📇</div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: C.text, letterSpacing: '-0.01em' }}>
                            Medical Record Audit
                        </div>
                        <div style={{ fontSize: '12px', color: C.muted, fontWeight: 600 }}>
                            วิเคราะห์ประสิทธิภาพการสรุปรหัสโรค — HOSxP XE Live
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Badge label="OPD Live" color={C.opd} />
                    <Badge label="IPD 30 วัน" color={C.ipd} />
                    <Badge label={`อัปเดต ${today.timestamp ? new Date(today.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '—'}`} color={C.muted} />
                </div>
            </div>

            {/* ══════════════════════════════════════════
                SECTION 1 — OPD
            ══════════════════════════════════════════ */}
            <Section color={C.opd} icon="🔵" title="OPD — ผู้ป่วยนอก" sub="Out-Patient Department · ข้อมูลวันนี้" badge="วันนี้ Real-time">

                {/* KPI Row 1 — Volume */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                    <KPICard icon="👥" label="ผู้มาตรวจทั้งหมด" value={fmt(today.total_visits)} sub={`${fmt(today.unique_patients)} HN ไม่ซ้ำ`} color={C.opd} size="lg" />
                    <KPICard icon="🆕" label="ผู้ป่วยใหม่" value={fmt(today.new_patients)}
                        sub={`${today.total_visits > 0 ? Math.round((today.new_patients / today.total_visits) * 100) : 0}% ของวันนี้`}
                        color={C.opd} progress={today.total_visits > 0 ? (today.new_patients / today.total_visits) * 100 : 0} />
                    <KPICard icon="🔄" label="ผู้ป่วยเก่า" value={fmt(today.old_patients)}
                        sub={`${today.total_visits > 0 ? Math.round((today.old_patients / today.total_visits) * 100) : 0}% ของวันนี้`}
                        color="#64748b" />
                    <KPICard icon="👴" label="ผู้สูงอายุ (≥60)" value={fmt(today.elderly)}
                        sub={`เด็ก (≤15) ${fmt(today.children)} ราย`}
                        color={C.warn} />
                    <KPICard icon="⏱️" label="รอรับบัตร (เฉลี่ย)" value={today.avg_reg_time ? `${fmt(today.avg_reg_time, 1)} น.` : '—'}
                        sub="ตั้งแต่ลงทะเบียน" color={today.avg_reg_time > 30 ? C.danger : C.ok} />
                    <KPICard icon="⏳" label="รอพบแพทย์ (เฉลี่ย)" value={today.avg_proc_time ? `${fmt(today.avg_proc_time, 1)} น.` : '—'}
                        sub="ตั้งแต่เรียกคิว" color={today.avg_proc_time > 60 ? C.danger : C.ok} />
                </div>

                <Divider />

                {/* KPI Row 2 — Audit */}
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '16px', flexWrap: 'wrap' }}>
                    {/* Score ring */}
                    <div style={{
                        padding: '1.25rem 1.5rem', borderRadius: '16px', background: C.bg, border: `1px solid ${C.border}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '140px',
                    }}>
                        <ScoreRing score={opdScore} label="Audit OPD" color={scoreColor(opdScore)} />
                        <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: 700, color: C.muted, textAlign: 'center' }}>
                            {opdScore >= 90 ? '✅ ผ่านเกณฑ์' : opdScore >= 70 ? '⚠️ ต้องปรับปรุง' : '❌ ต่ำกว่าเกณฑ์'}
                        </div>
                    </div>

                    {/* Audit breakdown */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                        <KPICard icon="📋" label="OPD ทั้งหมดวันนี้" value={fmt(opdTotal)} color={C.opd} />
                        <KPICard icon="✅" label="Coded แล้ว" value={fmt(opdCoded)} sub={`${opdTotal > 0 ? Math.round((opdCoded / opdTotal) * 100) : 0}%`}
                            color={C.ok} progress={opdTotal > 0 ? (opdCoded / opdTotal) * 100 : 0} target={`เป้า 100%`} />
                        <KPICard icon="🔴" label="รอสรุปรหัส" value={fmt(opdPending)}
                            color={opdPending > 0 ? C.danger : C.ok}
                            sub={opdPending > 0 ? 'ต้องดำเนินการ' : 'เรียบร้อย'} />
                        <KPICard icon="💰" label="รายได้รอสรุปรหัส" value={today.pending_revenue > 0 ? `฿${Number(today.pending_revenue).toLocaleString()}` : '—'}
                            color={C.warn} sub="วันนี้" />
                    </div>
                </div>

                <Divider />

                {/* OPD Charts row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {/* Hourly */}
                    <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '1rem' }}>📈 ผู้ป่วยรายชั่วโมง (06:00–20:00)</div>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={hourlyData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={`${C.opd}15`} vertical={false} />
                                <XAxis dataKey="label" tick={{ fontSize: 9, fill: C.muted }} interval={2} />
                                <YAxis tick={{ fontSize: 9, fill: C.muted }} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}` }} />
                                <Bar dataKey="count" fill={C.opd} radius={[4, 4, 0, 0]} name="ผู้ป่วย" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* OPD Coders today */}
                    <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '0.5rem' }}>👩‍💻 OPD Coders วันนี้</div>
                        {opdCoders.length === 0 ? (
                            <div style={{ textAlign: 'center', color: C.muted, fontSize: '13px', padding: '2rem 0' }}>ยังไม่มีข้อมูล</div>
                        ) : (
                            opdCoders.map((c, i) => (
                                <CoderRow key={i} rank={i + 1} name={c.name} count={c.count}
                                    total={opdCoders.reduce((s, x) => s + x.count, 0)}
                                    color={CODER_PALETTE[i % CODER_PALETTE.length]} />
                            ))
                        )}
                    </div>

                    {/* Top departments */}
                    <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '0.5rem' }}>🏢 แผนก Top 5 (วันนี้)</div>
                        {(today.top_departments || []).map((d, i) => (
                            <CoderRow key={i} rank={i + 1} name={d.name} count={d.count}
                                total={(today.top_departments || []).reduce((s, x) => s + x.count, 0)}
                                color={C.opd} />
                        ))}
                        {(today.top_departments || []).length === 0 && (
                            <div style={{ textAlign: 'center', color: C.muted, fontSize: '13px', padding: '2rem 0' }}>ยังไม่มีข้อมูล</div>
                        )}
                    </div>
                </div>
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 2 — IPD
            ══════════════════════════════════════════ */}
            <Section color={C.ipd} icon="🟢" title="IPD — ผู้ป่วยใน" sub="In-Patient Department · จำหน่าย 30 วันล่าสุด" badge="30 วันล่าสุด">

                {/* Score rings row */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'flex', gap: '24px', flexWrap: 'wrap',
                        padding: '1.25rem 2rem', borderRadius: '16px',
                        background: C.bg, border: `1px solid ${C.border}`,
                    }}>
                        <ScoreRing score={ipdScore}    label="Coding Completeness" color={scoreColor(ipdScore)} />
                        <ScoreRing score={ipdDrgScore} label="DRG Calculated"       color={scoreColor(ipdDrgScore)} />
                    </div>

                    {/* KPI mini row */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                        <KPICard icon="📁" label="IPD จำหน่าย 30 วัน" value={fmt(ipdTotal)} color={C.ipd} size="lg" />
                        <KPICard icon="✅" label="Coded แล้ว" value={fmt(ipdCoded)}
                            sub={`${ipdTotal > 0 ? Math.round((ipdCoded / ipdTotal) * 100) : 0}%`}
                            color={C.ok} progress={ipdTotal > 0 ? (ipdCoded / ipdTotal) * 100 : 0} target="เป้า 100%" />
                        <KPICard icon="🔴" label="ยังไม่สรุปรหัส" value={fmt(ipdPending)}
                            color={ipdPending > 0 ? C.danger : C.ok}
                            sub={ipdPending > 0 ? 'ต้องดำเนินการ' : 'เรียบร้อย'} />
                        <KPICard icon="⏱️" label="เวลาเฉลี่ยสรุปรหัส" value={ipdAvgDays ? `${fmt(ipdAvgDays, 1)} วัน` : '—'}
                            color={ipdAvgDays > 3 ? C.warn : C.ok} sub="หลังจำหน่าย" />
                    </div>
                </div>

                <Divider />

                {/* CMI & DRG row */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '12px' }}>
                        🎯 Case Mix Index (CMI) & DRG
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                        <KPICard icon="🎯" label="CMI (Base RW)" value={ipdCMI ? ipdCMI.toFixed(3) : '—'} color={ipdCMI >= 0.8 ? C.ok : C.warn} size="lg"
                            sub={ipdCMI >= 1.0 ? '✅ Excellent' : ipdCMI >= 0.8 ? '✅ ≥ Benchmark' : '⚠️ ต่ำกว่า 0.80'} />
                        <KPICard icon="📐" label="AdjCMI (หลัง LOS)" value={ipdAdjCMI ? ipdAdjCMI.toFixed(3) : '—'} color={ipdAdjCMI >= ipdCMI ? C.ok : C.warn}
                            sub={ipdAdjCMI >= ipdCMI ? '✅ ไม่ถูกปรับลด' : `⚠️ ลดลง ${(ipdCMI - ipdAdjCMI).toFixed(3)}`} />
                        <KPICard icon="⚖️" label="Total RW" value={fmt(ipdTotalRW, 2)} color={C.ipd}
                            sub={`Base: ${fmt(ipdBaseRW, 2)}`} />
                        <KPICard icon="📉" label="RW ถูกปรับลด" value={ipdRWLoss > 0 ? `-${fmt(ipdRWLoss, 2)}` : '0'}
                            color={ipdRWLoss > 5 ? C.danger : ipdRWLoss > 0 ? C.warn : C.ok}
                            sub={ipdRWReduced > 0 ? `${ipdRWReduced} cases ≈ ฿${fmt(Math.round(ipdRWLoss * 8350))}` : 'ไม่มี'} />
                        <KPICard icon="🧮" label="DRG Rate" value={`${ipdDrgScore}%`}
                            color={scoreColor(ipdDrgScore)} progress={ipdDrgScore} target="เป้า 100%" />
                        <KPICard icon="🏥" label="Coding Rate" value={`${ipdScore}%`}
                            color={scoreColor(ipdScore)} progress={ipdScore} target="เป้า ≥ 95%" />
                    </div>
                </div>

                <Divider />

                {/* Pending wards + IPD coders */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '0.5rem' }}>
                            🔴 Ward ที่ยังไม่สรุปรหัส (Top 5)
                        </div>
                        {pendingWards.length === 0 ? (
                            <div style={{ textAlign: 'center', color: C.ok, fontSize: '13px', fontWeight: 700, padding: '1.5rem 0' }}>✅ ไม่มีค้างสรุปรหัส</div>
                        ) : (
                            pendingWards.map((w, i) => (
                                <CoderRow key={i} rank={i + 1} name={w.ward} count={w.count}
                                    total={pendingWards.reduce((s, x) => s + x.count, 0)}
                                    color={C.danger} extra="cases" />
                            ))
                        )}
                    </div>

                    <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '0.5rem' }}>
                            👩‍💻 IPD Coders เดือนนี้
                        </div>
                        {ipdCoders.length === 0 ? (
                            <div style={{ textAlign: 'center', color: C.muted, fontSize: '13px', padding: '2rem 0' }}>ยังไม่มีข้อมูล</div>
                        ) : (
                            ipdCoders.slice(0, 5).map((c, i) => {
                                const count = c.current_month_total ?? c.count ?? 0;
                                const total = ipdCoders.slice(0, 5).reduce((s, x) => s + (x.current_month_total ?? x.count ?? 0), 0);
                                return (
                                    <CoderRow key={i} rank={i + 1} name={c.name} count={count} total={total}
                                        color={CODER_PALETTE[i % CODER_PALETTE.length]}
                                        extra={c.cc_rate != null ? `CC ${(c.cc_rate * 100).toFixed(0)}%` : undefined} />
                                );
                            })
                        )}
                    </div>
                </div>
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 3 — Coder Performance
            ══════════════════════════════════════════ */}
            <Section color={C.coder} icon="🟣" title="Coder Performance" sub={`ประสิทธิภาพการสรุปรหัสโรค${fiscalLabel ? ` · ${fiscalLabel}` : ''}`} badge="Fiscal Year">

                {/* IPD Fiscal table */}
                {ipdCoders.length > 0 && (
                    <>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '12px' }}>
                            📊 สถิติรายบุคคล — IPD Coder ({fiscalLabel})
                        </div>
                        <div style={{ overflowX: 'auto', borderRadius: '12px', border: `1px solid ${C.border}` }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ background: `${C.coder}12`, borderBottom: `2px solid ${C.coder}25` }}>
                                        {['#','ชื่อ Coder','เดือนนี้','เดือนก่อน','ปีงบฯ รวม','CC Rate','Diag/Case','RW Type 1'].map((h, i) => (
                                            <th key={i} style={{
                                                padding: '10px 12px', textAlign: i <= 1 ? 'left' : 'center',
                                                fontSize: '10px', fontWeight: 800, textTransform: 'uppercase',
                                                letterSpacing: '0.06em', color: C.coder, whiteSpace: 'nowrap',
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ipdCoders.slice(0, 8).map((c, i) => {
                                        const cur  = c.current_month_total ?? 0;
                                        const prev = c.prev_month_total ?? 0;
                                        const diff = cur - prev;
                                        return (
                                            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? 'transparent' : `${C.coder}04` }}>
                                                <td style={{ padding: '10px 12px', fontWeight: 900, color: C.coder }}>{i + 1}</td>
                                                <td style={{ padding: '10px 12px', fontWeight: 700, color: C.text, whiteSpace: 'nowrap' }}>{c.name}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 900, color: C.coder }}>{fmt(cur)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'center', color: C.sub }}>
                                                    {fmt(prev)}
                                                    {prev > 0 && <span style={{ marginLeft: '4px', fontSize: '10px', color: diff >= 0 ? C.ok : C.danger }}>{diff >= 0 ? '▲' : '▼'}{Math.abs(diff)}</span>}
                                                </td>
                                                <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: C.text }}>{fmt(c.fiscal_total)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'center', color: c.cc_rate >= 0.5 ? C.ok : C.warn, fontWeight: 700 }}>
                                                    {c.cc_rate != null ? `${(c.cc_rate * 100).toFixed(0)}%` : '—'}
                                                </td>
                                                <td style={{ padding: '10px 12px', textAlign: 'center', color: C.sub }}>{c.diag_per_case != null ? fmt(c.diag_per_case, 1) : '—'}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'center', color: C.sub }}>{c.type1_per_case != null ? fmt(c.type1_per_case, 1) : '—'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <Divider />
                    </>
                )}

                {/* IPD Trend chart */}
                {trendData.length > 0 && (
                    <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '1rem' }}>
                            📈 แนวโน้มการสรุปรหัส IPD รายเดือน ({fiscalLabel})
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={trendData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={`${C.coder}15`} vertical={false} />
                                <XAxis dataKey="label" tick={{ fontSize: 10, fill: C.muted }} />
                                <YAxis tick={{ fontSize: 10, fill: C.muted }} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}` }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                {trendCoders.map((name, i) => (
                                    <Line key={name} type="monotone" dataKey={name} name={name}
                                        stroke={CODER_PALETTE[i % CODER_PALETTE.length]}
                                        strokeWidth={2} dot={false} connectNulls />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Summary stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '1.5rem' }}>
                    <KPICard icon="📊" label="OPD Coding Rate วันนี้" value={`${opdScore}%`}
                        color={scoreColor(opdScore)} progress={opdScore} target="เป้า ≥ 95%" />
                    <KPICard icon="📊" label="IPD Coding Rate 30 วัน" value={`${ipdScore}%`}
                        color={scoreColor(ipdScore)} progress={ipdScore} target="เป้า ≥ 95%" />
                    <KPICard icon="⚖️" label="DRG Calculation Rate" value={`${ipdDrgScore}%`}
                        color={scoreColor(ipdDrgScore)} progress={ipdDrgScore} target="เป้า 100%" />
                    <KPICard icon="⏱️" label="เวลาเฉลี่ยสรุปรหัส" value={ipdAvgDays ? `${fmt(ipdAvgDays, 1)} วัน` : '—'}
                        color={ipdAvgDays > 3 ? C.warn : C.ok} sub="หลังจำหน่าย · เป้า ≤ 3 วัน" />
                </div>
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 4 — Revenue Fiscal Summary
            ══════════════════════════════════════════ */}
            <Section color="#f59e0b" icon="💰" title="Revenue & Fiscal Summary" sub="สรุปรายได้และมูลค่า DRG ตามปีงบประมาณ" badge="Fiscal Year">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                    <KPICard icon="⚖️" label="Total RW (30 วัน)" value={fmt(ipdTotalRW, 2)} color={C.ipd} size="lg" />
                    <KPICard icon="📊" label="Avg RW / Case" value={fmt(ipdAvgRW, 2)} color={ipdAvgRW >= 1.0 ? C.ok : C.warn}
                        sub={ipdAvgRW >= 1.0 ? 'RW ≥ 1.0 ดี' : 'RW < 1.0 ตรวจสอบ'} />
                    <KPICard icon="💰" label="OPD Pending Revenue" value={today.pending_revenue > 0 ? `฿${Number(today.pending_revenue).toLocaleString()}` : '—'}
                        color={C.warn} sub="รายได้ OPD รอสรุปรหัส" />
                    <KPICard icon="📋" label="OPD Coding Rate" value={`${opdScore}%`}
                        color={scoreColor(opdScore)} progress={opdScore} target="เป้า ≥ 95%" />
                    <KPICard icon="📊" label="IPD Coding Rate" value={`${ipdScore}%`}
                        color={scoreColor(ipdScore)} progress={ipdScore} target="เป้า ≥ 95%" />
                    <KPICard icon="🧮" label="DRG Calculation" value={`${ipdDrgScore}%`}
                        color={scoreColor(ipdDrgScore)} progress={ipdDrgScore} target="เป้า 100%" />
                </div>

                {/* Fiscal Revenue Trend */}
                {(medRecFiscal.fiscal_years || []).length > 0 && (() => {
                    const years = medRecFiscal.fiscal_years;
                    const FY_COLORS = ['#94a3b8', '#059669', '#f59e0b'];
                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => { row[`fy${fi}`] = (fy.months?.[i]?.revenue || fy.months?.[i]?.rw || 0); });
                        return row;
                    });
                    return (
                        <div style={{ borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}`, padding: '1rem' }}>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: C.text, marginBottom: '1rem' }}>
                                📈 Fiscal Year Revenue / RW Trend
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                {years.map((fy, fi) => (
                                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: FY_COLORS[fi % 3] }} />
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: C.sub }}>{fy.fiscal_label || `FY${fi + 1}`}</span>
                                        {fy.total_revenue && <span style={{ fontSize: '10px', color: C.muted }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</span>}
                                        {fy.total_rw && <span style={{ fontSize: '10px', color: C.muted }}>RW {fmt(fy.total_rw, 1)}</span>}
                                    </div>
                                ))}
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={chartData} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={`${C.muted}15`} vertical={false} />
                                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: C.muted }} />
                                    <YAxis tick={{ fontSize: 9, fill: C.muted }} tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : `${v}`} />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}` }} />
                                    {years.map((fy, fi) => (
                                        <Bar key={fi} dataKey={`fy${fi}`} fill={FY_COLORS[fi % 3]} radius={[3, 3, 0, 0]} barSize={years.length <= 2 ? 18 : 12} opacity={fi === years.length - 1 ? 1 : 0.5} />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    );
                })()}
            </Section>

            {/* ══════════════════════════════════════════════
                🤖 AI CODER ASSISTANT — DRG Optimization Intelligence
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary name="AI Coder Assistant & DRG Optimization">
            <Section color="#7c3aed" icon="🤖" title="AI Coder Assistant" sub="ระบบช่วยตรวจสอบการ Coding ด้วย AI" badge="DRG Optimization">

                {/* Coder Performance Leaderboard */}
                {today?.ipd_coders_fiscal?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: C.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            👤 Coder Performance — ปีงบประมาณปัจจุบัน
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                                <thead>
                                    <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                                        {['#', 'Coder', 'Cases (FY)', 'เดือนนี้', 'เดือนก่อน', 'CC Rate', 'Dx/Case', 'AI Assessment'].map(h => (
                                            <th key={h} style={{ padding: '8px 6px', textAlign: h === 'Coder' ? 'left' : 'center', fontWeight: 700, color: C.muted, fontSize: '10px', textTransform: 'uppercase' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {today.ipd_coders_fiscal.slice(0, 10).map((coder, i) => {
                                        const ccRate = Number(coder.cc_rate || 0);
                                        const dxPerCase = Number(coder.diag_per_case || 0);
                                        const curMonth = Number(coder.current_month_total || 0);
                                        const prevMonth = Number(coder.prev_month_total || 0);
                                        const momGrowth = prevMonth > 0 ? Math.round(((curMonth - prevMonth) / prevMonth) * 100) : 0;

                                        // AI Assessment
                                        let assessment = '', assessColor = C.ok, assessIcon = '✅';
                                        if (ccRate < 0.3) { assessment = 'CC Rate ต่ำ — ตรวจสอบ Secondary Dx'; assessColor = C.danger; assessIcon = '🔴'; }
                                        else if (ccRate < 0.6) { assessment = 'เพิ่ม CC/MCC — ตรวจ Lab + Vitals'; assessColor = C.warn; assessIcon = '🟡'; }
                                        else if (dxPerCase < 2) { assessment = 'Dx/Case น้อย — ทบทวน Chart Review'; assessColor = C.warn; assessIcon = '🟡'; }
                                        else { assessment = 'ดี — รักษามาตรฐาน'; }

                                        return (
                                            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? 'transparent' : `${C.muted}05` }}>
                                                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800, color: i < 3 ? '#7c3aed' : C.muted, fontSize: '12px' }}>
                                                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
                                                </td>
                                                <td style={{ padding: '8px 6px', fontWeight: 700, color: C.text, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {coder.name}
                                                </td>
                                                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800, color: '#7c3aed' }}>
                                                    {fmt(coder.fiscal_total)}
                                                </td>
                                                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                                                    <span style={{ fontWeight: 700 }}>{fmt(curMonth)}</span>
                                                    {momGrowth !== 0 && (
                                                        <span style={{ fontSize: '9px', fontWeight: 700, marginLeft: '3px', color: momGrowth >= 0 ? C.ok : C.danger }}>
                                                            {momGrowth >= 0 ? '↑' : '↓'}{Math.abs(momGrowth)}%
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '8px 6px', textAlign: 'center', color: C.sub }}>{fmt(prevMonth)}</td>
                                                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                                                    <span style={{
                                                        fontWeight: 700, fontSize: '10px', padding: '2px 6px', borderRadius: '6px',
                                                        background: ccRate >= 0.6 ? `${C.ok}15` : ccRate >= 0.3 ? `${C.warn}15` : `${C.danger}15`,
                                                        color: ccRate >= 0.6 ? C.ok : ccRate >= 0.3 ? C.warn : C.danger,
                                                    }}>
                                                        {(ccRate * 100).toFixed(0)}%
                                                    </span>
                                                </td>
                                                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: dxPerCase >= 3 ? C.ok : dxPerCase >= 2 ? C.warn : C.danger }}>
                                                    {dxPerCase.toFixed(1)}
                                                </td>
                                                <td style={{ padding: '8px 6px', fontSize: '10px', fontWeight: 600, color: assessColor }}>
                                                    {assessIcon} {assessment}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* AI DRG Optimization Cases */}
                {drgOpt && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                🧠 AI พบโอกาสเพิ่ม Revenue — DRG Optimization
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {[
                                    { label: 'PDx Optimize', count: drgOpt.pdxOptimization?.length || 0, revenue: drgOpt.pdxRevenue, color: '#7c3aed' },
                                    { label: 'CC/MCC Missing', count: drgOpt.mccMissing?.length || 0, revenue: drgOpt.mccRevenue, color: '#f59e0b' },
                                    { label: 'Lab → Dx', count: drgOpt.labAlerts?.length || 0, revenue: drgOpt.labRevenue, color: '#dc2626' },
                                ].map((cat, i) => (
                                    <span key={i} style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '8px', background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}25` }}>
                                        {cat.label}: {cat.count} เคส · ฿{(cat.revenue || 0).toLocaleString()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Case List — grouped by category */}
                        {[
                            { key: 'labAlerts', title: '🩸 Lab → Diagnosis (พบผล Lab ผิดปกติ → แนะนำ ICD-10)', color: '#dc2626', items: drgOpt.labAlerts || [] },
                            { key: 'mccMissing', title: '📋 CC/MCC Missing (ไม่มี Secondary Diagnosis)', color: '#f59e0b', items: drgOpt.mccMissing || [] },
                            { key: 'pdxOptimization', title: '🎯 PDx Optimization (รหัสโรคยังไม่จำเพาะ)', color: '#7c3aed', items: drgOpt.pdxOptimization || [] },
                            { key: 'losAlert', title: '⏱️ LOS Alert (วันนอนผิดปกติ)', color: '#0284c7', items: drgOpt.losAlert || [] },
                        ].map(cat => cat.items.length === 0 ? null : (
                            <div key={cat.key} style={{ marginBottom: '16px', borderRadius: '14px', border: `1px solid ${cat.color}20`, overflow: 'hidden' }}>
                                <div style={{ padding: '10px 14px', background: `${cat.color}08`, borderBottom: `1px solid ${cat.color}15`, fontSize: '11px', fontWeight: 800, color: cat.color }}>
                                    {cat.title} ({cat.items.length} เคส)
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {cat.items.slice(0, 10).map((c, i) => (
                                        <div key={i} style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, fontSize: '11px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 700, color: C.text }}>
                                                    <span style={{ fontSize: '9px', background: `${C.muted}15`, padding: '1px 4px', borderRadius: '3px', marginRight: '4px', fontFamily: 'monospace' }}>AN:{c.an}</span>
                                                    {c.name}
                                                    <span style={{ fontSize: '10px', color: C.sub, marginLeft: '6px' }}>{c.ward}</span>
                                                </span>
                                                {c.estRevenue > 0 && (
                                                    <span style={{ fontSize: '10px', fontWeight: 800, color: C.ok, background: `${C.ok}12`, padding: '2px 8px', borderRadius: '6px' }}>
                                                        +฿{c.estRevenue.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Issue */}
                                            <div style={{ fontSize: '10px', color: C.sub, marginBottom: '3px', lineHeight: 1.5 }}>
                                                ⚠️ {c.issue}
                                            </div>
                                            {/* AI Suggestion */}
                                            <div style={{ fontSize: '10px', color: cat.color, fontWeight: 600, padding: '4px 8px', borderRadius: '8px', background: `${cat.color}06`, borderLeft: `3px solid ${cat.color}`, lineHeight: 1.5 }}>
                                                🤖 {c.aiSuggest}
                                            </div>
                                        </div>
                                    ))}
                                    {cat.items.length > 10 && (
                                        <div style={{ padding: '8px 14px', textAlign: 'center', fontSize: '10px', fontWeight: 700, color: C.muted }}>
                                            +{cat.items.length - 10} เคสเพิ่มเติม
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Total Revenue Opportunity */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '12px' }}>
                            {[
                                { label: 'PDx Optimization', value: drgOpt.pdxRevenue, color: '#7c3aed', desc: 'เปลี่ยนรหัสโรคให้จำเพาะ' },
                                { label: 'CC/MCC Missing', value: drgOpt.mccRevenue, color: '#f59e0b', desc: 'เพิ่ม Secondary Diagnosis' },
                                { label: 'Lab → Diagnosis', value: drgOpt.labRevenue, color: '#dc2626', desc: 'แปลงผล Lab เป็น ICD-10' },
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '14px', borderRadius: '14px', background: `${item.color}06`, border: `1px solid ${item.color}20`, textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 700, color: C.muted, marginBottom: '4px' }}>{item.label}</div>
                                    <div style={{ fontSize: '22px', fontWeight: 900, color: item.color }}>฿{(item.value || 0).toLocaleString()}</div>
                                    <div style={{ fontSize: '9px', fontWeight: 600, color: C.sub, marginTop: '2px' }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', borderRadius: '14px', background: `${C.ok}06`, border: `1px solid ${C.ok}20` }}>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: C.ok }}>
                                💰 Total Revenue Opportunity: ฿{((drgOpt.pdxRevenue || 0) + (drgOpt.mccRevenue || 0) + (drgOpt.labRevenue || 0)).toLocaleString()}
                            </span>
                            <div style={{ fontSize: '10px', color: C.sub, marginTop: '4px' }}>
                                AI วิเคราะห์จาก Lab Results + Diagnosis Patterns + LOS Outliers · ราคา RW ≈ ฿8,350
                            </div>
                        </div>
                    </div>
                )}

                {!drgOpt && !loading.medRecDrgOpt && (
                    <div style={{ textAlign: 'center', padding: '24px', color: C.muted, fontSize: '12px' }}>
                        ✅ ไม่พบ case ที่ต้องปรับปรุง Coding — DRG Optimization ปกติ
                    </div>
                )}
            </Section>
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════════
                🔥 SECTION 6 — Coding Quality Heatmap (Coder × Ward)
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary>
            {(() => {
                const hm = state.medRecHeatmap;
                if (!hm?.coders?.length) return null;
                const coders = hm.coders;
                const wards = hm.wards || [];
                const weakSpots = hm.weak_spots || [];

                // Color scale: CC rate → color
                const ccColor = (rate) => {
                    if (rate >= 80) return { bg: '#059669', text: '#fff' };
                    if (rate >= 60) return { bg: '#10b981', text: '#fff' };
                    if (rate >= 40) return { bg: '#fbbf24', text: '#1e1b4b' };
                    if (rate >= 20) return { bg: '#f97316', text: '#fff' };
                    if (rate > 0) return { bg: '#ef4444', text: '#fff' };
                    return { bg: '#1e1b4b', text: '#6b7280' };
                };

                return (
                    <Section color="#e11d48" icon="🔥" title="Coding Quality Heatmap" sub="Coder × Ward — CC/MCC Completeness (30 วัน)" badge="AI Analytics">
                        {/* Heatmap Grid */}
                        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '3px', fontSize: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 800, color: C.sub, fontSize: '10px', minWidth: '140px', position: 'sticky', left: 0, background: 'var(--md-surface, #fff)', zIndex: 1 }}>
                                            Coder
                                        </th>
                                        {wards.map((w, i) => (
                                            <th key={i} style={{ padding: '4px 6px', textAlign: 'center', fontWeight: 700, color: C.sub, fontSize: '9px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', writingMode: wards.length > 4 ? 'vertical-rl' : undefined, height: wards.length > 4 ? '80px' : undefined }}>
                                                {w?.replace('หอผู้ป่วย', '').replace('สามัญ', '')}
                                            </th>
                                        ))}
                                        <th style={{ padding: '4px 8px', textAlign: 'center', fontWeight: 800, color: C.sub, fontSize: '10px' }}>AVG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coders.map((c, ci) => (
                                        <tr key={ci}>
                                            <td style={{ padding: '6px 10px', fontWeight: 700, color: C.text, fontSize: '10px', position: 'sticky', left: 0, background: 'var(--md-surface, #fff)', zIndex: 1, borderRight: '2px solid var(--md-border, #e2e8f0)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ fontSize: '12px' }}>👩‍💻</span>
                                                    <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                                                </div>
                                                <span style={{ fontSize: '9px', color: C.muted }}>{c.total_cases} เคส</span>
                                            </td>
                                            {wards.map((w, wi) => {
                                                const cell = c.wards?.[w];
                                                if (!cell) return <td key={wi} style={{ padding: '4px', textAlign: 'center', borderRadius: '6px', background: 'var(--md-surface-2, #f8fafc)', color: C.muted }}>—</td>;
                                                const clr = ccColor(cell.cc_rate);
                                                return (
                                                    <td key={wi} title={`${c.name} × ${w}: CC ${cell.cc_rate}% · ${cell.cases} เคส · ${cell.diag_per_case} dx/case`}
                                                        style={{ padding: '4px 6px', textAlign: 'center', borderRadius: '8px', background: clr.bg, color: clr.text, fontWeight: 800, fontSize: '11px', cursor: 'default', transition: 'transform 0.15s', minWidth: '44px' }}>
                                                        {cell.cc_rate}%
                                                        <div style={{ fontSize: '8px', fontWeight: 600, opacity: 0.8 }}>{cell.cases}เคส</div>
                                                    </td>
                                                );
                                            })}
                                            <td style={{ padding: '4px 8px', textAlign: 'center', fontWeight: 900, fontSize: '12px', color: c.avg_cc >= 60 ? '#059669' : c.avg_cc >= 40 ? '#f59e0b' : '#ef4444', background: `${c.avg_cc >= 60 ? '#059669' : c.avg_cc >= 40 ? '#f59e0b' : '#ef4444'}10`, borderRadius: '8px' }}>
                                                {c.avg_cc}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Legend */}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                            {[{ label: '≥80% ดีเยี่ยม', bg: '#059669' }, { label: '60-79% ดี', bg: '#10b981' }, { label: '40-59% พอใช้', bg: '#fbbf24' }, { label: '20-39% ต่ำ', bg: '#f97316' }, { label: '<20% วิกฤต', bg: '#ef4444' }, { label: '0% ไม่มี CC', bg: '#1e1b4b' }].map((l, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: l.bg }} />
                                    <span style={{ fontSize: '9px', color: C.sub, fontWeight: 600 }}>{l.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Weak Spots — AI Coaching Recommendations */}
                        {weakSpots.length > 0 && (
                            <div style={{ background: 'rgba(239,68,68,0.04)', borderRadius: '14px', padding: '14px', border: '1px solid rgba(239,68,68,0.12)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '14px' }}>🎯</span>
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#e11d48' }}>AI Coaching Targets — จุดที่ต้องปรับปรุง</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {weakSpots.map((ws, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.1)' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 900, color: '#e11d48', minWidth: '20px' }}>{i + 1}</span>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: C.text }}>{ws.coder} — {ws.ward}</p>
                                                <p style={{ margin: '2px 0 0', fontSize: '10px', color: C.sub }}>
                                                    CC Rate <b style={{ color: '#ef4444' }}>{ws.cc_rate}%</b> · {ws.cases} เคส · {ws.diag_per_case} dx/case
                                                </p>
                                            </div>
                                            <span style={{ fontSize: '9px', fontWeight: 700, color: '#e11d48', background: 'rgba(239,68,68,0.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                                {ws.cc_rate === 0 ? 'อบรมเร่งด่วน' : 'Peer Review'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>
                );
            })()}
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════════
                ⏱️ SECTION 7 — Coding Turnaround Trend (12 weeks × Coder)
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary>
            {(() => {
                const trend = state.medRecTATrend;
                if (!trend?.weeks?.length) return null;
                const weeks = trend.weeks;
                const coders = trend.coders || [];
                const target = trend.target_days || 3;
                const COLORS = ['#e11d48', '#0284c7', '#059669', '#f59e0b', '#7c3aed', '#0ea5e9', '#ec4899'];

                // Overall stats
                const allAvgs = weeks.map(w => w.avg_all).filter(v => v > 0);
                const overallAvg = allAvgs.length > 0 ? Math.round(allAvgs.reduce((s, v) => s + v, 0) / allAvgs.length * 10) / 10 : 0;
                const latestAvg = weeks[weeks.length - 1]?.avg_all || 0;
                const firstAvg = weeks[0]?.avg_all || 0;
                const trendDir = latestAvg < firstAvg ? 'improving' : latestAvg > firstAvg ? 'worsening' : 'stable';

                return (
                    <Section color="#0284c7" icon="⏱️" title="Coding Turnaround Trend" sub={`เวลาสรุปรหัส IPD รายสัปดาห์ (${weeks.length} สัปดาห์) · แยก Coder`} badge="12 Weeks">
                        {/* KPI Strip */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(2,132,199,0.06)', border: '1px solid rgba(2,132,199,0.15)', textAlign: 'center' }}>
                                <span style={{ fontSize: '10px', color: C.muted, fontWeight: 600 }}>เฉลี่ยรวม</span>
                                <p style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: overallAvg <= target ? '#059669' : '#e11d48' }}>{overallAvg} วัน</p>
                            </div>
                            <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(2,132,199,0.06)', border: '1px solid rgba(2,132,199,0.15)', textAlign: 'center' }}>
                                <span style={{ fontSize: '10px', color: C.muted, fontWeight: 600 }}>สัปดาห์ล่าสุด</span>
                                <p style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: latestAvg <= target ? '#059669' : '#e11d48' }}>{latestAvg} วัน</p>
                            </div>
                            <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(2,132,199,0.06)', border: '1px solid rgba(2,132,199,0.15)', textAlign: 'center' }}>
                                <span style={{ fontSize: '10px', color: C.muted, fontWeight: 600 }}>เป้าหมาย</span>
                                <p style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#f43f5e' }}>≤{target} วัน</p>
                            </div>
                            <div style={{ padding: '10px 16px', borderRadius: '12px', background: trendDir === 'improving' ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${trendDir === 'improving' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}`, textAlign: 'center' }}>
                                <span style={{ fontSize: '10px', color: C.muted, fontWeight: 600 }}>แนวโน้ม</span>
                                <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: trendDir === 'improving' ? '#059669' : trendDir === 'worsening' ? '#e11d48' : '#64748b' }}>
                                    {trendDir === 'improving' ? '📈 ดีขึ้น' : trendDir === 'worsening' ? '📉 แย่ลง' : '➡️ คงที่'}
                                </p>
                            </div>
                        </div>

                        {/* Line Chart */}
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={weeks} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={30} unit=" d" domain={[0, 'auto']} />
                                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                    formatter={(v, name) => v != null ? [`${v} วัน`, name === 'avg_all' ? 'เฉลี่ยรวม' : name] : [null, null]} />
                                <ReferenceLine y={target} stroke="#f43f5e" strokeWidth={2} strokeDasharray="8 4" label={{ value: `เป้า ${target} วัน`, fill: '#f43f5e', fontSize: 10, fontWeight: 700, position: 'right' }} />
                                {/* Per-coder lines */}
                                {coders.slice(0, 5).map((c, i) => (
                                    <Line key={c} type="monotone" dataKey={c} stroke={COLORS[i % COLORS.length]} strokeWidth={2}
                                        dot={{ r: 3, fill: COLORS[i % COLORS.length] }} connectNulls name={c} />
                                ))}
                                {/* Overall avg line (thick) */}
                                <Line type="monotone" dataKey="avg_all" stroke="#1e1b4b" strokeWidth={3}
                                    dot={{ r: 4, fill: '#1e1b4b', stroke: '#fff', strokeWidth: 2 }} name="เฉลี่ยรวม" />
                            </LineChart>
                        </ResponsiveContainer>

                        {/* Legend */}
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '16px', height: '3px', background: '#1e1b4b', borderRadius: '2px' }} />
                                <span style={{ fontSize: '10px', color: C.sub, fontWeight: 700 }}>เฉลี่ยรวม</span>
                            </div>
                            {coders.slice(0, 5).map((c, i) => (
                                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                                    <span style={{ fontSize: '9px', color: C.sub, fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '16px', height: '2px', background: '#f43f5e', borderRadius: '2px', borderTop: '2px dashed #f43f5e' }} />
                                <span style={{ fontSize: '10px', color: '#f43f5e', fontWeight: 700 }}>เป้า {target} วัน</span>
                            </div>
                        </div>
                    </Section>
                );
            })()}
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════════
                💰 SECTION 8 — Revenue Recovery Tracker
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary>
            {(() => {
                const rec = state.medRecRecovery;
                if (!rec?.summary?.total_flagged) return null;
                const s = rec.summary;
                const cats = rec.categories || [];
                const rw = rec.rw_impact || {};

                return (
                    <Section color="#059669" icon="💰" title="Revenue Recovery Tracker" sub="ติดตามผลจาก AI แนะนำ DRG Optimization (30 วัน)" badge="AI Follow-up">
                        {/* Funnel KPIs */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '20px', flexWrap: 'wrap' }}>
                            {[
                                { label: 'AI แนะนำ', value: s.total_flagged, icon: '🤖', color: '#7c3aed', sub: 'เคสที่ AI ตรวจพบ' },
                                null, // arrow
                                { label: 'Coder แก้ไข', value: s.total_actioned, icon: '✅', color: '#059669', sub: `${s.conversion_rate}% conversion` },
                                null, // arrow
                                { label: 'Revenue Recovered', value: `฿${(s.recovered_revenue / 1000).toFixed(0)}K`, icon: '💰', color: '#f59e0b', sub: 'ประมาณการ' },
                            ].map((item, i) => item === null ? (
                                <div key={i} style={{ fontSize: '24px', color: C.muted, padding: '0 8px', fontWeight: 900 }}>→</div>
                            ) : (
                                <div key={i} style={{ textAlign: 'center', padding: '14px 20px', borderRadius: '16px', background: `${item.color}08`, border: `2px solid ${item.color}20`, minWidth: '130px' }}>
                                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                    <p style={{ margin: '4px 0 0', fontSize: '10px', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 900, color: item.color, lineHeight: 1 }}>{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</p>
                                    <p style={{ margin: '2px 0 0', fontSize: '10px', color: C.sub, fontWeight: 600 }}>{item.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Conversion Rate Gauge */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <div style={{ width: '200px', textAlign: 'center' }}>
                                <div style={{ position: 'relative', height: '12px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', borderRadius: '99px', transition: 'width 0.8s ease',
                                        width: `${Math.min(s.conversion_rate, 100)}%`,
                                        background: s.conversion_rate >= 80 ? 'linear-gradient(90deg, #059669, #10b981)' : s.conversion_rate >= 50 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #ef4444, #f43f5e)',
                                    }} />
                                </div>
                                <p style={{ margin: '4px 0 0', fontSize: '11px', fontWeight: 800, color: s.conversion_rate >= 80 ? '#059669' : s.conversion_rate >= 50 ? '#f59e0b' : '#ef4444' }}>
                                    Conversion Rate: {s.conversion_rate}%
                                </p>
                            </div>
                        </div>

                        {/* Category Breakdown */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                            {cats.map((cat, i) => (
                                <div key={i} style={{ padding: '14px', borderRadius: '14px', background: C.bg, border: `1px solid ${C.border}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: C.text }}>{cat.type}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '10px', color: C.muted }}>แนะนำ <b style={{ color: '#7c3aed' }}>{cat.flagged}</b></span>
                                        <span style={{ fontSize: '10px', color: C.muted }}>แก้ไข <b style={{ color: '#059669' }}>{cat.actioned}</b></span>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: cat.rate >= 80 ? '#059669' : cat.rate >= 50 ? '#f59e0b' : '#ef4444' }}>{cat.rate}%</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${Math.min(cat.rate, 100)}%`, background: cat.rate >= 80 ? '#059669' : cat.rate >= 50 ? '#f59e0b' : '#ef4444', borderRadius: '99px', transition: 'width 0.6s ease' }} />
                                    </div>
                                    {cat.revenue > 0 && (
                                        <p style={{ margin: '6px 0 0', fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                                            💰 ฿{cat.revenue.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* RW Impact Summary */}
                        {rw.total_cases > 0 && (
                            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(5,150,105,0.04)', border: '1px solid rgba(5,150,105,0.12)' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#059669', marginBottom: '6px' }}>📊 RW Impact Summary (30 วัน)</p>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
                                    <span>📁 {rw.total_cases} เคส DRG</span>
                                    <span style={{ color: '#059669' }}>📈 RW เพิ่ม {rw.rw_increased} เคส (+฿{rw.rw_gain?.toLocaleString()})</span>
                                    <span style={{ color: '#ef4444' }}>📉 RW ลด {rw.rw_decreased} เคส (-฿{rw.rw_loss?.toLocaleString()})</span>
                                    <span style={{ fontWeight: 800, color: rw.rw_gain > rw.rw_loss ? '#059669' : '#ef4444' }}>
                                        สุทธิ: {rw.rw_gain > rw.rw_loss ? '+' : '-'}฿{Math.abs((rw.rw_gain || 0) - (rw.rw_loss || 0)).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}
                    </Section>
                );
            })()}
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════════
                🧬 SECTION 9 — Diagnosis Depth Analysis (Nested Donut per Coder)
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary>
            {(() => {
                const hm = state.medRecHeatmap;
                if (!hm?.coders?.length) return null;

                const DEPTH_COLORS = ['#7c3aed', '#0ea5e9', '#f59e0b', '#10b981'];
                const DEPTH_LABELS = ['PDx (หลัก)', 'CC (ร่วม)', 'MCC (แทรกซ้อน)', 'Procedure (หัตถการ)'];

                // Aggregate per-coder depth from heatmap wards data
                const coderDepth = hm.coders.map(c => {
                    let totalCases = 0, sumPdx = 0, sumCc = 0, sumMcc = 0, sumProc = 0;
                    for (const wd of Object.values(c.wards || {})) {
                        totalCases += wd.cases;
                        sumPdx += (wd.pdx || 0) * wd.cases;
                        sumCc += (wd.cc || 0) * wd.cases;
                        sumMcc += (wd.mcc || 0) * wd.cases;
                        sumProc += (wd.proc || 0) * wd.cases;
                    }
                    const avg = (v) => totalCases > 0 ? Math.round(v / totalCases * 100) / 100 : 0;
                    return {
                        name: c.name, cases: totalCases,
                        pdx: avg(sumPdx), cc: avg(sumCc), mcc: avg(sumMcc), proc: avg(sumProc),
                        total: avg(sumPdx + sumCc + sumMcc + sumProc),
                    };
                }).filter(c => c.cases >= 5).sort((a, b) => b.total - a.total);

                if (!coderDepth.length) return null;

                // Hospital average
                const hospAvg = {
                    pdx: Math.round(coderDepth.reduce((s, c) => s + c.pdx * c.cases, 0) / Math.max(1, coderDepth.reduce((s, c) => s + c.cases, 0)) * 100) / 100,
                    cc: Math.round(coderDepth.reduce((s, c) => s + c.cc * c.cases, 0) / Math.max(1, coderDepth.reduce((s, c) => s + c.cases, 0)) * 100) / 100,
                    mcc: Math.round(coderDepth.reduce((s, c) => s + c.mcc * c.cases, 0) / Math.max(1, coderDepth.reduce((s, c) => s + c.cases, 0)) * 100) / 100,
                    proc: Math.round(coderDepth.reduce((s, c) => s + c.proc * c.cases, 0) / Math.max(1, coderDepth.reduce((s, c) => s + c.cases, 0)) * 100) / 100,
                };

                return (
                    <Section color="#7c3aed" icon="🧬" title="Diagnosis Depth Analysis" sub="ความลึกของ Coding แยก Coder — PDx / CC / MCC / Procedure (30 วัน)" badge="Per Coder">
                        {/* Legend */}
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                            {DEPTH_LABELS.map((l, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: DEPTH_COLORS[i] }} />
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: C.sub }}>{l}</span>
                                </div>
                            ))}
                        </div>

                        {/* Donut Charts Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                            {/* Hospital Average */}
                            <div style={{ padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(124,58,237,0.02))', border: '2px solid rgba(124,58,237,0.2)', textAlign: 'center' }}>
                                <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 900, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🏥 ค่าเฉลี่ย รพ.</p>
                                <ResponsiveContainer width="100%" height={120}>
                                    <PieChart>
                                        <Pie data={[{ v: hospAvg.pdx }, { v: hospAvg.cc }, { v: hospAvg.mcc }, { v: hospAvg.proc }].filter(d => d.v > 0)}
                                            dataKey="v" cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} strokeWidth={0}>
                                            {[hospAvg.pdx, hospAvg.cc, hospAvg.mcc, hospAvg.proc].filter(v => v > 0).map((_, i) => <Cell key={i} fill={DEPTH_COLORS[i]} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#7c3aed' }}>{(hospAvg.pdx + hospAvg.cc + hospAvg.mcc + hospAvg.proc).toFixed(1)}</p>
                                <p style={{ margin: 0, fontSize: '10px', color: C.muted }}>dx/case</p>
                            </div>

                            {/* Per Coder */}
                            {coderDepth.slice(0, 5).map((c, ci) => {
                                const pieData = [{ v: c.pdx, l: 'PDx' }, { v: c.cc, l: 'CC' }, { v: c.mcc, l: 'MCC' }, { v: c.proc, l: 'Proc' }].filter(d => d.v > 0);
                                const isLow = c.total < (hospAvg.pdx + hospAvg.cc + hospAvg.mcc + hospAvg.proc) * 0.7;
                                return (
                                    <div key={ci} style={{ padding: '14px', borderRadius: '14px', background: isLow ? 'rgba(239,68,68,0.04)' : C.bg, border: `1px solid ${isLow ? 'rgba(239,68,68,0.2)' : C.border}`, textAlign: 'center' }}>
                                        <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {c.name}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '9px', color: C.muted }}>{c.cases} เคส</p>
                                        <ResponsiveContainer width="100%" height={100}>
                                            <PieChart>
                                                <Pie data={pieData} dataKey="v" cx="50%" cy="50%" innerRadius={24} outerRadius={42} paddingAngle={3} strokeWidth={0}>
                                                    {pieData.map((_, i) => <Cell key={i} fill={DEPTH_COLORS[i]} />)}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: isLow ? '#ef4444' : '#7c3aed' }}>{c.total.toFixed(1)}</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: C.muted }}>dx/case</p>
                                        {isLow && <span style={{ fontSize: '8px', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.08)', padding: '1px 6px', borderRadius: '99px' }}>ต่ำกว่าค่าเฉลี่ย</span>}
                                        {/* Breakdown bar */}
                                        <div style={{ display: 'flex', height: '6px', borderRadius: '99px', overflow: 'hidden', marginTop: '6px', gap: '1px' }}>
                                            {[c.pdx, c.cc, c.mcc, c.proc].map((v, i) => v > 0 ? <div key={i} style={{ flex: v, background: DEPTH_COLORS[i], borderRadius: '99px' }} /> : null)}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '8px', color: C.muted }}>
                                            <span>PDx {c.pdx}</span>
                                            <span>CC {c.cc}</span>
                                            <span>MCC {c.mcc}</span>
                                            <span>Proc {c.proc}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Section>
                );
            })()}
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════════
                ⚖️ SECTION 10 — Workload Balance Gauge
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary>
            {(() => {
                const codersFiscal = today.ipd_coders_fiscal || [];
                if (codersFiscal.length < 2) return null;

                const cases = codersFiscal.map(c => ({ name: c.name, current: c.current_month_total || 0, prev: c.prev_month_total || 0, fiscal: c.fiscal_total || 0, cc: c.cc_rate || 0 }));
                const maxCurrent = Math.max(...cases.map(c => c.current), 1);
                const minCurrent = Math.min(...cases.map(c => c.current));
                const avgCurrent = Math.round(cases.reduce((s, c) => s + c.current, 0) / cases.length);
                const totalCurrent = cases.reduce((s, c) => s + c.current, 0);

                // Gini coefficient (0=perfect equality, 1=perfect inequality)
                const sorted = [...cases].sort((a, b) => a.current - b.current);
                const n = sorted.length;
                let giniNum = 0;
                sorted.forEach((c, i) => { giniNum += (2 * (i + 1) - n - 1) * c.current; });
                const gini = totalCurrent > 0 ? Math.round(Math.abs(giniNum) / (n * totalCurrent) * 100) / 100 : 0;

                const isBalanced = gini < 0.2;
                const isModerate = gini >= 0.2 && gini < 0.4;
                const isImbalanced = gini >= 0.4;

                const statusColor = isBalanced ? '#059669' : isModerate ? '#f59e0b' : '#ef4444';
                const statusLabel = isBalanced ? 'สมดุลดี' : isModerate ? 'ค่อนข้างเบี่ยง' : 'ไม่สมดุล';
                const statusIcon = isBalanced ? '✅' : isModerate ? '⚠️' : '🚨';

                // AI recommendations
                const recs = [];
                const overloaded = cases.filter(c => c.current > avgCurrent * 1.5 && avgCurrent > 0);
                const underloaded = cases.filter(c => c.current < avgCurrent * 0.3 && avgCurrent > 0);
                if (overloaded.length > 0) recs.push(`${overloaded.map(c => c.name.split(' ')[0]).join(', ')} รับงานมากเกินไป (>${Math.round(avgCurrent * 1.5)} เคส) — ควรกระจายงาน`);
                if (underloaded.length > 0) recs.push(`${underloaded.map(c => c.name.split(' ')[0]).join(', ')} รับงานน้อยมาก (<${Math.round(avgCurrent * 0.3)} เคส) — เพิ่ม Assignment`);
                if (maxCurrent > 0 && minCurrent === 0) recs.push('มี Coder ที่ยังไม่ได้รับ Assignment เดือนนี้เลย — ตรวจสอบ');
                if (isBalanced && recs.length === 0) recs.push('การกระจายงานสมดุลดี — รักษามาตรฐาน');

                return (
                    <Section color="#6366f1" icon="⚖️" title="Workload Balance" sub="สมดุลงาน IPD Coder เดือนนี้ — Gini Coefficient" badge="AI Balancer">
                        {/* Balance Gauge */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            {/* Gini Gauge */}
                            <div style={{ textAlign: 'center' }}>
                                <svg width="140" height="80" viewBox="0 0 140 80">
                                    {/* Background arc */}
                                    <path d="M 15 70 A 55 55 0 0 1 125 70" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                                    {/* Green zone (0-0.2) */}
                                    <path d="M 15 70 A 55 55 0 0 1 37 25" fill="none" stroke="#059669" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                                    {/* Yellow zone (0.2-0.4) */}
                                    <path d="M 37 25 A 55 55 0 0 1 70 15" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                                    {/* Red zone (0.4-1.0) */}
                                    <path d="M 70 15 A 55 55 0 0 1 125 70" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                                    {/* Needle */}
                                    {(() => {
                                        const angle = -180 + (gini * 180); // 0=left, 1=right
                                        const rad = (angle * Math.PI) / 180;
                                        const nx = 70 + 45 * Math.cos(rad);
                                        const ny = 70 + 45 * Math.sin(rad);
                                        return <line x1="70" y1="70" x2={nx} y2={ny} stroke={statusColor} strokeWidth="3" strokeLinecap="round" />;
                                    })()}
                                    <circle cx="70" cy="70" r="6" fill={statusColor} />
                                    <circle cx="70" cy="70" r="3" fill="white" />
                                </svg>
                                <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 900, color: statusColor }}>{gini.toFixed(2)}</p>
                                <p style={{ margin: 0, fontSize: '10px', color: C.muted, fontWeight: 600 }}>Gini Index</p>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: statusColor, background: `${statusColor}12`, padding: '2px 10px', borderRadius: '99px' }}>
                                    {statusIcon} {statusLabel}
                                </span>
                            </div>

                            {/* Stats */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {[
                                    { label: 'Coder ทั้งหมด', value: `${cases.length} คน`, color: '#6366f1' },
                                    { label: 'เคสรวมเดือนนี้', value: `${totalCurrent} เคส`, color: '#6366f1' },
                                    { label: 'เฉลี่ยต่อคน', value: `${avgCurrent} เคส`, color: '#0284c7' },
                                    { label: 'สูงสุด', value: `${maxCurrent} เคส`, color: maxCurrent > avgCurrent * 2 ? '#ef4444' : '#059669' },
                                    { label: 'ต่ำสุด', value: `${minCurrent} เคส`, color: minCurrent === 0 ? '#ef4444' : '#059669' },
                                ].map((s, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', fontSize: '11px' }}>
                                        <span style={{ color: C.muted, fontWeight: 600 }}>{s.label}</span>
                                        <span style={{ fontWeight: 800, color: s.color }}>{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Per-Coder Bar Chart */}
                        <div style={{ marginBottom: '16px' }}>
                            {cases.map((c, i) => {
                                const pct = maxCurrent > 0 ? (c.current / maxCurrent) * 100 : 0;
                                const isOver = c.current > avgCurrent * 1.5 && avgCurrent > 0;
                                const isUnder = c.current < avgCurrent * 0.3 && avgCurrent > 0;
                                const barColor = isOver ? '#ef4444' : isUnder ? '#f59e0b' : '#6366f1';
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: C.text, width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                            {c.name}
                                        </span>
                                        <div style={{ flex: 1, height: '20px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`, borderRadius: '6px', transition: 'width 0.6s ease', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}>
                                                {pct > 20 && <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff' }}>{c.current}</span>}
                                            </div>
                                            {/* Average line */}
                                            <div style={{ position: 'absolute', left: `${(avgCurrent / maxCurrent) * 100}%`, top: 0, bottom: 0, width: '2px', background: '#1e1b4b', opacity: 0.4 }} />
                                        </div>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: barColor, minWidth: '30px', textAlign: 'right' }}>
                                            {pct <= 20 ? c.current : ''}
                                        </span>
                                        {isOver && <span style={{ fontSize: '8px', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.08)', padding: '1px 4px', borderRadius: '99px', flexShrink: 0 }}>สูง</span>}
                                        {isUnder && <span style={{ fontSize: '8px', fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.08)', padding: '1px 4px', borderRadius: '99px', flexShrink: 0 }}>ต่ำ</span>}
                                    </div>
                                );
                            })}
                            <div style={{ fontSize: '9px', color: C.muted, textAlign: 'right', marginTop: '4px' }}>
                                เส้นดำ = ค่าเฉลี่ย ({avgCurrent} เคส/คน)
                            </div>
                        </div>

                        {/* AI Recommendations */}
                        {recs.length > 0 && (
                            <div style={{ padding: '12px 14px', borderRadius: '12px', background: `${statusColor}06`, border: `1px solid ${statusColor}15` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '14px' }}>🤖</span>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: statusColor }}>AI Workload Balancer</span>
                                </div>
                                {recs.map((r, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '4px', fontSize: '11px', color: C.text, fontWeight: 600 }}>
                                        <span style={{ color: statusColor, fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span>
                                        <span>{r}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Section>
                );
            })()}
            </SubErrorBoundary>

            {/* ══════════════════════════════════════════════
                📋 SECTION 11 — DRG Optimization Kanban Board
            ══════════════════════════════════════════════ */}
            <SubErrorBoundary>
            <KanbanBoard drgOpt={drgOpt} />
            </SubErrorBoundary>

        </div>
    );
}

// ── Kanban Board Component ──────────────────────────────────
const COLUMNS = [
    { key: 'pending', label: '⏳ Pending Review', color: '#7c3aed', bg: 'rgba(124,58,237,0.04)' },
    { key: 'review', label: '🔍 Under Review', color: '#0284c7', bg: 'rgba(2,132,199,0.04)' },
    { key: 'completed', label: '✅ Completed', color: '#059669', bg: 'rgba(5,150,105,0.04)' },
    { key: 'recovered', label: '💰 Revenue Recovered', color: '#f59e0b', bg: 'rgba(245,158,11,0.04)' },
];

function KanbanBoard({ drgOpt }) {
    const [cards, setCards] = useState([]);
    const [summary, setSummary] = useState({});
    const [draggedAn, setDraggedAn] = useState(null);
    const [syncing, setSyncing] = useState(false);

    // Fetch kanban state
    const fetchKanban = useCallback(async () => {
        try {
            const r = await fetch('/api/medrec/kanban', { credentials: 'include' });
            if (r.ok) { const d = await r.json(); setCards(d.cards || []); setSummary(d.summary || {}); }
        } catch (e) { /* silent */ }
    }, []);

    useEffect(() => { fetchKanban(); }, [fetchKanban]);

    // Sync from DRG optimization
    const syncFromAI = useCallback(async () => {
        if (!drgOpt) return;
        setSyncing(true);
        const cases = [
            ...(drgOpt.pdxOptimization || []).map(c => ({ ...c, category: 'pdx' })),
            ...(drgOpt.mccMissing || []).map(c => ({ ...c, category: 'mcc' })),
            ...(drgOpt.labAlerts || []).map(c => ({ ...c, category: 'lab' })),
        ];
        try {
            await fetch('/api/medrec/kanban/sync', {
                method: 'POST', credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cases }),
            });
            await fetchKanban();
        } catch (e) { /* silent */ }
        setSyncing(false);
    }, [drgOpt, fetchKanban]);

    // Move card to new status
    const moveCard = useCallback(async (an, newStatus) => {
        try {
            await fetch(`/api/medrec/kanban/${an}`, {
                method: 'PATCH', credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            setCards(prev => prev.map(c => c.an === an ? { ...c, status: newStatus } : c));
            setSummary(prev => {
                const next = { ...prev };
                const card = cards.find(c => c.an === an);
                if (card) { next[card.status] = Math.max(0, (next[card.status] || 0) - 1); next[newStatus] = (next[newStatus] || 0) + 1; }
                return next;
            });
        } catch (e) { /* silent */ }
    }, [cards]);

    // Drag handlers
    const onDragStart = useCallback((e, an) => { setDraggedAn(an); e.dataTransfer.effectAllowed = 'move'; }, []);
    const onDragOver = useCallback((e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }, []);
    const onDrop = useCallback((e, colKey) => { e.preventDefault(); if (draggedAn) { moveCard(draggedAn, colKey); setDraggedAn(null); } }, [draggedAn, moveCard]);

    const totalCards = cards.length;
    const totalRev = cards.filter(c => c.status === 'recovered').reduce((s, c) => s + (c.est_revenue || 0), 0);

    return (
        <Section color="#ec4899" icon="📋" title="DRG Optimization — Kanban Board" sub="ติดตาม AI Recommendations → Coder Action → Revenue Recovery" badge="Drag & Drop">
            {/* Sync Button + Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: C.muted }}>
                    <span>📋 {totalCards} เคส</span>
                    <span>⏳ {summary.pending || 0}</span>
                    <span>🔍 {summary.review || 0}</span>
                    <span>✅ {summary.completed || 0}</span>
                    <span>💰 {summary.recovered || 0} (฿{totalRev.toLocaleString()})</span>
                </div>
                <button onClick={syncFromAI} disabled={syncing}
                    style={{ padding: '6px 14px', borderRadius: '99px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', opacity: syncing ? 0.6 : 1 }}>
                    {syncing ? '⏳ กำลัง Sync...' : '🔄 Sync จาก AI'}
                </button>
            </div>

            {/* Kanban Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLUMNS.length}, 1fr)`, gap: '10px', minHeight: '300px' }}>
                {COLUMNS.map(col => {
                    const colCards = cards.filter(c => c.status === col.key);
                    return (
                        <div key={col.key}
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, col.key)}
                            style={{
                                background: col.bg, borderRadius: '14px', padding: '10px',
                                border: `2px dashed ${col.color}25`, minHeight: '280px',
                                transition: 'border-color 0.2s',
                            }}
                        >
                            {/* Column Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 900, color: col.color }}>{col.label}</span>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: col.color, background: `${col.color}15`, padding: '2px 8px', borderRadius: '99px' }}>
                                    {colCards.length}
                                </span>
                            </div>

                            {/* Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {colCards.slice(0, 15).map(card => (
                                    <div key={card.an}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, card.an)}
                                        style={{
                                            padding: '8px 10px', borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
                                            border: `1px solid ${col.color}20`,
                                            cursor: 'grab', fontSize: '10px',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                                            transition: 'transform 0.15s, box-shadow 0.15s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${col.color}20`; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                                            <span style={{ fontWeight: 800, color: C.text, fontFamily: 'JetBrains Mono, monospace' }}>AN:{card.an}</span>
                                            <span style={{ fontSize: '9px', fontWeight: 700, color: card.category === 'pdx' ? '#7c3aed' : card.category === 'mcc' ? '#f59e0b' : '#0ea5e9', background: `${card.category === 'pdx' ? '#7c3aed' : card.category === 'mcc' ? '#f59e0b' : '#0ea5e9'}12`, padding: '1px 5px', borderRadius: '99px' }}>
                                                {card.category === 'pdx' ? 'PDx' : card.category === 'mcc' ? 'CC/MCC' : 'Lab'}
                                            </span>
                                        </div>
                                        <p style={{ margin: 0, fontWeight: 600, color: C.sub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {card.patient_name || '—'}
                                        </p>
                                        <p style={{ margin: '2px 0 0', color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '9px' }}>
                                            {card.ward || '—'}
                                        </p>
                                        {card.est_revenue > 0 && (
                                            <span style={{ fontSize: '9px', fontWeight: 800, color: '#059669' }}>+฿{card.est_revenue.toLocaleString()}</span>
                                        )}
                                    </div>
                                ))}
                                {colCards.length === 0 && (
                                    <div style={{ padding: '20px', textAlign: 'center', color: `${col.color}60`, fontSize: '11px', fontWeight: 600, borderRadius: '8px', border: `1px dashed ${col.color}20` }}>
                                        ลาก card มาวางที่นี่
                                    </div>
                                )}
                                {colCards.length > 15 && (
                                    <div style={{ textAlign: 'center', fontSize: '10px', color: C.muted, fontWeight: 600 }}>+{colCards.length - 15} เคส</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}

export default React.memo(MedRecTab);
