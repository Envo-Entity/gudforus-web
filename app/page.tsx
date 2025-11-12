import Hero from "./sections/Hero";
import Pillars from "./sections/Pillars";
import Info from "./sections/Info";
import Review from "./sections/Review";
import Story from "./sections/Story";
import Checkout from "./sections/Checkout";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import FlipBook from "@/components/flipbook";
import Image from "next/image";

export default function Page() {
  const bookPages = [
    {
      front: {
        cover: true,
        content: (
          <>
            {/* <h1>The Non-Negotiables of Life</h1>
            <p>
              Three essentials that shape a meaningful existence:
              <br />
              Health, Nature, and Sustainability.
              <br />
              2025 Edition
            </p> */}
          </>
        ),
      },
      back: {
        hidePageNumber: true,
        content: (
          <img
            src="https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/health.jpg"
            alt="Health"
          />
        ),
      },
    },
    {
      front: {
        content: (
          <>
            <h2>Health</h2>
            <p>
              The first non-negotiable. Without health, there's no energy to
              create, connect, or care. It's the root from which every good
              thing grows.
            </p>
          </>
        ),
      },
      back: {
        hidePageNumber: true,
        content: (
          <img
            src="https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/nature.jpg"
            alt="Nature"
          />
        ),
      },
    },
    {
      front: {
        content: (
          <>
            <h2>Nature</h2>
            <p>
              The second non-negotiable. Nature gives without asking — air to
              breathe, beauty to feel, balance to learn from. Protecting it
              means honoring life itself.
            </p>
          </>
        ),
      },
      back: {
        hidePageNumber: true,
        content: (
          <img
            src="https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/sustainable.jpg"
            alt="Sustainability"
          />
        ),
      },
    },
    {
      front: {
        content: (
          <>
            <h2>Sustainability</h2>
            <p>
              The third non-negotiable. Living sustainably means living
              consciously — making choices today that leave space for tomorrow
              to thrive.
            </p>
          </>
        ),
      },
      back: {
        cover: true,
        content: (
          <>
            <h3>These are the non-negotiables.</h3>
            <p>
              Health. Nature. Sustainability.
              <br />
              Three truths, one promise — to live in balance with ourselves and
              the world.
            </p>
          </>
        ),
      },
    },
  ];

  return (
    <>
      {/* Global grain + glow overlays */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(30%_30%_at_90%_10%,rgba(99,102,241,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.08]"></div>
      </div>

      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground"
      >
        Skip to content
      </a>

      {/* Header */}
      <Header />

      <main id="main" className="relative z-10">
        <Hero />

        <section
          id="flipbook-section"
          className="relative max-sm:hidden"
          style={{
            ["--total-pages" as any]: bookPages.length,
          }}
        >
          {" "}
          <div id="scroll-spacer" className="scroll-spacer"></div>
          <div id="book-container" className="book-container">
            <FlipBook pages={bookPages} />
          </div>
          <div id="scroll-indicator" className="scroll-indicator">
            Scroll to flip pages
          </div>
        </section>

        <Story />
        <Pillars />
        <Info />
        <Review />
        <Contact />
        <Checkout />
      </main>

      <Footer />

      {/* Sticky CTA */}
      <StickyCTA />
    </>
  );
}

function Header() {
  return (
    <header className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-md overflow-hidden"
            style={{ letterSpacing: "-0.02em" }}
          >
            <Image src={"/favicon.png"} height={50} width={50} alt="Logo" />
          </div>
          <span className="text-sm text-foreground">gud for us</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-foreground">
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
        <div className="flex items-center gap-3">
          <a
            href="#checkout"
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-background/70 hover:bg-background active:scale-[0.99] transition px-3 py-2 text-sm ring-1 ring-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <BookOpenIcon />
            <span>Preview</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href="#checkout"
        className="group inline-flex items-center gap-3 rounded-full bg-emerald-500 px-5 py-3 text-neutral-950 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition will-change-transform hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
        aria-label="Buy now"
      >
        <ShoppingCartIcon />
        <span className="text-sm font-semibold">Buy now</span>
        <ArrowUpRightIcon />
        <span className="absolute inset-0 rounded-full ring-1 ring-foreground pointer-events-none"></span>
      </a>
    </div>
  );
}

// Simple icon components
function BookOpenIcon() {
  return (
    <svg
      className="w-4 h-4 text-foreground"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function ShoppingCartIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
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
        d="M7 17L17 7m0 0H7m10 0v10"
      />
    </svg>
  );
}
