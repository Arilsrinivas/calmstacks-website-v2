"use client";

import { useState } from "react";
import {
  FileCode,
  FileText,
  GitBranch,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Layers,
  Database,
  Cpu,
  BarChart3
} from "lucide-react";

export default function PipelineInteractiveSection() {
  const [activeSource, setActiveSource] = useState(2); // default to API Contracts

  const sources = [
    { id: 0, label: "Client PRD", icon: FileText },
    { id: 1, label: "Figma Schemas", icon: Layers },
    { id: 2, label: "API Contracts", icon: FileCode },
    { id: 3, label: "Database Models", icon: Database },
    { id: 4, label: "BCI Ethics Guidelines", icon: ShieldAlert },
    { id: 5, label: "Git Repository", icon: GitBranch },
  ];

  // Vertical percentages for the 6 source pill centers
  const sourceYPositions = [12, 27, 43, 58, 73, 88];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)] relative z-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1A1814] leading-[1.15] tracking-normal mb-4">
            Ask. Orchestrate. Deliver. <br />
            <span className="text-[#82807A] font-normal">
              How requirements turn into production code.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            Signals flow into the CalmStacks Orchestrator, dispatching across worktrees and delivering verified, evidence-backed software.
          </p>
        </div>

        {/* 
          Main Showcase Box with Circuit SVG Connectors & Flowing Impulses 
        */}
        <div className="rounded-[32px] bg-gradient-to-br from-[#1C1A16] via-[#161512] to-[#12110E] border border-white/10 p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.45)] relative overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CA7B57]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#208374]/10 rounded-full blur-3xl pointer-events-none" />

          {/* 
            Desktop Connecting Cables Layer (SVG with Animated Dash & Pulsing Dots)
          */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Flowing Dash Pattern */}
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#208374" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#3FD1BC" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#CA7B57" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#CA7B57" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#CA7B57" stopOpacity="1" />
                </linearGradient>

                {/* Filter for glowing particle effect */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 
                CONNECTOR 1: Left Pills (at ~24%) to Central Box (at ~36%)
              */}
              {sources.map((src, i) => {
                const yStart = sourceYPositions[i];
                const yEnd = 48; // Target middle-left of central orchestrator box
                const isSelected = activeSource === src.id;
                
                // S-curve path from pill to center box
                const pathData = `M 240,${(yStart * 5.8) + 30} C 280,${(yStart * 5.8) + 30} 310,${(yEnd * 5.8) + 30} 350,${(yEnd * 5.8) + 30}`;

                return (
                  <g key={src.id}>
                    {/* Background track line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelected ? "rgba(202, 123, 87, 0.4)" : "rgba(32, 131, 116, 0.18)"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                    />

                    {/* Animated flowing impulse */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelected ? "#CA7B57" : "#3FD1BC"}
                      strokeWidth={isSelected ? "3" : "2"}
                      strokeDasharray="8, 24"
                      className="animate-flow"
                      filter={isSelected ? "url(#glow)" : undefined}
                    />

                    {/* Glowing impulse head (traveling particle) */}
                    <circle r={isSelected ? "4" : "3"} fill={isSelected ? "#FFA27A" : "#3FD1BC"}>
                      <animateMotion
                        path={pathData}
                        dur={`${2.2 + (i * 0.3)}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* 
                CONNECTOR 2: Central Box (at ~66%) to Right Box (at ~72%)
              */}
              <g>
                <path
                  d="M 750,305 C 785,305 805,305 830,305"
                  fill="none"
                  stroke="rgba(202, 123, 87, 0.4)"
                  strokeWidth="2.5"
                />
                <path
                  d="M 750,305 C 785,305 805,305 830,305"
                  fill="none"
                  stroke="#CA7B57"
                  strokeWidth="3"
                  strokeDasharray="10, 20"
                  className="animate-flow"
                  filter="url(#glow)"
                />
                <circle r="4.5" fill="#FFA27A">
                  <animateMotion
                    path="M 750,305 C 785,305 805,305 830,305"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </div>

          {/* 
            3-Column Layout Container 
          */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* COLUMN 1: Inputs & Sources (Pills) */}
            <div className="lg:col-span-3 flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#CBC7C0]">
                  1. Ingested Sources (6)
                </span>
                <span className="text-[10px] font-mono text-[#3FD1BC] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FD1BC] animate-ping" />
                  Streaming
                </span>
              </div>
              
              {sources.map((src) => {
                const Icon = src.icon;
                const isSelected = activeSource === src.id;
                return (
                  <button
                    key={src.id}
                    onClick={() => setActiveSource(src.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-left transition-all duration-300 border backdrop-blur-sm ${
                      isSelected
                        ? "bg-[#25231E] border-[#CA7B57] shadow-[0_0_15px_rgba(202,123,87,0.35)] text-white scale-[1.02]"
                        : "bg-[#1F1D19]/90 border-white/10 hover:border-white/20 text-[#CBC7C0]"
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
                    </div>
                  </button>
                );
              })}
            </div>

            {/* COLUMN 2: Central Orchestration Box */}
            <div className="lg:col-span-5 bg-[#201E1A] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 relative z-10">
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
                  orchestrator_v2.4
                </span>
              </div>

              {/* Requirement Query */}
              <div className="self-end max-w-[90%] bg-[#2B2924] border border-white/10 rounded-2xl rounded-tr-sm p-3.5 text-xs text-[#FAF9F8] leading-relaxed shadow-sm">
                &quot;Build LegalConnect case management workspace. Enforce Bar Council advertising regulations and execute with zero state drift.&quot;
              </div>

              {/* Orchestrator Status Breakdown */}
              <div className="bg-[#191815] border border-white/10 rounded-xl p-3.5 space-y-2 text-xs font-mono">
                <div className="text-[11px] text-[#CBC7C0] flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#3FD1BC] animate-pulse" />
                    Worked for 3.4s
                  </span>
                  <span className="text-[#8E8B85]">Contract Mode</span>
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

                  <div className="pt-1 text-[#FAF9F8] text-xs font-sans leading-relaxed bg-[#25231E]/60 p-2 rounded-lg border border-white/5">
                    BCI Rule §36 enforced: Commercial promotion &amp; advocate ratings suppressed.
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

              {/* Bottom Query Input */}
              <div className="bg-[#191815] border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-xs text-[#8E8B85]">
                <span>Ask about your codebase or describe requirements…</span>
                <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#208374] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* COLUMN 3: Deliverable & Evidence Output Card */}
            <div className="lg:col-span-4 bg-[#201E1A] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between h-full relative z-10">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-white">
                    3. Output &amp; Traceability
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#208374]/20 text-[#3FD1BC]">
                    Verified
                  </span>
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

                {/* Evidence Citation Callout */}
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
