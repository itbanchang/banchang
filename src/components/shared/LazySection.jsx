// ============================================================
// BCH 360° Intelligence V.10 — Lazy Section
// Uses IntersectionObserver to defer rendering of heavy components
// until they are scrolled into view.
// ============================================================
import React, { useState, useEffect, useRef } from 'react';

export default function LazySection({
    children,
    minHeight = '300px',
    rootMargin = '200px',
    skeleton = null
}) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // If already visible, don't observe again
        if (isVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: rootMargin, // Load slightly before it comes into view
                threshold: 0
            }
        );

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
            observer.disconnect();
        };
    }, [isVisible, rootMargin]);

    if (!isVisible) {
        return (
            <div
                ref={containerRef}
                style={{ minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {skeleton || (
                    <div className="glass-card" style={{ width: '100%', height: '100%', minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="skeleton" style={{ width: '100px', height: '20px', borderRadius: '10px' }}></div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={containerRef} className="animate-fade-in" style={{ animationDuration: '0.4s' }}>
            {children}
        </div>
    );
}
