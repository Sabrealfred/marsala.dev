"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
  BoltIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const contactReasons = [
  { id: "modules", label: "Explore Modules", icon: ChatBubbleLeftRightIcon, color: "from-blue-500 to-indigo-600" },
  { id: "support", label: "Technical Support", icon: WrenchScrewdriverIcon, color: "from-purple-500 to-fuchsia-600" },
  { id: "partnership", label: "Partnership", icon: UserGroupIcon, color: "from-green-500 to-emerald-600" },
  { id: "other", label: "Other Inquiry", icon: QuestionMarkCircleIcon, color: "from-orange-500 to-amber-600" },
];

const servicesOptions = [
  "Custom AI Development",
  "System Integration",
  "Technical Consulting",
  "Training & Support",
  "Managed Services",
  "Other",
];

const budgetRanges = [
  "Under $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k - $250k",
  "$250k+",
  "Not sure yet",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    reason: "",
    budget_range: "",
    services_interested: [] as string[],
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
    const value = formState[field as keyof typeof formState];
    const error = validateField(field, typeof value === 'string' ? value : '');
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formState).forEach((field) => {
      const value = formState[field as keyof typeof formState];
      const error = validateField(field, typeof value === 'string' ? value : '');
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
          phone: "",
          message: "",
          reason: "",
          budget_range: "",
          services_interested: [],
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleCheckboxChange = (service: string) => {
    setFormState((prev) => ({
      ...prev,
      services_interested: prev.services_interested.includes(service)
        ? prev.services_interested.filter((s) => s !== service)
        : [...prev.services_interested, service],
    }));
  };

  const messageLength = formState.message.length;
  const maxMessageLength = 1000;

  return (
    <main className="min-h-screen bg-white dark:bg-navy-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-24 lg:py-32">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400">
              Get in Touch
            </p>
            <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight text-[#051c2c] dark:text-slate-100 lg:text-6xl">
              Build Your Marsala OS
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
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
              className="inline-flex items-center gap-2 rounded-sm bg-[#051c2c] dark:bg-slate-100 px-6 py-3 text-sm font-semibold text-white dark:text-[#051c2c] shadow-sm transition-all duration-300 hover:bg-[#062433] dark:hover:bg-slate-200"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              Schedule a Call
            </a>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 px-6 py-3 text-sm font-semibold text-[#051c2c] dark:text-slate-100 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-slate-100"
            >
              Join Waitlist
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading mb-6 text-center text-2xl font-bold text-[#051c2c] dark:text-slate-100">
              What can we help you with?
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {contactReasons.map((reason) => (
                <motion.button
                  key={reason.id}
                  onClick={() => setFormState((prev) => ({ ...prev, reason: reason.id }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden rounded-sm border-2 p-6 text-left transition-all duration-300 ${
                    formState.reason === reason.id
                      ? "border-[#051c2c] dark:border-slate-100 bg-white dark:bg-navy-950 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 hover:border-[#051c2c] dark:hover:border-slate-100 hover:shadow-sm"
                  }`}
                >
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 text-2xl">
                    <reason.icon className="h-6 w-6 text-white dark:text-[#051c2c]" />
                  </div>
                  <h3 className="font-semibold text-[#051c2c] dark:text-slate-100">{reason.label}</h3>
                  {formState.reason === reason.id && (
                    <motion.div
                      layoutId="selected-reason"
                      className="absolute right-4 top-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <CheckCircleIcon className="h-6 w-6 text-[#051c2c] dark:text-slate-100" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 bg-white dark:bg-navy-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm lg:p-12"
          >
            <div className="mb-8 grid gap-6 lg:grid-cols-[1fr,1.5fr]">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-bold text-[#051c2c] dark:text-slate-100">Direct Contact</h3>
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <a
                      href="mailto:sales@marsala.dev"
                      className="flex items-center gap-3 rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 p-3 transition-colors hover:border-[#051c2c] dark:hover:border-slate-100"
                    >
                      <EnvelopeIcon className="h-5 w-5 text-[#051c2c] dark:text-slate-100" />
                      <span className="font-semibold">sales@marsala.dev</span>
                    </a>
                    <div className="rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3">
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#051c2c] dark:text-slate-100" />
                        <div className="text-xs">
                          <p className="font-semibold text-[#051c2c] dark:text-slate-100">221 River St., 9th Floor</p>
                          <p className="text-slate-600 dark:text-slate-300">Hoboken, NJ 07030, USA</p>
                          <p className="mt-1 text-slate-600 dark:text-slate-300">NYC · London · Remote</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <BoltIcon className="h-5 w-5 text-[#051c2c] dark:text-slate-100" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#051c2c] dark:text-slate-100">Quick Stats</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Avg. Response Time</span>
                      <span className="font-bold text-[#051c2c] dark:text-slate-100">1.2 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Support Availability</span>
                      <span className="font-bold text-[#051c2c] dark:text-slate-100">24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
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
                    className={`w-full rounded-sm border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                      errors.name && touched.name
                        ? "border-red-400 bg-red-500/10 focus:ring-red-500/20"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 focus:border-[#051c2c] dark:focus:border-slate-100 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20"
                    }`}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-xs text-red-600 dark:text-red-400"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
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
                    className={`w-full rounded-sm border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                      errors.email && touched.email
                        ? "border-red-400 bg-red-500/10 focus:ring-red-500/20"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 focus:border-[#051c2c] dark:focus:border-slate-100 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20"
                    }`}
                    placeholder="you@company.com"
                  />
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-xs text-red-600 dark:text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 px-4 py-3 transition-all focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="Your company (optional)"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 px-4 py-3 transition-all focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="+1 (555) 123-4567 (optional)"
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="budget_range" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Budget Range
                  </label>
                  <select
                    id="budget_range"
                    name="budget_range"
                    value={formState.budget_range}
                    onChange={handleChange}
                    className="w-full rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 px-4 py-3 transition-all focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20 text-[#051c2c] dark:text-slate-100"
                  >
                    <option value="">Select a budget range (optional)</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Services Interested */}
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Services Interested
                  </label>
                  <div className="space-y-2">
                    {servicesOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 px-4 py-3 transition-all hover:border-[#051c2c] dark:hover:border-slate-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formState.services_interested.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                          className="h-4 w-4 rounded-sm border-2 border-slate-300 dark:border-slate-600 text-[#051c2c] focus:ring-2 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20"
                        />
                        <span className="text-sm text-[#051c2c] dark:text-slate-100">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Message *
                    </label>
                    <span className={`text-xs ${messageLength > maxMessageLength ? "text-red-400" : "text-slate-500 dark:text-slate-400"}`}>
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
                    className={`w-full rounded-sm border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                      errors.message && touched.message
                        ? "border-red-400 bg-red-500/10 focus:ring-red-500/20"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 focus:border-[#051c2c] dark:focus:border-slate-100 focus:ring-[#051c2c]/20 dark:focus:ring-slate-100/20"
                    }`}
                    placeholder="Tell us about your project, goals, and how we can help..."
                  />
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-xs text-red-600 dark:text-red-400"
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
                      className={`rounded-sm border-2 p-4 ${
                        submitStatus.type === "success"
                          ? "border-green-400/50 bg-green-500/10 dark:bg-green-500/20"
                          : "border-red-400/50 bg-red-500/10 dark:bg-red-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {submitStatus.type === "success" ? (
                          <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                        )}
                        <p className={`text-sm ${submitStatus.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                          {submitStatus.message}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Privacy Notice */}
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  We process your data to respond to you. We do not share it with third parties without consent.
                  See our <Link href="/legal/privacy" className="font-semibold text-[#051c2c] dark:text-slate-100 hover:underline">Privacy Policy</Link>.
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).some((key) => errors[key])}
                  className="group relative w-full overflow-hidden rounded-sm bg-[#051c2c] dark:bg-slate-100 px-8 py-4 text-base font-semibold text-white dark:text-[#051c2c] shadow-sm transition-all duration-300 hover:bg-[#062433] dark:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <PaperAirplaneIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
