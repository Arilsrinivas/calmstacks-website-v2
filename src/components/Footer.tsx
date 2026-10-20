"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.08)] pt-16 pb-12 text-[#54524E]">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Top Callout Strip (Primefold Style: "One intelligence. Built for every field.") */}
        <div className="pb-12 mb-12 border-b border-[rgba(38,57,90,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1814] tracking-tight">
              CalmStacks. <br className="hidden sm:inline" />
              <span className="text-[#82807A] font-normal">
                Engineering intelligent systems. Building what comes next.
              </span>
            </h3>
            <p className="text-xs font-mono text-[#82807A] mt-2">
              Autonomous software engineering · Stage-gate QA · Custom AI platforms
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="#contact" className="pf-btn-primary">
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1A1814] font-semibold mb-4">
              Platform &amp; Core
            </h4>
            <ul className="space-y-2.5 text-xs text-[#54524E]">
              <li>
                <Link href="#agent-factory" className="hover:text-[#1A1814] transition-colors">
                  Agent Factory
                </Link>
              </li>
              <li>
                <Link href="#platform" className="hover:text-[#1A1814] transition-colors">
                  Orchestrator Architecture
                </Link>
              </li>
              <li>
                <Link href="#vision" className="hover:text-[#1A1814] transition-colors">
                  Stage-Gate Validation
                </Link>
              </li>
              <li>
                <Link href="#agent-factory" className="hover:text-[#1A1814] transition-colors">
                  Git Worktree Pipelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1A1814] font-semibold mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-[#54524E]">
              <li>
                <Link href="#projects" className="hover:text-[#1A1814] transition-colors flex items-center gap-1.5">
                  <span>LegalConnect</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#208374]/10 text-[#208374]">Live</span>
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-[#1A1814] transition-colors">
                  AI Forensics &amp; Recovery
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#1A1814] transition-colors">
                  Custom AI Applications
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#1A1814] transition-colors">
                  Workflow Automations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1A1814] font-semibold mb-4">
              Initiatives
            </h4>
            <ul className="space-y-2.5 text-xs text-[#54524E]">
              <li>
                <Link href="/hackathon" className="hover:text-[#1A1814] transition-colors flex items-center gap-1.5">
                  <span>CalmStacks 24h Hackathon</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#CA7B57]/10 text-[#CA7B57]">Archived</span>
                </Link>
              </li>
              <li>
                <Link href="/hackathon" className="hover:text-[#1A1814] transition-colors">
                  Download Certificates
                </Link>
              </li>
              <li>
                <Link href="/hackathon/admin" className="hover:text-[#1A1814] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1A1814] font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#54524E]">
              <li>
                <Link href="#about" className="hover:text-[#1A1814] transition-colors">
                  About CalmStacks
                </Link>
              </li>
              <li>
                <Link href="#founders" className="hover:text-[#1A1814] transition-colors">
                  Founders &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#1A1814] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="mailto:calmstacksdigital@gmail.com"
                  className="hover:text-[#1A1814] transition-colors font-mono text-[11px]"
                >
                  calmstacksdigital@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 border-t border-[rgba(38,57,90,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#82807A]">
          <div>
            &copy; {new Date().getFullYear()} CalmStacks Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#208374]" />
              Systems Operational
            </span>
            <span>·</span>
            <span>Hassan &amp; Bengaluru, Karnataka</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
