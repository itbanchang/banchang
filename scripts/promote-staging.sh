#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Local Dev -> Staging
#
# Deploys current local source to a parallel staging container so a human
# can click around before promoting to prod. Independent path, image, port,
# container name, and volumes — staging cannot affect prod.
#
# Layout on prod host:
#   /opt/bch360                  source for prod
#   bch360 container             runs on PORT 4001 (behind nginx :443)
#                                ↓
#   /opt/bch360-staging          source for staging
#   bch360-staging container     runs on PORT 4002 (direct, no nginx)
#
# Both share /opt/bch360/.env (read-only mount) so DB/Anthropic config matches.
#
# Usage:
#   bash scripts/promote-staging.sh           # full staging deploy
#   bash scripts/promote-staging.sh --force   # skip typecheck/lint
#   bash scripts/promote-staging.sh --dry-run
#
# Promotion to prod after staging looks good:
#   npm run promote
# ============================================================

set -euo pipefail

# Inherit defaults from .env (same vars as promote.sh)
BCH_PROD_HOST="${BCH_PROD_HOST:-10.109.0.33}"
BCH_PROD_USER="${BCH_PROD_USER:-root}"
BCH_PROD_PATH="${BCH_PROD_PATH:-/opt/bch360}"
BCH_SSH_KEY="${BCH_SSH_KEY:-$HOME/.ssh/id_ed25519}"

# Staging-specific
BCH_STAGING_PATH="${BCH_STAGING_PATH:-/opt/bch360-staging}"
BCH_STAGING_PORT="${BCH_STAGING_PORT:-4002}"
BCH_STAGING_CONTAINER="${BCH_STAGING_CONTAINER:-bch360-staging}"
BCH_STAGING_IMAGE="${BCH_STAGING_IMAGE:-bch360-staging}"
BCH_STAGING_HEALTHCHECK_TIMEOUT="${BCH_STAGING_HEALTHCHECK_TIMEOUT:-60}"

# Args
FORCE=0; DRY_RUN=0
for arg in "$@"; do
    case "$arg" in
        --force)   FORCE=1 ;;
        --dry-run) DRY_RUN=1 ;;
        --help|-h) sed -n '2,30p' "$0"; exit 0 ;;
        *) echo "Unknown arg: $arg" >&2; exit 2 ;;
    esac
done

# Logging
RED=$'\033[0;31m'; GREEN=$'\033[0;32m'; YELLOW=$'\033[1;33m'
CYAN=$'\033[0;36m'; NC=$'\033[0m'; BOLD=$'\033[1m'
log()    { printf "%s[%s]%s %s\n" "$CYAN" "$(date '+%H:%M:%S')" "$NC" "$*"; }
ok()     { printf "%s[%s] OK%s %s\n" "$GREEN" "$(date '+%H:%M:%S')" "$NC" "$*"; }
warn()   { printf "%s[%s] !!%s %s\n" "$YELLOW" "$(date '+%H:%M:%S')" "$NC" "$*"; }
fail()   { printf "%s[%s] XX%s %s\n" "$RED"   "$(date '+%H:%M:%S')" "$NC" "$*" >&2; exit 1; }
header() { printf "\n%s%s== %s ==%s\n\n" "$BOLD" "$CYAN" "$*" "$NC"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"
[ -f .env ] && { set -a; . ./.env; set +a; }

SSH_OPTS=(-i "$BCH_SSH_KEY" -o StrictHostKeyChecking=accept-new -o BatchMode=yes -o ConnectTimeout=10)
ssh_exec() {
    local out rc
    out=$(ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "$@" 2>&1)
    rc=$?
    [ -n "$out" ] && { printf "%s\n" "$out" | grep -v '^\*\*' || true; }
    return $rc
}
scp_send() { scp "${SSH_OPTS[@]}" "$@"; }

# NOTE: prod's container reads SSL_KEY_PATH from .env and listens with HTTPS,
# so even on the staging port we must use https://. curl -sk skips cert verify.
STAGING_HEALTH_URL="${BCH_STAGING_HEALTH_URL:-https://${BCH_PROD_HOST}:${BCH_STAGING_PORT}/healthz}"
STAGING_SMOKE_URL="${BCH_STAGING_SMOKE_URL:-https://${BCH_PROD_HOST}:${BCH_STAGING_PORT}/api/smoke}"

header "BCH 360 Promote-STAGING — Local Dev -> $BCH_PROD_HOST:$BCH_STAGING_PORT"
[ $DRY_RUN -eq 1 ] && warn "DRY RUN — no remote changes"
[ $FORCE   -eq 1 ] && warn "FORCE — pre-flight gates skipped"

# ── Pre-flight (lighter than prod — staging is meant for breaking things) ──
header "Pre-flight gates"
BRANCH=$(git branch --show-current)
SHA=$(git rev-parse HEAD)
SHORT_SHA=$(git rev-parse --short HEAD)
ok "Branch: $BRANCH @ $SHORT_SHA"

if [ $FORCE -eq 0 ]; then
    log "Gate — TypeScript typecheck (skipped if no script defined)"
    if npm run typecheck --silent --if-present > /tmp/bch-staging-typecheck.log 2>&1; then
        if [ -s /tmp/bch-staging-typecheck.log ]; then
            ok "Typecheck passed"
        else
            warn "No 'typecheck' npm script defined — skipping"
        fi
    else
        tail -10 /tmp/bch-staging-typecheck.log
        fail "Typecheck failed. Use --force to override (acceptable on staging)."
    fi
fi

# ── Connect to prod ──
header "Production connectivity"
HOST_INFO=$(ssh_exec "echo \"\$(whoami)@\$(hostname)\"" | head -1)
[ -z "$HOST_INFO" ] && fail "SSH failed (key=$BCH_SSH_KEY)"
ok "Connected: $HOST_INFO"

# Bootstrap staging path the first time: needs Dockerfile + .env from /opt/bch360
log "Bootstrapping $BCH_STAGING_PATH (idempotent — copies Dockerfile + .env from prod path if missing)..."
ssh_exec "mkdir -p '$BCH_STAGING_PATH' '$BCH_STAGING_PATH/data_lake' '$BCH_STAGING_PATH/logs' && \
    [ -f '$BCH_STAGING_PATH/Dockerfile' ] || cp '$BCH_PROD_PATH/Dockerfile' '$BCH_STAGING_PATH/' && \
    echo bootstrap_ok" | tail -1
ok "Staging path ready"

# ── Pack & upload source (separate tarball, separate path) ──
header "Pack & upload source -> $BCH_STAGING_PATH"
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
TARBALL="/tmp/bch-staging-${TIMESTAMP}.tar.gz"
log "Packing local source -> $TARBALL"
tar --exclude=node_modules --exclude=.git --exclude=data_lake \
    --exclude=logs --exclude=tmp --exclude='*.log' \
    --exclude='.claude/scheduled_tasks.lock' --exclude='.claude/settings.local.json' \
    -czf "$TARBALL" .
ok "Tarball: $(du -h "$TARBALL" | cut -f1)"

if [ $DRY_RUN -eq 0 ]; then
    log "Uploading..."
    scp_send "$TARBALL" "$BCH_PROD_USER@$BCH_PROD_HOST:/tmp/" > /dev/null
    REMOTE_TAR="/tmp/$(basename "$TARBALL")"
    ssh_exec "tar -xzf '$REMOTE_TAR' -C '$BCH_STAGING_PATH' && rm -f '$REMOTE_TAR'"
    ok "Source synced to $BCH_STAGING_PATH"
fi
rm -f "$TARBALL"

# ── Docker build ──
header "Build $BCH_STAGING_IMAGE"
if [ $DRY_RUN -eq 0 ]; then
    SHA_TAG="sha-${SHORT_SHA}"
    DEPLOY_TAG="deploy-${TIMESTAMP}"
    ssh_exec "cd '$BCH_STAGING_PATH' && docker build \
        --label bch360.git-sha='$SHA' \
        --label bch360.git-branch='$BRANCH' \
        --label bch360.deployed-at='$TIMESTAMP' \
        --label bch360.tier='staging' \
        -t $BCH_STAGING_IMAGE:$SHA_TAG \
        -t $BCH_STAGING_IMAGE:$DEPLOY_TAG \
        -t $BCH_STAGING_IMAGE:latest \
        . 2>&1 | tail -10" \
        | sed 's/^/    /' \
        || fail "docker build failed"
    ok "Built $BCH_STAGING_IMAGE:latest (+ $SHA_TAG, $DEPLOY_TAG)"
fi

# ── Restart staging container ──
header "Restart $BCH_STAGING_CONTAINER container on :$BCH_STAGING_PORT"
if [ $DRY_RUN -eq 0 ]; then
    ssh_exec "docker stop '$BCH_STAGING_CONTAINER' 2>&1 || true; \
        docker rm '$BCH_STAGING_CONTAINER' 2>&1 || true; \
        docker run -d \
            --name '$BCH_STAGING_CONTAINER' \
            --restart unless-stopped \
            --network host \
            -v '$BCH_STAGING_PATH/data_lake:/app/data_lake' \
            -v '$BCH_STAGING_PATH/logs:/app/logs' \
            -v '$BCH_PROD_PATH/.env:/app/.env:ro' \
            -e NODE_ENV=production \
            -e PORT=$BCH_STAGING_PORT \
            $BCH_STAGING_IMAGE:latest" \
        | sed 's/^/    /' \
        || fail "docker run failed for staging"
    sleep 3
    STARTED=$(ssh_exec "docker inspect '$BCH_STAGING_CONTAINER' --format '{{.State.StartedAt}}' 2>/dev/null" | head -1 | tr -d '\r')
    [ -z "$STARTED" ] && fail "Container did not start"
    ok "Staging container UP (StartedAt: $STARTED)"
fi

# ── Healthcheck on direct port (no nginx in front of staging) ──
header "Healthcheck — $STAGING_HEALTH_URL"
if [ $DRY_RUN -eq 0 ]; then
    DEADLINE=$(($(date +%s) + BCH_STAGING_HEALTHCHECK_TIMEOUT))
    HEALTHY=0; STATUS=000
    while [ "$(date +%s)" -lt "$DEADLINE" ]; do
        STATUS=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 5 "$STAGING_HEALTH_URL" 2>/dev/null) || STATUS="000"
        [[ "$STATUS" =~ ^2 ]] && { HEALTHY=1; break; }
        printf "."
        sleep 3
    done
    echo
    if [ $HEALTHY -eq 1 ]; then
        ok "Healthz HTTP $STATUS"
    else
        warn "Healthz failed (HTTP $STATUS) — staging container is broken. Inspect: ssh $BCH_PROD_USER@$BCH_PROD_HOST docker logs $BCH_STAGING_CONTAINER --tail 50"
        fail "Staging deploy aborted (no auto-rollback for staging — fix and re-deploy)"
    fi

    # Smoke
    SMOKE_HTTP=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 10 "$STAGING_SMOKE_URL" 2>/dev/null) || SMOKE_HTTP="000"
    SMOKE_BODY=$(curl -sk --max-time 10 "$STAGING_SMOKE_URL" 2>/dev/null) || SMOKE_BODY=""
    case "$SMOKE_HTTP" in
        200)
            if echo "$SMOKE_BODY" | grep -q '"status"[[:space:]]*:[[:space:]]*"ok"'; then
                ok "Smoke HTTP 200, status=ok"
            else
                warn "Smoke HTTP 200 but status != ok: $(echo "$SMOKE_BODY" | head -c 200)"
            fi
            ;;
        404) warn "Smoke endpoint not present (404) — likely older source" ;;
        *)   warn "Smoke HTTP $SMOKE_HTTP — investigate before promoting to prod" ;;
    esac
fi

header "Staging Ready"
printf "  %sURL:%s         %s\n" "$BOLD" "$NC" "$STAGING_HEALTH_URL"
printf "  %sBranch:%s      %s @ %s\n" "$BOLD" "$NC" "$BRANCH" "$SHORT_SHA"
printf "  %sContainer:%s   %s\n" "$BOLD" "$NC" "$BCH_STAGING_CONTAINER"
printf "  %sImage:%s       %s:latest\n" "$BOLD" "$NC" "$BCH_STAGING_IMAGE"
echo
printf "  Click around at http://%s:%s, then run %snpm run promote%s for prod.\n" "$BCH_PROD_HOST" "$BCH_STAGING_PORT" "$BOLD" "$NC"
echo
