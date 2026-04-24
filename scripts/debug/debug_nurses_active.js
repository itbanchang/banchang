import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        console.log('--- Nurse Activity Comparison (Today) ---');

        const nurseUsers = await dbQuery(`
      SELECT loginname, name 
      FROM opduser 
      WHERE (name LIKE 'พว.%' OR name LIKE 'พยาบาล%' OR name LIKE 'นป.%' OR name LIKE 'พช.%')
    `);

        console.log(`Total nurses in opduser: ${nurseUsers.length}`);

        const ovstActivity = await dbQuery(`
      SELECT o.staff, u.name, COUNT(*) as c
      FROM ovst o
      JOIN opduser u ON o.staff = u.loginname
      WHERE o.vstdate = CURDATE()
        AND (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY o.staff, u.name
    `);
        console.log('Nurses active in OVST:', ovstActivity);

        const screenActivity = await dbQuery(`
      SELECT s.staff, u.name, COUNT(*) as c
      FROM opdscreen s
      JOIN opduser u ON s.staff = u.loginname
      WHERE s.vstdate = CURDATE()
        AND (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY s.staff, u.name
    `);
        console.log('Nurses active in OPDSCREEN:', screenActivity);

        // Look for nurses with high activity in other tables maybe?
        // Let's check a few more tables if they exist
        const otherTables = ['opdnurse', 'opd_nursing_detail', 'nursenote'];
        for (const table of otherTables) {
            try {
                const res = await dbQuery(`SELECT COUNT(*) as c FROM ${table} WHERE vstdate = CURDATE() OR entry_datetime >= CURDATE()`);
                console.log(`Activity in ${table}:`, res[0].c);
            } catch (e) { }
        }

    } catch (err) {
        console.error(err);
    }
}

debug();
