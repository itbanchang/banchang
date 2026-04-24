# Promote Flow — Local Dev → Production

Canonical deploy path. Replaces the old PM2 / direct-edit workflow.

## TL;DR

```bash
# Develop locally
npm run dev                    # Vite :4001 + Express :4000

# When ready to ship
git commit -am "feat: ..."
npm run promote                # local → prod (with gates + auto-rollback)

# If something looks wrong
npm run rollback               # back to the snapshot from previous promote
```

## Topology

| Tier | Where | What runs | URL |
|---|---|---|---|
| **Dev** | Local Desktop (Windows) | `npm run dev` (Vite + Express) | http://localhost:4001 |
| **Prod** | `10.109.0.33` (Linux + Docker) | `bch360` container | https://10.109.0.33 |

There is **one** production host. Dev = your laptop. There is no staging tier yet.

## What `npm run promote` does

1. **Pre-flight gates** (block on failure unless `--force`):
   - Git working tree clean (excluding `.claude/` session state)
   - `npm run typecheck` passes
   - `npm run lint` passes
   - `npm run build` succeeds (unless `--skip-build`)
2. **SSH connectivity check** to `$BCH_PROD_HOST` using `$BCH_SSH_KEY`.
3. **Snapshot** current `/opt/bch360` → `/opt/bch360-snapshots/snapshot-<ts>.tar.gz`. Keeps the 5 newest, prunes the rest.
4. **Tar local source** (excludes `node_modules`, `.git`, `data_lake`, `logs`, `tmp`, `.claude/scheduled_tasks.lock`, `.claude/settings.local.json`) → `scp` to prod → extract over `/opt/bch360` (additive — does **not** delete files that exist on prod but not locally).
5. **`docker compose build && docker compose up -d`** on prod.
6. **Healthcheck** poll `https://<host>/healthz` for up to 60s.
7. On healthcheck **failure** → automatically run `rollback.sh --auto` to restore the snapshot from step 3, then exit non-zero.

## Setup (once per developer machine)

1. **Generate SSH key** (skip if `~/.ssh/id_ed25519` already exists):
   ```bash
   ssh-keygen -t ed25519 -C "bch360-deploy-$(hostname)" -f ~/.ssh/id_ed25519
   ```
2. **Install public key on prod** (one-time, requires password):
   ```bash
   ssh-copy-id -i ~/.ssh/id_ed25519.pub root@10.109.0.33
   ```
   Or manually: copy `~/.ssh/id_ed25519.pub` content into `/root/.ssh/authorized_keys` on prod.
3. **Verify**:
   ```bash
   ssh -i ~/.ssh/id_ed25519 -o BatchMode=yes root@10.109.0.33 "hostname"
   # → should print `newslave03` without prompting for a password
   ```
4. **Set env vars** in `.env` (copy defaults from `.env.example`).

## Daily use

```bash
# Quick local check
npm run dev                    # Test at http://localhost:4001

# Dry-run promote (no remote changes)
npm run promote:dry            # Verify gates pass + see what would happen

# Real promote
npm run promote
# 1. ✓ Gates: clean tree, typecheck, lint, build
# 2. ✓ SSH connected
# 3. ✓ Snapshot snapshot-20260424-091500.tar.gz (1.5M)
# 4. ✓ Source synced (3.2M tarball)
# 5. ✓ Docker rebuilt + restarted
# 6. ✓ Healthcheck passed (HTTP 200)

# Override gates (only when you must — e.g., emergency hotfix)
npm run promote:force
```

## Rollback

```bash
# Latest snapshot (what promote.sh uses on auto-rollback)
npm run rollback

# Pick a specific snapshot
bash scripts/rollback.sh snapshot-20260423-180000.tar.gz

# See what's available
npm run rollback:list
```

Rollback is interactive (asks for confirmation) unless called by `promote.sh --auto`.

## Snapshots

- Stored at `/opt/bch360-snapshots/` on prod.
- Each tarball includes everything **except** `node_modules`, `dist`, `data_lake`, `logs`, `tmp`, `*.log`.
- The 5 newest are kept; older ones are pruned by `promote.sh`.
- **`/opt/bch360/.last-snapshot`** records the most recent snapshot name.
- **`/opt/bch360/.deployed-sha`** records the git SHA of the source last promoted.
- **`/opt/bch360/.deployed-branch`** records the branch name.

## Gotchas

- **Source sync is additive.** Files that exist on prod but not locally are NOT deleted (covers data files, logs, ad-hoc debug scripts). If you need to remove a tracked file, `ssh root@10.109.0.33 "rm /opt/bch360/<path>"` after `npm run promote`.
- **`.env` on prod is not overwritten** — it's mounted as a Docker volume (`./.env:/app/.env:ro`). Update `.env` on prod manually if config changes.
- **Docker rebuild reinstalls `node_modules`** inside the container (Dockerfile uses `npm install --omit=dev`). Local `node_modules` does not affect prod.
- **Build runs locally** (in `dist/`) but is **not used** by prod — the Docker image rebuilds Vite inside the container. Local build is just a smoke test that the source compiles. To skip it, use `--skip-build`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Permission denied (publickey)` | Public key not on prod | Re-run `ssh-copy-id` step in setup |
| `Healthcheck FAILED` → auto-rollback | Container starts but `/api/system/health` doesn't return 2xx within 60s | Increase `BCH_HEALTHCHECK_TIMEOUT`; check `ssh root@10.109.0.33 docker logs bch360 --tail 100` |
| `Typecheck failed` | TS errors in src | Fix locally; or `npm run promote:force` for emergency only |
| `docker compose build` errors | Dockerfile or package.json change introduced a build error | Test locally first: `docker build .` (requires Docker Desktop on Windows) |
| Snapshot dir fills up | `BCH_SNAPSHOT_KEEP` too high | Lower in `.env`, or `ssh ... rm /opt/bch360-snapshots/snapshot-2025-*.tar.gz` |

## See also

- [deploy.md](./deploy.md) — older PM2-based runbook (superseded by this doc, kept for historical reference)
- [scripts/promote.sh](../../scripts/promote.sh) — implementation
- [scripts/rollback.sh](../../scripts/rollback.sh) — implementation
