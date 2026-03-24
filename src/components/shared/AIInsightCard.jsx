// ============================================================
// AIInsightCard — Reusable AI Insight Display Component
// Professional Premium Design with Gradient + Icons
// ============================================================
import React from 'react';

const AIInsightCard = ({
  title,
  icon = '🧠',
  priority = 'MEDIUM', // HIGH, MEDIUM, LOW
  summary,
  analysis,
  recommendation,
  confidence = 95,
  lastUpdated = '2m ago',
  actionButtons = [],
  gradient = '#7c3aed',
  gradientFrom = 'rgba(139,92,246,.08)',
  gradientTo = 'rgba(99,102,241,.04)',
  borderColor = 'rgba(139,92,246,.25)',
}) => {
  // Color mapping for priority
  const priorityConfig = {
    HIGH: { bg: 'rgba(244,63,94,.08)', text: '#f43f5e', label: '⚠️ HIGH' },
    MEDIUM: { bg: 'rgba(245,158,11,.08)', text: '#f59e0b', label: '📌 MEDIUM' },
    LOW: { bg: 'rgba(16,185,129,.08)', text: '#10b981', label: '✓ LOW' },
  };

  const prConfig = priorityConfig[priority] || priorityConfig.MEDIUM;

  return (
    <div
      className="glass-card"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `1.5px solid ${borderColor}`,
        borderLeft: `4px solid ${gradient}`,
        padding: '1.25rem',
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header with Priority Badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <span style={{ fontSize: '22px' }}>{icon}</span>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: 800,
                color: 'var(--md-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--md-text-secondary)',
              }}
            >
              AI-Powered Intelligence
            </p>
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px',
            background: prConfig.bg,
            color: prConfig.text,
            whiteSpace: 'nowrap',
          }}
        >
          {prConfig.label}
        </span>
      </div>

      {/* Summary - Bold & Clear */}
      <p
        style={{
          margin: '8px 0',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--md-text-primary)',
          lineHeight: 1.5,
        }}
      >
        {summary}
      </p>

      {/* Analysis - Secondary text */}
      <p
        style={{
          margin: '8px 0',
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--md-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        {analysis}
      </p>

      {/* Recommendation - Highlighted */}
      <div
        style={{
          margin: '10px 0',
          padding: '10px',
          borderRadius: '8px',
          background: `${gradient}15`,
          borderLeft: `3px solid ${gradient}`,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--md-text-primary)',
            lineHeight: 1.5,
          }}
        >
          💡 <strong>Recommended Action:</strong> {recommendation}
        </p>
      </div>

      {/* Footer: Confidence + Timestamp */}
      <div
        style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255,255,255,.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          color: 'var(--md-text-tertiary)',
          fontWeight: 500,
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>📊 Confidence: {confidence}%</span>
          <span>🕐 Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Action Buttons */}
      {actionButtons.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          {actionButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              style={{
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                background: btn.primary ? gradient : 'rgba(255,255,255,.1)',
                color: btn.primary ? '#fff' : 'var(--md-text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(AIInsightCard);
