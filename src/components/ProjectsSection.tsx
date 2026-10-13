"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "LegalConnect",
    category: "Legal Tech / AI Platform",
    tagline: "Connecting citizens with verified legal professionals across India",
    description: "A centralized legal services ecosystem combining advocate discovery, multi-party case management, client consultation scheduling, and AI-assisted workflow support. Architected with strict compliance with Bar Council of India ethics regulations, ensuring zero advertisements, sponsored placements, or commercial advocate rankings.",
    tech: ["Next.js", "AI Workflows", "Case Workspaces", "PostgreSQL", "BCI Compliant"],
    gradient: "from-blue-600 to-indigo-600",
    image: "/assets/project_legalconnect_mockup.svg",
    complianceNote: "Bar Council of India (BCI) Compliant: No star ratings, paid promotions, or solicitation. AI outputs are strictly informational and do not substitute for formal legal counsel."
  },
  {
    title: "CalmStacks Agent Factory",
    category: "AI Software Engineering",
    tagline: "Autonomous multi-agent SDLC orchestration engine",
    description: "Specialized orchestration framework deploying dedicated worker agents across isolated Git worktrees. Features strict contract-driven milestones, dynamic automated stage-gate test suites, and unified code quality synthesis for zero-drift production features.",
    tech: ["Multi-Agent Orchestration", "Git Worktrees", "FastAPI", "TypeScript", "Stage-Gate QA"],
    gradient: "from-cyan-600 to-blue-600",
    image: "/assets/project_agentfactory_mockup.svg"
  },
  {
    title: "AI Storage Forensics & Recovery",
    category: "Cybersecurity / AI Systems",
    tagline: "Intelligent digital evidence & data reconstruction",
    description: "AI-assisted deep data recovery and evidence reconstruction engine. Analyzes corrupted sector dumps, detects fractured file signatures, maps fragmented relations, and validates digital integrity for forensic inspection and incident response.",
    tech: ["Python", "Machine Learning", "Storage Forensics", "Data Integrity", "File Reconstruction"],
    gradient: "from-emerald-600 to-teal-600",
    image: "/assets/project_forensics_mockup.svg"
  },
];

export default function ProjectsSection() {
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
    <section ref={ref} id="projects" className="py-24">
      <div className="max-w-[1040px] mx-auto px-6">
        <div className="section-divider mb-16" />

        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Production Implementations
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            Featured work.
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
            Practical AI applications and intelligent engineering platforms built for real-world impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`card overflow-hidden group flex flex-col reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="h-48 bg-surface-elevated relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-0" />

                <div className="absolute bottom-4 left-5 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-white/10">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{project.title}</h3>
                  <p className="text-xs text-primary/80 font-medium mb-3">{project.tagline}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{project.description}</p>
                </div>

                <div>
                  {project.complianceNote && (
                    <div className="mb-4 p-2.5 rounded-lg bg-primary/5 border border-primary/15 text-[11px] text-text-muted leading-tight">
                      <span className="text-primary font-medium block mb-0.5">Regulatory Standard</span>
                      {project.complianceNote}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle/50">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 text-[10px] font-medium font-mono rounded-full text-text-muted bg-white/[0.04] border border-white/[0.05]">
                        {t}
                      </span>
                    ))}
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
