"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonTimeline() {
  const { timeline } = HACKATHON_CONFIG;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  // Track scroll progress through this section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);

      setScrollProgress(progress);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ================= PART 1: TIMELINE SCHEDULE ================= */}
        <div>
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
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-1.5 text-primary">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24 CONSECUTIVE HOURS</span>
                </div>
                <span>•</span>
                <span className="text-white">MCE CENTRAL LIBRARY</span>
                <span>•</span>
                <span className="text-emerald-400">25–26 SEPT 2026</span>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet: Multi-Column Milestone Grid */}
          <div className="pt-12">
            {/* Animated Progress Strip */}
            <div className="relative w-full h-[2px] bg-white/10 mb-8">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-300 ease-out"
                style={{ width: `${Math.max(scrollProgress * 100, 10)}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {timeline.milestones.map((item, idx) => {
                const isActive = idx === activeMilestoneIndex;
                const isPast = idx < activeMilestoneIndex;

                return (
                  <div
                    key={item.time}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? "bg-white/[0.05] border-primary shadow-lg shadow-primary/10"
                        : isPast
                        ? "bg-white/[0.02] border-white/15"
                        : "bg-white/[0.01] border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div>
                      {/* Phase Tag & Status Dot */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                          {item.phase}
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

                      {/* Time Pill */}
                      <div className="mb-3">
                        <span
                          className={`inline-block font-mono text-xs font-bold px-2.5 py-1 rounded ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          {item.time}
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        className={`font-bold text-sm tracking-tight leading-snug mb-2 transition-colors ${
                          isActive ? "text-primary" : "text-white group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Modality Box */}
                    <div className="pt-3 border-t border-white/[0.08] font-mono text-[10px] text-text-muted">
                      <span className="text-primary font-semibold">MODALITY: </span>
                      <span className="text-text-secondary">{item.modality}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= PART 2: SPRINT MODALITIES & GUIDELINES ================= */}
        <div className="pt-8 border-t border-white/[0.08]">
          {/* Modalities Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                03.2 {"//"} SPRINT MODALITIES & REGISTRATION RULES
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                EVENT MODALITIES & CODE PROTOCOLS
              </h3>
            </div>
            <p className="text-sm text-text-secondary max-w-md font-light">
              Clear rules governing team entry, Central Library development, 2-tier mentorship checks, and jury demonstrations.
            </p>
          </div>

          {/* 6-Card Modalities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.modalities.map((modality) => (
              <div
                key={modality.number}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Number & Subtitle */}
                  <div className="flex items-center justify-between font-mono text-xs mb-4">
                    <span className="text-primary font-bold">{modality.number}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-text-muted text-[11px]">
                      {modality.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {modality.title}
                  </h4>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed mb-6">
                    {modality.details}
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <div className="pt-4 border-t border-white/[0.08] space-y-2">
                  {modality.keyPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 font-mono text-[11px] text-text-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-text-secondary">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Highlight Strip */}
          <div className="mt-8 p-6 rounded-2xl border border-primary/20 bg-primary/[0.03] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-white">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>STRICT TIMELINE ENFORCEMENT // ALL 24 HOURS MONITORED AT MCE CENTRAL LIBRARY</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span className="text-emerald-400">₹300/MEMBER (FOOD INCL.)</span>
              <span>•</span>
              <span className="text-cyan-400">CERTIFICATES FOR ALL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
