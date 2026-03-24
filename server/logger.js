// ============================================================
// BCH 360° Intelligence V.10 - Logger (Winston)
// 🔐 Phase 1 Security Hardening — Structured Logging
// ============================================================
// Replaces console.log/console.error with structured JSON logging
// Supports file rotation, log levels, and ELK/Kibana integration

import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(path.dirname(__dirname), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// ── Log Level Configuration ──
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// ── Custom Format: Timestamp + Level + Message + Metadata ──
const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),  // Include stack traces
    winston.format.splat(),  // For string interpolation %s, %d
    winston.format.json()    // Output as JSON
);

// ── Logger Instance ──
const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: customFormat,
    defaultMeta: { service: 'bch-360-api' },
    transports: [
        // ── ERROR Log File (10MB rotation, 10 files = 100MB max) ──
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 10485760,  // 10MB
            maxFiles: 10,
            tailable: true,
            zippedArchive: true,  // gzip old logs to save disk
        }),

        // ── COMBINED Log File (10MB rotation, 14 files = 140MB max) ──
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log'),
            maxsize: 10485760,  // 10MB
            maxFiles: 14,
            tailable: true,
            zippedArchive: true,
        }),

        // ── ACCESS Log (HTTP requests only — 10MB rotation) ──
        new winston.transports.File({
            filename: path.join(logsDir, 'access.log'),
            level: 'info',
            maxsize: 10485760,
            maxFiles: 7,
            tailable: true,
            zippedArchive: true,
        }),

        // ── SECURITY Log (auth, RBAC, suspicious activity) ──
        new winston.transports.File({
            filename: path.join(logsDir, 'security.log'),
            level: 'warn',
            maxsize: 5242880,
            maxFiles: 30,  // keep 30 files (~150MB) for audit compliance
            tailable: true,
            zippedArchive: true,
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: path.join(logsDir, 'rejections.log') })
    ]
});

// ── Console Output (Development Only) ──
if (!IS_PRODUCTION) {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
                const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
                return `${timestamp} [${level}] ${message} ${metaStr}`;
            })
        )
    }));
}

// ── Helper: Log API Request ──
export function logRequest(method, path, statusCode, duration, userId = 'anonymous', requestId = null) {
    const level = statusCode >= 400 ? 'warn' : 'info';
    logger.log(level, `${method} ${path} ${statusCode}`, {
        method,
        path,
        statusCode,
        duration: `${duration}ms`,
        userId,
        requestId
    });
}

// ── Helper: Log Database Operation ──
export function logDatabaseQuery(query, duration, rows = 0, error = null) {
    if (error) {
        logger.error(`DB Query Error`, {
            query: sanitizeSQLQuery(query),
            duration: `${duration}ms`,
            error: error.message,
            code: error.code
        });
    } else {
        logger.debug(`DB Query Executed`, {
            query: sanitizeSQLQuery(query),
            duration: `${duration}ms`,
            rows
        });
    }
}

// ── Helper: Log Authentication Event ──
export function logAuthEvent(username, action, success, reasonIfFailed = null) {
    const level = success ? 'info' : 'warn';
    const message = `Auth: ${action} - ${username}`;
    logger.log(level, message, {
        username,
        action,
        success,
        reason: reasonIfFailed
    });
}

// ── Helper: Log Security Event (Intrusion/Suspicious Activity) ──
export function logSecurityEvent(eventType, severity = 'medium', details = {}) {
    // Always log security events, regardless of log level
    logger.error(`🚨 SECURITY EVENT: ${eventType}`, {
        severity,
        ...details,
        timestamp: new Date().toISOString()
    });
}

// ── Helper: Sanitize SQL Query for Logging (Remove Sensitive Data) ──
function sanitizeSQLQuery(query) {
    if (!query) return 'N/A';
    return query
        .replace(/password\s*=\s*'[^']*'/gi, "password='***'")
        .replace(/cid\s*=\s*'[^']*'/gi, "cid='***'")
        .replace(/passweb\s*=\s*'[^']*'/gi, "passweb='***'");
}

// ── Helper: Log Module Initialization ──
export function logModuleInit(moduleName, status = 'OK', details = {}) {
    const level = status === 'OK' ? 'info' : 'error';
    logger.log(level, `Module Init: ${moduleName} - ${status}`, {
        module: moduleName,
        status,
        ...details
    });
}

export default logger;
