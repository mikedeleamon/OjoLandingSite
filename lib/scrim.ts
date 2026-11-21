/**
 * The sky's contrast scrim — shared by GradientBackground (client) and
 * lib/skyBoot (server, pre-paint table).
 *
 * The app dims its backdrop as you scroll into content (BackdropLayer's
 * MIN_DIM / SCROLL_RANGE) so glass tiles and body copy sit over a settled sky
 * rather than a bright horizon. The site does the same, and has a second reason
 * to: its palettes run from #020617 to #E0F2FE, and white text over the pale
 * end needs help to clear 4.5:1 (WCAG 1.4.3).
 *
 * So the two ends of the ramp are solved per palette rather than picked (see
 * lib/contrast). SCRIM_FLOOR is the value used when the sky is already dark
 * enough to need nothing — every night palette lands here, which is why they
 * still read as vividly as they do on device.
 */

import { text as textTokens } from './tokens';
import { scrimRampFor, type ScrimStop } from './contrast';

export const SCRIM_FLOOR = 0.28;

const alphaOf = (rgba: string) =>
    Number(rgba.split(',')[3]?.replace(')', '') ?? 1);

// Every place white text meets the sky, as (text tier, glass in the way). The
// scrim has to satisfy all of them, so it is solved for each and the darkest
// answer wins. Glass alphas compound where surfaces nest — a nav pill is a 0.10
// glass inside the 0.10 header once scrolled, and the footer's App Store pill
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

export interface SkyScrim {
    /** Top of the page. */
    hero: ScrimStop[];
    /** Fully scrolled into content. Never lighter than `hero`. */
    content: ScrimStop[];
}

// Each solve is a few thousand bisection steps — several ms on a laptop, tens
// on a phone — and the showcase revisits the same ten palettes forever, so
// every palette is solved once per visit.
const cache = new Map<string, SkyScrim>();

export function scrimFor(stops: readonly string[]): SkyScrim {
    const key = stops.join();
    const hit = cache.get(key);
    if (hit) return hit;
    const hero = scrimRampFor(stops, HERO_CONSTRAINTS, SCRIM_FLOOR);
    const content = scrimRampFor(
        stops,
        CONTENT_CONSTRAINTS,
        hero.map((h) => h.alpha),
    );
    const out = { hero, content };
    cache.set(key, out);
    return out;
}

/** Element-wise max of two ramps — used while two skies are crossfading. */
export const mergeRamps = (a: ScrimStop[], b: ScrimStop[]): ScrimStop[] =>
    a.map((s, i) => ({ pos: s.pos, alpha: Math.max(s.alpha, b[i].alpha) }));

/**
 * The scrim is two stacked black layers: the hero ramp always, plus a second
 * layer faded in by scroll. Two black layers of alpha h and d at opacity t
 * composite to 1-(1-h)(1-d·t); choosing d = (c-h)/(1-h) makes that exactly
 * h + (c-h)·t — a linear blend from hero to content, with the per-frame work
 * reduced to an opacity change.
 */
export const scrollRamp = ({ hero, content }: SkyScrim): ScrimStop[] =>
    content.map((c, i) => ({
        pos: c.pos,
        alpha: Math.max(0, (c.alpha - hero[i].alpha) / (1 - hero[i].alpha)),
    }));

export const toCssScrim = (ramp: ScrimStop[]) =>
    `linear-gradient(180deg, ${ramp
        .map(
            (s) =>
                `rgba(0,0,0,${s.alpha.toFixed(3)}) ${Math.round(s.pos * 100)}%`,
        )
        .join(', ')})`;
