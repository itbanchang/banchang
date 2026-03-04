// ============================================================
// BCH 360° Intelligence V.10 - Physical Therapy Tab
// 🏋️ Professional PT Analytics + Deep Root-Cause Analysis
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Cell, ComposedChart, Area, Line, PieChart, Pie
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICard from './KPICard.jsx';

export default function PhysTherapyTab() {
    const { state, fetchData } = useDashboard();
    const ptToday = state.ptToday;
    const ptAnalytics = state.ptAnalytics;
    const loading = state.loading;

    useEffect(() => {
        fetchData('ptToday', '/api/physicaltherapy/today');
        fetchData('ptAnalytics', '/api/physicaltherapy/analytics');
        fetchData('ptRevenueFiscal', '/api/physicaltherapy/revenue-fiscal');
    }, [fetchData]);

    const today = ptToday || {};

    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '12px' }}>

                {/* ── ผู้ป่วยวันนี้ (Hero Card) ── */}
                <div style={{
                    gridColumn: 'span 2', padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(14,165,233,.12) 0%, rgba(2,132,199,.06) 100%)',
                    border: '1px solid rgba(14,165,233,.2)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.ptToday ? (
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
                                    <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0ea5e9', margin: 0 }}>
                                        🏋️ กายภาพบำบัดวันนี้
                                    </p>
                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(14,165,233,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        Real-time
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#0ea5e9', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(14,165,233,.3)' }}>
                                        {total}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>ราย</span>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                        background: 'rgba(16,185,129,.1)', color: '#10b981',
                                    }}>
                                        ✅ {completed} เสร็จ ({pct}%)
                                    </span>
                                    {waiting > 0 && (
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                            background: 'rgba(245,158,11,.1)', color: '#f59e0b',
                                        }}>
                                            ⏳ {waiting} รอ
                                        </span>
                                    )}
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                                        ♂️{today.male || 0} ♀️{today.female || 0}
                                    </span>
                                </div>

                                {/* Completion bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>✅ เสร็จสิ้น {completed} ({pct}%)</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#f59e0b' }}>รอรับบริการ {waiting}</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(245,158,11,.12)', display: 'flex' }}>
                                        <div style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
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
                        title: 'รอเฉลี่ย', value: `${today.avg_wait_time || 0} min`, icon: '⏱️', unit: '',
                        grad: (today.avg_wait_time ?? 0) > 30 ? ['#f43f5e', '#dc2626'] : (today.avg_wait_time ?? 0) > 15 ? ['#f59e0b', '#d97706'] : ['#10b981', '#059669'],
                        glow: 'rgba(14,165,233,.2)',
                        loading: loading.ptToday,
                    },
                    {
                        title: 'รอรับบริการ', value: today.waiting ?? 0, icon: '⏳', unit: 'ราย',
                        grad: (today.waiting ?? 0) > 10 ? ['#f43f5e', '#dc2626'] : ['#f59e0b', '#d97706'],
                        glow: 'rgba(245,158,11,.2)',
                        loading: loading.ptToday,
                    },
                    {
                        title: 'ชาย/หญิง', value: `${today.male || 0}/${today.female || 0}`, icon: '👤', unit: '',
                        grad: ['#8b5cf6', '#7c3aed'], glow: 'rgba(139,92,246,.2)',
                        loading: loading.ptToday,
                    },
                    {
                        title: 'ผู้สูงอายุ', value: today.elderly ?? 0, icon: '👴', unit: 'ราย',
                        grad: (today.elderly ?? 0) > 10 ? ['#f59e0b', '#d97706'] : ['#0ea5e9', '#0284c7'],
                        glow: 'rgba(14,165,233,.2)',
                        loading: loading.ptToday,
                    },
                ].map((kpi, i) => (
                    <div key={`pt-kpi-${i}`} style={{
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
                                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>
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

            {/* ━━━━━ PPI + Advanced Physical Therapy Analytics Panel ━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #0284c7)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🏋️ Advanced Analytics — Physical Therapy
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(14,165,233,.08)', padding: '2px 8px', borderRadius: '99px' }}>30d · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ptAnalytics ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '56px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = ptAnalytics || {};
                    const ppi = a.ppi ?? 0;
                    const ppiColor = ppi >= 80 ? '#10b981' : ppi >= 60 ? '#f59e0b' : '#f43f5e';
                    const ppiGrade = ppi >= 90 ? 'A+' : ppi >= 80 ? 'A' : ppi >= 70 ? 'B+' : ppi >= 60 ? 'B' : ppi >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(ppi / 100, 1) * circumference;

                    const ppiComp = a.ppi_components || {};
                    const ppiRadar = [
                        { name: 'Wait Time', score: ppiComp.wait_time || 0 },
                        { name: 'Completion', score: ppiComp.completion || 0 },
                        { name: 'Revisit', score: ppiComp.revisit || 0 },
                        { name: 'Revenue', score: ppiComp.revenue || 0 },
                        { name: 'SLA', score: ppiComp.sla || 0 },
                    ];

                    // ━━━ Tier 1: Wait Time & Flow ━━━
                    const tier1Cards = [
                        {
                            icon: '⏱️', label: 'เวลารอเฉลี่ย',
                            value: `${a.avg_wait_time ?? 0} min`,
                            sub: `σ ${a.sd_wait_time ?? 0}min · SLA ≤30min: ${a.wait_sla_pct ?? 0}%`,
                            desc: 'เวลารอก่อนเข้ารับกายภาพบำบัด (30 วัน)',
                            color: (a.avg_wait_time ?? 30) <= 15 ? '#10b981' : (a.avg_wait_time ?? 30) <= 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.avg_wait_time ?? 30) <= 15
                                ? `รอเฉลี่ย ${a.avg_wait_time ?? 0} min — ดีเยี่ยม (≤15min) ผู้ป่วยได้รับบริการรวดเร็ว SLA ${a.wait_sla_pct ?? 0}%`
                                : (a.avg_wait_time ?? 30) <= 30
                                    ? `รอเฉลี่ย ${a.avg_wait_time ?? 0} min (σ ${a.sd_wait_time ?? 0}) — ยังอยู่ในเกณฑ์ แต่ควรลด มี ${a.wait_over_30m ?? 0} ครั้งที่รอ >30min ผู้ป่วย Rehab ต้องการทำกายภาพตามตาราง`
                                    : `🚨 รอเฉลี่ย ${a.avg_wait_time ?? 0} min — สูง! ${a.wait_over_30m ?? 0} ครั้ง >30min ผู้ป่วยอาจ dropout หรือพลาด Session`,
                            recommend: (a.avg_wait_time ?? 30) <= 15
                                ? '✅ คงมาตรฐาน — Appointment system ทำงานดี'
                                : '📋 ลดเวลารอ: (1) Appointment-based scheduling (2) เพิ่ม Unit ช่วง Peak (3) Pre-screening ก่อนถึงคิว (4) SMS แจ้งคิว real-time (5) เป้าหมาย: ≤15 min',
                        },
                        {
                            icon: '🕐', label: 'เวลารวม (Visit)',
                            value: `${a.avg_total_time ?? 0} min`,
                            sub: `σ ${a.sd_total_time ?? 0}min · Total SLA ≤60min: ${a.total_sla_pct ?? 0}%`,
                            desc: 'เวลาเฉลี่ยทั้งกระบวนการ ลงทะเบียน→ทำกายภาพ→ชำระเงิน',
                            color: (a.avg_total_time ?? 60) <= 45 ? '#10b981' : (a.avg_total_time ?? 60) <= 60 ? '#f59e0b' : '#f43f5e',
                            problem: `เวลารวม ${a.avg_total_time ?? 0} min (σ ${a.sd_total_time ?? 0}) — ${(a.avg_total_time ?? 60) <= 45 ? 'ดี Flow ลื่นไหล' : (a.avg_total_time ?? 60) <= 60 ? 'ปานกลาง ควรลด bottleneck' : '⚠️ สูง! ผู้ป่วยใช้เวลาทั้งหมดนานเกินไป ตรวจสอบ bottleneck'}`,
                            recommend: '📋 ลดเวลารวม: (1) Pre-register online (2) Digital payment ลดรอชำระเงิน (3) Chair-side billing (4) Lean flow: ลด Non-value steps',
                        },
                        {
                            icon: '📊', label: 'Avg Daily Visits',
                            value: `${a.avg_daily_visits ?? 0}`,
                            sub: `${(a.total_visits ?? 0).toLocaleString()} ราย / 30 วัน · ${a.unique_patients ?? 0} patients`,
                            desc: 'จำนวนผู้ป่วยเฉลี่ยต่อวัน',
                            color: '#0ea5e9',
                            problem: `เฉลี่ย ${a.avg_daily_visits ?? 0} ราย/วัน (รวม ${(a.total_visits ?? 0).toLocaleString()} ราย) · Unique patients ${a.unique_patients ?? 0} — ${(a.avg_daily_visits ?? 0) > 50 ? '⚠️ Volume สูง ตรวจสอบ Capacity' : 'Volume ปกติ'}`,
                            recommend: '📋 Capacity: (1) วิเคราะห์ห้อง/อุปกรณ์ utilization rate (2) เพิ่ม Physio ถ้า Utilization >85% (3) Extended hours สำหรับ Peak days',
                        },
                        {
                            icon: '⏰', label: 'Wait >30 min',
                            value: `${a.wait_over_30m ?? 0}`,
                            sub: `จาก 30 วัน`,
                            desc: 'จำนวนครั้งที่รอนานเกิน 30 นาที',
                            color: (a.wait_over_30m ?? 0) < 10 ? '#10b981' : (a.wait_over_30m ?? 0) < 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.wait_over_30m ?? 0) < 10
                                ? `Wait >30min เพียง ${a.wait_over_30m ?? 0} ครั้ง — Flow ดี ไม่มีปัญหาคอขวด`
                                : `Wait >30min ${a.wait_over_30m ?? 0} ครั้ง — ${(a.wait_over_30m ?? 0) >= 30 ? '🚨 บ่อยเกินไป! ผู้ป่วยรอนานเป็นประจำ' : 'ต้องเฝ้าระวัง อาจเกิดช่วง Peak'}`,
                            recommend: (a.wait_over_30m ?? 0) < 10
                                ? '✅ ดี — RCA ทุกครั้งที่เกิด wait >30min'
                                : '📋 ลด Long wait: (1) Buffer time ระหว่าง appointment (2) เพิ่ม Physio ช่วง Peak (3) Parallel processing: เตรียมอุปกรณ์/เตียงล่วงหน้า',
                        },
                    ];

                    // ━━━ Tier 2: Quality ━━━
                    const tier2Cards = [
                        {
                            icon: '✅', label: 'Completion Rate',
                            value: `${a.completion_rate ?? 0}%`,
                            sub: `Dropout ${a.dropout_count ?? 0} ราย`,
                            desc: '% ผู้ป่วยที่รักษาเสร็จสิ้น',
                            color: (a.completion_rate ?? 0) >= 95 ? '#10b981' : (a.completion_rate ?? 0) >= 85 ? '#f59e0b' : '#f43f5e',
                            problem: (a.completion_rate ?? 0) >= 95
                                ? `Completion ${a.completion_rate ?? 0}% — ดีเยี่ยม Dropout เพียง ${a.dropout_count ?? 0} ราย`
                                : `Completion ${a.completion_rate ?? 0}% — Dropout ${a.dropout_count ?? 0} ราย ${(a.completion_rate ?? 0) < 85 ? '⚠️ สูง! ตรวจสอบสาเหตุ: รอนาน? กลัว? ค่าใช้จ่าย?' : 'ควรสอบถามสาเหตุ'}`,
                            recommend: '📋 ลด Dropout: (1) SMS เตือนก่อนนัด 1 วัน (2) ลด Wait time (3) ให้ข้อมูลค่าใช้จ่ายล่วงหน้า (4) เป้าหมาย: ≥95%',
                        },
                        {
                            icon: '🔄', label: 'Revisit 7 วัน',
                            value: `${a.revisit_rate ?? 0}%`,
                            sub: `${a.revisit_count ?? 0} ราย กลับมาภายใน 7 วัน`,
                            desc: '% ผู้ป่วยที่กลับมาอีกในสัปดาห์เดียวกัน',
                            color: (a.revisit_rate ?? 0) < 5 ? '#10b981' : (a.revisit_rate ?? 0) < 15 ? '#f59e0b' : '#f43f5e',
                            problem: (a.revisit_rate ?? 0) < 5
                                ? `Revisit ${a.revisit_rate ?? 0}% — ต่ำ สะท้อน Treatment quality ดี`
                                : `Revisit ${a.revisit_rate ?? 0}% (${a.revisit_count ?? 0} ราย) — ${(a.revisit_rate ?? 0) >= 15 ? '⚠️ สูง! อาจมี Complication หรือ Treatment plan ต้องหลาย visit' : 'ปานกลาง อาจเป็น Planned multi-visit cases'}`,
                            recommend: '📋 Review: (1) แยก Planned revisit vs Unplanned (2) Audit unplanned — Complication? Undertreated? (3) Treatment plan ที่ดียิ่งขึ้น',
                        },
                    ];

                    // ━━━ Tier 3: Financial ━━━
                    const tier3Cards = [
                        {
                            icon: '💰', label: 'รายได้ / Visit',
                            value: `฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()}`,
                            sub: `Max ฿${(a.max_revenue ?? 0).toLocaleString()} · Daily ฿${(a.daily_revenue ?? 0).toLocaleString()}`,
                            desc: 'รายได้เฉลี่ยต่อ 1 visit กายภาพบำบัด',
                            color: '#0ea5e9',
                            problem: `Avg Rev/Visit ฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()} — ${(a.avg_revenue_per_visit ?? 0) < 400 ? '⚠️ ต่ำ อาจมี Under-billing หรือส่วนใหญ่เป็น Basic exercise' : 'สอดคล้องกับ Service mix'}`,
                            recommend: '📋 Optimize: (1) ตรวจสอบ Procedure billing ครบถ้วน (2) เพิ่ม Rehab packages (กายภาพ+อุปกรณ์+ออกกำลังกาย) (3) ลด Free visit %',
                        },
                        {
                            icon: '💵', label: 'รายได้รวม (30d)',
                            value: `฿${((a.total_revenue ?? 0) / 1000).toFixed(0)}k`,
                            sub: `${(a.total_visits ?? 0).toLocaleString()} visits`,
                            desc: 'รายได้รวมกายภาพบำบัด 30 วัน',
                            color: '#10b981',
                            problem: `Revenue ฿${((a.total_revenue ?? 0) / 1000).toFixed(0)}k / 30 วัน จาก ${(a.total_visits ?? 0).toLocaleString()} visits`,
                            recommend: '📋 เพิ่มรายได้: (1) Rehab packages (กายภาพ+Hydro+Equipment) (2) Sports medicine program (3) Referral จาก Ortho/Neuro',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* DPI Gauge + Component Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={ppiColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={ppiColor} fontFamily="'Outfit',sans-serif">{ppi}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">PPI Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: ppiColor }}>{ppiGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: ppiColor }}>
                                            {ppi >= 80 ? 'ประสิทธิภาพสูง' : ppi >= 60 ? 'ระดับมาตรฐาน' : 'ต้องปรับปรุง'}
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>PT Performance Index</div>
                                    </div>
                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>PPI Components</p>
                                        {ppiRadar.map((c, i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '64px', textAlign: 'right', flexShrink: 0 }}>{c.name}</span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, color: barColor, width: '24px', textAlign: 'right' }}>{c.score}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tiered KPI Cards */}
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
                                                                <p style={{ margin: '2px 0 0', fontSize: '10px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.desc}</p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                                <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                                            </div>
                                                        </div>
                                                        {k.problem && (
                                                            <div style={{ marginTop: '6px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>📊 วิเคราะห์สถานการณ์</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.problem}</p>
                                                            </div>
                                                        )}
                                                        {k.recommend && (
                                                            <div style={{ marginTop: '4px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>💡 แนะนำเชิงนโยบาย</p>
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
                                {/* Hourly Pattern */}
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
                                                    <Cell key={i} fill={d.hour === a.peak_hour?.hour ? '#f43f5e' : '#0ea5e9'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Age Distribution */}
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
                                                    const colors = ['#f43f5e', '#f59e0b', '#eab308', '#10b981', '#0ea5e9', '#8b5cf6'];
                                                    return <Cell key={i} fill={colors[i] || '#7c3aed'} />;
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Monthly Trend */}
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
                                            <Bar yAxisId="left" dataKey="visits" fill="rgba(14,165,233,.3)" radius={[4, 4, 0, 0]} barSize={14} />
                                            <Line yAxisId="right" type="monotone" dataKey="total_rev" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Top Diagnoses */}
                            <div style={{ borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🏷️ Top Diagnoses (30 วัน)</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                                    {(a.top_diagnoses || []).slice(0, 8).map((d, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '8px', background: i === 0 ? 'rgba(14,165,233,.06)' : 'transparent' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#0ea5e9', width: '16px', textAlign: 'center' }}>{i + 1}</span>
                                            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', fontFamily: 'JetBrains Mono, monospace', width: '48px', flexShrink: 0 }}>{d.icd10}</span>
                                            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#0ea5e9', flexShrink: 0 }}>{d.count}</span>
                                            <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', flexShrink: 0 }}>฿{d.avg_rev?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — Physical Therapy ━━━━━━ */}
            {!loading.ptAnalytics && ptAnalytics && (() => {
                const a = ptAnalytics || {};
                const ppi = a.ppi ?? 0;
                const avgWait = a.avg_wait_time ?? 0;
                const sdWait = a.sd_wait_time ?? 0;
                const avgTotal = a.avg_total_time ?? 0;
                const waitOver30m = a.wait_over_30m ?? 0;
                const waitSlaPct = a.wait_sla_pct ?? 0;
                const completionRate = a.completion_rate ?? 0;
                const dropoutCount = a.dropout_count ?? 0;
                const revisitRate = a.revisit_rate ?? 0;
                const avgDaily = a.avg_daily_visits ?? 0;
                const totalVisits = a.total_visits ?? 0;
                const avgRevenue = a.avg_revenue_per_visit ?? 0;
                const totalRevenue = a.total_revenue ?? 0;
                const peakHour = a.peak_hour?.label || '—';

                const problems = [];

                if (avgWait > 20) {
                    problems.push({
                        priority: 1, severity: avgWait > 30 ? 'critical' : 'warning',
                        title: `🔴 เวลารอสูง: ${avgWait} min (σ ${sdWait}) — SLA ≤30min ผ่านเพียง ${waitSlaPct}% · ${waitOver30m} ครั้ง >30min`,
                        rootCause: `ผู้ป่วย PT รอเฉลี่ย ${avgWait} นาที (σ ${sdWait}) ── สาเหตุ: (1) Appointment over-booking — นัดเกินกว่าเตียง/อุปกรณ์จะรองรับ (2) Session time ไม่แน่นอน — Exercise/Modality ใช้เวลาต่างกัน (3) Walk-in Refer จาก IPD/OPD ซ้อน slot (4) Peak hour ${peakHour} — ผู้ป่วยกระจุกตัว (5) Physio ไม่เพียงพอช่วง Peak`,
                        cascadeEffect: `Wait สูง → ผู้ป่วย Dropout (ปัจจุบัน ${dropoutCount} ราย) → Rehab outcome ลดลง → พลาด Treatment window → Recovery ช้า ● Wait สูง → ผู้ป่วยทำ PT ไม่ต่อเนื่อง → Functional outcome ลดลง ● PPI ลดลง (${ppi}/100)`,
                        fixFirst: `🔧 ด่วนที่สุด: (1) Appointment-based scheduling — จำกัด Walk-in (2) Buffer time ระหว่าง Session (3) เพิ่ม Physio ช่วง Peak ${peakHour} (4) เตรียมอุปกรณ์/เตียงล่วงหน้า (5) SMS คิว real-time (6) เป้าหมาย: ≤15 min ภายใน 30 วัน`,
                        color: avgWait > 30 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (completionRate < 90) {
                    problems.push({
                        priority: 2, severity: completionRate < 80 ? 'critical' : 'warning',
                        title: `🟡 Completion Rate ต่ำ: ${completionRate}% — Dropout ${dropoutCount} ราย`,
                        rootCause: `${completionRate}% เท่านั้นที่ทำ PT เสร็จ — ${dropoutCount} ราย Dropout ── สาเหตุ: (1) Wait time นาน → ผู้ป่วยเลือกกลับ (2) Session ยาว → ผู้ป่วยเหนื่อย/ไม่มีเวลา (3) ค่าใช้จ่ายสูงกว่าคาด (4) ผู้ป่วยเจ็บ/ไม่สบายระหว่าง Session`,
                        cascadeEffect: `Dropout สูง → Revenue loss ฿${(dropoutCount * avgRevenue).toLocaleString()} → Physio มี idle time → ห้องว่าง ● ผู้ป่วยที่ Dropout → Recovery ล่าช้า → Re-admit หรือ Complication → ต้นทุนรวมสูงขึ้น`,
                        fixFirst: `🔧 ลด Dropout: (1) แจ้ง Wait time estimate ทุกราย (2) Home exercise program ทดแทน (3) Express PT session (20 min) (4) Flexible scheduling — นัดรอบบ่าย/เย็น (5) เป้าหมาย: Completion ≥95%`,
                        color: completionRate < 80 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (revisitRate > 10) {
                    problems.push({
                        priority: 3, severity: revisitRate > 20 ? 'critical' : 'warning',
                        title: `🟡 Revisit 7d สูง: ${revisitRate}% — Treatment Quality Concern`,
                        rootCause: `${revisitRate}% กลับมาภายใน 7 วัน — PT ส่วนใหญ่เป็น Planned revisit (ทำกายภาพต่อเนื่อง) ต้องแยก Planned vs Unplanned (เจ็บหลังทำ, อาการแย่ลง)`,
                        cascadeEffect: `Unplanned revisit → เพิ่ม Workload Physio → Wait time เพิ่ม → Session ล่าช้า ● อาการแย่ลง → ต้อง Re-evaluate → เสียเวลาทั้ง Physio และผู้ป่วย`,
                        fixFirst: `🔧 ลด Unplanned Revisit: (1) Audit ทุก 7d revisit — แยก Planned PT vs Pain/Complication (2) Graded exercise progression ที่เหมาะสม (3) Home exercise instruction ชัดเจน (4) Follow-up call หลัง Session`,
                        color: revisitRate > 20 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (avgRevenue < 400 && totalVisits > 50) {
                    problems.push({
                        priority: 4, severity: 'warning',
                        title: `🟠 Revenue/Visit ต่ำ: ฿${avgRevenue.toLocaleString()} — อาจมี Under-billing หรือ Service mix ไม่สมดุล`,
                        rootCause: `Rev/Visit ฿${avgRevenue.toLocaleString()} ← ต่ำสำหรับ PT (ควร ≥฿400) ── สาเหตุ: (1) ส่วนใหญ่เป็น Basic exercise ไม่มี Modality (2) Under-billing — ทำ US/TENS/Laser แล้วไม่ charge (3) สิทธิ์บัตรทอง/ประกันสังคม Rate ต่ำ (4) Missing charges จาก Equipment/Modality`,
                        cascadeEffect: `Low revenue → Budget PT ไม่เพียงพอ → ไม่สามารถซื้ออุปกรณ์ใหม่ → Service quality ลดลง → Referral ลดลง = วงจรลบ`,
                        fixFirst: `🔧 เพิ่ม Revenue: (1) Audit billing ทุก Modality ครบถ้วน (2) Rehab packages: PT+Hydro+Equipment+Home program (3) Sports medicine clinic (4) Verify procedure coding (5) เก็บค่า Modality/อุปกรณ์ครบ`,
                        color: '#f59e0b',
                    });
                }

                if (problems.length === 0) {
                    problems.push({
                        priority: 0, severity: 'good',
                        title: '✅ กายภาพบำบัด ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `PPI ${ppi}/100 · Wait ${avgWait}min · Completion ${completionRate}% · Revisit ${revisitRate}% — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — คลินิก PT ทำงานได้มาตรฐาน`,
                        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ PPI ≥ ${Math.min(ppi + 10, 100)} (2) เพิ่ม Specialized PT programs (3) Outcome measurement`,
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
                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>Cross-analysis PT</span>
                        </div>
                        <div className={`glass-card ${urgencyScore >= 7 ? 'alert-critical' : urgencyScore >= 4 ? 'alert-warning' : ''}`} style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '14px', background: `linear-gradient(135deg, ${urgencyColor}08, ${urgencyColor}03)`, border: `1px solid ${urgencyColor}20`, marginBottom: '1.25rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 800, color: urgencyColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ระดับความเร่งด่วนรวม — กายภาพบำบัด</span>
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
                                    <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🗺️ แผนที่ความเชื่อมโยง — PT Bottleneck Chain</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        {[
                                            { label: `Wait ${avgWait}min`, color: '#f59e0b' },
                                            { label: `Dropout ${dropoutCount}`, color: '#f43f5e' },
                                            { label: `Completion ${completionRate}%`, color: '#0ea5e9' },
                                            { label: `Revisit ${revisitRate}%`, color: '#e11d48' },
                                            { label: `Rev ฿${avgRevenue}`, color: '#8b5cf6' },
                                            { label: `PPI = ${ppi}/100`, color: '#10b981' },
                                        ].map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i > 0 && <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>}
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: item.color, background: `${item.color}10`, padding: '4px 10px', borderRadius: '8px', border: `1px solid ${item.color}20` }}>{item.label}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic' }}>
                                        💡 <strong>สรุป:</strong> ปัญหา PT เริ่มจาก <strong style={{ color: '#f59e0b' }}>Wait time สูง</strong> → ผู้ป่วย Dropout → Rehab outcome ลดลง — <strong>แก้ ด่วนที่ 1 ก่อน</strong> (ลดเวลารอด้วย Appointment system + เพิ่ม Physio) จะปรับปรุง KPI ทุกตัวพร้อมกัน
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}

            {/* ━━━ รายได้โดยประมาณ กายภาพบำบัด — ปีงบประมาณ (3 ปีย้อนหลัง) ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #0284c7)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้โดยประมาณ กายภาพบำบัด — ปีงบประมาณ (3 ปีย้อนหลัง)
                </span>
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(14,165,233,.08)', padding: '2px 8px', borderRadius: '99px' }}>vn_stat · HOSxP XE</span>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ptRevenueFiscal ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />
                        <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (() => {
                    const fd = state.ptRevenueFiscal;
                    const years = fd?.fiscal_years || [];
                    if (years.length === 0) return <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '2rem 0' }}>ไม่พบข้อมูลรายได้</p>;
                    const FY_COLORS = ['#94a3b8', '#38bdf8', '#0ea5e9'];
                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => { row[`fy${fi}`] = (fy.months[i]?.revenue || 0); });
                        return row;
                    });
                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const yoyGrowth = prevYear && prevYear.total_revenue > 0
                        ? Math.round(((latestYear.total_revenue - prevYear.total_revenue) / prevYear.total_revenue) * 1000) / 10 : 0;
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: '10px' }}>
                                {years.map((fy, fi) => {
                                    const isLatest = fi === years.length - 1; const color = FY_COLORS[fi];
                                    return (
                                        <div key={fi} style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: isLatest ? `linear-gradient(135deg, ${color}12, ${color}05)` : `${color}06`, border: `1px solid ${color}${isLatest ? '30' : '15'}` }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                                <span style={{ fontSize: '10px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{fy.fiscal_label}</span>
                                                {isLatest && <span style={{ fontSize: '9px', fontWeight: 700, color: '#0ea5e9', background: 'rgba(14,165,233,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>}
                                            </div>
                                            <p style={{ fontSize: '22px', fontWeight: 900, color, margin: '0 0 2px', letterSpacing: '-0.02em' }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</p>
                                            <p style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 600 }}>
                                                {fy.total_visits.toLocaleString()} visits · {fy.total_patients.toLocaleString()} patients · ฿{fy.avg_revenue_per_visit.toLocaleString()}/visit
                                            </p>
                                            {isLatest && prevYear && (
                                                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>{yoyGrowth >= 0 ? '📈' : '📉'} YoY {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth}%</span>
                                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>vs {prevYear.fiscal_label}</span>
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
        </div>
    );
}
