/**
 * Design tokens — mirrored from the Ojo app's `src/theme/tokens.ts`.
 *
 * The app is the source of truth. Everything here is a straight port of the
 * values the marketing site needs, so the two surfaces share literal numbers
 * rather than eyeballed approximations. When the app's tokens move, move these.
 *
 * Deliberately NOT ported: the React Native shadow shape, the semantic
 * danger/success/error sets (no forms here), and the light theme (the site
 * renders over the weather sky, which is always the dark treatment).
 */

// ─── Glass surfaces ───────────────────────────────────────────────────────────
// App values: glassBg 0.10, glassBgStrong 0.18, glassBorder 0.22.
// The site previously ran 0.12 / 0.18 / 0.25 — slightly milkier than the app.

export const glass = {
    bg:       'rgba(255, 255, 255, 0.10)',
    bgStrong: 'rgba(255, 255, 255, 0.18)',
    bgSubtle: 'rgba(255, 255, 255, 0.06)',
    border:   'rgba(255, 255, 255, 0.22)',
} as const;

// ─── Text hierarchy ───────────────────────────────────────────────────────────
// The app runs 0.97 / 0.65 / 0.55 against backdrops that are always fairly
// dark. The site's sky reaches genuinely light horizon stops at midday, so the
// two lower tiers are lifted a little and GradientBackground's scroll dim does
// the rest; together they clear 4.5:1 on every palette (WCAG 1.4.3). The
// hierarchy is the app's — three distinct tiers, not two — and the alphas are
// the nearest ones that survive a white sky.

export const text = {
    primary:   'rgba(255, 255, 255, 0.97)',
    secondary: 'rgba(255, 255, 255, 0.72)',
    muted:     'rgba(255, 255, 255, 0.66)',
} as const;

// ─── Brand hero tint ──────────────────────────────────────────────────────────
// The logo's mint→leaf gradient. In the app this is laid OVER glass at ~42%
// alpha so a primary button reads as brand-tinted glass, never a solid fill.
// It is not a page background — that was the site's biggest divergence.
//
// The site does not currently use it as a button fill either: the alpha assumes
// the app's always-dark backdrop, and over a midday sky the mint end leaves
// white label text at 2.6:1. Primary buttons use the saveBtn pair instead (see
// .btn-primary in globals.css). Kept here because it is still the brand ramp,
// and a surface that guarantees its own dark base could use it as intended.

export const brandHeroTint: [string, string] = [
    'rgba(79, 238, 195, 0.42)',
    'rgba(101, 186, 2, 0.42)',
];

// ─── Weather gradients ────────────────────────────────────────────────────────
// Verbatim from the app. Stops read zenith → mid-sky → horizon.

export const weatherGradients = {
    sunny:        ['#F97316', '#FBBF24', '#FDE68A'],
    clearDay:     ['#0284C7', '#38BDF8', '#7DD3FC'],
    clearNight:   ['#020617', '#0C1445', '#1D2B6B'],
    hot:          ['#7C2D12', '#C2410C', '#FBBF24'],

    // Time-of-day sky — evening (sun descending)
    lowSun:       ['#0B5FA8', '#8FC4DE', '#DFE8EC'],
    goldenHour:   ['#0C4A8A', '#E8834A', '#FCD34D'],
    sunset:       ['#1E1B4B', '#C2410C', '#F59E0B'],
    afterglow:    ['#141538', '#5B2F52', '#A85A63'],
    blueHour:     ['#0B1026', '#1E3A8A', '#7C3AED'],

    // Time-of-day sky — morning (sun ascending). Paler, cooler, rosier: dawn
    // light passes through cleaner air than dusk light does.
    dawnPale:     ['#0E5FA8', '#93C6E4', '#E4ECF2'],
    dawnGold:     ['#0E5BA8', '#EFA184', '#F9E29A'],
    dawn:         ['#1B2C63', '#C85A7C', '#F5A98D'],
    dawnAfterglow:['#101B40', '#4A3A6B', '#9A7391'],
    dawnBlue:     ['#070C1F', '#153A82', '#3B7DD8'],

    partlyCloudy: ['#334155', '#475569', '#64748B'],
    cloudy:       ['#1F2937', '#374151', '#4B5563'],

    drizzle:      ['#0F2236', '#1B4A7A', '#4A90D9'],
    rainy:        ['#0C1A2E', '#1E3A5F', '#1D4ED8'],
    stormy:       ['#0F0C29', '#1E1B4B', '#302B63'],

    snow:         ['#5B8DB8', '#93C5FD', '#E0F2FE'],
    ice:          ['#0A1929', '#1B3A5C', '#3A7AB5'],

    foggy:        ['#374151', '#6B7280', '#9CA3AF'],
    hazy:         ['#3B2F1E', '#7A6040', '#BAA07A'],

    default:      ['#0F172A', '#1E293B', '#334155'],
} as const;

/** Base background colour behind everything (app: colors.bgDefault). */
export const bgDefault = '#0F172A';

/**
 * Three sky stops → the site's CSS gradient.
 *
 * Vertical, evenly spaced, because that is literally what the app paints: its
 * `AnimatedLinearGradient` in WeatherHUD passes no `start`, `end` or
 * `locations`, and expo-linear-gradient defaults to (0.5, 0) → (0.5, 1) with
 * stops distributed evenly. The site ran this at 160° for a while, which tilted
 * the sky and — worse — dragged the bright horizon stop up the right-hand edge
 * instead of leaving it along the bottom where the app has it.
 */
export const toCss = (stops: readonly string[]) =>
    `linear-gradient(180deg, ${stops[0]} 0%, ${stops[1]} 50%, ${stops[2]} 100%)`;

// ─── Spacing / radii / motion ─────────────────────────────────────────────────

export const spacing = {
    xs: 6, xsPlus: 8, sm: 12, smPlus: 16, md: 20, lg: 32, xl: 48,
} as const;

export const radius = {
    sm: 10, md: 18, lg: 28, pill: 999,
} as const;

export const animation = {
    durationMs: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** App: shadows.glass — offset y 8, radius 16, black at 25%. */
export const glassShadow = '0 8px 16px rgba(0, 0, 0, 0.25)';
