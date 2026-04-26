"use client";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-surface-elevated/30">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="section-divider mb-12" />

        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Logo & Description */}
          <div className="flex-1 max-w-xs">
            <a href="#hero" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity w-fit">
              <img 
                src="/assets/calmstacks_logo_white.svg" 
                alt="CalmStacks Logo" 
                className="h-6 w-auto"
              />
              <span className="text-sm font-semibold text-text-primary tracking-tight">
                CalmStacks
              </span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed">
              We believe technology should feel intuitive, not overwhelming. Crafted to deliver performance without complexity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Solutions</a>
              </li>
              <li>
                <a href="#about" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">AboutUs</a>
              </li>
              <li>
                <a href="#projects" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Projects</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>Tel: +919964536009</li>
              <li>Email: calmstacksdigital@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="section-divider" />

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-muted">
            © 2026 by Calmstacks.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-text-muted hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] text-text-muted hover:text-text-secondary transition-colors">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
