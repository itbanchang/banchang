// ============================================================
// BCH 360° Intelligence V.10 - Real-Time Patient Flow Heatmap
// Data: ovst + service_time + rcpt_print + lab_head + xray_head + er_regist
// Pipeline: Registration → Screening → Exam → Lab/Xray → Pharmacy → Finance → Discharge
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';

const router = Router();

// Stage definitions — the 7 steps tracked in HOSxP XE service_time + ancillary events.
// order-index is used by frontend for left-to-right Sankey.
const STAGES = [
  { id: 'registration', label: 'ลงทะเบียน', icon: '📝', target_min: 5 },
  { id: 'screening', label: 'คัดกรอง', icon: '🩺', target_min: 10 },
  { id: 'waiting_doctor', label: 'รอตรวจ', icon: '⏳', target_min: 30 },
  { id: 'examination', label: 'กำลังตรวจ', icon: '👨‍⚕️', target_min: 15 },
  { id: 'lab_xray', label: 'Lab/X-ray', icon: '🔬', target_min: 30 },
  { id: 'pharmacy', label: 'รับยา', icon: '💊', target_min: 20 },
  { id: 'finance', label: 'ชำระเงิน', icon: '💰', target_min: 10 },
  { id: 'discharge', label: 'กลับบ้าน', icon: '🏠', target_min: 0 },
];

// ------------------------------------------------------------
// GET /api/patientflow/live — current snapshot
//   returns: count + avg wait time per stage
// ------------------------------------------------------------
router.get('/live', cached('flowLive', 30000, async () => {
  const [opdSnapshot, erSnapshot, labPending, xrayPending] = await Promise.all([
    // Main OPD funnel
    dbQueryOne(`
      SELECT
        COUNT(*) as total_today,
        SUM(CASE WHEN st.vn IS NULL THEN 1 ELSE 0 END) as at_registration,
        SUM(CASE WHEN st.service1 IS NOT NULL AND st.service2 IS NULL
                 AND (o.ovstost IS NULL OR o.ovstost IN ('00','98')) THEN 1 ELSE 0 END) as at_waiting_doctor,
        SUM(CASE WHEN st.service2 IS NOT NULL AND st.service7 IS NULL AND r.bill_time IS NULL
                 AND (o.ovstost IS NULL OR o.ovstost IN ('00','98')) THEN 1 ELSE 0 END) as at_examination_or_ancillary,
        SUM(CASE WHEN st.service7 IS NOT NULL AND r.bill_time IS NULL
                 AND (o.ovstost IS NULL OR o.ovstost IN ('00','98')) THEN 1 ELSE 0 END) as at_finance,
        SUM(CASE WHEN r.bill_time IS NOT NULL OR o.ovstost IN ('01','02','03','04','05','54','61','89','99')
                 THEN 1 ELSE 0 END) as completed,
        -- Stage timings
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
                 THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime))/60 END), 0) as t_reg_to_screen,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
                 AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
                 THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1))/60 END), 0) as t_screen_to_doctor,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
                 AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
                 THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2))/60 END), 0) as t_doctor_to_pharmacy,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
                 AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
                 THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(st.service7))/60 END), 0) as t_pharmacy_to_finance
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `).catch(() => null),

    // ER funnel
    dbQueryOne(`
      SELECT COUNT(*) as er_total,
             SUM(CASE WHEN enter_er_time IS NOT NULL AND doctor_tx_time IS NULL THEN 1 ELSE 0 END) as er_waiting_doctor,
             SUM(CASE WHEN doctor_tx_time IS NOT NULL AND finish_time IS NULL THEN 1 ELSE 0 END) as er_in_treatment,
             SUM(CASE WHEN finish_time IS NOT NULL THEN 1 ELSE 0 END) as er_finished,
             ROUND(AVG(CASE WHEN doctor_tx_time IS NOT NULL AND enter_er_time IS NOT NULL
                      THEN TIMESTAMPDIFF(MINUTE, enter_er_time, doctor_tx_time) END), 0) as er_door_to_doctor_min
        FROM er_regist
       WHERE vstdate = CURDATE()
    `).catch(() => null),

    // Lab pending
    dbQueryOne(`
      SELECT COUNT(*) as pending_count,
             ROUND(AVG(CASE WHEN report_date IS NOT NULL AND order_date IS NOT NULL
                      THEN TIMESTAMPDIFF(MINUTE,
                        CONCAT(order_date, ' ', COALESCE(order_time, '00:00:00')),
                        CONCAT(report_date, ' ', COALESCE(report_time, '00:00:00'))) END), 0) as avg_tat_min
        FROM lab_head
       WHERE order_date = CURDATE()
    `).catch(() => null),

    // Xray pending
    dbQueryOne(`
      SELECT COUNT(*) as pending_count,
             SUM(CASE WHEN confirm_read_film = 'Y' THEN 1 ELSE 0 END) as read_count
        FROM xray_head
       WHERE order_date = CURDATE()
    `).catch(() => null),
  ]);

  const o = opdSnapshot || {};
  const total = Number(o.total_today || 0);
  const atReg = Number(o.at_registration || 0);
  const atWait = Number(o.at_waiting_doctor || 0);
  const atExam = Number(o.at_examination_or_ancillary || 0);
  const atFin = Number(o.at_finance || 0);
  const done = Number(o.completed || 0);

  // Compose stages array for the UI
  const stages = [
    { id: 'registration', label: 'ลงทะเบียน',    icon: '📝', count: atReg,  avg_min: 0,
      target_min: 5 },
    { id: 'screening',    label: 'คัดกรอง',       icon: '🩺', count: 0,      avg_min: Number(o.t_reg_to_screen || 0),
      target_min: 10 },
    { id: 'waiting',      label: 'รอตรวจ',        icon: '⏳', count: atWait, avg_min: Number(o.t_screen_to_doctor || 0),
      target_min: 30 },
    { id: 'examination',  label: 'กำลังตรวจ/Ancillary', icon: '👨‍⚕️', count: atExam, avg_min: Number(o.t_doctor_to_pharmacy || 0),
      target_min: 30 },
    { id: 'finance',      label: 'ชำระเงิน/รับยา', icon: '💰', count: atFin,  avg_min: Number(o.t_pharmacy_to_finance || 0),
      target_min: 20 },
    { id: 'discharge',    label: 'กลับบ้าน',      icon: '🏠', count: done,   avg_min: 0,
      target_min: 0 },
  ].map(s => ({
    ...s,
    over_target: s.target_min > 0 && s.avg_min > s.target_min,
    health: s.target_min > 0
      ? (s.avg_min <= s.target_min ? 'good' : s.avg_min <= s.target_min * 1.5 ? 'warn' : 'crit')
      : 'good',
  }));

  return {
    data_source: 'HOSxP XE',
    opd: {
      total_today: total,
      still_here: atReg + atWait + atExam + atFin,
      completed: done,
      stages,
    },
    er: {
      total: Number(erSnapshot?.er_total || 0),
      waiting_doctor: Number(erSnapshot?.er_waiting_doctor || 0),
      in_treatment: Number(erSnapshot?.er_in_treatment || 0),
      finished: Number(erSnapshot?.er_finished || 0),
      door_to_doctor_min: Number(erSnapshot?.er_door_to_doctor_min || 0),
    },
    ancillary: {
      lab_pending: Number(labPending?.pending_count || 0),
      lab_avg_tat_min: Number(labPending?.avg_tat_min || 0),
      xray_pending: Number(xrayPending?.pending_count || 0),
      xray_read_count: Number(xrayPending?.read_count || 0),
    },
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/patientflow/heatmap?date=YYYY-MM-DD — hour x stage
// ------------------------------------------------------------
const heatmapSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
router.get('/heatmap',
  validateQuery(heatmapSchema),
  async (req, res) => {
    try {
      const date = req.query.date || new Date().toISOString().slice(0, 10);
      const rows = await dbQueryHeavy(`flowHeatmap_${date}`, 60, `
        SELECT HOUR(o.vsttime) as hr,
               -- time spent registration→screening
               ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
                        THEN (TIME_TO_SEC(st.service1)-TIME_TO_SEC(o.vsttime))/60 END), 0) as reg_to_screen,
               -- screening→doctor (waiting)
               ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
                        AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
                        THEN (TIME_TO_SEC(st.service2)-TIME_TO_SEC(st.service1))/60 END), 0) as screen_to_doctor,
               -- doctor→pharmacy
               ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
                        AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
                        THEN (TIME_TO_SEC(st.service7)-TIME_TO_SEC(st.service2))/60 END), 0) as doctor_to_pharmacy,
               -- pharmacy→finance
               ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
                        AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
                        THEN (TIME_TO_SEC(r.bill_time)-TIME_TO_SEC(st.service7))/60 END), 0) as pharmacy_to_finance,
               COUNT(*) as visit_count
          FROM ovst o FORCE INDEX (ix_vstdate)
          LEFT JOIN service_time st ON o.vn = st.vn
          LEFT JOIN rcpt_print r ON o.vn = r.vn
         WHERE o.vstdate = ?
         GROUP BY HOUR(o.vsttime)
         ORDER BY hr
      `, [date]).catch(() => []);

      // Build cells matrix: hours (7-20) × 4 stages
      const stageKeys = [
        { id: 'reg_to_screen', label: 'ลงทะเบียน→คัดกรอง', target: 10 },
        { id: 'screen_to_doctor', label: 'คัดกรอง→พบแพทย์', target: 30 },
        { id: 'doctor_to_pharmacy', label: 'แพทย์→จ่ายยา', target: 30 },
        { id: 'pharmacy_to_finance', label: 'จ่ายยา→ชำระเงิน', target: 10 },
      ];
      const hours = [];
      for (let h = 7; h <= 20; h++) {
        const row = rows.find(r => Number(r.hr) === h);
        hours.push({
          hr: h,
          label: `${String(h).padStart(2, '0')}:00`,
          visit_count: Number(row?.visit_count || 0),
          cells: stageKeys.map(s => {
            const val = Number(row?.[s.id] || 0);
            const severity = val === 0 ? 'empty'
              : val <= s.target ? 'good'
              : val <= s.target * 1.5 ? 'warn'
              : 'crit';
            return { stage: s.id, value: val, severity };
          }),
        });
      }

      // Bottleneck: which stage has worst avg?
      let worstStage = null;
      let worstDelta = 0;
      for (const s of stageKeys) {
        const vals = rows.map(r => Number(r[s.id] || 0)).filter(v => v > 0);
        if (!vals.length) continue;
        const avg = vals.reduce((x, y) => x + y, 0) / vals.length;
        const delta = avg - s.target;
        if (delta > worstDelta) { worstDelta = delta; worstStage = { ...s, avg: Math.round(avg), delta: Math.round(delta) }; }
      }

      res.json({
        data_source: 'HOSxP XE',
        date,
        stages: stageKeys,
        hours,
        bottleneck: worstStage,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/patientflow/bottleneck — current minute-level bottleneck + rec
// ------------------------------------------------------------
router.get('/bottleneck', cached('flowBottleneck', 30000, async () => {
  const [waiters, doctors, pharmacy] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) as waiting_doctor_now,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service1), NOW())), 0) as avg_wait_now_min,
        MAX(TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service1), NOW())) as max_wait_now_min
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate = CURDATE()
        AND st.service1 IS NOT NULL AND st.service2 IS NULL
        AND (o.ovstost IS NULL OR o.ovstost IN ('00','98'))
    `).catch(() => null),
    dbQueryOne(`
      SELECT COUNT(DISTINCT o.doctor) as doctors_on_duty
        FROM ovst o
       WHERE o.vstdate = CURDATE() AND o.doctor IS NOT NULL AND o.doctor <> ''
    `).catch(() => null),
    dbQueryOne(`
      SELECT COUNT(*) as waiting_pharmacy_now,
             ROUND(AVG(TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service7), NOW())), 0) as avg_pharm_wait_min
        FROM ovst o
        LEFT JOIN service_time st ON o.vn = st.vn
        LEFT JOIN rcpt_print r ON o.vn = r.vn
       WHERE o.vstdate = CURDATE()
         AND st.service7 IS NOT NULL AND r.bill_time IS NULL
         AND (o.ovstost IS NULL OR o.ovstost IN ('00','98'))
    `).catch(() => null),
  ]);

  const alerts = [];
  const waitDr = Number(waiters?.waiting_doctor_now || 0);
  const avgDr = Number(waiters?.avg_wait_now_min || 0);
  const docs = Number(doctors?.doctors_on_duty || 0);
  const waitPharm = Number(pharmacy?.waiting_pharmacy_now || 0);
  const avgPharm = Number(pharmacy?.avg_pharm_wait_min || 0);

  if (avgDr >= 60) {
    alerts.push({
      level: 'crit', stage: 'waiting_doctor',
      message: `ผู้ป่วยรอพบแพทย์เฉลี่ย ${avgDr} นาที (${waitDr} คน) — เกินเกณฑ์ 60 นาที`,
      action: docs < 3 ? 'เพิ่มแพทย์ออกตรวจ' : 'พิจารณาเปิดห้องตรวจสำรอง',
    });
  } else if (avgDr >= 40) {
    alerts.push({
      level: 'warn', stage: 'waiting_doctor',
      message: `ผู้ป่วยรอพบแพทย์เฉลี่ย ${avgDr} นาที (${waitDr} คน)`,
      action: 'ติดตามผู้ป่วยคิวแรกและแจ้ง turnaround',
    });
  }
  if (avgPharm >= 30) {
    alerts.push({
      level: 'crit', stage: 'pharmacy',
      message: `ผู้ป่วยรอรับยาเฉลี่ย ${avgPharm} นาที (${waitPharm} คน) — เกิน 30 นาที`,
      action: 'เพิ่มเภสัชกรจุดจ่ายยา หรือเปิดช่องทางด่วนสำหรับยานัด/ยาเดิม',
    });
  } else if (avgPharm >= 20) {
    alerts.push({
      level: 'warn', stage: 'pharmacy',
      message: `ผู้ป่วยรอรับยาเฉลี่ย ${avgPharm} นาที (${waitPharm} คน)`,
      action: 'ตรวจสอบ drug interaction queue',
    });
  }
  if (!alerts.length) alerts.push({ level: 'good', message: 'ระบบ Flow อยู่ในเกณฑ์ปกติ' });

  return {
    data_source: 'HOSxP XE',
    waiting_doctor: { count: waitDr, avg_min: avgDr, max_min: Number(waiters?.max_wait_now_min || 0) },
    doctors_on_duty: docs,
    waiting_pharmacy: { count: waitPharm, avg_min: avgPharm },
    alerts,
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/patientflow/historical?date=YYYY-MM-DD — past-day replay
// ------------------------------------------------------------
const historicalSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
router.get('/historical',
  validateQuery(historicalSchema),
  async (req, res) => {
    try {
      const date = req.query.date;
      const [opdSummary, erSummary, labSummary, xraySummary] = await Promise.all([
        dbQueryHeavy(`flowHistOPD_${date}`, 300, `
          SELECT
            COUNT(*) as total,
            SUM(CASE WHEN r.bill_time IS NOT NULL OR st.service7 IS NOT NULL
                     OR o.ovstost IN ('01','02','03','04','05','54','61','89','99')
                     THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN o.ovstost IN ('61','89') THEN 1 ELSE 0 END) as lwbs_count,
            ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
                     THEN (TIME_TO_SEC(st.service1)-TIME_TO_SEC(o.vsttime))/60 END), 0) as t_reg,
            ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
                     AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
                     THEN (TIME_TO_SEC(st.service2)-TIME_TO_SEC(st.service1))/60 END), 0) as t_wait,
            ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
                     AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
                     THEN (TIME_TO_SEC(st.service7)-TIME_TO_SEC(st.service2))/60 END), 0) as t_exam,
            ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
                     AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
                     THEN (TIME_TO_SEC(r.bill_time)-TIME_TO_SEC(st.service7))/60 END), 0) as t_fin,
            ROUND(AVG(CASE
              WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
                THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime))/60
              WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
                THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime))/60 END), 0) as end_to_end_min,
            MAX(CASE
              WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
                THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime))/60
              WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
                THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime))/60 END) as max_wait_min
          FROM ovst o FORCE INDEX (ix_vstdate)
          LEFT JOIN service_time st ON o.vn = st.vn
          LEFT JOIN rcpt_print r ON o.vn = r.vn
          WHERE o.vstdate = ?
        `, [date]).catch(() => null),
        dbQueryOne(`
          SELECT COUNT(*) as total,
                 ROUND(AVG(CASE WHEN doctor_tx_time IS NOT NULL AND enter_er_time IS NOT NULL
                          THEN TIMESTAMPDIFF(MINUTE, enter_er_time, doctor_tx_time) END), 0) as door_to_dr_min,
                 ROUND(AVG(CASE WHEN finish_time IS NOT NULL AND enter_er_time IS NOT NULL
                          THEN TIMESTAMPDIFF(MINUTE, enter_er_time, finish_time) END), 0) as los_min
            FROM er_regist WHERE vstdate = ?
        `, [date]).catch(() => null),
        dbQueryOne(`
          SELECT COUNT(*) as total,
                 ROUND(AVG(CASE WHEN report_date IS NOT NULL AND order_date IS NOT NULL
                          THEN TIMESTAMPDIFF(MINUTE,
                            CONCAT(order_date, ' ', COALESCE(order_time, '00:00:00')),
                            CONCAT(report_date, ' ', COALESCE(report_time, '00:00:00'))) END), 0) as avg_tat_min
            FROM lab_head WHERE order_date = ?
        `, [date]).catch(() => null),
        dbQueryOne(`
          SELECT COUNT(*) as total,
                 SUM(CASE WHEN confirm_read_film = 'Y' THEN 1 ELSE 0 END) as read_count
            FROM xray_head WHERE order_date = ?
        `, [date]).catch(() => null),
      ]);

      const o = opdSummary || {};
      res.json({
        data_source: 'HOSxP XE',
        mode: 'historical',
        date,
        opd: {
          total: Number(o.total || 0),
          completed: Number(o.completed || 0),
          lwbs_count: Number(o.lwbs_count || 0),
          completion_rate_pct: Number(o.total || 0) > 0
            ? Math.round(Number(o.completed || 0) / Number(o.total || 0) * 1000) / 10 : 0,
          t_registration: Number(o.t_reg || 0),
          t_waiting: Number(o.t_wait || 0),
          t_examination: Number(o.t_exam || 0),
          t_finance: Number(o.t_fin || 0),
          end_to_end_min: Number(o.end_to_end_min || 0),
          max_wait_min: Number(o.max_wait_min || 0),
        },
        er: {
          total: Number(erSummary?.total || 0),
          door_to_dr_min: Number(erSummary?.door_to_dr_min || 0),
          los_min: Number(erSummary?.los_min || 0),
        },
        lab: {
          total: Number(labSummary?.total || 0),
          avg_tat_min: Number(labSummary?.avg_tat_min || 0),
        },
        xray: {
          total: Number(xraySummary?.total || 0),
          read_count: Number(xraySummary?.read_count || 0),
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/patientflow/clinic-drilldown?stage=xxx&date=YYYY-MM-DD
//   Breakdown: which clinics are bottleneck for a stage
//   stage = waiting_doctor | pharmacy | registration | examination
// ------------------------------------------------------------
const drilldownSchema = z.object({
  stage: z.enum(['waiting_doctor', 'pharmacy', 'registration', 'examination']).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  limit: z.coerce.number().int().min(3).max(50).optional(),
});
router.get('/clinic-drilldown',
  validateQuery(drilldownSchema),
  async (req, res) => {
    try {
      const stage = req.query.stage || 'waiting_doctor';
      const date = req.query.date || new Date().toISOString().slice(0, 10);
      const limit = Number(req.query.limit || 10);

      // SQL expression for the selected stage's wait duration (in minutes)
      const stageExpr = {
        registration: `(TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60`,
        waiting_doctor: `(TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60`,
        examination: `(TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60`,
        pharmacy: `(TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(st.service7)) / 60`,
      }[stage];

      const hasRcptJoin = stage === 'pharmacy';

      const stageStart = {
        registration: 'st.service1 IS NOT NULL',
        waiting_doctor: 'st.service2 IS NOT NULL AND st.service1 IS NOT NULL',
        examination: 'st.service7 IS NOT NULL AND st.service2 IS NOT NULL',
        pharmacy: 'r.bill_time IS NOT NULL AND st.service7 IS NOT NULL',
      }[stage];

      const target = {
        registration: 10,
        waiting_doctor: 30,
        examination: 30,
        pharmacy: 20,
      }[stage];

      const rows = await dbQueryHeavy(`flowDrill_${stage}_${date}`, 120, `
        SELECT o.main_dep as depcode,
               k.depname as clinic_name,
               COUNT(*) as visit_count,
               ROUND(AVG(${stageExpr}), 0) as avg_min,
               ROUND(MAX(${stageExpr}), 0) as max_min,
               SUM(CASE WHEN ${stageExpr} > ? THEN 1 ELSE 0 END) as over_target_count
          FROM ovst o FORCE INDEX (ix_vstdate)
          LEFT JOIN service_time st ON o.vn = st.vn
          ${hasRcptJoin ? 'LEFT JOIN rcpt_print r ON o.vn = r.vn' : ''}
          LEFT JOIN kskdepartment k ON o.main_dep = k.depcode
         WHERE o.vstdate = ?
           AND ${stageStart}
           AND ${stageExpr} > 0 AND ${stageExpr} < 600
         GROUP BY o.main_dep, k.depname
         HAVING visit_count >= 3
         ORDER BY avg_min DESC
         LIMIT ?
      `, [target, date, limit]).catch(() => []);

      res.json({
        data_source: 'HOSxP XE',
        date,
        stage,
        target_min: target,
        total_clinics: rows.length,
        rows: rows.map(r => {
          const avg = Number(r.avg_min || 0);
          return {
            depcode: r.depcode,
            clinic_name: r.clinic_name || r.depcode || 'ไม่ระบุ',
            visit_count: Number(r.visit_count || 0),
            avg_min: avg,
            max_min: Number(r.max_min || 0),
            over_target_count: Number(r.over_target_count || 0),
            over_target_rate_pct: r.visit_count > 0
              ? Math.round(Number(r.over_target_count) / Number(r.visit_count) * 1000) / 10 : 0,
            severity: avg <= target ? 'good' : avg <= target * 1.5 ? 'warn' : 'crit',
          };
        }),
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/patientflow/stage-comparison — today vs. 30-day avg
// ------------------------------------------------------------
router.get('/stage-comparison', cached('flowStageCompare', 120000, async () => {
  const [today, baseline] = await Promise.all([
    dbQueryOne(`
      SELECT
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
                 THEN (TIME_TO_SEC(st.service1)-TIME_TO_SEC(o.vsttime))/60 END), 0) as t_reg,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
                 AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
                 THEN (TIME_TO_SEC(st.service2)-TIME_TO_SEC(st.service1))/60 END), 0) as t_wait,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
                 AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
                 THEN (TIME_TO_SEC(st.service7)-TIME_TO_SEC(st.service2))/60 END), 0) as t_exam,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
                 AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
                 THEN (TIME_TO_SEC(r.bill_time)-TIME_TO_SEC(st.service7))/60 END), 0) as t_fin
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `).catch(() => null),
    dbQueryHeavy('flowBaseline30d_v1', 240, `
      SELECT
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
                 THEN (TIME_TO_SEC(st.service1)-TIME_TO_SEC(o.vsttime))/60 END), 0) as t_reg,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
                 AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
                 THEN (TIME_TO_SEC(st.service2)-TIME_TO_SEC(st.service1))/60 END), 0) as t_wait,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
                 AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
                 THEN (TIME_TO_SEC(st.service7)-TIME_TO_SEC(st.service2))/60 END), 0) as t_exam,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
                 AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
                 THEN (TIME_TO_SEC(r.bill_time)-TIME_TO_SEC(st.service7))/60 END), 0) as t_fin
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.vstdate < CURDATE()
    `).catch(() => null),
  ]);

  const t = today || {};
  const b = baseline || {};
  const stages = [
    { id: 'registration', label: 'ลงทะเบียน→คัดกรอง', today: Number(t.t_reg || 0), baseline: Number(b.t_reg || 0), target: 10 },
    { id: 'waiting',      label: 'รอพบแพทย์',           today: Number(t.t_wait || 0), baseline: Number(b.t_wait || 0), target: 30 },
    { id: 'examination',  label: 'พบแพทย์→จ่ายยา',     today: Number(t.t_exam || 0), baseline: Number(b.t_exam || 0), target: 30 },
    { id: 'finance',      label: 'จ่ายยา→ชำระเงิน',    today: Number(t.t_fin || 0),  baseline: Number(b.t_fin || 0),  target: 10 },
  ].map(s => ({
    ...s,
    delta: s.today - s.baseline,
    delta_pct: s.baseline > 0 ? Math.round(((s.today - s.baseline) / s.baseline) * 100) : 0,
    over_target: s.today > s.target,
  }));

  return {
    data_source: 'HOSxP XE',
    stages,
    total_today: stages.reduce((s, x) => s + x.today, 0),
    total_baseline: stages.reduce((s, x) => s + x.baseline, 0),
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/patientflow/waiting-list?stage=xxx&limit=50
//   Live list of individual patients currently waiting at each stage
//   stage = all | registration | waiting_doctor | examination | pharmacy
// ------------------------------------------------------------
const waitingListSchema = z.object({
  stage: z.enum(['all', 'registration', 'waiting_doctor', 'examination', 'pharmacy']).optional(),
  limit: z.coerce.number().int().min(5).max(200).optional(),
});
router.get('/waiting-list',
  validateQuery(waitingListSchema),
  async (req, res) => {
    try {
      const stageFilter = req.query.stage || 'all';
      const limit = Number(req.query.limit || 50);

      const rows = await dbQueryHeavy('waitingList_v1', 0, `
        SELECT
          o.vn, o.hn, o.vsttime, o.cur_dep, o.main_dep, o.doctor,
          o.pt_priority, o.i_refer_number, o.refer_type, o.ovstost,
          st.service1, st.service2, st.service7,
          r.bill_time,
          p.pname, p.fname, p.lname, p.sex,
          TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
          k.department as clinic_name,
          d.name as doctor_name,
          TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), NOW()) as total_min,
          -- current stage
          CASE
            WHEN st.service1 IS NULL THEN 'registration'
            WHEN st.service2 IS NULL THEN 'waiting_doctor'
            WHEN st.service7 IS NULL THEN 'examination'
            WHEN r.bill_time IS NULL THEN 'pharmacy'
            ELSE 'completed'
          END as current_stage,
          -- wait time in current stage
          CASE
            WHEN st.service1 IS NULL
              THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), NOW())
            WHEN st.service2 IS NULL
              THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service1), NOW())
            WHEN st.service7 IS NULL
              THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service2), NOW())
            WHEN r.bill_time IS NULL
              THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service7), NOW())
            ELSE 0
          END as wait_in_stage_min,
          -- stage entry time
          CASE
            WHEN st.service1 IS NULL THEN o.vsttime
            WHEN st.service2 IS NULL THEN st.service1
            WHEN st.service7 IS NULL THEN st.service2
            WHEN r.bill_time IS NULL THEN st.service7
            ELSE NULL
          END as stage_entry_time
        FROM ovst o FORCE INDEX (ix_vstdate)
        LEFT JOIN service_time st ON o.vn = st.vn
        LEFT JOIN rcpt_print r ON o.vn = r.vn
        LEFT JOIN patient p ON o.hn = p.hn
        LEFT JOIN kskdepartment k ON o.main_dep = k.depcode
        LEFT JOIN doctor d ON o.doctor = d.code
        WHERE o.vstdate = CURDATE()
          AND (o.ovstost IS NULL OR o.ovstost IN ('00', '98'))
          AND r.bill_time IS NULL
          AND TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), NOW()) > 0
          AND TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), NOW()) < 720
        ORDER BY wait_in_stage_min DESC
        LIMIT ?
      `, [limit]).catch(() => []);

      const filtered = stageFilter === 'all'
        ? rows
        : rows.filter(r => r.current_stage === stageFilter);

      const stageLabelMap = {
        registration: '📝 ลงทะเบียน',
        waiting_doctor: '⏳ รอพบแพทย์',
        examination: '👨‍⚕️ ตรวจ/รอผล Lab',
        pharmacy: '💊 รอรับยา',
      };

      const bucketize = (waitMin) => {
        if (waitMin >= 120) return { severity: 'max', label: '⛔ >2 ชม.', color: '#991b1b' };
        if (waitMin >= 90) return { severity: 'crit', label: '🔴 >90m', color: '#dc2626' };
        if (waitMin >= 60) return { severity: 'warn', label: '🟠 >60m', color: '#ea580c' };
        if (waitMin >= 30) return { severity: 'attn', label: '🟡 >30m', color: '#f59e0b' };
        return { severity: 'ok', label: '🟢 <30m', color: '#16a34a' };
      };

      const buildFlags = (r) => {
        const flags = [];
        const age = Number(r.age || 0);
        if (age >= 70) flags.push({ id: 'elderly', label: '🧓 สูงอายุ', color: '#7c3aed' });
        else if (age >= 60) flags.push({ id: 'senior', label: '👴 60+', color: '#a78bfa' });
        if (age > 0 && age < 5) flags.push({ id: 'infant', label: '👶 เด็กเล็ก', color: '#0ea5e9' });
        else if (age > 0 && age < 15) flags.push({ id: 'pediatric', label: '🧒 เด็ก', color: '#38bdf8' });
        if (r.main_dep === '024') flags.push({ id: 'ncd', label: '🫀 NCD', color: '#e11d48' });
        if (r.i_refer_number && String(r.i_refer_number).trim() !== '') {
          flags.push({ id: 'refer_in', label: '📨 Refer-in', color: '#0f766e' });
        }
        if (Number(r.pt_priority || 0) >= 3) {
          flags.push({ id: 'priority', label: '⚡ Priority', color: '#dc2626' });
        }
        return flags;
      };

      const enriched = filtered.map(r => {
        const waitMin = Number(r.wait_in_stage_min || 0);
        const bucket = bucketize(waitMin);
        return {
          vn: r.vn,
          hn: r.hn,
          name: `${(r.pname || '').trim()}${(r.fname || '').trim()} ${(r.lname || '').trim()}`.trim() || '-',
          age: Number(r.age || 0),
          sex: r.sex,
          arrived: (r.vsttime || '').slice(0, 5),
          stage_entry: (r.stage_entry_time || '').slice(0, 5),
          clinic: r.main_dep || r.cur_dep,
          clinic_name: r.clinic_name || r.main_dep || '-',
          doctor: r.doctor,
          doctor_name: r.doctor_name || '-',
          current_stage: r.current_stage,
          current_stage_label: stageLabelMap[r.current_stage] || r.current_stage,
          wait_in_stage_min: waitMin,
          total_min: Number(r.total_min || 0),
          severity: bucket.severity,
          severity_label: bucket.label,
          severity_color: bucket.color,
          flags: buildFlags(r),
          priority: Number(r.pt_priority || 0),
        };
      });

      // Summary buckets
      const buckets = { max: 0, crit: 0, warn: 0, attn: 0, ok: 0 };
      for (const r of enriched) buckets[r.severity] = (buckets[r.severity] || 0) + 1;
      const stageCounts = { registration: 0, waiting_doctor: 0, examination: 0, pharmacy: 0 };
      for (const r of rows) {
        if (r.current_stage && stageCounts[r.current_stage] !== undefined) {
          stageCounts[r.current_stage]++;
        }
      }

      res.json({
        data_source: 'HOSxP XE',
        stage_filter: stageFilter,
        total_all_stages: rows.length,
        total_filtered: enriched.length,
        buckets,
        stage_counts: stageCounts,
        rows: enriched,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/patientflow/patient-timeline?vn=xxx
//   Full drill-down for a single patient:
//   - timeline events (arrived → screen → exam → lab/xray → pharm → bill)
//   - vitals from opdscreen
//   - diagnoses from ovstdiag
//   - medications from opitemrece
// ------------------------------------------------------------
const timelineSchema = z.object({
  vn: z.string().min(8).max(13),
});
router.get('/patient-timeline',
  validateQuery(timelineSchema),
  async (req, res) => {
    try {
      const vn = req.query.vn;
      const [info, vitals, diag, meds, labs, xrays] = await Promise.all([
        // Core visit + service_time + bill
        dbQueryOne(`
          SELECT
            o.vn, o.hn, o.vstdate, o.vsttime, o.doctor, o.main_dep, o.cur_dep,
            o.pt_priority, o.i_refer_number, o.ovstost, o.pttype,
            p.pname, p.fname, p.lname, p.sex, p.birthday,
            TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
            TRIM(COALESCE(p.mobile_phone_number, p.hometel, '')) as phone,
            p.drugallergy,
            k.department as clinic_name,
            d.name as doctor_name,
            pt.name as pttype_name,
            st.service1, st.service2, st.service7,
            r.bill_time, r.bill_amount
          FROM ovst o
          LEFT JOIN patient p ON o.hn = p.hn
          LEFT JOIN kskdepartment k ON o.main_dep = k.depcode
          LEFT JOIN doctor d ON o.doctor = d.code
          LEFT JOIN pttype pt ON o.pttype = pt.pttype
          LEFT JOIN service_time st ON o.vn = st.vn
          LEFT JOIN rcpt_print r ON o.vn = r.vn
          WHERE o.vn = ?
          LIMIT 1
        `, [vn]).catch(() => null),

        // Vitals from opdscreen
        dbQueryOne(`
          SELECT bpd, bps, bw, hr, pulse, temperature, rr, height, fbs, cc, pe, note
            FROM opdscreen WHERE vn = ? LIMIT 1
        `, [vn]).catch(() => null),

        // Diagnoses (ICD10 + name)
        dbQuery(`
          SELECT d.icd10, d.diagtype, i.name as icd_name
            FROM ovstdiag d
            LEFT JOIN icd101 i ON d.icd10 = i.code
           WHERE d.vn = ?
           ORDER BY d.diagtype, d.icd10
        `, [vn]).catch(() => []),

        // Medications dispensed
        dbQuery(`
          SELECT o.icode, o.qty, o.iperdose, o.iperday, o.rxdate, o.rxtime,
                 o.idr, dr.name as drug_name, o.unitprice, o.doctor,
                 CASE WHEN i.name IS NOT NULL THEN i.name ELSE dr.name END as item_name
            FROM opitemrece o
            LEFT JOIN drugitems dr ON o.icode = dr.icode
            LEFT JOIN items i ON o.icode = i.icode
           WHERE o.vn = ?
           ORDER BY o.rxdate DESC, o.rxtime DESC
           LIMIT 50
        `, [vn]).catch(() => []),

        // Lab orders
        dbQuery(`
          SELECT lab_order_number, form_name, order_date, order_time,
                 report_date, report_time, confirm_report
            FROM lab_head
           WHERE vn = ?
           ORDER BY order_date DESC, order_time DESC
           LIMIT 20
        `, [vn]).catch(() => []),

        // Xray orders
        dbQuery(`
          SELECT xray_order_number, xray_list, order_date, order_date_time,
                 confirm_read_film, department_name
            FROM xray_head
           WHERE vn = ?
           ORDER BY order_date DESC
           LIMIT 10
        `, [vn]).catch(() => []),
      ]);

      if (!info) {
        return res.status(404).json({ error: 'VN not found', vn });
      }

      // Build timeline events array
      const events = [];
      const push = (time, type, label, detail, status = 'done') => {
        if (!time) return;
        events.push({ time, type, label, detail, status });
      };

      const baseDate = info.vstdate;
      const makeTs = (t) => t ? `${baseDate} ${t}` : null;

      push(info.vsttime, 'arrived', 'มาถึงโรงพยาบาล', `ลงทะเบียนที่ OPD`);
      push(info.service1, 'screened', 'ผ่านคัดกรอง', 'วัดสัญญาณชีพ + ซักประวัติ');
      push(info.service2, 'examined', 'พบแพทย์', info.doctor_name ? `โดย ${info.doctor_name}` : '');

      // Lab events
      for (const l of labs || []) {
        if (l.order_time) push(l.order_time, 'lab_order', 'สั่ง Lab', l.form_name);
        if (l.report_time) push(l.report_time, 'lab_report', 'Lab รายงานผล', l.form_name);
      }

      // Xray events
      for (const x of xrays || []) {
        const xt = x.order_date_time ? String(x.order_date_time).slice(11, 19) : null;
        if (xt) push(xt, 'xray_order', 'สั่ง X-Ray', x.xray_list || x.department_name);
      }

      push(info.service7, 'dispensed', 'ได้รับยา', `${(meds || []).length} รายการ`);
      if (info.bill_time) push(info.bill_time, 'billed', 'ชำระเงิน', `฿${Number(info.bill_amount || 0).toLocaleString()}`);

      // Sort events by time
      events.sort((a, b) => String(a.time).localeCompare(String(b.time)));

      // Determine current stage (same logic as live endpoint)
      const currentStage =
        !info.service1 ? 'registration'
          : !info.service2 ? 'waiting_doctor'
          : !info.service7 ? 'examination'
          : !info.bill_time ? 'pharmacy'
          : 'completed';

      // Compute durations between steps
      const durations = [];
      for (let i = 1; i < events.length; i++) {
        const prev = events[i - 1];
        const cur = events[i];
        const [ph, pm] = String(prev.time).split(':').map(Number);
        const [ch, cm] = String(cur.time).split(':').map(Number);
        const diffMin = (ch * 60 + cm) - (ph * 60 + pm);
        durations.push({ from: prev.type, to: cur.type, minutes: diffMin });
      }

      // Vitals summary
      const v = vitals || {};
      const bmi = (v.height && v.bw) ? Math.round((Number(v.bw) / Math.pow(Number(v.height) / 100, 2)) * 10) / 10 : null;

      res.json({
        data_source: 'HOSxP XE',
        vn: info.vn,
        patient: {
          hn: info.hn,
          name: `${(info.pname || '').trim()}${(info.fname || '').trim()} ${(info.lname || '').trim()}`.trim() || '-',
          age: Number(info.age || 0),
          sex: info.sex,
          birthday: info.birthday,
          phone: info.phone || '',
          drug_allergy: info.drugallergy || '',
          pttype_name: info.pttype_name || info.pttype || '',
        },
        visit: {
          vstdate: info.vstdate,
          vsttime: info.vsttime,
          clinic_name: info.clinic_name || info.main_dep || '',
          doctor_name: info.doctor_name || '',
          is_refer_in: !!(info.i_refer_number && String(info.i_refer_number).trim() !== ''),
          priority: Number(info.pt_priority || 0),
          ovstost: info.ovstost,
          current_stage: currentStage,
          current_stage_label: ({
            registration: '📝 กำลังลงทะเบียน',
            waiting_doctor: '⏳ กำลังรอพบแพทย์',
            examination: '👨‍⚕️ กำลังตรวจ/รอ Lab',
            pharmacy: '💊 กำลังรอรับยา',
            completed: '✅ จบการรักษา',
          })[currentStage],
          total_elapsed_min: info.vsttime
            ? (() => {
                const now = new Date();
                const [h, m] = info.vsttime.split(':').map(Number);
                const vsMin = h * 60 + m;
                const nowMin = now.getHours() * 60 + now.getMinutes();
                return nowMin - vsMin;
              })()
            : 0,
        },
        vitals: vitals ? {
          bp: (v.bps && v.bpd) ? `${v.bps}/${v.bpd}` : null,
          bps: v.bps ? Number(v.bps) : null,
          bpd: v.bpd ? Number(v.bpd) : null,
          pulse: v.pulse ? Math.round(Number(v.pulse)) : null,
          hr: v.hr ? Math.round(Number(v.hr)) : null,
          rr: v.rr ? Math.round(Number(v.rr)) : null,
          temp: v.temperature ? Math.round(Number(v.temperature) * 10) / 10 : null,
          weight: v.bw ? Number(v.bw) : null,
          height: v.height ? Number(v.height) : null,
          bmi,
          fbs: v.fbs ? Number(v.fbs) : null,
          cc: v.cc || '',
          pe: v.pe || '',
        } : null,
        diagnoses: (diag || []).map(d => ({
          icd10: d.icd10,
          type: d.diagtype,
          type_label: ({ '1': 'Principal', '2': 'Co-morbid', '3': 'Complication', '4': 'Other', '5': 'External cause' })[d.diagtype] || d.diagtype,
          name: d.icd_name || '-',
        })),
        medications: (meds || []).slice(0, 20).map(m => ({
          icode: m.icode,
          name: m.item_name || m.drug_name || m.icode,
          qty: Number(m.qty || 0),
          per_dose: Number(m.iperdose || 0),
          per_day: Number(m.iperday || 0),
          usage: m.idr || '',
          rx_time: m.rxtime || '',
          price: Number(m.unitprice || 0) * Number(m.qty || 0),
        })),
        labs: (labs || []).map(l => ({
          form_name: l.form_name,
          order_time: l.order_time,
          report_time: l.report_time,
          confirmed: l.confirm_report === 'Y',
          tat_min: l.order_time && l.report_time
            ? (() => {
                const [oh, om] = String(l.order_time).split(':').map(Number);
                const [rh, rm] = String(l.report_time).split(':').map(Number);
                return (rh * 60 + rm) - (oh * 60 + om);
              })()
            : null,
        })),
        xrays: (xrays || []).map(x => ({
          xray_list: x.xray_list,
          order_date_time: x.order_date_time,
          read_confirmed: x.confirm_read_film === 'Y',
          department: x.department_name,
        })),
        timeline: events,
        durations,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ============================================================
// IPD BED FLOW — ward occupancy, admissions, discharges, LOS
// Data: ipt + ward + an_stat + bedno
// ============================================================

// ------------------------------------------------------------
// GET /api/patientflow/ipd-live
//   Real-time snapshot of IPD wards: occupancy, admits today, discharges today
// ------------------------------------------------------------
router.get('/ipd-live', cached('ipdFlowLive', 60000, async () => {
  const [wardOccupancy, totalStats, avgLos, admitPending] = await Promise.all([
    // Per-ward occupancy with bed counts
    dbQuery(`
      SELECT w.ward as ward_code,
             w.name as ward_name,
             w.shortname,
             w.bedcount as total_beds,
             COALESCE(cur.occupied, 0) as occupied,
             COALESCE(adm.admits_today, 0) as admits_today,
             COALESCE(dch.dchs_today, 0) as dchs_today
        FROM ward w
        LEFT JOIN (
          SELECT ward, COUNT(*) as occupied
            FROM ipt
           WHERE dchdate IS NULL
           GROUP BY ward
        ) cur ON w.ward = cur.ward
        LEFT JOIN (
          SELECT ward, COUNT(*) as admits_today
            FROM ipt
           WHERE regdate = CURDATE()
           GROUP BY ward
        ) adm ON w.ward = adm.ward
        LEFT JOIN (
          SELECT ward, COUNT(*) as dchs_today
            FROM ipt
           WHERE dchdate = CURDATE()
           GROUP BY ward
        ) dch ON w.ward = dch.ward
       WHERE w.ward_active = 'Y'
         AND w.ward <> '06'
       ORDER BY w.ward
    `).catch(() => []),

    // Total hospital stats
    dbQueryOne(`
      SELECT
        (SELECT COUNT(*) FROM ipt WHERE dchdate IS NULL AND ward <> '06') as total_occupied,
        (SELECT COUNT(*) FROM ipt WHERE regdate = CURDATE() AND ward <> '06') as total_admits_today,
        (SELECT COUNT(*) FROM ipt WHERE dchdate = CURDATE() AND ward <> '06') as total_dchs_today,
        (SELECT COUNT(*) FROM ipt WHERE DATE(regdate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND ward <> '06') as admits_yesterday,
        (SELECT SUM(bedcount) FROM ward WHERE ward_active = 'Y' AND ward <> '06') as raw_total_beds
    `).catch(() => null),

    // Average LOS last 30d (discharged patients)
    dbQueryHeavy('ipdAvgLos30d_v1', 300, `
      SELECT
        ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as avg_los,
        ROUND(AVG(CASE WHEN DATEDIFF(dchdate, regdate) > 7 THEN 1 ELSE 0 END) * 100, 1) as pct_long_stay,
        COUNT(*) as total_discharges
       FROM ipt
       WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         AND dchdate IS NOT NULL
         AND regdate IS NOT NULL
         AND ward <> '06'
    `).catch(() => null),

    // Pending admission queue
    dbQueryOne(`
      SELECT COUNT(*) as pending_admits
        FROM ipt_admit_queue
       WHERE admit_date IS NULL OR admit_date = CURDATE()
    `).catch(() => ({ pending_admits: 0 })),
  ]);

  const TOTAL_BEDS = 120; // Real BCH beds (HOSxP ward table inflates)
  const totalOccupied = Number(totalStats?.total_occupied || 0);
  const totalAdmits = Number(totalStats?.total_admits_today || 0);
  const totalDchs = Number(totalStats?.total_dchs_today || 0);

  return {
    data_source: 'HOSxP XE',
    total: {
      total_beds: TOTAL_BEDS,
      occupied: totalOccupied,
      available: Math.max(0, TOTAL_BEDS - totalOccupied),
      occupancy_rate_pct: TOTAL_BEDS > 0 ? Math.round(totalOccupied / TOTAL_BEDS * 1000) / 10 : 0,
      admits_today: totalAdmits,
      dchs_today: totalDchs,
      net_change_today: totalAdmits - totalDchs,
      admits_yesterday: Number(totalStats?.admits_yesterday || 0),
      pending_admits: Number(admitPending?.pending_admits || 0),
      avg_los_30d: Number(avgLos?.avg_los || 0),
      long_stay_pct: Number(avgLos?.pct_long_stay || 0),
      total_discharges_30d: Number(avgLos?.total_discharges || 0),
    },
    wards: (wardOccupancy || []).map(w => {
      const total = Number(w.total_beds || 1);
      const occ = Number(w.occupied || 0);
      const rate = total > 0 ? Math.round(occ / total * 1000) / 10 : 0;
      return {
        ward_code: w.ward_code,
        ward_name: w.ward_name || w.ward_code,
        short_name: w.shortname || w.ward_code,
        total_beds: total,
        occupied: occ,
        available: Math.max(0, total - occ),
        occupancy_rate_pct: rate,
        admits_today: Number(w.admits_today || 0),
        dchs_today: Number(w.dchs_today || 0),
        severity: rate >= 95 ? 'crit' : rate >= 85 ? 'warn' : rate >= 50 ? 'good' : 'low',
      };
    }),
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/patientflow/ipd-los-outliers
//   Currently-admitted patients whose LOS exceeds DRG-expected or 7+ days
// ------------------------------------------------------------
router.get('/ipd-los-outliers', cached('ipdLosOutliers', 120000, async () => {
  // Pull current admissions with their DRG weighted expected LOS
  const rows = await dbQueryHeavy('ipdLosOutliers_v1', 120, `
    SELECT i.an,
           i.hn,
           CONCAT(COALESCE(p.pname,''), COALESCE(p.fname,''), ' ', COALESCE(p.lname,'')) as name,
           TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
           p.sex,
           i.ward,
           w.name as ward_name,
           i.regdate,
           DATEDIFF(CURDATE(), i.regdate) as current_los,
           i.drg,
           i.rw,
           i.wtlos as expected_los_days,
           i.admdoctor,
           i.pttype,
           s.pdx,
           s.income as accrued_cost
      FROM ipt i
      LEFT JOIN patient p ON i.hn = p.hn
      LEFT JOIN ward w ON i.ward = w.ward
      LEFT JOIN an_stat s ON i.an = s.an
     WHERE i.dchdate IS NULL
       AND i.ward <> '06'
       AND DATEDIFF(CURDATE(), i.regdate) >= 5
     ORDER BY current_los DESC
     LIMIT 30
  `).catch(() => []);

  return {
    data_source: 'HOSxP XE',
    total: rows.length,
    rows: rows.map(r => {
      const los = Number(r.current_los || 0);
      const expected = Number(r.expected_los_days || 0);
      const severity = los >= 14 ? 'crit'
        : los >= 10 ? 'warn'
        : los >= 7 ? 'mild'
        : 'normal';
      return {
        an: r.an,
        hn: r.hn,
        name: (r.name || '').trim() || '-',
        age: Number(r.age || 0),
        sex: r.sex,
        ward: r.ward,
        ward_name: r.ward_name || r.ward,
        regdate: r.regdate,
        current_los: los,
        expected_los: expected > 0 ? Math.round(expected * 10) / 10 : null,
        los_over_expected: expected > 0 ? Math.round((los - expected) * 10) / 10 : null,
        drg: r.drg,
        rw: Number(r.rw || 0),
        pdx: r.pdx,
        admdoctor: r.admdoctor,
        accrued_cost: Number(r.accrued_cost || 0),
        severity,
      };
    }),
    timestamp: new Date().toISOString(),
  };
}));

// ------------------------------------------------------------
// GET /api/patientflow/ipd-admission-timeline?date=YYYY-MM-DD
//   Hourly admit/discharge timeline for a day (default: today)
// ------------------------------------------------------------
const admitTimelineSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
router.get('/ipd-admission-timeline',
  validateQuery(admitTimelineSchema),
  async (req, res) => {
    try {
      const date = req.query.date || new Date().toISOString().slice(0, 10);
      const [admits, dchs] = await Promise.all([
        dbQuery(`
          SELECT HOUR(regtime) as hr, COUNT(*) as cnt
            FROM ipt
           WHERE regdate = ? AND ward <> '06' AND regtime IS NOT NULL
           GROUP BY HOUR(regtime) ORDER BY hr
        `, [date]).catch(() => []),
        dbQuery(`
          SELECT HOUR(dchtime) as hr, COUNT(*) as cnt
            FROM ipt
           WHERE dchdate = ? AND ward <> '06' AND dchtime IS NOT NULL
           GROUP BY HOUR(dchtime) ORDER BY hr
        `, [date]).catch(() => []),
      ]);

      const hours = Array.from({ length: 24 }, (_, h) => {
        const a = (admits || []).find(x => Number(x.hr) === h);
        const d = (dchs || []).find(x => Number(x.hr) === h);
        return {
          hr: h,
          label: `${String(h).padStart(2, '0')}:00`,
          admits: Number(a?.cnt || 0),
          dchs: Number(d?.cnt || 0),
          net: Number(a?.cnt || 0) - Number(d?.cnt || 0),
        };
      });

      res.json({
        data_source: 'HOSxP XE',
        date,
        total_admits: hours.reduce((s, h) => s + h.admits, 0),
        total_dchs: hours.reduce((s, h) => s + h.dchs, 0),
        peak_admit_hour: hours.reduce((p, h) => h.admits > (p?.admits || 0) ? h : p, null),
        peak_dch_hour: hours.reduce((p, h) => h.dchs > (p?.dchs || 0) ? h : p, null),
        hours,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ------------------------------------------------------------
// GET /api/patientflow/ipd-bed-turnover
//   Bed utilization efficiency: avg time between discharge and next admit
// ------------------------------------------------------------
router.get('/ipd-bed-turnover', cached('ipdBedTurnover', 300000, async () => {
  const rows = await dbQueryHeavy('ipdBedTurnover_v1', 240, `
    SELECT w.ward as ward_code,
           w.name as ward_name,
           w.bedcount,
           ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as avg_los,
           COUNT(*) as discharges_30d,
           ROUND(COUNT(*) / 30.0, 2) as avg_dch_per_day,
           ROUND(COUNT(*) * AVG(DATEDIFF(i.dchdate, i.regdate)) / (30 * NULLIF(w.bedcount, 0)) * 100, 1) as utilization_pct
      FROM ward w
      LEFT JOIN ipt i ON w.ward = i.ward
       AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       AND i.dchdate IS NOT NULL
       AND i.regdate IS NOT NULL
     WHERE w.ward_active = 'Y' AND w.ward <> '06'
     GROUP BY w.ward, w.name, w.bedcount
     HAVING discharges_30d > 0
     ORDER BY utilization_pct DESC
  `).catch(() => []);

  return {
    data_source: 'HOSxP XE',
    window_days: 30,
    rows: rows.map(r => ({
      ward_code: r.ward_code,
      ward_name: r.ward_name || r.ward_code,
      bedcount: Number(r.bedcount || 0),
      avg_los: Number(r.avg_los || 0),
      discharges_30d: Number(r.discharges_30d || 0),
      avg_dch_per_day: Number(r.avg_dch_per_day || 0),
      utilization_pct: Number(r.utilization_pct || 0),
      efficiency: Number(r.utilization_pct || 0) >= 85 ? 'high'
        : Number(r.utilization_pct || 0) >= 60 ? 'good' : 'low',
    })),
    timestamp: new Date().toISOString(),
  };
}));

export default router;
