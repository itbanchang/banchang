// ============================================================
// Eval Runner — Readmission Risk
// Uses historical discharges as ground truth.
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { accuracy, precision, recall, f1, rocAuc, brierScore, expectedCalibrationError } from '../lib/stats.js';

// Target thresholds (from skill: bch-ai-evals)
const TARGETS = {
    auc_min: 0.75,
    ece_max: 0.05,
    brier_max: 0.20,
};

export async function run() {
    // 1. Get admits discharged 30–60 days ago (have had time to readmit)
    const admits = await dbQuery(`
        SELECT an, hn, regdate, dchdate, ward
        FROM ipt
        WHERE dchdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 60 DAY)
                          AND DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND ward != '06'
        LIMIT 500
    `);

    if (admits.length === 0) {
        return { n: 0, note: 'no historical admits in the 30–60 day window', pass: false };
    }

    // 2. For each admit, compute the model prediction (stub — wire to real engine later)
    //    and fetch the ground-truth outcome.
    const preds = [];
    for (const a of admits) {
        // TODO: wire to server/ai/readmissionEngine.js once available.
        // For now the predictor returns a simple heuristic so the pipeline is testable end-to-end.
        const predicted_score = heuristicReadmitScore(a);
        const [readmit] = await dbQuery(`
            SELECT 1 AS yes FROM ipt
            WHERE hn = ? AND regdate > ? AND regdate <= DATE_ADD(?, INTERVAL 30 DAY)
            LIMIT 1
        `, [a.hn, a.dchdate, a.dchdate]);
        preds.push({
            predicted_score,
            predicted_label: predicted_score > 0.5 ? 1 : 0,
            actual: readmit ? 1 : 0,
        });
    }

    // 3. Compute metrics
    const metrics = {
        n: preds.length,
        accuracy: round(accuracy(preds)),
        precision: round(precision(preds)),
        recall: round(recall(preds)),
        f1: round(f1(preds)),
        auc: round(rocAuc(preds)),
        brier: round(brierScore(preds)),
        ece: round(expectedCalibrationError(preds, 10)),
        readmit_rate: round(preds.filter(p => p.actual === 1).length / preds.length),
    };

    const pass =
        metrics.auc >= TARGETS.auc_min &&
        metrics.ece <= TARGETS.ece_max &&
        metrics.brier <= TARGETS.brier_max;

    return {
        module: 'readmission',
        pass,
        metrics,
        targets: TARGETS,
        note: 'using heuristic stub — wire server/ai/readmissionEngine.js for real eval',
    };
}

function round(n) {
    if (n == null) return null;
    return Math.round(n * 10000) / 10000;
}

/** Placeholder scoring — replace with engine call. */
function heuristicReadmitScore(a) {
    // Very rough proxy; the real eval replaces this.
    const los = a.dchdate && a.regdate ? daysBetween(a.regdate, a.dchdate) : 0;
    return Math.min(0.9, 0.1 + Math.min(los, 14) / 28);
}

function daysBetween(d1, d2) {
    return Math.max(0, Math.round((new Date(d2) - new Date(d1)) / 86_400_000));
}
