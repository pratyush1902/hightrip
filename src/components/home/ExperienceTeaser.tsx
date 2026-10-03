'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Shield, BookOpen, Users, Compass } from 'lucide-react';
import { FadeReveal } from '@/components/animation/FadeReveal';
import { ImageReveal } from '@/components/animation/ImageReveal';

export function ExperienceTeaser() {
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-sandstone border border-obsidian-border rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <FadeReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze/10 border border-bronze/20 text-bronze-light text-xs font-mono mb-2">
                <Compass className="w-3.5 h-3.5 text-bronze" />
                <span>Meaningful Journeys</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment leading-[1.15]">
                Places with a past: <br />
                <em className="italic text-bronze-light font-normal">
                  History, done properly.
                </em>
              </h2>
            </FadeReveal>

            <FadeReveal delay={0.1}>
              <p className="text-base text-muted-foreground leading-relaxed">
                Travel is not only about paradise beaches. The most profound journeys take us into humanity’s complex chapters — from the former DMZ partition of Vietnam to the historic corridors of the Cellular Jail in Port Blair.
              </p>
              <p className="mt-3 text-sm text-sand/80 leading-relaxed font-light">
                We believe memory demands reverence rather than commercial spectacle. Our historical remembrance trails are curated alongside certified historians, with capped small groups and conservation contributions.
              </p>
            </FadeReveal>

            {/* Three Pillar Points */}
            <FadeReveal delay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-obsidian-border">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-bronze text-xs font-mono uppercase">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Scholarship</span>
                </div>
                <p className="text-xs text-muted-stone">
                  Contextual briefings precede every site visit.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-bronze text-xs font-mono uppercase">
                  <Users className="w-3.5 h-3.5" />
                  <span>Small Groups</span>
                </div>
                <p className="text-xs text-muted-stone">
                  Strictly capped at 12 travelers for quiet contemplation.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-bronze text-xs font-mono uppercase">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Conservation</span>
                </div>
                <p className="text-xs text-muted-stone">
                  Portion of booking fees goes directly to local heritage trusts.
                </p>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.3} className="pt-2">
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-md"
              >
                <span>Read Our Historical Trails Ethos</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </FadeReveal>
          </div>

          {/* Right Column: Visual Feature */}
          <div className="lg:col-span-6">
            <ImageReveal className="rounded-2xl border border-obsidian-border shadow-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1644406733884-f90d90af8bc8?auto=format&fit=crop&w=1400&q=85"
                alt="Historical perspective and quiet reflection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/75 backdrop-blur-md border border-white/15 p-4 sm:p-5 rounded-xl shadow-xl">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#e2b785] uppercase tracking-widest font-semibold block mb-1">
                  Field Dispatch · Port Blair & Vietnam DMZ
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#fbf9f5] leading-snug">
                  “A memorial is not a backdrop for a vacation selfie; it is a conversation across generations.”
                </p>
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
