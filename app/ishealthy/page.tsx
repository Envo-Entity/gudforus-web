import type { Metadata } from "next";
import { getTopProductNames } from "@/lib/products";
import IsHealthySearch from "./IsHealthySearch";
import ProductCarousel from "./ProductCarousel";
import MinimalNav from "@/app/components/MinimalNav";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  SITE_URL,
} from "@/app/lib/site";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/ishealthy`;

export const metadata: Metadata = {
  title: "Is This Healthy? Search 10M+ Products Worldwide | GudForUs",
  description:
    "Is this healthy? Find out instantly. Search over 10 million food, supplement, and cosmetic products worldwide. Get health scores, ingredient breakdowns, and personalized insights.",
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "is this healthy",
    "is it healthy",
    "healthy food checker",
    "food health score",
    "ingredient health check",
    "is this food healthy",
    "product health score",
    "food score lookup",
    "healthy product search",
    "check if food is healthy",
  ],
  openGraph: {
    title: "Is This Healthy? Search 10M+ Products | GudForUs",
    description:
      "Is this healthy? Find out instantly. Search over 10 million food, supplement, and cosmetic products worldwide. Get health scores, ingredient breakdowns, and personalized insights.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE }],
    siteName: "Gud For Us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is This Healthy? Search 10M+ Products | GudForUs",
    description:
      "Is this healthy? Find out instantly. Search 10M+ products for health scores, ingredient breakdowns, and personalized insights.",
    images: [DEFAULT_TWITTER_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function IsHealthyPage() {
  const { data: products } = await getTopProductNames();
  const top20 = (products ?? []).slice(0, 20);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Is This Healthy? Search 10M+ Products Worldwide",
      description:
        "Is this healthy? Find out instantly. Search over 10 million food, supplement, and cosmetic products worldwide.",
      url: PAGE_URL,
      isPartOf: {
        "@type": "WebSite",
        name: "Gud For Us",
        url: SITE_URL,
      },
      mainEntity: {
        "@type": "WebApplication",
        name: "Is This Healthy - Product Health Checker",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        url: PAGE_URL,
        description:
          "Search any food, supplement, or cosmetic product to find out if it's healthy. Get instant health scores and ingredient breakdowns.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Is This Healthy - Gud For Us",
      url: PAGE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/ishealthy?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Background image — desktops/tablets only */}
      <div
        className="hidden sm:block fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />
      {/* Background image — phones only */}
      <div
        className="block sm:hidden fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/phone-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />
      <MinimalNav />
      <main className="relative z-10 min-h-screen bg-transparent overflow-x-hidden flex flex-col">
        {/* Centered content */}
        <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 flex flex-col items-center pt-[calc(8vh+48px)] pb-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1f2937] text-center tracking-tight leading-tight">
            Search 10M+ products worldwide
          </h1>
          <p className="mt-4 text-[#6b7280] text-center text-base sm:text-lg max-w-2xl leading-relaxed">
            Every food, supplement, and cosmetic brand available globally.
            Instant health scores, ingredient breakdowns, and personalized
            insights.
          </p>

          <div className="mt-10 w-full">
            <IsHealthySearch initialProducts={top20} />
          </div>
        </div>

        {/* Full-width carousel — direct child of main so mask works across the full viewport */}
        <ProductCarousel products={top20} />
      </main>
    </>
  );
}
