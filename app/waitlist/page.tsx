"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "duplicate" | null;
    message: string;
  }>({ type: null, message: "" });

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
          email: formState.email,
          name: formState.name || undefined,
          company: formState.company || undefined,
          role: formState.role || undefined,
          interest: formState.interest || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.duplicate) {
          // Handle duplicate email case
          setSubmitStatus({
            type: "duplicate",
            message: "You're already on the list! We'll notify you when we launch.",
          });
        } else {
          // Success case
          setSubmitStatus({
            type: "success",
            message: "You're on the list!",
          });
          // Reset form on success
          setFormState({
            name: "",
            email: "",
            company: "",
            role: "",
            interest: "",
          });
        }
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10 bg-white dark:bg-navy-950">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400">
        Waitlist
      </p>
      <h1 className="mt-2 font-heading text-4xl font-semibold text-[#051c2c] dark:text-slate-100">
        Join the Marsala OS Waitlist
      </h1>
      <p className="mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-300">
        Be the first to know when we launch new modules, features, and
        exclusive early access opportunities for Marsala OS.
      </p>

      <section className="mt-10 rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Benefits Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#051c2c] dark:text-slate-100">
              What you&apos;ll get
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🚀</span>
                <div>
                  <p className="font-semibold text-[#051c2c] dark:text-slate-100">Early Access</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Be among the first to try new Marsala OS modules and
                    features
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">💡</span>
                <div>
                  <p className="font-semibold text-[#051c2c] dark:text-slate-100">
                    Exclusive Insights
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Get access to case studies, playbooks, and growth strategies
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🎁</span>
                <div>
                  <p className="font-semibold text-[#051c2c] dark:text-slate-100">
                    Special Pricing
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Exclusive discounts and offers for early adopters
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🤝</span>
                <div>
                  <p className="font-semibold text-[#051c2c] dark:text-slate-100">
                    Direct Support
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Priority access to our team for questions and guidance
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Already ready to talk?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
                >
                  Contact us directly
                </Link>
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 text-sm text-[#051c2c] dark:text-slate-100"
            aria-label="Marsala waitlist form"
          >
            {/* Email - Required */}
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
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
                disabled={isSubmitting}
                className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-1 focus:ring-[#051c2c] dark:focus:ring-slate-100 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@company.com"
              />
            </div>

            {/* Name - Optional */}
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-1 focus:ring-[#051c2c] dark:focus:ring-slate-100 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>

            {/* Company - Optional */}
            <div className="grid gap-2">
              <label
                htmlFor="company"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formState.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-1 focus:ring-[#051c2c] dark:focus:ring-slate-100 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your company"
              />
            </div>

            {/* Role - Optional */}
            <div className="grid gap-2">
              <label
                htmlFor="role"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
              >
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formState.role}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-1 focus:ring-[#051c2c] dark:focus:ring-slate-100 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your role"
              />
            </div>

            {/* Interest - Optional */}
            <div className="grid gap-2">
              <label
                htmlFor="interest"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
              >
                What interests you most?
              </label>
              <textarea
                id="interest"
                name="interest"
                value={formState.interest}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={3}
                className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-1 focus:ring-[#051c2c] dark:focus:ring-slate-100 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                placeholder="Tell us what you're looking for..."
              />
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`rounded-sm p-4 border transition-all ${
                  submitStatus.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700"
                    : submitStatus.type === "duplicate"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700"
                }`}
              >
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We&apos;ll only send you relevant updates about Marsala OS. No
              spam, unsubscribe anytime.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 px-6 py-3 text-sm font-semibold text-white dark:text-[#051c2c] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-[#062433] dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#051c2c] dark:focus:ring-slate-100 focus:ring-offset-2 dark:focus:ring-offset-navy-950"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Joining...
                </>
              ) : (
                "Join Waitlist"
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Additional Info */}
      <section className="mt-8 rounded-sm border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Questions about Marsala OS? Check out our{" "}
          <Link
            href="/modules"
            className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
          >
            modules
          </Link>
          ,{" "}
          <Link
            href="/cases"
            className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
          >
            case studies
          </Link>
          , or{" "}
          <Link
            href="/research"
            className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
          >
            research
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
