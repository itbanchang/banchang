# AI Insights Builder — Add Intelligence

Read this when the user wants to **add or enhance AI** — predictions, anomaly detection, forecasts, recommendations, Claude-powered narratives.

## The project's AI philosophy

Three rules, in priority order:

1. **Rule-based floor.** Every AI module must return a useful result with no external dependencies. If Claude API is down, if `ANTHROPIC_API_KEY` is unset, if the network is flaky — the clinician still sees a score, evidence, and an action. The rule-based path is the product, Claude is the polish.

2. **Claude as narrative upgrade.** Claude turns numbers into clinician-friendly Thai prose. It does NOT invent diagnoses. It does NOT invent numbers. Its job is translation and explanation.

3. **Output is a contract.** Every AI module returns this shape, no exceptions:

   ```js
   {
     score: number,          // 0..1 or domain-appropriate (e.g., NEWS2 is 0..20)
     confidence: number,     // 0..1 — calibrated
     evidence: Array<{ label, value, weight }>,  // top drivers
     actions: Array<{ label, urgency, ref }>,    // suggested next steps for clinician
     narrative: string,      // human-readable Thai prose
     source: 'claude' | 'rule-based',
     generated_at: number,   // Date.now()
   }
   ```

   This contract is what `AIInsightCard`, `ExecutiveAIPanel`, and `AIServerInsights` expect. Break it and the UI goes blank.

## Canonical AI Engine Template

```js
// server/ai/xxxEngine.js
// ============================================================
// BCH 360° Intelligence V.10 - AI Xxx Engine
// Short description of what it predicts / detects / recommends
// ============================================================
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { callClaude } from './claudeNarrative.js';
import { calibrate } from './calibration.js';
import { captureOutcome } from './learningCapture.js';
import logger from '../logger.js';

// ── Pure scoring functions (easy to unit-test) ──────────────

function extractFeatures(rows) {
  // ... turn raw rows into a flat feature object
  return { avg: ..., stddev: ..., topDrivers: [ ... ] };
}

function scoreModel(features) {
  // ... statistical / rule-based / ML score
  // Return 0..1 or a domain score
  return clamp(0, 1, rawScore);
}

function recommendActions(score, features) {
  if (score >= 0.8) return [{ label: '🚨 แจ้งแพทย์เวรทันที', urgency: 'critical', ref: 'protocol-A1' }];
  if (score >= 0.6) return [{ label: '⚠️ เฝ้าระวังทุก 1 ชม.', urgency: 'high', ref: 'protocol-A2' }];
  if (score >= 0.4) return [{ label: '📋 ประเมินซ้ำใน 4 ชม.', urgency: 'medium' }];
  return [{ label: '✅ ติดตามตามปกติ', urgency: 'low' }];
}

function buildFallbackNarrative({ score, features, actions }) {
  // Thai prose that never needs the internet
  const level = score >= 0.8 ? 'สูงมาก' : score >= 0.6 ? 'สูง' : score >= 0.4 ? 'ปานกลาง' : 'ต่ำ';
  return `ระดับความเสี่ยง${level} (${(score * 100).toFixed(0)}%). ตัวขับหลัก: ${features.topDrivers.slice(0, 2).map(d => d.label).join(', ')}. แนะนำ: ${actions[0].label}.`;
}

// ── Main entry point ────────────────────────────────────────

export async function analyzeXxx({ ward, window = 7 } = {}) {
  const start = Date.now();

  // 1. Query only the fields you need
  const rows = await dbQuery(
    `SELECT hn, vstdate, temperature, pulse, bps, o2sat, rr
     FROM ovst
     WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       AND (? IS NULL OR dep = ?)`,
    [window, ward ?? null, ward ?? null]
  );

  // 2. Pure transforms — testable
  const features = extractFeatures(rows);
  const scoreRaw = scoreModel(features);
  const { score, confidence } = calibrate('xxx', scoreRaw, features);
  const actions = recommendActions(score, features);
  const fallback = buildFallbackNarrative({ score, features, actions });

  // 3. Try Claude (with 15s timeout + cached system prompt). Fall back silently.
  let narrative = fallback;
  let source = 'rule-based';
  try {
    const claudeText = await callClaude({
      cacheKey: 'xxx-system-v1',
      systemPrompt: buildSystemPrompt(),
      userPrompt: buildUserPrompt({ score, features, actions }),
      maxTokens: 500,
    });
    if (claudeText) {
      narrative = claudeText;
      source = 'claude';
    }
  } catch (err) {
    logger.warn('[xxxEngine] Claude fallback', { message: err.message });
  }

  // 4. Capture for later calibration (async, don't await)
  captureOutcome('xxx', { features, score, ts: Date.now() }).catch(() => {});

  const ms = Date.now() - start;
  if (ms > 2000) logger.warn('[xxxEngine] slow', { ms, window, ward });

  return {
    score,
    confidence,
    evidence: features.topDrivers,
    actions,
    narrative,
    source,
    generated_at: Date.now(),
  };
}

function clamp(lo, hi, x) { return Math.max(lo, Math.min(hi, x)); }
```

## Claude Prompt Caching — The Biggest Lever

The current `claudeNarrative.js` doesn't use prompt caching. This is the single biggest cost and latency win available. A typical BCH hospital day makes dozens of AI narrative calls with nearly identical system prompts. Caching the system prompt saves up to 90% of input tokens on every repeat call within the 5-minute cache window.

### How to upgrade `claudeNarrative.js`

The recommended shape for a new `callClaude` helper:

```js
// server/ai/claudeNarrative.js (proposed upgrade)
import Anthropic from '@anthropic-ai/sdk';
import logger from '../logger.js';

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const DEFAULT_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6';
const TIMEOUT_MS = 15_000;

/**
 * Call Claude with prompt caching on the system block.
 * The system block should be stable (protocols, personas, formatting rules).
 * The user block contains the dynamic data.
 *
 * @param {object} opts
 * @param {string} opts.systemPrompt - Long, stable preamble. Gets cached.
 * @param {string} opts.userPrompt   - Dynamic content for this call.
 * @param {number} [opts.maxTokens=800]
 * @param {string} [opts.model=claude-sonnet-4-6]
 * @returns {Promise<string|null>}
 */
export async function callClaude({ systemPrompt, userPrompt, maxTokens = 800, model = DEFAULT_MODEL }) {
  if (!client) {
    logger.warn('[claudeNarrative] ANTHROPIC_API_KEY not set');
    return null;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const msg = await client.messages.create(
      {
        model,
        max_tokens: maxTokens,
        // KEY: prompt caching via cache_control on the system block.
        system: [
          {
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: userPrompt }],
      },
      { signal: controller.signal }
    );
    // Log cache usage for observability
    const u = msg.usage || {};
    if (u.cache_read_input_tokens || u.cache_creation_input_tokens) {
      logger.info('[claudeNarrative] cache', {
        read: u.cache_read_input_tokens,
        created: u.cache_creation_input_tokens,
        input: u.input_tokens,
        output: u.output_tokens,
      });
    }
    return msg.content?.[0]?.text ?? null;
  } catch (err) {
    if (err.name === 'AbortError') logger.warn('[claudeNarrative] timeout');
    else logger.error('[claudeNarrative] error', { message: err.message });
    return null;
  } finally {
    clearTimeout(timer);
  }
}
```

### Rules for cache design

- **Stable in the system block**: clinical protocols, persona, formatting rules, glossary, output shape.
- **Dynamic in the user block**: patient stats, ward name, date range, specific numbers.
- **Minimum cacheable size**: ~1024 tokens for the system block to be worth caching. Pad your protocols rather than trimming them.
- **TTL**: 5-minute ephemeral cache. If the narrative is called in tight bursts (e.g., once per ward in a morning report), cluster them within 5 minutes.
- **Versioning**: include a version suffix in a comment at the end of the system prompt (e.g., `\n<!-- v1.2 -->`). When you change the protocol, bump the version so old cached entries are bypassed.

### Choosing a model

- `claude-haiku-4-5-20251001` — high-frequency per-patient narratives where latency and cost dominate.
- `claude-sonnet-4-6` — default for tab-level summaries and most analytics (current project default).
- `claude-opus-4-7` — executive/board-level narratives where reasoning depth matters more than cost. Use sparingly.

## Wiring calibration

`server/ai/calibration.js` takes a raw score + features and returns `{ score, confidence }` adjusted by historical outcomes captured in `learningCapture.js`. Every engine should call `calibrate('<engine-key>', rawScore, features)`. Over time, as outcomes accumulate in the sidecar DB, the calibration layer learns.

Do not bypass calibration by returning `confidence: 1.0` unconditionally — downstream UI ranks cards by confidence.

## Wiring self-heal

`server/ai/selfHeal.js` exposes hooks to detect output drift (e.g., score distribution shifted 2σ from the last 30-day baseline). Wrap high-stakes engines with:

```js
import { selfHealCheck } from './selfHeal.js';

const result = await analyzeXxx(...);
const healed = selfHealCheck('xxx', result); // may add a 'warnings' field
return healed;
```

Self-heal NEVER changes the numeric score. It only annotates. Clinicians still see the raw output.

## Exposing the engine via a route

```js
// server/routes/ai/xxx.js  (or add to existing server/routes/ai_routes.js)
import { Router } from 'express';
import { analyzeXxx } from '../../ai/xxxEngine.js';
import { cached } from '../../cache/staleCache.js';

const router = Router();

router.get('/xxx', cached('aiXxx', 60_000, async (req) => {
  return analyzeXxx({ ward: req.query.ward, window: Number(req.query.days ?? 7) });
}));

export default router;
```

Cache TTL for AI routes: start at 60s. Lower only if clinicians need it faster; higher if the inputs change slowly (e.g., monthly forecasts can cache 1 hour).

## PII handling in AI prompts

**Rule**: patient prompts must be de-identified. Allowed fields: `hn` (hospital number — already pseudonymous), age bucket (not exact DOB), sex, ward, primary DX code, vitals. Forbidden: `cid` (national ID), name, address, phone, email.

If an engine needs patient-specific narration, pass `hn` only and let the clinician cross-reference in HOSxP. Never put names or national IDs in Claude prompts — they could be logged or cached.

## Testing an AI engine

```js
// tests/ai/xxxEngine.test.js
import { describe, it, expect, vi } from 'vitest';
import { analyzeXxx } from '../../server/ai/xxxEngine.js';

// Mock DB to make the test hermetic
vi.mock('../../server/db/mysql.js', () => ({
  dbQuery: vi.fn(async () => [/* fixture rows */]),
  dbQueryOne: vi.fn(async () => ({ /* fixture */ })),
}));

describe('analyzeXxx', () => {
  it('returns the contract shape', async () => {
    const result = await analyzeXxx({ ward: 'A1', window: 7 });
    expect(result).toMatchObject({
      score: expect.any(Number),
      confidence: expect.any(Number),
      evidence: expect.any(Array),
      actions: expect.any(Array),
      narrative: expect.any(String),
      source: expect.stringMatching(/^(claude|rule-based)$/),
    });
  });

  it('returns rule-based when Claude key absent', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const r = await analyzeXxx();
    expect(r.source).toBe('rule-based');
    expect(r.narrative.length).toBeGreaterThan(10);
  });
});
```

## Ideas for high-impact new AI modules

If the user asks "what should I add next?", these are the opportunities consistent with the project's direction (all would plug into the existing AI module registry without architectural changes):

- **Sepsis Bundle Compliance** — detect SIRS/qSOFA events that lack the 1-hour bundle; nudge IPD leadership.
- **Claim Denial Forecast** — predict which OPD visits are likely to have claim denials before submission, using `opitemrece` + DRG features.
- **No-show Predictor** — predict OPD no-show probability per appointment, so clinic can overbook strategically.
- **Drug-drug interaction surfacing** — cross `drug_receive` + active med list, narrate via Claude.
- **Readmission root-cause clusterer** — cluster recent 30-day readmissions by DX + LOS + discharge disposition to highlight patterns.
- **Staffing-demand mismatch detector** — compare hourly OPD flow vs active doctors/nurses to surface under-staffed windows.
- **Bed-flow bottleneck detector** — detect wards where LOS is drifting up and ER boarding is backing up.
- **Revenue leakage detector** — compare reimbursed vs billable based on documented services (reuses under-charging logic, goes deeper).
