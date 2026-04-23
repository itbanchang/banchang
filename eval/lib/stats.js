// ============================================================
// Eval statistics — classification + forecast metrics
// ============================================================

export function mean(xs) {
    return xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0;
}

export function accuracy(preds) {
    if (!preds.length) return 0;
    return preds.filter(p => p.predicted_label === p.actual).length / preds.length;
}

export function precision(preds) {
    const tp = preds.filter(p => p.predicted_label === 1 && p.actual === 1).length;
    const fp = preds.filter(p => p.predicted_label === 1 && p.actual === 0).length;
    return (tp + fp) > 0 ? tp / (tp + fp) : 0;
}

export function recall(preds) {
    const tp = preds.filter(p => p.predicted_label === 1 && p.actual === 1).length;
    const fn = preds.filter(p => p.predicted_label === 0 && p.actual === 1).length;
    return (tp + fn) > 0 ? tp / (tp + fn) : 0;
}

export function f1(preds) {
    const p = precision(preds), r = recall(preds);
    return (p + r) > 0 ? (2 * p * r) / (p + r) : 0;
}

/** ROC AUC via trapezoidal sweep over predicted_score. */
export function rocAuc(preds) {
    const sorted = [...preds].sort((a, b) => b.predicted_score - a.predicted_score);
    const pos = sorted.filter(p => p.actual === 1).length;
    const neg = sorted.length - pos;
    if (pos === 0 || neg === 0) return 0;
    let tp = 0, fp = 0, auc = 0, prevFp = 0;
    for (const p of sorted) {
        if (p.actual === 1) tp++; else fp++;
        auc += (fp - prevFp) * tp;
        prevFp = fp;
    }
    return auc / (pos * neg);
}

/** Brier score — squared error between probability and outcome. Lower is better. */
export function brierScore(preds) {
    if (!preds.length) return 0;
    return preds.reduce((s, p) => s + (p.predicted_score - p.actual) ** 2, 0) / preds.length;
}

/** Expected Calibration Error across N bins. Lower is better. */
export function expectedCalibrationError(preds, bins = 10) {
    if (!preds.length) return 0;
    const binned = Array.from({ length: bins }, () => []);
    for (const p of preds) {
        const idx = Math.min(bins - 1, Math.max(0, Math.floor(p.predicted_score * bins)));
        binned[idx].push(p);
    }
    let ece = 0;
    for (const b of binned) {
        if (!b.length) continue;
        const meanPred = b.reduce((s, p) => s + p.predicted_score, 0) / b.length;
        const rate = b.filter(p => p.actual === 1).length / b.length;
        ece += (b.length / preds.length) * Math.abs(meanPred - rate);
    }
    return ece;
}

/** Mean absolute percent error for forecasts. */
export function mape(actuals, forecasts) {
    if (actuals.length !== forecasts.length) throw new Error('actuals/forecasts length mismatch');
    const valid = actuals.map((a, i) => ({ a, f: forecasts[i] })).filter(x => x.a !== 0 && x.a != null);
    if (!valid.length) return null;
    return valid.reduce((s, { a, f }) => s + Math.abs((a - f) / a), 0) / valid.length;
}

/** Directional accuracy for time-series forecasts. */
export function directionalAccuracy(actuals, forecasts) {
    const n = Math.min(actuals.length, forecasts.length);
    let hits = 0, total = 0;
    for (let i = 1; i < n; i++) {
        const actualDir = Math.sign(actuals[i] - actuals[i - 1]);
        const forecastDir = Math.sign(forecasts[i] - forecasts[i - 1]);
        if (actualDir === 0) continue;
        if (actualDir === forecastDir) hits++;
        total++;
    }
    return total ? hits / total : 0;
}
