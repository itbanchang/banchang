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
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';

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
        fetchData('opdMonthlyFiscal', '/api/opd/monthly-fiscal');
        fetchData('opdRevenueFiscal', '/api/opd/revenue-fiscal');
        fetchData('opdFlowPrediction', '/api/opd/ai/flow-prediction');
        fetchData('opdWaitOptimizer', '/api/opd/ai/wait-optimizer');
    }, [fetchData]);

    const hourlyChart = useMemo(() => {
        if (!opd?.hourly) return [];
        const currentHour = new Date().getHours();
        const yesterday = opd.hourly_yesterday || [];
        const prediction = opd.hourly_prediction || [];
        const benchmark = opd.hourly_benchmark || [];

        return opd.hourly
            .map((h, i) => {
                const hourId = h.hour;
                const benchEntry = benchmark.find(b => b.hr === hourId);
                return {
                    ...h,
                    yesterday: yesterday[i]?.count || 0,
                    prediction: prediction[i]?.count || 0,
                    confidence: prediction[i]?.confidence || 0,
                    baseline: benchEntry ? benchEntry.avg : 0
                };
            })
            .filter(h => {
                const hourLimit = opd?.is_holiday ? 12 : 20;
                return h.hour >= 7 && h.hour <= hourLimit;
            });
    }, [opd]);

    const patients = opd?.patients || [];

    const aiAnalytics = useMemo(() => {
        if (!opd) return {
            problems: [],
            critCount: 0,
            warnCount: 0,
            urgencyScore: 0,
            urgencyColor: '#10b981',
            urgencyLabel: 'สถานการณ์ปกติ',
            forecast: { nextPeak: '—', intensity: 'Low', waitTrend: 'Stable' },
            staffing: { status: 'Optimal', recommendation: 'Maintain current staffing', color: '#10b981' }
        };

        const sla = opd.sla_pct || 0;
        const avgWait = opd.avg_total_minutes || 0;
        const maxWait = opd.max_wait || 0;
        const p90 = opd.p90_wait || 0;
        const dropout = opd.dropout_pct || 0;
        const revenueLoss = opd.revenue_loss_30d || 0;
        const uncoded = opd.uncoded_visits_30d || 0;
        const throughputVal = opd.throughput || 0;
        const capacity = opd.capacity_utilization || 0;
        const waitingDoctor = opd.waiting_doctor || 0;
        const morningCount = opd.morning_count || 0;
        const afternoonCount = opd.afternoon_count || 0;

        const problems = [];

        // ─── 1. Bottleneck & Wait Analysis ───
        if (sla < 70 || avgWait > 60 || waitingDoctor > 25) {
            const isCritical = sla < 50 || avgWait > 90 || waitingDoctor > 40;
            const primaryBottleneck = opd.wait_steps?.screening_to_doctor > 30 ? 'จุดรอพบแพทย์' : 'จุดคัดกรองประวัติ';
            const delayMins = Math.max(opd.wait_steps?.screening_to_doctor || 0, opd.wait_steps?.registration_to_screening || 0);

            problems.push({
                priority: 1,
                severity: isCritical ? 'critical' : 'warning',
                title: isCritical ? `🔴 วิกฤตคอขวด: "${primaryBottleneck}" หน่วงระบบรุนแรง` : `🟡 แจ้งเตือน: พบการชะลอตัวที่ "${primaryBottleneck}"`,
                rootCause: `ผู้ป่วยใช้เวลากว่า ${delayMins} นาทีในจุดดีเลย์หลัก ส่งผลให้ SLA ทรุดลงเหลือ ${sla}% (เป้าหมาย 80%) โดยกลุ่ม P90 ต้องรอนานถึง ${p90} นาที`,
                cascadeEffect: `เกิดภาวะสะสม (Congestion) ในโถงรอคอย → กดดัน Staff หน้างาน → เพิ่มความเสี่ยง Dropout (${dropout}%) และทำลาย Patient Experience`,
                fixFirst: isCritical
                    ? `🚀 แผนด่วน: (1) เปิด Fast-Track Lane สำหรับ Simple Case ทันที (2) ดึงแพทย์สำรองเสริมจุดตรวจ (3) แจ้งผู้ป่วยถึงสถานะคิวนัดเพื่อลด Anxiety`
                    : `📋 ข้อแนะนำ: (1) กระจายโหลดผู้ป่วยจากจุดคอขวดไปคลินิกข้างเคียง (2) เพิ่มเจ้าหน้าที่ช่วยคัดกรองในช่วง Peak 30 นาทีหน้านี้`,
                color: isCritical ? '#f43f5e' : '#f59e0b',
            });
        }

        // ─── 2. Revenue & Billing Integrity ───
        if (revenueLoss > 30000 || uncoded > 0) {
            const isCritical = revenueLoss > 100000;
            problems.push({
                priority: 2,
                severity: isCritical ? 'critical' : 'warning',
                title: `💰 รั่วไหลเชิงรายได้: พบ Uncoded DX ${uncoded} รายการ`,
                rootCause: `หัตถการบางส่วนไม่ถูกลงรหัสวินิจฉัย (ICD-10) ทำให้เสียโอกาสเบิกจ่าย ประเมินความเสียหายสะสม ฿${(revenueLoss / 1e3).toFixed(1)}K (สถิติ 30 วัน)`,
                cascadeEffect: `Cash Flow ติดขัด → Rejection Rate ของกองทุน (สปสช./ประกันสังคม) สูงขึ้น → มีผลต่อตัวชีวัดการเงินรายเดือน`,
                fixFirst: `💸 Revenue Alert: (1) ล็อกระบบ HOSxP บังคับแพทย์ลง DX ก่อนปิดเคส (2) ส่งทีม Audit ตรวจเคสค้างภายในวันนี้`,
                color: isCritical ? '#f43f5e' : '#f59e0b',
            });
        }

        // ─── 3. AI Smart Staffing & Forecast ───
        const currentHour = new Date().getHours();
        const nextHourPeak = (opd.hourly_prediction || []).find(f => f.hour === (currentHour + 1))?.count || 0;
        const avgHourly = throughputVal || 20;

        let staffingStatus = 'Optimal';
        let staffingRec = 'กำลังพลเพียงพอต่อโหลดปัจจุบัน';
        let staffingColor = '#10b981';

        if (capacity > 90 || (nextHourPeak > avgHourly * 1.5)) {
            staffingStatus = 'Overstrained';
            staffingRec = `🚨 ต้องการแพทย์/พยาบาลเพิ่ม ${Math.ceil((nextHourPeak - avgHourly) / 5)} ท่าน เพื่อรองรับ Peak ในชั่วโมงถัดไป`;
            staffingColor = '#f43f5e';
        } else if (capacity > 75) {
            staffingStatus = 'Tight';
            staffingRec = '⚠️ ควรเฝ้าระวังและงดการพักในช่วง 60 นาทีถัดไป';
            staffingColor = '#f59e0b';
        }

        const waitTrend = avgWait > (opd.yesterday_avg_wait || 60) ? 'Increasing' : 'Improving';

        // ─── 4. Flow Stability ───
        if (opd.wait_stddev > 30) {
            problems.push({
                priority: 3,
                severity: 'warning',
                title: `📐 พบความไม่สม่ำเสมอในบริการ (High Variance)`,
                rootCause: `ค่าเบี่ยงเบนมาตรฐาน (σ) สูงถึง ${opd.wait_stddev} นาที แสดงว่าผู้ป่วยได้รับประสบการณ์ที่ต่างกันมาก บางรายรอนานผิดปกติขณะที่บางรายเร็วมาก`,
                cascadeEffect: `เกิดการเปรียบเทียบระหว่างผู้ป่วย → คำร้องเรียนเพิ่มขึ้นในกลุ่มที่รอนาน → ระบบคิวไม่มีความน่าเชื่อถือ`,
                fixFirst: `🛡️ แก้ไข: (1) ตรวจสอบการแทรกคิวหรือเคสหลุด (Dropped Queue) (2) ปรับจูนระบบ Triage คัดกรองความเร่งด่วนให้แม่นยำขึ้น`,
                color: '#f59e0b',
            });
        }

        // Summary state
        if (problems.length === 0) {
            problems.push({
                priority: 0,
                severity: 'good',
                title: '✅ OPD Performance อยู่ในเกณฑ์ดีเยี่ยม',
                rootCause: `SQI Score ${opd.sqi || 0}/100 | SLA ${sla}% | Avg Wait ${avgWait} นาที`,
                cascadeEffect: `ไม่มีผลกระทบเชิงลบ | การไหลเวียนผู้ป่วยมีความเสถียร (Flow Stability: 95%+)`,
                fixFirst: `🎯 รักษามาตรฐานเดิมและมอนิเตอร์ Patient Feedback เพื่อยกระดับความพึงพอใจสูงสุด`,
                color: '#10b981',
            });
        }

        problems.sort((a, b) => a.priority - b.priority);
        const critCount = problems.filter(p => p.severity === 'critical').length;
        const warnCount = problems.filter(p => p.severity === 'warning').length;
        const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);
        const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
        const urgencyLabel = urgencyScore >= 7 ? 'ต้องดำเนินการทันที' : urgencyScore >= 4 ? 'ควรแก้ไขเร็ว' : 'สถานการณ์ปกติ';

        return {
            problems, critCount, warnCount, urgencyScore, urgencyColor, urgencyLabel,
            forecast: {
                nextPeak: nextHourPeak > 0 ? `${currentHour + 1}:00` : '—',
                intensity: nextHourPeak > 40 ? 'Critical' : nextHourPeak > 25 ? 'High' : 'Moderate',
                waitTrend
            },
            staffing: { status: staffingStatus, recommendation: staffingRec, color: staffingColor }
        };
    }, [opd]);

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
            {/* AI Strategic Intelligence Feed — Unified View */}
            <div className="glass-card" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(124,58,237,.2)', background: 'linear-gradient(90deg, rgba(124,58,237,.08), transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Live Executive Intelligence Feed
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                            <strong style={{ color: 'var(--md-text-primary)' }}>System Status:</strong> Online & Auditing
                        </span>
                    </div>
                </div>
            </div>
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
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>★ ใหม่ (1,2,3) {newPt} ({newPct}%)</span>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7280' }}>↩ เก่า (อื่น/วางเปล่า) {total - newPt}</span>
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

            {/* ━━━ Professional OPD KPI Dashboard with Descriptions ━━━ */}
            {opd && (() => {
                const sla = opd.sla_pct || 0;
                const avgWait = opd.avg_total_minutes || 0;
                const throughput = opd.throughput || 0;
                const dpi = opd.dpi || 0;
                const dropout = opd.dropout_pct || 0;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'SLA Compliance', thLabel: 'อัตราผ่าน SLA (≤60 นาที)',
                            value: `${sla}%`, color: sla >= 80 ? '#059669' : sla >= 60 ? '#f59e0b' : '#e11d48', icon: '🎯',
                            sub: sla >= 80 ? 'ผ่านเกณฑ์' : 'ต่ำกว่าเกณฑ์',
                            desc: `ผู้ป่วยที่รอไม่เกิน 60 นาที`,
                            meaning: 'สัดส่วนผู้ป่วยที่ได้รับบริการครบวงจร (ลงทะเบียน→ตรวจ→รับยา) ภายใน 60 นาที',
                            calc: '(Patients with Total Wait ≤60min ÷ Total Patients) × 100',
                            dataSource: 'service_time (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
                            target: '≥ 80%',
                            benchmark: 'สปสช.: ≥80% | HA: ≥70%',
                            aiTip: sla >= 80 ? 'SLA ดีเยี่ยม — รักษาคุณภาพ' : 'ต่ำ — ตรวจสอบจุดคอขวดและเพิ่ม Fast-track',
                        },
                        {
                            label: 'Avg Wait Time', thLabel: 'เวลารอเฉลี่ยรวม',
                            value: `${avgWait} นาที`, color: avgWait <= 60 ? '#059669' : avgWait <= 90 ? '#f59e0b' : '#e11d48', icon: '⏱️',
                            desc: `รวมทุกขั้นตอน (ลงทะเบียน → รับยา)`,
                            meaning: 'เวลาเฉลี่ยตั้งแต่ผู้ป่วยลงทะเบียนจนถึงพิมพ์ใบสั่งยา ยิ่งน้อยยิ่งดี',
                            calc: 'AVG(rcpt_print.print_time − ovst.vsttime) [minutes]',
                            dataSource: 'service_time + rcpt_print (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
                            target: '≤ 60 นาที',
                            benchmark: 'สปสช.: ≤60m | HA: ≤90m',
                            aiTip: avgWait <= 60 ? 'ดีเยี่ยม — ผู้ป่วยพึงพอใจ' : 'ช้า — วิเคราะห์ขั้นตอนที่ใช้เวลามากที่สุด',
                            drillDownId: 'opd_wait',
                            drillDownEndpoint: '/api/opd/drilldown?type=wait'
                        },
                        {
                            label: 'Throughput Rate', thLabel: 'อัตราบริการต่อชั่วโมง',
                            value: `${throughput} ราย/ชม.`, color: throughput >= 25 ? '#059669' : throughput >= 15 ? '#f59e0b' : '#e11d48', icon: '⚡',
                            desc: `อัตราบริการต่อชั่วโมง (งาน OPD)`,
                            meaning: 'จำนวนผู้ป่วยที่รับบริการครบวงจรและกลับบ้านต่อชั่วโมงการทำงาน',
                            calc: 'Completed Visits ÷ Operating Hours [per hour]',
                            dataSource: 'ovst + service_time (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้`,
                            target: '≥ 20 ราย/ชม.',
                            benchmark: 'รพ.ชุมชน: 20-30 | รพ.ศูนย์: 40+',
                            aiTip: throughput >= 20 ? 'Throughput ดี — กำลังคนเพียงพอ' : 'ต่ำ — เพิ่มจำนวนแพทย์หรือเปิด Fast-track',
                        },
                        {
                            label: 'DPI Score', thLabel: 'ดัชนีประสิทธิภาพ OPD',
                            value: `${dpi}/100`, color: dpi >= 80 ? '#059669' : dpi >= 60 ? '#f59e0b' : '#e11d48', icon: '🧠',
                            sub: dpi >= 80 ? 'ดีเยี่ยม' : dpi >= 60 ? 'ปานกลาง' : 'ต้องปรับปรุง',
                            desc: `OPD Department Performance Index`,
                            meaning: 'คะแนนรวมประสิทธิภาพ OPD จาก AI ถ่วงน้ำหนัก SLA, Wait Time, Throughput, Dropout',
                            calc: 'SLA×30% + WaitScore×25% + Throughput×25% + (100−Dropout%)×20%',
                            dataSource: 'คำนวณจาก KPI รวม (Composite)',
                            period: `📅 ประมวลผล ${todayShort}`,
                            target: '≥ 80',
                            benchmark: 'BCH Internal: ≥80 = ดีเยี่ยม',
                            aiTip: dpi >= 80 ? 'ภาพรวมดีเยี่ยม' : 'ต้องปรับปรุง — ดู KPI ที่ต่ำสุด',
                        },
                        {
                            label: 'Dropout Rate', thLabel: 'อัตรายกเลิกคิว',
                            value: `${dropout}%`, color: dropout <= 3 ? '#059669' : dropout <= 7 ? '#f59e0b' : '#e11d48', icon: '🚶',
                            desc: `ผู้ป่วยที่ยกเลิกคิวก่อนรับบริการ (30 วัน)`,
                            meaning: 'สัดส่วนผู้ป่วยที่ยกเลิกคิวก่อนได้รับบริการครบวงจร สะท้อนความพึงพอใจและโอกาสรายได้ที่เสียไป',
                            calc: '(Dropout Patients ÷ Total Registered) × 100 [30 days]',
                            dataSource: 'ovst + bill_transaction (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 3%',
                            benchmark: 'สปสช.: ≤5% | HA: ≤3%',
                            aiTip: dropout <= 3 ? 'Dropout ต่ำ ผู้ป่วยพึงพอใจ' : 'สูง — ลดเวลารอจะลด Dropout',
                        },
                    ]} />
                );
            })()}

            {/* ━━━━ 🚀 AI Strategic Intelligence Feed (Hero Strip) ━━━━ */}
            {!loading.opdToday && opd && (
                <div style={{
                    display: 'flex', gap: '12px', marginBottom: '1rem', marginTop: '0.75rem',
                    overflowX: 'auto', paddingBottom: '4px'
                }}>
                    <div className="glass-card" style={{
                        flex: '1 1 300px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px',
                        borderLeft: `4px solid ${aiAnalytics.urgencyColor}`, background: `${aiAnalytics.urgencyColor}05`
                    }}>
                        <div style={{ fontSize: '28px' }}>🤖</div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Executive Intelligence</p>
                            <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{aiAnalytics.problems[0]?.title || 'ระบบทำงานปกติ'}</p>
                            <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>Urgency: {aiAnalytics.urgencyLabel} ({aiAnalytics.urgencyScore}/10)</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{
                        flex: '0 0 200px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                        borderLeft: `4px solid #10b981`, background: 'rgba(16,185,129,.05)'
                    }}>
                        <div style={{ fontSize: '24px' }}>📈</div>
                        <div>
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Forecast (Next Hour)</p>
                            <p style={{ margin: '2px 0 0', fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{aiAnalytics.forecast.intensity} Load</p>
                            <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Peak at {aiAnalytics.forecast.nextPeak}</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{
                        flex: '0 0 240px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                        borderLeft: `4px solid ${aiAnalytics.staffing.color}`, background: `${aiAnalytics.staffing.color}05`
                    }}>
                        <div style={{ fontSize: '24px' }}>👥</div>
                        <div>
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: aiAnalytics.staffing.color, textTransform: 'uppercase' }}>Staffing Recommendation</p>
                            <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{aiAnalytics.staffing.recommend}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ━━━━ 🔥 AI Optimizer & Flow Prediction (LIVE) ━━━━ */}
            {(state.opdWaitOptimizer || state.opdFlowPrediction) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    {/* Wait Optimizer */}
                    {state.opdWaitOptimizer && (
                        <div className="glass-card" style={{ padding: '1.25rem', borderTop: '4px solid #f43f5e' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>⏱️</span> Wait Time Optimizer
                                </h4>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,.1)', padding: '2px 8px', borderRadius: '99px' }}>AI Powered</span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1, background: 'rgba(244,63,94,.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(244,63,94,.1)' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', marginBottom: '4px' }}>Avg Total Wait</p>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#f43f5e', lineHeight: 1 }}>{state.opdWaitOptimizer.overall?.avg_total_minutes} <span style={{ fontSize: '12px', fontWeight: 700 }}>min</span></p>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(245,158,11,.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(245,158,11,.1)' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '4px' }}>Primary Bottleneck</p>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#f59e0b', lineHeight: 1.2 }}>{state.opdWaitOptimizer.overall?.primary_bottleneck?.name_th}</p>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#f59e0b', marginTop: '4px' }}>รอนาน {state.opdWaitOptimizer.overall?.primary_bottleneck?.avg_minutes} นาที</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {state.opdWaitOptimizer.recommendations?.slice(0, 3).map((rec, i) => (
                                    <div key={i} style={{ padding: '8px 12px', background: 'rgba(124,58,237,.05)', borderRadius: '8px', borderLeft: '3px solid #7c3aed' }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#7c3aed', marginBottom: '2px' }}>💡 {rec.action}</p>
                                        <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>Target: {rec.target || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Flow Prediction */}
                    {state.opdFlowPrediction && (
                        <div className="glass-card" style={{ padding: '1.25rem', borderTop: '4px solid #10b981' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>🌊</span> Flow Prediction
                                </h4>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,.1)', padding: '2px 8px', borderRadius: '99px' }}>AI Powered</span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1, background: 'rgba(16,185,129,.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(16,185,129,.1)' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '4px' }}>Predicted Volume</p>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>{state.opdFlowPrediction.today_prediction?.predicted_total} <span style={{ fontSize: '12px', fontWeight: 700 }}>ราย</span></p>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(14,165,233,.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(14,165,233,.1)' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', marginBottom: '4px' }}>Surge Status</p>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0ea5e9', lineHeight: 1.2 }}>{state.opdFlowPrediction.today_prediction?.status}</p>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#0ea5e9', marginTop: '4px' }}>Index: {state.opdFlowPrediction.today_prediction?.surge_index}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {state.opdFlowPrediction.recommendations?.slice(0, 3).map((rec, i) => (
                                    <div key={i} style={{ padding: '8px 12px', background: 'rgba(124,58,237,.05)', borderRadius: '8px', borderLeft: '3px solid #7c3aed' }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#7c3aed', marginBottom: '2px' }}>👥 {rec.action}</p>
                                        <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>{rec.reason || `Target: ${rec.target}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ━━━━ 🔥 Deep Root-Cause Analysis ━━━━ */}
            {(() => {
                const sla = opd?.sla_pct || 0;
                const { problems, critCount, warnCount, urgencyScore, urgencyColor, urgencyLabel } = aiAnalytics;

                if (!opd || problems.length === 0) return null;

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🔥 AI Deep Root-Cause & Strategy
                            </span>
                        </div>

                        <div className="glass-card" style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>
                            {/* Problem Stream */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {problems.map((p, i) => (
                                    <div key={i} style={{ borderRadius: '14px', border: `1.5px solid ${p.color}20`, background: `${p.color}04`, overflow: 'hidden' }}>
                                        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${p.color}15`, display: 'flex', alignItems: 'center', gap: '10px', background: `linear-gradient(90deg, ${p.color}10, transparent)` }}>
                                            {p.priority > 0 && <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.priority}</span>}
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{p.title}</span>
                                        </div>
                                        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr)', gap: '12px' }}>
                                            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                                <p style={{ margin: '0 0 6px', fontSize: '9px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔍 Root Cause</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.rootCause}</p>
                                            </div>
                                            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                <p style={{ margin: '0 0 6px', fontSize: '9px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚡ Cascade Effect</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.cascadeEffect}</p>
                                            </div>
                                            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                <p style={{ margin: '0 0 6px', fontSize: '9px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🚀 AI Recommendation</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.fixFirst}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            })()}

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

            {/* ━━━━━━ 📊 Diagnostic Intelligence Grid — AI Driven ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #7c3aed, #0ea5e9)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 Diagnostic Intelligence Dashboard — ประเด็นยุทธศาสตร์
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>AI Powered</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '12px'
                }}>
                    {[
                        { icon: '📐', label: 'Wait Variance (σ)', value: `${opd?.wait_stddev || 0}m`, sub: 'ความเสถียรของงานคิว', color: (opd?.wait_stddev || 0) > 30 ? '#f43f5e' : '#10b981' },
                        { icon: '🤖', label: 'AI Staffing Rec.', value: aiAnalytics.staffing.status, sub: aiAnalytics.staffing.recommendation, color: aiAnalytics.staffing.color },
                        { icon: '�', label: 'Wait Forecast', value: aiAnalytics.forecast.waitTrend, sub: `Next Peak: ${aiAnalytics.forecast.nextPeak}`, color: aiAnalytics.forecast.intensity === 'High' ? '#f43f5e' : '#7c3aed' },
                        { icon: '�🚶', label: 'Dropout Rate', value: `${opd?.dropout_pct || 0}%`, sub: 'ยกเลิกคิว (30 วัน)', color: (opd?.dropout_pct || 0) > 5 ? '#f43f5e' : '#10b981' },
                        { icon: '🎯', label: 'Doctor Yield', value: `${opd?.avg_patients_per_doctor || 0} p/dr`, sub: 'ศักยภาพการตรวจเฉลี่ย', color: '#7c3aed' },
                        { icon: '✅', label: 'Completion Rate', value: `${opd?.completion_rate || 0}%`, sub: 'อัตราการปิดเคสรายวัน', color: (opd?.completion_rate || 0) < 90 ? '#f59e0b' : '#10b981' },
                        { icon: '🔋', label: 'Capacity Util.', value: `${opd?.capacity_utilization || 0}%`, sub: 'การใช้ทรัพยากรสูงสุด', color: (opd?.capacity_utilization || 0) > 100 ? '#f43f5e' : '#0ea5e9' },
                        { icon: '👵', label: 'Elderly Ratio', value: `${opd?.elderly_pct || 0}%`, sub: 'สัดส่วนผู้สูงอายุวันนี้', color: '#8b5cf6' },
                        { icon: '⚡', label: 'Time-to-1st Service', value: `${opd?.wait_steps?.registration_to_screening || 0}m`, sub: 'ลงทะเบียน → คัดกรอง', color: (opd?.wait_steps?.registration_to_screening || 0) > 15 ? '#f43f5e' : '#10b981' },
                        { icon: '💎', label: 'Revenue/Visit', value: `฿${(opd?.revenue_per_visit || 0).toLocaleString()}`, sub: 'รายได้เฉลี่ยต่อ Visit', color: '#10b981' },
                        { icon: '📊', label: 'DPI Score', value: `${opd?.dpi || 0}/100`, sub: 'Performance Index รวม', color: (opd?.dpi || 0) < 70 ? '#f43f5e' : '#10b981' },
                    ].map((k, i) => (
                        <div key={i} style={{
                            padding: '12px 14px', borderRadius: '12px',
                            background: `${k.color}06`, border: `1px solid ${k.color}15`,
                            display: 'flex', alignItems: 'center', gap: '12px'
                        }}>
                            <div style={{ fontSize: '20px', width: '36px', height: '36px', borderRadius: '10px', background: `${k.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{k.icon}</div>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{k.label}</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                                    background: 'var(--md-tooltip-bg, #fff)',
                                    border: '1px solid var(--md-tooltip-border, #e8eaf2)',
                                    borderRadius: '14px',
                                    boxShadow: '0 8px 32px rgba(0,0,0,.10)',
                                    padding: '12px 16px',
                                    fontSize: '12px',
                                }}
                                labelStyle={{ fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '6px', display: 'block', fontSize: '13px' }}
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

            <div>
                {/* Hourly Distribution — Today + Yesterday + AI Prediction */}
                <div className="chart-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0 }}>
                            📊 จำนวนผู้ป่วยรายชั่วโมง <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>({opd?.is_holiday ? 'วันหยุด' : 'วันทำการปกติ'} เวลา {opd?.op_hours || '07.00 - 20.30'} น.)</span>
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
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const d = payload[0].payload;
                                        return (
                                            <div style={{ background: 'var(--md-tooltip-bg, #fff)', border: '1px solid var(--md-tooltip-border, #e8eaf2)', borderRadius: '12px', padding: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.08)' }}>
                                                <p style={{ margin: '0 0 8px', fontWeight: 800, color: 'var(--md-text-primary)', fontSize: '13px', borderBottom: '1px solid var(--md-border)', paddingBottom: '6px' }}>เวลา {label}</p>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                                        <span style={{ color: '#7c3aed', fontWeight: 700 }}>● เสร็จสิ้น:</span>
                                                        <span style={{ fontWeight: 800 }}>{d.completed} ราย</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                                        <span style={{ color: '#f59e0b', fontWeight: 700 }}>● ยังรอ:</span>
                                                        <span style={{ fontWeight: 800 }}>{d.waiting} ราย</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', borderTop: '1px dashed #e2e8f0', paddingTop: '4px' }}>
                                                        <span style={{ color: 'var(--md-text-primary)', fontWeight: 800 }}>รวมวันนี้:</span>
                                                        <span style={{ fontWeight: 800 }}>{d.count} ราย</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                                        <span style={{ color: '#94a3b8', fontWeight: 700 }}>เมื่อวาน:</span>
                                                        <span style={{ fontWeight: 800 }}>{d.yesterday} ราย</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                                        <span style={{ color: '#10b981', fontWeight: 700 }}>AI คาดคะเน:</span>
                                                        <span style={{ fontWeight: 800 }}>{d.prediction} ราย</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            {/* AI Prediction — gradient area */}
                            <Area type="monotone" dataKey="prediction" fill="url(#predGrad)" stroke="#10b981"
                                strokeWidth={2} strokeDasharray="4 4" dot={false} name="prediction" />
                            {/* Yesterday — dashed line */}
                            <Line type="monotone" dataKey="yesterday" stroke="#94a3b8" strokeWidth={1.5}
                                strokeDasharray="6 3" dot={false} name="yesterday" />
                            {/* Today — stacked bars */}
                            <Bar dataKey="completed" stackId="a" fill="#7c3aed" barSize={20} radius={[0, 0, 0, 0]} name="completed" />
                            <Bar dataKey="waiting" stackId="a" fill="#f59e0b" barSize={20} radius={[6, 6, 0, 0]} name="waiting" />
                        </ComposedChart>
                    </ResponsiveContainer>
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

                    // YoY calculation — comparable revenue (same months only)
                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const compMonths = latestYear.comparable_months || 12;
                    const yoyGrowth = prevYear && (prevYear.comparable_revenue ?? prevYear.total_revenue) > 0
                        ? Math.round(((latestYear.comparable_revenue ?? latestYear.total_revenue) - (prevYear.comparable_revenue ?? prevYear.total_revenue)) / (prevYear.comparable_revenue ?? prevYear.total_revenue) * 1000) / 10
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
                                                {(fy.total_revenue).toLocaleString()} บาท
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
                                                        vs {prevYear.fiscal_label} (เทียบ {compMonths} ด.)
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
                                            return [`${Number(v).toLocaleString()} บาท`, label];
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
                                        <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>{(fy.total_revenue).toLocaleString()} บาท</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>


        </div>
    );
}
