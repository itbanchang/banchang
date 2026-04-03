// ============================================================
// BCH 360° Intelligence V.10 — น้องขวัญใจ AI Robot Assistant
// Roaming AI Robot with personality & clinical intelligence
// ============================================================
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const GREETINGS = [
    "สวัสดีค่ะ ขวัญใจพร้อมดูแลข้อมูลให้แล้วค่ะ",
    "กำลังวิเคราะห์ข้อมูล Real-time จาก HOSxP XE ค่ะ",
    "วันนี้ขวัญใจจะช่วยเฝ้าระวังทุกตัวชี้วัดให้นะคะ",
    "ขวัญใจกำลังตรวจสอบ KPI ทุกแผนกค่ะ",
    "มีอะไรให้ขวัญใจช่วยวิเคราะห์ไหมคะ?",
];

const KAWAII_FACES = ['(◕‿◕)', '(◠‿◠)', '(◕ᴗ◕)', '(⁎ᵕᴗᵕ⁎)', '(ᵔᴥᵔ)'];

const AIAssistant = React.memo(function AIAssistant({ clinicalData = null }) {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isThinking, setIsThinking] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [faceIndex, setFaceIndex] = useState(0);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState(1); // 1=right, -1=left
    const [isMoving, setIsMoving] = useState(true);
    const [eyeBlink, setEyeBlink] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const animRef = useRef(null);

    // Initialize position
    useEffect(() => {
        const startX = window.innerWidth - 120;
        const startY = window.innerHeight - 140;
        setPos({ x: startX, y: startY });
        setTargetPos({ x: startX, y: startY });
    }, []);

    // Random roaming - pick new target every 6-12 seconds
    useEffect(() => {
        if (expanded || isDragging) return;
        const roam = () => {
            const margin = 80;
            const newX = margin + Math.random() * (window.innerWidth - margin * 2 - 80);
            const newY = Math.max(window.innerHeight - 200, window.innerHeight * 0.6) + Math.random() * 120;
            setTargetPos({ x: newX, y: Math.min(newY, window.innerHeight - 100) });
            setIsMoving(true);
        };
        const interval = setInterval(roam, 6000 + Math.random() * 6000);
        roam();
        return () => clearInterval(interval);
    }, [expanded, isDragging]);

    // Smooth movement towards target
    useEffect(() => {
        if (isDragging) return;
        const move = () => {
            setPos(prev => {
                const dx = targetPos.x - prev.x;
                const dy = targetPos.y - prev.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 2) { setIsMoving(false); return prev; }
                const speed = Math.min(1.5, dist * 0.02);
                const nx = prev.x + (dx / dist) * speed;
                const ny = prev.y + (dy / dist) * speed;
                if (dx > 1) setDirection(1);
                else if (dx < -1) setDirection(-1);
                return { x: nx, y: ny };
            });
            animRef.current = requestAnimationFrame(move);
        };
        animRef.current = requestAnimationFrame(move);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [targetPos, isDragging]);

    // Eye blink
    useEffect(() => {
        const blink = setInterval(() => {
            setEyeBlink(true);
            setTimeout(() => setEyeBlink(false), 150);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(blink);
    }, []);

    // Drag handlers
    const onPointerDown = useCallback((e) => {
        if (expanded) return;
        setIsDragging(true);
        dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        e.currentTarget.setPointerCapture(e.pointerId);
    }, [pos, expanded]);

    const onPointerMove = useCallback((e) => {
        if (!isDragging) return;
        setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    }, [isDragging]);

    const onPointerUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Clinical data
    const counts = useMemo(() => {
        if (!clinicalData) return { sepsis: 0, deterioration: 0, labs: 0, fallRisk: 0, totalInsights: 0, criticalCount: 0 };
        const doc = clinicalData.doctor || [];
        const nur = clinicalData.nurse || [];
        return {
            sepsis: doc.find(d => d.id === 'sepsis_alert')?.count || 0,
            deterioration: doc.find(d => d.id === 'deterioration_alert')?.count || 0,
            labs: doc.find(d => d.id === 'critical_labs')?.count || 0,
            fallRisk: nur.find(d => d.id === 'fall_risk')?.count || 0,
            totalInsights: clinicalData.summary?.total_insights || 0,
            criticalCount: clinicalData.summary?.critical_count || 0,
        };
    }, [clinicalData]);

    const dynamicPhrases = useMemo(() => {
        const phrases = [...GREETINGS];
        if (counts.sepsis > 0) phrases.push(`ตรวจพบผู้ป่วยเสี่ยง Sepsis ${counts.sepsis} ราย ค่ะ`);
        if (counts.deterioration > 0) phrases.push(`ผู้ป่วย ${counts.deterioration} ราย แนวโน้มอาการทรุดลงค่ะ`);
        if (counts.labs > 0) phrases.push(`พบผล Lab วิกฤต ${counts.labs} รายการค่ะ`);
        if (counts.criticalCount === 0) phrases.push(`ระบบปกติค่ะ ไม่มีสถานการณ์วิกฤต`);
        return phrases;
    }, [counts]);

    const isCritical = counts.criticalCount > 0;

    // Cycle phrases
    useEffect(() => {
        const interval = setInterval(() => {
            setIsThinking(true);
            setTimeout(() => {
                setPhraseIndex(prev => (prev + 1) % dynamicPhrases.length);
                setFaceIndex(prev => (prev + 1) % KAWAII_FACES.length);
                setIsThinking(false);
            }, 500);
        }, 7000);
        return () => clearInterval(interval);
    }, [dynamicPhrases.length]);

    // Robot body color
    const bodyColor = isCritical ? '#ef4444' : '#8b5cf6';
    const bodyGlow = isCritical ? 'rgba(239,68,68,0.3)' : 'rgba(139,92,246,0.3)';

    return (
        <div style={{
            position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`,
            zIndex: 9999, transition: isDragging ? 'none' : 'left 0.1s linear, top 0.1s linear',
            cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none',
        }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
        >
            {/* Speech bubble */}
            <div style={{
                position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                marginBottom: '8px', width: '220px',
                opacity: (expanded || isThinking) ? 0 : 1,
                transition: 'opacity 0.3s',
                pointerEvents: expanded ? 'none' : 'auto',
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                    borderRadius: '16px', padding: '10px 14px',
                    border: `1.5px solid ${bodyColor}30`,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.1), 0 0 12px ${bodyGlow}`,
                }}>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#475569', lineHeight: 1.5 }}>
                        {dynamicPhrases[phraseIndex % dynamicPhrases.length]} {KAWAII_FACES[faceIndex]}
                    </p>
                    {/* Arrow */}
                    <div style={{
                        position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                        width: '12px', height: '12px', background: 'rgba(255,255,255,0.95)',
                        borderRight: `1.5px solid ${bodyColor}30`, borderBottom: `1.5px solid ${bodyColor}30`,
                    }} />
                </div>
            </div>

            {/* Expanded clinical panel */}
            {expanded && (
                <div style={{
                    position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginBottom: '12px', width: '300px',
                    background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                    borderRadius: '20px', padding: '16px',
                    border: `2px solid ${bodyColor}30`,
                    boxShadow: `0 16px 48px rgba(0,0,0,0.15), 0 0 20px ${bodyGlow}`,
                    animation: 'kwanjai-pop 0.3s ease-out',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 900, background: `linear-gradient(135deg, ${bodyColor}, #ec4899)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            น้องขวัญใจ — Clinical AI
                        </span>
                        <button onClick={() => setExpanded(false)} style={{
                            width: '24px', height: '24px', borderRadius: '50%', border: 'none',
                            background: 'rgba(148,163,184,0.1)', cursor: 'pointer', fontSize: '12px', color: '#94a3b8',
                        }}>✕</button>
                    </div>
                    <div style={{ background: `${bodyColor}08`, borderRadius: '12px', padding: '10px 12px', marginBottom: '10px', border: `1px solid ${bodyColor}15` }}>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#475569', lineHeight: 1.5 }}>
                            {dynamicPhrases[phraseIndex % dynamicPhrases.length]} {KAWAII_FACES[faceIndex]}
                        </p>
                    </div>
                    {counts.sepsis > 0 && <AlertRow color="#ef4444" label="Sepsis Risk" value={`${counts.sepsis} ราย`} />}
                    {counts.deterioration > 0 && <AlertRow color="#f59e0b" label="Deteriorating" value={`${counts.deterioration} ราย`} />}
                    {counts.labs > 0 && <AlertRow color="#f97316" label="Critical Labs" value={`${counts.labs} รายการ`} />}
                    {counts.fallRisk > 0 && <AlertRow color="#8b5cf6" label="Fall Risk" value={`${counts.fallRisk} ราย`} />}
                    {counts.criticalCount === 0 && (
                        <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#059669', padding: '8px', background: 'rgba(16,185,129,0.06)', borderRadius: '8px' }}>
                            ✅ ระบบปกติค่ะ
                        </div>
                    )}
                </div>
            )}

            {/* === ROBOT BODY === */}
            <div onClick={() => setExpanded(prev => !prev)} style={{
                width: '72px', height: '80px', position: 'relative',
                transform: `scaleX(${direction})`,
                filter: `drop-shadow(0 4px 12px ${bodyGlow})`,
            }}>
                {/* Antenna */}
                <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '16px', background: `linear-gradient(${bodyColor}, ${bodyColor}80)`, borderRadius: '2px',
                }}>
                    <div style={{
                        position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: isCritical ? '#ef4444' : '#10b981',
                        boxShadow: `0 0 10px ${isCritical ? 'rgba(239,68,68,0.8)' : 'rgba(16,185,129,0.8)'}`,
                        animation: 'kwanjai-blink 2s infinite',
                    }} />
                </div>

                {/* Head */}
                <div style={{
                    width: '52px', height: '40px', margin: '0 auto',
                    background: `linear-gradient(180deg, ${bodyColor}, ${bodyColor}dd)`,
                    borderRadius: '16px 16px 8px 8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    position: 'relative', overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.3)',
                }}>
                    {/* Face visor */}
                    <div style={{
                        width: '42px', height: '22px', borderRadius: '8px',
                        background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        border: '1px solid rgba(255,255,255,0.15)',
                    }}>
                        {/* Eyes */}
                        <div style={{
                            width: eyeBlink ? '8px' : '8px', height: eyeBlink ? '2px' : '8px',
                            borderRadius: eyeBlink ? '4px' : '50%',
                            background: isCritical ? '#fca5a5' : '#a5f3fc',
                            boxShadow: `0 0 6px ${isCritical ? '#fca5a5' : '#a5f3fc'}`,
                            transition: 'height 0.1s',
                        }} />
                        <div style={{
                            width: eyeBlink ? '8px' : '8px', height: eyeBlink ? '2px' : '8px',
                            borderRadius: eyeBlink ? '4px' : '50%',
                            background: isCritical ? '#fca5a5' : '#a5f3fc',
                            boxShadow: `0 0 6px ${isCritical ? '#fca5a5' : '#a5f3fc'}`,
                            transition: 'height 0.1s',
                        }} />
                    </div>

                    {/* Shine */}
                    <div style={{
                        position: 'absolute', top: '2px', left: '8px',
                        width: '12px', height: '6px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.3)',
                    }} />
                </div>

                {/* Body */}
                <div style={{
                    width: '48px', height: '30px', margin: '2px auto 0',
                    background: `linear-gradient(180deg, ${bodyColor}cc, ${bodyColor}99)`,
                    borderRadius: '6px 6px 10px 10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.2)',
                    position: 'relative',
                }}>
                    {/* Chest light */}
                    <div style={{
                        width: '12px', height: '12px', borderRadius: '50%',
                        background: isThinking ? '#fbbf24' : isCritical ? '#ef4444' : '#10b981',
                        boxShadow: `0 0 8px ${isThinking ? '#fbbf24' : isCritical ? '#ef4444' : '#10b981'}`,
                        animation: isThinking ? 'kwanjai-blink 0.5s infinite' : 'kwanjai-blink 2s infinite',
                    }} />

                    {/* Arms */}
                    <div style={{
                        position: 'absolute', left: '-10px', top: '4px',
                        width: '10px', height: '20px', borderRadius: '5px',
                        background: `${bodyColor}aa`,
                        animation: isMoving ? 'kwanjai-arm-l 0.6s ease-in-out infinite' : 'none',
                        transformOrigin: 'top center',
                    }} />
                    <div style={{
                        position: 'absolute', right: '-10px', top: '4px',
                        width: '10px', height: '20px', borderRadius: '5px',
                        background: `${bodyColor}aa`,
                        animation: isMoving ? 'kwanjai-arm-r 0.6s ease-in-out infinite' : 'none',
                        transformOrigin: 'top center',
                    }} />
                </div>

                {/* Feet */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2px' }}>
                    <div style={{
                        width: '16px', height: '8px', borderRadius: '4px 4px 6px 6px',
                        background: `${bodyColor}bb`,
                        animation: isMoving ? 'kwanjai-foot-l 0.6s ease-in-out infinite' : 'none',
                    }} />
                    <div style={{
                        width: '16px', height: '8px', borderRadius: '4px 4px 6px 6px',
                        background: `${bodyColor}bb`,
                        animation: isMoving ? 'kwanjai-foot-r 0.6s ease-in-out infinite' : 'none',
                    }} />
                </div>

                {/* Critical badge */}
                {isCritical && (
                    <div style={{
                        position: 'absolute', top: '-18px', right: '-8px',
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 900,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2px solid #fff', boxShadow: '0 2px 8px rgba(239,68,68,0.5)',
                        animation: 'bounce 1s infinite',
                    }}>{counts.criticalCount}</div>
                )}
            </div>

            {/* Name */}
            <div style={{
                textAlign: 'center', marginTop: '2px',
                fontSize: '9px', fontWeight: 800,
                background: `linear-gradient(135deg, ${bodyColor}, #ec4899)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>น้องขวัญใจ</div>

            <style>{`
                @keyframes kwanjai-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
                @keyframes kwanjai-pop { 0%{transform:translateX(-50%) scale(0.8);opacity:0} 100%{transform:translateX(-50%) scale(1);opacity:1} }
                @keyframes kwanjai-arm-l { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-25deg)} }
                @keyframes kwanjai-arm-r { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(25deg)} }
                @keyframes kwanjai-foot-l { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-4px)} }
                @keyframes kwanjai-foot-r { 0%,100%{transform:translateY(0)} 75%{transform:translateY(-4px)} }
            `}</style>
        </div>
    );
});

function AlertRow({ color, label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', padding: '6px 10px', background: `${color}08`, borderRadius: '8px', border: `1px solid ${color}20`, marginBottom: '4px' }}>
            <span style={{ fontWeight: 700, color }}>{label}</span>
            <span style={{ fontWeight: 900, color }}>{value}</span>
        </div>
    );
}

export default AIAssistant;
