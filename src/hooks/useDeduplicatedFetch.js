// ============================================================
// useDeduplicatedFetch Hook
// Prevents duplicate API calls when multiple components
// request the same endpoint simultaneously
// ✅ Performance Optimization: Reduces redundant network calls
// ============================================================
import { useRef, useCallback } from 'react';

export function useDeduplicatedFetch() {
  // Track in-flight requests: Map<url, Promise>
  const inFlightRef = useRef(new Map());
  // Track request timestamps to handle stale data
  const requestTimestampsRef = useRef(new Map());

  /**
   * Fetch with automatic deduplication
   * If the same URL is requested multiple times within 100ms,
   * all subsequent calls share the same Promise
   * 
   * @param {string} url - API endpoint
   * @param {object} options - Fetch options
   * @param {number} dedupeWindow - Time window for deduplication (ms)
   * @returns {Promise} Response promise
   */
  return useCallback(async (url, options = {}, dedupeWindow = 100) => {
    const now = Date.now();
    const lastRequestTime = requestTimestampsRef.current.get(url);

    // If request in flight and within dedup window, return that promise
    if (
      inFlightRef.current.has(url) &&
      lastRequestTime &&
      now - lastRequestTime < dedupeWindow
    ) {
      console.debug(`[DedupFetch] Cache hit for ${url}`);
      return inFlightRef.current.get(url);
    }

    // Start new request
    console.debug(`[DedupFetch] Starting request for ${url}`);
    const promise = fetch(url, options)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        return r.json();
      })
      .catch(err => {
        console.error(`[DedupFetch] Error fetching ${url}:`, err);
        throw err;
      })
      .finally(() => {
        // Clean up when request completes
        inFlightRef.current.delete(url);
      });

    // Track this request
    inFlightRef.current.set(url, promise);
    requestTimestampsRef.current.set(url, now);

    return promise;
  }, []);
}

/**
 * Example usage in a component:
 * 
 * import { useDeduplicatedFetch } from '../hooks/useDeduplicatedFetch';
 * 
 * function MyComponent() {
 *   const dedupFetch = useDeduplicatedFetch();
 *   
 *   useEffect(() => {
 *     dedupFetch('/api/finance/summary')
 *       .then(data => setData(data))
 *       .catch(err => setError(err));
 *   }, []);
 *   
 *   return <div>...</div>;
 * }
 */
