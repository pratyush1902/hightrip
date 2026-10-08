import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, MapPin, Package as PackageIcon, Calendar, BookOpen, ArrowUpRight, FileCode } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { travelPackages } from '@/data/packages';
import { travelStories } from '@/data/stories';
import { availableExperiences } from '@/data/experiences';

export const metadata: Metadata = {
  title: 'Sitemap & Directory',
  description: 'Complete visual sitemap and index of all destinations, curated packages, fixed group departures, and journal stories at High Trip Holidays.',
};

export default function VisualSitemapPage() {
  const internationalDestinations = destinations.filter((d) => d.region === 'International');
  const indiaDestinations = destinations.filter((d) => d.region === 'India');

  return (
    <div className="pt-28 pb-24 min-h-screen bg-obsidian text-parchment">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-obsidian-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bronze/10 border border-bronze/20 text-bronze-light text-xs font-mono">
              <Compass className="w-3.5 h-3.5 text-bronze" />
              <span>HTML Directory</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-parchment tracking-tight">
              Sitemap & <em className="italic text-bronze-light font-normal">Directory</em>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl font-light">
              Explore our complete collection of international escapes, India journeys, fixed departures, and historical remembrance trails.
            </p>
          </div>

          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-obsidian-surface border border-obsidian-border hover:border-bronze text-xs font-mono text-bronze transition-colors self-start md:self-auto"
          >
            <FileCode className="w-4 h-4" />
            <span>View sitemap.xml (Search Engines)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Main Navigation Pages */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-parchment flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            <span>Main Pages</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { label: 'Home', href: '/', desc: 'Main Landing Page' },
              { label: 'Destinations', href: '/destinations', desc: 'All Global Regions' },
              { label: 'Packages', href: '/packages', desc: 'Curated Itineraries' },
              { label: 'Fixed Departures', href: '/fixed-departures', desc: 'Group Trips with Flights' },
              { label: 'Experiences', href: '/experiences', desc: 'Dark Tourism & Remembrance' },
              { label: 'About Us', href: '/about', desc: 'Our Ethos & Founder' },
              { label: 'Journal', href: '/blog', desc: 'Field Notes & Dispatches' },
              { label: 'Contact Us', href: '/contact', desc: '24/7 Concierge' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-xl bg-obsidian-surface border border-obsidian-border hover:border-bronze transition-colors group block"
              >
                <div className="font-semibold text-sm text-parchment group-hover:text-bronze flex items-center justify-between">
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-stone group-hover:text-bronze" />
                </div>
                <div className="text-xs text-muted-stone font-mono mt-1">{item.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* International Destinations */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-parchment flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-bronze" />
            <span>International Destinations ({internationalDestinations.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {internationalDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="p-3.5 rounded-lg bg-obsidian-surface border border-obsidian-border hover:border-bronze transition-colors group block"
              >
                <div className="font-semibold text-xs text-parchment group-hover:text-bronze truncate">
                  {dest.name}
                </div>
                <div className="text-[11px] font-mono text-muted-stone flex items-center justify-between mt-1">
                  <span>{dest.country}</span>
                  <span className="text-bronze">{dest.airportCode}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* India Destinations */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-parchment flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-bronze" />
            <span>India Escapes ({indiaDestinations.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {indiaDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="p-3.5 rounded-lg bg-obsidian-surface border border-obsidian-border hover:border-bronze transition-colors group block"
              >
                <div className="font-semibold text-xs text-parchment group-hover:text-bronze truncate">
                  {dest.name}
                </div>
                <div className="text-[11px] font-mono text-muted-stone flex items-center justify-between mt-1">
                  <span>{dest.category}</span>
                  <span className="text-bronze">{dest.airportCode}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Travel Packages */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-parchment flex items-center gap-2.5">
            <PackageIcon className="w-5 h-5 text-bronze" />
            <span>Curated Packages ({travelPackages.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {travelPackages.map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/packages/${pkg.slug}`}
                className="p-4 rounded-xl bg-obsidian-surface border border-obsidian-border hover:border-bronze transition-colors group block"
              >
                <div className="font-mono text-[10px] text-bronze uppercase tracking-wider">
                  {pkg.destinationName} · {pkg.durationDays}D / {pkg.durationNights}N
                </div>
                <div className="font-semibold text-sm text-parchment group-hover:text-bronze mt-1 line-clamp-1">
                  {pkg.title}
                </div>
                <div className="text-xs text-muted-stone font-light mt-1 line-clamp-1">
                  {pkg.style}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dark Tourism Experiences */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-parchment flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-bronze" />
            <span>Historical Remembrance Trails ({availableExperiences.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableExperiences.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiences/${exp.slug}`}
                className="p-4 rounded-xl bg-obsidian-surface border border-obsidian-border hover:border-bronze transition-colors group block"
              >
                <div className="font-mono text-[10px] text-bronze uppercase tracking-wider">
                  {exp.id} · {exp.location}
                </div>
                <div className="font-semibold text-sm text-parchment group-hover:text-bronze mt-1">
                  {exp.name}
                </div>
                <div className="text-xs text-muted-stone font-light mt-1 line-clamp-1">
                  {exp.oneLine}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Journal Stories */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-parchment flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-bronze" />
            <span>Journal Articles & Field Notes ({travelStories.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelStories.map((story) => (
              <Link
                key={story.slug}
                href={`/blog/${story.slug}`}
                className="p-4 rounded-xl bg-obsidian-surface border border-obsidian-border hover:border-bronze transition-colors group block"
              >
                <div className="font-mono text-[10px] text-bronze uppercase tracking-wider">
                  {story.category} · {story.publishedAt}
                </div>
                <div className="font-semibold text-sm text-parchment group-hover:text-bronze mt-1 line-clamp-1">
                  {story.title}
                </div>
                <div className="text-xs text-muted-stone font-light mt-1 line-clamp-1">
                  By {story.author.name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
