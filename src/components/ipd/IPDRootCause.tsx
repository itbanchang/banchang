import React from 'react';

export interface IPDRootCauseProps {
    ipdAnalytics: any;
    bedSummary: any;
    loading: boolean;
}

export const IPDRootCause = React.memo(function IPDRootCause(
    props: IPDRootCauseProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
