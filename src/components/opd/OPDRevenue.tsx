import React from 'react';

export interface OPDRevenueProps {
    state: any;
    loading: any;
}

export const OPDRevenue = React.memo(function OPDRevenue(
    props: OPDRevenueProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
