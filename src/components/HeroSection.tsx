"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-11 px-6 overflow-hidden bg-black"
    >
      {/* Background Video from excited-bohr */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

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
      </div>
    </section>
  );
}
