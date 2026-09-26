'use client';

import { useState } from 'react';
import { X, CheckCircle2, Send, Phone, MessageSquare, Calendar, Users, Globe2 } from 'lucide-react';
import { destinations } from '@/data/destinations';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultPackageTitle?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  defaultDestination = '',
  defaultPackageTitle = '',
}: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('Comfort Luxury (₹50k - ₹1.5L / person)');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [waLink, setWaLink] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errs.phone = 'Please enter a valid 10-digit phone number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructWhatsAppMessage = () => {
    const lines = [
      'Hi High Trip Holidays, I would like to inquire about a journey:',
      '',
      `• *Name:* ${name.trim()}`,
      `• *Phone:* ${phone.trim()}`,
      email.trim() ? `• *Email:* ${email.trim()}` : null,
      `• *Destination / Interest:* ${destination || defaultDestination || defaultPackageTitle || 'Bespoke Inquiry'}`,
      defaultPackageTitle ? `• *Package:* ${defaultPackageTitle}` : null,
      date ? `• *Travel Dates / Month:* ${date}` : '• *Travel Dates:* Flexible',
      `• *Travelers:* ${travelers} guest(s)`,
      `• *Budget Range:* ${budget}`,
      notes.trim() ? `• *Special Wishes / Notes:*\n${notes.trim()}` : null,
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

    // Open WhatsApp directly in new tab/window
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-obsidian-surface border border-obsidian-border rounded-2xl shadow-2xl p-6 sm:p-8 text-parchment overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-parchment hover:bg-obsidian transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light">
                Direct WhatsApp Inquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-parchment mt-1">
                Plan Your <em className="italic text-bronze-light font-normal">Journey</em>
              </h3>
              {defaultPackageTitle && (
                <p className="mt-2 text-xs font-mono text-bronze px-2.5 py-1 bg-bronze/10 border border-bronze/20 rounded inline-block">
                  Package: {defaultPackageTitle}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohini Roy"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze transition-colors ${
                      errors.name ? 'border-red-500' : 'border-obsidian-border'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-obsidian-border'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohini@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                    Destination / Route
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                  >
                    <option value="">Choose Destination or Style</option>
                    <optgroup label="Popular Destinations">
                      {destinations.map((d) => (
                        <option key={d.slug} value={d.name}>
                          {d.name} ({d.country})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Specialized Verticals">
                      <option value="Experiences (Dark Tourism & Historic Trails)">
                        Experiences (Dark Tourism & Historic Trails)
                      </option>
                      <option value="Fixed Departures Group Tour">
                        Fixed Departures Group Tour
                      </option>
                      <option value="Custom Honeymoon Escape">Custom Honeymoon Escape</option>
                      <option value="Other / Multi-Country Journey">Other / Multi-Country Journey</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                    Estimated Travel Month
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. November 2026 or Diwali"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                    Number of Guests
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                  >
                    <option value="1">1 Solo Traveler</option>
                    <option value="2">2 Travelers (Couple / Friends)</option>
                    <option value="3-4">3-4 Travelers (Small Group / Family)</option>
                    <option value="5-8">5-8 Travelers (Family Gathering)</option>
                    <option value="9+">9+ Travelers (Private Group / Corporate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                    Budget Preference
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                  >
                    <option value="Smart Boutique (₹35k - ₹60k / person)">Smart Boutique (₹35k - ₹60k / person)</option>
                    <option value="Comfort Luxury (₹50k - ₹1.5L / person)">Comfort Luxury (₹50k - ₹1.5L / person)</option>
                    <option value="Ultra Luxury / Private Villa (₹1.5L+ / person)">Ultra Luxury / Private Villa (₹1.5L+ / person)</option>
                    <option value="Flexible / Advice Needed">Flexible / Advice Needed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                  Special Wishes or Specific Inclusions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Vegetarian dining preference, quiet room, private heritage guide..."
                  className="w-full px-3.5 py-2 rounded-lg bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-lg"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 1.800a8.200 8.200 0 11-4.200 15.250l-.300-.180-2.950.780.790-2.880-.200-.300A8.200 8.200 0 0112 3.800zM8.500 7.300c-.200 0-.500.070-.760.350-.260.290-1 1-1 2.400s1.030 2.780 1.170 2.970c.140.190 2 3.200 4.950 4.360 2.450.970 2.950.780 3.480.730.530-.050 1.720-.700 1.960-1.380.240-.680.240-1.260.170-1.380-.070-.120-.260-.190-.550-.340-.290-.140-1.720-.850-1.980-.940-.270-.100-.460-.150-.650.140-.190.290-.750.940-.920 1.130-.170.200-.340.220-.630.070-.290-.140-1.220-.450-2.330-1.440a8.700 8.700 0 01-1.610-2c-.170-.290-.020-.450.130-.590.130-.130.290-.340.430-.510.150-.170.200-.290.290-.480.100-.200.050-.360-.020-.510-.070-.140-.650-1.570-.890-2.150-.230-.560-.470-.480-.650-.490l-.560-.010z" />
                  </svg>
                  <span>Send All Info to WhatsApp (+91 91555 66268)</span>
                </button>
                <p className="text-[11px] text-center text-muted-stone mt-2 font-mono">
                  Your full trip request will open directly in WhatsApp for an instant concierge reply.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-bronze/10 border border-bronze/30 flex items-center justify-center text-bronze">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light">
                Dispatched to WhatsApp
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-parchment mt-1">
                Thank You, {name.split(' ')[0]}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed font-light">
                Your travel inquiry details have been formatted and dispatched directly to High Trip Holidays on WhatsApp.
              </p>
            </div>

            <div className="bg-obsidian p-4 rounded-xl border border-obsidian-border text-left text-xs space-y-2 max-w-sm mx-auto font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span>Destination:</span>
                <span className="text-sand">{destination || 'Custom Curation'}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Travelers:</span>
                <span className="text-sand">{travelers} Guests</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Contact:</span>
                <span className="text-sand">{phone}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-Open WhatsApp Chat</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-obsidian-border text-xs text-sand hover:text-parchment hover:bg-obsidian transition-colors cursor-pointer font-mono uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
