import { dbQuery } from './server/db/mysql.js';

const fiscalYearStart = `CONCAT(IF(MONTH(CURDATE()) >= 10, YEAR(CURDATE()), YEAR(CURDATE()) - 1), '-10-01')`;

const q = `
          SELECT p.hn, i.an, w.name as ward,
                 DATEDIFF(i.dchdate, i.regdate) as los, a.income, idr.rw, idr.adjrw, idr.wtlos
          FROM ipt i
          INNER JOIN patient p ON i.hn = p.hn
          INNER JOIN ward w ON i.ward = w.ward
          INNER JOIN an_stat a ON i.an = a.an
          LEFT JOIN ipt_drg_result idr ON idr.an = i.an
          WHERE i.dchdate >= ${fiscalYearStart}
            AND (DATEDIFF(i.dchdate, i.regdate) <= 1 OR DATEDIFF(i.dchdate, i.regdate) >= 14)
            AND i.dchdate <= CURDATE()
          ORDER BY i.dchdate DESC
          LIMIT 5
`;
dbQuery(q).then(console.log).catch(console.error).finally(() => process.exit(0));
