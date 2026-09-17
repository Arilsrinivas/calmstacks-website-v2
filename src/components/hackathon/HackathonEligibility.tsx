"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonEligibility() {
  const { eligibility } = HACKATHON_CONFIG;

  return (
    <section id="eligibility" className="relative py-16 sm:py-20 lg:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {eligibility.sectionTag}
        </div>

        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02]">
              {eligibility.heading}
            </h2>
            <p className="font-mono text-lg sm:text-xl font-bold tracking-wider text-primary uppercase">
              {eligibility.subheading}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{eligibility.badge}</span>
            </div>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              {eligibility.description}
            </p>
          </div>
        </div>

        {/* Large Bordered Information Card */}
        <div className="pt-12 sm:pt-16">
          <div className="p-8 sm:p-12 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:border-primary/40 transition-colors">
            {/* Left Side Info */}
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {eligibility.cardTitle}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                {eligibility.cardDescription}
              </p>
            </div>

            {/* Right Side Technical Label */}
            <div className="font-mono text-xs sm:text-sm font-bold text-primary tracking-widest uppercase border-l-2 border-primary pl-4 py-1 space-y-1">
              {eligibility.seriesLabel.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
              {eligibility.footerNote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
