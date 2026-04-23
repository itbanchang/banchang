// ============================================================
// SectionCard — the canonical surface for a dashboard section
// Wraps content in a titled card. Optional toolbar for actions.
// ============================================================
import React from 'react';
import { cn, cardBase, cardPad, t } from '../../theme/compose.js';

/**
 * <SectionCard
 *   title="รายได้ 30 วัน"
 *   subtitle="YoY comparison"
 *   icon="💰"
 *   toolbar={<button>ส่งออก</button>}
 *   accent="primary"
 * >
 *   children
 * </SectionCard>
 */
const ACCENT_BAR = {
    primary: 'bg-primary-600',
    accent:  'bg-accent-500',
    warning: 'bg-warning-500',
    danger:  'bg-danger-500',
    info:    'bg-info-500',
    ai:      'bg-ai-500',
    none:    null,
};

export default function SectionCard({
    title, subtitle, icon, toolbar, children, className, accent = 'none', padded = true, interactive = false,
}) {
    const bar = ACCENT_BAR[accent];
    return (
        <section className={cn(
            cardBase,
            padded && cardPad,
            interactive && 'hover:shadow-elev-lg hover:-translate-y-0.5 cursor-pointer',
            'relative overflow-hidden',
            className,
        )}>
            {bar && <span className={cn('absolute left-0 top-0 h-full w-1', bar)} aria-hidden="true" />}
            {(title || toolbar) && (
                <header className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                        <h3 className={cn(t.sectionTitle, 'flex items-center gap-2 min-w-0')}>
                            {icon && <span aria-hidden="true" className="text-fs-xl">{icon}</span>}
                            <span className="truncate">{title}</span>
                        </h3>
                        {subtitle && <p className={cn(t.bodyDim, 'mt-0.5 truncate')}>{subtitle}</p>}
                    </div>
                    {toolbar && <div className="shrink-0">{toolbar}</div>}
                </header>
            )}
            <div>{children}</div>
        </section>
    );
}
