import { TravelStory } from '@/types/travel';

export const travelStories: TravelStory[] = [
  {
    slug: 'why-we-walk-places-with-a-past',
    title: 'Why We Walk Places with a Past: The Ethos of Dark Tourism',
    excerpt: 'Stepping into battlegrounds, former prisons, and quiet memorials requires more than curiosity. It demands stillness, context, and deep moral respect.',
    author: {
      name: 'Dhirendra Kashyap',
      role: 'Founder & Chief Curator',
      avatar: '/images/founder.jpg',
    },
    publishedAt: '12 Sep 2026',
    readingTime: '5 min read',
    category: 'Field Notes',
    coverImage: 'https://images.unsplash.com/photo-1644406733884-f90d90af8bc8?auto=format&fit=crop&w=1600&q=80',
    content: {
      lead: 'To travel is to witness what people build, what they celebrate, and inevitably, what they have survived.',
      sections: [
        {
          heading: 'Beyond the Postcard View',
          body: [
            'Most tourism marketing promotes pure oblivion — boundless blue water, pristine cocktails, and effortless indulgence. While relaxation has its vital place, a world-class traveler knows that landscape is inseparable from human history.',
            'When you visit the DMZ partition in Quang Tri, Vietnam, or stand within the silent hexagonal corridors of the Cellular Jail in Port Blair, the physical environment takes on an emotional resonance that cannot be replicated in a museum.',
          ],
          quote: 'A memorial is not a backdrop for a vacation selfie; it is a conversation across generations.',
        },
        {
          heading: 'Our Golden Rules for Meaningful Remembrance',
          body: [
            'First, context precedes presence. We ensure every guest receives a concise, scholarly historical briefing before stepping foot on site.',
            'Second, we support local curators and preservation trusts. The people who tend the graves, restore the archives, and tell their grandparents’ stories are the ones who receive our patronage.',
            'Third, we make room for silence. Some experiences do not require a loudspeaker commentary; they require two minutes of standing in quiet contemplation under the open sky.',
          ],
        },
      ],
    },
    tags: ['Ethical Travel', 'Dark Tourism', 'Historical Remembrance', 'Philosophy'],
    featured: true,
  },
  {
    slug: 'the-secret-season-in-vietnam',
    title: 'The Secret Season: Navigating Northern Vietnam Between the Rains',
    excerpt: 'How to bypass the crowded summer cruises in Halong by heading south into Lan Ha Bay during the crisp golden autumn.',
    author: {
      name: 'Ananya Sen',
      role: 'Southeast Asia Expedition Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    publishedAt: '04 Sep 2026',
    readingTime: '4 min read',
    category: 'Dispatch',
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80',
    content: {
      lead: 'The secret to experiencing Southeast Asia’s most iconic seascape is not finding a cheaper boat; it is choosing an entirely different bay.',
      sections: [
        {
          heading: 'Lan Ha vs Halong: A Tale of Two Waters',
          body: [
            'Halong Bay accommodates hundreds of day boats and standardized tourist routes. But immediately to the south, bordering Cat Ba Island, lies Lan Ha Bay.',
            'Here, over 400 limestone islets rise out of undisturbed green water with dozens of tiny secluded sandy coves. Because large motorized ships cannot navigate the narrower channels, boutique wooden vessels and silent kayaks dominate the horizon.',
          ],
          quote: 'When the diesel engines stop, the only sound on Lan Ha Bay is the slap of brackish water against millions of years of limestone.',
        },
        {
          heading: 'The Autumn Window (October – November)',
          body: [
            'October brings dry skies, pleasant 25°C air temperatures, and exceptional visibility. Mornings begin with soft mists that peel away like curtain calls to reveal emerald peaks in sharp relief against crystalline sunlight.',
            'Our recommended pairing is two nights on a traditional junk boat followed by an overland rail trip south over the Hai Van Pass to lantern-lit Hoi An.',
          ],
        },
      ],
    },
    tags: ['Vietnam', 'Lan Ha Bay', 'Cruising', 'Seasons'],
    featured: true,
  },
  {
    slug: 'the-art-of-the-window-seat',
    title: 'The Art of the Window Seat: How Elevation Changes How We See',
    excerpt: 'The psychological shift that occurs when we watch cities dissolve into topography at 35,000 feet, and why our trips are planned around perspectives.',
    author: {
      name: 'Vikramaditya Roy',
      role: 'Creative Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    publishedAt: '28 Aug 2026',
    readingTime: '3 min read',
    category: 'Guides',
    coverImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
    content: {
      lead: 'There is a distinct reason why we named our philosophy after the window seat.',
      sections: [
        {
          heading: 'The Overview Effect in Daily Travel',
          body: [
            'Astronauts speak of the overview effect — the cognitive shift that occurs when viewing Earth from orbit. While commercial flight is far more routine, looking down through the oval aperture of a Boeing or Airbus window still evokes a profound humility.',
            'Coastlines become brushstrokes. Mountain ranges resemble crumpled paper. Human borders dissolve entirely into rivers, deserts, and cloud layers.',
          ],
        },
        {
          heading: 'Planning for Perspective',
          body: [
            'When we design an itinerary at High Trip Holidays, we design for perspective shifts. We balance high panoramic moments (the Glacier Express in Zermatt, cliffside drives in Amalfi) with ground-level sensory immersion (walking spice markets on foot, cycling through village rice paddies).',
            'Travel should change your vantage point. If you return home seeing the world exactly as you did before, the journey was only geography, not an escape.',
          ],
          quote: 'Pick the view. We’ll take care of the journey.',
        },
      ],
    },
    tags: ['Philosophy', 'Aviation', 'Mindful Travel', 'Perspectives'],
    featured: false,
  },
];
