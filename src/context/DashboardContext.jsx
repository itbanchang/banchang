// ============================================================
// BCH 360° Intelligence V.10 - Dashboard Context
// Optimized — Parallel fetch, deduplication, stale-while-revalidate
// ============================================================
import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const inflightRef = useRef({}); // Prevent duplicate fetches
    const dataCacheRef = useRef({}); // Client-side data cache with timestamps

    const setTab = useCallback((tab) => {
        dispatch({ type: 'SET_TAB', payload: tab });
    }, []);

    // Optimized fetch with deduplication + client-side SWR cache
    const fetchData = useCallback(async (key, url) => {
        // If already fetching the same key, return existing promise
        if (inflightRef.current[key]) return inflightRef.current[key];

        // Client-side cache: if data is fresh (<60s), skip network entirely
        const cached = dataCacheRef.current[key];
        if (cached && Date.now() - cached.t < 60000 && cached.data) {
            // Data is still fresh — return immediately without network request
            return cached.data;
        }

        dispatch({ type: 'SET_LOADING', key, payload: true });
        dispatch({ type: 'SET_ERROR', key, payload: null });

        // AbortController with 15s timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const promise = fetch(url, { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                const cached = dataCacheRef.current[key];
                // ⚡ Frontend Optimization: Prevent React re-renders if data is identical
                if (cached && JSON.stringify(cached.data) === JSON.stringify(data)) {
                    cached.t = Date.now(); // Extend cache TTL
                    dispatch({ type: 'SET_LOADING', key, payload: false });
                    return data;
                }

                dispatch({ type: 'SET_DATA', key, payload: data });
                dataCacheRef.current[key] = { data, t: Date.now() };
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
                dispatch({ type: 'SET_LOADING', key, payload: false });
                delete inflightRef.current[key];
            });

        inflightRef.current[key] = promise;
        return promise;
    }, []);

    // Fetch multiple URLs in parallel
    const fetchParallel = useCallback(async (requests) => {
        return Promise.all(requests.map(([key, url]) => fetchData(key, url)));
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
                const res = await fetch(endpoint);
                const data = await res.json();
                dispatch({ type: 'SET_DRILL_DOWN_DATA', payload: data });
            } catch (err) {
                console.error('Drill-down fetch error:', err);
                dispatch({ type: 'SET_DRILL_DOWN_DATA', payload: { error: err.message } });
            }
        }
    }, []);

    const closeDrillDown = useCallback(() => {
        dispatch({ type: 'CLOSE_DRILL_DOWN' });
    }, []);

    return (
        <DashboardContext.Provider value={{
            state, dispatch, setTab, fetchData, fetchParallel,
            addAlert, dismissAlert, openDrillDown, closeDrillDown
        }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) throw new Error('useDashboard must be used within DashboardProvider');
    return context;
}
