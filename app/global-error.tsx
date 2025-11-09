"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-moss-950 px-6">
        <div className="max-w-lg rounded-3xl border border-white/20 bg-white/10 p-10 text-center text-white shadow-2xl backdrop-blur">
          <span className="text-5xl">🛠️</span>
          <h2 className="mt-6 text-3xl font-semibold">We hit a snag</h2>
          <p className="mt-4 text-sm text-white/80">
            A global error occurred while rendering the app. Please try again. If the issue
            persists, share the error id with the Marsala team.
          </p>
          {error?.digest && (
            <p className="mt-3 text-xs text-white/60">Error ID: {error.digest}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-moss-900 transition hover:bg-cream-100"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Go to homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

