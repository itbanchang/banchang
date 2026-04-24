import React from 'react';

export interface IPDPredictiveCapacityProps {
    demandChart: any[];
    bedDemand: any;
}

export const IPDPredictiveCapacity = React.memo(function IPDPredictiveCapacity(
    props: IPDPredictiveCapacityProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
