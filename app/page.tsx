'use client';

import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import {
    Cloud,
    Shirt,
    Layers,
    History,
    FolderOpen,
    Sparkles,
    Plane,
    Navigation,
    Fingerprint,
    BarChart3,
    Bell,
    LayoutGrid,
    CalendarCheck,
    Search,
    ChevronRight,
    Mail,
    ShieldCheck,
    FileText,
    Trash2,
    HeadphonesIcon,
} from 'lucide-react';
import { SUPPORT_EMAIL, TESTFLIGHT_URL } from '@/lib/constants';

const features = [
    {
        icon: Sparkles,
        title: 'Smart outfit suggestions',
        description:
            "OJO scores every outfit across fabric, color harmony, formality, and your personal style, then matches it to today's forecast — temperature, feels-like, humidity, wind — using clothes you actually own. Switch occasions (Work, Date, Outdoor) and it re-ranks instantly.",
    },
    {
        icon: Cloud,
        title: 'Live weather integration',
        description:
            "Powered by Apple WeatherKit's real-time data. OJO knows when the morning is cold but the afternoon warms up, and layers accordingly.",
    },
    {
        icon: Shirt,
        title: 'Your closet, organized',
        description:
            "Add clothing by type, color, and fabric — or just snap a photo and OJO's on-device ML identifies the garment. Your images never leave your phone during recognition.",
    },
    {
        icon: Layers,
        title: 'Layering intelligence',
        description:
            'On days with big temperature swings, OJO flags exactly which layers you can shed mid-day — with confidence scores and timing.',
    },
    {
        icon: Fingerprint,
        title: 'Style that learns you',
        description:
            'The more outfits you log, the sharper OJO gets. It builds a Style DNA — your signature colors and go-to fabrics — and shifts recommendations toward what is genuinely you.',
    },
    {
        icon: BarChart3,
        title: 'Wardrobe Insights',
        description:
            "See how much of your closet you actually wear, cost-per-wear for every item, your total wardrobe value, and which pieces are 'sleeping' — then queue them for donation in a tap.",
    },
    {
        icon: FolderOpen,
        title: 'Multiple closets',
        description:
            'Seasonal wardrobes, travel packing, work vs. weekend — keep them separated and switch your preferred closet anytime.',
    },
    {
        icon: History,
        title: 'Outfit history',
        description:
            "Track what you've worn and when. OJO avoids repeats, surfaces fresh combinations, and syncs across devices so your history survives a reinstall — share any look in a tap.",
    },
    {
        icon: Plane,
        title: 'TripFit packing plans',
        description:
            "Heading somewhere? Add a destination and dates, and TripFit builds a day-by-day outfit plan plus a grouped packing list from the forecast where you're going.",
    },
    {
        icon: Navigation,
        title: 'Trip Mode',
        description:
            'Once you arrive, Trip Mode keeps your plan live — re-suggesting outfits on the fly when the local weather throws you a curveball.',
    },
    {
        icon: Bell,
        title: 'Daily brief & alerts',
        description:
            'Wake up to a morning outfit brief, and get a heads-up when the forecast shifts, when the day holds a big temperature swing, or when your closet is missing a staple — every alert is yours to switch on or off.',
    },
    {
        icon: LayoutGrid,
        title: 'Home & lock screen widgets',
        description:
            "Today's Outfit, Tomorrow Prep, Layer Timeline, Trip Countdown, and UV & Sunset — five widgets that put the day's call on your home screen. Tap to change your fit without opening the app.",
    },
    {
        icon: CalendarCheck,
        title: 'Weekly wardrobe recap',
        description:
            'Every week OJO hands you a short read on how you actually dressed — your standout colors, the comebacks, and the pieces still sleeping in the back of the closet.',
    },
    {
        icon: Search,
        title: 'Wardrobe gap detection',
        description:
            "OJO notices what your closet is missing for the weather you actually live in — no rain layer, nothing warm enough for next week — and tells you before you're caught out.",
    },
];

const legalLinks = [
    {
        icon: ShieldCheck,
        label: 'Privacy Policy',
        href: '/privacy',
        desc: 'How we handle your data',
    },
    {
        icon: FileText,
        label: 'Terms of Service',
        href: '/terms',
        desc: 'Rules of the road',
    },
    {
        icon: Trash2,
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
                            className='rounded-[28px] shadow-xl animate-float'
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
                        className='font-outfit font-extrabold text-5xl md:text-7xl text-white text-shadow leading-[1.05] mb-6'
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
                        className='text-white text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 font-dm'
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
                            className='group flex items-center gap-2 bg-white text-teal-600 font-outfit font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200'
                        >
                            <svg
                                viewBox='0 0 24 24'
                                className='w-4 h-4 fill-current'
                                aria-hidden="true"
                            >
                                <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                            </svg>
                            Join the iOS Beta
                        </a>

                        <Link
                            href='/support'
                            className='flex items-center gap-2 glass text-white font-outfit font-medium text-sm px-6 py-3.5 rounded-full hover:glass-strong hover:scale-105 transition-all duration-200'
                        >
                            <Mail size={15} />
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
                        <p className='text-white text-xs font-semibold uppercase tracking-widest font-outfit mb-3'>
                            What OJO does
                        </p>
                        <h2
                            id='features-heading'
                            className='font-outfit font-bold text-3xl md:text-4xl text-white text-shadow'
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
                                    className='glass rounded-3xl p-6 cursor-default group'
                                >
                                    <div className='w-10 h-10 rounded-2xl glass-strong flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200'>
                                        <Icon
                                            size={18}
                                            className='text-white'
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                    <h3 className='font-outfit font-semibold text-white text-base mb-2'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-white text-sm leading-relaxed font-dm'>
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
                            className='font-outfit font-bold text-2xl md:text-3xl text-white text-shadow mb-2'
                        >
                            Transparency & support
                        </h2>
                        <p className='text-white text-sm font-dm'>
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
                                        className='group flex items-center gap-4 glass rounded-2xl px-5 py-4 hover:glass-strong transition-all duration-200 hover:scale-[1.02]'
                                    >
                                        <div className='w-9 h-9 rounded-xl glass-strong flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200'>
                                            <Icon
                                                size={16}
                                                className='text-white'
                                                strokeWidth={1.8}
                                            />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-outfit font-semibold text-white text-sm'>
                                                {link.label}
                                            </p>
                                            <p className='text-white text-xs font-dm'>
                                                {link.desc}
                                            </p>
                                        </div>
                                        <ChevronRight
                                            size={16}
                                            aria-hidden="true"
                                            className='text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0'
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
                    className='max-w-2xl mx-auto glass-strong rounded-3xl p-8 md:p-10 text-center'
                >
                    <p className='text-white text-xs font-semibold uppercase tracking-widest font-outfit mb-3'>
                        Questions?
                    </p>
                    <h2 className='font-outfit font-bold text-2xl text-white mb-3'>
                        We'd love to hear from you.
                    </h2>
                    <p className='text-white text-sm font-dm mb-6 leading-relaxed'>
                        Reach out with feedback, bug reports, or anything on
                        your mind. We respond within 48 hours.
                    </p>
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='inline-flex items-center gap-2 bg-white text-teal-600 font-outfit font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200'
                    >
                        <Mail size={15} />
                        {SUPPORT_EMAIL}
                    </a>
                </motion.div>
            </section>
        </div>
        </MotionConfig>
    );
}
