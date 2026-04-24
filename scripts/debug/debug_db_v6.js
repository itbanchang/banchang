import { dbQuery } from './server/db/mysql.js';

async function debug() {
    try {
        const logCols = await dbQuery(`SHOW COLUMNS FROM opdscreen_log`).catch(() => []);
        console.log('Columns in opdscreen_log:', logCols.map(c => c.Field).join(', '));

        const screeningCols = await dbQuery(`SHOW COLUMNS FROM opdscreening`).catch(() => []);
        console.log('Columns in opdscreening:', screeningCols.map(c => c.Field).join(', '));

        const sampleLog = await dbQuery(`SELECT * FROM opdscreen_log WHERE vstdate = CURDATE() LIMIT 5`).catch(() => []);
        console.log('Sample opdscreen_log:', sampleLog);

    } catch (err) {
        console.error(err);
    }
}

debug();
