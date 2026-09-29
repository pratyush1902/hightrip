'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { FadeReveal } from '@/components/animation/FadeReveal';

interface SignatureCardData {
  slug: string;
  location: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

// Curate signature highlights using destinations that already exist in the website
const signatureDestinations: SignatureCardData[] = [
  {
    slug: 'switzerland',
    location: 'Switzerland',
    title: 'Glacier Express & Alpine Summits',
    subtitle: 'Mustard-field meadows, mirror lakes, and Alpine trains',
    image:
      destinations.find((d) => d.slug === 'switzerland')?.heroImage ||
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/switzerland',
  },
  {
    slug: 'maldives',
    location: 'Maldives',
    title: 'Overwater Solitude & Coral Lagoons',
    subtitle: 'Wake up on the water in a private sunrise lagoon villa',
    image:
      destinations.find((d) => d.slug === 'maldives')?.heroImage ||
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/maldives',
  },
  {
    slug: 'vietnam',
    location: 'Vietnam',
    title: 'Karsts, Train Street & Lanterns',
    subtitle: 'Follow the water from Lan Ha Bay to lantern-lit Hoi An',
    image:
      destinations.find((d) => d.slug === 'vietnam')?.heroImage ||
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/vietnam',
  },
  {
    slug: 'italy',
    location: 'Italy',
    title: 'Amalfi Coast & Renaissance Antiquity',
    subtitle: 'Pastel cliffside villages, lemon groves, and Roman history',
    image:
      destinations.find((d) => d.slug === 'italy')?.heroImage ||
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/italy',
  },
  {
    slug: 'kerala',
    location: 'Kerala',
    title: 'Houseboats & Misty Tea Hills',
    subtitle: 'Teakwood houseboats drifting through tranquil emerald waters',
    image:
      destinations.find((d) => d.slug === 'kerala')?.heroImage ||
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/kerala',
  },
  {
    slug: 'bali',
    location: 'Bali',
    title: 'Temples, Terraces & Coastal Cliffs',
    subtitle: 'Silent rice terraces, sacred sea shrines, and ocean breaks',
    image:
      destinations.find((d) => d.slug === 'bali')?.heroImage ||
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/bali',
  },
  {
    slug: 'thailand',
    location: 'Thailand',
    title: 'Emerald Karsts & Gilded Temples',
    subtitle: 'Limestone sea needles, crystal bays, and twilight bazaars',
    image:
      destinations.find((d) => d.slug === 'thailand')?.heroImage ||
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/thailand',
  },
  {
    slug: 'andaman',
    location: 'Andaman Islands',
    title: 'Pristine Sands & Azure Lagoons',
    subtitle: 'Powder-white coral sands and glowing bioluminescent waters',
    image:
      destinations.find((d) => d.slug === 'andaman')?.heroImage ||
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/andaman',
  },
  {
    slug: 'dubai',
    location: 'Dubai',
    title: 'Dunes of Time & Futuristic Marvels',
    subtitle: 'Private desert stargazing camps and architectural wonders',
    image:
      destinations.find((d) => d.slug === 'dubai')?.heroImage ||
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/dubai',
  },
  {
    slug: 'singapore',
    location: 'Singapore',
    title: 'Cloud Forest & Luxury High Seas',
    subtitle: 'Futuristic biodomes and luxury ocean voyages',
    image:
      destinations.find((d) => d.slug === 'singapore')?.heroImage ||
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/singapore',
  },
];

export function OurSignature() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(320, el.clientWidth * 0.75);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-sandstone/30 border-y border-obsidian-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeReveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          {/* Centered Kicker flanked with lines */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="w-8 sm:w-12 h-[1px] bg-bronze/50 inline-block" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-bronze uppercase">
              OUR SIGNATURE
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-bronze/50 inline-block" />
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-bold tracking-tight">
            The Ones We&apos;re Known For.
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pick one. We&apos;ll build the days, stays and details around it.
          </p>
        </FadeReveal>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prev Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous signature destinations"
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-xl border border-stone-200/80 items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-stone-800" />
          </button>
        )}

        {/* Next Arrow Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next signature destinations"
            className="flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-xl border border-stone-200/80 items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-stone-800" />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 no-scrollbar focus:outline-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {signatureDestinations.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="group relative flex-shrink-0 snap-start w-[270px] sm:w-[310px] md:w-[330px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181512] border border-obsidian-border/80 hover:border-bronze/60 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Destination Image with Subtle Hover Zoom */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 270px, (max-width: 768px) 310px, 330px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Smooth Dark Gradient for Typography Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Top Bar: Location Badge & Floating Arrow */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wide">
                  <MapPin className="w-3 h-3 text-bronze" />
                  <span>{item.location}</span>
                </span>

                <div className="w-8 h-8 rounded-full bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-bronze group-hover:text-[#1c1917] group-hover:border-bronze transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white flex flex-col justify-end z-10">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug drop-shadow-md">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-stone-200/90 font-light line-clamp-2 leading-relaxed drop-shadow">
                  {item.subtitle}
                </p>

                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-stone-300">
                  <span className="text-bronze font-medium group-hover:text-amber-300 transition-colors">
                    Explore journey →
                  </span>
                  <span className="text-[11px] text-stone-400">High Trip</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
