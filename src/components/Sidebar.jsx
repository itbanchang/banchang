// ============================================================
// Sidebar — Incremental V2 nav on V1 baseline
//
// Replaces the top-tab row in App.jsx. Desktop: fixed left-side
// nav. Mobile (< lg): slide-in drawer with backdrop.
// Uses existing CSS variables (var(--md-*)) — no new design tokens.
// ============================================================
import React, { useState, useEffect } from 'react';

/**
 * <Sidebar
 *   tabs={TABS}             // [{ id, label, icon, desc }]
 *   activeTab={activeTab}
 *   onSelect={(id) => setTab(id)}
 *   open={mobileOpen}        // mobile drawer state
 *   onClose={() => setOpen(false)}
 *   collapsed={collapsed}    // desktop icon-only mode
 *   onToggleCollapse={...}
 * />
 */
export default function Sidebar({
    tabs = [],
    activeTab,
    onSelect,
    open = false,
    onClose,
    collapsed = false,
    onToggleCollapse,
    brand,
}) {
    const [query, setQuery] = useState('');

    // Esc closes mobile drawer
    useEffect(() => {
        if (!open) return;
        const h = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [open, onClose]);

    const filtered = query.trim()
        ? tabs.filter(t =>
            (t.label + ' ' + (t.desc || '') + ' ' + t.id).toLowerCase().includes(query.toLowerCase()))
        : tabs;

    const handleClick = (id) => {
        onSelect?.(id);
        onClose?.();   // auto-close mobile drawer on nav
    };

    const widthClass = collapsed ? 'lg:w-[72px]' : 'lg:w-[240px]';

    return (
        <>
            {/* Mobile backdrop */}
            {open && (
                <button
                    type="button"
                    aria-label="ปิดเมนู"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
                />
            )}

            {/* Sidebar itself */}
            <aside
                aria-label="เมนูหลัก"
                className={
                    'fixed top-0 left-0 z-50 h-screen flex flex-col ' +
                    'bg-[color:var(--md-surface)] border-r border-[color:var(--md-border)] ' +
                    'shadow-lg lg:shadow-sm ' +
                    'transition-[transform,width] duration-300 ease-out ' +
                    'w-[240px] ' + widthClass + ' ' +
                    (open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')
                }
            >
                {/* Brand */}
                <div className={'flex items-center gap-3 px-4 py-4 border-b border-[color:var(--md-border)] ' + (collapsed ? 'lg:justify-center lg:px-2' : '')}>
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0f766e, #0284c7)' }}
                        aria-hidden="true"
                    >
                        🏥
                    </div>
                    <div className={'min-w-0 ' + (collapsed ? 'lg:hidden' : '')}>
                        <div className="font-bold text-[14px] text-[color:var(--md-text-primary)] truncate">
                            {brand?.title || 'BCH 360°'}
                        </div>
                        <div className="text-[10px] text-[color:var(--md-text-tertiary)] truncate">
                            {brand?.subtitle || 'Hospital Intelligence'}
                        </div>
                    </div>
                </div>

                {/* Search (hidden when collapsed on desktop) */}
                <div className={'px-3 py-3 border-b border-[color:var(--md-border)] ' + (collapsed ? 'lg:hidden' : '')}>
                    <label className="relative block">
                        <span className="sr-only">ค้นหาเมนู</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="ค้นหาเมนู…"
                            className="w-full px-3 py-1.5 text-[12px] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(15,118,110,0.25)] placeholder:text-[color:var(--md-text-tertiary)]"
                            style={{
                                background: 'var(--md-surface-2)',
                                color: 'var(--md-text-primary)',
                            }}
                        />
                    </label>
                </div>

                {/* Nav list */}
                <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1" aria-label="รายการเมนู">
                    {filtered.map(tab => {
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleClick(tab.id)}
                                aria-current={active ? 'page' : undefined}
                                title={collapsed ? (tab.label + ' — ' + (tab.desc || '')) : undefined}
                                className={
                                    'group w-full flex items-center gap-3 rounded-xl transition-all duration-150 ' +
                                    'px-3 py-2 text-left ' +
                                    (collapsed ? 'lg:justify-center lg:px-2' : '') +
                                    (active
                                        ? ' text-white'
                                        : ' hover:bg-[color:var(--md-surface-2)]')
                                }
                                style={active ? {
                                    background: 'var(--md-primary)',
                                    boxShadow: '0 4px 12px rgba(15,118,110,0.28)',
                                } : {
                                    color: 'var(--md-text-primary)',
                                }}
                            >
                                <span className="text-xl leading-none shrink-0" aria-hidden="true">{tab.icon}</span>
                                <span className={'flex-1 min-w-0 ' + (collapsed ? 'lg:hidden' : '')}>
                                    <span className="block text-[13px] font-semibold leading-tight truncate">
                                        {tab.label}
                                    </span>
                                    {tab.desc && (
                                        <span
                                            className="block text-[10px] truncate mt-0.5"
                                            style={{ color: active ? 'rgba(255,255,255,0.8)' : 'var(--md-text-tertiary)' }}
                                        >
                                            {tab.desc}
                                        </span>
                                    )}
                                </span>
                            </button>
                        );
                    })}
                    {filtered.length === 0 && (
                        <div className="px-3 py-4 text-[12px] text-[color:var(--md-text-tertiary)]">
                            ไม่พบเมนูที่ตรงกับ &ldquo;{query}&rdquo;
                        </div>
                    )}
                </nav>

                {/* Footer: collapse toggle (desktop only) */}
                <div className="border-t border-[color:var(--md-border)] p-2">
                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        className={
                            'hidden lg:flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] ' +
                            'text-[color:var(--md-text-secondary)] hover:bg-[color:var(--md-surface-2)] ' +
                            'focus:outline-none focus:ring-2 focus:ring-[rgba(15,118,110,0.25)]'
                        }
                        aria-label={collapsed ? 'ขยายแถบด้านข้าง' : 'ย่อแถบด้านข้าง'}
                    >
                        <span className="text-base leading-none">{collapsed ? '›' : '‹'}</span>
                        {!collapsed && <span>ย่อแถบ</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
