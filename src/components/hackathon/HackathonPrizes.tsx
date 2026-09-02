"use client";

import { Trophy, Award, Sparkles } from "lucide-react";
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
            {/* Live Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>{prizes.comingSoonNotice}</span>
            </div>
          </div>
        </div>

        {/* Oversized Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
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
                      <Trophy className="w-5 h-5 text-primary" />
                    ) : (
                      <Award className="w-5 h-5 text-text-muted" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Reward Highlight */}
                  <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">
                      REWARD PACKAGE
                    </div>
                    <div className="font-semibold text-base text-primary">
                      {item.reward}
                    </div>
                  </div>

                  {/* Details */}
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                    {item.details}
                  </p>
                </div>

                {/* Coming Soon Notice inside card */}
                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-text-muted">
                  <span>DISCLOSURE</span>
                  <span className="text-text-secondary">{prizes.comingSoonNotice}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Sub-banner */}
        <div className="mt-12 p-6 rounded-xl border border-white/[0.08] bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>SPECIAL RECOGNITIONS: BEST UI/UX • ARCHITECTURAL EXCELLENCE • SOCIAL UTILITY</span>
          </div>
          <span className="text-text-muted">EVALUATED BY SENIOR INDUSTRY PRACTITIONERS</span>
        </div>
      </div>
    </section>
  );
}
