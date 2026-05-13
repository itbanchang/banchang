// ============================================================
// ServiceLinesTreemap — Treemap for service-line / revenue mix
// Phase H Tier 3.2 — Visualization upgrade
//
// Shows 12 BCH service lines (PMC office syndrome + 3 PT clinics + ไตเทียม
// + ฉีดยาทำแผล + Sleep Test + ...) sized by visit count, colored by category.
//
// Data shape:
//   items = [{ name, count, income, category }]
// ============================================================
import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { CardShell } from '../reports/_shared';

const CATEGORY_COLORS = {
  PT: '#3b82f6',         // physical therapy — blue
  PMC: '#8b5cf6',        // PMC clinics — violet
  Dialysis: '#dc2626',   // hemodialysis — red (critical)
  Sleep: '#0ea5e9',      // sleep lab — sky
  Procedure: '#10b981',  // small procedure — emerald
  General: '#94a3b8',    // generic — slate
  Specialty: '#f59e0b',  // specialty clinic — amber
};

function CustomizedContent({ depth, x, y, width, height, index, name, count, category, root }) {
  if (width < 30 || height < 20) return null; // hide small labels
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.General;
  const fontSize = Math.max(9, Math.min(16, Math.sqrt(width * height) / 8));
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          fillOpacity: 0.85,
          stroke: '#fff',
          strokeWidth: 2,
        }}
      />
      {width > 50 && height > 40 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 6}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize}
            fontWeight={800}
            style={{ pointerEvents: 'none' }}
          >
            {name.length > 20 ? `${name.substring(0, 18)}...` : name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + fontSize + 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize * 0.8}
            fontWeight={700}
            style={{ pointerEvents: 'none', opacity: 0.9 }}
          >
            {count?.toLocaleString()}
          </text>
        </>
      )}
    </g>
  );
}

export default function ServiceLinesTreemap({
  items = [], title = 'Service Lines', subtitle,
  valueKey = 'count',  // 'count' or 'income'
}) {
  if (items.length === 0) {
    return (
      <CardShell title={title} subtitle={subtitle}>
        <div style={{ padding: '32px', textAlign: 'center',
          color: 'var(--md-text-tertiary)' }}>
          ไม่มีข้อมูล Service Lines
        </div>
      </CardShell>
    );
  }

  // Recharts Treemap expects { children: [{ name, size, ... }] }
  const treeData = items.map((item) => ({
    name: item.name,
    size: item[valueKey] || 0,
    count: item.count,
    income: item.income,
    category: item.category || 'General',
  }));

  const total = items.reduce((s, i) => s + (i[valueKey] || 0), 0);
  const valueLabel = valueKey === 'income' ? 'รายได้รวม' : 'visits รวม';

  return (
    <CardShell title={title}
      subtitle={subtitle || `${items.length} services · ${valueLabel} ${total.toLocaleString()}`}>
      <ResponsiveContainer width="100%" height={420}>
        <Treemap
          data={treeData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomizedContent />}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const p = payload[0].payload;
              return (
                <div style={{
                  background: 'var(--md-surface, #fff)',
                  border: '1px solid var(--md-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,.1)',
                }}>
                  <div style={{ fontWeight: 800, marginBottom: '4px' }}>{p.name}</div>
                  <div>👥 {p.count?.toLocaleString() || 0} visits</div>
                  {p.income != null && (
                    <div>💰 {p.income.toLocaleString()} บาท</div>
                  )}
                  <div style={{ marginTop: '2px', fontSize: '10px', opacity: 0.7 }}>
                    หมวด: {p.category}
                  </div>
                </div>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>

      {/* Category legend */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap',
        justifyContent: 'center', marginTop: '8px', fontSize: '10px' }}>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => {
          const inUse = items.some((i) => i.category === cat);
          if (!inUse) return null;
          return (
            <span key={cat} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '12px', background: color,
                borderRadius: '2px', opacity: 0.85 }} />
              <span style={{ fontWeight: 700, color: 'var(--md-text-secondary)' }}>{cat}</span>
            </span>
          );
        })}
      </div>
    </CardShell>
  );
}
