"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Terminal, Utensils, IndianRupee } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

interface HackathonRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HackathonRegisterModal({
  isOpen,
  onClose,
}: HackathonRegisterModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    usn: "",
    email: "",
    phone: "",
    yearSemester: "3rd Year (5th Sem)",
    teamName: "",
    teamSize: "Team of 4 Members (₹1,200 total)",
    trackPreference: HACKATHON_CONFIG.challenges.tracks[0].id,
    projectIdea: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      usn: "",
      email: "",
      phone: "",
      yearSemester: "3rd Year (5th Sem)",
      teamName: "",
      teamSize: "Team of 4 Members (₹1,200 total)",
      trackPreference: HACKATHON_CONFIG.challenges.tracks[0].id,
      projectIdea: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-up"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#0d0d10] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-cyan-400 to-primary" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-wider text-primary">
              <Terminal className="w-3.5 h-3.5" />
              <span>REGISTRATION // CALMSTACKS 24H</span>
            </div>
            <h2
              id="modal-headline"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Register for the Sprint
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Central Library, Malnad College of Engineering • 25–26 September 2026
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-text-muted hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Registration Confirmed
              </h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Your application for the 24 Hour Hackathon at Malnad College Central Library has been recorded. Check-in protocols and team confirmation details will be sent to{" "}
                <span className="text-primary font-mono">{formData.email}</span>.
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-primary justify-center text-sm py-2.5 px-6"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Context Callout */}
              <div className="space-y-2 p-3.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs">
                <div className="flex items-center gap-2 text-primary font-mono font-semibold">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>24H SPRINT ENTRY DETAILS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-secondary font-light pt-1">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span>₹300 / team member (3-4 members)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-primary" />
                    <span>All Meals, Drinks & Snacks Included</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Full Name (Team Lead) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aril Srinivas"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    College USN / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4MC22CS000"
                    value={formData.usn}
                    onChange={(e) =>
                      setFormData({ ...formData, usn: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm font-mono focus:outline-none focus:border-primary transition-colors uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    College / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@mcehassan.ac.in"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99645 36009"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Academic & Team info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Current Semester / Year *
                  </label>
                  <select
                    value={formData.yearSemester}
                    onChange={(e) =>
                      setFormData({ ...formData, yearSemester: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141418] border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="1st Year (1st/2nd Sem)">1st Year (1st/2nd Sem)</option>
                    <option value="2nd Year (3rd/4th Sem)">2nd Year (3rd/4th Sem)</option>
                    <option value="3rd Year (5th/6th Sem)">3rd Year (5th/6th Sem)</option>
                    <option value="4th Year (7th/8th Sem)">4th Year (7th/8th Sem)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Team Size (3 to 4 Members) *
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({ ...formData, teamSize: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141418] border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Team of 4 Members (₹1,200 total)">Team of 4 Members (₹1,200 total fee)</option>
                    <option value="Team of 3 Members (₹900 total)">Team of 3 Members (₹900 total fee)</option>
                    <option value="Solo / Partial Builder (Find teammate at check-in)">Solo / Partial (Team-up during check-in)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Team Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. StackOverclock"
                    value={formData.teamName}
                    onChange={(e) =>
                      setFormData({ ...formData, teamName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Target Track *
                  </label>
                  <select
                    value={formData.trackPreference}
                    onChange={(e) =>
                      setFormData({ ...formData, trackPreference: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141418] border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    {HACKATHON_CONFIG.challenges.tracks.map((track) => (
                      <option key={track.id} value={track.id}>
                        {track.number} — {track.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                  Brief Project Concept / Tech Stack (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="What problem or technology are you eager to explore during the 24 hours?"
                  value={formData.projectIdea}
                  onChange={(e) =>
                    setFormData({ ...formData, projectIdea: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>CONFIRM REGISTRATION</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-text-muted text-center">
                Registration fee of ₹300 per team member is payable during on-campus check-in at MCE Central Library. Food, refreshments & certificates included.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
