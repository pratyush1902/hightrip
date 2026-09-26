import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from 'lucide-react';
import { travelStories } from '@/data/stories';

export async function generateStaticParams() {
  return travelStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = travelStories.find((s) => s.slug === slug);
  if (!story) return { title: 'Story Not Found' };

  return {
    title: `${story.title} | High Trip Journal`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: story.coverImage }],
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = travelStories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const related = travelStories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <article className="bg-obsidian min-h-screen text-parchment py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-sand/80 hover:text-parchment transition-colors bg-obsidian-surface px-3.5 py-1.5 rounded-full border border-obsidian-border"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-bronze" />
            <span>Back to The Journal</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-bronze-light">
            <span className="uppercase tracking-widest">{story.category}</span>
            <span>·</span>
            <span>{story.publishedAt}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-bronze" />
              <span>{story.readingTime}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-parchment tracking-tight leading-[1.15]">
            {story.title}
          </h1>

          <p className="text-base sm:text-xl text-sand/90 font-light leading-relaxed">
            {story.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-4 border-t border-obsidian-border">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-obsidian-border flex-shrink-0">
              <Image
                src={story.author.avatar}
                alt={story.author.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-parchment">{story.author.name}</div>
              <div className="text-xs text-muted-stone font-mono">{story.author.role}</div>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-obsidian-border shadow-2xl bg-obsidian-surface">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Lead In Paragraph */}
        <div className="text-lg sm:text-xl font-serif italic text-sand/90 border-l-2 border-bronze pl-6 py-2">
          {story.content.lead}
        </div>

        {/* Story Body Sections */}
        <div className="space-y-10 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
          {story.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-parchment font-normal pt-4">
                {section.heading}
              </h2>
              {section.body.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}

              {section.quote && (
                <blockquote className="my-6 p-6 rounded-2xl bg-obsidian-surface border border-bronze/30 text-sand font-serif italic text-lg sm:text-xl">
                  “{section.quote}”
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-obsidian-border flex flex-wrap gap-2">
          {story.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-mono bg-obsidian-surface border border-obsidian-border text-sand"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Field Notes */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-obsidian-border space-y-6">
            <h3 className="font-serif text-2xl text-parchment">More From The Journal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="p-5 rounded-2xl bg-obsidian-surface border border-obsidian-border hover:border-bronze/50 transition-colors group block space-y-2"
                >
                  <span className="text-[11px] font-mono text-bronze-light block">
                    {r.category} · {r.readingTime}
                  </span>
                  <h4 className="font-serif text-lg text-parchment group-hover:text-bronze-light transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-light line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
