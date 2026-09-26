import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Sun, 
  Calendar, 
  Clock, 
  Compass, 
  Check, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Plane
} from 'lucide-react';
import { destinations } from '@/data/destinations';
import { travelPackages } from '@/data/packages';

export async function generateStaticParams() {
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return { title: 'Destination Not Found' };

  return {
    title: `${dest.name} Holidays (${dest.airportCode}) | High Trip Holidays`,
    description: dest.overview,
    openGraph: {
      title: `${dest.name} · High Trip Holidays`,
      description: dest.tagline,
      images: [{ url: dest.heroImage }],
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  const matchingPackages = travelPackages.filter((p) => p.destinationSlug === dest.slug);

  return (
    <div className="bg-obsidian min-h-screen text-parchment">
      {/* 1. Panoramic Destination Header */}
      <div className="relative w-full min-h-[500px] lg:min-h-[580px] flex items-end pb-12 pt-28 bg-obsidian overflow-hidden">
        <Image
          src={dest.heroImage}
          alt={dest.name}
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.6] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-6">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs font-mono text-sand/80 hover:text-parchment transition-colors bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sand/15"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-bronze" />
              <span>Back to All Destinations</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-bronze/20 text-bronze-light border border-bronze/30">
              Airport Code: {dest.airportCode}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md text-sand border border-sand/20">
              {dest.region}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md text-sand border border-sand/20">
              {dest.category}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-parchment tracking-tight leading-[1.08]">
            {dest.name}
          </h1>

          <p className="mt-3 text-lg sm:text-2xl text-sand/90 font-light max-w-2xl leading-relaxed italic">
            “{dest.tagline}”
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 pt-4 border-t border-sand/20 text-xs font-mono text-sand">
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-bronze" />
              <span>Average Temp: {dest.averageTemp}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-bronze" />
              <span>Best Season: {dest.bestTimeToVisit}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-bronze" />
              <span>Ideal Stay: {dest.idealDuration}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Destination Narrative & Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Overview & Quick Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              About The Destination
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment leading-tight">
              A Landscape Beyond the Expected
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              {dest.overview}
            </p>

            {/* Practical Traveler Guide Box */}
            <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 space-y-4">
              <h3 className="font-serif text-xl text-parchment flex items-center gap-2">
                <Plane className="w-4 h-4 text-bronze" />
                <span>Entry & Travel Formalities</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-sand/90 font-light">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-bronze-light flex-shrink-0">Visa Status:</span>
                  <span>{dest.visaInfo}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-bronze-light flex-shrink-0">Airport Gateway:</span>
                  <span>{dest.airportCode} ({dest.country})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Curated Insider Tips */}
          <div className="lg:col-span-5 bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-obsidian-border">
              <Lightbulb className="w-4 h-4 text-bronze" />
              <h3 className="font-serif text-xl text-parchment">Curator Insider Notes</h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              {dest.insiderTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-bronze font-bold flex-shrink-0 mt-0.5">
                    0{i + 1}.
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-obsidian-border text-xs text-muted-stone font-mono">
              Tips reviewed and updated monthly by High Trip destination coordinators.
            </div>
          </div>
        </div>

        {/* 3. Signature Highlights Cards */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              What Defines This Place
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment mt-1">
              Curated Highlights & Sensory Encounters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dest.highlights.map((h, i) => (
              <div
                key={i}
                className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-bronze/10 border border-bronze/20 flex items-center justify-center font-mono text-xs font-bold text-bronze">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-xl text-parchment">{h.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Published Holidays for This Destination */}
        <div className="pt-8 border-t border-obsidian-border space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
                Ready to travel?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-parchment mt-1">
                Published Holidays for {dest.name}
              </h2>
            </div>
            <Link
              href="/packages"
              className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
            >
              <span>Browse all holidays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {matchingPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {matchingPackages.map((pkg) => (
                <div
                  key={pkg.slug}
                  className="bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-bronze/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
                      <Image
                        src={pkg.heroImage}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono bg-black/75 text-sand flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-bronze" />
                        <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between">
                        <span className="text-2xl font-serif font-bold text-parchment">
                          ₹{pkg.priceINR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] font-mono text-bronze-light bg-black/70 px-2 py-0.5 rounded border border-sand/15">
                          Valid to {pkg.priceValidUntil}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-serif text-2xl text-parchment group-hover:text-bronze-light transition-colors">
                        <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 font-light">
                        {pkg.overview}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="w-full py-3 px-4 rounded-xl bg-obsidian border border-obsidian-border text-center text-xs font-semibold text-sand hover:text-parchment hover:border-bronze transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Full Itinerary & Booking</span>
                      <ArrowRight className="w-3.5 h-3.5 text-bronze" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-obsidian-surface rounded-2xl border border-obsidian-border p-8 text-center space-y-3">
              <p className="font-serif text-xl text-parchment">
                Custom Departure Planned on Request
              </p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                We design bespoke private villa stays and tailor-made expeditions for {dest.name}. Connect with our concierge to formulate a custom day-by-day plan.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-bronze-gradient text-obsidian font-semibold text-xs mt-2"
              >
                <span>Request Custom {dest.name} Itinerary</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
