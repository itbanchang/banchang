// ============================================================
// BCH 360° Intelligence V.10 - Clinical Risk Tab
// 🧠 AI NEWS2 EWS + Professional Clinical Analytics
// ⏱️ Professional Data Analytics KPIs Edition
// ============================================================
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Cell, PieChart, Pie, ComposedChart, Area, Line, Legend, ReferenceLine
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICardV2 from './KPICardV2.jsx';

const RISK_COLORS = {
    critical: '#f43f5e',
    high: '#f59e0b',
    medium: '#0ea5e9',
    moderate: '#0ea5e9',
    low: '#10b981'
};

function ClinicalTab() {
    const { state, fetchData } = useDashboard();
    const { riskPatients, riskDistribution, resourceElasticity } = state;
    const loading = state.loading;
    const [expandedPatient, setExpandedPatient] = useState(null);

    const clinicalAnalytics = state.clinicalAnalytics;

    useEffect(() => {
        fetchData('riskPatients', '/api/ai/ews/summary');
        fetchData('riskDistribution', '/api/clinical/risk-distribution');
        fetchData('resourceElasticity', '/api/dashboard/resource-elasticity');
        fetchData('clinicalAnalytics', '/api/clinical/analytics');
    }, [fetchData]);

    const ewsSummary = riskPatients;
    const patients = ewsSummary?.patients || [];
    const alerts = ewsSummary?.alerts || [];
    const byWard = ewsSummary?.by_ward || [];

    const ageDistData = useMemo(() => {
        if (!riskDistribution?.by_age) return [];
        const groups = {};
        riskDistribution.by_age.forEach(r => {
            if (!groups[r.age_group]) groups[r.age_group] = { name: r.age_group, critical: 0, high: 0, moderate: 0, low: 0 };
            groups[r.age_group][r.risk_level] = r.count;
        });
        return Object.values(groups);
    }, [riskDistribution]);

    const radarData = resourceElasticity?.metrics || [];

    // ---- Vital Signs Component ----
    const VitalBadge = ({ label, value, unit, score, flag }) => (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '4px 8px', borderRadius: '8px',
            background: score >= 3 ? 'rgba(244,63,94,.15)' : score >= 2 ? 'rgba(245,158,11,.1)' : score >= 1 ? 'rgba(245,158,11,.05)' : 'rgba(203,213,225,.1)',
            border: score >= 3 ? '1px solid rgba(244,63,94,.3)' : score >= 2 ? '1px solid rgba(245,158,11,.2)' : 'none',
        }}>
            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{label}</span>
            <span style={{
                fontSize: 'var(--fs-sm)', fontWeight: 700,
                color: score >= 3 ? '#f43f5e' : score >= 2 ? '#f59e0b' : score >= 1 ? '#eab308' : '#10b981'
            }}>{value || '—'}</span>
            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>{unit} {flag ? '⚠️' : ''} +{score}</span>
        </div>
    );

    // ---- Patient Row ----
    const PatientRow = useCallback(({ index, style }) => {
        const p = patients[index];
        if (!p) return null;
        const ews = p.ews;
        const vitals = p.vitals;
        const bd = ews?.breakdown || {};

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
                {/* Risk indicator */}
                <div style={{ width: '4px', height: '32px', borderRadius: '99px', background: ews?.color || RISK_COLORS.low, flexShrink: 0 }} />

                {/* Patient info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                    </p>
                    <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 500 }}>
                        {p.hn} · {p.ward} · {p.age}ปี · นอน {p.stay_days} วัน
                    </p>
                </div>

                {/* NEWS2 Score */}
                <div style={{ width: '48px', textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 900, color: ews?.color || RISK_COLORS.low }}>
                        {ews?.score ?? '—'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>NEWS2</div>
                </div>

                {/* Risk Badge */}
                <div style={{ width: '80px', textAlign: 'center', flexShrink: 0 }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '3px 8px', borderRadius: '999px',
                        fontSize: '11px', fontWeight: 700,
                        background: `${ews?.color}18`, color: ews?.color,
                        border: `1px solid ${ews?.color}30`,
                    }}>
                        {ews?.risk_level === 'critical' ? '🚨 ' : ews?.risk_level === 'high' ? '⚠️ ' : ''}
                        {ews?.risk_level}
                    </span>
                </div>

                {/* Quick Vitals */}
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    {[
                        { label: 'BP', value: vitals?.bp, flag: bd.systolic_bp?.score >= 2 },
                        { label: 'HR', value: vitals?.pulse, flag: bd.pulse?.score >= 2 },
                        { label: 'SpO2', value: vitals?.spo2, flag: bd.spo2?.score >= 2 },
                    ].map((v, i) => (
                        <span key={i} style={{
                            fontSize: '11px', padding: '2px 6px', borderRadius: '6px',
                            fontWeight: 600, fontFamily: 'JetBrains Mono, monospace',
                            background: v.flag ? 'rgba(244,63,94,.1)' : 'rgba(203,213,225,.08)',
                            color: v.flag ? '#f43f5e' : 'var(--md-text-tertiary)',
                        }}>
                            {v.label}:{v.value || '—'}
                        </span>
                    ))}
                </div>

                {/* Doctor */}
                <div style={{ width: '80px', fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {p.doctor || 'N/A'}
                </div>
            </div>
        );
    }, [patients]);

    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* ━━ AI Clinical Safety Intelligence Hub ━━ */}
            <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(244,63,94,.25)', background: 'linear-gradient(135deg, rgba(244,63,94,.08), rgba(99,102,241,.04))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: '4px', height: '20px', background: 'linear-gradient(180deg, #f43f5e, #dc2626)', borderRadius: '99px' }} />
                    <div>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            🧠 Clinical Intelligence Hub <span style={{ fontSize: '11px', background: 'rgba(244,63,94,.15)', color: '#f43f5e', padding: '1px 6px', borderRadius: '4px' }}>AI NEWS2 ACTIVE</span>
                        </h3>
                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>Real-time Surveillance for Patient Deterioration & Clinical Risk Management</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    {/* EWS Status */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #f43f5e' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase' }}>📡 Early Warning Status</span>
                            <span style={{ fontSize: '12px' }}>📊</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            {ewsSummary?.critical > 0
                                ? `🚨 ALERT: พบผู้ป่วยระดับ CRITICAL ${ewsSummary.critical} ราย (NEWS2 ≥ 7)`
                                : ewsSummary?.high > 0
                                    ? `⚠️ พบผู้ป่วยความเสี่ยงสูง ${ewsSummary.high} ราย — เฝ้าระวังสัญญาณชีพ`
                                    : '✅ Clinical Status: Stable — ไม่พบผู้ป่วยที่มีความเสี่ยงสูงในขณะนี้'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {ewsSummary?.critical > 0
                                ? '💡 Policy: ทีม Rapid Response (RRT) ต้องเข้า Review สถานการณผู้ป่วยระดับ Critical ทันที'
                                : '💡 Recommendation: ตรวจสอบความสมบูรณ์ของการบันทึก Vital Signs ให้ครบถ้วนตามระยะเวลา'}
                        </p>
                    </div>

                    {/* Sepsis & Infection Risk */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #f59e0b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>🦠 Sepsis & Infection Risk</span>
                            <span style={{ fontSize: '12px' }}>🌡️</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            {clinicalAnalytics?.sepsis?.sirs_positive > 0
                                ? `🔍 ตรวจพบ SIRS+ ${clinicalAnalytics.sepsis.sirs_positive} ราย — ตรวจคัดกรอง Sepsis STAT`
                                : '✅ ไม่พบแนวโน้ม Sepsis/Infection ที่มีนัยสำคัญ'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {clinicalAnalytics?.sepsis?.sirs_positive > 0
                                ? `💡 Action: เจาะ Blood Culture และ Lactate ก่อนให้ Antibiotic ตาม Hour-1 Bundle`
                                : '💡 คงมาตรการเฝ้าระวังผู้ป่วยที่มีไข้สูงอย่างใกล้ชิด'}
                        </p>
                    </div>

                    {/* Safety Index */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #10b981' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>🎯 Clinical Safety Index (CSI)</span>
                            <span style={{ fontSize: '12px' }}>📈</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            CSI Score อยู่ที่ {clinicalAnalytics?.csi || 0}/100 — {clinicalAnalytics?.csi >= 80 ? 'อยู่ในระดับปลอดภัยสูง' : 'ควรเฝ้าระวังจุดบอดข้อมูล'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {clinicalAnalytics?.no_vitals_pct > 25
                                ? `⚠️ พบ Blind Spot: มีผู้ป่วย ${clinicalAnalytics.no_vitals_pct}% ยังไม่มีข้อมูล Vitals ที่เป็นปัจจุบัน`
                                : '✅ ความสมบูรณ์ของข้อมูลทางคลินิกอยู่ในเกณฑ์ดีเยี่ยม'}
                        </p>
                    </div>
                </div>
            </div>
            {/* AI EWS Alert Banner */}
            {(ewsSummary?.critical > 0 || ewsSummary?.high > 0) && (
                <div className="glass-card shadow-lg p-4 border-l-4 border-[#f43f5e] rounded-2xl" style={{ background: 'linear-gradient(90deg, rgba(244,63,94,.08) 0%, transparent 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.5rem' }}>🚨</span>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                                AI NEWS2 Critical Alarm — {ewsSummary.critical} Critical / {ewsSummary.high} High Risk
                            </h3>
                            <p style={{ fontSize: 'var(--fs-2xs)', color: '#f43f5e', fontWeight: 700, margin: '4px 0 0' }}>
                                Action: {alerts[0]?.ews?.action || 'Dispatch RRT / Review Patient Status Immediately'}
                            </p>
                        </div>
                        <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                            AI Engine · {new Date().toLocaleTimeString('th-TH')}
                        </span>
                    </div>
                </div>
            )}

            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                <KPICardV2 title="IPD ทั้งหมด" value={ewsSummary?.total_patients} icon="🏥" color="blue" loading={loading.riskPatients} aiInsight={ewsSummary?.total_patients > 100 ? "High overall IPD volume. Monitor resource allocation." : "IPD volume is within manageable limits."} />
                <KPICardV2 title="🚨 Critical" value={ewsSummary?.critical} icon="" color="red" unit="NEWS2 ≥ 7" loading={loading.riskPatients} aiInsight={ewsSummary?.critical > 0 ? "Immediate medical review required for critical patients. Ensure ICU availability." : "No critical patients detected currently."} />
                <KPICardV2 title="⚠️ High Risk" value={ewsSummary?.high} icon="" color="amber" unit="NEWS2 5-6" loading={loading.riskPatients} aiInsight={ewsSummary?.high > 5 ? "Elevated number of high-risk patients. Prepare for potential rapid responses." : "High-risk patient load is contained."} />
                <KPICardV2 title="📋 Medium" value={ewsSummary?.medium} icon="" color="blue" unit="NEWS2 3-4" loading={loading.riskPatients} aiInsight="Monitor medium risk patients for any signs of clinical deterioration." />
                <KPICardV2 title="✅ Low Risk" value={ewsSummary?.low} icon="" color="green" unit="NEWS2 0-2" loading={loading.riskPatients} aiInsight="Standard monitoring protocols apply. Review for potential discharge." />
                <KPICardV2 title="Avg NEWS2" value={ewsSummary?.avg_ews ?? '—'} icon="🧠" color="purple" unit="AI Score" loading={loading.riskPatients} aiInsight={ewsSummary?.avg_ews > 3 ? "Average acuity is trending high, indicating a generally sicker inpatient mix." : "Average patient acuity is stable."} />
            </div>

            {/* ━━━━━ CSI + Advanced Clinical Analytics Panel ━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: '#f43f5e', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🔬 Professional Clinical Analytics
                </span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>HOSxP XE + AI NEWS2 Real-time</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.clinicalAnalytics ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '56px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = clinicalAnalytics || {};
                    const csi = a.csi ?? 0;
                    const csiColor = csi >= 80 ? '#10b981' : csi >= 60 ? '#f59e0b' : '#f43f5e';
                    const csiGrade = csi >= 90 ? 'A+' : csi >= 80 ? 'A' : csi >= 70 ? 'B+' : csi >= 60 ? 'B' : csi >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(csi / 100, 1) * circumference;

                    // CSI Component bars
                    const csiComp = a.csi_components || {};
                    const csiRadar = [
                        { name: 'EWS Profile', score: csiComp.ews_profile || 0 },
                        { name: 'Vital Stability', score: csiComp.vital_stability || 0 },
                        { name: 'Risk Population', score: csiComp.risk_population || 0 },
                        { name: 'Monitoring', score: csiComp.monitoring || 0 },
                        { name: 'Readmit', score: csiComp.readmit_penalty || 0 },
                    ];

                    const vs = a.vitals_summary || {};
                    const sp = a.sepsis || {};

                    // ━━━ Tier 1: Patient Safety ━━━
                    const tier1Cards = [
                        {
                            icon: '🚩', label: 'Red Flag Patients',
                            value: `${a.red_flag_count ?? 0}`,
                            sub: `${a.red_flag_pct ?? 0}% ของ IPD ทั้งหมด`,
                            desc: 'ผู้ป่วยที่มี vital signs ค่าหนึ่ง ≥3 คะแนน (ผิดปกติรุนแรง)',
                            color: (a.red_flag_pct ?? 0) < 10 ? '#10b981' : (a.red_flag_pct ?? 0) < 20 ? '#f59e0b' : '#f43f5e',
                            problem: (a.red_flag_pct ?? 0) < 10
                                ? `Red Flag ${a.red_flag_count ?? 0} ราย (${a.red_flag_pct ?? 0}%) — อยู่ในเกณฑ์ดี (<10%) ระบบ Early Warning ทำงานมีประสิทธิภาพ ผู้ป่วยถูก Escalate ทันเวลา`
                                : (a.red_flag_pct ?? 0) < 20
                                    ? `Red Flag ${a.red_flag_count ?? 0} ราย (${a.red_flag_pct ?? 0}%) — สูงกว่ามาตรฐาน 10% มีผู้ป่วยที่ vitals ผิดปกติรุนแรง (Score≥3 อย่างน้อย 1 ค่า) ต้องตรวจสอบว่า Clinical response ทันท่วงทีหรือไม่`
                                    : `🚨 Red Flag ${a.red_flag_count ?? 0} ราย (${a.red_flag_pct ?? 0}%) — วิกฤต! ผู้ป่วย 1 ใน 5 มี vital signs ผิดปกติรุนแรง สะท้อนปัญหา: แพทย์/พยาบาลอาจ Overwhelmed, Early intervention ล่าช้า, หรือ Case mix หนักเกินกำลัง`,
                            recommend: (a.red_flag_pct ?? 0) < 10
                                ? '✅ คงมาตรฐาน — ทำ huddle review Red Flag cases ทุก shift เพื่อ prevent deterioration'
                                : (a.red_flag_pct ?? 0) < 20
                                    ? '📋 ปรับปรุง: (1) ทำ Urgent assessment ทุก Red Flag ภายใน 15 นาที (2) เพิ่มความถี่ Vital signs monitoring เป็นทุก 1 ชม. (3) แจ้ง Attending physician ทันทีเมื่อ Score≥3 (4) เตรียม ICU bed สำรอง'
                                    : '🚨 เร่งด่วน: (1) Activate Rapid Response Team ทุก Red Flag case (2) พิจารณา ICU/Step-up ทุกรายที่ Score≥3 ต่อเนื่อง >2 ชม. (3) เพิ่ม Nursing ratio 1:3 ใน ward ที่มี Red Flag สูง (4) Daily Multidisciplinary Round สำหรับ Red Flag patients (5) เป้าหมาย: <10% ภายใน 14 วัน',
                        },
                        {
                            icon: '📡', label: 'Missing Vitals',
                            value: `${a.no_vitals_count ?? 0}`,
                            sub: `${a.no_vitals_pct ?? 0}% ไม่มี vitals ล่าสุด`,
                            desc: 'ผู้ป่วย IPD ที่ยังไม่มีข้อมูล vital signs — ต้อง monitor',
                            color: (a.no_vitals_pct ?? 0) < 20 ? '#10b981' : (a.no_vitals_pct ?? 0) < 40 ? '#f59e0b' : '#f43f5e',
                            problem: (a.no_vitals_pct ?? 0) < 20
                                ? `Missing Vitals ${a.no_vitals_count ?? 0} ราย (${a.no_vitals_pct ?? 0}%) — อยู่ในเกณฑ์ (<20%) ส่วนใหญ่อาจเป็นผู้ป่วย admit ใหม่ที่ยังไม่ถึงรอบวัด`
                                : (a.no_vitals_pct ?? 0) < 40
                                    ? `Missing Vitals ${a.no_vitals_count ?? 0} ราย (${a.no_vitals_pct ?? 0}%) — สูง! ผู้ป่วยเกือบครึ่งไม่ได้รับการวัด vital signs ทำให้ NEWS2 ไม่สามารถคำนวณ Early Warning ได้ เท่ากับ "ไม่มีตาเฝ้า"  \n ⚠️ ผู้ป่วยเหล่านี้มี Silent deterioration risk`
                                    : `🚨 Missing Vitals ${a.no_vitals_count ?? 0} ราย (${a.no_vitals_pct ?? 0}%) — วิกฤต! มากกว่า 40% ของผู้ป่วย IPD ไม่มี vital signs ระบบ NEWS2 แทบไม่มีข้อมูลในการตรวจจับ patients at risk ทำให้เกิด Blind spots ในความปลอดภัย`,
                            recommend: (a.no_vitals_pct ?? 0) < 20
                                ? '✅ ดี — ตรวจสอบว่า admit ใหม่ถูกวัด vitals ภายใน 1 ชม. หลัง admission'
                                : (a.no_vitals_pct ?? 0) < 40
                                    ? '📋 แก้ไข: (1) กำหนด Mandatory Vital Signs ทุก 4 ชม. ทุกราย (2) ใช้ Bedside Monitor + Auto-sync กับ HIS (3) ตั้ง Alert เมื่อไม่มี vitals >6 ชม. (4) อบรม Nurse aide วัด vitals อย่างถูกต้อง'
                                    : '🚨 ทำทันที: (1) Mandatory vital signs round ทุก ward ภายใน 2 ชม. (2) Audit สาเหตุ: เครื่องมือไม่พอ? Staff ไม่เพียงพอ? ลืม? (3) ติดตั้ง Wireless vital signs monitor ลด workload (4) ผูก KPI พยาบาลกับ % Missing vitals (5) เป้าหมาย: <20% ภายใน 7 วัน',
                        },
                        {
                            icon: '🦠', label: 'Sepsis Screening',
                            value: `${sp.sirs_positive ?? 0}`,
                            sub: `SIRS+ · ${sp.hypotension ?? 0} ↓BP · ${sp.tachycardia ?? 0} ↑HR · ${sp.fever ?? 0} 🌡`,
                            desc: 'ผู้ป่วยที่ผ่านเกณฑ์ SIRS (SBP<100 + HR>90 + Temp>38)',
                            color: (sp.sirs_positive ?? 0) === 0 ? '#10b981' : (sp.sirs_positive ?? 0) < 3 ? '#f59e0b' : '#f43f5e',
                            problem: (sp.sirs_positive ?? 0) === 0
                                ? 'ไม่พบผู้ป่วยที่ผ่านเกณฑ์ SIRS — Sepsis screening ปัจจุบันปลอดภัย'
                                : (sp.sirs_positive ?? 0) < 3
                                    ? `SIRS+ ${sp.sirs_positive ?? 0} ราย — พบผู้ป่วยมี Hypotension (${sp.hypotension ?? 0}), Tachycardia (${sp.tachycardia ?? 0}), Fever (${sp.fever ?? 0}) ต้อง Rule-out Sepsis ทันที เนื่องจาก Sepsis สามารถ Progress เป็น Septic shock ภายใน 4-6 ชม.`
                                    : `🚨 SIRS+ ${sp.sirs_positive ?? 0} ราย — จำนวนสูง! Sepsis outbreak risk แม้ไม่ทุกรายจะเป็น Sepsis จริง แต่ต้อง Rule-out 100% เพราะ Mortality ของ Sepsis ที่ไม่ได้รับการรักษาสูงถึง 30-50%`,
                            recommend: (sp.sirs_positive ?? 0) === 0
                                ? '✅ ดี — คง Sepsis screening ทุก 8 ชม. สำหรับผู้ป่วยที่มี risk factors'
                                : (sp.sirs_positive ?? 0) < 3
                                    ? '📋 Sepsis Bundle: (1) Blood culture ทุกราย SIRS+ ก่อนให้ Antibiotic (2) IV Antibiotic ภายใน 1 ชม. (Hour-1 Bundle) (3) Lactate level ภายใน 3 ชม. (4) IV fluid resuscitation 30 mL/kg ถ้า Hypotension (5) แจ้ง Attending + ID consultant'
                                    : '🚨 วิกฤต: (1) Activate Sepsis Alert Protocol ทั้ง ward (2) Mandatory Blood culture + Lactate ทุกราย SIRS+ ทันที (3) Antibiotic ภายใน 1 ชม. (HA/JCI Standard) (4) ตรวจสอบ Infection control: HAI อาจเป็นสาเหตุ (5) รายงาน ICC ทันที (6) เป้าหมาย: Door-to-Antibiotic <60 นาที',
                        },
                        {
                            icon: '🤸', label: 'Fall Risk',
                            value: `${a.fall_risk?.high ?? 0}`,
                            sub: `สูง ${a.fall_risk?.high ?? 0} · ปานกลาง ${a.fall_risk?.moderate ?? 0} · ${a.fall_risk?.high_pct ?? 0}%`,
                            desc: 'ผู้ป่วยอายุ ≥65 + นอน >3 วัน = ความเสี่ยงหกล้มสูง',
                            color: (a.fall_risk?.high_pct ?? 0) < 15 ? '#10b981' : (a.fall_risk?.high_pct ?? 0) < 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.fall_risk?.high_pct ?? 0) < 15
                                ? `Fall Risk สูง ${a.fall_risk?.high ?? 0} ราย (${a.fall_risk?.high_pct ?? 0}%) — อยู่ในเกณฑ์ (<15%) มาตรการป้องกันทำงานได้ดี`
                                : (a.fall_risk?.high_pct ?? 0) < 30
                                    ? `Fall Risk สูง ${a.fall_risk?.high ?? 0} ราย (${a.fall_risk?.high_pct ?? 0}%) — ต้องเฝ้าระวัง ผู้สูงอายุ + LOS ยาว มีโอกาสหกล้มสูง ผลกระทบ: กระดูกหัก → OR → เพิ่ม LOS 10-20 วัน + ค่ารักษา 50,000-200,000 บาท`
                                    : `🚨 Fall Risk สูง ${a.fall_risk?.high ?? 0} ราย (${a.fall_risk?.high_pct ?? 0}%) — อันตราย! ผู้ป่วยเกือบ 1 ใน 3 เสี่ยงหกล้ม หากเกิดขึ้น: Sentinel event + HA report + ค่ารักษาเพิ่มมหาศาล + ความเสี่ยง Malpractice`,
                            recommend: (a.fall_risk?.high_pct ?? 0) < 15
                                ? '✅ ดี — คง Fall Prevention Protocol ทุก ward: Side rail up, Non-slip floor, Call bell ใกล้มือ'
                                : (a.fall_risk?.high_pct ?? 0) < 30
                                    ? '📋 เพิ่มมาตรการ: (1) ติด Yellow Wristband ทุกราย Fall Risk (2) ย้ายเตียงใกล้ Nursing station (3) Night light ทุก ward (4) รองเท้ากันลื่นทุกราย (5) Physiotherapy ประเมินการเดินทุก high-risk (6) อุปกรณ์ช่วยเดิน (Walker/Wheelchair) พร้อมใช้'
                                    : '🚨 เร่งด่วน: (1) Mandatory 1:1 Sitter สำหรับ Highest risk (2) ติดตั้ง Bed alarm ทุกเตียงที่เสี่ยง (3) Hourly rounding check ทุก ward (4) Medication review — ลดยาที่ทำให้ Drowsy/Dizzy (5) ติดตั้งราวจับ (Grab bars) ทุกห้องน้ำ (6) Zero Fall Target — รายงานผู้บริหารทุกวัน',
                        },
                    ];

                    // ━━━ Tier 2: Vital Signs Intelligence ━━━
                    const tier2Cards = [
                        {
                            icon: '💓', label: 'Vital Stability Score',
                            value: `${a.vital_stability_score ?? 0}/100`,
                            sub: `จาก σ BP/HR/Temp/SpO2 — สูง = คงที่ดี`,
                            desc: 'คะแนนความคงที่ของ vitals (ยิ่ง σ ต่ำ = คงที่ = คะแนนสูง)',
                            color: (a.vital_stability_score ?? 0) >= 70 ? '#10b981' : (a.vital_stability_score ?? 0) >= 40 ? '#f59e0b' : '#f43f5e',
                            problem: (a.vital_stability_score ?? 0) >= 70
                                ? `Stability ${a.vital_stability_score ?? 0}/100 — ดี (≥70) Vital signs ผู้ป่วยส่วนใหญ่มีความคงที่ดี σ ต่ำ สะท้อน Clinical care + medication management มีประสิทธิภาพ`
                                : (a.vital_stability_score ?? 0) >= 40
                                    ? `Stability ${a.vital_stability_score ?? 0}/100 — ปานกลาง มีผู้ป่วยจำนวนหนึ่งที่ vitals ผันผวน (σ สูง) อาจหมายถึง undertreated conditions หรือ medication adjustments ไม่เหมาะสม`
                                    : `🚨 Stability ${a.vital_stability_score ?? 0}/100 — ต่ำ! Vitals ผันผวนมาก สะท้อน patients ที่ไม่ stable หลายราย มีความเสี่ยง Cardiac arrest / Respiratory failure สูง`,
                            recommend: (a.vital_stability_score ?? 0) >= 70
                                ? '✅ ดี — ใช้ Vital trend analysis ทุกวันเพื่อ Early detection'
                                : (a.vital_stability_score ?? 0) >= 40
                                    ? '📋 ปรับปรุง: (1) Review medication ผู้ป่วยที่ σ สูง (2) เพิ่มความถี่ monitoring เป็นทุก 2 ชม. สำหรับผู้ป่วยไม่ stable (3) Consultation specialist ทุกราย σ >2SD (4) เป้าหมาย Stability ≥70'
                                    : '🚨 วิกฤต: (1) Identify top 10 patients ที่ σ สูงสุด — Priority review (2) Continuous monitoring (Cardiac monitor) ทุกราย σ สูง (3) Emergency medication review (4) เตรียม ICU/HDU transfer (5) Rapid Response Team standby',
                        },
                        {
                            icon: '🫀', label: 'Avg BP / HR',
                            value: `${vs.avg_sbp ?? 0}/${vs.avg_dbp ?? 0}`,
                            sub: `HR ${vs.avg_hr ?? 0} · σBP ${vs.sd_sbp ?? 0} · σHR ${vs.sd_hr ?? 0}`,
                            desc: 'ค่าเฉลี่ย Blood Pressure + Heart Rate (7 วัน)',
                            color: '#0ea5e9',
                            problem: `BP เฉลี่ย ${vs.avg_sbp ?? 0}/${vs.avg_dbp ?? 0} mmHg (σ ${vs.sd_sbp ?? 0}) · HR ${vs.avg_hr ?? 0} bpm (σ ${vs.sd_hr ?? 0}) — ${(vs.avg_sbp ?? 120) < 100 ? '⚠️ Hypotension tendency — ต้องระวัง Shock' : (vs.avg_sbp ?? 120) > 160 ? '⚠️ Hypertension — ปรับ anti-hypertensive' : 'อยู่ในเกณฑ์ปกติ'}`,
                            recommend: '📋 Monitor: (1) ผู้ป่วย SBP<100 ต้อง Fluid challenge + Vasopressor readiness (2) SBP>160 ทบทวน Antihypertensive dosing (3) HR>100 ตรวจหา Cause: Pain, Fever, Dehydration, Anxiety (4) ทำ Vital Trend Chart ทุกราย',
                        },
                        {
                            icon: '🌡️', label: 'Avg Temp / SpO2',
                            value: `${vs.avg_temp ?? 0}°C`,
                            sub: `SpO2 ${vs.avg_spo2 ?? 0}% · σTemp ${vs.sd_temp ?? 0} · σSpO2 ${vs.sd_spo2 ?? 0}`,
                            desc: 'อุณหภูมิ + ออกซิเจนเฉลี่ย ทุก IPD',
                            color: '#8b5cf6',
                            problem: `Temp เฉลี่ย ${vs.avg_temp ?? 0}°C (σ ${vs.sd_temp ?? 0}) SpO2 เฉลี่ย ${vs.avg_spo2 ?? 0}% (σ ${vs.sd_spo2 ?? 0}) — ${(vs.avg_temp ?? 37) > 37.5 ? '🌡️ อุณหภูมิเฉลี่ยสูง — น่าจะมีผู้ป่วย Febrile หลายราย ตรวจสอบ Infection' : ''} ${(vs.avg_spo2 ?? 97) < 95 ? '🫁 SpO2 เฉลี่ยต่ำ — ผู้ป่วย Respiratory compromise' : 'อยู่ในเกณฑ์ปกติ'}`,
                            recommend: '📋 Action: (1) ผู้ป่วย Temp>38.5 → Blood culture + Empirical antibiotic (2) SpO2<94% → O₂ therapy + ABG (3) σTemp สูง → หา Infection source (4) σSpO2 สูง → ตรวจ Respiratory function',
                        },
                        {
                            icon: '📏', label: 'วัด Vitals แล้ว',
                            value: `${vs.patients_measured ?? 0}`,
                            sub: `${(vs.total_measurements ?? 0).toLocaleString()} measurements / 7 วัน`,
                            desc: 'จำนวนผู้ป่วยที่มีการบันทึก vitals',
                            color: '#10b981',
                            problem: `วัด Vitals แล้ว ${vs.patients_measured ?? 0} ราย (${(vs.total_measurements ?? 0).toLocaleString()} ครั้ง / 7 วัน) — เฉลี่ย ${vs.patients_measured ? Math.round((vs.total_measurements ?? 0) / (vs.patients_measured ?? 1) / 7) : 0} ครั้ง/ราย/วัน ${(vs.total_measurements ?? 0) / Math.max(vs.patients_measured ?? 1, 1) / 7 < 3 ? '⚠️ ต่ำกว่ามาตรฐาน (ควร ≥3 ครั้ง/วัน)' : '✅ เพียงพอ'}`,
                            recommend: '📋 มาตรฐาน Vital Monitoring: (1) General ward: ≥3 ครั้ง/วัน (ทุก 8 ชม.) (2) High-risk: ≥6 ครั้ง/วัน (ทุก 4 ชม.) (3) Critical: Continuous monitoring (4) ใช้ Wireless vital monitor เพิ่มความถี่โดยไม่เพิ่ม workload',
                        },
                    ];

                    // ━━━ Tier 3: Risk Population ━━━
                    const rp = a.risk_profile || {};
                    const tier3Cards = [
                        {
                            icon: '👴', label: 'Very Elderly (≥75)',
                            value: `${rp.very_elderly ?? 0}`,
                            sub: `จาก ${rp.total ?? 0} ทั้งหมด · อายุเฉลี่ย ${rp.avg_age ?? 0} ปี`,
                            desc: 'ผู้ป่วยสูงอายุมาก — ต้องการทรัพยากรดูแลพิเศษ',
                            color: (rp.very_elderly ?? 0) > 5 ? '#f43f5e' : '#f59e0b',
                            problem: (rp.very_elderly ?? 0) <= 5
                                ? `ผู้สูงอายุมาก (≥75) ${rp.very_elderly ?? 0} ราย — จำนวนไม่มาก ดูแลได้ทั่วถึง`
                                : `ผู้สูงอายุมาก (≥75) ${rp.very_elderly ?? 0} ราย จาก ${rp.total ?? 0} ราย — กลุ่มนี้มีความเสี่ยงสูงต่อ: Delirium, Fall, Pressure ulcer, Polypharmacy, Malnutrition ต้องการ Geriatric-specific care protocols`,
                            recommend: (rp.very_elderly ?? 0) <= 5
                                ? '📋 ดูแล: Geriatric assessment ทุกราย + Fall prevention + Nutrition screening'
                                : '🚨 ผู้สูงอายุมาก: (1) Implement Comprehensive Geriatric Assessment (CGA) ทุกราย (2) Delirium screening (CAM) ทุกวัน (3) Medication reconciliation — ลด Polypharmacy (4) Pressure ulcer risk assessment (Braden scale) (5) Nutrition consult ทุกราย (6) Early mobilization program',
                        },
                        {
                            icon: '🏨', label: 'Long Stay (>14d)',
                            value: `${rp.long_stay ?? 0}`,
                            sub: `LOS เฉลี่ย ${rp.avg_los ?? 0} วัน`,
                            desc: 'ผู้ป่วยนอนนาน — ต้อง discharge planning เร่งด่วน',
                            color: (rp.long_stay ?? 0) > 5 ? '#f43f5e' : '#f59e0b',
                            problem: (rp.long_stay ?? 0) <= 5
                                ? `Long Stay ${rp.long_stay ?? 0} ราย (LOS เฉลี่ย ${rp.avg_los ?? 0} วัน) — จำนวนน้อย ผลกระทบต่อ Capacity ต่ำ`
                                : `Long Stay ${rp.long_stay ?? 0} ราย (LOS เฉลี่ย ${rp.avg_los ?? 0} วัน) — ครอบครอง bed-days จำนวนมาก ส่งผลต่อ Bed Turnover + ER Boarding สาเหตุ: Complex case, Social admission, Delayed investigation, หรือ Discharge barrier`,
                            recommend: (rp.long_stay ?? 0) <= 5
                                ? '📋 ดี: Review ทุกราย Long Stay ว่ามี Discharge barrier หรือไม่'
                                : '🚨 ลด Long Stay: (1) Case conference ทุกราย LOS>14 วัน ภายใน 48 ชม. (2) Social worker ประเมิน Discharge barrier (3) Home Health Care จัดรจากบ้านเตรียม (4) Step-down / Intermediate ward สำหรับ Stable long-stay (5) เป้าหมาย: LOS>14d ≤3 ราย',
                        },
                        {
                            icon: '🔄', label: 'Re-admit 7 วัน',
                            value: `${a.readmit_7d?.rate ?? 0}%`,
                            sub: `${a.readmit_7d?.count ?? 0} ราย จาก ${a.readmit_7d?.total ?? 0} discharge`,
                            desc: 'อัตรา re-admit ภายใน 7 วัน — สะท้อนคุณภาพการดูแล',
                            color: (a.readmit_7d?.rate ?? 0) < 3 ? '#10b981' : (a.readmit_7d?.rate ?? 0) < 8 ? '#f59e0b' : '#f43f5e',
                            problem: (a.readmit_7d?.rate ?? 0) < 3
                                ? `Re-admit 7d ${a.readmit_7d?.rate ?? 0}% — ดีเยี่ยม (<3%) สะท้อน Discharge quality + Post-discharge care ดี`
                                : (a.readmit_7d?.rate ?? 0) < 8
                                    ? `Re-admit 7d ${a.readmit_7d?.rate ?? 0}% (${a.readmit_7d?.count ?? 0} ราย) — สูงกว่ามาตรฐาน 3% ผู้ป่วยกลับมาเร็ว อาจหมายถึง: Discharge เร็วเกินไป, ข้อมูล Home care ไม่เพียงพอ, หรือ Complication ที่ควร prevent ได้`
                                    : `🚨 Re-admit 7d ${a.readmit_7d?.rate ?? 0}% — Critical! ผู้ป่วยกลับมาภายใน 1 สัปดาห์ สะท้อนปัญหาร้ายแรงของคุณภาพ Discharge + Care transition`,
                            recommend: (a.readmit_7d?.rate ?? 0) < 3
                                ? '✅ คงมาตรฐาน — Post-discharge phone call อย่างต่อเนื่อง'
                                : '📋 ลด Re-admit: (1) Root Cause Analysis ทุกราย 7d re-admit (2) Discharge Checklist 12 ข้อ ก่อนปล่อย (3) Phone call follow-up ภายใน 48 ชม. (4) Home medication reconciliation (5) VDO สอน self-care ก่อน discharge',
                        },
                        {
                            icon: '🫁', label: 'Hypoxia (SpO2<94%)',
                            value: `${sp.hypoxia ?? 0}`,
                            sub: `จากการวัดทั้งหมด 3 วัน`,
                            desc: 'จำนวนครั้งที่ SpO2 <94% — ต้องพิจารณา O₂ therapy',
                            color: (sp.hypoxia ?? 0) === 0 ? '#10b981' : (sp.hypoxia ?? 0) < 5 ? '#f59e0b' : '#f43f5e',
                            problem: (sp.hypoxia ?? 0) === 0
                                ? 'ไม่พบ Hypoxia events (SpO2<94%) ใน 3 วันที่ผ่านมา — Oxygenation status ดีทั้ง ward'
                                : (sp.hypoxia ?? 0) < 5
                                    ? `Hypoxia events ${sp.hypoxia ?? 0} ครั้ง — ผู้ป่วยบางรายมี SpO2<94% ต้องตรวจสอบ: Pneumonia? Pulmonary edema? COPD exacerbation? PE? แต่ละ event อาจเป็น Precede to Respiratory failure`
                                    : `🚨 Hypoxia events ${sp.hypoxia ?? 0} ครั้ง — จำนวนสูง! หลายรายมี SpO2 ต่ำกว่า 94% ซ้ำ ๆ สะท้อนปัญหา Respiratory care ระบบ O₂ delivery อาจไม่เพียงพอ หรือมี Underlying infection`,
                            recommend: (sp.hypoxia ?? 0) === 0
                                ? '✅ ดี — คง Continuous SpO2 monitoring สำหรับ Post-op + Respiratory patients'
                                : '📋 Hypoxia Management: (1) ABG ทุกราย SpO2<94% (2) CXR เพื่อ Rule-out Pneumonia/Effusion (3) ปรับ O₂ delivery: Nasal cannula → Mask → High-flow → NIV (4) Respiratory therapy consult (5) ผู้ป่วย Recurrent hypoxia ย้าย HDU/ICU',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* CSI Gauge + Component Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                {/* CSI Gauge */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={csiColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={csiColor} fontFamily="'Outfit',sans-serif">{csi}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">CSI Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: csiColor }}>{csiGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: csiColor }}>
                                            {csi >= 80 ? 'ความปลอดภัยสูง' : csi >= 60 ? 'อยู่ในเกณฑ์' : 'ต้องเฝ้าระวัง'}
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '2px', lineHeight: 1.4 }}>
                                            Clinical Safety Index
                                        </div>
                                    </div>

                                    {/* CSI Component Bars */}
                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>
                                            CSI Components
                                        </p>
                                        {csiRadar.map((c, i) => {
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

                                {/* 3 Tiers of KPI Cards with Problem + Recommend */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                    {[
                                        { title: 'Patient Safety', color: '#f43f5e', cards: tier1Cards },
                                        { title: 'Vital Signs Intelligence', color: '#0ea5e9', cards: tier2Cards },
                                        { title: 'Risk Population & Quality', color: '#f59e0b', cards: tier3Cards },
                                    ].map((tier, ti) => (
                                        <div key={ti}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tier.color }} />
                                                <span style={{ fontSize: '12px', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.desc}</p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                                            </div>
                                                        </div>
                                                        {/* Problem */}
                                                        {k.problem && (
                                                            <div style={{ marginTop: '6px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>📊 วิเคราะห์สถานการณ์</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.problem}</p>
                                                            </div>
                                                        )}
                                                        {/* Recommend */}
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

                            {/* ━━━ Charts Row: EWS Distribution + LOS Distribution + Mortality ━━━ */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem',
                                borderTop: '1px solid var(--md-border)', paddingTop: '1rem',
                            }}>
                                {/* EWS Score Distribution */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        📊 EWS Score Distribution
                                    </p>
                                    <ResponsiveContainer width="100%" height={140}>
                                        <BarChart data={(a.ews_distribution || []).filter(d => d.count > 0)} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="score" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v) => [`${v} ราย`, 'จำนวนผู้ป่วย']}
                                                labelFormatter={(v) => `NEWS2 Score: ${v}`} />
                                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={18}>
                                                {(a.ews_distribution || []).filter(d => d.count > 0).map((d, i) => (
                                                    <Cell key={i} fill={d.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* LOS Distribution */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        🏨 LOS Distribution (ปัจจุบัน)
                                    </p>
                                    <ResponsiveContainer width="100%" height={140}>
                                        <BarChart data={a.los_distribution || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="range" tick={{ fill: '#6b7280', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => {
                                                    if (n === 'count') return [`${v} ราย`, 'จำนวน'];
                                                    return [`${v} ปี`, 'อายุเฉลี่ย'];
                                                }} />
                                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={18}>
                                                {(a.los_distribution || []).map((d, i) => {
                                                    const colors = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e'];
                                                    return <Cell key={i} fill={colors[i] || '#7c3aed'} />;
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Mortality Trend */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        💀 Mortality Trend (6 เดือน)
                                    </p>
                                    <ResponsiveContainer width="100%" height={140}>
                                        <ComposedChart data={a.mortality_trend || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                                            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#f43f5e', fontSize: 9 }} axisLine={false} tickLine={false} width={28}
                                                tickFormatter={v => `${v}%`} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => {
                                                    if (n === 'deaths') return [`${v} ราย`, 'เสียชีวิต'];
                                                    if (n === 'mortality_rate') return [`${v}%`, 'อัตราตาย'];
                                                    return [`${v}`, n];
                                                }} />
                                            <Bar yAxisId="left" dataKey="deaths" fill="rgba(244,63,94,.3)" radius={[4, 4, 0, 0]} barSize={14} name="deaths" />
                                            <Line yAxisId="right" type="monotone" dataKey="mortality_rate" stroke="#f43f5e" strokeWidth={2}
                                                dot={{ r: 3, fill: '#f43f5e' }} name="mortality_rate" />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* ━━━ Nursing Load + Top Diagnoses ━━━ */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
                                borderTop: '1px solid var(--md-border)', paddingTop: '1rem',
                            }}>
                                {/* Nursing Load by Ward */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        👩‍⚕️ Nursing Intensity by Ward
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {(a.nursing_load || []).slice(0, 6).map((w, i) => {
                                            const maxIntensity = Math.max(...(a.nursing_load || []).map(x => x.intensity || 1));
                                            const pct = Math.round((w.intensity / maxIntensity) * 100);
                                            const barColor = pct >= 80 ? '#f43f5e' : pct >= 50 ? '#f59e0b' : '#10b981';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)', width: '70px', textAlign: 'right', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.ward}</span>
                                                    <div style={{ flex: 1, height: '8px', background: 'rgba(203,213,225,.15)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: barColor, width: '48px', textAlign: 'right', flexShrink: 0 }}>
                                                        {w.patients} pt · {w.intensity}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Top Diagnoses */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        🏷️ Top Diagnoses (IPD ปัจจุบัน)
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        {(a.top_diagnoses || []).slice(0, 6).map((d, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                padding: '4px 8px', borderRadius: '8px',
                                                background: i === 0 ? 'rgba(124,58,237,.06)' : 'transparent',
                                            }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', width: '16px', textAlign: 'center' }}>{i + 1}</span>
                                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', fontFamily: 'JetBrains Mono, monospace', width: '48px', flexShrink: 0 }}>{d.icd10}</span>
                                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', flexShrink: 0 }}>{d.count}</span>
                                                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', flexShrink: 0 }}>LOS {d.avg_los}d</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — Clinical ━━━━━━ */}
            {!loading.clinicalAnalytics && clinicalAnalytics && (() => {
                const a = clinicalAnalytics || {};
                const csi = a.csi ?? 0;
                const redFlagCount = a.red_flag_count ?? 0;
                const redFlagPct = a.red_flag_pct ?? 0;
                const noVitalsCount = a.no_vitals_count ?? 0;
                const noVitalsPct = a.no_vitals_pct ?? 0;
                const sp = a.sepsis || {};
                const sirsPositive = sp.sirs_positive ?? 0;
                const hypoxia = sp.hypoxia ?? 0;
                const fallHigh = a.fall_risk?.high ?? 0;
                const fallHighPct = a.fall_risk?.high_pct ?? 0;
                const vitalStability = a.vital_stability_score ?? 0;
                const vs = a.vitals_summary || {};
                const rp = a.risk_profile || {};
                const veryElderly = rp.very_elderly ?? 0;
                const longStay = rp.long_stay ?? 0;
                const avgLos = rp.avg_los ?? 0;
                const readmit7d = a.readmit_7d?.rate ?? 0;
                const readmit7dCount = a.readmit_7d?.count ?? 0;
                const totalPatients = ewsSummary?.total_patients ?? rp.total ?? 0;
                const criticalEWS = ewsSummary?.critical ?? 0;
                const highEWS = ewsSummary?.high ?? 0;
                const avgEWS = ewsSummary?.avg_ews ?? 0;

                // ─── Detect problems ───
                const problems = [];

                // 1. Missing Vitals → Blind Spot
                if (noVitalsPct > 25) {
                    const isCritical = noVitalsPct > 40;
                    problems.push({
                        priority: 1,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 Blind Spot: ${noVitalsCount} ราย (${noVitalsPct}%) ไม่มี Vital Signs — ระบบ NEWS2 ไม่สามารถ Detect Risk`,
                        rootCause: `ผู้ป่วย ${noVitalsPct}% ของ IPD ทั้งหมดไม่มีข้อมูล vital signs ที่เป็นปัจจุบัน ── หมายความว่า AI NEWS2 ไม่สามารถคำนวณ Early Warning Score ให้ผู้ป่วยเหล่านี้ → เท่ากับ "ไม่มีตาเฝ้าระวัง" ── สาเหตุที่แท้จริง: (1) Workload พยาบาลสูงเกินไป → ไม่มีเวลาวัด vitals ครบทุกราย (2) อุปกรณ์วัด vital signs ไม่เพียงพอ หรือเสีย (3) ระบบบันทึกข้อมูลยุ่งยาก — ต้องป้อนมือใน HIS (4) ไม่มี Alert อัตโนมัติเมื่อ vitals ขาดนานเกินไป (5) วัฒนธรรม: ถ้าผู้ป่วยดู "ปกติ" ก็ข้ามไป ← อันตรายมาก`,
                        cascadeEffect: `Missing Vitals → NEWS2 คำนวณไม่ได้ → Silent deterioration ไม่ถูก detect → Cardiac arrest / Respiratory failure โดยไม่มี warning → Mortality เพิ่มขึ้น ● ผู้ป่วยที่ "ดูปกติ" อาจกำลัง deteriorate อยู่ — 60% ของ cardiac arrest มี warning signs ล่วงหน้า 6-8 ชม. แต่ถ้าไม่วัด vitals ก็ไม่มีทางรู้ ● ส่งผลต่อ CSI Score (ปัจจุบัน ${csi}/100) โดยตรง`,
                        fixFirst: `🔧 ด่วนที่สุด (Quick Win สูงสุด): (1) Mandatory Vital Signs Round ทุก ward ภายใน 2 ชม. นี้ (2) ตั้ง Alert อัตโนมัติ: เมื่อไม่มี vitals >6 ชม. → แจ้ง Charge nurse ทันที (3) ติดตั้ง Wireless vital signs monitor ลด workload การบันทึกมือ (4) กำหนด KPI พยาบาล: Missing vitals <10% ต่อ shift (5) Audit สาเหตุ: เครื่องมือ? Staffing? ระบบ? → แก้ตรงจุด (6) เป้าหมาย: Missing vitals <15% ภายใน 7 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 2. Critical + High EWS Patients
                if (criticalEWS > 0 || highEWS > 3) {
                    const isCritical = criticalEWS > 2 || highEWS > 5;
                    problems.push({
                        priority: 2,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 NEWS2 Alert: ${criticalEWS} Critical (≥7) + ${highEWS} High Risk (5-6) — Avg EWS ${avgEWS}`,
                        rootCause: `มีผู้ป่วย ${criticalEWS} ราย ที่ NEWS2 ≥7 (Critical) + ${highEWS} ราย ที่ NEWS2 5-6 (High Risk) ── กลุ่มนี้มี 30 min - 4 hr mortality risk สูงมาก ── ต้องวิเคราะห์: (1) ผู้ป่วย Critical ได้รับ Rapid Response Team review แล้วหรือยัง? (2) มี delayed escalation จาก ward nurse → Attending physician หรือไม่? (3) Vital signs ที่ทำให้ Score สูงคือตัวไหน → BP? HR? SpO2? Consciousness? (4) Red Flag patients (single vital score≥3): ${redFlagCount} ราย (${redFlagPct}%) — อาจซ่อนอยู่ในกลุ่ม Medium risk`,
                        cascadeEffect: `Critical EWS ที่ไม่ได้รับ intervention ภายใน 30 นาที → Cardiac arrest risk สูงขึ้น 3-5 เท่า ● High Risk ที่ไม่ escalate → อาจ progress เป็น Critical ภายใน 4-8 ชม. ● ผลกระทบ: Mortality เพิ่ม → HA/JCI audit → Malpractice risk → Staff morale ลดลง ● Avg EWS ${avgEWS} ${avgEWS > 3 ? '— สูง! บ่งชี้ว่า IPD มี patient acuity สูงโดยรวม' : '— ยังอยู่ในเกณฑ์'}`,
                        fixFirst: `🔧 ทำทันที: (1) Verify ว่าทุกราย Critical ได้รับ RRT review แล้ว — ถ้ายังไม่ → เรียก RRT ทันที (2) High Risk: Attending physician ต้อง review ภายใน 1 ชม. + เพิ่ม monitoring เป็นทุก 30 นาที (3) Red Flag cases: Single parameter score≥3 ต้อง assess ทันทีแม้ Total score ไม่สูง (เช่น SpO2 ต่ำมากตัวเดียว) (4) ประเมิน ICU/HDU transfer สำหรับทุกราย Critical (5) จัดทำ Escalation Protocol ชัดเจน: Score 5-6 = แจ้งแพทย์ ≤1ชม., Score ≥7 = RRT ≤30นาที`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 3. Sepsis Alert
                if (sirsPositive > 0) {
                    const isCritical = sirsPositive >= 3;
                    problems.push({
                        priority: 3,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 Sepsis Alert: ${sirsPositive} ราย SIRS+ (↓BP ${sp.hypotension ?? 0} + ↑HR ${sp.tachycardia ?? 0} + 🌡 Fever ${sp.fever ?? 0})`,
                        rootCause: `${sirsPositive} ราย ผ่านเกณฑ์ SIRS (Systemic Inflammatory Response Syndrome): SBP<100 + HR>90 + Temp>38 ── Sepsis ที่ไม่ได้รับการรักษาทันมี Mortality 30-50% ── ข้อมูลเพิ่ม: Hypotension ${sp.hypotension ?? 0} ราย (เสี่ยง Septic shock), Tachycardia ${sp.tachycardia ?? 0} ราย, Fever ${sp.fever ?? 0} ราย ── แหล่งที่มาที่ต้องตรวจ: (1) Hospital-Acquired Infection (HAI) → VAP, CAUTI, CLABSI, SSI (2) Community-Acquired ที่ Progression ใน ward (3) Immunocompromised patients`,
                        cascadeEffect: `SIRS → Sepsis → Severe Sepsis → Septic Shock: ทุกชั่วโมงที่ delay Antibiotic → Mortality เพิ่ม 7.6% ● ถ้าเป็น HAI: อาจ Outbreak → ต้อง Isolate + Contact tracing → Resource intensive ● Mortality ของ Septic shock = 40-60% ● ผลกระทบ: HA report, ICC investigation, Bed-days เพิ่ม, ค่ารักษาสูงขึ้น 3-10 เท่า`,
                        fixFirst: `🔧 Hour-1 Sepsis Bundle (ทำทันที): (1) Blood Culture 2 sets ก่อนให้ Antibiotic — ทุกราย SIRS+ (2) IV Antibiotic ภายใน 1 ชม. ตาม Protocol (3) Lactate level STAT — ถ้า >4 mmol/L = Severe sepsis (4) IV Fluid 30 mL/kg ถ้า Hypotension/Lactate>4 (5) MAP target ≥65 mmHg — ถ้าไม่ถึงให้ Vasopressor (6) แจ้ง Attending + ID consult + ICC ทันที (7) Monitor urine output q1h`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 4. Fall Risk
                if (fallHighPct > 20) {
                    const isCritical = fallHighPct > 35;
                    problems.push({
                        priority: 4,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 Fall Risk สูง: ${fallHigh} ราย (${fallHighPct}%) — Sentinel Event Prevention`,
                        rootCause: `ผู้ป่วย ${fallHighPct}% มีความเสี่ยงหกล้มสูง (อายุ ≥65 + LOS >3 วัน) ── ผู้สูงอายุมาก (≥75): ${veryElderly} ราย, LOS เฉลี่ย ${avgLos} วัน ── สาเหตุเสี่ยง: (1) Polypharmacy — ยาที่ทำให้ Drowsy/Dizzy (Benzodiazepine, Opioid, Anti-hypertensive) (2) Deconditioning จากการนอนนาน → กล้ามเนื้ออ่อนแรง (3) สิ่งแวดล้อม: พื้นลื่น, ไม่มีราวจับ, แสงไม่พอ, เตียงไม่ล็อค (4) Delirium/Confusion (พบบ่อยในผู้สูงอายุ + Post-op)`,
                        cascadeEffect: `Fall → กระดูกหัก (Hip fracture พบบ่อยสุด) → OR + เพิ่ม LOS 10-20 วัน + ค่ารักษา 50,000-200,000 บาท → Sentinel Event report HA → ผลกระทบ Accreditation ● Head injury จาก Fall → ICU → Mortality risk สูง ● Malpractice lawsuit risk ● Staff morale + ภาพลักษณ์ รพ.`,
                        fixFirst: `🔧 Fall Prevention Bundle: (1) Yellow Wristband + Bed sign ทุกราย High-risk (2) Bed alarm สำหรับ Highest risk (3) ย้ายเตียงใกล้ Nursing station (4) Non-slip socks + รองเท้ากันลื่น (5) Night light ทุก ward (6) Medication review: ลด/ปรับยาที่เพิ่ม Fall risk (7) Hourly rounding check (8) Physiotherapy ประเมินการเดินทุกราย (9) Zero Fall Target`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 5. Vital Instability
                if (vitalStability < 50) {
                    const isCritical = vitalStability < 30;
                    problems.push({
                        priority: 5,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 Vital Instability: Stability Score เพียง ${vitalStability}/100 — ผู้ป่วยหลายรายไม่ Stable`,
                        rootCause: `Vital Stability Score = ${vitalStability}/100 ← คำนวณจาก σ (Standard Deviation) ของ BP, HR, Temp, SpO2 ── σ สูง = ค่า Vitals ผันผวน = ผู้ป่วยไม่ stable ── สาเหตุ: (1) ผู้ป่วยที่ Treatment response ไม่ดี — ยาไม่ถูก dose/ชนิด (2) Undertreated pain → HR ↑, BP ↑ แล้วลง (fluctuate) (3) Fluid balance ไม่ดี → BP swing (4) Uncontrolled infection → Fever spike + HR fluctuation (5) Avg BP ${vs.avg_sbp ?? 0}/${vs.avg_dbp ?? 0} σ${vs.sd_sbp ?? 0} · HR ${vs.avg_hr ?? 0} σ${vs.sd_hr ?? 0}`,
                        cascadeEffect: `Vitals ผันผวน → สัญญาณ Clinical deterioration → ถ้าไม่ Intervene → Cardiac arrest / Respiratory failure ● ผู้ป่วย Unstable ต้อง Monitor ถี่ขึ้น → เพิ่ม Nursing workload → Staff stretched → อาจ Miss vital signs อื่น → วงจรอันตราย ● CSI Score ลดลง (${csi}/100)`,
                        fixFirst: `🔧 Stabilize: (1) Identify Top 10 patients ที่ σ สูงสุด → Priority physician review (2) Continuous cardiac monitor สำหรับ Highly unstable patients (3) Emergency medication review: ตรวจ dose + drug interaction (4) Fluid balance assessment ทุก 4 ชม. (5) Pain management optimization (6) ถ้า σ ไม่ลดใน 24 ชม. → ICU/HDU transfer (7) เป้าหมาย: Stability ≥70 ภายใน 7 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 6. Hypoxia Events
                if (hypoxia > 3) {
                    const isCritical = hypoxia > 8;
                    problems.push({
                        priority: 6,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 Hypoxia Events: ${hypoxia} ครั้ง (SpO2<94%) — Respiratory Compromise`,
                        rootCause: `พบ ${hypoxia} ครั้งที่ SpO2 <94% ใน 3 วัน ── สาเหตุที่ต้องตรวจ: (1) Pneumonia (HAP/VAP) — สาเหตุอันดับ 1 ของ Hypoxia ใน IPD (2) Pulmonary edema — Heart failure acute exacerbation (3) COPD/Asthma exacerbation (4) Pulmonary embolism (PE) — โดยเฉพาะ Post-op + Immobilized patients (5) Atelectasis จากการนอนนาน (6) Inadequate O₂ delivery: Flow rate ต่ำเกินไป, Nasal cannula หลุด, O₂ หมด`,
                        cascadeEffect: `SpO2 <94% ต่อเนื่อง → Tissue hypoxia → Organ dysfunction → Multi-organ failure ● Brain: Confusion/Delirium ← เพิ่ม Fall risk ● Heart: Arrhythmia, MI ● ถ้าไม่ Intervene: Respiratory arrest → Cardiac arrest ● Avg SpO2 ปัจจุบัน ${vs.avg_spo2 ?? 0}% (σ ${vs.sd_spo2 ?? 0})`,
                        fixFirst: `🔧 Oxygen Management: (1) ABG ทันทีทุกราย SpO2<94% ← ประเมิน pCO2 + pH (2) CXR portable ทุกราย — Rule out Pneumonia/Effusion/Edema (3) ปรับ O₂ delivery: Nasal cannula → Simple mask → Venturi → High-flow → NIV/CPAP (4) ถ้า SpO2 <90% ต่อเนื่อง → ICU transfer + Intubation readiness (5) Respiratory therapy consult ทุกราย (6) เป้าหมาย: SpO2 ≥94% ทุกราย (≥88% สำหรับ COPD)`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 7. Re-admit 7d
                if (readmit7d > 5) {
                    problems.push({
                        priority: 7,
                        severity: readmit7d > 10 ? 'critical' : 'warning',
                        title: `🟠 Re-admit 7 วัน: ${readmit7d}% (${readmit7dCount} ราย) — Discharge Quality Concern`,
                        rootCause: `${readmit7d}% ของผู้ป่วยกลับมา Admit ซ้ำภายใน 7 วัน ← เร็วมาก สะท้อนปัญหาร้ายแรงของ Discharge quality ── สาเหตุ: (1) Premature discharge: ปล่อยก่อน Clinical stability (2) Complication ที่ไม่ได้ป้องกัน/ตรวจจับ (3) Discharge instruction ไม่เพียงพอ: ผู้ป่วยไม่รู้วิธีดูแลตัวเอง (4) ไม่มี Follow-up plan: ไม่นัด OPD, ไม่มี Home Health Care (5) Long stay patients (${longStay} ราย, avg ${avgLos} วัน) เมื่อ Discharge → ปรับตัวไม่ได้ → กลับมา`,
                        cascadeEffect: `7-day readmission = ปัญหาร้ายแรงกว่า 30-day → ต้นทุนต่อ case สูงขึ้น 5-8 เท่า ● HA/JCI flag ทันที → Audit + Corrective action required ● สปสช. ตรวจสอบ + อาจหัก Global budget ● เตียงถูกใช้ซ้ำโดยผู้ป่วยเดิม → Turnover ลดลง → Capacity crisis`,
                        fixFirst: `🔧 ลด 7d Readmission: (1) Mandatory RCA ทุกราย 7d readmit (2) Discharge Safety Checklist: Clinical stability + Medication understanding + Follow-up plan (3) Phone call ภายใน 24 ชม. หลัง D/C (ไม่ใช่ 48) (4) Home Health Care visit ภายใน 48 ชม. สำหรับ High-risk (5) OPD follow-up ภายใน 3-5 วัน (6) Risk score การ re-admit ก่อน Discharge → ถ้าสูง → ยัง D/C ไม่ได้`,
                        color: readmit7d > 10 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // If no significant problems
                if (problems.length === 0) {
                    problems.push({
                        priority: 0,
                        severity: 'good',
                        title: '✅ ระบบ Clinical Safety ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `CSI ${csi}/100 ● Critical EWS ${criticalEWS} ● High EWS ${highEWS} ● Red Flags ${redFlagPct}% ● Missing Vitals ${noVitalsPct}% ● SIRS+ ${sirsPositive} ● Stability ${vitalStability}/100 — ตัวชี้วัดอยู่ในเกณฑ์ยอมรับได้`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — ระบบ Patient Safety ทำงานได้ดี ควร Monitor ต่อเนื่อง`,
                        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ CSI ≥ ${Math.min(csi + 10, 100)} ภายไตรมาสหน้า (2) Benchmark การเกิด Sentinel events (3) Patient safety walk-round ทุกสัปดาห์`,
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
                    { label: `Missing Vitals ${noVitalsPct}%`, color: '#f43f5e' },
                    { label: `NEWS2 Blind Spot`, color: '#ef4444' },
                    { label: `Red Flag ${redFlagPct}%`, color: '#f59e0b' },
                    { label: `SIRS+ ${sirsPositive}`, color: '#e11d48' },
                    { label: `Stability ${vitalStability}/100`, color: '#8b5cf6' },
                    { label: `CSI = ${csi}/100`, color: '#10b981' },
                ];

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: '#f43f5e', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🔥 วิเคราะห์สถานการณ์เชิงลึก — Deep Root-Cause Analysis
                            </span>
                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>วิเคราะห์ข้ามตัวชี้วัด Clinical Safety เพื่อหาปัญหาที่แท้จริง</span>
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
                                            ⚡ ระดับความเร่งด่วนรวม — Clinical Safety
                                        </span>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: urgencyColor,
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
                                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
                                            CSI: {csi}/100 · Critical: {criticalEWS} · High: {highEWS} · SIRS+: {sirsPositive} · Stability: {vitalStability}/100
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
                                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>ปกติ</span>
                                        <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>เตือน</span>
                                        <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 600 }}>วิกฤต</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="urgency-score-pulse" style={{ fontSize: '36px', fontWeight: 900, color: urgencyColor, lineHeight: 1, letterSpacing: '-0.03em' }}>
                                        {Math.round(urgencyScore)}<span style={{ fontSize: '16px', fontWeight: 700 }}>/10</span>
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: urgencyColor, marginTop: '2px' }}>Urgency</div>
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
                                                marginLeft: 'auto', flexShrink: 0, fontSize: '11px', fontWeight: 700,
                                                textTransform: 'uppercase', letterSpacing: '0.08em',
                                                padding: '3px 8px', borderRadius: '999px',
                                                background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25`,
                                            }}>
                                                {p.severity === 'critical' ? '🔴 CRITICAL' : p.severity === 'warning' ? '🟡 WARNING' : '🟢 GOOD'}
                                            </span>
                                        </div>

                                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    🔍 ปัญหาที่แท้จริง (Root Cause)
                                                </p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>
                                                    {p.rootCause}
                                                </p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    ⚡ ผลกระทบลูกโซ่ (Cascade Effect)
                                                </p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>
                                                    {p.cascadeEffect}
                                                </p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                                        🗺️ แผนที่ความเชื่อมโยง — Clinical Safety Root-Cause Chain
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
                                        💡 <strong>สรุป:</strong> ปัญหา Clinical Safety มีต้นตอหลักจาก <strong style={{ color: '#f43f5e' }}>Missing Vitals ({noVitalsPct}%)</strong>
                                        → ทำให้ NEWS2 ไม่สามารถ Detect ผู้ป่วยที่กำลัง Deteriorate → ปัญหาอื่นๆ ตามมา
                                        — <strong>แก้ ด่วนที่ 1 ก่อน</strong> (วัด Vitals ให้ครบทุกราย) จะทำให้ระบบ Early Warning กลับมาทำงาน → ลดความเสี่ยงทุกตัวชี้วัดพร้อมกัน
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}

            {/* AI EWS by Ward */}
            {byWard.length > 0 && (
                <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                    <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                        🧠 AI EWS by Ward
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
                        {byWard.map((w, i) => {
                            const avgColor = w.avg_ews >= 5 ? '#f43f5e' : w.avg_ews >= 3 ? '#f59e0b' : '#10b981';
                            return (
                                <div key={i} style={{
                                    background: `${avgColor}06`, border: `1px solid ${avgColor}20`,
                                    borderRadius: '12px', padding: '10px 12px',
                                }}>
                                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.ward}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                                        <div>
                                            <span style={{ fontSize: 'var(--fs-lg)', fontWeight: 900, color: 'var(--md-text-primary)' }}>{w.total}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginLeft: '4px' }}>pts</span>
                                        </div>
                                        <span style={{ fontSize: 'var(--fs-lg)', fontWeight: 900, color: avgColor }}>
                                            {w.avg_ews}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                                        {w.critical > 0 && <span style={{ fontSize: '11px', padding: '1px 5px', background: 'rgba(244,63,94,.1)', color: '#f43f5e', borderRadius: '4px', fontWeight: 700 }}>🚨{w.critical}</span>}
                                        {w.high > 0 && <span style={{ fontSize: '11px', padding: '1px 5px', background: 'rgba(245,158,11,.1)', color: '#f59e0b', borderRadius: '4px', fontWeight: 700 }}>⚠️{w.high}</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Age Distribution Chart */}
                <div className="lg:col-span-2 chart-container">
                    <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                        📊 Risk Distribution by Age Group
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={ageDistData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '11px' }} />
                            <Bar dataKey="critical" stackId="a" fill="#f43f5e" name="Critical" />
                            <Bar dataKey="high" stackId="a" fill="#f59e0b" name="High" />
                            <Bar dataKey="moderate" stackId="a" fill="#0ea5e9" name="Moderate" />
                            <Bar dataKey="low" stackId="a" fill="#10b981" name="Low" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Resource Elasticity */}
                <div className="chart-container">
                    <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                        🕸️ Resource Elasticity
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="rgba(203,213,225,.2)" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 600 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 9 }} />
                            <Radar name="Utilization" dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI EWS Patient List */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--md-surface-2)',
                    borderBottom: '1px solid var(--md-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', margin: 0 }}>
                            🧠 AI NEWS2 — Patient Monitoring
                        </h3>
                        <span style={{
                            fontSize: 'var(--fs-xs)', fontWeight: 700, color: '#10b981',
                            background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)',
                            padding: '3px 10px', borderRadius: '999px',
                        }}>
                            AI Powered · {patients.length} patients
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                            { level: 'critical', color: '#f43f5e' },
                            { level: 'high', color: '#f59e0b' },
                            { level: 'medium', color: '#0ea5e9' },
                            { level: 'low', color: '#10b981' }
                        ].map(({ level, color }) => (
                            <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', textTransform: 'capitalize', fontWeight: 600 }}>{level}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.625rem 1.25rem',
                    background: 'var(--md-surface-2)',
                    borderBottom: '1px solid var(--md-border)',
                }}>
                    <div style={{ width: '4px', flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Patient</div>
                    <div style={{ width: '48px', textAlign: 'center', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>NEWS2</div>
                    <div style={{ width: '80px', textAlign: 'center', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Level</div>
                    <div style={{ width: '180px', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vitals</div>
                    <div style={{ width: '80px', fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Doctor</div>
                </div>

                {patients.length > 0 ? (
                    <List height={480} itemCount={patients.length} itemSize={54} width="100%" className="custom-scrollbar">
                        {PatientRow}
                    </List>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
                        {loading.riskPatients ? '⏳ กำลังโหลดข้อมูล AI NEWS2...' : 'ไม่พบผู้ป่วย'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(ClinicalTab);
