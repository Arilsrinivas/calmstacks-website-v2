"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Layers, ChevronRight } from "lucide-react";
import { HACKATHON_CONFIG, HackathonTrack } from "@/config/hackathonConfig";

interface HackathonChallengesProps {
  onSelectTrack?: (trackId: string) => void;
}

export default function HackathonChallenges({ onSelectTrack }: HackathonChallengesProps) {
  const { challenges } = HACKATHON_CONFIG;
  const [activeTrack, setActiveTrack] = useState<string | null>(challenges.tracks[0].id);

  return (
    <section id="challenge" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-3">
              {challenges.sectionTag}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {challenges.heading}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-text-secondary max-w-md font-light leading-relaxed">
            {challenges.description}
          </p>
        </div>

        {/* Editorial Rows (Stacked Full Width) */}
        <div className="divide-y divide-white/[0.08]">
          {challenges.tracks.map((track) => {
            const isHovered = activeTrack === track.id;

            return (
              <div
                key={track.id}
                onMouseEnter={() => setActiveTrack(track.id)}
                onClick={() => onSelectTrack?.(track.id)}
                className={`group py-8 sm:py-10 transition-all duration-300 cursor-pointer ${
                  isHovered ? "bg-white/[0.02]" : ""
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-2 sm:px-4">
                  {/* Track Number & Title */}
                  <div className="lg:col-span-5 flex items-start sm:items-center gap-6">
                    <span className="font-mono text-xl sm:text-2xl font-light text-primary tracking-wider">
                      {track.number}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                        {track.title}
                      </h3>
                      <p className="font-mono text-xs text-text-muted mt-1 tracking-wide">
                        {track.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description & Focus Areas */}
                  <div className="lg:col-span-5 space-y-3">
                    <p className="text-sm text-text-secondary leading-relaxed font-light">
                      {track.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-text-secondary group-hover:border-primary/30 group-hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Arrow / Interaction Indicator */}
                  <div className="lg:col-span-2 flex items-center justify-end">
                    <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white text-text-muted transition-all duration-300 group-hover:scale-105">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Technical Note */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span>RUBRIC CRITERIA: TECHNICAL RIGOR • PRACTICAL IMPACT • UX EXECUTION</span>
          </div>
          <div className="text-primary font-medium">
            DETAILED PROBLEM PACKS UNVEILED AT 02:00 IDEATION
          </div>
        </div>
      </div>
    </section>
  );
}
