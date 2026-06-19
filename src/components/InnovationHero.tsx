"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleSphere = dynamic(
  () => import("./ParticleSphere"),
  { ssr: false }
);

export default function InnovationHero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-11 px-6">
      
      {/* 3D Particle Sphere Background */}
      <ParticleSphere />

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating background light streaks */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[980px] w-full text-center relative z-20 flex flex-col items-center">
        {/* Primary Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="primary-header text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-bold leading-[1.05] tracking-[-0.03em] text-white"
        >
          Build. Compete. Get Hired.
        </motion.h1>
        
        {/* Lead Text / Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lead-text mt-8 text-base sm:text-xl md:text-2xl text-text-secondary leading-relaxed max-w-[720px] mx-auto font-normal"
        >
          Join the CalmStacks Internship Hackathon 2026. Solve real-world AI/ML and Mobile App challenges. Top performers receive a 2-month remote internship opportunity.
        </motion.p>

        {/* CTA Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="cta-group mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center w-full"
        >
          <a href="#register" className="btn-primary primary-button px-8 py-4 text-sm font-semibold tracking-tight text-white transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25">
            Register Now
          </a>
          <a href="#timeline" className="btn-secondary secondary-button px-8 py-4 text-sm font-semibold tracking-tight transition-all">
            View Rules
          </a>
        </motion.div>
      </div>
    </section>
  );
}
