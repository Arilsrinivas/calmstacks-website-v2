"use client";

import { useState } from "react";
import HackathonNav from "@/components/hackathon/HackathonNav";
import HackathonHero from "@/components/hackathon/HackathonHero";
import HackathonAbout from "@/components/hackathon/HackathonAbout";
import HackathonChallenges from "@/components/hackathon/HackathonChallenges";
import HackathonTimeline from "@/components/hackathon/HackathonTimeline";
import HackathonPillars from "@/components/hackathon/HackathonPillars";
import HackathonPrizes from "@/components/hackathon/HackathonPrizes";
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

  const handleSelectTrack = (_trackId: string) => {
    setRegisterModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white relative">
      {/* Event Header Navigation */}
      <HackathonNav onOpenRegister={handleOpenRegister} />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero */}
        <HackathonHero onOpenRegister={handleOpenRegister} />

        {/* Section 2: About The Hackathon */}
        <HackathonAbout />

        {/* Section 3: The Challenge & Tracks */}
        <HackathonChallenges onSelectTrack={handleSelectTrack} />

        {/* Section 4: 24 Hour Timeline */}
        <HackathonTimeline />

        {/* Section 5: Build / Collaborate / Compete Pillars */}
        <HackathonPillars />

        {/* Section 6: Prizes */}
        <HackathonPrizes />

        {/* Section 7: Who Can Participate (Eligibility) */}
        <HackathonEligibility />

        {/* Section 8: Venue (MCE Hassan) */}
        <HackathonVenue />

        {/* Section 9: FAQ */}
        <HackathonFaq />

        {/* Section 10: Final CTA */}
        <HackathonFinalCta onOpenRegister={handleOpenRegister} />
      </main>

      {/* Event Footer */}
      <HackathonFooter />

      {/* Interactive Registration Modal */}
      <HackathonRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
}
