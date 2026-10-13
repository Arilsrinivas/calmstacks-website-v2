"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Cpu,
  GitBranch,
  ShieldCheck,
  FileCode2,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Workflow,
  Sparkles,
} from "lucide-react";

const capabilities = [
  {
    title: "Product Planning & Spec Definition",
    desc: "Transforms requirements and user stories into unambiguous technical specifications.",
    stage: "Stage 01",
  },
  {
    title: "System Architecture & API Design",
    desc: "Establishes clean interfaces, data contracts, and scalable schema models before writing code.",
    stage: "Stage 02",
  },
  {
    title: "Parallel Implementation via Worktrees",
    desc: "Frontend, backend, and AI agents build concurrently in isolated Git worktrees without collision.",
    stage: "Stage 03",
  },
  {
    title: "Stage-Gate QA & Security Audit",
    desc: "Enforces type safety, unit coverage, and vulnerability analysis before any code advances.",
    stage: "Stage 04",
  },
  {
    title: "DevOps & Production Workflows",
    desc: "Automates CI/CD packaging, container verification, and production environment delivery.",
    stage: "Stage 05",
  },
  {
    title: "Structured Contracts & Handoffs",
    desc: "Explicit human-readable engineering handoffs ensure total auditability across all agent cycles.",
    stage: "Core Runtime",
  },
];

export default function AgentFactorySection() {
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
    <section ref={ref} id="agent-factory" className="py-24 bg-black relative">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-16" />

        {/* Section Header */}
        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-wider uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>CORE TECHNOLOGY // PROPRIETARY INFRASTRUCTURE</span>
          </div>

          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">
            CALMSTACKS AGENT FACTORY
          </h2>

          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary mb-6">
            An Engineering Workflow, <br className="hidden sm:inline" />
            Powered by AI Agents.
          </h3>

          <p className="text-lg text-text-secondary leading-relaxed max-w-[760px] mx-auto">
            Agent Factory is a multi-agent software development infrastructure designed to coordinate specialized AI agents throughout the software development lifecycle. By pairing coordinating orchestrators with strict engineering contracts, we bring greater consistency, speed, and architectural integrity to complex software projects.
          </p>
        </div>

        {/* Central Architecture Visual */}
        <div
          className={`mb-16 rounded-2xl overflow-hidden border border-border-subtle bg-surface/40 p-2 shadow-2xl reveal ${
            inView ? "visible" : ""
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <img
            src="/assets/agent_factory_orchestration.svg"
            alt="CalmStacks Agent Factory Orchestrator Architecture and SDLC Pipeline"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* Orchestrator Architecture Explainer Card */}
        <div
          className={`card p-8 sm:p-10 border border-border-subtle bg-surface-elevated/40 mb-12 reveal ${
            inView ? "visible" : ""
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-3">
              <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
                ORCHESTRATOR-WORKER PARADIGM
              </span>
              <h4 className="text-2xl font-semibold text-text-primary tracking-tight">
                Deterministic Handoffs. <br />
                Parallel Execution.
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                A central orchestrator delegates isolated tasks to specialized agents, collects deliverables, verifies adherence to architectural contracts, and advances work through defined development stages.
              </p>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Isolated Git Worktrees</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Agents operate in dedicated branch worktrees to prevent code conflicts and state pollution.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Stage-Gate Validation</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Strict automated checkpoints review code quality, security, and interface compliance.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Engineering Contracts</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Interface schemas and task bounds eliminate hallucinations between agent handoffs.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-violet-400 font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Production-Grade Code</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Outputs clean, idiomatic codebases configured with complete test suites and deployment pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`card p-6 border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between reveal ${
                inView ? "visible" : ""
              }`}
              style={{ transitionDelay: `${250 + i * 60}ms` }}
            >
              <div>
                <span className="font-mono text-[11px] text-primary/80 font-semibold tracking-wider uppercase block mb-3">
                  {cap.stage}
                </span>
                <h4 className="text-base font-semibold text-text-primary mb-2 tracking-tight">
                  {cap.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Grid */}
        <div className={`mt-16 reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: "350ms" }}>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
              Technology Stack
            </p>
            <h4 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
              Production-Grade Tooling & Infrastructure
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="card p-5 border border-border-subtle bg-surface-elevated/40">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold block mb-3">
                AI & Agents
              </span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />LLM Orchestration</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Multi-Agent Workflows</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Function Calling</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />RAG Pipelines</li>
              </ul>
            </div>

            <div className="card p-5 border border-border-subtle bg-surface-elevated/40">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-3">
                Languages
              </span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Python</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />JavaScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />SQL</li>
              </ul>
            </div>

            <div className="card p-5 border border-border-subtle bg-surface-elevated/40">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-3">
                Frontend & UI
              </span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Next.js & React</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Mobile / React Native</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Design Systems</li>
              </ul>
            </div>

            <div className="card p-5 border border-border-subtle bg-surface-elevated/40">
              <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold block mb-3">
                Backend & APIs
              </span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />FastAPI</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />Node.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />REST & GraphQL</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />Microservices</li>
              </ul>
            </div>

            <div className="card p-5 border border-border-subtle bg-surface-elevated/40">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-3">
                Databases & Infra
              </span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />PostgreSQL & Prisma</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Vector Stores</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Git Worktrees & CI/CD</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Docker & Cloud Hosting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          className={`mt-14 p-6 sm:p-8 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-6 reveal ${
            inView ? "visible" : ""
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-semibold text-text-primary">
              Ready to accelerate your engineering lifecycle?
            </h4>
            <p className="text-sm text-text-secondary">
              Discover how CalmStacks implements AI multi-agent systems for custom software products.
            </p>
          </div>
          <Link href="#contact" className="btn-primary shrink-0">
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
