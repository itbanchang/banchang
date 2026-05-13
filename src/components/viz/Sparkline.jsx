// ============================================================
// Sparkline — Inline 30-day mini chart for KPI cards
// Phase H Tier 3.3 — Storytelling & Progressive Disclosure
//
// Tiny SVG line/bar for inline trends under KPI cards.
// No axis, no labels — pure shape.
// ============================================================
import React from 'react';

/**
 * @param {number[]} values - data points (most recent last)
 * @param {string} color - stroke/fill color
 * @param {'line'|'bar'} type
 * @param {number} width, height - SVG canvas
 * @param {boolean} showLastDot - emphasize the latest value
 */
export default function Sparkline({
  values = [],
  color = '#3b82f6',
  type = 'line',
  width = 80,
  height = 24,
  showLastDot = true,
  title,
}) {
  if (values.length === 0) {
    return (
      <span style={{ display: 'inline-block', width, height,
        background: 'var(--md-border)', borderRadius: '2px', opacity: 0.2 }} />
    );
  }

  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const stepX = values.length > 1 ? width / (values.length - 1) : 0;
  const padY = 2;
  const usableH = height - padY * 2;

  const points = values.map((v, i) => {
    const x = values.length === 1 ? width / 2 : i * stepX;
    const y = padY + usableH - ((v - min) / range) * usableH;
    return { x, y, v };
  });

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${path} L${(width).toFixed(1)},${height} L0,${height} Z`;
  const lastPoint = points[points.length - 1];

  if (type === 'bar') {
    const barWidth = Math.max(1, (width / values.length) * 0.7);
    const barGap = (width / values.length) - barWidth;
    return (
      <svg width={width} height={height} role="img" aria-label={title || 'trend chart'}>
        {values.map((v, i) => {
          const barHeight = ((v - min) / range) * usableH;
          const x = i * (barWidth + barGap);
          const y = padY + usableH - barHeight;
          return (
            <rect key={i} x={x} y={y} width={barWidth} height={Math.max(1, barHeight)}
              fill={color} opacity={i === values.length - 1 ? 1 : 0.7}
              rx={1} />
          );
        })}
      </svg>
    );
  }

  return (
    <svg width={width} height={height} role="img" aria-label={title || 'trend chart'}>
      {/* Area fill */}
      <path d={areaPath} fill={color} fillOpacity={0.12} />
      {/* Line */}
      <path d={path} stroke={color} strokeWidth={1.5} fill="none"
        strokeLinejoin="round" strokeLinecap="round" />
      {/* Last-point dot */}
      {showLastDot && lastPoint && (
        <circle cx={lastPoint.x} cy={lastPoint.y} r={2} fill={color} />
      )}
    </svg>
  );
}
