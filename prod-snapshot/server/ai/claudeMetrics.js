// ============================================================
// BCH 360° — Claude API Token Telemetry
// Sprint 1 Task 2.1 + 2.2 — cost monitoring infrastructure
//
// In-memory ring buffer (last 1000 calls) + lifetime totals.
// Persisted to warehouse on a 1-minute cadence (see persistMetrics()).
// ============================================================
import logger from '../logger.js';

const RING_SIZE = 1000;

// Claude pricing (USD per 1M tokens) — sonnet-4-6 reference, update when model changes.
// Source: https://docs.claude.com/en/docs/about-claude/pricing
const PRICE = {
  input_per_1m: 3.00,           // standard input
  output_per_1m: 15.00,         // output
  cache_write_per_1m: 3.75,     // 5min ephemeral cache write
  cache_read_per_1m: 0.30,      // cache hit read (10% of standard input)
};

const state = {
  calls: [],
  totals: {
    calls: 0,
    input_tokens: 0,
    output_tokens: 0,
    cache_creation_tokens: 0,
    cache_read_tokens: 0,
    cost_usd: 0,
    timeouts: 0,
    errors: 0,
    fallback_used: 0,
  },
  byFunction: {}, // { generateRevenueForecastNarrative: { calls, tokens, cost } }
  startTime: Date.now(),
};

/**
 * Compute cost (USD) for a given usage block.
 * @param {{input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens}} usage
 */
export function costOf(usage = {}) {
  const inp = Number(usage.input_tokens || 0);
  const out = Number(usage.output_tokens || 0);
  const cw = Number(usage.cache_creation_input_tokens || 0);
  const cr = Number(usage.cache_read_input_tokens || 0);
  return (
    (inp * PRICE.input_per_1m +
     out * PRICE.output_per_1m +
     cw * PRICE.cache_write_per_1m +
     cr * PRICE.cache_read_per_1m) / 1_000_000
  );
}

/**
 * Record one Claude API call.
 * @param {object} params
 *   - functionName: caller name (e.g., 'generateRevenueForecastNarrative')
 *   - usage: msg.usage from Anthropic SDK response
 *   - durationMs: call duration in ms
 *   - status: 'success' | 'timeout' | 'error' | 'fallback'
 */
export function recordCall({ functionName = 'unknown', usage = {}, durationMs = 0, status = 'success' } = {}) {
  const cost = costOf(usage);
  const entry = {
    ts: Date.now(),
    fn: functionName,
    status,
    duration_ms: durationMs,
    input_tokens: Number(usage.input_tokens || 0),
    output_tokens: Number(usage.output_tokens || 0),
    cache_creation_tokens: Number(usage.cache_creation_input_tokens || 0),
    cache_read_tokens: Number(usage.cache_read_input_tokens || 0),
    cost_usd: cost,
  };
  state.calls.push(entry);
  if (state.calls.length > RING_SIZE) state.calls.shift();

  state.totals.calls += 1;
  state.totals.input_tokens += entry.input_tokens;
  state.totals.output_tokens += entry.output_tokens;
  state.totals.cache_creation_tokens += entry.cache_creation_tokens;
  state.totals.cache_read_tokens += entry.cache_read_tokens;
  state.totals.cost_usd += entry.cost_usd;
  if (status === 'timeout') state.totals.timeouts += 1;
  if (status === 'error') state.totals.errors += 1;
  if (status === 'fallback') state.totals.fallback_used += 1;

  if (!state.byFunction[functionName]) {
    state.byFunction[functionName] = { calls: 0, input_tokens: 0, output_tokens: 0, cache_read_tokens: 0, cost_usd: 0 };
  }
  const f = state.byFunction[functionName];
  f.calls += 1;
  f.input_tokens += entry.input_tokens;
  f.output_tokens += entry.output_tokens;
  f.cache_read_tokens += entry.cache_read_tokens;
  f.cost_usd += entry.cost_usd;
}

/** Cache hit ratio = cache_read / (cache_read + input). Higher = more savings. */
export function cacheHitRatio() {
  const cr = state.totals.cache_read_tokens;
  const inp = state.totals.input_tokens;
  const denom = cr + inp;
  return denom > 0 ? cr / denom : 0;
}

/** Snapshot of current metrics — used by /api/admin/claude-metrics endpoint. */
export function getMetricsSnapshot() {
  return {
    started_at: new Date(state.startTime).toISOString(),
    uptime_hours: Math.round((Date.now() - state.startTime) / 3600000 * 10) / 10,
    totals: { ...state.totals, cost_usd: +state.totals.cost_usd.toFixed(4) },
    cache_hit_ratio: +(cacheHitRatio() * 100).toFixed(1),
    by_function: Object.fromEntries(
      Object.entries(state.byFunction).map(([k, v]) => [k, { ...v, cost_usd: +v.cost_usd.toFixed(4) }])
    ),
    recent_calls: state.calls.slice(-20).reverse(),
    pricing_usd_per_1m: PRICE,
  };
}

/** Reset metrics (for tests). */
export function resetMetrics() {
  state.calls = [];
  state.totals = { calls: 0, input_tokens: 0, output_tokens: 0, cache_creation_tokens: 0, cache_read_tokens: 0, cost_usd: 0, timeouts: 0, errors: 0, fallback_used: 0 };
  state.byFunction = {};
  state.startTime = Date.now();
}

logger.info('[claudeMetrics] initialized — tracking last %d calls', RING_SIZE);
