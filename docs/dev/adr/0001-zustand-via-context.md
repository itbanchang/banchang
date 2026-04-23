# ADR 0001 — Zustand-style via React Context for dashboard state

Date: 2026-04-23
Status: Accepted

## Context

The dashboard unifies:
- REST-fetched data (`useDashboard().fetchData(key, url)`)
- Socket.IO-pushed live events (`NEWS2 alerts`, `triage updates`, `bed changes`)

Using react-query for REST and a separate mechanism for live data would bifurcate state ownership and create two source-of-truth systems.

## Decision

Use a single store backed by `useReducer` + `React.Context`, exposing a Zustand-like API:

- `useDashboard()` — raw store + actions.
- `useShallowDashboardSelector(selector)` — slice access, API-compatible with master's full Zustand version.
- `useDashboardActions()` — stable action references.

Both REST fetches and Socket.IO events dispatch into the same reducer. Live + fetched data live together.

## Consequences

- **+** Single source of truth. Components don't care whether data came from REST or Socket.IO.
- **+** Simpler mental model for contributors.
- **+** API compatibility with master's Zustand version; migration is mostly painless.
- **−** `@tanstack/react-query` is installed as a dep but not used as the state layer. Disclose this in contributor docs.
- **−** Context-wide re-renders when any slice changes. Acceptable at current scale; revisit if we start hitting selector hot paths.

## Alternatives considered

- **@tanstack/react-query + ad-hoc socket handling** — rejected (bifurcates state ownership).
- **Redux Toolkit** — rejected (more boilerplate than value at this scale).
- **MobX** — rejected (team unfamiliar; different mental model).
- **Signals (Preact-style)** — rejected (not in React 18 core; external dep risk).

## Notes

On master branch, `DashboardContext.jsx` is implemented with Zustand directly. This worktree branch retains `useReducer + useContext` semantics but adds the selector/actions hooks to match master's API surface. Migration to full Zustand is possible later without changing consumers.

## See also

- `src/context/DashboardContext.jsx`
- Skill: `bch-360-expert/references/architecture.md`
