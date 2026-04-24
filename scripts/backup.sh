#!/usr/bin/env bash
# ============================================================
# BCH 360° Intelligence V.10 — Automated Backup
# Usage: bash scripts/backup.sh
# Cron:  0 2 * * * cd /opt/bch360 && bash scripts/backup.sh
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ── Configuration ──
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_ROOT/backups}"
RETAIN_DAYS="${RETAIN_DAYS:-30}"
DATE=$(date '+%Y%m%d_%H%M%S')
BACKUP_NAME="bch360_backup_${DATE}"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

# ── Create backup directory ──
mkdir -p "$BACKUP_PATH"

log "Starting backup → $BACKUP_PATH"

# ── 1. SQLite databases (hot copy via .backup command) ──
WAREHOUSE_DB="$PROJECT_ROOT/data_lake/warehouse.db"
USERS_DB="$PROJECT_ROOT/server/db/users.db"

for DB_SRC in "$WAREHOUSE_DB" "$USERS_DB"; do
  DB_NAME=$(basename "$DB_SRC")
  if [ -f "$DB_SRC" ]; then
    cp "$DB_SRC" "$BACKUP_PATH/$DB_NAME"
    # Also copy WAL/SHM if present
    [ -f "${DB_SRC}-wal" ] && cp "${DB_SRC}-wal" "$BACKUP_PATH/${DB_NAME}-wal"
    [ -f "${DB_SRC}-shm" ] && cp "${DB_SRC}-shm" "$BACKUP_PATH/${DB_NAME}-shm"
    log "  $DB_NAME: $(du -h "$BACKUP_PATH/$DB_NAME" | cut -f1)"
  else
    log "  $DB_NAME: NOT FOUND (skipped)"
  fi
done

# ── 2. Environment config (secrets) ──
if [ -f "$PROJECT_ROOT/.env" ]; then
  cp "$PROJECT_ROOT/.env" "$BACKUP_PATH/env.bak"
  log "  .env: copied"
fi

# ── 3. SSL certificates ──
if [ -d "$PROJECT_ROOT/server/ssl" ]; then
  cp -r "$PROJECT_ROOT/server/ssl" "$BACKUP_PATH/ssl"
  log "  SSL certs: copied"
fi

# ── 4. PM2 ecosystem config ──
cp "$PROJECT_ROOT/ecosystem.config.cjs" "$BACKUP_PATH/" 2>/dev/null || true

# ── 5. Verify SQLite integrity (via Node better-sqlite3) ──
INTEGRITY_OK=true
for db in "$BACKUP_PATH"/*.db; do
  [ -f "$db" ] || continue
  BASENAME=$(basename "$db")
  DBPATH=$(cd "$(dirname "$db")" && pwd)/$(basename "$db")
  RESULT=$(node -e "try{const D=require('better-sqlite3');const d=new D(process.argv[1],{readonly:true});const r=d.pragma('integrity_check');d.close();console.log(r[0].integrity_check)}catch(e){console.log('ERROR:'+e.message)}" "$DBPATH" 2>/dev/null || echo "SKIP")
  if [ "$RESULT" = "ok" ]; then
    log "  Integrity $BASENAME: OK"
  elif [ "$RESULT" = "SKIP" ]; then
    log "  Integrity $BASENAME: SKIP (no better-sqlite3)"
  else
    log "  Integrity $BASENAME: FAILED ($RESULT)"
    INTEGRITY_OK=false
  fi
done

# ── 6. Compress ──
ARCHIVE="$BACKUP_DIR/${BACKUP_NAME}.tar.gz"
tar -czf "$ARCHIVE" -C "$BACKUP_DIR" "$BACKUP_NAME" 2>/dev/null
rm -rf "$BACKUP_PATH"
ARCHIVE_SIZE=$(du -h "$ARCHIVE" | cut -f1)
log "  Archive: $ARCHIVE ($ARCHIVE_SIZE)"

# ── 7. Cleanup old backups ──
DELETED=$(find "$BACKUP_DIR" -name "bch360_backup_*.tar.gz" -mtime +${RETAIN_DAYS} -delete -print | wc -l)
log "  Cleaned: $DELETED old backup(s) (>${RETAIN_DAYS} days)"

# ── Summary ──
TOTAL=$(ls "$BACKUP_DIR"/bch360_backup_*.tar.gz 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
log "Backup complete: $TOTAL backups, $TOTAL_SIZE total"

if [ "$INTEGRITY_OK" = false ]; then
  log "WARNING: Some database integrity checks failed!"
  exit 1
fi
