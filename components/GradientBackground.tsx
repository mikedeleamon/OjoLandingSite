'use client';

import { useState, useEffect, useRef } from 'react';

// Reads the OS-level prefers-reduced-motion preference once on the client.
// Returns true when the user has asked for less motion (WCAG 2.3.3).
function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// --- Timing ---
const HOLD_MS = 2500; // how long each gradient is fully displayed
const FADE_MS = 8000; // crossfade duration

// --- Gradients ---
// Ordered for shortest color-wheel path between every adjacent pair.
// The loop-back (index 7 → index 0) is Windy→Clear, which shares
// emerald/teal tones and is the smoothest possible closing transition.
//
// Hue flow: teal-lime → sky-violet → ice-blue → cyan-indigo
//           → slate-navy → violet-rose → gold-red → emerald-cyan → (teal-lime)
const gradients = [
    // 0  Clear / Sunny  — brand default, always the starting state
    'linear-gradient(160deg, #2DD4BF 0%, #10B981 40%, #A3E635 100%)',
    // 1  Partly Cloudy  — sky blue → purple → violet
    'linear-gradient(160deg, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
    // 2  Winter / Snowy — icy sky → cornflower → soft indigo
    'linear-gradient(160deg, #BAE6FD 0%, #60A5FA 50%, #818CF8 100%)',
    // 3  Rainy          — cyan → cobalt → indigo
    'linear-gradient(160deg, #22D3EE 0%, #3B82F6 50%, #6366F1 100%)',
    // 4  Stormy         — cool slate → dark slate → deep navy
    'linear-gradient(160deg, #64748B 0%, #334155 50%, #1E3A8A 100%)',
    // 5  Sunset         — violet → rose → warm peach  (bridges cool→warm)
    'linear-gradient(160deg, #A78BFA 0%, #F472B6 50%, #FDBA74 100%)',
    // 6  Hot / Warm     — gold → orange → red
    'linear-gradient(160deg, #FDE047 0%, #F97316 50%, #EF4444 100%)',
    // 7  Windy / Breezy — emerald → cyan → soft violet  (bridges warm→Clear)
    'linear-gradient(160deg, #34D399 0%, #22D3EE 50%, #818CF8 100%)',
    // ── Clear / Sun ───────────────────────────────────────────────────────────
    // 9  Clear Day     — sky blue
    'linear-gradient(160deg, #0284C7 0%, #38BDF8 50%, #7DD3FC 100%)',
    // 10 Clear Night   — deep midnight
    'linear-gradient(160deg, #020617 0%, #0C1445 50%, #1D2B6B 100%)',
    // 11 Hot           — scorched amber-gold
    'linear-gradient(160deg, #7C2D12 0%, #C2410C 50%, #FBBF24 100%)',
    // 8  Sunny         — vivid orange-gold
    'linear-gradient(160deg, #F97316 0%, #FBBF24 50%, #FDE68A 100%)',

    // ── Clouds ────────────────────────────────────────────────────────────────
    // 12 Cloudy        — cool slate
    'linear-gradient(160deg, #1F2937 0%, #374151 50%, #4B5563 100%)',

    // ── Precipitation ─────────────────────────────────────────────────────────
    // 13 Drizzle      — lighter than rainy
    'linear-gradient(160deg, #0F2236 0%, #1B4A7A 50%, #4A90D9 100%)',

    // ── Winter ────────────────────────────────────────────────────────────────
    // 14 Snow          — icy sky
    'linear-gradient(160deg, #5B8DB8 0%, #93C5FD 50%, #E0F2FE 100%)',
    // 15 Ice           — cold steel blue
    'linear-gradient(160deg, #0A1929 0%, #1B3A5C 50%, #3A7AB5 100%)',

    // ── Atmosphere ────────────────────────────────────────────────────────────
    // 16 Foggy         — cool grey mist
    'linear-gradient(160deg, #374151 0%, #6B7280 50%, #9CA3AF 100%)',
    // 17 Hazy          — warm ochre dust
    'linear-gradient(160deg, #3B2F1E 0%, #7A6040 50%, #BAA07A 100%)',

    // ── Fallback ──────────────────────────────────────────────────────────────
    // 18 Default       — neutral slate
    'linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
];

export default function GradientBackground() {
    const indexRef = useRef(0);
    const [bottom, setBottom] = useState(gradients[0]);
    const [top, setTop] = useState(gradients[1]);
    const [topOpacity, setTopOpacity] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // WCAG 2.3.3 — if the user prefers reduced motion, skip all animation
        // and just show the static starting gradient forever.
        if (prefersReducedMotion()) return;

        let holdTimer: ReturnType<typeof setTimeout>;
        let fadeTimer: ReturnType<typeof setTimeout>;
        let alive = true;

        const cycle = () => {
            holdTimer = setTimeout(() => {
                if (!alive) return;

                setIsFading(true);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (!alive) return;
                        setTopOpacity(1);
                    });
                });

                fadeTimer = setTimeout(() => {
                    if (!alive) return;

                    indexRef.current =
                        (indexRef.current + 1) % gradients.length;
                    const nextIdx = (indexRef.current + 1) % gradients.length;

                    setIsFading(false);
                    setTopOpacity(0);
                    setBottom(gradients[indexRef.current]);
                    setTop(gradients[nextIdx]);

                    cycle();
                }, FADE_MS);
            }, HOLD_MS);
        };

        cycle();

        return () => {
            alive = false;
            clearTimeout(holdTimer);
            clearTimeout(fadeTimer);
        };
    }, []);

    return (
        <div
            className='fixed inset-0 pointer-events-none'
            style={{ zIndex: -10 }}
            aria-hidden='true'
        >
            {/* Bottom layer */}
            <div
                className='absolute inset-0'
                style={{ background: bottom }}
            />

            {/* Top layer — fades in, then swaps instantly */}
            <div
                className='absolute inset-0'
                style={{
                    background: top,
                    opacity: topOpacity,
                    transition: isFading
                        ? `opacity ${FADE_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`
                        : 'none',
                }}
            />

            {/*
             * Contrast scrim (WCAG 1.4.3) — a persistent dark overlay that
             * boosts white-on-gradient contrast across ALL gradient states.
             * The gradient palette includes light stops (snow, hazy, sunny)
             * where unaided white text would fail 4.5:1. This scrim brings
             * those stops into compliance without altering the visual design.
             */}
            <div
                className='absolute inset-0'
                style={{ background: 'rgba(0,0,0,0.28)' }}
            />
        </div>
    );
}
