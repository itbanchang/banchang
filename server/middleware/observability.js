// ============================================================
// Observability middleware — structured logs + request correlation
// Complements server/monitoring/metrics.js (which already handles counters/
// histograms). This one adds:
//   - req.id (correlation ID for tracing across log lines)
//   - Per-request structured log ('http_request') with user + duration
// Skips /metrics and /api/rum to keep logs clean.
// ============================================================
import { randomUUID } from 'node:crypto';
import logger from '../logger.js';

const SKIP_PATHS = new Set(['/metrics', '/api/health']);

export function observabilityMiddleware(req, res, next) {
    req.id = req.headers['x-request-id'] || randomUUID();
    const start = process.hrtime.bigint();

    // Skip noisy endpoints — they'd flood the log
    if (SKIP_PATHS.has(req.path) || req.path.startsWith('/api/rum')) {
        return next();
    }

    res.on('finish', () => {
        const durationMs = Math.round(Number(process.hrtime.bigint() - start) / 1e6);
        const route = req.route?.path || req.path || req.originalUrl?.split('?')[0] || 'unknown';

        const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
        logger.log(level, 'http_request', {
            requestId: req.id,
            method: req.method,
            path: route,
            status: res.statusCode,
            durationMs,
            userId: req.user?.id,
            ip: req.ip,
        });
    });

    next();
}
