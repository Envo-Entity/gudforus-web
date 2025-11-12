"use client";
import React, { useEffect, useState } from "react";
import type { JSX } from "react";

export default function Hero(): JSX.Element {
  return (
    <section className="relative md:h-[calc(100vh-84px)] max-h-[1440px] md:mt-[30px] lg:mt-2 mt flex items-center">
      <div className="mx-auto max-w-6xl px-6 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <HeroLeft />
          <HeroRight />
        </div>
      </div>
    </section>
  );
}

function HeroLeft(): JSX.Element {
  return (
    <div className="relative">
      <Title />
      <Strapline />
    </div>
  );
}

function Title(): JSX.Element {
  return (
    <div className="relative">
      {/* Top-left doodles - hearts and sparkles */}
      <svg
        className="absolute max-sm:-top-4 max-sm:-left-4 -top-10 -left-8 w-16 h-16 md:w-20 md:h-20 text-emerald-500/50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Small heart */}
        <path
          d="M25 35 C25 30, 30 27, 33 30 C36 27, 41 30, 41 35 C41 42, 33 48, 33 48 C33 48, 25 42, 25 35 Z"
          fill="currentColor"
        />

        {/* Star */}
        <path
          d="M60 25 L62 32 L69 32 L63.5 36.5 L65.5 43.5 L60 39 L54.5 43.5 L56.5 36.5 L51 32 L58 32 Z"
          fill="currentColor"
        />

        {/* Small sparkle crosses */}
        <path
          d="M20 60 L20 66 M23 63 L17 63"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M75 15 L75 20 M77.5 17.5 L72.5 17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom-right doodles - checkmarks, stars, and hearts */}
      <svg
        className="absolute -bottom-6 -right-5 max-sm:-bottom-6 max-sm:-right-10 w-20 h-20 md:w-24 md:h-24 text-emerald-500/50 max-sm:hidden"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Check mark / V sign */}
        <path
          d="M25 40 L32 47 L45 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Small outlined heart */}
        <path
          d="M65 25 C65 21, 69 19, 72 21.5 C75 19, 79 21, 79 25 C79 30, 72 35, 72 35 C72 35, 65 30, 65 25 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Small filled star */}
        <path
          d="M30 70 L31.5 74.5 L36 75 L32.5 78 L33.5 82.5 L30 80 L26.5 82.5 L27.5 78 L24 75 L28.5 74.5 Z"
          fill="currentColor"
        />

        {/* Sparkle */}
        <path
          d="M70 65 L70 70 M72.5 67.5 L67.5 67.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Tiny dots for extra detail */}
        <circle cx="55" cy="50" r="2" fill="currentColor" />
        <circle cx="82" cy="80" r="1.5" fill="currentColor" />
      </svg>

      <h1
        className="leading-none text-foreground max-sm:hidden"
        style={{
          fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
          letterSpacing: "-0.02em",
        }}
      >
        <span className="block max-sm:text-center text-7xl sm:text-7xl md:text-8xl xl:text-9xl 2xl:text-9xl font-semibold tracking-tight">
          <span>g</span>ud for u<span>s</span>
        </span>
      </h1>
      <h1
        className="leading-none text-foreground sm:hidden"
        style={{
          fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
          letterSpacing: "-0.02em",
        }}
      >
        <span className="block text-7xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tight leading-[1.3]">
          gud
        </span>
        <span className="block text-7xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tight leading-[0.85]">
          for
        </span>
        <span className="block text-7xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tight leading-[0.5]">
          us
        </span>
      </h1>
    </div>
  );
}

function Strapline(): JSX.Element {
  return (
    <>
      <p className="mt-2 max-sm:mt-5 max-sm:text-center sm:pl-2 text-lg uppercase tracking-widest text-foreground max-sm:hidden">
        NON-NEGOTIABLES OF HEALTH AND WELLBEING
      </p>
      <p className="mt-8 text-lg uppercase tracking-widest text-foreground sm:hidden">
        NON-NEGOTIABLES OF HEALTH AND WELLBEING
      </p>
    </>
  );
}

function HeroRight(): JSX.Element {
  return (
    <div className="relative">
      <BookCard />
    </div>
  );
}

function BookCard(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleClick = () => setIsOpen((v) => !v);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
  }, []);

  return (
    <div className="relative lg:ml-auto max-lg:mx-auto w-full max-w-sm aspect-[10.2/16]">
      <GlowFloor />
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={isOpen ? "Close book preview" : "Open book preview"}
        className="relative w-full h-full cursor-pointer rounded-xl bg-background ring-1 ring-foreground/10 shadow-2xl transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 overflow-hidden"
        style={{
          transform: isOpen
            ? ("perspective(1600px) rotateY(-25deg) scale(0.95)" as React.CSSProperties["transform"])
            : ("perspective(1600px) rotateY(0deg) scale(1)" as React.CSSProperties["transform"]),
        }}
      >
        <CoverFront isOpen={isOpen} />
        <PageStack isOpen={isOpen} />
        <NeonOutline isOpen={isOpen} />
      </button>
    </div>
  );
}

function GlowFloor(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-6 -bottom-6 h-24 rounded-full blur-2xl bg-emerald-500/20"
    />
  );
}

type CoverFrontProps = {
  isOpen: boolean;
};

function CoverFront({ isOpen }: CoverFrontProps): JSX.Element {
  const [showFallback, setShowFallback] = useState<boolean>(false);

  return (
    <div
      className="absolute inset-0 rounded-xl overflow-hidden transition-all duration-700 ease-out"
      style={{
        transform: isOpen ? "rotateY(-140deg)" : "rotateY(0deg)",
        transformOrigin: "left center",
      }}
    >
      {!showFallback ? (
        <img
          src="https://opfjwckyarxymdkzuwdk.supabase.co/storage/v1/object/public/envo/temp-gud-for-us.jpeg"
          alt="Good For Us — cover art"
          className="h-full w-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const next = img.nextElementSibling as HTMLElement | null;
            if (next) next.style.display = "flex";
            setShowFallback(true);
          }}
        />
      ) : null}

      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 items-center justify-center text-foreground text-6xl font-bold hidden"
        style={{ display: showFallback ? "flex" : "none" }}
      >
        <div className="text-center">
          <div className="text-7xl font-bold mb-2">gud</div>
          <div className="text-7xl font-bold mb-2">for</div>
          <div className="text-7xl font-bold">us</div>
        </div>
      </div>
    </div>
  );
}

type PageStackProps = {
  isOpen: boolean;
};

function PageStack({ isOpen }: PageStackProps): JSX.Element {
  return (
    <div
      className="absolute inset-0 rounded-xl bg-amber-100/30 transition-opacity duration-700"
      style={{
        opacity: isOpen ? 1 : 0,
      }}
    >
      {/* Book page content — short, elegant, cursive handwriting style */}
      <div className="absolute inset-0 p-12 overflow-auto flex items-start justify-center">
        <div
          style={{
            maxWidth: 540,
            fontFamily: "'Dancing Script', 'Segoe UI', Georgia, serif",
            lineHeight: 1.7,
            color: "#0f172a", // neutral-900
            textAlign: "left",
            transform: "translateY(12%)",
            whiteSpace: "pre-wrap",
          }}
          className="text-sm sm:text-base md:text-lg lg:text-xl"
        >
          <p>
            Microplastics are everywhere — in the seas we love, the air we
            breathe, and the food we eat. Learn how they reach our bodies, what
            they may do, and how small, steady choices can help set us free.
          </p>
        </div>
      </div>
    </div>
  );
}

type NeonOutlineProps = {
  isOpen: boolean;
};

function NeonOutline({ isOpen }: NeonOutlineProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="absolute -inset-1 rounded-xl transition-opacity duration-700 blur-xl pointer-events-none"
      style={{
        opacity: isOpen ? 1 : 0.3,
      }}
    />
  );
}
