import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        const [ovstdiag] = await pool.query('SHOW COLUMNS FROM ovstdiag;');
        console.log('--- ovstdiag ---');
        console.log(ovstdiag.map(c => c.Field).join(', '));

        const [iptdiag] = await pool.query('SHOW COLUMNS FROM iptdiag;');
        console.log('--- iptdiag ---');
        console.log(iptdiag.map(c => c.Field).join(', '));

        const [ipt] = await pool.query('SHOW COLUMNS FROM ipt;');
        console.log('--- ipt ---');
        console.log(ipt.map(c => c.Field).join(', '));

    } catch (e) { console.error(e); }
    process.exit();
}
run();
