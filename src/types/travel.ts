export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  airportCode: string;
  country: string;
  region: 'International' | 'India';
  category: 'Islands & Ocean' | 'Culture & Discovery' | 'Coasts & Old Cities' | 'Alpine & Highlands' | 'Tropical & Heritage';
  heroImage: string;
  cardImage: string;
  gallery: string[];
  startingPriceINR: number;
  bestTimeToVisit: string;
  averageTemp: string;
  visaInfo: string;
  idealDuration: string;
  overview: string;
  highlights: { title: string; description: string }[];
  insiderTips: string[];
  featured: boolean;
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  meals: string;
  stay: string;
  activities: string[];
}

export interface TravelPackage {
  slug: string;
  title: string;
  tagline: string;
  destinationSlug: string;
  destinationName: string;
  durationDays: number;
  durationNights: number;
  priceINR: number;
  originalPriceINR?: number;
  priceValidUntil: string;
  type: 'international' | 'india' | 'fixed-departure';
  style: 'Luxury Escapes' | 'Honeymoon' | 'Family Journey' | 'Expedition & Culture' | 'Coastal & Relaxation';
  heroImage: string;
  cardImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  itinerary: PackageItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotelStandard: string;
  groupSize: string;
  featured: boolean;
  hasStarMark?: boolean;
  cardFeatures?: string[];
  departureDates?: string[];
}

export interface Experience {
  slug: string;
  title: string;
  tagline: string;
  category: 'Dark Tourism & Historic Trails' | 'Expedition Journeys' | 'Island Sanctuary' | 'Alpine Trails';
  heroImage: string;
  overview: string;
  ethos: string;
  duration: string;
  regions: string[];
  keyLocations: string[];
  guidelines: string[];
  featured: boolean;
}

export interface StorySection {
  heading: string;
  body: string[];
  image?: string;
  imageCaption?: string;
  quote?: string;
}

export interface TravelStory {
  slug: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: string;
  category: 'Field Notes' | 'Visa & Entry' | 'Dispatch' | 'Guides';
  coverImage: string;
  content: {
    lead: string;
    sections: StorySection[];
  };
  tags: string[];
  featured: boolean;
}
