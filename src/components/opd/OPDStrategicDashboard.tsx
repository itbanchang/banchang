import React from 'react';

export interface OPDStrategicDashboardProps {
    opd: any;
    aiAnalytics: any;
    computeDPI: (opd: any) => number;
}

export const OPDStrategicDashboard = React.memo(function OPDStrategicDashboard(
    props: OPDStrategicDashboardProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
