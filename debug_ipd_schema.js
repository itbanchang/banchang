import { dbQuery } from './server/db/mysql.js';

async function debugIPDSchema() {
    try {
        console.log('--- Checking ipt columns ---');
        const iptCols = await dbQuery(`SHOW COLUMNS FROM ipt`).catch(() => []);
        console.log('ipt columns:', iptCols.map(c => c.Field).join(', '));

        console.log('--- Checking ipd_nurse_note columns ---');
        const nurseNoteCols = await dbQuery(`SHOW COLUMNS FROM ipd_nurse_note`).catch(() => []);
        console.log('ipd_nurse_note columns:', nurseNoteCols.map(c => c.Field).join(', '));

        console.log('--- Checking active patients doctors ---');
        // Common HOSxP doctor columns in ipt are 'adm_doctor' (sometimes), 'adm_doctor_code', or 'doctor'
        const doctors = await dbQuery(`
        SELECT DISTINCT adm_doctor FROM ipt WHERE dchdate IS NULL LIMIT 5
    `).catch(async () => {
            return await dbQuery(`SELECT DISTINCT doctor FROM ipt WHERE dchdate IS NULL LIMIT 5`).catch(() => []);
        });
        console.log('Sample doctors in ipt:', doctors);

    } catch (err) {
        console.error(err);
    }
}

debugIPDSchema();
