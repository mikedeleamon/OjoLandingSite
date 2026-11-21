'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { weatherGradients, toCss } from '@/lib/tokens';
import { liveSky } from '@/lib/sky';
import { scrimFor, mergeRamps, scrollRamp, toCssScrim } from '@/lib/scrim';
import StarField from './StarField';

type Palette = readonly string[];

// Reads the OS-level prefers-reduced-motion preference once on the client.
// Returns true when the user has asked for less motion (WCAG 2.3.3).
function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// --- Timing ---
const HOLD_MS = 2500; // how long each weather palette is fully displayed
const REST_MS = 5500; // the live sky holds longer — it's the resting state
// Crossfading two gradients by opacity is an alpha blend, and the midpoint of
// two saturated skies is duller than either. Holding longer than fading keeps
// most of the cycle on a real palette rather than between two.
const FADE_MS = 4000; // crossfade duration

// --- Scrim --- (see lib/scrim) — scroll distance over which it deepens.
const SCROLL_RANGE = 420;

// Before the first crossfade the layers read CSS variables that lib/skyBoot's
// <head> script set before first paint, so the live sky is on screen without
// waiting for this bundle. If that script ever fails, the sky falls back to the
// app's dark `default` palette, which needs no scrim for white text.
const BOOT_SKY = `var(--sky-bg, ${toCss(weatherGradients.default)})`;
const BOOT_HERO_SCRIM = 'var(--sky-hero)';
const BOOT_SCROLL_SCRIM = 'var(--sky-scroll)';

const idle: (cb: () => void) => void =
    typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb) => window.requestIdleCallback(cb)
        : (cb) => setTimeout(cb, 1);

// Palettes shown after the live sky, ordered so each crossfade is a short hue
// move: blue → indigo → violet → plum → rose → coral → orange → gold, which
// walks the colour wheel once and lands back near the blues.
//
// This deliberately skips the app's grey states — cloudy, foggy, partlyCloudy,
// ice, drizzle. They are real weather and the app renders them, but a landing
// page cycling through five desaturated slates just reads as one long grey.
// The clear-sky palettes were excluded here once, on the reasoning that they
// were the live sky's job; that left the cycle with nothing but the greys and
// is most of why it looked so flat.
const SHOWCASE: Palette[] = [
    ['#2DD4BF', '#10B981', '#A3E635'],
    weatherGradients.clearDay,
    weatherGradients.rainy,
    weatherGradients.stormy,
    weatherGradients.blueHour,
    weatherGradients.afterglow,
    weatherGradients.dawn,
    weatherGradients.sunset,
    weatherGradients.hot,
    weatherGradients.sunny,
];

export default function GradientBackground() {
    // Index 0 is the live sky; 1..n are SHOWCASE. The exact live sky needs the
    // browser's clock, so it's computed on mount; until the first crossfade the
    // layers show the boot script's equivalent through CSS variables (`booted`
    // false), which also keeps the scrim solver off the hydration path.
    const [booted, setBooted] = useState(false);
    const [sky, setSky] = useState<Palette>(weatherGradients.default);
    const indexRef = useRef(0);
    const [bottom, setBottom] = useState<Palette>(weatherGradients.default);
    const [top, setTop] = useState<Palette>(SHOWCASE[0]);
    const [topOpacity, setTopOpacity] = useState(0);
    const [isFading, setIsFading] = useState(false);
    // Scroll progress drives one layer's opacity directly through this ref —
    // never React state — so scrolling re-renders nothing and the scrim fade
    // is a compositor-only opacity change instead of a gradient repaint.
    const scrollLayerRef = useRef<HTMLDivElement>(null);
    // Whether the sky currently on screen (or being faded to) is the visitor's
    // own, and dark enough for stars. Set at the START of a crossfade so the
    // star layer fades on the same curve as the gradient beneath it.
    const [starsVisible, setStarsVisible] = useState(false);

    // ── The visitor's sky ────────────────────────────────────────────────────
    const [skyIsNight, setSkyIsNight] = useState(false);
    useEffect(() => {
        const live = liveSky();
        setSky(live.stops);
        setBottom(live.stops);
        setSkyIsNight(live.isNight);
        setStarsVisible(live.isNight);
    }, []);

    // ── Scroll progress ──────────────────────────────────────────────────────
    useEffect(() => {
        let frame = 0;
        let last = -1;
        const handler = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const t = Math.min(1, window.scrollY / SCROLL_RANGE);
                if (t === last) return; // past the range: nothing to do
                last = t;
                if (scrollLayerRef.current) {
                    scrollLayerRef.current.style.opacity = String(t);
                }
            });
        };
        handler();
        window.addEventListener('scroll', handler, { passive: true });
        return () => {
            window.removeEventListener('scroll', handler);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    // ── Scrim, solved for whatever sky is on screen ──────────────────────────
    // During a crossfade both palettes are visible, so the scrim has to satisfy
    // both. Solves are cached per palette and pre-warmed in idle time below, so
    // this is a lookup by the time a fade starts.
    const { heroScrim, scrollScrim } = useMemo(() => {
        if (!booted) return { heroScrim: BOOT_HERO_SCRIM, scrollScrim: BOOT_SCROLL_SCRIM };
        const b = scrimFor(bottom);
        const t = isFading ? scrimFor(top) : null;
        const s = t
            ? { hero: mergeRamps(b.hero, t.hero), content: mergeRamps(b.content, t.content) }
            : b;
        return { heroScrim: toCssScrim(s.hero), scrollScrim: toCssScrim(scrollRamp(s)) };
    }, [booted, isFading, bottom, top]);

    // ── Weather showcase ─────────────────────────────────────────────────────
    useEffect(() => {
        // WCAG 2.3.3 — if the user prefers reduced motion, hold the live sky
        // and never cycle.
        if (prefersReducedMotion()) return;

        const paletteAt = (i: number) => (i === 0 ? sky : SHOWCASE[i - 1]);
        const total = SHOWCASE.length + 1;

        let holdTimer: ReturnType<typeof setTimeout>;
        let fadeTimer: ReturnType<typeof setTimeout>;
        let alive = true;

        const cycle = () => {
            const hold = indexRef.current === 0 ? REST_MS : HOLD_MS;
            const nextIdx = (indexRef.current + 1) % total;
            // Solve the scrims this fade will need while the page is idle.
            idle(() => {
                scrimFor(paletteAt(indexRef.current));
                scrimFor(paletteAt(nextIdx));
            });
            holdTimer = setTimeout(() => {
                if (!alive) return;
                // Don't crossfade a sky nobody can see.
                if (document.hidden) {
                    cycle();
                    return;
                }

                setBooted(true);
                setIsFading(true);
                setTop(paletteAt(nextIdx));
                // The app only shows stars under a clear night sky, never over
                // a weather palette, so they leave with the live sky.
                setStarsVisible(nextIdx === 0 && skyIsNight);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (!alive) return;
                        setTopOpacity(1);
                    });
                });

                fadeTimer = setTimeout(() => {
                    if (!alive) return;

                    indexRef.current = (indexRef.current + 1) % total;

                    setIsFading(false);
                    setTopOpacity(0);
                    setBottom(paletteAt(indexRef.current));

                    cycle();
                }, FADE_MS);
            }, hold);
        };

        cycle();

        return () => {
            alive = false;
            clearTimeout(holdTimer);
            clearTimeout(fadeTimer);
        };
    }, [sky, skyIsNight]);

    return (
        <div
            className='fixed inset-0 pointer-events-none'
            style={{ zIndex: -10, backgroundColor: 'var(--bg-default)' }}
            aria-hidden='true'
        >
            {/* Bottom layer */}
            <div
                className='absolute inset-0'
                style={{ background: booted ? toCss(bottom) : BOOT_SKY }}
            />

            {/* Top layer — fades in, then swaps instantly */}
            <div
                className='absolute inset-0'
                style={{
                    background: toCss(top),
                    opacity: topOpacity,
                    transition: isFading
                        ? `opacity ${FADE_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`
                        : 'none',
                }}
            />

            {/* Stars sit above the sky but below the scrim, so they dim with it
                as you scroll — the same ordering the app uses. */}
            {skyIsNight && <StarField visible={starsVisible} />}

            {/* Contrast scrim — see the note above: a fixed hero layer plus a
                scroll layer whose opacity is set from the scroll handler. */}
            <div
                className='absolute inset-0'
                style={{ background: heroScrim }}
            />
            <div
                ref={scrollLayerRef}
                className='absolute inset-0'
                style={{ background: scrollScrim, opacity: 0, willChange: 'opacity' }}
            />
        </div>
    );
}
