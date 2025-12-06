"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Get redirect URL from query params (if user was redirected from protected route)
  const redirectUrl = searchParams.get("redirect") || "/";

  // Check for OAuth error in URL
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setSubmitStatus({
        type: "error",
        message: decodeURIComponent(error),
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const supabase = createClient();

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        setSubmitStatus({
          type: "error",
          message: "Please enter a valid email address.",
        });
        setIsSubmitting(false);
        return;
      }

      // Validate password length
      if (formState.password.length < 6) {
        setSubmitStatus({
          type: "error",
          message: "Password must be at least 6 characters long.",
        });
        setIsSubmitting(false);
        return;
      }

      // Validate password match
      if (formState.password !== formState.confirmPassword) {
        setSubmitStatus({
          type: "error",
          message: "Passwords do not match.",
        });
        setIsSubmitting(false);
        return;
      }

      const callbackUrl = new URL(`${window.location.origin}/api/auth/callback`);
      // Preserve the redirect URL through email verification flow
      if (redirectUrl !== "/") {
        callbackUrl.searchParams.set("next", redirectUrl);
      }

      const { data, error } = await supabase.auth.signUp({
        email: formState.email.toLowerCase(),
        password: formState.password,
        options: {
          data: {
            name: formState.name,
          },
          emailRedirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        // Handle specific error cases with user-friendly messages
        if (error.message.includes("already registered")) {
          setSubmitStatus({
            type: "error",
            message: "This email is already registered. Please sign in instead.",
          });
        } else if (error.message.includes("Password should be at least")) {
          setSubmitStatus({
            type: "error",
            message: "Password must be at least 6 characters long.",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: error.message || "Failed to create account. Please try again.",
          });
        }
        return;
      }

      if (data.user) {
        setSubmitStatus({
          type: "success",
          message: "Account created! Please check your email to verify your account.",
        });

        // Clear form
        setFormState({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
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

  const handleOAuthSignup = async (provider: "google" | "github") => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const supabase = createClient();
      const callbackUrl = new URL(`${window.location.origin}/api/auth/callback`);
      // Preserve the redirect URL through OAuth flow
      if (redirectUrl !== "/") {
        callbackUrl.searchParams.set("next", redirectUrl);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        setSubmitStatus({
          type: "error",
          message: `Failed to sign up with ${provider}. Please try again.`,
        });
        setIsSubmitting(false);
      }
      // If successful, user will be redirected to OAuth provider
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-md px-6 pb-24 pt-24 md:px-10 bg-white dark:bg-navy-950 min-h-screen">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400">
          Create Account
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-[#051c2c] dark:text-slate-100">
          Join Marsala OS
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Create your account to get started
        </p>
      </div>

      <section className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm">
        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuthSignup("google")}
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-3 rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 px-5 py-2.5 text-sm font-semibold text-[#051c2c] dark:text-slate-100 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuthSignup("github")}
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-3 rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 px-5 py-2.5 text-sm font-semibold text-[#051c2c] dark:text-slate-100 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-600 dark:text-slate-400">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 text-sm text-[#051c2c] dark:text-slate-100"
          aria-label="Registration form"
        >
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Your name (optional)"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
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
              className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="you@company.com"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
            >
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="At least 6 characters"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="confirmPassword"
              className="font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400"
            >
              Confirm Password *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formState.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 px-4 py-3 focus:border-[#051c2c] dark:focus:border-slate-100 focus:outline-none text-[#051c2c] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Confirm your password"
            />
          </div>

          {submitStatus.type && (
            <div
              className={`rounded-sm p-4 ${
                submitStatus.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700"
                  : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700"
              }`}
            >
              <p className="text-sm">{submitStatus.message}</p>
            </div>
          )}

          <p className="text-xs text-slate-600 dark:text-slate-300">
            By creating an account, you agree to our{" "}
            <Link
              href="/legal/terms"
              className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-[#051c2c] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#062433] dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Additional Links */}
      <section className="mt-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            className="font-semibold text-[#051c2c] dark:text-slate-100 underline hover:opacity-80"
          >
            Back to home
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto w-full max-w-md px-6 pb-24 pt-24 md:px-10 bg-white dark:bg-navy-950 min-h-screen">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400">
            Create Account
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold text-[#051c2c] dark:text-slate-100">
            Join Marsala OS
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Loading...
          </p>
        </div>
      </main>
    }>
      <RegisterForm />
    </Suspense>
  );
}
