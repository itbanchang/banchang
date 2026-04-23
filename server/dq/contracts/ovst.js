// ============================================================
// DQ Contract: ovst (OPD visits)
// ============================================================
import { dbQuery } from '../../db/mysql.js';

const REQUIRED_COLUMNS = {
    vn: /varchar|char/i,
    hn: /varchar|char/i,
    vstdate: /date/i,
    vsttime: /time/i,
    dep: /varchar|char/i,
    pdx: /varchar|char/i,
    ovstost: /varchar|char/i,
    doctor: /varchar|char/i,
};

const MIN_ROW_COUNT = 1_000_000;

export async function check() {
    try {
        const cols = await dbQuery(`
            SELECT COLUMN_NAME, DATA_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'ovst'
        `, [process.env.MYSQL_DB || 'bchhosxpxe']);

        const present = new Set(cols.map(c => c.COLUMN_NAME.toLowerCase()));
        const missing = Object.keys(REQUIRED_COLUMNS).filter(k => !present.has(k.toLowerCase()));
        const typeMismatches = [];
        for (const c of cols) {
            const expected = REQUIRED_COLUMNS[c.COLUMN_NAME.toLowerCase()];
            if (expected && !expected.test(c.DATA_TYPE)) {
                typeMismatches.push({ column: c.COLUMN_NAME, expected: String(expected), actual: c.DATA_TYPE });
            }
        }

        const [rc] = await dbQuery(`SELECT COUNT(*) AS n FROM ovst`);
        const rowCount = Number(rc?.n || 0);

        const pass = missing.length === 0 && typeMismatches.length === 0 && rowCount >= MIN_ROW_COUNT;
        return {
            table: 'ovst',
            pass,
            severity: pass ? 'ok' : 'danger',
            missing,
            type_mismatches: typeMismatches,
            row_count: rowCount,
            row_count_min: MIN_ROW_COUNT,
        };
    } catch (err) {
        return { table: 'ovst', pass: false, severity: 'danger', error: err.message };
    }
}
