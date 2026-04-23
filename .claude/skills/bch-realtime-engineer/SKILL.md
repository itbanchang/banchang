---
name: bch-realtime-engineer
description: Socket.IO / real-time streaming authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about live data, push updates, Socket.IO rooms, WebSocket patterns, live alerts, streaming, reactive dashboards, NEWS2 alerts, ER triage live, sepsis watchlist, reconnect handling, event sourcing, back-pressure, replay on reconnect, or "I want this to update without refreshing". Triggers on live, real-time, realtime, websocket, ws, socket, socket.io, push, stream, reactive, event-driven, room, broadcast, subscribe, publish, emit, reconnect, replay, back-pressure, feed. Complements `bch-360-expert` (architecture) and `bch-ui-designer` (live-data visual patterns).
---

# BCH 360° — Real-time Engineer

You are the live-data authority. In a hospital, seconds matter: NEWS2 critical, ER surge, sepsis flag, bed availability changing. The project already has Socket.IO wired, but it's used thinly. Your mandate: design the real-time layer so every clinical-critical signal reaches the screen within seconds, and make it robust through reconnects, back-pressure, and partial failures.

The difference between a static dashboard and a real-time one is trust: clinicians believe what they see NOW, not what was true five minutes ago.

## When to use real-time vs polling vs cache

| Scenario | Mechanism | TTL/cadence |
|----------|-----------|-------------|
| ER queue changes | Socket.IO push | Immediate on event |
| NEWS2 alerts | Socket.IO push | Immediate |
| Live bed availability | Socket.IO push | Immediate |
| OPD today count | Cached fetch | 60s refetch |
| Monthly revenue | Cached fetch | 5-min refetch |
| YoY report | Cached, manual refresh | On-demand |

Rule: if missing an update by 10 seconds would cause clinical harm or a bad decision, push it. Otherwise, poll.

## Room design — the domain model

Socket.IO rooms are the primary isolation mechanism. Design them around clinical domains:

```
er                        — all ER live events, all users who opened ER tab
er:triage                 — triage queue changes (arrival, severity change, disposition)
er:boarding               — ER→IPD bed-wait updates
ipd                       — all IPD
ipd:ward:<ward_id>        — ward-specific (bed changes, NEWS2 spikes)
ipd:news2:critical        — critical NEWS2 across all wards, for RRT team
opd:live                  — live OPD queue (for staff screens)
finance:alerts            — denial spikes, under-charging flags
exec:daily                — exec briefing updates
system:health             — infra health (pool, cache, DQ)
```

Naming convention: `domain[:subdomain[:qualifier]]`. Lowercase, colon-separated.

Client joins only what the current tab needs:

```js
// src/hooks/useWebSocket.js (existing) — extend with room join
useEffect(() => {
  if (activeTab === 'er') {
    socket.emit('join', ['er', 'er:triage', 'er:boarding']);
  } else if (activeTab === 'ipd') {
    socket.emit('join', ['ipd', 'ipd:news2:critical']);
  }
  return () => socket.emit('leave', /* ... */);
}, [activeTab]);
```

Never join everyone to everything. A quiet morning in finance shouldn't send an event to 50 open nursing stations.

## Event shape contract

Every Socket.IO event payload follows:

```ts
interface Event {
  type: string;           // "er.triage.update" | "ipd.news2.alert" | ...
  version: number;        // schema version for this type
  ts: number;             // Date.now() at publish
  source: string;         // server module that emitted
  payload: Record<string, any>;  // the actual content
  correlationId?: string;        // link to request/trace
}
```

Keep payloads small — under 1KB. Don't push whole patient records; push the diff (what changed + key identifiers):

```json
{
  "type": "ipd.news2.alert",
  "version": 1,
  "ts": 1713872412000,
  "source": "ewsEngine",
  "payload": {
    "hn_hash": "a7b3c9",            // de-identified patient ref
    "ward": "3A",
    "bed": "3A-04",
    "news2": 7,
    "delta": { "prev_news2": 4 },
    "triggers": ["o2sat:91", "rr:26"]
  }
}
```

The client uses this to update the store; if full details are needed, it re-fetches via REST.

## Publisher pattern — emit from server

```js
// server/socket.js — central publisher
import { io } from './socket.js';

export function publish(event) {
  const room = roomForEvent(event);
  const payload = {
    ...event,
    ts: event.ts || Date.now(),
    version: event.version || 1,
  };
  io.to(room).emit(event.type, payload);
  // Also persist to event log for replay
  logEvent(payload);
}

function roomForEvent(e) {
  // Derive room from event.type
  const [domain, sub] = e.type.split('.');
  if (domain === 'er') return 'er';
  if (domain === 'ipd' && e.payload.ward) return `ipd:ward:${e.payload.ward}`;
  if (domain === 'ipd' && e.payload.news2 >= 7) return 'ipd:news2:critical';
  return domain;
}
```

Engines and route handlers call `publish({ type, payload })` instead of `io.emit(...)` directly. This centralises logging + room routing + versioning.

## Subscriber pattern — handle on client

```js
// src/hooks/useRealtimeSubscription.js
export function useRealtimeSubscription(eventType, handler) {
  const socket = useSocket();
  useEffect(() => {
    const onEvent = (payload) => {
      if (payload.version !== 1) {
        console.warn(`Unsupported event version for ${eventType}`, payload.version);
        return;
      }
      handler(payload);
    };
    socket.on(eventType, onEvent);
    return () => socket.off(eventType, onEvent);
  }, [eventType, handler, socket]);
}

// Usage in a tab
useRealtimeSubscription('ipd.news2.alert', (p) => {
  dispatch({ type: 'ADD_ALERT', payload: p });
});
```

Dispatch into the Dashboard store, never manage live state in a component's local `useState`. That breaks when user changes tabs.

## Reconnect + replay

Sockets drop. Mobile networks drop. The dashboard must recover gracefully.

### Reconnect strategy

```js
// src/hooks/useWebSocket.js
const socket = io('/', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  randomizationFactor: 0.3,
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

socket.on('connect', () => {
  // Re-join rooms after reconnect
  socket.emit('join', currentRooms);
  // Request replay of events missed during disconnect
  socket.emit('replay', { from: lastEventTs });
});
```

### Replay on reconnect

Server keeps a bounded event log (last 15 minutes of all events, in memory or sidecar SQLite). On reconnect, client sends `replay` with its last seen timestamp; server streams missed events.

```js
// server/socket.js
const EVENT_LOG_MAX_MS = 15 * 60_000;
const eventLog = [];  // ring buffer; older events pruned

export function logEvent(event) {
  eventLog.push(event);
  const cutoff = Date.now() - EVENT_LOG_MAX_MS;
  while (eventLog.length > 0 && eventLog[0].ts < cutoff) eventLog.shift();
}

io.on('connection', (socket) => {
  socket.on('replay', ({ from }) => {
    const missed = eventLog.filter(e => e.ts >= from && clientHasRoomForEvent(socket, e));
    for (const e of missed) socket.emit(e.type, e);
  });
});
```

This prevents the "I came back from lunch and my dashboard is wrong" scenario.

## Back-pressure handling

When lots of events fire (triage rush, NEWS2 storm, DB refresh publishing hundreds of ward changes), naive `io.emit` can overwhelm clients — especially mobile ones on 4G.

Defensive patterns:

### 1. Coalesce

For high-frequency update types (bed census, queue count), coalesce updates per room over a 500ms window:

```js
// Don't emit every row change; emit a summary every 500ms at most
const pending = new Map();   // room -> latest event

setInterval(() => {
  for (const [room, event] of pending) {
    io.to(room).emit(event.type, event);
  }
  pending.clear();
}, 500);

export function coalescedPublish(room, event) {
  pending.set(room + ':' + event.type, event);  // last write wins
}
```

### 2. Drop low-priority on overload

If the server's send buffer is high water, drop info-level events and keep only critical/warning.

### 3. Binary for large payloads

For heatmap updates or bulk snapshots, use `socket.emit(type, buffer)` with MessagePack or a tight schema. Saves ~50-70% bandwidth.

## Auth + room security

Not every user should join every room. Enforce on `join`:

```js
io.on('connection', (socket) => {
  socket.on('join', (rooms) => {
    for (const room of rooms) {
      if (!canJoin(socket.user, room)) {
        socket.emit('error', { code: 'forbidden', room });
        continue;
      }
      socket.join(room);
    }
  });
});

function canJoin(user, room) {
  if (room.startsWith('exec:')) return user.roles.includes('executive');
  if (room.startsWith('finance:')) return user.roles.includes('finance');
  if (room.startsWith('ipd:')) return user.roles.includes('ipd') || user.roles.includes('nurse');
  // ... etc
  return true;
}
```

Socket auth: JWT from cookie or `socket.handshake.auth.token`. Validate on `connection`; reject before joining any room if invalid.

## Transport + fallback

- Default: WebSocket.
- Fallback: long-polling (Socket.IO handles it). Needed on networks that block WS (some hospital guest networks).
- Compression: enable per-message-deflate if payloads > 1KB.

Production CSP must allow `ws://` or `wss://` to the server origin (already set in `server/server.js` helmet config — uses `ws://localhost:*` wildcard in dev, specific host in prod).

## Client state: Zustand, not component state

When a real-time event arrives, it goes into the Dashboard store (via `dispatch` or `addAlert`), NOT into the component's local state.

Why: the user might switch tabs and come back. Local state is discarded; store state persists. Also the store is the single source of truth for "live vs historical" logic.

## Testing real-time flows

### Server side

- Unit test publishers: call engine; assert `io.to(room).emit(...)` was called with the right payload.
- Integration test with `socket.io-client`: connect a test client, trigger an event, assert receipt.

### Client side

- Mock the `socket` object; fire synthetic events; assert store state updated.
- Playwright e2e: spin up server + client; trigger an event via API; confirm UI updated.

Vitest + `socket.io-client` + `socket.io-mock` libs work well.

## Common patterns — quick reference

### 1. "New ER patient arrived" push

Server: `POST /api/er/register` handler → after DB insert → `publish({ type: 'er.triage.update', payload: { hn_hash, triage_level } })`.

Client: ERTab subscribes to `er.triage.update` → prepends to live queue.

### 2. NEWS2 critical alert

Server: `ewsEngine` run on new vitals → if score ≥ 7 → `publish({ type: 'ipd.news2.alert', ... })`.

Client: top-level listener shows `<AlertBanner>`; IPDTab pushes into active alert list.

### 3. Bed occupancy change

Server: admit / discharge event → `publish({ type: 'ipd.bed.update', payload: { ward, bed, status } })`.

Client: per-ward grid updates the single bed state, no full re-fetch needed.

### 4. Revenue running total (dev board display)

Server: nightly cron publishes `finance.revenue.daily` to `exec:daily`.

Client: exec dashboard auto-updates.

## Anti-patterns to refuse

- **Pushing every DB change indiscriminately** — overwhelms clients and wastes bandwidth. Only push what clinicians care about.
- **Raw `io.emit` from random handlers** — centralise through the `publish()` wrapper so routing, logging, and versioning are consistent.
- **Holding large data in events** — push the diff or an identifier; let client re-fetch details if needed.
- **No reconnect handling** — a clinician who closes the laptop and reopens should see fresh state, not a stale snapshot.
- **Joining all users to all rooms for simplicity** — breaks security and scale.
- **Live-updating high-frequency data with chart re-animation** — `isAnimationActive={false}` always on live charts (see `bch-ui-designer/references/chart-patterns.md`).

## Sibling skills

- `bch-360-expert/references/architecture.md` — Socket.IO wiring basics (`server/socket.js`).
- `bch-ui-designer` — visual patterns for live data (pulse indicator, data-freshness bar, animation discipline).
- `bch-observability` — real-time health metrics (events/sec, active clients, send latency).
- `bch-security-compliance` — room auth + PII in event payloads.
