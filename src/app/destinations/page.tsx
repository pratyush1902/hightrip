import type { Metadata } from 'next';
import { DestinationsListing } from '@/components/destinations/DestinationsListing';

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Discover every destination planned by High Trip Holidays. From Maldives and Vietnam to Italy, Switzerland, and Kerala.',
};

export default function DestinationsPage() {
  return <DestinationsListing />;
}
