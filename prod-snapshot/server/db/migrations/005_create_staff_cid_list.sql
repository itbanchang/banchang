-- ============================================================
-- BCH 360° Intelligence V.10 — Staff CID list (เวชระเบียน audit)
-- ------------------------------------------------------------
-- คน CID ที่อยู่ใน list นี้ คือ "บุคลากร" ที่จะใช้ตรวจสอบการรับ
-- บริการตาม report 'staff-cid-services'.  Seeded ด้วย 498 CID
-- จากรอบแรก; ผู้ใช้สามารถเพิ่ม/ลบได้ผ่าน UPDATE/INSERT ตรงตาราง
-- หรือผ่าน admin endpoint (ภายหลัง).
-- ============================================================

CREATE TABLE IF NOT EXISTS staff_cid_list (
    cid_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    cid        TEXT    NOT NULL UNIQUE,
    active     CHAR(1) NOT NULL DEFAULT 'Y' CHECK(active IN ('Y','N')),
    note       TEXT,
    added_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_staff_cid_active ON staff_cid_list(active);

INSERT OR IGNORE INTO staff_cid_list (cid) VALUES
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),('***CID-REMOVED***'),
  ('***CID-REMOVED***'),('***CID-REMOVED***');
