"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/50 backdrop-blur-md border-b border-white/50">
      <div className="mx-auto max-w-6xl px-6 py-3 md:py-4.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-md overflow-hidden"
            style={{ letterSpacing: "-0.02em" }}
          >
            <Image src={"/favicon.png"} height={70} width={70} alt="Logo" />
          </div>
          <span
            className="leading-none text-foreground"
            style={{
              fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="block max-sm:text-center text-2xl font-bold tracking-tight">
              <span>g</span>ud for u<span>s</span>
            </span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-base text-foreground">
          <a
            href="#cards"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Pillars
          </a>
          <a
            href="#story"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Our Story
          </a>
          <a
            href="#testimonials"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Voices
          </a>
          <a
            href="#community"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Community
          </a>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            className="relative z-60 inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
            <div className="hamburger">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileOpen ? (
                  <>
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 18L18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  <>
                    <path
                      d="M4 7h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 12h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile full-screen nav overlay */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <nav className="relative z-50 h-full bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 px-6">
          <a
            href="#cards"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Pillars
          </a>
          <a
            href="#story"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Our Story
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Voices
          </a>
          <a
            href="#community"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Community
          </a>

          {/* bottom site icon + title */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-md overflow-hidden">
              <Image src={"/favicon.png"} height={40} width={40} alt="Logo" />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">gud for us</div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
