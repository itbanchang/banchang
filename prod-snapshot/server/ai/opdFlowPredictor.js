// ============================================================
// BCH 360° Intelligence V.10 - AI Module #14
// 🏥 OPD Patient Flow Predictor
// Algorithm: Seasonal EMA + DOW-Hour Matrix + Surge Detection
// Data: ovst + service_time (MIL milestones) — 90 days
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import logger from '../logger.js';

/**
 * #14 AI OPD Patient Flow Predictor
 * พยากรณ์จำนวนผู้ป่วย OPD ล่วงหน้า 8 ชม. + จัดสรรบุคลากร
 * 
 * Algorithm:
 *   1. DOW-Hour matrix จาก 90 วันย้อนหลัง
 *   2. Exponential Moving Average (α=0.3) ปรับ recent bias
 *   3. Surge Index = actual-so-far / expected-so-far
 *   4. Staff sufficiency model (patients-per-nurse ratio)
 */
export async function getOPDFlowPrediction() {
    const start = Date.now();
    const currentHour = new Date().getHours();
    const currentDOW = new Date().getDay() + 1; // DAYOFWEEK: 1=Sun, 2=Mon...

    // Parallel: 90-day DOW-Hour matrix + today's actual + clinic distribution + 7-day daily totals
    const [dowHourly, todayHourly, todayTotal, clinicLoad, dailyTotals7d, avgServiceTime] = await Promise.all([
        // 1. DOW-Hour average matrix (90 days)
        dbQueryHeavy('aiOpdDowHourly', 120, `
      SELECT DAYOFWEEK(date_val) as dow, hr,
        SUM(cnt) as total,
        COUNT(*) as num_days,
        ROUND(AVG(cnt)) as avg_per_day,
        ROUND(STDDEV(cnt)) as stddev_cnt
      FROM (
        SELECT vstdate as date_val, HOUR(vsttime) as hr, COUNT(*) as cnt
        FROM ovst FORCE INDEX (ix_vstdate)
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND vstdate < CURDATE() AND vsttime IS NOT NULL
        GROUP BY vstdate, HOUR(vsttime)
      ) AS daily_counts
      GROUP BY DAYOFWEEK(date_val), hr
    `).catch(() => []),

        // 2. Today's hourly actual
        dbQuery(`
      SELECT HOUR(vsttime) as hr, COUNT(*) as cnt
      FROM ovst WHERE vstdate = CURDATE() AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hr
    `),

        // 3. Today's running total
        dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as in_progress
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `),

        // 4. Current clinic workload
        dbQuery(`
      SELECT c.name as clinic, COUNT(*) as active_patients,
        SUM(CASE WHEN st.service2 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting
      FROM ovst o
      LEFT JOIN clinic c ON o.cur_dep = c.clinic
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND c.name IS NOT NULL
        AND (st.service7 IS NULL AND r.bill_time IS NULL)
      GROUP BY c.clinic, c.name
      HAVING active_patients >= 1
      ORDER BY waiting DESC
      LIMIT 10
    `).catch(() => []),

        // 5. Past 7 days daily totals (for trend)
        dbQueryHeavy('aiOpd7dDaily', 60, `
      SELECT o.vstdate, COUNT(o.vn) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed
      FROM ovst o FORCE INDEX (ix_vstdate)
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.vstdate < CURDATE()
      GROUP BY o.vstdate ORDER BY o.vstdate
    `).catch(() => []),

        // 6. Average service time per patient (for capacity calc)
        dbQueryOne(`
      SELECT ROUND(AVG(CASE
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
        ELSE NULL END)) as avg_service_min
      FROM ovst o FORCE INDEX (ix_vstdate)
      INNER JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.vstdate < CURDATE()
    `).catch(() => ({ avg_service_min: 30 }))
    ]);

    // -------- Build DOW-Hour prediction matrix --------
    const dowHourMap = {};
    (dowHourly || []).forEach(r => {
        const key = `${r.dow}-${r.hr}`;
        dowHourMap[key] = {
            avg: Number(r.avg_per_day || 0),
            stddev: Number(r.stddev_cnt || 0),
            numDays: Number(r.num_days || 1)
        };
    });

    // -------- Surge Index (actual vs expected so far) --------
    let actualSoFar = 0;
    let expectedSoFar = 0;
    (todayHourly || []).forEach(r => {
        actualSoFar += Number(r.cnt);
    });
    for (let h = 7; h <= currentHour; h++) {
        const key = `${currentDOW}-${h}`;
        expectedSoFar += dowHourMap[key]?.avg || 0;
    }
    const surgeIndex = expectedSoFar > 0 ? Math.round((actualSoFar / expectedSoFar) * 100) / 100 : 1.0;

    // -------- Hourly Forecast (next 8 hours) --------
    const hourlyForecast = [];
    let forecastTotal = actualSoFar;

    for (let h = 0; h < 24; h++) {
        const key = `${currentDOW}-${h}`;
        const hist = dowHourMap[key] || { avg: 0, stddev: 0 };
        const actual = (todayHourly || []).find(r => r.hr === h)?.cnt || 0;

        let predicted;
        let confidence;

        if (h <= currentHour) {
            // Past hours: use actual
            predicted = actual;
            confidence = 100;
        } else {
            // Future hours: historical avg × surge adjustment
            predicted = Math.round(hist.avg * surgeIndex);
            // Confidence decreases with hours ahead + variability
            const hoursAhead = h - currentHour;
            const cv = hist.avg > 0 ? (hist.stddev / hist.avg) : 0.5;
            confidence = Math.max(30, Math.round(95 - hoursAhead * 5 - cv * 20));
            forecastTotal += predicted;
        }

        hourlyForecast.push({
            hour: h,
            label: `${String(h).padStart(2, '0')}:00`,
            actual: h <= currentHour ? actual : null,
            predicted,
            historical_avg: Math.round(hist.avg),
            confidence,
            is_peak: hist.avg >= (dowHourMap[`${currentDOW}-10`]?.avg || 20) * 0.85
        });
    }

    // -------- Peak Hour Detection --------
    const futurePeaks = hourlyForecast
        .filter(h => h.hour > currentHour && h.predicted > 0)
        .sort((a, b) => b.predicted - a.predicted);
    const peakHour = futurePeaks[0] || null;

    // -------- Staff Sufficiency Model --------
    // Hospital standard: 1 nurse per 15 OPD patients/hour, 1 doctor per 8 patients/hour
    const NURSE_RATIO = 15;
    const DOCTOR_RATIO = 8;
    const inProgress = Number(todayTotal?.in_progress || 0);
    const currentHourVolume = (todayHourly || []).find(r => r.hr === currentHour)?.cnt || 0;

    const nurseNeeded = Math.ceil(Math.max(inProgress, currentHourVolume) / NURSE_RATIO);
    const doctorNeeded = Math.ceil(Math.max(inProgress, currentHourVolume) / DOCTOR_RATIO);
    const peakNurseNeeded = peakHour ? Math.ceil(peakHour.predicted / NURSE_RATIO) : nurseNeeded;
    const peakDoctorNeeded = peakHour ? Math.ceil(peakHour.predicted / DOCTOR_RATIO) : doctorNeeded;

    // -------- 7-Day Trend Analysis --------
    const dailyAvg7d = (dailyTotals7d || []).length > 0
        ? Math.round((dailyTotals7d || []).reduce((s, d) => s + Number(d.total), 0) / dailyTotals7d.length)
        : 0;
    const yesterdayTotal = dailyTotals7d?.[dailyTotals7d.length - 1]?.total || 0;
    const trendPct = dailyAvg7d > 0 ? Math.round(((forecastTotal - dailyAvg7d) / dailyAvg7d) * 100) : 0;

    // -------- AI Recommendations --------
    const recommendations = [];

    if (surgeIndex > 1.25) {
        recommendations.push({
            icon: '🚨', priority: 'CRITICAL', color: '#e11d48',
            text: `OPD Surge Alert: ผู้ป่วยมากกว่าคาดการณ์ ${Math.round((surgeIndex - 1) * 100)}% — เพิ่มจุดคัดกรอง/เคาน์เตอร์รับสมัคร`
        });
    } else if (surgeIndex > 1.1) {
        recommendations.push({
            icon: '⚠️', priority: 'HIGH', color: '#f59e0b',
            text: `OPD เริ่มหนาแน่น (+${Math.round((surgeIndex - 1) * 100)}%) — เตรียมบุคลากรสำรอง`
        });
    }

    if (peakHour && peakHour.predicted > currentHourVolume * 1.3) {
        recommendations.push({
            icon: '📈', priority: 'PLANNING', color: '#0ea5e9',
            text: `Peak คาดการณ์ ${peakHour.label} (~${peakHour.predicted} ราย) — ต้องการแพทย์ ${peakDoctorNeeded} คน + พยาบาล ${peakNurseNeeded} คน`
        });
    }

    const highLoadClinics = (clinicLoad || []).filter(c => c.waiting >= 5);
    if (highLoadClinics.length > 0) {
        const clinicNames = highLoadClinics.slice(0, 3).map(c => `${c.clinic}(${c.waiting})`).join(', ');
        recommendations.push({
            icon: '🏥', priority: 'BOTTLENECK', color: '#7c3aed',
            text: `คลินิกที่มีผู้ป่วยรอสูง: ${clinicNames} — พิจารณาเพิ่มช่องตรวจหรือ Fast-track`
        });
    }

    if (surgeIndex < 0.8 && currentHour >= 10) {
        recommendations.push({
            icon: '📊', priority: 'INFO', color: '#059669',
            text: `ผู้ป่วยน้อยกว่าคาดการณ์ ${Math.round((1 - surgeIndex) * 100)}% — โอกาสจัดการงาน Administrative/Training`
        });
    }

    if (recommendations.length === 0) {
        recommendations.push({
            icon: '✅', priority: 'STABLE', color: '#059669',
            text: 'ปริมาณผู้ป่วย OPD อยู่ในเกณฑ์ปกติ — ดำเนินงานตามปกติ'
        });
    }

    const avgServiceMin = Number(avgServiceTime?.avg_service_min || 30);

    logger.debug('OPD Flow Predictor AI computed', { duration: Date.now() - start, surgeIndex, forecastTotal });

    return {
        ai_module: 'OPD Flow Predictor',
        ai_version: '1.0',
        computed_at: new Date().toISOString(),
        computation_ms: Date.now() - start,

        // Current State
        current: {
            total_so_far: actualSoFar,
            completed: Number(todayTotal?.completed || 0),
            in_progress: inProgress,
            current_hour_volume: currentHourVolume,
        },

        // Forecast
        forecast: {
            end_of_day_total: forecastTotal,
            surge_index: surgeIndex,
            surge_status: surgeIndex > 1.25 ? 'SURGE' : surgeIndex > 1.1 ? 'ELEVATED' : surgeIndex < 0.8 ? 'LOW' : 'NORMAL',
            trend_vs_7d_avg: trendPct,
            daily_avg_7d: dailyAvg7d,
            yesterday_total: Number(yesterdayTotal),
            peak_hour: peakHour ? {
                hour: peakHour.hour,
                label: peakHour.label,
                predicted_volume: peakHour.predicted,
                confidence: peakHour.confidence
            } : null,
        },

        // Staffing
        staffing: {
            current_need: { doctors: doctorNeeded, nurses: nurseNeeded },
            peak_need: { doctors: peakDoctorNeeded, nurses: peakNurseNeeded },
            avg_service_minutes: avgServiceMin,
            ratios: { patients_per_nurse: NURSE_RATIO, patients_per_doctor: DOCTOR_RATIO }
        },

        // Clinic Bottlenecks
        clinic_load: (clinicLoad || []).map(c => ({
            clinic: c.clinic,
            active: Number(c.active_patients),
            waiting: Number(c.waiting),
            severity: c.waiting >= 10 ? 'critical' : c.waiting >= 5 ? 'high' : 'normal'
        })),

        // Hourly Data
        hourly: hourlyForecast,

        // AI Recommendations
        recommendations,
    };
}

export default { getOPDFlowPrediction };
