"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Radio,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Cpu,
  ArrowLeft,
  KeyRound,
  Layers,
  Copy,
  Terminal,
} from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonAdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Check saved session passcode
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem("cs_admin_passcode");
    if (savedPasscode) {
      setPasscode(savedPasscode);
      setIsAuthenticated(true);
    }
  }, []);

  // Poll current live status from API
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/hackathon/challenge", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setIsRevealed(!!data.isRevealed);
        setLastSyncTime(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("Failed to check status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle password submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passcode.trim();
    if (
      trimmed === "calm2026" ||
      trimmed === "calmstacks@admin" ||
      trimmed === "calmstacks2026" ||
      trimmed === "mce2026"
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("cs_admin_passcode", trimmed);
      setStatusMessage({
        type: "success",
        text: "Authenticated successfully as Hackathon Administrator.",
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({
        type: "error",
        text: "Invalid passcode. Check with the CalmStacks core team.",
      });
    }
  };

  // Trigger state change (Reveal or Lock)
  const handleToggleReveal = async (targetState: boolean) => {
    setIsUpdating(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/hackathon/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode: passcode.trim(),
          isRevealed: targetState,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update challenge status");
      }

      setIsRevealed(targetState);
      setLastSyncTime(new Date().toLocaleTimeString());
      setStatusMessage({
        type: "success",
        text: targetState
          ? "🎉 PROBLEM STATEMENT IS NOW REVEALED LIVE FOR ALL PARTICIPANTS!"
          : "🔒 Problem statement has been locked and hidden.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to communicate with challenge broadcast endpoint.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const copyDirectRevealLink = () => {
    const directUrl = `${window.location.origin}/hackathon?revealed=true#challenge`;
    navigator.clipboard.writeText(directUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const problem = HACKATHON_CONFIG.challenge.problemStatement;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white font-sans antialiased">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/hackathon"
              className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              <span>RETURN TO EVENT</span>
            </Link>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-text-muted">
              <Radio className={`w-3.5 h-3.5 ${isRevealed ? "text-emerald-400" : "text-amber-400"}`} />
              <span>SYSTEM: {isRevealed ? "LIVE BROADCAST" : "STANDBY / LOCKED"}</span>
            </div>
            <Link
              href="/hackathon#challenge"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-colors"
            >
              <span>VIEW HACKATHON PAGE</span>
              <ExternalLink className="w-3 h-3 text-primary" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Title & Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-mono tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>CALMSTACKS 24H HACKATHON 2026 • MASTER TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">
            PROBLEM STATEMENT RELEASE DESK
          </h1>
          <p className="text-sm text-text-secondary font-mono max-w-2xl">
            Live control center to reveal the official problem statement to all participants, judges, and screens across the venue in real time.
          </p>
        </div>

        {/* Status Notification Toast */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl border font-mono text-sm flex items-start gap-3 transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                : statusMessage.type === "error"
                ? "bg-red-950/40 border-red-500/40 text-red-200"
                : "bg-blue-950/40 border-blue-500/40 text-blue-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-semibold">{statusMessage.text}</div>
          </div>
        )}

        {/* Authentication Form if not logged in */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto p-8 rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold font-mono text-white uppercase">
                Organizer Verification
              </h2>
              <p className="text-xs text-text-muted font-mono">
                Enter your organizer access passcode to unlock challenge release actions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="e.g. calm2026 or calmstacks@admin"
                  className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/60 font-mono text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Authenticate Console
              </button>
            </form>
          </div>
        ) : (
          /* Controls & Live Dashboards */
          <div className="space-y-8">
            {/* Live State Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-[#0a0a0c] shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase">
                    <span>LIVE STATUS SENSOR</span>
                    <span className="text-white/20">•</span>
                    <span>LAST CHECKED: {lastSyncTime || "CONNECTING..."}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                        isRevealed
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>STATUS: LIVE & REVEALED TO PARTICIPANTS</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>STATUS: LOCKED / HIDDEN</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary font-mono pt-1">
                    {isRevealed
                      ? "The problem statement is currently visible to all teams on /hackathon#challenge."
                      : "Participants see the countdown anticipation teaser and locked telemetry badge."}
                  </p>
                </div>

                {/* Big Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  {!isRevealed ? (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleToggleReveal(true)}
                      className="px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-mono text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      {isUpdating ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                      <span>REVEAL PROBLEM STATEMENT NOW</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleToggleReveal(false)}
                      className="px-6 py-4 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/50 text-red-200 font-mono text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      {isUpdating ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                      <span>LOCK / HIDE PROBLEM STATEMENT</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={fetchStatus}
                    disabled={isLoading}
                    className="p-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title="Refresh Status"
                  >
                    <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin text-primary" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Direct Fallback Link helper */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="text-text-muted flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>DIRECT OVERRIDE URL (BYPASSES ANY CACHE):</span>
                </div>
                <button
                  type="button"
                  onClick={copyDirectRevealLink}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-primary" />
                  <span>{copiedLink ? "COPIED TO CLIPBOARD!" : "COPY DIRECT REVEAL URL"}</span>
                </button>
              </div>
            </div>

            {/* Problem Statement Preview Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>CONFIGURED PROBLEM STATEMENT PAYLOAD</span>
                </div>
                <span className="text-[11px] font-mono text-primary uppercase">
                  AUTOMATICALLY DELIVERED ON REVEAL
                </span>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#08080a] space-y-6">
                <div className="space-y-2 pb-4 border-b border-white/10">
                  <div className="inline-block font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                    TRACK: {problem.track}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {problem.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Context & Challenge Background
                  </h4>
                  <p className="text-sm text-text-secondary font-mono leading-relaxed">
                    {problem.background}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                  <h4 className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                    Official Problem Statement
                  </h4>
                  <p className="text-sm text-white font-mono leading-relaxed">
                    {problem.statement}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Key Objectives
                    </h4>
                    <ul className="space-y-2 text-xs font-mono text-text-secondary">
                      {problem.keyObjectives.map((obj) => (
                        <li key={obj.number} className="flex items-start gap-2">
                          <span className="text-primary font-bold">{obj.number}.</span>
                          <span>
                            <strong className="text-white font-medium">{obj.title}:</strong> {obj.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Expected Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs font-mono text-text-secondary">
                      {problem.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access Info */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#0c0c0e] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-text-muted">
              <div>
                <span>ORGANIZER NOTE: </span>
                <span className="text-text-secondary">
                  Tapping "REVEAL PROBLEM STATEMENT NOW" instantly synchronizes the state across all participant browsers without needing a deployment or server restart.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("cs_admin_passcode");
                  setIsAuthenticated(false);
                  setPasscode("");
                }}
                className="text-red-400 hover:text-red-300 transition-colors shrink-0 underline"
              >
                Log Out Admin
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
