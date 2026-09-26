import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaqAccordion } from '@/components/contact/FaqAccordion';

export const metadata: Metadata = {
  title: 'Contact Concierge & Plan a Journey',
  description:
    'Connect with High Trip Holidays. Speak directly with our destination coordinators via phone, WhatsApp, or request a custom travel consultation.',
};

export default function ContactPage() {
  return (
    <div className="bg-obsidian min-h-screen text-parchment py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block mb-2">
            Direct Communication
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-parchment leading-tight">
            Speak with the people <br />
            <em className="italic text-bronze-light font-normal">who plan the route.</em>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            Whether you are planning a honeymoon, an alpine rail crossing, or a quiet solo retreat, we welcome your thoughts. We do not use automated phone trees; you speak directly with seasoned travel designers.
          </p>
        </div>

        {/* 3 Direct Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bronze/10 border border-bronze/20 flex items-center justify-center text-bronze mb-2">
              <Phone className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-stone block">
              Direct Telephone Line
            </span>
            <a
              href="tel:+919155566268"
              className="font-serif text-2xl text-parchment hover:text-bronze-light transition-colors block"
            >
              +91 91555 66268
            </a>
            <p className="text-xs text-muted-foreground font-light">
              Available Monday to Saturday, 09:30 to 19:30 IST. Dedicated line for ongoing travelers 24/7.
            </p>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 mb-2">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-stone block">
              Instant Concierge Chat
            </span>
            <a
              href="https://wa.me/919155566268?text=Hi%20High%20Trip%20Holidays%2C%20I%20am%20interested%20in%20planning%20a%20holiday."
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-2xl text-emerald-400 hover:underline block"
            >
              WhatsApp Us ↗
            </a>
            <p className="text-xs text-muted-foreground font-light">
              Fastest response for quick quote checks, room availability, and villa queries.
            </p>
          </div>

          {/* Email & Office Card */}
          <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bronze/10 border border-bronze/20 flex items-center justify-center text-bronze mb-2">
              <Mail className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-stone block">
              Written Enquiries
            </span>
            <a
              href="mailto:sales@hightripholidays.in"
              className="font-serif text-xl sm:text-2xl text-parchment hover:text-bronze-light transition-colors block"
            >
              sales@hightripholidays.in
            </a>
            <p className="text-xs text-muted-foreground font-light">
              Send detailed multi-city briefs, corporate retreat requests, or group queries.
            </p>
          </div>
        </div>

        {/* Main Grid: Contact Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-8">
            {/* Office Coordinates */}
            <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
                Registered Corporate Office
              </span>
              <h3 className="font-serif text-2xl text-parchment">
                High Trip Holidays Pvt. Ltd.
              </h3>
              <div className="text-xs text-muted-foreground font-light space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                  <span>
                    Basma Complex, Flat C-403, West Lohianagar, Sampatchak, Patna, Bihar 800020, India
                  </span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted-stone pt-2 border-t border-obsidian-border">
                  <span>CIN: U79120BR2026PTC087611</span>
                </div>
              </div>
            </div>

            {/* Interactive FAQs */}
            <FaqAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
