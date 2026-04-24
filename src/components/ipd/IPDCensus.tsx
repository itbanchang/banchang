import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

interface WardChartItem {
    name: string;
    occupancy: number;
    occupied: number;
    total: number;
}

interface BedSummary {
    occupied?: number;
    total_beds?: number;
    occupancy_rate?: number;
}

export interface IPDCensusProps {
    bedSummary: BedSummary | undefined;
    wardChart: WardChartItem[];
    loading: boolean;
    hoverHero: boolean;
    setHoverHero: (v: boolean) => void;
    hoverKpi: number | null;
    setHoverKpi: (v: number | null) => void;
    openDrillDown: (id: string, title: string, endpoint: string) => void;
    alosData: any;
    readmission: any;
    losPrediction: any;
    loadingAlos: boolean;
    loadingReadmission: boolean;
    loadingLosPrediction: boolean;
}

export const IPDCensus = React.memo(function IPDCensus({
    bedSummary, wardChart, loading, hoverHero, setHoverHero,
    hoverKpi, setHoverKpi, openDrillDown,
    alosData, readmission, losPrediction,
    loadingAlos, loadingReadmission, loadingLosPrediction,
}: IPDCensusProps) {

    const occ = bedSummary?.occupied ?? 0;
    const total = bedSummary?.total_beds ?? 0;
    const rate = bedSummary?.occupancy_rate ?? 0;
    const avail = total - occ;
    const occColor = rate > 90 ? '#f43f5e' : rate > 80 ? '#f59e0b' : '#10b981';

    const kpis = [
        {
            title: 'ระยะนอนเฉลี่ย', value: alosData?.summary?.overall_alos ?? '—', icon: '⏱️', unit: 'วัน/ราย',
            grad: ['#0ea5e9', '#0284c7'], glow: 'rgba(14,165,233,.2)',
            loading: loadingAlos,
            drillDownId: 'ipd_alos',
            drillDownEndpoint: '/api/ipd/drilldown?type=alos'
        },
        {
            title: 'เสี่ยง Re-admit', value: (readmission?.patients?.filter((p: any) => ['high', 'moderate'].includes(p.risk_level))?.length) ?? 0, icon: '🧠', unit: 'ราย',
            grad: ((readmission?.patients?.filter((p: any) => ['high', 'moderate'].includes(p.risk_level))?.length) ?? 0) > 5 ? ['#f43f5e', '#dc2626'] : ['#f59e0b', '#d97706'],
            glow: 'rgba(245,158,11,.2)',
            loading: loadingReadmission,
            drillDownId: 'ipd_readmit',
            drillDownEndpoint: '/api/ipd/drilldown?type=readmit'
        },
        {
            title: 'นอนเกินกำหนด', value: (losPrediction?.patients?.filter((p: any) => ['over_stay', 'at_risk'].includes(p.status))?.length) ?? 0, icon: '⌛', unit: 'ราย',
            grad: ((losPrediction?.patients?.filter((p: any) => ['over_stay', 'at_risk'].includes(p.status))?.length) ?? 0) > 10 ? ['#f43f5e', '#dc2626'] : ['#f59e0b', '#d97706'],
            glow: 'rgba(245,158,11,.2)',
            loading: loadingLosPrediction,
            drillDownId: 'ipd_alos',
            drillDownEndpoint: '/api/ipd/drilldown?type=alos'
        },
    ];

    return (
        <>
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

                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '120px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6366f1', margin: 0 }}>
                                    🏥 ผู้ป่วยนอนอยู่ ณ ขณะนี้ <span style={{ fontSize: '12px', opacity: 0.7, textTransform: 'none' }}>(ไม่รวม Home Ward)</span>
                                </p>
                                <span style={{ fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(99,102,241,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                    Real-time
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '42px', fontWeight: 900, color: '#6366f1', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(99,102,241,.3)' }}>
                                    {occ.toLocaleString('th-TH')}
                                </span>
                                <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>/ {total.toLocaleString('th-TH')} เตียง</span>
                                <span style={{
                                    fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                    background: `${occColor}15`, color: occColor,
                                }}>
                                    {rate}% ครองเตียง
                                </span>
                            </div>

                            {/* Occupancy bar */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: occColor }}>🛏️ ครองเตียง {occ} ({rate}%)</span>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>ว่าง {avail} เตียง</span>
                                </div>
                                <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(16,185,129,.12)', display: 'flex' }}>
                                    <div style={{ width: `${Math.min(100, rate)}%`, background: `linear-gradient(90deg, ${occColor}, ${occColor}cc)`, borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                    <div style={{ flex: 1, background: 'rgba(16,185,129,.2)', borderRadius: '0 99px 99px 0' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Mini KPI Cards ── */}
                {kpis.map((kpi, i) => (
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
                                    <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>
                                        {kpi.title}
                                    </span>
                                    <span style={{ fontSize: '18px' }}>{kpi.icon}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                    <span style={{ fontSize: '28px', fontWeight: 900, color: kpi.grad[0], letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                                    </span>
                                    {kpi.unit && <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Ward Occupancy */}
            <div className="chart-container">
                <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                    🏥 Ward Occupancy Census
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={wardChart} layout="vertical">
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(203,213,225,.4)" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false}
                            tickFormatter={(v: number) => `${v}%`} />
                        <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(124,58,237,.04)' }}
                            contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.08)' }}
                            formatter={(v: any, n: any, p: any) => [`${v}% (${p.payload.occupied}/${p.payload.total} เตียง)`, 'Occupancy']}
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
        </>
    );
});
