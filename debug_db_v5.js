import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        const kskLogCols = await dbQuery(`SHOW COLUMNS FROM ksklog`).catch(() => []);
        console.log('Columns in ksklog:', kskLogCols.map(c => c.Field).join(', '));

        // Check if there are any screening entries in ksklog or similar
        const recentLogs = await dbQuery(`SELECT * FROM ksklog WHERE log_date = CURDATE() LIMIT 5`).catch(() => []);
        console.log('Recent ksklog entries:', recentLogs);

        // Check if opdscreen data is linked to a staff in another table
        // Sometimes HOSxP uses 'kskdepartment_log' or similar, but let me check 'opdscreen' related tables
        const relatedTables = await dbQuery(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE 'opdscreen%'`);
        console.log('Tables related to opdscreen:', relatedTables);

    } catch (err) {
        console.error(err);
    }
}

debug();
