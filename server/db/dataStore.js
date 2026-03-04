// ============================================================
// BCH 360° Intelligence V.10 - In-Memory Data Store
// Replaces SQLite — all data lives in memory
// ============================================================
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// ==================== DATA STORE ====================
const store = {
    wards: [],
    beds: [],
    revenue: [],
    expenses: [],
    claims: [],
    denial_logs: [],
    admissions: [],
    patient_risk_index: [],
    vital_signs: [],
    surgical_procedures: [],
    billing_items: [],
    users: [],
    audit_logs: []
};

// ==================== SEED ====================
function seed() {
    console.log('🏥 Initializing BCH 360° Intelligence Data Store...\n');

    // --- Wards ---
    const wardDefs = [
        { name: 'Ward 1 - อายุรกรรมชาย', floor: 2, department: 'Internal Medicine', total_beds: 30, ward_type: 'General' },
        { name: 'Ward 2 - อายุรกรรมหญิง', floor: 2, department: 'Internal Medicine', total_beds: 30, ward_type: 'General' },
        { name: 'Ward 3 - ศัลยกรรม', floor: 3, department: 'Surgery', total_beds: 25, ward_type: 'Surgical' },
        { name: 'Ward 4 - สูติ-นรีเวช', floor: 3, department: 'OB-GYN', total_beds: 20, ward_type: 'Maternity' },
        { name: 'ICU', floor: 4, department: 'Critical Care', total_beds: 10, ward_type: 'ICU' },
        { name: 'CCU', floor: 4, department: 'Cardiology', total_beds: 6, ward_type: 'CCU' },
        { name: 'NICU', floor: 4, department: 'Pediatrics', total_beds: 8, ward_type: 'NICU' },
        { name: 'Ward 5 - กุมารเวชกรรม', floor: 3, department: 'Pediatrics', total_beds: 15, ward_type: 'Pediatric' },
        { name: 'Private Ward', floor: 5, department: 'VIP', total_beds: 12, ward_type: 'Private' },
        { name: 'Isolation Ward', floor: 1, department: 'Infection Control', total_beds: 6, ward_type: 'Isolation' }
    ];
    wardDefs.forEach(w => {
        store.wards.push({ id: uuidv4(), ...w });
    });
    console.log(`✅ Wards: ${store.wards.length}`);

    // --- Beds ---
    const bedStatuses = ['available', 'occupied', 'occupied', 'occupied', 'reserved', 'maintenance', 'cleaning'];
    store.wards.forEach(w => {
        for (let i = 1; i <= w.total_beds; i++) {
            store.beds.push({
                id: uuidv4(),
                ward_id: w.id,
                bed_number: `${w.name.split(' ')[0]}-${String(i).padStart(2, '0')}`,
                status: bedStatuses[Math.floor(Math.random() * bedStatuses.length)],
                patient_id: null,
                updated_at: new Date().toISOString()
            });
        }
    });
    console.log(`✅ Beds: ${store.beds.length}`);

    // --- Revenue ---
    const departments = ['อายุรกรรม', 'ศัลยกรรม', 'สูติ-นรีเวช', 'กุมารเวช', 'ER', 'OPD', 'ทันตกรรม', 'จักษุ'];
    const revCategories = ['OPD', 'IPD', 'ER', 'Lab', 'Imaging', 'Pharmacy', 'Surgery', 'Other'];
    const payerTypes = ['UCS', 'SSS', 'CSMBS', 'Private', 'Self-pay'];
    for (let year = 2025; year <= 2026; year++) {
        const maxMonth = year === 2026 ? 2 : 12;
        for (let month = 1; month <= maxMonth; month++) {
            departments.forEach(dept => {
                revCategories.forEach(cat => {
                    store.revenue.push({
                        id: uuidv4(), department: dept, category: cat,
                        amount: Math.round((Math.random() * 2000000 + 500000) * 100) / 100,
                        month, year,
                        payer_type: payerTypes[Math.floor(Math.random() * payerTypes.length)]
                    });
                });
            });
        }
    }
    console.log(`✅ Revenue: ${store.revenue.length}`);

    // --- Expenses ---
    const expCategories = ['Salary', 'Medical Supplies', 'Equipment', 'Utilities', 'Maintenance', 'Pharmacy', 'Other'];
    for (let year = 2025; year <= 2026; year++) {
        const maxMonth = year === 2026 ? 2 : 12;
        for (let month = 1; month <= maxMonth; month++) {
            departments.forEach(dept => {
                expCategories.forEach(cat => {
                    store.expenses.push({
                        id: uuidv4(), department: dept, category: cat,
                        amount: Math.round((Math.random() * 1500000 + 300000) * 100) / 100,
                        month, year, description: `${cat} - ${dept}`
                    });
                });
            });
        }
    }
    console.log(`✅ Expenses: ${store.expenses.length}`);

    // --- Claims ---
    const icd10Codes = ['I10', 'E11.9', 'J18.9', 'K35.80', 'S72.001A', 'N18.9', 'I21.9', 'J44.1', 'C34.90', 'G40.909', 'M54.5', 'O80', 'Z38.00'];
    const claimStatuses = ['pending', 'submitted', 'approved', 'partially_approved', 'denied', 'approved', 'approved', 'submitted'];
    for (let i = 1; i <= 500; i++) {
        const payer = payerTypes[Math.floor(Math.random() * payerTypes.length)];
        const total = Math.round((Math.random() * 200000 + 5000) * 100) / 100;
        const status = claimStatuses[Math.floor(Math.random() * claimStatuses.length)];
        const approved = status === 'approved' ? total : status === 'partially_approved' ? Math.round(total * (0.5 + Math.random() * 0.4) * 100) / 100 : 0;
        const riskScore = Math.round(Math.random() * 100) / 100;

        store.claims.push({
            id: uuidv4(),
            patient_id: `P${String(Math.floor(Math.random() * 5000) + 1).padStart(5, '0')}`,
            claim_number: `CLM-2025-${String(i).padStart(5, '0')}`,
            payer_type: payer,
            icd10_primary: icd10Codes[Math.floor(Math.random() * icd10Codes.length)],
            icd10_secondary: Math.random() > 0.4 ? icd10Codes[Math.floor(Math.random() * icd10Codes.length)] : null,
            drg_code: `DRG-${Math.floor(Math.random() * 500) + 1}`,
            total_amount: total,
            approved_amount: approved,
            status, risk_score: riskScore,
            risk_factors: riskScore > 0.7 ? ['High complexity', 'Missing docs', 'Prior denial'] : riskScore > 0.4 ? ['Moderate complexity'] : [],
            submission_date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
        });
    }
    console.log(`✅ Claims: ${store.claims.length}`);

    // --- Denial Logs ---
    const denialReasons = ['เอกสารไม่ครบ', 'รหัสหัตถการไม่ตรง', 'ไม่ได้รับอนุมัติล่วงหน้า', 'สิทธิ์หมดอายุ', 'ซ้ำซ้อน', 'เกินระยะเวลา'];
    const denialCategories = ['Documentation', 'Coding', 'Authorization', 'Eligibility', 'Duplicate', 'Other'];
    store.claims.filter(c => c.status === 'denied').forEach(c => {
        const idx = Math.floor(Math.random() * denialReasons.length);
        store.denial_logs.push({
            id: uuidv4(), claim_id: c.id,
            denial_reason: denialReasons[idx],
            denial_code: `D${String(idx + 1).padStart(3, '0')}`,
            denial_category: denialCategories[idx],
            amount_denied: c.total_amount,
            appeal_status: ['none', 'pending', 'won', 'lost'][Math.floor(Math.random() * 4)]
        });
    });
    console.log(`✅ Denial Logs: ${store.denial_logs.length}`);

    // --- Admissions ---
    const physicians = ['นพ.สมชาย ใจดี', 'พญ.วรรณา รักษ์ดี', 'นพ.ประยุทธ สุขสบาย', 'พญ.กมลชนก เวชกร', 'นพ.ธนา จิตเวช'];
    const diagnoses = ['Pneumonia', 'Appendicitis', 'Hip Fracture', 'Acute MI', 'COPD Exacerbation', 'DM Complications', 'CHF', 'Stroke', 'Normal Delivery', 'Sepsis'];
    const thaiNames = ['สมชาย สุขใจ', 'สมหญิง รักดี', 'ประยุทธ ยิ้มแย้ม', 'วรรณา เบิกบาน', 'กมลชนก สดใส', 'ธนา แก้วมณี', 'ปราณี สวัสดี', 'สมศักดิ์ มั่นคง', 'จันทรา งามงอน', 'ทองสุก รุ่งเรือง', 'สุดา สุขสม', 'มนตรี เกษม', 'นภา พิมพ์ใจ', 'วิชัย สร้างสรรค์', 'อนงค์ ชื่นใจ'];

    for (let i = 0; i < 120; i++) {
        const ward = store.wards[Math.floor(Math.random() * store.wards.length)];
        const daysAgo = Math.floor(Math.random() * 30);
        const admDate = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0];
        const alosBench = Math.floor(Math.random() * 10) + 2;
        const predictedDays = alosBench + Math.floor(Math.random() * 3) - 1;
        const predDischarge = new Date(Date.now() - daysAgo * 86400000 + predictedDays * 86400000).toISOString().split('T')[0];
        const isActive = daysAgo < 5 || Math.random() > 0.5;
        const actDischarge = isActive ? null : new Date(Date.now() - (daysAgo - predictedDays + Math.floor(Math.random() * 3)) * 86400000).toISOString().split('T')[0];

        store.admissions.push({
            id: uuidv4(),
            patient_id: `P${String(Math.floor(Math.random() * 5000) + 1).padStart(5, '0')}`,
            patient_name: thaiNames[Math.floor(Math.random() * thaiNames.length)],
            ward_id: ward.id,
            admission_date: admDate,
            predicted_discharge: predDischarge,
            actual_discharge: actDischarge,
            drg_code: `DRG-${Math.floor(Math.random() * 500) + 1}`,
            diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
            attending_physician: physicians[Math.floor(Math.random() * physicians.length)],
            status: isActive ? 'active' : 'discharged',
            alos_benchmark: alosBench
        });
    }
    console.log(`✅ Admissions: ${store.admissions.length}`);

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

    for (let i = 0; i < 200; i++) {
        const age = Math.floor(Math.random() * 80) + 10;
        const rIdx = Math.floor(Math.random() * riskLevels.length);
        const riskLevel = riskLevels[rIdx];
        const ewsScore = riskLevel === 'critical' ? Math.floor(Math.random() * 5) + 12 :
            riskLevel === 'high' ? Math.floor(Math.random() * 4) + 7 :
                riskLevel === 'moderate' ? Math.floor(Math.random() * 3) + 4 :
                    Math.floor(Math.random() * 3) + 1;

        store.patient_risk_index.push({
            id: uuidv4(),
            patient_id: `P${String(Math.floor(Math.random() * 5000) + 1).padStart(5, '0')}`,
            patient_name: thaiNames[Math.floor(Math.random() * thaiNames.length)],
            age, gender: Math.random() > 0.5 ? 'M' : 'F',
            risk_level: riskLevel,
            ews_score: ewsScore,
            risk_factors: riskFactorsList[rIdx],
            primary_diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
            comorbidities: age > 60 ? ['Hypertension', 'DM Type 2'] : ['None'],
            assigned_team: `Team ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`
        });
    }
    console.log(`✅ Patient Risk: ${store.patient_risk_index.length}`);

    // --- Vital Signs ---
    const consciousness = ['Alert', 'Alert', 'Alert', 'Voice', 'Pain', 'Unresponsive'];
    for (let i = 0; i < 1000; i++) {
        const hr = Math.floor(Math.random() * 80) + 50;
        const sbp = Math.floor(Math.random() * 80) + 90;
        const dbp = Math.floor(Math.random() * 40) + 50;
        const rr = Math.floor(Math.random() * 20) + 10;
        const temp = Math.round((Math.random() * 3 + 35.5) * 10) / 10;
        const spo2 = Math.floor(Math.random() * 10) + 90;
        const con = consciousness[Math.floor(Math.random() * consciousness.length)];
        let ews = 0;
        if (hr < 40 || hr > 130) ews += 3; else if (hr < 50 || hr > 110) ews += 2; else if (hr > 90) ews += 1;
        if (sbp < 90 || sbp > 220) ews += 3; else if (sbp < 100) ews += 2; else if (sbp < 110) ews += 1;
        if (rr < 8 || rr > 25) ews += 3; else if (rr > 21) ews += 2; else if (rr > 20) ews += 1;
        if (temp < 35 || temp > 39) ews += 3; else if (temp < 36 || temp > 38.5) ews += 2; else if (temp > 38) ews += 1;
        if (spo2 < 91) ews += 3; else if (spo2 < 93) ews += 2; else if (spo2 < 95) ews += 1;
        if (con === 'Unresponsive') ews += 3; else if (con === 'Pain') ews += 2; else if (con === 'Voice') ews += 1;

        const hoursAgo = Math.floor(Math.random() * 72);
        store.vital_signs.push({
            id: uuidv4(),
            patient_id: `P${String(Math.floor(Math.random() * 200) + 1).padStart(5, '0')}`,
            heart_rate: hr, systolic_bp: sbp, diastolic_bp: dbp,
            respiratory_rate: rr, temperature: temp, spo2, consciousness: con,
            ews_total: ews,
            recorded_at: new Date(Date.now() - hoursAgo * 3600000).toISOString()
        });
    }
    console.log(`✅ Vital Signs: ${store.vital_signs.length}`);

    // --- Surgical Procedures & Billing ---
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
    const supplies = ['Surgical gloves', 'Sutures', 'Implant', 'Catheter', 'Bandage'];

    store.admissions.slice(0, 60).forEach((adm, idx) => {
        const proc = procedures[Math.floor(Math.random() * procedures.length)];
        const usedSupplies = supplies.slice(0, Math.floor(Math.random() * 4) + 1);

        store.surgical_procedures.push({
            id: uuidv4(), patient_id: adm.patient_id, admission_id: adm.id,
            procedure_code: proc.code, procedure_name: proc.name,
            surgeon: physicians[Math.floor(Math.random() * physicians.length)],
            operating_room: `OR-${Math.floor(Math.random() * 5) + 1}`,
            start_time: '08:00', end_time: '11:30',
            supplies_used: usedSupplies
        });

        const shouldHaveLeakage = idx % 5 === 0;
        if (!shouldHaveLeakage) {
            store.billing_items.push({
                id: uuidv4(), patient_id: adm.patient_id, admission_id: adm.id,
                item_code: proc.code, item_name: proc.name,
                quantity: 1, unit_price: 50000, total_price: 50000, category: 'Surgery'
            });
        }
        usedSupplies.forEach(s => {
            if (Math.random() > 0.15) {
                const price = Math.floor(Math.random() * 5000) + 500;
                store.billing_items.push({
                    id: uuidv4(), patient_id: adm.patient_id, admission_id: adm.id,
                    item_code: `SUP-${Math.floor(Math.random() * 100)}`, item_name: s,
                    quantity: 1, unit_price: price, total_price: price, category: 'Supplies'
                });
            }
        });
    });
    console.log(`✅ Procedures: ${store.surgical_procedures.length}`);
    console.log(`✅ Billing: ${store.billing_items.length}`);

    // --- Users ---
    const defaultUsers = [
        { username: 'director', password: 'bch2026!', full_name: 'ผอ.สมชาย รักษ์ดี', role: 'director', department: 'Executive' },
        { username: 'finance1', password: 'bch2026!', full_name: 'คุณวรรณา การเงิน', role: 'finance', department: 'Finance' },
        { username: 'clinical1', password: 'bch2026!', full_name: 'พญ.กมลชนก เวชกร', role: 'clinical', department: 'Clinical' },
        { username: 'nurse1', password: 'bch2026!', full_name: 'คุณปราณี พยาบาลดี', role: 'nursing', department: 'Nursing' },
        { username: 'admin', password: 'bch2026!', full_name: 'Admin System', role: 'admin', department: 'IT' }
    ];
    defaultUsers.forEach(u => {
        store.users.push({
            id: uuidv4(), username: u.username,
            password_hash: bcrypt.hashSync(u.password, 10),
            full_name: u.full_name, role: u.role, department: u.department,
            is_active: true, last_login: null
        });
    });
    console.log(`✅ Users: ${store.users.length}`);
    console.log('\n🎉 Data Store initialized successfully!\n');
}

// Initialize on import
seed();

// ==================== QUERY HELPERS ====================
export function query(table) { return store[table] || []; }

export function find(table, predicate) {
    return (store[table] || []).filter(predicate);
}

export function findOne(table, predicate) {
    return (store[table] || []).find(predicate);
}

export function insert(table, record) {
    if (!record.id) record.id = uuidv4();
    if (!store[table]) store[table] = [];
    store[table].push(record);
    return record;
}

export function update(table, id, changes) {
    const arr = store[table] || [];
    const idx = arr.findIndex(r => r.id === id);
    if (idx >= 0) { arr[idx] = { ...arr[idx], ...changes }; return arr[idx]; }
    return null;
}

export function count(table, predicate) {
    if (!predicate) return (store[table] || []).length;
    return (store[table] || []).filter(predicate).length;
}

export function sum(table, field, predicate) {
    let items = store[table] || [];
    if (predicate) items = items.filter(predicate);
    return items.reduce((s, r) => s + (r[field] || 0), 0);
}

export function avg(table, field, predicate) {
    let items = store[table] || [];
    if (predicate) items = items.filter(predicate);
    if (items.length === 0) return 0;
    return items.reduce((s, r) => s + (r[field] || 0), 0) / items.length;
}

export function groupBy(table, field, predicate) {
    let items = store[table] || [];
    if (predicate) items = items.filter(predicate);
    const groups = {};
    items.forEach(r => {
        const key = r[field];
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
    });
    return groups;
}

export default store;
