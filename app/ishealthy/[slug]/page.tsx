import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AppleStoreIcon from "@/app/components/AppleStoreIcon";
import ScoreBar from "./ScoreBar";
import { notFound } from "next/navigation";
import MinimalNav from "@/app/components/MinimalNav";
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
} from "@/app/lib/site";
import {
  formatProductSlug,
  getProductBySlug,
  parseAnalysisData,
  parseFaqItems,
  parseHealthGoals,
  parseMythBusters,
  parseSeoContent,
  type ProductAnalysisData,
  type ProductIngredient,
  type ProductNutritionFacts,
  type ProductRecord,
} from "@/lib/products";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type NutrientLevel = "low" | "medium" | "high";

export const revalidate = 3600;

const productUrl = (slug: string) => `${SITE_URL}/ishealthy/${slug}`;

const titleCase = (value: string) =>
  value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const displayProductName = (product: ProductRecord) =>
  product.product_name ?? titleCase(formatProductSlug(product.slug));

const displayDate = (value: string | null) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const removePlanetScoreSentences = (value: string | null | undefined) => {
  if (!value) {
    return null;
  }

  const cleaned = value
    .split(/(?<=[.!?])\s+/)
    .filter(
      (sentence) =>
        !(
          /\b(planet|environmental)\b/i.test(sentence) &&
          /\b\d{1,3}\s*\/\s*100\b/.test(sentence)
        ),
    )
    .join(" ")
    .trim();

  return cleaned || null;
};

const scoreTone = (score: number | null) => {
  if (score === null) {
    return {
      label: "Not scored",
      text: "text-[#6b6b61]",
      bg: "bg-[#f2f0e9]",
      fill: "bg-[#9ca3af]",
    };
  }

  if (score >= 80) {
    return {
      label: "Excellent",
      text: "text-[#147d3e]",
      bg: "bg-[#e7f5ec]",
      fill: "bg-[#2d6a4f]",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      text: "text-[#4a6c48]",
      bg: "bg-[#eef6df]",
      fill: "bg-[#74a84f]",
    };
  }

  if (score >= 40) {
    return {
      label: "Mixed",
      text: "text-[#b54708]",
      bg: "bg-[#fef3e7]",
      fill: "bg-[#f59e0b]",
    };
  }

  return {
    label: "Watch out",
    text: "text-[#c81e1e]",
    bg: "bg-[#fee7e7]",
    fill: "bg-[#dc2626]",
  };
};

const ingredientTone = (impact: string) => {
  if (impact === "positive") {
    return {
      label: "Good",
      className: "border-[#147d3e]/30 bg-[#e7f5ec] text-[#147d3e]",
    };
  }

  if (impact === "negative") {
    return {
      label: "Watch out",
      className: "border-[#c81e1e]/25 bg-[#fee7e7] text-[#c81e1e]",
    };
  }

  return {
    label: "Neutral",
    className: "border-[#dc6803]/25 bg-[#fef3e7] text-[#b54708]",
  };
};

const getIngredientGroups = (ingredients: ProductIngredient[]) => ({
  positive: ingredients.filter(
    (ingredient) => ingredient.health_impact === "positive",
  ),
  neutral: ingredients.filter(
    (ingredient) =>
      ingredient.health_impact !== "positive" &&
      ingredient.health_impact !== "negative",
  ),
  negative: ingredients.filter(
    (ingredient) => ingredient.health_impact === "negative",
  ),
});

const safeIngredients = (analysis: ProductAnalysisData) =>
  Array.isArray(analysis.ingredients)
    ? analysis.ingredients.filter(
        (ingredient) =>
          ingredient &&
          typeof ingredient.title === "string" &&
          typeof ingredient.description === "string",
      )
    : [];

const nutrientLevel = (
  value: number | null | undefined,
  lowMax: number,
  mediumMax: number,
): NutrientLevel | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (value < lowMax) {
    return "low";
  }

  if (value <= mediumMax) {
    return "medium";
  }

  return "high";
};

const fiberLevel = (value: number | null | undefined): NutrientLevel | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (value >= 6) {
    return "high";
  }

  if (value >= 3) {
    return "medium";
  }

  return "low";
};

const nutrientBadge = (level: NutrientLevel | null, inverted = false) => {
  if (!level) {
    return {
      label: "N/A",
      className: "bg-[#f2f0e9] text-[#8a877d]",
      pointer: "left-1/2 border-b-[#8a877d]",
    };
  }

  const displayLevel =
    inverted && level === "high"
      ? "low"
      : inverted && level === "low"
        ? "high"
        : level;

  const positions = {
    low: "left-[14%]",
    medium: "left-[47%]",
    high: "left-[80%]",
  };

  const visual = {
    low: { className: "bg-[#e7f5ec] text-[#147d3e]", pointerColor: "border-b-[#147d3e]" },
    medium: { className: "bg-[#fef3e7] text-[#b54708]", pointerColor: "border-b-[#b54708]" },
    high: { className: "bg-[#fee7e7] text-[#c81e1e]", pointerColor: "border-b-[#c81e1e]" },
  };

  return {
    label: level,
    className: visual[displayLevel].className,
    pointer: `${positions[level]} ${visual[displayLevel].pointerColor}`,
  };
};

const GRADE_PALETTE: Record<string, string> = {
  A: "#1b6e2e",
  B: "#4d8f27",
  C: "#a3b800",
  D: "#e07000",
  E: "#d42020",
};

function HealthGoalRating({ grade }: { grade: string }) {
  const grades = ["A", "B", "C", "D", "E"] as const;
  const g = grade.toUpperCase() as (typeof grades)[number];
  const activeIdx = grades.indexOf(g);

  if (activeIdx === -1) return null;

  return (
    <div className="flex items-center">
      {grades.map((label, i) => {
        const isActive = i === activeIdx;
        const color = GRADE_PALETTE[label];

        if (isActive) {
          return (
            <div
              key={label}
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md"
              style={{
                backgroundColor: color,
                outline: "2.5px solid white",
                outlineOffset: "0px",
              }}
            >
              {label}
            </div>
          );
        }

        return (
          <div
            key={label}
            className={`flex h-7 w-7 shrink-0 items-center justify-center text-[11px] font-semibold text-white${i === 0 ? " rounded-l-full" : ""}${i === grades.length - 1 ? " rounded-r-full" : ""}`}
            style={{ backgroundColor: color }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

async function getProduct(slug: string) {
  const { data, error } = await getProductBySlug(slug);

  if (error || !data || data.image_status === "rejected") {
    notFound();
  }

  return data as ProductRecord;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  const title =
    product.meta_title ?? `${displayProductName(product)}: Is It Healthy?`;
  const description =
    removePlanetScoreSentences(product.meta_description) ??
    removePlanetScoreSentences(product.verdict_summary) ??
    `Read the Gud For Us health analysis for ${displayProductName(product)}.`;
  const canonical = productUrl(product.slug);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: `${SITE_URL}/ishealthy/${slug}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/ishealthy/${slug}/opengraph-image`],
    },
  };
}


function VerdictCard({
  verdict,
  summary,
}: {
  verdict: string | null;
  summary: string | null;
}) {
  if (!verdict && !summary) {
    return null;
  }

  return (
    <div className="rounded-[22px] border border-[#edecea] bg-[#f5f3ee] p-6">
      {verdict ? (
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#2d6a4f]">
          Verdict: {verdict}
        </p>
      ) : null}
      {summary ? (
        <p className="mt-3 text-lg font-semibold leading-8 text-[#1a1a17]">
          {summary}
        </p>
      ) : null}
    </div>
  );
}

function IngredientSection({
  ingredients,
}: {
  ingredients: ProductIngredient[];
}) {
  if (!ingredients.length) {
    return null;
  }

  const groups = getIngredientGroups(ingredients);
  const sections = [
    ["Good ingredients", groups.positive],
    ["Neutral ingredients", groups.neutral],
    ["Ingredients to watch", groups.negative],
  ] as const;

  return (
    <section className="mt-12 rounded-[24px] border border-[#edecea] bg-white p-7 shadow-[0_12px_40px_rgba(26,26,23,0.04)]">
      <h2 className="font-display text-3xl leading-tight text-[#1a1a17]">
        Ingredient breakdown
      </h2>
      <div className="mt-7 space-y-7">
        {sections.map(([title, items]) =>
          items.length ? (
            <div key={title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#5c5c52]">
                {title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {items.map((ingredient) => {
                  const tone = ingredientTone(ingredient.health_impact);

                  return (
                    <div
                      key={`${title}-${ingredient.title}`}
                      className={`group relative rounded-full border px-4 py-2 text-sm font-semibold ${tone.className}`}
                      title={ingredient.description}
                    >
                      {ingredient.title}
                      <span className="sr-only">: {tone.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null,
        )}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ingredients.slice(0, 6).map((ingredient) => {
          const tone = ingredientTone(ingredient.health_impact);

          return (
            <article
              key={`detail-${ingredient.title}`}
              className="rounded-[18px] border border-[#edecea] bg-[#fcfbf7] p-5"
            >
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${tone.className}`}
              >
                {tone.label}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[#1a1a17]">
                {ingredient.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#5c5c52]">
                {ingredient.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function NutrientGauge({
  label,
  amount,
  unit,
  level,
  inverted,
}: {
  label: string;
  amount: number | null | undefined;
  unit: string;
  level: NutrientLevel | null;
  inverted?: boolean;
}) {
  const badge = nutrientBadge(level, inverted);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1a1a17]">{label}</p>
          <p className="text-xs text-[#8a877d]">
            {amount !== null && amount !== undefined
              ? `${amount}${unit}`
              : "Not available"}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>
      <div className="relative mt-3 pb-4">
        <div className="flex h-2.5 overflow-hidden rounded-full">
          {inverted ? (
            <>
              <div className="flex-1 bg-[#f87171]" />
              <div className="flex-1 bg-[#fbbf24]" />
              <div className="flex-1 bg-[#4ade80]" />
            </>
          ) : (
            <>
              <div className="flex-1 bg-[#4ade80]" />
              <div className="flex-1 bg-[#fbbf24]" />
              <div className="flex-1 bg-[#f87171]" />
            </>
          )}
        </div>
        {level ? (
          <div
            className={`absolute top-3 h-0 w-0 -translate-x-1/2 border-x-[5px] border-b-[7px] border-x-transparent ${badge.pointer}`}
          />
        ) : null}
      </div>
    </div>
  );
}

function NutritionSection({
  nutrition,
}: {
  nutrition: ProductNutritionFacts | null | undefined;
}) {
  if (!nutrition) {
    return null;
  }

  const macros = [
    ["Protein", nutrition.protein_g, "g"],
    ["Carbs", nutrition.carbs_g, "g"],
    ["Fat", nutrition.fat_g, "g"],
    ["Fiber", nutrition.fiber_g, "g"],
  ] as const;
  const hasAnyValue = Object.values(nutrition).some(
    (value) => value !== null && value !== undefined && value !== "",
  );

  if (!hasAnyValue) {
    return null;
  }

  return (
    <section className="mt-12 rounded-[24px] border border-[#edecea] bg-white p-7 shadow-[0_12px_40px_rgba(26,26,23,0.04)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl leading-tight text-[#1a1a17]">
            Nutrition facts
          </h2>
          {nutrition.serving_size ? (
            <p className="mt-2 text-sm text-[#6b6b61]">
              Values shown {nutrition.serving_size}
            </p>
          ) : null}
        </div>
        {nutrition.energy_kcal !== null &&
        nutrition.energy_kcal !== undefined ? (
          <div className="rounded-[16px] bg-[#f5f3ee] px-5 py-3 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a877d]">
              Energy
            </p>
            <p className="text-2xl font-bold text-[#1a1a17]">
              {nutrition.energy_kcal}
              <span className="text-sm text-[#6b6b61]"> kcal</span>
            </p>
          </div>
        ) : null}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
        {macros.map(([label, value, unit]) =>
          value !== null && value !== undefined ? (
            <div
              key={label}
              className="rounded-[16px] border border-[#edecea] bg-[#fcfbf7] p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8a877d]">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold text-[#1a1a17]">
                {value}
                <span className="text-sm text-[#6b6b61]">{unit}</span>
              </p>
            </div>
          ) : null,
        )}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <NutrientGauge
          label="Sugar"
          amount={nutrition.sugar_g}
          unit="g"
          level={nutrientLevel(nutrition.sugar_g, 5, 22.5)}
        />
        <NutrientGauge
          label="Sodium"
          amount={nutrition.sodium_mg}
          unit="mg"
          level={nutrientLevel(nutrition.sodium_mg, 140, 600)}
        />
        <NutrientGauge
          label="Saturated fat"
          amount={nutrition.saturated_fat_g}
          unit="g"
          level={nutrientLevel(nutrition.saturated_fat_g, 1.5, 5)}
        />
        <NutrientGauge
          label="Fiber"
          amount={nutrition.fiber_g}
          unit="g"
          level={fiberLevel(nutrition.fiber_g)}
          inverted
        />
      </div>
    </section>
  );
}

export default async function IsHealthyProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const analysis = parseAnalysisData(product.analysis_data);
  const parsedSeo = parseSeoContent(product.seo_content);
  const seo = {
    ...parsedSeo,
    who_it_is_for: removePlanetScoreSentences(parsedSeo.who_it_is_for),
    expert_analysis: removePlanetScoreSentences(parsedSeo.expert_analysis),
    intro_paragraph: removePlanetScoreSentences(parsedSeo.intro_paragraph),
    who_should_avoid: removePlanetScoreSentences(parsedSeo.who_should_avoid),
  };
  const faqs = parseFaqItems(product.faq).map((faq) => ({
    question: faq.question,
    answer: removePlanetScoreSentences(faq.answer) ?? faq.answer,
  }));
  const healthGoals = parseHealthGoals(product.health_goals);
  const mythBusters = parseMythBusters(product.myth_busters);
  const ingredients = safeIngredients(analysis);
  const name = displayProductName(product);
  const canonical = productUrl(product.slug);
  const publishedAt =
    product.published_at ?? product.seo_generated_at ?? product.created_at;
  const updatedAt =
    product.updated_at ?? product.seo_generated_at ?? product.published_at;
  const dateLabel = displayDate(updatedAt);
  const title = product.meta_title ?? `${name}: Is It Healthy?`;
  const verdictSummary = removePlanetScoreSentences(product.verdict_summary);
  const description =
    removePlanetScoreSentences(product.meta_description) ??
    verdictSummary ??
    seo.intro_paragraph;
  const image = product.product_image_url;
  const ogImage =
    product.og_image_url ?? product.product_image_url ?? DEFAULT_OG_IMAGE;
  const tags = product.category_tags ?? [];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      image: ogImage,
      datePublished: publishedAt,
      dateModified: updatedAt,
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
      "@type": "Product",
      name,
      brand: product.brand
        ? {
            "@type": "Brand",
            name: product.brand,
          }
        : undefined,
      category: product.category ?? undefined,
      image: image ?? undefined,
      description,
      additionalProperty: [
        product.health_score !== null
          ? {
              "@type": "PropertyValue",
              name: "Health score",
              value: product.health_score,
              maxValue: 100,
            }
          : null,
        product.verdict
          ? {
              "@type": "PropertyValue",
              name: "Verdict",
              value: product.verdict,
            }
          : null,
      ].filter(Boolean),
    },
    faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null,
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
          name: "Is Healthy",
          item: `${SITE_URL}/ishealthy`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: canonical,
        },
      ],
    },
  ].filter(Boolean);

  return (
    <>
      <MinimalNav />
      <main className="min-h-screen overflow-x-hidden bg-[#fafaf7] text-[#1a1a17] selection:bg-[#d8f3dc] selection:text-[#1a1a17]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <section className="relative overflow-hidden px-6 pb-16 pt-[120px]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,106,79,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 82% 18%, rgba(82,183,136,0.04) 0%, transparent 60%)",
            }}
          />
          <div className="relative mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <Link
                href="/ishealthy"
                className="text-sm font-semibold text-[#2d6a4f] transition hover:text-[#1a1a17]"
              >
                Back to product search
              </Link>
              <div className="mt-7 flex flex-wrap gap-2">
                {product.brand ? (
                  <span className="rounded-full bg-[#d8f3dc] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#2d6a4f]">
                    {product.brand}
                  </span>
                ) : null}
                {product.category ? (
                  <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6b6b61]">
                    {product.category}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-6 max-w-[760px] font-display text-[clamp(2.5rem,5vw,4.3rem)] leading-[1.04] tracking-[-0.025em] text-[#1a1a17]">
                {title}
              </h1>
              {(seo.intro_paragraph ?? verdictSummary) ? (
                <p className="mt-6 max-w-[720px] text-[1.08rem] leading-8 text-[#5c5c52]">
                  {seo.intro_paragraph ?? verdictSummary}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6b6b61]">
                {dateLabel ? (
                  <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
                    Updated {dateLabel}
                  </span>
                ) : null}
                <span className="rounded-full border border-[#e5e3dd] bg-white/80 px-4 py-2">
                  Product analysis
                </span>
              </div>
            </div>

            <aside className="rounded-[28px] border border-[#edecea] bg-white p-5 shadow-[0_16px_50px_rgba(26,26,23,0.06)]">
              <div className="overflow-hidden rounded-[22px] bg-[#f7f5ee]">
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    width={720}
                    height={720}
                    className="aspect-square w-full object-cover"
                    priority
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-sm text-[#8a877d]">
                    Product image unavailable
                  </div>
                )}
              </div>
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a877d]">
                  Product
                </p>
                <h2 className="mt-2 text-xl font-semibold leading-tight text-[#1a1a17]">
                  {name}
                </h2>
                {product.product_subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-[#6b6b61]">
                    {product.product_subtitle}
                  </p>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1120px] gap-10 px-6 pb-24 lg:grid-cols-[minmax(0,720px)_320px]">
          <article>
            <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <ScoreBar score={product.health_score} />
              <VerdictCard verdict={product.verdict} summary={verdictSummary} />
            </div>

            {seo.key_takeaways?.length ? (
              <section className="mt-10 rounded-[24px] border border-[#edecea] bg-white p-7 shadow-[0_12px_40px_rgba(26,26,23,0.04)]">
                <h2 className="font-display text-3xl leading-tight text-[#1a1a17]">
                  Key takeaways
                </h2>
                <ul className="mt-5 space-y-3">
                  {seo.key_takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex gap-3 text-base leading-7 text-[#4f4f45]"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {seo.expert_analysis ||
            seo.who_it_is_for ||
            seo.who_should_avoid ||
            verdictSummary ? (
              <section className="mt-14">
                {seo.expert_analysis ||
                (!seo.who_it_is_for &&
                  !seo.who_should_avoid &&
                  verdictSummary) ? (
                  <div className="relative border-y border-[#e5e3dd] py-10">
                    <span
                      aria-hidden
                      className="font-display pointer-events-none absolute -top-2 right-0 select-none text-[7rem] leading-none text-[#2d6a4f]/[0.07]"
                    >
                      &ldquo;
                    </span>
                    <h2 className="font-display text-3xl leading-snug text-[#1a1a17]">
                      Our read on this product
                    </h2>
                    <p className="mt-5 max-w-[65ch] text-[1.05rem] leading-[1.9] text-[#3a3a35]">
                      {seo.expert_analysis ?? verdictSummary}
                    </p>
                  </div>
                ) : null}

                {seo.who_it_is_for || seo.who_should_avoid ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {seo.who_it_is_for ? (
                      <div className="rounded-[22px] border border-[#d5ede0] bg-[#f6fbf8] p-6">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#147d3e]">
                          Best for
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#4f4f45]">
                          {seo.who_it_is_for}
                        </p>
                      </div>
                    ) : null}
                    {seo.who_should_avoid ? (
                      <div className="rounded-[22px] border border-[#f0ddd0] bg-[#fdf8f5] p-6">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b54708]">
                          Approach with care
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#4f4f45]">
                          {seo.who_should_avoid}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </section>
            ) : null}

            <IngredientSection ingredients={ingredients} />
            <NutritionSection nutrition={analysis.nutrition_facts} />

            {healthGoals.length ? (
              <section className="mt-12 rounded-[24px] border border-[#edecea] bg-white p-7 shadow-[0_12px_40px_rgba(26,26,23,0.04)]">
                <h2 className="font-display text-3xl leading-tight text-[#1a1a17]">
                  How it scores against your goal
                </h2>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#edecea]">
                        <th className="pb-3 text-left text-xs font-bold uppercase tracking-[0.1em] text-[#8a877d]">
                          Goal
                        </th>
                        <th className="pb-3 text-center text-xs font-bold uppercase tracking-[0.1em] text-[#8a877d]">
                          Grade
                        </th>
                        <th className="pb-3 pl-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-[#8a877d]">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f2f0e9]">
                      {healthGoals.map(([key, goal]) => {
                        const tone = scoreTone(goal.score ?? null);

                        return (
                          <tr key={key} className="group">
                            <td className="py-4 pr-4 font-semibold text-[#1a1a17]">
                              {titleCase(key)}
                            </td>
                            <td className="py-4 pr-4">
                              {goal.label && /^[A-Ea-e]$/.test(goal.label) ? (
                                <HealthGoalRating grade={goal.label} />
                              ) : goal.label || goal.score !== null ? (
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${tone.bg} ${tone.text}`}
                                >
                                  {goal.label ?? goal.score}
                                </span>
                              ) : (
                                <span className="text-[#8a877d]">—</span>
                              )}
                            </td>
                            <td className="py-4 pl-4 leading-6 text-[#5c5c52]">
                              {goal.summary ?? "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {mythBusters.length ? (
              <section className="mt-12 rounded-[24px] border border-[#edecea] bg-[#f5f3ee] p-7">
                <h2 className="font-display text-3xl leading-tight text-[#1a1a17]">
                  Myth busters
                </h2>
                <div className="mt-6 space-y-4">
                  {mythBusters.map((myth) =>
                    myth.claim || myth.explanation ? (
                      <article
                        key={`${myth.claim}-${myth.explanation}`}
                        className="rounded-[18px] border border-[#e5e3dd] bg-white p-5"
                      >
                        <span
                          className={`rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${
                            myth.verdict
                              ? "bg-[#e7f5ec] text-[#147d3e]"
                              : "bg-[#fee7e7] text-[#c81e1e]"
                          }`}
                        >
                          {myth.verdict ? "Supported" : "Not supported"}
                        </span>
                        {myth.claim ? (
                          <h3 className="mt-3 text-lg font-semibold text-[#1a1a17]">
                            {myth.claim}
                          </h3>
                        ) : null}
                        {myth.explanation ? (
                          <p className="mt-2 text-sm leading-7 text-[#5c5c52]">
                            {myth.explanation}
                          </p>
                        ) : null}
                      </article>
                    ) : null,
                  )}
                </div>
              </section>
            ) : null}

            {faqs.length ? (
              <section className="mt-12 rounded-[24px] border border-[#edecea] bg-white p-7 shadow-[0_12px_40px_rgba(26,26,23,0.04)]">
                <h2 className="font-display text-3xl leading-tight text-[#1a1a17]">
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-[#f2f0e9]">
                  {faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group py-5 first:pt-0 last:pb-0"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold leading-7 text-[#1a1a17]">
                          {faq.question}
                        </h3>
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f2f0e9] text-xs font-bold text-[#5c5c52] transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-base leading-7 text-[#5c5c52]">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {tags.length ? (
              <section className="rounded-[22px] border border-[#edecea] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a877d]">
                  Tags
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#edf7ee] px-3 py-1.5 text-xs font-semibold text-[#2d6a4f]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {analysis.lab_tested ? (
              <section className="rounded-[22px] border border-[#edecea] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a877d]">
                  Lab tested
                </p>
                <p className="mt-3 text-lg font-semibold text-[#1a1a17]">
                  {analysis.lab_tested.available
                    ? "Available"
                    : "Not available"}
                </p>
                {analysis.lab_tested.summary ? (
                  <p className="mt-2 text-sm leading-7 text-[#5c5c52]">
                    {analysis.lab_tested.summary}
                  </p>
                ) : null}
              </section>
            ) : null}

            {analysis.environment?.summary ? (
              <section className="rounded-[22px] border border-[#edecea] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a877d]">
                  Sourcing and packaging notes
                </p>
                <p className="mt-3 text-sm leading-7 text-[#5c5c52]">
                  {analysis.environment.summary}
                </p>
              </section>
            ) : null}

            <section className="rounded-[22px] border border-[#2d6a4f]/20 bg-[#edf7ee] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#2d6a4f]">
                Scan smarter
              </p>
              <h2 className="mt-3 text-xl font-semibold leading-tight text-[#1a1a17]">
                Compare products with Gud For Us
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#4f4f45]">
                Use the app to decode labels, health scores, and ingredient
                details while you shop.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1a1a17] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
                >
                  <AppleStoreIcon className="h-4 w-4 text-white shrink-0" />
                  <span>App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1a17] transition hover:bg-[#f0faf2]"
                >
                  <Image
                    src="/app-images/google-play-store-icon.webp"
                    alt="Google Play"
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                  <span>Google Play</span>
                </a>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
