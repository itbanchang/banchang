#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Local Dev -> Production Promotion
#
# Flow:
#   0. Deploy-window guard (block weekday morning rounds + Friday afternoons
#      unless --emergency or BCH_DEPLOY_SKIP_WINDOW=1)
#   1. Pre-flight gates (git clean, typecheck, lint, build)
#   2. Snapshot current /opt/bch360 source -> snapshot-<ts>.tar.gz
#   3. Tar local source, scp, extract over /opt/bch360 (additive)
#   4. docker build (tags: bch360:sha-<short> + bch360:deploy-<ts> + :latest)
#   5. Stop old container, run new one
#   6. Healthcheck https://<host>/healthz
#   7. On healthcheck fail -> restore bch360:safe (immutable last-known-good
#      image, rotated by scripts/promote-safe-rotate.sh after 1h healthy uptime)
#
# Image tag scheme on prod (10.109.0.33):
#   bch360:sha-<short>          immutable, one per git SHA  (kept N newest)
#   bch360:deploy-<YYYYMMDD-HHMM>  immutable, one per deploy  (kept N newest)
#   bch360:latest               points to most recent deploy
#   bch360:safe                 last-known-good, NEVER overwritten by promote
#
# Usage:
#   bash scripts/promote.sh                 # full promotion (recommended)
#   bash scripts/promote.sh --force         # skip typecheck/lint gates
#   bash scripts/promote.sh --skip-build    # reuse existing dist/
#   bash scripts/promote.sh --dry-run       # show what would happen, no changes
#   bash scripts/promote.sh --emergency="hotfix login"   # bypass window guard
#
# Config (set in .env or env vars):
#   BCH_PROD_HOST            (default 10.109.0.33)
#   BCH_PROD_USER            (default root)
#   BCH_PROD_PATH            (default /opt/bch360)
#   BCH_SSH_KEY              (default ~/.ssh/id_ed25519)
#   BCH_HEALTHCHECK_URL      (default https://<host>/healthz)
#   BCH_HEALTHCHECK_TIMEOUT  (default 60 seconds)
#   BCH_SNAPSHOT_DIR         (default /opt/bch360-snapshots)
#   BCH_SNAPSHOT_KEEP        (default 5)
#   BCH_IMAGE_KEEP           (default 10) — newest sha-/deploy- tags to keep
#   BCH_BLOCK_HOURS_WEEKDAY  (default 07-11) — Mon-Fri block window
#   BCH_BLOCK_FRIDAY_AFTER   (default 15)    — Friday afternoon block hour
#   BCH_DEPLOY_SKIP_WINDOW   (default 0)     — set to 1 in .env for non-clinical hosts
# ============================================================

set -euo pipefail

# ── Defaults (override via .env) ──
BCH_PROD_HOST="${BCH_PROD_HOST:-10.109.0.33}"
BCH_PROD_USER="${BCH_PROD_USER:-root}"
BCH_PROD_PATH="${BCH_PROD_PATH:-/opt/bch360}"
BCH_SSH_KEY="${BCH_SSH_KEY:-$HOME/.ssh/id_ed25519}"
BCH_HEALTHCHECK_URL="${BCH_HEALTHCHECK_URL:-}"
BCH_HEALTHCHECK_TIMEOUT="${BCH_HEALTHCHECK_TIMEOUT:-60}"
BCH_SNAPSHOT_DIR="${BCH_SNAPSHOT_DIR:-/opt/bch360-snapshots}"
BCH_SNAPSHOT_KEEP="${BCH_SNAPSHOT_KEEP:-5}"
BCH_IMAGE_KEEP="${BCH_IMAGE_KEEP:-10}"
# Working-hours guard: deploys are blocked during these windows by default.
# Override with --emergency. Times in 24h format; days are Mon=1..Sun=7 (date %u).
BCH_BLOCK_HOURS_WEEKDAY="${BCH_BLOCK_HOURS_WEEKDAY:-07-11}" # Mon-Fri morning rounds
BCH_BLOCK_FRIDAY_AFTER="${BCH_BLOCK_FRIDAY_AFTER:-15}"     # Fri 15:00 onwards
# Bypass the guard entirely (for non-clinical hosts); set to 1 in .env to disable
BCH_DEPLOY_SKIP_WINDOW="${BCH_DEPLOY_SKIP_WINDOW:-0}"

# ── Args ──
FORCE=0
SKIP_BUILD=0
DRY_RUN=0
EMERGENCY=0
EMERGENCY_REASON=""
for arg in "$@"; do
    case "$arg" in
        --force)        FORCE=1 ;;
        --skip-build)   SKIP_BUILD=1 ;;
        --dry-run)      DRY_RUN=1 ;;
        --emergency=*)  EMERGENCY=1; EMERGENCY_REASON="${arg#--emergency=}" ;;
        --emergency)    EMERGENCY=1; EMERGENCY_REASON="(no reason given)" ;;
        --help|-h)
            sed -n '2,40p' "$0"
            exit 0
            ;;
        *) echo "Unknown arg: $arg (use --help)" >&2; exit 2 ;;
    esac
done

# ── Logging ──
RED=$'\033[0;31m'; GREEN=$'\033[0;32m'; YELLOW=$'\033[1;33m'
CYAN=$'\033[0;36m'; NC=$'\033[0m'; BOLD=$'\033[1m'
log()    { printf "%s[%s]%s %s\n" "$CYAN" "$(date '+%H:%M:%S')" "$NC" "$*"; }
ok()     { printf "%s[%s] OK%s %s\n" "$GREEN" "$(date '+%H:%M:%S')" "$NC" "$*"; }
warn()   { printf "%s[%s] !!%s %s\n" "$YELLOW" "$(date '+%H:%M:%S')" "$NC" "$*"; }
fail()   { printf "%s[%s] XX%s %s\n" "$RED"   "$(date '+%H:%M:%S')" "$NC" "$*" >&2; exit 1; }
header() { printf "\n%s%s== %s ==%s\n\n" "$BOLD" "$CYAN" "$*" "$NC"; }

# ── Project root ──
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# ── Load .env (so user overrides apply) ──
if [ -f .env ]; then
    set -a; . ./.env; set +a
fi

BCH_HEALTHCHECK_URL="${BCH_HEALTHCHECK_URL:-https://${BCH_PROD_HOST}/healthz}"

# ── SSH helpers ──
SSH_OPTS=(-i "$BCH_SSH_KEY" -o StrictHostKeyChecking=accept-new -o BatchMode=yes -o ConnectTimeout=10)
# ssh_exec: runs remote cmd, filters OpenSSH PQ-warning lines, propagates ssh exit code.
# Use this for every remote command — relying on `set -e` is unsafe because pipes mask exit codes.
ssh_exec() {
    local out rc
    out=$(ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "$@" 2>&1)
    rc=$?
    # Print non-warning lines if any. `|| true` is required: when the entire output
    # is OpenSSH PQ warnings (very common), grep returns 1 and `set -e` would kill us.
    [ -n "$out" ] && { printf "%s\n" "$out" | grep -v '^\*\*' || true; }
    return $rc
}
scp_send() { scp "${SSH_OPTS[@]}" "$@"; }

# Detect docker compose CLI (v2 plugin "docker compose" vs v1 standalone "docker-compose")
detect_compose_cmd() {
    if ssh_exec "docker compose version >/dev/null 2>&1"; then
        echo "docker compose"
    elif ssh_exec "command -v docker-compose >/dev/null 2>&1"; then
        echo "docker-compose"
    else
        echo ""
    fi
}

# Guard: refuse to deploy during clinical hours unless --emergency.
# Uses local clock; assumes the developer is in the same timezone as the hospital.
check_deploy_window() {
    [ "$BCH_DEPLOY_SKIP_WINDOW" = "1" ] && return 0
    local dow hour reason=""
    dow=$(date +%u)   # 1=Mon ... 7=Sun
    hour=$(date +%H)  # zero-padded 00-23
    hour=$((10#$hour)) # strip zero-pad before arithmetic
    local block_start block_end
    block_start=${BCH_BLOCK_HOURS_WEEKDAY%-*}
    block_end=${BCH_BLOCK_HOURS_WEEKDAY#*-}
    if [ "$dow" -le 5 ] && [ "$hour" -ge "$block_start" ] && [ "$hour" -lt "$block_end" ]; then
        reason="weekday morning rounds (${BCH_BLOCK_HOURS_WEEKDAY})"
    elif [ "$dow" -eq 5 ] && [ "$hour" -ge "$BCH_BLOCK_FRIDAY_AFTER" ]; then
        reason="Friday afternoon (>=${BCH_BLOCK_FRIDAY_AFTER}:00) — too close to weekend on-call gap"
    fi
    if [ -n "$reason" ]; then
        if [ $EMERGENCY -eq 1 ]; then
            warn "EMERGENCY override: deploying during $reason"
            warn "Reason: $EMERGENCY_REASON"
        else
            fail "Blocked by deploy window: $reason. Use --emergency=\"reason\" to override, or set BCH_DEPLOY_SKIP_WINDOW=1 in .env to disable this guard."
        fi
    fi
}

# ── Banner ──
header "BCH 360 Promote — Local Dev -> $BCH_PROD_HOST"
[ $DRY_RUN   -eq 1 ] && warn "DRY RUN — no remote changes will be made"
[ $FORCE     -eq 1 ] && warn "FORCE — pre-flight gates skipped"
[ $EMERGENCY -eq 1 ] && warn "EMERGENCY — deploy window guard bypassed: $EMERGENCY_REASON"

# ── Gate 0: deploy window ──
check_deploy_window

# ── Gate 1: git status ──
header "Pre-flight gates"

if [ $FORCE -eq 0 ]; then
    log "Gate 1/4 — git working tree clean"
    DIRTY=$(git status --porcelain | grep -v '^?? \.claude/' | grep -v '\.claude/settings.local.json' || true)
    if [ -n "$DIRTY" ]; then
        echo "$DIRTY"
        fail "Uncommitted changes (excluding .claude/ session state). Commit or use --force."
    fi
fi
BRANCH=$(git branch --show-current)
SHA=$(git rev-parse HEAD)
SHORT_SHA=$(git rev-parse --short HEAD)
ok "Branch: $BRANCH @ $SHORT_SHA"

# ── Gate 2: typecheck (skipped automatically if no `typecheck` npm script) ──
if [ $FORCE -eq 0 ]; then
    log "Gate 2/4 — TypeScript typecheck"
    # `npm run typecheck --if-present` exits 0 silently if the script doesn't exist.
    # When it DOES run and FAILS, exit code is non-zero and we capture the log.
    if npm run typecheck --silent --if-present > /tmp/bch-typecheck.log 2>&1; then
        if [ -s /tmp/bch-typecheck.log ]; then
            ok "Typecheck passed"
        else
            warn "No 'typecheck' npm script defined — skipping (add one if you adopt TypeScript)"
        fi
    else
        tail -20 /tmp/bch-typecheck.log
        fail "Typecheck failed (see /tmp/bch-typecheck.log). Use --force to override."
    fi
fi

# ── Gate 3: lint baseline ──
# We compare against scripts/lint-baseline.json instead of using a hard
# --max-warnings count. Master ships with 50 errors / 239 warnings as of
# 2026-04-24; the baseline gate accepts <= those counts and fails on regression.
if [ $FORCE -eq 0 ]; then
    log "Gate 3/4 — ESLint baseline (scripts/lint-baseline.json)"
    if bash "$SCRIPT_DIR/lint-check.sh" --quiet > /tmp/bch-lint.log 2>&1; then
        cat /tmp/bch-lint.log | tail -3
        ok "Lint within baseline"
    else
        cat /tmp/bch-lint.log | tail -20
        fail "Lint regressed beyond baseline. Fix new findings, or re-snapshot with 'bash scripts/lint-check.sh --update' if intentional. Use --force to override."
    fi
fi

# ── Gate 4: build ──
if [ $SKIP_BUILD -eq 0 ]; then
    log "Gate 4/4 — Vite production build"
    if npm run build > /tmp/bch-build.log 2>&1; then
        DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1 || echo "?")
        ok "Build complete (dist: $DIST_SIZE)"
    else
        tail -30 /tmp/bch-build.log
        fail "Build failed (see /tmp/bch-build.log)"
    fi
else
    warn "Skipping build (--skip-build)"
fi

# ── Connect to prod ──
header "Production connectivity"
HOST_INFO=$(ssh_exec "echo \"\$(whoami)@\$(hostname)\"" | head -1)
[ -z "$HOST_INFO" ] && fail "SSH failed (key=$BCH_SSH_KEY user=$BCH_PROD_USER host=$BCH_PROD_HOST)"
ok "Connected: $HOST_INFO"

# Ensure prod path exists
ssh_exec "[ -d '$BCH_PROD_PATH' ] || { echo 'PROD_PATH_MISSING'; exit 1; }" | grep -q PROD_PATH_MISSING && \
    fail "$BCH_PROD_PATH does not exist on $BCH_PROD_HOST"

# ── Snapshot ──
header "Pre-deploy snapshot"
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
SNAPSHOT_NAME="snapshot-${TIMESTAMP}.tar.gz"
SNAPSHOT_PATH="$BCH_SNAPSHOT_DIR/$SNAPSHOT_NAME"

if [ $DRY_RUN -eq 0 ]; then
    log "Creating $SNAPSHOT_NAME on prod (excludes node_modules, dist, data_lake, logs, tmp)..."
    # tar --warning=no-file-changed swallows the only benign warning we expect; treat
    # exit code 1 (file-changed-during-read) as soft success but anything else hard-fail.
    ssh_exec "mkdir -p '$BCH_SNAPSHOT_DIR' && \
        cd '$BCH_PROD_PATH' && \
        tar --warning=no-file-changed \
            --exclude=node_modules --exclude=dist --exclude=data_lake \
            --exclude=logs --exclude=tmp --exclude='*.log' \
            -czf '$SNAPSHOT_PATH' . ; rc=\$?; [ \$rc -eq 0 ] || [ \$rc -eq 1 ] || exit \$rc" \
        || fail "Snapshot tar failed on prod"
    SIZE=$(ssh_exec "ls -lh '$SNAPSHOT_PATH' | awk '{print \$5}'" | head -1)
    [ -z "$SIZE" ] && fail "Snapshot creation failed (file not present after tar)"
    ok "Snapshot created: $SNAPSHOT_PATH ($SIZE)"

    # Record for rollback
    ssh_exec "echo '$SNAPSHOT_NAME' > '$BCH_PROD_PATH/.last-snapshot' && \
              echo '$SHA' > '$BCH_PROD_PATH/.deployed-sha' && \
              echo '$BRANCH' > '$BCH_PROD_PATH/.deployed-branch'"

    # Prune old snapshots
    log "Pruning snapshots (keep $BCH_SNAPSHOT_KEEP newest)..."
    ssh_exec "ls -1t '$BCH_SNAPSHOT_DIR'/snapshot-*.tar.gz 2>/dev/null | tail -n +$((BCH_SNAPSHOT_KEEP+1)) | xargs -r rm -f"
    KEPT=$(ssh_exec "ls -1 '$BCH_SNAPSHOT_DIR'/snapshot-*.tar.gz 2>/dev/null | wc -l" | head -1)
    ok "Kept $KEPT snapshot(s)"
else
    warn "[dry-run] would create snapshot $SNAPSHOT_NAME"
fi

# ── Pack source ──
header "Pack & upload source"
TARBALL="/tmp/bch-promote-${TIMESTAMP}.tar.gz"
log "Packing local source -> $TARBALL"
tar --exclude=node_modules --exclude=.git --exclude=data_lake \
    --exclude=logs --exclude=tmp --exclude='*.log' \
    --exclude='.claude/scheduled_tasks.lock' --exclude='.claude/settings.local.json' \
    --exclude='dist/.deploy-info.json' \
    -czf "$TARBALL" .
LOCAL_SIZE=$(du -h "$TARBALL" | cut -f1)
ok "Tarball: $LOCAL_SIZE"

if [ $DRY_RUN -eq 0 ]; then
    log "Uploading to $BCH_PROD_USER@$BCH_PROD_HOST:/tmp/"
    scp_send "$TARBALL" "$BCH_PROD_USER@$BCH_PROD_HOST:/tmp/" > /dev/null
    ok "Upload complete"

    log "Extracting on prod (additive over $BCH_PROD_PATH)..."
    REMOTE_TAR="/tmp/$(basename "$TARBALL")"
    ssh_exec "tar -xzf '$REMOTE_TAR' -C '$BCH_PROD_PATH' && rm -f '$REMOTE_TAR'"
    ok "Source synced"
else
    warn "[dry-run] would scp $TARBALL and extract to $BCH_PROD_PATH"
fi
rm -f "$TARBALL"

# ── Docker rebuild + restart ──
# Uses raw `docker` — the compose file on prod targets v3 schema but prod's
# docker-compose is v1.17 (2017) which can't parse network_mode/healthcheck.
#
# Tag scheme:
#   bch360:sha-<short>          immutable, one per git SHA
#   bch360:deploy-<YYYYMMDD-HHMM>  immutable, one per deploy
#   bch360:latest               mutable, points to most recent deploy
#   bch360:safe                 NEVER overwritten by promote — rotated by
#                               scripts/promote-safe-rotate.sh after 1h healthy uptime
header "Docker build & restart"
DEPLOY_TAG="deploy-${TIMESTAMP}"
SHA_TAG="sha-${SHORT_SHA}"
if [ $DRY_RUN -eq 0 ]; then
    BEFORE_START=$(ssh_exec "docker inspect bch360 --format '{{.State.StartedAt}}' 2>/dev/null" | head -1 | tr -d '\r')
    BEFORE_IMAGE=$(ssh_exec "docker inspect bch360 --format '{{.Image}}' 2>/dev/null" | head -1 | tr -d '\r')

    # Check that bch360:safe exists — auto-rollback target. If missing on first run,
    # adopt the currently running image as :safe so we always have a fallback.
    SAFE_EXISTS=$(ssh_exec "docker image inspect bch360:safe >/dev/null 2>&1 && echo YES || echo NO" | head -1 | tr -d '\r')
    if [ "$SAFE_EXISTS" != "YES" ]; then
        if [ -n "$BEFORE_IMAGE" ]; then
            warn "bch360:safe missing — adopting current running image as initial :safe baseline"
            ssh_exec "docker tag '$BEFORE_IMAGE' bch360:safe" \
                || fail "Failed to seed bch360:safe from running container"
            ok "Seeded bch360:safe = $BEFORE_IMAGE"
        else
            warn "bch360:safe missing AND no running container — cannot auto-rollback. Continue at your own risk."
        fi
    fi

    log "docker build (this is the slow step — npm install + Vite build)..."
    ssh_exec "cd '$BCH_PROD_PATH' && docker build \
        --label bch360.git-sha='$SHA' \
        --label bch360.git-branch='$BRANCH' \
        --label bch360.deployed-at='$TIMESTAMP' \
        --label bch360.deployed-by='$(whoami)@$(hostname)' \
        -t bch360:$SHA_TAG \
        -t bch360:$DEPLOY_TAG \
        -t bch360:latest \
        . 2>&1 | tail -10" \
        | sed 's/^/    /' \
        || fail "docker build failed"

    AFTER_IMAGE=$(ssh_exec "docker inspect bch360:latest --format '{{.Id}}' 2>/dev/null" | head -1 | tr -d '\r')
    if [ -n "$BEFORE_IMAGE" ] && [ "$BEFORE_IMAGE" = "$AFTER_IMAGE" ]; then
        warn "Image SHA unchanged after build — Dockerfile/source did not change"
    else
        ok "New image built: $AFTER_IMAGE"
        ok "Tagged: bch360:latest, bch360:$SHA_TAG, bch360:$DEPLOY_TAG"
    fi

    log "Stopping old container..."
    ssh_exec "docker stop bch360 2>&1 || true; docker rm bch360 2>&1 || true" \
        | sed 's/^/    /' || true

    log "Starting new container (host network + .env + data_lake/logs volumes)..."
    ssh_exec "docker run -d \
        --name bch360 \
        --restart unless-stopped \
        --network host \
        -v '$BCH_PROD_PATH/data_lake:/app/data_lake' \
        -v '$BCH_PROD_PATH/logs:/app/logs' \
        -v '$BCH_PROD_PATH/.env:/app/.env:ro' \
        -e NODE_ENV=production \
        -e PORT=4001 \
        bch360:latest" \
        | sed 's/^/    /' \
        || fail "docker run failed"

    sleep 2
    AFTER_START=$(ssh_exec "docker inspect bch360 --format '{{.State.StartedAt}}' 2>/dev/null" | head -1 | tr -d '\r')
    if [ -z "$AFTER_START" ]; then
        fail "Container is not running after \`docker run\`"
    fi
    ok "Container started (StartedAt: $AFTER_START)"

    # Prune older sha-*/deploy-* tags, keep N newest by image creation time
    log "Pruning old image tags (keep $BCH_IMAGE_KEEP newest, never bch360:safe)..."
    ssh_exec "docker images bch360 --format '{{.CreatedAt}} {{.Repository}}:{{.Tag}}' \
        | grep -E '(bch360:sha-|bch360:deploy-)' \
        | sort -r | tail -n +$((BCH_IMAGE_KEEP+1)) \
        | awk '{print \$NF}' | xargs -r docker rmi -f 2>&1 | tail -5" \
        | sed 's/^/    /' || true
else
    warn "[dry-run] would docker build + docker stop/rm/run"
fi

# ── Healthcheck ──
header "Healthcheck — $BCH_HEALTHCHECK_URL"
if [ $DRY_RUN -eq 0 ]; then
    log "Polling for up to ${BCH_HEALTHCHECK_TIMEOUT}s..."
    DEADLINE=$(($(date +%s) + BCH_HEALTHCHECK_TIMEOUT))
    HEALTHY=0
    while [ "$(date +%s)" -lt "$DEADLINE" ]; do
        STATUS=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 5 "$BCH_HEALTHCHECK_URL" 2>/dev/null || echo "000")
        if [[ "$STATUS" =~ ^2 ]]; then
            HEALTHY=1
            break
        fi
        printf "."
        sleep 3
    done
    echo

    if [ $HEALTHY -eq 1 ]; then
        ok "Health check passed (HTTP $STATUS)"

        # Functional smoke test — DB ping + sample query + frontend asset.
        # /api/smoke was added in feat/dev-prod-promotion-flow Tier 2; older
        # images return 404. Treat 404 as "endpoint not yet deployed; skip"
        # rather than failing — otherwise this gate would block first-time
        # promotes from images that pre-date the route.
        SMOKE_URL="${BCH_HEALTHCHECK_URL%/*}/api/smoke"
        log "Smoke test (functional) — $SMOKE_URL"
        SMOKE_RESPONSE=$(curl -sk --max-time 10 "$SMOKE_URL" 2>/dev/null) || SMOKE_RESPONSE=""
        SMOKE_HTTP=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 10 "$SMOKE_URL" 2>/dev/null) || SMOKE_HTTP="000"
        case "$SMOKE_HTTP" in
            200)
                # Cheap-and-cheerful JSON parse — looking for "status":"ok"
                if echo "$SMOKE_RESPONSE" | grep -q '"status"[[:space:]]*:[[:space:]]*"ok"'; then
                    ok "Smoke test passed (HTTP 200, status=ok)"
                else
                    warn "Smoke test FAILED (HTTP 200 but status != ok): $(echo "$SMOKE_RESPONSE" | head -c 200)"
                    HEALTHY=0
                fi
                ;;
            404)
                warn "Smoke test endpoint not deployed yet (HTTP 404) — relying on /healthz only this run"
                ;;
            503)
                warn "Smoke test FAILED (HTTP 503): $(echo "$SMOKE_RESPONSE" | head -c 300)"
                HEALTHY=0
                ;;
            *)
                warn "Smoke test inconclusive (HTTP $SMOKE_HTTP) — accepting /healthz result"
                ;;
        esac
    fi
    if [ $HEALTHY -ne 1 ]; then
        warn "Health checks FAILED (healthz=$STATUS smoke=${SMOKE_HTTP:-n/a}) — restoring bch360:safe (last known good image)"
        ssh_exec "docker stop bch360 2>&1 || true; docker rm bch360 2>&1 || true; \
            docker run -d --name bch360 --restart unless-stopped --network host \
                -v '$BCH_PROD_PATH/data_lake:/app/data_lake' \
                -v '$BCH_PROD_PATH/logs:/app/logs' \
                -v '$BCH_PROD_PATH/.env:/app/.env:ro' \
                -e NODE_ENV=production -e PORT=4001 \
                bch360:safe && docker tag bch360:safe bch360:latest" \
            | sed 's/^/    /' || true
        # Re-poll healthcheck to confirm safe image is healthy
        sleep 5
        SAFE_STATUS=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 5 "$BCH_HEALTHCHECK_URL" 2>/dev/null || echo "000")
        if [[ "$SAFE_STATUS" =~ ^2 ]]; then
            warn "Auto-rollback to bch360:safe succeeded (HTTP $SAFE_STATUS). Source on /opt/bch360 is from the FAILED deploy — restore source manually if needed."
        else
            fail "Auto-rollback to bch360:safe failed (HTTP $SAFE_STATUS). MANUAL INTERVENTION REQUIRED. SSH and inspect: docker logs bch360"
        fi
        fail "Promotion aborted; restored bch360:safe."
    fi
else
    warn "[dry-run] would curl $BCH_HEALTHCHECK_URL"
fi

# ── Done ──
header "Promote Complete"
printf "  %sURL:%s        %s\n" "$BOLD" "$NC" "$BCH_HEALTHCHECK_URL"
printf "  %sBranch:%s     %s @ %s\n" "$BOLD" "$NC" "$BRANCH" "$SHORT_SHA"
printf "  %sSnapshot:%s   %s (rollback target)\n" "$BOLD" "$NC" "$SNAPSHOT_NAME"
printf "  %sRollback:%s   npm run rollback\n" "$BOLD" "$NC"
echo
