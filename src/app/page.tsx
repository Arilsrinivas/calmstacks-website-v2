"use client";

import { useEffect, useState } from "react";
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
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight || 800;

      // As user scrolls past the hero (0 to windowHeight), zoom in the landing page by up to 10% (scale 1.0 -> 1.10)
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      const scale = 1 + progress * 0.10; // Exactly 10% zoom in
      const opacity = 1 - progress * 0.25; // Subtle fade so the second page cleanly takes focus

      setHeroScale(scale);
      setHeroOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative bg-[#FAF9F8]">
        {/* 
          1. Landing Page Container:
          Fixed sticky viewport with 10% zoom-in transform on scroll
        */}
        <div
          className="sticky top-0 left-0 right-0 z-0 will-change-transform transition-transform ease-out duration-100"
          style={{
            transform: `scale(${heroScale})`,
            opacity: heroOpacity,
            transformOrigin: "center 40%",
          }}
        >
          <HeroSection />
        </div>

        {/* 
          2. Second Page & Content:
          Slides up covering the landing page with z-index, rounded top, and shadow
        */}
        <div className="relative z-10 bg-[#FAF9F8] rounded-t-[36px] sm:rounded-t-[44px] shadow-[0_-25px_60px_rgba(26,24,20,0.12)] border-t border-[rgba(38,57,90,0.08)] -mt-10 overflow-hidden">
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
