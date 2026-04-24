import React from 'react';

export interface PharmacyMetricsStripProps {
    pharmacyToday: any;
    pharmacyAnalytics: any;
    loading: any;
}

export const PharmacyMetricsStrip = React.memo(function PharmacyMetricsStrip(
    props: PharmacyMetricsStripProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
