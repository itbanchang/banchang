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
import { safeError } from '../lib/safeError.js';
import { getMV } from '../db/materializedViews.js';

const router = Router();

// ============================================================
// Validation Schemas (Phase 2.4)
// ============================================================
const admissionsQuerySchema = z.object({
    ward_id: z.string().optional(),
});

const alosQuerySchema = z.object({
    year: z.coerce.number().int().min(2000).max(2700).optional(),
    ward_id: z.string().optional(),
});

const fiscalQuerySchema = z.object({
    year: z.coerce.number().int().min(2000).max(2700).optional(),
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
    }
});

// ---- ALOS (cached 5 min) ----
router.get('/alos', validateQuery(alosQuerySchema), cacheMiddleware(300), async (req, res) => {
    try {
        const rawYear = Number(req.query.year) || new Date().getFullYear();
        const year = rawYear > 2400 ? rawYear - 543 : rawYear;  // BE → CE
        const [data, overallRow] = await Promise.all([
            hosxp.getALOSData({ year, wardId: req.query.ward_id }),
            // ALOS from materialized view (instant, refreshed every 10 min)
            (async () => {
                const mvIPD = getMV('mv_ipd_summary');
                if (mvIPD?.length) {
                    // Calculate overall ALOS from recent month data (exclude Home Ward '06')
                    const recent = mvIPD.filter(r => r.ward !== HOME_WARD);
                    const totalDch = recent.reduce((s, r) => s + Number(r.discharge_count || 0), 0);
                    // Weighted average ALOS
                    const weightedLos = recent.reduce((s, r) => s + Number(r.avg_los || 0) * Number(r.discharge_count || 0), 0);
                    return { alos: totalDch > 0 ? Math.round(weightedLos / totalDch * 10) / 10 : 0, total_dch: totalDch };
                }
                // Fallback to live query if MV not yet populated
                return dbQueryOne(`
                    SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as alos,
                           COUNT(*) as total_dch
                    FROM ipt
                    WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                      AND dchdate IS NOT NULL AND ward != ?
                      AND DATEDIFF(dchdate, regdate) BETWEEN 0 AND 60
                `, [HOME_WARD]);
            })()
        ]);
        const details = (data || []).map(d => ({
            drg_code: d.drg, ward_name: d.ward,
            patient_count: d.cnt,
            actual_alos: Math.round(Number(d.alos) * 10) / 10,
            drg_weight: Math.round(Number(d.rw || 0) * 100) / 100
        }));
        const totalPatients = details.reduce((s, d) => s + d.patient_count, 0);
        res.json({
            data_source: 'HOSxP XE', details,
            summary: {
                total_drgs: details.length,
                total_patients: totalPatients,
                // ALOS จากผู้ป่วยจำหน่ายจริง 30 วัน (ตรงกับ Dashboard Summary)
                overall_alos: Number(overallRow?.alos || 0),
                total_discharged_30d: Number(overallRow?.total_dch || 0)
            }
        });
    } catch (err) {
        safeError(res, err, 'IPD');
    }
});

// ---- Wards ----
router.get('/wards', cacheMiddleware(300), async (req, res) => {
    try {
        const data = await hosxp.getBedOccupancy();
        res.json({ wards: data || [] });
    } catch (err) {
        safeError(res, err, 'IPD');
    }
});

// ---- Advanced Analytics (cached 10 min) — OPTIMIZED ----
router.get('/analytics', cacheMiddleware(600), async (req, res) => {
    try {
        const { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } = await import('../db/mysql.js');

        // ━━ OPTIMIZED: Combined queries to reduce database round trips ━━
        const [
            summaryStats,    // Combined bed turnover, ALOS variance, revenue per bed-day
            admTrend,        // 7-day admission trend
            genderAge,       // Gender + age distribution
            overstay,        // Overstay analysis
            qualityMetrics,  // Combined readmit, CMI, discharge planning, mortality
            acuityRevenue,   // Current acuity + revenue per discharge + day-of-week
            staffActivity    // Active doctors, nurses, staff
        ] = await Promise.all([

            // 1. Combined Summary Stats (3 queries → 1)
            dbQueryOneHeavy('ipdSummaryStats', 60, `
                SELECT
                    -- Bed Turnover (30 days)
                    (SELECT COUNT(*) FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND dchdate IS NOT NULL AND ward != ?) as discharged_30d,

                    -- ALOS Variance
                    (SELECT ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1)
                     FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.rw > 0) as actual_alos,

                    (SELECT ROUND(AVG(a.rw * 4), 1)
                     FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.rw > 0) as benchmark_alos,

                    (SELECT COUNT(*)
                     FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.rw > 0) as alos_cases,

                    -- Revenue per Bed-Day
                    (SELECT SUM(a.income)
                     FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.income > 0) as total_revenue,

                    (SELECT SUM(DATEDIFF(i.dchdate, i.regdate))
                     FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.income > 0) as total_bed_days
            `, [HOME_WARD]),

            // 2. 7-day Admission Trend
            dbQuery(`
                SELECT DATE(regdate) as d, COUNT(*) as admissions,
                    SUM(CASE WHEN dchdate IS NOT NULL THEN 1 ELSE 0 END) as discharges
                FROM ipt
                WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                GROUP BY DATE(regdate) ORDER BY d
            `),

            // 3. Gender + Age Distribution (current IPD)
            dbQueryOne(`
                SELECT
                    SUM(CASE WHEN p.sex IN ('1','ช') THEN 1 ELSE 0 END) as male,
                    SUM(CASE WHEN p.sex IN ('2','ญ') THEN 1 ELSE 0 END) as female,
                    ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, NOW())), 1) as avg_age,
                    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 60 THEN 1 ELSE 0 END) as elderly,
                    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) < 15 THEN 1 ELSE 0 END) as pediatric
                FROM ipt i INNER JOIN patient p ON i.hn = p.hn
                WHERE i.dchdate IS NULL AND i.ward != ?
            `, [HOME_WARD]),

            // 4. Overstay Analysis
            dbQueryOne(`
                SELECT
                    SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14 THEN 1 ELSE 0 END) as overstay_count,
                    ROUND(AVG(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14
                        THEN DATEDIFF(NOW(), i.regdate) - 14 END), 1) as avg_excess_days,
                    COUNT(*) as total_current
                FROM ipt i WHERE i.dchdate IS NULL AND i.ward != ?
            `, [HOME_WARD]),

            // 5. Combined Quality Metrics (4 queries → 1)
            dbQueryOneHeavy('ipdQualityMetrics', 60, `
                SELECT
                    -- Readmission Rate
                    (SELECT COUNT(DISTINCT i2.an)
                     FROM ipt i1 LEFT JOIN ipt i2 ON i1.hn = i2.hn AND i2.an != i1.an
                     AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
                     WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                     AND i1.dchdate IS NOT NULL AND i1.ward != ?) as readmit_count,

                    (SELECT COUNT(DISTINCT i1.an)
                     FROM ipt i1 WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                     AND i1.dchdate IS NOT NULL AND i1.ward != ?) as total_discharges,

                    -- CMI
                    (SELECT ROUND(AVG(a.rw), 3) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.rw > 0) as cmi,

                    (SELECT ROUND(STDDEV(a.rw), 3) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.rw > 0) as cmi_stddev,

                    (SELECT COUNT(*) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.rw > 0) as cmi_cases,

                    -- Discharge Planning (% before noon)
                    (SELECT COUNT(*) FROM ipt i
                     WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND i.dchtime IS NOT NULL
                     AND i.ward != ?) as total_dch,

                    (SELECT SUM(CASE WHEN HOUR(i.dchtime) < 12 THEN 1 ELSE 0 END)
                     FROM ipt i WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND i.dchtime IS NOT NULL
                     AND i.ward != ?) as before_noon,

                    -- Mortality Rate
                    (SELECT SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9' THEN 1 ELSE 0 END)
                     FROM ipt i WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND i.ward != ?) as deaths
            `, [HOME_WARD, HOME_WARD, HOME_WARD, HOME_WARD, HOME_WARD]),

            // 6. Current Acuity + Revenue per Discharge + Day-of-Week
            dbQueryOneHeavy('ipdAcuityRevenueDow', 60, `
                SELECT
                    -- Current Acuity
                    (SELECT ROUND(AVG(a.rw), 3) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate IS NULL AND i.ward != ? AND a.rw > 0) as current_acuity,

                    (SELECT SUM(CASE WHEN a.rw >= 2 THEN 1 ELSE 0 END)
                     FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate IS NULL AND i.ward != ? AND a.rw > 0) as high_acuity,

                    -- Revenue per Discharge
                    (SELECT COUNT(*) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.income > 0) as total_dch_rev,

                    (SELECT SUM(a.income) FROM ipt i INNER JOIN an_stat a ON i.an = a.an
                     WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                     AND i.dchdate IS NOT NULL AND a.income > 0) as total_revenue_rev,

                    -- Day-of-Week pattern (sample for last 90 days)
                    (SELECT COUNT(*) FROM ipt
                     WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                     AND ward != ?) as dow_total
            `, [HOME_WARD, HOME_WARD, HOME_WARD]),

            // 7. Staff Activity — multiple data sources for reliability
            Promise.all([
                // Active IPD Doctors: attending doctors of currently admitted patients + today's orders
                dbQuery(`
                    SELECT u.loginname, u.name, COUNT(DISTINCT i.an) as total_count
                    FROM ipt i
                    LEFT JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
                    WHERE i.dchdate IS NULL AND u.name IS NOT NULL
                      AND (u.name LIKE 'นพ.%' OR u.name LIKE 'พญ.%')
                    GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 10
                `).then(r => r?.length > 0 ? r : dbQuery(`
                    SELECT u.loginname, u.name, COUNT(DISTINCT d.an) as total_count
                    FROM iptdiag d
                    JOIN ipt i ON d.an = i.an
                    JOIN opduser u ON d.staff = u.loginname
                    WHERE d.modify_datetime >= CURDATE()
                      AND (u.name LIKE 'นพ.%' OR u.name LIKE 'พญ.%')
                    GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 10
                `).catch(() => [])).catch(() => []),
                // Active IPD Nurses: nurse notes + doctor orders + progress notes
                dbQuery(`
                    SELECT u.loginname, u.name,
                        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
                        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
                        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
                        COUNT(*) as total_count
                    FROM (
                        SELECT staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
                        UNION ALL
                        SELECT doctor as staff, order_date as activity_time FROM doctor_order WHERE DATE(order_date) = CURDATE()
                        UNION ALL
                        SELECT staff, entry_datetime as activity_time FROM progress_note WHERE DATE(entry_datetime) = CURDATE()
                    ) as activity
                    JOIN opduser u ON activity.staff = u.loginname
                    WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
                    GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 15
                `).catch(() => []),
                // Active IPD Support Staff
                dbQuery(`
                    SELECT u.loginname, u.name,
                        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
                        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
                        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
                        COUNT(*) as total_count
                    FROM (
                        SELECT staff, entry_datetime as activity_time FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
                        UNION ALL
                        SELECT doctor as staff, order_date as activity_time FROM doctor_order WHERE DATE(order_date) = CURDATE()
                    ) as activity
                    JOIN opduser u ON activity.staff = u.loginname
                    WHERE u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
                        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
                        AND u.loginname != 'kiosk'
                    GROUP BY u.loginname, u.name ORDER BY total_count DESC LIMIT 10
                `).catch(() => [])
            ])
        ]);

        // ━━ Process combined results ━━

        // Extract staff activity results
        const [activeDoctors, activeNurses, activeStaff] = staffActivity;

        // Calculate metrics from combined data
        const totalBeds = 120; // Fallback - should be from ward table

        // Bed Turnover Rate
        const discharged = Number(summaryStats?.discharged_30d || 0);
        const turnoverRate = Math.round((discharged / totalBeds) * 10) / 10;

        // ALOS Variance %
        const actualALOS = Number(summaryStats?.actual_alos || 0);
        const benchmarkALOS = Number(summaryStats?.benchmark_alos || 0);
        const alosVariancePct = benchmarkALOS > 0
            ? Math.round(((actualALOS - benchmarkALOS) / benchmarkALOS) * 100 * 10) / 10
            : 0;

        // Revenue per Bed-Day
        const totalRevenue = Number(summaryStats?.total_revenue || 0);
        const totalBedDays = Number(summaryStats?.total_bed_days || 0);
        const revPerBedDay = totalBedDays > 0 ? Math.round(totalRevenue / totalBedDays) : 0;

        // Readmission Rate
        const readmitCount = Number(qualityMetrics?.readmit_count || 0);
        const totalDischarges = Number(qualityMetrics?.total_discharges || 0);
        const readmitRate = totalDischarges > 0 ? Math.round((readmitCount / totalDischarges) * 100 * 10) / 10 : 0;

        // CMI
        const cmi = Number(qualityMetrics?.cmi || 0);
        const cmiStddev = Number(qualityMetrics?.cmi_stddev || 0);
        const cmiCases = Number(qualityMetrics?.cmi_cases || 0);

        // Discharge Planning
        const totalDch = Number(qualityMetrics?.total_dch || 0);
        const beforeNoon = Number(qualityMetrics?.before_noon || 0);
        const beforeNoonPct = totalDch > 0 ? Math.round((beforeNoon / totalDch) * 100 * 10) / 10 : 0;

        // Mortality Rate
        const deaths = Number(qualityMetrics?.deaths || 0);
        const mortalityRate = totalDch > 0 ? Math.round((deaths / totalDch) * 100 * 10) / 10 : 0;

        // Current Acuity
        const currentAcuity = Number(acuityRevenue?.current_acuity || 0);
        const highAcuity = Number(acuityRevenue?.high_acuity || 0);

        // Revenue per Discharge
        const totalDchRev = Number(acuityRevenue?.total_dch_rev || 0);
        const totalRevenueRev = Number(acuityRevenue?.total_revenue_rev || 0);
        const revPerDisch = totalDchRev > 0 ? Math.round(totalRevenueRev / totalDchRev) : 0;

        // ━━ WEI v2 (Ward Efficiency Index — Enhanced) ━━
        const turnoverScore = Math.min(100, Math.round((turnoverRate / 4) * 100));
        const alosScore = Math.max(0, Math.round(100 - Math.abs(alosVariancePct)));
        const overstayCount = Number(overstay?.overstay_count || 0);
        const totalCurrent = Number(overstay?.total_current || 0);
        const overstayPct = totalCurrent > 0 ? Math.round((overstayCount / totalCurrent) * 100 * 10) / 10 : 0;
        const overstayScore = Math.max(0, Math.round(100 - overstayPct * 3));
        const cmiScore = Math.min(100, Math.round(cmi * 80));
        const dischPlanScore = Math.min(100, Math.round(beforeNoonPct));
        const readmitScore = Math.max(0, Math.round(100 - readmitRate * 5));
        const wei = Math.round(
            (turnoverScore * 0.25) + (alosScore * 0.20) + (overstayScore * 0.15) +
            (cmiScore * 0.20) + (dischPlanScore * 0.10) + (readmitScore * 0.10)
        );

        // Build response
        res.json({
            data_source: 'HOSxP XE',
            // Flat fields for frontend compatibility
            bed_turnover_rate: turnoverRate,
            discharged_30d: discharged,
            actual_alos: actualALOS,
            benchmark_alos: benchmarkALOS,
            alos_variance_pct: alosVariancePct,
            rev_per_bed_day: revPerBedDay,
            overstay_count: overstayCount,
            avg_excess_days: Number(overstay?.avg_excess_days || 0),
            overstay_pct: overstayPct,
            male: Number(genderAge?.male || 0),
            female: Number(genderAge?.female || 0),
            avg_age: Number(genderAge?.avg_age || 0),
            elderly: Number(genderAge?.elderly || 0),
            pediatric: Number(genderAge?.pediatric || 0),
            readmit_count: readmitCount,
            readmit_rate: readmitRate,
            cmi,
            cmi_stddev: cmiStddev,
            cmi_cases: cmiCases,
            disch_before_noon_pct: beforeNoonPct,
            disch_before_noon: beforeNoon,
            disch_total: totalDch,
            mortality_rate: mortalityRate,
            deaths_30d: deaths,
            current_acuity: currentAcuity,
            high_acuity_count: highAcuity,
            rev_per_discharge: revPerDisch,
            wei,
            wei_components: { turnover: turnoverScore, alos: alosScore, overstay: overstayScore, cmi: cmiScore, disch_plan: dischPlanScore, readmit: readmitScore },
            admission_trend: admTrend || [],
            summary: {
                bed_turnover_rate: turnoverRate,
                alos_variance_pct: alosVariancePct,
                revenue_per_bed_day: revPerBedDay,
                readmission_rate_30d: readmitRate,
                case_mix_index: cmi,
                discharge_planning_compliance: beforeNoonPct,
                mortality_rate: mortalityRate,
                current_avg_acuity: currentAcuity,
                revenue_per_discharge: revPerDisch,
                wei,
                wei_components: { turnover: turnoverScore, alos: alosScore, overstay: overstayScore, cmi: cmiScore, disch_plan: dischPlanScore, readmit: readmitScore },
            },
            trends: {
                admission_7day: admTrend || [],
                gender_distribution: {
                    male: genderAge?.male || 0,
                    female: genderAge?.female || 0,
                    avg_age: genderAge?.avg_age || 0,
                    elderly: genderAge?.elderly || 0,
                    pediatric: genderAge?.pediatric || 0
                },
                overstay_analysis: {
                    count: overstay?.overstay_count || 0,
                    avg_excess_days: overstay?.avg_excess_days || 0,
                    total_current: overstay?.total_current || 0
                }
            },
            quality_indicators: {
                cmi_stats: { cmi, stddev: cmiStddev, cases: cmiCases },
                acuity_breakdown: { high_acuity: highAcuity, total_with_acuity: acuityRevenue?.total_with_acuity || 0 }
            },
            staff_activity: {
                doctors: activeDoctors || [],
                nurses: activeNurses || [],
                support_staff: activeStaff || []
            },
            metadata: {
                last_updated: new Date().toISOString(),
                cache_strategy: 'stale-while-revalidate',
                query_optimization: 'combined subqueries'
            }
        });
    } catch (err) {
        logger.error('IPD Analytics error:', err);
        safeError(res, err, 'IPD');
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
            WHERE i.dchdate BETWEEN ? AND LEAST(?, CURDATE())
              AND i.dchdate IS NOT NULL
              AND a.income > 0
              AND i.ward != ?
            GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
            ORDER BY yr, mo
        `, [globalStart, globalEnd, HOME_WARD]);

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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
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
        safeError(res, err, 'IPD');
    }
});

// ============================================================
// Discharge Planning Board — ผู้ป่วยที่คาดว่าจำหน่ายวันนี้/พรุ่งนี้
// คาดการณ์จาก: LOS ปัจจุบัน >= ALOS เฉลี่ย (HOSxP ไม่มี RW ตอน admit)
// Cache 5 นาที
// ============================================================
router.get('/discharge-planning', cacheMiddleware(300), async (req, res) => {
    try {
        // Step 1: Get overall ALOS as expected LOS baseline
        const alosRow = await dbQueryOne(`
            SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as avg_los
            FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND dchdate IS NOT NULL AND ward != ?
              AND DATEDIFF(dchdate, regdate) BETWEEN 0 AND 60
        `, [HOME_WARD]);
        const expectedLOS = Number(alosRow?.avg_los || 4);

        // Step 2: Find patients whose LOS >= expected (ready for discharge)
        const patients = await dbQuery(`
            SELECT
                i.an, i.hn,
                CONCAT(p.fname, ' ', p.lname) as patient_name,
                TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age,
                p.sex,
                w.name as ward_name,
                i.ward,
                i.regdate,
                DATEDIFF(CURDATE(), i.regdate) as current_los,
                ? as expected_los,
                DATE_ADD(i.regdate, INTERVAL ? DAY) as expected_discharge,
                DATEDIFF(DATE_ADD(i.regdate, INTERVAL ? DAY), CURDATE()) as days_until_discharge,
                COALESCE(a.rw, 0) as rw,
                d.icd10 as main_diag,
                COALESCE(u.name, i.admdoctor) as doctor_name,
                CASE
                    WHEN DATEDIFF(CURDATE(), i.regdate) >= ? THEN 'today'
                    WHEN DATEDIFF(CURDATE(), i.regdate) >= ? THEN 'tomorrow'
                    ELSE 'upcoming'
                END as discharge_window
            FROM ipt i
            JOIN patient p ON i.hn = p.hn
            LEFT JOIN an_stat a ON i.an = a.an
            LEFT JOIN ward w ON i.ward = w.ward
            LEFT JOIN iptdiag d ON i.an = d.an AND d.diagtype = 1
            LEFT JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
            WHERE i.dchdate IS NULL
              AND i.ward != ?
              AND DATEDIFF(CURDATE(), i.regdate) >= ?
            ORDER BY current_los DESC
            LIMIT 60
        `, [expectedLOS, expectedLOS, expectedLOS, expectedLOS, expectedLOS - 1, HOME_WARD, Math.max(expectedLOS - 1, 1)]);

        const today = patients.filter(p => p.discharge_window === 'today');
        const tomorrow = patients.filter(p => p.discharge_window === 'tomorrow');

        res.json({
            data_source: `HOSxP XE · ALOS-based (expected ${expectedLOS}d)`,
            today_count: today.length,
            tomorrow_count: tomorrow.length,
            total: patients.length,
            expected_los: expectedLOS,
            patients: patients.map(p => ({
                ...p,
                patient_name: maskPatientData(p, req.user?.role || 'director').patient_name ?? p.patient_name,
            })),
        });
    } catch (err) {
        logger.error('Discharge planning error', { error: err.message });
        safeError(res, err, 'IPD');
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
                  AND i.ward != ?
                GROUP BY i.ward, w.shortname, DATE(i.regdate)
                ORDER BY i.ward, DATE(i.regdate)
            `, [HOME_WARD]),
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
                  AND i.ward != ?
                GROUP BY i.ward, w.shortname, DATE(i.dchdate)
                ORDER BY i.ward, DATE(i.dchdate)
            `, [HOME_WARD]),
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
        safeError(res, err, 'IPD');
    }
});

// ============================================================
// Undiagnosed on Day-1 Admission (IPD patients admitted without PDX)
// ============================================================
router.get('/undiagnosed-day1', cacheMiddleware(60), async (req, res) => {
    try {
        // Find currently-admitted patients who are on Day 0-1 of admission
        // AND have no Principal Diagnosis (iptdiag.diagtype = 1) recorded
        const patients = await dbQuery(`
            SELECT
                i.an,
                i.hn,
                COALESCE(CONCAT(p.pname, p.fname, ' ', p.lname), i.an) AS name,
                p.sex,
                TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) AS age,
                i.regdate,
                i.regtime,
                TIMESTAMPDIFF(HOUR, CONCAT(i.regdate, ' ', COALESCE(i.regtime, '00:00:00')), NOW()) AS hours_since_admit,
                i.ward AS ward_id,
                w.name AS ward_name,
                COALESCE(u.name, i.admdoctor) AS admit_doctor,
                (SELECT COUNT(*) FROM iptdiag d2 WHERE d2.an = i.an) AS diag_count,
                (SELECT COUNT(*) FROM iptdiag d3 WHERE d3.an = i.an AND d3.diagtype = 1) AS pdx_count
            FROM ipt i
            LEFT JOIN patient p ON i.hn = p.hn
            LEFT JOIN ward w ON i.ward = w.ward
            LEFT JOIN opduser u ON i.admdoctor = u.doctorcode OR i.admdoctor = u.loginname
            WHERE i.dchdate IS NULL
              AND DATEDIFF(CURDATE(), i.regdate) <= 1
              AND i.ward != 'HWS'
              AND NOT EXISTS (
                  SELECT 1 FROM iptdiag d
                  WHERE d.an = i.an AND d.diagtype = 1
              )
            ORDER BY i.regdate DESC, i.regtime DESC
            LIMIT 200
        `);

        // Summary by ward
        const byWard = {};
        for (const p of patients) {
            const key = p.ward_name || p.ward_id || 'Unknown';
            byWard[key] = (byWard[key] || 0) + 1;
        }
        const wardSummary = Object.entries(byWard)
            .map(([ward, count]) => ({ ward, count }))
            .sort((a, b) => b.count - a.count);

        // Total currently-admitted for context (denominator)
        const [totalActive] = await dbQuery(`
            SELECT COUNT(*) AS total
            FROM ipt i
            WHERE i.dchdate IS NULL AND i.ward != 'HWS'
              AND DATEDIFF(CURDATE(), i.regdate) <= 1
        `).catch(() => [{ total: 0 }]);

        const total = Number(totalActive?.total || 0);
        const undiagnosed = patients.length;
        const pct = total > 0 ? Math.round((undiagnosed / total) * 100) : 0;

        res.json({
            data_source: 'HOSxP XE · ipt + iptdiag (Day-1 Admission without Principal Diagnosis)',
            as_of: new Date().toISOString(),
            total_new_admits: total,
            undiagnosed_count: undiagnosed,
            undiagnosed_pct: pct,
            ward_summary: wardSummary,
            patients: patients.map(p => ({
                an: p.an,
                hn: p.hn,
                name: p.name,
                sex: p.sex,
                age: p.age,
                regdate: p.regdate,
                regtime: p.regtime,
                hours_since_admit: Number(p.hours_since_admit || 0),
                ward_name: p.ward_name || p.ward_id,
                admit_doctor: p.admit_doctor || 'N/A',
                diag_count: Number(p.diag_count || 0),
                pdx_count: Number(p.pdx_count || 0),
            })),
        });
    } catch (err) {
        logger.error('Undiagnosed day-1 error', { error: err.message });
        safeError(res, err, 'IPD');
    }
});

export default router;

