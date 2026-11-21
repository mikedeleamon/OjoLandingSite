'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Scroll-reveal without a animation library.
 *
 * Server-renders fully visible (so no-JS and crawlers see everything). On the
 * client, anything that starts below the fold is marked `pending` before it can
 * be seen, then flipped to `done` once, when it scrolls into view. The state
 * lives in a data attribute rather than React state, so a reveal never
 * re-renders anything. The transition itself is in globals.css, which also
 * collapses it under prefers-reduced-motion.
 */
export default function Reveal({
    children,
    className = '',
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    /** Stagger, in ms. */
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;

        el.dataset.reveal = 'pending';
        const io = new IntersectionObserver(
            ([entry]) => {
                const { top, bottom } = entry.boundingClientRect;
                const vh = window.innerHeight;
                // Scrolled past it (fast fling, anchor jump): just be there.
                if (!entry.isIntersecting && bottom > 0) return;
                // Starts sliding just before it enters, so a normal scroll sees
                // it settle. If a fast scroll already carried it well into view,
                // it doesn't animate at all.
                el.dataset.reveal = top < vh * 0.6 ? 'instant' : 'done';
                io.disconnect();
            },
            { rootMargin: '0px 0px 15% 0px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}
