import React from 'react';

export interface PharmacyFiscalIntelligenceProps {
    pharmacyRevenueFiscal: any;
    pharmacyAnalytics: any;
    revenueChartData: any[];
    loading: any;
    THEME: any;
}

export const PharmacyFiscalIntelligence = React.memo(function PharmacyFiscalIntelligence(
    props: PharmacyFiscalIntelligenceProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
