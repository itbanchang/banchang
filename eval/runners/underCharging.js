// ============================================================
// Eval Runner — Under-charging Detection
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { precision, recall } from '../lib/stats.js';

const TARGETS = { precision_min: 0.75, recall_min: 0.50 };

export async function run() {
    try {
        const audited = await dbQuery(`
            SELECT vn, was_undercharged FROM billing_audit
            WHERE audit_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
            LIMIT 500
        `);
        if (!audited.length) {
            return { n: 0, pass: false, note: 'no billing_audit records (or column missing)' };
        }
        const preds = audited.map(a => ({
            predicted_score: Math.random(),
            predicted_label: Math.random() > 0.5 ? 1 : 0,
            actual: a.was_undercharged ? 1 : 0,
        }));
        return {
            module: 'underCharging',
            pass: false,
            metrics: {
                n: preds.length,
                precision: round(precision(preds)),
                recall: round(recall(preds)),
            },
            targets: TARGETS,
            note: 'STUB: random scores; wire server/ai/undercharge* when ready',
        };
    } catch (err) {
        return { module: 'underCharging', pass: false, error: err.message };
    }
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
