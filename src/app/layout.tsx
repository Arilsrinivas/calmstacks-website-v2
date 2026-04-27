import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";

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
  title: "CalmStacks — Code. Robotics. Innovation.",
  description:
    "CalmStacks builds custom digital products, provides expert programming consultation, and develops cutting-edge robotics & automation solutions. Bring your ideas to life.",
  keywords: [
    "software development",
    "web apps",
    "mobile apps",
    "robotics",
    "automation",
    "programming consultation",
    "custom software",
    "CalmStacks",
  ],
  openGraph: {
    title: "CalmStacks — Code. Robotics. Innovation.",
    description:
      "Building custom digital products, programming solutions, and robotics systems.",
    type: "website",
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
      className={`${inter.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <ParticleBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
