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
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';
// Sub-component imports (Sprint 3 decomposition)
import {
    OPDLiveFeed,
    OPDKPICards,
    OPDStaffOnDuty,
    OPDRootCause,
    OPDStrategicDashboard,
    OPDCycleTime,
    OPDHourlyChart,
    OPDRevenue,
} from './opd';

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

// ─── DPI (Department Performance Index) Calculator ───
// Composite score: SLA×30% + WaitScore×25% + ThroughputScore×25% + (100−Dropout)×20%
function computeDPI(opd) {
    if (!opd) return 0;
    const sla = Math.min(opd.sla_pct || 0, 100);
    // WaitScore: 100 when avg_wait=0, 0 when avg_wait>=120
    const waitScore = Math.max(0, Math.min(100, Math.round(100 - ((opd.avg_total_minutes || 0) / 120) * 100)));
    // ThroughputScore: normalised to 0-100  (30 visits/hr = 100)
    const throughputScore = Math.min(100, Math.round(((opd.throughput || 0) / 30) * 100));
    const dropoutScore = Math.max(0, 100 - (opd.dropout_pct || 0));
    return Math.round(sla * 0.30 + waitScore * 0.25 + throughputScore * 0.25 + dropoutScore * 0.20);
}

function OPDTab() {
    const state = useShallowDashboardSelector(s => ({ opdToday: s.opdToday, loading: s.loading, opdMonthlyFiscal: s.opdMonthlyFiscal, opdRevenueFiscal: s.opdRevenueFiscal }));
    const { fetchData } = useDashboardActions();
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

        // Staffing: based on actual on-duty staff vs queue
        const onDutyDoctors = opd.active_doctors_list?.length || 0;
        const onDutyNurses = opd.active_nurses_list?.length || 0;
        const totalOnDuty = onDutyDoctors + onDutyNurses;
        const waitingQueue = opd.still_here_breakdown?.likely_waiting ?? opd.still_here ?? 0;
        // Each doctor can see ~8 patients/hr, each nurse handles ~15/hr
        const currentCapacityPerHr = (onDutyDoctors * 8) + (onDutyNurses * 15);
        const queueHours = currentCapacityPerHr > 0 ? (waitingQueue / currentCapacityPerHr) : 99;
        // Need additional staff only if queue backlog > 2 hours at current rate
        const additionalNeeded = queueHours > 2 ? Math.ceil((waitingQueue - currentCapacityPerHr * 2) / 8) : 0;

        let staffingStatus = 'Optimal';
        let staffingRec = `กำลังพลเพียงพอ (${onDutyDoctors} แพทย์ + ${onDutyNurses} พยาบาล)`;
        let staffingColor = '#10b981';

        if (additionalNeeded > 5 || capacity > 90) {
            staffingStatus = 'Overstrained';
            staffingRec = `🚨 คิวค้าง ${waitingQueue} ราย — แนะนำเพิ่มแพทย์อีก ${Math.min(additionalNeeded, 10)} ท่าน หรือเปิด Fast-track`;
            staffingColor = '#f43f5e';
        } else if (additionalNeeded > 0 || capacity > 75) {
            staffingStatus = 'Tight';
            staffingRec = `⚠️ คิวค้าง ${waitingQueue} ราย — ควรเฝ้าระวังและงดการพักในช่วง 60 นาทีถัดไป`;
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

    // ── Loading & Empty States ──
    if (loading['opdToday']) return <TabLoadingSkeleton />;
    if (!opd) return (
        <EmptyState
            icon="🏥"
            title="ไม่พบข้อมูล OPD"
            description="ไม่สามารถโหลดข้อมูลผู้ป่วยนอกได้ในขณะนี้ กรุณาตรวจสอบการเชื่อมต่อ HOSxP XE"
        />
    );

    return (
        <div
            className="space-y-4 animate-fade-in pb-8"
            role="region"
            aria-label="แผนก OPD — วิเคราะห์ผู้ป่วยนอก"
        >
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
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
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
                                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c3aed', margin: 0 }}>
                                        👥 ผู้รับบริการวันนี้
                                    </p>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                    <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginBottom: '4px' }}>
                                        ปริมาณผู้ป่วยและประชากรศาสตร์
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
                                </div>

                                {/* Gender compact bar */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6' }}>♂ ชาย {male} ({malePct}%)</span>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ec4899' }}>♀ หญิง {female} ({100 - malePct}%)</span>
                                        </div>
                                        <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(236,72,153,.12)', display: 'flex' }}>
                                            <div style={{ width: `${malePct}%`, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                            <div style={{ flex: 1, background: 'linear-gradient(90deg,#f472b6,#ec4899)', borderRadius: '0 99px 99px 0' }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '8.5px', color: 'var(--md-text-tertiary)', lineHeight: 1.4, fontStyle: 'italic' }}>
                                    วิธีคำนวณ: นับรายการจากทะเบียนผู้ป่วยนอก (ovst) เทียบกับยอดรวมของวันก่อนหน้า
                                </div>

                                {/* Operational Insights: Vulnerable groups, P90, and Clinics */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div style={{
                                        padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex', flexDirection: 'column'
                                    }}>
                                        <p style={{ margin: '0', fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            👥 กลุ่มเปราะบาง
                                        </p>
                                        <p style={{ margin: '0 0 8px', fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>
                                            สัดส่วนประชากรผู้รับบริการ
                                        </p>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                            <div>
                                                <span style={{ fontSize: '14px', fontWeight: 900, color: '#f59e0b', display: 'block', lineHeight: 1 }}>{opd?.elderly_pct || 0}%</span>
                                                <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>สูงวัย (60+)</span>
                                            </div>
                                            <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)' }} />
                                            <div>
                                                <span style={{ fontSize: '14px', fontWeight: 900, color: '#0ea5e9', display: 'block', lineHeight: 1 }}>{opd?.child_pct || 0}%</span>
                                                <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>เด็ก ({'<'}15)</span>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '8.5px', color: 'var(--md-text-tertiary)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.3 }}>
                                            วิธีคำนวณ: (จำนวนผู้ป่วยตามกลุ่มอายุ ÷ ผู้ป่วยทั้งหมดวันนี้) × 100
                                        </div>
                                    </div>

                                    <div style={{
                                        padding: '10px 14px', background: 'rgba(124,58,237,0.06)',
                                        borderRadius: '12px', border: '1px solid rgba(124,58,237,0.12)',
                                        display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                            <div>
                                                <p style={{ margin: '0', fontSize: '10px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    ⚡ P90 Wait Time
                                                </p>
                                                <p style={{ margin: '0', fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>
                                                    จุดวิกฤตความล่าช้า (Critical Delay)
                                                </p>
                                            </div>
                                            <span style={{ fontSize: '18px', fontWeight: 900, color: '#7c3aed', lineHeight: 1 }}>
                                                {opd?.p90_wait || '—'} <small style={{ fontSize: '10px', fontWeight: 700 }}>น.</small>
                                            </span>
                                        </div>
                                        <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid rgba(124,58,237,0.1)', fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 500, fontStyle: 'italic' }}>
                                            วิธีคำนวณ: Percentile 90 (ผู้ป่วย 90% ของวันนี้ รอไม่เกินเวลานี้)
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
                    { title: 'ยังรอรับบริการ', value: opd?.still_here_breakdown?.likely_waiting ?? opd?.still_here, icon: '⌛', unit: 'ราย', grad: ['#f59e0b', '#d97706'], glow: 'rgba(245,158,11,.2)', raw_still_here: opd?.still_here },
                    { title: 'เวลารอเฉลี่ย', value: opd?.avg_total_minutes, icon: '⏱️', unit: 'นาที', grad: opd?.avg_total_minutes > 90 ? ['#f43f5e', '#dc2626'] : opd?.avg_total_minutes > 60 ? ['#f59e0b', '#d97706'] : ['#10b981', '#059669'], glow: opd?.avg_total_minutes > 90 ? 'rgba(244,63,94,.2)' : 'rgba(16,185,129,.2)' },
                ].map((kpi, i) => (
                    <div key={i} style={{
                        padding: '1rem 1.25rem', borderRadius: '14px',
                        background: `linear-gradient(135deg, ${kpi.grad[0]}10 0%, ${kpi.grad[1]}05 100%)`,
                        border: `1px solid ${kpi.grad[0]}25`,
                        position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex', flexDirection: 'column', height: '100%'
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
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>
                                        {kpi.title}
                                    </span>
                                    <span style={{ fontSize: '18px' }}>{kpi.icon}</span>
                                </div>
                                {kpi.title === 'กลับบ้านแล้ว' && (
                                    <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginBottom: '8px' }}>
                                        ประสิทธิภาพการบริการ (Throughput)
                                    </div>
                                )}
                                {kpi.title === 'ยังรอรับบริการ' && (() => {
                                    const bd = opd?.still_here_breakdown;
                                    return (
                                        <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginBottom: '8px' }}>
                                            {bd ? (
                                                <>
                                                    <span>น่าจะรออยู่จริง <b style={{ color: '#f59e0b' }}>{bd.likely_waiting}</b></span>
                                                    {bd.likely_gone > 0 && <span> · น่าจะกลับแล้ว <b style={{ color: '#94a3b8' }}>{bd.likely_gone}</b></span>}
                                                    {bd.by_stage && (
                                                        <div style={{ marginTop: '3px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                            {bd.by_stage.wait_registration > 0 && <span>📋 รอคัดกรอง {bd.by_stage.wait_registration}</span>}
                                                            {bd.by_stage.wait_doctor > 0 && <span>🩺 รอแพทย์ {bd.by_stage.wait_doctor}</span>}
                                                            {bd.by_stage.wait_pharmacy > 0 && <span>💊 รอยา {bd.by_stage.wait_pharmacy}</span>}
                                                        </div>
                                                    )}
                                                </>
                                            ) : 'ภาระงานที่คงค้าง (Work-in-Progress)'}
                                        </div>
                                    );
                                })()}
                                {kpi.title === 'เวลารอเฉลี่ย' && (() => {
                                    const steps = opd?.wait_steps;
                                    const medianCycle = opd?.estimated_median_cycle;
                                    // Find bottleneck (longest step)
                                    const stepNames = { registration_to_screening: 'ลงทะเบียน→คัดกรอง', screening_to_doctor: 'คัดกรอง→แพทย์', doctor_to_pharmacy: 'แพทย์→รับยา', pharmacy_to_finance: 'รับยา→ชำระเงิน' };
                                    const bottleneck = steps ? Object.entries(steps).reduce((max, [k, v]) => v > (max?.val || 0) ? { key: k, val: v } : max, { key: '', val: 0 }) : null;
                                    return (
                                        <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginBottom: '8px' }}>
                                            <span>Cycle Time (ลงทะเบียน → กลับบ้าน)</span>
                                            {medianCycle > 0 && <span> · Median ≈ {medianCycle} น.</span>}
                                            {bottleneck?.val > 30 && (
                                                <div style={{ marginTop: '3px', color: '#f43f5e', fontWeight: 700 }}>
                                                    🔴 คอขวด: {stepNames[bottleneck.key] || bottleneck.key} ({bottleneck.val} น.)
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '28px', fontWeight: 900, color: kpi.grad[0], letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {(kpi.value ?? 0).toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>
                                </div>
                                {kpi.title === 'กลับบ้านแล้ว' && (
                                    <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '8.5px', color: 'var(--md-text-tertiary)', lineHeight: 1.4, fontStyle: 'italic' }}>
                                        วิธีคำนวณ: นับผู้ป่วยที่จบกระบวนการ (service7, bill_time หรือลงสถานะแพทย์ให้กลับบ้าน/Admit/ส่งต่อ)
                                    </div>
                                )}
                                {kpi.title === 'ยังรอรับบริการ' && (
                                    <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '8.5px', color: 'var(--md-text-tertiary)', lineHeight: 1.4, fontStyle: 'italic' }}>
                                        วิธีคำนวณ: นับผู้ป่วยที่ยังไม่จบกระบวนการ แยก "น่าจะรออยู่" (มี activity ใน 2 ชม.) vs "น่าจะกลับแล้ว" (ไม่มี activity &gt;2 ชม. + ไม่เคยคัดกรอง)
                                        {kpi.raw_still_here > 0 && kpi.raw_still_here !== kpi.value && (
                                            <span> · ดิบ: {kpi.raw_still_here} ราย</span>
                                        )}
                                    </div>
                                )}
                                {kpi.title === 'เวลารอเฉลี่ย' && (
                                    <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '8.5px', color: 'var(--md-text-tertiary)', lineHeight: 1.4, fontStyle: 'italic' }}>
                                        วิธีคำนวณ: True Cycle Time = AVG(เวลาชำระเงิน − เวลาลงทะเบียน) ต่อราย (เฉพาะผู้ป่วยที่จบกระบวนการ ไม่นับคิวที่ยกเลิก/ไม่รับบริการ)
                                    </div>
                                )}
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
                const dpi = opd.dpi || computeDPI(opd);
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
                                                <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔍 Root Cause</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.rootCause}</p>
                                            </div>
                                            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚡ Cascade Effect</p>
                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.cascadeEffect}</p>
                                            </div>
                                            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🚀 AI Recommendation</p>
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

            {/* ━━━━ 🩺 Active Medical Staff (On-Duty Today) ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', marginTop: '1.5rem' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #5e72e4, #11cdef)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 บุคลากรทางการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(94,114,228,.08)', padding: '2px 8px', borderRadius: '99px' }}>HOSxP Activity Logs</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* ── Active Doctors List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(94,114,228,.05)', borderBottom: '1px solid rgba(94,114,228,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👨‍⚕️</span>
                            <div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#5e72e4', display: 'block' }}>ทีมแพทย์ (OPD)</span>
                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>คัดกรอง: นพ./พญ.</span>
                            </div>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#5e72e4', opacity: 0.8 }}>{opd?.active_doctors_list?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.opdToday ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (opd?.active_doctors_list?.length > 0) ? (
                            opd.active_doctors_list.map((dr, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && dr.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && dr.afternoon_count > 0) ||
                                    (currentHour >= 17 && dr.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', transition: 'background 0.2s', cursor: 'default',
                                        borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(94,114,228,.04)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #5e72e4, #8b5cf6)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            {dr.name?.substring(0, 2).replace('น.', '').replace('พ.', '').trim() || 'D'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dr.name}</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: dr.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{dr.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: dr.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{dr.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: dr.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{dr.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#5e72e4' }}>{dr.total_count}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Nurses List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(17,205,239,.05)', borderBottom: '1px solid rgba(17,205,239,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👩‍⚕️</span>
                            <div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#11cdef', display: 'block' }}>ทีมพยาบาล</span>
                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>พว./พช./นป./พยาบาล</span>
                            </div>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#11cdef', opacity: 0.8 }}>{opd?.active_nurses_list?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.opdToday ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (opd?.active_nurses_list?.length > 0) ? (
                            opd.active_nurses_list.map((nr, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && nr.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && nr.afternoon_count > 0) ||
                                    (currentHour >= 17 && nr.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', transition: 'background 0.2s', cursor: 'default',
                                        borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(17,205,239,.04)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #11cdef, #1171ef)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            {nr.staff_name?.substring(0, 1) || 'N'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nr.staff_name}</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: nr.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{nr.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: nr.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{nr.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: nr.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{nr.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#11cdef' }}>{nr.screen_count}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Staff List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(45,206,137,.05)', borderBottom: '1px solid rgba(45,206,137,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#2dce89', display: 'block' }}>เจ้าหน้าที่อื่นๆ</span>
                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>คัดกรอง/ห้องบัตร/อื่นๆ</span>
                            </div>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#2dce89', opacity: 0.8 }}>{opd?.active_staff_list?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.opdToday ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (opd?.active_staff_list?.length > 0) ? (
                            opd.active_staff_list.map((st, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && st.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && st.afternoon_count > 0) ||
                                    (currentHour >= 17 && st.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', transition: 'background 0.2s', cursor: 'default',
                                        borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(45,206,137,.04)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #2dce89, #2dcecc)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            {st.staff_name?.substring(0, 1) || 'S'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.staff_name}</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#2dce89' }}>{st.screen_count}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ━━━━ Efficiency KPI Strip ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #7c3aed, #5e72e4)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    📊 ตัวชี้วัดประสิทธิภาพ
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.06)', padding: '2px 8px', borderRadius: '99px' }}>Real-time</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {(() => {
                    const slaVal = opd?.sla_pct ?? 0;
                    const maxW = opd?.max_wait ?? 0;
                    const wDoc = opd?.waiting_doctor ?? 0;
                    const thr = opd?.throughput ?? 0;
                    const peakH = opd?.peak_hour ?? -1;
                    const peakCnt = opd?.peak_hour_count ?? 0;
                    const curCnt = opd?.current_hour_count ?? 0;
                    const curHr = new Date().getHours();
                    const isAtPeak = peakH === curHr;
                    const pastPeak = curHr > peakH;
                    return [
                    {
                        title: 'SLA ≤60 นาที', value: `${slaVal}%`, icon: '🎯',
                        grad: slaVal >= 80 ? ['#10b981', '#059669'] : slaVal >= 60 ? ['#f59e0b', '#d97706'] : ['#f43f5e', '#dc2626'],
                        sub: slaVal >= 80 ? '✅ ผ่านเกณฑ์' : slaVal >= 60 ? '⚠️ ใกล้เกณฑ์' : '🔴 ต่ำกว่าเกณฑ์',
                    },
                    {
                        title: 'รอนานที่สุด', value: `${maxW}`, icon: '⚠️', unit: 'นาที',
                        grad: maxW > 180 ? ['#f43f5e', '#dc2626'] : maxW > 120 ? ['#f59e0b', '#d97706'] : ['#0ea5e9', '#0284c7'],
                        sub: maxW > 300 ? `⚠️ ${Math.round(maxW/60)} ชม. — ต้องตรวจสอบ` : 'วันนี้',
                    },
                    {
                        title: 'คิวรอแพทย์', value: `${wDoc}`, icon: '🩺', unit: 'ราย',
                        grad: wDoc > 30 ? ['#f43f5e', '#dc2626'] : wDoc > 15 ? ['#f59e0b', '#d97706'] : ['#10b981', '#059669'],
                        sub: wDoc > 100 ? `🚨 วิกฤต — Est. ${Math.round(wDoc / Math.max(thr / 60, 1))} น.` : wDoc > 30 ? 'คิวยาวมาก' : wDoc > 15 ? 'คิวยาว' : 'ปกติ',
                    },
                    {
                        title: 'Throughput', value: `${thr}`, icon: '⚡', unit: 'ราย/ชม.',
                        grad: thr >= 50 ? ['#10b981', '#059669'] : thr >= 25 ? ['#6366f1', '#4f46e5'] : ['#f59e0b', '#d97706'],
                        sub: thr >= 50 ? '🟢 ดีมาก' : thr >= 25 ? 'อัตราบริการ' : '⚠️ ต่ำ',
                    },
                    {
                        title: 'Peak Hour', value: peakH >= 0 ? `${String(peakH).padStart(2, '0')}:00` : '—', icon: '🕐',
                        grad: isAtPeak ? ['#f43f5e', '#dc2626'] : pastPeak ? ['#10b981', '#059669'] : ['#8b5cf6', '#7c3aed'],
                        sub: isAtPeak ? `⚡ Peak ตอนนี้! (${peakCnt} ราย)` : pastPeak ? `✅ ผ่าน Peak แล้ว · ตอนนี้ ${curCnt} ราย` : `🔜 Peak ${peakCnt} ราย · ตอนนี้ ${curCnt}`,
                    },
                ]; })().map((kpi, i) => (
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
                                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--md-text-tertiary)' }}>
                                        {kpi.title}
                                    </span>
                                    <span style={{ fontSize: '16px' }}>{kpi.icon}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: 900, color: kpi.grad[0], letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {kpi.value}
                                    </span>
                                    {kpi.unit && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>}
                                </div>
                                <p style={{ margin: '3px 0 0', fontSize: '11px', fontWeight: 600, color: kpi.grad[0], opacity: 0.8 }}>{kpi.sub}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ━━━━━━ 📊 แดชบอร์ดวิเคราะห์ประสิทธิภาพเชิงยุทธศาสตร์ ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #7c3aed, #0ea5e9)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 แดชบอร์ดวิเคราะห์ประสิทธิภาพ OPD — ประเด็นยุทธศาสตร์
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>ขับเคลื่อนด้วย AI</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '12px'
                }}>
                    {[
                        { icon: '📐', label: 'ความผันผวนเวลารอ (σ)', value: `${opd?.wait_stddev || 0} นาที`, sub: `ค่าเบี่ยงเบนมาตรฐานของเวลารอ — ${(opd?.wait_stddev || 0) > 30 ? 'ผันผวนสูง' : 'เสถียรดี'}`, color: (opd?.wait_stddev || 0) > 30 ? '#f43f5e' : '#10b981', calc: 'STDDEV(total_wait_minutes)' },

                        { icon: '🤖', label: 'AI แนะนำกำลังคน', value: aiAnalytics.staffing.status === 'Optimal' ? 'เพียงพอ' : aiAnalytics.staffing.status === 'Tight' ? 'ตึงตัว' : aiAnalytics.staffing.status === 'Overstrained' ? 'ขาดแคลน' : aiAnalytics.staffing.status, sub: aiAnalytics.staffing.recommendation, color: aiAnalytics.staffing.color, calc: 'AI Machine Learning Model' },

                        { icon: '📈', label: 'พยากรณ์แนวโน้มรอ', value: aiAnalytics.forecast.waitTrend === 'Increasing' ? 'เพิ่มขึ้น ↑' : aiAnalytics.forecast.waitTrend === 'Improving' ? 'ดีขึ้น ↓' : aiAnalytics.forecast.waitTrend, sub: `พีคถัดไป: ${aiAnalytics.forecast.nextPeak}`, color: aiAnalytics.forecast.intensity === 'High' ? '#f43f5e' : '#7c3aed', calc: 'Time-Series Analysis' },

                        { icon: '🚶', label: 'อัตรายกเลิกคิว', value: `${opd?.dropout_pct || 0}%`, sub: `ผู้ป่วยที่ออกก่อนตรวจเสร็จ (30 วัน)`, color: (opd?.dropout_pct || 0) > 5 ? '#f43f5e' : '#10b981', calc: '(Dropout / Registered) × 100' },

                        { icon: '✅', label: 'อัตราปิดเคสสำเร็จ', value: `${opd?.completion_rate || 0}%`, sub: `ผ่านครบทุกขั้นตอน (ตรวจ→ยา→เงิน)`, color: (opd?.completion_rate || 0) < 90 ? '#f59e0b' : '#10b981', calc: '(Completed / Registered) × 100' },

                        { icon: '🔋', label: 'อัตราใช้ทรัพยากร', value: `${opd?.capacity_utilization || 0}%`, sub: `ความหนาแน่นคนไข้ต่อขีดจำกัดแผนก`, color: (opd?.capacity_utilization || 0) > 100 ? '#f43f5e' : '#0ea5e9', calc: '(Current / Max Capacity) × 100' },

                        { icon: '👵', label: 'สัดส่วนผู้สูงอายุ', value: `${opd?.elderly_pct || 0}%`, sub: `ผู้ป่วยอายุ ≥60 ปี (วันนี้)`, color: '#8b5cf6', calc: '(Age ≥ 60 / Total) × 100' },

                        { icon: '⚡', label: 'เวลาถึงบริการแรก', value: `${opd?.wait_steps?.registration_to_screening || 0} นาที`, sub: `ลงทะเบียน → คัดกรอง (เฉลี่ย)`, color: (opd?.wait_steps?.registration_to_screening || 0) > 15 ? '#f43f5e' : '#10b981', calc: 'AVG(screen_time - reg_time)' },

                        { icon: '💎', label: 'รายได้เฉลี่ยต่อ Visit', value: `${(opd?.avg_revenue_per_visit || 0).toLocaleString()} บาท`, sub: `ค่าบริการเฉลี่ยต่อครั้ง (ค่ายา+ตรวจ)`, color: '#10b981', calc: 'Total Revenue / Total Visists' },

                        { icon: '📊', label: 'ดัชนีประสิทธิภาพ OPD', value: `${opd?.dpi || computeDPI(opd)}/100`, sub: `คะแนน DPI รวม 4 ด้านสำคัญ`, color: (opd?.dpi || computeDPI(opd)) < 70 ? '#f43f5e' : '#10b981', calc: 'SLA 30%+Wait 25%+Thru 25%+Drop 20%' },
                    ].map((k, i) => (
                        <div key={i} style={{
                            padding: '12px 14px', borderRadius: '12px',
                            background: `${k.color}06`, border: `1px solid ${k.color}15`,
                            display: 'flex', flexDirection: 'column', gap: '8px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ fontSize: '20px', width: '36px', height: '36px', borderRadius: '10px', background: `${k.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{k.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{k.label}</p>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600, lineHeight: 1.4 }}>{k.sub}</p>
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid rgba(0,0,0,0.03)', fontSize: '8px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', fontWeight: 500 }}>
                                {k.calc}
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
                            📅 ระยะเวลาบริการรวม (Cycle Time) และ เวลารอเฉลี่ยรายเดือน — ปีงบประมาณ {fiscalData?.fiscal_year_be || ''}
                        </h3>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', marginTop: '3px' }}>
                            ตุลาคม–กันยายน · แยกตามขั้นตอน
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
                        { label: 'ระยะเวลาบริการรวม (เฉลี่ยทั้งปี)', value: fiscalData.benchmark_avg ? `${fiscalData.benchmark_avg} นาที` : '—', color: fiscalData.benchmark_avg > 90 ? '#f43f5e' : '#10b981', icon: '⏱️' },
                        { label: 'เดือนที่นานสุด', value: peakMonth ? `${peakMonth.month} (${peakMonth.avg_total}น.)` : '—', color: '#f59e0b', icon: '📌' },
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
                                        avg_total: '⏱️ ระยะเวลาบริการรวม (Cycle Time)',
                                    };
                                    return [`${value} นาที`, labelMap[name] || name];
                                }}
                                labelFormatter={(label, payload) => {
                                    const d = payload?.[0]?.payload;
                                    return d ? `${label}  ·  ${(d.total_visits || 0).toLocaleString()} ราย` : label;
                                }}
                            />


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
                    {(() => {
                        const ws = opd?.wait_steps || {};
                        const steps = [
                            { key: 'reg', raw: ws.registration_to_screening || 0 },
                            { key: 'screen', raw: ws.screening_to_doctor || 0 },
                            { key: 'doc', raw: ws.doctor_to_pharmacy || 0 },
                            { key: 'rx', raw: ws.pharmacy_to_finance || 0 },
                        ];
                        const rawTotal = steps.reduce((s, st) => s + st.raw, 0);
                        const trueTotal = opd?.avg_total_minutes || rawTotal;
                        // Scale each step proportionally to match True Cycle Time
                        const scale = rawTotal > 0 ? trueTotal / rawTotal : 1;
                        const scaled = steps.map(st => Math.round(st.raw * scale));
                        return [
                        {
                            icon: '📋',
                            label: 'ลงทะเบียน',
                            sublabel: 'เช็คอิน → คัดกรอง',
                            value: scaled[0],
                            color: '#7c3aed',
                            bg: 'rgba(124,58,237,.07)',
                            border: 'rgba(124,58,237,.2)',
                            warn: 15, critical: 30,
                        },
                        {
                            icon: '🔬',
                            label: 'คัดกรอง',
                            sublabel: 'คัดกรอง → พบแพทย์',
                            value: scaled[1],
                            color: '#0ea5e9',
                            bg: 'rgba(14,165,233,.07)',
                            border: 'rgba(14,165,233,.2)',
                            warn: 30, critical: 60,
                        },
                        {
                            icon: '🩺',
                            label: 'ตรวจรักษา',
                            sublabel: 'พบแพทย์ → รับยา',
                            value: scaled[2],
                            color: '#8b5cf6',
                            bg: 'rgba(139,92,246,.07)',
                            border: 'rgba(139,92,246,.2)',
                            warn: 20, critical: 45,
                        },
                        {
                            icon: '💊',
                            label: 'รับยา',
                            sublabel: 'รับยา → ชำระเงิน',
                            value: scaled[3],
                            color: '#10b981',
                            bg: 'rgba(16,185,129,.07)',
                            border: 'rgba(16,185,129,.2)',
                            warn: 20, critical: 40,
                        },
                        {
                            icon: '💳',
                            label: 'ชำระเงิน',
                            sublabel: 'ชำระเงิน → กลับบ้าน',
                            value: ws.pharmacy_to_finance || 0,
                            color: '#f59e0b',
                            bg: 'rgba(245,158,11,.07)',
                            border: 'rgba(245,158,11,.2)',
                            warn: 10, critical: 20,
                        },
                    ]; })().map((step, i, arr) => {
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
                            📊 จำนวนผู้ป่วยรายชั่วโมง <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>({opd?.is_holiday ? 'วันหยุดและนักขัตฤกษ์' : 'วันทำการปกติ'} เวลา {opd?.op_hours || (opd?.is_holiday ? '07:00 - 12:00' : '07:00 - 20:30')} น.)</span>
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 600 }}>
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
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>vn_stat · HOSxP XE</span>
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
                                                <span style={{ fontSize: '11px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    {fy.fiscal_label}
                                                </span>
                                                {isLatest && (
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '22px', fontWeight: 900, color, margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                                                {(fy.total_revenue).toLocaleString()} บาท
                                            </p>
                                            <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 600 }}>
                                                {fy.total_visits.toLocaleString()} visits · {fy.total_patients.toLocaleString()} patients · ฿{fy.avg_revenue_per_visit.toLocaleString()}/visit
                                            </p>
                                            {isLatest && prevYear && (
                                                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                                                        {yoyGrowth >= 0 ? '📈' : '📉'} YoY {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth}%
                                                    </span>
                                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
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

export default React.memo(OPDTab);
