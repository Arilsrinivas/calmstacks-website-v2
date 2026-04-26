"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 20, suffix: "", label: "CORE TEAMS" },
  { value: 2, suffix: "", label: "" },
  { value: 10000, suffix: "", label: "EMPLOYEES" },
  { value: 10, suffix: "", label: "" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span className="stat-number">{count}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats" className="py-20">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-16" />
        
        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            Calmstacks In Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              {stat.label && (
                <p className="mt-2 text-sm text-text-secondary uppercase tracking-widest">{stat.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
