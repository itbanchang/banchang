// ============================================================
// IPDTabV2 — Clinical flagship migration to the new design system.
//
// Follows docs/design/migration-playbook.md:
//   - KPICardV3 for all KPIs
//   - SectionCard + ChartCard
//   - grid-cols-kpi-auto responsive row
//   - 4 states handled
//   - NEWS2 critical watchlist + readmission + LOS + occupancy
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICardV3 from './shared/KPICardV3.jsx';
import SectionCard from './shared/SectionCard.jsx';
import ChartCard from './shared/ChartCard.jsx';
import StatChip from './shared/StatChip.jsx';
import InsightBadge from './shared/InsightBadge.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import { chart } from '../theme/tokens.js';
import { cn, t } from '../theme/compose.js';

function useIPDData() {
    const { state, fetchData } = useDashboard();
    useEffect(() => {
        fetchData?.('ipdSummary',       '/api/ipd/summary');
        fetchData?.('ipdLosTrend',      '/api/ipd/los-trend?days=30');
        fetchData?.('ipdReadmissions',  '/api/ipd/readmissions?days=60');
        fetchData?.('ipdOccupancy',     '/api/ipd/occupancy-by-ward');
        fetchData?.('ipdAI',            '/api/ai/ipd/narrative');
    }, [fetchData]);

    return {
        summary:    state.ipdSummary,
        losTrend:   state.ipdLosTrend,
        readmits:   state.ipdReadmissions,
        occupancy:  state.ipdOccupancy,
        ai:         state.ipdAI,
        loading:    state.loading?.ipdSummary,
        error:      state.errors?.ipdSummary,
    };
}

function WardOccupancyBar({ ward, occupancy, capacity }) {
    const pct = capacity > 0 ? Math.round((occupancy / capacity) * 100) : 0;
    const status = pct >= 95 ? 'danger' : pct >= 85 ? 'warning' : 'good';
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-fs-xs">
                <div className="flex items-center gap-2">
                    <StatChip status={status}>{pct}%</StatChip>
                    <span className={t.body}>{ward}</span>
                </div>
                <span className="font-mono tabular-nums text-[color:var(--md-text-tertiary)]">
                    {occupancy}/{capacity}
                </span>
            </div>
            <div className="h-2 rounded-full bg-[color:var(--md-surface-2)] overflow-hidden">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-500',
                        status === 'good' && 'bg-accent-500',
                        status === 'warning' && 'bg-warning-500',
                        status === 'danger' && 'bg-danger-500',
                    )}
                    style={{ width: `${Math.min(100, pct)}%` }}
                    role="progressbar" aria-valuenow={pct} aria-valuemax={100}
                />
            </div>
        </div>
    );
}

export default function IPDTabV2() {
    const { summary, losTrend, readmits, occupancy, ai, loading, error } = useIPDData();

    const kpis = useMemo(() => {
        const s = summary || {};
        return [
            {
                title: 'ACTIVE ADMITS', thTitle: 'ผู้ป่วยใน ณ ขณะนี้',
                value: s.active_admits,
                color: 'primary', icon: '🏥', status: 'info',
                trend: s.trend_pct, trendLabel: 'vs เมื่อวาน',
            },
            {
                title: 'BED OCCUPANCY', thTitle: 'อัตราครองเตียง',
                value: s.occupancy_rate != null ? s.occupancy_rate / 100 : null,
                format: 'percent',
                status: (s.occupancy_rate ?? 0) >= 95 ? 'danger' : (s.occupancy_rate ?? 0) >= 85 ? 'warning' : 'good',
                color:  (s.occupancy_rate ?? 0) >= 95 ? 'danger' : (s.occupancy_rate ?? 0) >= 85 ? 'warning' : 'accent',
                icon: '🛏️',
                target: 0.85, targetLabel: 'เป้า',
                aiHint: (s.occupancy_rate ?? 0) >= 95 ? 'เต็ม — เตรียมแผน surge' : undefined,
            },
            {
                title: 'AVG LOS', thTitle: 'ระยะเวลานอนเฉลี่ย',
                value: s.avg_los, format: 'decimal',
                color: 'info', icon: '📅', status: 'info',
                target: s.expected_los, targetLabel: 'คาดหวัง',
                trend: s.los_trend_pct, trendLabel: 'vs เดือนก่อน',
            },
            {
                title: '30-D READMIT', thTitle: 'Readmit 30 วัน',
                value: s.readmission_rate != null ? s.readmission_rate / 100 : null,
                format: 'percent',
                status: (s.readmission_rate ?? 0) <= 10 ? 'good' : (s.readmission_rate ?? 0) <= 15 ? 'warning' : 'danger',
                color:  (s.readmission_rate ?? 0) <= 10 ? 'accent' : 'warning',
                icon: '↩️', target: 0.10, targetLabel: '≤',
                aiHint: (s.readmission_rate ?? 0) > 15 ? 'สูงกว่าเป้า — review discharge planning' : undefined,
            },
            {
                title: 'NEWS2 CRITICAL', thTitle: 'ผู้ป่วยวิกฤต (≥7)',
                value: s.news2_critical,
                status: (s.news2_critical ?? 0) > 0 ? 'danger' : 'good',
                color:  (s.news2_critical ?? 0) > 0 ? 'danger' : 'accent',
                icon: '🚨', target: 0, targetLabel: 'เป้า',
                aiHint: (s.news2_critical ?? 0) > 0 ? 'เรียก RRT ทันที' : undefined,
            },
            {
                title: 'AdjRW TOTAL', thTitle: 'AdjRW รวม (30d)',
                value: s.adjrw_sum_30d, format: 'decimal',
                color: 'ai', icon: '🧮', status: 'info',
            },
        ];
    }, [summary]);

    if (loading && !summary) return <TabLoadingSkeleton />;
    if (error)   return <EmptyState title="โหลดข้อมูล IPD ไม่ได้" subtitle={error} />;
    if (!summary) return <EmptyState title="ยังไม่มีข้อมูล IPD" />;

    return (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
            {/* Status bar */}
            <div className="flex flex-wrap items-center gap-2">
                <StatChip status="info">IPD</StatChip>
                <StatChip status={(summary.occupancy_rate ?? 0) >= 95 ? 'danger' : (summary.occupancy_rate ?? 0) >= 85 ? 'warning' : 'good'}>
                    Occupancy {(summary.occupancy_rate ?? 0).toFixed(0)}%
                </StatChip>
                {summary.news2_critical > 0 && (
                    <StatChip status="danger" icon="⚠️">NEWS2 ≥7: {summary.news2_critical}</StatChip>
                )}
                <span className="ml-auto text-fs-2xs text-[color:var(--md-text-tertiary)] font-mono">
                    {summary.generated_at ? new Date(summary.generated_at).toLocaleTimeString('th-TH') : '—'}
                </span>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-kpi-auto gap-3 sm:gap-4">
                {kpis.map((k, i) => <KPICardV3 key={i} {...k} loading={loading} />)}
            </div>

            {/* LOS trend + Readmission trend */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ChartCard
                    title="LOS รายเดือน" subtitle="30 วันล่าสุด" icon="📅"
                    series={[
                        { label: 'LOS เฉลี่ย (วัน)', color: chart.primary },
                        { label: 'เป้า',             color: chart.baseline, dashed: true },
                    ]}
                    height={260}
                    empty={!losTrend?.series?.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={losTrend?.series || []} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="ipdLosFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%"   stopColor={chart.primary} stopOpacity={0.3} />
                                    <stop offset="100%" stopColor={chart.primary} stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                            <XAxis dataKey="d" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="avg_los" stroke={chart.primary} strokeWidth={2} fill="url(#ipdLosFill)" isAnimationActive={false} />
                            <Line type="monotone" dataKey="target"  stroke={chart.baseline} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Readmission 30 วัน" subtitle="สัดส่วนย้อนหลัง 60 วัน" icon="↩️"
                    series={[{ label: 'Readmission %', color: chart.dangerLine }]}
                    height={260}
                    empty={!readmits?.series?.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={readmits?.series || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                            <XAxis dataKey="d" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={v => `${v}%`} tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip formatter={v => `${Number(v).toFixed(1)}%`} />
                            <Line type="monotone" dataKey="rate" stroke={chart.dangerLine} strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Ward occupancy + AI insights */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                <SectionCard title="Occupancy per Ward" subtitle="สัดส่วนเตียงที่ใช้งาน" icon="🏥">
                    {Array.isArray(occupancy?.wards) && occupancy.wards.length ? (
                        <div className="space-y-3">
                            {occupancy.wards.map(w => (
                                <WardOccupancyBar
                                    key={w.ward}
                                    ward={w.ward_name || w.ward}
                                    occupancy={Number(w.occupied || 0)}
                                    capacity={Number(w.capacity || 0)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className={t.bodyDim}>รอข้อมูลเตียง — endpoint /api/ipd/occupancy-by-ward</p>
                    )}
                </SectionCard>

                {ai && (
                    <SectionCard title="AI IPD Narrative" subtitle="จาก Claude + rule-based" icon="✨" accent="ai">
                        <div className="space-y-2">
                            {ai.headline && <p className={cn(t.body, 'font-semibold leading-snug')}>{ai.headline}</p>}
                            {ai.analysis && <p className={cn(t.bodyDim, 'leading-snug')}>{ai.analysis}</p>}
                            {Array.isArray(ai.recommendations) && ai.recommendations.slice(0, 3).map((r, i) => (
                                <InsightBadge
                                    key={i}
                                    priority={r.priority || 'MEDIUM'}
                                    source={ai.source || 'claude'}
                                >
                                    {r.message || r.text}
                                </InsightBadge>
                            ))}
                            {ai.source && (
                                <div className="pt-2 text-fs-2xs text-[color:var(--md-text-tertiary)] font-mono">
                                    source: {ai.source} • confidence: {ai.confidence != null ? `${Math.round(ai.confidence * 100)}%` : '—'}
                                </div>
                            )}
                        </div>
                    </SectionCard>
                )}
            </div>
        </div>
    );
}
