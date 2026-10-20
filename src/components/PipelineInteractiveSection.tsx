"use client";

import { useState, useEffect } from "react";
import {
  FileCode,
  FileText,
  GitBranch,
  Terminal,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  Cpu,
  BarChart3
} from "lucide-react";

export default function PipelineInteractiveSection() {
  const [activeSource, setActiveSource] = useState(2); // default to API Specs / Contracts

  const sources = [
    { id: 0, label: "Client PRD", icon: FileText, color: "#3FD1BC" },
    { id: 1, label: "Figma Schemas", icon: Layers, color: "#3FD1BC" },
    { id: 2, label: "API Contracts", icon: FileCode, color: "#CA7B57", active: true },
    { id: 3, label: "Database Models", icon: Database, color: "#3FD1BC" },
    { id: 4, label: "BCI Ethics Guidelines", icon: ShieldAlert, color: "#3FD1BC" },
    { id: 5, label: "Git Repository", icon: GitBranch, color: "#3FD1BC" },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)] relative z-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header (Matching Primefold: "Ask. Understand. Act. / How a question becomes a next move.") */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE6] text-xs font-mono text-[#54524E] mb-4">
            <span>FROM SPECIFICATION TO VERIFIED SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1A1814] leading-[1.15] tracking-normal mb-4">
            How a requirement becomes <br />
            <span className="text-[#82807A] font-normal">
              a production deliverable.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            Multi-source ingestion, contract-driven agent planning, and verifiable stage-gate execution in one cohesive pipeline.
          </p>
        </div>

        {/* 
          Interactive 3-Column Diagram Container (Primefold Dark Slate Banner with Ambient Glow)
        */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#1C1A16] via-[#161512] to-[#12110E] border border-white/10 p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.45)] relative overflow-hidden">
          {/* Ambient Warm Corner Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CA7B57]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#208374]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* COLUMN 1: Sources / Inputs (Pills with connecting SVG traces) */}
            <div className="lg:col-span-3 flex flex-col gap-3 relative">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#CBC7C0] mb-2 px-1">
                Ingested Sources (6)
              </div>
              
              {sources.map((src) => {
                const Icon = src.icon;
                const isSelected = activeSource === src.id;
                return (
                  <button
                    key={src.id}
                    onClick={() => setActiveSource(src.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-left transition-all duration-300 border ${
                      isSelected
                        ? "bg-[#25231E] border-[#CA7B57] shadow-[0_0_15px_rgba(202,123,87,0.3)] text-white"
                        : "bg-[#1F1D19] border-white/10 hover:border-white/20 text-[#CBC7C0]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isSelected ? "bg-[#CA7B57]/20 text-[#CA7B57]" : "bg-white/5 text-[#8E8B85]"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium">{src.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? "text-[#CA7B57]" : "text-[#3FD1BC]"}`} />
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#CA7B57] animate-ping" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* COLUMN 2: Central Orchestration Agent Chat Box */}
            <div className="lg:col-span-5 bg-[#201E1A] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 relative">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#FAF9F8] flex items-center justify-center p-0.5">
                    <img src="/assets/favicon.svg" alt="CalmStacks" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-semibold text-white tracking-normal">
                    CalmStacks Orchestrator
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#208374]/20 text-[#3FD1BC] border border-[#208374]/30">
                  orchestrator_v2
                </span>
              </div>

              {/* User Prompt / Task Query */}
              <div className="self-end max-w-[85%] bg-[#2B2924] border border-white/10 rounded-2xl rounded-tr-sm p-3.5 text-xs text-[#FAF9F8] leading-relaxed">
                &quot;How do we deliver the LegalConnect case management workspace without violating Bar Council regulations or state drift?&quot;
              </div>

              {/* Execution Status Accordion */}
              <div className="bg-[#191815] border border-white/10 rounded-xl p-3.5 space-y-2 text-xs font-mono">
                <div className="text-[11px] text-[#CBC7C0] flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#3FD1BC] animate-pulse" />
                    Worked for 3.4s
                  </span>
                  <span className="text-[#8E8B85]">Zero-Drift Mode</span>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px] text-[#CBC7C0]">
                  <div className="flex items-center justify-between hover:text-white transition-colors cursor-pointer">
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#3FD1BC]" />
                      Reading 6 source contracts &amp; specifications
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8E8B85]" />
                  </div>

                  <div className="flex items-center justify-between hover:text-white transition-colors cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#3FD1BC]" />
                      Spawned 3 isolated Git worktrees
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8E8B85]" />
                  </div>

                  <div className="pt-1 text-[#FAF9F8] text-xs font-sans leading-relaxed">
                    BCI Section 36 enforced: Commercial promotion &amp; advocate ratings suppressed. Contracts validated.
                  </div>

                  <div className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pt-1">
                    <span className="flex items-center gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#CA7B57]" />
                      Checked BCI ethics rulebook §36 &amp; §44
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8E8B85]" />
                  </div>

                  <div className="flex items-center justify-between hover:text-white transition-colors cursor-pointer">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-[#3FD1BC]" />
                      Passing 14/14 automated gate suites
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8E8B85]" />
                  </div>
                </div>
              </div>

              {/* Input Prompt Box at Bottom */}
              <div className="bg-[#191815] border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-xs text-[#8E8B85]">
                <span>Ask about your codebase or describe requirements…</span>
                <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#208374] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* COLUMN 3: Deliverable & Evidence Output Card */}
            <div className="lg:col-span-4 bg-[#201E1A] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-semibold text-white mb-4">
                  Deterministic Delivery &amp; Traceability
                </div>

                {/* Progress Metric Chart Box */}
                <div className="bg-[#191815] border border-white/10 rounded-xl p-4 mb-4">
                  <div className="text-[11px] font-mono text-[#CBC7C0] mb-3">
                    Stage-Gate Readiness Score
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1 text-white">
                        <span>Architecture Contracts</span>
                        <span className="text-[#3FD1BC] font-mono">100%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-full h-full bg-[#3FD1BC] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-white">
                        <span>BCI Ethics Compliance</span>
                        <span className="text-[#3FD1BC] font-mono">100%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-full h-full bg-[#3FD1BC] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-white">
                        <span>Worktree Synthesis</span>
                        <span className="text-[#CA7B57] font-mono">Ready</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[85%] h-full bg-[#CA7B57] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Source Citation Badges (Evidence Tracing) */}
                <div className="p-3 rounded-xl bg-[#2B2924] border border-[#CA7B57]/30 text-xs text-[#FAF9F8] mb-4">
                  <div className="font-mono text-[10px] text-[#CA7B57] uppercase mb-1">
                    BCI_Standards_Rule36.pdf · p.12
                  </div>
                  <p className="text-[11px] text-[#CBC7C0] leading-relaxed">
                    &quot;Advocates shall not solicit work or advertise directly or indirectly through star ratings or paid placements.&quot;
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[#CBC7C0] mb-4">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">PRD Spec §2.1</span>
                  <span className="px-2 py-0.5 rounded bg-[#CA7B57]/15 border border-[#CA7B57]/30 text-[#CA7B57]">BCI Rule §36</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">worktree/feat-bci</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors">
                <span>View Generated Pull Request</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#3FD1BC]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
