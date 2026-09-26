'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StaggerRevealProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  childSelector?: string;
}

export function StaggerReveal({
  children,
  stagger = 0.12,
  duration = 0.75,
  yOffset = 35,
  className = '',
  childSelector = ':scope > *',
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(childSelector);
      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, duration, yOffset, childSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
