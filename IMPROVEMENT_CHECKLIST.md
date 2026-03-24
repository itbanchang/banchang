# ✅ Code Improvement Checklist

Use this checklist to track your progress improving the codebase.

---

## 🎯 QUICK WINS (Can do today — 1-2 hours total)

- [ ] **Set up .env files**
  - [ ] Copy `.env.example` to `.env`
  - [ ] Update `.env` with your database credentials
  - [ ] Remove hardcoded passwords from source code
  - [ ] Add to `.gitignore` if not already there
  - **Estimated time:** 30 min

- [ ] **Add JSDoc comments to key functions**
  - [ ] Document `server/routes/auth.js` endpoints
  - [ ] Document `server/db/mysql.js` query functions
  - [ ] Document `src/hooks/useAuth.js`
  - **Estimated time:** 1 hour

- [ ] **Create .gitignore entries**
  - [ ] Add `.env` (never commit credentials!)
  - [ ] Add `logs/` directory
  - [ ] Add `node_modules/`
  - [ ] Add `.DS_Store` and `*.log`
  - **Estimated time:** 15 min

- [ ] **Add error messages in Thai**
  - [ ] Review `server/routes/*.js` for English error messages
  - [ ] Convert to Thai for better UX
  - **Estimated time:** 30 min

---

## 📱 FRONTEND IMPROVEMENTS (2-3 days)

### Component Architecture
- [ ] **Create TabContainer.jsx**
  - File: `src/components/TabContainer.jsx`
  - Copy from IMPLEMENTATION_GUIDE.md
  - **Estimated time:** 2 hours

- [ ] **Refactor OPDTab.jsx to use TabContainer**
  - [ ] Convert OPDTab to config-based approach
  - [ ] Move data fetching to TabContainer
  - [ ] Update API endpoint reference
  - [ ] Test with live data
  - **Files:** `src/components/OPDTab.jsx`
  - **Estimated time:** 1 hour

- [ ] **Refactor remaining 9 Tab components**
  - [ ] IPDTab, ERTab, FinanceTab, DentalTab
  - [ ] ThaiMedTab, PhysTherapyTab, NCDTab, MedRecTab, XRAYTab
  - [ ] Each: ~30-45 min
  - **Total estimated time:** 5-6 hours

- [ ] **Create unified Card.jsx component**
  - File: `src/components/shared/Card.jsx`
  - Update KPICard, KPICardV2, MetricCard to use it
  - **Estimated time:** 2-3 hours

### Error Handling & Safety
- [ ] **Add ErrorBoundary.jsx**
  - File: `src/components/ErrorBoundary.jsx`
  - Copy from IMPLEMENTATION_GUIDE.md
  - Wrap lazy components in App.jsx
  - **Estimated time:** 1 hour

- [ ] **Add Suspense fallbacks**
  - [ ] Create LoadingSpinner component
  - [ ] Wrap all lazy-loaded components
  - [ ] Test loading states
  - **Estimated time:** 1 hour

- [ ] **Add form validation feedback**
  - [ ] Update LoginForm with error display
  - [ ] Add validation messages for all forms
  - **Estimated time:** 1.5 hours

### Accessibility
- [ ] **Add ARIA labels to navigation**
  - [ ] Update tab list with role="tablist"
  - [ ] Add aria-selected, aria-controls
  - [ ] Test with keyboard navigation
  - **Estimated time:** 1 hour

- [ ] **Add alt text to images**
  - [ ] Review all `<img>` tags
  - [ ] Add descriptive alt text
  - **Estimated time:** 30 min

- [ ] **Test dark mode**
  - [ ] Verify all color contrasts meet WCAG AA
  - [ ] Test with screen reader (Narrator/NVDA)
  - **Estimated time:** 1 hour

---

## 🔧 BACKEND IMPROVEMENTS (2-3 days)

### Configuration & Security
- [ ] **Create .env configuration**
  - [ ] Create `.env.example` with all variables
  - [ ] Create `.env.production`
  - [ ] Update `server/db/mysql.js` to read from env
  - [ ] Update `server/middleware/rbac.js` for JWT secrets
  - **Estimated time:** 1 hour

- [ ] **Remove hardcoded values**
  - [ ] Search for hardcoded ports, hosts, timeouts
  - [ ] Move to environment variables
  - [ ] Review `server/routes/*.js` files
  - **Estimated time:** 1 hour

### Error Handling
- [ ] **Create errorHandler.js middleware**
  - File: `server/middleware/errorHandler.js`
  - Copy from IMPLEMENTATION_GUIDE.md
  - Update `server/server.js` to use it
  - **Estimated time:** 1 hour

- [ ] **Implement 404 handler**
  - [ ] Add notFoundHandler to all routes
  - [ ] Return consistent JSON error format
  - **Estimated time:** 30 min

- [ ] **Add error logging**
  - [ ] Review logger configuration
  - [ ] Log all errors with request ID
  - [ ] Test error logging in production mode
  - **Estimated time:** 1 hour

### Input Validation
- [ ] **Validate all query parameters**
  - [ ] Review `server/routes/opd.js`
  - [ ] Add Zod schema for all queries
  - [ ] Apply validateQuery middleware
  - **Estimated time:** 2 hours

- [ ] **Validate request bodies**
  - [ ] Review all POST/PUT routes
  - [ ] Add request body schemas
  - [ ] Test validation with invalid inputs
  - **Estimated time:** 1.5 hours

### Documentation
- [ ] **Create API documentation**
  - File: `docs/API.md`
  - Document all endpoints
  - Add request/response examples
  - **Estimated time:** 3-4 hours

- [ ] **Create deployment guide**
  - File: `docs/DEPLOYMENT.md`
  - Environment setup instructions
  - Database migration steps
  - Production checklist
  - **Estimated time:** 2 hours

- [ ] **Add JSDoc to all route handlers**
  - Update all `server/routes/*.js` files
  - Document parameters and responses
  - **Estimated time:** 2-3 hours

### Database
- [ ] **Review and add database indexes**
  - [ ] Create `scripts/db_indexes.sql`
  - [ ] Add indexes for frequently queried columns
  - [ ] Test query performance
  - **Estimated time:** 1 hour

- [ ] **Document database schema**
  - File: `docs/DATABASE_SCHEMA.md`
  - List all tables and relationships
  - **Estimated time:** 2 hours

---

## 🧪 TESTING (2-3 days)

### Setup Test Infrastructure
- [ ] **Install testing dependencies**
  - [ ] Add `vitest`, `supertest` to package.json
  - [ ] Create `vitest.config.js`
  - [ ] Update `package.json` scripts
  - **Estimated time:** 30 min

- [ ] **Create test directory structure**
  - [ ] Create `server/__tests__/` directory
  - [ ] Create `src/__tests__/` directory
  - [ ] Create example test file for reference
  - **Estimated time:** 30 min

### Write Tests
- [ ] **Test authentication routes**
  - File: `server/__tests__/routes/auth.test.js`
  - Test login, logout, refresh endpoints
  - Test error cases
  - **Estimated time:** 2 hours

- [ ] **Test API validation**
  - File: `server/__tests__/middleware/validate.test.js`
  - Test Zod schema validation
  - Test error responses
  - **Estimated time:** 1.5 hours

- [ ] **Test error handler**
  - File: `server/__tests__/middleware/errorHandler.test.js`
  - Test various error scenarios
  - **Estimated time:** 1 hour

- [ ] **Test key utility functions**
  - File: `src/__tests__/utils/`
  - Test token refresh logic
  - Test data formatting functions
  - **Estimated time:** 1.5 hours

### Add GitHub Actions
- [ ] **Create CI/CD pipeline**
  - File: `.github/workflows/test.yml`
  - Run tests on push to main
  - Run linter checks
  - **Estimated time:** 1 hour

---

## 📊 CODE QUALITY (1 day)

### Linting & Formatting
- [ ] **Add ESLint configuration**
  - [ ] Create `.eslintrc.json`
  - [ ] Install ESLint dependencies
  - [ ] Run linter on codebase
  - [ ] Fix all warnings
  - **Estimated time:** 1.5 hours

- [ ] **Add Prettier for formatting**
  - [ ] Create `.prettierrc.json`
  - [ ] Install Prettier
  - [ ] Format all code files
  - **Estimated time:** 1 hour

- [ ] **Add pre-commit hooks**
  - [ ] Install `husky` and `lint-staged`
  - [ ] Run linter before commit
  - [ ] Run prettier before commit
  - **Estimated time:** 1 hour

### Code Analysis
- [ ] **Remove unused code**
  - [ ] Search for unused imports
  - [ ] Remove test/debug files (debug_*.js, test_*.js)
  - [ ] Delete unused components
  - **Estimated time:** 1 hour

- [ ] **Consolidate duplicates**
  - [ ] Identify duplicate code patterns
  - [ ] Extract to reusable functions
  - [ ] Update references
  - **Estimated time:** 2 hours

### Documentation
- [ ] **Create CONTRIBUTING.md**
  - [ ] Code style guidelines
  - [ ] Branch naming conventions
  - [ ] PR process
  - **Estimated time:** 1 hour

- [ ] **Create troubleshooting guide**
  - File: `docs/TROUBLESHOOTING.md`
  - Common issues and solutions
  - **Estimated time:** 1 hour

---

## 🚀 DEPLOYMENT (1 day)

### Docker & Production
- [ ] **Create Dockerfile**
  - File: `Dockerfile`
  - Copy from CODE_REVIEW_IMPROVEMENTS.md
  - **Estimated time:** 30 min

- [ ] **Create docker-compose.yml**
  - File: `docker-compose.yml`
  - Copy from CODE_REVIEW_IMPROVEMENTS.md
  - **Estimated time:** 30 min

- [ ] **Test Docker build**
  - [ ] Build Docker image
  - [ ] Test with docker-compose
  - [ ] Verify all services work
  - **Estimated time:** 1 hour

### Production Checklist
- [ ] **Security review**
  - [ ] Verify all passwords in environment
  - [ ] Check CORS configuration
  - [ ] Review rate limiting settings
  - [ ] Verify JWT secrets are strong
  - **Estimated time:** 1 hour

- [ ] **Performance review**
  - [ ] Check cache TTL settings
  - [ ] Verify database connection pooling
  - [ ] Test under load
  - [ ] Review query performance
  - **Estimated time:** 1 hour

- [ ] **Monitoring setup**
  - [ ] Configure log rotation
  - [ ] Set up error tracking (e.g., Sentry)
  - [ ] Configure health check endpoint
  - [ ] Set up alerts for errors
  - **Estimated time:** 1.5 hours

---

## 📈 TypeScript Migration (Optional — 1+ weeks)

- [ ] **Prepare for TypeScript**
  - [ ] Install TypeScript dependencies
  - [ ] Update `tsconfig.json`
  - [ ] Create type definitions
  - **Estimated time:** 2 hours

- [ ] **Migrate critical backend files**
  - [ ] `server/server.js` → `server/server.ts`
  - [ ] `server/db/mysql.js` → `server/db/mysql.ts`
  - [ ] `server/routes/*.js` → `server/routes/*.ts`
  - **Estimated time:** 1-2 weeks

- [ ] **Migrate React components** (optional)
  - [ ] Convert to `.tsx` files
  - [ ] Add prop types
  - **Estimated time:** 1-2 weeks

---

## 📊 Progress Tracking

### Week 1 Target
- [ ] Quick wins completed (2-3 hours)
- [ ] Frontend component architecture started (4-6 hours)
- [ ] Backend configuration cleaned up (2 hours)
- **Current Progress:** 0%
- **Target:** 20-25%

### Week 2 Target
- [ ] Tab components refactored (6 hours)
- [ ] Error handling implemented (3-4 hours)
- [ ] API documentation done (3-4 hours)
- [ ] Testing infrastructure set up (2 hours)
- **Target:** 60-70%

### Week 3 Target
- [ ] Unit tests written (4-5 hours)
- [ ] Code quality checks added (2-3 hours)
- [ ] Documentation completed (2 hours)
- **Target:** 90-95%

### Week 4 Target
- [ ] Docker setup (1 hour)
- [ ] Final review and cleanup (4-5 hours)
- [ ] Production deployment checklist (2 hours)
- **Target:** 100% ✅

---

## 🎯 Priority Legend

🔴 **CRITICAL** — Must do before production  
🟠 **HIGH** — Should do soon  
🟡 **MEDIUM** — Nice to have  
🟢 **LOW** — Optional/future

---

## 📌 Notes

- **Total time estimate:** 40-50 hours spread over 4 weeks
- **Can be parallelized:** Frontend and backend improvements can happen simultaneously
- **Start with:** Box 1 (Quick Wins) → Box 2 (Configuration) → Box 3 (Testing)
- **Reference:** See CODE_REVIEW_IMPROVEMENTS.md and IMPLEMENTATION_GUIDE.md for details

---

**Last Updated:** 2026-03-18  
**Next Review:** 2026-04-15

