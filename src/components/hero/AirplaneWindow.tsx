'use client';

import Image from 'next/image';
import { HeroDestination } from '@/data/heroDestinations';

interface AirplaneWindowProps {
  destinations: HeroDestination[];
  activeDestinationIndex: number;
  frameRef?: React.RefObject<HTMLDivElement | null>;
  innerImageRef?: React.RefObject<HTMLDivElement | null>;
  isExpanded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AirplaneWindow({
  destinations,
  activeDestinationIndex,
  frameRef,
  innerImageRef,
  className = '',
  style,
}: AirplaneWindowProps) {
  return (
    <div
      ref={frameRef}
      className={`relative overflow-hidden will-change-[transform,border-radius,width,height] ${className}`}
      style={{
        borderRadius: '40% / 30%',
        ...style,
      }}
    >
      {/* Layered Airplane Window Bevel Frame (Simulates cabin window frame) */}
      <div
        className="airplane-window-frame-bevel absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 rounded-[inherit]"
        style={{
          boxShadow:
            'inset 0 0 0 12px rgba(20, 18, 16, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.15), 0 2px 4px rgba(20, 18, 16, 0.06), 0 36px 70px -34px rgba(20, 18, 16, 0.45)',
        }}
      />

      {/* Subtle Cabin Glass Glare Reflection */}
      <div
        className="airplane-window-glare absolute inset-0 pointer-events-none z-10 rounded-[inherit] transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-white/20"
      />

      {/* Inner Image Container */}
      <div
        ref={innerImageRef}
        className="relative w-full h-full overflow-hidden bg-[#181512] rounded-[inherit]"
      >
        {destinations.map((dest, idx) => {
          const isActive = idx === activeDestinationIndex;
          return (
            <div
              key={dest.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
              } transform transition-transform duration-[4000ms]`}
            >
              <Image
                src={dest.image}
                alt={`${dest.name} - ${dest.tagline}`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
