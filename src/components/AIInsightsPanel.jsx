// ============================================================
// AI Insights Panel - Professional Data-Driven Analytics
// Shows predictions, anomalies, and actionable recommendations
// Executive Intelligence V.10 - Performance Optimized
// ============================================================
import React, { useMemo, useState } from 'react';

const AIInsightCard = React.memo(({ icon, title, message, type = 'info', action = null, priority = 0 }) => {
    const typeStyles = {
        success: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-300' },
        warning: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-300' },
        error: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-300' },
        info: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800', text: 'text-indigo-800 dark:text-indigo-300' }
    };

    const style = typeStyles[type] || typeStyles.info;

    return (
        <div
            className={`rounded-2xl border ${style.bg} ${style.border} p-4 flex gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden`}
        >
            <div className={`text-2xl flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-white/50 dark:bg-black/20 shadow-sm ${style.text}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0 z-10">
                <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-extrabold text-sm ${style.text}`}>{title}</h4>
                    {priority > 0 && <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 border px-2 py-0.5 rounded-full">Priority {priority}</span>}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{message}</p>
                {action && (
                    <button
                        onClick={action.onClick}
                        className={`mt-2.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/60 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 transition-colors shadow-sm ${style.text}`}
                    >
                        {action.label} →
                    </button>
                )}
            </div>

            {/* Background decorative element */}
            <div className="absolute -right-4 -bottom-4 opacity-5 text-6xl pointer-events-none transform -rotate-12">
                {icon}
            </div>
        </div>
    );
});

const ROLE_TABS = ['ทั้งหมด', 'แพทย์', 'พยาบาล', 'ผู้บริหาร'];

const AIInsightsPanel = React.memo(({ data = {}, loading = false, onAction = null, clinicalData = null }) => {
    const [activeRole, setActiveRole] = useState('ทั้งหมด');

    // Merge clinical role-based insights from clinicalData
    const clinicalRoleInsights = useMemo(() => {
        if (!clinicalData) return [];
        const merged = [];
        const roleMap = { 'แพทย์': 'doctor', 'พยาบาล': 'nurse', 'ผู้บริหาร': 'admin' };
        for (const [thaiRole, engKey] of Object.entries(roleMap)) {
            const arr = clinicalData[engKey] || clinicalData[engKey + 's'] || [];
            arr.forEach((item, i) => {
                // Map priority string to number: critical=1, high=2, medium=3, low=4
                const prioMap = { critical: 1, high: 2, medium: 3, low: 4, info: 5 };
                const prioNum = typeof item.priority === 'string' ? (prioMap[item.priority] || 3) : (item.priority || 3);
                // Map priority to type for card styling
                const typeMap = { critical: 'error', high: 'warning', medium: 'info', low: 'success' };
                const cardType = typeof item.priority === 'string' ? (typeMap[item.priority] || 'info') : (item.type || 'info');
                merged.push({
                    idx: `clinical-${engKey}-${i}`,
                    icon: engKey === 'doctor' ? '👨‍⚕️' : engKey === 'nurse' ? '👩‍⚕️' : '📊',
                    priority: prioNum,
                    type: cardType,
                    title: item.title || `${thaiRole} Insight`,
                    message: item.title || item.analysis || item.recommendation || '',
                    role: thaiRole,
                    action: item.action || null
                });
            });
        }
        return merged;
    }, [clinicalData]);

    // ⚡ Performance Fix: Use useMemo instead of useEffect + useState to prevent double-rendering
    const insights = useMemo(() => {
        if (!data || Object.keys(data).length === 0) return [];

        const generatedInsights = [];

        // 🧠 Strategic Compound Analysis (Multi-variable logic)
        const isHighOccupancy = (data.inpatientOccupancy || 0) > 85;
        const isStaffStrained = (data.staffUtilization || 0) > 85;
        const isRevenueDropping = (data.revenueGrowth || 0) < -2;
        const isCollectionLow = (data.collectionRate || 100) < 85;
        const hasHighDenials = ((data.denialCount || 0) / (data.totalClaims || 1)) > 0.05;

        // 1. Compound: Capacity meets Staffing Warning
        if (isHighOccupancy && isStaffStrained) {
            generatedInsights.push({
                idx: 'cap-staff', icon: '🚨', priority: 1, type: 'error',
                title: 'Critical Capacity & Staff Strain',
                message: `IPD Occupancy is critical (${data.inpatientOccupancy?.toFixed(1) || 0}%) while staff utilization is simultaneously high (${data.staffUtilization?.toFixed(1) || 0}%). Immediate risk of care quality degradation. Recommend activating surge protocols and float pool staff.`,
                action: { label: 'Deploy Surge Protocol', onClick: () => onAction?.('surge_activation') }
            });
        } else if (isHighOccupancy) {
            generatedInsights.push({
                idx: 'cap', icon: '🏥', priority: 2, type: 'warning',
                title: 'Nearing Max Capacity',
                message: `Inpatient beds are ${data.inpatientOccupancy?.toFixed(1) || 0}% full. Plan elective surgery scheduling carefully to preserve emergency admission capacity.`,
            });
        }

        // 2. Compound: Revenue & Billing Integrity
        if (isCollectionLow && hasHighDenials) {
            generatedInsights.push({
                idx: 'rev-denial', icon: '💸', priority: 1, type: 'error',
                title: 'Revenue Cycle Degradation',
                message: `Compounding issue: Collection rate is low (${data.collectionRate?.toFixed(1) || 0}%) AND claim denial rate is elevated. This causes severe cash flow restriction. Audit coding accuracy immediately.`,
                action: { label: 'Audit Revenue Cycle', onClick: () => onAction?.('revenue_audit') }
            });
        } else if (hasHighDenials) {
            generatedInsights.push({
                idx: 'denial', icon: '🛑', priority: 2, type: 'warning',
                title: 'Elevated Claim Denials',
                message: `${data.denialCount || 0} recent claims were denied. Analyze denial reason codes to fix systemic documentation issues.`,
                action: { label: 'Analyze Denials', onClick: () => onAction?.('denial_analysis') }
            });
        }

        // 3. Operational Excellence (Positive reinforcement)
        if (data.revenueGrowth > 5 && !isHighOccupancy && data.staffUtilization < 80) {
            generatedInsights.push({
                idx: 'opt-1', icon: '🚀', priority: 3, type: 'success',
                title: 'Optimal Operational State',
                message: `High operational elasticity: Revenue is growing (${data.revenueGrowth.toFixed(1)}%) while maintaining healthy capacity and unburdened staff. Ideal condition for introducing new specialized service lines.`,
            });
        } else if (data.revenueGrowth > 5) {
            generatedInsights.push({
                idx: 'opt-2', icon: '📈', priority: 3, type: 'success',
                title: 'Strong Revenue Trajectory',
                message: `Top-line revenue is outperforming baseline by ${data.revenueGrowth.toFixed(1)}%. Core profitable departments are sustaining consistent volume.`,
            });
        }

        // 4. Predictive modeling output
        if (data.nextMonthPrediction) {
            generatedInsights.push({
                idx: 'pred', icon: '🔮', priority: 4, type: 'info',
                title: 'AI Forecast: Next 30 Days',
                message: data.nextMonthPrediction,
            });
        }

        // 5. Raw Anomaly Injection
        if (data.anomalies && data.anomalies.length > 0) {
            data.anomalies.slice(0, 2).forEach((anomaly, index) => {
                generatedInsights.push({
                    idx: `anom-${index}`, icon: '🎯', priority: 2, type: 'warning',
                    title: 'Statistical Anomaly Detected',
                    message: typeof anomaly === 'string' ? anomaly : anomaly.message || 'Abnormal data pattern identified in recent transactions.'
                });
            });
        }

        // Sort by priority (1 is highest)
        return generatedInsights.sort((a, b) => a.priority - b.priority);
    }, [data, onAction]);

    // Merge clinical role insights and apply role filter
    const filteredInsights = useMemo(() => {
        const allInsights = [...(insights || []), ...clinicalRoleInsights];
        if (activeRole === 'ทั้งหมด') return allInsights;
        return allInsights.filter(i => !i.role || i.role === activeRole);
    }, [insights, clinicalRoleInsights, activeRole]);

    if (loading) {
        return (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-inner">
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!filteredInsights || filteredInsights.length === 0) {
        return (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="text-4xl mb-3 opacity-50 animate-bounce">🧠</div>
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-1">AI Intelligence Core Active</h3>
                <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 max-w-[250px] leading-relaxed">System is continuously monitoring departmental telemetry. Actionable insights will appear here when anomalies or optimization opportunities are detected.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Role filter tabs */}
            {clinicalData && (
                <div className="flex gap-2 mb-2 flex-wrap">
                    {ROLE_TABS.map(role => (
                        <button
                            key={role}
                            onClick={() => setActiveRole(role)}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                                activeRole === role
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            )}
            {filteredInsights.map((insight) => (
                <AIInsightCard key={insight.idx} {...insight} />
            ))}
        </div>
    );
});

export default AIInsightsPanel;
