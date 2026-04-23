const mysql = require('mysql2/promise');
(async () => {
    try {
        const c = await mysql.createConnection({ host: process.env.MYSQL_HOST || '10.109.0.33', user: process.env.MYSQL_USER || 'dataaudit', password: process.env.MYSQL_PASS || 'dataaudit', database: process.env.MYSQL_DB || 'bchhosxpxe' });
        const [rows] = await c.query(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL THEN 1 ELSE 0 END) as has_s7,
        SUM(CASE WHEN r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as has_bill,
        SUM(CASE WHEN st.service5 IS NOT NULL THEN 1 ELSE 0 END) as has_s5,
        SUM(CASE WHEN st.service1 IS NOT NULL THEN 1 ELSE 0 END) as has_s1,
        SUM(CASE WHEN st.service2 IS NOT NULL THEN 1 ELSE 0 END) as has_s2,
        SUM(CASE WHEN st.service3 IS NOT NULL THEN 1 ELSE 0 END) as has_s3,
        SUM(CASE WHEN st.service4 IS NOT NULL THEN 1 ELSE 0 END) as has_s4,
        SUM(CASE WHEN dx.has_dx = 1 THEN 1 ELSE 0 END) as has_dx,
        SUM(CASE WHEN vs.income > 0 THEN 1 ELSE 0 END) as has_income,
        SUM(CASE WHEN st.vn IS NOT NULL THEN 1 ELSE 0 END) as has_service_time_row
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      LEFT JOIN (SELECT vn, 1 as has_dx FROM ovstdiag GROUP BY vn) dx ON o.vn = dx.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
      WHERE o.vstdate = CURDATE()
        AND o.main_dep = '003'
    `);
        console.log('=== TTM (main_dep=003) Today Signals ===');
        console.log(JSON.stringify(rows[0], null, 2));
        await c.end();
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
})();
