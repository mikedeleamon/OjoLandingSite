'use client';

/**
 * Star field — the app's clear-night backdrop, on the web.
 *
 * Ported from `src/components/WeatherIcons/ClearNightIcon`: the same parametric
 * sparkle (a four-pointed star with a 0.12 waist ratio, which is what keeps the
 * points needle-thin at any size) and the same seed table of positions, radii
 * and phase offsets.
 *
 * The app's structural lesson carries over too. It animates OPACITY ON A LAYER
 * rather than on each star, because touching a child node invalidates the whole
 * SVG and forces a re-rasterization. On the web the equivalent trap is
 * animating 60-odd elements individually: three animated wrappers composite on
 * the GPU, sixty animated children do not. So the stars are partitioned
 * round-robin across three layers that each twinkle on their own phase.
 */

import { useMemo } from 'react';

/**
 * Four-pointed sparkle centred in its own box. Verbatim from the app, with the
 * same waist ratio — this is the shape, not an approximation of it.
 */
function sparklePath(r: number): string {
    const w = r * 0.12;
    const c = r;
    return [
        `M ${c},0`,
        `L ${(c + w).toFixed(2)},${(c - w).toFixed(2)}`,
        `L ${(c + r).toFixed(2)},${c}`,
        `L ${(c + w).toFixed(2)},${(c + w).toFixed(2)}`,
        `L ${c},${(c + r).toFixed(2)}`,
        `L ${(c - w).toFixed(2)},${(c + w).toFixed(2)}`,
        `L 0,${c}`,
        `L ${(c - w).toFixed(2)},${(c - w).toFixed(2)}`,
        'Z',
    ].join(' ');
}

// app: ClearNightIcon's EXTRA_STAR_SEEDS. xf/yf are fractions of the canvas, so
// they re-place correctly at any viewport size.
const SEEDS: { xf: number; yf: number; r: number }[] = [
    { xf: 0.02, yf: 0.02, r: 14 },   { xf: 0.18, yf: 0.012, r: 12 },
    { xf: 0.35, yf: 0.027, r: 16 },  { xf: 0.5, yf: 0.014, r: 14 },
    { xf: 0.65, yf: 0.023, r: 18 },  { xf: 0.82, yf: 0.016, r: 12 },
    { xf: 0.98, yf: 0.022, r: 16 },  { xf: 0.02, yf: 0.125, r: 15 },
    { xf: 0.12, yf: 0.156, r: 12 },  { xf: 0.25, yf: 0.07, r: 16 },
    { xf: 0.75, yf: 0.078, r: 14 },  { xf: 0.88, yf: 0.172, r: 18 },
    { xf: 0.97, yf: 0.133, r: 14 },  { xf: 0.02, yf: 0.352, r: 16 },
    { xf: 0.08, yf: 0.5, r: 14 },    { xf: 0.15, yf: 0.609, r: 12 },
    { xf: 0.25, yf: 0.406, r: 15 },  { xf: 0.75, yf: 0.391, r: 15 },
    { xf: 0.85, yf: 0.563, r: 14 },  { xf: 0.92, yf: 0.352, r: 16 },
    { xf: 0.98, yf: 0.5, r: 18 },    { xf: 0.03, yf: 0.684, r: 16 },
    { xf: 0.2, yf: 0.719, r: 14 },   { xf: 0.5, yf: 0.703, r: 20 },
    { xf: 0.8, yf: 0.734, r: 16 },   { xf: 0.97, yf: 0.684, r: 18 },
    { xf: 0.07, yf: 0.813, r: 18 },  { xf: 0.3, yf: 0.875, r: 14 },
    { xf: 0.5, yf: 0.836, r: 22 },   { xf: 0.72, yf: 0.875, r: 16 },
    { xf: 0.93, yf: 0.813, r: 20 },
];

/**
 * Seed radii are in the app's 1280-unit box, which it renders at ~7 units per
 * pixel — so a star is two or three pixels across. Matching that ratio is what
 * keeps them reading as a sky rather than as decoration.
 */
const PX_PER_UNIT = 1 / 6;

/**
 * A browser window is far wider than a phone, so the phone's 31 seeds would
 * scatter too thinly. Mirroring them across the vertical axis doubles the count
 * without inventing positions, and the mirrored copy sits on a different
 * twinkle phase so the symmetry isn't visible.
 */
const STARS = [
    ...SEEDS.map((s, i) => ({ ...s, key: `s${i}`, phase: i })),
    ...SEEDS.map((s, i) => ({ ...s, xf: 1 - s.xf, key: `m${i}`, phase: i + 1 })),
];

// app: ClearNightIcon's LAYER_CONFIGS.
const LAYERS = [
    { delay: 0, duration: 3100 },
    { delay: 900, duration: 3900 },
    { delay: 1900, duration: 2700 },
];

/** Matches GradientBackground's FADE_MS so the sky and its stars arrive together. */
const FADE_MS = 3500;

export default function StarField({ visible }: { visible: boolean }) {
    const layers = useMemo(() => {
        const out: (typeof STARS)[] = [[], [], []];
        STARS.forEach((s) => out[s.phase % LAYERS.length].push(s));
        return out;
    }, []);

    return (
        <div
            className='absolute inset-0 overflow-hidden'
            style={{
                opacity: visible ? 1 : 0,
                transition: `opacity ${FADE_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
            }}
            aria-hidden='true'
        >
            {layers.map((stars, i) => (
                <div
                    key={i}
                    className='absolute inset-0 animate-twinkle'
                    style={{
                        animationDuration: `${LAYERS[i].duration}ms`,
                        animationDelay: `${LAYERS[i].delay}ms`,
                    }}
                >
                    {stars.map((s) => {
                        const px = s.r * PX_PER_UNIT * 2;
                        return (
                            <svg
                                key={s.key}
                                width={px}
                                height={px}
                                viewBox={`0 0 ${s.r * 2} ${s.r * 2}`}
                                className='absolute'
                                style={{
                                    left: `${s.xf * 100}%`,
                                    top: `${s.yf * 100}%`,
                                    marginLeft: -px / 2,
                                    marginTop: -px / 2,
                                }}
                            >
                                <path d={sparklePath(s.r)} fill='#fefefe' fillRule='evenodd' />
                            </svg>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
