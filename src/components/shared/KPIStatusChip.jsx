// ============================================================
// KPIStatusChip — Canonical Pass/Warn/Fail indicator
// Sprint 1 Task 2.3 — WCAG AA triple-cue (emoji + text + color)
//
// Use this anywhere you'd otherwise write `<span color="red">⚠</span>`.
//
// Triple-cue guarantee:
//   1. Emoji prefix (visual / screen reader can announce)
//   2. Plain Thai label ("ผ่าน" / "เฝ้าระวัง" / "ไม่ผ่าน")
//   3. Color (semantic — green / amber / red)
//   4. ARIA role + label for assistive tech
// ============================================================
import React from 'react';

const STATUS = {
  pass:    { bg: 'rgba(16,185,129,.12)',  fg: '#059669', icon: '✅', label: 'ผ่าน',         aria: 'ผ่านเกณฑ์' },
  warn:    { bg: 'rgba(245,158,11,.15)',  fg: '#b45309', icon: '⚠️', label: 'เฝ้าระวัง',   aria: 'เฝ้าระวัง — ใกล้เกณฑ์' },
  fail:    { bg: 'rgba(239,68,68,.12)',   fg: '#dc2626', icon: '🔴', label: 'ไม่ผ่าน',      aria: 'ไม่ผ่านเกณฑ์' },
  monitor: { bg: 'rgba(59,130,246,.12)',  fg: '#1d4ed8', icon: '👁️', label: 'เฝ้าดู',        aria: 'เฝ้าดูเชิงข้อมูล (ไม่มีเกณฑ์)' },
  nodata:  { bg: 'rgba(100,116,139,.12)', fg: '#475569', icon: '—',  label: 'ไม่มีข้อมูล', aria: 'ไม่มีข้อมูล' },
};

const SIZE = {
  sm: { font: '11px', pad: '2px 8px' },
  md: { font: '12px', pad: '4px 10px' },
  lg: { font: '14px', pad: '6px 14px' },
};

const KPIStatusChip = ({
  status = 'monitor', // 'pass' | 'warn' | 'fail' | 'monitor' | 'nodata'
  size = 'sm',
  text,                // optional override label
  showIcon = true,
  title,               // tooltip text on hover
}) => {
  const s = STATUS[status] || STATUS.monitor;
  const sz = SIZE[size] || SIZE.sm;
  return (
    <span
      role="status"
      aria-label={`${s.aria}${text ? ': ' + text : ''}`}
      title={title || s.aria}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: sz.font,
        fontWeight: 700,
        padding: sz.pad,
        borderRadius: '99px',
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.fg}33`,
        whiteSpace: 'nowrap',
      }}
    >
      {showIcon && <span aria-hidden="true">{s.icon}</span>}
      <span>{text || s.label}</span>
    </span>
  );
};

/**
 * Map a numeric value + threshold to a status code.
 * @param {number} value - actual value
 * @param {number} target - benchmark
 * @param {boolean} lowerBetter - true if lower value = better (mortality, LWBS)
 * @param {number} warnFactor - multiplier for warning zone (default 1.5 / 0.7)
 */
export const computeStatus = (value, target, lowerBetter = true, warnFactor) => {
  if (value == null || !Number.isFinite(Number(value))) return 'nodata';
  if (target == null) return 'monitor';
  const v = Number(value), t = Number(target);
  if (lowerBetter) {
    const wf = warnFactor ?? 1.5;
    if (v <= t) return 'pass';
    if (v <= t * wf) return 'warn';
    return 'fail';
  } else {
    const wf = warnFactor ?? 0.7;
    if (v >= t) return 'pass';
    if (v >= t * wf) return 'warn';
    return 'fail';
  }
};

export default React.memo(KPIStatusChip);
