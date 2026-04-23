// ============================================================
// Event log — bounded ring buffer for Socket.IO replay-on-reconnect
// ============================================================

const MAX_MS = 15 * 60_000;  // keep last 15 minutes
const MAX_ENTRIES = 2_000;   // hard cap

const _log = [];

export function addToLog(event, room) {
    _log.push({ ...event, _room: room });
    // Prune by time
    const cutoff = Date.now() - MAX_MS;
    while (_log.length && _log[0].ts < cutoff) _log.shift();
    // Prune by count
    while (_log.length > MAX_ENTRIES) _log.shift();
}

/** Return events at-or-after `fromTs` that match the given rooms. */
export function replaySince(fromTs, rooms) {
    const roomSet = new Set(rooms || []);
    return _log.filter(e => e.ts >= fromTs && roomSet.has(e._room));
}

export function logStats() {
    return {
        size: _log.length,
        oldest: _log[0]?.ts || null,
        newest: _log.at(-1)?.ts || null,
        max_ms: MAX_MS,
        max_entries: MAX_ENTRIES,
    };
}
