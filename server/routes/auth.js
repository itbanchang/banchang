// ============================================================
// BCH 360° Intelligence V.10 - Auth Routes (Simplified)
// ============================================================
import { Router } from 'express';

const router = Router();

// Dashboard is read-only from slave, auth is simplified
router.post('/login', (req, res) => {
    const { username } = req.body;
    res.json({
        token: 'hosxp-dashboard-token',
        user: { id: 1, username: username || 'admin', full_name: 'Dashboard Admin', role: 'admin', department: 'IT' }
    });
});

router.get('/me', (req, res) => {
    res.json({ user: req.user || { role: 'admin', username: 'dashboard' } });
});

export default router;
