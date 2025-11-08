"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
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
      const response = await fetch("/api/waitlist", {
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
          message: data.message || "Successfully joined the waitlist!",
        });
        // Reset form
        setFormState({
          name: "",
          email: "",
          company: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to join waitlist. Please try again.",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
        Waitlist
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">
        Join the Marsala OS Waitlist
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground-muted">
        Be the first to know when we launch new modules, features, and
        exclusive early access opportunities for Marsala OS.
      </p>

      <section className="mt-10 rounded-3xl border border-border bg-white/90 p-8 shadow-card">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Benefits Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              What you&apos;ll get
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🚀</span>
                <div>
                  <p className="font-semibold text-foreground">Early Access</p>
                  <p className="text-sm text-foreground-muted">
                    Be among the first to try new Marsala OS modules and
                    features
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">💡</span>
                <div>
                  <p className="font-semibold text-foreground">
                    Exclusive Insights
                  </p>
                  <p className="text-sm text-foreground-muted">
                    Get access to case studies, playbooks, and growth strategies
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🎁</span>
                <div>
                  <p className="font-semibold text-foreground">
                    Special Pricing
                  </p>
                  <p className="text-sm text-foreground-muted">
                    Exclusive discounts and offers for early adopters
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🤝</span>
                <div>
                  <p className="font-semibold text-foreground">
                    Direct Support
                  </p>
                  <p className="text-sm text-foreground-muted">
                    Priority access to our team for questions and guidance
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <p className="text-sm text-foreground-muted">
                Already ready to talk?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-accent underline hover:text-accent/80"
                >
                  Contact us directly
                </Link>
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 text-sm text-foreground"
            aria-label="Marsala waitlist form"
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
                placeholder="Your company (optional)"
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
              We&apos;ll only send you relevant updates about Marsala OS. No
              spam, unsubscribe anytime.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        </div>
      </section>

      {/* Additional Info */}
      <section className="mt-8 rounded-3xl border border-border bg-gradient-to-br from-moss-50 to-sage-50 p-6 text-center">
        <p className="text-sm text-foreground-muted">
          Questions about Marsala OS? Check out our{" "}
          <Link
            href="/modules"
            className="font-semibold text-foreground underline hover:text-accent"
          >
            modules
          </Link>
          ,{" "}
          <Link
            href="/cases"
            className="font-semibold text-foreground underline hover:text-accent"
          >
            case studies
          </Link>
          , or{" "}
          <Link
            href="/research"
            className="font-semibold text-foreground underline hover:text-accent"
          >
            research
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
