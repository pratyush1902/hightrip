import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { Phone, ShieldCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Send an Enquiry | High Trip Holidays',
  description: 'Tell us about your journey. One message and our concierge contacts you with today’s price, directly on WhatsApp.',
};

export default function EnquirePage() {
  return (
    <div className="bg-obsidian min-h-screen text-parchment py-16 sm:py-24 selection:bg-bronze/30 selection:text-bronze-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
            Direct Concierge Desk
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-parchment leading-tight">
            Send an <em className="italic text-bronze-light font-normal">enquiry.</em>
          </h1>
          <p className="text-sm sm:text-base text-sand/80 font-light max-w-xl mx-auto leading-relaxed">
            Message us with the place, the dates, and how many are travelling. We reply directly on WhatsApp with a tailored plan and today’s price, usually within the hour in India hours.
          </p>
        </div>

        {/* The Direct Form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>

        {/* Quick Contact Alternatives */}
        <div className="pt-8 border-t border-obsidian-border text-center space-y-4">
          <p className="text-xs font-mono text-muted-stone">
            Prefer direct voice or manual chat?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20planning%20a%20holiday."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp (+91 91555 66268)</span>
            </a>

            <a
              href="tel:+919155566268"
              className="px-6 py-3 rounded-full border border-obsidian-border hover:border-bronze/40 text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-bronze" />
              <span>Call +91 91555 66268</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
