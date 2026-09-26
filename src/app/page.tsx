import { Hero } from '@/components/hero/Hero';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { SignaturePackages } from '@/components/home/SignaturePackages';
import { ExperienceTeaser } from '@/components/home/ExperienceTeaser';
import { JournalTeaser } from '@/components/home/JournalTeaser';
import { PhilosophyBanner } from '@/components/home/PhilosophyBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Window-Seat Hero */}
      <Hero />

      {/* 2. Curated Featured Destinations */}
      <FeaturedDestinations />

      {/* 4. Signature Packages Showcase */}
      <SignaturePackages />

      {/* 5. Meaningful Experiences / Dark Tourism Focus */}
      <ExperienceTeaser />

      {/* 6. Travel Stories & Field Notes */}
      <JournalTeaser />

      {/* 7. Craft Philosophy & Contact Callout */}
      <PhilosophyBanner />
    </div>
  );
}
