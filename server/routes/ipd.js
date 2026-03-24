// ============================================================
// IPD Operations Routes — HOSxP XE Only, Optimized
// ============================================================
import { Router } from 'express';
import hosxp from '../db/hosxpIntegration.js';
import { getCachedOccupancy } from '../jobs/occupancySync.js';
import { cacheMiddleware } from '../cache/redis.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { calculateNEWS2 } from '../ai/ewsEngine.js';
import logger from '../logger.js';
import { maskPatientData, maskPatientList } from '../middleware/dataMasking.js';
import { z } from 'zod';
import { validate, validateQuery, validateParams } from '../middleware/validate.js';

const router = Router();

// ============================================================
// Validation Schemas (Phase 2.4)
// ============================================================
const admissionsQuerySchema = z.object({
    ward_id: z.string().optional(),
});

const alosQuerySchema = z.object({
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    ward_id: z.string().optional(),
});

const fiscalQuerySchema = z.object({
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    ward_id: z.string().optional(),
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const drilldownQuerySchema = z.object({
    type: z.enum(['beds', 'readmit', 'alos', 'cmi', 'mortality']),
});

const anParamsSchema = z.object({
    an: z.string().min(1),
});

const highRiskQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(500).default(50),
    offset: z.coerce.number().int().min(0).default(0),
});

// Ward '06' = Home Ward (หอผู้ป่วยโฮมวาร์ด) — ผู้ป่วยไม่ครองเตียงจริงในโรงพยาบาล
// ต้อง exclude ออกจากการคำนวณ Occupancy, Turnover, และ Analytics ทุกตัว
const HOME_WARD = '06';

// ---- Bed Occupancy (cached 1 min) ----
router.get('/bed-occupancy', cacheMiddleware(60), async (req, res) => {
    try {
        const data = await hosxp.getBedOccupancy();
        const wards = (data || []).map(w => ({
            id: w.id, name: w.name, shortname: w.shortname || '',
            total_beds: w.total_beds || 0, real_beds: w.real_beds || 0,
            occupied: w.occupied || 0,
            available: (w.total_beds || 0) - (w.occupied || 0),
            occupancy_rate: w.total_beds > 0 ? Math.round((w.occupied / w.total_beds) * 100) : 0
        }));
        // ดึงจำนวนเตียงจริงจาก ward data (ไม่รวม Home Ward)
        const tb = wards.filter(w => w.id !== HOME_WARD).reduce((s, w) => s + (w.total_beds || 0), 0) || 1;
        const oc = wards.filter(w => w.id !== HOME_WARD).reduce((s, w) => s + w.occupied, 0);
        res.json({
            data_source: 'HOSxP XE', wards,
            summary: {
                total_beds: tb, occupied: oc, available: tb - oc,
                occupancy_rate: tb > 0 ? Math.round((oc / tb) * 100) : 0,
                critical_wards: wards.filter(w => w.occupancy_rate > 85).map(w => w.name)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Admissions (cached 1 min) ----
router.get('/admissions', validateQuery(admissionsQuerySchema), cacheMiddleware(60), async (req, res) => {
    try {
        const data = await hosxp.getActiveAdmissions(req.query.ward_id);
        const admissions = (data || []).map(a => ({
            an: a.an, hn: a.hn, patient_name: a.name,
            admission_date: a.regdate, ward_name: a.ward, ward_id: a.ward_id,
            doctor_name: a.doctor, diagnosis_code: a.icd10, diagnosis_name: a.dx_name,
            current_stay_days: a.stay_days, payer_type: a.payer,
            age: a.age, gender: a.sex,
            is_over_stay: (a.stay_days ?? 0) > 14,
            over_stay_days: (a.stay_days ?? 0) > 14 ? a.stay_days - 14 : 0
        }));
        res.json({
            data_source: 'HOSxP XE', admissions,
            count: admissions.length,
            over_stay_count: admissions.filter(a => a.is_over_stay).length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- ALOS (cached 5 min) ----
router.get('/alos', validateQuery(alosQuerySchema), cacheMiddleware(300), async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();
        const data = await hosxp.getALOSData({ year, wardId: req.query.ward_id });
        const details = (data || []).map(d => ({
            drg_code: d.drg, ward_name: d.ward,
            patient_count: d.cnt,
            actual_alos: Math.round(Number(d.alos) * 10) / 10,
            drg_weight: Math.round(Number(d.rw || 0) * 100) / 100
        }));
        res.json({
            data_source: 'HOSxP XE', details,
            summary: {
                total_drgs: details.length,
                total_patients: details.reduce((s, d) => s + d.patient_count, 0),
                overall_alos: details.length > 0 ? Math.round(details.reduce((s, d) => s + d.actual_alos, 0) / details.length * 10) / 10 : 0
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Wards ----
router.get('/wards', cacheMiddleware(300), async (req, res) => {
    try {
        const data = await hosxp.getBedOccupancy();
        res.json({ wards: data || [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Advanced Analytics (cached 10 min) ----
router.get('/analytics', cacheMiddleware(600), async (req, res) => {
    try {
        const { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } = await import('../db/mysql.js');

        // ━━ ALL queries run in PARALLEL — no extra latency ━━
        const [
            totalBedsRow,
            turnover, alosVariance, revPerBedDay, admTrend, genderAge, overstay,
            readmitData, cmiData, dischPlanData, mortalityData, currentAcuity, revPerDisch, dowPattern,
            activeDoctors, activeNurses, activeStaff
        ] = await Promise.all([

            // 0. Total beds — ดึงจาก ward table จริง (ไม่รวม Home Ward '06' และ Ward '17')
            dbQueryOne(`
                SELECT SUM(COALESCE(real_bedcount, bedcount, 0)) as total
                FROM ward
                WHERE ward_active = 'Y' AND ward NOT IN ('${HOME_WARD}', '17')
            `).catch(() => null),

            // 1. Bed Turnover Rate — จำนวน discharge ใน 30 วัน / จำนวนเตียง
            dbQueryOneHeavy('ipdTurnover30d', 30, `
                SELECT COUNT(*) as discharged_30d
                FROM ipt
                WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND dchdate IS NOT NULL
            `),

            // 2. ALOS Variance — actual vs DRG benchmark (rw-based proxy: 1 RW ≈ 4 วัน)
            dbQueryOneHeavy('ipdALOSVariance', 60, `
                SELECT
                    ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as actual_alos,
                    ROUND(AVG(a.rw * 4), 1)                       as benchmark_alos,
                    COUNT(*)                                        as cases
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND i.dchdate IS NOT NULL
                  AND a.rw > 0
            `),

            // 3. Revenue per Bed-Day (30 วัน)
            dbQueryOneHeavy('ipdRevPerBedDay30d', 60, `
                SELECT
                    SUM(a.income)                                                  as total_revenue,
                    SUM(DATEDIFF(i.dchdate, i.regdate))                           as total_bed_days,
                    ROUND(SUM(a.income) / NULLIF(SUM(DATEDIFF(i.dchdate,i.regdate)),0), 0) as rev_per_bed_day
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND i.dchdate IS NOT NULL AND a.income > 0
            `),

            // 4. 7-day Admission Trend
            dbQuery(`
                SELECT DATE(regdate) as d, COUNT(*) as admissions,
                    SUM(CASE WHEN dchdate IS NOT NULL THEN 1 ELSE 0 END) as discharges
                FROM ipt
                WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                GROUP BY DATE(regdate) ORDER BY d
            `),

            // 5. Gender + Age Distribution (current IPD)
            dbQueryOne(`
                SELECT
                    SUM(CASE WHEN p.sex IN ('1','ช') THEN 1 ELSE 0 END) as male,
                    SUM(CASE WHEN p.sex IN ('2','ญ') THEN 1 ELSE 0 END) as female,
                    ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, NOW())), 1) as avg_age,
                    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 60 THEN 1 ELSE 0 END) as elderly,
                    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) < 15 THEN 1 ELSE 0 END) as pediatric
                FROM ipt i INNER JOIN patient p ON i.hn = p.hn
                WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}'
            `),

            // 6. Overstay Analysis
            dbQueryOne(`
                SELECT
                    SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14 THEN 1 ELSE 0 END) as overstay_count,
                    ROUND(AVG(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14
                        THEN DATEDIFF(NOW(), i.regdate) - 14 END), 1) as avg_excess_days,
                    COUNT(*) as total_current
                FROM ipt i WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}'
            `),

            // ━━━━━━━━━━ NEW PROFESSIONAL KPIs ━━━━━━━━━━

            // 7. Readmission Rate (30-day) — HA/JCI Quality Indicator
            dbQueryOneHeavy('ipdReadmitRate30d', 60, `
                SELECT
                    COUNT(DISTINCT i2.an) as readmit_count,
                    COUNT(DISTINCT i1.an) as total_discharges,
                    ROUND(100.0 * COUNT(DISTINCT i2.an) / NULLIF(COUNT(DISTINCT i1.an), 0), 1) as readmit_rate
                FROM ipt i1
                LEFT JOIN ipt i2
                    ON i1.hn = i2.hn
                    AND i2.an != i1.an
                    AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
                WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                  AND i1.dchdate IS NOT NULL
                  AND i1.ward != '${HOME_WARD}'
            `).catch(() => null),

            // 8. Case Mix Index (CMI) — ระดับความซับซ้อน
            dbQueryOneHeavy('ipdCMI30d', 60, `
                SELECT
                    ROUND(AVG(a.rw), 3) as cmi,
                    ROUND(STDDEV(a.rw), 3) as cmi_stddev,
                    MAX(a.rw) as max_rw,
                    COUNT(*) as cases,
                    SUM(CASE WHEN a.rw >= 2 THEN 1 ELSE 0 END) as complex_cases,
                    SUM(a.rw) as total_rw
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND i.dchdate IS NOT NULL
                  AND a.rw > 0
            `).catch(() => null),

            // 9. Discharge Planning Compliance — % จำหน่ายก่อนเที่ยง
            dbQueryOne(`
                SELECT
                    COUNT(*) as total_dch,
                    SUM(CASE WHEN HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END) as before_noon,
                    SUM(CASE WHEN HOUR(i.dchtime) >= 12 AND HOUR(i.dchtime) < 16 THEN 1 ELSE 0 END) as afternoon,
                    SUM(CASE WHEN HOUR(i.dchtime) >= 16 THEN 1 ELSE 0 END) as evening,
                    ROUND(100.0 * SUM(CASE WHEN HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END)
                        / NULLIF(COUNT(*), 0), 1) as before_noon_pct,
                    AVG(HOUR(i.dchtime) + MINUTE(i.dchtime)/60.0) as avg_dch_hour
                FROM ipt i
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND i.dchdate IS NOT NULL
                  AND i.dchtime IS NOT NULL
                  AND i.ward != '${HOME_WARD}'
            `).catch(() => null),

            // 10. Mortality Rate — อัตราตาย (dchtype 9 = ตาย)
            dbQueryOne(`
                SELECT
                    COUNT(*) as total_dch,
                    SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9' THEN 1 ELSE 0 END) as deaths,
                    ROUND(100.0 * SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9' THEN 1 ELSE 0 END)
                        / NULLIF(COUNT(*), 0), 2) as mortality_rate,
                    SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9'
                        THEN DATEDIFF(i.dchdate, i.regdate) ELSE 0 END) as death_total_los
                FROM ipt i
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND i.dchdate IS NOT NULL
                  AND i.ward != '${HOME_WARD}'
            `).catch(() => null),

            // 11. Current Average Acuity — ผู้ป่วยที่นอนอยู่ตอนนี้
            dbQueryOne(`
                SELECT
                    ROUND(AVG(a.rw), 3) as current_acuity,
                    SUM(CASE WHEN a.rw >= 2 THEN 1 ELSE 0 END) as high_acuity,
                    SUM(CASE WHEN a.rw >= 1 AND a.rw < 2 THEN 1 ELSE 0 END) as medium_acuity,
                    SUM(CASE WHEN a.rw < 1 THEN 1 ELSE 0 END) as low_acuity,
                    COUNT(*) as total_with_rw
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.dchdate IS NULL AND i.ward != '${HOME_WARD}' AND a.rw > 0
            `).catch(() => null),

            // 12. Revenue per Discharge
            dbQueryOneHeavy('ipdRevPerDisch30d', 60, `
                SELECT
                    COUNT(*) as total_dch,
                    SUM(a.income) as total_revenue,
                    ROUND(SUM(a.income) / NULLIF(COUNT(*), 0), 0) as rev_per_discharge,
                    ROUND(STDDEV(a.income), 0) as rev_stddev,
                    MAX(a.income) as max_charge,
                    ROUND(AVG(a.income - (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0))), 0) as avg_unpaid
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND i.dchdate IS NOT NULL AND a.income > 0
            `).catch(() => null),

            // 13. Day-of-Week Admission Heatmap
            dbQueryHeavy('ipdDowHeatmap', 120, `
                SELECT
                    DAYOFWEEK(regdate) as dow,
                    COUNT(*) as total,
                    ROUND(AVG(DATEDIFF(IFNULL(dchdate, CURDATE()), regdate)), 1) as avg_los
                FROM ipt
                WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                  AND ward != '${HOME_WARD}'
                GROUP BY DAYOFWEEK(regdate)
                ORDER BY dow
            `).catch(() => []),

            // 14. Active IPD Doctors (from Current Admissions)
            dbQuery(`
                SELECT 
                    u.loginname as username, 
                    u.name as staff_name,
                    COUNT(i.an) as total_count
                FROM ipt i
                JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
                WHERE i.dchdate IS NULL
                GROUP BY u.loginname, u.name
                ORDER BY total_count DESC
            `).catch(() => []),

            // 15. Active IPD Nurses Today (Activity: Assessment, Nurse Note)
            dbQuery(`
                SELECT 
                    u.loginname as username, 
                    u.name as staff_name, 
                    SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
                    SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
                    SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
                    COUNT(*) as total_count
                FROM (
                    SELECT assessment_head_staff as staff, assessment_head_datetime as activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
                    UNION ALL
                    SELECT staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
                ) as activity
                JOIN opduser u ON activity.staff = u.loginname
                WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
                GROUP BY u.loginname, u.name
                ORDER BY total_count DESC
            `).catch(() => []),

            // 16. Active IPD Staff Today (Activity: Assessment, Nurse Note)
            dbQuery(`
                SELECT 
                    u.loginname as username, 
                    u.name as staff_name, 
                    SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
                    SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
                    SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
                    COUNT(*) as total_count
                FROM (
                    SELECT assessment_head_staff as staff, assessment_head_datetime as activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
                    UNION ALL
                    SELECT staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
                ) as activity
                JOIN opduser u ON activity.staff = u.loginname
                WHERE u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
                    AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
                    AND u.loginname != 'kiosk'
                GROUP BY u.loginname, u.name
                ORDER BY total_count DESC
            `).catch(() => [])
        ]);

        // ━━ Calculations ━━

        // ใช้จำนวนเตียงจริงจาก DB — fallback 120 กรณี query ล้มเหลว (เช่น ward table ยังไม่มีข้อมูล)
        const totalBeds = Number(totalBedsRow?.total || 0) || 120;

        // Bed Turnover Rate = discharges / total beds
        const discharged = Number(turnover?.discharged_30d || 0);
        const turnoverRate = Math.round((discharged / totalBeds) * 10) / 10;

        // ALOS Variance %
        const actualALOS = Number(alosVariance?.actual_alos || 0);
        const benchmarkALOS = Number(alosVariance?.benchmark_alos || 0);
        const alosVariancePct = benchmarkALOS > 0
            ? Math.round(((actualALOS - benchmarkALOS) / benchmarkALOS) * 100 * 10) / 10
            : 0;

        // Overstay Impact (estimated cost = avg_excess_days × avg rev_per_bed_day)
        const revPerDay = Number(revPerBedDay?.rev_per_bed_day || 2000);
        const overstayCount = Number(overstay?.overstay_count || 0);
        const avgExcess = Number(overstay?.avg_excess_days || 0);
        const overstayImpact = Math.round(overstayCount * avgExcess * revPerDay);

        const g = genderAge || {};
        const total = Number(overstay?.total_current || 0);
        const overstayPct = total > 0
            ? Math.round((overstayCount / total) * 100 * 10) / 10 : 0;

        // ━━ WEI v2 (Ward Efficiency Index — Enhanced) ━━
        // Turnover 25% + ALOS 20% + Overstay 15% + CMI-adjusted Utilization 20% + Discharge Planning 10% + Readmission Penalty 10%
        const turnoverScore = Math.min(100, Math.round((turnoverRate / 4) * 100));
        const alosScore = Math.max(0, Math.round(100 - Math.abs(alosVariancePct)));
        const overstayScore = Math.max(0, Math.round(100 - overstayPct * 3));

        // CMI-adjusted utilization: ถ้า CMI สูง + occupancy สูง = ดี
        const cmi = Number(cmiData?.cmi || 0);
        const cmiScore = Math.min(100, Math.round(cmi * 80)); // CMI 1.25 ≈ 100

        // Discharge Planning score: % ก่อนเที่ยง × 1.0 (100% = perfect)
        const dischPlanPct = Number(dischPlanData?.before_noon_pct || 0);
        const dischPlanScore = Math.min(100, Math.round(dischPlanPct));

        // Readmission penalty: Low re-admit = high score  
        const readmitRate = Number(readmitData?.readmit_rate || 0);
        const readmitScore = Math.max(0, Math.round(100 - readmitRate * 5)); // 20% readmit = 0 score

        const wei = Math.round(
            (turnoverScore * 0.25) +
            (alosScore * 0.20) +
            (overstayScore * 0.15) +
            (cmiScore * 0.20) +
            (dischPlanScore * 0.10) +
            (readmitScore * 0.10)
        );

        // Day-of-week pattern (format for frontend)
        const dowNames = ['', 'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
        const dowData = Array.from({ length: 7 }, (_, i) => {
            const dow = i + 1;
            const d = (dowPattern || []).find(x => Number(x.dow) === dow);
            return { day: dowNames[dow], dow, total: Number(d?.total || 0), avg_los: Number(d?.avg_los || 0) };
        });

        res.json({
            data_source: 'HOSxP XE',
            // Bed Turnover
            bed_turnover_rate: turnoverRate,
            discharged_30d: discharged,
            // ALOS Variance
            actual_alos: actualALOS,
            benchmark_alos: benchmarkALOS,
            alos_variance_pct: alosVariancePct,
            alos_cases: Number(alosVariance?.cases || 0),
            // Revenue per Bed-Day
            rev_per_bed_day: Number(revPerBedDay?.rev_per_bed_day || 0),
            total_revenue_30d: Number(revPerBedDay?.total_revenue || 0),
            total_bed_days: Number(revPerBedDay?.total_bed_days || 0),
            // Overstay
            overstay_count: overstayCount,
            avg_excess_days: avgExcess,
            overstay_impact_thb: overstayImpact,
            overstay_pct: overstayPct,
            // Patient Mix (current)
            male: Number(g.male || 0),
            female: Number(g.female || 0),
            avg_age: Number(g.avg_age || 0),
            elderly: Number(g.elderly || 0),
            pediatric: Number(g.pediatric || 0),

            // ━━━━━━ NEW PROFESSIONAL KPIs ━━━━━━

            // Readmission Rate (30d)
            readmit_count: Number(readmitData?.readmit_count || 0),
            readmit_total_discharges: Number(readmitData?.total_discharges || 0),
            readmit_rate: Number(readmitData?.readmit_rate || 0),

            // Case Mix Index
            cmi: cmi,
            cmi_stddev: Number(cmiData?.cmi_stddev || 0),
            cmi_max_rw: Number(cmiData?.max_rw || 0),
            cmi_cases: Number(cmiData?.cases || 0),
            complex_cases: Number(cmiData?.complex_cases || 0),
            total_rw: Number(cmiData?.total_rw || 0),

            // Discharge Planning
            disch_before_noon_pct: dischPlanPct,
            disch_before_noon: Number(dischPlanData?.before_noon || 0),
            disch_afternoon: Number(dischPlanData?.afternoon || 0),
            disch_evening: Number(dischPlanData?.evening || 0),
            disch_total: Number(dischPlanData?.total_dch || 0),
            avg_dch_hour: Math.round(Number(dischPlanData?.avg_dch_hour || 0) * 10) / 10,

            // Mortality
            mortality_rate: Number(mortalityData?.mortality_rate || 0),
            deaths_30d: Number(mortalityData?.deaths || 0),
            mortality_total_dch: Number(mortalityData?.total_dch || 0),

            // Current Acuity (live)
            current_acuity: Number(currentAcuity?.current_acuity || 0),
            high_acuity_count: Number(currentAcuity?.high_acuity || 0),
            medium_acuity_count: Number(currentAcuity?.medium_acuity || 0),
            low_acuity_count: Number(currentAcuity?.low_acuity || 0),

            // Revenue per Discharge
            rev_per_discharge: Number(revPerDisch?.rev_per_discharge || 0),
            rev_stddev: Number(revPerDisch?.rev_stddev || 0),
            max_charge: Number(revPerDisch?.max_charge || 0),
            avg_unpaid: Number(revPerDisch?.avg_unpaid || 0),

            // ━━ Day-of-Week Pattern ━━
            dow_pattern: dowData,

            // ━━ On-Duty Personnel (IPD) ━━
            on_duty: {
                doctors: (activeDoctors || []),
                nurses: (activeNurses || []),
                staff: (activeStaff || [])
            },

            // ━━ Composite (Enhanced) ━━
            wei,  // Ward Efficiency Index v2 (0-100)
            wei_components: {
                turnover: turnoverScore,
                alos: alosScore,
                overstay: overstayScore,
                cmi: cmiScore,
                disch_plan: dischPlanScore,
                readmit: readmitScore,
            },
            admission_trend: (admTrend || []),
            // ━━ AI Insights Hub (Executive Level) ━━
            ai_insights: {
                operational: {
                    title: 'Bed Demand & Efficiency',
                    score: turnoverScore,
                    status: turnoverRate > 3.0 ? 'optimal' : 'low_throughput',
                    analysis: `อัตราการหมุนเวียนเตียง (Turnover) อยู่ที่ ${turnoverRate} รอบ/30วัน (${discharged} ราย) ถือว่า${turnoverRate > 3.0 ? 'สูงและมีประสิทธิภาพ' : 'ต้องเร่งการหมุนเวียน'}`,
                    recommendation: turnoverRate > 3.0 ? '✅ รักษาระดับ Throughput และเน้นคุณภาพการจำหน่าย' : '💡 เร่งนัดตรวจ Discharge Planning ตั้งแต่วันแรก เพื่อลด LOS และเพิ่มพื้นที่รับผู้ป่วยไหม่'
                },
                clinical_quality: {
                    title: 'Clinical Quality Intelligence',
                    score: Math.round(100 - readmitRate * 5),
                    status: readmitRate > 10 ? 'critical' : 'stable',
                    analysis: `อัตรา Readmit 30 วัน อยู่ที่ ${readmitRate}% และ Mortality Rate ${Number(mortalityData?.mortality_rate || 0)}%`,
                    recommendation: readmitRate > 10 ? '🚨 วิกฤต: Readmit สูงเกินเกณฑ์! ต้อง Audit แผนการรักษาก่อนจำหน่าย ด่วน' : '✅ คุณภาพการรักษามั่นคง มุ่งเน้นการทำ Patient Education หลังจำหน่าย'
                },
                financial: {
                    title: 'Revenue Efficiency Alert',
                    score: alosScore,
                    status: alosVariancePct > 10 ? 'leakage' : 'optimal',
                    analysis: `ค่ารักษาเฉลี่ยต่อจำหน่าย ฿${(revPerDisch?.rev_per_discharge || 0).toLocaleString()} แต่อัตรา LOS Variance สะท้อนความล่าช้า ${alosVariancePct}%`,
                    recommendation: alosVariancePct > 10 ? '💰 Leakage Detected: LOS ยาวส่งผลให้ Margin ลดลง! ต้องควบคุม Bed-Day Cost' : '✅ รายได้ต่อเตียงสัมพันธ์กับความซับซ้อนของโรค (CMI) อย่างเหมาะสม'
                }
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ━━━━━━ IPD Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', validateQuery(fiscalQuerySchema), cacheMiddleware(3600), async (req, res) => {
    try {
        const { dbQuery: dbQ } = await import('../db/mysql.js');
        const { getFiscalConfig } = await import('../helpers/fiscal.js');
        const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(req.query.start, req.query.end);

        const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

        const rows = await dbQ(`
            SELECT
                YEAR(i.dchdate) AS yr,
                MONTH(i.dchdate) AS mo,
                SUM(a.income) AS revenue,
                COUNT(DISTINCT i.an) AS case_count,
                COUNT(DISTINCT i.hn) AS patient_count,
                ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS avg_los,
                ROUND(AVG(a.rw), 3) AS avg_rw
            FROM ipt i
            INNER JOIN an_stat a ON i.an = a.an
            WHERE i.dchdate BETWEEN '${globalStart}' AND LEAST('${globalEnd}', CURDATE())
              AND i.dchdate IS NOT NULL
              AND a.income > 0
              AND i.ward != '${HOME_WARD}'
            GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
            ORDER BY yr, mo
        `);

        const result = fiscalYears.map(fy => {
            const months = [];
            let totalRevenue = 0;
            let totalCases = 0;
            let totalPatients = 0;

            for (let i = 0; i < 12; i++) {
                const mNum = ((9 + i) % 12) + 1;
                const yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;

                const row = (rows || []).find(r => Number(r.yr) === yNum && Number(r.mo) === mNum);
                const rev = Math.round(Number(row?.revenue || 0));
                const cases = Number(row?.case_count || 0);
                const patients = Number(row?.patient_count || 0);

                totalRevenue += rev;
                totalCases += cases;
                totalPatients += patients;

                months.push({
                    month: MONTH_TH[mNum],
                    month_num: mNum,
                    year_num: yNum,
                    revenue: rev,
                    cases,
                    patients,
                    avg_los: Number(row?.avg_los || 0),
                    avg_rw: Number(row?.avg_rw || 0),
                    has_data: cases > 0,
                });
            }

            return {
                fiscal_year_be: fy.fiscalBE,
                fiscal_label: `ปีงบ ${fy.fiscalBE}`,
                start_date: fy.startDate,
                end_date: fy.endDate,
                total_revenue: totalRevenue,
                total_cases: totalCases,
                total_patients: totalPatients,
                avg_revenue_per_case: totalCases > 0 ? Math.round(totalRevenue / totalCases) : 0,
                months,
            };
        });

        // ---- Comparable Revenue: fair YoY comparison ----
        const latest = result[result.length - 1];
        const comparableIdx = latest.months.map((m, i) => m.has_data ? i : -1).filter(i => i >= 0);
        const comparableMonthCount = comparableIdx.length;
        for (const fy of result) {
            let compRev = 0, compCases = 0;
            for (const i of comparableIdx) {
                compRev += fy.months[i]?.revenue || 0;
                compCases += fy.months[i]?.cases || 0;
            }
            fy.comparable_revenue = compRev;
            fy.comparable_visits = compCases;
            fy.comparable_months = comparableMonthCount;
        }

        res.json({
            data_source: 'HOSxP XE · an_stat',
            fiscal_years: result,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- IPD Drill-Down (cached 1 min) ----
router.get('/drilldown', validateQuery(drilldownQuerySchema), cacheMiddleware(60), async (req, res) => {
    const { type } = req.query;
    try {
        if (type === 'beds') {
            const [wardRows, activeAdm] = await Promise.all([
                hosxp.getBedOccupancy(),
                hosxp.getActiveAdmissions()
            ]);

            return res.json({
                wards: (wardRows || []).map(w => ({
                    name: w.name,
                    total: w.total_beds,
                    occupied: w.occupied,
                    rate: w.total_beds > 0 ? Math.round((w.occupied / w.total_beds) * 100) : 0
                })),
                activePatients: (activeAdm || []).slice(0, 15).map(a => ({
                    an: a.an,
                    name: a.name,
                    ward: a.ward,
                    stay: a.stay_days,
                    rx: a.dx_name
                }))
            });
        }
        if (type === 'readmit') {
            const data = await hosxp.getIPDReadmissionDetails();
            return res.json({ patients: data || [] });
        }
        if (type === 'alos') {
            const data = await hosxp.getIPDALOSVarianceDetails();
            return res.json({ patients: data || [] });
        }
        if (type === 'cmi') {
            const data = await hosxp.getIPDCMIDetails();
            return res.json({ drgs: data || [] });
        }
        if (type === 'mortality') {
            const data = await hosxp.getIPDMortalityDetails();
            return res.json({ patients: data || [] });
        }
        res.status(400).json({ error: 'Unsupported drill-down type' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================================
// PHASE 2: Real-Time Occupancy Synchronization
// ============================================================

// ---- GET /api/ipd/occupancy-now — Instant cached occupancy ----
router.get('/occupancy-now', async (req, res) => {
    try {
        const cached = getCachedOccupancy();
        
        if (!cached) {
            return res.status(503).json({ 
                error: 'Occupancy data not yet available',
                message: 'Cache still initializing, try again in 30s'
            });
        }
        
        res.json({
            lastUpdated: cached.lastUpdated,
            totalOccupied: cached.totalOccupied,
            totalBeds: cached.totalBeds,
            occupancyRate: cached.totalBeds > 0 
                ? Math.round((cached.totalOccupied / cached.totalBeds) * 100)
                : 0,
            summary: cached.summary,
            cacheAge: Math.round((Date.now() - cached.lastUpdated.getTime()) / 1000) + 's'
        });
    } catch (err) {
        logger.error('Occupancy cache error', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ============================================================
// PHASE 2: Vital Signs Time-Series Endpoints
// ============================================================

// ---- Validation Schemas ----
const vitalSignsSchema = z.object({
    an: z.string().min(1, 'an required'),
    hn: z.string().optional(),
    rr: z.coerce.number().nullable().optional(),
    spo2: z.coerce.number().nullable().optional(),
    bps: z.coerce.number().int().nullable().optional(),
    bpd: z.coerce.number().int().nullable().optional(),
    pulse: z.coerce.number().int().nullable().optional(),
    temperature: z.coerce.number().nullable().optional()
});

const queryVitalHistorySchema = z.object({
    hours: z.coerce.number().int().min(1).max(168).default(24),
    limit: z.coerce.number().int().min(1).max(500).default(100)
});

// ---- POST /api/ipd/vitals — Log new vital signs ----
router.post('/vitals', validate(vitalSignsSchema), async (req, res) => {
    try {
        const { an, hn, rr, spo2, bps, bpd, pulse, temperature } = req.body;
        
        // Validate at least one vital sign provided
        if (rr == null && spo2 == null && bps == null && bpd == null && 
            pulse == null && temperature == null) {
            return res.status(400).json({ 
                error: 'At least one vital sign required',
                requiredFields: ['rr', 'spo2', 'bps', 'bpd', 'pulse', 'temperature']
            });
        }
        
        // Calculate NEWS2 score
        const news2 = calculateNEWS2({ rr, spo2, bps, bpd, pulse, temperature });
        
        // Insert into ipt_vitals
        await dbQuery(`
            INSERT INTO ipt_vitals 
            (an, hn, check_datetime, rr, spo2, bps, bpd, pulse, temperature, 
             news2_score, news2_risk_level, created_by)
            VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [an, hn, rr, spo2, bps, bpd, pulse, temperature, 
            news2.total_score, news2.risk_level, req.user?.username || 'api']);
        
        // Alert if critical
        if (news2.risk_level === 'critical') {
            logger.warn('Critical EWS score recorded', {
                an, hn, news2_score: news2.total_score,
                risk_level: news2.risk_level,
                userId: req.user?.username
            });
            
            // Broadcast WebSocket alert if available
            if (req.app.get('io')) {
                req.app.get('io').emit('clinical_alert', {
                    type: 'HIGH_EWS',
                    an: an,
                    hn: hn,
                    news2_score: news2.total_score,
                    risk_level: news2.risk_level,
                    timestamp: new Date().toISOString()
                });
            }
        }
        
        res.json({ 
            success: true, 
            news2_score: news2.total_score, 
            risk_level: news2.risk_level,
            action_required: news2.risk_level === 'critical'
        });
        
    } catch (err) {
        logger.error('Vital signs logging error', { error: err.message, an: req.body.an });
        res.status(500).json({ error: err.message });
    }
});

// ---- GET /api/ipd/:an/vitals-history — 24h vital trend ----
router.get('/:an/vitals-history', validateParams(anParamsSchema), async (req, res) => {
    try {
        const { an } = req.params;
        const { hours = 24, limit = 100 } = req.query;
        
        const vitals = await dbQuery(`
            SELECT check_datetime, rr, spo2, bps, bpd, pulse, temperature, 
                   news2_score, news2_risk_level
            FROM ipt_vitals
            WHERE an = ? AND check_datetime > DATE_SUB(NOW(), INTERVAL ? HOUR)
            ORDER BY check_datetime ASC
            LIMIT ?
        `, [an, parseInt(hours), parseInt(limit)]);
        
        res.json({
            an,
            period_hours: parseInt(hours),
            vitals_count: vitals.length,
            data: vitals,
            last_update: vitals.length > 0 ? vitals[vitals.length - 1].check_datetime : null
        });
        
    } catch (err) {
        logger.error('Vital history query error', { error: err.message, an: req.params.an });
        res.status(500).json({ error: err.message });
    }
});

// ---- GET /api/ipd/high-risk-patients — Filter by latest NEWS2 ----
router.get('/high-risk-patients', validateQuery(highRiskQuerySchema), async (req, res) => {
    try {
        const patients = await dbQuery(`
            SELECT DISTINCT
                i.an,
                p.hn,
                p.fname,
                p.lname,
                TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age_y,
                p.sex,
                i.ward,
                i.cur_bedno,
                i.regdate,
                DATEDIFF(NOW(), i.regdate) as stay_days,
                iv.check_datetime,
                iv.news2_score,
                iv.news2_risk_level
            FROM ipt i
            JOIN patient p ON i.hn = p.hn
            JOIN ipt_vitals iv ON i.an = iv.an
            WHERE i.dchdate IS NULL
            AND (iv.news2_score >= 5 OR iv.news2_risk_level IN ('high', 'critical'))
            AND iv.check_datetime = (
                SELECT MAX(check_datetime) FROM ipt_vitals iv2 WHERE iv2.an = i.an
            )
            ORDER BY iv.news2_score DESC, iv.check_datetime DESC
            LIMIT 50
        `);
        
        const masked = maskPatientList(patients, req.user?.role || 'director');
        res.json({
            critical_count: patients.filter(p => p.news2_risk_level === 'critical').length,
            high_count: patients.filter(p => p.news2_risk_level === 'high').length,
            total_high_risk: patients.length,
            patients: masked
        });
        
    } catch (err) {
        logger.error('High-risk patients query error', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ============================================================
// PHASE 2: Debt Aging Endpoints
// ============================================================

const debtAgingQuerySchema = z.object({
    bucket: z.enum(['not_due', '0-30_days', '31-60_days', '61-90_days', '>90_days']).optional(),
    limit: z.coerce.number().int().min(1).max(500).default(100)
});

// ---- GET /api/ipd/debt-aging — Debt aging summary ----
router.get('/debt-aging', async (req, res) => {
    try {
        const summary = await dbQuery(`
            SELECT aging_bucket, patient_count, debt_incident_count, 
                   total_debt_amount, avg_debt_per_incident, oldest_debt_date, 
                   oldest_days_overdue
            FROM debt_aging_summary
            ORDER BY 
                CASE 
                    WHEN aging_bucket = 'not_due' THEN 0
                    WHEN aging_bucket = '0-30_days' THEN 1
                    WHEN aging_bucket = '31-60_days' THEN 2
                    WHEN aging_bucket = '61-90_days' THEN 3
                    WHEN aging_bucket = '>90_days' THEN 4
                    ELSE 5
                END
        `);
        
        res.json({
            summary,
            total_unpaid_patients: summary.reduce((sum, row) => sum + row.patient_count, 0),
            total_unpaid_amount: summary.reduce((sum, row) => sum + row.total_debt_amount, 0),
            critical_count: summary.find(s => s.aging_bucket === '>90_days')?.patient_count || 0
        });
        
    } catch (err) {
        logger.error('Debt aging summary error', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ---- GET /api/ipd/debt-aging/details — Patients by aging bucket ----
router.get('/debt-aging/details', async (req, res) => {
    try {
        const bucket = req.query.bucket || '>90_days';
        const limit = req.query.limit ? parseInt(req.query.limit) : 100;
        
        const details = await dbQuery(`
            SELECT pdh.debt_id, pdh.hn, p.fname, p.lname, pdh.remain_amount,
                   pdh.due_date, pdh.days_overdue, pdh.aging_bucket,
                   pdh.created_date, pdh.payment_method, pdh.an, pdh.vn,
                   p.informtel, p.hometel
            FROM patient_debt_history pdh
            JOIN patient p ON pdh.hn = p.hn
            WHERE pdh.aging_bucket = ? AND pdh.paid_date IS NULL
            ORDER BY pdh.days_overdue DESC, pdh.remain_amount DESC
            LIMIT ?
        `, [bucket, limit]);
        
        const masked = maskPatientList(details, req.user?.role || 'finance');
        res.json({
            aging_bucket: bucket,
            patient_count: details.length,
            total_debt: details.reduce((sum, d) => sum + d.remain_amount, 0),
            patients: masked
        });
        
    } catch (err) {
        logger.error('Debt aging details error', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ============================================================
// Discharge Planning Board — ผู้ป่วยที่คาดว่าจำหน่ายวันนี้/พรุ่งนี้
// คาดการณ์จาก: regdate + (adjRW × 4 วัน) เทียบกับวันปัจจุบัน
// Cache 5 นาที
// ============================================================
router.get('/discharge-planning', cacheMiddleware(300), async (req, res) => {
    try {
        const patients = await dbQuery(`
            SELECT
                i.an,
                i.hn,
                CONCAT(p.fname, ' ', p.lname) as patient_name,
                TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
                p.sex,
                i.ward,
                i.regdate,
                DATEDIFF(CURDATE(), i.regdate) as current_los,
                ROUND(a.rw * 4) as expected_los,
                DATE_ADD(i.regdate, INTERVAL ROUND(a.rw * 4) DAY) as expected_discharge,
                DATEDIFF(DATE_ADD(i.regdate, INTERVAL ROUND(a.rw * 4) DAY), CURDATE()) as days_until_discharge,
                a.rw,
                d.icd10 as main_diag,
                COALESCE(u.name, i.admdoctor) as doctor_name,
                CASE
                    WHEN DATEDIFF(DATE_ADD(i.regdate, INTERVAL ROUND(a.rw * 4) DAY), CURDATE()) <= 0 THEN 'today'
                    WHEN DATEDIFF(DATE_ADD(i.regdate, INTERVAL ROUND(a.rw * 4) DAY), CURDATE()) = 1 THEN 'tomorrow'
                    ELSE 'upcoming'
                END as discharge_window
            FROM ipt i
            JOIN patient p ON i.hn = p.hn
            JOIN an_stat a ON i.an = a.an
            LEFT JOIN iptdiag d ON i.an = d.an AND d.diagtype = 1
            LEFT JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
            WHERE i.dchdate IS NULL
              AND i.ward != '${HOME_WARD}'
              AND a.rw > 0
              AND DATE_ADD(i.regdate, INTERVAL ROUND(a.rw * 4) DAY) <= DATE_ADD(CURDATE(), INTERVAL 2 DAY)
            ORDER BY days_until_discharge ASC, a.rw DESC
            LIMIT 60
        `);

        const today = patients.filter(p => p.discharge_window === 'today');
        const tomorrow = patients.filter(p => p.discharge_window === 'tomorrow');

        res.json({
            data_source: 'HOSxP XE · an_stat (adjRW × 4d proxy)',
            today_count: today.length,
            tomorrow_count: tomorrow.length,
            total: patients.length,
            patients: patients.map(p => ({
                ...p,
                patient_name: maskPatientData(p, req.user?.role || 'director').patient_name ?? p.patient_name,
            })),
        });
    } catch (err) {
        logger.error('Discharge planning error', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ============================================================
// Bed Flow (Ward Daily Admit/Discharge) — สำหรับ Gantt Chart
// 14 วันย้อนหลัง รายวอร์ด
// Cache 10 นาที
// ============================================================
router.get('/bed-flow', cacheMiddleware(600), async (req, res) => {
    try {
        const [admitRows, dischargeRows] = await Promise.all([
            dbQuery(`
                SELECT
                    i.ward,
                    w.shortname as ward_name,
                    DATE(i.regdate) as date,
                    COUNT(*) as admissions
                FROM ipt i
                LEFT JOIN ward w ON i.ward = w.ward
                WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
                  AND i.ward != '${HOME_WARD}'
                GROUP BY i.ward, w.shortname, DATE(i.regdate)
                ORDER BY i.ward, DATE(i.regdate)
            `),
            dbQuery(`
                SELECT
                    i.ward,
                    w.shortname as ward_name,
                    DATE(i.dchdate) as date,
                    COUNT(*) as discharges
                FROM ipt i
                LEFT JOIN ward w ON i.ward = w.ward
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
                  AND i.dchdate IS NOT NULL
                  AND i.ward != '${HOME_WARD}'
                GROUP BY i.ward, w.shortname, DATE(i.dchdate)
                ORDER BY i.ward, DATE(i.dchdate)
            `),
        ]);

        // Merge admit + discharge into per-ward per-day records
        const map = {};
        for (const r of admitRows || []) {
            const k = `${r.ward}|${r.date}`;
            if (!map[k]) map[k] = { ward: r.ward, ward_name: r.ward_name || r.ward, date: r.date, admissions: 0, discharges: 0 };
            map[k].admissions = Number(r.admissions || 0);
        }
        for (const r of dischargeRows || []) {
            const k = `${r.ward}|${r.date}`;
            if (!map[k]) map[k] = { ward: r.ward, ward_name: r.ward_name || r.ward, date: r.date, admissions: 0, discharges: 0 };
            map[k].discharges = Number(r.discharges || 0);
        }

        const flow = Object.values(map).sort((a, b) => a.ward.localeCompare(b.ward) || a.date.localeCompare(b.date));
        const wards = [...new Set(flow.map(f => f.ward))];

        res.json({
            data_source: 'HOSxP XE · ipt',
            wards,
            flow,
            days: 14,
        });
    } catch (err) {
        logger.error('Bed flow error', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

export default router;

