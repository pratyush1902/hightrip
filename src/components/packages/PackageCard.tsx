'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TravelPackage } from '@/types/travel';

interface PackageCardProps {
  package: TravelPackage;
  className?: string;
}

export function PackageCard({ package: pkg, className = '' }: PackageCardProps) {
  // Use custom card features or derive 4 concise standard features
  const features =
    pkg.cardFeatures && pkg.cardFeatures.length > 0
      ? pkg.cardFeatures.slice(0, 4)
      : [
          pkg.hotelStandard ? `${pkg.hotelStandard.split(' ')[0]} stay` : 'Curated stay',
          'Breakfast',
          'Transfers',
          'Experiences',
        ];

  return (
    <div
      className={`bg-white border border-[#e8ded0] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#c48c58]/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${className}`}
    >
      <div>
        {/* Photo with subtle hover zoom */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-sandstone">
          <Image
            src={pkg.heroImage}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Style Pill on Top Right */}
          {pkg.style && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/65 backdrop-blur-md border border-white/20 text-white font-medium">
                {pkg.style}
              </span>
            </div>
          )}
        </div>

        {/* Card Content following exact requested information hierarchy */}
        <div className="p-6 sm:p-7 space-y-3.5">
          {/* 1. Destination */}
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9a6a38] block">
            {pkg.destinationName}
          </span>

          {/* 2. Package Title */}
          <h3 className="font-serif text-2xl font-bold text-[#1c1917] group-hover:text-[#9a6a38] transition-colors leading-snug">
            <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
          </h3>

          {/* 3. Duration */}
          <p className="text-sm font-medium text-[#57534e]">
            {pkg.durationDays} Days / {pkg.durationNights} Nights
          </p>

          {/* 4. Pricing */}
          <div className="pt-0.5">
            <span className="font-mono text-base font-bold text-[#1c1917] tracking-wide uppercase">
              STARTING FROM ₹{pkg.priceINR.toLocaleString('en-IN')}{pkg.hasStarMark ? '*' : ''} / PERSON
            </span>
          </div>

          {/* 5. Inclusions / Highlights (4 items) */}
          <div className="pt-3 border-t border-[#e8ded0] space-y-2 text-sm text-[#44403c]">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-[#c48c58] font-bold text-sm">✓</span>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Action Button */}
      <div className="p-6 sm:p-7 pt-0">
        <Link
          href={`/packages/${pkg.slug}`}
          className="w-full py-3.5 px-5 rounded-xl bg-[#c48c58] hover:bg-[#b57d4a] text-[#1c1917] font-bold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <span>VIEW JOURNEY →</span>
        </Link>
      </div>
    </div>
  );
}
