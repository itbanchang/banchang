// ============================================================
// BCH 360° Intelligence V.10 — Dashboard Store (Zustand)
// Replaces DashboardContext with lightweight Zustand store
// Backward-compatible: useDashboard() API preserved
// ============================================================
import { create } from 'zustand';

// Lightweight FNV-1a hash for dedup comparison
function fnv1aHash(obj) {
    const str = typeof obj === 'string' ? obj : quickFingerprint(obj);
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = (hash * 0x01000193) >>> 0;
    }
    return hash;
}

function quickFingerprint(obj, depth = 0) {
    if (depth > 4) return '…';
    if (obj === null || obj === undefined) return 'N';
    const t = typeof obj;
    if (t === 'number' || t === 'boolean') return String(obj);
    if (t === 'string') return obj.length > 64 ? obj.length + ':' + obj.slice(0, 32) + obj.slice(-16) : obj;
    if (Array.isArray(obj)) {
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
        const selectedKeys = keys.length <= 8 ? keys : keys.filter((_, i) => i % Math.ceil(keys.length / 8) === 0);
        for (const k of selectedKeys) parts.push(k + '=' + quickFingerprint(obj[k], depth + 1));
        return '{' + parts.join('|') + '}';
    }
    return String(obj);
}

const CACHE_MAX_AGE = 60000;   // 60s fresh
const CACHE_STALE_AGE = 300000; // 5min stale-while-revalidate

// In-flight request dedup + data cache (outside store to avoid re-renders)
const _inflight = {};
const _dataCache = {};
const _controllers = new Map(); // key → AbortController

function cancelAllInflight() {
    for (const [, ctrl] of _controllers) {
        ctrl.abort();
    }
    _controllers.clear();
    for (const key of Object.keys(_inflight)) {
        delete _inflight[key];
    }
}

// Internal fetch function — called with store's set/get
function createFetchFn(getAuthFn) {
    return async function _doFetch(key, url, set, get, { silent = false } = {}) {
        const controller = new AbortController();
        _controllers.set(key, controller);
        const timeout = setTimeout(() => controller.abort(), 30000);

        const { fetchWithTokenRefresh } = await import('../utils/fetchWithTokenRefresh.js');
        const { tokens, refreshAccessToken } = getAuthFn();

        try {
            const res = await fetchWithTokenRefresh(url, { signal: controller.signal }, () => tokens, refreshAccessToken);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            const cached = _dataCache[key];
            const newHash = fnv1aHash(data);
            if (cached && cached._hash === newHash) {
                cached.t = Date.now();
                if (!silent) set(state => ({ loading: { ...state.loading, [key]: false } }));
                return cached.data;
            }

            // Special handling for ER data
            if (key === 'erTodayPatients') {
                set({
                    erTodayPatients: data.patients || [],
                    erWaitTimeForecast: data.wait_time_forecast || null,
                    loading: { ...get().loading, [key]: false },
                    lastUpdated: Date.now(),
                });
            } else if (key === 'erTriageStats') {
                set({
                    erTriageStats: data.stats || [],
                    loading: { ...get().loading, [key]: false },
                    lastUpdated: Date.now(),
                });
            } else {
                set(state => ({
                    [key]: data,
                    loading: { ...state.loading, [key]: false },
                    lastUpdated: Date.now(),
                }));
            }

            _dataCache[key] = { data, _hash: newHash, t: Date.now() };
            return data;
        } catch (err) {
            const errorMsg = err.name === 'AbortError' ? 'Request timeout' : err.message;
            set(state => ({ errors: { ...state.errors, [key]: errorMsg } }));
            return null;
        } finally {
            clearTimeout(timeout);
            _controllers.delete(key);
            if (!silent) set(state => ({ loading: { ...state.loading, [key]: false } }));
            delete _inflight[key];
        }
    };
}

export function createDashboardStore(getAuthFn) {
    const _doFetch = createFetchFn(getAuthFn);

    return create((set, get) => ({
        // ── State ──
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
        },

        // ── Actions ──
        setTab: (tab) => {
            cancelAllInflight();
            set({ activeTab: tab });
        },

        dispatch: (action) => {
            // Backward compatibility for useWebSocket and other direct dispatch users
            switch (action.type) {
                case 'SET_DATA':
                    if (action.key === 'erTodayPatients') {
                        set({
                            erTodayPatients: action.payload?.patients || [],
                            erWaitTimeForecast: action.payload?.wait_time_forecast || null,
                            loading: { ...get().loading, [action.key]: false },
                        });
                    } else if (action.key === 'erTriageStats') {
                        set({
                            erTriageStats: action.payload?.stats || [],
                            loading: { ...get().loading, [action.key]: false },
                        });
                    } else {
                        set(state => ({
                            [action.key]: action.payload,
                            loading: { ...state.loading, [action.key]: false },
                        }));
                    }
                    break;
                case 'SET_LOADING':
                    set(state => ({ loading: { ...state.loading, [action.key]: action.payload } }));
                    break;
                case 'SET_ERROR':
                    set(state => ({ errors: { ...state.errors, [action.key]: action.payload } }));
                    break;
                case 'ADD_ALERT':
                    set(state => ({ emergencyAlerts: [action.payload, ...state.emergencyAlerts].slice(0, 20) }));
                    break;
                case 'DISMISS_ALERT':
                    set(state => ({ emergencyAlerts: state.emergencyAlerts.filter((_, i) => i !== action.payload) }));
                    break;
                case 'SET_LAST_UPDATED':
                    set({ lastUpdated: action.payload });
                    break;
                case 'OPEN_DRILL_DOWN':
                    set({ drillDown: { isOpen: true, kpiId: action.kpiId, title: action.title, data: null, loading: true } });
                    break;
                case 'CLOSE_DRILL_DOWN':
                    set({ drillDown: { isOpen: false, kpiId: null, title: '', data: null, loading: false } });
                    break;
                case 'SET_DRILL_DOWN_DATA':
                    set(state => ({ drillDown: { ...state.drillDown, data: action.payload, loading: false } }));
                    break;
            }
        },

        fetchData: async (key, url) => {
            if (_inflight[key]) return _inflight[key];

            const cached = _dataCache[key];
            const age = cached ? Date.now() - cached.t : Infinity;

            // Fresh cache — skip network
            if (cached && age < CACHE_MAX_AGE && cached.data) {
                return cached.data;
            }

            // Stale-while-revalidate
            if (cached && age < CACHE_STALE_AGE && cached.data) {
                const bgPromise = _doFetch(key, url, set, get, { silent: true });
                _inflight[key] = bgPromise;
                return cached.data;
            }

            // Full fetch
            set(state => ({ loading: { ...state.loading, [key]: true }, errors: { ...state.errors, [key]: null } }));
            const promise = _doFetch(key, url, set, get);
            _inflight[key] = promise;
            return promise;
        },

        fetchParallel: async (requests) => {
            return Promise.all(requests.map(([key, url]) => get().fetchData(key, url)));
        },

        batchFetch: async (endpointMap) => {
            const entries = Object.entries(endpointMap);
            const results = await Promise.allSettled(
                entries.map(([key, url]) => get().fetchData(key, url).then(data => [key, data]))
            );
            const out = {};
            for (const result of results) {
                if (result.status === 'fulfilled' && result.value) {
                    const [key, data] = result.value;
                    out[key] = data;
                }
            }
            return out;
        },

        addAlert: (alert) => set(state => ({
            emergencyAlerts: [alert, ...state.emergencyAlerts].slice(0, 20)
        })),

        dismissAlert: (index) => set(state => ({
            emergencyAlerts: state.emergencyAlerts.filter((_, i) => i !== index)
        })),

        openDrillDown: async (kpiId, title, endpoint) => {
            set({ drillDown: { isOpen: true, kpiId, title, data: null, loading: true } });
            if (endpoint) {
                try {
                    const { fetchWithTokenRefresh } = await import('../utils/fetchWithTokenRefresh.js');
                    const { tokens, refreshAccessToken } = getAuthFn();
                    const res = await fetchWithTokenRefresh(endpoint, {}, () => tokens, refreshAccessToken);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data = await res.json();
                    set(state => ({ drillDown: { ...state.drillDown, data, loading: false } }));
                } catch (err) {
                    set(state => ({ drillDown: { ...state.drillDown, data: { error: err.message }, loading: false } }));
                }
            }
        },

        closeDrillDown: () => set({
            drillDown: { isOpen: false, kpiId: null, title: '', data: null, loading: false }
        }),
    }));
}
