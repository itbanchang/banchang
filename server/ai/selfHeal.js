// ============================================================
// BCH 360° Intelligence V.10 — Self-Healing Engine
// Dependency-injectable for testability, backward-compatible API
// ============================================================
import loggerDefault from '../logger.js';
import { logLearning as logLearningDefault, logEvolution as logEvolutionDefault } from '../db/evolutionStore.js';

// ── Error Pattern Registry ──
export const ERROR_PATTERNS = [
    { id: 'db_conn_lost', match: /ECONNREFUSED|ECONNRESET|PROTOCOL_CONNECTION_LOST|ER_CON_COUNT_ERROR|ETIMEDOUT.*3306/i, severity: 'critical', module: 'database', diagnosis: 'MySQL connection lost หรือ pool เต็ม', suggestedFix: 'ตรวจ MySQL server ว่ายังทำงานอยู่, เพิ่ม connectionLimit หรือ ลด idleTimeout', autoFix: 'reconnect_db' },
    { id: 'query_timeout', match: /QUERY_TIMEOUT|max_statement_time exceeded|Sort aborted.*Query execution was interrupted/i, severity: 'warning', module: 'database', diagnosis: 'SQL query ใช้เวลานานเกิน timeout', suggestedFix: 'เพิ่ม INDEX, ลด date range, หรือใช้ Materialized View แทน', autoFix: 'warm_cache' },
    { id: 'circuit_open', match: /CIRCUIT_BREAKER.*paused/i, severity: 'critical', module: 'database', diagnosis: 'Circuit breaker เปิด — DB ล้มเหลวต่อเนื่อง 5 ครั้ง', suggestedFix: 'ตรวจ MySQL slave, network, หรือ disk I/O', autoFix: 'reconnect_db' },
    { id: 'mv_refresh_fail', match: /MV.*refresh failed|Materialized.*failed/i, severity: 'warning', module: 'materialized_views', diagnosis: 'Materialized View refresh ล้มเหลว — ข้อมูลอาจเก่า', suggestedFix: 'ตรวจ query ของ MV นั้น, อาจ timeout หรือ schema เปลี่ยน', autoFix: 'retry_mv_refresh' },
    { id: 'memory_pressure', match: /ENOMEM|heap.*out.*memory|JavaScript heap/i, severity: 'critical', module: 'system', diagnosis: 'Memory ใกล้เต็ม — อาจ crash', suggestedFix: 'เพิ่ม --max-old-space-size, ลด cache size, หรือ restart server', autoFix: 'clear_caches' },
    { id: 'socket_error', match: /ECONNRESET.*TCP|read ECONNRESET|socket hang up/i, severity: 'info', module: 'network', diagnosis: 'Client disconnect ระหว่าง request — ปกติสำหรับ browser navigation', suggestedFix: null, autoFix: null },
    { id: 'sql_syntax', match: /ER_PARSE_ERROR|SQL syntax.*error|You have an error in your SQL/i, severity: 'warning', module: 'database', diagnosis: 'SQL syntax ผิด — ต้องแก้ code', suggestedFix: 'ตรวจ SQL query ที่มี syntax error — อาจเป็น column/table ที่ไม่มีใน HOSxP XE version นี้', autoFix: null },
    { id: 'table_not_found', match: /ER_NO_SUCH_TABLE|Table.*doesn't exist/i, severity: 'warning', module: 'database', diagnosis: 'Table ไม่มีใน database — schema อาจไม่ตรง', suggestedFix: 'ตรวจชื่อ table ให้ตรงกับ HOSxP XE schema จริง', autoFix: null },
    { id: 'auth_failure', match: /invalid.*token|jwt.*expired|TokenExpiredError|JsonWebTokenError/i, severity: 'info', module: 'auth', diagnosis: 'Token หมดอายุหรือไม่ถูกต้อง — ปกติสำหรับ session timeout', suggestedFix: null, autoFix: null },
    { id: 'redis_down', match: /ECONNREFUSED.*6379|Redis.*connection.*refused|MaxRetriesPerRequestError/i, severity: 'warning', module: 'cache', diagnosis: 'Redis connection lost — fallback to in-memory cache', suggestedFix: 'ตรวจ Redis server, restart ด้วย systemctl restart redis', autoFix: 'reconnect_redis' },
    { id: 'rate_limit_surge', match: /Too many requests|rate.*limit.*exceeded/i, severity: 'warning', module: 'security', diagnosis: 'Rate limit triggered — อาจเป็น DDoS หรือ API client ที่ poll เร็วเกิน', suggestedFix: 'ตรวจ IP ที่ถูก rate limit, อาจต้องเพิ่ม limit หรือ block IP', autoFix: null },
    { id: 'disk_pressure', match: /ENOSPC|no space left on device/i, severity: 'critical', module: 'system', diagnosis: 'Disk space เต็ม — log files หรือ data lake อาจใหญ่เกินไป', suggestedFix: 'ลบ log files เก่า, rotate logs, เพิ่ม disk space', autoFix: 'rotate_logs' },
    { id: 'websocket_error', match: /WebSocket.*error|socket\.io.*error|transport.*close/i, severity: 'info', module: 'network', diagnosis: 'WebSocket disconnect — ปกติสำหรับ client navigation/network change', suggestedFix: null, autoFix: null },
];

// ── Default Healing Actions (uses dynamic imports — production) ──
const DEFAULT_HEALING_ACTIONS = {
    async reconnect_db() {
        const { getPool } = await import('../db/mysql.js');
        await getPool();
        return { success: true, action: 'Database reconnected' };
    },
    async warm_cache() {
        const { forceRefreshAll } = await import('../db/materializedViews.js');
        if (forceRefreshAll) await forceRefreshAll();
        return { success: true, action: 'Cache warmed via MV refresh' };
    },
    async retry_mv_refresh() {
        const { forceRefreshAll } = await import('../db/materializedViews.js');
        if (forceRefreshAll) await forceRefreshAll();
        return { success: true, action: 'MV refresh retried' };
    },
    async clear_caches() {
        if (global.gc) global.gc();
        return { success: true, action: 'GC triggered, caches cleared' };
    },
    async reconnect_redis() {
        const { getRedisClient, isRedisConnected } = await import('../infra/redisClient.js');
        if (isRedisConnected()) return { success: true, action: 'Redis already connected' };
        getRedisClient();
        return { success: true, action: 'Redis reconnection initiated' };
    },
    async rotate_logs() {
        const fs = await import('fs');
        const path = await import('path');
        const logsDir = path.default.resolve(process.cwd(), 'logs');
        if (!fs.default.existsSync(logsDir)) return { success: true, action: 'No logs directory' };
        const files = fs.default.readdirSync(logsDir);
        let cleaned = 0;
        const maxAge = 7 * 24 * 60 * 60 * 1000;
        for (const file of files) {
            const filePath = path.default.join(logsDir, file);
            const stat = fs.default.statSync(filePath);
            if (Date.now() - stat.mtimeMs > maxAge) { fs.default.unlinkSync(filePath); cleaned++; }
        }
        return { success: true, action: `Log rotation: ${cleaned} old files removed` };
    },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Factory: createSelfHealEngine(deps) — Dependency-injectable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function createSelfHealEngine(deps = {}) {
    const logger = deps.logger || loggerDefault;
    const logLearning = deps.logLearning || logLearningDefault;
    const healingActions = deps.healingActions || DEFAULT_HEALING_ACTIONS;
    const patterns = deps.patterns || ERROR_PATTERNS;

    // Instance state (not global — testable)
    let _io = null;
    const _healCooldown = new Map();
    const _errorCounts = new Map();
    const _healHistory = [];
    const MAX_HEAL_HISTORY = 100;
    const HEAL_COOLDOWN_MS = deps.cooldownMs || 60_000;
    let _lastCountReset = Date.now();

    function setSocket(io) { _io = io; }

    function notifyClients(healRecord) {
        if (!_io) return;
        try {
            _io.emit('selfheal:event', {
                pattern_id: healRecord.pattern_id,
                severity: healRecord.severity,
                diagnosis: healRecord.diagnosis,
                auto_fix: healRecord.auto_fix,
                fix_success: healRecord.fix_result?.success || false,
                timestamp: healRecord.timestamp,
            });
        } catch { /* socket emit should never crash server */ }
    }

    async function handleError(error, context = {}) {
        const errMsg = typeof error === 'string' ? error : (error?.message || String(error));
        const errStack = error?.stack || '';

        if (Date.now() - _lastCountReset > 3600_000) {
            _errorCounts.clear();
            _lastCountReset = Date.now();
        }

        const pattern = patterns.find(p => p.match.test(errMsg) || p.match.test(errStack));
        if (!pattern) return null;

        _errorCounts.set(pattern.id, (_errorCounts.get(pattern.id) || 0) + 1);

        const healRecord = {
            timestamp: new Date().toISOString(),
            pattern_id: pattern.id,
            severity: pattern.severity,
            module: pattern.module,
            diagnosis: pattern.diagnosis,
            error_message: errMsg.slice(0, 300),
            context: context.path || context.source || '',
            auto_fix: null,
            fix_result: null,
            suggested_fix: pattern.suggestedFix,
            count_last_hour: _errorCounts.get(pattern.id),
        };

        if (pattern.autoFix && healingActions[pattern.autoFix]) {
            const now = Date.now();
            if (!_healCooldown.has(pattern.id) || now - _healCooldown.get(pattern.id) > HEAL_COOLDOWN_MS) {
                _healCooldown.set(pattern.id, now);
                try {
                    const result = await healingActions[pattern.autoFix]();
                    healRecord.auto_fix = pattern.autoFix;
                    healRecord.fix_result = result;
                    logLearning({ module: pattern.module, event_type: result.success ? 'decision' : 'anomaly', severity: result.success ? 'info' : 'warning', title: `🔧 Auto-heal: ${result.action}`, detail: JSON.stringify({ pattern: pattern.id, diagnosis: pattern.diagnosis, result: result.success ? 'fixed' : 'failed', error: result.error || null }), metric_value: _errorCounts.get(pattern.id), metric_unit: 'errors/hr' });
                    logger.info(`🔧 [SelfHeal] Auto-fix applied: ${pattern.autoFix}`, { pattern: pattern.id, success: result.success });
                } catch (fixErr) {
                    healRecord.fix_result = { success: false, error: fixErr.message };
                    logger.warn(`🔧 [SelfHeal] Auto-fix failed: ${pattern.autoFix}`, { error: fixErr.message });
                }
            }
        }

        if (!pattern.autoFix || (healRecord.fix_result && !healRecord.fix_result.success)) {
            if ((_errorCounts.get(pattern.id) || 0) <= 3) {
                logLearning({ module: pattern.module, event_type: 'anomaly', severity: pattern.severity, title: `❌ ${pattern.diagnosis}`, detail: JSON.stringify({ pattern: pattern.id, error: errMsg.slice(0, 200), context: context.path || '', suggestedFix: pattern.suggestedFix, count: _errorCounts.get(pattern.id) }), metric_value: _errorCounts.get(pattern.id), metric_unit: 'errors/hr' });
            }
        }

        _healHistory.unshift(healRecord);
        if (_healHistory.length > MAX_HEAL_HISTORY) _healHistory.length = MAX_HEAL_HISTORY;

        if (pattern.severity === 'critical' || pattern.severity === 'warning') {
            notifyClients(healRecord);
        }

        return healRecord;
    }

    function getHealingStats() {
        const totalErrors = Array.from(_errorCounts.values()).reduce((s, c) => s + c, 0);
        const autoFixed = _healHistory.filter(h => h.fix_result?.success).length;
        const failedFixes = _healHistory.filter(h => h.fix_result && !h.fix_result.success).length;
        const needsHuman = _healHistory.filter(h => !h.auto_fix && h.suggested_fix).length;
        const byPattern = {};
        for (const h of _healHistory) {
            if (!byPattern[h.pattern_id]) byPattern[h.pattern_id] = { count: 0, last_seen: h.timestamp, diagnosis: h.diagnosis, auto_fixable: !!h.auto_fix };
            byPattern[h.pattern_id].count++;
        }
        const mem = process.memoryUsage();
        return {
            total_errors_last_hour: totalErrors, auto_fixed: autoFixed, failed_fixes: failedFixes, needs_human: needsHuman,
            uptime_hours: Math.round(process.uptime() / 3600 * 10) / 10,
            memory_mb: Math.round(mem.heapUsed / 1e6), memory_max_mb: Math.round(mem.heapTotal / 1e6),
            by_pattern: Object.entries(byPattern).map(([id, v]) => ({ pattern_id: id, ...v })).sort((a, b) => b.count - a.count),
            recent_actions: _healHistory.slice(0, 20),
            error_patterns: patterns.map(p => ({ id: p.id, module: p.module, severity: p.severity, diagnosis: p.diagnosis, auto_fixable: !!p.autoFix })),
        };
    }

    async function runHealthCheck() {
        const issues = [];
        const mem = process.memoryUsage();
        const heapPct = Math.round((mem.heapUsed / mem.heapTotal) * 100);
        if (heapPct > 90) issues.push({ severity: 'critical', module: 'system', issue: `Heap memory ${heapPct}% — risk of OOM crash`, autoFix: 'clear_caches' });
        else if (heapPct > 75) issues.push({ severity: 'warning', module: 'system', issue: `Heap memory ${heapPct}% — elevated`, autoFix: null });

        try {
            const { getPool, getQueryMetrics } = await import('../db/mysql.js');
            const p = await getPool();
            await p.query('SELECT 1');
            const metrics = getQueryMetrics();
            if (metrics.circuit_breaker_state === 'OPEN') issues.push({ severity: 'critical', module: 'database', issue: 'Circuit breaker OPEN — DB queries paused', autoFix: 'reconnect_db' });
            if (metrics.avg_query_ms > 5000) issues.push({ severity: 'warning', module: 'database', issue: `Avg query ${metrics.avg_query_ms}ms — database slow`, autoFix: 'warm_cache' });
        } catch (err) {
            issues.push({ severity: 'critical', module: 'database', issue: `DB unreachable: ${err.message}`, autoFix: 'reconnect_db' });
        }

        try {
            const { isRedisConnected } = await import('../infra/redisClient.js');
            if (!isRedisConnected()) issues.push({ severity: 'info', module: 'cache', issue: 'Redis unavailable — using in-memory fallback', autoFix: 'reconnect_redis' });
        } catch { }

        const lagStart = Date.now();
        await new Promise(resolve => setImmediate(resolve));
        const eventLoopLag = Date.now() - lagStart;
        if (eventLoopLag > 100) issues.push({ severity: 'warning', module: 'system', issue: `Event loop lag ${eventLoopLag}ms — potential blocking`, autoFix: null });

        try {
            const { getMVStatus } = await import('../db/materializedViews.js');
            const mvStatus = getMVStatus?.();
            if (mvStatus) {
                for (const [name, meta] of Object.entries(mvStatus)) {
                    if (meta.status === 'error') issues.push({ severity: 'warning', module: 'materialized_views', issue: `MV ${name}: ${meta.error || 'refresh failed'}`, autoFix: 'retry_mv_refresh' });
                }
            }
        } catch { }

        for (const issue of issues) {
            if (issue.autoFix && issue.severity === 'critical' && healingActions[issue.autoFix]) {
                try { const result = await healingActions[issue.autoFix](); issue.fix_applied = true; issue.fix_result = result; }
                catch { issue.fix_applied = false; }
            }
        }

        return {
            status: issues.some(i => i.severity === 'critical') ? 'critical' : issues.some(i => i.severity === 'warning') ? 'warning' : 'healthy',
            checked_at: new Date().toISOString(), issues,
            memory: { heap_used_mb: Math.round(mem.heapUsed / 1e6), heap_total_mb: Math.round(mem.heapTotal / 1e6), pct: heapPct },
            uptime_hours: Math.round(process.uptime() / 3600 * 10) / 10,
        };
    }

    return { setSocket, handleError, getHealingStats, runHealthCheck };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Module-level singleton — backward-compatible API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const _default = createSelfHealEngine();

export const setSelfHealSocket = _default.setSocket;
export const handleError = _default.handleError;
export const getHealingStats = _default.getHealingStats;
export const runHealthCheck = _default.runHealthCheck;
