// ============================================================
// BCH 360° Intelligence V.10 — Tab News Registry
// Each Tab can publish its own short news brief for น้องขวัญใจ.
// AIAssistant reads the published brief for the active tab;
// if nothing is published, it falls back to generateNewsBriefs().
// ============================================================
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

const TabNewsContext = createContext(null);

export function TabNewsProvider({ children }) {
    const [registry, setRegistry] = useState({});

    const publishBrief = useCallback((tabId, brief) => {
        if (!tabId || !brief) return;
        setRegistry(prev => ({ ...prev, [tabId]: { ...brief, updatedAt: Date.now() } }));
    }, []);

    const clearBrief = useCallback((tabId) => {
        setRegistry(prev => {
            if (!prev[tabId]) return prev;
            const next = { ...prev };
            delete next[tabId];
            return next;
        });
    }, []);

    const value = useMemo(() => ({ registry, publishBrief, clearBrief }), [registry, publishBrief, clearBrief]);

    return <TabNewsContext.Provider value={value}>{children}</TabNewsContext.Provider>;
}

/** Read a specific tab's published brief. Returns null when nothing is published. */
export function usePublishedBrief(tabId) {
    const ctx = useContext(TabNewsContext);
    return ctx?.registry?.[tabId] || null;
}

/**
 * Opt-in hook for a Tab component to publish its own news brief
 * whenever its data changes. Pass a falsy brief to clear.
 *
 * Example:
 *   const brief = useMemo(() => ({
 *     bullets: [
 *       { icon: '💊', label: 'ใบสั่งยาวันนี้', value: `${count} ใบ`, tone: 'neutral' },
 *       { icon: '⏱️', label: 'TAT เฉลี่ย', value: `${tat} นาที`, tone: tat > 15 ? 'warn' : 'good' },
 *     ]
 *   }), [count, tat]);
 *   usePublishNews('pharmacy', brief);
 */
export function usePublishNews(tabId, brief) {
    const ctx = useContext(TabNewsContext);
    useEffect(() => {
        if (!ctx || !tabId) return;
        if (brief && brief.bullets && brief.bullets.length > 0) {
            ctx.publishBrief(tabId, brief);
            return () => ctx.clearBrief(tabId);
        }
    }, [tabId, brief, ctx]);
}
