"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonPrizes() {
  const { prizes } = HACKATHON_CONFIG;

  return (
    <section id="prizes" className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {prizes.sectionTag}
        </div>

        {/* Prize Pool Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-extrabold text-white tracking-tight uppercase leading-[0.88]">
              {prizes.headingAmount}
            </h2>
            <div className="font-mono text-xl sm:text-2xl font-bold text-primary tracking-widest uppercase mt-3">
              {prizes.headingLabel}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="w-12 h-[2px] bg-primary" />
            <p className="font-mono text-lg sm:text-xl font-bold tracking-widest text-primary uppercase">
              {prizes.tagline}
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              {prizes.description}
            </p>
          </div>
        </div>

        {/* Three Place Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16">
          {prizes.items.map((item) => (
            <div
              key={item.number}
              className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-6 hover:border-primary/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    RANK {item.number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                  {item.place}
                </h3>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <p className="font-mono text-[11px] text-text-muted tracking-wider uppercase">
                  RECOGNITION
                </p>
                <p className="font-mono text-xs font-semibold text-primary tracking-wider uppercase">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
