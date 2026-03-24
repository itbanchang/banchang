// ============================================================
// BCH 360° Intelligence V.10 — TabLoadingSkeleton Component
// Animated skeleton shown while tab data is loading
// ============================================================

function SkeletonBlock({ height = '1rem', width = '100%', borderRadius = '8px', style = {} }) {
  return (
    <div
      className="skeleton"
      aria-hidden="true"
      style={{ height, width, borderRadius, ...style }}
    />
  );
}

export default function TabLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="กำลังโหลดข้อมูล"
      aria-busy="true"
      className="space-y-4 animate-fade-in pb-8"
    >
      <span className="sr-only">กำลังโหลดข้อมูล กรุณารอสักครู่...</span>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid var(--md-border)',
              background: 'var(--md-surface)',
            }}
          >
            <SkeletonBlock height="0.75rem" width="60%" style={{ marginBottom: '0.75rem' }} />
            <SkeletonBlock height="2rem" width="80%" style={{ marginBottom: '0.5rem' }} />
            <SkeletonBlock height="0.625rem" width="40%" />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '20px',
          border: '1px solid var(--md-border)',
          background: 'var(--md-surface)',
        }}
      >
        <SkeletonBlock height="0.875rem" width="30%" style={{ marginBottom: '1.25rem' }} />
        <SkeletonBlock height="200px" borderRadius="12px" />
      </div>

      {/* Two-column area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {[0, 1].map(i => (
          <div
            key={i}
            style={{
              padding: '1.5rem',
              borderRadius: '20px',
              border: '1px solid var(--md-border)',
              background: 'var(--md-surface)',
            }}
          >
            <SkeletonBlock height="0.875rem" width="50%" style={{ marginBottom: '1rem' }} />
            {Array.from({ length: 4 }).map((_, j) => (
              <SkeletonBlock
                key={j}
                height="0.75rem"
                width={`${75 - j * 10}%`}
                style={{ marginBottom: '0.75rem' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
