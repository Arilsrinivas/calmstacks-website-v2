"use client";

import { motion } from "framer-motion";

export default function InnovationHero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-11 px-6">
      
      {/* Background Video (from CalmStacks v3) */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.4] mix-blend-overlay pointer-events-none z-10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10" />

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
          <a href="https://forms.gle/n6n1hrkAESCL5dM89" target="_blank" rel="noopener noreferrer" className="btn-primary primary-button px-8 py-4 text-sm font-semibold tracking-tight text-white transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25">
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
