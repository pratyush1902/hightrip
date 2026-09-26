'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface HeroCTAProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
  onClick?: () => void;
}

export function HeroCTA({
  href,
  text,
  variant = 'primary',
  className = '',
  onClick,
}: HeroCTAProps) {
  const baseClasses =
    'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none group';

  if (variant === 'glass') {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${baseClasses} bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-parchment shadow-lg ${className}`}
      >
        <span>{text}</span>
        <ArrowUpRight className="w-4 h-4 text-bronze-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }

  if (variant === 'secondary') {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${baseClasses} bg-transparent border border-[#181512]/20 hover:border-[#181512] text-[#181512] ${className}`}
      >
        <span>{text}</span>
        <ArrowUpRight className="w-4 h-4 text-bronze-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} bg-[#c48c58] hover:bg-[#b57d4a] text-[#12100e] shadow-md transition-colors ${className}`}
    >
      <span>{text}</span>
      <ArrowUpRight className="w-4 h-4 text-[#12100e] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
