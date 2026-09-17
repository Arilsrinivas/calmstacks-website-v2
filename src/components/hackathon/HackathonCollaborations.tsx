"use client";

import { ArrowUpRight } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonCollaborations() {
  const { collaborations } = HACKATHON_CONFIG;

  return (
    <section id="collaborations" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
          {collaborations.sectionTag}
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02] mb-16">
          {collaborations.heading}
        </h2>

        {/* Editorial Partner Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* Partner 1: Agamya Cyber Tech */}
          <div className="pt-8 lg:pt-0 lg:pr-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary font-semibold">01</span>
                <span className="font-mono text-[10px] uppercase text-text-muted tracking-widest">
                  CYBERSECURITY COLLABORATOR
                </span>
              </div>

              {/* Logo Container with Natural Aspect Ratio */}
              <div className="py-6 px-8 rounded-xl border border-white/10 bg-white/[0.02] max-w-sm">
                <img
                  src={collaborations.partners[0].logo}
                  alt={collaborations.partners[0].alt}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
                  {collaborations.partners[0].name}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                  {collaborations.partners[0].description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <a
                href={collaborations.partners[0].website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-white hover:text-primary transition-colors tracking-wider group"
              >
                <span>{collaborations.partners[0].cta}</span>
                <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Partner 2: Department of Computer Science & Engineering, MCE */}
          <div className="pt-12 lg:pt-0 lg:pl-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary font-semibold">02</span>
                <span className="font-mono text-[10px] uppercase text-text-muted tracking-widest">
                  INSTITUTIONAL COLLABORATOR
                </span>
              </div>

              {/* Logo Container with Natural Aspect Ratio */}
              <div className="py-6 px-8 rounded-xl border border-white/10 bg-white/[0.02] max-w-sm">
                <img
                  src={collaborations.partners[1].logo}
                  alt={collaborations.partners[1].alt}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
                  {collaborations.partners[1].name}
                </h3>
                <p className="font-mono text-sm text-primary uppercase">
                  {collaborations.partners[1].institution}
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                  {collaborations.partners[1].description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <a
                href={collaborations.partners[1].website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-white hover:text-primary transition-colors tracking-wider group"
              >
                <span>{collaborations.partners[1].cta}</span>
                <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
