// ============================================================
// AIServerInsights — V1-compatible stub
// Renders server-produced AI narrative sections without V2 design-system deps.
// ============================================================
import React from 'react';

export default function AIServerInsights({ data, title = 'AI Intelligence' }) {
    if (!data) return null;

    const sections = Array.isArray(data?.sections)
        ? data.sections
        : buildLegacy(data);

    if (!sections.length) return null;

    return (
        <div
            className="rounded-lg my-3"
            style={{
                background: 'var(--md-surface)',
                border: '1px solid var(--md-border)',
                boxShadow: 'var(--md-shadow-sm)',
                padding: '1rem 1.25rem',
            }}
        >
            <h3
                style={{
                    margin: 0,
                    marginBottom: '0.75rem',
                    fontSize: 'var(--fs-md)',
                    fontWeight: 700,
                    color: 'var(--md-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span aria-hidden="true">✨</span>
                {title}
            </h3>
            <div className="space-y-2">
                {sections.map((s, i) => (
                    <div key={i}>
                        {s.title && (
                            <div
                                style={{
                                    fontSize: 'var(--fs-xs)',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: 'var(--md-text-tertiary)',
                                    marginBottom: 4,
                                }}
                            >
                                {s.title}
                            </div>
                        )}
                        <p
                            style={{
                                margin: 0,
                                fontSize: 'var(--fs-sm)',
                                color: 'var(--md-text-primary)',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {s.body || s.text || ''}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function buildLegacy(data) {
    const out = [];
    if (data.narrative) out.push({ title: 'สรุป', body: data.narrative });
    if (data.analysis) out.push({ title: 'การวิเคราะห์', body: data.analysis });
    if (data.recommendation) out.push({ title: 'คำแนะนำ', body: data.recommendation });
    if (Array.isArray(data.actions)) {
        for (const a of data.actions) {
            out.push({ title: a.label || a.title, body: a.reason || a.detail || '' });
        }
    }
    return out;
}
