// ============================================================
// AIServerInsights — bridge to the new design system
// Renders server-rendered AI markdown sections. Drops onto any tab
// that was passing the `{data, theme, title}` shape from the legacy
// AIServerInsights component.
// ============================================================
import React from 'react';
import SectionCard from './SectionCard.jsx';
import InsightBadge from './InsightBadge.jsx';
import { cn, t } from '../../theme/compose.js';

/**
 * @param {object} props
 * @param {object} props.data    — { sections: [{title, body, priority, source}] } or legacy { narrative, actions }
 * @param {string} props.theme   — 'finance'|'clinical'|'customer'|'lab'|'quality'|'thaimed'...
 * @param {string} props.title   — section header (Thai)
 * @param {string} [props.className]
 */
export default function AIServerInsights({ data, theme, title = 'AI Intelligence', className }) {
    if (!data) return null;

    // Accept either the new `sections[]` shape or legacy `{narrative, actions}` contract.
    const sections = Array.isArray(data?.sections)
        ? data.sections
        : buildSectionsFromLegacy(data);

    if (!sections.length) return null;

    return (
        <SectionCard
            title={title}
            subtitle={theme ? `${theme} — Claude + rule-based` : undefined}
            icon="✨"
            accent="ai"
            className={className}
        >
            <div className="space-y-3">
                {sections.map((s, i) => (
                    <div key={i} className="space-y-1.5">
                        {s.title && (
                            <h4 className={cn('text-fs-sm font-bold text-[color:var(--md-text-primary)]')}>
                                {s.title}
                            </h4>
                        )}
                        {s.priority ? (
                            <InsightBadge priority={s.priority} source={s.source || 'claude'}>
                                {s.body || s.text || ''}
                            </InsightBadge>
                        ) : (
                            <p className={cn(t.body, 'leading-snug whitespace-pre-line')}>
                                {s.body || s.text || ''}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

function buildSectionsFromLegacy(data) {
    const sections = [];
    if (data.narrative) sections.push({ title: 'สรุป', body: data.narrative });
    if (data.analysis) sections.push({ title: 'การวิเคราะห์', body: data.analysis });
    if (data.recommendation) {
        sections.push({
            title: 'คำแนะนำ',
            body: data.recommendation,
            priority: data.priority || 'MEDIUM',
            source: data.source || 'claude',
        });
    }
    if (Array.isArray(data.actions) && data.actions.length) {
        for (const a of data.actions) {
            sections.push({
                title: a.label || a.title,
                body: a.reason || a.detail || '',
                priority: a.urgency === 'critical' ? 'HIGH' : a.urgency === 'high' ? 'HIGH' : a.urgency === 'medium' ? 'MEDIUM' : 'LOW',
                source: data.source || 'rule-based',
            });
        }
    }
    return sections;
}
