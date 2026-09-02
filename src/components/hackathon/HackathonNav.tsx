"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

interface HackathonNavProps {
  onOpenRegister: () => void;
}

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "CHALLENGE", href: "#challenge" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "PRIZES", href: "#prizes" },
  { label: "FAQ", href: "#faq" },
];

export default function HackathonNav({ onOpenRegister }: HackathonNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Event Identifier */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-80"
            title="Return to Calmstacks main site"
          >
            <img
              src="/assets/calmstacks_logo_white.svg"
              alt="Calmstacks Logo"
              className="h-6 w-auto"
            />
            <span className="text-sm font-semibold tracking-tight text-white">
              {HACKATHON_CONFIG.meta.organizer}
            </span>
          </Link>

          {/* Hairline Divider & Monospace Event Tag */}
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/15">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              24H SPRINT // MCE HASSAN
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs tracking-wider text-text-secondary hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Register CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-xs text-text-muted hover:text-text-secondary px-3 py-1.5 transition-colors flex items-center gap-1"
          >
            calmstacks.com
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={onOpenRegister}
            className="font-mono text-xs font-medium px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 transition-all tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <span>REGISTER</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenRegister}
            className="font-mono text-[11px] font-medium px-3 py-1.5 rounded-full bg-white text-black active:scale-95 cursor-pointer"
          >
            REGISTER
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-white rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-slide-up">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[10px] uppercase text-text-muted tracking-widest pb-1 border-b border-white/10">
              NAVIGATION
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-sm tracking-wider text-text-secondary hover:text-white py-1 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 rounded-full bg-primary text-white font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                REGISTER NOW
              </button>
              <Link
                href="/"
                className="text-center text-xs font-mono text-text-muted hover:text-white py-1 flex items-center justify-center gap-1"
              >
                Return to Calmstacks Main Site
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
