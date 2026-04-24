import { dbQuery } from './server/db/mysql.js';

async function findNurseActivity() {
    try {
        console.log('--- Checking opdnurse table structure ---');
        try {
            const cols = await dbQuery(`SHOW COLUMNS FROM opdnurse`);
            console.log('opdnurse columns:', cols.map(c => c.Field).join(', '));

            const activity = await dbQuery(`
            SELECT n.staff, u.name, COUNT(*) as c 
            FROM opdnurse n 
            JOIN opduser u ON n.staff = u.loginname 
            WHERE n.entry_datetime >= CURDATE() 
            GROUP BY n.staff, u.name
        `);
            console.log('Activity in opdnurse today:', activity);
        } catch (e) {
            console.log('Error checking opdnurse:', e.message);
        }

        console.log('--- Checking opd_nursing_detail table ---');
        try {
            const cols = await dbQuery(`SHOW COLUMNS FROM opd_nursing_detail`);
            console.log('opd_nursing_detail columns:', cols.map(c => c.Field).join(', '));

            const activity = await dbQuery(`
            SELECT n.staff, u.name, COUNT(*) as c 
            FROM opd_nursing_detail n 
            JOIN opduser u ON n.staff = u.loginname 
            WHERE n.vstdate = CURDATE() 
            GROUP BY n.staff, u.name
        `);
            console.log('Activity in opd_nursing_detail today:', activity);
        } catch (e) {
            console.log('Error checking opd_nursing_detail:', e.message);
        }

        console.log('--- Checking who modified opdscreen today (from ksklog) ---');
        try {
            const logs = await dbQuery(`
            SELECT loginname, COUNT(*) as c 
            FROM ksklog 
            WHERE tablename = 'opdscreen' AND logtime >= CURDATE() 
            GROUP BY loginname
        `);
            console.log('ksklog opdscreen modifications today:', logs);
        } catch (e) {
            console.log('Error checking ksklog:', e.message);
        }

        console.log('--- Checking nurse names in ALL active staff today ---');
        const allActive = await dbQuery(`
        SELECT u.loginname, u.name 
        FROM ovst o 
        JOIN opduser u ON o.staff = u.loginname 
        WHERE o.vstdate = CURDATE() 
        GROUP BY u.loginname, u.name
    `);
        const nurses = allActive.filter(u => /พว|พยาบาล|นป|พช/.test(u.name));
        console.log('Nurses found in ovst.staff today:', nurses);

    } catch (err) {
        console.error(err);
    }
}

findNurseActivity();
