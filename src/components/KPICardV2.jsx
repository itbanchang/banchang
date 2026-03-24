// ============================================================
// Professional KPI Card Component v2
// Beautiful, data-driven KPIs with AI insights
// ============================================================
import React, { useState } from 'react';

const TrendIcon = ({ trend, size = 'md' }) => {
    const sizeClass = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' }[size] || 'w-4 h-4';

    if (!trend) return null;

    const isPositive = trend > 0;
    const color = isPositive ? 'text-emerald-500' : 'text-red-500';

    return (
        <svg className={`${sizeClass} ${color} inline-block`} fill="currentColor" viewBox="0 0 20 20">
            {isPositive ? (
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z" clipRule="evenodd" />
            ) : (
                <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L8.414 13h3.586z" clipRule="evenodd" />
            )}
        </svg>
    );
};

function KPICardV2({
    title,
    value,
    unit = '',
    icon = '📊',
    color = 'blue',
    trend = null,
    trendLabel = '',
    format = 'number',
    loading = false,
    drillDownId,
    drillDownEndpoint,
    onDrillDown,
    aiInsight = null,
    comparison = null
}) {
    const [showAI, setShowAI] = useState(false);

    const colorClasses = {
        blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', accent: 'bg-blue-500' },
        green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800', accent: 'bg-green-500' },
        red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800', accent: 'bg-red-500' },
        purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800', accent: 'bg-purple-500' },
        amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', accent: 'bg-amber-500' },
        cyan: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800', accent: 'bg-cyan-500' }
    };

    const c = colorClasses[color] || colorClasses.blue;

    const formatValue = (val) => {
        if (val === null || val === undefined) return '-';

        switch (format) {
            case 'currency':
                return new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                    notation: 'compact',
                    maximumFractionDigits: 1
                }).format(val);
            case 'percent':
                return `${(val * 100).toFixed(1)}%`;
            case 'decimal':
                return parseFloat(val).toFixed(2);
            case 'number':
            default:
                return new Intl.NumberFormat('th-TH').format(val);
        }
    };

    const displayValue = formatValue(value);
    const trendColor = trend > 0 ? 'text-emerald-600' : 'text-red-600';
    const trendBg = trend > 0 ? 'bg-emerald-50' : 'bg-red-50';

    return (
        <div
            className={`group relative rounded-2xl border transition-all duration-500 cursor-pointer ${c.bg} ${c.border}`}
            onClick={() => drillDownId && onDrillDown && onDrillDown(drillDownId, title, drillDownEndpoint)}
            style={{
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
                backdropFilter: 'blur(16px)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0,0,0,0.05)'; }}
        >
            {/* Hover Glow Effect */}
            <div className={`absolute -inset-[1px] rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-500 ${c.accent} pointer-events-none`}></div>

            <div className="relative h-full flex flex-col p-4 sm:p-5 md:p-6 z-10 bg-white/30 dark:bg-gray-900/40 rounded-2xl overflow-hidden">
                {/* Decorative background element */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-150 ${c.accent}`}></div>

                {/* Header with icon and title */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3 flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-xl sm:text-2xl shadow-sm border border-white/40 dark:border-gray-700/40 backdrop-blur-md ${c.bg}`}>
                            {icon}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center min-h-[40px] sm:min-h-[48px]">
                            <h3 className="text-[11px] sm:text-xs md:text-[13px] font-extrabold uppercase tracking-wide text-gray-700 dark:text-gray-300 truncate">
                                {title}
                            </h3>
                            {comparison && (
                                <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                    {comparison}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* AI Insight button */}
                    {aiInsight && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAI(!showAI);
                            }}
                            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-current shadow-sm hover:scale-110 hover:rotate-12 transition-all duration-300 flex-shrink-0 ${showAI ? 'bg-current text-white dark:text-gray-900' : 'bg-white/50 dark:bg-gray-800/50 text-current'} ${c.text}`}
                            title="AI Insight"
                        >
                            <span className="text-[13px] sm:text-sm">✨</span>
                        </button>
                    )}
                </div>

                {/* Main value */}
                <div className="mb-auto">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                        <p className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${c.text} break-words`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                            {displayValue}
                        </p>
                        {unit && <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 mt-1">{unit}</span>}
                    </div>
                </div>

                {/* Trend indicator */}
                {trend !== null && (
                    <div className={`mt-4 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl w-fit border border-current shadow-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-md transition-transform hover:scale-105 ${trendColor}`}>
                        <TrendIcon trend={trend} size="sm" />
                        <span className="tracking-wide">{Math.abs(trend)}%</span>
                        {trendLabel && <span className="text-gray-500 dark:text-gray-400 font-medium ml-1">• {trendLabel}</span>}
                    </div>
                )}

                {/* AI Insight Panel */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${showAI ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
                >
                    <div className={`p-3 sm:p-4 rounded-xl border border-white/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 shadow-inner backdrop-blur-md relative overflow-hidden`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.accent}`}></div>
                        <div className="flex items-start gap-2 sm:gap-3">
                            <span className="text-base sm:text-lg flex-shrink-0 mt-0.5 filter drop-shadow-sm">🤖</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs font-bold text-gray-800 dark:text-gray-200 mb-0.5 tracking-wider uppercase">Strategic AI Guidance</p>
                                <p className="text-[11px] sm:text-xs leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                                    {aiInsight}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Drill down indicator */}
                {drillDownId && (
                    <div className="absolute bottom-3 right-3 text-gray-400 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400 transition-all duration-300 text-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                )}

                {/* Loading state overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[2px] z-20 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full border-4 border-current border-t-transparent animate-spin ${c.text}`}></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(KPICardV2);
