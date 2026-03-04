// ============================================================
// BCH 360° Intelligence V.10 - OPD Wait Time Analytics Tab
// ⏱️ Argon Dashboard 2 PRO Edition
// ============================================================
import React, { useEffect, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie,
    ComposedChart, Area, Line, ReferenceLine, Legend
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICard from './KPICard.jsx';

const STATUS_COLORS = {
    'รอคัดกรอง': '#f5365c', // Danger
    'กำลังตรวจ': '#fb6340', // Warning
    'รอรับยา': '#5e72e4',    // Primary
    'กลับบ้าน': '#2dce89'    // Success
};

function formatMin(min) {
    if (!min && min !== 0) return '—';
    if (min < 60) return `${min}m`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m > 0 ? m + 'm' : ''}`;
}

export default function OPDTab() {
    const { state, fetchData } = useDashboard();
    const opd = state.opdToday;
    const loading = state.loading;

    const fiscalData = state.opdMonthlyFiscal;

    useEffect(() => {
        fetchData('opdToday', '/api/opd/today');
        fetchData('opdByClinic', '/api/opd/by-clinic');
        fetchData('opdWaitTrend', '/api/opd/wait-trend');
        fetchData('opdMonthlyFiscal', '/api/opd/monthly-fiscal');
        fetchData('opdRevenueFiscal', '/api/opd/revenue-fiscal');
    }, [fetchData]);

    const hourlyChart = useMemo(() => {
        if (!opd?.hourly) return [];
        const currentHour = new Date().getHours();
        const yesterday = opd.hourly_yesterday || [];
        const prediction = opd.hourly_prediction || [];
        return opd.hourly
            .map((h, i) => ({
                ...h,
                yesterday: yesterday[i]?.count || 0,
                prediction: prediction[i]?.count || 0,
                confidence: prediction[i]?.confidence || 0,
            }))
            .filter(h => h.count > 0 || h.yesterday > 0 || h.prediction > 0 || h.hour <= currentHour + 1);
    }, [opd]);

    const waitStepsChart = useMemo(() => {
        if (!opd?.wait_steps) return [];
        return [
            { name: 'REG', value: opd.wait_steps.registration_to_screening, color: '#5e72e4' },
            { name: 'SCR', value: opd.wait_steps.screening_to_doctor, color: '#11cdef' },
            { name: 'DOC', value: opd.wait_steps.screening_to_doctor, color: '#8965e0' },
            { name: 'RX', value: opd.wait_steps.doctor_to_pharmacy, color: '#2dce89' },
            { name: 'FIN', value: opd.wait_steps.pharmacy_to_finance, color: '#fb6340' }
        ];
    }, [opd]);

    const statusCounts = useMemo(() => {
        if (!opd?.patients) return [];
        const counts = {};
        opd.patients.forEach(p => {
            const s = p.current_status || 'อื่นๆ';
            counts[s] = (counts[s] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({
            name, value, fill: STATUS_COLORS[name] || '#adb5bd'
        }));
    }, [opd]);

    const patients = opd?.patients || [];

    const PatientRow = useCallback(({ index, style }) => {
        const p = patients[index];
        if (!p) return null;
        const total = p.total_minutes;
        const isLong = total > 120;
        const isWarn = total > 60 && !isLong;
        const timeColor = isLong ? '#f43f5e' : isWarn ? '#f59e0b' : '#10b981';
        const statusColor = STATUS_COLORS[p.current_status] || '#94a3b8';

        return (
            <div style={{
                ...style,
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0 1.25rem',
                borderBottom: '1px solid var(--md-divider)',
                background: 'transparent',
                transition: 'background 0.15s',
                cursor: 'default',
            }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
                {/* เวลา */}
                <div style={{ width: '42px', fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {p.vsttime?.substring(0, 5)}
                </div>
                {/* ชื่อ + แผนก */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                    </p>
                    <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 500 }}>
                        HN {p.hn} · {p.clinic_name || 'คลินิกทั่วไป'}
                    </p>
                </div>
                {/* สถานะ */}
                <div style={{ width: '80px', textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: 'var(--fs-2xs)',
                        fontWeight: 700,
                        background: `${statusColor}18`,
                        color: statusColor,
                        border: `1px solid ${statusColor}30`,
                        whiteSpace: 'nowrap',
                    }}>
                        {p.current_status}
                    </span>
                </div>
                {/* เวลารอ */}
                <div style={{ width: '64px', textAlign: 'right' }}>
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: timeColor }}>
                        {total ? `${total} นาที` : '—'}
                    </span>
                </div>
            </div>
        );
    }, [patients]);

    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* Long wait alert */}
            {opd?.avg_total_minutes > 90 && (
                <div className="glass-card shadow-lg bg-gradient-to-r from-[#fb6340]/10 to-transparent p-4 border-l-4 border-[#fb6340] rounded-2xl">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">⏱️</span>
                        <span className="text-[13px] font-bold text-white uppercase tracking-wider">High Congestion Detected</span>
                        <span className="text-xs text-[#fb6340] font-bold">
                            Avg wait: {formatMin(opd.avg_total_minutes)}
                        </span>
                    </div>
                </div>
            )}

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>

                {/* ── ผู้รับบริการวันนี้ (Hero Card) ── */}
                <div style={{
                    gridColumn: 'span 2', padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,.12) 0%, rgba(99,102,241,.06) 100%)',
                    border: '1px solid rgba(124,58,237,.2)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Decorative glow */}
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.opdToday ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '120px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (() => {
                        const total = opd?.today_total || 0;
                        const male = opd?.male || 0;
                        const female = opd?.female || 0;
                        const newPt = opd?.new_patient || 0;
                        const malePct = total > 0 ? Math.round((male / total) * 100) : 0;
                        const newPct = total > 0 ? Math.round((newPt / total) * 100) : 0;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c3aed', margin: 0 }}>
                                        👥 ผู้รับบริการวันนี้
                                    </p>
                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#7c3aed', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(124,58,237,.3)' }}>
                                        {total.toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>ราย</span>
                                    {opd?.today_vs_yesterday_pct !== 0 && (
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                            background: opd?.today_vs_yesterday_pct > 0 ? 'rgba(245,158,11,.12)' : 'rgba(16,185,129,.12)',
                                            color: opd?.today_vs_yesterday_pct > 0 ? '#f59e0b' : '#10b981',
                                        }}>
                                            {opd?.today_vs_yesterday_pct > 0 ? '▲' : '▼'} {Math.abs(opd?.today_vs_yesterday_pct)}% vs เมื่อวาน
                                        </span>
                                    )}
                                </div>

                                {/* Gender + Type compact bars */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6' }}>♂ ชาย {male} ({malePct}%)</span>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#ec4899' }}>♀ หญิง {female} ({100 - malePct}%)</span>
                                        </div>
                                        <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(236,72,153,.12)', display: 'flex' }}>
                                            <div style={{ width: `${malePct}%`, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                            <div style={{ flex: 1, background: 'linear-gradient(90deg,#f472b6,#ec4899)', borderRadius: '0 99px 99px 0' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>★ ใหม่ {newPt} ({newPct}%)</span>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7280' }}>↩ เก่า {total - newPt}</span>
                                        </div>
                                        <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(107,114,128,.1)', display: 'flex' }}>
                                            <div style={{ width: `${newPct}%`, background: 'linear-gradient(90deg,#10b981,#34d399)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                            <div style={{ flex: 1, background: 'rgba(156,163,175,.2)', borderRadius: '0 99px 99px 0' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ── กลับบ้านแล้ว ── */}
                {[
                    { title: 'กลับบ้านแล้ว', value: opd?.completed, icon: '✅', unit: 'ราย', grad: ['#10b981', '#059669'], glow: 'rgba(16,185,129,.2)' },
                    { title: 'ยังรอรับบริการ', value: opd?.still_here, icon: '⌛', unit: 'ราย', grad: ['#f59e0b', '#d97706'], glow: 'rgba(245,158,11,.2)' },
                    { title: 'เวลารอเฉลี่ย', value: opd?.avg_total_minutes, icon: '⏱️', unit: 'นาที', grad: opd?.avg_total_minutes > 90 ? ['#f43f5e', '#dc2626'] : opd?.avg_total_minutes > 60 ? ['#f59e0b', '#d97706'] : ['#10b981', '#059669'], glow: opd?.avg_total_minutes > 90 ? 'rgba(244,63,94,.2)' : 'rgba(16,185,129,.2)' },
                    { title: 'ผู้ป่วยใหม่', value: opd?.new_patient, icon: '🆕', unit: 'ราย', grad: ['#0ea5e9', '#0284c7'], glow: 'rgba(14,165,233,.2)' },
                ].map((kpi, i) => (
                    <div key={i} style={{
                        padding: '1rem 1.25rem', borderRadius: '14px',
                        background: `linear-gradient(135deg, ${kpi.grad[0]}10 0%, ${kpi.grad[1]}05 100%)`,
                        border: `1px solid ${kpi.grad[0]}25`,
                        position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${kpi.glow}`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        {loading.opdToday ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div className="skeleton" style={{ height: '10px', width: '60px' }} />
                                <div className="skeleton" style={{ height: '28px', width: '50px' }} />
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>
                                        {kpi.title}
                                    </span>
                                    <span style={{ fontSize: '18px' }}>{kpi.icon}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                    <span style={{ fontSize: '28px', fontWeight: 900, color: kpi.grad[0], letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {(kpi.value ?? 0).toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ━━━━ Efficiency KPI Strip ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #7c3aed, #5e72e4)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    📊 ตัวชี้วัดประสิทธิภาพ
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.06)', padding: '2px 8px', borderRadius: '99px' }}>Real-time</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {[
                    {
                        title: 'SLA ≤60 นาที', value: `${opd?.sla_pct ?? 0}%`, icon: '🎯',
                        grad: (opd?.sla_pct ?? 0) >= 80 ? ['#10b981', '#059669'] : (opd?.sla_pct ?? 0) >= 60 ? ['#f59e0b', '#d97706'] : ['#f43f5e', '#dc2626'],
                        sub: (opd?.sla_pct ?? 0) >= 80 ? '✅ ผ่านเกณฑ์' : (opd?.sla_pct ?? 0) >= 60 ? '⚠️ ใกล้เกณฑ์' : '🔴 ต่ำกว่าเกณฑ์',
                    },
                    {
                        title: 'รอนานที่สุด', value: `${opd?.max_wait ?? 0}`, icon: '⚠️', unit: 'นาที',
                        grad: (opd?.max_wait ?? 0) > 180 ? ['#f43f5e', '#dc2626'] : (opd?.max_wait ?? 0) > 120 ? ['#f59e0b', '#d97706'] : ['#0ea5e9', '#0284c7'],
                        sub: 'วันนี้',
                    },
                    {
                        title: 'คิวรอแพทย์', value: `${opd?.waiting_doctor ?? 0}`, icon: '🩺', unit: 'ราย',
                        grad: (opd?.waiting_doctor ?? 0) > 30 ? ['#f43f5e', '#dc2626'] : (opd?.waiting_doctor ?? 0) > 15 ? ['#f59e0b', '#d97706'] : ['#10b981', '#059669'],
                        sub: (opd?.waiting_doctor ?? 0) > 30 ? 'คิวยาวมาก' : (opd?.waiting_doctor ?? 0) > 15 ? 'คิวยาว' : 'ปกติ',
                    },
                    {
                        title: 'Throughput', value: `${opd?.throughput ?? 0}`, icon: '⚡', unit: 'ราย/ชม.',
                        grad: ['#6366f1', '#4f46e5'],
                        sub: 'อัตราบริการ',
                    },
                    {
                        title: 'Peak Hour', value: opd?.peak_hour >= 0 ? `${String(opd.peak_hour).padStart(2, '0')}:00` : '—', icon: '🕐',
                        grad: ['#8b5cf6', '#7c3aed'],
                        sub: 'ผู้ป่วยมากสุด',
                    },
                ].map((kpi, i) => (
                    <div key={`eff-${i}`} style={{
                        padding: '0.85rem 1rem', borderRadius: '12px',
                        background: `linear-gradient(135deg, ${kpi.grad[0]}0D 0%, ${kpi.grad[1]}06 100%)`,
                        border: `1px solid ${kpi.grad[0]}20`,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'default',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${kpi.grad[0]}20`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        {loading.opdToday ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div className="skeleton" style={{ height: '8px', width: '50px' }} />
                                <div className="skeleton" style={{ height: '24px', width: '40px' }} />
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--md-text-tertiary)' }}>
                                        {kpi.title}
                                    </span>
                                    <span style={{ fontSize: '16px' }}>{kpi.icon}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: 900, color: kpi.grad[0], letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {kpi.value}
                                    </span>
                                    {kpi.unit && <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>}
                                </div>
                                <p style={{ margin: '3px 0 0', fontSize: '10px', fontWeight: 600, color: kpi.grad[0], opacity: 0.8 }}>{kpi.sub}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ━━━━━━ Advanced Analytics Panel ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #6366f1)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🔬 Advanced Analytics — Level 2-3
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(14,165,233,.08)', padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Real-time</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.opdToday ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', borderRadius: '50%', width: '200px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton" style={{ height: '48px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const sqi = opd?.sqi ?? 0;
                    const sqiColor = sqi >= 80 ? '#10b981' : sqi >= 60 ? '#f59e0b' : '#f43f5e';
                    const sqiGrade = sqi >= 90 ? 'A+' : sqi >= 80 ? 'A' : sqi >= 70 ? 'B+' : sqi >= 60 ? 'B' : sqi >= 50 ? 'C' : 'D';
                    const sqiLabel = sqi >= 80 ? 'คุณภาพดีเยี่ยม' : sqi >= 60 ? 'อยู่ในเกณฑ์' : 'ต้องปรับปรุง';

                    // SVG arc gauge
                    const r = 72, cx = 90, cy = 90;
                    const circumference = Math.PI * r; // half circle
                    const pct = Math.min(sqi / 100, 1);
                    const dash = pct * circumference;

                    // Bottleneck: ขั้นตอนที่ใช้เวลามากสุด
                    const steps = opd?.wait_steps || {};
                    const stepArr = [
                        { label: 'ลงทะเบียน', v: steps.registration_to_screening || 0, color: '#7c3aed' },
                        { label: 'คัดกรอง', v: steps.screening_to_doctor || 0, color: '#0ea5e9' },
                        { label: 'ตรวจรักษา', v: steps.doctor_to_pharmacy || 0, color: '#8b5cf6' },
                        { label: 'รับยา', v: steps.pharmacy_to_finance || 0, color: '#10b981' },
                    ];
                    const maxStep = Math.max(...stepArr.map(s => s.v), 1);
                    const bottleneck = stepArr.reduce((a, b) => b.v > a.v ? b : a, stepArr[0]);

                    const advKPIs = [
                        {
                            icon: '📐', label: 'ความสม่ำเสมอ (σ)',
                            value: `${opd?.wait_stddev ?? '—'} นาที`,
                            sub: opd?.wait_stddev < 15 ? '✅ สม่ำเสมอดีมาก' : opd?.wait_stddev < 30 ? '🟡 พอรับได้' : '🔴 ผันผวนสูง',
                            color: (opd?.wait_stddev ?? 99) < 15 ? '#10b981' : (opd?.wait_stddev ?? 99) < 30 ? '#f59e0b' : '#f43f5e',
                            desc: 'Standard Deviation เวลารอ — ต่ำ = บริการสม่ำเสมอ',
                            problem: (opd?.wait_stddev ?? 99) < 15
                                ? 'ค่าความเบี่ยงเบนมาตรฐาน (σ) ของเวลารออยู่ในเกณฑ์ดีเยี่ยม แสดงว่าระบบมีความสม่ำเสมอสูง ผู้ป่วยทุกรายใช้เวลาใกล้เคียงกัน'
                                : (opd?.wait_stddev ?? 99) < 30
                                    ? `σ = ${opd?.wait_stddev} นาที — เวลารอมีความผันผวนปานกลาง ผู้ป่วยบางรายรอนานกว่าค่าเฉลี่ยอย่างเห็นได้ชัด อาจเกิดจากจำนวนแพทย์ไม่สม่ำเสมอตามช่วงเวลา หรือ case ที่ซับซ้อนกระจุกตัว`
                                    : `σ = ${opd?.wait_stddev} นาที — ผันผวนสูงมาก !! ผู้ป่วยบางรายรอเพียง 15 นาที แต่บางรายรอเกิน 2 ชั่วโมง สะท้อนปัญหาเชิงระบบ: การจัดคิวไม่เท่าเทียม, คอขวดในบางขั้นตอน, หรือกำลังแพทย์ไม่สมดุลกับ demand`,
                            recommend: (opd?.wait_stddev ?? 99) < 15
                                ? '✅ คงมาตรฐานปัจจุบัน — ควรใช้เป็น Best Practice สำหรับหน่วยที่ σ สูงกว่า'
                                : (opd?.wait_stddev ?? 99) < 30
                                    ? '📋 แนะนำ: (1) วิเคราะห์ช่วงเวลาที่ σ สูงสุด เพื่อจัดจำนวนแพทย์/เจ้าหน้าที่ให้สอดคล้อง (2) ใช้ระบบ Pre-screening Online ลดเวลาขั้นตอนแรก (3) แยก Fast Track สำหรับ case ที่ไม่ซับซ้อน'
                                    : '🚨 เร่งด่วน: (1) Implement คิว Priority-based ตาม Triage Level (2) เพิ่มจุดคัดกรองช่วง Peak Hour (3) จัด Dedicated Clinic สำหรับผู้ป่วยเรื้อรัง/นัดตาม เพื่อแยกจากคิว Walk-in (4) ประชุม Root Cause Analysis ภายใน 1 สัปดาห์',
                        },
                        {
                            icon: '🚶', label: 'Dropout Rate',
                            value: `${opd?.dropout_pct ?? 0}%`,
                            sub: `${opd?.dropout_count ?? 0} ราย ออกก่อนรับบริการ`,
                            color: (opd?.dropout_pct ?? 0) < 5 ? '#10b981' : (opd?.dropout_pct ?? 0) < 10 ? '#f59e0b' : '#f43f5e',
                            desc: 'ผู้ที่ลงทะเบียนแต่ไม่มีบันทึก service — อาจกลับก่อน',
                            problem: (opd?.dropout_pct ?? 0) < 5
                                ? `Dropout ${opd?.dropout_pct ?? 0}% อยู่ในเกณฑ์ปกติ (Benchmark <5%) — ผู้ป่วยส่วนใหญ่รอรับบริการจนครบ สะท้อนความพึงพอใจ`
                                : (opd?.dropout_pct ?? 0) < 10
                                    ? `Dropout ${opd?.dropout_pct ?? 0}% (${opd?.dropout_count ?? 0} ราย) — สูงกว่า Benchmark 5% สาเหตุหลักมักจาก: รอนานเกินความคาดหวัง, ขาดข้อมูลสถานะคิว, หรือไม่ทราบลำดับขั้นตอน ส่งผลต่อรายได้ที่สูญเสีย และอาจเกิดภาวะแทรกซ้อนจากการไม่ได้รับการรักษา`
                                    : `🚨 Dropout ${opd?.dropout_pct ?? 0}% (${opd?.dropout_count ?? 0} ราย) — วิกฤต! สูงเกินเกณฑ์ 10% สะท้อนปัญหาร้ายแรง: ผู้ป่วยขาดความเชื่อมั่นในระบบ, เวลารอไม่สมเหตุสมผล, บรรยากาศการรอคอยไม่เอื้ออำนวย ผลกระทบโดยตรง: สูญเสียรายได้ + ความเสี่ยงด้านความปลอดภัย + ภาพลักษณ์`,
                            recommend: (opd?.dropout_pct ?? 0) < 5
                                ? '✅ คงคุณภาพการบริการ — อาจเพิ่ม Digital Queue Notification เพื่อลดต่อไปอีก'
                                : (opd?.dropout_pct ?? 0) < 10
                                    ? '📋 แนะนำ: (1) ติดตั้งจอแสดงสถานะคิว Real-time ให้ผู้ป่วยเห็นลำดับ (2) ส่ง SMS/LINE แจ้งเตือนเมื่อใกล้ถึงคิว (3) จัดพื้นที่รอคอยให้สะดวกสบาย + มี WiFi (4) เพิ่ม Nurse Navigator ช่วยแนะนำขั้นตอน'
                                    : '🚨 เร่งด่วนทันที: (1) ตั้งเป้า Dropout <5% ภายใน 30 วัน (2) สำรวจ Exit Interview ผู้ป่วยที่ออก — หาสาเหตุจริง (3) ทำ Service Blueprint ใหม่ — ลดขั้นตอนที่ไม่จำเป็น (4) เพิ่มช่องทาง Teleconsult/VDO Call สำหรับ case ง่าย (5) รายงานผู้บริหารทุกวัน',
                        },
                        {
                            icon: '🩺', label: 'Doctor Yield',
                            value: `${opd?.doctor_yield_pct ?? 0}%`,
                            sub: (opd?.doctor_yield_pct ?? 0) > 30 ? '✅ เวลากับแพทย์สูง' : '⚠️ รอนานกว่าตรวจ',
                            color: (opd?.doctor_yield_pct ?? 0) > 30 ? '#10b981' : '#f59e0b',
                            desc: 'สัดส่วนเวลาที่ผู้ป่วยใช้จริงกับแพทย์ vs เวลารวมทั้งหมด',
                            problem: (opd?.doctor_yield_pct ?? 0) > 30
                                ? `Yield ${opd?.doctor_yield_pct ?? 0}% — ผู้ป่วยใช้เวลากับแพทย์ในสัดส่วนที่ดี (Benchmark>30%) หมายความว่า "เวลาสร้างคุณค่า" (Value-added time) สูง ผู้ป่วยจะรู้สึกว่าคุ้มค่าการรอ`
                                : `Yield เพียง ${opd?.doctor_yield_pct ?? 0}% — ผู้ป่วยใช้เวลาส่วนใหญ่ไปกับการ "รอ" ไม่ใช่การ "รับบริการ" เช่น รอเกือบ 1 ชม. แต่พบแพทย์จริงเพียง 5-10 นาที สิ่งนี้ส่งผลโดยตรงต่อ Patient Satisfaction Score และ NPS`,
                            recommend: (opd?.doctor_yield_pct ?? 0) > 30
                                ? '✅ ดี — ควรเปรียบเทียบ Yield ระหว่างคลินิกเพื่อหา Best Practice และขยายผล'
                                : `📋 เพิ่ม Doctor Yield โดย: (1) ให้ Nurse Practitioner ทำ Pre-consultation assessment — รวบรวมข้อมูลก่อนพบแพทย์ (2) ใช้ระบบ Electronic Ordering เพื่อส่ง Lab/X-ray ก่อนพบแพทย์ (3) จัดแพทย์ตาม Demand pattern — ช่วง Peak ต้องมี 2-3 ห้องตรวจ (4) เป้าหมาย: Doctor Yield ≥35% ภายใน 60 วัน`,
                        },
                        {
                            icon: '✅', label: 'Completion Rate',
                            value: `${opd?.completion_rate ?? 0}%`,
                            sub: (opd?.completion_rate ?? 0) > 85 ? '✅ ดีมาก' : (opd?.completion_rate ?? 0) > 70 ? '🟡 พอใช้' : '🔴 ต่ำกว่าเกณฑ์',
                            color: (opd?.completion_rate ?? 0) > 85 ? '#10b981' : (opd?.completion_rate ?? 0) > 70 ? '#f59e0b' : '#f43f5e',
                            desc: '% ผู้ป่วยที่ผ่านบริการครบทุกขั้นตอน (ไม่ออกกลางคัน)',
                            problem: (opd?.completion_rate ?? 0) > 85
                                ? `Completion ${opd?.completion_rate ?? 0}% — ดีเยี่ยม (Benchmark>85%) กระบวนการสมูทเร้า ผู้ป่วยไม่หลุดออกระหว่างทาง ข้อมูลเรียกเก็บครบ 100%`
                                : (opd?.completion_rate ?? 0) > 70
                                    ? `Completion ${opd?.completion_rate ?? 0}% — ต่ำกว่ามาตรฐาน 85% ผู้ป่วย ${100 - (opd?.completion_rate ?? 0)}% ไม่ครบขั้นตอน เช่น ไม่ผ่านจุดชำระเงิน, ไม่รับยา, หรือขาดการบันทึก MIL ส่งผลต่อ Revenue Leakage + ข้อมูลทางคลินิกไม่สมบูรณ์`
                                    : `🚨 Completion เพียง ${opd?.completion_rate ?? 0}% — ผู้ป่วย ${100 - (opd?.completion_rate ?? 0)}% ออกจากระบบโดยไม่ครบขั้นตอน สาเหตุ: Service time ไม่ถูกบันทึก, ผู้ป่วยข้ามขั้นตอน, หรือระบบ MIL ไม่ทำงาน ส่งผลต่อรายได้สูญเสีย + คุณภาพข้อมูลทางคลินิก`,
                            recommend: (opd?.completion_rate ?? 0) > 85
                                ? '✅ คงมาตรฐาน — ตรวจสอบว่า MIL milestone ถูกบันทึกถูกต้องทุกจุด'
                                : (opd?.completion_rate ?? 0) > 70
                                    ? '📋 ยกระดับ: (1) ตรวจสอบจุดที่ Milestone หลุดบ่อยที่สุด (Service 1→5→7) (2) อบรม staff ให้ scan barcode ผู้ป่วยทุกจุด (3) เพิ่ม Alert เมื่อผู้ป่วยค้างเกิน 30 นาทีในขั้นตอนหนึ่ง (4) เป้าหมาย ≥90% ภายใน 45 วัน'
                                    : '🚨 วิกฤต: (1) ตรวจสอบระบบ MIL milestone ทันที — อาจมีปัญหาเทคนิค (2) ตั้ง Checkpoint ผู้ป่วยทุกจุดเปลี่ยนขั้นตอน (3) มอบหมาย Process Coordinator ดูแลเฉพาะ (4) Audit ข้อมูลย้อนหลัง 7 วัน หาจุดรั่วไหล (5) Target: ยกขึ้น 70% ภายใน 14 วัน, 85% ภายใน 45 วัน',
                        },
                        {
                            icon: '🏭', label: 'Capacity Utilization',
                            value: `${opd?.capacity_utilization ?? 0}%`,
                            sub: (opd?.capacity_utilization ?? 0) > 90 ? '🔴 เต็มความสามารถ' : (opd?.capacity_utilization ?? 0) > 70 ? '🟡 โหลดสูง' : '🟢 ยังรับได้',
                            color: (opd?.capacity_utilization ?? 0) > 90 ? '#f43f5e' : (opd?.capacity_utilization ?? 0) > 70 ? '#f59e0b' : '#10b981',
                            desc: '% ความสามารถสูงสุดทางทฤษฎีที่ใช้งานจริงวันนี้',
                            problem: (opd?.capacity_utilization ?? 0) <= 70
                                ? `Utilization ${opd?.capacity_utilization ?? 0}% — ยังมี Capacity เหลือ สามารถรองรับผู้ป่วยเพิ่มได้อีก ${100 - (opd?.capacity_utilization ?? 0)}% โดยไม่ต้องเพิ่มทรัพยากร อาจพิจารณาเปิดรับ Walk-in เพิ่มเติม`
                                : (opd?.capacity_utilization ?? 0) <= 90
                                    ? `Utilization ${opd?.capacity_utilization ?? 0}% — โหลดสูง ใกล้เต็ม Capacity ยังรับได้อีกเล็กน้อย แต่หากมี Surge จะเกิดคิวยาวทันที ความเสี่ยง: เวลารอเพิ่มขึ้น + Staff fatigue + Quality of care ลดลง`
                                    : `🚨 Utilization ${opd?.capacity_utilization ?? 0}% — เต็มความสามารถ! ระบบ Overloaded ผลกระทบทันที: เวลารอเพิ่มขึ้นแบบ Exponential (ทุก 1% ที่เกิน = เวลารอเพิ่ม 3-5 นาที), ความผิดพลาดทางการแพทย์เพิ่มขึ้น, เจ้าหน้าที่หมดแรง`,
                            recommend: (opd?.capacity_utilization ?? 0) <= 70
                                ? '✅ ยังมีพื้นที่: (1) เปิดรับ Walk-in เพิ่มช่วงที่ Utilization ต่ำ (2) จัด Slot สำหรับ Telemedicine follow-up (3) ใช้เวลาว่างทำ Staff training / Quality improvement'
                                : (opd?.capacity_utilization ?? 0) <= 90
                                    ? '📋 เตรียมพร้อม: (1) เตรียม Surge Plan สำหรับวันที่โหลดเกิน 90% (2) เพิ่ม Fast Track สำหรับ Simple case (3) ย้ายผู้ป่วยนัดที่ไม่เร่งด่วนไปวันที่ Utilization ต่ำ (4) เปิดคลินิกเย็น/เสาร์ลด Peak'
                                    : '🚨 ทำทันที: (1) Activate Surge Protocol — เรียก staff สำรอง (2) เปิดห้องตรวจเพิ่มเติมทุกห้องที่ว่าง (3) Divert case ไม่เร่งด่วนไปวันอื่น (4) แจ้งผู้ป่วย Walk-in ถึงเวลารอที่คาดการณ์ (5) เสนอ Management: วางแผนขยาย Capacity ภายในไตรมาสหน้า',
                        },
                    ];

                    // ━━ NEW: Professional Level 3 KPIs ━━
                    const proKPIs = [
                        {
                            icon: '📊', label: 'Median Wait (P50)',
                            value: `${opd?.median_wait ?? 0} นาที`,
                            sub: opd?.median_wait < 45 ? '✅ ดี (P50 < 45m)' : opd?.median_wait < 75 ? '🟡 ปานกลาง' : '🔴 สูงเกินเกณฑ์',
                            color: (opd?.median_wait ?? 99) < 45 ? '#10b981' : (opd?.median_wait ?? 99) < 75 ? '#f59e0b' : '#f43f5e',
                            desc: 'Median — ค่ากลางที่แท้จริง ไม่ถูกกระทบจาก Outliers',
                            problem: (opd?.median_wait ?? 99) < 45
                                ? `Median ${opd?.median_wait ?? 0} นาที — ครึ่งหนึ่งของผู้ป่วยรอไม่เกิน ${opd?.median_wait ?? 0} นาที สะท้อน Flow ที่มีประสิทธิภาพ ค่านี้ดีกว่า Mean เพราะไม่ถูกบิดเบือนจากผู้ป่วยที่รอนานผิดปกติ`
                                : (opd?.median_wait ?? 99) < 75
                                    ? `Median ${opd?.median_wait ?? 0} นาที — สูงกว่ามาตรฐาน 45 นาที หมายความว่าครึ่งหนึ่งของผู้ป่วยรอเกิน ${opd?.median_wait ?? 0} นาที แม้ Mean อาจดูดี แต่ Median บอกภาพจริงได้ดีกว่า`
                                    : `🚨 Median ${opd?.median_wait ?? 0} นาที — วิกฤต! ผู้ป่วยส่วนใหญ่รอเกิน 1 ชม. Median สูงกว่า Mean แสดงว่ามีผู้ป่วยจำนวนมากที่รอนาน (ไม่ใช่แค่ Outlier)`,
                            recommend: (opd?.median_wait ?? 99) < 45
                                ? '✅ ดี — Target: Median ≤ 30m เพื่อยกระดับเป็น Premium OPD'
                                : '📋 ลด Median: (1) Parallel Processing — เจาะเลือด/X-ray ก่อนพบแพทย์ (2) Walk-in Slot จำกัด ← ส่งเสริมนัดล่วงหน้า (3) Pre-registration Online ลด 10 นาทีแรก (4) เป้าหมาย: Median ≤ 45m ภายใน 30 วัน',
                        },
                        {
                            icon: '📈', label: 'P90 Wait Time',
                            value: `${opd?.p90_wait ?? 0} นาที`,
                            sub: `90% ของผู้ป่วยรอไม่เกินค่านี้`,
                            color: (opd?.p90_wait ?? 999) < 90 ? '#10b981' : (opd?.p90_wait ?? 999) < 150 ? '#f59e0b' : '#f43f5e',
                            desc: '90th Percentile — ตัวชี้วัด Worst-case ที่ผู้ป่วยส่วนใหญ่ประสบ',
                            problem: (opd?.p90_wait ?? 999) < 90
                                ? `P90 = ${opd?.p90_wait ?? 0} นาที — 90% ของผู้ป่วยรอไม่เกิน ${opd?.p90_wait ?? 0} นาที → Flow มีประสิทธิภาพดีแม้แต่ Worst-case`
                                : (opd?.p90_wait ?? 999) < 150
                                    ? `P90 = ${opd?.p90_wait ?? 0} นาที — มีผู้ป่วย 10% ที่รอเกิน ${opd?.p90_wait ?? 0} นาที ⚠️ Gap ระหว่าง Median กับ P90 สูง = มีบาง case ที่ติดกระบวนการนานเป็นพิเศษ`
                                    : `🚨 P90 = ${opd?.p90_wait ?? 0} นาที!! ผู้ป่วย 10% ต้องรอเกิน ${opd?.p90_wait ?? 0} นาที (>2.5 ชม.) → เสี่ยง Complaint / สูญเสียผู้ป่วย / ภาพลักษณ์ รพ.`,
                            recommend: (opd?.p90_wait ?? 999) < 90
                                ? '✅ ดี — Monitor ผู้ป่วย outlier (P99) เพื่อดูว่ามีจุดบอดตรงไหน'
                                : '📋 ลด P90: (1) ตรวจสอบ Long-wait cases ว่าเกิดจากขั้นตอนไหน (2) Alert system: แจ้งเมื่อผู้ป่วยรอเกิน 60m → Nurse Navigator ช่วย (3) VIP Fast-track สำหรับผู้สูงอายุ/พิการ (4) Daily audit: P90 ≤ 90m เป็นเป้าหมาย',
                        },
                        {
                            icon: '🔄', label: 'Revisit 7 วัน',
                            value: `${opd?.revisit_7d_pct ?? 0}%`,
                            sub: `${opd?.revisit_7d_count ?? 0} ราย มาซ้ำภายใน 7 วัน`,
                            color: (opd?.revisit_7d_pct ?? 0) < 15 ? '#10b981' : (opd?.revisit_7d_pct ?? 0) < 30 ? '#f59e0b' : '#f43f5e',
                            desc: '% ผู้ป่วยวันนี้ที่เคยมาภายใน 7 วันที่ผ่านมา',
                            problem: (opd?.revisit_7d_pct ?? 0) < 15
                                ? `Revisit ${opd?.revisit_7d_pct ?? 0}% — ต่ำ (Benchmark <15%) แสดงว่าผู้ป่วยได้รับการรักษาที่มีประสิทธิภาพตั้งแต่ครั้งแรก First-Contact Resolution สูง`
                                : (opd?.revisit_7d_pct ?? 0) < 30
                                    ? `Revisit ${opd?.revisit_7d_pct ?? 0}% (${opd?.revisit_7d_count ?? 0} ราย) — ปานกลาง อาจเกิดจากผู้ป่วยโรคเรื้อรังที่มีนัดถี่ หรือ Failed Treatment ที่ต้อง Revisit`
                                    : `🚨 Revisit ${opd?.revisit_7d_pct ?? 0}% — สูง! ผู้ป่วยเกือบ 1 ใน 3 เคยมาใน 7 วัน → ต้อง Audit: Chronic vs Acute Revisit เพื่อหาสาเหตุ`,
                            recommend: (opd?.revisit_7d_pct ?? 0) < 15
                                ? '✅ ดี — Monitor ว่า Low revisit ไม่ได้เกิดจาก Patient lost to follow-up'
                                : '📋 วิเคราะห์: (1) แยก Planned Revisit (นัด) vs Unplanned Revisit (มาเอง) (2) Unplanned สูง → ปรับปรุง Discharge instruction + ยาแก้ปวด (3) Planned สูง → ทำ Teleconsult follow-up แทน (4) เป้าหมาย: Unplanned Revisit < 5%',
                        },
                        {
                            icon: '💰', label: 'Revenue / Visit',
                            value: `฿${(opd?.avg_revenue_per_visit ?? 0).toLocaleString()}`,
                            sub: `Total: ฿${(opd?.total_opd_revenue ?? 0).toLocaleString()}`,
                            color: '#0ea5e9',
                            desc: 'รายได้เฉลี่ยต่อ Visit — สะท้อน Service intensity + Billing accuracy',
                            problem: (opd?.avg_revenue_per_visit ?? 0) > 0
                                ? `Rev/Visit ฿${(opd?.avg_revenue_per_visit ?? 0).toLocaleString()} (รวม ฿${(opd?.total_opd_revenue ?? 0).toLocaleString()}) — ${(opd?.avg_revenue_per_visit ?? 0) < 500 ? '⚠️ ต่ำ อาจมี Under-billing หรือ OPD ส่วนใหญ่เป็น Simple cases' : (opd?.avg_revenue_per_visit ?? 0) < 1500 ? 'ปกติ สอดคล้องกับ OPD case mix ทั่วไป' : '💎 สูง — Case mix มีความซับซ้อน/เฉพาะทางสูง'}`
                                : 'ยังไม่มีข้อมูลรายได้',
                            recommend: '📋 Optimize OPD Revenue: (1) ตรวจสอบ Missing charges ทุกสัปดาห์ (2) ชาร์จ Lab/Procedure ครบตามจริง (3) Benchmark Rev/Visit ระหว่าง Clinic เพื่อหา Under-billing (4) จัด Special Clinic ที่ Rev/Visit สูง เพิ่มเป็นช่วงเช้า/บ่าย',
                        },
                        {
                            icon: '⚡', label: 'Throughput Efficiency',
                            value: `${opd?.pte_ratio ?? 0}x`,
                            sub: opd?.pte_ratio >= 3 ? '🚀 ระบบไหลเร็ว' : opd?.pte_ratio >= 1 ? '✅ สมดุล' : '⚠️ คนรอเยอะกว่าเสร็จ',
                            color: (opd?.pte_ratio ?? 0) >= 3 ? '#10b981' : (opd?.pte_ratio ?? 0) >= 1 ? '#0ea5e9' : '#f43f5e',
                            desc: 'Completed / Still Here — อัตราส่วนเร็วให้บริการเสร็จ vs ยังรออยู่',
                            problem: (opd?.pte_ratio ?? 0) >= 3
                                ? `PTE = ${opd?.pte_ratio ?? 0}x — ดีเยี่ยม! จำนวนที่บริการเสร็จมากกว่าที่ยังรอ ${opd?.pte_ratio ?? 0} เท่า ER/Hospital Flow ไม่เกิดสะสม`
                                : (opd?.pte_ratio ?? 0) >= 1
                                    ? `PTE = ${opd?.pte_ratio ?? 0}x — สมดุลแต่ยังไม่โดดเด่น ระบบยังทำงานค่อนข้างช้าเทียบกับจำนวนผู้ป่วยที่เข้ามา ถ้า Demand เพิ่ม → คอขวดจะเกิดขึ้นทันที`
                                    : `🚨 PTE = ${opd?.pte_ratio ?? 0}x — ต่ำ! จำนวนที่ยังรอมากกว่าที่เสร็จ → ระบบ Overloaded ผู้ป่วยสะสมตลอดทั้งวัน ถ้าไม่แก้ไข → เวลารอจะยิ่งยาวขึ้นแบบ Exponential`,
                            recommend: (opd?.pte_ratio ?? 0) >= 3
                                ? '✅ ดี — เปรียบเทียบ PTE ช่วงเช้า vs บ่ายเพื่อดูว่าช่วงไหน Flow ดีกว่า และขยายผล'
                                : '📋 เพิ่ม PTE: (1) เพิ่มจุดบริการช่วง Peak (2) Lean hospital: ลด handoff ระหว่างขั้นตอน (3) ตั้งเป้า PTE ≥ 2x ในช่วงบ่าย (completions ควรเริ่มสะสมมากขึ้น) (4) Dashboard real-time ให้ผู้จัดการเห็น PTE ทุกชั่วโมง',
                        },
                    ];

                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>

                            {/* SQI Gauge */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                    {/* Track */}
                                    <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`}
                                        fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                    {/* Score arc */}
                                    <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`}
                                        fill="none" stroke={sqiColor} strokeWidth="14" strokeLinecap="round"
                                        strokeDasharray={`${dash} ${circumference}`}
                                        style={{ transition: 'stroke-dasharray 1s ease, stroke 0.5s' }} />
                                    {/* Score text */}
                                    <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={sqiColor} fontFamily="'Outfit',sans-serif">{sqi}</text>
                                    <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">SQI Score</text>
                                </svg>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '28px', fontWeight: 900, color: sqiColor, lineHeight: 1.1 }}>{sqiGrade}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: sqiColor }}>{sqiLabel}</div>
                                    <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '4px', lineHeight: 1.4 }}>
                                        Service Quality Index
                                    </div>
                                </div>

                                {/* ━━ SQI Component Bars ━━ */}
                                <div style={{ width: '100%', marginTop: '6px' }}>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>
                                        SQI Components
                                    </p>
                                    {(() => {
                                        const comp = opd?.sqi_components || {};
                                        const items = [
                                            comp.sla_compliance || { score: 0, weight: 40, label: 'SLA', desc: '' },
                                            comp.process_completion || { score: 0, weight: 30, label: 'Complete', desc: '' },
                                            comp.wait_stability || { score: 0, weight: 20, label: 'Stability', desc: '' },
                                            comp.doctor_yield || { score: 0, weight: 10, label: 'Yield', desc: '' },
                                        ];
                                        return items.map((c, i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }} title={c.desc}>
                                                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '50px', textAlign: 'right', flexShrink: 0 }}>
                                                        {c.label?.substring(0, 8)}
                                                    </span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '9px', fontWeight: 800, color: barColor, width: '22px', textAlign: 'right', flexShrink: 0 }}>{c.score}</span>
                                                    <span style={{ fontSize: '8px', fontWeight: 600, color: 'var(--md-text-tertiary)', width: '20px', textAlign: 'right', flexShrink: 0 }}>{c.weight}%</span>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>

                                {/* Bottleneck */}
                                <div style={{ width: '100%', background: 'rgba(244,63,94,.06)', border: '1px solid rgba(244,63,94,.15)', borderRadius: '10px', padding: '8px 12px', marginTop: '4px' }}>
                                    <p style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: '#f43f5e', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        🔴 Bottleneck
                                    </p>
                                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 900, color: 'var(--md-text-primary)', margin: 0 }}>
                                        {bottleneck?.label} — {bottleneck?.v} นาที
                                    </p>
                                    <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
                                        {stepArr.map((s, i) => (
                                            <div key={i} title={s.label} style={{
                                                flex: s.v, height: '6px', borderRadius: '99px',
                                                background: s.label === bottleneck?.label ? '#f43f5e' : `${s.color}60`,
                                                transition: 'flex 0.5s'
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Advanced KPI Cards with Problem + Recommend */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {advKPIs.map((k, i) => (
                                    <div key={i} style={{
                                        padding: '10px 14px', borderRadius: '12px',
                                        background: `${k.color}06`,
                                        border: `1px solid ${k.color}20`,
                                        transition: 'background 0.15s',
                                    }}>
                                        {/* Header row */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '22px', flexShrink: 0 }}>{k.icon}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    {k.label}
                                                </p>
                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                                    {k.desc}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <p style={{ margin: 0, fontSize: 'var(--fs-xl)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                            </div>
                                        </div>

                                        {/* Problem Analysis */}
                                        <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                📊 วิเคราะห์สถานการณ์
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.problem}
                                            </p>
                                        </div>

                                        {/* Recommendation */}
                                        <div style={{ marginTop: '4px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                💡 แนะนำเชิงนโยบาย
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.recommend}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* ━━ Professional Level 3 KPIs ━━ */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', marginBottom: '6px' }}>
                                    <div style={{ width: '3px', height: '16px', background: 'linear-gradient(180deg, #0ea5e9, #8b5cf6)', borderRadius: '99px' }} />
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        📐 Professional Data Analytics
                                    </span>
                                    <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 700, background: 'rgba(14,165,233,.08)', padding: '2px 6px', borderRadius: '99px' }}>Level 3</span>
                                </div>
                                {proKPIs.map((k, i) => (
                                    <div key={`pro-${i}`} style={{
                                        padding: '10px 14px', borderRadius: '12px',
                                        background: `${k.color}06`,
                                        border: `1px solid ${k.color}20`,
                                        transition: 'background 0.15s',
                                    }}>
                                        {/* Header row */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '22px', flexShrink: 0 }}>{k.icon}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    {k.label}
                                                </p>
                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                                    {k.desc}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <p style={{ margin: 0, fontSize: 'var(--fs-xl)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                            </div>
                                        </div>

                                        {/* Problem Analysis */}
                                        <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                📊 วิเคราะห์สถานการณ์
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.problem}
                                            </p>
                                        </div>

                                        {/* Recommendation */}
                                        <div style={{ marginTop: '4px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                💡 แนะนำเชิงนโยบาย
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.recommend}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━ Level 4: Operational Intelligence ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: '#f59e0b', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🎯 Operational Intelligence — Level 4
                </span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>วิเคราะห์เชิงปฏิบัติการ</span>
            </div>

            {!loading.opdToday && opd && (() => {
                const level4KPIs = [
                    {
                        icon: '👴', label: 'Elderly Ratio (≥60 ปี)',
                        value: `${opd?.elderly_pct ?? 0}%`,
                        sub: `${opd?.elderly_count ?? 0} ราย จากทั้งหมด ${opd?.today_total ?? 0}`,
                        color: (opd?.elderly_pct ?? 0) > 40 ? '#f43f5e' : (opd?.elderly_pct ?? 0) > 25 ? '#f59e0b' : '#10b981',
                        desc: 'สัดส่วนผู้สูงอายุ — ส่งผลต่อ Service time + ความต้องการ wheelchair/assist',
                        problem: (opd?.elderly_pct ?? 0) > 40
                            ? `🚨 ผู้สูงอายุ ${opd?.elderly_pct ?? 0}% — สูงมาก! ต้องใช้เวลาบริการมากขึ้น 1.5-2 เท่า ← สาเหตุหลักที่เวลารอเพิ่ม + ต้องมี Caregiver support → ใช้พื้นที่รอคอย 2 ที่นั่ง/ราย + ความเสี่ยง Fall prevention`
                            : (opd?.elderly_pct ?? 0) > 25
                                ? `ผู้สูงอายุ ${opd?.elderly_pct ?? 0}% — สูงกว่าค่าเฉลี่ย (25%) ต้องจัดพื้นที่และบริการรองรับเป็นพิเศษ`
                                : `ผู้สูงอายุ ${opd?.elderly_pct ?? 0}% — อยู่ในเกณฑ์ปกติ`,
                        recommend: (opd?.elderly_pct ?? 0) > 40
                            ? '🚨 (1) จัด Geriatric Fast Track ← ลดเวลารอ 40% (2) เพิ่มจุด wheelchair service (3) ป้าย/สัญลักษณ์ตัวใหญ่ + ช่วยเหลือเฉพาะ (4) จัด slot นัดผู้สูงอายุช่วง 08:00-10:00 ที่คิวยังไม่ยาว'
                            : '📋 คงมาตรฐาน — Monitor ว่า Elderly ไม่ได้รอนานกว่า non-elderly',
                    },
                    {
                        icon: '🌅', label: 'Morning/Afternoon Load',
                        value: `${opd?.morning_afternoon_ratio ?? 0}x`,
                        sub: `เช้า ${opd?.morning_count ?? 0} / บ่าย ${opd?.afternoon_count ?? 0} ราย`,
                        color: (opd?.morning_afternoon_ratio ?? 0) > 3 ? '#f43f5e' : (opd?.morning_afternoon_ratio ?? 0) > 2 ? '#f59e0b' : '#10b981',
                        desc: 'อัตราส่วน Load เช้า/บ่าย — สูง = ผู้ป่วยกระจุกตัวช่วงเช้า',
                        problem: (opd?.morning_afternoon_ratio ?? 0) > 3
                            ? `🚨 เช้า/บ่าย = ${opd?.morning_afternoon_ratio ?? 0}x — ผู้ป่วย ${Math.round(((opd?.morning_count ?? 0) / Math.max(1, (opd?.today_total ?? 1))) * 100)}% มาช่วงเช้า! ส่งผล: คิวยาว, เจ้าหน้าที่ Overload ช่วงเช้า แต่ว่างช่วงบ่าย (Underutilized)`
                            : (opd?.morning_afternoon_ratio ?? 0) > 2
                                ? `เช้า/บ่าย = ${opd?.morning_afternoon_ratio ?? 0}x — ยังกระจุกเช้า ควรดึง demand มาช่วงบ่ายเพิ่ม`
                                : `เช้า/บ่าย = ${opd?.morning_afternoon_ratio ?? 0}x — Load ค่อนข้างสมดุล`,
                        recommend: (opd?.morning_afternoon_ratio ?? 0) > 2
                            ? '📋 Demand Shifting: (1) นัดผู้ป่วยเรื้อรังช่วงบ่าย 13:00-15:00 (2) ลด Walk-in Slot เช้า ← บังคับให้กระจาย (3) ให้ส่วนลด Lab fee 5% สำหรับ slot บ่าย (4) ตั้งเป้า Morning/Afternoon ratio ≤ 2x ภายใน 30 วัน'
                            : '✅ ดี — คง Work pattern ปัจจุบัน',
                    },
                    {
                        icon: '⏱️', label: 'Time-to-First-Service',
                        value: `${opd?.avg_time_to_first_service ?? 0} นาที`,
                        sub: (opd?.avg_time_to_first_service ?? 0) <= 15 ? '✅ รวดเร็ว (≤15m)' : (opd?.avg_time_to_first_service ?? 0) <= 30 ? '🟡 ปานกลาง' : '🔴 ช้าเกินไป',
                        color: (opd?.avg_time_to_first_service ?? 99) <= 15 ? '#10b981' : (opd?.avg_time_to_first_service ?? 99) <= 30 ? '#f59e0b' : '#f43f5e',
                        desc: 'เวลาเฉลี่ยจากลงทะเบียนถึงจุดบริการแรก — First Impression ของผู้ป่วย',
                        problem: (opd?.avg_time_to_first_service ?? 99) <= 15
                            ? `TTFS ${opd?.avg_time_to_first_service ?? 0} นาที — ดีเยี่ยม! ผู้ป่วยเข้าสู่กระบวนการเร็ว ← ลด Anxiety + เพิ่ม Satisfaction`
                            : `TTFS ${opd?.avg_time_to_first_service ?? 0} นาที — ช้า! ผู้ป่วยต้อง \"รอลอย\" ก่อนเข้าสู่ขั้นตอนแรก → เกิด Anxiety สูง + เสี่ยง Dropout`,
                        recommend: (opd?.avg_time_to_first_service ?? 99) <= 15
                            ? '✅ ดีเยี่ยม — เป้า: TTFS ≤ 10m'
                            : '📋 ลด TTFS: (1) Pre-registration ออนไลน์ก่อนมาถึง (2) เพิ่ม Kiosk เช็คอินอัตโนมัติ (3) แยกคิว Walk-in vs นัด ← ผู้ป่วยนัดเข้าระบบทันที (4) เป้าหมาย: TTFS ≤ 15m ภายใน 30 วัน',
                    },
                    {
                        icon: '🏥', label: 'Active Clinics',
                        value: `${opd?.active_clinics ?? 0}`,
                        sub: `คลินิกที่เปิดให้บริการวันนี้`,
                        color: '#0ea5e9',
                        desc: 'จำนวนห้องตรวจ/คลินิกที่มีผู้ป่วยมารับบริการ',
                        problem: `ปัจจุบันมี ${opd?.active_clinics ?? 0} คลินิก — เฉลี่ย ${opd?.active_clinics > 0 ? Math.round((opd?.today_total ?? 0) / opd.active_clinics) : 0} ราย/คลินิก ${(opd?.today_total ?? 0) / Math.max(1, opd?.active_clinics ?? 1) > 50 ? '⚠️ โหลดต่อคลินิกสูง' : ''}`,
                        recommend: '📋 (1) เปิดคลินิกเพิ่มช่วง Peak ถ้า Load/Clinic > 40 (2) ย้าย Case ง่ายไปคลินิกที่ Load ต่ำ (3) Monitor Load distribution ทุก 2 ชั่วโมง',
                    },
                    {
                        icon: '💎', label: 'Revenue Density',
                        value: `฿${(opd?.revenue_per_hour ?? 0).toLocaleString()}`,
                        sub: `/ชั่วโมง — Total ฿${(opd?.total_opd_revenue ?? 0).toLocaleString()}`,
                        color: '#8b5cf6',
                        desc: 'รายได้ OPD ต่อชั่วโมง — สะท้อน Productivity ด้านการเงิน',
                        problem: (opd?.revenue_per_hour ?? 0) > 0
                            ? `Rev/Hour ฿${(opd?.revenue_per_hour ?? 0).toLocaleString()} — ${(opd?.revenue_per_hour ?? 0) < 10000 ? '⚠️ ค่อนข้างต่ำ อาจมี Under-billing หรือ Case mix เบา' : (opd?.revenue_per_hour ?? 0) < 30000 ? 'อยู่ในเกณฑ์ปกติ' : '💎 สูง — Case mix มีความซับซ้อน/เฉพาะทาง'}`
                            : 'ยังไม่มีข้อมูลรายได้',
                        recommend: '📋 เพิ่ม Revenue Density: (1) ลดเวลารอ → เพิ่ม Throughput → เพิ่ม Rev/Hour (2) จัด Special Clinic ที่ Revenue สูง slot เช้า (3) ตรวจสอบ Missing charges ทุกสัปดาห์',
                    },
                ];

                const level5KPIs = [
                    {
                        icon: '📊', label: 'Yesterday Comparison',
                        value: `${opd?.today_vs_yesterday_pct > 0 ? '+' : ''}${opd?.today_vs_yesterday_pct ?? 0}%`,
                        sub: `วันนี้ ${opd?.today_total ?? 0} vs เมื่อวาน ${opd?.yesterday_total ?? 0} ราย`,
                        color: Math.abs(opd?.today_vs_yesterday_pct ?? 0) <= 15 ? '#10b981' : (opd?.today_vs_yesterday_pct ?? 0) > 15 ? '#f59e0b' : '#0ea5e9',
                        desc: 'เปรียบเทียบ Volume วันนี้กับเมื่อวาน — ตรวจจับ Surge ได้เร็ว',
                        problem: Math.abs(opd?.today_vs_yesterday_pct ?? 0) <= 15
                            ? `Volume วันนี้ ${opd?.today_vs_yesterday_pct > 0 ? 'เพิ่ม' : 'ลด'} ${Math.abs(opd?.today_vs_yesterday_pct ?? 0)}% จากเมื่อวาน — อยู่ในเกณฑ์ปกติ (±15%)`
                            : (opd?.today_vs_yesterday_pct ?? 0) > 15
                                ? `⚠️ Volume เพิ่ม ${opd?.today_vs_yesterday_pct}%! อาจเป็น Surge — ตรวจสอบ: วันจันทร์หลังวันหยุดยาว? ช่วงเปลี่ยนฤดูกาล? โรคระบาด?`
                                : `Volume ลด ${Math.abs(opd?.today_vs_yesterday_pct ?? 0)}% — อาจเป็นวันที่คลินิกน้อย หรือวันหยุดนักขัตฤกษ์`,
                        recommend: Math.abs(opd?.today_vs_yesterday_pct ?? 0) > 20
                            ? '📋 ตรวจสอบ: (1) สาเหตุ Volume ผิดปกติ — เกิดจากปัจจัยภายนอก? (2) ถ้า Surge → Activate staffing plan (3) ถ้าลด → โอกาสทำ QI/Training'
                            : '✅ Volume ปกติ — คงแผนบุคลากรเดิม',
                    },
                    {
                        icon: '📅', label: 'Avg Age Profile',
                        value: `${opd?.avg_age ?? 0} ปี`,
                        sub: `เด็ก (<15) ${opd?.child_count ?? 0} ราย (${opd?.child_pct ?? 0}%)`,
                        color: '#6366f1',
                        desc: 'อายุเฉลี่ยผู้ป่วย — กำหนด Service model + staffing skill',
                        problem: `อายุเฉลี่ย ${opd?.avg_age ?? 0} ปี — ${(opd?.avg_age ?? 0) > 50 ? '⚠️ สูง → ต้อง Elderly-friendly service design' : (opd?.avg_age ?? 0) > 35 ? 'วัยกลางคน — NCD screening เป็นโอกาส' : 'กลุ่มอายุน้อย — Pediatric/Young adult care'}`,
                        recommend: `📋 ปรับ Service ตาม Age profile: ${(opd?.avg_age ?? 0) > 50 ? '(1) ขยาย Geriatric clinic (2) เพิ่ม Fall assessment (3) Polypharmacy review' : '(1) เพิ่ม Health screening packages (2) NCD prevention program (3) Wellness clinic'}`,
                    },
                    {
                        icon: '⏰', label: 'Wait Yesterday vs Today',
                        value: `${opd?.yesterday_avg_wait ?? 0} → ${opd?.avg_total_minutes ?? 0}`,
                        sub: (() => {
                            const diff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                            return diff > 0 ? `⬆️ เพิ่ม ${diff} นาที` : diff < 0 ? `⬇️ ลด ${Math.abs(diff)} นาที` : '= เท่าเดิม';
                        })(),
                        color: (() => {
                            const diff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                            return diff > 10 ? '#f43f5e' : diff < -5 ? '#10b981' : '#f59e0b';
                        })(),
                        desc: 'เปรียบเทียบเวลารอเฉลี่ย วันนี้ vs เมื่อวาน (นาที)',
                        problem: (() => {
                            const diff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                            return diff > 10 ? `⚠️ เวลารอเพิ่ม ${diff} นาทีจากเมื่อวาน — ตรวจสอบ: มีแพทย์ลดลง? Volume เพิ่ม? ระบบขัดข้อง?` : diff < -5 ? `✅ เวลารอลดลง ${Math.abs(diff)} นาที — Flow ดีขึ้นจากเมื่อวาน` : 'เวลารอคงที่';
                        })(),
                        recommend: (() => {
                            const diff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                            return diff > 10 ? '📋 (1) ตรวจสอบ Bottleneck Step ว่าจุดไหนเพิ่มขึ้น (2) เรียกแพทย์สำรองถ้า Volume สูง (3) เปิดห้องตรวจเพิ่ม' : '✅ คงมาตรฐาน';
                        })(),
                    },
                    {
                        icon: '🏆', label: 'Daily Performance Index (DPI)',
                        value: (() => {
                            const sla = opd?.sla_pct ?? 0;
                            const comp = opd?.completion_rate ?? 0;
                            const doCtor = opd?.doctor_yield_pct ?? 0;
                            const cap = opd?.capacity_utilization ?? 0;
                            const waitDiff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                            const waitScore = Math.max(0, Math.min(100, 100 - Math.abs(waitDiff) * 2));
                            const dpi = Math.round(sla * 0.3 + comp * 0.25 + doCtor * 0.15 + (100 - Math.min(100, cap)) * 0.1 + waitScore * 0.2);
                            return dpi;
                        })(),
                        sub: (() => {
                            const dpi = (() => {
                                const sla = opd?.sla_pct ?? 0;
                                const comp = opd?.completion_rate ?? 0;
                                const doCtor = opd?.doctor_yield_pct ?? 0;
                                const cap = opd?.capacity_utilization ?? 0;
                                const waitDiff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                                const waitScore = Math.max(0, Math.min(100, 100 - Math.abs(waitDiff) * 2));
                                return Math.round(sla * 0.3 + comp * 0.25 + doCtor * 0.15 + (100 - Math.min(100, cap)) * 0.1 + waitScore * 0.2);
                            })();
                            return dpi >= 80 ? '🏆 Grade A — วันนี้ยอดเยี่ยม' : dpi >= 60 ? '🥈 Grade B — พอใช้ได้' : '🔴 Grade C — ต้องปรับปรุง';
                        })(),
                        color: (() => {
                            const dpi = (() => {
                                const sla = opd?.sla_pct ?? 0;
                                const comp = opd?.completion_rate ?? 0;
                                const doCtor = opd?.doctor_yield_pct ?? 0;
                                const cap = opd?.capacity_utilization ?? 0;
                                const waitDiff = (opd?.avg_total_minutes ?? 0) - (opd?.yesterday_avg_wait ?? 0);
                                const waitScore = Math.max(0, Math.min(100, 100 - Math.abs(waitDiff) * 2));
                                return Math.round(sla * 0.3 + comp * 0.25 + doCtor * 0.15 + (100 - Math.min(100, cap)) * 0.1 + waitScore * 0.2);
                            })();
                            return dpi >= 80 ? '#10b981' : dpi >= 60 ? '#f59e0b' : '#f43f5e';
                        })(),
                        desc: 'Composite index: SLA(30%) + Completion(25%) + Wait Trend(20%) + Yield(15%) + Capacity(10%)',
                        problem: 'DPI รวม 5 มิติหลักเป็นตัวเลขเดียว — ติดตามทุกวันเพื่อดู Trend ประสิทธิภาพโดยรวม',
                        recommend: '📋 ใช้ DPI เป็น Daily Scorecard: (1) ตั้งเป้า DPI ≥ 75 ทุกวัน (2) ถ้า DPI < 60 → ประชุม Debrief สิ้นวัน (3) เปรียบเทียบ DPI รายสัปดาห์ เพื่อดู Improvement trend',
                    },
                ];

                return (
                    <>
                        {/* Level 4 */}
                        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {level4KPIs.map((k, i) => (
                                    <div key={`l4-${i}`} style={{
                                        padding: '10px 14px', borderRadius: '12px',
                                        background: `${k.color}06`,
                                        border: `1px solid ${k.color}20`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '22px', flexShrink: 0 }}>{k.icon}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    {k.label}
                                                </p>
                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                                    {k.desc}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <p style={{ margin: 0, fontSize: 'var(--fs-xl)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                📊 วิเคราะห์สถานการณ์
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.problem}
                                            </p>
                                        </div>
                                        <div style={{ marginTop: '4px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                💡 แนะนำเชิงนโยบาย
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.recommend}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Level 5: Strategic Analytics */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: '#ec4899', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🏆 Strategic Analytics — Level 5
                            </span>
                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>เปรียบเทียบ & สรุปภาพรวม</span>
                        </div>

                        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {level5KPIs.map((k, i) => (
                                    <div key={`l5-${i}`} style={{
                                        padding: '10px 14px', borderRadius: '12px',
                                        background: `${k.color}06`,
                                        border: `1px solid ${k.color}20`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '22px', flexShrink: 0 }}>{k.icon}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    {k.label}
                                                </p>
                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                                    {k.desc}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <p style={{ margin: 0, fontSize: 'var(--fs-xl)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                📊 วิเคราะห์สถานการณ์
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.problem}
                                            </p>
                                        </div>
                                        <div style={{ marginTop: '4px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                                                💡 แนะนำเชิงนโยบาย
                                            </p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                                {k.recommend}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            })()}

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel ━━━━━━ */}
            {!loading.opdToday && opd && (() => {
                // ─── Cross-analyze ALL metrics to find TRUE root problems ───
                const avgWait = opd?.avg_total_minutes || 0;
                const slaPct = opd?.sla_pct || 0;
                const stddev = opd?.wait_stddev || 0;
                const dropoutPct = opd?.dropout_pct || 0;
                const dropoutCount = opd?.dropout_count || 0;
                const completionRate = opd?.completion_rate || 0;
                const doctorYield = opd?.doctor_yield_pct || 0;
                const capacityUtil = opd?.capacity_utilization || 0;
                const medianWait = opd?.median_wait || 0;
                const p90Wait = opd?.p90_wait || 0;
                const pteRatio = opd?.pte_ratio || 0;
                const maxWait = opd?.max_wait || 0;
                const waitingDoctor = opd?.waiting_doctor || 0;
                const todayTotal = opd?.today_total || 0;
                const completed = opd?.completed || 0;
                const stillHere = opd?.still_here || 0;
                const revPerVisit = opd?.avg_revenue_per_visit || 0;
                const totalRevenue = opd?.total_opd_revenue || 0;
                const revisit7d = opd?.revisit_7d_pct || 0;
                const sqi = opd?.sqi || 0;

                const steps = opd?.wait_steps || {};
                const regToScreen = steps.registration_to_screening || 0;
                const screenToDoc = steps.screening_to_doctor || 0;
                const docToRx = steps.doctor_to_pharmacy || 0;
                const rxToFin = steps.pharmacy_to_finance || 0;
                const stepArr = [
                    { label: 'ลงทะเบียน→คัดกรอง', v: regToScreen, key: 'reg' },
                    { label: 'คัดกรอง→พบแพทย์', v: screenToDoc, key: 'screen' },
                    { label: 'พบแพทย์→รับยา', v: docToRx, key: 'doc' },
                    { label: 'รับยา→ชำระเงิน', v: rxToFin, key: 'rx' },
                ];
                const bottleneckStep = stepArr.reduce((a, b) => b.v > a.v ? b : a, stepArr[0]);
                const totalStepTime = regToScreen + screenToDoc + docToRx + rxToFin;

                // ─── Detect all problems with severity levels ───
                const problems = [];

                // 1. Bottleneck Step Analysis (always first — root of most issues)
                if (bottleneckStep.v > 0 && totalStepTime > 0) {
                    const bottleneckPct = Math.round((bottleneckStep.v / totalStepTime) * 100);
                    const isCritical = bottleneckStep.v >= 30;
                    const isWarn = bottleneckStep.v >= 15 && !isCritical;

                    if (isCritical || isWarn) {
                        const rootCauseMap = {
                            'reg': {
                                causes: 'ระบบลงทะเบียนเป็นคอขวดหลัก — สาเหตุที่แท้จริงคือ: (1) เอกสาร/บัตรประชาชนถูกตรวจสอบซ้ำซ้อน (2) ระบบ HIS รอ response นาน (3) จุดลงทะเบียนมีน้อยเกินไปเทียบกับ demand ช่วง Peak (4) ไม่มีระบบ Pre-registration ให้ผู้ป่วยกรอกข้อมูลล่วงหน้า',
                                cascade: `ผลกระทบลูกโซ่: ผู้ป่วยทุกรายต้องผ่านจุดนี้ก่อน → ทำให้ทุกขั้นตอนถัดไปถูก delay ต่อเนื่อง แม้ขั้นตอนตรวจรักษาจะเร็ว แต่ผู้ป่วยรับรู้ว่า "รอนานมาก" เพราะเสียเวลาตั้งแต่ก้าวแรก ← สิ่งนี้ทำลาย First Impression ของผู้ป่วยโดยตรง`,
                                fix: `🔧 แก้ทันที: (1) เปิดจุดลงทะเบียนเพิ่ม 1-2 จุดช่วง 08:00-10:00 (Peak) (2) เพิ่ม Kiosk Self Check-in สำหรับผู้ป่วยเก่า (มีข้อมูลในระบบแล้ว) (3) Pre-registration ผ่าน LINE/App ก่อนมาถึง ← ลดเวลาจุดนี้ได้ 60-80% (4) แยกคิว Walk-in vs นัดล่วงหน้า — ผู้ป่วยนัดควรผ่านเร็วกว่า`,
                            },
                            'screen': {
                                causes: `ขั้นตอน "คัดกรอง→พบแพทย์" เป็น Critical Bottleneck ที่แท้จริง — ใช้เวลามากที่สุด ${bottleneckStep.v} นาที (${bottleneckPct}% ของเวลารวม) สาเหตุลึก: (1) จำนวนแพทย์ไม่เพียงพอเทียบกับจำนวนผู้ป่วยที่ผ่านคัดกรอง (2) ห้องตรวจไม่เพียงพอ/ห้องตรวจว่างแต่ไม่มีแพทย์ (3) Case complexity สูง — แพทย์ใช้เวลาตรวจนาน (4) ไม่มีระบบ Pre-consultation assessment ให้พยาบาลรวบรวมข้อมูลก่อน`,
                                cascade: `ผลกระทบลูกโซ่ร้ายแรง: ผู้ป่วยคัดกรองเสร็จแล้วแต่ต้อง "รอลอย" → เกิดความรู้สึก "ถูกลืม" → Dropout Rate เพิ่มขึ้น (ปัจจุบัน ${dropoutPct}%) → ผู้ป่วยที่ยังรอ (${stillHere} ราย) ส่วนใหญ่ติดค้างที่จุดนี้ → Doctor Yield ต่ำ (${doctorYield}%) เพราะเวลาจริงกับแพทย์น้อยมากเทียบกับเวลารอ → Patient Satisfaction ลดลงอย่างมีนัยสำคัญ`,
                                fix: `🔧 ต้องแก้ก่อนเรื่องอื่น: (1) เพิ่มห้องตรวจ/แพทย์ช่วง Peak (08:00-11:00) อย่างน้อย 1-2 ห้อง (2) ใช้ Nurse Practitioner ทำ Pre-assessment: ซักประวัติ, วัด vital signs, ส่ง Lab เบื้องต้น ← ลดเวลาพบแพทย์จริง (3) แยก Fast Track: ผู้ป่วยเรื้อรังที่นัดตามมาเอายา ไม่ต้องรอคิวรวม (4) Parallel Processing: ส่งตรวจ Lab/X-ray ก่อนพบแพทย์ แทนที่จะไปตรวจหลังพบ`,
                            },
                            'doc': {
                                causes: `ขั้นตอน "พบแพทย์→รับยา" ใช้เวลานานที่สุด ${bottleneckStep.v} นาที — สะท้อน 2 ปัญหาลึก: (1) ระบบสั่งยา Electronic Prescription ช้า หรือแพทย์ต้อง key ข้อมูลมาก (2) ห้องจ่ายยารับ Order ช้า เพราะยาบางรายการต้อง prepare/ผสม (3) กรณีต้องรอ Lab ก่อนสั่งยา — ผู้ป่วยค้างรอยาวนาน (4) Communication gap ระหว่างแพทย์กับเภสัชกร`,
                                cascade: `ผล: ผู้ป่วยตรวจเสร็จแล้วแต่ยัง "ค้าง" ในระบบ → PTE Ratio ต่ำ (${pteRatio}x) เพราะคนรอมากกว่าคนเสร็จ → Capacity Utilization สูงเกินจริง (${capacityUtil}%) ทั้งที่ห้องตรวจว่างแล้ว แต่ผู้ป่วยยังไม่ออก → กีดขวาง Flow ของผู้ป่วยรายถัดไป`,
                                fix: `🔧 แก้ทันที: (1) ใช้ Electronic Prescription + Auto-dispense สำหรับยาที่ใช้บ่อย (2) Pre-packing ยาสำหรับ Chronic patients ที่มียา fixed regimen (3) Satellite Pharmacy ใน OPD Zone ← ลดระยะเดิน + เวลารอ (4) เภสัชกรเริ่ม review order ตั้งแต่แพทย์ส่ง prescription ไม่ต้องรอผู้ป่วยมาถึง`,
                            },
                            'rx': {
                                causes: `ขั้นตอนชำระเงินเป็น Bottleneck สุดท้าย — ใช้เวลา ${bottleneckStep.v} นาที สาเหตุ: (1) คิวชำระเงินยาว — จุดชำระน้อยเกินไป (2) ตรวจสอบสิทธิ์ซ้ำที่จุดชำระ (ควรทำตั้งแต่ลงทะเบียน) (3) ระบบ Payment gateway ช้า (4) ผู้ป่วยสิทธิ์ UC/ประกันสังคมต้องรอ verify นาน`,
                                cascade: `ผล: แม้ขั้นตอนนี้เป็น "ขั้นตอนสุดท้าย" แต่ส่งผลต่อ Completion Rate (${completionRate}%) โดยตรง — ผู้ป่วยบางส่วนรับยาแล้วกลับบ้านโดยไม่ชำระ (สิทธิ์ UC) ← MIL milestone ไม่ถูกบันทึก → Revenue Leakage + ข้อมูลไม่ครบ`,
                                fix: `🔧 แก้ง่ายสุด: (1) ชำระเงินผ่าน QR/PromptPay แบบ Contactless ← ไม่ต้องรอคิว (2) สิทธิ์ UC/ประกันสังคม: Auto-verify ตั้งแต่ลงทะเบียน ไม่ต้อง verify ซ้ำ (3) เพิ่มจุดชำระเงินอัตโนมัติ (Kiosk) (4) ผู้ป่วยนัดตาม: ชำระล่วงหน้าผ่าน App`,
                            },
                        };
                        const detail = rootCauseMap[bottleneckStep.key] || rootCauseMap['screen'];
                        problems.push({
                            priority: 1,
                            severity: isCritical ? 'critical' : 'warning',
                            title: `🔴 คอขวดหลัก: "${bottleneckStep.label}" — ใช้เวลา ${bottleneckStep.v} นาที (${bottleneckPct}% ของเวลารวม)`,
                            rootCause: detail.causes,
                            cascadeEffect: detail.cascade,
                            fixFirst: detail.fix,
                            color: isCritical ? '#f43f5e' : '#f59e0b',
                        });
                    }
                }

                // 2. Overloaded System (Capacity + PTE combined)
                if (capacityUtil > 85 || pteRatio < 1.5) {
                    const isCritical = capacityUtil > 90 || pteRatio < 1;
                    problems.push({
                        priority: 2,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 ระบบ Overloaded: Capacity ${capacityUtil}% + PTE เพียง ${pteRatio}x`,
                        rootCause: `Capacity Utilization ${capacityUtil}% ${capacityUtil > 90 ? '— เกินขีดจำกัด!' : '— ใกล้เต็ม'} ขณะเดียวกัน PTE (Completed/Still Here) = ${pteRatio}x ${pteRatio < 1 ? '— วิกฤต! คนรอมากกว่าคนเสร็จ' : '— สมดุลแต่ไม่มี buffer'} ── สาเหตุที่แท้จริง: (1) จำนวน Input (ผู้ป่วยเข้า ${todayTotal} ราย) สูงกว่า Output (เสร็จ ${completed} ราย) อย่างต่อเนื่อง (2) กระบวนการมี Waste time มาก — ผู้ป่วยใช้เวลา "รอ" มากกว่า "รับบริการ" (Doctor Yield เพียง ${doctorYield}%) (3) ไม่มี Load Balancing: ผู้ป่วยกระจุกช่วง 08-10 น. แต่ Resource คงที่ตลอดวัน`,
                        cascadeEffect: `ผลกระทบ Exponential: เมื่อ Utilization เกิน 85% → เวลารอเพิ่มขึ้นแบบ non-linear (ทุก 5% ที่เกิน ≈ เวลารอเพิ่ม 15-20 นาที) → Staff fatigue สะสม → Error rate สูงขึ้น → Dropout Rate เพิ่ม (${dropoutPct}%) → Revenue สูญเสียจากผู้ป่วยที่ออกก่อน ≈ ${dropoutCount} ราย × ฿${revPerVisit.toLocaleString()} = ฿${(dropoutCount * revPerVisit).toLocaleString()} ต่อวัน`,
                        fixFirst: `🔧 ด่วน: (1) Demand Management: กระจายผู้ป่วยนัดออกจาก Peak hour — นัดเหลื่อมเวลา 30 นาที (2) Supply Boost: เพิ่มห้องตรวจ/แพทย์ช่วง Peak อย่างน้อย 20% (3) Fast Track Lane: แยก Simple case (ต่อยา, ตรวจทั่วไป) ออกจากคิวหลัก — ลด Load ถ้วนหน้า (4) Telemedicine: Follow-up visit ผ่าน VDO call ← ลดจำนวนผู้ป่วย Walk-in ลง 10-15%`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 3. Wait Time Inequality (High σ + P90 gap)
                if (stddev > 20 || (p90Wait > 0 && medianWait > 0 && (p90Wait / Math.max(medianWait, 1)) > 2)) {
                    const gapRatio = medianWait > 0 ? Math.round(p90Wait / medianWait * 10) / 10 : 0;
                    problems.push({
                        priority: 3,
                        severity: stddev > 30 ? 'critical' : 'warning',
                        title: `🟡 ความเหลื่อมล้ำในการรอ: σ=${stddev} นาที, P90/Median = ${gapRatio}x`,
                        rootCause: `ผู้ป่วยได้รับประสบการณ์ที่ "ไม่เท่าเทียม" อย่างชัดเจน — Median (ค่ากลาง) = ${medianWait} นาที แต่ P90 = ${p90Wait} นาที หมายความว่า 10% ของผู้ป่วยรอนานกว่าค่ากลางถึง ${gapRatio} เท่า !! สาเหตุลึก: (1) ผู้ป่วย Complex case (ต้อง Lab/X-ray หลายอย่าง) ถูก mix กับ Simple case ในคิวเดียวกัน (2) บาง Clinic มีแพทย์เฉพาะทางน้อย → คิวยาวเฉพาะจุด ในขณะที่ Clinic อื่นว่าง (3) ระบบคิวไม่มี Priority/Triage → มาก่อนได้ก่อน แม้จะเป็น case ง่าย (4) ผู้ป่วยที่ต้อง "วนรอ Lab" ถูกนำกลับเข้าคิวใหม่ — ทำให้เวลารวมพุ่งสูง`,
                        cascadeEffect: `ผลกระทบทางจิตวิทยา: ผู้ป่วยที่รอนาน (P90 = ${p90Wait} นาที) จะเห็นคนที่มาทีหลังได้รับบริการก่อน → เกิดความรู้สึก "ไม่ยุติธรรม" → Complaint เพิ่มขึ้น → NPS (Net Promoter Score) ลดลง → บอกต่อแง่ลบ 5-10 คน/ราย ● ในด้านข้อมูล: σ สูง = ค่า Mean (เฉลี่ย) ไม่น่าเชื่อถือ — ผู้บริหารเห็น "เฉลี่ย ${avgWait} นาที" คิดว่าปกติ แต่ความจริง 10% ของผู้ป่วยรอเกิน ${p90Wait} นาที`,
                        fixFirst: `🔧 ต้องทำ: (1) แยกผู้ป่วยตาม Complexity: Simple Track (ต่อยา, ผลตรวจปกติ) ≤ 20 นาที vs Complex Track (ต้อง Lab/Consult) (2) จัดคิว Priority-based: ผู้สูงอายุ 70+, หญิงตั้งครรภ์, ผู้พิการ → Fast Lane (3) ระบบ Alert: เมื่อผู้ป่วยรอเกิน 60 นาที → Nurse Navigator ตาม + แจ้งสถานะ (4) Clinic-level load balancing: Dashboard ให้ผู้จัดการเห็นคิวทุก Clinic แบบ Real-time → ย้ายผู้ป่วยไป Clinic ที่ว่าง`,
                        color: stddev > 30 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 4. Low Doctor Yield (waste problem)
                if (doctorYield > 0 && doctorYield < 25) {
                    problems.push({
                        priority: 4,
                        severity: doctorYield < 15 ? 'critical' : 'warning',
                        title: `🟡 Doctor Yield ต่ำ: เพียง ${doctorYield}% — ${100 - doctorYield}% ของเวลาเป็น "Waste"`,
                        rootCause: `ผู้ป่วยใช้เวลาทั้งหมดเฉลี่ย ${avgWait} นาที แต่อยู่กับแพทย์จริงเพียง ${doctorYield}% (≈${Math.round(avgWait * doctorYield / 100)} นาที) อีก ${100 - doctorYield}% เป็นเวลา "Non-value-added": รอลงทะเบียน, รอคัดกรอง, รอเข้าห้องตรวจ, รอรับยา, รอชำระเงิน ── ปัญหาที่แท้จริง: ระบบถูกออกแบบเป็น Sequential (ทำทีละขั้นตอน) แทนที่จะเป็น Parallel Processing`,
                        cascadeEffect: `ผลกระทบต่อ Patient Experience: ผู้ป่วยมา รพ. ตั้งแต่ 08:00 กลับบ้าน 11:00 (3 ชม.) แต่ "ได้ตรวจ" จริง 5-8 นาที → ความรู้สึก: ไม่คุ้มค่าเวลา, เสียวันทำงาน → ครั้งหน้ามีแนวโน้มไป Healthcare อื่น (Private/Clinic ใกล้บ้าน) → Long-term: ผู้ป่วยลดลง, รายได้ลดลง`,
                        fixFirst: `🔧 ยกระดับ: (1) Parallel Processing: ส่ง Lab/X-ray ก่อนพบแพทย์ — Nurse สั่ง Standing order ตาม Protocol (2) Pre-consultation: พยาบาลซักประวัติ + ตรวจ Vital Signs + Document พร้อม → แพทย์เห็นข้อมูลทั้งหมดก่อนพบผู้ป่วย (3) ระบบนัดแบบ Time-slot: นัดทุก 15 นาที แทนนัดมาพร้อมกันตอนเช้า (4) เป้าหมาย: Doctor Yield ≥ 30% ภายใน 60 วัน`,
                        color: doctorYield < 15 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 5. Dropout / Revenue Leakage
                if (dropoutPct > 5 || completionRate < 80) {
                    const estLoss = dropoutCount * revPerVisit;
                    problems.push({
                        priority: 5,
                        severity: dropoutPct > 10 || completionRate < 70 ? 'critical' : 'warning',
                        title: `🟠 Revenue Leakage: Dropout ${dropoutPct}% + Completion ${completionRate}%`,
                        rootCause: `มี 2 ปัญหาที่เชื่อมโยงกัน: (A) Dropout ${dropoutPct}% (${dropoutCount} ราย) — ผู้ป่วยลงทะเบียนแล้วออกก่อนตรวจ สาเหตุหลัก: ${avgWait > 60 ? `เวลารอเฉลี่ย ${avgWait} นาทีเกิน Tolerable threshold (45-60 นาที)` : 'ขาดข้อมูลสถานะคิว / ไม่ทราบว่าต้องรออีกนานเท่าไร'} (B) Completion ${completionRate}% — ผู้ป่วย ${Math.round(todayTotal * (100 - completionRate) / 100)} รายไม่ผ่านครบทุก MIL milestone สาเหตุ: Service time ไม่ถูก scan, ข้ามขั้นตอนชำระเงิน (สิทธิ์ UC), หรือระบบ MIL มีปัญหาเทคนิค`,
                        cascadeEffect: `ผลกระทบทางการเงิน: Revenue Loss ≈ ฿${estLoss.toLocaleString()}/วัน (฿${(estLoss * 30).toLocaleString()}/เดือน) จาก Dropout เพียงอย่างเดียว ● Completion ต่ำ → ข้อมูลเบิกจ่ายไม่ครบ → สปสช./ประกันสังคม reject claim → Revenue Leakage ซ้ำซ้อน ● ระยะยาว: ข้อมูล Clinical ไม่สมบูรณ์ → HA Accreditation เสี่ยง → ภาพลักษณ์ รพ.`,
                        fixFirst: `🔧 Quick Win: (1) ติดจอแสดงคิว Real-time ทุกจุดรอ — ผู้ป่วยเห็น "อีก 5 คนจะถึงคิว" ← ลด Dropout ได้ 30-50% ทันที (2) LINE Notify: แจ้งเตือนเมื่อใกล้ถึงคิว → ผู้ป่วยไม่ต้องนั่งรอ (3) ต้นเรื่อง MIL: Audit ระบบ Service time — ตรวจว่าทุกจุดมี barcode scan (4) Process Coordinator: มอบหมาย 1 คนดูแล Flow ตลอดวัน`,
                        color: dropoutPct > 10 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 6. SLA Failure
                if (slaPct < 70 && slaPct > 0) {
                    problems.push({
                        priority: 6,
                        severity: slaPct < 50 ? 'critical' : 'warning',
                        title: `🟠 SLA ≤60 นาที: ผ่านเพียง ${slaPct}% — ต่ำกว่าเกณฑ์ 80%`,
                        rootCause: `${100 - slaPct}% ของผู้ป่วย (≈${Math.round(completed * (100 - slaPct) / 100)} ราย) ใช้เวลาเกิน 60 นาที ── สาเหตุ: SLA fail เป็น "Symptom" ไม่ใช่ "Root cause" ── ต้นเหตุจริงคือ Bottleneck ที่ "${bottleneckStep.label}" (${bottleneckStep.v} นาที) + Capacity Overload (${capacityUtil}%) รวมกัน ● เปรียบเทียบ: ถ้าไม่มี Bottleneck + Capacity ปกติ → SLA น่าจะอยู่ที่ 85-95%`,
                        cascadeEffect: `SLA ต่ำ → SQI Score ถูก drag ลง (SLA มี weight 40%) → SQI ปัจจุบัน ${sqi}/100 → ส่งผลต่อ KPI ของ รพ. ในภาพรวม ● เทียบ KPI สพฐ./สปสช.: SLA ≤60 นาที ควรได้ ≥80% เพื่อผ่านเกณฑ์ประเมิน`,
                        fixFirst: `🔧 SLA จะดีขึ้นเองเมื่อแก้ Bottleneck + Capacity ข้างต้น แต่ระหว่างนี้: (1) ตั้งเป้า SLA ≥70% ภายใน 14 วัน, ≥80% ภายใน 30 วัน (2) Monitor real-time: Alert เมื่อผู้ป่วยใกล้ครบ 45 นาที → เร่ง Fast-forward (3) แยก Track: Simple case ← ควรได้ SLA 95% (≤30 นาที), Complex case ← SLA ≤90 นาที`,
                        color: slaPct < 50 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 7. High Revisit Rate
                if (revisit7d > 20) {
                    problems.push({
                        priority: 7,
                        severity: revisit7d > 30 ? 'critical' : 'warning',
                        title: `🟡 Revisit 7 วัน: ${revisit7d}% — ผู้ป่วยมาซ้ำสูง`,
                        rootCause: `${revisit7d}% ของผู้ป่วยวันนี้เคยมาภายใน 7 วันที่ผ่านมา — ต้องวิเคราะห์แยก 2 กลุ่ม: (A) Planned Revisit (นัดตาม/เอาผลตรวจ) — ปกติ แต่ถ้าสูงเกินไป หมายความว่า รพ. ยังไม่มีระบบ Teleconsult ที่ดี ← ผู้ป่วยต้องมาเจอแพทย์ทุกครั้ง (B) Unplanned Revisit (อาการไม่ดีขึ้น, มาเอง) — น่ากังวล: Treatment ครั้งแรกไม่ effective หรือ Discharge instruction ไม่ชัดเจน`,
                        cascadeEffect: `Revisit สูง → เพิ่ม Load ให้ระบบทุกวัน → Capacity Utilization สูงขึ้น (${capacityUtil}%) → คิวยาวขึ้น → ผู้ป่วยใหม่ได้รับบริการช้าลง → วงจรอุบาทว์ ● Revenue impact: Revisit สิทธิ์ UC = ภาระต้นทุน (ไม่ได้ Revenue เพิ่ม)`,
                        fixFirst: `🔧 แยกแก้ตามกลุ่ม: (A) Planned: เปลี่ยนเป็น Teleconsult follow-up 50% ← ลด load ลง ${Math.round(opd?.revisit_7d_count * 0.5) || 0} ราย/วัน (B) Unplanned: Audit clinical records — หา Treatment failure rate + ปรับ Discharge protocol`,
                        color: revisit7d > 30 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // If no significant problems, show positive summary
                if (problems.length === 0) {
                    problems.push({
                        priority: 0,
                        severity: 'good',
                        title: '✅ ระบบ OPD ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `SQI Score ${sqi}/100 (${sqi >= 80 ? 'ดีเยี่ยม' : 'อยู่ในเกณฑ์'}) ● SLA ${slaPct}% ● Completion ${completionRate}% ● Doctor Yield ${doctorYield}% ● Dropout ${dropoutPct}% ● Capacity ${capacityUtil}% — ตัวชี้วัดทั้งหมดอยู่ในเกณฑ์ที่ยอมรับได้`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — ระบบทำงานราบรื่น ควร Monitor อย่างต่อเนื่องเพื่อตรวจจับปัญหาก่อนลุกลาม`,
                        fixFirst: `🎯 Continuous Improvement: (1) ตั้งเป้ายกระดับ SQI ≥ ${Math.min(sqi + 10, 100)} ภายไตรมาสหน้า (2) Benchmark เทียบ รพ. ระดับเดียวกัน (3) Patient feedback survey ทุกเดือน`,
                        color: '#10b981',
                    });
                }

                // Sort by priority
                problems.sort((a, b) => a.priority - b.priority);

                // Calculate overall urgency score
                const criticalCount = problems.filter(p => p.severity === 'critical').length;
                const warningCount = problems.filter(p => p.severity === 'warning').length;
                const urgencyScore = Math.min(10, criticalCount * 3 + warningCount * 1.5);
                const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
                const urgencyLabel = urgencyScore >= 7 ? 'ต้องดำเนินการทันที' : urgencyScore >= 4 ? 'ควรแก้ไขเร็ว' : 'สถานการณ์ปกติ';

                return (
                    <>
                        {/* Section Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: '#f43f5e', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🔥 วิเคราะห์สถานการณ์เชิงลึก — Deep Root-Cause Analysis
                            </span>
                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>วิเคราะห์ข้ามตัวชี้วัดเพื่อหาปัญหาที่แท้จริง</span>
                        </div>

                        <div className={`glass-card ${urgencyScore >= 7 ? 'alert-critical' : urgencyScore >= 4 ? 'alert-warning' : ''}`} style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>

                            {/* ─── Urgency Overview Bar ─── */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center',
                                padding: '1rem 1.25rem', borderRadius: '14px',
                                background: `linear-gradient(135deg, ${urgencyColor}08, ${urgencyColor}03)`,
                                border: `1px solid ${urgencyColor}20`,
                                marginBottom: '1.25rem',
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 800, color: urgencyColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                            ⚡ ระดับความเร่งด่วนรวม
                                        </span>
                                        <span style={{
                                            fontSize: '10px', fontWeight: 700, color: urgencyColor,
                                            background: `${urgencyColor}15`, padding: '2px 8px', borderRadius: '999px',
                                            border: `1px solid ${urgencyColor}25`,
                                        }}>
                                            {urgencyLabel}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                                            พบ <strong style={{ color: '#f43f5e' }}>{criticalCount} ปัญหาวิกฤต</strong>
                                            {warningCount > 0 && <> + <strong style={{ color: '#f59e0b' }}>{warningCount} ปัญหาเตือน</strong></>}
                                            {problems[0]?.severity === 'good' && <strong style={{ color: '#10b981' }}>ไม่พบปัญหา</strong>}
                                        </span>
                                        <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
                                            SQI: {sqi}/100 · SLA: {slaPct}% · Capacity: {capacityUtil}%
                                        </span>
                                    </div>
                                    {/* Urgency bar */}
                                    <div style={{ marginTop: '8px', height: '6px', background: 'rgba(0,0,0,.06)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', width: `${urgencyScore * 10}%`,
                                            background: `linear-gradient(90deg, #10b981, #f59e0b, #f43f5e)`,
                                            borderRadius: '99px', transition: 'width 1s ease',
                                        }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                        <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 600 }}>ปกติ</span>
                                        <span style={{ fontSize: '9px', color: '#f59e0b', fontWeight: 600 }}>เตือน</span>
                                        <span style={{ fontSize: '9px', color: '#f43f5e', fontWeight: 600 }}>วิกฤต</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="urgency-score-pulse" style={{
                                        fontSize: '36px', fontWeight: 900, color: urgencyColor,
                                        lineHeight: 1, letterSpacing: '-0.03em',
                                    }}>
                                        {Math.round(urgencyScore)}<span style={{ fontSize: '16px', fontWeight: 700 }}>/10</span>
                                    </div>
                                    <div style={{ fontSize: '10px', fontWeight: 700, color: urgencyColor, marginTop: '2px' }}>Urgency</div>
                                </div>
                            </div>

                            {/* ─── Problem Cards ─── */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {problems.map((p, i) => (
                                    <div key={i} style={{
                                        borderRadius: '14px',
                                        border: `1.5px solid ${p.color}20`,
                                        background: `${p.color}04`,
                                        overflow: 'hidden',
                                        transition: 'box-shadow 0.2s',
                                    }}>
                                        {/* Problem Title Bar */}
                                        <div style={{
                                            padding: '10px 16px',
                                            background: `linear-gradient(90deg, ${p.color}12, transparent)`,
                                            borderBottom: `1px solid ${p.color}15`,
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                        }}>
                                            {p.priority > 0 && (
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                    width: '24px', height: '24px', borderRadius: '50%',
                                                    background: p.color, color: '#fff',
                                                    fontSize: '11px', fontWeight: 900, flexShrink: 0,
                                                }}>
                                                    {p.priority}
                                                </span>
                                            )}
                                            <span style={{
                                                fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)',
                                                lineHeight: 1.4,
                                            }}>
                                                {p.title}
                                            </span>
                                            <span style={{
                                                marginLeft: 'auto', flexShrink: 0,
                                                fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                padding: '3px 8px', borderRadius: '999px',
                                                background: `${p.color}15`, color: p.color,
                                                border: `1px solid ${p.color}25`,
                                            }}>
                                                {p.severity === 'critical' ? '🔴 CRITICAL' : p.severity === 'warning' ? '🟡 WARNING' : '🟢 GOOD'}
                                            </span>
                                        </div>

                                        {/* Content Grid */}
                                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                                            {/* Root Cause */}
                                            <div style={{
                                                padding: '10px 14px', borderRadius: '10px',
                                                background: 'rgba(244,63,94,.03)',
                                                borderLeft: '3px solid #f43f5e',
                                            }}>
                                                <p style={{
                                                    margin: '0 0 4px', fontSize: '10px', fontWeight: 800,
                                                    color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em',
                                                }}>
                                                    🔍 ปัญหาที่แท้จริง (Root Cause)
                                                </p>
                                                <p style={{
                                                    margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)',
                                                    lineHeight: 1.65, fontWeight: 500,
                                                }}>
                                                    {p.rootCause}
                                                </p>
                                            </div>

                                            {/* Cascade Effect */}
                                            <div style={{
                                                padding: '10px 14px', borderRadius: '10px',
                                                background: 'rgba(245,158,11,.03)',
                                                borderLeft: '3px solid #f59e0b',
                                            }}>
                                                <p style={{
                                                    margin: '0 0 4px', fontSize: '10px', fontWeight: 800,
                                                    color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em',
                                                }}>
                                                    ⚡ ผลกระทบลูกโซ่ (Cascade Effect)
                                                </p>
                                                <p style={{
                                                    margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)',
                                                    lineHeight: 1.65, fontWeight: 500,
                                                }}>
                                                    {p.cascadeEffect}
                                                </p>
                                            </div>

                                            {/* Fix First */}
                                            <div style={{
                                                padding: '10px 14px', borderRadius: '10px',
                                                background: 'rgba(124,58,237,.04)',
                                                borderLeft: '3px solid #7c3aed',
                                            }}>
                                                <p style={{
                                                    margin: '0 0 4px', fontSize: '10px', fontWeight: 800,
                                                    color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em',
                                                }}>
                                                    🔧 แก้ไขก่อน — ด่วนที่ {p.priority > 0 ? p.priority : '—'} (Fix First)
                                                </p>
                                                <p style={{
                                                    margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)',
                                                    lineHeight: 1.65, fontWeight: 500,
                                                }}>
                                                    {p.fixFirst}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ─── Cross-Impact Map (visual summary) ─── */}
                            {problems.length > 1 && problems[0]?.severity !== 'good' && (
                                <div style={{
                                    marginTop: '16px', padding: '14px 16px', borderRadius: '12px',
                                    background: 'rgba(14,165,233,.04)',
                                    border: '1px solid rgba(14,165,233,.15)',
                                }}>
                                    <p style={{
                                        margin: '0 0 10px', fontSize: '11px', fontWeight: 800,
                                        color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em',
                                    }}>
                                        🗺️ แผนที่ความเชื่อมโยง — ปัญหาทั้งหมดเกิดจากต้นตอเดียวกัน
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        {/* Visual flow: Root → Cascade → Impact */}
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: '#f43f5e',
                                            background: 'rgba(244,63,94,.08)', padding: '4px 10px', borderRadius: '8px',
                                            border: '1px solid rgba(244,63,94,.15)',
                                        }}>
                                            Bottleneck: {bottleneckStep.label} ({bottleneckStep.v}น.)
                                        </span>
                                        <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: '#f59e0b',
                                            background: 'rgba(245,158,11,.08)', padding: '4px 10px', borderRadius: '8px',
                                            border: '1px solid rgba(245,158,11,.15)',
                                        }}>
                                            Wait ↑ ({avgWait}น.) + σ ↑ ({stddev})
                                        </span>
                                        <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: '#8b5cf6',
                                            background: 'rgba(139,92,246,.08)', padding: '4px 10px', borderRadius: '8px',
                                            border: '1px solid rgba(139,92,246,.15)',
                                        }}>
                                            Capacity {capacityUtil}% + PTE {pteRatio}x
                                        </span>
                                        <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: '#ef4444',
                                            background: 'rgba(239,68,68,.08)', padding: '4px 10px', borderRadius: '8px',
                                            border: '1px solid rgba(239,68,68,.15)',
                                        }}>
                                            Dropout {dropoutPct}% + SLA {slaPct}%
                                        </span>
                                        <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: '#0ea5e9',
                                            background: 'rgba(14,165,233,.08)', padding: '4px 10px', borderRadius: '8px',
                                            border: '1px solid rgba(14,165,233,.15)',
                                        }}>
                                            SQI = {sqi}/100
                                        </span>
                                    </div>
                                    <p style={{
                                        margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)',
                                        lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic',
                                    }}>
                                        💡 <strong>สรุป:</strong> ปัญหาทั้งหมดมีต้นตอจาก <strong style={{ color: '#f43f5e' }}>"{bottleneckStep.label}"</strong> ที่ใช้เวลา {bottleneckStep.v} นาที
                                        — เมื่อแก้จุดนี้ได้ → เวลารอรวมจะลดลง → SLA จะดีขึ้น → Dropout จะลดลง → SQI จะสูงขึ้น
                                        — <strong>แก้ ด่วนที่ 1 ก่อน</strong> จะเห็นผลลัพธ์ที่ดีขึ้นในทุกตัวชี้วัดพร้อมกัน
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}

            {/* ===== กราฟเวลารอรายเดือนปีงบประมาณ ===== */}

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                            📅 เวลารอเฉลี่ยรายเดือน — ปีงบประมาณ {fiscalData?.fiscal_year_be || ''}
                        </h3>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', marginTop: '3px' }}>
                            ตุลาคม–กันยายน · แยกตามขั้นตอน · เส้นประ = ค่าเฉลี่ยรวม
                        </p>
                    </div>
                    {/* Live badge */}
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        fontSize: 'var(--fs-xs)', fontWeight: 700,
                        color: '#10b981', background: 'rgba(16,185,129,.08)',
                        border: '1px solid rgba(16,185,129,.2)',
                        borderRadius: '999px', padding: '4px 12px',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                        HOSxP XE Live
                    </span>
                </div>

                {/* Mini KPI strip */}
                {fiscalData && (() => {
                    const months = fiscalData.months || [];
                    const withData = months.filter(m => m.has_data);
                    const peakMonth = withData.reduce((p, c) => c.avg_total > (p?.avg_total || 0) ? c : p, null);
                    const totalVisits = months.reduce((s, m) => s + m.total_visits, 0);
                    const kpis = [
                        { label: 'ปีงบประมาณ', value: `พ.ศ. ${fiscalData.fiscal_year_be}`, color: '#7c3aed', icon: '📆' },
                        { label: 'เวลารอเฉลี่ยทั้งปี', value: fiscalData.benchmark_avg ? `${fiscalData.benchmark_avg} นาที` : '—', color: fiscalData.benchmark_avg > 90 ? '#f43f5e' : '#10b981', icon: '⏱️' },
                        { label: 'เดือนที่รอนานสุด', value: peakMonth ? `${peakMonth.month} (${peakMonth.avg_total}น.)` : '—', color: '#f59e0b', icon: '📌' },
                        { label: 'ผู้ป่วยสะสม (ปีนี้)', value: totalVisits.toLocaleString() + ' ราย', color: '#0ea5e9', icon: '👥' },
                    ];
                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            {kpis.map((k, i) => (
                                <div key={i} style={{
                                    background: `${k.color}08`,
                                    border: `1px solid ${k.color}20`,
                                    borderRadius: '12px',
                                    padding: '0.625rem 0.875rem',
                                }}>
                                    <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        {k.icon} {k.label}
                                    </p>
                                    <p style={{ fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color, margin: '2px 0 0', letterSpacing: '-0.01em' }}>
                                        {k.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                })()}

                {/* Chart */}
                {loading.opdMonthlyFiscal ? (
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="skeleton" style={{ width: '100%', height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={fiscalData?.months || []} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="gradReg" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
                                </linearGradient>
                                <linearGradient id="gradScreen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                                </linearGradient>
                                <linearGradient id="gradDoc" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                                </linearGradient>
                                <linearGradient id="gradRx" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.4)" vertical={false} />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 700 }}
                                axisLine={false} tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }}
                                axisLine={false} tickLine={false}
                                tickFormatter={v => `${v}น`}
                                width={36}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: '#ffffff',
                                    border: '1px solid #e8eaf2',
                                    borderRadius: '14px',
                                    boxShadow: '0 8px 32px rgba(0,0,0,.10)',
                                    padding: '12px 16px',
                                    fontSize: '12px',
                                }}
                                labelStyle={{ fontWeight: 800, color: '#1a1f36', marginBottom: '6px', display: 'block', fontSize: '13px' }}
                                formatter={(value, name) => {
                                    if (value === 0) return ['—', name];
                                    const labelMap = {
                                        avg_reg: '📋 ลงทะเบียน → คัดกรอง',
                                        avg_screen: '🔬 คัดกรอง → พบแพทย์',
                                        avg_doc: '🩺 ตรวจรักษา → รับยา',
                                        avg_rx: '💊 รับยา → ชำระเงิน',
                                        avg_total: '⏱️ รวมทุกขั้นตอน',
                                    };
                                    return [`${value} นาที`, labelMap[name] || name];
                                }}
                                labelFormatter={(label, payload) => {
                                    const d = payload?.[0]?.payload;
                                    return d ? `${label}  ·  ${(d.total_visits || 0).toLocaleString()} ราย` : label;
                                }}
                            />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                                formatter={(value) => ({
                                    avg_reg: 'ลงทะเบียน',
                                    avg_screen: 'คัดกรอง',
                                    avg_doc: 'ตรวจรักษา',
                                    avg_rx: 'รับยา',
                                }[value] || value)}
                            />

                            {/* Benchmark reference line */}
                            {fiscalData?.benchmark_avg > 0 && (
                                <ReferenceLine
                                    y={fiscalData.benchmark_avg}
                                    stroke="#f43f5e"
                                    strokeDasharray="6 3"
                                    strokeWidth={1.5}
                                    label={{
                                        value: `เฉลี่ย ${fiscalData.benchmark_avg}น`,
                                        position: 'insideTopRight',
                                        fill: '#f43f5e',
                                        fontSize: 10,
                                        fontWeight: 700,
                                    }}
                                />
                            )}

                            {/* Stacked Area per step */}
                            <Area type="monotone" dataKey="avg_reg" stackId="s" stroke="#7c3aed" fill="url(#gradReg)" strokeWidth={1.5} dot={false} name="avg_reg" />
                            <Area type="monotone" dataKey="avg_screen" stackId="s" stroke="#0ea5e9" fill="url(#gradScreen)" strokeWidth={1.5} dot={false} name="avg_screen" />
                            <Area type="monotone" dataKey="avg_doc" stackId="s" stroke="#8b5cf6" fill="url(#gradDoc)" strokeWidth={1.5} dot={false} name="avg_doc" />
                            <Area type="monotone" dataKey="avg_rx" stackId="s" stroke="#10b981" fill="url(#gradRx)" strokeWidth={1.5} dot={false} name="avg_rx" />

                            {/* Total line overlay */}
                            <Line
                                type="monotone" dataKey="avg_total"
                                stroke="#1a1f36"
                                strokeWidth={2.5}
                                dot={(props) => {
                                    const { cx, cy, payload } = props;
                                    if (!payload.has_data) return null;
                                    const color = payload.avg_total > 90 ? '#f43f5e' : payload.avg_total > 60 ? '#f59e0b' : '#10b981';
                                    return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={4} fill={color} stroke="#fff" strokeWidth={2} />;
                                }}
                                name="avg_total"
                                legendType="none"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}

                {/* Bottom legend */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {[
                        { color: '#7c3aed', label: 'ลงทะเบียน' },
                        { color: '#0ea5e9', label: 'คัดกรอง' },
                        { color: '#8b5cf6', label: 'ตรวจรักษา' },
                        { color: '#10b981', label: 'รับยา' },
                    ].map((l, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 600 }}>{l.label}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}>
                        <div style={{ width: '18px', height: '2px', background: '#f43f5e', borderRadius: '2px', border: 'none', backgroundImage: 'repeating-linear-gradient(90deg, #f43f5e 0, #f43f5e 4px, transparent 4px, transparent 8px)' }} />
                        <span style={{ fontSize: 'var(--fs-xs)', color: '#f43f5e', fontWeight: 700 }}>เส้น = ค่าเฉลี่ย benchmark</span>
                    </div>
                </div>
            </div>


            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                            ⏱️ ขั้นตอนการรับบริการผู้ป่วยนอก
                        </h3>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                            เวลาเฉลี่ยในแต่ละขั้นตอน วันนี้
                        </p>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.15)',
                        borderRadius: '999px', padding: '6px 14px',
                    }}>
                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 600 }}>รวมทั้งหมด</span>
                        <span style={{ fontSize: 'var(--fs-xl)', fontWeight: 900, color: '#7c3aed', letterSpacing: '-0.02em' }}>
                            {opd?.avg_total_minutes || 0}
                        </span>
                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>นาที</span>
                    </div>
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto' }}>
                    {[
                        {
                            icon: '📋',
                            label: 'ลงทะเบียน',
                            sublabel: 'เช็คอิน → คัดกรอง',
                            value: opd?.wait_steps?.registration_to_screening,
                            color: '#7c3aed',
                            bg: 'rgba(124,58,237,.07)',
                            border: 'rgba(124,58,237,.2)',
                            warn: 15, critical: 30,
                        },
                        {
                            icon: '🔬',
                            label: 'คัดกรอง',
                            sublabel: 'คัดกรอง → พบแพทย์',
                            value: opd?.wait_steps?.screening_to_doctor,
                            color: '#0ea5e9',
                            bg: 'rgba(14,165,233,.07)',
                            border: 'rgba(14,165,233,.2)',
                            warn: 30, critical: 60,
                        },
                        {
                            icon: '🩺',
                            label: 'ตรวจรักษา',
                            sublabel: 'พบแพทย์ → รับยา',
                            value: opd?.wait_steps?.screening_to_doctor,
                            color: '#8b5cf6',
                            bg: 'rgba(139,92,246,.07)',
                            border: 'rgba(139,92,246,.2)',
                            warn: 20, critical: 45,
                        },
                        {
                            icon: '💊',
                            label: 'รับยา',
                            sublabel: 'รับยา → ชำระเงิน',
                            value: opd?.wait_steps?.doctor_to_pharmacy,
                            color: '#10b981',
                            bg: 'rgba(16,185,129,.07)',
                            border: 'rgba(16,185,129,.2)',
                            warn: 20, critical: 40,
                        },
                        {
                            icon: '💳',
                            label: 'ชำระเงิน',
                            sublabel: 'ชำระเงิน → กลับบ้าน',
                            value: opd?.wait_steps?.pharmacy_to_finance,
                            color: '#f59e0b',
                            bg: 'rgba(245,158,11,.07)',
                            border: 'rgba(245,158,11,.2)',
                            warn: 10, critical: 20,
                        },
                    ].map((step, i, arr) => {
                        const val = step.value || 0;
                        const isCritical = val >= step.critical;
                        const isWarn = val >= step.warn && !isCritical;
                        const statusColor = isCritical ? '#f43f5e' : isWarn ? '#f59e0b' : '#10b981';
                        const statusLabel = isCritical ? 'ช้ามาก' : isWarn ? 'ช้า' : 'ปกติ';
                        const statusBg = isCritical ? 'rgba(244,63,94,.1)' : isWarn ? 'rgba(245,158,11,.1)' : 'rgba(16,185,129,.1)';
                        const maxVal = step.critical * 1.5 || 60;
                        const barW = Math.min(100, (val / maxVal) * 100);

                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: '1 1 0', minWidth: '140px' }}>
                                {/* Step card */}
                                <div style={{
                                    flex: 1,
                                    background: step.bg,
                                    border: `1.5px solid ${step.border}`,
                                    borderRadius: '16px',
                                    padding: '1rem 0.875rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    transition: 'box-shadow 0.2s',
                                    cursor: 'default',
                                }}>
                                    {/* Icon + label */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{step.icon}</span>
                                        <div>
                                            <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', margin: 0, lineHeight: 1.2 }}>
                                                {step.label}
                                            </p>
                                            <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', margin: 0, lineHeight: 1.3, marginTop: '2px' }}>
                                                {step.sublabel}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Minute display */}
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        <span style={{
                                            fontSize: 'var(--fs-3xl)',
                                            fontWeight: 900,
                                            color: step.color,
                                            letterSpacing: '-0.03em',
                                            lineHeight: 1,
                                        }}>
                                            {val}
                                        </span>
                                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>นาที</span>
                                    </div>

                                    {/* Progress bar */}
                                    <div style={{ height: '5px', background: 'rgba(0,0,0,.06)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${barW}%`,
                                            background: statusColor,
                                            borderRadius: '99px',
                                            transition: 'width 0.8s ease',
                                        }} />
                                    </div>

                                    {/* Status badge */}
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                                        background: statusBg, borderRadius: '999px',
                                        padding: '2px 8px', alignSelf: 'flex-start',
                                    }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: statusColor }}>
                                            {statusLabel}
                                        </span>
                                    </div>
                                </div>

                                {/* Connector arrow (not last) */}
                                {i < arr.length - 1 && (
                                    <div style={{
                                        flexShrink: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '0 6px',
                                        color: '#cbd5e1',
                                    }}>
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                            <path d="M0 8 H16 M11 3 L16 8 L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Hourly Distribution — Today + Yesterday + AI Prediction */}
                <div className="chart-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0 }}>
                            📊 จำนวนผู้ป่วยรายชั่วโมง
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: 600 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#7c3aed' }}></span>
                                วันนี้
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '10px', height: '2px', borderBottom: '2px dashed #94a3b8' }}></span>
                                เมื่อวาน
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '10px', height: '2px', borderBottom: '2px dotted #10b981' }}></span>
                                🤖 AI พรุ่งนี้
                            </span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <ComposedChart data={hourlyChart}>
                            <defs>
                                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(203,213,225,.4)" />
                            <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(124,58,237,.05)' }}
                                contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.08)', fontSize: '12px' }}
                                formatter={(v, name) => {
                                    const labels = { count: '📍 วันนี้', yesterday: '📅 เมื่อวาน', prediction: '🤖 AI พรุ่งนี้' };
                                    return [`${v} ราย`, labels[name] || name];
                                }}
                            />
                            {/* AI Prediction — gradient area */}
                            <Area type="monotone" dataKey="prediction" fill="url(#predGrad)" stroke="#10b981"
                                strokeWidth={2} strokeDasharray="4 4" dot={false} name="prediction" />
                            {/* Yesterday — dashed line */}
                            <Line type="monotone" dataKey="yesterday" stroke="#94a3b8" strokeWidth={1.5}
                                strokeDasharray="6 3" dot={false} name="yesterday" />
                            {/* Today — bars */}
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={20} name="count">
                                {hourlyChart.map((h, i) => (
                                    <Cell key={i} fill={h.count > 15 ? '#f43f5e' : '#7c3aed'} fillOpacity={0.85} />
                                ))}
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Distribution */}
                <div className="chart-container">
                    <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', marginBottom: '1rem' }}>
                        🔴 สถานะผู้ป่วยขณะนี้
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                        <ResponsiveContainer width="60%" height={220}>
                            <PieChart>
                                <Pie data={statusCounts} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                                    {statusCounts.map((s, i) => <Cell key={i} fill={s.fill} />)}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '12px' }}
                                    formatter={(v, n) => [`${v} ราย`, n]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                            {statusCounts.map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.fill, flexShrink: 0 }} />
                                        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-primary)', fontWeight: 600 }}>{s.name}</span>
                                    </div>
                                    <span style={{
                                        fontSize: 'var(--fs-md)', fontWeight: 800,
                                        color: 'var(--md-text-primary)',
                                        background: `${s.fill}12`,
                                        padding: '2px 10px', borderRadius: '999px',
                                        minWidth: '36px', textAlign: 'center',
                                    }}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ━━━━━━ รายได้โดยประมาณ ปีงบประมาณ ย้อนหลัง 3 ปี ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้โดยประมาณ — ปีงบประมาณ (3 ปีย้อนหลัง)
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>vn_stat · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.opdRevenueFiscal ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />
                        <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (() => {
                    const fiscalData3 = state.opdRevenueFiscal;
                    const years = fiscalData3?.fiscal_years || [];
                    if (years.length === 0) return <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '2rem 0' }}>ไม่พบข้อมูลรายได้</p>;

                    const FY_COLORS = ['#94a3b8', '#8b5cf6', '#10b981'];

                    // Build chart data: 12 months (Oct-Sep) with 3 fiscal years
                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => {
                            row[`fy${fi}`] = (fy.months[i]?.revenue || 0);
                        });
                        return row;
                    });

                    // YoY calculation
                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const yoyGrowth = prevYear && prevYear.total_revenue > 0
                        ? Math.round(((latestYear.total_revenue - prevYear.total_revenue) / prevYear.total_revenue) * 1000) / 10
                        : 0;

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Summary Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: '10px' }}>
                                {years.map((fy, fi) => {
                                    const isLatest = fi === years.length - 1;
                                    const isPrev = fi === years.length - 2;
                                    const color = FY_COLORS[fi];
                                    return (
                                        <div key={fi} style={{
                                            padding: '0.75rem 1rem', borderRadius: '12px',
                                            background: isLatest ? `linear-gradient(135deg, ${color}12, ${color}05)` : `${color}06`,
                                            border: `1px solid ${color}${isLatest ? '30' : '15'}`,
                                            position: 'relative',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                                <span style={{ fontSize: '10px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    {fy.fiscal_label}
                                                </span>
                                                {isLatest && (
                                                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '22px', fontWeight: 900, color, margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                                                ฿{(fy.total_revenue / 1e6).toFixed(1)}M
                                            </p>
                                            <p style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 600 }}>
                                                {fy.total_visits.toLocaleString()} visits · {fy.total_patients.toLocaleString()} patients · ฿{fy.avg_revenue_per_visit.toLocaleString()}/visit
                                            </p>
                                            {isLatest && prevYear && (
                                                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                                                        {yoyGrowth >= 0 ? '📈' : '📉'} YoY {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth}%
                                                    </span>
                                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
                                                        vs {prevYear.fiscal_label}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Chart */}
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={40}
                                        tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1e3).toFixed(0)}K`} />
                                    <Tooltip
                                        contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}
                                        formatter={(v, name) => {
                                            const idx = Number(name.replace('fy', ''));
                                            const label = years[idx]?.fiscal_label || name;
                                            return [`฿${(v / 1e6).toFixed(2)}M`, label];
                                        }}
                                    />
                                    {years.map((fy, fi) => (
                                        <Bar key={fi} dataKey={`fy${fi}`} fill={FY_COLORS[fi]} radius={[3, 3, 0, 0]}
                                            barSize={years.length <= 2 ? 20 : 14}
                                            opacity={fi === years.length - 1 ? 1 : 0.5}
                                            name={`fy${fi}`}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Legend */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                {years.map((fy, fi) => (
                                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: FY_COLORS[fi], opacity: fi === years.length - 1 ? 1 : 0.5 }} />
                                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 600 }}>{fy.fiscal_label}</span>
                                        <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Patient List */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                {/* Header */}
                <div style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--md-surface-2)',
                    borderBottom: '1px solid var(--md-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0 }}>
                        👥 รายชื่อผู้ป่วยที่กำลังรับบริการ
                    </h3>
                    <span style={{
                        fontSize: 'var(--fs-xs)', fontWeight: 700, color: '#7c3aed',
                        background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.15)',
                        padding: '4px 12px', borderRadius: '999px',
                    }}>
                        {patients.length} ราย
                    </span>
                </div>
                {/* Column headers */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.625rem 1.25rem',
                    background: 'var(--md-surface-2)',
                    borderBottom: '1px solid var(--md-border)',
                }}>
                    <div style={{ width: '42px', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>เวลา</div>
                    <div style={{ flex: 1, fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ชื่อ-สกุล / แผนก</div>
                    <div style={{ width: '80px', textAlign: 'center', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>สถานะ</div>
                    <div style={{ width: '64px', textAlign: 'right', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>รอ (นาที)</div>
                </div>
                {patients.length > 0 ? (
                    <List height={400} itemCount={patients.length} itemSize={54} width="100%" className="custom-scrollbar">
                        {PatientRow}
                    </List>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
                        {loading.opdToday ? '⏳ กำลังโหลดข้อมูล...' : 'ไม่พบผู้ป่วยที่กำลังรับบริการ'}
                    </div>
                )}
            </div>
        </div>
    );
}
