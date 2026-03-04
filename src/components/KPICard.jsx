// ============================================================
// BCH 360° Intelligence V.10 — KPI Card
// Material Dashboard 3 PRO — พร้อม Trend Indicator
// ============================================================
import React from 'react';

const colorMap = {
    blue: { accent: '#7c3aed', gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)', bg: 'rgba(124,58,237,.07)' },
    green: { accent: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)', bg: 'rgba(16,185,129,.07)' },
    red: { accent: '#f43f5e', gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)', bg: 'rgba(244,63,94,.07)' },
    yellow: { accent: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', bg: 'rgba(245,158,11,.07)' },
    purple: { accent: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', bg: 'rgba(139,92,246,.07)' },
    teal: { accent: '#0ea5e9', gradient: 'linear-gradient(135deg,#0ea5e9,#0284c7)', bg: 'rgba(14,165,233,.07)' },
};

/** แสดงลูกศร + ข้อความภาษาไทย สำหรับ trend */
function TrendBadge({ trend, trendLabel }) {
    if (trend == null) return null;
    const isUp = trend > 0;
    const isDown = trend < 0;
    const isFlat = trend === 0;

    const color = isUp ? '#10b981'
        : isDown ? '#f43f5e'
            : '#94a3b8';

    const arrow = isUp ? '▲'
        : isDown ? '▼'
            : '→';

    const label = trendLabel || (isUp ? 'เพิ่มขึ้น' : isDown ? 'ลดลง' : 'คงที่');

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            marginTop: '3px',
            padding: '2px 7px',
            borderRadius: '999px',
            background: `${color}12`,
            border: `1px solid ${color}25`,
        }}>
            <span style={{ color, fontSize: '8px', lineHeight: 1, fontWeight: 900 }}>{arrow}</span>
            <span style={{ color, fontSize: 'var(--fs-2xs)', fontWeight: 700, lineHeight: 1 }}>
                {Math.abs(trend)}%
            </span>
            <span style={{ color: '#9ca3af', fontSize: 'var(--fs-2xs)', fontWeight: 500, lineHeight: 1 }}>
                {label}
            </span>
        </div>
    );
}

export default function KPICard({
    title, value, subtitle, icon, color = 'blue',
    trend, trendLabel, format = 'number', loading
}) {
    const c = colorMap[color] || colorMap.blue;

    const formatValue = (val) => {
        if (val == null) return '—';
        if (typeof val === 'string') return val;
        if (format === 'currency') {
            const n = Number(val);
            if (n >= 1e6) return `฿${(n / 1e6).toFixed(1)}M`;
            if (n >= 1e3) return `฿${(n / 1e3).toFixed(0)}K`;
            return `฿${n.toLocaleString()}`;
        }
        if (format === 'percent') return `${val}%`;
        if (format === 'number') return Number(val).toLocaleString();
        return val;
    };

    /* ---- Skeleton ---- */
    if (loading) {
        return (
            <div className="glass-card" style={{ padding: '0.875rem', minHeight: '88px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', gap: '0.75rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div className="skeleton" style={{ height: '8px', width: '64px' }} />
                        <div className="skeleton" style={{ height: '22px', width: '96px' }} />
                        <div className="skeleton" style={{ height: '16px', width: '72px', borderRadius: '999px' }} />
                    </div>
                    <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0 }} />
                </div>
            </div>
        );
    }

    return (
        <div
            className="ai-glow-card group cursor-default"
            style={{ padding: '0.875rem 1rem', minHeight: '88px' }}
        >
            {/* Hover tint */}
            <div
                style={{
                    position: 'absolute', inset: 0,
                    borderRadius: 'inherit',
                    background: c.bg,
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    pointerEvents: 'none',
                }}
                className="group-hover:opacity-100"
            />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', height: '100%' }}>
                {/* Text block */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    {/* Label */}
                    <p style={{
                        fontSize: 'var(--fs-2xs)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--md-text-tertiary)',
                        marginBottom: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {title}
                    </p>

                    {/* Value */}
                    <p style={{
                        fontSize: 'var(--fs-2xl)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        color: 'var(--md-text-primary)',
                        marginBottom: '2px',
                    }}>
                        {formatValue(value)}
                    </p>

                    {/* Subtitle (optional) */}
                    {subtitle && (
                        <p style={{
                            fontSize: 'var(--fs-2xs)',
                            color: 'var(--md-text-tertiary)',
                            fontWeight: 500,
                            marginBottom: '2px',
                        }}>
                            {subtitle}
                        </p>
                    )}

                    {/* Trend badge */}
                    <TrendBadge trend={trend} trendLabel={trendLabel} />
                </div>

                {/* Icon */}
                {icon && (
                    <div
                        style={{
                            width: '42px', height: '42px',
                            borderRadius: '12px',
                            background: c.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: `0 4px 12px ${c.accent}30`,
                            transition: 'transform 0.2s ease',
                        }}
                        className="group-hover:scale-110"
                    >
                        <span style={{ fontSize: '1.125rem', lineHeight: 1 }}>{icon}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
