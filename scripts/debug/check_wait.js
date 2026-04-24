import { dbQuery } from './server/db/mysql.js';

dbQuery(`
  SELECT o.vn, o.vsttime, o.ovstost, o.cur_dep, st.service1, st.service2, st.service7, r.bill_time, v.income
  FROM ovst o 
  LEFT JOIN service_time st ON o.vn = st.vn 
  LEFT JOIN rcpt_print r ON o.vn = r.vn 
  LEFT JOIN vn_stat v ON o.vn = v.vn
  WHERE o.vstdate = CURDATE() 
    AND NOT (o.ovstost IN ('01', '02', '52', '54', '61', '99') OR o.cur_dep IN ('092'))
`).then(rows => {
    const noServiceAll = rows.filter(r => !r.service1 && !r.service2 && !r.service7 && !r.bill_time && !parseFloat(r.income));
    const noDoc = rows.filter(r => !r.service2 && !r.service7 && !r.bill_time && !parseFloat(r.income));

    console.log('Total still_here:', rows.length);
    console.log('No service at all (no screen, doc, pharm, bill, income):', noServiceAll.length);
    console.log('No doctor (no doc, pharm, bill, income):', noDoc.length);
    console.log('Sample noDoc:', noDoc.slice(0, 5));
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
