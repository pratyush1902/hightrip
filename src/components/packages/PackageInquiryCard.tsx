'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { TravelPackage } from '@/types/travel';

interface PackageInquiryCardProps {
  pkg: TravelPackage;
}

export function PackageInquiryCard({ pkg }: PackageInquiryCardProps) {
  const [guests, setGuests] = useState(2);
  const [targetDate, setTargetDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [waLink, setWaLink] = useState('');

  const totalPrice = pkg.priceINR * guests;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errs.phone = '10-digit phone required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructWhatsAppMessage = () => {
    const lines = [
      `Hi High Trip Holidays, I would like to book / inquire about the *${pkg.title}* package:`,
      '',
      `• *Package:* ${pkg.title}`,
      `• *Duration:* ${pkg.durationDays} Days / ${pkg.durationNights} Nights`,
      `• *Rate:* ₹${pkg.priceINR.toLocaleString('en-IN')} / person`,
      `• *Estimated Total:* ₹${totalPrice.toLocaleString('en-IN')} (${guests} Travelers)`,
      targetDate ? `• *Estimated Travel Month/Date:* ${targetDate}` : '• *Travel Dates:* Flexible',
      '',
      `• *Traveler Name:* ${name.trim()}`,
      `• *Phone / WhatsApp:* ${phone.trim()}`,
      email.trim() ? `• *Email:* ${email.trim()}` : null,
      '',
      `Please share available departure dates and the full itinerary quote.`
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = constructWhatsAppMessage();
    const url = `https://wa.me/919155566268?text=${encodeURIComponent(message)}`;
    setWaLink(url);
    setIsSuccess(true);

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-7 shadow-2xl sticky top-28 space-y-5">
      {/* Price Block */}
      <div className="pb-4 border-b border-obsidian-border">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-stone block">
          Bespoke Pricing
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-serif font-bold text-parchment">
            Price On Request
          </span>
        </div>
        <p className="text-[11px] font-mono text-bronze-light mt-1">
          Customized itineraries · Instant quote via WhatsApp
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Travelers & Date Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-sand block mb-1">
                Travelers
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-obsidian border border-obsidian-border text-xs text-parchment focus:ring-1 focus:ring-bronze"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={6}>6 Guests (Family)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-sand block mb-1">
                Estimated Month
              </label>
              <input
                type="month"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-obsidian border border-obsidian-border text-xs text-parchment focus:ring-1 focus:ring-bronze"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-mono text-sand block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohini Roy"
                className={`w-full px-3 py-2 rounded-lg bg-obsidian border text-xs text-parchment focus:ring-1 focus:ring-bronze ${
                  errors.name ? 'border-red-500' : 'border-obsidian-border'
                }`}
              />
              {errors.name && <p className="text-[10px] text-red-400 mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="text-[11px] font-mono text-sand block mb-1">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 91555 66268"
                className={`w-full px-3 py-2 rounded-lg bg-obsidian border text-xs text-parchment focus:ring-1 focus:ring-bronze ${
                  errors.phone ? 'border-red-500' : 'border-obsidian-border'
                }`}
              />
              {errors.phone && <p className="text-[10px] text-red-400 mt-0.5">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-[11px] font-mono text-sand block mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohini@example.com"
                className="w-full px-3 py-2 rounded-lg bg-obsidian border border-obsidian-border text-xs text-parchment focus:ring-1 focus:ring-bronze"
              />
            </div>
          </div>

          {/* Total Price preview */}
          <div className="p-3 rounded-lg bg-obsidian border border-obsidian-border flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Estimated Quote ({guests} Guests):</span>
            <span className="text-xs font-bold text-bronze-light">
              Bespoke Quote On Request
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
            </svg>
            <span>Send Details to WhatsApp</span>
          </button>

          <div className="pt-1 text-[10px] text-center text-muted-stone flex items-center justify-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
            <span>Opens WhatsApp (+91 91555 66268) with all trip details pre-filled.</span>
          </div>
        </form>
      ) : (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-bronze/10 border border-bronze/30 flex items-center justify-center text-bronze">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-light block">
              Dispatched to WhatsApp
            </span>
            <h4 className="font-serif text-xl text-parchment mt-1">Inquiry Sent</h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-light">
              Your inquiry for <strong>{pkg.title}</strong> has been sent to WhatsApp (+91 91555 66268). A senior destination specialist will respond with dates and availability.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open WhatsApp Chat</span>
            </a>

            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full border border-obsidian-border text-xs text-sand hover:text-parchment hover:bg-obsidian transition-colors cursor-pointer font-mono"
            >
              Modify Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
