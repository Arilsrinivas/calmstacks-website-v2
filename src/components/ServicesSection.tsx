"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, MessageSquareCode, Cog, ArrowRight } from "lucide-react";

const services = [
  {
    title: "DYNAMIC WEBSITES",
    description: "We build fast, scalable digital experiences that evolve with your business. Every interaction is designed to perform, adapt, and convert.",
    href: "/technology"
  },
  {
    title: "CUSTOM SOFTWARE",
    description: "Tailor-made software solutions designed to streamline your operations and accelerate growth.",
    href: "/technology"
  },
  {
    title: "MINI AND MAJOR PROJECTS",
    description: "From small internal tools to large-scale enterprise platforms, we handle projects of all sizes.",
    href: "/technology"
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="services" className="py-24">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            SERVICES
          </h2>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            We Deliver Exceptional Products and Services Around the World
          </h3>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`card p-8 group flex flex-col justify-between reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  {service.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              <a href={service.href} className="text-sm text-primary font-medium flex items-center gap-2 w-fit">
                Read More
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
