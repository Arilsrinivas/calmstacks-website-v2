"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

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
            ? "bg-[#FAF9F8]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(26,24,20,0.06),0_0_0_1px_rgba(38,57,90,0.08)]"
            : "bg-white/80 backdrop-blur-sm shadow-[0_1px_3px_rgba(26,24,20,0.04),0_0_0_1px_rgba(38,57,90,0.06)]"
        }`}
      >
        {/* Brand Logo from Assets */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#1A1814] p-1 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm overflow-hidden">
            <img
              src="/assets/favicon.svg"
              alt="CalmStacks Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-semibold text-base tracking-normal text-[#1A1814]">
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
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
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
            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#EFECE6] text-[#1A1814]">Autonomous</span>
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
            About &amp; Leadership
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
