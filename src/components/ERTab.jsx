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
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';

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
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Executive Intelligence</p>
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
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Surge Forecast</p>
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
            </div>

            {/* ━━━━━━ 🚀 Diagnostic Intelligence Grid — Professional ER KPIs ━━━━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                {aiAnalytics.strategicKPIs.map((k, i) => (
                    <div key={i} className="glass-card" style={{ padding: '0.75rem 1rem', border: '1px solid rgba(203,213,225,0.2)', transition: 'all 0.2s ease' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '18px' }}>{k.icon}</span>
                            <div>
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{k.label}</p>
                                <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>{k.sub}</p>
                            </div>
                        </div>
                        <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                    </div>
                ))}
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

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'Door-to-Doctor', thLabel: 'เวลารอพบแพทย์เฉลี่ย',
                            value: `${avgTTD} min`, color: avgTTD <= 10 ? '#059669' : avgTTD <= 20 ? '#f59e0b' : '#e11d48', icon: '⏱️',
                            desc: `P90: ${p90TTD} min | เฉลี่ย: ${avgTTD} min`,
                            meaning: 'เวลาเฉลี่ยตั้งแต่ผู้ป่วยเข้าประตู ER จนถึงได้พบแพทย์ ยิ่งน้อยยิ่งดี ลดความเสี่ยง Deterioration',
                            calc: 'AVG(doctor_seen_time − enter_er_time) [minutes]',
                            dataSource: 'er_regist + er_nursing_detail (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
                            target: '≤ 10 min (L1-2) / ≤ 30 min (L3)',
                            benchmark: 'JCI: ≤10m (Resus) | สปสช.: ≤30m',
                            aiTip: avgTTD <= 15 ? 'ดีเยี่ยม — ผู้ป่วยพบแพทย์เร็ว' : 'ช้ากว่าเป้า — ตรวจสอบ Boarding และ Fast-track',
                        },
                        {
                            label: 'LWBS Rate', thLabel: 'อัตราออกก่อนพบแพทย์',
                            value: `${lwbs}%`, color: lwbs <= 2 ? '#059669' : lwbs <= 5 ? '#f59e0b' : '#e11d48', icon: '🚶',
                            desc: `ผู้ป่วยที่ออกก่อนได้รับการตรวจ (LWBS)`,
                            meaning: 'Left Without Being Seen — ผู้ป่วยออกก่อนตรวจ สะท้อนความเสี่ยงและความพึงพอใจของผู้ป่วย',
                            calc: '(LWBS Patients ÷ Total ER Visits) × 100',
                            dataSource: 'er_regist + ovst (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 2%',
                            benchmark: 'ACEP: ≤2% | สปสช.: ≤5%',
                            aiTip: lwbs <= 2 ? 'LWBS ต่ำ ผู้ป่วยพึงพอใจ' : 'สูงเกิน — จัด Re-assessment ทุก 20 นาที',
                        },
                        {
                            label: 'Triage SLA', thLabel: 'ความตรงเวลา Triage',
                            value: `${sla}%`, color: sla >= 85 ? '#059669' : sla >= 70 ? '#f59e0b' : '#e11d48', icon: '✅',
                            desc: `ผู้ป่วยได้รับการตรวจตามระดับ Triage ตรงเวลา`,
                            meaning: 'สัดส่วนผู้ป่วยที่ได้รับการตรวจภายในเวลาที่กำหนดตามระดับ Triage (L1: ทันที, L2: ≤15m, L3: ≤30m)',
                            calc: '(Cases within SLA ÷ Total Cases) × 100 [แยกตาม Triage Level]',
                            dataSource: 'er_regist + er_nursing_detail (HOSxP XE)',
                            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
                            target: '≥ 85%',
                            benchmark: 'JCI: ≥90% | HA: ≥85%',
                            aiTip: sla >= 85 ? 'SLA ดี — รักษาคุณภาพ' : 'ต่ำ — ตรวจสอบกำลังคนช่วงพีค',
                        },
                        {
                            label: 'Return Visit 72h', thLabel: 'กลับมาซ้ำภายใน 72 ชั่วโมง',
                            value: `${retVisit}%`, color: retVisit <= 3 ? '#059669' : retVisit <= 5 ? '#f59e0b' : '#e11d48', icon: '🔄',
                            desc: `กลับมาซ้ำ ${retVisit}% จาก ER ทั้งหมด`,
                            meaning: 'อัตราผู้ป่วยที่กลับมา ER ภายใน 72 ชั่วโมง สะท้อนคุณภาพการรักษาเบื้องต้น',
                            calc: '(Return Visits 72h ÷ Total Discharges) × 100',
                            dataSource: 'er_regist (HOSxP XE)',
                            period: `📅 30 วันย้อนหลัง`,
                            target: '≤ 3%',
                            benchmark: 'ACEP: ≤3% | HA: ≤5%',
                            aiTip: retVisit <= 3 ? 'คุณภาพการจำหน่ายดี' : 'สูง — ทบทวน Discharge Criteria',
                        },
                        {
                            label: 'EPI Score', thLabel: 'ดัชนีประสิทธิภาพ ER',
                            value: `${epi}/100`, color: epi >= 80 ? '#059669' : epi >= 60 ? '#f59e0b' : '#e11d48', icon: '🧠',
                            sub: epi >= 80 ? 'ดีเยี่ยม' : epi >= 60 ? 'ปานกลาง' : 'ต้องปรับปรุง',
                            desc: `ER Performance Index — คะแนน AI รวม`,
                            meaning: 'คะแนนรวมประสิทธิภาพ ER จาก AI ถ่วงน้ำหนัก Time-to-Doc, SLA, LWBS, Return Visit',
                            calc: 'SLA×30% + (100−LWBS%)×20% + TTD_Score×30% + (100−Return%)×20%',
                            dataSource: 'คำนวณจาก KPI 1-4 (Composite)',
                            period: `📅 ประมวลผล ${todayShort}`,
                            target: '≥ 80',
                            benchmark: 'BCH Internal: ≥80 = ดีเยี่ยม',
                            aiTip: epi >= 80 ? 'ภาพรวมดีเยี่ยม' : 'ต้องปรับปรุง — ดู KPI ที่ต่ำสุด',
                        },
                    ]} />
                );
            })()}

            {/* ━━━━━━ 📋 Live Patients & Performance Analytics — Consolidated View ━━━━━━ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 1. Live Patient List */}
                <div className="glass-card flex flex-col" style={{ height: '400px' }}>
                    <div className="px-5 py-4 border-b border-[var(--md-divider)] flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[13px] font-bold text-[var(--md-text-primary)] uppercase tracking-tight">Active ER Patients</h3>
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
                    <h3 className="text-[11px] font-bold text-[var(--md-text-tertiary)] uppercase tracking-wider mb-4">Volume & Efficiency Trends</h3>

                    {/* Hourly Heatmap Small */}
                    <div className="flex-1">
                        <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>🕐 Hourly Load (30 Day Average)</p>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={erAnalytics?.hourly_heatmap || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.2)" vertical={false} />
                                <XAxis dataKey="hour" tick={{ fontSize: 8 }} tickFormatter={h => `${h}h`} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ fontSize: '10px' }} />
                                <Bar dataKey="avg" radius={[3, 3, 0, 0]}>
                                    {(erAnalytics?.hourly_heatmap || []).map((d, i) => (
                                        <Cell key={i} fill={d.avg >= 3 ? '#f43f5e' : '#7c3aed'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="mt-6">
                            <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>📈 Monthly Trend (Visits & Criticality)</p>
                            <ResponsiveContainer width="100%" height={120}>
                                <ComposedChart data={erAnalytics?.monthly_trend || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.2)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ fontSize: '10px' }} />
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
            )}



            <div className="grid grid-cols-1 gap-4">
                {/* Load Dynamics */}
                <div className="chart-container">
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
            </div>

            {/* ━━━━━━ รายได้โดยประมาณ ER — ปีงบประมาณ (3 ปีย้อนหลัง) ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #e11d48)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้ ER ประจำปีงบประมาณ
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Data Intelligence</span>
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
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: FY_COLORS[fi] }}>{fy.fiscal_label}</span>
                                        </div>
                                        <p style={{ fontSize: '20px', fontWeight: 900, color: FY_COLORS[fi] }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</p>
                                        <p style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>{fy.total_visits.toLocaleString()} visits</p>
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
