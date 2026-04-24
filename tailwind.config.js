/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Material Dashboard 3 PRO — Primary Palette (Indigo/Purple)
                primary: {
                    50:  '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#7c3aed',  // main brand
                    600: '#6d28d9',
                    700: '#5b21b6',
                    800: '#4c1d95',
                    900: '#3b1486',
                    950: '#250c6a',
                },
                // Accent — Teal/Cyan (Material info / success)
                accent: {
                    50:  '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                // Danger
                danger: {
                    50:  '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                    950: '#4c0519',
                },
                // Warning
                warning: {
                    50:  '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                // Neutral / Surface — Light mode grays
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
            fontFamily: {
                sans: ['Inter', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            borderRadius: {
                'xl':  '0.75rem',
                '2xl': '1rem',
                '3xl': '1.25rem',
            },
            boxShadow: {
                // Material elevation levels
                'md-1': '0 2px 4px -1px rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.04)',
                'md-2': '0 4px 6px -2px rgba(0,0,0,.08), 0 2px 4px -2px rgba(0,0,0,.05)',
                'md-3': '0 10px 15px -3px rgba(0,0,0,.10), 0 4px 6px -4px rgba(0,0,0,.05)',
                'md-4': '0 20px 25px -5px rgba(0,0,0,.10), 0 8px 10px -6px rgba(0,0,0,.05)',
                'card': '0 4px 20px 0 rgba(0,0,0,.08)',
                'card-hover': '0 8px 32px 0 rgba(124,58,237,.12)',
            },
            animation: {
                'fade-in':    'fadeIn 0.4s ease-out',
                'slide-up':   'slideUp 0.35s ease-out',
                'slide-right':'slideRight 0.35s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'spin-slow':  'spin 3s linear infinite',
            },
            keyframes: {
                fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                slideRight:{ '0%': { opacity: '0', transform: 'translateX(-16px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
                pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};
