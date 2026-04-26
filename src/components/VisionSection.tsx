"use client";

import { useEffect, useRef } from "react";

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-[980px] mx-auto text-center">
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 reveal">
          VISION
        </h2>
        <h3 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight mb-8 reveal" style={{ transitionDelay: "100ms" }}>
          We’re Redifining the Way the World Builds Technology
        </h3>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[800px] mx-auto reveal" style={{ transitionDelay: "200ms" }}>
          We believe technology should feel intuitive, not overwhelming. Our approach focuses on simplifying complexity and creating systems that are powerful yet effortless to use. By combining intelligent design with scalable infrastructure, we enable ideas to move faster—from concept to reality.
        </p>
      </div>
    </section>
  );
}
