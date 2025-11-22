"use client";
import Hero from "./sections/Hero";
import Pillars from "./sections/Pillars";
import Info from "./sections/Info";
import Review from "./sections/Review";
import Story from "./sections/Story";
import Checkout from "./sections/Checkout";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import FlipBook from "@/components/flipbook";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  const bookPages = [
    {
      front: {
        cover: true,
        content: <></>,
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
    <div className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(30%_30%_at_90%_10%,rgba(99,102,241,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.08]"></div>
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground"
      >
        Skip to content
      </a>

      <main id="main" className="relative z-10 w-full overflow-hidden">
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
        </section>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Review />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Story />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Pillars />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Info />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Contact />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Checkout />
        </motion.div>
      </main>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>

      <StickyCTA />
    </div>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Link
        href={
          "https://thisisatesttrustme.lemonsqueezy.com/buy/b6a6c57a-ef37-4d85-b90a-431787a44ca4"
        }
        className="group inline-flex items-center gap-3 rounded-full bg-emerald-500 px-5 py-3 text-neutral-950 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition will-change-transform hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
        aria-label="Buy now"
        target="_blank"
      >
        <ShoppingCartIcon />
        <span className="text-sm font-semibold">Buy now</span>
        <ArrowUpRightIcon />
        <span className="absolute inset-0 rounded-full ring-1 ring-foreground pointer-events-none"></span>
      </Link>
    </div>
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
