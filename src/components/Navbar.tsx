"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-4 transition-all duration-300">
      <nav
        className={`w-full max-w-[1140px] flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF9F8]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(26,24,20,0.06),0_0_0_1px_rgba(38,57,90,0.08)]"
            : "bg-white/70 backdrop-blur-sm shadow-[0_1px_3px_rgba(26,24,20,0.04),0_0_0_1px_rgba(38,57,90,0.06)]"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#1A1814] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="w-4 h-4 text-[#3FD1BC]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-base tracking-tight text-[#1A1814]">
            CalmStacks
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-[#54524E]">
          <Link
            href="#platform"
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
          >
            Platform
          </Link>
          <Link
            href="#agent-factory"
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors flex items-center gap-1.5"
          >
            <span>Agent Factory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#208374]" />
          </Link>
          <Link
            href="#services"
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
          >
            Capabilities
          </Link>
          <Link
            href="#projects"
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
          >
            Implementations
          </Link>
          <Link
            href="#about"
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1814] hover:bg-black/[0.04] transition-colors"
          >
            About
          </Link>
          <Link
            href="/hackathon"
            className="px-3 py-1 rounded-full text-xs font-mono text-[#208374] bg-[#208374]/10 hover:bg-[#208374]/15 transition-colors ml-1"
          >
            Hackathon &apos;26
          </Link>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center text-[13.5px] font-medium text-[#54524E] hover:text-[#1A1814] px-3 py-1.5 transition-colors"
          >
            Get in touch
          </Link>
          <Link
            href="#contact"
            className="pf-btn-primary !text-[13px] !py-2 !px-4"
          >
            <span>Start a project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#54524E] hover:text-[#1A1814] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-[#FAF9F8] border border-[rgba(38,57,90,0.1)] rounded-2xl p-5 shadow-xl flex flex-col gap-3">
          <Link
            href="#platform"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A1814] py-1.5 px-2 rounded-lg hover:bg-black/[0.04]"
          >
            Platform
          </Link>
          <Link
            href="#agent-factory"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A1814] py-1.5 px-2 rounded-lg hover:bg-black/[0.04] flex items-center justify-between"
          >
            <span>Agent Factory</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#208374]/10 text-[#208374]">Autonomous</span>
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A1814] py-1.5 px-2 rounded-lg hover:bg-black/[0.04]"
          >
            Capabilities
          </Link>
          <Link
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A1814] py-1.5 px-2 rounded-lg hover:bg-black/[0.04]"
          >
            Implementations
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A1814] py-1.5 px-2 rounded-lg hover:bg-black/[0.04]"
          >
            About & Leadership
          </Link>
          <Link
            href="/hackathon"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#208374] py-1.5 px-2 rounded-lg bg-[#208374]/10"
          >
            Hackathon 2026 Archive
          </Link>
          <div className="pt-2 border-t border-[rgba(38,57,90,0.08)]">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="pf-btn-primary w-full justify-center !text-sm"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
