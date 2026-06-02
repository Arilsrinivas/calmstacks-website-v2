"use client";

import { useEffect, useRef } from "react";

interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
}

const founders: Founder[] = [
  {
    name: "Aril Srinivas",
    role: "Founder & CEO",
    bio: "Aril is a tech-focused software engineer specializing in building high-performance, scalable web systems and intelligent architectures. Passionate about bringing ideas to life with clean code and modern design, he steers the technical and strategic product vision at CalmStacks.",
    image: "/assets/founder_aril.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com/Arilsrinivas",
    email: "mailto:aril@calmstacks.co.in",
  },
  {
    name: "Manya K M",
    role: "Co-Founder & COO",
    bio: "Manya leads operational strategies and product management at CalmStacks, ensuring seamless execution from concept to deployment. With an eye for user experience and product lifecycle, she bridges technology with user needs to deliver real business impact.",
    image: "/assets/founder_manya.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "mailto:manya@calmstacks.co.in",
  },
];

export default function FoundersSection() {
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
      { threshold: 0.05 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="founders" className="py-24 px-6 relative bg-background">
      <div className="max-w-[980px] mx-auto">
        <div className="section-divider mb-16" />

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 reveal">
            Leadership Team
          </h2>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary mb-6 reveal" style={{ transitionDelay: "100ms" }}>
            Meet Our Founders
          </h3>
          <p className="text-lg text-text-secondary leading-relaxed max-w-[680px] mx-auto reveal" style={{ transitionDelay: "200ms" }}>
            We're a dedicated team committed to delivering clean, reliable, and high-performance digital products to help your business scale effortlessly.
          </p>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[840px] mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={founder.name}
              className="card p-8 flex flex-col items-center text-center border border-border-subtle reveal"
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              {/* Profile Image Wrapper */}
              <div className="w-40 h-40 rounded-2xl overflow-hidden mb-6 border border-border-subtle bg-surface-elevated">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Title & Role */}
              <h4 className="text-2xl font-semibold text-text-primary tracking-tight mb-1">
                {founder.name}
              </h4>
              <p className="text-sm font-medium text-primary mb-4">
                {founder.role}
              </p>

              {/* Bio */}
              <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">
                {founder.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-5 mt-auto">
                {/* LinkedIn */}
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                  aria-label={`${founder.name}'s LinkedIn`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                {/* GitHub */}
                <a
                  href={founder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                  aria-label={`${founder.name}'s GitHub`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                {/* Email */}
                <a
                  href={founder.email}
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                  aria-label={`Email ${founder.name}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
