import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — GudForUs",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafaf7] px-6 py-16 text-[#1a1a17]">
      <div className="w-full max-w-2xl rounded-[32px] border border-[#e5e3dd] bg-white p-10 text-center shadow-[0_20px_60px_rgba(26,26,23,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2d6a4f]">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          This page wandered off the shelf.
        </h1>
        <p className="mt-5 text-base leading-8 text-[#5c5c52]">
          The page you were looking for is not here anymore, but the main app,
          blog, and popular ingredient guides are still easy to reach.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#2d6a4f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#40916c]"
          >
            Go to homepage
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-[#d9d6cd] bg-white px-6 py-3 text-sm font-semibold text-[#1a1a17] transition hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
          >
            Browse the blog
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          {[
            "/ingredient-scanner-app",
            "/allergy-ingredient-scanner",
            "/cosmetic-ingredient-scanner",
            "/yuka-alternative",
          ].map((href) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl border border-[#e5e3dd] bg-[#fafaf7] px-5 py-4 text-sm font-medium text-[#1a1a17] transition hover:border-[#2d6a4f]/30 hover:bg-[#f7fbf7] hover:text-[#2d6a4f]"
            >
              {href.replaceAll("-", " ").replace("/", "")}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
