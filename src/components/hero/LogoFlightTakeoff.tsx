'use client';

import { useEffect, useRef } from 'react';

interface LogoFlightTakeoffProps {
  className?: string;
  isExpanded?: boolean;
}

export function LogoFlightTakeoff({
  className = '',
  isExpanded = false,
}: LogoFlightTakeoffProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D perspective mouse tilt (Desktop only)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    // Only apply mouse tilt for fine pointer (desktop mouse)
    const isMouse = window.matchMedia('(pointer: fine)').matches;
    if (!isMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      cardRef.current.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Ambient Runway / Luxury Radial Glow */}
      <div
        id="hero-flight-glow"
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700 will-change-transform"
        style={{
          background: isExpanded
            ? 'radial-gradient(circle at 50% 50%, rgba(226,183,133,0.15) 0%, rgba(196,140,88,0.05) 45%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(196,140,88,0.2) 0%, rgba(196,140,88,0.06) 42%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Outer Telemetry & Compass Dial (Contained responsively) */}
      <div
        id="hero-flight-hud"
        className="absolute inset-[-4%] sm:inset-[-8%] lg:inset-[-12%] pointer-events-none rounded-full border border-[#c48c58]/20 flex items-center justify-center will-change-[transform,opacity]"
      >
        {/* Cardinal Markers */}
        <div className="absolute top-1.5 sm:top-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          N · 000°
        </div>
        <div className="absolute bottom-1.5 sm:bottom-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          S · 180°
        </div>
        <div className="absolute left-1.5 sm:left-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          W
        </div>
        <div className="absolute right-1.5 sm:right-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          E
        </div>

        {/* Outer Tick Ring */}
        <div className="w-[90%] h-[90%] rounded-full border border-dashed border-[#c48c58]/15" />
      </div>

      {/* Main 3D Stage Card */}
      <div
        ref={cardRef}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg
          viewBox="-40 -60 810 820"
          className="w-full h-full overflow-visible drop-shadow-[0_16px_30px_rgba(24,21,18,0.16)]"
        >
          <defs>
            {/* High Trip Luxury Metallic Bronze / Gold Gradient */}
            <linearGradient id="ht-flight-bronze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3d7b4" />
              <stop offset="30%" stopColor="#e2b785" />
              <stop offset="65%" stopColor="#c48c58" />
              <stop offset="100%" stopColor="#8a5a33" />
            </linearGradient>

            {/* Aircraft Specular Highlight Gradient */}
            <linearGradient id="ht-flight-specular" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
            </linearGradient>

            {/* Pillar Strips Premium Obsidian / Bronze Gradient */}
            <linearGradient id="ht-strip-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2b2622" />
              <stop offset="50%" stopColor="#1e1a17" />
              <stop offset="100%" stopColor="#14110e" />
            </linearGradient>

            {/* Jet Engine Contrail Gradient (Golden vapor trail fading downward) */}
            <linearGradient id="ht-contrail-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="15%" stopColor="#f3d7b4" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#c48c58" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#c48c58" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#c48c58" stopOpacity="0" />
            </linearGradient>

            {/* Afterburner Core Plume Gradient */}
            <radialGradient id="ht-afterburner-core" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#fed7aa" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#f97316" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#c48c58" stopOpacity="0" />
            </radialGradient>

            {/* Drop Shadow & Glow Filters */}
            <filter id="ht-flight-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#8a5a33" floodOpacity="0.32" />
            </filter>
            <filter id="ht-afterburner-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* LAYER 1: THE TWO STRIP SETS (LEFT & RIGHT PILLARS)       */}
          {/* These structural architectural columns remain grounded!  */}
          {/* ======================================================== */}
          <g id="hero-strip-pillars" className="will-change-[transform,opacity]">
            {/* Left Pillar Set */}
            <g id="hero-strip-left" className="will-change-transform">
              {/* Outer Left Column */}
              <polygon
                points="0.0,203.5 63.0,171.5 63.0,668.0 0.0,668.0"
                fill="url(#ht-strip-grad)"
              />
              <line
                x1="63"
                y1="171.5"
                x2="63"
                y2="668"
                stroke="#c48c58"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />

              {/* Inner Left Column Top Segment */}
              <polygon
                points="139.0,138.5 202.0,106.5 202.0,316.0 139.0,350.2"
                fill="url(#ht-strip-grad)"
              />
              {/* Inner Left Column Bottom Segment */}
              <polygon
                points="139.0,419.5 202.0,404.7 202.0,668.0 139.0,668.0"
                fill="url(#ht-strip-grad)"
              />
              <line
                x1="202"
                y1="106.5"
                x2="202"
                y2="316"
                stroke="#c48c58"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <line
                x1="202"
                y1="404.7"
                x2="202"
                y2="668"
                stroke="#c48c58"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            </g>

            {/* Right Pillar Set */}
            <g id="hero-strip-right" className="will-change-transform">
              {/* Inner Right Column Top Segment */}
              <polygon
                points="528.0,74.5 591.0,106.5 591.0,349.7 528.0,315.5"
                fill="url(#ht-strip-grad)"
              />
              {/* Inner Right Column Bottom Segment */}
              <polygon
                points="528.0,404.5 591.0,419.2 591.0,668.0 528.0,668.0"
                fill="url(#ht-strip-grad)"
              />
              <line
                x1="528"
                y1="74.5"
                x2="528"
                y2="315.5"
                stroke="#c48c58"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <line
                x1="528"
                y1="404.5"
                x2="528"
                y2="668"
                stroke="#c48c58"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />

              {/* Outer Right Column */}
              <polygon
                points="667.0,139.5 730.0,171.5 730.0,668.0 667.0,668.0"
                fill="url(#ht-strip-grad)"
              />
              <line
                x1="667"
                y1="139.5"
                x2="667"
                y2="668"
                stroke="#c48c58"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />
            </g>

            {/* Ground Runway Lights */}
            <g id="hero-runway-beacons" opacity="0.85">
              {[180, 260, 480, 560, 640].map((yCoord, idx) => (
                <g key={`beacon-${idx}`}>
                  <circle cx="202" cy={yCoord} r="3" fill="#c48c58" opacity="0.85" />
                  <circle cx="202" cy={yCoord} r="6" fill="#c48c58" opacity="0.25" />
                  <circle cx="528" cy={yCoord} r="3" fill="#c48c58" opacity="0.85" />
                  <circle cx="528" cy={yCoord} r="6" fill="#c48c58" opacity="0.25" />
                </g>
              ))}
            </g>
          </g>

          {/* ======================================================== */}
          {/* LAYER 2: CONTRAILS / ENGINE JET EXHAUST TRAILS           */}
          {/* Attached to the aircraft and expands downwards           */}
          {/* ======================================================== */}
          <g
            id="hero-flight-contrails"
            className="will-change-[transform,opacity]"
            style={{ opacity: 0 }}
          >
            {/* Left Engine Contrail Vapor Stream */}
            <path
              d="M348 656 C 348 760, 336 940, 330 1150 L 354 1150 C 354 940, 356 760, 356 656 Z"
              fill="url(#ht-contrail-grad)"
            />
            {/* Right Engine Contrail Vapor Stream */}
            <path
              d="M374 656 C 374 760, 376 940, 376 1150 L 400 1150 C 394 940, 382 760, 382 656 Z"
              fill="url(#ht-contrail-grad)"
            />

            {/* Luminous Afterburner Exhaust Flames */}
            <g filter="url(#ht-afterburner-glow)">
              <ellipse cx="351" cy="666" rx="6" ry="18" fill="url(#ht-afterburner-core)" />
              <ellipse cx="379" cy="666" rx="6" ry="18" fill="url(#ht-afterburner-core)" />
              <ellipse cx="365.5" cy="672" rx="4" ry="12" fill="#ffffff" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* LAYER 3: CENTRAL AIRCRAFT (FLIGHT)                       */}
          {/* Flies smoothly UPWARDS, leaving the two strips behind!   */}
          {/* ======================================================== */}
          <g
            id="hero-flight-jet"
            filter="url(#ht-flight-shadow)"
            className="will-change-[transform,opacity]"
            style={{ transformOrigin: '365.5px 336px' }}
          >
            {/* The Iconic HighTrip Flight Symbol */}
            <path
              d="M365.5 0.5 L374.0 3.0 L382.0 8.5 L389.0 17.5 L395.0 30.5 L399.0 46.5 L401.5 64.5 L402.0 82.5 L402.0 258.5 L667.0 402.5 L667.0 426.5 L399.0 364.5 L396.0 438.5 L387.0 582.5 L385.0 598.5 L444.0 640.5 L444.0 666.5 L377.0 656.5 L365.5 672.5 L354.0 656.5 L287.0 666.5 L287.0 640.5 L346.0 598.5 L344.0 582.5 L335.0 438.5 L332.0 364.5 L64.0 426.5 L64.0 402.5 L329.0 258.5 L329.0 82.5 L329.5 64.5 L332.0 46.5 L336.0 30.5 L342.0 17.5 L349.0 8.5 L357.0 3.0Z"
              fill="url(#ht-flight-bronze)"
            />

            {/* Wing Leading Edge Specular Gleam */}
            <path
              d="M365.5 0.5 L374.0 3.0 L382.0 8.5 L389.0 17.5 L401.5 64.5 L402.0 258.5 L667.0 402.5 L667.0 412.0 L402.0 270.0 Z"
              fill="url(#ht-flight-specular)"
            />
            <path
              d="M365.5 0.5 L357.0 3.0 L349.0 8.5 L342.0 17.5 L329.5 64.5 L329.0 258.5 L64.0 402.5 L64.0 412.0 L329.0 270.0 Z"
              fill="url(#ht-flight-specular)"
            />

            {/* Cockpit Canopy Centerline Reflection */}
            <line
              x1="365.5"
              y1="40"
              x2="365.5"
              y2="180"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />

            {/* Fuselage Dorsal Line */}
            <line
              x1="365.5"
              y1="220"
              x2="365.5"
              y2="540"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />
          </g>
        </svg>
      </div>

      {/* Floating Aviation Flight Telemetry Badge (Responsively positioned) */}
      <div
        id="hero-flight-badge"
        className="absolute -bottom-5 sm:-bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#181512]/90 text-[#fbf9f5] border border-[#c48c58]/35 backdrop-blur-md shadow-lg pointer-events-none font-mono text-[9px] sm:text-[10px] tracking-wider whitespace-nowrap will-change-[transform,opacity]"
      >
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c48c58] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c48c58]" />
        </span>
        <span id="hero-flight-status" className="text-[#c48c58] font-semibold">
          HT-FLIGHT READY
        </span>
        <span className="text-[#8a8278]">·</span>
        <span id="hero-flight-altitude">ALT 0 FT</span>
      </div>
    </div>
  );
}
