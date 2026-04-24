// ============================================================
// BCH 360° Intelligence V.10 — Shared Number/Currency Formatters
// Consolidated from 7 tabs that previously defined these locally.
// ============================================================

/** Safe number coercion. Returns `fallback` if value is null/undefined/'' or not a finite number. */
export const nn = (v, fallback = 0) => {
  if (v == null || v === '') return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Thai-locale number with optional decimal precision.
 * fmt(1234.5)       → "1,234"
 * fmt(1234.567, 2)  → "1,234.57"
 * fmt(null)         → "—"
 */
export function fmt(v, d = 0) {
  if (v == null || v === '' || Number.isNaN(Number(v))) return '—';
  return Number(v).toLocaleString('th-TH', { minimumFractionDigits: d, maximumFractionDigits: d });
}

/** Alias for fmt() — kept for backwards compatibility with older imports. */
export const fmtNum = fmt;

/**
 * Percentage with optional decimal precision. Appends '%' suffix.
 * fmtPct(7.2)      → "7.2%"
 * fmtPct(7.257, 2) → "7.26%"
 * fmtPct(null)     → "—"
 */
export function fmtPct(v, d = 1) {
  if (v == null || Number.isNaN(Number(v))) return '—';
  return `${Number(v).toFixed(d)}%`;
}

/**
 * Compact money formatter — auto-scales to K/M/B suffix.
 * fmtMoneyCompact(1234567) → "฿1.23M"
 */
export function fmtMoneyCompact(v, currency = '฿') {
  const n = nn(v);
  if (n === 0) return `${currency}0`;
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${currency}${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${currency}${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${currency}${(n / 1e3).toFixed(1)}K`;
  return `${currency}${fmt(n)}`;
}

/**
 * Growth indicator — signed percentage with arrow.
 * fmtGrowth(5.2)  → "▲ +5.2%"
 * fmtGrowth(-3.1) → "▼ -3.1%"
 * fmtGrowth(0)    → "— 0.0%"
 */
export function fmtGrowth(v, d = 1) {
  if (v == null || Number.isNaN(Number(v))) return '—';
  const n = Number(v);
  const arrow = n > 0 ? '▲ +' : n < 0 ? '▼ ' : '— ';
  return `${arrow}${n.toFixed(d)}%`;
}
