// ============================================================
// BCH 360° Intelligence V.10 — Doctor Product Activity Tab
// กิจกรรมและผลผลิตของแพทย์ · OPD · IPD · Orders · Revenue
// ============================================================
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, Legend,
} from 'recharts';
import ExecutiveAIPanel from './shared/ExecutiveAIPanel.jsx';
import { nn, fmt } from '@utils/formatters';

// YYYY-MM-DD formatter (local timezone)
const toISODate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};
const todayISO = () => toISODate(new Date());
const daysAgoISO = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return toISODate(d); };

// ─────────────────────────────────────────────────────────────
// Statistics helpers
// ─────────────────────────────────────────────────────────────
const median = (arr) => {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};
// ─── Per-doctor deep analysis ───
function analyzeDoctor(d, allDoctors, periodDays) {
    const sortedByVisits = [...allDoctors].sort((a, b) => (b.total_visits || 0) - (a.total_visits || 0));
    const visitRank = sortedByVisits.findIndex(x => x.code === d.code) + 1;
    const visitPercentile = Math.round((1 - (visitRank - 1) / Math.max(1, allDoctors.length)) * 100);

    const sortedByRev = [...allDoctors].sort((a, b) => (b.total_revenue || 0) - (a.total_revenue || 0));
    const revRank = sortedByRev.findIndex(x => x.code === d.code) + 1;

    const medVisits = median(allDoctors.map(x => x.total_visits || 0));
    const medRevPerVisit = median(allDoctors.map(x => x.revenue_per_visit || 0).filter(x => x > 0));
    const medOrdersPerVisit = median(allDoctors.map(x => Number(x.orders_per_visit) || 0).filter(x => x > 0));

    const totalCases = (d.opd_visits || 0) + (d.ipd_admissions || 0);
    const ipdRatio = totalCases > 0 ? (d.ipd_admissions || 0) / totalCases : 0;
    const pattern = (d.ipd_admissions || 0) === 0
        ? 'OPD-only (ไม่รับผู้ป่วยใน)'
        : ipdRatio > 0.15 ? `IPD-heavy (${Math.round(ipdRatio * 100)}% เป็นผู้ป่วยใน — แพทย์เฉพาะทาง)`
        : `Balanced (OPD ${Math.round((1 - ipdRatio) * 100)}% · IPD ${Math.round(ipdRatio * 100)}%)`;
    const patternColor = ipdRatio > 0.15 ? '#db2777' : (d.ipd_admissions || 0) === 0 ? '#7c3aed' : '#10b981';

    const dailyVisits = (d.opd_visits || 0) / Math.max(1, periodDays);
    const workloadLevel = dailyVisits > 50 ? 'สูงมาก (เสี่ยง Burnout)'
        : dailyVisits > 30 ? 'สูง (เหนื่อยแต่รับได้)'
        : dailyVisits > 15 ? 'ปานกลาง'
        : dailyVisits > 5 ? 'ต่ำ (มีพื้นที่ขยาย)'
        : 'ต่ำมาก';
    const workloadColor = dailyVisits > 50 ? '#f43f5e' : dailyVisits > 30 ? '#f59e0b' : '#10b981';

    const opv = Number(d.orders_per_visit) || 0;
    const rpv = Number(d.revenue_per_visit) || 0;

    const ordEff = medOrdersPerVisit > 0 && opv > medOrdersPerVisit * 1.5 ? 'สูงกว่ามาตรฐานมาก'
        : medOrdersPerVisit > 0 && opv > medOrdersPerVisit * 1.2 ? 'สูงกว่ามาตรฐาน'
        : medOrdersPerVisit > 0 && opv < medOrdersPerVisit * 0.5 ? 'ต่ำกว่ามาตรฐาน'
        : 'อยู่ในเกณฑ์ปกติ';

    const revEff = medRevPerVisit > 0 && rpv > medRevPerVisit * 1.5 ? 'สูงมาก (case-mix ซับซ้อน/หัตถการราคาสูง)'
        : medRevPerVisit > 0 && rpv > medRevPerVisit * 1.2 ? 'สูงกว่ามาตรฐาน'
        : medRevPerVisit > 0 && rpv < medRevPerVisit * 0.5 ? 'ต่ำ (case ง่ายหรือสัดส่วนสิทธิ์เบิกต่ำ)'
        : 'อยู่ในเกณฑ์ปกติ';

    const strengths = [];
    const concerns = [];
    const recs = [];

    if (visitPercentile >= 90) strengths.push(`Top ${Math.max(1, 100 - visitPercentile)}% ด้านผลผลิต (อันดับ ${visitRank}/${allDoctors.length})`);
    else if (visitPercentile >= 75) strengths.push(`Top 25% ด้านผลผลิต (อันดับ ${visitRank}/${allDoctors.length})`);
    if (rpv > medRevPerVisit * 1.2) strengths.push(`รายได้/รายสูง ฿${fmt(rpv)} (สูงกว่าค่ากลาง ${Math.round((rpv / Math.max(1, medRevPerVisit) - 1) * 100)}%) — case-mix มีคุณค่าทางเศรษฐกิจ`);
    if (ipdRatio > 0.15) strengths.push(`รับ IPD สม่ำเสมอ (${d.ipd_admissions} ราย · ${Math.round(ipdRatio * 100)}% ของ workload) — เสริมความต่อเนื่องการดูแล`);
    if (opv > 0 && opv < medOrdersPerVisit * 1.2 && opv > medOrdersPerVisit * 0.7) strengths.push(`Orders/Visit อยู่ในเกณฑ์มาตรฐาน (${opv}) — Clinical Pathway เหมาะสม`);

    if (dailyVisits > 50) concerns.push(`⚠ ภาระงานเกินเกณฑ์ (${Math.round(dailyVisits)} ราย/วัน · เกณฑ์ 30–50) — เสี่ยง Burnout`);
    else if (dailyVisits > 30 && (d.ipd_admissions || 0) > 30) concerns.push(`⚠ OPD ${Math.round(dailyVisits)}/วัน + IPD ${d.ipd_admissions} ราย — ภาระซ้อน ควรเฝ้าระวัง`);
    if (medOrdersPerVisit > 0 && opv > medOrdersPerVisit * 1.5) concerns.push(`⚠ Orders/Visit = ${opv} สูงกว่าค่ากลาง (${medOrdersPerVisit.toFixed(2)}) มาก — ทบทวน Clinical Appropriateness`);
    if ((d.opd_visits || 0) > 100 && opv > 0 && opv < 0.2) concerns.push(`⚠ Orders/Visit ต่ำมาก (${opv}) แม้มี OPD ${fmt(d.opd_visits)} ราย — อาจ Under-investigation`);
    if ((d.ipd_admissions || 0) === 0 && visitPercentile >= 75) concerns.push(`แพทย์ OPD-only แต่ภาระสูง — พิจารณาให้ร่วม IPD rotation`);
    if (medRevPerVisit > 0 && rpv < medRevPerVisit * 0.4 && (d.opd_visits || 0) > 100) concerns.push(`รายได้/รายต่ำกว่าค่ากลางมาก (฿${fmt(rpv)} vs ฿${fmt(medRevPerVisit)}) — ตรวจสอบ Payer Mix และ Coding`);
    if ((d.lab_orders || 0) === 0 && (d.xray_orders || 0) === 0 && (d.opd_visits || 0) > 50) concerns.push(`ไม่มี Lab/X-Ray Orders เลยแม้มี OPD ${fmt(d.opd_visits)} ราย — ตรวจสอบการบันทึก`);

    if (dailyVisits > 50) recs.push('ลดภาระ OPD — พิจารณาจำกัด Quota หรือเพิ่มแพทย์ช่วย');
    if (medOrdersPerVisit > 0 && opv > medOrdersPerVisit * 1.5) recs.push('ร่วมประชุม Clinical Guideline — ลด Over-investigation');
    if (rpv < medRevPerVisit * 0.5 && (d.opd_visits || 0) > 200) recs.push('ทบทวน Coding/Billing — อาจมี Revenue Leak');
    if ((d.ipd_admissions || 0) === 0 && visitPercentile >= 75) recs.push('หมุนเวียนเข้า IPD — เสริม Team Flexibility');
    if (concerns.length === 0 && strengths.length >= 2) recs.push('ผลงานดี — พิจารณาเป็น Mentor / ผู้ช่วยจัดทำ Clinical Pathway');

    // ── AI Deep Recommendations — structured multi-field cards ──
    const deepRecs = buildDoctorAIRecommendations(d, allDoctors, {
        visitRank, visitPercentile, totalDoctors: allDoctors.length,
        pattern, workloadLevel, dailyVisits, ordEff, revEff,
        medRevPerVisit, medOrdersPerVisit, opv, rpv, periodDays, ipdRatio,
    });

    return { visitRank, visitPercentile, revRank, totalDoctors: allDoctors.length, pattern, patternColor, workloadLevel, workloadColor, ordEff, revEff, dailyVisits, medVisits, medRevPerVisit, medOrdersPerVisit, strengths, concerns, recs, deepRecs };
}

// ─────────────────────────────────────────────────────────────
// AI Deep Recommendations — rich, multi-field per-doctor cards
// Each returns: {priority, icon, title, situation, rootCause, actions[], target, timeline, owner, expectedOutcome, color}
// ─────────────────────────────────────────────────────────────
function buildDoctorAIRecommendations(d, allDoctors, ctx) {
    const { visitRank, visitPercentile, totalDoctors, pattern, workloadLevel, dailyVisits, ordEff, revEff, medRevPerVisit, medOrdersPerVisit, opv, rpv, periodDays, ipdRatio } = ctx;
    const recs = [];
    const name = d.name || d.code;

    // ── R1: Burnout/Workload Management ──
    if (dailyVisits > 50) {
        const excessDaily = Math.round(dailyVisits - 40);
        recs.push({
            priority: 'P0',
            icon: '🚨',
            title: 'บริหารภาระงานและป้องกัน Burnout',
            color: '#f43f5e',
            situation: `${name} รับผู้ป่วยเฉลี่ย ${Math.round(dailyVisits)} ราย/วัน (เกินเกณฑ์ OPD มาตรฐาน 30–50 ราย/วัน ประมาณ ${excessDaily} ราย/วัน) ตลอดช่วง ${periodDays} วัน — ความเสี่ยง Burnout สูง ส่งผลต่อคุณภาพการวินิจฉัย ความปลอดภัยผู้ป่วย และอัตราการคงอยู่ของบุคลากรในระยะยาว`,
            rootCause: `อาจเกิดจาก (1) จำนวนแพทย์ไม่เพียงพอต่อ Demand · (2) ระบบนัดหมายไม่มี Quota Cap ต่อแพทย์ · (3) ผู้ป่วยยืนยัน Provider เดิมทำให้ load กระจุก · (4) ไม่มี Triage ที่ชัดเจนสำหรับ case เบาไปหาแพทย์ร่วม`,
            actions: [
                `**สัปดาห์ที่ 1**: กำหนด Quota Cap ชั่วคราว 45 ราย/วัน/แพทย์ใน HOSxP Appointment Module — ปรึกษา IT เพื่อตั้ง warning เมื่อ slot เต็ม`,
                `**สัปดาห์ที่ 2**: ประชุมทีมแพทย์วิเคราะห์ Case-mix ของ ${name} — แยก Simple (ยืนยันยา/follow-up) ออกจาก Complex สำหรับ Redistribute`,
                `**เดือนที่ 1**: จัด Pharmacist-led Refill Clinic + Nurse Practitioner Clinic สำหรับ Stable NCD/Chronic — ลด OPD Load 15–20%`,
                `**เดือนที่ 2–3**: ประเมินความเป็นไปได้ในการจ้างแพทย์ GP เพิ่ม 1 ท่าน หรือเพิ่ม Part-time Specialist 1–2 วัน/สัปดาห์`,
                `**ต่อเนื่อง**: Monitor Daily Visits ใน Dashboard นี้รายสัปดาห์ · คุย 1-on-1 กับ ${name} เพื่อรับทราบสัญญาณ Burnout (นอน/อารมณ์/ความรู้สึกต่องาน)`,
            ],
            target: `ลดภาระงาน ${name} เหลือ ≤ 45 ราย/วัน ภายใน 8 สัปดาห์ · MBI Score (Maslach Burnout Inventory) Emotional Exhaustion <16`,
            timeline: 'เร่งด่วน 8 สัปดาห์',
            owner: 'ผู้อำนวยการโรงพยาบาล + หัวหน้าแผนกแพทย์ + HR',
            expectedOutcome: `ลด Burnout Risk · คงอยู่ของแพทย์ Top Performer · ผู้ป่วยได้ Consultation Time เพียงพอ (ปัจจุบันประมาณ ${Math.max(2, Math.round(480 / dailyVisits))} นาที/ราย อาจไม่พอสำหรับ Complex Case)`,
        });
    }

    // ── R2: Revenue Leak / Coding Audit ──
    if (medRevPerVisit > 0 && rpv < medRevPerVisit * 0.6 && (d.opd_visits || 0) > 200) {
        const gap = Math.round(medRevPerVisit - rpv);
        const potentialLeak = Math.round(gap * (d.opd_visits || 0));
        recs.push({
            priority: 'P0',
            icon: '💰',
            title: 'ตรวจสอบ Revenue Leak และ Coding Quality',
            color: '#dc2626',
            situation: `${name} สร้างรายได้ ฿${fmt(rpv)}/ราย ต่ำกว่าค่ากลาง ฿${fmt(medRevPerVisit)}/ราย ประมาณ ${Math.round((1 - rpv / medRevPerVisit) * 100)}% · จากจำนวน OPD ${fmt(d.opd_visits)} ราย ในช่วง ${periodDays} วัน ประมาณการ Revenue Gap สูงถึง ฿${fmt(potentialLeak)} · อาจมีสาเหตุได้หลายด้านที่ควรตรวจสอบเร่งด่วน`,
            rootCause: `เป็นไปได้ 4 สาเหตุ (เรียงตามความน่าจะเป็น): (1) **ICD-10/ICD-9 Coding ไม่ครบ** — ไม่ได้ระบุ Secondary Dx หรือ Comorbidity · (2) **หัตถการไม่ได้บันทึก** — นวด/ฉีดยา/Counseling ที่ควรเบิกได้ · (3) **Payer Mix เอียงไปทาง UC/ชำระเงินเอง** — case-mix เน้น Simple/Follow-up · (4) **ใบเบิกสิทธิ์ไม่ครบ** (สปสช. e-Claim format)`,
            actions: [
                `**สัปดาห์ที่ 1**: ดึง 30 records ของ ${name} แบบสุ่ม (stratified by pttype) · MedRec audit ทำ Chart Review เทียบ Documentation vs Billed`,
                `**สัปดาห์ที่ 2**: พบ ${name} ทบทวน Coding Basics — Secondary Dx, Comorbidity (CC/MCC), Procedure Code (ICD-9-CM)`,
                `**สัปดาห์ที่ 3**: ปรับใช้ **Coding Checklist** ใน HOSxP — Alert ถ้า Primary Dx อยู่ในกลุ่มที่มัก CC/MCC (DM, HT, CKD) แต่ยังไม่ระบุ Secondary`,
                `**เดือนที่ 1**: เทียบ Payer Mix ของ ${name} กับแพทย์ที่มี Revenue/Visit สูง — ดูว่าสิทธิ์ FFS (เบิกจ่ายตรง/ประกัน) มีสัดส่วนเท่าไร`,
                `**ต่อเนื่อง**: Quarterly Audit ร่วมกับ MedRec · วัด Revenue/Visit ของ ${name} ใน Dashboard นี้ทุกเดือน`,
            ],
            target: `เพิ่ม Revenue/Visit ของ ${name} จาก ฿${fmt(rpv)} เป็น ฿${fmt(Math.round(medRevPerVisit * 0.85))} ภายใน 3 เดือน · Revenue Recovery ≥ ฿${fmt(Math.round(potentialLeak * 0.3))}`,
            timeline: 'เร่งด่วน 12 สัปดาห์',
            owner: 'แพทย์เจ้าของเคส + Medical Record Audit Team + Billing Department',
            expectedOutcome: `Revenue Recovery · ปรับ Coding Quality · ลด Claim Rejection Rate · Bench-mark Coding Quality ให้แพทย์ท่านอื่น`,
        });
    }

    // ── R3: Clinical Over-investigation ──
    if (medOrdersPerVisit > 0 && opv > medOrdersPerVisit * 1.5) {
        const excessOrders = Math.round((opv - medOrdersPerVisit) * (d.opd_visits || 0));
        recs.push({
            priority: 'P1',
            icon: '🧪',
            title: 'ทบทวน Clinical Pathway และ Order Appropriateness',
            color: '#f59e0b',
            situation: `${name} มี Orders/Visit = ${opv} สูงกว่าค่ากลาง (${medOrdersPerVisit.toFixed(2)}) ประมาณ ${Math.round((opv / medOrdersPerVisit - 1) * 100)}% · ประมาณการคำสั่งส่วนเกิน ${fmt(excessOrders)} คำสั่งในช่วง ${periodDays} วัน · อาจสะท้อน Over-investigation หรือการสั่งตรวจซ้ำโดยไม่จำเป็น ซึ่งเพิ่มต้นทุนโดยไม่เพิ่มคุณภาพการดูแล`,
            rootCause: `(1) **Defensive Medicine** — กลัวพลาด · (2) **ไม่มี Clinical Decision Support** ใน HOSxP · (3) **ไม่ทราบต้นทุน** ของแต่ละ Order · (4) **ผู้ป่วยเรียกร้อง** โดยเฉพาะสิทธิ์ UC`,
            actions: [
                `**สัปดาห์ที่ 1**: ประชุม Peer Review ใช้ Choosing Wisely Thailand Guidelines · เลือก 5 Orders ที่สั่งบ่อยโดยไม่จำเป็น (เช่น CBC ซ้ำใน 7 วัน · LFT สำหรับ HT ที่ควบคุมได้)`,
                `**สัปดาห์ที่ 2**: Build Clinical Decision Support (CDS) ใน HOSxP — Alert เมื่อสั่งซ้ำใน 30 วัน + แสดงต้นทุนโดยประมาณ`,
                `**เดือนที่ 1**: จัด Academic Session กับ ${name} + ทีมแพทย์ — ทบทวน Evidence-Based Indication สำหรับ Top Orders`,
                `**เดือนที่ 2**: Monitor Orders/Visit ของ ${name} รายสัปดาห์ · Comparison กับ Peer Group (แพทย์ในคลินิกเดียวกัน)`,
                `**ต่อเนื่อง**: Lab Stewardship Program — แสดง Utilization Report ทุกเดือนให้แพทย์เห็นของตัวเอง`,
            ],
            target: `ลด Orders/Visit ของ ${name} จาก ${opv} → ≤ ${(medOrdersPerVisit * 1.2).toFixed(2)} ภายใน 3 เดือน · ประหยัดต้นทุน Lab/X-Ray ประมาณ ฿${fmt(Math.round(excessOrders * 150))} (สมมติ ฿150/order)`,
            timeline: 'ปานกลาง 12 สัปดาห์',
            owner: 'หัวหน้าแผนกแพทย์ + Clinical Pharmacist + Lab Director',
            expectedOutcome: `ลดต้นทุน · ลดการรบกวนผู้ป่วย · Clinical Appropriateness ดีขึ้น · Benchmark ที่ทีมแพทย์ใช้ร่วมกันได้`,
        });
    }

    // ── R4: Under-investigation ──
    if ((d.opd_visits || 0) > 100 && opv > 0 && opv < 0.2) {
        recs.push({
            priority: 'P1',
            icon: '🔬',
            title: 'ตรวจสอบความเป็นไปได้ของ Under-investigation',
            color: '#f59e0b',
            situation: `${name} มี Orders/Visit เพียง ${opv} (ต่ำกว่าค่ากลาง ${medOrdersPerVisit.toFixed(2)} มาก) แม้มี OPD ${fmt(d.opd_visits)} ราย · อาจบ่งชี้ (1) ผู้ป่วยส่วนใหญ่เป็น Follow-up ที่ stable หรือ (2) สั่งตรวจน้อยเกินไปจน Miss Diagnosis`,
            rootCause: `ต้องแยก 2 scenario: (A) **Healthy pattern**: ดูแลผู้ป่วยเรื้อรังได้ดีจน stable · (B) **Risk pattern**: ไม่ได้ investigate ตามมาตรฐาน CPG · การวิเคราะห์ Case-mix จะบอกได้`,
            actions: [
                `**สัปดาห์ที่ 1**: ดึง Sample 30 records ของ ${name} · MedRec Audit ตรวจว่า ผู้ป่วย DM/HT/CKD ได้ Annual Lab Screening ตาม CPG หรือไม่`,
                `**สัปดาห์ที่ 2**: ถ้า Audit พบ Missing Screening — พบ ${name} เพื่อทบทวน CPG + Generate Alert ใน HOSxP สำหรับ Overdue Screening`,
                `**เดือนที่ 1**: วัด Clinical Quality Indicators: HbA1c <7 · BP <140/90 · LDL <100 · ผ่านเกณฑ์ HA`,
                `**ต่อเนื่อง**: ตรวจสอบ Outcome — Readmission Rate, ER Visit, ภาวะแทรกซ้อน · ถ้า Outcome ดีแม้ Orders ต่ำ แสดงว่าเป็น Healthy Pattern`,
            ],
            target: `ยืนยัน Scenario ภายใน 4 สัปดาห์ · ถ้าเป็น Risk Pattern → Orders/Visit กลับมาที่ ≥ ${medOrdersPerVisit.toFixed(2)} ภายใน 12 สัปดาห์`,
            timeline: 'ปานกลาง 12 สัปดาห์',
            owner: 'Medical Record Audit + หัวหน้าแผนกแพทย์ + Quality Assurance',
            expectedOutcome: `ป้องกัน Missed Diagnosis · ปรับปรุง Clinical Quality · หากเป็น Healthy Pattern ให้เป็นต้นแบบ`,
        });
    }

    // ── R5: OPD-only with high workload → encourage IPD rotation ──
    if ((d.ipd_admissions || 0) === 0 && visitPercentile >= 75) {
        recs.push({
            priority: 'P2',
            icon: '🏥',
            title: 'หมุนเวียนเข้า IPD เพื่อเสริม Team Flexibility',
            color: '#3b82f6',
            situation: `${name} อยู่ใน Top ${Math.max(1, 100 - visitPercentile)}% ด้านผลผลิต OPD แต่ไม่ได้รับผู้ป่วย IPD เลยในช่วง ${periodDays} วัน · ขาดโอกาสพัฒนาทักษะการดูแลผู้ป่วย Complex และทำให้ทีม IPD ขาดการสนับสนุนในช่วง peak`,
            rootCause: `เป็นไปได้ (1) ${name} เชี่ยวชาญด้าน OPD เฉพาะทาง · (2) ไม่มีตารางหมุนเวียน IPD · (3) แพทย์เลือกเฉพาะ OPD เพราะ workflow รู้จัก`,
            actions: [
                `**สัปดาห์ที่ 1**: พูดคุยกับ ${name} เพื่อประเมินความพร้อมและความสมัครใจในการรับ IPD`,
                `**เดือนที่ 1**: จัดทำตาราง IPD Rotation — ${name} รับ Admission อย่างน้อย 2–4 ราย/สัปดาห์ (case ไม่ complex)`,
                `**เดือนที่ 2–3**: Mentorship ร่วมกับแพทย์ IPD senior สำหรับ Complex Case`,
                `**ต่อเนื่อง**: ประเมิน Outcome Metrics (ALOS, Readmission) ของ ${name} เทียบกับ IPD Pool`,
            ],
            target: `${name} รับ IPD ≥ 8 ราย/เดือน ภายใน 3 เดือน · Outcome metrics ไม่ต่ำกว่าค่ากลาง IPD Pool`,
            timeline: 'ระยะยาว 3 เดือน',
            owner: 'ผู้อำนวยการแผนกแพทย์ + ${name} + หัวหน้าทีม IPD',
            expectedOutcome: `Team Flexibility เพิ่ม · ลด Single Point of Failure · ${name} พัฒนา Comprehensive Skill`,
        });
    }

    // ── R6: Missing orders entirely (data quality issue) ──
    if ((d.lab_orders || 0) === 0 && (d.xray_orders || 0) === 0 && (d.opd_visits || 0) > 50) {
        recs.push({
            priority: 'P0',
            icon: '⚠️',
            title: 'ตรวจสอบความครบถ้วนของการบันทึกคำสั่งตรวจ',
            color: '#dc2626',
            situation: `${name} ไม่มี Lab/X-Ray Orders เลยในระบบ HOSxP แม้มี OPD ${fmt(d.opd_visits)} ราย · เป็นไปไม่ได้ทางคลินิกสำหรับ Volume ขนาดนี้ · อาจมีปัญหาการบันทึกหรือ data pipeline`,
            rootCause: `(1) ${name} สั่งผ่านช่องทางอื่น (Paper / Verbal) ที่ไม่เข้า HOSxP · (2) บัญชีผู้สั่งบันทึกเป็นบุคลากรอื่น (พยาบาล) · (3) Data mapping ผิด (doctor_code ไม่ match) · (4) ส่ง ${name} จริงๆ แต่ถูก Lab/X-Ray block`,
            actions: [
                `**ทันที**: ตรวจ HOSxP Order History ของ OPD ${name} 1 สัปดาห์ล่าสุด · ยืนยันว่า Orders ไปอยู่กับ login อื่น`,
                `**สัปดาห์ที่ 1**: พบ ${name} สอบถาม workflow การสั่งตรวจ · ปรึกษา IT ตรวจ audit log`,
                `**สัปดาห์ที่ 2**: หากเป็น Data Mapping Issue → แก้ doctor_code mapping ใน HOSxP · หากเป็น Workflow Issue → training และ SOP`,
                `**ต่อเนื่อง**: Monitor Orders ใน Dashboard นี้ทุกสัปดาห์`,
            ],
            target: `Orders/Visit ของ ${name} กลับมาที่ระดับปกติ (≥ 0.3) ภายใน 4 สัปดาห์`,
            timeline: 'เร่งด่วน 4 สัปดาห์',
            owner: 'IT + MedRec + ${name}',
            expectedOutcome: `ความถูกต้องของข้อมูล · Compliance ด้าน Documentation · ไม่มี Revenue Leak จาก Missing Orders`,
        });
    }

    // ── R7: High performer → Mentor role ──
    if (dailyVisits >= 20 && dailyVisits <= 50 && opv >= medOrdersPerVisit * 0.7 && opv <= medOrdersPerVisit * 1.3 && rpv >= medRevPerVisit * 0.8 && visitPercentile >= 50) {
        recs.push({
            priority: 'P2',
            icon: '🌟',
            title: 'พัฒนาเป็น Clinical Mentor / Champion',
            color: '#10b981',
            situation: `${name} มีผลงานรอบด้าน — ภาระงานเหมาะสม (${Math.round(dailyVisits)} ราย/วัน) · Orders/Visit อยู่ในเกณฑ์ (${opv}) · Revenue/Visit ใกล้ค่ากลาง (฿${fmt(rpv)}) · เหมาะสำหรับเป็น Role Model และช่วยพัฒนาทีมแพทย์`,
            rootCause: `แสดงถึง Clinical Competence และ Workflow Efficiency ที่ควรถ่ายทอด`,
            actions: [
                `**เดือนที่ 1**: เชิญ ${name} เข้าร่วมทีมจัดทำ Clinical Pathway / CPG ประจำคลินิก`,
                `**เดือนที่ 2–3**: Mentorship Program — ${name} เป็น Mentor ให้แพทย์ใหม่ 1–2 ท่าน · Shadow OPD 1–2 สัปดาห์`,
                `**เดือนที่ 3**: พิจารณามอบหมาย Role "Clinical Champion" สำหรับคลินิกของ ${name}`,
                `**ต่อเนื่อง**: Case Conference ประจำเดือน — ${name} นำเสนอ Interesting Case`,
            ],
            target: `ผู้ถูก Mentor 2 ท่าน มี Revenue/Visit และ Orders/Visit เข้าเกณฑ์ภายใน 6 เดือน · ${name} ได้รับ Recognition (Award/Bonus)`,
            timeline: 'ระยะยาว 6 เดือน',
            owner: 'ผู้อำนวยการแผนกแพทย์ + HR',
            expectedOutcome: `ยกระดับคุณภาพทีม · Retention ของ Top Performer · Knowledge Transfer ระหว่างรุ่น`,
        });
    }

    return recs;
}
// Gini coefficient (0=perfect equality, 1=perfect inequality)
const gini = (values) => {
    const v = values.filter(x => x >= 0);
    const n = v.length;
    if (n === 0) return 0;
    const sorted = [...v].sort((a, b) => a - b);
    let num = 0, total = 0;
    for (let i = 0; i < n; i++) {
        num += (2 * (i + 1) - n - 1) * sorted[i];
        total += sorted[i];
    }
    return total > 0 ? num / (n * total) : 0;
};

// ─────────────────────────────────────────────────────────────
// AI Narrative Builder — Doctor Productivity (Deep Analysis)
// ─────────────────────────────────────────────────────────────
function buildDoctorActivityNarrative(data) {
    if (!data?.summary || !data?.doctors) return { headline: 'กำลังรอข้อมูลกิจกรรมแพทย์ — AI วิเคราะห์จะปรากฏเมื่อ data พร้อม', empty: true };

    const s = data.summary;
    const doctors = data.doctors || [];
    const activeDoctors = s.opd_doctors || 0;
    const totalVisits = s.opd_visits || 0;
    const avgPerDoctor = s.avg_visits_per_doctor || 0;
    const totalRevenue = s.total_revenue || 0;
    const periodDays = data.period?.days || (data.period?.start && data.period?.end
        ? Math.max(1, Math.round((new Date(data.period.end) - new Date(data.period.start)) / 86400000) + 1)
        : 30);

    if (!doctors.length) {
        return {
            headline: 'ยังไม่มีข้อมูลกิจกรรมแพทย์ในช่วงนี้',
            headlineColor: '#94a3b8',
            kpi: [],
            sections: [],
            footerLeft: '—',
        };
    }

    // ── Distribution analysis ──
    const visitArr = doctors.map(d => d.total_visits || 0);
    const revArr = doctors.map(d => d.total_revenue || 0);
    const ordersPerVisitArr = doctors.map(d => Number(d.orders_per_visit) || 0);
    const revenuePerVisitArr = doctors.map(d => Number(d.revenue_per_visit) || 0);

    const sortedByVisits = [...doctors].sort((a, b) => (b.total_visits || 0) - (a.total_visits || 0));
    const topDoctor = sortedByVisits[0];
    const medianVisits = Math.round(median(visitArr));
    const maxVisits = Math.max(...visitArr);
    const minVisits = Math.min(...visitArr);
    const medianDaily = Math.round(medianVisits / Math.max(1, periodDays));
    const topDaily = Math.round(maxVisits / Math.max(1, periodDays));

    const totalVisitsAll = visitArr.reduce((a, b) => a + b, 0);
    const totalDoctorRev = revArr.reduce((a, b) => a + b, 0);
    const topShare = totalDoctorRev > 0 ? Math.round((topDoctor?.total_revenue || 0) / totalDoctorRev * 100) : 0;

    const top10 = sortedByVisits.slice(0, 10);
    const top10Share = totalVisitsAll > 0 ? Math.round(top10.reduce((sum, d) => sum + d.total_visits, 0) / totalVisitsAll * 100) : 0;
    const top20pctCount = Math.max(1, Math.ceil(doctors.length * 0.2));
    const top20pct = sortedByVisits.slice(0, top20pctCount);
    const top20Share = totalVisitsAll > 0 ? Math.round(top20pct.reduce((sum, d) => sum + d.total_visits, 0) / totalVisitsAll * 100) : 0;

    const giniCoef = gini(visitArr);
    const giniPct = Math.round(giniCoef * 100);
    const giniRev = gini(revArr);
    const giniRevPct = Math.round(giniRev * 100);

    // ── Economic efficiency ──
    const revenuePerVisitSorted = [...doctors].filter(d => d.total_visits > 0).sort((a, b) => (b.revenue_per_visit || 0) - (a.revenue_per_visit || 0));
    const highRevPerVisit = revenuePerVisitSorted[0];
    const lowRevPerVisit = revenuePerVisitSorted[revenuePerVisitSorted.length - 1];
    const medianRevPerVisit = Math.round(median(revenuePerVisitArr.filter(x => x > 0)));

    // ── Order management (clinical efficiency) ──
    const medianOrdersPerVisit = Number(median(ordersPerVisitArr.filter(x => x > 0)).toFixed(2));
    const highOrderer = [...doctors].sort((a, b) => (b.orders_per_visit || 0) - (a.orders_per_visit || 0))[0];
    const lowOrderer = [...doctors].filter(d => d.opd_visits > 50).sort((a, b) => (a.orders_per_visit || 0) - (b.orders_per_visit || 0))[0];

    // ── Practice pattern classification ──
    // For community hospitals, IPD:Visits ratio is typically 2–8%
    // Threshold >5% = "IPD-heavy" (admits patients more than average community physician)
    const IPD_HEAVY_THRESHOLD = 0.05;
    const ipdHeavy = doctors.filter(d => {
        const tot = (d.opd_visits || 0) + (d.ipd_admissions || 0);
        return tot > 0 && (d.ipd_admissions || 0) / tot > IPD_HEAVY_THRESHOLD;
    }).length;
    const opdOnly = doctors.filter(d => (d.ipd_admissions || 0) === 0).length;
    const ipdAdmitting = doctors.filter(d => (d.ipd_admissions || 0) > 0).length; // แพทย์ที่รับ IPD อย่างน้อย 1 ราย
    const balancedIpd = ipdAdmitting - ipdHeavy; // รับ IPD แต่ไม่ถึง 5% ของ total

    // ── Headline ──
    let headline, hlColor;
    if (avgPerDoctor > 100) {
        headline = `⚠ ภาระงานแพทย์สูงเกินเกณฑ์ — แพทย์ ${activeDoctors} ท่าน · เฉลี่ย ${avgPerDoctor} ราย/ท่าน · Gini ${giniPct}/100 · ควรประเมินอัตรากำลังและ Workload Balance`;
        hlColor = '#f43f5e';
    } else if (top10Share > 80) {
        headline = `⚠ การกระจายภาระงานเอียงมาก — แพทย์ Top 10 รับผิดชอบ ${top10Share}% ของผู้ป่วย · Gini ${giniPct}/100 · พิจารณา Load Balancing`;
        hlColor = '#f59e0b';
    } else if (giniPct > 50) {
        headline = `⚠ Gini Coefficient สูง (${giniPct}/100) — การกระจายภาระงานไม่สม่ำเสมอ · แนะนำทบทวน Scheduling และ Cross-training`;
        hlColor = '#f59e0b';
    } else {
        headline = `✓ แพทย์ ${activeDoctors} ท่าน · ${fmt(totalVisits)} ราย · เฉลี่ย ${avgPerDoctor} ราย/ท่าน · Gini ${giniPct}/100 · รายได้รวม ฿${fmt(Math.round(totalRevenue / 1e6))}M`;
        hlColor = '#10b981';
    }

    // ── Deep sections ──
    const sections = [
        {
            icon: '👨‍⚕️',
            title: '1. การวิเคราะห์ภาระงานแพทย์เชิงลึก (Workload Analysis)',
            list: [
                `**จำนวนแพทย์ปฏิบัติหน้าที่จริง** ${activeDoctors} ท่าน (OPD) · ${s.ipd_doctors || 0} ท่าน (IPD) ในช่วง ${periodDays} วัน`,
                `**ค่าเฉลี่ย** ${avgPerDoctor} ราย/ท่าน · **ค่ากลาง (Median)** ${medianVisits} ราย/ท่าน · **สูงสุด** ${fmt(maxVisits)} ราย (${topDaily}/วัน) · **ต่ำสุด** ${fmt(minVisits)} ราย`,
                `**ช่องว่างระหว่างแพทย์สูงสุด-ต่ำสุด** = ${maxVisits - minVisits > 0 ? Math.round(maxVisits / Math.max(1, minVisits)) : 1} เท่า · ${maxVisits / Math.max(1, minVisits) > 20 ? '⚠ ช่องว่างกว้างมาก ควรทบทวน Scheduling' : maxVisits / Math.max(1, minVisits) > 10 ? '⚠ ช่องว่างกว้าง ควรเฝ้าระวัง Burnout' : 'อยู่ในเกณฑ์ที่ยอมรับได้'}`,
                `**Benchmark เปรียบเทียบ**: เกณฑ์มาตรฐาน OPD ประมาณ 30–50 ราย/วัน/แพทย์ · แพทย์อันดับ 1 รับ ${topDaily} ราย/วัน ${topDaily > 50 ? '⚠ สูงกว่าเกณฑ์มาก เสี่ยง Burnout' : topDaily > 30 ? '· สูงแต่ยังรับได้' : '· อยู่ในเกณฑ์ปลอดภัย'}`,
                `**การประเมินภาพรวม**: ${avgPerDoctor > 100 ? 'ภาระงานสูงเกินเกณฑ์ — ต้องประเมินอัตรากำลังเพิ่ม' : avgPerDoctor > 50 ? 'ภาระงานปานกลาง — อยู่ในเกณฑ์รับได้' : 'ภาระงานยังรับได้ — มีพื้นที่ขยายบริการ'}`,
            ],
            color: avgPerDoctor > 100 ? '#f43f5e' : avgPerDoctor > 50 ? '#f59e0b' : '#10b981',
        },
        {
            icon: '📊',
            title: '2. การกระจายผลผลิต (Gini Coefficient & Pareto Analysis)',
            list: [
                `**Gini Coefficient (ความเหลื่อมล้ำของภาระงาน)** = ${giniPct}/100 · ${giniPct > 60 ? '⚠ เหลื่อมล้ำสูงมาก' : giniPct > 40 ? '⚠ เหลื่อมล้ำปานกลาง' : '✓ เหลื่อมล้ำต่ำ การกระจายสมดุล'} · (เกณฑ์: 0–30 สมดุล · 31–50 ปานกลาง · >50 เหลื่อมล้ำ)`,
                `**Pareto 80/20 Test**: แพทย์ Top 20% (${top20pctCount} ท่าน) รับ ${top20Share}% ของผู้ป่วยทั้งหมด ${top20Share > 80 ? '· ตรงตาม Pareto Principle — ภาระพึ่งพา Key Physician สูงมาก' : top20Share > 60 ? '· ใกล้เคียง Pareto' : '· กระจายดีกว่า Pareto'}`,
                `**Top 10 แพทย์** รับ ${top10Share}% · **Top 1** (${topDoctor?.name || '—'}) รับ ${Math.round((topDoctor?.total_visits || 0) / totalVisitsAll * 100)}% (${fmt(topDoctor?.total_visits || 0)} ราย)`,
                `**Gini ด้านรายได้** = ${giniRevPct}/100 · ${giniRevPct > 60 ? 'เหลื่อมล้ำด้านรายได้สูง' : giniRevPct > 40 ? 'เหลื่อมล้ำด้านรายได้ปานกลาง' : 'การกระจายรายได้สมดุล'} — สะท้อนความแตกต่างของประเภทผู้ป่วย/หัตถการ`,
                `**ข้อสรุป**: ${giniPct > 50 && top10Share > 80 ? 'การพึ่งพาแพทย์กลุ่มน้อยสูงเกินไป — ควรลงทุน Cross-training และกระจายภาระงาน' : giniPct > 40 ? 'มีสัญญาณเหลื่อมล้ำ — ควรทบทวน Scheduling' : 'การกระจายภาระงานเหมาะสม'}`,
            ],
            color: giniPct > 50 ? '#f43f5e' : giniPct > 35 ? '#f59e0b' : '#10b981',
        },
        {
            icon: '💰',
            title: '3. ประสิทธิภาพเชิงเศรษฐกิจ (Revenue Efficiency)',
            list: [
                `**รายได้รวมจากแพทย์** ฿${fmt(Math.round(totalDoctorRev))} · เฉลี่ย ฿${fmt(Math.round(totalDoctorRev / Math.max(1, doctors.length)))}/แพทย์`,
                `**รายได้/ราย (Revenue per Visit)** — ค่ากลาง ฿${fmt(medianRevPerVisit)}/ราย · สูงสุด ${highRevPerVisit ? `${highRevPerVisit.name} ฿${fmt(highRevPerVisit.revenue_per_visit)}/ราย` : '—'} · ต่ำสุด ${lowRevPerVisit ? `${lowRevPerVisit.name} ฿${fmt(lowRevPerVisit.revenue_per_visit)}/ราย` : '—'}`,
                `**ช่องว่าง Revenue/Visit** = ${highRevPerVisit && lowRevPerVisit && lowRevPerVisit.revenue_per_visit > 0 ? Math.round(highRevPerVisit.revenue_per_visit / lowRevPerVisit.revenue_per_visit) : '—'} เท่า — สะท้อน case-mix (โรคซับซ้อน/หัตถการราคาสูง) และประเภทสิทธิ์ผู้ป่วย`,
                `**Top Earner**: ${topDoctor?.name || '—'} รายได้รวม ฿${fmt(topDoctor?.total_revenue || 0)} (${topShare}% ของรายได้แพทย์) · รายได้/ราย ฿${fmt(topDoctor?.revenue_per_visit || 0)}`,
                `**การประเมิน**: ${topShare > 25 ? '⚠ รายได้พึ่งพา Top Doctor สูงเกิน 25% — ความเสี่ยงหากแพทย์ลาออก/ลาป่วย' : topShare > 15 ? 'พึ่งพา Top Doctor ปานกลาง ควรเฝ้าระวัง' : 'กระจายดี ไม่พึ่งพาบุคคลเดียว'}`,
            ],
            color: topShare > 25 ? '#f43f5e' : topShare > 15 ? '#f59e0b' : '#10b981',
        },
        {
            icon: '🧪',
            title: '4. การบริหารคำสั่งตรวจ (Clinical Order Management)',
            list: [
                `**Lab Orders รวม** ${fmt(s.lab_orders)} · **X-Ray Orders รวม** ${fmt(s.xray_orders)} · **Orders/Visit เฉลี่ย** ${medianOrdersPerVisit}`,
                `**แพทย์สั่งตรวจสูงสุด**: ${highOrderer ? `${highOrderer.name} — ${highOrderer.orders_per_visit} คำสั่ง/ราย` : '—'} ${highOrderer && highOrderer.orders_per_visit > 2 ? '⚠ สั่งตรวจสูงกว่าปกติมาก — ควรทบทวน Clinical Pathway และต้นทุนที่เกิดขึ้น' : ''}`,
                `**แพทย์สั่งตรวจต่ำสุด** (ที่มี OPD > 50 ราย): ${lowOrderer ? `${lowOrderer.name} — ${lowOrderer.orders_per_visit} คำสั่ง/ราย` : '—'} ${lowOrderer && lowOrderer.orders_per_visit < 0.2 ? '· อาจบ่งชี้ Under-investigation หรือผู้ป่วยกลุ่มเสถียร' : ''}`,
                `**Lab : X-Ray Ratio** = ${s.xray_orders > 0 ? (s.lab_orders / s.xray_orders).toFixed(1) : '—'} : 1 ${s.lab_orders / Math.max(1, s.xray_orders) > 10 ? '· Lab เด่น (เหมาะกับ NCD/MedOPD)' : s.lab_orders / Math.max(1, s.xray_orders) > 5 ? '· สมดุล' : '· X-Ray สัดส่วนสูง (เหมาะกับ Ortho/ER)'}`,
                `**ข้อเสนอแนะ**: ตรวจสอบ Clinical Variation — ความแตกต่างของ Orders/Visit อย่างมีนัยยะ บ่งชี้ควรจัดทำ Clinical Guidelines ร่วม`,
            ],
            color: highOrderer && highOrderer.orders_per_visit > 2 ? '#f59e0b' : '#0ea5e9',
        },
        {
            icon: '🏥',
            title: '5. รูปแบบการปฏิบัติงาน (Practice Pattern)',
            list: [
                `**แพทย์ที่รับผู้ป่วย IPD จริง** ${ipdAdmitting} ท่าน (${Math.round(ipdAdmitting / Math.max(1, doctors.length) * 100)}%) — รวม ${fmt(s.ipd_admissions)} Admission ในช่วงนี้`,
                `**แพทย์เฉพาะ OPD (ไม่รับ IPD เลย)** ${opdOnly} ท่าน (${Math.round(opdOnly / Math.max(1, doctors.length) * 100)}%)`,
                `**แพทย์ IPD-heavy (IPD > 5% ของ Visit)** ${ipdHeavy} ท่าน (${Math.round(ipdHeavy / Math.max(1, doctors.length) * 100)}%) — มีสัดส่วน Admission มากกว่าค่าเฉลี่ยชุมชน`,
                `**แพทย์ Balanced (รับ IPD แต่ ≤ 5%)** ${balancedIpd} ท่าน (${Math.round(balancedIpd / Math.max(1, doctors.length) * 100)}%) — ดูแลทั้ง OPD และ IPD ในสัดส่วนปกติ`,
                `**การประเมิน**: ${ipdAdmitting >= 10 ? `มีแพทย์รองรับ IPD เพียงพอ (${ipdAdmitting} ท่าน)` : ipdAdmitting >= 5 ? `แพทย์ IPD พอใช้แต่ควรเสริม (${ipdAdmitting} ท่าน)` : `⚠ แพทย์ IPD น้อยเกินไป (${ipdAdmitting} ท่าน) — เสี่ยงต่อความต่อเนื่องการดูแล`}`,
                `**Cross-coverage**: ${opdOnly > doctors.length * 0.6 ? '⚠ แพทย์ส่วนใหญ่ไม่รับ IPD — ควรเพิ่มแพทย์หมุนเวียน IPD' : 'การหมุนเวียน OPD/IPD อยู่ในเกณฑ์ปกติ'}`,
            ],
            color: ipdAdmitting < 5 ? '#f43f5e' : opdOnly > doctors.length * 0.6 ? '#f59e0b' : '#10b981',
        },
        {
            icon: '⚠',
            title: '6. ความเสี่ยงที่ต้องจับตา (Key Risk Signals)',
            list: [
                `**Top-Doctor Dependency** — Top 1 รับ ${Math.round((topDoctor?.total_visits || 0) / Math.max(1, totalVisitsAll) * 100)}% ของผู้ป่วย, ${topShare}% ของรายได้ ${Math.round((topDoctor?.total_visits || 0) / Math.max(1, totalVisitsAll) * 100) > 20 ? '⚠ ความเสี่ยงสูงหากแพทย์ลาออก/ลาป่วย' : '✓ อยู่ในเกณฑ์ยอมรับได้'}`,
                `**Burnout Risk** — แพทย์ที่ปฏิบัติ > 1,500 ราย/${periodDays} วัน มี ${doctors.filter(d => d.total_visits > 1500).length} ท่าน ${doctors.filter(d => d.total_visits > 1500).length > 3 ? '⚠ หลายท่านเสี่ยง Burnout สูง' : ''}`,
                `**Workload Inequality (Gini)** = ${giniPct}/100 ${giniPct > 50 ? '⚠ เหลื่อมล้ำสูง' : '✓ ปกติ'} · หากเกิน 60 ควรดำเนินการทันที`,
                `**Clinical Variation** — ช่วง Orders/Visit ของแพทย์แต่ละท่านต่างกัน ${highOrderer && lowOrderer && lowOrderer.orders_per_visit > 0 ? Math.round(highOrderer.orders_per_visit / Math.max(0.01, lowOrderer.orders_per_visit)) : '—'} เท่า — ควรตรวจสอบ Appropriateness`,
                `**Revenue Concentration** — Top 20% ของแพทย์สร้าง ${top20Share}% ของรายได้ ${top20Share > 80 ? '⚠ พึ่งพากลุ่มแพทย์จำกัด' : '✓ กระจายดี'}`,
            ],
            color: giniPct > 50 || topShare > 25 ? '#f43f5e' : '#f59e0b',
        },
        {
            icon: '🎯',
            title: '7. ข้อเสนอแนะและมาตรการเชิงบริหาร (Recommendations)',
            list: [
                avgPerDoctor > 100 ? `**มาตรการเร่งด่วน** — ภาระงานสูงเกินเกณฑ์ (${avgPerDoctor} ราย/ท่าน) · ควรพิจารณาจ้างแพทย์เพิ่ม หรือขยายชั่วโมงคลินิก/ขยาย Sub-specialty` : null,
                giniPct > 50 ? `**Workload Rebalancing** — Gini ${giniPct}/100 บ่งชี้การกระจายไม่สมดุล · จัด Scheduling ให้หมุนเวียนและกำหนด Quota ต่อแพทย์` : null,
                topShare > 25 ? `**ลดการพึ่งพา Top Doctor** — ${topDoctor?.name} สร้างรายได้ ${topShare}% · พัฒนาแพทย์รุ่นถัดไปให้พร้อมทดแทน (Succession Plan)` : null,
                highOrderer && highOrderer.orders_per_visit > 2 ? `**ทบทวน Clinical Pathway** — Orders/Visit สูงผิดปกติ · ตั้ง Clinical Guidelines ร่วมเพื่อลด Over-investigation` : null,
                ipdAdmitting < 5 ? `**เพิ่มแพทย์ IPD** — ปัจจุบันมีแพทย์ที่รับ IPD เพียง ${ipdAdmitting} ท่าน · เสี่ยงต่อความต่อเนื่องการดูแลผู้ป่วยใน` : null,
                `**ระบบแรงจูงใจ (Incentive)** — ออกแบบ Bonus ที่สอดคล้องกับผลผลิตและคุณภาพ (ไม่ใช่ปริมาณอย่างเดียว) · เชื่อมโยงกับตัวชี้วัด HA/KPI`,
                `**Cross-training** — ลดความเสี่ยงจากการขาดบุคลากร · แพทย์ควรมีทักษะครอบคลุม 2–3 โรคกลุ่มหลัก`,
                `**ติดตามรายเดือน** — ใช้ Dashboard นี้ทบทวน Workload Balance และ Revenue Concentration เป็นประจำ`,
            ].filter(Boolean),
            color: '#7c3aed',
        },
    ];

    return {
        headline,
        headlineColor: hlColor,
        kpi: [
            { label: 'แพทย์ปฏิบัติหน้าที่', value: fmt(activeDoctors), sub: `OPD ${activeDoctors} · IPD ${s.ipd_doctors || 0}`, color: '#0284c7' },
            { label: 'ผู้ป่วย OPD', value: fmt(totalVisits), sub: `เฉลี่ย ${avgPerDoctor} · Median ${medianVisits}`, color: '#7c3aed' },
            { label: 'ผู้ป่วย IPD', value: fmt(s.ipd_admissions), sub: `แพทย์ IPD ${s.ipd_doctors || 0} ท่าน`, color: '#db2777' },
            { label: 'Gini Coefficient', value: `${giniPct}/100`, sub: giniPct > 50 ? 'เหลื่อมล้ำสูง' : giniPct > 35 ? 'เหลื่อมล้ำปานกลาง' : 'สมดุล', color: giniPct > 50 ? '#f43f5e' : giniPct > 35 ? '#f59e0b' : '#10b981' },
            { label: 'Top 20% Share', value: `${top20Share}%`, sub: top20Share > 80 ? 'Pareto — พึ่งพาสูง' : 'กระจายดีกว่าปกติ', color: top20Share > 80 ? '#f59e0b' : '#10b981' },
            { label: 'รายได้รวม', value: `฿${fmt(Math.round(totalRevenue / 1e6))}M`, sub: `Top 1: ${topShare}%`, color: '#10b981' },
        ],
        sections,
        footerLeft: `${doctors.length} แพทย์ · ${data.period.days ? `ย้อนหลัง ${data.period.days} วัน` : `${data.period.start} → ${data.period.end}`} · HOSxP XE · อัปเดต ${new Date().toLocaleString('th-TH')}`,
    };
}

// ─────────────────────────────────────────────────────────────
// AI Recommendation Card — rich multi-field card for each deep recommendation
// ─────────────────────────────────────────────────────────────
function AIRecommendationCard({ rec: r }) {
    const priorityStyle = {
        P0: { bg: 'rgba(220,38,38,.1)', color: '#dc2626', label: 'P0 · เร่งด่วน' },
        P1: { bg: 'rgba(245,158,11,.1)', color: '#d97706', label: 'P1 · สำคัญ' },
        P2: { bg: 'rgba(59,130,246,.1)', color: '#2563eb', label: 'P2 · ปกติ' },
    }[r.priority] || { bg: 'rgba(107,114,128,.1)', color: '#6b7280', label: 'R · ทั่วไป' };

    const fieldLabel = (t) => (
        <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
            {t}
        </div>
    );

    return (
        <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderLeft: `4px solid ${r.color}`, borderRadius: '10px', padding: '14px 18px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '18px' }}>{r.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{r.title}</span>
                <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '99px', background: priorityStyle.bg, color: priorityStyle.color, letterSpacing: '0.03em' }}>
                    {priorityStyle.label}
                </span>
                {r.timeline && (
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', background: 'rgba(107,114,128,.08)', color: 'var(--md-text-secondary)' }}>
                        ⏱ {r.timeline}
                    </span>
                )}
            </div>

            {/* Situation */}
            {r.situation && (
                <div style={{ marginBottom: '10px' }}>
                    {fieldLabel('📌 สถานการณ์ปัจจุบัน')}
                    <div style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--md-text-primary)', fontWeight: 500 }}>{r.situation}</div>
                </div>
            )}

            {/* Root cause */}
            {r.rootCause && (
                <div style={{ marginBottom: '10px', padding: '8px 12px', background: 'rgba(245,158,11,.04)', borderRadius: '8px' }}>
                    {fieldLabel('🔍 สาเหตุที่เป็นไปได้ (Root Cause Hypothesis)')}
                    <div style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--md-text-primary)', fontWeight: 500 }}>{r.rootCause}</div>
                </div>
            )}

            {/* Actions */}
            {r.actions && r.actions.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    {fieldLabel('🎯 แผนปฏิบัติการ (Action Plan)')}
                    <ol style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                        {r.actions.map((a, i) => (
                            <li key={i} style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--md-text-primary)', fontWeight: 500, marginBottom: '4px' }}
                                dangerouslySetInnerHTML={{ __html: a.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }} />
                        ))}
                    </ol>
                </div>
            )}

            {/* Target + Owner grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                {r.target && (
                    <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,.06)', borderRadius: '8px', borderLeft: '2px solid #10b981' }}>
                        {fieldLabel('✅ เป้าหมาย / KPI')}
                        <div style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'var(--md-text-primary)', fontWeight: 600 }}>{r.target}</div>
                    </div>
                )}
                {r.owner && (
                    <div style={{ padding: '8px 12px', background: 'rgba(124,58,237,.04)', borderRadius: '8px', borderLeft: '2px solid #7c3aed' }}>
                        {fieldLabel('👥 ผู้รับผิดชอบ')}
                        <div style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'var(--md-text-primary)', fontWeight: 600 }}>{r.owner}</div>
                    </div>
                )}
                {r.expectedOutcome && (
                    <div style={{ padding: '8px 12px', background: 'rgba(14,165,233,.04)', borderRadius: '8px', borderLeft: '2px solid #0ea5e9' }}>
                        {fieldLabel('🎁 ผลลัพธ์ที่คาดหวัง')}
                        <div style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'var(--md-text-primary)', fontWeight: 600 }}>{r.expectedOutcome}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// Per-Doctor Deep Analysis Card (renders inside expanded row)
// ─────────────────────────────────────────────────────────────
function DoctorDeepCard({ doctor: d, analysis: a, rank }) {
    const statTile = (label, value, sub, color) => (
        <div style={{ flex: '1 1 180px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: `3px solid ${color}`, borderRadius: '10px', padding: '10px 14px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)', marginTop: '2px' }}>{value}</div>
            {sub && <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>{sub}</div>}
        </div>
    );
    const section = (icon, title, items, color) => (
        <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderLeft: `3px solid ${color}`, borderRadius: '10px', padding: '10px 14px', flex: '1 1 300px', minWidth: '300px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)', marginBottom: '6px' }}>
                {icon} {title}
            </div>
            {items.length === 0
                ? <div style={{ fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>— ไม่มีข้อมูลในหมวดนี้ —</div>
                : <ul style={{ margin: 0, paddingLeft: '18px' }}>
                    {items.map((t, i) => (
                        <li key={i} style={{ fontSize: '12px', color: 'var(--md-text-primary)', lineHeight: 1.6, fontWeight: 500, marginBottom: '3px' }}>{t}</li>
                    ))}
                </ul>
            }
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ width: '3px', height: '20px', background: 'linear-gradient(180deg, #0284c7, #7c3aed)', borderRadius: '99px' }} />
                <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🔍 การวิเคราะห์เชิงลึก — {d.name || d.code}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(2,132,199,.1)', color: '#0284c7' }}>
                    อันดับ {rank} · Percentile {a.visitPercentile}
                </span>
            </div>

            {/* Stat Tiles */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {statTile('รูปแบบการปฏิบัติ (Pattern)', a.pattern, `IPD:OPD ratio`, a.patternColor)}
                {statTile('ระดับภาระงาน', a.workloadLevel, `${a.dailyVisits.toFixed(1)} ราย/วัน`, a.workloadColor)}
                {statTile('ประสิทธิภาพคำสั่งตรวจ', a.ordEff, `Orders/Visit = ${d.orders_per_visit} (ค่ากลาง ${a.medOrdersPerVisit.toFixed(2)})`, '#0ea5e9')}
                {statTile('ประสิทธิภาพรายได้', a.revEff, `฿${fmt(d.revenue_per_visit)}/ราย (ค่ากลาง ฿${fmt(Math.round(a.medRevPerVisit))})`, '#10b981')}
            </div>

            {/* 3-column insight sections */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {section('✅', 'จุดเด่น (Strengths)', a.strengths, '#10b981')}
                {section('⚠', 'ประเด็นควรเฝ้าระวัง (Concerns)', a.concerns, '#f59e0b')}
                {section('🎯', 'ข้อเสนอแนะเฉพาะบุคคล', a.recs, '#7c3aed')}
            </div>

            {/* AI Deep Recommendations — structured multi-field cards */}
            {a.deepRecs && a.deepRecs.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{ fontSize: '14px' }}>🧠</span>
                        <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                            AI แนะนำเชิงลึก — แผนปฏิบัติ ({a.deepRecs.length} ประเด็น)
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}>
                            Rule-based AI · Evidence-informed
                        </span>
                    </div>
                    {a.deepRecs.map((r, idx) => (
                        <AIRecommendationCard key={idx} rec={r} />
                    ))}
                </div>
            )}

            {/* Summary paragraph */}
            <div style={{ background: 'rgba(2,132,199,.04)', border: '1px dashed rgba(2,132,199,.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', lineHeight: 1.7, color: 'var(--md-text-primary)', fontWeight: 500 }}>
                <b>📝 สรุปเชิงบริหาร:</b> {d.name || d.code} ปฏิบัติหน้าที่ในรูปแบบ <b>{a.pattern}</b> · รับผู้ป่วย OPD {fmt(d.opd_visits)} ราย · IPD {fmt(d.ipd_admissions)} ราย · สั่งตรวจ Lab {fmt(d.lab_orders)} คำสั่ง · X-Ray {fmt(d.xray_orders)} คำสั่ง · รายได้รวม ฿{fmt(d.total_revenue)} (฿{fmt(d.revenue_per_visit)}/ราย) · อันดับผลผลิต {a.visitRank}/{a.totalDoctors} · อันดับรายได้ {a.revRank}/{a.totalDoctors} · ภาระงาน<b style={{ color: a.workloadColor }}>{a.workloadLevel}</b> · Orders/Visit {a.ordEff} · Revenue/Visit {a.revEff} · {a.strengths.length > 0 ? `จุดเด่น ${a.strengths.length} ประเด็น` : 'ไม่พบจุดเด่นเด่นชัด'} · {a.concerns.length > 0 ? `ต้องเฝ้าระวัง ${a.concerns.length} ประเด็น` : 'ไม่มีประเด็นน่ากังวล'}
            </div>
        </div>
    );
}

function DoctorActivityTab() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('preset'); // 'preset' | 'custom'
    const [days, setDays] = useState(1);
    const [startDate, setStartDate] = useState(todayISO());
    const [endDate, setEndDate] = useState(todayISO());
    const [sortBy, setSortBy] = useState('total_visits');
    const [expandedRows, setExpandedRows] = useState(() => new Set());
    const [expandAll, setExpandAll] = useState(false);

    const toggleRow = useCallback((code) => {
        setExpandedRows(prev => {
            const next = new Set(prev);
            if (next.has(code)) next.delete(code); else next.add(code);
            return next;
        });
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const qs = mode === 'custom'
                ? `start=${startDate}&end=${endDate}`
                : `days=${days}`;
            const r = await fetch(`/api/doctor/activity-summary?${qs}`, { credentials: 'include' });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const d = await r.json();
            setData(d);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }, [mode, days, startDate, endDate]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const sortedDoctors = useMemo(() => {
        if (!data?.doctors) return [];
        return [...data.doctors].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
    }, [data, sortBy]);

    const chartData = useMemo(() => {
        if (!sortedDoctors.length) return [];
        return sortedDoctors.slice(0, 10).map(d => ({
            name: (d.name || '').replace(/^(นพ\.|พญ\.|ศ\.|รศ\.|ผศ\.)/, ''),
            OPD: d.opd_visits,
            IPD: d.ipd_admissions,
            Orders: d.total_orders,
        }));
    }, [sortedDoctors]);

    const trendData = useMemo(() => {
        if (!data?.trend_7d) return [];
        return data.trend_7d.map(t => ({
            date: new Date(t.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
            doctors: t.doctors,
            visits: t.visits,
        }));
    }, [data]);

    return (
        <div className="space-y-5 animate-fade-in pb-10">
            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #0284c7, #7c3aed)', borderRadius: '99px' }} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    👨‍⚕️ Doctor Product Activity — ผลผลิตและกิจกรรมของแพทย์
                </h2>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(2,132,199,.1)', color: '#0284c7' }}>
                    OPD · IPD · Orders · Revenue
                </span>
            </div>

            {/* ── Period Selector ── */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>ช่วงข้อมูล</span>

                {/* Preset vs custom toggle */}
                <div style={{ display: 'inline-flex', background: 'var(--md-bg)', border: '1px solid var(--md-border)', borderRadius: '8px', padding: '2px', gap: '2px' }}>
                    <button
                        type="button"
                        onClick={() => setMode('preset')}
                        style={{
                            padding: '5px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                            background: mode === 'preset' ? 'linear-gradient(135deg, #0284c7, #7c3aed)' : 'transparent',
                            color: mode === 'preset' ? '#fff' : 'var(--md-text-secondary)',
                        }}
                    >
                        ช่วงเวลา
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('custom')}
                        style={{
                            padding: '5px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                            background: mode === 'custom' ? 'linear-gradient(135deg, #0284c7, #7c3aed)' : 'transparent',
                            color: mode === 'custom' ? '#fff' : 'var(--md-text-secondary)',
                        }}
                    >
                        เลือกวันที่
                    </button>
                </div>

                {mode === 'preset' ? (
                    <select
                        value={days}
                        onChange={e => setDays(Number(e.target.value))}
                        style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '13px', fontWeight: 700, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}
                    >
                        <option value={1}>วันนี้</option>
                        <option value={7}>7 วันล่าสุด</option>
                        <option value={14}>14 วันล่าสุด</option>
                        <option value={30}>30 วันล่าสุด</option>
                        <option value={60}>60 วันล่าสุด</option>
                        <option value={90}>90 วันล่าสุด</option>
                    </select>
                ) : (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <input
                            type="date"
                            value={startDate}
                            max={endDate}
                            onChange={e => setStartDate(e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '13px', fontWeight: 700, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>ถึง</span>
                        <input
                            type="date"
                            value={endDate}
                            min={startDate}
                            max={todayISO()}
                            onChange={e => setEndDate(e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '13px', fontWeight: 700, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}
                        />
                    </div>
                )}

                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)', marginLeft: 'auto' }}>เรียงตาม</span>
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '13px', fontWeight: 700, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}
                >
                    <option value="total_visits">ผู้ป่วยทั้งหมด (รวม)</option>
                    <option value="opd_visits">OPD Visits</option>
                    <option value="ipd_admissions">IPD Admissions</option>
                    <option value="total_orders">Lab/X-Ray Orders</option>
                    <option value="total_revenue">รายได้รวม</option>
                </select>
            </div>

            {error && (
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(239,68,68,.08)', color: '#dc2626', fontSize: '13px', fontWeight: 700 }}>
                    ⚠ {error}
                </div>
            )}

            {loading && (
                <div className="rounded-2xl p-8 animate-pulse" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>กำลังโหลดข้อมูลกิจกรรมแพทย์...</div>
                </div>
            )}

            {/* ── AI Executive Analysis ── */}
            {!loading && data && (
                <ExecutiveAIPanel
                    title="AI วิเคราะห์ผลผลิตแพทย์ (สำหรับผู้บริหาร)"
                    subtitle="Doctor Productivity · Workload Balance · Revenue per Physician"
                    badge="📐 Rule-based Analysis"
                    accentColor="#0284c7"
                    headerGradient="linear-gradient(135deg, rgba(2,132,199,.10), rgba(124,58,237,.06))"
                    narrative={buildDoctorActivityNarrative(data)}
                />
            )}

            {/* ── Top 15 Doctor Productivity Chart ── */}
            {!loading && data && chartData.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '12px' }}>
                        📊 แพทย์ Top 10 เรียงตาม {sortBy === 'total_visits' ? 'ผู้ป่วยทั้งหมด' : sortBy === 'opd_visits' ? 'OPD Visits' : sortBy === 'ipd_admissions' ? 'IPD Admissions' : sortBy === 'total_orders' ? 'Lab/X-Ray Orders' : 'รายได้'}
                    </div>
                    <ResponsiveContainer width="100%" height={440}>
                        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 140 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-divider)" />
                            <XAxis dataKey="name" angle={-40} textAnchor="end" interval={0} height={140} tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                            <Tooltip contentStyle={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '8px', fontSize: '12px' }} />
                            <Legend />
                            <Bar dataKey="OPD" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="IPD" fill="#db2777" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="Orders" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* ── Daily Trend ── */}
            {!loading && data && trendData.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '12px' }}>
                        📈 แนวโน้มรายวัน 7 วันล่าสุด — จำนวนแพทย์ปฏิบัติหน้าที่และผู้ป่วย
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={trendData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--md-divider)" />
                            <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                            <Tooltip contentStyle={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '8px', fontSize: '12px' }} />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="doctors" stroke="#0284c7" strokeWidth={2} name="แพทย์" dot={{ r: 4 }} />
                            <Line yAxisId="right" type="monotone" dataKey="visits" stroke="#7c3aed" strokeWidth={2} name="ผู้ป่วย" dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* ── Doctor Productivity Table ── */}
            {!loading && data && sortedDoctors.length > 0 && (
                <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--md-border)', background: 'linear-gradient(135deg, rgba(2,132,199,.06), rgba(124,58,237,.04))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                                รายการแพทย์และกิจกรรม ({sortedDoctors.length} ท่าน)
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                                {mode === 'custom'
                                    ? `ช่วงข้อมูล ${startDate} → ${endDate} · คลิกที่แถวเพื่อดูการวิเคราะห์เชิงลึกรายแพทย์`
                                    : `ข้อมูลย้อนหลัง ${days} วัน · คลิกที่แถวเพื่อดูการวิเคราะห์เชิงลึกรายแพทย์`}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (expandAll) { setExpandedRows(new Set()); setExpandAll(false); }
                                else { setExpandedRows(new Set(sortedDoctors.map(d => d.code))); setExpandAll(true); }
                            }}
                            style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '12px', fontWeight: 800, cursor: 'pointer', background: expandAll ? 'linear-gradient(135deg, #0284c7, #7c3aed)' : 'var(--md-surface)', color: expandAll ? '#fff' : 'var(--md-text-primary)' }}
                        >
                            {expandAll ? '▼ ซ่อนการวิเคราะห์ทั้งหมด' : '▶ แสดงการวิเคราะห์เชิงลึกทุกแพทย์'}
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '900px' }}>
                            <thead>
                                <tr style={{ background: 'var(--md-surface-2)', borderBottom: '2px solid var(--md-border)' }}>
                                    <th style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px', width: '28px' }}></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>ลำดับ</th>
                                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>แพทย์</th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>OPD<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(ราย)</div></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>IPD<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(ราย)</div></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>Lab<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(คำสั่ง)</div></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>X-Ray<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(คำสั่ง)</div></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>Orders/Visit<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(คำสั่ง/ราย)</div></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>รายได้รวม<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(บาท)</div></th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>รายได้/ราย<div style={{ fontSize: '9px', fontWeight: 500, opacity: 0.7 }}>(บาท/ราย)</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedDoctors.map((d, i) => {
                                    const isExpanded = expandedRows.has(d.code);
                                    const analysis = isExpanded ? analyzeDoctor(d, sortedDoctors, mode === 'custom' ? Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1) : days) : null;
                                    return (
                                        <React.Fragment key={d.code || i}>
                                            <tr
                                                onClick={() => toggleRow(d.code)}
                                                style={{ borderBottom: '1px solid var(--md-divider)', background: isExpanded ? 'rgba(2,132,199,.05)' : (i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.02)'), cursor: 'pointer' }}
                                            >
                                                <td style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 800, color: '#0284c7', fontSize: '14px' }}>
                                                    {isExpanded ? '▼' : '▶'}
                                                </td>
                                                <td style={{ padding: '10px 12px', fontWeight: 800, color: i < 3 ? '#0284c7' : 'var(--md-text-tertiary)', fontSize: '12px' }}>
                                                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                                                </td>
                                                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                                                    <div>{d.name || d.code}</div>
                                                    {d.position && <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>{d.position}</div>}
                                                </td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#7c3aed' }}>{fmt(d.opd_visits)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#db2777' }}>{fmt(d.ipd_admissions)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>{fmt(d.lab_orders)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>{fmt(d.xray_orders)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: d.orders_per_visit > 3 ? '#f59e0b' : 'var(--md-text-secondary)' }}>{d.orders_per_visit}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, color: '#10b981' }}>฿{fmt(d.total_revenue)}</td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: 'var(--md-text-secondary)' }}>฿{fmt(d.revenue_per_visit)}</td>
                                            </tr>
                                            {isExpanded && analysis && (
                                                <tr style={{ background: 'rgba(2,132,199,.03)', borderBottom: '1px solid var(--md-divider)' }}>
                                                    <td colSpan={10} style={{ padding: '16px 24px' }}>
                                                        <DoctorDeepCard doctor={d} analysis={analysis} rank={i + 1} />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ padding: '10px 20px', borderTop: '1px solid var(--md-border)', fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                        <span>{data.data_source}</span>
                        <span>อัปเดต {data.as_of && new Date(data.as_of).toLocaleString('th-TH')}</span>
                    </div>
                </div>
            )}

            {!loading && data && sortedDoctors.length === 0 && (
                <div className="rounded-2xl p-8" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', marginBottom: '12px' }}>👨‍⚕️</div>
                    <div style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>ไม่พบข้อมูลกิจกรรมแพทย์ในช่วงที่เลือก</div>
                </div>
            )}
        </div>
    );
}

export default React.memo(DoctorActivityTab);
