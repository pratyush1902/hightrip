'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Search, Globe, Compass, Sun, MapPin } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { travelPackages } from '@/data/packages';
import { StaggerReveal } from '@/components/animation/StaggerReveal';

export function DestinationsListing() {
  const [regionFilter, setRegionFilter] = useState<'all' | 'International' | 'India'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return destinations.filter((dest) => {
      if (regionFilter !== 'all' && dest.region !== regionFilter) return false;
      if (categoryFilter !== 'all' && dest.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dest.name.toLowerCase().includes(q) ||
          dest.airportCode.toLowerCase().includes(q) ||
          dest.country.toLowerCase().includes(q) ||
          dest.overview.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [regionFilter, categoryFilter, searchQuery]);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block mb-2">
          Global Portfolio
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-parchment leading-tight">
          Every place we plan, <br />
          <em className="italic text-bronze-light font-normal">inspected with care.</em>
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          From the coral atolls of the Indian Ocean to high Alpine passes and serene backwaters. Select a destination to review seasonal guides, climate, and published holidays.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-5 sm:p-6 mb-12 shadow-lg space-y-4">
        {/* Regions tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-obsidian-border/80 pb-4">
          {[
            { id: 'all', label: 'All Destinations' },
            { id: 'International', label: 'International Escapes' },
            { id: 'India', label: 'Closer to Home (India)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRegionFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                regionFilter === tab.id
                  ? 'bg-sand text-obsidian font-bold shadow'
                  : 'bg-obsidian text-muted-foreground hover:text-parchment border border-obsidian-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Second Row: Search and Category */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-muted-stone absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, airport code (MLE, HAN, FCO)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
            />
          </div>

          <div className="md:col-span-6">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
            >
              <option value="all">All Landscape Categories</option>
              <option value="Islands & Ocean">Islands & Ocean</option>
              <option value="Culture & Discovery">Culture & Discovery</option>
              <option value="Coasts & Old Cities">Coasts & Old Cities</option>
              <option value="Alpine & Highlands">Alpine & Highlands</option>
              <option value="Tropical & Heritage">Tropical & Heritage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((dest, idx) => {
          const matchingPackages = travelPackages.filter((p) => p.destinationSlug === dest.slug);

          return (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group block relative bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-bronze/50 transition-all duration-300 shadow-xl"
            >
              {/* Header Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-obsidian-border/60 bg-obsidian/40 font-mono text-xs text-muted-stone">
                <span className="flex items-center gap-2">
                  <span className="text-bronze font-bold">0{idx + 1}</span>
                  <span>/</span>
                  <span>{dest.category}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-obsidian border border-obsidian-border text-sand font-bold">
                  {dest.airportCode}
                </span>
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian">
                <Image
                  src={dest.cardImage}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-parchment group-hover:bg-bronze group-hover:text-obsidian group-hover:border-bronze transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl text-parchment tracking-tight group-hover:text-bronze-light transition-colors">
                      {dest.name}
                    </h2>
                    <span className="font-mono text-xs text-bronze-light bg-black/70 px-2 py-1 rounded border border-bronze/20">
                      From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-sand/80 line-clamp-1 font-light">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              {/* Details Footer */}
              <div className="p-4 sm:p-5 space-y-2 bg-obsidian-surface text-xs font-mono text-muted-stone">
                <div className="flex items-center justify-between">
                  <span>Best Season:</span>
                  <span className="text-sand">{dest.bestTimeToVisit.split('&')[0]}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-obsidian-border/50">
                  <span>Published Holidays:</span>
                  <span className="text-bronze-light font-bold">
                    {matchingPackages.length} Available
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </StaggerReveal>
    </div>
  );
}
