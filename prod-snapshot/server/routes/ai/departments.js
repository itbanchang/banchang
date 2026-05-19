// ============================================================
// BCH 360° Intelligence V.10 — AI Routes: Department Optimization
// OPD, IPD, ER, Finance, NCD, MedRec, Dental, XRAY, Pharmacy,
// Lab, Quality, Customer Segmentation, Thai Med, Phys Therapy
// Drug Safety, Infection, No-Show, Compare, Report
// ============================================================
import { Router } from 'express';
import { cached } from '../../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../../db/mysql.js';
import { safeError } from '../../lib/safeError.js';

const router = Router();

/** Format number Thai locale */
function fmt_n(v) {
  return v != null ? Number(v).toLocaleString('th-TH') : '—';
}

// ── OPD Optimization ─────────────────────────────────────────
router.get(
  '/opd/optimization',
  cached('opdAI', 300000, async () => {
    const [today, waitStats, peakHours, topClinic, weekTrend] = await Promise.allSettled([
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) as visits, COUNT(DISTINCT hn) as patients FROM ovst WHERE vstdate = CURDATE()`
      ),
      dbQueryOne(`SELECT
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, st.service1)), 0) as avg_wait,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, r.bill_time)), 0) as avg_total,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, o.vsttime, st.service1) > 30 THEN 1 ELSE 0 END) as wait_over_30,
        COUNT(*) as total
      FROM ovst o
      LEFT JOIN service_time st ON st.vn = o.vn
      LEFT JOIN rcpt_print r ON r.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.vsttime IS NOT NULL`),
      dbQuery(
        `SELECT HOUR(vsttime) as hr, COUNT(*) as cnt FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND vsttime IS NOT NULL GROUP BY hr ORDER BY cnt DESC LIMIT 3`
      ),
      dbQuery(
        `SELECT k.department, COUNT(o.vn) as visits FROM ovst o LEFT JOIN kskdepartment k ON o.main_dep = k.depcode WHERE o.vstdate = CURDATE() GROUP BY k.department ORDER BY visits DESC LIMIT 5`
      ),
      dbQuery(
        `SELECT vstdate as dt, COUNT(DISTINCT vn) as visits FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY vstdate ORDER BY dt`
      ),
    ]);

    const t = today.status === 'fulfilled' ? today.value : null;
    const w = waitStats.status === 'fulfilled' ? waitStats.value : null;
    const peaks = peakHours.status === 'fulfilled' ? peakHours.value : [];
    const tops = topClinic.status === 'fulfilled' ? topClinic.value : [];
    const week = weekTrend.status === 'fulfilled' ? weekTrend.value : [];

    const avgWait = Number(w?.avg_wait || 0);
    const avgTotal = Number(w?.avg_total || 0);
    const waitOver = Number(w?.wait_over_30 || 0);
    const totalSamples = Number(w?.total || 0);
    const waitOverPct = totalSamples > 0 ? Math.round((waitOver / totalSamples) * 100) : 0;
    const visitsToday = Number(t?.visits || 0);
    const last7avg =
      week.length > 0
        ? Math.round(week.reduce((s, d) => s + Number(d.visits || 0), 0) / week.length)
        : 0;
    const trendPct = last7avg > 0 ? Math.round(((visitsToday - last7avg) / last7avg) * 100) : 0;

    const recs = [];
    if (avgWait > 30)
      recs.push(
        `Wait time เฉลี่ย ${avgWait} นาที (>30 นาที) — เปิด Fast-track / เพิ่มจุดบริการชั่วคราวช่วงเวลาเร่งด่วน`
      );
    else if (avgWait > 0) recs.push(`Wait time เฉลี่ย ${avgWait} นาที — อยู่ในเกณฑ์ดี (<30 นาที)`);
    if (waitOverPct > 30)
      recs.push(`${waitOverPct}% ของผู้ป่วยรอเกิน 30 นาที — ทบทวน Triage และ Patient Flow`);
    if (peaks[0])
      recs.push(
        `Peak hour: ${peaks[0].hr}:00 (${peaks[0].cnt} ราย/วัน) — จัดเจ้าหน้าที่เพิ่มช่วงเวลานี้`
      );
    if (tops[0])
      recs.push(`คลินิกที่มีผู้ป่วยมากสุดวันนี้: ${tops[0].department} (${tops[0].visits} ราย)`);
    if (Math.abs(trendPct) > 20)
      recs.push(
        `Visit วันนี้ ${visitsToday} ราย — ${trendPct >= 0 ? 'สูงกว่า' : 'ต่ำกว่า'}เฉลี่ย 7 วัน ${Math.abs(trendPct)}%`
      );

    return {
      data_source: 'HOSxP XE + OPD AI',
      today_visits: visitsToday,
      today_patients: Number(t?.patients || 0),
      avg_wait_time_min: avgWait,
      avg_total_time_min: avgTotal,
      wait_over_30_pct: waitOverPct,
      peak_hours: peaks.map(p => ({ hour: `${p.hr}:00`, avg_patients: p.cnt })),
      top_clinics: tops,
      week_trend: week,
      recommendations: recs,
      timestamp: new Date().toISOString(),
    };
  })
);

// ── IPD Optimization ─────────────────────────────────────────
router.get(
  '/ipd/optimization',
  cached('ipdAI', 300000, async () => {
    const [census, losStats, wardOcc, readmit, mortality] = await Promise.allSettled([
      dbQueryOne(`SELECT COUNT(*) as active FROM ipt WHERE dchdate IS NULL`),
      dbQueryOne(
        `SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as alos, ROUND(MAX(DATEDIFF(dchdate, regdate)), 0) as max_los, SUM(CASE WHEN DATEDIFF(dchdate, regdate) > 7 THEN 1 ELSE 0 END) as long_stay, COUNT(*) as total FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchdate IS NOT NULL`
      ),
      dbQuery(
        `SELECT w.name as ward, w.bedcount as beds, (SELECT COUNT(*) FROM ipt WHERE ward = w.ward AND dchdate IS NULL) as occupied FROM ward w WHERE w.ward_active = 'Y' ORDER BY w.ward LIMIT 10`
      ),
      dbQueryOne(
        `SELECT COUNT(DISTINCT i2.an) as readmit_30d FROM ipt i1 JOIN ipt i2 ON i1.hn = i2.hn AND i2.regdate > i1.dchdate AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY) AND i2.an != i1.an WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`
      ),
      dbQueryOne(
        `SELECT COUNT(*) as deaths FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchstts = '09'`
      ),
    ]);

    const c = census.status === 'fulfilled' ? Number(census.value?.active || 0) : 0;
    const l = losStats.status === 'fulfilled' ? losStats.value : null;
    const w = wardOcc.status === 'fulfilled' ? wardOcc.value : [];
    const r30 = readmit.status === 'fulfilled' ? Number(readmit.value?.readmit_30d || 0) : 0;
    const d30 = mortality.status === 'fulfilled' ? Number(mortality.value?.deaths || 0) : 0;

    const totalBeds = w.reduce((s, x) => s + Number(x.beds || 0), 0);
    const totalOcc = w.reduce((s, x) => s + Number(x.occupied || 0), 0);
    const occRate = totalBeds > 0 ? Math.round((totalOcc / totalBeds) * 100) : 0;
    const alos = Number(l?.alos || 0);
    const longStay = Number(l?.long_stay || 0);
    const totalDc = Number(l?.total || 0);
    const longStayPct = totalDc > 0 ? Math.round((longStay / totalDc) * 100) : 0;
    const mortRate = totalDc > 0 ? Math.round((d30 / totalDc) * 1000) / 10 : 0;
    const readmitRate = totalDc > 0 ? Math.round((r30 / totalDc) * 1000) / 10 : 0;

    const recs = [];
    if (occRate > 85)
      recs.push(
        `Bed Occupancy ${occRate}% — ใกล้เต็ม เตรียม Surge Capacity Plan / เร่ง D/C เคสที่พร้อม`
      );
    else if (occRate < 50)
      recs.push(`Bed Occupancy ${occRate}% — ต่ำกว่าเกณฑ์ พิจารณาขยายบริการ / Marketing IPD`);
    if (alos > 5)
      recs.push(
        `ALOS ${alos} วัน — สูงเกินเกณฑ์ ทบทวน Discharge Planning + Clinical Pathway Top 5 DRG`
      );
    if (longStayPct > 20)
      recs.push(
        `${longStayPct}% ของ D/C นอน >7 วัน (${longStay} ราย) — สอบสวน Barrier to Discharge`
      );
    if (mortRate > 2)
      recs.push(
        `Mortality Rate ${mortRate}% (${d30} ราย) — สูงเกินเกณฑ์ เร่ง M&M Conference + แยก Preventable`
      );
    if (readmitRate > 10)
      recs.push(
        `30-day Readmission ${readmitRate}% (${r30} ราย) — ทบทวน D/C Education + Follow-up call`
      );
    if (recs.length === 0) recs.push('IPD KPIs อยู่ในเกณฑ์ปกติ — รักษาระดับมาตรฐาน');

    return {
      data_source: 'HOSxP XE + IPD AI',
      active_inpatients: c,
      occupancy_rate: occRate,
      total_beds: totalBeds,
      occupied_beds: totalOcc,
      alos,
      long_stay_pct: longStayPct,
      mortality_30d: d30,
      mortality_rate: mortRate,
      readmission_30d: r30,
      readmission_rate: readmitRate,
      ward_breakdown: w.map(x => ({
        ward: x.ward,
        beds: Number(x.beds || 0),
        occupied: Number(x.occupied || 0),
        pct: x.beds > 0 ? Math.round((x.occupied / x.beds) * 100) : 0,
      })),
      recommendations: recs,
      timestamp: new Date().toISOString(),
    };
  })
);

// ── ER Optimization ──────────────────────────────────────────
router.get(
  '/er/optimization',
  cached('erAIv3_col_fix', 120000, async () => {
    // Phase E — fix wrong column names (er_regist_date/time don't exist;
    // use vstdate + enter_er_time). Was returning 0 silently.
    const [today, hourly, triage, week] = await Promise.allSettled([
      dbQueryOne(`SELECT COUNT(*) as visits FROM er_regist WHERE vstdate = CURDATE()`),
      dbQuery(
        `SELECT HOUR(enter_er_time) as hr, COUNT(*) as cnt FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND enter_er_time IS NOT NULL GROUP BY hr ORDER BY hr`
      ),
      dbQuery(
        `SELECT er_emergency_type as level, COUNT(*) as cnt FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY er_emergency_type ORDER BY cnt DESC`
      ),
      dbQuery(
        `SELECT vstdate as dt, COUNT(*) as cnt FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY vstdate ORDER BY dt`
      ),
    ]);

    const t = today.status === 'fulfilled' ? Number(today.value?.visits || 0) : 0;
    const h = hourly.status === 'fulfilled' ? hourly.value : [];
    const tri = triage.status === 'fulfilled' ? triage.value : [];
    const wk = week.status === 'fulfilled' ? week.value : [];

    const peakHr = h.reduce(
      (b, x) => (Number(x.cnt || 0) > Number(b?.cnt || 0) ? x : b),
      h[0] || { hr: 0, cnt: 0 }
    );
    const avgPerDay =
      wk.length > 0 ? Math.round(wk.reduce((s, d) => s + Number(d.cnt || 0), 0) / wk.length) : 0;
    const trend = avgPerDay > 0 ? Math.round(((t - avgPerDay) / avgPerDay) * 100) : 0;
    const totalTriage = tri.reduce((s, x) => s + Number(x.cnt || 0), 0);
    const critical = tri.find(
      x => x.level === '1' || x.level === 'Resuscitation' || x.level === 'R'
    );
    const criticalPct =
      critical && totalTriage > 0 ? Math.round((Number(critical.cnt) / totalTriage) * 100) : 0;

    const recs = [
      `ER วันนี้ ${t} ราย (${trend >= 0 ? '+' : ''}${trend}% vs เฉลี่ย 7 วัน = ${avgPerDay})`,
    ];
    if (trend > 30)
      recs.push(`Surge Alert! ER เพิ่ม ${trend}% — เปิด Surge Plan / เรียกแพทย์ standby`);
    if (peakHr)
      recs.push(
        `Peak hour: ${peakHr.hr}:00 (เฉลี่ย ${Math.round(Number(peakHr.cnt) / 14)} ราย/ชม.) — เตรียมทีมเวรเสริม`
      );
    if (criticalPct > 15)
      recs.push(
        `Critical/Resuscitation ${criticalPct}% — สูงกว่าค่าเฉลี่ย พิจารณาเพิ่ม Trauma team`
      );
    if (recs.length === 1) recs.push('ER อยู่ในเกณฑ์ปกติ — Monitor surge pattern ทุก 2 ชม.');

    return {
      data_source: 'HOSxP XE + ER AI',
      today_visits: t,
      avg_daily_7d: avgPerDay,
      trend_pct: trend,
      peak_hour: peakHr ? { hour: `${peakHr.hr}:00`, cnt: Number(peakHr.cnt) } : null,
      triage_breakdown: tri.map(x => ({ level: x.level, count: Number(x.cnt || 0) })),
      critical_pct: criticalPct,
      week_trend: wk,
      recommendations: recs,
      timestamp: new Date().toISOString(),
    };
  })
);

// ── Finance Optimization ─────────────────────────────────────
router.get(
  '/finance/optimization',
  cached('financeAI', 300000, async () => {
    const [todayRev, monthRev, prevMonthRev, payerMix, topDept, unbilled] =
      await Promise.allSettled([
        dbQueryOne(`SELECT SUM(income) as rev FROM vn_stat WHERE vstdate = CURDATE()`),
        dbQueryOne(
          `SELECT COALESCE((SELECT SUM(income) FROM vn_stat WHERE vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND vstdate <= CURDATE()), 0) + COALESCE((SELECT SUM(income) FROM an_stat WHERE dchdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND dchdate <= CURDATE()), 0) AS total`
        ),
        dbQueryOne(
          `SELECT COALESCE((SELECT SUM(income) FROM vn_stat WHERE vstdate >= DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 MONTH),'%Y-%m-01') AND vstdate < DATE_FORMAT(CURDATE(),'%Y-%m-01')), 0) + COALESCE((SELECT SUM(income) FROM an_stat WHERE dchdate >= DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 MONTH),'%Y-%m-01') AND dchdate < DATE_FORMAT(CURDATE(),'%Y-%m-01')), 0) AS total`
        ),
        dbQuery(
          `SELECT pt.name as payer, SUM(v.income) as rev, COUNT(*) as cnt FROM vn_stat v LEFT JOIN pttype pt ON v.pttype = pt.pttype WHERE v.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND v.vstdate <= CURDATE() GROUP BY pt.name ORDER BY rev DESC LIMIT 6`
        ),
        dbQuery(
          `SELECT k.department as dept, SUM(v.income) as rev FROM vn_stat v LEFT JOIN ovst o ON v.vn = o.vn LEFT JOIN kskdepartment k ON o.main_dep = k.depcode WHERE v.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND v.vstdate <= CURDATE() GROUP BY k.department ORDER BY rev DESC LIMIT 5`
        ),
        dbQueryOne(
          `SELECT COUNT(DISTINCT vn) as cnt FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND (income = 0 OR income IS NULL)`
        ),
      ]);

    const td = todayRev.status === 'fulfilled' ? Number(todayRev.value?.rev || 0) : 0;
    const mtd = monthRev.status === 'fulfilled' ? Number(monthRev.value?.total || 0) : 0;
    const prev = prevMonthRev.status === 'fulfilled' ? Number(prevMonthRev.value?.total || 0) : 0;
    const mom = prev > 0 ? Math.round(((mtd - prev) / prev) * 100) : 0;
    const pm = payerMix.status === 'fulfilled' ? payerMix.value : [];
    const tdept = topDept.status === 'fulfilled' ? topDept.value : [];
    const ub = unbilled.status === 'fulfilled' ? Number(unbilled.value?.cnt || 0) : 0;
    const totalPayerRev = pm.reduce((s, p) => s + Number(p.rev || 0), 0);
    const topPayer = pm[0]
      ? {
          name: pm[0].payer,
          pct: Math.round((Number(pm[0].rev) / (totalPayerRev || 1)) * 100),
          rev: Number(pm[0].rev || 0),
        }
      : null;

    const recs = [`รายได้ MTD ฿${(mtd / 1e6).toFixed(2)}M (MoM ${mom >= 0 ? '+' : ''}${mom}%)`];
    if (mom < -10)
      recs.push(`รายได้ลด MoM ${mom}% — ตรวจสอบ Under-coding, Refer Out, สิทธิเบิกค้าง`);
    else if (mom > 10)
      recs.push(`รายได้เพิ่ม MoM +${mom}% — แนวโน้มดี ขยายบริการที่สร้างรายได้สูง`);
    if (topPayer && topPayer.pct > 60)
      recs.push(
        `สิทธิ ${topPayer.name} กิน ${topPayer.pct}% ของรายได้ — กระจายความเสี่ยง diversify payer mix`
      );
    if (tdept[0])
      recs.push(`Top Department: ${tdept[0].dept} (฿${(Number(tdept[0].rev) / 1e6).toFixed(2)}M)`);
    if (ub > 100)
      recs.push(
        `${ub} visit ใน 30 วันยังไม่มีรายได้บันทึก — ทบทวน Billing process / Coding completeness`
      );

    return {
      data_source: 'HOSxP XE + Finance AI',
      today_revenue: td,
      mtd_revenue: mtd,
      prev_month_revenue: prev,
      mom_growth_pct: mom,
      payer_mix: pm.map(p => ({
        payer: p.payer,
        revenue: Number(p.rev || 0),
        visits: Number(p.cnt || 0),
      })),
      top_departments: tdept.map(d => ({ dept: d.dept, revenue: Number(d.rev || 0) })),
      unbilled_visits: ub,
      recommendations: recs,
      timestamp: new Date().toISOString(),
    };
  })
);

// ── NCD Optimization ─────────────────────────────────────────
router.get(
  '/ncd/optimization',
  cached('ncdAI', 600000, async () => {
    const [dm, ht, ckd, control, follow] = await Promise.allSettled([
      dbQueryOne(
        `SELECT COUNT(DISTINCT p.hn) as patients FROM patient p JOIN ovstdiag d ON p.hn = (SELECT hn FROM ovst WHERE vn = d.vn LIMIT 1) WHERE d.icd10 LIKE 'E10%' OR d.icd10 LIKE 'E11%' OR d.icd10 LIKE 'E12%' OR d.icd10 LIKE 'E13%' OR d.icd10 LIKE 'E14%'`
      ),
      dbQueryOne(
        `SELECT COUNT(DISTINCT p.hn) as patients FROM patient p JOIN ovstdiag d ON p.hn = (SELECT hn FROM ovst WHERE vn = d.vn LIMIT 1) WHERE d.icd10 LIKE 'I10%' OR d.icd10 LIKE 'I11%' OR d.icd10 LIKE 'I12%' OR d.icd10 LIKE 'I13%' OR d.icd10 LIKE 'I15%'`
      ),
      dbQueryOne(
        `SELECT COUNT(DISTINCT p.hn) as patients FROM patient p JOIN ovstdiag d ON p.hn = (SELECT hn FROM ovst WHERE vn = d.vn LIMIT 1) WHERE d.icd10 LIKE 'N18%'`
      ),
      dbQueryOne(
        `SELECT AVG(CASE WHEN lab_order_result REGEXP '^[0-9.]+$' THEN CAST(lab_order_result AS DECIMAL(10,2)) END) as avg_hba1c, COUNT(*) as tested FROM lab_order WHERE lab_items_name_ref LIKE '%HbA1c%' AND order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)`
      ),
      dbQueryOne(
        `SELECT COUNT(DISTINCT o.hn) as overdue FROM ovst o JOIN ovstdiag d ON d.vn = o.vn WHERE (d.icd10 LIKE 'E1_%' OR d.icd10 LIKE 'I10%') AND o.vstdate < DATE_SUB(CURDATE(), INTERVAL 90 DAY) AND NOT EXISTS (SELECT 1 FROM ovst o2 WHERE o2.hn = o.hn AND o2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY))`
      ),
    ]);

    const dmCount = dm.status === 'fulfilled' ? Number(dm.value?.patients || 0) : 0;
    const htCount = ht.status === 'fulfilled' ? Number(ht.value?.patients || 0) : 0;
    const ckdCount = ckd.status === 'fulfilled' ? Number(ckd.value?.patients || 0) : 0;
    const ctrl = control.status === 'fulfilled' ? control.value : null;
    const avgA1c = Number(ctrl?.avg_hba1c || 0);
    const tested = Number(ctrl?.tested || 0);
    const overdue = follow.status === 'fulfilled' ? Number(follow.value?.overdue || 0) : 0;

    const recs = [
      `ผู้ป่วย NCD ในระบบ: DM ${dmCount.toLocaleString()} · HT ${htCount.toLocaleString()} · CKD ${ckdCount.toLocaleString()}`,
    ];
    if (avgA1c > 0) {
      if (avgA1c > 8)
        recs.push(
          `HbA1c เฉลี่ย ${avgA1c.toFixed(1)}% (จาก ${tested} ราย) — สูงเกินเป้าหมาย <7% เร่ง intensive control / titrate ยา`
        );
      else if (avgA1c > 7)
        recs.push(
          `HbA1c เฉลี่ย ${avgA1c.toFixed(1)}% — ใกล้เป้าหมาย ทบทวน adherence + lifestyle counseling`
        );
      else recs.push(`HbA1c เฉลี่ย ${avgA1c.toFixed(1)}% — ควบคุมได้ดีตามเป้า`);
    }
    if (overdue > 50)
      recs.push(
        `${overdue.toLocaleString()} ราย NCD ขาดนัด >90 วัน — เร่ง outreach team / Telephone reminder`
      );
    if (ckdCount > 100)
      recs.push(
        `CKD ${ckdCount} ราย — ทำ Risk stratification ตาม eGFR + ส่งต่อ Nephrology stage 3b ขึ้นไป`
      );

    return {
      data_source: 'HOSxP XE + NCD AI',
      dm_patients: dmCount,
      ht_patients: htCount,
      ckd_patients: ckdCount,
      avg_hba1c: avgA1c > 0 ? Math.round(avgA1c * 10) / 10 : null,
      hba1c_tested_90d: tested,
      overdue_followup: overdue,
      recommendations: recs,
      timestamp: new Date().toISOString(),
    };
  })
);

// ── MedRec Coding Optimization ───────────────────────────────
router.get(
  '/medrec/optimization',
  cached('medrecAI', 600000, async () => {
    const [coding, missing, topDx, cmi, late] = await Promise.allSettled([
      // FIX: an_stat has no 'adjrw' column. Use ipt + 3-day grace to match /medrec/today page.
      dbQueryOne(
        `SELECT
           SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) THEN 1 ELSE 0 END) as total,
           SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND EXISTS(SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') THEN 1 ELSE 0 END) as coded
         FROM ipt i
         WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL`
      ),
      dbQueryOne(
        `SELECT COUNT(*) as missing FROM ipt i WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL AND NOT EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1')`
      ),
      dbQuery(
        `SELECT d.icd10, ic.name, COUNT(*) as cnt FROM iptdiag d LEFT JOIN icd101 ic ON d.icd10 = ic.code JOIN ipt i ON i.an = d.an WHERE d.diagtype = '1' AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY d.icd10, ic.name ORDER BY cnt DESC LIMIT 5`
      ),
      // FIX: use ipt.adjrw (matches AdjCMI shown on medrec page).
      dbQueryOne(
        `SELECT ROUND(AVG(CASE WHEN adjrw > 0 THEN adjrw END), 2) as cmi, ROUND(SUM(adjrw), 2) as sum_rw FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchdate IS NOT NULL`
      ),
      dbQueryOne(
        `SELECT COUNT(*) as late_coding FROM ipt i WHERE i.dchdate IS NOT NULL AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND DATEDIFF(CURDATE(), i.dchdate) > 14 AND NOT EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1')`
      ),
    ]);

    const c = coding.status === 'fulfilled' ? coding.value : null;
    const total = Number(c?.total || 0);
    const coded = Number(c?.coded || 0);
    const codedPct = total > 0 ? Math.round((coded / total) * 100) : 0;
    const miss = missing.status === 'fulfilled' ? Number(missing.value?.missing || 0) : 0;
    const top = topDx.status === 'fulfilled' ? topDx.value : [];
    const cmiData = cmi.status === 'fulfilled' ? cmi.value : null;
    const cmiVal = Number(cmiData?.cmi || 0);
    const sumRw = Number(cmiData?.sum_rw || 0);
    const lateCoding = late.status === 'fulfilled' ? Number(late.value?.late_coding || 0) : 0;

    const recs = [
      `📊 ภาพรวม 30 วันที่ผ่านมา: ผู้ป่วยใน ${total} ราย · สรุปรหัสโรคเสร็จแล้ว ${coded} ราย (${codedPct}%) · ค่าความซับซ้อนเฉลี่ย ${cmiVal.toFixed(2)} (มาตรฐาน ≥0.80) · มูลค่ารวม ${sumRw.toFixed(2)} หน่วย RW`,
    ];
    if (codedPct < 90)
      recs.push(
        `⚠️ ปัจจุบันสรุปรหัสได้ ${codedPct}% ยังไม่ถึงเป้าหมาย 90% — ควรเร่งทีมและกำหนดเส้นตายให้สรุปเสร็จภายใน 7 วันหลังจำหน่ายผู้ป่วย เพื่อไม่ให้พลาดการเบิกค่ารักษา`
      );
    if (miss > 0) recs.push(`📋 ผู้ป่วย ${miss} ราย ยังไม่ได้ระบุโรคหลัก (Principal Diagnosis) — แพทย์/ทีมสรุปรหัสต้องเข้าไปบันทึกให้ครบ มิฉะนั้นจะส่งเบิกค่ารักษากับ สปสช. ไม่ได้`);
    if (lateCoding > 0)
      recs.push(`⏰ ผู้ป่วย ${lateCoding} ราย ค้างสรุปรหัสเกิน 14 วันแล้ว — ต้องรีบทำ มิฉะนั้นจะส่งเบิกไม่ทันและ รพ.จะเสียรายได้ที่ควรได้`);
    if (cmiVal > 0 && cmiVal < 1.0)
      recs.push(
        `📉 ค่า CMI (ความซับซ้อนเฉลี่ยของผู้ป่วย) อยู่ที่ ${cmiVal.toFixed(2)} ต่ำกว่ามาตรฐาน 1.00 — แสดงว่าระบุโรคยังไม่ละเอียดพอ อาจมีโรคแทรกซ้อน/โรคร่วมที่ยังไม่ได้บันทึก ทำให้ รพ.ได้รับเงินคืนน้อยกว่าที่ควร`
      );
    if (top[0])
      recs.push(`🩺 โรคที่พบมากที่สุดในรอบนี้: ${top[0].icd10} ${top[0].name || ''} จำนวน ${top[0].cnt} ราย — แนะนำให้ระบุรหัสโรคให้ละเอียด เช่น ระบุเชื้อก่อโรค/ตำแหน่ง/ระยะ เพื่อให้ได้รหัสที่จำเพาะกว่าและเก็บรายได้ได้สูงสุด`);

    return {
      data_source: 'HOSxP XE + MedRec AI',
      total_discharges: total,
      coded_count: coded,
      coding_completeness_pct: codedPct,
      missing_principal_dx: miss,
      cmi: cmiVal,
      sum_adjrw: sumRw,
      late_coding_14d: lateCoding,
      top_diagnoses: top.map(t => ({ icd10: t.icd10, name: t.name, count: Number(t.cnt || 0) })),
      recommendations: recs,
      timestamp: new Date().toISOString(),
    };
  })
);

// ── No-Show Prediction ────────────────────────────────────────
router.get(
  '/noshow-prediction',
  cached('noshow', 300000, async () => {
    const [patterns, overall] = await Promise.allSettled([
      dbQuery(
        `SELECT k.department as clinic, DAYOFWEEK(o.vstdate) as dow, COUNT(DISTINCT o.vn) as total_visits, SUM(CASE WHEN o.ovstist = '4' THEN 1 ELSE 0 END) as noshow_count FROM ovst o JOIN kskdepartment k ON o.main_dep = k.depcode WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) GROUP BY k.department, DAYOFWEEK(o.vstdate) HAVING total_visits >= 10 ORDER BY (noshow_count / total_visits) DESC`
      ),
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) as total, SUM(CASE WHEN ovstist = '4' THEN 1 ELSE 0 END) as noshow FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)`
      ),
    ]);

    const pats = patterns.status === 'fulfilled' ? patterns.value : [];
    const ov = overall.status === 'fulfilled' ? overall.value : { total: 0, noshow: 0 };
    const overallRate = ov?.total > 0 ? ((ov.noshow / ov.total) * 100).toFixed(1) : 0;

    const clinicRisk = {};
    pats.forEach(p => {
      if (!clinicRisk[p.clinic]) clinicRisk[p.clinic] = { total: 0, noshow: 0 };
      clinicRisk[p.clinic].total += p.total_visits;
      clinicRisk[p.clinic].noshow += p.noshow_count;
    });
    const clinicSummary = Object.entries(clinicRisk)
      .map(([clinic, d]) => ({
        clinic,
        total: d.total,
        noshow: d.noshow,
        rate: ((d.noshow / d.total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 15);

    const dayNames = ['', 'อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const dowPattern = Array.from({ length: 7 }, (_, i) => {
      const dow = i + 1;
      const dayData = pats.filter(p => p.dow === dow);
      const total = dayData.reduce((s, p) => s + p.total_visits, 0);
      const noshow = dayData.reduce((s, p) => s + p.noshow_count, 0);
      return {
        day: dayNames[dow],
        total,
        noshow,
        rate: total > 0 ? ((noshow / total) * 100).toFixed(1) : '0',
      };
    });

    return {
      data_source: 'HOSxP XE + AI No-Show Prediction',
      overall: { rate: parseFloat(overallRate), total: ov?.total || 0, noshow: ov?.noshow || 0 },
      by_clinic: clinicSummary,
      by_day: dowPattern,
      recommendations:
        parseFloat(overallRate) > 10
          ? [
              'พิจารณา SMS reminder ก่อนนัด 1 วัน',
              'Overbooking 10-15% สำหรับคลินิกที่ no-show สูง',
              'วิเคราะห์ผู้ป่วยที่ no-show ซ้ำ เพื่อ targeted intervention',
            ]
          : ['อัตรา no-show อยู่ในเกณฑ์ดี', 'คงรูปแบบ appointment system ปัจจุบัน'],
      timestamp: new Date().toISOString(),
    };
  })
);

// ── Customer Segmentation ──────────────────────────────────────
router.get(
  '/customer/segmentation',
  cached('custSegment', 300000, async () => {
    const [ageGroup, loyalty, payer, geographic] = await Promise.allSettled([
      dbQuery(
        `SELECT CASE WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 15 THEN 'เด็ก 0-14' WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 30 THEN 'วัยรุ่น 15-29' WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 45 THEN 'วัยทำงาน 30-44' WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 60 THEN 'วัยกลางคน 45-59' ELSE 'สูงอายุ 60+' END as age_group, COUNT(DISTINCT o.hn) as patients, COUNT(DISTINCT o.vn) as visits, SUM(v.income) as revenue FROM ovst o JOIN patient p ON o.hn = p.hn LEFT JOIN vn_stat v ON o.vn = v.vn WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') GROUP BY age_group ORDER BY patients DESC`
      ),
      dbQuery(
        `SELECT visit_count, COUNT(*) as patients FROM (SELECT hn, COUNT(DISTINCT vn) as visit_count FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) GROUP BY hn) sub GROUP BY CASE WHEN visit_count = 1 THEN 1 WHEN visit_count <= 3 THEN 2 WHEN visit_count <= 6 THEN 3 ELSE 4 END ORDER BY visit_count`
      ),
      dbQuery(
        `SELECT pt.name as payer, COUNT(DISTINCT o.hn) as patients, SUM(v.income) as revenue FROM ovst o JOIN pttype pt ON o.pttype = pt.pttype LEFT JOIN vn_stat v ON o.vn = v.vn WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') GROUP BY pt.name ORDER BY revenue DESC LIMIT 10`
      ),
      dbQuery(
        `SELECT p.addrpart as district, COUNT(DISTINCT o.hn) as patients FROM ovst o JOIN patient p ON o.hn = p.hn WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND p.addrpart IS NOT NULL AND p.addrpart != '' GROUP BY p.addrpart ORDER BY patients DESC LIMIT 10`
      ),
    ]);

    const ageData = ageGroup.status === 'fulfilled' ? ageGroup.value : [];
    const topAge = ageData[0];
    const totalRevenue = ageData.reduce((s, a) => s + (Number(a.revenue) || 0), 0);

    return {
      data_source: 'HOSxP XE + Customer AI',
      segmentation: {
        by_age: ageData.map(a => ({
          ...a,
          revenue_share: totalRevenue > 0 ? ((a.revenue / totalRevenue) * 100).toFixed(1) : 0,
        })),
        by_payer: payer.status === 'fulfilled' ? payer.value : [],
        by_geography: geographic.status === 'fulfilled' ? geographic.value : [],
      },
      loyalty:
        loyalty.status === 'fulfilled'
          ? loyalty.value.map(l => ({
              segment:
                l.visit_count === 1
                  ? 'New (1 visit)'
                  : l.visit_count <= 3
                    ? 'Casual (2-3)'
                    : l.visit_count <= 6
                      ? 'Regular (4-6)'
                      : 'Loyal (7+)',
              patients: l.patients,
            }))
          : [],
      insights: [
        topAge ? `กลุ่ม ${topAge.age_group} มากที่สุด (${topAge.patients} คน)` : null,
        totalRevenue > 0 ? `รายได้เดือนนี้ ฿${(totalRevenue / 1e6).toFixed(1)}M` : null,
      ].filter(Boolean),
      timestamp: new Date().toISOString(),
    };
  })
);

export default router;
