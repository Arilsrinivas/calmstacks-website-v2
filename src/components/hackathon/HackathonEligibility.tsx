"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonEligibility() {
  const { eligibility } = HACKATHON_CONFIG;

  return (
    <section id="eligibility" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {eligibility.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-12 border-b border-white/[0.08]">
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {eligibility.heading}
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{eligibility.statusText} // {eligibility.statusBadge}</span>
            </div>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              {eligibility.description}
            </p>
          </div>
        </div>

        {/* Coming Soon Box */}
        <div className="pt-12">
          <div className="p-8 sm:p-12 rounded-2xl border border-white/15 bg-white/[0.02] text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase">
              ELIGIBILITY DETAILS
              <span className="text-primary ml-3">COMING SOON</span>
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto font-light leading-relaxed">
              Detailed eligibility criteria, registration guidelines, and participant prerequisites will be published soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
