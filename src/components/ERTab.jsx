// ============================================================
// BCH 360° Intelligence V.10 - ER Operations Tab
// 🚑 AI Surge + Professional ER Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition
// ============================================================
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import {
    ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, ReferenceLine, Cell, PieChart, Pie, Legend
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';

const TRIAGE_COLORS = {
    1: { name: 'Level 1', color: '#f43f5e', label: 'Resus' },
    2: { name: 'Level 2', color: '#f59e0b', label: 'Emerg' },
    3: { name: 'Level 3', color: '#eab308', label: 'Urgent' },
    4: { name: 'Level 4', color: '#10b981', label: 'Semi' },
    5: { name: 'Level 5', color: '#94a3b8', label: 'Non' }
};

function ERTab() {
    const { state, fetchData } = useDashboard();
    const erSurge = state.erSurge;
    const erTodayPatients = state.erTodayPatients || [];
    const erTriageStats = state.erTriageStats || [];
    const erAnalytics = state.erAnalytics;
    const erResusAlert = state.erResusAlert;
    const erDiversionStatus = state.erDiversionStatus;
    const erDataQuality = state.erDataQuality;
    const erPatientSat = state.erPatientSat;
    const erTrends = state.erTrends;
    const loading = state.loading;

    // Resus banner auto-dismiss after 5 minutes
    const [resusVisible, setResusVisible] = useState(true);
    useEffect(() => {
        if (erResusAlert) {
            setResusVisible(true);
            const t = setTimeout(() => setResusVisible(false), 5 * 60 * 1000);
            return () => clearTimeout(t);
        }
    }, [erResusAlert]);

    useEffect(() => {
        fetchData('erSurge', '/api/ai/er-surge');
        fetchData('erTodayPatients', '/api/er/today-patients');
        fetchData('erTriageStats', '/api/er/triage-stats');
        fetchData('erBottlenecks', '/api/er/flow-bottlenecks');
        fetchData('erAnalytics', '/api/er/analytics');
        fetchData('erRevenueFiscal', '/api/er/revenue-fiscal');
        fetchData('erDiversionStatus', '/api/er/diversion-status');
        fetchData('erDataQuality', '/api/er/data-quality');
        fetchData('erPatientSat', '/api/satisfaction/summary?department=ER&days=30');
        fetchData('erTrends', '/api/er/trends?months=12');
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

    // ━━━━━━ 🧠 AI Strategic Intelligence & Problem Discovery ━━━━━━
    const aiAnalytics = useMemo(() => {
        if (!erAnalytics) return {
            problems: [],
            urgencyScore: 0,
            urgencyColor: '#10b981',
            urgencyLabel: 'ปกติ',
            forecast: { intensity: 'Normal', nextPeak: '—', predicted: 0 },
            staffing: { status: 'Optimal', recommendation: 'Baseline Staffing', color: '#10b981' },
            strategicKPIs: []
        };

        const a = erAnalytics || {};
        const ta = a.today_acuity || {};
        const liveER = erTodayPatients.length;

        const problems = [];
        const avgTimeToDoc = a.avg_time_to_doctor ?? 0;
        const p90TimeToDoc = a.p90_time_to_doctor ?? 0;
        const lwbsRate = a.lwbs_rate ?? 0;
        const returnRate = a.return_visit_rate ?? 0;
        const acuityPct = ta.acuity_pct ?? 0;

        // 1. Time-to-Doctor Stress (P90 is more sensitive)
        if (p90TimeToDoc > 45) {
            const isCritical = p90TimeToDoc > 60;
            problems.push({
                priority: 1, severity: isCritical ? 'critical' : 'warning',
                title: `Extreme Delay for 10% of Patients (P90: ${p90TimeToDoc}m)`,
                rootCause: `ผู้ป่วย 10% รอนานผิดปกติ แสดงถึงปัญหาระบบ Triage หรือการขาดแคลนแพทย์ในช่วงพีค`,
                cascadeEffect: `เพิ่มสถิติ LWBS และความเสี่ยงผู้ป่วย Deteriorate โดยไม่ได้รับการเฝ้าระวัง`,
                fixFirst: `เปิด Fast-track lane ทันที และตรวจสอบรายชื่อผู้ป่วยที่รอนานเกิน 45 นาที`,
                color: isCritical ? '#f43f5e' : '#f59e0b',
            });
        }

        if (avgTimeToDoc > 15 && p90TimeToDoc <= 45) {
            problems.push({
                priority: 2, severity: 'warning',
                title: `เฉลี่ยรอตรวจตึงตัว: ${avgTimeToDoc} min`,
                rootCause: `ค่าเฉลี่ยเริ่มแตะเป้าหมาย 15 นาที (Today Load: ${ta.total || 0} ราย)`,
                fixFirst: `ตรวจสอบ Boarding patients และเร่งการจำหน่ายหรือ Admit เพื่อเคลียร์พื้นที่`,
                color: '#f59e0b',
            });
        }

        // 2. LWBS Rate
        if (lwbsRate > 2) {
            const isCritical = lwbsRate > 5;
            problems.push({
                priority: 3, severity: isCritical ? 'critical' : 'warning',
                title: `LWBS Rate ${lwbsRate}% — ผู้ป่วยออกก่อนพบแพทย์สูง`,
                rootCause: `Wait time ที่ยาวนาน ทำให้ผู้ป่วยตัดสินใจกลับบ้านก่อนได้รับการประเมินจากแพทย์`,
                cascadeEffect: `ความเสี่ยงทางกฎหมายและ Patient Safety สูงมาก`,
                fixFirst: `Triage nurse Re-assessment ทุก 20 นาที และอธิบายลำดับความรุนแรง`,
                color: isCritical ? '#f43f5e' : '#f59e0b',
            });
        }

        // 3. Return Visit 72h
        if (returnRate > 3) {
            problems.push({
                priority: 4, severity: 'warning',
                title: `Return Visit (72h) อยู่ที่ ${returnRate}%`,
                rootCause: `ผู้ป่วยกลับมาซ้ำในเวลาอันสั้น อาจเกิดจากความเจ็บป่วยที่ไม่ทุเลา หรือการวินิจฉัยในครั้งแรกที่ยังไม่ครอบคลุม`,
                cascadeEffect: `เพิ่มภาระงานสะสมใน ER และสะท้อนคุณภาพการรักษาเบื้องต้น`,
                fixFirst: `ทบทวน Case ที่กลับมาซ้ำโดยทีมแพทย์ Audit และตรวจสอบเกณฑ์การจำหน่าย (Discharge Criteria)`,
                color: '#f59e0b',
            });
        }

        // 4. ER Surge Integration
        if (erSurge?.surge_alert) {
            problems.push({
                priority: 0, severity: 'critical',
                title: `🚨 AI Surge Advisory: คาดการณ์ผู้ป่วย +${erSurge.next_4h_predicted} ราย`,
                rootCause: `ตรวจพบแนวโน้มการเข้าใช้บริการเพิ่มขึ้นในช่วง 4 ชม. ข้างหน้า`,
                cascadeEffect: `หากไม่เตรียมรับมือ จะเกิดวิกฤต overcrowding`,
                fixFirst: `Activate Surge Staffing และเตรียม IPD beds ทันที`,
                color: '#f43f5e',
            });
        }

        const critCount = problems.filter(p => p.severity === 'critical').length;
        const warnCount = problems.filter(p => p.severity === 'warning').length;
        const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);
        const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
        const urgencyLabel = urgencyScore >= 7 ? 'วิกฤต' : urgencyScore >= 4 ? 'เฝ้าระวัง' : 'ปกติ';

        const strategicKPIs = [
            { icon: '⏱️', label: 'Triage SLA', value: `${a.sla_pass_rate || 0}%`, sub: 'Target Compliance', color: (a.sla_pass_rate || 0) > 85 ? '#10b981' : '#f59e0b' },
            { icon: '🩺', label: 'P90 Wait', value: `${p90TimeToDoc}m`, sub: '90th Percentile', color: p90TimeToDoc < 45 ? '#10b981' : '#f43f5e' },
            { icon: '🚶', label: 'LWBS', value: `${lwbsRate}%`, sub: 'ออกก่อนตรวจ', color: lwbsRate > 2 ? '#f43f5e' : '#10b981' },
            { icon: '🔄', label: 'Return 72h', value: `${returnRate}%`, sub: 'กลับมาซ้ำ', color: returnRate > 3 ? '#f43f5e' : '#10b981' },
            { icon: '🏥', label: 'Admit Rate', value: `${a.admit_rate || 0}%`, sub: 'อัตรา Admit', color: '#7c3aed' },
            { icon: '🎯', label: 'EPI Score', value: `${a.epi || 0}/100`, sub: 'ER Perf Index', color: (a.epi || 0) < 70 ? '#f43f5e' : '#10b981' },
            { icon: '🧪', label: 'Lab Cycle', value: `${state.erBottlenecks?.averages?.lab || 0}m`, sub: 'Turnaround Time', color: (state.erBottlenecks?.averages?.lab || 0) > 60 ? '#f43f5e' : '#10b981' },
            { icon: '💰', label: 'Rev/Visit', value: `฿${(a.avg_cost_per_visit || 0).toLocaleString()}`, sub: 'เฉลี่ยต่อราย', color: '#8b5cf6' },
        ];

        return {
            problems: problems.sort((a, b) => a.priority - b.priority),
            urgencyScore, urgencyColor, urgencyLabel, strategicKPIs,
            forecast: {
                intensity: erSurge?.surge_alert ? 'High' : (liveER > 25 ? 'Heavy' : 'Normal'),
                nextPeak: a.peak_hour?.label || '—',
                predicted: erSurge?.next_4h_predicted || 0
            },
            staffing: {
                status: erSurge?.surge_alert ? 'Overstrained' : liveER > 30 ? 'Tight' : 'Optimal',
                recommendation: erSurge?.surge_alert ? 'Activate Surge Team' : liveER > 30 ? 'Request Support' : 'Baseline Staffing',
                color: erSurge?.surge_alert ? '#f43f5e' : liveER > 30 ? '#f59e0b' : '#10b981'
            }
        };
    }, [erAnalytics, erTodayPatients, erSurge, state.erBottlenecks]);


    const triagePieData = useMemo(() => {
        const ta = erAnalytics?.today_acuity || {};
        const mapping = [
            { id: 1, val: ta.resus },
            { id: 2, val: ta.emerg },
            { id: 3, val: ta.urgent },
            { id: 4, val: ta.semi },
            { id: 5, val: ta.non_urg }
        ];
        return mapping.map(s => ({
            name: TRIAGE_COLORS[s.id]?.label || `L${s.id}`,
            value: Number(s.val || 0),
            fill: TRIAGE_COLORS[s.id]?.color || '#94a3b8'
        }));
    }, [erAnalytics]);

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
                        fontSize: '11px', fontWeight: 700,
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
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,.1)', padding: '2px 6px', borderRadius: '4px' }}>Critical</span>
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

    // ── Loading & Empty States ──
    if (loading['erAnalytics']) return <TabLoadingSkeleton />;
    if (!erAnalytics && !erTodayPatients.length) return (
        <EmptyState
            icon="🚑"
            title="ไม่พบข้อมูล ER"
            description="ไม่สามารถโหลดข้อมูลห้องฉุกเฉินได้ในขณะนี้ กรุณาตรวจสอบการเชื่อมต่อ HOSxP XE"
        />
    );

    return (
        <div
            className="space-y-4 animate-fade-in pb-8"
            role="region"
            aria-label="แผนก ER — วิเคราะห์ห้องฉุกเฉิน"
        >
            {/* ━━━━ 🔴 Triage Level 1 Resuscitation Alert Banner ━━━━ */}
            {erResusAlert && resusVisible && (
                <ResusAlertBanner
                    alert={erResusAlert}
                    onDismiss={() => setResusVisible(false)}
                />
            )}

            {/* ━━━━ 🚦 Diversion Status Panel ━━━━ */}
            <DiversionStatusPanel data={erDiversionStatus} loading={loading.erDiversionStatus} />

            {/* ━━━━ 🚀 AI Strategic Intelligence Feed (Hero Strip) ━━━━ */}
            {!loading.erTodayPatients && erAnalytics && (
                <div style={{
                    display: 'flex', gap: '12px', marginBottom: '1rem',
                    overflowX: 'auto', paddingBottom: '4px'
                }}>
                    <div className="glass-card" style={{
                        flex: '1 1 300px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px',
                        borderLeft: `4px solid ${aiAnalytics.urgencyColor}`, background: `${aiAnalytics.urgencyColor}05`
                    }}>
                        <div style={{ fontSize: '28px' }}>🤖</div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Executive Intelligence</p>
                            <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{aiAnalytics.problems[0]?.title || 'ER Operations ปกติ'}</p>
                            <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>Urgency: {aiAnalytics.urgencyLabel} ({aiAnalytics.urgencyScore}/10)</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{
                        flex: '0 0 220px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                        borderLeft: `4px solid #10b981`, background: 'rgba(16,185,129,.05)'
                    }}>
                        <div style={{ fontSize: '24px' }}>📈</div>
                        <div>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Surge Forecast</p>
                            <p style={{ margin: '2px 0 0', fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{aiAnalytics.forecast.intensity} Load</p>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Peak at {aiAnalytics.forecast.nextPeak}</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{
                        flex: '0 0 240px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                        borderLeft: `4px solid ${aiAnalytics.staffing.color}`, background: `${aiAnalytics.staffing.color}05`
                    }}>
                        <div style={{ fontSize: '24px' }}>👥</div>
                        <div>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: aiAnalytics.staffing.color, textTransform: 'uppercase' }}>Staffing Recommendation</p>
                            <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{aiAnalytics.staffing.recommendation}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ marginBottom: '1.25rem' }}>

                {/* ── Live ER (Hero Card) ── */}
                <div style={{
                    padding: '1.25rem 1.5rem', borderRadius: '16px',
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
                                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f43f5e', margin: 0 }}>
                                        🚑 Live ER — ผู้ป่วยในห้องฉุกเฉิน
                                    </p>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>
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
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f43f5e' }}>🔴 L1: {l1}  🟠 L2: {l2}</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>🟡 L3: {l3}  🟢 L4-5: {Math.max(0, l45)}</span>
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
            </div>

            {/* ━━━━━━ 👨‍⚕️ On-Duty Personnel (ER) ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #7c3aed)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 บุคลากรทางการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    HOSxP Activity Logs
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {/* ── Active Doctors List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(244,63,94,.05)', borderBottom: '1px solid rgba(244,63,94,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👨‍⚕️</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#f43f5e' }}>แพทย์ที่อยู่เวร (ER)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#f43f5e', opacity: 0.8 }}>{erAnalytics?.on_duty?.doctors?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.erAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (erAnalytics?.on_duty?.doctors?.length > 0) ? (
                            erAnalytics.on_duty.doctors.map((dr, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                    borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
                                        color: '#fff', fontSize: '12px', fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {(dr.staff_name || '').substring(0, 2).replace(/[นพ]\./, '').trim() || 'D'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dr.staff_name || 'Unknown'}</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ER Physician</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#f43f5e' }}>{dr.total_count}</p>
                                        <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>เคส</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Nurses List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(124,58,237,.05)', borderBottom: '1px solid rgba(124,58,237,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👩‍⚕️</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#7c3aed' }}>พยาบาลฉุกเฉิน (ER)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed', opacity: 0.8 }}>{erAnalytics?.on_duty?.nurses?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.erAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (erAnalytics?.on_duty?.nurses?.length > 0) ? (
                            erAnalytics.on_duty.nurses.map((nr, i) => {
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
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: nr.morning_count > 0 ? '#7c3aed' : '#ccc' }}>🌅{nr.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: nr.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{nr.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: nr.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{nr.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#7c3aed' }}>{nr.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>งาน</p>
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
                    <div style={{ padding: '12px 16px', background: 'rgba(14,165,233,.05)', borderBottom: '1px solid rgba(14,165,233,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0ea5e9' }}>เจ้าหน้าที่สนับสนุน (ER)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#0ea5e9', opacity: 0.8 }}>{erAnalytics?.on_duty?.staff?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.erAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (erAnalytics?.on_duty?.staff?.length > 0) ? (
                            erAnalytics.on_duty.staff.map((st, i) => {
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
                                            background: isActiveNow ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'rgba(0,0,0,0.05)',
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
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#0ea5e9' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#0ea5e9' }}>{st.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>งาน</p>
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

            {/* ━━━ Professional ER KPI Dashboard with Descriptions ━━━ */}
            {erAnalytics && (() => {
                const a = erAnalytics || {};
                const avgTTD = a.avg_time_to_doctor ?? 0;
                const p90TTD = a.p90_time_to_doctor ?? 0;
                const lwbs = a.lwbs_rate ?? 0;
                const sla = a.sla_pass_rate ?? 0;
                const retVisit = a.return_visit_rate ?? 0;
                const epi = a.epi ?? 0;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

                // ━━ Phase B — Tier-1 KPIs per MoPH ECS ━━
                const ret48 = a.return_48h_rate ?? 0;
                const overTri  = a.triage_accuracy?.over_triage_pct  ?? 0;
                const underTri = a.triage_accuracy?.under_triage_pct ?? 0;
                const refL12     = a.time_to_refer?.l12_within_30m_pct ?? 0;
                const ref12Total = a.time_to_refer?.l12_total ?? 0;
                const ref12Within = a.time_to_refer?.l12_within_30m ?? 0;
                const losWithin4hrPct = a.ed_los?.within_4hr_pct ?? 0;
                const avgLos = a.ed_los?.avg_los_min ?? 0;
                const ctTotal = a.door_to_ct?.total ?? 0;
                const ctAvgMin = a.door_to_ct?.avg_min ?? 0;
                const ctWithin25 = a.door_to_ct?.within_25m ?? 0;
                const ctWithin25Pct = a.door_to_ct?.within_25m_pct ?? 0;

                // ━━ Phase H3 — backup TTD (excludes shadow-copied timestamps) ━━
                const avgTTDValid = a.avg_time_to_doctor_valid_only ?? 0;
                const validTTDCount = a.valid_ttd_count ?? 0;
                // TTD Validity % — % of visits where door-to-doctor was time-stamped separately.
                // At BCH this is currently ~1.5% (shadow-copy issue). If <50%, the TTD/SLA/LWBS
                // numbers are not clinically meaningful → show disclaimer on those cards.
                const ttdValidityField = (erDataQuality?.fields || []).find(f => f.id === 'ttd_validity');
                const ttdValidPct = ttdValidityField?.compliance_pct ?? null;
                const dqSuspect = ttdValidPct !== null && ttdValidPct < 50;
                const dqDisclaimer = dqSuspect
                    ? `⚠️ Data Quality ต่ำ (TTD บันทึกแยกขั้นตอนเพียง ${ttdValidPct}%) — ตัวเลขนี้ยังตัดสินใจไม่ได้ ดู Data Quality Monitor`
                    : null;

                // ━━ Phase D — Tier 2/3 KPIs per MoPH ECS ━━
                const edMortPct = a.ed_mortality?.rate_pct ?? 0;             // within 24h (broader)
                const edMortEdOnlyPct = a.ed_mortality?.ed_only_rate_pct ?? 0; // ตายใน ED (ACEP strict)
                const edMortCount24h = a.ed_mortality?.within_24h_count ?? 0;
                const edMortCountEdOnly = a.ed_mortality?.same_day_count ?? 0;
                const stemiTotal = a.stemi_bundle?.total_cases_365d ?? 0;
                const stemiBundlePct = a.stemi_bundle?.overall_bundle_pct ?? 0;
                const stemiAsa = a.stemi_bundle?.asa_pct ?? 0;
                const stemiClop = a.stemi_bundle?.clopidogrel_pct ?? 0;
                const stemiStatin = a.stemi_bundle?.statin_pct ?? 0;
                const referBreakdown = a.refer_breakdown || { total: 0, time_critical_pct: 0, time_critical_count: 0, by_level: [] };
                const repeat28Pct = a.repeat_er_28d?.rate_pct ?? 0;
                const repeat28Count = a.repeat_er_28d?.same_dx_count ?? 0;

                // ━━ Phase E Tier 3 — Patient Satisfaction ━━
                const ps = erPatientSat || {};
                const psCount = Number(ps.response_count || 0);
                const psAvg = Number(ps.avg_overall || 0);
                const psSatisfiedPct = Number(ps.satisfied_pct || 0);

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'Door-to-Doctor', thLabel: 'เวลารอพบแพทย์เฉลี่ย',
                            value: `${avgTTD} min`,
                            color: dqSuspect ? '#94a3b8' : avgTTD <= 10 ? '#059669' : avgTTD <= 20 ? '#f59e0b' : '#e11d48',
                            icon: '⏱️',
                            sub: validTTDCount > 0
                                ? `เฉพาะเคสบันทึกแยก: ${avgTTDValid} min (${validTTDCount} เคส)`
                                : null,
                            desc: `P90: ${p90TTD} min | เฉลี่ย: ${avgTTD} min`,
                            meaning: 'เวลาเฉลี่ยตั้งแต่ผู้ป่วยเข้าประตู ER จนถึงได้พบแพทย์ ยิ่งน้อยยิ่งดี ลดความเสี่ยง Deterioration',
                            calc: 'AVG( COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time)) ) / 60',
                            dataSource: 'er_regist (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
                            target: '≤ 10 min (L1-2) / ≤ 30 min (L3)',
                            benchmark: 'JCI: ≤10m (Resus) | สปสช.: ≤30m',
                            aiTip: dqDisclaimer || (avgTTD <= 15 ? 'ดีเยี่ยม — ผู้ป่วยพบแพทย์เร็ว' : 'ช้ากว่าเป้า — ตรวจสอบ Boarding และ Fast-track'),
                        },
                        {
                            label: 'LWBS Rate', thLabel: 'อัตราออกก่อนพบแพทย์',
                            value: `${lwbs}%`,
                            color: dqSuspect ? '#94a3b8' : lwbs <= 2 ? '#059669' : lwbs <= 5 ? '#f59e0b' : '#e11d48',
                            icon: '🚶',
                            desc: `ผู้ป่วยที่ออกก่อนได้รับการตรวจ (LWBS)`,
                            meaning: 'Left Without Being Seen — ผู้ป่วยออกก่อนตรวจ สะท้อนความเสี่ยงและความพึงพอใจของผู้ป่วย',
                            calc: 'doctor_tx_time IS NULL + finish_time IS NOT NULL + stay<15m + ไม่ admit + ไม่ refer (outcome-based proxy)',
                            dataSource: 'er_regist + ovst + an_stat + referout (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 2%',
                            benchmark: 'ACEP: ≤2% | สปสช.: ≤5%',
                            aiTip: dqDisclaimer || (lwbs <= 2 ? 'LWBS ต่ำ ผู้ป่วยพึงพอใจ' : 'สูงเกิน — จัด Re-assessment ทุก 20 นาที'),
                        },
                        {
                            label: 'Triage SLA', thLabel: 'ความตรงเวลา Triage',
                            value: `${sla}%`,
                            color: dqSuspect ? '#94a3b8' : sla >= 85 ? '#059669' : sla >= 70 ? '#f59e0b' : '#e11d48',
                            icon: '✅',
                            desc: `ผู้ป่วยได้รับการตรวจตามระดับ Triage ตรงเวลา`,
                            meaning: 'สัดส่วนผู้ป่วยที่ได้รับการตรวจภายในเวลาที่กำหนดตามระดับ Triage (L1: ทันที, L2: ≤15m, L3: ≤30m)',
                            calc: '(Cases within SLA ÷ Total Cases) × 100 [แยกตาม Triage Level]',
                            dataSource: 'er_regist + er_nursing_detail (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
                            target: '≥ 85%',
                            benchmark: 'JCI: ≥90% | HA: ≥85%',
                            aiTip: dqDisclaimer || (sla >= 85 ? 'SLA ดี — รักษาคุณภาพ' : 'ต่ำ — ตรวจสอบกำลังคนช่วงพีค'),
                        },
                        {
                            label: 'Return Visit 72h', thLabel: 'กลับมาซ้ำภายใน 72 ชั่วโมง',
                            value: `${retVisit}%`, color: retVisit <= 3 ? '#059669' : retVisit <= 5 ? '#f59e0b' : '#e11d48', icon: '🔄',
                            desc: `กลับมาซ้ำ ${retVisit}% จาก ER ทั้งหมด`,
                            meaning: 'อัตราผู้ป่วยที่กลับมา ER ภายใน 72 ชั่วโมง สะท้อนคุณภาพการรักษาเบื้องต้น',
                            calc: '(Return Visits 72h ÷ Total ER Visits 30d) × 100',
                            dataSource: 'er_regist + ovst (HOSxP XE — ผ่าน ovst.hn)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 3%',
                            benchmark: 'ACEP: ≤3% | HA: ≤5%',
                            aiTip: retVisit <= 3 ? 'คุณภาพการจำหน่ายดี' : 'สูง — ทบทวน Discharge Criteria',
                        },
                        {
                            label: 'EPI Score', thLabel: 'ดัชนีประสิทธิภาพ ER',
                            value: `${epi}/100`,
                            color: dqSuspect ? '#94a3b8' : epi >= 80 ? '#059669' : epi >= 60 ? '#f59e0b' : '#e11d48',
                            icon: '🧠',
                            sub: epi >= 80 ? 'ดีเยี่ยม' : epi >= 60 ? 'ปานกลาง' : 'ต้องปรับปรุง',
                            desc: `ER Performance Index — คะแนน AI รวม`,
                            meaning: 'คะแนนรวมประสิทธิภาพ ER จาก AI ถ่วงน้ำหนัก Time-to-Doc, SLA, LWBS, Return Visit',
                            calc: 'SLA×30% + (100−LWBS%)×20% + TTD_Score×30% + (100−Return%)×20%',
                            dataSource: 'คำนวณจาก KPI 1-4 (Composite)',
                            period: `📅 ประมวลผล ${todayShort}`,
                            target: '≥ 80',
                            benchmark: 'BCH Internal: ≥80 = ดีเยี่ยม',
                            aiTip: dqDisclaimer || (epi >= 80 ? 'ภาพรวมดีเยี่ยม' : 'ต้องปรับปรุง — ดู KPI ที่ต่ำสุด'),
                        },
                        // ━━ Phase B — MoPH ECS Tier-1 KPIs ━━
                        {
                            label: 'Re-visit 48h', thLabel: 'กลับมาซ้ำ 48 ชั่วโมง',
                            value: `${ret48}%`,
                            color: ret48 <= 3 ? '#059669' : ret48 <= 5 ? '#f59e0b' : '#e11d48',
                            icon: '⏰',
                            desc: `กลับมา ER ภายใน 48 ชม. ${ret48}%`,
                            meaning: 'อัตราผู้ป่วยที่กลับมา ER ภายใน 48 ชั่วโมง — เกณฑ์หลักของ สธ. สำหรับคุณภาพการรักษาเบื้องต้น',
                            calc: '(Return ≤48h ÷ Total ER Visits) × 100',
                            dataSource: 'er_regist + ovst (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 3%',
                            benchmark: 'MoPH ECS: ≤3% | HA: ≤5%',
                            aiTip: ret48 <= 3 ? 'ผ่านเกณฑ์ สธ.' : 'สูงเกิน — ทบทวน Discharge Criteria และ Follow-up Plan',
                        },
                        {
                            label: 'Triage Accuracy', thLabel: 'ความแม่นยำคัดกรอง',
                            value: `${overTri}% / ${underTri}%`,
                            color: (overTri <= 15 && underTri <= 5) ? '#059669' : underTri > 5 ? '#e11d48' : '#f59e0b',
                            icon: '🎯',
                            sub: 'Over / Under',
                            desc: `Over: ${overTri}% (L1-2 ไม่วิกฤต) · Under: ${underTri}% (L4-5 กลับวิกฤต)`,
                            meaning: 'Over-triage = L1-2 ที่ไม่ได้ admit/refer (คัดเข้มเกินไป) · Under-triage = L4-5 ที่ลงเอย admit/refer (พลาดเคสรุนแรง)',
                            calc: 'Over: % L1-2 ไม่มี critical outcome · Under: % L4-5 มี critical outcome',
                            dataSource: 'er_regist + an_stat + referout (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: 'Over ≤ 15% · Under ≤ 5%',
                            benchmark: 'MoPH ECS Service Plan',
                            aiTip: underTri > 5
                                ? '⚠️ Under-triage สูง — ผู้ป่วย L4-5 อาจ deteriorate, ทบทวน Triage Protocol'
                                : overTri > 15
                                    ? 'Over-triage สูง — สิ้นเปลืองทรัพยากร Resus'
                                    : 'การ Triage แม่นยำตามมาตรฐาน',
                        },
                        {
                            label: 'L1-2 Refer ≤30m', thLabel: 'ส่งต่อผู้ป่วยวิกฤตภายใน 30 นาที',
                            value: `${refL12}%`,
                            color: ref12Total < 3 ? '#94a3b8'
                                : refL12 >= 90 ? '#059669'
                                : refL12 >= 70 ? '#f59e0b' : '#e11d48',
                            icon: '🚨',
                            sub: ref12Total < 3 ? 'ข้อมูลน้อย' : `${ref12Within}/${ref12Total} ราย`,
                            desc: `L1-2 (Resus/Emergency) ที่ refer call ภายใน 30 นาที`,
                            meaning: 'เวลาที่ใช้ตั้งแต่ผู้ป่วยเข้า ER ถึงโทรประสาน Refer (สำหรับ Time-critical patient) — เกณฑ์ รพช. F2',
                            calc: '(L1-2 Refers ≤30m ÷ Total L1-2 Refers) × 100',
                            dataSource: 'er_regist + referout (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≥ 90%',
                            benchmark: 'MoPH ECS F2: ≥90%',
                            aiTip: ref12Total < 3
                                ? `${ref12Total} ราย — ข้อมูลน้อย ดูแนวโน้มได้เท่านั้น`
                                : refL12 >= 90 ? 'ระบบ Refer Time-Critical ได้มาตรฐาน'
                                : 'ช้ากว่าเป้า — ทบทวน STEMI/Stroke Pathway และความพร้อมทีม Refer',
                        },
                        {
                            label: 'ED LOS ≤4hr', thLabel: 'เวลารวมใน ER ≤ 4 ชั่วโมง',
                            value: `${losWithin4hrPct}%`,
                            color: losWithin4hrPct >= 90 ? '#059669' : losWithin4hrPct >= 75 ? '#f59e0b' : '#e11d48',
                            icon: '⏳',
                            sub: `เฉลี่ย ${avgLos} นาที`,
                            desc: `ผู้ป่วย ER ที่อยู่ไม่เกิน 4 ชั่วโมง`,
                            meaning: 'ED Length of Stay — เวลารวมตั้งแต่เข้าถึงจำหน่าย/Admit/Refer (เฉพาะเคสที่พบแพทย์)',
                            calc: '(Visits ≤240m ÷ Total visits with doctor) × 100',
                            dataSource: 'er_regist (doctor_tx_time IS NOT NULL)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≥ 90%',
                            benchmark: 'MoPH ECS: ≥90%',
                            aiTip: losWithin4hrPct >= 90 ? 'Throughput ผ่านเป้า' : 'มี Patient Boarding — ตรวจสอบ IPD bed availability',
                        },
                        {
                            label: 'Door-to-CT ≤25m', thLabel: 'Stroke FT — CT ภายใน 25 นาที',
                            value: ctTotal < 3 ? 'N too low' : `${ctWithin25Pct}%`,
                            color: ctTotal < 3 ? '#94a3b8'
                                : ctWithin25Pct >= 80 ? '#059669'
                                : ctWithin25Pct >= 60 ? '#f59e0b' : '#e11d48',
                            icon: '🧠',
                            sub: ctTotal < 3 ? `${ctTotal} เคส` : `${ctWithin25}/${ctTotal} · avg ${ctAvgMin}m`,
                            desc: `CT Brain Request ภายใน 25 นาที (Stroke Fast Track)`,
                            meaning: 'เวลาตั้งแต่ผู้ป่วยถึง ER → ขอ CT Brain — มาตรฐาน Stroke Service Plan',
                            calc: '(CT Brain orders ≤25m from arrival ÷ Total) × 100',
                            dataSource: 'er_regist + xray_report (codes 234, 235)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 25 นาที, ≥ 80% pass',
                            benchmark: 'MoPH Stroke FT: ≤25 นาที',
                            aiTip: ctTotal < 3
                                ? `${ctTotal} เคส — ข้อมูลน้อยเกินไปสำหรับ benchmark`
                                : ctWithin25Pct >= 80 ? 'Pathway ทำงานได้ตามเป้า'
                                : 'ปรับลำดับงานทีม X-ray + ความพร้อม Radiologist',
                        },
                        // ━━ Phase D — Tier 2 Clinical Quality ━━
                        {
                            label: 'ED Mortality', thLabel: 'อัตราเสียชีวิตใน ER',
                            value: `${edMortEdOnlyPct}% / ${edMortPct}%`,
                            color: edMortPct <= 0.5 ? '#10b981' : edMortPct <= 1 ? '#f59e0b' : '#ef4444',
                            icon: '⚰️',
                            sub: `ตายใน ED ${edMortCountEdOnly} ราย · ตายใน 24h ${edMortCount24h} ราย (90 วัน)`,
                            desc: '2 มุมมอง: ตายใน ED (ACEP strict) | ตายใน 24 ชม. (BCH default)',
                            meaning: 'ตัวซ้าย = เสียชีวิตขณะอยู่ ER (vstdate เดียวกับ deathday). ตัวขวา = เสียชีวิตภายใน 24 ชม. หลัง visit ใช้สำหรับ Patient Safety + STEMI/Stroke/Sepsis pathway review',
                            calc: 'ed_only = (deathday = vstdate / total) ; 24h = (deathday BETWEEN vstdate AND +1d / total)',
                            dataSource: 'er_regist + patient.deathday (HOSxP XE)',
                            period: '📅 90 วันย้อนหลัง',
                            target: '≤ 0.5%',
                            benchmark: 'MoPH ECS: ≤ 0.5% (รพช.) · ACEP: track ED-only',
                            aiTip: edMortPct <= 0.5
                                ? 'ผ่านเกณฑ์ Patient Safety'
                                : 'ทบทวน Critical Care Pathway + ระบบ Resuscitation',
                        },
                        {
                            label: 'STEMI Pre-Refer Bundle', thLabel: 'มาตรการก่อน Refer ผู้ป่วย STEMI',
                            value: stemiTotal > 0 ? `${stemiBundlePct}%` : 'N too low',
                            color: stemiTotal < 5 ? '#94a3b8'
                                : stemiBundlePct >= 95 ? '#10b981'
                                : stemiBundlePct >= 75 ? '#f59e0b' : '#ef4444',
                            icon: '🫀',
                            sub: `STEMI ${stemiTotal} เคส (365วัน)`,
                            desc: 'Bundle ASA + Clopidogrel + Statin ก่อน refer (Cardiac Pathway)',
                            meaning: 'ผู้ป่วย STEMI (ICD-10 I21.x) ที่ได้รับครบ ASA + Clopidogrel + Statin ก่อนส่งต่อ — มาตรฐาน Cardiac Pathway',
                            calc: `ASA ${stemiAsa}% · Clopidogrel ${stemiClop}% · Statin ${stemiStatin}% — เฉลี่ย 3 ตัว`,
                            dataSource: 'er_regist + ovstdiag (I21) + opitemrece (HOSxP XE)',
                            period: '📅 365 วันย้อนหลัง',
                            target: '≥ 95% ทุกองค์ประกอบ',
                            benchmark: 'MoPH Cardiac Service Plan',
                            aiTip: stemiTotal < 5
                                ? `${stemiTotal} เคส STEMI — ข้อมูลน้อยเกินสำหรับ benchmark`
                                : stemiStatin < 50
                                    ? `⚠️ Statin ต่ำ ${stemiStatin}% — ทบทวน STEMI checklist ก่อน refer`
                                    : stemiBundlePct >= 95
                                        ? 'Bundle ครบมาตรฐาน'
                                        : 'ปรับปรุง Bundle compliance — ทบทวน Pathway',
                        },
                        // ━━ Phase D — Tier 3 Operational ━━
                        {
                            label: 'Refer-out by ระดับ', thLabel: 'การส่งต่อแยกตามระดับ ECS',
                            value: `${referBreakdown.time_critical_pct}%`,
                            color: '#8b5cf6',
                            icon: '📤',
                            sub: `รวม ${referBreakdown.total} ราย · TC ${referBreakdown.time_critical_count}`,
                            desc: 'การ Refer แยกตาม MoPH ECS 5 ระดับ (Life-threatening → Non-acute)',
                            meaning: 'สัดส่วนการ Refer ผู้ป่วยตามระดับความฉุกเฉิน MoPH ECS — ติดตามภาพรวมขีดความสามารถ รพ.',
                            calc: '% Time-critical (L1+L2) จาก Total Refer · '
                                + (referBreakdown.by_level || []).map(e => `L${e.type_id}: ${e.count}`).join(' · '),
                            dataSource: 'er_regist + referout + referout_emergency_type (HOSxP XE)',
                            period: '📅 30 วันย้อนหลัง',
                            target: 'ติดตามแนวโน้ม',
                            benchmark: 'MoPH ECS 5 ระดับ',
                            aiTip: referBreakdown.time_critical_pct > 40
                                ? `Time-critical ${referBreakdown.time_critical_pct}% — สัดส่วนสูง ตรวจสอบขีดความสามารถ`
                                : 'ภาพรวมการ Refer เป็นไปตามที่คาด',
                        },
                        {
                            label: 'Repeat ER 28d', thLabel: 'กลับมา ER ภายใน 28 วัน โรคเดียวกัน',
                            value: `${repeat28Pct}%`,
                            color: repeat28Pct <= 5 ? '#10b981' : repeat28Pct <= 10 ? '#f59e0b' : '#ef4444',
                            icon: '🔁',
                            sub: `${repeat28Count} ราย`,
                            desc: `กลับมาด้วย ICD-10 หมวดเดียวกันภายใน 28 วัน ${repeat28Pct}%`,
                            meaning: 'อัตราผู้ป่วยที่กลับมา ER ภายใน 28 วันด้วยกลุ่มโรคเดิม — สะท้อนคุณภาพการรักษา + Discharge planning',
                            calc: '(Repeat ER ภายใน 28 วัน + ICD-10 chapter เดียวกัน ÷ Total ER Visits) × 100',
                            dataSource: 'er_regist + ovstdiag (HOSxP XE)',
                            period: '📅 30 วันย้อนหลัง',
                            target: '≤ 5% (ติดตาม)',
                            benchmark: 'MoPH Quality (Chronic disease management)',
                            aiTip: repeat28Pct > 10
                                ? '🔴 สูงผิดปกติ — ทบทวน Discharge plan, Follow-up clinic, Chronic disease pathway'
                                : repeat28Pct > 5
                                    ? 'สูงกว่าเป้า — ดูกลุ่มโรคที่กลับซ้ำบ่อย'
                                    : 'ผ่านเกณฑ์',
                        },
                        // ━━ Phase E Tier 3 — Patient Satisfaction ━━
                        {
                            label: 'Patient Satisfaction', thLabel: 'ความพึงพอใจของผู้ป่วย',
                            value: psCount > 0 ? `${psAvg.toFixed(1)}/5` : 'ยังไม่มีผล',
                            color: psCount === 0 ? '#94a3b8'
                                : psSatisfiedPct >= 85 ? '#10b981'
                                : psSatisfiedPct >= 70 ? '#f59e0b' : '#ef4444',
                            icon: '⭐',
                            sub: psCount > 0 ? `${psSatisfiedPct}% พอใจ · ${psCount} ผล` : 'รอแสกน QR ที่จุดบริการ',
                            desc: psCount > 0
                                ? `ผู้ป่วยพึงพอใจ ${psSatisfiedPct}% (${ps.satisfied_count || 0}/${psCount})`
                                : 'ยังไม่มีผลตอบรับ — พิมพ์ QR "/survey.html?dept=ER" ติดจุดบริการ ER',
                            meaning: 'คะแนนเฉลี่ยจากแบบสอบถามแสกน QR หลังออกจาก ER (1-5 ดาว) — มาตรฐาน HA ติดตามคุณภาพในมุมมองผู้ป่วย',
                            calc: 'AVG(overall_score) · % ที่ให้ ≥ 4 ดาว = พอใจ',
                            dataSource: 'dw_patient_satisfaction (warehouse SQLite)',
                            period: '📅 30 วันย้อนหลัง',
                            target: '≥ 85% พอใจ',
                            benchmark: 'HA: ≥ 85% | สรพ.: ≥ 80%',
                            aiTip: psCount === 0
                                ? 'พิมพ์ QR code → /survey.html?dept=ER ติดที่จุดบริการ เพื่อเก็บข้อมูล real-time'
                                : psSatisfiedPct >= 85
                                    ? 'คะแนนดีเยี่ยม — รักษามาตรฐานต่อไป'
                                    : 'ทบทวนคำติชม + ปัจจัยที่ทำให้คะแนนลด',
                        },
                    ]} />
                );
            })()}

            {/* ━━━━━━ 🔍 Data Quality Monitor — ติดตามการกรอกข้อมูล HOSxP ━━━━━━ */}
            {erDataQuality && Array.isArray(erDataQuality.fields) && (
                <div style={{ marginTop: '8px' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        margin: '20px 0 12px', paddingBottom: '10px',
                        borderBottom: '1px solid rgba(124,58,237,.20)',
                    }}>
                        <div style={{ width: '4px', height: '32px', background: '#8b5cf6', borderRadius: '99px' }} />
                        <span style={{ fontSize: '22px' }}>🔍</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                Data Quality Monitor — ติดตามการกรอกข้อมูล
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '2px' }}>
                                ฟิลด์ HOSxP ที่มีอยู่แต่ยังไม่ถูกกรอก — เป็น KPI ที่ unlock ได้เมื่อทีมเริ่มกรอก
                            </div>
                        </div>
                        <span style={{
                            fontSize: '11px', fontWeight: 600, color: '#8b5cf6',
                            background: 'rgba(124,58,237,.15)',
                            padding: '5px 12px', borderRadius: '99px', whiteSpace: 'nowrap',
                        }}>
                            ค่าเฉลี่ย {erDataQuality.overall_compliance_pct || 0}%
                        </span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                        gap: '12px',
                    }}>
                        {erDataQuality.fields.map((field, i) => {
                            const passed = field.compliance_pct >= field.target_pct;
                            const color = field.total === 0 ? '#94a3b8'
                                : passed ? '#10b981'
                                : field.compliance_pct >= field.target_pct * 0.5 ? '#f59e0b'
                                : '#ef4444';
                            return (
                                <div key={i} className="glass-card" style={{
                                    padding: '16px', borderLeft: `4px solid ${color}`,
                                    borderRadius: '12px',
                                    display: 'flex', flexDirection: 'column', gap: '10px',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                                {field.name_th}
                                            </div>
                                            <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '2px', fontFamily: "'JetBrains Mono', monospace" }}>
                                                {field.table}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '24px', fontWeight: 900, color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                                                {field.compliance_pct}%
                                            </div>
                                            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                                                {field.filled}/{field.total}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', background: `${color}15`, overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', width: `${Math.min(100, field.compliance_pct)}%`,
                                            background: color, borderRadius: '99px', transition: 'width 0.6s',
                                        }} />
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5 }}>
                                        <div style={{ fontWeight: 600 }}>
                                            <span style={{ color: '#8b5cf6', fontWeight: 600 }}>👥 </span>
                                            ผู้กรอก: {field.who_fills}
                                        </div>
                                        <div style={{ fontWeight: 600, marginTop: '2px' }}>
                                            <span style={{ color: '#0ea5e9', fontWeight: 600 }}>📺 </span>
                                            {field.hosxp_screen}
                                        </div>
                                        <div style={{ fontWeight: 600, marginTop: '2px' }}>
                                            <span style={{ color: '#10b981', fontWeight: 600 }}>🔑 </span>
                                            Unlock: {field.unlocks_kpi}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '11px', fontWeight: 700, color,
                                        background: `${color}08`, padding: '8px 10px',
                                        borderRadius: '8px', borderLeft: `2px solid ${color}`,
                                    }}>
                                        <span>💡 Action: </span>{field.action}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {erDataQuality.note && (
                        <div style={{
                            fontSize: '11px', color: 'var(--md-text-tertiary)',
                            fontStyle: 'italic', marginTop: '8px', textAlign: 'center',
                        }}>
                            {erDataQuality.note}
                        </div>
                    )}
                </div>
            )}

            {/* ━━━━━━ 📈 แนวโน้ม 12 เดือน (KPI Trends) ━━━━━━ */}
            {erTrends && Array.isArray(erTrends.series) && erTrends.series.length > 0 && (
                <ERTrendsSection trends={erTrends} />
            )}

            {/* ━━━━━━ 📋 Live Patients & Performance Analytics — Consolidated View ━━━━━━ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 1. Live Patient List */}
                <div className="glass-card flex flex-col" style={{ height: '400px' }}>
                    <div className="px-5 py-4 border-b border-[var(--md-divider)] flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[13px] font-bold text-[var(--md-text-primary)] uppercase tracking-tight">ผู้ป่วยใน ER ขณะนี้</h3>
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{erTodayPatients.length}</span>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0">
                        <List
                            height={340}
                            itemCount={erTodayPatients.length}
                            itemSize={50}
                            width="100%"
                        >
                            {PatientRow}
                        </List>
                        {erTodayPatients.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center opacity-40">
                                <span className="text-4xl mb-2">🏥</span>
                                <p className="text-sm font-medium">ไม่มีผู้ป่วยในระบบ ER ขณะนี้</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. ER Flow & Capacity Analysis */}
                <div className="glass-card flex flex-col" style={{ height: '400px', padding: '1.25rem' }}>
                    <h3 className="text-[11px] font-bold text-[var(--md-text-tertiary)] uppercase tracking-wider mb-4">ปริมาณงาน · ประสิทธิภาพ</h3>

                    {/* Hourly Heatmap Small */}
                    <div className="flex-1">
                        <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>🕐 ปริมาณผู้ป่วยรายชั่วโมง (เฉลี่ย 30 วัน)</p>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={erAnalytics?.hourly_heatmap || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.2)" vertical={false} />
                                <XAxis dataKey="hour" tick={{ fontSize: 8 }} tickFormatter={h => `${h}h`} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ fontSize: '11px' }} />
                                <Bar dataKey="avg" radius={[3, 3, 0, 0]}>
                                    {(erAnalytics?.hourly_heatmap || []).map((d, i) => (
                                        <Cell key={i} fill={d.avg >= 3 ? '#f43f5e' : '#7c3aed'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="mt-6">
                            <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>📈 แนวโน้มรายเดือน (จำนวนเคส · เคสวิกฤต)</p>
                            <ResponsiveContainer width="100%" height={120}>
                                <ComposedChart data={erAnalytics?.monthly_trend || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.2)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                                    <Area type="monotone" dataKey="visits" fill="rgba(124,58,237,.1)" stroke="#7c3aed" strokeWidth={2} />
                                    <Bar dataKey="critical" fill="rgba(244,63,94,.4)" barSize={10} radius={[2, 2, 0, 0]} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>


            {/* ━━━━ 🔥 Consolidated Root-Cause Analysis ━━━━ */}
            {!loading.erAnalytics && aiAnalytics.problems.length > 0 && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                            🔥 AI Deep Root-Cause & Performance Recovery
                        </span>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', border: `1.5px solid ${aiAnalytics.urgencyColor}25` }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {aiAnalytics.problems.map((p, i) => (
                                <div key={i} style={{ borderRadius: '14px', border: `1.5px solid ${p.color}20`, background: `${p.color}04`, overflow: 'hidden' }}>
                                    <div style={{ padding: '10px 16px', borderBottom: `1px solid ${p.color}15`, display: 'flex', alignItems: 'center', gap: '10px', background: `linear-gradient(90deg, ${p.color}10, transparent)` }}>
                                        {p.priority > 0 && <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.priority}</span>}
                                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{p.title}</span>
                                    </div>
                                    <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
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
            )}



            <div className="grid grid-cols-1 gap-4">
                {/* Load Dynamics */}
                <div className="chart-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                            🚑 ER Performance Dynamics
                        </h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7c3aed' }} /> <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Actual</span></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', border: '1px solid #8b5cf6', opacity: 0.5 }} /> <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Predicted</span></div>
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
            </div>

            {/* ━━━━━━ รายได้โดยประมาณ ER — ปีงบประมาณ (3 ปีย้อนหลัง) ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #e11d48)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้ ER ประจำปีงบประมาณ
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Data Intelligence</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.erRevenueFiscal ? (
                    <div className="skeleton h-[300px] w-full" />
                ) : (() => {
                    const fiscalDataER = state.erRevenueFiscal;
                    const years = fiscalDataER?.fiscal_years || [];
                    if (years.length === 0) return null;

                    const FY_COLORS = ['#94a3b8', '#fb7185', '#f43f5e'];
                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => { row[`fy${fi}`] = fy.months[i]?.revenue || 0; });
                        return row;
                    });

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="grid grid-cols-3 gap-3">
                                {years.map((fy, fi) => (
                                    <div key={fi} style={{ padding: '12px', borderRadius: '12px', border: `1px solid ${FY_COLORS[fi]}20`, background: `${FY_COLORS[fi]}05` }}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 rounded-full" style={{ background: FY_COLORS[fi] }} />
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: FY_COLORS[fi] }}>{fy.fiscal_label}</span>
                                        </div>
                                        <p style={{ fontSize: '20px', fontWeight: 900, color: FY_COLORS[fi] }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</p>
                                        <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>{fy.total_visits.toLocaleString()} visits</p>
                                    </div>
                                ))}
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203,213,225,.2)" />
                                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '10px' }} />
                                    {years.map((fy, fi) => (
                                        <Bar key={fi} dataKey={`fy${fi}`} fill={FY_COLORS[fi]} radius={[3, 3, 0, 0]} opacity={fi === years.length - 1 ? 1 : 0.4} />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    );
                })()}
            </div>

            <div className="text-center opacity-30 py-4">
                <p className="text-[10px] font-bold tracking-widest text-[var(--md-text-tertiary)] uppercase">
                    BCH ER Intelligence · Protocol v10.4 · High Fidelity Analytics
                </p>
            </div>
        </div>
    );
}

// ── Triage Level 1 Resuscitation Alert Banner ─────────────────────────────
// Flashes when WebSocket emits er:resus; auto-dismissed after 5 min
function ResusAlertBanner({ alert, onDismiss }) {
    const [flash, setFlash] = React.useState(true);
    React.useEffect(() => {
        const t = setInterval(() => setFlash(f => !f), 700);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 20px',
            borderRadius: '14px',
            border: '2px solid #f43f5e',
            background: flash ? 'rgba(244,63,94,.18)' : 'rgba(244,63,94,.08)',
            transition: 'background 0.3s',
            boxShadow: flash ? '0 0 20px rgba(244,63,94,.35)' : '0 0 6px rgba(244,63,94,.1)',
        }}>
            <span style={{ fontSize: '28px', flexShrink: 0 }}>🔴</span>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#f43f5e', letterSpacing: '0.02em' }}>
                    TRIAGE LEVEL 1 — RESUSCITATION ALERT
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 600, color: 'var(--md-text-primary)' }}>
                    {alert.message}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)' }}>
                    WebSocket Push · {new Date(alert.timestamp).toLocaleTimeString('th-TH')}
                </p>
            </div>
            <button
                onClick={onDismiss}
                style={{
                    flexShrink: 0, padding: '6px 14px', borderRadius: '8px',
                    border: '1px solid #f43f5e', background: 'transparent',
                    color: '#f43f5e', fontSize: '11px', fontWeight: 700,
                    cursor: 'pointer',
                }}
            >
                รับทราบ
            </button>
        </div>
    );
}

// ── Diversion Status Panel ────────────────────────────────────────────────
// Auto-computed from live ER load: OPEN / CAUTION / DIVERTED
const DIVERSION_CONFIG = {
    open:     { color: '#10b981', bg: 'rgba(16,185,129,.08)',  icon: '✅', label: 'เปิดรับผู้ป่วย',   labelEn: 'OPEN' },
    caution:  { color: '#f59e0b', bg: 'rgba(245,158,11,.08)',  icon: '⚠️', label: 'ระวัง — อาจล่าช้า', labelEn: 'CAUTION' },
    diverted: { color: '#f43f5e', bg: 'rgba(244,63,94,.08)',   icon: '🚫', label: 'ปิดรับชั่วคราว',   labelEn: 'DIVERTED' },
};

// ── 12-Month KPI Trends Section (Phase F) ─────────────────────────────────
// Renders a responsive grid of mini Area charts, one per KPI definition.
// Each card shows: KPI Thai name, latest value, target, MoM trend chip,
// and a 90px sparkline visualizing the 12-month series.
function ERTrendsSection({ trends }) {
    const kpiDefs = trends.kpi_defs || [];
    const series = trends.series || [];

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                margin: '20px 0 12px', paddingBottom: '10px',
                borderBottom: '1px solid rgba(14,165,233,.20)',
            }}>
                <div style={{ width: '4px', height: '32px', background: '#0ea5e9', borderRadius: '99px' }} />
                <span style={{ fontSize: '22px' }}>📈</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                        แนวโน้ม 12 เดือน (KPI Trends)
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '2px' }}>
                        ค่ารายเดือนของ KPI ER 12 เดือนย้อนหลัง · ใช้วิเคราะห์แนวโน้มก่อน/หลัง intervention
                    </div>
                </div>
                <span style={{
                    fontSize: '11px', fontWeight: 600, color: '#0ea5e9',
                    background: 'rgba(14,165,233,.12)',
                    padding: '5px 12px', borderRadius: '99px', whiteSpace: 'nowrap',
                }}>
                    {kpiDefs.length || 14} KPI
                </span>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '12px',
            }}>
                {kpiDefs.map((kpi, i) => {
                    const data = series.map(m => ({
                        month: (m.month || '').slice(5),
                        value: Number(m[kpi.id] ?? 0),
                    }));
                    const latest = data[data.length - 1]?.value || 0;
                    const prev = data[data.length - 2]?.value || 0;
                    const momPct = prev > 0
                        ? Math.round(((latest - prev) / prev) * 100)
                        : (prev === 0 && latest > 0 ? 100 : 0);
                    const arrow = momPct > 5 ? '↗' : momPct < -5 ? '↘' : '→';
                    const trendGood = kpi.higher_better === null ? null
                        : kpi.higher_better ? momPct > 0 : momPct < 0;
                    const trendColor = kpi.higher_better === null ? '#8b5cf6'
                        : trendGood === true ? '#10b981'
                        : trendGood === false ? '#ef4444' : '#94a3b8';
                    const targetMet = kpi.target == null ? null
                        : kpi.higher_better ? latest >= kpi.target : latest <= kpi.target;
                    const accentColor = targetMet == null ? '#0ea5e9' : targetMet ? '#10b981' : '#ef4444';
                    const valueStr = kpi.unit === '%' ? `${latest}%`
                        : kpi.unit === 'min' ? `${latest}m`
                        : latest.toLocaleString();

                    return (
                        <div key={kpi.id || i} className="glass-card" style={{
                            padding: '12px 14px', borderRadius: '12px',
                            borderLeft: `3px solid ${accentColor}`,
                            display: 'flex', flexDirection: 'column', gap: '8px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '11px', fontWeight: 700,
                                        color: 'var(--md-text-tertiary)',
                                        textTransform: 'uppercase', letterSpacing: '0.04em',
                                    }}>
                                        {kpi.name_th}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                                        <span style={{
                                            fontSize: '18px', fontWeight: 900, color: accentColor,
                                            lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                                        }}>
                                            {valueStr}
                                        </span>
                                        {kpi.target != null && (
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>
                                                เป้า {kpi.higher_better ? '≥' : '≤'} {kpi.target}{kpi.unit === '%' ? '%' : ''}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span style={{
                                    fontSize: '11px', fontWeight: 600, color: trendColor,
                                    background: `${trendColor}15`,
                                    padding: '3px 8px', borderRadius: '99px', whiteSpace: 'nowrap',
                                }}>
                                    {arrow} {momPct >= 0 ? '+' : ''}{momPct}%
                                </span>
                            </div>
                            <div style={{ height: '90px', marginLeft: '-8px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: -8 }}>
                                        <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="rgba(0,0,0,.05)" />
                                        <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={1} />
                                        <YAxis tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={28} />
                                        <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,.08)' }} />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            fill={`${accentColor}1a`}
                                            stroke={accentColor}
                                            strokeWidth={2}
                                            dot={{ r: 2, fill: accentColor }}
                                            activeDot={{ r: 4 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function DiversionStatusPanel({ data, loading }) {
    if (loading) return (
        <div className="skeleton" style={{ height: '72px', borderRadius: '14px' }} />
    );
    if (!data) return null;

    const cfg = DIVERSION_CONFIG[data.status] || DIVERSION_CONFIG.open;

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '14px 20px',
            borderRadius: '14px',
            border: `1.5px solid ${cfg.color}30`,
            background: cfg.bg,
        }}>
            <span style={{ fontSize: '28px', flexShrink: 0 }}>{cfg.icon}</span>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: cfg.color, letterSpacing: '0.06em' }}>
                        ER DIVERSION STATUS: {cfg.labelEn}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>
                        — {cfg.label}
                    </span>
                </div>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                    {data.reason}
                    {' · '}รอ {data.waiting_count} ราย · เฉลี่ย {data.avg_wait_min} นาที
                    {data.resus_count > 0 && ` · Resus ${data.resus_count} ราย`}
                    {data.long_wait_count > 0 && ` · รอ>2ชม. ${data.long_wait_count} ราย`}
                </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: cfg.color }}>{data.critical_pct}%</div>
                <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Critical Cases</div>
            </div>
        </div>
    );
}

export default React.memo(ERTab);
