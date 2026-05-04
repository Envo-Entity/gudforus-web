import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatProductSlug,
  getProducts,
  isSupabaseConfigured,
} from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function IsHealthyPage() {
  if (!isSupabaseConfigured) {
    notFound();
  }

  const { data: products, error } = await getProducts();

  return (
    <main className="min-h-screen bg-[#f7f5ee] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-4xl text-[#1f2937]">isHealthy</h1>

        {error ? (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Could not load products: {error.message}
          </p>
        ) : (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <Link
                key={product.id}
                href={`/isHealthy/${product.slug}`}
                className="rounded-lg border border-[#dad7cc] bg-white px-4 py-3 text-left text-sm font-semibold text-[#1f2937] shadow-sm transition hover:border-[#4a6c48] hover:bg-[#f3faf1]"
              >
                {formatProductSlug(product.slug)}
              </Link>
            ))}
          </div>
        )}

        {!error && products?.length === 0 ? (
          <p className="mt-6 text-sm text-[#5c5c52]">No products found.</p>
        ) : null}
      </div>
    </main>
  );
}
