"use client";

import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonPillars() {
  const { whatYouWillDo } = HACKATHON_CONFIG;

  return (
    <section className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-10">
          02 // WHAT YOU'LL DO
        </div>

        {/* 4 Large Editorial Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whatYouWillDo.map((item) => (
            <div
              key={item.number}
              className="border-t border-white/15 pt-8 pb-4 flex flex-col justify-between space-y-6 group hover:border-primary transition-colors duration-300"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-primary tracking-widest mb-6">
                  {item.number}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 group-hover:bg-primary/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
