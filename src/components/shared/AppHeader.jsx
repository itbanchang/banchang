// ============================================================
// AppHeader — Sticky top bar with breadcrumbs, search trigger,
// live clock, data-freshness, theme toggle, user menu.
// ============================================================
import React from 'react';
import { cn } from '../../theme/compose.js';

function IconButton({ title, onClick, children, pulse = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={title}
            title={title}
            className={cn(
                'relative inline-flex items-center justify-center w-10 h-10 rounded-xl',
                'text-[color:var(--md-text-secondary)] hover:text-primary-600 hover:bg-[color:var(--md-surface-2)]',
                'focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-colors',
            )}
        >
            {children}
            {pulse && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500 animate-pulse-live" />}
        </button>
    );
}

export default function AppHeader({
    title,
    subtitle,
    onMenuClick,
    onSearchClick,
    onToggleTheme,
    dark = false,
    now,
    alertCount = 0,
    user,
    onLogout,
}) {
    return (
        <header className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3">
            {/* Mobile menu */}
            <IconButton title="เปิดเมนู" onClick={onMenuClick}>
                <svg className="lg:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                <svg className="hidden lg:block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                </svg>
            </IconButton>

            {/* Title + breadcrumb */}
            <div className="flex-1 min-w-0">
                <h1 className="text-fs-md sm:text-fs-lg font-bold truncate text-[color:var(--md-text-primary)]">
                    {title || 'Dashboard'}
                </h1>
                {subtitle && (
                    <p className="text-fs-2xs text-[color:var(--md-text-tertiary)] truncate">{subtitle}</p>
                )}
            </div>

            {/* Live clock — only on sm+ */}
            {now && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[color:var(--md-surface)] border border-[color:var(--md-border)] text-fs-xs">
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75 animate-ping" />
                    </span>
                    <span className="font-mono tabular-nums text-[color:var(--md-text-primary)]">{now}</span>
                </div>
            )}

            {/* Search (⌘K) */}
            <button
                type="button"
                onClick={onSearchClick}
                aria-label="ค้นหา (Ctrl/Cmd + K)"
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[color:var(--md-surface-2)] hover:bg-[color:var(--md-surface)] border border-[color:var(--md-border)] text-fs-xs text-[color:var(--md-text-secondary)] transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                </svg>
                <span>ค้นหา…</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-[color:var(--md-surface)] border border-[color:var(--md-border)] font-mono">⌘K</kbd>
            </button>

            {/* Alerts */}
            <IconButton title={alertCount ? `${alertCount} การแจ้งเตือน` : 'ไม่มีการแจ้งเตือน'} pulse={alertCount > 0}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
            </IconButton>

            {/* Theme toggle */}
            <IconButton title={dark ? 'สลับเป็น Light mode' : 'สลับเป็น Dark mode'} onClick={onToggleTheme}>
                {dark ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36l-1.42 1.42M6.05 17.95l-1.41 1.41M18.36 18.36l-1.42-1.42M7.05 7.05L5.64 5.64M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"/></svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
            </IconButton>

            {/* User menu */}
            {user && (
                <div className="relative group">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[color:var(--md-surface-2)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        aria-haspopup="menu"
                    >
                        <span className="w-8 h-8 rounded-full bg-primary-600 text-white font-bold text-fs-sm flex items-center justify-center shrink-0">
                            {(user.full_name || user.username || '?').charAt(0).toUpperCase()}
                        </span>
                        <span className="hidden sm:block text-left text-fs-xs leading-tight">
                            <span className="block font-semibold text-[color:var(--md-text-primary)]">{user.full_name || user.username}</span>
                            <span className="block text-[color:var(--md-text-tertiary)]">{user.role}</span>
                        </span>
                    </button>
                    {onLogout && (
                        <div className="absolute right-0 mt-1 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition bg-[color:var(--md-surface)] border border-[color:var(--md-border)] rounded-xl shadow-elev-lg p-1 z-50">
                            <button
                                type="button"
                                onClick={onLogout}
                                className="w-full text-left px-3 py-2 text-fs-sm rounded-lg hover:bg-danger-500/10 hover:text-danger-700 transition-colors"
                            >
                                ออกจากระบบ
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
