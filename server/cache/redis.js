// ============================================================
// BCH 360° Intelligence V.10 - Cache Layer (Optimized)
// Aggressive in-memory caching + Request Deduplication
// ============================================================
const cache = new Map();
const inflight = new Map(); // dedup: prevent thundering herd on cache miss

// ── Cache Metrics ──
const CACHE_METRICS = { hits: 0, misses: 0, sets: 0, deletes: 0, evictions: 0 };
const MAX_CACHE_SIZE = 500; // prevent unbounded growth

export function getCache(key) {
    const item = cache.get(key);
    if (!item) { CACHE_METRICS.misses++; return null; }
    if (Date.now() > item.expires) { cache.delete(key); CACHE_METRICS.misses++; return null; }
    CACHE_METRICS.hits++;
    return item.data;
}

export function setCache(key, data, ttlSeconds = 120) {
    // LRU eviction when cache exceeds max size
    if (cache.size >= MAX_CACHE_SIZE && !cache.has(key)) {
        const oldest = cache.keys().next().value;
        cache.delete(oldest);
        CACHE_METRICS.evictions++;
    }
    cache.set(key, { data, expires: Date.now() + ttlSeconds * 1000 });
    CACHE_METRICS.sets++;
}

export function deleteCache(key) { cache.delete(key); CACHE_METRICS.deletes++; }
export function clearCache() { cache.clear(); }

export function getCacheStats() {
    const total = CACHE_METRICS.hits + CACHE_METRICS.misses;
    return {
        entries: cache.size,
        max_size: MAX_CACHE_SIZE,
        inflight: inflight.size,
        hits: CACHE_METRICS.hits,
        misses: CACHE_METRICS.misses,
        sets: CACHE_METRICS.sets,
        evictions: CACHE_METRICS.evictions,
        hit_rate_pct: total > 0 ? Math.round((CACHE_METRICS.hits / total) * 100) : 0,
    };
}

/**
 * Express middleware — cache route responses with request deduplication
 * If multiple requests arrive while cache is expired, only the first
 * triggers the handler. The rest wait for the same result.
 */
export function cacheMiddleware(ttlSeconds = 120) {
    return async (req, res, next) => {
        const key = `route:${req.originalUrl}`;
        const cached = getCache(key);
        if (cached) {
            res.set('X-Cache', 'HIT');
            return res.json(cached);
        }

        // Dedup: if another request is already fetching this key, wait for it
        if (inflight.has(key)) {
            try {
                await inflight.get(key);
                const fresh = getCache(key);
                if (fresh) {
                    res.set('X-Cache', 'DEDUP');
                    return res.json(fresh);
                }
            } catch { /* fall through */ }
        }

        // First request — proceed and capture the response
        let resolveInflight, rejectInflight;
        const promise = new Promise((resolve, reject) => {
            resolveInflight = resolve;
            rejectInflight = reject;
        });
        // Suppress unhandled rejection when no dedup-waiter is listening
        promise.catch(() => {});
        inflight.set(key, promise);

        const originalJson = res.json.bind(res);
        res.json = (data) => {
            setCache(key, data, ttlSeconds);
            inflight.delete(key);
            resolveInflight(data);
            res.set('X-Cache', 'MISS');
            return originalJson(data);
        };

        // Handle errors — clean up inflight on failure
        const originalStatus = res.status.bind(res);
        res.status = (code) => {
            if (code >= 400) {
                inflight.delete(key);
                rejectInflight(new Error(`HTTP ${code}`));
            }
            return originalStatus(code);
        };

        next();
    };
}

export default { getCache, setCache, deleteCache, clearCache, cacheMiddleware, getCacheStats };
