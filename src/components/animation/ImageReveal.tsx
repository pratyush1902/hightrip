'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ImageReveal({
  children,
  delay = 0,
  duration = 1.1,
  className = '',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(innerRef.current, { scale: 1, filter: 'brightness(1)' });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        containerRef.current,
        {
          clipPath: 'inset(12% 12% 12% 12%)',
          opacity: 0.6,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration,
          delay,
          ease: 'power3.inOut',
        }
      ).fromTo(
        innerRef.current,
        {
          scale: 1.15,
        },
        {
          scale: 1,
          duration: duration * 1.2,
          ease: 'power2.out',
        },
        '<'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative will-change-[clip-path,opacity] ${className}`}
    >
      <div ref={innerRef} className="w-full h-full relative will-change-transform">
        {children}
      </div>
    </div>
  );
}
