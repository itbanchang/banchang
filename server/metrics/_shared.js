// ============================================================
// Metric Registry — shared helpers
// ============================================================

/** Classify a value against a metric's thresholds -> 'good'|'warning'|'danger'|'unknown' */
export function classify(value, thresholds) {
    if (value == null || Number.isNaN(value)) return 'unknown';
    if (thresholds?.good && value <= (thresholds.good.max ?? Infinity)) return 'good';
    if (thresholds?.warning && value <= (thresholds.warning.max ?? Infinity)) return 'warning';
    return 'danger';
}

/** Color for a status (matches bch-ui-designer Argon palette) */
export const STATUS_COLOR = {
    good: '#2dce89',
    warning: '#fb6340',
    danger: '#f5365c',
    unknown: '#8392ab',
};

/** Today in YYYY-MM-DD (Asia/Bangkok, via dateStrings from mysql2) */
export function today() {
    const d = new Date();
    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, '0'),
        String(d.getDate()).padStart(2, '0'),
    ].join('-');
}

/** Date range for today (start=today, end=today) */
export function todayRange() {
    const d = today();
    return { start: d, end: d };
}

/** Date range for last N days (inclusive) */
export function lastNDays(n) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (n - 1));
    return { start: ymd(start), end: ymd(end) };
}

function ymd(d) {
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
}

/** Standard metric result shape */
export function result(metric, value, extras = {}) {
    const status = classify(value, metric.thresholds);
    return {
        id: metric.id,
        value,
        unit: metric.unit,
        status,
        color: STATUS_COLOR[status],
        target: metric.target,
        label: metric.label,
        generated_at: Date.now(),
        ...extras,
    };
}
