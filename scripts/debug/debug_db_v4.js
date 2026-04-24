import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        // Find tables that might log staff activity with vn
        const res = await dbQuery(`
      SELECT TABLE_NAME, COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE (COLUMN_NAME LIKE '%staff%' OR COLUMN_NAME LIKE '%user%' OR COLUMN_NAME LIKE '%login%')
        AND TABLE_NAME IN (
          SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = 'vn'
        )
        AND TABLE_SCHEMA = 'bchhosxpxe'
    `);
        console.log('Tables with VN and staff/user column:', res);

        const kskTables = await dbQuery(`SHOW TABLES LIKE 'ksk%'`);
        console.log('KSK tables:', kskTables);

        // Check ovst_seq
        const ovstSeqCols = await dbQuery(`SHOW COLUMNS FROM ovst_seq`).catch(() => []);
        console.log('Columns in ovst_seq:', ovstSeqCols.map(c => c.Field).join(', '));

    } catch (err) {
        console.error(err);
    }
}

debug();
