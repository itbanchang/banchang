// ============================================================
// BCH 360° Intelligence V.10 — Authentication Context
// Phase 2: httpOnly cookie-based auth — tokens never in JavaScript
// ============================================================
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const bypassAuth = true; // Login disabled — direct dashboard access
  const [user, setUser]       = useState(bypassAuth ? { username: 'admin', role: 'admin', full_name: 'Administrator' } : null);
  const [loading, setLoading] = useState(bypassAuth ? false : true);
  const [error, setError]     = useState(null);

  // ── Login — server sets httpOnly cookies; we only store user profile ──
  const login = useCallback(async (username, password) => {
    if (bypassAuth) {
      setUser({ username: 'admin', role: 'admin', full_name: 'Administrator' });
      return { user: { username: 'admin', role: 'admin', full_name: 'Administrator' } };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',   // required for Set-Cookie to work
        body:        JSON.stringify({ username, password }),
        signal:      AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [bypassAuth]);

  // ── Logout — clears server-side cookies and local user state ──
  const logout = useCallback(async () => {
    if (bypassAuth) {
      setUser(null);
      return;
    }
    try {
      await fetch('/api/auth/logout', {
        method:      'POST',
        credentials: 'include'
      });
    } catch { /* ignore network errors on logout */ }
    setUser(null);
  }, [bypassAuth]);

  // ── Refresh — server rotates the accessToken cookie silently ──
  const refreshAccessToken = useCallback(async () => {
    if (bypassAuth) return true;
    try {
      const response = await fetch('/api/auth/refresh', {
        method:      'POST',
        credentials: 'include',
        signal:      AbortSignal.timeout(10000)
      });
      if (!response.ok) {
        await logout();
        return null;
      }
      return true; // Cookie was refreshed; nothing to store in JS
    } catch {
      await logout();
      return null;
    }
  }, [logout, bypassAuth]);

  // ── On mount: verify session with server (cookie already sent by browser) ──
  useEffect(() => {
    if (bypassAuth) {
      setLoading(false);
      return;
    }

    fetch('/api/auth/me', { credentials: 'include', signal: AbortSignal.timeout(8000) })
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (data?.user) setUser(data.user); })
      .catch(() => { /* not logged in — stay as null */ })
      .finally(() => setLoading(false));
  }, [bypassAuth]);

  const value = {
    user,
    setUser,
    tokens: null,         // kept for API compat — tokens are now in httpOnly cookies
    loading,
    error,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
