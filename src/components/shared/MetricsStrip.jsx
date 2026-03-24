// ============================================================
// MetricsStrip — Professional KPI Metrics Display
// Responsive grid of key metrics with icons and trends
// ============================================================
import React from 'react';
import MetricCard from './MetricCard.jsx';

const MetricsStrip = ({
  metrics = [], // { label, value, unit, target, trend, status, icon }
  columns = 'auto-fit', // auto-fit, 2, 3, 4
  gap = '12px',
  minWidth = '165px',
}) => {
  const gridTemplate =
    columns === 'auto-fit'
      ? `grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr))`
      : `grid-template-columns: repeat(${columns}, 1fr)`;

  return (
    <div
      style={{
        display: 'grid',
        gap: gap,
        [gridTemplate.split(':')[0]]: gridTemplate.split(':')[1],
      }}
    >
      {metrics.map((metric, idx) => (
        <MetricCard
          key={idx}
          label={metric.label}
          value={metric.value}
          unit={metric.unit}
          target={metric.target}
          trend={metric.trend}
          status={metric.status}
          icon={metric.icon}
          gradient={metric.gradient}
        />
      ))}
    </div>
  );
};

export default React.memo(MetricsStrip);
