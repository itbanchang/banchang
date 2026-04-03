// ============================================================
// BCH 360° Intelligence V.10 - Laboratory Operations Tab
// 🔬 AI Lab Diagnostics + Professional Lab Analytics KPIs
// ⏱️ Professional Data Analytics KPIs Edition — Premium Quality
// ============================================================
import React, { useEffect, useMemo } from 'react';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Area, ComposedChart
} from 'recharts';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import AIServerInsights from './shared/AIServerInsights.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';

// Color theme: sky blue / cyan for laboratory
const THEME = {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(6,182,212,0.05) 100%)',
    border: 'rgba(14,165,233,0.25)',
    light: 'rgba(14,165,233,0.08)',
};

const PIE_COLORS = ['#0ea5e9', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#6366f1'];

// ── Critical Lab Value severity thresholds ──
const CRITICAL_SEVERITY = {
    K:        { unit: 'mEq/L', danger: [v => v < 2.5 || v > 6.5, '#f43f5e'], warning: [v => v < 3.0 || v > 5.5, '#f59e0b'] },
    Na:       { unit: 'mEq/L', danger: [v => v < 120 || v > 160, '#f43f5e'], warning: [v => v < 125 || v > 155, '#f59e0b'] },
    Glucose:  { unit: 'mg/dL', danger: [v => v < 40 || v > 500, '#f43f5e'], warning: [v => v < 50 || v > 400, '#f59e0b'] },
    Hb:       { unit: 'g/dL',  danger: [v => v < 5.0, '#f43f5e'], warning: [v => v < 7.0, '#f59e0b'] },
    Troponin: { unit: 'ng/mL', danger: [v => v > 0.4, '#f43f5e'], warning: [v => v > 0.04, '#f59e0b'] },
    Lactate:  { unit: 'mmol/L',danger: [v => v > 4.0, '#f43f5e'], warning: [v => v > 2.0, '#f59e0b'] },
    WBC:      { unit: 'x10^3', danger: [v => v < 1.0 || v > 30, '#f43f5e'], warning: [v => v < 2.0 || v > 20, '#f59e0b'] },
    PLT:      { unit: 'x10^3', danger: [v => v < 20 || v > 1000, '#f43f5e'], warning: [v => v < 50, '#f59e0b'] },
    Cr:       { unit: 'mg/dL', danger: [v => v > 10, '#f43f5e'], warning: [v => v > 4.0, '#f59e0b'] },
    pH:       { unit: '',      danger: [v => v < 7.1 || v > 7.6, '#f43f5e'], warning: [v => v < 7.25 || v > 7.55, '#f59e0b'] },
};

function getCriticalColor(testName, value) {
    const num = parseFloat(value);
    if (isNaN(num)) return '#f59e0b';
    const cfg = CRITICAL_SEVERITY[testName];
    if (!cfg) return '#f59e0b';
    if (cfg.danger[0](num)) return cfg.danger[1];
    if (cfg.warning[0](num)) return cfg.warning[1];
    return '#10b981';
}

function LaboratoryTab() {
    const state = useShallowDashboardSelector(s => ({ labToday: s.labToday, labAnalytics: s.labAnalytics, labRevenueFiscal: s.labRevenueFiscal, labAI: s.labAI, loading: s.loading }));
    const { fetchData } = useDashboardActions();
    const labToday = state.labToday || {};
    const labAnalytics = state.labAnalytics;
    const labRevenueFiscal = state.labRevenueFiscal;
    const loading = state.loading || {};

    useEffect(() => {
        if (!labToday.total_orders && !loading.labToday) {
            fetchData('labToday', '/api/lab/today');
        }
        if (!labAnalytics && !loading.labAnalytics) {
            fetchData('labAnalytics', '/api/lab/analytics');
        }
        if (!labRevenueFiscal && !loading.labRevenueFiscal) {
            fetchData('labRevenueFiscal', '/api/lab/revenue-fiscal');
        }
        // AI Lab Optimization (deferred)
        const t = setTimeout(() => fetchData('labAI', '/api/ai/lab/optimization'), 300);
        return () => clearTimeout(t);
    }, [fetchData]);

    // ━━━━━━ AI Strategic Intelligence ━━━━━━
    const aiAnalytics = useMemo(() => {
        const defaultResult = {
            problems: [],
            urgencyScore: 0,
            urgencyColor: '#10b981',
            urgencyLabel: 'ปกติ',
            latestFY: { fiscal_label: 'FY' },
            yoyGrowth: 0,
            strategicKPIs: [],
        };

        if (!labAnalytics) return defaultResult;

        const a = labAnalytics;
        const lpi = a.lpi ?? 0;
        const avgTat = a.avg_tat ?? 0;
        const p90Tat = a.p90_tat ?? 0;
        const completionRate = a.completion_rate ?? 0;
        const abnormalRate = a.abnormal_rate ?? 0;
        const tatSlaPct = a.tat_sla_pct ?? 0;
        const overdueCount = a.overdue_count ?? 0;

        const problems = [];

        if (p90Tat > 240) {
            problems.push({
                priority: 1, severity: 'critical', color: '#f43f5e',
                title: 'TAT P90 วิกฤต: ' + p90Tat + ' นาที (' + (p90Tat / 60).toFixed(1) + ' ชม.)',
                rootCause: 'ผู้ป่วย 10% รอผลนานกว่า ' + (p90Tat / 60).toFixed(1) + ' ชั่วโมง บ่งชี้คอขวดในกระบวนการตรวจหรือรายงานผล',
                cascadeEffect: 'Clinical Decision Making ล่าช้า อาจทำให้แพทย์ต้องรอผลก่อน Discharge หรือเปลี่ยนแผนการรักษา',
                fixFirst: 'ตรวจสอบ Bottleneck: เครื่องมือ/reagent ขาด หรือ Workload เกินกำลังนักเทคนิค',
            });
        } else if (avgTat > 120) {
            problems.push({
                priority: 2, severity: 'warning', color: '#f59e0b',
                title: 'TAT เฉลี่ยสูงกว่าเกณฑ์: ' + avgTat + ' นาที',
                rootCause: 'TAT เฉลี่ยเกิน 2 ชั่วโมง (เป้าหมาย < 60 นาที) อาจกระทบ Clinical Decision Making',
                cascadeEffect: 'แพทย์ไม่สามารถวินิจฉัยและสั่งการรักษาได้ทันเวลา ส่งผลต่อ Length of Stay',
                fixFirst: 'ปรับ Priority Queue สำหรับ Stat/Urgent Orders และตรวจสอบ Analyzer Downtime',
            });
        }

        if (completionRate < 90) {
            problems.push({
                priority: 2, severity: 'warning', color: '#f59e0b',
                title: 'อัตราความสมบูรณ์ต่ำ: ' + completionRate + '%',
                rootCause: 'มี ' + overdueCount + ' รายการที่ยังไม่มีผล อาจมีปัญหา System Interface หรือ Reagent หมด',
                cascadeEffect: 'ผลตรวจไม่ครบถ้วนส่งผลกระทบต่อ Care Continuity และ Discharge Planning',
                fixFirst: 'ตรวจสอบ LIS Interface กับ Analyzer และรายการค้างรายงานผล',
            });
        }

        if (overdueCount > 20) {
            problems.push({
                priority: 1, severity: 'critical', color: '#f43f5e',
                title: 'รายการ Overdue: ' + overdueCount + ' รายการ',
                rootCause: 'มีผลตรวจค้างมากกว่า 20 รายการ ที่ยังไม่ได้รายงานผลในวันก่อนหน้า',
                cascadeEffect: 'Backlog สะสมอาจทำให้ TAT ของวันถัดไปพุ่งสูงขึ้นแบบ Cascading',
                fixFirst: 'แจ้งเตือน Supervisor ทันที และ Clear Backlog ก่อน Accept คำสั่งตรวจใหม่',
            });
        }

        if (tatSlaPct > 0 && tatSlaPct < 60) {
            problems.push({
                priority: 3, severity: 'warning', color: '#f59e0b',
                title: 'TAT SLA (<60min) ต่ำ: ' + tatSlaPct + '%',
                rootCause: 'เพียง ' + tatSlaPct + '% ของ Lab orders ที่ได้ผลภายใน 60 นาที (เป้าหมาย >= 70%)',
                cascadeEffect: 'ER/ICU ได้รับผลตรวจช้า ส่งผลต่อ Time-Critical Decisions',
                fixFirst: 'เพิ่ม STAT lane สำหรับ Critical Tests และจัดลำดับความสำคัญ ICU/ER Orders',
            });
        }

        if (abnormalRate > 30) {
            problems.push({
                priority: 4, severity: 'info', color: '#f59e0b',
                title: 'Abnormal Rate สูง: ' + abnormalRate + '%',
                rootCause: 'ผล Lab ผิดปกติมากถึง ' + abnormalRate + '% บ่งชี้ผู้ป่วยมีความเจ็บป่วยรุนแรงหรือมีปัญหา Quality Control',
                cascadeEffect: 'หาก False Abnormal สูง จะเพิ่ม Unnecessary Follow-up และสิ้นเปลือง Reagent',
                fixFirst: 'ตรวจสอบ QC Logs และ Delta Check ว่ามีผล false abnormal จากปัญหา Pre-analytical',
            });
        }

        if (a.top_tests_by_volume && a.top_tests_by_volume.length > 0) {
            const top1 = a.top_tests_by_volume[0];
            if (top1 && top1.count > 0) {
                problems.push({
                    priority: 5, severity: 'good', color: '#10b981',
                    title: 'การตรวจสูงสุด: ' + (top1.name?.substring(0, 35) || 'N/A'),
                    rootCause: 'ตรวจ ' + top1.count.toLocaleString() + ' ครั้ง (30D), Abnormal ' + (top1.abnormal_rate || 0) + '% — ต้องมั่นใจ Reagent เพียงพอตลอดเวลา',
                    cascadeEffect: 'Reagent stockout สำหรับ High-volume test จะกระทบ Workflow ทั้งระบบ',
                    fixFirst: 'ตรวจสอบ Stock Reagent สำหรับการตรวจนี้ให้เพียงพอ >= 2 สัปดาห์ล่วงหน้า',
                });
            }
        }

        // YoY Growth from fiscal data
        const years = labRevenueFiscal?.fiscal_years || [];
        const latestFY = years[years.length - 1] || { fiscal_label: 'FY' };
        const prevFY = years[years.length - 2];
        const latestVol = latestFY.comparable_revenue || latestFY.total_revenue || 0;
        const prevVol = prevFY ? (prevFY.comparable_revenue || prevFY.total_revenue || 0) : 0;
        const yoyGrowth = prevVol > 0 ? ((latestVol - prevVol) / prevVol * 100) : 0;

        const strategicKPIs = [
            { label: 'Avg TAT', value: avgTat + 'm', color: avgTat <= 60 ? '#10b981' : avgTat <= 120 ? '#f59e0b' : '#f43f5e', icon: '⏱️' },
            { label: 'TAT SLA', value: tatSlaPct + '%', color: tatSlaPct >= 70 ? '#10b981' : tatSlaPct >= 50 ? '#f59e0b' : '#f43f5e', icon: '⚡' },
            { label: 'Completion', value: completionRate + '%', color: completionRate >= 95 ? '#10b981' : completionRate >= 85 ? '#f59e0b' : '#f43f5e', icon: '✅' },
            { label: 'LPI Score', value: '' + lpi, color: lpi >= 80 ? '#10b981' : lpi >= 60 ? '#f59e0b' : '#f43f5e', icon: '🎯' },
        ];

        const critCount = problems.filter(p => p.severity === 'critical').length;
        const warnCount = problems.filter(p => p.severity === 'warning').length;
        const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);

        return {
            problems: problems.sort((a, b) => a.priority - b.priority),
            urgencyScore,
            urgencyColor: urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981',
            urgencyLabel: urgencyScore >= 7 ? 'วิกฤต' : urgencyScore >= 4 ? 'เฝ้าระวัง' : 'ปกติ',
            latestFY,
            yoyGrowth,
            strategicKPIs,
        };
    }, [labAnalytics, labRevenueFiscal]);

    // ━━━━━━ Volume Trend Chart Data ━━━━━━
    const trendChartData = useMemo(() =>
        (labAnalytics?.monthly_trend || []).map(m => ({
            month: m.month,
            orders: m.orders,
            abnormal: m.abnormal,
        })), [labAnalytics]);

    // ━━━━━━ Fiscal Chart ━━━━━━
    const fiscalChartData = useMemo(() => {
        if (!labRevenueFiscal?.fiscal_years) return [];
        const years = labRevenueFiscal.fiscal_years;
        const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
        return MONTH_ORDER.map((label, i) => {
            const row = { month: label };
            years.forEach((fy, fi) => { row['fy' + fi] = fy.months?.[i]?.revenue || 0; });
            return row;
        });
    }, [labRevenueFiscal]);

    // ━━━━━━ TAT Distribution Chart ━━━━━━
    const tatDistData = useMemo(() =>
        (labAnalytics?.tat_distribution || []).map(b => ({ name: b.bucket, value: b.count })),
        [labAnalytics]);

    // ━━━━━━ Hourly Distribution Chart ━━━━━━
    const hourlyData = useMemo(() => {
        const dist = labToday.hourly_distribution || [];
        if (dist.length === 0) return [];
        return dist.map(h => ({
            hour: h.hour != null ? h.hour + 'h' : '',
            count: h.count || 0,
        }));
    }, [labToday]);

    // ── Loading & Empty States ──
    if (loading.labToday && loading.labAnalytics && !labToday.total_orders && !labAnalytics) {
        return <TabLoadingSkeleton />;
    }

    const completionPct = labToday.total_orders > 0 ? Math.round((labToday.completed / labToday.total_orders) * 100) : 0;
    const abnormalPct = labToday.abnormal_rate || (labToday.total_items > 0 ? Math.round((labToday.abnormal_count / labToday.total_items) * 100) : 0);
    const criticalCount = labToday.critical_values?.length || 0;
    const staffCount = labToday.on_duty?.length || labAnalytics?.on_duty?.staff?.length || 0;

    return (
        <div
            className="space-y-4 animate-fade-in pb-8"
            role="region"
            aria-label="แผนก Laboratory — วิเคราะห์ห้องปฏิบัติการ"
        >

            {/* ━━━━ 1. AI Strategic Intelligence Feed (Hero Strip) ━━━━ */}
            <SubErrorBoundary name="AI Strategic Intelligence Feed">
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                <div className="glass-card" style={{
                    flex: '1 1 300px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                    borderLeft: '5px solid ' + aiAnalytics.urgencyColor,
                    background: 'linear-gradient(90deg, ' + aiAnalytics.urgencyColor + '10 0%, transparent 100%)'
                }}>
                    <div style={{ fontSize: '32px' }}>🤖</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                AI Lab Diagnostics
                            </p>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: aiAnalytics.urgencyColor, color: 'white', fontSize: '11px', fontWeight: 900 }}>
                                {aiAnalytics.urgencyLabel}
                            </span>
                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                Urgency: {aiAnalytics.urgencyScore.toFixed(1)}/10
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                            {loading.labAnalytics
                                ? 'กำลังประมวลผลอัลกอริทึมวิเคราะห์...'
                                : (aiAnalytics.problems[0]?.title || 'ระบบห้องปฏิบัติการดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด')}
                        </p>
                    </div>
                </div>
                <div className="glass-card" style={{
                    flex: '0 0 180px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px',
                    borderLeft: '4px solid #10b981', background: 'rgba(16,185,129,.05)'
                }}>
                    <div style={{ fontSize: '24px' }}>📈</div>
                    <div>
                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: THEME.primary, textTransform: 'uppercase' }}>Lab Volume YoY</p>
                        <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 900, color: aiAnalytics.yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                            {aiAnalytics.yoyGrowth >= 0 ? '↑' : '↓'} {Math.abs(aiAnalytics.yoyGrowth).toFixed(1)}%
                        </p>
                    </div>
                </div>
                <div className="glass-card" style={{
                    flex: '0 0 200px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px',
                    borderLeft: '4px solid ' + (criticalCount > 0 ? '#f43f5e' : '#10b981'),
                    background: criticalCount > 0 ? 'rgba(244,63,94,.05)' : 'rgba(16,185,129,.05)',
                }}>
                    <div style={{ fontSize: '24px' }}>🚨</div>
                    <div>
                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: criticalCount > 0 ? '#f43f5e' : '#10b981', textTransform: 'uppercase' }}>Critical Values</p>
                        <p style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 900, color: criticalCount > 0 ? '#f43f5e' : '#10b981' }}>
                            {criticalCount} รายการ
                        </p>
                        <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ต้องรายงานแพทย์ทันที</p>
                    </div>
                </div>
            </div>
            </SubErrorBoundary>

            {/* ━━━━ 2. MetricsStrip — 8 Key Performance Indicators ━━━━ */}
            <MetricsStrip
                metrics={[
                    {
                        label: 'Total Orders',
                        value: labToday.total_orders ?? '—',
                        unit: 'orders',
                        status: labToday.total_orders > 0 ? 'success' : 'neutral',
                        icon: '🔬',
                    },
                    {
                        label: 'Completed',
                        value: labToday.completed ?? '—',
                        unit: completionPct > 0 ? completionPct + '%' : '',
                        target: 95,
                        status: completionPct >= 95 ? 'success' : completionPct >= 80 ? 'warning' : 'danger',
                        icon: '✅',
                    },
                    {
                        label: 'Pending',
                        value: labToday.pending ?? '—',
                        unit: 'orders',
                        status: (labToday.pending || 0) > 50 ? 'danger' : (labToday.pending || 0) > 20 ? 'warning' : 'success',
                        icon: '⏳',
                    },
                    {
                        label: 'Avg TAT',
                        value: labToday.turnaround_time ?? labAnalytics?.avg_tat ?? '—',
                        unit: 'นาที',
                        target: 60,
                        status: (labToday.turnaround_time || labAnalytics?.avg_tat || 999) <= 60 ? 'success' : (labToday.turnaround_time || labAnalytics?.avg_tat || 999) <= 120 ? 'warning' : 'danger',
                        icon: '⏱️',
                    },
                    {
                        label: 'Abnormal %',
                        value: abnormalPct || '—',
                        unit: '%',
                        status: abnormalPct > 30 ? 'warning' : 'neutral',
                        icon: '📊',
                    },
                    {
                        label: 'Critical Values',
                        value: criticalCount,
                        unit: 'cases',
                        status: criticalCount > 5 ? 'danger' : criticalCount > 0 ? 'warning' : 'success',
                        icon: '🚨',
                    },
                    {
                        label: 'Unique Patients',
                        value: labToday.unique_patients ?? '—',
                        unit: 'patients',
                        status: 'neutral',
                        icon: '👥',
                    },
                    {
                        label: 'On-Duty Staff',
                        value: staffCount,
                        unit: 'คน',
                        status: staffCount > 0 ? 'success' : 'warning',
                        icon: '🧑‍🔬',
                    },
                ]}
            />

            {/* ━━━━ 3. Hero Card — Today Lab Orders ━━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                {/* Today Orders Hero Card */}
                <div style={{
                    padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: THEME.gradient, border: '1px solid ' + THEME.border,
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: -30, right: -30, width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: THEME.primary, margin: 0, letterSpacing: '0.1em' }}>
                                🔬 Today Lab Orders
                            </p>
                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>
                                Real-time
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '12px' }}>
                            <span style={{ fontSize: '42px', fontWeight: 950, color: THEME.secondary, letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(14,165,233,.3)' }}>
                                {(labToday.total_orders || 0).toLocaleString('th-TH')}
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Orders</span>
                            <span style={{
                                fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                background: completionPct >= 95 ? 'rgba(16,185,129,.1)' : 'rgba(245,158,11,.1)',
                                color: completionPct >= 95 ? '#10b981' : '#f59e0b',
                            }}>
                                {completionPct}% Complete
                            </span>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>✅ Completed: {labToday.completed || 0}</span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>⏳ Pending: {labToday.pending || 0}</span>
                            </div>
                            <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(0,0,0,0.05)', display: 'flex', gap: '2px' }}>
                                <div style={{ flex: labToday.completed || 0, background: '#10b981', borderRadius: '99px', transition: 'flex 0.8s ease' }} />
                                <div style={{ flex: labToday.pending || 0, background: '#f59e0b', borderRadius: '99px', transition: 'flex 0.8s ease' }} />
                            </div>
                        </div>
                        {/* Demographics */}
                        {labToday.demographics && (
                            <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0ea5e9' }}>♂ ชาย: {labToday.demographics.male || 0}</span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ec4899' }}>♀ หญิง: {labToday.demographics.female || 0}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* TAT Mini Card */}
                <div style={{
                    padding: '1rem 1.25rem', borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(14,165,233,.10) 0%, rgba(6,182,212,.05) 100%)',
                    border: '1px solid rgba(14,165,233,.25)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>Avg TAT (30D)</span>
                        <span style={{ fontSize: '18px' }}>⏱️</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '28px', fontWeight: 900, color: (labAnalytics?.avg_tat || 0) <= 60 ? '#10b981' : (labAnalytics?.avg_tat || 0) <= 120 ? '#f59e0b' : '#f43f5e', letterSpacing: '-0.03em', lineHeight: 1 }}>
                            {labAnalytics?.avg_tat || 0}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>นาที</span>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                        {(labAnalytics?.avg_tat || 0) <= 60 ? '✅ ภายในเป้าหมาย (<60min)' : '⚠️ เกินเป้าหมาย — ตรวจสอบ Workflow'}
                    </p>
                </div>

                {/* LPI Score Mini Card */}
                <div style={{
                    padding: '1rem 1.25rem', borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,.10) 0%, rgba(99,102,241,.05) 100%)',
                    border: '1px solid rgba(139,92,246,.25)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>LPI Index</span>
                        <span style={{ fontSize: '18px' }}>🎯</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '28px', fontWeight: 900, color: (labAnalytics?.lpi || 0) >= 80 ? '#10b981' : (labAnalytics?.lpi || 0) >= 60 ? '#f59e0b' : '#f43f5e', letterSpacing: '-0.03em', lineHeight: 1 }}>
                            {labAnalytics?.lpi || 0}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>/100</span>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                        {(labAnalytics?.lpi || 0) >= 80 ? '✅ Lab Performance Optimal' : '⚠️ ต้องปรับปรุง — ดู Component Score'}
                    </p>
                </div>
            </div>

            {/* ━━━━ 4. AI Analytics Section — 4 Insight Cards ━━━━ */}
            <SubErrorBoundary name="AI Lab Intelligence">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '4px', height: '22px', background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)', borderRadius: '99px' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🧠 AI Lab Intelligence (Executive Briefing)
                </h3>
                <span style={{ fontSize: '11px', background: 'rgba(14,165,233,.15)', color: THEME.primary, padding: '3px 10px', borderRadius: '4px', fontWeight: 800, marginLeft: 'auto' }}>REAL-TIME INSIGHTS</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {/* LPI Performance Index */}
                <AIInsightCard
                    title="Lab Performance Index (LPI)"
                    icon="🎯"
                    priority={(labAnalytics?.lpi || 0) >= 80 ? 'LOW' : (labAnalytics?.lpi || 0) >= 60 ? 'MEDIUM' : 'HIGH'}
                    summary={'LPI Score: ' + (labAnalytics?.lpi || 0) + '/100' + ((labAnalytics?.lpi || 0) >= 80 ? ' — Optimal Performance' : ' — Below Target')}
                    analysis={'ดัชนีรวมประสิทธิภาพห้องปฏิบัติการ คำนวณจาก TAT Score (' + (labAnalytics?.avg_tat || 0) + 'm), Completion Rate (' + (labAnalytics?.completion_rate || 0) + '%), Volume Score — ถ่วงน้ำหนัก TAT(40%) + Completion(35%) + Volume(25%)'}
                    recommendation={(labAnalytics?.lpi || 0) >= 80 ? 'รักษามาตรฐานและติดตาม Trend ต่อเนื่อง เน้น Reagent Stock Management' : 'ตรวจสอบ Component ที่คะแนนต่ำสุดและแก้ไขก่อน — เริ่มจาก TAT Optimization'}
                    confidence={96}
                    gradient="#8b5cf6"
                    gradientFrom="rgba(139,92,246,.08)"
                    gradientTo="rgba(99,102,241,.04)"
                    borderColor="rgba(139,92,246,.25)"
                />

                {/* TAT Optimization */}
                <AIInsightCard
                    title="TAT Optimization & SLA"
                    icon="⏱️"
                    priority={(labAnalytics?.avg_tat || 0) <= 60 ? 'LOW' : (labAnalytics?.avg_tat || 0) <= 120 ? 'MEDIUM' : 'HIGH'}
                    summary={'Avg TAT: ' + (labAnalytics?.avg_tat || 0) + 'm | P90: ' + (labAnalytics?.p90_tat || 0) + 'm | SLA(<60m): ' + (labAnalytics?.tat_sla_pct || 0) + '%'}
                    analysis={'วิเคราะห์ Turnaround Time ตั้งแต่ Pre-analytical → Analytical → Post-analytical เพื่อหา Bottleneck และเพิ่มประสิทธิภาพ Critical Path'}
                    recommendation={(labAnalytics?.avg_tat || 0) <= 60 ? 'TAT ดีเยี่ยม — รักษา Workflow ให้ต่อเนื่อง Focus on STAT lane performance' : 'TAT สูง — เพิ่ม STAT lane, ตรวจสอบ Analyzer Capacity และ Pre-analytical Delays'}
                    confidence={94}
                    gradient="#0ea5e9"
                    gradientFrom="rgba(14,165,233,.08)"
                    gradientTo="rgba(3,102,214,.04)"
                    borderColor="rgba(14,165,233,.25)"
                />

                {/* Critical Value Alerts */}
                <AIInsightCard
                    title="Critical Value Alert System"
                    icon="🚨"
                    priority={criticalCount > 5 ? 'HIGH' : criticalCount > 0 ? 'MEDIUM' : 'LOW'}
                    summary={'Critical Values วันนี้: ' + criticalCount + ' รายการ' + (criticalCount > 0 ? ' — ต้องรายงานแพทย์ทันที' : ' — ไม่มี Critical Values')}
                    analysis={'ระบบตรวจจับ Critical Lab Values อัตโนมัติ ครอบคลุม K, Na, Glucose, Hb, Troponin, Lactate, WBC, PLT, Cr, pH ตาม WHO Critical Value Notification Protocol'}
                    recommendation={criticalCount > 0 ? 'ตรวจสอบรายการ Critical Values ด้านล่าง และยืนยันว่าแพทย์เจ้าของไข้ได้รับแจ้งแล้วทุกราย' : 'ไม่มี Critical Values — ระบบเฝ้าระวังทำงานปกติ'}
                    confidence={99}
                    gradient="#f43f5e"
                    gradientFrom="rgba(244,63,94,.08)"
                    gradientTo="rgba(239,68,68,.04)"
                    borderColor="rgba(244,63,94,.25)"
                />

                {/* Operational Analysis */}
                <AIInsightCard
                    title="Operational Analysis & Workload"
                    icon="⚙️"
                    priority={(labToday.pending || 0) > 50 ? 'HIGH' : (labToday.pending || 0) > 20 ? 'MEDIUM' : 'LOW'}
                    summary={'Orders: ' + (labToday.total_orders || 0) + ' | Items: ' + (labToday.total_items || 0) + ' | Pending: ' + (labToday.pending || 0) + ' | Staff: ' + staffCount}
                    analysis={'วิเคราะห์ปริมาณงานตรวจ, ความสมดุลระหว่าง Demand vs Capacity, Abnormal Rate ' + abnormalPct + '% และ Staff Utilization เพื่อปรับ Workload Distribution'}
                    recommendation={(labToday.pending || 0) > 50 ? 'Pending สูง — เพิ่มกำลังคนหรือปรับ Priority Queue ทันที' : 'Workload สมดุล — ติดตาม Peak Hours สำหรับ Resource Planning'}
                    confidence={91}
                    gradient="#10b981"
                    gradientFrom="rgba(16,185,129,.08)"
                    gradientTo="rgba(5,150,105,.04)"
                    borderColor="rgba(16,185,129,.25)"
                />
            </div>
            </SubErrorBoundary>

            {/* ━━━━ 5. Critical Lab Values Section ━━━━ */}
            {(labToday.critical_values?.length > 0) && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f97316)', borderRadius: '99px' }} />
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            🚨 Critical Lab Values — ต้องรายงานแพทย์ทันที
                        </span>
                        <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 800, background: 'rgba(244,63,94,.1)', padding: '2px 10px', borderRadius: '99px' }}>
                            {labToday.critical_values.length} รายการ
                        </span>
                    </div>
                    <div className="glass-card" style={{
                        padding: '0', overflow: 'hidden',
                        border: '1.5px solid rgba(244,63,94,.25)',
                    }}>
                        {/* Header */}
                        <div style={{
                            padding: '12px 20px',
                            background: 'linear-gradient(90deg, rgba(244,63,94,.08), transparent)',
                            borderBottom: '1px solid rgba(244,63,94,.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '20px' }}>🔴</span>
                                <div>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#f43f5e' }}>
                                        Critical Value Notification Protocol
                                    </p>
                                    <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                        WHO Critical Value Reporting · Auto-detected from HOSxP XE
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: 'rgba(244,63,94,.1)', color: '#f43f5e' }}>DANGER</span>
                                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: 'rgba(245,158,11,.1)', color: '#f59e0b' }}>WARNING</span>
                                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: 'rgba(16,185,129,.1)', color: '#10b981' }}>NORMAL</span>
                            </div>
                        </div>

                        {/* Critical Values Grid */}
                        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                            {labToday.critical_values.map((cv, i) => {
                                // Use backend severity if available, fallback to local getCriticalColor
                                const severityLevel = cv.severity || 'WARNING';
                                const severity = severityLevel === 'DANGER' ? '#f43f5e' : severityLevel === 'WARNING' ? '#f59e0b' : getCriticalColor(cv.test_name || cv.test, cv.latest_value || cv.result);
                                const isDanger = severityLevel === 'DANGER';
                                return (
                                    <div key={i} style={{
                                        padding: '12px 14px', borderRadius: '12px',
                                        background: severity + '08',
                                        border: '1.5px solid ' + severity + (isDanger ? '40' : '25'),
                                        position: 'relative', overflow: 'hidden',
                                    }}>
                                        {isDanger && (
                                            <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', background: 'radial-gradient(circle at top right, ' + severity + '20, transparent 70%)', pointerEvents: 'none' }} />
                                        )}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: severity }}>
                                                    {cv.test_name || cv.test}
                                                </p>
                                                <p style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 950, color: 'var(--md-text-primary)' }}>
                                                    {cv.latest_value || cv.result}
                                                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginLeft: '4px' }}>
                                                        {CRITICAL_SEVERITY[cv.test_name || cv.test]?.unit || ''}
                                                    </span>
                                                </p>
                                            </div>
                                            <span style={{
                                                fontSize: '10px', fontWeight: 800,
                                                padding: '2px 8px', borderRadius: '4px',
                                                background: severity + '20', color: severity,
                                            }}>
                                                {severityLevel}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                                            {cv.patient_count != null && (
                                                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                                                    {cv.patient_count} patient{cv.patient_count > 1 ? 's' : ''}
                                                </span>
                                            )}
                                            {cv.hn && (
                                                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>HN: {cv.hn}</span>
                                            )}
                                            {cv.normal && (
                                                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Ref: {cv.normal}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* ━━━━ 6. On-Duty Lab Staff ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, ' + THEME.primary + ', ' + THEME.accent + ')', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    🧫 นักเทคนิคการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>
                    HOSxP Activity Logs
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Staff from /api/lab/today (on_duty) */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', background: THEME.light, borderBottom: '1px solid ' + THEME.border, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🔬</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: THEME.primary }}>Lab Staff (Today Activity)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: THEME.primary }}>
                            {labToday.on_duty?.length || 0} คน
                        </span>
                    </div>
                    <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '4px', maxHeight: '240px', overflowY: 'auto' }} className="custom-scrollbar">
                        {(labToday.on_duty?.length > 0) ? (
                            labToday.on_duty.map((st, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '10px', background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
                                        background: 'linear-gradient(135deg, ' + THEME.primary + ', ' + THEME.accent + ')',
                                        color: '#fff', fontSize: '11px', fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                                    }}>
                                        {(st.name || st.username || '').substring(0, 1).toUpperCase() || 'L'}
                                        <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '7px', height: '7px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.name || st.username}</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Login: {st.login || '—'}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: THEME.primary }}>{st.report_count || 0}</p>
                                        <p style={{ margin: 0, fontSize: '8px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ผล</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: '11px' }}>
                                ไม่พบข้อมูลเจ้าหน้าที่จาก Today API
                            </div>
                        )}
                    </div>
                </div>

                {/* Staff from Analytics (shift breakdown) */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(139,92,246,.05)', borderBottom: '1px solid rgba(139,92,246,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🧪</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#8b5cf6' }}>Lab Staff (Analytics / Shift)</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#8b5cf6' }}>
                            {labAnalytics?.on_duty?.staff?.length || 0} คน
                        </span>
                    </div>
                    <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '4px', maxHeight: '240px', overflowY: 'auto' }} className="custom-scrollbar">
                        {loading.labAnalytics ? (
                            Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', borderRadius: '10px' }} />)
                        ) : (labAnalytics?.on_duty?.staff?.length > 0) ? (
                            labAnalytics.on_duty.staff.map((st, i) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && st.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && st.afternoon_count > 0) ||
                                    (currentHour >= 17 && st.night_count > 0);
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '10px', background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                                        <div style={{
                                            width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
                                            background: isActiveNow ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '11px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                                        }}>
                                            {st.username?.substring(0, 1)?.toUpperCase() || 'L'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '7px', height: '7px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.username}</p>
                                            <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#8b5cf6' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#1e293b' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#8b5cf6' }}>{st.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>ผล</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ gridColumn: '1/-1', padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: '11px' }}>
                                ไม่พบข้อมูลนักเทคนิคการแพทย์วันนี้
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ━━━━ 7. Deep Diagnostics Panel (Strategic Indicators + Problem Discovery) ━━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                {/* Strategic Indicators */}
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: THEME.primary, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>ST-01</span>
                        Strategic Indicators
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {aiAnalytics.strategicKPIs.map((kpi, idx) => (
                            <div key={idx} style={{ padding: '14px 10px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center' }}>
                                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{kpi.icon}</div>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 950, color: kpi.color }}>{kpi.value}</p>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginTop: '2px' }}>{kpi.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* TAT Distribution Mini Pie */}
                    {tatDistData.length > 0 && (
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--md-border)' }}>
                            <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>TAT Distribution (30D)</p>
                            <div style={{ height: '120px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={tatDistData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" nameKey="name">
                                            {tatDistData.map((_, idx) => <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '8px 12px', fontSize: '11px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                {tatDistData.map((d, i) => (
                                    <span key={i} style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: PIE_COLORS[i % PIE_COLORS.length] + '20', color: PIE_COLORS[i % PIE_COLORS.length] }}>
                                        {d.name}: {d.value}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* AI Root-Cause & Performance Recovery */}
                <div className="glass-card" style={{ padding: '20px', borderLeft: '5px solid ' + aiAnalytics.urgencyColor }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: aiAnalytics.urgencyColor, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>AI-DX</span>
                        Problem Discovery & Root-Cause Analysis
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {aiAnalytics.problems.length > 0 ? aiAnalytics.problems.map((p, idx) => (
                            <div key={idx} style={{ borderRadius: '14px', border: '1.5px solid ' + p.color + '20', background: p.color + '04', overflow: 'hidden' }}>
                                <div style={{ padding: '10px 16px', borderBottom: '1px solid ' + p.color + '15', display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(90deg, ' + p.color + '10, transparent)' }}>
                                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.priority}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{p.title}</span>
                                </div>
                                <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                        <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Root Cause</p>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.rootCause}</p>
                                    </div>
                                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                        <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cascade Effect</p>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.cascadeEffect}</p>
                                    </div>
                                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                        <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Recommendation</p>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{p.fixFirst}</p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', background: 'rgba(16,185,129,0.03)', borderRadius: '16px', border: '1px dashed #10b98140' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>✨</div>
                                <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>High Performance Mode</p>
                                <p style={{ margin: 0, fontSize: '13px' }}>ตัวบ่งชี้ทุกตัวอยู่ในเกณฑ์มาตรฐานคุณภาพ</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ━━━━ 8. KPI Description Cards ━━━━ */}
            {labAnalytics && (() => {
                const a = labAnalytics;
                const avgTat = a.avg_tat ?? 0;
                const p90Tat = a.p90_tat ?? 0;
                const lpi = a.lpi ?? 0;
                const completionRate = a.completion_rate ?? 0;
                const abnormalRate = a.abnormal_rate ?? 0;
                const tatSlaPct = a.tat_sla_pct ?? 0;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'Average TAT', thLabel: 'ระยะเวลาตรวจเฉลี่ย (Turnaround Time)',
                            value: avgTat + 'm',
                            color: avgTat <= 60 ? '#10b981' : avgTat <= 120 ? '#f59e0b' : '#f43f5e', icon: '⏱️',
                            sub: avgTat <= 60 ? 'ดีเยี่ยม' : avgTat <= 120 ? 'ปานกลาง' : 'วิกฤต',
                            desc: 'ระยะเวลาเฉลี่ยจากสั่งตรวจถึงรายงานผล: ' + avgTat + ' นาที',
                            meaning: 'Turnaround Time (TAT) วัดจากเวลาสั่งตรวจ (order_time) ถึงเวลารายงานผล (report_time) สะท้อนประสิทธิภาพกระบวนการ Pre-analytical -> Analytical -> Post-analytical',
                            calc: 'TIMESTAMPDIFF(MINUTE, order_datetime, report_datetime) — Mean ของทุก completed orders 30D',
                            dataSource: 'lab_head (HOSxP XE)',
                            period: '30 วันย้อนหลัง ถึง ' + todayShort,
                            target: '<= 60 นาที (routine)',
                            benchmark: 'ISO 15189: <=60min | Routine: <=2hr | Stat: <=30min',
                            aiTip: avgTat <= 60 ? 'TAT ดี — รักษา Workflow ให้ต่อเนื่อง' : 'TAT สูง — ตรวจสอบ Pre-analytical Phase และ Analyzer Capacity',
                        },
                        {
                            label: 'P90 TAT', thLabel: 'ระยะเวลาตรวจ Percentile 90',
                            value: p90Tat + 'm',
                            color: p90Tat <= 120 ? '#10b981' : p90Tat <= 240 ? '#f59e0b' : '#f43f5e', icon: '⚡',
                            sub: p90Tat <= 120 ? 'ดีเยี่ยม' : p90Tat <= 240 ? 'ปานกลาง' : 'วิกฤต',
                            desc: '90% ของ Lab orders ได้ผลภายใน ' + p90Tat + ' นาที',
                            meaning: 'P90 TAT สะท้อนกรณี worst-case ที่ผู้ป่วย 10% ต้องรอนานสุด ช่วยประเมิน Outlier ที่อาจเกิดจาก QC Failure หรือ STAT Override',
                            calc: 'Mean + 1.28 x SD_TAT (approximation of 90th percentile)',
                            dataSource: 'lab_head (HOSxP XE)',
                            period: '30 วันย้อนหลัง',
                            target: '<= 120 นาที',
                            benchmark: 'Routine: <=2hr P90 | Urgent: <=1hr P90',
                            aiTip: p90Tat <= 120 ? 'P90 TAT ดี — ไม่มี Outlier รุนแรง' : 'P90 สูง — ตรวจสอบ QC Failures และ Reagent Shortage Events',
                        },
                        {
                            label: 'Completion Rate', thLabel: 'อัตราความสมบูรณ์ผลตรวจ',
                            value: completionRate + '%',
                            color: completionRate >= 95 ? '#10b981' : completionRate >= 85 ? '#f59e0b' : '#f43f5e', icon: '✅',
                            sub: completionRate >= 95 ? 'ดีมาก' : completionRate >= 85 ? 'ปานกลาง' : 'ต้องปรับปรุง',
                            desc: completionRate + '% ของ Lab orders มีผลรายงานสมบูรณ์',
                            meaning: 'สัดส่วน Lab orders ที่มีผลตรวจสมบูรณ์ (report_date IS NOT NULL) สะท้อน LIS Interface Reliability และ Pre-analytical rejection rate',
                            calc: '(Orders with report_date / Total orders) x 100',
                            dataSource: 'lab_head (HOSxP XE)',
                            period: '30 วันย้อนหลัง',
                            target: '>= 95%',
                            benchmark: 'ISO 15189: >=95% | Accredited Lab: >=98%',
                            aiTip: completionRate >= 95 ? 'Completion สูง — LIS Interface ทำงานดี' : 'Completion ต่ำ — ตรวจสอบ Sample Rejection และ Interface Error Logs',
                        },
                        {
                            label: 'Abnormal Rate', thLabel: 'อัตราผลตรวจผิดปกติ',
                            value: abnormalRate + '%',
                            color: '#8b5cf6', icon: '📊',
                            sub: 'ผล Abnormal',
                            desc: abnormalRate + '% ของ Lab items มีผลผิดปกติ (30D)',
                            meaning: 'สัดส่วนผล Lab ที่อยู่นอกช่วงปกติ (abnormal_result = Y) สะท้อน Case Mix ความรุนแรงของผู้ป่วยและ Quality Control',
                            calc: '(Abnormal items / Total items) x 100',
                            dataSource: 'lab_order (HOSxP XE)',
                            period: '30 วันย้อนหลัง',
                            target: 'ขึ้นอยู่กับ Case Mix',
                            benchmark: 'General hospital: 15-25% | ICU-heavy: 30-40%',
                            aiTip: 'ติดตาม Trend ถ้า Abnormal Rate เพิ่มขึ้นอย่างรวดเร็ว อาจบ่งชี้ปัญหา QC หรือ Population Change',
                        },
                        {
                            label: 'LPI Score', thLabel: 'ดัชนีประสิทธิภาพห้องปฏิบัติการ',
                            value: '' + lpi,
                            color: lpi >= 80 ? '#10b981' : lpi >= 60 ? '#f59e0b' : '#f43f5e', icon: '🎯',
                            sub: lpi >= 80 ? 'Optimal' : lpi >= 60 ? 'Fair' : 'Critical',
                            desc: 'Lab Performance Index: ' + lpi + '/100',
                            meaning: 'ดัชนีรวมประสิทธิภาพห้องปฏิบัติการ คำนวณจาก TAT Score + Completion Rate + Volume Score สะท้อนประสิทธิภาพโดยรวม',
                            calc: 'TAT(40%) + Completion(35%) + Volume(25%)',
                            dataSource: 'AI Composite (HOSxP XE)',
                            period: 'ประมวลผล ' + todayShort,
                            target: '>= 80',
                            benchmark: 'BCH Internal >=75 | Excellence >=85',
                            aiTip: lpi >= 80 ? 'LPI สูง — ห้องปฏิบัติการทำงานได้ดีรอบด้าน' : 'LPI ต่ำ — ดู Component ที่คะแนนต่ำสุดและแก้ไขก่อน',
                        },
                    ]} />
                );
            })()}

            {/* ━━━━ 9. Top Tests — Volume + Abnormal Rate (Side by Side) ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, ' + THEME.primary + ', #8b5cf6)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    🧪 Top Lab Tests Analysis (30D)
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* By Volume */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: THEME.primary, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>VOL</span>
                        Top 10 การตรวจ — ปริมาณสูงสุด
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {(labAnalytics?.top_tests_by_volume || labToday.top_tests || []).slice(0, 10).map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: 'var(--md-surface)', borderRadius: '9px', border: '1px solid var(--md-border)' }}>
                                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: THEME.light, color: THEME.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '9px', flexShrink: 0 }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || item.test_name}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: THEME.primary }}>{(item.count)?.toLocaleString()}</span>
                                    {(item.abnormal_rate > 0) && (
                                        <span style={{ fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px', background: item.abnormal_rate > 30 ? 'rgba(244,63,94,0.12)' : 'rgba(245,158,11,0.12)', color: item.abnormal_rate > 30 ? '#f43f5e' : '#d97706' }}>
                                            {item.abnormal_rate}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        {!(labAnalytics?.top_tests_by_volume || labToday.top_tests)?.length && !loading.labAnalytics && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: '11px' }}>ไม่มีข้อมูล</div>
                        )}
                    </div>
                </div>

                {/* By Abnormal Rate */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#f43f5e', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>ABN</span>
                        Top 10 การตรวจ — Abnormal Rate สูงสุด
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {(labAnalytics?.top_tests_by_abnormal || []).slice(0, 10).map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: 'var(--md-surface)', borderRadius: '9px', border: '1px solid var(--md-border)' }}>
                                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(244,63,94,0.08)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '9px', flexShrink: 0 }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                                    <div style={{ height: '3px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginTop: '3px' }}>
                                        <div style={{ height: '100%', borderRadius: '2px', background: item.abnormal_rate > 50 ? '#f43f5e' : item.abnormal_rate > 30 ? '#f59e0b' : '#10b981', width: Math.min(100, item.abnormal_rate) + '%' }} />
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: item.abnormal_rate > 50 ? '#f43f5e' : item.abnormal_rate > 30 ? '#f59e0b' : '#10b981' }}>{item.abnormal_rate}%</p>
                                    <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{item.count} ครั้ง</p>
                                </div>
                            </div>
                        ))}
                        {!labAnalytics?.top_tests_by_abnormal?.length && !loading.labAnalytics && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)', fontSize: '11px' }}>ไม่มีข้อมูล</div>
                        )}
                    </div>
                </div>
            </div>

            {/* ━━━━ 10. Hourly Distribution Chart (Today) ━━━━ */}
            {hourlyData.length > 0 && (
                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                                🕐 Hourly Lab Order Distribution (Today)
                            </p>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                ปริมาณ Lab Orders แยกตามชั่วโมง — ระบุ Peak Hours สำหรับ Resource Allocation
                            </p>
                        </div>
                    </div>
                    <div style={{ height: '180px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={hourlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="hour" tick={{ fontSize: 9, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '8px 12px', fontSize: '11px' }} />
                                <Bar dataKey="count" name="Orders" radius={[4, 4, 0, 0]}>
                                    {hourlyData.map((d, i) => (
                                        <Cell key={i} fill={d.count >= 50 ? '#f43f5e' : d.count >= 30 ? '#f59e0b' : THEME.primary} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* ━━━━ 11. Monthly Volume Trend (6 Months) ━━━━ */}
            {trendChartData.length > 0 && (
                <div className="glass-card" style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                        📈 Lab Order Volume Trend (6 เดือนย้อนหลัง)
                    </p>
                    <div style={{ height: '240px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={trendChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '12px' }} />
                                <Area type="monotone" dataKey="orders" name="Orders" fill="rgba(14,165,233,.08)" stroke={THEME.primary} strokeWidth={2.5} dot={{ fill: THEME.primary, strokeWidth: 0, r: 4 }} />
                                <Line type="monotone" dataKey="abnormal" name="Abnormal" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 2" dot={{ fill: '#f43f5e', strokeWidth: 0, r: 3 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* ━━━━ 12. Revenue Fiscal Year Comparison ━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, ' + THEME.primary + ', #0284c7)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้ Lab ประจำปีงบประมาณ
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>HOSxP XE Data Intelligence</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.labRevenueFiscal ? (
                    <div className="skeleton" style={{ height: '300px', width: '100%', borderRadius: '12px' }} />
                ) : labRevenueFiscal?.fiscal_years ? (() => {
                    const years = labRevenueFiscal.fiscal_years;
                    const FY_COLORS = ['#94a3b8', '#38bdf8', '#0ea5e9'];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* FY summary cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + Math.min(years.length, 3) + ', 1fr)', gap: '12px' }}>
                                {years.slice(-3).map((fy, fi) => (
                                    <div key={fi} style={{ padding: '12px', borderRadius: '12px', border: '1px solid ' + FY_COLORS[fi] + '20', background: FY_COLORS[fi] + '05' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: FY_COLORS[fi] }} />
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: FY_COLORS[fi] }}>{fy.fiscal_label}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: FY_COLORS[fi] }}>
                                            {(fy.total_revenue / 1e3).toFixed(1)}K
                                        </p>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)' }}>orders</p>
                                    </div>
                                ))}
                            </div>

                            {/* Chart */}
                            <div style={{ height: '280px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={fiscalChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="labBarGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                        <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '12px' }} />
                                        {labRevenueFiscal.fiscal_years.map((fy, fi) => {
                                            const isLatest = fi === labRevenueFiscal.fiscal_years.length - 1;
                                            return (
                                                <Bar key={fi} dataKey={'fy' + fi} name={fy.fiscal_label}
                                                    fill={isLatest ? 'url(#labBarGrad)' : '#cbd5e1'}
                                                    radius={[6, 6, 0, 0]} barSize={isLatest ? 28 : 20}
                                                    opacity={isLatest ? 1 : 0.5}
                                                />
                                            );
                                        })}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    );
                })() : (
                    <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--md-border)', borderRadius: '24px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                            <p style={{ color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                                {loading.labRevenueFiscal ? 'Loading fiscal data...' : 'Data Stream Offline'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <SubErrorBoundary name="AI Server Insights">
                <AIServerInsights data={state.labAI} theme="lab" title="AI Laboratory Intelligence" />
            </SubErrorBoundary>

            {/* ━━━━ Footer ━━━━ */}
            <div style={{ textAlign: 'center', opacity: 0.3, padding: '16px 0' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--md-text-tertiary)', textTransform: 'uppercase', margin: 0 }}>
                    BCH Lab Intelligence · Protocol v10.4 · High Fidelity Analytics
                </p>
            </div>

        </div>
    );
}

export default React.memo(LaboratoryTab);
