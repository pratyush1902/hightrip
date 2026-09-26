'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  fullImage?: boolean;
}

export function BrandLogo({ 
  className = '', 
  variant = 'auto', 
  showTagline = false,
  fullImage = false 
}: BrandLogoProps) {
  const isDarkText = variant === 'dark';

  if (fullImage) {
    return (
      <Link
        href="/"
        className={`inline-block group cursor-pointer select-none ${className}`}
        aria-label="High Trip Holidays, Home"
      >
        <div className="relative w-44 sm:w-52 aspect-[570/518]">
          <Image
            src="/brand/logo-transparent.png"
            alt="High Trip Holidays"
            fill
            priority
            sizes="208px"
            className="object-contain"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3.5 group cursor-pointer select-none ${className}`}
      aria-label="High Trip Holidays, Home"
    >
      {/* Exact Brand Aircraft & Pillars Mark */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/brand/logo-mark.png"
          alt="High Trip Holidays Logo"
          fill
          priority
          sizes="40px"
          className={`object-contain transition-all ${
            isDarkText 
              ? 'filter drop-shadow-sm' 
              : 'filter drop-shadow-[0_0_12px_rgba(196,140,88,0.35)] brightness-110'
          }`}
        />
      </div>

      {/* Modern Wide Geometric Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-sans font-extrabold tracking-[0.22em] text-sm sm:text-base uppercase transition-colors ${
              isDarkText ? 'text-[#181512]' : 'text-parchment'
            }`}
          >
            High Trip
          </span>
          <span className="font-serif italic text-xs sm:text-sm text-bronze-light font-normal tracking-wide">
            Holidays
          </span>
        </div>
        {showTagline && (
          <span className="text-[8.5px] font-mono tracking-[0.25em] text-muted-stone uppercase mt-1">
            Travel · Explore · Experience
          </span>
        )}
      </div>
    </Link>
  );
}
