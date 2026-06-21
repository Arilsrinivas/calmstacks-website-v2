"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Users, ArrowRight, UserCheck, AlertCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url";
  required: boolean;
}

interface HackathonConfig {
  id: string;
  name: string;
  registrationFee: number;
  active: boolean;
  fields: FieldConfig[];
}

export default function InnovationRegister() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [hackathon, setHackathon] = useState<HackathonConfig | null>(null);
  const [cashfreeEnv, setCashfreeEnv] = useState<"sandbox" | "production">("sandbox");
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [teamSize, setTeamSize] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [members, setMembers] = useState<any[]>([{}]);

  // Fetch active hackathon details
  useEffect(() => {
    async function fetchActiveHackathon() {
      try {
        const response = await fetch("/api/hackathon/active");
        const data = await response.json();
        if (data.success) {
          setHackathon(data.hackathon);
          setCashfreeEnv(data.cashfreeEnv);
        } else {
          setError("Could not load hackathon configuration.");
        }
      } catch (err) {
        console.error("Error loading hackathon settings:", err);
        setError("Error loading hackathon configuration.");
      } finally {
        setLoading(false);
      }
    }
    fetchActiveHackathon();
  }, []);

  // Update members array when team size changes
  const handleTeamSizeChange = (size: number) => {
    setTeamSize(size);
    setMembers((prev) => {
      const updated = [...prev];
      if (updated.length < size) {
        while (updated.length < size) {
          updated.push({});
        }
      } else if (updated.length > size) {
        updated.splice(size);
      }
      return updated;
    });
    // Reset active tab to first member
    setActiveTab(0);
  };

  const handleMemberChange = (memberIndex: number, fieldName: string, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[memberIndex] = {
        ...updated[memberIndex],
        [fieldName]: value,
      };
      return updated;
    });
  };

  // Check if a member has filled all required fields
  const isMemberValid = (memberIndex: number) => {
    if (!hackathon) return false;
    const member = members[memberIndex] || {};
    return hackathon.fields.every((field) => {
      if (!field.required) return true;
      return member[field.name] && member[field.name].toString().trim() !== "";
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hackathon) return;

    setError("");
    setRegistering(true);

    // 1. Perform client side validation across all members
    for (let i = 0; i < teamSize; i++) {
      if (!isMemberValid(i)) {
        setError(`Please fill in all required fields for Member ${i + 1}.`);
        setActiveTab(i);
        setRegistering(false);
        return;
      }
    }

    try {
      // 2. Call register API
      const registerRes = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamSize,
          members,
          hackathonId: hackathon.id,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || "Failed to submit registration.");
        setRegistering(false);
        return;
      }

      const { paymentSessionId, orderId } = registerData;

      // 3. Import Cashfree dynamically to avoid SSR issues
      const { load } = await import("@cashfreepayments/cashfree-js");
      const cashfree = await load({ mode: cashfreeEnv });

      setSuccess("Registration details saved. Redirecting to payment gateway...");

      // 4. Initiate Cashfree checkout
      await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      setError(err?.message || "An error occurred while connecting to Cashfree. Please try again.");
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-text-secondary">Loading registration details...</span>
      </div>
    );
  }

  const fee = hackathon?.registrationFee || 100;
  const totalAmount = fee * teamSize;

  return (
    <section ref={ref} id="register" className="register-section py-24 relative bg-transparent">
      <div className="max-w-[700px] mx-auto px-6">
        <div className="section-divider mb-16" />

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            REGISTRATION
          </span>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-4">
            {hackathon?.name || "Internship Hackathon 2026"}
          </h3>
          <p className="text-base text-text-secondary leading-relaxed max-w-lg mx-auto">
            Choose your team size and fill in participant details to secure your spot.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="card glass-card p-6 md:p-8 border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl relative overflow-hidden"
        >
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-3">Redirecting to Checkout</h4>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto mb-6">
                {success}
              </p>
              <div className="flex justify-center items-center gap-2 text-xs text-text-muted">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Redirecting you securely to Cashfree...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">{error}</p>
                </div>
              )}

              {/* Team Size Selector */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                  Select Team Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 4].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleTeamSizeChange(size)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        teamSize === size
                          ? "border-primary bg-primary/10 text-white"
                          : "border-border-subtle bg-surface/5 text-text-secondary hover:text-white"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>
                        {size === 1 ? "1 Member" : `${size} Members`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Member Tabs for Multi-member Teams */}
              {teamSize > 1 && (
                <div className="flex border-b border-border-subtle/50 mb-4 overflow-x-auto scrollbar-none gap-2 py-1">
                  {Array.from({ length: teamSize }).map((_, idx) => {
                    const isValid = isMemberValid(idx);
                    const isActive = activeTab === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "border-primary text-white"
                            : "border-transparent text-text-secondary hover:text-white"
                        }`}
                      >
                        <span>{idx === 0 ? "Leader (M1)" : `Member ${idx + 1}`}</span>
                        {isValid ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Dynamic Member Input Form */}
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    {teamSize > 1
                      ? `Member ${activeTab + 1} Details`
                      : "Participant Details"}
                  </h4>
                  {teamSize > 1 && activeTab < teamSize - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveTab((prev) => prev + 1)}
                      className="text-xs text-primary font-medium hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Member</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {hackathon?.fields.map((field) => {
                  const val = members[activeTab]?.[field.name] || "";
                  return (
                    <div key={field.name}>
                      <label
                        htmlFor={`field-${field.name}-${activeTab}`}
                        className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2"
                      >
                        {field.label} {field.required && <span className="text-primary">*</span>}
                      </label>
                      <input
                        id={`field-${field.name}-${activeTab}`}
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={val}
                        onChange={(e) =>
                          handleMemberChange(activeTab, field.name, e.target.value)
                        }
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Order breakdown */}
              <div className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 text-text-secondary">
                  <UserCheck className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-medium">
                    ₹{fee} per participant x {teamSize}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                    TOTAL FEE
                  </span>
                  <span className="text-lg font-bold text-white">₹{totalAmount}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={registering}
                className="w-full btn-primary justify-center disabled:opacity-50 mt-2 cursor-pointer"
              >
                {registering ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>Pay ₹{totalAmount} & Register</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
