'use client';

import { travelPackages } from '@/data/packages';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerReveal } from '@/components/animation/StaggerReveal';
import { PackageCard } from '@/components/packages/PackageCard';

export function SignaturePackages() {
  const signatureList = travelPackages.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-24 sm:py-32 bg-sandstone/40 border-y border-obsidian-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Curated journeys"
          title="Journeys worth"
          accent="travelling for."
          subtitle="Handpicked holidays, thoughtfully designed with the right stays, experiences and details — all at a clear, published price."
          actionText={`View all ${travelPackages.length} published holidays`}
          actionHref="/packages"
        />

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureList.map((pkg) => (
            <PackageCard key={pkg.slug} package={pkg} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
