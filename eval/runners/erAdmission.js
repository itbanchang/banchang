// ============================================================
// Eval Runner — ER Admission Prediction (will this ER visit → IPD?)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { accuracy, rocAuc, brierScore } from '../lib/stats.js';

const TARGETS = { auc_min: 0.70 };

export async function run({ days = 30 } = {}) {
    const rows = await dbQuery(`
        SELECT e.vn, e.triage_level, o.ovstost
        FROM er_regist e
        JOIN ovst o ON o.vn = e.vn
        WHERE e.register_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    `, [days]);

    if (!rows.length) return { n: 0, pass: false, note: 'no ER visits in window' };

    // Heuristic: triage 1-2 more likely to be admitted
    const preds = rows.map(r => {
        const t = Number(r.triage_level);
        const score = t === 1 ? 0.8 : t === 2 ? 0.5 : t === 3 ? 0.2 : 0.05;
        return {
            predicted_score: score,
            predicted_label: score > 0.5 ? 1 : 0,
            actual: ['54', '61'].includes(String(r.ovstost)) ? 1 : 0,
        };
    });

    return {
        module: 'erAdmission',
        pass: rocAuc(preds) >= TARGETS.auc_min,
        metrics: {
            n: preds.length,
            accuracy: round(accuracy(preds)),
            auc: round(rocAuc(preds)),
            brier: round(brierScore(preds)),
            admit_rate: round(preds.filter(p => p.actual).length / preds.length),
        },
        targets: TARGETS,
        note: 'triage-level heuristic — replace with server/ai/erAdmissionPredictor',
    };
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
