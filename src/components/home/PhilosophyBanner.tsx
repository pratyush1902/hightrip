'use client';

import { useState } from 'react';
import { CalendarCheck, ShieldCheck, Compass, MessageSquare, Phone } from 'lucide-react';
import { FadeReveal } from '@/components/animation/FadeReveal';
import { InquiryModal } from '@/components/common/InquiryModal';

export function PhilosophyBanner() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <section className="py-24 sm:py-32 bg-obsidian border-t border-obsidian-border text-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Headline */}
          <FadeReveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze-light block mb-3">
              The High Trip Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-parchment leading-tight">
              A slower, more deliberate way <br />
              to <em className="italic text-bronze font-normal">cross the world.</em>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We started High Trip Holidays because we were tired of generic package tourism with inflated prices, crowded busses, and invisible asterisks.
            </p>
          </FadeReveal>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeReveal delay={0.1} className="p-8 rounded-2xl bg-obsidian-surface border border-obsidian-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-bronze/10 border border-bronze/20 flex items-center justify-center text-bronze mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-parchment">
                Every price carries its date
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                We publish the exact validity date alongside every package price. When you inquire within that window, that price is honoured — no bait-and-switch.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.2} className="p-8 rounded-2xl bg-obsidian-surface border border-obsidian-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-bronze/10 border border-bronze/20 flex items-center justify-center text-bronze mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-parchment">
                Handpicked boutique stays
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                We refuse standardized charter hotels. We inspect every property for architectural character, proximity to nature, quiet balconies, and thoughtful service.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.3} className="p-8 rounded-2xl bg-obsidian-surface border border-obsidian-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-bronze/10 border border-bronze/20 flex items-center justify-center text-bronze mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-parchment">
                Personal concierge support
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                You receive a dedicated private concierge coordinator on WhatsApp available from the day of booking until your flight lands safely back home.
              </p>
            </FadeReveal>
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
