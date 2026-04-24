import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        console.log('--- Checking opdnurse columns ---');
        const opdnurseCols = await dbQuery(`SHOW COLUMNS FROM opdnurse`).catch(() => []);
        console.log('opdnurse columns:', opdnurseCols.map(c => c.Field).join(', '));

        console.log('--- Checking opduser for nurse-like categories ---');
        const nurseCategories = await dbQuery(`
      SELECT groupname, department, COUNT(*) as c 
      FROM opduser 
      WHERE (name LIKE 'พว.%' OR name LIKE 'พยาบาล%' OR name LIKE 'นป.%' OR name LIKE 'พช.%')
      GROUP BY groupname, department
    `);
        console.log('Nurse user breakdown:', nurseCategories);

        console.log('--- Checking recent activity in opdnurse ---');
        const recentNurseActivity = await dbQuery(`
      SELECT * FROM opdnurse WHERE vn IN (SELECT vn FROM ovst WHERE vstdate = CURDATE()) LIMIT 5
    `).catch(() => []);
        console.log('opdnurse sample activity:', recentNurseActivity);

        // Check if there's a table like 'ksk_department_log' or 'ksklog' that actually has data
        // The previous debug said ksklog was empty for today. Let me check if table has ANY recent data.
        const kskLogRecent = await dbQuery(`SELECT * FROM ksklog ORDER BY ksklog_id DESC LIMIT 5`).catch(() => []);
        console.log('Last 5 ksklog entries:', kskLogRecent);

    } catch (err) {
        console.error(err);
    }
}

debug();
