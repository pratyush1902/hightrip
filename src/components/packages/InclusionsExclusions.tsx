'use client';

import { Check, X } from 'lucide-react';

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function InclusionsExclusions({ inclusions, exclusions }: InclusionsExclusionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
      {/* Inclusions Box */}
      <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-obsidian-border">
          <div className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <h4 className="font-serif text-xl text-parchment">What is Included</h4>
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-sand/90 font-light">
          {inclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exclusions Box */}
      <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-obsidian-border">
          <div className="w-6 h-6 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center">
            <X className="w-3.5 h-3.5" />
          </div>
          <h4 className="font-serif text-xl text-parchment">What is Not Included</h4>
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground font-light">
          {exclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <X className="w-4 h-4 text-red-400/80 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
