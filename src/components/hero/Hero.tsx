'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroDestinations } from '@/data/heroDestinations';
import { HeroIntro } from './HeroIntro';
import { Globe3D } from './Globe3D';
import { DestinationScene } from './DestinationScene';
import { HeroProgress } from './HeroProgress';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const fullPageBgRef = useRef<HTMLDivElement>(null);

  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Helper to determine responsive layout coordinates
  const getLayoutMetrics = useCallback(() => {
    if (typeof window === 'undefined') {
      return { isDesktop: true, initialLeft: 70, initialTop: 50, initialScale: 1 };
    }
    const w = window.innerWidth;
    const isDesktop = w >= 1024;
    const isTablet = w >= 640 && w < 1024;
    return {
      isDesktop,
      initialLeft: isDesktop ? 70 : 50,
      initialTop: isDesktop ? 50 : isTablet ? 68 : 73,
      initialScale: isDesktop ? 1 : isTablet ? 0.82 : 0.65,
    };
  }, []);

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
        gsap.set('.hero-intro-kicker', { opacity: 0, y: 15 });
        gsap.set('.hero-intro-headline', { opacity: 0, y: 25 });
        gsap.set('.hero-intro-sub', { opacity: 0, y: 20 });
        gsap.set('.hero-intro-cta', { opacity: 0, y: 20 });
        gsap.set('.hero-intro-meta', { opacity: 0 });
      }
      if (globeContainerRef.current) {
        const m = getLayoutMetrics();
        gsap.set(globeContainerRef.current, {
          opacity: 0,
          scale: m.initialScale * 0.85,
          left: `${m.initialLeft}%`,
          top: `${m.initialTop}%`,
          xPercent: -50,
          yPercent: -50,
        });
      }

      // Background fades in
      tl.to(viewportRef.current, { opacity: 1, duration: 0.6 })
        // Headline reveals line-by-line & intro components
        .to('.hero-intro-kicker', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.hero-intro-headline', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-intro-sub', { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .to('.hero-intro-cta', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.hero-intro-meta', { opacity: 1, duration: 0.5 }, '-=0.3')
        // 3D Globe reveals into position
        .to(
          globeContainerRef.current,
          {
            opacity: 1,
            scale: () => getLayoutMetrics().initialScale,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [getLayoutMetrics]);

  // 2. Scroll-Driven Globe Zoom & Full-Page Destination Morphing
  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    const ctx = gsap.context(() => {
      const globeEl = globeContainerRef.current;
      const introEl = introRef.current;
      const bgEl = fullPageBgRef.current;

      const metrics = getLayoutMetrics();

      // Set initial dimensions cleanly
      if (globeEl) {
        gsap.set(globeEl, {
          left: `${metrics.initialLeft}%`,
          top: `${metrics.initialTop}%`,
          xPercent: -50,
          yPercent: -50,
          scale: metrics.initialScale,
          opacity: 1,
        });
      }

      if (bgEl) {
        gsap.set(bgEl, { opacity: 0 });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          const liveMetrics = getLayoutMetrics();

          // Phase 1 (0 to 0.20): Intro text fades out, 3D Globe glides to dead center
          if (p <= 0.20) {
            const p1 = p / 0.20;

            if (introEl) {
              gsap.set(introEl, {
                opacity: 1 - p1,
                y: -25 * p1,
              });
            }

            if (globeEl) {
              const currentLeft = liveMetrics.initialLeft + (50 - liveMetrics.initialLeft) * p1;
              const currentTop = liveMetrics.initialTop + (50 - liveMetrics.initialTop) * p1;
              const currentScale = liveMetrics.initialScale + (1.15 - liveMetrics.initialScale) * p1;
              gsap.set(globeEl, {
                left: `${currentLeft}%`,
                top: `${currentTop}%`,
                scale: currentScale,
                opacity: 1,
              });
            }

            if (bgEl) {
              gsap.set(bgEl, { opacity: 0 });
            }

            setIsExpanded(false);
            setActiveDestIndex(0);
          }
          // Phase 2 (0.20 to 0.45): Globe zooms in toward camera, Full-Page Image fades in
          else if (p > 0.20 && p <= 0.45) {
            const p2 = (p - 0.20) / 0.25;

            if (introEl) {
              gsap.set(introEl, { opacity: 0 });
            }

            if (globeEl) {
              // Zoom deeply into the globe like descending from planetary orbit
              const zoomScale = 1.15 + (3.2 - 1.15) * p2;
              const globeOpacity = Math.max(0, 1 - p2 * 1.25);
              gsap.set(globeEl, {
                left: '50%',
                top: '50%',
                scale: zoomScale,
                opacity: globeOpacity,
              });
            }

            // Full-page background photo fades in to 100% full screen
            if (bgEl) {
              gsap.set(bgEl, { opacity: p2 });
            }

            setIsExpanded(p2 > 0.6);
            setActiveDestIndex(0); // Vietnam
          }
          // Phase 3 & 4 (0.45 to 1.0): Full-Page Destination Scenes & Morphing
          else {
            if (introEl) gsap.set(introEl, { opacity: 0 });

            if (globeEl) {
              gsap.set(globeEl, { opacity: 0, scale: 3.5 });
            }

            if (bgEl) {
              gsap.set(bgEl, { opacity: 1 });
            }

            setIsExpanded(true);

            // Morph across the 5 destinations:
            // Vietnam (0) -> Switzerland (1) -> Japan (2) -> Maldives (3) -> Bali (4)
            const destProgress = (p - 0.45) / 0.55;
            const destCount = heroDestinations.length;
            const targetIdx = Math.min(
              Math.floor(destProgress * destCount),
              destCount - 1
            );
            setActiveDestIndex(targetIdx);
          }
        },
      });
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
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
  }, [getLayoutMetrics]);

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
      ref={containerRef}
      className="relative w-full h-[380vh] bg-[#f8f4ee] transition-colors duration-700"
    >
      {/* Sticky Pinned Viewport Stage */}
      <div
        ref={viewportRef}
        className={`sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
          isExpanded ? 'bg-black text-[#fbf9f5]' : 'bg-[#f8f4ee] text-[#181512]'
        }`}
      >
        {/* Layer 0: Full-Page Destination Photo (True 100vw x 100vh Edge-to-Edge Canvas) */}
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

        {/* Layer 1: 3D Interactive WebGL Globe (Responsive Geometry) */}
        <div
          ref={globeContainerRef}
          className="absolute z-10 pointer-events-auto will-change-[transform,opacity]"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(76vw, 480px)',
            height: 'min(76vw, 480px)',
            maxWidth: '480px',
            maxHeight: '480px',
          }}
        >
          <Globe3D activeDestinationIndex={activeDestIndex} className="w-full h-full" />
        </div>

        {/* Layer 2: Editorial Typography & Intro (Visible in Initial View) */}
        <div
          className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-start lg:items-center pt-20 sm:pt-24 lg:pt-0 pointer-events-none"
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
