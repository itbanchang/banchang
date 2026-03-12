import React, { useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import KPICard from './KPICard.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';

export default function DentalTab() {
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
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Operational Diagnostics</p>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: aiAnalytics.urgencyColor, color: 'white', fontSize: '9px', fontWeight: 900 }}>{aiAnalytics.urgencyLabel}</span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                            {loading.dentalAnalytics ? 'กำลังประมวลผลอัลกอริทึมวิเคราะห์...' : (aiAnalytics.problems[0]?.title || 'ระบบทันตกรรมดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด')}
                        </p>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '14px 20px', textAlign: 'center', minWidth: '150px' }}>
                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase' }}>Growth index</p>
                    <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 900, color: aiAnalytics.yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                        {aiAnalytics.yoyGrowth >= 0 ? '↑' : '↓'} {Math.abs(aiAnalytics.yoyGrowth).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* 📊 Today's Performance & Wait Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                <div style={{
                    gridColumn: 'span 2', padding: '1.5rem', borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.05) 100%)',
                    border: '1px solid rgba(139,92,246,0.25)', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '120px', opacity: 0.05 }}>🦷</div>
                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#8b5cf6', margin: 0, letterSpacing: '0.1em' }}>Daily Patient Throughput</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
                        <div>
                            <span style={{ fontSize: '48px', fontWeight: 950, color: '#6366f1', letterSpacing: '-0.04em' }}>{dentalToday.total || 0}</span>
                            <span style={{ fontSize: '16px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginLeft: '6px' }}>ราย</span>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>Completed</span>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>{dentalToday.completed || 0}</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px' }}>
                                <div style={{ height: '100%', background: '#10b981', borderRadius: '3px', width: `${(dentalToday.total > 0 ? (dentalToday.completed / dentalToday.total * 100) : 0)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
                <KPICard title="Wait (Median)" value={aiAnalytics.benchmarks.medianWait || 0} subtitle="นาที (30D)" icon="⏱️" loading={loading.dentalAnalytics} color="blue" />
                <KPICard title="DPI Index" value={dentalAnalytics?.dpi || 0} subtitle="/100 (Operational Score)" icon="🎯" loading={loading.dentalAnalytics} color="purple" />
            </div>

            {/* 🔬 Deep Diagnostics Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#8b5cf6', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>ST-01</span> Strategic Indicators
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {aiAnalytics.strategicKPIs.length > 0 ? aiAnalytics.strategicKPIs.map((kpi, idx) => (
                            <div key={idx} style={{ padding: '14px 10px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{kpi.icon}</div>
                                <p style={{ margin: 0, fontSize: '16px', fontWeight: 950, color: kpi.color }}>{kpi.value}</p>
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginTop: '2px' }}>{kpi.label}</p>
                            </div>
                        )) : (
                            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>
                                {loading.dentalAnalytics ? 'รวบรวมข้อมูล Strategic Dashboard...' : 'No Data Available'}
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '20px', borderLeft: `5px solid ${aiAnalytics.urgencyColor}` }}>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: aiAnalytics.urgencyColor, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>AI-DX</span> Problem Discovery & Diagnosis
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {aiAnalytics.problems.length > 0 ? aiAnalytics.problems.map((p, idx) => (
                            <div key={idx} style={{ padding: '14px', borderRadius: '16px', background: `${p.color}08`, border: `1px solid ${p.color}20`, position: 'relative' }}>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: p.color }}>{p.title}</p>
                                <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>{p.rootCause}</p>
                                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '12px' }}>🧪</span>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#10b981' }}>RECOMMENDATION: {p.fixFirst}</p>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', background: 'rgba(16,185,129,0.03)', borderRadius: '16px', border: '1px dashed #10b98140' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>✨</div>
                                <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>High Performance Mode</p>
                                <p style={{ margin: 0, fontSize: '11px' }}>ตัวบ่งชี้ทุกตัวอยู่ในเกณฑ์มาตรฐานความปลอดภัยและคุณภาพ</p>
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

            {/* 💰 Revenue & Growth Trends */}
            <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Financial Persistence & Fiscal Trends</p>
                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>เปรียบเทียบรายได้ปีงบประมาณปัจจุบันและย้อนหลัง</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {dentalRevenueFiscal?.fiscal_years?.slice(-2).map((fy, fi) => (
                            <div key={fi} style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{fy.fiscal_label}</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: fi === 1 ? '#8b5cf6' : 'var(--md-text-secondary)' }}>฿{(fy.total_revenue / 1e6).toFixed(2)}M</p>
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

            {/* 📋 Top Diagnoses (30D) */}
            <div className="glass-card" style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Top Clinical Diagnoses & Procedures (30D)</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {dentalAnalytics?.top_diagnoses?.slice(0, 6).map((item, idx) => (
                        <div key={idx} style={{ padding: '12px 16px', background: 'var(--md-surface)', borderRadius: '12px', border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#8b5cf610', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '12px' }}>
                                {idx + 1}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || item.icd10}</p>
                                <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)' }}>{item.icd10}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#8b5cf6' }}>{item.count}</p>
                                <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Visits</p>
                            </div>
                        </div>
                    ))}
                    {(!dentalAnalytics?.top_diagnoses || dentalAnalytics.top_diagnoses.length === 0) && !loading.dentalAnalytics && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No diagnosis data available for this period</div>
                    )}
                </div>
            </div>
        </div>
    );
}
