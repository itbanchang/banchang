#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Install promote-safe-rotate cron on prod
#
# One-time installer. Adds an hourly cron entry on the production host
# that runs scripts/promote-safe-rotate.sh and appends to a log file.
#
# Usage: bash scripts/install-safe-rotate-cron.sh
# ============================================================

set -euo pipefail

BCH_PROD_HOST="${BCH_PROD_HOST:-10.109.0.33}"
BCH_PROD_USER="${BCH_PROD_USER:-root}"
BCH_PROD_PATH="${BCH_PROD_PATH:-/opt/bch360}"
BCH_SSH_KEY="${BCH_SSH_KEY:-$HOME/.ssh/id_ed25519}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"
[ -f .env ] && { set -a; . ./.env; set +a; }

SSH_OPTS=(-i "$BCH_SSH_KEY" -o StrictHostKeyChecking=accept-new -o BatchMode=yes -o ConnectTimeout=10)

LOCAL_SCRIPT="$SCRIPT_DIR/promote-safe-rotate.sh"
REMOTE_SCRIPT="$BCH_PROD_PATH/scripts/promote-safe-rotate.sh"
CRON_LINE="0 * * * * $REMOTE_SCRIPT >> /var/log/bch360-safe-rotate.log 2>&1"

[ -f "$LOCAL_SCRIPT" ] || { echo "Local script missing: $LOCAL_SCRIPT" >&2; exit 1; }

echo "Step 1/2 — uploading $LOCAL_SCRIPT -> $BCH_PROD_USER@$BCH_PROD_HOST:$REMOTE_SCRIPT"
ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "mkdir -p '$BCH_PROD_PATH/scripts'"
scp "${SSH_OPTS[@]}" "$LOCAL_SCRIPT" "$BCH_PROD_USER@$BCH_PROD_HOST:$REMOTE_SCRIPT" > /dev/null
echo "  ✓ uploaded"

echo
echo "Step 2/2 — installing cron entry:"
echo "  $CRON_LINE"
ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "
    set -e
    chmod +x '$REMOTE_SCRIPT'
    touch /var/log/bch360-safe-rotate.log
    chmod 644 /var/log/bch360-safe-rotate.log
    # Idempotent: drop any previous bch360 safe-rotate line, then add ours.
    ( crontab -l 2>/dev/null | grep -v 'promote-safe-rotate\.sh' || true ; \
      echo '$CRON_LINE' ) | crontab -
    echo '  ✓ cron installed:'
    crontab -l | grep promote-safe-rotate | sed 's/^/    /'
"

echo
echo "Done. Verify with: ssh $BCH_PROD_USER@$BCH_PROD_HOST 'crontab -l'"
echo "Logs will appear at: /var/log/bch360-safe-rotate.log on prod"
echo
echo "To run once now (test):"
echo "  ssh $BCH_PROD_USER@$BCH_PROD_HOST '$REMOTE_SCRIPT'"
