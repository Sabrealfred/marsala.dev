"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cream-50 px-6 text-center">
      <div className="rounded-3xl border-2 border-moss-200 bg-white px-8 py-10 shadow-xl">
        <span className="text-5xl">⚠️</span>
        <h2 className="mt-6 text-2xl font-bold text-moss-950">Something went wrong</h2>
        <p className="mt-3 text-sage-700">
          The page crashed while rendering. You can try again or go back to the homepage.
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs text-sage-500">Error ID: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-moss-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-hover"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border-2 border-moss-400 px-6 py-3 text-sm font-semibold text-moss-700 transition hover:bg-moss-50"
          >
            Back home
          </a>
        </div>
      </div>
    </div>
  );
}

