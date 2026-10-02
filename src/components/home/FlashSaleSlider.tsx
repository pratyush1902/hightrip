'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flame, 
  Check, 
  Calendar, 
  ArrowUpRight, 
  Users,
  ShieldCheck,
  Plane,
  AlertCircle
} from 'lucide-react';
import { InquiryModal } from '@/components/common/InquiryModal';

interface FlashOfferTour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  airportCode: string;
  duration: string;
  nights: number;
  originalPrice: number;
  flashPrice: number;
  savings: number;
  discountPercent: number;
  glowLabel: string;
  slotsLeft: number;
  image: string;
  departureDates: string;
  includesFlight: boolean;
  highlights: string[];
}

const flashOffers: FlashOfferTour[] = [
  {
    id: 'fo-maldives',
    slug: 'maldives-overwater-haven',
    title: 'Maldives Overwater Haven & Lagoon Drift',
    destination: 'South Malé Atoll, Maldives',
    airportCode: 'MLE',
    duration: '5 Days / 4 Nights',
    nights: 4,
    originalPrice: 79999,
    flashPrice: 64999,
    savings: 15000,
    discountPercent: 19,
    glowLabel: '⚡ FLASH SALE',
    slotsLeft: 3,
    image: 'https://images.unsplash.com/photo-1620065487644-1080510335f5?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Valid Oct 2026 - Jan 2027',
    includesFlight: false,
    highlights: [
      'Overwater Sunrise Villa with direct lagoon access',
      'All-inclusive breakfast, 3-course lunch & fine dinner',
      'Sunset dolphin cruise on traditional wooden Dhoni',
    ],
  },
  {
    id: 'fo-thailand',
    slug: 'thailand-fixed-departure-4n-phuket-krabi-with-flights',
    title: 'Phuket & Krabi Coastal Luxury Fixed Departure',
    destination: 'Phuket & Krabi, Thailand',
    airportCode: 'HKT',
    duration: '5 Days / 4 Nights',
    nights: 4,
    originalPrice: 58000,
    flashPrice: 42999,
    savings: 15001,
    discountPercent: 26,
    glowLabel: '⚡ LIMITED SLOTS',
    slotsLeft: 5,
    image: 'https://images.unsplash.com/photo-1493863438658-3e7743ac61cd?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Fixed Departures Every Friday',
    includesFlight: true,
    highlights: [
      'Return flights from Delhi / Mumbai included',
      '2N Phuket 4★ Resort + 2N Krabi Cliff Resort',
      'Phi Phi Islands speedboat tour with buffet lunch',
    ],
  },
  {
    id: 'fo-vietnam-group',
    slug: 'vietnam-group-departure-7-nights-8-days',
    title: 'Vietnam Grand Heritage & Ha Long Bay Cruise',
    destination: 'Hanoi, Ha Long & Hoi An, Vietnam',
    airportCode: 'HAN',
    duration: '8 Days / 7 Nights',
    nights: 7,
    originalPrice: 89999,
    flashPrice: 69999,
    savings: 20000,
    discountPercent: 22,
    glowLabel: '🔥 MEGA DEAL',
    slotsLeft: 2,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Guaranteed Group Departures',
    includesFlight: false,
    highlights: [
      'Overnight luxury cruise in Ha Long & Lan Ha Bay',
      'Bespoke lantern boat ride on Thu Bon River',
      'Golden Bridge in Ba Na Hills & Hanoi street food trail',
    ],
  },
  {
    id: 'fo-singapore-cruise',
    slug: 'singapore-cruise-getaway-5n-fixed-departure-flights-included',
    title: 'Singapore & Genting Dream Cruise Getaway',
    destination: 'Singapore & High Seas',
    airportCode: 'SIN',
    duration: '6 Days / 5 Nights',
    nights: 5,
    originalPrice: 78000,
    flashPrice: 62500,
    savings: 15500,
    discountPercent: 20,
    glowLabel: '⚡ CRUISE SPECIAL',
    slotsLeft: 3,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Departures Twice Monthly',
    includesFlight: true,
    highlights: [
      'Return international flights from India included',
      '2 Nights Genting Dream Cruise with all ocean meals',
      '3 Nights 4★ Singapore hotel + Gardens by the Bay',
    ],
  },
  {
    id: 'fo-amalfi',
    slug: 'amalfi-coast-renaissance-italy',
    title: 'Amalfi Coast & Capri Cliffside Haven',
    destination: 'Positano, Amalfi & Capri, Italy',
    airportCode: 'NAP',
    duration: '8 Days / 7 Nights',
    nights: 7,
    originalPrice: 245000,
    flashPrice: 185000,
    savings: 60000,
    discountPercent: 24,
    glowLabel: '🔥 RED HOT CLEARANCE',
    slotsLeft: 2,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Select Departures · Limited Availability',
    includesFlight: false,
    highlights: [
      'Private wooden boat charter to Capri with Blue Grotto swim',
      'Cliffside sea-view boutique hotel accommodation',
      'Private lemon grove tasting & Michelin-guided dinner',
    ],
  },
  {
    id: 'fo-spiti',
    slug: 'spiti-winter-fixed-departure-delhi',
    title: 'Spiti Valley Winter Road Trip (Delhi Fixed Departure)',
    destination: 'Spiti Valley, Himachal Pradesh',
    airportCode: 'DEL',
    duration: '8 Days / 7 Nights',
    nights: 7,
    originalPrice: 24800,
    flashPrice: 21800,
    savings: 3000,
    discountPercent: 12,
    glowLabel: '❄️ WINTER EXPEDITION',
    slotsLeft: 4,
    image: 'https://images.unsplash.com/photo-1653844573020-71f77a0ccb8c?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Fixed Departures Every Saturday (Oct 2026 - Mar 2027)',
    includesFlight: false,
    highlights: [
      'Delhi to Delhi circuit with AC Semi-Sleeper Volvo included',
      'Key Monastery, Chicham Bridge (Asia’s highest) & Hikkim',
      'Chitkul, Tabo Monastery (996 AD) & Kalpa Kinner Kailash view',
    ],
  },
  {
    id: 'fo-japan-sakura',
    slug: 'japan-cherry-blossom-special-with-flights-7n',
    title: 'Japan: Cherry Blossom Special Fixed Departure',
    destination: 'Tokyo, Kyoto, Osaka & Fuji, Japan',
    airportCode: 'HND',
    duration: '8 Days / 7 Nights',
    nights: 7,
    originalPrice: 275000,
    flashPrice: 254000,
    savings: 21000,
    discountPercent: 8,
    glowLabel: '🌸 SAKURA SPECIAL · FLIGHTS INCLUDED',
    slotsLeft: 3,
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1400&q=85',
    departureDates: 'Peak Sakura Departure (Ex-DEL/BOM/BLR)',
    includesFlight: true,
    highlights: [
      'Return international flights from India included',
      'Tokyo, Mount Fuji, Hakone Lake Cruise, Kyoto & Osaka',
      'Shinkansen Bullet Train experience & 4-Star stays',
    ],
  },
];

export function FlashSaleSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeInquiry, setActiveInquiry] = useState<{ title: string; destination: string } | null>(null);

  // Live Countdown Timer (Simulated active flash window)
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 18,
    minutes: 36,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 14, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update arrow states based on scroll position
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 560;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#0c0808] text-[#fbf9f5] border-y border-[#2a1313] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Dim-to-Bright Red Pill & Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            {/* Crisp Dim-to-Bright Red Flash Banner Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-5 border dim-bright-red">
              <span className="relative flex h-2.5 w-2.5">
                <span className="beacon-pulse inline-flex h-full w-full rounded-full bg-red-400"></span>
              </span>
              <span>The High Trip Edit</span>
              <span className="opacity-40">•</span>
              <span>Limited-Time Offers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              Exceptional Journeys.{' '}
              <br />
              <span className="inline-block italic font-light text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-500 pr-3 pb-1">
                Exceptional Rates.
              </span>
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Limited-time offers on selected journeys, stays and experiences.
            </p>
          </div>

          {/* Clean Red Countdown & Slider Arrows */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
            {/* Live Ticking Countdown Box in Red */}
            <div className="flex items-center gap-3 bg-[#170c0c] border border-red-900/80 rounded-2xl px-5 py-3.5">
              <Clock className="w-5 h-5 text-red-400 dim-bright-badge" />
              <div className="flex items-center gap-2.5 font-mono text-center">
                <div>
                  <span className="text-lg sm:text-xl font-bold text-red-400">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400">Days</span>
                </div>
                <span className="text-red-500 font-bold -mt-2 dim-bright-badge">:</span>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-red-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400">Hours</span>
                </div>
                <span className="text-red-500 font-bold -mt-2 dim-bright-badge">:</span>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-red-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400">Mins</span>
                </div>
                <span className="text-red-500 font-bold -mt-2 dim-bright-badge">:</span>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-red-400 dim-bright-badge">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400">Secs</span>
                </div>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous offers"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-red-900/80 bg-[#170c0c] text-stone-200 hover:border-red-500 hover:text-red-400 active:scale-95'
                    : 'border-stone-900 bg-[#100808] text-stone-700 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next offers"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-red-900/80 bg-[#170c0c] text-stone-200 hover:border-red-500 hover:text-red-400 active:scale-95'
                    : 'border-stone-900 bg-[#100808] text-stone-700 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Big Cards Horizontal Slider Track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {flashOffers.map((tour) => (
            <div
              key={tour.id}
              className="snap-start flex-none w-[88vw] sm:w-[500px] md:w-[540px] lg:w-[580px] rounded-3xl bg-[#140c0c] border border-[#2b1616] hover:border-red-500/80 transition-all duration-500 flex flex-col justify-between overflow-hidden group hover:shadow-2xl"
            >
              <div>
                {/* Big Photo & Crisp Dim-to-Bright Red Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 640px) 88vw, 580px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140c0c] via-black/35 to-black/25" />

                  {/* Top Dim-to-Bright Badges in Red */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
                    {/* Crisp Dim-to-Bright Offer Type Label */}
                    <span className="dim-bright-red px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border backdrop-blur-md">
                      {tour.glowLabel}
                    </span>

                    {/* Crisp Dim-to-Bright Savings Tag */}
                    <span className="dim-bright-badge px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-tight bg-red-950/85 text-red-200 border border-red-500 backdrop-blur-md">
                      SAVE ₹{tour.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Bottom Image Badges: Duration & Flights */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-stone-200">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      <span>{tour.duration}</span>
                    </span>

                    {tour.includesFlight && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/90 backdrop-blur-md border border-red-800 text-red-300 font-semibold">
                        <Plane className="w-3.5 h-3.5 text-red-400" />
                        <span>Return Flights Included</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Big Card Content Details */}
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Slots Remaining Urgency Bar in Red */}
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-red-300 bg-red-950/40 border border-red-900/60 px-4 py-2 rounded-xl">
                    <span className="flex items-center gap-2">
                      <span className="beacon-pulse inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                      <span>Only {tour.slotsLeft} slots remaining at this price</span>
                    </span>
                    <span className="text-[11px] text-stone-400 uppercase font-semibold">{tour.airportCode}</span>
                  </div>

                  {/* Title & Destination */}
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold mb-1.5">
                      {tour.destination}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-medium line-clamp-1 group-hover:text-red-200 transition-colors">
                      {tour.title}
                    </h3>
                  </div>

                  {/* Inclusions Highlights with Red Checkmarks */}
                  <div className="space-y-2.5 pt-2 border-t border-[#261414]">
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                        <Check className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Departure Dates Note */}
                  <div className="text-xs font-mono text-stone-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    <span>{tour.departureDates}</span>
                  </div>
                </div>
              </div>

              {/* Big Card Footer: Pricing & Dual CTA */}
              <div className="p-6 sm:p-8 pt-0 border-t border-[#261414] mt-2">
                <div className="flex items-baseline justify-between pt-5 pb-5">
                  <div>
                    <span className="text-sm text-stone-400 line-through font-mono">
                      ₹{tour.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-stone-400">Starting from</span>
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-red-400 tracking-tight">
                        ₹{tour.flashPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-mono text-stone-400">/ person</span>
                    </div>
                  </div>

                  <span className="dim-bright-badge text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-lg bg-red-950/80 text-red-300 border border-red-500/80">
                    {tour.discountPercent}% OFF
                  </span>
                </div>

                {/* Big Action Buttons */}
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setActiveInquiry({ title: tour.title, destination: tour.destination })}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm tracking-wide transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    <span>Claim Offer</span>
                  </button>

                  <Link
                    href={`/packages/${tour.slug}`}
                    className="w-full py-3.5 px-4 rounded-xl border border-red-950/80 hover:border-red-500/60 bg-[#1a0e0e] text-stone-200 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Itinerary</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-400" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-12 pt-8 border-t border-[#261414] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Guaranteed published rates · No hidden surcharges</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-red-400" />
            <span>Dedicated concierge coordinator for every booking</span>
          </div>
          <Link
            href="/packages"
            className="text-red-400 hover:text-red-300 flex items-center gap-1 underline underline-offset-4 font-sans font-medium"
          >
            <span>Browse all holiday packages</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Booking Inquiry Modal */}
      {activeInquiry && (
        <InquiryModal
          isOpen={!!activeInquiry}
          onClose={() => setActiveInquiry(null)}
          defaultDestination={activeInquiry.destination}
          defaultPackageTitle={`[FLASH OFFER] ${activeInquiry.title}`}
        />
      )}
    </section>
  );
}
