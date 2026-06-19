"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";

const faqs = [
  {
    question: "Who is eligible to participate?",
    answer: "Any student, fresh graduate, or self-taught developer who has a passion for building AI/ML or Mobile App solutions can participate. This is an individual participation event."
  },
  {
    question: "How does the internship selection work?",
    answer: "CalmStacks will select the Top 3 to 5 performers based on their submission scores. Winners will be offered a 2-month paid remote internship, working directly on core startup projects."
  },
  {
    question: "What is the ₹100 fee used for?",
    answer: "The fee is strictly to verify authentic entries and ensure committed participation. All registration fees go directly into funding additional rewards, scholarships, and resources."
  },
  {
    question: "What tech stack can I use?",
    answer: "For the AI/ML track, you can use Python, PyTorch, TensorFlow, or standard LLM frameworks. For the Mobile App track, you can use React Native, Flutter, Swift, or Kotlin. Specific repository templates will be provided."
  }
];

export default function InnovationFaq() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faqs" className="faq-section py-24 relative bg-transparent">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="section-divider mb-16" />

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            QUESTIONS
          </span>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
            Frequently Asked
          </h3>
        </div>

        {/* Accordions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.question}
                className={`border border-border-subtle rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "bg-surface/20" : "bg-transparent"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-text-primary focus:outline-none"
                >
                  <span className="text-base font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`} />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 border-t border-border-subtle/50" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="p-5 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
