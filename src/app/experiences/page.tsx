'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  X, 
  Check, 
  Compass, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { 
  availableExperiences, 
  researchingExperiences, 
  ethicalCode,
  AvailableExperience,
  ResearchingExperience 
} from '@/data/experiences';
import { FadeReveal } from '@/components/animation/FadeReveal';
import { InquiryModal } from '@/components/common/InquiryModal';

export default function ExperiencesPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<AvailableExperience | null>(null);
  const [inquiryExpTitle, setInquiryExpTitle] = useState('');

  const openInquiry = (title: string = 'Experience (Dark Tourism)') => {
    setInquiryExpTitle(title);
    setInquiryOpen(true);
  };

  return (
    <div className="bg-obsidian min-h-screen text-parchment selection:bg-bronze/30 selection:text-bronze-light">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden border-b border-obsidian-border">
        {/* Background Subtle Gradient & Ambience */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80"
            alt="The abandoned sandstone ruins of Kuldhara under quiet desert sky"
            fill
            priority
            className="object-cover object-center grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <FadeReveal>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                Experiences
              </span>
            </FadeReveal>

            <FadeReveal delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-parchment leading-[1.08] tracking-tight">
                Travel beyond <br />
                <em className="italic text-bronze-light font-normal">the obvious.</em>
              </h1>
            </FadeReveal>

            <FadeReveal delay={0.2}>
              <p className="font-serif italic text-lg sm:text-2xl text-sand/90 font-light leading-relaxed">
                Abandoned villages, memorials and places of legend, visited the way they deserve.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.25}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-obsidian-surface border border-bronze/30 text-bronze-light text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
                <span>India’s only travel company that takes dark tourism into mainstream travel</span>
              </div>
            </FadeReveal>

            {/* Action Buttons Cluster */}
            <FadeReveal delay={0.3} className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20an%20Experience%20(dark%20tourism)."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                </svg>
                <span>WhatsApp us</span>
              </a>

              <a
                href="tel:+919155566268"
                className="px-6 py-3.5 rounded-full bg-obsidian-surface border border-obsidian-border hover:border-bronze/40 text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-bronze" />
                <span>Call +91 91555 66268</span>
              </a>

              <a
                href="#available"
                className="px-6 py-3.5 rounded-full bg-transparent border border-obsidian-border hover:border-bronze/30 text-muted-stone hover:text-parchment font-mono text-xs tracking-wider uppercase transition-all"
              >
                See the places
              </a>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* 2. Available Experiences (#available) */}
      <section id="available" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeReveal>
          <div className="space-y-2 border-b border-obsidian-border pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze">
              Available experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-parchment leading-tight">
              Places we can <em className="italic text-bronze-light font-normal">take you now.</em>
            </h2>
          </div>
        </FadeReveal>

        {/* 8 Experience Rows */}
        <div className="space-y-8">
          {availableExperiences.map((exp, idx) => (
            <FadeReveal key={exp.slug} delay={idx * 0.05}>
              <div 
                className="group relative bg-obsidian-surface border border-obsidian-border hover:border-bronze/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedExp(exp)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Photo Column */}
                  <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-obsidian-border bg-obsidian">
                    <Image
                      src={exp.heroImage}
                      alt={exp.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-obsidian/85 backdrop-blur-md border border-bronze/30 font-mono text-[11px] text-bronze-light font-bold">
                        {exp.id}
                      </span>
                    </div>
                  </div>

                  {/* Copy Column */}
                  <div className="lg:col-span-7 space-y-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-bronze-light uppercase tracking-wider">
                        {exp.location}
                      </span>
                      <span className="hidden sm:inline-block font-mono text-xs text-muted-stone">
                        {exp.id}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-4xl text-parchment group-hover:text-bronze-light transition-colors">
                      {exp.name}
                    </h3>

                    <p className="text-sm sm:text-base text-sand/80 leading-relaxed font-light">
                      {exp.oneLine}
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExp(exp);
                        }}
                        className="inline-flex items-center gap-2 font-mono text-xs text-bronze hover:text-bronze-light uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Walk this one</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>

                      <Link
                        href={`/experiences/${exp.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-stone hover:text-sand transition-colors"
                      >
                        <span>Full Dossier</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeReveal>
          ))}
        </div>
      </section>

      {/* 3. Quote Callout */}
      <section className="py-20 sm:py-24 border-y border-obsidian-border bg-obsidian-surface/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <FadeReveal>
            <p className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-parchment leading-tight">
              “History has a darker side. We choose to understand it.”
            </p>
          </FadeReveal>
          <FadeReveal delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
              High Trip Holidays
            </span>
          </FadeReveal>
        </div>
      </section>

      {/* 4. Researching Pipeline (#researching) */}
      <section id="researching" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeReveal>
          <div className="space-y-2 border-b border-obsidian-border pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze">
              Stories we’re researching
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-parchment leading-tight">
              Not yet <em className="italic text-bronze-light font-normal">on sale.</em>
            </h2>
          </div>
        </FadeReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {researchingExperiences.map((item, idx) => (
            <FadeReveal key={item.slug} delay={idx * 0.05}>
              <div className="group bg-obsidian-surface border border-obsidian-border hover:border-bronze/30 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300">
                <div className="relative aspect-[4/3] bg-obsidian overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-obsidian/90 backdrop-blur-md border border-obsidian-border font-mono text-[11px] text-muted-stone uppercase tracking-wider">
                      Researching
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-bronze-light uppercase tracking-wider block">
                      {item.location}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-parchment group-hover:text-bronze-light transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                      {item.oneLine}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-obsidian-border/60">
                    <span className="font-mono text-[11px] text-muted-stone flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-bronze/60" />
                      Archive & route research underway
                    </span>
                  </div>
                </div>
              </div>
            </FadeReveal>
          ))}
        </div>
      </section>

      {/* 5. The Ethical Code ("The code") */}
      <section className="py-20 sm:py-28 border-t border-obsidian-border bg-obsidian-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <FadeReveal>
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                The code
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-parchment leading-tight">
                Not a horror tour. <br />
                <em className="italic text-bronze-light font-normal">A deeper kind of travel.</em>
              </h2>
            </div>
          </FadeReveal>

          {/* 5 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ethicalCode.map((code, idx) => (
              <FadeReveal key={code.num} delay={idx * 0.08}>
                <div className="bg-obsidian-surface border border-obsidian-border hover:border-bronze/30 rounded-2xl p-6 h-full flex flex-col justify-between space-y-6 transition-colors">
                  <span className="font-mono text-2xl text-bronze font-bold block">
                    {code.num}
                  </span>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-parchment">
                      {code.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-sand/80 font-light leading-relaxed">
                      {code.desc}
                    </p>
                  </div>
                </div>
              </FadeReveal>
            ))}
          </div>

          {/* Code Footnote Citation */}
          <FadeReveal delay={0.4}>
            <div className="pt-4 border-t border-obsidian-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-muted-stone">
              <p>
                After the ethics notes on{' '}
                <a
                  href="https://www.dark-tourism.com/index.php/602-ethical-issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bronze hover:underline inline-flex items-center gap-1"
                >
                  dark-tourism.com <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </p>
              <div className="flex items-center gap-3">
                <Link href="/responsible-travel" className="text-sand hover:text-parchment hover:underline">
                  The whole code
                </Link>
                <span>·</span>
                <span>14 places researched</span>
              </div>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* 6. Tell Us About an Experience (Bottom Ask / CTA) */}
      <section className="py-20 sm:py-28 border-t border-obsidian-border bg-obsidian-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                Today’s price, after the calls
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-parchment leading-tight">
                Tell us about <em className="italic text-bronze-light font-normal">an Experience.</em>
              </h2>
              <p className="text-sm sm:text-base text-sand/80 font-light leading-relaxed max-w-xl">
                Message us with the place, the dates and how many are travelling. We reply with a plan and today’s price, usually within the hour in India hours.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20an%20Experience.%20Where%2C%20when%20and%20how%20many%3A%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                  </svg>
                  <span>WhatsApp +91 91555 66268</span>
                </a>

                <a
                  href="tel:+919155566268"
                  className="px-6 py-4 rounded-full bg-obsidian border border-obsidian-border hover:border-bronze/40 text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-bronze" />
                  <span>Call us</span>
                </a>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-muted-stone pt-1">
                <button
                  type="button"
                  onClick={() => openInquiry('Bespoke Dark Tourism Experience')}
                  className="text-bronze hover:underline cursor-pointer"
                >
                  Send an enquiry →
                </button>
                <span>·</span>
                <a
                  href="mailto:sales@hightripholidays.in"
                  className="hover:text-parchment transition-colors"
                >
                  sales@hightripholidays.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Detail Modal for Active Trail */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-obsidian-surface border border-obsidian-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-6 py-4 border-b border-obsidian-border flex items-center justify-between bg-obsidian">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-bronze font-bold">
                  {selectedExp.id}
                </span>
                <span className="font-mono text-xs text-muted-stone">
                  {selectedExp.location}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="p-2 rounded-full hover:bg-obsidian-border text-muted-stone hover:text-parchment transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
              {/* Hero Image & Title */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-obsidian-border">
                  <Image
                    src={selectedExp.heroImage}
                    alt={selectedExp.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif text-3xl sm:text-5xl text-parchment leading-tight">
                      {selectedExp.name}
                    </h3>
                    <p className="font-serif italic text-base sm:text-lg text-sand/90 font-light mt-1">
                      “{selectedExp.oneLine}”
                    </p>
                  </div>
                </div>
              </div>

              {/* The Story */}
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  The Story
                </span>
                <p className="text-sm sm:text-base text-parchment leading-relaxed font-light">
                  {selectedExp.story.lead}
                </p>
                <p className="text-xs sm:text-sm text-sand/80 leading-relaxed font-light bg-obsidian/60 p-5 rounded-2xl border border-obsidian-border">
                  {selectedExp.story.fullStory}
                </p>
              </div>

              {/* Key Facts & Stops */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Key Facts */}
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                    Key Historical Facts
                  </span>
                  <div className="space-y-2 bg-obsidian/50 p-4 rounded-2xl border border-obsidian-border text-xs">
                    {selectedExp.keyFacts.map((fact, idx) => (
                      <div key={idx} className="pb-2 last:pb-0 border-b last:border-0 border-obsidian-border/60">
                        <span className="font-mono text-muted-stone block">{fact.label}</span>
                        <span className="text-sand font-medium">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stops on Trail */}
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                    Stops On The Trail
                  </span>
                  <div className="space-y-2.5">
                    {selectedExp.stopsOnTrail.map((stop) => (
                      <div key={stop.num} className="p-3 rounded-xl bg-obsidian/50 border border-obsidian-border flex items-start gap-3">
                        <span className="font-mono text-xs text-bronze font-bold mt-0.5">{stop.num}</span>
                        <div>
                          <strong className="text-xs text-parchment block">{stop.title}</strong>
                          <p className="text-[11px] text-muted-stone leading-relaxed">{stop.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practical Visiting Info */}
              <div className="p-5 rounded-2xl bg-obsidian border border-bronze/20 space-y-3 text-xs">
                <span className="font-mono uppercase tracking-widest text-bronze-light block">
                  Visiting & Practical Notes
                </span>
                <p className="text-sand/90">
                  <strong className="text-parchment font-mono">When to go: </strong>
                  {selectedExp.practical.whenToGo}
                </p>
                <p className="text-sand/90">
                  <strong className="text-parchment font-mono">Getting there: </strong>
                  {selectedExp.practical.gettingThere}
                </p>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-5 border-t border-obsidian-border bg-obsidian flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-muted-stone">
                Curated by High Trip Holidays · Capped intimate group walks
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedExp.name)}%20Experience`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase text-center transition-all cursor-pointer"
                >
                  Plan This Journey
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedExp.name;
                    setSelectedExp(null);
                    openInquiry(title);
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-obsidian-surface border border-obsidian-border hover:border-bronze/40 text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase text-center transition-all cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultDestination="Experiences · Dark Tourism"
        defaultPackageTitle={inquiryExpTitle}
      />
    </div>
  );
}
