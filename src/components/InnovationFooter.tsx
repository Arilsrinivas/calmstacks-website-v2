"use client";

export default function InnovationFooter() {
  return (
    <footer className="pt-16 pb-8 bg-transparent relative z-20">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-center md:text-left">
          {/* Logo & Slogan */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <img 
                src="/assets/calmstacks_logo_white.svg" 
                alt="CalmStacks Logo" 
                className="h-6 w-auto"
              />
              <span className="text-sm font-semibold text-white tracking-tight">
                CalmStacks Technologies
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-normal">
              &ldquo;Don&apos;t just learn technology. Build it.&rdquo;
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-xs text-text-muted hover:text-text-primary transition-colors">Main Site</a>
            <a href="https://forms.gle/n6n1hrkAESCL5dM89" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-text-primary transition-colors">Register</a>
            <a href="#faqs" className="text-xs text-text-muted hover:text-text-primary transition-colors">Support</a>
          </div>
        </div>

        <div className="section-divider" />

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-muted">
          <p>
            &copy; 2026 CalmStacks Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
