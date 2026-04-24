import React from 'react';

export interface PharmacyAIInsightsProps {
    aiAnalytics: any;
    loading: any;
}

export const PharmacyAIInsights = React.memo(function PharmacyAIInsights(
    props: PharmacyAIInsightsProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
