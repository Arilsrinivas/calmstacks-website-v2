"use client";

import dynamic from "next/dynamic";

const ParticleSphere = dynamic(
  () => import("./ParticleSphere"),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-11 px-6 overflow-hidden"
    >
      {/* 3D Particle Sphere Background */}
      <ParticleSphere />

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating background light streaks */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[980px] w-full text-center relative z-20">
        {/* Headline — massive, tight */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold leading-[1.05] tracking-[-0.03em] text-text-primary animate-slide-up"
          style={{ animationDelay: "0.08s" }}
        >
          TURNING IDEAS INTO REALITY
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 text-xl sm:text-2xl text-text-secondary font-normal leading-relaxed max-w-[680px] mx-auto animate-slide-up"
          style={{ animationDelay: "0.16s" }}
        >
          Crafted to Deliver Performance without Complexity
        </p>

        {/* CTA Button */}
        <div 
          className="mt-10 animate-slide-up"
          style={{ animationDelay: "0.24s" }}
        >
          <a href="/innovation-challenge" className="btn-primary">
            Hackathon details
          </a>
        </div>
      </div>
    </section>
  );
}
