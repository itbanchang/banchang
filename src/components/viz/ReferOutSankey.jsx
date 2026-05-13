// ============================================================
// ReferOutSankey — Sankey diagram for refer-out flows
// Phase H Tier 3.2 — Visualization upgrade
//
// Shows where BCH refers patients to (destination hospitals)
// stratified by emergency level (L1-L5).
//
// Data shape:
//   data.nodes = [{ name: 'BCH ER' }, { name: 'รพ.ระยอง' }, ...]
//   data.links = [{ source: 0, target: 1, value: 15, name?: 'L1+L2' }]
//
// Or compute from raw refer_breakdown:
//   referByType = [{ type_id, name_th, count, ... }]
// ============================================================
import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip, Layer, Rectangle } from 'recharts';
import { CardShell } from '../reports/_shared';

const TYPE_COLORS = {
  1: '#dc2626', // L1 Resus — red
  2: '#f59e0b', // L2 Emerg — amber
  3: '#eab308', // L3 Urgent — yellow
  4: '#10b981', // L4 Semi — emerald
  5: '#94a3b8', // L5 Non-acute — slate
};

const HOSPITAL_COLOR = '#3b82f6'; // blue
const SOURCE_COLOR = '#7c3aed';   // purple for BCH source node

// Custom node renderer with color coding
function SankeyNode({ x, y, width, height, index, payload, containerWidth }) {
  const isOut = x + width + 6 > containerWidth;
  const isSource = payload.depth === 0;
  const fill = isSource ? SOURCE_COLOR : HOSPITAL_COLOR;
  return (
    <Layer key={`node-${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.85}
      />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="11"
        fontWeight={700}
        fill="var(--md-text-primary)"
        stroke="none"
      >
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 14}
        fontSize="10"
        fontWeight={600}
        fill="var(--md-text-tertiary)"
        stroke="none"
      >
        {payload.value} เคส
      </text>
    </Layer>
  );
}

function SankeyLink({ sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth, index, payload }) {
  const color = TYPE_COLORS[payload.type_id] || HOSPITAL_COLOR;
  return (
    <Layer key={`link-${index}`}>
      <path
        d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
        fill="none"
        stroke={color}
        strokeWidth={linkWidth}
        strokeOpacity={0.4}
      />
    </Layer>
  );
}

/**
 * Build Sankey data from per-hospital refer data.
 * @param {Array} hospitals - [{ name, byLevel: {1: count, 2: count, ...} }]
 * @returns {{ nodes, links }}
 */
export function buildReferOutSankey(hospitals) {
  const nodes = [{ name: 'BCH ER (ส่งต่อ)' }, ...hospitals.map((h) => ({ name: h.name }))];
  const links = [];

  hospitals.forEach((h, hIdx) => {
    const targetIdx = hIdx + 1;
    Object.entries(h.byLevel || {}).forEach(([level, count]) => {
      if (count > 0) {
        links.push({
          source: 0,
          target: targetIdx,
          value: count,
          type_id: Number(level),
        });
      }
    });
  });

  return { nodes, links };
}

export default function ReferOutSankey({ data, title = 'Refer-out Flow' }) {
  if (!data?.links?.length) {
    return (
      <CardShell title={title}>
        <div style={{ padding: '32px', textAlign: 'center',
          color: 'var(--md-text-tertiary)' }}>
          ไม่มีข้อมูลการส่งต่อในช่วงเวลานี้
        </div>
      </CardShell>
    );
  }

  const totalRefers = data.links.reduce((s, l) => s + l.value, 0);

  return (
    <CardShell title={title} subtitle={`รวม ${totalRefers.toLocaleString()} เคส · ${data.nodes.length - 1} ปลายทาง`}>
      <ResponsiveContainer width="100%" height={Math.max(300, data.nodes.length * 35)}>
        <Sankey
          data={data}
          node={<SankeyNode />}
          link={<SankeyLink />}
          nodePadding={20}
          nodeWidth={14}
          margin={{ left: 80, right: 120, top: 8, bottom: 8 }}
        >
          <Tooltip
            formatter={(value, name, props) => {
              const level = props?.payload?.type_id;
              const label = level ? `Level ${level}` : 'รวม';
              return [`${value} เคส`, label];
            }}
          />
        </Sankey>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap',
        justifyContent: 'center', marginTop: '12px', fontSize: '10px' }}>
        {Object.entries(TYPE_COLORS).map(([level, color]) => {
          const levelLinks = data.links.filter((l) => l.type_id === Number(level));
          if (levelLinks.length === 0) return null;
          const count = levelLinks.reduce((s, l) => s + l.value, 0);
          return (
            <span key={level} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '12px', background: color, borderRadius: '2px' }} />
              <span style={{ fontWeight: 700, color: 'var(--md-text-secondary)' }}>
                L{level} ({count})
              </span>
            </span>
          );
        })}
      </div>
    </CardShell>
  );
}
