'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  Check, 
  ArrowRight, 
  Search, 
  Filter, 
  Globe2, 
  Calendar 
} from 'lucide-react';
import { travelPackages } from '@/data/packages';
import { destinations } from '@/data/destinations';
import { InquiryModal } from '@/components/common/InquiryModal';
import { StaggerReveal } from '@/components/animation/StaggerReveal';
import { PackageCard } from '@/components/packages/PackageCard';

export function PackagesListing() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  const initialDestination = searchParams.get('destination') || '';
  const initialBudget = searchParams.get('budget') || 'all';

  const [typeFilter, setTypeFilter] = useState(initialType);
  const [destinationFilter, setDestinationFilter] = useState(initialDestination);
  const [styleFilter, setStyleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');
  const [inquiryPackage, setInquiryPackage] = useState<string | null>(null);

  // Dynamically filter destination options according to active type tab
  const availableDestinations = useMemo(() => {
    if (typeFilter === 'all') return destinations;
    const matchingSlugs = new Set(
      travelPackages.filter((p) => p.type === typeFilter).map((p) => p.destinationSlug)
    );
    return destinations.filter((d) => matchingSlugs.has(d.slug));
  }, [typeFilter]);

  const handleTypeChange = (newType: string) => {
    setTypeFilter(newType);
    if (destinationFilter) {
      const matchingSlugs = new Set(
        newType === 'all'
          ? destinations.map((d) => d.slug)
          : travelPackages.filter((p) => p.type === newType).map((p) => p.destinationSlug)
      );
      if (!matchingSlugs.has(destinationFilter)) {
        setDestinationFilter('');
      }
    }
  };

  const filteredPackages = useMemo(() => {
    return travelPackages
      .filter((pkg) => {
        // Type filter
        if (typeFilter !== 'all' && pkg.type !== typeFilter) return false;
        // Destination filter
        if (destinationFilter && pkg.destinationSlug !== destinationFilter) return false;
        // Style filter
        if (styleFilter !== 'all' && pkg.style !== styleFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = pkg.title.toLowerCase().includes(q);
          const matchDest = pkg.destinationName.toLowerCase().includes(q);
          const matchOverview = pkg.overview.toLowerCase().includes(q);
          if (!matchTitle && !matchDest && !matchOverview) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
        if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
        if (sortBy === 'duration') return b.durationDays - a.durationDays;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [typeFilter, destinationFilter, styleFilter, searchQuery, sortBy]);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-3xl mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block mb-2">
          The Holiday Collection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-parchment leading-tight">
          Thoughtfully planned <br />
          <em className="italic text-bronze-light font-normal">travel packages.</em>
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Every journey carries transparent pricing, inspected boutique accommodations, and verified dates. Browse our curated international escapes, India retreats, and group departures.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-5 sm:p-6 mb-10 shadow-lg space-y-5">
        {/* Top Type Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-obsidian-border/80 pb-4">
          {[
            { id: 'all', label: `All Packages (${travelPackages.length})` },
            { id: 'international', label: `International Escapes (${travelPackages.filter(p => p.type === 'international').length})` },
            { id: 'india', label: `Domestic / India (${travelPackages.filter(p => p.type === 'india').length})` },
            { id: 'fixed-departure', label: `Fixed Group Departures (${travelPackages.filter(p => p.type === 'fixed-departure').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTypeChange(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                typeFilter === tab.id
                  ? 'bg-[#c48c58] text-white font-medium shadow-sm'
                  : 'bg-obsidian text-muted-foreground hover:text-parchment border border-obsidian-border hover:border-bronze/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Second Row: Search, Destination & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-muted-stone absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country, keyword, or vibe..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
            />
          </div>

          {/* Destination Dropdown */}
          <div className="md:col-span-3">
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
            >
              <option value="">{typeFilter === 'india' ? 'All Domestic Destinations' : 'All Destinations'}</option>
              {availableDestinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} ({d.airportCode})
                </option>
              ))}
            </select>
          </div>

          {/* Style Dropdown */}
          <div className="md:col-span-3">
            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
            >
              <option value="all">All Styles</option>
              <option value="Luxury Escapes">Luxury Escapes</option>
              <option value="Expedition & Culture">Expedition & Culture</option>
              <option value="Family Journey">Family Journey</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-sand font-mono focus:outline-none focus:ring-1 focus:ring-bronze"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.slug} package={pkg} />
          ))}
        </StaggerReveal>
      ) : (
        <div className="text-center py-20 bg-obsidian-surface rounded-2xl border border-obsidian-border p-8">
          <p className="font-serif text-2xl text-parchment">No matching packages found.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              setTypeFilter('all');
              setDestinationFilter('');
              setStyleFilter('all');
              setSearchQuery('');
            }}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#c48c58] text-white hover:bg-[#b57d4a] transition-all text-xs font-semibold font-mono shadow-sm cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={!!inquiryPackage}
        onClose={() => setInquiryPackage(null)}
        defaultPackageTitle={inquiryPackage || ''}
      />
    </div>
  );
}
