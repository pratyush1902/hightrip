'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroDestinations } from '@/data/heroDestinations';
import { HeroIntro } from './HeroIntro';
import { Logo3DTakeoff } from './Logo3DTakeoff';
import { DestinationScene } from './DestinationScene';
import { HeroProgress } from './HeroProgress';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const fullPageBgRef = useRef<HTMLDivElement>(null);

  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. Initial Page Load Animation
  useEffect(() => {
    if (!viewportRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      gsap.set(viewportRef.current, { opacity: 0 });

      if (introRef.current) {
        gsap.set('.hero-intro-headline', { opacity: 0, y: 25 });
        gsap.set('.hero-intro-sub', { opacity: 0, y: 20 });
        gsap.set('.hero-intro-cta', { opacity: 0, y: 20 });
        gsap.set('.hero-intro-meta', { opacity: 0 });
      }
      if (logoContainerRef.current) {
        gsap.set(logoContainerRef.current, {
          opacity: 0,
          scale: 0.85,
        });
      }

      // Background fades in
      tl.to(viewportRef.current, { opacity: 1, duration: 0.6 })
        // Headline reveals line-by-line & intro components
        .to('.hero-intro-headline', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-intro-sub', { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .to('.hero-intro-cta', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.hero-intro-meta', { opacity: 1, duration: 0.5 }, '-=0.3')
        // HighTrip Flight Logo reveals into position
        .to(
          logoContainerRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Scroll-Driven Flight Takeoff & Destination Morphing
  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    const ctx = gsap.context(() => {
      const logoEl = logoContainerRef.current;
      const introEl = introRef.current;
      const bgEl = fullPageBgRef.current;

      const isDesktop = window.innerWidth >= 1024;



      // Master Scroll-Driven Takeoff & Destination Morphing Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.05,
          onUpdate: (self) => {
            const p = self.progress;

            // Live HUD Telemetry readouts (Direct DOM for 120fps performance without React re-render lag)
            const altEl = document.getElementById('hero-flight-altitude');
            const statusEl = document.getElementById('hero-flight-status');
            if (altEl && statusEl) {
              if (p < 0.02) {
                statusEl.textContent = '3D FLIGHT READY';
                altEl.textContent = 'ALT 0 FT';
              } else if (p < 0.28) {
                statusEl.textContent = 'CLIMBING';
                const climbP = Math.min(1, p / 0.26);
                altEl.textContent = `ALT ${Math.round(climbP * 35000)} FT`;
              } else {
                statusEl.textContent = 'AIRBORNE';
                altEl.textContent = 'ALT 35,000 FT';
              }
            }

            // Cross-destination stage transitions (Only updates state when stage actually changes)
            const shouldExpand = p > 0.08;
            setIsExpanded((prev) => (prev !== shouldExpand ? shouldExpand : prev));

            if (p > 0.15) {
              const destProgress = Math.min(0.999, (p - 0.15) / 0.80);
              const count = heroDestinations.length;
              const targetIdx = Math.min(Math.floor(destProgress * count), count - 1);
              setActiveDestIndex((prev) => (prev !== targetIdx ? targetIdx : prev));
            } else {
              setActiveDestIndex(0);
            }
          },
        },
      });

      // ========================================================
      // UNIFIED IMMEDIATE TAKEOFF & DESTINATION MORPHING
      // Intro text fades out rapidly while 3D plane ascends immediately UP
      // ========================================================
      if (introEl) {
        masterTl.to(
          introEl,
          { opacity: 0, y: -30, ease: 'power1.out', duration: 0.05 },
          0
        );
      }

      if (logoEl) {
        // Glide horizontal center on desktop smoothly from p = 0 to 0.14
        masterTl.to(
          logoEl,
          {
            left: '50%',
            scale: isDesktop ? 1.35 : 1.2,
            ease: 'power1.inOut',
            duration: 0.14,
          },
          0
        );

        // Fade out launch container once plane ascends above viewport
        masterTl.to(logoEl, { opacity: 0, duration: 0.06 }, 0.20);
      }

    }, containerRef);

    // Refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectDestination = (index: number) => {
    setActiveDestIndex(index);
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const startY = rect.top + scrollTop;
    const totalDist = container.offsetHeight - window.innerHeight;
    // Target progress midpoints: Dest 0 -> 0.25, Dest 1 -> 0.45, Dest 2 -> 0.65, Dest 3 -> 0.85
    const targetProgress = 0.25 + index * 0.20;
    window.scrollTo({ top: startY + totalDist * targetProgress, behavior: 'smooth' });
  };

  const currentDest = heroDestinations[activeDestIndex];

  return (
    <section
      id="hero-scroll-container"
      ref={containerRef}
      className="relative w-full h-[550vh] sm:h-[650vh] lg:h-[750vh] bg-[#12100e] transition-colors duration-700"
    >
      {/* Sticky Pinned Viewport Stage */}
      <div
        ref={viewportRef}
        className={`sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
          isExpanded ? 'bg-[#12100e] text-[#fbf9f5]' : 'bg-[#fbf9f5] text-[#1c1917]'
        }`}
      >
        {/* Layer 0: Full-Page Destination Photo (Edge-to-Edge Canvas) */}
        <div
          ref={fullPageBgRef}
          className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-700 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {heroDestinations.map((dest, idx) => {
            const isActive = idx === activeDestIndex;
            return (
              <div
                key={dest.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                }`}
              >
                <img
                  src={dest.image}
                  alt={`${dest.name} - ${dest.tagline}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        {/* Layer 1: HighTrip 3D WebGL Flight Takeoff (Volumetric Extrusion) */}
        <div
          ref={logoContainerRef}
          className="absolute z-10 pointer-events-none will-change-[transform,opacity] left-1/2 -translate-x-1/2 -translate-y-1/2 top-[58%] sm:top-[60%] lg:top-1/2 lg:left-[70%] w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[420px] lg:h-[420px]"
        >
          <Logo3DTakeoff
            isExpanded={isExpanded}
            className="w-full h-full"
          />
        </div>

        {/* Layer 2: Editorial Typography & Intro (Visible in Initial View) */}
        <div
          className={`relative z-20 w-full h-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex items-start lg:items-center pt-24 sm:pt-28 lg:pt-0 pointer-events-none transition-opacity duration-300 ${
            isExpanded ? 'opacity-0 invisible pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-full lg:w-1/2 pointer-events-auto">
            <HeroIntro
              introRef={introRef}
              onCtaClick={() => {
                if (containerRef.current) {
                  const top = containerRef.current.offsetTop;
                  const height = containerRef.current.offsetHeight;
                  window.scrollTo({ top: top + height * 0.35, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>

        {/* Layer 3: Phase 3 & 4 Full-Screen Destination Scene Overlay */}
        <DestinationScene
          destination={currentDest}
          destinationIndex={activeDestIndex}
          totalDestinations={heroDestinations.length}
          isVisible={isExpanded}
          onSelectDestination={handleSelectDestination}
        />

        {/* Layer 4: Bottom Ambient Progress Bar */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full pointer-events-none">
          <HeroProgress
            currentStage={activeDestIndex + 1}
            totalStages={heroDestinations.length}
            stageName={
              isExpanded
                ? `${currentDest.name.toUpperCase()} · ${currentDest.airportCode}`
                : '01 / TRAVEL · EXPLORE · EXPERIENCE'
            }
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </section>
  );
}
