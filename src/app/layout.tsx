import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CalmStacks — Engineering Intelligent Systems",
  description:
    "CalmStacks builds AI-powered applications and multi-agent software engineering systems that transform complex ideas into reliable digital products. Engineering intelligent systems. Building what comes next.",
  keywords: [
    "AI software engineering",
    "multi-agent systems",
    "Agent Factory",
    "autonomous software agents",
    "custom software development",
    "intelligent automation",
    "AI applications",
    "production engineering",
    "LegalConnect",
    "CalmStacks",
  ],
  icons: {
    icon: "/assets/calmstacks_memorable_logo.svg",
    apple: "/assets/calmstacks_memorable_logo.svg",
  },
  openGraph: {
    title: "CalmStacks — Engineering Intelligent Systems",
    description:
      "CalmStacks builds AI-powered applications and multi-agent software engineering systems that transform complex ideas into reliable digital products.",
    type: "website",
    url: "https://calmstacks.co.in",
    siteName: "CalmStacks",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalmStacks — Engineering Intelligent Systems",
    description:
      "CalmStacks builds AI-powered applications and multi-agent software engineering systems that transform complex ideas into reliable digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body className="antialiased selection:bg-[#208374]/20 selection:text-[#1A1814] bg-[#FAF9F8] text-[#1A1814]">
        {children}
      </body>
    </html>
  );
}
