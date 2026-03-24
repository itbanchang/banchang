// ============================================================
// BCH 360° Intelligence V.10 - WebSocket Hook (Optimized)
// Real-time connection for Bed Occupancy & Emergency Alerts
// ✅ Fixed: Proper event cleanup to prevent memory leaks
// ============================================================
import { useEffect, useRef, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';

// Throttle: call fn at most once per `ms` milliseconds
function throttle(fn, ms) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= ms) {
            last = now;
            fn(...args);
        }
    };
}

export function useWebSocket() {
    const { dispatch, addAlert } = useDashboard();
    const socketRef = useRef(null);
    const reconnectRef = useRef(null);
    const listenersRef = useRef([]);

    // Setup all listeners with proper cleanup tracking
    const setupListeners = useCallback((socket) => {
        // Remove any previously attached listeners before adding new ones
        listenersRef.current.forEach(({ event, handler }) => {
            socket.off(event, handler);
        });
        listenersRef.current = [];

        // Define handlers once (prevents closure issues on re-creates)
        const handleConnect = () => {
            console.log('🔌 WebSocket connected');
        };

        // Throttled to 1 update per 750ms — bed data changes slowly
        const handleBedUpdate = throttle((data) => {
            dispatch({ type: 'SET_DATA', key: 'liveBedData', payload: data });
        }, 750);

        const handleEmergencyAlert = (alert) => {
            addAlert(alert);
            // Play notification sound in production
        };

        // Dedicated Triage Level 1 (Resuscitation) alert — stored in context for ERTab banner
        const handleResusAlert = (data) => {
            dispatch({ type: 'SET_DATA', key: 'erResusAlert', payload: data });
        };

        const handleDisconnect = () => {
            console.log('❌ WebSocket disconnected');
        };

        // Attach listeners
        socket.on('connect', handleConnect);
        socket.on('bed:update', handleBedUpdate);
        socket.on('alert:emergency', handleEmergencyAlert);
        socket.on('er:resus', handleResusAlert);
        socket.on('disconnect', handleDisconnect);

        // Track for cleanup
        listenersRef.current = [
            { event: 'connect', handler: handleConnect },
            { event: 'bed:update', handler: handleBedUpdate },
            { event: 'alert:emergency', handler: handleEmergencyAlert },
            { event: 'er:resus', handler: handleResusAlert },
            { event: 'disconnect', handler: handleDisconnect },
        ];
    }, [dispatch, addAlert]);

    const connect = useCallback(async () => {
        try {
            const { io } = await import('socket.io-client');
            
            // Don't reconnect if already connecting
            if (socketRef.current?.connected) return;

            const socket = io(window.location.origin, {
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: 3000,
                reconnectionDelayMax: 10000,
                maxReconnectionAttempts: 5
            });

            setupListeners(socket);
            socketRef.current = socket;
        } catch (err) {
            console.warn('WebSocket unavailable, retrying in 5s...', err.message);
            reconnectRef.current = setTimeout(connect, 5000);
        }
    }, [setupListeners]);

    useEffect(() => {
        connect();
        
        return () => {
            // Clean up listeners
            if (socketRef.current) {
                listenersRef.current.forEach(({ event, handler }) => {
                    socketRef.current.off(event, handler);
                });
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            
            // Clean up reconnect timeout
            if (reconnectRef.current) {
                clearTimeout(reconnectRef.current);
            }
            
            // Clear listeners array
            listenersRef.current = [];
        };
    }, [connect]);

    return socketRef.current;
}
