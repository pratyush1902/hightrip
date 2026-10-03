'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Globe, Calendar, Banknote, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { travelPackages } from '@/data/packages';

export function TripFinder() {
  const router = useRouter();
  const [tripType, setTripType] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [budget, setBudget] = useState('all');

  const availableDestinations = useMemo(() => {
    if (tripType === 'all') return destinations;
    if (tripType === 'international') return destinations.filter((d) => d.region === 'International');
    if (tripType === 'india') return destinations.filter((d) => d.region === 'India');
    if (tripType === 'fixed-departure') {
      const fdSlugs = new Set(
        travelPackages.filter((p) => p.type === 'fixed-departure').map((p) => p.destinationSlug)
      );
      return destinations.filter((d) => fdSlugs.has(d.slug));
    }
    return destinations;
  }, [tripType]);

  const handleTripTypeChange = (newType: string) => {
    setTripType(newType);
    if (selectedDestination) {
      let allowedSlugs: Set<string>;
      if (newType === 'all') {
        allowedSlugs = new Set(destinations.map((d) => d.slug));
      } else if (newType === 'international') {
        allowedSlugs = new Set(destinations.filter((d) => d.region === 'International').map((d) => d.slug));
      } else if (newType === 'india') {
        allowedSlugs = new Set(destinations.filter((d) => d.region === 'India').map((d) => d.slug));
      } else {
        allowedSlugs = new Set(
          travelPackages.filter((p) => p.type === 'fixed-departure').map((p) => p.destinationSlug)
        );
      }
      if (!allowedSlugs.has(selectedDestination)) {
        setSelectedDestination('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tripType !== 'all') params.set('type', tripType);
    if (selectedDestination) params.set('destination', selectedDestination);
    if (budget !== 'all') params.set('budget', budget);

    const query = params.toString();
    router.push(`/packages${query ? `?${query}` : ''}`);
  };

  return (
    <section id="trip-finder" className="relative z-30 -mt-10 sm:-mt-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-obsidian-surface/95 backdrop-blur-xl border border-obsidian-border rounded-2xl shadow-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-obsidian-border mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
                Departure Lounge
              </span>
              <h3 className="font-serif text-2xl text-parchment mt-0.5">
                Where to <em className="italic text-bronze font-normal">next?</em>
              </h3>
            </div>
            <p className="text-xs font-mono text-muted-stone">
              Every price published carries today’s valid dates.
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            {/* Kind of Trip */}
            <div className="md:col-span-4 space-y-2">
              <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-bronze" />
                <span>Your kind of trip</span>
              </label>
              <select
                value={tripType}
                onChange={(e) => handleTripTypeChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
              >
                <option value="all">Every kind of escape</option>
                <option value="international">Somewhere abroad (International)</option>
                <option value="india">Closer to home (Domestic / India)</option>
                <option value="fixed-departure">With a group (Fixed departures)</option>
              </select>
            </div>

            {/* Destination Selection */}
            <div className="md:col-span-4 space-y-2">
              <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-bronze" />
                <span>Your next stop</span>
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
              >
                <option value="">{tripType === 'india' ? 'All Domestic Destinations' : 'I’m open to inspiration'}</option>
                {availableDestinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name} ({d.airportCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range / Experience Tier */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-bronze" />
                <span>Experience Tier</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
              >
                <option value="all">All Tiers</option>
                <option value="under50k">Essential Luxury</option>
                <option value="50k-100k">Signature Expedition</option>
                <option value="above100k">Ultra-Luxe Private</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-xl bg-bronze-gradient text-obsidian font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md"
              >
                <span>Let’s go</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
