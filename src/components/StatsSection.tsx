"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Clock, ShieldCheck, Zap } from "lucide-react";

interface StatItem {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

function AnimatedCounter({ 
  target, 
  decimals = 0, 
  suffix, 
  inView 
}: { 
  target: number; 
  decimals?: number; 
  suffix: string; 
  inView: boolean; 
}) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { 
        setCount(target); 
        clearInterval(timer); 
      } else { 
        setCount(start); 
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return (
    <span className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white">
      {count.toFixed(decimals)}
      <span className="text-primary ml-0.5">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        setInView(true); 
        observer.disconnect(); 
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    { 
      value: 24, 
      decimals: 0, 
      suffix: "", 
      label: "PROD MICROSERVICES",
      icon: <Zap className="w-5 h-5 text-primary" />
    },
    { 
      value: 4.2, 
      decimals: 1, 
      suffix: "ms", 
      label: "AVERAGE LATENCY",
      icon: <Clock className="w-5 h-5 text-cyan-400" />
    },
    { 
      value: 99.9, 
      decimals: 1, 
      suffix: "%", 
      label: "UPTIME GUARANTEE",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    { 
      value: 12.5, 
      decimals: 1, 
      suffix: "x", 
      label: "SYSTEM SPEEDUP",
      icon: <Activity className="w-5 h-5 text-violet-400" />
    },
  ];

  return (
    <section ref={ref} id="stats" className="py-24 bg-black relative">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-16" />
        
        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            PERFORMANCE METRICS
          </h2>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            CalmStacks In Numbers
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border border-border-subtle bg-surface/50 studio-glass flex flex-col justify-between items-start reveal ${
                inView ? "visible" : ""
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="p-3 bg-black/40 border border-white/[0.04] rounded-xl mb-6">
                {stat.icon}
              </div>
              <div>
                <AnimatedCounter 
                  target={stat.value} 
                  decimals={stat.decimals} 
                  suffix={stat.suffix} 
                  inView={inView} 
                />
                <p className="mt-3 text-[11px] font-bold text-text-secondary uppercase tracking-widest leading-none">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

