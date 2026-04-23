// ============================================================
// Factuality check — detect numbers in Claude output not in the input
// This is the single most valuable eval for LLM narratives.
// ============================================================

/** Collect all numeric values recursively from a nested input object. */
export function collectNumbers(obj, out = new Set()) {
    if (obj == null) return out;
    if (typeof obj === 'number' && Number.isFinite(obj)) {
        out.add(obj);
        // Also add rounded variants, percentage form, millions form
        out.add(Math.round(obj));
        out.add(Math.round(obj * 100) / 100);  // 2 decimals
        if (Math.abs(obj) >= 1_000_000) out.add(Math.round(obj / 100_000) / 10);  // millions (1 dp)
    } else if (typeof obj === 'string') {
        const m = obj.match(/-?\d+\.?\d*/g);
        if (m) for (const s of m) {
            const n = Number(s);
            if (Number.isFinite(n)) out.add(n);
        }
    } else if (Array.isArray(obj)) {
        for (const v of obj) collectNumbers(v, out);
    } else if (typeof obj === 'object') {
        for (const v of Object.values(obj)) collectNumbers(v, out);
    }
    return out;
}

/** Close-enough comparison — absolute < 0.5 or relative < 1%. */
function closeEnough(a, b) {
    if (Object.is(a, b)) return true;
    const abs = Math.abs(a - b);
    if (abs < 0.5) return true;
    const rel = abs / Math.max(Math.abs(a), Math.abs(b), 1);
    return rel < 0.01;
}

/**
 * Check if a narrative text contains orphan numbers (numbers not present in inputs).
 *
 * @param {string} text - the generated narrative
 * @param {any}    inputs - the data fed to the prompt (nested object)
 * @returns {{ pass: boolean, orphans: number[], totalDetected: number }}
 */
export function checkNumbersMatch(text, inputs) {
    const extracted = [...(text.matchAll(/-?\d[\d,]*\.?\d*/g) || [])]
        .map(m => Number(m[0].replace(/,/g, '')))
        .filter(n => Number.isFinite(n) && Math.abs(n) >= 1 && Math.abs(n) < 1e12);

    const allowed = collectNumbers(inputs);
    const orphans = [];
    for (const n of extracted) {
        const allowedHit = [...allowed].some(a => closeEnough(n, a));
        if (!allowedHit) orphans.push(n);
    }

    return {
        pass: orphans.length === 0,
        orphans,
        totalDetected: extracted.length,
    };
}
