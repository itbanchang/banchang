import React from 'react';

export interface PharmacyTopDrugsProps {
    pharmacyAnalytics: any;
    customTopDrugs: any;
    customTopLoading: boolean;
    loading: any;
    tdStart: string;
    tdEnd: string;
    tdApplied: { start: string; end: string };
    defStart: string;
    defEnd: string;
    setTdStart: (v: string) => void;
    setTdEnd: (v: string) => void;
    setTdApplied: (v: { start: string; end: string }) => void;
    THEME: any;
    cm: number;
    cy: number;
}

export const PharmacyTopDrugs = React.memo(function PharmacyTopDrugs(
    props: PharmacyTopDrugsProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
