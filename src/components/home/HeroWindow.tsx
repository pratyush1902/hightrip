'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Compass, 
  ArrowRight, 
  ArrowUpRight, 
  Plane, 
  Navigation, 
  Heart,
  ChevronDown
} from 'lucide-react';
import { destinations } from '@/data/destinations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroWindow() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(0);

  const stages = [
    {
      id: 'travel',
      word: 'TRAVEL.',
      kicker: '01 / THE DEPARTURE',
      title: 'Take the window seat.',
      dek: 'To leave the familiar behind. Turquoise atolls, uninterrupted horizons, and the quiet thrill of rising into the sky at 35,000 feet.',
      destination: destinations.find((d) => d.slug === 'maldives')!,
      callsign: 'FLIGHT HT-MLE · LAGOON DEPARTURE',
      coordinates: '04°10\'N · 73°30\'E',
      metrics: 'ALT 35,000 FT · SPEED 480 KTS',
      icon: Plane,
      photo: 'https://images.unsplash.com/photo-1620065487644-1080510335f5?auto=format&fit=crop&w=2000&q=85',
    },
    {
      id: 'explore',
      word: 'EXPLORE.',
      kicker: '02 / THE PASSAGE',
      title: 'Wander into the unmapped.',
      dek: 'Limestone karsts rising from emerald waters, ancient lantern-lit river alleys, and high Alpine rail passes where trains glide through clouds.',
      destination: destinations.find((d) => d.slug === 'vietnam')!,
      callsign: 'EXPEDITION HT-HAN · KARST & ALPS',
      coordinates: '21°01\'N · 105°51\'E',
      metrics: 'WAYPOINT LAN HA · 400 ISLETS',
      icon: Navigation,
      photo: 'https://images.unsplash.com/photo-1726346234848-a6c0e78efd8c?auto=format&fit=crop&w=2000&q=85',
    },
    {
      id: 'experience',
      word: 'EXPERIENCE.',
      kicker: '03 / THE TRANSFORMATION',
      title: 'Journeys that stay with you.',
      dek: 'Not merely seeing a place, but feeling its past. Tasting cliffside lemon groves in Amalfi, quiet tea mist in Munnar, and standing in stillness at sacred memorials.',
      destination: destinations.find((d) => d.slug === 'italy')!,
      callsign: 'JOURNEY HT-FCO · MEANINGFUL TRAILS',
      coordinates: '40°41\'N · 14°29\'E',
      metrics: 'REFLECTION · HISTORIC ARCHIVES',
      icon: Heart,
      photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=85',
    },
  ];

  useEffect(() => {
    if (!triggerRef.current || !pinTargetRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Use GSAP ScrollTrigger to pin the pinTargetRef inside triggerRef
      ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: pinTargetRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveStage(0);
          } else if (progress < 0.68) {
            setActiveStage(1);
          } else {
            setActiveStage(2);
          }
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const goToStage = (index: 0 | 1 | 2) => {
    setActiveStage(index);
    if (!triggerRef.current) return;
    const trigger = triggerRef.current;
    const rect = trigger.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const startY = rect.top + scrollTop;
    const totalDist = trigger.offsetHeight - window.innerHeight;
    const targetY = startY + totalDist * (index / 2);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const current = stages[activeStage];

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-[280vh] bg-obsidian text-parchment"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinTargetRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between relative bg-obsidian"
      >
        {/* Background Visual Layer */}
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeStage ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <Image
              src={stage.photo}
              alt={stage.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.5] contrast-[1.1] scale-100 transition-transform duration-[6000ms]"
            />
          </div>
        ))}

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-black/70 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(13,11,9,0.85)_100%)] z-10 pointer-events-none" />

        {/* Interactive Vector Motion Graphics Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Subtle Latitude/Longitude Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Dynamic Stage Motion Graphic SVG */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] max-w-full max-h-full pointer-events-none opacity-40 transition-all duration-700"
            viewBox="0 0 800 800"
            fill="none"
          >
            {/* Concentric Gyroscope / Radar Dial */}
            <circle
              cx="400"
              cy="400"
              r="340"
              stroke="#c48c58"
              strokeWidth="0.75"
              strokeDasharray="6 8"
              className="animate-[spin_80s_linear_infinite]"
            />
            <circle
              cx="400"
              cy="400"
              r="240"
              stroke="#f3eadb"
              strokeWidth="0.75"
              strokeDasharray="3 9"
              className="animate-[spin_50s_linear_infinite_reverse]"
            />
            <circle
              cx="400"
              cy="400"
              r="150"
              stroke="#e2b785"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Flight Vector Path for Stage 1: TRAVEL */}
            {activeStage === 0 && (
              <g className="transition-all duration-700">
                <path
                  d="M120,620 Q400,180 680,260"
                  stroke="#e2b785"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  fill="none"
                />
                <circle cx="680" cy="260" r="8" fill="#e2b785" className="animate-ping" />
                <circle cx="680" cy="260" r="5" fill="#c48c58" />
                <path d="M680,260 L650,245 L660,260 L650,275 Z" fill="#e2b785" />
              </g>
            )}

            {/* Topographic Contours for Stage 2: EXPLORE */}
            {activeStage === 1 && (
              <g className="transition-all duration-700">
                <polygon
                  points="400,160 580,340 500,560 300,560 220,340"
                  stroke="#c48c58"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                  fill="none"
                  className="animate-[spin_40s_linear_infinite]"
                />
                <polygon
                  points="400,220 520,340 470,490 330,490 280,340"
                  stroke="#e2b785"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
                <circle cx="400" cy="400" r="7" fill="#e2b785" />
              </g>
            )}

            {/* Sensory Arc & Transformation for Stage 3: EXPERIENCE */}
            {activeStage === 2 && (
              <g className="transition-all duration-700">
                <path
                  d="M200,400 A200,200 0 0,1 600,400"
                  stroke="#e2b785"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M250,400 A150,150 0 0,1 550,400"
                  stroke="#c48c58"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  fill="none"
                />
                <circle cx="400" cy="280" r="6" fill="#e2b785" className="animate-pulse" />
                <line x1="400" y1="400" x2="400" y2="280" stroke="#c48c58" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            )}
          </svg>

          {/* Aircraft Window Outer Silhouette Border */}
          <div className="absolute inset-4 sm:inset-8 lg:inset-12 border border-sand/20 rounded-[2.5rem] sm:rounded-[3.5rem] pointer-events-none opacity-40" />
        </div>

        {/* Top Status Bar (Below Fixed Nav) */}
        <div className="relative z-20 pt-24 px-4 sm:px-8 lg:px-12 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-sand/15 text-bronze-light flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
              <span>{current.callsign}</span>
            </span>
            <span className="hidden md:inline-block bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-sand/10 text-sand/80">
              {current.coordinates}
            </span>
          </div>

          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-sand/15 text-sand font-bold">
            PHASE 0{activeStage + 1} / 03
          </div>
        </div>

        {/* Main Center Content Box */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center my-auto py-2">
          {/* Big Kinetic Tagline Word: TRAVEL. / EXPLORE. / EXPERIENCE. */}
          <div className="mb-2">
            <span className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase text-parchment drop-shadow-2xl inline-block transition-all duration-700">
              {current.word}
            </span>
          </div>

          {/* Kicker & Editorial Title */}
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze-light block">
              {current.kicker}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-parchment leading-tight tracking-tight">
              {current.title}
            </h1>
            <p className="text-xs sm:text-base text-sand/90 font-light leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
              {current.dek}
            </p>
          </div>

          {/* Current Destination Pill */}
          <div className="mt-5 inline-flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-sand/25 px-4 py-1.5 rounded-full text-xs font-mono">
            <span className="text-bronze font-bold">{current.destination.airportCode}</span>
            <span className="text-sand/40">·</span>
            <span className="text-sand">{current.destination.name}</span>
            <span className="text-sand/40">·</span>
            <span className="text-bronze-light">Starting from ₹{current.destination.startingPriceINR.toLocaleString('en-IN')}</span>
            <Link
              href={`/destinations/${current.destination.slug}`}
              className="ml-1 inline-flex items-center gap-1 text-parchment hover:text-bronze transition-colors underline"
            >
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#trip-finder"
              className="px-6 py-2.5 rounded-full bg-bronze-gradient text-obsidian font-semibold text-xs tracking-wider uppercase shadow-lg hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Find Your Journey</span>
            </a>

            <Link
              href="/packages"
              className="px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-sand/30 hover:border-bronze text-parchment text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
            >
              <span>All 5 Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Stage Progress Selector Bar */}
        <div className="relative z-20 pb-6 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Stage Buttons */}
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-sand/15">
            {stages.map((stg, i) => {
              const Icon = stg.icon;
              const isActive = i === activeStage;
              return (
                <button
                  key={stg.id}
                  onClick={() => goToStage(i as 0 | 1 | 2)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-bronze-gradient text-obsidian font-bold shadow'
                      : 'text-sand/70 hover:text-parchment'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>0{i + 1}</span>
                  <span>{stg.id.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Down Prompt */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-sand/80">
            <span className="hidden sm:inline">Scroll to progress: Travel → Explore → Experience</span>
            <div className="w-5 h-8 rounded-full border border-sand/30 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-bronze animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
