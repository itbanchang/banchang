// ============================================================
// BCH 360° Intelligence V.10 - Database Schema & Seed
// Hospital Executive Dashboard - SQLite Schema
// ============================================================
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, 'hospital.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ==================== SCHEMA ====================

db.exec(`
  -- ============================================================
  -- MODULE 1: FINANCE & RCM
  -- ============================================================

  -- Claims table with AI risk scoring
  CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    claim_number TEXT UNIQUE NOT NULL,
    payer_type TEXT NOT NULL CHECK(payer_type IN ('UCS','SSS','CSMBS','Private','Self-pay','Foreigner')),
    icd10_primary TEXT NOT NULL,
    icd10_secondary TEXT,
    drg_code TEXT,
    total_amount REAL NOT NULL DEFAULT 0,
    approved_amount REAL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','submitted','approved','partially_approved','denied','appealed')),
    risk_score REAL DEFAULT 0.0 CHECK(risk_score >= 0.0 AND risk_score <= 1.0),
    risk_factors TEXT, -- JSON array of risk factor strings
    submission_date TEXT,
    response_date TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    updated_at TEXT DEFAULT (datetime('now','localtime'))
  );

  -- Revenue tracking
  CREATE TABLE IF NOT EXISTS revenue (
    id TEXT PRIMARY KEY,
    department TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('OPD','IPD','ER','Lab','Imaging','Pharmacy','Surgery','Other')),
    amount REAL NOT NULL DEFAULT 0,
    month INTEGER NOT NULL CHECK(month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    payer_type TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  -- Expense tracking
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    department TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Salary','Medical Supplies','Equipment','Utilities','Maintenance','Pharmacy','Other')),
    amount REAL NOT NULL DEFAULT 0,
    month INTEGER NOT NULL CHECK(month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  -- Denial log for tracking and analysis
  CREATE TABLE IF NOT EXISTS denial_logs (
    id TEXT PRIMARY KEY,
    claim_id TEXT NOT NULL,
    denial_reason TEXT NOT NULL,
    denial_code TEXT,
    denial_category TEXT CHECK(denial_category IN ('Documentation','Coding','Authorization','Eligibility','Duplicate','Other')),
    amount_denied REAL NOT NULL DEFAULT 0,
    appeal_status TEXT DEFAULT 'none' CHECK(appeal_status IN ('none','pending','won','lost')),
    appeal_date TEXT,
    resolution_date TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (claim_id) REFERENCES claims(id)
  );

  -- ============================================================
  -- MODULE 2: IPD OPERATIONS
  -- ============================================================

  -- Wards
  CREATE TABLE IF NOT EXISTS wards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    floor INTEGER NOT NULL,
    department TEXT NOT NULL,
    total_beds INTEGER NOT NULL DEFAULT 0,
    ward_type TEXT CHECK(ward_type IN ('General','ICU','CCU','NICU','Pediatric','Surgical','Maternity','Private','Isolation'))
  );

  -- Bed management
  CREATE TABLE IF NOT EXISTS beds (
    id TEXT PRIMARY KEY,
    ward_id TEXT NOT NULL,
    bed_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('available','occupied','reserved','maintenance','cleaning')),
    patient_id TEXT,
    equipment TEXT, -- JSON: ventilator, monitor, etc.
    last_cleaned TEXT,
    updated_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (ward_id) REFERENCES wards(id)
  );

  -- Admissions with predicted discharge (AI)
  CREATE TABLE IF NOT EXISTS admissions (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    ward_id TEXT,
    bed_id TEXT,
    admission_date TEXT NOT NULL,
    predicted_discharge TEXT,
    actual_discharge TEXT,
    drg_code TEXT,
    diagnosis TEXT,
    attending_physician TEXT,
    status TEXT DEFAULT 'active' CHECK(status IN ('active','discharged','transferred','deceased')),
    alos_benchmark REAL, -- DRG standard days
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (ward_id) REFERENCES wards(id),
    FOREIGN KEY (bed_id) REFERENCES beds(id)
  );

  -- ============================================================
  -- MODULE 3: CLINICAL RISK
  -- ============================================================

  -- Patient risk index
  CREATE TABLE IF NOT EXISTS patient_risk_index (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    age INTEGER,
    gender TEXT CHECK(gender IN ('M','F','Other')),
    risk_level TEXT NOT NULL DEFAULT 'low' CHECK(risk_level IN ('critical','high','moderate','low')),
    ews_score INTEGER DEFAULT 0 CHECK(ews_score >= 0 AND ews_score <= 20),
    risk_factors TEXT, -- JSON array
    primary_diagnosis TEXT,
    comorbidities TEXT, -- JSON array
    last_assessment TEXT DEFAULT (datetime('now','localtime')),
    next_assessment TEXT,
    assigned_team TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    updated_at TEXT DEFAULT (datetime('now','localtime'))
  );

  -- Vital signs for EWS calculation
  CREATE TABLE IF NOT EXISTS vital_signs (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    heart_rate INTEGER,
    systolic_bp INTEGER,
    diastolic_bp INTEGER,
    respiratory_rate INTEGER,
    temperature REAL,
    spo2 INTEGER,
    consciousness TEXT CHECK(consciousness IN ('Alert','Voice','Pain','Unresponsive')),
    urine_output REAL,
    ews_total INTEGER DEFAULT 0,
    recorded_by TEXT,
    recorded_at TEXT DEFAULT (datetime('now','localtime'))
  );

  -- ============================================================
  -- MODULE 4: SURGERY & PROCEDURES (for Revenue Leakage)
  -- ============================================================

  CREATE TABLE IF NOT EXISTS surgical_procedures (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    admission_id TEXT,
    procedure_code TEXT NOT NULL,
    procedure_name TEXT NOT NULL,
    surgeon TEXT,
    operating_room TEXT,
    start_time TEXT,
    end_time TEXT,
    supplies_used TEXT, -- JSON array
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (admission_id) REFERENCES admissions(id)
  );

  CREATE TABLE IF NOT EXISTS billing_items (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    admission_id TEXT,
    item_code TEXT NOT NULL,
    item_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price REAL NOT NULL DEFAULT 0,
    total_price REAL NOT NULL DEFAULT 0,
    category TEXT,
    billed_date TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (admission_id) REFERENCES admissions(id)
  );

  -- ============================================================
  -- MODULE 5: SECURITY & AUDIT
  -- ============================================================

  -- Users with RBAC
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('director','finance','clinical','nursing','admin')),
    department TEXT,
    is_active INTEGER DEFAULT 1,
    last_login TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  -- PDPA Audit Log
  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    patient_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT, -- JSON
    sensitivity_level TEXT DEFAULT 'normal' CHECK(sensitivity_level IN ('normal','sensitive','highly_sensitive')),
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- ============================================================
  -- INDEXES for Performance
  -- ============================================================
  CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
  CREATE INDEX IF NOT EXISTS idx_claims_payer ON claims(payer_type);
  CREATE INDEX IF NOT EXISTS idx_claims_risk ON claims(risk_score);
  CREATE INDEX IF NOT EXISTS idx_revenue_period ON revenue(year, month);
  CREATE INDEX IF NOT EXISTS idx_expenses_period ON expenses(year, month);
  CREATE INDEX IF NOT EXISTS idx_beds_status ON beds(status);
  CREATE INDEX IF NOT EXISTS idx_beds_ward ON beds(ward_id);
  CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);
  CREATE INDEX IF NOT EXISTS idx_patient_risk ON patient_risk_index(risk_level);
  CREATE INDEX IF NOT EXISTS idx_vital_signs_patient ON vital_signs(patient_id);
  CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
  CREATE INDEX IF NOT EXISTS idx_audit_date ON audit_logs(created_at);
`);

// ==================== SEED DATA ====================
console.log('🏥 Seeding BCH 360° Intelligence Database...\n');

// --- Wards ---
const wards = [
    { id: uuidv4(), name: 'Ward 1 - อายุรกรรมชาย', floor: 2, department: 'Internal Medicine', total_beds: 30, ward_type: 'General' },
    { id: uuidv4(), name: 'Ward 2 - อายุรกรรมหญิง', floor: 2, department: 'Internal Medicine', total_beds: 30, ward_type: 'General' },
    { id: uuidv4(), name: 'Ward 3 - ศัลยกรรม', floor: 3, department: 'Surgery', total_beds: 25, ward_type: 'Surgical' },
    { id: uuidv4(), name: 'Ward 4 - สูติ-นรีเวช', floor: 3, department: 'OB-GYN', total_beds: 20, ward_type: 'Maternity' },
    { id: uuidv4(), name: 'ICU', floor: 4, department: 'Critical Care', total_beds: 10, ward_type: 'ICU' },
    { id: uuidv4(), name: 'CCU', floor: 4, department: 'Cardiology', total_beds: 6, ward_type: 'CCU' },
    { id: uuidv4(), name: 'NICU', floor: 4, department: 'Pediatrics', total_beds: 8, ward_type: 'NICU' },
    { id: uuidv4(), name: 'Ward 5 - กุมารเวชกรรม', floor: 3, department: 'Pediatrics', total_beds: 15, ward_type: 'Pediatric' },
    { id: uuidv4(), name: 'Private Ward', floor: 5, department: 'VIP', total_beds: 12, ward_type: 'Private' },
    { id: uuidv4(), name: 'Isolation Ward', floor: 1, department: 'Infection Control', total_beds: 6, ward_type: 'Isolation' }
];

const insertWard = db.prepare('INSERT OR IGNORE INTO wards (id, name, floor, department, total_beds, ward_type) VALUES (?, ?, ?, ?, ?, ?)');
wards.forEach(w => insertWard.run(w.id, w.name, w.floor, w.department, w.total_beds, w.ward_type));
console.log(`✅ Wards: ${wards.length} records`);

// --- Beds ---
const bedStatuses = ['available', 'occupied', 'occupied', 'occupied', 'reserved', 'maintenance', 'cleaning'];
const insertBed = db.prepare('INSERT OR IGNORE INTO beds (id, ward_id, bed_number, status, updated_at) VALUES (?, ?, ?, ?, datetime("now","localtime"))');
let bedCount = 0;
wards.forEach(w => {
    for (let i = 1; i <= w.total_beds; i++) {
        const status = bedStatuses[Math.floor(Math.random() * bedStatuses.length)];
        insertBed.run(uuidv4(), w.id, `${w.name.split(' ')[0]}-${String(i).padStart(2, '0')}`, status);
        bedCount++;
    }
});
console.log(`✅ Beds: ${bedCount} records`);

// --- Revenue (12 months of 2025 + Jan-Feb 2026) ---
const departments = ['อายุรกรรม', 'ศัลยกรรม', 'สูติ-นรีเวช', 'กุมารเวช', 'ER', 'OPD', 'ทันตกรรม', 'จักษุ'];
const revCategories = ['OPD', 'IPD', 'ER', 'Lab', 'Imaging', 'Pharmacy', 'Surgery', 'Other'];
const payerTypes = ['UCS', 'SSS', 'CSMBS', 'Private', 'Self-pay'];
const insertRevenue = db.prepare('INSERT INTO revenue (id, department, category, amount, month, year, payer_type) VALUES (?, ?, ?, ?, ?, ?, ?)');

let revCount = 0;
for (let year = 2025; year <= 2026; year++) {
    const maxMonth = year === 2026 ? 2 : 12;
    for (let month = 1; month <= maxMonth; month++) {
        departments.forEach(dept => {
            revCategories.forEach(cat => {
                const baseAmount = Math.random() * 2000000 + 500000;
                const payer = payerTypes[Math.floor(Math.random() * payerTypes.length)];
                insertRevenue.run(uuidv4(), dept, cat, Math.round(baseAmount * 100) / 100, month, year, payer);
                revCount++;
            });
        });
    }
}
console.log(`✅ Revenue: ${revCount} records`);

// --- Expenses ---
const expCategories = ['Salary', 'Medical Supplies', 'Equipment', 'Utilities', 'Maintenance', 'Pharmacy', 'Other'];
const insertExpense = db.prepare('INSERT INTO expenses (id, department, category, amount, month, year, description) VALUES (?, ?, ?, ?, ?, ?, ?)');

let expCount = 0;
for (let year = 2025; year <= 2026; year++) {
    const maxMonth = year === 2026 ? 2 : 12;
    for (let month = 1; month <= maxMonth; month++) {
        departments.forEach(dept => {
            expCategories.forEach(cat => {
                const baseAmount = Math.random() * 1500000 + 300000;
                insertExpense.run(uuidv4(), dept, cat, Math.round(baseAmount * 100) / 100, month, year, `${cat} - ${dept}`);
                expCount++;
            });
        });
    }
}
console.log(`✅ Expenses: ${expCount} records`);

// --- Claims ---
const icd10Codes = ['I10', 'E11.9', 'J18.9', 'K35.80', 'S72.001A', 'N18.9', 'I21.9', 'J44.1', 'C34.90', 'G40.909', 'M54.5', 'O80', 'Z38.00'];
const claimStatuses = ['pending', 'submitted', 'approved', 'partially_approved', 'denied', 'approved', 'approved', 'submitted'];
const insertClaim = db.prepare('INSERT INTO claims (id, patient_id, claim_number, payer_type, icd10_primary, drg_code, total_amount, approved_amount, status, risk_score, risk_factors, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

let claimCount = 0;
for (let i = 1; i <= 500; i++) {
    const pid = `P${String(Math.floor(Math.random() * 5000) + 1).padStart(5, '0')}`;
    const payer = payerTypes[Math.floor(Math.random() * payerTypes.length)];
    const icd = icd10Codes[Math.floor(Math.random() * icd10Codes.length)];
    const total = Math.round((Math.random() * 200000 + 5000) * 100) / 100;
    const status = claimStatuses[Math.floor(Math.random() * claimStatuses.length)];
    const approved = status === 'approved' ? total : status === 'partially_approved' ? total * (0.5 + Math.random() * 0.4) : 0;
    const riskScore = Math.round(Math.random() * 100) / 100;
    const riskFactors = JSON.stringify(riskScore > 0.7 ? ['High complexity', 'Missing docs', 'Prior denial history'] : riskScore > 0.4 ? ['Moderate complexity'] : []);
    const subDate = `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;

    insertClaim.run(uuidv4(), pid, `CLM-2025-${String(i).padStart(5, '0')}`, payer, icd, `DRG-${Math.floor(Math.random() * 500) + 1}`, total, Math.round(approved * 100) / 100, status, riskScore, riskFactors, subDate);
    claimCount++;
}
console.log(`✅ Claims: ${claimCount} records`);

// --- Denial Logs ---
const denialReasons = ['เอกสารไม่ครบ', 'รหัสหัตถการไม่ตรง', 'ไม่ได้รับอนุมัติล่วงหน้า', 'สิทธิ์หมดอายุ', 'ซ้ำซ้อน', 'เกินระยะเวลาที่กำหนด'];
const denialCategories = ['Documentation', 'Coding', 'Authorization', 'Eligibility', 'Duplicate', 'Other'];
const insertDenial = db.prepare('INSERT INTO denial_logs (id, claim_id, denial_reason, denial_code, denial_category, amount_denied, appeal_status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

const deniedClaims = db.prepare("SELECT id, total_amount FROM claims WHERE status = 'denied'").all();
let denialCount = 0;
deniedClaims.forEach(c => {
    const idx = Math.floor(Math.random() * denialReasons.length);
    const appealStatus = ['none', 'pending', 'won', 'lost'][Math.floor(Math.random() * 4)];
    insertDenial.run(uuidv4(), c.id, denialReasons[idx], `D${String(idx + 1).padStart(3, '0')}`, denialCategories[idx], c.total_amount, appealStatus, 'Auto-generated denial record');
    denialCount++;
});
console.log(`✅ Denial Logs: ${denialCount} records`);

// --- Admissions ---
const physicians = ['นพ.สมชาย ใจดี', 'พญ.วรรณา รักษ์ดี', 'นพ.ประยุทธ สุขสบาย', 'พญ.กมลชนก เวชกร', 'นพ.ธนา จิตเวช'];
const diagnoses = ['Pneumonia', 'Appendicitis', 'Hip Fracture', 'Acute MI', 'COPD Exacerbation', 'DM Complications', 'CHF', 'Stroke', 'Normal Delivery', 'Sepsis'];
const insertAdmission = db.prepare('INSERT INTO admissions (id, patient_id, patient_name, ward_id, admission_date, predicted_discharge, actual_discharge, drg_code, diagnosis, attending_physician, status, alos_benchmark) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

const thaiNames = ['สมชาย สุขใจ', 'สมหญิง รักดี', 'ประยุทธ ยิ้มแย้ม', 'วรรณา เบิกบาน', 'กมลชนก สดใส', 'ธนา แก้วมณี', 'ปราณี สวัสดี', 'สมศักดิ์ มั่นคง', 'จันทรา งามงอน', 'ทองสุก รุ่งเรือง'];
let admCount = 0;
for (let i = 0; i < 120; i++) {
    const pid = `P${String(Math.floor(Math.random() * 5000) + 1).padStart(5, '0')}`;
    const name = thaiNames[Math.floor(Math.random() * thaiNames.length)];
    const ward = wards[Math.floor(Math.random() * wards.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const admDate = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0];
    const alosBench = Math.floor(Math.random() * 10) + 2;
    const predictedDays = alosBench + Math.floor(Math.random() * 3) - 1;
    const predDischarge = new Date(Date.now() - daysAgo * 86400000 + predictedDays * 86400000).toISOString().split('T')[0];
    const isActive = daysAgo < 5 || Math.random() > 0.5;
    const actDischarge = isActive ? null : new Date(Date.now() - (daysAgo - predictedDays + Math.floor(Math.random() * 3)) * 86400000).toISOString().split('T')[0];
    const status = isActive ? 'active' : 'discharged';
    const diag = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    const doc = physicians[Math.floor(Math.random() * physicians.length)];

    insertAdmission.run(uuidv4(), pid, name, ward.id, admDate, predDischarge, actDischarge, `DRG-${Math.floor(Math.random() * 500) + 1}`, diag, doc, status, alosBench);
    admCount++;
}
console.log(`✅ Admissions: ${admCount} records`);

// --- Patient Risk Index ---
const riskLevels = ['critical', 'high', 'moderate', 'low', 'low', 'moderate', 'low'];
const riskFactorsList = [
    ['Sepsis Alert', 'Multi-organ failure risk'],
    ['Respiratory Decline', 'Age > 80'],
    ['Post-surgical', 'DM Type 2'],
    ['Stable vitals'],
    ['Hypertension controlled'],
    ['Cardiac monitoring required', 'Arrhythmia'],
    ['Mild symptoms']
];
const insertRisk = db.prepare('INSERT INTO patient_risk_index (id, patient_id, patient_name, age, gender, risk_level, ews_score, risk_factors, primary_diagnosis, comorbidities, assigned_team) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

let riskCount = 0;
for (let i = 0; i < 200; i++) {
    const pid = `P${String(Math.floor(Math.random() * 5000) + 1).padStart(5, '0')}`;
    const name = thaiNames[Math.floor(Math.random() * thaiNames.length)];
    const age = Math.floor(Math.random() * 80) + 10;
    const gender = Math.random() > 0.5 ? 'M' : 'F';
    const rIdx = Math.floor(Math.random() * riskLevels.length);
    const riskLevel = riskLevels[rIdx];
    const ewsScore = riskLevel === 'critical' ? Math.floor(Math.random() * 5) + 12 :
        riskLevel === 'high' ? Math.floor(Math.random() * 4) + 7 :
            riskLevel === 'moderate' ? Math.floor(Math.random() * 3) + 4 :
                Math.floor(Math.random() * 3) + 1;
    const factors = JSON.stringify(riskFactorsList[rIdx]);
    const diag = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    const comorbidities = JSON.stringify(age > 60 ? ['Hypertension', 'DM Type 2'] : ['None']);
    const team = `Team ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`;

    insertRisk.run(uuidv4(), pid, name, age, gender, riskLevel, ewsScore, factors, diag, comorbidities, team);
    riskCount++;
}
console.log(`✅ Patient Risk Index: ${riskCount} records`);

// --- Vital Signs ---
const insertVital = db.prepare('INSERT INTO vital_signs (id, patient_id, heart_rate, systolic_bp, diastolic_bp, respiratory_rate, temperature, spo2, consciousness, ews_total, recorded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

let vitalCount = 0;
const consciousness = ['Alert', 'Alert', 'Alert', 'Voice', 'Pain', 'Unresponsive'];
for (let i = 0; i < 1000; i++) {
    const pid = `P${String(Math.floor(Math.random() * 200) + 1).padStart(5, '0')}`;
    const hr = Math.floor(Math.random() * 80) + 50;
    const sbp = Math.floor(Math.random() * 80) + 90;
    const dbp = Math.floor(Math.random() * 40) + 50;
    const rr = Math.floor(Math.random() * 20) + 10;
    const temp = Math.round((Math.random() * 3 + 35.5) * 10) / 10;
    const spo2 = Math.floor(Math.random() * 10) + 90;
    const con = consciousness[Math.floor(Math.random() * consciousness.length)];
    const hoursAgo = Math.floor(Math.random() * 72);
    const recordedAt = new Date(Date.now() - hoursAgo * 3600000).toISOString().replace('T', ' ').substr(0, 19);

    // Calculate EWS
    let ews = 0;
    if (hr < 40 || hr > 130) ews += 3; else if (hr < 50 || hr > 110) ews += 2; else if (hr > 90) ews += 1;
    if (sbp < 90 || sbp > 220) ews += 3; else if (sbp < 100) ews += 2; else if (sbp < 110) ews += 1;
    if (rr < 8 || rr > 25) ews += 3; else if (rr > 21) ews += 2; else if (rr > 20) ews += 1;
    if (temp < 35 || temp > 39) ews += 3; else if (temp < 36 || temp > 38.5) ews += 2; else if (temp > 38) ews += 1;
    if (spo2 < 91) ews += 3; else if (spo2 < 93) ews += 2; else if (spo2 < 95) ews += 1;
    if (con === 'Unresponsive') ews += 3; else if (con === 'Pain') ews += 2; else if (con === 'Voice') ews += 1;

    insertVital.run(uuidv4(), pid, hr, sbp, dbp, rr, temp, spo2, con, ews, recordedAt);
    vitalCount++;
}
console.log(`✅ Vital Signs: ${vitalCount} records`);

// --- Surgical Procedures & Billing (for Revenue Leakage Detection) ---
const procedures = [
    { code: 'ICD9-47.0', name: 'Appendectomy' },
    { code: 'ICD9-51.22', name: 'Cholecystectomy' },
    { code: 'ICD9-81.51', name: 'Total Hip Replacement' },
    { code: 'ICD9-36.1', name: 'CABG' },
    { code: 'ICD9-68.4', name: 'Total Hysterectomy' },
    { code: 'ICD9-79.3', name: 'Open Reduction Internal Fixation' },
    { code: 'ICD9-39.61', name: 'Extracorporeal Circulation' },
    { code: 'ICD9-03.09', name: 'Spinal Decompression' }
];

const insertSurgery = db.prepare('INSERT INTO surgical_procedures (id, patient_id, admission_id, procedure_code, procedure_name, surgeon, operating_room, start_time, end_time, supplies_used) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
const insertBilling = db.prepare('INSERT INTO billing_items (id, patient_id, admission_id, item_code, item_name, quantity, unit_price, total_price, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

const activeAdmissions = db.prepare("SELECT id, patient_id FROM admissions LIMIT 60").all();
let surgCount = 0, billCount = 0;

activeAdmissions.forEach((adm, idx) => {
    const proc = procedures[Math.floor(Math.random() * procedures.length)];
    const supplies = ['Surgical gloves', 'Sutures', 'Implant', 'Catheter', 'Bandage'];
    const usedSupplies = supplies.slice(0, Math.floor(Math.random() * 4) + 1);

    insertSurgery.run(uuidv4(), adm.patient_id, adm.id, proc.code, proc.name, physicians[Math.floor(Math.random() * physicians.length)], `OR-${Math.floor(Math.random() * 5) + 1}`, '08:00', '11:30', JSON.stringify(usedSupplies));
    surgCount++;

    // Bill some items — intentionally skip some to create "leakage"
    const shouldHaveLeakage = idx % 5 === 0; // 20% have missing bills
    if (!shouldHaveLeakage) {
        insertBilling.run(uuidv4(), adm.patient_id, adm.id, proc.code, proc.name, 1, 50000, 50000, 'Surgery');
        billCount++;
    }
    // Always bill supplies (except some for leakage)
    usedSupplies.forEach(s => {
        if (Math.random() > 0.15) { // 15% chance of missing supply billing
            const price = Math.floor(Math.random() * 5000) + 500;
            insertBilling.run(uuidv4(), adm.patient_id, adm.id, `SUP-${Math.floor(Math.random() * 100)}`, s, 1, price, price, 'Supplies');
            billCount++;
        }
    });
});
console.log(`✅ Surgical Procedures: ${surgCount} records`);
console.log(`✅ Billing Items: ${billCount} records`);

// --- Users (default) ---
import bcryptjs from 'bcryptjs';
const hashPassword = (pwd) => bcryptjs.hashSync(pwd, 10);
const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, username, password_hash, full_name, role, department) VALUES (?, ?, ?, ?, ?, ?)');
const defaultUsers = [
    { username: 'director', password: 'bch2026!', fullName: 'ผอ.สมชาย รักษ์ดี', role: 'director', dept: 'Executive' },
    { username: 'finance1', password: 'bch2026!', fullName: 'คุณวรรณา การเงิน', role: 'finance', dept: 'Finance' },
    { username: 'clinical1', password: 'bch2026!', fullName: 'พญ.กมลชนก เวชกร', role: 'clinical', dept: 'Clinical' },
    { username: 'nurse1', password: 'bch2026!', fullName: 'คุณปราณี พยาบาลดี', role: 'nursing', dept: 'Nursing' },
    { username: 'admin', password: 'bch2026!', fullName: 'Admin System', role: 'admin', dept: 'IT' }
];
defaultUsers.forEach(u => insertUser.run(uuidv4(), u.username, hashPassword(u.password), u.fullName, u.role, u.dept));
console.log(`✅ Users: ${defaultUsers.length} records`);

console.log('\n🎉 Database seeded successfully!\n');
db.close();
