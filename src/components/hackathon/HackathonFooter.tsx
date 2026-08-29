"use client";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export default function HackathonFooter() {
  const { footer, meta } = HACKATHON_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 bg-[#08080a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand & Event Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img
                src="/assets/calmstacks_logo_white.svg"
                alt="Calmstacks Logo"
                className="h-6 w-auto"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                {footer.brandName}
              </span>
            </div>
            <p className="font-mono text-xs text-text-secondary">
              {footer.eventTitle} • {meta.series}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-text-secondary">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3 text-text-muted" />
              </a>
            ))}

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer pl-4 border-l border-white/10"
              title="Scroll back to top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3 text-primary" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-muted">
          <div>{footer.copyright}</div>
          <div className="text-center sm:text-right">
            HOSTED AT MALNAD COLLEGE OF ENGINEERING, HASSAN
          </div>
        </div>
      </div>
    </footer>
  );
}
