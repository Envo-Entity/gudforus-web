import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./blog-posts";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Gud For Us Blog | Ingredient Labels, Allergies, and Smarter Scanning",
  description:
    "Read Gud For Us articles about ingredient labels, food and cosmetic scanning, hidden allergens, and better product decisions.",
  alternates: {
    canonical: "https://gudforus.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Gud For Us Blog",
    description:
      "Articles about ingredient labels, allergens, food scanning, cosmetic scanning, and better product decisions.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gud For Us Blog",
    description:
      "Articles about ingredient labels, allergens, food scanning, cosmetic scanning, and better product decisions.",
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function BlogIndexPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#1a1a17] font-sans overflow-x-hidden selection:bg-[#d8f3dc] selection:text-[#1a1a17]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="relative px-6 pt-[140px] pb-20 text-center overflow-hidden">
        {/* Background Gradients from Yuka Alternative */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45, 106, 79, 0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(82, 183, 136, 0.04) 0%, transparent 60%)"
        }} />

        <div className="relative mx-auto max-w-4xl z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d8f3dc] text-[#2d6a4f] font-semibold text-[0.78rem] uppercase tracking-[0.04em] mb-7 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse"></span>
            Gud For Us Blog
          </div>

          <h1 className="font-display text-[clamp(2.4rem,5.5vw,3.8rem)] leading-[1.12] tracking-[-0.025em] max-w-[780px] mx-auto mb-6 text-[#1a1a17]">
            Better health decisions start with <em className="text-[#2d6a4f] italic">labels you can understand.</em>
          </h1>

          <p className="text-[1.12rem] text-[#5c5c52] max-w-[560px] mx-auto mb-10 leading-[1.7]">
            Straightforward guides on ingredients, hidden allergens, and product scanning so you can move from confusion to clarity.
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center items-center">
            <Link
              href={blogPosts[0].href}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#2d6a4f] text-white font-semibold text-[0.95rem] hover:bg-[#40916c] hover:-translate-y-[2px] shadow-[0_4px_20px_rgba(45,106,79,0.25)] hover:shadow-[0_8px_30px_rgba(45,106,79,0.3)] transition-all duration-300"
            >
              Start reading
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-[#1a1a17] font-semibold text-[0.95rem] border-[1.5px] border-[#e5e3dd] hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-[#edf7ee] transition-all duration-300"
            >
              Explore the app
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="mx-auto max-w-[1120px] px-6 pb-24 relative z-10">
        <div className="mb-10 rounded-[28px] border border-[#edecea] bg-white/80 p-6 shadow-[0_4px_20px_rgba(26,26,23,0.04)] backdrop-blur">
          <div className="mb-5">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
              Explore By Use Case
            </p>
            <h2 className="mt-2 font-display text-2xl text-[#1a1a17] tracking-tight">
              Product pages for the questions people ask before they download
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/ingredient-scanner-app",
                title: "Ingredient Scanner App",
                description:
                  "For broad product-intent searches around ingredient scanning, food labels, and AI ingredient checking.",
              },
              {
                href: "/allergy-ingredient-scanner",
                title: "Allergy Ingredient Scanner",
                description:
                  "For users who need personal compatibility context and allergy-aware product decisions.",
              },
              {
                href: "/cosmetic-ingredient-scanner",
                title: "Cosmetic Ingredient Scanner",
                description:
                  "For beauty and skincare ingredient-checking queries that need their own destination.",
              },
              {
                href: "/yuka-alternative",
                title: "Yuka Alternative",
                description:
                  "For comparison shoppers looking for an app with a more personal scanning flow.",
              },
              {
                href: "/how-to-scan-food-ingredients",
                title: "How To Scan Food Ingredients",
                description:
                  "For educational searches around reading food labels and understanding ingredient panels.",
              },
              {
                href: "/check-ingredients-for-allergies",
                title: "Check Ingredients For Allergies",
                description:
                  "For safety-oriented users asking whether ingredients are actually a fit for them.",
              },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-[20px] border border-[#edecea] bg-[#fcfbf7] p-5 transition hover:border-[#d8f3dc] hover:bg-[#edf7ee]"
              >
                <h3 className="text-lg font-semibold text-[#1a1a17] group-hover:text-[#2d6a4f]">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#5c5c52]">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
          </div>

          <div
            id="how-scores-calculated"
            className="group mt-6 mb-6 rounded-[20px] border border-[#edecea] bg-white/80 p-5 shadow-[0_1px_3px_rgba(26,26,23,0.04),0_1px_2px_rgba(26,26,23,0.06)] transition hover:border-[#d8f3dc] hover:bg-[#edf7ee] has-[details[open]]:border-[#edecea] has-[details[open]]:bg-white/80"
          >
            <h3 className="font-display text-xl tracking-tight text-[#1a1a17]">
              How scores are calculated
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#5c5c52]">
              Learn how we generate product health scores.
            </p>
            <details className="mt-4 group">
              <summary className="inline-flex cursor-pointer list-none items-center rounded-full bg-[#2d6a4f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#40916c] group-open:hidden">
                Read more
              </summary>
              <div className="mt-4 space-y-5 rounded-[16px] border border-[#edecea] bg-white p-4">
                <p className="text-[0.92rem] leading-[1.65] text-[#5c5c52]">
                  Health scores are generated by Google Gemini AI using a
                  combination of product data from open community databases and
                  live web search. When a barcode is detected, product
                  information is sourced from Open Food Facts, Open Beauty
                  Facts, or UPCitemdb. The AI then analyses ingredients,
                  nutrition, and compatibility with your personal profile.
                  Results are further refined using web search to improve
                  accuracy.
                </p>
                <div className="rounded-[16px] border border-[#edecea] bg-[#fcfbf7] p-4">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#2d6a4f]">
                    Community databases:
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-[#4f4f46]">
                    <li>Open Food Facts - Food & Nutrition Database</li>
                    <li>Open Beauty Facts - Cosmetic Ingredient Database</li>
                    <li>UPCitemdb - Product Information Database</li>
                  </ul>
                </div>
                <p className="rounded-[14px] border border-[#f2d5cf] bg-[#fff3f0] p-4 text-sm leading-7 text-[#7a2e23]">
                  For informational purposes only. Scores are AI-generated and
                  have not been clinically validated. Always consult a doctor
                  or qualified health professional before making medical or
                  dietary decisions.
                </p>
              </div>
            </details>
          </div>
        

        <div className="mb-12 border-b border-[#edecea] pb-6 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-[#1a1a17] tracking-tight mb-2">
              Latest Articles
            </h2>
            <p className="text-[0.95rem] text-[#5c5c52]">
              Practical reading for real shopping decisions
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col bg-white border border-[#edecea] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(26,26,23,0.04),0_1px_2px_rgba(26,26,23,0.06)] hover:shadow-[0_12px_40px_rgba(26,26,23,0.08),0_4px_12px_rgba(26,26,23,0.04)] hover:-translate-y-[2px] transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#2d6a4f] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#2d6a4f] font-bold text-[0.72rem] uppercase tracking-[0.08em]">
                  {post.category}
                </span>
              </div>

              <h3 className="font-display text-[1.4rem] leading-[1.2] text-[#1a1a17] mb-3 group-hover:text-[#2d6a4f] transition-colors duration-200">
                {post.title}
              </h3>

              <p className="text-[0.92rem] text-[#5c5c52] leading-[1.65] mb-8 flex-grow">
                {post.description}
              </p>

              <div className="flex items-center justify-between border-t border-[#edecea] pt-5 mt-auto">
                <span className="text-[0.8rem] text-[#8a8a7e] font-medium tracking-wide">
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-[0.85rem] font-semibold text-[#1a1a17] group-hover:text-[#2d6a4f] transition-colors">
                  Read article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
