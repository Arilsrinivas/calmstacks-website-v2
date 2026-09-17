"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonTimeline() {
  const { timeline } = HACKATHON_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/[0.08] items-end">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-3">
              {timeline.sectionTag}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02] whitespace-pre-line">
              {timeline.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              {timeline.subheading}
            </p>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-1.5 text-primary">
                <Clock className="w-3.5 h-3.5" />
                <span>24 CONSECUTIVE HOURS</span>
              </div>
              <span>•</span>
              <span className="text-white">MCE HASSAN</span>
              <span>•</span>
              <span className="text-emerald-400">25–26 SEPT 2026</span>
            </div>
          </div>
        </div>

        {/* Start Milestone Banner */}
        <div className="p-6 rounded-2xl border border-primary/40 bg-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <div>
              <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                START // {timeline.startMilestone.date} • {timeline.startMilestone.time}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {timeline.startMilestone.label}
              </div>
            </div>
          </div>
          <div className="font-mono text-xs text-text-secondary">
            MALNAD COLLEGE OF ENGINEERING
          </div>
        </div>

        {/* Desktop: Horizontal Scrollable Timeline Strip */}
        <div className="hidden lg:block space-y-6">
          {/* Animated Scroll Line */}
          <div className="relative w-full h-[2px] bg-white/10">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.max(scrollProgress * 100, 15)}%` }}
            />
          </div>

          <div className="grid grid-cols-8 gap-3">
            {timeline.phases.map((phase) => (
              <div
                key={phase.name}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors"
              >
                <div>
                  <div className="font-mono text-[10px] text-primary font-semibold mb-2">
                    PHASE {phase.number}
                  </div>
                  <h3 className="font-mono text-sm font-bold text-white tracking-tight uppercase mb-1">
                    {phase.name}
                  </h3>
                  <p className="text-[11px] text-text-secondary font-light leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
                <div className="w-6 h-[1px] bg-white/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet: Vertical Editorial Timeline */}
        <div className="lg:hidden space-y-4">
          <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
            24-HOUR SPRINT PHASES:
          </div>
          <div className="relative pl-6 border-l border-white/15 space-y-6">
            {timeline.phases.map((phase) => (
              <div key={phase.name} className="relative space-y-1">
                <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-4 border-black" />
                <div className="font-mono text-[11px] text-primary font-semibold">
                  PHASE {phase.number} // {phase.name}
                </div>
                <p className="text-xs text-text-secondary font-light">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* End Milestone Banner */}
        <div className="p-6 rounded-2xl border border-white/20 bg-white/[0.03] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white/40" />
            <div>
              <div className="font-mono text-xs text-text-muted font-bold uppercase tracking-wider">
                FINALE // {timeline.endMilestone.date} • {timeline.endMilestone.time}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {timeline.endMilestone.label}
              </div>
            </div>
          </div>
          <div className="font-mono text-xs text-text-secondary">
            JURY DEMOS & AWARDS
          </div>
        </div>
      </div>
    </section>
  );
}
