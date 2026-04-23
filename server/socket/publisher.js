// ============================================================
// Socket.IO publisher — centralised event emission
// Wraps existing io instance so all events flow through:
//   - centralised room routing
//   - event log (for replay)
//   - winston structured log
// ============================================================
import logger from '../logger.js';
import { addToLog } from './eventLog.js';

let _io = null;

/** Initialise with the project's Socket.IO instance. Call once at boot. */
export function bindIo(io) {
    _io = io;
}

/**
 * Publish a domain event.
 * @param {object} event  { type, payload, room?, version?, ts?, source? }
 * @example
 *   publish({ type: 'ipd.news2.alert', payload: { ward: '3A', score: 7 } })
 */
export function publish(event) {
    if (!_io) {
        logger.warn('[socket.publisher] publish() called before bindIo()', { type: event?.type });
        return;
    }
    const enriched = {
        type: event.type,
        version: event.version || 1,
        ts: event.ts || Date.now(),
        source: event.source || 'unknown',
        payload: event.payload || {},
    };
    const room = event.room || roomForEvent(enriched);
    try {
        _io.to(room).emit(enriched.type, enriched);
        addToLog(enriched, room);
        logger.debug?.('socket.emit', { type: enriched.type, room, source: enriched.source });
    } catch (err) {
        logger.error('[socket.publisher] emit failed', { message: err.message, type: enriched.type });
    }
}

function roomForEvent(e) {
    const [domain, sub] = (e.type || '').split('.');
    if (domain === 'er') return 'er';
    if (domain === 'ipd' && e.payload.ward) return `ipd:ward:${e.payload.ward}`;
    if (domain === 'ipd' && sub === 'news2' && e.payload.news2 >= 7) return 'ipd:news2:critical';
    if (domain === 'ipd') return 'ipd';
    if (domain === 'finance') return 'finance:alerts';
    if (domain === 'exec') return 'exec:daily';
    return domain || 'global';
}
