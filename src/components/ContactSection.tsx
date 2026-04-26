"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Loader2, Send } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function ContactFormContent() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Check for NextAuth URL errors
  useEffect(() => {
    if (urlError === "OAuthAccountNotLinked") {
      setError("To confirm your identity, sign in with the same account you used originally.");
    } else if (urlError) {
      setError(`Authentication Error: ${urlError}`);
    }
  }, [urlError]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: session?.user?.name || "Authenticated User",
          email: session?.user?.email,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess("Thanks for reaching out! We'll get back to you soon.");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-24 bg-surface-elevated/30">
      <div className="max-w-[600px] mx-auto px-6">
        <div className={`text-center mb-10 reveal ${inView ? "visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary mb-4">
            CONTACT US
          </h2>
          <p className="text-lg text-text-secondary">
            Have a project in mind? Let's build something great together.
          </p>
        </div>

        <div className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          {status === "loading" ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : status === "unauthenticated" ? (
            <div className="text-center p-8 bg-surface border border-border-subtle rounded-2xl">
              <p className="text-text-secondary mb-6">
                Please sign in with Google to send us a message. This helps us prevent spam and ensure quality inquiries.
              </p>
              <button
                onClick={() => signIn("google")}
                className="btn-primary"
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            <>
              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 text-center">
                  <span className="text-sm text-emerald-300">{success}</span>
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/15 text-center">
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text" 
                      value={session?.user?.name || ""} 
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border-subtle text-text-muted text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <input
                      type="email" 
                      value={session?.user?.email || ""} 
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border-subtle text-text-muted text-sm cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text" 
                    placeholder="Subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)} 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="Tell us about your project or inquiry..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary justify-center disabled:opacity-50"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading contact section...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
