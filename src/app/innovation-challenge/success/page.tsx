"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import InnovationFooter from "@/components/InnovationFooter";
import MouseGlow from "@/components/MouseGlow";
import { CheckCircle2, Loader2, Users, AlertTriangle, Mail, Calendar, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Member {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree?: string;
  github?: string;
  linkedin?: string;
}

interface Registration {
  id: string;
  hackathonId: string;
  teamSize: number;
  members: Member[];
  cashfreeOrderId: string;
  cashfreePaymentId?: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  paymentAmount: number;
  registeredAt: string;
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const orderId = resolvedSearchParams.order_id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"PENDING" | "SUCCESS" | "FAILED">("PENDING");
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    let intervalId: NodeJS.Timeout;

    async function checkStatus() {
      try {
        const response = await fetch(`/api/registrations/status?order_id=${orderId}`);
        const data = await response.json();

        if (response.ok && data.status) {
          setStatus(data.status);
          setRegistration(data.registration);

          // Stop polling if status is no longer PENDING
          if (data.status !== "PENDING" || attempts >= 15) {
            setLoading(false);
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        console.error("Error polling registration status:", err);
      }
      setAttempts((prev) => prev + 1);
    }

    // Call immediately
    checkStatus();

    // Poll every 2 seconds
    intervalId = setInterval(checkStatus, 2000);

    return () => clearInterval(intervalId);
  }, [orderId, attempts]);

  // Handle case where orderId is missing
  if (!orderId) {
    return (
      <div className="bg-transparent text-foreground min-h-screen relative overflow-hidden flex flex-col justify-between">
        <MouseGlow />
        <Navbar />
        <main className="flex-grow pt-32 pb-24 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center px-6">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Order ID Missing</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              It looks like you reached this page without a valid registration session. If you just registered, please check your email for confirmation.
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

  return (
    <div className="bg-transparent text-foreground min-h-screen relative overflow-hidden flex flex-col justify-between">
      <MouseGlow />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[750px] mx-auto px-6">
          
          {loading ? (
            /* Polling/Verification State */
            <div className="text-center py-16 card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Verifying Your Payment</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto mb-4">
                We are securing confirmation from the Cashfree payment gateway. This usually takes just a few seconds. Please do not close or reload this page.
              </p>
              <div className="text-xs text-text-muted">
                Transaction Ref: <span className="font-mono text-white">{orderId}</span>
              </div>
            </div>
          ) : status === "SUCCESS" && registration ? (
            /* Payment & Registration Confirmed */
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                  Registration Successful
                </h2>
                <p className="text-base text-emerald-400 font-medium">
                  Payment Confirmed • ₹{registration.paymentAmount}
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
                      REGISTRATION TIMESTAMP
                    </span>
                    <span className="text-xs text-text-secondary font-medium block sm:text-right">
                      {new Date(registration.registeredAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Team Details */}
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Registered Participants ({registration.teamSize})</span>
                  </h4>
                  
                  <div className="space-y-4">
                    {registration.members.map((member, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex flex-col sm:flex-row sm:justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-white mb-1">
                            {member.fullName} {idx === 0 && <span className="text-primary font-semibold text-[10px] ml-1">(Team Leader)</span>}
                          </p>
                          <p className="text-text-secondary">{member.college}</p>
                          {member.degree && <p className="text-text-muted">{member.degree}</p>}
                        </div>
                        <div className="sm:text-right flex flex-col gap-1 justify-center">
                          <p className="text-text-secondary font-medium">{member.email}</p>
                          <p className="text-text-secondary">{member.phone}</p>
                          <div className="flex gap-2 sm:justify-end mt-1">
                            {member.github && (
                              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                GitHub
                              </a>
                            )}
                            {member.github && member.linkedin && <span className="text-text-muted">•</span>}
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm Text */}
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-text-secondary leading-relaxed">
                  Your registration for the <strong className="text-white">CalmStacks Internship Hackathon 2026</strong> has been successfully submitted.
                </div>
              </div>

              {/* Instructions and Future communication */}
              <div className="card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-6">
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span>Important Instructions</span>
                </h4>
                
                <ul className="space-y-4 text-xs text-text-secondary leading-relaxed">
                  <li className="flex gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Confirmation Email Sent</strong>
                      We have sent a detailed confirmation email to the Team Leader at <span className="text-white font-medium">{registration.members[0].email}</span>. Please verify your spam folder if you do not receive it in the next 15 minutes.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Timeline & Submissions</strong>
                      The hackathon kick-off credentials and access link will be emailed to all participants 24 hours before the event starts. Make sure to whitelist domains ending in <span className="text-primary">@calmstacks.com</span>.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Join Community Channels</strong>
                      The team leader email contains the invite link to the CalmStacks Hackathon Discord server. All future communications, mentoring sessions, and submission guidelines will happen there.
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
            /* Payment Failed State */
            <div className="text-center py-16 card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Payment Verification Failed</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto mb-6">
                We could not verify a successful transaction for Order ID: <span className="font-mono text-white">{orderId}</span>. If money was debited, it will be refunded automatically by your bank within 5-7 business days.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/innovation-challenge#register" className="btn-primary text-xs">
                  Try Again
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
