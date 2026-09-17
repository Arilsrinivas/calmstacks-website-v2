"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonPrizes() {
  const { prizes } = HACKATHON_CONFIG;

  return (
    <section id="prizes" className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest">
          {prizes.sectionTag}
        </div>

        {/* Prize Pool Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-7 space-y-2">
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

        {/* Reward Pillars: ₹50,000 + 04 Paid Internships + Variable Unpaid Internships */}
        <div>
          <div className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">
            REWARD STRUCTURE // CASH + OPPORTUNITIES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Total Prize Pool */}
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-6 hover:border-primary/50 transition-colors">
              <div className="space-y-3">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                  {prizes.totalLabel}
                </div>
                <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  {prizes.headingAmount}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  A total cash prize pool of ₹50,000 awarded to top-performing hackathon projects.
                </p>
              </div>
            </div>

            {/* 2. Paid Internships */}
            <div className="p-8 rounded-2xl border border-primary/30 bg-primary/[0.03] flex flex-col justify-between space-y-6 hover:border-primary/60 transition-colors">
              <div className="space-y-3">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                  {prizes.internships.paid.label}
                </div>
                <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  {prizes.internships.paid.value}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {prizes.internships.paid.description}
                </p>
              </div>
            </div>

            {/* 3. Unpaid Internships */}
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-6 hover:border-primary/50 transition-colors">
              <div className="space-y-3">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                  {prizes.internships.unpaid.label}
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {prizes.internships.unpaid.value}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {prizes.internships.unpaid.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Podium Place Cards */}
        <div>
          <div className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">
            PODIUM // RECOGNITION
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                    REWARD & DISTRIBUTION
                  </p>
                  <p className="font-mono text-xs font-semibold text-primary tracking-wider uppercase">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="py-6 px-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono text-xs">
          <div className="text-primary font-bold tracking-widest uppercase">
            {prizes.tagline}
          </div>
          <div className="text-white/70 tracking-wider uppercase">
            {prizes.sprintMotto}
          </div>
        </div>
      </div>
    </section>
  );
}
