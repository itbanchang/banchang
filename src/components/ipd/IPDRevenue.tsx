import React from 'react';

export interface IPDRevenueProps {
    fiscalData: any;
    loading: boolean;
}

export const IPDRevenue = React.memo(function IPDRevenue(
    props: IPDRevenueProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
