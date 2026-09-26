import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy',
  description: 'Tiered cancellation and refund guidelines for High Trip Holidays Private Limited.',
};

export default function CancellationPolicyPage() {
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
            Transparent Policies
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-parchment">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs font-mono text-muted-stone">
            Clear tiers, no hidden administrative penalties.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              1. Our Fair Booking Guarantee
            </h2>
            <p>
              We recognize that plans occasionally change due to personal, professional, or medical reasons. We pass along only non-recoverable direct vendor costs (e.g. non-refundable international rail passes or strict peak-season island resort deposits).
            </p>
          </section>

          {/* Refund Tiers Table */}
          <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl overflow-hidden shadow-lg">
            <div className="p-4 sm:p-5 bg-obsidian border-b border-obsidian-border font-mono text-xs text-sand flex items-center gap-2">
              <Clock className="w-4 h-4 text-bronze" />
              <span>Cancellation Notification Window & Refund Structure</span>
            </div>
            <div className="divide-y divide-obsidian-border/70 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-medium text-parchment">45+ Days Prior to Departure</span>
                <span className="font-mono text-emerald-400">95% Refund of total tour price</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-medium text-parchment">30 to 44 Days Prior to Departure</span>
                <span className="font-mono text-sand">80% Refund of total tour price</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-medium text-parchment">15 to 29 Days Prior to Departure</span>
                <span className="font-mono text-bronze-light">50% Refund of total tour price</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-medium text-parchment">Within 14 Days of Departure</span>
                <span className="font-mono text-red-400">Non-refundable (Resort & flight lock-in)</span>
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              2. Force Majeure & Severe Weather
            </h2>
            <p>
              In the unlikely event of civil emergencies, extreme typhoon warnings, or seaplane groundings caused by weather, High Trip Holidays will immediately work with resorts to rebook your stay or provide travel vouchers valid for 18 months without administrative fees.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-normal">
              3. Processing Timelines
            </h2>
            <p>
              Approved refunds are credited back to the original source of payment within 5 to 7 business days from the formal date of cancellation confirmation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
