import { dbQuery } from './server/db/mysql.js';

async function findActivity() {
    try {
        console.log('--- Searching for tables with VN and staff-like columns that have data today ---');

        // First, find all tables with vn and some staff column
        const tables = await dbQuery(`
      SELECT TABLE_NAME, COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'bchhosxpxe' 
        AND COLUMN_NAME IN ('vn')
        AND TABLE_NAME IN (
          SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE COLUMN_NAME REGEXP 'staff|login|user|id'
        )
    `);

        console.log(`Found ${tables.length} potential tables. Testing for today's activity...`);

        for (const t of tables) {
            try {
                // Find if this table has a date column
                const cols = await dbQuery(`SHOW COLUMNS FROM ${t.TABLE_NAME}`);
                const dateCol = cols.find(c => /date|datetime|time/i.test(c.Field) && !/birth|expire/i.test(c.Field));

                let query = '';
                if (dateCol) {
                    query = `SELECT COUNT(*) as c FROM ${t.TABLE_NAME} WHERE DATE(${dateCol.Field}) = CURDATE()`;
                } else {
                    // If no date column, try to join with ovst to check today's VNs
                    query = `SELECT COUNT(*) as c FROM ${t.TABLE_NAME} t JOIN ovst o ON t.vn = o.vn WHERE o.vstdate = CURDATE()`;
                }

                const res = await dbQuery(query);
                if (res[0].c > 0) {
                    console.log(`Table ${t.TABLE_NAME} has ${res[0].c} records for today.`);
                    // Check if any of these are nurses
                    const nurseCheck = await dbQuery(`
                SELECT COUNT(*) as c 
                FROM ${t.TABLE_NAME} t 
                JOIN ovst o ON t.vn = o.vn
                JOIN opduser u ON t.${t.COLUMN_NAME === 'vn' ? 'staff' : 'staff'} = u.loginname -- This logic is flawed, let's refine
                WHERE o.vstdate = CURDATE()
            `).catch(() => []);
                }
            } catch (e) { }
        }

        console.log('--- Specifically checking opdnurse and opd_nursing_detail ---');
        const opdnurse = await dbQuery(`SHOW TABLES LIKE 'opdnurse'`);
        if (opdnurse.length > 0) {
            const res = await dbQuery(`SELECT COUNT(*) as c FROM opdnurse WHERE DATE(entry_datetime) = CURDATE()`);
            console.log(`opdnurse today: ${res[0].c}`);
            if (res[0].c > 0) {
                const sample = await dbQuery(`SELECT n.*, u.name FROM opdnurse n JOIN opduser u ON n.staff = u.loginname WHERE DATE(n.entry_datetime) = CURDATE() LIMIT 5`);
                console.log('opdnurse sample:', sample);
            }
        }

        const nursingDetail = await dbQuery(`SHOW TABLES LIKE 'opd_nursing_detail'`);
        if (nursingDetail.length > 0) {
            const res = await dbQuery(`SELECT COUNT(*) as c FROM opd_nursing_detail WHERE vstdate = CURDATE()`);
            console.log(`opd_nursing_detail today: ${res[0].c}`);
            if (res[0].c > 0) {
                const sample = await dbQuery(`SELECT n.*, u.name FROM opd_nursing_detail n JOIN opduser u ON n.staff = u.loginname WHERE n.vstdate = CURDATE() LIMIT 5`);
                console.log('opd_nursing_detail sample:', sample);
            }
        }

    } catch (err) {
        console.error(err);
    }
}

findActivity();
