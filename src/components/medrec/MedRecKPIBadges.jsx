// ============================================================
// MedRecKPIBadges — Professional KPI Cards with AI Descriptions
// Extracted from MedRecTab.jsx for maintainability
// ============================================================
import React from 'react';

/**
 * Professional KPI Badge Cards
 * 
 * Displays 5 core KPIs:
 * 1. OPD Coding Rate — (VN ที่มี ovstdiag ÷ VN ทั้งหมด) × 100
 * 2. IPD Coding Rate — (AN ที่มี iptdiag ÷ AN D/C 30d) × 100
 * 3. DRG Coverage — (AN ที่มี AdjRW ÷ AN D/C 30d) × 100
 * 4. Avg Coding Days — AVG(iptdiag.modify_datetime − ipt.dchdate)
 * 5. AI Composite Score — OPD×25% + IPD×30% + DRG×30% + SLA(+15)
 * 
 * Each card includes: meaning, formula, benchmark (HA/สปสช.), data source, and AI tip.
 * 
 * @param {Object} today - Today's MedRec data from API
 */
export default function MedRecKPIBadges({ today }) {
    const opdRate = today.quality_score || 0;
    const ipdRate = today.ipd_quality_score || 0;
    const drgRate = today.ipd_drg_score || 0;
    const codingDays = today.ipd_avg_coding_days || 0;
    const slaOk = codingDays <= 3;
    const compositeScore = Math.round((opdRate * 0.25) + (ipdRate * 0.30) + (drgRate * 0.30) + (slaOk ? 15 : 0));
    const csColor = compositeScore >= 80 ? '#059669' : compositeScore >= 60 ? '#f59e0b' : '#e11d48';
    const csLabel = compositeScore >= 80 ? 'ดีเยี่ยม' : compositeScore >= 60 ? 'ปานกลาง' : 'ต้องปรับปรุง';
    const todayTH = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
    const thirtyDayAgo = new Date(Date.now() - 30 * 86400000).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
    const todayShort = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

    const kpis = [
        {
            label: 'OPD Coding Rate', thLabel: 'อัตราสรุปรหัสโรค OPD',
            value: `${opdRate}%`, color: opdRate >= 80 ? '#059669' : opdRate >= 50 ? '#f59e0b' : '#e11d48', icon: '📋',
            desc: `สรุปแล้ว ${today.audit_coded || 0} / ${today.audit_total || 0} เคส`,
            meaning: 'วัดสัดส่วนผู้ป่วยนอกที่ได้รับการลงรหัสโรค (ICD-10) เทียบกับจำนวนการมารับบริการทั้งหมดในวันนี้',
            calc: '(VN ที่มี ovstdiag ÷ VN ทั้งหมดวันนี้) × 100',
            dataSource: 'ovst → ovstdiag (HOSxP XE)',
            period: `📅 ข้อมูลวันนี้ ${todayShort}`,
            target: '≥ 80%',
            benchmark: 'HA: ≥80% | สปสช.: ≥90%',
            aiTip: opdRate >= 80 ? 'อัตราดี — รักษาระดับนี้ไว้' : opdRate >= 50 ? 'ยังไม่ถึงเป้า ควรเร่ง Code ก่อนสิ้นวัน' : 'ต่ำมาก อาจส่งผลต่อการเบิกจ่าย สปสช.'
        },
        {
            label: 'IPD Coding Rate', thLabel: 'อัตราสรุปรหัสโรค IPD',
            value: `${ipdRate}%`, color: ipdRate >= 80 ? '#059669' : ipdRate >= 50 ? '#f59e0b' : '#e11d48', icon: '🏥',
            desc: `สรุปแล้ว ${today.ipd_audit_coded || 0} / ${today.ipd_audit_total || 0} AN`,
            meaning: 'วัดอัตราผู้ป่วยในที่จำหน่าย (D/C) แล้วได้รับการลงรหัสโรค ย้อนหลัง 30 วัน',
            calc: '(AN ที่มี iptdiag ÷ AN จำหน่ายทั้งหมด 30 วัน) × 100',
            dataSource: 'ipt → iptdiag (HOSxP XE)',
            period: `📅 ${thirtyDayAgo} – ${todayShort}`,
            target: '≥ 80%',
            benchmark: 'HA: ≥80% | สปสช.: ≥95%',
            aiTip: ipdRate >= 80 ? 'ผ่านเกณฑ์ — เน้นคุณภาพ Code' : 'ต่ำกว่าเกณฑ์ เสี่ยงค้างเบิก DRG'
        },
        {
            label: 'DRG Coverage', thLabel: 'ครอบคลุม DRG Grouper',
            value: `${drgRate}%`, color: drgRate >= 80 ? '#059669' : drgRate >= 50 ? '#f59e0b' : '#e11d48', icon: '🎯',
            desc: `DRG แล้ว ${today.ipd_drg_calculated || 0} / ${today.ipd_audit_total || 0} AN`,
            meaning: 'วัดสัดส่วน AN ที่ผ่าน DRG Grouper คำนวณ AdjRW แล้ว — สำคัญต่อรายได้ สปสช./UC',
            calc: '(AN ที่มี AdjRW ÷ AN จำหน่าย 30 วัน) × 100',
            dataSource: 'ipt + DRG Grouper (HOSxP XE)',
            period: `📅 ${thirtyDayAgo} – ${todayShort}`,
            target: '≥ 90%',
            benchmark: 'สปสช.: ≥95% | HA: ≥90%',
            aiTip: drgRate >= 90 ? 'ดีเยี่ยม — ทุก AN ได้ AdjRW' : 'เร่งส่ง Grouper เพื่อไม่ให้ตก AdjRW'
        },
        {
            label: 'Avg Coding Days', thLabel: 'ระยะเวลาสรุป Code เฉลี่ย',
            value: `${codingDays} วัน`, color: slaOk ? '#059669' : '#e11d48', icon: '⏱️',
            desc: `${slaOk ? '✅ อยู่ในเกณฑ์ SLA' : '❌ เกินเวลา SLA'} (เป้า ≤ 3 วัน)`,
            meaning: 'ระยะเวลาเฉลี่ยตั้งแต่ผู้ป่วยจำหน่าย (D/C) จนถึงวันที่ Coder ลงรหัสโรคเสร็จ',
            calc: 'AVG(iptdiag.modify_datetime − ipt.dchdate) [วัน]',
            dataSource: 'ipt.dchdate → iptdiag.modify_datetime',
            period: `📅 ${thirtyDayAgo} – ${todayShort}`,
            target: '≤ 3 วัน',
            benchmark: 'HA: ≤3 วัน | Best Practice: ≤1 วัน',
            aiTip: slaOk ? 'ทันเวลา — ลดความเสี่ยงค้าง Claim' : 'เกิน SLA ควรเพิ่ม Coder หรือลด Backlog'
        },
        {
            label: 'AI Composite Score', thLabel: 'คะแนนรวม AI',
            value: `${compositeScore}`, color: csColor, icon: '🧠', sub: csLabel,
            desc: `OPD(${opdRate}×0.25) + IPD(${ipdRate}×0.30) + DRG(${drgRate}×0.30) + SLA(${slaOk ? '+15' : '0'})`,
            meaning: 'คะแนนรวมจาก AI ที่ถ่วงน้ำหนักระหว่าง 4 KPI หลัก เพื่อประเมินภาพรวมคุณภาพเวชระเบียน',
            calc: 'OPD×25% + IPD×30% + DRG×30% + (Coding≤3d → +15)',
            dataSource: 'คำนวณจาก KPI 1-4 (Composite)',
            period: `📅 ประมวลผล ${todayTH}`,
            target: '≥ 80 คะแนน',
            benchmark: 'BCH Internal: ≥80 = ดีเยี่ยม',
            aiTip: compositeScore >= 80 ? 'ภาพรวมดีเยี่ยม ทุก KPI ผ่านเกณฑ์' : compositeScore >= 60 ? 'ปานกลาง — จุดอ่อนอยู่ที่ KPI ที่ต่ำที่สุด' : 'ต้องปรับปรุงเร่งด่วน — ดู KPI แต่ละตัว'
        },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px' }}>
            {kpis.map((k, i) => (
                <div key={i} className="glass-card" style={{ padding: '12px 14px', borderTop: `3px solid ${k.color}`, cursor: 'default', transition: 'all 0.25s', position: 'relative' }}>
                    {/* Top: Icon + Value */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <div style={{ fontSize: '20px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', background: `${k.color}12`, flexShrink: 0 }}>{k.icon}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '22px', fontWeight: 900, color: k.color, lineHeight: 1 }}>{k.value}</div>
                            {k.sub && <span style={{ fontSize: '8px', fontWeight: 700, color: k.color, background: `${k.color}15`, padding: '1px 6px', borderRadius: '3px' }}>{k.sub}</span>}
                        </div>
                    </div>

                    {/* Label */}
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '1px' }}>{k.thLabel}</div>
                    <div style={{ fontSize: '8px', fontWeight: 600, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>{k.label}</div>

                    {/* Description Box */}
                    <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.025)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '8.5px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.6, marginBottom: '5px' }}>
                            💡 {k.meaning}
                        </div>
                        <div style={{ fontSize: '9px', color: 'var(--md-text-primary)', fontWeight: 700, marginBottom: '4px' }}>
                            {k.desc}
                        </div>
                        <div style={{ fontSize: '8px', color: '#0f766e', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", background: 'rgba(15,118,110,0.06)', padding: '3px 6px', borderRadius: '4px', marginBottom: '4px' }}>
                            📐 {k.calc}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px', flexWrap: 'wrap', gap: '2px' }}>
                            <span style={{ fontSize: '8px', color: k.color, fontWeight: 800 }}>🎯 เป้า: {k.target}</span>
                            <span style={{ fontSize: '7.5px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>📊 {k.benchmark}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2px' }}>
                            <span style={{ fontSize: '7.5px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>🗄️ {k.dataSource}</span>
                            <span style={{ fontSize: '7.5px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.period}</span>
                        </div>
                    </div>

                    {/* AI Tip */}
                    <div style={{ marginTop: '6px', padding: '4px 8px', borderRadius: '6px', background: `${k.color}08`, border: `1px solid ${k.color}15`, display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                        <span style={{ fontSize: '9px' }}>🤖</span>
                        <span style={{ fontSize: '8px', color: k.color, fontWeight: 600, lineHeight: 1.5 }}>{k.aiTip}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
