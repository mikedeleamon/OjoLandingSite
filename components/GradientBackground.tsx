'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { weatherGradients, toCss, text as textTokens } from '@/lib/tokens';
import { liveSky } from '@/lib/sky';
import { scrimRampFor, type ScrimStop } from '@/lib/contrast';
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

// --- Scrim ---
// The app dims its backdrop as you scroll into content (BackdropLayer's
// MIN_DIM / SCROLL_RANGE) so glass tiles and body copy sit over a settled sky
// rather than a bright horizon. The site does the same, and has a second reason
// to: its palettes run from #020617 to #E0F2FE, and white text over the pale
// end needs help to clear 4.5:1 (WCAG 1.4.3).
//
// So the two ends of the ramp are solved per palette rather than picked (see
// lib/contrast). SCRIM_FLOOR is the value used when the sky is already dark
// enough to need nothing — every night palette lands here, which is why they
// still read as vividly as they do on device.
const SCRIM_FLOOR = 0.28;
const SCROLL_RANGE = 420;

const alphaOf = (rgba: string) =>
    Number(rgba.split(',')[3]?.replace(')', '') ?? 1);

// Every place white text meets the sky, as (text tier, glass in the way). The
// scrim has to satisfy all of them, so it is solved for each and the darkest
// answer wins. Glass alphas compound where surfaces nest — a nav pill is a 0.10
// glass inside the 0.10 header once scrolled, and the footer's TestFlight pill
// is a 0.10 inside the 0.06 footer — which is exactly the case a single
// hand-picked number kept missing.
const P = alphaOf(textTokens.primary);
const S = alphaOf(textTokens.secondary);
const M = alphaOf(textTokens.muted);

/**
 * Visible at the top of the page, where the scrim is lightest. The nav bar is
 * transparent until you scroll, so up here its pill is a lone 0.10 surface.
 */
const HERO_CONSTRAINTS = [
    { textAlpha: S, glassAlpha: 0 }, // hero subheadline, bare sky
    { textAlpha: P, glassAlpha: 0.1 }, // nav pill, transparent header
];

/** Everything below the fold, where the scrim has reached its darkest. */
const CONTENT_CONSTRAINTS = [
    { textAlpha: S, glassAlpha: 0 },
    { textAlpha: P, glassAlpha: 0.19 }, // nav pill inside the now-glass header
    { textAlpha: M, glassAlpha: 0.1 }, // captions on a glass card
    { textAlpha: M, glassAlpha: 0.155 }, // the footer's pill inside the footer
];

/** Element-wise max of two ramps — used while two skies are crossfading. */
const mergeRamps = (a: ScrimStop[], b: ScrimStop[]): ScrimStop[] =>
    a.map((s, i) => ({ pos: s.pos, alpha: Math.max(s.alpha, b[i].alpha) }));

const toCssScrim = (ramp: ScrimStop[]) =>
    `linear-gradient(180deg, ${ramp
        .map(
            (s) =>
                `rgba(0,0,0,${s.alpha.toFixed(3)}) ${(s.pos * 100).toFixed(0)}%`,
        )
        .join(', ')})`;

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
    // Index 0 is the live sky; 1..n are SHOWCASE. The live sky can't be known
    // during SSR (it needs the browser's clock and timezone), so both server
    // and client start on the app's neutral `default` palette — which is what
    // globals.css paints too — and the real sky lands on mount.
    const [sky, setSky] = useState<Palette>(weatherGradients.default);
    const indexRef = useRef(0);
    const [bottom, setBottom] = useState<Palette>(weatherGradients.default);
    const [top, setTop] = useState<Palette>(SHOWCASE[0]);
    const [topOpacity, setTopOpacity] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [scrollT, setScrollT] = useState(0);
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
        const handler = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                setScrollT(Math.min(1, window.scrollY / SCROLL_RANGE));
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
    // Two ramps — one for the top of the page, one for scrolled content — each
    // varying along the sky's own axis. During a crossfade both palettes are
    // visible, so the scrim has to satisfy both.
    const { heroRamp, contentRamp } = useMemo(() => {
        const build = (stops: readonly string[]) => {
            const hero = scrimRampFor(stops, HERO_CONSTRAINTS, SCRIM_FLOOR);
            const content = hero.map((h, i) => ({
                pos: h.pos,
                alpha: Math.max(
                    h.alpha,
                    scrimRampFor(stops, CONTENT_CONSTRAINTS, h.alpha)[i].alpha,
                ),
            }));
            return { hero, content };
        };
        const b = build(bottom);
        if (!isFading) return { heroRamp: b.hero, contentRamp: b.content };
        const t = build(top);
        return {
            heroRamp: mergeRamps(b.hero, t.hero),
            contentRamp: mergeRamps(b.content, t.content),
        };
    }, [isFading, bottom, top]);

    const scrim = toCssScrim(
        heroRamp.map((h, i) => ({
            pos: h.pos,
            alpha: h.alpha + (contentRamp[i].alpha - h.alpha) * scrollT,
        })),
    );

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
            holdTimer = setTimeout(() => {
                if (!alive) return;

                const nextIdx = (indexRef.current + 1) % total;
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
                style={{ background: toCss(bottom) }}
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
            <StarField visible={starsVisible} />

            {/* Contrast scrim — see the note above. Transitions over the same
                duration as the crossfade so a palette that needs more dimming
                doesn't step into it. */}
            <div
                className='absolute inset-0'
                style={{
                    background: scrim,
                    transition: `background ${isFading ? FADE_MS : 120}ms linear`,
                }}
            />
        </div>
    );
}
