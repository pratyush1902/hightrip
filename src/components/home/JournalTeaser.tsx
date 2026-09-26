'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, User } from 'lucide-react';
import { travelStories } from '@/data/stories';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerReveal } from '@/components/animation/StaggerReveal';

export function JournalTeaser() {
  const stories = travelStories.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-obsidian-border">
      <SectionHeader
        kicker="The Journal"
        title="Field notes, reflections &"
        accent="travel dispatch."
        subtitle="Unfiltered writings on lesser-known seasons, packing philosophies, and the ethics of remembering."
        actionText="Read the entire journal"
        actionHref="/blog"
      />

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <Link
            key={story.slug}
            href={`/blog/${story.slug}`}
            className="group flex flex-col justify-between bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-bronze/40 transition-all duration-300"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-black/70 backdrop-blur-md border border-white/10 text-bronze-light">
                    {story.category}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-muted-stone">
                  <span>{story.publishedAt}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze" />
                    <span>{story.readingTime}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl text-parchment group-hover:text-bronze-light transition-colors leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-light">
                  {story.excerpt}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-6 pt-0 border-t border-obsidian-border/50 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-obsidian-border flex-shrink-0">
                  <Image
                    src={story.author.avatar}
                    alt={story.author.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-mono text-sand/80">
                  {story.author.name}
                </span>
              </div>

              <span className="text-xs font-mono text-bronze group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                Read ↗
              </span>
            </div>
          </Link>
        ))}
      </StaggerReveal>
    </section>
  );
}
