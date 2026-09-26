'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Send 
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { destinations } from '@/data/destinations';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && /^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterSubscribed(true);
      const text = `Hi High Trip Holidays, please subscribe me to your curated travel dispatches and updates: ${newsletterEmail.trim()}`;
      const url = `https://wa.me/919155566268?text=${encodeURIComponent(text)}`;
      if (typeof window !== 'undefined') {
        window.open(url, '_blank');
      }
    }
  };

  return (
    <footer className="bg-obsidian border-t border-obsidian-border text-parchment pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-obsidian-border">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo showTagline />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-3">
              A window to somewhere extraordinary. Thoughtfully planned international journeys, India escapes, and meaningful historical trails designed with care, transparency, and personal concierge guidance.
            </p>

            <div className="pt-2 text-xs font-mono text-muted-stone space-y-1">
              <div>High Trip Holidays Private Limited</div>
              <div>CIN: U79120BR2026PTC087611</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/hightrip.experiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-obsidian-surface border border-obsidian-border flex items-center justify-center text-muted-foreground hover:text-bronze-light hover:border-bronze transition-colors"
                aria-label="Follow High Trip on Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dhirendra-kashyap-8099211b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-obsidian-surface border border-obsidian-border flex items-center justify-center text-muted-foreground hover:text-bronze-light hover:border-bronze transition-colors"
                aria-label="Founder LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Featured Destinations */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              Destinations
            </span>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {destinations.slice(0, 6).map((dest) => (
                <li key={dest.slug}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="hover:text-parchment hover:underline flex items-center justify-between group"
                  >
                    <span>{dest.name}</span>
                    <span className="text-[11px] font-mono text-muted-stone group-hover:text-bronze">
                      {dest.airportCode}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/destinations"
                  className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore all destinations</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Policy */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              Exploration
            </span>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/packages" className="hover:text-parchment transition-colors">
                  All Packages
                </Link>
              </li>
              <li>
                <Link href="/fixed-departures" className="hover:text-parchment transition-colors flex items-center gap-1.5">
                  <span>Fixed Departures</span>
                  <span className="text-[10px] font-mono bg-[#c48c58]/20 text-[#c48c58] px-1.5 py-0.5 rounded">
                    Group
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-parchment transition-colors">
                  Experiences & Trails
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-parchment transition-colors">
                  About Our Craft
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-parchment transition-colors">
                  Travel Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-parchment transition-colors">
                  Contact & Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Direct Line */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              The Dispatch
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Curated dispatches on secret travel windows, visa policy updates, and newly unlocked itineraries. No spam, only quiet travel thoughts.
            </p>

            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-obsidian-surface border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-md bg-bronze/20 text-bronze hover:bg-bronze hover:text-obsidian transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-lg bg-obsidian-surface border border-bronze/30 text-xs text-sand flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-bronze" />
                <span>You are on our private dispatch list.</span>
              </div>
            )}

            {/* Direct Phone & Email info */}
            <div className="pt-2 border-t border-obsidian-border text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-bronze" />
                <a href="tel:+919155566268" className="hover:text-parchment">
                  +91 91555 66268
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-bronze" />
                <a href="mailto:sales@hightripholidays.in" className="hover:text-parchment">
                  sales@hightripholidays.in
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                <span>Basma Complex, Sampatchak, Patna, Bihar 800020</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-stone font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bronze-light" />
            <span>© {new Date().getFullYear()} High Trip Holidays Pvt. Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-sand transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-sand transition-colors">
              Terms of Booking
            </Link>
            <Link href="/cancellation-policy" className="hover:text-sand transition-colors">
              Cancellation & Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
