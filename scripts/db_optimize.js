import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser to avoid external dependency
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

async function optimize() {
  console.log('🚀 Starting Database Optimization for BCH 360° (Zero-Dep ESM)...');

  const connection = await mysql.createConnection({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASS,
    database: env.MYSQL_DB,
    port: parseInt(env.MYSQL_PORT) || 3306,
  });

  try {
    console.log(`📡 Connected to HOSxP XE Slave (${env.MYSQL_HOST})...`);

    // 1. ovst index for dashboard speed
    console.log('⌛ Adding index to ovst(vstdate, main_dep)...');
    await connection
      .query(
        `
            CREATE INDEX IF NOT EXISTS idx_vstdate_dep ON ovst (vstdate, main_dep)
        `
      )
      .catch(async err => {
        // Fallback for MySQL < 8.0.28 or older versions that don't support IF NOT EXISTS in CREATE INDEX
        if (err.code === 'ER_DUP_KEYNAME') return;
        await connection.query(`ALTER TABLE ovst ADD INDEX idx_vstdate_dep (vstdate, main_dep)`);
      })
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ ovst index info:', err.message);
      });

    // 2. service_time index for wait time calculation
    console.log('⌛ Adding index to service_time(vn, service1, service2, service7)...');
    await connection
      .query(
        `
            CREATE INDEX IF NOT EXISTS idx_vn_service ON service_time (vn, service1, service2, service7)
        `
      )
      .catch(async err => {
        await connection.query(
          `ALTER TABLE service_time ADD INDEX idx_vn_service (vn, service1, service2, service7)`
        );
      })
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ service_time index info:', err.message);
      });

    // 3. Ensuring unique index on service_time for data integrity
    console.log('⌛ Checking service_time unique constraints...');
    await connection
      .query(
        `
            CREATE UNIQUE INDEX IF NOT EXISTS idx_vn_unique ON service_time (vn)
        `
      )
      .catch(async err => {
        await connection.query(`ALTER TABLE service_time ADD UNIQUE INDEX idx_vn_unique (vn)`);
      })
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ service_time unique index info:', err.message);
      });

    // 4. IPD performance indexes
    console.log('⌛ Adding IPD performance indexes...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_ipt_dchdate ON ipt (dchdate)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ ipt dchdate index info:', err.message);
      });
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_ipt_regdate ON ipt (regdate)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ ipt regdate index info:', err.message);
      });
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_ipt_ward ON ipt (ward)`).catch(err => {
      if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ ipt ward index info:', err.message);
    });

    // 5. AN_STAT performance indexes
    console.log('⌛ Adding AN_STAT performance indexes...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_an_stat_an ON an_stat (an)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ an_stat an index info:', err.message);
      });
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_an_stat_income ON an_stat (income)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ an_stat income index info:', err.message);
      });

    // 6. Lab performance indexes
    console.log('⌛ Adding lab performance indexes...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_lab_head_order_date ON lab_head (order_date)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ lab_head order_date index info:', err.message);
      });
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_lab_head_report_date ON lab_head (report_date)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ lab_head report_date index info:', err.message);
      });

    // 7. X-ray performance indexes
    console.log('⌛ Adding x-ray performance indexes...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_xray_head_order_date ON xray_head (order_date)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ xray_head order_date index info:', err.message);
      });

    // 8. Assessment performance indexes
    console.log('⌛ Adding assessment performance indexes...');
    await connection
      .query(
        `CREATE INDEX IF NOT EXISTS idx_assessment_head_datetime ON assessment_head (assessment_head_datetime)`
      )
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ assessment_head datetime index info:', err.message);
      });
    await connection
      .query(
        `CREATE INDEX IF NOT EXISTS idx_assessment_head_patient_type ON assessment_head (patient_type)`
      )
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME')
          console.log('⚠️ assessment_head patient_type index info:', err.message);
      });

    // 9. opitemrece — CRITICAL: 8.8M rows, GROUP BY queries run 30+ seconds without index
    console.log('⌛ Adding opitemrece indexes (8.8M rows — this may take a few minutes)...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_vstdate_icode ON opitemrece (vstdate, icode)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ opitemrece vstdate_icode index info:', err.message);
      });
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_an_vstdate ON opitemrece (an, vstdate)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ opitemrece an_vstdate index info:', err.message);
      });

    // 10. rcpt_print — Finance/OPD flow tracking
    console.log('⌛ Adding rcpt_print(vn) index...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_rcpt_print_vn ON rcpt_print (vn)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ rcpt_print vn index info:', err.message);
      });

    // 11. ovstdiag — Coding audit subqueries
    console.log('⌛ Adding ovstdiag(vn) index...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_ovstdiag_vn ON ovstdiag (vn)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ ovstdiag vn index info:', err.message);
      });

    // 12. iptdiag — IPD diagnosis lookups
    console.log('⌛ Adding iptdiag(an) index...');
    await connection
      .query(`CREATE INDEX IF NOT EXISTS idx_iptdiag_an ON iptdiag (an)`)
      .catch(err => {
        if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ iptdiag an index info:', err.message);
      });

    console.log(
      '✅ Database Optimization Complete! Added comprehensive indexes for better query performance.'
    );
  } catch (err) {
    console.error('❌ Error during optimization:', err.message);
  } finally {
    await connection.end();
    process.exit();
  }
}

optimize();
