// ============================================================
// BCH 360° Intelligence V.10 - Dashboard Context
// Optimized — Parallel fetch, deduplication, stale-while-revalidate
// ============================================================
import React, { createContext, useContext, useReducer, useCallback, useRef, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { fetchWithTokenRefresh } from '../utils/fetchWithTokenRefresh.js';

// Lightweight FNV-1a hash — replaces JSON.stringify comparison for deduplication
function fnv1aHash(obj) {
    const str = typeof obj === 'string' ? obj : quickFingerprint(obj);
    let hash = 0x811c9dc5; // FNV offset basis
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = (hash * 0x01000193) >>> 0; // FNV prime, keep 32-bit unsigned
    }
    return hash;
}

// Build a lightweight fingerprint string from an object's structure + leaf values
// Much cheaper than JSON.stringify for large payloads
function quickFingerprint(obj, depth = 0) {
    if (depth > 4) return '…';
    if (obj === null || obj === undefined) return 'N';
    const t = typeof obj;
    if (t === 'number' || t === 'boolean') return String(obj);
    if (t === 'string') return obj.length > 64 ? obj.length + ':' + obj.slice(0, 32) + obj.slice(-16) : obj;
    if (Array.isArray(obj)) {
        // Sample first, middle, last items + length for arrays
        const len = obj.length;
        if (len === 0) return '[]';
        const parts = [len];
        const indices = len <= 3 ? [0, 1, 2].filter(i => i < len) : [0, Math.floor(len / 2), len - 1];
        for (const i of indices) parts.push(quickFingerprint(obj[i], depth + 1));
        return '[' + parts.join('|') + ']';
    }
    if (t === 'object') {
        const keys = Object.keys(obj);
        const parts = [keys.length];
        // Use all keys for small objects, sample for large ones
        const selectedKeys = keys.length <= 8 ? keys : keys.filter((_, i) => i % Math.ceil(keys.length / 8) === 0);
        for (const k of selectedKeys) parts.push(k + '=' + quickFingerprint(obj[k], depth + 1));
        return '{' + parts.join('|') + '}';
    }
    return String(obj);
}

const CACHE_MAX_AGE = 60000;   // 60s — fresh cache, skip network
const CACHE_STALE_AGE = 300000; // 5min — serve stale, revalidate in background

const DashboardContext = createContext(null);

const initialState = {
    activeTab: 'finance',
    dashboardSummary: null,
    financeSummary: null,
    claims: [],
    claimStats: null,
    denialAnalytics: null,
    revenueLeakage: null,
    bedOccupancy: null,
    admissions: [],
    alosData: null,
    riskPatients: [],
    riskStats: null,
    riskDistribution: null,
    resourceElasticity: null,
    emergencyAlerts: [],
    denialPrediction: null,
    underCharging: null,
    paymentVariance: null,
    paymentPropensity: null,
    erTodayPatients: [],
    erTriageStats: [],
    erWaitTimeForecast: null,
    erBottlenecks: null,
    erSurge: null,
    erResusAlert: null,
    erDiversionStatus: null,
    ncdGoalAttainment: null,
    medRecToday: null,
    medRecAnalytics: null,
    dialysisToday: null,
    dialysisTrend: null,
    dqStatus: null,
    loading: {},
    errors: {},
    lastUpdated: null,
    user: { role: 'admin', full_name: 'Dashboard' },
    drillDown: {
        isOpen: false,
        kpiId: null,
        title: '',
        data: null,
        loading: false
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TAB':
            return { ...state, activeTab: action.payload };
        case 'SET_DATA': {
            const key = action.key;
            const data = action.payload;
            if (!data) return { ...state, loading: { ...state.loading, [key]: false } };

            // Special handling for ER Today Patients (which now includes patients array and forecast)
            if (key === 'erTodayPatients') {
                return {
                    ...state,
                    erTodayPatients: data.patients || [],
                    erWaitTimeForecast: data.wait_time_forecast || null,
                    loading: { ...state.loading, [key]: false }
                };
            }

            // Special handling for ER Triage Stats
            if (key === 'erTriageStats') {
                return {
                    ...state,
                    erTriageStats: data.stats || [],
                    loading: { ...state.loading, [key]: false }
                };
            }

            return {
                ...state,
                [key]: data,
                loading: { ...state.loading, [key]: false }
            };
        }
        case 'SET_LOADING':
            return { ...state, loading: { ...state.loading, [action.key]: action.payload } };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.key]: action.payload } };
        case 'ADD_ALERT':
            return { ...state, emergencyAlerts: [action.payload, ...state.emergencyAlerts].slice(0, 20) };
        case 'DISMISS_ALERT':
            return { ...state, emergencyAlerts: state.emergencyAlerts.filter((_, i) => i !== action.payload) };
        case 'SET_LAST_UPDATED':
            return { ...state, lastUpdated: action.payload };
        case 'OPEN_DRILL_DOWN':
            return {
                ...state,
                drillDown: {
                    ...state.drillDown,
                    isOpen: true,
                    kpiId: action.kpiId,
                    title: action.title,
                    data: null,
                    loading: true
                }
            };
        case 'CLOSE_DRILL_DOWN':
            return {
                ...state,
                drillDown: {
                    ...state.drillDown,
                    isOpen: false,
                    kpiId: null,
                    data: null
                }
            };
        case 'SET_DRILL_DOWN_DATA':
            return {
                ...state,
                drillDown: {
                    ...state.drillDown,
                    data: action.payload,
                    loading: false
                }
            };
        default:
            return state;
    }
}

export function DashboardProvider({ children }) {
    // ── Get authentication tokens for API calls ──
    const { tokens, refreshAccessToken } = useAuth();

    const [state, dispatch] = useReducer(reducer, initialState);
    const inflightRef = useRef({}); // Prevent duplicate fetches
    const dataCacheRef = useRef({}); // Client-side data cache with timestamps

    const setTab = useCallback((tab) => {
        dispatch({ type: 'SET_TAB', payload: tab });
    }, []);

    // Core network fetch — separated so SWR can call it without setting loading state
    const _doFetch = useCallback((key, url, { silent = false } = {}) => {
        // AbortController with 30s timeout (must be longer than backend 25s queries)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const promise = fetchWithTokenRefresh(url, { signal: controller.signal }, () => tokens, refreshAccessToken)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                const cached = dataCacheRef.current[key];
                // Use lightweight hash instead of JSON.stringify for dedup comparison
                const newHash = fnv1aHash(data);
                if (cached && cached._hash === newHash) {
                    cached.t = Date.now(); // Extend cache TTL
                    if (!silent) dispatch({ type: 'SET_LOADING', key, payload: false });
                    return cached.data; // Return cached reference to avoid re-render
                }

                dispatch({ type: 'SET_DATA', key, payload: data });
                dataCacheRef.current[key] = { data, _hash: newHash, t: Date.now() };
                dispatch({ type: 'SET_LAST_UPDATED', payload: Date.now() });
                return data;
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    dispatch({ type: 'SET_ERROR', key, payload: 'Request timeout' });
                } else {
                    dispatch({ type: 'SET_ERROR', key, payload: err.message });
                }
                return null;
            })
            .finally(() => {
                clearTimeout(timeout);
                if (!silent) dispatch({ type: 'SET_LOADING', key, payload: false });
                delete inflightRef.current[key];
            });

        return promise;
    }, [tokens, refreshAccessToken]);

    // Optimized fetch with deduplication + stale-while-revalidate + hash-based comparison
    const fetchData = useCallback(async (key, url) => {
        // If already fetching the same key, return existing promise
        if (inflightRef.current[key]) return inflightRef.current[key];

        const cached = dataCacheRef.current[key];
        const age = cached ? Date.now() - cached.t : Infinity;

        // Fresh cache (<60s): skip network entirely
        if (cached && age < CACHE_MAX_AGE && cached.data) {
            return cached.data;
        }

        // Stale-while-revalidate (<5min): return cached data immediately,
        // kick off a silent background refresh
        if (cached && age < CACHE_STALE_AGE && cached.data) {
            const bgPromise = _doFetch(key, url, { silent: true });
            inflightRef.current[key] = bgPromise;
            return cached.data;
        }

        // No cache or expired: full fetch with loading state
        dispatch({ type: 'SET_LOADING', key, payload: true });
        dispatch({ type: 'SET_ERROR', key, payload: null });

        const promise = _doFetch(key, url);
        inflightRef.current[key] = promise;
        return promise;
    }, [_doFetch]);

    // Fetch multiple URLs in parallel
    const fetchParallel = useCallback(async (requests) => {
        return Promise.all(requests.map(([key, url]) => fetchData(key, url)));
    }, [fetchData]);

    // Batch fetch: request multiple endpoints in one call, returns { key: data } map
    // Tabs can call: batchFetch({ opdStats: '/api/opd/stats', opdQueue: '/api/opd/queue' })
    const batchFetch = useCallback(async (endpointMap) => {
        const entries = Object.entries(endpointMap);
        const results = await Promise.allSettled(
            entries.map(([key, url]) => fetchData(key, url).then(data => [key, data]))
        );
        const out = {};
        for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
                const [key, data] = result.value;
                out[key] = data;
            }
        }
        return out;
    }, [fetchData]);

    const addAlert = useCallback((alert) => {
        dispatch({ type: 'ADD_ALERT', payload: alert });
    }, []);

    const dismissAlert = useCallback((index) => {
        dispatch({ type: 'DISMISS_ALERT', payload: index });
    }, []);

    const openDrillDown = useCallback(async (kpiId, title, endpoint) => {
        dispatch({ type: 'OPEN_DRILL_DOWN', kpiId, title });
        if (endpoint) {
            try {
                const res = await fetchWithTokenRefresh(endpoint, {}, () => tokens, refreshAccessToken);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                dispatch({ type: 'SET_DRILL_DOWN_DATA', payload: data });
            } catch (err) {
                console.error('Drill-down fetch error:', err);
                dispatch({ type: 'SET_DRILL_DOWN_DATA', payload: { error: err.message } });
            }
        }
    }, [tokens, refreshAccessToken]);

    const closeDrillDown = useCallback(() => {
        dispatch({ type: 'CLOSE_DRILL_DOWN' });
    }, []);

    // Memoize context value to prevent unnecessary re-renders of consumers
    // Only creates a new object when one of the dependencies actually changes
    const contextValue = useMemo(() => ({
        state, dispatch, setTab, fetchData, fetchParallel, batchFetch,
        addAlert, dismissAlert, openDrillDown, closeDrillDown
    }), [state, dispatch, setTab, fetchData, fetchParallel, batchFetch,
         addAlert, dismissAlert, openDrillDown, closeDrillDown]);

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) throw new Error('useDashboard must be used within DashboardProvider');
    return context;
}

/**
 * Selector hook — API-compatible with the Zustand-based version on master
 * so tabs written for either branch work here.
 *
 * Note: since this branch backs the store with useReducer + useContext, any
 * dispatch already re-renders every consumer of the context regardless of
 * which slice changed. The "shallow" in the name matches master's API; there
 * is no extra memoisation to add here because the outer object identity
 * tracks state identity one-to-one (state is already spread-copied on every
 * dispatch). Downstream useMemo/useEffect deps should key on the INNER
 * slice (e.g. `state.opdToday`) whose reference is stable when that slice
 * hasn't changed.
 *
 * Usage:
 *   const { opdToday, loading } = useShallowDashboardSelector(s => ({
 *     opdToday: s.opdToday,
 *     loading: s.loading,
 *   }));
 */
export function useShallowDashboardSelector(selector) {
    const { state } = useDashboard();
    return selector(state);
}

/**
 * Stable-reference action accessors. Each function is already memoised
 * inside DashboardProvider, so this hook just forwards them.
 *
 * Usage:
 *   const { fetchData, setTab } = useDashboardActions();
 */
export function useDashboardActions() {
    const ctx = useDashboard();
    return useMemo(() => ({
        setTab: ctx.setTab,
        dispatch: ctx.dispatch,
        fetchData: ctx.fetchData,
        fetchParallel: ctx.fetchParallel,
        batchFetch: ctx.batchFetch,
        addAlert: ctx.addAlert,
        dismissAlert: ctx.dismissAlert,
        openDrillDown: ctx.openDrillDown,
        closeDrillDown: ctx.closeDrillDown,
    }), [
        ctx.setTab, ctx.dispatch, ctx.fetchData, ctx.fetchParallel, ctx.batchFetch,
        ctx.addAlert, ctx.dismissAlert, ctx.openDrillDown, ctx.closeDrillDown,
    ]);
}
