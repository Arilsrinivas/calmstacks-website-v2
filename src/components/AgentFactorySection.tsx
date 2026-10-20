"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Code2,
  Database,
  ShieldCheck,
  Zap,
  Terminal,
  Workflow
} from "lucide-react";

export default function AgentFactorySection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

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

  const pipelineStages = [
    {
      step: "01",
      role: "Architect Agent",
      title: "Deconstruct & Contract Spec",
      desc: "Takes human specifications, breaks them down into atomic task requirements, defines API contracts, schema models, and sets milestone invariants.",
      badge: "Stage Gate 1"
    },
    {
      step: "02",
      role: "Worker Agents",
      title: "Parallel Git Worktrees",
      desc: "Spins up dedicated worker agents operating inside isolated git worktree branches (frontend, backend, schemas) to prevent state conflict and drift.",
      badge: "Stage Gate 2"
    },
    {
      step: "03",
      role: "QA & Verification Agent",
      title: "Automated Checkpoints",
      desc: "Executes unit suites, linting, type safety checks, regression runs, and security audits against the defined contracts before passing.",
      badge: "Stage Gate 3"
    },
    {
      step: "04",
      role: "Synthesis Agent",
      title: "Clean Merge & Artifact Delivery",
      desc: "Merges tested branches cleanly, generates documentation, and produces verified, deployable production builds with zero technical debt.",
      badge: "Stage Gate 4"
    }
  ];

  return (
    <section
      ref={ref}
      id="agent-factory"
      className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Pill Label */}
        <div className={`text-center max-w-[760px] mx-auto mb-16 reveal ${inView ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F2] text-xs font-mono text-[#208374] border border-[#208374]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#208374] animate-pulse" />
            <span>CORE TECHNOLOGY // PROPRIETARY ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1A1814] leading-[1.12] mb-5">
            CalmStacks Agent Factory. <br />
            <span className="text-[#82807A] font-normal">
              Autonomous multi-agent development.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            Our specialized multi-agent framework orchestrates dedicated worker agents across isolated Git worktrees, enforcing strict architectural contracts and automated QA gates.
          </p>
        </div>

        {/* Big Dark Interactive Showcase Box (Matching Primefold's dark feature blocks) */}
        <div
          className={`pf-card-dark p-6 sm:p-10 mb-16 relative overflow-hidden reveal ${
            inView ? "visible" : ""
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-dot-pattern-dark opacity-20 pointer-events-none" />

          {/* Top Header of the Factory Box */}
          <div className="relative z-10 flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#208374]/20 border border-[#208374]/30 flex items-center justify-center text-[#3FD1BC]">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Orchestrator-Worker Architecture
                </h3>
                <p className="text-xs font-mono text-[#CBC7C0]">
                  stage_gate_enforcement: strict · git_worktrees: isolated
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15">
                4-Stage Pipeline
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#208374]/20 text-[#3FD1BC] border border-[#208374]/30">
                100% Deterministic
              </span>
            </div>
          </div>

          {/* Pipeline Interactive Stages Grid */}
          <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {pipelineStages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#2D2B26] border-[#3FD1BC] shadow-lg"
                      : "bg-[#24221D] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#CBC7C0]">
                        {stage.step}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-[#208374] text-white"
                            : "bg-white/10 text-[#8E8B85]"
                        }`}
                      >
                        {stage.badge}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#3FD1BC] block mb-1">
                      {stage.role}
                    </span>
                    <h4 className="text-sm font-semibold text-white mb-2 tracking-tight">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-[#CBC7C0] leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Diagram Illustration: High-resolution architecture visual */}
          <div className="relative z-10 bg-[#161512] rounded-2xl p-5 sm:p-6 border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs font-mono text-[#CBC7C0]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#3FD1BC]" />
                <span>active_worktree_execution_graph.svg</span>
              </div>
              <span className="text-[#3FD1BC]">Deterministic Handoffs Active</span>
            </div>
            <div className="w-full flex justify-center py-2">
              <img
                src="/assets/agent_factory_orchestration.svg"
                alt="Agent Factory Orchestration"
                className="max-h-[300px] w-auto object-contain opacity-95"
              />
            </div>
          </div>

          {/* Key Metric Features */}
          <div className="relative z-10 grid sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl font-semibold text-white mb-1">Zero Drift</div>
              <p className="text-xs text-[#CBC7C0] leading-relaxed">
                Task bounds and strict interface contracts prevent hallucinations between agent handoffs.
              </p>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[#3FD1BC] mb-1">Isolated Worktrees</div>
              <p className="text-xs text-[#CBC7C0] leading-relaxed">
                Parallel agents write code on dedicated git worktree branches, eliminating branch collisions.
              </p>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white mb-1">100% Verified</div>
              <p className="text-xs text-[#CBC7C0] leading-relaxed">
                Automated tests and static analysis checkpoints validate code before any merge is permitted.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Grid (Primefold-Style Categorized Cards) */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE6] text-xs font-mono text-[#54524E] mb-3">
              <span>STACK &amp; INFRASTRUCTURE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1814] tracking-tight">
              Production-Grade Tooling
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="pf-card-white p-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#208374] font-semibold block mb-3">
                AI &amp; Agents
              </span>
              <ul className="space-y-2 text-xs text-[#54524E]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />LLM Orchestration</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />Multi-Agent Workflows</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />Function Calling</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />RAG Pipelines</li>
              </ul>
            </div>

            <div className="pf-card-white p-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#CA7B57] font-semibold block mb-3">
                Languages
              </span>
              <ul className="space-y-2 text-xs text-[#54524E]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#CA7B57]" />TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#CA7B57]" />Python</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#CA7B57]" />SQL / PostgreSQL</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#CA7B57]" />Bash &amp; CLI</li>
              </ul>
            </div>

            <div className="pf-card-white p-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#2E68FF] font-semibold block mb-3">
                Frontend &amp; UI
              </span>
              <ul className="space-y-2 text-xs text-[#54524E]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2E68FF]" />Next.js &amp; React</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2E68FF]" />Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2E68FF]" />React Native / Mobile</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2E68FF]" />Design Systems</li>
              </ul>
            </div>

            <div className="pf-card-white p-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#1A1814] font-semibold block mb-3">
                Backend &amp; APIs
              </span>
              <ul className="space-y-2 text-xs text-[#54524E]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A1814]" />FastAPI &amp; Uvicorn</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A1814]" />Node.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A1814]" />REST &amp; GraphQL</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A1814]" />Microservices</li>
              </ul>
            </div>

            <div className="pf-card-white p-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#208374] font-semibold block mb-3">
                Data &amp; Infra
              </span>
              <ul className="space-y-2 text-xs text-[#54524E]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />PostgreSQL &amp; Prisma</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />Vector DBs</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />Git Worktrees &amp; CI/CD</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />Docker Containers</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
