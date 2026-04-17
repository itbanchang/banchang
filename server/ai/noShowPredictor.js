// ============================================================
// BCH 360° Intelligence V.10 - AI Module
// 📅 Appointment No-Show Predictor
// Algorithm: Weighted heuristic logistic score from HOSxP XE appointment history
// Data: oapp + oapp_cancel + ovst + patient  (311k+ bookings, 1.4M visits)
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';

// Feature weights (tuned for Thai primary-care appointment behavior).
// Positive = raises no-show probability; negative = lowers it.
const W = {
  base: -1.2,                    // intercept: most patients show up
  history_noshow_rate: 3.4,      // #1 predictor
  history_cancel_rate: 1.1,
  lead_time_over_30d: 0.85,      // long lead = forgotten
  lead_time_0_3d: -0.45,         // short notice = likely to attend
  afternoon_slot: 0.18,
  first_time_patient: 0.60,
  frequent_visitor: -0.55,       // chronic-dx pts well-trained
  monday_or_friday: 0.22,
  no_phone_on_file: 0.85,
  age_young_adult: 0.25,         // 18-30
  age_elderly: -0.15,            // >=60 more compliant in Thailand
  rainy_season: 0.12,            // Jun-Oct
};

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function scoreAppointment(f) {
  let z = W.base;
  z += W.history_noshow_rate * Math.min(f.history_noshow_rate || 0, 0.8);
  z += W.history_cancel_rate * Math.min(f.history_cancel_rate || 0, 0.8);
  if (f.lead_time_days >= 30) z += W.lead_time_over_30d;
  if (f.lead_time_days <= 3) z += W.lead_time_0_3d;
  if (f.is_afternoon) z += W.afternoon_slot;
  if (f.is_first_time) z += W.first_time_patient;
  if (f.is_frequent) z += W.frequent_visitor;
  if (f.dow === 1 || f.dow === 5) z += W.monday_or_friday;
  if (!f.has_phone) z += W.no_phone_on_file;
  if (f.age >= 18 && f.age <= 30) z += W.age_young_adult;
  if (f.age >= 60) z += W.age_elderly;
  const m = f.month;
  if (m >= 6 && m <= 10) z += W.rainy_season;
  return sigmoid(z);
}

function bucketize(p) {
  if (p >= 0.55) return { level: 'HIGH', color: '#dc2626' };
  if (p >= 0.30) return { level: 'MED', color: '#f59e0b' };
  return { level: 'LOW', color: '#16a34a' };
}

// ----------------------------------------------------------------
// Public: per-HN historical feature fetch (batched)
// ----------------------------------------------------------------
async function getPatientFeatureMap(hns) {
  if (!hns?.length) return new Map();
  const placeholders = hns.map(() => '?').join(',');

  // Historical no-show count per HN (last 12 months)
  const history = await dbQuery(
    `SELECT o.hn,
            COUNT(*) as total_bookings,
            SUM(CASE WHEN o.nextdate < CURDATE()
                     AND (o.patient_visit IS NULL OR o.patient_visit <> 'Y')
                     AND c.oapp_cancel_id IS NULL
                     THEN 1 ELSE 0 END) as noshow_count,
            SUM(CASE WHEN c.oapp_cancel_id IS NOT NULL THEN 1 ELSE 0 END) as cancel_count,
            SUM(CASE WHEN o.patient_visit = 'Y' THEN 1 ELSE 0 END) as attended_count
       FROM oapp o
       LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
      WHERE o.hn IN (${placeholders})
        AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY o.hn`,
    hns
  ).catch(() => []);

  // Recent visit frequency (attendance proxy)
  const visits = await dbQuery(
    `SELECT hn, COUNT(*) as visit_count
       FROM ovst FORCE INDEX (ix_hn)
      WHERE hn IN (${placeholders})
        AND vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY hn`,
    hns
  ).catch(() => []);

  // Phone on file
  const phones = await dbQuery(
    `SELECT hn,
            CASE WHEN TRIM(COALESCE(hometel, '')) <> '' OR TRIM(COALESCE(mobile_phone_number, '')) <> ''
                 THEN 1 ELSE 0 END as has_phone
       FROM patient
      WHERE hn IN (${placeholders})`,
    hns
  ).catch(() => []);

  const map = new Map();
  for (const h of hns) map.set(h, { total_bookings: 0, noshow_count: 0, cancel_count: 0, attended_count: 0, visit_count: 0, has_phone: 0 });
  for (const r of history)
    Object.assign(map.get(r.hn) || {}, {
      total_bookings: Number(r.total_bookings || 0),
      noshow_count: Number(r.noshow_count || 0),
      cancel_count: Number(r.cancel_count || 0),
      attended_count: Number(r.attended_count || 0),
    });
  for (const r of visits) {
    const m = map.get(r.hn);
    if (m) m.visit_count = Number(r.visit_count || 0);
  }
  for (const r of phones) {
    const m = map.get(r.hn);
    if (m) m.has_phone = Number(r.has_phone || 0);
  }
  return map;
}

// ----------------------------------------------------------------
// Public: scoreUpcomingAppointments
//   days: how many days ahead to score (default 7)
// ----------------------------------------------------------------
export async function scoreUpcomingAppointments(days = 7, limit = 500) {
  const rows = await dbQuery(
    `SELECT o.oapp_id, o.hn, o.nextdate, o.nexttime, o.clinic, o.depcode,
            o.doctor, o.vstdate as booked_on, o.patient_visit,
            k.department as clinic_name,
            p.sex, p.birthday,
            TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
            DATEDIFF(o.nextdate, o.vstdate) as lead_time_days,
            DAYOFWEEK(o.nextdate) - 1 as dow,
            HOUR(o.nexttime) as hr,
            MONTH(o.nextdate) as month,
            c.oapp_cancel_id
       FROM oapp o
       LEFT JOIN kskdepartment k ON o.clinic = k.depcode
       LEFT JOIN patient p ON o.hn = p.hn
       LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
      WHERE o.nextdate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
        AND c.oapp_cancel_id IS NULL
      ORDER BY o.nextdate, o.nexttime
      LIMIT ?`,
    [Number(days), Number(limit)]
  ).catch(() => []);

  const hns = [...new Set(rows.map(r => r.hn).filter(Boolean))];
  const featMap = await getPatientFeatureMap(hns);

  return rows.map(r => {
    const pf = featMap.get(r.hn) || {};
    const total = pf.total_bookings || 0;
    const f = {
      age: Number(r.age || 0),
      history_noshow_rate: total > 0 ? (pf.noshow_count || 0) / total : 0.15,
      history_cancel_rate: total > 0 ? (pf.cancel_count || 0) / total : 0.05,
      lead_time_days: Number(r.lead_time_days || 0),
      is_afternoon: Number(r.hr || 0) >= 12,
      is_first_time: total === 0,
      is_frequent: (pf.visit_count || 0) >= 4,
      dow: Number(r.dow || 0),
      month: Number(r.month || 0),
      has_phone: pf.has_phone === 1,
    };
    const p = scoreAppointment(f);
    const bucket = bucketize(p);
    return {
      oapp_id: r.oapp_id,
      hn: r.hn,
      nextdate: r.nextdate,
      nexttime: r.nexttime,
      clinic: r.clinic,
      clinic_name: r.clinic_name || r.clinic,
      doctor: r.doctor,
      age: f.age,
      sex: r.sex,
      lead_time_days: f.lead_time_days,
      history: {
        total: total,
        noshow: pf.noshow_count || 0,
        cancel: pf.cancel_count || 0,
        attended: pf.attended_count || 0,
        recent_visits_6m: pf.visit_count || 0,
        has_phone: !!f.has_phone,
      },
      noshow_probability: Math.round(p * 100) / 100,
      risk_level: bucket.level,
      risk_color: bucket.color,
    };
  });
}

// ----------------------------------------------------------------
// Public: clinic breakdown summary (rolling 90d)
// ----------------------------------------------------------------
export async function getClinicNoShowBreakdown() {
  const rows = await dbQueryHeavy('apptClinicNoShow_v1', 60, `
    SELECT o.clinic,
           k.department as clinic_name,
           COUNT(*) as total_booked,
           SUM(CASE WHEN o.nextdate < CURDATE()
                    AND (o.patient_visit IS NULL OR o.patient_visit <> 'Y')
                    AND c.oapp_cancel_id IS NULL THEN 1 ELSE 0 END) as noshow_count,
           SUM(CASE WHEN c.oapp_cancel_id IS NOT NULL THEN 1 ELSE 0 END) as cancel_count,
           SUM(CASE WHEN o.patient_visit = 'Y' THEN 1 ELSE 0 END) as attended_count
      FROM oapp o
      LEFT JOIN kskdepartment k ON o.clinic = k.depcode
      LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
     WHERE o.nextdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
       AND o.nextdate < CURDATE()
     GROUP BY o.clinic, k.department
     HAVING COUNT(*) >= 20
     ORDER BY noshow_count DESC
     LIMIT 20
  `).catch(() => []);

  return rows.map(r => {
    const total = Number(r.total_booked || 0);
    const ns = Number(r.noshow_count || 0);
    return {
      clinic: r.clinic,
      clinic_name: r.clinic_name || r.clinic,
      total_booked: total,
      noshow_count: ns,
      cancel_count: Number(r.cancel_count || 0),
      attended_count: Number(r.attended_count || 0),
      noshow_rate_pct: total > 0 ? Math.round((ns / total) * 1000) / 10 : 0,
    };
  });
}

// ----------------------------------------------------------------
// Public: monthly trend (last 6 months)
// ----------------------------------------------------------------
export async function getMonthlyNoShowTrend() {
  const rows = await dbQueryHeavy('apptMonthlyTrend_v1', 120, `
    SELECT DATE_FORMAT(o.nextdate, '%Y-%m') as ym,
           COUNT(*) as total,
           SUM(CASE WHEN o.nextdate < CURDATE()
                    AND (o.patient_visit IS NULL OR o.patient_visit <> 'Y')
                    AND c.oapp_cancel_id IS NULL THEN 1 ELSE 0 END) as noshow,
           SUM(CASE WHEN o.patient_visit = 'Y' THEN 1 ELSE 0 END) as attended
      FROM oapp o
      LEFT JOIN oapp_cancel c ON c.oapp_id = o.oapp_id
     WHERE o.nextdate >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 6 MONTH)
       AND o.nextdate < CURDATE()
     GROUP BY DATE_FORMAT(o.nextdate, '%Y-%m')
     ORDER BY ym
  `).catch(() => []);

  return rows.map(r => {
    const total = Number(r.total || 0);
    const ns = Number(r.noshow || 0);
    return {
      ym: r.ym,
      total,
      noshow: ns,
      attended: Number(r.attended || 0),
      noshow_rate_pct: total > 0 ? Math.round((ns / total) * 1000) / 10 : 0,
    };
  });
}

// ----------------------------------------------------------------
// Public: over-booking recommendation per clinic/day
// Formula: recommended_overbook = expected_no_shows × 0.70 (75% confidence margin)
// ----------------------------------------------------------------
export function recommendOverbooking(clinicBreakdown, todayBookings) {
  if (!clinicBreakdown?.length || !todayBookings?.length) return [];
  const rateByClinic = new Map(
    clinicBreakdown.map(c => [c.clinic, c.noshow_rate_pct / 100])
  );
  return todayBookings
    .map(b => {
      const rate = rateByClinic.get(b.clinic) || 0.1;
      const expectedNoShows = b.booked_count * rate;
      const recommendedOverbook = Math.round(expectedNoShows * 0.7);
      return {
        ...b,
        noshow_rate: Math.round(rate * 1000) / 10,
        expected_noshows: Math.round(expectedNoShows * 10) / 10,
        recommended_overbook: recommendedOverbook,
      };
    })
    .filter(b => b.recommended_overbook > 0);
}

export default {
  scoreUpcomingAppointments,
  getClinicNoShowBreakdown,
  getMonthlyNoShowTrend,
  recommendOverbooking,
};
