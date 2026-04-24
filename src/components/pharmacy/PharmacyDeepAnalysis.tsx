import React from 'react';

export interface PharmacyDeepAnalysisProps {
    pharmacyRevenueFiscal: any;
    pharmacyAnalytics: any;
    THEME: any;
}

export const PharmacyDeepAnalysis = React.memo(function PharmacyDeepAnalysis(
    props: PharmacyDeepAnalysisProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
