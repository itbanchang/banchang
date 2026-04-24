// ============================================================
// BCH 360° Intelligence V.10 — SQL Query Builder Utilities
// Shared helpers for fiscal dates, safe limits, and SQL fragments
// ============================================================

/**
 * @typedef {Object} FiscalDateRange
 * @property {string} start - Start date (YYYY-MM-DD), e.g. '2024-10-01'
 * @property {string} end   - End date (YYYY-MM-DD), e.g. '2025-09-30'
 */

/**
 * Convert a Buddhist-era fiscal year (พ.ศ.) to a date range.
 * Thai fiscal year runs Oct 1 → Sep 30.
 * e.g. ปีงบ 2568 → 2024-10-01 to 2025-09-30
 *
 * @param {number} fiscalYearBE - Thai fiscal year in Buddhist era (e.g. 2568)
 * @returns {FiscalDateRange}
 */
export function fiscalDateRange(fiscalYearBE) {
  const startYear = fiscalYearBE - 543 - 1; // CE year the FY starts in October
  return {
    start: `${startYear}-10-01`,
    end: `${startYear + 1}-09-30`,
  };
}

/**
 * @typedef {Object} ComparablePeriodResult
 * @property {FiscalDateRange[]} ranges - Array of fiscal year date ranges
 * @property {number[]} comparableMonthIndices - Fiscal-month indices (0–11) that have data in the latest FY
 */

/**
 * Build comparable period ranges for Year-over-Year calculations.
 * Returns fiscal ranges for each requested year and identifies which
 * fiscal-month indices are valid for fair comparison (based on the
 * latest year having data up to `latestMonth`).
 *
 * @param {number[]} fiscalYearsBE - Array of fiscal years in BE (e.g. [2566, 2567, 2568])
 * @param {number}   latestMonth   - Latest CE month with data (1–12)
 * @returns {ComparablePeriodResult}
 */
export function comparablePeriod(fiscalYearsBE, latestMonth) {
  const ranges = fiscalYearsBE.map(fy => fiscalDateRange(fy));

  // Fiscal months: Oct=0, Nov=1, Dec=2, Jan=3 … Sep=11
  // Convert CE month to fiscal-month index
  const fiscalMonthIdx = (ceMonth) => ceMonth >= 10 ? ceMonth - 10 : ceMonth + 2;
  const latestIdx = fiscalMonthIdx(latestMonth);

  // All indices from Oct (0) up to and including the latest month
  const comparableMonthIndices = [];
  for (let i = 0; i <= latestIdx; i++) {
    comparableMonthIndices.push(i);
  }

  return { ranges, comparableMonthIndices };
}

/**
 * Clamp a user-supplied limit to a safe range.
 *
 * @param {*}      limit - Raw limit value (string | number | undefined)
 * @param {number} [max=100] - Maximum allowed value
 * @returns {number} Clamped integer between 1 and max
 */
export function safeLimit(limit, max = 100) {
  return Math.min(Math.max(1, Number(limit) || 20), max);
}

/**
 * Thai month labels (1-indexed). Index 0 is empty placeholder.
 * @type {string[]}
 */
export const MONTH_TH = [
  '', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
];

/**
 * Fiscal month order: Oct → Sep (Thai fiscal year order).
 * @type {string[]}
 */
export const MONTH_FISCAL_ORDER = [
  'ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.',
  'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.',
];

/**
 * Generate SQL IN-clause placeholders for parameterized queries.
 *
 * @param {Array} items - Array of items to create placeholders for
 * @returns {string} Comma-separated '?' placeholders, e.g. '?,?,?'
 */
export function inPlaceholders(items) {
  return items.map(() => '?').join(',');
}

/**
 * Compute percentage change between two values.
 * Returns null if both values are zero.
 *
 * @param {number} current  - Current value
 * @param {number} previous - Previous value
 * @returns {number|null} Percentage change (rounded), or null
 */
export function pctChange(current, previous) {
  if (previous > 0) return Math.round(((current - previous) / previous) * 100);
  return current > 0 ? 100 : null;
}
