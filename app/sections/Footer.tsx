export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <FooterLeft />
          <div className="hidden lg:block"></div>
          <FooterRight />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}

function FooterLeft() {
  return (
    <div>
      <Logo />
      <FooterLinks />
      <FooterSubscribe />
      <Copyright />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 rounded-md bg-neutral-900 ring-1 ring-white/10 grid place-content-center text-emerald-300 text-xs font-semibold"
        style={{ letterSpacing: "-0.02em" }}
      >
        G
      </div>
      <span className="text-sm text-neutral-300">GoodForUs</span>
    </div>
  );
}

function FooterLinks() {
  const links = [
    { href: "#cards", label: "Pillars" },
    { href: "#story", label: "Our Story" },
    { href: "#testimonials", label: "Voices" },
    { href: "#community", label: "Community" },
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-400">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-1 py-0.5 w-fit"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function FooterSubscribe() {
  return (
    <form className="mt-6 flex items-center gap-3">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="Your email"
        className="w-full rounded-xl bg-neutral-900/60 ring-1 ring-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-neutral-950 text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
      >
        <SendIcon />
        <span>Subscribe</span>
      </button>
    </form>
  );
}

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <p className="mt-4 text-xs text-neutral-500">
      © {year} GoodForUs. All rights reserved.
    </p>
  );
}

function FooterRight() {
  return (
    <div className="relative">
      <div className="relative ml-auto w-full max-w-[320px] aspect-[9/16] rounded-[28px] bg-neutral-900/60 ring-1 ring-white/10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
          alt="Vertical artwork placeholder"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/60"></div>
        <div className="absolute inset-x-4 bottom-4">
          <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-200/90 text-center">
            NON-NEGOTIABLES OF HEALTH AND WELLBEING
          </p>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/20"
        ></div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        ></div>
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-6">
      <a
        href="#community"
        className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
      >
        <UsersIcon />
        <span>Join the Guders</span>
        <ArrowRightIcon />
      </a>
    </div>
  );
}

function SendIcon() {
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
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      className="w-4 h-4 text-emerald-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
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
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}
