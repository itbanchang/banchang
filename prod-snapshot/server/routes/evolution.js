// ============================================================
// BCH 360° Intelligence V.10 — Self-Upgrade System API
// Learning Journal + Evolution Log
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { validateQuery } from '../middleware/validate.js';
import { getLearningJournal, getLearningStats, getEvolutionLog, getTimeline, logEvolution, logLearning } from '../db/evolutionStore.js';
import { safeError } from '../lib/safeError.js';

const router = Router();

// ── Validation schemas ──
const timelineQuery = z.object({ days: z.coerce.number().int().min(1).max(365).default(30), limit: z.coerce.number().int().min(1).max(500).default(100) });
const learningQuery = z.object({ days: z.coerce.number().int().min(1).max(365).default(30), module: z.string().optional(), type: z.string().optional(), limit: z.coerce.number().int().min(1).max(200).default(50), offset: z.coerce.number().int().min(0).default(0) });
const evolutionQuery = z.object({ days: z.coerce.number().int().min(1).max(730).default(90), category: z.string().optional(), limit: z.coerce.number().int().min(1).max(200).default(50), offset: z.coerce.number().int().min(0).default(0) });
const postEvolutionBody = z.object({ category: z.enum(['release', 'improvement', 'bugfix', 'config', 'note']), title: z.string().min(1).max(200), description: z.string().max(2000).optional(), version: z.string().max(20).optional(), tags: z.string().max(200).optional(), impact: z.enum(['major', 'minor', 'patch']).default('minor') });
const postLearningBody = z.object({ module: z.string().min(1).max(50), event_type: z.enum(['pattern', 'anomaly', 'decision', 'accuracy']), severity: z.enum(['info', 'warning', 'critical']).default('info'), title: z.string().min(1).max(200), detail: z.string().max(2000).optional() });

// ━━━━━━ GET /timeline — Combined chronological feed ━━━━━━
router.get('/timeline', validateQuery(timelineQuery), async (req, res) => {
    try {
        const data = getTimeline({ days: req.query.days, limit: req.query.limit });
        res.json({ data, count: data.length, timestamp: new Date().toISOString() });
    } catch (err) { safeError(res, err, 'Evolution'); }
});

// ━━━━━━ GET /learning — Learning Journal entries ━━━━━━
router.get('/learning', validateQuery(learningQuery), async (req, res) => {
    try {
        const data = getLearningJournal({ days: req.query.days, module: req.query.module, event_type: req.query.type, limit: req.query.limit, offset: req.query.offset });
        res.json({ data, count: data.length, timestamp: new Date().toISOString() });
    } catch (err) { safeError(res, err, 'Evolution'); }
});

// ━━━━━━ GET /learning/stats — Aggregated stats ━━━━━━
router.get('/learning/stats', async (req, res) => {
    try {
        res.json(getLearningStats());
    } catch (err) { safeError(res, err, 'Evolution'); }
});

// ━━━━━━ GET /evolution — Evolution Log entries ━━━━━━
router.get('/evolution', validateQuery(evolutionQuery), async (req, res) => {
    try {
        const data = getEvolutionLog({ days: req.query.days, category: req.query.category, limit: req.query.limit, offset: req.query.offset });
        res.json({ data, count: data.length, timestamp: new Date().toISOString() });
    } catch (err) { safeError(res, err, 'Evolution'); }
});

// ━━━━━━ POST /evolution — Add manual entry (admin) ━━━━━━
router.post('/evolution', async (req, res) => {
    try {
        if (req.user?.role !== 'admin' && req.user?.role !== 'director') return res.status(403).json({ error: 'Admin only' });
        const body = postEvolutionBody.parse(req.body);
        logEvolution({ ...body, author: req.user?.username || 'admin' });
        res.json({ success: true });
    } catch (err) { safeError(res, err, 'Evolution', err.issues ? 400 : 500); }
});

// ━━━━━━ POST /learning/manual — Add manual learning entry (admin) ━━━━━━
router.post('/learning/manual', async (req, res) => {
    try {
        if (req.user?.role !== 'admin' && req.user?.role !== 'director') return res.status(403).json({ error: 'Admin only' });
        const body = postLearningBody.parse(req.body);
        logLearning(body);
        res.json({ success: true });
    } catch (err) { safeError(res, err, 'Evolution', err.issues ? 400 : 500); }
});

// ━━━━━━ GET /health — Self-Healing system health check ━━━━━━
router.get('/health', async (req, res) => {
    try {
        const { runHealthCheck } = await import('../ai/selfHeal.js');
        res.json(await runHealthCheck());
    } catch (err) { safeError(res, err, 'Evolution'); }
});

// ━━━━━━ GET /healing — Self-Healing stats & recent actions ━━━━━━
router.get('/healing', async (req, res) => {
    try {
        const { getHealingStats } = await import('../ai/selfHeal.js');
        res.json(getHealingStats());
    } catch (err) { safeError(res, err, 'Evolution'); }
});

export default router;
