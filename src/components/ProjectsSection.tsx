"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NeuraBot Control Suite",
    category: "Robotics",
    description: "Real-time robotic arm control system with computer vision integration and predictive motion planning.",
    tech: ["Python", "ROS2", "OpenCV", "TensorFlow"],
    gradient: "from-violet-600 to-indigo-600",
    image: "/assets/Gemini_Generated_Image_bjg9vrbjg9vrbjg9.png"
  },
  {
    title: "FinFlow Dashboard",
    category: "Web App",
    description: "Enterprise financial analytics platform with real-time data streaming and interactive visualizations.",
    tech: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    gradient: "from-blue-600 to-cyan-600",
    image: "/assets/Gemini_Generated_Image_xxye89xxye89xxye.png"
  },
  {
    title: "MediTrack Mobile",
    category: "Mobile App",
    description: "Patient health monitoring app with wearable device sync, AI diagnostics, and telehealth integration.",
    tech: ["React Native", "Node.js", "MongoDB", "AWS"],
    gradient: "from-emerald-600 to-teal-600",
    image: "/assets/ChatGPT%20Image%20Apr%2026,%202026,%2010_20_17%20AM.png"
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
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-16" />

        <div className={`text-center mb-16 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            Featured work.
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-lg mx-auto">
            Solutions crafted for clients across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`card overflow-hidden group cursor-pointer reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="h-44 bg-surface-elevated relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-0" />

                <div className="absolute bottom-5 left-5 z-10">
                  <span className="text-[11px] font-medium uppercase tracking-widest text-white/90">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-semibold text-text-primary mb-2">{project.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 text-[11px] font-medium rounded-full text-text-muted bg-white/[0.04]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
