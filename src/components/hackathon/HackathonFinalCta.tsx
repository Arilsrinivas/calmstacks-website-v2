"use client";

import { Terminal } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

interface HackathonFinalCtaProps {
  onOpenRegister: () => void;
}

export default function HackathonFinalCta({ onOpenRegister }: HackathonFinalCtaProps) {
  const { finalCta } = HACKATHON_CONFIG;

  return (
    <section className="relative py-28 sm:py-36 md:py-44 bg-black border-t border-white/[0.08] overflow-hidden">
      {/* Background Subtle Geometric Grid Accents */}
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

      {/* Center Subtle Electric Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Monospace Indicator Tag */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary/25 bg-primary/[0.04]">
          <Terminal className="w-3.5 h-3.5" />
          <span>CALMSTACKS 24H INITIATIVE // CALL FOR BUILDERS</span>
        </div>

        {/* Massive Typography Stack */}
        <div className="space-y-2 select-none">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold text-white tracking-tight uppercase leading-[0.92]">
            <span className="block text-text-muted font-mono font-light text-4xl sm:text-6xl md:text-7xl lg:text-[80px]">
              {finalCta.headlinePre}
            </span>
            <span className="block text-primary">
              {finalCta.headlineHours}
            </span>
            <span className="block mt-4 text-white">
              WHAT
            </span>
            <span className="block text-white/90">
              WILL YOU
            </span>
            <span className="block text-white">
              BUILD?
            </span>
          </h2>
        </div>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto font-light leading-relaxed">
          {finalCta.supportingText}
        </p>

        {/* Large Prominent CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-primary hover:bg-primary-hover text-white font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
          >
            <span>{finalCta.buttonLabel}</span>
          </button>
        </div>

        {/* Event Metadata Banner */}
        <div className="pt-8 border-t border-white/[0.08] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-text-muted">
          <span className="text-white font-semibold">{finalCta.dates}</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span>{finalCta.location}</span>
        </div>
      </div>
    </section>
  );
}
