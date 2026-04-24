import { dbQuery } from './server/db/mysql.js';

const q = `
  SELECT 
    DATE(d.modify_datetime) as record_date, 
    COALESCE(u.name, d.staff) as coder_name, 
    COUNT(DISTINCT d.an) as coded_count 
  FROM iptdiag d 
  LEFT JOIN opduser u ON d.staff = u.loginname 
  WHERE d.modify_datetime >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) 
    AND d.staff IS NOT NULL 
    AND d.staff != '' 
  GROUP BY record_date, coder_name 
  ORDER BY record_date ASC
`;

dbQuery(q).then(console.log).catch(console.error).finally(() => process.exit(0));
