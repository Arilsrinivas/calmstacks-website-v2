"use client";

import { useEffect, useRef, useState } from "react";
import { CreditCard, CheckCircle2, Loader2, Lock, QrCode } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function InnovationRegister() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"gateway" | "qr">("gateway");
  const [utr, setUtr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    // Simulate registration logic and payment gateway redirect
    setTimeout(() => {
      setLoading(false);
      if (paymentMethod === "gateway") {
        setSuccess("Registration details submitted! Redirecting to secure Stripe payment gateway...");
      } else {
        setSuccess(`Registration details submitted successfully! Your payment (UTR: ${utr}) is under verification. We will email your hackathon pass within 2 hours.`);
      }
    }, 1500);
  };

  return (
    <section ref={ref} id="register" className="register-section py-24 relative bg-transparent">
      <div className="max-w-[600px] mx-auto px-6">
        <div className="section-divider mb-16" />

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            REGISTRATION
          </span>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-4">
            Join the Challenge
          </h3>
          <p className="text-base text-text-secondary leading-relaxed">
            Register today to lock in your individual spot for the 2026 hackathon.
          </p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="card glass-card p-8 md:p-10 border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl relative overflow-hidden"
        >
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-3">Registration Received</h4>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto mb-6">
                {success}
              </p>
              <div className="p-4 rounded-xl bg-background border border-border-subtle inline-flex items-center gap-2 text-xs text-text-muted">
                <Lock className="w-3.5 h-3.5" />
                <span>Redirect / Verification status (Secure Sandbox)</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="reg-name" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Track Selection */}
              <div>
                <label htmlFor="reg-track" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Track Selection
                </label>
                <select
                  id="reg-track"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="" disabled className="text-text-muted">Choose an innovation track</option>
                  <option value="ai" className="text-text-primary">AI/ML Track</option>
                  <option value="mobile" className="text-text-primary">Mobile App Development Track</option>
                </select>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("gateway")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === "gateway"
                        ? "border-primary bg-primary/10 text-white"
                        : "border-border-subtle bg-surface/5 text-text-secondary hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card / Online Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qr")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === "qr"
                        ? "border-primary bg-primary/10 text-white"
                        : "border-border-subtle bg-surface/5 text-text-secondary hover:text-white"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI QR Code (Fallback)</span>
                  </button>
                </div>
              </div>

              {/* Payment details conditional layout */}
              {paymentMethod === "gateway" ? (
                /* Payment Info / Secure Badge */
                <div className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white mb-1">Secure Checkout</h5>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Stripe handles our registration fee processing securely. Next step will redirect you to the payment gateway to complete the ₹100 transaction.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* QR Display */}
                  <div className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex flex-col items-center">
                    <div className="bg-white p-3 rounded-2xl mb-3 shadow-md w-fit flex items-center justify-center">
                      <img 
                        src="/assets/payment_qr.jpg" 
                        alt="UPI QR Code" 
                        className="w-40 h-auto object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-text-primary font-semibold mb-1 text-center">
                      Scan to Pay ₹100 using PhonePe
                    </p>
                    <p className="text-[10px] text-text-muted font-mono text-center select-all">
                      UPI ID: ARIL SRINIVAS
                    </p>
                  </div>

                  {/* UTR Input */}
                  <div>
                    <label htmlFor="reg-utr" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                      Transaction UTR / Ref ID (12 digits)
                    </label>
                    <input
                      id="reg-utr"
                      type="text"
                      placeholder="e.g. 612345678901"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      required
                      pattern="\d{12}"
                      maxLength={12}
                      title="UTR must be exactly 12 digits"
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>
                    {paymentMethod === "gateway" ? "Proceed to Payment (₹100)" : "Submit Registration (₹100)"}
                  </span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
