"use client";

import { useEffect, useState } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Terminal,
  Utensils,
  IndianRupee,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Users,
  UserPlus,
  Trash2,
  User,
} from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathonConfig";

interface HackathonRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  name: string;
  usn: string;
  email: string;
  phone: string;
}

export default function HackathonRegisterModal({
  isOpen,
  onClose,
}: HackathonRegisterModalProps) {
  const [step, setStep] = useState<"details" | "payment">("details");

  // Team Lead Details
  const [formData, setFormData] = useState({
    fullName: "",
    usn: "",
    email: "",
    phone: "",
    yearSemester: "3rd Year (5th Sem)",
    teamName: "",
    teamSize: "Team of 4 Members (₹1,200 total)",
    trackPreference: "Spontaneous (Revealed On-Spot)",
    projectIdea: "",
  });

  // Additional Team Members (Member 2, Member 3, Member 4)
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", usn: "", email: "", phone: "" },
    { name: "", usn: "", email: "", phone: "" },
    { name: "", usn: "", email: "", phone: "" },
  ]);

  const [transactionId, setTransactionId] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Total members count = 1 (Lead) + additional members
  const totalMemberCount = 1 + members.length;
  const feeAmount = totalMemberCount * 300;

  // Sync teamSize dropdown change with members array
  const handleTeamSizeChange = (val: string) => {
    setFormData((prev) => ({ ...prev, teamSize: val }));
    if (val.includes("3")) {
      // 3 members = 1 lead + 2 additional
      setMembers((prev) => {
        const next = [...prev];
        while (next.length < 2) next.push({ name: "", usn: "", email: "", phone: "" });
        return next.slice(0, 2);
      });
    } else if (val.includes("Solo")) {
      // Solo
      setMembers([]);
    } else {
      // 4 members = 1 lead + 3 additional
      setMembers((prev) => {
        const next = [...prev];
        while (next.length < 3) next.push({ name: "", usn: "", email: "", phone: "" });
        return next.slice(0, 3);
      });
    }
  };

  // Add another team member
  const handleAddMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: "", usn: "", email: "", phone: "" }]);
      const newTotal = members.length + 2;
      setFormData((prev) => ({
        ...prev,
        teamSize: `Team of ${newTotal} Members (₹${newTotal * 300} total)`,
      }));
    }
  };

  // Remove a team member
  const handleRemoveMember = (indexToRemove: number) => {
    const updated = members.filter((_, idx) => idx !== indexToRemove);
    setMembers(updated);
    const newTotal = updated.length + 1;
    setFormData((prev) => ({
      ...prev,
      teamSize:
        newTotal === 1
          ? "Solo / Partial Builder (₹300 fee)"
          : `Team of ${newTotal} Members (₹${newTotal * 300} total)`,
    }));
  };

  // Update specific member field
  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

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

  // Step 1: Proceed to Payment verification
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate Team Lead
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter the Team Lead's full name.");
      return;
    }
    if (!formData.usn.trim()) {
      setErrorMessage("Please enter the Team Lead's USN / Student ID.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter a contact phone / WhatsApp number.");
      return;
    }
    if (!formData.teamName.trim()) {
      setErrorMessage("Please enter your Team Name.");
      return;
    }

    // Validate Additional Members
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.name.trim()) {
        setErrorMessage(`Please enter the Full Name for Member ${i + 2}.`);
        return;
      }
      if (!m.usn.trim()) {
        setErrorMessage(`Please enter the USN for Member ${i + 2}.`);
        return;
      }
    }

    setStep("payment");
  };

  // Step 2: Confirm Payment and Push to Google Sheets
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!transactionId.trim()) {
      setErrorMessage("Please enter the 12-digit UPI Reference ID / UTR from your payment app.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/hackathon/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          members,
          paymentStatus: "PAID",
          paymentAmount: `₹${feeAmount}`,
          transactionId: transactionId.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit registration. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to complete registration. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUpi = () => {
    const upi = HACKATHON_CONFIG.payment?.upiId || "arilsrinivas8@okhdfcbank";
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(upi);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setStep("details");
    setErrorMessage("");
    setTransactionId("");
    setFormData({
      fullName: "",
      usn: "",
      email: "",
      phone: "",
      yearSemester: "3rd Year (5th Sem)",
      teamName: "",
      teamSize: "Team of 4 Members (₹1,200 total)",
      trackPreference: "Spontaneous (Revealed On-Spot)",
      projectIdea: "",
    });
    setMembers([
      { name: "", usn: "", email: "", phone: "" },
      { name: "", usn: "", email: "", phone: "" },
      { name: "", usn: "", email: "", phone: "" },
    ]);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-up"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0d0d10] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 sm:my-8">
        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-cyan-400 to-primary" />

        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] uppercase tracking-wider text-primary">
              <Terminal className="w-3.5 h-3.5" />
              <span>
                {isSuccess
                  ? "CONFIRMATION // COMPLETE"
                  : step === "details"
                  ? `STEP 1 OF 2 // TEAM ROSTER (${totalMemberCount} MEMBERS)`
                  : "STEP 2 OF 2 // UPI SCANNER & PAYMENT"}
              </span>
            </div>
            <h2
              id="modal-headline"
              className="text-xl sm:text-2xl font-bold tracking-tight text-white"
            >
              {isSuccess
                ? "Registration & Payment Confirmed"
                : step === "details"
                ? "Register Team & Add Members"
                : "Scan QR & Complete Payment"}
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Central Library, Malnad College • 25–26 September 2026 (Starts 2:00 PM)
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

        {/* Stepper Pill Indicator */}
        {!isSuccess && (
          <div className="px-5 sm:px-7 pt-3.5 pb-2 border-b border-white/[0.06] bg-white/[0.01]">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
              <div
                className={`flex items-center gap-1.5 ${
                  step === "details" ? "text-primary font-semibold" : "text-emerald-400"
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {step === "payment" ? "✓" : "1"}
                </span>
                <span>1. Team Roster ({totalMemberCount} Members)</span>
              </div>
              <div className="h-[1px] flex-1 mx-3 bg-white/10" />
              <div
                className={`flex items-center gap-1.5 ${
                  step === "payment" ? "text-primary font-semibold" : "text-text-muted"
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>2. UPI Scanner (₹{feeAmount})</span>
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Team Registration Confirmed!
              </h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Payment of <span className="text-emerald-400 font-semibold">₹{feeAmount}</span> for team <span className="text-white font-medium">{formData.teamName}</span> ({totalMemberCount} members) has been logged and pushed to Google Sheets.
              </p>

              {/* Receipt Box */}
              <div className="max-w-lg mx-auto p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left font-mono text-xs space-y-2.5">
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">TEAM NAME</span>
                  <span className="text-white font-medium">{formData.teamName}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">TOTAL MEMBERS</span>
                  <span className="text-white font-medium">{totalMemberCount} Members</span>
                </div>
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <span className="text-text-muted block text-[10px] uppercase">REGISTERED ROSTER:</span>
                  <div className="text-white flex items-center gap-1.5">
                    <span className="text-primary font-semibold">Lead:</span>
                    <span>{formData.fullName} ({formData.usn})</span>
                  </div>
                  {members.map((m, idx) => (
                    <div key={idx} className="text-text-secondary flex items-center gap-1.5 pl-2">
                      <span className="text-text-muted">M{idx + 2}:</span>
                      <span>{m.name} ({m.usn})</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-text-secondary pt-2 border-t border-white/10">
                  <span className="text-text-muted">PAYMENT STATUS</span>
                  <span className="text-emerald-400 font-semibold">PAID (₹{feeAmount})</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">TRANSACTION ID / UTR</span>
                  <span className="text-cyan-400 font-medium break-all">{transactionId}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary pt-1 border-t border-white/10">
                  <span className="text-text-muted">REPORTING TIME</span>
                  <span className="text-white">01:00 PM • 25 SEPT 2026 (MCE Library)</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-primary justify-center text-sm py-2.5 px-8"
                >
                  Done
                </button>
              </div>
            </div>
          ) : step === "details" ? (
            /* STEP 1: FORM DETAILS */
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Context Callout */}
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs">
                <div className="flex items-center justify-between text-primary font-mono font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>24H SPRINT ENTRY DETAILS</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-sm">
                    Total: ₹{feeAmount} ({totalMemberCount} × ₹300)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-secondary font-light pt-2">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span>₹300 per member • 3 to 4 members per team</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-primary" />
                    <span>All Meals, Drinks & Snacks Included</span>
                  </div>
                </div>
              </div>

              {/* Team Basics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
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
                    Team Size Selection *
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => handleTeamSizeChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141418] border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Team of 4 Members (₹1,200 total)">
                      Team of 4 Members (₹1,200 total fee)
                    </option>
                    <option value="Team of 3 Members (₹900 total)">
                      Team of 3 Members (₹900 total fee)
                    </option>
                    <option value="Solo / Partial Builder (Find teammate at check-in)">
                      Solo / Partial (₹300 fee)
                    </option>
                  </select>
                </div>
              </div>

              {/* SECTION: TEAM LEAD */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                    <User className="w-3.5 h-3.5" />
                    <span>MEMBER 1 • TEAM LEAD</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted uppercase">Primary Contact</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aril Srinivas"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                      USN / Student ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 4MC23CS001"
                      value={formData.usn}
                      onChange={(e) =>
                        setFormData({ ...formData, usn: e.target.value.toUpperCase() })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors uppercase font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@mcehassan.ac.in"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99645 36009"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                    Current Semester / Year *
                  </label>
                  <select
                    value={formData.yearSemester}
                    onChange={(e) =>
                      setFormData({ ...formData, yearSemester: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#141418] border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="1st Year (1st/2nd Sem)">1st Year (1st/2nd Sem)</option>
                    <option value="2nd Year (3rd/4th Sem)">2nd Year (3rd/4th Sem)</option>
                    <option value="3rd Year (5th/6th Sem)">3rd Year (5th/6th Sem)</option>
                    <option value="4th Year (7th/8th Sem)">4th Year (7th/8th Sem)</option>
                  </select>
                </div>
              </div>

              {/* SECTION: ADDITIONAL TEAM MEMBERS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white uppercase font-semibold">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>ADDITIONAL TEAM MEMBERS ({members.length})</span>
                  </div>
                  {members.length < 3 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:text-cyan-300 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Add Member {members.length + 2}</span>
                    </button>
                  )}
                </div>

                {members.length === 0 ? (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/15 text-center text-xs text-text-muted">
                    <span>Solo builder mode. You can form or join a team during on-campus check-in.</span>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-primary text-xs font-mono transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add Team Member 2</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  members.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-medium">
                          <span>MEMBER {idx + 2} DETAILS</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-text-muted hover:text-red-400 p-1 rounded transition-colors text-xs flex items-center gap-1 font-mono"
                          title={`Remove Member ${idx + 2}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[10px]">Remove</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                            Member {idx + 2} Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={`e.g. Teammate ${idx + 2} Name`}
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(idx, "name", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                            Member {idx + 2} USN / Student ID *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 4MC23CS002"
                            value={member.usn}
                            onChange={(e) =>
                              handleMemberChange(idx, "usn", e.target.value.toUpperCase())
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors uppercase font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="teammate@mcehassan.ac.in"
                            value={member.email}
                            onChange={(e) =>
                              handleMemberChange(idx, "email", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-1">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={member.phone}
                            onChange={(e) =>
                              handleMemberChange(idx, "phone", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {members.length < 3 && members.length > 0 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-primary/50 text-text-secondary hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors bg-white/[0.01] hover:bg-white/[0.03]"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-primary" />
                    <span>+ Add Member {members.length + 2} (Up to 4 members)</span>
                  </button>
                )}
              </div>

              {/* Primary Tech Stack / Skills */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary">
                    Primary Tech Stack / Skills (Optional)
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">100% SPONTANEOUS</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="e.g. Next.js, Python, Flutter, Node.js, AI/ML APIs, UI/UX Design..."
                  value={formData.projectIdea}
                  onChange={(e) =>
                    setFormData({ ...formData, projectIdea: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Next Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>PROCEED TO PAYMENT (₹{feeAmount})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-text-muted text-center font-mono">
                {totalMemberCount} members registered • ₹300 per member • All meals & certificates included
              </p>
            </form>
          ) : (
            /* STEP 2: UPI SCANNER & PAYMENT */
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              {/* Order Summary Pill */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-text-muted block font-mono text-[10px]">REGISTERING TEAM</span>
                  <span className="text-white font-semibold text-sm">{formData.teamName}</span>
                  <span className="text-text-muted block font-mono text-[10px] truncate max-w-xs">
                    {totalMemberCount} Members: {formData.fullName}
                    {members.length > 0 && `, ${members.map((m, idx) => m.name || `M${idx + 2}`).join(", ")}`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-text-muted block font-mono text-[10px]">TOTAL AMOUNT</span>
                  <span className="text-emerald-400 font-bold text-base font-mono">₹{feeAmount}</span>
                </div>
              </div>

              {/* QR Scanner Display Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 font-medium">
                  <QrCode className="w-4 h-4" />
                  <span>SCAN TO PAY VIA ANY UPI APP</span>
                </div>

                {/* QR Code Container */}
                <div className="inline-block p-3 rounded-2xl bg-white shadow-2xl mx-auto border-2 border-white/30">
                  <img
                    src="/assets/payment_qr.jpg"
                    alt="UPI Payment QR Code - Aril Srinivas"
                    className="w-52 h-auto rounded-xl object-contain mx-auto"
                  />
                </div>

                {/* Payee Details & UPI Copy Box */}
                <div className="space-y-2 pt-1 max-w-sm mx-auto">
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
                    <div className="text-left overflow-hidden">
                      <span className="text-text-muted block text-[10px]">PAYEE: ARIL SRINIVAS</span>
                      <span className="text-white font-medium truncate block">
                        arilsrinivas8@okhdfcbank
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="ml-2 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-text-secondary hover:text-white transition-colors flex items-center gap-1 text-[11px] shrink-0"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-text-muted font-light">
                    Supported on Google Pay, PhonePe, Paytm, BHIM & all UPI banking apps.
                  </p>
                </div>
              </div>

              {/* Transaction ID / UTR Input */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary">
                  UPI Reference No. / 12-Digit UTR *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 423891029381 or Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                />
                <p className="text-[11px] text-text-muted">
                  Check your payment successful receipt in GPay / PhonePe / Paytm for the 12-digit UTR number.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setStep("details");
                  }}
                  className="py-3 px-4 rounded-full border border-white/15 hover:bg-white/5 text-text-secondary hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !transactionId.trim()}
                  className="flex-1 py-3 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying & Recording...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>CONFIRM PAYMENT & SUBMIT</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-text-muted text-center font-mono">
                Once submitted, your team roster and payment UTR are instantly pushed to Google Sheets.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
