"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";

const criteria = [
  {
    title: "Innovation",
    desc: "Originality and creativity of the concept. How unique is the approach to solving the problem?"
  },
  {
    title: "Technical Implementation",
    desc: "Quality, efficiency, and cleanliness of the code. Proper use of architecture and technologies."
  },
  {
    title: "Usability & Design",
    desc: "User experience (UX) and user interface (UI) quality. Is the solution intuitive, clean, and elegant?"
  },
  {
    title: "Scalability",
    desc: "System design and performance capability. Can the solution handle increased load and future expansion?"
  },
  {
    title: "Overall Impact",
    desc: "Practical applicability and real-world value. Does the solution solve a genuine pain point effectively?"
  }
];

export default function InnovationFees() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="fees-evaluation" className="fees-section py-24 relative bg-transparent">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-16" />

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-20">
          {/* Left Column: Fees & Guidelines */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              GUIDELINES
            </span>
            <h3 className="text-4xl font-semibold tracking-tight text-white mt-4 mb-6">
              Rules & Guidelines
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              The CalmStacks Internship Hackathon is open to all passionate tech minds. Please review our judging criteria and timeline guidelines before submitting your application.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border-subtle bg-surface/5">
              <HelpCircle className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs text-text-secondary leading-relaxed">
                Ensure you submit your team and project details before the registration deadline.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Judging Criteria Accordion */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="text-xs font-semibold tracking-widest text-text-muted uppercase mb-6">
              JUDGING CRITERIA
            </h4>
            
            <div className="space-y-3">
              {criteria.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={item.title}
                    className={`border border-border-subtle rounded-xl overflow-hidden transition-all duration-300 ${
                      isOpen ? "bg-surface/20" : "bg-transparent"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-medium text-text-primary focus:outline-none"
                    >
                      <span className="text-base font-semibold text-white">{item.title}</span>
                      <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`} />
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-40 border-t border-border-subtle/50" : "max-h-0"
                      } overflow-hidden`}
                    >
                      <div className="p-5 text-sm text-text-secondary leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Builder Program Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 md:p-12 rounded-3xl bg-surface-elevated/10 border border-border-subtle backdrop-blur-lg flex flex-col items-center justify-center text-center"
        >
          <div className="max-w-[720px] mx-auto flex flex-col items-center">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full w-fit">
              PARTNER INITIATIVE
            </span>
            <h3 className="text-3xl font-semibold tracking-tight text-white mt-4 mb-3">
              CalmStacks Builder Program
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              A structured, 6-week mentorship and project-based learning initiative. Work directly with industry architects, build production-grade systems, and fast-track your engineering career.
            </p>
            <p className="text-sm text-white font-semibold">
              Special Offer: Hackathon participants receive <span className="text-primary font-bold">exclusive discounted access</span> compared to the standard enrollment fee.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
