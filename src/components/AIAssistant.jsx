// ============================================================
// BCH 360° Intelligence V.10 — น้องขวัญใจ AI Assistant
// AI Live Telemetry & Micro-animations
// Context-Aware with Dynamic Phrases & Clinical Insights
// ============================================================
import React, { useState, useEffect, useMemo } from 'react';

const GREETINGS = [
    "สวัสดีค่ะ ขวัญใจพร้อมดูแลข้อมูลให้แล้วค่ะ",
    "กำลังวิเคราะห์ข้อมูล Real-time จาก HOSxP XE ค่ะ",
    "วันนี้ขวัญใจจะช่วยเฝ้าระวังทุกตัวชี้วัดให้นะคะ",
];

const KAWAII_FACES = ['(◕‿◕)', '(◠‿◠)', '(◕ᴗ◕)', '(⁎ᵕᴗᵕ⁎)'];

const AIAssistant = React.memo(function AIAssistant({ clinicalData = null }) {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isThinking, setIsThinking] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [faceIndex, setFaceIndex] = useState(0);
    const [bounceKey, setBounceKey] = useState(0);

    const counts = useMemo(() => {
        if (!clinicalData) return { sepsis: 0, deterioration: 0, labs: 0, fallRisk: 0, monitorGaps: 0, criticalWards: 0, totalInsights: 0, criticalCount: 0 };
        const doc = clinicalData.doctor || [];
        const nur = clinicalData.nurse || [];
        const sepsis = doc.find(d => d.id === 'sepsis_alert')?.count || 0;
        const deterioration = doc.find(d => d.id === 'deterioration_alert')?.count || 0;
        const labs = doc.find(d => d.id === 'critical_labs')?.count || 0;
        const fallRisk = nur.find(d => d.id === 'fall_risk')?.count || 0;
        const monitorGaps = nur.find(d => d.id === 'monitor_gaps')?.count || 0;
        const wardAcuity = nur.find(d => d.id === 'ward_acuity');
        const criticalWards = wardAcuity?.wards?.filter(w => w.severity === 'critical' || w.severity === 'high').length || 0;
        return {
            sepsis, deterioration, labs, fallRisk, monitorGaps, criticalWards,
            totalInsights: clinicalData.summary?.total_insights || 0,
            criticalCount: clinicalData.summary?.critical_count || 0,
        };
    }, [clinicalData]);

    const dynamicPhrases = useMemo(() => {
        const phrases = [...GREETINGS];
        if (counts.sepsis > 0) phrases.push(`ขวัญใจตรวจพบผู้ป่วยเสี่ยง Sepsis ${counts.sepsis} ราย เฝ้าระวังด้วยนะคะ`);
        if (counts.deterioration > 0) phrases.push(`แจ้งเตือนค่ะ ผู้ป่วย ${counts.deterioration} ราย มีแนวโน้มอาการทรุดลง`);
        if (counts.labs > 0) phrases.push(`พบผล Lab วิกฤต ${counts.labs} รายการ รอแพทย์ตรวจสอบค่ะ`);
        if (counts.fallRisk > 0) phrases.push(`ผู้ป่วยเสี่ยงล้ม ${counts.fallRisk} ราย — ขวัญใจเฝ้าระวังอยู่ค่ะ`);
        if (counts.monitorGaps > 0) phrases.push(`${counts.monitorGaps} ราย ไม่ได้วัด Vital Signs ≥ 6 ชม.`);
        if (counts.criticalWards > 0) phrases.push(`${counts.criticalWards} ward Acuity สูง — ต้องเพิ่มพยาบาลค่ะ`);
        if (counts.totalInsights > 0 && counts.criticalCount === 0) phrases.push(`ระบบเฝ้าระวังปกติค่ะ ไม่พบสถานการณ์วิกฤต`);
        return phrases;
    }, [counts]);

    const criticalCount = counts.criticalCount;
    const isCritical = criticalCount > 0;

    // Cycle phrases + face
    useEffect(() => {
        const interval = setInterval(() => {
            setIsThinking(true);
            setTimeout(() => {
                setPhraseIndex(prev => (prev + 1) % dynamicPhrases.length);
                setFaceIndex(prev => (prev + 1) % KAWAII_FACES.length);
                setIsThinking(false);
                setBounceKey(prev => prev + 1);
            }, 600);
        }, 8000);
        return () => clearInterval(interval);
    }, [dynamicPhrases.length]);

    const kwanJaiStyle = `
        @keyframes kwanjai-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-6px) rotate(2deg); }
            75% { transform: translateY(-3px) rotate(-2deg); }
        }
        @keyframes kwanjai-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3), 0 8px 32px rgba(124, 58, 237, 0.2); }
            50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.5), 0 8px 40px rgba(124, 58, 237, 0.3); }
        }
        @keyframes kwanjai-ring {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(2); opacity: 0; }
        }
        @keyframes kwanjai-sparkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes kwanjai-bounce-in {
            0% { transform: scale(0.9) translateY(5px); opacity: 0; }
            50% { transform: scale(1.02) translateY(-2px); }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes kwanjai-wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-10deg); }
        }
    `;

    return (
        <div className="fixed bottom-10 right-10 z-[100] group">
            <style>{kwanJaiStyle}</style>
            <div className="relative">
                {/* Expanded panel */}
                {expanded && (
                    <div
                        className="absolute bottom-full right-0 mb-4 w-80"
                        style={{
                            animation: 'kwanjai-bounce-in 0.4s ease-out',
                            background: 'rgba(255, 255, 255, 0.97)',
                            backdropFilter: 'blur(16px)',
                            border: isCritical ? '2px solid rgba(239,68,68,0.4)' : '2px solid rgba(168,85,247,0.25)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 30px rgba(168,85,247,0.08)',
                            padding: '20px',
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '24px', animation: 'kwanjai-wave 2s ease-in-out infinite' }}>👩‍⚕️</span>
                                <div>
                                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 900, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        น้องขวัญใจ
                                    </p>
                                    <p style={{ margin: 0, fontSize: '9px', fontWeight: 700, color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        BCH AI Clinical Intelligence
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setExpanded(false)}
                                style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'rgba(148,163,184,0.1)', cursor: 'pointer', fontSize: '14px', color: '#94a3b8', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                ✕
                            </button>
                        </div>

                        {/* Message bubble */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(236,72,153,0.04))',
                            borderRadius: '16px', padding: '12px 14px', marginBottom: '12px',
                            border: '1px solid rgba(168,85,247,0.1)',
                        }}>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#475569', lineHeight: 1.6, transition: 'opacity 0.4s' }}
                               key={bounceKey}>
                                {dynamicPhrases[phraseIndex % dynamicPhrases.length]} {KAWAII_FACES[faceIndex]}
                            </p>
                        </div>

                        {/* Clinical alerts */}
                        {clinicalData && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {counts.sepsis > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '8px 12px', background: 'rgba(239,68,68,0.06)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.15)' }}>
                                        <span style={{ fontWeight: 700, color: '#dc2626' }}>🔴 Sepsis Risk</span>
                                        <span style={{ fontWeight: 900, color: '#b91c1c' }}>{counts.sepsis} ราย</span>
                                    </div>
                                )}
                                {counts.deterioration > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '8px 12px', background: 'rgba(245,158,11,0.06)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.15)' }}>
                                        <span style={{ fontWeight: 700, color: '#d97706' }}>⚠️ Deteriorating</span>
                                        <span style={{ fontWeight: 900, color: '#b45309' }}>{counts.deterioration} ราย</span>
                                    </div>
                                )}
                                {counts.labs > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '8px 12px', background: 'rgba(249,115,22,0.06)', borderRadius: '10px', border: '1px solid rgba(249,115,22,0.15)' }}>
                                        <span style={{ fontWeight: 700, color: '#ea580c' }}>🧪 Critical Labs</span>
                                        <span style={{ fontWeight: 900, color: '#c2410c' }}>{counts.labs} รายการ</span>
                                    </div>
                                )}
                                {counts.fallRisk > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '8px 12px', background: 'rgba(168,85,247,0.06)', borderRadius: '10px', border: '1px solid rgba(168,85,247,0.15)' }}>
                                        <span style={{ fontWeight: 700, color: '#7c3aed' }}>⚠️ Fall Risk</span>
                                        <span style={{ fontWeight: 900, color: '#6d28d9' }}>{counts.fallRisk} ราย</span>
                                    </div>
                                )}
                                {criticalCount === 0 && (
                                    <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#059669', padding: '10px', background: 'rgba(16,185,129,0.06)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.15)' }}>
                                        ✅ ระบบปกติค่ะ ไม่พบสถานการณ์วิกฤต
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(148,163,184,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>
                                Powered by BCH 360° AI Engine
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isCritical ? '#ef4444' : '#10b981', animation: 'kwanjai-glow 2s infinite' }} />
                                <span style={{ fontSize: '9px', color: isCritical ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                                    {isCritical ? 'ALERT' : 'ONLINE'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hover tooltip */}
                {!expanded && (
                    <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none"
                        style={{ width: '240px' }}>
                        <div style={{
                            padding: '14px 16px', borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.12), 0 0 20px rgba(168,85,247,0.08)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isThinking ? '#f59e0b' : isCritical ? '#ef4444' : '#10b981', animation: isThinking ? 'pulse 1s infinite' : undefined }} />
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 900, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    น้องขวัญใจ AI
                                </p>
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#475569', lineHeight: 1.5, transition: 'opacity 0.4s', opacity: isThinking ? 0.3 : 1 }}>
                                {dynamicPhrases[phraseIndex % dynamicPhrases.length]}
                            </p>
                            {/* Arrow */}
                            <div style={{
                                position: 'absolute', bottom: '-6px', right: '24px', width: '12px', height: '12px',
                                transform: 'rotate(45deg)', background: 'rgba(255,255,255,0.95)',
                                borderRight: '1px solid rgba(168,85,247,0.2)', borderBottom: '1px solid rgba(168,85,247,0.2)',
                            }} />
                        </div>
                    </div>
                )}

                {/* Sparkles */}
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        position: 'absolute',
                        top: `${-5 + i * 15}px`, left: `${-8 + i * 20}px`,
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: ['#f472b6', '#a78bfa', '#38bdf8'][i],
                        animation: `kwanjai-sparkle ${2 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.7}s`,
                        pointerEvents: 'none',
                    }} />
                ))}

                {/* Main FAB */}
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    style={{
                        width: '68px', height: '68px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', border: 'none', cursor: 'pointer',
                        background: isCritical
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                            : 'linear-gradient(135deg, #8b5cf6, #6d28d9, #4f46e5)',
                        animation: 'kwanjai-float 4s ease-in-out infinite, kwanjai-glow 3s ease-in-out infinite',
                        transition: 'transform 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    title="น้องขวัญใจ — BCH AI Assistant"
                >
                    {/* Pulse ring */}
                    <div style={{
                        position: 'absolute', inset: '-4px', borderRadius: '50%',
                        border: `2px solid ${isCritical ? 'rgba(239,68,68,0.4)' : 'rgba(168,85,247,0.4)'}`,
                        animation: 'kwanjai-ring 3s ease-out infinite',
                    }} />

                    {/* Avatar */}
                    <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                        👩‍⚕️
                    </span>

                    {/* Critical badge */}
                    {isCritical && (
                        <span style={{
                            position: 'absolute', top: '-4px', right: '-4px',
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 900,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '2px solid white', boxShadow: '0 2px 8px rgba(239,68,68,0.5)',
                            animation: 'bounce 1s infinite',
                        }}>
                            {criticalCount}
                        </span>
                    )}

                    {/* Online indicator */}
                    {!isCritical && (
                        <div style={{
                            position: 'absolute', bottom: '2px', right: '2px',
                            width: '14px', height: '14px', borderRadius: '50%',
                            background: '#10b981', border: '2px solid white',
                            boxShadow: '0 0 8px rgba(16,185,129,0.6)',
                        }} />
                    )}
                </button>

                {/* Name label */}
                <div style={{
                    textAlign: 'center', marginTop: '6px',
                    fontSize: '10px', fontWeight: 800,
                    background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.05em',
                }}>
                    น้องขวัญใจ
                </div>
            </div>
        </div>
    );
});

export default AIAssistant;
