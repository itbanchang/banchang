// ============================================================
// SubErrorBoundary — wraps sub-sections so one broken widget
// doesn't nuke the whole tab. V1-compatible (no V2 deps).
// ============================================================
import React from 'react';

export default class SubErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: null };
        this.handleReset = this.handleReset.bind(this);
    }

    static getDerivedStateFromError(err) {
        return { hasError: true, message: err?.message || String(err) };
    }

    componentDidCatch(err, info) {
        console.error('[SubErrorBoundary]', this.props.label || '(unlabelled)', err, info);
    }

    handleReset() {
        this.setState({ hasError: false, message: null });
    }

    render() {
        if (this.state.hasError) {
            const label = this.props.label || 'ส่วนนี้';
            return (
                <div
                    role="alert"
                    className="rounded-lg my-3 p-4 text-[13px]"
                    style={{
                        background: 'rgba(244,63,94,0.06)',
                        border: '1px solid rgba(244,63,94,0.2)',
                        color: '#9f1239',
                    }}
                >
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>⚠️ โหลด {label} ไม่ได้</div>
                    <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: 8 }}>{this.state.message}</div>
                    <button
                        type="button"
                        onClick={this.handleReset}
                        className="px-3 py-1 rounded font-semibold"
                        style={{
                            background: '#fff',
                            border: '1px solid rgba(244,63,94,0.25)',
                            color: '#be123c',
                            fontSize: '11px',
                            cursor: 'pointer',
                        }}
                    >
                        ลองใหม่
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
