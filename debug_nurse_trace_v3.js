import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        console.log('--- Checking pq_screen columns and sample ---');
        const pqCols = await dbQuery(`SHOW COLUMNS FROM pq_screen`).catch(() => []);
        console.log('pq_screen columns:', pqCols.map(c => c.Field).join(', '));

        if (pqCols.length > 0) {
            const pqSample = await dbQuery(`
            SELECT t.*, u.name 
            FROM pq_screen t 
            LEFT JOIN opduser u ON t.staff = u.loginname -- assuming staff column
            WHERE t.vstdate = CURDATE() 
            LIMIT 5
        `).catch(async () => {
                // If 'staff' fails, look for another column
                const possible = pqCols.filter(c => /staff|user|login/i.test(c.Field));
                console.log('Possible staff columns in pq_screen:', possible.map(c => c.Field));
                return [];
            });
            console.log('pq_screen sample:', pqSample);
        }

        console.log('--- Checking opdnurse columns again ---');
        const opdnurseCols = await dbQuery(`SHOW COLUMNS FROM opdnurse`).catch(() => []);
        console.log('opdnurse columns:', opdnurseCols.map(c => c.Field).join(', '));
        if (opdnurseCols.length > 0) {
            // Find date column
            const dateCol = opdnurseCols.find(c => /date|time/i.test(c.Field));
            console.log('Detected date col for opdnurse:', dateCol?.Field);
        }

        console.log('--- Checking who modified opdscreen recently in ANY way ---');
        // Maybe look at opdscreen_audit?
        const auditCols = await dbQuery(`SHOW COLUMNS FROM opdscreen_audit`).catch(() => []);
        console.log('opdscreen_audit columns:', auditCols.map(c => c.Field).join(', '));
        if (auditCols.length > 0) {
            const auditToday = await dbQuery(`SELECT * FROM opdscreen_audit WHERE DATE(update_datetime) = CURDATE() LIMIT 5`).catch(() => []);
            console.log('opdscreen_audit sample:', auditToday);
        }

    } catch (err) {
        console.error(err);
    }
}

debug();
