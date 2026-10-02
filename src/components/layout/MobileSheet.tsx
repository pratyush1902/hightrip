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
      className="fixed inset-0 z-50 bg-[#0e0d0b]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-fade-in text-[#fbf9f5]"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div className="p-5 border-b border-[#2e2822] flex items-center justify-between sticky top-0 bg-[#0e0d0b]/90 backdrop-blur-md z-10">
        <BrandLogo variant="light" />
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#1c1814] border border-[#3a3229] text-[#e8ded0] hover:text-[#c48c58] transition-colors cursor-pointer"
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
                  className="flex items-baseline justify-between group py-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#c48c58] font-bold">
                      {item.number}
                    </span>
                    <span
                      className={`text-xl font-serif tracking-tight transition-colors ${
                        isActive ? 'text-[#c48c58] font-bold' : 'text-[#fbf9f5] group-hover:text-[#c48c58]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8a8278] group-hover:text-[#c48c58] group-hover:translate-x-1 transition-all" />
                </Link>
                <p className="text-xs text-[#a39b8e] pl-7 font-light">{item.desc}</p>
              </li>
            );
          })}
        </ul>

        {/* Quick Destination Chips */}
        <div className="pt-4 border-t border-[#2e2822]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#a39b8e] block mb-3">
            Quick Destination Shortcuts
          </span>
          <div className="flex flex-wrap gap-2">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                onClick={onClose}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#1c1814] border border-[#3a3229] text-[#e8ded0] hover:text-[#c48c58] hover:border-[#c48c58] transition-colors flex items-center gap-1.5"
              >
                <span>{d.name}</span>
                <span className="text-[10px] text-[#c48c58] opacity-80">· {d.airportCode}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet Actions */}
      <div className="p-6 border-t border-[#2e2822] bg-[#141210] space-y-3 sticky bottom-0">
        <button
          onClick={onOpenInquiry}
          className="w-full py-3.5 rounded-xl bg-[#c48c58] hover:bg-[#b57d4a] text-[#12100e] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
        >
          <span>Plan Custom Itinerary →</span>
        </button>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20a%20holiday."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href="tel:+919155566268"
            className="py-3 px-3 rounded-xl bg-[#1c1814] border border-[#3a3229] text-[#fbf9f5] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
