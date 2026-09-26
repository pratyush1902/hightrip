import { Suspense } from 'react';
import type { Metadata } from 'next';
import { FixedDeparturesListing } from '@/components/fixed-departures/FixedDeparturesListing';

export const metadata: Metadata = {
  title: 'Fixed departure group tours | High Trip Holidays',
  description:
    'Group tours on set dates to Vietnam, Thailand, and Singapore with High Trip Holidays, with the published departure dates and prices per person.',
  openGraph: {
    title: 'Fixed departure group tours | High Trip Holidays',
    description:
      'Group tours on set dates to Vietnam, Thailand, and Singapore with High Trip Holidays, with the published departure dates and prices per person.',
    type: 'website',
  },
};

export default function FixedDeparturesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sand font-mono text-xs">
          Loading fixed departures...
        </div>
      }
    >
      <FixedDeparturesListing />
    </Suspense>
  );
}
