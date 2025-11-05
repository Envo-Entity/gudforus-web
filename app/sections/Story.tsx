export default function Story() {
  return (
    <section id="story" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <StoryCopy />
          <StoryVisual />
        </div>
      </div>
    </section>
  );
}

function StoryCopy() {
  return (
    <div>
      <h2
        className="text-2xl sm:text-3xl text-white tracking-tight font-semibold"
        style={{
          fontFamily: "'Space Grotesk', ui-sans-serif, Inter, system-ui",
        }}
      >
        Our Story
      </h2>
      <p className="mt-1 text-sm uppercase tracking-[0.28em] text-neutral-400">
        Born from a Need for Clarity
      </p>
      <div
        className="mt-6 space-y-4 text-neutral-300 text-[15px]"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        <p>
          In an age of endless information and constant disruption, we found
          ourselves searching for what truly matters. The noise was
          overwhelming, but beneath it all, certain truths remained constant.
        </p>
        <p>
          GoodForus emerged from this search — a guide to help others navigate
          modern life while staying rooted in timeless principles. Health,
          nature, and sustainability aren't trends. They're the foundations of a
          life well-lived.
        </p>
        <p>
          This is more than an ebook. It's a movement toward conscious living,
          supported by design, grounded in facts, and inspired by the wisdom of
          nature.
        </p>
      </div>
    </div>
  );
}

function StoryVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-12 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(99,102,241,0.25),transparent_60%)] blur-3xl opacity-30"></div>
      <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-[28px] overflow-hidden ring-1 ring-white/10 bg-neutral-900/60">
        <img
          src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
          alt="Soft photographic lighting placeholder"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/40"></div>
        <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-300">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/60 ring-1 ring-white/10 px-3 py-1">
            <LayersIcon />
            <span>Cinematic texture • gentle bloom</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayersIcon() {
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
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );
}
