// ============================================================
// BCH 360° — Admin Audit Log Query Endpoint
// Admin-only access · query rich audit data
// ============================================================
import { Router } from 'express';
import { queryAuditLogs, getAuditStats, pruneOldLogs } from '../lib/auditLogEnhanced.js';
import logger from '../logger.js';

const router = Router();

// ── Admin-only guard ──
router.use((req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
});

// GET /api/admin/audit/logs?from=&to=&user=&ip=&status=&path_like=&suspicious_only=1&limit=100&offset=0
router.get('/logs', (req, res) => {
    try {
        const result = queryAuditLogs(req.query);
        res.json({
            data_source: 'audit_log_enhanced (SQLite)',
            filters: req.query,
            total: result.total,
            limit: result.limit,
            offset: result.offset,
            rows: result.rows,
        });
    } catch (err) {
        logger.error('Audit query failed', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// GET /api/admin/audit/stats?hours=24
router.get('/stats', (req, res) => {
    try {
        const hours = Math.min(parseInt(req.query.hours) || 24, 168); // max 7 days
        const stats = getAuditStats(hours);
        res.json(stats);
    } catch (err) {
        logger.error('Audit stats failed', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// POST /api/admin/audit/prune  { retention_days: 90 }
router.post('/prune', (req, res) => {
    try {
        const days = Math.min(parseInt(req.body?.retention_days) || 90, 365);
        const deleted = pruneOldLogs(days);
        res.json({ deleted, retention_days: days });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
