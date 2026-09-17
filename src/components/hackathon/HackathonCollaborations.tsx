"use client";

import { ArrowUpRight } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonCollaborations() {
  const { collaborations } = HACKATHON_CONFIG;

  return (
    <section id="collaborations" className="relative py-16 sm:py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
            {collaborations.sectionTag}
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02]">
            {collaborations.heading}
          </h2>
        </div>

        {/* Editorial Partner Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Partner 1: Agamya Cyber Tech */}
          <div className="pt-8 lg:pt-0 lg:pr-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary font-semibold">01</span>
                <span className="font-mono text-[10px] uppercase text-text-muted tracking-widest">
                  CYBERSECURITY COLLABORATOR
                </span>
              </div>

              {/* Official Logo Container */}
              <div className="py-6 px-8 rounded-xl border border-white/10 bg-white/[0.02] max-w-sm flex items-center justify-start">
                <img
                  src={collaborations.partners[0].logo}
                  alt={collaborations.partners[0].alt}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  {collaborations.partners[0].name}
                </h3>
                <p className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                  {collaborations.partners[0].tagline}
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                  {collaborations.partners[0].description}
                </p>
              </div>

              {/* Cybersecurity Capabilities / Services */}
              <div className="pt-2 space-y-2">
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                  CORE SPECIALIZATIONS & SERVICES
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-[11px] text-white">
                  {collaborations.partners[0].services?.map((service) => (
                    <span
                      key={service}
                      className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href={collaborations.partners[0].website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-white hover:text-primary transition-colors tracking-wider group"
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

              {/* Official Logo Container */}
              <div className="py-6 px-8 rounded-xl border border-white/10 bg-white/[0.02] max-w-sm flex items-center justify-start">
                <img
                  src={collaborations.partners[1].logo}
                  alt={collaborations.partners[1].alt}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  {collaborations.partners[1].name}
                </h3>
                <p className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                  {collaborations.partners[1].institution} // {collaborations.partners[1].tagline}
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                  {collaborations.partners[1].description}
                </p>
              </div>

              {/* Department Highlights */}
              <div className="pt-2 space-y-2">
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                  ACADEMIC & RESEARCH FOCUS AREAS
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-[11px] text-white">
                  {["COMPUTER NETWORKING", "ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DEEP LEARNING", "CLOUD COMPUTING"].map((focus) => (
                    <span
                      key={focus}
                      className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href={collaborations.partners[1].website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-white hover:text-primary transition-colors tracking-wider group"
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
