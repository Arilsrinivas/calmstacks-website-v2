"use client";

import { Trophy, Award, Sparkles, GraduationCap, Coffee } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonPrizes() {
  const { prizes } = HACKATHON_CONFIG;

  return (
    <section id="prizes" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-white/[0.08] items-end">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-3">
              {prizes.sectionTag}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02] whitespace-pre-line">
              {prizes.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              {prizes.subheading}
            </p>
            {/* Live Prize Summary Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>TOTAL CASH POOL: {prizes.prizePoolTotal} • 6 INTERNSHIPS</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-12">
          {prizes.specialPerks.map((perk) => (
            <div
              key={perk.title}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {perk.tag}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white tracking-tight">
                  {perk.title}
                </h4>
                <p className="text-xs text-text-secondary font-light mt-1">
                  {perk.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Oversized Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {prizes.items.map((item, idx) => {
            const isFirstPlace = idx === 0;

            return (
              <div
                key={item.place}
                className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isFirstPlace
                    ? "bg-white/[0.03] border-primary/40 shadow-2xl shadow-primary/10"
                    : "bg-white/[0.01] border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Background Huge Ghost Rank Number */}
                <div className="absolute -top-6 -right-3 font-mono text-8xl sm:text-9xl font-bold text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors">
                  {item.rankNumber}
                </div>

                <div>
                  {/* Rank & Category */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
                        isFirstPlace
                          ? "bg-primary text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {item.place}
                    </span>

                    {isFirstPlace ? (
                      <Trophy className="w-6 h-6 text-primary" />
                    ) : (
                      <Award className="w-5 h-5 text-text-muted" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Reward Highlight */}
                  <div className="my-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">
                      REWARD PACKAGE
                    </div>
                    <div className="font-bold text-lg text-primary">
                      {item.reward}
                    </div>
                  </div>

                  {/* Details */}
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                    {item.details}
                  </p>
                </div>

                {/* Highlights Footer */}
                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px]">
                  <span className="text-text-muted">BENCHMARK</span>
                  <span className="text-emerald-400 font-semibold">{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Participation & Food Assurance Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">
                Certificate of Participation For ALL Attendees
              </h4>
              <p className="text-xs text-text-secondary font-light mt-1">
                Every attendee who actively participates for 24 hours receives a verified certificate issued jointly by CalmStacks and the Department of Computer Science & Engineering.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-mono text-xs text-text-muted border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            <Coffee className="w-4 h-4 text-primary" />
            <span className="text-white font-medium">All Meals & Refreshments Provided</span>
          </div>
        </div>
      </div>
    </section>
  );
}
