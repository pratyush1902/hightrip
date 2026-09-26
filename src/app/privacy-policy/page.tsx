import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and client data protection guidelines for High Trip Holidays Private Limited.',
};

export default function PrivacyPolicyPage() {
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
            Legal & Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-parchment">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-muted-stone">
            Effective Date: 25 August 2026 · High Trip Holidays Private Limited
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              1. Our Data Protection Philosophy
            </h2>
            <p>
              High Trip Holidays Private Limited (“we”, “our”, or “us”) respects the fundamental right to personal privacy. We collect only the information strictly required to coordinate custom travel arrangements, international flight reservations, resort allocations, and legal entry permits. We never monetize, sell, or rent client data to commercial marketing third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Contact Coordinates:</strong> Full legal names, personal email addresses, and phone numbers for WhatsApp itinerary coordination.
              </li>
              <li>
                <strong>Travel Specifics:</strong> Passport copies and dates of birth strictly when required by maritime authorities, seaplane operators, or international border control.
              </li>
              <li>
                <strong>Dietary & Wellness Preferences:</strong> Voluntarily provided dietary allergies, mobility needs, or anniversary dates to facilitate bespoke hospitality.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              3. How Your Information Is Shared
            </h2>
            <p>
              Your travel specifics are transmitted securely and exclusively to confirmed service providers (resorts, private vehicle chauffeurs, local certified guides, and maritime operators) solely for the fulfillment of your itinerary.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              4. Contact Our Compliance Office
            </h2>
            <p>
              For data access requests or policy queries, contact our legal desk at <a href="mailto:sales@hightripholidays.in" className="text-bronze underline">sales@hightripholidays.in</a> or by mail to Basma Complex, Flat C-403, West Lohianagar, Sampatchak, Patna, Bihar 800020.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
