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
import { EthicalCodeSwiper } from '@/components/experiences/EthicalCodeSwiper';

export default function ExperiencesPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<AvailableExperience | null>(null);
  const [inquiryExpTitle, setInquiryExpTitle] = useState('');

  const openInquiry = (title: string = 'Experience (Dark Tourism)') => {
    setInquiryExpTitle(title);
    setInquiryOpen(true);
  };
  return (
    <div
      style={{ backgroundColor: '#0b0a08' }}
      className="bg-[#0b0a08] min-h-screen text-[#f5efe6] selection:bg-bronze/30 selection:text-bronze"
    >
      {/* 1. Hero Section */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden border-b border-[#26211c]">
        {/* Background Image - Clearly Visible with Cinematic Readability Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=85"
            alt="The abandoned sandstone ruins of Kuldhara under quiet desert sky"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90 contrast-105"
          />
          {/* Left-to-right gradient to keep text crisp while revealing image on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/80 sm:via-[#0b0a08]/65 to-black/30" />
          {/* Top subtle fade for header */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0b0a08]/90 to-transparent" />
          {/* Bottom blend to page content */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <FadeReveal>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                Experiences
              </span>
            </FadeReveal>

            <FadeReveal delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#f5efe6] leading-[1.08] tracking-tight">
                Travel beyond <br />
                <em className="italic text-[#c48c58] font-normal">the obvious.</em>
              </h1>
            </FadeReveal>

            <FadeReveal delay={0.2}>
              <p className="font-serif italic text-lg sm:text-2xl text-[#c5bcb0] font-light leading-relaxed">
                Abandoned villages, memorials and places of legend, visited the way they deserve.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.25}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#181512] border border-[#c48c58]/35 text-[#dfa26b] text-xs font-mono shadow-sm">
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
                className="px-6 py-3.5 rounded-full bg-bronze hover:bg-[#d6985e] text-[#141210] font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                </svg>
                <span>WhatsApp us</span>
              </a>

              <a
                href="tel:+919155566268"
                className="px-6 py-3.5 rounded-full bg-[#181512] border border-[#2a241e] hover:border-[#c48c58]/40 text-[#f5efe6] font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-bronze" />
                <span>Call +91 91555 66268</span>
              </a>

              <a
                href="#available"
                className="px-6 py-3.5 rounded-full bg-transparent border border-[#2a241e] hover:border-[#c48c58]/30 text-[#8a8174] hover:text-[#f5efe6] font-mono text-xs tracking-wider uppercase transition-all"
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
          <div className="space-y-2 border-b border-[#26211c] pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze">
              Available experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f5efe6] leading-tight">
              Places we can <em className="italic text-[#c48c58] font-normal">take you now.</em>
            </h2>
          </div>
        </FadeReveal>

        {/* 8 Experience Rows */}
        <div className="space-y-8">
          {availableExperiences.map((exp, idx) => (
            <FadeReveal key={exp.slug} delay={idx * 0.05}>
              <div 
                style={{ backgroundColor: '#14120f', borderColor: '#2a241e', color: '#f5efe6' }}
                className="group relative bg-[#161411] border border-[#2a241e] hover:border-[#c48c58]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer"
                onClick={() => setSelectedExp(exp)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Photo Column */}
                  <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-[#2a241e] bg-[#0e0d0b]">
                    <Image
                      src={exp.heroImage}
                      alt={exp.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0b]/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#0e0d0b]/90 backdrop-blur-md border border-[#c48c58]/40 font-mono text-[11px] text-bronze font-bold">
                        {exp.id}
                      </span>
                    </div>
                  </div>

                  {/* Copy Column */}
                  <div className="lg:col-span-7 space-y-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-[#c48c58] uppercase tracking-wider">
                        {exp.location}
                      </span>
                      <span className="hidden sm:inline-block font-mono text-xs text-[#8a8174]">
                        {exp.id}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-4xl text-[#f5efe6] group-hover:text-amber-200 transition-colors">
                      {exp.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#c5bcb0] leading-relaxed font-light">
                      {exp.oneLine}
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExp(exp);
                        }}
                        className="inline-flex items-center gap-2 font-mono text-xs text-bronze hover:text-amber-300 uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Walk this one</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>

                      <Link
                        href={`/experiences/${exp.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8a8174] hover:text-[#f5efe6] transition-colors"
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
      <section className="py-20 sm:py-24 border-y border-[#26211c] bg-[#12100e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <FadeReveal>
            <p className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[#f5efe6] leading-tight">
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
          <div className="space-y-2 border-b border-[#26211c] pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze">
              Stories we’re researching
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f5efe6] leading-tight">
              Not yet <em className="italic text-[#c48c58] font-normal">on sale.</em>
            </h2>
          </div>
        </FadeReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {researchingExperiences.map((item, idx) => (
            <FadeReveal key={item.slug} delay={idx * 0.05}>
              <div
                style={{ backgroundColor: '#14120f', borderColor: '#2a241e', color: '#f5efe6' }}
                className="group bg-[#161411] border border-[#2a241e] hover:border-[#c48c58]/40 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-[#0e0d0b] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161411] via-[#161411]/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0e0d0b]/90 backdrop-blur-md border border-[#2a241e] font-mono text-[11px] text-[#8a8174] uppercase tracking-wider">
                      Researching
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-[#c48c58] uppercase tracking-wider block">
                      {item.location}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f5efe6] group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a89e90] font-light leading-relaxed">
                      {item.oneLine}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#26211c]">
                    <span className="font-mono text-[11px] text-[#8a8174] flex items-center gap-1.5">
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

      {/* 5. The Ethical Code - Interactive Swiping Cards on Scroll */}
      <EthicalCodeSwiper />

      {/* 6. Tell Us About an Experience (Bottom Ask / CTA) */}
      <section className="py-20 sm:py-28 border-t border-[#26211c] bg-[#0e0d0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                Today’s price, after the calls
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f5efe6] leading-tight">
                Tell us about <em className="italic text-[#c48c58] font-normal">an Experience.</em>
              </h2>
              <p className="text-sm sm:text-base text-[#a89e90] font-light leading-relaxed max-w-xl">
                Message us with the place, the dates and how many are travelling. We reply with a plan and today’s price, usually within the hour in India hours.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20an%20Experience.%20Where%2C%20when%20and%20how%20many%3A%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full bg-bronze hover:bg-[#d6985e] text-[#141210] font-semibold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                  </svg>
                  <span>WhatsApp +91 91555 66268</span>
                </a>

                <a
                  href="tel:+919155566268"
                  className="px-6 py-4 rounded-full bg-[#181512] border border-[#2a241e] hover:border-[#c48c58]/40 text-[#f5efe6] font-mono text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-bronze" />
                  <span>Call us</span>
                </a>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#8a8174] pt-1">
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
                  className="hover:text-white transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#14120f] border border-[#2a241e] rounded-3xl overflow-hidden shadow-2xl flex flex-col text-[#f5efe6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-6 py-4 border-b border-[#26211c] flex items-center justify-between bg-[#0e0d0b]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-bronze font-bold">
                  {selectedExp.id}
                </span>
                <span className="font-mono text-xs text-[#8a8174]">
                  {selectedExp.location}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="p-2 rounded-full hover:bg-[#26211c] text-[#8a8174] hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
              {/* Hero Image & Title */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#26211c]">
                  <Image
                    src={selectedExp.heroImage}
                    alt={selectedExp.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14120f] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif text-3xl sm:text-5xl text-[#f5efe6] leading-tight">
                      {selectedExp.name}
                    </h3>
                    <p className="font-serif italic text-base sm:text-lg text-[#c5bcb0] font-light mt-1">
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
                <p className="text-sm sm:text-base text-[#f5efe6] leading-relaxed font-light">
                  {selectedExp.story.lead}
                </p>
                <p className="text-xs sm:text-sm text-[#c5bcb0] leading-relaxed font-light bg-[#0e0d0b] p-5 rounded-2xl border border-[#26211c]">
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
                  <div className="space-y-2 bg-[#0e0d0b] p-4 rounded-2xl border border-[#26211c] text-xs">
                    {selectedExp.keyFacts.map((fact, idx) => (
                      <div key={idx} className="pb-2 last:pb-0 border-b last:border-0 border-[#26211c]">
                        <span className="font-mono text-[#8a8174] block">{fact.label}</span>
                        <span className="text-[#f5efe6] font-medium">{fact.value}</span>
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
                      <div key={stop.num} className="p-3 rounded-xl bg-[#0e0d0b] border border-[#26211c] flex items-start gap-3">
                        <span className="font-mono text-xs text-bronze font-bold mt-0.5">{stop.num}</span>
                        <div>
                          <strong className="text-xs text-[#f5efe6] block">{stop.title}</strong>
                          <p className="text-[11px] text-[#8a8174] leading-relaxed">{stop.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practical Visiting Info */}
              <div className="p-5 rounded-2xl bg-[#0e0d0b] border border-[#c48c58]/30 space-y-3 text-xs">
                <span className="font-mono uppercase tracking-widest text-bronze block">
                  Visiting & Practical Notes
                </span>
                <p className="text-[#c5bcb0]">
                  <strong className="text-[#f5efe6] font-mono">When to go: </strong>
                  {selectedExp.practical.whenToGo}
                </p>
                <p className="text-[#c5bcb0]">
                  <strong className="text-[#f5efe6] font-mono">Getting there: </strong>
                  {selectedExp.practical.gettingThere}
                </p>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-5 border-t border-[#26211c] bg-[#0e0d0b] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#8a8174]">
                Curated by High Trip Holidays · Capped intimate group walks
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedExp.name)}%20Experience`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-bronze hover:bg-[#d6985e] text-[#141210] font-semibold text-xs tracking-wider uppercase text-center transition-all cursor-pointer"
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
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#181512] border border-[#2a241e] hover:border-[#c48c58]/40 text-[#f5efe6] font-mono text-xs tracking-wider uppercase text-center transition-all cursor-pointer"
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
