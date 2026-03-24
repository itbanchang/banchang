// ============================================================
// Secure Fetch Wrapper — Cookie-based auth (httpOnly)
// Tokens live in httpOnly cookies; browser sends them automatically.
// This wrapper only handles 401 → refresh → retry logic.
// ============================================================

/**
 * Fetch with automatic token refresh on 401
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @param {*} _unused - (legacy: was getTokens — no longer needed with cookie auth)
 * @param {function} refreshToken - Function to call /api/auth/refresh
 * @returns {Promise<Response>}
 */
export async function fetchWithTokenRefresh(url, options = {}, _unused, refreshToken) {
  // credentials: 'include' sends httpOnly cookies automatically
  const opts = { ...options, credentials: 'include' };

  let response = await fetch(url, opts);

  // If 401, try refreshing the cookie and retry once
  if (response.status === 401 && refreshToken) {
    try {
      await refreshToken();
      response = await fetch(url, opts);
    } catch (err) {
      // Refresh failed — propagate original 401
    }
  }

  return response;
}

/**
 * Create a bound fetch function for a component.
 * Usage:
 *   const { refreshAccessToken } = useAuth();
 *   const api = createBoundFetch(null, refreshAccessToken);
 *   const response = await api('/api/dashboard');
 *
 * Note: first argument (tokens) is kept for backward-compat but is ignored.
 */
export function createBoundFetch(_tokens, refreshAccessToken) {
  return (url, options = {}) =>
    fetchWithTokenRefresh(url, options, null, refreshAccessToken);
}
