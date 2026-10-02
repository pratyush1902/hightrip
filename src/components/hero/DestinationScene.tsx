'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { HeroDestination } from '@/data/heroDestinations';

interface DestinationSceneProps {
  destination: HeroDestination;
  destinationIndex: number;
  totalDestinations: number;
  isVisible: boolean;
  onSelectDestination?: (index: number) => void;
  className?: string;
}

export function DestinationScene({
  destination,
  destinationIndex,
  totalDestinations,
  isVisible,
  onSelectDestination,
  className = '',
}: DestinationSceneProps) {
  return (
    <div
      className={`absolute inset-0 z-30 transition-opacity duration-700 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      {/* No dark overlay */}

      {/* Main Full-Screen Destination Content Box */}
      <div className="relative z-40 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col justify-between py-16 sm:py-22 lg:py-26 pointer-events-none">
        {/* Top Flight Metadata Tag */}
        <div className="flex items-center justify-between gap-2 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-[#f3eadb]">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c48c58]" />
            <span>{destination.coordinates}</span>
            <span className="text-white/30">·</span>
            <span className="text-[#c48c58] font-bold">{destination.airportCode}</span>
          </div>

          <div className="text-[10px] sm:text-xs font-mono text-white/70 bg-black/50 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10 whitespace-nowrap">
            DESTINATION 0{destinationIndex + 1} / 0{totalDestinations}
          </div>
        </div>

        {/* Center / Bottom-Center Destination Editorial Title & Copy */}
        <div
          key={destination.id}
          className={`max-w-3xl space-y-2.5 sm:space-y-4 ${
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          } animate-scene-fade my-auto`}
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#e2b785] block">
            {destination.country}
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-[#fbf9f5] leading-[0.98] drop-shadow-2xl break-words">
            {destination.name}
          </h2>

          <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#f3eadb]/90 font-light leading-snug max-w-xl">
            “{destination.tagline}”
          </p>

          <p className="text-xs sm:text-sm text-white/80 font-light max-w-md leading-relaxed line-clamp-3 sm:line-clamp-none">
            {destination.description}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
            <Link
              href={destination.ctaHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#c48c58] hover:bg-[#b57d4a] text-[#12100e] text-xs font-bold tracking-wider uppercase shadow-xl transition-colors"
            >
              <span>{destination.ctaText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#12100e]" />
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase hover:border-[#c48c58] transition-colors"
            >
              <span>View Packages</span>
            </Link>
          </div>
        </div>

        {/* Bottom Destination Progress Navigation Bar */}
        <div
          className={`flex items-center justify-between gap-4 ${
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          } pt-3 sm:pt-6 border-t border-white/15`}
        >
          {/* Destination Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/15 overflow-x-auto">
            {Array.from({ length: totalDestinations }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSelectDestination && onSelectDestination(idx)}
                className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                  idx === destinationIndex
                    ? 'bg-[#f3eadb] text-[#12100e] font-bold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          <div className="text-[10px] sm:text-xs font-mono text-white/70 hidden sm:flex items-center gap-2">
            <span>Scroll down to explore destinations</span>
            <span className="text-[#c48c58]">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
