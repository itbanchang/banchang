/** @type {import('tailwindcss').Config} */
// ============================================================
// BCH 360° — Tailwind Theme
// Aligned with src/index.css CSS variables. See docs/design/system.md.
// Primary = Teal (hospital-authoritative). Font = Kanit (Thai-optimised).
// ============================================================
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Primary — Deep Teal (Authoritative Medical)
                primary: {
                    50:  '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',  // md-primary-light
                    500: '#14b8a6',
                    600: '#0f766e',  // md-primary (main brand)
                    700: '#0e6b64',
                    800: '#115e59',
                    900: '#134e4a',  // md-primary-dark
                    950: '#042f2e',
                },
                // Accent — Emerald (Success / AI confidence)
                accent: {
                    50:  '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',  // md-success
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                // Danger — Rose (Crisis / NEWS2 red-flag)
                danger: {
                    50:  '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',  // md-danger (chart red)
                    600: '#e11d48',  // severity banner
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                    950: '#4c0519',
                },
                // Warning — Amber (Boarding / under-target)
                warning: {
                    50:  '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',  // md-warning
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                // Info — Sky (Ancillary info, routine status)
                info: {
                    50:  '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',  // md-info
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                // Ai — Violet (Claude / AI narrative accent)
                ai: {
                    50:  '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7c3aed',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
                // Neutral / Surface — matches index.css --md-surface-* and --md-bg tokens
                surface: {
                    50:  '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            // Alias against CSS vars — use for elements that need live dark-mode swap
            backgroundColor: {
                'bg-app':     'var(--md-bg)',
                'bg-surface': 'var(--md-surface)',
                'bg-elev':    'var(--md-surface-2)',
            },
            textColor: {
                'text-primary':   'var(--md-text-primary)',
                'text-secondary': 'var(--md-text-secondary)',
                'text-tertiary':  'var(--md-text-tertiary)',
            },
            borderColor: {
                'border-default': 'var(--md-border)',
                'border-divider': 'var(--md-divider)',
            },
            fontFamily: {
                // Kanit is the live render font (index.css); list Inter/Noto as dev fallback
                sans: ['Kanit', 'Inter', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
            },
            fontSize: {
                // Mirror --fs-* tokens from index.css for use as `text-fs-base` etc.
                'fs-micro': 'var(--fs-micro)',
                'fs-2xs':   'var(--fs-2xs)',
                'fs-xs':    'var(--fs-xs)',
                'fs-sm':    'var(--fs-sm)',
                'fs-base':  'var(--fs-base)',
                'fs-md':    'var(--fs-md)',
                'fs-lg':    'var(--fs-lg)',
                'fs-xl':    'var(--fs-xl)',
                'fs-2xl':   'var(--fs-2xl)',
                'fs-3xl':   'var(--fs-3xl)',
                'fs-hero':  'var(--fs-hero)',
            },
            borderRadius: {
                'xl':  '0.75rem',
                '2xl': '1rem',
                '3xl': '1.25rem',
                'card': '1rem',
                'pill': '9999px',
            },
            boxShadow: {
                // Named for design semantics (mirror index.css elevation scale)
                'elev-sm':   'var(--md-shadow-sm)',
                'elev-md':   'var(--md-shadow-md)',
                'elev-lg':   'var(--md-shadow-lg)',
                'elev-xl':   'var(--md-shadow-xl)',
                'brand':     'var(--md-shadow-brand)',
                'card':      '0 4px 20px 0 rgba(15,23,42,.06)',
                'card-hover':'0 8px 32px 0 rgba(15,118,110,.16)',
                'focus':     '0 0 0 3px rgba(15,118,110,.18)',
                'danger-focus':  '0 0 0 3px rgba(244,63,94,.20)',
            },
            animation: {
                'fade-in':    'fadeIn 0.4s ease-out',
                'slide-up':   'slideUp 0.35s ease-out',
                'slide-right':'slideRight 0.35s ease-out',
                'slide-down': 'slideDown 0.35s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'pulse-live': 'live-pulse 1.5s ease-in-out infinite',
                'spin-slow':  'spin 3s linear infinite',
                'shimmer':    'shimmer 4s linear infinite',
                'ai-glow':    'aiGlow 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' },  '100%': { opacity: '1', transform: 'translateY(0)' } },
                slideDown: { '0%': { opacity: '0', transform: 'translateY(-16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                slideRight:{ '0%': { opacity: '0', transform: 'translateX(-16px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
                pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
                aiGlow:    {
                    '0%,100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0), 0 4px 16px rgba(124,58,237,.10)' },
                    '50%':     { boxShadow: '0 0 0 8px rgba(124,58,237,0), 0 8px 28px rgba(124,58,237,.20)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            gridTemplateColumns: {
                // Responsive KPI rows (auto-fit, min 240px, share equally above that)
                'kpi-auto': 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                'card-auto': 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            },
            transitionTimingFunction: {
                'soft': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            },
        },
    },
    plugins: [],
};
