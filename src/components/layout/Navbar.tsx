'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Compass, 
  Menu, 
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { destinations } from '@/data/destinations';
import { InquiryModal } from '@/components/common/InquiryModal';
import { MobileSheet } from '@/components/layout/MobileSheet';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isDarkPage = pathname.startsWith('/experiences');

  const navTextColor = isDarkPage
    ? 'text-[#e6dfd5] hover:text-[#c48c58]'
    : 'text-[#1c1917] hover:text-[#c48c58]';
  const iconTextColor = isDarkPage
    ? 'text-[#e6dfd5] hover:text-[#c48c58] hover:bg-white/10'
    : 'text-[#1c1917] hover:text-[#c48c58] hover:bg-black/5';
  const waBtnClass = isDarkPage
    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
    : 'bg-emerald-900/10 text-emerald-800 border-emerald-700/25 hover:bg-emerald-900/15';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkPage
              ? 'bg-[#0e0d0b]/92 backdrop-blur-md border-b border-[#2e2822] py-3 shadow-lg'
              : 'bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#e8ded0] py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <BrandLogo variant={isDarkPage ? 'light' : 'dark'} />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
              {/* Holidays Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className={`px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md cursor-pointer ${
                    pathname.startsWith('/packages')
                      ? 'text-bronze-light'
                      : navTextColor
                  }`}
                  aria-expanded={megaOpen}
                >
                  <span>Holidays</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      megaOpen ? 'rotate-180 text-bronze' : 'text-muted-stone'
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                {megaOpen && (
                  <div className="absolute top-full -left-20 w-[640px] pt-2 animate-fade-in">
                    <div className="bg-obsidian-surface border border-obsidian-border rounded-xl shadow-2xl p-6 grid grid-cols-12 gap-6 text-parchment">
                      {/* Left: Holiday Types */}
                      <div className="col-span-5 border-r border-obsidian-border pr-5 space-y-4">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-stone block">
                          Curated Collections
                        </span>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Link
                              href="/packages?type=international"
                              className="group block p-2 rounded-lg hover:bg-obsidian transition-colors"
                            >
                              <div className="font-medium text-parchment group-hover:text-bronze-light">
                                International Escapes
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Island villas, European rail & scenic coasts
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/packages?type=india"
                              className="group block p-2 rounded-lg hover:bg-obsidian transition-colors"
                            >
                              <div className="font-medium text-parchment group-hover:text-bronze-light">
                                India Journeys
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Kerala backwaters & Andaman pristine coral
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/fixed-departures"
                              className="group block p-2 rounded-lg hover:bg-obsidian transition-colors"
                            >
                              <div className="font-medium text-parchment group-hover:text-bronze-light flex items-center gap-1.5">
                                <span>Fixed Departures</span>
                                <span className="text-[10px] font-mono bg-bronze/20 text-bronze px-1.5 py-0.5 rounded">
                                  6 Group Trips
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Set dates, published prices with flights
                              </div>
                            </Link>
                          </li>
                        </ul>

                        <div className="pt-2">
                          <Link
                            href="/packages"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-bronze hover:underline"
                          >
                            <span>Browse all packages</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Featured Destinations with mini cards */}
                      <div className="col-span-7 space-y-3">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-stone block">
                          Popular Destinations
                        </span>
                        <div className="grid grid-cols-2 gap-2.5">
                          {destinations.slice(0, 4).map((dest) => (
                            <Link
                              key={dest.slug}
                              href={`/destinations/${dest.slug}`}
                              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-obsidian transition-colors group"
                            >
                              <div className="relative w-11 h-11 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={dest.cardImage}
                                  alt={dest.name}
                                  fill
                                  sizes="44px"
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-parchment group-hover:text-bronze-light truncate flex items-center gap-1">
                                  <span>{dest.name}</span>
                                  <span className="text-[9px] font-mono text-muted-stone">
                                    {dest.airportCode}
                                  </span>
                                </div>
                                <div className="text-[11px] font-mono text-bronze">
                                  From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-obsidian-border flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Looking for custom routing?</span>
                          <button
                            onClick={() => setInquiryOpen(true)}
                            className="text-bronze-light hover:underline font-medium cursor-pointer"
                          >
                            Custom Plan →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Destinations */}
              <Link
                href="/destinations"
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname.startsWith('/destinations')
                    ? 'text-bronze-light'
                    : navTextColor
                }`}
              >
                Destinations
              </Link>

              {/* Experiences */}
              <Link
                href="/experiences"
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 ${
                  pathname.startsWith('/experiences')
                    ? 'text-bronze-light'
                    : navTextColor
                }`}
              >
                <span>Experiences</span>
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              </Link>

              {/* About */}
              <Link
                href="/about"
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === '/about'
                    ? 'text-bronze-light'
                    : navTextColor
                }`}
              >
                About
              </Link>

              {/* Journal */}
              <Link
                href="/blog"
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname.startsWith('/blog')
                    ? 'text-bronze-light'
                    : navTextColor
                }`}
              >
                Journal
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === '/contact'
                    ? 'text-bronze-light'
                    : navTextColor
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Action Tools & CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone quick call */}
              <a
                href="tel:+919155566268"
                className={`p-2 rounded-full border border-transparent transition-colors ${iconTextColor}`}
                title="Call Concierge: +91 91555 66268"
                aria-label="Call +91 91555 66268"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* WhatsApp direct chat */}
              <a
                href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20planning%20a%20holiday."
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${waBtnClass}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Plan Trip / Inquire Modal Button */}
              <button
                onClick={() => setInquiryOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-bronze-gradient text-obsidian tracking-wide hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Mobile Header Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setInquiryOpen(true)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-bronze-gradient text-obsidian"
              >
                Enquire
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkPage
                    ? 'text-[#e6dfd5] hover:text-white hover:bg-white/10'
                    : 'text-sand hover:text-parchment hover:bg-obsidian-surface'
                }`}
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sheet */}
      <MobileSheet
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenInquiry={() => {
          setMobileOpen(false);
          setInquiryOpen(true);
        }}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
