"use client";

import { useState } from "react";
import HackathonNav from "@/components/hackathon/HackathonNav";
import HackathonHero from "@/components/hackathon/HackathonHero";
import HackathonAbout from "@/components/hackathon/HackathonAbout";
import HackathonPillars from "@/components/hackathon/HackathonPillars";
import HackathonChallenges from "@/components/hackathon/HackathonChallenges";
import HackathonTimeline from "@/components/hackathon/HackathonTimeline";
import HackathonPrizes from "@/components/hackathon/HackathonPrizes";
import HackathonCollaborations from "@/components/hackathon/HackathonCollaborations";
import HackathonEligibility from "@/components/hackathon/HackathonEligibility";
import HackathonVenue from "@/components/hackathon/HackathonVenue";
import HackathonFaq from "@/components/hackathon/HackathonFaq";
import HackathonFinalCta from "@/components/hackathon/HackathonFinalCta";
import HackathonFooter from "@/components/hackathon/HackathonFooter";
import HackathonRegisterModal from "@/components/hackathon/HackathonRegisterModal";

export default function HackathonPage() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white relative font-sans antialiased overflow-x-hidden">
      {/* Event Header Navigation */}
      <HackathonNav onOpenRegister={handleOpenRegister} />

      {/* Main Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <HackathonHero onOpenRegister={handleOpenRegister} />

        {/* Section 01: About The Hackathon */}
        <HackathonAbout />

        {/* Section 02: Core Values (Build, Collaborate, Solve, Compete) */}
        <HackathonPillars />

        {/* Section 03: The Challenge */}
        <HackathonChallenges />

        {/* Section 04: 24 Hour Timeline */}
        <HackathonTimeline />

        {/* Section 05: Prize Pool */}
        <HackathonPrizes />

        {/* Section 06: In Collaboration With */}
        <HackathonCollaborations />

        {/* Section 07: Who Is This For? (Eligibility) */}
        <HackathonEligibility />

        {/* Section 08: See You At MCE (Venue) */}
        <HackathonVenue />

        {/* Section 09: FAQ */}
        <HackathonFaq />

        {/* Section 10: Final Call to Action */}
        <HackathonFinalCta onOpenRegister={handleOpenRegister} />
      </main>

      {/* Event Footer */}
      <HackathonFooter />

      {/* Registration Modal */}
      <HackathonRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
}
