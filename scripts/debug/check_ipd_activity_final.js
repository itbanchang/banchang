import { dbQuery } from './server/db/mysql.js';

async function verifyIPDOnDuty() {
    try {
        console.log('--- Verifying IPD On-Duty Data Sources ---');

        console.log('\n[1. Doctors from Current Admissions (Attending/In-charge)]');
        const doctors = await dbQuery(`
      SELECT u.loginname, u.name, COUNT(*) as patient_count
      FROM ipt i
      JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
      WHERE i.dchdate IS NULL
      GROUP BY u.loginname, u.name
      ORDER BY patient_count DESC
      LIMIT 10
    `).catch(async () => {
            return await dbQuery(`
            SELECT u.loginname, u.name, COUNT(*) as patient_count
            FROM ipt i
            JOIN opduser u ON i.staff = u.loginname
            WHERE i.dchdate IS NULL
            GROUP BY u.loginname, u.name
            LIMIT 10
        `);
        });
        console.log('Sample Doctors:', doctors);

        console.log('\n[2. Nurses from Clinical Activity (Assessment/Notes)]');
        const nurses = await dbQuery(`
      SELECT u.loginname, u.name, COUNT(*) as c
      FROM (
        SELECT assessment_head_staff as staff FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
        UNION ALL
        SELECT staff FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
      ) as activity
      JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY u.loginname, u.name
      ORDER BY c DESC
      LIMIT 10
    `);
        console.log('Sample Nurses:', nurses);

        console.log('\n[3. Staff from Clinical Activity (Assessment/Notes)]');
        const staff = await dbQuery(`
      SELECT u.loginname, u.name, COUNT(*) as c
      FROM (
        SELECT assessment_head_staff as staff FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
        UNION ALL
        SELECT staff FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
      ) as activity
      JOIN opduser u ON activity.staff = u.loginname
      WHERE u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
      GROUP BY u.loginname, u.name
      ORDER BY c DESC
      LIMIT 10
    `);
        console.log('Sample Staff:', staff);

    } catch (err) {
        console.error('Error:', err.message);
    }
}

verifyIPDOnDuty();
