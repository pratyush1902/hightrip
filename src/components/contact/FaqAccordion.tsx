'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What does “Every price carries its date” mean?',
    answer:
      'Unlike platforms that advertise low “starting from” rates only valid on obscure off-season weekdays, every High Trip Holidays package states the exact calendar day it was published and the final day it is guaranteed to. If you inquire within that window, that price is honoured with zero arbitrary surcharges.',
  },
  {
    question: 'How does your 24/7 dedicated private concierge service work?',
    answer:
      'Upon confirming your reservation, you are assigned a dedicated destination specialist. You receive direct phone and WhatsApp lines to this coordinator. They handle your flight web check-ins, speedboat timings, dietary alerts for restaurants, and remain on standby during your trip in case of weather delays.',
  },
  {
    question: 'Are international air tickets included in the package prices?',
    answer:
      'To provide you total flexibility with frequent-flyer miles, preferred departure cities, and seat classes, international airfares are quoted separately at net airline rates. All internal flights, seaplanes, panoramic trains, and private luxury chauffeurs specified in the itinerary are 100% included.',
  },
  {
    question: 'Can itineraries be customized for private couples or multi-generational families?',
    answer:
      'Yes, absolutely. Every published package can serve as an architectural starting point. We regularly adjust durations, upgrade villa tiers, incorporate private private chef dinners, or slow the pacing for older family members.',
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer:
      'We maintain one of the most transparent cancellation policies in luxury travel. Cancellations made 30+ days prior to departure receive a 90% refund (less non-recoverable resort or rail deposits). Full details are published on our dedicated Cancellation Policy page.',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
          Frequent Inquiries
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-parchment mt-1">
          Questions & Honest Answers
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-obsidian-surface border-bronze/40 shadow-md'
                  : 'bg-obsidian border-obsidian-border hover:border-obsidian-border/80'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-serif text-base sm:text-lg text-parchment leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`p-1.5 rounded-full bg-obsidian border border-obsidian-border text-sand transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-bronze' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light border-t border-obsidian-border/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
