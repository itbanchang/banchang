// ============================================================
// BCH 360° Intelligence V.10 - MySQL Connection (Hardened)
// HOSxP XE Slave1 Server — Read-Only + Circuit Breaker
// ============================================================
import mysql from 'mysql2/promise';

const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST || '10.1.0.3',
    database: process.env.MYSQL_DB || 'bchhosxpxe',
    user: process.env.MYSQL_USER || 'dataaudit',
    password: process.env.MYSQL_PASS || 'dataaudit',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 30,          // ↑ from 20 — more concurrent queries
    maxIdle: 15,                  // ↑ from 10 — keep more idle connections warm
    idleTimeout: 120000,          // ↑ from 60s — reduce reconnect overhead
    queueLimit: 100,              // ↑ from 0 — prevent unbounded queue
    connectTimeout: 5000,
    charset: 'utf8mb4',
    timezone: '+07:00',
    enableKeepAlive: true,
    keepAliveInitialDelay: 5000,
    namedPlaceholders: false,
    decimalNumbers: true,         // return decimals as numbers, not strings
    supportBigNumbers: true,
    bigNumberStrings: false,
    dateStrings: true,            // return dates as strings — avoid TZ conversion overhead
};

let pool = null;
let isConnected = false;

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
        console.log(`✅ MySQL Connected: ${MYSQL_CONFIG.host}/${MYSQL_CONFIG.database} (pool: ${MYSQL_CONFIG.connectionLimit})`);

        // Health check every 30s — auto-reconnect if connection drops
        setInterval(async () => {
            try {
                await pool.query('SELECT 1');
            } catch (e) {
                console.warn('⚠️ MySQL health check failed, reconnecting...');
                isConnected = false;
            }
        }, 30000);

        return pool;
    } catch (err) {
        console.error(`❌ MySQL Failed: ${err.message}`);
        isConnected = false;
        pool = null;
        throw err;
    }
}

// ------------------------------------------------------------
// Local Memory Cache for Heavy Queries (Reduces Replica Load)
// ------------------------------------------------------------
const DB_CACHE = {};
setInterval(() => {
    const now = Date.now();
    for (const k in DB_CACHE) {
        if (now > DB_CACHE[k].expiry) delete DB_CACHE[k];
    }
}, 60000); // Cleanup every minute

export async function dbQueryHeavy(key, ttlMins, sql, params = []) {
    const ttlMs = ttlMins * 60000;
    const now = Date.now();

    // Check Cache
    if (DB_CACHE[key] && now < DB_CACHE[key].expiry) {
        process.stdout.write(`⚡ [CACHE_HIT] ${key} `);
        return DB_CACHE[key].data;
    }

    try {
        const start = Date.now();
        const data = await dbQuery(sql, params);
        DB_CACHE[key] = { data, expiry: now + ttlMs };
        const ms = Date.now() - start;
        console.log(`\n💾 [DB_FETCH_HEAVY] ${key} (${ms}ms) -> Cached for ${ttlMins}m`);
        return data;
    } catch (err) {
        console.warn(`⚠️ [DB_HEAVY_WARN] ${key} failed, falling back to STALE if exists.`);
        if (DB_CACHE[key]) return DB_CACHE[key].data; // Fallback to stale data if DB fails
        return [];
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

export async function dbQuery(sql, params = []) {
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
        console.log('🔄 Circuit Breaker: HALF_OPEN — testing connection...');
    }

    // ━━━━━ Layer 3: Execute with KILL-based timeout ━━━━━
    const p = await getPool();
    const startTime = Date.now();
    let connection = null;
    let connectionId = null;
    let killTimer = null;
    let wasKilled = false;

    try {
        connection = await p.getConnection();
        connectionId = connection.threadId;

        // Set session timeout as additional safety net
        // MariaDB uses max_statement_time (seconds), MySQL uses MAX_EXECUTION_TIME (ms)
        try {
            await connection.query('SET SESSION max_statement_time = 10');
        } catch {
            // Silently ignore — KILL timer is the primary protection
        }

        // Schedule KILL if query exceeds 10 seconds
        killTimer = setTimeout(async () => {
            wasKilled = true;
            QUERY_METRICS.killed_timeout++;
            console.warn(`\n⏱️ [KILL] Query exceeded 10s — KILLING connection ${connectionId}`);
            try {
                // Use a separate connection to KILL the long query
                const killConn = await p.getConnection();
                await killConn.query(`KILL QUERY ${connectionId}`);
                killConn.release();
            } catch (killErr) {
                console.error(`  ⚠️ KILL failed: ${killErr.message}`);
            }
        }, 10000);

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

        // Slow query warning (> 3s)
        if (duration > 3000) {
            const preview = sql.trim().substring(0, 80).replace(/\s+/g, ' ');
            console.warn(`\n🐢 [SLOW] ${duration}ms: ${preview}...`);
        }

        // Reset circuit breaker on success
        if (CIRCUIT_BREAKER.state !== 'CLOSED') {
            CIRCUIT_BREAKER.state = 'CLOSED';
            CIRCUIT_BREAKER.failureCount = 0;
            console.log('✅ Circuit Breaker: CLOSED (recovered)');
        }

        return rows;

    } catch (err) {
        clearTimeout(killTimer);
        QUERY_METRICS.errors++;

        if (wasKilled) {
            throw new Error(`⏱️ QUERY_TIMEOUT: SQL exceeded 10s limit and was killed to protect Slave1`);
        }

        // Circuit Breaker: only track CONNECTION failures, not SQL errors
        // SQL errors (Unknown column, syntax, etc.) are app bugs — not DB health issues
        const isConnectionError = !err.message.includes('Unknown column')
            && !err.message.includes('doesn\'t exist')
            && !err.message.includes('syntax')
            && !err.message.includes('You have an error in your SQL')
            && err.code !== 'ER_BAD_FIELD_ERROR'
            && err.code !== 'ER_NO_SUCH_TABLE'
            && err.code !== 'ER_PARSE_ERROR';

        if (isConnectionError) {
            CIRCUIT_BREAKER.failureCount++;
            CIRCUIT_BREAKER.lastFailure = Date.now();

            if (CIRCUIT_BREAKER.failureCount >= CIRCUIT_BREAKER.threshold) {
                CIRCUIT_BREAKER.state = 'OPEN';
                CIRCUIT_BREAKER.circuit_opened++;
                QUERY_METRICS.circuit_opened++;
                console.error(`\n🔴 Circuit Breaker: OPEN — ${CIRCUIT_BREAKER.failureCount} consecutive failures. Pausing for ${CIRCUIT_BREAKER.resetTimeMs / 1000}s`);
            }
        }

        throw err;

    } finally {
        if (connection) {
            try { connection.release(); } catch { /* ignore release errors */ }
        }
    }
}

export async function dbQueryOne(sql, params = []) {
    try {
        const rows = await dbQuery(sql, params);
        return rows?.[0] || null;
    } catch (err) {
        console.error(`❌ dbQueryOne Failed: ${err.message}`);
        throw err;
    }
}

export function isMySQLConnected() { return isConnected; }

export async function closePool() {
    if (pool) { await pool.end(); pool = null; isConnected = false; }
}

export default { getPool, dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy, isMySQLConnected, closePool, getQueryMetrics };
