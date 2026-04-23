import mysql from 'mysql2/promise';

async function run() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || '10.109.0.33',
        user: process.env.MYSQL_USER || 'dataaudit',
        password: process.env.MYSQL_PASS || 'dataaudit',
        database: process.env.MYSQL_DB || 'bchhosxpxe',
    });

    try {
        const [tables] = await pool.query('SHOW TABLES');
        console.log(`Total Tables: ${tables.length}`);
        const someTables = tables.slice(0, 10).map(t => Object.values(t)[0]);
        console.log('Sample Tables:', someTables);
    } catch (e) {
        console.error(e);
    }
    process.exit();
}
run();
