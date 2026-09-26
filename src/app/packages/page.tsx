import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PackagesListing } from '@/components/packages/PackagesListing';

export const metadata: Metadata = {
  title: 'Holidays & Packages',
  description:
    'Explore curated travel packages by High Trip Holidays. Transparent prices, guaranteed validity dates, and inspected luxury accommodations.',
};

export default function PackagesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sand font-mono text-xs">
          Loading holiday packages...
        </div>
      }
    >
      <PackagesListing />
    </Suspense>
  );
}
