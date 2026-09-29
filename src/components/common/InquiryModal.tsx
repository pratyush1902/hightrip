'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Users, 
  Globe2,
  Palmtree,
  Plane,
  Building2,
  Clock,
  Sparkles,
  Tag
} from 'lucide-react';
import { destinations } from '@/data/destinations';

type InquiryCategory = 'holiday' | 'flight' | 'hotel';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultPackageTitle?: string;
  defaultCategory?: InquiryCategory;
}

export function InquiryModal({
  isOpen,
  onClose,
  defaultDestination = '',
  defaultPackageTitle = '',
  defaultCategory = 'holiday',
}: InquiryModalProps) {
  // Category selection: Holiday Packages, Flight Booking, Hotel Booking
  const [category, setCategory] = useState<InquiryCategory>(defaultCategory);

  // Common Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 1. Holiday Fields
  const [destination, setDestination] = useState(defaultDestination);
  const [holidayDate, setHolidayDate] = useState('');
  const [travelers, setTravelers] = useState('2 Travelers (Couple / Friends)');
  const [budget, setBudget] = useState('Comfort Luxury (₹50k - ₹1.5L / person)');
  const [holidayNotes, setHolidayNotes] = useState('');

  // 2. Flight Fields
  const [flightTripType, setFlightTripType] = useState<'round' | 'oneway' | 'multi'>('round');
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState(defaultDestination || '');
  const [flightDepartDate, setFlightDepartDate] = useState('');
  const [flightReturnDate, setFlightReturnDate] = useState('');
  const [flightPassengers, setFlightPassengers] = useState('2 Passengers');
  const [flightClass, setFlightClass] = useState('Economy (Best Value Fares)');
  const [flightNotes, setFlightNotes] = useState('');

  // 3. Hotel Fields
  const [hotelDestination, setHotelDestination] = useState(defaultDestination || '');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelRoomsGuests, setHotelRoomsGuests] = useState('1 Room · 2 Guests');
  const [hotelStyle, setHotelStyle] = useState('5-Star Luxury Resort');
  const [hotelMealPlan, setHotelMealPlan] = useState('Breakfast Included (CP Plan)');
  const [hotelNotes, setHotelNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [waLink, setWaLink] = useState('');

  // Lock background scrolling and allow modal to handle all wheel/touch scroll
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    // Category specific validations
    if (category === 'flight') {
      if (!flightFrom.trim()) errs.flightFrom = 'Please specify departure city/airport';
      if (!flightTo.trim()) errs.flightTo = 'Please specify arrival destination';
    } else if (category === 'hotel') {
      if (!hotelDestination.trim()) errs.hotelDestination = 'Please specify destination or hotel';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Construct customized WhatsApp Message based on Category
  const constructWhatsAppMessage = () => {
    if (category === 'flight') {
      const lines = [
        '✈️ *FLIGHT BOOKING ENQUIRY (BEST DEAL)*',
        'Hi High Trip Holidays, I would like to request flight fares and availability:',
        '',
        `• *Client Name:* ${name.trim()}`,
        `• *Phone / WhatsApp:* ${phone.trim()}`,
        email.trim() ? `• *Email:* ${email.trim()}` : null,
        '',
        `• *Trip Type:* ${flightTripType === 'round' ? 'Round Trip' : flightTripType === 'oneway' ? 'One Way' : 'Multi-City'}`,
        `• *From:* ${flightFrom.trim()}`,
        `• *To:* ${flightTo.trim()}`,
        `• *Departure Date:* ${flightDepartDate.trim() || 'Flexible'}`,
        flightTripType === 'round' && flightReturnDate.trim() ? `• *Return Date:* ${flightReturnDate.trim()}` : null,
        `• *Passengers:* ${flightPassengers}`,
        `• *Cabin Class:* ${flightClass}`,
        flightNotes.trim() ? `• *Special Airline Preferences / Luggage:*\n${flightNotes.trim()}` : null,
        '',
        '_Please share the best flight deals with luggage and direct flight options._'
      ].filter(Boolean);
      return lines.join('\n');
    }

    if (category === 'hotel') {
      const lines = [
        '🏨 *HOTEL & RESORT BOOKING ENQUIRY (BEST DEAL)*',
        'Hi High Trip Holidays, I would like to check hotel availability and exclusive rates:',
        '',
        `• *Client Name:* ${name.trim()}`,
        `• *Phone / WhatsApp:* ${phone.trim()}`,
        email.trim() ? `• *Email:* ${email.trim()}` : null,
        '',
        `• *Destination / City / Hotel:* ${hotelDestination.trim()}`,
        `• *Check-in Date:* ${hotelCheckIn.trim() || 'Flexible'}`,
        `• *Check-out Date:* ${hotelCheckOut.trim() || 'Flexible'}`,
        `• *Rooms & Guests:* ${hotelRoomsGuests}`,
        `• *Preferred Property Style:* ${hotelStyle}`,
        `• *Meal Plan Preference:* ${hotelMealPlan}`,
        hotelNotes.trim() ? `• *Special Room Requests (View/Honeymoon/Bed):*\n${hotelNotes.trim()}` : null,
        '',
        '_Please share discounted stay rates with complimentary upgrades if available._'
      ].filter(Boolean);
      return lines.join('\n');
    }

    // Default: Holiday Packages
    const lines = [
      '🌴 *HOLIDAY PACKAGE ENQUIRY (BEST DEAL)*',
      'Hi High Trip Holidays, I would like to inquire about a custom holiday package:',
      '',
      `• *Client Name:* ${name.trim()}`,
      `• *Phone / WhatsApp:* ${phone.trim()}`,
      email.trim() ? `• *Email:* ${email.trim()}` : null,
      '',
      `• *Destination / Tour Style:* ${destination || defaultDestination || defaultPackageTitle || 'Bespoke Exploration'}`,
      defaultPackageTitle ? `• *Selected Itinerary:* ${defaultPackageTitle}` : null,
      holidayDate.trim() ? `• *Estimated Travel Month / Dates:* ${holidayDate.trim()}` : '• *Travel Dates:* Flexible',
      `• *Number of Travelers:* ${travelers}`,
      `• *Budget Range:* ${budget}`,
      holidayNotes.trim() ? `• *Special Wishes / Inclusions:*\n${holidayNotes.trim()}` : null,
      '',
      '_Please share the detailed itinerary with published day-by-day inclusions._'
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

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setHolidayNotes('');
    setFlightNotes('');
    setHotelNotes('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-obsidian-surface border border-obsidian-border rounded-3xl shadow-2xl p-6 sm:p-8 text-parchment max-h-[88vh] overflow-y-auto overscroll-contain my-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#8a6541 #1e1b18'
        }}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-parchment hover:bg-obsidian transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze-light flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-bronze" />
                <span>Direct Concierge Desk</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-parchment">
                Plan Your <em className="italic text-bronze-light font-normal">Journey</em>
              </h3>
              {defaultPackageTitle && (
                <p className="mt-2 text-xs font-mono text-bronze px-2.5 py-1 bg-bronze/10 border border-bronze/20 rounded inline-block">
                  Package: {defaultPackageTitle}
                </p>
              )}
            </div>

            {/* Category Selector Tabs with "Best Deal" Badges */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-stone-300 mb-2 font-mono uppercase tracking-wider">
                Select Enquiry Category
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. Holiday Packages */}
                <button
                  type="button"
                  onClick={() => setCategory('holiday')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    category === 'holiday'
                      ? 'bg-amber-950/40 border-[#c48c58] text-white shadow-md ring-1 ring-[#c48c58]/50'
                      : 'bg-[#181512] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <Palmtree className={`w-4 h-4 ${category === 'holiday' ? 'text-[#c48c58]' : 'text-stone-400'}`} />
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-950/90 text-emerald-400 border border-emerald-500/40">
                      Best Deal
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Holiday</div>
                    <div className="text-[10px] font-mono text-stone-400 hidden sm:block">Custom Packages</div>
                  </div>
                </button>

                {/* 2. Flight Booking */}
                <button
                  type="button"
                  onClick={() => setCategory('flight')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    category === 'flight'
                      ? 'bg-amber-950/40 border-[#c48c58] text-white shadow-md ring-1 ring-[#c48c58]/50'
                      : 'bg-[#181512] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <Plane className={`w-4 h-4 ${category === 'flight' ? 'text-[#c48c58]' : 'text-stone-400'}`} />
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-950/90 text-emerald-400 border border-emerald-500/40">
                      Best Deal
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Flight</div>
                    <div className="text-[10px] font-mono text-stone-400 hidden sm:block">Direct & Group Fares</div>
                  </div>
                </button>

                {/* 3. Hotel Booking */}
                <button
                  type="button"
                  onClick={() => setCategory('hotel')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    category === 'hotel'
                      ? 'bg-amber-950/40 border-[#c48c58] text-white shadow-md ring-1 ring-[#c48c58]/50'
                      : 'bg-[#181512] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <Building2 className={`w-4 h-4 ${category === 'hotel' ? 'text-[#c48c58]' : 'text-stone-400'}`} />
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-950/90 text-emerald-400 border border-emerald-500/40">
                      Best Deal
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Hotel</div>
                    <div className="text-[10px] font-mono text-stone-400 hidden sm:block">Resorts & Villas</div>
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Contact Details */}
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
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze transition-colors ${
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
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze transition-colors ${
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                />
              </div>

              {/* ======================================================== */}
              {/* CATEGORY 1: HOLIDAY PACKAGES SPECIFIC FIELDS             */}
              {/* ======================================================== */}
              {category === 'holiday' && (
                <div className="space-y-4 pt-2 border-t border-obsidian-border animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Destination / Route
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
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
                        Estimated Travel Month / Dates
                      </label>
                      <input
                        type="text"
                        value={holidayDate}
                        onChange={(e) => setHolidayDate(e.target.value)}
                        placeholder="e.g. November 2026 or Diwali"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                      </input>
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="1 Solo Traveler">1 Solo Traveler</option>
                        <option value="2 Travelers (Couple / Friends)">2 Travelers (Couple / Friends)</option>
                        <option value="3 to 4 Travelers (Family)">3 to 4 Travelers (Family)</option>
                        <option value="5+ Travelers (Group)">5+ Travelers (Group)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Budget Preference
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="Essential Comfort (₹30k - ₹50k / person)">Essential Comfort (₹30k - ₹50k / person)</option>
                        <option value="Comfort Luxury (₹50k - ₹1.5L / person)">Comfort Luxury (₹50k - ₹1.5L / person)</option>
                        <option value="Premium Luxury (₹1.5L - ₹3L / person)">Premium Luxury (₹1.5L - ₹3L / person)</option>
                        <option value="Ultra Luxe (₹3L+ / person)">Ultra Luxe (₹3L+ / person)</option>
                        <option value="Flexible / Best Value Available">Flexible / Best Value Available</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                      Special Wishes or Specific Inclusions
                    </label>
                    <textarea
                      rows={2}
                      value={holidayNotes}
                      onChange={(e) => setHolidayNotes(e.target.value)}
                      placeholder="e.g. Vegetarian dining preference, quiet room, private heritage guide, overwater villa..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* CATEGORY 2: FLIGHT BOOKING SPECIFIC FIELDS               */}
              {/* ======================================================== */}
              {category === 'flight' && (
                <div className="space-y-4 pt-2 border-t border-obsidian-border animate-fade-in">
                  {/* Trip Type Pills */}
                  <div>
                    <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                      Trip Type
                    </label>
                    <div className="inline-flex p-1 rounded-xl bg-obsidian border border-obsidian-border">
                      <button
                        type="button"
                        onClick={() => setFlightTripType('round')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          flightTripType === 'round'
                            ? 'bg-bronze text-[#14110e] font-semibold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        Round Trip
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlightTripType('oneway')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          flightTripType === 'oneway'
                            ? 'bg-bronze text-[#14110e] font-semibold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        One Way
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlightTripType('multi')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          flightTripType === 'multi'
                            ? 'bg-bronze text-[#14110e] font-semibold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        Multi-City
                      </button>
                    </div>
                  </div>

                  {/* Origin & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        From (Departure City / Airport) *
                      </label>
                      <input
                        type="text"
                        value={flightFrom}
                        onChange={(e) => setFlightFrom(e.target.value)}
                        placeholder="e.g. Delhi (DEL), Mumbai (BOM)"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze ${
                          errors.flightFrom ? 'border-red-500' : 'border-obsidian-border'
                        }`}
                      />
                      {errors.flightFrom && <p className="text-[11px] text-red-400 mt-1">{errors.flightFrom}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        To (Arrival Destination / Airport) *
                      </label>
                      <input
                        type="text"
                        value={flightTo}
                        onChange={(e) => setFlightTo(e.target.value)}
                        placeholder="e.g. Malé (MLE), Dubai (DXB), Hanoi (HAN)"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze ${
                          errors.flightTo ? 'border-red-500' : 'border-obsidian-border'
                        }`}
                      />
                      {errors.flightTo && <p className="text-[11px] text-red-400 mt-1">{errors.flightTo}</p>}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Departure Date
                      </label>
                      <input
                        type="text"
                        value={flightDepartDate}
                        onChange={(e) => setFlightDepartDate(e.target.value)}
                        placeholder="e.g. 15 Nov 2026 or Next Month"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Return Date {flightTripType === 'oneway' && '(Not Applicable)'}
                      </label>
                      <input
                        type="text"
                        disabled={flightTripType === 'oneway'}
                        value={flightTripType === 'oneway' ? 'One Way Flight' : flightReturnDate}
                        onChange={(e) => setFlightReturnDate(e.target.value)}
                        placeholder="e.g. 22 Nov 2026"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze disabled:opacity-40"
                      />
                    </div>
                  </div>

                  {/* Passengers & Class */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Passengers
                      </label>
                      <select
                        value={flightPassengers}
                        onChange={(e) => setFlightPassengers(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="1 Passenger (Adult)">1 Passenger (Adult)</option>
                        <option value="2 Passengers (Adults)">2 Passengers (Adults)</option>
                        <option value="Family (2 Adults + 1 Child)">Family (2 Adults + 1 Child)</option>
                        <option value="Family (2 Adults + 2 Children)">Family (2 Adults + 2 Children)</option>
                        <option value="Group (4+ Passengers)">Group (4+ Passengers)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Class of Travel
                      </label>
                      <select
                        value={flightClass}
                        onChange={(e) => setFlightClass(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="Economy (Best Value Fares)">Economy (Best Value Fares)</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business Class">Business Class</option>
                        <option value="First Class">First Class</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                      Flight Preferences & Luggage Requests
                    </label>
                    <textarea
                      rows={2}
                      value={flightNotes}
                      onChange={(e) => setFlightNotes(e.target.value)}
                      placeholder="e.g. Non-stop direct flight preferred, extra 30kg baggage, preferred airlines (Air India, Emirates, Singapore Airlines)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* CATEGORY 3: HOTEL BOOKING SPECIFIC FIELDS                */}
              {/* ======================================================== */}
              {category === 'hotel' && (
                <div className="space-y-4 pt-2 border-t border-obsidian-border animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        City / Destination / Hotel Name *
                      </label>
                      <input
                        type="text"
                        value={hotelDestination}
                        onChange={(e) => setHotelDestination(e.target.value)}
                        placeholder="e.g. Maldives Atoll, Phuket Beachfront, Positano"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze ${
                          errors.hotelDestination ? 'border-red-500' : 'border-obsidian-border'
                        }`}
                      />
                      {errors.hotelDestination && <p className="text-[11px] text-red-400 mt-1">{errors.hotelDestination}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Property & Room Style
                      </label>
                      <select
                        value={hotelStyle}
                        onChange={(e) => setHotelStyle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="5-Star Luxury Resort">5-Star Luxury Resort</option>
                        <option value="Overwater Lagoon Villa">Overwater Lagoon Villa</option>
                        <option value="Beachfront Pool Villa">Beachfront Pool Villa</option>
                        <option value="Heritage Palace / Haveli">Heritage Palace / Haveli</option>
                        <option value="Boutique City Center Hotel">Boutique City Center Hotel</option>
                        <option value="Comfort 4-Star Hotel">Comfort 4-Star Hotel</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Check-in Date
                      </label>
                      <input
                        type="text"
                        value={hotelCheckIn}
                        onChange={(e) => setHotelCheckIn(e.target.value)}
                        placeholder="e.g. 10 Dec 2026"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Check-out Date
                      </label>
                      <input
                        type="text"
                        value={hotelCheckOut}
                        onChange={(e) => setHotelCheckOut(e.target.value)}
                        placeholder="e.g. 15 Dec 2026 (5 Nights)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Rooms & Guests
                      </label>
                      <select
                        value={hotelRoomsGuests}
                        onChange={(e) => setHotelRoomsGuests(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="1 Room · 2 Guests">1 Room · 2 Guests</option>
                        <option value="1 Room · 1 Guest">1 Room · 1 Guest</option>
                        <option value="2 Rooms · 4 Guests">2 Rooms · 4 Guests</option>
                        <option value="Family Suite · 3 to 4 Guests">Family Suite · 3 to 4 Guests</option>
                        <option value="3+ Rooms · Group Stay">3+ Rooms · Group Stay</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                        Meal Plan Preference
                      </label>
                      <select
                        value={hotelMealPlan}
                        onChange={(e) => setHotelMealPlan(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze"
                      >
                        <option value="Breakfast Included (CP Plan)">Breakfast Included (CP Plan)</option>
                        <option value="Half Board (Breakfast + Dinner)">Half Board (Breakfast + Dinner)</option>
                        <option value="All-Inclusive (All Meals & Drinks)">All-Inclusive (All Meals & Drinks)</option>
                        <option value="Room Only (EP Plan)">Room Only (EP Plan)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-sand mb-1.5 font-mono">
                      Special Hotel Requests
                    </label>
                    <textarea
                      rows={2}
                      value={hotelNotes}
                      onChange={(e) => setHotelNotes(e.target.value)}
                      placeholder="e.g. Ocean view facing, high floor, anniversary complimentary decor, early check-in requested..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {category === 'flight'
                      ? 'Send Flight Enquiry to WhatsApp (+91 91555 66268)'
                      : category === 'hotel'
                      ? 'Send Hotel Enquiry to WhatsApp (+91 91555 66268)'
                      : 'Send Holiday Enquiry to WhatsApp (+91 91555 66268)'}
                  </span>
                </button>
                <p className="text-[11px] font-mono text-muted-stone text-center mt-2.5">
                  Opens directly in WhatsApp with all requested specifications for an instant concierge quote.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl text-parchment">Enquiry Prepared!</h4>
              <p className="text-xs sm:text-sm text-sand/80 font-light mt-1.5 max-w-sm mx-auto">
                Your customized {category === 'flight' ? 'flight' : category === 'hotel' ? 'hotel' : 'holiday'} specifications have been formatted. Click below if WhatsApp did not open automatically.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-bronze text-obsidian font-semibold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Now</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-obsidian-border text-sand hover:text-parchment font-mono text-xs tracking-wider uppercase cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
