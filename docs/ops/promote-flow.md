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

0. **Deploy-window guard** (`check_deploy_window`):
   - Blocks Mon–Fri 07:00–11:00 (morning rounds) and Fri ≥15:00 by default
   - Override per-run with `--emergency="reason text"`, or per-host with `BCH_DEPLOY_SKIP_WINDOW=1` in `.env`
1. **Pre-flight gates** (block on failure unless `--force`):
   - Git working tree clean (excluding `.claude/` session state)
   - `npm run typecheck` passes
   - **Lint baseline** check via `scripts/lint-check.sh` (regression only — accepts `<=` baseline counts)
   - `npm run build` succeeds (unless `--skip-build`)
2. **SSH connectivity check** to `$BCH_PROD_HOST` using `$BCH_SSH_KEY`.
3. **Snapshot** current `/opt/bch360` → `/opt/bch360-snapshots/snapshot-<ts>.tar.gz`. Keeps the 5 newest.
4. **Tar local source** → `scp` to prod → extract over `/opt/bch360` (additive — does **not** delete files that exist on prod but not locally).
5. **Adopt safe baseline** if `bch360:safe` doesn't exist yet — tag the currently running image as `bch360:safe` so we always have a fallback before touching anything.
6. **`docker build`** on prod with three tags + provenance labels:
   - `bch360:sha-<short>` — immutable, one per git SHA
   - `bch360:deploy-<YYYYMMDD-HHMM>` — immutable, one per deploy
   - `bch360:latest` — mutable, points to most recent
   - Labels: `bch360.git-sha`, `bch360.git-branch`, `bch360.deployed-at`, `bch360.deployed-by`
7. **Stop old container, run new container** from `bch360:latest`.
8. **Prune** older `sha-*`/`deploy-*` tags, keeping the 10 newest. `bch360:safe` is **never** pruned.
9. **Healthcheck** poll `https://<host>/healthz` for up to 60s.
10. On healthcheck **failure** → restore `bch360:safe` (NOT the just-taken snapshot — that contains the broken source). Re-poll healthcheck. If still failing, exit non-zero with explicit "manual intervention required" message.

## Image tag scheme on prod

| Tag | Mutable? | Lifetime | Purpose |
|---|---|---|---|
| `bch360:safe` | **No** (rotation only) | Until rotation script promotes a newer image after 1h healthy uptime | Auto-rollback target. Never touched by `promote.sh`. |
| `bch360:latest` | Yes | Updated every promote | Default target for `docker run bch360`. |
| `bch360:sha-<short>` | No | Pruned after `BCH_IMAGE_KEEP=10` newer | Pin a specific git SHA. Useful for debugging "what changed". |
| `bch360:deploy-<YYYYMMDD-HHMM>` | No | Pruned same as above | Pin a specific deploy moment, even across re-deploys of the same SHA. |

`bch360:safe` is rotated by `scripts/promote-safe-rotate.sh`, which runs hourly via cron on prod. Install once with `npm run promote:safe-rotate:install`. The script promotes `bch360:latest` → `bch360:safe` only when the running container has been up `MIN_UPTIME_HOURS` (default 1h) AND `/healthz` returns 200. Logs go to `/var/log/bch360-safe-rotate.log` on prod.

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
5. **Install safe-rotate cron on prod** (one-time, idempotent):
   ```bash
   npm run promote:safe-rotate:install
   ```
   This adds an hourly cron entry on prod that promotes `bch360:latest` → `bch360:safe` once the running container has been healthy for ≥1 hour. The first time `npm run promote` runs, it will also adopt the currently-running image as `bch360:safe` if the tag doesn't exist yet.

## Daily use

```bash
# Quick local check
npm run dev                    # Test at http://localhost:4001

# Dry-run promote (no remote changes)
npm run promote:dry            # Verify gates pass + see what would happen

# Real promote
npm run promote
# 0. ✓ Deploy window OK (or fails with "blocked by deploy window")
# 1. ✓ Gates: clean tree, typecheck, lint baseline, build
# 2. ✓ SSH connected
# 3. ✓ Snapshot snapshot-20260424-091500.tar.gz (1.5M)
# 4. ✓ Source synced (3.2M tarball)
# 5. ✓ Adopted bch360:safe baseline (first run only)
# 6. ✓ Image built + tagged (sha-3303878, deploy-20260424-091500, latest)
# 7. ✓ Container restarted
# 8. ✓ Healthcheck passed (HTTP 200)

# Override gates (only when you must — e.g., emergency hotfix)
npm run promote:force                                  # bypass typecheck/lint
bash scripts/promote.sh --emergency="login broken"     # bypass deploy window

# Lint baseline management
npm run lint:check             # check current vs baseline (scripts/lint-baseline.json)
npm run lint:baseline          # re-snapshot after fixing issues
```

## Rollback

```bash
# Latest snapshot (what promote.sh uses on auto-rollback)
npm run rollback

# Pick a specific snapshot
bash scripts/rollback.sh snapshot-20260423-180000.tar.gz

# See what's available
npm run rollback:list

# Rollback to a specific docker image (bypasses snapshot restore — switches the container only)
ssh root@10.109.0.33 "docker stop bch360 && docker rm bch360 && \
    docker run -d --name bch360 --restart unless-stopped --network host \
        -v /opt/bch360/data_lake:/app/data_lake \
        -v /opt/bch360/logs:/app/logs \
        -v /opt/bch360/.env:/app/.env:ro \
        -e NODE_ENV=production -e PORT=4001 \
        bch360:safe"
```

Rollback is interactive (asks for confirmation) unless called by `promote.sh --auto`.

**Two distinct rollback paths:**

1. **Image rollback** (fast, ~10s): swap the running container to a different image tag (`bch360:safe`, `bch360:sha-<x>`, or `bch360:deploy-<ts>`). No source change, no rebuild. This is what `promote.sh` does on auto-rollback. Use when the new container is broken but you don't want to touch the source on disk.
2. **Source + image rollback** (slow, ~3-5 min): `npm run rollback` extracts a snapshot tarball over `/opt/bch360`, then `docker build` from those files, then runs. Use when source-on-disk has drifted and you need a clean state.

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
| `Blocked by deploy window` | You're inside Mon-Fri 07-11 or Fri ≥15:00 | Wait, OR `bash scripts/promote.sh --emergency="reason"`, OR set `BCH_DEPLOY_SKIP_WINDOW=1` if this isn't a clinical host |
| `Permission denied (publickey)` | Public key not on prod | Re-run `ssh-copy-id` step in setup |
| `Healthcheck FAILED` → image rollback | Container starts but `/healthz` doesn't return 2xx within 60s | Auto-rollback restores `bch360:safe`. Inspect: `ssh root@10.109.0.33 docker logs bch360 --tail 100`. The broken source IS still on prod — clean it up before next promote. |
| `Lint regressed beyond baseline` | New code introduces additional ESLint errors/warnings | Fix the new findings, OR `npm run lint:baseline` to lock in the new count, OR `npm run promote:force` for emergency |
| `Typecheck failed` | TS errors in src | Fix locally; or `npm run promote:force` for emergency only |
| `docker build` errors | Dockerfile or package.json change introduced a build error | Test locally first: `docker build .` (requires Docker Desktop on Windows) |
| Snapshot dir fills up | `BCH_SNAPSHOT_KEEP` too high | Lower in `.env`, or `ssh ... rm /opt/bch360-snapshots/snapshot-*.tar.gz` |
| Image disk fills up | `BCH_IMAGE_KEEP` too high or many manual builds | Lower in `.env`. Manual cleanup: `ssh ... docker image prune -a --filter 'label=bch360.deployed-at'`. **Never** `docker rmi bch360:safe`. |
| `bch360:safe` missing | Brand-new host or someone deleted it | Next `npm run promote` will adopt the running image. To force: `ssh ... docker tag bch360:latest bch360:safe`. |
| `safe` never rotates | Cron not installed; or container restarting <1h | Run `npm run promote:safe-rotate:install`. Tail logs: `ssh ... tail -f /var/log/bch360-safe-rotate.log`. |

## See also

- [deploy.md](./deploy.md) — older PM2-based runbook (superseded by this doc, kept for historical reference)
- [scripts/promote.sh](../../scripts/promote.sh) — implementation
- [scripts/rollback.sh](../../scripts/rollback.sh) — implementation
