"use client";

import { Terminal } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

interface HackathonFinalCtaProps {
  onOpenRegister: () => void;
}

export default function HackathonFinalCta({ onOpenRegister }: HackathonFinalCtaProps) {
  const { finalCta } = HACKATHON_CONFIG;

  return (
    <section className="relative py-24 sm:py-32 bg-black border-t border-white/10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        {/* Monospace Indicator Tag */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest px-4 py-2 rounded-full border border-primary/30 bg-primary/[0.05]">
          <Terminal className="w-3.5 h-3.5" />
          <span>CALMSTACKS 24H SPRINT // FINAL CALL FOR BUILDERS</span>
        </div>

        {/* Massive Typography Headline */}
        <div className="space-y-2 select-none">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-extrabold text-white tracking-tight uppercase leading-[0.92]">
            <span className="block text-text-muted font-mono font-light text-4xl sm:text-6xl md:text-7xl lg:text-[80px]">
              {finalCta.line1}
            </span>
            <span className="block text-primary mb-4">
              {finalCta.line2}
            </span>
            <span className="block text-white">
              {finalCta.question1}
            </span>
            <span className="block text-white">
              {finalCta.question2}
            </span>
          </h2>
        </div>

        {/* Event Key Info Grid */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-white/15 bg-white/[0.02] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-center">
          <div>
            <div className="text-text-muted text-[10px] uppercase">DATES</div>
            <div className="text-white font-bold mt-1">{finalCta.dates}</div>
          </div>
          <div>
            <div className="text-text-muted text-[10px] uppercase">START TIME</div>
            <div className="text-cyan-400 font-bold mt-1">{finalCta.startTime}</div>
          </div>
          <div>
            <div className="text-text-muted text-[10px] uppercase">PRIZE POOL</div>
            <div className="text-primary font-bold mt-1">{finalCta.prizePool}</div>
          </div>
          <div>
            <div className="text-text-muted text-[10px] uppercase">VENUE</div>
            <div className="text-white font-bold mt-1">MCE HASSAN</div>
          </div>
        </div>

        {/* Collaboration Notice */}
        <div className="font-mono text-xs text-text-secondary tracking-widest uppercase">
          {finalCta.collaborationText}
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-primary hover:bg-primary-hover text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-primary/25 cursor-pointer"
          >
            <span>{finalCta.buttonLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
