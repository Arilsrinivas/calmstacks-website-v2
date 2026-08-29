import type { Metadata } from "next";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

export const metadata: Metadata = {
  title: `${HACKATHON_CONFIG.meta.name} | MCE Hassan — ${HACKATHON_CONFIG.meta.tagline}`,
  description: `${HACKATHON_CONFIG.hero.description} Hosted at ${HACKATHON_CONFIG.meta.venue}, ${HACKATHON_CONFIG.meta.city}. Part of the ${HACKATHON_CONFIG.meta.series}.`,
  keywords: [
    "hackathon",
    "Calmstacks hackathon",
    "24 hour hackathon",
    "Malnad College of Engineering",
    "MCE Hassan",
    "CSE Student Development Series",
    "coding competition",
    "software engineering",
    "offline hackathon",
  ],
  openGraph: {
    title: `${HACKATHON_CONFIG.meta.name} — ${HACKATHON_CONFIG.meta.tagline}`,
    description: HACKATHON_CONFIG.hero.description,
    type: "website",
    url: "https://calmstacks.com/hackathon",
  },
};

export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
