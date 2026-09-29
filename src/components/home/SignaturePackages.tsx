'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Check, ArrowUpRight } from 'lucide-react';
import { travelPackages } from '@/data/packages';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerReveal } from '@/components/animation/StaggerReveal';
import { InquiryModal } from '@/components/common/InquiryModal';

export function SignaturePackages() {
  const [inquiryPackage, setInquiryPackage] = useState<string | null>(null);
  const signatureList = travelPackages.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-sandstone/40 border-y border-obsidian-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Curated escapes"
          title="Journeys planned with"
          accent="thought and craft."
          subtitle="Each holiday shows the published price and the exact day it is guaranteed to. No hidden surcharges, only clear luxury."
          actionText="View all 5 published holidays"
          actionHref="/packages"
        />

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {signatureList.map((pkg) => (
            <div
              key={pkg.slug}
              className="bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-bronze/40 transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-sandstone">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top Floating Pills */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/70 backdrop-blur-md border border-white/10 text-stone-200 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-bronze" />
                      <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-bronze text-[#1c1917] font-semibold">
                      {pkg.style}
                    </span>
                  </div>

                  {/* Price Banner at bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-300 block">
                        Published price
                      </span>
                      <span className="text-2xl font-serif font-bold text-white">
                        ₹{pkg.priceINR.toLocaleString('en-IN')}
                      </span>
                      {pkg.originalPriceINR && (
                        <span className="ml-2 text-xs font-mono text-stone-400 line-through">
                          ₹{pkg.originalPriceINR.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-white bg-black/60 px-2.5 py-1 rounded border border-white/20">
                      Valid to {pkg.priceValidUntil}
                    </span>
                  </div>
                </div>

                {/* Package Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-bronze-light uppercase tracking-wider">
                      {pkg.destinationName}
                    </span>
                    <h3 className="font-serif text-2xl text-parchment mt-1 group-hover:text-bronze-light transition-colors">
                      <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 border-t border-obsidian-border/80 space-y-2 text-xs text-sand">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Card Actions */}
              <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-obsidian-surface border border-obsidian-border text-center text-xs font-semibold text-sand hover:text-parchment hover:border-bronze transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 text-bronze" />
                </Link>

                <button
                  type="button"
                  onClick={() => setInquiryPackage(pkg.title)}
                  className="py-3 px-6 rounded-xl bg-bronze-gradient text-obsidian text-xs font-semibold hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={!!inquiryPackage}
        onClose={() => setInquiryPackage(null)}
        defaultPackageTitle={inquiryPackage || ''}
      />
    </section>
  );
}
