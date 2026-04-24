// ============================================================
// BCH 360° — Tailwind class composers
// Small helpers to keep JSX clean and the set of utility strings
// DRY across the codebase.
// ============================================================

/** cn() — conditional class name joiner (like clsx, tiny) */
export function cn(...parts) {
    return parts.flat().filter(Boolean).join(' ');
}

/** Card surface — the canonical glass-style card. */
export const cardBase = 'bg-[color:var(--md-surface)] border border-[color:var(--md-border)] rounded-card shadow-elev-md transition-[box-shadow,transform,border-color] duration-300 ease-soft';
export const cardHover = 'hover:shadow-elev-xl hover:-translate-y-1 hover:border-primary-600/20';
export const cardPad = 'p-4 sm:p-5 lg:p-6';
export const cardTight = 'p-3 sm:p-4';
export const card = cn(cardBase, cardPad);
export const cardInteractive = cn(cardBase, cardPad, cardHover, 'cursor-pointer');

/** Typography helpers. */
export const t = {
    eyebrow:  'text-fs-2xs font-bold uppercase tracking-[0.08em] text-[color:var(--md-text-tertiary)]',
    label:    'text-fs-xs font-semibold text-[color:var(--md-text-secondary)]',
    labelThai: 'text-fs-sm font-semibold text-[color:var(--md-text-primary)]',
    body:     'text-fs-sm text-[color:var(--md-text-primary)]',
    bodyDim:  'text-fs-sm text-[color:var(--md-text-secondary)]',
    hero:     'text-fs-3xl lg:text-fs-hero font-bold tracking-tight text-[color:var(--md-text-primary)]',
    kpi:      'text-fs-2xl lg:text-fs-3xl font-bold tracking-tight text-[color:var(--md-text-primary)]',
    sectionTitle: 'text-fs-lg font-bold tracking-tight text-[color:var(--md-text-primary)]',
    mono:     'font-mono tabular-nums',
};

/** Status token → chip + icon class bundle. */
export const chipByStatus = {
    good:    'bg-accent-500/10 text-accent-700 ring-1 ring-accent-500/20',
    warning: 'bg-warning-500/10 text-warning-700 ring-1 ring-warning-500/20',
    danger:  'bg-danger-500/10 text-danger-700 ring-1 ring-danger-500/20',
    info:    'bg-info-500/10 text-info-700 ring-1 ring-info-500/20',
    ai:      'bg-ai-500/10 text-ai-700 ring-1 ring-ai-500/20',
    unknown: 'bg-surface-200/60 text-surface-600 ring-1 ring-surface-200',
};

/** KPI card colour — background tint + icon colour per semantic colour key. */
export const kpiTint = {
    primary: { ring: 'ring-primary-600/20', accent: 'text-primary-600', bar: 'bg-primary-600' },
    accent:  { ring: 'ring-accent-500/20',  accent: 'text-accent-600',  bar: 'bg-accent-500'  },
    info:    { ring: 'ring-info-500/20',    accent: 'text-info-600',    bar: 'bg-info-500'    },
    warning: { ring: 'ring-warning-500/20', accent: 'text-warning-600', bar: 'bg-warning-500' },
    danger:  { ring: 'ring-danger-500/20',  accent: 'text-danger-600',  bar: 'bg-danger-500'  },
    ai:      { ring: 'ring-ai-500/20',      accent: 'text-ai-600',      bar: 'bg-ai-500'      },
    slate:   { ring: 'ring-surface-300',    accent: 'text-surface-600', bar: 'bg-surface-500' },
};

/** Animation presets. */
export const enter = 'animate-slide-up';
export const enterFade = 'animate-fade-in';

/** Format helpers (Thai locale). */
export const fmt = {
    number:   (v) => v == null ? '—' : new Intl.NumberFormat('th-TH').format(v),
    decimal:  (v, d = 1) => v == null ? '—' : Number(v).toFixed(d),
    currency: (v) => v == null ? '—' : new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', notation: 'compact', maximumFractionDigits: 1 }).format(v),
    currencyFull: (v) => v == null ? '—' : new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(v),
    percent:  (v) => v == null ? '—' : `${(v * 100).toFixed(1)}%`,
    delta:    (v) => v == null ? null : (v > 0 ? `+${v.toFixed(1)}%` : `${v.toFixed(1)}%`),
    thaiDate: (d) => {
        if (!d) return '—';
        const date = d instanceof Date ? d : new Date(d);
        return new Intl.DateTimeFormat('th-TH', { dateStyle: 'long' }).format(date);
    },
    shortDate: (d) => {
        if (!d) return '—';
        const date = d instanceof Date ? d : new Date(d);
        return new Intl.DateTimeFormat('th-TH', { day: '2-digit', month: 'short' }).format(date);
    },
    beYear: (d) => {
        const date = d instanceof Date ? d : new Date(d || Date.now());
        return date.getFullYear() + 543;
    },
};

/** Small status-label picker used in KPI cards etc. */
export function statusOf(value, { goodMax, warningMax, higherIsBetter = false } = {}) {
    if (value == null || Number.isNaN(Number(value))) return 'unknown';
    const v = Number(value);
    if (higherIsBetter) {
        if (goodMax != null && v >= goodMax) return 'good';
        if (warningMax != null && v >= warningMax) return 'warning';
        return 'danger';
    }
    if (goodMax != null && v <= goodMax) return 'good';
    if (warningMax != null && v <= warningMax) return 'warning';
    return 'danger';
}
