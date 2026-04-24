import React from 'react';

export interface PharmacyAnomalyDetectionProps {
    advancedAI: any;
}

export const PharmacyAnomalyDetection = React.memo(function PharmacyAnomalyDetection(
    props: PharmacyAnomalyDetectionProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
