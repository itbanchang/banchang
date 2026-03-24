// ============================================================
// MedRecIntelligenceHub — Executive AI Command Center
// Premium glassmorphism with data-driven insight cards
// ============================================================
import React from 'react';

export default function MedRecIntelligenceHub({ today, analytics }) {
    const opdRate = today.quality_score || 0;
    const pendingCodes = today.pending_codes || 0;
    const prodScore = analytics.ai_insights?.coding_productivity?.score || 0;
    const pendingCount = analytics.ai_insights?.coding_productivity?.pending_count || 0;
    const totalPending = analytics.ai_insights?.revenue_impact?.total_pending || 0;
    const opdPending = analytics.ai_insights?.revenue_impact?.opd_pending || 0;
    const ipdPending = analytics.ai_insights?.revenue_impact?.ipd_pending || 0;
    const totalRW = Number(today.ipd_total_rw || 0);
    const avgRW = Number(today.ipd_avg_rw || 0);
    const estRevenue = Math.round(totalRW * 8350);

    // Revenue risk level
    const revenueRisk = totalPending > 200000 ? 'CRITICAL' : totalPending > 50000 ? 'WARNING' : 'NORMAL';
    const revenueRiskColor = { CRITICAL: '#ef4444', WARNING: '#f59e0b', NORMAL: '#10b981' }[revenueRisk];

    const cards = [
        {
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            accent: '#818cf8',
            icon: '💰',
            title: 'ภาพรวมรายได้ DRG',
            badge: 'REVENUE INTELLIGENCE',
            mainValue: `฿${estRevenue.toLocaleString()}`,
            mainLabel: 'รายได้ประมาณการ (ปีงบฯ)',
            metrics: [
                { label: 'Total RW', value: totalRW.toLocaleString(), color: '#a5b4fc' },
                { label: 'Avg RW', value: avgRW.toFixed(2), color: '#818cf8' },
                { label: 'อัตรา', value: `฿${(8350).toLocaleString()}/RW`, color: '#6366f1' },
            ],
            insight: avgRW >= 2.0
                ? '💡 RW สูง — เคสซับซ้อน ควรตรวจสอบ CC/MCC ให้ครบถ้วนเพื่อไม่ให้สูญเสียรายได้'
                : '💡 มีโอกาสเพิ่ม Revenue จาก CDI Review — ตรวจสอบ Secondary Diagnosis',
            bottomLabel: `📊 สปสช. Base Rate ≈฿8,350/RW · ข้อมูล 30 วันล่าสุด`,
        },
        {
            gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            accent: revenueRiskColor,
            icon: '🔍',
            title: 'Revenue Leakage Monitor',
            badge: revenueRisk === 'CRITICAL' ? '🚨 CRITICAL' : revenueRisk === 'WARNING' ? '⚠️ WARNING' : '✅ NORMAL',
            mainValue: `฿${totalPending.toLocaleString()}`,
            mainLabel: 'รายได้ค้างเบิก (30 วัน)',
            metrics: [
                { label: 'OPD ค้าง', value: `฿${opdPending.toLocaleString()}`, color: '#38bdf8' },
                { label: 'IPD ค้าง', value: `฿${ipdPending.toLocaleString()}`, color: '#34d399' },
                { label: 'เคสค้าง Code', value: `${pendingCodes}`, color: pendingCodes > 200 ? '#ef4444' : '#f59e0b' },
            ],
            insight: analytics.ai_insights?.revenue_impact?.recommendation || '💡 เร่งตรวจสอบเวชระเบียนเพื่อปิดยอดเบิกจ่าย',
            bottomLabel: `🎯 เป้า: ≤ ฿50,000 · สูตร: income จาก VN/AN ที่ยังไม่มี ICD-10`,
        },
        {
            gradient: 'linear-gradient(135deg, #0c1821 0%, #1b2a38 100%)',
            accent: prodScore >= 90 ? '#10b981' : prodScore >= 70 ? '#f59e0b' : '#ef4444',
            icon: '⚡',
            title: 'Team Performance Index',
            badge: prodScore >= 90 ? '🏆 EXCELLENT' : prodScore >= 70 ? '📈 GOOD' : '⚠️ NEEDS REVIEW',
            mainValue: `${prodScore}%`,
            mainLabel: 'Productivity Score (30 วัน)',
            metrics: [
                { label: 'Audit Score', value: `${opdRate}%`, color: opdRate >= 90 ? '#10b981' : '#f59e0b' },
                { label: 'Backlog', value: `${pendingCount}`, color: pendingCount > 500 ? '#ef4444' : '#10b981' },
                { label: 'Coders', value: `${(today.ipd_coders_fiscal || []).length} คน`, color: '#38bdf8' },
            ],
            insight: pendingCount > 500
                ? `⚠️ Backlog สะสม ${pendingCount} cases — ควรจัดเวรเร่งด่วนและเกลี่ยงานให้สมดุล`
                : '✅ ปริมาณงานสมดุล — ทีม Coder ทำงานได้ตามเกณฑ์',
            bottomLabel: `📊 Benchmark: Best Practice ≥95% · HA ≥90%`,
        },
    ];

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(17,24,39,0.98) 0%, rgba(30,41,59,0.96) 100%)',
            borderRadius: '24px', padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Aurora Background */}
            <div style={{ position: 'absolute', top: '-30%', left: '20%', width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '14px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '20px', boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
                    }}>🧠</div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Medical Records Intelligence
                            <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '99px', letterSpacing: '0.05em' }}>AI AUDIT LIVE</span>
                        </h3>
                        <p style={{ margin: 0, fontSize: '10.5px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                            ระบบ AI วิเคราะห์รายได้ · Revenue Leakage · ประสิทธิภาพทีม Coder แบบ Real-time
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
                        UPDATE: {today.timestamp ? new Date(today.timestamp).toLocaleTimeString('th-TH') : '—'}
                    </span>
                </div>
            </div>

            {/* Cards Grid */}
            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '14px' }}>
                {cards.map((c, i) => (
                    <div key={i} style={{
                        background: c.gradient,
                        borderRadius: '18px', padding: '1.25rem',
                        border: `1px solid ${c.accent}25`,
                        position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}>
                        {/* Card Glow */}
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: `radial-gradient(circle, ${c.accent}15 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />

                        {/* Title Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: c.accent, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {c.icon} {c.title}
                            </span>
                            <span style={{ fontSize: '9px', background: `${c.accent}15`, color: c.accent, padding: '2px 8px', borderRadius: '99px', fontWeight: 700 }}>{c.badge}</span>
                        </div>

                        {/* Main Value */}
                        <div style={{ marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '26px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{c.mainValue}</div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginTop: '3px' }}>{c.mainLabel}</div>
                        </div>

                        {/* Metric Chips */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                            {c.metrics.map((m, mi) => (
                                <div key={mi} style={{
                                    padding: '4px 10px', borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                }}>
                                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{m.label}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: m.color }}>{m.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Insight */}
                        <div style={{
                            padding: '8px 10px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                            marginBottom: '8px', position: 'relative', zIndex: 1,
                        }}>
                            <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, lineHeight: 1.6 }}>{c.insight}</p>
                        </div>

                        {/* Bottom */}
                        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, position: 'relative', zIndex: 1 }}>{c.bottomLabel}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
