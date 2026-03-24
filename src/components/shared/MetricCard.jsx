// ============================================================
// MetricCard — Individual Metric Display Component
// Shows value, target, trend, and status
// ============================================================
import React from 'react';

const statusConfig = {
  normal: { color: '#7c3aed', bg: 'rgba(124,58,237,.1)' },
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,.1)' },
  critical: { color: '#f43f5e', bg: 'rgba(244,63,94,.1)' },
  success: { color: '#10b981', bg: 'rgba(16,185,129,.1)' },
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const labelStyle = {
  margin: 0,
  fontSize: '11px',
  fontWeight: 700,
  color: 'var(--md-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const valueRowStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '6px',
  marginBottom: '8px',
};

const unitStyle = { fontSize: '12px', color: 'var(--md-text-secondary)', fontWeight: 600 };

const targetWrapStyle = { marginTop: '8px' };

const targetLabelStyle = {
  fontSize: '10px',
  color: 'var(--md-text-tertiary)',
  marginBottom: '4px',
};

const progressTrackStyle = {
  height: '4px',
  borderRadius: '99px',
  background: 'rgba(255,255,255,.1)',
  overflow: 'hidden',
};

const MetricCard = ({
  label,
  value,
  unit = '',
  target,
  trend, // percentage change +/- (null = don't show)
  status = 'normal', // normal, warning, critical, success
  icon = '📊',
  gradient = '#7c3aed',
}) => {
  const sc = statusConfig[status] || statusConfig.normal;
  // Only show trend when it's a real finite number
  const hasTrend = trend != null && Number.isFinite(Number(trend));
  const trendNum = hasTrend ? Number(trend) : 0;
  const trendColor = trendNum > 0 ? '#10b981' : trendNum < 0 ? '#f43f5e' : '#94a3b8';
  const trendIcon = trendNum > 0 ? '↑' : trendNum < 0 ? '↓' : '→';

  // Parse numeric value for progress bar (handle string values like "—")
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  const hasNumValue = Number.isFinite(numValue);

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${sc.bg}, transparent)`,
        border: `1px solid ${sc.color}30`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header */}
      <div style={headerStyle}>
        <p style={labelStyle}>
          {icon} {label}
        </p>
        {hasTrend && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: trendColor,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {trendIcon} {trendNum > 0 ? '+' : ''}{trendNum}%
          </span>
        )}
      </div>

      {/* Value */}
      <div style={valueRowStyle}>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: sc.color,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={unitStyle}>
            {unit}
          </span>
        )}
      </div>

      {/* Target Progress */}
      {target != null && hasNumValue && (
        <div style={targetWrapStyle}>
          <div style={targetLabelStyle}>
            Target: {target}{unit}
          </div>
          <div style={progressTrackStyle}>
            <div
              style={{
                height: '100%',
                borderRadius: '99px',
                background: `linear-gradient(90deg, ${sc.color}, ${sc.color}dd)`,
                width: `${Math.min(Math.max((numValue / target) * 100, 0), 100)}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MetricCard);
