import mysql from 'mysql2/promise';

async function run() {
    const pool = mysql.createPool({
        host: '10.1.0.3',
        user: 'dataaudit',
        password: 'dataaudit',
        database: 'bchhosxpxe',
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
