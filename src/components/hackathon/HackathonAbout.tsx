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

        {/* Editorial Heading & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {about.heading}
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed tracking-tight">
              {about.intro}
            </p>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              {about.subIntro}
            </p>

            <div className="pt-4 flex flex-wrap gap-3 font-mono text-xs text-text-muted">
              <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-white">
                ORGANIZER // CALMSTACKS
              </div>
              <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-white">
                COLLABORATION // AGAMYA CYBER TECH × MCE CSE
              </div>
              <div className="px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold">
                PRIZE POOL // ₹50,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
