import Image from "next/image";
import Link from "next/link";

type Highlight = {
  title: string;
  description: string;
};

type SectionCard = {
  title: string;
  description: string;
};

type Section = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  cards?: SectionCard[];
  callout?: {
    label: string;
    text: string;
  };
};

type Faq = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

export type SeoLandingConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  targetQueries: string[];
  heroHighlights: Highlight[];
  sections: Section[];
  faqs: Faq[];
  relatedLinks: RelatedLink[];
};

const siteUrl = "https://gudforus.com";

export function createLandingMetadata(page: SeoLandingConfig) {
  const url = `${siteUrl}/app/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
      images: [
        {
          url: `${siteUrl}/app/opengraph-image.jpg`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${siteUrl}/app/twitter-image.jpg`],
    },
  };
}

export function SeoLandingPage({ page }: { page: SeoLandingConfig }) {
  const pageUrl = `${siteUrl}/app/${page.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      url: pageUrl,
      description: page.metaDescription,
      about: {
        "@type": "SoftwareApplication",
        name: "Gud For Us",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "App",
          item: `${siteUrl}/app`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Gud For Us",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      url: `${siteUrl}/app`,
      description:
        "Gud For Us scans food, cosmetics, and ingredient labels from photos, returns a health score and compatibility score, explains ingredients, and suggests better alternatives.",
      featureList: [
        "Photo-based ingredient scanning",
        "Health score",
        "Compatibility score based on profile inputs",
        "Ingredient explanations in plain language",
        "Alternative product suggestions",
        "Food and cosmetic product support",
      ],
      publisher: {
        "@type": "Organization",
        name: "Gud For Us",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafaf7] text-[#1a1a17] selection:bg-[#d8f3dc] selection:text-[#1a1a17]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header — matches blog pages: logo + store CTAs */}
      <header className="sticky top-0 z-30 border-b border-[#edecea] bg-[#fafaf7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-3">
          <Link href="/app" className="inline-flex items-center">
            <Image
              src="/gud.png"
              alt="Gud For Us"
              width={128}
              height={42}
              className="h-11 w-auto invert"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#2d6a4f] px-[22px] py-[10px] text-[0.82rem] font-semibold text-white transition hover:-translate-y-px hover:bg-[#40916c] hover:shadow-[0_4px_12px_rgba(45,106,79,0.3)]"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.81-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.app.gudforus&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a17] px-[22px] py-[10px] text-[0.82rem] font-semibold text-white transition hover:-translate-y-px hover:bg-[#333]"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
              </svg>
              Android
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — centered, editorial, serif headline */}
        <section className="relative overflow-hidden px-6 pb-20 pt-[140px] text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,106,79,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(82,183,136,0.04) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-[780px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#d8f3dc] px-[18px] py-2 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-[#2d6a4f]">
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#52b788]" />
              {page.heroEyebrow}
            </div>

            <h1 className="font-display text-[clamp(2.4rem,5.5vw,3.8rem)] font-normal leading-[1.12] tracking-[-0.025em] text-[#1a1a17]">
              {page.heroTitle}
            </h1>

            <p className="mx-auto mt-6 max-w-[560px] text-[1.08rem] leading-[1.7] text-[#5c5c52]">
              {page.heroDescription}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3.5">
              <a
                href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#2d6a4f] px-9 py-4 text-[0.95rem] font-semibold text-white shadow-[0_4px_20px_rgba(45,106,79,0.25)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#40916c] hover:shadow-[0_8px_30px_rgba(45,106,79,0.3)]"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.81-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for iOS
              </a>
              <Link
                href="/app/blog"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#e5e3dd] px-9 py-4 text-[0.95rem] font-semibold text-[#1a1a17] transition-all duration-300 hover:border-[#2d6a4f] hover:bg-[#edf7ee] hover:text-[#2d6a4f]"
              >
                Read related guides
              </Link>
            </div>

            <p className="mt-8 text-[0.82rem] text-[#8a8a7e]">
              AI&#8209;powered &middot; No barcode required &middot; 5 free scans
            </p>
          </div>
        </section>

        {/* ARTICLE BODY — single column, editorial reading width */}
        <div className="mx-auto max-w-[720px] px-6 pb-24">

          {/* Table of contents / page summary */}
          <nav className="mb-14 rounded-xl border border-[#edecea] bg-[#f5f3ee] px-7 py-6">
            <p className="mb-3.5 text-[0.78rem] font-bold uppercase tracking-[0.06em] text-[#8a8a7e]">
              In this page
            </p>
            <ul className="space-y-2.5">
              {page.heroHighlights.map((h) => (
                <li key={h.title} className="flex items-start gap-2.5 text-[0.9rem]">
                  <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>
                    <span className="font-medium text-[#2d6a4f]">{h.title}</span>
                    {" — "}
                    <span className="text-[#5c5c52]">{h.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <article>
            {page.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="mb-12">
                {section.eyebrow ? (
                  <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
                    {section.eyebrow}
                  </p>
                ) : null}

                <h2 className="font-display text-[1.9rem] font-normal leading-[1.2] tracking-[-0.02em] text-[#1a1a17]">
                  {section.title}
                </h2>

                <div className="mt-5 space-y-4 text-[1rem] leading-[1.8] text-[#4f4f45]">
                  {section.paragraphs.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <div className="mt-6 space-y-3">
                    {section.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <span className="mt-[9px] h-[9px] w-[9px] shrink-0 rounded-full bg-[#52b788]" />
                        <p className="text-[0.98rem] leading-7 text-[#4f4f45]">{bullet}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.cards?.length ? (
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {section.cards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-xl border border-[#edecea] bg-white p-5 shadow-[0_1px_3px_rgba(26,26,23,0.04),0_1px_2px_rgba(26,26,23,0.06)] transition hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(26,26,23,0.06)]"
                      >
                        <h3 className="text-base font-semibold text-[#1a1a17]">{card.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#5c5c52]">{card.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.callout ? (
                  <div className="mt-7 rounded-r-xl border-l-4 border-[#2d6a4f] bg-[#edf7ee] py-4 pl-5 pr-5">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#2d6a4f]">
                      {section.callout.label}
                    </p>
                    <p className="mt-2 text-[0.98rem] leading-7 text-[#355444]">
                      {section.callout.text}
                    </p>
                  </div>
                ) : null}

                {i < page.sections.length - 1 ? (
                  <hr className="mt-12 border-[#edecea]" />
                ) : null}
              </section>
            ))}

            {/* Inline CTA — editorial green card, like blog's inline-cta */}
            <div className="my-14 rounded-[20px] border border-[rgba(45,106,79,0.15)] bg-gradient-to-br from-[#d8f3dc] to-[#f0fff4] px-9 py-10 text-center">
              <h3 className="font-display text-[1.5rem] font-normal text-[#1a1a17]">
                Ready to scan with context that actually fits you?
              </h3>
              <p className="mx-auto mt-3 max-w-[440px] text-[0.95rem] leading-7 text-[#5c5c52]">
                Gud For Us gives you a health read and a personal compatibility
                view in one flow. 5 free scans, no credit card required.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#2d6a4f] px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_4px_20px_rgba(45,106,79,0.25)] transition hover:-translate-y-[2px] hover:bg-[#40916c]"
                >
                  Try for iOS
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.gudforus&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-[#e5e3dd] px-8 py-3.5 text-[0.95rem] font-semibold text-[#1a1a17] transition hover:border-[#2d6a4f] hover:bg-white hover:text-[#2d6a4f]"
                >
                  Try for Android
                </a>
              </div>
            </div>

            {/* FAQ — native details/summary accordion */}
            <section className="mb-14">
              <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
                Frequently Asked Questions
              </p>
              <h2 className="font-display text-[1.9rem] font-normal leading-[1.2] tracking-[-0.02em] text-[#1a1a17]">
                Common questions people ask before they trust an ingredient
                scanner
              </h2>
              <div className="mt-8 space-y-3">
                {page.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group overflow-hidden rounded-xl border border-[#edecea] bg-white transition hover:shadow-[0_1px_3px_rgba(26,26,23,0.04)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-[0.95rem] font-semibold text-[#1a1a17] transition-colors hover:text-[#2d6a4f]">
                      {faq.question}
                      <svg
                        className="h-5 w-5 shrink-0 text-[#8a8a7e] transition-transform duration-300 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <p className="px-5 pb-5 text-[0.92rem] leading-[1.7] text-[#5c5c52]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* Related links — bottom grid, not sidebar */}
          {page.relatedLinks.length > 0 ? (
            <aside className="border-t border-[#edecea] pt-10">
              <p className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
                Related Reading
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl border border-[#edecea] bg-white p-5 transition hover:border-[#d8f3dc] hover:bg-[#edf7ee]"
                  >
                    <h3 className="text-base font-semibold text-[#1a1a17]">
                      {link.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#5c5c52]">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </div>

        {/* CTA BAND — full-width green, serif heading, matches blog */}
        <section className="relative overflow-hidden bg-[#2d6a4f] px-6 py-[72px] text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(82,183,136,0.3), transparent), radial-gradient(ellipse 40% 60% at 80% 30%, rgba(255,255,255,0.05), transparent)",
            }}
          />
          <div className="relative mx-auto max-w-[600px]">
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-normal leading-[1.2] text-white">
              See how Gud For Us explains products in context, not in isolation.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[1.05rem] leading-7 text-white/80">
              Gud For Us is built for people who want more than a barcode score:
              photo&#8209;based scanning, ingredient explanations, compatibility
              context, and better alternatives in one flow.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-[1rem] font-bold text-[#2d6a4f] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.81-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Try for iOS
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.app.gudforus&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-white/40 bg-white/15 px-10 py-4 text-[1rem] font-semibold text-white transition hover:border-white/70 hover:bg-white/25"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
                </svg>
                Try for Android
              </a>
            </div>
            <p className="mt-4 text-[0.82rem] text-white/60">
              5 free scans &middot; No credit card required
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
