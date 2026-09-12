'use client';

import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import {
    SparkleIcon,
    CloudIcon,
    HangerIcon,
    LayersIcon,
    FingerprintIcon,
    BarsIcon,
    FolderIcon,
    HistoryIcon,
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
import { SUPPORT_EMAIL, TESTFLIGHT_URL } from '@/lib/constants';

const features = [
    {
        icon: SparkleIcon,
        title: 'Smart outfit suggestions',
        description:
            "OJO scores every outfit across fabric, color harmony, formality, and your personal style, then matches it to today's forecast — temperature, feels-like, humidity, wind — using clothes you actually own. Switch occasions (Work, Date, Outdoor) and it re-ranks instantly.",
    },
    {
        icon: CloudIcon,
        title: 'Live weather integration',
        description:
            "Powered by Apple WeatherKit's real-time data. OJO knows when the morning is cold but the afternoon warms up, and layers accordingly.",
    },
    {
        icon: HangerIcon,
        title: 'Your closet, organized',
        description:
            "Add clothing by type, color, and fabric — or just snap a photo and OJO's on-device ML identifies the garment. Your images never leave your phone during recognition.",
    },
    {
        icon: LayersIcon,
        title: 'Layering intelligence',
        description:
            'On days with big temperature swings, OJO flags exactly which layers you can shed mid-day — with confidence scores and timing.',
    },
    {
        icon: FingerprintIcon,
        title: 'Style that learns you',
        description:
            'The more outfits you log, the sharper OJO gets. It builds a Style DNA — your signature colors and go-to fabrics — and shifts recommendations toward what is genuinely you.',
    },
    {
        icon: BarsIcon,
        title: 'Wardrobe Insights',
        description:
            "See how much of your closet you actually wear, cost-per-wear for every item, your total wardrobe value, and which pieces are 'sleeping' — then queue them for donation in a tap.",
    },
    {
        icon: FolderIcon,
        title: 'Multiple closets',
        description:
            'Seasonal wardrobes, travel packing, work vs. weekend — keep them separated and switch your preferred closet anytime.',
    },
    {
        icon: HistoryIcon,
        title: 'Outfit history',
        description:
            "Track what you've worn and when. OJO avoids repeats, surfaces fresh combinations, and syncs across devices so your history survives a reinstall — share any look in a tap.",
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
            'Wake up to a morning outfit brief, and get a heads-up when the forecast shifts, when the day holds a big temperature swing, or when your closet is missing a staple — every alert is yours to switch on or off.',
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

// Animation variants
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function HomePage() {
    return (
        // MotionConfig reducedMotion="user" — Framer Motion automatically
        // jumps all animated values to their target state instantly when the
        // OS-level prefers-reduced-motion preference is set (WCAG 2.3.3).
        <MotionConfig reducedMotion="user">
        <div className='min-h-screen'>
            {/* ── HERO ── */}
            <section className='relative pt-36 pb-24 px-6 overflow-hidden'>
                <div className='max-w-4xl mx-auto text-center'>
                    {/* App icon / logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className='flex justify-center mb-8'
                    >
                        <Image
                            src='/ojo_app_icon@1x.png'
                            alt='OJO App Icon'
                            width={96}
                            height={96}
                            className='rounded-lg shadow-xl animate-float'
                            priority
                        />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.75,
                            delay: 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className='font-hero text-5xl md:text-7xl text-ink-primary text-shadow leading-[1.05] mb-6'
                    >
                        Dress for
                        <br />
                        the weather.
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className='text-ink-secondary text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10'
                    >
                        OJO reads the forecast, knows your wardrobe, and tells
                        you exactly what to wear — every single day.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className='flex flex-col sm:flex-row items-center justify-center gap-3'
                    >
                        <a
                            href={TESTFLIGHT_URL}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex items-center gap-2 btn-primary font-outfit font-semibold text-sm px-6 py-3.5 rounded-full hover:scale-105 transition-all duration-ojo'
                        >
                            <AppleGlyph size={16} />
                            Join the iOS Beta
                        </a>

                        <Link
                            href='/support'
                            className='flex items-center gap-2 glass text-ink-primary font-outfit font-medium text-sm px-6 py-3.5 rounded-full hover:glass-strong hover:scale-105 transition-all duration-ojo'
                        >
                            <MailIcon size={15} />
                            Contact Support
                        </Link>
                    </motion.div>

                    {/* App preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className='mt-20 flex justify-center'
                    >
                        <div className='relative'>
                            <Image
                                src='/framedimage.png'
                                alt='OJO app preview'
                                width={320}
                                height={640}
                                className='w-64 md:w-80 h-auto rounded-[44px] '
                                style={{
                                    backgroundClip: 'padding-box',
                                }}
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
                    </motion.div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section
                className='px-6 py-20'
                aria-labelledby='features-heading'
            >
                <div className='max-w-5xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className='text-center mb-14'
                    >
                        <p className='text-ink-primary text-xs font-semibold uppercase tracking-widest font-outfit mb-3'>
                            What OJO does
                        </p>
                        <h2
                            id='features-heading'
                            className='font-display text-3xl md:text-4xl text-ink-primary text-shadow'
                        >
                            Your wardrobe, weather-aware.
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, margin: '-60px' }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    >
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -4,
                                        transition: { duration: 0.2 },
                                    }}
                                    className='glass rounded-lg p-6 cursor-default group'
                                >
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
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── LEGAL / SUPPORT LINKS ── */}
            <section
                className='px-6 py-16'
                aria-labelledby='legal-heading'
            >
                <div className='max-w-3xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className='text-center mb-10'
                    >
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
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, margin: '-40px' }}
                        className='grid grid-cols-1 sm:grid-cols-2 gap-4'
                    >
                        {legalLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <motion.div
                                    key={link.href}
                                    variants={itemVariants}
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
                                            aria-hidden="true"
                                            className='text-ink-muted group-hover:text-ink-secondary group-hover:translate-x-0.5 transition-all duration-ojo flex-shrink-0'
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── CONTACT CTA ── */}
            <section className='px-6 pb-24'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className='max-w-2xl mx-auto glass-strong rounded-lg p-8 md:p-10 text-center'
                >
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
                </motion.div>
            </section>
        </div>
        </MotionConfig>
    );
}
