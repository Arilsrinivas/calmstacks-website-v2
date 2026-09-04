"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonPillars() {
  const { pillars } = HACKATHON_CONFIG;

  return (
    <section className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {pillars.sectionTag}
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y border-white/[0.08]">
          {pillars.items.map((item, index) => (
            <div
              key={item.title}
              className="py-10 md:py-14 px-4 sm:px-6 md:px-6 lg:px-8 flex flex-col justify-between group overflow-hidden"
            >
              {/* Pillar Number */}
              <div className="font-mono text-xs text-text-muted mb-8">
                0{index + 1} {"//"} CODE OF CONDUCT
              </div>

              {/* Pillar Typography */}
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white uppercase group-hover:text-primary transition-colors duration-300 break-words leading-tight">
                  {item.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-primary tracking-wide">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>

              {/* Minimal Bottom Geometric Accent */}
              <div className="pt-10">
                <div className="w-12 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
