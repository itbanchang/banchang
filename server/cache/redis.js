// ============================================================
// BCH 360° Intelligence V.10 - Cache Layer (Optimized)
// Aggressive in-memory caching for fast response
// ============================================================
const cache = new Map();

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
 * Express middleware — cache route responses
 */
export function cacheMiddleware(ttlSeconds = 120) {
    return (req, res, next) => {
        const key = `route:${req.originalUrl}`;
        const cached = getCache(key);
        if (cached) {
            res.set('X-Cache', 'HIT');
            return res.json(cached);
        }
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            setCache(key, data, ttlSeconds);
            res.set('X-Cache', 'MISS');
            return originalJson(data);
        };
        next();
    };
}

export default { getCache, setCache, deleteCache, clearCache, cacheMiddleware };
