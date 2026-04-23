import mysql from 'mysql2/promise';

async function run() {
  const pool = mysql.createPool({ host: process.env.MYSQL_HOST || '10.109.0.33', user: process.env.MYSQL_USER || 'dataaudit', password: process.env.MYSQL_PASS || 'dataaudit', database: process.env.MYSQL_DB || 'bchhosxpxe' });

  const sql = `
      SELECT 
        YEAR(vstdate) as year_num,
        MONTH(vstdate) as month_num,
        AVG(CASE
          WHEN service1 IS NOT NULL
            AND TIME_TO_SEC(service1) > TIME_TO_SEC(vsttime)
          THEN (TIME_TO_SEC(service1) - TIME_TO_SEC(vsttime)) / 60
        END) AS avg_reg_to_screen,
        AVG(CASE
          WHEN service2 IS NOT NULL AND service1 IS NOT NULL
            AND TIME_TO_SEC(service2) > TIME_TO_SEC(service1)
          THEN (TIME_TO_SEC(service2) - TIME_TO_SEC(service1)) / 60
        END) AS avg_screen_to_doc,
        AVG(CASE
          WHEN service7 IS NOT NULL AND service2 IS NOT NULL
            AND TIME_TO_SEC(service7) > TIME_TO_SEC(service2)
          THEN (TIME_TO_SEC(service7) - TIME_TO_SEC(service2)) / 60
        END) AS avg_doc_to_rx
      FROM service_time
      WHERE vstdate >= '2025-10-01'
        AND service1 IS NOT NULL
      GROUP BY YEAR(vstdate), MONTH(vstdate)
  `;

  try {
    const [explain] = await pool.query('EXPLAIN ' + sql);
    console.log(JSON.stringify(explain, null, 2));

    console.log('Running query...');
    const start = Date.now();
    const [rows] = await pool.query(sql);
    console.log('Rows:', rows.length, 'Time:', Date.now() - start, 'ms');
  } catch (err) {
    console.error(err.message);
  }
  process.exit(0);
}

run();
