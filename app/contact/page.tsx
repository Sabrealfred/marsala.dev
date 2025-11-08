"use client";

import { useState, useEffect, FormEvent } from "react";
import type { Metadata } from "next";

// Note: metadata must be exported from a Server Component
// We'll move it to a separate layout or handle it differently

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [entryPoint, setEntryPoint] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Detectar entry point (página desde donde llegó el usuario)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const referrer = document.referrer;
      const fromPage = new URLSearchParams(window.location.search).get("from");

      if (fromPage) {
        setEntryPoint(fromPage);
      } else if (referrer && referrer.includes(window.location.host)) {
        // Si viene de una página interna
        const path = new URL(referrer).pathname;
        setEntryPoint(path === "/" ? "Home" : path.replace("/", ""));
      } else if (referrer) {
        setEntryPoint(`External: ${new URL(referrer).hostname}`);
      } else {
        setEntryPoint("Direct");
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          entryPoint,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        // Reset form
        setFormState({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">
        Build your Marsala OS
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground-muted">
        Share context about your project, objectives, current stack, and timing
        so we can design the right modular rollout.
      </p>

      <section className="mt-10 grid gap-6 rounded-3xl border border-border bg-white/90 p-8 shadow-card md:grid-cols-[1fr,1.1fr]">
        <div className="space-y-4 text-sm text-foreground">
          <p className="text-lg font-semibold text-foreground">
            sales@marsala.dev
          </p>
          <p className="text-foreground-muted">
            221 River St., 9th Floor, Hoboken, NJ 07030, USA
          </p>
          <p className="text-foreground-muted">NYC · London · Remote</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://cal.com/marsala/os"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
            >
              Schedule a Call
            </a>
            <a
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              Join Waitlist
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 text-sm text-foreground"
          aria-label="Marsala contact form"
        >
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="font-semibold uppercase tracking-[0.22em] text-foreground/60"
            >
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              required
              className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="font-semibold uppercase tracking-[0.22em] text-foreground/60"
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none"
              placeholder="you@company.com"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="company"
              className="font-semibold uppercase tracking-[0.22em] text-foreground/60"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formState.company}
              onChange={handleChange}
              className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none"
              placeholder="Your company"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="message"
              className="font-semibold uppercase tracking-[0.22em] text-foreground/60"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formState.message}
              onChange={handleChange}
              required
              className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none"
              placeholder="Tell us about your project"
            />
          </div>

          {submitStatus.type && (
            <div
              className={`rounded-2xl p-4 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <p className="text-sm">{submitStatus.message}</p>
            </div>
          )}

          <p className="text-xs text-foreground-muted">
            We process your data to respond to you. We do not share it with
            third parties without consent.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
}
