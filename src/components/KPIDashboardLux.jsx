// ============================================================
// 🏆 BCH 360° Intelligence — Premium KPI Dashboard Luxury Edition
// Ultra-Premium Design: Glassmorphism + Gradient Accents
// ============================================================
import React, { useState, useMemo } from 'react';

// ─── Module-level helpers (defined before any component that uses them) ────────

function formatKPIValue(value, format) {
    if (value === null || value === undefined) return '—';
    switch (format) {
        case 'currency':
            if (value >= 1000000) return `฿${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000)    return `฿${(value / 1000).toFixed(0)}K`;
            return `฿${value.toLocaleString()}`;
        case 'percent':
            return `${parseFloat(value).toFixed(1)}%`;
        case 'decimal':
            return parseFloat(value).toFixed(2);
        case 'number':
        default:
            return value.toLocaleString();
    }
}

function getTrendColor(trend, inverted = false) {
    if (trend == null) return 'text-gray-600 dark:text-gray-400';
    if (trend > 0 && !inverted) return 'text-emerald-600 dark:text-emerald-400';
    if (trend < 0 && !inverted) return 'text-rose-600 dark:text-rose-400';
    if (trend < 0 && inverted)  return 'text-emerald-600 dark:text-emerald-400';
    if (trend > 0 && inverted)  return 'text-rose-600 dark:text-rose-400';
    return 'text-gray-600 dark:text-gray-400';
}

function getTrendIcon(trend, inverted = false) {
    if (trend == null) return '';
    if (inverted) return trend < 0 ? '📈' : '📉';
    return trend > 0 ? '📈' : '📉';
}

function getStatusClass(value, benchmark, inverted = false) {
    if (value == null || !benchmark) return 'bg-gray-300 dark:bg-gray-600';
    const pct = (value / benchmark) * 100;
    if (inverted) {
        if (pct <= 70)  return 'bg-emerald-500';
        if (pct <= 100) return 'bg-yellow-500';
        return 'bg-rose-500';
    } else {
        if (pct >= 100) return 'bg-emerald-500';
        if (pct >= 75)  return 'bg-yellow-500';
        return 'bg-rose-500';
    }
}

// ─── PremiumKPICard (module-level) ─────────────────────────────────────────────

function PremiumKPICard({ kpi, categoryColor, hoveredCard, setHoveredCard }) {
    const isHovered = hoveredCard === kpi.id;
    const formattedValue = formatKPIValue(kpi.value, kpi.format);
    const trendColor  = getTrendColor(kpi.trend, kpi.inverted);
    const trendIcon   = getTrendIcon(kpi.trend, kpi.inverted);
    const statusClass = getStatusClass(kpi.value, kpi.benchmark, kpi.inverted);

    return (
        <div
            onMouseEnter={() => setHoveredCard(kpi.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative group cursor-pointer transition-all duration-300 ease-out ${
                isHovered ? 'scale-105 shadow-2xl' : 'shadow-lg hover:shadow-xl'
            }`}
        >
            {/* Glassmorphic Background */}
            <div className={`absolute inset-0 rounded-2xl backdrop-blur-xl backdrop-brightness-110 border border-white/20 dark:border-gray-700/30 transition-all duration-300 ${
                isHovered ? 'bg-white/60 dark:bg-gray-800/60' : 'bg-white dark:bg-gray-800'
            }`} />

            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${categoryColor.gradient}`} />

            {/* Content */}
            <div className="relative p-6 z-10">
                {/* Header: Icon + Label */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="text-4xl filter drop-shadow-sm">{kpi.icon}</div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                                {kpi.label}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{kpi.target}</p>
                        </div>
                    </div>
                    <div className={`${categoryColor.badge} px-3 py-1 rounded-full text-xs font-semibold`}>
                        {kpi.unit}
                    </div>
                </div>

                {/* Main Value */}
                <div className="mb-6">
                    <div className={`text-4xl font-black tracking-tight bg-gradient-to-r ${categoryColor.gradient} bg-clip-text text-transparent`}>
                        {formattedValue}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {kpi.value != null ? 'ข้อมูลจริงจาก HOSxP' : 'รอข้อมูล...'}
                    </p>
                </div>

                {/* Trend + Status Bar */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {kpi.trend != null ? (
                        <div className={`flex items-center gap-1 ${trendColor}`}>
                            <span className="text-lg font-bold">{trendIcon}</span>
                            <span className="text-sm font-bold">{Math.abs(kpi.trend)}%</span>
                            <span className="text-xs font-medium ml-1">เทียบก่อนหน้า</span>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">ไม่มีข้อมูลเปรียบเทียบ</span>
                    )}
                    <div className={`w-3 h-3 rounded-full ${statusClass} shadow-lg`} />
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${categoryColor.gradient}`}
                            style={{
                                width: kpi.value != null && kpi.benchmark
                                    ? `${Math.min((kpi.value / kpi.benchmark) * 100, 100)}%`
                                    : '0%'
                            }}
                        />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">ความคืบหน้า</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                            {kpi.value != null && kpi.benchmark
                                ? `${Math.round((kpi.value / kpi.benchmark) * 100)}% เป้า`
                                : '—'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── CategorySection (module-level) ────────────────────────────────────────────

function CategorySection({ category, selectedCategory, setSelectedCategory, hoveredCard, setHoveredCard }) {
    const isSelected = selectedCategory === 'all' || selectedCategory === category.id;
    if (!isSelected) return null;

    return (
        <div className="transition-all duration-300">
            {/* Category Header */}
            <div className="mb-8">
                <div
                    className="flex items-center gap-3 mb-2 cursor-pointer group"
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                >
                    <div className="text-3xl">{category.color.icon}</div>
                    <div className="flex-1">
                        <h2 className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${category.color.gradient} transition-transform group-hover:scale-105`}>
                            {category.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {category.kpis.map(kpi => (
                    <PremiumKPICard
                        key={kpi.id}
                        kpi={kpi}
                        categoryColor={category.color}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── SummaryHeader (module-level) ──────────────────────────────────────────────

function SummaryHeader({ kpiMetrics }) {
    const rev = kpiMetrics.totalRevenue;
    const opd = kpiMetrics.opdVisits;
    const totalPatients = (opd != null || kpiMetrics.ipdAdmissions != null)
        ? ((opd ?? 0) + (kpiMetrics.ipdAdmissions ?? 0))
        : null;
    const revDisplay = rev != null
        ? (rev >= 1000000 ? `฿${(rev / 1000000).toFixed(1)}M` : rev >= 1000 ? `฿${(rev / 1000).toFixed(0)}K` : `฿${rev.toLocaleString()}`)
        : '—';

    const summaryCard = (label, value, sub, gradient) => (
        <div className="group cursor-pointer" key={label}>
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/30 group-hover:bg-white/80 dark:group-hover:bg-gray-800/80 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-3">{label}</span>
                <div className={`text-3xl font-black ${gradient ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent` : 'text-gray-700 dark:text-gray-200'}`}>
                    {value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{sub}</p>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {summaryCard('ระบบ DB', 'LIVE', 'HOSxP XE — 10.1.0.3', null)}
            {summaryCard('รายได้เดือนนี้', revDisplay, new Date().toLocaleString('th-TH', { month: 'long', year: 'numeric' }), 'from-emerald-500 to-teal-600')}
            {summaryCard('ผู้ป่วยวันนี้', totalPatients != null ? `${totalPatients}+` : '—', 'OPD + IPD วันนี้', 'from-indigo-500 to-blue-600')}
            {summaryCard('อัปเดต', 'เรียลไทม์', '⚡ อัปเดตทุก 30 วินาที', null)}
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

const KPIDashboardLux = ({
    kpiMetrics = {},
    aiInsights = {},
    loading = false,
    darkMode = false
}) => {
    const [hoveredCard, setHoveredCard]         = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // ---------- Premium Color Palette ----------
    const colorScheme = {
        revenue: {
            gradient: 'from-emerald-500 to-teal-600',
            icon: '💰',
            badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
            light: 'from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950'
        },
        clinical: {
            gradient: 'from-indigo-500 to-blue-600',
            icon: '🏥',
            badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            light: 'from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950'
        },
        claims: {
            gradient: 'from-rose-500 to-pink-600',
            icon: '📋',
            badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
            light: 'from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950'
        },
        staffing: {
            gradient: 'from-purple-500 to-indigo-600',
            icon: '👥',
            badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            light: 'from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950'
        }
    };

    // ---------- KPI Categories Definition ----------
    const kpiCategories = useMemo(() => [
        {
            id: 'revenue',
            title: '💰 รายได้และการเงิน',
            subtitle: 'Revenue & Finance Metrics',
            color: colorScheme.revenue,
            kpis: [
                {
                    id: 'total-revenue',
                    label: 'รายได้เดือนนี้',
                    value: kpiMetrics.totalRevenue ?? null,
                    unit: 'บาท', format: 'currency', icon: '💵',
                    trend: kpiMetrics.revenueGrowth ?? null,
                    target: 'เทียบเดือนก่อน', benchmark: 95
                },
                {
                    id: 'collection-rate',
                    label: 'อัตราการเรียกเก็บ',
                    value: kpiMetrics.collectionRate ?? null,
                    unit: '%', format: 'percent', icon: '💳',
                    trend: kpiMetrics.collectionTrend ?? null,
                    target: 'เป้าหมาย 90%', benchmark: 90
                },
                {
                    id: 'profit-margin',
                    label: 'กำไรสุทธิ (ประมาณ)',
                    value: kpiMetrics.totalRevenue != null ? kpiMetrics.totalRevenue * 0.35 : null,
                    unit: 'บาท', format: 'currency', icon: '📈',
                    trend: null,
                    target: 'ประมาณ 35% ของรายได้', benchmark: 35
                }
            ]
        },
        {
            id: 'clinical',
            title: '🏥 ปฏิบัติการทางคลินิก',
            subtitle: 'Clinical Operations',
            color: colorScheme.clinical,
            kpis: [
                {
                    id: 'ipd-occupancy',
                    label: 'อัตราครองเตียง IPD',
                    value: kpiMetrics.inpatientOccupancy ?? null,
                    unit: '%', format: 'percent', icon: '🛏️',
                    trend: kpiMetrics.occupancyTrend ?? null,
                    target: 'เป้าหมาย 75%', benchmark: 75
                },
                {
                    id: 'opd-visits',
                    label: 'ผู้มาตรวจรักษา OPD',
                    value: kpiMetrics.opdVisits ?? null,
                    unit: 'คน', format: 'number', icon: '👥',
                    trend: kpiMetrics.opdGrowth ?? null,
                    target: 'เทียบวันก่อน', benchmark: 400
                },
                {
                    id: 'avg-los',
                    label: 'ระยะเวลานอนเฉลี่ย',
                    value: kpiMetrics.averageLOS ?? null,
                    unit: 'วัน', format: 'decimal', icon: '📅',
                    trend: kpiMetrics.losTrend ?? null,
                    target: 'เป้าหมาย < 4 วัน', benchmark: 4, inverted: true
                }
            ]
        },
        {
            id: 'claims',
            title: '📋 สิทธิและการเบิกจ่าย',
            subtitle: 'Claims & Insurance',
            color: colorScheme.claims,
            kpis: [
                {
                    id: 'claims-approved',
                    label: 'สิทธิอนุมัติ',
                    value: kpiMetrics.approvalRate ?? null,
                    unit: '%', format: 'percent', icon: '✅',
                    trend: kpiMetrics.approvalTrend ?? null,
                    target: 'เป้าหมาย 92%', benchmark: 92
                },
                {
                    id: 'denial-rate',
                    label: 'อัตราปฏิเสธ',
                    value: kpiMetrics.denialRate ?? null,
                    unit: '%', format: 'percent', icon: '❌',
                    trend: kpiMetrics.denialTrend ?? null,
                    target: '< 8% (ดี)', benchmark: 8, inverted: true
                },
                {
                    id: 'debtors-outstanding',
                    label: 'ค้างชำระ (Debtors)',
                    value: kpiMetrics.deptorsOutstanding ?? null,
                    unit: 'บาท', format: 'currency', icon: '💰',
                    trend: kpiMetrics.debtorsTrend ?? null,
                    target: 'ลดลง (ดี)', benchmark: 500000, inverted: true
                }
            ]
        },
        {
            id: 'staffing',
            title: '👥 ทรัพยากรบุคคล',
            subtitle: 'Human Resources',
            color: colorScheme.staffing,
            kpis: [
                {
                    id: 'staff-on-duty',
                    label: 'บุคลากรปฏิบัติงาน',
                    value: kpiMetrics.staffOnDuty ?? null,
                    unit: 'คน', format: 'number', icon: '👨‍⚕️',
                    trend: kpiMetrics.staffTrend ?? null,
                    target: 'ตามตารางเวรกำหนด', benchmark: 120
                },
                {
                    id: 'utilization-rate',
                    label: 'อัตราใช้ประโยชน์',
                    value: kpiMetrics.staffUtilization ?? null,
                    unit: '%', format: 'percent', icon: '⚙️',
                    trend: kpiMetrics.utilizationTrend ?? null,
                    target: 'เหมาะสม 80-90%', benchmark: 85
                },
                {
                    id: 'overtime-hours',
                    label: 'ชั่วโมงล่วงเวลา',
                    value: kpiMetrics.overtimeHours ?? null,
                    unit: 'ชั่วโมง', format: 'number', icon: '⏰',
                    trend: kpiMetrics.overtimeTrend ?? null,
                    target: 'ลดลง (ดี)', benchmark: 200, inverted: true
                }
            ]
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [kpiMetrics]);

    // ---------- Loading State ----------
    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">กำลังโหลดข้อมูล KPI...</p>
                </div>
            </div>
        );
    }

    // ---------- Main Render ----------
    return (
        <div className="w-full">
            {/* Page Title */}
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                    📊 แดชบอร์ด KPI หลักของโรงพยาบาล
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    ตัวชี้วัดสำคัญ (Key Performance Indicators) ที่ถูกอัปเดตอย่างเรียลไทม์
                </p>
            </div>

            {/* Summary Header */}
            <SummaryHeader kpiMetrics={kpiMetrics} />

            {/* Category Filter Buttons */}
            <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === 'all'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
                    }`}
                >
                    ทั้งหมด
                </button>
                {kpiCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                            selectedCategory === cat.id || selectedCategory === 'all'
                                ? `bg-gradient-to-r ${cat.color.gradient} text-white shadow-lg`
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
                        }`}
                    >
                        {cat.color.icon} {cat.title.split(' ')[1]}
                    </button>
                ))}
            </div>

            {/* KPI Categories */}
            <div>
                {kpiCategories.map(category => (
                    <CategorySection
                        key={category.id}
                        category={category}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                    />
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    💡 คลิกที่หัวข้อหมวดหมู่เพื่อกรอง • ข้อมูลจาก HOSxP XE — อัปเดตทุก 30 วินาที
                </p>
            </div>
        </div>
    );
};

export default KPIDashboardLux;
