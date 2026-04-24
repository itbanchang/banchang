import { dbQuery } from './server/db/mysql.js';
dbQuery("SHOW TABLES LIKE '%drg%'").then(console.log).catch(console.error).finally(() => process.exit(0));
