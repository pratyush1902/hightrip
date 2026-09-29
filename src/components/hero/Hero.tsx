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
      if (fullPageBgRef.current) {
        gsap.set(fullPageBgRef.current, { opacity: 0 });
      }
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

      if (bgEl) {
        gsap.set(bgEl, { opacity: 0 });
      }

      // Master Scroll-Driven Takeoff & Destination Morphing Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;

            // Live HUD Telemetry readouts (Direct DOM for 120fps performance without React re-render lag)
            const altEl = document.getElementById('hero-flight-altitude');
            const statusEl = document.getElementById('hero-flight-status');
            if (altEl && statusEl) {
              if (p < 0.10) {
                statusEl.textContent = 'CENTERING';
                altEl.textContent = 'ALT 0 FT';
              } else if (p < 0.18) {
                statusEl.textContent = 'HT-FLIGHT READY';
                altEl.textContent = 'ALT 0 FT';
              } else if (p < 0.38) {
                statusEl.textContent = 'CLIMBING';
                const climbP = (p - 0.18) / 0.20;
                altEl.textContent = `ALT ${Math.round(1000 + climbP * 34000)} FT`;
              } else {
                statusEl.textContent = 'AIRBORNE';
                altEl.textContent = 'ALT 35,000 FT';
              }
            }

            // Cross-destination stage transitions (Only updates state when stage actually changes)
            const shouldExpand = p > 0.28;
            setIsExpanded((prev) => (prev !== shouldExpand ? shouldExpand : prev));

            if (p > 0.45) {
              const destProgress = (p - 0.45) / 0.55;
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
      // PHASE 1 (0.0 to 0.18): ZOOM AND COME TO CENTER
      // Intro fades out, while the airplane & 3D logo zoom and glide to dead center
      // ========================================================
      if (introEl) {
        masterTl.to(
          introEl,
          { opacity: 0, y: -25, ease: 'power1.out', duration: 0.14 },
          0
        );
      }

      if (logoEl) {
        // Airplane and container smoothly zoom and glide to screen center (left: 50%, top: 50%)
        masterTl.to(
          logoEl,
          {
            left: '50%',
            top: '50%',
            scale: isDesktop ? 1.38 : 1.25,
            ease: 'power2.inOut',
            duration: 0.18,
          },
          0
        );

        // Once the airplane has ascended upwards out of view, fade out the launch container
        masterTl.to(logoEl, { opacity: 0, duration: 0.08 }, 0.38);
      }

      // ========================================================
      // PHASE 2 (0.22 to 0.45): High-Speed Ascent & Sky Penetration
      // Flight accelerates UPWARDS in 3D WebGL leaving the strips!
      // Full-page background photograph fades in to 100%
      // ========================================================
      if (bgEl) {
        masterTl.to(
          bgEl,
          { opacity: 1, ease: 'power1.inOut', duration: 0.24 },
          0.22
        );
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
    // Target position in Phase 4 (between 0.48 and 0.96)
    const targetProgress = 0.48 + 0.48 * (index / (heroDestinations.length - 1));
    window.scrollTo({ top: startY + totalDist * targetProgress, behavior: 'smooth' });
  };

  const currentDest = heroDestinations[activeDestIndex];

  return (
    <section
      id="hero-scroll-container"
      ref={containerRef}
      className="relative w-full h-[380vh] bg-[#fbf9f5] transition-colors duration-700"
    >
      {/* Sticky Pinned Viewport Stage */}
      <div
        ref={viewportRef}
        className={`sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
          isExpanded ? 'bg-[#181512] text-[#fbf9f5]' : 'bg-[#fbf9f5] text-[#1c1917]'
        }`}
      >
        {/* Layer 0: Full-Page Destination Photo (Edge-to-Edge Canvas) */}
        <div
          ref={fullPageBgRef}
          style={{ opacity: 0 }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-[opacity]"
        >
          {heroDestinations.map((dest, idx) => {
            const isActive = idx === activeDestIndex;
            return (
              <div
                key={dest.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                } transform transition-transform duration-[4000ms]`}
              >
                <Image
                  src={dest.image}
                  alt={`${dest.name} - ${dest.tagline}`}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center filter brightness-[0.78] contrast-[1.06]"
                />
              </div>
            );
          })}
        </div>

        {/* Layer 1: HighTrip 3D WebGL Flight Takeoff (Volumetric Extrusion) */}
        <div
          ref={logoContainerRef}
          className="absolute z-10 pointer-events-none will-change-[transform,opacity] left-1/2 -translate-x-1/2 -translate-y-1/2 top-[64%] sm:top-[66%] lg:top-1/2 lg:left-[70%] w-[210px] h-[210px] sm:w-[270px] sm:h-[270px] lg:w-[420px] lg:h-[420px]"
        >
          <Logo3DTakeoff
            isExpanded={isExpanded}
            className="w-full h-full"
          />
        </div>

        {/* Layer 2: Editorial Typography & Intro (Visible in Initial View) */}
        <div
          className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-start lg:items-center pt-16 sm:pt-24 lg:pt-0 pointer-events-none"
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
