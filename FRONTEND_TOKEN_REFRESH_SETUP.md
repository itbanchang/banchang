# Frontend Token Refresh Implementation Guide

## Overview
This guide explains how to integrate the new token refresh system into your React components. The system automatically handles:
- User login with JWT tokens
- Token storage in localStorage
- Automatic token refresh when expired (401 response)
- Logout and session cleanup

## Files Created

### 1. **AuthContext** (`src/context/AuthContext.jsx`)
Central authentication state manager. Provides:
- `user` - Current logged-in user object
- `tokens` - { accessToken, refreshToken }
- `login(username, password)` - Authenticate user
- `logout()` - Clear session
- `refreshAccessToken()` - Get new access token using refresh token
- `isAuthenticated` - Boolean flag

### 2. **useAuth Hook** (`src/hooks/useAuth.js`)
Custom hook to access authentication context in any component.

### 3. **fetchWithTokenRefresh** (`src/utils/fetchWithTokenRefresh.js`)
Utility for making API calls with automatic token refresh.

## Step-by-Step Implementation

### Step 1: Wrap App with AuthProvider

In your main `main.jsx` or `App.jsx`:

```jsx
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
```

### Step 2: Create Login Component

```jsx
// src/components/LoginForm.jsx
import { useAuth } from '../hooks/useAuth.js';
import { useState } from 'react';

export default function LoginForm() {
  const { login, error, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Redirect to dashboard or home
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
```

### Step 3: Make Authenticated API Calls

**Method 1: Using fetchWithTokenRefresh utility**

```jsx
import { useAuth } from '../hooks/useAuth.js';
import { fetchWithTokenRefresh } from '../utils/fetchWithTokenRefresh.js';
import { useEffect, useState } from 'react';

export default function DashboardComponent() {
  const { tokens, refreshAccessToken } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithTokenRefresh(
          '/api/dashboard/summary',
          {},
          () => tokens,
          refreshAccessToken
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    if (tokens?.accessToken) {
      fetchData();
    }
  }, [tokens, refreshAccessToken]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

**Method 2: Using createBoundFetch (recommended)**

```jsx
import { useAuth } from '../hooks/useAuth.js';
import { createBoundFetch } from '../utils/fetchWithTokenRefresh.js';
import { useEffect, useState, useCallback } from 'react';

export default function DashboardComponent() {
  const { tokens, refreshAccessToken } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Create a bound fetch function
  const apiFetch = useCallback(
    createBoundFetch(tokens, refreshAccessToken),
    [tokens, refreshAccessToken]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch('/api/dashboard/summary');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    if (tokens?.accessToken) {
      fetchData();
    }
  }, [apiFetch, tokens?.accessToken]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### Step 4: Create Logout Button

```jsx
import { useAuth } from '../hooks/useAuth.js';

export default function UserMenu() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div>
      <span>Welcome, {user?.full_name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## Token Refresh Flow

### How It Works

1. **User logs in** → `/api/auth/login` returns `accessToken` (30min) + `refreshToken` (24h)
2. **API calls use accessToken** → Added as `Authorization: Bearer {token}` header
3. **AccessToken expires** → API returns 401 Unauthorized
4. **Auto refresh triggered** → Client sends `refreshToken` to `/api/auth/refresh`
5. **New accessToken received** → Request retried with new token
6. **User stays logged in** → Unless refresh token also expires (24h)

### Diagram

```
┌─────────────┐
│   Login     │ → POST /api/auth/login
│ admin/pass  │   ← { accessToken (30m), refreshToken (24h) }
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│  Make API Request               │
│  Authorization: Bearer {access} │ → GET /api/dashboard
└──────────┬──────────────────────┘
           │
      ┌────┴─────┐
      │           │
   200/OK      401 Expired
      │           │
      ▼           ▼
  Return      POST /api/auth/refresh
  Data        { refreshToken }
              ↓
              {newAccessToken}
              ↓
         RETRY request with new token
              ↓
           return Data
```

## Testing the Implementation

### Test 1: Verify Login Works
```javascript
// In browser console
const login = async () => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'bch@dm1n2026' })
  });
  const data = await res.json();
  console.log('Tokens:', data);
};
login();
```

### Test 2: Verify Token Refresh
```javascript
// Get a valid refresh token from localStorage first
const refreshToken = async () => {
  const tokens = JSON.parse(localStorage.getItem('bch_tokens'));
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: tokens.refreshToken })
  });
  const data = await res.json();
  console.log('New token:', data.accessToken);
};
refreshToken();
```

### Test 3: Verify Auto-Refresh on 401
```javascript
// Make a request with an old/expired token
const testApiCall = async () => {
  const tokens = JSON.parse(localStorage.getItem('bch_tokens'));
  const res = await fetch('/api/dashboard/summary', {
    headers: { 'Authorization': `Bearer ${tokens.accessToken}` }
  });
  console.log('Status:', res.status); // Should auto-refresh and return 200
};
testApiCall();
```

## Environment Variables

Make sure your `.env` file contains:

```env
# JWT Secrets (REQUIRED)
JWT_SECRET=<your-secret>
REFRESH_TOKEN_SECRET=<another-secret>

# Default users (for testing)
DEFAULT_ADMIN_PASSWORD=bch@dm1n2026
DEFAULT_DIRECTOR_PASSWORD=dir@ctor2026
```

## Security Considerations

✅ **What's Implemented:**
- Short-lived access tokens (30 minutes)
- Separate long-lived refresh tokens (24 hours)
- Tokens stored in localStorage (XSS vulnerable, use HttpOnly cookies in production)
- Automatic token refresh on 401
- Rate limiting on login (5 attempts/15 min)
- Password hashing with bcrypt

⚠️ **For Production:**
1. Use HttpOnly cookies instead of localStorage
2. Implement CSRF protection
3. Use HTTPS only
4. Add token rotation (refresh token rotates too)
5. Implement device fingerprinting
6. Log token refresh events for audit

## Troubleshooting

### "useAuth must be used within AuthProvider"
- Make sure your component is wrapped by `<AuthProvider>`
- Check that AuthProvider is at the top level of your app

### Tokens not persisting after refresh
- Check localStorage: `localStorage.getItem('bch_tokens')`
- Verify AuthProvider is still mounted

### 401 errors not being caught
- Make sure API is returning proper JSON error responses
- Check network requests in DevTools

### Token refresh loop (infinite retries)
- Verify refresh token is valid and not expired
- Check server logs for token validation errors
- Clear localStorage and log in again

## Next Steps

1. **Integrate into existing components** - Replace API calls with authenticated versions
2. **Add protected routes** - Create ProtectedRoute component
3. **Implement session timeout** - Auto-logout after inactivity
4. **Add token revocation** - Backend endpoint to invalidate tokens on logout
5. **Implement MFA** - Two-factor authentication for enhanced security
