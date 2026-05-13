// ============================================================
// BCHTooltip — Standardized Recharts Tooltip
// Sprint 1 Task 2.7
//
// Why custom:
//   - Default Recharts tooltip lists ALL series → cognitive overload
//   - We want: top-3 series by value + "+N more" link
//   - Consistent formatting via src/utils/format.js
//   - Color-blind safe (uses square + line glyph, not just color dot)
// ============================================================
import React from 'react';
import { formatPct, formatInt, formatBaht } from '../../utils/format';

const formatByType = (v, type) => {
  if (v == null) return '—';
  switch (type) {
    case 'pct':       return formatPct(v);
    case 'currency':  return formatBaht(v);
    case 'minutes':   return `${Number(v).toFixed(1)} นาที`;
    case 'count':
    case 'number':    return formatInt(v);
    default:          return Number.isFinite(Number(v)) ? Number(v).toLocaleString() : String(v);
  }
};

/**
 * BCHTooltip — drop-in replacement for <Tooltip content={<BCHTooltip />} />
 * Props (passed by Recharts):
 *   active, payload, label
 * Extra props (consumer-provided):
 *   valueType: 'pct' | 'currency' | 'minutes' | 'count' | 'number' (default)
 *   maxSeries: number of series to show before "+N more" (default 3)
 *   showTotal: render Σ row (default false; useful for stacked)
 *   labelPrefix: text before the X-axis label (e.g. "เดือน:")
 */
const BCHTooltip = ({
  active,
  payload = [],
  label,
  valueType = 'number',
  maxSeries = 3,
  showTotal = false,
  labelPrefix = '',
}) => {
  if (!active || !payload || payload.length === 0) return null;

  // Sort by absolute value desc — most impactful series first.
  const sorted = [...payload].sort((a, b) => Math.abs(Number(b.value) || 0) - Math.abs(Number(a.value) || 0));
  const top = sorted.slice(0, maxSeries);
  const rest = sorted.slice(maxSeries);
  const total = sorted.reduce((s, p) => s + (Number(p.value) || 0), 0);

  return (
    <div
      role="tooltip"
      style={{
        background: 'var(--md-surface, #fff)',
        border: '1px solid var(--md-border, rgba(0,0,0,.1))',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,.08)',
        padding: '10px 12px',
        fontSize: '12px',
        color: 'var(--md-text-primary, #111827)',
        minWidth: '180px',
      }}
    >
      {label != null && (
        <div style={{ fontWeight: 700, marginBottom: '6px', borderBottom: '1px solid rgba(0,0,0,.06)', paddingBottom: '4px' }}>
          {labelPrefix}{label}
        </div>
      )}
      {top.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '2px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
            {/* Square swatch + line — dual cue beyond color (Task 2.3 accessibility). */}
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                background: p.color || p.fill || '#94a3b8',
                borderRadius: '2px',
                border: '1px solid rgba(0,0,0,.15)',
              }}
            />
            <span style={{ color: 'var(--md-text-secondary, #475569)' }}>{p.name}</span>
          </div>
          <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {formatByType(p.value, valueType)}
          </span>
        </div>
      ))}
      {rest.length > 0 && (
        <div style={{ marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,.06)', fontSize: '11px', color: 'var(--md-text-tertiary, #64748b)' }}>
          + อีก {rest.length} รายการ
        </div>
      )}
      {showTotal && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,.06)', fontWeight: 800 }}>
          <span>รวม</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatByType(total, valueType)}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(BCHTooltip);
