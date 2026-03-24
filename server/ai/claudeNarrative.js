// ============================================================
// BCH 360° Intelligence V.10 — Claude AI Narrative Engine
// ใช้ claude-sonnet-4-6 วิเคราะห์ข้อมูลการเงินและสร้างรายงาน
// ============================================================
import Anthropic from '@anthropic-ai/sdk';
import logger from '../logger.js';

const client = process.env.ANTHROPIC_API_KEY
    ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    : null;

const MODEL = 'claude-sonnet-4-6';
const TIMEOUT_MS = 15000;

/**
 * เรียก Claude API พร้อม timeout และ fallback
 */
async function callClaude(systemPrompt, userPrompt, maxTokens = 800) {
    if (!client) {
        logger.warn('[claudeNarrative] ANTHROPIC_API_KEY not set — using rule-based fallback');
        return null;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const msg = await client.messages.create({
            model: MODEL,
            max_tokens: maxTokens,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
        }, { signal: controller.signal });
        return msg.content?.[0]?.text ?? null;
    } catch (err) {
        if (err.name === 'AbortError') {
            logger.warn('[claudeNarrative] Claude API timeout after 15s');
        } else {
            logger.error('[claudeNarrative] Claude API error', { message: err.message });
        }
        return null;
    } finally {
        clearTimeout(timer);
    }
}

// ─── Revenue Forecast Narrative ──────────────────────────────
/**
 * สร้างรายงานภาษาไทยสำหรับ Revenue Forecast
 * @param {object} forecastResult - ผลลัพธ์จาก forecastRevenue()
 * @returns {object} { headline, trend_analysis, seasonal_insight, risks, recommendations, model_note }
 */
export async function generateRevenueForecastNarrative(forecastResult) {
    const { summary, forecast, seasonal_index } = forecastResult;

    // ── Rule-based fallback (เสมอ) ──
    const fallback = buildForecastFallback(summary, forecast, seasonal_index);

    const systemPrompt = `คุณคือนักวิเคราะห์การเงินโรงพยาบาลชุมชน (Community Hospital) ของไทย
มีความเชี่ยวชาญด้าน Revenue Cycle Management, DRG, สิทธิการรักษา (UC/CSMBS/SSO)
และระบบงบประมาณสาธารณสุขไทย (PPFS, Global Budget)
ตอบเป็นภาษาไทยเสมอ กระชับ เข้าใจง่าย ไม่เกิน 5 ประโยคต่อหัวข้อ
ห้ามประดิษฐ์ตัวเลขที่ไม่มีใน input`;

    const months = (forecast || []).map(f =>
        `${f.month_name} ${f.year}: ฿${(f.forecast / 1e6).toFixed(2)}M (${f.lower / 1e6 >= 0 ? '฿' + (f.lower / 1e6).toFixed(2) + 'M' : '฿0'}–฿${(f.upper / 1e6).toFixed(2)}M CI)`
    ).join('\n');

    const peakMonth = seasonal_index
        ? Object.entries(seasonal_index).sort((a, b) => b[1] - a[1])[0]
        : null;
    const lowMonth = seasonal_index
        ? Object.entries(seasonal_index).sort((a, b) => a[1] - b[1])[0]
        : null;
    const thMonths = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const userPrompt = `ข้อมูล Revenue Forecast โรงพยาบาล BCH (3 เดือนล่วงหน้า):

แนวโน้ม: ${summary?.trend_direction === 'increasing' ? '📈 เพิ่มขึ้น' : '📉 ลดลง'}
YoY Growth คาดการณ์: ${summary?.yoy_growth ?? 0}%
เดือนที่รายได้สูงสุด (Seasonal Peak): ${peakMonth ? thMonths[parseInt(peakMonth[0])] + ` (index: ${Number(peakMonth[1]).toFixed(2)})` : '—'}
เดือนที่รายได้ต่ำสุด (Seasonal Low): ${lowMonth ? thMonths[parseInt(lowMonth[0])] + ` (index: ${Number(lowMonth[1]).toFixed(2)})` : '—'}

พยากรณ์รายเดือน (Holt-Winters + Seasonality):
${months}

รวม 3 เดือน: ฿${((summary?.total_forecast ?? 0) / 1e6).toFixed(2)}M
เฉลี่ยต่อเดือน: ฿${((summary?.avg_monthly_forecast ?? 0) / 1e6).toFixed(2)}M

วิเคราะห์และให้คำแนะนำในรูปแบบ JSON ดังนี้:
{
  "headline": "สรุปภาพรวมใน 1 ประโยค",
  "trend_analysis": "วิเคราะห์แนวโน้มรายได้ 2-3 ประโยค",
  "seasonal_insight": "อธิบาย seasonal pattern ที่สำคัญ 2 ประโยค",
  "risks": ["ความเสี่ยง 1", "ความเสี่ยง 2", "ความเสี่ยง 3"],
  "recommendations": ["คำแนะนำ 1", "คำแนะนำ 2", "คำแนะนำ 3"],
  "model_note": "หมายเหตุเกี่ยวกับโมเดล 1 ประโยค"
}`;

    const raw = await callClaude(systemPrompt, userPrompt, 1000);
    if (!raw) return fallback;

    try {
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) return { ...JSON.parse(match[0]), _source: 'claude' };
    } catch {
        logger.warn('[claudeNarrative] Failed to parse Claude JSON response');
    }
    return { ...fallback, _source: 'fallback' };
}

// ─── DRG Leakage Narrative ───────────────────────────────────
/**
 * สร้างรายงาน DRG Undercoding Analysis
 * @param {object} leakageData - ผลจาก DRG leakage queries
 * @returns {object} { headline, top_issues, impact_analysis, action_plan, priority_wards }
 */
export async function generateDRGLeakageNarrative(leakageData) {
    const { total_estimated_loss, no_cc_mcc_count, low_rw_count, total_cases, by_ward } = leakageData;

    const fallback = buildDRGFallback(leakageData);

    const systemPrompt = `คุณคือผู้เชี่ยวชาญ DRG Coding และ Revenue Cycle ของโรงพยาบาลไทย
มีความรู้ ICD-10-TM, DRG Thailand, CC/MCC (Complication/Comorbidity)
และ NHSO reimbursement policy
ตอบเป็นภาษาไทย กระชับ เน้นประเด็นที่ส่งผลต่อรายได้จริง`;

    const wardList = (by_ward || []).slice(0, 5).map(w =>
        `${w.ward}: ${w.case_count} เคส, ประมาณ RW หายไป ${Number(w.estimated_rw_loss || 0).toFixed(1)}`
    ).join('\n');

    const userPrompt = `ข้อมูล DRG Revenue Leakage โรงพยาบาล BCH (30 วันล่าสุด):

เคสทั้งหมดที่วิเคราะห์: ${total_cases} เคส
เคสที่ไม่มี CC/MCC (น่าจะ undercode): ${no_cc_mcc_count} เคส
เคสที่ adjRW ต่ำเทียบกับ LOS: ${low_rw_count} เคส
มูลค่ารายได้ที่ประเมินว่าหายไป: ฿${((total_estimated_loss || 0) / 1e6).toFixed(2)}M

Ward ที่มีปัญหามากที่สุด:
${wardList || 'ไม่มีข้อมูล'}

วิเคราะห์และให้แผนปฏิบัติในรูปแบบ JSON:
{
  "headline": "สรุปสถานการณ์ใน 1 ประโยค",
  "top_issues": ["ปัญหาหลัก 1", "ปัญหาหลัก 2", "ปัญหาหลัก 3"],
  "impact_analysis": "วิเคราะห์ผลกระทบทางการเงิน 2-3 ประโยค",
  "action_plan": ["แผนปฏิบัติ 1 (ระยะสั้น)", "แผนปฏิบัติ 2 (ระยะกลาง)", "แผนปฏิบัติ 3 (ระยะยาว)"],
  "priority_wards": "Ward ที่ต้องดำเนินการก่อน"
}`;

    const raw = await callClaude(systemPrompt, userPrompt, 900);
    if (!raw) return fallback;

    try {
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) return { ...JSON.parse(match[0]), _source: 'claude' };
    } catch {
        logger.warn('[claudeNarrative] Failed to parse DRG narrative JSON');
    }
    return { ...fallback, _source: 'fallback' };
}

// ─── Rule-based fallbacks ─────────────────────────────────────
function buildForecastFallback(summary, forecast, seasonal_index) {
    const dir = summary?.trend_direction === 'increasing' ? 'เพิ่มขึ้น' : 'ลดลง';
    const yoy = summary?.yoy_growth ?? 0;
    const peak = forecast?.reduce((m, f) => f.forecast > (m?.forecast ?? 0) ? f : m, null);
    const thM = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    // Seasonal: find high/low months from index
    const siEntries = seasonal_index ? Object.entries(seasonal_index).sort((a, b) => b[1] - a[1]) : [];
    const peakSeasonMonth = siEntries.length > 0 ? thM[parseInt(siEntries[0][0])] : '—';
    const lowSeasonMonth = siEntries.length > 0 ? thM[parseInt(siEntries[siEntries.length - 1][0])] : '—';

    return {
        headline: `แนวโน้มรายได้ ${dir} ${Math.abs(yoy)}% เมื่อเทียบกับช่วงเดียวกันปีก่อน`,
        trend_analysis: `รายได้มีแนวโน้ม${dir}ต่อเนื่อง ตามโมเดล Holt-Winters ที่วิเคราะห์ข้อมูลย้อนหลัง 3 ปี${yoy >= 0 ? ' สัญญาณบวกจากอัตราการเข้ารับบริการที่เพิ่มขึ้น' : ' ควรตรวจสอบสาเหตุรายได้ที่ลดลง'}`,
        seasonal_insight: `เดือนที่รายได้สูงที่สุดตามฤดูกาล: ${peakSeasonMonth} | เดือนที่รายได้ต่ำสุด: ${lowSeasonMonth} ซึ่งสอดคล้องกับ pattern การใช้บริการโรงพยาบาลชุมชนในภาคตะวันออก`,
        risks: [
            'ความไม่แน่นอนของ Global Budget จาก สปสช.',
            'ผลกระทบจากโรคระบาดตามฤดูกาล (ไข้เลือดออก/ไข้หวัดใหญ่)',
            'การเปลี่ยนแปลงนโยบาย DRG อาจกระทบ RW',
        ],
        recommendations: [
            'เพิ่ม Service Mix ด้าน IPD ในช่วง High Season เพื่อ maximize RW',
            `วางแผนงบประมาณเผื่อสำหรับเดือน ${lowSeasonMonth} ที่รายได้ต่ำ`,
            'ติดตาม Claim Submission ให้ครบก่อนสิ้นเดือนเพื่อรักษา Cash Flow',
        ],
        model_note: 'พยากรณ์ด้วย Holt-Winters Double Exponential Smoothing + Multiplicative Seasonality จากข้อมูล vn_stat 3 ปี',
        _source: 'fallback',
    };
}

function buildDRGFallback(data) {
    const { total_estimated_loss, no_cc_mcc_count, low_rw_count, by_ward } = data;
    const topWard = by_ward?.[0]?.ward ?? '—';
    return {
        headline: `พบมูลค่ารายได้ที่อาจหายไปจาก DRG Undercoding ประมาณ ฿${((total_estimated_loss || 0) / 1e6).toFixed(2)}M`,
        top_issues: [
            `${no_cc_mcc_count} เคสที่ไม่มีการบันทึก CC/MCC ทั้งที่น่าจะมี`,
            `${low_rw_count} เคสที่ adjRW ต่ำมากเมื่อเทียบกับ LOS`,
            `Ward ${topWard} มีจำนวนเคส Undercoding สูงที่สุด`,
        ],
        impact_analysis: `การไม่บันทึก CC/MCC ทำให้ DRG Weight ลดลงเฉลี่ย 0.3-0.8 RW ต่อ case ส่งผลให้รายได้ที่ควรได้รับจาก NHSO หายไป ควรเร่ง Audit Coding Quality โดยเฉพาะในหอผู้ป่วยที่มีเคสซับซ้อน`,
        action_plan: [
            'ทบทวน 30 เคสที่ adjRW ต่ำที่สุดและ LOS นานที่สุดทันที',
            'จัดอบรม Coder เรื่อง CC/MCC Recognition ใน ICD-10-TM',
            'ติดตั้ง DRG Coding Alert ใน HOSxP เพื่อเตือน Coder แบบ Real-time',
        ],
        priority_wards: topWard,
        _source: 'fallback',
    };
}
