// ============================================================
// BCH 360° Intelligence V.10 - Appointment No-Show & Smart Booking
// Data: oapp (311,819) + oapp_cancel (1,881) + oapp_message_send
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import {
  scoreUpcomingAppointments,
  getClinicNoShowBreakdown,
  getMonthlyNoShowTrend,
  recommendOverbooking,
} from '../ai/noShowPredictor.js';

const router = Router();

// ------------------------------------------------------------
// GET /api/appointment/summary — headline KPIs
// ------------------------------------------------------------
router.get('/summary', cached('apptSummary', 60000, async () => {
  const [todayBooked, tomorrowBooked, weekBooked, last30Summary, last90NoShow, smsSent] = await Promise.all([
    dbQueryOne(`SELECT COUNT(*) as c FROM oapp WHERE nextdate = CURDATE()`).catch(() => null),
    dbQueryOne(`SELECT COUNT(*) as c FROM oapp WHERE nextdate = DATE_ADD(CURDATE(), INTERVAL 1 DAY)`).catch(() => null),
    dbQueryOne(
      `SELECT COUNT(*) as c FROM oapp
         WHERE nextdate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)`
    ).catch(() => null),
    dbQueryHeavy('apptLast30Summary_v1', 30, `
      SELECT COUNT(*) as total,
             SUM(CASE WHEN o.patient_visit = 'Y' THEN 1 ELSE 0 END) as attended,
             SUM(CASE WHEN c.oapp_cancel_id IS NOT NULL THEN 1 ELSE 0 END) as cancelled,
             SUM(CASE WHEN o.nextdate < CURDATE()
                      AND (o.patient_visit IS NULL OR o.patient_visit <> 'Y')
                      AND c.oapp_cancel_id IS NULL THEN 1 ELSE 0 END) as noshow
        FROM oapp o
        LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
       WHERE o.nextdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND o.nextdate < CURDATE()
    `).catch(() => null),
    dbQueryHeavy('apptLast90NoShow_v1', 60, `
      SELECT COUNT(*) as total,
             SUM(CASE WHEN o.nextdate < CURDATE()
                      AND (o.patient_visit IS NULL OR o.patient_visit <> 'Y')
                      AND c.oapp_cancel_id IS NULL THEN 1 ELSE 0 END) as noshow
        FROM oapp o
        LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
       WHERE o.nextdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
         AND o.nextdate < CURDATE()
    `).catch(() => null),
    dbQueryOne(
      `SELECT COUNT(*) as c FROM oapp_message_send
         WHERE DATE(send_datetime) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`
    ).catch(() => null),
  ]);

  const last30 = last30Summary || {};
  const total30 = Number(last30.total || 0);
  const noshow30 = Number(last30.noshow || 0);

  const last90 = last90NoShow || {};
  const total90 = Number(last90.total || 0);
  const noshow90 = Number(last90.noshow || 0);

  return {
    today_booked: Number(todayBooked?.c || 0),
    tomorrow_booked: Number(tomorrowBooked?.c || 0),
    week_booked: Number(weekBooked?.c || 0),
    last_30d: {
      total: total30,
      attended: Number(last30.attended || 0),
      noshow: noshow30,
      cancelled: Number(last30.cancelled || 0),
      noshow_rate_pct: total30 > 0 ? Math.round((noshow30 / total30) * 1000) / 10 : 0,
    },
    last_90d: {
      total: total90,
      noshow: noshow90,
      noshow_rate_pct: total90 > 0 ? Math.round((noshow90 / total90) * 1000) / 10 : 0,
    },
    sms_sent_30d: Number(smsSent?.c || 0),
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/appointment/risk-list?days=7 — high-risk upcoming
// ------------------------------------------------------------
const riskListSchema = z.object({
  days: z.coerce.number().int().min(1).max(14).optional(),
  limit: z.coerce.number().int().min(10).max(1000).optional(),
});
router.get('/risk-list',
  validateQuery(riskListSchema),
  async (req, res) => {
    try {
      const days = Number(req.query.days || 7);
      const limit = Number(req.query.limit || 300);
      const rows = await scoreUpcomingAppointments(days, limit);
      const buckets = { HIGH: 0, MED: 0, LOW: 0 };
      for (const r of rows) buckets[r.risk_level] = (buckets[r.risk_level] || 0) + 1;
      res.json({
        data_source: 'HOSxP XE',
        days,
        total: rows.length,
        buckets,
        expected_noshows: rows.reduce((s, r) => s + r.noshow_probability, 0).toFixed(1),
        rows,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/appointment/clinic-breakdown — 90d rolling
// ------------------------------------------------------------
router.get('/clinic-breakdown', cached('apptClinicBreakdown', 120000, async () => {
  const rows = await getClinicNoShowBreakdown();
  return {
    data_source: 'HOSxP XE',
    window_days: 90,
    total_clinics: rows.length,
    rows,
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/appointment/monthly-trend — 6 months
// ------------------------------------------------------------
router.get('/monthly-trend', cached('apptMonthlyTrend', 300000, async () => {
  const rows = await getMonthlyNoShowTrend();
  return {
    data_source: 'HOSxP XE',
    window_months: 6,
    rows,
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/appointment/calendar?date=YYYY-MM-DD — daily slots
// ------------------------------------------------------------
const calendarSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
router.get('/calendar',
  validateQuery(calendarSchema),
  async (req, res) => {
    try {
      const date = req.query.date || new Date().toISOString().slice(0, 10);
      const rows = await dbQuery(
        `SELECT HOUR(o.nexttime) as hr,
                o.clinic,
                k.department as clinic_name,
                COUNT(*) as booked,
                SUM(CASE WHEN c.oapp_cancel_id IS NOT NULL THEN 1 ELSE 0 END) as cancelled
           FROM oapp o
           LEFT JOIN kskdepartment k ON o.clinic = k.depcode
           LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
          WHERE o.nextdate = ?
          GROUP BY HOUR(o.nexttime), o.clinic, k.department
          ORDER BY hr, clinic`,
        [date]
      ).catch(() => []);

      const byHour = {};
      const byClinic = {};
      let total = 0;
      let totalCancelled = 0;
      for (const r of rows) {
        const hr = Number(r.hr ?? 0);
        const booked = Number(r.booked || 0);
        const cancelled = Number(r.cancelled || 0);
        total += booked;
        totalCancelled += cancelled;
        if (!byHour[hr]) byHour[hr] = { hr, booked: 0, cancelled: 0 };
        byHour[hr].booked += booked;
        byHour[hr].cancelled += cancelled;
        const cKey = r.clinic || 'UNK';
        if (!byClinic[cKey]) byClinic[cKey] = { clinic: cKey, clinic_name: r.clinic_name || cKey, booked: 0, cancelled: 0 };
        byClinic[cKey].booked += booked;
        byClinic[cKey].cancelled += cancelled;
      }

      res.json({
        data_source: 'HOSxP XE',
        date,
        total_booked: total,
        total_cancelled: totalCancelled,
        by_hour: Object.values(byHour).sort((a, b) => a.hr - b.hr),
        by_clinic: Object.values(byClinic).sort((a, b) => b.booked - a.booked),
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/appointment/overbooking — suggestions for today/tomorrow
// ------------------------------------------------------------
router.get('/overbooking', cached('apptOverbooking', 60000, async () => {
  const [clinicBreakdown, todayBookings] = await Promise.all([
    getClinicNoShowBreakdown(),
    dbQuery(`
      SELECT o.clinic,
             k.department as clinic_name,
             COUNT(*) as booked_count
        FROM oapp o
        LEFT JOIN kskdepartment k ON o.clinic = k.depcode
       WHERE o.nextdate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)
       GROUP BY o.clinic, k.department
       HAVING booked_count >= 3
       ORDER BY booked_count DESC
    `).catch(() => []),
  ]);
  const recs = recommendOverbooking(clinicBreakdown, todayBookings);
  return {
    data_source: 'HOSxP XE',
    total_clinics: recs.length,
    total_extra_slots_suggested: recs.reduce((s, r) => s + r.recommended_overbook, 0),
    rows: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/appointment/top-offenders — patients with worst history
// ------------------------------------------------------------
router.get('/top-offenders', cached('apptTopOffenders', 300000, async () => {
  const rows = await dbQueryHeavy('apptTopOffenders_v1', 60, `
    SELECT o.hn,
           CONCAT(COALESCE(p.pname, ''), COALESCE(p.fname, ''), ' ', COALESCE(p.lname, '')) as name,
           TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
           COUNT(*) as total_bookings,
           SUM(CASE WHEN o.nextdate < CURDATE()
                    AND (o.patient_visit IS NULL OR o.patient_visit <> 'Y')
                    AND c.oapp_cancel_id IS NULL THEN 1 ELSE 0 END) as noshow_count,
           SUM(CASE WHEN c.oapp_cancel_id IS NOT NULL THEN 1 ELSE 0 END) as cancel_count,
           MAX(o.nextdate) as last_booking_date,
           CASE WHEN TRIM(COALESCE(p.mobile_phone_number, '')) <> '' THEN 1 ELSE 0 END as has_mobile
      FROM oapp o
      LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
      LEFT JOIN patient p ON o.hn = p.hn
     WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
     GROUP BY o.hn, p.pname, p.fname, p.lname, p.birthday, p.mobile_phone_number
     HAVING noshow_count >= 3 AND total_bookings >= 5
     ORDER BY noshow_count DESC, total_bookings DESC
     LIMIT 50
  `).catch(() => []);

  return {
    data_source: 'HOSxP XE',
    window_months: 12,
    rows: rows.map(r => ({
      hn: r.hn,
      name: (r.name || '').trim() || '-',
      age: Number(r.age || 0),
      total_bookings: Number(r.total_bookings || 0),
      noshow_count: Number(r.noshow_count || 0),
      cancel_count: Number(r.cancel_count || 0),
      noshow_rate_pct: r.total_bookings > 0
        ? Math.round((Number(r.noshow_count) / Number(r.total_bookings)) * 1000) / 10
        : 0,
      last_booking_date: r.last_booking_date,
      has_mobile: r.has_mobile === 1,
    })),
    timestamp: new Date().toISOString(),
  };
}));

export default router;
