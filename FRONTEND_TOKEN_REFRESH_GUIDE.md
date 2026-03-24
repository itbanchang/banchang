# 🔄 FRONTEND INTEGRATION GUIDE — Token Refresh Implementation

**Purpose**: Update React frontend to handle new 30-minute access token expiration  
**Estimated Time**: 1-2 hours  
**Priority**: 🔴 CRITICAL before deployment

---

## 📊 New Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│ Login                                                   │
│ POST /api/auth/login                                    │
│ ├─ accessToken (30 min)                                 │
│ ├─ refreshToken (24h)                                   │
│ └─ user info                                            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
             ┌─────────────────────────┐
             │ Store tokens in state   │
             │ accessToken (memory)    │
             │ refreshToken (secure)   │
             └─────────────────────────┘
                           │
                ┌──────────┼──────────┐
                ▼          ▼          ▼
        29 min passed   Logout    API returns
        (auto-refresh)  (clear)   401 Unauthorized
                │                       │
                ▼                       ▼
    POST /api/auth/refresh    Retry with new token
    └─ Get new accessToken   (if refresh succeeds)
       │
       ├─ Success: Update token + continue request
       └─ Fail: Redirect to login
```

---

## 🛠️ Implementation Steps

### Step 1: Update Context (useAuth Hook)

**File**: `src/context/DashboardContext.jsx` or create `src/hooks/useAuth.js`

```javascript
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [tokenExpiresAt, setTokenExpiresAt] = useState(null);

  // ──── Login ────
  const login = useCallback(async (username, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const { accessToken, refreshToken, user } = await response.json();

    // Store tokens (30min = 1800s)
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Set expiry: 30 min = 1800 * 1000 ms
    const expiresAt = Date.now() + 30 * 60 * 1000;
    setTokenExpiresAt(expiresAt);
    localStorage.setItem('tokenExpiresAt', expiresAt);

    setUser(user);
    return { accessToken, user };
  }, []);

  // ──── Refresh Token ────
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        // Refresh failed, redirect to login
        logout();
        throw new Error('Session expired. Please login again.');
      }

      const { accessToken: newAccessToken } = await response.json();

      // Update tokens
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);

      // Reset expiry timer
      const expiresAt = Date.now() + 30 * 60 * 1000;
      setTokenExpiresAt(expiresAt);
      localStorage.setItem('tokenExpiresAt', expiresAt);

      return newAccessToken;
    } catch (err) {
      logout();
      throw err;
    }
  }, [refreshToken]);

  // ──── Logout ────
  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setTokenExpiresAt(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
  }, []);

  // ──── Token Status ────
  const isTokenExpiringSoon = () => {
    if (!tokenExpiresAt) return false;
    const timeUntilExpiry = tokenExpiresAt - Date.now();
    return timeUntilExpiry < 2 * 60 * 1000; // Within 2 minutes
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      refreshToken,
      login,
      logout,
      refreshAccessToken,
      isTokenExpiringSoon,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### Step 2: Create Fetch Interceptor

**File**: `src/hooks/useFetch.js` or `src/utils/apiClient.js`

```javascript
import { useAuth } from './useAuth';
import { useCallback } from 'react';

export function useAPI() {
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const fetchWithAuth = useCallback(async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    };

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });

    // ──── Handle 401 (Token Expired) ────
    if (response.status === 401) {
      try {
        // Try to refresh token
        await refreshAccessToken();

        // Retry request with new token
        const newToken = localStorage.getItem('accessToken');
        headers['Authorization'] = `Bearer ${newToken}`;

        response = await fetch(url, {
          ...options,
          headers,
          credentials: 'include'
        });
      } catch (err) {
        // Refresh failed, user is logged out
        logout();
        window.location.href = '/login';
        throw new Error('Session expired. Redirecting to login...');
      }
    }

    // ──── Handle other errors ────
    if (!response.ok) {
      const error = new Error(`API Error: ${response.status}`);
      error.status = response.status;
      error.response = response;
      throw error;
    }

    return response;
  }, [accessToken, refreshAccessToken, logout]);

  return fetchWithAuth;
}
```

---

### Step 3: Update API Calls

**Before** ❌:
```javascript
// src/components/FinanceTab.jsx
const response = await fetch('/api/finance/monthly-summary', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

**After** ✅:
```javascript
// src/components/FinanceTab.jsx
import { useAPI } from '../hooks/useAPI';

function FinanceTab() {
  const fetchAPI = useAPI();

  useEffect(() => {
    // useAPI handles token refresh automatically
    fetchAPI('/api/finance/monthly-summary').then(res => res.json());
  }, [fetchAPI]);
  // ...
}
```

---

### Step 4: Auto-Refresh Before Expiration

**File**: `src/hooks/useTokenRefresh.js`

```javascript
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export function useTokenRefresh() {
  const { isTokenExpiringSoon, refreshAccessToken } = useAuth();

  useEffect(() => {
    // Check every minute if token is expiring soon
    const interval = setInterval(async () => {
      if (isTokenExpiringSoon()) {
        try {
          await refreshAccessToken();
          console.log('✅ Token refreshed automatically');
        } catch (err) {
          console.error('❌ Auto-refresh failed:', err);
        }
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [isTokenExpiringSoon, refreshAccessToken]);
}
```

**Use in App.jsx**:
```javascript
function App() {
  useTokenRefresh();  // Auto-refresh tokens
  // ... rest of app
}
```

---

### Step 5: Update Login Page

**File**: `src/pages/LoginPage.jsx`

```javascript
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      console.log('✅ Login successful:', result.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### Step 6: Update App.jsx

```javascript
import { AuthProvider } from './context/AuthContext';
import { useTokenRefresh } from './hooks/useTokenRefresh';

function AppContent() {
  useTokenRefresh();  // Enable auto-refresh
  // ... rest of app
  return <FinanceTab />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
```

---

## 🧪 Testing the Token Refresh

### Test 1: Manual Token Refresh
```javascript
// In browser console
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refreshToken: localStorage.getItem('refreshToken')
  })
});
const data = await response.json();
console.log('New token:', data.accessToken);
```

### Test 2: Verify Token Expiration
```javascript
// Check token expiry time
const expiresAt = localStorage.getItem('tokenExpiresAt');
const now = Date.now();
const minutesLeft = (expiresAt - now) / 60000;
console.log(`Token expires in ${minutesLeft} minutes`);
```

### Test 3: Force Token Expiration
```javascript
// Manually expire token to test refresh flow
localStorage.setItem('tokenExpiresAt', Date.now() - 1000);
// Now make an API call - should auto-refresh transparently
```

---

## 📋 Checklist Before Deploying

- [ ] AuthProvider wraps entire app in `App.jsx`
- [ ] useAPI hook used for all `/api/` calls
- [ ] useTokenRefresh hook in main App component
- [ ] Login page updated to use new login flow
- [ ] Logout button clears all tokens
- [ ] Error handling for 401 responses
- [ ] Token refresh rate: every 60 seconds or before 2min expiry
- [ ] Refresh token stored securely (localStorage at minimum)
- [ ] No hardcoded tokens in code
- [ ] Tested with expired token (should auto-refresh)
- [ ] Tested with invalid refresh token (should logout)

---

## ⚠️ Security Notes

- **Access Token**: Keep in memory (shorter lived, more secure)
- **Refresh Token**: Store in localStorage/sessionStorage (needed across page refreshes)
- **Token in URL**: Never include tokens in URL parameters
- **XSS Protection**: Ensure CSP headers prevent token theft
- **HTTPS Only**: Always use HTTPS in production (tokens exposed over HTTP!)

---

## 📞 Debugging

### Common Issues

**"No refreshToken available"**
- Solution: User needs to login again
- Root cause: Refresh token not stored properly

**"Session expired. Please login again"**
- Solution: Automatic (redirects to `/login`)
- Root cause: Refresh token invalid/expired (24h limit)
- Recovery: User logs in again

**Token persists after logout
- Solution: Check logout function clears localStorage
- Root cause: Token not removed from storage

**API calls return 401 even after refresh**
- Solution: Check JWT_SECRET and REFRESH_TOKEN_SECRET match on backend
- Root cause: Token created with different secret

---

*Frontend integration guide: March 17, 2026*
