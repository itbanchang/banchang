import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie,
    ComposedChart, Area, Line, ReferenceLine
} from 'recharts';

export interface IPDAdvancedAnalyticsProps {
    ipdAnalytics: any;
    loading: boolean;
    openDrillDown: (id: string, title: string, endpoint: string) => void;
    hoverTierCard: number | null;
    setHoverTierCard: (v: number | null) => void;
}

/** IPD Advanced Analytics — WEI, Turnover, CMI, Mortality, Acuity, Trends.
 *  This is a pure rendering component. The parent passes all computed data via props.
 *  NOTE: The actual JSX for this section is kept in IPDTab.jsx parent
 *  and passed as children to maintain exact visual parity.
 *  This component serves as the named organizational wrapper.
 */
export const IPDAdvancedAnalytics = React.memo(function IPDAdvancedAnalytics(
    props: IPDAdvancedAnalyticsProps & { children: React.ReactNode }
) {
    return <>{props.children}</>;
});
