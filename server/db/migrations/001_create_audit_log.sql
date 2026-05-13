-- ============================================================
-- BCH 360° Intelligence V.10 — Sidecar audit_log
-- ------------------------------------------------------------
-- Minimal audit trail table used by triggers in later migrations
-- (see 003_create_patient_debt_history.sql → tr_debt_payment_log).
-- Runs before 002/003 because filenames are sorted lexicographically
-- by the sidecar migration loader.
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_log (
    audit_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      TEXT NOT NULL,
    action       TEXT NOT NULL,
    table_name   TEXT,
    record_id    INTEGER,
    old_value    TEXT,
    new_value    TEXT,
    created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id    ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action     ON audit_log(action);
