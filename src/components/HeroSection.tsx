"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  GitBranch,
  Terminal,
  ShieldCheck,
  Cpu
} from "lucide-react";

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"architecture" | "agents" | "telemetry">("architecture");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* 
        Background Video Loop fitted specifically to the upper hero landing area 
        (fades smoothly into the warm page background before the interactive terminal)
      */}
      <div className="absolute top-0 left-0 right-0 h-[680px] sm:h-[740px] md:h-[800px] overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/assets/Robot_Gazing_At_Sunset_Sky.mp4" type="video/mp4" />
        </video>
        {/* 70% transparent white element overlay with smooth bottom gradient fade */}
        <div className="absolute inset-0 bg-[#FAF9F8]/70" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#FAF9F8]" />
      </div>

      <div className="max-w-[1140px] mx-auto px-6 relative z-10">
        {/* Hero Main Headline with clean open letter-spacing and balanced line-height */}
        <div className="text-center max-w-[880px] mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-[68px] font-semibold text-[#1A1814] leading-[1.15] tracking-normal">
            Engineering intelligent systems.{" "}
            <span className="text-[#6E6C66] block sm:inline font-normal">
              Building what comes next.
            </span>
          </h1>
        </div>

        {/* Hero Subtitle */}
        <p className="text-center text-lg sm:text-xl text-[#35332E] max-w-[620px] mx-auto leading-relaxed mb-10 font-normal">
          CalmStacks builds AI-powered applications and multi-agent software engineering systems that transform complex ideas into reliable digital products.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <Link href="#contact" className="pf-btn-primary">
            <span>Explore Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="#agent-factory" className="pf-btn-secondary">
            <span>See how it works</span>
            <Sparkles className="w-3.5 h-3.5 text-[#1A1814]" />
          </Link>
        </div>

        {/* PRIME-STYLE INTERACTIVE AGENT MOCKUP INTERFACE */}
        <div id="platform" className="relative mx-auto max-w-[980px]">
          {/* Main Card Container */}
          <div className="pf-card-dark p-5 sm:p-7 md:p-8 relative overflow-hidden backdrop-blur-md">
            {/* Ambient Background Grid Pattern inside card */}
            <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" />

            {/* Top Toolbar / Tabs */}
            <div className="relative z-10 flex flex-wrap items-center justify-between pb-5 mb-6 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
                <div className="h-4 w-px bg-white/10 mx-2" />
                <span className="text-xs font-sans text-[#CBC7C0] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#1A1814]" />
                  calmstacks-agent-factory // orchestrator-v2.4
                </span>
              </div>

              {/* View Switches */}
              <div className="flex items-center gap-1 bg-white/[0.06] p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeTab === "architecture"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-[#CBC7C0] hover:text-white"
                  }`}
                >
                  SDLC Spec
                </button>
                <button
                  onClick={() => setActiveTab("agents")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeTab === "agents"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-[#CBC7C0] hover:text-white"
                  }`}
                >
                  Worktrees (3)
                </button>
                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeTab === "telemetry"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-[#CBC7C0] hover:text-white"
                  }`}
                >
                  Gate QA
                </button>
              </div>
            </div>

            {/* Interactive Query / Prompt Bar */}
            <div className="relative z-10 mb-6">
              <div className="bg-[#24221D] border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-inner">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-[#1A1814] mt-0.5">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-sans text-[#CBC7C0] uppercase tracking-wider mb-1">
                      SPECIFICATION PROMPT · ORCHESTRATION DISPATCH
                    </div>
                    <div className="text-white text-base sm:text-lg font-medium">
                      &quot;Implement LegalConnect BCI-compliant advocate directory, case workspace, and stage-gate contract tests.&quot;
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[#1A1814] text-[11px] font-sans border border-white/10 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3FD1BC] animate-ping" />
                    DISPATCHED
                  </span>
                </div>

                {/* Progress Pipeline Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.07] text-xs text-[#CBC7C0] font-sans">
                  <span className="flex items-center gap-1 text-[#1A1814]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Spec Parsed
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="flex items-center gap-1 text-[#1A1814]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3 Isolated Worktrees
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="flex items-center gap-1 text-[#1A1814]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Gate Checkpoints Pass (100%)
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#8E8B85] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Synthesis &amp; Merge
                  </span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="relative z-10 grid sm:grid-cols-3 gap-4">
              {/* Card 1: Orchestrator Status */}
              <div className="bg-[#24221D] p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#1A1814] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      ORCHESTRATOR
                    </span>
                    <GitBranch className="w-3.5 h-3.5 text-[#CBC7C0]" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    Isolated Worktrees
                  </h4>
                  <p className="text-xs text-[#CBC7C0] leading-relaxed">
                    Worker agents operate in clean git worktrees preventing code collision or state drift.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#8E8B85]">
                  <span>worktree/feat-bci</span>
                  <span className="text-[#1A1814]">Active</span>
                </div>
              </div>

              {/* Card 2: Stage-Gate QA Check */}
              <div className="bg-[#24221D] p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#1A1814] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      QA GATES
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#CBC7C0]" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    Engineering Contracts
                  </h4>
                  <p className="text-xs text-[#CBC7C0] leading-relaxed">
                    Automated checkpoints verify unit suites, schema validation, and regulatory compliance.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#8E8B85]">
                  <span>BCI Compliance</span>
                  <span className="text-[#27C93F]">100% Passed</span>
                </div>
              </div>

              {/* Card 3: Production Code Output */}
              <div className="bg-[#24221D] p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#1A1814] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      DELIVERY
                    </span>
                    <Cpu className="w-3.5 h-3.5 text-[#CBC7C0]" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    Production Systems
                  </h4>
                  <p className="text-xs text-[#CBC7C0] leading-relaxed">
                    Outputs idiomatic, hardened TypeScript and Python backends with deterministic deployment.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#8E8B85]">
                  <span>Zero Tech Debt</span>
                  <span className="text-white font-medium">Ready</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8E8B85]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#208374]" />
                <span>Next-generation SDLC: Contract-driven milestone synthesis</span>
              </div>
              <div className="font-sans text-[11px] text-[#CBC7C0]">
                calmstacks.co.in/systems
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
