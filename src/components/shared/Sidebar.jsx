// ============================================================
// Sidebar — Modern, grouped, collapsible navigation
// Props:
//   activeId, onNavigate, groups, collapsed, onToggleCollapse, brand
// groups: [{ title, items: [{ id, label, icon, desc, badge? }] }]
// ============================================================
import React, { useState } from 'react';
import { cn } from '../../theme/compose.js';

function NavItem({ item, active, collapsed, onClick }) {
    return (
        <button
            type="button"
            onClick={() => onClick?.(item.id)}
            aria-current={active ? 'page' : undefined}
            className={cn(
                'group w-full flex items-center gap-3 rounded-xl transition-all duration-200',
                'px-3 py-2.5',
                active
                    ? 'bg-primary-600 text-white shadow-brand'
                    : 'text-[color:var(--md-text-primary)] hover:bg-[color:var(--md-surface-2)]',
                collapsed && 'justify-center px-2',
            )}
            title={collapsed ? `${item.label} — ${item.desc || ''}` : undefined}
        >
            <span className="text-xl leading-none shrink-0" aria-hidden="true">{item.icon}</span>
            {!collapsed && (
                <span className="flex-1 min-w-0 text-left">
                    <span className={cn(
                        'block text-fs-sm font-semibold leading-tight truncate',
                        active ? 'text-white' : 'text-[color:var(--md-text-primary)]',
                    )}>
                        {item.label}
                    </span>
                    {item.desc && (
                        <span className={cn(
                            'block text-fs-2xs truncate',
                            active ? 'text-white/80' : 'text-[color:var(--md-text-tertiary)]',
                        )}>
                            {item.desc}
                        </span>
                    )}
                </span>
            )}
            {!collapsed && item.badge != null && (
                <span className={cn(
                    'shrink-0 min-w-[20px] text-center px-1.5 py-0.5 rounded-full text-fs-2xs font-bold',
                    active ? 'bg-white/20 text-white' : 'bg-danger-500/15 text-danger-700',
                )}>
                    {item.badge}
                </span>
            )}
        </button>
    );
}

export default function Sidebar({
    brand = { title: 'BCH 360°', subtitle: 'Hospital Intelligence' },
    groups = [],
    activeId,
    onNavigate,
    collapsed = false,
    onToggleCollapse,
    footer,
}) {
    const [query, setQuery] = useState('');

    const filtered = query.trim()
        ? groups.map(g => ({
            ...g,
            items: g.items.filter(it =>
                (it.label + ' ' + (it.desc || '')).toLowerCase().includes(query.toLowerCase()))
          })).filter(g => g.items.length > 0)
        : groups;

    return (
        <>
            {/* Brand */}
            <div className={cn(
                'flex items-center gap-3 px-4 py-4 border-b border-[color:var(--md-border)]',
                collapsed && 'justify-center px-2',
            )}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-brand shrink-0">
                    <span className="text-white font-bold text-lg">🏥</span>
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <div className="font-bold text-fs-md text-[color:var(--md-text-primary)] truncate">{brand.title}</div>
                        <div className="text-fs-2xs text-[color:var(--md-text-tertiary)] truncate">{brand.subtitle}</div>
                    </div>
                )}
            </div>

            {/* Search */}
            {!collapsed && (
                <div className="px-3 py-3 border-b border-[color:var(--md-border)]">
                    <label className="relative block">
                        <span className="sr-only">ค้นหาเมนู</span>
                        <input
                            type="search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="ค้นหาเมนู…"
                            className="w-full px-3 py-2 text-fs-sm rounded-lg bg-[color:var(--md-surface-2)] border border-transparent focus:border-primary-500 focus:bg-[color:var(--md-surface)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 placeholder:text-[color:var(--md-text-tertiary)]"
                            aria-label="ค้นหาเมนู"
                        />
                    </label>
                </div>
            )}

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4" aria-label="Navigation">
                {filtered.map(group => (
                    <div key={group.title} className="space-y-1">
                        {!collapsed && group.title && (
                            <div className="px-3 pb-1 text-fs-2xs font-bold uppercase tracking-wider text-[color:var(--md-text-tertiary)]">
                                {group.title}
                            </div>
                        )}
                        {group.items.map(item => (
                            <NavItem
                                key={item.id}
                                item={item}
                                active={activeId === item.id}
                                collapsed={collapsed}
                                onClick={onNavigate}
                            />
                        ))}
                    </div>
                ))}
                {filtered.length === 0 && !collapsed && (
                    <div className="px-3 py-4 text-fs-xs text-[color:var(--md-text-tertiary)]">
                        ไม่พบเมนูที่ตรงกับ &ldquo;{query}&rdquo;
                    </div>
                )}
            </nav>

            {/* Footer area — collapse toggle + optional custom footer */}
            <div className="border-t border-[color:var(--md-border)] p-2">
                {footer}
                <button
                    type="button"
                    onClick={onToggleCollapse}
                    className={cn(
                        'w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-fs-sm text-[color:var(--md-text-secondary)]',
                        'hover:bg-[color:var(--md-surface-2)] focus:outline-none focus:ring-2 focus:ring-primary-500/30',
                        'hidden lg:inline-flex',
                    )}
                    aria-label={collapsed ? 'ขยายแถบด้านข้าง' : 'ย่อแถบด้านข้าง'}
                >
                    <span className="text-base">{collapsed ? '›' : '‹'}</span>
                    {!collapsed && <span>ย่อแถบ</span>}
                </button>
            </div>
        </>
    );
}
