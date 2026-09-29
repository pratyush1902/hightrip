'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerReveal } from '@/components/animation/StaggerReveal';

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 6);

  return (
    <section id="destinations" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        kicker="The view is only the beginning"
        title="Some places change"
        accent="your perspective."
        subtitle="Pick the view. We’ll take care of the journey."
        actionText="Explore all destinations"
        actionHref="/destinations"
      />

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
        {featured.map((dest, idx) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="destination-window group block text-decoration-none cursor-pointer"
          >
            {/* Top Row: 01 / Islands & ocean       MLE */}
            <div className="destination-window-top flex items-center justify-between gap-3 mb-4 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-muted-stone">
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
              className="destination-window-photo relative aspect-[4/5] w-full p-[9px] border overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1"
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Circular Action Button with ↗ on Bottom Right */}
                <span
                  className="window-open absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white text-stone-900 shadow-md flex items-center justify-center text-lg font-light transition-all duration-300 group-hover:rotate-45 group-hover:bg-bronze group-hover:text-white"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </div>

            {/* Destination Name & Price */}
            <div className="destination-window-name flex items-baseline justify-between gap-3 mt-5">
              <h3 className="font-serif text-2xl sm:text-3xl text-parchment leading-tight group-hover:text-bronze transition-colors">
                {dest.name}
              </h3>
              <span className="mono font-mono text-xs text-bronze font-semibold">
                From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
              {dest.tagline}
            </p>
          </Link>
        ))}
      </StaggerReveal>
    </section>
  );
}
