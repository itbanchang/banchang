// ============================================================
// BCH 360° Intelligence V.10 — App Header Layout Component
// Extracted from App.jsx for separation of concerns
// ============================================================
import React from 'react';
import Clock from '../components/Clock.tsx';
import DataFreshnessBar from '../components/shared/DataFreshnessBar.jsx';

/**
 * @param {{ darkMode: boolean, isLive: boolean, user: object|null,
 *           onDarkModeToggle: () => void, onServerSettings: () => void,
 *           onForceRefresh: () => void }} props
 */
export default function AppHeader({
  darkMode,
  isLive,
  user,
  onDarkModeToggle,
  onServerSettings,
  onForceRefresh,
}) {
  const initials = (user?.full_name || 'Admin')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        background: darkMode ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
        borderColor: 'var(--md-border)',
        boxShadow: darkMode
          ? '0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,.2)'
          : '0 1px 0 var(--md-divider), 0 2px 8px rgba(0,0,0,.04)',
      }}
    >
      <div className="max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* ── Brand ── */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-base font-black shadow-md"
                style={{ background: 'linear-gradient(135deg,#0f766e,#059669)' }}
              >
                B
              </div>
              {/* Online dot */}
              <span
                className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                style={{ background: isLive ? '#10b981' : '#94a3b8' }}
              />
            </div>

            <div>
              <h1
                className="text-[17px] font-black tracking-tight leading-none flex items-center gap-1.5"
                style={{ color: 'var(--md-text-primary)' }}
              >
                BCH
                <span style={{ color: 'var(--md-primary)' }}>360°</span>
                <span
                  style={{
                    color: 'var(--md-text-secondary)',
                    fontWeight: 400,
                    fontSize: 13,
                    letterSpacing: '0.05em',
                  }}
                >
                  Intelligence
                </span>
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isLive ? '#10b981' : '#f59e0b' }}
                />
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--md-text-secondary)',
                    margin: 0,
                  }}
                >
                  {isLive ? 'System Online' : 'Connecting…'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Data Freshness Bar ── */}
          <div className="hidden md:flex">
            <DataFreshnessBar onForceRefresh={onForceRefresh} />
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-3">
            {/* Clock */}
            <div className="text-right hidden sm:block">
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--md-text-tertiary)',
                  margin: 0,
                }}
              >
                Global Scan
              </p>
              <Clock />
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={onDarkModeToggle}
              title={darkMode ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: darkMode ? 'rgba(45,212,191,0.15)' : 'rgba(15,23,42,0.06)',
                border: `1px solid ${darkMode ? 'rgba(45,212,191,0.3)' : 'rgba(0,0,0,0.06)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '16px',
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Server Settings */}
            <button
              onClick={onServerSettings}
              title="Database Server Settings"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(15,118,110,0.08)',
                border: '1px solid rgba(15,118,110,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '16px',
              }}
            >
              ⚙️
            </button>

            {/* User Avatar */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm"
              style={{ background: 'linear-gradient(135deg,#0f766e,#0284c7)' }}
            >
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
