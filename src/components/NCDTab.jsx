// ============================================================
// BCH 360° Intelligence V.10 - NCD Tab (โรคไม่ติดต่อเรื้อรัง)
// 🫀 Professional NCD Analytics + Deep Root-Cause Analysis
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Cell, ComposedChart, Area, Line, PieChart, Pie
} from 'recharts';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';

function NCDTab() {
    const state = useShallowDashboardSelector(s => ({ ncdToday: s.ncdToday, ncdAnalytics: s.ncdAnalytics, loading: s.loading, ncdRiskStratification: s.ncdRiskStratification, ncdRevenueFiscal: s.ncdRevenueFiscal, ncdGoalAttainment: s.ncdGoalAttainment, ncdMonthlyFiscal: s.ncdMonthlyFiscal }));
    const { fetchData } = useDashboardActions();
    const ncdToday = state.ncdToday;
    const ncdAnalytics = state.ncdAnalytics;
    const loading = state.loading;

    useEffect(() => {
        fetchData('ncdToday', '/api/ncd/today');
        fetchData('ncdAnalytics', '/api/ncd/analytics');
        fetchData('ncdRevenueFiscal', '/api/ncd/revenue-fiscal');
        fetchData('ncdMonthlyFiscal', '/api/ncd/monthly-fiscal');
        fetchData('ncdRiskStratification', '/api/ncd/ai/risk-stratification');
        fetchData('ncdGoalAttainment', '/api/ncd/goal-attainment');
    }, [fetchData]);

    const today = ncdToday || {};
    const a_analytics = ncdAnalytics || {};

    // ── Disease Breakdown from today data ──
    const diseaseBreakdown = useMemo(() => {
        const diseases = today.diseases || today.disease_breakdown || {};
        return [
            { code: 'DM', label: 'Diabetes Mellitus', icon: '🩸', count: diseases.dm ?? diseases.DM ?? 0, color: '#e11d48', target: 'HbA1c <7%' },
            { code: 'HT', label: 'Hypertension', icon: '💓', count: diseases.ht ?? diseases.HT ?? 0, color: '#7c3aed', target: 'BP <140/90' },
            { code: 'IHD', label: 'Ischemic Heart Disease', icon: '🫀', count: diseases.ihd ?? diseases.IHD ?? 0, color: '#f59e0b', target: 'LDL <70' },
            { code: 'Stroke', label: 'Cerebrovascular', icon: '🧠', count: diseases.stroke ?? diseases.Stroke ?? 0, color: '#0ea5e9', target: 'BP <130/80' },
            { code: 'COPD', label: 'Chronic Lung Disease', icon: '🫁', count: diseases.copd ?? diseases.COPD ?? 0, color: '#059669', target: 'FEV1 >80%' },
            { code: 'CKD', label: 'Chronic Kidney Disease', icon: '🫘', count: diseases.ckd ?? diseases.CKD ?? 0, color: '#be123c', target: 'eGFR >60' },
        ];
    }, [today]);

    // ── MetricsStrip KPIs (8 items) ──
    const metricsStripData = useMemo(() => {
        const t = today;
        const a = a_analytics;
        const total = t.total ?? 0;
        const completed = t.completed ?? 0;
        const pctComplete = total > 0 ? Math.round((completed / total) * 100) : 0;
        const diseases = t.diseases || t.disease_breakdown || {};
        return [
            { label: 'NCD Visits', value: total.toLocaleString(), unit: 'ราย', icon: '🫀', status: total > 0 ? 'success' : 'warning', target: 'วันนี้ Real-time' },
            { label: 'Unique Patients', value: (t.unique_patients ?? 0).toLocaleString(), unit: 'คน', icon: '👥', status: 'normal', target: 'HN ไม่ซ้ำ' },
            { label: 'DM Cases', value: (diseases.dm ?? diseases.DM ?? 0).toLocaleString(), unit: 'ราย', icon: '🩸', gradient: '#e11d48', status: 'normal', target: 'เบาหวาน' },
            { label: 'HT Cases', value: (diseases.ht ?? diseases.HT ?? 0).toLocaleString(), unit: 'ราย', icon: '💓', gradient: '#7c3aed', status: 'normal', target: 'ความดันสูง' },
            { label: 'Completion', value: `${pctComplete}%`, icon: '✅', status: pctComplete >= 90 ? 'success' : pctComplete >= 70 ? 'warning' : 'critical', target: 'เป้า ≥95%' },
            { label: 'NCI Score', value: `${a.nci ?? 0}`, unit: '/100', icon: '⭐', gradient: '#e11d48', status: (a.nci ?? 0) >= 80 ? 'success' : (a.nci ?? 0) >= 60 ? 'warning' : 'critical', target: 'NCD Control Index' },
            { label: 'Avg Wait', value: `${a.avg_wait_time ?? 0}`, unit: 'min', icon: '⏱️', status: (a.avg_wait_time ?? 30) <= 15 ? 'success' : (a.avg_wait_time ?? 30) <= 30 ? 'warning' : 'critical', target: 'SLA ≤30 min' },
            { label: 'Revenue/Visit', value: `฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()}`, icon: '💰', status: 'normal', target: 'เฉลี่ยต่อ visit' },
        ];
    }, [today, a_analytics]);

    // ── AI Insight Cards (4 cards) ──
    const aiInsightCards = useMemo(() => {
        const a = a_analytics;
        const nci = a.nci ?? 0;
        const avgWait = a.avg_wait_time ?? 0;
        const completionRate = a.completion_rate ?? 0;
        const revisitRate = a.revisit_rate ?? 0;

        return [
            {
                title: 'NCI Score Analysis',
                icon: '⭐',
                priority: nci >= 80 ? 'LOW' : nci >= 60 ? 'MEDIUM' : 'HIGH',
                summary: `NCD Control Index: ${nci}/100 (${nci >= 80 ? 'Grade A' : nci >= 60 ? 'Grade B' : 'Grade C'}) - ${nci >= 80 ? 'ประสิทธิภาพสูง คลินิก NCD ทำงานได้ดีทุกมิติ' : nci >= 60 ? 'มาตรฐานดี แต่มีจุดปรับปรุงได้' : 'ต้องปรับปรุงเร่งด่วน หลายมิติต่ำกว่าเกณฑ์'}`,
                analysis: `NCI คำนวณจาก 5 มิติ: Wait Time (${a.nci_components?.wait_time ?? 0}), Completion (${a.nci_components?.completion ?? 0}), Revisit (${a.nci_components?.revisit ?? 0}), Revenue (${a.nci_components?.revenue ?? 0}), SLA (${a.nci_components?.sla ?? 0}) -- ครอบคลุมทั้ง Operational และ Financial dimension`,
                recommendation: nci >= 80 ? 'คงมาตรฐาน ขยายผลไปคลินิกอื่น เพิ่ม Complication Screening' : 'เร่งแก้ไข Wait Time + Completion Rate เพื่อยกระดับ NCI ≥80',
                gradient: '#e11d48',
                gradientFrom: 'rgba(225,29,72,.08)',
                gradientTo: 'rgba(190,18,60,.04)',
                borderColor: 'rgba(225,29,72,.25)',
                confidence: 92,
            },
            {
                title: 'Disease Control Assessment',
                icon: '🫀',
                priority: completionRate >= 90 ? 'LOW' : completionRate >= 75 ? 'MEDIUM' : 'HIGH',
                summary: `Completion Rate ${completionRate}% | Dropout ${a.dropout_count ?? 0} ราย -- ${completionRate >= 90 ? 'Control ดี ผู้ป่วยส่วนใหญ่รักษาครบ' : 'Dropout สูง เสี่ยง Uncontrolled NCD'}`,
                analysis: `ผู้ป่วย NCD ที่ Dropout (${a.dropout_count ?? 0} ราย) มีความเสี่ยงขาดยา นำไปสู่ Uncontrolled DM/HT ซึ่งเพิ่มโอกาส Complication: Stroke ฿150k+, MI ฿200k+, Dialysis ฿500k+/ปี`,
                recommendation: completionRate >= 90 ? 'เฝ้าระวัง Dropout ใหม่ด้วย SMS/LINE เตือนนัด + Telemedicine' : 'ลด Dropout: (1) Pre-lab ก่อนพบแพทย์ (2) Fast-track Stable NCD (3) SMS/LINE เตือน (4) Telemedicine refill',
                gradient: '#7c3aed',
                gradientFrom: 'rgba(124,58,237,.08)',
                gradientTo: 'rgba(99,102,241,.04)',
                borderColor: 'rgba(124,58,237,.25)',
                confidence: 88,
            },
            {
                title: 'Patient Compliance Tracking',
                icon: '📋',
                priority: revisitRate < 5 ? 'LOW' : revisitRate < 15 ? 'MEDIUM' : 'HIGH',
                summary: `Revisit 7d: ${revisitRate}% (${a.revisit_count ?? 0} ราย) -- ${revisitRate < 5 ? 'Treatment plan ดี ผู้ป่วยควบคุมได้' : revisitRate < 15 ? 'ปานกลาง ตรวจสอบ Planned vs Unplanned' : 'สูง Uncontrolled NCD concern'}`,
                analysis: `การกลับมาภายใน 7 วัน ต้องแยก Planned (Lab follow-up, ปรับยา) vs Unplanned (BP crisis, Hypoglycemia) -- Unplanned revisit สะท้อน Treatment quality และ Drug adherence`,
                recommendation: revisitRate < 5 ? 'RCA ทุกครั้งที่เกิด Unplanned revisit เพื่อป้องกัน' : 'Audit ทุก 7d revisit -- Home BP/FBS monitoring + ปรับยาให้เหมาะสมตั้งแต่ครั้งแรก',
                gradient: '#0ea5e9',
                gradientFrom: 'rgba(14,165,233,.08)',
                gradientTo: 'rgba(6,182,212,.04)',
                borderColor: 'rgba(14,165,233,.25)',
                confidence: 85,
            },
            {
                title: 'Risk Stratification Intelligence',
                icon: '🔥',
                priority: avgWait > 30 ? 'HIGH' : avgWait > 15 ? 'MEDIUM' : 'LOW',
                summary: `Wait Time ${avgWait} min (SLA ≤30min: ${a.wait_sla_pct ?? 0}%) | Over 30min: ${a.wait_over_30m ?? 0} ครั้ง -- ${avgWait <= 15 ? 'Flow ดีเยี่ยม' : avgWait <= 30 ? 'ต้องเฝ้าระวัง' : 'วิกฤต ผู้ป่วยอาจขาดนัด'}`,
                analysis: `NCD Patients ที่รอนาน >30min มีโอกาสขาดนัดครั้งถัดไปสูงขึ้น 2.5x -- ส่งผลให้ขาดยา → Uncontrolled → Complication → IPD cost สูง -- Peak hour: ${a.peak_hour?.label || 'N/A'}`,
                recommendation: avgWait <= 15 ? 'คงมาตรฐาน -- Appointment system ทำงานดี' : 'ลดเวลารอ: (1) Pre-lab ก่อนนัด (2) เพิ่มแพทย์ Peak hour (3) Fast-track Stable NCD (4) Digital queue SMS',
                gradient: '#f43f5e',
                gradientFrom: 'rgba(244,63,94,.08)',
                gradientTo: 'rgba(225,29,72,.04)',
                borderColor: 'rgba(244,63,94,.25)',
                confidence: 90,
            },
        ];
    }, [a_analytics]);

    return (
        <div className="space-y-4 animate-fade-in pb-8">

            {/* ━━━ MetricsStrip — 8 KPI Overview ━━━ */}
            <MetricsStrip metrics={metricsStripData} />

            {/* ━━━ AI Analytics Cards — 4 Intelligence Panels ━━━ */}
            <SubErrorBoundary name="AI Analytics Cards">
            {!loading.ncdAnalytics && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #e11d48, #7c3aed)', borderRadius: '99px' }} />
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                            🧠 AI Intelligence Cards — NCD
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(225,29,72,.08)', padding: '2px 8px', borderRadius: '99px' }}>4 Analytics Modules</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                        {aiInsightCards.map((card, i) => (
                            <AIInsightCard key={i} {...card} />
                        ))}
                    </div>
                </>
            )}
            </SubErrorBoundary>

            {/* ━━━ Disease Breakdown — 6 NCD Categories ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #e11d48, #be123c)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🏷️ Disease Breakdown — NCD Categories
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(225,29,72,.08)', padding: '2px 8px', borderRadius: '99px' }}>DM/HT/IHD/Stroke/COPD/CKD</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {diseaseBreakdown.map((d) => {
                    const maxCount = Math.max(...diseaseBreakdown.map(x => x.count), 1);
                    const pctBar = Math.round((d.count / maxCount) * 100);
                    return (
                        <div key={d.code} style={{
                            padding: '1rem 1.25rem', borderRadius: '14px',
                            background: `linear-gradient(135deg, ${d.color}08, ${d.color}03)`,
                            border: `1.5px solid ${d.color}20`,
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: d.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.code}</span>
                                <span style={{ fontSize: '18px' }}>{d.icon}</span>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 900, color: d.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{d.count.toLocaleString()}</div>
                            <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '2px' }}>{d.label}</div>
                            <div style={{ height: '4px', background: `${d.color}15`, borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
                                <div style={{ width: `${pctBar}%`, height: '100%', background: d.color, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                            </div>
                            <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '3px' }}>Target: {d.target}</div>
                        </div>
                    );
                })}
            </div>

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '12px' }}>

                {/* ── NCD วันนี้ (Hero Card) ── */}
                <div style={{
                    gridColumn: 'span 2', padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(225,29,72,.12) 0%, rgba(190,18,60,.06) 100%)',
                    border: '1px solid rgba(225,29,72,.2)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,29,72,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.ncdToday ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '120px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (() => {
                        const total = today.total ?? 0;
                        const completed = today.completed ?? 0;
                        const waiting = today.waiting ?? 0;
                        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e11d48', margin: 0 }}>
                                        🫀 NCD Clinic วันนี้ — DM/HT/IHD/Stroke/COPD/CKD
                                    </p>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(225,29,72,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        Real-time
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#e11d48', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(225,29,72,.3)' }}>
                                        {total.toLocaleString('th-TH')}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>ราย</span>
                                    {today.today_vs_yesterday_pct !== undefined && today.today_vs_yesterday_pct !== 0 && (
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                            background: today.today_vs_yesterday_pct > 0 ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)',
                                            color: today.today_vs_yesterday_pct > 0 ? '#10b981' : '#ef4444',
                                        }}>
                                            {today.today_vs_yesterday_pct > 0 ? '▲' : '▼'} {Math.abs(today.today_vs_yesterday_pct)}% vs เมื่อวาน
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                        background: 'rgba(16,185,129,.1)', color: '#10b981',
                                    }}>
                                        ✅ {completed.toLocaleString('th-TH')} เสร็จ ({pct}%)
                                    </span>
                                    {waiting > 0 && (
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                            background: 'rgba(245,158,11,.1)', color: '#f59e0b',
                                        }}>
                                            ⏳ {waiting} รอ
                                        </span>
                                    )}
                                    {today.unique_patients > 0 && (
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                                            👤 Unique: {today.unique_patients}
                                        </span>
                                    )}
                                </div>

                                {/* Completion bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>✅ เสร็จสิ้น {completed.toLocaleString('th-TH')} ({pct}%)</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>รอรับบริการ {waiting.toLocaleString('th-TH')}</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(245,158,11,.12)', display: 'flex' }}>
                                        <div style={{ width: `${Math.min(100, pct)}%`, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                        <div style={{ flex: 1, background: 'rgba(245,158,11,.2)', borderRadius: '0 99px 99px 0' }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ── Mini KPI Cards ── */}
                {[
                    {
                        title: 'Unique Patients', value: today.unique_patients ?? 0, icon: '👥', unit: 'คน',
                        grad: ['#0ea5e9', '#0284c7'], glow: 'rgba(14,165,233,.2)',
                        loading: loading.ncdToday,
                    },
                    {
                        title: 'สำเร็จวันนี้',
                        value: (today.total ?? 0) > 0 ? `${Math.round((today.completed ?? 0) / today.total * 100)}%` : '—',
                        icon: '✅', unit: '',
                        grad: (today.total > 0 && (today.completed / today.total) >= 0.8) ? ['#10b981', '#059669'] : ['#f59e0b', '#d97706'],
                        glow: 'rgba(16,185,129,.2)',
                        loading: loading.ncdToday,
                    },
                    {
                        title: 'ชาย/หญิง', value: `${today.male || 0}/${today.female || 0}`, icon: '👤', unit: '',
                        grad: ['#8b5cf6', '#7c3aed'], glow: 'rgba(139,92,246,.2)',
                        loading: loading.ncdToday,
                    },
                    {
                        title: 'ผู้สูงอายุ', value: today.elderly ?? 0, icon: '👴', unit: 'ราย',
                        grad: (today.elderly ?? 0) > 10 ? ['#8b5cf6', '#7c3aed'] : ['#e11d48', '#be123c'],
                        glow: 'rgba(139,92,246,.2)',
                        loading: loading.ncdToday,
                    },
                ].map((kpi, i) => (
                    <div key={`ncd-kpi-${i}`} style={{
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
                                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>
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

            {/* ━━━━━ NCI + Advanced NCD Analytics Panel ━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #e11d48, #be123c)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🫀 Advanced Analytics — NCD
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(225,29,72,.08)', padding: '2px 8px', borderRadius: '99px' }}>30d · HOSxP XE · DM/HT/IHD/Stroke/COPD/CKD</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ncdAnalytics ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '56px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = ncdAnalytics || {};
                    const nci = a.nci ?? 0;
                    const nciColor = nci >= 80 ? '#10b981' : nci >= 60 ? '#f59e0b' : '#f43f5e';
                    const nciGrade = nci >= 90 ? 'A+' : nci >= 80 ? 'A' : nci >= 70 ? 'B+' : nci >= 60 ? 'B' : nci >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(nci / 100, 1) * circumference;

                    const nciComp = a.nci_components || {};
                    const nciRadar = [
                        { name: 'Wait Time', score: nciComp.wait_time || 0 },
                        { name: 'Completion', score: nciComp.completion || 0 },
                        { name: 'Revisit', score: nciComp.revisit || 0 },
                        { name: 'Revenue', score: nciComp.revenue || 0 },
                        { name: 'SLA', score: nciComp.sla || 0 },
                    ];

                    const tier1Cards = [
                        {
                            icon: '⏱️', label: 'เวลารอเฉลี่ย',
                            value: `${a.avg_wait_time ?? 0} min`,
                            sub: `σ ${a.sd_wait_time ?? 0}min · SLA ≤30min: ${a.wait_sla_pct ?? 0}%`,
                            desc: 'เวลารอก่อนพบแพทย์ NCD Clinic (30 วัน)',
                            color: (a.avg_wait_time ?? 30) <= 15 ? '#10b981' : (a.avg_wait_time ?? 30) <= 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.avg_wait_time ?? 30) <= 15
                                ? `รอเฉลี่ย ${a.avg_wait_time ?? 0} min — ดีเยี่ยม SLA ${a.wait_sla_pct ?? 0}%`
                                : (a.avg_wait_time ?? 30) <= 30
                                    ? `รอเฉลี่ย ${a.avg_wait_time ?? 0} min (σ ${a.sd_wait_time ?? 0}) — มี ${a.wait_over_30m ?? 0} ครั้งที่รอ >30min ผู้ป่วยเรื้อรังต้องมาบ่อย → รอนาน = ไม่มาตามนัด`
                                    : `🚨 รอเฉลี่ย ${a.avg_wait_time ?? 0} min — สูง! ${a.wait_over_30m ?? 0} ครั้ง >30min ผู้ป่วยอาจ ขาดนัด ส่งผล Uncontrolled NCD`,
                            recommend: (a.avg_wait_time ?? 30) <= 15
                                ? '✅ คงมาตรฐาน — Appointment system ทำงานดี'
                                : '📋 ลดเวลารอ: (1) NCD Clinic appointment slot (2) เพิ่มแพทย์ช่วง Peak (3) Fast-track สำหรับ Stable NCD (4) SMS แจ้งคิว (5) เป้าหมาย: ≤15 min',
                        },
                        {
                            icon: '🕐', label: 'เวลารวม (Visit)',
                            value: `${a.avg_total_time ?? 0} min`,
                            sub: `σ ${a.sd_total_time ?? 0}min`,
                            desc: 'เวลาเฉลี่ยทั้งกระบวนการ ลงทะเบียน→ตรวจ→Lab→รับยา',
                            color: (a.avg_total_time ?? 60) <= 45 ? '#10b981' : (a.avg_total_time ?? 60) <= 60 ? '#f59e0b' : '#f43f5e',
                            problem: `เวลารวม ${a.avg_total_time ?? 0} min (σ ${a.sd_total_time ?? 0}) — ${(a.avg_total_time ?? 60) <= 45 ? 'ดี Flow ลื่นไหล' : '⚠️ NCD ต้องรอ Lab + พบแพทย์ + รับยา หลายจุด'}`,
                            recommend: '📋 ลดเวลารวม: (1) Lab ก่อนพบแพทย์ (Pre-lab) (2) Digital payment (3) ตู้ยาอัตโนมัติ (4) Lean flow',
                        },
                        {
                            icon: '📊', label: 'Avg Daily Visits',
                            value: `${a.avg_daily_visits ?? 0}`,
                            sub: `${(a.total_visits ?? 0).toLocaleString()} ราย / 30 วัน · ${a.unique_patients ?? 0} patients`,
                            desc: 'จำนวน NCD visits เฉลี่ยต่อวัน',
                            color: '#0ea5e9',
                            problem: `เฉลี่ย ${a.avg_daily_visits ?? 0} ราย/วัน · Unique ${a.unique_patients ?? 0} คน — ${(a.avg_daily_visits ?? 0) > 80 ? '⚠️ Volume สูง ตรวจสอบ Capacity' : 'Volume ปกติ'}`,
                            recommend: '📋 Capacity: (1) วิเคราะห์ Clinic utilization (2) เพิ่มแพทย์ NCD ถ้า >85% (3) Group visit สำหรับ Stable patients',
                        },
                        {
                            icon: '⏰', label: 'Wait >30 min',
                            value: `${a.wait_over_30m ?? 0}`,
                            sub: `จาก 30 วัน`,
                            desc: 'จำนวนครั้งที่รอนานเกิน 30 นาที',
                            color: (a.wait_over_30m ?? 0) < 10 ? '#10b981' : (a.wait_over_30m ?? 0) < 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.wait_over_30m ?? 0) < 10
                                ? `Wait >30min เพียง ${a.wait_over_30m ?? 0} ครั้ง — Flow ดี`
                                : `Wait >30min ${a.wait_over_30m ?? 0} ครั้ง — ${(a.wait_over_30m ?? 0) >= 30 ? '🚨 บ่อยเกินไป! NCD patients อาจขาดนัด' : 'ต้องเฝ้าระวัง'}`,
                            recommend: (a.wait_over_30m ?? 0) < 10
                                ? '✅ ดี — RCA ทุกครั้งที่เกิด wait >30min'
                                : '📋 ลด Long wait: (1) Pre-lab ก่อนนัด (2) เพิ่มแพทย์ Peak (3) Fast-track Stable NCD (4) Telemedicine refill ยา',
                        },
                    ];

                    const tier2Cards = [
                        {
                            icon: '✅', label: 'Completion Rate',
                            value: `${a.completion_rate ?? 0}%`,
                            sub: `Dropout ${a.dropout_count ?? 0} ราย`,
                            desc: '% ผู้ป่วย NCD ที่ตรวจเสร็จสิ้น',
                            color: (a.completion_rate ?? 0) >= 95 ? '#10b981' : (a.completion_rate ?? 0) >= 85 ? '#f59e0b' : '#f43f5e',
                            problem: (a.completion_rate ?? 0) >= 95
                                ? `Completion ${a.completion_rate ?? 0}% — ดีเยี่ยม`
                                : `Completion ${a.completion_rate ?? 0}% — Dropout ${a.dropout_count ?? 0} ราย ${(a.completion_rate ?? 0) < 85 ? '⚠️ NCD dropout = ขาดยา = Uncontrolled' : ''}`,
                            recommend: '📋 ลด Dropout: (1) SMS เตือนก่อนนัด (2) ลด Wait time (3) Telemedicine สำหรับ Stable (4) เป้าหมาย: ≥95%',
                        },
                        {
                            icon: '🔄', label: 'Revisit 7 วัน',
                            value: `${a.revisit_rate ?? 0}%`,
                            sub: `${a.revisit_count ?? 0} ราย กลับมาภายใน 7 วัน`,
                            desc: '% ผู้ป่วยที่กลับมาอีกในสัปดาห์',
                            color: (a.revisit_rate ?? 0) < 5 ? '#10b981' : (a.revisit_rate ?? 0) < 15 ? '#f59e0b' : '#f43f5e',
                            problem: (a.revisit_rate ?? 0) < 5
                                ? `Revisit ${a.revisit_rate ?? 0}% — ต่ำ Treatment plan ดี`
                                : `Revisit ${a.revisit_rate ?? 0}% — ${(a.revisit_rate ?? 0) >= 15 ? '⚠️ สูง! อาจมี Uncontrolled NCD กลับมาซ้ำ' : 'ปานกลาง ตรวจสอบ Comorbidity'}`,
                            recommend: '📋 Review: (1) แยก Planned vs Unplanned revisit (2) Audit: Uncontrolled BP/FBS? (3) ปรับยาให้เหมาะสม (4) Home monitoring',
                        },
                    ];

                    const tier3Cards = [
                        {
                            icon: '💰', label: 'รายได้ / Visit',
                            value: `฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()}`,
                            sub: `Max ฿${(a.max_revenue ?? 0).toLocaleString()} · Daily ฿${(a.daily_revenue ?? 0).toLocaleString()}`,
                            desc: 'รายได้เฉลี่ยต่อ 1 visit NCD',
                            color: '#0ea5e9',
                            problem: `Avg Rev/Visit ฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()} — ${(a.avg_revenue_per_visit ?? 0) < 500 ? '⚠️ ต่ำ NCD ควรมี Lab+ยา ตรวจสอบ billing' : 'สอดคล้องกับ NCD service'}`,
                            recommend: '📋 Optimize: (1) ตรวจสอบ Lab billing ครบ (2) เพิ่ม Screening packages (3) ลด Free visit % (4) Annual NCD screening',
                        },
                        {
                            icon: '💵', label: 'รายได้รวม (30d)',
                            value: `฿${((a.total_revenue ?? 0) / 1000).toFixed(0)}k`,
                            sub: `${(a.total_visits ?? 0).toLocaleString()} visits`,
                            desc: 'รายได้รวม NCD Clinic 30 วัน',
                            color: '#10b981',
                            problem: `Revenue ฿${((a.total_revenue ?? 0) / 1000).toFixed(0)}k / 30 วัน จาก ${(a.total_visits ?? 0).toLocaleString()} visits`,
                            recommend: '📋 เพิ่มรายได้: (1) Annual NCD screening packages (2) Complication screening (Eye/Foot/Kidney) (3) Corporate health check',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={nciColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={nciColor} fontFamily="'Outfit',sans-serif">{nci}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">NCI Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: nciColor }}>{nciGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: nciColor }}>
                                            {nci >= 80 ? 'ประสิทธิภาพสูง' : nci >= 60 ? 'ระดับมาตรฐาน' : 'ต้องปรับปรุง'}
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>NCD Control Index</div>
                                    </div>
                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>NCI Components</p>
                                        {nciRadar.map((c, i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '64px', textAlign: 'right', flexShrink: 0 }}>{c.name}</span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: barColor, width: '24px', textAlign: 'right' }}>{c.score}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { title: 'Wait Time & Flow', color: '#f43f5e', cards: tier1Cards },
                                        { title: 'Quality & Outcomes', color: '#0ea5e9', cards: tier2Cards },
                                        { title: 'Financial Intelligence', color: '#f59e0b', cards: tier3Cards },
                                    ].map((tier, ti) => (
                                        <div key={ti}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '3px', height: '14px', background: `linear-gradient(180deg, ${tier.color}, ${tier.color}99)`, borderRadius: '99px' }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tier.title}</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                                {tier.cards.map((k, i) => (
                                                    <div key={i} style={{ padding: '8px 10px', borderRadius: '10px', background: `${k.color}06`, border: `1px solid ${k.color}20` }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: '18px', flexShrink: 0 }}>{k.icon}</span>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
                                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.desc}</p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                                            </div>
                                                        </div>
                                                        {k.problem && (
                                                            <div style={{ marginTop: '6px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>📊 วิเคราะห์สถานการณ์</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.problem}</p>
                                                            </div>
                                                        )}
                                                        {k.recommend && (
                                                            <div style={{ marginTop: '4px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>💡 แนะนำเชิงนโยบาย</p>
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

                            {/* Charts Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🕐 Hourly Load (30 วัน)</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <BarChart data={(a.hourly_pattern || []).filter(h => h.avg > 0)} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 8, fontWeight: 700 }} axisLine={false} tickLine={false}
                                                tickFormatter={l => l.replace(':00', '')} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={20} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v) => [`${v} ราย/วัน`, 'เฉลี่ย']} />
                                            <Bar dataKey="avg" radius={[3, 3, 0, 0]} barSize={8}>
                                                {(a.hourly_pattern || []).filter(h => h.avg > 0).map((d, i) => (
                                                    <Cell key={i} fill={d.hour === a.peak_hour?.hour ? '#f43f5e' : '#e11d48'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>👥 Age Distribution (30 วัน)</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <BarChart data={a.age_distribution || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="group" tick={{ fill: '#6b7280', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={24} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v) => [`${v} ราย`, 'จำนวน']} />
                                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={18}>
                                                {(a.age_distribution || []).map((_, i) => {
                                                    const colors = ['#10b981', '#f59e0b', '#eab308', '#f43f5e', '#e11d48'];
                                                    return <Cell key={i} fill={colors[i] || '#7c3aed'} />;
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>📈 Monthly Trend (6 เดือน)</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <ComposedChart data={a.monthly_trend || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#10b981', fontSize: 9 }} axisLine={false} tickLine={false} width={28}
                                                tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => {
                                                    if (n === 'visits') return [`${v} ราย`, 'จำนวน'];
                                                    if (n === 'total_rev') return [`฿${v.toLocaleString()}`, 'รายได้'];
                                                    return [`${v}`, n];
                                                }} />
                                            <Bar yAxisId="left" dataKey="visits" fill="rgba(225,29,72,.25)" radius={[4, 4, 0, 0]} barSize={14} />
                                            <Line yAxisId="right" type="monotone" dataKey="total_rev" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Top Diagnoses */}
                            <div style={{ borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🏷️ Top NCD Diagnoses (30 วัน)</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                                    {(a.top_diagnoses || []).slice(0, 8).map((d, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '8px', background: i === 0 ? 'rgba(225,29,72,.06)' : 'transparent' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#e11d48', width: '16px', textAlign: 'center' }}>{i + 1}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', fontFamily: 'JetBrains Mono, monospace', width: '48px', flexShrink: 0 }}>{d.icd10}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#e11d48', flexShrink: 0 }}>{d.count}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', flexShrink: 0 }}>฿{d.avg_rev?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ ⏱️ Cycle Time & Step Breakdown — NCD ━━━━━━ */}
            {(() => {
                const fiscalData = state.ncdMonthlyFiscal;
                const a = ncdAnalytics || {};
                const wSteps = a.wait_steps || {};
                const rawSteps = [
                    { raw: wSteps.registration_to_screening || 0 },
                    { raw: wSteps.screening_to_doctor || 0 },
                    { raw: wSteps.doctor_to_pharmacy || 0 },
                    { raw: wSteps.pharmacy_to_finance || 0 },
                ];
                const rawTotal = rawSteps.reduce((s, st) => s + st.raw, 0);
                const trueTotal = a.avg_total_time || rawTotal || 0;
                const scale = rawTotal > 0 ? trueTotal / rawTotal : 1;
                const medianCycle = a.estimated_median_cycle || Math.round(trueTotal * 0.85);
                // Find bottleneck
                const stepDefs = [
                    { icon: '📋', label: 'ลงทะเบียน', sub: 'เช็คอิน → คัดกรอง', color: '#7c3aed', warn: 15, critical: 30 },
                    { icon: '🔬', label: 'คัดกรอง', sub: 'คัดกรอง → พบแพทย์', color: '#0ea5e9', warn: 30, critical: 60 },
                    { icon: '🩺', label: 'ตรวจรักษา', sub: 'พบแพทย์ → รับยา', color: '#8b5cf6', warn: 20, critical: 45 },
                    { icon: '💊', label: 'รับยา', sub: 'รับยา → ชำระเงิน', color: '#10b981', warn: 15, critical: 30 },
                ];
                const steps = stepDefs.map((d, i) => ({ ...d, value: Math.round(rawSteps[i].raw * scale) }));
                const bottleneck = steps.reduce((max, s) => s.value > (max?.value || 0) ? s : max, steps[0]);

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Fiscal Monthly Cycle Time Chart */}
                        {fiscalData?.months && (
                            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', margin: 0 }}>
                                            📅 ระยะเวลาบริการรวม (Cycle Time) — NCD Clinic ปีงบ {fiscalData.fiscal_year_be}
                                        </h3>
                                        <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>ตุลาคม–กันยายน · แยกตามขั้นตอน · main_dep 024</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>เฉลี่ยทั้งปี</span>
                                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#7c3aed' }}>{fiscalData.benchmark_avg} น.</p>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ผู้ป่วยสะสม</span>
                                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#0f766e' }}>{fiscalData.months.reduce((s, m) => s + m.total_visits, 0).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={240}>
                                    <ComposedChart data={fiscalData.months.filter(m => m.has_data)} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={30} unit="น" />
                                        <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                            formatter={(v, name) => [`${v} นาที`, name === 'avg_reg' ? 'ลงทะเบียน' : name === 'avg_screen' ? 'คัดกรอง' : name === 'avg_doc' ? 'ตรวจรักษา' : name === 'avg_total' ? 'Cycle Time' : name]} />
                                        <Area type="monotone" dataKey="avg_reg" stackId="1" fill="#c4b5fd" stroke="#7c3aed" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="avg_screen" stackId="1" fill="#93c5fd" stroke="#0ea5e9" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="avg_doc" stackId="1" fill="#a5b4fc" stroke="#6366f1" fillOpacity={0.6} />
                                        <Line type="monotone" dataKey="avg_total" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 4, fill: '#e11d48' }} name="Cycle Time" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
                                    {[{ label: 'ลงทะเบียน', color: '#c4b5fd' }, { label: 'คัดกรอง', color: '#93c5fd' }, { label: 'ตรวจรักษา', color: '#a5b4fc' }, { label: 'รับยา', color: '#86efac' }].map((l, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>{l.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step Breakdown — Today */}
                        {trueTotal > 0 && (
                            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', margin: 0 }}>
                                            ⏱️ ขั้นตอนการรับบริการ NCD Clinic
                                        </h3>
                                        <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>เวลาเฉลี่ยในแต่ละขั้นตอน (30 วัน)</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,.08)', borderRadius: '999px', padding: '6px 14px' }}>
                                            <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>Cycle Time</span>
                                            <span style={{ fontSize: '20px', fontWeight: 900, color: '#7c3aed' }}>{trueTotal}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>นาที</span>
                                        </div>
                                        <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', marginTop: '3px' }}>
                                            {medianCycle > 0 && <span>Median ≈ {medianCycle} น. · </span>}
                                            {bottleneck?.value > 30 && <span style={{ color: '#f43f5e', fontWeight: 700 }}>คอขวด: {bottleneck.label} ({bottleneck.value} น.)</span>}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto' }}>
                                    {steps.map((step, i, arr) => {
                                        const v = step.value;
                                        const isCrit = v >= step.critical;
                                        const isWarn = v >= step.warn && !isCrit;
                                        const sColor = isCrit ? '#f43f5e' : isWarn ? '#f59e0b' : '#10b981';
                                        const sLabel = isCrit ? 'ช้ามาก' : isWarn ? 'ช้า' : 'ปกติ';
                                        const maxV = step.critical * 1.5 || 60;
                                        return (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: '1 1 0', minWidth: '120px' }}>
                                                <div style={{ flex: 1, padding: '10px', borderRadius: '12px', background: `${step.color}08`, border: `1px solid ${step.color}18`, textAlign: 'center' }}>
                                                    <span style={{ fontSize: '18px' }}>{step.icon}</span>
                                                    <p style={{ margin: '2px 0 0', fontSize: '11px', fontWeight: 800, color: step.color }}>{step.label}</p>
                                                    <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)' }}>{step.sub}</p>
                                                    <p style={{ margin: '6px 0 2px', fontSize: '22px', fontWeight: 900, color: step.color }}>{v}</p>
                                                    <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)' }}>นาที</p>
                                                    <div style={{ height: '4px', borderRadius: '99px', background: `${step.color}15`, marginTop: '6px', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${Math.min(100, (v / maxV) * 100)}%`, background: sColor, borderRadius: '99px' }} />
                                                    </div>
                                                    <span style={{ fontSize: '9px', fontWeight: 700, color: sColor, background: `${sColor}10`, padding: '1px 6px', borderRadius: '99px', marginTop: '4px', display: 'inline-block' }}>{sLabel}</span>
                                                </div>
                                                {i < arr.length - 1 && (
                                                    <div style={{ padding: '0 4px', color: 'var(--md-text-tertiary)', fontSize: '14px', fontWeight: 700 }}>→</div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — NCD ━━━━━━ */}
            {!loading.ncdAnalytics && ncdAnalytics && (() => {
                const a = ncdAnalytics || {};
                const nci = a.nci ?? 0;
                const avgWait = a.avg_wait_time ?? 0;
                const sdWait = a.sd_wait_time ?? 0;
                const waitOver30m = a.wait_over_30m ?? 0;
                const waitSlaPct = a.wait_sla_pct ?? 0;
                const completionRate = a.completion_rate ?? 0;
                const dropoutCount = a.dropout_count ?? 0;
                const revisitRate = a.revisit_rate ?? 0;
                const totalVisits = a.total_visits ?? 0;
                const avgRevenue = a.avg_revenue_per_visit ?? 0;
                const peakHour = a.peak_hour?.label || '—';
                const collRate = a.collection_rate ?? 0;
                const claimSuccess = a.claim_success ?? 0;
                const badDebtRatio = a.bad_debt_ratio ?? 0;
                const daysAR = a.days_in_ar ?? 0;

                const problems = [];

                if (avgWait > 20) {
                    problems.push({
                        priority: 1, severity: avgWait > 30 ? 'critical' : 'warning',
                        title: `🔴 เวลารอสูง: ${avgWait} min (σ ${sdWait}) — SLA ≤30min ผ่านเพียง ${waitSlaPct}% · ${waitOver30m} ครั้ง >30min`,
                        rootCause: `ผู้ป่วย NCD รอเฉลี่ย ${avgWait} นาที (σ ${sdWait}) ── สาเหตุ: (1) NCD Clinic volume สูง — DM+HT คิวยาว (2) Lab result ช้า → แพทย์ต้องรอผล (3) Multi-morbidity ใช้เวลาตรวจนาน (4) Peak hour ${peakHour} — ผู้ป่วยกระจุกเช้า (5) แพทย์ NCD ไม่เพียงพอ`,
                        cascadeEffect: `Wait สูง → ผู้ป่วย NCD ขาดนัด (${dropoutCount} ราย) → ขาดยา → Uncontrolled DM/HT → Complication (Stroke/MI/CKD) → IPD cost สูง ● NCI ลดลง (${nci}/100)`,
                        fixFirst: `🔧 ด่วนที่สุด: (1) Pre-lab ก่อนนัดพบแพทย์ (2) Fast-track Stable NCD — refill ยาอย่างเดียว (3) เพิ่มแพทย์ช่วง Peak ${peakHour} (4) Telemedicine สำหรับ Follow-up (5) เป้าหมาย: ≤15 min`,
                        color: avgWait > 30 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (collRate < 85) {
                    problems.push({
                        priority: 2, severity: collRate < 75 ? 'critical' : 'warning',
                        title: `🔴 วิกฤต: Collection Rate NCD (${collRate}%) ต่ำกว่ามาตรฐาน (85%)`,
                        rootCause: `ส่วนต่างระหว่างยอดเรียกเก็บและยอดรับเงิน NCD สูง ── สาเหตุ: (1) Denial สิทธิ์ UC/SSS จากการลงรหัส DM/HT complication ไม่ครบ (2) ยังไม่ทำ Reconciliation ยอดค้างสิทธิ์รัฐ (3) ขาดการติดตามส่วนต่าง Lab/ยา นอกสิทธิ์`,
                        cascadeEffect: `Cash Flow NCD Clinic ตึงตัว ── รายได้ทางบัญชีสูงแต่เงินเข้าจริงไม่ถึง ── เพิ่มภาระการติดตามหนี้ (Account Receivable) ● Revenue Loss สะสม`,
                        fixFirst: `🔧 Urgent Actions: (1) Audit เคส NCD ที่มี Denial สูงสุด (2) เร่ง Reconciliation ยอดค้างสิทธิ์ประกันสังคม NCD (3) ปรับปรุงกระบวนการ Pre-authorization สำหรับยา Specialty NCD`,
                        color: collRate < 75 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (completionRate < 90) {
                    problems.push({
                        priority: 3, severity: completionRate < 80 ? 'critical' : 'warning',
                        title: `🟡 Completion Rate ต่ำ: ${completionRate}% — Dropout ${dropoutCount} ราย`,
                        rootCause: `${completionRate}% เท่านั้นที่ตรวจ NCD เสร็จ — ${dropoutCount} ราย Dropout ── สาเหตุ: (1) Wait time นาน → กลับก่อน (2) Lab+พบแพทย์+รับยา หลายจุด (3) ค่าใช้จ่ายสะสมสูง (4) ผู้ป่วยรู้สึกดี → คิดว่าไม่ต้องมา`,
                        cascadeEffect: `NCD Dropout → ขาดยา → BP/FBS Uncontrolled → Complication (Stroke ฿150k+, MI ฿200k+, Dialysis ฿500k+/ปี) → ต้นทุนพุ่ง ● Revenue loss ฿${(dropoutCount * avgRevenue).toLocaleString()}`,
                        fixFirst: `🔧 ลด Dropout: (1) แจ้ง Wait estimate ทุกราย (2) Telemedicine refill (3) Community NCD Clinic (4) SMS/LINE เตือนนัด (5) เป้าหมาย: Completion ≥95%`,
                        color: completionRate < 80 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (claimSuccess < 90) {
                    problems.push({
                        priority: 4, severity: 'warning',
                        title: `⚠️ Claim Success Rate NCD เพียง ${claimSuccess}% (Target > 90%)`,
                        rootCause: `การส่งเบิก e-Claim NCD ถูกปฏิเสธ ── สาเหตุ: (1) ICD-10 Complication ไม่สอดคล้องกับ Lab Evidence (2) Lab ผลออกไม่ทันเวลาส่งเบิก (3) ข้อมูลเวชระเบียน DM/HT ไม่สมบูรณ์`,
                        cascadeEffect: `เสียสิทธิ์การเบิกจ่าย NCD Revenue ── เพิ่ม Workload ฝ่าย Coder ที่ต้อง Appeal ── ยอดเรียกเก็บค้างนาน (Days A/R ${daysAR}d)`,
                        fixFirst: `🔧 Corrective Plan: (1) ใช้ AI Coder ช่วยตรวจสอบความสอดคล้อง Lab vs DX (2) อบรมการลงรหัส NCD Complication (3) Sync ผล Lab เข้า e-Claim อัตโนมัติ`,
                        color: '#f59e0b',
                    });
                }

                if (revisitRate > 10) {
                    problems.push({
                        priority: 5, severity: revisitRate > 20 ? 'critical' : 'warning',
                        title: `🟡 Revisit 7d สูง: ${revisitRate}% — Uncontrolled NCD Concern`,
                        rootCause: `${revisitRate}% กลับมาภายใน 7 วัน — ต้องแยก: (1) Planned (Lab follow-up, ปรับยา) vs (2) Unplanned (BP crisis, Hypoglycemia, Complication) ● Unplanned revisit สะท้อน Treatment quality`,
                        cascadeEffect: `Unplanned revisit → เพิ่ม Workload → Wait time เพิ่ม → NCD patients อื่นรอนาน → ขาดนัด → Uncontrolled เพิ่ม = วงจรลบ`,
                        fixFirst: `🔧 ลด Unplanned Revisit: (1) Audit ทุก 7d revisit — แยก Planned vs Complication (2) Home BP/FBS monitoring (3) ปรับยาให้เหมาะสมตั้งแต่ครั้งแรก (4) Hotline สำหรับ NCD emergency`,
                        color: revisitRate > 20 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (badDebtRatio > 5) {
                    problems.push({
                        priority: 6, severity: 'warning',
                        title: `🕵️ ความเสี่ยงหนี้สูญ: NCD Bad Debt Ratio ${badDebtRatio}%`,
                        rootCause: `ผู้ป่วย NCD สิทธิ์ชำระเงินเองหรือส่วนต่าง มีการค้างชำระเพิ่มขึ้น ── สาเหตุ: (1) ไม่มีการประเมินราคายา NCD ล่วงหน้า (2) ระบบติดตามหนี้ขาดต่อเนื่องสำหรับผู้ป่วยเรื้อรัง`,
                        cascadeEffect: `กระทบ Net Profit NCD Clinic ── ต้องตั้งสำรองหนี้สูญเพิ่มขึ้น (Allowances) ── Profit Margin ระยะยาวลดลง`,
                        fixFirst: `🔧 Risk Mitigation: (1) แจ้งประมาณการค่ายา NCD ล่วงหน้า (2) นามเสนอระบบแบ่งจ่ายค่ายา Specialty (3) ทีม Tele-tracking ติดตามค้างจ่ายภายใน 14 วัน`,
                        color: '#f59e0b',
                    });
                }

                if (problems.length === 0) {
                    problems.push({
                        priority: 0, severity: 'good',
                        title: '✅ NCD Clinic ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `NCI ${nci}/100 · Wait ${avgWait}min · Completion ${completionRate}% · Collection ${collRate}% — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — NCD Clinic มีประสิทธิภาพทั้ง Operational และ Financial`,
                        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ NCI ≥ ${Math.min(nci + 10, 100)} (2) เพิ่ม Complication screening (3) DM/HT control rate monitoring`,
                        color: '#10b981',
                    });
                }

                problems.sort((a, b) => a.priority - b.priority);
                const critCount = problems.filter(p => p.severity === 'critical').length;
                const warnCount = problems.filter(p => p.severity === 'warning').length;
                const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);
                const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
                const urgencyLabel = urgencyScore >= 7 ? 'ต้องดำเนินการทันที' : urgencyScore >= 4 ? 'ควรแก้ไขเร็ว' : 'สถานการณ์ปกติ';

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>🔥 Deep Root-Cause Analysis</span>
                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>Cross-analysis NCD + RCM</span>
                        </div>
                        <div className={`glass-card ${urgencyScore >= 7 ? 'alert-critical' : urgencyScore >= 4 ? 'alert-warning' : ''}`} style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '14px', background: `linear-gradient(135deg, ${urgencyColor}08, ${urgencyColor}03)`, border: `1px solid ${urgencyColor}20`, marginBottom: '1.25rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 800, color: urgencyColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ระดับความเร่งด่วนรวม — NCD Clinic</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: urgencyColor, background: `${urgencyColor}15`, padding: '2px 8px', borderRadius: '999px', border: `1px solid ${urgencyColor}25` }}>{urgencyLabel}</span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                                        พบ <strong style={{ color: '#f43f5e' }}>{critCount} วิกฤต</strong>
                                        {warnCount > 0 && <> + <strong style={{ color: '#f59e0b' }}>{warnCount} เตือน</strong></>}
                                        {problems[0]?.severity === 'good' && <strong style={{ color: '#10b981' }}> ไม่พบปัญหา</strong>}
                                    </span>
                                    <div style={{ marginTop: '8px', height: '6px', background: 'rgba(0,0,0,.06)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${urgencyScore * 10}%`, background: 'linear-gradient(90deg, #10b981, #f59e0b, #f43f5e)', borderRadius: '99px', transition: 'width 1s ease' }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>ปกติ</span>
                                        <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>เตือน</span>
                                        <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 600 }}>วิกฤต</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="urgency-score-pulse" style={{ fontSize: '36px', fontWeight: 900, color: urgencyColor, lineHeight: 1 }}>{Math.round(urgencyScore)}<span style={{ fontSize: '16px', fontWeight: 700 }}>/10</span></div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: urgencyColor, marginTop: '2px' }}>Urgency</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {problems.map((p, i) => (
                                    <div key={i} style={{ borderRadius: '14px', border: `1.5px solid ${p.color}20`, background: `${p.color}04`, overflow: 'hidden' }}>
                                        <div style={{ padding: '10px 16px', background: `linear-gradient(90deg, ${p.color}12, transparent)`, borderBottom: `1px solid ${p.color}15`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {p.priority > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>{p.priority}</span>}
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)', lineHeight: 1.4 }}>{p.title}</span>
                                            <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: '999px', background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}>
                                                {p.severity === 'critical' ? '🔴 CRITICAL' : p.severity === 'warning' ? '🟡 WARNING' : '🟢 GOOD'}
                                            </span>
                                        </div>
                                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔍 ปัญหาที่แท้จริง (Root Cause)</p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.rootCause}</p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ผลกระทบลูกโซ่ (Cascade Effect)</p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.cascadeEffect}</p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔧 แก้ไขก่อน — ด่วนที่ {p.priority > 0 ? p.priority : '—'} (Fix First)</p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.fixFirst}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {problems.length > 1 && problems[0]?.severity !== 'good' && (
                                <div style={{ marginTop: '16px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(14,165,233,.04)', border: '1px solid rgba(14,165,233,.15)' }}>
                                    <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🗺️ แผนที่ความเชื่อมโยง — NCD Bottleneck & RCM Chain</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        {[
                                            { label: `Wait ${avgWait}min`, color: '#f59e0b' },
                                            { label: `Collection ${collRate}%`, color: '#f43f5e' },
                                            { label: `Claim ${claimSuccess}%`, color: '#fb7185' },
                                            { label: `Dropout ${dropoutCount}`, color: '#0ea5e9' },
                                            { label: `AR ${daysAR}d`, color: '#8b5cf6' },
                                            { label: `NCI = ${nci}/100`, color: '#10b981' },
                                        ].map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i > 0 && <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>}
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: item.color, background: `${item.color}10`, padding: '4px 10px', borderRadius: '8px', border: `1px solid ${item.color}20` }}>{item.label}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic' }}>
                                        💡 <strong>สรุปวิเคราะห์:</strong> ปัญหา NCD ข้ามมิติจาก <strong style={{ color: '#f59e0b' }}>Wait time สูง</strong> (Operational) ส่งผลให้เกิด Dropout และกระทบ <strong style={{ color: '#f43f5e' }}>Collection Rate</strong> (Financial) ── <strong>แก้ "ด่วนที่ 1" (Wait time)</strong> เพื่อลด Dropout และ <strong>"ด่วนที่ 2" (Collection)</strong> เพื่อรักษา Cash Flow จะช่วยกู้คืนสุขภาพรายได้ NCD Clinic ได้ทันที
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}

            {/* ━━━ 🔥 AI Risk Stratification Engine (LIVE) ━━━ */}
            {state.ncdRiskStratification && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #7c3aed)', borderRadius: '99px' }} />
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                            🫀 AI Risk Stratification Engine
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>AI Powered</span>
                    </div>
                    <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', borderTop: '4px solid #f43f5e' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ padding: '12px', background: 'rgba(244,63,94,.05)', borderRadius: '12px', border: '1px solid rgba(244,63,94,.15)' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase' }}>Critical Risk</p>
                                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 900, color: '#f43f5e', lineHeight: 1 }}>{state.ncdRiskStratification.summary?.risk_distribution?.critical || 0}</p>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(245,158,11,.05)', borderRadius: '12px', border: '1px solid rgba(245,158,11,.15)' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>High Risk</p>
                                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>{state.ncdRiskStratification.summary?.risk_distribution?.high || 0}</p>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(14,165,233,.05)', borderRadius: '12px', border: '1px solid rgba(14,165,233,.15)' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase' }}>Moderate Risk</p>
                                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 900, color: '#0ea5e9', lineHeight: 1 }}>{state.ncdRiskStratification.summary?.risk_distribution?.moderate || 0}</p>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(16,185,129,.05)', borderRadius: '12px', border: '1px solid rgba(16,185,129,.15)' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>BP Control Rate</p>
                                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>{state.ncdRiskStratification.summary?.bp_control_rate}%</p>
                            </div>
                        </div>

                        {/* Top risks & AI Recommendations */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                            <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                💡 AI Interventions (Highest Risk Patients)
                            </p>
                            {state.ncdRiskStratification.recommendations?.slice(0, 4).map((rec, i) => {
                                const isCritical = rec.risk_level === 'critical';
                                const rcColor = isCritical ? '#f43f5e' : '#f59e0b';
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: `${rcColor}05`, borderRadius: '10px', borderLeft: `3px solid ${rcColor}` }}>
                                        <div style={{ minWidth: '40px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 900, color: rcColor }}>HN {rec.hn}</span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{rec.action}</p>
                                            <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>{rec.reason}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, background: `${rcColor}15`, color: rcColor, padding: '2px 8px', borderRadius: '99px' }}>
                                                {rec.risk_level.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* ━━━ รายได้โดยประมาณ NCD — ปีงบประมาณ (3 ปีย้อนหลัง) ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #e11d48, #be123c)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้โดยประมาณ NCD Clinic — ปีงบประมาณ (3 ปีย้อนหลัง)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(225,29,72,.08)', padding: '2px 8px', borderRadius: '99px' }}>vn_stat · HOSxP XE</span>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ncdRevenueFiscal ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />
                        <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (() => {
                    const fd = state.ncdRevenueFiscal;
                    const years = fd?.fiscal_years || [];
                    if (years.length === 0) return <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '2rem 0' }}>ไม่พบข้อมูลรายได้</p>;
                    const FY_COLORS = ['#94a3b8', '#fb7185', '#e11d48'];
                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => { row[`fy${fi}`] = (fy.months[i]?.revenue || 0); });
                        return row;
                    });
                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const compMonths = latestYear.comparable_months || 12;
                    const yoyGrowth = prevYear && (prevYear.comparable_revenue ?? prevYear.total_revenue) > 0
                        ? Math.round(((latestYear.comparable_revenue ?? latestYear.total_revenue) - (prevYear.comparable_revenue ?? prevYear.total_revenue)) / (prevYear.comparable_revenue ?? prevYear.total_revenue) * 1000) / 10 : 0;
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: '10px' }}>
                                {years.map((fy, fi) => {
                                    const isLatest = fi === years.length - 1; const color = FY_COLORS[fi];
                                    return (
                                        <div key={fi} style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: isLatest ? `linear-gradient(135deg, ${color}12, ${color}05)` : `${color}06`, border: `1px solid ${color}${isLatest ? '30' : '15'}` }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{fy.fiscal_label}</span>
                                                {isLatest && <span style={{ fontSize: '11px', fontWeight: 700, color: '#e11d48', background: 'rgba(225,29,72,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>}
                                            </div>
                                            <p style={{ fontSize: '22px', fontWeight: 900, color, margin: '0 0 2px', letterSpacing: '-0.02em' }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</p>
                                            <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 600 }}>
                                                {fy.total_visits.toLocaleString()} visits · {fy.total_patients.toLocaleString()} patients · ฿{fy.avg_revenue_per_visit.toLocaleString()}/visit
                                            </p>
                                            {isLatest && prevYear && (
                                                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>{yoyGrowth >= 0 ? '📈' : '📉'} YoY {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth}%</span>
                                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>vs {prevYear.fiscal_label} (เทียบ {compMonths} ด.)</span>
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
                                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}
                                        formatter={(v, name) => { const idx = Number(name.replace('fy', '')); return [`฿${(v / 1e6).toFixed(2)}M`, years[idx]?.fiscal_label || name]; }} />
                                    {years.map((fy, fi) => (
                                        <Bar key={fi} dataKey={`fy${fi}`} fill={FY_COLORS[fi]} radius={[3, 3, 0, 0]} barSize={years.length <= 2 ? 20 : 14} opacity={fi === years.length - 1 ? 1 : 0.5} name={`fy${fi}`} />
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
            {/* ━━━━━━ NCD Goal Attainment Dashboard ━━━━━━ */}
            <SubErrorBoundary name="NCD Goal Attainment">
                <NCDGoalAttainmentPanel
                    data={state.ncdGoalAttainment}
                    loading={state.loading?.ncdGoalAttainment}
                />
            </SubErrorBoundary>
        </div >
    );
}

// ── NCD Goal Attainment Panel ─────────────────────────────────────────────
// HbA1c <7% (DM) · BP <140/90 (HT) — อ้างอิง ADA 2024 + กรมการแพทย์
function NCDGoalAttainmentPanel({ data, loading }) {
    if (loading) return (
        <div className="skeleton" style={{ height: '140px', borderRadius: '16px' }} />
    );
    if (!data) return null;

    const { hba1c, bp } = data;

    const GoalBar = ({ label, rate, target = 70, color }) => {
        const pct = rate ?? 0;
        const ok  = pct >= target;
        return (
            <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: ok ? '#10b981' : '#f43f5e' }}>{rate != null ? `${pct}%` : '—'}</span>
                </div>
                <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(203,213,225,.2)', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: '99px', background: ok ? color : '#f43f5e', transition: 'width 0.8s ease' }} />
                </div>
                <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', marginTop: '3px', fontWeight: 600 }}>
                    เป้าหมาย ≥{target}% · {rate != null ? `${data.hba1c?.total_tested || data.bp?.total_measured || 0} ราย` : 'ไม่มีข้อมูล'}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #e11d48, #be185c)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🎯 NCD Goal Attainment Dashboard
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(225,29,72,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    ADA 2024 · กรมการแพทย์
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {/* HbA1c Card */}
                <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderLeft: '4px solid #e11d48' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.06em' }}>HbA1c &lt;7% — DM</p>
                            <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ผู้ป่วยเบาหวาน · {hba1c.window_days} วันล่าสุด</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: (hba1c.goal_rate ?? 0) >= 50 ? '#10b981' : '#f43f5e', letterSpacing: '-0.02em' }}>
                                {hba1c.goal_rate != null ? `${hba1c.goal_rate}%` : '—'}
                            </p>
                            <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>{hba1c.goal_met}/{hba1c.total_tested} ราย</p>
                        </div>
                    </div>

                    <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(203,213,225,.2)', overflow: 'hidden', marginBottom: '12px' }}>
                        <div style={{ width: `${Math.min(hba1c.goal_rate ?? 0, 100)}%`, height: '100%', borderRadius: '99px', background: (hba1c.goal_rate ?? 0) >= 50 ? '#10b981' : '#f43f5e', transition: 'width 0.8s ease' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {[
                            { label: 'ควบคุมได้ <7%', val: hba1c.goal_met,     color: '#10b981' },
                            { label: 'ต้องปรับ 7-9%',  val: hba1c.suboptimal,  color: '#f59e0b' },
                            { label: 'ควบคุมไม่ได้ ≥9%', val: hba1c.poor_control, color: '#f43f5e' },
                        ].map((s, i) => (
                            <div key={i} style={{ padding: '8px', borderRadius: '8px', background: `${s.color}08`, border: `1px solid ${s.color}20`, textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: s.color }}>{s.val ?? '—'}</p>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)', lineHeight: 1.3 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {hba1c.avg_value > 0 && (
                        <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                            ค่าเฉลี่ย HbA1c: <strong style={{ color: hba1c.avg_value < 7 ? '#10b981' : '#f43f5e' }}>{hba1c.avg_value}%</strong>
                            {' · '}ช่วง: {hba1c.min_value}–{hba1c.max_value}%
                        </p>
                    )}
                </div>

                {/* Blood Pressure Card */}
                <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderLeft: '4px solid #7c3aed' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>BP &lt;140/90 — HT</p>
                            <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ผู้ป่วยความดันโลหิตสูง · {bp.window_days} วันล่าสุด</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: (bp.goal_rate ?? 0) >= 60 ? '#10b981' : '#f43f5e', letterSpacing: '-0.02em' }}>
                                {bp.goal_rate != null ? `${bp.goal_rate}%` : '—'}
                            </p>
                            <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>{bp.goal_met}/{bp.total_measured} ราย</p>
                        </div>
                    </div>

                    <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(203,213,225,.2)', overflow: 'hidden', marginBottom: '12px' }}>
                        <div style={{ width: `${Math.min(bp.goal_rate ?? 0, 100)}%`, height: '100%', borderRadius: '99px', background: (bp.goal_rate ?? 0) >= 60 ? '#10b981' : '#f43f5e', transition: 'width 0.8s ease' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {[
                            { label: 'ควบคุมได้ <140/90', val: bp.goal_met,   color: '#10b981' },
                            { label: 'Stage 1 HT',          val: bp.stage1_ht, color: '#f59e0b' },
                            { label: 'Stage 2 HT ≥160',     val: bp.stage2_ht, color: '#f43f5e' },
                        ].map((s, i) => (
                            <div key={i} style={{ padding: '8px', borderRadius: '8px', background: `${s.color}08`, border: `1px solid ${s.color}20`, textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: s.color }}>{s.val ?? '—'}</p>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)', lineHeight: 1.3 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {bp.avg_systolic > 0 && (
                        <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                            ค่าเฉลี่ย BP: <strong style={{ color: bp.avg_systolic < 140 ? '#10b981' : '#f43f5e' }}>{bp.avg_systolic}/{bp.avg_diastolic}</strong> mmHg
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(NCDTab);
