// ============================================================
// OPD sub-components — v2 implementations using the new design system.
// Imported by src/components/OPDTab.jsx (unchanged). Each sub-component
// reads a slice of OPDTab's state and renders a self-contained card.
// ============================================================
import React, { useMemo } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, Line, ComposedChart, CartesianGrid,
    XAxis, YAxis, Tooltip,
} from 'recharts';
import SectionCard from '../shared/SectionCard.jsx';
import ChartCard from '../shared/ChartCard.jsx';
import StatChip from '../shared/StatChip.jsx';
import KPICardV3 from '../shared/KPICardV3.jsx';
import InsightBadge from '../shared/InsightBadge.jsx';
import { chart, color } from '../../theme/tokens.js';
import { cn, fmt, t } from '../../theme/compose.js';

const THAI_STATUS = {
    'รอคัดกรอง': { status: 'danger',  color: color.danger },
    'กำลังตรวจ': { status: 'warning', color: color.warning },
    'รอรับยา':   { status: 'info',    color: color.info },
    'กลับบ้าน':  { status: 'good',    color: color.accent },
};

// ── OPDKPICards — 4-across KPI row ──────────────────────────
export function OPDKPICards({ opd, loading }) {
    const data = opd || {};
    return (
        <div className="grid grid-cols-kpi-auto gap-3 sm:gap-4">
            <KPICardV3
                title="OPD TODAY" thTitle="ผู้ป่วยนอกวันนี้"
                value={data.total}
                status="info" color="primary" icon="🏥"
                trend={data.trend_vs_yesterday} trendLabel="vs เมื่อวาน"
                loading={loading}
            />
            <KPICardV3
                title="WAIT TIME" thTitle="เวลารอเฉลี่ย"
                value={data.avg_total_minutes}
                status={data.avg_total_minutes > 60 ? 'danger' : data.avg_total_minutes > 40 ? 'warning' : 'good'}
                color={data.avg_total_minutes > 60 ? 'danger' : data.avg_total_minutes > 40 ? 'warning' : 'accent'}
                icon="⏱️"
                target={40} targetLabel="นาที"
                loading={loading}
                aiHint={data.avg_total_minutes > 60 ? 'เวลารอเกินเป้า — ดู Root Cause' : undefined}
            />
            <KPICardV3
                title="SLA COMPLIANT" thTitle="ผ่านเกณฑ์ 60 นาที"
                value={data.sla_pct != null ? data.sla_pct / 100 : null}
                format="percent"
                status={(data.sla_pct ?? 0) >= 85 ? 'good' : (data.sla_pct ?? 0) >= 70 ? 'warning' : 'danger'}
                color={(data.sla_pct ?? 0) >= 85 ? 'accent' : 'warning'}
                icon="🎯" target={0.85} targetLabel="เป้า"
                loading={loading}
            />
            <KPICardV3
                title="DROPOUT" thTitle="ออกไปกลางคัน"
                value={data.dropout_pct != null ? data.dropout_pct / 100 : null}
                format="percent"
                status={(data.dropout_pct ?? 0) > 5 ? 'danger' : (data.dropout_pct ?? 0) > 2 ? 'warning' : 'good'}
                color={(data.dropout_pct ?? 0) > 5 ? 'danger' : 'accent'}
                icon="🚪" target={0.02} targetLabel="≤"
                loading={loading}
                aiHint={data.dropout_pct > 5 ? 'อัตราสูง — อาจมีคอขวดที่ลงทะเบียน' : undefined}
            />
        </div>
    );
}

// ── OPDHourlyChart ──────────────────────────────────────────
export function OPDHourlyChart({ hourly = [], loading }) {
    const data = useMemo(() => (Array.isArray(hourly) ? hourly : []).map(h => ({
        hour: `${h.hour}:00`,
        count: Number(h.count || 0),
        yesterday: Number(h.yesterday || 0),
        prediction: Number(h.prediction || 0),
        baseline: Number(h.baseline || 0),
    })), [hourly]);

    return (
        <ChartCard
            title="OPD รายชั่วโมง" subtitle="วันนี้ • เมื่อวาน • คาดการณ์" icon="⏱️"
            series={[
                { label: 'วันนี้',    color: chart.primary },
                { label: 'เมื่อวาน',  color: chart.comparison },
                { label: 'คาดการณ์', color: chart.prediction, dashed: true },
                { label: 'ค่าเฉลี่ย', color: chart.baseline, dashed: true },
            ]}
            height={280} loading={loading} empty={!data.length}
        >
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                    <XAxis dataKey="hour" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar  dataKey="count"      fill={chart.primary}      radius={[4, 4, 0, 0]} name="วันนี้"   isAnimationActive={false} />
                    <Line dataKey="yesterday"  stroke={chart.comparison} strokeWidth={1.5} dot={false} name="เมื่อวาน"  isAnimationActive={false} />
                    <Line dataKey="prediction" stroke={chart.prediction} strokeWidth={2} strokeDasharray="5 5" dot={false} name="คาดการณ์" isAnimationActive={false} />
                    <Line dataKey="baseline"   stroke={chart.baseline}   strokeWidth={1} dot={false} name="ค่าเฉลี่ย"  isAnimationActive={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

// ── OPDLiveFeed ──────────────────────────────────────────────
export function OPDLiveFeed({ queue = [], loading }) {
    if (loading) return <SectionCard title="คิวปัจจุบัน" icon="🔴"><div className="skeleton h-16 w-full" /></SectionCard>;

    const byStatus = Object.keys(THAI_STATUS).map(statusTh => ({
        label: statusTh,
        count: queue.filter(q => q.status === statusTh).length,
        ...THAI_STATUS[statusTh],
    }));
    const total = byStatus.reduce((s, b) => s + b.count, 0);

    return (
        <SectionCard title="คิวปัจจุบัน" icon="🔴" subtitle={`${total} ราย`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {byStatus.map(b => (
                    <div key={b.label} className="relative p-3 rounded-lg border border-[color:var(--md-border)] bg-[color:var(--md-surface-2)]">
                        <span className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ background: b.color }} aria-hidden="true" />
                        <div className="text-fs-2xs font-bold uppercase tracking-wider text-[color:var(--md-text-tertiary)] mb-1">{b.label}</div>
                        <div className="text-fs-2xl font-bold tabular-nums text-[color:var(--md-text-primary)]">{b.count}</div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

// ── OPDStaffOnDuty ──────────────────────────────────────────
export function OPDStaffOnDuty({ activeDoctors, activeNurses, activeStaff }) {
    const items = [
        { label: 'แพทย์',          count: Number(activeDoctors || 0), icon: '🧑‍⚕️' },
        { label: 'พยาบาล',         count: Number(activeNurses  || 0), icon: '👩‍⚕️' },
        { label: 'เจ้าหน้าที่อื่น', count: Number(activeStaff   || 0), icon: '👥'    },
    ];
    return (
        <SectionCard title="เจ้าหน้าที่ปฏิบัติงานวันนี้" icon="👥">
            <div className="grid grid-cols-3 gap-3">
                {items.map(it => (
                    <div key={it.label} className="text-center">
                        <div className="text-2xl mb-1" aria-hidden="true">{it.icon}</div>
                        <div className="text-fs-2xl font-bold tabular-nums">{it.count}</div>
                        <div className="text-fs-2xs text-[color:var(--md-text-tertiary)]">{it.label}</div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

// ── OPDCycleTime ────────────────────────────────────────────
export function OPDCycleTime({ opd }) {
    const stages = [
        { key: 'avg_wait_to_screen',     label: 'ลงทะเบียน → คัดกรอง', target: 10 },
        { key: 'avg_screen_to_doctor',   label: 'คัดกรอง → พบแพทย์',    target: 15 },
        { key: 'avg_doctor_to_pharmacy', label: 'แพทย์ → รับยา',         target: 15 },
        { key: 'avg_pharmacy_to_finance',label: 'รับยา → การเงิน',       target: 5  },
    ];

    return (
        <SectionCard title="เวลาแยกตามขั้นตอน" icon="⏳" subtitle="Cycle-time breakdown">
            <div className="space-y-3">
                {stages.map(s => {
                    const v = Number(opd?.[s.key] || 0);
                    const pct = Math.min(100, (v / (s.target * 2)) * 100);
                    const status = v <= s.target ? 'good' : v <= s.target * 1.5 ? 'warning' : 'danger';
                    return (
                        <div key={s.key}>
                            <div className="flex items-center justify-between text-fs-xs mb-1">
                                <div className="flex items-center gap-2">
                                    <StatChip status={status}>{v} น.</StatChip>
                                    <span className={t.body}>{s.label}</span>
                                </div>
                                <span className="font-mono tabular-nums text-[color:var(--md-text-tertiary)]">เป้า {s.target} น.</span>
                            </div>
                            <div className="h-2 rounded-full bg-[color:var(--md-surface-2)] overflow-hidden">
                                <div
                                    className={cn(
                                        'h-full rounded-full transition-all duration-500',
                                        status === 'good'    && 'bg-accent-500',
                                        status === 'warning' && 'bg-warning-500',
                                        status === 'danger'  && 'bg-danger-500',
                                    )}
                                    style={{ width: `${pct}%` }}
                                    role="progressbar" aria-valuenow={v} aria-valuemax={s.target * 2}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
}

// ── OPDRootCause ────────────────────────────────────────────
export function OPDRootCause({ opd }) {
    const stages = [
        { key: 'avg_wait_to_screen',      label: 'ลงทะเบียน → คัดกรอง', target: 10 },
        { key: 'avg_screen_to_doctor',    label: 'คัดกรอง → พบแพทย์',    target: 15 },
        { key: 'avg_doctor_to_pharmacy',  label: 'แพทย์ → รับยา',         target: 15 },
        { key: 'avg_pharmacy_to_finance', label: 'รับยา → การเงิน',       target: 5  },
    ];
    const overages = stages.map(s => {
        const v = Number(opd?.[s.key] || 0);
        return { ...s, actual: v, over: v - s.target, overPct: s.target > 0 ? ((v - s.target) / s.target) : 0 };
    }).sort((a, b) => b.over - a.over);
    const worst = overages[0];

    if (!worst || worst.over <= 0) {
        return (
            <SectionCard title="Root Cause" icon="✅" accent="accent">
                <p className={t.body}>ไม่พบคอขวด — ทุกขั้นตอนอยู่ในเป้า 🎉</p>
            </SectionCard>
        );
    }

    return (
        <SectionCard title="Root Cause" icon="🎯" accent="warning">
            <InsightBadge priority={worst.overPct > 1 ? 'HIGH' : 'MEDIUM'} source="rule-based">
                <strong>{worst.label}</strong> เกินเป้า {worst.over.toFixed(0)} นาที
                {' '}({Math.round(worst.overPct * 100)}% over) — ตรวจสอบกำลังคนและกระบวนการในช่วงนี้
            </InsightBadge>
            <div className="mt-3 space-y-1">
                {overages.filter(s => s.over > 0).slice(1, 3).map(s => (
                    <div key={s.key} className="flex items-center justify-between text-fs-xs text-[color:var(--md-text-secondary)]">
                        <span>{s.label}</span>
                        <span className="font-mono tabular-nums">+{s.over.toFixed(0)} น.</span>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

// ── OPDStrategicDashboard (DPI composite) ────────────────────
export function OPDStrategicDashboard({ opd }) {
    const sla = Math.min(Number(opd?.sla_pct || 0), 100);
    const waitScore = Math.max(0, Math.min(100, 100 - ((Number(opd?.avg_total_minutes || 0)) / 120) * 100));
    const throughputScore = Math.min(100, ((Number(opd?.throughput || 0)) / 30) * 100);
    const dropoutScore = Math.max(0, 100 - Number(opd?.dropout_pct || 0));
    const dpi = Math.round(sla * 0.30 + waitScore * 0.25 + throughputScore * 0.25 + dropoutScore * 0.20);

    const components = [
        { label: 'SLA',         value: Math.round(sla),             weight: 30 },
        { label: 'Wait',        value: Math.round(waitScore),       weight: 25 },
        { label: 'Throughput',  value: Math.round(throughputScore), weight: 25 },
        { label: '100−Dropout', value: Math.round(dropoutScore),    weight: 20 },
    ];

    return (
        <SectionCard
            title="DPI — Department Performance Index"
            subtitle="SLA × 30 + Wait × 25 + Throughput × 25 + (100−Dropout) × 20"
            icon="📊"
            accent={dpi >= 80 ? 'accent' : dpi >= 60 ? 'warning' : 'danger'}
        >
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
                <div className="text-center">
                    <div className={cn(t.hero, 'leading-none')}>{dpi}<span className="text-fs-xl text-[color:var(--md-text-tertiary)]">/100</span></div>
                    <StatChip status={dpi >= 80 ? 'good' : dpi >= 60 ? 'warning' : 'danger'} className="mt-2">
                        {dpi >= 80 ? 'ดีเยี่ยม' : dpi >= 60 ? 'พอใช้' : 'ต้องปรับปรุง'}
                    </StatChip>
                </div>
                <div className="space-y-2">
                    {components.map(c => (
                        <div key={c.label}>
                            <div className="flex items-center justify-between text-fs-xs mb-0.5">
                                <span className={t.body}>{c.label} <span className="text-[color:var(--md-text-tertiary)]">×{c.weight}%</span></span>
                                <span className="font-mono tabular-nums">{c.value}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[color:var(--md-surface-2)] overflow-hidden">
                                <div className="h-full bg-primary-600 rounded-full transition-all duration-500" style={{ width: `${c.value}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionCard>
    );
}

// ── OPDRevenue ──────────────────────────────────────────────
export function OPDRevenue({ revenueFiscal = [], loading }) {
    const data = useMemo(() => (Array.isArray(revenueFiscal) ? revenueFiscal : []).map(r => ({
        month: r.month_name || r.label || `${r.month}`,
        revenue: Number(r.revenue || r.value || 0),
    })), [revenueFiscal]);

    return (
        <ChartCard
            title="OPD Revenue รายเดือน" subtitle="ปีงบประมาณนี้" icon="💰"
            series={[{ label: 'รายได้', color: chart.primary }]}
            height={220} loading={loading} empty={!data.length}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--md-chart-grid)" />
                    <XAxis dataKey="month" tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => `฿${(v / 1e6).toFixed(1)}M`} tick={{ fill: 'var(--md-chart-tick)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={v => fmt.currency(v)} />
                    <Bar dataKey="revenue" fill={chart.primary} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
