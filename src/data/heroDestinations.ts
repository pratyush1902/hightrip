export interface HeroDestination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  airportCode: string;
  country: string;
  coordinates: string;
}

export const heroDestinations: HeroDestination[] = [
  {
    id: 'vietnam',
    name: 'Vietnam',
    tagline: 'Follow the water. Find another world.',
    description: 'Emerald karst towers emerging from Lan Ha Bay, lantern-lit river merchant houses in Hoi An, and quiet morning mists over northern valleys.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=85',
    ctaText: 'Explore Vietnam',
    ctaHref: '/destinations/vietnam',
    airportCode: 'HAN',
    country: 'Southeast Asia',
    coordinates: '21°01\'N 105°51\'E',
  },
  {
    id: 'japan-cherry-blossom',
    name: 'Japan (Cherry Blossom)',
    tagline: 'Sakura Season · Bloom in quiet harmony.',
    description: 'Centuries-old cedar paths in Kyoto enveloped in delicate pink sakura blossoms, steam drifting over mountain onsen baths, and golden dawn light breaking behind snow-capped Mount Fuji.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=85',
    ctaText: 'Explore Japan',
    ctaHref: '/destinations/japan',
    airportCode: 'HND',
    country: 'East Asia',
    coordinates: '35°21\'N 138°43\'E',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    tagline: 'A slower kind of blue.',
    description: 'Private overwater pavilions poised above translucent coral lagoons, gentle manta ray migrations across Baa Atoll, and unhurried days lived barefoot.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2400&q=85',
    ctaText: 'Explore Maldives',
    ctaHref: '/destinations/maldives',
    airportCode: 'MLE',
    country: 'Indian Ocean',
    coordinates: '04°10\'N 73°30\'E',
  },
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Temples, swells, and silent terraces.',
    description: 'Emerald subak rice amphitheaters bathed in sunrise fog, cliffside temples overlooking crashing southern swells, and slow evenings scented with clove and frangipani.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=85',
    ctaText: 'Explore Bali',
    ctaHref: '/destinations/bali',
    airportCode: 'DPS',
    country: 'Indonesia',
    coordinates: '08°20\'S 115°13\'E',
  },
];
