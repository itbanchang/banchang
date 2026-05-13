// ============================================================
// HourlyHeatmap — Day-of-week × Hour-of-day grid (24×7)
// Phase H Tier 3.2 — Visualization upgrade
//
// Shows ER/OPD volume distribution to identify peak hours per weekday.
// Color: light (low) → dark (high). 7 rows (Mon-Sun) × 24 cols (00-23).
//
// Data shape:
//   data = [{ dow: 0-6, hour: 0-23, count }]
//   dow: 0 = Sun, 1 = Mon ... 6 = Sat
// ============================================================
import React from 'react';
import { CardShell } from '../reports/_shared';

const DAYS_TH = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
const HEAT_RAMP = [
  '#f1f5f9', // 0%
  '#dbeafe', // 10%
  '#bfdbfe', // 25%
  '#93c5fd', // 40%
  '#60a5fa', // 55%
  '#3b82f6', // 70%
  '#2563eb', // 85%
  '#1d4ed8', // 100%
];

function heatColor(value, max) {
  if (max === 0 || value === 0) return HEAT_RAMP[0];
  const intensity = Math.min(1, value / max);
  const bucket = Math.floor(intensity * (HEAT_RAMP.length - 1));
  return HEAT_RAMP[Math.min(HEAT_RAMP.length - 1, bucket)];
}

/**
 * Aggregate visit-level data into dow × hour grid.
 * @param {Array} visits - [{ vstdate: 'YYYY-MM-DD', vsttime: 'HH:MM:SS', ... }]
 * @returns {Array} flat array of { dow, hour, count }
 */
export function buildHourlyHeatmapData(visits) {
  const grid = Array.from({ length: 7 }, () => Array(24).fill(0));

  visits.forEach((v) => {
    if (!v.vstdate || !v.vsttime) return;
    const dt = new Date(`${v.vstdate}T${v.vsttime}`);
    if (Number.isNaN(dt.getTime())) return;
    const dow = dt.getDay();
    const hour = dt.getHours();
    grid[dow][hour] += 1;
  });

  const flat = [];
  for (let d = 0; d < 7; d += 1) {
    for (let h = 0; h < 24; h += 1) {
      flat.push({ dow: d, hour: h, count: grid[d][h] });
    }
  }
  return flat;
}

export default function HourlyHeatmap({
  data = [], title = 'ปริมาณงาน รายวัน × ชั่วโมง',
  subtitle, cellSize = 22,
}) {
  if (data.length === 0) {
    return (
      <CardShell title={title} subtitle={subtitle}>
        <div style={{ padding: '32px', textAlign: 'center',
          color: 'var(--md-text-tertiary)' }}>
          ไม่มีข้อมูลในช่วงเวลานี้
        </div>
      </CardShell>
    );
  }

  // Pivot flat → 7×24 grid (dow → hour → count)
  const grid = Array.from({ length: 7 }, () => Array(24).fill(0));
  data.forEach((d) => {
    if (d.dow >= 0 && d.dow < 7 && d.hour >= 0 && d.hour < 24) {
      grid[d.dow][d.hour] = d.count || 0;
    }
  });

  const total = data.reduce((s, d) => s + (d.count || 0), 0);
  const max = Math.max(...data.map((d) => d.count || 0), 1);

  // Find peak slot
  let peak = { dow: 0, hour: 0, count: 0 };
  for (let d = 0; d < 7; d += 1) {
    for (let h = 0; h < 24; h += 1) {
      if (grid[d][h] > peak.count) peak = { dow: d, hour: h, count: grid[d][h] };
    }
  }

  return (
    <CardShell title={title}
      subtitle={subtitle ||
        `รวม ${total.toLocaleString()} visits · Peak: ${DAYS_TH[peak.dow]} ${String(peak.hour).padStart(2, '0')}:00 (${peak.count})`}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: '2px',
          margin: '0 auto', fontSize: '10px' }}>
          <thead>
            <tr>
              <th style={{ width: '28px' }} />
              {Array.from({ length: 24 }, (_, h) => (
                <th key={h} style={{
                  width: `${cellSize}px`, textAlign: 'center',
                  fontWeight: 700, color: 'var(--md-text-tertiary)',
                  padding: '2px 0',
                }}>
                  {h % 4 === 0 ? `${String(h).padStart(2, '0')}` : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, dow) => (
              <tr key={dow}>
                <td style={{
                  fontWeight: 800, color: 'var(--md-text-secondary)',
                  textAlign: 'right', paddingRight: '6px',
                }}>
                  {DAYS_TH[dow]}
                </td>
                {row.map((count, hour) => {
                  const isPeak = dow === peak.dow && hour === peak.hour;
                  return (
                    <td key={hour}
                      title={`${DAYS_TH[dow]} ${String(hour).padStart(2, '0')}:00 · ${count} visits`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        background: heatColor(count, max),
                        borderRadius: '3px',
                        border: isPeak ? '2px solid #dc2626' : '1px solid rgba(0,0,0,.04)',
                        textAlign: 'center',
                        fontWeight: count > 0 ? 700 : 400,
                        color: count / max > 0.6 ? '#fff' : 'var(--md-text-secondary)',
                        cursor: 'help',
                      }}>
                      {count > 0 && count > max * 0.2 ? count : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px',
        justifyContent: 'center', marginTop: '10px', fontSize: '10px',
        color: 'var(--md-text-tertiary)' }}>
        <span>ต่ำ</span>
        {HEAT_RAMP.map((color, idx) => (
          <span key={idx} style={{
            width: '20px', height: '12px', background: color,
            borderRadius: '2px',
          }} />
        ))}
        <span>สูง</span>
        <span style={{ marginLeft: '12px', display: 'inline-flex',
          alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '12px', height: '12px',
            border: '2px solid #dc2626', borderRadius: '2px' }} />
          Peak
        </span>
      </div>
    </CardShell>
  );
}
