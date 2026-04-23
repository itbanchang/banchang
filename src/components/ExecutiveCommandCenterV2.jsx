// ============================================================
// ExecutiveCommandCenterV2 — Modern redesign using the new design system.
//
// Showcase of:
//   - AppShell layout (responsive, sidebar + header)
//   - KPICardV3 (Tailwind-native, registry-aware)
//   - SectionCard + ChartCard (consistent surfaces)
//   - InsightBadge (AI narrative indicator)
//   - StatChip (semantic pills)
//
// Drop-in replacement for ExecutiveCommandCenter. Older component
// stays for backward-compat; switch the import in App.jsx to
// promote this one.
// ============================================================
import React, { useMemo } from 'react';
import {
    ResponsiveContainer, AreaChart, Area, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts';
import KPICardV3 from './shared/KPICardV3.jsx';
import SectionCard from './shared/SectionCard.jsx';
import ChartCard from './shared/ChartCard.jsx';
import StatChip from './shared/StatChip.jsx';
import InsightBadge from './shared/InsightBadge.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import { chart, color } from '../theme/tokens.js';
import { t, cn, fmt } from '../theme/compose.js';

// Safe extractors
const n = (v, fb = 0) => Number.isFinite(Number(v)) ? Number(v) : fb;
const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

function scoreFinancial(s) {
    if (!s) return 50;
    const coll = clamp(n(s.collection_rate, 85));
    const revRatio = s.revenue_target > 0 ? clamp((n(s.revenue_this_month) / n(s.revenue_target, 1)) * 100) : 50;
    const den = clamp(100 - n(s.denial_rate, 5) * 5);
    return Math.round(coll * 0.4 + revRatio * 0.35 + den * 0.25);
}
function scoreClinical(s) {
    if (!s) return 75;
    return clamp(Math.round(100 - n(s.critical_patients) * 10 - n(s.high_risk_patients || s.risk_patients) * 3));
}
function scoreOperational(s) {
    if (!s) return 60;
    const opdRatio = n(s.opd_target, 800) > 0 ? clamp((n(s.opd_today) / n(s.opd_target, 1)) * 100) : 50;
    const occDev = Math.abs(n(s.occupancy_rate, 50) - 80);
    const occScore = clamp(100 - occDev * 2);
    return Math.round(opdRatio * 0.5 + occScore * 0.5);
}
function scoreQuality(s) {
    if (!s) return 70;
    const rScore = clamp(100 - n(s.readmission_rate, 5) * 5);
    const mScore = clamp(100 - n(s.mortality_rate, 1) * 10);
    const sat = clamp(n(s.satisfaction_score || s.quality_score, 80));
    return Math.round(rScore * 0.3 + mScore * 0.3 + sat * 0.4);
}
function overall(scores) {
    return Math.round((scores.financial + scores.clinical + scores.operational + scores.quality) / 4);
}
function priorityFrom(score) {
    if (score >= 85) return 'LOW';
    if (score >= 70) return 'MEDIUM';
    if (score >= 55) return 'MEDIUM';
    return 'HIGH';
}

/**
 * <ExecutiveCommandCenterV2 summary={...} clinicalInsights={...} />
 */
export default function ExecutiveCommandCenterV2({ summary, clinicalInsights, revenueTrend = [] }) {
    const scores = useMemo(() => ({
        financial:   scoreFinancial(summary),
        clinical:    scoreClinical(summary),
        operational: scoreOperational(summary),
        quality:     scoreQuality(summary),
    }), [summary]);
    const grand = useMemo(() => overall(scores), [scores]);

    const priority = priorityFrom(grand);
    const nowStr = useMemo(() => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), []);

    // Pull top insight if any
    const topInsight = clinicalInsights?.doctor?.[0];

    return (
        <div className={cn('space-y-4 sm:space-y-5', 'animate-fade-in')}>
            {/* ── Hero: Overall Health + AI narrative ─────────────────────── */}
            <SectionCard
                accent={priority === 'HIGH' ? 'danger' : priority === 'MEDIUM' ? 'warning' : 'accent'}
                className="overflow-visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 lg:gap-6 items-center">
                    {/* Gauge */}
                    <div className="flex items-center justify-center">
                        <HealthGauge value={grand} size={150} label="ภาพรวม" />
                    </div>

                    {/* Headline + sub metrics */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <StatChip status={priority === 'HIGH' ? 'danger' : priority === 'MEDIUM' ? 'warning' : 'good'}>
                                {priority === 'HIGH' ? 'ต้องดำเนินการด่วน' : priority === 'MEDIUM' ? 'เฝ้าระวัง' : 'สถานะปกติ'}
                            </StatChip>
                            <span className="text-fs-2xs text-[color:var(--md-text-tertiary)] font-mono">
                                อัปเดต {nowStr}
                            </span>
                        </div>
                        <h2 className={cn(t.hero, 'leading-none')}>{grand}<span className="text-fs-xl text-[color:var(--md-text-tertiary)]">/100</span></h2>
                        <p className="mt-1 text-fs-sm text-[color:var(--md-text-secondary)]">
                            ภาพรวมสถานะโรงพยาบาล — รวมจาก 4 มิติ: การเงิน, คลินิก, การดำเนินงาน, คุณภาพ
                        </p>

                        {/* Sub scores inline */}
                        <dl className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                                { k: 'financial',   label: 'การเงิน',      color: 'text-primary-600', icon: '💰' },
                                { k: 'clinical',    label: 'คลินิก',       color: 'text-danger-600',  icon: '🩺' },
                                { k: 'operational', label: 'ดำเนินงาน',    color: 'text-info-600',    icon: '⚙️' },
                                { k: 'quality',     label: 'คุณภาพ',        color: 'text-accent-600',  icon: '⭐' },
                            ].map(({ k, label, color: clr, icon }) => (
                                <div key={k} className="rounded-lg bg-[color:var(--md-surface-2)] px-3 py-2">
                                    <dt className="flex items-center gap-1 text-fs-2xs text-[color:var(--md-text-tertiary)]">
                                        <span aria-hidden="true">{icon}</span>{label}
                                    </dt>
                                    <dd className={cn('text-fs-lg font-bold tabular-nums', clr)}>
                                        {scores[k]}<span className="text-fs-2xs opacity-50">/100</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* AI insight */}
                    {topInsight && (
                        <div className="lg:max-w-xs">
                            <InsightBadge priority={priority} source="claude">
                                {topInsight.message || topInsight.title || 'ตรวจสอบ Clinical tab สำหรับรายละเอียด'}
                            </InsightBadge>
                        </div>
                    )}
                </div>
            </SectionCard>

            {/* ── KPI row — 4 cards auto-fit ─────────────────────────────── */}
            <div className="grid grid-cols-kpi-auto gap-3 sm:gap-4">
                <KPICardV3
                    title="REVENUE TODAY"
                    thTitle="รายได้วันนี้"
                    value={n(summary?.revenue_today)}
                    format="currency"
                    status="good"
                    color="primary"
                    icon="💰"
                    trend={n(summary?.revenue_trend_pct)}
                    trendLabel="vs เมื่อวาน"
                    aiHint={n(summary?.revenue_trend_pct) > 10 ? 'รายได้โตชัด — ตรวจสอบปัจจัย seasonal' : undefined}
                />
                <KPICardV3
                    title="OPD VISITS"
                    thTitle="ผู้ป่วยนอกวันนี้"
                    value={n(summary?.opd_today)}
                    target={n(summary?.opd_target, null)}
                    targetLabel="เป้า"
                    status="info"
                    color="info"
                    icon="🏥"
                    trend={n(summary?.opd_trend_pct)}
                    trendLabel="vs เมื่อวาน"
                />
                <KPICardV3
                    title="BED OCCUPANCY"
                    thTitle="อัตราครองเตียง"
                    value={n(summary?.occupancy_rate) / 100}
                    format="percent"
                    status={n(summary?.occupancy_rate) > 90 ? 'danger' : n(summary?.occupancy_rate) > 85 ? 'warning' : 'good'}
                    color={n(summary?.occupancy_rate) > 90 ? 'danger' : 'accent'}
                    icon="🛏️"
                    aiHint={n(summary?.occupancy_rate) > 90 ? 'เตียงเกือบเต็ม — เตรียมแผน surge' : undefined}
                />
                <KPICardV3
                    title="CRITICAL PATIENTS"
                    thTitle="ผู้ป่วยวิกฤต (NEWS2 ≥ 7)"
                    value={n(summary?.critical_patients)}
                    status={n(summary?.critical_patients) > 0 ? 'danger' : 'good'}
                    color={n(summary?.critical_patients) > 0 ? 'danger' : 'accent'}
                    icon="🚨"
                    aiHint={n(summary?.critical_patients) > 0 ? 'ต้องตอบสนอง RRT ทันที' : undefined}
                />
            </div>

            {/* ── Revenue trend chart ──────────────────────────────────── */}
            <ChartCard
                title="แนวโน้มรายได้ 30 วัน"
                subtitle="เปรียบเทียบ YoY และค่าเฉลี่ย 7 วัน"
                icon="📈"
                series={[
                    { label: 'วันนี้', color: chart.primary },
                    { label: 'เมื่อวาน', color: chart.comparison },
                    { label: 'ค่าเฉลี่ย 7 วัน', color: chart.baseline, dashed: true },
                ]}
                height={280}
                empty={!revenueTrend.length}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueTrend} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chart.primary} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={chart.primary} stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                        <XAxis dataKey="date" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `฿${(v / 1e6).toFixed(1)}M`} />
                        <Tooltip formatter={(v) => fmt.currency(v)} />
                        <Area type="monotone" dataKey="revenue" stroke={chart.primary} strokeWidth={2.5} fill="url(#revFill)" isAnimationActive={false} />
                        <Line type="monotone" dataKey="previous" stroke={chart.comparison} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* ── Two-column: OPD hourly + Clinical risk distribution ─── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ChartCard
                    title="OPD รายชั่วโมง"
                    subtitle="วันนี้ • เปรียบเทียบเมื่อวาน"
                    icon="⏱️"
                    series={[
                        { label: 'วันนี้', color: chart.primary },
                        { label: 'เมื่อวาน', color: chart.comparison },
                    ]}
                    height={240}
                    empty={!summary?.hourly?.length}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={summary?.hourly || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                            <XAxis dataKey="hour" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill={chart.primary} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                            <Line type="monotone" dataKey="yesterday" stroke={chart.comparison} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                            <ReferenceLine y={n(summary?.opd_target) / 24} stroke={color.warning} strokeDasharray="3 3" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <SectionCard title="Clinical Risk Distribution" subtitle="ตามระดับความรุนแรง" icon="🩺">
                    <div className="space-y-2">
                        {[
                            { label: 'วิกฤต (NEWS2 ≥ 7)', count: n(summary?.critical_patients), status: 'danger' },
                            { label: 'สูง (NEWS2 5-6)',   count: n(summary?.high_risk_patients || summary?.risk_patients), status: 'warning' },
                            { label: 'ปานกลาง (NEWS2 3-4)', count: n(summary?.medium_risk_patients), status: 'info' },
                            { label: 'ต่ำ (NEWS2 0-2)',   count: n(summary?.low_risk_patients), status: 'good' },
                        ].map((row, i) => {
                            const total = n(summary?.total_ipd_active, 1);
                            const pct = Math.round((row.count / total) * 100) || 0;
                            return (
                                <div key={i}>
                                    <div className="flex items-center justify-between text-fs-xs mb-1">
                                        <div className="flex items-center gap-2">
                                            <StatChip status={row.status}>{row.count}</StatChip>
                                            <span className={t.body}>{row.label}</span>
                                        </div>
                                        <span className="font-mono tabular-nums text-[color:var(--md-text-tertiary)]">{pct}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-[color:var(--md-surface-2)] overflow-hidden">
                                        <div
                                            className={cn(
                                                'h-full rounded-full transition-all duration-500',
                                                row.status === 'danger' && 'bg-danger-500',
                                                row.status === 'warning' && 'bg-warning-500',
                                                row.status === 'info' && 'bg-info-500',
                                                row.status === 'good' && 'bg-accent-500',
                                            )}
                                            style={{ width: `${pct}%` }}
                                            aria-valuenow={pct}
                                            aria-valuemax={100}
                                            role="progressbar"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>
            </div>

            {/* ── AI insights strip ───────────────────────────────────── */}
            {Array.isArray(clinicalInsights?.doctor) && clinicalInsights.doctor.length > 1 && (
                <SectionCard title="AI Insights" subtitle="สรุปจาก Claude + rule-based engines" icon="✨" accent="ai">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {clinicalInsights.doctor.slice(0, 6).map((ins, i) => (
                            <InsightBadge
                                key={i}
                                priority={ins.priority || 'INFO'}
                                source={ins.source || 'rule-based'}
                            >
                                {ins.message || ins.title}
                            </InsightBadge>
                        ))}
                    </div>
                </SectionCard>
            )}
        </div>
    );
}
