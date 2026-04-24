import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        const ovstCols = await dbQuery(`SHOW COLUMNS FROM ovst`);
        console.log('Columns in ovst:', ovstCols.map(c => c.Field).join(', '));

        const staffSample = await dbQuery(`SELECT vn, staff FROM ovst WHERE vstdate = CURDATE() LIMIT 5`);
        console.log('OVST Staff Sample:', staffSample);

        const opdUserSample = await dbQuery(`SELECT loginname, name FROM opduser LIMIT 5`);
        console.log('OPDUser Sample:', opdUserSample);
    } catch (err) {
        console.error(err);
    }
}

debug();
