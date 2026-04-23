// ============================================================
// Eval Runner — Billing Anomaly Detection
// Requires billing_audit ground truth; stub otherwise.
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { precision, recall, rocAuc } from '../lib/stats.js';

const TARGETS = { precision_min: 0.70, recall_min: 0.60 };

export async function run() {
    try {
        const audited = await dbQuery(`
            SELECT vn, is_anomaly FROM billing_audit
            WHERE audit_date >= DATE_SUB(CURDATE(), INTERVAL 60 DAY)
            LIMIT 500
        `);
        if (!audited.length) {
            return { n: 0, pass: false, note: 'no billing_audit records' };
        }
        const preds = audited.map(a => ({
            predicted_score: Math.random(),  // placeholder
            predicted_label: Math.random() > 0.5 ? 1 : 0,
            actual: a.is_anomaly ? 1 : 0,
        }));
        return {
            module: 'billingAnomaly',
            pass: false,
            metrics: {
                n: preds.length,
                precision: round(precision(preds)),
                recall: round(recall(preds)),
                auc: round(rocAuc(preds)),
            },
            targets: TARGETS,
            note: 'STUB: random scores; wire server/ai/billing*Engine when ready',
        };
    } catch (err) {
        return { module: 'billingAnomaly', pass: false, error: err.message };
    }
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
