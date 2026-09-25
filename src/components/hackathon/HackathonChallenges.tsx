"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Sparkles,
  Copy,
  Check,
  ShieldAlert,
  Terminal,
  Cpu,
  Layers,
  FileSearch,
} from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonChallenges() {
  const { challenge } = HACKATHON_CONFIG;
  const [isRevealed, setIsRevealed] = useState(false);
  const [problemData, setProblemData] = useState(challenge.problemStatement);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check state on mount & poll every 6 seconds for instant real-time sync
  useEffect(() => {
    // Check if query string forces reveal (e.g. ?revealed=true)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("revealed") === "true" || window.location.hash === "#revealed") {
        setIsRevealed(true);
      }
    }

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/hackathon/challenge", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isRevealed === "boolean") {
            setIsRevealed(data.isRevealed);
          }
          if (data.problemStatement) {
            setProblemData(data.problemStatement);
          }
        }
      } catch (err) {
        console.warn("Could not check challenge status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    if (!problemData) return;
    const fullText = `CALMSTACKS 24H HACKATHON // OFFICIAL PROBLEM STATEMENT\n\nTRACK: ${problemData.track}\nTITLE: ${problemData.title}\n\nBACKGROUND:\n${problemData.background}\n\nPROBLEM STATEMENT:\n${problemData.statement}\n\nDELIVERABLES:\n${problemData.deliverables.map((d) => `• ${d}`).join("\n")}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="challenge" className="relative py-16 sm:py-24 bg-black border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-xs text-primary uppercase tracking-widest">
            {challenge.sectionTag}
          </div>

          <div className="flex items-center gap-2">
            {isRevealed ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OFFICIAL CHALLENGE UNLOCKED</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>CHALLENGE REVEAL AT KICKOFF</span>
              </span>
            )}
          </div>
        </div>

        {/* Section Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.02]">
              {challenge.heading}
            </h2>
            <p className="font-mono text-lg sm:text-xl font-bold tracking-wider text-primary uppercase">
              {challenge.subheading}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              {isRevealed
                ? "The official problem statement is now live. Build, solve and execute your working solution before the 24-hour sprint deadline."
                : challenge.lockedDescription}
            </p>
          </div>
        </div>

        {/* CONDITIONALLY RENDER: UNLOCKED PROBLEM STATEMENT vs LOCKED ANTICIPATION */}
        {isRevealed ? (
          /* UNLOCKED OFFICIAL PROBLEM STATEMENT SHOWCASE */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Master Unlocked Card */}
            <div className="p-8 sm:p-12 rounded-3xl border-2 border-primary/40 bg-gradient-to-b from-primary/[0.06] via-white/[0.02] to-transparent relative overflow-hidden shadow-2xl shadow-primary/10 space-y-8">
              {/* Header Badges & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-md bg-primary text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{problemData.track}</span>
                  </span>
                  {problemData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/15 text-white/90 font-mono text-[11px] tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:border-primary text-white font-mono text-xs flex items-center gap-2 transition-all bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
                  title="Copy full problem statement text"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-primary" />
                      <span>COPY STATEMENT</span>
                    </>
                  )}
                </button>
              </div>

              {/* Problem Title */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-primary font-semibold uppercase tracking-widest">
                  OFFICIAL HACKATHON CHALLENGE // TRACK 01
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                  {problemData.title}
                </h3>
              </div>

              {/* Background Context Callout */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/60 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
                  <ShieldAlert className="w-4 h-4 text-primary" />
                  <span>THE CONTEXT & INDUSTRY CHALLENGE</span>
                </div>
                <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                  {problemData.background}
                </p>
              </div>

              {/* Core Problem Statement Callout */}
              <div className="p-6 sm:p-8 rounded-2xl bg-primary/[0.08] border border-primary/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>PROBLEM STATEMENT</span>
                </div>
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                  {problemData.statement}
                </p>
              </div>

              {/* 4 Core Focus Areas Grid */}
              <div className="space-y-4 pt-4">
                <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  KEY ENGINEERING OBJECTIVES
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemData.keyObjectives.map((obj) => (
                    <div
                      key={obj.number}
                      className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-4 hover:border-primary/40 transition-colors"
                    >
                      <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 rounded bg-primary/10 border border-primary/20 shrink-0">
                        {obj.number}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                          {obj.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          {obj.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Box */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] space-y-3">
                <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <FileSearch className="w-4 h-4" />
                  <span>WHAT TEAMS MUST DELIVER BY 26 SEPTEMBER 11:30 AM IST</span>
                </div>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  {problemData.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* LOCKED ANTICIPATION STATE (BEFORE TAP OF REVEAL) */
          <div className="pt-4">
            <div className="p-8 sm:p-14 rounded-2xl border border-white/15 bg-white/[0.02] text-center space-y-6 relative overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 text-primary mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <div className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                  CHALLENGE PROTOCOL // 25 SEPTEMBER 2026
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
                  PROBLEM STATEMENT UNLOCKS AT KICKOFF
                </h3>
                <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                  The official challenge statement is locked and will be unlocked on-stage at the event kickoff. Once tapped live by the organizers, this section will automatically reveal the full technical specification.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-text-muted">
                <span className="px-3 py-1.5 rounded border border-white/10 bg-black/40">
                  START TIME: 11:30 AM IST
                </span>
                <span className="px-3 py-1.5 rounded border border-white/10 bg-black/40">
                  DURATION: 24 CONSECUTIVE HOURS
                </span>
                <span className="px-3 py-1.5 rounded border border-white/10 bg-black/40">
                  VENUE: MCE HASSAN
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stack Policy Information Card */}
        <div className="pt-6">
          <div className="p-8 sm:p-10 rounded-2xl border border-white/15 bg-white/[0.02] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-primary/40 transition-colors">
            <div className="lg:col-span-7 space-y-3">
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
                {challenge.stackTitle}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {challenge.stackSubheading}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                {challenge.stackDescription}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-2.5 font-mono text-xs text-white">
              {["FULL-STACK", "AI / ML", "MOBILE APPS", "WEB DEV", "CLOUD / APIs", "DEV TOOLS", "RUST / PYTHON"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-md border border-white/15 bg-white/[0.03] hover:border-primary/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Discreet Admin Portal Link */}
        <div className="pt-2 text-right">
          <Link
            href="/hackathon/admin"
            className="font-mono text-[10px] text-white/30 hover:text-primary transition-colors tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <span>ORGANIZER ACCESS // ADMIN PANEL →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
