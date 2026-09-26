import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Compass, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

export const metadata: Metadata = {
  title: 'About Our Craft & Philosophy',
  description:
    'Learn about High Trip Holidays, our window-seat travel philosophy, transparent pricing standards, and founder story.',
};

export default function AboutPage() {
  return (
    <div className="bg-obsidian min-h-screen text-parchment py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block mb-2">
            The Company & Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-parchment leading-tight">
            A window to somewhere <br />
            <em className="italic text-bronze-light font-normal">extraordinary.</em>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            High Trip Holidays was established with a singular conviction: travel is too valuable to be packaged like an assembly-line product. We design sensory, unhurried journeys where every vista is savoured and every itinerary is built with honest transparency.
          </p>
        </div>

        {/* The Window Seat Metaphor Section */}
        <div className="bg-obsidian-surface border border-obsidian-border rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-bronze-light uppercase tracking-widest block">
                The Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-parchment leading-tight">
                Why we plan around <br />
                <em className="italic text-bronze font-normal">the window seat.</em>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                There is a reason why commercial air travelers choose the window seat over the aisle. At 35,000 feet, you look out onto a world that has discarded human anxiety. Clouds stretch into incandescent oceans of light; jagged mountain ridges appear as intricate pencil drawings; shorelines meet tides with ancient patience.
              </p>
              <p className="text-sm sm:text-base text-sand/80 leading-relaxed font-light">
                We believe that feeling should not end when your flight lands. Every road we route, every boutique villa balcony we contract, and every sunrise walk we schedule is chosen because it gives you that same quiet pause.
              </p>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-obsidian-border shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85"
                alt="Window to somewhere extraordinary"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[11px] text-bronze-light block">
                  South Malé Atoll · Turquoise silence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Founder & Corporate Standard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[3/4] max-w-md mx-auto w-full rounded-2xl overflow-hidden border border-obsidian-border shadow-2xl bg-obsidian-surface">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85"
              alt="Dhirendra Kashyap, Founder"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-xs text-bronze-light uppercase tracking-wider block">
                Founder & Managing Director
              </span>
              <h3 className="font-serif text-2xl text-parchment">Dhirendra Kashyap</h3>
              <p className="text-xs text-sand/80 font-light mt-1">
                High Trip Holidays Private Limited
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              Leadership Manifesto
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment leading-snug">
              “We would rather plan 100 unforgettable journeys than 10,000 rushed itineraries.”
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
              <p>
                When High Trip Holidays was founded, the travel landscape had become flooded with algorithmically generated packages that prioritize volume over hospitality. Travelers were being shuttled through rigid schedules, generic souvenir markets, and oversized buffet halls.
              </p>
              <p>
                We chose a deliberate counter-course. Our team travels each route personally before publishing it. We know which corner table in Hoi An catches the sunset breeze; we know the quietest hour to visit the Sistine Chapel; we know the exact seaplane connections that prevent layovers in Malé.
              </p>
              <p>
                Our promise is simple: when you entrust your annual holiday or milestone anniversary to us, you receive our complete, undivided craft.
              </p>
            </div>

            {/* Corporate Registration Info */}
            <div className="p-4 rounded-xl bg-obsidian-surface border border-obsidian-border text-xs font-mono text-muted-stone space-y-1">
              <div>High Trip Holidays Private Limited</div>
              <div>Corporate Identity Number (CIN): U79120BR2026PTC087611</div>
              <div>Registered Office: Basma Complex, Flat C-403, Sampatchak, Patna, Bihar 800020</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craft */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
              Our Operating Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment mt-1">
              The Four Pillars of High Trip
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Every Price Carries Its Date',
                desc: 'We never publish misleading “starting from” rates with unfulfillable conditions. Each package displays the valid date window.',
              },
              {
                title: 'Hand-Inspected Stays',
                desc: 'We inspect boutique accommodations for acoustic peace, bedding comfort, natural daylight, and local ownership.',
              },
              {
                title: '24/7 Dedicated Concierge',
                desc: 'A dedicated travel coordinator stays on WhatsApp with you throughout the journey to handle flight delays or restaurant reservations.',
              },
              {
                title: 'Respectful Remembrance',
                desc: 'When exploring historical memorial sites, we adhere strictly to scholarship, silence, and conservation contributions.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-bronze/10 border border-bronze/20 flex items-center justify-center font-mono text-xs font-bold text-bronze">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl text-parchment">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Callout */}
        <div className="bg-obsidian-surface border border-bronze/30 rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
            Begin With A Simple Conversation
          </span>
          <h3 className="font-serif text-3xl text-parchment">
            Speak directly with our travel designers.
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto font-light">
            No sales scripts. Tell us what kind of view you are seeking, and we’ll formulate the route.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bronze-gradient text-obsidian font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity"
            >
              <span>Connect with Concierge</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
