"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className="py-24">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-16" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className={`reveal ${inView ? "visible" : ""}`}>
            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
              WHY US
            </h2>
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary mb-6">
              A different approach, using a new method of production.
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              We build dynamic websites that adapt, perform, and grow with your business. Fast, secure, and scalable — crafted to deliver real results.
            </p>
            <a href="/about" className="text-sm text-primary font-medium flex items-center gap-2 w-fit">
              Read More
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

          {/* Right Image */}
          <div className={`aspect-square w-full rounded-2xl overflow-hidden reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
            <img 
              src="/assets/ChatGPT%20Image%20Apr%2026,%202026,%2009_42_17%20AM.png" 
              alt="About Calmstacks" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
