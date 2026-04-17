// ============================================================
// BCH 360° Intelligence V.10 — Sub-Component Error Boundary
// Lightweight boundary for sections within tabs.
// Crashes show a minimal inline fallback instead of killing the tab.
// ============================================================
import React from 'react';

class SubErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error(`[SubErrorBoundary] ${this.props.name || 'Section'} crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl p-4" style={{
          background: 'rgba(239,68,68,.04)',
          border: '1px solid rgba(239,68,68,.15)',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', margin: '4px 0' }}>
            {this.props.name || 'Section'} — โหลดไม่สำเร็จ
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              fontSize: '11px', fontWeight: 700, color: '#0284c7',
              background: 'none', border: 'none', cursor: 'pointer',
              textDecoration: 'underline',
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

export default React.memo(SubErrorBoundary);
