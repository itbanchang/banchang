import React from 'react';

export interface OPDKPICardsProps {
    opd: any;
    loading: any;
    computeDPI: (opd: any) => number;
}

export const OPDKPICards = React.memo(function OPDKPICards(
    props: OPDKPICardsProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
