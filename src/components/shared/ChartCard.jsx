// ============================================================
// ChartCard — consistent wrapper around any Recharts chart.
// Handles: title, toolbar, legend swatches, loading skeleton,
// empty-state, SubErrorBoundary (if available).
// ============================================================
import React from 'react';
import { cn, cardBase, cardPad, t } from '../../theme/compose.js';

/**
 * <ChartCard title="OPD Hourly" subtitle="วันนี้ vs เมื่อวาน"
 *            series={[{ label: 'วันนี้', color: '#0f766e' }, { label: 'เมื่อวาน', color: '#fb6340' }]}
 *            loading={loading} empty={!data?.length} height={280}>
 *   <LineChart data={data}>...</LineChart>
 * </ChartCard>
 */
export default function ChartCard({
    title, subtitle, icon,
    toolbar,
    series = [],
    children,
    height = 280,
    loading = false,
    empty = false,
    emptyLabel = 'ไม่มีข้อมูลในช่วงนี้',
    className,
}) {
    return (
        <section className={cn(cardBase, cardPad, className)}>
            {(title || toolbar) && (
                <header className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                        <h3 className={cn(t.sectionTitle, 'flex items-center gap-2 min-w-0')}>
                            {icon && <span aria-hidden="true" className="text-fs-lg">{icon}</span>}
                            <span className="truncate">{title}</span>
                        </h3>
                        {subtitle && <p className={cn(t.bodyDim, 'mt-0.5 truncate')}>{subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">{toolbar}</div>
                </header>
            )}

            {/* Custom legend swatches (cleaner than Recharts default) */}
            {series.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-2">
                    {series.map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 text-fs-2xs text-[color:var(--md-text-secondary)]">
                            <span
                                className="inline-block w-3 h-1.5 rounded-full"
                                style={{ background: s.color, borderStyle: s.dashed ? 'dashed' : 'solid' }}
                                aria-hidden="true"
                            />
                            <span>{s.label}</span>
                        </span>
                    ))}
                </div>
            )}

            <div style={{ height }} className="relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center text-[color:var(--md-text-tertiary)] text-fs-xs">
                        <div className="skeleton w-full h-full rounded-lg" />
                    </div>
                )}
                {!loading && empty && (
                    <div className="absolute inset-0 flex items-center justify-center text-[color:var(--md-text-tertiary)] text-fs-sm">
                        <div className="text-center">
                            <div className="text-3xl opacity-40 mb-2">📊</div>
                            <div>{emptyLabel}</div>
                        </div>
                    </div>
                )}
                {!loading && !empty && children}
            </div>
        </section>
    );
}
