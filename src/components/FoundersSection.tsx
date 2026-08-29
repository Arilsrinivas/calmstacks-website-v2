"use client";

import { useEffect, useRef, useState } from "react";

const founders = [
  {
    name: "Aril Srinivas",
    role: "Founder",
    description: "Aril Srinivas is the visionary behind Calmstacks, dedicated to revolutionizing digital production through innovative technology and strategic design. With a focus on scalability and performance, he leads the team in creating impactful web solutions.",
    image: "/assets/founder_aril.png"
  },
  {
    name: "Manya K.M",
    role: "Co-founder",
    description: "Manya K.M brings a wealth of expertise in operational excellence and user-centric design to Calmstacks. As Co-founder, she ensures that every project not only meets technical standards but also delivers an exceptional user experience.",
    image: "/assets/cofounder_manya.png"
  }
];

export default function FoundersSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="founders" className="py-24 bg-surface/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="section-divider mb-16" />
        
        <div className={`reveal ${inView ? "visible" : ""} mb-16 text-center`}>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            OUR LEADERSHIP
          </h2>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary">
            Meet the Visionaries
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {founders.map((founder, index) => (
            <div 
              key={founder.name} 
              className={`reveal ${inView ? "visible" : ""} group`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-text-primary">{founder.name}</h4>
                  <p className="text-primary font-medium tracking-wide uppercase text-sm">{founder.role}</p>
                </div>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {founder.description}
                </p>
                
                <div className="flex gap-4 pt-2">
                   {/* Social placeholders could go here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
