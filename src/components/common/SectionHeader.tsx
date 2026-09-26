'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FadeReveal } from '@/components/animation/FadeReveal';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  accent,
  subtitle,
  actionText,
  actionHref,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 ${
        isCentered ? 'text-center items-center' : ''
      } ${className}`}
    >
      <FadeReveal className={`max-w-2xl ${isCentered ? 'mx-auto' : ''}`}>
        {kicker && (
          <p className="font-mono text-xs uppercase tracking-widest text-bronze-light mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze inline-block" />
            {kicker}
          </p>
        )}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment leading-[1.15] tracking-tight">
          {title} {accent && <em className="italic text-bronze-light font-normal">{accent}</em>}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </FadeReveal>

      {actionText && actionHref && (
        <FadeReveal delay={0.1} className="flex-shrink-0">
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-sand hover:text-bronze-light group transition-colors pb-1 border-b border-obsidian-border hover:border-bronze"
          >
            <span>{actionText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-bronze" />
          </Link>
        </FadeReveal>
      )}
    </div>
  );
}
