// ============================================================
// BCH 360° Intelligence V.10 — Database Setup & Hardening
// Run once on MySQL Slave1 to set up security + performance
// ============================================================
// Usage: node scripts/db_setup_hardening.js
//
// ⚠️ REQUIRES: MySQL root or admin user with GRANT privileges
//    This script sets up the read-only user and performance indices
// ============================================================
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser
function loadEnv() {
    const envPath = path.join(__dirname, '../.env');
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env file not found at:', envPath);
        process.exit(1);
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            env[parts[0].trim()] = parts.slice(1).join('=').trim();
        }
    });
    return env;
}

const env = loadEnv();

async function setup() {
    console.log('🔐 BCH 360° Database Hardening & Optimization Script');
    console.log('━'.repeat(55));

    const connection = await mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_DB,
        port: parseInt(env.MYSQL_PORT) || 3306
    });

    try {
        console.log(`📡 Connected to ${env.MYSQL_HOST}/${env.MYSQL_DB}`);
        const [versionRow] = await connection.query('SELECT VERSION() as v');
        console.log(`   MySQL Version: ${versionRow[0].v}\n`);

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SECTION 1: Read-Only User Verification
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        console.log('🔐 Section 1: Read-Only User Verification');
        console.log('─'.repeat(45));

        // Check current user privileges
        try {
            const [grants] = await connection.query(`SHOW GRANTS FOR CURRENT_USER()`);
            console.log('   Current user grants:');
            grants.forEach(g => {
                const grant = Object.values(g)[0];
                console.log(`   → ${grant}`);
                // Check if user has write privileges
                if (/INSERT|UPDATE|DELETE|CREATE|DROP|ALTER/i.test(grant) && !/GRANT OPTION/i.test(grant)) {
                    console.log('   ⚠️ WARNING: Current user has WRITE privileges!');
                    console.log('   📌 Recommended: Create SELECT-ONLY user');
                    console.log(`
   ┌─────────────────────────────────────────────────────┐
   │ SQL to create SELECT-ONLY user (run as root):       │
   │                                                     │
   │ CREATE USER 'bch_readonly'@'%'                      │
   │   IDENTIFIED BY 'BCH_R3adOnly_2026!';               │
   │                                                     │
   │ GRANT SELECT ON ${env.MYSQL_DB}.* TO               │
   │   'bch_readonly'@'%';                               │
   │                                                     │
   │ -- Set max execution time globally:                  │
   │ SET GLOBAL MAX_EXECUTION_TIME = 10000;               │
   │                                                     │
   │ -- Limit connections:                                │
   │ ALTER USER 'bch_readonly'@'%'                        │
   │   WITH MAX_USER_CONNECTIONS 30;                      │
   │                                                     │
   │ FLUSH PRIVILEGES;                                    │
   └─────────────────────────────────────────────────────┘
`);
                }
            });
        } catch (e) {
            console.log(`   ⚠️ Cannot check grants: ${e.message}`);
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SECTION 2: Performance Indices
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        console.log('\n📊 Section 2: Performance Indices');
        console.log('─'.repeat(45));

        const indices = [
            // Core Dashboard Indices
            { table: 'ovst', name: 'idx_vstdate_dep', cols: '(vstdate, main_dep)', desc: 'Dashboard OPD speed' },
            { table: 'ovst', name: 'idx_ovst_vstdate', cols: '(vstdate)', desc: 'Date-range queries' },
            { table: 'vn_stat', name: 'idx_vnstat_vstdate_income', cols: '(vstdate, income)', desc: 'Revenue aggregation' },
            { table: 'vn_stat', name: 'idx_vnstat_vn', cols: '(vn)', desc: 'VN lookup' },

            // Service Time (OPD Wait Time)
            { table: 'service_time', name: 'idx_vn_service', cols: '(vn, service1, service2, service7)', desc: 'Wait time calc' },

            // IPD Indices
            { table: 'ipt', name: 'idx_ipt_dchdate', cols: '(dchdate)', desc: 'IPD discharge queries' },
            { table: 'ipt', name: 'idx_ipt_ward_dch', cols: '(ward, dchdate)', desc: 'Ward discharge stats' },
            { table: 'ipt', name: 'idx_ipt_hn_regdate', cols: '(hn, regdate)', desc: 'Readmission detection' },
            { table: 'an_stat', name: 'idx_anstat_dchdate', cols: '(dchdate)', desc: 'Discharge revenue' },
            { table: 'an_stat', name: 'idx_anstat_an', cols: '(an)', desc: 'AN lookup' },

            // ER Indices
            { table: 'er_regist', name: 'idx_er_vstdate', cols: '(vstdate)', desc: 'ER daily queries' },

            // Diagnosis Coding
            { table: 'ovstdiag', name: 'idx_ovstdiag_vstdate', cols: '(vstdate)', desc: 'Coding audit' },
            { table: 'ovstdiag', name: 'idx_ovstdiag_vn', cols: '(vn)', desc: 'Visit diagnosis lookup' },
            { table: 'iptdiag', name: 'idx_iptdiag_an', cols: '(an)', desc: 'IPD diagnosis lookup' },
            { table: 'iptdiag', name: 'idx_iptdiag_modify', cols: '(modify_datetime)', desc: 'Coder productivity' },

            // Revenue Items (opitemrece — HEAVIEST table)
            { table: 'opitemrece', name: 'idx_opitemrece_vstdate', cols: '(vstdate)', desc: 'Revenue by date' },
            { table: 'opitemrece', name: 'idx_opitemrece_vn', cols: '(vn)', desc: 'Visit item lookup' },

            // Patient
            { table: 'patient', name: 'idx_patient_hn', cols: '(hn)', desc: 'Patient lookup' },

            // Receipt
            { table: 'rcpt_print', name: 'idx_rcpt_vn', cols: '(vn)', desc: 'Receipt lookup for OPD flow' },

            // Lab
            { table: 'lab_head', name: 'idx_labhead_hn_date', cols: '(hn, order_date)', desc: 'Lab order lookup' },
        ];

        let created = 0, existing = 0, failed = 0;

        for (const idx of indices) {
            try {
                await connection.query(`CREATE INDEX ${idx.name} ON ${idx.table} ${idx.cols}`);
                console.log(`   ✅ Created: ${idx.table}.${idx.name} — ${idx.desc}`);
                created++;
            } catch (err) {
                if (err.code === 'ER_DUP_KEYNAME') {
                    console.log(`   ⏭️ Exists: ${idx.table}.${idx.name}`);
                    existing++;
                } else if (err.code === 'ER_KEY_COLUMN_DOES_NOT_EXITS' || err.errno === 1072) {
                    console.log(`   ⚠️ Skipped: ${idx.table}.${idx.name} — column not found`);
                    failed++;
                } else {
                    console.log(`   ❌ Failed: ${idx.table}.${idx.name} — ${err.message}`);
                    failed++;
                }
            }
        }

        console.log(`\n   Summary: ${created} created, ${existing} existing, ${failed} failed`);

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SECTION 3: Connection & Session Settings
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        console.log('\n⚙️ Section 3: Session Settings');
        console.log('─'.repeat(45));

        // Check global max_execution_time
        try {
            const [maxExec] = await connection.query("SHOW VARIABLES LIKE 'max_execution_time'");
            console.log(`   max_execution_time: ${maxExec[0]?.Value || 'not set'}ms`);
            if (parseInt(maxExec[0]?.Value || 0) === 0 || parseInt(maxExec[0]?.Value || 0) > 10000) {
                console.log(`   📌 Recommended: SET GLOBAL max_execution_time = 10000;`);
            }
        } catch (e) {
            console.log(`   ⚠️ Cannot check max_execution_time: ${e.message}`);
        }

        // Check read_only status
        try {
            const [readOnly] = await connection.query("SHOW VARIABLES LIKE 'read_only'");
            console.log(`   read_only: ${readOnly[0]?.Value || 'OFF'}`);
            if (readOnly[0]?.Value !== 'ON') {
                console.log(`   📌 Recommended for Slave: SET GLOBAL read_only = ON;`);
            }
        } catch (e) {
            console.log(`   ⚠️ Cannot check read_only: ${e.message}`);
        }

        // Check super_read_only (MySQL 5.7.8+)
        try {
            const [superRO] = await connection.query("SHOW VARIABLES LIKE 'super_read_only'");
            console.log(`   super_read_only: ${superRO[0]?.Value || 'N/A'}`);
        } catch { /* older MySQL */ }

        // Check slow query log
        try {
            const [slowLog] = await connection.query("SHOW VARIABLES LIKE 'slow_query_log'");
            const [longQT] = await connection.query("SHOW VARIABLES LIKE 'long_query_time'");
            console.log(`   slow_query_log: ${slowLog[0]?.Value || 'OFF'}`);
            console.log(`   long_query_time: ${longQT[0]?.Value || '10'}s`);
            if (slowLog[0]?.Value !== 'ON') {
                console.log(`   📌 Recommended: SET GLOBAL slow_query_log = ON; SET GLOBAL long_query_time = 3;`);
            }
        } catch (e) {
            console.log(`   ⚠️ Cannot check slow log: ${e.message}`);
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SECTION 4: Table Statistics
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        console.log('\n📈 Section 4: Table Size Statistics');
        console.log('─'.repeat(45));

        const heavyTables = ['ovst', 'vn_stat', 'opitemrece', 'ipt', 'an_stat', 'er_regist', 'ovstdiag', 'iptdiag', 'patient', 'lab_head', 'lab_order', 'service_time', 'rcpt_print'];
        for (const tbl of heavyTables) {
            try {
                const [info] = await connection.query(`
                    SELECT TABLE_ROWS as rows, 
                           ROUND(DATA_LENGTH / 1048576, 1) as data_mb,
                           ROUND(INDEX_LENGTH / 1048576, 1) as index_mb
                    FROM information_schema.TABLES 
                    WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
                `, [env.MYSQL_DB, tbl]);
                if (info[0]) {
                    console.log(`   ${tbl.padEnd(15)} ${String(info[0].rows || 0).padStart(12)} rows  |  Data: ${String(info[0].data_mb).padStart(6)} MB  |  Index: ${String(info[0].index_mb).padStart(6)} MB`);
                }
            } catch { /* skip */ }
        }

        console.log('\n' + '━'.repeat(55));
        console.log('✅ Database Hardening Complete!');
        console.log('━'.repeat(55));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await connection.end();
        process.exit();
    }
}

setup();
