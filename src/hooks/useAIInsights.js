// ============================================================
// Custom Hook: useAIInsights
// Fetches AI insights, anomalies, and predictions
// ============================================================
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './useAuth.js';
import { createBoundFetch } from '../utils/fetchWithTokenRefresh.js';

export function useAIInsights(enabled = true) {
    const [insights, setInsights] = useState([]);
    const [anomalies, setAnomalies] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const [clinicalInsights, setClinicalInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { tokens, refreshAccessToken } = useAuth();

    const fetchInsights = useCallback(async () => {
        if (!enabled) return;

        setLoading(true);
        setError(null);

        try {
            const apiFetch = createBoundFetch(tokens, refreshAccessToken);

            // Fetch insights in parallel
            const [insightsRes, anomaliesRes, predictionRes, clinicalRes] = await Promise.all([
                apiFetch('/api/ai/insights').catch(() => ({ json: () => ({ insights: [] }) })),
                apiFetch('/api/ai/anomalies').catch(() => ({ json: () => ({ anomalies: [] }) })),
                apiFetch('/api/ai/forecast/revenue?months=3').catch(() => ({ json: () => ({ forecast: [] }) })),
                fetch('/api/ai/clinical-insights', { credentials: 'include' }).catch(() => null)
            ]);

            const [insightsData, anomaliesData, predictionData] = await Promise.all([
                insightsRes.ok ? insightsRes.json() : { insights: [] },
                anomaliesRes.ok ? anomaliesRes.json() : { anomalies: [] },
                predictionRes.ok ? predictionRes.json() : { forecast: [] }
            ]);

            setInsights(insightsData.insights || []);
            setAnomalies(anomaliesData.anomalies || []);

            // Process clinical insights
            if (clinicalRes?.ok) setClinicalInsights(await clinicalRes.json());

            // Format prediction data
            if (predictionData.forecast && predictionData.forecast.length > 0) {
                const nextMonth = predictionData.forecast[0];
                setPrediction(`Next month predicted revenue: ${new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                    notation: 'compact',
                    maximumFractionDigits: 1
                }).format(nextMonth.forecast)} (${nextMonth.confidence || 85}% confidence)`);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching AI insights:', err);
        } finally {
            setLoading(false);
        }
    }, [enabled, refreshAccessToken]);

    // Fetch insights on component mount and when enabled changes
    useEffect(() => {
        if (enabled) {
            fetchInsights();
            // Refetch every 2 minutes
            const interval = setInterval(fetchInsights, 120000);
            return () => clearInterval(interval);
        }
    }, [enabled, fetchInsights]);

    return {
        insights,
        anomalies,
        prediction,
        clinicalInsights,
        loading,
        error,
        refetch: fetchInsights
    };
}
