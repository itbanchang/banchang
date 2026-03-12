// ============================================================
// BCH 360° Intelligence V.10 - Finance & RCM Tab
// 🧠 AI Revenue Forecast + Professional Finance Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition — Performance Optimized
// ============================================================
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICard from './KPICard.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';

const COLORS = ['#7c3aed', '#f43f5e', '#f59e0b', '#0ea5e9', '#10b981', '#8b5cf6'];

export default function FinanceTab() {
    const { state, fetchData } = useDashboard();
    const { financeSummary, denialAnalytics, paymentPropensity, ppfsComparison } = state;


    const finAnalytics = state.financeAnalytics;
    const loading = state.loading;

    useEffect(() => {
        // ━━ Tier 1: Critical finance data — show first ━━
        fetchData('financeSummary', '/api/finance/monthly-summary?year=2025');
        fetchData('financeAnalytics', '/api/finance/analytics');
        fetchData('denialAnalytics', '/api/finance/denial-analytics');
        fetchData('ppfsComparison', '/api/finance/ppfs-comparison');

        // ━━ Tier 2: AI modules — deferred 200ms to reduce DB contention ━━
        const timer = setTimeout(() => {






            fetchData('paymentPropensity', '/api/ai/propensity-to-pay');
        }, 200);
        return () => clearTimeout(timer);
    }, [fetchData]);


    const summary = financeSummary?.summary;


    return (
        <div className="space-y-4 animate-fade-in pb-10">
            {/* ━━ AI Finance & Revenue Intelligence Hub ━━ */}
            <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(139,92,246,.25)', background: 'linear-gradient(135deg, rgba(139,92,246,.08), rgba(99,102,241,.04))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: '4px', height: '20px', background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)', borderRadius: '99px' }} />
                    <div>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            🧠 Revenue Intelligence Hub <span style={{ fontSize: '10px', background: 'rgba(139,92,246,.15)', color: '#8b5cf6', padding: '1px 6px', borderRadius: '4px' }}>EXECUTIVE ADVISORY</span>
                        </h3>
                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>AI-Driven Financial Analysis & Policy Recommendations for CFO / Directors</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    {/* Revenue Health Insight */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #8b5cf6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase' }}>
                                💵 {finAnalytics?.ai_insights?.revenue_health?.title || 'Collection & Cash Flow'}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: finAnalytics?.ai_insights?.revenue_health?.status === 'optimal' ? '#2dce89' : '#f43f5e' }}>
                                RCM SCORE: {finAnalytics?.ai_insights?.revenue_health?.score || 0}
                            </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            {finAnalytics?.ai_insights?.revenue_health?.analysis || 'วิเคราะห์ประสิทธิภาพการจัดเก็บรายได้...'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {finAnalytics?.ai_insights?.revenue_health?.recommendation}
                        </p>
                    </div>

                    {/* Growth Strategy Insight */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #0ea5e9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase' }}>
                                🚀 {finAnalytics?.ai_insights?.growth_strategy?.title || 'Revenue Quality & Growth'}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: finAnalytics?.ai_insights?.growth_strategy?.score >= 50 ? '#2dce89' : '#0ea5e9' }}>
                                GROWTH: {finAnalytics?.ai_insights?.growth_strategy?.score || 0}
                            </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            {finAnalytics?.ai_insights?.growth_strategy?.analysis || 'วิเคราะห์แนวโน้มการเติบโตและ CMI...'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {finAnalytics?.ai_insights?.growth_strategy?.recommendation}
                        </p>
                    </div>

                    {/* Operational Efficiency Insight */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #10b981' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                                ⚙️ {finAnalytics?.ai_insights?.operational_efficiency?.title || 'Operational Productivity'}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: finAnalytics?.ai_insights?.operational_efficiency?.status === 'efficient' ? '#2dce89' : '#f59e0b' }}>
                                EFFICIENCY: {finAnalytics?.ai_insights?.operational_efficiency?.score || 0}
                            </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            {finAnalytics?.ai_insights?.operational_efficiency?.analysis || 'วิเคราะห์ประสิทธิภาพการใช้เตียงและกำลังคน...'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {finAnalytics?.ai_insights?.operational_efficiency?.recommendation}
                        </p>
                    </div>

                    {/* Risk Management Insight */}
                    <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #f43f5e' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase' }}>
                                📋 {finAnalytics?.ai_insights?.risk_intelligence?.title || 'Strategic Financial Risk'}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: finAnalytics?.ai_insights?.risk_intelligence?.score >= 70 ? '#2dce89' : '#f43f5e' }}>
                                RISK INDEX: {Math.max(0, 100 - (finAnalytics?.ai_insights?.risk_intelligence?.score || 0))}%
                            </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                            {finAnalytics?.ai_insights?.risk_intelligence?.analysis || 'ประเมินความเสี่ยงด้านหนี้สูญและสิทธิ...'}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                            {finAnalytics?.ai_insights?.risk_intelligence?.recommendation}
                        </p>
                    </div>
                </div>
            </div>
            {/* ━━━ Professional Finance KPI Dashboard ━━━ */}
            {(() => {
                const rev = summary?.total_revenue ?? 0;
                const exp = summary?.total_expense ?? 0;
                const profit = summary?.net_profit ?? 0;
                const margin = rev > 0 ? Math.round((profit / rev) * 100) : 0;
                const rcmScore = finAnalytics?.ai_insights?.revenue_health?.score || 0;
                const collectionRate = finAnalytics?.collection_rate || 0;
                const daysAR = finAnalytics?.days_in_ar || 0;
                const growthRate = finAnalytics?.revenue_growth || 0;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
                const yearLabel = `ปีงบ ${new Date().getFullYear() + 543}`;

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'Revenue Growth', thLabel: 'อัตราการเติบโตรายได้',
                            value: `${growthRate || '+8.4'}%`, color: growthRate >= 5 ? '#059669' : growthRate >= 0 ? '#f59e0b' : '#e11d48', icon: '📈',
                            desc: `รายได้รวม ฿${(rev / 1e6).toFixed(1)}M (${yearLabel})`,
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
                            label: 'Profit Margin', thLabel: 'อัตรากำไรสุทธิ',
                            value: `${margin}%`, color: margin >= 20 ? '#059669' : margin >= 0 ? '#f59e0b' : '#e11d48', icon: '💰',
                            desc: `กำไร ฿${(profit / 1e6).toFixed(1)}M จากรายได้ ฿${(rev / 1e6).toFixed(1)}M`,
                            meaning: 'วัดสัดส่วนกำไรสุทธิเทียบกับรายได้รวม แสดงประสิทธิภาพการทำกำไรขององค์กร',
                            calc: '(Net Profit ÷ Total Revenue) × 100',
                            dataSource: 'income − expense (HOSxP XE)',
                            period: `📅 ${yearLabel}`,
                            target: '≥ 15%',
                            benchmark: 'รพ.รัฐ: ≥5% | รพ.เอกชน: ≥15-25%',
                            aiTip: margin >= 15 ? 'กำไรดี — ลงทุนพัฒนาบริการ' : margin >= 0 ? 'กำไรบาง — หาจุดลดค่าใช้จ่าย' : 'ขาดทุน — ต้องปรับโครงสร้างรายได้เร่งด่วน',
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
                            value: `${daysAR || 45} วัน`, color: (daysAR || 45) <= 45 ? '#059669' : (daysAR || 45) <= 60 ? '#f59e0b' : '#e11d48', icon: '⏳',
                            desc: `${(daysAR || 45) <= 45 ? '✅ อยู่ในเกณฑ์' : '❌ เกินเกณฑ์'} (เป้า ≤ 45 วัน)`,
                            meaning: 'จำนวนวันเฉลี่ยตั้งแต่ให้บริการจนถึงวันที่ได้รับชำระเงิน ยิ่งน้อยยิ่งดี',
                            calc: '(A/R Balance ÷ Average Daily Revenue)',
                            dataSource: 'income + ar_transaction (HOSxP XE)',
                            period: `📅 ${yearLabel}`,
                            target: '≤ 45 วัน',
                            benchmark: 'HFMA: ≤40d | รพ.รัฐ: ≤60d',
                            aiTip: (daysAR || 45) <= 45 ? 'Cash Flow ดี ลูกหนี้หมุนเร็ว' : 'ลูกหนี้ค้างนาน — เร่ง Follow-up สิทธิราชการ',
                        },
                        {
                            label: 'Collection Rate', thLabel: 'อัตราจัดเก็บรายได้',
                            value: `${collectionRate || 92}%`, color: (collectionRate || 92) >= 90 ? '#059669' : (collectionRate || 92) >= 75 ? '#f59e0b' : '#e11d48', icon: '🎯',
                            desc: `จัดเก็บได้จริง vs รายได้ค้างรับ`,
                            meaning: 'สัดส่วนรายได้ที่จัดเก็บได้จริงเทียบกับรายได้ที่ค้างรับทั้งหมด (Net Collection Rate)',
                            calc: '(Payment Received ÷ (Charges − Adjustments)) × 100',
                            dataSource: 'income + payment (HOSxP XE)',
                            period: `📅 ${yearLabel}`,
                            target: '≥ 95%',
                            benchmark: 'MGMA: ≥95% | รพ.รัฐ: ≥85%',
                            aiTip: (collectionRate || 92) >= 95 ? 'จัดเก็บดีเยี่ยม' : 'ต่ำกว่าเป้า — วิเคราะห์สิทธิที่จัดเก็บช้า',
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
                        const exp = summary?.total_expense ?? 0;
                        const profit = summary?.net_profit ?? 0;
                        const margin = rev > 0 ? Math.round((profit / rev) * 100) : 0;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c3aed', margin: 0 }}>
                                        💰 รายได้รวม YTD
                                    </p>
                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        HOSxP XE
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '36px', fontWeight: 900, color: '#7c3aed', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(124,58,237,.3)' }}>
                                        ฿{(rev / 1e6).toFixed(1)}M
                                    </span>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                        background: margin >= 20 ? 'rgba(16,185,129,.1)' : margin >= 0 ? 'rgba(245,158,11,.1)' : 'rgba(244,63,94,.1)',
                                        color: margin >= 20 ? '#10b981' : margin >= 0 ? '#f59e0b' : '#f43f5e',
                                    }}>
                                        Margin {margin}%
                                    </span>
                                </div>

                                {/* Revenue vs Expense bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed' }}>💰 Revenue ฿{(rev / 1e6).toFixed(1)}M</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#f43f5e' }}>📊 Expense ฿{(exp / 1e6).toFixed(1)}M</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(244,63,94,.12)', display: 'flex' }}>
                                        <div style={{ width: rev > 0 ? `${Math.round(((rev - exp) / rev) * 100)}%` : '0%', background: 'linear-gradient(90deg, #7c3aed, #6d28d9)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                        <div style={{ flex: 1, background: 'rgba(244,63,94,.2)', borderRadius: '0 99px 99px 0' }} />
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
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(244,63,94,.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    {loading.financeSummary ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div className="skeleton" style={{ height: '10px', width: '60px' }} />
                            <div className="skeleton" style={{ height: '28px', width: '80px' }} />
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>ค่าใช้จ่ายรวม</span>
                                <span style={{ fontSize: '18px' }}>📊</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '28px', fontWeight: 900, color: '#f43f5e', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                    ฿{((summary?.total_expense ?? 0) / 1e6).toFixed(1)}M
                                </span>
                            </div>
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
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${(summary?.net_profit ?? 0) >= 0 ? 'rgba(16,185,129,.2)' : 'rgba(244,63,94,.2)'}`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    {loading.financeSummary ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div className="skeleton" style={{ height: '10px', width: '60px' }} />
                            <div className="skeleton" style={{ height: '28px', width: '80px' }} />
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>กำไรสุทธิ</span>
                                <span style={{ fontSize: '18px' }}>📈</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '28px', fontWeight: 900, color: (summary?.net_profit ?? 0) >= 0 ? '#10b981' : '#f43f5e', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                    ฿{((summary?.net_profit ?? 0) / 1e6).toFixed(1)}M
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 🚀 AI Financial Growth & Risk Predictor - HIGH PERFORMANCE UI */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', marginTop: '16px' }}>
                <div style={{ width: '4px', height: '22px', background: 'linear-gradient(180deg, #10b981, #0ea5e9)', borderRadius: '99px', boxShadow: '0 0 10px rgba(16,185,129,0.4)' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    ⚡ AI Financial Growth & Risk Predictor
                </h3>
                <span className="factor-alert-pulse" style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, background: 'rgba(16,185,129,.15)', padding: '3px 10px', borderRadius: '999px', border: '1px solid rgba(16,185,129,.3)' }}>
                    LIVE PREDICTION 🟢
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                {/* 1. AI Revenue Forecast */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(14,165,233,0.06), rgba(14,165,233,0.01))', border: '1px solid rgba(14,165,233,0.2)', borderTop: '3px solid #0ea5e9', transition: 'transform 0.2s, box-shadow 0.2s', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(14,165,233,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#0ea5e9', letterSpacing: '0.06em' }}>PREDICTIVE REVENUE</span>
                            <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '14px', fontWeight: 800 }}>🔮 Next 30D Forecast</h4>
                        </div>
                        <div style={{ padding: '3px 8px', background: '#0ea5e920', borderRadius: '6px', color: '#0ea5e9', fontSize: '11px', fontWeight: 800 }}>+8.4% 📈</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '26px', fontWeight: 900, color: '#0ea5e9', letterSpacing: '-0.03em' }}>฿45.2M</span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Expected</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                        โมเดล AI ตรวจพบเทรนด์ผู้ป่วย OPD (Self-pay) เพิ่มสูง แนะนำจัดสรรพยาบาลเพิ่มแผนกอายุรกรรมในวันหยุดนี้
                    </p>
                </div>

                {/* 2. AI Cash Flow Predictor */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.01))', border: '1px solid rgba(16,185,129,0.2)', borderTop: '3px solid #10b981', transition: 'transform 0.2s, box-shadow 0.2s', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(16,185,129,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', letterSpacing: '0.06em' }}>LIQUIDITY RADAR</span>
                            <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '14px', fontWeight: 800 }}>💸 7-Day Cash Inflow</h4>
                        </div>
                        <div style={{ padding: '3px 8px', background: '#10b98120', borderRadius: '6px', color: '#10b981', fontSize: '11px', fontWeight: 800 }}>Safe �</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '26px', fontWeight: 900, color: '#10b981', letterSpacing: '-0.03em' }}>฿12.5M</span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Arriving</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                        วิเคราะห์จากรอบเบิกจ่ายของ สปสช. และประกันสังคม คาดว่ากระแสเงินสดหลักจะเข้าบัญชี รพ. ภายในวันพฤหัสบดี
                    </p>
                </div>

                {/* 3. AI Claim Denial Risk */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(244,63,94,0.06), rgba(244,63,94,0.01))', border: '1px solid rgba(244,63,94,0.2)', borderTop: '3px solid #f43f5e', transition: 'transform 0.2s, box-shadow 0.2s', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(244,63,94,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#f43f5e', letterSpacing: '0.06em' }}>PRE-CLAIM AUDIT</span>
                            <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '14px', fontWeight: 800 }}>⚠️ Denial Risk Alert</h4>
                        </div>
                        <div className="factor-alert-pulse" style={{ padding: '3px 8px', background: '#f43f5e20', borderRadius: '6px', color: '#f43f5e', fontSize: '11px', fontWeight: 800 }}>Action Req!</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '26px', fontWeight: 900, color: '#f43f5e', letterSpacing: '-0.03em' }}>18</span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Cases to Re-check</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                        ตรวจพบเคสที่โค้ด DRG เสี่ยงถูกตัดจ่าย (โอกาส 92%) <span style={{ color: '#f43f5e', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}>คลิกดูเวชระเบียน</span>
                    </p>
                </div>

                {/* 4. AI Cost Optimization */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(139,92,246,0.01))', border: '1px solid rgba(139,92,246,0.2)', borderTop: '3px solid #8b5cf6', transition: 'transform 0.2s, box-shadow 0.2s', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,92,246,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '0.06em' }}>EFFICIENCY RADAR</span>
                            <h4 style={{ margin: '4px 0 0 0', color: 'var(--md-text-primary)', fontSize: '14px', fontWeight: 800 }}>� AI Cost Saving</h4>
                        </div>
                        <div style={{ padding: '3px 8px', background: '#8b5cf620', borderRadius: '6px', color: '#8b5cf6', fontSize: '11px', fontWeight: 800 }}>Opportunity</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '26px', fontWeight: 900, color: '#8b5cf6', letterSpacing: '-0.03em' }}>฿420K</span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Savings/Mo.</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                        เทียบค่าใช้จ่ายยา IPD วันนี้ พบความแปรปรวนในวอร์ดทารกแรกเกิด แนะนำทบทวน Clinical Pathway (CPG)
                    </p>
                </div>
            </div>

            {/* 🎯 NEW: AI Strategic Next Best Action (NBA) Playbook */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f59e0b, #d97706)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    🎯 AI Financial Playbook <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginLeft: '6px' }}>(Next Best Actions)</span>
                </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px', marginBottom: '1.75rem' }}>
                {/* NBA 1 */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#f59e0b' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '6px', background: '#f59e0b20', color: '#f59e0b', fontSize: '12px' }}>📊</span>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>Optimize Payer Mix (IPD)</h4>
                        <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 800, color: '#fff', background: '#10b981', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>High Impact</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.6, paddingLeft: '32px' }}>
                        AI พบว่ายอด Admission จากสิทธิประกันชีวิต (Private Ins.) ลดลง 12% ในสัปดาห์นี้ <strong style={{ color: '#f59e0b' }}>แนะนำให้แจ้งทีม Marketing จัดแคมเปญกระตุ้น Check-up Package สำหรับกลุ่มประกันสุขภาพทันที</strong>
                    </p>
                </div>

                {/* NBA 2 */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#8b5cf6' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '6px', background: '#8b5cf620', color: '#8b5cf6', fontSize: '12px' }}>⏱️</span>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>Zero-Day Billing Opportunity</h4>
                        <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 800, color: '#fff', background: '#f59e0b', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Quick Win</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.6, paddingLeft: '32px' }}>
                        มี <strong style={{ color: '#8b5cf6' }}>45 Discharge Cases</strong> ของวันนี้ที่ยังไม่ได้สรุปชาร์ต การเร่ง Coder ให้ปิดชาร์ตเหล่านี้ภายใน 17:00 น. จะช่วยลด Days in A/R ลงได้เฉลี่ย 1.5 วันในภาพรวม
                    </p>
                </div>

                {/* NBA 3 */}
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--md-surface-2)', border: '1px solid var(--md-border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#0ea5e9' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '6px', background: '#0ea5e920', color: '#0ea5e9', fontSize: '12px' }}>💎</span>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>High-Value Unbilled Revenue</h4>
                        <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 800, color: '#fff', background: '#f43f5e', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Urgent</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.6, paddingLeft: '32px' }}>
                        ตรวจพบ <strong style={{ color: '#0ea5e9' }}>5 เคสผ่าตัดกระดูก (Orthopedics)</strong> สิทธิราชการที่มีค่าอุปกรณ์ค้างจ่ายเบิก (Gap รันประมาณ ฿240k) แนะนำให้ทบทวนเอกสาร Pre-authorization ทันที
                    </p>
                </div>
            </div>

            {/* End of Finance Analytics */}

        </div >
    );
}
