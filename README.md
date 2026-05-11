# OJO Website

Marketing and legal website for the OJO mobile app. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, features, legal links |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/delete-account` | Account deletion instructions |
| `/support` | FAQ accordion + contact |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Edit `lib/constants.ts` to update:

- `SUPPORT_EMAIL` — your real support email address
- `APP_STORE_URL` — your App Store link once live
- `WEBSITE_URL` — your real domain (currently `https://ojoapp.io`)
- `EFFECTIVE_DATE` — date your privacy/terms went live

Also update in `app/layout.tsx`:
- `metadataBase` — ensure it matches `WEBSITE_URL`
- `openGraph.url` — URL for social sharing

## App Icon / Assets

Place your OJO app assets in the `/public` folder. The following filenames are referenced throughout the site:

| File | Size | Used for |
|---|---|---|
| `public/ojo_app_icon@1x.png` | 192×192 | App icon (hero, footer, favicon, Apple touch icon) |
| `public/ojoLogo.png` | variable | Navigation header logo |
| `public/framedimage.png` | variable | App preview on hero section |
| `public/Ojo_word_logo_Black.png` | variable | OJO word mark (black) |
| `public/Ojo_word_logo_White.png` | variable | OJO word mark (white) |
| `public/ojo_word_logo_2.png` | variable | Alternative word mark |
| `public/og-image.png` | 1200×630 | Social share preview (required for OpenGraph) |
| `public/site.webmanifest` | — | PWA manifest |

### Asset Implementation

- **Hero Icon**: `app/page.tsx` displays `ojo_app_icon@1x.png` (96×96) with the `animate-float` class for smooth floating effect
- **Nav Logo**: `components/Nav.tsx` uses `ojoLogo.png` (40×40)
- **App Preview**: `app/page.tsx` displays `framedimage.png` with decorative glow effect
- **Footer Icon**: `components/Footer.tsx` uses `ojo_app_icon@1x.png` (28×28)
- **Favicon & Apple Touch**: `app/layout.tsx` uses `ojo_app_icon@1x.png` for both browser and iOS icons

## Legal Customization

Before going live, update the following in the Terms of Service page:

- `[Your State]` — the governing jurisdiction (e.g., "New Jersey")
- `[Your Jurisdiction]` — the county/city for dispute resolution

## Deployment

This is a standard Next.js App Router project. Deploy to:

- **Vercel** (recommended): Connect your repo, zero config
- **Netlify**: Add `next.config.mjs` output: 'export' for static export
- **Any Node.js host**: `npm run build && npm start`

## Components

- **GradientBackground**: Full-screen animated background cycling through 19 weather-themed gradients
- **Nav**: Fixed header with logo and navigation links
- **Footer**: Footer with branding and legal links
- **PageHeader**: Reusable page title section for legal pages
- **AnimatedSection**: Wrapper for scroll-triggered animations

## Directory Structure

```
app/
├── page.tsx           # Home page with hero, features, preview
├── layout.tsx         # Root layout with metadata & fonts
├── globals.css        # Global styles & utilities
├── privacy/           # Privacy Policy page
├── terms/             # Terms of Service page
├── delete-account/    # Account deletion instructions
└── support/           # FAQ accordion & contact

components/
├── GradientBackground.tsx  # Animated background
├── Nav.tsx                 # Navigation header
├── Footer.tsx              # Footer
├── PageHeader.tsx          # Page title section
└── AnimatedSection.tsx     # Scroll animations

lib/
└── constants.ts       # Config values (emails, URLs, dates)

public/
├── ojo_app_icon@1x.png     # App icon (favicon, Apple touch, hero, footer)
├── ojoLogo.png             # Nav logo
├── framedimage.png         # App preview mockup
├── Word logos              # Various word mark variants
├── og-image.png            # Social share preview
└── site.webmanifest        # PWA manifest
```

## Design System

### Background

The site features an animated gradient background (`components/GradientBackground.tsx`) that cycles through 19 weather-themed gradients with smooth 5-second crossfades:

**Cycle Order:**
0. Clear/Sunny (teal → lime) — brand default, starting state
1. Partly Cloudy (sky blue → violet)
2. Winter/Snow (icy sky → indigo)
3. Rainy (cyan → indigo)
4. Stormy (slate → navy)
5. Sunset (violet → peach)
6. Hot/Warm (gold → red)
7. Windy/Breezy (emerald → violet)
8. Sunny (orange → gold)
9. Clear Day (sky blue)
10. Clear Night (deep midnight)
11. Hot (scorched amber)
12. Cloudy (cool slate)
13. Drizzle (light blue)
14. Snow (icy sky)
15. Ice (cold steel blue)
16. Foggy (cool grey mist)
17. Hazy (warm ochre dust)
18. Default Fallback (neutral slate)

**Configuration** (`components/GradientBackground.tsx`):
- `HOLD_MS = 14000` — duration each gradient displays
- `FADE_MS = 5000` — crossfade transition duration

### Colors

Primary palette:
- Mint: `#5EEAD4` (primary accent)
- Lime: `#84CC16` (secondary accent)
- Teal (soft): `#2DD4BF`
- Teal (deep): `#0D9488`

Brand gradient: `linear-gradient(160deg, #2DD4BF 0%, #10B981 40%, #A3E635 100%)`

### Fonts

Loaded via `next/font/google`:
- **Outfit** — headings, nav, UI labels
  - Weights: 300, 400, 500, 600, 700, 800
  - CSS variable: `--font-outfit`
- **DM Sans** — body copy, descriptions
  - Weights: 300, 400, 500, 600
  - CSS variable: `--font-dm-sans`

### Glass Utilities

Defined in `app/globals.css`:
- `.glass` — backdrop blur 20px, rgba(255,255,255,0.12)
- `.glass-strong` — backdrop blur 28px, rgba(255,255,255,0.18)
- `.glass-subtle` — backdrop blur 12px, rgba(255,255,255,0.08)

### Animations

Tailwind config (`tailwind.config.ts`):
- `animate-float` — smooth vertical floating (6s)
- `animate-float-slow` — slower floating variant (9s)
- `animate-pulse-slow` — slow pulse effect (4s)
- `animate-gradient-shift` — gradient animation (8s)
