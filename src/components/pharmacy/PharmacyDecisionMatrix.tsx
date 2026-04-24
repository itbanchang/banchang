import React from 'react';

export interface PharmacyDecisionMatrixProps {
    advancedAI: any;
    pharmacyAnalytics: any;
}

export const PharmacyDecisionMatrix = React.memo(function PharmacyDecisionMatrix(
    props: PharmacyDecisionMatrixProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
