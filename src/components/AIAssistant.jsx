// ============================================================
// BCH 360° Intelligence V.10 — AI Assistant Widget
// Material Dashboard 3 PRO — White Minimal
// ============================================================
import React from 'react';

export default function AIAssistant() {
    return (
        <div className="fixed bottom-8 right-8 z-[100] group">
            <div className="relative">
                {/* Hover tooltip bubble */}
                <div className="absolute bottom-full right-0 mb-3 w-52 opacity-0 group-hover:opacity-100
                                transition-all duration-300 translate-y-3 group-hover:translate-y-0
                                pointer-events-none">
                    <div
                        className="p-3.5 rounded-2xl shadow-xl"
                        style={{
                            background: 'var(--md-surface)',
                            border: '1px solid var(--md-border)',
                            boxShadow: '0 8px 32px rgba(0,0,0,.12)',
                        }}
                    >
                        <p className="font-black uppercase" style={{ color: 'var(--md-primary)', fontSize: 'var(--fs-2xs)', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>
                            BCH-AI v10.4
                        </p>
                        <p className="font-medium leading-relaxed" style={{ color: 'var(--md-text-secondary)', fontSize: 'var(--fs-xs)' }}>
                            ระบบพยากรณ์พร้อมทำงาน 100% ครับ มีอะไรให้ผมช่วยวิเคราะห์เพิ่มเติมไหมครับ?
                        </p>
                        {/* Caret */}
                        <div
                            className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
                            style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: 'none', borderLeft: 'none' }}
                        />
                    </div>
                </div>

                {/* FAB button */}
                <button
                    className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-xl
                               transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl active:scale-95"
                    style={{
                        background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
                        boxShadow: '0 8px 24px rgba(124,58,237,.35)',
                    }}
                    title="AI Assistant"
                >
                    {/* Eyes */}
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
                        <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
                    </div>
                    {/* Mouth / voice bar */}
                    <div className="w-6 h-0.5 rounded-full overflow-hidden bg-white/20">
                        <div className="h-full w-1/2 rounded-full bg-white/70 animate-pulse" />
                    </div>
                </button>

                {/* Shadow pedestal */}
                <div
                    className="w-10 h-1.5 rounded-full mx-auto mt-2 blur-sm animate-pulse"
                    style={{ background: 'rgba(124,58,237,.2)' }}
                />
            </div>
        </div>
    );
}
