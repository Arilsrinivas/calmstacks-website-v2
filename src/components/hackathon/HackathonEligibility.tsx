"use client";

import { Check, Users, GraduationCap, Utensils, IndianRupee } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonEligibility() {
  const { eligibility, meta } = HACKATHON_CONFIG;

  return (
    <section className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
          {eligibility.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 6 Columns: Eligibility Statement & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {eligibility.heading}
            </h2>

            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/[0.03] space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                <GraduationCap className="w-4 h-4" />
                <span>TEAM SIZE & PARTICIPATION CRITERIA</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {eligibility.primaryAudience}
              </p>
              <p className="text-sm text-text-secondary font-light">
                {eligibility.eventContext}
              </p>
            </div>

            {/* Value Cards: Fee & Food */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                  <IndianRupee className="w-4 h-4" />
                  <span>REGISTRATION FEE</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  ₹1,200 <span className="text-xs font-normal text-text-muted">/ team of 4 (₹300/head)</span>
                </div>
                <p className="text-xs text-text-secondary font-light">
                  Fixed fee of ₹1,200 per team covers 24-hour entry for all 4 members, kits, and evaluation.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold">
                  <Utensils className="w-4 h-4" />
                  <span>ALL FOOD INCLUDED</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  100% Covered
                </div>
                <p className="text-xs text-text-secondary font-light">
                  Lunch, evening snacks, dinner, midnight energy fuel, tea/coffee, and breakfast provided.
                </p>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Team Guidelines & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-wider">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{eligibility.teamConfiguration.title}</span>
                </div>
                <span className="font-mono text-xs text-primary font-semibold px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                  {meta.teamSizeLimit}
                </span>
              </div>

              <p className="text-base text-text-primary leading-relaxed font-light">
                {eligibility.teamConfiguration.details}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  EVENT CHECKLIST & REQUIREMENTS:
                </div>
                {eligibility.teamConfiguration.requirements.map((req) => (
                  <div key={req} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary font-light">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
