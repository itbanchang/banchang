// ============================================================
// BCH 360° Intelligence V.10 — Prometheus-Compatible Metrics
// Production-grade monitoring: counters, histograms, gauges
// Exposes /metrics endpoint in Prometheus text format
// ============================================================
import os from 'os';
import { getQueryMetrics, getSemaphoreStats, isMySQLConnected } from '../db/mysql.js';
import { getMVStatus } from '../db/materializedViews.js';
import { getCacheStats } from '../cache/redis.js';
import logger from '../logger.js';

// ── Metric Registries ──
const COUNTERS = {};    // Monotonically increasing counters
const GAUGES = {};      // Point-in-time values
const HISTOGRAMS = {};  // Distribution tracking (latency buckets)

const HISTOGRAM_BUCKETS = [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 30000];

// ── Counter Operations ──
export function incCounter(name, labels = {}, value = 1) {
  const key = _labelKey(name, labels);
  if (!COUNTERS[key]) COUNTERS[key] = { name, labels, value: 0 };
  COUNTERS[key].value += value;
}

// ── Gauge Operations ──
export function setGauge(name, value, labels = {}) {
  const key = _labelKey(name, labels);
  GAUGES[key] = { name, labels, value };
}

// ── Histogram Operations ──
export function observeHistogram(name, value, labels = {}) {
  const key = _labelKey(name, labels);
  if (!HISTOGRAMS[key]) {
    HISTOGRAMS[key] = {
      name, labels,
      buckets: Object.fromEntries(HISTOGRAM_BUCKETS.map(b => [b, 0])),
      sum: 0, count: 0,
    };
  }
  const h = HISTOGRAMS[key];
  h.sum += value;
  h.count++;
  for (const b of HISTOGRAM_BUCKETS) {
    if (value <= b) h.buckets[b]++;
  }
}

function _labelKey(name, labels) {
  const parts = Object.entries(labels).sort().map(([k, v]) => `${k}="${v}"`).join(',');
  return parts ? `${name}{${parts}}` : name;
}

// ── Request Tracking Middleware ──
// Automatically tracks: request count, latency histogram, error rate, in-flight
let inFlightRequests = 0;

export function metricsMiddleware() {
  return (req, res, next) => {
    // Skip metrics endpoint itself
    if (req.path === '/metrics') return next();

    const start = Date.now();
    inFlightRequests++;

    const onFinish = () => {
      cleanup();
      const duration = Date.now() - start;
      const route = _normalizeRoute(req.route?.path || req.path);
      const method = req.method;
      const status = String(res.statusCode);

      incCounter('http_requests_total', { method, route, status });
      observeHistogram('http_request_duration_ms', duration, { method, route });

      if (res.statusCode >= 400) {
        incCounter('http_errors_total', { method, route, status });
      }

      // Track cache effectiveness from X-Cache header
      const cacheStatus = res.getHeader('X-Cache');
      if (cacheStatus) {
        incCounter('cache_responses_total', { status: cacheStatus });
      }
    };

    const onClose = () => {
      cleanup();
      incCounter('http_requests_aborted_total', { method: req.method });
    };

    const cleanup = () => {
      inFlightRequests--;
      res.removeListener('finish', onFinish);
      res.removeListener('close', onClose);
    };

    res.on('finish', onFinish);
    res.on('close', onClose);
    next();
  };
}

// Normalize route paths to prevent cardinality explosion
// /api/ipd/patient/12345 → /api/ipd/patient/:id
function _normalizeRoute(path) {
  return path
    .replace(/\/\d+/g, '/:id')
    .replace(/\/[0-9a-f]{8,}/gi, '/:hash')
    .substring(0, 80);
}

// ── Collect System & Application Gauges ──
function _collectGauges() {
  const mem = process.memoryUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  // Process metrics
  setGauge('process_heap_used_bytes', mem.heapUsed);
  setGauge('process_heap_total_bytes', mem.heapTotal);
  setGauge('process_rss_bytes', mem.rss);
  setGauge('process_external_bytes', mem.external);
  setGauge('process_uptime_seconds', Math.round(process.uptime()));

  // System metrics
  setGauge('system_memory_total_bytes', totalMem);
  setGauge('system_memory_free_bytes', freeMem);
  setGauge('system_memory_usage_pct', Math.round((1 - freeMem / totalMem) * 100));
  setGauge('system_cpu_cores', os.cpus().length);

  const loadAvg = os.loadavg();
  setGauge('system_load_avg_1m', loadAvg[0]);
  setGauge('system_load_avg_5m', loadAvg[1]);
  setGauge('system_load_avg_15m', loadAvg[2]);

  // In-flight requests
  setGauge('http_requests_in_flight', inFlightRequests);

  // MySQL metrics
  const qm = getQueryMetrics();
  setGauge('mysql_connected', isMySQLConnected() ? 1 : 0);
  setGauge('mysql_queries_total', qm.total);
  setGauge('mysql_query_errors_total', qm.errors);
  setGauge('mysql_queries_killed_timeout', qm.killed_timeout);
  setGauge('mysql_circuit_breaker_opened_total', qm.circuit_opened);
  setGauge('mysql_blocked_writes_total', qm.blocked_write);
  setGauge('mysql_slowest_query_ms', qm.slowest_query_ms);
  setGauge('mysql_avg_query_ms', qm.avg_query_ms);
  setGauge('mysql_circuit_breaker_state', qm.circuit_breaker_state === 'CLOSED' ? 0 : qm.circuit_breaker_state === 'HALF_OPEN' ? 1 : 2);

  // Semaphore
  const sem = getSemaphoreStats();
  setGauge('mysql_semaphore_running', sem.running);
  setGauge('mysql_semaphore_queued', sem.queued);
  setGauge('mysql_semaphore_max', sem.max);

  // Route-level cache stats
  const cs = getCacheStats();
  setGauge('cache_entries', cs.entries);
  setGauge('cache_max_size', cs.max_size);
  setGauge('cache_inflight', cs.inflight);
  setGauge('cache_hits_total', cs.hits);
  setGauge('cache_misses_total', cs.misses);
  setGauge('cache_evictions_total', cs.evictions);
  setGauge('cache_hit_rate_pct', cs.hit_rate_pct);

  // Materialized Views
  const mvStatus = getMVStatus();
  for (const mv of mvStatus) {
    const mvLabels = { view: mv.name };
    setGauge('mv_row_count', mv.row_count || 0, mvLabels);
    setGauge('mv_refresh_duration_ms', mv.refresh_duration_ms || 0, mvLabels);
    setGauge('mv_status', mv.status === 'ready' ? 1 : mv.status === 'refreshing' ? 2 : 0, mvLabels);
    if (mv.last_refresh) {
      const staleSec = Math.round((Date.now() - new Date(mv.last_refresh).getTime()) / 1000);
      setGauge('mv_staleness_seconds', staleSec, mvLabels);
    }
  }
}

// ── Prometheus Text Format Serializer ──
export function renderMetrics() {
  _collectGauges();

  const lines = [];
  const now = Date.now();

  // Counters
  const counterGroups = _groupByName(COUNTERS);
  for (const [name, entries] of Object.entries(counterGroups)) {
    lines.push(`# HELP ${name} Counter`);
    lines.push(`# TYPE ${name} counter`);
    for (const e of entries) {
      lines.push(`${_promLine(e.name, e.labels, e.value)} ${now}`);
    }
  }

  // Gauges
  const gaugeGroups = _groupByName(GAUGES);
  for (const [name, entries] of Object.entries(gaugeGroups)) {
    lines.push(`# HELP ${name} Gauge`);
    lines.push(`# TYPE ${name} gauge`);
    for (const e of entries) {
      lines.push(`${_promLine(e.name, e.labels, e.value)} ${now}`);
    }
  }

  // Histograms
  const histGroups = _groupByName(HISTOGRAMS);
  for (const [name, entries] of Object.entries(histGroups)) {
    lines.push(`# HELP ${name} Histogram`);
    lines.push(`# TYPE ${name} histogram`);
    for (const e of entries) {
      for (const [bucket, count] of Object.entries(e.buckets)) {
        lines.push(`${_promLine(name + '_bucket', { ...e.labels, le: bucket }, count)} ${now}`);
      }
      lines.push(`${_promLine(name + '_bucket', { ...e.labels, le: '+Inf' }, e.count)} ${now}`);
      lines.push(`${_promLine(name + '_sum', e.labels, e.sum)} ${now}`);
      lines.push(`${_promLine(name + '_count', e.labels, e.count)} ${now}`);
    }
  }

  return lines.join('\n') + '\n';
}

function _groupByName(registry) {
  const groups = {};
  for (const entry of Object.values(registry)) {
    if (!groups[entry.name]) groups[entry.name] = [];
    groups[entry.name].push(entry);
  }
  return groups;
}

function _promLine(name, labels, value) {
  const parts = Object.entries(labels).map(([k, v]) => `${k}="${v}"`).join(',');
  return parts ? `${name}{${parts}} ${value}` : `${name} ${value}`;
}

// ── Get metrics as JSON (for /api/system/metrics) ──
export function getMetricsJSON() {
  _collectGauges();

  const qm = getQueryMetrics();
  const sem = getSemaphoreStats();
  const mvStatus = getMVStatus();
  const mem = process.memoryUsage();

  // Aggregate HTTP metrics
  const httpTotals = {};
  for (const entry of Object.values(COUNTERS)) {
    if (entry.name === 'http_requests_total') {
      const route = entry.labels.route || 'unknown';
      if (!httpTotals[route]) httpTotals[route] = { requests: 0, errors: 0 };
      httpTotals[route].requests += entry.value;
    }
    if (entry.name === 'http_errors_total') {
      const route = entry.labels.route || 'unknown';
      if (!httpTotals[route]) httpTotals[route] = { requests: 0, errors: 0 };
      httpTotals[route].errors += entry.value;
    }
  }

  // Aggregate latency from histograms
  const latencyByRoute = {};
  for (const entry of Object.values(HISTOGRAMS)) {
    if (entry.name === 'http_request_duration_ms') {
      const route = entry.labels.route || 'unknown';
      latencyByRoute[route] = {
        count: entry.count,
        avg_ms: entry.count > 0 ? Math.round(entry.sum / entry.count) : 0,
        p50_bucket: _estimatePercentile(entry, 0.5),
        p95_bucket: _estimatePercentile(entry, 0.95),
        p99_bucket: _estimatePercentile(entry, 0.99),
      };
    }
  }

  // Cache stats — from actual cache module + HTTP X-Cache headers
  const realCacheStats = getCacheStats();
  const httpCacheStats = { hit: 0, miss: 0, dedup: 0 };
  for (const entry of Object.values(COUNTERS)) {
    if (entry.name === 'cache_responses_total') {
      const s = (entry.labels.status || '').toUpperCase();
      if (s === 'HIT') httpCacheStats.hit += entry.value;
      else if (s === 'MISS') httpCacheStats.miss += entry.value;
      else if (s === 'DEDUP') httpCacheStats.dedup += entry.value;
    }
  }
  const cacheStats = {
    ...realCacheStats,
    http_hit: httpCacheStats.hit,
    http_miss: httpCacheStats.miss,
    http_dedup: httpCacheStats.dedup,
  };

  return {
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.round(process.uptime()),

    process: {
      heap_used_mb: Math.round(mem.heapUsed / 1048576),
      heap_total_mb: Math.round(mem.heapTotal / 1048576),
      rss_mb: Math.round(mem.rss / 1048576),
      external_mb: Math.round(mem.external / 1048576),
    },

    system: {
      cpu_cores: os.cpus().length,
      load_avg: os.loadavg().map(v => Math.round(v * 100) / 100),
      memory_usage_pct: Math.round((1 - os.freemem() / os.totalmem()) * 100),
      free_memory_mb: Math.round(os.freemem() / 1048576),
    },

    mysql: {
      connected: isMySQLConnected(),
      circuit_breaker: qm.circuit_breaker_state,
      total_queries: qm.total,
      errors: qm.errors,
      killed_timeout: qm.killed_timeout,
      blocked_writes: qm.blocked_write,
      slowest_ms: qm.slowest_query_ms,
      avg_ms: qm.avg_query_ms,
      semaphore: sem,
    },

    cache: cacheStats,

    materialized_views: mvStatus.map(mv => ({
      name: mv.name,
      status: mv.status,
      rows: mv.row_count,
      refresh_ms: mv.refresh_duration_ms,
      last_refresh: mv.last_refresh,
      staleness_sec: mv.last_refresh ? Math.round((Date.now() - new Date(mv.last_refresh).getTime()) / 1000) : null,
    })),

    http: {
      in_flight: inFlightRequests,
      top_routes: Object.entries(httpTotals)
        .map(([route, stats]) => ({ route, ...stats, error_rate_pct: stats.requests > 0 ? Math.round((stats.errors / stats.requests) * 100) : 0 }))
        .sort((a, b) => b.requests - a.requests)
        .slice(0, 20),
      latency: Object.entries(latencyByRoute)
        .map(([route, stats]) => ({ route, ...stats }))
        .sort((a, b) => b.avg_ms - a.avg_ms)
        .slice(0, 20),
    },
  };
}

function _estimatePercentile(histogram, pct) {
  const target = Math.ceil(histogram.count * pct);
  let cumulative = 0;
  for (const [bucket, count] of Object.entries(histogram.buckets)) {
    cumulative += count;
    if (cumulative >= target) return Number(bucket);
  }
  return HISTOGRAM_BUCKETS[HISTOGRAM_BUCKETS.length - 1];
}

export default { incCounter, setGauge, observeHistogram, metricsMiddleware, renderMetrics, getMetricsJSON };
