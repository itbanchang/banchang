// ============================================================
// BCH 360° — Centralized Unit Conversions
// ----
// Why this file exists:
//   - HOSxP exposes time in SECONDS (door_to_doctor_second)
//   - UI shows MINUTES — second/minute conversion bugs are easy to introduce
//   - Currency mixes K/M/full baht across screens
//   - Phase G policy: full baht everywhere
//
// Lint policy (added in package.json via no-restricted-syntax):
//   - Raw `/ 60` and `* 60` in /60 contexts → must use helpers here.
//   - Raw `* 1000` for currency → must use helpers here.
// ============================================================

/** Seconds → minutes (1 decimal). Returns null if input is null/undefined. */
export const secondsToMinutes = (s) => {
  if (s == null) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return Math.round((n / 60) * 10) / 10;
};

/** Seconds → hours (1 decimal). */
export const secondsToHours = (s) => {
  if (s == null) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return Math.round((n / 3600) * 10) / 10;
};

/** Minutes → hours (1 decimal). */
export const minutesToHours = (m) => {
  if (m == null) return null;
  const n = Number(m);
  if (!Number.isFinite(n)) return null;
  return Math.round((n / 60) * 10) / 10;
};

/** Format integer with comma separator. Returns '0' for null/NaN. */
export const formatInt = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0';
  return Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 });
};

/** Format percentage (1 decimal, suffix '%'). */
export const formatPct = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0.0%';
  return `${Number(v).toFixed(1)}%`;
};

/**
 * Format currency as full baht (per BCH Phase G policy — no K/M shorthand).
 * Example: 1234567 → "1,234,567 บาท"
 */
export const formatBaht = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0 บาท';
  return `${Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 })} บาท`;
};

/**
 * Format Thai date (BE) — example: 2026-05-13 → "13 พ.ค. 2569"
 */
export const formatThaiDate = (isoDate) => {
  if (!isoDate) return '';
  const d = isoDate instanceof Date ? isoDate : new Date(isoDate);
  if (Number.isNaN(d.getTime())) return '';
  const MONTHS_TH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  return `${d.getDate()} ${MONTHS_TH[d.getMonth()]} ${d.getFullYear() + 543}`;
};

/** 24-hour time only — "14:30". */
export const formatTime24 = (isoOrDate) => {
  if (!isoOrDate) return '';
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Clamp a number to [min, max]. Useful for KPI score normalization. */
export const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));

/** Safe division — returns 0 (not NaN/Infinity) when denominator is 0/null. */
export const safeDiv = (num, den) => {
  const d = Number(den);
  if (!d || !Number.isFinite(d)) return 0;
  return Number(num) / d;
};

/** Percent calculation with safe division and rounding to 1 decimal. */
export const safePct = (num, den) => {
  return Math.round(safeDiv(num, den) * 100 * 10) / 10;
};
