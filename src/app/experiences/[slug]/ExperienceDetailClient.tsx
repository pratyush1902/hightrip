'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { AvailableExperience, ethicalCode } from '@/data/experiences';
import { InquiryModal } from '@/components/common/InquiryModal';
import { FadeReveal } from '@/components/animation/FadeReveal';

interface ExperienceDetailClientProps {
  exp: AvailableExperience;
}

export function ExperienceDetailClient({ exp }: ExperienceDetailClientProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Navigation Breadcrumb */}
        <FadeReveal>
          <nav className="flex items-center gap-2 text-xs font-mono text-muted-stone">
            <Link href="/" className="hover:text-parchment transition-colors">Home</Link>
            <span>/</span>
            <Link href="/experiences" className="hover:text-parchment transition-colors">Experiences</Link>
            <span>/</span>
            <span className="text-bronze">{exp.name}</span>
          </nav>
        </FadeReveal>

        {/* Hero Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <FadeReveal>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Experience · {exp.location}
                </span>
                <span className="font-mono text-xs text-muted-stone">
                  {exp.id}
                </span>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-parchment leading-tight">
                {exp.name}
              </h1>
            </FadeReveal>

            <FadeReveal delay={0.15}>
              <p className="font-serif italic text-lg sm:text-2xl text-sand/90 font-light leading-relaxed max-w-3xl">
                “{exp.oneLine}”
              </p>
            </FadeReveal>

            {/* CTAs */}
            <FadeReveal delay={0.2} className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(exp.name)}%20Experience`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                </svg>
                <span>Plan this journey</span>
              </a>

              <a
                href="tel:+919155566268"
                className="px-6 py-3.5 rounded-full bg-obsidian-surface border border-obsidian-border hover:border-bronze/40 text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-bronze" />
                <span>Call us</span>
              </a>

              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="px-6 py-3.5 rounded-full bg-transparent border border-obsidian-border hover:border-bronze/30 text-muted-stone hover:text-parchment font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                Send an enquiry
              </button>
            </FadeReveal>
          </div>

          {/* Hero Visual Image */}
          <FadeReveal delay={0.25}>
            <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-obsidian-border shadow-2xl bg-obsidian-surface">
              <Image
                src={exp.heroImage}
                alt={exp.name}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
            </div>
          </FadeReveal>
        </section>

        {/* The Story & Key Facts Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Story Column */}
          <div className="lg:col-span-8 space-y-6">
            <FadeReveal>
              <div className="space-y-2 border-b border-obsidian-border pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze">
                  The Story
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-parchment">
                  A place with a memory.
                </h2>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.1}>
              <p className="text-base sm:text-lg text-parchment leading-relaxed font-light">
                {exp.story.lead}
              </p>
            </FadeReveal>

            <FadeReveal delay={0.2}>
              <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-surface border border-obsidian-border text-sm sm:text-base text-sand/90 font-light leading-relaxed">
                {exp.story.fullStory}
              </div>
            </FadeReveal>
          </div>

          {/* Key Facts Sheet Column */}
          <div className="lg:col-span-4 space-y-6">
            <FadeReveal delay={0.15}>
              <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Key Historical Facts
                </span>
                <div className="divide-y divide-obsidian-border text-xs">
                  {exp.keyFacts.map((fact, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                      <span className="font-mono text-muted-stone block">{fact.label}</span>
                      <span className="text-sand font-medium leading-relaxed block">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeReveal>
          </div>
        </section>

        {/* Stops on the Trail */}
        <section className="space-y-8 border-t border-obsidian-border pt-12">
          <FadeReveal>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze">
                What you will see
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-parchment">
                Stops on the trail.
              </h2>
            </div>
          </FadeReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {exp.stopsOnTrail.map((stop, idx) => (
              <FadeReveal key={stop.num} delay={idx * 0.08}>
                <div className="p-6 rounded-2xl bg-obsidian-surface border border-obsidian-border hover:border-bronze/30 space-y-3 transition-colors">
                  <span className="font-mono text-lg text-bronze font-bold block">
                    {stop.num}
                  </span>
                  <h3 className="font-serif text-xl text-parchment">
                    {stop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                    {stop.desc}
                  </p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </section>

        {/* Practical Visiting Notes */}
        <section className="space-y-8 border-t border-obsidian-border pt-12">
          <FadeReveal>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze">
                Practical Intelligence
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-parchment">
                Visiting with dignity.
              </h2>
            </div>
          </FadeReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-obsidian-surface border border-obsidian-border space-y-3 h-full">
                <span className="font-mono text-xs text-bronze uppercase tracking-wider block">
                  When to go
                </span>
                <p className="text-xs sm:text-sm text-sand/90 font-light leading-relaxed">
                  {exp.practical.whenToGo}
                </p>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-obsidian-surface border border-obsidian-border space-y-3 h-full">
                <span className="font-mono text-xs text-bronze uppercase tracking-wider block">
                  Getting there
                </span>
                <p className="text-xs sm:text-sm text-sand/90 font-light leading-relaxed">
                  {exp.practical.gettingThere}
                </p>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-obsidian-surface border border-obsidian-border space-y-3 h-full">
                <span className="font-mono text-xs text-bronze uppercase tracking-wider block">
                  How to visit
                </span>
                <ul className="space-y-2 text-xs text-sand/90 font-light">
                  {exp.practical.howToVisit.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-bronze mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeReveal>
          </div>
        </section>

        {/* Footer CTA & Inquiry */}
        <section className="p-8 sm:p-12 rounded-3xl bg-obsidian-surface border border-obsidian-border space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
              Plan this experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment">
              Ready to walk {exp.name}?
            </h2>
            <p className="text-sm text-sand/80 font-light max-w-xl">
              Message us with your desired travel dates and group details. We will formulate a tailored route with verified heritage guides and current pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(exp.name)}%20Experience`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <span>WhatsApp Us Now</span>
            </a>

            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="px-8 py-3.5 rounded-full bg-obsidian border border-obsidian-border hover:border-bronze/40 text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Send an enquiry
            </button>
          </div>
        </section>
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultDestination={exp.location}
        defaultPackageTitle={`${exp.name} Experience`}
      />
    </div>
  );
}
