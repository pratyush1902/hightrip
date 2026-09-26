'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { destinations } from '@/data/destinations';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export function MobileSheet({ isOpen, onClose, onOpenInquiry }: MobileSheetProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const navLinks = [
    { href: '/', label: 'Home', number: '01', desc: 'The window-seat perspective' },
    { href: '/packages', label: 'Holidays & Packages', number: '02', desc: 'Curated international & domestic escapes' },
    { href: '/fixed-departures', label: 'Fixed Departures', number: '03', desc: 'Set dates, published prices with flights' },
    { href: '/destinations', label: 'Destinations', number: '04', desc: 'Every place we plan' },
    { href: '/experiences', label: 'Experiences', number: '05', desc: 'Meaningful dark-tourism & quiet trails' },
    { href: '/about', label: 'About High Trip', number: '06', desc: 'Our craft, founders, and philosophy' },
    { href: '/blog', label: 'Travel Journal', number: '07', desc: 'Field notes, guides, and packing tips' },
    { href: '/contact', label: 'Contact & Concierge', number: '08', desc: 'Direct phone, WhatsApp & planning' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fade-in text-parchment"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div className="p-5 border-b border-obsidian-border flex items-center justify-between">
        <BrandLogo />
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-obsidian-surface border border-obsidian-border text-sand hover:text-parchment transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Nav Items with numbered index */}
      <div className="px-6 py-6 space-y-6">
        <ul className="space-y-4">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline justify-between group py-1"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-bronze-light">
                      {item.number}
                    </span>
                    <span
                      className={`text-xl font-serif tracking-tight transition-colors ${
                        isActive ? 'text-bronze' : 'text-parchment group-hover:text-bronze-light'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-stone group-hover:text-bronze group-hover:translate-x-1 transition-all" />
                </Link>
                <p className="text-xs text-muted-foreground pl-7">{item.desc}</p>
              </li>
            );
          })}
        </ul>

        {/* Quick Destination Chips */}
        <div className="pt-4 border-t border-obsidian-border">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-stone block mb-3">
            Quick Destination Shortcuts
          </span>
          <div className="flex flex-wrap gap-2">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                onClick={onClose}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-obsidian-surface border border-obsidian-border text-sand hover:text-bronze-light hover:border-bronze transition-colors flex items-center gap-1.5"
              >
                <span>{d.name}</span>
                <span className="text-[10px] text-bronze-light opacity-80">· {d.airportCode}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet Actions */}
      <div className="p-6 border-t border-obsidian-border bg-obsidian-surface/60 space-y-3">
        <button
          onClick={onOpenInquiry}
          className="w-full py-3 rounded-lg bg-bronze-gradient text-obsidian font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <span>Plan Custom Itinerary</span>
        </button>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20a%20holiday."
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href="tel:+919155566268"
            className="py-2.5 px-3 rounded-lg bg-obsidian border border-obsidian-border text-sand text-xs font-medium flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
