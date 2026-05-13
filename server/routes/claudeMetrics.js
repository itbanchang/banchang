// ============================================================
// BCH 360° — Claude Cost Monitoring Endpoint
// Sprint 1 Task 2.2 — exposes /api/admin/claude-metrics for IT
// Returns: token usage, cost in USD, cache hit ratio, per-function attribution.
// Auth: admin only (mounted with authorize('admin') in server.js)
// ============================================================
import { Router } from 'express';
import { getMetricsSnapshot, resetMetrics } from '../ai/claudeMetrics.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const snap = getMetricsSnapshot();

    // Compute projection: USD/day, USD/month based on current rate.
    const upHours = Math.max(0.1, snap.uptime_hours);
    const usdPerHour = snap.totals.cost_usd / upHours;
    const projection = {
      usd_per_hour: +usdPerHour.toFixed(4),
      usd_per_day: +(usdPerHour * 24).toFixed(2),
      usd_per_30d: +(usdPerHour * 24 * 30).toFixed(2),
    };

    // Cache savings — what the cache_read_tokens would have cost as full input.
    const cacheReadTokens = snap.totals.cache_read_tokens;
    const savedUsd = cacheReadTokens > 0
      ? (cacheReadTokens * 0.9 * 3.00 / 1_000_000) // saved 90% by reading vs full input
      : 0;

    res.json({
      ...snap,
      projection,
      cache_savings_usd: +savedUsd.toFixed(4),
      notes: [
        'Pricing reflects claude-sonnet-4-6 at time of code write — update PRICE in claudeMetrics.js when model/pricing changes.',
        'Cache TTL is 5 minutes (ephemeral). Hit ratio > 60% indicates good prompt reuse.',
        'cost_usd is best-effort estimate — refer to Anthropic console for billing-of-record.',
      ],
    });
  } catch (e) {
    res.status(500).json({ error: 'metrics_unavailable', message: e.message });
  }
});

router.post('/reset', (req, res) => {
  resetMetrics();
  res.json({ ok: true, message: 'Claude metrics reset to zero.' });
});

export default router;
