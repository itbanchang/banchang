import React, { useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import KPICardV2 from './KPICardV2.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';

// ── Theme constants ──────────────────────────────────────────────
const THEME = {
    primary: '#8b5cf6',
    secondary: '#6366f1',
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.05) 100%)',
    border: 'rgba(139,92,246,0.25)',
    light: 'rgba(139,92,246,0.08)',
};

function XRAYTab() {
    const { state, fetchData } = useDashboard();
    const xrayToday = state.xrayToday || {};
    const xrayAnalytics = state.xrayAnalytics;
    const xrayRevenueFiscal = state.xrayRevenueFiscal;
    const loading = state.loading || {};

    useEffect(() => {
        // Fetch data if not present
        if (!xrayToday.total_requests && !xrayToday.total && !loading.xrayToday) {
            fetchData('xrayToday', '/api/xray/today');
        }
        if (!xrayAnalytics && !loading.xrayAnalytics) {
            fetchData('xrayAnalytics', '/api/xray/analytics');
        }
        if (!xrayRevenueFiscal && !loading.xrayRevenueFiscal) {
            fetchData('xrayRevenueFiscal', '/api/xray/revenue-fiscal');
        }
    }, [fetchData]);

    // Normalize today data (API may return total_requests or total)
    const totalRequests = xrayToday.total_requests ?? xrayToday.total ?? 0;
    const completed = xrayToday.completed ?? 0;
    const waiting = xrayToday.waiting ?? 0;
    const uniquePatients = xrayToday.unique_patients ?? 0;
    const avgWaitTime = xrayToday.avg_wait_time ?? 0;
    const avgTat = xrayToday.avg_tat ?? 0;
    const demographics = xrayToday.demographics || {};
    const hourlyDist = xrayToday.hourly_distribution || xrayToday.hourly || [];
    const topItems = xrayToday.top_items || [];

    // ━━━━━━ Computed KPIs from today data ━━━━━━
    const completionRate = totalRequests > 0 ? Math.round((completed / totalRequests) * 100) : 0;
    const elderlyPct = demographics.elderly && totalRequests > 0 ? Math.round((demographics.elderly / totalRequests) * 100) : 0;

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
            benchmarks: {}
        };

        if (!xrayAnalytics) return defaultResult;

        const a = xrayAnalytics;
        const aCompletionRate = a.completion_rate ?? 0;
        const aAvgWait = a.avg_wait_time ?? 0;
        const medianWait = a.median_wait_time ?? 0;
        const p90Wait = a.p90_wait_time ?? 0;
        const avgRevenue = a.avg_revenue_per_visit ?? 0;

        const problems = [];
        // P90 Wait is the best indicator of "bad days"
        if (p90Wait > 60) {
            problems.push({
                priority: 1, severity: 'critical', color: '#f43f5e',
                title: `P90 Wait Time Critical: ${p90Wait}m`,
                rootCause: `10% of patients wait over 1 hour, indicating triage or staffing issues during peak hours`,
                fixFirst: `Implement load balancing for appointments; shift urgent cases before 10:00`
            });
        }
        if (aAvgWait > 30) {
            problems.push({
                priority: 2, severity: 'warning', color: '#f59e0b',
                title: `Average Wait Time Elevated: ${aAvgWait}m`,
                rootCause: `Mean wait exceeds 30-minute target (Median: ${medianWait}m)`,
                fixFirst: `Check equipment prep bottlenecks and scanner availability`
            });
        }
        if (aCompletionRate < 85) {
            problems.push({
                priority: 3, severity: 'warning', color: '#f59e0b',
                title: `Case Completion Rate Low: ${aCompletionRate}%`,
                rootCause: `${a.dropout_count || 0} patient dropouts this month`,
                fixFirst: `Improve patient tracking via LINE/SMS notification systems`
            });
        }

        if (a.peak_hour && a.peak_hour.avg > 10 && p90Wait > 45) {
            problems.push({
                priority: 4, severity: 'info', color: '#8b5cf6',
                title: `Peak Hour Congestion: ${a.peak_hour.label} (${a.peak_hour.avg} cases/hr)`,
                rootCause: `High volume during peak creates queue overflow and scanner bottleneck`,
                fixFirst: `Load-balance Chest X-Ray appointments into off-peak windows`
            });
        }

        if (a.top_diagnoses && a.top_diagnoses.length > 0) {
            const topYield = [...a.top_diagnoses].sort((x, y) => (y.count || 0) - (x.count || 0))[0];
            if (topYield && topYield.count > 50) {
                problems.push({
                    priority: 5, severity: 'good', color: '#10b981',
                    title: `Top Procedure: ${topYield.name}`,
                    rootCause: `Most frequently ordered imaging study this period`,
                    fixFirst: `Monitor film stock and equipment load capacity for this procedure`
                });
            }
        }

        if (a.dept_pattern && a.dept_pattern.length > 0) {
            const topDept = a.dept_pattern[0];
            if (topDept && topDept.pct > 40) {
                problems.push({
                    priority: 7, severity: 'info', color: '#0ea5e9',
                    title: `${topDept.name} drives ${topDept.pct}% of X-Ray demand`,
                    rootCause: `${topDept.name} is the primary demand source (${topDept.count} requests/30d) -- peaks here cascade to queue system`,
                    fixFirst: `Coordinate pre-scheduling with ${topDept.name} to distribute workload`
                });
            }
        }

        if (a.workload_heatmap?.peak?.count > 15) {
            const pk = a.workload_heatmap.peak;
            problems.push({
                priority: 8, severity: 'info', color: '#f97316',
                title: `Peak Workload: ${pk.dayLabel} ${String(pk.hour).padStart(2, '0')}:00 (${pk.count} cases/30d)`,
                rootCause: `Highest volume window -- risk of queue overflow and extended TAT`,
                fixFirst: `Add staffing during peak or open additional X-Ray room`
            });
        }

        const childrenPct = a.total_visits > 0 ? Math.round((a.children_total / a.total_visits) * 100) : 0;
        if (childrenPct > 25) {
            problems.push({
                priority: 6, severity: 'info', color: '#0ea5e9',
                title: `High pediatric ratio: ${childrenPct}%`,
                rootCause: `Patients under 15 represent a significant portion -- additional radiation protection required`,
                fixFirst: `Prepare Gonad Shield / Thyroid Shield and reduce exposure per Pediatric Protocol`
            });
        }

        const years = xrayRevenueFiscal?.fiscal_years || [];
        const latestFY = years[years.length - 1] || { fiscal_label: 'FY' };
        const prevFY = years[years.length - 2];
        const latestRev = latestFY.comparable_revenue || latestFY.total_revenue || 0;
        const prevRev = prevFY ? (prevFY.comparable_revenue || prevFY.total_revenue || 0) : 0;
        const yoyGrowth = prevRev > 0 ? ((latestRev - prevRev) / prevRev * 100) : 0;

        const strategicKPIs = [
            { label: 'P90 Wait', value: `${p90Wait}m`, color: p90Wait < 45 ? '#10b981' : p90Wait < 75 ? '#f59e0b' : '#f43f5e', icon: '⚡' },
            { label: 'Wait SLA', value: `${a.wait_sla_pct ?? 0}%`, color: (a.wait_sla_pct ?? 0) > 85 ? '#10b981' : '#f59e0b', icon: '⏱️' },
            { label: 'Completion', value: `${aCompletionRate}%`, color: aCompletionRate > 90 ? '#10b981' : '#f59e0b', icon: '✅' },
            { label: 'Rev/Visit', value: `${(avgRevenue).toLocaleString()}`, color: '#8b5cf6', icon: '💰' }
        ];

        const critCount = problems.filter(p => p.severity === 'critical').length;
        const warnCount = problems.filter(p => p.severity === 'warning').length;
        const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);

        return {
            problems,
            urgencyScore,
            urgencyColor: urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981',
            urgencyLabel: urgencyScore >= 7 ? 'วิกฤต' : urgencyScore >= 4 ? 'เฝ้าระวัง' : 'ปกติ',
            latestFY,
            yoyGrowth,
            strategicKPIs,
            benchmarks: { medianWait, p90Wait }
        };
    }, [xrayAnalytics, xrayRevenueFiscal]);

    // ━━━━━━ Build Chart Data for Revenue ━━━━━━
    const revenueChartData = useMemo(() => {
        if (!xrayRevenueFiscal?.fiscal_years) return [];
        const years = xrayRevenueFiscal.fiscal_years;
        const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

        return MONTH_ORDER.map((label, i) => {
            const row = { month: label };
            years.forEach((fy, fi) => {
                row[`fy${fi}`] = fy.months && fy.months[i] ? fy.months[i].revenue : 0;
            });
            return row;
        });
    }, [xrayRevenueFiscal]);

    // ━━━━━━ Build MetricsStrip data ━━━━━━
    const metricsStripData = useMemo(() => {
        const staffCount = xrayAnalytics?.on_duty?.staff?.length ?? 0;
        return [
            {
                label: 'Total Requests',
                value: totalRequests,
                unit: 'cases',
                icon: '☢️',
                status: totalRequests > 0 ? 'normal' : 'warning',
            },
            {
                label: 'Completed',
                value: completed,
                unit: 'cases',
                icon: '✅',
                status: 'success',
                target: totalRequests || undefined,
            },
            {
                label: 'Waiting',
                value: waiting,
                unit: 'cases',
                icon: '⏳',
                status: waiting > 20 ? 'critical' : waiting > 10 ? 'warning' : 'normal',
            },
            {
                label: 'Avg TAT',
                value: avgTat,
                unit: 'min',
                icon: '⚡',
                status: avgTat > 60 ? 'critical' : avgTat > 30 ? 'warning' : 'success',
            },
            {
                label: 'Avg Wait',
                value: avgWaitTime,
                unit: 'min',
                icon: '⏱️',
                status: avgWaitTime > 45 ? 'critical' : avgWaitTime > 25 ? 'warning' : 'success',
            },
            {
                label: 'Unique Patients',
                value: uniquePatients,
                unit: 'pts',
                icon: '👤',
                status: 'normal',
            },
            {
                label: 'Elderly %',
                value: elderlyPct,
                unit: '%',
                icon: '👴',
                status: elderlyPct > 50 ? 'warning' : 'normal',
            },
            {
                label: 'Staff On-Duty',
                value: staffCount,
                unit: 'persons',
                icon: '🩺',
                status: staffCount > 0 ? 'success' : 'warning',
            },
        ];
    }, [totalRequests, completed, waiting, avgTat, avgWaitTime, uniquePatients, elderlyPct, xrayAnalytics]);

    // ━━━━━━ AI Insight Cards data ━━━━━━
    const aiInsightCards = useMemo(() => {
        const rpi = xrayAnalytics?.rpi ?? 0;
        const aCompletionRate = xrayAnalytics?.completion_rate ?? 0;
        const p90Wait = xrayAnalytics?.p90_wait_time ?? 0;
        const avgRevenue = xrayAnalytics?.avg_revenue_per_visit ?? 0;
        const peakHour = xrayAnalytics?.peak_hour;
        const dailyAvg = xrayAnalytics?.avg_daily_visits ?? 0;

        return [
            {
                title: 'Radiology Performance Index',
                icon: '🎯',
                priority: rpi >= 80 ? 'LOW' : rpi >= 60 ? 'MEDIUM' : 'HIGH',
                summary: `RPI Score: ${rpi}/100 -- ${rpi >= 80 ? 'Excellent operational performance' : rpi >= 60 ? 'Moderate performance, optimization needed' : 'Critical: immediate intervention required'}`,
                analysis: `Composite index derived from Wait Time Score (40%), Completion Rate (40%), and Revenue Profitability (20%). Current completion: ${aCompletionRate}%, P90 Wait: ${p90Wait}m.`,
                recommendation: rpi >= 80 ? 'Maintain current performance levels. Focus on consistency and patient satisfaction metrics.' : 'Prioritize reducing P90 wait times and improving case completion rates through better scheduling.',
                confidence: rpi > 0 ? 92 : 50,
                gradient: rpi >= 80 ? '#10b981' : rpi >= 60 ? '#f59e0b' : '#f43f5e',
                gradientFrom: rpi >= 80 ? 'rgba(16,185,129,.08)' : rpi >= 60 ? 'rgba(245,158,11,.08)' : 'rgba(244,63,94,.08)',
                gradientTo: 'rgba(99,102,241,.04)',
                borderColor: rpi >= 80 ? 'rgba(16,185,129,.25)' : rpi >= 60 ? 'rgba(245,158,11,.25)' : 'rgba(244,63,94,.25)',
            },
            {
                title: 'Workload Analysis',
                icon: '📊',
                priority: (peakHour && peakHour.avg > 12) ? 'HIGH' : 'MEDIUM',
                summary: `Daily average: ${dailyAvg || totalRequests} cases/day. ${peakHour ? `Peak at ${peakHour.label} with ~${peakHour.avg} cases/hour.` : 'No peak hour data yet.'}`,
                analysis: `Today's throughput: ${totalRequests} requests, ${completed} completed, ${waiting} waiting. ${completionRate}% completion rate indicates ${completionRate >= 90 ? 'healthy' : 'suboptimal'} workflow.`,
                recommendation: peakHour && peakHour.avg > 10 ? `Redistribute Chest X-Ray appointments from ${peakHour.label} to off-peak slots. Consider adding dedicated scanner for walk-ins.` : 'Current workload distribution is within acceptable limits. Monitor for trend changes.',
                confidence: 88,
                gradient: '#8b5cf6',
                gradientFrom: 'rgba(139,92,246,.08)',
                gradientTo: 'rgba(99,102,241,.04)',
                borderColor: 'rgba(139,92,246,.25)',
            },
            {
                title: 'Patient Flow Intelligence',
                icon: '🔄',
                priority: avgWaitTime > 40 ? 'HIGH' : avgWaitTime > 20 ? 'MEDIUM' : 'LOW',
                summary: `Current wait time: ${avgWaitTime}m avg, TAT: ${avgTat}m. ${waiting} patients in queue. ${uniquePatients} unique patients served today.`,
                analysis: `${demographics.male ?? 0} male, ${demographics.female ?? 0} female patients. Elderly (${demographics.elderly ?? 0}) represent ${elderlyPct}% of volume. ${demographics.children ?? 0} pediatric cases. Average age: ${demographics.avg_age ?? 'N/A'} years.`,
                recommendation: avgWaitTime > 30 ? 'Implement real-time queue display and SMS notification when patient number approaches. Consider express lane for simple procedures.' : 'Patient flow is well-managed. Continue monitoring elderly and pediatric ratio for resource planning.',
                confidence: 90,
                gradient: '#0ea5e9',
                gradientFrom: 'rgba(14,165,233,.08)',
                gradientTo: 'rgba(6,182,212,.04)',
                borderColor: 'rgba(14,165,233,.25)',
            },
            {
                title: 'Revenue Optimization',
                icon: '💰',
                priority: aiAnalytics.yoyGrowth < 0 ? 'HIGH' : aiAnalytics.yoyGrowth < 5 ? 'MEDIUM' : 'LOW',
                summary: `YoY Growth: ${aiAnalytics.yoyGrowth >= 0 ? '+' : ''}${aiAnalytics.yoyGrowth.toFixed(1)}%. Avg revenue/visit: ฿${(avgRevenue || 0).toLocaleString()}. ${aiAnalytics.latestFY.fiscal_label || 'Current FY'} performance.`,
                analysis: `Revenue per visit reflects service mix between plain film, CT, and special studies. ${avgRevenue >= 400 ? 'Good service mix with sufficient advanced imaging.' : 'Low revenue/visit suggests predominance of plain film studies.'}`,
                recommendation: aiAnalytics.yoyGrowth < 0 ? 'Investigate declining revenue. Check billing completeness, patient volume trends, and service mix ratio.' : 'Growth trajectory is positive. Focus on expanding CT/special study capacity to increase per-visit revenue.',
                confidence: 85,
                gradient: '#f59e0b',
                gradientFrom: 'rgba(245,158,11,.08)',
                gradientTo: 'rgba(249,115,22,.04)',
                borderColor: 'rgba(245,158,11,.25)',
            },
        ];
    }, [xrayAnalytics, aiAnalytics, totalRequests, completed, waiting, avgWaitTime, avgTat, uniquePatients, demographics, elderlyPct, completionRate]);

    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* ── SECTION 1: AI Intelligence Banner ────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginBottom: '0.5rem' }}>
                <div className="glass-card" style={{
                    padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                    borderLeft: `5px solid ${aiAnalytics.urgencyColor}`, background: `linear-gradient(90deg, ${aiAnalytics.urgencyColor}10 0%, transparent 100%)`
                }}>
                    <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))' }}>🤖</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: aiAnalytics.urgencyColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Radiology Diagnostics</p>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: aiAnalytics.urgencyColor, color: 'white', fontSize: '11px', fontWeight: 900 }}>{aiAnalytics.urgencyLabel}</span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                            {loading.xrayAnalytics ? 'Processing radiology intelligence algorithms...' : (aiAnalytics.problems[0]?.title || 'Radiology operations running at peak efficiency')}
                        </p>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '14px 20px', textAlign: 'center', minWidth: '150px' }}>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase' }}>Growth Index</p>
                    <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 900, color: aiAnalytics.yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>
                        {aiAnalytics.yoyGrowth >= 0 ? '↑' : '↓'} {Math.abs(aiAnalytics.yoyGrowth).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* ── SECTION 2: MetricsStrip (8 KPIs) ────────────────────────── */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '3px', height: '18px', background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.secondary})`, borderRadius: '99px' }} />
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                        Real-Time Performance Metrics
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>
                        Today Live
                    </span>
                </div>
                <MetricsStrip metrics={metricsStripData} columns={4} gap="10px" minWidth="180px" />
            </div>

            {/* ── SECTION 3: AI Analytics Insight Cards (4 cards) ──────────── */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f59e0b, #f97316)', borderRadius: '99px' }} />
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                        AI Strategic Analytics
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', padding: '2px 8px', borderRadius: '4px' }}>
                        AI-POWERED
                    </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {aiInsightCards.map((card, idx) => (
                        <AIInsightCard key={idx} {...card} />
                    ))}
                </div>
            </div>

            {/* ── SECTION 4: Daily Throughput + Wait Stats ─────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                <div style={{
                    gridColumn: 'span 2', padding: '1.5rem', borderRadius: '20px',
                    background: THEME.gradient,
                    border: `1px solid ${THEME.border}`, position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '120px', opacity: 0.05 }}>☢️</div>
                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: THEME.primary, margin: 0, letterSpacing: '0.08em' }}>Daily Patient Throughput</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
                        <div>
                            <span style={{ fontSize: '42px', fontWeight: 950, color: THEME.secondary, letterSpacing: '-0.04em' }}>{totalRequests.toLocaleString('th-TH')}</span>
                            <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700, marginLeft: '6px' }}>cases</span>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>Completed</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>{completed} / {totalRequests}</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px' }}>
                                <div style={{ height: '100%', background: '#10b981', borderRadius: '3px', width: `${Math.min(100, completionRate)}%`, transition: 'width 0.8s ease' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>Waiting</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: waiting > 15 ? '#f43f5e' : '#f59e0b' }}>{waiting}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <KPICardV2 title="Wait (Median)" value={aiAnalytics.benchmarks.medianWait || 0} unit="min (30D)" icon="⏱️" loading={loading.xrayAnalytics} color="blue" aiInsight={(aiAnalytics.benchmarks.medianWait || 0) > 40 ? "X-Ray wait times are elevated. Address scheduling blocks or scanner availability." : "X-Ray wait times are within normal limits."} />
                <KPICardV2 title="RPI Index" value={xrayAnalytics?.rpi || 0} unit="/100 (Operational Score)" icon="🎯" loading={loading.xrayAnalytics} color="purple" aiInsight={xrayAnalytics?.rpi > 80 ? "Radiology operational index is excellent." : "Radiology operations need optimization. Check scan turnaround times."} />
            </div>

            {/* ── SECTION 5: Top Imaging Studies (from today data) ─────────── */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '3px', height: '18px', background: `linear-gradient(180deg, ${THEME.primary}, #a78bfa)`, borderRadius: '99px' }} />
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                        Top Imaging Studies Today
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>
                        Live Ranking
                    </span>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                    {topItems.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                            {topItems.slice(0, 10).map((item, idx) => {
                                const maxCount = topItems[0]?.count || 1;
                                const pct = Math.round((item.count / maxCount) * 100);
                                const rankColors = ['#f43f5e', '#f97316', '#f59e0b', THEME.primary, '#06b6d4', '#10b981', '#6366f1', '#ec4899', '#a855f7', '#64748b'];
                                const color = rankColors[idx % rankColors.length];
                                return (
                                    <div key={idx} style={{
                                        padding: '12px 16px', background: 'var(--md-surface)', borderRadius: '12px',
                                        border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px',
                                        borderLeft: `3px solid ${color}`,
                                    }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: `${color}15`, color: color,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 900, fontSize: '13px', flexShrink: 0,
                                        }}>
                                            {idx + 1}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.item_name || 'Unknown Study'}
                                            </p>
                                            <div style={{ marginTop: '4px', height: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '2px' }}>
                                                <div style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}90)`, borderRadius: '2px', width: `${pct}%`, transition: 'width 0.6s ease' }} />
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color }}>{item.count}</p>
                                            <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>cases</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>
                            {loading.xrayToday ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '48px', borderRadius: '10px' }} />)}
                                </div>
                            ) : 'No imaging study data available today'}
                        </div>
                    )}
                </div>
            </div>

            {/* ── SECTION 6: Demographics Breakdown ───────────────────────── */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #06b6d4, #0ea5e9)', borderRadius: '99px' }} />
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                        Patient Demographics
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(6,182,212,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                        Today
                    </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                    {[
                        { label: 'Male', value: demographics.male ?? 0, icon: '👨', color: '#3b82f6', bgFrom: 'rgba(59,130,246,.1)' },
                        { label: 'Female', value: demographics.female ?? 0, icon: '👩', color: '#ec4899', bgFrom: 'rgba(236,72,153,.1)' },
                        { label: 'Elderly', value: demographics.elderly ?? 0, icon: '👴', color: '#f59e0b', bgFrom: 'rgba(245,158,11,.1)', sub: `${elderlyPct}%` },
                        { label: 'Children', value: demographics.children ?? 0, icon: '👶', color: '#10b981', bgFrom: 'rgba(16,185,129,.1)' },
                        { label: 'Avg Age', value: demographics.avg_age ?? 'N/A', icon: '📊', color: THEME.primary, bgFrom: THEME.light, unit: 'yrs' },
                    ].map((d, idx) => (
                        <div key={idx} className="glass-card" style={{
                            padding: '1.25rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
                            background: `linear-gradient(135deg, ${d.bgFrom}, transparent)`,
                            border: `1px solid ${d.color}25`,
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{d.icon}</div>
                            <p style={{ margin: 0, fontSize: '28px', fontWeight: 950, color: d.color, lineHeight: 1 }}>
                                {typeof d.value === 'number' ? d.value.toLocaleString() : d.value}
                            </p>
                            {d.unit && <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{d.unit}</span>}
                            {d.sub && <span style={{ fontSize: '11px', color: d.color, fontWeight: 800, marginLeft: '4px' }}>({d.sub})</span>}
                            <p style={{ margin: '4px 0 0', fontSize: '11px', fontWeight: 700, color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.label}</p>
                        </div>
                    ))}
                </div>
                {/* Gender ratio bar */}
                {(demographics.male > 0 || demographics.female > 0) && (() => {
                    const total = (demographics.male || 0) + (demographics.female || 0);
                    const malePct = total > 0 ? Math.round((demographics.male / total) * 100) : 50;
                    return (
                        <div className="glass-card" style={{ padding: '12px 20px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#3b82f6' }}>Male {malePct}%</span>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Gender Distribution</span>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#ec4899' }}>Female {100 - malePct}%</span>
                            </div>
                            <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex' }}>
                                <div style={{ width: `${malePct}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', transition: 'width 0.8s ease' }} />
                                <div style={{ flex: 1, background: 'linear-gradient(90deg, #f472b6, #ec4899)', transition: 'width 0.8s ease' }} />
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ── SECTION 7: On-Duty Staff ────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px', marginTop: '8px' }}>
                <div style={{ width: '3px', height: '18px', background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.secondary})`, borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    Radiology Staff On-Duty
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: THEME.light, padding: '2px 8px', borderRadius: '99px' }}>
                    HOSxP Activity Logs
                </span>
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px 16px', background: 'rgba(139,92,246,.05)', borderBottom: '1px solid rgba(139,92,246,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>☢️</span>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: THEME.primary }}>Radiologic Technologists</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: THEME.primary, opacity: 0.8 }}>{xrayAnalytics?.on_duty?.staff?.length || 0} persons</span>
                </div>
                <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                    {loading.xrayAnalytics ? (
                        Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                    ) : (xrayAnalytics?.on_duty?.staff?.length > 0) ? (
                        xrayAnalytics.on_duty.staff.map((st, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                            }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
                                    color: '#fff', fontSize: '12px', fontWeight: 800,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {(st.staff_name || st.username || '').substring(0, 1) || 'R'}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.staff_name || st.username || 'Unknown'}</p>
                                    <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Radiologic Technologist</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: THEME.primary }}>{st.total_count}</p>
                                    <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>cases</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                            <p style={{ fontSize: '11px' }}>No radiology staff data available today</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── SECTION 8: AI Workload Heatmap + Department Pattern ─────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                {/* Workload Heatmap (Day x Hour) */}
                <div className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`, color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>AI</span>
                                Workload Heatmap
                            </p>
                            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Hourly x Day volume (30 days)</p>
                        </div>
                        {xrayAnalytics?.workload_heatmap?.peak && (
                            <div style={{ textAlign: 'right', background: 'rgba(239,68,68,0.06)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.15)' }}>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>Peak</p>
                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 900, color: '#ef4444' }}>
                                    {xrayAnalytics.workload_heatmap.peak.dayLabel} {String(xrayAnalytics.workload_heatmap.peak.hour).padStart(2, '0')}:00
                                </p>
                            </div>
                        )}
                    </div>
                    {loading.xrayAnalytics ? (
                        <div className="skeleton" style={{ height: '200px', borderRadius: '12px' }} />
                    ) : xrayAnalytics?.workload_heatmap?.grid ? (
                        <div style={{ overflowX: 'auto' }}>
                            <div style={{ display: 'flex', gap: '2px', marginLeft: '38px', marginBottom: '4px' }}>
                                {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(h => (
                                    <div key={h} style={{ width: '22px', fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)', textAlign: 'center', marginRight: h < 22 ? '24px' : 0 }}>
                                        {String(h).padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                            {xrayAnalytics.workload_heatmap.grid.map((day, di) => (
                                <div key={di} style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '2px' }}>
                                    <span style={{ width: '32px', fontSize: '10px', fontWeight: 800, color: 'var(--md-text-secondary)', textAlign: 'right', paddingRight: '4px' }}>
                                        {day.dayLabel}
                                    </span>
                                    {day.hours.map((cell, hi) => {
                                        const maxC = xrayAnalytics.workload_heatmap.max_count || 1;
                                        const intensity = cell.count / maxC;
                                        const bg = cell.count === 0 ? 'rgba(0,0,0,0.03)'
                                            : intensity > 0.75 ? `rgba(239,68,68,${0.3 + intensity * 0.6})`
                                                : intensity > 0.5 ? `rgba(249,115,22,${0.2 + intensity * 0.5})`
                                                    : intensity > 0.25 ? `rgba(139,92,246,${0.15 + intensity * 0.4})`
                                                        : `rgba(139,92,246,${0.05 + intensity * 0.25})`;
                                        return (
                                            <div key={hi} title={`${day.dayLabel} ${String(hi).padStart(2, '0')}:00 - ${cell.count} cases`}
                                                style={{ width: '20px', height: '20px', borderRadius: '3px', background: bg, cursor: 'pointer', transition: 'transform 0.15s', fontSize: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: intensity > 0.5 ? '#fff' : 'transparent', fontWeight: 800 }}>
                                                {cell.count > 0 ? cell.count : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', marginLeft: '38px' }}>
                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Low</span>
                                {[0.1, 0.3, 0.5, 0.75, 1].map((v, i) => (
                                    <div key={i} style={{
                                        width: '14px', height: '14px', borderRadius: '3px',
                                        background: v <= 0.25 ? 'rgba(139,92,246,0.15)' : v <= 0.5 ? 'rgba(139,92,246,0.35)' : v <= 0.75 ? 'rgba(249,115,22,0.5)' : 'rgba(239,68,68,0.75)'
                                    }} />
                                ))}
                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>High</span>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No heatmap data available</div>
                    )}
                </div>

                {/* Department Request Pattern */}
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>AI</span>
                        Requesting Departments
                    </p>
                    <p style={{ margin: '-10px 0 14px', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Department Pattern (30D)</p>
                    {loading.xrayAnalytics ? (
                        Array(5).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '32px', marginBottom: '6px', borderRadius: '8px' }} />)
                    ) : xrayAnalytics?.dept_pattern?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {xrayAnalytics.dept_pattern.slice(0, 8).map((dept, idx) => {
                                const colors = ['#ef4444', '#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#6366f1', '#ec4899', '#a855f7'];
                                const color = colors[idx % colors.length];
                                return (
                                    <div key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>
                                                {dept.name}
                                            </span>
                                            <span style={{ fontSize: '11px', fontWeight: 900, color }}>
                                                {dept.count} <span style={{ fontWeight: 600, color: 'var(--md-text-tertiary)' }}>({dept.pct}%)</span>
                                            </span>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(0,0,0,0.04)', borderRadius: '3px' }}>
                                            <div style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}90)`, borderRadius: '3px', width: `${dept.pct}%`, transition: 'width 0.8s ease' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No department data available</div>
                    )}
                </div>
            </div>

            {/* ── SECTION 9: TAT Predictor + Priority Mix + Hourly Forecast ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.5fr 1fr', gap: '16px' }}>

                {/* TAT Predictor */}
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>AI</span>
                        TAT Predictor
                    </p>
                    <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Wait time by procedure type (30D)</p>
                    {loading.xrayAnalytics ? (
                        Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '36px', marginBottom: '4px', borderRadius: '8px' }} />)
                    ) : xrayAnalytics?.tat_predictor?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '300px', overflowY: 'auto' }} className="custom-scrollbar">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: '6px', padding: '4px 8px', borderBottom: '1px solid var(--md-border)' }}>
                                <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>Procedure</span>
                                <span style={{ fontSize: '9px', fontWeight: 800, color: '#f59e0b', textAlign: 'center', textTransform: 'uppercase' }}>Wait</span>
                                <span style={{ fontSize: '9px', fontWeight: 800, color: THEME.primary, textAlign: 'center', textTransform: 'uppercase' }}>TAT</span>
                            </div>
                            {xrayAnalytics.tat_predictor.map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: '6px', padding: '6px 8px',
                                    borderRadius: '8px', background: idx === 0 ? 'rgba(139,92,246,0.04)' : 'transparent',
                                    border: idx === 0 ? '1px solid rgba(139,92,246,0.1)' : '1px solid transparent'
                                }}>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {item.item_name}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{item.total_count} cases</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{
                                            fontSize: '13px', fontWeight: 900,
                                            color: item.overall_avg_wait <= 30 ? '#10b981' : item.overall_avg_wait <= 60 ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {item.overall_avg_wait}m
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 900, color: THEME.primary }}>
                                            {item.overall_avg_tat > 0 ? `${item.overall_avg_tat}m` : '—'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No TAT data available</div>
                    )}
                </div>

                {/* Priority Mix */}
                <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>AI</span>
                        Priority
                    </p>
                    <p style={{ margin: '0 0 16px', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Urgency distribution</p>
                    {loading.xrayAnalytics ? (
                        <div className="skeleton" style={{ height: '140px', borderRadius: '50%', width: '140px', margin: '0 auto' }} />
                    ) : xrayAnalytics?.priority_mix?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'center' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                <svg viewBox="0 0 42 42" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                    {(() => {
                                        let offset = 0;
                                        return xrayAnalytics.priority_mix.map((p, i) => {
                                            const pct = p.pct;
                                            const dashArray = `${pct} ${100 - pct}`;
                                            const el = (
                                                <circle key={i} cx="21" cy="21" r="15.915" fill="transparent"
                                                    stroke={p.color} strokeWidth="4" strokeDasharray={dashArray}
                                                    strokeDashoffset={-offset} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
                                            );
                                            offset += pct;
                                            return el;
                                        });
                                    })()}
                                </svg>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 950, color: 'var(--md-text-primary)' }}>
                                        {xrayAnalytics.priority_mix.reduce((s, p) => s + p.count, 0)}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>total</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                                {xrayAnalytics.priority_mix.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>{p.label}</span>
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: 900, color: p.color }}>{p.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No data available</div>
                    )}
                </div>

                {/* Hourly Load Forecast */}
                <div className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>AI</span>
                                Hourly Forecast
                            </p>
                            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Actual vs Predicted (today)</p>
                        </div>
                        {xrayAnalytics?.hourly_forecast && (() => {
                            const predicted = xrayAnalytics.predicted_daily_total || xrayAnalytics.hourly_forecast.reduce((s, h) => s + (h.predicted || 0), 0);
                            const actual = totalRequests;
                            const remaining = Math.max(0, predicted - actual);
                            return (
                                <div style={{ textAlign: 'right', background: 'rgba(16,185,129,0.06)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.15)' }}>
                                    <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Predicted</p>
                                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#10b981' }}>~{predicted} <span style={{ fontSize: '10px', fontWeight: 600 }}>({remaining > 0 ? `~${remaining} remaining` : 'target met'})</span></p>
                                </div>
                            );
                        })()}
                    </div>
                    {loading.xrayAnalytics ? (
                        <div className="skeleton" style={{ height: '180px', borderRadius: '12px' }} />
                    ) : xrayAnalytics?.hourly_forecast ? (
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '180px', paddingTop: '12px' }}>
                            {xrayAnalytics.hourly_forecast.filter(h => h.hour >= 6 && h.hour <= 22).map((h, i) => {
                                const nowHour = new Date().getHours();
                                const todayHourly = hourlyDist;
                                const todayMatch = todayHourly.find(th => th.hour === h.hour);
                                const actualCount = todayMatch ? todayMatch.count : 0;
                                const isPast = h.hour <= nowHour;
                                const displayVal = isPast ? actualCount : h.predicted;
                                const maxVal = Math.max(
                                    ...xrayAnalytics.hourly_forecast.map(x => x.predicted || 0),
                                    ...todayHourly.map(x => x.count || 0), 1
                                );
                                const barH = (displayVal / maxVal) * 140;
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '150px', width: '100%' }}>
                                            {!isPast ? (
                                                <div title={`${h.label}: predicted ${h.predicted} cases`}
                                                    style={{
                                                        width: '85%', height: `${barH}px`, borderRadius: '3px 3px 0 0',
                                                        background: 'repeating-linear-gradient(45deg, rgba(16,185,129,0.2), rgba(16,185,129,0.2) 2px, rgba(16,185,129,0.08) 2px, rgba(16,185,129,0.08) 4px)',
                                                        border: '1px dashed rgba(16,185,129,0.4)', minHeight: barH > 0 ? '4px' : 0
                                                    }} />
                                            ) : (
                                                <div title={`${h.label}: actual ${actualCount} cases`}
                                                    style={{
                                                        width: '85%', height: `${barH}px`, borderRadius: '3px 3px 0 0',
                                                        background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.secondary})`, minHeight: barH > 0 ? '4px' : 0
                                                    }} />
                                            )}
                                        </div>
                                        <span style={{ fontSize: '7px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>{h.hour}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No forecast data available</div>
                    )}
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.secondary})` }} />
                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Actual (Today)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'repeating-linear-gradient(45deg, rgba(16,185,129,0.3), rgba(16,185,129,0.3) 2px, transparent 2px, transparent 4px)', border: '1px dashed rgba(16,185,129,0.5)' }} />
                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Predicted (AI)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION 10: Strategic Indicators + Problem Discovery ─────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                <div className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: THEME.primary, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>ST-01</span> Strategic Indicators
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {aiAnalytics.strategicKPIs.length > 0 ? aiAnalytics.strategicKPIs.map((kpi, idx) => (
                            <div key={idx} style={{ padding: '14px 10px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{kpi.icon}</div>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 950, color: kpi.color }}>{kpi.value}</p>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginTop: '2px' }}>{kpi.label}</p>
                            </div>
                        )) : (
                            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', fontSize: '13px' }}>
                                {loading.xrayAnalytics ? 'Loading Strategic Dashboard...' : 'No Data Available'}
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '20px', borderLeft: `5px solid ${aiAnalytics.urgencyColor}` }}>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: aiAnalytics.urgencyColor, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>AI-DX</span> Problem Discovery & Diagnosis
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {aiAnalytics.problems.length > 0 ? aiAnalytics.problems.map((p, idx) => (
                            <div key={idx} style={{ padding: '14px', borderRadius: '16px', background: `${p.color}08`, border: `1px solid ${p.color}20`, position: 'relative' }}>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: p.color }}>{p.title}</p>
                                <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>{p.rootCause}</p>
                                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '14px' }}>💡</span>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#10b981' }}>RECOMMENDATION: {p.fixFirst}</p>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--md-text-tertiary)', background: 'rgba(16,185,129,0.03)', borderRadius: '16px', border: '1px dashed #10b98140' }}>
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>✨</div>
                                <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>High Performance Mode</p>
                                <p style={{ margin: 0, fontSize: '13px' }}>All indicators are within quality and safety standards</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── SECTION 11: KPI Description Cards ───────────────────────── */}
            {xrayAnalytics && (() => {
                const a = xrayAnalytics;
                const p90Wait = a.p90_wait_time ?? 0;
                const waitSla = a.wait_sla_pct ?? 0;
                const aCompletionRate = a.completion_rate ?? 0;
                const rpi = a.rpi ?? 0;
                const avgRevenue = a.avg_revenue_per_visit ?? 0;
                const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

                return (
                    <KPIDescriptionCards kpis={[
                        {
                            label: 'P90 Wait Time', thLabel: 'P90 Wait Time (Percentile 90)',
                            value: `${p90Wait}m`, color: p90Wait < 45 ? '#10b981' : p90Wait < 75 ? '#f59e0b' : '#f43f5e', icon: '⚡',
                            sub: p90Wait < 45 ? 'Excellent' : p90Wait < 75 ? 'Moderate' : 'Critical',
                            desc: `90% of patients wait no more than ${p90Wait} minutes`,
                            meaning: 'Time within which 90% of patients receive service (P90). Better reflects worst-case patient experience than averages.',
                            calc: 'PERCENTILE(wait_times, 0.90) -- computed from all visits over 30 days',
                            dataSource: 'service_time (HOSxP XE)',
                            period: `30 days through ${todayShort}`,
                            target: '< 45 min',
                            benchmark: 'Community hospital: <60m | Private: <30m',
                            aiTip: p90Wait < 45 ? 'P90 excellent -- most patients receive prompt service' : 'P90 elevated -- investigate peak-hour bottlenecks and increase pre-scheduling',
                        },
                        {
                            label: 'Wait SLA Compliance', thLabel: 'Wait SLA Compliance (<=30m)',
                            value: `${waitSla}%`, color: waitSla > 85 ? '#10b981' : waitSla > 70 ? '#f59e0b' : '#f43f5e', icon: '⏱️',
                            sub: waitSla > 85 ? 'Passing' : 'Below Target',
                            desc: `${waitSla}% of patients wait 30 minutes or less`,
                            meaning: 'Percentage of patients served within the 30-minute SLA. Measures queue management effectiveness.',
                            calc: '(visits with wait <= 30min / total visits) x 100',
                            dataSource: 'service_time (HOSxP XE)',
                            period: '30 days rolling',
                            target: '>= 85%',
                            benchmark: 'MoPH: >=80% | HA: >=85%',
                            aiTip: waitSla > 85 ? 'Queue management excellent -- maintain standards' : 'Below target -- implement appointment scheduling and load balancing',
                        },
                        {
                            label: 'Completion Rate', thLabel: 'Case Completion Rate',
                            value: `${aCompletionRate}%`, color: aCompletionRate > 90 ? '#10b981' : aCompletionRate > 80 ? '#f59e0b' : '#f43f5e', icon: '✅',
                            sub: aCompletionRate > 90 ? 'Excellent' : 'Needs Improvement',
                            desc: `${aCompletionRate}% of patients complete their imaging as planned`,
                            meaning: 'Proportion of patients who complete the full imaging workflow (no dropout). Reflects service quality.',
                            calc: '(Completed visits / Total registered visits) x 100',
                            dataSource: 'ovst + vn_stat (HOSxP XE)',
                            period: '30 days rolling',
                            target: '>= 90%',
                            benchmark: 'Community hospital: >=85% | HA: >=90%',
                            aiTip: aCompletionRate > 90 ? 'Low dropout -- patients are satisfied' : 'High dropout -- analyze root cause (long wait? cost? unclear instructions?)',
                        },
                        {
                            label: 'RPI Score', thLabel: 'Radiology Performance Index',
                            value: `${rpi}`, color: rpi >= 80 ? '#10b981' : rpi >= 60 ? '#f59e0b' : '#f43f5e', icon: '🎯',
                            sub: rpi >= 80 ? 'Optimal' : rpi >= 60 ? 'Fair' : 'Critical',
                            desc: `Radiology Performance Index: ${rpi}/100`,
                            meaning: 'Composite radiology performance index. Calculated from Wait Time + Completion Rate + Revenue Profitability.',
                            calc: 'W(0.4) x Wait_Score + W(0.4) x Completion + W(0.2) x Revenue',
                            dataSource: 'AI Composite (HOSxP XE)',
                            period: `Computed ${todayShort}`,
                            target: '>= 80',
                            benchmark: 'BCH Internal >=75 | Excellence >=85',
                            aiTip: rpi >= 80 ? 'RPI high -- radiology clinic performing well across all dimensions' : 'RPI low -- check lowest-scoring component for targeted improvement',
                        },
                        {
                            label: 'Revenue / Visit', thLabel: 'Average Revenue per Visit',
                            value: `${avgRevenue.toLocaleString()}`, color: '#8b5cf6', icon: '💰',
                            desc: 'Average revenue per radiology visit',
                            meaning: 'Average revenue per imaging visit. Reflects service mix (Plain Film vs CT/MRI) and billing completeness.',
                            calc: 'Total Revenue (30d) / Total Visits (30d)',
                            dataSource: 'xray_head.total_price (HOSxP XE)',
                            period: '30 days rolling',
                            target: '>= 400 THB',
                            benchmark: 'Plain Film: 150-300 | CT: 2,000-5,000 | MRI: 5,000+',
                            aiTip: avgRevenue >= 400 ? 'Good service mix with sufficient advanced imaging studies' : 'Low revenue/visit -- check billing completeness and service mix',
                        },
                    ]} />
                );
            })()}

            {/* ── SECTION 12: Revenue & Fiscal Trends ─────────────────────── */}
            <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Financial Performance & Fiscal Trends</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Revenue comparison across fiscal years</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {xrayRevenueFiscal?.fiscal_years?.slice(-2).map((fy, fi) => (
                            <div key={fi} style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{fy.fiscal_label}</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: fi === 1 ? THEME.primary : 'var(--md-text-secondary)' }}>฿{(fy.total_revenue / 1e6).toFixed(2)}M</p>
                            </div>
                        ))}
                    </div>
                </div>
                {xrayRevenueFiscal?.fiscal_years ? (
                    <div style={{ height: '320px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="xrayBarGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={THEME.primary} stopOpacity={1} />
                                        <stop offset="100%" stopColor={THEME.secondary} stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--md-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1e6).toFixed(1)}M`} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(139,92,246,0.05)' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '12px' }}
                                />
                                {xrayRevenueFiscal.fiscal_years.map((fy, fi) => {
                                    const isLatest = fi === xrayRevenueFiscal.fiscal_years.length - 1;
                                    return (
                                        <Bar
                                            key={fi}
                                            dataKey={`fy${fi}`}
                                            name={fy.fiscal_label}
                                            fill={isLatest ? "url(#xrayBarGrad)" : "#cbd5e1"}
                                            radius={[6, 6, 0, 0]}
                                            barSize={isLatest ? 28 : 20}
                                        />
                                    );
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--md-border)', borderRadius: '24px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                            <p style={{ color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{loading.xrayRevenueFiscal ? 'Loading financial analytics...' : 'Financial Data Stream Offline'}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* ── SECTION 13: Modality Breakdown + Report TAT ─────────────── */}
            <XRayModalityPanel data={xrayAnalytics?.modality_breakdown} loading={loading.xrayAnalytics} />

            {/* ── SECTION 14: Top Clinical Diagnoses (30D) ────────────────── */}
            <div className="glass-card" style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Top Clinical Diagnoses & Procedures (30D)</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {xrayAnalytics?.top_diagnoses?.slice(0, 6).map((item, idx) => (
                        <div key={idx} style={{ padding: '12px 16px', background: 'var(--md-surface)', borderRadius: '12px', border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#8b5cf610', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '12px' }}>
                                {idx + 1}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name || 'Unknown X-Ray'}</p>
                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)' }}>{item.code || 'Radiology Item'}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: THEME.primary }}>{item.count}</p>
                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Requests</p>
                            </div>
                        </div>
                    ))}
                    {(!xrayAnalytics?.top_diagnoses || xrayAnalytics.top_diagnoses.length === 0) && !loading.xrayAnalytics && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>No diagnosis data available for this period</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── X-Ray Modality Breakdown + Report TAT Panel ───────────────────────────
// TAT targets: Plain 30m | CT 120m | MRI 240m | US 60m (ACR guidelines)
const MODALITY_ICONS = {
    'Plain Film':           { icon: '🩻', color: '#8b5cf6' },
    'CT Scan':              { icon: '🔬', color: '#f43f5e' },
    'MRI':                  { icon: '🧲', color: '#0ea5e9' },
    'Ultrasound':           { icon: '🔊', color: '#10b981' },
    'Fluoroscopy / Special':{ icon: '⚡', color: '#f59e0b' },
};

const TAT_STATUS_CONFIG = {
    on_time:  { color: '#10b981', label: 'On Time' },
    delayed:  { color: '#f59e0b', label: 'Delayed' },
    critical: { color: '#f43f5e', label: 'Critical' },
    no_data:  { color: '#94a3b8', label: 'No Data' },
};

function XRayModalityPanel({ data, loading }) {
    if (loading) return <div className="skeleton" style={{ height: '160px', borderRadius: '16px' }} />;
    if (!data || data.length === 0) return null;

    const total = data.reduce((s, m) => s + m.count, 0);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    Modality Breakdown + Radiologist Report TAT
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(139,92,246,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    30 days | ACR Guidelines
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {data.map((m, i) => {
                    const cfg = MODALITY_ICONS[m.modality] || { icon: '📊', color: '#94a3b8' };
                    const tatCfg = TAT_STATUS_CONFIG[m.tat_status] || TAT_STATUS_CONFIG.no_data;
                    const pct = total > 0 ? Math.round((m.count / total) * 100) : 0;
                    return (
                        <div key={i} className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: `3px solid ${cfg.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '18px' }}>{cfg.icon}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: cfg.color }}>{m.modality}</span>
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: tatCfg.color, background: `${tatCfg.color}12`, padding: '2px 6px', borderRadius: '6px' }}>
                                    {tatCfg.label}
                                </span>
                            </div>

                            <p style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 900, color: cfg.color }}>{m.count.toLocaleString()}</p>
                            <p style={{ margin: '0 0 8px', fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>{pct}% of total | {m.completion_rate}% done</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(203,213,225,.08)', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{m.avg_wait_min || '—'}<span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>m</span></p>
                                    <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>Wait (shoot)</p>
                                </div>
                                <div style={{ padding: '6px', borderRadius: '6px', background: `${tatCfg.color}08`, textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: tatCfg.color }}>{m.avg_tat_min || '—'}<span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>m</span></p>
                                    <p style={{ margin: 0, fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>TAT (report)</p>
                                </div>
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Target TAT: {'≤'}{m.tat_target_min}m</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default React.memo(XRAYTab);
