#!/usr/bin/env bash
# ============================================================
# BCH 360° Intelligence V.10 — Health Check
# Usage: bash scripts/health-check.sh
# Can be scheduled via cron: */5 * * * * /path/to/health-check.sh
# ============================================================
set -uo pipefail

# ── Config ──
PORT=${PROD_PORT:-3000}
APP_NAME="bch360-server"
LOG_FILE="./logs/health-check.log"

# ── Colors ──
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

log_result() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE" 2>/dev/null
    echo -e "$2"
}

echo ""
echo "BCH 360° Intelligence — Health Check"
echo "───────────────────────────────────────"

ISSUES=0

# ── 1. PM2 Process Status ──
if command -v pm2 &> /dev/null; then
    PM2_STATUS=$(pm2 jlist 2>/dev/null)
    ONLINE_COUNT=$(echo "$PM2_STATUS" | node -e "
        let d=''; process.stdin.on('data',c=>d+=c);
        process.stdin.on('end',()=>{
            try { console.log(JSON.parse(d).filter(p=>p.pm2_env.status==='online').length) }
            catch(e) { console.log(0) }
        })
    " 2>/dev/null || echo "0")

    if [ "$ONLINE_COUNT" -gt 0 ] 2>/dev/null; then
        log_result "PM2: ${ONLINE_COUNT} instances online" "${GREEN}[OK]${NC} PM2: ${ONLINE_COUNT} instances online"
    else
        log_result "PM2: No instances online" "${RED}[FAIL]${NC} PM2: No instances online"
        ISSUES=$((ISSUES + 1))
    fi
else
    log_result "PM2: Not installed" "${YELLOW}[WARN]${NC} PM2: Not installed"
    ISSUES=$((ISSUES + 1))
fi

# ── 2. HTTP Health Check ──
HTTP_CODE=$(curl -sf -o /dev/null -w "%{http_code}" "http://localhost:${PORT}/api/health" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    log_result "HTTP: Status 200 OK" "${GREEN}[OK]${NC} HTTP: localhost:${PORT}/api/health → 200"
elif [ "$HTTP_CODE" = "000" ]; then
    log_result "HTTP: Connection refused" "${RED}[FAIL]${NC} HTTP: Cannot connect to localhost:${PORT}"
    ISSUES=$((ISSUES + 1))
else
    log_result "HTTP: Status ${HTTP_CODE}" "${YELLOW}[WARN]${NC} HTTP: localhost:${PORT} → ${HTTP_CODE}"
    ISSUES=$((ISSUES + 1))
fi

# ── 3. Memory Usage ──
if command -v pm2 &> /dev/null; then
    MEM_MB=$(pm2 jlist 2>/dev/null | node -e "
        let d=''; process.stdin.on('data',c=>d+=c);
        process.stdin.on('end',()=>{
            try {
                const total = JSON.parse(d)
                    .filter(p=>p.name==='${APP_NAME}')
                    .reduce((s,p)=>s+(p.monit?.memory||0),0);
                console.log(Math.round(total/1024/1024));
            } catch(e) { console.log(0) }
        })
    " 2>/dev/null || echo "0")

    if [ "$MEM_MB" -gt 0 ] 2>/dev/null; then
        if [ "$MEM_MB" -lt 450 ]; then
            log_result "Memory: ${MEM_MB}MB" "${GREEN}[OK]${NC} Memory: ${MEM_MB}MB (limit: 512MB)"
        else
            log_result "Memory: ${MEM_MB}MB WARNING" "${YELLOW}[WARN]${NC} Memory: ${MEM_MB}MB — approaching 512MB limit"
            ISSUES=$((ISSUES + 1))
        fi
    fi
fi

# ── 4. Disk Space ──
DISK_USAGE=$(df -h . 2>/dev/null | awk 'NR==2 {print $5}' | tr -d '%' || echo "0")
if [ "$DISK_USAGE" -lt 85 ] 2>/dev/null; then
    log_result "Disk: ${DISK_USAGE}% used" "${GREEN}[OK]${NC} Disk: ${DISK_USAGE}% used"
elif [ "$DISK_USAGE" -lt 95 ] 2>/dev/null; then
    log_result "Disk: ${DISK_USAGE}% WARNING" "${YELLOW}[WARN]${NC} Disk: ${DISK_USAGE}% used — consider cleanup"
    ISSUES=$((ISSUES + 1))
else
    log_result "Disk: ${DISK_USAGE}% CRITICAL" "${RED}[FAIL]${NC} Disk: ${DISK_USAGE}% used — CRITICAL"
    ISSUES=$((ISSUES + 1))
fi

# ── Summary ──
echo "───────────────────────────────────────"
if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}All checks passed${NC}"
else
    echo -e "${RED}${ISSUES} issue(s) detected${NC}"
fi
echo ""

exit $ISSUES
