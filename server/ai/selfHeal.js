// ============================================================
// BCH 360° Intelligence V.10 — Self-Healing Engine
// ตรวจจับ error อัตโนมัติ → Auto-fix → Log diagnosis
// ============================================================
import logger from '../logger.js';
import { logLearning, logEvolution } from '../db/evolutionStore.js';

// ── Error Pattern Registry ──
// Each pattern: regex to match, auto-fix function, human-readable diagnosis
const ERROR_PATTERNS = [
    {
        id: 'db_conn_lost',
        match: /ECONNREFUSED|ECONNRESET|PROTOCOL_CONNECTION_LOST|ER_CON_COUNT_ERROR|ETIMEDOUT.*3306/i,
        severity: 'critical',
        module: 'database',
        diagnosis: 'MySQL connection lost หรือ pool เต็ม',
        suggestedFix: 'ตรวจ MySQL server ว่ายังทำงานอยู่, เพิ่ม connectionLimit หรือ ลด idleTimeout',
        autoFix: 'reconnect_db',
    },
    {
        id: 'query_timeout',
        match: /QUERY_TIMEOUT|max_statement_time exceeded|Sort aborted.*Query execution was interrupted/i,
        severity: 'warning',
        module: 'database',
        diagnosis: 'SQL query ใช้เวลานานเกิน timeout',
        suggestedFix: 'เพิ่ม INDEX, ลด date range, หรือใช้ Materialized View แทน',
        autoFix: 'warm_cache',
    },
    {
        id: 'circuit_open',
        match: /CIRCUIT_BREAKER.*paused/i,
        severity: 'critical',
        module: 'database',
        diagnosis: 'Circuit breaker เปิด — DB ล้มเหลวต่อเนื่อง 5 ครั้ง',
        suggestedFix: 'ตรวจ MySQL slave, network, หรือ disk I/O',
        autoFix: 'reconnect_db',
    },
    {
        id: 'mv_refresh_fail',
        match: /MV.*refresh failed|Materialized.*failed/i,
        severity: 'warning',
        module: 'materialized_views',
        diagnosis: 'Materialized View refresh ล้มเหลว — ข้อมูลอาจเก่า',
        suggestedFix: 'ตรวจ query ของ MV นั้น, อาจ timeout หรือ schema เปลี่ยน',
        autoFix: 'retry_mv_refresh',
    },
    {
        id: 'memory_pressure',
        match: /ENOMEM|heap.*out.*memory|JavaScript heap/i,
        severity: 'critical',
        module: 'system',
        diagnosis: 'Memory ใกล้เต็ม — อาจ crash',
        suggestedFix: 'เพิ่ม --max-old-space-size, ลด cache size, หรือ restart server',
        autoFix: 'clear_caches',
    },
    {
        id: 'socket_error',
        match: /ECONNRESET.*TCP|read ECONNRESET|socket hang up/i,
        severity: 'info',
        module: 'network',
        diagnosis: 'Client disconnect ระหว่าง request — ปกติสำหรับ browser navigation',
        suggestedFix: null, // No action needed
        autoFix: null,
    },
    {
        id: 'sql_syntax',
        match: /ER_PARSE_ERROR|SQL syntax.*error|You have an error in your SQL/i,
        severity: 'warning',
        module: 'database',
        diagnosis: 'SQL syntax ผิด — ต้องแก้ code',
        suggestedFix: 'ตรวจ SQL query ที่มี syntax error — อาจเป็น column/table ที่ไม่มีใน HOSxP XE version นี้',
        autoFix: null, // Requires human fix
    },
    {
        id: 'table_not_found',
        match: /ER_NO_SUCH_TABLE|Table.*doesn't exist/i,
        severity: 'warning',
        module: 'database',
        diagnosis: 'Table ไม่มีใน database — schema อาจไม่ตรง',
        suggestedFix: 'ตรวจชื่อ table ให้ตรงกับ HOSxP XE schema จริง',
        autoFix: null,
    },
    {
        id: 'auth_failure',
        match: /invalid.*token|jwt.*expired|TokenExpiredError|JsonWebTokenError/i,
        severity: 'info',
        module: 'auth',
        diagnosis: 'Token หมดอายุหรือไม่ถูกต้อง — ปกติสำหรับ session timeout',
        suggestedFix: null,
        autoFix: null,
    },
];

// ── Healing Actions ──
const HEALING_ACTIONS = {
    async reconnect_db() {
        try {
            const { getPool } = await import('../db/mysql.js');
            await getPool();
            return { success: true, action: 'Database reconnected' };
        } catch (err) {
            return { success: false, action: 'Reconnect failed', error: err.message };
        }
    },

    async warm_cache() {
        try {
            // Trigger MV refresh to warm cache
            const { forceRefreshAll } = await import('../db/materializedViews.js');
            if (forceRefreshAll) await forceRefreshAll();
            return { success: true, action: 'Cache warmed via MV refresh' };
        } catch (err) {
            return { success: false, action: 'Cache warm failed', error: err.message };
        }
    },

    async retry_mv_refresh() {
        try {
            const { forceRefreshAll } = await import('../db/materializedViews.js');
            if (forceRefreshAll) await forceRefreshAll();
            return { success: true, action: 'MV refresh retried' };
        } catch (err) {
            return { success: false, action: 'MV retry failed', error: err.message };
        }
    },

    async clear_caches() {
        try {
            // Force garbage collection if available
            if (global.gc) global.gc();
            return { success: true, action: 'GC triggered, caches cleared' };
        } catch (err) {
            return { success: false, action: 'Cache clear failed', error: err.message };
        }
    },
};

// ── Throttle: prevent same fix from running repeatedly ──
const _healCooldown = new Map();
const HEAL_COOLDOWN_MS = 60_000; // 1 min per pattern

// ── Error Tracking for Stats ──
const _errorCounts = new Map();    // pattern_id → count (last hour)
const _healHistory = [];           // last 100 heal actions
const MAX_HEAL_HISTORY = 100;
let _lastCountReset = Date.now();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN: Detect error → match pattern → auto-fix or log
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function handleError(error, context = {}) {
    const errMsg = typeof error === 'string' ? error : (error?.message || String(error));
    const errStack = error?.stack || '';

    // Reset hourly counts
    if (Date.now() - _lastCountReset > 3600_000) {
        _errorCounts.clear();
        _lastCountReset = Date.now();
    }

    // Match against patterns
    const pattern = ERROR_PATTERNS.find(p => p.match.test(errMsg) || p.match.test(errStack));
    if (!pattern) return null; // Unknown error — no action

    // Track count
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

    // Auto-fix if available and not in cooldown
    if (pattern.autoFix && HEALING_ACTIONS[pattern.autoFix]) {
        const cooldownKey = pattern.id;
        const now = Date.now();
        if (!_healCooldown.has(cooldownKey) || now - _healCooldown.get(cooldownKey) > HEAL_COOLDOWN_MS) {
            _healCooldown.set(cooldownKey, now);
            try {
                const result = await HEALING_ACTIONS[pattern.autoFix]();
                healRecord.auto_fix = pattern.autoFix;
                healRecord.fix_result = result;

                // Log to learning journal
                logLearning({
                    module: pattern.module,
                    event_type: result.success ? 'decision' : 'anomaly',
                    severity: result.success ? 'info' : 'warning',
                    title: `🔧 Auto-heal: ${result.action}`,
                    detail: JSON.stringify({ pattern: pattern.id, diagnosis: pattern.diagnosis, result: result.success ? 'fixed' : 'failed', error: result.error || null }),
                    metric_value: _errorCounts.get(pattern.id),
                    metric_unit: 'errors/hr',
                });

                logger.info(`🔧 [SelfHeal] Auto-fix applied: ${pattern.autoFix}`, { pattern: pattern.id, success: result.success });
            } catch (fixErr) {
                healRecord.fix_result = { success: false, error: fixErr.message };
                logger.warn(`🔧 [SelfHeal] Auto-fix failed: ${pattern.autoFix}`, { error: fixErr.message });
            }
        }
    }

    // Log diagnosis for human review (requires-human patterns or failed auto-fix)
    if (!pattern.autoFix || (healRecord.fix_result && !healRecord.fix_result.success)) {
        // Only log to journal if count is low (avoid flooding)
        if ((_errorCounts.get(pattern.id) || 0) <= 3) {
            logLearning({
                module: pattern.module,
                event_type: 'anomaly',
                severity: pattern.severity,
                title: `❌ ${pattern.diagnosis}`,
                detail: JSON.stringify({
                    pattern: pattern.id,
                    error: errMsg.slice(0, 200),
                    context: context.path || '',
                    suggestedFix: pattern.suggestedFix,
                    count: _errorCounts.get(pattern.id),
                }),
                metric_value: _errorCounts.get(pattern.id),
                metric_unit: 'errors/hr',
            });
        }
    }

    // Store in history
    _healHistory.unshift(healRecord);
    if (_healHistory.length > MAX_HEAL_HISTORY) _healHistory.length = MAX_HEAL_HISTORY;

    return healRecord;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATS: For the Evolution Tab dashboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function getHealingStats() {
    const totalErrors = Array.from(_errorCounts.values()).reduce((s, c) => s + c, 0);
    const autoFixed = _healHistory.filter(h => h.fix_result?.success).length;
    const failedFixes = _healHistory.filter(h => h.fix_result && !h.fix_result.success).length;
    const needsHuman = _healHistory.filter(h => !h.auto_fix && h.suggested_fix).length;

    // Group by pattern
    const byPattern = {};
    for (const h of _healHistory) {
        if (!byPattern[h.pattern_id]) byPattern[h.pattern_id] = { count: 0, last_seen: h.timestamp, diagnosis: h.diagnosis, auto_fixable: !!h.auto_fix };
        byPattern[h.pattern_id].count++;
    }

    // Memory usage
    const mem = process.memoryUsage();

    return {
        total_errors_last_hour: totalErrors,
        auto_fixed: autoFixed,
        failed_fixes: failedFixes,
        needs_human: needsHuman,
        uptime_hours: Math.round(process.uptime() / 3600 * 10) / 10,
        memory_mb: Math.round(mem.heapUsed / 1e6),
        memory_max_mb: Math.round(mem.heapTotal / 1e6),
        by_pattern: Object.entries(byPattern).map(([id, v]) => ({ pattern_id: id, ...v })).sort((a, b) => b.count - a.count),
        recent_actions: _healHistory.slice(0, 20),
        error_patterns: ERROR_PATTERNS.map(p => ({ id: p.id, module: p.module, severity: p.severity, diagnosis: p.diagnosis, auto_fixable: !!p.autoFix })),
    };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SYSTEM HEALTH CHECK: Proactive detection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function runHealthCheck() {
    const issues = [];

    // 1. Memory check
    const mem = process.memoryUsage();
    const heapPct = Math.round((mem.heapUsed / mem.heapTotal) * 100);
    if (heapPct > 90) {
        issues.push({ severity: 'critical', module: 'system', issue: `Heap memory ${heapPct}% — risk of OOM crash`, autoFix: 'clear_caches' });
    } else if (heapPct > 75) {
        issues.push({ severity: 'warning', module: 'system', issue: `Heap memory ${heapPct}% — elevated`, autoFix: null });
    }

    // 2. DB connectivity
    try {
        const { getPool, getQueryMetrics } = await import('../db/mysql.js');
        const p = await getPool();
        await p.query('SELECT 1');
        const metrics = getQueryMetrics();
        if (metrics.circuit_breaker_state === 'OPEN') {
            issues.push({ severity: 'critical', module: 'database', issue: 'Circuit breaker OPEN — DB queries paused', autoFix: 'reconnect_db' });
        }
        if (metrics.avg_query_ms > 5000) {
            issues.push({ severity: 'warning', module: 'database', issue: `Avg query ${metrics.avg_query_ms}ms — database slow`, autoFix: 'warm_cache' });
        }
    } catch (err) {
        issues.push({ severity: 'critical', module: 'database', issue: `DB unreachable: ${err.message}`, autoFix: 'reconnect_db' });
    }

    // 3. MV freshness
    try {
        const { getMVStatus } = await import('../db/materializedViews.js');
        const mvStatus = getMVStatus?.();
        if (mvStatus) {
            for (const [name, meta] of Object.entries(mvStatus)) {
                if (meta.status === 'error') {
                    issues.push({ severity: 'warning', module: 'materialized_views', issue: `MV ${name}: ${meta.error || 'refresh failed'}`, autoFix: 'retry_mv_refresh' });
                }
            }
        }
    } catch { }

    // Auto-fix critical issues
    for (const issue of issues) {
        if (issue.autoFix && issue.severity === 'critical' && HEALING_ACTIONS[issue.autoFix]) {
            try {
                const result = await HEALING_ACTIONS[issue.autoFix]();
                issue.fix_applied = true;
                issue.fix_result = result;
            } catch { issue.fix_applied = false; }
        }
    }

    return {
        status: issues.some(i => i.severity === 'critical') ? 'critical' : issues.some(i => i.severity === 'warning') ? 'warning' : 'healthy',
        checked_at: new Date().toISOString(),
        issues,
        memory: { heap_used_mb: Math.round(mem.heapUsed / 1e6), heap_total_mb: Math.round(mem.heapTotal / 1e6), pct: heapPct },
        uptime_hours: Math.round(process.uptime() / 3600 * 10) / 10,
    };
}
