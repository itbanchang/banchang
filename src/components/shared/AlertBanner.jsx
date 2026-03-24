// ============================================================
// AlertBanner — Professional Alert/Warning Banner
// For critical alerts, surge warnings, etc.
// ============================================================
import React from 'react';

const AlertBanner = ({
  severity = 'warning', // critical, warning, info, success
  title,
  message,
  icon = '🚨',
  actions = [], // { label, onClick, primary? }
  onDismiss,
}) => {
  const severityConfig = {
    critical: {
      bg: 'linear-gradient(135deg, rgba(244,63,94,.15), rgba(239,68,68,.1))',
      border: '#f43f5e',
      text: '#f43f5e',
      light: 'rgba(244,63,94,.08)',
    },
    warning: {
      bg: 'linear-gradient(135deg, rgba(245,158,11,.15), rgba(251,146,60,.1))',
      border: '#f59e0b',
      text: '#f59e0b',
      light: 'rgba(245,158,11,.08)',
    },
    info: {
      bg: 'linear-gradient(135deg, rgba(59,130,246,.15), rgba(96,165,250,.1))',
      border: '#3b82f6',
      text: '#3b82f6',
      light: 'rgba(59,130,246,.08)',
    },
    success: {
      bg: 'linear-gradient(135deg, rgba(16,185,129,.15), rgba(34,197,94,.1))',
      border: '#10b981',
      text: '#10b981',
      light: 'rgba(16,185,129,.08)',
    },
  };

  const config = severityConfig[severity] || severityConfig.warning;

  return (
    <div
      style={{
        background: config.bg,
        border: `1.5px solid ${config.border}`,
        borderLeft: `4px solid ${config.border}`,
        borderRadius: '12px',
        padding: '1.25rem',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Content */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {/* Icon */}
        <div style={{ fontSize: '24px', flexShrink: 0 }}>{icon}</div>

        {/* Text Content */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 800,
              color: config.text,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: 'var(--md-text-primary)',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: 'var(--md-text-tertiary)',
              padding: '4px',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Action Buttons */}
      {actions.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              style={{
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 700,
                border: action.primary ? 'none' : `1px solid ${config.border}`,
                borderRadius: '6px',
                background: action.primary ? config.border : config.light,
                color: action.primary ? '#fff' : config.text,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 4px 12px ${config.border}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertBanner;
