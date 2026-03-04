// ============================================================
// BCH 360° Intelligence V.10 - Finance & RCM Tab
// 🧠 AI Revenue Forecast + Professional Finance Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition
// ============================================================
import React, { useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ComposedChart, Line, Bar, PieChart, Pie, Cell, Legend, ReferenceLine, BarChart
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICard from './KPICard.jsx';

const COLORS = ['#7c3aed', '#f43f5e', '#f59e0b', '#0ea5e9', '#10b981', '#8b5cf6'];

export default function FinanceTab() {
    const { state, fetchData } = useDashboard();
    const { financeSummary, denialAnalytics, paymentPropensity } = state;


    const finAnalytics = state.financeAnalytics;
    const loading = state.loading;

    useEffect(() => {
        // ━━ Tier 1: Critical finance data — show first ━━
        fetchData('financeSummary', '/api/finance/monthly-summary?year=2025');
        fetchData('financeAnalytics', '/api/finance/analytics');
        fetchData('denialAnalytics', '/api/finance/denial-analytics');

        // ━━ Tier 2: AI modules — deferred 200ms to reduce DB contention ━━
        const timer = setTimeout(() => {






            fetchData('paymentPropensity', '/api/ai/propensity-to-pay');
        }, 200);
        return () => clearTimeout(timer);
    }, [fetchData]);


    const summary = financeSummary?.summary;


    return (
        <div className="space-y-4 animate-fade-in pb-10">
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

            {/* ━━━━━ FHI + Professional Finance Analytics Panel ━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #7c3aed, #6d28d9)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    🔬 Advanced Analytics — Finance & RCM
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>90d · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.financeAnalytics ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '56px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = finAnalytics || {};
                    const fhi = a.fhi ?? 0;
                    const fhiColor = fhi >= 80 ? '#10b981' : fhi >= 60 ? '#f59e0b' : '#f43f5e';
                    const fhiGrade = fhi >= 90 ? 'A+' : fhi >= 80 ? 'A' : fhi >= 70 ? 'B+' : fhi >= 60 ? 'B' : fhi >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(fhi / 100, 1) * circumference;

                    const fhiComp = a.fhi_components || {};
                    const fhiRadar = [
                        { name: 'Collection', score: fhiComp.collection || 0 },
                        { name: 'Claims', score: fhiComp.claims || 0 },
                        { name: 'Growth', score: fhiComp.growth || 0 },
                        { name: 'Unpaid Risk', score: fhiComp.unpaid_risk || 0 },
                        { name: 'Efficiency', score: fhiComp.efficiency || 0 },
                    ];

                    // Tier 1: Revenue Efficiency
                    const tier1Cards = [
                        {
                            icon: '🛏️', label: 'Rev per Bed-Day',
                            value: `฿${(a.rev_per_bed_day ?? 0).toLocaleString()}`,
                            sub: `${(a.total_bed_days_90d ?? 0).toLocaleString()} bed-days / 90 วัน`,
                            desc: 'รายได้ต่อเตียงต่อวัน — วัดประสิทธิภาพ IPD',
                            color: (a.rev_per_bed_day ?? 0) >= 3000 ? '#10b981' : (a.rev_per_bed_day ?? 0) >= 1500 ? '#f59e0b' : '#f43f5e',
                            problem: (a.rev_per_bed_day ?? 0) >= 3000
                                ? `Rev/Bed-Day ฿${(a.rev_per_bed_day ?? 0).toLocaleString()} — ดี (≥3,000) เตียงสร้างรายได้ได้ดี Case mix + Billing มีคุณภาพ`
                                : (a.rev_per_bed_day ?? 0) >= 1500
                                    ? `Rev/Bed-Day ฿${(a.rev_per_bed_day ?? 0).toLocaleString()} — ปานกลาง อาจมี Under-billing, LOS ยาวโดยไม่มี Procedure เพิ่ม, หรือ Case mix เบา`
                                    : `🚨 Rev/Bed-Day ฿${(a.rev_per_bed_day ?? 0).toLocaleString()} — ต่ำ! เตียงสร้างรายได้น้อย สาเหตุ: Missing charges, Under-coding, หรือ Social admission มาก`,
                            recommend: (a.rev_per_bed_day ?? 0) >= 3000
                                ? '✅ คงมาตรฐาน — Benchmark รายเดือน + ราย Ward เพื่อหา Improvement area'
                                : '📋 เพิ่ม Rev/Bed-Day: (1) Audit charge ทุก ward ทุกสัปดาห์ (2) ลด LOS ด้วย Discharge planning (3) เพิ่ม Procedure-based revenue (4) DRG coding review ทุก case (5) ลด Social admission ด้วย Community referral',
                        },
                        {
                            icon: '💳', label: 'Collection Rate',
                            value: `${a.collection_rate ?? 0}%`,
                            sub: `Paid ฿${((a.total_paid_90d ?? 0) / 1e6).toFixed(1)}M / Charged ฿${((a.total_charged_90d ?? 0) / 1e6).toFixed(1)}M`,
                            desc: '% เก็บเงินได้ vs เรียกเก็บ — HA Benchmark',
                            color: (a.collection_rate ?? 0) >= 85 ? '#10b981' : (a.collection_rate ?? 0) >= 70 ? '#f59e0b' : '#f43f5e',
                            problem: (a.collection_rate ?? 0) >= 85
                                ? `Collection ${a.collection_rate ?? 0}% — ดี (≥85%) RCM ทำงานมีประสิทธิภาพ`
                                : (a.collection_rate ?? 0) >= 70
                                    ? `Collection ${a.collection_rate ?? 0}% — ต่ำกว่าเกณฑ์ 85% Revenue leakage ฿${(((a.total_charged_90d ?? 0) - (a.total_paid_90d ?? 0)) / 1e6).toFixed(1)}M / 90 วัน สาเหตุ: Claim rejection, Bad debt, Under-billing`
                                    : `🚨 Collection ${a.collection_rate ?? 0}% — วิกฤต! เก็บได้ไม่ถึง 70% สูญเสียรายได้มาก อาจส่งผลต่อ Cash flow + ความอยู่รอดของ รพ.`,
                            recommend: (a.collection_rate ?? 0) >= 85
                                ? '✅ คงมาตรฐาน — ทำ Collection analysis รายสิทธิ์ เพื่อลด Leakage ต่อเนื่อง'
                                : '📋 เพิ่ม Collection: (1) Audit rejected claims ทุกสัปดาห์ (2) เร่งส่ง Claim ภายใน 30 วัน (3) Bad debt follow-up team ทุก case ค้างชำระ >90 วัน (4) Pre-authorization ทุก High-cost case (5) Patient financial counseling ก่อน admit',
                        },
                        {
                            icon: '📋', label: 'Claims Success',
                            value: `${a.claim_success_rate ?? 0}%`,
                            sub: `Gap ฿${((a.total_claims_gap ?? 0) / 1000).toFixed(0)}K · adjRW ${a.avg_adjrw ?? 0}`,
                            desc: '% claim ที่ได้รับเงิน — สะท้อนคุณภาพ coding',
                            color: (a.claim_success_rate ?? 0) >= 90 ? '#10b981' : (a.claim_success_rate ?? 0) >= 75 ? '#f59e0b' : '#f43f5e',
                            problem: (a.claim_success_rate ?? 0) >= 90
                                ? `Claims ${a.claim_success_rate ?? 0}% — ดี (≥90%) DRG coding + Claim submission มีคุณภาพ`
                                : `Claims ${a.claim_success_rate ?? 0}% (Gap ฿${((a.total_claims_gap ?? 0) / 1000).toFixed(0)}K) — ต่ำ! Revenue leakage จาก Claim rejection สาเหตุ: DRG under-coding, เอกสารไม่ครบ, ส่งล่าช้า`,
                            recommend: (a.claim_success_rate ?? 0) >= 90
                                ? '✅ คงมาตรฐาน — ทำ Claims audit รายเดือนเพื่อหา Under-coding'
                                : '📋 เพิ่ม Claims: (1) DRG coding audit ทุก case (2) อบรม Coder เรื่อง Comorbidity + Complication coding (3) Pre-submission review (4) Denial management team ติดตามทุก rejection (5) adjRW optimization',
                        },
                        {
                            icon: '⚠️', label: 'Under-collected',
                            value: `${a.under_collected_cases ?? 0}`,
                            sub: `cases ที่ paid <50% charged`,
                            desc: 'จำนวน case ที่เก็บเงินได้ <50% — ต้อง follow up',
                            color: (a.under_collected_cases ?? 0) < 5 ? '#10b981' : (a.under_collected_cases ?? 0) < 15 ? '#f59e0b' : '#f43f5e',
                            problem: (a.under_collected_cases ?? 0) < 5
                                ? `Under-collected ${a.under_collected_cases ?? 0} cases — ดี (<5) ไม่มีปัญหา Bad debt รุนแรง`
                                : `Under-collected ${a.under_collected_cases ?? 0} cases — สูง! Cases ที่เก็บเงินได้ไม่ถึงครึ่ง จะกลายเป็น Bad debt สาเหตุ: Uninsured, Claim rejection, Incomplete billing, Patient default`,
                            recommend: (a.under_collected_cases ?? 0) < 5
                                ? '✅ ดี — Follow-up ทุก case ที่เหลือต่อเนื่อง'
                                : '📋 ลด Under-collected: (1) Case-by-case review ทุก under-collected (2) Re-submit claim ที่เคย reject (3) Financial counselor ติดต่อผู้ป่วย (4) Payment plan สำหรับ Uninsured (5) Legal action สำหรับ Default >180 วัน',
                        },
                    ];

                    // Tier 2: Revenue per Visit
                    const tier2Cards = [
                        {
                            icon: '🏢', label: 'Avg OPD Revenue',
                            value: `฿${(a.avg_opd_revenue ?? 0).toLocaleString()}`,
                            sub: `${(a.total_opd_visits_30d ?? 0).toLocaleString()} visits · Total ฿${((a.total_opd_revenue_30d ?? 0) / 1e6).toFixed(1)}M`,
                            desc: 'รายได้เฉลี่ยต่อ visit OPD (30 วัน)',
                            color: '#0ea5e9',
                            problem: `OPD Rev/Visit ฿${(a.avg_opd_revenue ?? 0).toLocaleString()} (${(a.total_opd_visits_30d ?? 0).toLocaleString()} visits) — ${(a.avg_opd_revenue ?? 0) < 500 ? '⚠️ ต่ำ ตรวจ Missing charges + เพิ่ม Ancillary services' : 'ปกติ'}`,
                            recommend: '📋 OPD Revenue: (1) Lab/X-ray bundling ตาม Clinical pathway (2) เพิ่ม Special clinic (เบาหวาน, ผิวหนัง, กระดูก) (3) Verify charge capture ทุกจุด (4) Upcoding opportunity analysis',
                        },
                        {
                            icon: '🏥', label: 'Avg IPD Charge',
                            value: `฿${(a.avg_ipd_charge ?? 0).toLocaleString()}`,
                            sub: `Paid ฿${(a.avg_ipd_paid ?? 0).toLocaleString()} · Gap ฿${(a.avg_ipd_gap ?? 0).toLocaleString()}`,
                            desc: 'ค่ารักษาเฉลี่ยต่อ case IPD (30 วัน)',
                            color: '#8b5cf6',
                            problem: `IPD Charge ฿${(a.avg_ipd_charge ?? 0).toLocaleString()} / Paid ฿${(a.avg_ipd_paid ?? 0).toLocaleString()} (Gap ฿${(a.avg_ipd_gap ?? 0).toLocaleString()}) — ${(a.avg_ipd_gap ?? 0) > 5000 ? '⚠️ Gap สูง สูญเสียต่อ case' : 'Gap อยู่ในเกณฑ์'}`,
                            recommend: '📋 IPD Revenue: (1) DRG Grouper optimization (2) ลด IPD charge leakage ด้วย Real-time charge audit (3) Reduce Gap ด้วย Clinical pathway ลด Unnecessary stay (4) Negotiate payer contracts',
                        },
                        {
                            icon: '📊', label: 'IPD Discharge 30d',
                            value: `${a.total_ipd_dch_30d ?? 0}`,
                            sub: `cases`,
                            desc: 'จำนวน discharge IPD ใน 30 วัน',
                            color: '#7c3aed',
                            problem: `IPD Discharge ${a.total_ipd_dch_30d ?? 0} cases / 30 วัน (เฉลี่ย ${Math.round((a.total_ipd_dch_30d ?? 0) / 30)} /วัน) — สะท้อน Throughput ของ IPD`,
                            recommend: '📋 Throughput: (1) Discharge before noon target (2) Discharge planning ตั้งแต่วัน admit (3) ลด Discharge delay barriers (4) เพิ่ม Bed turnover rate',
                        },
                        {
                            icon: '💰', label: 'IPD Accumulated',
                            value: `฿${((a.current_ipd_accumulated ?? 0) / 1000).toFixed(0)}K`,
                            sub: `${a.current_ipd_count ?? 0} pts นอนอยู่ปัจจุบัน`,
                            desc: 'รายได้สะสม IPD ที่ยังไม่ discharge',
                            color: '#f59e0b',
                            problem: `IPD Accumulated ฿${((a.current_ipd_accumulated ?? 0) / 1000).toFixed(0)}K (${a.current_ipd_count ?? 0} pts) — เฉลี่ย ฿${a.current_ipd_count ? Math.round((a.current_ipd_accumulated ?? 0) / a.current_ipd_count).toLocaleString() : '—'}/pt รายได้นี้ยังไม่เข้าระบบ จนกว่าจะ discharge`,
                            recommend: '📋 Monitor: (1) ตรวจ High-accumulated cases ทุกวัน (2) Pre-authorization สำหรับ cases ที่สะสมสูง (3) Financial counseling ทุกราย >100K (4) ลด Unnecessary stay เพื่อ Control cost',
                        },
                    ];

                    // Tier 3: Financial Risk & Efficiency (NEW)
                    const profitMargin = a.profit_margin ?? 0;
                    const avgLos = a.avg_los ?? 0;
                    const bedTurnover = a.bed_turnover_per_ward ?? 0;
                    const costPerDc = a.total_dc_90d > 0 ? Math.round((a.total_ipd_charge_90d ?? 0) * 0.62 / a.total_dc_90d) : 0;

                    const tier3Cards = [
                        {
                            icon: '📈', label: 'Profit Margin',
                            value: `${profitMargin}%`,
                            sub: `Net Profit / Revenue (90 วัน)`,
                            desc: 'อัตรากำไรสุทธิ — HA Financial Benchmark',
                            color: profitMargin >= 30 ? '#10b981' : profitMargin >= 15 ? '#f59e0b' : '#f43f5e',
                            problem: profitMargin >= 30
                                ? `Margin ${profitMargin}% — ดี (≥30%) รพ. มีกำไรเพียงพอสำหรับ Reinvestment`
                                : profitMargin >= 15
                                    ? `Margin ${profitMargin}% — ปานกลาง Revenue อาจไม่พอ Cover cost increase ในอนาคต`
                                    : `🚨 Margin ${profitMargin}% — ต่ำ! ต้นทุนเกือบเท่ารายได้ ความเสี่ยงขาดทุนสูง`,
                            recommend: profitMargin >= 30
                                ? '✅ คงมาตรฐาน — Allocate กำไรส่วนเกินเพื่อ Equipment upgrade + Staff development'
                                : '📋 เพิ่ม Margin: (1) ลดต้นทุนยา/วัสดุ ด้วย Group purchasing (2) เพิ่ม Revenue per case (3) ลด Unnecessary investigation (4) Energy saving program (5) Optimize staffing ratio',
                        },
                        {
                            icon: '💵', label: 'Cost per Discharge',
                            value: `฿${costPerDc.toLocaleString()}`,
                            sub: `${a.total_dc_90d ?? 0} DC / 90 วัน`,
                            desc: 'ต้นทุนเฉลี่ยต่อ case — Cost Efficiency',
                            color: costPerDc <= 8000 ? '#10b981' : costPerDc <= 15000 ? '#f59e0b' : '#f43f5e',
                            problem: costPerDc <= 8000
                                ? `Cost/DC ฿${costPerDc.toLocaleString()} — ดี ต้นทุนต่อ case อยู่ในเกณฑ์`
                                : `Cost/DC ฿${costPerDc.toLocaleString()} — ${costPerDc > 15000 ? '🚨 สูง!' : '⚠️ ปานกลาง'} ต้นทุนต่อ case สูง สาเหตุ: Unnecessary stay, Over-investigation, High drug cost`,
                            recommend: '📋 ลด Cost/DC: (1) Clinical pathway ลด Variation (2) Drug formulary optimization (3) Discharge planning Day 1 (4) ลด Re-admission (5) Benchmarking ราย DRG',
                        },
                        {
                            icon: '🛏️', label: 'Avg LOS (IPD)',
                            value: `${avgLos} วัน`,
                            sub: `SD ${a.sd_los ?? 0} · Range ${a.min_los ?? 0}-${a.max_los ?? 0} · >${'7d'} ${a.long_los_cases ?? 0} cases`,
                            desc: 'ระยะนอนเฉลี่ย — LOS ยิ่งสั้นยิ่งดี',
                            color: avgLos <= 4 ? '#10b981' : avgLos <= 7 ? '#f59e0b' : '#f43f5e',
                            problem: avgLos <= 4
                                ? `LOS ${avgLos} วัน — ดี (≤4) Discharge planning มีประสิทธิภาพ`
                                : avgLos <= 7
                                    ? `LOS ${avgLos} วัน — ปานกลาง มี ${a.long_los_cases ?? 0} cases นอน >7 วัน ส่งผลต่อ Bed utilization + ต้นทุน`
                                    : `🚨 LOS ${avgLos} วัน — สูง! (SD ${a.sd_los ?? 0}) มี ${a.long_los_cases ?? 0} Long-stay cases ต้นทุนสูง + เตียงไม่ว่าง`,
                            recommend: avgLos <= 4
                                ? '✅ คงมาตรฐาน — Monitor Long-stay outliers ทุกสัปดาห์'
                                : '📋 ลด LOS: (1) Discharge planning ตั้งแต่วัน Admit (2) Multidisciplinary round ทุกวัน (3) DC before noon target (4) Identify Social admission barriers (5) Community referral program',
                        },
                        {
                            icon: '🔄', label: 'Bed Turnover',
                            value: `${bedTurnover}`,
                            sub: `cases/ward · ${a.active_wards ?? 0} active wards`,
                            desc: 'อัตราหมุนเวียนเตียงต่อ ward (90 วัน)',
                            color: bedTurnover >= 30 ? '#10b981' : bedTurnover >= 15 ? '#f59e0b' : '#f43f5e',
                            problem: bedTurnover >= 30
                                ? `Turnover ${bedTurnover}/ward — ดี (≥30) เตียงหมุนเวียนมีประสิทธิภาพ`
                                : `Turnover ${bedTurnover}/ward — ${bedTurnover < 15 ? '🚨 ต่ำ!' : '⚠️ ปานกลาง'} เตียงไม่หมุนเวียน สาเหตุ: LOS ยาว, Delayed DC, Low admission`,
                            recommend: bedTurnover >= 30
                                ? '✅ คงมาตรฐาน — เพิ่ม Revenue per turnover ด้วย Case mix optimization'
                                : '📋 เพิ่ม Turnover: (1) ลด LOS ด้วย DC planning (2) Fast-track admission process (3) Bed management system (4) Pre-admission testing ลด Wait time (5) Step-down care referral',
                        },
                    ];

                    // Tier 4: Revenue Quality & Growth (NEW)
                    const momGrowth = a.revenue_mom_growth ?? 0;
                    const cmi = a.cmi ?? 0;
                    const opdIpdRatio = a.opd_ipd_ratio || {};
                    const daysAR = a.days_in_ar ?? 0;

                    const tier4Cards = [
                        {
                            icon: '📊', label: 'Revenue Growth MoM',
                            value: `${momGrowth > 0 ? '+' : ''}${momGrowth}%`,
                            sub: `เปรียบเทียบ 2 เดือนล่าสุด (complete)`,
                            desc: 'อัตราเติบโตรายได้ Month-over-Month',
                            color: momGrowth >= 5 ? '#10b981' : momGrowth >= 0 ? '#f59e0b' : '#f43f5e',
                            problem: momGrowth >= 5
                                ? `Growth ${momGrowth > 0 ? '+' : ''}${momGrowth}% — ดี รายได้เพิ่มขึ้นต่อเนื่อง`
                                : momGrowth >= 0
                                    ? `Growth ${momGrowth}% — ทรงตัว รายได้ไม่เพิ่มขึ้น ต้องหา New revenue stream`
                                    : `🚨 Growth ${momGrowth}% — ลดลง! รายได้ลดลง อาจเกิดจาก ผู้ป่วยลด, Payer mix เปลี่ยน, Seasonal effect`,
                            recommend: momGrowth >= 5
                                ? '✅ คงมาตรฐาน — Identify growth drivers เพื่อ Replicate success'
                                : '📋 เพิ่ม Growth: (1) เพิ่ม Service line ใหม่ (2) Marketing กลุ่มเป้าหมาย (3) เพิ่ม Specialist clinic (4) Extend operating hours (5) Telemedicine/Home care',
                        },
                        {
                            icon: '🎯', label: 'Case Mix Index',
                            value: `${cmi}`,
                            sub: `avg RW / case (90 วัน)`,
                            desc: 'ดัชนีความซับซ้อนของ case — CMI สูง = รายได้สูง',
                            color: cmi >= 1.0 ? '#10b981' : cmi >= 0.6 ? '#f59e0b' : '#f43f5e',
                            problem: cmi >= 1.0
                                ? `CMI ${cmi} — ดี (≥1.0) Case mix ซับซ้อน สร้างรายได้ต่อ case สูง`
                                : cmi >= 0.6
                                    ? `CMI ${cmi} — ปานกลาง Case mix เบา อาจไม่ Maximize DRG reimbursement`
                                    : `🚨 CMI ${cmi} — ต่ำ! ส่วนใหญ่เป็น Simple cases (RW ต่ำ) — Under-coding หรือ Low-acuity patients`,
                            recommend: cmi >= 1.0
                                ? '✅ คงมาตรฐาน — Audit DRG coding ทุกเดือน เพื่อ Maintain CMI'
                                : '📋 เพิ่ม CMI: (1) DRG coding audit — record Comorbidities + Complications (2) อบรม Coder ทุกไตรมาส (3) เพิ่ม Procedure-based cases (4) Referral network สำหรับ Complex cases (5) Clinical documentation improvement (CDI) program',
                        },
                        {
                            icon: '⚖️', label: 'OPD-IPD Ratio',
                            value: `${opdIpdRatio.opd_pct ?? 0}:${opdIpdRatio.ipd_pct ?? 0}`,
                            sub: `OPD ฿${((a.total_opd_revenue_90d ?? 0) / 1e6).toFixed(1)}M · IPD ฿${((a.total_ipd_charge_90d ?? 0) / 1e6).toFixed(1)}M`,
                            desc: 'สัดส่วนรายได้ OPD vs IPD (90 วัน)',
                            color: '#0ea5e9',
                            problem: `OPD ${opdIpdRatio.opd_pct ?? 0}% vs IPD ${opdIpdRatio.ipd_pct ?? 0}% — ${(opdIpdRatio.ipd_pct ?? 0) > 70 ? '⚠️ พึ่งพา IPD มาก ความเสี่ยงสูงหาก Admission ลดลง' : 'สมดุล ดี กระจายความเสี่ยง'}`,
                            recommend: '📋 Revenue Diversification: (1) เพิ่ม OPD specialty clinic (2) Home care / Day surgery program (3) Check-up package (4) เพิ่ม Ancillary revenue (Lab, Imaging) (5) Telemedicine สำหรับ Follow-up',
                        },
                        {
                            icon: '⏱️', label: 'Days in A/R',
                            value: `${daysAR} วัน`,
                            sub: `Outstanding / Daily Revenue`,
                            desc: 'วันเฉลี่ยรอเก็บเงิน — Cash Cycle Indicator',
                            color: daysAR <= 30 ? '#10b981' : daysAR <= 60 ? '#f59e0b' : '#f43f5e',
                            problem: daysAR <= 30
                                ? `Days A/R ${daysAR} วัน — ดี (≤30) Cash cycle สั้น เก็บเงินเร็ว`
                                : daysAR <= 60
                                    ? `Days A/R ${daysAR} วัน — ปานกลาง Cash flow อาจตึงในบางช่วง`
                                    : `🚨 Days A/R ${daysAR} วัน — สูง! เก็บเงินช้า Cash flow ตึง สาเหตุ: Claim ล่าช้า, Bad debt สูง, Outstanding มาก`,
                            recommend: daysAR <= 30
                                ? '✅ คงมาตรฐาน — Monitor monthly + Aging report review'
                                : '📋 ลด Days A/R: (1) เร่ง Claim submission ภายใน 15 วัน (2) Follow-up ทุก Pending claim (3) Patient copay collection ณ จุดบริการ (4) Aging report review ทุกสัปดาห์ (5) Auto-billing system',
                        },
                    ];

                    // ━━ Tier 5: DRG & Cost Optimization ━━
                    const drgRecovery = a.drg_recovery_rate ?? 0;
                    const highRwPct = a.high_rw_pct ?? 0;
                    const revenuePerRw = a.revenue_per_rw ?? 0;
                    const topDrgData = (a.cost_by_drg || []);
                    const topDrgName = topDrgData[0]?.drg || '-';
                    const topDrgRev = topDrgData[0]?.avg_charge ?? 0;

                    const tier5Cards = [
                        {
                            icon: '🏷️', label: 'Top DRG Revenue',
                            value: topDrgName,
                            sub: `฿${topDrgRev.toLocaleString()}/case · ${topDrgData.length} DRGs`,
                            desc: 'DRG ที่สร้างรายได้สูงสุด (90 วัน)',
                            color: '#06b6d4',
                            problem: topDrgData.length > 0
                                ? `DRG ${topDrgName} สร้างรายได้สูงสุด ฿${topDrgRev.toLocaleString()}/case — ควรวิเคราะห์ Clinical pathway + Coding accuracy เพื่อ maximize reimbursement`
                                : 'ไม่มีข้อมูล DRG',
                            recommend: '📋 DRG Optimization: (1) Audit top-earning DRGs ทุกเดือน (2) Review coding completeness (3) Comorbidity + CC documentation (4) Clinical pathway alignment (5) Compare RW vs actual cost',
                        },
                        {
                            icon: '💎', label: 'DRG Recovery Rate',
                            value: `${drgRecovery}%`,
                            sub: `avg across top DRGs`,
                            desc: 'อัตราเก็บเงินจริงเฉลี่ยจาก DRG (Paid/Charge)',
                            color: drgRecovery >= 80 ? '#10b981' : drgRecovery >= 60 ? '#f59e0b' : '#f43f5e',
                            problem: drgRecovery >= 80
                                ? `✅ Recovery ${drgRecovery}% — ดี DRG reimbursement ใกล้เคียง Charge`
                                : `Recovery ${drgRecovery}% — ต่ำ Charge สูงกว่า Paid มาก สาเหตุ: DRG rate ต่ำ, Under-coding, Payer contract ไม่เหมาะสม`,
                            recommend: drgRecovery >= 80
                                ? '✅ Monitor DRG recovery ≥80% ทุกเดือน'
                                : '📋 เพิ่ม Recovery: (1) Renegotiate payer contracts (2) DRG grouper optimization (3) Reduce unnecessary cost (4) ICD-10 coding audit (5) Clinical pathway ลดต้นทุน',
                        },
                        {
                            icon: '⚡', label: 'High-RW Cases',
                            value: `${highRwPct}%`,
                            sub: `${a.high_rw_cases ?? 0} / ${a.total_rw ? Math.round(a.total_rw) : 0} total RW`,
                            desc: 'สัดส่วน cases ที่ RW ≥ 2.0 (Complex cases)',
                            color: highRwPct >= 15 ? '#10b981' : highRwPct >= 8 ? '#f59e0b' : '#ef4444',
                            problem: highRwPct >= 15
                                ? `Complex cases ${highRwPct}% ดี — สร้างรายได้สูง Avg ฿${(a.avg_high_rw_revenue ?? 0).toLocaleString()}/case`
                                : `Complex cases ${highRwPct}% ต่ำ — Case mix เบา โรงพยาบาลรับ Low-acuity cases มาก Revenue per case ต่ำ`,
                            recommend: highRwPct >= 15
                                ? '✅ เพิ่ม Specialty service line + Referral network'
                                : '📋 เพิ่ม High-RW: (1) พัฒนา Specialty services (2) Referral network กับ รพ.สต. (3) Complex case management team (4) Invest in surgical/procedural capacity',
                        },
                        {
                            icon: '💰', label: 'Revenue per RW',
                            value: `฿${revenuePerRw.toLocaleString()}`,
                            sub: `ต่อ 1 หน่วย Relative Weight`,
                            desc: 'ประสิทธิภาพรายได้ต่อ DRG weight unit',
                            color: revenuePerRw >= 12000 ? '#10b981' : revenuePerRw >= 8000 ? '#f59e0b' : '#f43f5e',
                            problem: revenuePerRw >= 12000
                                ? `฿${revenuePerRw.toLocaleString()}/RW — ดี Reimbursement คุ้มค่ากับ Acuity`
                                : `฿${revenuePerRw.toLocaleString()}/RW — ต่ำกว่ามาตรฐาน (≥฿12,000) สาเหตุ: Under-coding, Payer rate ต่ำ, Charge leakage`,
                            recommend: revenuePerRw >= 12000
                                ? '✅ Monitor Revenue/RW trend ทุกเดือน'
                                : '📋 เพิ่ม Rev/RW: (1) DRG coding accuracy review (2) Complete CC/MCC documentation (3) Negotiate RW-based payment (4) Reduce unbilled procedures (5) เป้าหมาย: ≥฿12,000/RW',
                        },
                    ];

                    // ━━ Tier 6: Financial Risk Intelligence ━━
                    const revVolatility = a.revenue_volatility ?? 0;
                    const payerConcentration = a.payer_concentration ?? 0;
                    const badDebtRatio = a.bad_debt_ratio ?? 0;

                    const tier6Cards = [
                        {
                            icon: '📉', label: 'Revenue Volatility',
                            value: `${revVolatility}%`,
                            sub: 'CV% (Coefficient of Variation)',
                            desc: 'ความผันผวนของรายได้รายเดือน — ยิ่งต่ำยิ่งมั่นคง',
                            color: revVolatility <= 10 ? '#10b981' : revVolatility <= 20 ? '#f59e0b' : '#f43f5e',
                            problem: revVolatility <= 10
                                ? `✅ CV ${revVolatility}% — รายได้มั่นคง ผันผวนน้อย`
                                : revVolatility <= 20
                                    ? `CV ${revVolatility}% — ปานกลาง รายได้มีความผันผวน อาจเกิดจาก Seasonal patterns หรือ Payer payment delay`
                                    : `🚨 CV ${revVolatility}% — สูง! รายได้ไม่แน่นอน วางแผนงบประมาณยาก สาเหตุ: Seasonal variation, Large claim delays, Volume fluctuation`,
                            recommend: revVolatility <= 10
                                ? '✅ คงมาตรฐาน — Continue revenue diversification'
                                : '📋 ลดความผันผวน: (1) Diversify payer mix (2) Service line expansion (3) Predictive revenue modeling (4) Cash reserve fund ≥2 months operating expense',
                        },
                        {
                            icon: '🎯', label: 'Payer Concentration',
                            value: `${payerConcentration}%`,
                            sub: 'รายได้จาก Top 3 สิทธิ์',
                            desc: 'ความเสี่ยงจากการพึ่งพาสิทธิ์หลัก — ยิ่งสูงยิ่งเสี่ยง',
                            color: payerConcentration <= 60 ? '#10b981' : payerConcentration <= 80 ? '#f59e0b' : '#f43f5e',
                            problem: payerConcentration <= 60
                                ? `✅ กระจายตัวดี — Top 3 = ${payerConcentration}% ไม่พึ่งพาสิทธิ์ใดสิทธิ์หนึ่งมากเกินไป`
                                : `Top 3 สิทธิ์ = ${payerConcentration}% ของรายได้ — เสี่ยง! หากสิทธิ์หลักเปลี่ยนนโยบาย/Rate จะกระทบรายได้มาก`,
                            recommend: payerConcentration <= 60
                                ? '✅ คงความหลากหลาย — Expand self-pay + corporate health'
                                : '📋 ลดความเสี่ยง: (1) เพิ่ม Self-pay services (2) Corporate health check-up (3) Negotiate long-term contracts (4) International patient program (5) Specialty clinic revenue',
                        },
                        {
                            icon: '⚠️', label: 'Bad Debt Ratio',
                            value: `${badDebtRatio}%`,
                            sub: `${a.under_collected_cases ?? 0} cases / total`,
                            desc: 'สัดส่วนหนี้สูญ — cases ที่เก็บเงินได้ <50%',
                            color: badDebtRatio <= 2 ? '#10b981' : badDebtRatio <= 5 ? '#f59e0b' : '#f43f5e',
                            problem: badDebtRatio <= 2
                                ? `✅ Bad debt ${badDebtRatio}% — ดี การจัดเก็บรายได้มีประสิทธิภาพ`
                                : `Bad debt ${badDebtRatio}% — สูง! มี ${a.under_collected_cases ?? 0} cases ที่เสี่ยงเป็นหนี้สูญ สาเหตุ: Uninsured patients, Claim rejection ไม่ Re-submit, Patient default`,
                            recommend: badDebtRatio <= 2
                                ? '✅ คงมาตรฐาน — Early warning system + Monthly review'
                                : '📋 ลด Bad Debt: (1) Financial counselor ทุก Uninsured case (2) Payment installment plan (3) Re-submit rejected claims ทันที (4) Legal action >180 วัน (5) Insurance enrollment assistance',
                        },
                        {
                            icon: '🏦', label: 'Cash Runway',
                            value: `${daysAR <= 30 ? '✅ ดี' : daysAR <= 60 ? '⚠️ ระวัง' : '🚨 วิกฤต'}`,
                            sub: `${daysAR} วัน A/R cycle`,
                            desc: 'สถานะ Cash flow — ระยะเวลาคงเหลือ',
                            color: daysAR <= 30 ? '#10b981' : daysAR <= 60 ? '#f59e0b' : '#f43f5e',
                            problem: daysAR <= 30
                                ? `✅ Cash flow ดี — A/R cycle ${daysAR} วัน สภาพคล่องเพียงพอ`
                                : `Cash flow ตึง — A/R ${daysAR} วัน ต้องรอเงินนาน ค่าใช้จ่ายเดินทุกวัน เสี่ยงขาดสภาพคล่อง`,
                            recommend: daysAR <= 30
                                ? '✅ Build cash reserve ≥3 months — Emergency fund'
                                : '📋 ปรับปรุง Cash flow: (1) เร่ง A/R collection (2) Negotiate supplier credit terms (3) Short-term credit line backup (4) Copay at point-of-service (5) Cash reserve policy',
                        },
                    ];

                    // ━━ Tier 7: Provider Productivity ━━
                    const revPerDoc = a.revenue_per_doctor ?? 0;
                    const visitsPerDoc = a.avg_visits_per_doctor ?? 0;
                    const newPatientPct = a.new_patient_pct ?? 0;
                    const returnRevPct = a.return_revenue_pct ?? 0;
                    const topDoc = (a.top_doctors || [])[0];

                    const tier7Cards = [
                        {
                            icon: '👨‍⚕️', label: 'Revenue per Doctor',
                            value: `฿${revPerDoc.toLocaleString()}`,
                            sub: `${a.active_doctors ?? 0} active doctors (90d)`,
                            desc: 'รายได้เฉลี่ยต่อแพทย์ (Top 10)',
                            color: revPerDoc >= 500000 ? '#10b981' : revPerDoc >= 200000 ? '#f59e0b' : '#f43f5e',
                            problem: revPerDoc >= 500000
                                ? `✅ ฿${revPerDoc.toLocaleString()}/doctor — Productivity ดี แพทย์สร้างรายได้สูง`
                                : `฿${revPerDoc.toLocaleString()}/doctor — ต่ำ สาเหตุ: Patient volume น้อย, Short clinic hours, Limited procedures, Under-billing`,
                            recommend: revPerDoc >= 500000
                                ? '✅ Monitor per-doctor trend + Identify best practices'
                                : '📋 เพิ่ม Rev/Doctor: (1) Optimize scheduling (2) Extend clinic hours (3) เพิ่ม Procedure-based services (4) Reduce admin burden (5) Performance incentive program',
                        },
                        {
                            icon: '📊', label: 'Visits per Doctor',
                            value: `${visitsPerDoc}`,
                            sub: `visits/doctor (90 วัน)`,
                            desc: 'จำนวนผู้ป่วยเฉลี่ยต่อแพทย์',
                            color: visitsPerDoc >= 300 ? '#10b981' : visitsPerDoc >= 150 ? '#f59e0b' : '#f43f5e',
                            problem: visitsPerDoc >= 300
                                ? `✅ ${visitsPerDoc} visits/doctor — Workload เหมาะสม ผู้ป่วยเข้าถึงบริการดี`
                                : `${visitsPerDoc} visits/doctor — ต่ำ อาจเกิดจาก: ตารางคลินิกไม่เต็ม, ผู้ป่วยหลุด follow-up, Referral ออกนอกสูง`,
                            recommend: visitsPerDoc >= 300
                                ? '✅ Balance workload — ป้องกัน Burnout + Quality maintenance'
                                : '📋 เพิ่ม Volume: (1) Appointment reminder system (2) Walk-in slot optimization (3) NCD follow-up clinic (4) Telemedicine for follow-up',
                        },
                        {
                            icon: '🆕', label: 'New Patient Ratio',
                            value: `${newPatientPct}%`,
                            sub: `${(a.new_patient_visits ?? 0).toLocaleString()} new / ${(a.return_patient_visits ?? 0).toLocaleString()} return`,
                            desc: 'สัดส่วนผู้ป่วยใหม่ — Market penetration',
                            color: newPatientPct >= 20 ? '#10b981' : newPatientPct >= 10 ? '#f59e0b' : '#f43f5e',
                            problem: newPatientPct >= 20
                                ? `✅ New patients ${newPatientPct}% — ดี Market share เพิ่มขึ้น มีผู้ป่วยใหม่เข้าถึงบริการ`
                                : `New patients ${newPatientPct}% — ต่ำ รพ.พึ่งพาผู้ป่วยเก่า ตลาดอาจอิ่มตัว ยังไม่สามารถดึงดูดผู้ป่วยใหม่ได้`,
                            recommend: newPatientPct >= 20
                                ? '✅ Maintain — Community outreach + Referral network'
                                : '📋 เพิ่ม New Patients: (1) Health screening campaigns (2) Community outreach (3) Online presence/Google Maps (4) Referral partnership กับคลินิก (5) Specialty expertise marketing',
                        },
                        {
                            icon: '🔁', label: 'Return Revenue %',
                            value: `${returnRevPct}%`,
                            sub: `฿${(a.return_patient_revenue ?? 0).toLocaleString()}`,
                            desc: 'สัดส่วนรายได้จากผู้ป่วยกลับมาติดตาม',
                            color: returnRevPct >= 60 ? '#10b981' : returnRevPct >= 40 ? '#f59e0b' : '#f43f5e',
                            problem: returnRevPct >= 60
                                ? `✅ Return revenue ${returnRevPct}% — ฐานรายได้มั่นคง ผู้ป่วยกลับมาใช้บริการซ้ำ`
                                : `Return revenue ${returnRevPct}% — ต่ำ ผู้ป่วยหลุด follow-up สูง สาเหตุ: Satisfaction ไม่ดี, ไม่ได้นัด, ย้ายไป รพ.อื่น`,
                            recommend: returnRevPct >= 60
                                ? '✅ Patient retention program + Satisfaction survey'
                                : '📋 เพิ่ม Retention: (1) NCD follow-up automation (2) Appointment reminder SMS/LINE (3) Patient satisfaction survey (4) Loyalty program (5) Chronic disease management',
                        },
                    ];

                    // ━━ Tier 8: Strategic Finance Insights ━━
                    const weekendRevPct = a.weekend_revenue_pct ?? 0;
                    const weekendRev = a.weekend_revenue ?? 0;
                    const weekdayRev = a.weekday_revenue ?? 0;
                    const avgWeekendPerVisit = (a.weekend_visits ?? 0) > 0 ? Math.round(weekendRev / a.weekend_visits) : 0;
                    const avgWeekdayPerVisit = (a.weekday_visits ?? 0) > 0 ? Math.round(weekdayRev / a.weekday_visits) : 0;

                    const tier8Cards = [
                        {
                            icon: '📅', label: 'Weekend Revenue',
                            value: `${weekendRevPct}%`,
                            sub: `฿${weekendRev.toLocaleString()} · ${(a.weekend_visits ?? 0).toLocaleString()} visits`,
                            desc: 'สัดส่วนรายได้วันเสาร์-อาทิตย์ (% ของทั้งหมด)',
                            color: weekendRevPct >= 20 ? '#10b981' : weekendRevPct >= 10 ? '#f59e0b' : '#94a3b8',
                            problem: weekendRevPct >= 20
                                ? `✅ Weekend ${weekendRevPct}% — ดี มีบริการวันหยุด สร้างรายได้ต่อเนื่อง`
                                : `Weekend ${weekendRevPct}% — ยังน้อย ศักยภาพเพิ่มรายได้ จากคลินิกวันหยุด/ER/IPD Admission`,
                            recommend: weekendRevPct >= 20
                                ? '✅ Optimize weekend staffing — Match demand'
                                : '📋 เพิ่ม Weekend Revenue: (1) Weekend specialty clinic (2) Health check-up program (3) Dental/PT weekend service (4) Emergency readiness (5) Telemedicine on weekends',
                        },
                        {
                            icon: '⚖️', label: 'Weekday Efficiency',
                            value: `฿${avgWeekdayPerVisit.toLocaleString()}`,
                            sub: `vs Weekend ฿${avgWeekendPerVisit.toLocaleString()}/visit`,
                            desc: 'รายได้ต่อ visit — เปรียบเทียบ Weekday vs Weekend',
                            color: avgWeekdayPerVisit >= avgWeekendPerVisit ? '#10b981' : '#f59e0b',
                            problem: avgWeekdayPerVisit >= avgWeekendPerVisit
                                ? `Weekday ฿${avgWeekdayPerVisit.toLocaleString()}/visit ≥ Weekend ฿${avgWeekendPerVisit.toLocaleString()}/visit — Weekday มีประสิทธิภาพสูง (More procedures + Elective cases)`
                                : `Weekday ฿${avgWeekdayPerVisit.toLocaleString()}/visit < Weekend ฿${avgWeekendPerVisit.toLocaleString()}/visit — Weekend revenue ต่อ visit สูงกว่า (ER cases + Higher acuity)`,
                            recommend: '📋 Optimization: (1) เพิ่ม Procedure ช่วง Weekday (2) Balance เปิดห้องผ่าตัดเท่าๆ กัน (3) Staff scheduling optimization (4) Elective scheduling ให้เต็ม capacity',
                        },
                        {
                            icon: '🏆', label: 'Top Doctor Output',
                            value: topDoc ? `฿${topDoc.revenue.toLocaleString()}` : '-',
                            sub: topDoc ? `${topDoc.name} · ${topDoc.visits} visits` : 'N/A',
                            desc: 'แพทย์ที่สร้างรายได้สูงสุด (90 วัน)',
                            color: '#7c3aed',
                            problem: topDoc
                                ? `${topDoc.name} สร้างรายได้ ฿${topDoc.revenue.toLocaleString()} จาก ${topDoc.visits} visits (฿${topDoc.avg_per_visit.toLocaleString()}/visit) — Best practice model`
                                : 'ไม่มีข้อมูล',
                            recommend: '📋 Benchmark: (1) ศึกษา Best practice จาก Top performer (2) Share workflow + Clinical pathway (3) เพิ่ม Procedure-based clinic (4) Team-based care model (5) Performance dashboard per doctor',
                        },
                        {
                            icon: '🎯', label: 'FHI Score',
                            value: `${fhi}/100`,
                            sub: fhi >= 80 ? '🟢 สุขภาพดี' : fhi >= 60 ? '🟡 ปานกลาง' : '🔴 วิกฤต',
                            desc: 'Financial Health Index — ดัชนีสุขภาพการเงินรวม',
                            color: fhi >= 80 ? '#10b981' : fhi >= 60 ? '#f59e0b' : '#f43f5e',
                            problem: fhi >= 80
                                ? `✅ FHI ${fhi}/100 — ดีเยี่ยม สุขภาพการเงินมั่นคง ระบบทำงานมีประสิทธิภาพ`
                                : fhi >= 60
                                    ? `FHI ${fhi}/100 — ปานกลาง มีจุดที่ต้องปรับปรุง ดู Root-Cause Analysis ด้านล่าง`
                                    : `🚨 FHI ${fhi}/100 — วิกฤต! ต้องแก้ปัญหาเร่งด่วน Collection + Claims + Revenue ลดลง`,
                            recommend: fhi >= 80
                                ? '✅ Maintain excellence — Continuous improvement + Innovation'
                                : '📋 เพิ่ม FHI: (1) แก้ปัญหาด่วนที่ 1 ใน Root-Cause (2) Collection Rate ≥85% (3) Claims ≥90% (4) Revenue diversification (5) Cost optimization',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* FHI Gauge + Component + KPIs */}
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                {/* FHI Gauge */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={fhiColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={fhiColor} fontFamily="'Outfit',sans-serif">{fhi}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">FHI Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: fhiColor }}>{fhiGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: fhiColor }}>
                                            {fhi >= 80 ? 'สุขภาพการเงินดี' : fhi >= 60 ? 'อยู่ในเกณฑ์' : 'ต้องปรับปรุง'}
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>Financial Health Index</div>
                                    </div>

                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>FHI Components</p>
                                        {fhiRadar.map((c, i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                    <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '62px', textAlign: 'right', flexShrink: 0 }}>{c.name}</span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 800, color: barColor, width: '24px', textAlign: 'right' }}>{c.score}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tiered KPI Cards with Problem + Recommend */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { title: 'Revenue Efficiency', color: '#10b981', cards: tier1Cards },
                                        { title: 'Revenue per Service', color: '#0ea5e9', cards: tier2Cards },
                                        { title: 'Financial Risk & Efficiency', color: '#f59e0b', cards: tier3Cards },
                                        { title: 'Revenue Quality & Growth', color: '#8b5cf6', cards: tier4Cards },
                                        { title: 'DRG & Cost Optimization', color: '#06b6d4', cards: tier5Cards },
                                        { title: 'Financial Risk Intelligence', color: '#f43f5e', cards: tier6Cards },
                                        { title: 'Provider Productivity', color: '#7c3aed', cards: tier7Cards },
                                        { title: 'Strategic Finance', color: '#059669', cards: tier8Cards },
                                    ].map((tier, ti) => (
                                        <div key={ti}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '6px', borderBottom: `1.5px solid ${tier.color}15` }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '6px', background: `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)`, color: '#fff', fontSize: '10px', fontWeight: 900, flexShrink: 0, boxShadow: `0 2px 8px ${tier.color}30` }}>{ti + 1}</span>
                                                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tier.title}</span>
                                                <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 600, marginLeft: 'auto' }}>{tier.cards.length} KPIs</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                {tier.cards.map((k, i) => (
                                                    <div key={i} style={{
                                                        padding: '10px 12px', borderRadius: '12px',
                                                        background: `linear-gradient(135deg, ${k.color}05, ${k.color}02)`,
                                                        border: `1px solid ${k.color}18`,
                                                        borderLeft: `3px solid ${k.color}`,
                                                        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                                                        cursor: 'default',
                                                    }}
                                                        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 20px ${k.color}15`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: 'var(--fs-xl)', flexShrink: 0 }}>{k.icon}</span>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
                                                                <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.desc}</p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color }}>{k.value}</p>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                                            </div>
                                                        </div>
                                                        {k.problem && (
                                                            <div style={{ marginTop: '6px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-2xs)', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>📊 วิเคราะห์สถานการณ์</p>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.problem}</p>
                                                            </div>
                                                        )}
                                                        {k.recommend && (
                                                            <div style={{ marginTop: '4px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-2xs)', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>💡 แนะนำเชิงนโยบาย</p>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.recommend}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ━━━ Chart Row 1: Revenue Trend (full width) ━━━ */}
                            <div style={{ borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                    <div style={{ width: '3px', height: '16px', background: '#7c3aed', borderRadius: '99px' }} />
                                    <p style={{ margin: 0, fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        📈 Revenue Trend (12 เดือน)
                                    </p>
                                    <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>Revenue + MoM Growth %</span>
                                </div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <ComposedChart data={a.revenue_trend || []} margin={{ top: 4, right: 12, bottom: 0, left: 4 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                        <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={36}
                                            tickFormatter={v => `${(v / 1e6).toFixed(0)}M`} />
                                        <YAxis yAxisId="right" orientation="right" tick={{ fill: '#f59e0b', fontSize: 9 }} axisLine={false} tickLine={false} width={32}
                                            tickFormatter={v => `${v}%`} />
                                        <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                            formatter={(v, n) => {
                                                if (n === 'revenue') return [`฿${(v / 1e6).toFixed(1)}M`, 'Revenue'];
                                                if (n === 'growth') return [`${v}%`, 'MoM Growth'];
                                                return [v, n];
                                            }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
                                        <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#7c3aed" fill="rgba(124,58,237,.08)" strokeWidth={2.5} name="Revenue" />
                                        <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }} name="Growth %" />
                                        <ReferenceLine yAxisId="right" y={0} stroke="rgba(203,213,225,.5)" strokeDasharray="4 4" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                            {/* ━━━ Chart Row 2: Payer Mix + Revenue by Ward (side by side) ━━━ */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                {/* Payer Mix */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                        <div style={{ width: '3px', height: '16px', background: '#f43f5e', borderRadius: '99px' }} />
                                        <p style={{ margin: 0, fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            🎯 Payer Mix (90 วัน)
                                        </p>
                                        <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>{(a.payer_mix || []).length} สิทธิ์</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {(a.payer_mix || []).slice(0, 10).map((p, i) => {
                                            const barColor = COLORS[i % COLORS.length];
                                            return (
                                                <div key={i} style={{ padding: '6px 10px', borderRadius: '8px', background: `${barColor}04`, borderLeft: `3px solid ${barColor}` }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', background: barColor, color: '#fff', fontSize: '9px', fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>
                                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-secondary)', flex: 1 }}>{p.payer}</span>
                                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 800, color: barColor, padding: '1px 6px', background: `${barColor}12`, borderRadius: '999px', flexShrink: 0 }}>{p.pct}%</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ flex: 1, height: '8px', background: 'rgba(203,213,225,.12)', borderRadius: '99px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${p.pct}%`, height: '100%', background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                        </div>
                                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', flexShrink: 0 }}>฿{p.revenue.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Revenue by Ward */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                        <div style={{ width: '3px', height: '16px', background: '#10b981', borderRadius: '99px' }} />
                                        <p style={{ margin: 0, fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                            🏥 Revenue by Ward (90 วัน)
                                        </p>
                                        <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>{(a.revenue_by_dept || []).length} wards</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {(a.revenue_by_dept || []).slice(0, 10).map((d, i) => {
                                            const maxRev = Math.max(...(a.revenue_by_dept || []).map(x => x.revenue || 1));
                                            const pct = Math.round((d.revenue / maxRev) * 100);
                                            const barColor = i < 3 ? '#10b981' : i < 6 ? '#0ea5e9' : '#94a3b8';
                                            return (
                                                <div key={i} style={{ padding: '6px 10px', borderRadius: '8px', background: `${barColor}04`, borderLeft: `3px solid ${barColor}` }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', background: barColor, color: '#fff', fontSize: '9px', fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>
                                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-secondary)', flex: 1 }}>{d.dept}</span>
                                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: barColor, padding: '1px 6px', background: `${barColor}12`, borderRadius: '999px', flexShrink: 0 }}>{d.cases} cases</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ flex: 1, height: '8px', background: 'rgba(203,213,225,.12)', borderRadius: '99px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                        </div>
                                                        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', flexShrink: 0 }}>฿{d.revenue.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>


                        </div>
                    );
                })()}
            </div>






            <div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--md-text-primary)' }}>👤 AI Patient Propensity to Pay</h3>
                    <span style={{ fontSize: 'var(--fs-2xs)', padding: '2px 8px', background: 'rgba(245,158,11,.08)', color: '#f59e0b', borderRadius: '999px', fontWeight: 700 }}>
                        {paymentPropensity?.high_risk_count || 0} critical cases
                    </span>
                </div>
                <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                    <table className="data-table" style={{ fontSize: 'var(--fs-xs)' }}>
                        <thead><tr><th>AN</th><th>ผู้ป่วย</th><th>สิทธิ</th><th>ยอด</th><th>ความเสี่ยง</th><th>ปัจจัย</th></tr></thead>
                        <tbody>
                            {(paymentPropensity?.risks || []).length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>ไม่พบความเสี่ยงสูง</td></tr>
                            ) : (paymentPropensity?.risks || []).map((p, i) => (
                                <tr key={i}>
                                    <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0ea5e9' }}>{p.an}</td>
                                    <td>{p.name}</td>
                                    <td><span style={{ fontSize: 'var(--fs-2xs)', padding: '1px 6px', background: 'rgba(203,213,225,.08)', borderRadius: '4px', fontWeight: 600 }}>{p.pttype_name}</span></td>
                                    <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>฿{Number(p.income).toLocaleString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ flex: 1, height: '5px', background: 'rgba(203,213,225,.15)', borderRadius: '99px', overflow: 'hidden' }}>
                                                <div style={{ width: `${p.risk_score}%`, height: '100%', background: p.severity === 'critical' ? '#f43f5e' : p.severity === 'high' ? '#f59e0b' : '#eab308', borderRadius: '99px' }} />
                                            </div>
                                            <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 800, color: p.severity === 'critical' ? '#f43f5e' : p.severity === 'high' ? '#f59e0b' : '#eab308' }}>{p.risk_score}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {p.factors.map((f, fi) => {
                                                const isCrit = p.severity === 'critical' || p.severity === 'high';
                                                return (
                                                    <span key={fi} className={isCrit ? 'factor-alert-pulse' : ''} style={{
                                                        fontSize: 'var(--fs-2xs)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700,
                                                        background: isCrit ? 'rgba(244,63,94,.12)' : 'rgba(234,179,8,.08)',
                                                        border: isCrit ? '1.5px solid rgba(244,63,94,.35)' : '1px solid rgba(234,179,8,.25)',
                                                        color: isCrit ? '#f43f5e' : '#b45309',
                                                        boxShadow: isCrit ? '0 0 8px rgba(244,63,94,.15)' : 'none',
                                                    }}>⚠ {f}</span>
                                                );
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — Finance ━━━━━━ */}
            {
                !loading.financeAnalytics && finAnalytics && (() => {
                    const a = finAnalytics || {};
                    const fhi = a.fhi ?? 0;
                    const collectionRate = a.collection_rate ?? 0;
                    const claimSuccess = a.claim_success_rate ?? 0;
                    const revPerBed = a.rev_per_bed_day ?? 0;
                    const underCollected = a.under_collected_cases ?? 0;
                    const totalCharged = a.total_charged_90d ?? 0;
                    const totalPaid = a.total_paid_90d ?? 0;
                    const avgOpdRev = a.avg_opd_revenue ?? 0;
                    const avgIpdCharge = a.avg_ipd_charge ?? 0;
                    const avgIpdGap = a.avg_ipd_gap ?? 0;
                    const claimsGap = a.total_claims_gap ?? 0;

                    const problems = [];

                    if (collectionRate < 85) {
                        problems.push({
                            priority: 1, severity: collectionRate < 70 ? 'critical' : 'warning',
                            title: `🔴 Collection Rate ต่ำ: ${collectionRate}% — Revenue Leakage ฿${((totalCharged - totalPaid) / 1e6).toFixed(1)}M`,
                            rootCause: `เก็บเงินได้ ${collectionRate}% ของที่เรียกเก็บ (Gap ฿${((totalCharged - totalPaid) / 1e6).toFixed(1)}M / 90 วัน) ── สาเหตุ: (1) Claim rejection จากสิทธิ์บัตรทอง/ประกันสังคม — เอกสารไม่ครบ, DRG coding ผิด (2) Bad debt — ผู้ป่วยค้างชำระ >90 วัน (3) Under-billing — ทำหัตถการแล้วไม่ charge (4) Late claim submission — ส่งเกินกำหนด (5) Payer contract unfavorable — Rate ต่ำกว่าต้นทุน`,
                            cascadeEffect: `Collection ต่ำ → Cash flow ลดลง → ไม่สามารถจ่ายค่ายา/วัสดุทันเวลา → ถูก Supplier ตัดเครดิต → ต้นทุนเพิ่ม (ซื้อราคาปกติ) → กำไรลดลงซ้ำ ● ไม่มีงบลงทุนอุปกรณ์ใหม่ → Service quality ลดลง → ผู้ป่วยลดลง ● FHI ลดลง (${fhi}/100)`,
                            fixFirst: `🔧 ด่วนที่สุด: (1) Audit rejected claims ทุกสัปดาห์ — แยกสาเหตุ + แก้ไขระบบ (2) Bad debt follow-up team ทุก case >90 วัน (3) Pre-authorization ทุก High-cost case (4) Claim submission ภายใน 15 วัน (5) เป้าหมาย: Collection ≥85% ภายใน 90 วัน`,
                            color: collectionRate < 70 ? '#f43f5e' : '#f59e0b',
                        });
                    }

                    if (claimSuccess < 90) {
                        problems.push({
                            priority: 2, severity: claimSuccess < 75 ? 'critical' : 'warning',
                            title: `🟡 Claims Success ต่ำ: ${claimSuccess}% — Gap ฿${(claimsGap / 1000).toFixed(0)}K`,
                            rootCause: `Claims สำเร็จ ${claimSuccess}% (Gap ฿${(claimsGap / 1000).toFixed(0)}K) ── สาเหตุ: (1) DRG Under-coding — ไม่ record Comorbidity/Complication ทำให้ RW ต่ำ (2) เอกสารไม่ครบ — ใบ Refer, สำเนาสิทธิ์ (3) ส่ง Claim ล่าช้า >30 วัน (4) Coding error — ICD-10/ICD-9-CM ไม่ตรงกับ Medical record (5) Authorization expired`,
                            cascadeEffect: `Claims fail → Revenue loss ฿${(claimsGap / 1000).toFixed(0)}K → ต้อง Re-submit (เพิ่มงาน) → บาง case หมดอายุ claim → กลายเป็น Bad debt ● Under-coding ซ้ำ → adjRW ต่ำ → Revenue per case ลดลงถาวร`,
                            fixFirst: `🔧 เพิ่ม Claims: (1) DRG Coding audit ทุก case ก่อนส่ง Claim (2) อบรม Coder เรื่อง Comorbidity + CC coding (3) Pre-submission checklist (4) Denial management team ติดตามทุก rejection (5) เป้าหมาย: ≥90%`,
                            color: claimSuccess < 75 ? '#f43f5e' : '#f59e0b',
                        });
                    }

                    if (revPerBed < 1500) {
                        problems.push({
                            priority: 3, severity: revPerBed < 800 ? 'critical' : 'warning',
                            title: `🟠 Rev/Bed-Day ต่ำ: ฿${revPerBed.toLocaleString()} — เตียงสร้างรายได้น้อย`,
                            rootCause: `Rev/Bed-Day ฿${revPerBed.toLocaleString()} (ควร ≥฿3,000) ── สาเหตุ: (1) LOS ยาวเกินจำเป็น — Social admission, Delayed discharge (2) Missing charges — ทำหัตถการไม่ charge (3) Case mix เบา — ส่วนใหญ่เป็น Observation ไม่มี Procedure (4) Under-coding DRG → RW ต่ำ → Reimbursement ต่ำ`,
                            cascadeEffect: `Rev/Bed-Day ต่ำ → Revenue per year ลดลง (ทุก 1 เตียง × 365 วัน) → ไม่คุ้มค่า Fixed cost (เจ้าหน้าที่, ค่าไฟ, อุปกรณ์) → ขาดทุนจาก IPD ● เตียงถูกใช้โดย Low-revenue cases → Opportunity cost สูง`,
                            fixFirst: `🔧 เพิ่ม Rev/Bed-Day: (1) Discharge planning ตั้งแต่วัน admit (2) Audit charge ทุก ward ทุกสัปดาห์ (3) DRG coding review ทุก case (4) ลด Social admission ด้วย Community referral (5) เพิ่ม Procedure-based revenue`,
                            color: revPerBed < 800 ? '#f43f5e' : '#f59e0b',
                        });
                    }

                    if (underCollected >= 5) {
                        problems.push({
                            priority: 4, severity: underCollected >= 15 ? 'critical' : 'warning',
                            title: `🟠 Under-collected Cases: ${underCollected} — เก็บเงินได้ <50% ของ Charge`,
                            rootCause: `${underCollected} cases เก็บเงินได้ไม่ถึงครึ่ง ── สาเหตุ: (1) Uninsured patients — ไม่มีสิทธิ์ (2) Claim rejection — ยังไม่ได้ Re-submit (3) Incomplete billing — charge ไม่ครบ (4) Patient default — หนีค่ารักษา (5) สิทธิ์หมดอายุ/ไม่ตรง`,
                            cascadeEffect: `Under-collected → กลายเป็น Bad debt → Write-off → สูญเสียรายได้ถาวร ● เพิ่มภาระงาน Follow-up team ● ส่งผลต่อ Cash flow + Collection Rate`,
                            fixFirst: `🔧 ลด Under-collected: (1) Case-by-case review ทุก under-collected (2) Re-submit rejected claims ทันที (3) Financial counselor ติดต่อผู้ป่วย (4) Payment plan สำหรับ Uninsured (5) Legal action สำหรับ Default >180 วัน`,
                            color: underCollected >= 15 ? '#f43f5e' : '#f59e0b',
                        });
                    }

                    if (avgIpdGap > 5000) {
                        problems.push({
                            priority: 5, severity: 'warning',
                            title: `🟡 IPD Charge-Paid Gap สูง: ฿${avgIpdGap.toLocaleString()} / case — Revenue leakage per admission`,
                            rootCause: `IPD Charge ฿${avgIpdCharge.toLocaleString()} แต่ Paid เพียง ฿${(avgIpdCharge - avgIpdGap).toLocaleString()} (Gap ฿${avgIpdGap.toLocaleString()}/case) ── สาเหตุ: (1) DRG reimbursement ต่ำกว่า actual cost (2) สิทธิ์ UC rate ต่ำ (3) Clinical pathway ไม่ cost-effective (4) Unnecessary investigation/test`,
                            cascadeEffect: `IPD Gap สูง × จำนวน admission = Revenue loss มหาศาล → IPD กลายเป็น Cost center → ต้อง Cross-subsidize จาก OPD`,
                            fixFirst: `🔧 ลด Gap: (1) Clinical pathway ลด Unnecessary stay + Investigation (2) Negotiate payer contracts ใหม่ (3) DRG Grouper optimization (4) Pre-authorization ทุก High-cost procedure`,
                            color: '#f59e0b',
                        });
                    }

                    // NEW: High LOS detection
                    const losVal = a.avg_los ?? 0;
                    if (losVal > 5) {
                        problems.push({
                            priority: 6, severity: losVal > 8 ? 'critical' : 'warning',
                            title: `🟠 LOS สูง: ${losVal} วัน — ${a.long_los_cases ?? 0} cases นอน >7 วัน`,
                            rootCause: `LOS เฉลี่ย ${losVal} วัน (SD ${a.sd_los ?? 0}, Range ${a.min_los ?? 0}-${a.max_los ?? 0}) ── สาเหตุ: (1) Delayed discharge — รอผล Lab/ใบ Refer (2) Social admission — ไม่มี Caregiver ที่บ้าน (3) Complication ระหว่าง Admit (4) Unnecessary observation (5) ไม่มี Step-down care`,
                            cascadeEffect: `LOS สูง → ต้นทุนต่อ case สูง → Rev/Bed-Day ลดลง → Bed ไม่ว่าง → Elective case admit ไม่ได้ → Revenue opportunity loss ● ผู้ป่วยเสี่ยง Hospital-acquired infection`,
                            fixFirst: `🔧 ลด LOS: (1) Discharge planning ตั้งแต่ Day 1 (2) Multidisciplinary round ทุกเช้า (3) DC before noon target ≥50% (4) Social worker เข้าดู Long-stay ทุก case (5) Community referral / Home care`,
                            color: losVal > 8 ? '#f43f5e' : '#f59e0b',
                        });
                    }

                    // NEW: High Days in A/R detection
                    const arDays = a.days_in_ar ?? 0;
                    if (arDays > 45) {
                        problems.push({
                            priority: 7, severity: arDays > 90 ? 'critical' : 'warning',
                            title: `🟡 Days in A/R สูง: ${arDays} วัน — Cash Cycle ยาว`,
                            rootCause: `Outstanding / Daily Revenue = ${arDays} วัน ── สาเหตุ: (1) Claim submission ล่าช้า (2) Pending approval จากสิทธิ์ (3) Bad debt สะสม (4) Billing ไม่ครบ (5) ขาดระบบ Follow-up อัตโนมัติ`,
                            cascadeEffect: `A/R สูง → Cash flow ตึง → ต้องกู้ยืมระยะสั้น → ดอกเบี้ยเพิ่ม → กำไรลดลง ● ไม่มีเงินจ่ายค่ายา/เงินเดือนตรงเวลา`,
                            fixFirst: `🔧 ลด Days A/R: (1) เร่ง Claim ภายใน 15 วัน (2) Aging report review ทุกสัปดาห์ (3) Auto-billing + Auto-follow-up system (4) Copay collection ณ จุดบริการ (5) เป้าหมาย: ≤30 วัน`,
                            color: arDays > 90 ? '#f43f5e' : '#f59e0b',
                        });
                    }

                    if (problems.length === 0) {
                        problems.push({
                            priority: 0, severity: 'good',
                            title: '✅ สุขภาพการเงินดี — ไม่พบปัญหาเร่งด่วน',
                            rootCause: `FHI ${fhi}/100 · Collection ${collectionRate}% · Claims ${claimSuccess}% · Rev/Bed ฿${revPerBed.toLocaleString()} — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
                            cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — ระบบการเงิน รพ. ทำงานได้มาตรฐาน`,
                            fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ FHI ≥ ${Math.min(fhi + 10, 100)} (2) เพิ่ม Revenue diversification (3) ลด Cost per case`,
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
                                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>Cross-analysis Finance & RCM</span>
                            </div>
                            <div className={`glass-card ${urgencyScore >= 7 ? 'alert-critical' : urgencyScore >= 4 ? 'alert-warning' : ''}`} style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '14px', background: `linear-gradient(135deg, ${urgencyColor}08, ${urgencyColor}03)`, border: `1px solid ${urgencyColor}20`, marginBottom: '1.25rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: urgencyColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ระดับความเร่งด่วนรวม — การเงิน & RCM</span>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: urgencyColor, background: `${urgencyColor}15`, padding: '2px 8px', borderRadius: '999px', border: `1px solid ${urgencyColor}25` }}>{urgencyLabel}</span>
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
                                            <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 600 }}>ปกติ</span>
                                            <span style={{ fontSize: '9px', color: '#f59e0b', fontWeight: 600 }}>เตือน</span>
                                            <span style={{ fontSize: '9px', color: '#f43f5e', fontWeight: 600 }}>วิกฤต</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="urgency-score-pulse" style={{ fontSize: '36px', fontWeight: 900, color: urgencyColor, lineHeight: 1 }}>{Math.round(urgencyScore)}<span style={{ fontSize: '16px', fontWeight: 700 }}>/10</span></div>
                                        <div style={{ fontSize: '10px', fontWeight: 700, color: urgencyColor, marginTop: '2px' }}>Urgency</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {problems.map((p, i) => (
                                        <div key={i} style={{ borderRadius: '14px', border: `1.5px solid ${p.color}20`, background: `${p.color}04`, overflow: 'hidden' }}>
                                            <div style={{ padding: '10px 16px', background: `linear-gradient(90deg, ${p.color}12, transparent)`, borderBottom: `1px solid ${p.color}15`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {p.priority > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>{p.priority}</span>}
                                                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)', lineHeight: 1.4 }}>{p.title}</span>
                                                <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: '999px', background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}>
                                                    {p.severity === 'critical' ? '🔴 CRITICAL' : p.severity === 'warning' ? '🟡 WARNING' : '🟢 GOOD'}
                                                </span>
                                            </div>
                                            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔍 ปัญหาที่แท้จริง (Root Cause)</p>
                                                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.rootCause}</p>
                                                </div>
                                                <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ผลกระทบลูกโซ่ (Cascade Effect)</p>
                                                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.cascadeEffect}</p>
                                                </div>
                                                <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔧 แก้ไขก่อน — ด่วนที่ {p.priority > 0 ? p.priority : '—'} (Fix First)</p>
                                                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.fixFirst}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {problems.length > 1 && problems[0]?.severity !== 'good' && (
                                    <div style={{ marginTop: '16px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(14,165,233,.04)', border: '1px solid rgba(14,165,233,.15)' }}>
                                        <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🗺️ แผนที่ความเชื่อมโยง — Finance Bottleneck Chain</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                            {[
                                                { label: `Collection ${collectionRate}%`, color: '#f59e0b' },
                                                { label: `Claims ${claimSuccess}%`, color: '#f43f5e' },
                                                { label: `Rev/Bed ฿${revPerBed.toLocaleString()}`, color: '#0ea5e9' },
                                                { label: `LOS ${a.avg_los ?? 0}d`, color: '#f97316' },
                                                { label: `CMI ${a.cmi ?? 0}`, color: '#8b5cf6' },
                                                { label: `A/R ${a.days_in_ar ?? 0}d`, color: '#e11d48' },
                                                { label: `FHI = ${fhi}/100`, color: '#10b981' },
                                            ].map((item, i) => (
                                                <React.Fragment key={i}>
                                                    {i > 0 && <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>}
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: item.color, background: `${item.color}10`, padding: '4px 10px', borderRadius: '8px', border: `1px solid ${item.color}20` }}>{item.label}</span>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic' }}>
                                            💡 <strong>สรุป:</strong> ปัญหาการเงินเริ่มจาก <strong style={{ color: '#f59e0b' }}>Collection Rate ต่ำ</strong> → Cash flow ลดลง → ไม่มีงบลงทุน → Service quality ลดลง — <strong>แก้ ด่วนที่ 1 ก่อน</strong> (Audit rejected claims + Bad debt follow-up) จะปรับปรุง KPI ทุกตัวพร้อมกัน
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    );
                })()
            }
        </div >
    );
}
