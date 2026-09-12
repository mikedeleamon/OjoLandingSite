/**
 * Time-of-day sky — ported from the Ojo app.
 *
 * Sources: `src/lib/solarPosition.ts`, `src/lib/weather/skyGradient.ts` and the
 * hue-routing half of `src/components/WeatherHUD/colorMath.ts`. The app blends
 * its clear-sky palettes by the sun's actual elevation so the background moves
 * continuously through dawn → golden hour → dusk → night instead of snapping on
 * a day/night boolean. The site does the same thing, once, on load.
 *
 * The one difference: the app knows where you are. A landing page asking for
 * geolocation to pick a background colour would be obnoxious, so longitude is
 * derived from the browser's UTC offset (15° per hour, exact enough that solar
 * noon lands within a few minutes of the visitor's real one) and latitude is
 * assumed. See ASSUMED_LATITUDE.
 */

import { weatherGradients } from './tokens';

// ─── Colour maths ─────────────────────────────────────────────────────────────

const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace('#', '');
    return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
    ];
};

const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) =>
        Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
            case g: h = ((b - r) / d + 2) * 60; break;
            case b: h = ((r - g) / d + 4) * 60; break;
        }
    }
    return [h, s, l];
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h = ((h % 360) + 360) % 360;
    if (s === 0) { const v = l * 255; return [v, v, v]; }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = h / 360;
    const hue2rgb = (t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    return [hue2rgb(hk + 1 / 3) * 255, hue2rgb(hk) * 255, hue2rgb(hk - 1 / 3) * 255];
};

/**
 * The hue we route around. Nothing in the sky is this colour — and the shortest
 * arc from sky blue (~199°) to golden hour (~46°) goes straight through it,
 * which is how the app once ended up with a lime horizon under a blue zenith.
 */
const GREEN_HUE = 120;

const skyHueDelta = (h1: number, h2: number): number => {
    const up = (((h2 - h1) % 360) + 360) % 360;
    const toGreen = (((GREEN_HUE - h1) % 360) + 360) % 360;
    return toGreen < up ? up - 360 : up;
};

/**
 * Blend two colours along a green-free hue arc, dipping saturation in
 * proportion to how far the hue has to travel — real skies whiten at the
 * horizon before they warm, and holding full saturation across a long arc just
 * trades a lime midpoint for a magenta one.
 */
const lerpColor = (from: string, to: string, t: number): string => {
    const [h1, s1, l1] = rgbToHsl(...hexToRgb(from));
    const [h2, s2, l2] = rgbToHsl(...hexToRgb(to));
    const dh = skyHueDelta(h1, h2);
    const h = s1 < 0.05 ? h2 : h1 + dh * t;
    const travel = Math.abs(dh) / 180;
    const dip = 1 - 0.55 * (travel < 1 ? travel : 1) * Math.sin(Math.PI * t);
    const s = (s1 + (s2 - s1) * t) * dip;
    const l = l1 + (l2 - l1) * t;
    return rgbToHex(...hslToRgb(h, s, l));
};

// ─── Solar position (NOAA equations) ──────────────────────────────────────────

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const julianDay = (date: Date) => date.getTime() / 86_400_000 + 2_440_587.5;

export interface SolarPosition {
    /** Degrees above the horizon. Negative = below. */
    elevationDeg: number;
    /** Sun climbing toward noon. −4° happens twice a day and the sky does not
     *  look the same both times, so dawn and dusk get separate palettes. */
    isRising: boolean;
}

export function solarPosition(lat: number, lon: number, date = new Date()): SolarPosition {
    const t = (julianDay(date) - 2_451_545.0) / 36_525;

    const l0 = (280.46646 + t * (36_000.76983 + t * 0.0003032)) % 360;
    const m = 357.52911 + t * (35_999.05029 - 0.0001537 * t);

    const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
    const c =
        Math.sin(rad(m)) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
        Math.sin(rad(2 * m)) * (0.019993 - 0.000101 * t) +
        Math.sin(rad(3 * m)) * 0.000289;

    const omega = 125.04 - 1934.136 * t;
    const lambda = l0 + c - 0.00569 - 0.00478 * Math.sin(rad(omega));

    const seconds = 21.448 - t * (46.815 + t * (0.00059 - t * 0.001813));
    const eps = 23 + (26 + seconds / 60) / 60 + 0.00256 * Math.cos(rad(omega));

    const decl = deg(Math.asin(Math.sin(rad(eps)) * Math.sin(rad(lambda))));

    const y = Math.tan(rad(eps / 2)) ** 2;
    const eqTime =
        4 * deg(
            y * Math.sin(2 * rad(l0)) -
            2 * e * Math.sin(rad(m)) +
            4 * e * y * Math.sin(rad(m)) * Math.cos(2 * rad(l0)) -
            0.5 * y * y * Math.sin(4 * rad(l0)) -
            1.25 * e * e * Math.sin(2 * rad(m)),
        );

    const utcMinutes =
        date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
    const trueSolarTime = (utcMinutes + eqTime + 4 * lon + 1440) % 1440;
    const hourAngle = trueSolarTime / 4 - 180;

    const cosZenith =
        Math.sin(rad(lat)) * Math.sin(rad(decl)) +
        Math.cos(rad(lat)) * Math.cos(rad(decl)) * Math.cos(rad(hourAngle));

    const clamped = cosZenith < -1 ? -1 : cosZenith > 1 ? 1 : cosZenith;
    return { elevationDeg: 90 - deg(Math.acos(clamped)), isRising: hourAngle < 0 };
}

// ─── Elevation → palette ──────────────────────────────────────────────────────

type Stops = readonly { elevation: number; colors: readonly string[] }[];

const DUSK_STOPS: Stops = [
    { elevation:  10, colors: weatherGradients.clearDay },
    { elevation:   6, colors: weatherGradients.lowSun },
    { elevation:   2, colors: weatherGradients.goldenHour },
    { elevation:  -4, colors: weatherGradients.sunset },
    { elevation:  -7, colors: weatherGradients.afterglow },
    { elevation: -10, colors: weatherGradients.blueHour },
    { elevation: -16, colors: weatherGradients.clearNight },
];

const DAWN_STOPS: Stops = [
    { elevation:  10, colors: weatherGradients.clearDay },
    { elevation:   6, colors: weatherGradients.dawnPale },
    { elevation:   2, colors: weatherGradients.dawnGold },
    { elevation:  -4, colors: weatherGradients.dawn },
    { elevation:  -7, colors: weatherGradients.dawnAfterglow },
    { elevation: -10, colors: weatherGradients.dawnBlue },
    { elevation: -16, colors: weatherGradients.clearNight },
];

/**
 * Interpolated sky palette for a solar elevation. Above the first stop and
 * below the last it returns the endpoint palette unchanged, so the long flat
 * stretches of midday and night are stable.
 */
export function skyGradientFor(elevationDeg: number, isRising = false): readonly string[] {
    const STOPS = isRising ? DAWN_STOPS : DUSK_STOPS;
    const first = STOPS[0];
    const last = STOPS[STOPS.length - 1];
    if (elevationDeg >= first.elevation) return first.colors;
    if (elevationDeg <= last.elevation) return last.colors;

    for (let i = 0; i < STOPS.length - 1; i++) {
        const hi = STOPS[i];
        const lo = STOPS[i + 1];
        if (elevationDeg <= hi.elevation && elevationDeg > lo.elevation) {
            const t = (hi.elevation - elevationDeg) / (hi.elevation - lo.elevation);
            if (t === 0) return hi.colors;
            return hi.colors.map((c, idx) => lerpColor(c, lo.colors[idx], t));
        }
    }
    return last.colors;
}

// ─── Visitor's sky ────────────────────────────────────────────────────────────

/**
 * Latitude stands in for the one thing the UTC offset cannot tell us.
 *
 * It controls how fast the sun crosses the twilight bands and how much the day
 * length swings with the season — not *when* the sun is up, which comes from
 * longitude and is exact. 40°N is a mid-northern compromise: it gives long
 * summer evenings and early winter dusks, the seasonal feel most visitors
 * expect. Southern-hemisphere visitors get a sky that is six months out of
 * phase seasonally, though still correct to within an hour or so at the
 * equinoxes. Swap this for a real coordinate the day the site has one.
 */
const ASSUMED_LATITUDE = 40;

/** Longitude implied by the browser's UTC offset — 15° of longitude per hour. */
function longitudeFromTimezone(date = new Date()): number {
    return -date.getTimezoneOffset() / 4;
}

/**
 * Sun elevation below which the app shows its star field: the end of civil
 * twilight, when the first stars are actually visible.
 */
export const NIGHT_ELEVATION = -6;

export interface LiveSky {
    stops: readonly string[];
    elevationDeg: number;
    isRising: boolean;
    /** Dark enough for stars — see NIGHT_ELEVATION. */
    isNight: boolean;
}

/**
 * The clear sky above the visitor, right now. Client-only: it reads the
 * browser's clock and timezone, so callers must not run it during SSR.
 */
export function liveSky(date = new Date()): LiveSky {
    const { elevationDeg, isRising } = solarPosition(
        ASSUMED_LATITUDE,
        longitudeFromTimezone(date),
        date,
    );
    return {
        stops: skyGradientFor(elevationDeg, isRising),
        elevationDeg,
        isRising,
        isNight: elevationDeg < NIGHT_ELEVATION,
    };
}
