"use client";

import { Check, Users, GraduationCap, FileCode2 } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonEligibility() {
  const { eligibility } = HACKATHON_CONFIG;

  return (
    <section className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
          {eligibility.sectionTag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 6 Columns: Eligibility Statement */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {eligibility.heading}
            </h2>

            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/[0.03] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                <GraduationCap className="w-4 h-4" />
                <span>PRIMARY ELIGIBILITY CRITERIA</span>
              </div>
              <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                {eligibility.primaryAudience}
              </p>
              <p className="text-sm text-text-secondary font-light">
                {eligibility.eventContext}
              </p>
            </div>
          </div>

          {/* Right 6 Columns: Team Guidelines (Editable field) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-wider">
                <Users className="w-4 h-4 text-primary" />
                <span>{eligibility.teamConfiguration.title}</span>
              </div>

              <p className="text-base text-text-primary leading-relaxed font-light">
                {eligibility.teamConfiguration.details}
              </p>

              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  EVENT PROTOCOLS:
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
