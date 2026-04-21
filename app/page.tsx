import type { Metadata } from "next";
import Link from "next/link";
import {
  Navbar,
  Hero,
  PhoneScrollPreview,
  ScoresSection,
  VideoSection,
  FeatureCards,
  Footer,
} from "./components";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  SITE_URL,
} from "./lib/site";

const popularSearches = [
  {
    href: "/ingredient-scanner-app",
    title: "Ingredient Scanner App",
    description:
      "Scan ingredient labels from photos and get a faster explanation of what is inside.",
  },
  {
    href: "/allergy-ingredient-scanner",
    title: "Allergy Ingredient Scanner",
    description:
      "Check products with more personal allergy and sensitivity context.",
  },
  {
    href: "/cosmetic-ingredient-scanner",
    title: "Cosmetic Ingredient Scanner",
    description:
      "Understand skincare and beauty labels with clearer ingredient guidance.",
  },
  {
    href: "/yuka-alternative",
    title: "Yuka Alternative",
    description:
      "Compare Gud For Us with barcode-first apps and see the difference.",
  },
];

export const metadata: Metadata = {
  title: "GudForUs - Understand What You Consume",
  description:
    "Decode labels instantly. From ingredient quality to personal compatibility, GudForUs gives you the clarity to make better choices for your body and the planet.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "GudForUs - Understand What You Consume",
    description:
      "Decode labels instantly. From ingredient quality to personal compatibility, GudForUs gives you the clarity to make better choices for your body and the planet.",
    url: SITE_URL,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GudForUs - Understand What You Consume",
    description:
      "Decode labels instantly. From ingredient quality to personal compatibility, GudForUs gives you the clarity to make better choices for your body and the planet.",
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function AppPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Gud For Us",
      url: SITE_URL,
      logo: `${SITE_URL}/gud.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Gud For Us",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      url: SITE_URL,
      image: DEFAULT_OG_IMAGE,
      description:
        "Gud For Us scans ingredient labels from photos, explains ingredients in plain language, shows health and compatibility context, and suggests better alternatives.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <div className="max-sm:hidden">
          <PhoneScrollPreview />
        </div>
        <ScoresSection />
        <VideoSection />
        <FeatureCards />
        <section className="bg-[#fafaf7] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4a6c48]">
                Popular Searches
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-[#1f2937] sm:text-4xl">
                Start with the use case that matches what you are trying to
                check.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#5c5c52]">
                These pages help searchers jump straight to ingredient scanning,
                allergy checks, cosmetics, and Yuka-style comparisons without
                relying on the sitemap alone.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {popularSearches.map((search) => (
                <Link
                  key={search.href}
                  href={search.href}
                  className="group rounded-[24px] border border-[#e5e3dd] bg-white p-6 shadow-[0_8px_30px_rgba(31,41,55,0.04)] transition hover:-translate-y-[2px] hover:border-[#4a6c48]/30 hover:bg-[#f7fbf7]"
                >
                  <h3 className="text-lg font-semibold text-[#1f2937] group-hover:text-[#2d6a4f]">
                    {search.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5c5c52]">
                    {search.description}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-[#2d6a4f]">
                    Explore page
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-[24px] border border-[#e5e3dd] bg-white p-6 shadow-[0_8px_30px_rgba(31,41,55,0.04)] sm:p-8">
              <h3 className="font-display text-2xl tracking-tight text-[#1f2937]">
                How scores are calculated
              </h3>
              <p className="mt-4 text-base leading-7 text-[#5c5c52]">
                Health scores are generated by Google Gemini AI using a
                combination of product data from open community databases and
                live web search. When a barcode is detected, product
                information is sourced from Open Food Facts, Open Beauty Facts,
                or UPCitemdb. The AI then analyses ingredients, nutrition, and
                compatibility with your personal profile. Results are further
                refined using web search to improve accuracy.
              </p>
              <div className="mt-6 rounded-[20px] border border-[#edecea] bg-[#fcfbf7] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#2d6a4f]">
                  Community databases:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-[#4f4f46]">
                  <li>Open Food Facts – Food & Nutrition Database</li>
                  <li>Open Beauty Facts – Cosmetic Ingredient Database</li>
                  <li>UPCitemdb – Product Information Database</li>
                </ul>
              </div>
              <p className="mt-6 rounded-[16px] border border-[#f2d5cf] bg-[#fff3f0] p-4 text-sm leading-7 text-[#7a2e23]">
                ⚠️ For informational purposes only. Scores are AI-generated and
                have not been clinically validated. Always consult a doctor or
                qualified health professional before making medical or dietary
                decisions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
