'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { APP_NAME, NAV_LINKS } from '@/lib/constants';

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? 'glass-strong shadow-sm' : 'bg-transparent'
            }`}
        >
            <nav
                className='max-w-5xl mx-auto px-6 h-16 flex items-center justify-between'
                aria-label='Main navigation'
            >
                {/* Logo */}
                <Link
                    href='/'
                    className='flex items-center gap-2.5 group'
                    aria-label='OJO Home'
                >
                    <Image
                        src='/Ojo_word_logo_White.png'
                        alt='OJO'
                        width={40}
                        height={40}
                        className='group-hover:scale-105 transition-transform'
                    />
                    <span className='font-outfit font-semibold text-white text-lg tracking-tight'></span>
                </Link>

                {/* Desktop links */}
                <ul
                    className='hidden md:flex items-center gap-1'
                    role='list'
                >
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        active
                                            ? 'glass text-white'
                                            : 'text-white hover:glass'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile menu toggle */}
                <button
                    className='md:hidden glass rounded-full p-2 text-white min-w-[44px] min-h-[44px] flex items-center justify-center'
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="mobile-nav-menu"
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </nav>

            {/* Mobile drawer — id matches aria-controls on the toggle button */}
            {open && (
                <div
                    id="mobile-nav-menu"
                    className='md:hidden glass-strong border-t border-white/20 px-6 py-4'
                    role="navigation"
                    aria-label="Mobile navigation"
                >
                    <ul
                        className='flex flex-col gap-1'
                        role='list'
                    >
                        {NAV_LINKS.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            active
                                                ? 'glass text-white'
                                                : 'text-white hover:glass'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </header>
    );
}
