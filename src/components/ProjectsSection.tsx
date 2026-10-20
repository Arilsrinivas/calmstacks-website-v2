"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, CheckCircle2, Terminal } from "lucide-react";

const projects = [
  {
    title: "LegalConnect",
    category: "Legal Tech / AI Platform",
    tagline: "Connecting citizens with verified legal professionals across India",
    description:
      "A centralized legal services ecosystem combining advocate discovery, multi-party case management, consultation scheduling, and AI-assisted workflow support. Architected with strict adherence to Bar Council of India ethics regulations, ensuring zero advertisements, sponsored placements, or commercial advocate rankings.",
    tech: ["Next.js", "AI Workflows", "Case Workspaces", "PostgreSQL", "BCI Compliant"],
    badge: "Production Platform",
    badgeColor: "bg-[#208374]/10 text-[#208374] border-[#208374]/20",
    image: "/assets/project_legalconnect_mockup.svg",
    complianceNote:
      "Bar Council of India (BCI) Compliant: No star ratings, paid promotions, or solicitation. AI outputs are strictly informational and do not substitute for formal legal counsel."
  },
  {
    title: "CalmStacks Agent Factory",
    category: "AI Software Engineering",
    tagline: "Autonomous multi-agent SDLC orchestration engine",
    description:
      "Specialized orchestration framework deploying dedicated worker agents across isolated Git worktrees. Features strict contract-driven milestones, dynamic automated stage-gate test suites, and unified code quality synthesis for zero-drift production features.",
    tech: ["Multi-Agent Orchestration", "Git Worktrees", "FastAPI", "TypeScript", "Stage-Gate QA"],
    badge: "Proprietary Engine",
    badgeColor: "bg-[#2E68FF]/10 text-[#2E68FF] border-[#2E68FF]/20",
    image: "/assets/project_agentfactory_mockup.svg",
    complianceNote: "Stage-Gate Verification: 100% deterministic milestone checkpoints."
  },
  {
    title: "AI Storage Forensics & Recovery",
    category: "Cybersecurity / AI Systems",
    tagline: "Intelligent digital evidence & data reconstruction",
    description:
      "AI-assisted deep data recovery and evidence reconstruction engine. Analyzes corrupted sector dumps, detects fractured file signatures, maps fragmented relations, and validates digital integrity for forensic inspection and incident response.",
    tech: ["Python", "Machine Learning", "Storage Forensics", "Data Integrity", "File Reconstruction"],
    badge: "Security & Forensics",
    badgeColor: "bg-[#CA7B57]/10 text-[#CA7B57] border-[#CA7B57]/20",
    image: "/assets/project_forensics_mockup.svg",
    complianceNote: "Forensic Integrity: Strict cryptographic hash preservation and chain-of-custody logging."
  }
];

export default function ProjectsSection() {
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
    <section ref={ref} id="projects" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center max-w-[720px] mx-auto mb-16 reveal ${inView ? "visible" : ""}`}>
          
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-normal text-[#1A1814] leading-[1.15] mb-5">
            Featured work. <br />
            <span className="text-[#82807A] font-normal">
              Practical AI applications built for impact.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            Real products engineered with our autonomous agent systems and production-grade architectures.
          </p>
        </div>

        {/* 3 Featured Products in Primefold Design Style */}
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`pf-card-white overflow-hidden p-6 sm:p-10 border border-[rgba(38,57,90,0.08)] reveal ${
                inView ? "visible" : ""
              }`}
              style={{ transitionDelay: `${100 + idx * 100}ms` }}
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left Content column */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium border ${project.badgeColor}`}>
                        {project.badge}
                      </span>
                      <span className="text-xs font-mono text-[#82807A]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1814] tracking-normal mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#208374] font-medium mb-4">
                      {project.tagline}
                    </p>

                    <p className="text-sm text-[#54524E] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Regulatory / Architectural Note Card */}
                    {project.complianceNote && (
                      <div className="mb-6 p-3.5 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.08)] flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#208374] shrink-0 mt-0.5" />
                        <div className="text-xs text-[#54524E] leading-relaxed">
                          <span className="font-semibold text-[#1A1814] block mb-0.5">Standards &amp; Compliance</span>
                          {project.complianceNote}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tech stack badges */}
                  <div className="pt-4 border-t border-[rgba(38,57,90,0.08)]">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px] font-mono text-[#54524E] bg-[#FAF9F8] border border-[rgba(38,57,90,0.08)] rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1814] hover:text-[#208374] transition-colors"
                    >
                      <span>Inquire about this architecture</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Mockup Visual */}
                <div className="lg:col-span-6 bg-[#FAF9F8] rounded-2xl p-4 sm:p-6 border border-[rgba(38,57,90,0.08)] flex items-center justify-center relative overflow-hidden group">
                  <div className="w-full relative rounded-xl overflow-hidden shadow-sm border border-[rgba(38,57,90,0.08)] bg-white">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
