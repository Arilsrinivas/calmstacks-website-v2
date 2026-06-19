"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-11 px-6 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src="/assets/Robot_Gazing_At_Sunset_Sky.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
      </div>

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
