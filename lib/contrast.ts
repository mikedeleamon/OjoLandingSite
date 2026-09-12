/**
 * Contrast maths for the sky scrim.
 *
 * The site paints white text over whatever palette the sky is showing, and the
 * app's palettes range from #020617 to #E0F2FE. A single hand-picked scrim
 * either fails WCAG 1.4.3 on the pale skies or crushes the dark ones, so the
 * scrim is solved per palette instead: darken only as much as this particular
 * sky actually requires. Night skies come out untouched at the floor.
 */

/** Composite `fg` at `alpha` over `bg`, both as [r,g,b] 0–255. */
const over = (fg: number[], alpha: number, bg: number[]): number[] =>
    bg.map((b, i) => fg[i] * alpha + b * (1 - alpha));

const toRgb = (hex: string): number[] =>
    [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const lumRgb = (rgb: number[]): number => {
    const linear = rgb.map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const ratio = (a: number[], b: number[]): number => {
    const [hi, lo] = [lumRgb(a), lumRgb(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
};

interface ScrimOptions {
    /** Alpha of the white text being placed over the sky. */
    textAlpha: number;
    /** Alpha of any glass surface between the sky and the text (0 for bare sky). */
    glassAlpha?: number;
    /** Contrast ratio to reach. 4.5 for body copy, 3 for large text. */
    target?: number;
    /** Never return less than this, however dark the sky already is. */
    floor?: number;
}

/**
 * The smallest black scrim that gets `textAlpha` white to `target` against every
 * stop in `stops`.
 *
 * Solved by bisection rather than algebraically: sRGB's gamma curve puts the
 * luminance of a composite out of closed form, and twenty iterations of a
 * monotonic function costs nothing at the once-per-palette rate this runs at.
 */
export function minScrimFor(
    stops: readonly string[],
    { textAlpha, glassAlpha = 0, target = 4.5, floor = 0 }: ScrimOptions,
): number {
    const passes = (scrim: number) =>
        stops.every((stop) => {
            const sky = over([0, 0, 0], scrim, toRgb(stop));
            const surface = glassAlpha ? over([255, 255, 255], glassAlpha, sky) : sky;
            return ratio(over([255, 255, 255], textAlpha, surface), surface) >= target;
        });

    if (passes(floor)) return floor;

    // A scrim of 1 is pure black, which passes for any non-white text, so the
    // search always terminates on a bracketed root.
    let lo = floor;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
        const mid = (lo + hi) / 2;
        if (passes(mid)) hi = mid;
        else lo = mid;
    }
    return hi;
}

/**
 * Linear sRGB-space interpolation between the sky's three stops at position
 * `t` (0–1), mirroring how the browser paints `linear-gradient`. Used to ask
 * what colour is actually behind a given band of the page.
 */
function skyColorAt(stops: readonly string[], t: number): number[] {
    const span = 1 / (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(t / span));
    const local = (t - i * span) / span;
    const a = toRgb(stops[i]);
    const b = toRgb(stops[i + 1]);
    return a.map((v, c) => v + (b[c] - v) * local);
}

export interface ScrimStop {
    /** Position along the gradient, 0–1. */
    pos: number;
    alpha: number;
}

/**
 * A scrim that varies along the sky instead of one flat value for all of it.
 *
 * The sky runs dark at the zenith and bright at the horizon — that is what the
 * app's palettes are, three stops from `#020617` to `#E0F2FE` in the same
 * image. Dimming all of it by whatever the brightest stop demands is what made
 * every palette read as the same dark wash: `sunset`'s deep indigo top was
 * being crushed by 49% black to pay for its amber horizon.
 *
 * So the scrim is solved at several points ALONG the gradient and emitted as a
 * gradient of its own on the same axis. The dark end usually needs nothing and
 * keeps its colour; only the bright band gets dimmed.
 *
 * Sampled rather than solved per stop because the browser interpolates between
 * stops and the worst case can land between two of them.
 */
export function scrimRampFor(
    stops: readonly string[],
    constraints: ScrimOptions[],
    floor: number,
    samples = SAMPLES,
): ScrimStop[] {
    return Array.from({ length: samples }, (_, i) => {
        const pos = i / (samples - 1);
        const hex = rgbToHexLocal(skyColorAt(stops, pos));
        return {
            pos,
            alpha: Math.max(
                ...constraints.map((c) =>
                    minScrimFor([hex], {
                        ...c,
                        target: (c.target ?? 4.5) + HEADROOM,
                        floor,
                    }),
                ),
            ),
        };
    });
}

/** Points along the gradient the scrim is solved at. */
const SAMPLES = 9;

/**
 * Solved-for contrast above the number that actually has to hold.
 *
 * Each sample lands exactly on its target, and both the sky and the scrim are
 * interpolated linearly between samples while the contrast requirement between
 * them is not — so the midpoints sag a little below. Measured across every
 * palette at 41 positions, the deepest sag is about 0.03; 0.25 of headroom
 * covers it with room to spare and costs a percent or two of scrim.
 */
const HEADROOM = 0.25;

const rgbToHexLocal = (rgb: number[]): string =>
    '#' +
    rgb
        .map((v) =>
            Math.round(Math.max(0, Math.min(255, v)))
                .toString(16)
                .padStart(2, '0'),
        )
        .join('');
