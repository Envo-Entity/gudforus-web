import Image from "next/image";
import Link from "next/link";

type ProductChip = {
  id: string;
  slug: string;
  product_name: string | null;
  product_image_url: string | null;
  category: string | null;
  health_score: number | null;
};

function displayName(p: ProductChip) {
  return p.product_name ?? p.slug.replace(/-review$/, "").replaceAll("-", " ");
}

function scoreBadge(score: number | null) {
  if (score === null) return { bg: "bg-[#f3f4f6]", text: "text-[#9ca3af]" };
  if (score >= 75) return { bg: "bg-[#dcfce7]", text: "text-[#15803d]" };
  if (score >= 50) return { bg: "bg-[#fef9c3]", text: "text-[#a16207]" };
  return { bg: "bg-[#fee2e2]", text: "text-[#b91c1c]" };
}

export default function ProductCarousel({ products }: { products: ProductChip[] }) {
  const doubled = [...products, ...products];

  return (
    <div
      className="w-full overflow-hidden mt-12 pb-6"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div className="animate-carousel flex gap-5 py-3 px-8">
        {doubled.map((product, i) => {
          const badge = scoreBadge(product.health_score);
          return (
            <Link
              key={`${product.id}-${i}`}
              href={`/ishealthy/${product.slug}`}
              className="shrink-0 w-44 rounded-2xl bg-white border border-[#e8e5de] p-4 flex flex-col items-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-24 h-24 rounded-xl bg-[#f2f0e9] flex items-center justify-center overflow-hidden">
                {product.product_image_url ? (
                  <Image
                    src={product.product_image_url}
                    alt={displayName(product)}
                    width={96}
                    height={96}
                    unoptimized
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="text-4xl">🌿</span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#1f2937] text-center line-clamp-2 leading-snug w-full min-h-[2.5rem]">
                {displayName(product)}
              </p>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
                {product.health_score !== null ? `${product.health_score}/100` : "Unrated"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
