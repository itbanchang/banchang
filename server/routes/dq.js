// ============================================================
// Data Quality Routes — /api/dq/*
// ============================================================
import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { runAllChecks } from '../dq/index.js';

const router = Router();

// Aggregated DQ status. Cached 60s so the dashboard tab doesn't hammer HOSxP.
router.get('/status', cached('dqStatus', 60_000, async () => {
    return runAllChecks();
}));

export default router;
