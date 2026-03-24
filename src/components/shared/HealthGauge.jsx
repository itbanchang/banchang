// ============================================================
// HealthGauge — Circular Score Visualization
// Shows score out of 100 with animated fill
// ============================================================
import React, { useMemo } from 'react';

const sizeConfig = {
  sm: { outer: 100, inner: 80, fontSize: 24 },
  md: { outer: 140, inner: 110, fontSize: 32 },
  lg: { outer: 180, inner: 140, fontSize: 40 },
};

const HealthGauge = ({
  score = 75,
  max = 100,
  label = 'Health Score',
  icon = '🏥',
  color = '#7c3aed',
  size = 'md', // sm, md, lg
  showSegments = false, // Show separate segments
  segments = [], // { label, value, color }
}) => {
  const sizeSettings = sizeConfig[size] || sizeConfig.md;

  const { radius, circumference, offset, scoreColor } = useMemo(() => {
    const r = sizeSettings.outer / 2;
    const circ = 2 * Math.PI * (r - 15);
    const fillPct = (score / max) * 100;
    const off = circ - (fillPct / 100) * circ;
    const sc = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e';
    return { radius: r, circumference: circ, offset: off, scoreColor: sc };
  }, [score, max, sizeSettings.outer]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {/* Circular Gauge */}
      <div style={{ position: 'relative', width: sizeSettings.outer, height: sizeSettings.outer }}>
        <svg
          width={sizeSettings.outer}
          height={sizeSettings.outer}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx={radius}
            cy={radius}
            r={radius - 15}
            fill="none"
            stroke="rgba(255,255,255,.1)"
            strokeWidth="10"
          />

          {/* Progress circle */}
          <circle
            cx={radius}
            cy={radius}
            r={radius - 15}
            fill="none"
            stroke={scoreColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s ease',
              filter: `drop-shadow(0 0 8px ${scoreColor}40)`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
          <div
            style={{
              fontSize: sizeSettings.fontSize,
              fontWeight: 900,
              color: scoreColor,
              lineHeight: 1,
            }}
          >
            {Math.round(score)}
          </div>
          <div
            style={{
              fontSize: '10px',
              color: 'var(--md-text-secondary)',
              fontWeight: 600,
              marginTop: '4px',
            }}
          >
            / {max}
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            fontWeight: 800,
            color: 'var(--md-text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: '11px',
            color: scoreColor,
            fontWeight: 700,
          }}
        >
          {score >= 80 ? '✅ Excellent' : score >= 60 ? '⚠️ Caution' : '🔴 Critical'}
        </p>
      </div>

      {/* Segments (optional) */}
      {showSegments && segments.length > 0 && (
        <div style={{ width: '100%' }}>
          {segments.map((seg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px',
                fontSize: '11px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: seg.color,
                }}
              />
              <span style={{ flex: 1, color: 'var(--md-text-secondary)' }}>{seg.label}</span>
              <span style={{ fontWeight: 700, color: 'var(--md-text-primary)' }}>
                {seg.value}/100
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(HealthGauge);
