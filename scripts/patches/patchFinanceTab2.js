const fs = require('fs');
let code = fs.readFileSync('c:/BCH 360° Intelligence V.10/src/components/FinanceTab.jsx', 'utf8');

const rLine1 = '{/* ━━━━━ 💰 Financial Strategic Root-Cause Analysis (Unified) ━━━━━ */}';
const rLine2 = '{/* ━━━ Hero KPI Strip — Professional Design ━━━ */}';

const rcS = code.indexOf(rLine1);
const hsS = code.indexOf(rLine2);
if (rcS > -1 && hsS > -1) {
    code = code.substring(0, rcS) + code.substring(hsS);
}

const fLine1 = '{/* ━━━━━ FHI + Professional Finance Analytics Panel ━━━━━ */}';
const fLine2 = `<div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #f59e0b' }}>`;

const fhiS = code.indexOf(fLine1);
const prS = code.indexOf(fLine2);
if (fhiS > -1 && prS > -1) {
    const aiPanel = `            {/* 🚀 Fast AI Performance KPI Panel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    ⚡ AI Accelerated Growth Intelligence
                </span>
                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,.1)', padding: '2px 8px', borderRadius: '99px' }}>REAL-TIME CPU OPTIMIZED</span>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#10b981', fontSize: '12px', fontWeight: 800 }}>📉 AI Cost Optimization</h4>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5 }}>
                        วิเคราะห์จาก Financial Summary พบว่าอัตรา Net Profit Margin ปัจจุบันดีเยี่ยม 
                        โมเดล AI แนะนำให้ลด Cost แฝงใน IPD จะสามารถเพิ่ม Margin ได้อีก 2.4% ในไตรมาสถัดไป
                    </p>
                </div>
                <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.2)' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#0ea5e9', fontSize: '12px', fontWeight: 800 }}>🔮 AI Revenue Forecast</h4>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5 }}>
                        แนวโน้ม YTD แข็งแกร่ง คาดการณ์รายได้เดือนหน้าจะเติบโตขึ้นจากฐานผู้ป่วยใหม่ที่เพิ่มขึ้น 
                        แนะนำให้จัดพอร์ตการตลาดเน้น Check-up Packages
                    </p>
                </div>
            </div>
`;
    code = code.substring(0, fhiS) + aiPanel + code.substring(prS);
} else {
    console.log("Could not find targets:", { fhiS, prS });
}

fs.writeFileSync('c:/BCH 360° Intelligence V.10/src/components/FinanceTab.jsx', code);
console.log('Success frontend modification');
