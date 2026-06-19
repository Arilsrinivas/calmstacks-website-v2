"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Star } from "lucide-react";

const prizes = [
  {
    place: "1st Prize",
    award: "Grand Internship Offer",
    desc: "Guaranteed 2-Month Paid Remote Internship + Core Team Placement + Tech Lead Mentorship + Merit Certificate.",
    highlight: "from-amber-400/20 to-yellow-500/5",
    border: "border-amber-500/30",
    textHighlight: "text-amber-400",
    badge: "GOLD WINNER",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    place: "2nd Prize",
    award: "Internship Offer",
    desc: "Guaranteed 2-Month Paid Remote Internship + Senior Engineer Mentorship + Merit Certificate.",
    highlight: "from-slate-400/20 to-slate-500/5",
    border: "border-slate-400/30",
    textHighlight: "text-slate-300",
    badge: "SILVER RUNNER-UP",
    badgeBg: "bg-slate-500/10 text-slate-300 border-slate-500/20"
  },
  {
    place: "3rd Prize",
    award: "Internship Offer",
    desc: "Guaranteed 2-Month Paid Remote Internship + Specialized Team Shadowing + Merit Certificate.",
    highlight: "from-orange-700/20 to-orange-800/5",
    border: "border-orange-700/30",
    textHighlight: "text-orange-400",
    badge: "BRONZE RUNNER-UP",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  },
  {
    place: "Participation",
    award: "Official Certificate",
    desc: "All successful project submissions receive an Official Participation Certificate detailing code scores.",
    highlight: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    textHighlight: "text-blue-400",
    badge: "ALL PARTICIPANTS",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  }
];

export default function InnovationTracks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="prizes" ref={containerRef} className="py-24 relative bg-transparent">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-20" />

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            AWARDS
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4">
            Prizes & Recognition
          </h2>
        </div>

        {/* Prizes Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {prizes.map((prize, i) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card glass-card p-8 flex flex-col justify-between border ${prize.border} bg-gradient-to-br ${prize.highlight} backdrop-blur-md rounded-2xl relative overflow-hidden group`}
            >
              <div>
                {/* Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[10px] font-bold tracking-wider px-3 py-1 border rounded-full ${prize.badgeBg}`}>
                    {prize.badge}
                  </span>
                  <Star className={`w-4 h-4 ${prize.textHighlight} opacity-50 group-hover:scale-110 transition-transform duration-300`} />
                </div>

                {/* Place & Award */}
                <span className={`text-[11px] font-semibold uppercase tracking-widest ${prize.textHighlight}`}>
                  {prize.place}
                </span>
                <h3 className="text-2xl font-semibold text-white mt-2 mb-4">
                  {prize.award}
                </h3>

                {/* Details */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {prize.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
