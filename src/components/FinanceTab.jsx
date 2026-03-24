// ============================================================
// BCH 360° Intelligence V.10 - Finance & RCM Tab
// 🧠 AI Revenue Forecast + Professional Finance Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition — Performance Optimized
// ============================================================
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis,
    Tooltip, CartesianGrid, ReferenceLine, Legend,
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';

const COLORS = ['#7c3aed', '#f43f5e', '#f59e0b', '#0ea5e9', '#10b981', '#8b5cf6'];

function FinanceTab() {
    const { state, fetchData } = useDashboard();
    const { financeSummary, denialAnalytics, paymentPropensity, ppfsComparison,
            revenueForecast, drgLeakage } = state;


    const finAnalytics = state.financeAnalytics;
    const loading = state.loading;
    const [hoverCard, setHoverCard] = useState(null);

    useEffect(() => {
        // ━━ Tier 1: Critical finance data — show first ━━
        fetchData('financeSummary', `/api/finance/monthly-summary?year=${new Date().getFullYear()}`);
        fetchData('financeAnalytics', '/api/finance/analytics');
        fetchData('denialAnalytics', '/api/finance/denial-analytics');
        fetchData('ppfsComparison', '/api/finance/ppfs-comparison');

        // ━━ Tier 2: AI modules — deferred 200ms ━━
        const t2 = setTimeout(() => {
            fetchData('paymentPropensity', '/api/ai/propensity-to-pay');
        }, 200);
        // ━━ Tier 3: Heavy AI endpoints — deferred 600ms ━━
        const t3 = setTimeout(() => {
            fetchData('revenueForecast', '/api/finance/revenue-forecast');
            fetchData('drgLeakage',      '/api/finance/drg-leakage');
        }, 600);
        return () => { clearTimeout(t2); clearTimeout(t3); };
    }, [fetchData]);


    const summary = financeSummary?.summary;

    return (
        <div className="space-y-4 animate-fade-in pb-10">
            {/* ━━ Critical Denial Risk Alert ━━ */}
            {finAnalytics?.ai_insights?.risk_intelligence?.score < 70 && (
                <AlertBanner
                    severity="critical"
                    title="⚠️ High Claim Denial Risk Detected"
                    message={`Denial rate: ${denialAnalytics?.denial_rate != null ? Number(denialAnalytics.denial_rate).toFixed(1) + '%' : 'N/A'}. ${denialAnalytics?.total_denied ? denialAnalytics.total_denied + ' cases denied.' : ''} ${denialAnalytics?.amount_at_risk ? 'Amount at risk: ฿' + Number(denialAnalytics.amount_at_risk).toLocaleString() : ''}`}
                    icon="🚨"
                    actions={[
                        { label: 'Review Cases', onClick: () => {}, primary: true },
                        { label: 'View Details', onClick: () => {} }
                    ]}
                />
            )}

            {/* ━━ AI Finance & Revenue Intelligence Hub ━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', marginTop: '12px' }}>
                <div style={{ width: '4px', height: '22px', background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🧠 AI Revenue Intelligence (Executive Briefing)
                </h3>
                <span style={{ fontSize: '11px', background: 'rgba(139,92,246,.15)', color: '#8b5cf6', padding: '3px 10px', borderRadius: '4px', fontWeight: 800, marginLeft: 'auto' }}>REAL-TIME INSIGHTS</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '1.5rem' }}>
                {/* Revenue Health — AIInsightCard */}
                <AIInsightCard
                    title="Revenue Health & RCM Performance"
                    icon="💵"
                    priority={finAnalytics?.ai_insights?.revenue_health?.score >= 80 ? 'LOW' : 'MEDIUM'}
                    summary={`RCM Score: ${finAnalytics?.ai_insights?.revenue_health?.score || 0}/100${finAnalytics?.ai_insights?.revenue_health?.score >= 80 ? ' ✓ Optimal' : ' ⚠️ Below Target'}`}
                    analysis={finAnalytics?.ai_insights?.revenue_health?.analysis || 'วิเคราะห์ประสิทธิภาพวงจรรายได้ (Charge Capture → Coding → Billing → Collection)'}
                    recommendation={finAnalytics?.ai_insights?.revenue_health?.recommendation || ''}
                    confidence={96}
                    gradient="#8b5cf6"
                    gradientFrom="rgba(139,92,246,.08)"
                    gradientTo="rgba(99,102,241,.04)"
                    borderColor="rgba(139,92,246,.25)"
                    actionButtons={[
                        { label: 'View RCM Dashboard', onClick: () => {} }
                    ]}
                />

                {/* Growth Strategy — AIInsightCard */}
                <AIInsightCard
                    title="Revenue Growth & Strategic Direction"
                    icon="🚀"
                    priority={finAnalytics?.ai_insights?.growth_strategy?.status === 'expanding' ? 'LOW' : finAnalytics?.ai_insights?.growth_strategy?.status === 'declining' ? 'HIGH' : 'MEDIUM'}
                    summary={`YoY Growth: ${finAnalytics?.metrics?.yoy_growth_pct >= 0 ? '+' : ''}${finAnalytics?.metrics?.yoy_growth_pct ?? 0}%${finAnalytics?.metrics?.yoy_growth_pct >= 5 ? ' 📈 Expanding' : finAnalytics?.metrics?.yoy_growth_pct >= 0 ? ' ➡️ Stable' : ' 📉 Declining'} · MoM: ${finAnalytics?.metrics?.growth_pct_prorata >= 0 ? '+' : ''}${finAnalytics?.metrics?.growth_pct_prorata ?? finAnalytics?.metrics?.growth_pct ?? 0}% (pro-rata)`}
                    analysis={finAnalytics?.ai_insights?.growth_strategy?.analysis || 'วิเคราะห์แนวโน้มการเติบโต'}
                    recommendation={finAnalytics?.ai_insights?.growth_strategy?.recommendation || ''}
                    confidence={91}
                    gradient="#0ea5e9"
                    gradientFrom="rgba(14,165,233,.08)"
                    gradientTo="rgba(3,102,214,.04)"
                    borderColor="rgba(14,165,233,.25)"
                    actionButtons={[
                        { label: 'View Growth Analysis', onClick: () => {} }
                    ]}
                />

                {/* Operational Efficiency — AIInsightCard */}
                <AIInsightCard
                    title="Operational Efficiency & Productivity"
                    icon="⚙️"
                    priority={finAnalytics?.ai_insights?.operational_efficiency?.status === 'efficient' ? 'LOW' : 'MEDIUM'}
                    summary={`Efficiency: ${finAnalytics?.ai_insights?.operational_efficiency?.score || 0}% · Margin: ${finAnalytics?.metrics?.profit_margin ?? 0}% · Denial: ${finAnalytics?.metrics?.denial_rate ?? 0}%`}
                    analysis={finAnalytics?.ai_insights?.operational_efficiency?.analysis || 'ประเมินประสิทธิภาพวงจรรายได้'}
                    recommendation={finAnalytics?.ai_insights?.operational_efficiency?.recommendation || ''}
                    confidence={88}
                    gradient="#10b981"
                    gradientFrom="rgba(16,185,129,.08)"
                    gradientTo="rgba(5,150,105,.04)"
                    borderColor="rgba(16,185,129,.25)"
                    actionButtons={[
                        { label: 'View Efficiency Details', onClick: () => {} }
                    ]}
                />

                {/* Risk Intelligence — AIInsightCard */}
                <AIInsightCard
                    title="Strategic Financial Risk Index"
                    icon="🛡️"
                    priority={finAnalytics?.ai_insights?.risk_intelligence?.score >= 70 ? 'LOW' : 'HIGH'}
                    summary={`Risk Score: ${finAnalytics?.ai_insights?.risk_intelligence?.score || 0}/100 — ${finAnalytics?.ai_insights?.risk_intelligence?.score >= 70 ? '✅ Safe' : '⚠️ Elevated'} · A/R: ${finAnalytics?.metrics?.days_in_ar ?? '—'} วัน`}
                    analysis={finAnalytics?.ai_insights?.risk_intelligence?.analysis || 'ประเมินความเสี่ยงทางการเงิน'}
                    recommendation={finAnalytics?.ai_insights?.risk_intelligence?.recommendation || ''}
                    confidence={94}
                    gradient="#f43f5e"
                    gradientFrom="rgba(244,63,94,.08)"
                    gradientTo="rgba(239,68,68,.04)"
                    borderColor="rgba(244,63,94,.25)"
                    actionButtons={[
                        { label: 'Review Risk Factors', onClick: () => {} }
                    ]}
                />
            </div>
            {/* ━━━ Key Financial Metrics Strip ━━━ */}
            <MetricsStrip
                metrics={[
                    {
                        label: 'Collection Rate',
                        value: finAnalytics?.metrics?.collection_rate ?? '—',
                        unit: '%',
                        target: 95,
                        status: finAnalytics?.metrics?.collection_rate != null
                            ? (finAnalytics.metrics.collection_rate >= 90 ? 'success' : finAnalytics.metrics.collection_rate >= 70 ? 'warning' : 'critical')
                            : 'normal',
                        icon: '🎯'
                    },
                    {
                        label: 'Days in A/R',
                        value: finAnalytics?.metrics?.days_in_ar ?? '—',
                        unit: 'วัน',
                        target: 45,
                        status: finAnalytics?.metrics?.days_in_ar != null
                            ? (finAnalytics.metrics.days_in_ar <= 45 ? 'success' : finAnalytics.metrics.days_in_ar <= 60 ? 'warning' : 'critical')
                            : 'normal',
                        icon: '⏳'
                    },
                    {
                        label: 'RCM Score',
                        value: finAnalytics?.ai_insights?.revenue_health?.score ?? '—',
                        unit: '/100',
                        target: 80,
                        status: (finAnalytics?.ai_insights?.revenue_health?.score ?? 0) >= 80 ? 'success' : 'warning',
                        icon: '🏦'
                    },
                    {
                        label: 'Revenue Growth YoY',
                        value: finAnalytics?.metrics?.yoy_growth_pct ?? '—',
                        unit: '%',
                        target: 5,
                        trend: finAnalytics?.metrics?.yoy_growth_pct,
                        status: (finAnalytics?.metrics?.yoy_growth_pct ?? 0) >= 5 ? 'success'
                            : (finAnalytics?.metrics?.yoy_growth_pct ?? 0) >= 0 ? 'normal' : 'critical',
                        icon: '📈'
                    },
                    {
                        label: 'Profit Margin',
                        value: finAnalytics?.metrics?.profit_margin ?? '—',
                        unit: '%',
                        target: 15,
                        status: (finAnalytics?.metrics?.profit_margin ?? 0) >= 15 ? 'success'
                            : (finAnalytics?.metrics?.profit_margin ?? 0) >= 5 ? 'warning' : 'critical',
                        icon: '💰'
                    },
                    {
                        label: 'Denial Rate',
                        value: finAnalytics?.metrics?.denial_rate ?? '—',
                        unit: '%',
                        target: 5,
                        status: (finAnalytics?.metrics?.denial_rate ?? 0) <= 5 ? 'success'
                            : (finAnalytics?.metrics?.denial_rate ?? 0) <= 10 ? 'warning' : 'critical',
                        icon: '🛑'
                    },
                    {
                        label: 'MoM Growth',
                        value: finAnalytics?.metrics?.growth_pct_prorata ?? finAnalytics?.metrics?.growth_pct ?? '—',
                        unit: '%',
                        trend: finAnalytics?.metrics?.growth_pct_prorata ?? finAnalytics?.metrics?.growth_pct,
                        status: (finAnalytics?.metrics?.growth_pct_prorata ?? finAnalytics?.metrics?.growth_pct ?? 0) >= 0 ? 'success' : 'warning',
                        icon: '📊'
                    },
                    {
                        label: 'YTD Revenue',
                        value: finAnalytics?.metrics?.ytd_revenue ? `${(finAnalytics.metrics.ytd_revenue / 1e6).toFixed(1)}M` : '—',
                        unit: '฿',
                        status: 'success',
                        icon: '💵'
                    }
                ]}
            />

            {/* ━━━ Professional Finance KPI Dashboard ━━━ */}
            {(() => {
                const rev = summary?.total_revenue ?? 0;
                const exp = summary?.total_expense ?? Math.round(rev * 0.82);
                const profit = summary?.net_profit ?? (rev - exp);
                const margin = summary?.profit_margin ?? (rev > 0 ? Math.round((profit / rev) * 100) : 0);
                const rcmScore = finAnalytics?.ai_insights?.revenue_health?.score || 0;
                const collectionRate = finAnalytics?.metrics?.collection_rate || 0;
                const daysAR = finAnalytics?.metrics?.days_in_ar ?? null;
                const growthRate = finAnalytics?.metrics?.yoy_growth_pct ?? null;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
                const yearLabel = `ปีงบ ${new Date().getFullYear() + 543}`;

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'Revenue Growth', thLabel: 'อัตราการเติบโตรายได้',
                            value: growthRate != null ? `${growthRate}%` : '—', color: growthRate >= 5 ? '#059669' : growthRate >= 0 ? '#f59e0b' : '#e11d48', icon: '📈',
                            desc: `รายได้รวม ${(rev / 1e6).toFixed(1)} ล้านบาท (${yearLabel})`,
                            meaning: 'เปรียบเทียบรายได้รวมกับช่วงเดียวกันของปีก่อน เพื่อประเมินแนวโน้มการเติบโตขององค์กร',
                            calc: '((Revenue ปีนี้ − Revenue ปีก่อน) ÷ Revenue ปีก่อน) × 100',
                            dataSource: 'income (HOSxP XE) + GL Ledger',
                            period: `📅 ${yearLabel} ถึง ${todayShort}`,
                            target: '≥ 5% YoY',
                            benchmark: 'สธ.: ≥3% | รพ.ชุมชน: ≥5%',
                            aiTip: growthRate >= 5 ? 'เติบโตดี — รักษา Service Mix ที่ทำกำไร' : 'ต่ำกว่าเป้า — วิเคราะห์ Revenue Source ที่ลดลง',
                            drillDownId: 'finance_revenue',
                            drillDownEndpoint: '/api/finance/drilldown?type=revenue'
                        },
                        {
                            label: 'Profit Margin', thLabel: 'อัตรากำไรสุทธิ (ประมาณการ)',
                            value: `${margin}%`, color: margin >= 20 ? '#059669' : margin >= 0 ? '#f59e0b' : '#e11d48', icon: '💰',
                            desc: `กำไรประมาณ ${(profit / 1e6).toFixed(1)} ล้าน · รายจ่ายประมาณ ${(exp / 1e6).toFixed(1)} ล้าน · รายได้ ${(rev / 1e6).toFixed(1)} ล้านบาท`,
                            meaning: 'วัดสัดส่วนกำไรสุทธิเทียบกับรายได้รวม (ค่าใช้จ่ายประมาณการจากอัตราส่วน สธ. 82% เนื่องจาก HOSxP XE ไม่มีข้อมูลฝั่ง GL)',
                            calc: 'Revenue × (1 − 0.82 Expense Ratio) ÷ Revenue × 100',
                            dataSource: 'income (HOSxP XE) · expense est. (สธ. benchmark 82%)',
                            period: `📅 ${yearLabel}`,
                            target: '≥ 15%',
                            benchmark: 'รพ.รัฐ: ≥5% | Benchmark สธ.: Expense Ratio 80-85%',
                            aiTip: margin >= 15 ? 'Margin ดี — อัตราส่วนรายจ่ายอยู่ในเกณฑ์' : margin >= 5 ? 'Margin พอใช้ — ติดตามค่าใช้จ่ายจากระบบ GL' : 'Margin ต่ำ — ตรวจสอบโครงสร้างรายจ่ายจริงจากระบบบัญชี',
                            drillDownId: 'finance_revenue',
                            drillDownEndpoint: '/api/finance/drilldown?type=revenue'
                        },
                        {
                            label: 'RCM Score', thLabel: 'คะแนนจัดการวงจรรายได้',
                            value: `${rcmScore}`, color: rcmScore >= 80 ? '#059669' : rcmScore >= 60 ? '#f59e0b' : '#e11d48', icon: '🏦',
                            sub: rcmScore >= 80 ? 'Optimal' : rcmScore >= 60 ? 'Fair' : 'At Risk',
                            desc: `Revenue Cycle Management composite score`,
                            meaning: 'คะแนนรวมประสิทธิภาพ Revenue Cycle ตั้งแต่ลงทะเบียน → Coding → Billing → Collection',
                            calc: 'Charge Capture + Coding Accuracy + Clean Claim Rate + Collection %',
                            dataSource: 'income + ovst + iptdiag (HOSxP XE)',
                            period: `📅 ประมวลผล ${todayShort}`,
                            target: '≥ 80',
                            benchmark: 'HFMA: ≥85 | BCH Internal: ≥80',
                            aiTip: rcmScore >= 80 ? 'RCM ดีเยี่ยม — เน้น Denial Prevention' : 'ต่ำกว่าเกณฑ์ — ตรวจ Clean Claim Rate',
                        },
                        {
                            label: 'Days in A/R', thLabel: 'ระยะเวลาลูกหนี้คงค้าง',
                            value: daysAR != null ? `${daysAR} วัน` : '—', color: daysAR != null ? (daysAR <= 45 ? '#059669' : daysAR <= 60 ? '#f59e0b' : '#e11d48') : '#64748b', icon: '⏳',
                            desc: daysAR != null ? `${daysAR <= 45 ? '✅ อยู่ในเกณฑ์' : '❌ เกินเกณฑ์'} (เป้า ≤ 45 วัน)` : 'ไม่มีข้อมูล A/R จาก HOSxP XE',
                            meaning: 'จำนวนวันเฉลี่ยตั้งแต่ให้บริการจนถึงวันที่ได้รับชำระเงิน ยิ่งน้อยยิ่งดี',
                            calc: '(A/R Balance ÷ Average Daily Revenue)',
                            dataSource: 'income + ar_transaction (HOSxP XE)',
                            period: `📅 ${yearLabel}`,
                            target: '≤ 45 วัน',
                            benchmark: 'HFMA: ≤40d | รพ.รัฐ: ≤60d',
                            aiTip: daysAR != null ? (daysAR <= 45 ? 'Cash Flow ดี ลูกหนี้หมุนเร็ว' : 'ลูกหนี้ค้างนาน — เร่ง Follow-up สิทธิราชการ') : 'ยังไม่มีข้อมูล — ตรวจสอบการเชื่อมต่อ HOSxP XE',
                        },
                        {
                            label: 'Collection Rate', thLabel: 'อัตราจัดเก็บรายได้',
                            value: collectionRate != null ? `${collectionRate}%` : '—', color: collectionRate != null ? (collectionRate >= 90 ? '#059669' : collectionRate >= 75 ? '#f59e0b' : '#e11d48') : '#64748b', icon: '🎯',
                            desc: collectionRate != null ? 'จัดเก็บได้จริง vs รายได้ค้างรับ' : 'ไม่มีข้อมูล — ใช้ระบบบัญชีแยก',
                            meaning: 'สัดส่วนรายได้ที่จัดเก็บได้จริงเทียบกับรายได้ที่ค้างรับทั้งหมด (Net Collection Rate)',
                            calc: '(Payment Received ÷ (Charges − Adjustments)) × 100',
                            dataSource: 'income + payment (HOSxP XE)',
                            period: `📅 ${yearLabel}`,
                            target: '≥ 95%',
                            benchmark: 'MGMA: ≥95% | รพ.รัฐ: ≥85%',
                            aiTip: collectionRate != null ? (collectionRate >= 95 ? 'จัดเก็บดีเยี่ยม' : 'ต่ำกว่าเป้า — วิเคราะห์สิทธิที่จัดเก็บช้า') : 'ยังไม่มีข้อมูล — ตรวจสอบการเชื่อมต่อ HOSxP XE',
                        },
                    ]} />
                );
            })()}

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>

                {/* ── Revenue YTD (Hero Card) ── */}
                <div style={{
                    padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,.12) 0%, rgba(109,40,217,.06) 100%)',
                    border: '1px solid rgba(124,58,237,.2)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.financeSummary ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '160px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (() => {
                        const rev = summary?.total_revenue ?? 0;
                        const exp = summary?.total_expense ?? Math.round(rev * 0.82);
                        const profit = summary?.net_profit ?? (rev - exp);
                        const margin = summary?.profit_margin ?? (rev > 0 ? Math.round((profit / rev) * 100) : 0);
                        const isEstimated = !!summary?.expense_ratio_used;
                        const yoy = finAnalytics?.metrics?.yoy_growth_pct;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c3aed', margin: 0 }}>
                                        💰 รายได้รวม YTD
                                    </p>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {yoy != null && (
                                            <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '99px', background: yoy >= 0 ? 'rgba(16,185,129,.1)' : 'rgba(244,63,94,.1)', color: yoy >= 0 ? '#10b981' : '#f43f5e' }}>
                                                YoY {yoy >= 0 ? '+' : ''}{yoy}%
                                            </span>
                                        )}
                                        <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                            HOSxP XE
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '36px', fontWeight: 900, color: '#7c3aed', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(124,58,237,.3)' }}>
                                        {(rev / 1e6).toFixed(1)}
                                    </span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#7c3aed' }}>ล้านบาท</span>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                        background: margin >= 15 ? 'rgba(16,185,129,.1)' : margin >= 5 ? 'rgba(245,158,11,.1)' : 'rgba(244,63,94,.1)',
                                        color: margin >= 15 ? '#10b981' : margin >= 5 ? '#f59e0b' : '#f43f5e',
                                    }}>
                                        Margin {margin}%
                                    </span>
                                </div>

                                {/* Revenue vs Expense bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed' }}>💰 Revenue {(rev / 1e6).toFixed(1)} ล้าน</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#f43f5e' }}>📊 Expense {(exp / 1e6).toFixed(1)} ล้าน{isEstimated ? ' (est.)' : ''}</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(244,63,94,.12)', display: 'flex' }}>
                                        <div style={{ width: rev > 0 ? `${Math.max(margin, 0)}%` : '0%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                        <div style={{ flex: 1, background: 'rgba(244,63,94,.2)', borderRadius: '0 99px 99px 0' }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>📈 กำไร {(profit / 1e6).toFixed(1)} ล้าน ({margin}%)</span>
                                        {isEstimated && <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)' }}>*ค่าใช้จ่ายประมาณการ สธ. 82%</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ── Expense Mini Card ── */}
                <div style={{
                    padding: '1rem 1.25rem', borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(244,63,94,.10) 0%, rgba(220,38,38,.05) 100%)',
                    border: '1px solid rgba(244,63,94,.25)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    transform: hoverCard === 'expense' ? 'translateY(-2px)' : 'none',
                    boxShadow: hoverCard === 'expense' ? '0 8px 25px rgba(244,63,94,.2)' : 'none',
                }}
                    onMouseEnter={() => setHoverCard('expense')}
                    onMouseLeave={() => setHoverCard(null)}
                >
                    {loading.financeSummary ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div className="skeleton" style={{ height: '10px', width: '60px' }} />
                            <div className="skeleton" style={{ height: '28px', width: '80px' }} />
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>ค่าใช้จ่ายรวม (est.)</span>
                                <span style={{ fontSize: '18px' }}>📊</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '28px', fontWeight: 900, color: '#f43f5e', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                    {((summary?.total_expense ?? Math.round((summary?.total_revenue ?? 0) * 0.82)) / 1e6).toFixed(1)}
                                </span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#f43f5e' }}>ล้านบาท</span>
                            </div>
                            <p style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', margin: '4px 0 0', fontWeight: 600 }}>
                                *ประมาณการจาก Expense Ratio 82% (สธ.)
                            </p>
                        </>
                    )}
                </div>

                {/* ── Net Profit Mini Card ── */}
                <div style={{
                    padding: '1rem 1.25rem', borderRadius: '14px',
                    background: `linear-gradient(135deg, ${(summary?.net_profit ?? 0) >= 0 ? 'rgba(16,185,129,.10) 0%, rgba(5,150,105,.05)' : 'rgba(244,63,94,.10) 0%, rgba(220,38,38,.05)'} 100%)`,
                    border: `1px solid ${(summary?.net_profit ?? 0) >= 0 ? 'rgba(16,185,129,.25)' : 'rgba(244,63,94,.25)'}`,
                    position: 'relative', overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    transform: hoverCard === 'profit' ? 'translateY(-2px)' : 'none',
                    boxShadow: hoverCard === 'profit' ? `0 8px 25px ${(summary?.net_profit ?? 0) >= 0 ? 'rgba(16,185,129,.2)' : 'rgba(244,63,94,.2)'}` : 'none',
                }}
                    onMouseEnter={() => setHoverCard('profit')}
                    onMouseLeave={() => setHoverCard(null)}
                >
                    {loading.financeSummary ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div className="skeleton" style={{ height: '10px', width: '60px' }} />
                            <div className="skeleton" style={{ height: '28px', width: '80px' }} />
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>กำไรสุทธิ (est.)</span>
                                <span style={{ fontSize: '18px' }}>📈</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '28px', fontWeight: 900, color: (summary?.net_profit ?? 0) >= 0 ? '#10b981' : '#f43f5e', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                    {((summary?.net_profit ?? Math.round((summary?.total_revenue ?? 0) * 0.18)) / 1e6).toFixed(1)}
                                </span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: (summary?.net_profit ?? 0) >= 0 ? '#10b981' : '#f43f5e' }}>ล้านบาท</span>
                                <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 6px', borderRadius: '99px', background: 'rgba(16,185,129,.1)', color: '#10b981' }}>
                                    {summary?.profit_margin ?? 18}%
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Claim Denial Analytics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', marginTop: '16px' }}>
                <div style={{ width: '4px', height: '22px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    Claim Denial Analytics
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginLeft: 'auto' }}>
                    {denialAnalytics ? 'Live Data' : 'Loading...'}
                </span>
            </div>

            {(() => {
                const da = denialAnalytics;
                const hasDenials = (da?.total_denied || 0) > 0;
                const payerData = hasDenials ? (da?.by_payer || []) : (da?.revenue_by_payer || []);
                const totalVisits = da?.total_visits_30d || 0;

                return (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                        {/* Card 1: Denial Rate / Collection Status */}
                        <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', borderTop: `3px solid ${hasDenials ? '#f43f5e' : '#10b981'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                        {hasDenials ? 'Claim Denial Rate' : 'Collection Status'}
                                    </span>
                                    <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '13px', fontWeight: 700 }}>
                                        {hasDenials ? 'อัตราค้างชำระ' : 'สถานะการจัดเก็บ'}
                                    </h4>
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: hasDenials ? '#f43f5e' : '#10b981', background: hasDenials ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: '6px' }}>
                                    {da?.status === 'excellent' ? '✅ ดีเยี่ยม' : da?.status === 'critical' ? '❌ วิกฤต' : hasDenials ? '⚠️ มีค้าง' : '✅ ปกติ'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '28px', fontWeight: 900, color: hasDenials ? '#f43f5e' : '#10b981', letterSpacing: '-0.02em' }}>
                                    {da?.denial_rate != null ? `${Number(da.denial_rate).toFixed(1)}%` : '0%'}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                    ({totalVisits.toLocaleString()} visits · 30 วัน)
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>
                                {da?.analysis || `ค้างชำระ ${da?.total_denied || 0} เคส`}
                            </div>
                        </div>

                        {/* Card 2: Amount at Risk / Revenue Summary */}
                        <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', borderTop: `3px solid ${hasDenials ? '#f59e0b' : '#0f766e'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                        {hasDenials ? 'Amount at Risk' : 'Revenue 30 Days'}
                                    </span>
                                    <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '13px', fontWeight: 700 }}>
                                        {hasDenials ? 'มูลค่าเสี่ยง' : 'รายได้ 30 วัน'}
                                    </h4>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 900, color: hasDenials ? '#f59e0b' : '#0f766e', letterSpacing: '-0.02em' }}>
                                    {hasDenials
                                        ? `${(Number(da?.amount_at_risk || 0) / 1e6).toFixed(2)} ล้าน`
                                        : `${(payerData.reduce((s, p) => s + (p.revenue || 0), 0) / 1e6).toFixed(1)} ล้าน`}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>บาท</span>
                            </div>
                            {hasDenials && da?.top_reasons?.length > 0 && (
                                <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                                    สาเหตุ: {da.top_reasons.map(r => `${r.reason} (${r.count})`).join(', ')}
                                </div>
                            )}
                            {!hasDenials && (
                                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                                    ✅ ไม่มียอดค้างชำระ — Collection Rate 100%
                                </div>
                            )}
                        </div>

                        {/* Card 3: By Payer (Denial or Revenue) */}
                        <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', borderTop: '3px solid #8b5cf6' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    {hasDenials ? 'Denial by Payer' : 'Revenue by Payer'}
                                </span>
                                <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '13px', fontWeight: 700 }}>
                                    {hasDenials ? 'ค้างชำระตามสิทธิ์' : 'รายได้ตามสิทธิ์'}
                                </h4>
                            </div>
                            {payerData.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    {payerData.slice(0, 6).map((p, i) => {
                                        const maxRev = payerData[0]?.revenue || payerData[0]?.amount || 1;
                                        const thisVal = p.revenue || p.amount || 0;
                                        const pct = maxRev > 0 ? Math.round((thisVal / maxRev) * 100) : 0;
                                        return (
                                            <div key={i}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                                                    <span style={{ color: 'var(--md-text-secondary)', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.payer}</span>
                                                    <span style={{ fontWeight: 700, color: '#8b5cf6' }}>
                                                        {hasDenials ? `${p.count} เคส` : `฿${(thisVal / 1e6).toFixed(1)}M`}
                                                        {!hasDenials && p.visits ? ` · ${p.visits.toLocaleString()} visits` : ''}
                                                    </span>
                                                </div>
                                                <div style={{ height: '3px', borderRadius: '99px', background: 'var(--md-border)', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)', borderRadius: '99px', transition: 'width 0.5s' }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <span style={{ fontSize: '12px', color: 'var(--md-text-tertiary)' }}>
                                    {loading.denialAnalytics ? '⏳ กำลังโหลด...' : 'ไม่มีข้อมูล'}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })()}

            {/* PPFS — เปรียบเทียบผลงานส่งเสริมป้องกัน */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', marginTop: '4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #7c3aed)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    PPFS — ผลงานส่งเสริมป้องกัน
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginLeft: '8px' }}>
                        {ppfsComparison?.note || 'เปรียบเทียบ ปีงบ 68 vs 69'}
                    </span>
                </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '1.75rem' }}>
                {/* Period 1 */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', borderTop: '3px solid #0ea5e9' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {ppfsComparison?.period_1_label || 'ปีงบ 2568'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#0ea5e9' }}>
                            {ppfsComparison?.total_cases_p1?.toLocaleString() || '—'}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>ราย</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                        มูลค่า {ppfsComparison?.total_rev_p1 ? `${Number(ppfsComparison.total_rev_p1).toLocaleString()} บาท` : '—'}
                    </div>
                </div>

                {/* Period 2 */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', borderTop: '3px solid #10b981' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {ppfsComparison?.period_2_label || 'ปีงบ 2569'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
                            {ppfsComparison?.total_cases_p2?.toLocaleString() || '—'}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>ราย</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                        มูลค่า {ppfsComparison?.total_rev_p2 ? `${Number(ppfsComparison.total_rev_p2).toLocaleString()} บาท` : '—'}
                    </div>
                </div>

                {/* Growth */}
                {(() => {
                    const g = ppfsComparison?.growth_pct ?? 0;
                    const color = g >= 10 ? '#10b981' : g >= 0 ? '#0ea5e9' : '#f43f5e';
                    return (
                        <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', borderTop: `3px solid ${color}` }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>อัตราเติบโต YoY</span>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
                                <span style={{ fontSize: '28px', fontWeight: 900, color }}>
                                    {g >= 0 ? '+' : ''}{g}%
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                                {g >= 10 ? '📈 ผลงานเพิ่มขึ้นมาก — กิจกรรมส่งเสริมสุขภาพเข้มแข็ง' : g >= 0 ? '📊 ผลงานเพิ่มขึ้น — รักษาแนวโน้ม' : '📉 ผลงานลดลง — ตรวจสอบกิจกรรมที่ลดลง'}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                                {ppfsComparison?.activity_count || 0} กิจกรรมที่มีข้อมูล
                            </div>
                        </div>
                    );
                })()}
            </div>

                        {/* End of Finance Analytics */}

            {/* ══════════════════════════════════════════════════════
                📈 REVENUE FORECAST 3 เดือน — Holt-Winters + Claude AI
            ══════════════════════════════════════════════════════ */}
            <RevenueForecastSection data={revenueForecast} loading={loading.revenueForecast} />

            {/* ══════════════════════════════════════════════════════
                🔍 DRG REVENUE LEAKAGE DETECTION
            ══════════════════════════════════════════════════════ */}
            <DRGLeakageSection data={drgLeakage} loading={loading.drgLeakage} />

        </div >
    );
}

// ─── Forecast Tooltip ────────────────────────────────────────────────────────
function ForecastTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--md-surface-1)', border: '1px solid var(--md-border)', borderRadius: '10px', padding: '10px 14px', fontSize: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--md-text-primary)' }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, marginBottom: '2px' }}>
                    {p.name}: ฿{(Number(p.value) / 1e6).toFixed(2)}M
                </div>
            ))}
        </div>
    );
}

// ─── Narrative Card ───────────────────────────────────────────────────────────
function NarrativeCard({ icon, title, text, list, color = '#7c3aed' }) {
    return (
        <div style={{ background: 'var(--md-surface-2)', border: `1px solid var(--md-border)`, borderLeft: `3px solid ${color}`, borderRadius: '10px', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>{icon}</span>
                <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
            </div>
            {text && <p style={{ fontSize: '13px', color: 'var(--md-text-primary)', lineHeight: 1.6, margin: 0 }}>{text}</p>}
            {list && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                    {list.map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: 'var(--md-text-primary)', lineHeight: 1.7 }}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ─── Revenue Forecast Section ─────────────────────────────────────────────────
function RevenueForecastSection({ data, loading }) {
    if (loading) {
        return (
            <div style={{ marginTop: '32px', padding: '24px', background: 'var(--md-surface-1)', borderRadius: '16px', border: '1px solid var(--md-border)' }}>
                <div style={{ height: '24px', width: '260px', background: 'var(--md-surface-2)', borderRadius: '8px', marginBottom: '16px' }} />
                <div style={{ height: '240px', background: 'var(--md-surface-2)', borderRadius: '12px' }} />
            </div>
        );
    }
    if (!data) return null;

    const { forecast = [], summary = {}, seasonal_index = {}, narrative } = data;

    // Build chart data: last 3 actual months (from summary) + 3 forecast months
    const chartData = forecast.map((f, i) => ({
        name: `${f.month_name} ${f.year}`,
        forecast: f.forecast,
        lower: Math.max(f.lower, 0),
        upper: f.upper,
        ci_band: [Math.max(f.lower, 0), f.upper],
    }));

    const yoy = summary.yoy_growth ?? 0;
    const isUp = summary.trend_direction === 'increasing';
    const total3m = summary.total_forecast ?? 0;
    const avgM = summary.avg_monthly_forecast ?? 0;
    const source = narrative?._source === 'claude' ? '🤖 Claude AI' : '📐 Rule-based';

    return (
        <div style={{ marginTop: '32px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '4px', height: '32px', background: 'linear-gradient(180deg,#7c3aed,#a855f7)', borderRadius: '2px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                        📈 Revenue Forecast — 3 เดือนข้างหน้า
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>Holt-Winters + Multiplicative Seasonality · {source}</span>
                </div>
                <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: isUp ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)', color: isUp ? '#10b981' : '#f43f5e' }}>
                    {isUp ? '▲' : '▼'} YoY {Math.abs(yoy).toFixed(1)}%
                </span>
            </div>

            {/* Summary KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'รวม 3 เดือน', value: `฿${(total3m / 1e6).toFixed(2)}M`, color: '#7c3aed' },
                    { label: 'เฉลี่ย/เดือน', value: `฿${(avgM / 1e6).toFixed(2)}M`, color: '#8b5cf6' },
                    ...forecast.map(f => ({ label: `${f.month_name} ${f.year}`, value: `฿${(f.forecast / 1e6).toFixed(2)}M`, color: '#6d28d9' })),
                ].map((kpi, i) => (
                    <div key={i} style={{ padding: '14px', background: 'var(--md-surface-2)', border: `1px solid var(--md-border)`, borderTop: `3px solid ${kpi.color}`, borderRadius: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{kpi.label}</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '20px', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height={220}>
                    <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                        <XAxis dataKey="name" tick={{ fill: 'var(--md-text-tertiary)', fontSize: 11 }} />
                        <YAxis tickFormatter={v => `฿${(v / 1e6).toFixed(1)}M`} tick={{ fill: 'var(--md-text-tertiary)', fontSize: 11 }} />
                        <Tooltip content={<ForecastTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Area type="monotone" dataKey="upper" name="Upper CI" fill="#7c3aed" fillOpacity={0.08} stroke="none" />
                        <Area type="monotone" dataKey="lower" name="Lower CI" fill="var(--md-surface-1)" fillOpacity={1} stroke="none" />
                        <Line type="monotone" dataKey="forecast" name="พยากรณ์" stroke="#7c3aed" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: '#7c3aed', r: 5 }} />
                    </ComposedChart>
                </ResponsiveContainer>
                {/* Month CI cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
                    {forecast.map((f, i) => (
                        <div key={i} style={{ background: 'var(--md-surface-1)', borderRadius: '10px', padding: '12px', textAlign: 'center', border: '1px solid var(--md-border)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', marginBottom: '4px' }}>{f.month_name} {f.year}</div>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#7c3aed', marginBottom: '4px' }}>฿{(f.forecast / 1e6).toFixed(2)}M</div>
                            <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>
                                CI: ฿{(Math.max(f.lower, 0) / 1e6).toFixed(2)}M – ฿{(f.upper / 1e6).toFixed(2)}M
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Claude Narrative */}
            {narrative && (
                <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '14px' }}>🧠</span>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--md-text-primary)' }}>AI Analysis</span>
                        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--md-text-tertiary)', background: 'var(--md-surface-1)', padding: '2px 8px', borderRadius: '99px', border: '1px solid var(--md-border)' }}>{source}</span>
                    </div>
                    {narrative.headline && (
                        <div style={{ padding: '12px 16px', background: 'rgba(124,58,237,0.08)', borderRadius: '10px', borderLeft: '3px solid #7c3aed', marginBottom: '14px', fontSize: '14px', fontWeight: 600, color: 'var(--md-text-primary)' }}>
                            {narrative.headline}
                        </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        {narrative.trend_analysis && <NarrativeCard icon="📊" title="Trend Analysis" text={narrative.trend_analysis} color="#7c3aed" />}
                        {narrative.seasonal_insight && <NarrativeCard icon="🗓️" title="Seasonal Pattern" text={narrative.seasonal_insight} color="#8b5cf6" />}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {narrative.risks?.length > 0 && <NarrativeCard icon="⚠️" title="ความเสี่ยง" list={narrative.risks} color="#f59e0b" />}
                        {narrative.recommendations?.length > 0 && <NarrativeCard icon="💡" title="คำแนะนำ" list={narrative.recommendations} color="#10b981" />}
                    </div>
                    {narrative.model_note && (
                        <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic' }}>
                            📐 {narrative.model_note}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── DRG Leakage Section ──────────────────────────────────────────────────────
function DRGLeakageSection({ data, loading }) {
    const [activeTab, setActiveTab] = React.useState('no_cc');

    if (loading) {
        return (
            <div style={{ marginTop: '32px', padding: '24px', background: 'var(--md-surface-1)', borderRadius: '16px', border: '1px solid var(--md-border)' }}>
                <div style={{ height: '24px', width: '280px', background: 'var(--md-surface-2)', borderRadius: '8px', marginBottom: '16px' }} />
                <div style={{ height: '200px', background: 'var(--md-surface-2)', borderRadius: '12px' }} />
            </div>
        );
    }
    if (!data) return null;

    const {
        total_estimated_loss = 0,
        no_cc_mcc_count = 0,
        low_rw_count = 0,
        total_cases = 0,
        by_ward = [],
        no_cc_cases = [],
        low_rw_cases = [],
        narrative,
    } = data;

    const leakagePct = total_cases > 0 ? (((no_cc_mcc_count + low_rw_count) / total_cases) * 100).toFixed(1) : 0;
    const source = narrative?._source === 'claude' ? '🤖 Claude AI' : '📐 Rule-based';
    const tabCases = activeTab === 'no_cc' ? no_cc_cases : low_rw_cases;

    return (
        <div style={{ marginTop: '32px', marginBottom: '32px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '4px', height: '32px', background: 'linear-gradient(180deg,#f43f5e,#f97316)', borderRadius: '2px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                        🔍 DRG Revenue Leakage Detection
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>30 วันล่าสุด · CC/MCC Absence + Low RW vs LOS · {source}</span>
                </div>
                <span style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 800, background: 'rgba(244,63,94,0.12)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.3)' }}>
                    ฿{total_estimated_loss.toLocaleString()} estimated loss
                </span>
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'Total Cases', value: total_cases.toLocaleString(), color: '#64748b' },
                    { label: 'No CC/MCC', value: no_cc_mcc_count.toLocaleString(), color: '#f59e0b', sub: 'เคส Undercoding' },
                    { label: 'Low RW vs LOS', value: low_rw_count.toLocaleString(), color: '#ef4444', sub: 'RW ต่ำ / LOS สูง' },
                    { label: 'Leakage Rate', value: `${leakagePct}%`, color: Number(leakagePct) > 20 ? '#f43f5e' : '#f59e0b' },
                    { label: 'Est. Loss (NoCC)', value: `฿${(no_cc_mcc_count * 0.35 * 8000).toLocaleString()}`, color: '#f97316' },
                    { label: 'Est. Loss (LowRW)', value: `฿${(low_rw_count * 0.40 * 8000).toLocaleString()}`, color: '#f43f5e' },
                ].map((kpi, i) => (
                    <div key={i} style={{ padding: '14px', background: 'var(--md-surface-2)', border: `1px solid var(--md-border)`, borderTop: `3px solid ${kpi.color}`, borderRadius: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{kpi.label}</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
                        {kpi.sub && <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>{kpi.sub}</div>}
                    </div>
                ))}
            </div>

            {/* Ward breakdown */}
            {by_ward.length > 0 && (
                <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--md-text-secondary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        🏥 Ward Breakdown — DRG Leakage Priority
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {by_ward.slice(0, 5).map((w, i) => {
                            const maxLoss = by_ward[0]?.estimated_baht_loss || 1;
                            const pct = Math.round((w.estimated_baht_loss / maxLoss) * 100);
                            return (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px 90px', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.ward}</div>
                                    <div style={{ height: '8px', background: 'var(--md-border)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${pct}%`, background: i === 0 ? '#f43f5e' : i === 1 ? '#f97316' : '#f59e0b', borderRadius: '99px', transition: 'width 0.5s ease' }} />
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', textAlign: 'right' }}>{w.case_count} เคส</div>
                                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#f43f5e', textAlign: 'right' }}>฿{(w.estimated_baht_loss || 0).toLocaleString()}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Case table with tab switcher */}
            <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '8px' }}>Top Cases</span>
                    {[
                        { key: 'no_cc', label: '⚠️ No CC/MCC' },
                        { key: 'low_rw', label: '📉 Low RW' },
                    ].map(t => (
                        <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: '5px 14px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', background: activeTab === t.key ? '#7c3aed' : 'var(--md-surface-1)', color: activeTab === t.key ? '#fff' : 'var(--md-text-secondary)', transition: 'all 0.2s' }}>
                            {t.label}
                        </button>
                    ))}
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--md-border)' }}>
                                {['AN', 'Ward', 'LOS', 'Diag', 'adjRW', 'Issue'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '8px 10px', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '10px', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tabCases.slice(0, 8).map((c, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--md-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                                    <td style={{ padding: '8px 10px', color: 'var(--md-text-tertiary)', fontFamily: 'monospace', fontSize: '11px' }}>{c.an}</td>
                                    <td style={{ padding: '8px 10px', fontSize: '11px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.ward}</td>
                                    <td style={{ padding: '8px 10px', fontWeight: 700, color: c.los >= 5 ? '#f43f5e' : 'var(--md-text-primary)' }}>{c.los}d</td>
                                    <td style={{ padding: '8px 10px', color: 'var(--md-text-tertiary)', fontSize: '11px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.pdx_name || c.pdx}>{c.pdx_name || c.pdx || c.drg || '—'}</td>
                                    <td style={{ padding: '8px 10px', fontWeight: 700, color: Number(c.rw) < 0.5 ? '#f43f5e' : '#f59e0b' }}>{Number(c.rw).toFixed(4)}</td>
                                    <td style={{ padding: '8px 10px' }}>
                                        <span style={{ background: c.issue === 'no_cc_mcc' ? 'rgba(245,158,11,0.1)' : 'rgba(244,63,94,0.1)', color: c.issue === 'no_cc_mcc' ? '#f59e0b' : '#f43f5e', borderRadius: '99px', padding: '2px 8px', fontSize: '10px', fontWeight: 700 }}>
                                            {c.issue === 'no_cc_mcc' ? 'No CC/MCC' : `LowRW (${c.los_per_rw || '—'})`}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {tabCases.length === 0 && (
                                <tr><td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>ไม่พบเคส</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Claude Narrative */}
            {narrative && (
                <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '14px' }}>🧠</span>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--md-text-primary)' }}>AI Analysis — DRG Revenue Leakage</span>
                        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--md-text-tertiary)', background: 'var(--md-surface-1)', padding: '2px 8px', borderRadius: '99px', border: '1px solid var(--md-border)' }}>{source}</span>
                    </div>
                    {narrative.headline && (
                        <div style={{ padding: '12px 16px', background: 'rgba(244,63,94,0.08)', borderRadius: '10px', borderLeft: '3px solid #f43f5e', marginBottom: '14px', fontSize: '14px', fontWeight: 600, color: 'var(--md-text-primary)' }}>
                            {narrative.headline}
                        </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        {narrative.top_issues?.length > 0 && <NarrativeCard icon="🚨" title="ปัญหาหลัก" list={narrative.top_issues} color="#f43f5e" />}
                        {narrative.impact_analysis && <NarrativeCard icon="💰" title="ผลกระทบทางการเงิน" text={narrative.impact_analysis} color="#f97316" />}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {narrative.action_plan?.length > 0 && <NarrativeCard icon="📋" title="แผนปฏิบัติ" list={narrative.action_plan} color="#7c3aed" />}
                        {narrative.priority_wards && <NarrativeCard icon="🏥" title="Ward Priority" text={`เร่งดำเนินการที่ Ward: ${narrative.priority_wards}`} color="#0ea5e9" />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(FinanceTab);
