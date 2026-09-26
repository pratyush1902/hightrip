'use client';

import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, Globe, Calendar, Users } from 'lucide-react';
import { destinations } from '@/data/destinations';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errs.phone = 'Valid 10-digit phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructWhatsAppMessage = () => {
    const lines = [
      'Hi High Trip Holidays, I would like to schedule a travel consultation:',
      '',
      `• *Name:* ${name.trim()}`,
      `• *Phone / WhatsApp:* ${phone.trim()}`,
      email.trim() ? `• *Email:* ${email.trim()}` : null,
      `• *Destination Looking For:* ${destination || 'Open to recommendations'}`,
      month.trim() ? `• *Target Travel Window:* ${month.trim()}` : '• *Target Travel Window:* Flexible',
      `• *Number of Travelers:* ${travelers} guest(s)`,
      message.trim() ? `• *Special Notes / Preferences:*\n${message.trim()}` : null,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const text = constructWhatsAppMessage();
    const url = `https://wa.me/919155566268?text=${encodeURIComponent(text)}`;
    setWaUrl(url);
    setIsSuccess(true);

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDestination('');
    setMonth('');
    setMessage('');
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-2xl">
        <div className="w-14 h-14 mx-auto rounded-full bg-bronze/10 border border-bronze/30 flex items-center justify-center text-bronze">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
            Dispatched to WhatsApp
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-parchment mt-1">
            Thank you, {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed font-light">
            Your travel consultation details have been sent to WhatsApp (+91 91555 66268). A dedicated private concierge will respond shortly.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-obsidian-border text-xs text-sand hover:text-parchment hover:bg-obsidian transition-colors cursor-pointer font-mono uppercase tracking-wider"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-obsidian-surface border border-obsidian-border rounded-2xl p-6 sm:p-10 shadow-2xl space-y-5"
    >
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
          Custom Consultation
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-parchment mt-1">
          Tell Us Where You Seek <em className="italic text-bronze-light font-normal">Quietude</em>
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Fill in your preferences below. All form information is sent straight to WhatsApp for instant concierge support.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
            Your Full Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dhirendra Kashyap"
            className={`w-full px-4 py-2.5 rounded-xl bg-obsidian border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze transition-colors ${
              errors.name ? 'border-red-500' : 'border-obsidian-border'
            }`}
          />
          {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 91555 66268"
            className={`w-full px-4 py-2.5 rounded-xl bg-obsidian border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze transition-colors ${
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
          placeholder="sales@hightripholidays.in"
          className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
        />
      </div>

      {/* Destination, Target Travel Month & Travelers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-sand mb-1.5 font-mono flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-bronze" />
            <span>Destination</span>
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
          >
            <option value="">Open to ideas</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name} ({d.country})
              </option>
            ))}
            <option value="Experiences (Dark Tourism & Historic Trails)">
              Experiences (Dark Tourism)
            </option>
            <option value="Fixed Departures Group Tour">Fixed Departures</option>
            <option value="Other Bespoke Route">Other Bespoke Route</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-sand mb-1.5 font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-bronze" />
            <span>Target Month</span>
          </label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="e.g. October 2026"
            className="w-full px-3.5 py-2 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-sand mb-1.5 font-mono flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-bronze" />
            <span>Guests</span>
          </label>
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
          >
            <option value="1">1 Solo</option>
            <option value="2">2 Couple</option>
            <option value="3-4">3-4 Family</option>
            <option value="5+">5+ Group</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
          Notes, Special Inclusions, or Dietary Preferences
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about special occasions, preferred pace, or private villa requirements..."
          className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
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
        <p className="text-[11px] text-center text-muted-stone mt-2.5 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
          <span>All consultation is private and completely free of obligation.</span>
        </p>
      </div>
    </form>
  );
}
