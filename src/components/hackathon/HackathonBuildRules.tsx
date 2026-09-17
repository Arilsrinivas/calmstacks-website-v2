"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonBuildRules() {
  const { buildFormat } = HACKATHON_CONFIG;

  return (
    <section className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          THE BUILD // SPRINT STAGES
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02] mb-12 sm:mb-16">
          THE BUILD
        </h2>

        {/* 6 Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {buildFormat.map((step) => (
            <div
              key={step.number}
              className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-6 hover:border-primary/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    STAGE {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
                  {step.name}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed font-light">
                  {step.desc}
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
