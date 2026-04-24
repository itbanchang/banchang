import { dbQuery } from './server/db/mysql.js';

async function investigateNurses() {
    try {
        console.log('--- Checking tables related to nursing or screening staff ---');
        const tables = await dbQuery(`SHOW TABLES LIKE '%nurse%'`);
        console.log('Nurse related tables:', tables);

        const screenTables = await dbQuery(`SHOW TABLES LIKE '%screen%'`);
        console.log('Screen related tables:', screenTables);

        // Look for columns that might contain staff IDs in opdscreen
        const opdscreenCols = await dbQuery(`SHOW COLUMNS FROM opdscreen`);
        console.log('opdscreen columns:', opdscreenCols.map(c => c.Field).join(', '));

        // Check opd_nursing_detail if it exists
        const nursingDetail = await dbQuery(`SHOW TABLES LIKE 'opd_nursing_detail'`);
        if (nursingDetail.length > 0) {
            const nursingCols = await dbQuery(`SHOW COLUMNS FROM opd_nursing_detail`);
            console.log('opd_nursing_detail columns:', nursingCols.map(c => c.Field).join(', '));
        }

        // Identify active nurses today by looking at names in opduser more broadly
        const nurseUsers = await dbQuery(`
        SELECT name, loginname, entryposition 
        FROM opduser 
        WHERE name LIKE 'พว.%' OR name LIKE 'พยาบาล%' OR name LIKE 'นป.%' OR name LIKE 'พช.%'
        LIMIT 20
    `);
        console.log('Sample Nurse Users in opduser:', nurseUsers);

        // See if these nurses are logged anywhere today
        const nurseLogins = nurseUsers.map(u => `'${u.loginname}'`).join(',');
        if (nurseLogins) {
            const activity = await dbQuery(`
            SELECT 'ovst' as src, staff, COUNT(*) as c FROM ovst WHERE vstdate = CURDATE() AND staff IN (${nurseLogins}) GROUP BY staff
            UNION ALL
            SELECT 'lab_head' as src, reporter_staff as staff, COUNT(*) as c FROM lab_head WHERE report_date = CURDATE() AND reporter_staff IN (${nurseLogins}) GROUP BY reporter_staff
        `);
            console.log('Activity of identified nurses today:', activity);
        }

    } catch (err) {
        console.error(err);
    }
}

investigateNurses();
