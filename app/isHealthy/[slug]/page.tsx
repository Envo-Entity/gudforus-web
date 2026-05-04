import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatProductSlug,
  getProductBySlug,
  isSupabaseConfigured,
  parseJsonField,
  type ProductRecord,
} from "@/lib/products";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type ProductField = keyof ProductRecord;

const jsonFields: ProductField[] = [
  "analysis_data",
  "seo_content",
  "faq",
  "health_goals",
  "myth_busters",
];

const formatFieldName = (field: string) => field.replaceAll("_", " ");

const renderValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-[#8a877d]">null</span>;
  }

  if (Array.isArray(value)) {
    return (
      <pre className="whitespace-pre-wrap break-words rounded-lg bg-[#f7f5ee] p-3 text-xs leading-6 text-[#1f2937]">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  if (typeof value === "object") {
    return (
      <pre className="whitespace-pre-wrap break-words rounded-lg bg-[#f7f5ee] p-3 text-xs leading-6 text-[#1f2937]">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return <span>{String(value)}</span>;
};

export const dynamic = "force-dynamic";

export default async function IsHealthyProductPage({ params }: Props) {
  if (!isSupabaseConfigured) {
    notFound();
  }

  const { slug } = await params;
  const { data, error } = await getProductBySlug(slug);

  if (error || !data) {
    notFound();
  }

  const product = data as ProductRecord;
  const fields: Array<[string, unknown]> = Object.entries(product).map(
    ([key, value]) => [
      key,
      jsonFields.includes(key as ProductField) ? parseJsonField(value) : value,
    ],
  );

  return (
    <main className="min-h-screen bg-[#f7f5ee] px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-6xl">
        <Link
          href="/isHealthy"
          className="text-sm font-semibold text-[#2d6a4f] hover:text-[#1f2937]"
        >
          Back to products
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            {product.product_image_url ? (
              <Image
                src={product.product_image_url}
                alt={product.product_name ?? formatProductSlug(product.slug)}
                width={640}
                height={640}
                className="aspect-square w-full rounded-lg border border-[#dad7cc] bg-white object-cover"
                priority
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg border border-[#dad7cc] bg-white text-sm text-[#5c5c52]">
                No image
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4a6c48]">
              {product.brand ?? "Product"}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-[#1f2937]">
              {product.product_name ?? formatProductSlug(product.slug)}
            </h1>
            <p className="mt-3 text-base leading-7 text-[#5c5c52]">
              {product.product_subtitle ?? product.verdict_summary}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[#dad7cc] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a776d]">
                  Health
                </p>
                <p className="mt-2 text-3xl font-bold text-[#1f2937]">
                  {product.health_score ?? "n/a"}
                </p>
              </div>
              <div className="rounded-lg border border-[#dad7cc] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a776d]">
                  Planet
                </p>
                <p className="mt-2 text-3xl font-bold text-[#1f2937]">
                  {product.planet_score ?? "n/a"}
                </p>
              </div>
              <div className="rounded-lg border border-[#dad7cc] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a776d]">
                  Verdict
                </p>
                <p className="mt-2 text-2xl font-bold capitalize text-[#1f2937]">
                  {product.verdict ?? "n/a"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-lg border border-[#dad7cc] bg-white">
          <div className="border-b border-[#dad7cc] px-4 py-3">
            <h2 className="text-lg font-semibold text-[#1f2937]">
              Product info
            </h2>
          </div>
          <dl className="divide-y divide-[#e7e4da]">
            {fields.map(([key, value]) => (
              <div
                key={key}
                className="grid gap-2 px-4 py-4 text-sm md:grid-cols-[220px_1fr]"
              >
                <dt className="font-semibold capitalize text-[#4a6c48]">
                  {formatFieldName(key)}
                </dt>
                <dd className="min-w-0 break-words text-[#1f2937]">
                  {renderValue(value)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </main>
  );
}
