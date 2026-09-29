'use client';

import Link from 'next/link';
import { HeroCTA } from './HeroCTA';

interface HeroIntroProps {
  introRef?: React.RefObject<HTMLDivElement | null>;
  onCtaClick?: () => void;
  className?: string;
}

export function HeroIntro({
  introRef,
  onCtaClick,
  className = '',
}: HeroIntroProps) {
  return (
    <div
      ref={introRef}
      className={`flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-2 sm:space-y-4 lg:space-y-6 text-[#181512] will-change-[opacity,transform] ${className}`}
    >
      {/* Top Editorial Kicker & Dark Tourism Pioneering Tag */}
      <div className="hero-intro-kicker flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
        <Link
          href="/experiences"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ece1] hover:bg-[#ebdccb] border border-[#d8cbba] hover:border-[#c48c58] transition-all duration-300 shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c48c58] ring-2 ring-[#c48c58]/20" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#2c2621]">
            India&apos;s First Travel Company Working in Dark Tourism
          </span>
          <span className="text-[11px] text-[#c48c58] font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </Link>
      </div>

      {/* Main Headline */}
      <div className="hero-intro-headline">
        <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1] sm:leading-[1.05] text-[#181512]">
          Travel. <br className="hidden sm:inline" />
          Explore. <br className="hidden sm:inline" />
          <em className="italic font-serif text-[#c48c58] font-normal">
            Experience.
          </em>
        </h1>
      </div>

      {/* Supporting Copy */}
      <div className="hero-intro-sub max-w-xs sm:max-w-md lg:max-w-lg">
        <p className="text-xs sm:text-base lg:text-lg text-[#59534c] font-light leading-relaxed">
          New views. Unfamiliar places. Journeys that stay with you.
        </p>
      </div>

      {/* Primary CTA */}
      <div className="hero-intro-cta pt-1 sm:pt-2">
        <HeroCTA
          href="#departures"
          text="Find your next journey"
          onClick={onCtaClick}
        />
      </div>

      {/* Understated Aircraft Metadata */}
      <div className="hero-intro-meta pt-3 sm:pt-4 hidden sm:flex items-center gap-4 lg:gap-6 text-[10px] sm:text-[11px] font-mono text-[#8a8278] border-t border-[#e5ddd0]/80">
        <span>CRUISING ALTITUDE 35,000 FT</span>
        <span>·</span>
        <span>UNCLUTTERED HORIZONS</span>
      </div>
    </div>
  );
}
