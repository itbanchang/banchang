// ============================================================
// StatusBadge — Priority/Severity Badge Component
// Sprint 1 Task 2.3 — WCAG triple-cue (emoji + text + color) + ARIA.
// ============================================================
import React from 'react';

const StatusBadge = ({
  level = 'MEDIUM', // HIGH, MEDIUM, LOW, INFO, SUCCESS
  text,
  icon = true,
  size = 'sm', // sm, md, lg
}) => {
  const config = {
    HIGH:    { bg: 'rgba(244,63,94,.15)',  text: '#f43f5e', icon: '🔴', label: 'HIGH',    aria: 'ระดับสูง / วิกฤต' },
    MEDIUM:  { bg: 'rgba(245,158,11,.15)', text: '#f59e0b', icon: '🟡', label: 'MEDIUM',  aria: 'ระดับปานกลาง / เฝ้าระวัง' },
    LOW:     { bg: 'rgba(16,185,129,.15)', text: '#10b981', icon: '🟢', label: 'LOW',     aria: 'ระดับต่ำ / ปกติ' },
    INFO:    { bg: 'rgba(59,130,246,.15)', text: '#3b82f6', icon: '🔵', label: 'INFO',    aria: 'ข้อมูล' },
    SUCCESS: { bg: 'rgba(16,185,129,.15)', text: '#10b981', icon: '✅', label: 'SUCCESS', aria: 'สำเร็จ / ผ่าน' },
  };

  const c = config[level] || config.MEDIUM;
  const sizeConfig = { sm: '10px', md: '11px', lg: '12px' };

  return (
    <span
      role="status"
      aria-label={`${c.aria}: ${text || c.label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: sizeConfig[size],
        fontWeight: 800,
        padding: size === 'sm' ? '2px 6px' : size === 'md' ? '4px 8px' : '6px 10px',
        borderRadius: '4px',
        background: c.bg,
        color: c.text,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
    >
      {icon && <span aria-hidden="true">{c.icon}</span>}
      <span>{text || c.label}</span>
    </span>
  );
};

export default React.memo(StatusBadge);
