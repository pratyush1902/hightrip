'use client';

import { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Headphones,
  Compass,
  Landmark,
  MessageSquare,
} from 'lucide-react';
import { FadeReveal } from '@/components/animation/FadeReveal';
import { InquiryModal } from '@/components/common/InquiryModal';

const whyHighTripPillars = [
  {
    num: '01',
    title: 'THOUGHTFULLY CURATED',
    description: 'Every journey is built around the details that matter.',
    icon: Sparkles,
  },
  {
    num: '02',
    title: 'BEST RATES',
    description: 'Competitive pricing across flights, stays and experiences.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    title: 'HUMAN ASSISTANCE',
    description: 'Real people, real support when you need it.',
    icon: Headphones,
  },
  {
    num: '04',
    title: 'CUSTOM TRAVEL',
    description: 'Your dates. Your pace. Your journey.',
    icon: Compass,
  },
  {
    num: '05',
    title: 'EXPERIENCES BEYOND THE ORDINARY',
    description: 'Including our signature Dark Tourism experiences.',
    icon: Landmark,
  },
];

export function PhilosophyBanner() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <section className="py-24 sm:py-32 bg-obsidian border-t border-obsidian-border text-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Headline */}
          <FadeReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-bronze/50 inline-block" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze font-semibold">
                WHY HIGH TRIP?
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-bronze/50 inline-block" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment leading-tight font-bold tracking-tight">
              A slower, more deliberate way <br className="hidden sm:inline" />
              to <em className="italic text-bronze font-normal">cross the world.</em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We started High Trip Holidays because we were tired of generic package tourism with inflated prices, crowded busses, and invisible asterisks.
            </p>
          </FadeReveal>

          {/* 5 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {whyHighTripPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isLast = idx === whyHighTripPillars.length - 1;
              return (
                <FadeReveal
                  key={pillar.num}
                  delay={0.08 * (idx + 1)}
                  className={`p-6 sm:p-7 rounded-2xl bg-white border border-[#e8ded0] space-y-3.5 shadow-sm hover:shadow-md hover:border-bronze/50 transition-all flex flex-col justify-between group ${
                    isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div>
                    {/* Top Row: Number Tag & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold tracking-widest text-bronze">
                        {pillar.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-bronze/10 border border-bronze/20 flex items-center justify-center text-bronze group-hover:bg-bronze group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1c1917] leading-snug tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#57534e] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </FadeReveal>
              );
            })}
          </div>

          {/* Bottom Conversion Box */}
          <FadeReveal delay={0.4} className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-obsidian-surface via-obsidian-card to-obsidian-surface border border-bronze/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-2">
              <span className="font-mono text-xs text-bronze-light uppercase tracking-widest block">
                Begin The Conversation
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-parchment">
                Ready for your <em className="italic text-bronze font-normal">window seat?</em>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Tell us where you dream of going. We will return with a detailed, day-by-day concept itinerary within 12 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-bronze-gradient text-obsidian font-semibold text-sm tracking-wide shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Plan Your Journey</span>
              </button>

              <a
                href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20a%20holiday."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-700/50 hover:bg-emerald-900/50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Concierge</span>
              </a>
            </div>
          </FadeReveal>
        </div>
      </section>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
