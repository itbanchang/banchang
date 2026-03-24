# 🚀 BCH 360° Intelligence — Quick Implementation Guide

This guide provides ready-to-use code snippets you can apply immediately to improve code quality.

---

## 🎯 Improvement 1: Generic Tab Container Component

### Create: `src/components/TabContainer.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './shared/LoadingSpinner';
import ErrorAlert from './shared/ErrorAlert';

/**
 * Generic Tab Container Component
 * Consolidates common functionality for all tab modules
 * 
 * @param {Object} props
 * @param {string} props.tabId - Unique identifier for the tab
 * @param {string} props.title - Tab main title
 * @param {string} props.subtitle - Tab subtitle/description
 * @param {string} props.icon - Emoji icon for tab
 * @param {string} props.apiEndpoint - API endpoint path (e.g., '/api/opd')
 * @param {Array} props.sections - Array of section configurations
 * @param {Object} props.customFilters - Optional filters state
 */
export default function TabContainer({
    tabId = 'tab',
    title = 'Module',
    subtitle = 'Module Description',
    icon = '📊',
    apiEndpoint = '/api/data',
    sections = [],
    customFilters = [],
    onFilterChange = () => {}
}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [selectedDrill, setSelectedDrill] = useState(null);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ Generic Data Fetching
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const fetchData = React.useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);

            // Build query params from filters
            const params = new URLSearchParams(filters);
            const response = await fetch(`${apiEndpoint}?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`ข้อมูล HTTP ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            setLastUpdated(new Date());
        } catch (err) {
            setError(err.message);
            console.error(`[${tabId}] Fetch error:`, err);
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint, tabId]);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ Auto-refresh every 30 seconds
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(), 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ Handle filter changes
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const handleFilterChange = (filterKey, filterValue) => {
        onFilterChange({ [filterKey]: filterValue });
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ Generic drill-down handler
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const handleDrillDown = (drillType, recordId) => {
        setSelectedDrill({ type: drillType, id: recordId });
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ Render
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    return (
        <article className="space-y-6 pb-12">
            {/* Header */}
            <header className="border-b border-surface-200 pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-surface-900">
                            {icon} {title}
                        </h1>
                        <p className="text-sm text-surface-600 mt-1">{subtitle}</p>
                    </div>
                    <div className="text-right text-xs text-surface-500">
                        <p>อัปเดตล่าสุด: {lastUpdated.toLocaleTimeString('th-TH')}</p>
                        <button
                            onClick={() => fetchData()}
                            className="text-primary-600 hover:text-primary-700 font-medium mt-1"
                            disabled={loading}
                        >
                            {loading ? '🔄 กำลังโหลด...' : '🔄 รีเฟรช'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Filters */}
            {customFilters.length > 0 && (
                <div className="bg-surface-50 p-4 rounded-lg flex gap-4 flex-wrap">
                    {customFilters.map(filter => (
                        <div key={filter.key}>
                            <label className="block text-xs font-medium text-surface-700 mb-1">
                                {filter.label}
                            </label>
                            {filter.type === 'select' ? (
                                <select
                                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                    className="px-3 py-2 border border-surface-300 rounded-lg text-sm"
                                >
                                    <option value="">ทั้งหมด</option>
                                    {filter.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={filter.type}
                                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                    className="px-3 py-2 border border-surface-300 rounded-lg text-sm"
                                    placeholder={filter.placeholder}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

            {/* Loading State */}
            {loading && <LoadingSpinner message="กำลังโหลดข้อมูล..." />}

            {/* Content Sections */}
            {!loading && !error && (
                <div className="space-y-6">
                    {sections.map(section => (
                        <TabSection
                            key={section.id}
                            section={section}
                            data={data[section.dataKey] || {}}
                            onDrillDown={handleDrillDown}
                        />
                    ))}
                </div>
            )}

            {/* Drill-down Modal (if needed) */}
            {selectedDrill && (
                <DrillDownModal
                    type={selectedDrill.type}
                    id={selectedDrill.id}
                    onClose={() => setSelectedDrill(null)}
                />
            )}
        </article>
    );
}

/**
 * Tab Section Component — Renders a section with title, charts, and data
 */
function TabSection({ section, data, onDrillDown }) {
    const { id, title, icon, type, fields } = section;

    if (type === 'stats-grid') {
        return (
            <StatsGrid
                title={title}
                icon={icon}
                stats={data}
                onDrillDown={onDrillDown}
            />
        );
    }

    if (type === 'chart') {
        return (
            <ChartSection
                title={title}
                icon={icon}
                chartType={section.chartType}
                data={data}
            />
        );
    }

    if (type === 'table') {
        return (
            <TableSection
                title={title}
                icon={icon}
                data={data}
                columns={section.columns}
                onDrillDown={onDrillDown}
            />
        );
    }

    return null;
}

/**
 * Stats Grid — Display KPIs in grid
 */
function StatsGrid({ title, icon, stats, onDrillDown }) {
    return (
        <div className="bg-white rounded-lg border border-surface-200 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-6">
                {icon} {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                    <StatCard
                        key={key}
                        label={formatLabel(key)}
                        value={value}
                        variant={getColorVariant(key)}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * Stat Card — Individual KPI card
 */
function StatCard({ label, value, variant = 'blue' }) {
    const variants = {
        blue: 'bg-blue-50 border-blue-200 text-blue-900',
        green: 'bg-green-50 border-green-200 text-green-900',
        orange: 'bg-orange-50 border-orange-200 text-orange-900',
        red: 'bg-red-50 border-red-200 text-red-900'
    };

    return (
        <div className={`border rounded-lg p-4 ${variants[variant]}`}>
            <p className="text-xs font-medium opacity-700">{label}</p>
            <p className="text-2xl font-bold mt-2">
                {typeof value === 'number' ? value.toLocaleString('th-TH') : value}
            </p>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ Placeholder components (implement based on your needs)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartSection({ title, icon, chartType, data }) {
    return <div className="bg-white rounded-lg p-6">{title} Chart (TODO)</div>;
}

function TableSection({ title, icon, data, columns, onDrillDown }) {
    return <div className="bg-white rounded-lg p-6">{title} Table (TODO)</div>;
}

function LoadingSpinner({ message }) {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin text-4xl">⏳</div>
            <p className="ml-4 text-surface-600">{message}</p>
        </div>
    );
}

function ErrorAlert({ message, onDismiss }) {
    return (
        <div className="bg-danger-50 border-l-4 border-danger-500 p-4 rounded">
            <p className="text-danger-900 font-medium">⚠️ ข้อผิดพลาด</p>
            <p className="text-danger-700 text-sm mt-1">{message}</p>
            <button
                onClick={onDismiss}
                className="mt-3 text-danger-700 underline text-sm"
            >
                ปิด
            </button>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ Utilities
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function formatLabel(key) {
    return key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/^\w/, c => c.toUpperCase())
        .replace(/\b\w/g, c => c.toUpperCase());
}

function getColorVariant(key) {
    if (key.includes('revenue') || key.includes('income')) return 'green';
    if (key.includes('risk') || key.includes('alert')) return 'red';
    if (key.includes('warning')) return 'orange';
    return 'blue';
}
```

---

## 🎯 Improvement 2: Add Error Boundary to App

### Update: `src/App.jsx`

Add this error boundary class at the top of the file:

```jsx
// Add this before the App component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Component error:', { error, errorInfo });
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-danger-50 p-4">
                    <div className="max-w-md bg-white rounded-lg shadow-lg p-8 border-l-4 border-danger-500">
                        <h2 className="text-2xl font-bold text-danger-900 mb-4">
                            ⚠️ บางสิ่งผิดพลาด
                        </h2>
                        <p className="text-danger-700 mb-4">
                            เกิดข้อผิดพลาดในการโหลดหน้านี้ กรุณารีเฟรชหรือติดต่อผู้ดูแลระบบ
                        </p>
                        <details className="mb-4 text-xs text-surface-600">
                            <summary className="cursor-pointer font-medium mb-2">
                                ข้อมูลข้อผิดพลาด (สำหรับนักพัฒนา)
                            </summary>
                            <pre className="bg-surface-50 p-2 rounded overflow-auto max-h-48">
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                        <div className="flex gap-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                            >
                                🔄 รีเฟรช
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="flex-1 bg-surface-200 text-surface-900 px-4 py-2 rounded hover:bg-surface-300"
                            >
                                ← ย้อนกลับ
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
```

Then wrap your main app content:

```jsx
// In the main App component
export default function App() {
    // ... existing code ...

    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
                {/* Your app content */}
            </Suspense>
        </ErrorBoundary>
    );
}
```

---

## 🎯 Improvement 3: Create .env Setup

### Create: `.env.example`

```bash
# 🔧 Application Configuration
NODE_ENV=production
PORT=4000
FRONTEND_URL=http://localhost:3000

# 🗄️ Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hosxp_int
DB_USER=root
DB_PASSWORD=your_secure_password_here
DB_POOL_SIZE=30
DB_MAX_CONCURRENT=8
DB_SOCKET_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=10000

# 🔐 Authentication & JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
REFRESH_TOKEN_SECRET=your-super-secret-refresh-key-here-change-in-production

# 👤 Default User Credentials (change immediately in production!)
DEFAULT_ADMIN_PASSWORD=ChangeMe123!
DEFAULT_DIRECTOR_PASSWORD=ChangeMe456!
DEFAULT_FINANCE_PASSWORD=ChangeMe789!
DEFAULT_CLINICAL_PASSWORD=ChangeMeABC!
DEFAULT_NURSING_PASSWORD=ChangeMeDEF!

# 💾 Cache Configuration
REDIS_URL=redis://localhost:6379
CACHE_TTL_MINUTES=15
CACHE_MAX_ITEMS=1000

# 🛡️ Security
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
CORS_CREDENTIALS=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your-session-secret-here

# 📊 Logging
LOG_LEVEL=info
LOG_FILE=logs/server.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=14

# 🤖 AI Configuration
AI_EWS_THRESHOLD=7
AI_NEWS2_ENABLED=true
AI_READMIT_MODEL=lace_v2
ER_SURGE_FORECAST_HORIZON=24
FORECAST_ALGORITHM=holt_winters

# 📧 Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=alerts@example.com
SMTP_PASSWORD=password_here

# 🔔 Notification Services
SMS_PROVIDER=twilio
SMS_ACCOUNT_SID=your_account_sid
SMS_AUTH_TOKEN=your_auth_token
```

### Create: `.env.production` (for server deployment)

```bash
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://yourdomain.com

DB_HOST=your-db-host.com
DB_PORT=3306
DB_NAME=hosxp_int
DB_USER=dbuser
DB_PASSWORD=your_production_password_here

JWT_SECRET=your_production_jwt_secret_here
REFRESH_TOKEN_SECRET=your_production_refresh_secret_here

# ... other production settings ...
```

---

## 🎯 Improvement 4: Add Accessibility to Components

### Update: Add ARIA labels to navigation

```jsx
// In App.jsx, update the tab navigation:
<header role="tablist" className="flex gap-2 border-b" aria-label="การนำทางแท็บโมดูล">
    {TABS.map(tab => (
        <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition ${
                activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-surface-600 hover:text-surface-900'
            }`}
        >
            {tab.icon} {tab.label}
        </button>
    ))}
</header>

{/* Tab content */}
<section
    id={`tabpanel-${activeTab}`}
    role="tabpanel"
    aria-labelledby={`tab-${activeTab}`}
    className="p-6"
>
    {/* Content for active tab */}
</section>
```

---

## 🎯 Improvement 5: Unified Error Handler for Backend

### Create: `server/middleware/errorHandler.js`

```js
import logger from '../logger.js';

/**
 * Unified error handler middleware
 * Converts all errors to consistent JSON response format
 */
export const errorHandler = (err, req, res, next) => {
    const requestId = req.id || 'unknown';
    const timestamp = new Date().toISOString();

    // Build base error response
    const errorResponse = {
        success: false,
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: err.message || 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์',
            requestId,
            timestamp
        }
    };

    // Handle specific error types
    if (err.name === 'ZodError') {
        errorResponse.error.code = 'VALIDATION_ERROR';
        errorResponse.error.details = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
            code: e.code
        }));
        return res.status(400).json(errorResponse);
    }

    if (err.code === 'ER_QUERY_TIMEOUT') {
        errorResponse.error.message = 'การค้นหาฐานข้อมูลใช้เวลานานเกินไป กรุณาลองใหม่';
        logger.warn('Query timeout', { requestId, query: err.sql?.substring(0, 100) });
        return res.status(504).json(errorResponse);
    }

    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        errorResponse.error.message = 'ข้อมูลประจำตัวฐานข้อมูลไม่ถูกต้อง';
        logger.error('DB auth error', { requestId });
        return res.status(500).json(errorResponse);
    }

    if (err.code === 'ECONNREFUSED') {
        errorResponse.error.message = 'ไม่สามารถเชื่อมต่อฐานข้อมูล';
        logger.error('DB connection error', { requestId, host: err.address });
        return res.status(503).json(errorResponse);
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        errorResponse.error.code = 'INVALID_JSON';
        errorResponse.error.message = 'JSON ในคำขอไม่ถูกต้อง';
        return res.status(400).json(errorResponse);
    }

    // Log unexpected errors
    logger.error('Unhandled error', {
        requestId,
        error: err.message,
        stack: err.stack,
        method: req.method,
        path: req.path
    });

    // Return generic error to client
    res.status(500).json(errorResponse);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: `ไม่พบ ${req.method} ${req.path}`,
            requestId: req.id,
            timestamp: new Date().toISOString()
        }
    });
};

export default { errorHandler, notFoundHandler };
```

### Update: `server/server.js` to use error handler

```js
// At the end of server.js, before app.listen()

// 404 handler (before error handler)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);
```

---

## 🎯 Improvement 6: Add JSDoc Comments to Routes

### Example: Update `server/routes/auth.js`

```js
/**
 * POST /api/auth/login
 * 
 * Authenticate user with username and password
 * Returns access token (30min) and refresh token (24h)
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.username - Username (required)
 * @param {string} req.body.password - Password (required)
 * @returns {Object} { accessToken, refreshToken, user }
 * @throws {Error} 401 - Invalid credentials
 * @throws {Error} 429 - Too many login attempts
 * 
 * @example
 * // Request
 * POST /api/auth/login
 * Content-Type: application/json
 * 
 * {
 *   "username": "admin",
 *   "password": "SecurePass123"
 * }
 * 
 * // Response
 * {
 *   "accessToken": "eyJhbGc...",
 *   "refreshToken": "eyJhbGc...",
 *   "user": {
 *     "id": 1,
 *     "username": "admin",
 *     "role": "admin",
 *     "full_name": "ผู้ดูแลระบบ"
 *   }
 * }
 */
router.post('/login', loginLimiter, validate(loginSchema), async (req, res) => {
    // Implementation...
});

/**
 * POST /api/auth/refresh
 * 
 * Get a new access token using refresh token
 * Refresh token is long-lived (24 hours)
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.refreshToken - Valid refresh token (required)
 * @returns {Object} { accessToken, expiresIn }
 * @throws {Error} 401 - Invalid or expired refresh token
 * 
 * @example
 * // Request
 * POST /api/auth/refresh
 * Content-Type: application/json
 * 
 * {
 *   "refreshToken": "eyJhbGc..."
 * }
 * 
 * // Response
 * {
 *   "accessToken": "eyJhbGc...",
 *   "expiresIn": "30m"
 * }
 */
router.post('/refresh', (req, res) => {
    // Implementation...
});
```

---

## 📋 Next Steps

1. **Implement TabContainer** — Base 90% of your tabs on this generic component
2. **Add ErrorBoundary** — Wrap lazy-loaded components
3. **Create .env files** — Remove hardcoded credentials
4. **Add JSDoc** — Document all public functions
5. **Test error handling** — Verify error messages in UI
6. **Add unit tests** — Start with authentication routes

---

This guide provides ready-to-use code you can copy and paste immediately. Start with the TabContainer refactoring for the biggest codebase improvement.

