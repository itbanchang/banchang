// ============================================================
// BCH 360° Intelligence V.10 — Ultra Smart AI Assistant Widget
// AI Live Telemetry & Micro-animations
// Context-Aware with Dynamic Phrases & Clinical Insights
// ============================================================
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const STATIC_PHRASES = [
    "ระบบพยากรณ์พร้อมทำงาน 100% ครับ มีอะไรให้ผมช่วยวิเคราะห์ไหม?",
    "ผมกำลังประมวลผลข้อมูล HOSxP XE แบบ Real-time ครับ"
];

const AIAssistant = React.memo(function AIAssistant() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isThinking, setIsThinking] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [clinicalData, setClinicalData] = useState(null);

    // Fetch clinical insights on mount and every 2 minutes
    const fetchClinical = useCallback(async () => {
        try {
            const res = await fetch('/api/ai/clinical-insights', { credentials: 'include' });
            if (res.ok) setClinicalData(await res.json());
        } catch {
            // Silently ignore fetch errors
        }
    }, []);

    useEffect(() => {
        fetchClinical();
        const interval = setInterval(fetchClinical, 120000);
        return () => clearInterval(interval);
    }, [fetchClinical]);

    // Extract counts from nested structure: {doctor:[], nurse:[], admin:[], summary:{}}
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

    // Generate dynamic phrases from real data
    const dynamicPhrases = useMemo(() => {
        const phrases = [...STATIC_PHRASES];
        if (counts.sepsis > 0) phrases.push(`ตรวจพบผู้ป่วยเสี่ยง Sepsis ${counts.sepsis} ราย กรุณาเฝ้าระวังอย่างใกล้ชิด`);
        if (counts.deterioration > 0) phrases.push(`แจ้งเตือน: ผู้ป่วย ${counts.deterioration} ราย มีแนวโน้มอาการทรุดลง`);
        if (counts.labs > 0) phrases.push(`พบผล Lab วิกฤต ${counts.labs} รายการ รอแพทย์ตรวจสอบ`);
        if (counts.fallRisk > 0) phrases.push(`ผู้ป่วยเสี่ยงล้ม ${counts.fallRisk} ราย — เฝ้าระวัง`);
        if (counts.monitorGaps > 0) phrases.push(`${counts.monitorGaps} ราย ไม่ได้วัด Vital Signs ≥ 6 ชม.`);
        if (counts.criticalWards > 0) phrases.push(`${counts.criticalWards} ward Acuity สูง — ต้องเพิ่มพยาบาล`);
        if (counts.totalInsights > 0 && counts.criticalCount === 0) phrases.push(`ระบบเฝ้าระวังปกติ — ไม่พบสถานการณ์วิกฤต`);
        return phrases;
    }, [counts]);

    // Critical count for badge
    const criticalCount = counts.criticalCount;

    const isCritical = criticalCount > 0;

    // Cycle phrases
    useEffect(() => {
        const interval = setInterval(() => {
            setIsThinking(true);
            setTimeout(() => {
                setPhraseIndex(prev => (prev + 1) % dynamicPhrases.length);
                setIsThinking(false);
            }, 500);
        }, 8000);
        return () => clearInterval(interval);
    }, [dynamicPhrases.length]);

    return (
        <div className="fixed bottom-10 right-10 z-[100] group">
            <div className="relative">
                {/* Expanded live stats panel */}
                {expanded && clinicalData && (
                    <div
                        className="absolute bottom-full right-0 mb-4 w-72 p-4 rounded-2xl shadow-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.97)',
                            backdropFilter: 'blur(12px)',
                            border: isCritical ? '2px solid rgba(239,68,68,0.5)' : '1px solid rgba(124,58,237,0.2)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 0 20px rgba(124,58,237,0.1)',
                        }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="font-black uppercase text-purple-700 text-[10px] tracking-widest">
                                Clinical Intelligence
                            </p>
                            <button
                                onClick={() => setExpanded(false)}
                                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-2">
                            {counts.sepsis > 0 && (
                                <div className="flex justify-between items-center text-xs p-2 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-bold text-red-700">🔴 Sepsis Risk</span>
                                    <span className="font-extrabold text-red-800">{counts.sepsis} ราย</span>
                                </div>
                            )}
                            {counts.deterioration > 0 && (
                                <div className="flex justify-between items-center text-xs p-2 bg-amber-50 rounded-lg border border-amber-200">
                                    <span className="font-bold text-amber-700">⚠️ Deteriorating</span>
                                    <span className="font-extrabold text-amber-800">{counts.deterioration} ราย</span>
                                </div>
                            )}
                            {counts.labs > 0 && (
                                <div className="flex justify-between items-center text-xs p-2 bg-orange-50 rounded-lg border border-orange-200">
                                    <span className="font-bold text-orange-700">🧪 Critical Labs</span>
                                    <span className="font-extrabold text-orange-800">{counts.labs} รายการ</span>
                                </div>
                            )}
                            {counts.fallRisk > 0 && (
                                <div className="flex justify-between items-center text-xs p-2 bg-purple-50 rounded-lg border border-purple-200">
                                    <span className="font-bold text-purple-700">⚠️ Fall Risk</span>
                                    <span className="font-extrabold text-purple-800">{counts.fallRisk} ราย</span>
                                </div>
                            )}
                            {counts.monitorGaps > 0 && (
                                <div className="flex justify-between items-center text-xs p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                                    <span className="font-bold text-indigo-700">📋 V/S Gap</span>
                                    <span className="font-extrabold text-indigo-800">{counts.monitorGaps} ราย</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-200">
                                <span className="font-bold text-slate-700">🧠 Total Insights</span>
                                <span className="font-extrabold text-slate-800">{counts.totalInsights}</span>
                            </div>
                            {criticalCount === 0 && (
                                <div className="text-xs text-center text-green-600 font-bold p-2 bg-green-50 rounded-lg">
                                    ✅ ระบบปกติ — ไม่พบสถานการณ์วิกฤต
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Dynamic tooltip bubble (show when not expanded) */}
                {!expanded && (
                    <div className="absolute bottom-full right-0 mb-4 w-64 opacity-0 group-hover:opacity-100
                                    transition-all duration-300 translate-y-4 group-hover:translate-y-0
                                    pointer-events-none origin-bottom-right">
                        <div
                            className="p-4 rounded-3xl shadow-2xl relative overflow-hidden"
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(124,58,237,0.2)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(124,58,237,0.1)',
                            }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-amber-400 animate-pulse' : isCritical ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                <p className="font-black uppercase text-purple-700 text-[10px] tracking-widest">
                                    BCH-AI Executive v10
                                </p>
                            </div>

                            <p className={`font-medium leading-relaxed text-slate-700 text-xs transition-opacity duration-500 ${isThinking ? 'opacity-0' : 'opacity-100'}`}>
                                {dynamicPhrases[phraseIndex % dynamicPhrases.length]}
                            </p>

                            {/* Pointer arrow */}
                            <div
                                className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
                                style={{ background: 'rgba(255, 255, 255, 0.95)', borderRight: '1px solid rgba(124,58,237,0.2)', borderBottom: '1px solid rgba(124,58,237,0.2)' }}
                            />
                        </div>
                    </div>
                )}

                {/* FAB button */}
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-2xl
                               transition-transform duration-300 group-hover:scale-110 active:scale-95"
                    style={{
                        background: isCritical
                            ? 'linear-gradient(135deg, #dc2626, #b91c1c)'
                            : 'linear-gradient(135deg, #6d28d9, #4f46e5)',
                    }}
                    title="BCH Intelligence AI"
                >
                    {/* Ring animation */}
                    <div className={`absolute inset-0 rounded-full border-2 ${isCritical ? 'border-red-400/50' : 'border-purple-400/50'} animate-[ping_3s_infinite] scale-150 opacity-0 group-hover:opacity-100`} />

                    {/* Inner AI Core */}
                    <div className="w-8 h-8 relative flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full border-t-white animate-spin-slow" />
                        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                    </div>

                    {/* Critical count badge */}
                    {isCritical && (
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                            {criticalCount}
                        </span>
                    )}
                </button>

                {/* Shadow pedestal */}
                <div
                    className="w-12 h-2 rounded-full mx-auto mt-3 blur-md transform scale-90 group-hover:scale-110 transition-transform"
                    style={{ background: isCritical ? 'rgba(220, 38, 38, 0.4)' : 'rgba(109, 40, 217, 0.4)' }}
                />
            </div>
        </div>
    );
});

export default AIAssistant;
