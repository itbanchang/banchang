import React from 'react';

export interface OPDCycleTimeProps {
    opd: any;
    fiscalData: any;
    loading: any;
}

export const OPDCycleTime = React.memo(function OPDCycleTime(
    props: OPDCycleTimeProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
