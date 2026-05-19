// ============================================================
// BCH 360° Intelligence V.10 — AI Learning Capture
// Auto-logs AI module outputs to Learning Journal
// ============================================================
import { logLearning } from '../db/evolutionStore.js';
import logger from '../logger.js';

// Throttle: max 1 capture per module+type every 5 minutes
const _lastCapture = new Map();
const COOLDOWN = 5 * 60 * 1000;

export function captureLearning(module, event_type, title, detail = null, metric_value = null, metric_unit = null, severity = 'info') {
    const key = `${module}:${event_type}`;
    const now = Date.now();
    if (_lastCapture.has(key) && now - _lastCapture.get(key) < COOLDOWN) return;
    _lastCapture.set(key, now);

    try {
        logLearning({ module, event_type, severity, title, detail, metric_value, metric_unit });
    } catch (err) {
        logger.warn('[LearningCapture] Failed to log', { module, error: err.message });
    }
}
