"use client";

import { useEffect, useRef } from "react";
import { 
  GitBranch, 
  FileCheck2, 
  ShieldCheck, 
  Cpu, 
  Layers 
} from "lucide-react";

const differentiators = [
  {
    icon: GitBranch,
    title: "Multi-Agent Workflows",
    desc: "Autonomous specialized agents coordinated through structured phases from requirements to production.",
  },
  {
    icon: FileCheck2,
    title: "Engineering Contracts",
    desc: "Human-readable technical specifications and explicit handoffs connecting each development stage.",
  },
  {
    icon: ShieldCheck,
    title: "Stage-Gate Validation",
    desc: "Rigorous automated checks for architecture compliance, test coverage, and security before merging.",
  },
  {
    icon: Cpu,
    title: "Practical AI Integration",
    desc: "Domain-tailored machine intelligence integrated directly into production software applications.",
  },
  {
    icon: Layers,
    title: "Reliable & Scalable",
    desc: "Built on battle-tested engineering fundamentals, isolated worktrees, and long-term maintainability.",
  },
];

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-black">
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[980px] mx-auto text-center relative z-20">
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 reveal">
          VISION & ENGINEERING PHILOSOPHY
        </h2>
        <h3
          className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight mb-8 reveal"
          style={{ transitionDelay: "100ms" }}
        >
          Engineering Intelligent Systems. <br className="hidden sm:inline" />
          Building What Comes Next.
        </h3>
        <p
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[820px] mx-auto mb-16 reveal"
          style={{ transitionDelay: "200ms" }}
        >
          Our mission is to engineer useful, reliable software systems that combine human creativity with intelligent automation. We make sophisticated software development more accessible, systematic, and scalable through AI-powered engineering.
        </p>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="card p-6 border border-border-subtle hover:border-primary/30 transition-all flex flex-col justify-between reveal"
                style={{ transitionDelay: `${250 + idx * 80}ms` }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
