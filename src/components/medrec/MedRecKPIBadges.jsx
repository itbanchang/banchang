// ============================================================
// MedRecKPIBadges — Executive-Grade KPI Dashboard
// Premium glassmorphism with animated rings & AI insights
// ============================================================
import React, { useState } from 'react';

export default function MedRecKPIBadges({ today }) {
    const [expandedIdx, setExpandedIdx] = useState(null);

    const opdRate = today.quality_score || 0;
    const ipdRate = today.ipd_quality_score || 0;
    const drgRate = today.ipd_drg_score || 0;
    const codingDays = today.ipd_avg_coding_days || 0;
    const slaOk = codingDays <= 3;
    const compositeScore = Math.round((opdRate * 0.25) + (ipdRate * 0.30) + (drgRate * 0.30) + (slaOk ? 15 : 0));
    const csColor = compositeScore >= 80 ? '#10b981' : compositeScore >= 60 ? '#f59e0b' : '#ef4444';
    const csLabel = compositeScore >= 80 ? 'ดีเยี่ยม' : compositeScore >= 60 ? 'ปานกลาง' : 'ต้องปรับปรุง';

    // AI-derived
    const coders = today.ipd_coders_fiscal || [];
    const totalRW = Number(today.ipd_total_rw || 0);
    const avgRW = Number(today.ipd_avg_rw || 1);
    const ipdTotal = Number(today.ipd_audit_total || 0);
    const avgCCRate = coders.length > 0 ? (coders.reduce((s, c) => s + Number(c.cc_rate || 0), 0) / coders.length) : 0;
    const ccColor = avgCCRate >= 1.0 ? '#10b981' : avgCCRate >= 0.5 ? '#f59e0b' : '#ef4444';
    const estRevenuePerRW = 8350;
    const totalEstRevenue = Math.round(totalRW * estRevenuePerRW);
    const activeCoders = coders.map(c => Number(c.current_month_total || 0)).filter(v => v > 0);
    const maxLoad = activeCoders.length > 0 ? Math.max(...activeCoders) : 0;
    const avgLoad = activeCoders.length > 0 ? activeCoders.reduce((a, b) => a + b, 0) / activeCoders.length : 0;
    const balanceScore = activeCoders.length >= 2 && maxLoad > 0 ? Math.min(100, Math.round((avgLoad / maxLoad) * 100)) : 100;
    const balanceColor = balanceScore >= 70 ? '#10b981' : balanceScore >= 50 ? '#f59e0b' : '#ef4444';

    // SVG Ring for score
    const ScoreRing = ({ value, max = 100, color, size = 56, strokeWidth = 5 }) => {
        const r = (size - strokeWidth) / 2;
        const circ = 2 * Math.PI * r;
        const pct = Math.min(value / max, 1);
        return (
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }} />
            </svg>
        );
    };

    const kpis = [
        {
            thLabel: 'คะแนนรวม AI', label: 'AI COMPOSITE',
            value: compositeScore, unit: '/100', color: csColor, icon: '🧠', badge: csLabel,
            pct: compositeScore, hero: true,
            desc: `OPD(${opdRate}) + IPD(${ipdRate}) + DRG(${drgRate}) + SLA(${slaOk ? '✓' : '✗'})`,
            meaning: 'คะแนนถ่วงน้ำหนักจาก 4 KPI หลัก — ภาพรวมคุณภาพเวชระเบียน',
            target: '≥ 80', benchmark: 'BCH: ≥80 = ดีเยี่ยม',
            aiTip: compositeScore >= 80 ? '✅ ภาพรวมยอดเยี่ยม ทุก KPI ผ่านเกณฑ์' : compositeScore >= 60 ? '⚠️ ปานกลาง — ปรับ KPI ที่ต่ำที่สุด' : '🚨 ต้องปรับปรุงเร่งด่วน'
        },
        {
            thLabel: 'สรุปรหัส OPD', label: 'OPD CODING',
            value: opdRate, unit: '%', color: opdRate >= 80 ? '#10b981' : opdRate >= 50 ? '#f59e0b' : '#ef4444', icon: '📋',
            pct: opdRate,
            desc: `สรุปแล้ว ${today.audit_coded || 0} / ${today.audit_total || 0} เคส`,
            meaning: 'สัดส่วน OPD ที่ลงรหัส ICD-10 แล้ว',
            target: '≥ 80%', benchmark: 'HA ≥80% | สปสช. ≥90%',
            aiTip: opdRate >= 80 ? '✅ ผ่านเกณฑ์ — รักษาระดับ' : '⚠️ ต่ำกว่าเกณฑ์ — เร่ง Code'
        },
        {
            thLabel: 'สรุปรหัส IPD', label: 'IPD CODING',
            value: ipdRate, unit: '%', color: ipdRate >= 80 ? '#10b981' : ipdRate >= 50 ? '#f59e0b' : '#ef4444', icon: '🏥',
            pct: ipdRate,
            desc: `สรุปแล้ว ${today.ipd_audit_coded || 0} / ${today.ipd_audit_total || 0} AN (30 วัน)`,
            meaning: 'อัตราผู้ป่วยในที่ลง ICD-10 หลัง D/C',
            target: '≥ 80%', benchmark: 'HA ≥80% | สปสช. ≥95%',
            aiTip: ipdRate >= 80 ? '✅ ผ่านเกณฑ์' : '⚠️ เสี่ยงค้างเบิก DRG'
        },
        {
            thLabel: 'ครอบคลุม DRG', label: 'DRG COVERAGE',
            value: drgRate, unit: '%', color: drgRate >= 80 ? '#10b981' : drgRate >= 50 ? '#f59e0b' : '#ef4444', icon: '🎯',
            pct: drgRate,
            desc: `DRG แล้ว ${today.ipd_drg_calculated || 0} / ${today.ipd_audit_total || 0} AN`,
            meaning: 'AN ที่ผ่าน DRG Grouper คำนวณ AdjRW',
            target: '≥ 90%', benchmark: 'สปสช. ≥95% | HA ≥90%',
            aiTip: drgRate >= 90 ? '✅ ทุก AN ได้ AdjRW' : '⚠️ เร่ง Grouper'
        },
        {
            thLabel: 'ระยะสรุป Code', label: 'CODING SLA',
            value: codingDays, unit: 'วัน', color: slaOk ? '#10b981' : codingDays > 7 ? '#ef4444' : '#f59e0b', icon: '⏱️',
            pct: Math.max(0, 100 - (codingDays / 7) * 100),
            desc: slaOk ? '✅ ในเกณฑ์ SLA' : '❌ เกิน SLA (เป้า ≤3 วัน)',
            meaning: 'เฉลี่ยวันจาก D/C ถึง Code เสร็จ',
            target: '≤ 3 วัน', benchmark: 'HA ≤3 วัน | Best ≤1 วัน',
            aiTip: slaOk ? '✅ ทันเวลา — ลดเสี่ยง Claim' : '🚨 เกิน SLA — เร่ง Backlog'
        },
        {
            thLabel: 'อัตราจับ CC/MCC', label: 'CC/MCC CAPTURE',
            value: avgCCRate.toFixed(2), unit: '/เคส', color: ccColor, icon: '💎',
            pct: Math.min(avgCCRate / 2 * 100, 100),
            desc: `เฉลี่ย CC/MCC ${avgCCRate.toFixed(2)} ต่อเคส (${coders.length} Coders)`,
            meaning: 'จำนวน CC/MCC เฉลี่ยที่ Coder ลงต่อเคส',
            target: '≥ 1.0/เคส', benchmark: 'Best: 1.2–2.0',
            aiTip: avgCCRate >= 1.0 ? '✅ จับ CC/MCC ดี — Revenue สูงสุด' : '⚠️ อาจตกหล่น CC/MCC → Revenue Leak'
        },
        {
            thLabel: 'รายได้ประมาณการ', label: 'EST. REVENUE',
            value: `฿${totalEstRevenue.toLocaleString()}`, unit: '', color: '#818cf8', icon: '💰',
            pct: 75, noRing: true,
            desc: `Total RW: ${totalRW} × ฿${estRevenuePerRW.toLocaleString()}/RW`,
            meaning: 'ประมาณการรายได้ DRG (RW × อัตราเหมาจ่าย)',
            target: 'สูงสุด', benchmark: `Avg RW: ${avgRW} | สปสช. ≈฿8,350/RW`,
            aiTip: avgRW >= 2.0 ? '💡 เคสซับซ้อน — ตรวจ CC/MCC ให้ครบ' : '💡 หาโอกาสจาก CDI Review'
        },
        {
            thLabel: 'สมดุลงาน Coder', label: 'WORKLOAD BALANCE',
            value: balanceScore, unit: '%', color: balanceColor, icon: '⚖️',
            pct: balanceScore,
            desc: activeCoders.length >= 2 ? `โหลดงานเฉลี่ย ${avgLoad.toFixed(1)} ต่อราย (Max: ${maxLoad})` : (activeCoders.length === 1 ? 'มีผู้ปฏิบัติงาน 1 ท่านในเดือนนี่' : 'ยังไม่มีข้อมูลเดือนนี้'),
            meaning: 'ความสมดุลปริมาณงานระหว่าง Coder ที่ Active ในเดือนนี้',
            target: '≥ 70%', benchmark: 'Best: ≥80%',
            aiTip: balanceScore >= 70 ? '✅ ทีมงานกระจายเคสได้สมดุล' : '⚠️ งานกระจุกตัว — ควรเกลี่ยเคสให้ทั่วถึง'
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* ━━━ Hero Card: AI Composite Score ━━━ */}
            {(() => {
                const hero = kpis[0];
                return (
                    <div
                        className="glass-card"
                        style={{
                            padding: '1.25rem 1.5rem',
                            background: 'linear-gradient(135deg, rgba(17,24,39,0.97) 0%, rgba(30,41,59,0.95) 100%)',
                            border: `1px solid ${hero.color}40`,
                            borderRadius: '20px',
                            position: 'relative', overflow: 'hidden',
                        }}
                    >
                        {/* Aurora Glow */}
                        <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '200px', background: `radial-gradient(ellipse, ${hero.color}20 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '200px', height: '200px', background: `radial-gradient(circle, ${hero.color}10 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {/* Score Ring */}
                            <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                                <ScoreRing value={hero.pct} color={hero.color} size={80} strokeWidth={6} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{hero.value}</div>
                                    <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>/100</div>
                                </div>
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>{hero.icon} {hero.thLabel}</span>
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: hero.color, background: `${hero.color}20`, padding: '2px 8px', borderRadius: '99px' }}>{hero.badge}</span>
                                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{hero.label}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, lineHeight: 1.5 }}>{hero.desc}</p>
                                <div style={{ marginTop: '6px', padding: '4px 10px', borderRadius: '8px', background: `${hero.color}10`, border: `1px solid ${hero.color}20`, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ fontSize: '10px' }}>🤖</span>
                                    <span style={{ fontSize: '10px', color: hero.color, fontWeight: 700 }}>{hero.aiTip}</span>
                                </div>
                            </div>

                            {/* Mini Gauges */}
                            <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                                {kpis.slice(1, 5).map((k, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                                            <ScoreRing value={k.pct} color={k.color} size={44} strokeWidth={4} />
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '10px', fontWeight: 900, color: '#fff' }}>{k.icon}</div>
                                        </div>
                                        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginTop: '2px', whiteSpace: 'nowrap' }}>{k.thLabel}</div>
                                        <div style={{ fontSize: '11px', fontWeight: 900, color: k.color }}>{k.value}{k.unit !== '/100' && k.unit !== '/เคส' ? k.unit : ''}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* ━━━ Section 1: Quality & Coverage ━━━ */}
            <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingLeft: '4px' }}>
                    <div style={{ width: '4px', height: '14px', background: '#0ea5e9', borderRadius: '4px' }} />
                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>📊 Quality & Compliance</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
                    {kpis.slice(1, 4).map((k, i) => {
                        const idx = i + 1;
                        const isExpanded = expandedIdx === idx;
                        return (
                            <div
                                key={idx}
                                className="glass-card"
                                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                                style={{
                                    padding: '14px 16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative', overflow: 'hidden',
                                    borderTop: `3px solid ${k.color}`,
                                    ...(isExpanded ? { boxShadow: `0 0 20px ${k.color}15, 0 8px 30px rgba(0,0,0,0.15)` } : {}),
                                }}
                            >
                                {/* Ambient Glow */}
                                <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '70px', height: '70px', background: `radial-gradient(circle, ${k.color}15 0%, transparent 70%)`, filter: 'blur(15px)', pointerEvents: 'none' }} />

                                {/* Top: Ring + Value */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                                    {!k.noRing ? (
                                        <div style={{ position: 'relative', width: '46px', height: '46px', flexShrink: 0 }}>
                                            <ScoreRing value={k.pct} color={k.color} size={46} strokeWidth={4} />
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px' }}>{k.icon}</div>
                                        </div>
                                    ) : (
                                        <div style={{ width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `${k.color}15`, fontSize: '20px', flexShrink: 0 }}>{k.icon}</div>
                                    )}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                            <span style={{ fontSize: '22px', fontWeight: 900, color: k.color, lineHeight: 1 }}>{k.value}</span>
                                            {k.unit && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{k.unit}</span>}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : '' }}>▼</span>
                                </div>

                                {/* Labels */}
                                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '2px' }}>{k.thLabel}</div>
                                <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)', letterSpacing: '0.06em', marginBottom: '6px' }}>{k.label}</div>

                                {/* Description */}
                                <div style={{ fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 600, marginBottom: '6px', lineHeight: 1.4 }}>{k.desc}</div>

                                {/* AI Tip */}
                                <div style={{ padding: '4px 8px', borderRadius: '6px', background: `${k.color}08`, border: `1px solid ${k.color}15`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '10px' }}>🤖</span>
                                    <span style={{ fontSize: '10px', color: k.color, fontWeight: 700 }}>{k.aiTip}</span>
                                </div>

                                {/* Expandable Detail */}
                                <div style={{
                                    maxHeight: isExpanded ? '160px' : '0', overflow: 'hidden',
                                    transition: 'max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease',
                                    opacity: isExpanded ? 1 : 0, marginTop: isExpanded ? '8px' : 0,
                                }}>
                                    <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)', fontSize: '10px', color: 'var(--md-text-tertiary)', lineHeight: 1.7 }}>
                                        <div>💡 <strong>ความหมาย:</strong> {k.meaning}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                            <span>🎯 <strong>เป้า:</strong> {k.target}</span>
                                            <span>📊 {k.benchmark}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ━━━ Section 2: Resource & Revenue Intelligence ━━━ */}
            <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingLeft: '4px' }}>
                    <div style={{ width: '4px', height: '14px', background: '#8b5cf6', borderRadius: '4px' }} />
                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>⚡ Resource & Revenue Intelligence</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
                    {kpis.slice(4).map((k, i) => {
                        const idx = i + 4;
                        const isExpanded = expandedIdx === idx;
                        return (
                            <div
                                key={idx}
                                className="glass-card"
                                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                                style={{
                                    padding: '14px 16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative', overflow: 'hidden',
                                    borderTop: `3px solid ${k.color}`,
                                    ...(isExpanded ? { boxShadow: `0 0 20px ${k.color}15, 0 8px 30px rgba(0,0,0,0.15)` } : {}),
                                }}
                            >
                                {/* Ambient Glow */}
                                <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '70px', height: '70px', background: `radial-gradient(circle, ${k.color}15 0%, transparent 70%)`, filter: 'blur(15px)', pointerEvents: 'none' }} />

                                {/* Top: Ring + Value */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                                    {!k.noRing ? (
                                        <div style={{ position: 'relative', width: '46px', height: '46px', flexShrink: 0 }}>
                                            <ScoreRing value={k.pct} color={k.color} size={46} strokeWidth={4} />
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px' }}>{k.icon}</div>
                                        </div>
                                    ) : (
                                        <div style={{ width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `${k.color}15`, fontSize: '20px', flexShrink: 0 }}>{k.icon}</div>
                                    )}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                            <span style={{ fontSize: '22px', fontWeight: 900, color: k.color, lineHeight: 1 }}>{k.value}</span>
                                            {k.unit && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{k.unit}</span>}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : '' }}>▼</span>
                                </div>

                                {/* Labels */}
                                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '2px' }}>{k.thLabel}</div>
                                <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)', letterSpacing: '0.06em', marginBottom: '6px' }}>{k.label}</div>

                                {/* Description */}
                                <div style={{ fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 600, marginBottom: '6px', lineHeight: 1.4 }}>{k.desc}</div>

                                {/* AI Tip */}
                                <div style={{ padding: '4px 8px', borderRadius: '6px', background: `${k.color}08`, border: `1px solid ${k.color}15`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '10px' }}>🤖</span>
                                    <span style={{ fontSize: '10px', color: k.color, fontWeight: 700 }}>{k.aiTip}</span>
                                </div>

                                {/* Expandable Detail */}
                                <div style={{
                                    maxHeight: isExpanded ? '160px' : '0', overflow: 'hidden',
                                    transition: 'max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease',
                                    opacity: isExpanded ? 1 : 0, marginTop: isExpanded ? '8px' : 0,
                                }}>
                                    <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)', fontSize: '10px', color: 'var(--md-text-tertiary)', lineHeight: 1.7 }}>
                                        <div>💡 <strong>ความหมาย:</strong> {k.meaning}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                            <span>🎯 <strong>เป้า:</strong> {k.target}</span>
                                            <span>📊 {k.benchmark}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
