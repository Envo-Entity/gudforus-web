export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <HeroLeft />
          <HeroRight />
        </div>
      </div>
    </section>
  );
}

function HeroLeft() {
  return (
    <div className="relative">
      <Badge />
      <Title />
      <Strapline />
      <Description />
    </div>
  );
}

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300 mb-6">
      <SparklesIcon />
      <span>New • Premium Digital Book</span>
    </div>
  );
}

function Title() {
  return (
    <h1
      className="leading-none text-white"
      style={{
        fontFamily: "'Space Grotesk', ui-sans-serif, Inter, system-ui",
        letterSpacing: "-0.02em",
      }}
    >
      <span className="block text-[64px] sm:text-[88px] md:text-[112px] lg:text-[128px] font-semibold tracking-tight">
        GUD
      </span>
      <span className="block text-[64px] sm:text-[88px] md:text-[112px] lg:text-[128px] font-semibold tracking-tight">
        FOR
      </span>
      <span className="block text-[64px] sm:text-[88px] md:text-[112px] lg:text-[128px] font-semibold tracking-tight">
        US
      </span>
    </h1>
  );
}

function Strapline() {
  return (
    <p className="mt-6 text-[11px] sm:text-xs uppercase tracking-[0.38em] text-neutral-300/90">
      NON-NEGOTIABLES OF HEALTH AND WELLBEING
    </p>
  );
}

function Description() {
  return (
    <p
      className="mt-5 max-w-xl text-sm sm:text-base text-neutral-300"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      A tactile, cinematic reading experience exploring the foundations of a
      life well-lived — health, nature, and sustainable choices. Scroll to
      explore. Hover to feel.
    </p>
  );
}

function HeroRight() {
  return (
    <div className="relative">
      <AccessiblePreview />
      <BookCard />
      <InteractionHint />
      <FallbackNote />
    </div>
  );
}

function AccessiblePreview() {
  return (
    <div className="sr-only" aria-live="polite">
      Preview pages: Page 1: Placeholder introduction text about health as the
      foundation of life... Page 2: Placeholder content about nature and our
      rhythms... Page 3: Placeholder content about sustainable living
      principles...
    </div>
  );
}

function BookCard() {
  return (
    <div className="group relative mx-auto w-[86%] sm:w-[420px] h-[560px] [perspective:1600px]">
      <GlowFloor />
      <button
        aria-label="Open book preview"
        className="relative w-full h-full cursor-grab active:cursor-grabbing rounded-xl bg-neutral-900/70 ring-1 ring-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] transform-gpu transition duration-500 ease-out motion-reduce:transition-none [transform-style:preserve-3d] hover:-rotate-y-6 hover:-rotate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <CoverFront />
        <PageStack />
        <Spine />
        <BackCover />
        <NeonOutline />
      </button>
    </div>
  );
}

function GlowFloor() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-6 -bottom-6 h-24 rounded-[100%] blur-2xl bg-emerald-500/15 opacity-60"
    ></div>
  );
}

function CoverFront() {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden transform-gpu [transform:translateZ(40px)]">
      <img
        src="https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1200&auto=format&fit=crop"
        alt="Good For Us — cover art placeholder"
        className="h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-emerald-500/5"></div>
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -inset-y-16 rotate-12 bg-gradient-to-br from-emerald-400/10 via-white/5 to-indigo-400/10 blur-3xl"
      ></div>
    </div>
  );
}

function PageStack() {
  return (
    <>
      <div className="absolute inset-1 rounded-lg bg-neutral-900/90 ring-1 ring-white/10 transform-gpu [transform:translateZ(25px)]"></div>
      <div className="absolute inset-2 rounded-md bg-white/95 transform-gpu [transform:translateZ(20px)] overflow-hidden">
        <div className="absolute inset-0 grid grid-rows-3 text-neutral-900 text-[13px] leading-relaxed p-6">
          <p>Page 1 — Health as foundation. Placeholder for supplied text.</p>
          <p>Page 2 — Nature's rhythms. Placeholder for supplied text.</p>
          <p>
            Page 3 — Sustainability and future. Placeholder for supplied text.
          </p>
        </div>
      </div>
    </>
  );
}

function Spine() {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-6 rounded-l-xl bg-neutral-900 ring-1 ring-white/10 transform-gpu [transform:rotateY(-90deg)_translateZ(6px)]"></div>
  );
}

function BackCover() {
  return (
    <div className="absolute inset-0 rounded-xl bg-neutral-900 ring-1 ring-white/10 transform-gpu [transform:translateZ(-6px)]"></div>
  );
}

function NeonOutline() {
  return (
    <div
      aria-hidden="true"
      className="absolute -inset-0.5 rounded-[14px] opacity-0 group-hover:opacity-100 transition duration-500 ease-out bg-gradient-to-r from-emerald-400/25 via-sky-400/20 to-indigo-400/25 blur"
    ></div>
  );
}

function InteractionHint() {
  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
      <MousePointerIcon />
      <span>Hover to tilt • Scroll for more</span>
    </div>
  );
}

function FallbackNote() {
  return (
    <div className="mt-2 text-[11px] text-neutral-500 text-center">
      Interactive 3D book preview upgrades automatically when enhanced.
    </div>
  );
}

// Icon Components
function SparklesIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-emerald-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

function MousePointerIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
      />
    </svg>
  );
}
