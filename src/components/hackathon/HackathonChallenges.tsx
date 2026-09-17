"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonChallenges() {
  const { challenge } = HACKATHON_CONFIG;

  return (
    <section id="challenge" className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {challenge.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02]">
              {challenge.heading}
            </h2>
            <p className="font-mono text-lg sm:text-xl font-bold tracking-wider text-primary uppercase">
              {challenge.subheading}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              {challenge.description}
            </p>
          </div>
        </div>

        {/* Stack Policy Information Card */}
        <div className="pt-12 sm:pt-16">
          <div className="p-8 sm:p-12 rounded-2xl border border-white/15 bg-white/[0.02] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-primary/40 transition-colors">
            <div className="lg:col-span-7 space-y-3">
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
                {challenge.stackTitle}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {challenge.stackSubheading}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                {challenge.stackDescription}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-2.5 font-mono text-xs text-white">
              {["FULL-STACK", "AI / ML", "MOBILE APPS", "WEB DEV", "CLOUD / APIs", "DEV TOOLS"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-md border border-white/15 bg-white/[0.03] hover:border-primary/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
