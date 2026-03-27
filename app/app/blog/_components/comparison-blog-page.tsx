import type { Metadata } from "next";
import Link from "next/link";

type ComparisonRow = {
  feature: string;
  gudForUs: string;
  yuka: string;
  openFoodFacts: string;
  thinkDirty: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type ComparisonBlogConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  updatedLabel: string;
  readTime: string;
  intro: string[];
  localIntentHeading: string;
  localIntentBody: string[];
  localBullets: string[];
  comparisonHeading: string;
  comparisonIntro: string;
  comparisonRows: ComparisonRow[];
  whyGudForUsHeading: string;
  whyGudForUsPoints: { title: string; body: string }[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
};

const siteUrl = "https://gudforus.com";

export function buildComparisonMetadata(
  config: ComparisonBlogConfig
): Metadata {
  const canonical = `${siteUrl}/app/blog/${config.slug}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical,
    },
    keywords: [
      "Yuka alternative",
      "best Yuka alternative",
      config.title,
      "apps like Yuka",
      "ingredient scanner app",
      "food scanner app",
      "cosmetic ingredient scanner",
    ],
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: canonical,
      type: "article",
      images: [
        {
          url: "https://gudforus.com/app/opengraph-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: ["https://gudforus.com/app/twitter-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function JsonLd({ config }: { config: ComparisonBlogConfig }) {
  const canonical = `${siteUrl}/app/blog/${config.slug}`;
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: config.heroTitle,
    description: config.metaDescription,
    image: "https://gudforus.com/app/opengraph-image.jpg",
    author: {
      "@type": "Person",
      name: "Shivanshu Sharma",
      url: "https://gudforus.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Gud For Us",
      logo: {
        "@type": "ImageObject",
        url: "https://gudforus.com/gud.png",
      },
    },
    datePublished: "2026-03-27",
    dateModified: "2026-03-27",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gudforus.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "App",
        item: "https://gudforus.com/app",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blog",
        item: "https://gudforus.com/app/blog",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: config.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export function ComparisonBlogPage({
  config,
}: {
  config: ComparisonBlogConfig;
}) {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#1a1a17] selection:bg-[#d8f3dc] selection:text-[#1a1a17]">
      <JsonLd config={config} />

      <section className="relative overflow-hidden px-6 pb-18 pt-[132px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(45,106,79,0.08) 0%, transparent 72%), radial-gradient(ellipse 35% 35% at 92% 12%, rgba(82,183,136,0.08) 0%, transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d8f3dc] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#2d6a4f] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#52b788]" />
            {config.heroEyebrow}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[1.03] tracking-[-0.03em] text-[#1a1a17]">
            {config.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-[1.12rem] leading-[1.8] text-[#5c5c52]">
            {config.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#6b6b61]">
            <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
              {config.updatedLabel}
            </span>
            <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
              {config.readTime}
            </span>
            <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
              Ingredient Scanner Comparison
            </span>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/app"
              className="inline-flex items-center rounded-full bg-[#2d6a4f] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#40916c]"
            >
              Try Gud For Us
            </Link>
            <Link
              href="/app/yuka-alternative"
              className="inline-flex items-center rounded-full border border-[#d9d6cd] bg-white px-7 py-3.5 text-sm font-semibold text-[#1a1a17] transition hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
            >
              See the product page
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <div className="rounded-[28px] border border-[#edecea] bg-white p-8 shadow-[0_12px_40px_rgba(26,26,23,0.04)] md:p-10">
            <div className="rounded-[24px] border border-[#e8efe8] bg-[#f6fbf7] p-6">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
                Quick takeaway
              </p>
              <p className="mt-3 text-[1.02rem] leading-8 text-[#394138]">
                {config.excerpt}
              </p>
            </div>

            <div className="mt-10 space-y-6 text-[1.03rem] leading-8 text-[#3f3f36]">
              {config.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section id="local-market" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-3xl tracking-tight text-[#1a1a17]">
                {config.localIntentHeading}
              </h2>
              <div className="mt-5 space-y-6 text-[1.03rem] leading-8 text-[#3f3f36]">
                {config.localIntentBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {config.localBullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-[#edecea] bg-[#fcfbf7] p-5"
                  >
                    <p className="text-[0.95rem] leading-7 text-[#4f4f46]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="why-gud-for-us" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-3xl tracking-tight text-[#1a1a17]">
                {config.whyGudForUsHeading}
              </h2>
              <div className="mt-6 grid gap-4">
                {config.whyGudForUsPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[24px] border border-[#edecea] bg-[#fafaf7] p-6"
                  >
                    <h3 className="text-lg font-semibold text-[#1a1a17]">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-7 text-[#4f4f46]">
                      {point.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="comparison" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-3xl tracking-tight text-[#1a1a17]">
                {config.comparisonHeading}
              </h2>
              <p className="mt-5 text-[1.03rem] leading-8 text-[#3f3f36]">
                {config.comparisonIntro}
              </p>
              <div className="mt-7 overflow-x-auto rounded-[24px] border border-[#e3e1d9]">
                <table className="min-w-full border-collapse bg-white text-left text-sm">
                  <thead className="bg-[#f3f8f4]">
                    <tr>
                      <th className="px-4 py-4 font-semibold text-[#1a1a17]">
                        Feature
                      </th>
                      <th className="px-4 py-4 font-semibold text-[#2d6a4f]">
                        Gud For Us
                      </th>
                      <th className="px-4 py-4 font-semibold text-[#1a1a17]">
                        Yuka
                      </th>
                      <th className="px-4 py-4 font-semibold text-[#1a1a17]">
                        Open Food Facts
                      </th>
                      <th className="px-4 py-4 font-semibold text-[#1a1a17]">
                        Think Dirty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.comparisonRows.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-[#fcfbf7]"
                        }
                      >
                        <td className="px-4 py-4 font-medium text-[#1f1f1a]">
                          {row.feature}
                        </td>
                        <td className="px-4 py-4 text-[#2d6a4f]">
                          {row.gudForUs}
                        </td>
                        <td className="px-4 py-4 text-[#4b4b42]">{row.yuka}</td>
                        <td className="px-4 py-4 text-[#4b4b42]">
                          {row.openFoodFacts}
                        </td>
                        <td className="px-4 py-4 text-[#4b4b42]">
                          {row.thinkDirty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="faq" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-3xl tracking-tight text-[#1a1a17]">
                Frequently asked questions
              </h2>
              <div className="mt-6 grid gap-4">
                {config.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-[22px] border border-[#edecea] bg-white p-6"
                  >
                    <h3 className="text-lg font-semibold text-[#1a1a17]">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[#4f4f46]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14 rounded-[28px] bg-[#1f5a43] px-7 py-8 text-white md:px-9">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[#cbead9]">
                Final call
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight">
                The best Yuka alternative is the one that explains the product in
                your context, not the average shopper&apos;s.
              </h2>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#eaf4ee]">
                Gud For Us is built for that decision: photo-based scanning,
                ingredient explanation, health context, profile-based
                compatibility, and better alternatives in one flow.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/app"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f5a43] transition hover:-translate-y-[1px]"
                >
                  Open the app
                </Link>
                <Link
                  href="/app/blog"
                  className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Browse more guides
                </Link>
              </div>
            </section>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[24px] border border-[#edecea] bg-white p-6 shadow-[0_8px_30px_rgba(26,26,23,0.04)]">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
              In this article
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <a href="#local-market" className="text-[#4f4f46] hover:text-[#2d6a4f]">
                Why location-specific Yuka searches happen
              </a>
              <a href="#why-gud-for-us" className="text-[#4f4f46] hover:text-[#2d6a4f]">
                Why Gud For Us fits better
              </a>
              <a href="#comparison" className="text-[#4f4f46] hover:text-[#2d6a4f]">
                Comparison table
              </a>
              <a href="#faq" className="text-[#4f4f46] hover:text-[#2d6a4f]">
                FAQs
              </a>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#edecea] bg-[#fcfbf7] p-6">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
              Related reading
            </p>
            <div className="mt-4 grid gap-4">
              {config.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[18px] border border-[#edecea] bg-white p-4 transition hover:border-[#d8f3dc] hover:bg-[#edf7ee]"
                >
                  <h3 className="text-sm font-semibold text-[#1a1a17]">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5c52]">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
