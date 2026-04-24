import { dbQuery } from './server/db/mysql.js';

async function verifyNurseActivity() {
    try {
        console.log('--- Checking Nurse Activity Today ---');

        console.log('\n[Checking opdscreen_bp]');
        const bpNurses = await dbQuery(`
      SELECT u.name, COUNT(*) as c
      FROM opdscreen_bp bp
      JOIN opduser u ON bp.staff = u.loginname
      WHERE bp.screen_date = CURDATE()
      GROUP BY u.name
      ORDER BY c DESC
    `).catch(() => []);
        console.log('Nurses in opdscreen_bp:', bpNurses);

        console.log('\n[Checking pq_screen]');
        const pqNurses = await dbQuery(`
      SELECT u.name, COUNT(*) as c
      FROM pq_screen pq
      JOIN opduser u ON pq.staff = u.loginname
      WHERE pq.screen_date = CURDATE()
      GROUP BY u.name
      ORDER BY c DESC
    `).catch(() => []);
        console.log('Nurses in pq_screen:', pqNurses);

        console.log('\n[Checking assessment_head]');
        const assNurses = await dbQuery(`
      SELECT u.name, COUNT(*) as c
      FROM assessment_head ah
      JOIN opduser u ON ah.assessment_head_staff = u.loginname
      WHERE DATE(ah.assessment_head_datetime) = CURDATE()
      GROUP BY u.name
      ORDER BY c DESC
    `).catch(() => []);
        console.log('Nurses in assessment_head:', assNurses);

    } catch (err) {
        console.error(err);
    }
}

verifyNurseActivity();
