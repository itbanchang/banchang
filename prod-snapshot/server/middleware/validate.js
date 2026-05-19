// ============================================================
// BCH 360° Intelligence V.10 - Zod Input Validation Middleware
// 🔐 Phase 2: Enhanced for Query & Body Validation
// ============================================================
import { ZodError } from 'zod';
import logger from '../logger.js';

/**
 * Validate request body against Zod schema
 * @param {z.ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const issues = result.error.issues || [];
            logger.warn('Body validation failed', {
                path: req.path,
                errors: issues.slice(0, 3)
            });

            return res.status(400).json({
                error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง (Body validation failed)',
                details: issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message,
                    code: e.code
                }))
            });
        }

        // Replace req.body with validated and stripped data
        req.body = result.data;
        next();
    };
}

/**
 * Validate query parameters against Zod schema
 * @param {z.ZodSchema} schema - Zod validation schema for query params
 * @returns {Function} Express middleware
 * 
 * Usage: router.get('/endpoint', validateQuery(mySchema), handler)
 */
export function validateQuery(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            const issues = result.error.issues || [];
            logger.warn('Query validation failed', {
                path: req.path,
                query: JSON.stringify(req.query),
                errors: issues.slice(0, 3)
            });

            return res.status(400).json({
                error: 'รูปแบบของพารามิเตอร์ไม่ถูกต้อง (Query validation failed)',
                details: issues.map(e => ({
                    parameter: e.path.join('.'),
                    message: e.message,
                    code: e.code,
                    received: e.path.length > 0 ? req.query[e.path[0]] : null
                }))
            });
        }

        // Replace req.query with validated data
        req.query = result.data;
        next();
    };
}

/**
 * Validate path parameters against Zod schema
 * @param {z.ZodSchema} schema - Zod validation schema for path params
 * @returns {Function} Express middleware
 */
export function validateParams(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);

        if (!result.success) {
            const issues = result.error.issues || [];
            logger.warn('Path params validation failed', {
                path: req.path,
                params: JSON.stringify(req.params),
                errors: issues.slice(0, 3)
            });

            return res.status(400).json({
                error: 'พารามิเตอร์เส้นทางไม่ถูกต้อง (Path params validation failed)',
                details: issues.map(e => ({
                    parameter: e.path.join('.'),
                    message: e.message,
                    received: e.path.length > 0 ? req.params[e.path[0]] : null
                }))
            });
        }

        // Replace req.params with validated data
        req.params = result.data;
        next();
    };
}

export default { validate, validateQuery, validateParams };

