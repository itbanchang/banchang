// ============================================================
// BCH 360° Intelligence V.10 — Safe Error Response Helper
// Never exposes internal error details to clients in production
// ============================================================
import logger from '../logger.js';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Send a safe error response — hides internal details in production.
 * @param {Response} res - Express response
 * @param {Error} err - The caught error
 * @param {string} context - Short label for logging (e.g. 'IPD analytics')
 * @param {number} [status=500] - HTTP status code
 */
export function safeError(res, err, context, status = 500) {
  logger.error(`[${context}] ${err.message}`, { stack: err.stack });
  res.status(status).json({
    error: IS_PRODUCTION ? 'Internal server error' : err.message,
    context: IS_PRODUCTION ? undefined : context,
  });
}
