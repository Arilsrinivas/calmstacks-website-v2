"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const timelinePhases = [
  {
    phase: "01",
    title: "Registration Opens",
    date: "June 20, 2026",
    desc: "Sign up individually and choose your preferred hackathon track."
  },
  {
    phase: "02",
    title: "Registration Closes",
    date: "June 28, 2026",
    desc: "Late registrations will not be accepted. Ensure details are correct."
  },
  {
    phase: "03",
    title: "Problem Statement Released",
    date: "June 29, 2026 (09:00 AM)",
    desc: "The AI/ML and Mobile App challenge repos are released to everyone."
  },
  {
    phase: "04",
    title: "Development Phase",
    date: "June 29 – June 30, 2026",
    desc: "36 hours of intense coding. Build, test, and push your solutions."
  },
  {
    phase: "05",
    title: "Submission Deadline",
    date: "June 30, 2026 (09:00 PM)",
    desc: "Submit your repository code and video walkthrough."
  },
  {
    phase: "06",
    title: "Winner Announcement",
    date: "July 1, 2026",
    desc: "Top performers are announced and remote internships are offered."
  }
];

export default function InnovationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="timeline" ref={containerRef} className="timeline-section py-24 relative bg-transparent">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="section-divider mb-20" />

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            SCHEDULE
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
            Timeline & Phases
          </h2>
        </div>

        {/* Vertical Timeline Stepper */}
        <div className="relative">
          {/* Razor-thin Connecting Line */}
          <div className="absolute left-[18px] top-6 bottom-6 w-[1px] bg-border-subtle" />

          <div className="space-y-12">
            {timelinePhases.map((phase, i) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 items-start relative group"
              >
                {/* Stepper Node */}
                <div className="w-9 h-9 rounded-full bg-background border border-border-subtle flex items-center justify-center text-xs font-semibold text-text-muted group-hover:border-primary/50 group-hover:text-primary transition-all duration-300 shrink-0 z-10">
                  {phase.phase}
                </div>

                {/* Step Info */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                    {phase.date}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
