// ============================================================
// Eval Runner — ER Surge Prediction (hourly census > 120% capacity)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { accuracy, precision, recall, rocAuc } from '../lib/stats.js';

const TARGETS = { recall_min: 0.85, precision_min: 0.50 };
const ER_CAPACITY = Number(process.env.ER_CAPACITY || 15);

export async function run({ hours = 24 * 7 } = {}) {
    // Get hourly ER census for the last N hours
    const rows = await dbQuery(`
        SELECT DATE_FORMAT(register_time, '%Y-%m-%d %H:00') AS hr,
               COUNT(*) AS census
        FROM er_regist
        WHERE register_time >= DATE_SUB(NOW(), INTERVAL ? HOUR)
        GROUP BY DATE_FORMAT(register_time, '%Y-%m-%d %H:00')
        ORDER BY hr
    `, [hours]);

    if (rows.length < 24) {
        return { n: rows.length, pass: false, note: 'need ≥ 24 hours' };
    }

    // Surge = census > 1.2 × capacity
    // Heuristic forecast: "next hour will surge if previous hour did" (persistence baseline)
    const preds = [];
    for (let i = 1; i < rows.length; i++) {
        const prevCensus = Number(rows[i - 1].census);
        const curCensus = Number(rows[i].census);
        const predSurge = prevCensus > ER_CAPACITY * 1.2 ? 1 : 0;
        const actSurge = curCensus > ER_CAPACITY * 1.2 ? 1 : 0;
        preds.push({
            predicted_score: prevCensus / (ER_CAPACITY * 1.2),
            predicted_label: predSurge,
            actual: actSurge,
        });
    }

    const m = {
        n: preds.length,
        accuracy: round(accuracy(preds)),
        precision: round(precision(preds)),
        recall: round(recall(preds)),
        auc: round(rocAuc(preds)),
        actual_surge_rate: round(preds.filter(p => p.actual).length / preds.length),
    };

    return {
        module: 'erSurge',
        pass: m.recall >= TARGETS.recall_min,
        metrics: m,
        targets: TARGETS,
        note: 'persistence baseline — replace with server/ai/erSurgeEngine',
    };
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
