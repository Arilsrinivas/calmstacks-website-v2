"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
    <section ref={ref} id="about" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center max-w-[720px] mx-auto mb-16 reveal ${inView ? "visible" : ""}`}>
          
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-normal text-[#1A1814] leading-[1.15] mb-5">
            Engineering what comes next. <br />
            <span className="text-[#82807A] font-normal">
              Autonomous systems. Reliable outcomes.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            CalmStacks operates at the intersection of AI research and production software engineering, building autonomous agent development systems and commercial digital products.
          </p>
        </div>

        {/* Primefold-Style Overview Bento Box */}
        <div
          className={`pf-card-white p-6 sm:p-10 border border-[rgba(38,57,90,0.08)] mb-12 reveal ${
            inView ? "visible" : ""
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#208374]/10 text-[#208374] text-[11px] font-mono font-medium">
                ENGINEERING FOUNDATIONS
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1814] tracking-normal">
                From raw ideas to deterministic, production-ready software.
              </h3>
              <p className="text-sm sm:text-base text-[#54524E] leading-relaxed">
                Founded with a conviction that software development is undergoing a fundamental transformation, CalmStacks creates autonomous multi-agent pipelines where specialized agents plan, write, test, and verify codebases with mathematical precision.
              </p>
              <p className="text-sm sm:text-base text-[#54524E] leading-relaxed">
                Rather than treating AI as a casual autocomplete, our proprietary Agent Factory enforces contract-driven handoffs, isolated Git worktree execution, and stage-gate quality verification to eliminate technical debt before it starts.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[rgba(38,57,90,0.08)] text-xs text-[#54524E] font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#208374]" />
                  <span>Zero-Drift Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#208374]" />
                  <span>Isolated Worktrees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#208374]" />
                  <span>Stage-Gate Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#208374]" />
                  <span>Production-First</span>
                </div>
              </div>
            </div>

            {/* Right SDLC Architecture Diagram */}
            <div className="lg:col-span-6 bg-[#FAF9F8] rounded-2xl p-4 sm:p-6 border border-[rgba(38,57,90,0.08)] flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-[rgba(38,57,90,0.08)] text-xs font-mono text-[#82807A]">
                <span>ARCHITECTURE DIAGRAM</span>
                <span className="text-[#208374]">1:1 SDLC CONTRACT</span>
              </div>
              <img
                src="/assets/about_engineering_architecture.svg"
                alt="CalmStacks Engineering Architecture"
                className="w-full h-auto max-h-[360px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Trust & Execution Pillars (Primefold Trust Style) */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="pf-card-white p-6 sm:p-7 border border-[rgba(38,57,90,0.08)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#208374] block mb-2 font-medium">
              01 // CRAFTSMANSHIP
            </span>
            <h4 className="text-lg font-semibold text-[#1A1814] mb-2 tracking-normal">
              Disciplined Architecture
            </h4>
            <p className="text-xs sm:text-sm text-[#54524E] leading-relaxed">
              We design modular, maintainable systems that scale seamlessly without hidden operational debt or fragile dependencies.
            </p>
          </div>

          <div className="pf-card-white p-6 sm:p-7 border border-[rgba(38,57,90,0.08)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#CA7B57] block mb-2 font-medium">
              02 // AUTONOMY
            </span>
            <h4 className="text-lg font-semibold text-[#1A1814] mb-2 tracking-normal">
              Multi-Agent Orchestration
            </h4>
            <p className="text-xs sm:text-sm text-[#54524E] leading-relaxed">
              Parallel worker agents execute in isolated worktrees, multiplying engineering velocity while ensuring verifiable output.
            </p>
          </div>

          <div className="pf-card-white p-6 sm:p-7 border border-[rgba(38,57,90,0.08)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#2E68FF] block mb-2 font-medium">
              03 // RELIABILITY
            </span>
            <h4 className="text-lg font-semibold text-[#1A1814] mb-2 tracking-normal">
              Stage-Gate Quality QA
            </h4>
            <p className="text-xs sm:text-sm text-[#54524E] leading-relaxed">
              Every deliverable must pass rigorous automated quality gates, linting checks, type assertions, and functional tests.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
