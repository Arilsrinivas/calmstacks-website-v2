"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Loader2,
  Code2,
  Cpu,
  Sparkles,
  Layers,
  ArrowUpRight
} from "lucide-react";

const WEB3FORMS_KEY = "fef1c94e-52b1-416e-9562-95b4995bd2d1";

const roles = [
  {
    title: "AI & Multi-Agent Systems Intern",
    type: "Remote / Hybrid",
    term: "3–6 Months",
    focus: "Python, Agent Factory orchestration, Git worktrees, LLM tool pipelines",
  },
  {
    title: "Full-Stack Software Engineering Intern",
    type: "Remote / Hybrid",
    term: "3–6 Months",
    focus: "Next.js, TypeScript, Tailwind CSS, PostgreSQL, REST/GraphQL APIs",
  },
  {
    title: "Product Design & Frontend Systems Intern",
    type: "Remote / Hybrid",
    term: "3–6 Months",
    focus: "UI/UX architecture, responsive design systems, interactive prototypes",
  },
];

export default function CareersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0].title);
  const [portfolio, setPortfolio] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
        setError("Unable to submit this application.");
        setLoading(false);
        return;
      }

      const captchaResponse = formData.get("h-captcha-response");
      if (!captchaResponse) {
        setError("Please complete the CAPTCHA before submitting your application.");
        setLoading(false);
        return;
      }

      formData.append("access_key", WEB3FORMS_KEY);
      formData.set("subject", `New Internship Application: ${role} - ${name}`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Application received! Our engineering team will review your profile and reach out within 48 hours.");
        setName("");
        setEmail("");
        setPortfolio("");
        setResumeUrl("");
        setNote("");
        form.reset();

        if (typeof window !== "undefined") {
          (window as any).hcaptcha?.reset();
        }
      } else {
        setError(data.message || "Failed to submit application. Please try again.");
        if (typeof window !== "undefined") {
          (window as any).hcaptcha?.reset();
        }
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
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

      <Navbar />

      <main className="min-h-screen bg-[#FAF9F8] pt-32 pb-24 text-[#1A1814]">
        <div className="max-w-[960px] mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-normal text-[#1A1814] leading-[1.12] mb-5">
              Build with CalmStacks. <br />
              <span className="text-[#82807A] font-normal">
                Engineering Internships.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#54524E] leading-relaxed">
              We work on autonomous multi-agent development pipelines, legal-tech systems, and production software. If you love building real things, we would love to have you.
            </p>
          </div>

          {/* Minimal Open Roles Overview */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {roles.map((r) => (
              <div
                key={r.title}
                onClick={() => setRole(r.title)}
                className={`pf-card-white p-5 cursor-pointer transition-all border ${
                  role === r.title
                    ? "border-[#1A1814] shadow-md bg-white"
                    : "border-[rgba(38,57,90,0.08)] hover:border-[rgba(38,57,90,0.2)] bg-white/70"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[#82807A] mb-2 font-medium">
                  <span>{r.type}</span>
                  <span>{r.term}</span>
                </div>
                <h3 className="text-base font-semibold text-[#1A1814] mb-2 leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs text-[#54524E] leading-relaxed">
                  {r.focus}
                </p>
              </div>
            ))}
          </div>

          {/* Application Form Box */}
          <div className="pf-card-white p-6 sm:p-10 border border-[rgba(38,57,90,0.08)] max-w-[760px] mx-auto">
            <div className="mb-8 pb-6 border-b border-[rgba(38,57,90,0.08)]">
              <h2 className="text-2xl font-semibold text-[#1A1814] mb-2">
                Apply for an Internship
              </h2>
              <p className="text-sm text-[#54524E]">
                Direct application reviewed personally by our engineering leads. No automated keyword filters.
              </p>
            </div>

            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-[#EFECE6] border border-[#1A1814]/10 text-center flex items-center justify-center gap-2 text-[#1A1814] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#1A1814]" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-[#CA7B57]/10 border border-[#CA7B57]/20 text-center text-xs text-[#1A1814]">
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

              {/* Role Selector */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-xs uppercase tracking-wider text-[#54524E] font-medium mb-1.5"
                >
                  Desired Track
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] text-sm focus:outline-none focus:border-[#1A1814] transition-all"
                >
                  {roles.map((r) => (
                    <option key={r.title} value={r.title}>
                      {r.title} ({r.term})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-[#54524E] font-medium mb-1.5"
                  >
                    Your Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider text-[#54524E] font-medium mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@college.edu or personal"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="portfolio"
                    className="block text-xs uppercase tracking-wider text-[#54524E] font-medium mb-1.5"
                  >
                    GitHub / Portfolio / LinkedIn
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    required
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="resumeUrl"
                    className="block text-xs uppercase tracking-wider text-[#54524E] font-medium mb-1.5"
                  >
                    Resume Link (Drive / Dropbox / Notion)
                  </label>
                  <input
                    id="resumeUrl"
                    name="resumeUrl"
                    type="url"
                    required
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-xs uppercase tracking-wider text-[#54524E] font-medium mb-1.5"
                >
                  What projects or technologies excite you the most?
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Share a cool project you built, an agent framework you experimented with, or why you want to build at CalmStacks..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F8] border border-[rgba(38,57,90,0.12)] text-[#1A1814] placeholder-[#82807A] text-sm focus:outline-none focus:border-[#1A1814] transition-all resize-none"
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
                      <span>Submitting application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-center text-[#82807A] pt-2">
                Applications reviewed on a rolling basis · We reply to all applicants
              </p>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
