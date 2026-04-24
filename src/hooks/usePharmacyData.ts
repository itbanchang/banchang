import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/services/api';

/** Fetches pharmacy today summary */
export function usePharmacyToday() {
    return useQuery({
        queryKey: ['pharmacy', 'today'],
        queryFn: () => apiGet('/pharmacy/today'),
        staleTime: 30_000,
        refetchInterval: 60_000,
    });
}

/** Fetches pharmacy analytics (generic ratio, PPI, on-duty, top drugs, etc.) */
export function usePharmacyAnalytics() {
    return useQuery({
        queryKey: ['pharmacy', 'analytics'],
        queryFn: () => apiGet('/pharmacy/analytics'),
        staleTime: 30_000,
        refetchInterval: 60_000,
    });
}

/** Fetches pharmacy revenue fiscal year data */
export function usePharmacyRevenueFiscal() {
    return useQuery({
        queryKey: ['pharmacy', 'revenue-fiscal'],
        queryFn: () => apiGet('/pharmacy/revenue-fiscal'),
        staleTime: 300_000,
        refetchInterval: 600_000,
    });
}

/** Fetches pharmacy top drugs with custom date range */
export function usePharmacyTopDrugs(start: string, end: string) {
    return useQuery({
        queryKey: ['pharmacy', 'top-drugs', start, end],
        queryFn: () => apiGet(`/pharmacy/top-drugs?start=${start}&end=${end}`),
        staleTime: 300_000,
        enabled: !!start && !!end,
    });
}
