'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { TravelPackage } from '@/types/travel';

interface PackageDetailHeroProps {
  pkg: TravelPackage;
}

export function PackageDetailHero({ pkg }: PackageDetailHeroProps) {
  return (
    <div className="relative w-full min-h-[540px] lg:min-h-[640px] flex items-end pb-12 pt-32 bg-[#0c0a08] overflow-hidden">
      {/* Background Image */}
      <Image
        src={pkg.heroImage}
        alt={pkg.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center filter brightness-[0.75] contrast-[1.05]"
      />

      {/* Atmospheric High-Contrast Dark Overlays */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-black/75 to-black/30 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Hero Content with Maximum Contrast */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-200 hover:text-white transition-all bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:border-[#c48c58] shadow-md group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#c48c58] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Holidays</span>
          </Link>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
          <Link
            href={`/destinations/${pkg.destinationSlug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[#c48c58]/25 text-[#f5caa4] border border-[#c48c58]/50 hover:bg-[#c48c58]/40 transition-colors shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c48c58]" />
            <span>{pkg.destinationName}</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-black/65 backdrop-blur-md text-stone-200 border border-white/20 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#c48c58]" />
            <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
          </span>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-black/65 backdrop-blur-md text-stone-200 border border-white/20 shadow-sm">
            {pkg.style}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold max-w-4xl tracking-tight leading-[1.12] drop-shadow-xl">
          {pkg.title}
        </h1>

        {/* Tagline & Subhead */}
        <p className="mt-3 text-base sm:text-xl text-stone-200 font-light max-w-2xl leading-relaxed drop-shadow-md">
          {pkg.tagline}
        </p>

        {/* Bottom Price Kicker */}
        <div className="mt-8 flex flex-wrap items-baseline gap-4 pt-5 border-t border-white/15">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block font-medium mb-1">
              Bespoke Pricing
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-white drop-shadow-md">
                Price On Request
              </span>
            </div>
          </div>

          <div className="text-xs font-mono text-[#e0a66d] bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-[#c48c58]/40 shadow-lg">
            Custom Tailored · Guaranteed Best Rates
          </div>
        </div>
      </div>
    </div>
  );
}
