"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Search,
  ShieldCheck,
  FileArchive,
  Sparkles,
  Users,
  Trophy,
} from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";
import participantsData from "@/config/hackathonParticipants.json";

interface Participant {
  num: string;
  team: string;
  member: string;
  name: string;
  file: string;
}

export default function HackathonCompleted() {
  const [searchQuery, setSearchQuery] = useState("");
  const zipDownloadUrl = "/certificates/CalmStacks_24Hour_Hackathon_All_Certificates.zip";

  const participants: Participant[] = participantsData as Participant[];

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants;
    const query = searchQuery.toLowerCase().trim();
    return participants.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.team.toLowerCase().includes(query) ||
        p.num.includes(query)
    );
  }, [searchQuery, participants]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
              title="Return to Calmstacks home"
            >
              <img
                src="/assets/calmstacks_logo_white.svg"
                alt="Calmstacks Logo"
                className="h-6 w-auto"
              />
              <span className="text-sm font-bold tracking-tight text-white uppercase font-mono">
                {HACKATHON_CONFIG.meta.organizer}
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/15">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                EVENT CONCLUDED // 25–26 SEPT 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 font-mono text-xs text-text-muted hover:text-white transition-colors"
            >
              <span>MAIN SITE</span>
            </Link>

            <a
              href={zipDownloadUrl}
              download="CalmStacks_24Hour_Hackathon_All_Certificates.zip"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20 hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD CERTIFICATES (.ZIP)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section: Completion Announcement */}
      <section className="relative pt-32 sm:pt-40 pb-20 border-b border-white/10 overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold tracking-widest uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>CALMSTACKS 24H HACKATHON • SUCCESSFULLY COMPLETED</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase font-mono leading-[1.05]">
              THANK YOU, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-primary">
                BUILDERS & MENTORS.
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-text-secondary font-light leading-relaxed">
              The CalmStacks 24-Hour Hackathon at Malnad College of Engineering, Hassan has officially concluded. Across 24 intensive hours, 76 teams and 250 participants engineered AI-driven solutions for digital evidence reconstruction and intelligent data recovery.
            </p>
          </div>

          {/* Key Milestones Ribbon */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-text-muted">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>24 CONSECUTIVE HOURS</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span>250 PARTICIPANTS • 76 TEAMS</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>25–26 SEPTEMBER 2026</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>MCE HASSAN, KARNATAKA</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>₹50,000 PRIZE POOL & INTERNSHIPS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Section: Certificates Download */}
      <section id="certificates" className="py-20 sm:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Download Card */}
          <div className="relative rounded-3xl border border-white/20 bg-gradient-to-b from-[#121217] via-[#0d0d10] to-[#08080a] p-8 sm:p-14 shadow-2xl overflow-hidden text-center space-y-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary shadow-inner">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="font-mono text-xs text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL VERIFIED RECOGNITION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-mono tracking-tight">
                PARTICIPATION CERTIFICATES
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Official certificates of participation for all 250 registered builders and teams have been verified, signed by the organizers & faculty coordinators, and packaged into a high-resolution archive (.ZIP).
              </p>
            </div>

            {/* Big Download Button */}
            <div className="pt-2 flex flex-col items-center justify-center gap-4">
              <a
                href={zipDownloadUrl}
                download="CalmStacks_24Hour_Hackathon_All_Certificates.zip"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-mono text-sm sm:text-base font-bold uppercase tracking-wider shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>DOWNLOAD ALL CERTIFICATES (.ZIP)</span>
              </a>

              <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <FileArchive className="w-3.5 h-3.5 text-primary" />
                  <span>ARCHIVE SIZE: ~74 MB</span>
                </span>
                <span>•</span>
                <span>250 OFFICIAL CERTIFICATES</span>
                <span>•</span>
                <span>HIGH-RESOLUTION JPG</span>
              </div>
            </div>
          </div>

          {/* Participant Directory & Verification List */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                  HONOR ROLL
                </span>
                <h3 className="text-2xl font-bold text-white uppercase font-mono tracking-tight mt-1">
                  OFFICIAL PARTICIPANTS ({participants.length})
                </h3>
                <p className="text-xs text-text-muted font-mono mt-1">
                  Search by your name or team ID (e.g. HACK-044) to verify your participation.
                </p>
              </div>

              {/* Search Filter */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, team (e.g. HACK-001)..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-white/15 bg-white/5 font-mono text-xs text-white placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {filteredParticipants.map((p) => (
                <div
                  key={p.file}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-muted w-7 shrink-0">
                      #{p.num}
                    </span>
                    <div className="space-y-0.5">
                      <div className="font-medium text-sm text-white group-hover:text-primary transition-colors">
                        {p.name}
                      </div>
                      <div className="font-mono text-[10px] text-text-muted uppercase flex items-center gap-1.5">
                        <span className="text-primary font-semibold">{p.team}</span>
                        <span>•</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={zipDownloadUrl}
                    download="CalmStacks_24Hour_Hackathon_All_Certificates.zip"
                    title={`Download certificate bundle for ${p.name}`}
                    className="p-2 rounded-lg border border-white/10 hover:border-primary text-text-muted hover:text-white transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {filteredParticipants.length === 0 && (
              <div className="p-8 rounded-xl border border-white/10 bg-white/[0.02] text-center font-mono text-xs text-text-muted">
                No participant found matching "{searchQuery}".
              </div>
            )}
          </div>

          {/* Event Recap Overview */}
          <div className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-[#08080a] space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                EVENT RECAP
              </span>
              <h3 className="text-2xl font-bold font-mono text-white uppercase">
                THE 24-HOUR CYBERSECURITY & AI CHALLENGE
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <span className="text-primary font-bold">CHALLENGE TRACK: </span>
                <span className="text-white font-medium">
                  AI-Assisted Intelligent Data Recovery and Digital Evidence Reconstruction
                </span>
              </div>
              <p>
                Teams were challenged to design and develop an AI-assisted data recovery solution to reconstruct, classify, and prioritize recoverable digital information from damaged, deleted, or partially corrupted storage data.
              </p>
            </div>

            {/* Collaborators Mention */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-text-muted uppercase">ORGANIZED & CONDUCTED BY</div>
                <div className="text-white font-bold">CALMSTACKS TECHNOLOGIES</div>
              </div>
              <div className="space-y-1">
                <div className="text-text-muted uppercase">INSTITUTIONAL PARTNER</div>
                <div className="text-white font-bold">
                  DEPT. OF COMPUTER SCIENCE & ENGINEERING, MCE HASSAN
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-text-muted uppercase">INDUSTRY COLLABORATOR</div>
                <div className="text-white font-bold">AGAMYA CYBER TECH</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Concluded Footer */}
      <footer className="py-12 bg-[#060608] border-t border-white/10 text-center font-mono text-xs text-text-muted space-y-4">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/assets/calmstacks_logo_white.svg"
            alt="Calmstacks Logo"
            className="h-5 w-auto"
          />
          <span className="text-white font-bold uppercase">CALMSTACKS</span>
        </div>
        <p>
          © 2026 CalmStacks. All rights reserved. • Malnad College of Engineering, Hassan.
        </p>
        <div>
          <Link href="/" className="text-primary hover:underline">
            Return to CalmStacks Home →
          </Link>
        </div>
      </footer>
    </div>
  );
}
