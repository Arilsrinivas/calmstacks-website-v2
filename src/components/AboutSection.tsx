"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
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
              ABOUT CALMSTACKS
            </h2>
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary mb-6">
              A different approach, using a new method of production.
            </h3>
            <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
              <p>
                CalmStacks is a technology company building intelligent software products and AI-driven engineering systems. We combine software engineering, artificial intelligence, automation, and structured development workflows to solve practical problems and accelerate product development.
              </p>
              <p>
                Our work spans multi-agent AI systems, full-stack applications, intelligent automation, and domain-specific digital platforms. We focus on building solutions that are technically sound, useful to their intended users, and designed to evolve as requirements grow.
              </p>
            </div>
            <Link
              href="#agent-factory"
              className="text-sm text-primary font-medium flex items-center gap-2 w-fit group"
            >
              <span>Explore Agent Factory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Architecture Illustration */}
          <div
            className={`aspect-square w-full rounded-2xl overflow-hidden border border-border-subtle bg-surface/50 p-2 shadow-2xl reveal ${
              inView ? "visible" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <img
              src="/assets/about_engineering_architecture.svg"
              alt="CalmStacks AI Software Engineering Architecture"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
