"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonAbout() {
  const { about } = HACKATHON_CONFIG;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
          {about.sectionTag}
        </div>

        {/* Editorial Heading & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/[0.08]">
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {about.heading}
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-xl text-text-primary font-normal leading-relaxed">
              {about.intro}
            </p>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              {about.subIntro}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-text-muted">
              <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                HOST // MALNAD COLLEGE OF ENGINEERING
              </div>
              <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                DEPT // CSE STUDENT DEVELOPMENT SERIES
              </div>
            </div>
          </div>
        </div>

        {/* 4 Minimal Editorial Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {about.features.map((feature) => (
            <div
              key={feature.number}
              className="group relative border-t border-white/15 pt-8 flex flex-col justify-between space-y-8 hover:border-primary transition-colors duration-300"
            >
              <div>
                {/* Large Monospace Number */}
                <div className="font-mono text-xs font-semibold text-primary tracking-widest mb-4">
                  {feature.number} // FEATURE
                </div>

                {/* Block Title */}
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Minimal Geometric Progress Line */}
              <div className="w-full h-[1px] bg-white/[0.08] group-hover:bg-primary/40 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
