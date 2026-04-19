import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import { siteConfig } from '@/config/site';
import './globals.css';

/**
 * Typography: friendly serif (Fraunces) for headings + clean sans (Inter) for body.
 * next/font self-hosts these with zero layout shift.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-cream-50 focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Chatbot renders itself as null if the feature flag is off. */}
        <ChatbotWidget />
      </body>
    </html>
  );
}
