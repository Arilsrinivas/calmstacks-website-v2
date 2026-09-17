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
      className="relative py-16 sm:py-24 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <div className="font-mono text-xs text-primary uppercase tracking-widest">
              {timeline.sectionTag}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02] whitespace-pre-line">
              {timeline.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              {timeline.subheading}
            </p>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-1.5 text-primary font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>24 CONSECUTIVE HOURS</span>
              </div>
              <span>•</span>
              <span className="text-white">MALNAD COLLEGE OF ENGINEERING</span>
              <span>•</span>
              <span className="text-primary">25–26 SEPT 2026</span>
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
          <div className="font-mono text-xs text-text-secondary uppercase">
            MALNAD COLLEGE OF ENGINEERING, HASSAN
          </div>
        </div>

        {/* Sequential Steps Grid */}
        <div className="space-y-6">
          <div className="relative w-full h-[2px] bg-white/10">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.max(scrollProgress * 100, 15)}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {timeline.steps.map((step) => (
              <div
                key={step.number}
                className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-primary font-bold">
                    STEP {step.number}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight uppercase">
                    {step.label}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        {/* End Milestone Banner */}
        <div className="p-6 rounded-2xl border border-white/15 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white/40" />
            <div>
              <div className="font-mono text-xs text-text-muted font-bold uppercase tracking-wider">
                END // {timeline.endMilestone.date} • {timeline.endMilestone.time}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {timeline.endMilestone.label}
              </div>
            </div>
          </div>
          <div className="font-mono text-xs text-primary font-bold uppercase">
            24 HOURS COMPLETED
          </div>
        </div>
      </div>
    </section>
  );
}
