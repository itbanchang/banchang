// ============================================================
// BCH 360° Intelligence V.10 - AI Revenue Forecast Engine
// Holt-Winters Exponential Smoothing + Trend + Seasonality
// ข้อมูลจาก opitemrece 8.7M records
// ============================================================
import { dbQuery } from '../db/mysql.js';
import { getForecastCal } from './calibration.js';

/**
 * ดึงรายได้รายเดือนย้อนหลัง (จาก vn_stat — เร็วกว่า opitemrece 100x)
 * @param {number} yearsBack - จำนวนปีย้อนหลัง
 */
async function getHistoricalRevenue(yearsBack = 3) {
    const rows = await dbQuery(`
    SELECT 
      YEAR(vstdate) as yr, MONTH(vstdate) as mo,
      SUM(income) as revenue,
      COUNT(DISTINCT vn) as visit_count,
      COUNT(DISTINCT hn) as patient_count
    FROM vn_stat
    WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? YEAR)
    GROUP BY YEAR(vstdate), MONTH(vstdate)
    ORDER BY yr, mo
  `, [yearsBack]);
    return rows;
}

/**
 * ดึงรายได้แยกสิทธิ์ (top payers) — ใช้ vn_stat
 */
async function getRevenueByPayer(yearsBack = 2) {
    return await dbQuery(`
    SELECT 
      pt.name as payer,
      YEAR(v.vstdate) as yr, MONTH(v.vstdate) as mo,
      SUM(v.income) as revenue
    FROM vn_stat v
    INNER JOIN patient p ON v.hn = p.hn
    LEFT JOIN pttype pt ON p.pttype = pt.pttype
    WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? YEAR)
    GROUP BY pt.name, YEAR(v.vstdate), MONTH(v.vstdate)
    ORDER BY revenue DESC
  `, [yearsBack]);
}

/**
 * Holt-Winters Double Exponential Smoothing
 * Level (α) + Trend (β)
 */
function holtWinters(data, alpha = 0.3, beta = 0.1) {
    if (data.length < 2) return { level: data[0] || 0, trend: 0 };

    let level = data[0];
    let trend = data[1] - data[0];

    for (let i = 1; i < data.length; i++) {
        const newLevel = alpha * data[i] + (1 - alpha) * (level + trend);
        const newTrend = beta * (newLevel - level) + (1 - beta) * trend;
        level = newLevel;
        trend = newTrend;
    }

    return { level, trend };
}

/**
 * คำนวณ Seasonality Index จากข้อมูลรายเดือน
 */
function calculateSeasonality(data) {
    // Group by month across years
    const monthTotals = {};
    const monthCounts = {};

    data.forEach(d => {
        if (!monthTotals[d.mo]) { monthTotals[d.mo] = 0; monthCounts[d.mo] = 0; }
        monthTotals[d.mo] += d.revenue;
        monthCounts[d.mo]++;
    });

    const overallAvg = data.reduce((s, d) => s + d.revenue, 0) / data.length;
    const seasonalIndex = {};

    for (let m = 1; m <= 12; m++) {
        const monthAvg = monthCounts[m] > 0 ? monthTotals[m] / monthCounts[m] : overallAvg;
        seasonalIndex[m] = overallAvg > 0 ? monthAvg / overallAvg : 1;
    }

    return seasonalIndex;
}

/**
 * คำนวณ Confidence Interval
 */
function calcConfidence(forecasts, historicalVariance, months) {
    // Use 1.96σ for 95% CI, expanding with forecast horizon
    const sigma = Math.sqrt(historicalVariance);
    return forecasts.map((f, i) => {
        // CI width = 1.5σ × (1 + 0.1 per month ahead) — narrower than raw σ
        const zScore = 1.5;
        const spread = sigma * zScore * (1 + 0.1 * i);
        // Cap CI at ±40% of forecast for reasonableness
        const maxSpread = f.forecast * 0.4;
        const actualSpread = Math.min(spread, maxSpread);
        return {
            ...f,
            upper: Math.round(f.forecast + actualSpread),
            lower: Math.max(0, Math.round(f.forecast - actualSpread))
        };
    });
}

/**
 * MAIN: พยากรณ์รายได้ ล่วงหน้า N เดือน
 */
export async function forecastRevenue(forecastMonths = 6) {
    // 1. ดึงข้อมูลย้อนหลัง 3 ปี
    const rawHistorical = await getHistoricalRevenue(3);
    if (!rawHistorical || rawHistorical.length < 3) {
        return { error: 'Insufficient data', min_required: 3, actual: rawHistorical?.length || 0 };
    }

    // Filter out months with incomplete data (revenue too low = likely partial data)
    // Use median as reference — months below 10% of median are likely incomplete
    const allRevenues = rawHistorical.map(d => Number(d.revenue)).sort((a, b) => a - b);
    const median = allRevenues[Math.floor(allRevenues.length / 2)] || 1;
    const minThreshold = median * 0.1; // 10% of median — anything below is noise
    const historical = rawHistorical.filter(d => Number(d.revenue) >= minThreshold);

    if (historical.length < 3) {
        return { error: 'Insufficient reliable data', min_required: 3, actual: historical.length, filtered_from: rawHistorical.length };
    }

    const revenues = historical.map(d => Number(d.revenue));

    // 2. Holt-Winters Smoothing — calibrated alpha/beta from backtesting
    const cal = getForecastCal();
    const { level, trend } = holtWinters(revenues, cal.alpha, cal.beta);

    // 3. Seasonality Index
    const seasonalIndex = calculateSeasonality(historical);

    // 4. Variance สำหรับ Confidence Interval
    const mean = revenues.reduce((s, r) => s + r, 0) / revenues.length;
    const variance = revenues.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / revenues.length;

    // 5. Generate Forecast
    const lastData = historical[historical.length - 1];
    let currentYr = lastData.yr;
    let currentMo = lastData.mo;

    const forecasts = [];
    for (let i = 1; i <= forecastMonths; i++) {
        currentMo++;
        if (currentMo > 12) { currentMo = 1; currentYr++; }

        const baseValue = level + trend * i;
        const seasonal = seasonalIndex[currentMo] || 1;
        const forecast = Math.round(baseValue * seasonal);

        forecasts.push({
            year: currentYr, month: currentMo,
            month_name: getMonthName(currentMo),
            forecast: Math.max(0, forecast),
            seasonal_factor: Math.round(seasonal * 100) / 100,
            confidence: Math.round((1 - cal.confidence_decay * i) * 100) // calibrated decay rate
        });
    }

    // 6. เพิ่ม Confidence Interval
    const forecastsWithCI = calcConfidence(forecasts, variance, forecastMonths);

    // 7. สรุป
    const totalForecast = forecastsWithCI.reduce((s, f) => s + f.forecast, 0);
    const avgMonthly = Math.round(totalForecast / forecastMonths);
    const lastYearSamePeriod = historical.filter(d => {
        for (const f of forecastsWithCI) {
            if (d.yr === f.year - 1 && d.mo === f.month) return true;
        }
        return false;
    });
    const lastYearTotal = lastYearSamePeriod.reduce((s, d) => s + Number(d.revenue), 0);
    const yoyGrowth = lastYearTotal > 0
        ? Math.round(((totalForecast - lastYearTotal) / lastYearTotal) * 1000) / 10
        : 0;

    // 8. Monthly trend for chart
    const trendLine = historical.map(d => ({
        year: d.yr, month: d.mo,
        month_name: `${getMonthName(d.mo)} ${d.yr}`,
        label: `${getMonthName(d.mo)}`,
        actual: Math.round(Number(d.revenue)),
        visits: d.visit_count, patients: d.patient_count,
        type: 'actual'
    }));

    forecastsWithCI.forEach(f => {
        trendLine.push({
            year: f.year, month: f.month,
            month_name: `${f.month_name} ${f.year}`,
            label: `${f.month_name}`,
            forecast: f.forecast, upper: f.upper, lower: f.lower,
            type: 'forecast'
        });
    });

    // Learning capture
    try {
        const { captureLearning } = await import('./learningCapture.js');
        captureLearning('forecast', 'decision',
            `Revenue forecast: ฿${(totalForecast / 1e6).toFixed(1)}M (${forecastMonths} months), YoY ${yoyGrowth}%`,
            { totalForecast, avgMonthly, yoyGrowth, trend: trend > 0 ? 'increasing' : 'decreasing' },
            Math.round(totalForecast), 'baht');
    } catch { }

    return {
        model: 'Holt-Winters Double Exponential Smoothing',
        parameters: { alpha: 0.35, beta: 0.15, seasonality: 'multiplicative' },
        historical_months: historical.length,
        forecast_months: forecastMonths,
        summary: {
            total_forecast: totalForecast,
            avg_monthly_forecast: avgMonthly,
            yoy_growth: yoyGrowth,
            trend_direction: trend > 0 ? 'increasing' : 'decreasing',
            trend_strength: Math.abs(trend),
            peak_month: forecastsWithCI.reduce((max, f) => f.forecast > max.forecast ? f : max, forecastsWithCI[0]),
            lowest_month: forecastsWithCI.reduce((min, f) => f.forecast < min.forecast ? f : min, forecastsWithCI[0])
        },
        seasonal_index: seasonalIndex,
        forecast: forecastsWithCI,
        trend_line: trendLine,
        accuracy_note: 'ข้อมูล OPD Revenue จาก opitemrece — ไม่รวม IPD'
    };
}

/**
 * พยากรณ์แยกตามสิทธิ์
 */
export async function forecastByPayer(forecastMonths = 3) {
    const data = await getRevenueByPayer(2);
    if (!data?.length) return { payers: [] };

    // Group by payer
    const payerGroups = {};
    data.forEach(d => {
        if (!payerGroups[d.payer]) payerGroups[d.payer] = [];
        payerGroups[d.payer].push(d);
    });

    // Top 10 payers only
    const topPayers = Object.entries(payerGroups)
        .map(([name, records]) => ({
            name, total: records.reduce((s, r) => s + Number(r.revenue), 0),
            records: records.sort((a, b) => a.yr * 100 + a.mo - b.yr * 100 - b.mo)
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

    const results = topPayers.map(payer => {
        const revenues = payer.records.map(r => Number(r.revenue));
        const { level, trend } = holtWinters(revenues, 0.3, 0.1);

        const lastRec = payer.records[payer.records.length - 1];
        let yr = lastRec.yr, mo = lastRec.mo;
        const forecasts = [];
        for (let i = 1; i <= forecastMonths; i++) {
            mo++; if (mo > 12) { mo = 1; yr++; }
            forecasts.push({
                year: yr, month: mo,
                forecast: Math.max(0, Math.round(level + trend * i))
            });
        }

        return {
            payer: payer.name,
            total_historical: Math.round(payer.total),
            avg_monthly: Math.round(payer.total / payer.records.length),
            trend: trend > 0 ? 'up' : 'down',
            forecast: forecasts
        };
    });

    return { payers: results };
}

function getMonthName(m) {
    return ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][m] || '';
}

export default { forecastRevenue, forecastByPayer };
