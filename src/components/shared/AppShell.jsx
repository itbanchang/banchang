// ============================================================
// AppShell — Responsive layout shell
// Sidebar + Header + content. Mobile: drawer. Tablet/Desktop: fixed.
// Pair with bch-ui-designer tokens (src/theme/).
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../theme/compose.js';

/**
 * <AppShell
 *   sidebar={<Sidebar ... />}
 *   header={<AppHeader ... />}
 * >
 *   <main content />
 * </AppShell>
 */
export default function AppShell({ sidebar, header, children }) {
    const [collapsed, setCollapsed] = useState(() => {
        try { return window.localStorage.getItem('bch360.sidebar.collapsed') === '1'; } catch { return false; }
    });
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleCollapse = useCallback(() => {
        setCollapsed(v => {
            const next = !v;
            try { window.localStorage.setItem('bch360.sidebar.collapsed', next ? '1' : '0'); } catch {/* ignore */}
            return next;
        });
    }, []);

    // Keyboard: Cmd/Ctrl+B toggles sidebar
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                if (window.matchMedia('(max-width: 1023px)').matches) {
                    setMobileOpen(v => !v);
                } else {
                    toggleCollapse();
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [toggleCollapse]);

    // Close mobile drawer when switching to desktop
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const onChange = () => { if (mq.matches) setMobileOpen(false); };
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    const sidebarWidth = collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]';

    return (
        <div className="min-h-screen bg-[color:var(--md-bg)] text-[color:var(--md-text-primary)]">
            {/* Mobile backdrop */}
            {mobileOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
                    aria-label="Close sidebar"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed lg:sticky top-0 left-0 z-50 h-screen',
                    'flex flex-col',
                    'bg-[color:var(--md-surface)] border-r border-[color:var(--md-border)]',
                    'shadow-elev-lg lg:shadow-elev-sm',
                    'transition-[width,transform] duration-300 ease-soft',
                    'w-[260px]',
                    sidebarWidth,
                    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                )}
                aria-label="Primary navigation"
            >
                {React.isValidElement(sidebar)
                    ? React.cloneElement(sidebar, { collapsed, onToggleCollapse: toggleCollapse, onNavigate: () => setMobileOpen(false) })
                    : sidebar}
            </aside>

            {/* Content wrapper — reserves space next to sticky sidebar on desktop */}
            <div className="lg:ml-0 min-h-screen flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-30 bg-[color:var(--md-bg)]/80 backdrop-blur-md border-b border-[color:var(--md-border)]">
                    {React.isValidElement(header)
                        ? React.cloneElement(header, { onMenuClick: () => setMobileOpen(true), sidebarCollapsed: collapsed })
                        : header}
                </div>

                {/* Main */}
                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1920px] w-full mx-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-auto border-t border-[color:var(--md-border)] bg-[color:var(--md-surface)] px-6 py-3 text-fs-xs text-[color:var(--md-text-tertiary)]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>BCH 360° Intelligence V.10 • {new Date().getFullYear() + 543}</span>
                        <span className="hidden sm:inline">Kbd: <kbd className="px-1.5 py-0.5 bg-[color:var(--md-surface-2)] rounded text-[10px]">Ctrl/Cmd + B</kbd> toggle sidebar</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
