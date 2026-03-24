// ============================================================
// BCH 360 Intelligence V.10 - Pharmacy Tab
// AI Pharmacy Performance Intelligence + Professional Analytics
// Professional Data Analytics KPIs Edition -- Performance Optimized
// ============================================================
import React, { useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import KPICardV2 from './KPICardV2.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';

function PharmacyTab() {
    const { state, fetchData } = useDashboard();
    const pharmacyToday = state.pharmacyToday || {};
    const pharmacyAnalytics = state.pharmacyAnalytics;
    const pharmacyRevenueFiscal = state.pharmacyRevenueFiscal;
    const loading = state.loading || {};

    useEffect(() => {
        if (!pharmacyToday.total_prescriptions && !loading.pharmacyToday) {
            fetchData('pharmacyToday', '/api/pharmacy/today');
        }
        if (!pharmacyAnalytics && !loading.pharmacyAnalytics) {
            fetchData('pharmacyAnalytics', '/api/pharmacy/analytics');
        }
        if (!pharmacyRevenueFiscal && !loading.pharmacyRevenueFiscal) {
            fetchData('pharmacyRevenueFiscal', '/api/pharmacy/revenue-fiscal');
        }
    }, [fetchData]);

    // Color theme: emerald/green for pharmacy
    const THEME = {
        primary: '#10b981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.05) 100%)',
        border: 'rgba(16,185,129,0.25)',
        light: 'rgba(16,185,129,0.08)',
    };

    // ━━━━━━ AI Strategic Intelligence ━━━━━━
    const aiAnalytics = useMemo(() => {
        const defaultResult = {
            problems: [],
            urgencyScore: 0,
            urgencyColor: '#10b981',
            urgencyLabel: 'ปกติ',
            latestFY: { fiscal_label: 'FY' },
            yoyGrowth: 0,
            strategicKPIs: [],
        };

        if (!pharmacyAnalytics) return defaultResult;

        const a = pharmacyAnalytics;
        const ppi = a.ppi ?? 0;
        const genericRatio = a.generic_ratio ?? 0;
        const drugCostPerRx = a.drug_cost_per_rx ?? 0;
        const revCostRatio = a.rev_cost_ratio ?? 1;
        const avgDailyRx = a.avg_daily_rx ?? 0;

        const problems = [];

        if (genericRatio < 60) {
            problems.push({
                priority: 1, severity: 'critical', color: '#f43f5e',
                title: 'Generic Drug Ratio ต่ำมาก: ' + genericRatio + '%',
                rootCause: 'ยา Generic มีสัดส่วนเพียง ' + genericRatio + '% (เป้าหมาย >= 80%) ทำให้ต้นทุนยาสูงเกินความจำเป็น',
                fixFirst: 'ทบทวน Formulary และกำหนดนโยบาย Generic First ทุกแผนก',
            });
        } else if (genericRatio < 75) {
            problems.push({
                priority: 2, severity: 'warning', color: '#f59e0b',
                title: 'Generic Drug Ratio ต่ำกว่าเป้า: ' + genericRatio + '%',
                rootCause: 'สัดส่วนยา Generic ยังต่ำกว่ามาตรฐาน 80% ทำให้ต้นทุนยาสูง',
                fixFirst: 'ประชุม PCT และ PTC เพื่อขยายรายการยา Generic ใน Formulary',
            });
        }

        if (drugCostPerRx > 800) {
            problems.push({
                priority: 2, severity: 'critical', color: '#f43f5e',
                title: 'ต้นทุนยาต่อ Rx สูงมาก: B' + drugCostPerRx.toLocaleString(),
                rootCause: 'ค่าเฉลี่ยยาต่อ 1 ใบสั่งยาสูงกว่าเกณฑ์ B500 บ่งชี้ว่ามียา High-Cost หรือ Brand Name มากเกินไป',
                fixFirst: 'วิเคราะห์ Top High-Cost Drug และเพิ่มทางเลือก Generic หรือเจรจาต่อรองราคา',
            });
        } else if (drugCostPerRx > 600) {
            problems.push({
                priority: 3, severity: 'warning', color: '#f59e0b',
                title: 'ต้นทุนยาต่อ Rx ตึงตัว: B' + drugCostPerRx.toLocaleString(),
                rootCause: 'ค่าเฉลี่ยยาต่อ Rx อยู่ที่ B' + drugCostPerRx.toLocaleString() + ' ใกล้เคียงเพดานที่ยอมรับได้',
                fixFirst: 'ติดตาม Top 10 High-Cost Drug และพิจารณา Therapeutic Substitution',
            });
        }

        if (revCostRatio < 1.0) {
            problems.push({
                priority: 1, severity: 'critical', color: '#f43f5e',
                title: 'Revenue/Cost Ratio < 1.0: ขาดทุนจากยา',
                rootCause: 'รายได้จากยาน้อยกว่าต้นทุน (Ratio: ' + revCostRatio.toFixed(2) + ') อาจมีปัญหาการ Charge ยาไม่ครบ',
                fixFirst: 'ตรวจสอบ Billing Completeness และระบบ Interface ระหว่างคลินิกกับห้องยา',
            });
        }

        if (avgDailyRx > 0 && avgDailyRx < 50) {
            problems.push({
                priority: 4, severity: 'info', color: '#0ea5e9',
                title: 'ปริมาณจ่ายยาต่ำ: ' + avgDailyRx + ' Rx/วัน',
                rootCause: 'ปริมาณ Prescription ต่ำกว่าเกณฑ์โรงพยาบาลขนาดเดียวกัน อาจมีปัญหา Interface หรือ Under-reporting',
                fixFirst: 'ตรวจสอบระบบ Interface ระหว่าง Doctor Workstation กับ Pharmacy System',
            });
        }

        if (a.top_drugs_by_value && a.top_drugs_by_value.length > 0) {
            const top1 = a.top_drugs_by_value[0];
            if (top1 && top1.value > 0) {
                problems.push({
                    priority: 5, severity: 'good', color: '#10b981',
                    title: 'ยาใช้สูงสุดด้านมูลค่า: ' + (top1.name?.substring(0, 30) || top1.icode),
                    rootCause: 'ยาดังกล่าวมีมูลค่าการจ่ายสูงถึง B' + top1.value.toLocaleString() + ' (30 วัน) ควรติดตามอย่างใกล้ชิด',
                    fixFirst: 'ตรวจสอบว่ามียา Generic ทดแทนได้หรือไม่ และติดตาม Stock Level ให้เพียงพอ',
                });
            }
        }

        // YoY Growth from fiscal data
        const years = pharmacyRevenueFiscal?.fiscal_years || [];
        const latestFY = years[years.length - 1] || { fiscal_label: 'FY' };
        const prevFY = years[years.length - 2];
        const latestRev = latestFY.comparable_revenue || latestFY.total_revenue || 0;
        const prevRev = prevFY ? (prevFY.comparable_revenue || prevFY.total_revenue || 0) : 0;
        const yoyGrowth = prevRev > 0 ? ((latestRev - prevRev) / prevRev * 100) : 0;

        const strategicKPIs = [
            { label: 'Generic Ratio', value: genericRatio + '%', color: genericRatio >= 80 ? '#10b981' : genericRatio >= 60 ? '#f59e0b' : '#f43f5e', icon: '💊' },
            { label: 'Cost/Rx', value: 'B' + drugCostPerRx.toLocaleString(), color: drugCostPerRx <= 500 ? '#10b981' : drugCostPerRx <= 700 ? '#f59e0b' : '#f43f5e', icon: '💰' },
            { label: 'Rev/Cost', value: revCostRatio.toFixed(2) + 'x', color: revCostRatio >= 1.2 ? '#10b981' : revCostRatio >= 1.0 ? '#f59e0b' : '#f43f5e', icon: '📈' },
            { label: 'PPI Score', value: '' + ppi, color: ppi >= 80 ? '#10b981' : ppi >= 60 ? '#f59e0b' : '#f43f5e', icon: '🎯' },
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
        };
    }, [pharmacyAnalytics, pharmacyRevenueFiscal]);

    // ━━━━━━ Fiscal Revenue Chart Data ━━━━━━
    const revenueChartData = useMemo(() => {
        if (!pharmacyRevenueFiscal?.fiscal_years) return [];
        const years = pharmacyRevenueFiscal.fiscal_years;
        const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
        return MONTH_ORDER.map((label, i) => {
            const row = { month: label };
            years.forEach((fy, fi) => {
                row['fy' + fi] = fy.months && fy.months[i] ? fy.months[i].revenue : 0;
            });
            return row;
        });
    }, [pharmacyRevenueFiscal]);

    // ━━━━━━ Monthly Trend Chart ━━━━━━
    const trendChartData = useMemo(() => {
        return (pharmacyAnalytics?.monthly_trend || []).map(m => ({
            month: m.month,
            prescriptions: m.prescriptions,
            value: m.value,
        }));
    }, [pharmacyAnalytics]);

    // ━━━━━━ Derived metrics for MetricsStrip ━━━━━━
    const totalRx = pharmacyToday.total_prescriptions || 0;
    const opdRx = pharmacyToday.opd_prescriptions || 0;
    const ipdRx = pharmacyToday.ipd_prescriptions || 0;
    const totalValue = pharmacyToday.total_value || 0;
    const avgCostPerRx = totalRx > 0 ? Math.round(totalValue / totalRx) : 0;
    const genericRatio = pharmacyAnalytics?.generic_ratio ?? 0;
    const ppi = pharmacyAnalytics?.ppi ?? 0;
    const staffCount = (pharmacyAnalytics?.on_duty?.pharmacists?.length || 0) + (pharmacyAnalytics?.on_duty?.staff?.length || 0);
    const topDrugName = pharmacyAnalytics?.top_drugs_by_value?.[0]?.name?.substring(0, 20) || '--';

    return (
        <div className="space-y-4 animate-fade-in pb-8">

            {/* ━━━ AI Pharmacy Intelligence Feed (Hero Strip) ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginBottom: '1rem' }}>
                <div className="glass-card" style={{
                    padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                    borderLeft: '5px solid ' + aiAnalytics.urgencyColor,
                    background: 'linear-gradient(90deg, ' + aiAnalytics.urgencyColor + '10 0%, transparent 100%)'
                }}>
                    <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))' }}>🤖</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                AI Pharmacy Diagnostics
                            </p>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: aiAnalytics.urgencyColor, color: 'white', fontSize: '11px', fontWeight: 900 }}>
                                {aiAnalytics.urgencyLabel}
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                            {loading.pharmacyAnalytics
                                ? 'กำลังประมวลผลอัลกอริทึมวิเคราะห์...'
                                : (aiAnalytics.problems[0]?.title || 'ระบบเภสัชกรรมดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด')}
                        </p>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '14px 20px', textAlign: 'center', minWidth: '150px' }}>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: THEME.primary, textTransform: 'uppercase' }}>Drug Revenue YoY</p>
                    <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 900, color: aiAnalytics.yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                        {aiAnalytics.yoyGrowth >= 0 ? '\u2191' : '\u2193'} {Math.abs(aiAnalytics.yoyGrowth).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* ━━━ Key Pharmacy Metrics Strip (8 KPIs) ━━━ */}
            <MetricsStrip
                metrics={[
                    {
                        label: 'Total Rx',
                        value: totalRx,
                        unit: 'Rx',
                        status: totalRx > 0 ? 'success' : 'neutral',
                        icon: '📋',
                    },
                    {
                        label: 'OPD Rx',
                        value: opdRx,
                        unit: 'Rx',
                        status: opdRx > 0 ? 'success' : 'neutral',
                        icon: '🏥',
                    },
                    {
                        label: 'IPD Rx',
                        value: ipdRx,
                        unit: 'Rx',
                        status: ipdRx > 0 ? 'success' : 'neutral',
                        icon: '🛏️',
                    },
                    {
                        label: 'Total Value',
                        value: totalValue > 1000 ? (totalValue / 1000).toFixed(1) : totalValue,
                        unit: totalValue > 1000 ? 'K' : 'B',
                        status: 'neutral',
                        icon: '💰',
                    },
                    {
                        label: 'Avg Cost/Rx',
                        value: avgCostPerRx,
                        unit: 'B',
                        target: 500,
                        status: avgCostPerRx > 0 ? (avgCostPerRx <= 500 ? 'success' : avgCostPerRx <= 700 ? 'warning' : 'danger') : 'neutral',
                        icon: '📊',
                    },
                    {
                        label: 'Generic Ratio',
                        value: genericRatio,
                        unit: '%',
                        target: 80,
                        status: genericRatio >= 80 ? 'success' : genericRatio >= 60 ? 'warning' : 'danger',
                        icon: '💊',
                    },
                    {
                        label: 'PPI Score',
                        value: ppi,
                        unit: '/100',
                        target: 80,
                        status: ppi >= 80 ? 'success' : ppi >= 60 ? 'warning' : 'danger',
                        icon: '🎯',
                    },
                    {
                        label: 'Staff On-Duty',
                        value: staffCount,
                        unit: 'คน',
                        status: staffCount > 0 ? 'success' : 'neutral',
                        icon: '👨‍⚕️',
                    },
                ]}
            />

            {/* ━━━ AI Pharmacy Analytics Intelligence Hub ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', marginTop: '12px' }}>
                <div style={{ width: '4px', height: '22px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🧠 AI Pharmacy Performance Intelligence
                </h3>
                <span style={{ fontSize: '11px', background: 'rgba(16,185,129,.15)', color: '#10b981', padding: '3px 10px', borderRadius: '4px', fontWeight: 800, marginLeft: 'auto' }}>REAL-TIME INSIGHTS</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '1.5rem' }}>
                {/* Pharmacy Performance Intelligence */}
                <AIInsightCard
                    title="Pharmacy Performance Index (PPI)"
                    icon="🎯"
                    priority={ppi >= 80 ? 'LOW' : ppi >= 60 ? 'MEDIUM' : 'HIGH'}
                    summary={'PPI Score: ' + ppi + '/100' + (ppi >= 80 ? ' -- Optimal Performance' : ppi >= 60 ? ' -- Needs Improvement' : ' -- Critical')}
                    analysis={ppi >= 80
                        ? 'ระบบเภสัชกรรมทำงานได้ดีรอบด้าน Generic Ratio, Cost Efficiency, และ Volume อยู่ในเกณฑ์มาตรฐาน'
                        : 'PPI ต่ำกว่าเกณฑ์ ตรวจสอบ Component ที่คะแนนต่ำสุดเพื่อปรับปรุง'}
                    recommendation={ppi >= 80
                        ? 'รักษาระดับ PPI ให้คงที่ และมุ่ง Excellence ที่ >= 85'
                        : 'ทบทวน Generic Ratio และ Drug Cost per Rx เป็นลำดับแรก'}
                    confidence={94}
                    gradient="#10b981"
                    gradientFrom="rgba(16,185,129,.08)"
                    gradientTo="rgba(5,150,105,.04)"
                    borderColor="rgba(16,185,129,.25)"
                />

                {/* Cost Optimization */}
                <AIInsightCard
                    title="Drug Cost Optimization"
                    icon="💰"
                    priority={(pharmacyAnalytics?.drug_cost_per_rx ?? 0) <= 500 ? 'LOW' : (pharmacyAnalytics?.drug_cost_per_rx ?? 0) <= 700 ? 'MEDIUM' : 'HIGH'}
                    summary={'Avg Cost/Rx: B' + (pharmacyAnalytics?.drug_cost_per_rx ?? 0).toLocaleString() + (((pharmacyAnalytics?.drug_cost_per_rx ?? 0) <= 500) ? ' -- Within Target' : ' -- Above Benchmark')}
                    analysis={'ต้นทุนยาเฉลี่ย B' + (pharmacyAnalytics?.drug_cost_per_rx ?? 0).toLocaleString() + ' ต่อ Rx (' + ((pharmacyAnalytics?.drug_cost_per_rx ?? 0) <= 500 ? 'ดีเยี่ยม' : 'สูงกว่าเกณฑ์') + ') Rev/Cost Ratio: ' + (pharmacyAnalytics?.rev_cost_ratio ?? 1).toFixed(2) + 'x'}
                    recommendation={(pharmacyAnalytics?.drug_cost_per_rx ?? 0) <= 500
                        ? 'Formulary มีประสิทธิภาพ เน้นรักษาสัดส่วน Generic'
                        : 'วิเคราะห์ Top High-Cost Drug และพิจารณา Therapeutic Substitution'}
                    confidence={91}
                    gradient="#f59e0b"
                    gradientFrom="rgba(245,158,11,.08)"
                    gradientTo="rgba(234,179,8,.04)"
                    borderColor="rgba(245,158,11,.25)"
                />

                {/* Drug Utilization */}
                <AIInsightCard
                    title="Drug Utilization & Generic Policy"
                    icon="💊"
                    priority={genericRatio >= 80 ? 'LOW' : genericRatio >= 60 ? 'MEDIUM' : 'HIGH'}
                    summary={'Generic Ratio: ' + genericRatio + '%' + (genericRatio >= 80 ? ' -- Excellent' : ' -- Below Target (80%)')}
                    analysis={'สัดส่วนยา Generic ' + genericRatio + '% ' + (genericRatio >= 80 ? 'ดีเยี่ยม ลดต้นทุนยาได้อย่างมีประสิทธิภาพ' : 'ต่ำกว่าเป้าหมาย 80% ส่งผลให้ต้นทุนยาสูง') + ' OPD Rx(30D): ' + (pharmacyAnalytics?.opd_rx?.toLocaleString() || '0') + ' IPD Rx(30D): ' + (pharmacyAnalytics?.ipd_rx?.toLocaleString() || '0')}
                    recommendation={genericRatio >= 80
                        ? 'รักษานโยบาย Generic First และทบทวน Formulary อย่างต่อเนื่อง'
                        : 'เรียกประชุม PTC กำหนดนโยบาย Generic First เร่งด่วน'}
                    confidence={96}
                    gradient="#8b5cf6"
                    gradientFrom="rgba(139,92,246,.08)"
                    gradientTo="rgba(99,102,241,.04)"
                    borderColor="rgba(139,92,246,.25)"
                />

                {/* Operational Efficiency */}
                <AIInsightCard
                    title="Operational Efficiency & Workload"
                    icon="⚙️"
                    priority={staffCount >= 3 ? 'LOW' : staffCount >= 1 ? 'MEDIUM' : 'HIGH'}
                    summary={'On-Duty Staff: ' + staffCount + ' | Avg Daily Rx: ' + (pharmacyAnalytics?.avg_daily_rx?.toFixed(0) || '0') + ' Rx/day'}
                    analysis={'บุคลากร ' + staffCount + ' คนปฏิบัติงานวันนี้ จ่ายยาเฉลี่ย ' + (pharmacyAnalytics?.avg_daily_rx?.toFixed(0) || '0') + ' Rx/วัน (30D) ' + (staffCount > 0 ? 'Rx/Staff: ~' + Math.round((pharmacyAnalytics?.avg_daily_rx || 0) / Math.max(staffCount, 1)) : '')}
                    recommendation={staffCount >= 3
                        ? 'กำลังคนเพียงพอ ติดตาม Workload Balance ระหว่างเวร'
                        : 'กำลังคนน้อย ควรจัดเตรียมเวรสำรองเพื่อป้องกัน Burnout'}
                    confidence={88}
                    gradient="#0ea5e9"
                    gradientFrom="rgba(14,165,233,.08)"
                    gradientTo="rgba(3,102,214,.04)"
                    borderColor="rgba(14,165,233,.25)"
                />
            </div>

            {/* ━━━ Today's Performance (Hero Card + KPIv2) ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {/* Today RX Card */}
                <div style={{
                    gridColumn: 'span 2', padding: '1.5rem', borderRadius: '20px',
                    background: THEME.gradient, border: '1px solid ' + THEME.border,
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '120px', opacity: 0.05 }}>💊</div>
                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: THEME.primary, margin: 0, letterSpacing: '0.08em' }}>
                        Today Dispensing
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
                        <div>
                            <span style={{ fontSize: '42px', fontWeight: 950, color: THEME.secondary, letterSpacing: '-0.04em' }}>
                                {(pharmacyToday.total_prescriptions || 0).toLocaleString('th-TH')}
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700, marginLeft: '6px' }}>Rx</span>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>OPD Rx</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: THEME.primary }}>{pharmacyToday.opd_prescriptions || 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>IPD Rx</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#8b5cf6' }}>{pharmacyToday.ipd_prescriptions || 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>มูลค่ารวม</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b' }}>B{(pharmacyToday.total_value || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <KPICardV2
                    title="Generic Ratio (30D)"
                    value={pharmacyAnalytics?.generic_ratio || 0}
                    unit="% ยา Generic"
                    icon="💊"
                    loading={loading.pharmacyAnalytics}
                    color="green"
                    aiInsight={(pharmacyAnalytics?.generic_ratio || 0) >= 80
                        ? 'Generic ratio ดีเยี่ยม -- ลดต้นทุนยาได้อย่างมีประสิทธิภาพ'
                        : 'Generic ratio ต่ำกว่าเป้าหมาย -- ควรทบทวน Formulary'}
                />
                <KPICardV2
                    title="PPI Index"
                    value={pharmacyAnalytics?.ppi || 0}
                    unit="/100 (Pharmacy Score)"
                    icon="🎯"
                    loading={loading.pharmacyAnalytics}
                    color="purple"
                    aiInsight={(pharmacyAnalytics?.ppi || 0) >= 80
                        ? 'PPI สูง -- ระบบเภสัชกรรมทำงานได้ดีรอบด้าน'
                        : 'PPI ต่ำ -- ตรวจสอบ Generic Ratio และ Cost Efficiency'}
                />
            </div>

            {/* ━━━ On-Duty Pharmacy Personnel ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, ' + THEME.primary + ', ' + THEME.secondary + ')', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💊 บุคลากรเภสัชกรรมที่ปฏิบัติหน้าที่วันนี้ (On-Duty)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>
                    HOSxP Activity Logs
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {/* Active Pharmacists */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: THEME.light, borderBottom: '1px solid ' + THEME.border, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>💊</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: THEME.primary }}>เภสัชกร (ภก./ภญ.)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: THEME.primary, opacity: 0.8 }}>
                            {pharmacyAnalytics?.on_duty?.pharmacists?.length || 0}
                        </span>
                    </div>
                    <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.pharmacyAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (pharmacyAnalytics?.on_duty?.pharmacists?.length > 0) ? (
                            pharmacyAnalytics.on_duty.pharmacists.map((ph, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && ph.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && ph.afternoon_count > 0) ||
                                    (currentHour >= 17 && ph.night_count > 0);
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, ' + THEME.primary + ', ' + THEME.secondary + ')' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                                        }}>
                                            {(ph.staff_name || '').replace(/ภก\.|ภญ\.|นภ\./g, '').trim().substring(0, 1) || 'P'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ph.staff_name || 'Unknown'}</p>
                                            <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Pharmacist</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: ph.morning_count > 0 ? THEME.primary : '#ccc' }}>🌅{ph.morning_count || 0}</span>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: ph.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{ph.afternoon_count || 0}</span>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: ph.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{ph.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: THEME.primary }}>{ph.prescriptions}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Rx</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '11px' }}>ไม่พบข้อมูลเภสัชกรวันนี้</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pharmacy Support Staff */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(99,102,241,.05)', borderBottom: '1px solid rgba(99,102,241,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#6366f1' }}>เจ้าหน้าที่ห้องยา (Support)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1', opacity: 0.8 }}>
                            {pharmacyAnalytics?.on_duty?.staff?.length || 0}
                        </span>
                    </div>
                    <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.pharmacyAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (pharmacyAnalytics?.on_duty?.staff?.length > 0) ? (
                            pharmacyAnalytics.on_duty.staff.map((st, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && st.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && st.afternoon_count > 0) ||
                                    (currentHour >= 17 && st.night_count > 0);
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                                        }}>
                                            {st.staff_name?.substring(0, 1) || 'S'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.staff_name}</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#6366f1' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#6366f1' }}>{st.prescriptions}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Rx</p>
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

            {/* ━━━ Deep Diagnostics Panel ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                {/* Strategic Indicators */}
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: THEME.primary, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>ST-01</span>
                        Strategic Indicators
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {aiAnalytics.strategicKPIs.length > 0 ? aiAnalytics.strategicKPIs.map((kpi, idx) => (
                            <div key={idx} style={{ padding: '14px 10px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{kpi.icon}</div>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 950, color: kpi.color }}>{kpi.value}</p>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginTop: '2px' }}>{kpi.label}</p>
                            </div>
                        )) : (
                            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', fontSize: '13px' }}>
                                {loading.pharmacyAnalytics ? 'รวบรวมข้อมูล...' : 'No Data Available'}
                            </div>
                        )}
                    </div>

                    {/* OPD vs IPD Split */}
                    {pharmacyAnalytics && (
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--md-border)' }}>
                            <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>OPD vs IPD Split (30D)</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ flex: 1, padding: '10px', background: THEME.light, borderRadius: '10px', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: THEME.primary }}>{pharmacyAnalytics.opd_rx?.toLocaleString() || 0}</p>
                                    <p style={{ margin: 0, fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>OPD Rx</p>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: THEME.primary }}>B{((pharmacyAnalytics.opd_value || 0) / 1000).toFixed(0)}K</p>
                                </div>
                                <div style={{ flex: 1, padding: '10px', background: 'rgba(139,92,246,0.08)', borderRadius: '10px', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#8b5cf6' }}>{pharmacyAnalytics.ipd_rx?.toLocaleString() || 0}</p>
                                    <p style={{ margin: 0, fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>IPD Rx</p>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#8b5cf6' }}>B{((pharmacyAnalytics.ipd_value || 0) / 1000).toFixed(0)}K</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Problem Discovery */}
                <div className="glass-card" style={{ padding: '20px', borderLeft: '5px solid ' + aiAnalytics.urgencyColor }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: aiAnalytics.urgencyColor, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>AI-DX</span>
                        Problem Discovery & Diagnosis
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {aiAnalytics.problems.length > 0 ? aiAnalytics.problems.map((p, idx) => (
                            <div key={idx} style={{ padding: '14px', borderRadius: '16px', background: p.color + '08', border: '1px solid ' + p.color + '20' }}>
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

            {/* ━━━ KPI Description Cards ━━━ */}
            {pharmacyAnalytics && (() => {
                const a = pharmacyAnalytics;
                const gr = a.generic_ratio ?? 0;
                const pp = a.ppi ?? 0;
                const dcr = a.drug_cost_per_rx ?? 0;
                const rcr = a.rev_cost_ratio ?? 1;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'Generic Drug Ratio', thLabel: 'สัดส่วนยา Generic',
                            value: gr + '%',
                            color: gr >= 80 ? '#10b981' : gr >= 60 ? '#f59e0b' : '#f43f5e', icon: '💊',
                            sub: gr >= 80 ? 'ดีเยี่ยม' : gr >= 60 ? 'ปานกลาง' : 'ต่ำกว่าเกณฑ์',
                            desc: 'ยา Generic ' + gr + '% ของทั้งหมด (เป้าหมาย >= 80%)',
                            meaning: 'สัดส่วนปริมาณยา Generic ต่อยาทั้งหมดที่จ่ายออก สะท้อนประสิทธิภาพการควบคุมต้นทุนยาและนโยบาย Generic First',
                            calc: '(ปริมาณยา Generic / ปริมาณยาทั้งหมด) x 100',
                            dataSource: 'opitemrece + drugitems (HOSxP XE)',
                            period: '30 วันย้อนหลัง ถึง ' + todayShort,
                            target: '>= 80%',
                            benchmark: 'กสธ.: >= 80% | HA: >= 75%',
                            aiTip: gr >= 80 ? 'Generic ratio ดีเยี่ยม -- ประหยัดงบยาได้มาก' : 'Generic ratio ต่ำ -- ทบทวน Formulary และ PTC Policy',
                        },
                        {
                            label: 'Drug Cost per Rx', thLabel: 'ต้นทุนยาต่อใบสั่งยา',
                            value: 'B' + dcr.toLocaleString(),
                            color: dcr <= 500 ? '#10b981' : dcr <= 700 ? '#f59e0b' : '#f43f5e', icon: '💰',
                            sub: dcr <= 500 ? 'ดีเยี่ยม' : dcr <= 700 ? 'ปานกลาง' : 'สูงกว่าเกณฑ์',
                            desc: 'ต้นทุนยาเฉลี่ย B' + dcr.toLocaleString() + ' ต่อ 1 Prescription',
                            meaning: 'ค่าใช้จ่ายยาเฉลี่ยต่อ 1 ใบสั่งยา (OPD) วัดความมีประสิทธิภาพของการสั่งยาและ Formulary Management',
                            calc: 'Total Drug Revenue (30D) / Total Prescriptions (30D)',
                            dataSource: 'opitemrece (HOSxP XE)',
                            period: '30 วันย้อนหลัง',
                            target: '<= B500',
                            benchmark: 'รพ.ชุมชน: B300-500 | รพ.ศูนย์: B500-800',
                            aiTip: dcr <= 500 ? 'ต้นทุนยาดี -- Formulary มีประสิทธิภาพ' : 'ต้นทุนสูง -- วิเคราะห์ Top High-Cost Drug และพิจารณา Generic Substitution',
                        },
                        {
                            label: 'Revenue/Cost Ratio', thLabel: 'อัตราส่วนรายได้ต่อต้นทุนยา',
                            value: rcr.toFixed(2) + 'x',
                            color: rcr >= 1.2 ? '#10b981' : rcr >= 1.0 ? '#f59e0b' : '#f43f5e', icon: '📈',
                            sub: rcr >= 1.2 ? 'กำไรดี' : rcr >= 1.0 ? 'คุ้มทุน' : 'ขาดทุน',
                            desc: 'รายได้ยา ' + rcr.toFixed(2) + ' เท่าของต้นทุน',
                            meaning: 'อัตราส่วนรายได้จากยาต่อต้นทุนยา บ่งชี้ความสมบูรณ์ของการ Charge ยาและประสิทธิภาพ Billing',
                            calc: 'Total Drug Revenue / Total Drug Cost (30D)',
                            dataSource: 'opitemrece + drugitems (HOSxP XE)',
                            period: '30 วันย้อนหลัง',
                            target: '>= 1.2x',
                            benchmark: 'Break-even: 1.0x | Target: >= 1.2x',
                            aiTip: rcr >= 1.2 ? 'Revenue/Cost ดี -- Billing Completeness สูง' : 'Ratio ต่ำ -- ตรวจสอบ Interface และ Auto-charge ระบบยา',
                        },
                        {
                            label: 'PPI Score', thLabel: 'ดัชนีประสิทธิภาพเภสัชกรรม',
                            value: '' + pp,
                            color: pp >= 80 ? '#10b981' : pp >= 60 ? '#f59e0b' : '#f43f5e', icon: '🎯',
                            sub: pp >= 80 ? 'Optimal' : pp >= 60 ? 'Fair' : 'Critical',
                            desc: 'Pharmacy Performance Index: ' + pp + '/100',
                            meaning: 'ดัชนีรวมประสิทธิภาพงานเภสัชกรรม คำนวณจาก Generic Ratio + Cost Efficiency + Volume + Revenue/Cost Ratio',
                            calc: 'Generic(30%) + Cost(25%) + Volume(20%) + RevCost(25%)',
                            dataSource: 'AI Composite (HOSxP XE)',
                            period: 'ประมวลผล ' + todayShort,
                            target: '>= 80',
                            benchmark: 'BCH Internal >=75 | Excellence >=85',
                            aiTip: pp >= 80 ? 'PPI สูง -- งานเภสัชกรรมดีรอบด้าน' : 'PPI ต่ำ -- ตรวจสอบ Component ที่คะแนนต่ำสุด (Generic Ratio หรือ Cost)',
                        },
                        {
                            label: 'Avg Daily Rx', thLabel: 'ปริมาณจ่ายยาเฉลี่ยต่อวัน',
                            value: '' + (a.avg_daily_rx?.toFixed(0) || 0),
                            color: '#8b5cf6', icon: '📋',
                            sub: 'Rx/วัน',
                            desc: 'จ่ายยาเฉลี่ย ' + (a.avg_daily_rx?.toFixed(0) || 0) + ' ใบสั่งยาต่อวัน (30D)',
                            meaning: 'ปริมาณ Prescription เฉลี่ยต่อวันทำการ (OPD) สะท้อน Workload ของห้องยาและกำลังคนที่ต้องการ',
                            calc: 'Total OPD Prescriptions (30D) / Active Days',
                            dataSource: 'opitemrece + ovst (HOSxP XE)',
                            period: '30 วันย้อนหลัง',
                            target: 'ตามมาตรฐานของโรงพยาบาล',
                            benchmark: 'รพ.ชุมชน: 50-200 Rx/วัน',
                            aiTip: 'ติดตาม Trend เพื่อวางแผนกำลังคนและจัดซื้อยาให้เหมาะสม',
                        },
                    ]} />
                );
            })()}

            {/* ━━━ Top Drugs Table ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💊 Top Drug Analysis (30 วันย้อนหลัง)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(139,92,246,.08)', padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Data</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* By Value */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                        Top 10 ยา -- มูลค่าสูงสุด (30D)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {(pharmacyAnalytics?.top_drugs_by_value || []).slice(0, 10).map((item, idx) => {
                            const maxVal = pharmacyAnalytics?.top_drugs_by_value?.[0]?.value || 1;
                            const pct = Math.round((item.value / maxVal) * 100);
                            return (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '10px', border: '1px solid var(--md-border)' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: THEME.light, color: THEME.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '10px', flexShrink: 0 }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || item.icode}</p>
                                        <div style={{ marginTop: '3px', height: '3px', borderRadius: '99px', background: 'var(--md-border)', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg, ' + THEME.primary + ', ' + THEME.secondary + ')', borderRadius: '99px', transition: 'width 0.5s ease' }} />
                                        </div>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)' }}>{item.units} | {item.visits} visits</p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: THEME.primary }}>B{(item.value / 1000).toFixed(1)}K</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{item.qty?.toLocaleString()} หน่วย</p>
                                    </div>
                                </div>
                            );
                        })}
                        {(!pharmacyAnalytics?.top_drugs_by_value || pharmacyAnalytics.top_drugs_by_value.length === 0) && !loading.pharmacyAnalytics && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>ไม่มีข้อมูล</div>
                        )}
                    </div>
                </div>

                {/* By Volume */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                        Top 10 ยา -- ปริมาณสูงสุด (30D)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {(pharmacyAnalytics?.top_drugs_by_volume || []).slice(0, 10).map((item, idx) => {
                            const maxQty = pharmacyAnalytics?.top_drugs_by_volume?.[0]?.qty || 1;
                            const pct = Math.round((item.qty / maxQty) * 100);
                            return (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '10px', border: '1px solid var(--md-border)' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(139,92,246,0.08)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '10px', flexShrink: 0 }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || item.icode}</p>
                                        <div style={{ marginTop: '3px', height: '3px', borderRadius: '99px', background: 'var(--md-border)', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '99px', transition: 'width 0.5s ease' }} />
                                        </div>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)' }}>{item.units} | {item.visits} visits</p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#8b5cf6' }}>{item.qty?.toLocaleString()}</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>หน่วย</p>
                                    </div>
                                </div>
                            );
                        })}
                        {(!pharmacyAnalytics?.top_drugs_by_volume || pharmacyAnalytics.top_drugs_by_volume.length === 0) && !loading.pharmacyAnalytics && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>ไม่มีข้อมูล</div>
                        )}
                    </div>
                </div>
            </div>

            {/* ━━━ Monthly Trend (30D-6M) ━━━ */}
            {trendChartData.length > 0 && (
                <div className="glass-card" style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                        Prescription Volume Trend (6 เดือนย้อนหลัง)
                    </p>
                    <div style={{ height: '240px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ stroke: THEME.primary, strokeWidth: 1 }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '12px' }}
                                />
                                <Line type="monotone" dataKey="prescriptions" name="Prescriptions" stroke={THEME.primary} strokeWidth={2.5} dot={{ fill: THEME.primary, strokeWidth: 0, r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* ━━━ Fiscal Revenue Comparison ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, ' + THEME.primary + ', #059669)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 Drug Revenue -- Fiscal Year Comparison
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Data Intelligence</span>
            </div>

            {/* Fiscal Year Revenue Summary Cards */}
            {pharmacyRevenueFiscal?.fiscal_years && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + Math.min(pharmacyRevenueFiscal.fiscal_years.length, 3) + ', 1fr)', gap: '12px', marginBottom: '12px' }}>
                    {pharmacyRevenueFiscal.fiscal_years.slice(-3).map((fy, fi) => {
                        const isLatest = fi === pharmacyRevenueFiscal.fiscal_years.slice(-3).length - 1;
                        const FY_COLORS = ['#94a3b8', '#6ee7b7', '#10b981'];
                        const fyColor = FY_COLORS[fi] || '#10b981';
                        return (
                            <div key={fi} style={{
                                padding: '14px', borderRadius: '14px',
                                border: '1px solid ' + fyColor + '30',
                                background: fyColor + '08',
                                borderTop: '3px solid ' + fyColor,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: fyColor }} />
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: fyColor }}>{fy.fiscal_label}</span>
                                    {isLatest && <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: fyColor, padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>CURRENT</span>}
                                </div>
                                <p style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: fyColor }}>B{(fy.total_revenue / 1e6).toFixed(2)}M</p>
                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                    {fy.total_visits ? fy.total_visits.toLocaleString() + ' visits' : 'Revenue Only'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                            Drug Revenue -- Fiscal Year Comparison
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                            เปรียบเทียบรายได้ยาปีงบประมาณปัจจุบันและย้อนหลัง
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {pharmacyRevenueFiscal?.fiscal_years?.slice(-2).map((fy, fi) => (
                            <div key={fi} style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{fy.fiscal_label}</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: fi === 1 ? THEME.primary : 'var(--md-text-secondary)' }}>
                                    B{(fy.total_revenue / 1e6).toFixed(2)}M
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {pharmacyRevenueFiscal?.fiscal_years ? (
                    <div style={{ height: '320px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="pharmaBarGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(16,185,129,0.05)' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '12px' }}
                                />
                                {pharmacyRevenueFiscal.fiscal_years.map((fy, fi) => {
                                    const isLatest = fi === pharmacyRevenueFiscal.fiscal_years.length - 1;
                                    return (
                                        <Bar key={fi} dataKey={'fy' + fi} name={fy.fiscal_label}
                                            fill={isLatest ? 'url(#pharmaBarGrad)' : '#cbd5e1'}
                                            radius={[6, 6, 0, 0]} barSize={isLatest ? 28 : 20}
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
                            <p style={{ color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                {loading.pharmacyRevenueFiscal ? 'Predictive Analytics is running...' : 'Financial Data Stream Offline'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', opacity: 0.3, padding: '16px 0' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--md-text-tertiary)', textTransform: 'uppercase', margin: 0 }}>
                    BCH Pharmacy Intelligence | Protocol v10.4 | High Fidelity Analytics
                </p>
            </div>

        </div>
    );
}

export default React.memo(PharmacyTab);
