"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Send, CheckCircle2, Mail, Loader2, Sparkles, ArrowRight } from "lucide-react";

const WEB3FORMS_KEY = "fef1c94e-52b1-416e-9562-95b4995bd2d1";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const botcheck = formData.get("botcheck");
      if (botcheck) {
        setError("Unable to submit this form.");
        setLoading(false);
        return;
      }

      const captchaResponse = formData.get("h-captcha-response");
      if (!captchaResponse) {
        setError("Please complete the CAPTCHA before sending your message.");
        setLoading(false);
        return;
      }

      formData.append("access_key", WEB3FORMS_KEY);
      formData.set("subject", subject || "New enquiry from CalmStacks website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Message sent! We'll get back to you soon.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        form.reset();

        if (typeof window !== "undefined") {
          (window as any).hcaptcha?.reset();
        }
      } else {
        setError(data.message || "Failed to send message. Please try again.");
        if (typeof window !== "undefined") {
          (window as any).hcaptcha?.reset();
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
      if (typeof window !== "undefined") {
        (window as any).hcaptcha?.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://web3forms.com/client/script.js"
        strategy="afterInteractive"
      />

      <section
        ref={ref}
        id="contact"
        className="py-24 bg-[#FAF9F8] border-t border-[rgba(38,57,90,0.06)]"
      >
        <div className="max-w-[760px] mx-auto px-6">
          {/* Section Header */}
          <div
            className={`text-center mb-12 reveal ${
              inView ? "visible" : ""
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F2] text-xs font-mono text-[#208374] border border-[#208374]/20 mb-4">
              <span>START A CONVERSATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-normal text-[#1A1814] mb-4">
              Have an idea worth engineering?
            </h2>
            <p className="text-base sm:text-lg text-[#54524E] max-w-lg mx-auto leading-relaxed">
              Let&apos;s discuss how CalmStacks can help turn your requirements into a practical, production-ready software solution.
            </p>

            <div className="mt-5">
              <a
                href="mailto:calmstacksdigital@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(38,57,90,0.08)] shadow-sm text-xs font-mono text-[#1A1814] hover:border-[rgba(38,57,90,0.2)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#208374]" />
                calmstacksdigital@gmail.com
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div
            className={`pf-card-white p-6 sm:p-10 border border-[rgba(38,57,90,0.08)] reveal ${
              inView ? "visible" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-[#E8F5F2] border border-[#208374]/20 text-center flex items-center justify-center gap-2 text-[#208374] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#208374]" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-[#CA7B57]/10 border border-[#CA7B57]/20 text-center text-xs text-[#CA7B57]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#54524E] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] focus:ring-1 focus:ring-[#1A1814] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-[#54524E] mb-1.5"
                  >
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] focus:ring-1 focus:ring-[#1A1814] transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono uppercase tracking-wider text-[#54524E] mb-1.5"
                >
                  Project Focus / Capability Needed
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Multi-agent system, Custom platform, LegalConnect inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] focus:ring-1 focus:ring-[#1A1814] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-wider text-[#54524E] mb-1.5"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about what you're looking to build, timeline, or current technical requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] focus:ring-1 focus:ring-[#1A1814] transition-all resize-none"
                />
              </div>

              {/* Web3Forms hCaptcha Widget */}
              <div className="pt-2 flex justify-center">
                <div
                  className="h-captcha"
                  data-captcha="true"
                  data-theme="light"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="pf-btn-primary w-full justify-center !py-3.5 !text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] font-mono text-center text-[#82807A] pt-2">
                Encrypted submission · Directly routed to founders · Response within 24h
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
