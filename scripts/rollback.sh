#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Production Rollback
#
# Restores prod from a snapshot under /opt/bch360-snapshots/.
# By default uses /opt/bch360/.last-snapshot (the snapshot taken
# right before the most recent promote).
#
# Usage:
#   bash scripts/rollback.sh                       # interactive, latest snapshot
#   bash scripts/rollback.sh snapshot-XYZ.tar.gz   # explicit snapshot
#   bash scripts/rollback.sh --list                # list available snapshots
#   bash scripts/rollback.sh --auto                # no confirmation (used by promote.sh)
# ============================================================

set -euo pipefail

BCH_PROD_HOST="${BCH_PROD_HOST:-10.109.0.33}"
BCH_PROD_USER="${BCH_PROD_USER:-root}"
BCH_PROD_PATH="${BCH_PROD_PATH:-/opt/bch360}"
BCH_SSH_KEY="${BCH_SSH_KEY:-$HOME/.ssh/id_ed25519}"
BCH_SNAPSHOT_DIR="${BCH_SNAPSHOT_DIR:-/opt/bch360-snapshots}"
BCH_HEALTHCHECK_URL="${BCH_HEALTHCHECK_URL:-}"
BCH_HEALTHCHECK_TIMEOUT="${BCH_HEALTHCHECK_TIMEOUT:-60}"

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

BCH_HEALTHCHECK_URL="${BCH_HEALTHCHECK_URL:-https://${BCH_PROD_HOST}/healthz}"

SSH_OPTS=(-i "$BCH_SSH_KEY" -o StrictHostKeyChecking=accept-new -o BatchMode=yes -o ConnectTimeout=10)
ssh_exec() { ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "$@" 2>&1 | grep -v '^\*\*' || true; }

# Args
TARGET=""
AUTO=0
for arg in "$@"; do
    case "$arg" in
        --auto)  AUTO=1 ;;
        --list)
            header "Snapshots on $BCH_PROD_HOST:$BCH_SNAPSHOT_DIR"
            ssh_exec "ls -lh '$BCH_SNAPSHOT_DIR'/snapshot-*.tar.gz 2>/dev/null || echo '(none)'"
            exit 0
            ;;
        --help|-h) sed -n '2,16p' "$0"; exit 0 ;;
        --*) fail "Unknown flag: $arg" ;;
        *)   TARGET="$arg" ;;
    esac
done

header "BCH 360 Rollback — $BCH_PROD_HOST"

# Resolve target
if [ -z "$TARGET" ]; then
    TARGET=$(ssh_exec "cat '$BCH_PROD_PATH/.last-snapshot' 2>/dev/null || \
        basename \$(ls -1t '$BCH_SNAPSHOT_DIR'/snapshot-*.tar.gz 2>/dev/null | head -1)" | tr -d '\r' | head -1)
fi
[ -z "$TARGET" ] && fail "No snapshot found. Run 'bash scripts/rollback.sh --list' to see options."

SNAPSHOT_PATH="$BCH_SNAPSHOT_DIR/$TARGET"
log "Target snapshot: $TARGET"

# Verify snapshot exists
EXISTS=$(ssh_exec "[ -f '$SNAPSHOT_PATH' ] && echo YES || echo NO" | head -1)
[ "$EXISTS" = "YES" ] || fail "Snapshot not found on prod: $SNAPSHOT_PATH"

# Confirm
if [ $AUTO -eq 0 ]; then
    echo
    printf "Will restore %s%s%s from %s%s%s.\n" "$BOLD" "$BCH_PROD_PATH" "$NC" "$BOLD" "$TARGET" "$NC"
    printf "Container will be rebuilt and restarted.\n"
    echo
    read -r -p "Continue? [y/N]: " ans
    case "$ans" in [yY]|[yY][eE][sS]) ;; *) fail "Aborted by user" ;; esac
fi

# ── Restore ──
header "Restore files"
log "Removing tracked dirs (keeps data_lake, logs, tmp, .env, node_modules, dist)..."
ssh_exec "cd '$BCH_PROD_PATH' && \
    find . -mindepth 1 -maxdepth 1 \
        ! -name 'data_lake' ! -name 'logs' ! -name 'tmp' ! -name '.env' \
        ! -name 'node_modules' ! -name 'dist' \
        -exec rm -rf {} +"
log "Extracting snapshot..."
ssh_exec "tar -xzf '$SNAPSHOT_PATH' -C '$BCH_PROD_PATH'"
ok "Files restored from $TARGET"

# ── Docker rebuild ──
header "Docker rebuild & restart"
ssh_exec "cd '$BCH_PROD_PATH' && docker compose build 2>&1 | tail -3" | sed 's/^/    /'
ssh_exec "cd '$BCH_PROD_PATH' && docker compose up -d 2>&1 | tail -3" | sed 's/^/    /'
ok "Container restarted"

# ── Healthcheck ──
header "Healthcheck — $BCH_HEALTHCHECK_URL"
log "Polling for up to ${BCH_HEALTHCHECK_TIMEOUT}s..."
DEADLINE=$(($(date +%s) + BCH_HEALTHCHECK_TIMEOUT))
HEALTHY=0
STATUS=000
while [ "$(date +%s)" -lt "$DEADLINE" ]; do
    STATUS=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 5 "$BCH_HEALTHCHECK_URL" 2>/dev/null || echo "000")
    if [[ "$STATUS" =~ ^2 ]]; then HEALTHY=1; break; fi
    printf "."
    sleep 3
done
echo

if [ $HEALTHY -eq 1 ]; then
    ok "Healthy (HTTP $STATUS)"
else
    fail "Rollback applied but healthcheck still failing (HTTP $STATUS). Check: ssh $BCH_PROD_USER@$BCH_PROD_HOST docker logs bch360"
fi

header "Rollback Complete"
printf "  %sRestored:%s  %s\n" "$BOLD" "$NC" "$TARGET"
printf "  %sURL:%s       %s\n" "$BOLD" "$NC" "$BCH_HEALTHCHECK_URL"
echo
