"use client";

import { MapPin, Navigation, ArrowUpRight, CheckCircle2, Compass, BookOpen } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonVenue() {
  const { venue } = HACKATHON_CONFIG;

  return (
    <section className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
          {venue.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left 6 Columns: Venue Information */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL VENUE // CENTRAL LIBRARY</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02] whitespace-pre-line">
                {venue.heading}
              </h2>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {venue.institution}
              </h3>
              <p className="text-base text-primary font-mono">
                {venue.department}
              </p>
              <p className="text-sm text-text-secondary font-light">
                {venue.city} — PIN {venue.pincode}
              </p>
            </div>

            {/* On-Site Amenities / Infrastructure */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                CENTRAL LIBRARY ON-SITE INFRASTRUCTURE:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {venue.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-xs text-text-secondary font-light"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider hover:bg-white/90 transition-all active:scale-95 shadow-md"
              >
                <Navigation className="w-4 h-4 text-black" />
                <span>{venue.ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black/60" />
              </a>
            </div>
          </div>

          {/* Right 6 Columns: Minimal Map / Coordinates Schematic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 overflow-hidden backdrop-blur-sm">
              {/* Corner Coordinates & Crosshairs */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>GEO-COORDINATES</span>
                </div>
                <span className="text-white font-semibold">{venue.coordinates}</span>
              </div>

              {/* Technical Schematic Map Visualization */}
              <div className="relative h-64 w-full rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-center overflow-hidden">
                {/* Grid Lines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Radar concentric rings */}
                <div className="w-44 h-44 rounded-full border border-primary/20 absolute animate-ping opacity-25" />
                <div className="w-32 h-32 rounded-full border border-white/10 absolute" />
                <div className="w-16 h-16 rounded-full border border-primary/40 absolute flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Pin HUD Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/80 border border-white/15 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-bold text-xs text-white">Central Library, MCE Campus</div>
                      <div className="font-mono text-[10px] text-text-muted">Hassan, Karnataka</div>
                    </div>
                  </div>

                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-primary hover:underline flex items-center gap-1"
                  >
                    Maps <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Bottom Telemetry strip */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span>DESTINATION // 24H OFFLINE VENUE</span>
                <span className="text-emerald-400">CENTRAL LIBRARY AIR-CONDITIONED HALLS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
