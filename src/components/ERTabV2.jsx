// ============================================================
// ERTabV2 — Real-time ER showcase using the new design system.
//
// Follows docs/design/migration-playbook.md:
//   - Live status chip + triage distribution
//   - KPICardV3 for: time-to-doctor, boarding, LWBS, surge
//   - Hourly arrival chart + triage mix donut
//   - Live triage queue list
//   - AI surge alert + boarding alert
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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
import { cn, t } from '../theme/compose.js';

// Triage 1 = most acute (red), 5 = non-urgent (green)
const TRIAGE_COLORS = [color.danger, '#fb6340', color.warning, color.info, color.accent];

function useERData() {
    const { state, fetchData } = useDashboard();
    useEffect(() => {
        fetchData?.('erSummary',  '/api/er/summary');
        fetchData?.('erHourly',   '/api/er/hourly-arrivals');
        fetchData?.('erQueue',    '/api/er/live-queue');
        fetchData?.('erAI',       '/api/ai/er/narrative');
        // Poll live queue every 15s
        const t = setInterval(() => fetchData?.('erQueue', '/api/er/live-queue'), 15000);
        return () => clearInterval(t);
    }, [fetchData]);

    return {
        summary: state.erSummary,
        hourly:  state.erHourly,
        queue:   state.erQueue,
        ai:      state.erAI,
        loading: state.loading?.erSummary,
        error:   state.errors?.erSummary,
    };
}

export default function ERTabV2() {
    const { summary, hourly, queue, ai, loading, error } = useERData();

    const surgeStatus = useMemo(() => {
        const ratio = summary?.surge_ratio ?? 0;
        if (ratio > 1.2) return { status: 'danger',  label: '🚨 SURGE', color: 'danger'  };
        if (ratio > 0.8) return { status: 'warning', label: '⚠️ BUSY',  color: 'warning' };
        return { status: 'good', label: '✅ ปกติ', color: 'accent' };
    }, [summary]);

    const kpis = useMemo(() => {
        const s = summary || {};
        return [
            {
                title: 'ACTIVE CENSUS', thTitle: 'ผู้ป่วย ER ปัจจุบัน',
                value: s.census, color: surgeStatus.color, icon: '🚑',
                status: surgeStatus.status,
                target: s.capacity, targetLabel: 'เตียง',
                aiHint: surgeStatus.status === 'danger' ? 'เกินขีดความสามารถ — เตรียม surge plan' : undefined,
            },
            {
                title: 'TIME TO DOCTOR', thTitle: 'เวลารอพบแพทย์',
                value: s.avg_time_to_doctor, format: 'number',
                status: (s.avg_time_to_doctor ?? 0) > 30 ? 'danger' : (s.avg_time_to_doctor ?? 0) > 15 ? 'warning' : 'good',
                color: (s.avg_time_to_doctor ?? 0) > 30 ? 'danger' : 'accent',
                icon: '⏱️', target: 30, targetLabel: 'นาที',
            },
            {
                title: 'BOARDING HRS', thTitle: 'รอเตียง IPD',
                value: s.avg_boarding_hours, format: 'decimal',
                status: (s.avg_boarding_hours ?? 0) > 6 ? 'danger' : (s.avg_boarding_hours ?? 0) > 4 ? 'warning' : 'good',
                color: (s.avg_boarding_hours ?? 0) > 6 ? 'danger' : 'warning',
                icon: '🛏️', target: 4, targetLabel: 'ชม.',
                aiHint: (s.avg_boarding_hours ?? 0) > 6 ? 'วิกฤต — coordinate กับ IPD bed mgmt' : undefined,
            },
            {
                title: 'LWBS RATE', thTitle: 'ออกก่อนพบแพทย์',
                value: s.lwbs_rate != null ? s.lwbs_rate / 100 : null,
                format: 'percent',
                status: (s.lwbs_rate ?? 0) > 3 ? 'danger' : (s.lwbs_rate ?? 0) > 1 ? 'warning' : 'good',
                color: (s.lwbs_rate ?? 0) > 3 ? 'danger' : 'accent',
                icon: '🚪', target: 0.01, targetLabel: '≤',
            },
        ];
    }, [summary, surgeStatus]);

    if (loading && !summary) return <TabLoadingSkeleton />;
    if (error)   return <EmptyState title="โหลดข้อมูล ER ไม่ได้" subtitle={error} />;
    if (!summary) return <EmptyState title="ยังไม่มีข้อมูล ER" />;

    const triageBreakdown = Array.isArray(summary.triage_distribution) ? summary.triage_distribution : [];

    return (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
            {/* Live status bar */}
            <div className="flex flex-wrap items-center gap-2">
                <StatChip status={surgeStatus.status} icon="🔴">
                    {surgeStatus.label}
                </StatChip>
                <StatChip status="info">ER LIVE</StatChip>
                <StatChip status="info">Census {summary.census ?? 0}/{summary.capacity ?? '—'}</StatChip>
                <span className="ml-auto flex items-center gap-1 text-fs-2xs text-[color:var(--md-text-tertiary)] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-live" aria-hidden="true" />
                    อัปเดต {queue?.generated_at ? new Date(queue.generated_at).toLocaleTimeString('th-TH') : '—'}
                </span>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-kpi-auto gap-3 sm:gap-4">
                {kpis.map((k, i) => <KPICardV3 key={i} {...k} loading={loading} />)}
            </div>

            {/* Hourly + Triage mix */}
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
                <ChartCard
                    title="ผู้ป่วย ER รายชั่วโมง"
                    subtitle="24 ชั่วโมงที่ผ่านมา"
                    icon="📊"
                    series={[
                        { label: 'มาใหม่',    color: chart.primary },
                        { label: 'พบแพทย์แล้ว', color: chart.accent },
                    ]}
                    height={240}
                    empty={!hourly?.series?.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourly?.series || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                            <XAxis dataKey="hour" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="arrivals" fill={chart.primary}   radius={[4, 4, 0, 0]} name="มาใหม่"   isAnimationActive={false} />
                            <Bar dataKey="seen"     fill={color.accent}    radius={[4, 4, 0, 0]} name="พบแพทย์แล้ว" isAnimationActive={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Triage Mix"
                    subtitle="สัดส่วนตามระดับความเร่งด่วน (1=วิกฤต 5=ไม่เร่งด่วน)"
                    icon="🏷️"
                    height={240}
                    empty={!triageBreakdown.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={triageBreakdown}
                                dataKey="count"
                                nameKey="label"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                isAnimationActive={false}
                            >
                                {triageBreakdown.map((_, i) => (
                                    <Cell key={i} fill={TRIAGE_COLORS[i % TRIAGE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Live queue + AI */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                <SectionCard
                    title="Live Queue"
                    subtitle={`${queue?.patients?.length || 0} ราย • refresh 15s`}
                    icon="👥"
                >
                    {Array.isArray(queue?.patients) && queue.patients.length ? (
                        <ul className="divide-y divide-[color:var(--md-divider)]">
                            {queue.patients.slice(0, 10).map((p, i) => {
                                const tri = Number(p.triage_level) || 5;
                                const triStatus = tri === 1 ? 'danger' : tri === 2 ? 'warning' : tri === 3 ? 'info' : 'good';
                                return (
                                    <li key={i} className="flex items-center gap-3 py-2">
                                        <StatChip status={triStatus}>T{tri}</StatChip>
                                        <div className="flex-1 min-w-0">
                                            <div className={cn(t.body, 'truncate font-semibold')}>{p.hn_mask || p.hn || '—'}</div>
                                            <div className={cn(t.bodyDim, 'text-fs-2xs truncate')}>{p.complaint || '—'}</div>
                                        </div>
                                        <span className="font-mono tabular-nums text-fs-xs text-[color:var(--md-text-tertiary)]">
                                            {p.waiting_minutes ? `${p.waiting_minutes}′` : '—'}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className={t.bodyDim}>ไม่มีผู้ป่วยรอ หรือ endpoint /api/er/live-queue ยังไม่มีข้อมูล</p>
                    )}
                </SectionCard>

                {ai && (
                    <SectionCard title="AI ER Insights" subtitle="Surge + boarding" icon="✨" accent="ai">
                        <div className="space-y-2">
                            {ai.headline && <p className={cn(t.body, 'font-semibold leading-snug')}>{ai.headline}</p>}
                            {Array.isArray(ai.recommendations) && ai.recommendations.slice(0, 4).map((r, i) => (
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
