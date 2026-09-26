'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScaleRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  fromScale?: number;
}

export function ScaleReveal({
  children,
  delay = 0,
  duration = 0.9,
  className = '',
  fromScale = 0.94,
}: ScaleRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(elRef.current, { scale: 1, opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elRef.current,
        {
          scale: fromScale,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay, duration, fromScale]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
