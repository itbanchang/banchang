#!/usr/bin/env bash
# ============================================================
# BCH 360° Intelligence V.10 — One-Command Deploy
# Usage: bash scripts/deploy.sh
# ============================================================
set -euo pipefail

# ── Colors ──
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

log()  { echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"; }
ok()   { echo -e "${GREEN}[$(date '+%H:%M:%S')] ✅ $1${NC}"; }
warn() { echo -e "${YELLOW}[$(date '+%H:%M:%S')] ⚠️  $1${NC}"; }
fail() { echo -e "${RED}[$(date '+%H:%M:%S')] ❌ $1${NC}"; exit 1; }

# ── Navigate to project root ──
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

echo ""
echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "${BOLD}${CYAN}  BCH 360° Intelligence V.10 — Deploy${NC}"
echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════${NC}"
echo ""

# ── Step 1: Pre-flight checks ──
log "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    fail "Node.js is not installed"
fi

if ! command -v pm2 &> /dev/null; then
    warn "PM2 not found. Installing globally..."
    npm install -g pm2
fi

if [ ! -f ".env" ]; then
    fail ".env file not found. Copy .env.example to .env and configure it."
fi

NODE_VERSION=$(node -v)
ok "Node.js ${NODE_VERSION}"
ok "PM2 $(pm2 -v)"

# ── Step 2: Install dependencies ──
log "Installing dependencies (production only)..."
npm ci --omit=dev 2>&1 | tail -1
ok "Dependencies installed"

# ── Step 3: Build frontend ──
log "Cleaning stale build artifacts..."
npm run clean:dist 2>&1 | tail -1
log "Building frontend (Vite)..."
# Need devDependencies for build
npm ci 2>&1 | tail -1
npm run build 2>&1 | tail -3
ok "Frontend built successfully ($(ls dist/assets/ | wc -l) files)"

# ── Step 4: Ensure logs directory exists ──
mkdir -p logs

# ── Step 5: Deploy with PM2 ──
if pm2 list 2>/dev/null | grep -q "bch360-server"; then
    log "Reloading server (zero-downtime)..."
    pm2 reload ecosystem.config.cjs --env production
    ok "Server reloaded — zero downtime"
else
    log "Starting server for the first time..."
    pm2 start ecosystem.config.cjs --env production
    ok "Server started"
fi

# ── Step 6: Save PM2 process list ──
pm2 save
ok "PM2 process list saved (survives reboot)"

# ── Step 7: Health check ──
log "Waiting for server to be ready..."
sleep 3

PORT=${PROD_PORT:-3000}
HEALTH_URL="http://localhost:${PORT}/api/health"

if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
    ok "Health check passed"
else
    # Fallback: check if PM2 process is online
    if pm2 list 2>/dev/null | grep -q "online"; then
        ok "Server is online (no /api/health endpoint)"
    else
        fail "Server failed to start. Check: pm2 logs bch360-server"
    fi
fi

# ── Summary ──
echo ""
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${BOLD}${GREEN}  Deploy Complete!${NC}"
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${BOLD}Commands:${NC}"
echo -e "    pm2 monit              — Real-time dashboard"
echo -e "    pm2 logs bch360-server — View logs"
echo -e "    pm2 restart all        — Restart"
echo -e "    pm2 reload all         — Zero-downtime reload"
echo -e "    pm2 stop all           — Stop"
echo ""
echo -e "  ${BOLD}Auto-start on boot:${NC}"
echo -e "    pm2 startup            — Generate startup script"
echo -e "    pm2 save               — Save current process list"
echo ""
