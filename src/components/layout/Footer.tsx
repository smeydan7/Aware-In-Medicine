import Link from 'next/link';
import { Mail, Heart, Stethoscope } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { primaryNav } from '@/config/navigation';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-cream-300/60 bg-cream-50">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand & mission */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-clay-400 text-cream-50 flex items-center justify-center shadow-soft group-hover:bg-clay-500 transition-colors">
              <Stethoscope className="w-[18px] h-[18px]" strokeWidth={2} aria-hidden />
            </span>
              <span className="font-serif text-xl text-ink">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-ink-soft max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-ink hover:text-clay-500 transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden />
              {siteConfig.contact.email}
            </a>
          </div>

          {/* Explore */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-soft hover:text-clay-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
              Follow along
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={siteConfig.social.tiktok.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-clay-500 transition-colors"
                >
                  TikTok {siteConfig.social.tiktok.handle}
                </a>
              </li>
              <li>
                <Link
                  href="/suggest"
                  className="text-ink-soft hover:text-clay-500 transition-colors"
                >
                  Suggest a topic
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 pt-8 border-t border-cream-200">
          <p className="text-xs text-ink-muted leading-relaxed max-w-3xl">
            {siteConfig.disclaimer}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-ink-muted">
            <p>
              © {year} {siteConfig.name}. A nonprofit educational initiative.
            </p>
            <p className="inline-flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 fill-clay-300 text-clay-300" aria-hidden /> for accessible health education.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
