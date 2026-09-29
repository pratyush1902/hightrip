'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  HeartHandshake, 
  CameraOff, 
  Footprints, 
  Coins, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EthicalPillar {
  num: string;
  tag: string;
  title: string;
  desc: string;
  quote: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ethicalPillars: EthicalPillar[] = [
  {
    num: '01',
    tag: 'Historical Distance',
    title: 'Let time pass',
    desc: 'We curate memorials and long-standing historic sites, never places of recent or raw ongoing grief. True remembrance requires chronological perspective.',
    quote: '“Grief must settle into history before travel can become education.”',
    icon: Clock,
  },
  {
    num: '02',
    tag: 'Sacred Decorum',
    title: 'Behave as a guest',
    desc: 'Quiet voices, covered shoulders where asked, and measured footsteps. A memorial is not a theme park or a sightseeing spectacle; it is hallowed ground.',
    quote: '“Step lightly, speak softly, and honour the ground beneath your feet.”',
    icon: HeartHandshake,
  },
  {
    num: '03',
    tag: 'Reverent Observation',
    title: 'No smiling selfies',
    desc: 'Photograph the architecture, the plaques, and the light — never yourself posing in front of human tragedy. Frame the monument, not your ego.',
    quote: '“A memorial is a sanctuary of quiet remembrance, not a vacation backdrop.”',
    icon: CameraOff,
  },
  {
    num: '04',
    tag: 'Conservation First',
    title: 'Tread lightly',
    desc: 'Local guides who know the soil, certified heritage stays, and strictly capped small groups of maximum 12 travelers to preserve fragile physical archives.',
    quote: '“Leave only silence, take only contemplation, preserve the fragile relic.”',
    icon: Footprints,
  },
  {
    num: '05',
    tag: 'Direct Impact',
    title: 'Leave something behind',
    desc: 'A transparent percentage of booking fees flows directly to regional preservation trusts, local oral-history projects, and living communities.',
    quote: '“Genuine remembrance directly sustains the local caretakers of memory.”',
    icon: Coins,
  },
];

export function EthicalCodeSwiper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  // ScrollTrigger to tie page scroll to active card swipe
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            ethicalPillars.length - 1,
            Math.floor(progress * ethicalPillars.length)
          );
          setActiveIndex(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const goToCard = (index: number) => {
    const targetIdx = Math.max(0, Math.min(ethicalPillars.length - 1, index));
    setActiveIndex(targetIdx);

    // If user clicked manually, scroll container proportionally
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = scrollTop + rect.top;
      const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = containerTop + (targetIdx / (ethicalPillars.length - 1)) * scrollableDist;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToCard(activeIndex + 1);
      } else {
        goToCard(activeIndex - 1);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#0b0a08]"
      style={{ backgroundColor: '#0b0a08' }}
    >
      {/* Sticky Viewport Stage (pins on scroll) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(196,140,88,0.06),transparent_65%)]" />

        {/* Top Header & Navigation Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#26211c] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                The Ethical Code
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5efe6] leading-tight">
              Not a horror tour. <br className="hidden sm:inline" />
              <em className="italic text-[#c48c58] font-normal">A deeper kind of travel.</em>
            </h2>
          </div>

          {/* Interactive Navigation Pills & Arrows */}
          <div className="flex items-center gap-3">
            {/* Pill Tabs for direct jump */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#14120f] border border-[#26211c] p-1.5 rounded-full">
              {ethicalPillars.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => goToCard(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-bronze text-[#0e0d0b] font-bold shadow-md'
                        : 'text-[#8a8174] hover:text-[#f5efe6] hover:bg-white/5'
                    }`}
                  >
                    {p.num}
                  </button>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToCard(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous principle"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? 'border-[#26211c] text-stone-600 opacity-40 cursor-not-allowed'
                    : 'border-[#2a241e] text-[#f5efe6] hover:bg-bronze hover:text-[#0e0d0b] hover:border-bronze cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goToCard(activeIndex + 1)}
                disabled={activeIndex === ethicalPillars.length - 1}
                aria-label="Next principle"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  activeIndex === ethicalPillars.length - 1
                    ? 'border-[#26211c] text-stone-600 opacity-40 cursor-not-allowed'
                    : 'border-[#2a241e] text-[#f5efe6] hover:bg-bronze hover:text-[#0e0d0b] hover:border-bronze cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Stage: Interactive Swiping / Sliding Cards */}
        <div
          className="relative z-10 max-w-4xl mx-auto w-full my-auto py-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Carousel Frame */}
          <div className="relative aspect-[16/11] sm:aspect-[16/9] md:aspect-[21/10] w-full">
            {ethicalPillars.map((pillar, idx) => {
              const offset = idx - activeIndex;
              const isCurrent = offset === 0;

              // 3D Stacking and slide transform coordinates
              const translateX = offset * 105; // Percent slide
              const scale = isCurrent ? 1 : Math.max(0.85, 1 - Math.abs(offset) * 0.08);
              const opacity = isCurrent ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.2);
              const pointerEvents = isCurrent ? 'auto' : 'none';
              const IconComponent = pillar.icon;

              return (
                <div
                  key={pillar.num}
                  style={{
                    transform: `translate3d(${translateX}%, 0, 0) scale(${scale})`,
                    opacity,
                    pointerEvents,
                    backgroundColor: '#14120f',
                    borderColor: isCurrent ? 'rgba(196, 140, 88, 0.45)' : '#26211c',
                  }}
                  className="absolute inset-0 rounded-3xl border p-6 sm:p-10 md:p-12 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] transition-all duration-700 cubic-bezier(0.22,1,0.36,1) overflow-hidden"
                >
                  {/* Giant Watermark Background Number */}
                  <span className="absolute -bottom-6 -right-4 font-mono text-8xl sm:text-9xl md:text-[140px] font-bold text-white/[0.03] select-none pointer-events-none">
                    {pillar.num}
                  </span>

                  {/* Top Bar of the Card */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bronze/15 border border-bronze/30 flex items-center justify-center text-bronze shadow-inner">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                          Principle {pillar.num} / 05
                        </span>
                        <span className="font-mono text-xs text-[#8a8174]">
                          {pillar.tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
                      <span>High Trip Ethos</span>
                    </div>
                  </div>

                  {/* Middle Copy: Title and Full Description */}
                  <div className="space-y-3 sm:space-y-4 my-auto z-10">
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5efe6] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#c5bcb0] font-light leading-relaxed max-w-2xl">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom Principle Quote & Citation */}
                  <div className="pt-4 border-t border-[#26211c] flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10 text-xs">
                    <p className="font-serif italic text-amber-200/90 text-xs sm:text-sm">
                      {pillar.quote}
                    </p>
                    <span className="font-mono text-[11px] text-[#8a8174] uppercase tracking-wider shrink-0">
                      Scroll to next principle ↓
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Hint / Progress indicator */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {ethicalPillars.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToCard(idx)}
                aria-label={`Jump to principle ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 h-1.5 bg-bronze'
                    : 'w-2 h-1.5 bg-[#2a241e] hover:bg-stone-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Citation & Link */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pt-4 border-t border-[#26211c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#8a8174]">
          <p>
            After the ethics notes on{' '}
            <a
              href="https://www.dark-tourism.com/index.php/602-ethical-issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bronze hover:underline inline-flex items-center gap-1"
            >
              dark-tourism.com <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/responsible-travel" className="text-[#c5bcb0] hover:text-white hover:underline">
              The complete code
            </Link>
            <span>·</span>
            <span>5 Living Principles</span>
          </div>
        </div>
      </div>
    </div>
  );
}
