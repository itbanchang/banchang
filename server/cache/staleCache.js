// ============================================================
// BCH 360° Intelligence V.10 - Stale-While-Revalidate Cache
// ============================================================
import { safeError } from '../lib/safeError.js';

const cache = {};
const inflight = new Map();

// Per-key TTL registry — populated by cached() at wrapper construction time so
// the audit endpoint can report ttl_remaining (cache itself doesn't store ttl).
const ttlRegistry = new Map();

// Phase H.4 — Introspection for /api/system/cache-audit (admin only).
export function getStaleCacheStats() {
  const now = Date.now();
  const entries = Object.keys(cache).map(k => {
    const entry = cache[k];
    const baseKey = k.split('?')[0];
    const ttl = ttlRegistry.get(baseKey) ?? null;
    return {
      key: k,
      base_key: baseKey,
      age_ms: now - entry.t,
      age_min: Math.round((now - entry.t) / 6000) / 10,
      ttl_ms: ttl,
      ttl_min: ttl !== null ? Math.round(ttl / 6000) / 10 : null,
      stale: ttl !== null ? (now - entry.t) > ttl : null,
      json_bytes: entry.json ? entry.json.length : 0,
      inflight: inflight.has(k),
    };
  });
  return {
    store: 'cached() (staleCache.js)',
    entry_count: entries.length,
    inflight_count: inflight.size,
    entries: entries.sort((a, b) => b.age_ms - a.age_ms),
  };
}

/**
 * Custom caching wrapper for data fetching functions
 * Uses Stale-While-Revalidate pattern and Request Deduplication
 */
export function cached(key, ttl, fn) {
    ttlRegistry.set(key, ttl);
    return async (req, res) => {
        const k = key + (req.originalUrl.includes('?') ? req.originalUrl.split('?')[1] : '');
        const entry = cache[k];
        const now = Date.now();

        // HIT — still fresh → return pre-serialized JSON instantly
        if (entry && now - entry.t < ttl) {
            return res.set('X-Cache', 'HIT')
                .set('Cache-Control', 'private, no-cache')
                .type('json').end(entry.json);
        }

        // STALE — expired but exists → return stale immediately, refresh in background
        if (entry && now - entry.t < ttl * 3) {
            res.set('X-Cache', 'STALE')
                .set('Cache-Control', 'private, no-cache')
                .type('json').end(entry.json);
            // Background refresh — deduplicated
            if (!inflight.has(k)) {
                const p = fn(req).then(data => {
                    const json = JSON.stringify(data);
                    cache[k] = { d: data, json, t: Date.now() };
                }).catch(() => { }).finally(() => inflight.delete(k));
                inflight.set(k, p);
            }
            return;
        }

        // MISS — fetch fresh
        if (inflight.has(k)) {
            try {
                await inflight.get(k);
                const fresh = cache[k];
                if (fresh) {
                    return res.set('X-Cache', 'DEDUP')
                        .set('Cache-Control', 'private, no-cache')
                        .type('json').end(fresh.json);
                }
            } catch { /* fall through to fetch ourselves */ }
        }

        try {
            const p = fn(req).then(data => {
                const json = JSON.stringify(data);
                cache[k] = { d: data, json, t: Date.now() };
                return json;
            });
            inflight.set(k, p);
            const json = await p;
            inflight.delete(k);
            res.set('X-Cache', 'MISS')
                .set('Cache-Control', 'private, no-cache')
                .type('json').end(json);
        } catch (err) {
            inflight.delete(k);
            safeError(res, err, 'Cache');
        }
    };
}
