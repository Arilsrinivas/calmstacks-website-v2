"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CreditCard, User, Globe, Clock, Brain, Smartphone, Award } from "lucide-react";

const highlights = [
  { label: "Registration Fee", val: "₹100 Only", icon: CreditCard },
  { label: "Participation", val: "Individual", icon: User },
  { label: "Location", val: "100% Online", icon: Globe },
  { label: "Duration", val: "36-Hour Run", icon: Clock },
  { label: "Track 1", val: "AI/ML Solutions", icon: Brain },
  { label: "Track 2", val: "Mobile App Dev", icon: Smartphone },
  { label: "Grand Prize", val: "Internship Offers", icon: Award },
];

const stats = [
  { value: 5, suffix: "", label: "Winners Hired" },
  { value: 2, suffix: " Months", label: "Remote Internship" },
  { value: 100, suffix: "%", label: "Real Startup Projects" },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function InnovationAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section id="highlights" ref={containerRef} className="py-24 relative bg-transparent">
      {/* Background Neon Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-20" />

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            OVERVIEW
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
            Event Highlights
          </h2>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {highlights.map((hl, i) => {
            const Icon = hl.icon;
            return (
              <motion.div
                key={hl.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`card glass-card p-6 flex flex-col justify-between border border-border-subtle bg-surface/25 backdrop-blur-md rounded-2xl ${
                  i === highlights.length - 1 ? "col-span-2 md:col-span-1 border-primary/20 bg-primary/[0.02]" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">
                    {hl.label}
                  </p>
                  <p className="text-sm font-semibold text-text-primary">
                    {hl.val}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center py-8 rounded-3xl border border-border-subtle bg-surface/10 backdrop-blur-lg">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.08 }}
              className="flex flex-col items-center"
            >
              <Counter target={stat.value} suffix={stat.suffix} inView={isInView} />
              <p className="mt-2 text-xs font-semibold text-text-secondary uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
