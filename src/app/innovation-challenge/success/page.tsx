"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import InnovationFooter from "@/components/InnovationFooter";
import MouseGlow from "@/components/MouseGlow";
import { CheckCircle2, Loader2, Users, AlertTriangle, Mail, Calendar, HelpCircle, ArrowRight, ShieldCheck, Hourglass } from "lucide-react";
import Link from "next/link";

interface Member {
  fullName: string;
  email: string;
  phone: string;
  college: string;
}

interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  degree?: string;
  year_of_study: string;
  team_name: string;
  team_size: number;
  github?: string;
  linkedin?: string;
  motivation: string;
  payment_id?: string;
  payment_status: "PENDING_VERIFICATION" | "SUCCESS" | "FAILED";
  team_members: Member[];
  screenshot_path: string;
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const regId = resolvedSearchParams.registration_id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"PENDING_VERIFICATION" | "SUCCESS" | "FAILED">("PENDING_VERIFICATION");
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    if (!regId) {
      setLoading(false);
      return;
    }

    let intervalId: NodeJS.Timeout;

    async function checkStatus() {
      try {
        const response = await fetch(`/api/registrations/status?registration_id=${regId}`);
        const data = await response.json();

        if (response.ok && data.status) {
          setStatus(data.status);
          setRegistration(data.registration);

          // Stop polling if status changes to SUCCESS or FAILED
          if (data.status === "SUCCESS" || data.status === "FAILED") {
            setLoading(false);
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        console.error("Error polling registration status:", err);
      }
    }

    // Call immediately
    checkStatus();

    // Poll every 5 seconds since manual verification takes time
    intervalId = setInterval(checkStatus, 5000);

    return () => clearInterval(intervalId);
  }, [regId]);

  // Handle case where regId is missing
  if (!regId) {
    return (
      <div className="bg-transparent text-foreground min-h-screen relative overflow-hidden flex flex-col justify-between">
        <MouseGlow />
        <Navbar />
        <main className="flex-grow pt-32 pb-24 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center px-6">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Registration Session Missing</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              It looks like you reached this page without a valid registration session. If you just registered, please wait for email updates.
            </p>
            <Link href="/innovation-challenge" className="btn-primary inline-flex items-center gap-2">
              Back to Hackathon
            </Link>
          </div>
        </main>
        <InnovationFooter />
      </div>
    );
  }

  const fee = 100; // default fee
  const totalPaid = registration ? fee * registration.team_size : fee;

  return (
    <div className="bg-transparent text-foreground min-h-screen relative overflow-hidden flex flex-col justify-between">
      <MouseGlow />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[750px] mx-auto px-6">
          
          {status === "PENDING_VERIFICATION" && registration ? (
            /* Pending Manual Verification State */
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-400">
                  <Hourglass className="w-8 h-8 animate-spin" style={{ animationDuration: "3s" }} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                  Registration Submitted
                </h2>
                <p className="text-sm text-amber-400 font-medium">
                  Payment Under Verification • ₹{totalPaid}
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-6">
                <div className="border-b border-border-subtle/50 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                      REGISTRATION ID
                    </span>
                    <span className="text-base font-bold text-white font-mono">{registration.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block sm:text-right">
                      SUBMISSION TIMESTAMP
                    </span>
                    <span className="text-xs text-text-secondary font-medium block sm:text-right">
                      {new Date(registration.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-border-subtle/30 pb-4 text-xs">
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Team Name</span>
                    <span className="text-sm font-semibold text-white">{registration.team_name}</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Team Size</span>
                    <span className="text-sm font-semibold text-white">{registration.team_size} {registration.team_size === 1 ? "Participant" : "Participants"}</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Verification Screenshot</span>
                    <span className="text-amber-400 font-medium block">Uploaded successfully</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Approval Status</span>
                    <span className="text-amber-400 font-bold uppercase">PENDING REVIEW</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-text-secondary leading-relaxed">
                  Our organization team is manually verifying your payment screenshot. You will receive a confirmation email at <strong className="text-white">{registration.email}</strong> once your spot is approved (usually within 2-4 hours).
                </div>
              </div>

              {/* Instructions */}
              <div className="card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-6">
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span>Next Steps</span>
                </h4>
                
                <ul className="space-y-4 text-xs text-text-secondary leading-relaxed">
                  <li className="flex gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Organizer Notification Sent</strong>
                      We have notified the organizers at <span className="text-white font-medium">arilsrinivas8@gmail.com</span> with your details and screenshot. Once verified, we will email your confirmation.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Whitelist Emails</strong>
                      Ensure you whitelist emails from <span className="text-primary font-medium">@calmstacks.com</span> so your onboarding pass doesn't land in spam.
                    </div>
                  </li>
                </ul>

                <div className="border-t border-border-subtle/50 pt-6 flex justify-end">
                  <Link href="/" className="btn-primary items-center gap-2 text-xs">
                    <span>Back to Homepage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : status === "SUCCESS" && registration ? (
            /* Registration Verified & Confirmed State */
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                  Registration Successful
                </h2>
                <p className="text-sm text-text-muted">
                  Confirmation Email Sent to <span className="text-primary font-semibold">{registration.email}</span>
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-6">
                <div className="border-b border-border-subtle/50 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                      REGISTRATION ID
                    </span>
                    <span className="text-base font-bold text-white font-mono">{registration.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block sm:text-right">
                      REGISTRATION DATE
                    </span>
                    <span className="text-xs text-text-secondary font-medium block sm:text-right">
                      {new Date(registration.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Team Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-border-subtle/30 pb-4 text-xs">
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Team Name</span>
                    <span className="text-sm font-semibold text-white">{registration.team_name}</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Team Size</span>
                    <span className="text-sm font-semibold text-white">{registration.team_size} {registration.team_size === 1 ? "Participant" : "Participants"}</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Payment Status</span>
                    <span className="text-emerald-400 font-bold uppercase">SUCCESS / Confirmed</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-wider block mb-0.5">Verification ID</span>
                    <span className="text-white font-mono">{registration.payment_id || "VERIFIED"}</span>
                  </div>
                </div>

                {/* Members list */}
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Registered Members</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex flex-col sm:flex-row sm:justify-between gap-3 text-xs">
                      <div>
                        <p className="font-bold text-white mb-1">
                          {registration.full_name} <span className="text-primary text-[10px] ml-1">(Team Leader)</span>
                        </p>
                        <p className="text-text-secondary">{registration.college}</p>
                        {registration.degree && <p className="text-text-muted">{registration.degree} • Year {registration.year_of_study}</p>}
                      </div>
                      <div className="sm:text-right flex flex-col justify-center">
                        <p className="text-text-secondary">{registration.email}</p>
                        <p className="text-text-secondary font-mono">{registration.phone}</p>
                      </div>
                    </div>

                    {registration.team_members && registration.team_members.map((member, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex flex-col sm:flex-row sm:justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-white mb-1">
                            {member.fullName} <span className="text-text-muted text-[10px] ml-1">(Member {idx + 2})</span>
                          </p>
                          <p className="text-text-secondary">{member.college}</p>
                        </div>
                        <div className="sm:text-right flex flex-col justify-center">
                          <p className="text-text-secondary">{member.email}</p>
                          <p className="text-text-secondary font-mono">{member.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-6">
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Onboarding Instructions</span>
                </h4>
                
                <ul className="space-y-4 text-xs text-text-secondary leading-relaxed">
                  <li className="flex gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Confirmation Email Sent</strong>
                      We have sent the confirmation pass to the Team Leader at <span className="text-white font-medium">{registration.email}</span>. Please verify your spam folder if you do not receive it.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Onboarding Channels & Discord</strong>
                      Check the leader email to join our Discord server. Make sure all members join to coordinate during mentorship webinars.
                    </div>
                  </li>
                </ul>

                <div className="border-t border-border-subtle/50 pt-6 flex justify-end">
                  <Link href="/" className="btn-primary items-center gap-2 text-xs">
                    <span>Back to Home</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Verification Rejected/Failed State */
            <div className="text-center py-16 card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Verification Failed</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto mb-6">
                We could not verify your payment screenshot for Registration ID: <span className="font-mono text-white">{regId}</span>. Please check if you uploaded the correct payment receipt. If you paid and were rejected in error, please contact the organizers at <a href="mailto:arilsrinivas8@gmail.com" className="text-primary hover:underline">arilsrinivas8@gmail.com</a>.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/innovation-challenge#register" className="btn-primary text-xs">
                  Register Again
                </Link>
                <Link href="/" className="border border-border-subtle hover:bg-surface text-text-primary px-5 py-2.5 rounded-full transition-colors text-xs">
                  Go Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <InnovationFooter />
    </div>
  );
}
