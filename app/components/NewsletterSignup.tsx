"use client";

import { useState, useRef } from "react";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";
    if (!email) return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setState("error");
    }
  }

  return (
    <section
      style={{ backgroundColor: "#1c2b14" }}
      className="px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">

        {/* Eyebrow */}
        <p
          style={{ color: "#6b8f52", letterSpacing: "0.18em" }}
          className="text-xs font-semibold uppercase"
        >
          Stay in the know
        </p>

        {/* Heading */}
        <h2
          style={{ color: "#f5f0e8" }}
          className="mt-3 font-display text-3xl tracking-tight sm:text-4xl"
        >
          Health tips worth reading.
        </h2>

        {/* Subtext */}
        <p
          style={{ color: "#8fab7a" }}
          className="mt-4 text-base leading-7"
        >
          Ingredient spotlights, label-reading guides, and what&apos;s new in Gud — straight to your inbox. No fluff.
        </p>

        {/* Form / success */}
        <div className="mt-8">
          {state === "success" ? (
            <div className="flex flex-col items-center gap-3">
              <div
                style={{ backgroundColor: "#2e4421" }}
                className="flex h-12 w-12 items-center justify-center rounded-full"
              >
                <svg
                  className="h-6 w-6"
                  style={{ color: "#8fab7a" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ color: "#f5f0e8" }} className="text-base font-medium">
                You&apos;re on the list.
              </p>
              <p style={{ color: "#6b8f52" }} className="text-sm">
                We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-center"
            >
              <div className="flex-1 sm:max-w-sm">
                <input
                  ref={inputRef}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  disabled={state === "loading"}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    borderColor: state === "error" ? "#f87171" : "rgba(255,255,255,0.15)",
                    color: "#f5f0e8",
                  }}
                  className="w-full rounded-full border px-5 py-3 text-sm outline-none transition placeholder:text-[#4a6e35] focus:border-[#8fab7a] focus:ring-0 disabled:opacity-60"
                />
                {state === "error" && (
                  <p className="mt-2 text-left text-xs text-red-400">{errorMsg}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                style={{
                  backgroundColor: "#f5f0e8",
                  color: "#1c2b14",
                }}
                className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              >
                {state === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Privacy note */}
        {state !== "success" && (
          <p style={{ color: "#4a6e35" }} className="mt-4 text-xs">
            No spam. Unsubscribe anytime.
          </p>
        )}

      </div>
    </section>
  );
}
