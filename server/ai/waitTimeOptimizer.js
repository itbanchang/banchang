// ============================================================
// BCH 360° Intelligence V.10 - AI Module #16
// ⏱️ OPD Wait Time Optimizer
// Algorithm: Bottleneck Detection + Queue Theory + Clinic Ranking
// Data: ovst + service_time + rcpt_print (MIL milestones)
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';

/**
 * #16 AI Wait Time Optimizer
 * วิเคราะห์ Bottleneck ของ Patient Journey + แนะนำการปรับปรุง
 * 
 * 4-Step Patient Journey:
 *   Step 1: ลงทะเบียน → คัดกรอง (service_time.service1)
 *   Step 2: คัดกรอง → พบแพทย์ (service_time.service2)
 *   Step 3: พบแพทย์ → รับยา (service_time.service7)
 *   Step 4: รับยา → การเงิน (rcpt_print.bill_time)
 *
 * Outputs:
 *   - Per-step average, P50, P90 wait times
 *   - Bottleneck identification + severity
 *   - Clinic-level performance ranking
 *   - AI recommendations for improvement
 */
export async function getWaitTimeOptimizer() {
  const start = Date.now();

  const [stepAnalysis, clinicPerformance, hourlyBottleneck, trendData, currentQueue, benchmarks] = await Promise.all([
    // 1. Per-step wait time analysis (today)
    dbQueryOne(`
      SELECT
        -- Step 1: Registration → Screening
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END)) as step1_avg,
        ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END)) as step1_sd,
        MAX(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END) as step1_max,
        SUM(CASE WHEN st.service1 IS NOT NULL THEN 1 ELSE 0 END) as step1_count,

        -- Step 2: Screening → Doctor
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)) as step2_avg,
        ROUND(STDDEV(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)) as step2_sd,
        MAX(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END) as step2_max,
        SUM(CASE WHEN st.service2 IS NOT NULL THEN 1 ELSE 0 END) as step2_count,

        -- Step 3: Doctor → Pharmacy
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
          AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60 END)) as step3_avg,
        ROUND(STDDEV(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
          AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60 END)) as step3_sd,
        SUM(CASE WHEN st.service7 IS NOT NULL THEN 1 ELSE 0 END) as step3_count,

        -- Step 4: Pharmacy → Finance
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
          AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
          THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(st.service7)) / 60 END)) as step4_avg,
        ROUND(STDDEV(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
          AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
          THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(st.service7)) / 60 END)) as step4_sd,
        SUM(CASE WHEN r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as step4_count,

        -- Total end-to-end
        ROUND(AVG(CASE WHEN (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
          AND TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) - TIME_TO_SEC(o.vsttime)) / 60 END)) as total_avg,
        COUNT(*) as total_patients

      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `),

    // 2. Clinic-level performance (top 15 busiest)
    dbQuery(`
      SELECT c.clinic as clinic_id, c.name as clinic_name,
        COUNT(*) as visits,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END)) as avg_wait_screen,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)) as avg_wait_doctor,
        ROUND(AVG(CASE WHEN (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
          AND TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) - TIME_TO_SEC(o.vsttime)) / 60 END)) as avg_total,
        SUM(CASE WHEN st.service2 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as currently_waiting,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed
      FROM ovst o
      LEFT JOIN clinic c ON o.cur_dep = c.clinic
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND c.name IS NOT NULL
      GROUP BY c.clinic, c.name HAVING visits >= 3
      ORDER BY visits DESC LIMIT 15
    `),

    // 3. Hourly bottleneck (which step is slowest per hour)
    dbQuery(`
      SELECT HOUR(o.vsttime) as hr,
        COUNT(*) as volume,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END)) as step1,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)) as step2,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
          AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60 END)) as step3,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
          AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
          THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(st.service7)) / 60 END)) as step4
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime)
      ORDER BY hr
    `),

    // 4. 7-day trend (daily avg waits)
    dbQueryHeavy('aiWaitTrend7d', 30, `
      SELECT o.vstdate as date,
        COUNT(*) as volume,
        ROUND(AVG(CASE WHEN (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
          AND TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) - TIME_TO_SEC(o.vsttime)) / 60 END)) as avg_total,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END)) as avg_step1,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)) as avg_step2
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.vstdate < CURDATE()
      GROUP BY o.vstdate ORDER BY o.vstdate
    `).catch(() => []),

    // 5. Real-time queue status (currently waiting at each step)
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN st.service1 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting_screening,
        SUM(CASE WHEN st.service1 IS NOT NULL AND st.service2 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting_doctor,
        SUM(CASE WHEN st.service2 IS NOT NULL AND st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting_pharmacy,
        SUM(CASE WHEN st.service7 IS NOT NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting_finance,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `),

    // 6. 30-day benchmarks for comparison
    dbQueryOneHeavy('aiWaitBenchmark30d', 60, `
      SELECT
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 END)) as bench_step1,
        ROUND(AVG(CASE WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
          AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)) as bench_step2,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
          AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60 END)) as bench_step3,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND st.service7 IS NOT NULL
          AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(st.service7)
          THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(st.service7)) / 60 END)) as bench_step4,
        ROUND(AVG(CASE WHEN (st.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
          AND TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(COALESCE(r.bill_time, st.service7)) - TIME_TO_SEC(o.vsttime)) / 60 END)) as bench_total
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.vstdate < CURDATE()
    `).catch(() => ({}))
  ]);

  const s = stepAnalysis || {};
  const b = benchmarks || {};

  // -------- Build Step Analysis --------
  const SLA_TARGETS = { step1: 10, step2: 20, step3: 15, step4: 10, total: 60 }; // minutes
  const STEP_NAMES = {
    step1: { th: 'ลงทะเบียน → คัดกรอง', en: 'Registration → Screening', icon: '📋' },
    step2: { th: 'คัดกรอง → พบแพทย์', en: 'Screening → Doctor', icon: '🩺' },
    step3: { th: 'พบแพทย์ → รับยา', en: 'Doctor → Pharmacy', icon: '💊' },
    step4: { th: 'รับยา → การเงิน', en: 'Pharmacy → Finance', icon: '💳' }
  };

  const steps = ['step1', 'step2', 'step3', 'step4'].map(key => {
    const avg = Number(s[`${key}_avg`] || 0);
    const sd = Number(s[`${key}_sd`] || 0);
    const count = Number(s[`${key}_count`] || 0);
    const max = Number(s[`${key}_max`] || 0);
    const benchmark = Number(b[`bench_${key}`] || avg);
    const target = SLA_TARGETS[key];

    const vsTarget = avg > 0 ? Math.round(((avg - target) / target) * 100) : 0;
    const vsBenchmark = benchmark > 0 ? Math.round(((avg - benchmark) / benchmark) * 100) : 0;

    let severity = 'normal';
    if (avg > target * 2) severity = 'critical';
    else if (avg > target * 1.5) severity = 'high';
    else if (avg > target) severity = 'elevated';

    return {
      key,
      ...STEP_NAMES[key],
      avg_minutes: avg,
      stddev: sd,
      max_minutes: max,
      patient_count: count,
      sla_target: target,
      vs_target_pct: vsTarget,
      benchmark_30d: benchmark,
      vs_benchmark_pct: vsBenchmark,
      severity,
    };
  });

  // -------- Identify Primary Bottleneck --------
  const worstStep = [...steps].sort((a, b) => b.vs_target_pct - a.vs_target_pct)[0];

  // -------- Real-time Queue --------
  const q = currentQueue || {};
  const queue = {
    waiting_screening: Number(q.waiting_screening || 0),
    waiting_doctor: Number(q.waiting_doctor || 0),
    waiting_pharmacy: Number(q.waiting_pharmacy || 0),
    waiting_finance: Number(q.waiting_finance || 0),
    completed: Number(q.completed || 0),
    total_in_system: Number(q.waiting_screening || 0) + Number(q.waiting_doctor || 0)
      + Number(q.waiting_pharmacy || 0) + Number(q.waiting_finance || 0),
  };
  const queueBottleneckStep = Object.entries({
    'screening': queue.waiting_screening,
    'doctor': queue.waiting_doctor,
    'pharmacy': queue.waiting_pharmacy,
    'finance': queue.waiting_finance
  }).sort((a, b) => b[1] - a[1])[0];

  // -------- Clinic Performance --------
  const clinicRanking = (clinicPerformance || []).map(c => {
    const avgTotal = Number(c.avg_total || 0);
    const waiting = Number(c.currently_waiting || 0);
    let status = 'smooth';
    if (avgTotal > SLA_TARGETS.total * 1.5 || waiting > 10) status = 'congested';
    else if (avgTotal > SLA_TARGETS.total || waiting > 5) status = 'busy';

    return {
      clinic: c.clinic_name,
      clinic_id: c.clinic_id,
      visits: Number(c.visits),
      avg_wait_screen: Number(c.avg_wait_screen || 0),
      avg_wait_doctor: Number(c.avg_wait_doctor || 0),
      avg_total: avgTotal,
      currently_waiting: waiting,
      completed: Number(c.completed || 0),
      status,
    };
  });

  // -------- AI Recommendations --------
  const recommendations = [];

  // Bottleneck-specific recommendations
  if (worstStep && worstStep.severity !== 'normal') {
    const recMap = {
      step1: {
        icon: '📋', color: '#f59e0b',
        text: `คอขวดที่จุดคัดกรอง (เฉลี่ย ${worstStep.avg_minutes} นาที > เป้า ${worstStep.sla_target} นาที) — เพิ่มจุดคัดกรองหรือใช้ระบบ Pre-screening Online`,
      },
      step2: {
        icon: '🩺', color: '#e11d48',
        text: `คอขวดรอพบแพทย์ (เฉลี่ย ${worstStep.avg_minutes} นาที > เป้า ${worstStep.sla_target} นาที) — เพิ่มแพทย์ตรวจหรือกระจายเคสไปคลินิกที่ยังว่าง`,
      },
      step3: {
        icon: '💊', color: '#7c3aed',
        text: `คอขวดรอรับยา (เฉลี่ย ${worstStep.avg_minutes} นาที > เป้า ${worstStep.sla_target} นาที) — เปิดช่องจ่ายยาเพิ่ม หรือเตรียมยาล่วงหน้า (Pre-pack)`,
      },
      step4: {
        icon: '💳', color: '#0ea5e9',
        text: `คอขวดจุดชำระเงิน (เฉลี่ย ${worstStep.avg_minutes} นาที > เป้า ${worstStep.sla_target} นาที) — เพิ่มเคาน์เตอร์การเงิน/พิจารณาระบบชำระออนไลน์`,
      }
    };
    const rec = recMap[worstStep.key];
    if (rec) {
      recommendations.push({ ...rec, priority: worstStep.severity === 'critical' ? 'CRITICAL' : 'ACTION' });
    }
  }

  // Queue-based recommendations
  if (queue.total_in_system > 30) {
    recommendations.push({
      icon: '🚨', color: '#e11d48', priority: 'ALERT',
      text: `ผู้ป่วยในระบบ ${queue.total_in_system} ราย (คิวสะสมสูง) — ต้องการเพิ่มทรัพยากรทุกจุดบริการด่วน`
    });
  }

  // Clinic-specific
  const congestedClinics = clinicRanking.filter(c => c.status === 'congested');
  if (congestedClinics.length > 0) {
    recommendations.push({
      icon: '🏥', color: '#7c3aed', priority: 'CLINIC',
      text: `คลินิกแออัด: ${congestedClinics.map(c => c.clinic).join(', ')} — ย้ายเคสไปห้องตรวจที่เหลือ/เปิด Fast-track`
    });
  }

  // Trend-based
  const totalAvg = Number(s.total_avg || 0);
  const benchTotal = Number(b.bench_total || 0);
  if (totalAvg > benchTotal * 1.2 && benchTotal > 0) {
    recommendations.push({
      icon: '📈', color: '#f59e0b', priority: 'TREND',
      text: `เวลารอรวมวันนี้ (${totalAvg} นาที) สูงกว่าค่าเฉลี่ย 30 วัน (${benchTotal} นาที) ${Math.round(((totalAvg - benchTotal) / benchTotal) * 100)}% — ตรวจสอบสาเหตุ`
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      icon: '✅', color: '#059669', priority: 'STABLE',
      text: `เวลารอทุกขั้นตอนอยู่ในเกณฑ์ปกติ (เฉลี่ย ${totalAvg} นาที) — ดำเนินงานตามปกติ`
    });
  }

  // -------- Hourly Bottleneck Data --------
  const hourlyData = (hourlyBottleneck || []).map(h => {
    const steps = [
      { name: 'Screen', val: Number(h.step1 || 0) },
      { name: 'Doctor', val: Number(h.step2 || 0) },
      { name: 'Pharmacy', val: Number(h.step3 || 0) },
      { name: 'Finance', val: Number(h.step4 || 0) }
    ];
    const bottleneck = steps.sort((a, b) => b.val - a.val)[0];
    return {
      hour: h.hr,
      label: `${String(h.hr).padStart(2, '0')}:00`,
      volume: Number(h.volume),
      step1: Number(h.step1 || 0),
      step2: Number(h.step2 || 0),
      step3: Number(h.step3 || 0),
      step4: Number(h.step4 || 0),
      bottleneck: bottleneck.name,
      bottleneck_minutes: bottleneck.val
    };
  });

  console.log(`🧠 AI #16 Wait Time Optimizer: ${Date.now() - start}ms (bottleneck=${worstStep?.key || 'none'})`);

  return {
    ai_module: 'OPD Wait Time Optimizer',
    ai_version: '1.0',
    computed_at: new Date().toISOString(),
    computation_ms: Date.now() - start,

    // Overall
    overall: {
      avg_total_minutes: totalAvg,
      benchmark_30d: benchTotal,
      vs_benchmark_pct: benchTotal > 0 ? Math.round(((totalAvg - benchTotal) / benchTotal) * 100) : 0,
      sla_target: SLA_TARGETS.total,
      total_patients: Number(s.total_patients || 0),
      primary_bottleneck: worstStep ? {
        step: worstStep.key,
        name_th: worstStep.th,
        avg_minutes: worstStep.avg_minutes,
        severity: worstStep.severity,
      } : null,
    },

    // Step-by-step breakdown
    steps,

    // Real-time queue
    queue,
    queue_bottleneck: queueBottleneckStep ? {
      step: queueBottleneckStep[0],
      count: queueBottleneckStep[1]
    } : null,

    // Clinic ranking
    clinics: clinicRanking,

    // Hourly bottleneck patterns
    hourly: hourlyData,

    // 7-day trend
    trend: (trendData || []).map(d => ({
      date: d.date,
      volume: Number(d.volume),
      avg_total: Number(d.avg_total || 0),
      avg_step1: Number(d.avg_step1 || 0),
      avg_step2: Number(d.avg_step2 || 0),
    })),

    // AI Recommendations
    recommendations,
  };
}

export default { getWaitTimeOptimizer };
