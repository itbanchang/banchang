import { dbQuery } from './server/db/mysql.js';

async function verifyIPDActivity() {
    try {
        console.log('--- Checking active IPD Doctors (Current Admissions) ---');
        const activeDoctors = await dbQuery(`
      SELECT u.loginname, u.name, COUNT(*) as patient_count 
      FROM ipt i
      JOIN opduser u ON i.adm_doctor = u.doctorcode OR i.adm_doctor = u.loginname
      WHERE i.dchdate IS NULL
      GROUP BY u.loginname, u.name
      ORDER BY patient_count DESC
    `);
        console.log('Doctors with active IPD cases:', activeDoctors.slice(0, 5));

        console.log('\n--- Checking Nurse activity (assessment_head) ---');
        const activeNurses = await dbQuery(`
      SELECT u.loginname, u.name, COUNT(*) as activity_count
      FROM assessment_head ah
      JOIN opduser u ON ah.assessment_head_staff = u.loginname
      WHERE DATE(ah.assessment_head_datetime) = CURDATE()
        AND ah.patient_type = 'IPD'
      GROUP BY u.loginname, u.name
      ORDER BY activity_count DESC
    `);
        console.log('Nurses with IPD activity today:', activeNurses.slice(0, 5));

    } catch (err) {
        console.error(err);
    }
}

verifyIPDActivity();
