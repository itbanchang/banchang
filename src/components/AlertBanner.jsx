// ============================================================
// BCH 360° Intelligence V.10 — Alert Banner
// Material Dashboard 3 PRO — White Minimal
// ============================================================
import React from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';

export default function AlertBanner() {
    const { state, dismissAlert } = useDashboard();
    const { emergencyAlerts } = state;

    if (!emergencyAlerts || emergencyAlerts.length === 0) return null;

    return (
        <div
            className="relative mb-4 overflow-hidden rounded-2xl border shadow-card"
            style={{
                background: 'linear-gradient(90deg,rgba(244,63,94,.06) 0%,#fff 60%)',
                borderColor: 'rgba(244,63,94,.2)',
            }}
        >
            <div className="flex items-stretch">
                {/* Label chip */}
                <div
                    className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
                    style={{ background: '#f43f5e', minWidth: '9rem' }}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.18em]">Live Alert</span>
                </div>

                {/* Ticker */}
                <div className="flex-1 overflow-hidden relative h-9 flex items-center">
                    <div className="flex items-center h-full animate-news-ticker whitespace-nowrap px-4 gap-8">
                        {emergencyAlerts.map((alert, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: alert.severity === 'critical' ? '#f43f5e' : '#f59e0b' }}
                                />
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    {new Date(alert.timestamp).toLocaleTimeString('th-TH')}
                                </span>
                                <span className="text-[13px] font-black tracking-tight"
                                    style={{ color: 'var(--md-text-primary)' }}>
                                    {alert.message}
                                </span>
                                <span className="text-gray-300 mx-2">·</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dismiss */}
                <button
                    onClick={() => dismissAlert(0)}
                    className="px-4 border-l flex items-center text-gray-400 hover:text-gray-600 hover:bg-gray-50
                               transition-colors text-[10px] font-bold uppercase tracking-widest flex-shrink-0"
                    style={{ borderColor: 'rgba(244,63,94,.15)' }}
                >
                    Dismiss
                </button>
            </div>

            {/* Bottom accent line */}
            <div
                className="h-px w-full"
                style={{ background: 'linear-gradient(90deg,#f43f5e,rgba(244,63,94,0))' }}
            />
        </div>
    );
}
