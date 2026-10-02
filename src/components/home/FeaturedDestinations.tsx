'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { SectionHeader } from '@/components/common/SectionHeader';

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      const amount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-12 sm:py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <SectionHeader
          kicker="The view is only the beginning"
          title="The world looks"
          accent="different from here."
          subtitle="Choose your destination. We’ll take care of the journey."
          actionText="Explore all destinations"
          actionHref="/destinations"
        />

        {/* Mobile & Tablet Slider Navigation Buttons */}
        <div className="flex md:hidden items-center gap-2.5 self-end -mt-4 mb-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous destination"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'border-bronze text-bronze bg-sandstone hover:bg-bronze hover:text-obsidian'
                : 'border-obsidian-border text-muted-stone opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next destination"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              canScrollRight
                ? 'border-bronze text-bronze bg-sandstone hover:bg-bronze hover:text-obsidian'
                : 'border-obsidian-border text-muted-stone opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Touch-Friendly Responsive Horizontal Slider Track (Mobile) / Grid (Desktop) */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 md:gap-12 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {featured.map((dest, idx) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="destination-window group block text-decoration-none cursor-pointer snap-start flex-none w-[68vw] sm:w-[320px] md:w-auto"
          >
            {/* Top Row: 01 / Islands & ocean       MLE */}
            <div className="destination-window-top flex items-center justify-between gap-2 mb-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-stone">
              <span>0{idx + 1} / {dest.category}</span>
              <span className="text-bronze font-semibold">{dest.airportCode}</span>
            </div>

            {/* Airplane Passenger Window with Warm Molded Bezel Frame */}
            <div
              style={{
                borderRadius: '46% 46% 40% 40% / 34% 34% 32% 32%',
                backgroundColor: '#f4ece1',
                borderColor: '#d8cbba',
                boxShadow: 'inset 0 2px 6px rgba(21, 18, 14, 0.08)',
              }}
              className="destination-window-photo relative aspect-[4/5] w-full p-[7px] sm:p-[9px] border overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1"
            >
              {/* Photo inside window with inherited curvature */}
              <div
                style={{ borderRadius: 'inherit' }}
                className="relative w-full h-full overflow-hidden bg-[#181512]"
              >
                <Image
                  src={dest.cardImage}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 68vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Circular Action Button with ↗ on Bottom Right */}
                <span
                  className="window-open absolute bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-stone-900 shadow-md flex items-center justify-center text-base sm:text-lg font-light transition-all duration-300 group-hover:rotate-45 group-hover:bg-bronze group-hover:text-white"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </div>

            {/* Destination Name & Price */}
            <div className="destination-window-name flex items-baseline justify-between gap-2 mt-3 sm:mt-5">
              <h3 className="font-serif text-xl sm:text-3xl text-parchment leading-tight group-hover:text-bronze transition-colors">
                {dest.name}
              </h3>
              <span className="mono font-mono text-[11px] sm:text-xs text-bronze font-semibold whitespace-nowrap">
                Starting from ₹{dest.startingPriceINR.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
              {dest.tagline}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
