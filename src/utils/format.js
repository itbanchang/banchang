// ============================================================
// BCH 360° — Frontend Format Utilities
// Mirrors server/utils/units.js for client-side rendering.
//
// Use these helpers (do NOT inline format logic in components):
//   - formatPct(14.62)  → "14.6%"
//   - formatInt(1234)   → "1,234"
//   - formatBaht(1234567) → "1,234,567 บาท"
//   - formatThaiDate(date) → "13 พ.ค. 2569"
// ============================================================

const MONTHS_TH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

/** Percent — 1 decimal + "%" suffix. */
export const formatPct = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0.0%';
  return `${Number(v).toFixed(1)}%`;
};

/** Integer with comma. */
export const formatInt = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0';
  return Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 });
};

/** Decimal (default 1 dp). */
export const formatDec = (v, dp = 1) => {
  if (v == null || !Number.isFinite(Number(v))) return '0.0';
  return Number(v).toFixed(dp);
};

/** Full baht — Phase G policy: no K/M shorthand. */
export const formatBaht = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0 บาท';
  return `${Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 })} บาท`;
};

/** Compact baht with Thai unit — only for tight spaces (charts axis). */
export const formatBahtCompact = (v) => {
  if (v == null || !Number.isFinite(Number(v))) return '0';
  const n = Number(v);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} ล้าน`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} พัน`;
  return n.toFixed(0);
};

/** Minutes display — "5 นาที" or "1 ชม. 30 นาที". */
export const formatMinutes = (m) => {
  if (m == null || !Number.isFinite(Number(m))) return '0 นาที';
  const min = Math.round(Number(m));
  if (min < 60) return `${min} นาที`;
  const h = Math.floor(min / 60);
  const r = min % 60;
  return r === 0 ? `${h} ชม.` : `${h} ชม. ${r} นาที`;
};

/** Thai date BE — "13 พ.ค. 2569". */
export const formatThaiDate = (isoOrDate) => {
  if (!isoOrDate) return '';
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getDate()} ${MONTHS_TH[d.getMonth()]} ${d.getFullYear() + 543}`;
};

/** 24h time — "14:30". */
export const formatTime24 = (isoOrDate) => {
  if (!isoOrDate) return '';
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Trend arrow — "↗ +5.2%" / "↘ -3.1%" / "→ 0%" — uses YoY/MoM delta. */
export const formatTrendArrow = (delta) => {
  if (delta == null || !Number.isFinite(Number(delta))) return '→ 0%';
  const d = Number(delta);
  if (Math.abs(d) < 0.1) return '→ 0%';
  const arrow = d > 0 ? '↗' : '↘';
  const sign = d > 0 ? '+' : '';
  return `${arrow} ${sign}${d.toFixed(1)}%`;
};

/** WCAG triple-cue status label — combines emoji + text + (color comes from caller). */
export const statusLabel = (status) => {
  switch (status) {
    case 'good':
    case 'pass':
      return '✅ ผ่าน';
    case 'warning':
    case 'warn':
      return '⚠️ เฝ้าระวัง';
    case 'critical':
    case 'fail':
      return '🔴 ไม่ผ่าน';
    case 'no_data':
      return '— ไม่มีข้อมูล';
    case 'monitor':
      return '👁️ เฝ้าดู';
    default:
      return status || '—';
  }
};
