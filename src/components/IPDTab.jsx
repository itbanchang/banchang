// ============================================================
// BCH 360° Intelligence V.10 - IPD Operations Tab
// 🧠 AI: Bed Demand Forecast + Readmission Risk + LOS Predictor
// ⏱️ Professional Data Analytics KPIs Edition
// ============================================================
import React, { useEffect, useMemo, useCallback, useState } from 'react';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie,
    ComposedChart, Area, Line, ReferenceLine, Legend
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';

function IPDTab() {
    const { state, fetchData, openDrillDown, closeDrillDown } = useDashboard();
    const { bedOccupancy, alosData } = state;
    const bedDemand = state.bedDemand;
    const readmission = state.readmission;
    const losPrediction = state.losPrediction;
    const loading = state.loading;
    const [showReadmitList, setShowReadmitList] = useState(false);
    const [hoverHero, setHoverHero] = useState(false);
    const [hoverKpi, setHoverKpi] = useState(null);
    const [hoverTierCard, setHoverTierCard] = useState(null);

    const ipdAnalytics = state.ipdAnalytics;
    const mrToday = state.medRecToday;
    const today = mrToday || {};

    useEffect(() => {
        // Tier 1: Core operational data — load immediately
        fetchData('bedOccupancy', '/api/ipd/bed-occupancy');
        fetchData('alosData', '/api/ipd/alos');
        fetchData('ipdAnalytics', '/api/ipd/analytics');
        // Tier 2: Supporting data — deferred 400ms
        const t1 = setTimeout(() => {
            fetchData('medRecToday', '/api/medrec/today');
            fetchData('ipdRevenueFiscal', '/api/ipd/revenue-fiscal');
        }, 400);
        // Tier 3: AI modules + new IPD features — deferred 600ms (reduced from 1s)
        const t2 = setTimeout(() => {
            fetchData('bedDemand', '/api/ai/bed-demand');
            fetchData('readmission', '/api/ai/readmission');
            fetchData('losPrediction', '/api/ai/los-predictor');
            fetchData('dischargePlanning', '/api/ipd/discharge-planning');
            fetchData('bedFlow', '/api/ipd/bed-flow');
        }, 600);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [fetchData]);

    const wardChart = useMemo(() => {
        if (!bedOccupancy?.wards) return [];
        return bedOccupancy.wards.filter(w => w.total_beds > 0).map(w => ({
            name: (w.name?.length ?? 0) > 10 ? w.shortname || w.name.substring(0, 10) : (w.name ?? ''),
            occupancy: w.occupancy_rate, occupied: w.occupied, total: w.total_beds
        }));
    }, [bedOccupancy]);

    const demandChart = useMemo(() => {
        if (!bedDemand?.wards) return [];
        return bedDemand.wards.filter(w => w.total_beds > 0).map(w => ({
            name: w.ward,
            now: w.current_rate,
            h24: w.forecast[0]?.occupancy_rate || 0,
            h48: w.forecast[1]?.occupancy_rate || 0,
            h72: w.forecast[2]?.occupancy_rate || 0
        }));
    }, [bedDemand]);

    const bedSummary = bedOccupancy?.summary;

    return (
        <div className="space-y-4 animate-fade-in pb-8">

            {/* AI Bed Demand Alert */}
            {bedDemand?.alert_count > 0 && (
                <div className="glass-card shadow-xl bg-gradient-to-r from-[#fb6340]/10 to-transparent p-4 border-l-4 border-[#fb6340] rounded-2xl">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🧠</span>
                        <div className="flex-1">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Neural Demand Forecast Alert</h3>
                            <p className="text-[11px] text-[#fb6340] font-bold mt-0.5">
                                {bedDemand.alert_count} wards projected to reach critical capacity (90%+) within 24-72 hours.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '12px' }}>

                {/* ── ผู้ป่วยนอนอยู่ (Hero Card) ── */}
                <div
                    onClick={() => openDrillDown('ipd_beds', 'รายละเอียดการครองเตียง (IPD)', '/api/ipd/drilldown?type=beds')}
                    style={{
                        gridColumn: 'span 2', padding: '1.25rem 1.5rem', borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(99,102,241,.12) 0%, rgba(124,58,237,.06) 100%)',
                        border: '1px solid rgba(99,102,241,.2)',
                        backdropFilter: 'blur(12px)',
                        position: 'relative', overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        transform: hoverHero ? 'translateY(-2px)' : 'none',
                        boxShadow: hoverHero ? '0 10px 30px -10px rgba(99,102,241,.3)' : 'none',
                    }}
                    onMouseEnter={() => setHoverHero(true)}
                    onMouseLeave={() => setHoverHero(false)}
                >
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.bedOccupancy ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '120px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (() => {
                        const occ = bedSummary?.occupied ?? 0;
                        const total = bedSummary?.total_beds ?? 0;
                        const rate = bedSummary?.occupancy_rate ?? 0;
                        const avail = total - occ;
                        const occColor = rate > 90 ? '#f43f5e' : rate > 80 ? '#f59e0b' : '#10b981';

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6366f1', margin: 0 }}>
                                        🏥 ผู้ป่วยนอนอยู่ ณ ขณะนี้ <span style={{ fontSize: '11px', opacity: 0.7, textTransform: 'none' }}>(ไม่รวม Home Ward)</span>
                                    </p>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(99,102,241,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                        Real-time
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#6366f1', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(99,102,241,.3)' }}>
                                        {occ.toLocaleString('th-TH')}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>/ {total.toLocaleString('th-TH')} เตียง</span>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                        background: `${occColor}15`, color: occColor,
                                    }}>
                                        {rate}% ครองเตียง
                                    </span>
                                </div>

                                {/* Occupancy bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: occColor }}>🛏️ ครองเตียง {occ} ({rate}%)</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>ว่าง {avail} เตียง</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(16,185,129,.12)', display: 'flex' }}>
                                        <div style={{ width: `${Math.min(100, rate)}%`, background: `linear-gradient(90deg, ${occColor}, ${occColor}cc)`, borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                        <div style={{ flex: 1, background: 'rgba(16,185,129,.2)', borderRadius: '0 99px 99px 0' }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ── Mini KPI Cards ── */}
                {[
                    {
                        title: 'ระยะนอนเฉลี่ย', value: alosData?.summary?.overall_alos ?? '—', icon: '⏱️', unit: 'วัน/ราย',
                        grad: ['#0ea5e9', '#0284c7'], glow: 'rgba(14,165,233,.2)',
                        loading: loading.alosData,
                        drillDownId: 'ipd_alos',
                        drillDownEndpoint: '/api/ipd/drilldown?type=alos'
                    },
                    {
                        title: 'เสี่ยง Re-admit', value: (readmission?.patients?.filter(p => ['high', 'moderate'].includes(p.risk_level))?.length) ?? 0, icon: '🧠', unit: 'ราย',
                        grad: ((readmission?.patients?.filter(p => ['high', 'moderate'].includes(p.risk_level))?.length) ?? 0) > 5 ? ['#f43f5e', '#dc2626'] : ['#f59e0b', '#d97706'],
                        glow: 'rgba(245,158,11,.2)',
                        loading: loading.readmission,
                        drillDownId: 'ipd_readmit',
                        drillDownEndpoint: '/api/ipd/drilldown?type=readmit'
                    },
                    {
                        title: 'นอนเกินกำหนด', value: (losPrediction?.patients?.filter(p => ['over_stay', 'at_risk'].includes(p.status))?.length) ?? 0, icon: '⌛', unit: 'ราย',
                        grad: ((losPrediction?.patients?.filter(p => ['over_stay', 'at_risk'].includes(p.status))?.length) ?? 0) > 10 ? ['#f43f5e', '#dc2626'] : ['#f59e0b', '#d97706'],
                        glow: 'rgba(245,158,11,.2)',
                        loading: loading.losPrediction,
                        drillDownId: 'ipd_alos',
                        drillDownEndpoint: '/api/ipd/drilldown?type=alos'
                    },
                ].map((kpi, i) => (
                    <div key={`ipd-kpi-${i}`}
                        onClick={() => kpi.drillDownId && openDrillDown(kpi.drillDownId, kpi.title, kpi.drillDownEndpoint)}
                        style={{
                            padding: '1rem 1.25rem', borderRadius: '14px',
                            background: `linear-gradient(135deg, ${kpi.grad[0]}10 0%, ${kpi.grad[1]}05 100%)`,
                            border: `1px solid ${kpi.grad[0]}25`,
                            position: 'relative', overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: kpi.drillDownId ? 'pointer' : 'default',
                            transform: hoverKpi === i ? 'translateY(-2px)' : 'none',
                            boxShadow: hoverKpi === i ? `0 8px 25px ${kpi.glow}` : 'none',
                        }}
                        onMouseEnter={() => kpi.drillDownId && setHoverKpi(i)}
                        onMouseLeave={() => setHoverKpi(null)}
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

            {/* ━━━━━━ 👨‍⚕️ On-Duty Personnel (IPD) ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #5e72e4, #11cdef)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 บุคลากรที่ปฏิบัติหน้าที่วันนี้ (On-Duty IPD)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(94,114,228,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    Activity Logs · Clinical Database
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {/* ── Active Doctors List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(94,114,228,.05)', borderBottom: '1px solid rgba(94,114,228,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👨‍⚕️</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#5e72e4' }}>แผนกแพทย์ (IPD)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#5e72e4', opacity: 0.8 }}>{ipdAnalytics?.on_duty?.doctors?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.ipdAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (ipdAnalytics?.on_duty?.doctors?.length > 0) ? (
                            ipdAnalytics.on_duty.doctors.map((dr, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                    borderRadius: '10px', transition: 'background 0.2s', cursor: 'default',
                                    borderBottom: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #5e72e4, #8b5cf6)',
                                        color: '#fff', fontSize: '12px', fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {dr.staff_name?.substring(0, 2).replace('น.', '').replace('พ.', '').trim() || 'D'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dr.staff_name}</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Attending Doctor</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#5e72e4' }}>{dr.total_count}</p>
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
                    <div style={{ padding: '12px 16px', background: 'rgba(17,205,239,.05)', borderBottom: '1px solid rgba(17,205,239,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👩‍⚕️</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#11cdef' }}>ทีมพยาบาล (IPD)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#11cdef', opacity: 0.8 }}>{ipdAnalytics?.on_duty?.nurses?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.ipdAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (ipdAnalytics?.on_duty?.nurses?.length > 0) ? (
                            ipdAnalytics.on_duty.nurses.map((nr, i) => {
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
                                            background: isActiveNow ? 'linear-gradient(135deg, #11cdef, #1171ef)' : 'rgba(0,0,0,0.05)',
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
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: nr.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{nr.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: nr.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{nr.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: nr.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{nr.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#11cdef' }}>{nr.total_count}</p>
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
                    <div style={{ padding: '12px 16px', background: 'rgba(45,206,137,.05)', borderBottom: '1px solid rgba(45,206,137,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#2dce89' }}>หน้าที่สนับสนุน (IPD)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#2dce89', opacity: 0.8 }}>{ipdAnalytics?.on_duty?.staff?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading.ipdAnalytics ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (ipdAnalytics?.on_duty?.staff?.length > 0) ? (
                            ipdAnalytics.on_duty.staff.map((st, i) => {
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
                                            background: isActiveNow ? 'linear-gradient(135deg, #2dce89, #2dcecc)' : 'rgba(0,0,0,0.05)',
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
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#2dce89' }}>{st.total_count}</p>
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

            {/* ━━━━━━ WEI v2 + Advanced Analytics Panel ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #6366f1)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🔬 Advanced Analytics — IPD
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(14,165,233,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    {new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }).format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))} - {new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }).format(new Date())} · HOSxP XE
                </span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ipdAnalytics ? (
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%', flexShrink: 0 }} />
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '64px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = ipdAnalytics || {};
                    const wei = a.wei ?? 0;
                    const weiColor = wei >= 80 ? '#10b981' : wei >= 60 ? '#f59e0b' : '#f43f5e';
                    const weiGrade = wei >= 90 ? 'A+' : wei >= 80 ? 'A' : wei >= 70 ? 'B+' : wei >= 60 ? 'B' : wei >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(wei / 100, 1) * circumference;

                    // WEI Component radar data
                    const weiComp = a.wei_components || {};
                    const weiRadar = [
                        { name: 'Turnover', score: weiComp.turnover || 0 },
                        { name: 'ALOS', score: weiComp.alos || 0 },
                        { name: 'Overstay', score: weiComp.overstay || 0 },
                        { name: 'CMI', score: weiComp.cmi || 0 },
                        { name: 'Disch Plan', score: weiComp.disch_plan || 0 },
                        { name: 'Re-admit', score: weiComp.readmit || 0 },
                    ];

                    const admTrend = (a.admission_trend || []).map(d => ({
                        date: d.d ? new Date(d.d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '',
                        รับใหม่: Number(d.admissions || 0),
                        จำหน่าย: Number(d.discharges || 0),
                    }));

                    const total = (a.male || 0) + (a.female || 0);
                    const malePct = total > 0 ? Math.round((a.male / total) * 100) : 0;

                    // ━━━ Tier 1: Operational Efficiency ━━━
                    const tier1Cards = [
                        {
                            icon: '🔄', label: 'Bed Turnover Rate',
                            value: `${a.bed_turnover_rate ?? '—'}x`,
                            sub: `${a.discharged_30d ?? 0} ราย จำหน่ายใน 30 วัน`,
                            desc: 'จำนวน discharge / เตียง / 30 วัน — สูง = ใช้เตียงมีประสิทธิภาพ',
                            color: (a.bed_turnover_rate ?? 0) >= 3 ? '#10b981' : (a.bed_turnover_rate ?? 0) >= 1.5 ? '#f59e0b' : '#f43f5e',
                            problem: (a.bed_turnover_rate ?? 0) >= 3
                                ? `Turnover ${a.bed_turnover_rate}x — ดีเยี่ยม (Benchmark≥3x) เตียงหมุนเวียนเร็ว ผู้ป่วยได้ admit ทันท่วงที ไม่มีปัญหา overcrowding`
                                : (a.bed_turnover_rate ?? 0) >= 1.5
                                    ? `Turnover ${a.bed_turnover_rate ?? 0}x — ต่ำกว่ามาตรฐาน 3x เตียงถูกครอบครองนานเกินจำเป็น อาจมีผู้ป่วยรอ admit ที่ ER หรือ admit delay เกิดขึ้น`
                                    : `🚨 Turnover ${a.bed_turnover_rate ?? 0}x — วิกฤต! เตียงหมุนเวียนช้ามาก ส่งผลรุนแรง: ER boarding time เพิ่ม, elective surgery ถูกเลื่อน, ต้นทุนต่อ case สูงขึ้น`,
                            recommend: (a.bed_turnover_rate ?? 0) >= 3
                                ? '✅ คงมาตรฐาน — ติดตาม ward ที่ turnover ต่ำเป็นรายกรณี'
                                : (a.bed_turnover_rate ?? 0) >= 1.5
                                    ? '📋 ปรับปรุง: (1) ตั้ง Discharge Planning Team เริ่มวางแผนตั้งแต่ admit (2) ทำ Morning Discharge Round ก่อน 10:00 น.ทุกวัน (3) ลด LOS ด้วย Clinical Pathway ตาม DRG (4) เพิ่ม Home Health Care / Day Surgery ลดการ admit ที่ไม่จำเป็น'
                                    : '🚨 เร่งด่วน: (1) Audit ผู้ป่วยนอนเกิน LOS มาตรฐาน DRG ทุกราย ภายใน 48 ชม. (2) เปิด Discharge Lounge ให้ผู้ป่วยรอกลับบ้านนอกหอผู้ป่วย (3) ทำ Bed Management Huddle เช้า-บ่าย ทุกวัน (4) พิจารณา Step-down Unit สำหรับผู้ป่วยพ้นวิกฤตรอ discharge',
                            drillDownId: 'ipd_beds',
                            drillDownEndpoint: '/api/ipd/drilldown?type=beds'
                        },
                        {
                            icon: '📐', label: 'ALOS Variance vs DRG',
                            value: `${a.alos_variance_pct >= 0 ? '+' : ''}${a.alos_variance_pct ?? 0}%`,
                            sub: `Actual ${a.actual_alos ?? '—'}วัน vs DRG ${a.benchmark_alos ?? '—'}วัน`,
                            desc: 'ส่วนต่าง LOS จริง vs มาตรฐาน DRG — ใกล้ 0% = ดี',
                            color: Math.abs(a.alos_variance_pct ?? 0) <= 10 ? '#10b981' : Math.abs(a.alos_variance_pct ?? 0) <= 25 ? '#f59e0b' : '#f43f5e',
                            problem: Math.abs(a.alos_variance_pct ?? 0) <= 10
                                ? `Variance ${a.alos_variance_pct}% — อยู่ในเกณฑ์ยอมรับได้ (±10%) LOS จริงใกล้เคียงกับมาตรฐาน DRG สะท้อน Clinical Pathway ทำงานมีประสิทธิภาพ`
                                : Math.abs(a.alos_variance_pct ?? 0) <= 25
                                    ? `Variance ${a.alos_variance_pct}% — LOS จริง (${a.actual_alos} วัน) เกินมาตรฐาน DRG (${a.benchmark_alos} วัน) สาเหตุหลัก: ภาวะแทรกซ้อน, Delayed discharge, รอ investigation, หรือ Social admission`
                                    : `🚨 Variance ${a.alos_variance_pct}% — เกินมาตรฐานมาก! ทำให้สูญเสีย bed-day ส่วนเกิน ค่ารักษาเพิ่มสูง แต่ DRG reimbursement เท่าเดิม ผล: Financial loss + คุณภาพลดลง`,
                            recommend: Math.abs(a.alos_variance_pct ?? 0) <= 10
                                ? '✅ ดี — ใช้ Clinical Pathway ปัจจุบันเป็น benchmark สำหรับ ward อื่น'
                                : Math.abs(a.alos_variance_pct ?? 0) <= 25
                                    ? '📋 แก้ไข: (1) Review top 10 DRGs ที่มี variance สูงสุด (2) ทำ Root Cause Analysis per DRG (3) ปรับ Clinical Pathway ให้มี Milestone ชัดเจน Day 1-3-5 (4) จัด Multidisciplinary Team Round ทุก 48 ชม.สำหรับ complex case'
                                    : '🚨 วิกฤต: (1) สั่ง Mandatory Case Conference สำหรับผู้ป่วยนอนเกิน DRG+3 วัน (2) Audit 100% ของ Overstay cases (3) ลงทุน Clinical Decision Support System (4) KPI: ลด Variance ≤15% ใน 60 วัน (5) ผูก KPI กับ physician performance',
                            drillDownId: 'ipd_alos',
                            drillDownEndpoint: '/api/ipd/drilldown?type=alos'
                        },
                        {
                            icon: '🔔', label: 'Readmission Rate (30d)',
                            value: `${a.readmit_rate ?? 0}%`,
                            sub: `${a.readmit_count ?? 0}/${a.readmit_total_discharges ?? 0} ราย re-admit`,
                            desc: 'HA/JCI — % ผู้ป่วยที่กลับมานอน ร.พ. ภายใน 30 วัน',
                            color: (a.readmit_rate ?? 0) < 5 ? '#10b981' : (a.readmit_rate ?? 0) < 10 ? '#f59e0b' : '#f43f5e',
                            problem: (a.readmit_rate ?? 0) < 5
                                ? `Readmission ${a.readmit_rate}% — ต่ำกว่าเกณฑ์ 5% (HA Standard) สะท้อน Discharge planning + Post-discharge care ดีเยี่ยม`
                                : (a.readmit_rate ?? 0) < 10
                                    ? `Readmission ${a.readmit_rate}% (${a.readmit_count} ราย) — สูงกว่า Benchmark 5% สาเหตุ: Discharge ก่อนพร้อม, ไม่มี follow-up plan, ผู้ป่วยขาด caregiver, หรือ complication ที่บ้าน`
                                    : `🚨 Readmission ${a.readmit_rate}% — สูงมาก! ผลกระทบ: สิ้นเปลือง bed-day + ต้นทุนเพิ่มขึ้น 3-5 เท่า + คุณภาพการรักษาถูกตั้งคำถาม + Risk จาก สวรส./สปสช. ตรวจสอบ`,
                            recommend: (a.readmit_rate ?? 0) < 5
                                ? '✅ ดีเยี่ยม — ขยายผล Discharge Checklist + Post-discharge Call 48 ชม. ไปทุก ward'
                                : (a.readmit_rate ?? 0) < 10
                                    ? '📋 ลด Readmission: (1) Implement Post-discharge Phone Call ภายใน 48 ชม. (2) ให้ Discharge Summary ภาษาง่าย + VDO สอนการดูแล (3) นัด OPD follow-up ภายใน 7 วัน (4) ส่ง Home Health Care เยี่ยมกลุ่มเสี่ยง (5) วิเคราะห์ Top 5 DRGs ที่ readmit บ่อย'
                                    : '🚨 เร่งด่วน: (1) Mandatory Root Cause Analysis ทุกราย readmit (2) ตั้ง Readmission Prevention Team (3) ทำ Transition-of-care Checklist 10 ข้อ ก่อน discharge (4) Risk Stratification ผู้ป่วย High-risk ก่อนปล่อย (5) KPI เป้าหมาย: <5% ใน 90 วัน',
                            drillDownId: 'ipd_readmit',
                            drillDownEndpoint: '/api/ipd/drilldown?type=readmit'
                        },
                        {
                            icon: '🕐', label: 'Discharge Planning',
                            value: `${a.disch_before_noon_pct ?? 0}%`,
                            sub: `${a.disch_before_noon ?? 0} ราย ก่อนเที่ยง · เฉลี่ย ${a.avg_dch_hour ?? '—'} น.`,
                            desc: '% จำหน่ายก่อน 12:00 น. — ปลดปล่อยเตียงเร็ว',
                            color: (a.disch_before_noon_pct ?? 0) >= 50 ? '#10b981' : (a.disch_before_noon_pct ?? 0) >= 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.disch_before_noon_pct ?? 0) >= 50
                                ? `Discharge ก่อนเที่ยง ${a.disch_before_noon_pct}% — ยอมเยี่ยม! เตียงว่างให้ admit ผู้ป่วยใหม่ได้ตั้งแต่ช่วงบ่าย ลด ER Boarding Time อย่างมีนัยสำคัญ`
                                : (a.disch_before_noon_pct ?? 0) >= 30
                                    ? `Discharge ก่อนเที่ยงเพียง ${a.disch_before_noon_pct}% — ส่วนใหญ่ discharge ช่วงบ่าย-เย็น เตียงว่างเฉพาะตอนค่ำ ผู้ป่วย ER รอ admit ข้ามวัน สิ้นเปลือง ER resources`
                                    : `🚨 Discharge ก่อนเที่ยงเพียง ${a.disch_before_noon_pct}% — ส่วนใหญ่ discharge หลัง 16:00 น.! เตียงไม่พร้อมรับ admit ใหม่ EM boarding สูง Bed turnover ตก ER overcrowding`,
                            recommend: (a.disch_before_noon_pct ?? 0) >= 50
                                ? '✅ คงระดับ — ทำ Morning Discharge เป็นวัฒนธรรมองค์กร ใช้ Discharge Lounge ช่วง transitional'
                                : (a.disch_before_noon_pct ?? 0) >= 30
                                    ? '📋 เพิ่ม Morning Discharge: (1) แพทย์เขียน Discharge Order ก่อน 08:00 น. (2) Pharmacist จัดยากลับบ้านล่วงหน้า 1 วัน (3) Finance ออก Bill ตอน 06:00-08:00 น. (4) ตั้ง KPI ≥50% Morning Discharge ต่อ ward'
                                    : '🚨 ทำทันที: (1) Policy: แพทย์ round 06:00-07:00 น. เขียน D/C order ก่อน 08:00 (2) Nurse เตรียม Discharge Summary ก่อน D/C 1 วัน (3) ตั้ง Incentive ต่อ ward ที่ทำ Morning D/C ≥50% (4) Discharge Coordinator ประจำทุกชั้น (5) Target: ≥40% ใน 30 วัน',
                            drillDownId: 'ipd_beds',
                            drillDownEndpoint: '/api/ipd/drilldown?type=beds'
                        },
                    ];

                    // ━━━ Tier 2: Clinical Quality ━━━
                    const tier2Cards = [
                        {
                            icon: '🧬', label: 'Case Mix Index (CMI)',
                            value: a.cmi ?? '—',
                            sub: `${a.complex_cases ?? 0} complex (RW≥2) · σ ${a.cmi_stddev ?? '—'}`,
                            desc: 'ค่าเฉลี่ย adjRW — วัดความซับซ้อนของผู้ป่วย',
                            color: '#8b5cf6',
                            problem: `CMI = ${a.cmi ?? '—'} (σ ${a.cmi_stddev ?? '—'}) — ${(a.cmi ?? 0) >= 1.5 ? 'สูง: ผู้ป่วยมีความซับซ้อนเฉลี่ยสูง ต้องการ Resource intensive care' : (a.cmi ?? 0) >= 0.8 ? 'ปานกลาง: Case mix สมดุล' : 'ต่ำ: ผู้ป่วยส่วนใหญ่ไม่ซับซ้อน อาจรักษาด้วย OPD/Day case ได้'} · Complex cases (RW≥2): ${a.complex_cases ?? 0} ราย`,
                            recommend: (a.cmi ?? 0) >= 1.5
                                ? '📋 CMI สูง: (1) วางแผน Staffing ตาม Acuity — เพิ่มพยาบาลวิชาชีพ (2) จัด Multidisciplinary Team ดูแลทุก complex case (3) ใช้ CMI ปรับ DRG reimbursement ให้สอดคล้อง (4) เพิ่ม ICU bed ratio'
                                : '📋 ปรับปรุง CMI: (1) ทบทวน Admission criteria — ลด Unnecessary admission (2) เพิ่ม Day Surgery / Ambulatory Surgery (3) Optimize DRG coding ให้ครบถ้วน (4) พิจารณา Sub-acute ward สำหรับ low-acuity long-stay',
                            drillDownId: 'ipd_cmi',
                            drillDownEndpoint: '/api/ipd/drilldown?type=cmi'
                        },
                        {
                            icon: '💀', label: 'Mortality Rate',
                            value: `${a.mortality_rate ?? 0}%`,
                            sub: `${a.deaths_30d ?? 0} ราย จาก ${a.mortality_total_dch ?? 0} discharge`,
                            desc: 'อัตราตาย IPD 30 วัน — ตัวชี้วัดคุณภาพทางคลินิก',
                            color: (a.mortality_rate ?? 0) < 2 ? '#10b981' : (a.mortality_rate ?? 0) < 5 ? '#f59e0b' : '#f43f5e',
                            problem: (a.mortality_rate ?? 0) < 2
                                ? `Mortality ${a.mortality_rate}% — อยู่ในเกณฑ์ดี (HA Standard <2%) สะท้อน Early warning system + Clinical care ทำงานได้ดี`
                                : (a.mortality_rate ?? 0) < 5
                                    ? `Mortality ${a.mortality_rate}% (${a.deaths_30d} ราย) — สูงกว่ามาตรฐาน 2% ต้อง Review: ผู้ป่วยเสียชีวิตมาจาก preventable cause หรือไม่? มี delayed treatment? Early warning score ทำงานไหม?`
                                    : `🚨 Mortality ${a.mortality_rate}% — วิกฤต! (HA Standard <2%) ต้องตรวจสอบคุณภาพการรักษาเร่งด่วน ความเสี่ยง: ถูก สรพ. ตรวจประเมิน + ภาพลักษณ์เสียหาย + Malpractice risk`,
                            recommend: (a.mortality_rate ?? 0) < 2
                                ? '✅ คงมาตรฐาน — ทำ Mortality & Morbidity Conference ทุกเดือน ใช้ MEWS/NEWS ทุก ward'
                                : (a.mortality_rate ?? 0) < 5
                                    ? '📋 ลด Mortality: (1) Mandatory Root Cause Analysis ทุกราย Death (2) Implement Modified Early Warning Score (MEWS) ทุก ward (3) Rapid Response Team พร้อมเรียก 24 ชม. (4) ทบทวน Sepsis Protocol + Door-to-Antibiotic Time (5) M&M Conference รายสัปดาห์'
                                    : '🚨 วิกฤต: (1) ตั้ง Mortality Review Board ทันที (2) Audit 100% Death cases (3) Re-train CPR/ACLS ทุก ward (4) ICU early admission criteria (5) สรุป Preventable Deaths แยก DRG รายงานผู้บริหารทุกสัปดาห์ (6) เป้าหมาย: <3% ภายใน 60 วัน',
                            drillDownId: 'ipd_mortality',
                            drillDownEndpoint: '/api/ipd/drilldown?type=mortality'
                        },
                        {
                            icon: '🎯', label: 'Current Acuity',
                            value: a.current_acuity ?? '—',
                            sub: `🔴 ${a.high_acuity_count ?? 0} สูง · 🟡 ${a.medium_acuity_count ?? 0} กลาง · 🟢 ${a.low_acuity_count ?? 0} ต่ำ`,
                            desc: 'ค่า adjRW เฉลี่ยผู้ป่วยที่นอนอยู่ — วัด workload intensity',
                            color: (a.current_acuity ?? 0) >= 2 ? '#f43f5e' : (a.current_acuity ?? 0) >= 1 ? '#f59e0b' : '#10b981',
                            problem: (a.current_acuity ?? 0) >= 2
                                ? `Acuity ${a.current_acuity} — สูงมาก! ผู้ป่วยที่นอนอยู่มีความซับซ้อนสูง (🔴 High ${a.high_acuity_count ?? 0} ราย) Staff workload สูง ความเสี่ยง Burnout + Medical error เพิ่มขึ้น`
                                : (a.current_acuity ?? 0) >= 1
                                    ? `Acuity ${a.current_acuity} — ปานกลาง สมดุลระหว่าง complex กับ simple case พยาบาลยังจัดการได้ แต่ต้อง monitor staff ratio`
                                    : `Acuity ${a.current_acuity} — ต่ำ ผู้ป่วยส่วนใหญ่ไม่ซับซ้อน อาจพิจารณาย้าย Step-down หรือ Early discharge เพื่อเพิ่ม bed capacity`,
                            recommend: (a.current_acuity ?? 0) >= 2
                                ? '🚨 Acuity สูง: (1) ลด Nurse:Patient ratio เหลือ 1:4 ทันที (2) เรียก Staff สำรอง (3) Prioritize complex cases ให้ Senior physician ดูแล (4) เตรียม ICU bed สำรอง (5) ลด elective admission ชั่วคราว'
                                : (a.current_acuity ?? 0) >= 1
                                    ? '📋 ดี: (1) ตรวจสอบ Staffing Model ให้เหมาะกับ Acuity mix (2) ใช้ Acuity-based Nursing Assignment (3) Monitor ทุก shift ว่า ratio เหมาะสม'
                                    : '✅ Acuity ต่ำ: (1) Review admission criteria — ป้องกัน unnecessary admission (2) พิจารณา Early discharge (3) ใช้ capacity ว่างทำ Staff training',
                            drillDownId: 'ipd_beds',
                            drillDownEndpoint: '/api/ipd/drilldown?type=beds'
                        },
                        {
                            icon: '👥', label: 'Patient Mix',
                            value: `♂ ${malePct}% / ♀ ${100 - malePct}%`,
                            sub: `อายุเฉลี่ย ${a.avg_age ?? '—'} ปี · 👴 ${a.elderly ?? 0} · 👶 ${a.pediatric ?? 0}`,
                            desc: 'สัดส่วนเพศ/อายุผู้ป่วย IPD ณ ขณะนี้',
                            color: '#0ea5e9',
                            problem: `ผู้ป่วย IPD ปัจจุบัน: ♂${malePct}% ♀${100 - malePct}% อายุเฉลี่ย ${a.avg_age ?? '—'} ปี · ผู้สูงอายุ(≥60) ${a.elderly ?? 0} ราย · เด็ก(<15) ${a.pediatric ?? 0} ราย ${(a.elderly ?? 0) > total * 0.5 ? '⚠️ สัดส่วนผู้สูงอายุสูง — ต้องการ Geriatric care เชิงรุก' : ''}`,
                            recommend: (a.elderly ?? 0) > total * 0.5
                                ? '📋 ผู้สูงอายุสูง: (1) Implement Geriatric Assessment ตั้งแต่ Admit (2) Fall Prevention Protocol ทุก ward (3) Delirium screening ทุกวัน (4) จัดทีม Palliative Care ดูแล End-of-life (5) เพิ่ม Physiotherapy ทุกราย'
                                : '📋 ติดตาม: (1) ดูแลกลุ่มเสี่ยง: ผู้สูงอายุ + เด็กเล็ก (2) จัดทรัพยากรตาม Age distribution (3) วางแผน Discharge ตาม Social support ของผู้สูงอายุ',
                        },
                    ];

                    // ━━━ Tier 3: Financial Intelligence ━━━
                    const tier3Cards = [
                        {
                            icon: '💰', label: 'Revenue per Bed-Day',
                            value: `฿${(a.rev_per_bed_day ?? 0).toLocaleString()}`,
                            sub: `${(a.total_bed_days ?? 0).toLocaleString()} เตียง-วัน / 30 วัน`,
                            desc: 'รายได้เฉลี่ยต่อ 1 เตียง-วัน — ตัวชี้วัด value ของ IPD',
                            color: '#0ea5e9',
                            problem: (a.rev_per_bed_day ?? 0) >= 3000
                                ? `Rev/Bed-Day ฿${(a.rev_per_bed_day ?? 0).toLocaleString()} — ดี มูลค่าแต่ละ bed-day สูง สะท้อน case mix ที่ซับซ้อน + billing ครบถ้วน`
                                : `Rev/Bed-Day ฿${(a.rev_per_bed_day ?? 0).toLocaleString()} — ต่ำ อาจเกิดจาก: Under-coding, long-stay low-acuity cases, หรือ missed charges ตรวจสอบ Revenue leakage ทันที`,
                            recommend: (a.rev_per_bed_day ?? 0) >= 3000
                                ? '✅ ดี — ทำ Benchmark ระหว่าง ward ค้นหาจุดที่ revenue/bed-day ต่ำ เพื่อ optimize'
                                : '📋 เพิ่ม Revenue/bed-day: (1) Audit DRG coding — หา Under-coding cases (2) ตรวจสอบ Missing charges ทุก ward ทุกสัปดาห์ (3) ลด LOS ผ่าน Clinical Pathway (4) เพิ่ม Day Surgery / Minimally Invasive ลด bed-day ที่ไม่จำเป็น',
                            drillDownId: 'finance_revenue',
                            drillDownEndpoint: '/api/finance/drilldown?type=revenue'
                        },
                        {
                            icon: '💵', label: 'Revenue per Discharge',
                            value: `฿${(a.rev_per_discharge ?? 0).toLocaleString()}`,
                            sub: `σ ฿${(a.rev_stddev ?? 0).toLocaleString()} · Max ฿${(a.max_charge ?? 0).toLocaleString()}`,
                            desc: 'รายได้เฉลี่ยต่อ 1 case — วัดประสิทธิภาพ revenue generation',
                            color: '#10b981',
                            problem: `Rev/Dch ฿${(a.rev_per_discharge ?? 0).toLocaleString()} (σ ฿${(a.rev_stddev ?? 0).toLocaleString()}) — ${(a.rev_stddev ?? 0) > (a.rev_per_discharge ?? 1) * 1.5 ? '⚠️ σ สูงมาก! Revenue per case ผันผวนสูง มี outlier มาก ควรตรวจสอบ extreme cases' : 'ค่อนข้างสม่ำเสมอ'}`,
                            recommend: '📋 Optimize Revenue/Discharge: (1) วิเคราะห์ outlier cases (top/bottom 10%) (2) ตรวจสอบ case ที่ revenue ต่ำผิดปกติ — อาจมี missed charges (3) เพิ่ม Procedure-based revenue (OR, Intervention) (4) ลด Non-value-added bed-days',
                            drillDownId: 'finance_revenue',
                            drillDownEndpoint: '/api/finance/drilldown?type=revenue'
                        },
                        {
                            icon: '⚠️', label: 'Overstay Impact',
                            value: `฿${(a.overstay_impact_thb ?? 0).toLocaleString()}`,
                            sub: `${a.overstay_count ?? 0} ราย เกินเฉลี่ย ${a.avg_excess_days ?? 0} วัน (${a.overstay_pct ?? 0}%)`,
                            desc: 'มูลค่าผลกระทบ capacity จาก overstay (ประมาณการ)',
                            color: (a.overstay_pct ?? 0) < 10 ? '#10b981' : (a.overstay_pct ?? 0) < 20 ? '#f59e0b' : '#f43f5e',
                            problem: (a.overstay_pct ?? 0) < 10
                                ? `Overstay ${a.overstay_pct}% (${a.overstay_count ?? 0} ราย) — อยู่ในเกณฑ์ (<10%) ผลกระทบต่ำ`
                                : (a.overstay_pct ?? 0) < 20
                                    ? `Overstay ${a.overstay_pct}% (${a.overstay_count ?? 0} ราย เกินเฉลี่ย ${a.avg_excess_days ?? 0} วัน) — มูลค่า opportunity cost ฿${(a.overstay_impact_thb ?? 0).toLocaleString()} เตียงถูกครอบครองโดยผู้ป่วยที่ควรจะ discharge ไปแล้ว`
                                    : `🚨 Overstay ${a.overstay_pct}% — ${a.overstay_count ?? 0} ราย นอนเกินรวม ${a.avg_excess_days ?? 0} วัน สูญเสีย Capacity เทียบเท่า ฿${(a.overstay_impact_thb ?? 0).toLocaleString()} ส่งผลต่อ Bed Turnover + ER Boarding + Elective admission delay`,
                            recommend: (a.overstay_pct ?? 0) < 10
                                ? '✅ ดี — Monitor overstay cases รายวัน ป้องกันไม่ให้เกิน 10%'
                                : '🚨 ลด Overstay: (1) Alert แพทย์อัตโนมัติเมื่อ LOS ≥ DRG standard (2) Daily Discharge Planning Meeting (3) Fast-track Discharge process (Lab-Consult-Billing ภายใน 3 ชม.) (4) Social Worker ช่วย Social admission case (5) เป้าหมาย: Overstay <10% ภายใน 45 วัน',
                            drillDownId: 'ipd_alos',
                            drillDownEndpoint: '/api/ipd/drilldown?type=alos'
                        },
                        {
                            icon: '📊', label: 'Avg Unpaid / Case',
                            value: `฿${(a.avg_unpaid ?? 0).toLocaleString()}`,
                            sub: `Total RW: ${(a.total_rw ?? 0).toLocaleString()} · ${a.cmi_cases ?? 0} cases`,
                            desc: 'ค่าเฉลี่ยค้างชำระต่อ case — ส่วนต่าง charge - paid',
                            color: Math.abs(a.avg_unpaid ?? 0) < 1000 ? '#10b981' : '#f59e0b',
                            problem: Math.abs(a.avg_unpaid ?? 0) < 1000
                                ? `Avg Unpaid ฿${(a.avg_unpaid ?? 0).toLocaleString()} — ต่ำ (HA Benchmark <฿1,000) Collection rate ดี reimbursement ตรงตามเวลา`
                                : `Avg Unpaid ฿${(a.avg_unpaid ?? 0).toLocaleString()} — สูง! Gap ระหว่าง charge กับ paid มาก สาเหตุ: DRG under-coding ทำให้ reimbursement ต่ำกว่าค่ารักษา, สิทธิ์ผู้ป่วยไม่ครอบคลุม, หรือ claim ถูก deny`,
                            recommend: Math.abs(a.avg_unpaid ?? 0) < 1000
                                ? '✅ ดี — Maintain coding quality + ตรวจสอบ claim reject รายเดือน'
                                : '📋 ลด Unpaid Gap: (1) Optimize DRG coding ให้ adjRW สูงขึ้น (2) ตรวจสอบ Claim rejection rate — แก้ root cause (3) Verify สิทธิ์ผู้ป่วยตั้งแต่ admission (4) เพิ่ม Medical Coder ทำ concurrent coding (5) ประชุม Payer กรณี systematic denial',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* WEI v2 Gauge + Component Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                {/* WEI Gauge */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={weiColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={weiColor} fontFamily="'Outfit',sans-serif">{wei}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">WEI v2 Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: weiColor }}>{weiGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: weiColor }}>
                                            {wei >= 80 ? 'Ward ประสิทธิภาพสูง' : wei >= 60 ? 'ระดับมาตรฐาน' : 'ต้องปรับปรุง'}
                                        </div>
                                    </div>

                                    {/* WEI Component Bars */}
                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>
                                            WEI v2 Components
                                        </p>
                                        {weiRadar.map((c, i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '54px', textAlign: 'right', flexShrink: 0 }}>{c.name}</span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: barColor, width: '24px', textAlign: 'right' }}>{c.score}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tier-organized KPI Cards with Problem + Recommend */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                    {/* Render helper */}
                                    {[
                                        { title: 'Operational Efficiency', color: '#7c3aed', cards: tier1Cards },
                                        { title: 'Clinical Quality', color: '#0ea5e9', cards: tier2Cards },
                                        { title: 'Financial Intelligence', color: '#f59e0b', cards: tier3Cards },
                                    ].map((tier, ti) => (
                                        <div key={ti}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '3px', height: '14px', background: `linear-gradient(180deg, ${tier.color}, ${tier.color}99)`, borderRadius: '99px' }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    {tier.title}
                                                </span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                                {tier.cards.map((k, i) => (
                                                    <div key={i}
                                                        onClick={() => k.drillDownId && openDrillDown(k.drillDownId, k.label, k.drillDownEndpoint)}
                                                        style={{
                                                            padding: '8px 10px', borderRadius: '10px',
                                                            background: `${k.color}06`, border: `1px solid ${k.color}20`,
                                                            cursor: k.drillDownId ? 'pointer' : 'default',
                                                            transition: 'transform 0.2s',
                                                            transform: hoverTierCard === `${ti}-${i}` ? 'translateY(-1px)' : 'none',
                                                            boxShadow: hoverTierCard === `${ti}-${i}` ? `0 4px 12px ${k.color}20` : 'none',
                                                        }}
                                                        onMouseEnter={() => k.drillDownId && setHoverTierCard(`${ti}-${i}`)}
                                                        onMouseLeave={() => setHoverTierCard(null)}
                                                    >
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

                            {/* ━━━ Discharge Time Distribution ━━━ */}
                            {(a.disch_total > 0) && (
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
                                    borderTop: '1px solid var(--md-border)', paddingTop: '1rem',
                                }}>
                                    {/* Discharge time pie */}
                                    <div>
                                        <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                            🕐 สัดส่วนเวลาจำหน่าย (30 วัน)
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <ResponsiveContainer width="55%" height={130}>
                                                <PieChart>
                                                    <Pie
                                                        data={[
                                                            { name: 'ก่อนเที่ยง', value: a.disch_before_noon || 0, fill: '#10b981' },
                                                            { name: 'บ่าย (12-16)', value: a.disch_afternoon || 0, fill: '#f59e0b' },
                                                            { name: 'เย็น (16+)', value: a.disch_evening || 0, fill: '#f43f5e' },
                                                        ]}
                                                        dataKey="value" cx="50%" cy="50%" innerRadius={32} outerRadius={55} paddingAngle={3}
                                                    >
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                        formatter={(v, n) => [`${v} ราย`, n]}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                                {[
                                                    { label: 'ก่อนเที่ยง', value: a.disch_before_noon || 0, color: '#10b981' },
                                                    { label: 'บ่าย (12-16)', value: a.disch_afternoon || 0, color: '#f59e0b' },
                                                    { label: 'เย็น (16+)', value: a.disch_evening || 0, color: '#f43f5e' },
                                                ].map((item, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                                                            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--md-text-secondary)' }}>{item.label}</span>
                                                        </div>
                                                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: item.color }}>{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Day-of-Week Pattern */}
                                    <div>
                                        <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                            📅 รูปแบบการ Admit รายวัน (90 วัน)
                                        </p>
                                        <ResponsiveContainer width="100%" height={130}>
                                            <BarChart data={a.dow_pattern || []} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                                <Tooltip
                                                    contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                    formatter={(v, n) => {
                                                        if (n === 'total') return [`${v} ราย`, 'Admissions (90d)'];
                                                        return [`${v} วัน`, 'ALOS เฉลี่ย'];
                                                    }}
                                                />
                                                <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={22}>
                                                    {(a.dow_pattern || []).map((d, i) => {
                                                        // Weekend = different color
                                                        const isWeekend = d.dow === 1 || d.dow === 7;
                                                        return <Cell key={i} fill={isWeekend ? '#f59e0b' : '#7c3aed'} />;
                                                    })}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}


                            {/* 7-day Admit/Discharge Trend */}
                            {admTrend.length > 0 && (
                                <div style={{ borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        📈 แนวโน้มรับ/จำหน่าย 7 วันล่าสุด
                                    </p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <ComposedChart data={admTrend} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.4)" vertical={false} />
                                            <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '12px' }} />
                                            <Area type="monotone" dataKey="รับใหม่" stroke="#7c3aed" fill="rgba(124,58,237,.1)" strokeWidth={2} dot={{ r: 3, fill: '#7c3aed' }} />
                                            <Line type="monotone" dataKey="จำหน่าย" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Acuity Breakdown Bar */}
                            {(a.high_acuity_count > 0 || a.medium_acuity_count > 0 || a.low_acuity_count > 0) && (
                                <div style={{
                                    borderTop: '1px solid var(--md-border)', paddingTop: '0.75rem',
                                }}>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                        🎯 Acuity Distribution (ผู้ป่วยปัจจุบัน)
                                    </p>
                                    <div style={{ display: 'flex', gap: '3px', height: '12px', borderRadius: '99px', overflow: 'hidden' }}>
                                        {[
                                            { c: a.high_acuity_count || 0, color: '#f43f5e', label: 'สูง (RW≥2)' },
                                            { c: a.medium_acuity_count || 0, color: '#f59e0b', label: 'กลาง (RW 1-2)' },
                                            { c: a.low_acuity_count || 0, color: '#10b981', label: 'ต่ำ (RW<1)' },
                                        ].filter(s => s.c > 0).map((s, i) => (
                                            <div key={i} title={`${s.label}: ${s.c} ราย`}
                                                style={{
                                                    flex: s.c, background: s.color, borderRadius: '99px',
                                                    transition: 'flex 0.8s ease',
                                                }} />
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '6px', flexWrap: 'wrap' }}>
                                        {[
                                            { c: a.high_acuity_count || 0, color: '#f43f5e', label: 'สูง (RW≥2)' },
                                            { c: a.medium_acuity_count || 0, color: '#f59e0b', label: 'กลาง (RW 1-2)' },
                                            { c: a.low_acuity_count || 0, color: '#10b981', label: 'ต่ำ (RW<1)' },
                                        ].map((s, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
                                                <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--md-text-secondary)' }}>{s.label}</span>
                                                <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 800, color: s.color }}>{s.c} ราย</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — IPD ━━━━━━ */}
            {!loading.ipdAnalytics && ipdAnalytics && (() => {
                const a = ipdAnalytics || {};
                const wei = a.wei ?? 0;
                const occRate = bedSummary?.occupancy_rate ?? 0;
                const totalBeds = bedSummary?.total_beds ?? 0;
                const occupied = bedSummary?.occupied ?? 0;
                const availBeds = totalBeds - occupied;
                const turnover = a.bed_turnover_rate ?? 0;
                const alosVar = a.alos_variance_pct ?? 0;
                const actualAlos = a.actual_alos ?? 0;
                const benchmarkAlos = a.benchmark_alos ?? 0;
                const readmitRate = a.readmit_rate ?? 0;
                const readmitCount = a.readmit_count ?? 0;
                const dischNoonPct = a.disch_before_noon_pct ?? 0;
                const mortalityRate = a.mortality_rate ?? 0;
                const deathCount = a.deaths_30d ?? 0;
                const acuity = a.current_acuity ?? 0;
                const highAcuity = a.high_acuity_count ?? 0;
                const medAcuity = a.medium_acuity_count ?? 0;
                const lowAcuity = a.low_acuity_count ?? 0;
                const overstayPct = a.overstay_pct ?? 0;
                const overstayCount = a.overstay_count ?? 0;
                const avgExcessDays = a.avg_excess_days ?? 0;
                const overstayImpact = a.overstay_impact_thb ?? 0;
                const revPerBedDay = a.rev_per_bed_day ?? 0;
                const avgUnpaid = a.avg_unpaid ?? 0;
                const cmi = a.cmi ?? 0;
                const elderly = a.elderly ?? 0;
                const avgAge = a.avg_age ?? 0;

                // ─── Detect all problems with severity levels ───
                const problems = [];

                // 1. Bed Capacity Crisis (Occupancy + Turnover combined)
                if (occRate > 80 || turnover < 2) {
                    const isCritical = occRate > 90 || turnover < 1.5;
                    problems.push({
                        priority: 1,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 Bed Capacity Crisis: Occupancy ${occRate}% + Turnover เพียง ${turnover}x`,
                        rootCause: `อัตราครองเตียง ${occRate}% (${occupied}/${totalBeds} เตียง, ว่างเพียง ${availBeds} เตียง) ${occRate > 90 ? '— เกินวิกฤต!' : '— ใกล้เต็ม'} ขณะเดียวกัน Bed Turnover = ${turnover}x/เดือน (Benchmark ≥3x) ── สาเหตุที่แท้จริง: (1) ผู้ป่วยนอนนานเกินมาตรฐาน DRG → ALOS Variance = ${alosVar > 0 ? '+' : ''}${alosVar}% (2) Discharge Planning ไม่มีประสิทธิภาพ — เพียง ${dischNoonPct}% จำหน่ายก่อนเที่ยง (3) Overstay ${overstayPct}% (${overstayCount} ราย เกินเฉลี่ย ${avgExcessDays} วัน) กินเตียงที่ควรว่าง (4) ไม่มีระบบ Step-down/Intermediate care → ผู้ป่วยพ้นวิกฤตยังอยู่ ward เดิม`,
                        cascadeEffect: `ผลกระทบลูกโซ่ร้ายแรง: เตียงเต็ม → ER Boarding Time เพิ่มขึ้น (ผู้ป่วย ER รอ admit ข้ามวัน) → Elective surgery ถูกเลื่อน → รายได้สูญเสีย → Staff workload สูง + Burnout → ความผิดพลาดทางการแพทย์เพิ่มขึ้น ● Overstay opportunity cost ≈ ฿${overstayImpact.toLocaleString()}/เดือน`,
                        fixFirst: `🔧 ด่วนที่สุด: (1) Daily Bed Management Huddle เช้า-บ่าย — Review ทุกรายที่นอน ≥ DRG standard (2) Morning Discharge Protocol: แพทย์เขียน D/C order ก่อน 08:00 น. → ปลดปล่อยเตียงก่อนเที่ยง (3) Discharge Lounge: ย้ายผู้ป่วยรอกลับบ้านออกจาก ward → เตียงว่างทันที (4) Fast-track Social admit cases → ส่ง Home Health Care / Intermediate care (5) เป้าหมาย: Occupancy ≤85% + Turnover ≥3x ภายใน 45 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 2. LOS Overrun (ALOS Variance + Overstay)
                if (Math.abs(alosVar) > 15 || overstayPct > 15) {
                    const isCritical = Math.abs(alosVar) > 25 || overstayPct > 25;
                    problems.push({
                        priority: 2,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 LOS Overrun: ALOS Variance ${alosVar > 0 ? '+' : ''}${alosVar}% + Overstay ${overstayPct}%`,
                        rootCause: `ALOS จริง = ${actualAlos} วัน vs มาตรฐาน DRG = ${benchmarkAlos} วัน (Variance ${alosVar > 0 ? '+' : ''}${alosVar}%) ── Overstay ${overstayCount} ราย (${overstayPct}%) นอนเกินเฉลี่ย ${avgExcessDays} วัน ── สาเหตุลึก: (1) ไม่มี Clinical Pathway ที่ชัดเจนตาม DRG — ทำให้แพทย์แต่ละคนวางแผนต่างกัน (2) Delayed investigation: รอ Lab/Imaging/Consult นาน (3) Complication ในช่วง admit ← Infection control? Surgical technique? (4) Social barriers: ไม่มีญาติรับ, ผู้สูงอายุอยู่คนเดียว, รอ Hospice placement`,
                        cascadeEffect: `ผลกระทบ: ทุก 1 วันที่ผู้ป่วยนอนเกิน DRG = ฿${revPerBedDay.toLocaleString()} bed-day cost แต่ DRG reimbursement ไม่เพิ่ม → Financial loss ● Overstay ${overstayCount} ราย × ${avgExcessDays} วัน × ฿${revPerBedDay.toLocaleString()} = ฿${overstayImpact.toLocaleString()} opportunity cost/เดือน ● เตียงถูกครอบครอง → Turnover ต่ำ (${turnover}x) → Occupancy สูง (${occRate}%) → ER Boarding สูงขึ้น`,
                        fixFirst: `🔧 ต้องแก้ก่อน: (1) ตั้ง LOS Alert อัตโนมัติ: เมื่อ LOS ≥ DRG standard → แจ้งแพทย์ + Discharge Planning Team ทันที (2) ทำ Clinical Pathway Top 10 DRGs — กำหนด Milestone Day 1/3/5/7 ชัดเจน (3) Multidisciplinary Team Round ทุก 48 ชม. สำหรับผู้ป่วยนอนเกิน (4) Social Worker ทำ Discharge assessment ตั้งแต่ Day 1 — ไม่ต้องรอถึงวัน D/C (5) เป้าหมาย: Variance ≤±10% + Overstay <10% ภายใน 60 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 3. Discharge Timing Problem
                if (dischNoonPct < 40) {
                    const isCritical = dischNoonPct < 25;
                    problems.push({
                        priority: 3,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 Discharge ช้า: เพียง ${dischNoonPct}% จำหน่ายก่อนเที่ยง (เฉลี่ย ${a.avg_dch_hour ?? '—'} น.)`,
                        rootCause: `${100 - dischNoonPct}% ของผู้ป่วยถูกจำหน่ายช่วงบ่าย-เย็น ← หมายความว่าเตียงว่างเฉพาะช่วงค่ำ-ดึก ── สาเหตุลึก: (1) แพทย์ round ช้า (หลัง 10:00 น.) → เขียน D/C order บ่าย (2) Pharmacy จัดยากลับบ้านหลังจากได้ D/C order → ใช้เวลา 1-2 ชม. (3) Finance ออก Bill ช้า — รอ coding review + ตรวจสอบสิทธิ์ (4) ผู้ป่วย/ญาติไม่พร้อม — ไม่ได้แจ้ง D/C plan ล่วงหน้า`,
                        cascadeEffect: `เตียงว่างค่ำ → ผู้ป่วยใหม่จาก ER ต้องรอ admit ทั้งวัน → ER Overcrowding → Boarding time สูงขึ้น → ER mortality risk เพิ่ม ● Bed Turnover ลด → เตียงหมุนเวียนไม่ทัน demand → Elective surgery ถูก cancel → Revenue loss ● เตียงว่างค่ำ = เตียง "เสียเปล่า" ครึ่งวัน`,
                        fixFirst: `🔧 Quick Win สูง: (1) Policy: แพทย์ round 06:00-07:30 น. — เขียน D/C Order ก่อน 08:00 (2) Anticipatory Discharge: Nurse เตรียม Discharge Summary + Medication list ก่อน 1 วัน (3) Pharmacy: Pre-pack ยากลับบ้านก่อน D/C 1 วัน (ยาเดิม + ยาใหม่) (4) Finance: Bill preparation ตั้งแต่ 06:00 น. (5) ตั้ง Incentive: Ward ที่ Morning D/C ≥50% → ได้ performance points (6) เป้าหมาย: ≥50% Morning D/C ภายใน 30 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 4. Readmission Problem
                if (readmitRate > 5) {
                    const isCritical = readmitRate > 10;
                    problems.push({
                        priority: 4,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🟡 Readmission 30d: ${readmitRate}% (${readmitCount} ราย) — สูงกว่า HA Benchmark 5%`,
                        rootCause: `${readmitRate}% ของผู้ป่วยที่ Discharge กลับมา Admit ซ้ำภายใน 30 วัน ── สาเหตุลึก: (1) Premature Discharge: ปล่อยผู้ป่วยเร็วเกินไป อาการยังไม่คงที่ (2) Post-discharge care gap: ไม่มี follow-up call, ไม่มี Home Health Care visit (3) Discharge instruction ไม่ชัดเจน: ผู้ป่วย/ญาติไม่เข้าใจวิธีดูแลตัวเองที่บ้าน (4) Complication ที่ไม่ได้ป้องกัน: Infection, Drug reaction, Inadequate pain control (5) Social factor: ผู้สูงอายุ (${elderly} ราย, เฉลี่ย ${avgAge} ปี) อยู่คนเดียว ไม่มี Caregiver`,
                        cascadeEffect: `Readmission ซ้ำ = ต้นทุนเพิ่ม 3-5 เท่า (admit ซ้ำ + complication ที่แย่กว่า) ● สิทธิ์ UC: ค่ารักษาครั้งที่ 2 เป็นภาระ รพ. (DRG ไม่จ่ายเพิ่ม) ● สวรส./สปสช. ตรวจสอบ → อาจถูกหักเงิน Global Budget ● ภาพลักษณ์ + Patient trust ลดลง → HA Accreditation เสี่ยง`,
                        fixFirst: `🔧 ลด Readmission: (1) Post-discharge Phone Call ภายใน 48 ชม. — ถามอาการ + ย้ำ medication (2) Discharge Summary ภาษาง่าย + VDO สอนการดูแลตนเอง (3) Home Health Care visit สำหรับ High-risk patient ภายใน 7 วัน (4) นัด OPD follow-up ภายใน 7 วัน (ไม่ใช่ 30 วัน) (5) Risk Stratification: คัดกรองผู้ป่วยที่มี Readmission Risk Score สูง → Intensive follow-up (6) เป้าหมาย: Readmission <5% ภายใน 90 วัน`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 5. Mortality Concern
                if (mortalityRate > 2) {
                    const isCritical = mortalityRate > 5;
                    problems.push({
                        priority: 5,
                        severity: isCritical ? 'critical' : 'warning',
                        title: `🔴 Mortality Rate: ${mortalityRate}% (${deathCount} ราย) — เกิน HA Standard 2%`,
                        rootCause: `อัตราตาย IPD ${mortalityRate}% (${deathCount} ราย จาก ${a.mortality_total_dch ?? 0} discharge) ── ${mortalityRate > 5 ? '⚠️ สูงกว่ามาตรฐานมาก!' : 'สูงกว่าเกณฑ์ HA 2%'} ── ต้องวิเคราะห์แยก: (1) ตรวจสอบว่าเป็น Preventable death กี่ราย? (2) มี Delayed recognition / Delayed treatment หรือไม่? (3) Early Warning Score (MEWS/NEWS) ถูกใช้ทุก ward หรือไม่? (4) Rapid Response Team ถูกเรียกทันเวลาหรือไม่? (5) Acuity สูง (${acuity}) + High-risk patients (${highAcuity} ราย RW≥2) อาจเป็น contributing factor`,
                        cascadeEffect: `ผลกระทบ: Mortality สูง → สรพ. (HA) ตรวจสอบ + อาจส่งผลต่อ Accreditation ● สปสช. audit → อาจถูก financial penalty ● Malpractice risk เพิ่มขึ้น → Premium ประกันสูงขึ้น ● Staff morale ลดลง → Burnout → Turnover สูง ● ภาพลักษณ์ รพ. เสียหาย → Volume ผู้ป่วยลดลง`,
                        fixFirst: `🔧 เร่งด่วน: (1) Mortality & Morbidity Conference ทุกสัปดาห์ — Review ทุกราย Death (2) Mandatory RCA (Root Cause Analysis) ทุกราย (3) Implement Modified Early Warning Score (MEWS) ทุก ward — Activate RRT เมื่อ score สูง (4) Sepsis Bundle: Door-to-Antibiotic ≤1 ชม. (5) Re-train CPR/ACLS ทั้ง Nursing + Medical staff (6) ICU Early Admission Policy: ย้ายเร็วก่อน deteriorate`,
                        color: isCritical ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 6. High Acuity Workload
                if (acuity >= 1.5 || highAcuity > occupied * 0.3) {
                    const highPct = occupied > 0 ? Math.round(highAcuity / occupied * 100) : 0;
                    problems.push({
                        priority: 6,
                        severity: acuity >= 2 ? 'critical' : 'warning',
                        title: `🟡 High Acuity Load: CMI=${cmi}, Current Acuity=${acuity}, High-risk ${highPct}%`,
                        rootCause: `ผู้ป่วยที่นอนอยู่มีความซับซ้อนสูง — Acuity Score = ${acuity} (🔴 High ${highAcuity} ราย, 🟡 Medium ${medAcuity} ราย, 🟢 Low ${lowAcuity} ราย) ● CMI (30 วัน) = ${cmi} ── สาเหตุ: (1) ผู้ป่วย High-acuity ${highPct}% ของ census → Nurse workload สูงกว่า staffing ratio ที่มี (2) ผู้สูงอายุ ${elderly} ราย (เฉลี่ย ${avgAge} ปี) → ดูแลซับซ้อน ต้องการ Geriatric expertise (3) Low-acuity cases (${lowAcuity} ราย) อาจ admit ไม่จำเป็น — ควรเป็น Observation/Day case`,
                        cascadeEffect: `Acuity สูง → Nurse:Patient ratio ไม่เพียงพอ → Nursing errors เพิ่มขึ้น (Med error, Fall, Pressure injury) → Mortality risk สูงขึ้น → Staff burnout + turnover สูง → ต้องจ้าง Agency nurse ต้นทุนสูง ● Extended stay สำหรับ complex cases → เตียงเต็ม → วงจร Capacity crisis`,
                        fixFirst: `🔧 ปรับ: (1) Acuity-based Nursing Assignment: ≤1:4 สำหรับ High-acuity, 1:6 สำหรับ Medium (2) เรียก Staff สำรองเมื่อ Heavy census (3) Review Low-acuity cases (${lowAcuity} ราย) → เปลี่ยนเป็น Observation/Day case ที่ทำได้ (4) Senior physician ดูแล High-risk cases (5) เตรียม ICU bed สำรอง 1-2 เตียงเสมอ`,
                        color: acuity >= 2 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // 7. Financial Leakage
                if (Math.abs(avgUnpaid) > 2000 || revPerBedDay < 2000) {
                    problems.push({
                        priority: 7,
                        severity: Math.abs(avgUnpaid) > 5000 ? 'critical' : 'warning',
                        title: `🟠 Financial Leakage: Rev/Bed-Day ฿${revPerBedDay.toLocaleString()} + Unpaid Gap ฿${avgUnpaid.toLocaleString()}`,
                        rootCause: `Revenue/Bed-Day = ฿${revPerBedDay.toLocaleString()} ${revPerBedDay < 2000 ? '— ต่ำกว่า Benchmark' : '— อยู่ในเกณฑ์'} ● Avg Unpaid Gap = ฿${avgUnpaid.toLocaleString()} ต่อ case ── สาเหตุ: (1) DRG Under-coding: adjRW ต่ำกว่าความซับซ้อนจริง → reimbursement ไม่คุ้ม (2) Missing charges: ไม่บันทึก procedure, supply, หรือ medication ครบ (3) Long-stay low-acuity cases กิน bed-day แต่สร้าง revenue น้อย (4) Claim rejection จาก สปสช./ประกัน → Revenue ไม่ได้รับ`,
                        cascadeEffect: `Revenue ต่ำ + Unpaid สูง → Cash flow ลดลง → ไม่มีงบลงทุน equipment/staffing → คุณภาพลดลง → ผู้ป่วยไปที่อื่น → Revenue ลดอีก → Downward spiral ● ผลกระทบต่อเดือน: หากลด Unpaid gap ฿${avgUnpaid.toLocaleString()} × ${a.cmi_cases ?? 0} cases = ฿${(Math.abs(avgUnpaid) * (a.cmi_cases ?? 0)).toLocaleString()} ต่อเดือน`,
                        fixFirst: `🔧 เพิ่ม Revenue: (1) DRG Coding Audit รายสัปดาห์ — หา Under-coding cases (2) Concurrent Coding: Medical Coder review chart ระหว่าง admit ไม่ต้องรอ discharge (3) Missing Charge Audit ทุก ward ทุกสัปดาห์ (4) ลด Non-value bed-days ผ่าน Clinical Pathway (5) ตรวจสอบ Claim rejection rate → แก้ Root cause กับ Payer`,
                        color: Math.abs(avgUnpaid) > 5000 ? '#f43f5e' : '#f59e0b',
                    });
                }

                // If no significant problems
                if (problems.length === 0) {
                    problems.push({
                        priority: 0,
                        severity: 'good',
                        title: '✅ ระบบ IPD ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `WEI Score ${wei}/100 ● Occupancy ${occRate}% ● Turnover ${turnover}x ● ALOS Variance ${alosVar}% ● Readmission ${readmitRate}% ● Mortality ${mortalityRate}% ● Overstay ${overstayPct}% — ตัวชี้วัดอยู่ในเกณฑ์ยอมรับได้`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — ระบบ Ward ทำงานราบรื่น ควร Monitor ต่อเนื่อง`,
                        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ WEI ≥ ${Math.min(wei + 10, 100)} ภายไตรมาสหน้า (2) Benchmark กับ รพ. ระดับเดียวกัน (3) Patient experience survey ทุกเดือน`,
                        color: '#10b981',
                    });
                }

                problems.sort((a, b) => a.priority - b.priority);

                const criticalCount = problems.filter(p => p.severity === 'critical').length;
                const warningCount = problems.filter(p => p.severity === 'warning').length;
                const urgencyScore = Math.min(10, criticalCount * 3 + warningCount * 1.5);
                const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
                const urgencyLabel = urgencyScore >= 7 ? 'ต้องดำเนินการทันที' : urgencyScore >= 4 ? 'ควรแก้ไขเร็ว' : 'สถานการณ์ปกติ';

                // Cross-impact chain
                const chainItems = [
                    { label: `Overstay ${overstayPct}%`, color: '#f43f5e' },
                    { label: `ALOS +${alosVar}%`, color: '#f59e0b' },
                    { label: `Turnover ${turnover}x`, color: '#8b5cf6' },
                    { label: `Occupancy ${occRate}%`, color: '#ef4444' },
                    { label: `D/C ก่อนเที่ยง ${dischNoonPct}%`, color: '#0ea5e9' },
                    { label: `WEI = ${wei}/100`, color: '#10b981' },
                ];

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🔥 Deep Root-Cause Analysis
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>Cross-analysis IPD</span>
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
                                            ⚡ ระดับความเร่งด่วนรวม — IPD
                                        </span>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700, color: urgencyColor,
                                            background: `${urgencyColor}15`, padding: '2px 8px', borderRadius: '999px',
                                            border: `1px solid ${urgencyColor}25`,
                                        }}>{urgencyLabel}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                                            พบ <strong style={{ color: '#f43f5e' }}>{criticalCount} ปัญหาวิกฤต</strong>
                                            {warningCount > 0 && <> + <strong style={{ color: '#f59e0b' }}>{warningCount} ปัญหาเตือน</strong></>}
                                            {problems[0]?.severity === 'good' && <strong style={{ color: '#10b981' }}>ไม่พบปัญหา</strong>}
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
                                            WEI: {wei}/100 · Occ: {occRate}% · Turnover: {turnover}x · Mortality: {mortalityRate}%
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
                                        🗺️ แผนที่ความเชื่อมโยง — IPD Root-Cause Chain
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
                                        💡 <strong>สรุป:</strong> ปัญหา IPD มีต้นตอจาก <strong style={{ color: '#f43f5e' }}>Overstay ({overstayPct}%)</strong> + <strong style={{ color: '#f43f5e' }}>ALOS เกิน DRG ({alosVar > 0 ? '+' : ''}{alosVar}%)</strong>
                                        → ทำให้เตียงหมุนเวียนช้า → Occupancy สูง → เตียงไม่ว่างรับ admit ใหม่
                                        — <strong>แก้ ด่วนที่ 1 ก่อน</strong> (Discharge Planning + LOS Management) จะเห็นผลลัพธ์ดีขึ้นในทุกตัวชี้วัดพร้อมกัน
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}


            {/* Ward Occupancy */}
            <div className="chart-container">
                <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                    🏥 Ward Occupancy Census
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={wardChart} layout="vertical">
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(203,213,225,.4)" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false}
                            tickFormatter={v => `${v}%`} />
                        <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(124,58,237,.04)' }}
                            contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.08)' }}
                            formatter={(v, n, p) => [`${v}% (${p.payload.occupied}/${p.payload.total} เตียง)`, 'Occupancy']}
                        />
                        <ReferenceLine x={85} stroke="#f43f5e" strokeDasharray="6 3" strokeWidth={1.5} />
                        <Bar dataKey="occupancy" radius={[0, 6, 6, 0]} barSize={18}>
                            {wardChart.map((w, i) => <Cell key={i} fill={w.occupancy > 85 ? '#f43f5e' : w.occupancy > 70 ? '#f59e0b' : '#7c3aed'} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                    {[
                        { color: '#7c3aed', label: 'ปกติ (<70%)' },
                        { color: '#f59e0b', label: 'สูง (70-85%)' },
                        { color: '#f43f5e', label: 'วิกฤต (>85%)' },
                    ].map((l, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '3px', background: l.color }} />
                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 600 }}>{l.label}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}>
                        <div style={{ width: '18px', height: '2px', background: '#f43f5e', borderRadius: '2px', backgroundImage: 'repeating-linear-gradient(90deg, #f43f5e 0, #f43f5e 4px, transparent 4px, transparent 8px)' }} />
                        <span style={{ fontSize: 'var(--fs-xs)', color: '#f43f5e', fontWeight: 700 }}>เส้นวิกฤต 85%</span>
                    </div>
                </div>
            </div>

            {/* AI Demand Forecast */}
            <div className="chart-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                            🧠 Predictive Capacity Flow (24-72h)
                        </h3>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                            AI Neural Demand Forecast — พยากรณ์อัตราครองเตียง
                        </p>
                    </div>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        fontSize: 'var(--fs-xs)', fontWeight: 700,
                        color: '#8b5cf6', background: 'rgba(139,92,246,.08)',
                        border: '1px solid rgba(139,92,246,.2)',
                        borderRadius: '999px', padding: '4px 12px',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 2s infinite' }} />
                        AI Forecast
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={demandChart}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(203,213,225,.4)" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false}
                            tickFormatter={v => `${v}%`} />
                        <Tooltip
                            cursor={{ fill: 'rgba(124,58,237,.04)' }}
                            contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.08)' }}
                            formatter={(v) => [`${v}%`, 'Occupancy']}
                        />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                        <ReferenceLine y={85} stroke="#f43f5e" strokeDasharray="6 3" strokeWidth={1.5}
                            label={{ value: 'Critical 85%', position: 'insideTopRight', fill: '#f43f5e', fontSize: 10, fontWeight: 700 }} />
                        <Bar dataKey="now" fill="#7c3aed" name="ปัจจุบัน" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="h24" fill="#0ea5e9" name="24 ชม." radius={[4, 4, 0, 0]} />
                        <Bar dataKey="h48" fill="#8b5cf6" name="48 ชม." radius={[4, 4, 0, 0]} />
                        <Bar dataKey="h72" fill="#f59e0b" name="72 ชม." radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ━━━━━━ AI Deep Readmission Risk ━━━━━━ */}
            {(readmission?.patients?.filter(p => p.risk_level === 'high' || p.risk_level === 'moderate')?.length > 0) && (() => {
                const riskyPatients = readmission.patients.filter(p => p.risk_level === 'high' || p.risk_level === 'moderate');
                return (
                    <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showReadmitList ? '1.25rem' : '0' }}>
                            <div>
                                <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                                    🚨 รายชื่อผู้ป่วยเสี่ยง Re-admit (LACE+ & Comorbidity)
                                </h3>
                                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                                    ควบคุมคุณภาพการจำหน่าย (Discharge Planning & Follow-up Prevention)
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,.1)', padding: '4px 10px', borderRadius: '6px' }}>
                                    {riskyPatients.length} ราย
                                </span>
                                <button
                                    onClick={() => setShowReadmitList(prev => !prev)}
                                    style={{
                                        fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                                        color: showReadmitList ? '#f43f5e' : '#7c3aed',
                                        background: showReadmitList ? 'rgba(244,63,94,.08)' : 'rgba(124,58,237,.08)',
                                        border: `1px solid ${showReadmitList ? 'rgba(244,63,94,.2)' : 'rgba(124,58,237,.2)'}`,
                                        padding: '4px 12px', borderRadius: '6px',
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        transition: 'all .2s ease',
                                    }}
                                >
                                    {showReadmitList ? '🔽 ซ่อนรายชื่อ' : '▶ แสดงรายชื่อ'}
                                </button>
                            </div>
                        </div>

                        {showReadmitList && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px', animation: 'fadeIn .3s ease' }}>
                                {riskyPatients
                                    .map((p, i) => (
                                        <div key={i} style={{
                                            padding: '1rem', borderRadius: '12px',
                                            background: p.risk_level === 'high' ? 'linear-gradient(to right, rgba(244,63,94,.05), transparent)' : 'linear-gradient(to right, rgba(245,158,11,.05), transparent)',
                                            border: `1px solid ${p.risk_level === 'high' ? 'rgba(244,63,94,.2)' : 'rgba(245,158,11,.2)'}`,
                                            position: 'relative',
                                            display: 'flex', flexDirection: 'column',
                                            gap: '10px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{p.name}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>{Number(p.age || 0)} ปี · {p.ward}</span>
                                                        {p.drg && <span style={{ fontSize: '11px', fontWeight: 700, background: 'var(--md-bg-body)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--md-border)', color: 'var(--md-text-secondary)' }}>DRG: {p.drg}</span>}
                                                    </div>
                                                    <div style={{ marginTop: '4px' }}>
                                                        <span style={{ fontSize: '11px', color: 'var(--md-text-primary)' }}>
                                                            <strong>อ.:</strong> {p.doctor || 'ไม่ระบุ'} <span style={{ opacity: 0.6 }}>({new Date(p.regdate).toLocaleDateString('th-TH')})</span>
                                                        </span>
                                                    </div>
                                                    <div style={{ marginTop: '2px' }}>
                                                        <span style={{ fontSize: '11px', color: 'var(--md-text-primary)' }}>
                                                            <strong>Primary Dx:</strong> {p.dx_icd10} - {p.dx_name}
                                                        </span>
                                                    </div>
                                                    {p.comorbidity_count > 0 && (
                                                        <div style={{ marginTop: '2px', lineHeight: 1.3 }}>
                                                            <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                                                                <strong>โรคร่วม:</strong> <span style={{ opacity: 0.85 }}>{p.comorbidity_details}</span>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {p.op_names && (
                                                        <div style={{ marginTop: '2px' }}>
                                                            <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                                                                <strong>Oper:</strong> {p.op_names}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {p.vitals && (
                                                        <div style={{ marginTop: '2px', display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--md-text-tertiary)', flexWrap: 'wrap' }}>
                                                            <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px' }}>BP: {Math.round(p.vitals.bps || 0)}/{Math.round(p.vitals.bpd || 0)}</span>
                                                            <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px' }}>PR: {Math.round(p.vitals.pulse || 0)}</span>
                                                            <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px', color: (p.vitals.temperature >= 37.5) ? '#f43f5e' : 'inherit' }}>T: {p.vitals.temperature || '-'}°C</span>
                                                            <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px', color: (p.vitals.o2sat < 95 && p.vitals.o2sat > 0) ? '#f43f5e' : 'inherit' }}>SpO2: {p.vitals.o2sat || '-'}%</span>
                                                        </div>
                                                    )}
                                                    {p.labs && p.labs.length > 0 && (
                                                        <div style={{ marginTop: '4px', display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--md-text-tertiary)', flexWrap: 'wrap' }}>
                                                            {p.labs.map((lab, i) => (
                                                                <span key={`lab-${i}`} style={{ background: 'rgba(139,92,246,.08)', padding: '2px 6px', borderRadius: '4px', color: '#7c3aed', fontWeight: 600, border: '1px solid rgba(139,92,246,.15)' }}>{lab}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{
                                                        fontSize: '11px', fontWeight: 800, color: p.risk_level === 'high' ? '#f43f5e' : '#f59e0b',
                                                        background: p.risk_level === 'high' ? 'rgba(244,63,94,.1)' : 'rgba(245,158,11,.1)', padding: '2px 8px', borderRadius: '99px',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        LACE+ {p.total_score} ({p.risk_pct}%)
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Deep Reasons */}
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {p.los > 3 && (
                                                    <span style={{ fontSize: '11px', color: '#6366f1', background: 'rgba(99,102,241,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(99,102,241,.2)', fontWeight: 600 }}>
                                                        L - นอนนาน {p.los} วัน
                                                    </span>
                                                )}
                                                {p.er_visits_6m > 0 && (
                                                    <span style={{ fontSize: '11px', color: '#f43f5e', background: 'rgba(244,63,94,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(244,63,94,.2)', fontWeight: 600 }}>
                                                        A - เข้า ER {p.er_visits_6m} ครั้ง (6 ด.)
                                                    </span>
                                                )}
                                                {p.comorbidity_count > 0 && (
                                                    <span style={{ fontSize: '11px', color: '#f59e0b', background: 'rgba(245,158,11,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(245,158,11,.2)', fontWeight: 600 }}>
                                                        C - โรคร่วม {p.comorbidity_count} โรค
                                                    </span>
                                                )}
                                                {p.rw > 1.5 && (
                                                    <span style={{ fontSize: '11px', color: '#8b5cf6', background: 'rgba(139,92,246,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(139,92,246,.2)', fontWeight: 600 }}>
                                                        RW สูง ({Number(p.rw || 0).toFixed(2)})
                                                    </span>
                                                )}
                                                {p.age >= 70 && (
                                                    <span style={{ fontSize: '11px', color: '#64748b', background: 'rgba(100,116,139,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(100,116,139,.2)', fontWeight: 600 }}>
                                                        วัยผู้สูงอายุ
                                                    </span>
                                                )}
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '6px', border: '1px solid var(--md-border)' }}>
                                                <span style={{ fontSize: '13px', paddingTop: '1px' }}>💡</span>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    {p.recommendation.split(' | ').map((rec, i) => (
                                                        <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-primary)' }}>{rec}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* ━━━━━━ AI Deep Overstay Predictor ━━━━━━ */}
            {(losPrediction?.patients?.filter(p => p.status === 'over_stay' || p.status === 'at_risk')?.length > 0) && (
                <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <div>
                            <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                                ⌛ รายชื่อผู้ป่วยนอนเกินกำหนด (AI LOS Predictor)
                            </h3>
                            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                                เฝ้าระวังผู้ป่วยที่นอนเกินเกณฑ์มาตรฐาน DRG ของโรงพยาบาล
                            </p>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,.1)', padding: '4px 10px', borderRadius: '6px' }}>
                            {losPrediction.patients.filter(p => p.status === 'over_stay' || p.status === 'at_risk').length} ราย
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                        {losPrediction.patients.filter(p => p.status === 'over_stay' || p.status === 'at_risk')
                            .map((p, i) => (
                                <div key={i} style={{
                                    padding: '1rem', borderRadius: '12px',
                                    background: p.status === 'over_stay' ? 'linear-gradient(to right, rgba(245,158,11,.05), transparent)' : 'linear-gradient(to right, rgba(99,102,241,.05), transparent)',
                                    border: `1px solid ${p.status === 'over_stay' ? 'rgba(245,158,11,.2)' : 'rgba(99,102,241,.2)'}`,
                                    position: 'relative',
                                    display: 'flex', flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{p.name}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>{Number(p.age || 0)} ปี · {p.ward}</span>
                                                {p.drg && <span style={{ fontSize: '11px', fontWeight: 700, background: 'var(--md-bg-body)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--md-border)', color: 'var(--md-text-secondary)' }}>DRG: {p.drg}</span>}
                                            </div>
                                            <div style={{ marginTop: '4px' }}>
                                                <span style={{ fontSize: '11px', color: 'var(--md-text-primary)' }}>
                                                    <strong>Dx:</strong> {p.dx_icd10} - {p.dx_name}
                                                </span>
                                            </div>
                                            {p.op_names && (
                                                <div style={{ marginTop: '2px' }}>
                                                    <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)' }}>
                                                        <strong>Oper:</strong> {p.op_names}
                                                    </span>
                                                </div>
                                            )}
                                            {p.vitals && (
                                                <div style={{ marginTop: '2px', display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--md-text-tertiary)', flexWrap: 'wrap' }}>
                                                    <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px' }}>BP: {Math.round(p.vitals.bps || 0)}/{Math.round(p.vitals.bpd || 0)}</span>
                                                    <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px' }}>PR: {Math.round(p.vitals.pulse || 0)}</span>
                                                    <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px', color: (p.vitals.temperature >= 37.5) ? '#f43f5e' : 'inherit' }}>T: {p.vitals.temperature || '-'}°C</span>
                                                    <span style={{ background: 'var(--md-bg-body)', padding: '1px 4px', borderRadius: '3px', color: (p.vitals.o2sat < 95 && p.vitals.o2sat > 0) ? '#f43f5e' : 'inherit' }}>SpO2: {p.vitals.o2sat || '-'}%</span>
                                                </div>
                                            )}
                                            {p.labs && p.labs.length > 0 && (
                                                <div style={{ marginTop: '4px', display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--md-text-tertiary)', flexWrap: 'wrap' }}>
                                                    {p.labs.map((lab, i) => (
                                                        <span key={`lab-${i}`} style={{ background: 'rgba(139,92,246,.08)', padding: '2px 6px', borderRadius: '4px', color: '#7c3aed', fontWeight: 600, border: '1px solid rgba(139,92,246,.15)' }}>{lab}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                fontSize: '11px', fontWeight: 800, color: p.status === 'over_stay' ? '#f59e0b' : '#6366f1',
                                                background: p.status === 'over_stay' ? 'rgba(245,158,11,.1)' : 'rgba(99,102,241,.1)', padding: '2px 8px', borderRadius: '99px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                นอน {Math.round(p.current_los)} / {p.expected_los} วัน
                                            </span>
                                        </div>
                                    </div>

                                    {/* Deep Reasons */}
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                        {p.gap >= 0 && (
                                            <span style={{ fontSize: '11px', color: p.status === 'over_stay' ? '#f43f5e' : '#f59e0b', background: p.status === 'over_stay' ? 'rgba(244,63,94,.1)' : 'rgba(245,158,11,.1)', padding: '2px 6px', borderRadius: '4px', border: `1px solid ${p.status === 'over_stay' ? 'rgba(244,63,94,.2)' : 'rgba(245,158,11,.2)'}`, fontWeight: 600 }}>
                                                เกินกำหนด {Number(p.gap || 0).toFixed(1)} วัน
                                            </span>
                                        )}
                                        {p.comorbidity_count > 0 && (
                                            <span style={{ fontSize: '11px', color: '#f59e0b', background: 'rgba(245,158,11,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(245,158,11,.2)', fontWeight: 600 }}>
                                                C - โรคร่วม {p.comorbidity_count} โรค
                                            </span>
                                        )}
                                        {p.rw > 1.5 && (
                                            <span style={{ fontSize: '11px', color: '#8b5cf6', background: 'rgba(139,92,246,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(139,92,246,.2)', fontWeight: 600 }}>
                                                RW สูง ({Number(p.rw || 0).toFixed(2)})
                                            </span>
                                        )}
                                        {p.age >= 70 && (
                                            <span style={{ fontSize: '11px', color: '#64748b', background: 'rgba(100,116,139,.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(100,116,139,.2)', fontWeight: 600 }}>
                                                วัยผู้สูงอายุ
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '6px', border: '1px solid var(--md-border)' }}>
                                        <span style={{ fontSize: '13px', paddingTop: '1px' }}>💡</span>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {p.suggestion.split(' | ').map((rec, i) => (
                                                <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-primary)' }}>{rec}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}



            {/* ━━━━━━ รายได้โดยประมาณ ปีงบประมาณ ย้อนหลัง 3 ปี (IPD) ━━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้โดยประมาณ IPD — ปีงบประมาณ (3 ปีย้อนหลัง)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(139,92,246,.08)', padding: '2px 8px', borderRadius: '99px' }}>an_stat · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ipdRevenueFiscal ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />
                        <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (() => {
                    const fiscalDataIPD = state.ipdRevenueFiscal;
                    const years = fiscalDataIPD?.fiscal_years || [];
                    if (years.length === 0) return <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '2rem 0' }}>ไม่พบข้อมูลรายได้ IPD</p>;

                    const FY_COLORS = ['#94a3b8', '#8b5cf6', '#7c3aed'];

                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => {
                            row[`fy${fi}`] = (fy.months[i]?.revenue || 0);
                        });
                        return row;
                    });

                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const compMonths = latestYear.comparable_months || 12;
                    const yoyGrowth = prevYear && (prevYear.comparable_revenue ?? prevYear.total_revenue) > 0
                        ? Math.round(((latestYear.comparable_revenue ?? latestYear.total_revenue) - (prevYear.comparable_revenue ?? prevYear.total_revenue)) / (prevYear.comparable_revenue ?? prevYear.total_revenue) * 1000) / 10
                        : 0;

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Summary Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: '10px' }}>
                                {years.map((fy, fi) => {
                                    const isLatest = fi === years.length - 1;
                                    const color = FY_COLORS[fi];
                                    return (
                                        <div key={fi} style={{
                                            padding: '0.75rem 1rem', borderRadius: '12px',
                                            background: isLatest ? `linear-gradient(135deg, ${color}12, ${color}05)` : `${color}06`,
                                            border: `1px solid ${color}${isLatest ? '30' : '15'}`,
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    {fy.fiscal_label}
                                                </span>
                                                {isLatest && (
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', background: 'rgba(124,58,237,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '22px', fontWeight: 900, color, margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                                                ฿{(fy.total_revenue / 1e6).toFixed(1)}M
                                            </p>
                                            <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 600 }}>
                                                {fy.total_cases.toLocaleString()} cases · {fy.total_patients.toLocaleString()} patients · ฿{fy.avg_revenue_per_case.toLocaleString()}/case
                                            </p>
                                            {isLatest && prevYear && (
                                                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                                                        {yoyGrowth >= 0 ? '📈' : '📉'} YoY {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth}%
                                                    </span>
                                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>
                                                        vs {prevYear.fiscal_label} (เทียบ {compMonths} ด.)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Chart */}
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={40}
                                        tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1e3).toFixed(0)}K`} />
                                    <Tooltip
                                        contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}
                                        formatter={(v, name) => {
                                            const idx = Number(name.replace('fy', ''));
                                            const label = years[idx]?.fiscal_label || name;
                                            return [`฿${(v / 1e6).toFixed(2)}M`, label];
                                        }}
                                    />
                                    {years.map((fy, fi) => (
                                        <Bar key={fi} dataKey={`fy${fi}`} fill={FY_COLORS[fi]} radius={[3, 3, 0, 0]}
                                            barSize={years.length <= 2 ? 20 : 14}
                                            opacity={fi === years.length - 1 ? 1 : 0.5}
                                            name={`fy${fi}`}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Legend */}
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

            {/* ══════════════════════════════════════════════════════
                📅 BED FLOW GANTT CHART — 14 วันย้อนหลัง
            ══════════════════════════════════════════════════════ */}
            <BedFlowChart
                data={state.bedFlow}
                loading={loading.bedFlow}
            />

            {/* ══════════════════════════════════════════════════════
                📋 DISCHARGE PLANNING BOARD — วันนี้ / พรุ่งนี้
            ══════════════════════════════════════════════════════ */}
            <DischargePlanningBoard
                data={state.dischargePlanning}
                loading={loading.dischargePlanning}
            />

        </div>
    );
}

// ─── Bed Flow Gantt Chart ─────────────────────────────────────────────────────
function BedFlowChart({ data, loading }) {
    const [activeWard, setActiveWard] = React.useState('all');

    if (loading) {
        return (
            <div style={{ marginTop: '24px', padding: '20px', background: 'var(--md-surface-1)', borderRadius: '14px', border: '1px solid var(--md-border)' }}>
                <div style={{ height: '20px', width: '200px', background: 'var(--md-surface-2)', borderRadius: '6px', marginBottom: '14px' }} />
                <div style={{ height: '180px', background: 'var(--md-surface-2)', borderRadius: '10px' }} />
            </div>
        );
    }
    if (!data?.flow?.length) return null;

    const wards = ['all', ...(data.wards || [])];
    const wardNames = {};
    data.flow.forEach(f => { wardNames[f.ward] = f.ward_name || f.ward; });

    const filtered = activeWard === 'all' ? data.flow : data.flow.filter(f => f.ward === activeWard);

    // Group by date, sum across selected wards
    const byDate = {};
    filtered.forEach(f => {
        if (!byDate[f.date]) byDate[f.date] = { date: f.date, admissions: 0, discharges: 0 };
        byDate[f.date].admissions += f.admissions;
        byDate[f.date].discharges += f.discharges;
    });
    const chartData = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date)).map(d => ({
        ...d,
        label: new Date(d.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        net: d.admissions - d.discharges,
    }));

    return (
        <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '4px', height: '28px', background: 'linear-gradient(180deg,#0ea5e9,#6366f1)', borderRadius: '2px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--md-text-primary)' }}>📊 Bed Flow — 14 วันย้อนหลัง</h3>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>Admit vs Discharge per Ward · HOSxP XE</span>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {wards.slice(0, 6).map(w => (
                        <button key={w} onClick={() => setActiveWard(w)} style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: 700, border: 'none', cursor: 'pointer', background: activeWard === w ? '#6366f1' : 'var(--md-surface-2)', color: activeWard === w ? '#fff' : 'var(--md-text-secondary)', transition: 'all 0.15s' }}>
                            {w === 'all' ? 'ทุกวอร์ด' : (wardNames[w] || w)}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '16px' }}>
                <ResponsiveContainer width="100%" height={200}>
                    <ComposedChart data={chartData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                        <XAxis dataKey="label" tick={{ fill: 'var(--md-text-tertiary)', fontSize: 10 }} />
                        <YAxis tick={{ fill: 'var(--md-text-tertiary)', fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ background: 'var(--md-surface-1)', border: '1px solid var(--md-border)', borderRadius: '8px', fontSize: '11px' }}
                            formatter={(v, n) => [`${v} ราย`, n === 'admissions' ? 'รับใหม่' : n === 'discharges' ? 'จำหน่าย' : 'Net Flow']}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} formatter={v => v === 'admissions' ? 'รับใหม่' : v === 'discharges' ? 'จำหน่าย' : 'Net'} />
                        <Bar dataKey="admissions" fill="#6366f1" fillOpacity={0.8} radius={[3, 3, 0, 0]} />
                        <Bar dataKey="discharges" fill="#10b981" fillOpacity={0.8} radius={[3, 3, 0, 0]} />
                        <Line type="monotone" dataKey="net" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', justifyContent: 'center' }}>
                    {[
                        { label: 'รวมรับ 14 วัน', value: chartData.reduce((s, d) => s + d.admissions, 0), color: '#6366f1' },
                        { label: 'รวมจำหน่าย 14 วัน', value: chartData.reduce((s, d) => s + d.discharges, 0), color: '#10b981' },
                        { label: 'Net (รับ - จำหน่าย)', value: chartData.reduce((s, d) => s + d.net, 0), color: '#f59e0b' },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: s.color }}>{s.value >= 0 ? '+' : ''}{s.value}</div>
                            <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Discharge Planning Board ─────────────────────────────────────────────────
function DischargePlanningBoard({ data, loading }) {
    const [filter, setFilter] = React.useState('all');

    if (loading) {
        return (
            <div style={{ marginTop: '24px', marginBottom: '32px', padding: '20px', background: 'var(--md-surface-1)', borderRadius: '14px', border: '1px solid var(--md-border)' }}>
                <div style={{ height: '20px', width: '240px', background: 'var(--md-surface-2)', borderRadius: '6px', marginBottom: '14px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                    {[1, 2, 3].map(i => <div key={i} style={{ height: '60px', background: 'var(--md-surface-2)', borderRadius: '10px' }} />)}
                </div>
            </div>
        );
    }
    if (!data) return null;

    const { today_count = 0, tomorrow_count = 0, total = 0, patients = [] } = data;
    const filtered = filter === 'all' ? patients : patients.filter(p => p.discharge_window === filter);

    const windowColor = { today: '#f43f5e', tomorrow: '#f59e0b', upcoming: '#10b981' };
    const windowLabel = { today: 'วันนี้', tomorrow: 'พรุ่งนี้', upcoming: 'กำลังมา' };

    return (
        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '4px', height: '28px', background: 'linear-gradient(180deg,#10b981,#0ea5e9)', borderRadius: '2px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--md-text-primary)' }}>📋 Discharge Planning Board</h3>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>คาดการณ์จาก adjRW × 4d — ผู้ป่วยที่น่าจะจำหน่ายวันนี้/พรุ่งนี้</span>
                </div>
            </div>

            {/* Summary KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '16px' }}>
                {[
                    { label: 'จำหน่ายวันนี้', value: today_count, color: '#f43f5e', key: 'today' },
                    { label: 'จำหน่ายพรุ่งนี้', value: tomorrow_count, color: '#f59e0b', key: 'tomorrow' },
                    { label: 'รวมทั้งหมด', value: total, color: '#10b981', key: 'all' },
                ].map((k, i) => (
                    <button key={i} onClick={() => setFilter(k.key)} style={{ padding: '14px', background: filter === k.key ? `${k.color}15` : 'var(--md-surface-2)', border: `1px solid ${filter === k.key ? k.color : 'var(--md-border)'}`, borderTop: `3px solid ${k.color}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>{k.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: k.color }}>{k.value}</div>
                        <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>ราย</div>
                    </button>
                ))}
            </div>

            {/* Patient table */}
            {filtered.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', background: 'var(--md-surface-2)', borderRadius: '12px', border: '1px solid var(--md-border)' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>ไม่มีผู้ป่วยที่คาดว่าจะจำหน่ายในช่วงนี้</div>
                </div>
            ) : (
                <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--md-border)', background: 'var(--md-surface-1)' }}>
                                    {['ผู้ป่วย', 'Ward', 'รับวันที่', 'LOS ปัจจุบัน', 'คาดจำหน่าย', 'adjRW', 'แพทย์', 'สถานะ'].map(h => (
                                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '10px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.slice(0, 20).map((p, i) => {
                                    const wColor = windowColor[p.discharge_window] || '#64748b';
                                    const expectedDate = p.expected_discharge ? new Date(p.expected_discharge).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '—';
                                    const admitDate = p.regdate ? new Date(p.regdate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '—';
                                    return (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--md-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                                            <td style={{ padding: '9px 12px', fontWeight: 600 }}>{p.patient_name || `HN ${p.hn}`}</td>
                                            <td style={{ padding: '9px 12px', color: 'var(--md-text-secondary)' }}>{p.ward}</td>
                                            <td style={{ padding: '9px 12px', color: 'var(--md-text-tertiary)' }}>{admitDate}</td>
                                            <td style={{ padding: '9px 12px', fontWeight: 700, color: p.current_los > p.expected_los ? '#f43f5e' : 'var(--md-text-primary)' }}>{p.current_los} วัน</td>
                                            <td style={{ padding: '9px 12px', fontWeight: 700 }}>{expectedDate}</td>
                                            <td style={{ padding: '9px 12px', color: '#8b5cf6', fontWeight: 700 }}>{Number(p.rw).toFixed(2)}</td>
                                            <td style={{ padding: '9px 12px', color: 'var(--md-text-tertiary)', fontSize: '11px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.doctor_name || '—'}</td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <span style={{ background: `${wColor}15`, color: wColor, border: `1px solid ${wColor}40`, borderRadius: '99px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                                    {windowLabel[p.discharge_window] || '—'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length > 20 && (
                        <div style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', color: 'var(--md-text-tertiary)', borderTop: '1px solid var(--md-border)' }}>
                            แสดง 20 จาก {filtered.length} ราย
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default React.memo(IPDTab);
