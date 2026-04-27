"use client";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle2, Mail, Loader2 } from "lucide-react";

const WEB3FORMS_KEY = "2bfb4e6e-317b-4d34-b81e-ce44a86fae87";

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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Message sent! We'll get back to you soon.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
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
            Have a project in mind? Let&apos;s build something great together.
          </p>
          <a
            href="mailto:calmstacksdigital@gmail.com"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="w-4 h-4" />
            calmstacksdigital@gmail.com
          </a>
        </div>

        <div className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
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
        </div>
      </div>
    </section>
  );
}
