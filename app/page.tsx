import Hero from "./sections/Hero";
import Pillars from "./sections/Pillars";
import Info from "./sections/Info";
import Review from "./sections/Review";
import Story from "./sections/Story";
import Checkout from "./sections/Checkout";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import FlipBook from "@/components/flipbook";

export default function Page() {
  const bookPages = [
    {
      front: {
        cover: true,
        content: (
          <>
            <h1>FlipBook</h1>
            <p>
              2024.
              <br />
              Second edition
            </p>
          </>
        ),
      },
      back: {
        content: (
          <>
            <h2>Responsive</h2>
            <p>
              Fully responsive CSS flip book, thanks to the <code>cqmin</code>{" "}
              unit.
            </p>
          </>
        ),
      },
    },
    {
      front: {
        content: (
          <p>
            Even more, the book height is dictated by the amount of content in
            the tallest page. The only thing you need to take care of is how
            much text you put into a page.
          </p>
        ),
      },
      back: {
        hidePageNumber: true,
        content: <img src="https://picsum.photos/id/24/600/600" alt="Img 1" />,
      },
    },
    {
      front: {
        content: (
          <>
            <h2>Scroll Based</h2>
            <p>
              Now with scroll-based page turning! Simply scroll up or down to
              flip through the pages. The page transitions are smooth and
              responsive to your scrolling.
            </p>
          </>
        ),
      },
      back: {
        content: (
          <p>
            Additionally you can still click on pages to navigate. You can also
            have multiple independent flip books in a single document. You're
            all covered.
          </p>
        ),
      },
    },
    {
      front: {
        content: (
          <>
            <h2>Crafting CSS magic</h2>
            <p>
              The opened (<i>viewing</i>) pages of the flip book are always kept
              at the same elevation. This is necessary if your book has no
              inclination (is top-down-view). Have you noticed that you can also
              click on the pages edge? CSS will nicely animate the group of
              pages to skip with a staggered animation.
            </p>
          </>
        ),
      },
      back: {
        content: (
          <p>
            Like in this demo, you can change the perspective of the parent
            container and change the X axis rotation of the book for extra
            effect.
          </p>
        ),
      },
    },
    {
      front: {
        content: (
          <p>
            The necessary FlipBook's CSS is barely 30 lines, there is no swipe,
            natural page flip angling, complex shadows, etc. in order to keep it
            as simple as possible.
          </p>
        ),
      },
      back: {
        content: (
          <p>
            Feel free to use and abuse this code. Drop me a line if you find it
            cool or useful, or just want to say <i>hi</i>.
          </p>
        ),
      },
    },
    {
      front: {
        hidePageNumber: true,
        content: (
          <img src="https://picsum.photos/id/1073/600/600" alt="Img 2" />
        ),
      },
      back: {
        cover: true,
        content: (
          <>
            <h3>That's all, folks</h3>
            <p>
              FlipBook code and content:
              <br />
              <a
                href="https://stackoverflow.com/users/383904/roko-c-buljan"
                target="_blank"
                rel="noopener noreferrer"
              >
                Roko C. Buljan
              </a>
              <br />
              Original idea:
              <br />
              <a
                href="https://stackoverflow.com/a/76978444/383904"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stack Overflow answer
              </a>
              <br />
              Images by: picsum.photos
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
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1558888400-16e560ae7f82?q=80&w=300&auto=format&fit=crop')] bg-[length:300px_300px]"></div>
      </div>

      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-neutral-800 focus:text-white"
      >
        Skip to content
      </a>

      {/* Header */}
      <Header />

      <main id="main" className="relative z-10">
        <Hero />

        <section
          id="flipbook-section"
          className="relative"
          style={{ ["--total-pages" as any]: bookPages.length }}
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

        <Pillars />
        <Info />
        <Review />
        <Contact />
        <Story />
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
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-md bg-neutral-900 ring-1 ring-white/10 grid place-content-center text-emerald-300 text-xs font-semibold"
            style={{ letterSpacing: "-0.02em" }}
          >
            G
          </div>
          <span className="text-sm text-neutral-300">GoodForUs</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <a
            href="#cards"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Pillars
          </a>
          <a
            href="#story"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Our Story
          </a>
          <a
            href="#testimonials"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Voices
          </a>
          <a
            href="#community"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
          >
            Community
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#checkout"
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-neutral-900/70 hover:bg-neutral-800 active:scale-[0.99] transition px-3 py-2 text-sm ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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
        <span className="absolute inset-0 rounded-full ring-1 ring-black/10 pointer-events-none"></span>
      </a>
    </div>
  );
}

// Simple icon components
function BookOpenIcon() {
  return (
    <svg
      className="w-4 h-4 text-neutral-300"
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
