// ============================================================
// BCH 360° Intelligence V.10 - Cache Layer (Optimized)
// Aggressive in-memory caching + Request Deduplication
// ============================================================
const cache = new Map();
const inflight = new Map(); // dedup: prevent thundering herd on cache miss

export function getCache(key) {
    const item = cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expires) { cache.delete(key); return null; }
    return item.data;
}

export function setCache(key, data, ttlSeconds = 120) {
    cache.set(key, { data, expires: Date.now() + ttlSeconds * 1000 });
}

export function deleteCache(key) { cache.delete(key); }
export function clearCache() { cache.clear(); }

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

export default { getCache, setCache, deleteCache, clearCache, cacheMiddleware };
