'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  MapPin, 
  ArrowRight, 
  Phone, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { travelPackages } from '@/data/packages';
import { InquiryModal } from '@/components/common/InquiryModal';

const fixedDeparturePackages = travelPackages.filter(p => p.type === 'fixed-departure');

// Legend route breakdown for each fixed departure to match exact content
const routeMap: Record<string, string[]> = {
  'phu-quoc-island-escape-all-inclusive-vietnam-direct-flight': ['Phu Quoc'],
  'vietnam-group-departure-7-nights-8-days': ['Hoi An', 'Da Nang', 'Hanoi', 'Ha Long Bay'],
  'thailand-fixed-departure-4n-phuket-krabi-with-flights': ['Phuket', 'Krabi'],
  'singapore-cruise-getaway-5n-fixed-departure-flights-included': ['Genting Highlands', 'Sentosa'],
  'vietnam-4-nights-central-vietnam-coastal-bliss': ['Da Nang', 'Hoi An'],
  'all-in-thailand-8-nights-across-bangkok-pattaya-phuket-krabi': ['Bangkok', 'Pattaya', 'Phuket', 'Krabi'],
};

export function FixedDeparturesListing() {
  const [selectedPlace, setSelectedPlace] = useState<'all' | 'vietnam' | 'thailand' | 'singapore'>('all');
  const [selectedLength, setSelectedLength] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [inquiryPackage, setInquiryPackage] = useState<string | null>(null);

  const toggleSave = (slug: string, title: string) => {
    if (savedSlugs.includes(slug)) {
      setSavedSlugs(savedSlugs.filter(s => s !== slug));
      setToastMessage('Removed from your shortlist');
    } else {
      setSavedSlugs([...savedSlugs, slug]);
      setToastMessage(`Saved "${title.slice(0, 30)}..." to your shortlist`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredHolidays = useMemo(() => {
    return fixedDeparturePackages.filter(pkg => {
      // Place filter
      if (selectedPlace !== 'all' && pkg.destinationSlug !== selectedPlace) {
        return false;
      }
      // Length filter
      if (selectedLength === 'short' && (pkg.durationNights < 3 || pkg.durationNights > 4)) return false;
      if (selectedLength === 'medium' && (pkg.durationNights < 5 || pkg.durationNights > 6)) return false;
      if (selectedLength === 'long' && pkg.durationNights < 7) return false;

      return true;
    });
  }, [selectedPlace, selectedLength]);

  const placeCounts = useMemo(() => {
    return {
      all: fixedDeparturePackages.length,
      vietnam: fixedDeparturePackages.filter(p => p.destinationSlug === 'vietnam').length,
      thailand: fixedDeparturePackages.filter(p => p.destinationSlug === 'thailand').length,
      singapore: fixedDeparturePackages.filter(p => p.destinationSlug === 'singapore').length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-parchment">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-obsidian-surface border border-[#c48c58]/40 shadow-2xl px-4 py-3 rounded-xl animate-fade-in text-sm text-parchment">
          <CheckCircle2 className="w-4 h-4 text-[#c48c58] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-obsidian-border bg-gradient-to-b from-obsidian via-obsidian-surface/30 to-obsidian">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="font-mono text-xs text-muted-foreground mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-parchment transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#c48c58]">Fixed departures</span>
          </nav>

          <div className="max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c48c58] block mb-3 font-semibold">
              Fixed departures
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-parchment leading-[1.08] tracking-tight">
              Set dates.{' '}
              <em className="italic text-[#c48c58] font-normal">A group to go with.</em>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-sans">
              Dated group trips, most with flights. Departure dates are printed as published.
            </p>

            {/* Proof line */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground border-y border-obsidian-border/80 py-3.5">
              <span className="flex items-center gap-1.5 text-parchment font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c48c58]" />
                6 published holidays
              </span>
              <span>·</span>
              <span>3 places</span>
              <span>·</span>
              <span className="text-[#c48c58]">from ₹19,999 per person</span>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20fixed%20departures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#c48c58] text-white font-medium text-sm hover:bg-[#b57d4a] transition-all shadow-md cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                </svg>
                <span>Plan this journey</span>
              </a>

              <a
                href="tel:+919155566268"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-obsidian-border bg-obsidian-surface text-parchment text-sm font-medium hover:bg-obsidian-surface/80 hover:border-sand/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c48c58]" />
                <span>Call us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Filters & Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-5 sm:p-6 mb-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Place Filters */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block">
                Place
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All', count: placeCounts.all },
                  { id: 'vietnam', label: 'Vietnam', count: placeCounts.vietnam },
                  { id: 'singapore', label: 'Singapore', count: placeCounts.singapore },
                  { id: 'thailand', label: 'Thailand', count: placeCounts.thailand },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPlace(item.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedPlace === item.id
                        ? 'bg-[#c48c58] text-white font-medium shadow-sm'
                        : 'bg-obsidian text-muted-foreground hover:text-parchment border border-obsidian-border'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] opacity-75">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Length Filters */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block">
                Length
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'short', label: '3 to 4 nights' },
                  { id: 'medium', label: '5 to 6 nights' },
                  { id: 'long', label: '7 nights and more' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLength(item.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      selectedLength === item.id
                        ? 'bg-[#c48c58] text-white font-medium shadow-sm'
                        : 'bg-obsidian text-muted-foreground hover:text-parchment border border-obsidian-border'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Counter */}
          <div className="font-mono text-xs text-muted-foreground pt-4 md:pt-0 border-t md:border-t-0 border-obsidian-border">
            <span className="text-parchment font-semibold">{filteredHolidays.length}</span> of {fixedDeparturePackages.length} holidays
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-parchment">
            Fixed departures
          </h2>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            Group trips on set dates, with the dates published. {fixedDeparturePackages.length} published.
          </p>
        </div>

        {/* Holiday Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHolidays.map((holiday) => {
            const routes = routeMap[holiday.slug] || [holiday.destinationName];
            const isSaved = savedSlugs.includes(holiday.slug);

            return (
              <article
                key={holiday.slug}
                className="group flex flex-col bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-[#c48c58]/40 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Photo & Badges */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian">
                  <Image
                    src={holiday.cardImage}
                    alt={holiday.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#c48c58] px-2.5 py-1 rounded-md border border-white/10 font-medium">
                      Fixed departure
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-black/70 backdrop-blur-md text-parchment px-2.5 py-1 rounded-md border border-white/10">
                      {holiday.durationNights} nights
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleSave(holiday.slug, holiday.title)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-parchment hover:text-[#c48c58] transition-colors border border-white/10 cursor-pointer"
                    title={isSaved ? 'Saved to shortlist' : 'Save to shortlist'}
                    aria-label={`Save ${holiday.title} to shortlist`}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-[#c48c58]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  {/* Route Legend Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {routes.map((place, idx) => (
                      <span
                        key={place}
                        className="font-mono text-[11px] bg-black/60 backdrop-blur-sm text-sand px-2 py-0.5 rounded text-white/90"
                      >
                        {place}
                        {idx < routes.length - 1 && <span className="opacity-40 ml-1.5">→</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-parchment group-hover:text-[#c48c58] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/packages/${holiday.slug}`}>
                        {holiday.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {holiday.overview}
                    </p>
                  </div>

                  {/* Price & Footer */}
                  <div className="pt-4 border-t border-obsidian-border/80 flex items-end justify-between">
                    <div>
                      <div className="font-serif text-2xl text-parchment font-semibold">
                        ₹{holiday.priceINR.toLocaleString('en-IN')}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        per person · valid to {holiday.priceValidUntil}
                      </div>
                    </div>

                    <Link
                      href={`/packages/${holiday.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c48c58] hover:underline font-semibold pb-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Note / Disclaimer */}
        <div className="mt-12 p-5 rounded-xl border border-obsidian-border bg-obsidian-surface/60 text-xs text-muted-foreground leading-relaxed font-sans">
          <p>
            Last published price per person. Fares, stays and taxes change; ask for today’s price.{' '}
            Overseas packages also carry GST and tax collected at source: see{' '}
            <Link href="/terms" className="text-[#c48c58] hover:underline">visas, tax and entry rules</Link>.
          </p>
        </div>
      </section>

      {/* Ask / Consultation Section */}
      <section className="py-20 border-t border-obsidian-border bg-obsidian-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c48c58] block">
                Today’s price, after the calls
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment leading-tight">
                Not here?{' '}
                <em className="italic text-[#c48c58] font-normal">Ask for it.</em>
              </h2>
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                Tell us where, when and how many. We reply with a plan and today’s price, usually within the hour in India business hours.
              </p>
            </div>

            {/* Right CTAs */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20fixed%20departures.%20Where%2C%20when%20and%20how%20many%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#c48c58] text-white font-medium text-sm hover:bg-[#b57d4a] transition-all shadow-md cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                </svg>
                <span>WhatsApp +91 91555 66268</span>
              </a>

              <a
                href="tel:+919155566268"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-obsidian-border bg-obsidian-surface text-parchment text-sm font-medium hover:border-sand/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c48c58]" />
                <span>Call +91 91555 66268</span>
              </a>

              <div className="flex items-center justify-between px-2 pt-2 text-xs font-mono text-muted-foreground">
                <button
                  onClick={() => setInquiryPackage('Custom Fixed Departure Plan')}
                  className="text-parchment hover:text-[#c48c58] hover:underline cursor-pointer"
                >
                  Send an enquiry →
                </button>
                <a
                  href="mailto:sales@hightripholidays.in"
                  className="text-parchment hover:text-[#c48c58] hover:underline"
                >
                  sales@hightripholidays.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {inquiryPackage && (
        <InquiryModal
          isOpen={true}
          defaultPackageTitle={inquiryPackage}
          onClose={() => setInquiryPackage(null)}
        />
      )}
    </div>
  );
}
