import { dbQuery } from './server/db/mysql.js';

async function investigateIPDNurses() {
    try {
        console.log('--- Checking IPD Activity Today ---');

        const nurseUsers = await dbQuery(`
      SELECT loginname, name FROM opduser 
      WHERE (name LIKE 'พว.%' OR name LIKE 'พยาบาล%' OR name LIKE 'นป.%' OR name LIKE 'พช.%')
    `);
        const nurseLogins = nurseUsers.map(u => `'${u.loginname}'`).join(',');

        if (!nurseLogins) {
            console.log('No nurses found in opduser.');
            return;
        }

        const testQueries = [
            { name: 'ipd_nurse_note', query: `SELECT entry_staff as staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()` },
            { name: 'ipt_nurse_oper', query: `SELECT op_staff as staff, op_time as activity_time FROM ipt_nurse_oper WHERE op_date = CURDATE()` },
            { name: 'ipd_nurse_eval_entry', query: `SELECT staff, entry_datetime as activity_time FROM ipd_nurse_eval_entry WHERE DATE(entry_datetime) = CURDATE()` },
            { name: 'assessment_head (IPD)', query: `SELECT assessment_head_staff as staff, assessment_head_datetime as activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'` },
            { name: 'ksklog (IPD)', query: `SELECT loginname as staff, logtime as activity_time FROM ksklog WHERE logtime >= CURDATE() AND tablename IN ('ipt', 'an_stat', 'ipd_nurse_note')` }
        ];

        for (const test of testQueries) {
            try {
                const res = await dbQuery(test.query);
                console.log(`${test.name}: ${res.length} records found today`);
                if (res.length > 0) {
                    const nurseActivity = res.filter(r => nurseUsers.some(u => u.loginname === r.staff));
                    console.log(`  - Nurses found in ${test.name}: ${nurseActivity.length}`);
                    if (nurseActivity.length > 0) {
                        console.log(`  - Sample:`, nurseActivity.slice(0, 2));
                    }
                }
            } catch (e) {
                // console.log(`${test.name} failed:`, e.message);
            }
        }

        console.log('\n--- Checking Doctor Activity Today ---');
        const doctorActivity = await dbQuery(`
        SELECT loginname as staff, logtime as activity_time 
        FROM ksklog 
        WHERE logtime >= CURDATE() 
          AND (tablename = 'ipt' OR tablename = 'physician_order_card' OR tablename = 'physician_order')
          AND loginname IN (SELECT loginname FROM opduser WHERE name LIKE 'นพ.%' OR name LIKE 'พญ.%')
    `).catch(() => []);
        console.log(`Doctor activity in KSKLOG: ${doctorActivity.length} records`);

    } catch (err) {
        console.error(err);
    }
}

investigateIPDNurses();
