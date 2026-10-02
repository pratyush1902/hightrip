'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  Compass,
  Sparkles,
  User,
  Users,
  Landmark,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { FadeReveal } from '@/components/animation/FadeReveal';

interface SignatureCategoryData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  icon: typeof Briefcase;
  actionText: string;
}

// Six distinct travel categories curated for High Trip
const signatureCategories: SignatureCategoryData[] = [
  {
    slug: 'corporate-trips',
    category: 'Offsites & Retreats',
    title: 'Corporate Trips',
    subtitle: 'Curated executive retreats, leadership offsites, and incentive journeys with seamless logistics.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    href: '/contact',
    icon: Briefcase,
    actionText: 'Plan corporate retreat →',
  },
  {
    slug: 'custom-journeys',
    category: 'Bespoke & Tailored',
    title: 'Custom Journeys',
    subtitle: 'Private, end-to-end bespoke itineraries mapped from scratch around your personal cadence.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    href: '/enquire',
    icon: Compass,
    actionText: 'Design custom route →',
  },
  {
    slug: 'luxury-escapes',
    category: 'Sanctuaries & Villas',
    title: 'Luxury Escapes',
    subtitle: 'Overwater havens, cliffside private estates, and uncompromising five-star solitude.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    href: '/packages',
    icon: Sparkles,
    actionText: 'Explore luxury stays →',
  },
  {
    slug: 'solo-trips',
    category: 'Independent & Safe',
    title: 'Solo Trips',
    subtitle: 'Empowering solo odysseys with handpicked boutique stays, vetted guides, and complete peace of mind.',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
    href: '/packages',
    icon: User,
    actionText: 'Discover solo paths →',
  },
  {
    slug: 'group-tours',
    category: 'Fixed Departures',
    title: 'Group Tours',
    subtitle: 'Shared camaraderie, curated small-group departures, and expeditions led by seasoned experts.',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80',
    href: '/fixed-departures',
    icon: Users,
    actionText: 'View group departures →',
  },
  {
    slug: 'dark-tourism',
    category: 'Memorials & Heritage',
    title: 'Dark Tourism',
    subtitle: 'Abandoned settlements, historical memorials, and untold chapters visited with dignity and research.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    href: '/experiences',
    icon: Landmark,
    actionText: 'Explore dark tourism →',
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
            Pick a style of travel. We&apos;ll build the days, stays, and details around it.
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
            aria-label="Previous categories"
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
            aria-label="Next categories"
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
          {signatureCategories.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="group relative flex-shrink-0 snap-start w-[270px] sm:w-[310px] md:w-[330px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181512] border border-obsidian-border/80 hover:border-bronze/60 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Category Image with Subtle Hover Zoom */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 270px, (max-width: 768px) 310px, 330px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Smooth Dark Gradient for Typography Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Top Bar: Category Badge & Floating Arrow */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wide">
                    <Icon className="w-3.5 h-3.5 text-bronze" />
                    <span>{item.category}</span>
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
                      {item.actionText}
                    </span>
                    <span className="text-[11px] text-stone-400">High Trip</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
