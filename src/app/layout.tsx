import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomActionBar } from '@/components/layout/BottomActionBar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fbf9f5',
};

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'High Trip Holidays | A window to somewhere extraordinary',
    template: '%s | High Trip Holidays',
  },
  description:
    'Find your next view with High Trip Holidays. Thoughtfully planned international holidays, India escapes, fixed departures, and meaningful dark-tourism experiences.',
  keywords: [
    'luxury travel',
    'High Trip Holidays',
    'Maldives overwater villa',
    'Vietnam tours',
    'Amalfi coast trips',
    'Swiss Alps rail holiday',
    'Kerala backwaters',
    'dark tourism',
    'fixed departures',
  ],
  authors: [{ name: 'High Trip Holidays Private Limited' }],
  metadataBase: new URL('https://hightripholidays.in'),
  openGraph: {
    title: 'High Trip Holidays | A window to somewhere extraordinary',
    description:
      'Find your next view with High Trip Holidays. Thoughtfully planned international holidays, India escapes, and meaningful dark-tourism experiences.',
    url: 'https://hightripholidays.in',
    siteName: 'High Trip Holidays',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Trip Holidays | A window to somewhere extraordinary',
    description:
      'Find your next view with High Trip Holidays. Thoughtfully planned international holidays, India escapes, and meaningful dark-tourism experiences.',
  },
  icons: {
    icon: '/brand/mark.svg',
    shortcut: '/brand/mark.svg',
    apple: '/brand/mark.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'High Trip Holidays',
              legalName: 'High Trip Holidays Private Limited',
              slogan: 'Travel. Explore. Experience.',
              url: 'https://hightripholidays.in/',
              telephone: '+919155566268',
              email: 'sales@hightripholidays.in',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Basma Complex, Flat C-403, West Lohianagar, Sampatchak',
                addressLocality: 'Patna',
                addressRegion: 'Bihar',
                postalCode: '800020',
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-obsidian text-parchment font-sans flex flex-col selection:bg-bronze selection:text-obsidian">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BottomActionBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
