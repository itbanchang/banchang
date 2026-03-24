// ============================================================
// BCH 360° Intelligence V.10 — Alert Banner (Theme-Aware)
// ============================================================
import React from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';

function AlertBanner() {
    const { state, dismissAlert } = useDashboard();
    const { emergencyAlerts } = state;

    if (!emergencyAlerts || emergencyAlerts.length === 0) return null;

    return (
        <div
            className="relative mb-4 overflow-hidden rounded-2xl border shadow-card"
            style={{
                background: 'linear-gradient(90deg, rgba(244,63,94,.08) 0%, var(--md-surface) 60%)',
                borderColor: 'rgba(244,63,94,.25)',
            }}
        >
            <div className="flex items-stretch">
                {/* Label chip */}
                <div
                    className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
                    style={{ background: '#f43f5e', minWidth: '9rem' }}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                    <span style={{ fontSize: 11, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        Live Alert
                    </span>
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
                                <span style={{
                                    fontSize: 11, fontWeight: 700,
                                    color: 'var(--md-text-tertiary)',
                                    textTransform: 'uppercase', letterSpacing: '0.1em',
                                }}>
                                    {new Date(alert.timestamp).toLocaleTimeString('th-TH')}
                                </span>
                                <span style={{
                                    fontSize: 13, fontWeight: 800,
                                    color: 'var(--md-text-primary)',
                                    letterSpacing: '-0.01em',
                                }}>
                                    {alert.message}
                                </span>
                                <span style={{ color: 'var(--md-border)', margin: '0 8px' }}>·</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dismiss */}
                <button
                    onClick={() => dismissAlert(0)}
                    style={{
                        padding: '0 1rem',
                        borderLeft: '1px solid rgba(244,63,94,.2)',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--md-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        flexShrink: 0,
                        transition: 'color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--md-text-primary)';
                        e.currentTarget.style.background = 'var(--md-surface-2)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--md-text-secondary)';
                        e.currentTarget.style.background = 'none';
                    }}
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

export default React.memo(AlertBanner);
