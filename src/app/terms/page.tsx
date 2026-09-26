import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Booking',
  description: 'Booking terms, guarantees, and client agreement for High Trip Holidays Private Limited.',
};

export default function TermsPage() {
  return (
    <div className="bg-obsidian min-h-screen text-parchment py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-sand/80 hover:text-parchment transition-colors bg-obsidian-surface px-3.5 py-1.5 rounded-full border border-obsidian-border"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-bronze" />
            <span>Return to Home</span>
          </Link>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
            Client Agreement
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-parchment">
            Terms of Booking
          </h1>
          <p className="text-xs font-mono text-muted-stone">
            High Trip Holidays Private Limited · CIN: U79120BR2026PTC087611
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              1. The Booking Contract
            </h2>
            <p>
              A contract between the traveler and High Trip Holidays Private Limited comes into existence upon the issuance of our written confirmation voucher and the receipt of the initial itinerary commitment deposit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              2. Price Integrity & Validity Guarantee
            </h2>
            <p>
              Under our “Every Price Carries Its Date” standard, any booking inquiry submitted within the published validity date of a package is guaranteed at that price. Subsequent currency fluctuations or seasonal price hikes will not be passed onto the traveler once a formal quotation is accepted within its validity period.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              3. Passports, Visas & Health Formalities
            </h2>
            <p>
              Travelers must hold a valid passport with at least 6 months validity from the scheduled return date. While our concierge team assists with visa documentation checklists and application appointments, final visa issuance remains at the sole sovereign discretion of the respective embassy or immigration authority.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              4. Code of Conduct on Historical Remembrance Trails
            </h2>
            <p>
              Guests participating in designated dark-tourism and memorial trails agree to observe local decorum, silence guidelines, and dress codes. High Trip Holidays reserves the right to withdraw services from any traveler who acts disrespectfully toward sacred or commemorative grounds.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
