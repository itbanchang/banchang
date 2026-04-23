// ============================================================
// BCH 360° — Design Tokens (JSX-friendly)
// Use these in .jsx files so components stay consistent with
// Tailwind classes and index.css CSS variables.
// ============================================================

/** Semantic brand / status colours. Hex values match tailwind.config.js. */
export const color = {
    primary:   '#0f766e',   // Deep Teal (main brand)
    primaryLight: '#2dd4bf',
    primaryDark:  '#134e4a',
    accent:    '#10b981',   // Emerald (success, AI confidence)
    danger:    '#f43f5e',   // Rose (critical / red-flag)
    dangerDeep:'#e11d48',
    warning:   '#f59e0b',   // Amber (caution / below target)
    info:      '#0284c7',   // Sky (routine info)
    ai:        '#7c3aed',   // Violet (Claude / AI narratives)
    slate:     '#64748b',   // Neutral
    emerald:   '#10b981',   // alias
    cyan:      '#11cdef',   // legacy Argon cyan
};

/** Semantic status mapping — use for KPI colouring + chart fills. */
export const status = {
    good:    color.accent,
    warning: color.warning,
    danger:  color.danger,
    unknown: color.slate,
    info:    color.info,
};

/** Thai status label → (colour, label) for OPD flow (used by tabs that render queue lists). */
export const THAI_STATUS_COLOR = {
    'รอคัดกรอง':  color.danger,
    'กำลังตรวจ':  color.warning,
    'รอรับยา':    color.primary,
    'กลับบ้าน':   color.accent,
};

/** AI priority tokens — matches AIInsightCard priorityConfig. */
export const PRIORITY = {
    HIGH:   { color: color.danger,  bg: 'rgba(244,63,94,.08)',  icon: '⚠️', label: 'HIGH'   },
    MEDIUM: { color: color.warning, bg: 'rgba(245,158,11,.08)', icon: '📌', label: 'MEDIUM' },
    LOW:    { color: color.accent,  bg: 'rgba(16,185,129,.08)', icon: '✓',  label: 'LOW'    },
    INFO:   { color: color.info,    bg: 'rgba(2,132,199,.08)',  icon: 'ℹ️', label: 'INFO'   },
};

/** Responsive breakpoints in px — mirror Tailwind defaults. */
export const bp = {
    sm:  640,
    md:  768,
    lg:  1024,
    xl:  1280,
    '2xl': 1536,
};

/** Recharts tokens (colors + stroke patterns for multi-series charts). */
export const chart = {
    primary:    color.primary,          // today / main series
    comparison: '#fb6340',              // yesterday / compare
    prediction: color.accent,           // forecast (with dash)
    baseline:   '#8392ab',              // 7-day avg / benchmark (muted)
    dangerLine: color.danger,           // thresholds
    ai:         color.ai,               // Claude-derived data
    axis:       'var(--md-chart-tick)',
    grid:       'var(--md-chart-grid)',
};

/** CSS variable bridge — for inline styles that must respect dark mode. */
export const cssVar = {
    bg:       'var(--md-bg)',
    surface:  'var(--md-surface)',
    surface2: 'var(--md-surface-2)',
    border:   'var(--md-border)',
    divider:  'var(--md-divider)',
    textPrimary:   'var(--md-text-primary)',
    textSecondary: 'var(--md-text-secondary)',
    textTertiary:  'var(--md-text-tertiary)',
    shadowSm: 'var(--md-shadow-sm)',
    shadowMd: 'var(--md-shadow-md)',
    shadowLg: 'var(--md-shadow-lg)',
    shadowXl: 'var(--md-shadow-xl)',
    shadowBrand: 'var(--md-shadow-brand)',
};

/** Motion timings. */
export const motion = {
    fast:    150,
    base:    250,
    slow:    400,
    easeOut: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeSoft:'cubic-bezier(0.165, 0.84, 0.44, 1)',
};
