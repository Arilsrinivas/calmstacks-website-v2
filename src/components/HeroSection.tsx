"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-11 px-6 overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      />

      {/* Cyber Grid & Architectural SVG Vector Layer */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-25">
        <svg
          className="w-full h-full max-w-[1200px] max-h-[800px]"
          viewBox="0 0 1000 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="heroCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2997ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2997ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="350" r="280" fill="url(#heroCenterGlow)" />
          {/* Concentric telemetry rings */}
          <circle cx="500" cy="350" r="320" stroke="#2997ff" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="500" cy="350" r="220" stroke="#2997ff" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="500" cy="350" r="140" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="6 6" />

          {/* Connected agent workflow lines */}
          <path d="M180 350 H820" stroke="#2997ff" strokeOpacity="0.15" strokeWidth="1.5" className="animate-dash-flow" />
          <path d="M500 120 V580" stroke="#2997ff" strokeOpacity="0.15" strokeWidth="1.5" className="animate-dash-flow" />
          <path d="M260 200 L740 500" stroke="#2997ff" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M260 500 L740 200" stroke="#2997ff" strokeOpacity="0.12" strokeWidth="1" />

          {/* Agent nodes */}
          <circle cx="500" cy="350" r="6" fill="#2997ff" className="animate-pulse" />
          <circle cx="260" cy="200" r="4" fill="#86868b" />
          <circle cx="740" cy="200" r="4" fill="#86868b" />
          <circle cx="260" cy="500" r="4" fill="#86868b" />
          <circle cx="740" cy="500" r="4" fill="#86868b" />
          <circle cx="180" cy="350" r="4" fill="#2997ff" />
          <circle cx="820" cy="350" r="4" fill="#2997ff" />
        </svg>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black z-10" />

      <div className="max-w-[980px] w-full text-center relative z-20">
        {/* Subtle pill tag */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-wider uppercase mb-6 animate-slide-up"
          style={{ animationDelay: "0.04s" }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-POWERED SOFTWARE ENGINEERING SYSTEMS</span>
        </div>

        {/* Headline — massive, tight */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold leading-[1.05] tracking-[-0.03em] text-text-primary animate-slide-up"
          style={{ animationDelay: "0.08s" }}
        >
          Build Smarter. <br className="hidden sm:inline" />
          Engineer Beyond.
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 text-xl sm:text-2xl text-text-secondary font-normal leading-relaxed max-w-[720px] mx-auto animate-slide-up"
          style={{ animationDelay: "0.16s" }}
        >
          From AI-powered applications to autonomous multi-agent development systems, CalmStacks turns complex ideas into intelligent, production-ready software.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.24s" }}
        >
          <Link href="#projects" className="btn-primary">
            <span>Explore Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="#contact" className="btn-secondary">
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
