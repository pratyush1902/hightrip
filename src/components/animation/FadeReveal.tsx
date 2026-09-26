'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FadeRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  triggerOnce?: boolean;
}

export function FadeReveal({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 30,
  className = '',
  triggerOnce = true,
}: FadeRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(elRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elRef.current,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 88%',
            toggleActions: triggerOnce ? 'play none none none' : 'play reverse play reverse',
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay, duration, yOffset, triggerOnce]);

  return (
    <div ref={elRef} className={className} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}
