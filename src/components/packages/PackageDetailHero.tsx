'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, ShieldCheck, MapPin, Share2 } from 'lucide-react';
import { TravelPackage } from '@/types/travel';

interface PackageDetailHeroProps {
  pkg: TravelPackage;
}

export function PackageDetailHero({ pkg }: PackageDetailHeroProps) {
  return (
    <div className="relative w-full min-h-[520px] lg:min-h-[620px] flex items-end pb-12 pt-28 bg-obsidian overflow-hidden">
      {/* Background Image */}
      <Image
        src={pkg.heroImage}
        alt={pkg.title}
        fill
        priority
        sizes="100vw"
        className="object-cover filter brightness-[0.6] contrast-[1.05]"
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-xs font-mono text-sand/80 hover:text-parchment transition-colors bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sand/15"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-bronze" />
            <span>Back to All Holidays</span>
          </Link>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Link
            href={`/destinations/${pkg.destinationSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-bronze/20 text-bronze-light border border-bronze/30 hover:bg-bronze/30 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-bronze" />
            <span>{pkg.destinationName}</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md text-sand border border-sand/20">
            <Clock className="w-3.5 h-3.5 text-bronze" />
            <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md text-sand border border-sand/20">
            {pkg.style}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-parchment max-w-4xl tracking-tight leading-[1.12]">
          {pkg.title}
        </h1>

        {/* Tagline & Subhead */}
        <p className="mt-3 text-base sm:text-xl text-sand/90 font-light max-w-2xl leading-relaxed">
          {pkg.tagline}
        </p>

        {/* Bottom Price Kicker */}
        <div className="mt-6 flex flex-wrap items-baseline gap-4 pt-4 border-t border-sand/20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-stone block">
              Published Price Per Person
            </span>
            <span className="text-3xl font-serif font-bold text-parchment">
              ₹{pkg.priceINR.toLocaleString('en-IN')}
            </span>
            {pkg.originalPriceINR && (
              <span className="ml-3 text-sm font-mono text-muted-stone line-through">
                ₹{pkg.originalPriceINR.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="text-xs font-mono text-bronze-light bg-black/60 px-3 py-1.5 rounded-lg border border-sand/15">
            Price valid to {pkg.priceValidUntil} · All taxes included
          </div>
        </div>
      </div>
    </div>
  );
}
