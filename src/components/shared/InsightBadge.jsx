// ============================================================
// InsightBadge — small AI-narrative indicator with priority + source
// ============================================================
import React from 'react';
import { cn } from '../../theme/compose.js';

const PRIORITY = {
    HIGH:   { bg: 'bg-danger-500/10',  text: 'text-danger-700',  ring: 'ring-danger-500/20',  icon: '⚠️' },
    MEDIUM: { bg: 'bg-warning-500/10', text: 'text-warning-700', ring: 'ring-warning-500/20', icon: '📌' },
    LOW:    { bg: 'bg-accent-500/10',  text: 'text-accent-700',  ring: 'ring-accent-500/20',  icon: '✓'  },
    INFO:   { bg: 'bg-info-500/10',    text: 'text-info-700',    ring: 'ring-info-500/20',    icon: 'ℹ️' },
};

/**
 * <InsightBadge priority="HIGH" source="claude">
 *   ข้อความสรุป
 * </InsightBadge>
 */
export default function InsightBadge({ priority = 'INFO', source, children, className }) {
    const p = PRIORITY[priority] || PRIORITY.INFO;
    return (
        <div className={cn(
            'inline-flex items-start gap-2 rounded-lg px-2.5 py-1.5 ring-1',
            p.bg, p.text, p.ring,
            className,
        )}>
            <span aria-hidden="true" className="shrink-0 text-sm leading-tight mt-px">{p.icon}</span>
            <div className="min-w-0 flex-1">
                <div className="text-fs-2xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1">
                    <span>{priority}</span>
                    {source && (
                        <>
                            <span aria-hidden="true" className="opacity-40">•</span>
                            <span className="font-mono normal-case">{source}</span>
                        </>
                    )}
                </div>
                <div className="text-fs-xs leading-snug mt-0.5">{children}</div>
            </div>
        </div>
    );
}
