"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Code2,
  Workflow,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Terminal,
  ShieldCheck,
  Zap,
  Layers
} from "lucide-react";

const services = [
  {
    num: "01",
    tag: "LIVE CAPABILITY",
    title: "AI & Multi-Agent Systems",
    short: "Autonomous agent pipelines, LLM integration, and stage-gate development.",
    desc: "We design and deploy custom multi-agent architectures that automate complex workflows, analyze unstructured data, and execute tasks with deterministic reliability.",
    features: [
      "Multi-agent orchestrator-worker architectures",
      "Git worktree isolation for conflict-free code synthesis",
      "Rigorous automated testing and validation gates",
      "Tool-augmented agents & function-calling pipelines"
    ],
    accent: "text-[#208374]",
    accentBg: "bg-[#208374]/10",
    border: "border-[#208374]/20"
  },
  {
    num: "02",
    tag: "FULL-STACK PRODUCTION",
    title: "Custom Software Engineering",
    short: "End-to-end full-stack applications built for scale and long-term maintainability.",
    desc: "From concept to deployment, we build web and mobile applications using modern, proven stacks: Next.js, TypeScript, Python, FastAPI, and robust database architectures.",
    features: [
      "Modern full-stack web applications with Next.js & React",
      "High-performance REST & GraphQL APIs",
      "Database design, migrations, and PostgreSQL optimization",
      "Cross-platform mobile applications with React Native"
    ],
    accent: "text-[#2E68FF]",
    accentBg: "bg-[#2E68FF]/10",
    border: "border-[#2E68FF]/20"
  },
  {
    num: "03",
    tag: "ENTERPRISE WORKFLOWS",
    title: "Workflow Automation & AI/ML",
    short: "Intelligent data extraction, process automation, and domain-specific AI models.",
    desc: "We help teams eliminate repetitive operational work by integrating machine learning models, retrieval-augmented generation (RAG), and automated data pipelines into everyday workflows.",
    features: [
      "Document intelligence and structured data extraction",
      "Retrieval-Augmented Generation (RAG) over private data",
      "Custom ML pipeline design and deployment",
      "Integration with existing business tools & third-party APIs"
    ],
    accent: "text-[#CA7B57]",
    accentBg: "bg-[#CA7B57]/10",
    border: "border-[#CA7B57]/20"
  }
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="services" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center max-w-[720px] mx-auto mb-16 reveal ${inView ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE6] text-xs font-mono text-[#54524E] mb-4">
            <span>ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1A1814] leading-[1.15] mb-5">
            What we engineer. <br />
            <span className="text-[#82807A] font-normal">
              Built for real production workloads.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            Every service is backed by our production-first engineering standards, automated testing suites, and stage-gate verification.
          </p>
        </div>

        {/* 3 Large Primefold Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <div
              key={srv.num}
              className={`pf-card-white p-7 sm:p-8 flex flex-col justify-between reveal ${
                inView ? "visible" : ""
              }`}
              style={{ transitionDelay: `${100 + idx * 100}ms` }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${srv.accentBg} ${srv.accent} border ${srv.border}`}>
                    {srv.tag}
                  </span>
                  <span className="text-xs font-mono text-[#82807A]">
                    {srv.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-[#1A1814] tracking-tight mb-3">
                  {srv.title}
                </h3>

                <p className="text-xs font-mono text-[#82807A] mb-4 leading-normal">
                  {srv.short}
                </p>

                <p className="text-sm text-[#54524E] leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[rgba(38,57,90,0.08)]">
                  {srv.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-[#54524E]">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${srv.accent}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[rgba(38,57,90,0.08)] flex items-center justify-between">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1814] hover:text-[#208374] transition-colors"
                >
                  <span>Discuss requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-[#82807A]">Ready to deploy</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
