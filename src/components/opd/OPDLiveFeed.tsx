import React from 'react';

export interface OPDLiveFeedProps {
    opd: any;
    loading: any;
}

export const OPDLiveFeed = React.memo(function OPDLiveFeed(
    props: OPDLiveFeedProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
