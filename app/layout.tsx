import type { Metadata } from 'next';
import { Outfit, DM_Serif_Display, Fraunces } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GradientBackground from '@/components/GradientBackground';

// The app's three faces, from src/theme/tokens.ts:
//   fonts.hero    → Fraunces SemiBold, optical size 72 (the Home hero only)
//   fonts.display → DM Serif Display (section titles)
//   fonts.body    → Outfit 300–700 (everything else)
// The site previously paired Outfit with DM Sans, which is a different family
// from DM Serif Display and appears nowhere in the app.

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
    axes: ['SOFT', 'WONK', 'opsz'],
});

const dmSerif = DM_Serif_Display({
    subsets: ['latin'],
    variable: '--font-dm-serif',
    display: 'swap',
    weight: ['400'],
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: {
        default: 'OJO — Dress for the weather.',
        template: '%s | OJO',
    },
    description:
        'OJO is your weather-aware outfit companion. It reads the forecast, knows your wardrobe, and tells you exactly what to wear — every single day.',
    keywords: [
        'outfit planner',
        'weather app',
        'closet management',
        'what to wear',
        'outfit suggestions',
        'wardrobe app',
    ],
    authors: [{ name: 'OJO App' }],
    creator: 'OJO App',
    metadataBase: new URL('https://ojoapp.io'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://ojoapp.io',
        title: 'OJO — Dress for the weather.',
        description:
            'Your weather-aware outfit companion. Smart outfit suggestions powered by your local forecast.',
        siteName: 'OJO',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'OJO App',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'OJO — Dress for the weather.',
        description:
            'Your weather-aware outfit companion. Smart outfit suggestions powered by your local forecast.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: [{ url: '/ojo_app_icon@1x.png' }],
        apple: [
            {
                url: '/ojo_app_icon@1x.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang='en'
            className={`${outfit.variable} ${dmSerif.variable} ${fraunces.variable}`}
        >
            <body className='min-h-screen relative overflow-x-hidden'>
                {/* ── Skip navigation (WCAG 2.4.1 / Section 508 §1194.22(o)) ── */}
                <a
                    href='#main-content'
                    className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-teal-700 focus:font-outfit focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-none'
                >
                    Skip to main content
                </a>

                <GradientBackground />

                {/* Animated background blobs */}
                <div className='fixed inset-0 pointer-events-none overflow-hidden -z-10'>
                    <div
                        className='absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 animate-float'
                        style={{
                            background:
                                'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                        }}
                    />
                    <div
                        className='absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-20 animate-float-slow'
                        style={{
                            background:
                                'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)',
                        }}
                    />
                    <div
                        className='absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 animate-float'
                        style={{
                            background:
                                'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                            animationDelay: '3s',
                        }}
                    />
                </div>

                <Nav />
                <main
                    id='main-content'
                    tabIndex={-1}
                >
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
