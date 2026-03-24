import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        const tables = await dbQuery(`SHOW TABLES LIKE '%screen%'`);
        console.log('Tables with "screen":', tables);

        const hasStaff = await dbQuery(`
      SELECT TABLE_NAME, COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE COLUMN_NAME LIKE 'staff%' AND TABLE_NAME LIKE 'opd%'
    `);
        console.log('Tables with "staff" and "opd":', hasStaff);

        // Check if opdscreen has any column ending in 'user' or 'staff'
        const opdScreenCols = await dbQuery(`SHOW COLUMNS FROM opdscreen`);
        const suspectCols = opdScreenCols.filter(c =>
            c.Field.toLowerCase().includes('staff') ||
            c.Field.toLowerCase().includes('user') ||
            c.Field.toLowerCase().includes('login')
        );
        console.log('Suspect columns in opdscreen:', suspectCols);

        // Let's also check ksk_department_log
        const kskLogCols = await dbQuery(`SHOW COLUMNS FROM ksk_department_log`).catch(() => []);
        console.log('Columns in ksk_department_log:', kskLogCols.map(c => c.Field).join(', '));

    } catch (err) {
        console.error(err);
    }
}

debug();
