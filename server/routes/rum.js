// ============================================================
// RUM (Real User Monitoring) ingestion
// POST /api/rum       web-vitals metrics
// POST /api/rum/error client-side errors (sanitized)
// ============================================================
import { Router } from 'express';
import { incCounter, observeHistogram } from '../monitoring/metrics.js';
import logger from '../logger.js';

const router = Router();

// ── Simple in-memory rate-limit shim so rum endpoint doesn't need auth + avoid flood ──
const HITS = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_IP = 600; // ~10/sec sustained

function shouldAccept(ip) {
    const now = Date.now();
    const bucket = HITS.get(ip) || { count: 0, start: now };
    if (now - bucket.start > WINDOW_MS) {
        HITS.set(ip, { count: 1, start: now });
        return true;
    }
    bucket.count += 1;
    HITS.set(ip, bucket);
    return bucket.count <= MAX_PER_IP;
}

router.post('/', (req, res) => {
    if (!shouldAccept(req.ip)) return res.status(429).end();
    const { name, value, path } = req.body || {};
    if (!name || typeof value !== 'number' || value < 0) return res.status(204).end();

    // Known web-vitals names: LCP, CLS, INP, FID, FCP, TTFB
    try {
        observeHistogram('web_vitals_ms', value, { metric: name, path: String(path || '').slice(0, 64) });
        incCounter('web_vitals_total', { metric: name });
    } catch {/* best-effort */}

    res.status(204).end();
});

router.post('/error', (req, res) => {
    if (!shouldAccept(req.ip)) return res.status(429).end();
    const { message, source, line, col, stack, path, userAgent } = req.body || {};
    // Sanitize: never log raw query strings or full stacks into winston info; only warn.
    logger.warn('client_error', {
        message: String(message || '').slice(0, 500),
        source: String(source || '').slice(0, 200),
        line, col,
        stackPreview: String(stack || '').slice(0, 800),
        path: String(path || '').slice(0, 200),
        userAgent: String(userAgent || '').slice(0, 300),
        ip: req.ip,
    });
    try { incCounter('client_errors_total', {}); } catch {}
    res.status(204).end();
});

export default router;
