'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Search, ArrowRight } from 'lucide-react';
import { travelStories } from '@/data/stories';
import { StaggerReveal } from '@/components/animation/StaggerReveal';

export function BlogListing() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStories = useMemo(() => {
    return travelStories.filter((story) => {
      if (selectedCategory !== 'all' && story.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          story.title.toLowerCase().includes(q) ||
          story.excerpt.toLowerCase().includes(q) ||
          story.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block mb-2">
          The Journal & Dispatch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-parchment leading-tight">
          Field notes, essays & <br />
          <em className="italic text-bronze-light font-normal">travel dispatches.</em>
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Quiet observations on off-season travel windows, packing philosophies, and the moral ethics of walking places with a past.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-5 sm:p-6 mb-12 shadow-lg space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-obsidian-border/80 pb-4">
          {[
            { id: 'all', label: 'All Dispatches' },
            { id: 'Field Notes', label: 'Field Notes' },
            { id: 'Dispatch', label: 'Expedition Dispatches' },
            { id: 'Guides', label: 'Practical Guides' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-sand text-obsidian font-bold shadow'
                  : 'bg-obsidian text-muted-foreground hover:text-parchment border border-obsidian-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-muted-stone absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories by topic, country, or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
          />
        </div>
      </div>

      {/* Stories Grid */}
      <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <Link
            key={story.slug}
            href={`/blog/${story.slug}`}
            className="group flex flex-col justify-between bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden hover:border-bronze/50 transition-all duration-300 shadow-xl"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-black/75 backdrop-blur-md text-bronze-light border border-white/10">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-muted-stone">
                  <span>{story.publishedAt}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze" />
                    <span>{story.readingTime}</span>
                  </span>
                </div>

                <h2 className="font-serif text-2xl text-parchment group-hover:text-bronze-light transition-colors leading-snug">
                  {story.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 font-light">
                  {story.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {story.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-obsidian text-muted-stone border border-obsidian-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-obsidian-border/60 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-obsidian-border flex-shrink-0">
                  <Image
                    src={story.author.avatar}
                    alt={story.author.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <div className="text-xs font-mono text-sand">
                  {story.author.name}
                </div>
              </div>

              <span className="text-xs font-mono text-bronze group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                Read dispatch ↗
              </span>
            </div>
          </Link>
        ))}
      </StaggerReveal>
    </div>
  );
}
