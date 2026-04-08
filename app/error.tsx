"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafaf7] px-6 py-16 text-[#1a1a17]">
      <div className="w-full max-w-xl rounded-[28px] border border-[#e5e3dd] bg-white p-8 shadow-[0_20px_60px_rgba(26,26,23,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2d6a4f]">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight">
          We hit a snag loading this page.
        </h1>
        <p className="mt-4 text-base leading-8 text-[#5c5c52]">
          Try again, or head back to the homepage if you were following an old
          link.
        </p>
        {error.digest ? (
          <p className="mt-4 text-sm text-[#8a8a7e]">Reference: {error.digest}</p>
        ) : null}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#2d6a4f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#40916c]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[#d9d6cd] bg-white px-6 py-3 text-sm font-semibold text-[#1a1a17] transition hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
          >
            Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
