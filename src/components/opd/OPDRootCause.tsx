import React from 'react';

export interface OPDRootCauseProps {
    opd: any;
    aiAnalytics: any;
}

export const OPDRootCause = React.memo(function OPDRootCause(
    props: OPDRootCauseProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
