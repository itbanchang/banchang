// ============================================================
// Professional KPI Dashboard - Beautiful & Data-Driven
// Main dashboard with multiple analytics sections
// ============================================================
import React, { useCallback, useMemo } from 'react';
import KPICardV2 from './KPICardV2.jsx';
import AIInsightsPanel from './AIInsightsPanel.jsx';

export default function ProfessionalKPIDashboard({
    dashboardData = {},
    kpiMetrics = {},
    aiInsights = {},
    loading = false,
    onDrillDown = null,
    onAction = null
}) {
    // KPI Categories with beautiful colors
    const kpiCategories = useMemo(() => ({
        revenue: {
            title: '💰 Revenue & Finance',
            color: 'emerald',
            icon: '📊',
            kpis: [
                {
                    id: 'total-revenue',
                    title: 'Total Revenue',
                    value: kpiMetrics.totalRevenue || 0,
                    unit: 'THB',
                    format: 'currency',
                    icon: '💵',
                    color: 'emerald',
                    trend: kpiMetrics.revenueGrowth,
                    trendLabel: 'vs last month',
                    aiInsight: aiInsights.revenueInsight,
                    comparison: kpiMetrics.revenueComparison
                },
                {
                    id: 'collection-rate',
                    title: 'Collection Rate',
                    value: kpiMetrics.collectionRate || 0,
                    unit: '%',
                    format: 'percent',
                    icon: '💳',
                    color: 'green',
                    trend: kpiMetrics.collectionTrend,
                    trendLabel: 'collection improvement',
                    aiInsight: aiInsights.collectionInsight
                },
                {
                    id: 'debtors-outstanding',
                    title: 'Debtors Outstanding',
                    value: kpiMetrics.deptorsOutstanding || 0,
                    unit: 'THB',
                    format: 'currency',
                    icon: '📋',
                    color: 'amber',
                    trend: kpiMetrics.debtorsTrend,
                    trendLabel: 'debt trend',
                    aiInsight: aiInsights.debtorsInsight
                }
            ]
        },
        clinical: {
            title: '🏥 Clinical Operations',
            color: 'blue',
            icon: '🏨',
            kpis: [
                {
                    id: 'ipd-occupancy',
                    title: 'IPD Occupancy Rate',
                    value: kpiMetrics.inpatientOccupancy || 0,
                    unit: '%',
                    format: 'percent',
                    icon: '🛏️',
                    color: 'blue',
                    trend: kpiMetrics.occupancyTrend,
                    trendLabel: 'vs target 75%',
                    aiInsight: aiInsights.occupancyInsight,
                    comparison: kpiMetrics.occupancyComparison
                },
                {
                    id: 'opd-visits',
                    title: 'OPD Visits',
                    value: kpiMetrics.opdVisits || 0,
                    unit: 'visits',
                    format: 'number',
                    icon: '👥',
                    color: 'cyan',
                    trend: kpiMetrics.opdGrowth,
                    trendLabel: 'weekly growth',
                    aiInsight: aiInsights.opdInsight
                },
                {
                    id: 'average-los',
                    title: 'Average Length of Stay',
                    value: kpiMetrics.averageLOS || 0,
                    unit: 'days',
                    format: 'decimal',
                    icon: '📅',
                    color: 'purple',
                    trend: -kpiMetrics.losTrend,
                    trendLabel: 'lower is better',
                    aiInsight: aiInsights.losInsight
                }
            ]
        },
        claims: {
            title: '📝 Claims & Insurance',
            color: 'red',
            icon: '📄',
            kpis: [
                {
                    id: 'claims-submitted',
                    title: 'Claims Submitted',
                    value: kpiMetrics.totalSubmittedClaims || 0,
                    unit: 'claims',
                    format: 'number',
                    icon: '📤',
                    color: 'blue',
                    trend: kpiMetrics.claimsSubmittedTrend,
                    trendLabel: 'processing pace',
                    aiInsight: aiInsights.claimsInsight
                },
                {
                    id: 'denial-rate',
                    title: 'Denial Rate',
                    value: kpiMetrics.denialRate || 0,
                    unit: '%',
                    format: 'percent',
                    icon: '❌',
                    color: 'red',
                    trend: -kpiMetrics.denialTrend,
                    trendLabel: 'lower is better',
                    aiInsight: aiInsights.denialInsight,
                    comparison: kpiMetrics.denialComparison
                },
                {
                    id: 'approval-rate',
                    title: 'Approval Rate',
                    value: kpiMetrics.approvalRate || 0,
                    unit: '%',
                    format: 'percent',
                    icon: '✅',
                    color: 'green',
                    trend: kpiMetrics.approvalTrend,
                    trendLabel: 'vs benchmark 92%',
                    aiInsight: aiInsights.approvalInsight
                }
            ]
        },
        staffing: {
            title: '👥 Human Resources',
            color: 'purple',
            icon: '👤',
            kpis: [
                {
                    id: 'staff-on-duty',
                    title: 'Staff On Duty',
                    value: kpiMetrics.staffOnDuty || 0,
                    unit: 'staff',
                    format: 'number',
                    icon: '👨‍⚕️',
                    color: 'purple',
                    trend: kpiMetrics.staffTrend,
                    trendLabel: 'current schedule',
                    aiInsight: aiInsights.staffOnDutyInsight
                },
                {
                    id: 'utilization-rate',
                    title: 'Staff Utilization',
                    value: kpiMetrics.staffUtilization || 0,
                    unit: '%',
                    format: 'percent',
                    icon: '⚙️',
                    color: 'indigo',
                    trend: kpiMetrics.utilizationTrend,
                    trendLabel: 'vs capacity',
                    aiInsight: aiInsights.staffInsight
                },
                {
                    id: 'training-hours',
                    title: 'Training Hours This Month',
                    value: kpiMetrics.trainingHours || 0,
                    unit: 'hrs',
                    format: 'number',
                    icon: '📚',
                    color: 'cyan',
                    aiInsight: aiInsights.trainingInsight
                }
            ]
        }
    }), [kpiMetrics, aiInsights]);

    const handleDrillDown = useCallback((id, title, endpoint) => {
        if (onDrillDown) {
            onDrillDown({ id, title, endpoint });
        }
    }, [onDrillDown]);

    const handleAction = useCallback((action) => {
        if (onAction) {
            onAction(action);
        }
    }, [onAction]);

    return (
        <div className="space-y-6 pb-8">
            {/* AI Insights Section */}
            <div className="sticky top-0 z-10">
                <div className="bg-white dark:bg-gray-950 pt-4 pb-2">
                    <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>🤖</span> AI Insights & Recommendations
                    </h2>
                    <AIInsightsPanel
                        data={{
                            revenueGrowth: kpiMetrics.revenueGrowth,
                            inpatientOccupancy: kpiMetrics.inpatientOccupancy,
                            collectionRate: kpiMetrics.collectionRate,
                            denialCount: kpiMetrics.denialCount,
                            totalClaims: kpiMetrics.totalSubmittedClaims,
                            staffUtilization: kpiMetrics.staffUtilization,
                            nextMonthPrediction: aiInsights.prediction,
                            anomalies: aiInsights.anomalies
                        }}
                        loading={loading}
                        onAction={handleAction}
                    />
                </div>
            </div>

            {/* KPI Categories */}
            {Object.entries(kpiCategories).map(([categoryKey, category]) => (
                <div key={categoryKey}>
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                            {category.title}
                        </h2>
                        <div className={`h-1 flex-1 bg-gradient-to-r from-${category.color}-500 to-transparent rounded-full`} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.kpis.map((kpi) => (
                            <KPICardV2
                                key={kpi.id}
                                {...kpi}
                                loading={loading}
                                onDrillDown={handleDrillDown}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* Key Metrics Summary */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">📊 Key Metrics Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
                    {[
                        { label: 'Total Revenue', value: new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', notation: 'compact' }).format(kpiMetrics.totalRevenue || 0) },
                        { label: 'Patient Count', value: new Intl.NumberFormat('th-TH').format(kpiMetrics.patientCount || 0) },
                        { label: 'Staff Active', value: new Intl.NumberFormat('th-TH').format(kpiMetrics.staffOnDuty || 0) },
                        { label: 'Collection %', value: `${(kpiMetrics.collectionRate || 0).toFixed(1)}%` },
                        { label: 'Beds Occupied', value: `${(kpiMetrics.inpatientOccupancy || 0).toFixed(1)}%` },
                        { label: 'Claims Approved', value: `${(kpiMetrics.approvalRate || 0).toFixed(1)}%` },
                    ].map((metric, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400 font-semibold text-xs mb-1">{metric.label}</p>
                            <p className="text-lg font-black text-gray-900 dark:text-white">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
