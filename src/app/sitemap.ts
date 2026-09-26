import { MetadataRoute } from 'next';
import { travelPackages } from '@/data/packages';
import { destinations } from '@/data/destinations';
import { travelStories } from '@/data/stories';
import { availableExperiences } from '@/data/experiences';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hightripholidays.ronic.ai';

  // Static Pages
  const staticRoutes = [
    '',
    '/packages',
    '/fixed-departures',
    '/destinations',
    '/experiences',
    '/about',
    '/contact',
    '/enquire',
    '/blog',
    '/privacy-policy',
    '/terms',
    '/cancellation-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Packages
  const packageRoutes = travelPackages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Destinations
  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Dynamic Blog Stories
  const storyRoutes = travelStories.map((story) => ({
    url: `${baseUrl}/blog/${story.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Experiences
  const experienceRoutes = availableExperiences.map((exp) => ({
    url: `${baseUrl}/experiences/${exp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...packageRoutes, ...destinationRoutes, ...storyRoutes, ...experienceRoutes];
}
