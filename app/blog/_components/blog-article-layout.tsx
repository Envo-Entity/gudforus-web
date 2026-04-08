import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  PLAY_STORE_URL,
  SITE_URL,
} from "../../lib/site";

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedArticle = {
  href: string;
  title: string;
  description: string;
};

export type EditorialArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  openGraphDescription: string;
  twitterDescription: string;
  publishedAt: string;
  updatedAt: string;
  dateLabel: string;
  readTime: string;
  category: string;
  intro: string;
  faqs: FaqItem[];
  related: RelatedArticle[];
};

export function createEditorialBlogMetadata(
  article: EditorialArticle
): Metadata {
  const canonical = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.openGraphDescription,
      url: canonical,
      type: "article",
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.twitterDescription,
      images: [DEFAULT_TWITTER_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function BlogArticleLayout({
  article,
  children,
}: {
  article: EditorialArticle;
  children: ReactNode;
}) {
  const canonical = `${SITE_URL}/blog/${article.slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.metaDescription,
      image: DEFAULT_OG_IMAGE,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: {
        "@type": "Organization",
        name: "Gud For Us",
      },
      publisher: {
        "@type": "Organization",
        name: "Gud For Us",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/gud.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
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
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: canonical,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fafaf7] text-[#1a1a17] selection:bg-[#d8f3dc] selection:text-[#1a1a17]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="sticky top-0 z-30 border-b border-[#edecea] bg-[#fafaf7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-3">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/gud.png"
              alt="Gud For Us logo"
              width={128}
              height={42}
              className="h-11 w-auto invert"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#2d6a4f] px-[22px] py-[10px] text-[0.82rem] font-semibold text-white transition hover:-translate-y-px hover:bg-[#40916c]"
            >
              iOS
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a17] px-[22px] py-[10px] text-[0.82rem] font-semibold text-white transition hover:-translate-y-px hover:bg-[#333]"
            >
              Android
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-20 pt-[140px] text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,106,79,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(82,183,136,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[780px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d8f3dc] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#2d6a4f]">
            <span className="h-2 w-2 rounded-full bg-[#52b788]" />
            {article.category}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,5.5vw,4.4rem)] leading-[1.04] tracking-[-0.03em] text-[#1a1a17]">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-[1.08rem] leading-[1.8] text-[#5c5c52]">
            {article.intro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-[#6b6b61]">
            <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
              {article.dateLabel}
            </span>
            <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
              {article.readTime}
            </span>
            <Link
              href="/blog"
              className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2 transition hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
            >
              More blog guides
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[760px] px-6 pb-24">
        <article className="rounded-[28px] border border-[#edecea] bg-white p-8 shadow-[0_12px_40px_rgba(26,26,23,0.04)] md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#1a1a17] prose-p:text-[#4f4f45] prose-p:leading-8 prose-li:text-[#4f4f45] prose-strong:text-[#1a1a17] prose-a:text-[#2d6a4f]">
            {children}
          </div>
        </article>

        <section className="mt-12 rounded-[24px] border border-[#edecea] bg-[#f5f3ee] p-7">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2d6a4f]">
            Keep Reading
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {article.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[18px] border border-[#e5e3dd] bg-white p-5 transition hover:-translate-y-[1px] hover:border-[#2d6a4f]/30 hover:bg-[#f8fcf8]"
              >
                <h3 className="text-lg font-semibold text-[#1a1a17]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#5c5c52]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
