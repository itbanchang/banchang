// ============================================================
// BCH 360° Intelligence V.10 - MySQL Connection (Hardened)
// HOSxP XE Slave1 Server — Read-Only + Circuit Breaker
// + Concurrency Semaphore to prevent pool stampede
// ============================================================
import mysql from 'mysql2/promise';
import logger from '../logger.js';

// ── Global Concurrency Semaphore ──
// Prevents stampede: at most MAX_CONCURRENT queries run in parallel.
// Extra queries queue and wait (FIFO) instead of exhausting the pool.
const MAX_CONCURRENT = 20;
let _running = 0;
const _queue = [];          // Array of { resolve } waiters

function semAcquire() {
    if (_running < MAX_CONCURRENT) {
        _running++;
        return Promise.resolve();
    }
    return new Promise(resolve => _queue.push({ resolve }));
}

function semRelease() {
    if (_queue.length > 0) {
        const next = _queue.shift();
        next.resolve();        // Hand the slot to the next waiter (keep _running unchanged)
    } else {
        _running--;
    }
}

// ── Server Profiles ──
// SAFETY: ระบบจะ SET SESSION TRANSACTION READ ONLY ทุก connection
// + Application-level regex blocking ป้องกัน INSERT/UPDATE/DELETE
// ไม่ว่าจะ switch ไป server ไหน จะไม่มีการเขียนข้อมูลลง HOSxP XE เด็ดขาด
const SERVER_PROFILES = {
    slave1: {
        id: 'slave1', label: 'Server2 (Slave1)', role: 'Read Replica',
        host: '10.1.0.3', database: 'bchhosxpxe',
        user: 'dataaudit', password: 'dataaudit', port: 3306,
        readonly: true,
    },
    master: {
        id: 'master', label: 'Server1 (Master)', role: 'Master',
        host: '10.109.0.240', database: 'bchhosxpxe',
        user: 'bch', password: '10828@adminbch', port: 3306,
        readonly: true, // FORCED READ-ONLY — app never writes to HOSxP
    },
    slave2: {
        id: 'slave2', label: 'Server3 (Slave2)', role: 'Read Replica 2',
        host: '10.1.0.239', database: 'bchhosxpxe',
        user: 'root', password: 'boom123', port: 3306,
        readonly: true,
    },
};

// Default server from .env or 'slave1'
const DEFAULT_SERVER_ID = process.env.MYSQL_SERVER || 'slave1';
let _activeServerId = DEFAULT_SERVER_ID;

function _getActiveProfile() {
    const profile = SERVER_PROFILES[_activeServerId] || SERVER_PROFILES.slave1;
    // Allow .env override for the default server
    if (_activeServerId === DEFAULT_SERVER_ID) {
        return {
            ...profile,
            host: process.env.MYSQL_HOST || profile.host,
            database: process.env.MYSQL_DB || profile.database,
            user: process.env.MYSQL_USER || profile.user,
            password: process.env.MYSQL_PASS || profile.password,
            port: parseInt(process.env.MYSQL_PORT || String(profile.port)),
        };
    }
    return profile;
}

function _buildConfig(profile) {
    return {
        host: profile.host,
        database: profile.database,
        user: profile.user,
        password: profile.password,
        port: profile.port,
        waitForConnections: true,
        connectionLimit: 50,
        maxIdle: 25,
        idleTimeout: 120000,
        queueLimit: 100,
        connectTimeout: 5000,
        charset: 'utf8mb4',
        timezone: '+07:00',
        enableKeepAlive: true,
        keepAliveInitialDelay: 5000,
        namedPlaceholders: false,
        decimalNumbers: true,
        supportBigNumbers: true,
        bigNumberStrings: false,
        dateStrings: true,
    };
}

let MYSQL_CONFIG = _buildConfig(_getActiveProfile());

let pool = null;
let isConnected = false;
let _healthCheckInterval = null;

// ── Server Switching API ──
export function getServerProfiles() {
    return Object.values(SERVER_PROFILES).map(s => ({
        id: s.id, label: s.label, role: s.role,
        host: s.host, database: s.database, port: s.port,
        active: s.id === _activeServerId,
    }));
}

export function getActiveServer() {
    const profile = _getActiveProfile();
    return {
        id: _activeServerId,
        label: profile.label,
        role: profile.role,
        host: profile.host,
        database: profile.database,
        port: profile.port,
        connected: isConnected,
        readonly: true, // always enforced
        safety: [
            'SET SESSION TRANSACTION READ ONLY',
            'Application-level WRITE/DELETE/INSERT blocking',
            'Dangerous SQL pattern detection',
        ],
    };
}

export async function switchServer(serverId) {
    if (!SERVER_PROFILES[serverId]) {
        throw new Error(`Unknown server: ${serverId}. Available: ${Object.keys(SERVER_PROFILES).join(', ')}`);
    }

    logger.info(`[MySQL] Switching to server: ${serverId}`, { from: _activeServerId, to: serverId });

    // Close existing pool
    if (pool) {
        try { await pool.end(); } catch { /* ignore */ }
        pool = null;
        isConnected = false;
    }

    // Clear health check
    if (_healthCheckInterval) {
        clearInterval(_healthCheckInterval);
        _healthCheckInterval = null;
    }

    // Reset circuit breaker
    CIRCUIT_BREAKER.failureCount = 0;
    CIRCUIT_BREAKER.lastFailure = 0;
    CIRCUIT_BREAKER.state = 'CLOSED';

    // Switch
    _activeServerId = serverId;
    MYSQL_CONFIG = _buildConfig(_getActiveProfile());

    // Connect to new server
    const newPool = await getPool();

    logger.info(`[MySQL] Switched to ${serverId} — READ-ONLY enforced`, {
        server: SERVER_PROFILES[serverId].host,
        safety: ['SET SESSION TRANSACTION READ ONLY', 'WRITE_PATTERNS regex block', 'DANGEROUS_PATTERNS regex block'],
    });

    return {
        success: true,
        server: getActiveServer(),
        message: `Switched to ${SERVER_PROFILES[serverId].label} (${SERVER_PROFILES[serverId].host})`,
        safety: 'READ-ONLY enforced — ไม่มีการเขียนข้อมูลลง Server',
    };
}

// ── Circuit Breaker State ──
const CIRCUIT_BREAKER = {
    failureCount: 0,
    lastFailure: 0,
    state: 'CLOSED',             // CLOSED (normal), OPEN (blocking), HALF_OPEN (testing)
    threshold: 5,                // Open after 5 consecutive failures
    resetTimeMs: 30000,          // Try again after 30s
};

// ── Query Metrics ──
const QUERY_METRICS = {
    total: 0,
    blocked_write: 0,
    killed_timeout: 0,
    circuit_opened: 0,
    errors: 0,
    slowest_query_ms: 0,
    avg_query_ms: 0,
    _total_ms: 0,
};

export function getQueryMetrics() {
    return {
        ...QUERY_METRICS,
        avg_query_ms: QUERY_METRICS.total > 0
            ? Math.round(QUERY_METRICS._total_ms / QUERY_METRICS.total)
            : 0,
        circuit_breaker_state: CIRCUIT_BREAKER.state,
    };
}

export async function getPool() {
    if (pool && isConnected) return pool;
    try {
        pool = mysql.createPool(MYSQL_CONFIG);
        const conn = await pool.getConnection();
        conn.release();
        isConnected = true;
        logger.info('MySQL Connected', { host: MYSQL_CONFIG.host, database: MYSQL_CONFIG.database, poolSize: MYSQL_CONFIG.connectionLimit });

        // Health check every 30s — auto-reconnect if connection drops
        if (_healthCheckInterval) clearInterval(_healthCheckInterval);
        _healthCheckInterval = setInterval(async () => {
            try {
                await pool.query('SELECT 1');
            } catch (e) {
                logger.warn('MySQL health check failed, attempting reconnection...');
                isConnected = false;
            }
        }, 30000);

        return pool;
    } catch (err) {
        logger.error('MySQL connection failed', { error: err.message });
        isConnected = false;
        pool = null;
        throw err;
    }
}

// ── Semaphore stats (for debug/health endpoint) ──
export function getSemaphoreStats() {
    return { running: _running, queued: _queue.length, max: MAX_CONCURRENT };
}

// ============================================================
// Local Memory Cache for Heavy Queries (Reduces Replica Load)
// ✅ OPTIMIZED: Non-blocking cleanup using LRU pattern
// ============================================================
const DB_CACHE = {};
const CACHE_METADATA = new Map(); // Track insertion order for LRU
let _cacheEntryCount = 0;         // Cheap counter — avoids Object.keys() on every cleanup

// Cache configuration
const MAX_CACHE_SIZE = 500;
const DEFAULT_TTL_MINUTES = 5;

// Helper: add/update a cache entry (maintains _cacheEntryCount)
function _cacheSet(key, data, expiry) {
    const isNew = !(key in DB_CACHE);
    DB_CACHE[key] = { data, expiry };
    CACHE_METADATA.set(key, { insertedAt: Date.now() });
    if (isNew) _cacheEntryCount++;
}

// Helper: delete a cache entry (maintains _cacheEntryCount)
function _cacheDelete(key) {
    if (key in DB_CACHE) {
        delete DB_CACHE[key];
        CACHE_METADATA.delete(key);
        _cacheEntryCount--;
    }
}

// Non-blocking cache cleanup (doesn't block event loop)
setInterval(() => {
    const now = Date.now();
    const entriesToDelete = [];

    // Identify expired entries (doesn't delete yet)
    for (const k in DB_CACHE) {
        if (now > DB_CACHE[k].expiry) {
            entriesToDelete.push(k);
        }
    }

    // Delete in next event loop iteration (non-blocking)
    if (entriesToDelete.length > 0) {
        setImmediate(() => {
            entriesToDelete.forEach(k => _cacheDelete(k));
            logger.debug('Cache cleanup', { entries_purged: entriesToDelete.length, cache_size: _cacheEntryCount });
        });
    }

    // Enforce max cache size (LRU eviction) — uses cheap counter
    if (_cacheEntryCount > MAX_CACHE_SIZE) {
        const sortedByAge = Array.from(CACHE_METADATA.entries())
            .sort((a, b) => a[1].insertedAt - b[1].insertedAt);

        // Remove oldest 10% of entries
        const toRemove = Math.ceil(MAX_CACHE_SIZE * 0.1);
        for (let i = 0; i < toRemove && i < sortedByAge.length; i++) {
            _cacheDelete(sortedByAge[i][0]);
        }
    }
}, 60000); // Cleanup every minute

// Track in-flight background revalidations to avoid duplicate fetches
const _revalidating = new Set();

export async function dbQueryHeavy(key, ttlMins, sql, params = []) {
    const ttlMs = ttlMins * 60000;
    const now = Date.now();

    // Check Cache — fresh hit
    if (DB_CACHE[key] && now < DB_CACHE[key].expiry) {
        process.stdout.write(`⚡ [CACHE_HIT] ${key} `);
        return DB_CACHE[key].data;
    }

    // Stale-while-revalidate: if stale data exists, return it immediately
    // and kick off a background refresh (only one at a time per key)
    if (DB_CACHE[key] && DB_CACHE[key].data) {
        if (!_revalidating.has(key)) {
            _revalidating.add(key);
            // Background refresh — fire and forget
            dbQuery(sql, params, { timeoutMs: 25000 })
                .then(data => {
                    _cacheSet(key, data, Date.now() + ttlMs);
                    logger.info('Stale-while-revalidate refreshed', { key });
                })
                .catch(err => {
                    logger.warn('Background revalidation failed', { key, error: err.message });
                })
                .finally(() => _revalidating.delete(key));
        }
        process.stdout.write(`♻️ [STALE_REVALIDATE] ${key} `);
        return DB_CACHE[key].data;
    }

    // No cached data at all — must fetch synchronously
    try {
        const start = Date.now();
        // Heavy queries get a longer timeout (25s instead of default 10s)
        const data = await dbQuery(sql, params, { timeoutMs: 25000 });
        _cacheSet(key, data, now + ttlMs);
        const ms = Date.now() - start;
        logger.info('Heavy query cached', { key, duration: ms, ttl: `${ttlMins}m` });
        return data;
    } catch (err) {
        logger.warn('Heavy query failed, no cached data available', { key, error: err.message });
        throw err;
    }
}

export async function dbQueryOneHeavy(key, ttlMins, sql, params = []) {
    const rows = await dbQueryHeavy(key, ttlMins, sql, params);
    return rows?.[0] || null;
}

// ============================================================
// 🛡️ HARDENED dbQuery — Read-Only + Circuit Breaker + KILL
// ============================================================
// Security layers:
//   1. Application-level write blocking (regex check)
//   2. Circuit breaker (stop queries if DB is failing)
//   3. MySQL KILL (actually terminates long queries on server)
//   4. Query timing and metrics
// ============================================================

// ── Blocked SQL patterns (comprehensive) ──
const WRITE_PATTERNS = /^\s*(UPDATE|DELETE|INSERT|REPLACE|CREATE|DROP|ALTER|RENAME|TRUNCATE|GRANT|REVOKE|LOAD|CALL|SET\s+GLOBAL|FLUSH|OPTIMIZE|REPAIR|LOCK|UNLOCK)\b/i;

// ── Dangerous patterns (sub-query injection attempts) ──
const DANGEROUS_PATTERNS = /;\s*(UPDATE|DELETE|INSERT|DROP|ALTER|TRUNCATE|CREATE|GRANT)/i;

export async function dbQuery(sql, params = [], opts = {}) {
    // Smart timeout: Detect query complexity and adjust timeout
    // - Simple SELECT COUNT: 5s
    // - Simple SELECT with filters: 10s (default)
    // - JOINs and GROUP BY: 15s
    // - Heavy aggregations: 25s
    let defaultTimeout = 10000;
    
    if (opts.timeoutMs !== undefined) {
        defaultTimeout = opts.timeoutMs;
    } else {
        // Auto-detect query complexity
        const sqlUpper = sql.toUpperCase();
        if (sqlUpper.includes('COUNT(*)') && !sqlUpper.includes('JOIN')) {
            defaultTimeout = 5000;  // Simple aggregate
        } else if (sqlUpper.includes('JOIN') || sqlUpper.includes('GROUP BY')) {
            defaultTimeout = 15000;  // Complex query with joins/grouping
        } else if (sqlUpper.includes('UNION') || sqlUpper.includes('WITH RECURSIVE')) {
            defaultTimeout = 25000;  // Very complex query
        }
    }
    
    const timeoutMs = defaultTimeout;
    QUERY_METRICS.total++;

    // ━━━━━ Layer 1: Read-Only Enforcement ━━━━━
    if (WRITE_PATTERNS.test(sql)) {
        QUERY_METRICS.blocked_write++;
        const preview = sql.trim().substring(0, 40);
        throw new Error(`🚫 SECURITY: Write operation BLOCKED on Slave Replica: "${preview}..."`);
    }

    if (DANGEROUS_PATTERNS.test(sql)) {
        QUERY_METRICS.blocked_write++;
        throw new Error(`🚫 SECURITY: Potentially dangerous SQL pattern detected and blocked`);
    }

    // ━━━━━ Layer 2: Circuit Breaker Check ━━━━━
    if (CIRCUIT_BREAKER.state === 'OPEN') {
        const elapsed = Date.now() - CIRCUIT_BREAKER.lastFailure;
        if (elapsed < CIRCUIT_BREAKER.resetTimeMs) {
            throw new Error(`⚡ CIRCUIT_BREAKER: Database queries paused (${Math.round((CIRCUIT_BREAKER.resetTimeMs - elapsed) / 1000)}s until retry)`);
        }
        // Transition to HALF_OPEN
        CIRCUIT_BREAKER.state = 'HALF_OPEN';
        logger.info('Circuit Breaker transitioning to HALF_OPEN state');
    }

    // ━━━━━ Layer 3: Semaphore — limit concurrent queries ━━━━━
    await semAcquire();

    // ━━━━━ Layer 4: Execute with KILL-based timeout ━━━━━
    const p = await getPool();
    const startTime = Date.now();
    let connection = null;
    let connectionId = null;
    let killTimer = null;
    let wasKilled = false;
    const timeoutSec = Math.floor(timeoutMs / 1000);

    try {
        connection = await p.getConnection();
        connectionId = connection.threadId;

        // ━━━ SAFETY: Force READ-ONLY on every connection ━━━
        // Prevents accidental writes even on Master server
        try {
            await connection.query('SET SESSION TRANSACTION READ ONLY');
        } catch {
            // MariaDB <10.5 may not support this — regex blocking is still active
        }

        // Set session timeout as additional safety net
        // MariaDB uses max_statement_time (seconds), MySQL uses MAX_EXECUTION_TIME (ms)
        try {
            await connection.query(`SET SESSION max_statement_time = ${timeoutSec}`);
        } catch {
            // Silently ignore — KILL timer is the primary protection
        }

        // Schedule KILL if query exceeds timeout
        killTimer = setTimeout(async () => {
            wasKilled = true;
            QUERY_METRICS.killed_timeout++;
            logger.warn('Query timeout - killing connection', { connectionId, timeoutSec });
            try {
                // Use a separate connection to KILL the long query
                const killConn = await p.getConnection();
                await killConn.query(`KILL QUERY ${connectionId}`);
                killConn.release();
            } catch (killErr) {
                logger.error('Failed to kill query', { connectionId, error: killErr.message });
            }
        }, timeoutMs);

        // Execute query
        const [rows] = params.length > 0
            ? await connection.execute(sql, params)
            : await connection.query(sql);

        // Success — clear timers and update metrics
        clearTimeout(killTimer);
        const duration = Date.now() - startTime;
        QUERY_METRICS._total_ms += duration;
        if (duration > QUERY_METRICS.slowest_query_ms) {
            QUERY_METRICS.slowest_query_ms = duration;
        }

        // Slow query warning (>3s)
        if (duration > 3000) {
            const preview = sql.trim().substring(0, 80).replace(/\s+/g, ' ');
            logger.warn('Slow query detected', { duration, query: preview });
        }

        // Reset circuit breaker on success
        if (CIRCUIT_BREAKER.state !== 'CLOSED') {
            CIRCUIT_BREAKER.state = 'CLOSED';
            CIRCUIT_BREAKER.failureCount = 0;
            logger.info('Circuit Breaker recovered to CLOSED state');
        }

        return rows;

    } catch (err) {
        clearTimeout(killTimer);
        QUERY_METRICS.errors++;

        if (wasKilled) {
            throw new Error(`⏱️ QUERY_TIMEOUT: SQL exceeded ${timeoutSec}s limit and was killed to protect Slave1`);
        }

        // Circuit Breaker: only track CONNECTION failures, not SQL errors
        // SQL errors (Unknown column, syntax, etc.) are app bugs — not DB health issues
        const isConnectionError = !err.message.includes('Unknown column')
            && !err.message.includes('doesn\'t exist')
            && !err.message.includes('syntax')
            && !err.message.includes('You have an error in your SQL')
            && !err.message.includes('QUERY_TIMEOUT')
            && !err.message.includes('max_statement_time exceeded')
            && err.code !== 'ER_BAD_FIELD_ERROR'
            && err.code !== 'ER_NO_SUCH_TABLE'
            && err.code !== 'ER_PARSE_ERROR';

        if (isConnectionError) {
            CIRCUIT_BREAKER.failureCount++;
            CIRCUIT_BREAKER.lastFailure = Date.now();

            if (CIRCUIT_BREAKER.failureCount >= CIRCUIT_BREAKER.threshold) {
                CIRCUIT_BREAKER.state = 'OPEN';
                QUERY_METRICS.circuit_opened++;
                logger.error('Circuit Breaker OPEN', {
                    failureCount: CIRCUIT_BREAKER.failureCount,
                    resetTimeMs: CIRCUIT_BREAKER.resetTimeMs
                });
            }
        }

        // Self-Heal: route error for detection & auto-fix
        import('../ai/selfHeal.js').then(({ handleError }) => handleError(err, { source: 'dbQuery', query: sql?.substring(0, 80) })).catch(() => {});

        throw err;

    } finally {
        semRelease();
        if (connection) {
            try { connection.release(); } catch (err) {
                logger.warn('Failed to release database connection', { message: err.message });
            }
        }
    }
}

export async function dbQueryOne(sql, params = []) {
    try {
        const rows = await dbQuery(sql, params);
        return rows?.[0] || null;
    } catch (err) {
        logger.error('dbQueryOne failed', { error: err.message });
        throw err;
    }
}

export function isMySQLConnected() { return isConnected; }

export async function closePool() {
    if (pool) { await pool.end(); pool = null; isConnected = false; }
}

export default { getPool, dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy, isMySQLConnected, closePool, getQueryMetrics, getSemaphoreStats };
