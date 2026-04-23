// ============================================================
// Briefing Reports — /api/briefing/*
// Uses the metric registry so every number is traceable.
// ============================================================
import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { generateMorningBriefing } from '../reports/morningBriefing.js';

const router = Router();

router.get('/morning', cached('morningBriefing', 5 * 60_000, async () => {
    return generateMorningBriefing();
}));

export default router;
