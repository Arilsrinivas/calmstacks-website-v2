"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Shield, Briefcase, Zap, GraduationCap, FileCheck } from "lucide-react";

const benefits = [
  {
    title: "Build a Real Product",
    desc: "Develop software solutions that solve actual enterprise problems, using production-grade architectures.",
    icon: Target
  },
  {
    title: "Gain Startup Experience",
    desc: "Experience the speed, ownership, and engineering practices of a high-performance technology startup.",
    icon: Shield
  },
  {
    title: "Work on Practical Challenges",
    desc: "Tackle real AI/ML and mobile app specifications designed by senior systems architects.",
    icon: Zap
  },
  {
    title: "Strengthen Your Portfolio",
    desc: "Stand out from the crowd with solid, verifiable git commits representing complex solutions.",
    icon: GraduationCap
  },
  {
    title: "Internship Opportunity",
    desc: "Secure a paid 2-month remote internship offer at CalmStacks, working on production codebases.",
    icon: Briefcase
  },
  {
    title: "Participation Certificate",
    desc: "Receive an official verification certificate detailing your contribution and technical score.",
    icon: FileCheck
  }
];

export default function InnovationWhy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="why" ref={containerRef} className="py-24 relative bg-transparent">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-20" />

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            ADVANTAGES
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
            Why Participate
          </h2>
        </div>

        {/* 6-Grid Card Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card glass-card p-8 group flex flex-col justify-between border border-border-subtle bg-surface/10 backdrop-blur-md rounded-2xl hover:border-primary/20 transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
