// ============================================================
// FinanceTabV2 — Migration showcase.
//
// Demonstrates the full playbook applied to Finance:
//   - KPICardV3 for all KPIs
//   - SectionCard + ChartCard + StatChip + InsightBadge
//   - grid-cols-kpi-auto for responsive KPI row
//   - 4 states: loading / empty / data / error
//   - Dark-mode safe (no hardcoded colours)
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, AreaChart, Area, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPICardV3 from './shared/KPICardV3.jsx';
import SectionCard from './shared/SectionCard.jsx';
import ChartCard from './shared/ChartCard.jsx';
import StatChip from './shared/StatChip.jsx';
import InsightBadge from './shared/InsightBadge.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import { chart, color } from '../theme/tokens.js';
import { cn, t, fmt } from '../theme/compose.js';

const PTTYPE_COLORS = [color.primary, color.info, color.accent, color.warning, color.ai, '#fb6340'];

function useFinanceData() {
    const { state, fetchData } = useDashboard();
    useEffect(() => {
        fetchData?.('financeSummary', '/api/finance/summary');
        fetchData?.('revenueTrend30d', '/api/finance/revenue-trend?days=30');
        fetchData?.('denialBreakdown', '/api/finance/denial-breakdown');
        fetchData?.('pttypeRevenue', '/api/finance/pttype-revenue');
        fetchData?.('financeAI', '/api/ai/finance/narrative');
    }, [fetchData]);

    return {
        summary: state.financeSummary,
        trend: state.revenueTrend30d,
        denial: state.denialBreakdown,
        pttype: state.pttypeRevenue,
        ai: state.financeAI,
        loading: state.loading?.financeSummary,
        error: state.errors?.financeSummary,
    };
}

export default function FinanceTabV2() {
    const { summary, trend, denial, pttype, ai, loading, error } = useFinanceData();

    const kpis = useMemo(() => {
        const s = summary || {};
        return [
            {
                title: 'REVENUE TODAY', thTitle: 'รายได้วันนี้',
                value: s.revenue_today, format: 'currency',
                color: 'primary', icon: '💰',
                status: 'good',
                trend: s.revenue_trend_pct, trendLabel: 'vs เมื่อวาน',
                aiHint: s.revenue_trend_pct > 10 ? 'รายได้โตชัด ตรวจสอบ seasonal factor' : undefined,
            },
            {
                title: 'MTD REVENUE', thTitle: 'รายได้เดือนนี้',
                value: s.revenue_mtd, format: 'currency',
                color: 'accent', icon: '📈',
                status: 'good',
                target: s.revenue_target_mtd, targetLabel: 'เป้าเดือน',
                trend: s.revenue_mtd_trend_pct, trendLabel: 'vs เดือนก่อน',
            },
            {
                title: 'COLLECTION RATE', thTitle: 'อัตราการจัดเก็บ',
                value: s.collection_rate != null ? s.collection_rate / 100 : null,
                format: 'percent',
                color: s.collection_rate >= 95 ? 'accent' : s.collection_rate >= 85 ? 'warning' : 'danger',
                icon: '🎯',
                status: s.collection_rate >= 95 ? 'good' : s.collection_rate >= 85 ? 'warning' : 'danger',
                target: 0.95, targetLabel: 'เป้า',
                aiHint: s.collection_rate < 85 ? 'อัตราต่ำ — ตรวจกลุ่ม pttype ที่จ่ายช้า' : undefined,
            },
            {
                title: 'AR BALANCE', thTitle: 'ยอดค้างรับ',
                value: s.ar_balance, format: 'currency',
                color: 'warning', icon: '⏳',
                status: 'warning',
                trend: s.ar_balance_trend_pct, trendLabel: 'vs เดือนก่อน',
                aiHint: s.ar_aged_90plus > 1000000 ? `${fmt.currency(s.ar_aged_90plus)} ค้างเกิน 90 วัน` : undefined,
            },
            {
                title: 'DENIAL RATE', thTitle: 'อัตรา Claim ไม่ผ่าน',
                value: s.denial_rate != null ? s.denial_rate / 100 : null,
                format: 'percent',
                color: s.denial_rate <= 5 ? 'accent' : s.denial_rate <= 10 ? 'warning' : 'danger',
                status: s.denial_rate <= 5 ? 'good' : s.denial_rate <= 10 ? 'warning' : 'danger',
                icon: '🛑',
                target: 0.05, targetLabel: '≤',
            },
            {
                title: 'UNDER-CHARGING', thTitle: 'บิลต่ำกว่าที่ควร',
                value: s.undercharging_count, format: 'number',
                color: 'ai', icon: '🔍',
                status: 'info',
                aiHint: 'คลิกเพื่อดู AI-detected cases',
            },
        ];
    }, [summary]);

    // ── 4-state handling ─────────────────────────────────────
    if (loading && !summary) return <TabLoadingSkeleton />;
    if (error) return <EmptyState title="โหลดข้อมูล Finance ไม่ได้" subtitle={error} />;
    if (!summary) return <EmptyState title="ยังไม่มีข้อมูล Finance" />;

    return (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
            {/* Status bar */}
            <div className="flex flex-wrap items-center gap-2">
                <StatChip status="info">FINANCE</StatChip>
                <StatChip status={summary.denial_rate > 10 ? 'danger' : summary.denial_rate > 5 ? 'warning' : 'good'}>
                    Denial {(summary.denial_rate ?? 0).toFixed(1)}%
                </StatChip>
                <StatChip status={summary.collection_rate >= 95 ? 'good' : 'warning'}>
                    Collection {(summary.collection_rate ?? 0).toFixed(1)}%
                </StatChip>
                <span className="ml-auto text-fs-2xs text-[color:var(--md-text-tertiary)] font-mono">
                    อัปเดต {summary.generated_at ? new Date(summary.generated_at).toLocaleTimeString('th-TH') : '—'}
                </span>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-kpi-auto gap-3 sm:gap-4">
                {kpis.map((k, i) => <KPICardV3 key={i} {...k} loading={loading} />)}
            </div>

            {/* Main trend */}
            <ChartCard
                title="แนวโน้มรายได้ 30 วัน"
                subtitle="เปรียบเทียบ YoY + ค่าเฉลี่ย 7 วัน"
                icon="📈"
                series={[
                    { label: 'ปีนี้',      color: chart.primary },
                    { label: 'ปีที่แล้ว',   color: chart.comparison },
                    { label: 'ค่าเฉลี่ย 7 วัน', color: chart.baseline, dashed: true },
                ]}
                height={300}
                empty={!trend?.series?.length}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend?.series || []} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="finRevFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor={chart.primary} stopOpacity={0.28} />
                                <stop offset="100%" stopColor={chart.primary} stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                        <XAxis dataKey="d" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={v => `฿${(v / 1e6).toFixed(1)}M`} tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v) => fmt.currency(v)} />
                        <Area type="monotone" dataKey="revenue"  stroke={chart.primary}    strokeWidth={2.5} fill="url(#finRevFill)" isAnimationActive={false} />
                        <Line type="monotone" dataKey="previous" stroke={chart.comparison} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                        <Line type="monotone" dataKey="ma7"      stroke={chart.baseline}   strokeWidth={1.5} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Two-column: denial + pttype */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ChartCard
                    title="Denial by Reason"
                    subtitle="30 วันที่ผ่านมา"
                    icon="🛑"
                    series={[{ label: 'จำนวนเคส', color: chart.dangerLine }]}
                    height={260}
                    empty={!denial?.reasons?.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={denial?.reasons || []} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" horizontal={false} />
                            <XAxis type="number" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="reason" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} width={110} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill={chart.dangerLine} radius={[0, 4, 4, 0]} isAnimationActive={false} />
                            <ReferenceLine x={denial?.threshold || 0} stroke={chart.baseline} strokeDasharray="3 3" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Revenue by สิทธิการรักษา"
                    subtitle="สัดส่วนตาม pttype เดือนนี้"
                    icon="🏷️"
                    height={260}
                    empty={!pttype?.breakdown?.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pttype?.breakdown || []}
                                dataKey="revenue"
                                nameKey="label"
                                innerRadius={48}
                                outerRadius={92}
                                paddingAngle={2}
                                isAnimationActive={false}
                            >
                                {(pttype?.breakdown || []).map((_, i) => (
                                    <Cell key={i} fill={PTTYPE_COLORS[i % PTTYPE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(v) => fmt.currency(v)} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* AR aging + AI narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                <SectionCard title="A/R Aging" subtitle="ยอดค้างรับแยกตามช่วงเวลา" icon="⏳">
                    <div className="space-y-2">
                        {[
                            { key: '0_30',     label: '0-30 วัน',  status: 'good'    },
                            { key: '31_60',    label: '31-60 วัน', status: 'info'    },
                            { key: '61_90',    label: '61-90 วัน', status: 'warning' },
                            { key: '90_plus',  label: '90+ วัน',   status: 'danger'  },
                        ].map((row) => {
                            const v = Number(summary?.ar_aging?.[row.key] || 0);
                            const total = Number(summary?.ar_balance || 1);
                            const pct = Math.round((v / total) * 100) || 0;
                            return (
                                <div key={row.key}>
                                    <div className="flex items-center justify-between text-fs-xs mb-1">
                                        <div className="flex items-center gap-2">
                                            <StatChip status={row.status}>{pct}%</StatChip>
                                            <span className={t.body}>{row.label}</span>
                                        </div>
                                        <span className="font-mono tabular-nums text-[color:var(--md-text-primary)]">
                                            {fmt.currency(v)}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-[color:var(--md-surface-2)] overflow-hidden">
                                        <div
                                            className={cn(
                                                'h-full rounded-full transition-all duration-500',
                                                row.status === 'good'    && 'bg-accent-500',
                                                row.status === 'info'    && 'bg-info-500',
                                                row.status === 'warning' && 'bg-warning-500',
                                                row.status === 'danger'  && 'bg-danger-500',
                                            )}
                                            style={{ width: `${pct}%` }}
                                            role="progressbar"
                                            aria-valuenow={pct}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>

                {ai && (
                    <SectionCard
                        title="AI Finance Narrative"
                        subtitle="สรุปโดย Claude + rule-based"
                        icon="✨"
                        accent="ai"
                    >
                        <div className="space-y-2">
                            {ai.headline && (
                                <p className={cn(t.body, 'leading-snug font-semibold')}>
                                    {ai.headline}
                                </p>
                            )}
                            {ai.analysis && (
                                <p className={cn(t.bodyDim, 'leading-snug')}>
                                    {ai.analysis}
                                </p>
                            )}
                            {Array.isArray(ai.recommendations) && ai.recommendations.slice(0, 3).map((r, i) => (
                                <InsightBadge
                                    key={i}
                                    priority={r.priority || 'MEDIUM'}
                                    source={ai.source || 'claude'}
                                >
                                    {r.message || r.text || r.label}
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
