// ============================================================
// BCH 360° Intelligence V.10 — Explore Infection Tables
// Run: node scripts/debug/explore_infection_tables.js
// ============================================================
import { dbQuery, getPool } from '../../server/db/mysql.js';

async function explore() {
  try {
    await getPool();
    console.log('=== Exploring Infection-Related Tables in HOSxP XE ===\n');

    const patterns = [
      'infect%', 'nosi%', 'communicable%', 'surveil%', 'ic_%',
      'antibiotic%', 'culture%', 'suscept%', 'hai%', 'uti%',
      'ssi%', 'vap%', 'clabsi%', 'nosocomial%', 'organism%',
      'micro%', 'lab_culture%', 'drug_resist%',
    ];

    const found = [];
    for (const pat of patterns) {
      const rows = await dbQuery(`SHOW TABLES LIKE '${pat}'`);
      if (rows.length > 0) {
        for (const row of rows) {
          const tableName = Object.values(row)[0];
          found.push(tableName);
          console.log(`\n--- TABLE: ${tableName} ---`);
          const cols = await dbQuery(`SHOW COLUMNS FROM \`${tableName}\``);
          console.log('Columns:', cols.map(c => `${c.Field} (${c.Type})`).join(', '));
          const [countRow] = await dbQuery(`SELECT COUNT(*) AS cnt FROM \`${tableName}\``);
          console.log('Row count:', countRow.cnt);
          if (countRow.cnt > 0) {
            const sample = await dbQuery(`SELECT * FROM \`${tableName}\` LIMIT 3`);
            console.log('Sample:', JSON.stringify(sample, null, 2));
          }
        }
      }
    }

    // Also check key ICD-10 infection cases from iptdiag
    console.log('\n=== Infection Cases via ICD-10 (iptdiag) ===');
    const icdInfections = await dbQuery(`
      SELECT LEFT(id.icd10, 3) AS icd_group, COUNT(*) AS cnt
      FROM iptdiag id
      JOIN ipt i ON id.an = i.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND (
          id.icd10 BETWEEN 'A00' AND 'B999'
          OR id.icd10 = 'N390'
          OR id.icd10 BETWEEN 'J150' AND 'J189'
          OR id.icd10 BETWEEN 'T810' AND 'T819'
          OR id.icd10 BETWEEN 'A40' AND 'A419'
        )
      GROUP BY LEFT(id.icd10, 3)
      ORDER BY cnt DESC
      LIMIT 20
    `, [], { timeoutMs: 15000 });
    console.log('Infection ICD groups (6 months):', JSON.stringify(icdInfections, null, 2));

    // Check OPD communicable disease notifications
    console.log('\n=== OPD Communicable Disease (ovstdiag) ===');
    const opdInfections = await dbQuery(`
      SELECT LEFT(od.icd10, 3) AS icd_group, COUNT(*) AS cnt
      FROM ovstdiag od
      JOIN ovst o ON od.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        AND od.icd10 BETWEEN 'A00' AND 'B999'
      GROUP BY LEFT(od.icd10, 3)
      ORDER BY cnt DESC
      LIMIT 20
    `, [], { timeoutMs: 15000 });
    console.log('OPD Infection ICD groups (3 months):', JSON.stringify(opdInfections, null, 2));

    if (found.length === 0) {
      console.log('\nNo dedicated infection tracking tables found.');
      console.log('Fallback strategy: Use ICD-10 codes from iptdiag/ovstdiag.');
    }

    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

explore();
