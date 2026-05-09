import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SUPPORT_EMAIL, APP_NAME, FOOTER_LEGAL_LINKS } from '@/lib/constants';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className='glass-subtle border-t border-white/15 mt-24'>
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
                                className='rounded-xl'
                            />
                            <span className='font-outfit font-semibold text-white text-base'></span>
                        </div>
                        <p className='text-white/60 text-sm leading-relaxed'>
                            Your weather-aware outfit companion. Dress smarter,
                            every day.
                        </p>
                        <div className='mt-4 inline-flex items-center gap-2 glass rounded-full px-3 py-1.5'>
                            <span className='w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-slow' />
                            <span className='text-white/70 text-xs font-medium'>
                                Coming soon to App Store
                            </span>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <p className='text-white/50 text-xs font-semibold uppercase tracking-widest mb-3'>
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
                                        className='text-white/70 text-sm hover:text-white transition-colors'
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className='text-white/50 text-xs font-semibold uppercase tracking-widest mb-3'>
                            Contact
                        </p>
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className='flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors group'
                        >
                            <Mail
                                size={14}
                                className='group-hover:scale-110 transition-transform'
                            />
                            {SUPPORT_EMAIL}
                        </a>
                        <p className='text-white/45 text-xs mt-3 leading-relaxed'>
                            We typically respond within 24–48 hours on business
                            days.
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className='border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2'>
                    <p className='text-white/45 text-xs'>
                        © {year} {APP_NAME}. All rights reserved.
                    </p>
                    <p className='text-white/35 text-xs'>
                        Built with <span aria-hidden="true">☀</span> somewhere between sunny and partly cloudy.
                    </p>
                </div>
            </div>
        </footer>
    );
}
