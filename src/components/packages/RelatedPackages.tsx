'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { travelPackages } from '@/data/packages';

interface RelatedPackagesProps {
  currentSlug: string;
}

export function RelatedPackages({ currentSlug }: RelatedPackagesProps) {
  const related = travelPackages.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <div className="pt-20 border-t border-obsidian-border">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
            Alternative Escapes
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-parchment mt-0.5">
            You May Also Wish to Explore
          </h3>
        </div>

        <Link
          href="/packages"
          className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
        >
          <span>All holidays</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((pkg) => (
          <Link
            key={pkg.slug}
            href={`/packages/${pkg.slug}`}
            className="group block bg-obsidian-surface border border-obsidian-border rounded-xl overflow-hidden hover:border-bronze/40 transition-colors shadow-md"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
              <Image
                src={pkg.heroImage}
                alt={pkg.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/75 text-sand flex items-center gap-1">
                <Clock className="w-3 h-3 text-bronze" />
                <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              <span className="text-[10px] font-mono text-bronze-light uppercase tracking-wider block">
                {pkg.destinationName}
              </span>
              <h4 className="font-serif text-lg text-parchment group-hover:text-bronze-light transition-colors line-clamp-1">
                {pkg.title}
              </h4>
              <div className="pt-2 flex items-baseline justify-between text-xs font-mono">
                <span className="text-sand font-bold">
                  Price On Request
                </span>
                <span className="text-bronze text-[10px] uppercase font-semibold">
                  View Journey →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
