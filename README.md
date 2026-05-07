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

Place your OJO app icon in the `/public` folder. The following filenames are referenced throughout the site:

| File | Size | Used for |
|---|---|---|
| `public/icon.png` | 1024×1024 | App icon on hero (replace the "O" placeholder) |
| `public/favicon.ico` | 32×32 | Browser tab favicon |
| `public/icon-16.png` | 16×16 | Small favicon |
| `public/icon-32.png` | 32×32 | Standard favicon |
| `public/apple-touch-icon.png` | 180×180 | iOS home screen icon |
| `public/icon-192.png` | 192×192 | PWA icon |
| `public/icon-512.png` | 512×512 | PWA icon |
| `public/og-image.png` | 1200×630 | Social share preview |

### Replacing the "O" placeholder

In `app/page.tsx`, find the hero icon section and replace:

```tsx
<div className="w-24 h-24 rounded-[28px] glass-strong ...">
  <span className="font-outfit font-extrabold text-white text-4xl">O</span>
</div>
```

with:

```tsx
import Image from "next/image";

<div className="w-24 h-24 rounded-[28px] overflow-hidden shadow-xl animate-float">
  <Image src="/icon.png" alt="OJO" width={96} height={96} priority />
</div>
```

Do the same in `components/Nav.tsx` and `components/Footer.tsx` for the small nav/footer logos.

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

Colors:
- Mint: `#5EEAD4`
- Lime: `#84CC16`
- Gradient: `160deg, #5EEAD4 → #84CC16`

Fonts (loaded via next/font/google):
- **Outfit** — headings, nav, UI labels
- **DM Sans** — body copy, descriptions

Glass utilities (defined in `globals.css`):
- `.glass` — standard card
- `.glass-strong` — elevated surface
- `.glass-subtle` — low-key background
