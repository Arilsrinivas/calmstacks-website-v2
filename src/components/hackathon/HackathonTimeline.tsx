"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { HACKATHON_CONFIG, TimelineMilestone } from "@/config/hackathonConfig";

export default function HackathonTimeline() {
  const { timeline } = HACKATHON_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  // Track scroll progress through this section to animate the timeline progress line
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from when section enters bottom to when it leaves top
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);

      setScrollProgress(progress);

      // Determine active milestone based on progress
      const index = Math.min(
        Math.floor(progress * timeline.milestones.length),
        timeline.milestones.length - 1
      );
      setActiveMilestoneIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [timeline.milestones.length]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-white/[0.08] items-end">
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
            <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>TOTAL RUNTIME: 24 CONSECUTIVE HOURS</span>
            </div>
          </div>
        </div>

        {/* Desktop View: Horizontal Timeline Grid */}
        <div className="hidden lg:block pt-16">
          {/* Animated Horizontal Progress Bar */}
          <div className="relative w-full h-[2px] bg-white/10 mb-12">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-300 ease-out"
              style={{ width: `${Math.max(scrollProgress * 100, 10)}%` }}
            />
          </div>

          {/* Milestones Horizontal Row */}
          <div className="grid grid-cols-7 gap-4">
            {timeline.milestones.map((item, idx) => {
              const isActive = idx === activeMilestoneIndex;
              const isPast = idx < activeMilestoneIndex;

              return (
                <div
                  key={item.time}
                  onClick={() => setActiveMilestoneIndex(idx)}
                  className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white/[0.04] border-primary"
                      : "bg-white/[0.01] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {/* Status Indicator Dot */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-primary text-white font-bold"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {item.time}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive
                          ? "bg-primary ring-4 ring-primary/20 animate-pulse"
                          : isPast
                          ? "bg-white/40"
                          : "bg-white/10"
                      }`}
                    />
                  </div>

                  {/* Category Pill */}
                  <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted mb-2">
                    {item.category}
                  </div>

                  {/* Title */}
                  <h4
                    className={`font-bold text-sm leading-snug mb-2 transition-colors ${
                      isActive ? "text-primary" : "text-white group-hover:text-white"
                    }`}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed font-light line-clamp-4">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet View: Clean Vertical Timeline */}
        <div className="lg:hidden pt-12 relative">
          {/* Vertical Guide Line */}
          <div className="absolute left-6 top-16 bottom-8 w-[2px] bg-white/10">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-cyan-400 transition-all duration-300"
              style={{ height: `${Math.max(scrollProgress * 100, 15)}%` }}
            />
          </div>

          <div className="space-y-8 pl-14">
            {timeline.milestones.map((item, idx) => {
              const isActive = idx === activeMilestoneIndex;

              return (
                <div
                  key={item.time}
                  className={`relative p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-white/[0.04] border-primary"
                      : "bg-white/[0.01] border-white/[0.08]"
                  }`}
                >
                  {/* Circle on the vertical line */}
                  <div
                    className={`absolute -left-[45px] top-6 w-5 h-5 rounded-full border-2 bg-black flex items-center justify-center transition-colors ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-white/20 text-white/40"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-primary animate-ping" : "bg-white/20"
                      }`}
                    />
                  </div>

                  {/* Time & Category */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                      {item.time}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-text-muted tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <span>TIMEZONE // INDIAN STANDARD TIME (IST, GMT+5:30)</span>
          <span className="text-text-secondary">SCHEDULE RIGOROUSLY ENFORCED BY ORGANIZING COMMITTEE</span>
        </div>
      </div>
    </section>
  );
}
