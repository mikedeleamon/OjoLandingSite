import type { Config } from "tailwindcss";
import { glass, text, radius, spacing, glassShadow, animation, brandHeroTint } from "./lib/tokens";

// The theme is generated from lib/tokens.ts, which is itself a port of the Ojo
// app's src/theme/tokens.ts. Add values there, not here, so the site and the
// app keep sharing literal numbers.

const px = (n: number) => `${n}px`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // App: fonts.hero — Fraunces SemiBold at optical size 72. Hero only.
        hero: ["var(--font-fraunces)", "Georgia", "serif"],
        // App: fonts.display — DM Serif Display. Section titles.
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
        // App: fonts.body — Outfit. Everything else, and the site default.
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        // Text hierarchy — app: textPrimary / textSecondary / textMuted
        ink: {
          DEFAULT: text.primary,
          primary: text.primary,
          secondary: text.secondary,
          muted: text.muted,
        },
        glass: {
          DEFAULT: glass.bg,
          strong: glass.bgStrong,
          subtle: glass.bgSubtle,
          border: glass.border,
        },
        // The logo's mint→leaf, kept for accents. Not a page background.
        mint: "#4FEEC3",
        leaf: "#65BA02",
      },
      borderRadius: {
        sm: px(radius.sm),      // 10
        md: px(radius.md),      // 18
        lg: px(radius.lg),      // 28
        pill: px(radius.pill),
      },
      spacing: {
        xs: px(spacing.xs),
        "xs-plus": px(spacing.xsPlus),
        sm: px(spacing.sm),
        "sm-plus": px(spacing.smPlus),
        md: px(spacing.md),
        lg: px(spacing.lg),
        xl: px(spacing.xl),
      },
      boxShadow: {
        glass: glassShadow,
      },
      transitionTimingFunction: {
        ojo: animation.easing,
      },
      transitionDuration: {
        ojo: `${animation.durationMs}ms`,
      },
      backgroundImage: {
        // App: brandHeroTint — laid OVER glass, never used as a solid fill.
        "brand-tint": `linear-gradient(135deg, ${brandHeroTint[0]} 0%, ${brandHeroTint[1]} 100%)`,
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        // Duration and delay are set per layer by StarField; the app's twinkle
        // floor is 0.15 (ClearNightIcon's TWINKLE_RANGE).
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
