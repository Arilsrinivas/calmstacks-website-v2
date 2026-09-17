"use client";

import { ArrowUpRight, Compass, MapPin } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonVenue() {
  const { venue } = HACKATHON_CONFIG;

  return (
    <section id="venue" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {venue.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 6 Columns: Venue Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02] mb-6">
                {venue.heading}
              </h2>
            </div>

            <div className="space-y-4 p-8 rounded-2xl border border-white/15 bg-white/[0.02]">
              <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold">
                <MapPin className="w-4 h-4" />
                <span>OFFICIAL EVENT VENUE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
                {venue.institution}
              </h3>

              <div className="font-mono text-sm text-primary uppercase">
                {venue.location}
              </div>

              <div className="inline-block font-mono text-xs px-3 py-1 rounded bg-white/10 text-white font-semibold uppercase">
                {venue.format}
              </div>
            </div>

            <div>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-lg"
              >
                <span>{venue.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>

          {/* Right 6 Columns: Geo-coordinates & Minimal Technical Grid */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>GEO-COORDINATES</span>
                </div>
                <span className="text-white font-semibold">13.0072° N, 76.0964° E</span>
              </div>

              <div className="relative h-64 w-full rounded-xl bg-black/60 border border-white/[0.1] flex flex-col items-center justify-center p-6 text-center space-y-3 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px",
                  }}
                />

                <div className="relative z-10 space-y-2">
                  <div className="font-mono text-xs text-primary font-semibold">
                    MALNAD COLLEGE OF ENGINEERING
                  </div>
                  <div className="font-mono text-lg font-bold text-white uppercase">
                    HASSAN, KARNATAKA
                  </div>
                  <div className="font-mono text-xs text-text-muted">
                    PIN 573202 // KARNATAKA, INDIA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
