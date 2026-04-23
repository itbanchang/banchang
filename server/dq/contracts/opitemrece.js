// ============================================================
// DQ Contract: opitemrece (billing items)
// ============================================================
import { dbQuery } from '../../db/mysql.js';

const REQUIRED_COLUMNS = ['vn', 'icode', 'qty', 'sum_price'];

export async function check() {
    try {
        const cols = await dbQuery(`
            SELECT COLUMN_NAME, DATA_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'opitemrece'
        `, [process.env.MYSQL_DB || 'bchhosxpxe']);

        const present = new Set(cols.map(c => c.COLUMN_NAME.toLowerCase()));
        const missing = REQUIRED_COLUMNS.filter(k => !present.has(k.toLowerCase()));
        const pass = missing.length === 0;
        return {
            table: 'opitemrece',
            pass,
            severity: pass ? 'ok' : 'danger',
            missing,
        };
    } catch (err) {
        return { table: 'opitemrece', pass: false, severity: 'danger', error: err.message };
    }
}
