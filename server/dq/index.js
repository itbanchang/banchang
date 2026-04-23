// ============================================================
// Data Quality — central runner
// Aggregates all DQ checks into a single status object for /api/dq/status
// ============================================================
import { checkAllContracts } from './contracts/index.js';
import { checkFreshness } from './freshness.js';
import { checkVolumes } from './volume.js';
import { checkInvariants } from './invariants.js';
import logger from '../logger.js';

export async function runAllChecks() {
    const start = Date.now();
    const [contracts, freshness, volumes, invariants] = await Promise.all([
        checkAllContracts().catch(e => ({ error: e.message })),
        checkFreshness().catch(e => ({ error: e.message })),
        checkVolumes().catch(e => ({ error: e.message })),
        checkInvariants().catch(e => ({ error: e.message })),
    ]);

    const allChecks = [
        ...(Array.isArray(contracts) ? contracts : []),
        ...(Array.isArray(freshness) ? freshness : []),
        ...(Array.isArray(volumes) ? volumes : []),
        ...(Array.isArray(invariants) ? invariants : []),
    ];

    const failures = allChecks.filter(c => c.pass === false);
    const warnings = allChecks.filter(c => c.severity === 'warning' && c.pass !== false);
    const ok = allChecks.filter(c => c.pass === true && c.severity !== 'warning');

    const status = failures.length > 0 ? 'danger'
        : warnings.length > 0 ? 'warning'
        : 'ok';

    const durationMs = Date.now() - start;
    logger.info('[dq] checks complete', { status, total: allChecks.length, failures: failures.length, warnings: warnings.length, durationMs });

    return {
        status,
        summary: {
            total: allChecks.length,
            pass: ok.length,
            warning: warnings.length,
            fail: failures.length,
        },
        details: {
            contracts: Array.isArray(contracts) ? contracts : [{ error: contracts.error }],
            freshness: Array.isArray(freshness) ? freshness : [{ error: freshness.error }],
            volumes:   Array.isArray(volumes) ? volumes : [{ error: volumes.error }],
            invariants: Array.isArray(invariants) ? invariants : [{ error: invariants.error }],
        },
        generated_at: Date.now(),
        duration_ms: durationMs,
    };
}
