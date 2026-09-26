'use client';

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
      className={`flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-3 sm:space-y-4 lg:space-y-6 text-[#181512] will-change-[opacity,transform] ${className}`}
    >
      {/* Top Editorial Kicker */}
      <div className="hero-intro-kicker flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c48c58]" />
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#7a746e]">
          Global Perspective · 01
        </span>
      </div>

      {/* Main Headline */}
      <div className="hero-intro-headline">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.08] sm:leading-[1.05] text-[#181512]">
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
