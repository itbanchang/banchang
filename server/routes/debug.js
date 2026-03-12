import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();

// Diagnostic: All specialties in DB (to find correct dental codes)
router.get('/specialties', async (req, res) => {
  try {
    const rows = await dbQuery(`
      SELECT o.spclty, s.name, COUNT(*) as cnt
      FROM ovst o
      LEFT JOIN spclty s ON o.spclty = s.spclty
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY o.spclty, s.name
      ORDER BY cnt DESC
    `);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Diagnostic: Check service_time columns for a department
router.get('/service-time/:dep', async (req, res) => {
  try {
    const dep = req.params.dep;
    const rows = await dbQuery(`
      SELECT
        COUNT(*) as total_visits,
        SUM(CASE WHEN st.vn IS NOT NULL THEN 1 ELSE 0 END) as has_service_time,
        SUM(CASE WHEN st.service1 IS NOT NULL THEN 1 ELSE 0 END) as has_s1,
        SUM(CASE WHEN st.service2 IS NOT NULL THEN 1 ELSE 0 END) as has_s2,
        SUM(CASE WHEN st.service3 IS NOT NULL THEN 1 ELSE 0 END) as has_s3,
        SUM(CASE WHEN st.service4 IS NOT NULL THEN 1 ELSE 0 END) as has_s4,
        SUM(CASE WHEN st.service5 IS NOT NULL THEN 1 ELSE 0 END) as has_s5,
        SUM(CASE WHEN st.service6 IS NOT NULL THEN 1 ELSE 0 END) as has_s6,
        SUM(CASE WHEN st.service7 IS NOT NULL THEN 1 ELSE 0 END) as has_s7,
        SUM(CASE WHEN r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as has_bill_time
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = ?
    `, [dep]);
    res.json({ main_dep: dep, data: rows[0] || {} });
  } catch (e) { res.status(500).json({ error: e.message }); }
});


export default router;
