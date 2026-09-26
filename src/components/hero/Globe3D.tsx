'use client';

import { useEffect, useRef } from 'react';
import createGlobe, { Marker, Arc } from 'cobe';

interface Globe3DProps {
  className?: string;
  activeDestinationIndex?: number;
}

const DESTINATIONS = [
  { location: [14.0583, 108.2772] as [number, number], name: 'Vietnam' },
  { location: [46.8182, 8.2275] as [number, number], name: 'Switzerland' },
  { location: [36.2048, 138.2529] as [number, number], name: 'Japan' },
  { location: [3.2028, 73.2207] as [number, number], name: 'Maldives' },
  { location: [-8.4095, 115.1889] as [number, number], name: 'Bali' },
];

const FLIGHT_ARCS: Arc[] = [
  { from: [14.0583, 108.2772], to: [36.2048, 138.2529], color: [0.89, 0.72, 0.52] }, // Vietnam -> Japan
  { from: [36.2048, 138.2529], to: [46.8182, 8.2275], color: [0.89, 0.72, 0.52] }, // Japan -> Switzerland
  { from: [46.8182, 8.2275], to: [3.2028, 73.2207], color: [0.89, 0.72, 0.52] },   // Switzerland -> Maldives
  { from: [3.2028, 73.2207], to: [-8.4095, 115.1889], color: [0.89, 0.72, 0.52] }, // Maldives -> Bali
  { from: [-8.4095, 115.1889], to: [14.0583, 108.2772], color: [0.89, 0.72, 0.52] }, // Bali -> Vietnam
];

export function Globe3D({ className = '', activeDestinationIndex = 0 }: Globe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const trail3Ref = useRef<HTMLDivElement>(null);

  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.25);
  const orbitAngleRef = useRef(0);

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth || 340;
      }
    };
    updateDimensions();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const globeWidth = width || 340;

    let currentPhi = 0;
    let currentTheta = 0.25;
    let animId: number;

    const markers: Marker[] = DESTINATIONS.map((d, idx) => ({
      location: d.location,
      size: idx === activeDestinationIndex ? 0.12 : 0.07,
      color: idx === activeDestinationIndex ? [0.95, 0.85, 0.65] : [0.77, 0.55, 0.35],
    }));

    let globe: ReturnType<typeof createGlobe> | null = null;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: globeWidth,
        height: globeWidth,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.25,
        scale: 1,
        mapSamples: 8000,
        mapBrightness: 4.8,
        baseColor: [0.18, 0.15, 0.12],
        markerColor: [0.89, 0.72, 0.52],
        glowColor: [0.77, 0.55, 0.35],
        markers,
        arcs: FLIGHT_ARCS,
        arcColor: [0.89, 0.72, 0.52],
        arcWidth: 1.5,
        arcHeight: 0.45,
      });
    } catch (e) {
      console.warn('Globe3D WebGL initialization fallback:', e);
    }

    // Secondary animation loop for Orbiting Brand Aircraft + Globe rotation
    const animatePlane = () => {
      if (globe) {
        if (!pointerInteracting.current) {
          phiRef.current += 0.003;
        }
        currentPhi += (phiRef.current - currentPhi) * 0.1;
        currentTheta += (thetaRef.current - currentTheta) * 0.1;
        globe.update({ phi: currentPhi, theta: currentTheta });
      }

      orbitAngleRef.current += 0.009;
      const a = orbitAngleRef.current;

      if (containerRef.current && planeRef.current) {
        const w = containerRef.current.offsetWidth || 340;
        const h = containerRef.current.offsetHeight || 340;

        const rx = w * 0.56;
        const ry = h * 0.26;

        const tiltRad = -24 * (Math.PI / 180);
        const cosTilt = Math.cos(tiltRad);
        const sinTilt = Math.sin(tiltRad);

        const u = rx * Math.cos(a);
        const v = ry * Math.sin(a);

        const x = u * cosTilt - v * sinTilt;
        const y = u * sinTilt + v * cosTilt;

        const z = Math.sin(a);
        const isFront = z >= 0;

        const du = -rx * Math.sin(a);
        const dv = ry * Math.cos(a);
        const dx = du * cosTilt - dv * sinTilt;
        const dy = du * sinTilt + dv * cosTilt;
        const heading = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        const scale = isFront ? 0.95 + 0.3 * z : 0.72 + 0.15 * (z + 1);
        const opacity = isFront ? 1 : 0.45;
        const zIndex = isFront ? 25 : 5;

        planeRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${heading}deg) scale(${scale})`;
        planeRef.current.style.opacity = `${opacity}`;
        planeRef.current.style.zIndex = `${zIndex}`;

        const updateTrail = (
          el: HTMLDivElement | null,
          offset: number,
          baseScale: number,
          baseOpacity: number
        ) => {
          if (!el) return;
          const trailA = a - offset;
          const tu = rx * Math.cos(trailA);
          const tv = ry * Math.sin(trailA);
          const tx = tu * cosTilt - tv * sinTilt;
          const ty = tu * sinTilt + tv * cosTilt;
          const tz = Math.sin(trailA);
          const tIsFront = tz >= 0;
          el.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${
            baseScale * (tIsFront ? 1 : 0.7)
          })`;
          el.style.opacity = `${baseOpacity * (tIsFront ? opacity : opacity * 0.4)}`;
          el.style.zIndex = `${tIsFront ? 24 : 4}`;
        };

        updateTrail(trail1Ref.current, 0.08, 0.85, 0.65);
        updateTrail(trail2Ref.current, 0.16, 0.65, 0.4);
        updateTrail(trail3Ref.current, 0.24, 0.45, 0.2);
      }

      animId = requestAnimationFrame(animatePlane);
    };

    animId = requestAnimationFrame(animatePlane);

    const onResize = () => {
      updateDimensions();
      if (globe && containerRef.current) {
        const newW = containerRef.current.offsetWidth || 340;
        globe.update({
          width: newW,
          height: newW,
        });
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      if (globe) globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [activeDestinationIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none touch-pan-y ${className}`}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
        }
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
      }}
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse' && pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          phiRef.current = delta * 0.008;
        }
      }}
    >
      {/* Ambient luxury halo & atmospheric glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c48c58]/15 via-[#e2b785]/10 to-transparent blur-3xl scale-95 pointer-events-none" />

      {/* Tilted Navigational Orbit Trajectory Ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 400 400"
      >
        <g transform="translate(200, 200) rotate(-24)">
          <ellipse
            cx="0"
            cy="0"
            rx="224"
            ry="104"
            fill="none"
            stroke="url(#orbit-path-gradient)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-40"
          />
        </g>
        <defs>
          <linearGradient id="orbit-path-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2b785" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c48c58" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8a5a33" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* WebGL 3D Globe Canvas (Z-Index: 12) */}
      <canvas
        ref={canvasRef}
        className="relative z-12 w-full h-full aspect-square"
        style={{ width: '100%', height: '100%', maxWidth: '100%', aspectRatio: '1' }}
      />

      {/* Contrail Vapor Particles (behind the airplane) */}
      <div
        ref={trail3Ref}
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#c48c58] blur-[1px] pointer-events-none will-change-transform"
      />
      <div
        ref={trail2Ref}
        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#e2b785] blur-[1px] pointer-events-none will-change-transform"
      />
      <div
        ref={trail1Ref}
        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-[#f3eadb] blur-[1px] pointer-events-none will-change-transform"
      />

      {/* High Trip Holidays Orbiting Aircraft (From Brand Logo) */}
      <div
        ref={planeRef}
        className="absolute top-1/2 left-1/2 pointer-events-none will-change-transform transition-[opacity] duration-300"
      >
        <svg
          viewBox="0 0 730 668"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_4px_16px_rgba(226,183,133,0.7)]"
        >
          <defs>
            <linearGradient id="orbiting-brand-aircraft-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbf9f5" />
              <stop offset="45%" stopColor="#e2b785" />
              <stop offset="100%" stopColor="#c48c58" />
            </linearGradient>
          </defs>
          <path
            d="M365.5 0.5 L374.0 3.0 L382.0 8.5 L389.0 17.5 L395.0 30.5 L399.0 46.5 L401.5 64.5 L402.0 82.5 L402.0 258.5 L667.0 402.5 L667.0 426.5 L399.0 364.5 L396.0 438.5 L387.0 582.5 L385.0 598.5 L444.0 640.5 L444.0 666.5 L377.0 656.5 L365.5 672.5 L354.0 656.5 L287.0 666.5 L287.0 640.5 L346.0 598.5 L344.0 582.5 L335.0 438.5 L332.0 364.5 L64.0 426.5 L64.0 402.5 L329.0 258.5 L329.0 82.5 L329.5 64.5 L332.0 46.5 L336.0 30.5 L342.0 17.5 L349.0 8.5 L357.0 3.0Z"
            fill="url(#orbiting-brand-aircraft-grad)"
          />
        </svg>
      </div>
    </div>
  );
}
