-- ============================================================
-- Migration 006: MRA Guideline 2563 — Manual Audit Sidecar (สปสช.)
-- ------------------------------------------------------------
-- The เกณฑ์ สปสช. 2563 defines 12 IPD content sections × 9 criteria
-- (~108 จุดตรวจ). Each criterion is scored 0 (fail) / 1 (pass) / NULL (NA).
-- Section 2 "Discharge Summary: Others" has only 7 criteria; for that
-- section criterion_no 8-9 are unused (NULL rows).
--
-- Overall Finding per AN: one of 'inadequate' / 'no_issue' / 'in_question'
-- ============================================================

CREATE TABLE IF NOT EXISTS mr_audit_2563_score (
    score_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    an              TEXT    NOT NULL,
    section_code    TEXT    NOT NULL CHECK(section_code IN (
                        'DS_DX','DS_OTH','CONSENT','HX','PE','PROG',
                        'CONSULT','ANES','OP','LABOUR','REHAB','NURSE'
                    )),
    criterion_no    INTEGER NOT NULL CHECK(criterion_no BETWEEN 1 AND 9),
    score           INTEGER CHECK(score IS NULL OR score IN (0, 1)),  -- 0=fail, 1=pass, NULL=NA
    comment         TEXT,
    updated_by      TEXT    NOT NULL,
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
    UNIQUE(an, section_code, criterion_no)
);

CREATE INDEX IF NOT EXISTS idx_mr_2563_score_an      ON mr_audit_2563_score(an);
CREATE INDEX IF NOT EXISTS idx_mr_2563_score_section ON mr_audit_2563_score(section_code);
CREATE INDEX IF NOT EXISTS idx_mr_2563_score_updated ON mr_audit_2563_score(updated_at);

CREATE TABLE IF NOT EXISTS mr_audit_2563_overall (
    an              TEXT    PRIMARY KEY,
    finding         TEXT    NOT NULL CHECK(finding IN ('inadequate','no_issue','in_question')),
    comment         TEXT,
    updated_by      TEXT    NOT NULL,
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);

CREATE INDEX IF NOT EXISTS idx_mr_2563_overall_finding ON mr_audit_2563_overall(finding);
CREATE INDEX IF NOT EXISTS idx_mr_2563_overall_updated ON mr_audit_2563_overall(updated_at);
