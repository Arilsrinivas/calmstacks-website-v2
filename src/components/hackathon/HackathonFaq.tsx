"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonFaq() {
  const { faq } = HACKATHON_CONFIG;
  // Keep first item open by default for immediate discoverability
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-black border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center pb-16 border-b border-white/[0.08]">
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-3">
            {faq.sectionTag}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight mb-4">
            {faq.heading}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-md mx-auto">
            {faq.subheading}
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="divide-y divide-white/[0.08]">
          {faq.items.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-start justify-between gap-4 text-left py-2 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-primary font-medium mt-1">
                      0{index + 1}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                      {item.question}
                    </span>
                  </div>

                  <div className="p-1.5 rounded-full border border-white/10 group-hover:border-primary text-text-muted group-hover:text-white transition-colors shrink-0 mt-0.5">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer */}
                {isOpen && (
                  <div className="pl-10 pr-6 pt-3 pb-2 text-sm sm:text-base text-text-secondary font-light leading-relaxed animate-fade-up">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Query */}
        <div className="mt-16 p-6 rounded-xl border border-white/[0.08] bg-white/[0.01] text-center font-mono text-xs text-text-muted space-y-2">
          <div>HAVE AN UNANSWERED QUERY? REACH OUT TO THE CALMSTACKS TEAM</div>
          <a
            href="mailto:calmstacksdigital@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            calmstacksdigital@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
