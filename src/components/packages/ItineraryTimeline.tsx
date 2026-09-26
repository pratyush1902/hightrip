'use client';

import { useState } from 'react';
import { ChevronDown, Utensils, Bed, MapPin, CheckCircle } from 'lucide-react';
import { PackageItineraryDay } from '@/types/travel';

interface ItineraryTimelineProps {
  itinerary: PackageItineraryDay[];
}

export function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  // First 2 days open by default
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => setOpenDays(itinerary.map((d) => d.day));
  const collapseAll = () => setOpenDays([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-obsidian-border">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronze-light block">
            Day-by-Day Breakdown
          </span>
          <h3 className="font-serif text-2xl text-parchment mt-0.5">The Daily Journey</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={expandAll}
            className="text-sand hover:text-bronze-light transition-colors underline cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-muted-stone">·</span>
          <button
            onClick={collapseAll}
            className="text-sand hover:text-bronze-light transition-colors underline cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {itinerary.map((item) => {
          const isOpen = openDays.includes(item.day);
          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-obsidian-surface border-bronze/40 shadow-md'
                  : 'bg-obsidian border-obsidian-border hover:border-obsidian-border/80'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleDay(item.day)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors flex-shrink-0 ${
                      isOpen
                        ? 'bg-bronze-gradient text-obsidian'
                        : 'bg-obsidian-card text-sand border border-obsidian-border'
                    }`}
                  >
                    D{item.day}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] text-bronze-light flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-bronze" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl text-parchment leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div
                  className={`p-2 rounded-full bg-obsidian border border-obsidian-border text-sand transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-bronze' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-obsidian-border/60 text-sm space-y-4">
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {item.description}
                  </p>

                  {/* Highlights / Activities list */}
                  {item.activities && item.activities.length > 0 && (
                    <div className="bg-obsidian/70 rounded-xl p-3.5 border border-obsidian-border space-y-2">
                      <span className="text-[11px] font-mono text-bronze-light uppercase tracking-wider block">
                        Included Experiences for Day {item.day}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-sand">
                        {item.activities.map((act, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-bronze flex-shrink-0" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meals & Stay Pills */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-muted-stone">
                    <span className="flex items-center gap-1.5 bg-obsidian-card px-3 py-1.5 rounded-lg border border-obsidian-border">
                      <Utensils className="w-3.5 h-3.5 text-bronze" />
                      <span>{item.meals}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-obsidian-card px-3 py-1.5 rounded-lg border border-obsidian-border">
                      <Bed className="w-3.5 h-3.5 text-bronze" />
                      <span>Stay: {item.stay}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
