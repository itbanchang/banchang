#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Local Dev -> Production Promotion
#
# Flow:
#   1. Pre-flight gates (git clean, typecheck, lint, build)
#   2. Snapshot current prod -> /opt/bch360-snapshots/snapshot-<ts>.tar.gz
#   3. Tar local source, scp, extract over /opt/bch360 (additive)
#   4. docker compose build && docker compose up -d
#   5. Healthcheck https://<host>/healthz
#   6. On healthcheck fail -> auto rollback to the snapshot just taken
#
# Usage:
#   bash scripts/promote.sh              # full promotion (recommended)
#   bash scripts/promote.sh --force      # skip git/typecheck/lint gates
#   bash scripts/promote.sh --skip-build # reuse existing dist/
#   bash scripts/promote.sh --dry-run    # show what would happen, do nothing remote
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

# ── Args ──
FORCE=0
SKIP_BUILD=0
DRY_RUN=0
for arg in "$@"; do
    case "$arg" in
        --force)      FORCE=1 ;;
        --skip-build) SKIP_BUILD=1 ;;
        --dry-run)    DRY_RUN=1 ;;
        --help|-h)
            sed -n '2,30p' "$0"
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
ssh_exec() { ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "$@" 2>&1 | grep -v '^\*\*' || true; }
scp_send() { scp "${SSH_OPTS[@]}" "$@"; }

# ── Banner ──
header "BCH 360 Promote — Local Dev -> $BCH_PROD_HOST"
[ $DRY_RUN -eq 1 ] && warn "DRY RUN — no remote changes will be made"
[ $FORCE   -eq 1 ] && warn "FORCE — pre-flight gates skipped"

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

# ── Gate 2: typecheck ──
if [ $FORCE -eq 0 ]; then
    log "Gate 2/4 — TypeScript typecheck"
    if npm run typecheck --silent > /tmp/bch-typecheck.log 2>&1; then
        ok "Typecheck passed"
    else
        tail -20 /tmp/bch-typecheck.log
        fail "Typecheck failed (see /tmp/bch-typecheck.log). Use --force to override."
    fi
fi

# ── Gate 3: lint ──
if [ $FORCE -eq 0 ]; then
    log "Gate 3/4 — ESLint"
    if npm run lint --silent > /tmp/bch-lint.log 2>&1; then
        ok "Lint passed"
    else
        tail -20 /tmp/bch-lint.log
        fail "Lint failed (see /tmp/bch-lint.log). Use --force to override."
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
    ssh_exec "mkdir -p '$BCH_SNAPSHOT_DIR' && \
        cd '$BCH_PROD_PATH' && \
        tar --warning=no-file-changed \
            --exclude=node_modules --exclude=dist --exclude=data_lake \
            --exclude=logs --exclude=tmp --exclude='*.log' \
            -czf '$SNAPSHOT_PATH' . 2>/dev/null || true"
    SIZE=$(ssh_exec "ls -lh '$SNAPSHOT_PATH' | awk '{print \$5}'" | head -1)
    [ -z "$SIZE" ] && fail "Snapshot creation failed"
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
header "Docker build & restart"
if [ $DRY_RUN -eq 0 ]; then
    log "docker compose build..."
    BUILD_OUT=$(ssh_exec "cd '$BCH_PROD_PATH' && docker compose build 2>&1 | tail -5")
    echo "$BUILD_OUT" | sed 's/^/    /'

    log "docker compose up -d..."
    ssh_exec "cd '$BCH_PROD_PATH' && docker compose up -d 2>&1 | tail -5" | sed 's/^/    /'
    ok "Container restarted"
else
    warn "[dry-run] would docker compose build && up -d"
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
    else
        warn "Healthcheck FAILED (HTTP $STATUS) — auto-rolling back to $SNAPSHOT_NAME"
        bash "$SCRIPT_DIR/rollback.sh" --auto || true
        fail "Promotion aborted; rolled back to previous version."
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
