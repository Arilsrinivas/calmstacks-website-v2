"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonPrizes() {
  const { prizes } = HACKATHON_CONFIG;

  return (
    <section id="prizes" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {prizes.sectionTag}
        </div>

        {/* Huge Typography Prize Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-7">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[108px] font-bold text-white tracking-tight uppercase leading-[0.9]">
              {prizes.heading}
            </h2>
            <div className="font-mono text-lg sm:text-2xl font-light text-primary tracking-widest uppercase mt-4">
              {prizes.prizePoolLabel}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="w-12 h-[2px] bg-primary" />
            <p className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-primary uppercase">
              {prizes.tagline}
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              Compete for ₹50,000 cash prizes, direct recognition, and career opportunities at the 24-Hour Hackathon in Malnad College of Engineering, Hassan.
            </p>
          </div>
        </div>

        {/* Podium Ranks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          {prizes.items.map((item) => (
            <div
              key={item.number}
              className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-8 hover:border-primary/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {item.number}
                  </span>
                  <span className="font-mono text-xs text-text-muted uppercase">PODIUM</span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight uppercase mb-3">
                  {item.place}
                </h3>

                <p className="font-mono text-xs text-text-secondary tracking-wider uppercase pt-2 border-t border-white/10">
                  {item.details}
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
