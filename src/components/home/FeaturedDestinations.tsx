'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerReveal } from '@/components/animation/StaggerReveal';

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 5);

  return (
    <section id="destinations" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        kicker="The view is only the beginning"
        title="Some places change"
        accent="your perspective."
        subtitle="Pick the view. We’ll take care of every connection, permit, villa, and private transfer."
        actionText="Explore all destinations"
        actionHref="/destinations"
      />

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((dest, idx) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            style={{
              borderRadius: '40% / 30%',
              boxShadow:
                'inset 0 0 0 10px rgba(20, 18, 16, 0.08), 0 4px 10px rgba(20, 18, 16, 0.06), 0 32px 64px -28px rgba(20, 18, 16, 0.45)',
            }}
            className="group relative block aspect-[3/4] w-full overflow-hidden bg-[#0b0f1c] hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer"
          >
            {/* Destination Image with Ken Burns hover effect */}
            <Image
              src={dest.cardImage}
              alt={dest.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Scrim for Content Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

            {/* Cabin Glass Glare Reflection */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Authentic Airplane Window Breather Hole */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/60 border border-white/30 pointer-events-none shadow-sm z-20" />

            {/* Top Floating Badges (Index & Airport Code) */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
                <span className="text-bronze font-bold">0{idx + 1}</span>
                <span className="text-white/40">/</span>
                <span>{dest.airportCode}</span>
              </span>

              <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-bronze group-hover:text-[#1c1917] group-hover:border-bronze transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Bottom Card Content Inside Window */}
            <div className="absolute bottom-5 inset-x-5 z-10">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-200 transition-colors drop-shadow-md">
                  {dest.name}
                </h3>
                <span className="font-mono text-xs text-amber-200 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-amber-300/20 font-medium">
                  From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-stone-200 line-clamp-1 font-light drop-shadow mb-3">
                {dest.tagline}
              </p>

              {/* Jeto-Style Flight Tag at bottom of window */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em] text-white/90 drop-shadow">
                <span>DEL → {dest.airportCode} · {dest.name}</span>
                <span className="text-amber-300 font-bold">High Trip</span>
              </div>
            </div>
          </Link>
        ))}
      </StaggerReveal>
    </section>
  );
}
