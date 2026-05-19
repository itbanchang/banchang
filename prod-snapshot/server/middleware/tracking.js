// ============================================================
// BCH 360° Intelligence V.10 - Request ID Tracking Middleware
// 📊 Phase 2: Request Tracing & Performance Monitoring
// ============================================================
// Assigns unique request ID to every request
// Tracks response time and status codes
// Enables distributed request tracing across services
// Logs all requests with structured JSON format

import { v4 as uuidv4 } from 'uuid';
import logger from '../logger.js';
import { pushLog } from '../infra/centralLog.js';

/**
 * Middleware to add request ID tracking
 * Assigns unique ID, tracks timing, logs every request
 * 
 * Usage: app.use(trackingMiddleware());
 */
export function trackingMiddleware() {
    return (req, res, next) => {
        // Assign request ID (from header if exists, otherwise generate)
        req.id = req.headers['x-request-id'] || uuidv4();
        res.setHeader('X-Request-ID', req.id);
        
        // Store timing info
        req.startTime = Date.now();
        
        // Log request
        logger.info(`${req.method} ${req.path}`, {
            requestId: req.id,
            method: req.method,
            path: req.path,
            ip: req.ip,
            user: req.user?.username || 'anonymous',
            userRole: req.user?.role || 'guest',
            userAgent: req.get('user-agent')?.substring(0, 100)  // Truncate to prevent log bloat
        });
        
        // Hook into response to log completion
        res.on('finish', () => {
            const duration = Date.now() - req.startTime;
            const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
            const color = res.statusCode >= 400 ? '❌' : '✅';
            
            const logMeta = {
                requestId: req.id,
                method: req.method,
                path: req.path,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
                contentLength: res.get('content-length'),
                user: req.user?.username || 'anonymous',
                userRole: req.user?.role || 'guest'
            };
            logger.log(logLevel, `${color} ${req.method} ${req.path} ${res.statusCode}`, logMeta);
            // Push to centralized log (cross-instance via Redis)
            pushLog(logLevel, `${req.method} ${req.path} ${res.statusCode} ${duration}ms`, logMeta);
        });
        
        // Also log on close (for aborted requests)
        res.on('close', () => {
            if (!res.finished) {
                const duration = Date.now() - req.startTime;
                logger.warn('Request aborted/closed', {
                    requestId: req.id,
                    method: req.method,
                    path: req.path,
                    duration: `${duration}ms`,
                    user: req.user?.username || 'anonymous'
                });
            }
        });
        
        next();
    };
}

/**
 * Middleware to ensure request ID is present in error responses
 * Adds request ID to error JSON responses
 */
export function errorResponseMiddleware() {
    return (err, req, res, next) => {
        // Ensure request ID is in error response
        if (res.locals && !res.locals.requestId && req.id) {
            res.locals.requestId = req.id;
        }
        
        // Log error with request ID
        logger.error('Unhandled error', {
            requestId: req.id,
            method: req.method,
            path: req.path,
            error: err.message,
            statusCode: err.statusCode || 500,
            stack: err.stack?.substring(0, 500)  // Truncate stack
        });
        
        // Return error with request ID for tracing
        res.status(err.statusCode || 500).json({
            error: err.message || 'Internal server error',
            requestId: req.id,
            timestamp: new Date().toISOString()
        });
    };
}

/**
 * Middleware to pass request ID through database queries
 * Useful for logging which requests triggered which DB operations
 */
export function dbQueryLoggingMiddleware(dbQueryFunction) {
    return async (sql, params) => {
        // This is typically not used as middleware but as wrapper
        // Users can pass req.id when calling dbQuery
        // Example: await dbQueryWithContext(sql, params, req.id)
        return dbQueryFunction(sql, params);
    };
}

/**
 * Helper to add request context to logs
 * Usage in route handlers: logWithContext(logger, req, 'message', { extra: 'data' })
 */
export function logWithContext(logger, req, message, meta = {}) {
    logger.info(message, {
        ...meta,
        requestId: req?.id,
        user: req?.user?.username,
        userRole: req?.user?.role,
        path: req?.path,
        method: req?.method
    });
}

export default {
    trackingMiddleware,
    errorResponseMiddleware,
    dbQueryLoggingMiddleware,
    logWithContext
};
