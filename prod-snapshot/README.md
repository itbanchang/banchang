# /opt/bch360-dev — Code Master + Reflector

Mirror of the production `bch360` container, snapshotted **2026-05-19 13:53 ICT**.
Use this tree as the canonical "what's actually running" reference for BCH 360°.

## Layout

| Path              | Mounted into dev container | Role                                                                                                         |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `server/`         | `/app/server`              | Runnable backend (Node.js, 135 files, 12 MB) — exact mirror of `bch360:/app/server`                          |
| `dist/`           | `/app/dist`                | Runnable frontend (minified bundles, 146 files, 21 MB) — exact mirror of `bch360:/app/dist`                  |
| `dist-reflector/` | NOT mounted                | Beautified copy of `dist/` (140 bundles re-indented for human reading, 31 MB) — **the "Reflector" source**   |
| `data_lake/`      | `/app/data_lake`           | warehouse.db (156 MB) — copied from prod after `PRAGMA wal_checkpoint(TRUNCATE)`                             |
| `.env`            | `/app/.env`                | **Dev-specific** — `PORT=4003`, `HTTP_REDIRECT_PORT=4005`, separate `JWT_SECRET` (NOT overwritten from prod) |
| `logs/`           | `/app/logs`                | Dev logs (separate from prod)                                                                                |

## Backup of pre-sync state

`/opt/bch360-dev-backup-20260519-1346/` holds the previous `/opt/bch360-dev/` contents:

- `server-pre-sync.tar.gz` (494 KB)
- `dist-pre-sync.tar.gz` (4.4 MB)
- `.env.pre-sync` (1.6 KB)

Restore with: `tar xzf <name>.tar.gz -C /opt/bch360-dev/`.

## How to use

### Read what's running in prod

Open any file under `dist-reflector/assets/` — bundles are indented for readability. Cross-reference with the minified file of the same name under `dist/assets/` to find what's actually served.

### Iterate on dev without touching prod

Edit `server/*` or `dist/*` directly. Then:

```sh
docker restart bch360-dev    # backend changes
# OR just refresh the browser at https://10.109.0.33:4003 for frontend changes
```

### Promote a tested change to prod

After verifying on dev (`https://10.109.0.33:4003`), apply the same `docker cp` patch to the `bch360` container — see `.claude/skills/bch-edit-on-prod/`.

## Live URLs

- Prod: `https://10.109.0.33:4001` (container `bch360`, image `bch360:stable`)
- Dev: `https://10.109.0.33:4003` (container `bch360-dev`, image inherited from prod)

## Sources of truth

- **Bundle truth**: `dist-reflector/` — what users actually see
- **Backend truth**: `server/` — what the API actually runs
- **NOT this tree**: `/opt/bch360/src/` — pre-bundle source, drifted from runtime (see memory `project_reporttab_source_lost.md`, `project_v2_merge_incomplete.md`)
