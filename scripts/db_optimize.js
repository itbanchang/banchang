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
        port: parseInt(env.MYSQL_PORT) || 3306
    });

    try {
        console.log(`📡 Connected to HOSxP XE Slave (${env.MYSQL_HOST})...`);

        // 1. ovst index for dashboard speed
        console.log('⌛ Adding index to ovst(vstdate, main_dep)...');
        await connection.query(`
            CREATE INDEX IF NOT EXISTS idx_vstdate_dep ON ovst (vstdate, main_dep)
        `).catch(async (err) => {
            // Fallback for MySQL < 8.0.28 or older versions that don't support IF NOT EXISTS in CREATE INDEX
            if (err.code === 'ER_DUP_KEYNAME') return;
            await connection.query(`ALTER TABLE ovst ADD INDEX idx_vstdate_dep (vstdate, main_dep)`);
        }).catch(err => {
            if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ ovst index info:', err.message);
        });

        // 2. service_time index for wait time calculation
        console.log('⌛ Adding index to service_time(vn, service1, service2, service7)...');
        await connection.query(`
            CREATE INDEX IF NOT EXISTS idx_vn_service ON service_time (vn, service1, service2, service7)
        `).catch(async (err) => {
            await connection.query(`ALTER TABLE service_time ADD INDEX idx_vn_service (vn, service1, service2, service7)`);
        }).catch(err => {
            if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ service_time index info:', err.message);
        });

        // 3. Ensuring unique index on service_time for data integrity
        console.log('⌛ Checking service_time unique constraints...');
        await connection.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS idx_vn_unique ON service_time (vn)
        `).catch(async (err) => {
            await connection.query(`ALTER TABLE service_time ADD UNIQUE INDEX idx_vn_unique (vn)`);
        }).catch(err => {
            if (err.code !== 'ER_DUP_KEYNAME') console.log('⚠️ service_time unique index info:', err.message);
        });

        console.log('✅ Optimization Complete! BCH 360° Dashboard responsiveness enhanced.');
    } catch (err) {
        console.error('❌ Error during optimization:', err.message);
    } finally {
        await connection.end();
        process.exit();
    }
}

optimize();
