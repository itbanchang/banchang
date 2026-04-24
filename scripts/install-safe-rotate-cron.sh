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

CRON_LINE="0 * * * * $BCH_PROD_PATH/scripts/promote-safe-rotate.sh >> /var/log/bch360-safe-rotate.log 2>&1"

echo "Installing cron on $BCH_PROD_USER@$BCH_PROD_HOST:"
echo "  $CRON_LINE"
echo

ssh "${SSH_OPTS[@]}" "$BCH_PROD_USER@$BCH_PROD_HOST" "
    set -e
    chmod +x '$BCH_PROD_PATH/scripts/promote-safe-rotate.sh'
    touch /var/log/bch360-safe-rotate.log
    chmod 644 /var/log/bch360-safe-rotate.log
    # Idempotent: drop any previous bch360 safe-rotate line, then add ours.
    ( crontab -l 2>/dev/null | grep -v 'promote-safe-rotate\.sh' || true ; \
      echo '$CRON_LINE' ) | crontab -
    crontab -l | grep promote-safe-rotate
"

echo
echo "Done. Verify with: ssh $BCH_PROD_USER@$BCH_PROD_HOST 'crontab -l'"
echo "Logs will appear at: /var/log/bch360-safe-rotate.log on prod"
