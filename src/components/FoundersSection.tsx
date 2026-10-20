"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";

interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
  tag: string;
}

const founders: Founder[] = [
  {
    name: "Aril Srinivas",
    role: "Founder & CEO",
    tag: "Technical Architecture & Agent Systems",
    bio: "Aril is an AI software engineer and systems architect specializing in autonomous multi-agent orchestration, high-performance distributed backends, and deterministic code synthesis pipelines. He directs the technical architecture, Agent Factory development, and core engineering standards at CalmStacks.",
    image: "/assets/founder_aril_v2.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com/Arilsrinivas",
    email: "mailto:aril@calmstacks.co.in",
  },
  {
    name: "Manya K M",
    role: "Co-Founder & COO",
    tag: "Operations & Product Governance",
    bio: "Manya leads product strategy, operational execution, and compliance frameworks at CalmStacks. She oversees lifecycle delivery from technical specification to production release, ensuring engineering rigor, user experience design, and seamless cross-functional product management.",
    image: "/assets/founder_manya.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "mailto:manya@calmstacks.co.in",
  },
];

export default function FoundersSection() {
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
    <section ref={ref} id="founders" className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center max-w-[720px] mx-auto mb-16 reveal ${inView ? "visible" : ""}`}>
          
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-normal text-[#1A1814] leading-[1.15] mb-5">
            Meet the founders. <br />
            <span className="text-[#82807A] font-normal">
              Engineers at the helm.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
            The leadership driving CalmStacks&apos; autonomous agent technology, engineering infrastructure, and client success.
          </p>
        </div>

        {/* 2 Clean Primefold Executive Profile Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={founder.name}
              className={`pf-card-white p-7 sm:p-9 flex flex-col justify-between border border-[rgba(38,57,90,0.08)] reveal ${
                inView ? "visible" : ""
              }`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
            >
              <div>
                <div className="flex items-center gap-5 mb-6">
                  {/* Photo with subtle border */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[rgba(38,57,90,0.1)] bg-[#FAF9F8] shrink-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-[#1A1814] block mb-1">
                      {founder.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1A1814] tracking-normal">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-sans text-[#82807A] mt-0.5">
                      {founder.tag}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#54524E] leading-relaxed mb-6">
                  {founder.bio}
                </p>
              </div>

              {/* Social links row with inline SVG icons */}
              <div className="pt-5 border-t border-[rgba(38,57,90,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* LinkedIn SVG */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#FAF9F8] border border-[rgba(38,57,90,0.08)] text-[#54524E] hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
                    aria-label={`${founder.name} LinkedIn`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 1.46-1.46c0-.81-.66-1.47-1.46-1.47a1.47 1.47 0 0 0-1.47 1.47c0 .8.66 1.46 1.47 1.46m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </a>

                  {/* GitHub SVG */}
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#FAF9F8] border border-[rgba(38,57,90,0.08)] text-[#54524E] hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
                    aria-label={`${founder.name} GitHub`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>

                  {/* Mail icon */}
                  <a
                    href={founder.email}
                    className="p-2 rounded-full bg-[#FAF9F8] border border-[rgba(38,57,90,0.08)] text-[#54524E] hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
                    aria-label={`Email ${founder.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href={founder.email}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1A1814] hover:text-[#1A1814] transition-colors"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
