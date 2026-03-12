// ============================================================
// BCH 360° Intelligence V.10 - Zod Input Validation Middleware
// ============================================================
import { ZodError } from 'zod';

export function validate(schema) {
    return (req, res, next) => {
        // Use safeParse instead of try...catch to avoid instanceof ZodError module issues
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // result.error is a ZodError object
            return res.status(400).json({
                error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง (Validation failed)',
                details: result.error.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            });
        }

        // Replace req.body with validated and stripped data
        req.body = result.data;
        next();
    };
}
