// ============================================================
// BCH 360° — Enhanced Audit Log (Every API call · SQLite backed)
//
// Captures: user · IP · UA · method · path · status · duration
// Storage: data_lake/warehouse.db → audit_log_enhanced table
// Write strategy: Batch buffer (50 rows or 2s flush) for perf
// Retention: 90 days (auto-prune daily at 03:00)
// ============================================================
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DW_PATH = path.resolve(__dirname, '../../data_lake/warehouse.db');

let db = null;
let insertStmt = null;

// ── Batch buffer for performance ──
const buffer = [];
const BATCH_SIZE = 50;
const FLUSH_MS = 2000;
let flushTimer = null;

/** Initialize audit log DB + schema (idempotent) */
export function initAuditLog() {
    try {
        fs.mkdirSync(path.dirname(DW_PATH), { recursive: true });
        db = new Database(DW_PATH);
        db.pragma('journal_mode = WAL');
        db.pragma('synchronous = NORMAL');

        db.exec(`
            CREATE TABLE IF NOT EXISTS audit_log_enhanced (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                ts              TEXT NOT NULL,
                user_id         TEXT,
                username        TEXT,
                role            TEXT,
                ip              TEXT,
                forwarded_ip    TEXT,
                user_agent      TEXT,
                method          TEXT NOT NULL,
                path            TEXT NOT NULL,
                query_string    TEXT,
                status          INTEGER,
                duration_ms     INTEGER,
                bytes_out       INTEGER,
                error_msg       TEXT,
                is_login        INTEGER DEFAULT 0,
                is_export       INTEGER DEFAULT 0,
                is_suspicious   INTEGER DEFAULT 0
            );

            CREATE INDEX IF NOT EXISTS idx_audit_ts ON audit_log_enhanced(ts DESC);
            CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log_enhanced(user_id, ts DESC);
            CREATE INDEX IF NOT EXISTS idx_audit_ip ON audit_log_enhanced(ip, ts DESC);
            CREATE INDEX IF NOT EXISTS idx_audit_status ON audit_log_enhanced(status);
            CREATE INDEX IF NOT EXISTS idx_audit_login ON audit_log_enhanced(is_login, ts DESC)
                WHERE is_login = 1;
            CREATE INDEX IF NOT EXISTS idx_audit_suspicious ON audit_log_enhanced(is_suspicious, ts DESC)
                WHERE is_suspicious = 1;
        `);

        insertStmt = db.prepare(`
            INSERT INTO audit_log_enhanced
                (ts, user_id, username, role, ip, forwarded_ip, user_agent,
                 method, path, query_string, status, duration_ms, bytes_out,
                 error_msg, is_login, is_export, is_suspicious)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        logger.info('Enhanced audit log initialized', { db: DW_PATH });
        return true;
    } catch (err) {
        logger.error('Audit log init failed', { error: err.message });
        return false;
    }
}

/** Append to buffer, flush when full or on timer */
function queueAudit(entry) {
    buffer.push(entry);
    if (buffer.length >= BATCH_SIZE) return flush();
    if (!flushTimer) flushTimer = setTimeout(flush, FLUSH_MS);
}

/** Write buffered entries to SQLite in a single transaction */
function flush() {
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
    if (buffer.length === 0 || !db) return;
    const batch = buffer.splice(0, buffer.length);
    try {
        const tx = db.transaction(rows => {
            for (const r of rows) insertStmt.run(...r);
        });
        tx(batch);
    } catch (err) {
        logger.error('Audit flush failed', { error: err.message, lost: batch.length });
    }
}

// Ensure buffer flushes on shutdown
process.on('SIGTERM', () => { flush(); });
process.on('SIGINT', () => { flush(); });
process.on('beforeExit', () => { flush(); });

/** Express middleware — logs every request (attach after auth) */
export function auditAllMiddleware() {
    return (req, res, next) => {
        const start = Date.now();
        const originalSend = res.send;
        let bytesOut = 0;

        res.send = function (body) {
            if (body) bytesOut = Buffer.byteLength(typeof body === 'string' ? body : JSON.stringify(body));
            return originalSend.call(this, body);
        };

        res.on('finish', () => {
            try {
                const duration = Date.now() - start;
                const user = req.user || {};
                const ip = req.ip || req.connection?.remoteAddress || 'unknown';
                const forwarded = req.headers['x-forwarded-for'] || null;
                const ua = (req.headers['user-agent'] || '').substring(0, 250);

                // Flag special events
                const isLogin = /\/api\/auth\/login/i.test(req.originalUrl);
                const isExport = /\/(export|download)/i.test(req.originalUrl)
                    || /\.(xlsx|csv|pdf)$/i.test(req.originalUrl);
                const isSuspicious =
                    res.statusCode === 401 || res.statusCode === 403 ||
                    res.statusCode === 429 ||
                    res.statusCode === 444 ||
                    (isLogin && res.statusCode >= 400) ||
                    (ua === '' || /bot|scanner|crawler|sqlmap|nikto/i.test(ua));

                const errorMsg = res.statusCode >= 400 ? (res.locals?.errorMessage || null) : null;

                queueAudit([
                    new Date().toISOString(),
                    user.id || null,
                    user.username || 'anonymous',
                    user.role || null,
                    String(ip).substring(0, 45),
                    forwarded ? String(forwarded).substring(0, 250) : null,
                    ua,
                    req.method,
                    req.originalUrl.split('?')[0].substring(0, 250),
                    (req.originalUrl.split('?')[1] || '').substring(0, 500),
                    res.statusCode,
                    duration,
                    bytesOut,
                    errorMsg ? String(errorMsg).substring(0, 500) : null,
                    isLogin ? 1 : 0,
                    isExport ? 1 : 0,
                    isSuspicious ? 1 : 0,
                ]);
            } catch (err) {
                // Silent fail — don't break request
            }
        });

        next();
    };
}

/** Query audit logs (admin only) */
export function queryAuditLogs(filters = {}) {
    if (!db) return { rows: [], total: 0 };
    const conditions = [];
    const params = [];
    if (filters.from) { conditions.push('ts >= ?'); params.push(filters.from); }
    if (filters.to) { conditions.push('ts <= ?'); params.push(filters.to); }
    if (filters.user) { conditions.push('username = ?'); params.push(filters.user); }
    if (filters.ip) { conditions.push('ip = ?'); params.push(filters.ip); }
    if (filters.method) { conditions.push('method = ?'); params.push(filters.method); }
    if (filters.min_status) { conditions.push('status >= ?'); params.push(Number(filters.min_status)); }
    if (filters.max_status) { conditions.push('status <= ?'); params.push(Number(filters.max_status)); }
    if (filters.path_like) { conditions.push('path LIKE ?'); params.push('%' + filters.path_like + '%'); }
    if (filters.suspicious_only === '1' || filters.suspicious_only === true) {
        conditions.push('is_suspicious = 1');
    }
    if (filters.login_only === '1' || filters.login_only === true) {
        conditions.push('is_login = 1');
    }

    const where = conditions.length ? ('WHERE ' + conditions.join(' AND ')) : '';
    const limit = Math.min(parseInt(filters.limit) || 100, 1000);
    const offset = parseInt(filters.offset) || 0;

    const total = db.prepare(`SELECT COUNT(*) as n FROM audit_log_enhanced ${where}`).get(...params).n;
    const rows = db.prepare(`
        SELECT id, ts, username, role, ip, forwarded_ip, user_agent,
               method, path, query_string, status, duration_ms, bytes_out,
               error_msg, is_login, is_export, is_suspicious
        FROM audit_log_enhanced ${where}
        ORDER BY ts DESC
        LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    return { rows, total, limit, offset };
}

/** Stats — aggregate view */
export function getAuditStats(hoursBack = 24) {
    if (!db) return null;
    const since = new Date(Date.now() - hoursBack * 3600_000).toISOString();
    const stats = db.prepare(`
        SELECT
            COUNT(*) AS total_requests,
            COUNT(DISTINCT username) AS unique_users,
            COUNT(DISTINCT ip) AS unique_ips,
            SUM(CASE WHEN status >= 200 AND status < 300 THEN 1 ELSE 0 END) AS status_2xx,
            SUM(CASE WHEN status >= 400 AND status < 500 THEN 1 ELSE 0 END) AS status_4xx,
            SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS status_5xx,
            SUM(is_login) AS login_attempts,
            SUM(CASE WHEN is_login = 1 AND status >= 400 THEN 1 ELSE 0 END) AS login_failed,
            SUM(is_export) AS exports,
            SUM(is_suspicious) AS suspicious_count,
            AVG(duration_ms) AS avg_duration_ms,
            MAX(duration_ms) AS max_duration_ms,
            SUM(bytes_out) AS total_bytes_out
        FROM audit_log_enhanced
        WHERE ts >= ?
    `).get(since);

    const topUsers = db.prepare(`
        SELECT username, COUNT(*) AS requests
        FROM audit_log_enhanced
        WHERE ts >= ? AND username != 'anonymous'
        GROUP BY username
        ORDER BY requests DESC
        LIMIT 10
    `).all(since);

    const topIPs = db.prepare(`
        SELECT ip, COUNT(*) AS requests,
               SUM(is_suspicious) AS suspicious,
               GROUP_CONCAT(DISTINCT username) AS users
        FROM audit_log_enhanced
        WHERE ts >= ?
        GROUP BY ip
        ORDER BY requests DESC
        LIMIT 10
    `).all(since);

    const topPaths = db.prepare(`
        SELECT path, COUNT(*) AS hits, AVG(duration_ms) AS avg_ms
        FROM audit_log_enhanced
        WHERE ts >= ?
        GROUP BY path
        ORDER BY hits DESC
        LIMIT 15
    `).all(since);

    return { hoursBack, since, stats, topUsers, topIPs, topPaths };
}

/** Auto-prune logs older than N days */
export function pruneOldLogs(retentionDays = 90) {
    if (!db) return 0;
    const cutoff = new Date(Date.now() - retentionDays * 86400_000).toISOString();
    const result = db.prepare('DELETE FROM audit_log_enhanced WHERE ts < ?').run(cutoff);
    if (result.changes > 0) {
        logger.info('Audit log pruned', { deleted: result.changes, retention_days: retentionDays });
    }
    return result.changes;
}

/** Daily retention job */
let pruneTimer = null;
export function startRetentionJob(retentionDays = 90) {
    if (pruneTimer) clearInterval(pruneTimer);
    // Run once immediately (catches logs from previous sessions)
    setTimeout(() => pruneOldLogs(retentionDays), 10_000);
    // Then every 24 hours
    pruneTimer = setInterval(() => pruneOldLogs(retentionDays), 24 * 3600_000);
}
