// ============================================================
// BCH 360° Intelligence V.10 — EmptyState Component
// Shown when a section has no data to display
// ============================================================
import React from 'react';

const EmptyState = React.memo(function EmptyState({
  icon = '📊',
  title = 'ไม่มีข้อมูล',
  description = 'ยังไม่มีข้อมูลในขณะนี้ กรุณาลองใหม่ภายหลัง',
  action = null,
}) {
  return (
    <div
      role="status"
      aria-label={title}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center',
        gap: '0.75rem',
      }}
    >
      <span style={{ fontSize: '48px', lineHeight: 1 }} aria-hidden="true">
        {icon}
      </span>
      <h3
        style={{
          fontSize: 'var(--fs-md)',
          fontWeight: 800,
          color: 'var(--md-text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 'var(--fs-sm)',
          color: 'var(--md-text-tertiary)',
          margin: 0,
          maxWidth: '360px',
        }}
      >
        {description}
      </p>
      {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
    </div>
  );
});

export default EmptyState;
