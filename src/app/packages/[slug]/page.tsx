import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { travelPackages } from '@/data/packages';
import { PackageDetailHero } from '@/components/packages/PackageDetailHero';
import { ItineraryTimeline } from '@/components/packages/ItineraryTimeline';
import { InclusionsExclusions } from '@/components/packages/InclusionsExclusions';
import { PackageInquiryCard } from '@/components/packages/PackageInquiryCard';
import { RelatedPackages } from '@/components/packages/RelatedPackages';
import { Check, ShieldCheck, MapPin } from 'lucide-react';

export async function generateStaticParams() {
  return travelPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = travelPackages.find((p) => p.slug === slug);
  if (!pkg) return { title: 'Package Not Found' };

  return {
    title: `${pkg.title} | High Trip Holidays`,
    description: pkg.overview,
    openGraph: {
      title: `${pkg.title} · High Trip Holidays`,
      description: pkg.tagline,
      images: [{ url: pkg.heroImage }],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = travelPackages.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="bg-obsidian min-h-screen text-parchment">
      {/* 1. Panoramic Detail Header */}
      <PackageDetailHero pkg={pkg} />

      {/* 2. Main Content Layout (Left: Itinerary & Specs, Right: Sticky Inquiry Card) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Itinerary, Story, Inclusions */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
                The Expedition Overview
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-parchment">
                The Narrative of the Journey
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {pkg.overview}
              </p>
            </div>

            {/* Key Highlights Grid */}
            <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-xl text-parchment">Signature Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-sand/90 font-light">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery Grid */}
            {pkg.gallery && pkg.gallery.length > 0 && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
                  Perspectives & Atmosphere
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {pkg.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-obsidian-surface border border-obsidian-border"
                    >
                      <Image
                        src={imgUrl}
                        alt={`${pkg.title} scenery ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day-by-Day Interactive Itinerary */}
            <ItineraryTimeline itinerary={pkg.itinerary} />

            {/* Inclusions and Exclusions side-by-side */}
            <InclusionsExclusions
              inclusions={pkg.inclusions}
              exclusions={pkg.exclusions}
            />

            {/* Accommodation & Quality Assurance */}
            <div className="bg-obsidian-surface/60 border border-obsidian-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
                  Accommodation Standard
                </span>
                <h4 className="font-serif text-xl text-parchment">{pkg.hotelStandard}</h4>
                <p className="text-xs text-muted-foreground font-light">
                  Hand-inspected properties with verified quietude and high hygiene benchmarks.
                </p>
              </div>

              <div className="flex-shrink-0 font-mono text-xs text-sand bg-obsidian px-4 py-2 rounded-xl border border-obsidian-border">
                Group standard: {pkg.groupSize}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation & Inquiry Card */}
          <div className="lg:col-span-4">
            <PackageInquiryCard pkg={pkg} />
          </div>
        </div>

        {/* 3. Related Escapes */}
        <RelatedPackages currentSlug={pkg.slug} />
      </div>
    </div>
  );
}
