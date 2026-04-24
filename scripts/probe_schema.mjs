import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const { dbQuery } = await import('../server/db/mysql.js');

const tables = process.argv.slice(2);
if (tables.length === 0) {
  console.log('Usage: node scripts/probe_schema.mjs <table1> [table2]...');
  process.exit(1);
}

for (const t of tables) {
  try {
    const cols = await dbQuery(`SHOW COLUMNS FROM \`${t}\``);
    console.log(`\n=== ${t} (${cols.length} cols) ===`);
    console.log(cols.map(c => c.Field).join(', '));
  } catch (e) {
    console.log(`\n=== ${t} — NOT FOUND: ${e.message}`);
  }
}
process.exit(0);
