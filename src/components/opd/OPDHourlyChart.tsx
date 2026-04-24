import React from 'react';

export interface OPDHourlyChartProps {
    opd: any;
    hourlyChart: any[];
}

export const OPDHourlyChart = React.memo(function OPDHourlyChart(
    props: OPDHourlyChartProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
