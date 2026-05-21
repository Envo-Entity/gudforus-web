import { getTopProductNames } from "@/lib/products";
import IsHealthySearch from "./IsHealthySearch";
import ProductCarousel from "./ProductCarousel";
import MinimalNav from "@/app/components/MinimalNav";

export const revalidate = 3600;

export default async function IsHealthyPage() {
  const { data: products } = await getTopProductNames();
  const top20 = (products ?? []).slice(0, 20);

  return (
    <>
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
