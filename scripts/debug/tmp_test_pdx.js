import { dbQuery } from './server/db/mysql.js';

const fiscalYearStart = `CONCAT(IF(MONTH(CURDATE()) >= 10, YEAR(CURDATE()), YEAR(CURDATE()) - 1), '-10-01')`;

const q = `
          SELECT p.hn, i.an, REPLACE(CONCAT(p.pname, p.fname, ' ', p.lname), '  ', ' ') as name, w.name as ward,
                 d.icd10 as original_pdx, a.rw,
                 GROUP_CONCAT(DISTINCT CONCAT(IFNULL(lo.lab_items_name_ref, ''), ' [', IFNULL(lo.lab_order_result, ''), ']') SEPARATOR ', ') as abnormal_labs
          FROM ipt i
          INNER JOIN patient p ON i.hn = p.hn
          INNER JOIN ward w ON i.ward = w.ward
          INNER JOIN an_stat a ON i.an = a.an
          INNER JOIN iptdiag d ON i.an = d.an AND d.diagtype = '1'
          LEFT JOIN lab_head lh ON lh.hn = i.hn AND lh.order_date BETWEEN i.regdate AND i.dchdate
          LEFT JOIN lab_order lo ON lo.lab_order_number = lh.lab_order_number 
            AND lo.abnormal_result = 'Y' 
            AND (lo.lab_items_name_ref LIKE '%WBC%' OR lo.lab_items_name_ref LIKE '%Cultur%' OR lo.lab_items_name_ref LIKE '%Hemo%' OR lo.lab_items_name_ref LIKE '%Stool%')
          WHERE i.dchdate >= ${fiscalYearStart}
            AND d.icd10 IN ('J189', 'K358', 'A419', 'I64', 'N201', 'A099', 'N390')
          GROUP BY p.hn, i.an, name, ward, original_pdx, a.rw
          ORDER BY i.dchdate DESC
          LIMIT 5
`;
dbQuery(q).then(console.log).catch(console.error).finally(() => process.exit(0));
