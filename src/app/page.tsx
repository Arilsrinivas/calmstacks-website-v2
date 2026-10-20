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
  return (
    <>
      <Navbar />
      <main className="relative bg-[#FAF9F8]">
        {/* Hero Section */}
        <HeroSection />

        {/* Pipeline Interactive Section */}
        <PipelineInteractiveSection />

        {/* Vision & Differentiation */}
        <VisionSection />

        {/* Services */}
        <ServicesSection />

        {/* Agent Factory */}
        <AgentFactorySection />

        {/* About */}
        <AboutSection />

        {/* Founders */}
        <FoundersSection />

        {/* Projects */}
        <ProjectsSection />

        {/* Contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
