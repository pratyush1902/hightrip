import { Hero } from '@/components/hero/Hero';
import { OurSignature } from '@/components/home/OurSignature';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { SignaturePackages } from '@/components/home/SignaturePackages';
import { FlashSaleSlider } from '@/components/home/FlashSaleSlider';
import { ExperienceTeaser } from '@/components/home/ExperienceTeaser';
import { JournalTeaser } from '@/components/home/JournalTeaser';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { PhilosophyBanner } from '@/components/home/PhilosophyBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Window-Seat Hero */}
      <Hero />

      {/* 2. Our Signature - The Ones We're Known For */}
      <OurSignature />

      {/* 3. Curated Featured Destinations */}
      <FeaturedDestinations />

      {/* 4. Flash Sale & Exclusive Offers Slider (Red & Glowing) */}
      <FlashSaleSlider />

      {/* 5. Signature Packages Showcase (Curated Escapes) */}
      <SignaturePackages />

      {/* 5. Meaningful Experiences / Dark Tourism Focus */}
      <ExperienceTeaser />

      {/* 6. Travel Stories & Field Notes */}
      <JournalTeaser />

      {/* 7. Instagram Feed - Wish you were here */}
      <InstagramFeed />

      {/* 8. Craft Philosophy & Contact Callout */}
      <PhilosophyBanner />
    </div>
  );
}
