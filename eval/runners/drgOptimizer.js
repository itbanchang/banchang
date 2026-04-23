// ============================================================
// Eval Runner — DRG Optimizer (precision on audited upgrades)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { precision, recall, rocAuc } from '../lib/stats.js';

const TARGETS = { precision_min: 0.80, recall_min: 0.60 };

export async function run() {
    // Ground truth requires audited DRG corrections. If the drg_audit
    // table doesn't exist yet, return a stub.
    try {
        const audited = await dbQuery(`
            SELECT an, drg_code AS audited, original_drg_code AS original
            FROM drg_audit
            WHERE audited_at >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
            LIMIT 500
        `);
        if (!audited.length) {
            return { n: 0, pass: false, note: 'no drg_audit records in last 90 days' };
        }
        // Stub scoring: random 0.5 threshold. Replace with engine call.
        const preds = audited.map(a => ({
            predicted_score: Math.random(),  // placeholder until engine wired
            predicted_label: Math.random() > 0.5 ? 1 : 0,
            actual: a.audited !== a.original ? 1 : 0,
        }));
        return {
            module: 'drgOptimizer',
            pass: false,  // stub always fails until wired
            metrics: {
                n: preds.length,
                precision: round(precision(preds)),
                recall: round(recall(preds)),
                auc: round(rocAuc(preds)),
            },
            targets: TARGETS,
            note: 'STUB: using random scores; wire server/ai/drgOptimizer engine when ready',
        };
    } catch (err) {
        return { module: 'drgOptimizer', pass: false, error: `drg_audit table missing: ${err.message}` };
    }
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
