import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Internships — CalmStacks",
  description:
    "Join CalmStacks as an engineering intern. Build autonomous multi-agent systems, intelligent AI platforms, and production-ready software.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
