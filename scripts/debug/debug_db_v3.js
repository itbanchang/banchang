import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        const userCols = await dbQuery(`SHOW COLUMNS FROM opduser`);
        console.log('Columns in opduser:', userCols.map(c => c.Field).join(', '));

        const logCols = await dbQuery(`SHOW COLUMNS FROM ksk_department_log`);
        console.log('Columns in ksk_department_log:', logCols.map(c => c.Field).join(', '));

        const staffActivity = await dbQuery(`
       SELECT staff, count(*) as c 
       FROM ksk_department_log 
       WHERE log_date = CURDATE() 
       GROUP BY staff 
       ORDER BY c DESC 
       LIMIT 10
    `);
        console.log('Active Staff from ksk_department_log:', staffActivity);

        // Check a few users to see position-like info
        const userSample = await dbQuery(`SELECT loginname, name, entryposition FROM opduser LIMIT 10`);
        console.log('User Position Sample:', userSample);
    } catch (err) {
        console.error(err);
    }
}

debug();
