// ============================================================
// DQ Contract: ipt (IPD admissions)
// ============================================================
import { dbQuery } from '../../db/mysql.js';

const REQUIRED_COLUMNS = {
    an: /varchar|char/i,
    hn: /varchar|char/i,
    regdate: /date/i,
    dchdate: /date/i,
    ward: /varchar|char/i,
    pdx: /varchar|char/i,
};

export async function check() {
    try {
        const cols = await dbQuery(`
            SELECT COLUMN_NAME, DATA_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'ipt'
        `, [process.env.MYSQL_DB || 'bchhosxpxe']);

        const present = new Set(cols.map(c => c.COLUMN_NAME.toLowerCase()));
        const missing = Object.keys(REQUIRED_COLUMNS).filter(k => !present.has(k.toLowerCase()));
        const [rc] = await dbQuery(`SELECT COUNT(*) AS n FROM ipt`);
        const pass = missing.length === 0;
        return {
            table: 'ipt',
            pass,
            severity: pass ? 'ok' : 'danger',
            missing,
            row_count: Number(rc?.n || 0),
        };
    } catch (err) {
        return { table: 'ipt', pass: false, severity: 'danger', error: err.message };
    }
}
