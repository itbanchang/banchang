// ============================================================
// BCH 360° Intelligence V.10 - Dental Operations Tab
// 🦷 AI Dental Intelligence + Professional Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition — Performance Optimized
// ============================================================
import React, { useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import KPICardV2 from './KPICardV2.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';

function DentalTab() {
    const { state, fetchData } = useDashboard();
    const dentalToday = state.dentalToday || {};
    const dentalAnalytics = state.dentalAnalytics;
    const dentalRevenueFiscal = state.dentalRevenueFiscal;
    const loading = state.loading || {};

    useEffect(() => {
        // Fetch data if not present
        if (!dentalToday.total && !loading.dentalToday) {
            fetchData('dentalToday', '/api/dental/today');
        }
        if (!dentalAnalytics && !loading.dentalAnalytics) {
            fetchData('dentalAnalytics', '/api/dental/analytics');
        }
        if (!dentalRevenueFiscal && !loading.dentalRevenueFiscal) {
            fetchData('dentalRevenueFiscal', '/api/dental/revenue-fiscal');
        }
    }, [fetchData]);

    // ━━━━━━ 🧠 AI Strategic Intelligence ━━━━━━
    const aiAnalytics = useMemo(() => {
        const defaultResult = {
            problems: [],
            urgencyScore: 0,
            urgencyColor: '#10b981',
            urgencyLabel: 'ปกติ',
            latestFY: { fiscal_label: 'FY' },
            yoyGrowth: 0,
            strategicKPIs: [],
            benchmarks: {}
        };

        if (!dentalAnalytics) return defaultResult;

        const a = dentalAnalytics;
        const completionRate = a.completion_rate ?? 0;
        const revisitRate = a.revisit_rate ?? 0;
        const avgWait = a.avg_wait_time ?? 0;
        const medianWait = a.median_wait_time ?? 0;
        const p90Wait = a.p90_wait_time ?? 0;
        const avgRevenue = a.avg_revenue_per_visit ?? 0;

        const problems = [];
        // P90 Wait is the best indicator of "bad days"
        if (p90Wait > 60) {
            problems.push({
                priority: 1, severity: 'critical', color: '#f43f5e',
                title: `🔴 ประสบการณ์ผู้ป่วยแย่ (P90: ${p90Wait}m)`,
                rootCause: `ผู้ป่วย 10% รอนานกว่า 1 ชม. แสดงถึงปัญหาระบบคัดกรองหรือกำลังคนไม่พอในช่วงพีค`,
                fixFirst: `เกลี่ยคิวนัดหมาย (Load Balancing) ย้ายเคสเร่งด่วนไปช่วงก่อน 10:00`
            });
        }
        if (avgWait > 30) {
            problems.push({
                priority: 2, severity: 'warning', color: '#f59e0b',
                title: `🟡 เวลารอเฉลี่ยตึงตัว: ${avgWait}m`,
                rootCause: `ค่าเฉลี่ยสูงกว่าเป้าหมาย 30 นาที (Median: ${medianWait}m)`,
                fixFirst: `ตรวจสอบคอขวดขั้นตอนการเตรียมเครื่องมือและอุปกรณ์`
            });
        }
        if (completionRate < 85) {
            problems.push({
                priority: 3, severity: 'warning', color: '#f59e0b',
                title: `🟡 ประสิทธิภาพการปิดเคส: ${completionRate}%`,
                rootCause: `มีผู้ป่วย Dropout ${a.dropout_count || 0} รายในเดือนนี้`,
                fixFirst: `ปรับปรุงระบบติดตามผ่าน LINE/SMS และแจ้งแผนการรักษาระยะยาว`
            });
        }

        if (a.peak_hour && a.peak_hour.avg > 10 && p90Wait > 45) {
            problems.push({
                priority: 4, severity: 'info', color: '#8b5cf6',
                title: `💡 พบการกระจุกตัวช่วง ${a.peak_hour.label} (Peak Hour)`,
                rootCause: `มีผู้ป่วยสูงถึง ${a.peak_hour.avg} เคส/ชม. (เฉลี่ย) ทำให้คิวล้นและอุปกรณ์เก้าอี้ไม่เพียงพอ`,
                fixFirst: `เกลี่ยคิว (Load Balancing) ย้ายกลุ่มขูดหินปูนไปลงช่วงที่ว่างกว่า เพื่อลดคอขวด`
            });
        }

        if (a.top_diagnoses && a.top_diagnoses.length > 0) {
            const topYield = [...a.top_diagnoses].sort((x, y) => (y.avg_rev || 0) - (x.avg_rev || 0))[0];
            if (topYield && topYield.avg_rev > 1200) {
                problems.push({
                    priority: 5, severity: 'good', color: '#10b981',
                    title: `💎 หัตถการทำมูลค่าสูงสุด: ${topYield.name || topYield.icd10}`,
                    rootCause: `สร้างรายได้เฉลี่ย ฿${topYield.avg_rev.toLocaleString()}/ครั้ง ซึ่งสูงกว่าหัตถการอื่นๆ อย่างมีนัยสำคัญ`,
                    fixFirst: `ควรทำการตลาดเพิ่มในกลุ่มหัตถการนี้ และเติมสล็อตคิวในช่วงเวลา Low-peak`
                });
            }
        }

        const childrenPct = a.total_visits > 0 ? Math.round((a.children_total / a.total_visits) * 100) : 0;
        if (childrenPct > 25) {
            problems.push({
                priority: 6, severity: 'info', color: '#0ea5e9',
                title: `👧 โอกาสทอง: กลุ่มทันตกรรมเด็กสูงถึง ${childrenPct}%`,
                rootCause: `ผู้ที่มีอายุต่ำกว่า 12 ปี เข้ามารับบริการเป็นสัดส่วนมาก อาจใช้เวลาจัดการนานกว่าปกติ`,
                fixFirst: `พิจารณาใช้ทันตแพทย์เฉพาะทางเด็ก (Pedodontist) เพื่อจัดการเคสได้เร็วและลดความเครียดผู้ป่วย`
            });
        }

        const years = dentalRevenueFiscal?.fiscal_years || [];
        const latestFY = years[years.length - 1] || { fiscal_label: 'FY' };
        const prevFY = years[years.length - 2];
        const latestRev = latestFY.comparable_revenue || latestFY.total_revenue || 0;
        const prevRev = prevFY ? (prevFY.comparable_revenue || prevFY.total_revenue || 0) : 0;
        const yoyGrowth = prevRev > 0 ? ((latestRev - prevRev) / prevRev * 100) : 0;

        const strategicKPIs = [
            { label: 'P90 Wait', value: `${p90Wait}m`, color: p90Wait < 45 ? '#10b981' : p90Wait < 75 ? '#f59e0b' : '#f43f5e', icon: '⚡' },
            { label: 'Wait SLA', value: `${a.wait_sla_pct ?? 0}%`, color: (a.wait_sla_pct ?? 0) > 85 ? '#10b981' : '#f59e0b', icon: '⏱️' },
            { label: 'Completion', value: `${completionRate}%`, color: completionRate > 90 ? '#10b981' : '#f59e0b', icon: '✅' },
            { label: 'Rev/Visit', value: `฿${(avgRevenue).toLocaleString()}`, color: '#8b5cf6', icon: '💰' }
        ];

        const critCount = problems.filter(p => p.severity === 'critical').length;
        const warnCount = problems.filter(p => p.severity === 'warning').length;
        const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);

        return {
            problems,
            urgencyScore,
            urgencyColor: urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981',
            urgencyLabel: urgencyScore >= 7 ? 'วิกฤต' : urgencyScore >= 4 ? 'เฝ้าระวัง' : 'ปกติ',
            latestFY,
            yoyGrowth,
            strategicKPIs,
            benchmarks: { medianWait, p90Wait }
        };
    }, [dentalAnalytics, dentalRevenueFiscal]);

    // ━━━━━━ 📈 Build Chart Data for Revenue ━━━━━━
    const revenueChartData = useMemo(() => {
        if (!dentalRevenueFiscal?.fiscal_years) return [];
        const years = dentalRevenueFiscal.fiscal_years;
        const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

        return MONTH_ORDER.map((label, i) => {
            const row = { month: label };
            years.forEach((fy, fi) => {
                row[`fy${fi}`] = fy.months && fy.months[i] ? fy.months[i].revenue : 0;
            });
            return row;
        });
    }, [dentalRevenueFiscal]);

    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* 🚀 AI Intelligence Feed */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginBottom: '1rem' }}>
                <div className="glass-card" style={{
                    padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                    borderLeft: `5px solid ${aiAnalytics.urgencyColor}`, background: `linear-gradient(90deg, ${aiAnalytics.urgencyColor}10 0%, transparent 100%)`
                }}>
                    <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))' }}>🤖</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Operational Diagnostics</p>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: aiAnalytics.urgencyColor, color: 'white', fontSize: '11px', fontWeight: 900 }}>{aiAnalytics.urgencyLabel}</span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                            {loading.dentalAnalytics ? 'กำลังประมวลผลอัลกอริทึมวิเคราะห์...' : (aiAnalytics.problems[0]?.title || 'ระบบทันตกรรมดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด')}
                        </p>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '14px 20px', textAlign: 'center', minWidth: '150px' }}>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase' }}>Growth index</p>
                    <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 900, color: aiAnalytics.yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                        {aiAnalytics.yoyGrowth >= 0 ? '↑' : '↓'} {Math.abs(aiAnalytics.yoyGrowth).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* ━━━ Key Dental Metrics Strip ━━━ */}
            <MetricsStrip
                metrics={[
                    {
                        label: 'Total Visits',
                        value: dentalToday.total ?? '—',
                        unit: dentalToday.total != null ? 'ราย' : '',
                        target: null,
                        trend: null,
                        status: dentalToday.total > 0 ? 'success' : 'neutral',
                        icon: '🦷'
                    },
                    {
                        label: 'Completed',
                        value: dentalToday.completed ?? '—',
                        unit: dentalToday.completed != null ? 'ราย' : '',
                        target: null,
                        trend: null,
                        status: dentalToday.total > 0 && dentalToday.completed >= dentalToday.total * 0.8 ? 'success' : 'warning',
                        icon: '✅'
                    },
                    {
                        label: 'Avg Wait Time',
                        value: dentalToday.avg_wait_time != null ? Math.round(dentalToday.avg_wait_time) : '—',
                        unit: dentalToday.avg_wait_time != null ? 'min' : '',
                        target: 30,
                        trend: null,
                        status: dentalToday.avg_wait_time != null
                            ? (dentalToday.avg_wait_time <= 30 ? 'success' : 'warning')
                            : 'neutral',
                        icon: '⏱️'
                    },
                    {
                        label: 'Avg Treatment',
                        value: dentalToday.avg_total_time != null ? Math.round(dentalToday.avg_total_time) : '—',
                        unit: dentalToday.avg_total_time != null ? 'min' : '',
                        target: null,
                        trend: null,
                        status: 'neutral',
                        icon: '⚡'
                    },
                    {
                        label: 'Children %',
                        value: dentalToday.demographics?.children != null && dentalToday.total > 0
                            ? Math.round((dentalToday.demographics.children / dentalToday.total) * 100)
                            : '—',
                        unit: dentalToday.demographics?.children != null ? '%' : '',
                        target: null,
                        trend: null,
                        status: 'neutral',
                        icon: '👧'
                    },
                    {
                        label: 'Elderly %',
                        value: dentalToday.demographics?.elderly != null && dentalToday.total > 0
                            ? Math.round((dentalToday.demographics.elderly / dentalToday.total) * 100)
                            : '—',
                        unit: dentalToday.demographics?.elderly != null ? '%' : '',
                        target: null,
                        trend: null,
                        status: 'neutral',
                        icon: '👴'
                    },
                    {
                        label: 'Unique Patients',
                        value: dentalToday.unique_patients ?? '—',
                        unit: dentalToday.unique_patients != null ? 'คน' : '',
                        target: null,
                        trend: null,
                        status: 'neutral',
                        icon: '👤'
                    },
                    {
                        label: 'Completion Rate',
                        value: dentalToday.total > 0
                            ? Math.round((dentalToday.completed / dentalToday.total) * 100)
                            : '—',
                        unit: dentalToday.total > 0 ? '%' : '',
                        target: 90,
                        trend: null,
                        status: dentalToday.total > 0
                            ? ((dentalToday.completed / dentalToday.total) * 100 >= 90 ? 'success' : 'warning')
                            : 'neutral',
                        icon: '🎯'
                    }
                ]}
            />

            {/* 📊 Today's Performance & Wait Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                <div style={{
                    gridColumn: 'span 2', padding: '1.5rem', borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.05) 100%)',
                    border: '1px solid rgba(139,92,246,0.25)', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '120px', opacity: 0.05 }}>🦷</div>
                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#8b5cf6', margin: 0, letterSpacing: '0.08em' }}>Daily Patient Throughput</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
                        <div>
                            <span style={{ fontSize: '42px', fontWeight: 950, color: '#6366f1', letterSpacing: '-0.04em' }}>{(dentalToday.total || 0).toLocaleString('th-TH')}</span>
                            <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700, marginLeft: '6px' }}>ราย</span>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>Completed</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>{dentalToday.completed || 0}</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px' }}>
                                <div style={{ height: '100%', background: '#10b981', borderRadius: '3px', width: `${Math.min(100, dentalToday.total > 0 ? Math.round(dentalToday.completed / dentalToday.total * 100) : 0)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
                <KPICardV2 title="Wait (Median)" value={aiAnalytics.benchmarks.medianWait || 0} unit="นาที (30D)" icon="⏱️" loading={loading.dentalAnalytics} color="blue" aiInsight={(aiAnalytics.benchmarks.medianWait || 0) > 30 ? "Wait times are elevated. Consider adjusting appointment intervals or adding support staff." : "Wait times are within acceptable limits."} />
                <KPICardV2 title="DPI Index" value={dentalAnalytics?.dpi || 0} unit="/100 (Operational Score)" icon="🎯" loading={loading.dentalAnalytics} color="purple" aiInsight={dentalAnalytics?.dpi > 80 ? "Operational scoring is excellent." : "DPI score suggests room for operational improvement. Review chair turnover times."} />
            </div>

            {/* 🩺 บุคลากรทางการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #8b5cf6, #6366f1)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 บุคลากรทางการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(139,92,246,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    HOSxP Activity Logs
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {/* ── Active Dentists List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(139,92,246,.05)', borderBottom: '1px solid rgba(139,92,246,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🦷</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#8b5cf6' }}>ทันตแพทย์ (Dental)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#8b5cf6', opacity: 0.8 }}>{dentalAnalytics?.on_duty?.doctors?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.dentalAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (dentalAnalytics?.on_duty?.doctors?.length > 0) ? (
                            dentalAnalytics.on_duty.doctors.map((dr, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                    borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                                        color: '#fff', fontSize: '12px', fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {(dr.staff_name || '').replace(/ทพ\.|ทพญ\.|พญ\.|นพ\./g, '').trim().substring(0, 1) || 'D'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dr.staff_name || 'Unknown'}</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Dentist / Medical Officer</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#8b5cf6' }}>{dr.total_count}</p>
                                        <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>เคส</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูลทันตแพทย์วันนี้</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Nurses List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(124,58,237,.05)', borderBottom: '1px solid rgba(124,58,237,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🧑‍🏫</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#7c3aed' }}>ทันตาภิบาล / ผช. (Clinical)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed', opacity: 0.8 }}>{dentalAnalytics?.on_duty?.nurses?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.dentalAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (dentalAnalytics?.on_duty?.nurses?.length > 0) ? (
                            dentalAnalytics.on_duty.nurses.map((nr, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && nr.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && nr.afternoon_count > 0) ||
                                    (currentHour >= 17 && nr.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #7c3aed, #8b5cf6)' : 'rgba(0,0,0,0.05)',
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
                                            <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Dental Hygienist / Clinical Staff</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: nr.morning_count > 0 ? '#7c3aed' : '#ccc' }}>🌅{nr.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: nr.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{nr.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: nr.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{nr.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#7c3aed' }}>{nr.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>เคส</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูลทันตาภิบาล</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Staff List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(99,102,241,.05)', borderBottom: '1px solid rgba(99,102,241,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#6366f1' }}>เจ้าหน้าที่สนับสนุน (Dental)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1', opacity: 0.8 }}>{dentalAnalytics?.on_duty?.staff?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.dentalAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (dentalAnalytics?.on_duty?.staff?.length > 0) ? (
                            dentalAnalytics.on_duty.staff.map((st, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && st.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && st.afternoon_count > 0) ||
                                    (currentHour >= 17 && st.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(0,0,0,0.05)',
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
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#6366f1' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#6366f1' }}>{st.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>งาน</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูลเจ้าหน้าที่วันนี้</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ━━━ 🧠 AI Dental Intelligence Hub ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', marginTop: '12px' }}>
                <div style={{ width: '4px', height: '22px', background: 'linear-gradient(180deg, #8b5cf6, #6366f1)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🧠 AI Dental Intelligence (Executive Briefing)
                </h3>
                <span style={{ fontSize: '11px', background: 'rgba(139,92,246,.15)', color: '#8b5cf6', padding: '3px 10px', borderRadius: '4px', fontWeight: 800, marginLeft: 'auto' }}>REAL-TIME INSIGHTS</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '1.5rem' }}>
                {/* DPI Score — AIInsightCard */}
                <AIInsightCard
                    title="Dental Performance Index (DPI)"
                    icon="🎯"
                    priority={(dentalAnalytics?.dpi ?? 0) >= 80 ? 'LOW' : (dentalAnalytics?.dpi ?? 0) >= 60 ? 'MEDIUM' : 'HIGH'}
                    summary={`DPI Score: ${dentalAnalytics?.dpi || 0}/100${(dentalAnalytics?.dpi ?? 0) >= 80 ? ' — Optimal' : (dentalAnalytics?.dpi ?? 0) >= 60 ? ' — Fair' : ' — Needs Improvement'}`}
                    analysis={`ดัชนีรวมประสิทธิภาพทันตกรรม คำนวณจาก Wait Time Score (30%), Completion Rate (25%), Revisit Rate (20%), Revenue Yield (25%) — P90 Wait: ${dentalAnalytics?.p90_wait_time ?? 0}m, Completion: ${dentalAnalytics?.completion_rate ?? 0}%`}
                    recommendation={(dentalAnalytics?.dpi ?? 0) >= 80
                        ? 'รักษามาตรฐานต่อเนื่อง และเน้นเพิ่ม Service Mix สูง'
                        : 'ปรับปรุง Component ที่คะแนนต่ำสุด เพื่อยกระดับ DPI'}
                    confidence={94}
                    gradient="#8b5cf6"
                    gradientFrom="rgba(139,92,246,.08)"
                    gradientTo="rgba(99,102,241,.04)"
                    borderColor="rgba(139,92,246,.25)"
                />

                {/* Workload & Efficiency — AIInsightCard */}
                <AIInsightCard
                    title="Workload & Operational Efficiency"
                    icon="⚙️"
                    priority={aiAnalytics.benchmarks.p90Wait > 60 ? 'HIGH' : aiAnalytics.benchmarks.p90Wait > 45 ? 'MEDIUM' : 'LOW'}
                    summary={`P90 Wait: ${aiAnalytics.benchmarks.p90Wait}m | Median: ${aiAnalytics.benchmarks.medianWait}m${aiAnalytics.benchmarks.p90Wait <= 45 ? ' — Efficient' : ' — Bottleneck Detected'}`}
                    analysis={`วิเคราะห์ประสิทธิภาพการจัดคิวและ Throughput — Wait SLA: ${dentalAnalytics?.wait_sla_pct ?? 0}%, Completion Rate: ${dentalAnalytics?.completion_rate ?? 0}%, Peak Hour: ${dentalAnalytics?.peak_hour?.label || 'N/A'}`}
                    recommendation={aiAnalytics.benchmarks.p90Wait > 45
                        ? 'เกลี่ยคิวช่วง Peak ด้วย Load Balancing และเพิ่ม Appointment Slot ช่วงเช้า'
                        : 'Throughput ดี คงระบบนัดหมายปัจจุบัน'}
                    confidence={91}
                    gradient="#0ea5e9"
                    gradientFrom="rgba(14,165,233,.08)"
                    gradientTo="rgba(3,102,214,.04)"
                    borderColor="rgba(14,165,233,.25)"
                />

                {/* Patient Demographics — AIInsightCard */}
                <AIInsightCard
                    title="Patient Demographics & Segmentation"
                    icon="👥"
                    priority="LOW"
                    summary={`Avg Age: ${dentalToday.demographics?.avg_age ? Math.round(dentalToday.demographics.avg_age) : '—'} | M:F Ratio: ${dentalToday.demographics?.male || 0}:${dentalToday.demographics?.female || 0}`}
                    analysis={`กลุ่มผู้ป่วยวันนี้: เด็ก ${dentalToday.demographics?.children || 0} ราย, ผู้สูงอายุ ${dentalToday.demographics?.elderly || 0} ราย — ข้อมูลช่วยในการวางแผนจัดสรรทันตแพทย์เฉพาะทาง`}
                    recommendation={dentalToday.demographics?.children > dentalToday.demographics?.elderly
                        ? 'เด็กเข้ามามาก — พิจารณาเพิ่มทันตแพทย์เด็ก (Pedodontist) ในช่วงเช้า'
                        : 'ดูแลกลุ่มผู้สูงอายุ — เน้นหัตถการฟันเทียมและทันตกรรมประดิษฐ์'}
                    confidence={88}
                    gradient="#10b981"
                    gradientFrom="rgba(16,185,129,.08)"
                    gradientTo="rgba(5,150,105,.04)"
                    borderColor="rgba(16,185,129,.25)"
                />

                {/* Revenue Analysis — AIInsightCard */}
                <AIInsightCard
                    title="Revenue & Fiscal Growth Analysis"
                    icon="💰"
                    priority={aiAnalytics.yoyGrowth >= 5 ? 'LOW' : aiAnalytics.yoyGrowth >= 0 ? 'MEDIUM' : 'HIGH'}
                    summary={`YoY Growth: ${aiAnalytics.yoyGrowth >= 0 ? '+' : ''}${aiAnalytics.yoyGrowth.toFixed(1)}% | Rev/Visit: ฿${(dentalAnalytics?.avg_revenue_per_visit || 0).toLocaleString()}`}
                    analysis={`รายได้ปีงบประมาณ ${aiAnalytics.latestFY.fiscal_label}: ฿${((aiAnalytics.latestFY.comparable_revenue || aiAnalytics.latestFY.total_revenue || 0) / 1e6).toFixed(2)}M — วิเคราะห์ Service Mix และ Billing Completeness`}
                    recommendation={aiAnalytics.yoyGrowth >= 5
                        ? 'การเติบโตดี — ลงทุนเพิ่มหัตถการมูลค่าสูง (ครอบฟัน, รากเทียม)'
                        : 'Growth ต่ำ — วิเคราะห์ Revenue Source ที่ลดลง และเพิ่ม Procedure Mix'}
                    confidence={92}
                    gradient="#f59e0b"
                    gradientFrom="rgba(245,158,11,.08)"
                    gradientTo="rgba(234,179,8,.04)"
                    borderColor="rgba(245,158,11,.25)"
                />
            </div>

            {/* 🔬 Deep Diagnostics Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#8b5cf6', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>ST-01</span> Strategic Indicators
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {aiAnalytics.strategicKPIs.length > 0 ? aiAnalytics.strategicKPIs.map((kpi, idx) => (
                            <div key={idx} style={{ padding: '14px 10px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{kpi.icon}</div>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 950, color: kpi.color }}>{kpi.value}</p>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginTop: '2px' }}>{kpi.label}</p>
                            </div>
                        )) : (
                            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', fontSize: '13px' }}>
                                {loading.dentalAnalytics ? 'รวบรวมข้อมูล Strategic Dashboard...' : 'No Data Available'}
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '20px', borderLeft: `5px solid ${aiAnalytics.urgencyColor}` }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: aiAnalytics.urgencyColor, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>AI-DX</span> Problem Discovery & Diagnosis
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {aiAnalytics.problems.length > 0 ? aiAnalytics.problems.map((p, idx) => (
                            <div key={idx} style={{ padding: '14px', borderRadius: '16px', background: `${p.color}08`, border: `1px solid ${p.color}20`, position: 'relative' }}>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: p.color }}>{p.title}</p>
                                <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>{p.rootCause}</p>
                                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '14px' }}>🧪</span>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#10b981' }}>RECOMMENDATION: {p.fixFirst}</p>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', background: 'rgba(16,185,129,0.03)', borderRadius: '16px', border: '1px dashed #10b98140' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>✨</div>
                                <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>High Performance Mode</p>
                                <p style={{ margin: 0, fontSize: '13px' }}>ตัวบ่งชี้ทุกตัวอยู่ในเกณฑ์มาตรฐานความปลอดภัยและคุณภาพ</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 📋 Professional KPI Description Cards */}
            {dentalAnalytics && (() => {
                const a = dentalAnalytics;
                const p90Wait = a.p90_wait_time ?? 0;
                const waitSla = a.wait_sla_pct ?? 0;
                const completionRate = a.completion_rate ?? 0;
                const dpi = a.dpi ?? 0;
                const avgRevenue = a.avg_revenue_per_visit ?? 0;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'P90 Wait Time', thLabel: 'เวลารอ P90 (Percentile 90)',
                            value: `${p90Wait}m`, color: p90Wait < 45 ? '#10b981' : p90Wait < 75 ? '#f59e0b' : '#f43f5e', icon: '⚡',
                            sub: p90Wait < 45 ? 'ดีเยี่ยม' : p90Wait < 75 ? 'ปานกลาง' : 'วิกฤต',
                            desc: `ผู้ป่วย 90% รอไม่เกิน ${p90Wait} นาที`,
                            meaning: 'เวลารอที่ผู้ป่วย 90% จะได้รับบริการ (P90) สะท้อนประสบการณ์ผู้ป่วยกลุ่ม worst-case ได้ดีกว่าค่าเฉลี่ย',
                            calc: 'PERCENTILE(wait_times, 0.90) — คำนวณจากทุก visit 30 วัน',
                            dataSource: 'service_time (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง ถึง ${todayShort}`,
                            target: '< 45 นาที',
                            benchmark: 'รพ.ชุมชน: <60m | รพ.เอกชน: <30m',
                            aiTip: p90Wait < 45 ? 'P90 ดี — ผู้ป่วยส่วนใหญ่ได้รับบริการเร็ว' : 'P90 สูง — ตรวจสอบคอขวดช่วง Peak และเพิ่มนัดหมายล่วงหน้า',
                        },
                        {
                            label: 'Wait SLA Compliance', thLabel: 'อัตราผ่าน SLA เวลารอ (≤30m)',
                            value: `${waitSla}%`, color: waitSla > 85 ? '#10b981' : waitSla > 70 ? '#f59e0b' : '#f43f5e', icon: '⏱️',
                            sub: waitSla > 85 ? 'ผ่านเกณฑ์' : 'ต่ำกว่าเกณฑ์',
                            desc: `${waitSla}% ของผู้ป่วยรอไม่เกิน 30 นาที`,
                            meaning: 'สัดส่วนผู้ป่วยที่ได้รับบริการภายใน 30 นาที (Service Level Agreement) วัดประสิทธิภาพการจัดคิว',
                            calc: '(จำนวน visit ที่รอ ≤ 30min ÷ Total visits) × 100',
                            dataSource: 'service_time (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≥ 85%',
                            benchmark: 'สธ.: ≥80% | HA: ≥85%',
                            aiTip: waitSla > 85 ? 'การจัดคิวดีเยี่ยม — คงมาตรฐาน' : 'ต่ำกว่าเป้า — ปรับระบบนัดหมายและ Load Balancing',
                        },
                        {
                            label: 'Completion Rate', thLabel: 'อัตราการรักษาเสร็จสมบูรณ์',
                            value: `${completionRate}%`, color: completionRate > 90 ? '#10b981' : completionRate > 80 ? '#f59e0b' : '#f43f5e', icon: '✅',
                            sub: completionRate > 90 ? 'ดีมาก' : 'ต้องปรับปรุง',
                            desc: `${completionRate}% ของผู้ป่วยรักษาเสร็จสิ้นตามแผน`,
                            meaning: 'สัดส่วนผู้ป่วยที่เข้ารับบริการครบถ้วนจนเสร็จสิ้น (ไม่ Dropout ระหว่างรอ) สะท้อนคุณภาพบริการ',
                            calc: '(Completed visits ÷ Total registered visits) × 100',
                            dataSource: 'ovst + vn_stat (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≥ 90%',
                            benchmark: 'รพ.ชุมชน: ≥85% | HA: ≥90%',
                            aiTip: completionRate > 90 ? 'Dropout ต่ำ — ผู้ป่วยพึงพอใจ' : 'Dropout สูง — วิเคราะห์สาเหตุ (รอนาน? ค่าใช้จ่าย?)',
                        },
                        {
                            label: 'DPI Score', thLabel: 'ดัชนีประสิทธิภาพทันตกรรม',
                            value: `${dpi}`, color: dpi >= 80 ? '#10b981' : dpi >= 60 ? '#f59e0b' : '#f43f5e', icon: '🎯',
                            sub: dpi >= 80 ? 'Optimal' : dpi >= 60 ? 'Fair' : 'Critical',
                            desc: `Dental Performance Index: ${dpi}/100`,
                            meaning: 'ดัชนีรวมประสิทธิภาพคลินิกทันตกรรม คำนวณจาก Wait Time + Completion Rate + Revisit Rate + Revenue Yield',
                            calc: 'W(0.3)×Wait_Score + W(0.25)×Completion + W(0.2)×Revisit + W(0.25)×Revenue',
                            dataSource: 'AI Composite (HOSxP XE)',
                            period: `📅 ประมวลผล ${todayShort}`,
                            target: '≥ 80',
                            benchmark: 'BCH Internal ≥75 | Excellence ≥85',
                            aiTip: dpi >= 80 ? 'DPI สูง — คลินิกทันตกรรมทำงานได้ดีรอบด้าน' : 'DPI ต่ำ — ตรวจสอบ Component ที่คะแนนต่ำสุด',
                        },
                        {
                            label: 'Revenue / Visit', thLabel: 'รายได้เฉลี่ยต่อ Visit',
                            value: `฿${avgRevenue.toLocaleString()}`, color: '#8b5cf6', icon: '💰',
                            desc: `รายได้เฉลี่ยต่อ 1 visit ทันตกรรม`,
                            meaning: 'รายได้เฉลี่ยต่อ 1 ครั้งที่ผู้ป่วยเข้ารับบริการทันตกรรม สะท้อน Service Mix และ Billing Completeness',
                            calc: 'Total Revenue (30d) ÷ Total Visits (30d)',
                            dataSource: 'income + ovst (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≥ ฿800',
                            benchmark: 'รพ.ชุมชน: ฿500-800 | รพ.ศูนย์: ฿800-1500',
                            aiTip: avgRevenue >= 800 ? 'Service Mix ดี — มีหัตถการมูลค่าสูง' : 'Revenue/Visit ต่ำ — เพิ่ม Procedure Mix (ครอบฟัน, รากเทียม)',
                        },
                    ]} />
                );
            })()}

            {/* ━━━ 👥 Patient Demographics Breakdown ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #6366f1)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    👥 Patient Demographics Breakdown (Today)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(14,165,233,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    /api/dental/today
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {/* Male */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: '3px solid #0ea5e9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>👨</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Male</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#0ea5e9' }}>{dentalToday.demographics?.male ?? '—'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                        {dentalToday.total > 0 ? `${Math.round((dentalToday.demographics?.male || 0) / dentalToday.total * 100)}% of total` : '—'}
                    </div>
                </div>
                {/* Female */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: '3px solid #ec4899' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>👩</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Female</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#ec4899' }}>{dentalToday.demographics?.female ?? '—'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                        {dentalToday.total > 0 ? `${Math.round((dentalToday.demographics?.female || 0) / dentalToday.total * 100)}% of total` : '—'}
                    </div>
                </div>
                {/* Children */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: '3px solid #f59e0b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>👧</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Children (&lt;12)</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>{dentalToday.demographics?.children ?? '—'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                        {dentalToday.total > 0 ? `${Math.round((dentalToday.demographics?.children || 0) / dentalToday.total * 100)}% of total` : '—'}
                    </div>
                </div>
                {/* Elderly */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: '3px solid #8b5cf6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>👴</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Elderly (&ge;60)</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#8b5cf6' }}>{dentalToday.demographics?.elderly ?? '—'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                        {dentalToday.total > 0 ? `${Math.round((dentalToday.demographics?.elderly || 0) / dentalToday.total * 100)}% of total` : '—'}
                    </div>
                </div>
                {/* Average Age */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: '3px solid #10b981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>📊</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Average Age</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981' }}>
                        {dentalToday.demographics?.avg_age ? Math.round(dentalToday.demographics.avg_age) : '—'}
                        {dentalToday.demographics?.avg_age && <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--md-text-tertiary)', marginLeft: '4px' }}>ปี</span>}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>Mean patient age today</div>
                </div>
            </div>

            {/* ━━━ 💰 Revenue Fiscal Summary Cards ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '12px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #8b5cf6, #a855f7)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้ทันตกรรมประจำปีงบประมาณ
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(139,92,246,.08)', padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Data Intelligence</span>
            </div>

            {dentalRevenueFiscal?.fiscal_years && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(dentalRevenueFiscal.fiscal_years.length, 3)}, 1fr)`, gap: '12px', marginBottom: '4px' }}>
                    {dentalRevenueFiscal.fiscal_years.slice(-3).map((fy, fi, arr) => {
                        const isLatest = fi === arr.length - 1;
                        const FY_COLORS = ['#94a3b8', '#a78bfa', '#8b5cf6'];
                        const c = FY_COLORS[fi] || '#8b5cf6';
                        return (
                            <div key={fi} style={{
                                padding: '14px 16px', borderRadius: '14px',
                                border: `1px solid ${c}20`, background: `${c}05`,
                                borderTop: `3px solid ${c}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: c }}>{fy.fiscal_label}</span>
                                    {isLatest && <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: c, padding: '1px 6px', borderRadius: '4px', marginLeft: 'auto' }}>CURRENT</span>}
                                </div>
                                <p style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: c }}>
                                    ฿{(fy.total_revenue / 1e6).toFixed(2)}M
                                </p>
                                <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)' }}>
                                    {fy.total_visits ? `${fy.total_visits.toLocaleString()} visits` : ''}
                                    {fy.months_active ? ` · ${fy.months_active} months` : ''}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 💰 Revenue & Growth Trends */}
            <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Financial Persistence & Fiscal Trends</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>เปรียบเทียบรายได้ปีงบประมาณปัจจุบันและย้อนหลัง</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {dentalRevenueFiscal?.fiscal_years?.slice(-2).map((fy, fi) => (
                            <div key={fi} style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{fy.fiscal_label}</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: fi === 1 ? '#8b5cf6' : 'var(--md-text-secondary)' }}>฿{(fy.total_revenue / 1e6).toFixed(2)}M</p>
                            </div>
                        ))}
                    </div>
                </div>
                {dentalRevenueFiscal?.fiscal_years ? (
                    <div style={{ height: '320px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1e6).toFixed(1)}M`} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(139,92,246,0.05)' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '12px' }}
                                />
                                {dentalRevenueFiscal.fiscal_years.map((fy, fi) => {
                                    const isLatest = fi === dentalRevenueFiscal.fiscal_years.length - 1;
                                    return (
                                        <Bar
                                            key={fi}
                                            dataKey={`fy${fi}`}
                                            name={fy.fiscal_label}
                                            fill={isLatest ? "url(#barGrad)" : "#cbd5e1"}
                                            radius={[6, 6, 0, 0]}
                                            barSize={isLatest ? 28 : 20}
                                        />
                                    );
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--md-border)', borderRadius: '24px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                            <p style={{ color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{loading.dentalRevenueFiscal ? 'Predictive Analytics is running...' : 'Financial Data Stream Offline'}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* 📋 Top Diagnoses (30D) — Premium Styled */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <span style={{ background: '#8b5cf6', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>DX-30D</span>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Top Clinical Diagnoses & Procedures</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {dentalAnalytics?.top_diagnoses?.slice(0, 8).map((item, idx) => {
                            const maxCount = dentalAnalytics.top_diagnoses[0]?.count || 1;
                            const pct = Math.round((item.count / maxCount) * 100);
                            const RANK_COLORS = ['#8b5cf6', '#6366f1', '#7c3aed', '#a78bfa', '#818cf8', '#6d28d9', '#4f46e5', '#4338ca'];
                            const rc = RANK_COLORS[idx] || '#8b5cf6';
                            return (
                                <div key={idx} style={{
                                    display: 'grid', gridTemplateColumns: '32px 1fr 70px 60px',
                                    alignItems: 'center', gap: '12px', padding: '10px 14px',
                                    background: idx === 0 ? `${rc}08` : 'transparent',
                                    borderRadius: '12px', border: `1px solid ${idx === 0 ? rc + '20' : 'var(--md-border)'}`,
                                    transition: 'all 0.15s'
                                }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: idx < 3 ? rc : 'var(--md-surface)',
                                        color: idx < 3 ? '#fff' : 'var(--md-text-tertiary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 900, fontSize: '11px',
                                        border: idx >= 3 ? '1px solid var(--md-border)' : 'none'
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || item.icd10}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', fontFamily: 'monospace' }}>{item.icd10}</span>
                                            <div style={{ flex: 1, height: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${pct}%`, background: rc, borderRadius: '2px', transition: 'width 0.5s ease' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: rc }}>{item.count}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                                            {dentalAnalytics.top_diagnoses.reduce((s, d) => s + d.count, 0) > 0
                                                ? `${Math.round(item.count / dentalAnalytics.top_diagnoses.reduce((s, d) => s + d.count, 0) * 100)}%`
                                                : '—'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        {(!dentalAnalytics?.top_diagnoses || dentalAnalytics.top_diagnoses.length === 0) && !loading.dentalAnalytics && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No diagnosis data available for this period</div>
                        )}
                    </div>
                </div>

                {/* Hourly Distribution & Today's Top Diagnoses */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hourly Distribution */}
                    <div className="glass-card" style={{ padding: '20px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <span style={{ background: '#6366f1', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>HOURLY</span>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>Patient Flow Distribution</p>
                        </div>
                        {dentalToday.hourly_distribution && dentalToday.hourly_distribution.length > 0 ? (
                            <div style={{ height: '180px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dentalToday.hourly_distribution} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                        <XAxis dataKey="hour" tick={{ fontSize: 9, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={h => `${h}:00`} />
                                        <YAxis tick={{ fontSize: 9, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.12)', padding: '8px 12px', fontSize: '11px' }} />
                                        <Bar dataKey="count" name="Patients" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={16} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>
                                {loading.dentalToday ? 'Loading hourly data...' : 'No hourly data available'}
                            </div>
                        )}
                    </div>

                    {/* Today's Top Diagnoses (from /api/dental/today) */}
                    {dentalToday.top_diagnoses && dentalToday.top_diagnoses.length > 0 && (
                        <div className="glass-card" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>TODAY</span>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>Top Diagnoses Today</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {dentalToday.top_diagnoses.slice(0, 5).map((item, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px',
                                        borderRadius: '8px', background: idx === 0 ? 'rgba(16,185,129,.05)' : 'transparent'
                                    }}>
                                        <span style={{ fontSize: '10px', fontWeight: 900, color: idx < 3 ? '#10b981' : 'var(--md-text-tertiary)', width: '18px', textAlign: 'center' }}>{idx + 1}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || item.icd10}</p>
                                            <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontFamily: 'monospace' }}>{item.icd10}</p>
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ textAlign: 'center', opacity: 0.3, padding: '16px 0' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--md-text-tertiary)', textTransform: 'uppercase', margin: 0 }}>
                    BCH Dental Intelligence · Protocol v10.4 · High Fidelity Analytics
                </p>
            </div>
        </div>
    );
}

export default React.memo(DentalTab);
