"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Compass, Terminal, Activity } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

interface HackathonHeroProps {
  onOpenRegister: () => void;
}

export default function HackathonHero({ onOpenRegister }: HackathonHeroProps) {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Mouse Parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targetDate = new Date(HACKATHON_CONFIG.meta.startDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move handler for restrained technical parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden select-none"
    >
      {/* Background Technical Grid System */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/60 to-black" />
      </div>

      {/* Background Subtle Accent Glow */}
      <div
        className="absolute top-1/3 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Top Meta Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08]">
        {/* Left: Event series label */}
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
            {HACKATHON_CONFIG.hero.smallLabel}
            <span className="text-white mx-1.5">{"//"}</span>
            <span className="text-white">{HACKATHON_CONFIG.meta.series}</span>
          </p>
        </div>

        {/* Right: Technical Coordinates and Format */}
        <div className="flex items-center gap-6 font-mono text-[11px] text-text-muted">
          <div className="hidden sm:flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-primary" />
            <span>{HACKATHON_CONFIG.meta.coordinates}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-white">
              {HACKATHON_CONFIG.meta.format}
            </span>
            <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary">
              24 HOURS
            </span>
          </div>
        </div>
      </div>

      {/* Center Viewport Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 7 Columns: Massive Editorial Headline & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Huge Typography */}
          <div className="space-y-0 tracking-tighter">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[116px] font-bold text-white leading-[0.9] uppercase">
              <span className="block font-mono text-primary font-light tracking-normal text-5xl sm:text-6xl md:text-7xl lg:text-[88px] mb-1">
                {HACKATHON_CONFIG.hero.headlineLine1}
              </span>
              <span className="block">{HACKATHON_CONFIG.hero.headlineLine2}</span>
              <span className="block text-white/95">{HACKATHON_CONFIG.hero.headlineLine3}</span>
            </h1>
          </div>

          {/* Supporting Headline */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-[2px] bg-primary" />
            <p className="font-mono text-sm sm:text-base font-semibold tracking-widest text-primary uppercase">
              {HACKATHON_CONFIG.hero.supportingHeadline}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-secondary max-w-xl font-normal leading-relaxed">
            {HACKATHON_CONFIG.hero.description}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onOpenRegister}
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2.5 transition-all transform active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
            >
              <span>{HACKATHON_CONFIG.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#about"
              className="px-7 py-4 rounded-full border border-white/20 hover:border-white/40 text-text-primary hover:text-white font-mono text-xs font-medium tracking-wider transition-all bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-2"
            >
              <span>{HACKATHON_CONFIG.hero.secondaryCta}</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
            </a>
          </div>
        </div>

        {/* Right 5 Columns: Original Technical SVG Schematic & HUD Display */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div
            className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden"
            style={{
              transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/60" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary/60" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/60" />

            {/* Technical HUD Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-[11px] text-text-secondary">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>TELEMETRY // COUNTDOWN</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <Activity className="w-3 h-3" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Live Countdown Grid */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2.5">
                SPRINT COMMENCES IN
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08]">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {timeLeft.days}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted mt-1">
                    DAYS
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08]">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {timeLeft.hours}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted mt-1">
                    HOURS
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08]">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {timeLeft.minutes}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted mt-1">
                    MINS
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-primary/20 bg-primary/[0.03]">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                    {timeLeft.seconds}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-primary/80 mt-1">
                    SECS
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Original Technical Reticle */}
            <div className="relative h-44 w-full flex items-center justify-center border border-white/[0.06] rounded-xl bg-black/30 overflow-hidden">
              {/* Rotating Concentric Rings */}
              <svg
                viewBox="0 0 200 200"
                className="w-40 h-40 absolute transition-transform"
                style={{
                  transform: `rotate(${mousePos.x * 45}deg)`,
                  transition: "transform 0.4s ease-out",
                }}
              >
                {/* Outer dashed ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                {/* Mid ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="65"
                  fill="none"
                  stroke="rgba(41, 151, 255, 0.3)"
                  strokeWidth="1"
                />
                {/* Inner ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                {/* Crosshairs */}
                <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Radar sweep line */}
                <line
                  x1="100"
                  y1="100"
                  x2="160"
                  y2="40"
                  stroke="#2997ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                {/* Core dot */}
                <circle cx="100" cy="100" r="3" fill="#2997ff" />
              </svg>

              {/* Monospace Reticle Data Labels */}
              <div className="absolute top-2 left-3 font-mono text-[9px] text-text-muted">
                SYS.ARCH // 64-BIT
              </div>
              <div className="absolute top-2 right-3 font-mono text-[9px] text-primary">
                EPOCH // 24H
              </div>
              <div className="absolute bottom-2 left-3 font-mono text-[9px] text-text-muted">
                BUILD // OFFLINE
              </div>
              <div className="absolute bottom-2 right-3 font-mono text-[9px] text-text-secondary">
                MCE // HASSAN
              </div>
            </div>

            {/* Event Key Details List */}
            <div className="pt-2 border-t border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-text-secondary">
                <span className="text-text-muted">VENUE</span>
                <span className="text-white font-medium text-right">
                  {HACKATHON_CONFIG.meta.venueShort}
                </span>
              </div>
              <div className="flex justify-between items-center text-text-secondary">
                <span className="text-text-muted">DATES</span>
                <span className="text-primary font-semibold">{HACKATHON_CONFIG.meta.dates}</span>
              </div>
              <div className="flex justify-between items-center text-text-secondary">
                <span className="text-text-muted">PRIZES</span>
                <span className="text-white font-medium">₹25K + 6 Internships</span>
              </div>
              <div className="flex justify-between items-center text-text-secondary">
                <span className="text-text-muted">ENTRY & FOOD</span>
                <span className="text-emerald-400 font-medium">₹300/head (Food Incl.)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker / Event Metadata Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.08]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HACKATHON_CONFIG.hero.metadataItems.map((item) => (
            <div key={item.label} className="border-l border-white/15 pl-4 space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {item.label}
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-white tracking-tight">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
