// ============================================================
// BCH 360° Intelligence V.10 — Daily Briefing Modal
// Material Dashboard 3 PRO — White Minimal
// ============================================================
import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';

export default function DailyBriefing() {
    const { state } = useDashboard();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasShown = sessionStorage.getItem('briefingShown');
        if (!hasShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('briefingShown', 'true');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isOpen) return null;

    const erCount = state.erTodayPatients?.length || 0;
    const criticalCount = state.erTriageStats?.find(s => s.id === 1)?.cnt || 0;
    const surgeRisk = state.erSurge?.surge_alert ? 'HIGH' : 'STABLE';

    const statCards = [
        { label: 'ER Cases', value: erCount, icon: '🚑', color: '#7c3aed', bg: 'rgba(124,58,237,.08)' },
        { label: 'Critical', value: criticalCount, icon: '🚨', color: '#f43f5e', bg: 'rgba(244,63,94,.08)' },
        {
            label: 'AI Flow', value: surgeRisk, icon: '📈', color: surgeRisk === 'STABLE' ? '#10b981' : '#f43f5e',
            bg: surgeRisk === 'STABLE' ? 'rgba(16,185,129,.08)' : 'rgba(244,63,94,.08)'
        },
    ];

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in"
            style={{ background: 'rgba(15,23,42,.45)', backdropFilter: 'blur(12px)' }}
        >
            <div
                className="w-full max-w-4xl overflow-hidden animate-slide-up flex flex-col md:flex-row"
                style={{
                    background: 'var(--md-surface)',
                    borderRadius: '1.25rem',
                    border: '1px solid var(--md-border)',
                    boxShadow: '0 32px 80px rgba(0,0,0,.18)',
                }}
            >
                {/* ---- Left Sidebar ---- */}
                <div
                    className="w-full md:w-72 flex flex-col items-center justify-center p-8 gap-6 border-r"
                    style={{
                        background: 'linear-gradient(160deg,#f5f3ff 0%,#ede9fe 100%)',
                        borderColor: 'var(--md-border)',
                    }}
                >
                    {/* AI Brain icon */}
                    <div
                        className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}
                    >
                        <span className="text-5xl">🧠</span>
                        {/* pulse bottom bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 animate-pulse"
                            style={{ background: 'rgba(255,255,255,.4)' }} />
                    </div>

                    <div className="text-center">
                        <h2 className="font-black tracking-tight" style={{ color: 'var(--md-text-primary)', fontSize: 'var(--fs-xl)' }}>
                            BCH <span style={{ color: 'var(--md-primary)' }}>Intelligence</span>
                        </h2>
                        <span
                            className="inline-block mt-1.5 px-3 py-0.5 rounded-full font-bold uppercase"
                            style={{ fontSize: 'var(--fs-2xs)', background: 'rgba(124,58,237,.12)', color: 'var(--md-primary)', letterSpacing: '0.1em' }}
                        >
                            v10.4 PRO
                        </span>
                    </div>

                    {/* Status chips */}
                    <div className="flex flex-col gap-2 w-full">
                        {[
                            { icon: '✓', label: 'Diagnostics Ready', color: '#10b981', bg: 'rgba(16,185,129,.1)' },
                            { icon: '⚡', label: 'Neural Link Stable', color: '#7c3aed', bg: 'rgba(124,58,237,.1)' },
                        ].map(s => (
                            <div key={s.label} className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
                                style={{ background: s.bg }}>
                                <span style={{ color: s.color, fontSize: 'var(--fs-md)', lineHeight: 1 }}>{s.icon}</span>
                                <span className="font-bold uppercase" style={{ color: s.color, fontSize: 'var(--fs-2xs)', letterSpacing: '0.08em' }}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---- Right Content ---- */}
                <div className="flex-1 flex flex-col">
                    <div className="p-8 flex-1 overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="rounded-md px-2.5 py-0.5 font-bold uppercase"
                                        style={{ background: '#f43f5e', color: '#fff', fontSize: 'var(--fs-2xs)', letterSpacing: '0.1em' }}
                                    >
                                        Executive Summary
                                    </span>
                                    <span className="font-semibold uppercase" style={{ color: 'var(--md-text-tertiary)', fontSize: 'var(--fs-2xs)', letterSpacing: '0.1em' }}>
                                        Hospital Intelligence
                                    </span>
                                </div>
                                <h1 className="font-black" style={{ fontSize: 'var(--fs-3xl)', color: 'var(--md-text-primary)' }}>
                                    Predictive Insight
                                </h1>
                            </div>

                            <div
                                className="px-4 py-2 rounded-xl text-center"
                                style={{ background: 'var(--md-surface-2)', border: '1px solid var(--md-border)' }}
                            >
                                <p className="font-bold uppercase" style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', letterSpacing: '0.12em' }}>Session</p>
                                <p className="font-black" style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-primary)', letterSpacing: '0.08em' }}>#MDP-V10</p>
                            </div>
                        </div>

                        {/* Stat cards */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {statCards.map(card => (
                                <div
                                    key={card.label}
                                    className="p-4 rounded-2xl"
                                    style={{ background: card.bg, border: `1px solid ${card.color}20` }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold uppercase" style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-secondary)', letterSpacing: '0.08em' }}>
                                            {card.label}
                                        </span>
                                        <span style={{ fontSize: 'var(--fs-md)' }}>{card.icon}</span>
                                    </div>
                                    <div className="font-black" style={{ fontSize: 'var(--fs-2xl)', color: card.color }}>
                                        {card.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Summary paragraph */}
                        <div
                            className="p-5 rounded-2xl border-l-4"
                            style={{
                                background: 'var(--md-surface-2)',
                                borderLeftColor: 'var(--md-primary)',
                                border: '1px solid var(--md-border)',
                                borderLeft: `4px solid var(--md-primary)`,
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-primary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    AI Summary
                                </span>
                            </div>
                            <p className="font-medium italic leading-relaxed" style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-secondary)' }}>
                                "สวัสดียามเช้าครับท่านผู้บริหาร — ระบบ BCH Intelligence สรุปรายงานดังนี้: ขณะนี้แผนก ER มีผู้เข้าใช้งาน {erCount} ราย
                                สถานะโดยรวม <strong style={{ color: surgeRisk === 'STABLE' ? '#10b981' : '#f43f5e' }}>{surgeRisk === 'STABLE' ? 'ปกติ' : 'ต้องเฝ้าระวัง'}</strong>&nbsp;
                                มีผู้ป่วยวิกฤตที่ต้องการการดูแลด่วน {criticalCount} ท่าน พร้อมรับคำสั่งงานต่อใน Dashboard ครับ"
                            </p>
                        </div>
                    </div>

                    {/* Live ticker */}
                    <div
                        className="h-10 flex items-center overflow-hidden border-t"
                        style={{ background: 'var(--md-surface-2)', borderColor: 'var(--md-divider)' }}
                    >
                        <div
                            className="px-3 h-full flex items-center gap-2 flex-shrink-0"
                            style={{ background: 'var(--md-primary)' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                            <span className="font-black text-white uppercase" style={{ fontSize: 'var(--fs-2xs)', letterSpacing: '0.15em' }}>LIVE</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="animate-news-ticker whitespace-nowrap flex items-center gap-10 px-4 font-semibold"
                                style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)' }}>
                                {state.emergencyAlerts?.length > 0
                                    ? state.emergencyAlerts.map((alert, i) => (
                                        <span key={i} className="flex items-center gap-2">
                                            <span style={{ color: alert.severity === 'critical' ? '#f43f5e' : '#f59e0b' }}>●</span>
                                            {alert.message}
                                        </span>
                                    ))
                                    : <span>BCH AI NODE READY · ALL MODULES STABLE · DATA SYNC OPTIMIZED</span>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Footer button */}
                    <div className="p-5 border-t flex justify-end" style={{ borderColor: 'var(--md-divider)' }}>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="font-bold uppercase transition-all active:scale-95 shadow-md hover:shadow-lg"
                            style={{
                                background: 'var(--md-primary)',
                                color: '#fff',
                                fontSize: 'var(--fs-xs)',
                                letterSpacing: '0.12em',
                                padding: '0.625rem 2.5rem',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 12px rgba(124,58,237,.3)',
                            }}
                        >
                            Explore Dashboard →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
