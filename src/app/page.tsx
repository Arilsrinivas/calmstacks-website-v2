"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PipelineInteractiveSection from "@/components/PipelineInteractiveSection";
import VisionSection from "@/components/VisionSection";
import ServicesSection from "@/components/ServicesSection";
import AgentFactorySection from "@/components/AgentFactorySection";
import AboutSection from "@/components/AboutSection";
import FoundersSection from "@/components/FoundersSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [heroScale, setHeroScale] = useState(1);
  const secondPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!secondPageRef.current) return;

      const rect = secondPageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // The second page starts to rise when its top edge enters from the bottom of the viewport (rect.top <= windowHeight)
      // It completely covers the hero when rect.top reaches ~0.
      const riseDistance = windowHeight;
      const currentProgress = (windowHeight - rect.top) / riseDistance;

      // Clamp between 0 (not started rising yet) and 1 (fully risen covering landing page)
      const progress = Math.min(Math.max(currentProgress, 0), 1);

      // Exactly 10% zoom-in synced directly to the rise (1.0 -> 1.10)
      const scale = 1 + progress * 0.10;

      setHeroScale(scale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative bg-[#FAF9F8]">
        {/* 
          1. Landing Page (Sticky):
          Zooms in by exactly 10% precisely as the second page begins to rise and cover it.
        */}
        <div
          className="sticky top-0 left-0 right-0 z-0 will-change-transform"
          style={{
            transform: `scale(${heroScale})`,
            transformOrigin: "center 45%",
          }}
        >
          <HeroSection />
        </div>

        {/* 
          2. Second Page Container:
          Slides up covering the landing page.
        */}
        <div
          ref={secondPageRef}
          className="relative z-10 bg-[#FAF9F8] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(26,24,20,0.18)] border-t border-[rgba(38,57,90,0.1)] overflow-hidden"
        >
          <PipelineInteractiveSection />
          <VisionSection />
          <ServicesSection />
          <AgentFactorySection />
          <AboutSection />
          <FoundersSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
