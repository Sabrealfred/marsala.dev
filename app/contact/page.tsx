"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const contactReasons = [
  { id: "modules", label: "Explore Modules", icon: "🎯", color: "from-blue-500 to-indigo-600" },
  { id: "support", label: "Technical Support", icon: "🛠️", color: "from-purple-500 to-fuchsia-600" },
  { id: "partnership", label: "Partnership", icon: "🤝", color: "from-green-500 to-emerald-600" },
  { id: "other", label: "Other Inquiry", icon: "💬", color: "from-orange-500 to-amber-600" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    reason: "",
  });
  const [entryPoint, setEntryPoint] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const referrer = document.referrer;
      const fromPage = new URLSearchParams(window.location.search).get("from");

      if (fromPage) {
        setEntryPoint(fromPage);
      } else if (referrer && referrer.includes(window.location.host)) {
        const path = new URL(referrer).pathname;
        setEntryPoint(path === "/" ? "Home" : path.replace("/", ""));
      } else if (referrer) {
        setEntryPoint(`External: ${new URL(referrer).hostname}`);
      } else {
        setEntryPoint("Direct");
      }
    }
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email address" : "";
      case "message":
        return value.trim().length < 10 ? "Message must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formState[field as keyof typeof formState]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formState).forEach((field) => {
      const error = validateField(field, formState[field as keyof typeof formState]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

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
          message: data.message || "Message sent successfully! We'll get back to you soon.",
        });
        setFormState({
          name: "",
          email: "",
          company: "",
          message: "",
          reason: "",
        });
        setTouched({});
        setErrors({});
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
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const messageLength = formState.message.length;
  const maxMessageLength = 1000;

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-moss-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-950 via-moss-900 to-moss-950 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-moss-300 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-sage-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sage-400">
              Get in Touch
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white lg:text-6xl">
              Build Your Marsala OS
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-sage-300">
              Share context about your project, objectives, current stack, and timing
              so we can design the right modular rollout.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://cal.com/marsala/os"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-moss-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </a>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
            >
              Join Waitlist
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-moss-950">
              What can we help you with?
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {contactReasons.map((reason) => (
                <motion.button
                  key={reason.id}
                  onClick={() => setFormState((prev) => ({ ...prev, reason: reason.id }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                    formState.reason === reason.id
                      ? "border-moss-500 bg-moss-50 shadow-lg"
                      : "border-moss-200 bg-white hover:border-moss-400 hover:shadow-md"
                  }`}
                >
                  <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${reason.color} text-2xl shadow-md`}>
                    {reason.icon}
                  </div>
                  <h3 className="font-semibold text-moss-950">{reason.label}</h3>
                  {formState.reason === reason.id && (
                    <motion.div
                      layoutId="selected-reason"
                      className="absolute right-4 top-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg className="h-6 w-6 text-moss-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl border-2 border-moss-200 bg-white p-8 shadow-card lg:p-12"
          >
            <div className="mb-8 grid gap-6 lg:grid-cols-[1fr,1.5fr]">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-bold text-moss-950">Direct Contact</h3>
                  <div className="space-y-3 text-sm text-sage-700">
                    <a
                      href="mailto:sales@marsala.dev"
                      className="flex items-center gap-3 rounded-xl border border-moss-200 bg-moss-50/50 p-3 transition-colors hover:border-moss-400 hover:bg-moss-50"
                    >
                      <svg className="h-5 w-5 text-moss-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold">sales@marsala.dev</span>
                    </a>
                    <div className="rounded-xl border border-moss-200 bg-gradient-to-br from-white to-moss-50/30 p-3">
                      <div className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-moss-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="text-xs">
                          <p className="font-semibold text-moss-900">221 River St., 9th Floor</p>
                          <p className="text-sage-600">Hoboken, NJ 07030, USA</p>
                          <p className="mt-1 text-sage-600">NYC · London · Remote</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-moss-50 to-sage-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-moss-700">Quick Stats</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sage-700">Avg. Response Time</span>
                      <span className="font-bold text-moss-900">1.2 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-700">Support Availability</span>
                      <span className="font-bold text-moss-900">24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-moss-700">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    required
                    className={`w-full rounded-xl border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-moss-500/20 ${
                      errors.name && touched.name
                        ? "border-red-300 bg-red-50"
                        : "border-moss-200 bg-white focus:border-moss-500"
                    }`}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-moss-700">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    required
                    className={`w-full rounded-xl border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-moss-500/20 ${
                      errors.email && touched.email
                        ? "border-red-300 bg-red-50"
                        : "border-moss-200 bg-white focus:border-moss-500"
                    }`}
                    placeholder="you@company.com"
                  />
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-wider text-moss-700">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-moss-200 bg-white px-4 py-3 transition-all focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-500/20"
                    placeholder="Your company (optional)"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-moss-700">
                      Message *
                    </label>
                    <span className={`text-xs ${messageLength > maxMessageLength ? "text-red-600" : "text-sage-500"}`}>
                      {messageLength}/{maxMessageLength}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    required
                    maxLength={maxMessageLength}
                    className={`w-full rounded-xl border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-moss-500/20 ${
                      errors.message && touched.message
                        ? "border-red-300 bg-red-50"
                        : "border-moss-200 bg-white focus:border-moss-500"
                    }`}
                    placeholder="Tell us about your project, goals, and how we can help..."
                  />
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`rounded-xl border-2 p-4 ${
                        submitStatus.type === "success"
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {submitStatus.type === "success" ? (
                          <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <p className={`text-sm ${submitStatus.type === "success" ? "text-green-800" : "text-red-800"}`}>
                          {submitStatus.message}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Privacy Notice */}
                <p className="text-xs text-sage-600">
                  We process your data to respond to you. We do not share it with third parties without consent.
                  See our <Link href="/legal/privacy" className="font-semibold text-moss-700 hover:underline">Privacy Policy</Link>.
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).some((key) => errors[key])}
                  className="group relative w-full overflow-hidden rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
