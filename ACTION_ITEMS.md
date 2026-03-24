# ⚡ CODE REVIEW — QUICK ACTION ITEMS

## 🔴 CRITICAL (Fix Before Production Deploy)

### 1. Hardcoded Credentials 
**File**: `server/routes/auth.js` line 16-42  
**Fix Time**: 2 hours  
**Actions**:
- [ ] Move user credentials to database
- [ ] Create users table migration
- [ ] Update auth.js to query database
- [ ] Test login with database users
- [ ] Remove hardcoded users from source

### 2. JWT Token Too Long (8 hours)
**File**: `server/middleware/rbac.js` line 37  
**Fix Time**: 1.5 hours  
**Actions**:
- [ ] Change `expiresIn: '8h'` to `'30m'`
- [ ] Create refresh token endpoint
- [ ] Add REFRESH_TOKEN_SECRET to .env
- [ ] Update frontend to use refresh tokens
- [ ] Test token expiration

### 3. CORS Too Permissive
**File**: `server/server.js` line 117-122  
**Fix Time**: 1 hour  
**Actions**:
- [ ] Remove wildcard ports (localhost:*, 10.1.0.3:*)
- [ ] Use exact ports only (5173, 4000)
- [ ] Change WebSocket transport to 'websocket' only
- [ ] Test CORS with Postman

### 4. Missing Input Validation on Routes
**Files**: `server/routes/*.js` (except finance.js)  
**Fix Time**: 4 hours  
**Actions**:
- [ ] Create validation schemas for each route
- [ ] Apply `validateQuery`, `validateParams`, `validateBody`
- [ ] Test with invalid inputs
- [ ] Return 400 errors for bad input

Affected routes:
```bash
grep -l "router\." server/routes/*.js | xargs -I {} sh -c 'echo "Checking: {}"; grep "validateQuery\|validateParams" {} || echo "  ❌ Missing validation"'
```

### 5. No Global Error Handler
**File**: `server/server.js`  
**Fix Time**: 1 hour  
**Actions**:
- [ ] Add `app.use((err, req, res, next) => {...})`
- [ ] Add `app.use((req, res) => { 404 handler })`
- [ ] Add `process.on('uncaughtException', ...)`
- [ ] Add `process.on('unhandledRejection', ...)`
- [ ] Test error handling

### 6. Missing Auth on Some Routes
**Action**: Run this to audit:
```bash
for file in server/routes/*.js; do
  echo "=== $file ==="
  grep -n "^router\." "$file" | head -5
done
# Verify each route has: authenticate, authorize('module')
```
**Fix Time**: 2 hours

---

## 🟠 HIGH PRIORITY (Before Week End)

### 7. Clean Up Debug/Test Files (60+ files)
**Action**:
```bash
# Create directories
mkdir -p scripts/debug scripts/test scripts/probes

# Organize files
mv debug_*.js scripts/debug/
mv test_*.js scripts/test/
mv check_*.js find_*.js scripts/probes/

# Remove or archive
ls -la | grep -E "investigate_|verify_|trace_" | wc -l  # Count remaining

# Update .gitignore
echo "scripts/debug/" >> .gitignore
echo "scripts/test/" >> .gitignore
```
**Fix Time**: 1 hour

### 8. Add Audit Logging
**File**: `server/middleware/audit.js`  
**Actions**:
- [ ] Create audit_log table in database
- [ ] Log all non-GET requests
- [ ] Include: user_id, action, resource, status, timestamp, IP
- [ ] Create audit query endpoint
- [ ] Test audit log entries

### 9. Graceful Shutdown
**File**: `server/server.js` (end of file)  
**Actions**:
- [ ] Add `process.on('SIGTERM', async () => {...})`
- [ ] Close WebSocket connections
- [ ] Wait for active requests (30s timeout)
- [ ] Close database pool
- [ ] Test: `kill -SIGTERM <pid>`
**Fix Time**: 1 hour

### 10. Missing Rate Limiting on Login
**File**: `server/routes/auth.js`  
**Actions**:
```javascript
import rateLimit from 'express-rate-limit';
const loginLimiter = rateLimit({ windowMs: 15*60*1000, max: 5 });
router.post('/login', loginLimiter, validate(loginSchema), async ...)
```
**Fix Time**: 30 minutes

---

## 🟡 MEDIUM PRIORITY (Next Sprint)

### 11. Tighten CSP Headers
**File**: `server/server.js` contentSecurityPolicy  
**Action**: Add stricter CSP for production (keep unsafe-inline for dev)

### 12. Enforce HTTPS in Production
**File**: `server/server.js`  
**Action**: Add redirect middleware for production

### 13. Fix Inconsistent Error Messages
**Action**:
```bash
grep -n "res.status.*json.*err.message" server/routes/*.js
# Replace all with generic messages, log details
```

### 14. React Error Boundaries
**File**: `src/App.jsx`  
**Action**: Wrap major components with ErrorBoundary

### 15. Database Backups Documentation
**File**: `README.md`  
**Action**: Add backup/restore procedures section

### 16. Complete .env.example
**File**: `.env.example`  
**Action**: Document all environment variables with descriptions

---

## Testing Commands

```bash
# 1. Test hardcoded credentials are removed
grep -r "BCH@dm1n\|BCHd1r3ct0r\|BCHf1n@nc3" server/

# 2. Check JWT length setting
grep "expiresIn" server/middleware/rbac.js

# 3. Test CORS (should fail with random origin)
curl -H "Origin: http://example.com:9999" \
     -H "Access-Control-Request-Method: GET" \
     http://localhost:4000

# 4. Check for validation
grep -n "validateQuery\|validateParams" server/routes/*.js | wc -l
# Should see each route using validation

# 5. Check for auth on routes
grep -c "authenticate" server/routes/*.js | sort | uniq -c

# 6. Look for debug files
find . -maxdepth 1 -name "*.js" | grep -E "debug_|test_|check_" | wc -l
# Should return 0 after cleanup
```

---

## Estimated Effort

| Phase | Issues | Effort | Target Date |
|-------|--------|--------|-------------|
| 🔴 CRITICAL | 6 | 12h | TODAY |
| 🟠 HIGH | 4 | 8h | End of week |
| 🟡 MEDIUM | 8 | 12h | Next sprint |
| 🟢 LOW | 4 | 8h | Future |
| **TOTAL** | **22** | **40h** | **2-3 weeks** |

---

## Deployment Checklist

Before going live:

- [ ] All CRITICAL items from code review fixed
- [ ] `npm audit` shows no vulnerabilities
- [ ] All hardcoded credentials removed
- [ ] Debug files organized/hidden
- [ ] Tests passing (create if none exist)
- [ ] HTTPS certificates installed
- [ ] Database backups working
- [ ] Audit logging enabled & tested
- [ ] Rate limiting active
- [ ] Error handling tested
- [ ] Load testing completed (mock 100+ concurrent users)
- [ ] Security headers verified with securityheaders.com
- [ ] Documentation complete
- [ ] Team trained on production procedures
- [ ] Incident response plan in place

---

## Questions to Resolve

1. **Who maintains this?** What's the support model?
2. **Current users?** How many doctors/staff accessing?
3. **Data sensitivity?** What compliance (HIPAA, GDPR, Thai DPA)?
4. **Monitoring?** What alerting/monitoring exists?
5. **Backups?** Where, how often, tested?
6. **Disaster recovery?** RTO/RPO targets?

---

*Generated: March 17, 2026*
