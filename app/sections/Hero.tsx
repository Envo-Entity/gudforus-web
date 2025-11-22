"use client";

import React, { useEffect, useState } from "react";
import type { JSX } from "react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export default function Hero(): JSX.Element {
  return (
    <section className="relative w-full flex items-center min-h-[calc(100vh-84px)] lg:h-[calc(100vh-84px)] lg:max-h-[1440px] py-12 lg:py-0">
      <div className="mx-auto max-w-7xl px-6 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start order-1">
            <HeroLeft />
          </div>

          {/* Right Content (Book) */}
          <div className="lg:col-span-2 w-full order-2">
            <HeroRight />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLeft(): JSX.Element {
  return (
    <div className="relative flex flex-col items-center lg:items-start max-[420px]:items-start w-full">
      <Title />
      <div className="mt-4 lg:mt-0">
        <Strapline />
      </div>
    </div>
  );
}

function Title(): JSX.Element {
  return (
    <div className="relative">
      <div
        className="leading-none text-foreground"
        style={{
          fontFamily: "var(--font-dm-serif-display), Georgia, serif",
          letterSpacing: "-0.01em",
        }}
      >
        <div className="flex items-center justify-center lg:justify-start max-[420px]:justify-start flex-wrap text-7xl sm:text-7xl md:text-8xl xl:text-9xl 2xl:text-9xl font-normal tracking-tight text-center lg:text-left max-[420px]:text-left">
          <span>gud for us.</span>
        </div>
      </div>
    </div>
  );
}

function Strapline(): JSX.Element {
  return (
    <div className="mt-2 text-4xl md:text-5xl lg:text-6xl text-center lg:text-left max-[420px]:text-left">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="first"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
        }}
        containerClassName="justify-center lg:justify-start max-[420px]:justify-start"
        elementLevelClassName="pb-[6px]"
      >
        {`non negotiables`}
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="last"
        reverse={true}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 0.5,
        }}
        containerClassName="justify-center lg:justify-start max-[420px]:justify-start"
      >
        {`of Health ❤️`}
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="center"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 1.1,
        }}
        containerClassName="justify-center lg:justify-start max-[420px]:justify-start"
        elementLevelClassName="pb-[6px]"
      >
        {`and ✨ wellbeing`}
      </VerticalCutReveal>
    </div>
  );
}

function HeroRight(): JSX.Element {
  return (
    <div className="relative w-full flex justify-center lg:block">
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
    const t1 = setTimeout(() => setIsOpen(true), 1500);
    const t2 = setTimeout(() => setIsOpen(false), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
            // The sibling fallback div will be shown via state
            setShowFallback(true);
          }}
        />
      ) : null}

      <div
        className="absolute inset-0 bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700 items-center justify-center text-foreground text-6xl font-bold hidden"
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
