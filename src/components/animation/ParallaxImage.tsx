'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxImageProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 0.4
  className?: string;
}

export function ParallaxImage({
  children,
  speed = 0.2,
  className = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !targetRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const yMove = containerRef.current!.offsetHeight * speed;

      gsap.fromTo(
        targetRef.current,
        {
          y: -yMove / 2,
        },
        {
          y: yMove / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <div
        ref={targetRef}
        className="w-full h-[120%] -top-[10%] relative will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
