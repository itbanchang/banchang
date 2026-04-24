import React from 'react';

export interface PharmacyFinancialHealthProps {
    advancedAI: any;
    pharmacyAnalytics: any;
    pharmacyRevenueFiscal: any;
}

export const PharmacyFinancialHealth = React.memo(function PharmacyFinancialHealth(
    props: PharmacyFinancialHealthProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
