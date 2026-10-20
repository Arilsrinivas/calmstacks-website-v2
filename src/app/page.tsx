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
  // Section 1 (Hero Landing): zooms in 10% as Section 2 rises
  const [heroScale, setHeroScale] = useState(1);
  const secondPageRef = useRef<HTMLDivElement>(null);

  // Section 2 (Pipeline Interactive): zooms out & goes up as Section 3 approaches
  const [secondSectionScale, setSecondSectionScale] = useState(1);
  const [secondSectionOpacity, setSecondSectionOpacity] = useState(1);

  // Section 3 (Vision / Services Container): zooms in to fit the page as it comes into frame
  const [thirdSectionScale, setThirdSectionScale] = useState(1);
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight || 800;

      // ==========================================
      // Transition 1 -> 2:
      // Hero zooms in 10% as Section 2 begins to rise
      // ==========================================
      if (secondPageRef.current) {
        const rect2 = secondPageRef.current.getBoundingClientRect();
        const progress1 = Math.min(Math.max((windowHeight - rect2.top) / windowHeight, 0), 1);
        setHeroScale(1 + progress1 * 0.10); // 1.0 -> 1.10
      }

      // ==========================================
      // Transition 2 -> 3:
      // Section 2 zooms out & goes up as Section 3 comes into frame,
      // and Section 3 zooms in to fit the page
      // ==========================================
      if (thirdSectionRef.current) {
        const rect3 = thirdSectionRef.current.getBoundingClientRect();
        
        // Progress of section 3 entering the viewport:
        // 0 = top of section 3 just touches bottom of viewport
        // 1 = section 3 is fully covering and fitted to the page
        const progress2 = Math.min(Math.max((windowHeight - rect3.top) / windowHeight, 0), 1);

        // Second section zooms out (e.g. 1.0 -> 0.90) and gently fades as it goes up
        const scale2 = 1 - progress2 * 0.10;
        const opacity2 = 1 - progress2 * 0.35;
        setSecondSectionScale(scale2);
        setSecondSectionOpacity(opacity2);

        // Third section zooms in from 0.92 -> 1.0 to fit the page as it slides up
        const scale3 = 0.92 + progress2 * 0.08;
        setThirdSectionScale(scale3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative bg-[#FAF9F8]">
        {/* 
          1. Landing Page (Sticky):
          Zooms in by 10% as Section 2 rises over it.
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
          2. Second Page (Interactive Pipeline Section):
          Slides up over the hero.
          When scrolling further, it stays sticky, zooms out (1.0 -> 0.90) and moves up,
          while the 3rd section rises to cover it.
        */}
        <div
          ref={secondPageRef}
          className="sticky top-0 z-10 bg-[#FAF9F8] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(26,24,20,0.18)] border-t border-[rgba(38,57,90,0.1)] will-change-transform"
          style={{
            transform: `scale(${secondSectionScale}) translateY(${(1 - secondSectionScale) * -120}px)`,
            opacity: secondSectionOpacity,
            transformOrigin: "center top",
          }}
        >
          <PipelineInteractiveSection />
        </div>

        {/* 
          3. Third Section & Rest of the Website:
          Slides up over the 2nd section, zooming in from 0.92 -> 1.0 to fit the frame.
        */}
        <div
          ref={thirdSectionRef}
          className="relative z-20 bg-[#FAF9F8] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(26,24,20,0.22)] border-t border-[rgba(38,57,90,0.12)] will-change-transform overflow-hidden"
          style={{
            transform: `scale(${thirdSectionScale})`,
            transformOrigin: "center top",
          }}
        >
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
