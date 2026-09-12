import Image from 'next/image';
import Link from 'next/link';
import { MailIcon } from '@/components/icons';
import { SUPPORT_EMAIL, APP_NAME, FOOTER_LEGAL_LINKS, TESTFLIGHT_URL } from '@/lib/constants';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className='glass-subtle border-t border-glass-border mt-24'>
            <div className='max-w-5xl mx-auto px-6 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-10'>
                    {/* Brand */}
                    <div>
                        <div className='flex items-center gap-2.5 mb-3'>
                            <Image
                                src='/Ojo_word_logo_White.png'
                                alt='OJO'
                                width={28}
                                height={28}
                                className='rounded-sm'
                            />
                            <span className='font-outfit font-semibold text-ink-primary text-base'></span>
                        </div>
                        <p className='text-ink-secondary text-sm leading-relaxed'>
                            Your weather-aware outfit companion. Dress smarter,
                            every day.
                        </p>
                        <a
                            href={TESTFLIGHT_URL}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-4 inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 hover:glass-strong transition-all duration-ojo'
                        >
                            <span className='w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-slow' />
                            <span className='text-ink-muted text-xs font-medium'>
                                iOS beta now on TestFlight
                            </span>
                        </a>
                    </div>

                    {/* Legal */}
                    <div>
                        <p className='text-ink-primary text-xs font-semibold uppercase tracking-widest mb-3'>
                            Legal
                        </p>
                        <ul
                            className='flex flex-col gap-2'
                            role='list'
                        >
                            {FOOTER_LEGAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className='text-ink-secondary text-sm hover:text-ink-primary transition-colors'
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className='text-ink-primary text-xs font-semibold uppercase tracking-widest mb-3'>
                            Contact
                        </p>
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className='flex items-center gap-2 text-ink-secondary text-sm hover:text-ink-primary transition-colors group'
                        >
                            <MailIcon
                                size={14}
                                className='group-hover:scale-110 transition-transform'
                            />
                            {SUPPORT_EMAIL}
                        </a>
                        <p className='text-ink-muted text-xs mt-3 leading-relaxed'>
                            We typically respond within 24–48 hours on business
                            days.
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className='border-t border-glass-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2'>
                    <p className='text-ink-muted text-xs'>
                        © {year} {APP_NAME}. All rights reserved.
                    </p>
                    <p className='text-ink-muted text-xs'>
                        Built with <span aria-hidden='true'>☀</span> somewhere
                        in the farms.
                    </p>
                </div>
            </div>
        </footer>
    );
}
