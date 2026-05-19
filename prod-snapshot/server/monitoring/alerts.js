// ============================================================
// BCH 360° Intelligence V.10 — Alert Engine
// Threshold-based alerting with history & suppression
// ============================================================
import os from 'os';
import { getQueryMetrics, getSemaphoreStats, isMySQLConnected } from '../db/mysql.js';
import { getMVStatus } from '../db/materializedViews.js';
import { broadcast } from '../socket.js';
import logger from '../logger.js';

// ── Alert Severity ──
const SEV = { CRITICAL: 'critical', WARNING: 'warning', INFO: 'info' };

// ── Alert Definitions ──
const ALERT_RULES = [
  {
    id: 'memory_critical',
    name: 'Memory Usage Critical',
    severity: SEV.CRITICAL,
    check: () => {
      const pct = Math.round((1 - os.freemem() / os.totalmem()) * 100);
      return pct > 90 ? { fired: true, value: pct, message: `System memory ${pct}% (>90%)` } : { fired: false };
    },
    cooldown_ms: 300_000, // 5 min
  },
  {
    id: 'memory_warning',
    name: 'Memory Usage Warning',
    severity: SEV.WARNING,
    check: () => {
      const pct = Math.round((1 - os.freemem() / os.totalmem()) * 100);
      return pct > 80 ? { fired: true, value: pct, message: `System memory ${pct}% (>80%)` } : { fired: false };
    },
    cooldown_ms: 600_000,
  },
  {
    id: 'heap_critical',
    name: 'Node Heap Critical',
    severity: SEV.CRITICAL,
    check: () => {
      const mem = process.memoryUsage();
      const mb = Math.round(mem.heapUsed / 1048576);
      return mb > 450 ? { fired: true, value: mb, message: `Node heap ${mb}MB (>450MB, max 512MB)` } : { fired: false };
    },
    cooldown_ms: 120_000,
  },
  {
    id: 'mysql_down',
    name: 'MySQL Disconnected',
    severity: SEV.CRITICAL,
    check: () => {
      const connected = isMySQLConnected();
      return !connected ? { fired: true, value: 0, message: 'MySQL connection lost' } : { fired: false };
    },
    cooldown_ms: 60_000,
  },
  {
    id: 'circuit_breaker_open',
    name: 'Circuit Breaker Open',
    severity: SEV.CRITICAL,
    check: () => {
      const qm = getQueryMetrics();
      return qm.circuit_breaker_state === 'OPEN'
        ? { fired: true, value: qm.circuit_breaker_state, message: 'DB circuit breaker OPEN — queries failing' }
        : { fired: false };
    },
    cooldown_ms: 60_000,
  },
  {
    id: 'semaphore_saturated',
    name: 'Query Semaphore Saturated',
    severity: SEV.WARNING,
    check: () => {
      const s = getSemaphoreStats();
      return s.queued > 10 ? { fired: true, value: s.queued, message: `${s.queued} queries queued (semaphore full: ${s.running}/${s.max})` } : { fired: false };
    },
    cooldown_ms: 120_000,
  },
  {
    id: 'query_latency_high',
    name: 'Query Latency High',
    severity: SEV.WARNING,
    check: () => {
      const qm = getQueryMetrics();
      return qm.avg_query_ms > 5000
        ? { fired: true, value: qm.avg_query_ms, message: `Avg query ${qm.avg_query_ms}ms (>5000ms)` }
        : { fired: false };
    },
    cooldown_ms: 300_000,
  },
  {
    id: 'query_timeouts',
    name: 'Query Timeouts Detected',
    severity: SEV.WARNING,
    check: () => {
      const qm = getQueryMetrics();
      return qm.killed_timeout > 0
        ? { fired: true, value: qm.killed_timeout, message: `${qm.killed_timeout} queries killed by timeout` }
        : { fired: false };
    },
    cooldown_ms: 600_000,
  },
  {
    id: 'mv_stale',
    name: 'Materialized View Stale',
    severity: SEV.WARNING,
    check: () => {
      const views = getMVStatus();
      const stale = views.filter(v => {
        if (!v.last_refresh) return true;
        const ageSec = (Date.now() - new Date(v.last_refresh).getTime()) / 1000;
        return ageSec > 1800; // stale if >30 min
      });
      return stale.length > 0
        ? { fired: true, value: stale.length, message: `${stale.length} MV(s) stale: ${stale.map(v => v.name).join(', ')}` }
        : { fired: false };
    },
    cooldown_ms: 600_000,
  },
  {
    id: 'mv_error',
    name: 'Materialized View Error',
    severity: SEV.CRITICAL,
    check: () => {
      const views = getMVStatus();
      const errored = views.filter(v => v.status === 'error');
      return errored.length > 0
        ? { fired: true, value: errored.length, message: `${errored.length} MV(s) in error: ${errored.map(v => `${v.name}: ${v.error}`).join('; ')}` }
        : { fired: false };
    },
    cooldown_ms: 300_000,
  },
  {
    id: 'error_rate_high',
    name: 'High Error Rate',
    severity: SEV.WARNING,
    check: () => {
      const qm = getQueryMetrics();
      if (qm.total < 50) return { fired: false }; // not enough data
      const rate = Math.round((qm.errors / qm.total) * 100);
      return rate > 10 ? { fired: true, value: rate, message: `Query error rate ${rate}% (>10%)` } : { fired: false };
    },
    cooldown_ms: 300_000,
  },
];

// ── Alert State ──
const _lastFired = new Map();    // rule_id → timestamp
const _alertHistory = [];        // last 500 alerts
const MAX_HISTORY = 500;

// ── Run All Alert Checks ──
export function runAlertChecks() {
  const now = Date.now();
  const fired = [];

  for (const rule of ALERT_RULES) {
    try {
      const result = rule.check();
      if (!result.fired) continue;

      // Cooldown check
      const lastFiredAt = _lastFired.get(rule.id) || 0;
      if (now - lastFiredAt < rule.cooldown_ms) continue;

      _lastFired.set(rule.id, now);

      const alert = {
        id: rule.id,
        name: rule.name,
        severity: rule.severity,
        message: result.message,
        value: result.value,
        fired_at: new Date(now).toISOString(),
      };

      fired.push(alert);
      _alertHistory.push(alert);
      if (_alertHistory.length > MAX_HISTORY) _alertHistory.shift();

      // Log the alert
      const logLevel = rule.severity === SEV.CRITICAL ? 'error' : 'warn';
      logger[logLevel](`ALERT [${rule.severity.toUpperCase()}] ${rule.name}: ${result.message}`, {
        alert_id: rule.id,
        severity: rule.severity,
        value: result.value,
      });
    } catch (err) {
      logger.error(`Alert check failed: ${rule.id}`, { error: err.message });
    }
  }

  return fired;
}

// ── Get Current Alert Status ──
export function getAlertStatus() {
  const now = Date.now();

  // Run checks and get active alerts
  const freshAlerts = runAlertChecks();

  // Determine active alerts (fired within their cooldown window)
  const active = [];
  for (const rule of ALERT_RULES) {
    const lastFiredAt = _lastFired.get(rule.id);
    if (lastFiredAt && (now - lastFiredAt) < rule.cooldown_ms * 2) {
      // Find the most recent alert for this rule
      const lastAlert = [..._alertHistory].reverse().find(a => a.id === rule.id);
      if (lastAlert) active.push(lastAlert);
    }
  }

  // Count by severity
  const bySeverity = { critical: 0, warning: 0, info: 0 };
  for (const a of active) bySeverity[a.severity] = (bySeverity[a.severity] || 0) + 1;

  return {
    status: bySeverity.critical > 0 ? 'critical' : bySeverity.warning > 0 ? 'warning' : 'healthy',
    active_alerts: active,
    active_count: active.length,
    by_severity: bySeverity,
    total_fired: _alertHistory.length,
    recent: _alertHistory.slice(-20).reverse(),
    checked_at: new Date().toISOString(),
    rules: ALERT_RULES.map(r => ({
      id: r.id,
      name: r.name,
      severity: r.severity,
      cooldown_ms: r.cooldown_ms,
      last_fired: _lastFired.get(r.id) ? new Date(_lastFired.get(r.id)).toISOString() : null,
    })),
  };
}

// ── Periodic Alert Check Runner ──
let _alertInterval = null;

export function startAlertEngine(intervalMs = 60_000) {
  // Run immediately
  runAlertChecks();

  // Then periodically
  _alertInterval = setInterval(() => {
    try {
      const fired = runAlertChecks();
      if (fired.length > 0) {
        logger.warn(`Alert engine: ${fired.length} alert(s) fired`, {
          alerts: fired.map(a => `[${a.severity}] ${a.name}`),
        });
        // Push alerts to connected clients via WebSocket
        for (const alert of fired) {
          broadcast('alert:new', alert);
        }
      }
    } catch (err) {
      logger.error('Alert engine error', { error: err.message });
    }
  }, intervalMs);

  logger.info('Alert engine started', { interval_ms: intervalMs, rules: ALERT_RULES.length });
  return _alertInterval;
}

export function stopAlertEngine() {
  if (_alertInterval) {
    clearInterval(_alertInterval);
    _alertInterval = null;
  }
}

export default { runAlertChecks, getAlertStatus, startAlertEngine, stopAlertEngine };
