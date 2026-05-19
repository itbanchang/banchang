// ============================================================
// BCH 360° Intelligence V.10 — Centralized Log Aggregation
// Redis Pub/Sub log stream + queryable log buffer
// Enables cross-instance log viewing via API
// ============================================================
import { getRedisClient, getRedisSubscriber, isRedisConnected } from './redisClient.js';
import logger from '../logger.js';

// ── In-memory log buffer (queryable via API) ──
const LOG_BUFFER = [];
const MAX_BUFFER = 2000;
const LOG_CHANNEL = 'bch360:logs';

// ── Log level filter ──
const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };

/**
 * Push a log entry to the centralized stream
 * If Redis available: publishes to channel (all PM2 instances see it)
 * Always stores in local buffer for API queries
 */
export function pushLog(level, message, meta = {}) {
  const entry = {
    level,
    message,
    ...meta,
    timestamp: new Date().toISOString(),
    pid: process.pid,
    instance: process.env.NODE_APP_INSTANCE || '0',
  };

  // Local buffer (always)
  LOG_BUFFER.push(entry);
  if (LOG_BUFFER.length > MAX_BUFFER) LOG_BUFFER.shift();

  // Redis publish (if available)
  const redis = getRedisClient();
  if (redis) {
    redis.publish(LOG_CHANNEL, JSON.stringify(entry)).catch(() => {});
  }
}

/**
 * Subscribe to centralized log stream from other instances
 * Only call this once per process
 */
let _subscriber = null;

export function startLogSubscriber() {
  if (_subscriber) return;

  const sub = getRedisSubscriber();
  if (!sub) {
    logger.info('[CentralLog] No Redis — log aggregation disabled (single-instance mode)');
    return;
  }

  _subscriber = sub;

  sub.subscribe(LOG_CHANNEL, (err) => {
    if (err) {
      logger.warn('[CentralLog] Failed to subscribe', { error: err.message });
      return;
    }
    logger.info('[CentralLog] Subscribed to centralized log stream');
  });

  sub.on('message', (channel, message) => {
    if (channel !== LOG_CHANNEL) return;
    try {
      const entry = JSON.parse(message);
      // Only store logs from OTHER instances (avoid duplicates)
      if (String(entry.pid) !== String(process.pid)) {
        LOG_BUFFER.push(entry);
        if (LOG_BUFFER.length > MAX_BUFFER) LOG_BUFFER.shift();
      }
    } catch { /* malformed message */ }
  });
}

/**
 * Query log buffer with filtering
 * @param {object} filters - { level, search, limit, since }
 */
export function queryLogs({ level = 'info', search = '', limit = 100, since = null } = {}) {
  const minLevel = LOG_LEVELS[level] ?? 2;

  let filtered = LOG_BUFFER.filter(entry => {
    // Level filter
    if ((LOG_LEVELS[entry.level] ?? 2) > minLevel) return false;
    // Time filter
    if (since && new Date(entry.timestamp) < new Date(since)) return false;
    // Search filter
    if (search && !entry.message?.toLowerCase().includes(search.toLowerCase())
        && !JSON.stringify(entry).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Return latest first, limited
  return filtered.slice(-limit).reverse();
}

/**
 * Get log statistics
 */
export function getLogStats() {
  const now = Date.now();
  const oneHourAgo = now - 3600000;

  const recentLogs = LOG_BUFFER.filter(e => new Date(e.timestamp).getTime() > oneHourAgo);
  const byLevel = {};
  const byInstance = {};

  for (const entry of recentLogs) {
    byLevel[entry.level] = (byLevel[entry.level] || 0) + 1;
    const inst = entry.instance || entry.pid || 'unknown';
    byInstance[inst] = (byInstance[inst] || 0) + 1;
  }

  return {
    backend: isRedisConnected() ? 'redis_pubsub' : 'local_buffer',
    buffer_size: LOG_BUFFER.length,
    max_buffer: MAX_BUFFER,
    last_hour: {
      total: recentLogs.length,
      by_level: byLevel,
      by_instance: byInstance,
    },
    oldest_entry: LOG_BUFFER[0]?.timestamp || null,
    newest_entry: LOG_BUFFER[LOG_BUFFER.length - 1]?.timestamp || null,
  };
}

/**
 * Stop subscriber
 */
export function stopLogSubscriber() {
  if (_subscriber) {
    _subscriber.unsubscribe(LOG_CHANNEL).catch(() => {});
    _subscriber.quit().catch(() => {});
    _subscriber = null;
  }
}

export default { pushLog, startLogSubscriber, queryLogs, getLogStats, stopLogSubscriber };
