'use client';

import { ChevronDown } from 'lucide-react';

interface HeroProgressProps {
  currentStage: number; // 0 to 4
  totalStages: number;
  stageName: string;
  isExpanded: boolean;
  className?: string;
}

export function HeroProgress({
  currentStage,
  totalStages,
  stageName,
  isExpanded,
  className = '',
}: HeroProgressProps) {
  return (
    <div
      className={`flex items-center justify-between text-xs font-mono transition-colors duration-500 ${
        isExpanded ? 'text-white/70' : 'text-[#7a746e]'
      } ${className}`}
    >
      {/* Left Metadata / Coordinates */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c48c58] animate-pulse" />
        <span className="uppercase tracking-wider">
          {stageName}
        </span>
      </div>

      {/* Right Scroll Indicator */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline">Scroll to open view</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#c48c58] animate-bounce" />
      </div>
    </div>
  );
}
