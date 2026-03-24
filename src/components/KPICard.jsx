// ============================================================
// BCH 360° Intelligence V.10 — Ultra Premium KPI Card
// Dynamic Glassmorphism & AI Hover Micro-animations
// ============================================================
import React from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';

const colorMap = {
    blue: { accent: '#7c3aed', gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)', bg: 'rgba(124,58,237,.07)', shadow: 'rgba(124,58,237,.35)' },
    green: { accent: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)', bg: 'rgba(16,185,129,.07)', shadow: 'rgba(16,185,129,.35)' },
    red: { accent: '#f43f5e', gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)', bg: 'rgba(244,63,94,.07)', shadow: 'rgba(244,63,94,.35)' },
    yellow: { accent: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', bg: 'rgba(245,158,11,.07)', shadow: 'rgba(245,158,11,.35)' },
    purple: { accent: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', bg: 'rgba(139,92,246,.07)', shadow: 'rgba(139,92,246,.35)' },
    teal: { accent: '#0ea5e9', gradient: 'linear-gradient(135deg,#0ea5e9,#0284c7)', bg: 'rgba(14,165,233,.07)', shadow: 'rgba(14,165,233,.35)' },
};

const TrendBadge = React.memo(function TrendBadge({ trend, trendLabel }) {
    if (trend == null) return null;
    const isUp = trend > 0;
    const isDown = trend < 0;

    const color = isUp ? '#10b981' : isDown ? '#f43f5e' : '#94a3b8';
    const arrow = isUp ? '▲' : isDown ? '▼' : '→';
    const label = trendLabel || (isUp ? 'เพิ่มขึ้น' : isDown ? 'ลดลง' : 'คงที่');

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
            padding: '4px 10px',
            borderRadius: '999px',
            background: `linear-gradient(135deg, ${color}12, ${color}22)`,
            border: `1px solid ${color}40`,
            boxShadow: `0 2px 8px ${color}15`,
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease'
        }} className="hover:scale-105">
            <span style={{ color, fontSize: '11px', lineHeight: 1, fontWeight: 900 }}>{arrow}</span>
            <span style={{ color, fontSize: 'var(--fs-xs)', fontWeight: 800, lineHeight: 1 }}>
                {Math.abs(trend)}%
            </span>
            <span style={{ color: '#9ca3af', fontSize: 'var(--fs-xs)', fontWeight: 600, lineHeight: 1 }}>
                {label}
            </span>
        </div>
    );
});

function KPICard({
    title, value, subtitle, icon, color = 'blue',
    trend, trendLabel, format = 'number', loading,
    drillDownId, drillDownTitle, drillDownEndpoint
}) {
    const { openDrillDown } = useDashboard();
    const c = colorMap[color] || colorMap.blue;
    const isClickable = !!drillDownId;

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

    const handleClick = () => {
        if (isClickable) {
            openDrillDown(drillDownId, drillDownTitle || title, drillDownEndpoint);
        }
    };

    if (loading) {
        return (
            <div className="glass-card animate-pulse" style={{ padding: '1rem', minHeight: '100px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', gap: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div className="skeleton bg-gray-200 dark:bg-gray-700" style={{ height: '10px', width: '80px', borderRadius: '4px' }} />
                        <div className="skeleton bg-gray-200 dark:bg-gray-700" style={{ height: '28px', width: '120px', borderRadius: '6px' }} />
                        <div className="skeleton bg-gray-200 dark:bg-gray-700" style={{ height: '18px', width: '90px', borderRadius: '999px' }} />
                    </div>
                    <div className="skeleton bg-gray-200 dark:bg-gray-700" style={{ width: '48px', height: '48px', borderRadius: '16px', flexShrink: 0 }} />
                </div>
            </div>
        );
    }

    return (
        <div
            className={`group ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
            style={{
                padding: '1.25rem 1.5rem',
                minHeight: '110px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                borderRadius: '20px',
                background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`,
                border: `1px solid ${c.accent}30`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.1)`,
                backdropFilter: 'blur(16px)',
                overflow: 'hidden'
            }}
            onClick={handleClick}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 15px 40px ${c.accent}40`;
                e.currentTarget.style.borderColor = `${c.accent}80`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.1)`;
                e.currentTarget.style.borderColor = `${c.accent}30`;
            }}
        >
            {/* Dynamic Hover Glow */}
            <div
                style={{
                    position: 'absolute', top: '-50%', left: '-50%',
                    width: '200%', height: '200%',
                    background: `radial-gradient(circle, ${c.accent}15 0%, transparent 60%)`,
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    pointerEvents: 'none',
                    transform: 'scale(0.8)',
                }}
                className="group-hover:opacity-100 group-hover:animate-spin-slow"
            />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', height: '100%' }}>
                {/* Text Block */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <p style={{
                            fontSize: 'var(--fs-xs)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: 'var(--md-text-tertiary)',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {title}
                        </p>
                        {isClickable && (
                            <span style={{ fontSize: '12px', opacity: 0, transform: 'translateX(-10px)', transition: 'all 0.3s ease' }} className="group-hover:opacity-100 group-hover:transform-none">
                                ↗
                            </span>
                        )}
                    </div>

                    <p style={{
                        fontSize: '32px',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        background: c.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '6px',
                        display: 'inline-block'
                    }}>
                        {formatValue(value)}
                    </p>

                    {subtitle && (
                        <p style={{
                            fontSize: 'var(--fs-2xs)',
                            color: 'var(--md-text-secondary)',
                            fontWeight: 600,
                            marginBottom: '4px',
                            opacity: 0.8
                        }}>
                            {subtitle}
                        </p>
                    )}

                    <TrendBadge trend={trend} trendLabel={trendLabel} />
                </div>

                {/* Intelligent Icon Container */}
                {icon && (
                    <div
                        style={{
                            width: '56px', height: '56px',
                            borderRadius: '16px',
                            background: c.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: `0 8px 20px ${c.accent}50`,
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            border: `2px solid rgba(255,255,255,0.2)`
                        }}
                        className="group-hover:scale-110 group-hover:rotate-6"
                    >
                        <span style={{ fontSize: '1.5rem', lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{icon}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(KPICard);
