// ============================================================
// BCH 360° Intelligence V.10 - ER Operations Tab
// 🚑 AI Surge + Professional ER Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition
// ============================================================
import React, { useEffect, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import {
    ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, ReferenceLine, Cell, PieChart, Pie, Legend
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICard from './KPICard.jsx';

const TRIAGE_COLORS = {
    1: { name: 'Level 1', color: '#f43f5e', label: 'Resus' },
    2: { name: 'Level 2', color: '#f59e0b', label: 'Emerg' },
    3: { name: 'Level 3', color: '#eab308', label: 'Urgent' },
    4: { name: 'Level 4', color: '#10b981', label: 'Semi' },
    5: { name: 'Level 5', color: '#94a3b8', label: 'Non' }
};

export default function ERTab() {
    const { state, fetchData } = useDashboard();
    const erSurge = state.erSurge;
    const erTodayPatients = state.erTodayPatients || [];
    const erTriageStats = state.erTriageStats || [];
    const erAnalytics = state.erAnalytics;
    const loading = state.loading;

    useEffect(() => {
        fetchData('erSurge', '/api/ai/er-surge');
        fetchData('erTodayPatients', '/api/er/today-patients');
        fetchData('erTriageStats', '/api/er/triage-stats');
        fetchData('erBottlenecks', '/api/er/flow-bottlenecks');
        fetchData('erAnalytics', '/api/er/analytics');
        fetchData('erRevenueFiscal', '/api/er/revenue-fiscal');
    }, [fetchData]);

    const hourlyChart = useMemo(() => {
        if (!erSurge?.hourly_forecast) return [];
        return erSurge.hourly_forecast.map(h => ({
            name: h.label,
            predicted: h.predicted,
            actual: h.actual,
            isFuture: h.is_future
        }));
    }, [erSurge]);

    const triagePieData = useMemo(() => {
        return erTriageStats.map(s => ({
            name: TRIAGE_COLORS[s.id]?.label || `L${s.id}`,
            value: s.cnt,
            fill: TRIAGE_COLORS[s.id]?.color || '#94a3b8'
        }));
    }, [erTriageStats]);

    const PatientRow = useCallback(({ index, style }) => {
        const p = erTodayPatients[index];
        if (!p) return null;
        const triage = TRIAGE_COLORS[p.triage_id] || TRIAGE_COLORS[5];

        return (
            <div style={{
                ...style,
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0 1.25rem',
                borderBottom: '1px solid var(--md-divider)',
                background: 'transparent', transition: 'background 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
                <div style={{ width: '40px', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                    {p.enter_er_time?.substring(11, 16) || '—'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--md-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                    <p style={{ margin: 0, fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>{p.hn} · {p.age}y {p.sex === '1' ? 'M' : 'F'}</p>
                </div>
                <div style={{ width: '64px', textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '2px 8px', borderRadius: '6px',
                        fontSize: '10px', fontWeight: 700,
                        background: `${triage.color}15`, color: triage.color,
                    }}>
                        {triage.label}
                    </span>
                </div>
                <div style={{ width: '60px', textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-primary)' }}>{p.admit_probability}%</div>
                    <div style={{ width: '40px', height: '3px', background: 'rgba(203,213,225,.15)', borderRadius: '99px', margin: '2px auto 0', overflow: 'hidden' }}>
                        <div style={{ width: `${p.admit_probability}%`, height: '100%', background: '#7c3aed', borderRadius: '99px' }} />
                    </div>
                </div>
                <div style={{ width: '60px', textAlign: 'center' }}>
                    {p.news2?.score >= 5 ? (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,.1)', padding: '2px 6px', borderRadius: '4px' }}>Critical</span>
                    ) : (
                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Score: {p.news2?.score || 0}</span>
                    )}
                </div>
                <div style={{ width: '48px', textAlign: 'right' }}>
                    <span style={{
                        fontSize: 'var(--fs-sm)', fontWeight: 800,
                        color: p.stay_minutes > 120 ? '#f43f5e' : p.stay_minutes > 60 ? '#f59e0b' : '#10b981',
                    }}>
                        {p.stay_minutes || 0}m
                    </span>
                </div>
            </div>
        );
    }, [erTodayPatients]);

    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* AI Surge Alert */}
            {erSurge?.surge_alert && (
                <div className="glass-card shadow-xl p-4 border-l-4 border-[#f43f5e] rounded-2xl" style={{ background: 'linear-gradient(90deg, rgba(244,63,94,.08) 0%, transparent 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(244,63,94,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🚨</div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                                Surge Advisory Protocol
                            </h3>
                            <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', margin: '4px 0 0', fontWeight: 600 }}>{erSurge.recommendation}</p>
                        </div>
                        <div style={{ textAlign: 'right', padding: '0 12px' }}>
                            <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>Predicted</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f43f5e' }}>+{erSurge?.next_4h_predicted || 0}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '12px' }}>

                {/* ── Live ER (Hero Card) ── */}
                <div style={{
                    gridColumn: 'span 2', padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(244,63,94,.12) 0%, rgba(239,68,68,.06) 100%)',
                    border: '1px solid rgba(244,63,94,.2)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.erTodayPatients ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '120px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (() => {
                        const liveCount = erTodayPatients.length;
                        const l1 = erTriageStats.find(s => s.id === 1)?.cnt || 0;
                        const l2 = erTriageStats.find(s => s.id === 2)?.cnt || 0;
                        const l3 = erTriageStats.find(s => s.id === 3)?.cnt || 0;
                        const l45 = liveCount - l1 - l2 - l3;
                        const avgStayCalc = liveCount > 0 ? Math.round(erTodayPatients.reduce((s, p) => s + p.stay_minutes, 0) / liveCount) : 0;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f43f5e', margin: 0 }}>
                                        🚑 Live ER — ผู้ป่วยในห้องฉุกเฉิน
                                    </p>
                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        Real-time
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#f43f5e', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(244,63,94,.3)' }}>
                                        {liveCount}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>ราย</span>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', marginLeft: '4px' }}>Avg Stay: <strong style={{ color: avgStayCalc > 120 ? '#f43f5e' : '#0ea5e9' }}>{avgStayCalc}m</strong></span>
                                </div>

                                {/* Triage breakdown bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#f43f5e' }}>🔴 L1: {l1}  🟠 L2: {l2}</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>🟡 L3: {l3}  🟢 L4-5: {Math.max(0, l45)}</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(148,163,184,.12)', display: 'flex', gap: '2px' }}>
                                        {l1 > 0 && <div style={{ flex: l1, background: '#f43f5e', borderRadius: '99px', transition: 'flex 0.8s ease' }} />}
                                        {l2 > 0 && <div style={{ flex: l2, background: '#f59e0b', borderRadius: '99px', transition: 'flex 0.8s ease' }} />}
                                        {l3 > 0 && <div style={{ flex: l3, background: '#eab308', borderRadius: '99px', transition: 'flex 0.8s ease' }} />}
                                        {l45 > 0 && <div style={{ flex: Math.max(0, l45), background: '#10b981', borderRadius: '99px', transition: 'flex 0.8s ease' }} />}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ── Mini KPI Cards ── */}
                {[
                    {
                        title: 'AI Predicted', value: erSurge?.today_predicted ?? '—', icon: '🧠', unit: 'ราย',
                        grad: ['#6366f1', '#4f46e5'], glow: 'rgba(99,102,241,.2)',
                        loading: loading.erSurge,
                    },
                    {
                        title: 'Next 4h', value: erSurge?.next_4h_predicted ?? '—', icon: '📈', unit: 'ราย',
                        grad: ['#8b5cf6', '#7c3aed'], glow: 'rgba(139,92,246,.2)',
                        loading: loading.erSurge,
                    },
                    {
                        title: 'Level 1 (Resus)', value: erTriageStats.find(s => s.id === 1)?.cnt || 0, icon: '🔴', unit: 'ราย',
                        grad: (erTriageStats.find(s => s.id === 1)?.cnt || 0) > 0 ? ['#f43f5e', '#dc2626'] : ['#10b981', '#059669'],
                        glow: 'rgba(244,63,94,.2)',
                        loading: loading.erTriageStats,
                    },
                    {
                        title: 'Level 2 (Emerg)', value: erTriageStats.find(s => s.id === 2)?.cnt || 0, icon: '🟠', unit: 'ราย',
                        grad: (erTriageStats.find(s => s.id === 2)?.cnt || 0) > 3 ? ['#f59e0b', '#d97706'] : ['#0ea5e9', '#0284c7'],
                        glow: 'rgba(245,158,11,.2)',
                        loading: loading.erTriageStats,
                    },
                ].map((kpi, i) => (
                    <div key={`er-kpi-${i}`} style={{
                        padding: '1rem 1.25rem', borderRadius: '14px',
                        background: `linear-gradient(135deg, ${kpi.grad[0]}10 0%, ${kpi.grad[1]}05 100%)`,
                        border: `1px solid ${kpi.grad[0]}25`,
                        position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${kpi.glow}`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        {kpi.loading ? (
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
                                        {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                                    </span>
                                    {kpi.unit && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ━━━━━━ EPI + Advanced ER Analytics Panel ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🔬 Advanced Analytics — ER
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>30d · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.erAnalytics ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '56px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = erAnalytics || {};
                    const epi = a.epi ?? 0;
                    const epiColor = epi >= 80 ? '#10b981' : epi >= 60 ? '#f59e0b' : '#f43f5e';
                    const epiGrade = epi >= 90 ? 'A+' : epi >= 80 ? 'A' : epi >= 70 ? 'B+' : epi >= 60 ? 'B' : epi >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(epi / 100, 1) * circumference;

                    const epiComp = a.epi_components || {};
                    const epiRadar = [
                        { name: 'Time-to-Doc', score: epiComp.time_to_doctor || 0 },
                        { name: 'LWBS', score: epiComp.lwbs || 0 },
                        { name: 'Return Visit', score: epiComp.return_visit || 0 },
                        { name: 'Acuity', score: epiComp.acuity || 0 },
                        { name: 'Cost', score: epiComp.cost || 0 },
                    ];

                    const ta = a.today_acuity || {};

                    // ━━━ Tier 1: ER Time Performance ━━━
                    const tier1Cards = [
                        {
                            icon: '🩺', label: 'Time-to-Doctor',
                            value: `${a.avg_time_to_doctor ?? 0} min`,
                            sub: `σ ${a.sd_time_to_doctor ?? 0}min · ${a.within_10m_pct ?? 0}% ≤10min`,
                            desc: 'เวลาเฉลี่ยจาก Triage → แพทย์ตรวจ',
                            color: (a.avg_time_to_doctor ?? 30) <= 15 ? '#10b981' : (a.avg_time_to_doctor ?? 30) <= 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.avg_time_to_doctor ?? 30) <= 15
                                ? `Time-to-Doctor ${a.avg_time_to_doctor ?? 0} min — ดีเยี่ยม (HA Standard ≤15min) · ${a.within_10m_pct ?? 0}% พบแพทย์ภายใน 10 นาที สะท้อน Triage + Staffing ทำงานมีประสิทธิภาพ`
                                : (a.avg_time_to_doctor ?? 30) <= 30
                                    ? `Time-to-Doctor ${a.avg_time_to_doctor ?? 0} min — เกิน HA Standard 15 min (σ ${a.sd_time_to_doctor ?? 0}) มีเพียง ${a.within_10m_pct ?? 0}% ที่พบแพทย์ภายใน 10 นาที สาเหตุ: ER overcrowding, Staff ไม่เพียงพอ, หรือ Triage bottleneck`
                                    : `🚨 Time-to-Doctor ${a.avg_time_to_doctor ?? 0} min — วิกฤต! เกิน 30 min ผู้ป่วยรอนาน → ความเสี่ยง: Deterioration ระหว่างรอ, LWBS สูง, Patient complaint, Malpractice risk สำหรับ acute cases`,
                            recommend: (a.avg_time_to_doctor ?? 30) <= 15
                                ? '✅ ดีเยี่ยม — Monitor ช่วง Peak hours ว่ายังรักษามาตรฐานได้'
                                : (a.avg_time_to_doctor ?? 30) <= 30
                                    ? '📋 ลด Wait time: (1) Fast-track lane สำหรับ Level 4-5 (2) เพิ่มแพทย์ช่วง Peak (3) Vertical patient flow: ตรวจ→สั่ง→Lab พร้อมกัน (4) ลดเวลา Triage ด้วย Electronic triage system (5) เป้าหมาย: ≤15 min ภายใน 30 วัน'
                                    : '🚨 เร่งด่วน: (1) เพิ่มแพทย์ ER ทุก shift ทันที (2) เปิด Fast-track zone แยก Non-urgent ออก (3) ทำ Pull system: แพทย์ไปรับผู้ป่วยเอง (4) ย้าย Boarding patients ออกจาก ER ทุก 2 ชม. (5) ER overcrowding protocol: ห้าม admit รอใน ER >4 ชม.',
                        },
                        {
                            icon: '🚶', label: 'LWBS Rate',
                            value: `${a.lwbs_rate ?? 0}%`,
                            sub: `${a.lwbs_count ?? 0} ราย ออกก่อนพบแพทย์`,
                            desc: 'Left Without Being Seen — ตัวชี้วัด HA/JCI',
                            color: (a.lwbs_rate ?? 0) < 2 ? '#10b981' : (a.lwbs_rate ?? 0) < 5 ? '#f59e0b' : '#f43f5e',
                            problem: (a.lwbs_rate ?? 0) < 2
                                ? `LWBS ${a.lwbs_rate ?? 0}% (${a.lwbs_count ?? 0} ราย) — ดี (<2% HA Standard) ผู้ป่วยได้รับบริการทันเวลา ไม่มีปัญหารอนาน`
                                : (a.lwbs_rate ?? 0) < 5
                                    ? `LWBS ${a.lwbs_rate ?? 0}% (${a.lwbs_count ?? 0} ราย) — สูงกว่ามาตรฐาน 2% ผู้ป่วย ${a.lwbs_count ?? 0} ราย ออกไปโดยไม่ได้พบแพทย์ ⚠️ ช่องโหว่: ถ้าเป็น Acute case ที่ปลอมเป็น Non-urgent อาจเกิดเหตุร้ายแรงนอก ร.พ.`
                                    : `🚨 LWBS ${a.lwbs_rate ?? 0}% — วิกฤต! ${a.lwbs_count ?? 0} รายออกไปโดยไม่พบแพทย์ สะท้อน ER overcrowding รุนแรง + Wait time ยาวเกินทน + ความเสี่ยง: Sentinel events + ถูก สรพ. ตรวจสอบ`,
                            recommend: (a.lwbs_rate ?? 0) < 2
                                ? '✅ คงมาตรฐาน — ทำ LWBS review ทุกราย ตรวจสอบว่าไม่มี High-risk ออกไป'
                                : (a.lwbs_rate ?? 0) < 5
                                    ? '📋 ลด LWBS: (1) Triage nurse ทำ Bedside registration ทันที (2) ให้ข้อมูล Wait time estimate ทุกราย (3) Re-assessment ทุก 30 นาที ระหว่างรอ (4) Call back ทุกราย LWBS ภายใน 24 ชม. เพื่อ Safety check'
                                    : '🚨 ทำทันที: (1) เปิด Surge Protocol — เรียก staff สำรอง (2) Fast-track + See-and-treat zone (3) Dr. round ห้องรอทุก 15 นาที ตรวจ urgent cases ก่อน (4) Mandatory callback LWBS ทุกราย (5) คณะกรรมการ ER ประชุมฉุกเฉิน (6) เป้าหมาย: LWBS <2% ใน 30 วัน',
                        },
                        {
                            icon: '🔄', label: 'Return Visit 72h',
                            value: `${a.return_visit_rate ?? 0}%`,
                            sub: `${a.return_visit_count ?? 0} ราย กลับมาภายใน 72 ชม.`,
                            desc: '% ผู้ป่วยที่กลับมา ER อีก — สะท้อนคุณภาพ',
                            color: (a.return_visit_rate ?? 0) < 3 ? '#10b981' : (a.return_visit_rate ?? 0) < 8 ? '#f59e0b' : '#f43f5e',
                            problem: (a.return_visit_rate ?? 0) < 3
                                ? `Return Visit ${a.return_visit_rate ?? 0}% — ต่ำ (<3%) สะท้อน ER treatment quality ดี ผู้ป่วยได้รับการรักษาที่เหมาะสมตั้งแต่ครั้งแรก`
                                : (a.return_visit_rate ?? 0) < 8
                                    ? `Return Visit ${a.return_visit_rate ?? 0}% (${a.return_visit_count ?? 0} ราย) — สูง! ผู้ป่วยกลับมา ER ใน 72 ชม. สาเหตุ: อาการยังไม่ดีขึ้น, Discharge instruction ไม่ชัดเจน, ยาไม่เพียงพอ, หรือ Missed diagnosis`
                                    : `🚨 Return Visit ${a.return_visit_rate ?? 0}% — วิกฤต! ผู้ป่วยกลับมามากผิดปกติ ต้อง Audit ว่ามี Missed diagnosis หรือไม่ ความเสี่ยง: Malpractice + คุณภาพการรักษาถูกตั้งคำถาม`,
                            recommend: (a.return_visit_rate ?? 0) < 3
                                ? '✅ ดี — ทำ Return visit review เชิงลึก ทุกราย Level 1-2 ที่กลับมา'
                                : '📋 ลด Return Visit: (1) Discharge checklist: ยา + คำแนะนำ + Red flags + นัด Follow-up (2) Phone callback 24 ชม. หลัง discharge สำหรับ High-acuity (3) Audit ทุก Return visit: Missed diagnosis? Undertreated? (4) ปรับ Protocol ตาม Root cause (5) เพิ่ม Observation unit สำหรับ borderline cases',
                        },
                        {
                            icon: '🏥', label: 'Admission Rate',
                            value: `${a.admit_rate ?? 0}%`,
                            sub: `${a.admit_count ?? 0} ราย admit จาก ER`,
                            desc: '% ที่ต้อง Admit IPD — วัด case severity',
                            color: '#8b5cf6',
                            problem: `Admission Rate ${a.admit_rate ?? 0}% (${a.admit_count ?? 0} ราย) — ${(a.admit_rate ?? 0) > 25 ? '⚠️ สูง! สะท้อน ER รับ high-acuity cases มาก Bed demand จาก ER สูง กดดัน IPD capacity' : (a.admit_rate ?? 0) < 10 ? 'ต่ำ — ER ส่วนใหญ่เป็น Ambulatory cases อาจพิจารณาย้ายไป Walk-in clinic' : 'ปานกลาง — Case mix สมดุล'}`,
                            recommend: (a.admit_rate ?? 0) > 25
                                ? '📋 Admission สูง: (1) เตรียม IPD beds สำรองสำหรับ ER admit 24/7 (2) Admission Coordinator ประจำ ER (3) Bed management huddle ทุก 4 ชม. (4) Direct admission สำหรับ Predictable cases (5) Short-stay Observation Unit ลด unnecessary admit'
                                : '📋 Monitor: (1) วิเคราะห์ Admission pattern ตาม Triage level (2) ปรับ Staffing ตาม Admission demand (3) ลด ER boarding time (<4 ชม.)',
                        },
                    ];

                    // ━━━ Tier 2: Volume & Capacity ━━━
                    const tier2Cards = [
                        {
                            icon: '📊', label: 'Avg Daily Visits',
                            value: `${a.avg_daily_visits ?? 0}`,
                            sub: `${(a.total_visits_30d ?? 0).toLocaleString()} ราย / 30 วัน`,
                            desc: 'จำนวนผู้ป่วย ER เฉลี่ยต่อวัน',
                            color: '#0ea5e9',
                            problem: `เฉลี่ย ${a.avg_daily_visits ?? 0} ราย/วัน (รวม ${(a.total_visits_30d ?? 0).toLocaleString()} ราย/30 วัน) — ${(a.avg_daily_visits ?? 0) > 80 ? '⚠️ Volume สูง! ER อาจ overcrowded ช่วง Peak ตรวจสอบ Capacity planning' : 'Volume ปกติ ไม่พบปัญหา overcrowding'}`,
                            recommend: (a.avg_daily_visits ?? 0) > 80
                                ? '📋 Volume สูง: (1) เปิด Fast-track zone แยก Non-urgent (2) Staffing model: เพิ่มคนช่วง Peak (3) ER diversion หรือ Minor clinic สำหรับ Level 5 (4) วิเคราะห์ % Non-emergency visits — Redirect ไป OPD/Walk-in'
                                : '📋 Monitor: (1) วิเคราะห์ Visit trend รายสัปดาห์ (2) เตรียม Surge plan เมื่อ volume เกิน capacity (3) ปรับ Staffing ตาม seasonal patterns',
                        },
                        {
                            icon: '⏰', label: 'Peak Hour',
                            value: a.peak_hour?.label || '—',
                            sub: `เฉลี่ย ${a.peak_hour?.avg ?? 0} ราย/วัน ณ ชั่วโมงนี้`,
                            desc: 'ชั่วโมงที่มีผู้ป่วย ER มากที่สุด',
                            color: '#f59e0b',
                            problem: `Peak Hour: ${a.peak_hour?.label || '—'} (เฉลี่ย ${a.peak_hour?.avg ?? 0} ราย) — ช่วงเวลานี้ ER รับ load สูงสุด Staff + Equipment ต้องพร้อมเต็มกำลัง`,
                            recommend: '📋 Peak Management: (1) จัด Staffing สูงสุดช่วง Peak ±2 ชม. (2) เปิด Fast-track / See-and-treat ช่วง Peak (3) Discharge IPD ก่อนเที่ยง เพื่อให้ ER admit ได้ช่วงบ่าย (4) ลด Elective procedures ช่วง Peak',
                        },
                        {
                            icon: '🎯', label: 'Today Acuity',
                            value: `${ta.acuity_pct ?? 0}%`,
                            sub: `🔴 ${ta.resus ?? 0} · 🟠 ${ta.emerg ?? 0} · 🟡 ${ta.urgent ?? 0} · 🟢 ${ta.semi ?? 0}`,
                            desc: '% Level 1-2 วันนี้ — วัดความรุนแรงผู้ป่วย',
                            color: (ta.acuity_pct ?? 0) > 30 ? '#f43f5e' : '#0ea5e9',
                            problem: (ta.acuity_pct ?? 0) > 30
                                ? `Acuity ${ta.acuity_pct ?? 0}% Level 1-2 (Resus ${ta.resus ?? 0} + Emerg ${ta.emerg ?? 0}) — สูง! หนึ่งในสามเป็น Critical/Emergency ต้องการ Resources มาก: แพทย์เฉพาะทาง, เครื่อง Monitor, เตียง Resus`
                                : `Acuity ${ta.acuity_pct ?? 0}% Level 1-2 — ปกติ Case mix สมดุลระหว่าง Acute กับ Non-urgent`,
                            recommend: (ta.acuity_pct ?? 0) > 30
                                ? '🚨 Acuity สูง: (1) เพิ่ม Senior physician ประจำ Resus zone (2) เตรียม ICU bed สำรอง (3) เรียก Specialist on-call standby (4) Blood bank + Lab fast-track สำหรับ Level 1 (5) พิจารณา Refer ถ้าเกิน capacity'
                                : '📋 ดี: (1) คง Staffing ตาม Acuity mix (2) ทบทวน Triage accuracy ทุกสัปดาห์ (3) Non-urgent redirection ไป Walk-in clinic',
                        },
                        {
                            icon: '⏱️', label: 'Wait >30 min',
                            value: `${a.over_30m_count ?? 0}`,
                            sub: `จากทั้งหมด 30 วัน`,
                            desc: 'จำนวนครั้งที่รอพบแพทย์นานเกิน 30 นาที',
                            color: (a.over_30m_count ?? 0) < 10 ? '#10b981' : (a.over_30m_count ?? 0) < 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.over_30m_count ?? 0) < 10
                                ? `Wait >30min เพียง ${a.over_30m_count ?? 0} ครั้ง / 30 วัน — ดี! ER flow ลื่นไหล ไม่มีปัญหาคอขวด`
                                : (a.over_30m_count ?? 0) < 30
                                    ? `Wait >30min ${a.over_30m_count ?? 0} ครั้ง — ต้องเฝ้าระวัง มีผู้ป่วยรอนานเฉลี่ย ~1 ครั้ง/วัน อาจเกิดช่วง Peak hours หรือวันที่ Volume สูง`
                                    : `🚨 Wait >30min ${a.over_30m_count ?? 0} ครั้ง (>1/วัน) — ER flow คอขวดหนัก! ผู้ป่วยรอนานเป็นประจำ เสี่ยง: Deterioration ระหว่างรอ + Patient satisfaction ต่ำ + LWBS สูง`,
                            recommend: (a.over_30m_count ?? 0) < 10
                                ? '✅ คงมาตรฐาน — ถ้ามี wait >30min ให้ RCA ทุกครั้ง'
                                : '📋 ลด Long wait: (1) Lean flow: ลด Non-value-added steps (2) Parallel processing: Triage + Lab + Dr พร้อมกัน (3) เพิ่ม Dr ช่วง Peak (4) ER whiteboard/dashboard แสดง wait time real-time (5) Discharge IPD เร็วขึ้นเพื่อลด Boarding',
                        },
                    ];

                    // ━━━ Tier 3: Financial ━━━
                    const tier3Cards = [
                        {
                            icon: '💰', label: 'Avg Cost / Visit',
                            value: `฿${(a.avg_cost_per_visit ?? 0).toLocaleString()}`,
                            sub: `Max ฿${(a.max_cost ?? 0).toLocaleString()}`,
                            desc: 'รายได้เฉลี่ยต่อ 1 visit ER',
                            color: '#0ea5e9',
                            problem: `Avg Cost/Visit ฿${(a.avg_cost_per_visit ?? 0).toLocaleString()} (Max ฿${(a.max_cost ?? 0).toLocaleString()}) — ${(a.avg_cost_per_visit ?? 0) < 1000 ? '⚠️ ต่ำ อาจมี Under-billing หรือ ER ส่วนใหญ่เป็น Non-urgent ใช้ resources น้อย' : 'ปกติ สอดคล้องกับ Case mix'}`,
                            recommend: '📋 Optimize Revenue: (1) ตรวจสอบ Missing charges ทุกสัปดาห์ (2) Verify procedure billing ครบถ้วน (3) วิเคราะห์ Revenue per triage level — Level 1-2 ควรมี revenue สูงกว่า (4) ลด Free-visit ER (Non-emergency ไปใช้ OPD)',
                        },
                        {
                            icon: '💵', label: 'ER Revenue (30d)',
                            value: `฿${((a.total_er_revenue ?? 0) / 1000).toFixed(0)}k`,
                            sub: `${(a.total_visits_30d ?? 0).toLocaleString()} visits`,
                            desc: 'รายได้รวม ER 30 วัน',
                            color: '#10b981',
                            problem: `ER Revenue ฿${((a.total_er_revenue ?? 0) / 1000).toFixed(0)}k / 30 วัน จาก ${(a.total_visits_30d ?? 0).toLocaleString()} visits — Rev/Visit ≈ ฿${a.total_visits_30d ? Math.round((a.total_er_revenue ?? 0) / a.total_visits_30d).toLocaleString() : '—'} ${(a.total_er_revenue ?? 0) / Math.max(a.total_visits_30d ?? 1, 1) < 1500 ? '⚠️ Rev/Visit ต่ำ ตรวจสอบ Claim + Billing completeness' : ''}`,
                            recommend: '📋 เพิ่ม ER Revenue: (1) DRG coding accuracy สำหรับ ER-to-admit cases (2) Claim สิทธิ์ฉุกเฉิน UCEP/SS ทุกราย (3) ER procedure fee schedule review (4) ลด Write-off จาก incomplete billing (5) Benchmark Rev/Visit ระหว่างเดือน',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* EPI Gauge + Component Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                {/* EPI Gauge */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={epiColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={epiColor} fontFamily="'Outfit',sans-serif">{epi}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">EPI Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: epiColor }}>{epiGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: epiColor }}>
                                            {epi >= 80 ? 'ER ประสิทธิภาพสูง' : epi >= 60 ? 'ระดับมาตรฐาน' : 'ต้องปรับปรุง'}
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                                            ER Performance Index
                                        </div>
                                    </div>

                                    {/* EPI Component Bars */}
                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>
                                            EPI Components
                                        </p>
                                        {epiRadar.map((c, i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '62px', textAlign: 'right', flexShrink: 0 }}>{c.name}</span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, color: barColor, width: '24px', textAlign: 'right' }}>{c.score}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tiered KPI Cards with Problem + Recommend */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                    {[
                                        { title: 'Time Performance & Quality', color: '#f43f5e', cards: tier1Cards },
                                        { title: 'Volume & Capacity', color: '#0ea5e9', cards: tier2Cards },
                                        { title: 'Financial Intelligence', color: '#f59e0b', cards: tier3Cards },
                                    ].map((tier, ti) => (
                                        <div key={ti}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '3px', height: '14px', background: `linear-gradient(180deg, ${tier.color}, ${tier.color}99)`, borderRadius: '99px' }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    {tier.title}
                                                </span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                                {tier.cards.map((k, i) => (
                                                    <div key={i} style={{
                                                        padding: '8px 10px', borderRadius: '10px',
                                                        background: `${k.color}06`, border: `1px solid ${k.color}20`,
                                                    }}>
                                                        {/* Header */}
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: '18px', flexShrink: 0 }}>{k.icon}</span>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
                                                                <p style={{ margin: '2px 0 0', fontSize: '10px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.desc}</p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                                <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                                            </div>
                                                        </div>
                                                        {/* Problem */}
                                                        {k.problem && (
                                                            <div style={{ marginTop: '6px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>📊 วิเคราะห์สถานการณ์</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.problem}</p>
                                                            </div>
                                                        )}
                                                        {/* Recommend */}
                                                        {k.recommend && (
                                                            <div style={{ marginTop: '4px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>💡 แนะนำเชิงนโยบาย</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.recommend}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* ━━━ Charts: Hourly Heatmap + Triage Stay + Disposition ━━━ */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem',
                                borderTop: '1px solid var(--md-border)', paddingTop: '1rem',
                            }}>
                                {/* Hourly Heatmap */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        🕐 Hourly Load (30 วัน)
                                    </p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <BarChart data={a.hourly_heatmap || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="hour" tick={{ fill: '#6b7280', fontSize: 8, fontWeight: 700 }} axisLine={false} tickLine={false}
                                                tickFormatter={h => h % 4 === 0 ? `${String(h).padStart(2, '0')}` : ''} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={20} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => n === 'avg' ? [`${v} ราย/วัน`, 'เฉลี่ย'] : [`${v}`, n]}
                                                labelFormatter={h => `${String(h).padStart(2, '0')}:00 น.`} />
                                            <Bar dataKey="avg" radius={[3, 3, 0, 0]} barSize={8}>
                                                {(a.hourly_heatmap || []).map((d, i) => (
                                                    <Cell key={i} fill={d.hour === a.peak_hour?.hour ? '#f43f5e' : d.avg >= 3 ? '#f59e0b' : '#7c3aed'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Triage Stay Time */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        ⏱️ Stay Time by Triage
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        {(a.triage_stay_time || []).map((t, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ fontSize: '10px', fontWeight: 700, color: t.color, width: '60px', textAlign: 'right', flexShrink: 0 }}>{t.name.substring(0, 6)}</span>
                                                <div style={{ flex: 1, height: '8px', background: 'rgba(203,213,225,.15)', borderRadius: '99px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${Math.min(100, (t.avg_stay / 200) * 100)}%`, height: '100%', background: t.color, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                </div>
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: t.color, width: '44px', textAlign: 'right', flexShrink: 0 }}>{t.avg_stay}m</span>
                                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', width: '28px', textAlign: 'right', flexShrink: 0 }}>{t.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Disposition */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        🏥 Disposition (30 วัน)
                                    </p>
                                    <ResponsiveContainer width="100%" height={120}>
                                        <PieChart>
                                            <Pie
                                                data={(a.disposition || []).map((d, i) => ({
                                                    name: d.name, value: d.count,
                                                    fill: ['#10b981', '#7c3aed', '#0ea5e9', '#f59e0b', '#f43f5e', '#94a3b8'][i] || '#94a3b8'
                                                }))}
                                                dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={48} paddingAngle={3}
                                            />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => [`${v} ราย`, n]} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                                        {(a.disposition || []).slice(0, 4).map((d, i) => (
                                            <span key={i} style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                                {d.name}: {d.count}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Trend */}
                            {(a.monthly_trend || []).length > 0 && (
                                <div style={{ borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        📈 Monthly ER Trend (6 เดือน)
                                    </p>
                                    <ResponsiveContainer width="100%" height={120}>
                                        <ComposedChart data={a.monthly_trend} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#f43f5e', fontSize: 9 }} axisLine={false} tickLine={false} width={24} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => {
                                                    if (n === 'visits') return [`${v} ราย`, 'รวม'];
                                                    if (n === 'critical') return [`${v} ราย`, 'Critical'];
                                                    return [`${v} min`, 'Avg Stay'];
                                                }} />
                                            <Area yAxisId="left" type="monotone" dataKey="visits" stroke="#7c3aed" fill="rgba(124,58,237,.1)" strokeWidth={2} />
                                            <Bar yAxisId="right" dataKey="critical" fill="rgba(244,63,94,.3)" radius={[3, 3, 0, 0]} barSize={12} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — ER ━━━━━━ */}
            {!loading.erAnalytics && erAnalytics && (() => {
                const a = erAnalytics || {};
                const epi = a.epi ?? 0;
                const avgTimeToDoc = a.avg_time_to_doctor ?? 0;
                const sdTimeToDoc = a.sd_time_to_doctor ?? 0;
                const within10m = a.within_10m_pct ?? 0;
                const lwbsRate = a.lwbs_rate ?? 0;
                const lwbsCount = a.lwbs_count ?? 0;
                const returnRate = a.return_visit_rate ?? 0;
                const returnCount = a.return_visit_count ?? 0;
                const admitRate = a.admit_rate ?? 0;
                const admitCount = a.admit_count ?? 0;
                const avgDailyVisits = a.avg_daily_visits ?? 0;
                const over30m = a.over_30m_count ?? 0;
                const ta = a.today_acuity || {};
                const acuityPct = ta.acuity_pct ?? 0;
                const avgCost = a.avg_cost_per_visit ?? 0;
                const totalRevenue = a.total_er_revenue ?? 0;
                const totalVisits = a.total_visits_30d ?? 0;
                const peakHour = a.peak_hour?.label || '—';
                const peakAvg = a.peak_hour?.avg ?? 0;
                const liveER = erTodayPatients.length;
                const avgStay = liveER > 0 ? Math.round(erTodayPatients.reduce((s, p) => s + p.stay_minutes, 0) / liveER) : 0;

                // ─── Detect problems ───
                const problems = [];

                // 1. Time-to-Doctor > 15m
                if (avgTimeToDoc > 15) {
                    const isCritical = avgTimeToDoc > 30;
                    problems.push({
                        priority: 1,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 Time-to-Doctor ${avgTimeToDoc} min — เกิน HA Standard 15 min · เพียง ${within10m}% พบแพทย์ใน ≤10 min`,
                        rootCause: `ผู้ป่วย ER รอพบแพทย์เฉลี่ย ${avgTimeToDoc} นาที (σ ${sdTimeToDoc}) ← เกินมาตรฐาน HA 15 นาที ── สาเหตุที่แท้จริง: (1) ER overcrowding — Volume เฉลี่ย ${avgDailyVisits} ราย/วัน ${avgDailyVisits > 80 ? '(สูง!)' : ''} + Peak hour ${peakHour} (${peakAvg} ราย) (2) Boarding ER — ผู้ป่วยรอ Admit ยังนอนใน ER ครอง Bed + Staff → ER ไม่มีที่ว่างรับใหม่ (3) Staffing ไม่เพียงพอช่วง Peak: แพทย์ ER ต้อง Cover ทั้ง critical + non-urgent (4) ไม่มี Fast-track lane สำหรับ Level 4-5 → queuing หลังผู้ป่วยหนัก (5) Triage bottleneck: ใช้เวลา Triage นาน + ระบบ manual`,
                        cascadeEffect: `Time-to-Doc สูง → ผู้ป่วยรอนาน → LWBS เพิ่ม (ปัจจุบัน ${lwbsRate}%) → ผู้ป่วย Acute อาจ Deteriorate ขณะรอ → Patient safety risk ● รอนาน → Patient satisfaction ลดลง → Complaint + ฟ้องร้อง ● ผู้ป่วยที่รอ >30min: ${over30m} ครั้ง/30วัน ● ER ที่ช้า → ผู้ป่วยกลับมาอีก (Return Visit ${returnRate}%) เพราะ "ดูเร็วเกินไป ตรวจไม่ละเอียด"`,
                        fixFirst: `🔧 ด่วนที่สุด: (1) เปิด Fast-track zone แยก Level 4-5 = ลด queue ให้ Level 1-3 ทันที (2) เพิ่มแพทย์ช่วง Peak ${peakHour} ±2 ชม. (3) Vertical patient flow: Triage→Order→Lab→ตรวจ พร้อมกัน (4) ER Boarding protocol: ย้าย Boarding patients ไป ward ทุก 2 ชม. (5) Electronic triage ลดเวลา Triage (6) เป้าหมาย: Time-to-Doc ≤15 min ภายใน 30 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 2. LWBS Rate
                if (lwbsRate > 2) {
                    const isCritical = lwbsRate > 5;
                    problems.push({
                        priority: 2,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 LWBS Rate ${lwbsRate}% (${lwbsCount} ราย) — ผู้ป่วยออกก่อนพบแพทย์ · เกิน HA Standard 2%`,
                        rootCause: `Left Without Being Seen ${lwbsRate}% ← ผู้ป่วย ${lwbsCount} ราย ตัดสินใจออกจาก ER โดยไม่ได้พบแพทย์ ── สาเหตุ: (1) Wait time นานเกินทน (Time-to-Doc เฉลี่ย ${avgTimeToDoc} min) (2) ไม่ได้รับข้อมูลเรื่อง Wait time estimate (3) สิ่งแวดล้อม ER ไม่สะดวก: ห้องรอแออัด, ไม่มีที่นั่ง, ไม่มี update สถานะ (4) ผู้ป่วย Non-urgent ที่อาการดีขึ้นเอง เลือกไปที่อื่น (5) ⚠️ ช่องโหว่: ถ้ามี Acute case ปลอมเป็น Non-urgent → LWBS = Sentinel event risk`,
                        cascadeEffect: `LWBS ≠ "แค่ผู้ป่วยออกไป" → อาจมี Missed acute conditions → เกิดเหตุร้ายแรงนอก ร.พ. → Lawsuit + HA report ● LWBS สูง = สัญญาณ ER system failure → สรพ. ตรวจสอบ ● Revenue loss: ${lwbsCount} ราย × avg ฿${avgCost.toLocaleString()} = ฿${(lwbsCount * avgCost).toLocaleString()} สูญเสีย ● ภาพลักษณ์ รพ. เสียหาย → ผู้ป่วยไปที่อื่น`,
                        fixFirst: `🔧 ทำทันที: (1) Triage nurse ทำ Bedside registration ทันที — ผู้ป่วยได้ "ถูกเห็น" (2) แจ้ง Wait time estimate ทุกราย (3) Re-assessment ทุก 30 นาที ระหว่างรอ (4) Mandatory callback ทุกราย LWBS ภายใน 24 ชม. เพื่อ Safety check (5) ER dashboard แสดง Real-time wait time (6) Dr. round ห้องรอทุก 15 min ตรวจ urgent ก่อน (7) เป้าหมาย: LWBS <2% ใน 30 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 3. Return Visit 72h
                if (returnRate > 5) {
                    const isCritical = returnRate > 10;
                    problems.push({
                        priority: 3,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 Return Visit 72h: ${returnRate}% (${returnCount} ราย) — ER Treatment Quality Concern`,
                        rootCause: `ผู้ป่วย ${returnRate}% กลับมา ER ซ้ำภายใน 72 ชม. ── สะท้อนปัญหาคุณภาพการรักษาครั้งแรก: (1) Missed diagnosis: ตรวจไม่ละเอียด → กลับมาด้วยอาการเดิมที่แย่ลง (2) Discharge instruction ไม่ชัดเจน: ผู้ป่วยไม่เข้าใจว่าเมื่อไหร่ต้องกลับมา (3) ยาไม่เพียงพอ/ไม่ถูกต้อง (4) ⚠️ ความสัมพันธ์กับ Time-to-Doc: ถ้าตรวจเร็วเกินไปเพื่อลด wait → Quality อาจลดลง → Return visit สูง (5) ER overcrowding กดดันให้ Discharge เร็ว`,
                        cascadeEffect: `Return visit สูง → Workload ER เพิ่มซ้ำ → เวลาสำหรับผู้ป่วยใหม่ลดลง → Time-to-Doc สูงขึ้น → LWBS สูงขึ้น = วงจรอุบาทว์ ● Malpractice risk: Missed diagnosis ที่กลับมาแย่ลง = ป่วยหนักขึ้น ● ค่ารักษาเพิ่มขึ้น 2-5 เท่า สำหรับ Return cases ● สปสช./HA flag ทันที`,
                        fixFirst: `🔧 ลด Return Visit: (1) Discharge checklist: ยา + Red flags + Follow-up plan ทุกราย (2) Phone callback 24 ชม. หลัง discharge สำหรับ Level 1-3 (3) Audit ทุก Return visit: หาสาเหตุ — Missed diagnosis? Undertreated? Complication? (4) เพิ่ม Observation unit สำหรับ Borderline cases (นอนสังเกต 4-6 ชม.) (5) ห้าม Discharge ถ้ายังไม่ผ่าน Safety criteria (6) เป้าหมาย: Return <3% ภายใน 60 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 4. ER Overcrowding (High Volume)
                if (avgDailyVisits > 80 || liveER > 30) {
                    const isCritical = avgDailyVisits > 120 || liveER > 50;
                    problems.push({
                        priority: 4,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 ER Volume สูง: เฉลี่ย ${avgDailyVisits} ราย/วัน · ตอนนี้ ${liveER} ราย · Peak ${peakHour} (${peakAvg} ราย)`,
                        rootCause: `ER รับผู้ป่วยเฉลี่ย ${avgDailyVisits} ราย/วัน (${totalVisits.toLocaleString()} ราย/30 วัน) ── ปัจจุบัน Live: ${liveER} ราย, Avg Stay ${avgStay} min ── สาเหตุ Volume สูง: (1) Non-emergency ใช้ ER (Level 4-5 มาก) เพราะ OPD ปิด/ไม่สะดวก (2) ER เป็น Safety net สำหรับผู้ป่วยไม่มีสิทธิ์ (3) ER Boarding: Admit รอเตียง → ครอง ER bed นาน → Queue ยาว (4) Seasonal surge: ช่วงฤดูไข้หวัดใหญ่/อุบัติเหตุ (5) LWBS ต่ำ = ER รับ load ทั้งหมด ไม่มี diversion`,
                        cascadeEffect: `Volume สูง → ER overcrowding → แพทย์ต้อง multitask → Quality ลดลง → Return visit สูง + Error risk ● Overcrowding → Wait time เพิ่ม (${avgTimeToDoc} min avg) → LWBS เพิ่ม (${lwbsRate}%) ● Staff burnout → Turnover สูง → ยิ่ง Understaffed ● Infection risk เพิ่มขึ้นจากความแออัด`,
                        fixFirst: `🔧 ER Capacity Management: (1) Fast-track zone สำหรับ Level 4-5 แยก flow ออก (2) Non-urgent redirect ไป Walk-in clinic / OPD extended hours (3) Peak staffing: เพิ่มแพทย์+พยาบาล ช่วง ${peakHour} (4) ER Boarding protocol: IPD ต้อง Pull ผู้ป่วยภายใน 4 ชม. (5) Surge protocol: เรียก Staff สำรองเมื่อ Volume >threshold (6) Telemedicine triage สำหรับ Low-acuity`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 5. High Acuity
                if (acuityPct > 25) {
                    problems.push({
                        priority: 5,
                        severity: acuityPct > 40 ? 'critical' : 'warning',
                        title: `🟡 Acuity สูง: ${acuityPct}% Level 1-2 (Resus ${ta.resus ?? 0} + Emerg ${ta.emerg ?? 0}) — ต้องการ Resource มาก`,
                        rootCause: `Level 1-2 = ${acuityPct}% ← ผู้ป่วยหนักเกือบ 1 ใน 3 ── หมายความว่า ER ต้องใช้ Resources มาก: Senior physician, Resus bay, Cardiac monitor, Specialist on-call ── สาเหตุ Acuity สูง: (1) รับ Referral cases หนักจาก รพ.อื่น (2) Delayed presentation: ผู้ป่วยมาสายเมื่ออาการหนักแล้ว (3) Community health ไม่ดี → ป่วยหนักก่อนมา ER (4) Admission rate สูง (${admitRate}%) สะท้อน Case severity`,
                        cascadeEffect: `Acuity สูง → ต้องการ 1:1 Nursing + Senior Dr → Staff ทำ non-urgent ไม่ทัน → Wait time Level 3-5 นานมาก → LWBS Level 4-5 สูง ● Level 1 ต้อง Resus bay → ถ้าเต็ม → Level 2 รอนาน = Danger ● ICU bed demand จาก ER สูง → IPD overflow ● Mortality + Malpractice risk เพิ่มเมื่อ Acuity สูง + Resource ไม่พอ`,
                        fixFirst: `🔧 High-Acuity Response: (1) Senior physician ประจำ Resus zone 24/7 (2) เตรียม ICU bed สำรอง 2 เตียงเสมอ (3) Specialist on-call standby: Cardio, Neuro, Trauma (4) Blood bank + Lab fast-track สำหรับ Level 1 (5) ถ้า >40% Level 1-2 → พิจารณา Refer/Diversion protocol`,
                        color: acuityPct > 40 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 6. Long Wait > 30m
                if (over30m > 20) {
                    problems.push({
                        priority: 6,
                        severity: over30m > 50 ? 'critical' : 'warning',
                        title: `🟠 Wait >30 min: ${over30m} ครั้ง / 30 วัน — ER Flow Bottleneck`,
                        rootCause: `พบ ${over30m} ครั้งที่ผู้ป่วยรอพบแพทย์ >30 นาที ← เฉลี่ย ${Math.round(over30m / 30)} ครั้ง/วัน ── สาเหตุ: (1) Peak hour congestion ช่วง ${peakHour} (2) Lab/Imaging turnaround ช้า → แพทย์ต้องรอผลก่อนดูคนต่อ (3) Boarding patients ครอง Space + Staff (4) Registration/Triage process ยาว → Delay ก่อนเริ่มดู (5) Documentation burden: แพทย์ใช้เวลาเขียน chart มาก`,
                        cascadeEffect: `Long wait → Deterioration risk สำหรับ Acute cases → Patient complaint + LWBS ● ทุกนาทีที่ล่าช้าสำหรับ MI/Stroke = Brain/Heart tissue loss ● Wait >30min เกิดซ้ำ → Staff เครียด + Morale ลดลง → Error rate เพิ่ม ● สรพ./HA audit flag เมื่อ Wait time ไม่ได้มาตรฐาน`,
                        fixFirst: `🔧 Flow Optimization: (1) Lean ER flow: ลด Non-value-added steps ทุกจุด (2) Parallel processing: Triage + Order + Lab + ตรวจ พร้อมกัน (3) Point-of-care testing (POCT) ลดรอ Lab (4) Portable X-ray/Ultrasound ลดรอ Imaging (5) ER whiteboard แสดง Wait time real-time (6) เป้าหมาย: Wait >30min <10 ครั้ง/เดือน`,
                        color: over30m > 50 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // If no significant problems
                if (problems.length === 0) {
                    problems.push({
                        priority: 0,
                        severity: 'good',
                        title: '✅ ER Operations ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `EPI ${epi}/100 · Time-to-Doc ${avgTimeToDoc}min · LWBS ${lwbsRate}% · Return ${returnRate}% · Acuity ${acuityPct}% — ตัวชี้วัดอยู่ในเกณฑ์ HA Standard`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — ER Flow ลื่นไหล ควร Monitor ต่อเนื่อง`,
                        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ EPI ≥ ${Math.min(epi + 10, 100)} (2) ลด Time-to-Doc ต่ำสุด (3) Zero LWBS target (4) Benchmark กับ ER ระดับ A`,
                        color: '#10b981',
                    });
                }

                problems.sort((a, b) => a.priority - b.priority);

                const critCount = problems.filter(p => p.severity === 'critical').length;
                const warnCount = problems.filter(p => p.severity === 'warning').length;
                const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);
                const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
                const urgencyLabel = urgencyScore >= 7 ? 'ต้องดำเนินการทันที' : urgencyScore >= 4 ? 'ควรแก้ไขเร็ว' : 'สถานการณ์ปกติ';

                const chainItems = [
                    { label: `Volume ${avgDailyVisits}/d`, color: '#0ea5e9' },
                    { label: `Wait ${avgTimeToDoc}min`, color: '#f59e0b' },
                    { label: `LWBS ${lwbsRate}%`, color: '#f43f5e' },
                    { label: `Return ${returnRate}%`, color: '#e11d48' },
                    { label: `Acuity ${acuityPct}%`, color: '#8b5cf6' },
                    { label: `EPI = ${epi}/100`, color: '#10b981' },
                ];

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🔥 Deep Root-Cause Analysis
                            </span>
                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>Cross-analysis ER</span>
                        </div>

                        <div className={`glass-card ${urgencyScore >= 7 ? 'alert-critical' : urgencyScore >= 4 ? 'alert-warning' : ''}`} style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>
                            {/* Urgency Overview */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center',
                                padding: '1rem 1.25rem', borderRadius: '14px',
                                background: `linear-gradient(135deg, ${urgencyColor}08, ${urgencyColor}03)`,
                                border: `1px solid ${urgencyColor}20`, marginBottom: '1.25rem',
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 800, color: urgencyColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                            ⚡ ระดับความเร่งด่วนรวม — ER Operations
                                        </span>
                                        <span style={{
                                            fontSize: '10px', fontWeight: 700, color: urgencyColor,
                                            background: `${urgencyColor}15`, padding: '2px 8px', borderRadius: '999px',
                                            border: `1px solid ${urgencyColor}25`,
                                        }}>{urgencyLabel}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                                            พบ <strong style={{ color: '#f43f5e' }}>{critCount} ปัญหาวิกฤต</strong>
                                            {warnCount > 0 && <> + <strong style={{ color: '#f59e0b' }}>{warnCount} ปัญหาเตือน</strong></>}
                                            {problems[0]?.severity === 'good' && <strong style={{ color: '#10b981' }}>ไม่พบปัญหา</strong>}
                                        </span>
                                        <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
                                            EPI: {epi}/100 · T2D: {avgTimeToDoc}min · LWBS: {lwbsRate}% · Return: {returnRate}% · Live: {liveER}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: '8px', height: '6px', background: 'rgba(0,0,0,.06)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', width: `${urgencyScore * 10}%`,
                                            background: 'linear-gradient(90deg, #10b981, #f59e0b, #f43f5e)',
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
                                    <div className="urgency-score-pulse" style={{ fontSize: '36px', fontWeight: 900, color: urgencyColor, lineHeight: 1, letterSpacing: '-0.03em' }}>
                                        {Math.round(urgencyScore)}<span style={{ fontSize: '16px', fontWeight: 700 }}>/10</span>
                                    </div>
                                    <div style={{ fontSize: '10px', fontWeight: 700, color: urgencyColor, marginTop: '2px' }}>Urgency</div>
                                </div>
                            </div>

                            {/* Problem Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {problems.map((p, i) => (
                                    <div key={i} style={{
                                        borderRadius: '14px', border: `1.5px solid ${p.color}20`,
                                        background: `${p.color}04`, overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            padding: '10px 16px', background: `linear-gradient(90deg, ${p.color}12, transparent)`,
                                            borderBottom: `1px solid ${p.color}15`, display: 'flex', alignItems: 'center', gap: '10px',
                                        }}>
                                            {p.priority > 0 && (
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                    width: '24px', height: '24px', borderRadius: '50%',
                                                    background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, flexShrink: 0,
                                                }}>{p.priority}</span>
                                            )}
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)', lineHeight: 1.4 }}>
                                                {p.title}
                                            </span>
                                            <span style={{
                                                marginLeft: 'auto', flexShrink: 0, fontSize: '9px', fontWeight: 700,
                                                textTransform: 'uppercase', letterSpacing: '0.08em',
                                                padding: '3px 8px', borderRadius: '999px',
                                                background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25`,
                                            }}>
                                                {p.severity === 'critical' ? '🔴 CRITICAL' : p.severity === 'warning' ? '🟡 WARNING' : '🟢 GOOD'}
                                            </span>
                                        </div>

                                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    🔍 ปัญหาที่แท้จริง (Root Cause)
                                                </p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>
                                                    {p.rootCause}
                                                </p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    ⚡ ผลกระทบลูกโซ่ (Cascade Effect)
                                                </p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>
                                                    {p.cascadeEffect}
                                                </p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    🔧 แก้ไขก่อน — ด่วนที่ {p.priority > 0 ? p.priority : '—'} (Fix First)
                                                </p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>
                                                    {p.fixFirst}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cross-Impact Map */}
                            {problems.length > 1 && problems[0]?.severity !== 'good' && (
                                <div style={{
                                    marginTop: '16px', padding: '14px 16px', borderRadius: '12px',
                                    background: 'rgba(14,165,233,.04)', border: '1px solid rgba(14,165,233,.15)',
                                }}>
                                    <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        🗺️ แผนที่ความเชื่อมโยง — ER Bottleneck Chain
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        {chainItems.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i > 0 && <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>}
                                                <span style={{
                                                    fontSize: '11px', fontWeight: 700, color: item.color,
                                                    background: `${item.color}10`, padding: '4px 10px', borderRadius: '8px',
                                                    border: `1px solid ${item.color}20`,
                                                }}>{item.label}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic' }}>
                                        💡 <strong>สรุป:</strong> ปัญหา ER มีลักษณะ "วงจรอุบาทว์" — <strong style={{ color: '#0ea5e9' }}>Volume สูง</strong>
                                        → <strong style={{ color: '#f59e0b' }}>Wait time นาน</strong>
                                        → <strong style={{ color: '#f43f5e' }}>LWBS + Return visit สูง</strong>
                                        — <strong>แก้ ด่วนที่ 1 ก่อน</strong> (ลด Time-to-Doctor ด้วย Fast-track + เพิ่ม Staff) จะทำลายวงจรนี้ → KPI ทุกตัวดีขึ้นพร้อมกัน
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}


            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                {/* Load Dynamics */}
                <div className="chart-container 2xl:col-span-2">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                            🚑 ER Performance Dynamics
                        </h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7c3aed' }} /> <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Actual</span></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', border: '1px solid #8b5cf6', opacity: 0.5 }} /> <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Predicted</span></div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <ComposedChart data={hourlyChart}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" />
                            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '11px' }} />
                            <Area type="monotone" dataKey="predicted" fill="rgba(139,92,246,.05)" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            <Bar dataKey="actual" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={20} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Triage Distribution */}
                <div className="chart-container">
                    <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                        🏷️ Live Triage Mix
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={triagePieData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4}>
                                {triagePieData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginTop: '8px' }}>
                        {erTriageStats.map(s => {
                            const triage = TRIAGE_COLORS[s.id] || TRIAGE_COLORS[5];
                            return (
                                <div key={s.id} style={{ textAlign: 'center' }}>
                                    <span style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>{s.cnt}</span>
                                    <span style={{ display: 'block', fontSize: '8px', fontWeight: 700, color: triage.color, textTransform: 'uppercase' }}>{triage.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Flow Bottlenecks */}
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Flow Optimization Indices
                    </h3>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {state.erBottlenecks?.alerts?.map((a, i) => (
                            <span key={i} style={{
                                fontSize: '9px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px',
                                background: a.status === 'critical' ? 'rgba(244,63,94,.1)' : 'rgba(245,158,11,.1)',
                                color: a.status === 'critical' ? '#f43f5e' : '#f59e0b',
                            }}>
                                {a.message}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                    {[
                        { id: 'lab', component: 'Lab', icon: '🧪', label: 'Lab Cycle', value: state.erBottlenecks?.averages?.lab, threshold: 60, unit: 'm' },
                        { id: 'xray', component: 'X-ray', icon: '🩻', label: 'Imaging', value: state.erBottlenecks?.averages?.xray, threshold: 45, unit: 'm' },
                        { id: 'pharmacy', component: 'Pharmacy', icon: '💊', label: 'Pharmacy', value: state.erBottlenecks?.averages?.pharmacy, threshold: 30, unit: 'm' },
                    ].map((item, i) => {
                        const isOver = (item.value || 0) > item.threshold;
                        const alert = state.erBottlenecks?.alerts?.find(a => a.component === item.component) || null;
                        return (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {/* Primary KPI Block */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '16px',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        background: isOver ? 'rgba(244,63,94,.08)' : 'rgba(203,213,225,.06)',
                                        border: `1.5px solid ${isOver ? 'rgba(244,63,94,.4)' : 'rgba(203,213,225,.15)'}`,
                                        transition: 'all 0.3s', flexShrink: 0
                                    }}>
                                        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                        <span style={{ fontSize: 'var(--fs-md)', fontWeight: 900, color: 'var(--md-text-primary)' }}>{item.value || 0}{item.unit}</span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: 'var(--fs-xs)', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                            {item.label}
                                        </p>
                                        <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                            Standard: ≤{item.threshold}m
                                        </p>
                                    </div>
                                </div>

                                {/* Deep Analysis Block */}
                                {alert?.analysis && (
                                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(203,213,225,.05)', borderLeft: `3px solid ${alert.status === 'critical' ? '#f43f5e' : '#f59e0b'}` }}>
                                        <p style={{ margin: 0, fontSize: 'var(--fs-2xs)', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                            {alert.analysis}
                                        </p>
                                        <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(203,213,225,.1)' }}>
                                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                                                💡 นโยบายแนะนำ
                                            </p>
                                            <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-secondary)', lineHeight: 1.4, fontWeight: 600 }}>
                                                {alert.recommendation}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Patient Manifest */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--md-surface-2)',
                    borderBottom: '1px solid var(--md-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0 }}>
                        🚑 Active ER Manifest
                    </h3>
                    <span style={{
                        fontSize: 'var(--fs-xs)', fontWeight: 700, color: '#f43f5e',
                        background: 'rgba(244,63,94,.08)', border: '1px solid rgba(244,63,94,.2)',
                        padding: '4px 12px', borderRadius: '999px',
                    }}>
                        {erTodayPatients.length} Active Tracks
                    </span>
                </div>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.625rem 1.25rem',
                    background: 'var(--md-surface-2)',
                    borderBottom: '1px solid var(--md-border)',
                }}>
                    <div style={{ width: '40px', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Time</div>
                    <div style={{ flex: 1, fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Identity</div>
                    <div style={{ width: '64px', textAlign: 'center', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Triage</div>
                    <div style={{ width: '60px', textAlign: 'center', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Admit%</div>
                    <div style={{ width: '60px', textAlign: 'center', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Score</div>
                    <div style={{ width: '48px', textAlign: 'right', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Stay</div>
                </div>
                {erTodayPatients.length > 0 ? (
                    <List height={400} itemCount={erTodayPatients.length} itemSize={54} width="100%" className="custom-scrollbar">
                        {PatientRow}
                    </List>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
                        {loading.erTodayPatients ? '⏳ Initializing ER Manifest...' : 'ไม่พบผู้ป่วย ER วันนี้'}
                    </div>
                )}
            </div>

            {/* ━━━━━━ รายได้โดยประมาณ ER — ปีงบประมาณ (3 ปีย้อนหลัง) ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #e11d48)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้โดยประมาณ ER — ปีงบประมาณ (3 ปีย้อนหลัง)
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>vn_stat · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.erRevenueFiscal ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />
                        <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (() => {
                    const fiscalDataER = state.erRevenueFiscal;
                    const years = fiscalDataER?.fiscal_years || [];
                    if (years.length === 0) return <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '2rem 0' }}>ไม่พบข้อมูลรายได้ ER</p>;

                    const FY_COLORS = ['#94a3b8', '#fb7185', '#f43f5e'];

                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => {
                            row[`fy${fi}`] = (fy.months[i]?.revenue || 0);
                        });
                        return row;
                    });

                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const yoyGrowth = prevYear && prevYear.total_revenue > 0
                        ? Math.round(((latestYear.total_revenue - prevYear.total_revenue) / prevYear.total_revenue) * 1000) / 10
                        : 0;

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: '10px' }}>
                                {years.map((fy, fi) => {
                                    const isLatest = fi === years.length - 1;
                                    const color = FY_COLORS[fi];
                                    return (
                                        <div key={fi} style={{
                                            padding: '0.75rem 1rem', borderRadius: '12px',
                                            background: isLatest ? `linear-gradient(135deg, ${color}12, ${color}05)` : `${color}06`,
                                            border: `1px solid ${color}${isLatest ? '30' : '15'}`,
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                                <span style={{ fontSize: '10px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{fy.fiscal_label}</span>
                                                {isLatest && <span style={{ fontSize: '9px', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>}
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
                                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>vs {prevYear.fiscal_label}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

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

            {/* AI Command Center */}
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderTop: '2px solid #7c3aed' }}>
                <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7c3aed', animation: 'pulse 2s infinite' }} />
                    Operational AI Command Center
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(203,213,225,.04)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(203,213,225,.1)' }}>
                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Staffing Recommendation</span>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 500, marginTop: '8px', lineHeight: 1.6 }}>
                            {erSurge?.surge_alert ? 'Activate Tier-2 surge staffing protocol. Ready standby team for 18:00 interval.' : 'Flow optimized. Baseline staffing sufficient for current trajectory.'}
                        </p>
                    </div>
                    <div style={{ background: 'rgba(203,213,225,.04)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(203,213,225,.1)' }}>
                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>AI Intelligence Confidence</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--md-text-primary)' }}>94%</span>
                            <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.1)', borderRadius: '99px', overflow: 'hidden' }}>
                                <div style={{ width: '94%', height: '100%', background: 'linear-gradient(90deg, #7c3aed, #0ea5e9)', borderRadius: '99px' }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ background: 'rgba(203,213,225,.04)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(203,213,225,.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Protocol Version</span>
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', marginTop: '6px' }}>BCH.ER.v10.3</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
