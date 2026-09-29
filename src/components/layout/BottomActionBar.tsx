'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { InquiryModal } from '@/components/common/InquiryModal';

export function BottomActionBar() {
  const pathname = usePathname();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const isDark = pathname.startsWith('/experiences');

  return (
    <>
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-lg border-t px-3 py-2 transition-colors ${
          isDark
            ? 'bg-[#0e0d0b]/95 border-[#26211c] text-[#f5efe6]'
            : 'bg-obsidian-surface/95 border-obsidian-border text-parchment'
        }`}
      >
        <div className="grid grid-cols-5 items-center text-center">
          <Link
            href="/"
            className={`flex flex-col items-center py-1 transition-colors ${
              pathname === '/'
                ? 'text-bronze'
                : isDark
                ? 'text-[#8a8174] hover:text-[#f5efe6]'
                : 'text-muted-foreground hover:text-parchment'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-mono tracking-tight">Home</span>
          </Link>

          <Link
            href="/packages"
            className={`flex flex-col items-center py-1 transition-colors ${
              pathname.startsWith('/packages')
                ? 'text-bronze'
                : isDark
                ? 'text-[#8a8174] hover:text-[#f5efe6]'
                : 'text-muted-foreground hover:text-parchment'
            }`}
          >
            <Compass className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-mono tracking-tight">Holidays</span>
          </Link>

          <button
            onClick={() => setInquiryOpen(true)}
            className={`flex flex-col items-center py-1 cursor-pointer ${
              isDark ? 'text-bronze hover:text-white' : 'text-bronze-light hover:text-sand'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-bronze/20 border border-bronze/40 flex items-center justify-center mb-1">
              <CalendarCheck className="w-3.5 h-3.5 text-bronze" />
            </div>
            <span className="text-[10px] font-mono tracking-tight">Enquire</span>
          </button>

          <a
            href="tel:+919155566268"
            className={`flex flex-col items-center py-1 transition-colors ${
              isDark ? 'text-[#8a8174] hover:text-[#f5efe6]' : 'text-muted-foreground hover:text-parchment'
            }`}
          >
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-mono tracking-tight">Call</span>
          </a>

          <a
            href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20a%20holiday."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center py-1 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-mono tracking-tight">Chat</span>
          </a>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
