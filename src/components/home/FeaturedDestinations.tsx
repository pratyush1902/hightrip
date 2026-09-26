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
            className="group block relative bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-bronze/50 transition-all duration-300 shadow-md"
          >
            {/* Top Card Bar with Index & Airport code */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-obsidian-border/60 bg-obsidian/40 font-mono text-xs text-muted-stone">
              <span className="flex items-center gap-2">
                <span className="text-bronze-light font-bold">0{idx + 1}</span>
                <span>/</span>
                <span>{dest.category}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-obsidian border border-obsidian-border text-sand font-bold">
                {dest.airportCode}
              </span>
            </div>

            {/* Photo with subtle hover zoom */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian">
              <Image
                src={dest.cardImage}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

              {/* Floating Action Arrow */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-parchment group-hover:bg-bronze group-hover:text-obsidian group-hover:border-bronze transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Bottom Card Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl text-parchment tracking-tight group-hover:text-bronze-light transition-colors">
                    {dest.name}
                  </h3>
                  <span className="font-mono text-xs text-bronze-light bg-black/60 px-2 py-1 rounded border border-bronze/20">
                    From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-sand/80 line-clamp-1 font-light">
                  {dest.tagline}
                </p>
              </div>
            </div>

            {/* Card Footer Details */}
            <div className="p-4 sm:p-5 flex items-center justify-between text-xs text-muted-stone font-mono bg-obsidian-surface">
              <span>Best: {dest.bestTimeToVisit.split('&')[0]}</span>
              <span className="text-sand group-hover:text-bronze-light group-hover:underline flex items-center gap-1 transition-colors">
                View holidays →
              </span>
            </div>
          </Link>
        ))}
      </StaggerReveal>
    </section>
  );
}
