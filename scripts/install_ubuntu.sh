#!/bin/bash
# ============================================================
# BCH 360° Intelligence V.10 — Ubuntu Deployment Script
# Target: 10.109.0.33 (Ubuntu 18.04/22.04)
# Run as: root OR user with sudo
# ============================================================
set -euo pipefail

APP_USER="bch360"
APP_DIR="/opt/bch360"
REPO_URL="${REPO_URL:-}"  # Set via env var if private
NODE_VERSION="20"

log() { echo -e "\n\033[1;34m▶ $1\033[0m"; }
ok()  { echo -e "\033[1;32m✓ $1\033[0m"; }
warn(){ echo -e "\033[1;33m⚠ $1\033[0m"; }

if [[ $EUID -ne 0 ]] && ! sudo -n true 2>/dev/null; then
    echo "❌ Need sudo access. Run: sudo -v && bash $0"
    exit 1
fi

# ── 1. System Packages ──────────────────────────────────────
log "1/8 Updating apt + installing system packages"
sudo apt-get update -y
sudo apt-get install -y \
    curl wget git ca-certificates gnupg \
    build-essential python3 python3-pip \
    nginx certbot python3-certbot-nginx \
    ufw fail2ban \
    htop ncdu jq unzip
ok "System packages installed"

# ── 2. Node.js 20 LTS via NodeSource ───────────────────────
log "2/8 Installing Node.js ${NODE_VERSION} LTS"
if ! command -v node &>/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
ok "Node $(node -v) · npm $(npm -v)"

# ── 3. Global npm packages ──────────────────────────────────
log "3/8 Installing PM2 + pm2-logrotate"
sudo npm install -g pm2 pm2-logrotate
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
ok "PM2 $(pm2 -v) installed with logrotate"

# ── 4. Create dedicated user + directory ────────────────────
log "4/8 Creating app user + directory"
if ! id "$APP_USER" &>/dev/null; then
    sudo useradd -m -s /bin/bash "$APP_USER"
    ok "Created user $APP_USER"
fi
sudo mkdir -p "$APP_DIR"
sudo chown -R "$APP_USER":"$APP_USER" "$APP_DIR"

# ── 5. Clone / Copy project ─────────────────────────────────
log "5/8 Setting up project at $APP_DIR"
if [[ -n "$REPO_URL" ]]; then
    sudo -u "$APP_USER" git clone "$REPO_URL" "$APP_DIR" 2>/dev/null || \
        sudo -u "$APP_USER" git -C "$APP_DIR" pull
else
    warn "REPO_URL not set — upload code manually to $APP_DIR (rsync/scp)"
fi

# ── 6. Install dependencies + build ─────────────────────────
if [[ -f "$APP_DIR/package.json" ]]; then
    log "6/8 Installing npm deps + building frontend"
    sudo -u "$APP_USER" bash -c "cd $APP_DIR && npm ci --omit=dev --no-audit --no-fund"
    sudo -u "$APP_USER" bash -c "cd $APP_DIR && npm install --no-save --omit=dev vite @vitejs/plugin-react"
    sudo -u "$APP_USER" bash -c "cd $APP_DIR && npm run build"
    ok "Frontend built to $APP_DIR/dist"
else
    warn "Skipping npm install — package.json not found"
fi

# ── 7. Firewall rules ───────────────────────────────────────
log "7/8 Configuring UFW firewall"
sudo ufw --force enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP (redirect to HTTPS)'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw allow from 10.0.0.0/8 to any port 3306 comment 'MySQL LAN only'
sudo ufw allow from 10.0.0.0/8 to any port 4001 comment 'BCH360 dev port LAN only'
ok "UFW configured (SSH · HTTP · HTTPS · MySQL LAN · 4001 LAN)"

# ── 8. Systemd service for PM2 on boot ──────────────────────
log "8/8 Setting up PM2 systemd service"
if [[ -f "$APP_DIR/ecosystem.config.cjs" ]]; then
    sudo -u "$APP_USER" bash -c "cd $APP_DIR && pm2 start ecosystem.config.cjs --env production || pm2 reload ecosystem.config.cjs"
    sudo -u "$APP_USER" pm2 save
    sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER"
    ok "PM2 will auto-start on boot"
else
    warn "ecosystem.config.cjs missing — configure PM2 manually"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ BCH 360° Installation Complete"
echo "═══════════════════════════════════════════════════════════"
echo "  App path:    $APP_DIR"
echo "  Run as user: $APP_USER"
echo "  PM2 status:  sudo -u $APP_USER pm2 status"
echo "  PM2 logs:    sudo -u $APP_USER pm2 logs bch360-server"
echo ""
echo "  Next steps:"
echo "  1. Copy .env to $APP_DIR/.env (MYSQL_HOST=127.0.0.1)"
echo "  2. Configure SSL cert (certbot or self-signed)"
echo "  3. Configure Nginx reverse proxy (see nginx_bch360.conf)"
echo "  4. Test: curl -sk https://localhost/api/system/health"
echo "═══════════════════════════════════════════════════════════"
