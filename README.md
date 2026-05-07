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
- `WEBSITE_URL` — your real domain
- `EFFECTIVE_DATE` — date your privacy/terms went live

## App Icon / Assets

Place your OJO app assets in the `/public` folder. The following filenames are referenced throughout the site:

| File | Size | Used for |
|---|---|---|
| `public/ojo_app_icon@1x.png` | 192×192 | App icon on hero, footer (icon badge) |
| `public/ojo_app_icon@512.png` | 512×512 | PWA icon (large) |
| `public/ojoLogo.png` | variable | Navigation header logo |
| `public/framedImage.png` | variable | App preview on hero section |
| `public/favicon.ico` | 32×32 | Browser tab favicon |
| `public/og-image.png` | 1200×630 | Social share preview |

### Asset Implementation

- **Hero Icon**: `app/page.tsx` displays `ojo_app_icon@1x.png` with the `animate-float` class for smooth floating effect
- **Nav Logo**: `components/Nav.tsx` uses `ojoLogo.png` (40×40)
- **App Preview**: `app/page.tsx` displays `framedImage.png` with decorative glow effect
- **Footer Icon**: `components/Footer.tsx` uses `ojo_app_icon@1x.png` (28×28)

## Legal Customization

Before going live, update the following in the Terms of Service page:

- `[Your State]` — the governing jurisdiction (e.g., "New Jersey")
- `[Your Jurisdiction]` — the county/city for dispute resolution

## Deployment

This is a standard Next.js App Router project. Deploy to:

- **Vercel** (recommended): Connect your repo, zero config
- **Netlify**: Add `next.config.mjs` output: 'export' for static export
- **Any Node.js host**: `npm run build && npm start`

## Design System

### Background

The site features an animated gradient background (`components/GradientBackground.tsx`) that cycles through 19 weather-themed gradients:

- **Clear/Sunny** — teal to lime (brand colors)
- **Partly Cloudy** — sky blue to violet
- **Winter/Snow** — icy sky to soft indigo
- **Rainy** — cyan to indigo
- **Stormy** — slate to navy
- **Sunset** — violet to warm peach
- **Hot/Warm** — gold to red
- **Windy/Breezy** — emerald to soft violet
- Plus 11 additional weather conditions for comprehensive coverage

Transitions fade smoothly over 5 seconds, with a 14-second hold on each gradient.

### Colors

Primary palette:
- Mint: `#5EEAD4`
- Lime: `#84CC16`
- Teal (soft): `#2DD4BF`
- Teal (deep): `#0D9488`

Gradient: `160deg, #5EEAD4 → #10B981 → #A3E635` (brand default)

### Fonts

Loaded via next/font/google:
- **Outfit** — headings, nav, UI labels (weights: 300, 400, 500, 600, 700, 800)
- **DM Sans** — body copy, descriptions (weights: 300, 400, 500, 600)

### Glass Utilities

Defined in `app/globals.css`:
- `.glass` — standard card (12px blur)
- `.glass-strong` — elevated surface (28px blur)
- `.glass-subtle` — low-key background (12px blur)
