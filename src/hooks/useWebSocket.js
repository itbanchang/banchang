// ============================================================
// BCH 360° Intelligence V.10 - WebSocket Hook
// Real-time connection for Bed Occupancy & Emergency Alerts
// ============================================================
import { useEffect, useRef, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';

export function useWebSocket() {
    const { dispatch, addAlert } = useDashboard();
    const socketRef = useRef(null);
    const reconnectRef = useRef(null);

    const connect = useCallback(async () => {
        try {
            const { io } = await import('socket.io-client');
            const socket = io(window.location.origin, {
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: 3000
            });

            socket.on('connect', () => {
                console.log('🔌 WebSocket connected');
            });

            socket.on('bed:update', (data) => {
                dispatch({ type: 'SET_DATA', key: 'liveBedData', payload: data });
            });

            socket.on('alert:emergency', (alert) => {
                addAlert(alert);
                // Play notification sound in production
            });

            socket.on('disconnect', () => {
                console.log('❌ WebSocket disconnected');
            });

            socketRef.current = socket;
        } catch (err) {
            console.log('WebSocket unavailable, retrying in 5s...');
            reconnectRef.current = setTimeout(connect, 5000);
        }
    }, [dispatch, addAlert]);

    useEffect(() => {
        connect();
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
            if (reconnectRef.current) clearTimeout(reconnectRef.current);
        };
    }, [connect]);

    return socketRef.current;
}
