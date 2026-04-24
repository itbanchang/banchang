// ============================================================
// BCH 360° Intelligence V.10 — Centralized API Service
// 🔐 httpOnly cookie auth — credentials: 'include' ทุก request
// 🔄 Auto retry on 401 → refresh → retry
// ============================================================
import type { ApiError, DashboardSummary, SystemStatus, OPDTodayData } from '../types/api';

// ── Config ──
const API_BASE = '/api';
const DEFAULT_TIMEOUT_MS = 15_000;

// ── Custom API Error ──
export class ApiRequestError extends Error {
  status: number;
  data: ApiError | null;

  constructor(message: string, status: number, data: ApiError | null = null) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.data = data;
  }
}

// ── Refresh token state (singleton to prevent parallel refreshes) ──
let _refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
  // Deduplicate: if a refresh is already in-flight, wait for it
  if (_refreshPromise) return _refreshPromise;

  _refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    signal: AbortSignal.timeout(10_000),
  })
    .then(r => r.ok)
    .catch(() => false)
    .finally(() => {
      _refreshPromise = null;
    });

  return _refreshPromise;
}

// ── Core fetch wrapper ──
interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeoutMs?: number;
  skipAuth?: boolean;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { body, timeoutMs = DEFAULT_TIMEOUT_MS, skipAuth = false, ...fetchOpts } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const config: RequestInit = {
    ...fetchOpts,
    credentials: skipAuth ? 'omit' : 'include',
    headers: {
      'Content-Type': 'application/json',
      ...fetchOpts.headers,
    },
    signal: AbortSignal.timeout(timeoutMs),
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let response = await fetch(url, config);

  // ── Auto-retry on 401 (token expired → refresh → retry once) ──
  if (response.status === 401 && !skipAuth) {
    const refreshed = await refreshToken();
    if (refreshed) {
      response = await fetch(url, {
        ...config,
        signal: AbortSignal.timeout(timeoutMs), // fresh signal
      });
    }
  }

  // ── Handle errors ──
  if (!response.ok) {
    let errorData: ApiError | null = null;
    try {
      errorData = await response.json();
    } catch {
      /* response body wasn't JSON */
    }
    throw new ApiRequestError(
      errorData?.error || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorData
    );
  }

  // ── Parse response ──
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  }
  return response.text() as unknown as T;
}

// ============================================================
// Public API Methods
// ============================================================

export const api = {
  /** GET request */
  get<T>(endpoint: string, opts?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return apiFetch<T>(endpoint, { ...opts, method: 'GET' });
  },

  /** POST request */
  post<T>(
    endpoint: string,
    body?: unknown,
    opts?: Omit<FetchOptions, 'method' | 'body'>
  ): Promise<T> {
    return apiFetch<T>(endpoint, { ...opts, method: 'POST', body });
  },

  /** PUT request */
  put<T>(
    endpoint: string,
    body?: unknown,
    opts?: Omit<FetchOptions, 'method' | 'body'>
  ): Promise<T> {
    return apiFetch<T>(endpoint, { ...opts, method: 'PUT', body });
  },

  /** DELETE request */
  delete<T>(endpoint: string, opts?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return apiFetch<T>(endpoint, { ...opts, method: 'DELETE' });
  },
};

// ============================================================
// Domain-Specific Service Functions
// ============================================================

/** Dashboard service */
export const dashboardService = {
  getSummary: () => api.get<DashboardSummary>('/dashboard/summary'),
  getSystemStatus: () => api.get<SystemStatus>('/system/status'),
};

/** OPD service */
export const opdService = {
  getToday: () => api.get<OPDTodayData>('/opd/today'),
  getByClinic: () =>
    api.get<{
      clinics: Array<{
        clinic: string;
        visits: number;
        avg_total: number;
        avg_wait: number;
        still_waiting: number;
      }>;
    }>('/opd/by-clinic'),
  getWaitTrend: () =>
    api.get<{
      trend: Array<{ date: string; visits: number; avg_total: number; avg_wait: number }>;
    }>('/opd/wait-trend'),
  getMonthlyFiscal: () => api.get('/opd/monthly-fiscal'),
  getRevenueFiscal: (start?: string, end?: string) => {
    const params = new URLSearchParams();
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    const qs = params.toString();
    return api.get(`/opd/revenue-fiscal${qs ? `?${qs}` : ''}`);
  },
  getFlowPrediction: () => api.get('/opd/ai/flow-prediction'),
  getWaitOptimizer: () => api.get('/opd/ai/wait-optimizer'),
  getDrilldown: (type: string) => api.get(`/opd/drilldown?type=${type}`),
};

/** Finance service */
export const financeService = {
  getSummary: () => api.get('/finance/today'),
  getMonthlyFiscal: () => api.get('/finance/monthly-fiscal'),
  getRevenueFiscal: () => api.get('/finance/revenue-fiscal'),
};

/** IPD service */
export const ipdService = {
  getToday: () => api.get('/ipd/today'),
  getBedStatus: () => api.get('/ipd/beds'),
};

/** AI service */
export const aiService = {
  getHub: () => api.get('/ai/hub'),
  getInsights: () => api.get('/ai/insights'),
};

/** Auth service */
export const authService = {
  login: (username: string, password: string) =>
    api.post<{ user: { username: string; role: string; full_name: string } }>(
      '/auth/login',
      { username, password },
      { skipAuth: true }
    ),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  me: () => api.get('/auth/me'),
};

// ============================================================
// Convenience Exports (apiGet / apiPost)
// ============================================================
export const apiGet = api.get;
export const apiPost = api.post;

export default api;
