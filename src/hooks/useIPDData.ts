import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/services/api';

/** Fetches IPD bed occupancy census data */
export function useIPDCensus() {
    return useQuery({
        queryKey: ['ipd', 'census'],
        queryFn: () => apiGet('/ipd/bed-occupancy'),
        staleTime: 30_000,
        refetchInterval: 60_000,
    });
}

/** Fetches IPD ALOS (Average Length of Stay) data */
export function useIPDALOS() {
    return useQuery({
        queryKey: ['ipd', 'alos'],
        queryFn: () => apiGet('/ipd/alos'),
        staleTime: 30_000,
        refetchInterval: 60_000,
    });
}

/** Fetches IPD analytics (WEI, turnover, acuity, on-duty, etc.) */
export function useIPDAnalytics() {
    return useQuery({
        queryKey: ['ipd', 'analytics'],
        queryFn: () => apiGet('/ipd/analytics'),
        staleTime: 30_000,
        refetchInterval: 60_000,
    });
}

/** Fetches AI bed demand forecast */
export function useIPDBedDemand() {
    return useQuery({
        queryKey: ['ipd', 'bed-demand'],
        queryFn: () => apiGet('/ai/bed-demand'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}

/** Fetches AI readmission risk predictions */
export function useIPDReadmission() {
    return useQuery({
        queryKey: ['ipd', 'readmission'],
        queryFn: () => apiGet('/ai/readmission'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}

/** Fetches AI LOS predictor */
export function useIPDLOSPrediction() {
    return useQuery({
        queryKey: ['ipd', 'los-predictor'],
        queryFn: () => apiGet('/ai/los-predictor'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}

/** Fetches IPD bed flow 14-day data */
export function useIPDBedFlow() {
    return useQuery({
        queryKey: ['ipd', 'bed-flow'],
        queryFn: () => apiGet('/ipd/bed-flow'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}

/** Fetches IPD discharge planning data */
export function useIPDDischargePlanning() {
    return useQuery({
        queryKey: ['ipd', 'discharge-planning'],
        queryFn: () => apiGet('/ipd/discharge-planning'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}

/** Fetches IPD revenue fiscal year data */
export function useIPDRevenueFiscal() {
    return useQuery({
        queryKey: ['ipd', 'revenue-fiscal'],
        queryFn: () => apiGet('/ipd/revenue-fiscal'),
        staleTime: 300_000,
        refetchInterval: 600_000,
    });
}

/** Fetches medical record data for today */
export function useMedRecToday() {
    return useQuery({
        queryKey: ['medrec', 'today'],
        queryFn: () => apiGet('/medrec/today'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}
