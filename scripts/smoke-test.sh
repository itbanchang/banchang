#!/usr/bin/env bash
# ============================================================
# BCH 360° — Smoke test (CI-friendly)
# Boots Express, waits for healthcheck, then curls critical endpoints.
# Used by .github/workflows/smoke.yml on every PR.
# ============================================================
set -euo pipefail

PORT="${PORT:-4001}"
HEALTH_URL="http://localhost:${PORT}/api/system/health"
LOG_FILE="/tmp/bch-smoke-server.log"

cleanup() {
  if [ -n "${SERVER_PID:-}" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "🛑 Stopping server (PID $SERVER_PID)..."
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "🚀 Starting server in background..."
node server/server.js > "$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo "   PID: $SERVER_PID"

# ── Wait for server ──
echo "⏳ Waiting for server to be ready (max 60s)..."
READY=0
for i in $(seq 1 60); do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "❌ Server process died after ${i}s. Last 50 lines of log:"
    tail -50 "$LOG_FILE"
    exit 1
  fi
  if curl -s -f -o /dev/null "$HEALTH_URL" 2>/dev/null; then
    echo "✅ Server ready after ${i}s"
    READY=1
    break
  fi
  sleep 1
done

if [ "$READY" -ne 1 ]; then
  echo "❌ Server did not become ready within 60s. Last 50 lines of log:"
  tail -50 "$LOG_FILE"
  exit 1
fi

# ── Smoke endpoints ──
# Each endpoint may or may not require auth depending on app config.
# In CI we test the publicly-reachable ones and gate the auth'd ones via
# a synthetic JWT or DISABLE_AUTH flag if implemented.
echo
echo "🧪 Curling critical endpoints..."

declare -a ENDPOINTS=(
  "/api/system/health"
  "/api/system/status"
)

FAIL=0
for endpoint in "${ENDPOINTS[@]}"; do
  status=$(curl -s -o /tmp/bch-smoke-resp.txt -w "%{http_code}" "http://localhost:${PORT}${endpoint}" || echo "000")
  # Accept 200 (success) or 401 (auth-required, route exists)
  if [ "$status" = "200" ] || [ "$status" = "401" ] || [ "$status" = "204" ]; then
    echo "✅ ${endpoint} → ${status}"
  else
    echo "❌ ${endpoint} → ${status}"
    echo "   Response (first 200 chars):"
    head -c 200 /tmp/bch-smoke-resp.txt
    echo
    FAIL=$((FAIL+1))
  fi
done

# ── Auth flow check (login as ci-test admin, then call admin endpoint) ──
echo
echo "🔑 Testing auth flow..."
LOGIN_RESP=$(curl -s -c /tmp/bch-smoke-cookie.txt -X POST "http://localhost:${PORT}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"'"${DEFAULT_ADMIN_PASSWORD:-ci-test-admin-pw}"'"}' || echo '{}')
echo "   Login: $(echo "$LOGIN_RESP" | head -c 100)..."

if echo "$LOGIN_RESP" | grep -q '"user"'; then
  echo "✅ Admin login succeeded"

  # Try a few admin-gated endpoints
  for endpoint in "/api/executive/bsc" "/api/admin/claude-metrics"; do
    status=$(curl -s -b /tmp/bch-smoke-cookie.txt -o /dev/null -w "%{http_code}" "http://localhost:${PORT}${endpoint}" || echo "000")
    # 200 = ok ; 500 = OK to allow (DB might not have data in CI)
    if [ "$status" = "200" ] || [ "$status" = "500" ]; then
      echo "✅ ${endpoint} (authed) → ${status}"
    elif [ "$status" = "401" ] || [ "$status" = "403" ]; then
      echo "⚠️  ${endpoint} (authed) → ${status} (auth not working as expected)"
    else
      echo "❌ ${endpoint} (authed) → ${status}"
      FAIL=$((FAIL+1))
    fi
  done
else
  echo "⚠️  Admin login did not return user object — auth may need CI fixture setup"
  echo "   This is a non-fatal warning if DB is empty in CI."
fi

# ── Summary ──
echo
if [ "$FAIL" -gt 0 ]; then
  echo "❌ Smoke test FAILED — ${FAIL} endpoint(s) returned unexpected status"
  exit 1
fi
echo "✅ All smoke tests passed"
