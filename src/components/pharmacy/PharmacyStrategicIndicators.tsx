import React from 'react';

export interface PharmacyStrategicIndicatorsProps {
    aiAnalytics: any;
}

export const PharmacyStrategicIndicators = React.memo(function PharmacyStrategicIndicators(
    props: PharmacyStrategicIndicatorsProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
