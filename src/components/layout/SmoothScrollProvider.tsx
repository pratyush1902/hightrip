'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false, // Never hijack native touch scrolling on mobile devices
    });

    lenisRef.current = lenis;

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', updateScrollTrigger);
    window.addEventListener('scroll', updateScrollTrigger, { passive: true });

    const rafTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM has fully settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', updateScrollTrigger);
      lenis.destroy();
      gsap.ticker.remove(rafTicker);
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
