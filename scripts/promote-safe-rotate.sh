#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Rotate bch360:safe to current latest
#
# Purpose: bch360:safe is the auto-rollback target used by promote.sh.
# We want it to point at the most recent image that has proven itself in
# production — i.e. running healthy for at least the configured uptime.
#
# This script is intended to run on the production host as a cron job
# (default: hourly).
#
# Logic:
#   1. Find the running bch360 container's image SHA.
#   2. If the container has been Up for >= MIN_UPTIME_HOURS hours,
#      AND /healthz returns 200,
#      AND the running image SHA != current bch360:safe SHA,
#      retag bch360:<running-sha> as bch360:safe.
#   3. Otherwise, do nothing (and log why).
#
# Usage on prod:
#   bash /opt/bch360/scripts/promote-safe-rotate.sh
#
# Suggested crontab on prod:
#   0 * * * * /opt/bch360/scripts/promote-safe-rotate.sh >> /var/log/bch360-safe-rotate.log 2>&1
#
# One-time install: bash scripts/install-safe-rotate-cron.sh
# ============================================================

set -euo pipefail

MIN_UPTIME_HOURS="${MIN_UPTIME_HOURS:-1}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://localhost:4001/healthz}"
CONTAINER="${CONTAINER:-bch360}"

log() { printf "%s [safe-rotate] %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

# Container exists and is running?
if ! docker inspect "$CONTAINER" >/dev/null 2>&1; then
    log "SKIP: container '$CONTAINER' does not exist."
    exit 0
fi

STATE=$(docker inspect "$CONTAINER" --format '{{.State.Status}}' 2>/dev/null)
if [ "$STATE" != "running" ]; then
    log "SKIP: container '$CONTAINER' state is '$STATE' (not running)."
    exit 0
fi

# Uptime in seconds (from StartedAt)
STARTED_AT=$(docker inspect "$CONTAINER" --format '{{.State.StartedAt}}' 2>/dev/null)
STARTED_EPOCH=$(date -d "$STARTED_AT" +%s 2>/dev/null || echo 0)
NOW_EPOCH=$(date +%s)
UPTIME_SEC=$((NOW_EPOCH - STARTED_EPOCH))
MIN_UPTIME_SEC=$((MIN_UPTIME_HOURS * 3600))

if [ "$UPTIME_SEC" -lt "$MIN_UPTIME_SEC" ]; then
    log "SKIP: container uptime ${UPTIME_SEC}s < required ${MIN_UPTIME_SEC}s."
    exit 0
fi

# Healthcheck must pass
HTTP_CODE=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 5 "$HEALTHCHECK_URL" 2>/dev/null || echo "000")
if [[ ! "$HTTP_CODE" =~ ^2 ]]; then
    log "SKIP: healthcheck $HEALTHCHECK_URL returned HTTP $HTTP_CODE."
    exit 0
fi

# Compare current image vs safe
CURRENT_IMAGE=$(docker inspect "$CONTAINER" --format '{{.Image}}' 2>/dev/null | sed 's/sha256://')
SAFE_IMAGE=""
if docker image inspect bch360:safe >/dev/null 2>&1; then
    SAFE_IMAGE=$(docker inspect bch360:safe --format '{{.Id}}' 2>/dev/null | sed 's/sha256://')
fi

if [ "$CURRENT_IMAGE" = "$SAFE_IMAGE" ]; then
    log "SKIP: bch360:safe already points to running image (${CURRENT_IMAGE:0:12})."
    exit 0
fi

# Promote
docker tag "$CURRENT_IMAGE" bch360:safe
log "ROTATED: bch360:safe -> ${CURRENT_IMAGE:0:12} (was ${SAFE_IMAGE:0:12:-empty}); uptime ${UPTIME_SEC}s, health $HTTP_CODE."
