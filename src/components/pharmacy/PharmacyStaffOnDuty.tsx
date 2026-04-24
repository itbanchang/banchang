import React from 'react';

export interface PharmacyStaffOnDutyProps {
    pharmacyAnalytics: any;
    loading: any;
    THEME: any;
}

export const PharmacyStaffOnDuty = React.memo(function PharmacyStaffOnDuty(
    props: PharmacyStaffOnDutyProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
