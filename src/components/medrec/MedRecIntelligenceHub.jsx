// ============================================================
// MedRecIntelligenceHub — AI Medical Records Intelligence Hub
// Revenue Recovery, Quality Monitoring, Productivity Benchmark
// ============================================================
import React from 'react';

/**
 * AI Medical Records Intelligence Hub
 * 
 * Top-level executive summary with 3 strategic KPI cards:
 * 1. Revenue Recovery Target — pending revenue from uncoded VN/AN (30d)
 * 2. Documentation Quality — OPD coding completeness (today)
 * 3. Coder Productivity — coding throughput score (30d)
 * 
 * Each card includes: formula, meaning, benchmark (HA/สปสช.), and AI recommendation.
 * 
 * @param {Object} today - Today's MedRec data
 * @param {Object} analytics - Analytics data with AI insights
 */
export default function MedRecIntelligenceHub({ today, analytics }) {
    return (
        <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(16,185,129,.25)', background: 'linear-gradient(135deg, rgba(16,185,129,.08), rgba(5,150,105,.04))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '4px', height: '20px', background: 'linear-gradient(180deg, #059669, #059669)', borderRadius: '99px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🧠 Medical Records Intelligence <span style={{ fontSize: '10px', background: 'rgba(16,185,129,.15)', color: '#059669', padding: '1px 6px', borderRadius: '4px' }}>AI AUDIT LIVE</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>Strategic Monitoring for Revenue Recovery & Clinical Documentation Quality</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
                {/* Revenue Leakage */}
                <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #e11d48' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase' }}>💸 Revenue Recovery Target</span>
                        <span style={{ fontSize: '9px', background: 'rgba(225,29,72,0.1)', color: '#e11d48', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>REVENUE KPI</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                        พบรายได้ค้างสรุป (30 วัน): ฿{(analytics.ai_insights?.revenue_impact?.total_pending || 0).toLocaleString()}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', margin: '4px 0 6px' }}>
                        <span style={{ fontSize: '10px', color: '#0284c7', background: 'rgba(2,132,199,0.1)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>OPD: ฿{(analytics.ai_insights?.revenue_impact?.opd_pending || 0).toLocaleString()}</span>
                        <span style={{ fontSize: '10px', color: '#059669', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>IPD: ฿{(analytics.ai_insights?.revenue_impact?.ipd_pending || 0).toLocaleString()}</span>
                    </div>
                    <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                        {analytics.ai_insights?.revenue_impact?.recommendation || '💡 เร่งตรวจสอบความสมบูรณ์ของเวชระเบียนเพื่อเบิกจ่าย'}
                    </p>
                    <div style={{ fontSize: '8px', color: 'var(--md-text-tertiary)', lineHeight: 1.6, borderTop: '1px dashed rgba(0,0,0,0.06)', paddingTop: '4px' }}>
                        <div>📐 <strong>สูตร:</strong> รวม income จาก VN/AN ที่ยังไม่มีรหัสโรค (30 วันล่าสุด)</div>
                        <div>💡 <strong>ความหมาย:</strong> เงินที่รพ.ควรได้รับแต่ยังเบิกไม่ได้เพราะ Code ไม่สมบูรณ์</div>
                        <div>🎯 <strong>เป้า:</strong> ≤ ฿50,000 | 🤖 AI: เร่ง Code เคส OPD ที่มี income สูงก่อน</div>
                    </div>
                </div>

                {/* Quality & Audit */}
                <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #0ea5e9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase' }}>⚖️ Documentation Quality</span>
                        <span style={{ fontSize: '9px', background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>QUALITY KPI</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                        Audit Quality Score: {today.quality_score || 0}% — {today.quality_score >= 90 ? 'ดีเยี่ยม' : 'ควรเร่งปรับปรุง'}
                    </p>
                    <p style={{ margin: '6px 0 4px', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                        💡 มีชาร์ตค้างสรุปรหัสโรค {today.pending_codes || 0} รายการ — {today.pending_codes > 200 ? 'เสี่ยงต่อการเบิกจ่ายล่าช้า' : 'อยู่ในเกณฑ์ปกติ'}
                    </p>
                    <div style={{ fontSize: '8px', color: 'var(--md-text-tertiary)', lineHeight: 1.6, borderTop: '1px dashed rgba(0,0,0,0.06)', paddingTop: '4px' }}>
                        <div>📐 <strong>สูตร:</strong> (VN ที่มี ovstdiag ÷ VN ทั้งหมดวันนี้) × 100</div>
                        <div>💡 <strong>ความหมาย:</strong> วัดความครบถ้วนของการลงรหัสโรค OPD ในแต่ละวัน</div>
                        <div>🎯 <strong>เป้า:</strong> ≥ 90% | 📊 <strong>Benchmark:</strong> HA ≥80% | สปสช. ≥90%</div>
                        <div>🤖 <strong>AI:</strong> {today.quality_score >= 90 ? 'ผ่านเกณฑ์ HA/สปสช. — รักษาระดับ' : 'ต่ำกว่าเกณฑ์ เร่ง Code ก่อนปิด Shift'}</div>
                    </div>
                </div>

                {/* Productivity Benchmark */}
                <div className="inner-glass" style={{ padding: '1rem', borderLeft: '4px solid #0f766e' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>📈 Coder Productivity</span>
                        <span style={{ fontSize: '9px', background: 'rgba(15,118,110,0.1)', color: '#0f766e', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>EFFICIENCY KPI</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                        {analytics.ai_insights?.coding_productivity?.pending_count > 500
                            ? `⚠️ ตรวจพบ backlog สะสม ${analytics.ai_insights.coding_productivity.pending_count} cases`
                            : '✅ Coding Throughput อยู่ในเกณฑ์ปกติ'}
                    </p>
                    <p style={{ margin: '6px 0 4px', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                        💡 Productivity Score: {analytics.ai_insights?.coding_productivity?.score || 0}% (30 วันล่าสุด)
                    </p>
                    <div style={{ fontSize: '8px', color: 'var(--md-text-tertiary)', lineHeight: 1.6, borderTop: '1px dashed rgba(0,0,0,0.06)', paddingTop: '4px' }}>
                        <div>📐 <strong>สูตร:</strong> (VN ที่ Code แล้ว 30 วัน ÷ VN ทั้งหมด 30 วัน) × 100</div>
                        <div>💡 <strong>ความหมาย:</strong> วัดความเร็วและปริมาณงานของ Coder เทียบกับจำนวนเคสที่ต้อง Code</div>
                        <div>🎯 <strong>เป้า:</strong> ≥ 90% | 📊 <strong>Benchmark:</strong> Best Practice ≥95%</div>
                        <div>🤖 <strong>AI:</strong> {(analytics.ai_insights?.coding_productivity?.score || 0) >= 90 ? 'ประสิทธิภาพดี — จัดสรรงานสมดุล' : 'ต่ำกว่าเป้า — ตรวจสอบ Workload Balance ระหว่าง Coder'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
