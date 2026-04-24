// ============================================================
// StatChip — small semantic status pill
// ============================================================
import React from 'react';
import { cn, chipByStatus } from '../../theme/compose.js';

/**
 * <StatChip status="good|warning|danger|info|ai|unknown" icon="✓">
 *   label
 * </StatChip>
 */
export default function StatChip({ status = 'info', icon, children, className }) {
    return (
        <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-fs-2xs font-bold tracking-wide uppercase',
            chipByStatus[status] || chipByStatus.info,
            className,
        )}>
            {icon && <span aria-hidden="true" className="text-[10px]">{icon}</span>}
            <span>{children}</span>
        </span>
    );
}
