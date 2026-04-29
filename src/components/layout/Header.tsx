'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { primaryNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle shadow when the page scrolls, to separate nav from content
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-cream-50/95 md:bg-cream-50/85 md:backdrop-blur-md border-b border-cream-300/60'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="site-container flex items-center justify-between h-16 md:h-20">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="w-9 h-9 rounded-full bg-clay-400 text-cream-50 flex items-center justify-center shadow-soft group-hover:bg-clay-500 transition-colors">
            <Stethoscope className="w-[18px] h-[18px]" strokeWidth={2} aria-hidden />
          </span>
          <span className="font-serif text-lg md:text-xl font-medium text-ink">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {primaryNav.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-full text-sm transition-colors',
                  active
                    ? 'text-clay-600 bg-clay-50'
                    : 'text-ink-soft hover:text-ink hover:bg-cream-200'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-ink hover:bg-cream-200 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bottom-0 bg-cream-50 transform transition-transform duration-300 ease-out overflow-y-auto',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="site-container py-8" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-4 rounded-2xl border transition-all',
                      active
                        ? 'border-clay-200 bg-clay-50 text-clay-700'
                        : 'border-cream-200 hover:border-clay-200 hover:bg-cream-100'
                    )}
                  >
                    <div className="font-serif text-xl">{item.label}</div>
                    {item.description && (
                      <div className="text-sm text-ink-muted mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 pt-6 border-t border-cream-200">
            <p className="text-sm text-ink-muted">Follow along</p>
            <a
              href={siteConfig.social.tiktok.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-ink hover:text-clay-500 font-medium"
            >
              {siteConfig.social.tiktok.handle} on TikTok →
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
