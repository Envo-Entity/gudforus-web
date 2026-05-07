import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import MinimalNav from "@/app/components/MinimalNav";
import {
  getScanById,
  normalizeScan,
  type NormalizedScan,
  type ScanNutritionFacts,
  type ScanRecord,
} from "@/lib/scans";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type NutrientLevel = "low" | "medium" | "high";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shared Scan Result | Gud For Us",
  robots: {
    index: false,
    follow: false,
  },
};

const titleCase = (value: string) =>
  value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const scoreBand = (score: number | null) => {
  if (score === null) return "Not scored";
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Poor";
};

const compatibilityLabel = (label: string | null, score: number | null) => {
  if (label) return titleCase(label);
  if (score === null) return "Unknown";
  if (score >= 80) return "Great";
  if (score >= 55) return "Moderate";
  return "Poor";
};

const nutrientLevel = (
  value: number | null | undefined,
  lowMax: number,
  mediumMax: number,
): NutrientLevel | null => {
  if (value === null || value === undefined) return null;
  if (value < lowMax) return "low";
  if (value <= mediumMax) return "medium";
  return "high";
};

const fiberLevel = (value: number | null | undefined): NutrientLevel | null => {
  if (value === null || value === undefined) return null;
  if (value >= 6) return "high";
  if (value >= 3) return "medium";
  return "low";
};

const levelStyle = (level: NutrientLevel | null, inverted = false) => {
  if (!level) {
    return {
      label: "N/A",
      badge: "bg-[#eef0ee] text-[#6c736d]",
      pointer: "left-1/2 border-b-[#6c736d]",
    };
  }

  const display =
    inverted && level === "high"
      ? "low"
      : inverted && level === "low"
        ? "high"
        : level;

  const map = {
    low: {
      label: level.toUpperCase(),
      badge: "bg-[#e7f5ec] text-[#2f7d45]",
      pointer: "left-[14%] border-b-[#2f7d45]",
    },
    medium: {
      label: level.toUpperCase(),
      badge: "bg-[#fff3df] text-[#b95b12]",
      pointer: "left-[47%] border-b-[#b95b12]",
    },
    high: {
      label: level.toUpperCase(),
      badge: "bg-[#fde7e7] text-[#c7372f]",
      pointer: "left-[80%] border-b-[#c7372f]",
    },
  };

  return map[display];
};

async function getScan(id: string) {
  const { data, error } = await getScanById(id);

  if (error || !data) {
    notFound();
  }

  return data as ScanRecord;
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[24px] border border-[#e5e7df] bg-[#fbfcf8] p-5 shadow-[0_10px_28px_rgba(31,41,55,0.06)] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function ProductSummary({ scan }: { scan: NormalizedScan }) {
  return (
    <Card className="bg-[#fdfdf9]">
      <div className="grid gap-5 md:grid-cols-[128px_minmax(0,1fr)] md:items-center">
        <div className="h-28 w-28 overflow-hidden rounded-[22px] bg-[#eef0ea] md:h-32 md:w-32">
          {scan.imageUrl ? (
            <Image
              src={scan.imageUrl}
              alt={scan.productName ?? "Scanned product"}
              width={256}
              height={256}
              priority
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-xl font-bold text-[#8d948a]">
              G
            </div>
          )}
        </div>
        <div className="min-w-0">
          {scan.brand ? (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6c736d]">
              {scan.brand}
            </p>
          ) : null}
          <h2 className="mt-1 max-w-3xl text-2xl font-bold leading-tight tracking-[-0.035em] text-[#242620] sm:text-3xl">
            {scan.productName ??
              scan.productSubtitle ??
              scan.barcode ??
              "Shared scan"}
          </h2>
          {scan.productSubtitle && scan.productName ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#697168]">
              {scan.productSubtitle}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#596258]">
            {scan.status ? (
              <span className="rounded-full bg-[#eef2ea] px-3 py-1.5">
                {titleCase(scan.status)}
              </span>
            ) : null}
            {scan.barcode ? (
              <span className="rounded-full bg-[#eef2ea] px-3 py-1.5">
                Barcode {scan.barcode}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ScoreMeter({
  score,
  label,
  iconSrc,
  iconAlt,
  gradient,
}: {
  score: number | null;
  label: string;
  iconSrc: string;
  iconAlt: string;
  gradient: string;
}) {
  if (score === null) return null;

  return (
    <Card className="min-h-[220px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6c736d]">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-[-0.06em] text-[#242620]">
              {score}
            </span>
            <span className="text-lg font-medium text-[#99a096]">/ 100</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-[#4f6f46]">
            {scoreBand(score)}
          </p>
        </div>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={88}
          height={88}
          className="h-20 w-20 object-contain drop-shadow-sm"
        />
      </div>
      <div className="mt-7 h-3 rounded-full bg-[#e4e7df]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(0, Math.min(100, score))}%`,
            background: gradient,
          }}
        />
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium text-[#99a096]">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </Card>
  );
}

function CompatibilityCard({ scan }: { scan: NormalizedScan }) {
  const hasData =
    scan.compatibility.label ||
    scan.compatibility.score !== null ||
    scan.compatibility.summary;

  if (!hasData) return null;

  const label = compatibilityLabel(
    scan.compatibility.label,
    scan.compatibility.score,
  );

  return (
    <Card className="min-h-[220px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6c736d]">Compatibility</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.06em] text-[#242620]">
            {label}
          </h2>
          {scan.compatibility.score !== null ? (
            <p className="mt-1 text-sm font-semibold text-[#b65e10]">
              {scan.compatibility.score}/100 match
            </p>
          ) : null}
        </div>
        <Image
          src="/app-images/compatibility.png"
          alt="Compatibility"
          width={92}
          height={92}
          className="h-20 w-20 object-contain drop-shadow-sm"
        />
      </div>
      {scan.compatibility.score !== null ? (
        <div className="mt-7">
          <div className="h-3 rounded-full bg-[#e4e7df]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ef4444_0%,#f97316_52%,#eab308_100%)]"
              style={{
                width: `${Math.max(8, Math.min(100, scan.compatibility.score))}%`,
              }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium text-[#99a096]">
            <span>Poor match</span>
            <span>Perfect match</span>
          </div>
        </div>
      ) : null}
      {scan.compatibility.summary ? (
        <p className="mt-5 line-clamp-4 text-sm leading-6 text-[#697168]">
          {scan.compatibility.summary}
        </p>
      ) : null}
    </Card>
  );
}

function LabCard({ scan }: { scan: NormalizedScan }) {
  const lab = scan.labTested;
  if (!lab) return null;

  const available = lab.available === true;

  return (
    <Card className="min-h-[180px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6c736d]">Lab tested</p>
          <span
            className={`mt-3 inline-flex rounded-full border px-3 py-1.5 text-sm font-bold ${
              available
                ? "border-[#248b4c] bg-[#e7f5ec] text-[#248b4c]"
                : "border-[#d2d6dd] bg-[#f4f5f7] text-[#747b8a]"
            }`}
          >
            {available ? "Data available" : "No data found"}
          </span>
        </div>
        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl ${
            available ? "bg-[#e7f5ec]" : "bg-[#f4f5f7]"
          }`}
          aria-hidden
        >
          {available ? "✓" : "!"}
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-[#697168]">
        {lab.summary ??
          "No independent lab testing data found for this product."}
      </p>
      {lab.source ? (
        <div className="mt-4 rounded-2xl bg-[#eef2ea] px-4 py-3 text-sm font-medium text-[#242620]">
          {lab.sourceUrl ? (
            <a href={lab.sourceUrl} target="_blank" rel="noreferrer">
              ↗ {lab.source}
            </a>
          ) : (
            <span>↗ {lab.source}</span>
          )}
        </div>
      ) : null}
    </Card>
  );
}

function IngredientSection({
  groups,
}: {
  groups: NormalizedScan["ingredients"];
}) {
  const hasIngredients =
    groups.good.length || groups.okay.length || groups.bad.length;

  if (!hasIngredients) return null;

  const sections = [
    {
      title: "Good",
      items: groups.good,
      chip: "border-[#19894b] bg-[#e7f5ec] text-[#19894b]",
    },
    {
      title: "Okay",
      items: groups.okay,
      chip: "border-[#ee6e16] bg-[#fff4e9] text-[#bc4c0c]",
    },
    {
      title: "Bad",
      items: groups.bad,
      chip: "border-[#d8463c] bg-[#fdeaea] text-[#c7372f]",
    },
  ];

  return (
    <Card className="lg:col-span-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-[-0.03em] text-[#242620]">
          Ingredient Breakdown
        </h2>
        <span className="text-xs font-semibold text-[#8b9388]">
          {groups.good.length + groups.okay.length + groups.bad.length} items
        </span>
      </div>
      <div className="mt-6 grid gap-5">
        {sections.map((section) =>
          section.items.length ? (
            <div key={section.title} className="min-w-0">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#596258]">
                {section.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.items.map((ingredient) => (
                  <span
                    key={`${section.title}-${ingredient.title}`}
                    className="group relative inline-flex max-w-full"
                  >
                    <span
                      tabIndex={ingredient.description ? 0 : undefined}
                      className={`max-w-full rounded-full border px-3 py-2 text-sm font-medium outline-none transition group-hover:shadow-sm group-focus-visible:shadow-sm ${section.chip}`}
                    >
                      <span className="block truncate">{ingredient.title}</span>
                    </span>
                    {ingredient.description ? (
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-20 w-[min(280px,calc(100vw-48px))] rounded-2xl border border-[#e6e8df] bg-white px-4 py-3 text-sm font-medium leading-5 text-[#343832] opacity-0 shadow-[0_14px_34px_rgba(31,41,55,0.16)] transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100"
                      >
                        {ingredient.description}
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
    </Card>
  );
}

function MacroRing({ nutrition }: { nutrition: ScanNutritionFacts }) {
  const protein = nutrition.protein_g ?? 0;
  const carbs = nutrition.carbs_g ?? 0;
  const fat = nutrition.fat_g ?? 0;
  const total = protein + carbs + fat || 1;
  const proteinPct = Math.round((protein / total) * 100);
  const carbsPct = Math.round((carbs / total) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  return (
    <div className="grid items-center gap-5 sm:grid-cols-[160px_1fr]">
      <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full bg-[conic-gradient(#4d7049_0_58%,#789473_58%_88%,#bfe4b8_88%_100%)]">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-[#fbfcf8]">
          <div className="text-center">
            <p className="text-3xl font-bold leading-none text-[#242620]">
              {nutrition.energy_kcal ?? Math.round(total)}
            </p>
            <p className="text-xs text-[#8b9388]">cal</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {[
          ["Protein", protein, proteinPct, "#789473"],
          ["Carbs", carbs, carbsPct, "#4d7049"],
          ["Fat", fat, fatPct, "#bfe4b8"],
        ].map(([label, value, pct, color]) => (
          <div key={label as string} className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color as string }}
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8b9388]">
                {label}
              </p>
              <p className="text-sm font-bold text-[#242620]">
                {value as number}g, {pct as number}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
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
  if (amount === null || amount === undefined) return null;

  const style = levelStyle(level, inverted);

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#242620]">{label}</p>
          <p className="text-xs text-[#8b9388]">
            {amount}
            {unit} per serving
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
        >
          {style.label}
        </span>
      </div>
      <div className="relative mt-3 pb-4">
        <div className="flex h-2.5 overflow-hidden rounded-full">
          {inverted ? (
            <>
              <div className="flex-1 bg-[#e97070]" />
              <div className="flex-1 bg-[#f2c64b]" />
              <div className="flex-1 bg-[#70d883]" />
            </>
          ) : (
            <>
              <div className="flex-1 bg-[#70d883]" />
              <div className="flex-1 bg-[#f2c64b]" />
              <div className="flex-1 bg-[#e97070]" />
            </>
          )}
        </div>
        <div
          className={`absolute top-3 h-0 w-0 -translate-x-1/2 border-x-[5px] border-b-[7px] border-x-transparent ${style.pointer}`}
        />
      </div>
    </div>
  );
}

function NutritionSection({
  nutrition,
}: {
  nutrition: ScanNutritionFacts | null;
}) {
  if (!nutrition) return null;

  return (
    <Card>
      <h2 className="text-xl font-bold tracking-[-0.03em] text-[#242620]">
        Nutrition Facts
      </h2>
      <div className="mt-5">
        <MacroRing nutrition={nutrition} />
      </div>
      <div className="mt-6 border-t border-[#e2e6dc] pt-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NutrientGauge
            label="Sugar"
            amount={nutrition.sugar_g}
            unit="g"
            level={nutrientLevel(nutrition.sugar_g, 5, 22.5)}
          />
          <NutrientGauge
            label="Saturated Fat"
            amount={nutrition.saturated_fat_g}
            unit="g"
            level={nutrientLevel(nutrition.saturated_fat_g, 1.5, 5)}
          />
          <NutrientGauge
            label="Sodium"
            amount={nutrition.sodium_mg}
            unit="mg"
            level={nutrientLevel(nutrition.sodium_mg, 140, 600)}
          />
          <NutrientGauge
            label="Cholesterol"
            amount={nutrition.cholesterol_mg}
            unit="mg"
            level={nutrientLevel(nutrition.cholesterol_mg, 20, 60)}
          />
          <NutrientGauge
            label="Fiber"
            amount={nutrition.fiber_g}
            unit="g"
            level={fiberLevel(nutrition.fiber_g)}
            inverted
          />
        </div>
        {nutrition.serving_size ? (
          <p className="mt-4 text-xs text-[#8b9388]">
            Values per {nutrition.serving_size.replace(/^per\s+/i, "")}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

function ListSection({
  title,
  items,
  tone,
  className = "",
}: {
  title: string;
  items: string[];
  tone: "positive" | "warning";
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <Card className={className}>
      <h2 className="text-lg font-bold tracking-[-0.03em] text-[#242620]">
        {title}
      </h2>
      <div className="mt-4 grid gap-3">
        {items.slice(0, 5).map((item) => (
          <div
            key={item}
            className="grid grid-cols-[28px_1fr] gap-3 rounded-2xl bg-[#f3f6ef] p-3 text-sm leading-6 text-[#3f473f]"
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold ${
                tone === "positive"
                  ? "bg-[#e7f5ec] text-[#19894b]"
                  : "bg-[#fdeaea] text-[#c7372f]"
              }`}
            >
              {tone === "positive" ? "+" : "!"}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ErrorState({ scan }: { scan: NormalizedScan }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c7372f]">
        Scan not available
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#242620]">
        {scan.errorMessage ?? "This scan could not be processed."}
      </h2>
      {scan.barcode ? (
        <p className="mt-4 text-sm leading-6 text-[#697168]">
          Barcode: {scan.barcode}
        </p>
      ) : null}
      {scan.imageUrl ? (
        <div className="mt-5 overflow-hidden rounded-[20px] bg-[#eef0ea]">
          <Image
            src={scan.imageUrl}
            alt="Scanned product"
            width={900}
            height={900}
            className="max-h-[360px] w-full object-contain"
          />
        </div>
      ) : null}
    </Card>
  );
}

export default async function SharedScanPage({ params }: Props) {
  const { id } = await params;
  const record = await getScan(id);
  const scan = normalizeScan(record);
  const failed = scan.status === "failed" || Boolean(scan.errorMessage);

  return (
    <main className="min-h-screen bg-[#eef0ec] text-[#242620]">
      <MinimalNav
        title={scan.productName ?? scan.productSubtitle ?? "Shared scan"}
      />
      <div className="mx-auto max-w-[1180px] px-4 pb-5 pt-24 sm:px-6 lg:px-8 lg:pb-8">
        <div className="grid gap-5">
          <ProductSummary scan={scan} />
          {failed ? (
            <ErrorState scan={scan} />
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <ScoreMeter
                  score={scan.healthScore}
                  label="Health Score"
                  iconSrc="/app-images/heart.png"
                  iconAlt="Health score"
                  gradient="linear-gradient(90deg,#ef4444 0%,#f97316 45%,#22c55e 100%)"
                />
                <CompatibilityCard scan={scan} />
                <LabCard scan={scan} />
              </div>
              <div className="grid gap-5 lg:grid-cols-12">
                <IngredientSection groups={scan.ingredients} />
                <ListSection
                  title="What Might Concern You"
                  items={scan.compatibility.concerns}
                  tone="warning"
                  className="lg:col-span-5"
                />
              </div>
              <NutritionSection nutrition={scan.nutritionFacts} />
              <ListSection
                title="What You Will Like"
                items={scan.compatibility.positives}
                tone="positive"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
