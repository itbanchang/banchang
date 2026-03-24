// ============================================================
// BCH 360° Intelligence V.10 — Fiscal Year Compare Tab
// เปรียบเทียบข้อมูลระดับปีงบประมาณ ทุกแผนก
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

const DEPTS = [
    { id: 'opd', label: 'OPD ผู้ป่วยนอก', icon: '⏱️', endpoint: '/api/opd/revenue-fiscal', color: '#0284c7', unit: 'revenue' },
    { id: 'ipd', label: 'IPD ผู้ป่วยใน', icon: '🏥', endpoint: '/api/ipd/revenue-fiscal', color: '#7c3aed', unit: 'revenue' },
    { id: 'er', label: 'ER ฉุกเฉิน', icon: '🚑', endpoint: '/api/er/revenue-fiscal', color: '#dc2626', unit: 'revenue' },
    { id: 'dental', label: 'ทันตกรรม', icon: '🦷', endpoint: '/api/dental/revenue-fiscal', color: '#f59e0b', unit: 'revenue' },
    { id: 'xray', label: 'รังสีวิทยา', icon: '☢️', endpoint: '/api/xray/revenue-fiscal', color: '#06b6d4', unit: 'orders' },
    { id: 'pharmacy', label: 'เภสัชกรรม', icon: '💊', endpoint: '/api/pharmacy/revenue-fiscal', color: '#10b981', unit: 'revenue' },
    { id: 'lab', label: 'ห้องปฏิบัติการ', icon: '🔬', endpoint: '/api/lab/revenue-fiscal', color: '#0ea5e9', unit: 'orders' },
    { id: 'thaimed', label: 'แพทย์แผนไทย', icon: '🌿', endpoint: '/api/thaimedicine/revenue-fiscal', color: '#65a30d', unit: 'revenue' },
    { id: 'phystherapy', label: 'กายภาพบำบัด', icon: '🏋️', endpoint: '/api/physicaltherapy/revenue-fiscal', color: '#e11d48', unit: 'revenue' },
    { id: 'ncd', label: 'NCD', icon: '🫀', endpoint: '/api/ncd/revenue-fiscal', color: '#0f766e', unit: 'revenue' },
    { id: 'quality', label: 'คุณภาพ HA', icon: '⭐', endpoint: '/api/quality/revenue-fiscal', color: '#d97706', unit: 'discharges' },
];

// Default fiscal range: 3 fiscal years back from current
function getDefaultFiscalRange() {
    const now = new Date();
    const cm = now.getMonth() + 1, cy = now.getFullYear();
    const cfs = cm >= 10 ? cy : cy - 1;
    return { start: `${cfs - 2}-10-01`, end: `${cfs + 1}-09-30` };
}

const FY_COLORS = ['#94a3b8', '#0284c7', '#0f766e'];

// Per-department color palette: [ปีงบเก่าสุด, ปีงบกลาง, ปีงบปัจจุบัน]
const DEPT_FY_PALETTE = {
    opd:         ['#7dd3fc', '#0ea5e9', '#0264a7'],  // sky light → sky → deep blue
    ipd:         ['#c4b5fd', '#8b5cf6', '#6d28d9'],  // violet light → violet → purple
    er:          ['#fca5a5', '#ef4444', '#b91c1c'],   // red light → red → dark red
    dental:      ['#fde68a', '#f59e0b', '#b45309'],   // amber light → amber → brown
    xray:        ['#a5f3fc', '#06b6d4', '#0e7490'],   // cyan light → cyan → teal
    pharmacy:    ['#6ee7b7', '#10b981', '#047857'],    // green light → emerald → dark green
    lab:         ['#93c5fd', '#3b82f6', '#1d4ed8'],    // blue light → blue → deep blue
    thaimed:     ['#bef264', '#84cc16', '#4d7c0f'],    // lime light → lime → dark lime
    phystherapy: ['#fda4af', '#f43f5e', '#be123c'],    // rose light → rose → dark rose
    ncd:         ['#5eead4', '#14b8a6', '#0f766e'],    // teal light → teal → dark teal
    quality:     ['#fdba74', '#f97316', '#c2410c'],    // orange light → orange → dark orange
};
const FISCAL_MONTHS = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
// Pre-compute month number for each fiscal month index
const FISCAL_MONTH_NUMS = FISCAL_MONTHS.map((_, i) => ((i + 10 - 1) % 12) + 1);

const fmtB = (v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : v?.toLocaleString() ?? '—';
const fmtFull = (v) => v != null ? `฿${Number(v).toLocaleString()}` : '—';

// Normalize fiscal label: "FY2024" → "ปีงบ 2567", "ปีงบ 2567" → "ปีงบ 2567"
function normalizeFYLabel(fy) {
    const raw = fy.fiscal_label || fy.fiscalLabel || '';
    if (raw.startsWith('ปีงบ')) return raw;
    const match = raw.match(/FY\s*(\d{4})/i);
    if (match) return `ปีงบ ${parseInt(match[1]) + 543}`;
    if (fy.fiscal_year_be) return `ปีงบ ${fy.fiscal_year_be}`;
    if (fy.fiscal_year) return `ปีงบ ${fy.fiscal_year + 543}`;
    return raw || '—';
}

// Build month lookup Map for O(1) access — index by month_num AND month name
// Some routes (Lab, Pharmacy, Quality) only return { month: 'ต.ค.', revenue }
// Others (OPD, IPD, ER, etc.) return { month_num: 10, month: 'ต.ค.', revenue }
const MONTH_NAME_TO_NUM = {};
FISCAL_MONTHS.forEach((name, i) => { MONTH_NAME_TO_NUM[name] = ((i + 10 - 1) % 12) + 1; });

function buildMonthMap(months) {
    const map = new Map();
    for (const m of (months || [])) {
        const key = m.month_num ?? MONTH_NAME_TO_NUM[m.month];
        if (key != null) map.set(key, m);
    }
    return map;
}

// ── Growth Badge ──
const GrowthBadge = React.memo(({ current, previous }) => {
    if (current == null || previous == null || previous === 0) return null;
    const pct = Math.round(((current - previous) / previous) * 100);
    const color = pct >= 0 ? '#10b981' : '#ef4444';
    return (
        <span style={{ fontSize: '10px', fontWeight: 800, color, background: `${color}15`, padding: '2px 6px', borderRadius: '99px', marginLeft: '6px' }}>
            {pct >= 0 ? '↑' : '↓'} {pct >= 0 ? '+' : ''}{pct}%
        </span>
    );
});

// ── Should we exclude the current (incomplete) month? ──
// Only exclude when the applied date range covers today's date
function shouldExcludeCurrentMonth(appliedEnd) {
    if (!appliedEnd) return true; // default → exclude
    const today = new Date();
    const end = new Date(appliedEnd + 'T23:59:59');
    return today <= end; // range covers today → month in-progress
}

// ── Department Compare Card ──
const DeptCard = React.memo(({ dept, data, loading, appliedEnd }) => {
    const fiscalYears = data?.fiscal_years || [];
    if (loading) {
        return (
            <div className="rounded-2xl p-4 animate-pulse" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                <div className="h-4 w-24 rounded mb-3" style={{ background: 'var(--md-border)' }} />
                <div className="h-8 w-32 rounded mb-2" style={{ background: 'var(--md-border)' }} />
                <div className="h-24 rounded" style={{ background: 'var(--md-border)' }} />
            </div>
        );
    }
    if (!fiscalYears.length) return null;

    const latest = fiscalYears[fiscalYears.length - 1];
    const isRevenue = dept.unit === 'revenue';
    const valueLabel = isRevenue ? 'รายได้' : dept.unit === 'orders' ? 'จำนวน Order' : 'จำนวน Discharge';

    // Comparable period label
    const compMonths = latest?.comparable_months || 0;
    const dataMonthNames = (latest?.months || []).filter(m => m.has_data).map(m => m.month);
    const compPeriodLabel = compMonths > 0
        ? `เปรียบเทียบช่วง ${dataMonthNames[0] || ''}–${dataMonthNames[dataMonthNames.length - 1] || ''} (${compMonths} เดือน)`
        : '';

    // Pre-build month maps per FY for O(1) lookup
    const fyMonthMaps = fiscalYears.map(fy => buildMonthMap(fy.months));

    // Build monthly comparison chart data
    // แสดงเดือนที่ปีงบ **ใดปีงบหนึ่ง** มีข้อมูล (ไม่จำกัดเฉพาะปีงบล่าสุด)
    const excludeMonthNum = shouldExcludeCurrentMonth(appliedEnd) ? new Date().getMonth() + 1 : -1;
    const allChartData = FISCAL_MONTHS.map((m, i) => {
        const monthNum = FISCAL_MONTH_NUMS[i];
        const row = { month: m, _monthNum: monthNum };
        fyMonthMaps.forEach((map, fi) => {
            const mo = map.get(monthNum);
            row[`fy${fi}`] = mo?.revenue || mo?.total || 0;
        });
        return row;
    });
    const chartData = allChartData.filter(row => {
        if (row._monthNum === excludeMonthNum) return false;
        // Show if ANY fiscal year has data for this month
        return fiscalYears.some((_, fi) => row[`fy${fi}`] > 0);
    });

    return (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}>
            {/* Header */}
            <div className="p-4 pb-3" style={{ borderLeft: `4px solid ${dept.color}` }}>
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-black flex items-center gap-2" style={{ color: 'var(--md-text-primary)' }}>
                        <span>{dept.icon}</span> {dept.label}
                    </h3>
                    <div className="flex items-center gap-2">
                        {compPeriodLabel && (
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,.1)', color: '#f59e0b' }}>
                                📅 {compPeriodLabel}
                            </span>
                        )}
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${dept.color}15`, color: dept.color }}>
                            {valueLabel}
                        </span>
                    </div>
                </div>

                {/* FY Summary Row */}
                <div className="flex gap-3 mt-2">
                    {fiscalYears.map((fy, fi) => {
                        const isLatest = fi === fiscalYears.length - 1;
                        const compRev = fy.comparable_revenue ?? fy.total_revenue ?? 0;
                        const prevCompRev = fi > 0 ? (fiscalYears[fi - 1].comparable_revenue ?? fiscalYears[fi - 1].total_revenue ?? 0) : null;
                        const palette = DEPT_FY_PALETTE[dept.id] || [dept.color];
                        const fyColor = palette[fi] || palette[palette.length - 1];
                        return (
                            <div key={fi} className="flex-1 rounded-xl p-2.5" style={{
                                background: `${fyColor}10`,
                                border: `1px solid ${fyColor}${isLatest ? '40' : '20'}`,
                                borderTop: `3px solid ${fyColor}`,
                            }}>
                                <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: fyColor }}>
                                    {normalizeFYLabel(fy)}
                                    {isLatest && <span style={{ marginLeft: '4px' }}>● ปัจจุบัน</span>}
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-base font-black" style={{ color: fyColor }}>
                                        {isRevenue ? fmtFull(compRev) : (compRev?.toLocaleString() ?? '—')}
                                    </span>
                                    <GrowthBadge current={compRev} previous={prevCompRev} />
                                </div>
                                <div className="text-[8px] font-medium mt-0.5" style={{ color: 'var(--md-text-tertiary)' }}>
                                    {(fy.total_visits ?? fy.total_cases ?? 0).toLocaleString()} visits
                                    {fy.comparable_months ? ` · ${fy.comparable_months} เดือน` : ''}
                                </div>
                                {fy.total_revenue != null && fy.comparable_revenue != null && fy.total_revenue !== fy.comparable_revenue && (
                                    <div className="text-[8px] font-medium" style={{ color: 'var(--md-text-tertiary)', opacity: 0.7 }}>
                                        ทั้งปี: {isRevenue ? fmtFull(fy.total_revenue) : fy.total_revenue?.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Monthly Chart — Grouped Bars per Fiscal Year */}
            <div className="px-3 pb-3">
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'var(--md-text-tertiary)' }} />
                        <YAxis tick={{ fontSize: 9, fill: 'var(--md-text-tertiary)' }} tickFormatter={fmtB} />
                        <Tooltip
                            contentStyle={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '12px', fontSize: '11px' }}
                            formatter={(v, name) => [isRevenue ? fmtFull(v) : v?.toLocaleString(), name]}
                        />
                        {fiscalYears.map((fy, fi) => {
                            const label = normalizeFYLabel(fy);
                            const palette = DEPT_FY_PALETTE[dept.id] || [dept.color + '50', dept.color + '90', dept.color];
                            const barColor = palette[fi] || palette[palette.length - 1];
                            return <Bar key={fi} dataKey={`fy${fi}`} name={label} fill={barColor} radius={[2, 2, 0, 0]} />;
                        })}
                        <Legend
                            verticalAlign="bottom"
                            height={24}
                            iconType="square"
                            iconSize={8}
                            wrapperStyle={{ fontSize: '9px', fontWeight: 700, paddingTop: '4px' }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

// ── Monthly Detail Table ──
const MonthlyTable = React.memo(({ dept, data, appliedEnd }) => {
    const fiscalYears = data?.fiscal_years || [];
    if (!fiscalYears.length) return null;
    const isRevenue = dept.unit === 'revenue';

    // Pre-build month maps per FY
    const fyMonthMaps = fiscalYears.map(fy => buildMonthMap(fy.months));
    const compMonths = fiscalYears[fiscalYears.length - 1]?.comparable_months || 0;

    // Filter to months where ANY fiscal year has data
    const excludeMo = shouldExcludeCurrentMonth(appliedEnd) ? new Date().getMonth() + 1 : -1;
    const visibleMonths = FISCAL_MONTHS.map((m, i) => {
        const monthNum = FISCAL_MONTH_NUMS[i];
        const hasAnyData = fyMonthMaps.some(map => {
            const mo = map.get(monthNum);
            return (mo?.revenue || mo?.total || 0) > 0;
        });
        return { m, i, monthNum, show: hasAnyData && monthNum !== excludeMo };
    }).filter(v => v.show);

    return (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
            <div className="p-3" style={{ borderLeft: `4px solid ${dept.color}` }}>
                <h4 className="text-xs font-black flex items-center gap-2" style={{ color: 'var(--md-text-primary)' }}>
                    {dept.icon} {dept.label} — รายเดือน
                </h4>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                        <tr style={{ background: 'var(--md-surface-2, #f8fafc)' }}>
                            <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '10px' }}>เดือน</th>
                            {fiscalYears.map((fy, fi) => (
                                <th key={fi} style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, color: fi === fiscalYears.length - 1 ? dept.color : 'var(--md-text-tertiary)', fontSize: '10px' }}>
                                    {normalizeFYLabel(fy)}
                                </th>
                            ))}
                            <th style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, color: '#10b981', fontSize: '10px' }}>YoY %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleMonths.map(({ m, i, monthNum }) => {
                            const vals = fyMonthMaps.map(map => {
                                const mo = map.get(monthNum);
                                return mo?.revenue || mo?.total || 0;
                            });
                            const last = vals[vals.length - 1];
                            const prev = vals.length >= 2 ? vals[vals.length - 2] : 0;
                            const yoy = prev > 0 ? Math.round(((last - prev) / prev) * 100) : null;

                            return (
                                <tr key={i} style={{ borderBottom: '1px solid var(--md-border)' }}>
                                    <td style={{ padding: '5px 10px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>{m}</td>
                                    {vals.map((v, vi) => (
                                        <td key={vi} style={{ padding: '5px 10px', textAlign: 'right', fontWeight: vi === vals.length - 1 ? 700 : 400, color: vi === vals.length - 1 ? 'var(--md-text-primary)' : 'var(--md-text-tertiary)' }}>
                                            {v > 0 ? (isRevenue ? fmtFull(v) : v.toLocaleString()) : '—'}
                                        </td>
                                    ))}
                                    <td style={{ padding: '5px 10px', textAlign: 'right', fontWeight: 700, color: yoy == null ? 'var(--md-text-tertiary)' : yoy >= 0 ? '#10b981' : '#ef4444' }}>
                                        {yoy != null ? `${yoy >= 0 ? '+' : ''}${yoy}%` : '—'}
                                    </td>
                                </tr>
                            );
                        })}
                        {/* Total row */}
                        <tr style={{ background: 'var(--md-surface-2, #f8fafc)', fontWeight: 800 }}>
                            <td style={{ padding: '8px 10px', color: 'var(--md-text-primary)' }}>รวมทั้งปี</td>
                            {fiscalYears.map((fy, fi) => {
                                const total = fy.comparable_revenue ?? fy.total_revenue ?? 0;
                                return (
                                    <td key={fi} style={{ padding: '8px 10px', textAlign: 'right', color: fi === fiscalYears.length - 1 ? dept.color : 'var(--md-text-primary)' }}>
                                        {isRevenue ? fmtFull(total) : total.toLocaleString()}
                                    </td>
                                );
                            })}
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                                {(() => {
                                    const latestFY = fiscalYears[fiscalYears.length - 1];
                                    const prevFY = fiscalYears.length >= 2 ? fiscalYears[fiscalYears.length - 2] : null;
                                    const a = latestFY?.comparable_revenue ?? latestFY?.total_revenue ?? 0;
                                    const b = prevFY?.comparable_revenue ?? prevFY?.total_revenue ?? 0;
                                    const pct = b > 0 ? Math.round(((a - b) / b) * 100) : null;
                                    return pct != null ? (
                                        <span style={{ color: pct >= 0 ? '#10b981' : '#ef4444', fontWeight: 800 }}>
                                            {pct >= 0 ? '+' : ''}{pct}%
                                        </span>
                                    ) : '—';
                                })()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});

// ============================================================
// MAIN COMPONENT
// ============================================================
function CompareTab() {
    const { fetchData, state } = useDashboard();
    const [deptData, setDeptData] = useState({});
    const [loadingDepts, setLoadingDepts] = useState({});
    const [viewMode, setViewMode] = useState('cards');
    const [selectedDepts, setSelectedDepts] = useState(DEPTS.map(d => d.id));
    const [payerData, setPayerData] = useState(null);
    const [payerLoading, setPayerLoading] = useState(false);
    const abortRef = useRef(null);

    // Custom date range
    const defaults = useMemo(() => getDefaultFiscalRange(), []);
    const [dateStart, setDateStart] = useState(defaults.start);
    const [dateEnd, setDateEnd] = useState(defaults.end);
    const [appliedRange, setAppliedRange] = useState({ start: defaults.start, end: defaults.end });

    const isCustomRange = appliedRange.start !== defaults.start || appliedRange.end !== defaults.end;

    const buildQS = useCallback((base) => {
        const sep = base.includes('?') ? '&' : '?';
        return `${base}${sep}start=${appliedRange.start}&end=${appliedRange.end}`;
    }, [appliedRange]);

    // Fetch all data — parallel, with abort on re-fetch
    useEffect(() => {
        // Abort previous in-flight requests
        if (abortRef.current) abortRef.current.abort();
        const ac = new AbortController();
        abortRef.current = ac;
        const signal = ac.signal;

        // Mark all depts loading
        const allLoading = {};
        DEPTS.forEach(d => { allLoading[d.id] = true; });
        setLoadingDepts(allLoading);
        setPayerLoading(true);

        // Fire ALL dept + payer fetches in parallel (no stagger)
        const fetchDept = async (dept) => {
            try {
                const url = buildQS(dept.endpoint);
                const r = await fetch(url, { credentials: 'include', signal });
                if (r.ok) {
                    const data = await r.json();
                    if (!signal.aborted && data?.fiscal_years?.length > 0) {
                        setDeptData(prev => ({ ...prev, [dept.id]: data }));
                    }
                }
            } catch (e) {
                if (e.name === 'AbortError') return;
            }
            if (!signal.aborted) setLoadingDepts(prev => ({ ...prev, [dept.id]: false }));
        };

        const fetchPayer = async () => {
            try {
                const r = await fetch(buildQS('/api/finance/revenue-by-payer-fiscal'), { credentials: 'include', signal });
                if (r.ok) {
                    const data = await r.json();
                    if (!signal.aborted && data) setPayerData(data);
                }
            } catch (e) {
                if (e.name === 'AbortError') return;
            }
            if (!signal.aborted) setPayerLoading(false);
        };

        // All requests fire simultaneously
        DEPTS.forEach(dept => fetchDept(dept));
        fetchPayer();

        return () => ac.abort();
    }, [appliedRange, buildQS]);

    // Summary across all departments
    const summary = useMemo(() => {
        const result = { fyLabels: [], totalByFY: [], visitsByFY: [] };
        const allFYs = {};

        for (const dept of DEPTS) {
            const fys = deptData[dept.id]?.fiscal_years;
            if (!fys) continue;
            for (const fy of fys) {
                if (dept.unit !== 'revenue') continue;
                const label = normalizeFYLabel(fy);
                if (!allFYs[label]) allFYs[label] = { revenue: 0, visits: 0 };
                allFYs[label].revenue += (fy.comparable_revenue ?? fy.total_revenue ?? 0);
                allFYs[label].visits += (fy.total_visits ?? fy.total_cases ?? 0);
            }
        }

        result.fyLabels = Object.keys(allFYs);
        result.totalByFY = Object.values(allFYs).map(v => v.revenue);
        result.visitsByFY = Object.values(allFYs).map(v => v.visits);
        return result;
    }, [deptData]);

    const toggleDept = useCallback((id) => {
        setSelectedDepts(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
    }, []);

    return (
        <div className="space-y-5 animate-fade-in pb-10">
            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #0f766e, #0284c7)', borderRadius: '99px' }} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    📊 เปรียบเทียบข้อมูลปีงบประมาณ
                </h2>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(15,118,110,.1)', color: '#0f766e' }}>
                    {DEPTS.length} แผนก · ปีงบไทย ต.ค.–ก.ย.
                </span>
                {isCustomRange && (
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(139,92,246,.1)', color: '#7c3aed' }}>
                        กำหนดเอง
                    </span>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                    {[{ id: 'cards', label: '📊 Cards' }, { id: 'table', label: '📋 Table' }].map(v => (
                        <button key={v.id} onClick={() => setViewMode(v.id)}
                            style={{
                                padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                background: viewMode === v.id ? 'var(--md-primary)' : 'var(--md-surface-2, #f1f5f9)',
                                color: viewMode === v.id ? '#fff' : 'var(--md-text-secondary)',
                            }}>{v.label}</button>
                    ))}
                </div>
            </div>

            {/* ── Date Range Picker ── */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>📅 ช่วงข้อมูล</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>เริ่มต้น</label>
                    <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)}
                        style={{ padding: '5px 10px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '12px', fontWeight: 600, background: 'var(--md-surface-2, #f8fafc)', color: 'var(--md-text-primary)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>สิ้นสุด</label>
                    <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)}
                        style={{ padding: '5px 10px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '12px', fontWeight: 600, background: 'var(--md-surface-2, #f8fafc)', color: 'var(--md-text-primary)', outline: 'none' }} />
                </div>
                <button onClick={() => { if (dateStart && dateEnd && dateStart <= dateEnd) setAppliedRange({ start: dateStart, end: dateEnd }); }}
                    disabled={!dateStart || !dateEnd || dateStart > dateEnd}
                    style={{
                        padding: '6px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: 800,
                        border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                        background: 'linear-gradient(135deg, #0f766e, #0284c7)', color: '#fff',
                        opacity: (!dateStart || !dateEnd || dateStart > dateEnd) ? 0.5 : 1,
                    }}>โหลดข้อมูล</button>
                {isCustomRange && (
                    <button onClick={() => { setDateStart(defaults.start); setDateEnd(defaults.end); setAppliedRange({ start: defaults.start, end: defaults.end }); }}
                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, border: '1px solid var(--md-border)', background: 'var(--md-surface)', color: 'var(--md-text-secondary)', cursor: 'pointer' }}>
                        รีเซ็ต (3 ปีงบ)
                    </button>
                )}
                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                    {isCustomRange
                        ? `${new Date(appliedRange.start).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })} — ${new Date(appliedRange.end).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}`
                        : 'ค่าเริ่มต้น: 3 ปีงบประมาณ ต.ค.–ก.ย.'
                    }
                </span>
            </div>

            {/* ── Grand Total Summary ── */}
            {summary.fyLabels.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,.06), rgba(2,132,199,.04))', border: '1px solid var(--md-border)' }}>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--md-text-secondary)' }}>
                            🏥 รายได้รวมทุกแผนก (Comparable Period — เปรียบเทียบช่วงเดียวกันทุกปี)
                        </h3>
                        <span className="text-[9px] font-bold px-2 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,.08)', color: '#d97706', border: '1px solid rgba(245,158,11,.2)' }}>
                            ⚠️ นับถึง {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} — เปรียบเทียบเฉพาะเดือนที่มีข้อมูลครบทุกปี
                        </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${summary.fyLabels.length}, 1fr)`, gap: '12px' }}>
                        {summary.fyLabels.map((label, i) => {
                            const isLatest = i === summary.fyLabels.length - 1;
                            const prevRev = i > 0 ? summary.totalByFY[i - 1] : null;
                            return (
                                <div key={i} className="rounded-xl p-4" style={{
                                    background: isLatest ? 'rgba(15,118,110,.08)' : 'var(--md-surface)',
                                    border: isLatest ? '2px solid rgba(15,118,110,.3)' : '1px solid var(--md-border)',
                                }}>
                                    <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: isLatest ? '#0f766e' : 'var(--md-text-tertiary)' }}>
                                        {label} {isLatest && '● ปัจจุบัน'}
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-black" style={{ color: isLatest ? '#0f766e' : 'var(--md-text-primary)' }}>
                                            ฿{(summary.totalByFY[i] / 1e6).toFixed(1)}M
                                        </span>
                                        <GrowthBadge current={summary.totalByFY[i]} previous={prevRev} />
                                    </div>
                                    <div className="text-[10px] font-medium mt-1" style={{ color: 'var(--md-text-tertiary)' }}>
                                        {summary.visitsByFY[i]?.toLocaleString() || '—'} visits
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Department Filter ── */}
            <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setSelectedDepts(selectedDepts.length === DEPTS.length ? [] : DEPTS.map(d => d.id))}
                    style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: 700, border: '1px solid var(--md-border)', background: selectedDepts.length === DEPTS.length ? 'var(--md-primary)' : 'var(--md-surface)', color: selectedDepts.length === DEPTS.length ? '#fff' : 'var(--md-text-secondary)', cursor: 'pointer' }}>
                    {selectedDepts.length === DEPTS.length ? '✓ ทั้งหมด' : 'เลือกทั้งหมด'}
                </button>
                {DEPTS.map(d => (
                    <button key={d.id} onClick={() => toggleDept(d.id)}
                        style={{
                            padding: '4px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: 700,
                            border: `1px solid ${selectedDepts.includes(d.id) ? d.color + '50' : 'var(--md-border)'}`,
                            background: selectedDepts.includes(d.id) ? `${d.color}12` : 'var(--md-surface)',
                            color: selectedDepts.includes(d.id) ? d.color : 'var(--md-text-tertiary)',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                        {d.icon} {d.label}
                    </button>
                ))}
            </div>

            {/* ── Department Cards / Tables ── */}
            {viewMode === 'cards' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
                    {DEPTS.filter(d => selectedDepts.includes(d.id)).map(dept => (
                        <DeptCard key={dept.id} dept={dept} data={deptData[dept.id]} loading={loadingDepts[dept.id]} appliedEnd={appliedRange.end} />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {DEPTS.filter(d => selectedDepts.includes(d.id)).map(dept => (
                        <MonthlyTable key={dept.id} dept={dept} data={deptData[dept.id]} appliedEnd={appliedRange.end} />
                    ))}
                </div>
            )}

            {/* ══ Revenue by Payer — Fiscal Year Comparison ══ */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}>
                <div className="p-4 pb-3" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-sm font-black flex items-center gap-2" style={{ color: 'var(--md-text-primary)' }}>
                            💳 รายได้แยกตามสิทธิ์ — {isCustomRange
                                ? `${new Date(appliedRange.start).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })} – ${new Date(appliedRange.end).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}`
                                : 'เปรียบเทียบปีงบประมาณ'}
                        </h3>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {isCustomRange && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,.1)', color: '#d97706' }}>
                                    📅 {new Date(appliedRange.start).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} — {new Date(appliedRange.end).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} ทุกปี
                                </span>
                            )}
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,.1)', color: '#8b5cf6' }}>
                                Top 15 สิทธิ์ · {isCustomRange ? 'ช่วงกำหนดเอง' : 'Comparable Period'}
                            </span>
                        </div>
                    </div>
                </div>

                {payerLoading && (
                    <div className="p-6 animate-pulse">
                        <div className="h-6 w-48 rounded mb-3" style={{ background: 'var(--md-border)' }} />
                        {[1,2,3,4,5].map(i => <div key={i} className="h-12 rounded mb-2" style={{ background: 'var(--md-border)' }} />)}
                    </div>
                )}

                {!payerLoading && payerData?.fiscal_years?.length > 0 && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                            <thead>
                                <tr style={{ background: 'var(--md-surface-2, #f8fafc)' }}>
                                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '10px', minWidth: '180px' }}>สิทธิ์การรักษา</th>
                                    {payerData.fiscal_years.map((fy, fi) => {
                                        const isLatest = fi === payerData.fiscal_years.length - 1;
                                        const periodLabel = fy.query_start && fy.query_end && isCustomRange
                                            ? `${new Date(fy.query_start).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}–${new Date(fy.query_end).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}`
                                            : null;
                                        return (
                                            <th key={fi} style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, fontSize: '10px', color: isLatest ? '#8b5cf6' : 'var(--md-text-tertiary)' }}>
                                                <div>{normalizeFYLabel(fy)}{isLatest && <span style={{ color: '#8b5cf6', marginLeft: '4px' }}>●</span>}</div>
                                                {periodLabel && <div style={{ fontSize: '8px', fontWeight: 600, opacity: 0.7 }}>{periodLabel}</div>}
                                            </th>
                                        );
                                    })}
                                    <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, color: '#10b981', fontSize: '10px' }}>YoY %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(payerData.top_payers || []).map((tp, pi) => {
                                    const vals = payerData.fiscal_years.map(fy => {
                                        const pd = (fy.payers || []).find(p => (p.payer_code || p.payer) === (tp.payer_code || tp.payer));
                                        return pd?.total_revenue || 0;
                                    });
                                    const latest = vals[vals.length - 1];
                                    const prev = vals.length >= 2 ? vals[vals.length - 2] : 0;
                                    const yoy = prev > 0 ? Math.round(((latest - prev) / prev) * 100) : null;

                                    return (
                                        <tr key={pi} style={{ borderBottom: '1px solid var(--md-border)' }}>
                                            <td style={{ padding: '6px 12px', fontWeight: 600, color: 'var(--md-text-primary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                <span style={{ fontSize: '9px', fontWeight: 800, color: '#8b5cf6', background: 'rgba(139,92,246,.08)', padding: '1px 4px', borderRadius: '3px', marginRight: '4px' }}>
                                                    {tp.payer_code || '#'}
                                                </span>
                                                {tp.payer}
                                            </td>
                                            {vals.map((v, vi) => (
                                                <td key={vi} style={{ padding: '6px 10px', textAlign: 'right', fontWeight: vi === vals.length - 1 ? 700 : 400, color: vi === vals.length - 1 ? 'var(--md-text-primary)' : 'var(--md-text-tertiary)' }}>
                                                    {v > 0 ? fmtFull(v) : '—'}
                                                </td>
                                            ))}
                                            <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, color: yoy == null ? 'var(--md-text-tertiary)' : yoy >= 0 ? '#10b981' : '#ef4444' }}>
                                                {yoy != null ? `${yoy >= 0 ? '+' : ''}${yoy}%` : '—'}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Total row */}
                                <tr style={{ background: 'var(--md-surface-2, #f8fafc)', fontWeight: 800 }}>
                                    <td style={{ padding: '10px 12px', color: 'var(--md-text-primary)' }}>รวมทั้งหมด</td>
                                    {payerData.fiscal_years.map((fy, fi) => {
                                        const total = (fy.payers || []).reduce((s, p) => s + (p.total_revenue || 0), 0);
                                        return (
                                            <td key={fi} style={{ padding: '10px 10px', textAlign: 'right', color: fi === payerData.fiscal_years.length - 1 ? '#8b5cf6' : 'var(--md-text-primary)' }}>
                                                {fmtFull(total)}
                                            </td>
                                        );
                                    })}
                                    <td style={{ padding: '10px 10px', textAlign: 'right' }}>
                                        {(() => {
                                            const totals = payerData.fiscal_years.map(fy => (fy.payers || []).reduce((s, p) => s + (p.total_revenue || 0), 0));
                                            const a = totals[totals.length - 1], b = totals.length >= 2 ? totals[totals.length - 2] : 0;
                                            const pct = b > 0 ? Math.round(((a - b) / b) * 100) : null;
                                            return pct != null ? <span style={{ color: pct >= 0 ? '#10b981' : '#ef4444' }}>{pct >= 0 ? '+' : ''}{pct}%</span> : '—';
                                        })()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {!payerLoading && !payerData && (
                    <div className="p-8 text-center" style={{ color: 'var(--md-text-tertiary)', fontSize: '12px' }}>
                        กำลังโหลดข้อมูลสิทธิ์...
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="text-center" style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', padding: '12px 0' }}>
                📊 BCH 360° Intelligence · ปีงบประมาณไทย (ต.ค.–ก.ย.) · HOSxP XE · {isCustomRange ? 'ช่วงกำหนดเอง' : '3 ปีงบ'} · Comparable months
            </div>
        </div>
    );
}

export default React.memo(CompareTab);
