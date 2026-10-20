"use client";

import { useEffect, useRef, useState } from "react";
import {
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const differentiators = [
  {
    num: "01",
    title: "Multi-Agent SDLC Orchestration",
    tagline: "Autonomous parallel execution",
    desc: "We don't use AI as a simple autocomplete. We deploy specialized agent teams that analyze specifications, plan architectures, implement code across isolated worktrees, and conduct automated code reviews in parallel.",
    icon: Cpu,
    tag: "Orchestration"
  },
  {
    num: "02",
    title: "Production-First Engineering",
    tagline: "Built for resilience at scale",
    desc: "Every system is engineered for stability, maintainability, and scale. We write clean, idiomatic code, enforce type safety, implement robust error handling, and deliver comprehensive automated test coverage.",
    icon: Layers,
    tag: "Robustness"
  },
  {
    num: "03",
    title: "Contracts & Stage-Gate QA",
    tagline: "Zero-drift development milestones",
    desc: "Each stage of development is governed by clear architectural contracts and automated quality gates. Work moves forward only after tests pass, interfaces align, and implementation specs are validated.",
    icon: ShieldCheck,
    tag: "Validation"
  },
  {
    num: "04",
    title: "Isolated Git Worktrees",
    tagline: "Conflict-free multi-agent branches",
    desc: "Autonomous worker agents execute within isolated Git worktrees, allowing simultaneous feature implementation, rigorous static analysis, and zero collision across concurrent branches.",
    icon: GitBranch,
    tag: "Architecture"
  },
  {
    num: "05",
    title: "Modern Scalable Architecture",
    tagline: "Modern frameworks & cloud primitives",
    desc: "We build on modern stacks: Next.js, TypeScript, FastAPI, Python, PostgreSQL, and serverless/container architectures designed to minimize operational overhead and scale smoothly.",
    icon: Compass,
    tag: "Infrastructure"
  },
];

export default function VisionSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeDiff, setActiveDiff] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="vision" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center max-w-[720px] mx-auto mb-16 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-normal text-[#1A1814] leading-[1.15] mb-5">
            Engineering discipline. <br />
            <span className="text-[#82807A] font-normal">
              Autonomous execution.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            We bridge deep software craftsmanship with bleeding-edge agentic workflows to deliver software that endures.
          </p>
        </div>

        {/* Dual Pillar: Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Mission Card */}
          <div
            className={`pf-card-white p-8 sm:p-10 flex flex-col justify-between reveal ${
              inView ? "visible" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div>
              <div className="flex items-center justify-between mb-6 text-xs text-[#82807A] font-medium">
                <span className="uppercase tracking-wider">
                  Our Mission
                </span>
                <span>01 // Purpose</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1814] tracking-normal mb-4">
                Accelerating human potential through intelligent software.
              </h3>
              <p className="text-base text-[#54524E] leading-relaxed">
                To build intelligent software systems and agent-driven engineering platforms that solve real-world problems, eliminate operational friction, and empower businesses to scale with confidence.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-[rgba(38,57,90,0.08)] flex items-center gap-3 text-xs text-[#54524E]">
              <CheckCircle2 className="w-4 h-4 text-[#1A1814]" />
              <span>Real-world utility · Production-grade codebases</span>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className={`pf-card-white p-8 sm:p-10 flex flex-col justify-between reveal ${
              inView ? "visible" : ""
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div>
              <div className="flex items-center justify-between mb-6 text-xs text-[#82807A] font-medium">
                <span className="uppercase tracking-wider">
                  Our Vision
                </span>
                <span>02 // Future</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1814] tracking-normal mb-4">
                The standard for autonomous agent software engineering.
              </h3>
              <p className="text-base text-[#54524E] leading-relaxed">
                To lead the shift toward autonomous, multi-agent development where complex products are engineered with speed, precision, and verified engineering standards — without sacrificing architectural craftsmanship.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-[rgba(38,57,90,0.08)] flex items-center gap-3 text-xs text-[#54524E]">
              <CheckCircle2 className="w-4 h-4 text-[#1A1814]" />
              <span>Agentic SDLC · Verifiable quality gates</span>
            </div>
          </div>
        </div>

        {/* 5 Core Differentiators */}
        <div
          className={`pf-card-white p-6 sm:p-10 border border-[rgba(38,57,90,0.08)] reveal ${
            inView ? "visible" : ""
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left selector */}
            <div className="w-full md:w-5/12 space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#82807A] font-medium mb-3">
                How We Operate Differently
              </div>
              {differentiators.map((diff, index) => {
                const isActive = activeDiff === index;
                return (
                  <button
                    key={diff.num}
                    onClick={() => setActiveDiff(index)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border ${
                      isActive
                        ? "bg-[#FAF9F8] border-[rgba(38,57,90,0.15)] shadow-sm text-[#1A1814]"
                        : "border-transparent text-[#54524E] hover:bg-[#FAF9F8]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#82807A]">
                        {diff.num}
                      </span>
                      <span className="text-sm font-semibold tracking-normal">
                        {diff.title}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#1A1814] text-white"
                          : "bg-[#EFECE6] text-[#54524E]"
                      }`}
                    >
                      {diff.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Preview Panel */}
            <div className="w-full md:w-7/12 bg-[#FAF9F8] rounded-2xl p-6 sm:p-8 border border-[rgba(38,57,90,0.08)] flex flex-col justify-between min-h-[320px]">
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-medium text-[#82807A]">
                  <span className="uppercase tracking-wider">
                    Pillar {differentiators[activeDiff].num} // {differentiators[activeDiff].tag}
                  </span>
                  <span>
                    Deterministic SDLC
                  </span>
                </div>
                <h4 className="text-2xl font-semibold text-[#1A1814] tracking-normal mb-2">
                  {differentiators[activeDiff].title}
                </h4>
                <p className="text-xs text-[#54524E] font-medium mb-4">
                  {differentiators[activeDiff].tagline}
                </p>
                <p className="text-base text-[#54524E] leading-relaxed">
                  {differentiators[activeDiff].desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[rgba(38,57,90,0.08)] flex items-center justify-between">
                <div className="text-xs text-[#82807A]">
                  Zero hallucination · Strict test gates
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#1A1814]">
                  <span>Proven in production</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1A1814]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
