#!/usr/bin/env bash
# ============================================================
# BCH 360° Intelligence V.10 — Load Test
# Usage: bash scripts/loadtest.sh [concurrent] [rounds]
# Example: bash scripts/loadtest.sh 20 3
# ============================================================
set -euo pipefail

CONCURRENT=${1:-10}
ROUNDS=${2:-3}
BASE_URL="https://10.1.0.68:4001"
COOKIE_FILE="/tmp/bch360_loadtest_cookies.txt"

echo "================================================"
echo "  BCH 360° Load Test"
echo "  Concurrent: $CONCURRENT  Rounds: $ROUNDS"
echo "================================================"
echo ""

# Get session
curl -k -s -c "$COOKIE_FILE" -X POST "$BASE_URL/api/auth/auto-session" -H "Content-Type: application/json" > /dev/null 2>&1

# Endpoints to test (ordered by expected response time)
ENDPOINTS=(
  "/api/health"
  "/api/dashboard/summary"
  "/api/opd/today"
  "/api/ipd/bed-occupancy"
  "/api/er/today"
  "/api/pharmacy/today"
  "/api/lab/today"
  "/api/dental/today"
  "/api/staffing/today"
  "/api/ai/ews/summary"
  "/api/finance/monthly-summary?year=2025"
  "/api/quality/today"
)

TOTAL_REQUESTS=0
TOTAL_ERRORS=0
TOTAL_TIME=0
declare -A EP_TIMES EP_COUNTS EP_ERRORS

for round in $(seq 1 $ROUNDS); do
  echo "--- Round $round/$ROUNDS ---"

  for endpoint in "${ENDPOINTS[@]}"; do
    EP_COUNTS[$endpoint]=${EP_COUNTS[$endpoint]:-0}
    EP_TIMES[$endpoint]=${EP_TIMES[$endpoint]:-0}
    EP_ERRORS[$endpoint]=${EP_ERRORS[$endpoint]:-0}

    # Fire concurrent requests
    pids=()
    tmpdir=$(mktemp -d)

    for i in $(seq 1 $CONCURRENT); do
      (
        result=$(curl -k -s -b "$COOKIE_FILE" -o /dev/null \
          -w "%{http_code} %{time_total}" \
          "$BASE_URL$endpoint" 2>&1)
        echo "$result" > "$tmpdir/$i.txt"
      ) &
      pids+=($!)
    done

    # Wait all
    for pid in "${pids[@]}"; do
      wait "$pid" 2>/dev/null || true
    done

    # Collect results
    ok=0; err=0; sum_time=0
    for f in "$tmpdir"/*.txt; do
      [ -f "$f" ] || continue
      read -r code time < "$f"
      if [ "${code:-0}" -ge 200 ] && [ "${code:-0}" -lt 400 ]; then
        ok=$((ok + 1))
      else
        err=$((err + 1))
      fi
      sum_time=$(echo "$sum_time + ${time:-0}" | bc 2>/dev/null || echo "$sum_time")
    done
    rm -rf "$tmpdir"

    avg_ms=$(echo "scale=0; ($sum_time * 1000) / $CONCURRENT" | bc 2>/dev/null || echo "?")

    EP_COUNTS[$endpoint]=$((${EP_COUNTS[$endpoint]} + ok + err))
    EP_ERRORS[$endpoint]=$((${EP_ERRORS[$endpoint]} + err))
    TOTAL_REQUESTS=$((TOTAL_REQUESTS + ok + err))
    TOTAL_ERRORS=$((TOTAL_ERRORS + err))

    status="OK"
    [ "$err" -gt 0 ] && status="FAIL($err)"
    printf "  %-45s %3d/%d %s  avg %sms\n" "$endpoint" "$ok" "$CONCURRENT" "$status" "$avg_ms"
  done
  echo ""
done

# Summary
echo "================================================"
echo "  RESULTS"
echo "================================================"
echo "  Total requests: $TOTAL_REQUESTS"
echo "  Errors:         $TOTAL_ERRORS"
echo "  Success rate:   $(( (TOTAL_REQUESTS - TOTAL_ERRORS) * 100 / TOTAL_REQUESTS ))%"
echo ""

# Check server health after load
HEALTH=$(curl -k -s "$BASE_URL/api/health" 2>&1)
DB_LATENCY=$(echo "$HEALTH" | grep -o '"db_latency_ms":[0-9]*' | cut -d: -f2)
echo "  Post-test health: $(echo "$HEALTH" | grep -o '"status":"[^"]*"')"
echo "  DB latency:       ${DB_LATENCY}ms"
echo "================================================"

rm -f "$COOKIE_FILE"
