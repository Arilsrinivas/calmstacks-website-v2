"use client";

import { useState } from "react";
import HackathonNav from "@/components/hackathon/HackathonNav";
import HackathonHero from "@/components/hackathon/HackathonHero";
import HackathonAbout from "@/components/hackathon/HackathonAbout";
import HackathonPillars from "@/components/hackathon/HackathonPillars";
import HackathonChallenges from "@/components/hackathon/HackathonChallenges";
import HackathonBuildRules from "@/components/hackathon/HackathonBuildRules";
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

      {/* Main Page Content */}
      <main id="main-content">
        {/* Hero Section & Real-time Telemetry Countdown */}
        <HackathonHero onOpenRegister={handleOpenRegister} />

        {/* Section 01: About Overview */}
        <HackathonAbout />

        {/* Section 02: What You'll Do */}
        <HackathonPillars />

        {/* Section 03: The Challenge & Tech Stack Policy */}
        <HackathonChallenges />

        {/* Section 04: The Build Stages */}
        <HackathonBuildRules />

        {/* Section 05: 24-Hour Timeline */}
        <HackathonTimeline />

        {/* Section 06: Prize Pool (₹50,000 Total Prize Pool) */}
        <HackathonPrizes />

        {/* Section 07: Collaborations & Institutional Profiles */}
        <HackathonCollaborations />

        {/* Section 08: Eligibility & Participation Guidelines */}
        <HackathonEligibility />

        {/* Section 09: Venue & Directions */}
        <HackathonVenue />

        {/* Section 10: FAQ */}
        <HackathonFaq />

        {/* Section 11: Final Call to Action */}
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