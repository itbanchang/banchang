#!/bin/bash
# ============================================================
# BCH 360° — Remote Deploy Runner (runs on 10.109.0.33)
# Triggered by deploy.ps1 from dev machine
# ============================================================
set -euo pipefail

APP_DIR="/opt/bch360"
PKG_FILE="${1:-/tmp/bch360-src.tar.gz}"
IMAGE_TAG="bch360:latest"
BACKUP_TAG="bch360:previous"
HEALTH_URL="https://localhost/api/system/build-info"
LOG="/var/log/bch360-deploy.log"
TS=$(date '+%Y-%m-%d %H:%M:%S')

log() { echo "[$TS] $1" | tee -a "$LOG"; }
die() { echo "[$TS] ❌ $1" | tee -a "$LOG"; exit 1; }

log "══════════════════════════════════════════════════════"
log "🚀 AUTO-DEPLOY START · package: $PKG_FILE"
log "══════════════════════════════════════════════════════"

# ── 1. Validate inputs ──────────────────────────────────────
[[ -f "$PKG_FILE" ]] || die "Package not found: $PKG_FILE"
[[ -d "$APP_DIR" ]]  || die "App dir not found: $APP_DIR"
command -v docker >/dev/null || die "Docker not installed"

PKG_SIZE=$(du -h "$PKG_FILE" | cut -f1)
log "✓ Package: $PKG_FILE ($PKG_SIZE)"

# ── 2. Tag current image as backup (rollback point) ─────────
if docker image inspect "$IMAGE_TAG" >/dev/null 2>&1; then
    docker tag "$IMAGE_TAG" "$BACKUP_TAG"
    log "✓ Current image tagged as $BACKUP_TAG (rollback point)"
else
    log "ℹ No existing $IMAGE_TAG — first deploy"
fi

# ── 3. Backup .env (keep user config safe) ──────────────────
if [[ -f "$APP_DIR/.env" ]]; then
    cp "$APP_DIR/.env" "$APP_DIR/.env.backup"
    log "✓ .env backed up"
fi

# ── 4. Extract source (preserve .env and data_lake) ─────────
log "🗜 Extracting source..."
tar -xzf "$PKG_FILE" -C "$APP_DIR" --overwrite \
    --exclude='.env' --exclude='data_lake' --exclude='logs' \
    --exclude='node_modules' --exclude='dist'
FILE_COUNT=$(find "$APP_DIR" -type f -newer "$PKG_FILE" 2>/dev/null | wc -l)
log "✓ Source extracted"

# ── 5. Build new Docker image ───────────────────────────────
log "🐳 Building Docker image (this may take 3-5 min)..."
cd "$APP_DIR"
BUILD_START=$(date +%s)
if docker build -t "$IMAGE_TAG" . > /tmp/bch360-build.log 2>&1; then
    BUILD_TIME=$(($(date +%s) - BUILD_START))
    IMAGE_SIZE=$(docker images "$IMAGE_TAG" --format "{{.Size}}" | head -1)
    log "✓ Build complete in ${BUILD_TIME}s · image size: $IMAGE_SIZE"
else
    log "❌ Build failed — see /tmp/bch360-build.log"
    tail -20 /tmp/bch360-build.log | tee -a "$LOG"
    die "Docker build failed"
fi

# ── 6. Stop + remove old container ──────────────────────────
if docker ps -a --format '{{.Names}}' | grep -q '^bch360$'; then
    log "⏹ Stopping old container..."
    docker stop bch360 >/dev/null 2>&1 || true
    docker rm bch360 >/dev/null 2>&1 || true
    log "✓ Old container removed"
fi

# ── 7. Start new container ──────────────────────────────────
log "▶ Starting new container..."
docker run -d \
    --name bch360 \
    --restart unless-stopped \
    --network host \
    -v "$APP_DIR/.env":/app/.env:ro \
    -v "$APP_DIR/data_lake":/app/data_lake \
    -v "$APP_DIR/logs":/app/logs \
    -e NODE_ENV=production \
    -e PORT=4001 \
    "$IMAGE_TAG" >/dev/null

log "✓ Container started"

# ── 8. Health check with retries ────────────────────────────
log "🏥 Running health check (30s timeout)..."
HEALTHY=0
for i in {1..30}; do
    sleep 1
    if curl -sk -o /dev/null -w "%{http_code}" --max-time 2 "$HEALTH_URL" 2>/dev/null | grep -qE "^(200|401|403)$"; then
        HEALTHY=1
        log "✓ Healthy after ${i}s (HTTP response OK)"
        break
    fi
done

if [[ $HEALTHY -eq 0 ]]; then
    log "❌ Health check FAILED after 30s"
    docker logs bch360 --tail 30 | tee -a "$LOG"
    log "🔙 Auto-rolling back to previous image..."
    docker stop bch360 && docker rm bch360
    docker run -d \
        --name bch360 \
        --restart unless-stopped \
        --network host \
        -v "$APP_DIR/.env":/app/.env:ro \
        -v "$APP_DIR/data_lake":/app/data_lake \
        -v "$APP_DIR/logs":/app/logs \
        -e NODE_ENV=production \
        -e PORT=4001 \
        "$BACKUP_TAG" >/dev/null || die "Rollback failed too — manual intervention needed"
    log "✓ Rolled back to $BACKUP_TAG"
    die "Deploy failed · rolled back"
fi

# ── 9. Cleanup ──────────────────────────────────────────────
rm -f "$PKG_FILE"
# Keep only 3 most recent dangling images to save disk
docker image prune -f --filter "until=168h" >/dev/null 2>&1 || true

log "══════════════════════════════════════════════════════"
log "🎉 DEPLOY SUCCESS · Container: bch360 · Image: $IMAGE_TAG"
log "   Rollback: docker stop bch360 && docker rm bch360 && \\"
log "             docker run -d --name bch360 ... $BACKUP_TAG"
log "══════════════════════════════════════════════════════"
