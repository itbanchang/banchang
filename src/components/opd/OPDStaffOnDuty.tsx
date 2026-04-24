import React from 'react';

export interface OPDStaffOnDutyProps {
    opd: any;
    loading: any;
}

export const OPDStaffOnDuty = React.memo(function OPDStaffOnDuty(
    props: OPDStaffOnDutyProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
