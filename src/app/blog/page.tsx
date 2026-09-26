import type { Metadata } from 'next';
import { BlogListing } from '@/components/blog/BlogListing';

export const metadata: Metadata = {
  title: 'Travel Journal & Field Notes',
  description:
    'Read reflections, field dispatches, and packing philosophies from High Trip Holidays curators.',
};

export default function BlogPage() {
  return <BlogListing />;
}
