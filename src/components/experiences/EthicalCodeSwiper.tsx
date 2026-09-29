'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ArrowUpRight, 
  ExternalLink,
  Compass
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DarkTourismSpot {
  num: string;
  shortName: string;
  name: string;
  location: string;
  slug: string;
  quoteText: string;
  image: string;
}

const darkTourismSpots: DarkTourismSpot[] = [
  {
    num: '01',
    shortName: 'Cellular Jail',
    name: 'The Cellular Jail (Kala Pani)',
    location: 'Port Blair, Andaman Islands',
    slug: 'cellular-jail',
    quoteText: 'Exile across black waters. Seven solitary wings radiating into the silence of the Andaman sea.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1800&q=85',
  },
  {
    num: '02',
    shortName: 'Kuldhara',
    name: 'Kuldhara Ghost Town',
    location: 'Jaisalmer, Thar Desert',
    slug: 'kuldhara-bhangarh',
    quoteText: 'Eighty-four villages abandoned overnight in 1825. Only the golden sandstone streets and desert wind remain.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85',
  },
  {
    num: '03',
    shortName: 'Jallianwala',
    name: 'Jallianwala Bagh',
    location: 'Amritsar, Punjab',
    slug: 'jallianwala-bagh',
    quoteText: 'Preserved bullet marks in red brick walls. A quiet walled garden of profound collective memory.',
    image: 'https://images.unsplash.com/photo-1609137144822-45e0545fe221?auto=format&fit=crop&w=1800&q=85',
  },
  {
    num: '04',
    shortName: 'Bhangarh',
    name: 'Bhangarh Fort Ramparts',
    location: 'Alwar, Rajasthan',
    slug: 'kuldhara-bhangarh',
    quoteText: 'A ruined 16th-century fortress city in the Aravallis. Where twilight brings absolute silence.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85',
  },
  {
    num: '05',
    shortName: 'Dhanushkodi',
    name: 'Dhanushkodi Lost Town',
    location: 'Rameswaram, Tamil Nadu',
    slug: 'dhanushkodi',
    quoteText: 'Swallowed by a midnight cyclone in 1964. Bleached gothic arches standing where two oceans meet.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1800&q=85',
  },
];

export function EthicalCodeSwiper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  // ScrollTrigger to tie page scroll to active card swipe
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = darkTourismSpots.length;
          const targetIndex = Math.min(
            totalCards - 1,
            Math.floor(progress * totalCards)
          );
          setActiveIndex(targetIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const goToCard = (index: number) => {
    const clamped = Math.max(0, Math.min(darkTourismSpots.length - 1, index));
    setActiveIndex(clamped);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = scrollTop + rect.top + (clamped / darkTourismSpots.length) * totalScrollable;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0 && activeIndex < darkTourismSpots.length - 1) {
        goToCard(activeIndex + 1);
      } else if (deltaX > 0 && activeIndex > 0) {
        goToCard(activeIndex - 1);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#0b0a08]"
      style={{ backgroundColor: '#0b0a08' }}
    >
      {/* Sticky Viewport Stage (pins on scroll) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(196,140,88,0.06),transparent_65%)]" />

        {/* Top Header & Navigation Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#26211c] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                The Historical Trails
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5efe6] leading-tight">
              Not a horror tour. <br className="hidden sm:inline" />
              <em className="italic text-[#c48c58] font-normal">A deeper kind of travel.</em>
            </h2>
          </div>

          {/* Interactive Navigation Pills & Arrows */}
          <div className="flex items-center gap-3">
            {/* Pill Tabs for direct jump with Spot Names */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#14120f] border border-[#26211c] p-1.5 rounded-full">
              {darkTourismSpots.map((spot, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={spot.num}
                    type="button"
                    onClick={() => goToCard(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-bronze text-[#0e0d0b] font-bold shadow-md'
                        : 'text-[#8a8174] hover:text-[#f5efe6] hover:bg-white/5'
                    }`}
                  >
                    <span>{spot.num}</span>
                    <span className="hidden md:inline">{spot.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToCard(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous spot"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? 'border-[#26211c] text-stone-600 opacity-40 cursor-not-allowed'
                    : 'border-[#2a241e] text-[#f5efe6] hover:bg-bronze hover:text-[#0e0d0b] hover:border-bronze cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goToCard(activeIndex + 1)}
                disabled={activeIndex === darkTourismSpots.length - 1}
                aria-label="Next spot"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  activeIndex === darkTourismSpots.length - 1
                    ? 'border-[#26211c] text-stone-600 opacity-40 cursor-not-allowed'
                    : 'border-[#2a241e] text-[#f5efe6] hover:bg-bronze hover:text-[#0e0d0b] hover:border-bronze cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Stage: Interactive Swiping Picture Cards */}
        <div
          className="relative z-10 max-w-5xl mx-auto w-full my-auto py-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Carousel Frame */}
          <div className="relative aspect-[16/11] sm:aspect-[16/9] md:aspect-[21/10] w-full">
            {darkTourismSpots.map((spot, idx) => {
              const offset = idx - activeIndex;
              const isCurrent = offset === 0;

              // 3D Stacking and slide transform coordinates
              const translateX = offset * 105;
              const scale = isCurrent ? 1 : Math.max(0.85, 1 - Math.abs(offset) * 0.08);
              const opacity = isCurrent ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.2);
              const pointerEvents = isCurrent ? 'auto' : 'none';

              return (
                <div
                  key={spot.num}
                  style={{
                    transform: `translate3d(${translateX}%, 0, 0) scale(${scale})`,
                    opacity,
                    pointerEvents,
                    borderColor: isCurrent ? 'rgba(196, 140, 88, 0.6)' : '#26211c',
                  }}
                  className="absolute inset-0 rounded-3xl border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-all duration-700 cubic-bezier(0.22,1,0.36,1) overflow-hidden group"
                >
                  {/* Spot Picture (Full-Bleed Background) */}
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Cinematic Dark Gradient Scrim for crystal clear text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/35" />
                  <div className="absolute inset-0 bg-radial-[circle_at_bottom_left] from-black/60 via-transparent to-transparent" />

                  {/* Card Content Overlay */}
                  <div className="relative h-full w-full p-6 sm:p-10 md:p-12 flex flex-col justify-between z-10">
                    {/* Top Meta Line: Number, Location & Tag */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-stone-200">
                        <MapPin className="w-3.5 h-3.5 text-bronze" />
                        <span className="font-semibold text-bronze">{spot.num}</span>
                        <span>/</span>
                        <span className="uppercase tracking-wider">{spot.location}</span>
                      </div>

                      <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-stone-300">
                        <Compass className="w-3.5 h-3.5 text-bronze" />
                        <span>Preserved Historical Trail</span>
                      </div>
                    </div>

                    {/* Bottom Spot Title & Evocative Text */}
                    <div className="space-y-3 sm:space-y-4 max-w-3xl">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
                          {spot.name}
                        </h3>
                      </div>

                      {/* Evocative Few Lines of Text on the Picture */}
                      <p className="text-sm sm:text-base md:text-lg text-stone-200/95 font-light leading-relaxed drop-shadow-sm max-w-2xl">
                        {spot.quoteText}
                      </p>

                      {/* Action CTA Button on the Picture */}
                      <div className="pt-2 sm:pt-3 flex items-center gap-4">
                        <Link
                          href={`/experiences/${spot.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bronze hover:bg-bronze/90 text-[#0e0d0b] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 group/btn"
                        >
                          <span>Explore This Trail</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>

                        <span className="hidden sm:inline font-mono text-xs text-stone-400">
                          Curated with archival guides
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Indicators */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {darkTourismSpots.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToCard(idx)}
                aria-label={`Jump to spot ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 h-1.5 bg-bronze'
                    : 'w-2 h-1.5 bg-[#2a241e] hover:bg-stone-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar & Link to All Experiences */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pt-4 border-t border-[#26211c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#8a8174]">
          <p>
            India’s first travel company that takes dark tourism into mainstream travel with dignity and research.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/experiences" className="text-[#c5bcb0] hover:text-white hover:underline flex items-center gap-1">
              <span>View all 8 historic trails</span>
              <ArrowUpRight className="w-3 h-3 text-bronze" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
