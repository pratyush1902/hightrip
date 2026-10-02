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
      className={`flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-3 sm:space-y-5 lg:space-y-6 text-[#181512] will-change-[opacity,transform] ${className}`}
    >

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
      <div className="hero-intro-sub max-w-xs sm:max-w-md lg:max-w-xl">
        <p className="text-xs sm:text-base lg:text-lg text-[#59534c] font-bold leading-relaxed">
          India’s only travel company that takes dark tourism into mainstream travel.
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
