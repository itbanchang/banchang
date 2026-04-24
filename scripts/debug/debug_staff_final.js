import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        console.log('--- Checking active staff in OVST ---');
        const ovstStaff = await dbQuery(`
      SELECT o.staff, u.name, u.entryposition, COUNT(*) as visit_count
      FROM ovst o
      LEFT JOIN opduser u ON o.staff = u.loginname
      WHERE o.vstdate = CURDATE()
      GROUP BY o.staff, u.name, u.entryposition
      ORDER BY visit_count DESC
    `);
        console.log('OVST Active Staff:', ovstStaff);

        console.log('--- Checking ksklog activity ---');
        const logs = await dbQuery(`
      SELECT loginname, tablename, COUNT(*) as log_count
      FROM ksklog
      WHERE logtime >= CONCAT(CURDATE(), ' 00:00:00')
      GROUP BY loginname, tablename
      ORDER BY log_count DESC
      LIMIT 20
    `);
        console.log('Recent KSKLogs:', logs);

        console.log('--- Checking common positions in opduser ---');
        const positions = await dbQuery(`
      SELECT entryposition, COUNT(*) as user_count
      FROM opduser
      GROUP BY entryposition
      ORDER BY user_count DESC
      LIMIT 20
    `);
        console.log('Common Positions:', positions);

    } catch (err) {
        console.error(err);
    }
}

debug();
