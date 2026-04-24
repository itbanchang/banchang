// ============================================================
// BCH 360° Intelligence V.10 — น้องขวัญใจ (Alita-style AI Robot)
// Cute roaming cyberpunk robot with big expressive eyes
// ============================================================
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const GREETINGS = [
    "สวัสดีค่ะ ขวัญใจพร้อมดูแลข้อมูลให้แล้วค่ะ",
    "กำลังวิเคราะห์ข้อมูล Real-time จาก HOSxP XE ค่ะ",
    "วันนี้ขวัญใจจะช่วยเฝ้าระวังทุกตัวชี้วัดให้นะคะ",
    "ขวัญใจกำลังตรวจสอบ KPI ทุกแผนกค่ะ",
    "มีอะไรให้ขวัญใจช่วยวิเคราะห์ไหมคะ?",
];

const AIAssistant = React.memo(function AIAssistant({ clinicalData = null }) {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isThinking, setIsThinking] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState(1);
    const [isMoving, setIsMoving] = useState(true);
    const [eyeBlink, setEyeBlink] = useState(false);
    const [eyeTarget, setEyeTarget] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const animRef = useRef(null);

    // Initialize position
    useEffect(() => {
        const x = window.innerWidth - 140;
        const y = window.innerHeight - 160;
        setPos({ x, y });
        setTargetPos({ x, y });
    }, []);

    // Random roaming
    useEffect(() => {
        if (expanded || isDragging) return;
        const roam = () => {
            const m = 100;
            const x = m + Math.random() * (window.innerWidth - m * 2 - 100);
            const y = Math.max(window.innerHeight - 220, window.innerHeight * 0.55) + Math.random() * 140;
            setTargetPos({ x, y: Math.min(y, window.innerHeight - 120) });
            setIsMoving(true);
        };
        const iv = setInterval(roam, 5000 + Math.random() * 7000);
        roam();
        return () => clearInterval(iv);
    }, [expanded, isDragging]);

    // Smooth movement
    useEffect(() => {
        if (isDragging) return;
        const move = () => {
            setPos(prev => {
                const dx = targetPos.x - prev.x;
                const dy = targetPos.y - prev.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 2) { setIsMoving(false); return prev; }
                const spd = Math.min(1.8, dist * 0.025);
                if (dx > 1) setDirection(1); else if (dx < -1) setDirection(-1);
                return { x: prev.x + (dx / dist) * spd, y: prev.y + (dy / dist) * spd };
            });
            animRef.current = requestAnimationFrame(move);
        };
        animRef.current = requestAnimationFrame(move);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [targetPos, isDragging]);

    // Eye blink
    useEffect(() => {
        const iv = setInterval(() => {
            setEyeBlink(true);
            setTimeout(() => setEyeBlink(false), 120);
        }, 2500 + Math.random() * 3000);
        return () => clearInterval(iv);
    }, []);

    // Eyes follow mouse
    useEffect(() => {
        const handler = (e) => setEyeTarget({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    // Drag
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
    const onPointerUp = useCallback(() => setIsDragging(false), []);

    // Clinical data
    const counts = useMemo(() => {
        if (!clinicalData) return { sepsis: 0, deterioration: 0, labs: 0, fallRisk: 0, criticalCount: 0 };
        const doc = clinicalData.doctor || [];
        const nur = clinicalData.nurse || [];
        return {
            sepsis: doc.find(d => d.id === 'sepsis_alert')?.count || 0,
            deterioration: doc.find(d => d.id === 'deterioration_alert')?.count || 0,
            labs: doc.find(d => d.id === 'critical_labs')?.count || 0,
            fallRisk: nur.find(d => d.id === 'fall_risk')?.count || 0,
            criticalCount: clinicalData.summary?.critical_count || 0,
        };
    }, [clinicalData]);

    const phrases = useMemo(() => {
        const p = [...GREETINGS];
        if (counts.sepsis > 0) p.push(`ตรวจพบผู้ป่วยเสี่ยง Sepsis ${counts.sepsis} ราย ค่ะ`);
        if (counts.labs > 0) p.push(`พบผล Lab วิกฤต ${counts.labs} รายการค่ะ`);
        if (counts.criticalCount === 0) p.push(`ระบบปกติค่ะ ไม่มีสถานการณ์วิกฤต`);
        return p;
    }, [counts]);
    const isCritical = counts.criticalCount > 0;

    useEffect(() => {
        const iv = setInterval(() => {
            setIsThinking(true);
            setTimeout(() => { setPhraseIndex(prev => (prev + 1) % phrases.length); setIsThinking(false); }, 400);
        }, 6000);
        return () => clearInterval(iv);
    }, [phrases.length]);

    // Eye pupil offset (follows mouse)
    const eyeOffsetX = Math.max(-3, Math.min(3, (eyeTarget.x - pos.x - 45) * 0.008));
    const eyeOffsetY = Math.max(-2, Math.min(2, (eyeTarget.y - pos.y - 20) * 0.008));

    const accent = isCritical ? '#ef4444' : '#a78bfa';
    const accentDark = isCritical ? '#dc2626' : '#7c3aed';
    const glow = isCritical ? 'rgba(239,68,68,0.4)' : 'rgba(167,139,250,0.4)';

    return (
        <div style={{
            position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, zIndex: 9999,
            transition: isDragging ? 'none' : undefined,
            cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none',
            filter: `drop-shadow(0 6px 20px ${glow})`,
        }}
            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
        >
            {/* Speech bubble */}
            {!expanded && (
                <div style={{
                    position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginBottom: '10px', width: '200px',
                    opacity: isThinking ? 0.3 : 1, transition: 'opacity 0.3s',
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                        borderRadius: '14px', padding: '8px 12px',
                        border: `1.5px solid ${accent}40`, boxShadow: `0 4px 16px rgba(0,0,0,0.08)`,
                        fontSize: '10px', fontWeight: 600, color: '#475569', lineHeight: 1.5,
                    }}>
                        {phrases[phraseIndex % phrases.length]}
                        <div style={{
                            position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                            width: '10px', height: '10px', background: 'rgba(255,255,255,0.95)',
                            borderRight: `1.5px solid ${accent}40`, borderBottom: `1.5px solid ${accent}40`,
                        }} />
                    </div>
                </div>
            )}

            {/* Expanded panel */}
            {expanded && (
                <div style={{
                    position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginBottom: '12px', width: '280px',
                    background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                    borderRadius: '18px', padding: '14px', border: `2px solid ${accent}30`,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.12), 0 0 20px ${glow}`,
                    animation: 'alita-pop 0.3s ease-out',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 900, background: `linear-gradient(135deg, ${accentDark}, #ec4899)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            น้องขวัญใจ — Clinical AI
                        </span>
                        <button onClick={() => setExpanded(false)} style={{ width: '22px', height: '22px', borderRadius: '50%', border: 'none', background: '#f1f5f9', cursor: 'pointer', fontSize: '11px', color: '#94a3b8' }}>✕</button>
                    </div>
                    <div style={{ background: `${accent}08`, borderRadius: '10px', padding: '8px 10px', marginBottom: '8px', border: `1px solid ${accent}15`, fontSize: '11px', fontWeight: 600, color: '#475569', lineHeight: 1.5 }}>
                        {phrases[phraseIndex % phrases.length]}
                    </div>
                    {counts.sepsis > 0 && <AR color="#ef4444" icon="🔴" label="Sepsis Risk" val={`${counts.sepsis} ราย`} />}
                    {counts.deterioration > 0 && <AR color="#f59e0b" icon="⚠️" label="Deteriorating" val={`${counts.deterioration} ราย`} />}
                    {counts.labs > 0 && <AR color="#f97316" icon="🧪" label="Critical Labs" val={`${counts.labs} รายการ`} />}
                    {counts.fallRisk > 0 && <AR color="#8b5cf6" icon="⚠️" label="Fall Risk" val={`${counts.fallRisk} ราย`} />}
                    {counts.criticalCount === 0 && (
                        <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#059669', padding: '6px', background: 'rgba(16,185,129,0.06)', borderRadius: '8px' }}>✅ ระบบปกติค่ะ</div>
                    )}
                </div>
            )}

            {/* ===== ALITA-STYLE ROBOT ===== */}
            <svg width="90" height="110" viewBox="0 0 90 110" onClick={() => setExpanded(p => !p)}
                style={{ transform: `scaleX(${direction})`, transition: 'transform 0.3s' }}>

                {/* Hair — dark flowing cyber-hair */}
                <ellipse cx="45" cy="22" rx="28" ry="18" fill="#1e1b4b" />
                <ellipse cx="45" cy="18" rx="25" ry="14" fill="#312e81" />
                {/* Side hair strands */}
                <path d="M18,28 Q12,40 16,52" stroke="#1e1b4b" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M72,28 Q78,40 74,52" stroke="#1e1b4b" strokeWidth="6" fill="none" strokeLinecap="round" />

                {/* Face — soft round anime face */}
                <ellipse cx="45" cy="32" rx="22" ry="20" fill="#fce7f3" />
                <ellipse cx="45" cy="34" rx="20" ry="18" fill="#fdf2f8" />

                {/* Big Alita Eyes */}
                {!eyeBlink ? (<>
                    {/* Left eye — large, expressive */}
                    <ellipse cx="36" cy="32" rx="9" ry={10} fill="white" stroke="#c084fc" strokeWidth="1.5" />
                    <ellipse cx={36 + eyeOffsetX} cy={32 + eyeOffsetY} rx="5.5" ry="6" fill={isCritical ? '#ef4444' : '#7c3aed'} />
                    <ellipse cx={36 + eyeOffsetX} cy={32 + eyeOffsetY} rx="3" ry="3.5" fill={isCritical ? '#1e1b4b' : '#1e1b4b'} />
                    <circle cx={34 + eyeOffsetX * 0.5} cy={29 + eyeOffsetY * 0.5} r="2" fill="white" opacity="0.9" />
                    <circle cx={38 + eyeOffsetX * 0.3} cy={31 + eyeOffsetY * 0.3} r="1" fill="white" opacity="0.6" />
                    {/* Right eye */}
                    <ellipse cx="54" cy="32" rx="9" ry={10} fill="white" stroke="#c084fc" strokeWidth="1.5" />
                    <ellipse cx={54 + eyeOffsetX} cy={32 + eyeOffsetY} rx="5.5" ry="6" fill={isCritical ? '#ef4444' : '#7c3aed'} />
                    <ellipse cx={54 + eyeOffsetX} cy={32 + eyeOffsetY} rx="3" ry="3.5" fill="#1e1b4b" />
                    <circle cx={52 + eyeOffsetX * 0.5} cy={29 + eyeOffsetY * 0.5} r="2" fill="white" opacity="0.9" />
                    <circle cx={56 + eyeOffsetX * 0.3} cy={31 + eyeOffsetY * 0.3} r="1" fill="white" opacity="0.6" />
                </>) : (<>
                    {/* Blink — happy curve */}
                    <path d="M27,32 Q36,37 45,32" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M45,32 Q54,37 63,32" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>)}

                {/* Blush cheeks */}
                <ellipse cx="26" cy="38" rx="5" ry="3" fill="#f9a8d4" opacity="0.5" />
                <ellipse cx="64" cy="38" rx="5" ry="3" fill="#f9a8d4" opacity="0.5" />

                {/* Mouth */}
                <path d={expanded ? "M40,42 Q45,47 50,42" : isThinking ? "M40,43 L50,43" : "M40,42 Q45,46 50,42"}
                    stroke="#c084fc" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* Cyber markings under eyes */}
                <line x1="28" y1="40" x2="32" y2="42" stroke={accent} strokeWidth="1" opacity="0.4" />
                <line x1="58" y1="40" x2="62" y2="42" stroke={accent} strokeWidth="1" opacity="0.4" />

                {/* Neck */}
                <rect x="40" y="50" width="10" height="6" rx="2" fill="#e2e8f0" />

                {/* Body — sleek cyber armor */}
                <path d="M25,56 L20,80 Q20,85 25,85 L65,85 Q70,85 70,80 L65,56 Q55,52 45,52 Q35,52 25,56Z"
                    fill={`url(#bodyGrad)`} stroke={accent} strokeWidth="1" opacity="0.95" />

                {/* Body gradient */}
                <defs>
                    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isCritical ? '#fca5a5' : '#c4b5fd'} />
                        <stop offset="100%" stopColor={isCritical ? '#ef4444' : '#7c3aed'} />
                    </linearGradient>
                    <linearGradient id="armGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isCritical ? '#fca5a5' : '#c4b5fd'} />
                        <stop offset="100%" stopColor={isCritical ? '#dc2626' : '#6d28d9'} />
                    </linearGradient>
                </defs>

                {/* Chest reactor */}
                <circle cx="45" cy="68" r="5" fill={isThinking ? '#fbbf24' : isCritical ? '#ef4444' : '#10b981'} opacity="0.9">
                    <animate attributeName="r" values="4.5;5.5;4.5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="45" cy="68" r="7" fill="none" stroke={isThinking ? '#fbbf2440' : isCritical ? '#ef444440' : '#10b98140'} strokeWidth="1">
                    <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Armor lines */}
                <line x1="35" y1="58" x2="30" y2="72" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                <line x1="55" y1="58" x2="60" y2="72" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

                {/* Arms */}
                <g style={{ animation: isMoving ? 'alita-arm-l 0.5s ease-in-out infinite' : undefined, transformOrigin: '22px 58px' }}>
                    <path d="M22,58 Q16,68 18,78" stroke="url(#armGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
                    <circle cx="18" cy="78" r="4" fill="#e2e8f0" stroke={accent} strokeWidth="1" />
                </g>
                <g style={{ animation: isMoving ? 'alita-arm-r 0.5s ease-in-out infinite' : undefined, transformOrigin: '68px 58px' }}>
                    <path d="M68,58 Q74,68 72,78" stroke="url(#armGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
                    <circle cx="72" cy="78" r="4" fill="#e2e8f0" stroke={accent} strokeWidth="1" />
                </g>

                {/* Legs */}
                <g style={{ animation: isMoving ? 'alita-leg-l 0.5s ease-in-out infinite' : undefined, transformOrigin: '38px 85px' }}>
                    <path d="M38,85 L35,100" stroke={accentDark} strokeWidth="6" strokeLinecap="round" />
                    <ellipse cx="34" cy="103" rx="7" ry="3" fill="#312e81" />
                </g>
                <g style={{ animation: isMoving ? 'alita-leg-r 0.5s ease-in-out infinite' : undefined, transformOrigin: '52px 85px' }}>
                    <path d="M52,85 L55,100" stroke={accentDark} strokeWidth="6" strokeLinecap="round" />
                    <ellipse cx="56" cy="103" rx="7" ry="3" fill="#312e81" />
                </g>

                {/* Critical badge */}
                {isCritical && (
                    <g>
                        <circle cx="72" cy="12" r="10" fill="#ef4444" stroke="white" strokeWidth="2">
                            <animate attributeName="r" values="9;11;9" dur="1s" repeatCount="indefinite" />
                        </circle>
                        <text x="72" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="900">{counts.criticalCount}</text>
                    </g>
                )}
            </svg>

            {/* Name label */}
            <div style={{
                textAlign: 'center', marginTop: '-4px',
                fontSize: '10px', fontWeight: 900,
                background: `linear-gradient(135deg, ${accentDark}, #ec4899)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em', textShadow: 'none',
            }}>น้องขวัญใจ</div>

            <style>{`
                @keyframes alita-pop { 0%{transform:translateX(-50%) scale(0.85);opacity:0} 100%{transform:translateX(-50%) scale(1);opacity:1} }
                @keyframes alita-arm-l { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-20deg)} }
                @keyframes alita-arm-r { 0%,100%{transform:rotate(0)} 50%{transform:rotate(20deg)} }
                @keyframes alita-leg-l { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-15deg)} }
                @keyframes alita-leg-r { 0%,100%{transform:rotate(0)} 75%{transform:rotate(-15deg)} }
            `}</style>
        </div>
    );
});

function AR({ color, icon, label, val }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', padding: '5px 8px', background: `${color}08`, borderRadius: '6px', border: `1px solid ${color}18`, marginBottom: '3px' }}>
            <span style={{ fontWeight: 700, color }}>{icon} {label}</span>
            <span style={{ fontWeight: 900, color }}>{val}</span>
        </div>
    );
}

export default AIAssistant;
