// ============================================================
// CommandPalette — Cmd/Ctrl+K navigator
// Fuzzy-ish search over items; keyboard + mouse; Esc to close.
// ============================================================
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../theme/compose.js';

function matches(item, q) {
    if (!q) return true;
    const hay = [item.label, item.desc, item.group, item.id].filter(Boolean).join(' ').toLowerCase();
    return q.toLowerCase().split(/\s+/).every(term => hay.includes(term));
}

export default function CommandPalette({ open, onClose, items = [], onSelect }) {
    const [query, setQuery] = useState('');
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    const filtered = useMemo(() => items.filter(it => matches(it, query)), [items, query]);

    // Reset cursor on query/open change via derived state (avoids setState-in-effect warning)
    const [prevKey, setPrevKey] = useState(query + '|' + open);
    const currentKey = query + '|' + open;
    if (currentKey !== prevKey) {
        setCursor(0);
        setPrevKey(currentKey);
    }

    useEffect(() => {
        if (!open) return;
        const id = setTimeout(() => inputRef.current?.focus(), 20);
        return () => clearTimeout(id);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose?.();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setCursor(c => Math.min(c + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setCursor(c => Math.max(c - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const chosen = filtered[cursor];
                if (chosen) { onSelect?.(chosen.id); setQuery(''); }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, filtered, cursor, onClose, onSelect]);

    useEffect(() => {
        const el = listRef.current?.children?.[cursor];
        if (el?.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
    }, [cursor]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 sm:pt-[10vh] pt-4" role="dialog" aria-modal="true" aria-label="ค้นหาเมนู">
            {/* Backdrop */}
            <button
                type="button"
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                aria-label="ปิดหน้าต่างค้นหา"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full max-w-xl bg-[color:var(--md-surface)] border border-[color:var(--md-border)] rounded-card shadow-elev-xl overflow-hidden animate-slide-down">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[color:var(--md-border)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[color:var(--md-text-tertiary)]" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="ค้นหาเมนู, คำสั่ง, KPI…"
                        className="flex-1 bg-transparent outline-none text-fs-md placeholder:text-[color:var(--md-text-tertiary)]"
                    />
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-[color:var(--md-surface-2)] border border-[color:var(--md-border)] font-mono">Esc</kbd>
                </div>

                <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-1">
                    {filtered.length === 0 ? (
                        <div className="px-4 py-8 text-center text-fs-sm text-[color:var(--md-text-tertiary)]">
                            ไม่พบผลลัพธ์สำหรับ &ldquo;{query}&rdquo;
                        </div>
                    ) : (
                        filtered.map((item, i) => (
                            <button
                                key={item.id}
                                type="button"
                                onMouseEnter={() => setCursor(i)}
                                onClick={() => { onSelect?.(item.id); setQuery(''); }}
                                className={cn(
                                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                                    i === cursor
                                        ? 'bg-primary-600 text-white'
                                        : 'text-[color:var(--md-text-primary)] hover:bg-[color:var(--md-surface-2)]',
                                )}
                            >
                                <span className="text-xl shrink-0" aria-hidden="true">{item.icon}</span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-fs-sm font-semibold truncate">{item.label}</span>
                                    {item.desc && (
                                        <span className={cn(
                                            'block text-fs-2xs truncate',
                                            i === cursor ? 'text-white/80' : 'text-[color:var(--md-text-tertiary)]',
                                        )}>{item.desc}</span>
                                    )}
                                </span>
                                {item.group && (
                                    <span className={cn(
                                        'px-2 py-0.5 rounded-full text-fs-2xs font-mono',
                                        i === cursor ? 'bg-white/20 text-white' : 'bg-[color:var(--md-surface-2)] text-[color:var(--md-text-tertiary)]',
                                    )}>{item.group}</span>
                                )}
                            </button>
                        ))
                    )}
                </div>

                <div className="flex items-center justify-between px-4 py-2 text-fs-2xs text-[color:var(--md-text-tertiary)] border-t border-[color:var(--md-border)] bg-[color:var(--md-surface-2)]">
                    <div className="flex items-center gap-2">
                        <kbd className="px-1.5 py-0.5 rounded bg-[color:var(--md-surface)] border border-[color:var(--md-border)] font-mono text-[10px]">↑↓</kbd>
                        เลื่อน
                        <kbd className="px-1.5 py-0.5 rounded bg-[color:var(--md-surface)] border border-[color:var(--md-border)] font-mono text-[10px]">↵</kbd>
                        เลือก
                    </div>
                    <span>{filtered.length} results</span>
                </div>
            </div>
        </div>
    );
}
