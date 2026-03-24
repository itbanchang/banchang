// ============================================================
// BCH 360° Intelligence V.10 — Distributed Cache Layer
// Redis-backed with automatic in-memory fallback
// Drop-in replacement for redis.js + staleCache.js
// PM2 cluster-safe: all instances share same cache
// ============================================================
import { getRedisClient, isRedisConnected } from './redisClient.js';
import logger from '../logger.js';

// ── In-memory fallback (used when Redis is unavailable) ──
const MEM_CACHE = new Map();
const MEM_INFLIGHT = new Map();
const MAX_MEM_SIZE = 500;

// ── Metrics ──
const CACHE_METRICS = {
  hits: 0, misses: 0, sets: 0, stale: 0, dedup: 0, errors: 0,
  redis_hits: 0, memory_hits: 0,
};

// ============================================================
// LOW-LEVEL: get / set / delete
// ============================================================

async function cacheGet(key) {
  const redis = getRedisClient();
  if (redis) {
    try {
      const raw = await redis.get(key);
      if (raw) {
        CACHE_METRICS.redis_hits++;
        CACHE_METRICS.hits++;
        return JSON.parse(raw);
      }
      CACHE_METRICS.misses++;
      return null;
    } catch (err) {
      CACHE_METRICS.errors++;
      // Fallback to memory
    }
  }

  // Memory fallback
  const entry = MEM_CACHE.get(key);
  if (!entry) { CACHE_METRICS.misses++; return null; }
  if (Date.now() > entry.expires) { MEM_CACHE.delete(key); CACHE_METRICS.misses++; return null; }
  CACHE_METRICS.memory_hits++;
  CACHE_METRICS.hits++;
  return entry.data;
}

async function cacheSet(key, data, ttlSeconds = 120) {
  CACHE_METRICS.sets++;
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set(key, JSON.stringify(data), 'EX', ttlSeconds);
      return;
    } catch {
      CACHE_METRICS.errors++;
    }
  }

  // Memory fallback with LRU eviction
  if (MEM_CACHE.size >= MAX_MEM_SIZE && !MEM_CACHE.has(key)) {
    const oldest = MEM_CACHE.keys().next().value;
    MEM_CACHE.delete(oldest);
  }
  MEM_CACHE.set(key, { data, expires: Date.now() + ttlSeconds * 1000 });
}

async function cacheDel(key) {
  const redis = getRedisClient();
  if (redis) { try { await redis.del(key); } catch { /* ignore */ } }
  MEM_CACHE.delete(key);
}

// ============================================================
// STALE-WHILE-REVALIDATE (replacement for staleCache.js)
// PM2 cluster-safe: dedup via Redis SETNX
// ============================================================

/**
 * Drop-in replacement for cached() from staleCache.js
 * Uses Redis for storage + dedup if available, memory fallback otherwise
 */
export function cached(key, ttlMs, fn) {
  const ttlSec = Math.round(ttlMs / 1000);
  const staleSec = ttlSec * 3; // stale window = 3× TTL

  return async (req, res) => {
    const suffix = req?.originalUrl?.includes('?') ? req.originalUrl.split('?')[1] : '';
    const k = `cache:${key}:${suffix}`;

    try {
      const redis = getRedisClient();

      // ── Try Redis first ──
      if (redis) {
        try {
          const raw = await redis.get(k);
          if (raw) {
            const entry = JSON.parse(raw);
            const age = Math.round((Date.now() - entry._ts) / 1000);

            if (age < ttlSec) {
              // FRESH HIT
              CACHE_METRICS.hits++;
              CACHE_METRICS.redis_hits++;
              return res.set('X-Cache', 'HIT').set('X-Cache-Backend', 'redis')
                .set('Cache-Control', `public, max-age=${ttlSec - age}`)
                .type('json').end(entry._json);
            }

            if (age < staleSec) {
              // STALE — return immediately, refresh in background
              CACHE_METRICS.stale++;
              res.set('X-Cache', 'STALE').set('X-Cache-Backend', 'redis')
                .set('Cache-Control', `public, max-age=${ttlSec}, stale-while-revalidate=${staleSec}`)
                .type('json').end(entry._json);

              // Background refresh (dedup via Redis SETNX)
              const lockKey = `lock:${k}`;
              const locked = await redis.set(lockKey, '1', 'EX', ttlSec, 'NX');
              if (locked) {
                fn(req).then(data => {
                  const json = JSON.stringify(data);
                  redis.set(k, JSON.stringify({ _json: json, _ts: Date.now() }), 'EX', staleSec).catch(() => {});
                }).catch(() => {}).finally(() => redis.del(lockKey).catch(() => {}));
              }
              return;
            }
          }
        } catch {
          CACHE_METRICS.errors++;
        }
      }

      // ── Memory fallback (same pattern) ──
      const memEntry = MEM_CACHE.get(k);
      if (memEntry) {
        const age = Date.now() - memEntry.ts;
        if (age < ttlMs) {
          CACHE_METRICS.hits++;
          CACHE_METRICS.memory_hits++;
          return res.set('X-Cache', 'HIT').set('X-Cache-Backend', 'memory')
            .set('Cache-Control', `public, max-age=${Math.round((ttlMs - age) / 1000)}`)
            .type('json').end(memEntry.json);
        }
        if (age < ttlMs * 3) {
          CACHE_METRICS.stale++;
          res.set('X-Cache', 'STALE').set('X-Cache-Backend', 'memory')
            .type('json').end(memEntry.json);
          if (!MEM_INFLIGHT.has(k)) {
            const p = fn(req).then(data => {
              const json = JSON.stringify(data);
              MEM_CACHE.set(k, { json, ts: Date.now() });
              _tryRedisSet(k, json, staleSec);
            }).catch(() => {}).finally(() => MEM_INFLIGHT.delete(k));
            MEM_INFLIGHT.set(k, p);
          }
          return;
        }
      }

      // ── MISS — dedup via inflight map ──
      if (MEM_INFLIGHT.has(k)) {
        try {
          await MEM_INFLIGHT.get(k);
          const fresh = MEM_CACHE.get(k);
          if (fresh) {
            CACHE_METRICS.dedup++;
            return res.set('X-Cache', 'DEDUP').type('json').end(fresh.json);
          }
        } catch { /* fall through */ }
      }

      const p = fn(req).then(data => {
        const json = JSON.stringify(data);
        MEM_CACHE.set(k, { json, ts: Date.now() });
        _tryRedisSet(k, json, staleSec);
        return json;
      });
      MEM_INFLIGHT.set(k, p);
      const json = await p;
      MEM_INFLIGHT.delete(k);
      CACHE_METRICS.misses++;
      res.set('X-Cache', 'MISS')
        .set('Cache-Control', `public, max-age=${ttlSec}`)
        .type('json').end(json);
    } catch (err) {
      MEM_INFLIGHT.delete(`cache:${key}:${suffix}`);
      CACHE_METRICS.errors++;
      res.status(500).json({ error: err.message });
    }
  };
}

function _tryRedisSet(k, json, ttlSec) {
  const redis = getRedisClient();
  if (redis) {
    redis.set(k, JSON.stringify({ _json: json, _ts: Date.now() }), 'EX', ttlSec).catch(() => {});
  }
}

// ============================================================
// CACHE MIDDLEWARE (replacement for cacheMiddleware in redis.js)
// ============================================================

export function cacheMiddleware(ttlSeconds = 120) {
  return async (req, res, next) => {
    const k = `route:${req.originalUrl}`;
    const existing = await cacheGet(k);
    if (existing) {
      res.set('X-Cache', 'HIT').set('X-Cache-Backend', isRedisConnected() ? 'redis' : 'memory');
      return res.json(existing);
    }

    // Dedup
    if (MEM_INFLIGHT.has(k)) {
      try {
        await MEM_INFLIGHT.get(k);
        const fresh = await cacheGet(k);
        if (fresh) { res.set('X-Cache', 'DEDUP'); return res.json(fresh); }
      } catch { /* fall through */ }
    }

    const originalJson = res.json.bind(res);
    let resolveInflight;
    const promise = new Promise(resolve => { resolveInflight = resolve; });
    promise.catch(() => {});
    MEM_INFLIGHT.set(k, promise);

    res.json = (data) => {
      cacheSet(k, data, ttlSeconds).catch(() => {});
      MEM_INFLIGHT.delete(k);
      resolveInflight(data);
      res.set('X-Cache', 'MISS');
      return originalJson(data);
    };

    next();
  };
}

// ============================================================
// STATS & EXPORT
// ============================================================

export function getDistributedCacheStats() {
  return {
    backend: isRedisConnected() ? 'redis' : 'memory',
    memory_entries: MEM_CACHE.size,
    max_memory_size: MAX_MEM_SIZE,
    inflight: MEM_INFLIGHT.size,
    ...CACHE_METRICS,
    hit_rate_pct: (CACHE_METRICS.hits + CACHE_METRICS.misses) > 0
      ? Math.round((CACHE_METRICS.hits / (CACHE_METRICS.hits + CACHE_METRICS.misses)) * 100) : 0,
  };
}

export { cacheGet, cacheSet, cacheDel };
export default { cached, cacheMiddleware, cacheGet, cacheSet, cacheDel, getDistributedCacheStats };
