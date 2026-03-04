// ============================================================
// BCH 360° Intelligence V.10 - MySQL Connection (Optimized)
// HOSxP XE Slave1 Server — Performance Tuned
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

// Use query() instead of execute() — faster for non-parameterized queries
// execute() does prepare → execute → close (3 round trips)
// query() does a single round trip
export async function dbQuery(sql, params = []) {
    const p = await getPool();
    const [rows] = params.length > 0 ? await p.execute(sql, params) : await p.query(sql);
    return rows;
}

export async function dbQueryOne(sql, params = []) {
    const rows = await dbQuery(sql, params);
    return rows?.[0] || null;
}

export function isMySQLConnected() { return isConnected; }

export async function closePool() {
    if (pool) { await pool.end(); pool = null; isConnected = false; }
}

export default { getPool, dbQuery, dbQueryOne, isMySQLConnected, closePool };
