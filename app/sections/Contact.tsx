export default function Contact() {
  return (
    <section id="community" className="relative border-t border-foreground/20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <CommunityInfo />
          <JoinForm />
        </div>
      </div>
    </section>
  );
}

function CommunityInfo() {
  return (
    <div className="md:col-span-2">
      <h3
        className="text-xl sm:text-2xl text-foreground tracking-tight font-semibold"
        style={{
          fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
        }}
      >
        🌿 Join the Guders
      </h3>
      <p
        className="mt-3 text-sm text-foreground"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        A community of conscious individuals living intentionally, embracing
        health, nature, and sustainable practices.
      </p>
    </div>
  );
}

function JoinForm() {
  return (
    <form className="relative flex gap-3">
      <label htmlFor="email-community" className="sr-only">
        Email address
      </label>
      <input
        id="email-community"
        type="email"
        required
        placeholder="Enter your email"
        className="w-full md:w-auto flex-1 rounded-xl bg-background/60 ring-1 ring-white/10 px-4 py-3 text-sm text-foreground placeholder:text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-neutral-950 text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
      >
        <LeafIcon />
        <span>Join</span>
      </button>
    </form>
  );
}

function LeafIcon() {
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
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}
