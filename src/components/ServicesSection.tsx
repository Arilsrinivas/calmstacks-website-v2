"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, Code2, Cpu } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI & MULTI-AGENT SYSTEMS",
    description:
      "Autonomous multi-agent workflows, orchestrator architectures, and intelligent system integrations that coordinate complex tasks across your product lifecycle.",
    href: "/#agent-factory",
  },
  {
    icon: Code2,
    title: "CUSTOM SOFTWARE ENGINEERING",
    description:
      "Full-stack web applications, cloud APIs, and domain-specific platforms built with high-performance architectures, clean engineering, and long-term maintainability.",
    href: "/#projects",
  },
  {
    icon: Cpu,
    title: "WORKFLOW AUTOMATION & AI/ML",
    description:
      "Intelligent information processing, automated business processes, and application-specific machine learning models that eliminate repetitive manual overhead.",
    href: "/#contact",
  },
];

export default function ServicesSection() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="services" className="py-24">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            CAPABILITIES & SERVICES
          </h2>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            Engineering Built for Production.
          </h3>
          <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
            From autonomous agent orchestration to full-stack web platforms, we build software designed to perform reliably under real-world demands.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`card p-8 group flex flex-col justify-between border border-border-subtle hover:border-primary/40 reveal ${
                  inView ? "visible" : ""
                }`}
                style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-semibold text-text-primary mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <a
                  href={service.href}
                  className="text-sm text-primary font-medium flex items-center gap-2 w-fit mt-auto"
                >
                  Explore Solution
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
