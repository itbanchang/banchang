# Frontend Integration Checklist

## ✅ Completed Setup

The following authentication infrastructure has been implemented:

### Backend
- ✅ JWT token generation with short expiry (30 minutes)
- ✅ Refresh token mechanism (24 hours)
- ✅ Authentication endpoints: `/api/auth/login`, `/api/auth/refresh`
- ✅ Rate limiting on login (5 attempts per 15 minutes)
- ✅ Password hashing with bcrypt
- ✅ Environment-based user credentials
- ✅ Secure error handling

### Frontend
- ✅ `AuthContext` - Centralized authentication state
- ✅ `useAuth` hook - Access auth context in any component
- ✅ `fetchWithTokenRefresh` - Auto token refresh on API calls
- ✅ `LoginForm` component - Beautiful, responsive login UI
- ✅ `ProtectedRoute` component - Route protection

## 📋 Integration Steps

### Phase 1: Wrap Application (5 minutes)

1. **Open** `src/main.jsx`:
   ```jsx
   import { AuthProvider } from './context/AuthContext.jsx';
   import App from './App.jsx';
   
   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <AuthProvider>
         <App />
       </AuthProvider>
     </React.StrictMode>
   );
   ```

2. **Save and test** - No errors should appear in console

### Phase 2: Protect Routes (10 minutes)

1. **In your routing setup** (App.jsx or router config):
   ```jsx
   import ProtectedRoute from './components/ProtectedRoute.jsx';
   import LoginForm from './components/LoginForm.jsx';
   
   <Routes>
     <Route path="/login" element={<LoginForm />} />
     <Route 
       path="/dashboard" 
       element={
         <ProtectedRoute>
           <YourDashboardComponent />
         </ProtectedRoute>
       } 
     />
     <Route 
       path="/finance" 
       element={
         <ProtectedRoute>
           <FinanceTab />
         </ProtectedRoute>
       } 
     />
   </Routes>
   ```

2. **Test**: 
   - Navigate to `/dashboard` without login → should show LoginForm
   - Login with `admin` / password from .env → should load dashboard

### Phase 3: Update API Calls (15 minutes per component)

Replace existing API calls with authenticated versions:

#### Before (Old):
```jsx
useEffect(() => {
  fetch('/api/dashboard')
    .then(r => r.json())
    .then(setData);
}, []);
```

#### After (New):
```jsx
import { useAuth } from '../hooks/useAuth.js';
import { createBoundFetch } from '../utils/fetchWithTokenRefresh.js';

export default function Dashboard() {
  const { tokens, refreshAccessToken } = useAuth();
  const [data, setData] = useState(null);

  const apiFetch = useCallback(
    createBoundFetch(tokens, refreshAccessToken),
    [tokens, refreshAccessToken]
  );

  useEffect(() => {
    apiFetch('/api/dashboard')
      .then(r => r.json())
      .then(setData);
  }, [apiFetch]);

  // ... rest of component
}
```

### Priority API Calls to Update

Update in this order (highest impact first):
1. **Dashboard summary** - `/api/dashboard/summary`
2. **Finance endpoints** - `/api/finance/*`
3. **Medical record endpoints** - `/api/medrec/*`
4. **IPD/OPD endpoints** - `/api/ipd/*`, `/api/opd/*`
5. **Clinical endpoints** - `/api/clinical/*`
6. **AI module endpoints** - `/api/ai/*`

## 🛠️ Testing Guide

### Test 1: Login Flow
```
1. Navigate to http://localhost:5174/login
2. Enter username: admin
3. Enter password: <from .env DEFAULT_ADMIN_PASSWORD>
4. Click Login
5. Should redirect to dashboard
6. Check localStorage → bch_tokens should exist
```

### Test 2: Token Refresh
```
1. Login to get tokens
2. Wait 30 minutes (or manually clear access token in localStorage but keep refresh)
3. Make an API call
4. Should auto-refresh and succeed
5. Check server logs → should see refresh endpoint being called
```

### Test 3: Rate Limiting
```
1. Try wrong password 5 times
2. 6th attempt should return: "⚠️ Too many login attempts"
3. Wait 15 minutes
4. Should be able to login again
```

## 📊 Files Modified/Created

### Created:
- ✅ `src/context/AuthContext.jsx` - Auth state management
- ✅ `src/hooks/useAuth.js` - Auth hook
- ✅ `src/utils/fetchWithTokenRefresh.js` - API wrapper
- ✅ `src/components/LoginForm.jsx` - Login UI
- ✅ `src/components/LoginForm.css` - Login styling
- ✅ `src/components/ProtectedRoute.jsx` - Route protection
- ✅ `FRONTEND_TOKEN_REFRESH_SETUP.md` - Detailed guide
- ✅ `FRONTEND_INTEGRATION_CHECKLIST.md` - This file

### Modified:
- `.env` - Added JWT secrets and user passwords

## ⚠️ Common Issues & Solutions

### "useAuth must be used within AuthProvider"
**Problem**: Component trying to use useAuth but not wrapped by AuthProvider
**Solution**: Make sure AuthProvider wraps your entire app in main.jsx

### API calls still return 401
**Problem**: Tokens exist but API still returns 401
**Solution**: 
- Verify token is being sent: `Authorization: Bearer {token}`
- Check token hasn't expired: `localStorage.getItem('bch_tokens')`
- Verify backend endpoints have `authenticate` middleware

### Infinite authentication loop
**Problem**: Login works but page redirects to login again
**Solution**:
- Check if routes are properly protected
- Verify localStorage is working: open DevTools → Application → Storage
- Clear cache and localStorage, try again

### Token refresh fails
**Problem**: Auto-refresh not working on 401
**Solution**:
- Check backend `/api/auth/refresh` endpoint exists
- Verify `REFRESH_TOKEN_SECRET` is set in .env
- Check network requests in DevTools → should see refresh request

## 🚀 Next Steps (After Integration)

1. **Session Timeout** - Auto logout after 5 minutes inactivity
2. **Token Rotation** - Refresh token also rotates on use
3. **Device Fingerprinting** - Prevent token theft
4. **Logout Revocation** - Backend invalidates tokens on logout
5. **MFA Support** - Two-factor authentication
6. **Audit Logging** - Track login/refresh events

## 📞 Quick Reference

**Default Test Credentials:**
- Username: `admin`
- Password: Check `.env` for `DEFAULT_ADMIN_PASSWORD` (default: `bch@dm1n2026`)

**Token Expiration:**
- Access Token: 30 minutes
- Refresh Token: 24 hours

**Rate Limit:**
- login endpoint: 5 attempts / 15 minutes per IP

**API Base URL:**
- Development: `http://localhost:4000`
- Production: `https://{SERVER_IP}:4000`

## 📈 Implementation Progress

```
Phase 1: Backend Setup ........................... ✅ Complete
  ├─ JWT generation ............................ ✅
  ├─ Refresh endpoint .......................... ✅
  ├─ Rate limiting ............................ ✅
  └─ Environment config ....................... ✅

Phase 2: Frontend Setup ......................... ✅ Complete
  ├─ AuthContext .............................. ✅
  ├─ useAuth hook ............................. ✅
  ├─ LoginForm component ...................... ✅
  ├─ Token refresh utilities .................. ✅
  └─ Protected routes ......................... ✅

Phase 3: Component Integration ................. ⏳ In Progress
  ├─ Wrap app with AuthProvider .............. ⏳ Need to do
  ├─ Protect routes .......................... ⏳ Need to do
  ├─ Update API calls ........................ ⏳ Need to do
  └─ Test all flows .......................... ⏳ Need to do

Phase 4: Production Hardening (Future) ........ ⏹️ Not started
  ├─ HttpOnly cookies ........................ ⏹️
  ├─ CSRF protection ......................... ⏹️
  ├─ Session timeout ......................... ⏹️
  └─ Audit logging ........................... ⏹️
```

## 💡 Pro Tips

1. **Use the bound fetch function** - It's simpler and handles all edge cases
2. **Test token refresh** - Wait 30 min or manually expire token to test
3. **Monitor Network tab** - You'll see `/api/auth/refresh` calls when tokens refresh
4. **Check localStorage** - Easy way to debug missing tokens: `JSON.parse(localStorage.getItem('bch_tokens'))`
5. **Enable request logging** - Add console.log in fetchWithTokenRefresh to see when auto-refresh happens

---

**Status**: Ready for component integration  
**Last Updated**: 2026-03-17  
**Version**: 1.0
