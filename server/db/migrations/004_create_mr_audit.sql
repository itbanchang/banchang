-- ============================================================
-- BCH 360° Intelligence V.10 — MR Audit (Medical Record Audit) sidecar tables
-- ------------------------------------------------------------
-- HOSxP XE is read-only, so MR-staff audit decisions on IPD paperless
-- (verified / flagged / commented) live in the sidecar.
--
-- Each AN can have multiple history rows (one per audit event); the
-- "current" row is always the row with MAX(audited_at) for that AN.
-- ============================================================

CREATE TABLE IF NOT EXISTS mr_audit_status (
    audit_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    an              TEXT    NOT NULL,
    status          TEXT    NOT NULL CHECK(status IN ('pending','verified','flagged','rejected')),
    comment         TEXT,
    flagged_items   TEXT,           -- JSON array, e.g. '["pdx","dch_summary"]'
    audited_by      TEXT    NOT NULL,
    audited_at      TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);

CREATE INDEX IF NOT EXISTS idx_mr_audit_an     ON mr_audit_status(an);
CREATE INDEX IF NOT EXISTS idx_mr_audit_status ON mr_audit_status(status);
CREATE INDEX IF NOT EXISTS idx_mr_audit_at     ON mr_audit_status(audited_at);

-- View: latest audit per AN (most-recent wins).
DROP VIEW IF EXISTS v_mr_audit_latest;
CREATE VIEW v_mr_audit_latest AS
SELECT a.*
FROM   mr_audit_status a
JOIN   (
    SELECT an, MAX(audited_at) AS max_at
    FROM   mr_audit_status
    GROUP  BY an
) m ON m.an = a.an AND m.max_at = a.audited_at;
