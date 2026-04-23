// ============================================================
// BCH 360° Intelligence V.10 - Dialysis Routes
// Scaffolded by bch-360-expert. Replace placeholder SQL with real queries.
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import logger from '../logger.js';

const router = Router();

// ── Today summary ─────────────────────────────────────────────
router.get('/today', cached('dialysisToday', 60_000, async () => {
    const start = Date.now();

    // TODO: replace with real queries against HOSxP XE
    const summary = await dbQueryOne(`
        SELECT
            COUNT(*) AS total,
            ROUND(AVG(1), 2) AS avg,
            0 AS pending
        FROM ovst
        WHERE vstdate = CURDATE()
    `);

    const ms = Date.now() - start;
    if (ms > 1000) logger.warn('[dialysis/today] slow', { ms });

    return {
        ...summary,
        trend: 0,           // compute vs yesterday
        ai: null,           // attach AI insight { score, confidence, evidence, actions, narrative }
        generated_at: Date.now(),
    };
}));

// ── Trend (N-day series) ──────────────────────────────────────
const trendSchema = z.object({
    days: z.coerce.number().int().min(1).max(90).default(30),
});

router.get('/trend', validateQuery(trendSchema), cached('dialysisTrend', 5 * 60_000, async (req) => {
    const { days } = req.query;
    const series = await dbQuery(`
        SELECT DATE(vstdate) AS d, COUNT(*) AS n
        FROM ovst
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        GROUP BY DATE(vstdate)
        ORDER BY d
    `, [days]);
    return { series, generated_at: Date.now() };
}));

export default router;
