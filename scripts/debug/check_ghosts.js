import { dbQuery } from './server/db/mysql.js';

dbQuery(`
  SELECT o.vn, o.vsttime, o.ovstost, o.cur_dep, st.service1, st.service2, st.service7, r.bill_time, v.income,
         (SELECT 1 FROM ovstdiag WHERE vn = o.vn LIMIT 1) as has_dx,
         TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), NOW()) as total_wait_mins
  FROM ovst o 
  LEFT JOIN service_time st ON o.vn = st.vn 
  LEFT JOIN rcpt_print r ON o.vn = r.vn 
  LEFT JOIN vn_stat v ON o.vn = v.vn
  WHERE o.vstdate = CURDATE() 
`).then(rows => {
    let oldLogicWaiting = [];
    let noServiceAbandon = [];
    let NCDLogicWaiting = [];

    rows.forEach(r => {
        let oldCompleted = ['01', '02', '52', '54', '61', '99'].includes(r.ovstost) || ['092'].includes(r.cur_dep);
        if (!oldCompleted) oldLogicWaiting.push(r);

        // "เปิดแล้วไม่รับบริการ" - maybe hasn't seen doctor (service2) AND has no DX, AND it's been over 2 hours?
        let isGhost = !r.service2 && !r.has_dx && r.total_wait_mins > 120;
        if (isGhost && !oldCompleted) {
            noServiceAbandon.push(r);
        }

        // NCD Logic Waiting
        let isCompletedNCD = r.service7 || r.bill_time || (r.service2 && (r.has_dx || r.income > 0));
        if (!isCompletedNCD && !oldCompleted) {
            NCDLogicWaiting.push(r);
        }
    });

    console.log('Total Old Logic Waiting:', oldLogicWaiting.length);
    console.log('Of those, Wait > 2hrs without doctor/dx (Ghosts):', noServiceAbandon.length);
    console.log('Total Waiting with NCD Logic:', NCDLogicWaiting.length);

    console.log('Sample of Ghosts:', noServiceAbandon.slice(0, 5));

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
