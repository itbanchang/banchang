import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        console.log('--- Checking opdscreen_bp for staff info ---');
        const bpCols = await dbQuery(`SHOW COLUMNS FROM opdscreen_bp`).catch(() => []);
        console.log('opdscreen_bp columns:', bpCols.map(c => c.Field).join(', '));

        // Often staff info is in a separate field or joined.
        // Let's check if there are columns like 'staff', 'login', 'user' in related tables.

        console.log('--- Checking physical examination (asm_physical_examination) ---');
        const asmCols = await dbQuery(`SHOW COLUMNS FROM asm_physical_examination`).catch(() => []);
        console.log('asm_physical_examination columns:', asmCols.map(c => c.Field).join(', '));

        console.log('--- Checking assessment_head ---');
        const assCols = await dbQuery(`SHOW COLUMNS FROM assessment_head`).catch(() => []);
        console.log('assessment_head columns:', assCols.map(c => c.Field).join(', '));

        console.log('--- Searching for ANY table updated today by a nurse ---');
        // Get list of nurse login names
        const nurseUsers = await dbQuery(`
      SELECT loginname FROM opduser 
      WHERE (name LIKE 'พว.%' OR name LIKE 'พยาบาล%' OR name LIKE 'นป.%' OR name LIKE 'พช.%')
    `);
        const nurseLogins = nurseUsers.map(u => `'${u.loginname}'`).join(',');

        if (nurseLogins) {
            // Search ksklog for ANY activity from these logins today
            const activity = await dbQuery(`
            SELECT tablename, modifytype, count(*) as c 
            FROM ksklog 
            WHERE loginname IN (${nurseLogins}) 
              AND logtime >= CURDATE() 
            GROUP BY tablename, modifytype
        `).catch(e => { console.log('KSKLOG query failed:', e.message); return []; });
            console.log('Nurse activity in KSKLOG today:', activity);
        }

    } catch (err) {
        console.error(err);
    }
}

debug();
