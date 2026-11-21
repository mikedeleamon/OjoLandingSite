import Image from 'next/image';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import Reveal from '@/components/Reveal';
import {
    SparkleIcon,
    CloudIcon,
    HangerIcon,
    LayersIcon,
    FingerprintIcon,
    BarsIcon,
    HistoryIcon,
    MicIcon,
    SwapIcon,
    SuitcaseIcon,
    PinIcon,
    BellIcon,
    WidgetIcon,
    CalendarCheckIcon,
    SearchIcon,
    ChevronRightIcon,
    MailIcon,
    ShieldCheckIcon,
    FileTextIcon,
    TrashIcon,
    HeadphonesIcon,
    AppleGlyph,
} from '@/components/icons';
import { SUPPORT_EMAIL, APP_STORE_URL } from '@/lib/constants';

// App: fonts.hero — Fraunces SemiBold at optical size 72, for the hero heading
// only. Loaded here rather than in the root layout so only Home preloads it.
// SOFT and WONK stay at their default 0, so only the opsz axis ships.
const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
    axes: ['opsz'],
});

const features = [
    {
        icon: SparkleIcon,
        title: 'Smart outfit suggestions',
        description:
            "OJO scores every outfit across fabric, color harmony, formality, and your personal style, then matches it to today's forecast — temperature, feels-like, humidity, wind — using pieces you actually own. Switch occasions (Work, Date, Outdoor) and it re-ranks instantly.",
    },
    {
        icon: SwapIcon,
        title: 'Swap any piece',
        description:
            "Not feeling the shirt? Long-press any piece on the outfit card and OJO offers up to three stand-ins that still score well for today's weather — and learns from the ones you pass on.",
    },
    {
        icon: CloudIcon,
        title: 'Weather you can see',
        description:
            "Powered by Apple WeatherKit. OJO knows when the morning is cold but the afternoon warms up, and layers accordingly — and the outfit card itself reacts to the sky: rain beads on the glass, frost creeps in from the corners, heat shimmers above 90°.",
    },
    {
        icon: MicIcon,
        title: 'Ask Siri what to wear',
        description:
            "Say \"What should I wear in Ojo\" to Siri, Spotlight, or Shortcuts — or ask for tomorrow's outfit. Siri answers out loud with a card of your pieces, without opening the app. Free for everyone.",
    },
    {
        icon: HangerIcon,
        title: 'Your closet, organized',
        description:
            "Add pieces by type, color, and fabric — or just snap a photo and OJO's on-device ML identifies the garment. Your images never leave your phone during recognition. Keep separate closets for seasons, travel, or work; Ojo Pro lifts the free limits on pieces and closets.",
    },
    {
        icon: LayersIcon,
        title: 'Layering intelligence',
        description:
            'On days with big temperature swings, OJO flags exactly which layers you can shed mid-day — with confidence scores and timing.',
    },
    {
        icon: FingerprintIcon,
        title: 'Style DNA',
        description:
            'The more outfits you log, the sharper OJO gets. Your Style DNA gets a name read from what you wear and generative art built from your colors — a living portrait of your style you can share. Part of Ojo Pro.',
    },
    {
        icon: BarsIcon,
        title: 'Wardrobe Insights',
        description:
            "See how much of your closet you actually wear, cost-per-wear for every piece, your total wardrobe value, and which pieces are 'sleeping' — then queue them for donation in a tap.",
    },
    {
        icon: HistoryIcon,
        title: 'Wear Calendar',
        description:
            "Every outfit you log lands on your Wear Calendar: your streaks, a 26-week strip in the colors you wore, and month grids of outfit collages. Tap any day to see exactly what you had on. It syncs across devices, so your history survives a reinstall.",
    },
    {
        icon: SuitcaseIcon,
        title: 'TripFit packing plans',
        description:
            "Heading somewhere? Add a destination and dates, and TripFit builds a day-by-day outfit plan plus a grouped packing list from the forecast where you're going.",
    },
    {
        icon: PinIcon,
        title: 'Trip Mode',
        description:
            'Once you arrive, Trip Mode keeps your plan live — re-suggesting outfits on the fly when the local weather throws you a curveball.',
    },
    {
        icon: BellIcon,
        title: 'Daily brief & alerts',
        description:
            'Wake up to a morning outfit brief, and get a heads-up when the forecast shifts, when the day holds a big temperature swing, or when your closet is missing a staple. Allow optional "Always" location and they follow you when you travel — every alert is yours to switch on or off.',
    },
    {
        icon: WidgetIcon,
        title: 'Home & lock screen widgets',
        description:
            "Today's Outfit, Tomorrow Prep, Layer Timeline, Trip Countdown, and UV & Sunset — five widgets that put the day's call on your home screen. Tap to change your fit without opening the app.",
    },
    {
        icon: CalendarCheckIcon,
        title: 'Weekly wardrobe recap',
        description:
            'Every week OJO hands you a short read on how you actually dressed — your standout colors, the comebacks, and the pieces still sleeping in the back of the closet.',
    },
    {
        icon: SearchIcon,
        title: 'Wardrobe gap detection',
        description:
            "OJO notices what your closet is missing for the weather you actually live in — no rain layer, nothing warm enough for next week — and tells you before you're caught out.",
    },
];

const legalLinks = [
    {
        icon: ShieldCheckIcon,
        label: 'Privacy Policy',
        href: '/privacy',
        desc: 'How we handle your data',
    },
    {
        icon: FileTextIcon,
        label: 'Terms of Service',
        href: '/terms',
        desc: 'Rules of the road',
    },
    {
        icon: TrashIcon,
        label: 'Delete Account',
        href: '/delete-account',
        desc: 'Remove your data anytime',
    },
    {
        icon: HeadphonesIcon,
        label: 'Support',
        href: '/support',
        desc: 'Get help fast',
    },
];

export default function HomePage() {
    return (
        <div className={`min-h-screen ${fraunces.variable}`}>
            {/* ── HERO ── entrance is CSS (animate-rise), so no JS is needed to
                paint it, and prefers-reduced-motion switches it off. */}
            <section className='relative pt-36 pb-24 px-6 overflow-hidden'>
                <div className='max-w-4xl mx-auto text-center'>
                    {/* App icon / logo */}
                    <div className='flex justify-center mb-8 animate-rise'>
                        <Image
                            src='/ojo_app_icon@512.png'
                            alt='OJO App Icon'
                            width={96}
                            height={96}
                            className='rounded-lg shadow-xl animate-float'
                            priority
                        />
                    </div>

                    {/* Headline */}
                    <h1
                        className='animate-rise font-hero text-5xl md:text-7xl text-ink-primary text-shadow leading-[1.05] mb-6'
                        style={{ animationDelay: '0.1s' }}
                    >
                        Dress for
                        <br />
                        the weather.
                    </h1>

                    {/* Subheadline */}
                    <p
                        className='animate-rise text-ink-secondary text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10'
                        style={{ animationDelay: '0.2s' }}
                    >
                        OJO reads the forecast, knows your wardrobe, and tells
                        you exactly what to wear — every single day.
                    </p>

                    {/* CTAs */}
                    <div
                        className='animate-rise flex flex-col sm:flex-row items-center justify-center gap-3'
                        style={{ animationDelay: '0.3s' }}
                    >
                        <a
                            href={APP_STORE_URL}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex items-center gap-2 btn-primary font-outfit font-semibold text-sm px-6 py-3.5 rounded-full hover:scale-105 transition-all duration-ojo'
                        >
                            <AppleGlyph size={16} />
                            Download on the App Store
                        </a>

                        <Link
                            href='/support'
                            className='flex items-center gap-2 glass text-ink-primary font-outfit font-medium text-sm px-6 py-3.5 rounded-full hover:glass-strong hover:scale-105 transition-all duration-ojo'
                        >
                            <MailIcon size={15} />
                            Contact Support
                        </Link>
                    </div>

                    {/* App preview */}
                    <div
                        className='animate-rise mt-20 flex justify-center'
                        style={{ animationDelay: '0.4s' }}
                    >
                        <div className='relative'>
                            <Image
                                src='/framedimage.png'
                                alt='OJO app preview'
                                width={320}
                                height={640}
                                sizes='(min-width: 768px) 320px, 256px'
                                priority
                                className='w-64 md:w-80 h-auto rounded-[44px]'
                            />

                            {/* Decorative glow behind phone */}
                            <div
                                className='absolute inset-0 -z-10 blur-3xl opacity-50 rounded-full scale-125'
                                style={{
                                    background:
                                        'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 75%)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section
                className='px-6 py-20'
                aria-labelledby='features-heading'
            >
                <div className='max-w-5xl mx-auto'>
                    <Reveal className='text-center mb-14'>
                        <p className='text-ink-primary text-xs font-semibold uppercase tracking-widest font-outfit mb-3'>
                            What OJO does
                        </p>
                        <h2
                            id='features-heading'
                            className='font-display text-3xl md:text-4xl text-ink-primary text-shadow'
                        >
                            Your wardrobe, weather-aware.
                        </h2>
                    </Reveal>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <Reveal
                                    key={feature.title}
                                    delay={(i % 3) * 100}
                                >
                                    <div className='glass rounded-lg p-6 cursor-default group h-full transition-transform duration-200 hover:-translate-y-1'>
                                        <div className='w-10 h-10 rounded-md glass-strong flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-ojo'>
                                            <Icon
                                                size={18}
                                                className='text-ink-primary'
                                                strokeWidth={1.8}
                                            />
                                        </div>
                                        <h3 className='font-outfit font-semibold text-ink-primary text-base mb-2'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-ink-secondary text-sm leading-relaxed'>
                                            {feature.description}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── LEGAL / SUPPORT LINKS ── */}
            <section
                className='px-6 py-16'
                aria-labelledby='legal-heading'
            >
                <div className='max-w-3xl mx-auto'>
                    <Reveal className='text-center mb-10'>
                        <h2
                            id='legal-heading'
                            className='font-display text-2xl md:text-3xl text-ink-primary text-shadow mb-2'
                        >
                            Transparency & support
                        </h2>
                        <p className='text-ink-secondary text-sm'>
                            Everything you need to know about your data and how
                            to get help.
                        </p>
                    </Reveal>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {legalLinks.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <Reveal
                                    key={link.href}
                                    delay={(i % 2) * 100}
                                >
                                    <Link
                                        href={link.href}
                                        className='group flex items-center gap-4 glass rounded-md px-5 py-4 hover:glass-strong transition-all duration-ojo hover:scale-[1.02]'
                                    >
                                        <div className='w-9 h-9 rounded-sm glass-strong flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-ojo'>
                                            <Icon
                                                size={16}
                                                className='text-ink-primary'
                                                strokeWidth={1.8}
                                            />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-outfit font-semibold text-ink-primary text-sm'>
                                                {link.label}
                                            </p>
                                            <p className='text-ink-muted text-xs'>
                                                {link.desc}
                                            </p>
                                        </div>
                                        <ChevronRightIcon
                                            size={16}
                                            aria-hidden='true'
                                            className='text-ink-muted group-hover:text-ink-secondary group-hover:translate-x-0.5 transition-all duration-ojo flex-shrink-0'
                                        />
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CONTACT CTA ── */}
            <section className='px-6 pb-24'>
                <Reveal className='max-w-2xl mx-auto glass-strong rounded-lg p-8 md:p-10 text-center'>
                    <p className='text-ink-primary text-xs font-semibold uppercase tracking-widest font-outfit mb-3'>
                        Questions?
                    </p>
                    <h2 className='font-display text-2xl text-ink-primary mb-3'>
                        We'd love to hear from you.
                    </h2>
                    <p className='text-ink-secondary text-sm mb-6 leading-relaxed'>
                        Reach out with feedback, bug reports, or anything on
                        your mind. We respond within 48 hours.
                    </p>
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='inline-flex items-center gap-2 btn-primary font-outfit font-semibold text-sm px-6 py-3.5 rounded-full hover:scale-105 transition-all duration-ojo'
                    >
                        <MailIcon size={15} />
                        {SUPPORT_EMAIL}
                    </a>
                </Reveal>
            </section>
        </div>
    );
}
