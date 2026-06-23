import Navbar from "@/components/Navbar";
import InnovationHero from "@/components/InnovationHero";
import InnovationAbout from "@/components/InnovationAbout";
import InnovationWhy from "@/components/InnovationWhy";
import InnovationTracks from "@/components/InnovationTracks";
import InnovationTimeline from "@/components/InnovationTimeline";
import InnovationFees from "@/components/InnovationFees";
import InnovationFaq from "@/components/InnovationFaq";
import InnovationFooter from "@/components/InnovationFooter";
import MouseGlow from "@/components/MouseGlow";

export default function InnovationChallengePage() {
  return (
    <div className="bg-transparent text-foreground min-h-screen relative overflow-hidden">
      <MouseGlow />
      <Navbar />
      <main className="min-h-screen pt-11">
        <InnovationHero />
        <InnovationAbout />
        <InnovationWhy />
        <InnovationTracks />
        <InnovationTimeline />
        <InnovationFees />
        <InnovationFaq />
      </main>
      <InnovationFooter />
    </div>
  );
}
