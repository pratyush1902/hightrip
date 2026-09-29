import { NextResponse } from 'next/server';

export interface InstagramFeedItem {
  id: string;
  type: 'REEL' | 'POST';
  shortcode?: string;
  embedUrl?: string;
  videoUrl?: string;
  image: string;
  captionTitle?: string;
  captionSub?: string;
  captionFull: string;
  likes: number;
  comments: number;
  timestamp: string;
  instagramUrl: string;
  category: 'adventure' | 'island' | 'culture' | 'luxury';
  isBrandPost?: boolean;
}

const fallbackPosts: InstagramFeedItem[] = [
  {
    id: 'ig-reel-1',
    type: 'REEL',
    shortcode: 'Dd0mzvApRg8',
    embedUrl: 'https://www.instagram.com/reel/Dd0mzvApRg8/embed/',
    instagramUrl: 'https://www.instagram.com/reel/Dd0mzvApRg8/',
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/snow_horses.mp4',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'big fan of whatever this is called 🏔️',
    captionSub: 'LADAKH PASSES',
    captionFull: 'Cutting through snow passes at 17,500 ft. When uncluttered horizons meet pure silence. #HighTripHolidays #Ladakh #WindowSeat #ExploreIndia',
    likes: 1420,
    comments: 86,
    timestamp: '2 hours ago',
    category: 'adventure',
  },
  {
    id: 'ig-reel-2',
    type: 'REEL',
    shortcode: 'DdrcYDhyMPy',
    embedUrl: 'https://www.instagram.com/reel/DdrcYDhyMPy/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DdrcYDhyMPy/',
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/rafting.mp4',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'Explore',
    captionSub: 'Sikkim',
    captionFull: 'Glacial melt streams flowing through North Sikkim. Untouched valleys, ancient prayer flags, and emerald slopes. #HighTripHolidays #Sikkim #NorthEastIndia',
    likes: 2150,
    comments: 114,
    timestamp: 'Yesterday',
    category: 'adventure',
  },
  {
    id: 'ig-reel-3',
    type: 'REEL',
    shortcode: 'DdgEMwpJvCL',
    embedUrl: 'https://www.instagram.com/reel/DdgEMwpJvCL/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DdgEMwpJvCL/',
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'BEST RATES IN',
    captionSub: 'Phuket',
    captionFull: 'Exclusive seasonal villa clearance for Thailand: 4N/5D private pool suites with island speedboat charters. Link in bio to claim flash rates! #HighTripHolidays #Phuket #LuxuryEscapes',
    likes: 1980,
    comments: 72,
    timestamp: '2 days ago',
    category: 'luxury',
    isBrandPost: true,
  },
  {
    id: 'ig-reel-4',
    type: 'REEL',
    shortcode: 'DdGoCX71C2I',
    embedUrl: 'https://www.instagram.com/p/DdGoCX71C2I/embed/',
    instagramUrl: 'https://www.instagram.com/p/DdGoCX71C2I/',
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/kayak.mp4',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'ABOVE THE CITY.',
    captionSub: 'DUBAI',
    captionFull: 'Sunset skyline over Burj Khalifa and the Arabian Gulf. Skyline views that shift your perspective. #HighTripHolidays #Dubai #WindowSeatPerspective',
    likes: 3410,
    comments: 219,
    timestamp: '3 days ago',
    category: 'luxury',
  },
  {
    id: 'ig-reel-5',
    type: 'REEL',
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'Crystal Lagoon',
    captionSub: 'MALDIVES',
    captionFull: 'Gliding alongside green sea turtles across South Malé Atoll reef. Overwater villa living at its quietest. #HighTripHolidays #Maldives #OverwaterHaven',
    likes: 2890,
    comments: 134,
    timestamp: '4 days ago',
    instagramUrl: 'https://www.instagram.com/hightrip.experiences/',
    category: 'island',
  },
  {
    id: 'ig-reel-6',
    type: 'REEL',
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'Into The Wild',
    captionSub: 'SERENGETI',
    captionFull: 'Dawn in the Mara-Serengeti corridor. Respectful wildlife observation with expert naturalists. #HighTripHolidays #Safari #DarkTourismEthos',
    likes: 4120,
    comments: 198,
    timestamp: '5 days ago',
    instagramUrl: 'https://www.instagram.com/hightrip.experiences/',
    category: 'adventure',
  },
  {
    id: 'ig-post-7',
    type: 'POST',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'Ha Long Bay',
    captionSub: 'VIETNAM',
    captionFull: 'Morning mist floating between limestone karsts. Overnight wooden junk boat cruising through Lan Ha Bay. #HighTripHolidays #Vietnam #HaLongBay',
    likes: 1840,
    comments: 67,
    timestamp: '6 days ago',
    instagramUrl: 'https://www.instagram.com/hightrip.experiences/',
    category: 'culture',
  },
  {
    id: 'ig-post-8',
    type: 'POST',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85',
    captionTitle: 'Positano Dreams',
    captionSub: 'AMALFI COAST',
    captionFull: 'Vertical cliffs of pastel villas tumbling down into the Tyrrhenian Sea. Private boat charter to Capri. #HighTripHolidays #AmalfiCoast #Italy',
    likes: 2750,
    comments: 112,
    timestamp: '1 week ago',
    instagramUrl: 'https://www.instagram.com/hightrip.experiences/',
    category: 'luxury',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typeFilter = searchParams.get('type') || 'all';

  // If user has provided a real Instagram Access Token in environment variables
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (token) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`,
        { next: { revalidate: 3600 } }
      );
      if (response.ok) {
        const json = await response.json();
        const livePosts = json.data.map((item: any) => ({
          id: item.id,
          type: item.media_type === 'VIDEO' ? 'REEL' : 'POST',
          videoUrl: item.media_type === 'VIDEO' ? item.media_url : undefined,
          image: item.thumbnail_url || item.media_url,
          captionFull: item.caption || '',
          captionTitle: item.caption?.slice(0, 30) || 'High Trip Story',
          captionSub: item.media_type === 'VIDEO' ? 'REEL' : 'POST',
          likes: Math.floor(Math.random() * 1000) + 500,
          comments: Math.floor(Math.random() * 50) + 10,
          timestamp: 'Recently',
          instagramUrl: item.permalink || 'https://www.instagram.com/hightrip.experiences/',
          category: 'adventure',
        }));

        let filtered = livePosts;
        if (typeFilter === 'reels') filtered = livePosts.filter((p: any) => p.type === 'REEL');
        if (typeFilter === 'posts') filtered = livePosts.filter((p: any) => p.type === 'POST');

        return NextResponse.json({
          success: true,
          isLive: true,
          profile: {
            handle: 'hightrip.experiences',
            followers: '14.2K',
            postsCount: livePosts.length,
          },
          data: filtered,
        });
      }
    } catch (err) {
      console.error('Failed to fetch from Instagram API, using fallback feed:', err);
    }
  }

  // Curated dynamic feed from @hightrip.experiences
  let results = fallbackPosts;
  if (typeFilter === 'reels') {
    results = fallbackPosts.filter((item) => item.type === 'REEL');
  } else if (typeFilter === 'posts') {
    results = fallbackPosts.filter((item) => item.type === 'POST');
  }

  return NextResponse.json({
    success: true,
    isLive: false,
    profile: {
      handle: 'hightrip.experiences',
      followers: '14.2K',
      postsCount: fallbackPosts.length,
    },
    data: results,
  });
}
