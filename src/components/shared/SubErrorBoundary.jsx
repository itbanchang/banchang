// ============================================================
// SubErrorBoundary — wraps sub-sections (especially charts) so one
// broken widget does not nuke the whole tab.
// Uses React class component (error boundaries require class form).
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
            const label = this.props.label || 'section';
            return (
                <div
                    role="alert"
                    className="rounded-card p-4 border border-danger-200 bg-danger-50 text-danger-700 text-fs-sm"
                >
                    <div className="font-bold mb-1">⚠️ โหลด {label} ไม่ได้</div>
                    <div className="text-fs-xs opacity-70 mb-2">{this.state.message}</div>
                    <button
                        type="button"
                        onClick={this.handleReset}
                        className="px-3 py-1 rounded-lg bg-white border border-danger-200 text-danger-700 text-fs-xs font-semibold hover:bg-danger-100"
                    >
                        ลองใหม่
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
