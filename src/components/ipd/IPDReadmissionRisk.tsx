import React from 'react';

export interface IPDReadmissionRiskProps {
    readmission: any;
    losPrediction: any;
    showReadmitList: boolean;
    setShowReadmitList: (fn: (prev: boolean) => boolean) => void;
}

export const IPDReadmissionRisk = React.memo(function IPDReadmissionRisk(
    props: IPDReadmissionRiskProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
