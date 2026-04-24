// ============================================================
// KPICardV3 — Modern Tailwind-native KPI card
//
// Replaces inline-style KPICardV2. Works directly with the metric
// registry output shape { value, status, unit, label }.
//
// Props:
//   title, thTitle?, value, format?('number'|'currency'|'percent'|'decimal')
//   status?('good'|'warning'|'danger'|'info'|'unknown'), color? (semantic override)
//   icon?, trend? (number — signed %), trendLabel?
//   target?, benchmark?, aiHint?, loading?, onClick?
// ============================================================
import React from 'react';
import { cn, fmt, kpiTint, t } from '../../theme/compose.js';

const STATUS_TO_COLOR = {
    good:    'accent',
    warning: 'warning',
    danger:  'danger',
    info:    'info',
    unknown: 'slate',
};

function format(value, fmtKind) {
    if (value == null || Number.isNaN(Number(value))) return '—';
    switch (fmtKind) {
        case 'currency': return fmt.currency(value);
        case 'percent':  return fmt.percent(value);
        case 'decimal':  return fmt.decimal(value, 2);
        default:         return fmt.number(value);
    }
}

function Trend({ value, label }) {
    if (value == null || Number.isNaN(Number(value))) return null;
    const v = Number(value);
    const positive = v > 0;
    const zero = v === 0;
    return (
        <span className={cn(
            'inline-flex items-center gap-1 text-fs-2xs font-bold',
            zero && 'text-[color:var(--md-text-tertiary)]',
            !zero && positive && 'text-accent-600',
            !zero && !positive && 'text-danger-600',
        )}>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                {positive
                    ? <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z" clipRule="evenodd" />
                    : <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L8.414 13h3.586z" clipRule="evenodd" />}
            </svg>
            <span className="font-mono tabular-nums">{positive ? '+' : ''}{v.toFixed(1)}%</span>
            {label && <span className="font-normal text-[color:var(--md-text-tertiary)]">{label}</span>}
        </span>
    );
}

export default function KPICardV3({
    title, thTitle,
    value, format: fmtKind = 'number',
    status = 'info', color,
    icon, trend, trendLabel,
    target, targetLabel,
    aiHint,
    loading = false,
    onClick,
    className,
}) {
    const tintKey = color || STATUS_TO_COLOR[status] || 'info';
    const tint = kpiTint[tintKey] || kpiTint.slate;
    const display = format(value, fmtKind);

    return (
        <article
            className={cn(
                'group relative rounded-card p-4 sm:p-5',
                'bg-[color:var(--md-surface)] border border-[color:var(--md-border)]',
                'shadow-elev-sm hover:shadow-elev-lg transition-[box-shadow,transform,border-color] duration-300 ease-soft',
                'ring-1 ring-transparent hover:' + tint.ring,
                'overflow-hidden',
                className,
            )}
        >
            {/* Side accent bar */}
            <span className={cn('absolute left-0 top-0 h-full w-1', tint.bar)} aria-hidden="true" />

            {/* Optional interactive overlay — proper button semantics for keyboard/a11y */}
            {onClick && (
                <button
                    type="button"
                    onClick={onClick}
                    aria-label={thTitle || title || 'KPI drill-down'}
                    className="absolute inset-0 z-10 rounded-card focus:outline-none focus:ring-2 focus:ring-primary-500/40 hover:bg-primary-600/[.02]"
                />
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                    <div className={t.eyebrow}>{title}</div>
                    {thTitle && <div className={cn(t.labelThai, 'mt-0.5 truncate')}>{thTitle}</div>}
                </div>
                {icon && (
                    <div className={cn(
                        'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl',
                        'bg-[color:var(--md-surface-2)]',
                        tint.accent,
                    )} aria-hidden="true">
                        {icon}
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2 mt-2">
                {loading ? (
                    <div className="skeleton h-8 w-24" aria-label="Loading KPI" />
                ) : (
                    <div className={cn(t.kpi, 'font-mono tabular-nums leading-none')}>
                        {display}
                    </div>
                )}
            </div>

            {/* Target / trend / benchmark line */}
            <div className="mt-2 flex items-center justify-between gap-2">
                <Trend value={trend} label={trendLabel} />
                {target != null && (
                    <span className={cn(t.eyebrow, 'flex items-center gap-1')}>
                        <span className="opacity-60">เป้า</span>
                        <span className="font-mono tabular-nums">{format(target, fmtKind)}</span>
                        {targetLabel && <span className="opacity-60">{targetLabel}</span>}
                    </span>
                )}
            </div>

            {/* Optional AI hint */}
            {aiHint && (
                <div className={cn(
                    'mt-3 flex items-start gap-2 rounded-lg p-2',
                    'bg-ai-500/5 ring-1 ring-ai-500/15',
                )}>
                    <span aria-hidden="true" className="text-ai-600 text-sm mt-0.5">✨</span>
                    <p className="text-fs-2xs text-[color:var(--md-text-secondary)] leading-snug">
                        {aiHint}
                    </p>
                </div>
            )}
        </article>
    );
}
