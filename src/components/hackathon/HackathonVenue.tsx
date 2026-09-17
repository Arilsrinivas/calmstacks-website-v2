"use client";

import { ArrowUpRight, Compass, MapPin } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonVenue() {
  const { venue } = HACKATHON_CONFIG;

  return (
    <section id="venue" className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {venue.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 6 Columns: Venue Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02] mb-6">
                {venue.heading}
              </h2>
            </div>

            <div className="space-y-4 p-8 rounded-2xl border border-white/15 bg-white/[0.02]">
              <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold">
                <MapPin className="w-4 h-4" />
                <span>OFFICIAL EVENT VENUE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                {venue.institution}
              </h3>

              <div className="space-y-1 font-mono text-sm text-text-secondary">
                {venue.addressLines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded bg-white/10 text-white font-semibold uppercase">
                  OFFLINE
                </span>
                <span className="px-3 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-semibold uppercase">
                  24 HOUR HACKATHON
                </span>
              </div>
            </div>

            <div>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-lg"
              >
                <span>GET DIRECTIONS →</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>

          {/* Right 6 Columns: Geo-coordinates & Technical Location Card */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>GEO-COORDINATES</span>
                </div>
                <span className="text-white font-semibold">{HACKATHON_CONFIG.meta.coordinates}</span>
              </div>

              <div className="relative h-64 w-full rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3 overflow-hidden">
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
                    SALAGAME ROAD // PIN 573202
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
