import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        console.log('--- Checking opdscreen columns again ---');
        const screenCols = await dbQuery(`SHOW COLUMNS FROM opdscreen`);
        console.log('opdscreen columns:', screenCols.map(c => c.Field).join(', '));

        console.log('--- Checking ksklog for opdscreen updates ---');
        const logs = await dbQuery(`
      SELECT loginname, COUNT(*) as c 
      FROM ksklog 
      WHERE tablename = 'opdscreen' 
        AND logtime >= CURDATE()
      GROUP BY loginname
      ORDER BY c DESC
    `);
        console.log('Who updated opdscreen today (ksklog):', logs);

        console.log('--- Checking who modified ovst today (ksklog) ---');
        const ovstLogs = await dbQuery(`
      SELECT loginname, COUNT(*) as c 
      FROM ksklog 
      WHERE tablename = 'ovst' 
        AND logtime >= CURDATE()
      GROUP BY loginname
      ORDER BY c DESC
    `);
        console.log('Who updated ovst today (ksklog):', ovstLogs);

        // Try to find if there is a 'staff' equivalent in opdscreen
        // Maybe 'cc_staff' or something?
        const possibleStaffCols = screenCols.filter(c => /staff|user|login|person/i.test(c.Field));
        console.log('Possible staff columns in opdscreen:', possibleStaffCols.map(c => c.Field));

    } catch (err) {
        console.error(err);
    }
}

debug();
