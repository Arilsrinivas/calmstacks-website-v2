"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => { setName(""); setEmail(""); setPassword(""); setError(""); setSuccess(""); };

  const switchTab = (newTab: "login" | "signup") => { setTab(newTab); resetForm(); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError("Invalid email or password"); }
      else {
        setSuccess("Welcome back!");
        setTimeout(() => { onClose(); resetForm(); window.location.reload(); }, 800);
      }
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Sign up failed"); return; }
      const loginResult = await signIn("credentials", { email, password, redirect: false });
      if (loginResult?.error) { setSuccess("Account created! Please sign in."); switchTab("login"); }
      else {
        setSuccess("Account created!");
        setTimeout(() => { onClose(); resetForm(); window.location.reload(); }, 800);
      }
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-sm bg-surface rounded-2xl overflow-hidden animate-slide-up">
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full text-text-muted hover:text-text-primary hover:bg-white/[0.06] transition-all z-10" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="p-7">
          {/* Header */}
          <div className="text-center mb-7">
            <h2 className="text-xl font-semibold text-text-primary">
              {tab === "login" ? "Sign in" : "Create account"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-white/[0.04] p-0.5 mb-7">
            <button onClick={() => switchTab("login")} className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${tab === "login" ? "bg-surface-elevated text-text-primary" : "text-text-muted"}`}>
              Sign In
            </button>
            <button onClick={() => switchTab("signup")} className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${tab === "signup" ? "bg-surface-elevated text-text-primary" : "text-text-muted"}`}>
              Sign Up
            </button>
          </div>

          {/* Messages */}
          {success && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-xs text-emerald-300">{success}</span>
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/15">
              <span className="text-xs text-red-300">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={tab === "login" ? handleLogin : handleSignUp} className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="block text-[10px] font-medium text-text-muted mb-1 uppercase tracking-wider">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required minLength={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-medium text-text-muted mb-1 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-text-muted mb-1 uppercase tracking-wider">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={tab === "signup" ? "Min. 8 characters" : "••••••••"} required minLength={tab === "signup" ? 8 : 1}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary justify-center text-sm mt-2 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{tab === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
