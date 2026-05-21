// ============================================================
// BCH 360° Intelligence V.10 — Doctor Activity Tab (Recovery v1)
// ============================================================
//
// STATUS: Phase 1.1 source recovery skeleton (2026-05-21)
// Drift recovery plan: docs/tier1.5-cutover-commands.md
// Bundle source-of-truth: prod-snapshot/dist-reflector/assets/DoctorActivityTab-DA0519x.js
//
// Recovered in this file:
//   - Period selector (6 presets + custom range)
//   - Section 1: Physician KPI strip + 7-day trend
//   - Doctor activity table (sortable, top 50)
//   - Loading + error + empty states
//
// NOT YET ported (require additional sessions — see TODOs):
//   - Section 2: Dentists (backend needs `dentists` field — also drift)
//   - r0() deep analytics per doctor (Burnout/Workload/Revenue/Pareto)
//   - x0() P0/P1 intervention recommendations
//   - p0() Gini/Pareto KPI aggregation panel
//   - AI executive analysis panel (uses ExecutiveAIPanel from shared-ui)
//   - Drill panels per doctor row (expand → DoctorDeepCard)
//   - "แพทย์ทั้งหมด" all-doctors roster drill (needs backend all_doctors)
//
// While these are pending, prod continues serving the bundle
// (DA0519x.js). Once feature-parity is reached, App.jsx will
// switch to importing this src/ file via npm run build.
// ============================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';

// ────────────────────────────────────────────────────────────
// Helpers (mirrors bundle's E0, Y, U, r)
// ────────────────────────────────────────────────────────────

const fmtDate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

const today = () => fmtDate(new Date());

const fmtNum = (n) => Number(n || 0).toLocaleString('th-TH');

const fmtBaht = (n) => {
    const v = Number(n || 0);
    if (v >= 1000000) return `${(v / 1000000).toFixed(2)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
    return fmtNum(v);
};

// ────────────────────────────────────────────────────────────
// Period presets — 6 buttons matching prod bundle
// ────────────────────────────────────────────────────────────

const PERIOD_PRESETS = [
    { id: 'today', label: 'วันนี้', days: 1 },
    { id: 'yesterday', label: 'เมื่อวาน', custom: 'yesterday' },
    { id: 'mtd', label: 'MTD (เดือนนี้)', custom: 'mtd' },
    { id: '7d', label: '7 วันล่าสุด', days: 7 },
    { id: '30d', label: '30 วันล่าสุด', days: 30 },
    { id: 'custom', label: 'กำหนดเอง', custom: 'range' },
];

const computePeriodParams = (presetId, customStart, customEnd) => {
    const t = new Date();
    if (presetId === 'today') return { days: 1 };
    if (presetId === '7d') return { days: 7 };
    if (presetId === '30d') return { days: 30 };
    if (presetId === 'yesterday') {
        const y = new Date(t.getTime() - 86400000);
        const s = fmtDate(y);
        return { start: s, end: s };
    }
    if (presetId === 'mtd') {
        const s = fmtDate(new Date(t.getFullYear(), t.getMonth(), 1));
        return { start: s, end: fmtDate(t) };
    }
    if (presetId === 'custom' && customStart && customEnd) {
        return { start: customStart, end: customEnd };
    }
    return { days: 30 };
};

// ────────────────────────────────────────────────────────────
// Sub-component: PeriodSelector
// ────────────────────────────────────────────────────────────

function PeriodSelector({ value, onChange, customStart, customEnd, onCustomChange }) {
    return (
        <div
            className="glass-card"
            style={{ padding: '1rem 1.25rem', marginBottom: '1rem' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-primary)', marginRight: '0.5rem' }}>
                    📅 ช่วงเวลาวิเคราะห์
                </strong>
                {PERIOD_PRESETS.map(p => (
                    <button
                        key={p.id}
                        onClick={() => onChange(p.id)}
                        style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '999px',
                            border: '1px solid var(--md-border)',
                            background: value === p.id ? 'var(--md-primary)' : 'var(--md-surface)',
                            color: value === p.id ? '#fff' : 'var(--md-text-primary)',
                            fontWeight: value === p.id ? 700 : 500,
                            fontSize: 'var(--fs-xs)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        {p.label}
                    </button>
                ))}
            </div>
            {value === 'custom' && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
                    <input
                        type="date"
                        value={customStart}
                        max={customEnd || today()}
                        onChange={(e) => onCustomChange('start', e.target.value)}
                        style={{ padding: '0.375rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--md-border)' }}
                    />
                    <span style={{ color: 'var(--md-text-tertiary)' }}>→</span>
                    <input
                        type="date"
                        value={customEnd}
                        min={customStart}
                        max={today()}
                        onChange={(e) => onCustomChange('end', e.target.value)}
                        style={{ padding: '0.375rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--md-border)' }}
                    />
                </div>
            )}
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// Sub-component: KpiStrip — Section 1 (Physicians)
// ────────────────────────────────────────────────────────────

function KpiStrip({ summary }) {
    const cards = [
        { icon: '👨‍⚕️', label: 'แพทย์ปฏิบัติงาน OPD', value: fmtNum(summary.opd_doctors), unit: 'คน', color: '#0284c7' },
        { icon: '🏥', label: 'แพทย์ IPD', value: fmtNum(summary.ipd_doctors), unit: 'คน', color: '#7c3aed' },
        { icon: '⏱️', label: 'OPD Visits', value: fmtNum(summary.opd_visits), unit: 'ครั้ง', color: '#0ea5e9' },
        { icon: '🛏️', label: 'IPD Admissions', value: fmtNum(summary.ipd_admissions), unit: 'ราย', color: '#a855f7' },
        { icon: '🔬', label: 'Lab Orders', value: fmtNum(summary.lab_orders), unit: 'คำสั่ง', color: '#06b6d4' },
        { icon: '☢️', label: 'X-Ray Orders', value: fmtNum(summary.xray_orders), unit: 'คำสั่ง', color: '#f59e0b' },
        { icon: '📊', label: 'เฉลี่ย/แพทย์', value: fmtNum(summary.avg_visits_per_doctor), unit: 'ครั้ง', color: '#10b981' },
        { icon: '💰', label: 'รายได้รวม', value: fmtBaht(summary.total_revenue), unit: 'บาท', color: '#dc2626' },
    ];
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1rem',
            }}
        >
            {cards.map((c) => (
                <div
                    key={c.label}
                    className="glass-card"
                    style={{
                        padding: '0.875rem 1rem',
                        borderLeft: `3px solid ${c.color}`,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{c.icon}</span>
                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                            {c.label}
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: 'var(--fs-2xl)',
                            fontWeight: 800,
                            color: 'var(--md-text-primary)',
                            marginTop: '0.25rem',
                            fontVariantNumeric: 'tabular-nums',
                        }}
                    >
                        {c.value}{' '}
                        <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 500, color: 'var(--md-text-tertiary)' }}>
                            {c.unit}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// Sub-component: TrendChart — 7-day doctor activity
// ────────────────────────────────────────────────────────────

function TrendChart({ data }) {
    const formatted = useMemo(() => (
        (data || []).map(d => ({
            date: new Date(d.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
            doctors: d.doctors,
            visits: d.visits,
        }))
    ), [data]);

    if (!formatted.length) return null;

    return (
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', marginBottom: '0.5rem' }}>
                📈 แนวโน้ม 7 วันล่าสุด
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={formatted}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="visits" name="OPD Visits" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} />
                    <Line yAxisId="right" type="monotone" dataKey="doctors" name="แพทย์ปฏิบัติงาน" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// Sub-component: DoctorTable — sortable, top 50
// ────────────────────────────────────────────────────────────

const COLUMNS = [
    { key: 'name', label: 'แพทย์', sortable: false, align: 'left' },
    { key: 'opd_visits', label: 'OPD', sortable: true, align: 'right' },
    { key: 'ipd_admissions', label: 'IPD', sortable: true, align: 'right' },
    { key: 'lab_orders', label: 'Lab', sortable: true, align: 'right' },
    { key: 'xray_orders', label: 'X-Ray', sortable: true, align: 'right' },
    { key: 'total_orders', label: 'คำสั่งรวม', sortable: true, align: 'right' },
    { key: 'orders_per_visit', label: 'คำสั่ง/Visit', sortable: true, align: 'right' },
    { key: 'total_revenue', label: 'รายได้รวม', sortable: true, align: 'right' },
];

function DoctorTable({ doctors }) {
    const [sortKey, setSortKey] = useState('opd_visits');
    const [sortDir, setSortDir] = useState('desc');

    const sorted = useMemo(() => {
        const arr = [...(doctors || [])];
        arr.sort((a, b) => {
            const dir = sortDir === 'desc' ? -1 : 1;
            return ((a[sortKey] || 0) - (b[sortKey] || 0)) * dir;
        });
        return arr.slice(0, 50);
    }, [doctors, sortKey, sortDir]);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'desc' ? 'asc' : 'desc');
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
    };

    if (!doctors || doctors.length === 0) {
        return (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                ไม่พบข้อมูลกิจกรรมแพทย์ในช่วงที่เลือก
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ padding: '0.75rem', overflowX: 'auto' }}>
            <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--md-text-primary)', padding: '0.25rem 0.5rem 0.75rem' }}>
                🩺 แพทย์ปฏิบัติหน้าที่ในช่วงนี้ ({doctors.length} ราย — แสดง Top 50)
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--md-border)', background: 'var(--md-surface-variant)' }}>
                        {COLUMNS.map(col => (
                            <th
                                key={col.key}
                                onClick={() => col.sortable && handleSort(col.key)}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    textAlign: col.align,
                                    fontWeight: 700,
                                    color: 'var(--md-text-secondary)',
                                    cursor: col.sortable ? 'pointer' : 'default',
                                    userSelect: 'none',
                                }}
                            >
                                {col.label}
                                {sortKey === col.key && <span> {sortDir === 'desc' ? '▼' : '▲'}</span>}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((d, idx) => (
                        <tr
                            key={d.code || idx}
                            style={{ borderBottom: '1px solid var(--md-border)' }}
                        >
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>
                                <div style={{ fontWeight: 600, color: 'var(--md-text-primary)' }}>{d.name}</div>
                                {d.position && (
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)' }}>{d.position}</div>
                                )}
                            </td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtNum(d.opd_visits)}</td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtNum(d.ipd_admissions)}</td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtNum(d.lab_orders)}</td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtNum(d.xray_orders)}</td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtNum(d.total_orders)}</td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{(d.orders_per_visit || 0).toFixed(2)}</td>
                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{fmtBaht(d.total_revenue)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────

function DoctorActivityTab() {
    const state = useShallowDashboardSelector(s => ({
        doctorActivity: s.doctorActivity,
        loading: s.loading,
    }));
    const { fetchData } = useDashboardActions();

    const [period, setPeriod] = useState('30d');
    const [customStart, setCustomStart] = useState(today());
    const [customEnd, setCustomEnd] = useState(today());

    // Build URL query string from current period state
    const apiUrl = useMemo(() => {
        const params = computePeriodParams(period, customStart, customEnd);
        const qs = new URLSearchParams();
        if (params.days) qs.set('days', params.days);
        if (params.start) qs.set('start', params.start);
        if (params.end) qs.set('end', params.end);
        return `/api/doctor/activity-summary?${qs.toString()}`;
    }, [period, customStart, customEnd]);

    // Fetch when URL changes — use unique key per period for cache-bust
    useEffect(() => {
        const cacheKey = `doctorActivity_${period}_${customStart}_${customEnd}`;
        fetchData(cacheKey, apiUrl, 'doctorActivity');
    }, [apiUrl, fetchData, period, customStart, customEnd]);

    const data = state.doctorActivity || {};
    const isLoading = state.loading?.doctorActivity;

    const handleCustomChange = useCallback((field, value) => {
        if (field === 'start') setCustomStart(value);
        if (field === 'end') setCustomEnd(value);
    }, []);

    // Section 1: Period selector + KPI strip + Trend + Table
    return (
        <div className="space-y-5 animate-fade-in pb-10">
            <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--md-text-primary)', margin: 0 }}>
                    👨‍⚕️ ผลผลิตและกิจกรรมแพทย์
                </h2>
                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-secondary)', margin: '0.25rem 0 0' }}>
                    ผู้ปฏิบัติงาน · ปริมาณงาน · คำสั่งตรวจ · รายได้
                </p>
            </div>

            <PeriodSelector
                value={period}
                onChange={setPeriod}
                customStart={customStart}
                customEnd={customEnd}
                onCustomChange={handleCustomChange}
            />

            {isLoading && (
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                    กำลังโหลดข้อมูลกิจกรรมแพทย์...
                </div>
            )}

            {!isLoading && data.summary && (
                <>
                    <KpiStrip summary={data.summary} />
                    <TrendChart data={data.trend_7d} />
                    <DoctorTable doctors={data.doctors} />
                </>
            )}

            {/* ───────── TODO sections (port from bundle DA0519x.js) ───────── */}
            {/*
              Sections still living in the prod bundle, pending recovery:

              1. SECTION 2: Dentists (🦷) — requires backend update:
                 /api/doctor/activity-summary currently doesn't return `dentists`.
                 Prod bundle has dentist roster, Top 3 dentist bar chart,
                 dentist drill panel (cyan #06b6d4 accent).

              2. "แพทย์ทั้งหมด" all-doctors drill — backend needs `all_doctors`
                 field (full 18-doctor master + 6-dentist master, including
                 0-activity).

              3. r0(doctor, all, days) — deep per-doctor analytics:
                 - Burnout risk detection (visits/day > threshold)
                 - Revenue leak (rev_per_visit < median)
                 - Clinical appropriateness (orders/visit vs benchmark)
                 - Strengths/Concerns/Recs (Thai prose)

              4. x0(doctor, all, params) — P0/P1 intervention recommendations:
                 - P0: Burnout, Revenue Leak (critical)
                 - P1: Workload balance, IPD rotation, case-mix shift

              5. p0(summary, doctors, dentists, period) — KPI aggregation:
                 - Gini coefficient (q() helper)
                 - Top-10 / Top-20% share (Pareto)
                 - Health headline + color (red/amber/green)

              6. AI Executive Panel — uses ExecutiveAIPanel from shared-ui.
                 Renders narrative analysis (4-5 sections) per query.

              7. Drill panels per doctor row — expand to show DoctorDeepCard
                 with all r0/x0 outputs in a structured drawer.

              Estimated effort: 2-3 sessions (port to .jsx + test + verify).
              Reference bundle: prod-snapshot/dist-reflector/assets/DoctorActivityTab-DA0519x.js
            */}
        </div>
    );
}

export default React.memo(DoctorActivityTab);
