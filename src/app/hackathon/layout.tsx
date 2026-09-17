import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CalmStacks 24 Hour Hackathon 2026 | MCE Hassan",
  description:
    "Join the CalmStacks 24 Hour Hackathon at Malnad College of Engineering, Hassan on 25–26 September 2026. Build, solve and compete for a ₹50,000 prize pool.",
  keywords: [
    "hackathon",
    "CalmStacks hackathon",
    "24 hour hackathon",
    "Malnad College of Engineering",
    "MCE Hassan",
    "Agamya Cyber Tech",
    "CSE Student Development Series",
    "coding competition",
    "software engineering",
    "offline hackathon",
    "₹50,000 prize pool",
  ],
  openGraph: {
    title: "CALMSTACKS 24 HOUR HACKATHON",
    description:
      "24 hours. One build. ₹50,000 prize pool. 25–26 September 2026 at Malnad College of Engineering, Hassan.",
    type: "website",
    url: "https://calmstacks.com/hackathon",
  },
  twitter: {
    card: "summary_large_image",
    title: "CALMSTACKS 24 HOUR HACKATHON",
    description:
      "24 hours. One build. ₹50,000 prize pool. 25–26 September 2026 at Malnad College of Engineering, Hassan.",
  },
};

export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
