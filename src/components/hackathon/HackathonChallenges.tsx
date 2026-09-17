"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonChallenges() {
  const { challenge } = HACKATHON_CONFIG;

  return (
    <section id="challenge" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {challenge.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {challenge.heading}
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{challenge.statusText} // {challenge.statusBadge}</span>
            </div>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              {challenge.description}
            </p>
          </div>
        </div>

        {/* Coming Soon Editorial Display Box */}
        <div className="pt-16">
          <div className="p-8 sm:p-12 md:p-16 rounded-2xl border border-white/15 bg-white/[0.02] text-center space-y-6 relative overflow-hidden">
            <div className="font-mono text-xs text-text-muted tracking-widest uppercase">
              CONFIDENTIAL PROTOCOL // ANNOUNCEMENT ON-STAGE
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              CHALLENGE DETAILS
              <span className="block text-primary mt-2">COMING SOON</span>
            </h3>

            <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto font-light leading-relaxed">
              Problem statements will be revealed live on-stage at 11:30 AM IST on 25th September 2026 at Malnad College of Engineering. All teams start with an equal clean slate.
            </p>

            <div className="pt-4 flex items-center justify-center gap-4 font-mono text-xs text-text-muted">
              <span>DATE: 25 SEPT 2026</span>
              <span>•</span>
              <span>TIME: 11:30 AM IST</span>
              <span>•</span>
              <span>VENUE: MCE HASSAN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
