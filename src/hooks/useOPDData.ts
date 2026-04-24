import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/services/api';

/** Fetches OPD today data (visitors, wait time, patients, etc.) */
export function useOPDToday() {
    return useQuery({
        queryKey: ['opd', 'today'],
        queryFn: () => apiGet('/opd/today'),
        staleTime: 30_000,
        refetchInterval: 60_000,
    });
}

/** Fetches OPD monthly fiscal cycle time data */
export function useOPDMonthlyFiscal() {
    return useQuery({
        queryKey: ['opd', 'monthly-fiscal'],
        queryFn: () => apiGet('/opd/monthly-fiscal'),
        staleTime: 300_000,
        refetchInterval: 600_000,
    });
}

/** Fetches OPD revenue fiscal year data */
export function useOPDRevenueFiscal() {
    return useQuery({
        queryKey: ['opd', 'revenue-fiscal'],
        queryFn: () => apiGet('/opd/revenue-fiscal'),
        staleTime: 300_000,
        refetchInterval: 600_000,
    });
}

/** Fetches OPD AI flow prediction */
export function useOPDFlowPrediction() {
    return useQuery({
        queryKey: ['opd', 'flow-prediction'],
        queryFn: () => apiGet('/opd/ai/flow-prediction'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}

/** Fetches OPD AI wait optimizer */
export function useOPDWaitOptimizer() {
    return useQuery({
        queryKey: ['opd', 'wait-optimizer'],
        queryFn: () => apiGet('/opd/ai/wait-optimizer'),
        staleTime: 60_000,
        refetchInterval: 120_000,
    });
}
