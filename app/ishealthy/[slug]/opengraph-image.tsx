import { createClient } from "@/utils/supabase/server";
import { productCardSize, renderProductCard } from "@/lib/og/product-card";

export const size = productCardSize;
export const contentType = "image/png";
export const revalidate = 86400;
export const runtime = "nodejs";

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;

  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("product_name, brand, health_score, product_image_url")
    .eq("slug", slug)
    .maybeSingle();

  return renderProductCard({
    name:
      product?.product_name ??
      slug.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    brand: product?.brand ?? null,
    score: product?.health_score ?? null,
    imageUrl: product?.product_image_url ?? null,
    tagline: "is it healthy for you?",
  });
}
