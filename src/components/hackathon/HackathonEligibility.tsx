"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonEligibility() {
  const { eligibility, participation } = HACKATHON_CONFIG;

  return (
    <section id="eligibility" className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
          {eligibility.sectionTag}
        </div>

        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 border-b border-white/10">
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

        {/* Prominent Banner: ANY COLLEGE. ANY BRANCH. ANY YEAR. */}
        <div className="py-6 px-8 rounded-2xl border border-primary/40 bg-primary/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="font-mono text-lg sm:text-2xl font-extrabold tracking-widest text-primary uppercase">
            {eligibility.prominentMotto}
          </div>
          <div className="font-mono text-xs text-white/70 uppercase tracking-wider">
            ALL PARTICIPANTS WELCOME
          </div>
        </div>

        {/* Top Bordered Information Card */}
        <div className="p-8 sm:p-12 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:border-primary/40 transition-colors">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-block font-mono text-xs text-primary font-bold tracking-widest uppercase px-3 py-1 rounded bg-primary/10 border border-primary/20">
              {eligibility.cardTitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              OPEN TO ALL STUDENTS
            </h3>
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              {eligibility.cardDescription}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-black/40 space-y-3 font-mono text-xs text-left shrink-0 max-w-xs">
            <div className="font-bold text-primary tracking-widest uppercase border-l-2 border-primary pl-3 py-0.5 space-y-0.5">
              {eligibility.seriesLabel.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
            <div className="text-[10px] text-text-muted leading-tight border-t border-white/10 pt-2 uppercase">
              {eligibility.seriesSubtext}
            </div>
          </div>
        </div>

        {/* Participation Breakdown: Who Should Join & What To Bring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* Who Should Join Card */}
          <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-8 hover:border-primary/40 transition-colors">
            <div className="space-y-6">
              <div>
                <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase mb-1">
                  {participation.whoShouldJoinSubtitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  {participation.whoShouldJoinTitle}
                </h3>
              </div>

              <ul className="space-y-3 font-mono text-xs text-white">
                {participation.reasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="tracking-wider">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-primary uppercase">
                {participation.whoShouldJoinFooter}
              </p>
            </div>
          </div>

          {/* What To Bring Card */}
          <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-8 hover:border-primary/40 transition-colors">
            <div className="space-y-6">
              <div>
                <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase mb-1">
                  {participation.whatToBringSubtitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  {participation.whatToBringTitle}
                </h3>
              </div>

              <ul className="space-y-3 font-mono text-xs text-white">
                {participation.itemsToBring.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="tracking-wider">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-primary uppercase">
                {participation.whatToBringFooter}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
