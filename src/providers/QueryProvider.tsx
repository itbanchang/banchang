// ============================================================
// BCH 360° Intelligence V.10 — QueryClient Provider
// TanStack Query — Caching, Deduplication, Background Refetch
// ============================================================
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

// ── Shared QueryClient (singleton) ──
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 30 seconds
      staleTime: 30_000,

      // Keep unused data in cache for 5 minutes
      gcTime: 5 * 60_000,

      // Retry twice on failure (with exponential backoff)
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10_000),

      // Do not refetch on window focus (avoids unnecessary network calls)
      refetchOnWindowFocus: false,

      // Don't refetch on mount if data is still fresh
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

// ── Provider Component ──
interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default QueryProvider;
