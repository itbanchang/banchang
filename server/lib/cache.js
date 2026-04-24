// ============================================================
// BCH 360° Intelligence V.10 — Stale-While-Revalidate Cache
// Request deduplication + LRU eviction
// ============================================================

import { safeError } from './safeError.js';

const cache = {};
const inflight = new Map();
const MAX_CACHE_ENTRIES = 200;

function evictCache() {
  const keys = Object.keys(cache);
  if (keys.length <= MAX_CACHE_ENTRIES) return;
  keys.sort((a, b) => (cache[a]?.t || 0) - (cache[b]?.t || 0))
      .slice(0, keys.length - MAX_CACHE_ENTRIES)
      .forEach(k => delete cache[k]);
}

export function cached(key, ttl, fn) {
  return async (req, res) => {
    const k = key + (req.originalUrl.includes('?') ? req.originalUrl.split('?')[1] : '');
    const entry = cache[k];
    const now = Date.now();

    // HIT — still fresh
    if (entry && now - entry.t < ttl) {
      return res.set('X-Cache', 'HIT')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
        .type('json').end(entry.json);
    }

    // STALE — expired but exists → return stale, refresh background
    if (entry && now - entry.t < ttl * 3) {
      res.set('X-Cache', 'STALE')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}, stale-while-revalidate=${Math.round(ttl / 500)}`)
        .type('json').end(entry.json);
      if (!inflight.has(k)) {
        const p = fn(req).then(data => {
          const json = JSON.stringify(data);
          evictCache();
          cache[k] = { d: data, json, t: Date.now() };
        }).catch(() => { }).finally(() => inflight.delete(k));
        inflight.set(k, p);
      }
      return;
    }

    // MISS — fetch fresh (deduplicated)
    if (inflight.has(k)) {
      try {
        await inflight.get(k);
        const fresh = cache[k];
        if (fresh) {
          return res.set('X-Cache', 'DEDUP')
            .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
            .type('json').end(fresh.json);
        }
      } catch { /* fall through */ }
    }

    try {
      const p = fn(req).then(data => {
        const json = JSON.stringify(data);
        evictCache();
        cache[k] = { d: data, json, t: Date.now() };
        return json;
      });
      inflight.set(k, p);
      const json = await p;
      inflight.delete(k);
      res.set('X-Cache', 'MISS')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
        .type('json').end(json);
    } catch (err) {
      inflight.delete(k);
      safeError(res, err, 'Cache');
    }
  };
}
