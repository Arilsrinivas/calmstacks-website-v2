"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Solutions", href: "/#services" },
  { label: "Founders", href: "/#founders" },
  { label: "About Us", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Hackathon", href: "/hackathon", isEvent: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-[980px] mx-auto px-6 h-11 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img
            src="/assets/calmstacks_logo_white.svg"
            alt="CalmStacks Logo"
            className="h-6 w-auto"
          />
          <span className="text-sm font-semibold text-text-primary tracking-tight">
            CalmStacks
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link flex items-center gap-1.5 ${
                link.isEvent
                  ? "text-white font-medium hover:text-primary transition-colors"
                  : ""
              }`}
            >
              {link.isEvent && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
              {link.label}
              {link.isEvent && (
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 ml-0.5">
                  24H
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="text-sm font-medium text-text-primary border border-border-subtle hover:bg-surface px-5 py-2 rounded-full transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border-subtle animate-slide-up">
          <div className="max-w-[980px] mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`py-2.5 text-sm transition-colors flex items-center justify-between ${
                  link.isEvent
                    ? "text-primary font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2">
                  {link.isEvent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </div>
                {link.isEvent && (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    24H EVENT
                  </span>
                )}
              </a>
            ))}
            <div className="h-px bg-border-subtle my-3" />
            <div className="flex gap-3">
              <a
                href="#contact"
                className="text-sm text-primary"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
