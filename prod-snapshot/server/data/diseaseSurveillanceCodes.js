// ============================================================
// BCH 360° — Disease Surveillance ICD-10 catalog
// อ้างอิง: พระราชบัญญัติโรคติดต่อ พ.ศ. 2558
//          + ประกาศ ก.สธ. ชื่อและอาการสำคัญของโรคติดต่ออันตราย พ.ศ. 2559
//          + ประกาศ ก.สธ. (ฉบับเพิ่มเติม) เรื่อง COVID-19 พ.ศ. 2563
//          + ประกาศ ก.สธ. รายชื่อโรคติดต่อที่ต้องเฝ้าระวัง พ.ศ. 2559
//
// HMI / IC พยาบาลควรทบทวนรายการ ICD-10 และอัปเดตเมื่อ ก.สธ. แก้ประกาศ
// ============================================================

// ── โรคติดต่ออันตราย (พรบ. ม.3 + ประกาศ ก.สธ. 2559+2563) ─────
// 13 โรค ที่กรมควบคุมโรคกำหนด หากพบต้องแจ้งภายใน 3 ชม.
export const DANGEROUS_DISEASES = [
  { key: 'plague',         th: 'กาฬโรค',                              en: 'Plague',                 codes: ['A20'] },
  { key: 'smallpox',       th: 'ไข้ทรพิษ',                            en: 'Smallpox',               codes: ['B03'] },
  { key: 'cchf',           th: 'ไข้เลือดออกไครเมียนคองโก',          en: 'Crimean–Congo HF',       codes: ['A98.0'] },
  { key: 'west_nile',      th: 'ไข้เวสต์ไนล์',                         en: 'West Nile fever',        codes: ['A92.3'] },
  { key: 'yellow_fever',   th: 'ไข้เหลือง',                           en: 'Yellow fever',           codes: ['A95'] },
  { key: 'lassa',          th: 'ไข้ลาสซา',                            en: 'Lassa fever',            codes: ['A96.2'] },
  { key: 'nipah',          th: 'ไวรัสนิปาห์',                          en: 'Nipah virus',            codes: ['B33.8'] },
  { key: 'marburg',        th: 'ไวรัสมาร์บูร์ก',                       en: 'Marburg virus',          codes: ['A98.4'] },
  { key: 'ebola',          th: 'ไวรัสอีโบลา',                          en: 'Ebola virus',            codes: ['A98.3'] },
  { key: 'hendra',         th: 'ไวรัสเฮนดรา',                         en: 'Hendra virus',           codes: ['B33.8'] },
  { key: 'mers',           th: 'MERS-CoV (โรคทางเดินหายใจตะวันออกกลาง)', en: 'MERS-CoV',         codes: ['U04.9', 'B97.21'] },
  { key: 'sars',           th: 'SARS (โรคทางเดินหายใจเฉียบพลันรุนแรง)',  en: 'SARS',             codes: ['U04.9'] },
  { key: 'xdr_tb',         th: 'วัณโรคดื้อยาหลายขนานชนิดรุนแรงมาก',     en: 'XDR-TB',           codes: ['U84.3'] },
  { key: 'covid19',        th: 'โควิด-19',                              en: 'COVID-19',             codes: ['U07.1', 'U07.2'] },
];

// ── โรคติดต่อที่ต้องเฝ้าระวัง (พรบ. ม.5 — ประกาศ ก.สธ. 2559) ────
// 57 โรคหลัก รพ.ชุมชนเจอบ่อย คัดมาเฉพาะที่มี ICD-10 และมีโอกาสพบ
export const WATCH_DISEASES = [
  // ── อาหารและน้ำ ──
  { key: 'cholera',        th: 'อหิวาตกโรค',                          en: 'Cholera',                codes: ['A00'] },
  { key: 'typhoid',        th: 'ไข้รากสาดน้อย/ไทฟอยด์',             en: 'Typhoid fever',          codes: ['A01.0'] },
  { key: 'paratyphoid',    th: 'ไข้รากสาดเทียม',                      en: 'Paratyphoid',            codes: ['A01.1', 'A01.2', 'A01.3', 'A01.4'] },
  { key: 'shigellosis',    th: 'บิดชิเกลลา',                            en: 'Shigellosis',            codes: ['A03'] },
  { key: 'food_poisoning', th: 'อาหารเป็นพิษ',                         en: 'Food poisoning',         codes: ['A05'] },
  { key: 'hepatitis_a',    th: 'ไวรัสตับอักเสบ A',                     en: 'Hepatitis A',            codes: ['B15'] },
  { key: 'hepatitis_e',    th: 'ไวรัสตับอักเสบ E',                     en: 'Hepatitis E',            codes: ['B17.2'] },
  // ── ระบบทางเดินหายใจ ──
  { key: 'measles',        th: 'หัด',                                    en: 'Measles',                codes: ['B05'] },
  { key: 'rubella',        th: 'หัดเยอรมัน',                            en: 'Rubella',                codes: ['B06'] },
  { key: 'mumps',          th: 'คางทูม',                                en: 'Mumps',                  codes: ['B26'] },
  { key: 'diphtheria',     th: 'คอตีบ',                                 en: 'Diphtheria',             codes: ['A36'] },
  { key: 'pertussis',      th: 'ไอกรน',                                 en: 'Pertussis',              codes: ['A37'] },
  { key: 'tb',             th: 'วัณโรค',                                 en: 'Tuberculosis',           codes: ['A15', 'A16', 'A17', 'A18', 'A19'] },
  { key: 'h1n1_h5n1',      th: 'ไข้หวัดใหญ่ (สายพันธุ์ใหม่/H5N1)',  en: 'Avian/Novel influenza',  codes: ['J09', 'J10.0', 'J10.1', 'J10.8'] },
  { key: 'rsv',            th: 'RSV',                                     en: 'RSV infection',          codes: ['B97.4', 'J12.1', 'J20.5', 'J21.0'] },
  { key: 'meningococcal',  th: 'ไข้กาฬหลังแอ่น',                       en: 'Meningococcal',          codes: ['A39'] },
  // ── สัตว์ พาหะ ──
  { key: 'rabies',          th: 'พิษสุนัขบ้า',                            en: 'Rabies',                 codes: ['A82'] },
  { key: 'lepto',           th: 'ฉี่หนู (เลปโตสไปโรซิส)',              en: 'Leptospirosis',          codes: ['A27'] },
  { key: 'scrub_typhus',    th: 'ไข้รากสาดใหญ่/สครับไทฟัส',         en: 'Scrub typhus',           codes: ['A75.3'] },
  { key: 'melioidosis',     th: 'เมลิออยโดสิส',                         en: 'Melioidosis',            codes: ['A24'] },
  { key: 'anthrax',         th: 'แอนแทรกซ์',                              en: 'Anthrax',                codes: ['A22'] },
  { key: 'brucellosis',     th: 'บรูเซลโลซิส',                            en: 'Brucellosis',            codes: ['A23'] },
  // ── ยุง ──
  { key: 'dengue',          th: 'ไข้เลือดออก/เดงกี',                     en: 'Dengue',                 codes: ['A90', 'A91'] },
  { key: 'chikungunya',     th: 'ชิคุนกุนยา',                            en: 'Chikungunya',            codes: ['A92.0'] },
  { key: 'malaria',         th: 'มาลาเรีย',                              en: 'Malaria',                codes: ['B50', 'B51', 'B52', 'B53', 'B54'] },
  { key: 'zika',            th: 'ซิกา',                                   en: 'Zika',                   codes: ['A92.5'] },
  { key: 'jap_encephalitis', th: 'ไข้สมองอักเสบเจอี',                    en: 'Japanese encephalitis',  codes: ['A83.0'] },
  // ── สัมผัส/เด็ก ──
  { key: 'hfmd',            th: 'มือ เท้า ปาก',                          en: 'Hand-foot-mouth',        codes: ['B08.4', 'B08.5'] },
  { key: 'varicella',       th: 'อีสุกอีใส',                              en: 'Varicella (Chickenpox)', codes: ['B01'] },
  // ── เพศสัมพันธ์ ──
  { key: 'hiv_new',         th: 'HIV (ผู้ติดเชื้อรายใหม่)',              en: 'HIV new diagnosis',      codes: ['B20', 'B21', 'B22', 'B23', 'B24', 'Z21'] },
  { key: 'syphilis',        th: 'ซิฟิลิส',                                  en: 'Syphilis',               codes: ['A50', 'A51', 'A52', 'A53'] },
];

// helper — flatten codes for SQL LIKE generation
// returns: { dangerous: { covid19: ['U07.1','U07.2'], ... }, watch: {...} }
export function getDiseaseMap() {
  return {
    dangerous: Object.fromEntries(DANGEROUS_DISEASES.map(d => [d.key, { th: d.th, en: d.en, codes: d.codes }])),
    watch:     Object.fromEntries(WATCH_DISEASES.map(d => [d.key, { th: d.th, en: d.en, codes: d.codes }])),
  };
}

// Build a SQL fragment that matches any of the provided ICD-10 codes (column = od.icd10).
// Returns { sql, params }. Codes are matched via prefix LIKE 'A20%' so child-codes count.
export function icd10WhereClause(codes, column = 'od.icd10') {
  if (!codes || codes.length === 0) return { sql: '1=0', params: [] };
  const clauses = [];
  const params = [];
  for (const c of codes) {
    // Strip dot for prefix match: "A98.0" → match "A980", "A98", "A98.0" all
    clauses.push(`(${column} = ? OR ${column} LIKE ?)`);
    params.push(c, `${c}%`);
  }
  return { sql: `(${clauses.join(' OR ')})`, params };
}
